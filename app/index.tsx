import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { theme } from "../theme";

type Item = {
  id: string;
  name: string;
  isCompleted?: boolean;
};

export default function Index() {
  const [value, setValue] = useState<string>("");

  const [items, setItems] = useState<Item[]>([
    {
      id: "1",
      name: "Milk",
      isCompleted: false,
    },
    {
      id: "2",
      name: "Butter",
      isCompleted: false,
    },
  ]);

  const handleSubmit = () => {
    if (!value) return;

    setItems([
      {
        id: new Date().toISOString(),
        name: value,
        isCompleted: false,
      },
      ...items,
    ]);

    setValue("");
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="e.g. Tacos"
          returnKeyType="join"
          value={value}
          onChangeText={(value: string) => setValue(value)}
          onSubmitEditing={() => handleSubmit()}
        />
      </View>
      {items.map((item) => (
        <ShoppingListItem
          name={item.name}
          key={item.id}
          isCompleted={item.isCompleted}
        />
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.white,
    paddingVertical: 32,
  },
  textInput: {
    borderColor: theme.color.grey,
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  link: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 24,
    paddingHorizontal: 24,
  },
});
