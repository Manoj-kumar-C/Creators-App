import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Linking, ScrollView } from 'react-native';

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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>YouTube Thumbnail Downloader</Text>
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
                <View key={index} style={styles.resolutionItem}>
                  <TouchableOpacity onPress={() => setThumbnailUrl(res.url)}>
                    <Text style={[styles.resolutionText, thumbnailUrl === res.url && styles.selectedResolution]}>{res.size}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDownload(res.url)}>
                    <Text style={styles.downloadText}>Download</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </>
        ) : (
          <Text>No thumbnail found</Text>
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
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
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
  thumbnail: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  resolutionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  resolutionLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  downloadText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  resolutionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  resolutionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedResolution: {
    color: '#007BFF',
  },
});

export default YoutubeThumbnail;
