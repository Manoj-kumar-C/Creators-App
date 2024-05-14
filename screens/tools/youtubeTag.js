import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
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
        <View>
          <Text>Video Tags:</Text>
          {videoTags.map((tag, index) => (
            <Text key={index}>{tag}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default YoutubeTag;
