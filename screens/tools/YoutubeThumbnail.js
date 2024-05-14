import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';

const YoutubeThumbnail = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [error, setError] = useState('');

  const getThumbnailUrl = () => {
    try {
      const videoId = youtubeUrl.split('v=')[1];
      if (videoId) {
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
        setThumbnailUrl(thumbnailUrl);
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

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Enter YouTube URL"
        onChangeText={setYoutubeUrl}
        value={youtubeUrl}
      />
      <Button title="Search" onPress={handleSearch} />
      {error ? (
        <Text style={{ color: 'red' }}>{error}</Text>
      ) : (
        thumbnailUrl ? (
          <Image
            style={{ width: 200, height: 120 }}
            source={{ uri: thumbnailUrl }}
          />
        ) : (
          <Text>No thumbnail found</Text>
        )
      )}
    </View>
  );
};

export default YoutubeThumbnail;
