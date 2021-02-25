import React, {useContext, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext, UsersContext} from '../context';

const HelloWorldApp = () => {
  const {users, getUsers} = useContext(UsersContext); //firestore data
  const {user, handleLogout} = useContext(AuthContext); // currently authenticated user
  const currentUser = users.find((x) => x.email === user.email);

  //call the getUsers function from useRef hook in context.js to rerender component when user changes
  useEffect(() => {
    console.log(getUsers);
    getUsers.current();
  }, [getUsers, user]);

  const divStyle = {
    backgroundColor: 'rgba(255,255,255,0.5)',
    height: '72%',
    width: '90%',
    borderRadius: 20,
  };

  const listItem = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    padding: 20,
    textAlign: 'center',
    alignItems: 'center',
  };

  const handleDelete = async (title) => {
    const userRef = await firestore()
      .collection('users')
      .doc(currentUser.email);

    userRef.update({
      bucketlist: firestore.FieldValue.arrayRemove(title),
    });
  };

  return (
    <View style={divStyle}>
      <Text style={{fontSize: 20, fontWeight: '500', margin: 20}}>
        MY BUCKETLIST :)
      </Text>

      {!currentUser ? <Text>Fetching your data..</Text> : null}
      {currentUser &&
        currentUser.bucketlist.map((item) => {
          return (
            <>
              <TouchableOpacity key={item.title}>
                <View style={listItem}>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      opacity: 0.8,
                      borderRadius: 20,
                    }}
                    source={{uri: item.image}}
                  />
                  <Text style={{fontWeight: '200', fontSize: 20}}>
                    {item.title}
                  </Text>
                  <Text style={{fontWeight: '400', fontSize: 14}}>
                    {item.deadline}
                  </Text>
                  <Button
                    title="X"
                    onPress={() => {
                      // console.log(item.indexOf({title: title}));
                      const index = currentUser.bucketlist.findIndex(
                        (element) => {
                          if (element.title === item.title) {
                            return true;
                          }
                        },
                      );
                      console.log(currentUser.bucketlist[index].id);

                      const title = item.title;
                      console.log(title);
                      handleDelete(title);
                    }}
                  />
                </View>
              </TouchableOpacity>
            </>
          );
        })}
    </View>
  );
};
export default HelloWorldApp;
