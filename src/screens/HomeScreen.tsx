/**
 * First tab: confirms both SDKs are initialised (TCServerSide.initServerSide
 * and TCConsent.setSiteIDPrivacyID, via CommandersActSDKInit), shows the
 * executed/sent event counters from the native log tailer (see
 * src/native/TCStatsLog) — session-only, may undercount if debug logging
 * was off before the tailer started — and a lighter-weight echo of Manage
 * Consent's "is consent collected and valid" status for a quick glance.
 */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import { useCommandersActSDKInit } from '../context/CommandersActSDKInit';
import { TCStatsLog, TCStatsCounts } from '../native/TCStatsLog';
import * as TCConsent from '@commandersact/tcconsent-react-native-noiab';
import { IAB_ENABLED } from '../config/iab';

export default function HomeScreen() {
  const { serverSideReady, consentReady } = useCommandersActSDKInit();
  const [counts, setCounts] = useState<TCStatsCounts>({ executed: 0, sent: 0 });
  const [shouldDisplay, setShouldDisplay] = useState<boolean | null>(null);

  useEffect(() => {
    TCStatsLog.getCounts().then(setCounts);
    return TCStatsLog.subscribe(setCounts);
  }, []);

  useEffect(() => {
    TCConsent.TCConsentAPI.shouldDisplayPrivacyCenter().then(setShouldDisplay);
  }, []);

  return (
    <Screen title="TCDemoReactNative" intro="Both SDKs are initialised as soon as the app starts.">
      <StatusRow label="TCServerSide.initServerSide" ready={serverSideReady} />
      <StatusRow label="TCConsent.setSiteIDPrivacyID" ready={consentReady} />

      <Text style={styles.sectionTitle}>ServerSide Events Stats</Text>
      <Text style={styles.sectionIntro}>
        From parsing Logcat / Xcode console logs on-device — can be slightly inaccurate.
      </Text>
      <View style={styles.counters}>
        <Counter label="Executed events" value={counts.executed} />
        <Counter label="Sent Http events requests" value={counts.sent} />
      </View>

      <View style={styles.divider} />

      <View style={styles.consentHeaderRow}>
        <Text style={[styles.sectionTitle, styles.consentHeaderTitle]}>Consent Saved</Text>
        <Text
          style={[
            styles.consentStatusValue,
            shouldDisplay === null ? null : shouldDisplay ? styles.consentStatusNo : styles.consentStatusYes,
          ]}>
          {shouldDisplay === null ? '…' : shouldDisplay ? 'No' : 'Yes'}
        </Text>
      </View>
      <Text style={styles.sectionIntro}>
        is consent collected and saved ? if No, you should either call saveConsent: function or
        display a Consent UI
      </Text>

      <View style={styles.consentHeaderRow}>
        <Text style={[styles.sectionTitle, styles.consentHeaderTitle]}>IAB Enabled</Text>
        <Text
          style={[
            styles.consentStatusValue,
            IAB_ENABLED ? styles.consentStatusYes : styles.consentStatusNo,
          ]}>
          {IAB_ENABLED ? 'Yes' : 'No'}
        </Text>
      </View>
    </Screen>
  );
}

function StatusRow({ label, ready }: { label: string; ready: boolean }) {
  return (
    <View style={styles.row}>
      <Text style={styles.dot}>{ready ? '✅' : '⏳'}</Text>
      <View style={styles.rowText}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.status}>{ready ? 'Initialised' : 'Initialising…'}</Text>
      </View>
    </View>
  );
}

function Counter({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.counter}>
      <Text style={styles.counterValue}>{value}</Text>
      <Text style={styles.counterLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f2f0fb',
    marginBottom: 12,
  },
  dot: { fontSize: 20, marginRight: 12 },
  rowText: { flex: 1 },
  label: { fontSize: 14, fontWeight: '600' },
  status: { fontSize: 12, color: '#666' },
  sectionTitle: { fontSize: 17, fontWeight: '700', marginTop: 16, alignSelf: 'flex-start' },
  sectionIntro: { fontSize: 15, color: '#555', marginTop: 4, marginBottom: 16, alignSelf: 'flex-start', lineHeight: 20 },
  counters: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  counter: { alignItems: 'center', flex: 1 },
  counterValue: { fontSize: 36, fontWeight: '800', color: '#5b3df0' },
  counterLabel: { fontSize: 13, color: '#444', marginTop: 4 },
  divider: { width: '30%', height: 1, backgroundColor: '#ddd', alignSelf: 'center', marginTop: 22, marginBottom: 18 },
  consentHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
  },
  consentHeaderTitle: { marginTop: 0 },
  consentStatusValue: {
    fontSize: 15,
    fontWeight: '700',
    minWidth: 64,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    textAlign: 'center',
  },
  consentStatusYes: { color: '#1e6b1e', backgroundColor: '#dcf3dc' },
  consentStatusNo: { color: '#a32b1f', backgroundColor: '#fbe0dd' },
});
