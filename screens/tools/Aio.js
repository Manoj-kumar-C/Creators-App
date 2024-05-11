import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { WebView } from 'react-native-webview';

const DownloaderPage = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [downloadLink, setDownloadLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      const response = await axios.get(`https://api.vevioz.com/apis/widgetv2?url=${videoUrl}`);
      setDownloadLink(response.data.download_link);
      console.log('Download link:', response.data.download_link);
    } catch (error) {
      console.log('Error downloading video. Please try again.');
      setErrorMessage('Error downloading video. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AIO Video Downloader</Text>
      <Text style={styles.subtitle}>Download your favorite videos from various social media platforms</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Video URL"
        value={videoUrl}
        onChangeText={setVideoUrl}
      />
      <TouchableOpacity
        style={[styles.button, (isLoading || !videoUrl) && styles.disabledButton]}
        onPress={handleDownload}
        disabled={isLoading || !videoUrl}
      >
        <Text style={styles.buttonText}>{isLoading ? 'Downloading...' : 'Download'}</Text>
      </TouchableOpacity>
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      {downloadLink ? (
        <View style={styles.downloadLinkContainer}>
          <Text style={styles.downloadLinkText}>Download link:</Text>
          <TouchableOpacity onPress={() => {}} style={styles.link}>
            <Text style={styles.linkText}>{downloadLink}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {videoUrl ? (
        <WebView
          source={{ uri: `https://api.vevioz.com/apis/widgetv2?url=${videoUrl}` }}
          style={styles.videoPlayer}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  downloadLinkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  downloadLinkText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  link: {
    marginBottom: 10,
  },
  linkText: {
    color: 'blue',
  },
  videoPlayer: {
    width: '100%',
    height: 300,
  },
});

export default DownloaderPage;
