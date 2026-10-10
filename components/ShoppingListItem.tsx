import { Alert, Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { theme } from "../theme";

type Props = {
  name: string;
  isCompleted?: boolean;
};

export function ShoppingListItem({ name, isCompleted = false }: Props) {
  const onCancel = () => {
    console.log("Cancel");
  };

  const onYes = () => {
    console.log("Yes");
  };

  const handleAlert = () => {
    Alert.alert(
      `Are you sure you want to delete ${name}`,
      "It will be gone forever",
      [
        {
          text: "Yes",
          style: "default",
          onPress: onYes,
        },
        {
          text: "Cancel",
          style: "cancel",
          onPress: onCancel,
        },
      ],
    );
  };
  return (
    <View style={styles.container}>
      <Text
        style={[styles.text, isCompleted ? stylesCompleted.text : undefined]}
      >
        {name}
      </Text>
      <TouchableOpacity
        style={[
          styles.button,
          isCompleted ? stylesCompleted.button : undefined,
        ]}
        onPress={handleAlert}
      >
        <Text
          style={[
            styles.buttonText,
            isCompleted ? stylesCompleted.buttonText : undefined,
          ]}
        >
          Delete
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const stylesCompleted = StyleSheet.create({
  buttonText: {
    color: theme.colorLightGrey,
  },
  button: {
    backgroundColor: theme.colorGrey,
  },
  text: {
    textDecorationLine: "line-through",
    color: theme.colorGrey,
  },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colorCerulean,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  button: {
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: "#000",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 400,
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 300,
    color: "#0f0511",
  },
});
