import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const YoutubeThumbnail = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [error, setError] = useState('');
  const [resolutions, setResolutions] = useState([]);

  const getThumbnailUrl = () => {
    try {
      const videoId = youtubeUrl.split('v=')[1];
      if (videoId) {
        const thumbnailBaseUrl = `https://img.youtube.com/vi/${videoId}`;
        const resolutions = [
          { resolution: 'maxresdefault', size: 'Max Resolution' },
          { resolution: 'sddefault', size: 'Standard Definition' },
          { resolution: 'hqdefault', size: 'High Quality' },
          { resolution: 'mqdefault', size: 'Medium Quality' },
          { resolution: 'default', size: 'Default' }
        ];
        const thumbnailUrls = resolutions.map(res => ({
          url: `${thumbnailBaseUrl}/${res.resolution}.jpg`,
          size: res.size
        }));
        setResolutions(thumbnailUrls);
        setThumbnailUrl(thumbnailUrls[0].url); // Set default thumbnail
        setError('');
      } else {
        setError('Invalid YouTube URL');
      }
    } catch (error) {
      console.error('Error fetching thumbnail:', error);
      setError('Error fetching thumbnail');
    }
  };

  const handleSearch = () => {
    if (youtubeUrl) {
      getThumbnailUrl();
    }
  };

  const handleClear = () => {
    setYoutubeUrl('');
    setThumbnailUrl('');
    setResolutions([]);
    setError('');
  };

  const handleDownload = (url) => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
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
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : thumbnailUrl ? (
        <>
          <Image
            style={styles.thumbnail}
            source={{ uri: thumbnailUrl }}
          />
          <View style={styles.resolutionContainer}>
            <Text style={styles.resolutionLabel}>Available Resolutions:</Text>
            <TouchableOpacity onPress={() => handleDownload(thumbnailUrl)}>
              <Text style={styles.downloadText}>Download</Text>
            </TouchableOpacity>
          </View>
          <View>
            {resolutions.map((res, index) => (
              <TouchableOpacity key={index} style={styles.resolutionItem} onPress={() => setThumbnailUrl(res.url)}>
                <Text style={[styles.resolutionText, thumbnailUrl === res.url && styles.selectedResolution]}>{res.size}</Text>
                <TouchableOpacity onPress={() => handleDownload(res.url)}>
                  <Image source={require('../../assets/tools/download.png')} style={styles.downloadIcon} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : (
        <Text>No thumbnail found</Text>
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
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  clearButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    color: 'white',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
  resolutionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  resolutionLabel: {
    fontWeight: 'bold',
  },
  downloadText: {
    color: 'blue',
  },
  resolutionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  resolutionText: {
    marginRight: 10,
  },
  selectedResolution: {
    color: 'blue',
  },
  downloadIcon: {
    width: 20,
    height: 20,
  },
});

export default YoutubeThumbnail;
