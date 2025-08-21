import 'expo-dev-client';
import {registerRootComponent} from 'expo';

import getPushNotification from 'utils/getPushNotification';

import App from './App';

getPushNotification();

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
