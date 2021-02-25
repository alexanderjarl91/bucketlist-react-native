import React, {useContext} from 'react';
import {Text, View, Button, TouchableOpacity, Image} from 'react-native';
import {AuthContext} from '../context';

const Menu = ({
  toggleMenu,
  showMenu,
  setPage,
  modalVisible,
  setModalVisible,
}) => {
  const {user, handleLogin, handleLogout} = useContext(AuthContext);

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.5)',
        position: 'absolute',
        top: 120,
        height: '50%',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        borderBottomStartRadius: 30,
        borderBottomRightRadius: 30,
      }}>
      <TouchableOpacity
        style={{positioN: 'fixed', left: 157, top: -232}}
        onPress={() => setModalVisible(!modalVisible)}>
        <Image
          style={{width: 30, height: 30, opacity: 0.7}}
          source={{
            uri:
              'https://i.vippng.com/png/small/412-4127609_free-vector-old-turkic-letter-d-clip-artclose.png',
          }}
        />
      </TouchableOpacity>
      <Text style={{color: 'black', fontSize: 20}}>MENU</Text>

      <Button
        title="log out"
        onPress={() => {
          setModalVisible(!modalVisible);
          handleLogout();
          setPage('home');
        }}
      />
    </View>
  );
};
export default Menu;
