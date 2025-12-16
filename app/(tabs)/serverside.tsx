import { ThemedView } from '@/components/themed-view';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TCUserInstance } from '@commandersact/tccore-react-native';
import * as TCServerSide from '@commandersact/tcserverside-react-native';
import { TCAppInstance, TCDeviceInstance } from '@commandersact/tcserverside-react-native';

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <ScrollView style={styles.scrollView}>


          <TouchableOpacity
            style={styles.button}
            onPress={executeEvent}>
            <Text style={styles.buttonText}>Send Event</Text>
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
            onPress={printValues}>
            <Text style={styles.buttonText}>Print values</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.button}
            onPress={setCustomValues}>
            <Text style={styles.buttonText}>Set Custom values</Text>
          </TouchableOpacity>


        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

function printValues() {

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

function setCustomValues() {
  TCDeviceInstance.sdkID = "custom-sdkID-set-by-user1234567890"
  TCUserInstance.anonymous_id = "custom-anonymous_id-set-by-user1234567890"
  TCUserInstance.consentID = "custom-consent-ID-set-by-user1234567890"
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
    backgroundColor: '#051d96ff',
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});



function executeEvent() {
  let event = new TCServerSide.TCBeginCheckoutEvent();
  event.currency = "USD"
  event.value = 12

  let product_1 = new TCServerSide.TCProduct()

  product_1.ID = "product_1_id";
  product_1.name = "product_1_name";
  product_1.currency = "product_1_currency";
  product_1.categories = ["prod_1_cat1", "prod_1_cat2"];
  product_1.brand = "prod_1_brand"
  product_1.colors = ["prod_1_col1", "prod_1_col2"]
  product_1.size = "prod_1_size";
  let item_1 = new TCServerSide.TCItem();
  item_1.ID = "item_1_id"
  item_1.variant = "item_1_variant"
  item_1.list_position = 1
  item_1.discount = 0.21
  item_1.quantity = 3
  item_1.affiliation = "item_1_affiliation"
  item_1.coupon = "item_1_coupon"
  item_1.product = product_1

  let product_2 = new TCServerSide.TCProduct()

  product_2.ID = "product_2_id";
  product_2.name = "product_2_name";
  product_2.currency = "product_2_currency";
  product_2.categories = ["prod_2_cat1", "prod_2_cat2"];
  product_2.brand = "prod_2_brand"
  product_2.colors = ["prod_2_col1", "prod_2_col2"]
  product_2.size = "prod_2_size";
  let item_2 = new TCServerSide.TCItem();
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
