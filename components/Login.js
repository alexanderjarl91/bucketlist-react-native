import React, {useState, useContext} from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import {AuthContext} from '../context';

const Login = ({
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  handleSignup,
  hasAccount,
  setHasAccount,
}) => {
  const {user, handleLogin, handleLogout} = useContext(AuthContext);

  const container = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
  };
  return (
    <View style={container}>
      <Text>BUCKETLIST</Text>
      {hasAccount ? (
        <>
          <Text>Log in with your email and password</Text>
          <Text>E-mail</Text>
          <TextInput
            onChangeText={(e) => {
              setEmail(e.toLowerCase());
              console.log('email:', email);
            }}
            style={{
              height: 25,
              borderColor: 'gray',
              borderWidth: 0.5,
              width: '50%',
            }}
          />
          <Text>Password</Text>
          <TextInput
            onChangeText={(e) => {
              setPassword(e);
              console.log('password:', password);
            }}
            style={{
              height: 25,
              borderColor: 'gray',
              borderWidth: 0.5,
              width: '50%',
            }}
          />
          <Button
            title="Log in"
            onPress={() => {
              handleLogin();
            }}
          />
          <Text>Dont have an account?</Text>
          <Button
            onPress={() => {
              setHasAccount(!hasAccount);
              console.log(hasAccount);
            }}
            title="Sign up!"
          />
        </>
      ) : (
        <>
          <Text>Sign Up</Text>
          <Text>Name</Text>
          <TextInput
            onChangeText={(e) => {
              setName(e);
              console.log('name:', name);
            }}
            style={{
              height: 25,
              borderColor: 'gray',
              borderWidth: 0.5,
              width: '50%',
            }}
          />
          <Text>E-mail</Text>
          <TextInput
            onChangeText={(e) => {
              setEmail(e.toLowerCase());
              console.log('email:', email);
            }}
            style={{
              height: 25,
              borderColor: 'gray',
              borderWidth: 0.5,
              width: '50%',
            }}
          />
          <Text>Password</Text>
          <TextInput
            onChangeText={(e) => {
              setPassword(e);
              console.log('password:', password);
            }}
            style={{
              height: 25,
              borderColor: 'gray',
              borderWidth: 0.5,
              width: '50%',
            }}
          />
          <Button
            title="Sign up"
            onPress={() => {
              handleSignup(email, password);
            }}
          />
          <Text>Already have an account?</Text>
          <Button
            onPress={() => {
              setHasAccount(!hasAccount);
              console.log(hasAccount);
            }}
            title="Log in"
          />
        </>
      )}
    </View>
  );
};
export default Login;
