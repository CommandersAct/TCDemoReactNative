import { ThemedView } from '@/components/themed-view';
import * as TCConsent from "@commandersact/tcconsent-react-native";
import { TCUserInstance } from '@commandersact/tccore-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

let mockConsent: { [key: string]: string } = {
  'PRIVACY_CAT_1': '1',
  'PRIVACY_CAT_2': '1',
  'PRIVACY_CAT_3': '0',
  'PRIVACY_VEN_1': '0',
};


let mockVendorConsent: { [key: string]: string } = {
  'PRIVACY_VEN_1': '0',
  'PRIVACY_VEN_2': '1',
  'PRIVACY_VEN_3': '0',
};


export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <ScrollView style={styles.scrollView}>

          <TouchableOpacity
            style={styles.consentButton}
            onPress={TCConsent.acceptAllConsent}>
            <Text style={styles.buttonText}>acceptAllConsent</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.consentButton}
            onPress={TCConsent.refuseAllConsent}>
            <Text style={styles.buttonText}>refuseAllConsent</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.consentButton}
            onPress={() => TCConsent.showPrivacyCenter()}>
            <Text style={styles.buttonText}>showPrivacyCenter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.consentButton}
            onPress={() => TCConsent.useACString(true)}>
            <Text style={styles.buttonText}>useACString</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.consentButton}
            onPress={() => TCConsent.setConsentDuration(9)}>
            <Text style={styles.buttonText}>setConsentDuration</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.consentButton}
            onPress={TCConsent.useCustomPublisherRestrictions}>
            <Text style={styles.buttonText}>useCustomPublisherRestrictions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.consentButton}
            onPress={() => TCUserInstance.external_consent = mockConsent}>
            <Text style={styles.buttonText}>Set external consent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.consentButton}
            onPress={() => TCUserInstance.consent_vendors = mockVendorConsent}>
            <Text style={styles.buttonText}>Set external vendors consent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.consentButton}
            onPress={() => TCConsent.saveConsentFromPopUp(mockConsent)}>
            <Text style={styles.buttonText}>saveConsentFromPopUp</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.consentButton}
            onPress={() => TCConsent.saveConsent(mockConsent)}>
            <Text style={styles.buttonText}>saveConsent</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.consentButton}
            onPress={() => TCConsent.saveConsentFromConsentSourceWithPrivacyAction(mockConsent, TCConsent.ETCConsentSource.POP_UP, TCConsent.ETCConsentAction.SAVE)}>
            <Text style={styles.buttonText}>saveConsentFromConsentSourceWithPrivacyAction</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.consentButton}
            onPress={() => TCConsent.TCConsentAPI.getLastTimeConsentWasSaved()}>
            <Text style={styles.buttonText}>GetLastTimeConsentWasSaved</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.consentButton}
            onPress={TCConsent.statEnterPCToVendorScreen}>
            <Text style={styles.buttonText}>statEnterPCToVendorScreen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.consentButton}
            onPress={TCConsent.statShowVendorScreen}>
            <Text style={styles.buttonText}>statShowVendorScreen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.consentButton}
            onPress={TCConsent.statViewPrivacyPoliciesFromPrivacyCenter}>
            <Text style={styles.buttonText}>statViewPrivacyPoliciesFromPrivacyCenter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.consentButton}
            onPress={TCConsent.statViewPrivacyCenter}>
            <Text style={styles.buttonText}>statViewPrivacyCenter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.consentButton}
            onPress={TCConsent.statViewBanner}>
            <Text style={styles.buttonText}>statViewBanner</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.consentButton}
            onPress={TCConsent.resetSavedConsent}>
            <Text style={styles.buttonText}>resetSavedConsent</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.consentButton}
            onPress={() => TCConsent.setLanguage("fr")}>
            <Text style={styles.buttonText}>setLanguage to "fr"</Text>
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

  consentButton: {
    backgroundColor: 'purple',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',

  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});