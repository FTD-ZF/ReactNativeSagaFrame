/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import storage from './src/commons/utils/storage';

AppRegistry.registerComponent(appName, () => App);
