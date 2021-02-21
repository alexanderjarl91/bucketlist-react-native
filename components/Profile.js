import React, {useState, useContext} from 'react';
import {Text, View, Image, Button} from 'react-native';
import {AuthContext, UsersContext} from '../context';

const Profile = () => {
  const {user} = useContext(AuthContext);
  const {users} = useContext(UsersContext);
  const currentUser = user._user;

  const firestoreUser = users.find((x) => x.email === user.email);
  console.log(firestoreUser.bucketlist.length);

  const divStyle = {
    backgroundColor: 'white',
    height: '72%',
    width: '90%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const profileImage = {
    height: 200,
    width: 200,
    borderRadius: 150,
    margin: 20,
  };

  const profileName = {
    fontSize: 20,
    fontWeight: '200',
    padding: 5,
  };

  const profileEmail = {
    fontSize: 16,
    fontWeight: '200',
  };

  const totalItems = {
    fontSize: 16,
    marginLeft: 4,
  };
  return (
    <View style={divStyle}>
      <Image style={profileImage} source={{uri: currentUser.photoURL}} />
      <Text style={profileName}>{currentUser.displayName}</Text>
      <Text style={profileEmail}>{currentUser.email}</Text>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text style={profileEmail}>Bucketlist Items:</Text>
        <Text style={totalItems}>{firestoreUser.bucketlist.length}</Text>
      </View>

      <Button title="Log out" />
    </View>
  );
};
export default Profile;
