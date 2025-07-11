import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function App() {
  // Login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  // Jogo da velha
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXturn, setIsXTurn] = useState(true);
  const [gameResult, setGameResult] = useState(null);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const checkWinner = (currentBoard) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }
    return null;
  };

  const handlePress = (index) => {
    if (board[index] || gameResult) return;

    const newBoard = [...board];
    newBoard[index] = isXturn ? 'X' : 'O';
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      setGameResult(`${winner} venceu!`);
      return;
    }

    if (!newBoard.includes(null)) {
      setGameResult('Empate!');
      return;
    }

    setIsXTurn(!isXturn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setGameResult(null);
  };

  const renderCell = (index) => (
    <TouchableOpacity
      key={index}
      style={styles.cell}
      onPress={() => handlePress(index)}
      disabled={!!board[index] || !!gameResult}
    >
      <Text style={styles.cellText}>{board[index]}</Text>
    </TouchableOpacity>
  );

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      setLoggedIn(true);
    } else {
      alert('Usuário ou senha inválidos');
    }
  };

  if (!loggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Usuário"
          value={username}
          onChangeText={setUsername}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secure}
          />
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <AntDesign name={secure ? 'eyeo' : 'eye'} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo da Velha</Text>

      <Text style={styles.status}>
        {gameResult ? gameResult : `Vez do jogador: ${isXturn ? 'X' : 'O'}`}
      </Text>

      <View style={styles.board}>
        {[0, 1, 2].map(i => renderCell(i))}
        {[3, 4, 5].map(i => renderCell(i))}
        {[6, 7, 8].map(i => renderCell(i))}
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Reiniciar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  cell: {
    width: '33.33%',
    height: '33.33%',
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
  },
  cellText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'black',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  status: {
    fontSize: 20,
    marginBottom: 20,
  },
  resetButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  input: {
    width: '20%',
    height: 40,
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '20%',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  inputPassword: {
    flex: 1,
    height: 40,
  },
  loginButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
