import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PUSH_ENDPOINT = 'https://easy-soup.glitch.me/token';

const registerForPushNotifications = async () => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    alert('No notification permissions!');
    return;
  }

  // Get the token that identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: {
        value: token,
      }
    }),
  });
}

const App = () => {
  useEffect(() => {
    registerForPushNotifications()
  }, []);
  return (
    <View style={styles.container}>
      <Text>Notifications Example</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
