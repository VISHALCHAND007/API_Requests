import {StyleSheet, View, Modal, TextInput, Button} from 'react-native';
import React, {PropsWithChildren, useEffect, useState} from 'react';
//imports
import Icon from 'react-native-vector-icons/Entypo';
import {User} from '../index';


type DialogProp = PropsWithChildren<{
  visibility: boolean;
  selectedUser: User;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  getUsers: () => Promise<void>;
}>;
const localHost = 'http://192.168.1.17:3000'

const CustomDialog = (props: DialogProp) => {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const updateUser = async () => {
    const id = props.selectedUser.id
    const url = `${localHost}/users/${id}`
    const response = await fetch(url, {
        method: 'PUT', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({name, age, email})
    })
    const jsonResp = await response.json()
    if(jsonResp) {
        props.getUsers()
        props.setShowModal(false)
    }
  }

  useEffect(() => {
    if (props.selectedUser) {
      let selectedUser = props.selectedUser;
      setName(selectedUser.name);
      setAge(selectedUser.age.toString());
      setEmail(selectedUser.email);
    }
  }, [props.selectedUser]);

  return (
    <Modal visible={props.visibility} transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Icon
            name="cross"
            size={30}
            style={styles.closeIcon}
            onPress={() => props.setShowModal(false)}
            color="#004953"
          />
          <TextInput
            value={name}
            style={styles.inputText}
            onChangeText={text => setName(text)}
          />
          <TextInput
            value={age}
            style={styles.inputText}
            onChangeText={text => setAge(text)}
          />
          <TextInput
            value={email}
            style={styles.inputText}
            onChangeText={text => setEmail(text)}
          />

          <View style={styles.buttonContainer}>
            <Button title="Update User" 
            onPress={updateUser}/>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomDialog;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
    shadowColor: 'grey',
    shadowOpacity: 0.8,
    elevation: 18,
    borderRadius: 12,
  },
  closeIcon: {
    alignSelf: 'flex-end',
  },
  inputText: {
    width: 320,
    borderWidth: 1,
    borderColor: '#FBCEB1',
    borderRadius: 8,
    marginVertical: 8,
    padding: 15,
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});
