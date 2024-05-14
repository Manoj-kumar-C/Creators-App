import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Clipboard } from 'react-native';
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
    alert('Tags copied to clipboard!');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter YouTube URL"
        onChangeText={setYoutubeUrl}
        value={youtubeUrl}
      />
      <View style={styles.buttonContainer}>
        <Button title="Search" onPress={handleSearch} />
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Text style={{ color: 'white' }}>Clear</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  tagsContainer: {
    marginTop: 10,
  },
  tagsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tagText: {
    marginBottom: 5,
  },
  copyButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
  copyButtonText: {
    color: 'white',
  },
});

export default YoutubeTag;
