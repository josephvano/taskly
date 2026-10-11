import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  LayoutAnimation,
} from "react-native";
import * as Haptics from "expo-haptics";
import { EmptyList } from "../components/EmptyList";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { getDataFromStorage, Item, orderShoppingList, storeData } from "../lib";
import { theme } from "../theme";

const STORAGE_KEY = "shoppingList";

export default function Index() {
  const [value, setValue] = useState<string>("");

  const [items, setItems] = useState<Item[]>([]);

  // Load data from storage
  useEffect(() => {
    const loadData = async () => {
      const data = await getDataFromStorage(STORAGE_KEY);
      if (data) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setItems(data);
      }
    };
    loadData();
  }, []);

  const handleSubmit = async () => {
    if (!value) return;

    const newList = [
      {
        id: new Date().toISOString(),
        name: value,
        lastUpdatedTimestamp: Date.now(),
      },
      ...items,
    ];

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setItems(newList);

    setValue("");

    await storeData(STORAGE_KEY, newList);
  };

  const handleDelete = async (id: string) => {
    const newList = items.filter((item) => item.id !== id);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    setItems(newList);

    await storeData(STORAGE_KEY, newList);
  };

  const handleToggle = async (id: string) => {
    const shopping = items.map((item) => {
      const now = Date.now();
      if (item.id === id) {
        if (item.completedAtTimestamp) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        } else {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }

        return {
          ...item,
          lastUpdatedTimestamp: now,
          completedAtTimestamp: item.completedAtTimestamp ? undefined : now,
        };
      } else {
        return item;
      }
    });

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setItems(shopping);
    await storeData(STORAGE_KEY, shopping);
  };

  return (
    <FlatList
      data={orderShoppingList(items)}
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
          isCompleted={Boolean(item.completedAtTimestamp)}
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
