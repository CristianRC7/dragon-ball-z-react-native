import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';

export default function CharacterDetail({ route }) {
  const { character } = route.params;
  const [transformations, setTransformations] = useState([]);

  useEffect(() => {
    fetch(`https://dragonball-api.com/api/characters/${character.id}`)
      .then(response => response.json())
      .then(data => setTransformations(data.transformations || []))
      .catch(error => console.error('Error fetching transformations:', error));
  }, [character.id]);

  const renderTransformation = ({ item }) => (
    <TouchableOpacity style={styles.transformationContainer}>
      <Image source={{ uri: item.image }} style={styles.transformationImage} />
      <Text style={styles.transformationName}>{item.name}</Text>
      <Text style={styles.transformationKi}>Ki: {item.ki}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Image source={{ uri: character.image }} style={styles.image} />
            <Text style={styles.name}>{character.name}</Text>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailLabel}>Ki:</Text>
              <Text style={styles.detailValue}>{character.ki}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailLabel}>Max Ki:</Text>
              <Text style={styles.detailValue}>{character.maxKi}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailLabel}>Race:</Text>
              <Text style={styles.detailValue}>{character.race}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailLabel}>Gender:</Text>
              <Text style={styles.detailValue}>{character.gender}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailLabel}>Affiliation:</Text>
              <Text style={styles.detailValue}>{character.affiliation}</Text>
            </View>
            <Text style={styles.description}>{character.description}</Text>
          </View>
        }
        data={transformations}
        keyExtractor={item => item.id.toString()}
        renderItem={renderTransformation}
        contentContainerStyle={styles.transformationsList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingTop: 15,
  },
  headerContainer: {
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 15,
    borderColor: '#ffcc00',
    borderWidth: 5,
    marginBottom: 20,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffcc00',
    marginBottom: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  detailsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ffcc00',
    paddingBottom: 5,
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffcc00',
  },
  detailValue: {
    fontSize: 18,
    color: '#fff',
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  transformationsList: {
    marginTop: 20,
    width: '100%',
  },
  transformationContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#303030',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fbc02d',
  },
  transformationImage: {
    width: 150,
    height: 150,
    borderRadius: 15,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  transformationName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fbc02d',
  },
  transformationKi: {
    fontSize: 16,
    color: '#fff',
  },
});