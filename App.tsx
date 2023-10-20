import * as React from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, Text, View } from 'react-native';
import * as TCServerSide from 'tcserverside-react-native';
import {TCDevice, TCApp} from 'tcserverside-react-native';
import {TCBeginCheckoutEvent} from 'tcserverside-react-native';
import {TCUser} from "tccore-react-native";


function test()
{
  console.log(TCUser.getInstance().anonymous_id);
  let t = new TCBeginCheckoutEvent()
  t.name = "haim"
}

export default function App() {
  return (
    <View style={styles.appContainer}>
      <ButtonRow />
    </View>
  );
}

const ButtonRow = () => {

  return (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.button}
      onPress={() => TCServerSide.initServerSide(3311, 'a_source_key')}>
      <Text style={styles.buttonText}>Init ServerSide</Text>
    </TouchableOpacity>
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
);
};

function executeEvent()
{
  let event = new TCBeginCheckoutEvent();
  event.currency = "USD"
  event.value = 12

  TCServerSide.execute(event)
}

function printValues()
{

  console.log("TCAPP values")

  console.log(TCApp.getInstance().name)
  console.log(TCApp.getInstance().version)
  console.log(TCApp.getInstance().build)
  console.log(TCApp.getInstance().nameSpace)
  console.log(TCApp.getInstance().coreVersion)
  console.log(TCApp.getInstance().serverSideVersion)


  console.log("TCDevice values")

  console.log(TCDevice.getInstance().sdkID)
  console.log(TCDevice.getInstance().manufacturer)
  console.log(TCDevice.getInstance().model)
  console.log(TCDevice.getInstance().name)
  console.log(TCDevice.getInstance().type)
  console.log(TCDevice.getInstance().timezone)
  console.log(TCDevice.getInstance().osName)
  console.log(TCDevice.getInstance().osVersion)
  console.log(TCDevice.getInstance().screenWidth)
  console.log(TCDevice.getInstance().screenHeight)

  console.log("TCUser values")

  console.log(TCUser.getInstance().consentID)
  console.log(TCUser.getInstance().anonymous_id)

}

function setAdditionalValues()
{
  TCDevice.getInstance().addAdditionalProperty("additional_string", "additional_val_string")
  TCDevice.getInstance().addAdditionalPropertyWithNumberValue("additional_num", 31.03)
  TCDevice.getInstance().addAdditionalPropertyWithNumberValue("additional_int", 31)
  TCDevice.getInstance().addAdditionalPropertyWithBooleanValue("additional_bool", true)
  TCDevice.getInstance().addAdditionalPropertyWithArrayValue("additional_list_int",[31,1998,30])
  TCDevice.getInstance().addAdditionalPropertyWithArrayValue("additional_list_string",["SAID","Abdelhakim"])

  TCApp.getInstance().addAdditionalProperty("additional_string", "additional_val_string")
  TCApp.getInstance().addAdditionalPropertyWithNumberValue("additional_num", 31.03)
  TCApp.getInstance().addAdditionalPropertyWithNumberValue("additional_int", 31)
  TCApp.getInstance().addAdditionalPropertyWithBooleanValue("additional_bool", true)
  TCApp.getInstance().addAdditionalPropertyWithArrayValue("additional_list_int",[31,1998,30])
  TCApp.getInstance().addAdditionalPropertyWithArrayValue("additional_list_string",["SAID","Abdelhakim"])

  TCUser.getInstance().addAdditionalProperty("additional_string", "additional_val_string")
  TCUser.getInstance().addAdditionalPropertyWithNumberValue("additional_num", 31.03)
  TCUser.getInstance().addAdditionalPropertyWithNumberValue("additional_int", 31)
  TCUser.getInstance().addAdditionalPropertyWithBooleanValue("additional_bool", true)
  TCUser.getInstance().addAdditionalPropertyWithArrayValue("additional_list_int",[31,1998,30])
  TCUser.getInstance().addAdditionalPropertyWithArrayValue("additional_list_string",["SAID","Abdelhakim"])

  console.log("successfully setted")
}

function clearAdditionalProperties()
{
  TCDevice.getInstance().clearAdditionalProperties()
  TCApp.getInstance().clearAdditionalProperties()
  TCUser.getInstance().clearAdditionalProperties()
}

function removeAdditionalValues()
{
  TCDevice.getInstance().removeAdditionalProperty("additional_string")
  TCDevice.getInstance().removeAdditionalProperty("additional_num")
  TCDevice.getInstance().removeAdditionalProperty("additional_int")
  TCDevice.getInstance().removeAdditionalProperty("additional_bool")
  TCDevice.getInstance().removeAdditionalProperty("additional_list_int")
  TCDevice.getInstance().removeAdditionalProperty("additional_list_string")
  TCDevice.getInstance().removeAdditionalProperty("additional_map")

  TCApp.getInstance().removeAdditionalProperty("additional_string")
  TCApp.getInstance().removeAdditionalProperty("additional_num")
  TCApp.getInstance().removeAdditionalProperty("additional_int")
  TCApp.getInstance().removeAdditionalProperty("additional_bool")
  TCApp.getInstance().removeAdditionalProperty("additional_list_int")
  TCApp.getInstance().removeAdditionalProperty("additional_list_string")


  TCUser.getInstance().removeAdditionalProperty("additional_string")
  TCUser.getInstance().removeAdditionalProperty("additional_num")
  TCUser.getInstance().removeAdditionalProperty("additional_int")
  TCUser.getInstance().removeAdditionalProperty("additional_bool")
  TCUser.getInstance().removeAdditionalProperty("additional_list_int")
  TCUser.getInstance().removeAdditionalProperty("additional_list_string")
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
});