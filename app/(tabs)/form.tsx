import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const SimpleForm = () => {
  const { control, handleSubmit } = useForm();
  const [dat, setDat] = useState('');
  //const [text, setText] = useState('');
  const onSubmit = (data) => {
    console.log(data);
    setDat(JSON.stringify(data));
    // Here you can perform further actions with the form data, like sending it to a server
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forms</Text>
      <Controller
        control={control}
        name="fieldName"
        render={({ field }) => (
          <TextInput
            {...field}
            onChangeText={}
            style={styles.input}
            placeholder="Enter your data"
            // Add other TextInput props as needed
          />
        )}
      />
      <Text>
        !! {dat} !!
      </Text>
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    width: '70%',
  },
});

export default SimpleForm;

