import { NavigationContainer, useNavigationContainer } from '@react-navigation/native';
import React, { useState, useParams, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-web';
import { Image, TextInput, Text, View } from 'react-native';
import styles from './styles';
import firebase from "firebase";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
require("firebase/firestore");
require('firebase/storage')

export default function ListOfCharacters({route, navigation}) {
  const { name, image, comment, email, lists } = route.params;
  const [text, onChangeText] = React.useState(comment);
  const [category, setCategory] = React.useState([]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
      
      value.map((item) => {
        if (item[1] === false) {
          firestore.collection("lists").add({
            email: email,
            character: name,
            listName: [item[0], true]
          })
          .catch(error => alert(error.message))
        }
      }),
    )
  }

  const firestore = firebase.firestore();

  const onChange = (text) => {
    onChangeText(text);
    var docs = firestore.collection('comments')
    .where('email', '==', email)

    docs = docs.where('character', '==', name)
    .limit(1)
    .get()

    console.log(!docs)
    // .then((querySnapshot) => {
    //   console.log(docs)
    //   if(firestore.collection("comments").doc(doc.id)['comment'] === '') {
    //     firestore.collection("comments").add({
    //       email: email,
    //       character: name,
    //       comment: text,
    //     })
    //     .catch(error => alert(error.message))
    //   } else {
    //     querySnapshot.forEach((doc) => {
    //       firestore.collection("comments").doc(doc.id).update({
    //         "comment": text,
    //       })
    //     });
    //   }
    // });
  };

  return (
    <View style={styles.inputContainer}>

    <Image
      style={{ width: 250, height: 250, marginTop: 15, alignSelf: 'center' }}
      source={{
        uri: image? image: require("../assets/no-image.png"),
      }}
    />
    <Text style={{ textAlign: 'center', alignSelf: 'center', fontSize: 28, marginTop: 10, width: 500, }}>{name}</Text>
  
    <Text style={{ textAlign: 'center', alignSelf: 'center', fontSize: 20, marginTop: 10, width: 500, }}>Ваш комментарий:</Text>
    <View style={{ alignSelf: 'center' }}>
        <TextInput
          placeholder='Comment'
          value={text}
          onChangeText={text => {onChange(text)}}
          style={{backgroundColor: 'white',
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 10,
          marginTop: 5,
          width: 600,
          alignSelf: 'center'
          }}
        />
    </View>

    <div>
      <FormControl sx={{ m: 1, width: 300,  alignSelf: 'center' }}>
        <InputLabel id="demo-multiple-checkbox-label">Категория</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={category}
          onChange={handleChange}
          alignSelf='center'
          input={<OutlinedInput label="Категории" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {lists.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={name[1]} />
              <ListItemText primary={name[0]} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  </View>
  );
}