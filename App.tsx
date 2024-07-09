import * as React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, View } from 'react-native';
import * as TCServerSide from '@commandersact/tcserverside-react-native';
import {TCAppInstance, TCDeviceInstance, TCBeginCheckoutEvent, TCItem, TCProduct} from '@commandersact/tcserverside-react-native';
import {TCUserInstance} from "@commandersact/tccore-react-native";
import * as TCConsent from '@commandersact/tcconsent-react-native';

let mockConsent: { [key: string]: string } = {
  'PRIVACY_CAT_1': '1',
  'PRIVACY_CAT_2': '1',
  'PRIVACY_CAT_3': '0',
  'PRIVACY_VEN_1': '0',
};

export default function App() {
  initialize()
  return (
    <View style={styles.appContainer}>
      <ButtonRow />
    </View>
  );
}

async function initialize()
{
  TCConsent.setSiteIDPrivacyID(3311, 2929)
  TCServerSide.initServerSide(3311, 'a_source_key')
}

function printTCUser()
{
  console.log(TCUserInstance.anonymous_id)
}

const ButtonRow = () => {

  return (
    <ScrollView>
       <View style={styles.container}>

       <TouchableOpacity
          style={styles.button}
          onPress={executeEvent}>
          <Text style={styles.buttonText}>Send Event</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={printValues}>
          <Text style={styles.buttonText}>Print values</Text>
        </TouchableOpacity>


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
          onPress={TCConsent.showPrivacyCenter}>
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

        <TouchableOpacity
          style={styles.button}
          onPress={setAdditionalValues}>
          <Text style={styles.buttonText}>Add Additional properties</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={TCServerSide.disableServerSide}>
          <Text style={styles.buttonText}>Disable ServerSide</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={TCServerSide.enableServerSide}>
          <Text style={styles.buttonText}>Enable ServerSide</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={TCServerSide.addAdvertisingID}>
          <Text style={styles.buttonText}>addAdvertisingID</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={TCServerSide.enableRunningInBackground}>
          <Text style={styles.buttonText}>enableRunningInBackground</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={removeAdditionalValues}>
          <Text style={styles.buttonText}>Remove Addional Value</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={clearAdditionalProperties}>
          <Text style={styles.buttonText}>Clear Addional Value</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
);
};

function executeEvent()
{
  let event = new TCBeginCheckoutEvent();
  event.currency = "USD"
  event.value = 12

  let product_1 = new TCProduct()

  product_1.ID = "product_1_id";
  product_1.name = "product_1_name";
  product_1.currency = "product_1_currency";
  product_1.categories = ["prod_1_cat1", "prod_1_cat2"];
  product_1.brand = "prod_1_brand"
  product_1.colors = ["prod_1_col1", "prod_1_col2"]
  product_1.size = "prod_1_size";
  let item_1 = new TCItem();
  item_1.ID = "item_1_id"
  item_1.variant = "item_1_variant"
  item_1.list_position = 1
  item_1.discount = 0.21
  item_1.quantity = 3
  item_1.affiliation = "item_1_affiliation"
  item_1.coupon = "item_1_coupon"
  item_1.product = product_1

  let product_2 = new TCProduct()

  product_2.ID = "product_2_id";
  product_2.name = "product_2_name";
  product_2.currency = "product_2_currency";
  product_2.categories = ["prod_2_cat1", "prod_2_cat2"];
  product_2.brand = "prod_2_brand"
  product_2.colors = ["prod_2_col1", "prod_2_col2"]
  product_2.size = "prod_2_size";
  let item_2 = new TCItem();
  item_2.ID = "item_2_id"
  item_2.variant = "item_2_variant"
  item_2.list_position = 1
  item_2.discount = 0.21
  item_2.quantity = 3
  item_2.affiliation = "item_2_affiliation"
  item_2.coupon = "item_2_coupon"
  item_2.product = product_2

  event.items = [item_1, item_2]

  event.addAdditionalProperty("add_property", "addValue")

  console.log(event)
  TCServerSide.execute(event)
}

