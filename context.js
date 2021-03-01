import React, {useState, useEffect, useRef} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const UsersContext = React.createContext();
export const AuthContext = React.createContext();

//Auth provider, providing firebase auth functions like sign up, log in, log out
export const AuthProvider = ({children}) => {
  //authenticated user
  const [user, setUser] = useState({});
  //the users data
  const [userData, setUserData] = useState();

  //signup states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //signup function
  const handleSignup = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        var userProfile = auth().currentUser;

        //give user a name from state and a default image
        userProfile
          .updateProfile({
            displayName: name,
            photoURL:
              'https://herrmans.eu/wp-content/uploads/2019/01/765-default-avatar.png',
          })
          .then(async () => {
            //create a variable called account with the users info plus a bucketlist array with a demo object
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
            //store the account data to a new document in firestore using the email as doc reference
            firestore().collection('users').doc(email).set(account);
            setUser(user);

            // setting userData state as the returned value from getUserData function using the user as a parameter (to match its email)
            const tempUserData = await getUserData(user);

            if (tempUserData) {
              setUserData(tempUserData);
            } else {
              console.log('handle signup failed');
            }
          });
      });
  };

  // login with email and password
  const handleLogin = async () => {
    await auth().signInWithEmailAndPassword(email, password);
    var currentUser = await auth().currentUser;
    console.log(currentUser._user);
    const tempUserData = await getUserData(currentUser._user);

    if (tempUserData) {
      setUserData(tempUserData);
    } else {
      console.log('handleLogin failed');
      return false;
    }
  };

  //log user out
  const handleLogout = () => {
    auth().signOut();
  };

  //get users data originally by matching it with the auth user
  const getUserData = async (authUser) => {
    console.log('get users running');
    const usersRef = firestore().collection('users');
    const snapshot = await usersRef.where('email', '==', authUser.email).get();

    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    let tempUserData;
    snapshot.forEach((doc) => {
      tempUserData = doc.data();
    });
    //set userData as the object found
    console.log('TEMP USER DATA:', tempUserData);
    if (tempUserData) {
      setUserData(tempUserData);
      return tempUserData;
    } else {
      console.log('getUserData failed');
      return false;
    }
  };

  //get users data and put it in a state
  const refreshUserData = async () => {
    const userSnapshot = await firestore()
      .collection('users')
      .doc(userData.email);
    const tempUserData = await userSnapshot.get();
    if (tempUserData && tempUserData._data) {
      console.log('running refresh function');
      setUserData(tempUserData._data);
    } else {
      console.log('refreshing error');
    }
  };

  useEffect(() => {
    const authState = (currentUser) => {
      setUser(currentUser);
    };

    //run authState function when users logs in/out
    const subscriber = auth().onAuthStateChanged(authState);
    return subscriber;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userData,
        name,
        email,
        password,
        setUserData,
        refreshUserData,
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

// //UsersProvider, providing data from users collection in Firestore
// export const UsersProvider = ({children}) => {
//   const [users, setUsers] = useState([]);

//   //get users function to update components, originally an empty function
//   const getUsers = useRef(() => {});

//   // runs on start
//   useEffect(() => {
//     getUsers.current = async () => {
//       console.log('get users running');
//       const usersRef = firestore().collection('users');
//       const snapshot = await usersRef.get();
//       const usersCopy = [];
//       snapshot.forEach((doc) => {
//         const data = doc.data();
//         usersCopy.push(data);
//       });
//       setUsers(usersCopy);
//     };
//     getUsers.current();
//   }, []);

//   return (
//     <UsersContext.Provider value={{users, setUsers, getUsers}}>
//       {children}
//     </UsersContext.Provider>
//   );
// };
