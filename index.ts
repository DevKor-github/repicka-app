import 'expo-dev-client';
import {registerRootComponent} from 'expo';
import messaging from '@react-native-firebase/messaging';

import App from './App';

messaging().registerDeviceForRemoteMessages();
// 백그라운드 메시지 핸들러
// TODO: 수신 확인
messaging().setBackgroundMessageHandler(async remoteMessage => {
  alert(remoteMessage);
});

// 포그라운드 메시지 핸들러
// TODO: 수신 확인
messaging().onMessage(async remoteMessage => {
  alert(remoteMessage);
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