function printValues()
{

  console.log("TCAPP values")

  console.log(TCAppInstance.name)
  console.log(TCAppInstance.version)
  console.log(TCAppInstance.build)
  console.log(TCAppInstance.nameSpace)
  console.log(TCAppInstance.coreVersion)
  console.log(TCAppInstance.serverSideVersion)


  console.log("TCDevice values")

  console.log(TCDeviceInstance.sdkID)
  console.log(TCDeviceInstance.manufacturer)
  console.log(TCDeviceInstance.model)
  console.log(TCDeviceInstance.name)
  console.log(TCDeviceInstance.type)
  console.log(TCDeviceInstance.timezone)
  console.log(TCDeviceInstance.osName)
  console.log(TCDeviceInstance.osVersion)
  console.log(TCDeviceInstance.screenWidth)
  console.log(TCDeviceInstance.screenHeight)

  console.log("TCUser values")

  console.log(TCUserInstance.consentID)
  console.log(TCUserInstance.anonymous_id)

}

function setAdditionalValues()
{
  TCDeviceInstance.addAdditionalProperty("additional_string", "additional_val_string")
  TCDeviceInstance.addAdditionalPropertyWithNumberValue("additional_num", 31.03)
  TCDeviceInstance.addAdditionalPropertyWithNumberValue("additional_int", 31)
  TCDeviceInstance.addAdditionalPropertyWithBooleanValue("additional_bool", true)

  TCAppInstance.addAdditionalProperty("additional_string", "additional_val_string")
  TCAppInstance.addAdditionalPropertyWithNumberValue("additional_num", 31.03)
  TCAppInstance.addAdditionalPropertyWithNumberValue("additional_int", 31)
  TCAppInstance.addAdditionalPropertyWithBooleanValue("additional_bool", true)

  TCUserInstance.addAdditionalProperty("additional_string", "additional_val_string")
  TCUserInstance.addAdditionalPropertyWithNumberValue("additional_num", 31.03)
  TCUserInstance.addAdditionalPropertyWithNumberValue("additional_int", 31)
  TCUserInstance.addAdditionalPropertyWithBooleanValue("additional_bool", true)

  console.log("successfully setted")
}

function clearAdditionalProperties()
{
  TCDeviceInstance.clearAdditionalProperties()
  TCAppInstance.clearAdditionalProperties()
  TCUserInstance.clearAdditionalProperties()
}

function removeAdditionalValues()
{
  TCDeviceInstance.removeAdditionalProperty("additional_string")
  TCDeviceInstance.removeAdditionalProperty("additional_num")
  TCDeviceInstance.removeAdditionalProperty("additional_int")
  TCDeviceInstance.removeAdditionalProperty("additional_bool")
  TCDeviceInstance.removeAdditionalProperty("additional_list_int")
  TCDeviceInstance.removeAdditionalProperty("additional_list_string")
  TCDeviceInstance.removeAdditionalProperty("additional_map")

  TCAppInstance.removeAdditionalProperty("additional_string")
  TCAppInstance.removeAdditionalProperty("additional_num")
  TCAppInstance.removeAdditionalProperty("additional_int")
  TCAppInstance.removeAdditionalProperty("additional_bool")
  TCAppInstance.removeAdditionalProperty("additional_list_int")
  TCAppInstance.removeAdditionalProperty("additional_list_string")


  TCUserInstance.removeAdditionalProperty("additional_string")
  TCUserInstance.removeAdditionalProperty("additional_num")
  TCUserInstance.removeAdditionalProperty("additional_int")
  TCUserInstance.removeAdditionalProperty("additional_bool")
  TCUserInstance.removeAdditionalProperty("additional_list_int")
  TCUserInstance.removeAdditionalProperty("additional_list_string")
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    marginTop: 64
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  consentButton: {
    backgroundColor: 'purple',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
});