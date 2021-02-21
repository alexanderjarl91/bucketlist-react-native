/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {AuthProvider} from './context';

AppRegistry.registerComponent(
  appName,
  () => (props) => (
    <AuthProvider>
      <App {...props} />
    </AuthProvider>
  ),
  () => App,
);
