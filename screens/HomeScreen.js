import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://freshspartechnologies.graphy.com/' }}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container takes up the full screen
  },
  webview: {
    flex: 1, // Ensure the WebView takes up the full remaining space
  },
});
