import React from 'react';
import {Text, View, Button, TouchableOpacity, Image} from 'react-native';

const Navbar = ({setPage}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        height: '12%',
        paddingHorizontal: 50,
      }}>
      <TouchableOpacity
        style={{color: 'red', textAlign: 'center', alignItems: 'center'}}
        onPress={() => {
          setPage('home');
        }}>
        <Image
          style={{width: 40, height: 40, opacity: 0.8}}
          source={{uri: 'https://static.thenounproject.com/png/73203-200.png'}}
        />
        {/* <Text>Home</Text> */}
      </TouchableOpacity>
      <TouchableOpacity
        style={{color: 'red'}}
        onPress={() => {
          setPage('add');
        }}>
        <Image
          style={{width: 40, height: 40, opacity: 0.8}}
          source={{
            uri:
              'https://cdn.iconscout.com/icon/free/png-512/add-new-1439785-1214356.png',
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setPage('profile');
        }}
        style={{color: 'red'}}>
        <Image
          style={{width: 40, height: 40, opacity: 0.8}}
          source={{
            uri:
              'https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
