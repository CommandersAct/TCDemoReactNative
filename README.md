
# Read Me : 

This is a demo app for implementing commandersAct's react-native bridges

* [TCCore](https://github.com/CommandersAct/tccore-react-native)
* [TCServerSide](https://github.com/CommandersAct/tcserverside-react-native)
* [TCConsent](https://github.com/CommandersAct/tcconsent-react-native)


Main code is inside ./App.tsx file

More importantly, you'll need to read the native documentation for full details.
 * [Android](https://github.com/CommandersAct/Androidv5)
 * [iOS](https://github.com/commandersact/iosv5)

Initialization is done once the app is loaded : 

```js
// App.tsx file :

export default function App() {
  initialize() // we call initialization for both TCServerSide and TCConsent bridges
  return (
    <View style={styles.appContainer}>
      <ButtonRow />
    </View>
  );
}

async function initialize()
{
    // Check with your consultant or in your platform for the siteID, privacyID for TCConsent,
    // and for your TCServerSide's sourceKey

  TCConsent.setSiteIDPrivacyID(3311, 2929)
  TCServerSide.initServerSide(3311, 'a_source_key')
}

```
App will display a list of button, each one of them will invoke a ServerSide/TCConsent method, you will need to keep an eye on android studio logcat / xcode console / react-native console for displayed logs. 


# Support & Contact : 

Support : support@commandersact.com

http://www.commandersact.com

Commanders Act | 7b rue taylor - 75010 PARIS - France

![Commanders Act logo](res/ca_logo.png)
