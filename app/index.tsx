import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, TextInput, View, FlatList } from "react-native";
import { EmptyList } from "../components/EmptyList";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { theme } from "../theme";

type Item = {
  id: string;
  name: string;
  completedAt?: number;
};

export default function Index() {
  const [value, setValue] = useState<string>("");

  const [items, setItems] = useState<Item[]>([]);

  const handleSubmit = () => {
    if (!value) return;

    setItems([
      {
        id: new Date().toISOString(),
        name: value,
      },
      ...items,
    ]);

    setValue("");
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleToggle = (id: string) => {
    const shopping = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completedAt: item.completedAt ? undefined : Date.now(),
        };
      } else {
        return item;
      }
    });

    setItems(shopping);
  };

  return (
    <FlatList
      data={items}
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={
        <View style={styles.textContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. Tacos"
            returnKeyType="join"
            value={value}
            onChangeText={(value: string) => setValue(value)}
            onSubmitEditing={() => handleSubmit()}
          />
        </View>
      }
      renderItem={({ item }) => (
        <ShoppingListItem
          name={item.name}
          isCompleted={Boolean(item.completedAt)}
          onDelete={() => handleDelete(item.id)}
          onToggle={() => handleToggle(item.id)}
        />
      )}
      ListEmptyComponent={EmptyList}
    >
      <StatusBar style="auto" />
    </FlatList>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 32,
  },
  container: {
    flex: 1,
    backgroundColor: theme.color.white,
  },
  textContainer: {
    paddingVertical: 32,
    backgroundColor: theme.color.white,
  },
  textInput: {
    backgroundColor: theme.color.white,
    borderColor: theme.color.grey,
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 20,
    paddingHorizontal: 24,
  },
  link: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 24,
    paddingHorizontal: 24,
  },
});
