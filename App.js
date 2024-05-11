import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import YouTubeThumbnail from './screens/youtube_thumbnail';
import RootNavigation from './navigation/RootNavigation';

export default function App() {
  return (
    <>
    <RootNavigation />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
