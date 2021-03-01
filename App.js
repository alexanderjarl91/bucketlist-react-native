import React, {useState, useContext} from 'react';
import {View, StyleSheet, Modal, Pressable, Text, Button} from 'react-native';
import Profile from './components/Profile';
import Bucketlist from './components/Bucketlist';
import Navbar from './components/Navbar';
import Add from './components/Add.js';
import Header from './components/Header';
import Menu from './components/Menu';
import Login from './components/Login';
import {AuthContext} from './context';

const App = () => {
  //state to toggle between login and signup
  const [hasAccount, setHasAccount] = useState(false);

  //NAV STATES (navigate and show menu)
  const [page, setPage] = useState('home');
  const [modalVisible, setModalVisible] = useState(false);

  //CONTEXT DECLARATIONS
  const {
    userData,
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    handleSignup,
  } = useContext(AuthContext);

  //modal styles
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      borderRadius: 20,
      padding: 50,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 20,
    },
    button: {
      borderRadius: 20,
      padding: 20,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });

  return (
    <>
      {userData ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFC4BA',
          }}>
          <Header
            setPage={setPage}
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
          />

          {/* MENU MODAL */}
          <Modal
            animationType="fade"
            // transparent={true}
            presentationStyle="fullScreen"
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <Menu
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setPage={setPage}
              />
            </View>
          </Modal>
          {page === 'home' ? <Bucketlist /> : null}
          {page === 'add' ? <Add setPage={setPage} /> : null}
          {page === 'profile' ? <Profile /> : null}

          <Navbar setPage={setPage} />
        </View>
      ) : (
        <Login
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSignup={handleSignup}
        />
      )}
    </>
  );
};
export default App;
