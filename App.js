import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Text, View, StyleSheet, Image, TouchableOpacity, Button, Alert } from 'react-native';

export default function App() {
  const [heartColor, setHeartColor] = useState('green');
  const [backgroundColor, setBackgroundColor] = useState('red');

  const toggleHeartColor = () => {
    setHeartColor(heartColor === 'red' ? 'green' : 'red');
  };

  const trocarFundo = () => {
    setBackgroundColor(backgroundColor === 'green' ? 'red' : 'green');
    setHeartColor(heartColor === 'red' ? 'green' : 'red');
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Image
        source={{ uri: 'https://github.com/LuizzOliveira.png' }}
        style={styles.image}
      />
      <Text style={styles.text}>Olá, Sou o Luiz sua IA! 🚀</Text>

      <TouchableOpacity onPress={toggleHeartColor}>
        <AntDesign name='heart' size={24} color={heartColor} />
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <Button title="Trocar Fundo" onPress={trocarFundo} color="#1E90FF" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  text: {
    fontSize: 30,
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: 150,
  },
});