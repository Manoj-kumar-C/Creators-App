import React from 'react';
import { View, Text, Button, Linking } from 'react-native'; // Import Button and Linking from react-native
import WebView from 'react-native-webview';

const Devs = () => {
  const handleNavigateToSite = () => {
    Linking.openURL('https://developers-readme-generator.vercel.app/'); // Replace 'https://example.com' with your desired URL
  };

  return (
    <WebView source={{ uri: 'https://developers-readme-generator.vercel.app/' }} style={{ flex: 1 }} />
  );
}

export default Devs;
