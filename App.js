import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import Profile from './components/Profile';
import Bucketlist from './components/Bucketlist';
import Navbar from './components/Navbar';
import Add from './components/Add.js';
import Header from './components/Header';
import Menu from './components/Menu';
import Login from './components/Login';
import {UsersProvider} from './context';
import {AuthContext} from './context';

const App = () => {
  //state to toggle between login and signup
  const [hasAccount, setHasAccount] = useState(false);

  //NAV STATES (navigate and show menu)
  const [page, setPage] = useState('home');
  const [menu, showMenu] = useState(false);

  //CONTEXT DECLARATIONS
  const {
    user,
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    handleLogin,
    handleLogout,
    handleSignup,
  } = useContext(AuthContext);

  //TOGGLE MENU
  const toggleMenu = () => {
    showMenu(!menu);
  };

  return (
    <UsersProvider>
      {user ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFC4BA',
          }}>
          <Header setPage={setPage} toggleMenu={toggleMenu} menu={menu} />
          {menu ? <Menu showMenu={showMenu} /> : null}
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
    </UsersProvider>
  );
};
export default App;
