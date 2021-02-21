import React, {useContext} from 'react';
import {Text, View, Button} from 'react-native';
import {AuthContext} from '../context';

const Menu = ({toggleMenu, showMenu}) => {
  const {user, handleLogin, handleLogout} = useContext(AuthContext);

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        top: 120,
        height: '50%',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        borderBottomStartRadius: 30,
        borderBottomRightRadius: 30,
      }}>
      <Text style={{color: 'black', fontSize: 20}}>MENU</Text>

      <Button
        title="log out"
        onPress={() => {
          handleLogout();
          showMenu(false);
        }}
      />
    </View>
  );
};
export default Menu;
