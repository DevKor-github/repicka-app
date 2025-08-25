import {useCallback, useEffect} from 'react';
import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import type WebView from 'react-native-webview';

const useNotification = (webViewRef: React.RefObject<WebView | null>) => {
  const requestUserPermission = useCallback(async () => {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      return enabled;
    }
    return true;
  }, []);

  const sendTokenToServer = async (token: string) => {
    if (!webViewRef.current) return;

    // TODO: 제대로 Webview로 보내지는지 체크
    webViewRef.current.postMessage(
      JSON.stringify({
        type: 'FCM_TOKEN',
        data: token,
      }),
    );
  };

  const getFCMToken = useCallback(async () => {
    try {
      const hasPermission = await requestUserPermission();
      if (!hasPermission) {
        throw new Error('No permission for push notifications');
      }

      if (Platform.OS === 'ios') {
        await messaging().registerDeviceForRemoteMessages();
      }

      const token = await messaging().getToken();
      // 아이폰은 FCM 토큰 발급이 오류가 있음, 안드로이드는 정상
      // https://velog.io/@bcgo99/The-operation-couldnt-be-completed.-No-APNS-token-specified-before-fetching-FCM-Token
      console.log('token: ', token);
      await sendTokenToServer(token);
      return token;
    } catch (error) {
      console.error('Error getting FCM token:', error);
      throw error;
    }
  }, [requestUserPermission, sendTokenToServer]);

  useEffect(() => {
    getFCMToken();
  }, []);
};

export default useNotification;
