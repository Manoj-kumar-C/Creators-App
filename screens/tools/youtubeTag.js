import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Clipboard, Alert, ScrollView } from 'react-native';
import axios from 'axios';

const YoutubeTag = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoTags, setVideoTags] = useState([]);
  const [error, setError] = useState('');

  const getVideoTags = async () => {
    try {
      const videoId = youtubeUrl.split('v=')[1];
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=AIzaSyCi9dXv9GvZMR0zHaH5O4XSCNVLvDMgvmw&part=snippet`
      );

      if (response.data.items && response.data.items.length > 0) {
        const tags = response.data.items[0].snippet.tags;
        setVideoTags(tags);
        setError('');
      } else {
        setError('Video not found or API response format unexpected');
      }
    } catch (error) {
      console.error('Error fetching video tags:', error);
      setError('Error fetching video tags');
    }
  };

  const handleSearch = () => {
    if (youtubeUrl) {
      getVideoTags();
    }
  };

  const handleClear = () => {
    setYoutubeUrl('');
    setVideoTags([]);
    setError('');
  };

  const handleCopy = () => {
    const tagsString = videoTags.join(', ');
    Clipboard.setString(tagsString);
    Alert.alert('Tags copied to clipboard!');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>YouTube Tag Extractor</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter YouTube URL"
          onChangeText={setYoutubeUrl}
          value={youtubeUrl}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <View style={styles.tagsContainer}>
            <Text style={styles.tagsHeader}>Video Tags:</Text>
            {videoTags.map((tag, index) => (
              <Text key={index} style={styles.tagText}>{tag}</Text>
            ))}
            {videoTags.length > 0 && (
              <TouchableOpacity onPress={handleCopy} style={styles.copyButton}>
                <Text style={styles.copyButtonText}>Copy to Clipboard</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  searchButton: {
    flex: 1,
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#6c757d',
    paddingVertical: 15,
    borderRadius: 8,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#d9534f',
    textAlign: 'center',
    marginBottom: 20,
  },
  tagsContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  tagsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  tagText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  copyButton: {
    marginTop: 20,
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default YoutubeTag;
