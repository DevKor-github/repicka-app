import messaging from '@react-native-firebase/messaging';

const getPushNotification = () => {
  // 백그라운드 메시지 핸들러
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log(remoteMessage.data);
    // alert(remoteMessage.data);
  });

  // 앱 내에서 수신
  messaging().onMessage(async remoteMessage => {
    console.log(remoteMessage.data);
    // alert(remoteMessage.data);
  });
};

export default getPushNotification;
