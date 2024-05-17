import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';

const ContentWriter = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (inputText.trim()) {
      const newMessage = { sender: 'user', text: inputText.trim() };
      setMessages([...messages, newMessage]);
      setInputText('');
      
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/completions',
          {
            model: 'text-davinci-003', // Specify the model
            prompt: `User: ${newMessage.text}\nAI:`,
            max_tokens: 150,
            n: 1,
            stop: ["\n"],
          },
          {
            headers: {
              'Authorization': `Bearer `,
              'Content-Type': 'application/json',
            },
          }
        );

        const aiResponseText = response.data.choices[0].text.trim();
        const aiMessage = {
          sender: 'ai',
          text: aiResponseText ? aiResponseText : 'Currently not available',
        };
        setMessages([...messages, newMessage, aiMessage]);
      } catch (error) {
        console.error('Error fetching AI response:', error);
        const errorMessage = {
          sender: 'ai',
          text: 'Currently not available',
        };
        setMessages([...messages, newMessage, errorMessage]);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <ScrollView
        style={styles.messageContainer}
        contentContainerStyle={styles.messageContent}
      >
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              message.sender === 'user' ? styles.userBubble : styles.aiBubble,
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  messageContainer: {
    flex: 1,
    padding: 10,
  },
  messageContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageBubble: {
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#007BFF',
    alignSelf: 'flex-end',
  },
  aiBubble: {
    backgroundColor: '#e1e1e1',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContentWriter;
