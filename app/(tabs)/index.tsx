import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <ThemedText>Button 1</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <ThemedText>Button 2</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <ThemedText>Button 3</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <ThemedText>Button 4</ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
  button: {
    padding: 16,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
});