import { Platform } from "react-native";
import * as Device from "expo-device";
import { isRunningInExpoGo } from "expo";

/**
 * Registers push notifications for the app. This function checks if the device supports push notifications and requests permission from the user. If permission is granted, it logs a message indicating that push notifications are enabled. If permission is denied or the device does not support push notifications, it logs an appropriate message.
 */
async function registerPushNotifications() {
  const isExpoGo = isRunningInExpoGo();

  if (Platform.OS === "android" && isExpoGo) {
    console.log(
      "Skipping push registration in Expo Go on Android. Use a development build for remote notifications.",
    );
    return null;
  }

  const Notifications = await import("expo-notifications");

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
      showBadge: false,
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();

      console.log(`Push Notifications permission status: ${status}`);
      return status;
    } else {
      console.log(
        `Existing Push Notifications permission status: ${existingStatus}`,
      );
      return existingStatus;
    }
  } else {
    console.log("Must use physical device for Push Notifications");
    return null;
  }
}

export { registerPushNotifications };
