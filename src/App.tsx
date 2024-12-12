import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import CustomDialog from './components/CustomDialog';
import {User} from './index';

const localHost = 'http://192.168.1.17:3000';

function App(): React.JSX.Element {
  let user: User = {
    id: '',
    name: '',
    age: 0,
    email: '',
  };
  //states
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState<User>(user);
  const [showModal, setShowModal] = useState<boolean>(false);

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

  const showSnackbar = (msg: string) => {
    Snackbar.show({
      text: msg,
      duration: Snackbar.LENGTH_SHORT,
      textColor: '#fff',
    });
  };

  const deleteUser = async (userId: string) => {
    const url = `${localHost}/users`;
    const response = await fetch(`${url}/${userId}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    });
    const jsonResponse = await response.json();
    if (jsonResponse) {
      showSnackbar(`User deleted :${userId}`);
      getUsers();
    }
  };

  const updateUser = (item: User) => {
    setShowModal(true);
    setSelectedUser(item);
  };

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
                <Button title="Update" onPress={() => updateUser(item)} />
                <Button
                  title="Delete"
                  color="#E23D28"
                  onPress={() => deleteUser(item['id'])}
                />
              </View>
            </View>
          )}
        />
      ) : null}
      <CustomDialog
        visibility={showModal}
        setShowModal={setShowModal}
        selectedUser={selectedUser}
        getUsers={getUsers}
      />
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
