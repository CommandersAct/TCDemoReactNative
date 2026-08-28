package com.tcdemoreactnative

import android.graphics.Color
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity
import androidx.fragment.app.FragmentManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.util.WeakHashMap

/**
 * Works around a gap in CommandersAct's Consent SDK: the BOTTOM banner (TCBottomBanner) is a
 * BottomSheetDialogFragment with its own Window that never extends into the system navigation
 * bar inset, and with edge-to-edge enforced (targetSdk 36 on Android 15+, where
 * Window.setNavigationBarColor is a no-op) that inset is left uncovered below the sheet.
 *
 * This paints a same-colour strip behind that inset directly in the host Activity's content
 * view — a separate, lower Window than the dialog's, so it shows through wherever the dialog
 * doesn't draw — and removes it by watching for the SDK's hardcoded "CommandersActBanner"
 * fragment tag being torn down, since neither the SDK nor the bridge exposes a dismiss callback.
 */
class TCBannerNavBarModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  companion object {
    private const val BANNER_FRAGMENT_TAG = "CommandersActBanner"
  }

  private val stripByActivity = WeakHashMap<FragmentActivity, View>()
  private val watchedActivities = WeakHashMap<FragmentActivity, Boolean>()

  override fun getName() = "TCBannerNavBar"

  @ReactMethod
  fun showBehindNavigationBar(hexColor: String) {
    val activity = reactApplicationContext.currentActivity as? FragmentActivity ?: return
    val color = parseHexColor(hexColor) ?: return

    activity.runOnUiThread {
      val strip = stripByActivity.getOrPut(activity) { createStrip(activity) }
      strip.setBackgroundColor(color)
      strip.visibility = View.VISIBLE
      watchForBannerDismissal(activity, strip)
    }
  }

  private fun createStrip(activity: FragmentActivity): View {
    val root = activity.findViewById<ViewGroup>(android.R.id.content)
    val strip = View(activity)
    root.addView(strip, FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 0, Gravity.BOTTOM))

    ViewCompat.setOnApplyWindowInsetsListener(root) { _, insets ->
      val navBarHeight = insets.getInsets(WindowInsetsCompat.Type.navigationBars()).bottom
      strip.layoutParams = (strip.layoutParams as FrameLayout.LayoutParams).apply { height = navBarHeight }
      insets
    }
    ViewCompat.requestApplyInsets(root)
    return strip
  }

  private fun watchForBannerDismissal(activity: FragmentActivity, strip: View) {
    if (watchedActivities.put(activity, true) != null) return

    activity.supportFragmentManager.registerFragmentLifecycleCallbacks(
      object : FragmentManager.FragmentLifecycleCallbacks() {
        override fun onFragmentViewDestroyed(fm: FragmentManager, f: Fragment) {
          if (f.tag == BANNER_FRAGMENT_TAG) {
            strip.visibility = View.GONE
          }
        }
      },
      false
    )
  }

  private fun parseHexColor(hex: String): Int? {
    return try {
      Color.parseColor(if (hex.startsWith("#")) hex else "#$hex")
    } catch (e: IllegalArgumentException) {
      null
    }
  }
}
