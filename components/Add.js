import React, {useState, useContext} from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import {AuthContext, UsersContext} from '../context';
import firestore from '@react-native-firebase/firestore';

const Add = ({setPage}) => {
  firestore();
  const [title, setTitle] = useState('title');
  const [description, setDescription] = useState('description');
  const [deadline, setDeadline] = useState('deadline');
  const [image, setImage] = useState('image');

  const {users} = useContext(UsersContext);
  const {user} = useContext(AuthContext);

  const submitItem = async () => {
    const bucketListItem = {
      title: title,
      description: description,
      deadline: deadline,
      image: image,
    };

    const data = await firestore().collection('users').doc(user.email).get();
    const bucketListCopy = data._data.bucketlist;

    firestore()
      .collection('users')
      .doc(user.email)
      .update({
        bucketlist: [...bucketListCopy, bucketListItem],
      });
  };

  //STYLES
  const divStyle = {
    backgroundColor: 'rgba(255,255,255,0.5)',
    height: '72%',
    width: '90%',
    borderRadius: 20,
  };

  const inputStyle = {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    width: '50%',
    marginBottom: 20,
    fontSize: 20,
  };

  const textStyle = {
    fontSize: 16,
    fontWeight: '200',
    padding: 8,
  };

  return (
    <View style={divStyle}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: '500', padding: 20}}>
          Add a new Bucketlist Item
        </Text>

        <Text style={textStyle}>Title</Text>
        <TextInput
          onChangeText={(e) => {
            setTitle(e);
            console.log('title:', title);
          }}
          style={inputStyle}
        />
        <Text style={textStyle}>Deadline</Text>
        <TextInput
          onChangeText={(e) => {
            setDeadline(e);
            console.log('deadline:', deadline);
          }}
          style={inputStyle}
        />
        <Text style={textStyle}>Image URL</Text>
        <TextInput
          onChangeText={(e) => {
            setImage(e);
            console.log('image:', image);
          }}
          style={inputStyle}
        />
        <Text style={textStyle}>Description</Text>
        <TextInput
          multiline="true"
          numberOfLines="4"
          onChangeText={(e) => {
            setDescription(e);
            console.log('description:', description);
          }}
          style={{
            height: 120,
            borderColor: 'gray',
            borderWidth: 0.5,
            width: '60%',
            marginBottom: 20,
            fontSize: 16,
          }}
        />
        <Button
          onPress={() => {
            submitItem();
            setPage('home');
          }}
          title="Add item"
        />
      </View>
    </View>
  );
};
export default Add;
