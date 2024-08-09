import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, Alert, Platform } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Notifications from 'expo-notifications';

const TASK_NAME = 'BACKGROUND_FETCH_TASK';

// Function to calculate Fibonacci numbers up to 1000
const calculateFibonacciUpTo1000 = () => {
  let fib = [0, 1];
  let nextFib = fib[0] + fib[1];

  while (nextFib <= 1000) {
    fib.push(nextFib);
    nextFib = fib[fib.length - 1] + fib[fib.length - 2];
  }

  return fib;
};

// Define the background task
TaskManager.defineTask(TASK_NAME, async () => {
  try {
    const fibNumbers = calculateFibonacciUpTo1000();

    // Returning Fibonacci sequence to be displayed in the app
    return fibNumbers.join(', ');
  } catch (error) {
    console.error("Background task error:", error);
    return BackgroundFetch.Result.Failed;
  }
});

const BackgroundTask = () => {
  const [taskRegistered, setTaskRegistered] = useState(false);
  const [fibResult, setFibResult] = useState<string | null>(null);

  useEffect(() => {
    const checkStatusAsync = async () => {
      const status = await BackgroundFetch.getStatusAsync();
      console.log('Background fetch status:', status);
    };

    checkStatusAsync();
  }, []);

  const handleButtonPress = async () => {
    try {
      if (!taskRegistered) {
        await BackgroundFetch.registerTaskAsync(TASK_NAME, {
          minimumInterval: 15 * 60, // 15 minutes (realistic interval)
          stopOnTerminate: false,
          startOnBoot: true,
        });

        setTaskRegistered(true);
        Alert.alert('Success', 'Background task registered successfully!');

        const fibNumbers = calculateFibonacciUpTo1000();
        setFibResult(fibNumbers.join(', '));
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
      {fibResult && (
        <Text style={styles.resultText}>
          {`Fibonacci sequence up to 1000: ${fibResult}`}
        </Text>
      )}
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
  resultText: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default BackgroundTask;
