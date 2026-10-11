import { Text, View } from "react-native";
import { StyleSheet } from "react-native";

export function EmptyList() {
  return (
    <View style={styles.container}>
      <Text>Your shopping list is empty.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
  },
});
