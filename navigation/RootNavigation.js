import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Ionicons } from '@expo/vector-icons'; // Import icons from your preferred library
import Devs from '../screens/tools/Devs';
import Login from '../screens/Login';
import DownloaderPage from '../screens/tools/Aio';  
import YoutubeTag from '../screens/tools/youtubeTag';
import YoutubeThumbnail from '../screens/tools/YoutubeThumbnail';
import YoutubeVideoDownloader from '../screens/tools/YoutubeVideoDownloader';
import FreelancingJobs from '../screens/FreelancingJobs';
import SFXScreen from '../screens/tools/SFXScreen';
import ContentWriter from '../screens/tools/ContentWriter';
import GumroadScreen from '../screens/tools/GumroadScreen';

const Drawer = createDrawerNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Courses">
        <Drawer.Screen 
          name="Courses" 
          component={HomeScreen} 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
            ),
            headerTitleAlign: 'center',
          }}
        />
        <Drawer.Screen 
          name="Creators Assets" 
          component={GumroadScreen} 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
            ),
            headerTitleAlign: 'center',
          }}
        />
        <Drawer.Screen 
          name="AIO downloader" 
          component={DownloaderPage} 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'download' : 'download-outline'} size={size} color={color} />
            ),
            headerTitleAlign: 'center',
          }}
        />
        <Drawer.Screen 
          name="YT downloader" 
          component={YoutubeVideoDownloader} 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'download' : 'download-outline'} size={size} color={color} />
            ),
            headerTitleAlign: 'center',
          }}
        />
        <Drawer.Screen 
          name="Crazy SFX" 
          component={SFXScreen} 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'musical-notes' : 'musical-notes-outline'} size={size} color={color} />
            ),
            headerTitleAlign: 'center',
          }}
        />
        <Drawer.Screen 
          name="Tag Finder" 
          component={YoutubeTag} 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'search' : 'search-outline'} size={size} color={color} />
            ),
            headerTitleAlign: 'center',
          }}
        />
        <Drawer.Screen 
          name="Thumbnail Downloader" 
          component={YoutubeThumbnail} 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'image' : 'image-outline'} size={size} color={color} />
            ),
            headerTitleAlign: 'center',
          }}
        />
        <Drawer.Screen 
          name="Content Writer" 
          component={ContentWriter} 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'document-text' : 'document-text-outline'} size={size} color={color} />
            ),
            headerTitleAlign: 'center',
          }}
        />
        <Drawer.Screen 
          name="Developer Readme Generator" 
          component={Devs} 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'reader' : 'reader-outline'} size={size} color={color} />
            ),
            headerTitleAlign: 'center',
          }}
        />
        
        <Drawer.Screen 
          name="Freelancing Jobs" 
          component={FreelancingJobs} 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
            ),
            headerTitleAlign: 'center',
          }}
        />
        
        <Drawer.Screen 
          name="Account" 
          component={SettingsScreen} 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'settings' : 'settings-outline'} size={size} color={color} />
            ),
            headerTitleAlign: 'center',
          }}
        />
        <Drawer.Screen 
          name="LogOut" 
          component={Login} 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
            ), 
            headerShown: false,
            headerTitleAlign: 'center',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;
