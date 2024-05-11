import React from 'react';
import { View, Text, Button, Linking } from 'react-native'; // Import Button and Linking from react-native

const Devs = () => {
  const handleNavigateToSite = () => {
    Linking.openURL('https://developers-readme-generator.vercel.app/'); // Replace 'https://example.com' with your desired URL
  };

  return (
    <View>
      <Text>Devs</Text>
      <Button title="Go to Site" onPress={handleNavigateToSite} />
    </View>
  );
}

export default Devs;
