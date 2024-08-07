import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, BackHandler, Alert, FlatList, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home({ navigation }) {
  const [characters, setCharacters] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Salir',
          '¿Estás seguro que quieres salir de la aplicación?',
          [
            {
              text: 'Cancelar',
              onPress: () => null,
              style: 'cancel',
            },
            { text: 'Salir', onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false }
        );
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  useEffect(() => {
    fetch('https://dragonball-api.com/api/characters')
      .then(response => response.json())
      .then(data => setCharacters(data.items))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.characterContainer}
      onPress={() => navigation.navigate('CharacterDetail', { character: item })}
    >
      <Image source={{ uri: item.image }} style={styles.characterImage} />
      <Text style={styles.characterName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={characters}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  list: {
    paddingBottom: 20,
  },
  characterContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#303030',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fbc02d',
  },
  characterImage: {
    width: 160,
    height: 160,
    borderRadius: 15,
    marginBottom: 10,
    resizeMode: 'contain', 
  },
  characterName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fbc02d', 
  },
});
