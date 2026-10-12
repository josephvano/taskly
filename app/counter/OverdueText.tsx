import { View, Text, StyleSheet } from "react-native";

function OverdueText() {
  return (
    <View>
      <Text style={styles.text}>The item is overdue</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export { OverdueText };
