import React, {useEffect, useState} from 'react';
import Snackbar from 'react-native-snackbar';
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const localHost = 'http://192.168.1.17:3000'

function App(): React.JSX.Element {
  const [data, setData] = useState([]);
  const getUsers = async () => {
    const url = `${localHost}/users`;
    const response = await fetch(url);
    let jsonResponse = await response.json();

    setData(jsonResponse);
  };

  const postUserData = async () => {
      const user = {
        name: 'Dheeraj Lohani', 
        age: 24, 
        email: 'dheeraj@gmail.com'
      }
      const url = `${localHost}/users`
      let response = await fetch(url, {
        method: 'POST', 
        body: JSON.stringify(user), 
        headers: {'Content-Type': 'application/json'}
      })
      response = await response.json()
      Snackbar.show({
        duration: Snackbar.LENGTH_LONG, 
        text: 'Added successfully'
      })
      getUsers()
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.sectionTitle}>FlatList: Get Users</Text>
      {data ? (
        <FlatList
          data={data}
          renderItem={({item}) => (
            <View style={styles.commentContainer}>
              <Text style={styles.idText}>{item['name']}</Text>
              <Text>Age: {item['age']}</Text>
              <Text>Email: {item['email']}</Text>
            </View>
          )}
        />
      ) : null}
      <Button title="Testing post" onPress={postUserData} />
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
  commentContainer: {
    padding: 10,
    borderBottomColor: 'orange',
    borderBottomWidth: 2,
  },
  idText: {
    color: '#ffffff',
    backgroundColor: 'orange',
    padding: 3,
    borderRadius: 4,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  textWhite: {
    color: '#ffffff',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
