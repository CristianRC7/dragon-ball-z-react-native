import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PlanetsDetail({ route }) {
  const { planet } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: planet.image }} style={styles.planetImage} />
        </View>
        <Text style={styles.planetName}>{planet.name}</Text>
        <Text style={styles.planetDescription}>{planet.description}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', 
    padding: 15,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  planetImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', 
  },
  planetName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffeb3b',
    marginBottom: 10,
  },
  planetDescription: {
    fontSize: 18,
    color: '#e0e0e0', 
    textAlign: 'center',
    lineHeight: 24, 
  },
});
