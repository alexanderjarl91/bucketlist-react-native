import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const UsersContext = React.createContext();
export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
  //notandi state
  const [user, setUser] = useState({});

  //signup states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        var userProfile = auth().currentUser;

        userProfile
          .updateProfile({
            displayName: name,
            photoURL:
              'https://herrmans.eu/wp-content/uploads/2019/01/765-default-avatar.png',
          })
          .then(() => {
            const authuserUid = user.user.uid;
            const authemail = user.user.email;
            const authname = user.user.displayName;

            const account = {
              useruid: authuserUid,
              email: authemail,
              name: authname,
              photoURL:
                'https://herrmans.eu/wp-content/uploads/2019/01/765-default-avatar.png',
              bucketlist: [
                {
                  title: 'Demo listing',
                  deadline: '1. january, 3005',
                  description: 'Here you can describe your bucketlist item',
                  image:
                    'https://res.cloudinary.com/rsc/image/upload/b_rgb:FFFFFF,c_pad,dpr_1.0,f_auto,h_337,q_auto,w_600/c_pad,h_337,w_600/R0261820-02?pgw=1',
                },
              ],
            };
            firestore().collection('users').doc(email).set(account);
          });
      });
  };

  const handleLogin = () => {
    auth().signInWithEmailAndPassword('alexanderjarl91@gmail.com', 'test123');
  };

  const handleLogout = () => {
    auth().signOut();
  };

  useEffect(() => {
    const authState = (currentUser) => {
      setUser(currentUser);
    };

    //run authState function when users logs in/out
    const subscriber = auth().onAuthStateChanged(authState);
    return subscriber;
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        name,
        email,
        password,
        setName,
        setEmail,
        setPassword,
        handleSignup,
        handleLogout,
        handleLogin,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UsersProvider = ({children}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const get = async () => {
      const usersRef = firestore().collection('users');
      const snapshot = await usersRef.get();
      const usersCopy = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        usersCopy.push(data);
      });
      setUsers(usersCopy);
    };
    get();
  }, []);

  return (
    <UsersContext.Provider value={{users}}>{children}</UsersContext.Provider>
  );
};
