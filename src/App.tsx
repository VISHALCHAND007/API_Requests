import React, {useEffect, useState} from 'react';
import Snackbar from 'react-native-snackbar';
import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const localHost = 'http://192.168.1.17:3000';

function App(): React.JSX.Element {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState([]);

  const getUserData = async () => {
    const url = `${localHost}/users`;
    let response = await fetch(url);
    const jsonResp = await response.json();

    setData(jsonResp);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const postUserData = async () => {
    if (name.length && age.length && email.length) {
      setError('');
      const user = {
        name: name,
        age: age,
        email: email,
      };
      const url = `${localHost}/users`;
      let response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user),
      });
      response = await response.json();
      Snackbar.show({
        textColor: '#ffffff',
        duration: Snackbar.LENGTH_LONG,
        text: 'Added successfully',
      });
      getUserData();
    } else {
      setError('All fields are required.');
      Snackbar.show({
        textColor: '#ffffff',
        text: error,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <Text style={styles.sectionTitle}>FlatList: Post Users</Text>

        <View>
          <TextInput
            placeholder="Enter name"
            placeholderTextColor="grey"
            value={name}
            onChangeText={text => setName(text)}
            style={styles.inputText}
          />
          <TextInput
            placeholder="Enter age"
            placeholderTextColor="grey"
            value={age.toString()}
            onChangeText={text => setAge(text)}
            style={styles.inputText}
          />
          <TextInput
            placeholder="Enter email"
            placeholderTextColor="grey"
            value={email}
            onChangeText={text => setEmail(text)}
            style={[styles.inputText, {marginBottom: 25}]}
          />
        </View>
        <Button title="Add user" onPress={postUserData} />
      </KeyboardAvoidingView>

      {data ? (
        <FlatList
          data={[...data].reverse()}
          renderItem={({item}) => (
            <View style={styles.viewContainer}>
              <Text style={{backgroundColor: 'orange'}}>{item['name']}</Text>
              <Text>{item['age']}</Text>
              <Text>{item['email']}</Text>
            </View>
          )}
        />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  inputText: {
    borderWidth: 1,
    borderColor: 'lightblue',
    borderRadius: 4,
    padding: 10,
    marginVertical: 15,
  },
  viewContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
  },
});

export default App;
