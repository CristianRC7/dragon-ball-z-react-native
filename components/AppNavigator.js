import React from 'react';
import { StyleSheet, Animated, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Menu from '../pages/Menu';
import Home from '../pages/Home';
import CharacterDetail from '../pages/CharacterDetail';
import Planets from '../pages/Planets';
import PlanetsDetail from '../pages/PlanetsDetail';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({ current, next, layouts }) => {
          const translateX = current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width, 0],
          });

          return {
            cardStyle: {
              transform: [{ translateX }],
            },
          };
        },
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CharacterDetail" component={CharacterDetail} />
    </Stack.Navigator>
  );
}

function PlanetsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({ current, next, layouts }) => {
          const translateX = next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              })
            : 0;

          const translateY = current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0],
          });

          return {
            cardStyle: {
              transform: [{ translateX }, { translateY }],
            },
            cardOverlayEnabled: true,
            cardStyle: {
              opacity: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          };
        },
      }}
    >
      <Stack.Screen name="Planets" component={Planets} />
      <Stack.Screen name="PlanetsDetail" component={PlanetsDetail} />
    </Stack.Navigator>
  );
}

function TabBarIcon({ name, color, size }) {
  const scale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 1.2,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{ transform: [{ scale }] }}
    >
      <Ionicons
        name={name}
        size={size}
        color={color}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.tabIcon}
      />
    </Animated.View>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeTabs() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Personajes') {
              iconName = 'person';
            } else if (route.name === 'Planetas') {
              iconName = 'planet';
            }

            return (
              <TabBarIcon
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: '#ff5722',
          tabBarInactiveTintColor: '#b0bec5',
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarOptions: {
            animationEnabled: true,
          },
        })}
      >
        <Tab.Screen name="Personajes" component={HomeStack} />
        <Tab.Screen name="Planetas" component={PlanetsStack} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#263238',
    borderTopWidth: 0,
    elevation: 10,
    height: 60,
    paddingBottom: 5,
    borderTopColor: '#37474f',
    borderTopWidth: 1,
  },
  tabBarLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  tabIcon: {
    padding: 5,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#263238',
  },
});

export default AppNavigator;
