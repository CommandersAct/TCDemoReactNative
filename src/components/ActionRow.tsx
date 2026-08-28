/**
 * A labeled action button with a small "(?)" toggle next to it. Tapping the
 * "?" reveals a one-line caption naming the SDK function the button calls,
 * so every screen stays self-documenting without a modal or extra screen.
 * An optional `title` renders as a small heading above the button, for
 * screens that group several buttons under a named UI element.
 */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  title?: string;
  label: string;
  hint: string;
  onPress: () => void;
};

export default function ActionRow({ title, label, hint, onPress }: Props) {
  const [showHint, setShowHint] = useState(false);

  return (
    <View style={styles.row}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.line}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.hintToggle}
          onPress={() => setShowHint(v => !v)}
          accessibilityLabel={`What does "${label}" call?`}>
          <Text style={styles.hintToggleText}>?</Text>
        </TouchableOpacity>
      </View>
      {showHint && <Text style={styles.hintText}>{hint}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { width: '100%', alignItems: 'center', marginVertical: 8 },
  title: { fontSize: 16, fontWeight: '700', color: '#222', marginBottom: 6 },
  line: { flexDirection: 'row', alignItems: 'center' },
  button: {
    backgroundColor: '#5b3df0',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 6,
  },
  buttonText: { color: 'white', fontSize: 17, fontWeight: '600' },
  hintToggle: {
    marginLeft: 8,
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#5b3df0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintToggleText: { color: '#5b3df0', fontWeight: '700' },
  hintText: {
    marginTop: 5,
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    maxWidth: 280,
  },
});
