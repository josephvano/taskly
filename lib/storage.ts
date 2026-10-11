import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Retrieves data from AsyncStorage for the given key.
 * @param key The key to retrieve data for.
 * @returns The parsed data or null if not found or an error occurs.
 */
async function getDataFromStorage(key: string): Promise<any> {
  try {
    console.log(`attempting to get data from ${key}`);

    const value = await AsyncStorage.getItem(key);

    if (value !== null) {
      const parsed = JSON.parse(value);

      console.log(`retrieved data from ${key}: ${value}`);

      return parsed;
    }
  } catch (error) {
    console.log(error);
  }

  console.log(`Could not get data from ${key}`);

  return null;
}

/**
 * Stores data in AsyncStorage for the given key.
 * @param key The key to store data for.
 * @param value The value to store.
 */
async function storeData(key: string, value: any): Promise<void> {
  try {
    const jsonValue = JSON.stringify(value);

    console.log(`storing data to ${key}: ${jsonValue}`);

    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.log(error);
  }
}

export { getDataFromStorage, storeData };
