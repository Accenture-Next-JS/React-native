import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import * as Device from 'expo-device';

const LocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {

      if (Platform.OS === 'android' && !Device.isDevice) {
        setErrorMsg('Oops, this will not work on an Android emulator. Try it on your device!');
        return;
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setHasPermission(false);
      } else {
        setHasPermission(true);
      }
    })();
  }, []);

  const handleGetLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      setErrorMsg('Could not fetch location. Please try again.');
    }
  };

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      {hasPermission === false ? (
        <Button
          title="Grant Location Permission"
          onPress={async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
              setHasPermission(true);
              setErrorMsg(null);
            } else {
              setErrorMsg('Permission to access location was denied');
            }
          }}
        />
      ) : (
        <Button title="Get Location" onPress={handleGetLocation} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
});

export default LocationScreen;
