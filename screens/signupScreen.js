// App.js
import React from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView } from 'react-native';
import { Input, Button, Text } from '@react-native-elements/themed';

export default function SignupScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.formContainer}>
          <Text h3 style={styles.title}>Sign Up</Text>
          
          <Input
            placeholder="Name"
            leftIcon={{ type: 'font-awesome', name: 'user' }}
            containerStyle={styles.input}
          />
          <Input
            placeholder="Email"
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            containerStyle={styles.input}
          />
          <Input
            placeholder="Password"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            secureTextEntry
            containerStyle={styles.input}
          />
          <Input
            placeholder="Confirm Password"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            secureTextEntry
            containerStyle={styles.input}
          />
          
          <Button
            title="Sign Up"
            buttonStyle={styles.button}
            onPress={() => { /* Handle sign up logic here */ }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#2089dc',
    borderRadius: 5,
    paddingVertical: 10,
  },
});
