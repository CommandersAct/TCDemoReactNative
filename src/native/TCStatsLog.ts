/**
 * JS wrapper around the app-local native "TCStatsLog" module (android/ios).
 * That module tails the app's own Logcat/console output and counts two
 * marker lines the ServerSide SDK prints when debug logging is on:
 * "Server-Side SDK sending event:" (an event was executed) and
 * "postData:" followed by a JSON body (a hit was actually sent) — the body
 * usually lands on the next log line, and bodies starting with
 * {"privacyBeacon" are Consent's own hits, excluded from this count.
 * Used by HomeScreen's stats section.
 */
import { NativeModules, NativeEventEmitter } from 'react-native';

export type TCStatsCounts = {
  executed: number;
  sent: number;
};

const { TCStatsLog: NativeTCStatsLog } = NativeModules;

const emitter = NativeTCStatsLog ? new NativeEventEmitter(NativeTCStatsLog) : null;

function start(): void {
  NativeTCStatsLog?.start();
}

function getCounts(): Promise<TCStatsCounts> {
  if (!NativeTCStatsLog) {
    return Promise.resolve({ executed: 0, sent: 0 });
  }
  return NativeTCStatsLog.getCounts();
}

function subscribe(callback: (counts: TCStatsCounts) => void): () => void {
  const subscription = emitter?.addListener('tcstats-update', callback);
  return () => subscription?.remove();
}

export const TCStatsLog = { start, getCounts, subscribe };
