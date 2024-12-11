import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

function App(): React.JSX.Element {
  const [data, setData] = useState([]);
  const getComment = async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const response = await fetch(url);
    let jsonResponse = await response.json();

    setData(jsonResponse);
  };

  useEffect(() => {
    getComment();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.sectionTitle}>FlatList: Get Comments</Text>
      {data ? (
        <FlatList
          data={data}
          renderItem={({item}) => (
            <View style={styles.commentContainer}>
              <Text style={styles.idText}>{item['id']}</Text>
              <Text>Title: {item['title']}</Text>
              <Text>Body: {item['body']}</Text>
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
    marginBottom: 5
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
