import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
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
      <ScrollView>
      <Text style={styles.sectionTitle}>List of Comments</Text>
      {data.length
        ? data.map((item) => (
            <View key={item['id']} style={styles.commentContainer}>
              <Text
                style={[
                  styles.underline,
                  {backgroundColor: '#ddd', marginBottom: 5},
                ]}>
                Id:{' '}
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    textDecorationLine: 'none',
                  }}>
                  {item['id']}
                </Text>
              </Text>
              <Text style={styles.underline}>
                Title:{' '}
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    textDecorationLine: 'none',
                  }}>
                  {item['title']}
                </Text>
              </Text>
              <Text style={styles.underline}>
                Comment:{' '}
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    textDecorationLine: 'none',
                  }}>
                  {item['body']}
                </Text>
              </Text>
            </View>
          ))
        : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
  },
  commentContainer: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
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
