import React, {useContext, useEffect} from 'react';
import {Text, View, Image, FlatList, TouchableOpacity} from 'react-native';
import {AuthContext, UsersContext} from '../context';

const HelloWorldApp = () => {
  const {users} = useContext(UsersContext);
  const {user} = useContext(AuthContext);

  const currentUser = users.find((x) => x.email === user.email);

  useEffect(() => {}, [currentUser]);

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

      {currentUser &&
        currentUser.bucketlist.map((item) => {
          return (
            <>
              <TouchableOpacity>
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
                </View>
              </TouchableOpacity>
            </>
          );
        })}

      {/* {current.map((user) => {
        console.log(user);
        return user.bucketlist.map((bucketlist) => {
          return (
            <TouchableOpacity>
              {bucketlist.length > 0 ? (
                <View key={bucketlist.title} style={listItem}>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      opacity: 0.8,
                      borderRadius: 20,
                    }}
                    source={{uri: bucketlist.image}}
                  />
                  <Text style={{fontWeight: '200', fontSize: 20}}>
                    {bucketlist.title}
                  </Text>
                  <Text style={{fontWeight: '400', fontSize: 14}}>
                    {bucketlist.deadline}
                  </Text>
                </View>
              ) : null}
            </TouchableOpacity>
          );
        });
      })} */}
    </View>
  );
};
export default HelloWorldApp;
