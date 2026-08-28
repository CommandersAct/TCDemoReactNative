/**
 * Shared screen chrome: a scrollable, padded container with a title and an
 * optional intro paragraph, used by every screen except ManageConsentScreen
 * (which needs a top-level FlatList instead, see its own file).
 */
import React, { ReactNode } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  intro?: string;
  children: ReactNode;
};

export default function Screen({ title, intro, children }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>{title}</Text>
      {intro && <Text style={styles.intro}>{intro}</Text>}
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingTop: 24, alignItems: 'center' },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 10 },
  intro: { fontSize: 17, color: '#333', textAlign: 'center', marginBottom: 18, lineHeight: 22 },
});
