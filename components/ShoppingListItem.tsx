import { AntDesign, Entypo } from "@expo/vector-icons";
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
    <View style={[styles.container, styles.row]}>
      <View style={[styles.row]}>
        <Entypo name={isCompleted ? "check" : "circle"} style={[styles.icon]} />
        <Text
          style={[styles.text, isCompleted ? stylesCompleted.text : undefined]}
        >
          {name}
        </Text>
      </View>
      <TouchableOpacity hitSlop={20} onPress={handleAlert}>
        <AntDesign
          name="close-circle"
          color={isCompleted ? theme.colorGrey : theme.color.red}
          size={24}
        />
      </TouchableOpacity>
    </View>
  );
}

const stylesCompleted = StyleSheet.create({
  buttonText: {
    color: theme.colorLightGrey,
  },
  text: {
    textDecorationLine: "line-through",
    color: theme.colorGrey,
  },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colorCerulean,
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    padding: 8,
    paddingHorizontal: 16,
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
    marginLeft: 16,
  },
  icon: {
    fontSize: 24,
    fontWeight: 300,
  },
});
