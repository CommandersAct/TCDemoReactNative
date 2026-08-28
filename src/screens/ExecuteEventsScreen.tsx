/**
 * Execute Events screen: pick one of the prebuilt demo events from a
 * dropdown, then tap Execute to send it through TCServerSide.execute. The
 * dropdown is a plain Modal + FlatList picker — no extra native dependency
 * needed for a single select box.
 */
import React, { useState } from 'react';
import { View, Text, Modal, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import * as TCServerSide from '@commandersact/tcserverside-react-native';
import Screen from '../components/Screen';
import ActionRow from '../components/ActionRow';
import { DEMO_EVENTS } from '../data/demoEvents';

export default function ExecuteEventsScreen() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [lastExecuted, setLastExecuted] = useState<string | null>(null);

  const selected = DEMO_EVENTS[selectedIndex];

  return (
    <Screen title="Execute events" intro="Pick an event, then execute it.">
      <TouchableOpacity style={styles.dropdown} onPress={() => setPickerVisible(true)}>
        <Text style={styles.dropdownText}>{selected.label}</Text>
        <Text style={styles.dropdownCaret}>▾</Text>
      </TouchableOpacity>

      <ActionRow
        label="Execute"
        hint="calls tcserverside.execute with the selected event"
        onPress={() => {
          TCServerSide.execute(selected.build());
          setLastExecuted(selected.label);
        }}
      />

      {lastExecuted && <Text style={styles.confirmation}>Executed "{lastExecuted}"</Text>}

      <Text style={styles.note}>
        Full event payloads are visible in the Xcode console (iOS) or Android Studio's Logcat
        (Android) once debug logging is enabled. The CommandersAct platform samples hits
        server-side, so a missing hit there doesn't mean it wasn't received — add a test_code
        additional property with a random value to your event to bypass sampling while testing.
      </Text>

      <Modal visible={pickerVisible} transparent animationType="fade">
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setPickerVisible(false)}>
          <View style={styles.pickerSheet}>
            <FlatList
              data={DEMO_EVENTS}
              keyExtractor={item => item.label}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles.pickerRow}
                  onPress={() => {
                    setSelectedIndex(index);
                    setPickerVisible(false);
                  }}>
                  <Text style={styles.pickerRowText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  dropdownText: { fontSize: 17 },
  dropdownCaret: { fontSize: 17, color: '#888' },
  confirmation: { marginTop: 12, fontSize: 15, color: '#2a7a2a' },
  note: { marginTop: 20, fontSize: 14, color: '#000000', textAlign: 'center', lineHeight: 20 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center' },
  pickerSheet: { backgroundColor: 'white', marginHorizontal: 24, borderRadius: 10, maxHeight: '60%' },
  pickerRow: { paddingVertical: 14, paddingHorizontal: 18, borderBottomWidth: 1, borderBottomColor: '#eee' },
  pickerRowText: { fontSize: 17 },
});
