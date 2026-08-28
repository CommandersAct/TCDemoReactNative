/**
 * Minimal hand-rolled tab navigator: a bottom tab bar switching between the
 * demo's screens. Only the active screen is mounted, so a screen's own
 * mount-time effect naturally re-runs whenever the user comes back to it —
 * no routing library needed. Content and tab bar both pad for safe-area
 * insets, since Android renders edge-to-edge by default and would
 * otherwise draw under the status/navigation bars.
 */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '../screens/HomeScreen';
import ConsentActionsScreen from '../screens/ConsentActionsScreen';
import ManageConsentScreen from '../screens/ManageConsentScreen';
import ExecuteEventsScreen from '../screens/ExecuteEventsScreen';

const TABS = [
  { key: 'home', label: 'Home', icon: '🏠', Component: HomeScreen },
  { key: 'events', label: 'Execute Events', icon: '⚡', Component: ExecuteEventsScreen },
  { key: 'consent', label: 'Collect Consent', icon: '🛡️', Component: ConsentActionsScreen },
  { key: 'manage', label: 'Consent Status', icon: '⚙️', Component: ManageConsentScreen },
] as const;

type TabKey = (typeof TABS)[number]['key'];

export default function RootNavigator() {
  const [tab, setTab] = useState<TabKey>('home');
  const insets = useSafeAreaInsets();
  const ActiveScreen = TABS.find(t => t.key === tab)!.Component;

  return (
    <View style={styles.container}>
      <View style={[styles.content, { paddingTop: insets.top }]}>
        <ActiveScreen />
      </View>
      <View style={[styles.tabBar, { paddingBottom: insets.bottom || 12 }]}>
        {TABS.map(({ key, label, icon }) => {
          const isActive = tab === key;
          return (
            <TouchableOpacity
              key={key}
              style={styles.tabButton}
              activeOpacity={0.7}
              onPress={() => setTab(key)}>
              <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
                <Text style={styles.icon}>{icon}</Text>
              </View>
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1 },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 12,
  },
  tabButton: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 2 },
  iconWrap: {
    minWidth: 44,
    height: 30,
    borderRadius: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },
  iconWrapActive: { backgroundColor: '#efe9fd' },
  icon: { fontSize: 18 },
  tabLabel: { fontSize: 12, color: '#000', fontWeight: '700' },
  tabLabelActive: { color: '#5b3df0' },
});
