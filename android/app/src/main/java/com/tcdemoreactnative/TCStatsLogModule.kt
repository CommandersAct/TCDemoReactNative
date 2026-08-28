package com.tcdemoreactnative

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.io.BufferedReader
import java.io.InputStreamReader

/**
 * Tails this app's own Logcat output (tag "CommandersAct") and counts two
 * marker lines the ServerSide SDK prints when debug logging is enabled:
 * "Server-Side SDK sending event:" (one per executed event) and
 * "with POST data:" followed by a JSON body (one per hit actually sent) —
 * the body usually lands on the same line, but for Consent's own hits it
 * lands on the next log line instead (see AndroidV5's TCConsent/TCServerSide
 * READMEs), and bodies starting with {"privacyBeacon" are those Consent
 * hits, excluded from this count.
 * Feeds HomeScreen's stats section via src/native/TCStatsLog.ts.
 */
class TCStatsLogModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  private val executedPattern = Regex("Server-Side\\s+SDK\\s+sending\\s+event\\s*:", RegexOption.IGNORE_CASE)
  private val logcatPrefixPattern = Regex("^[A-Z]/[^(]+\\(\\s*\\d+\\)\\s*:\\s*")

  @Volatile private var executed = 0
  @Volatile private var sent = 0
  @Volatile private var started = false
  @Volatile private var awaitingPostDataBody = false

  override fun getName() = "TCStatsLog"

  @ReactMethod
  fun start() {
    if (started) return
    started = true
    Thread { tailLogcat() }.apply { isDaemon = true }.start()
  }

  @ReactMethod
  fun getCounts(promise: Promise) {
    promise.resolve(currentCounts())
  }

  // Required by NativeEventEmitter on the JS side; delivery itself goes through
  // DeviceEventEmitter regardless, so no per-listener bookkeeping is needed here.
  @ReactMethod
  fun addListener(eventName: String) {}

  @ReactMethod
  fun removeListeners(count: Int) {}

  private fun tailLogcat() {
    try {
      // -T 1 skips logcat's existing buffered history (from before this run) and only tails new lines.
      val process = Runtime.getRuntime().exec(arrayOf("logcat", "-v", "brief", "-T", "1", "CommandersAct:V", "*:S"))
      BufferedReader(InputStreamReader(process.inputStream)).useLines { lines ->
        lines.forEach { line ->
          var changed = false
          if (executedPattern.containsMatchIn(line)) {
            executed++
            changed = true
          }

          val trimmed = line.trim()
          if (awaitingPostDataBody) {
            awaitingPostDataBody = false
            // This continuation line is still a full logcat line (its own "priority/tag(pid): "
            // prefix included), which would otherwise defeat the {"privacyBeacon" prefix check below.
            if (!isPrivacyBeaconBody(stripLogcatPrefix(trimmed))) {
              sent++
              changed = true
            }
          } else {
            val idx = trimmed.indexOf("with POST data:", ignoreCase = true)
            if (idx >= 0) {
              // The JSON body is usually right here after the colon; for Consent's own hits it's
              // empty here and lands on the next log line instead.
              val body = trimmed.substring(idx + "with POST data:".length).trim()
              if (body.isEmpty()) {
                awaitingPostDataBody = true
              } else if (!isPrivacyBeaconBody(body)) {
                sent++
                changed = true
              }
            }
          }

          if (changed) emitUpdate()
        }
      }
    } catch (_: Exception) {
      // Logcat isn't available on this device/emulator setup — counters simply stay at 0.
    }
  }

  // Consent's own privacy hits ride the same "with POST data:" log line as ServerSide event
  // hits; only their JSON body distinguishes them, so those are excluded from the count.
  private fun isPrivacyBeaconBody(body: String) = body.startsWith("{\"privacyBeacon\"")

  // logcat -v brief prefixes every line with "priority/tag(  pid): ", including continuation
  // lines that are really just the tail end of a previous multi-line log message.
  private fun stripLogcatPrefix(line: String) = logcatPrefixPattern.replace(line, "")

  private fun currentCounts(): WritableMap =
    Arguments.createMap().apply {
      putInt("executed", executed)
      putInt("sent", sent)
    }

  private fun emitUpdate() {
    reactApplicationContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit("tcstats-update", currentCounts())
  }
}
