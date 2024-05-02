import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, FlatList, TouchableOpacity, Image } from 'react-native';
import cheerio from 'cheerio';

const YouTubeThumbnail = () => {
  const [url, setUrl] = useState('');
  const [thumbnails, setThumbnails] = useState([]);

  const fetchThumbnails = async () => {
    try {
      const response = await fetch(url);
      const html = await response.text();
      const thumbnailUrls = extractThumbnailUrls(html);
      setThumbnails(thumbnailUrls);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch thumbnails. Please check the URL and try again.');
    }
  };

  const extractThumbnailUrls = (html) => {
    const $ = cheerio.load(html);
    const thumbnailUrls = [];
    $('meta[itemprop="thumbnailUrl"]').each(function() {
      const thumbnailUrl = $(this).attr('content');
      thumbnailUrls.push(thumbnailUrl);
    });
    return thumbnailUrls;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => downloadThumbnail(item)}>
      <Image source={{ uri: item }} style={{ width: 100, height: 100 }} />
    </TouchableOpacity>
  );

  const downloadThumbnail = (thumbnailUrl) => {
    // Implement download logic here
    // You can use libraries like react-native-fs to download the image
    // For simplicity, you can display a message indicating that the image is downloaded
    Alert.alert('Download', 'Thumbnail downloaded successfully!');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Enter YouTube URL:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        onChangeText={setUrl}
        value={url}
      />
      <Button title="Fetch Thumbnails" onPress={fetchThumbnails} />
      {thumbnails.length > 0 && (
        <>
          <Text style={{ fontSize: 18, marginVertical: 10 }}>Available Thumbnails:</Text>
          <FlatList
            data={thumbnails}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
};

export default YouTubeThumbnail;
