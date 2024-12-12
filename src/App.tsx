import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const localHost = 'http://192.168.1.17:3000';

function App(): React.JSX.Element {
  const [data, setData] = useState([]);

  const getUsers = async () => {
    const url = `${localHost}/users`;
    const response = await fetch(url);
    let jsonResponse = await response.json();
    if (jsonResponse) {
      setData(jsonResponse);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {data ? (
        <FlatList
          data={data}
          renderItem={({item}) => (
            <View style={styles.viewContainer}>
              <Text style={styles.nameContainer}>Name: {item['name']}</Text>
              <Text>Age: {item['age']}</Text>
              <Text>Email: {item['email']}</Text>
              <View style={styles.rowContainer}>
                <Button title="Update" />
                <Button title="Delete" color="#E23D28" />
              </View>
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
  nameContainer: {
    backgroundColor: 'orange',
    color: '#fff',
    padding: 5,
    borderRadius: 5,
  },
  viewContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 8,
  },
});

export default App;
