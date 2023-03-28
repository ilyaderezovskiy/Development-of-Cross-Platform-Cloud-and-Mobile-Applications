import { NavigationContainer, useNavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { Button } from 'react-native';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-web';
import { useState } from 'react';
import styles from './styles';
import app from "../config/firebase.js"
import { Image } from 'react-native';
import ListOfCharacters from './ListOfCharacters';
import { auth } from '../config/firebase';

export default function Main({ route, navigation }) {
  const SEARCH_URL = "https://api.disneyapi.dev/character?name="
  const ALL_CHARACTERS_URL = "https://api.disneyapi.dev/characters?page=1"

  const [characters, setCharacters] = useState("");
  const userLists = [];
  const { email } = route.params;

  const searchCharacters = (url) => {
    if (url === SEARCH_URL) {
      url = ALL_CHARACTERS_URL;
    }
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setAtributes(json.data);
      });
  };

  const setAtributes = (data) => {
    data.forEach((character) => {
      const {
        films,
        shortFilms,
        _id,
        tvShows,
        videoGames,
        parkAttractions,
        allies,
        enemies,
        name,
        imageUrl,
        url
      } = character;

      setCharacters((list) => {
        return [
          ...list,
          {
            image: imageUrl,
            name: name,
            films: films,
            shortFilms: shortFilms,
            tvShows: tvShows,
            videoGames: videoGames,
            key: _id,
            comment: "",
          },
        ]
      })
    })
  }

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch(error => alert(error.message))
  }

  return (
    <View alignSelf='center'>
      <TextInput
        style={styles.searchInput}
        placeholder={"Search..."}
        onSubmitEditing={(event) => {
          setCharacters([]);
          searchCharacters(SEARCH_URL + event.nativeEvent.text);
        }}
      />

      <FlatList
        data={characters}
        style={{alignSelf: 'center'}}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tableItem}
            onPress={() => {
              navigation.navigate('Character', {
                name: item.name,
                image: item.image,
                films: item.films,
                shortFilms: item.shortFilms,
                tvShows: item.tvShows,
                videoGames: item.videoGames,
                list: userLists,
                email: email,
              });
            }}
          >
            <Image
              style={styles.image}
              source={
                item.image
                  ? { uri: item.image }
                  : require("../assets/no-image.png")
              }
              />
          </TouchableOpacity>
        )}
        numColumns={3}
      />

      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.buttonSignOut}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
} 