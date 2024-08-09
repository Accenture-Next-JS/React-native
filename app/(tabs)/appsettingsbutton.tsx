import React from 'react';
import { View, Button, StyleSheet, Linking, Platform } from 'react-native';

const AppSettingsButton = () => {

  const openAppSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Reset Permissions" onPress={openAppSettings} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppSettingsButton;
