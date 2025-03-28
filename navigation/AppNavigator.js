import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Asegúrate de instalar esta librería

import FormScreen from '../screens/FormScreen';
import RecordScreen from '../screens/RecordScreen';
import EventDetailScreen from '../screens/EventDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function RecordStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Record" 
        component={RecordScreen} 
        options={{ title: 'Events' }} 
      />
      <Stack.Screen 
        name="EventDetail" 
        component={EventDetailScreen} 
        options={{ title: 'Event Details' }} 
      />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Form') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            } else if (route.name === 'RecordStack') {
              iconName = focused ? 'list-circle' : 'list-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4a90e2',
          tabBarInactiveTintColor: '#a0a0a0',
          tabBarStyle: {
            backgroundColor: '#f5f5f5',
            paddingBottom: 5,
            height: 60,
            borderTopWidth: 0.5,
            borderTopColor: '#ddd',
          },
          headerStyle: {
            backgroundColor: '#4a90e2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen 
          name="Form" 
          component={FormScreen} 
          options={{ title: 'New Event' }}
        />
        <Tab.Screen 
          name="RecordStack" 
          component={RecordStack} 
          options={{ title: 'Event List', headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
