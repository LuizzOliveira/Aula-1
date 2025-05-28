import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';

export default function App() {
  const [heartColor, setHeartColor] = useState('green');
  const [backgroundColor, setBackgroundColor] = useState('blue');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true); // controlar visibilidade da senha

  const toggleHeartColor = () => {
    setHeartColor(heartColor === 'blue' ? 'green' : 'blue');
  };

  const trocarFundo = () => {
    setBackgroundColor(backgroundColor === 'green' ? 'blue' : 'green');
    setHeartColor(heartColor === 'blue' ? 'green' : 'blue');
  };

  const showAlert = () => {
    try {
      alert(`Olá ${username}`);
    } catch (error) {
      console.error("Erro no show alert: " + error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Image
        source={{ uri: 'https://github.com/LuizzOliveira.png' }}
        style={styles.image}
      />
      <Text style={styles.text}>Olá, Sou o Luiz sua IA! 🚀</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)} 
        value={username}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Senha"
          secureTextEntry={secure}
          onChangeText={text => setPassword(text)} 
          value={password}
        />
        <TouchableOpacity onPress={() => setSecure(!secure)}>
          <AntDesign name={secure ? 'eyeo' : 'eye'} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={toggleHeartColor}>
        <AntDesign name='heart' size={24} color={heartColor} />
      </TouchableOpacity>

      <TouchableOpacity onPress={showAlert} style={styles.customButton}>
        <Text style={styles.buttonText}>Clique aqui</Text>
      </TouchableOpacity>
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
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  inputPassword: {
    flex: 1,
    height: 40,
  },
  customButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});
