import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { theme } from "../theme";

export default function Index() {
  return (
    <View style={styles.container}>
      <ShoppingListItem name="Coffee" isCompleted />
      <ShoppingListItem name="Sugar" />
      <ShoppingListItem name="Tea" isCompleted />
      <ShoppingListItem name="Milk" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.white,
    justifyContent: "center",
  },
});
