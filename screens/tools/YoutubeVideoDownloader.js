import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Image, TouchableOpacity, StyleSheet } from 'react-native';

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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter YouTube Video URL"
        onChangeText={setYoutubeUrl}
        value={youtubeUrl}
      />
      <Button title="Fetch Video Data" onPress={fetchVideoData} />

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  videoInfoContainer: {
    alignItems: 'center',
  },
  videoTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  thumbnail: {
    width: 200,
    height: 100,
    marginBottom: 10,
  },
  availableResolutions: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resolutionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  downloadButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  downloadButtonText: {
    color: 'white',
  },
  clearButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  clearButtonText: {
    color: 'white',
  },
});

export default YoutubeVideoDownloader;
