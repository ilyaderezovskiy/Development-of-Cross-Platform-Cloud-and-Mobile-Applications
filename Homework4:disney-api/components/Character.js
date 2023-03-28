import { NavigationContainer, useNavigationContainer } from '@react-navigation/native';
import { useState, useParams, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import styles from './styles';
import firebase from "firebase";
require("firebase/firestore");
require('firebase/storage')


export default function Character({route, navigation}) {
  const firestore = firebase.firestore();

  const [currentCharacterDetail, setCharacter] = useState();
  const {name, image, films, shortFilms, tvShows, videoGames, list, email } = route.params;

  const handleSignOut = () => {
    var docs = firestore.collection('lists')
    .where('email', '==', email)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data()['listName']);
      });
    });
  }

  const setComment = () => {
    var lists = []
    var docs = firestore.collection('lists')
    .where('email', '==', email)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (lists.includes(doc.data()['listName'])) {
          
        } else {
          lists.push(doc.data()['listName']);
        }
      });
    });

    var docs = firestore.collection('comments')
    .where('email', '==', email)

    docs.where('character', '==', name)
    .limit(1)
    .get()
    .then((querySnapshot) => {
      if(!querySnapshot.forEach()) {
        navigation.navigate('ListOfCharacters', {
          name: name,
          image: image,
          comment: '',
          email: email,
          lists: lists,
        });
      }
      querySnapshot.forEach((doc) => {
          navigation.navigate('ListOfCharacters', {
            name: name,
            image: image,
            comment: doc.data()['comment'],
            email: email,
            lists: lists,
          });
        });
      });
  }

  return (
    <View style={{ flex: 1 }}>

      <Image
        style={{ width: 250, height: 250, marginTop: 15, alignSelf: 'center' }}
        source={{
          uri: image? image: require("../assets/no-image.png"),
        }}
      />
      <Text style={{ textAlign: 'center', alignSelf: 'center', fontSize: 28, marginTop: 10, width: 500, }}>{name}</Text>
      <Text style={{ textAlign: 'center', alignSelf: 'center', fontSize: 15, marginTop: 10, width: 700, }}>Films: {films}</Text>
      <Text style={{ textAlign: 'center', alignSelf: 'center', fontSize: 15, marginTop: 10, width: 700, }}>ShortFilms: {shortFilms}</Text>
      <Text style={{ textAlign: 'center', alignSelf: 'center', fontSize: 15, marginTop: 10, width: 700, }}>TvShows: {tvShows}</Text>
      <Text style={{ textAlign: 'center', alignSelf: 'center', fontSize: 15, marginTop: 10, width: 700, }}>VideoGames: {videoGames}</Text>
    
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.buttonSignOut}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={setComment}
        style={styles.buttonSignOut}
      >
        <Text style={styles.buttonText}>Добавить комментарий</Text>
      </TouchableOpacity>
    </View>
  );
}