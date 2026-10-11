import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { registerPushNotifications } from "../../lib";

export default function CounterScreen() {
  const handleRequestPermission = async () => {
    const status = await registerPushNotifications();
    console.log(`Push Notifications permission status: ${status}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleRequestPermission}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Schedule notification</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
