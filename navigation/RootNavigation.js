import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Ionicons } from '@expo/vector-icons'; // Import icons from your preferred library
import Devs from '../screens/tools/Devs';
import Login from '../screens/Login';

const Drawer = createDrawerNavigator();

const RootNavigation = () => {
    
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen 
          name="AIO downloader" 
          component={SettingsScreen} 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'download' : 'download-outline'} size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen 
          name="Crazy SFX" 
          component={SettingsScreen} 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'musical-notes' : 'musical-notes-outline'} size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen 
          name="Tag Finder" 
          component={SettingsScreen} 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'search' : 'search-outline'} size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen 
          name="Thumbnail Downloader" 
          component={SettingsScreen} 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'image' : 'image-outline'} size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen 
          name="Content Writer" 
          component={SettingsScreen} 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'document-text' : 'document-text-outline'} size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen 
          name="Developer Readme Generator" 
          component={Devs} 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'reader' : 'reader-outline'} size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen 
          name="Account" 
          component={SettingsScreen} 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'settings' : 'settings-outline'} size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen 
          name="LogOut" 
          
          component={Login} 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
            ), headerShown: false,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;
