/**
 * Screen 2: inspect and manage the consent currently saved on the device.
 * Refreshes shouldDisplayPrivacyCenter/getAllAcceptedConsent every time this
 * screen mounts (i.e. whenever the user navigates back to it) and again
 * after every button press.
 *
 * getAllAcceptedConsent can return hundreds of entries, so the whole screen
 * is one top-level FlatList (its own VirtualizedList) rather than a FlatList
 * nested inside a ScrollView, which React Native explicitly warns against.
 * The "Accepted Consent Keys" look of one bordered card is built by giving
 * the header's card title rounded top corners + side/top borders, each row
 * matching side borders, and the footer rounded bottom corners + side/bottom
 * borders — a seamless box across header, rows and footer without nesting.
 */
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import * as TCConsent from '@commandersact/tcconsent-react-native';
import ActionRow from '../components/ActionRow';

export default function ManageConsentScreen() {
  const [shouldDisplay, setShouldDisplay] = useState<boolean | null>(null);
  const [accepted, setAccepted] = useState<string[]>([]);

  const refresh = useCallback(() => {
    TCConsent.TCConsentAPI.shouldDisplayPrivacyCenter().then(setShouldDisplay);
    TCConsent.TCConsentAPI.getAllAcceptedConsent().then(list => setAccepted(list as string[]));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <FlatList
      contentContainerStyle={styles.content}
      data={accepted}
      keyExtractor={(item, index) => `${item}-${index}`}
      renderItem={({ item }) => (
        <View style={styles.cardRow}>
          <Text style={styles.listItem}>{item}</Text>
        </View>
      )}
      ListEmptyComponent={
        <View style={styles.cardRow}>
          <Text style={styles.listItem}>None</Text>
        </View>
      }
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.title}>Manage consent</Text>
          <Text style={styles.intro}>You can check and manage the consent status here.</Text>

          <ActionRow
            label="Reset consent"
            hint="calls tcconsent.resetSavedConsent"
            onPress={() => TCConsent.resetSavedConsent().then(refresh)}
          />

          <Text style={styles.smallHint}>call TCConsentAPI.shouldDisplayPrivacyCenter() to check if you should show a ConsentUI to recollect consent</Text>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Is Consent collected and valid ?</Text>
            <Text style={[styles.statusValue, shouldDisplay === null ? null : shouldDisplay ? styles.statusNo : styles.statusYes]}>
              {shouldDisplay === null ? '…' : shouldDisplay ? 'No' : 'Yes'}
            </Text>
          </View>

          <View style={styles.cardTop}>
            <Text style={styles.listTitle}>Accepted Consent Keys ({accepted.length})</Text>
            <Text style={styles.smallHint}>(tcconsent.getAllAcceptedConsent)</Text>
          </View>
        </View>
      }
      ListFooterComponent={<View style={styles.cardBottom} />}
    />
  );
}

const CARD_BORDER = { borderColor: '#5b3df0', borderLeftWidth: 1.5, borderRightWidth: 1.5 } as const;

const styles = StyleSheet.create({
  content: { padding: 16, paddingTop: 24 },
  header: { alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 10 },
  intro: { fontSize: 17, color: '#333', textAlign: 'center', marginBottom: 18, lineHeight: 22 },
  statusRow: { alignItems: 'center', width: '100%', marginTop: 14 },
  statusLabel: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
  statusValue: {
    fontSize: 40,
    fontWeight: '800',
    color: '#555',
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 36,
    borderRadius: 32,
    overflow: 'hidden',
    textAlign: 'center',
  },
  statusYes: { color: '#1e6b1e', backgroundColor: '#dcf3dc' },
  statusNo: { color: '#a32b1f', backgroundColor: '#fbe0dd' },
  smallHint: { fontSize: 13, color: '#888', alignSelf: 'flex-start', marginBottom: 4 },
  cardTop: {
    ...CARD_BORDER,
    borderTopWidth: 1.5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#faf9ff',
    width: '100%',
    marginTop: 18,
    padding: 14,
    paddingBottom: 6,
  },
  listTitle: { fontSize: 17, fontWeight: '700', color: '#3d2a7a', alignSelf: 'flex-start' },
  cardRow: {
    ...CARD_BORDER,
    borderTopWidth: 1,
    borderTopColor: '#e2ddf5',
    backgroundColor: '#faf9ff',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  listItem: { fontSize: 15, color: '#333' },
  cardBottom: {
    ...CARD_BORDER,
    borderBottomWidth: 1.5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#faf9ff',
    height: 12,
  },
});
