import { NavigationContainer, useNavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { StyleSheet, KeyboardAvoidingView, Image, Pressable, TouchableOpacity, TextInput, Text, View } from 'react-native';
import { auth } from '../config/firebase';
import styles from './styles';
import firebase from "firebase";
require("firebase/firestore");
require('firebase/storage')

export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [currentEmail, setCurrentEmail] = useState('')

  const firestore = firebase.firestore();

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     if (user) {
  //       // var j = currentEmail;
  //       console.log(currentEmail);
  //       navigation.navigate("Main", {email: currentEmail, });
  //     }
  //   })

  //   return unsubscribe
  // }, [])

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;

        firestore.collection("users").add({
          email: email
        })
        .catch(error => alert(error.message))

        avigation.navigate("Main", {email: currentEmail, });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      })
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
      })
      .catch(error => alert(error.message))

      navigation.navigate("Main", {email: currentEmail, });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          value={email}
          onChangeText={text => {setEmail(text), setCurrentEmail(text)}}
          style={styles.input}
        />
        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}