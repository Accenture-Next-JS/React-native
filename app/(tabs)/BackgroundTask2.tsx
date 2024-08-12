import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Notifications from 'expo-notifications';

const TASK_NAME = 'BACKGROUND_FETCH_TASK';

// Define the background task
TaskManager.defineTask(TASK_NAME, async () => {
  // Display a notification or alert
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Background Task",
      body: "Hello from the background task!",
    },
    trigger: null, // Trigger immediately
  });

  // You can also store the result in AsyncStorage if you want to retrieve it later in the UI

  return BackgroundFetch.Result.NewData;
});

const BackgroundTask = () => {
  const [taskRegistered, setTaskRegistered] = useState(false);

  const handleButtonPress = async () => {
    try {
      if (!taskRegistered) {
        await BackgroundFetch.registerTaskAsync(TASK_NAME, {
          minimumInterval: 15 * 60, // 15 minutes
          stopOnTerminate: false, // Continue running after the app is terminated
          startOnBoot: true, // Start the task on device boot
        });
        setTaskRegistered(true);
        Alert.alert('Success', 'Background task registered successfully!');
      } else {
        Alert.alert('Info', 'Background task is already registered.');
      }
    } catch (error) {
      console.error('Failed to register background task:', error);
      Alert.alert('Error', 'Failed to register background task.');
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Trigger Background Task"
        onPress={handleButtonPress}
      />
      <Text style={styles.infoText}>
        {taskRegistered ? 'Background task is registered.' : 'Press the button to register the background task.'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  infoText: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default BackgroundTask;
