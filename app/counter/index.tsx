import { Duration, isBefore, intervalToDuration } from "date-fns";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { TimeSegment } from "../../components/TimeSegment";
import { registerPushNotifications } from "../../lib";
import { OverdueText } from "./OverdueText";
import { TimeDueText } from "./TimeDueText";

const timestampDue = Date.now() + 10000; // 10 seconds from now

type CountdownStatus = {
  isOverdue: boolean;
  distance: Duration;
};

export default function CounterScreen() {
  const [timer, setTimer] = useState(0);
  const [status, setStatus] = useState<CountdownStatus>({
    isOverdue: false,
    distance: intervalToDuration({ start: 0, end: 0 }),
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);

      const now = Date.now();
      const isOverdue = isBefore(timestampDue, now);
      const distance = isOverdue
        ? intervalToDuration({ start: timestampDue, end: now })
        : intervalToDuration({ start: now, end: timestampDue });

      setStatus({ isOverdue, distance });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const scheduleNotification = async () => {
    const result = await registerPushNotifications();

    if (result === "granted") {
      const Notifications = await import("expo-notifications");

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Scheduled Notification",
          body: "This is a scheduled notification.",
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 5,
        },
      });
    } else {
      Alert.alert(
        "Unable to schedule notification",
        "Push Notifications permission was not granted.",
      );
    }
    console.log(`Push Notifications permission status: ${result}`);
  };

  return (
    <View
      style={[
        styles.container,
        status.isOverdue
          ? { backgroundColor: "red" }
          : { backgroundColor: "white" },
      ]}
    >
      <View style={styles.row}>
        {status.isOverdue ? <OverdueText /> : <TimeDueText />}
      </View>
      <View style={styles.row}>
        <TimeSegment
          unit="Days"
          number={status.distance?.days ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Hours"
          number={status.distance?.hours ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Minutes"
          number={status.distance?.minutes ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Seconds"
          number={status.distance?.seconds ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
      </View>
      <TouchableOpacity
        onPress={scheduleNotification}
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  whiteText: {
    color: "#fff",
  },
  timerText: {
    fontSize: 48,
    fontWeight: "bold",
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
