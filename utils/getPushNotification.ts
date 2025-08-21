import messaging from '@react-native-firebase/messaging';

const getPushNotification = () => {
  messaging().registerDeviceForRemoteMessages();
  // 백그라운드 메시지 핸들러
  // TODO: 수신 확인
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log(remoteMessage.data);
    alert(remoteMessage.data.notificationType);
  });

  // 포그라운드 메시지 핸들러
  // TODO: 수신 확인
  messaging().onMessage(async remoteMessage => {
    console.log(remoteMessage.data);
    alert(remoteMessage.data.notificationType);
  });
};

export default getPushNotification;
