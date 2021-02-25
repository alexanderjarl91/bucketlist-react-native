import React from 'react';
import {Text, View, Button, TouchableOpacity, Image} from 'react-native';

export default function Header({
  setPage,
  toggleMenu,
  menu,
  setModalVisible,
  modalVisible,
}) {
  const divStyle = menu
    ? {
        position: 'absolute',
        top: 0,
        width: '100%',
        padding: 20,
        paddingHorizontal: 30,
        marginTop: '10%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
      }
    : {
        position: 'absolute',
        top: 0,
        width: '100%',
        padding: 20,
        paddingHorizontal: 30,
        marginTop: '10%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      };
  return (
    <View style={divStyle}>
      <TouchableOpacity
        onPress={() => {
          setPage('home');
        }}>
        <Image
          style={{width: 40, height: 40, opacity: 0.7}}
          source={{uri: 'https://static.thenounproject.com/png/73203-200.png'}}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          // toggleMenu();
          setModalVisible(!modalVisible);
          // setPage('');
        }}>
        <Image
          style={{width: 40, height: 40, opacity: 0.7}}
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png',
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
