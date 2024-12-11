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
  const [data, setData] = useState(undefined);
  const getComment = async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    const response = await fetch(url);
    let jsonResponse = await response.json();

    setData(jsonResponse);
  };

  useEffect(() => {
    getComment();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Text style={styles.sectionTitle}>Comment</Text>
      {data ? (
        <View>
          <Text style={[styles.textWhite, styles.underline]} >
            User Id:{' '}
            <Text style={{fontWeight: 'bold', fontSize: 15, textDecorationLine: 'none'}}>
              {data['userId']}
            </Text>
          </Text>
          <Text style={[styles.textWhite, styles.underline]}>
            Title:{' '}
            <Text style={{fontWeight: 'bold', fontSize: 15, textDecorationLine: 'none'}}>
              {data['title']}
            </Text>
          </Text>
          <Text style={[styles.textWhite, styles.underline]}>
            Comment:{' '}
            <Text style={{fontWeight: 'bold', fontSize: 15, textDecorationLine: 'none'}}>
              {data['body']}
            </Text>
          </Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
  },
  textWhite: {
    color: '#ffffff',
  },
  underline: {
    textDecorationLine: 'underline'
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
