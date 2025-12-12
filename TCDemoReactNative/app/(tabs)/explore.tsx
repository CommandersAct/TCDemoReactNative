import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

//import * as TCServerSide from '@commandersact/tcserverside-react-native';

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <ThemedText>Send Event</ThemedText>
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
    backgroundColor: '#96058aff',
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
});

/*

function executeEvent()
{
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
*/