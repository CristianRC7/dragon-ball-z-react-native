import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Planets({ navigation }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetch('https://dragonball-api.com/api/planets')
      .then(response => response.json())
      .then(data => setPlanets(data.items))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handlePress = (planet) => {
    navigation.navigate('PlanetsDetail', { planet });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)} style={styles.planetContainer}>
      <Image source={{ uri: item.image }} style={styles.planetImage} />
      <Text style={styles.planetName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={planets}
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
    backgroundColor: '#1e1e1e', 
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  list: {
    paddingBottom: 20,
  },
  planetContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#2c2c2c', 
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#03a9f4',
  },
  planetImage: {
    width: 160,
    height: 160,
    borderRadius: 15,
    marginBottom: 10,
    resizeMode: 'cover', 
  },
  planetName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#b2ebf2', 
    textAlign: 'center',
  },
});
