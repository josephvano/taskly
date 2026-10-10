import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "./theme";

export default function App() {
  const handleAlert = () => {
    Alert.alert(
      "Are you sure you want to delete this",
      "It will be gone forever",
      [
        {
          text: "Yes",
          style: "default",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Text style={styles.colorful}>Coffee</Text>
        <TouchableOpacity style={styles.button} onPress={handleAlert}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 36,
    paddingVertical: 48,
  },
  input: {
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
    fontSize: 24,
    fontWeight: 400,
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  colorful: {
    fontSize: 24,
    fontWeight: 300,
    color: "#af3cdd",
  },
});
