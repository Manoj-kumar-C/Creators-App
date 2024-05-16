import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const YoutubeVideoDownloader = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoData, setVideoData] = useState(null);
  const resolutions = ['240p', '360p', '480p', '720p', '1080p']; // Define available resolutions

  const fetchVideoData = async () => {
    try {
      let videoId = youtubeUrl.split('v=')[1];
      const ampersandPosition = videoId.indexOf('&');
      if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }

      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=AIzaSyCi9dXv9GvZMR0zHaH5O4XSCNVLvDMgvmw`);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        setVideoData(data.items[0]);
      } else {
        Alert.alert('Error', 'Video not found');
      }
    } catch (error) {
      console.error('Error fetching video data:', error);
      Alert.alert('Error', 'Failed to fetch video data');
    }
  };

  const handleDownload = (resolution) => {
    Alert.alert('Download', `Downloading video in ${resolution} resolution...`);
  };

  const handleClear = () => {
    setYoutubeUrl('');
    setVideoData(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>YouTube Video Downloader</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter YouTube Video URL"
        onChangeText={setYoutubeUrl}
        value={youtubeUrl}
      />
      <TouchableOpacity style={styles.fetchButton} onPress={fetchVideoData}>
        <Text style={styles.fetchButtonText}>Fetch Video Data</Text>
      </TouchableOpacity>

      {videoData && (
        <View style={styles.videoInfoContainer}>
          <Text style={styles.videoTitle}>{videoData.snippet.title}</Text>
          <Image source={{ uri: videoData.snippet.thumbnails.medium.url }} style={styles.thumbnail} />
          <Text style={styles.availableResolutions}>Available Resolutions:</Text>
          <View style={styles.resolutionButtons}>
            {resolutions.map((resolution, index) => (
              <TouchableOpacity key={index} style={styles.downloadButton} onPress={() => handleDownload(resolution)}>
                <Text style={styles.downloadButtonText}>{resolution}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  fetchButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  fetchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoInfoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  thumbnail: {
    width: 320,
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
  },
  availableResolutions: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#666',
  },
  resolutionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  downloadButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin: 5,
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  clearButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default YoutubeVideoDownloader;
