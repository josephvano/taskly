import { View, Text, StyleSheet } from "react-native";

function TimeDueText() {
  return (
    <View>
      <Text style={styles.text}>The item is due</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export { TimeDueText };
