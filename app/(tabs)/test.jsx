import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';

const Demo = () => {
  const [count, setCount] = useState(0);
  const [ip, setIp] = useState('');
  const onPress = () => setCount(count + 1);
  useEffect(()=> {
    fetch('https://api.ipify.org?format=json')
   .then((data)=>data.json())
    .then((data) => setIp(data.ip))
  }, [])
  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor={"red"}
        onPress={onPress} 
        delayPressOut={1000}
      >
        <View style={styles.button}>
          <Text>Touch Here</Text>
          <Text>And your IP is {ip}</Text>
        </View>
      </TouchableHighlight>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>{count}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  countText: {
    color: '#FF00FF',
  },
});

export default Demo;