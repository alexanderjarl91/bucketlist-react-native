import React, {useContext} from 'react';
import {Text, View, Image, Button} from 'react-native';
import {AuthContext} from '../context';

const Profile = () => {
  const {userData} = useContext(AuthContext);

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

  if (!userData) {
    return <View></View>;
  }

  return (
    <View style={divStyle}>
      <Image style={profileImage} source={{uri: userData.photoURL}} />
      <Text style={profileName}>{userData.displayName}</Text>
      <Text style={profileEmail}>{userData.email}</Text>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text style={profileEmail}>Bucketlist Items:</Text>
        <Text style={totalItems}>{userData.bucketlist.length}</Text>
      </View>

      <Button title="Log out" />
    </View>
  );
};
export default Profile;
