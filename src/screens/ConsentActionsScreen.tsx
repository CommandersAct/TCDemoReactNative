/**
 * Screen 1: the two ways to collect consent — a plain app-level RN banner
 * you fully control, and CommandersAct's own native banner/Privacy Center.
 * Only one of the two should be used in a real app; both are shown here for
 * comparison. This branch targets @commandersact/tcconsent-react-native
 * (IAB-capable), whose native showBanner isn't supported yet — that's a
 * non-iab-only feature for now — so the CommandersAct Banner button is
 * replaced with a note instead of wiring it up.
 */
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import * as TCConsent from '@commandersact/tcconsent-react-native';
import Screen from '../components/Screen';
import ActionRow from '../components/ActionRow';
import { IAB_ENABLED } from '../config/iab';

export default function ConsentActionsScreen() {
  const [appBannerVisible, setAppBannerVisible] = useState(false);

  return (
    <Screen
      title="Consent UI"
      intro="This is a demo app, we got an app-level banner, alongside a CommandersAct native banner — you should only use one.">
      <ActionRow
        title="React-native-App level Banner"
        label="Show app-level banner"
        hint="our own React Native banner below, calling tcconsent.acceptAllConsent / refuseAllConsent / showPrivacyCenter"
        onPress={() => setAppBannerVisible(true)}
      />
      <ActionRow
        title="CommandersAct Banner"
        label="Show CommandersAct Banner"
        hint="TCBanner is currently non iab only"
        disabled
      />

      <View style={styles.divider} />
      <Text style={[styles.iabBadge, IAB_ENABLED ? styles.iabBadgeYes : styles.iabBadgeNo]}>
        IAB Enabled: {IAB_ENABLED ? 'Yes' : 'No'}
      </Text>
      <ActionRow
        title="CommandersAct Privacy Center"
        label="Show CommandersAct Privacy Center"
        hint="calls tcconsent.showPrivacyCenter"
        onPress={() => TCConsent.showPrivacyCenter()}
      />

      <Modal
        visible={appBannerVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAppBannerVisible(false)}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setAppBannerVisible(false)}>
          {/* Swallows taps so they don't bubble to the overlay above and close the banner */}
          <TouchableOpacity style={styles.banner} activeOpacity={1} onPress={() => {}}>
            <View style={styles.bannerHeader}>
              <Text style={styles.bannerText}>App-level consent banner</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setAppBannerVisible(false)}
                accessibilityLabel="Dismiss banner">
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            <ActionRow
              label="Accept all"
              hint="calls tcconsent.acceptAllConsent"
              onPress={() => {
                TCConsent.acceptAllConsent();
                setAppBannerVisible(false);
              }}
            />
            <ActionRow
              label="Refuse all"
              hint="calls tcconsent.refuseAllConsent"
              onPress={() => {
                TCConsent.refuseAllConsent();
                setAppBannerVisible(false);
              }}
            />
            <ActionRow
              label="Privacy Center"
              hint="calls tcconsent.showPrivacyCenter"
              onPress={() => {
                setAppBannerVisible(false);
                TCConsent.showPrivacyCenter();
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  divider: { width: '100%', height: 2, backgroundColor: '#ddd', marginTop: 60 },
  iabBadge: {
    alignSelf: 'center',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 14,
    overflow: 'hidden',
    textAlign: 'center',
  },
  iabBadgeYes: { color: '#1e6b1e', backgroundColor: '#dcf3dc' },
  iabBadgeNo: { color: '#a32b1f', backgroundColor: '#fbe0dd' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  banner: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
  },
  bannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 12,
  },
  bannerText: { fontSize: 16, fontWeight: '700' },
  closeButton: {
    position: 'absolute',
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  closeButtonText: { fontSize: 14, fontWeight: '700', color: '#444' },
});
