import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { theme } from "../theme";

export default function Index() {
  const router = useRouter();

  const handleRoute = () => {
    router.navigate("/counter");
  };

  return (
    <View style={styles.container}>
      <View style={styles.link}>
        <TouchableOpacity onPress={handleRoute}>
          <Text>Go to counter</Text>
        </TouchableOpacity>
        <Link href={"/idea"}>Go to /idea</Link>
      </View>
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
  link: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 24,
    paddingHorizontal: 24,
  },
});
