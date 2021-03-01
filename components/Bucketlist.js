import React, {useContext, useEffect, useState} from 'react';
import {Text, View, Image, TouchableOpacity, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../context';

const HelloWorldApp = () => {
  //context
  const {userData, refreshUserData} = useContext(AuthContext);
  //bucketlist items to iterate
  const [items, setItems] = useState([]);

  //set iterable bucketlist when currentUser updates
  useEffect(() => {
    console.log('userData from bucketlist useeffect:', userData);
    if (!userData) return;
    setItems(userData.bucketlist);
  }, [userData]);

  const handleDelete = async (title) => {
    const userSnapshot = await firestore()
      .collection('users')
      .doc(userData.email);

    const userDataDB = await userSnapshot.get();
    console.log(userDataDB);

    const copyOfBucketlist = userDataDB._data.bucketlist.slice(0);

    const filteredBucketlist = copyOfBucketlist.filter(
      (item) => item.title !== title,
    );
    await userSnapshot
      .update({
        bucketlist: filteredBucketlist,
      })
      .then(refreshUserData);
  };

  //styles
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

  return (
    <View style={divStyle}>
      <Text style={{fontSize: 20, fontWeight: '500', margin: 20}}>
        MY BUCKETLIST
      </Text>

      {!userData && items.length === 0 && <Text>Fetching your data..</Text>}

      {userData && items.length === 0 && <Text>no items</Text>}

      {items.length > 0 &&
        items.map((item) => {
          return (
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
                    const title = item.title;
                    handleDelete(title);
                  }}
                />
              </View>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};
export default HelloWorldApp;
