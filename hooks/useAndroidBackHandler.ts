import type WebView from 'react-native-webview';
import {useEffect, useRef, useState} from 'react';
import {BackHandler, ToastAndroid} from 'react-native';
import {type WebViewNavigation} from 'react-native-webview';

const useAndroidBackHandler = () => {
  const webViewRef = useRef<WebView>(null);
  const [currentUrl, setCurrentUrl] = useState('');
  const [lastBackPressed, setLastBackPressed] = useState(0);

  const onPressHardwareBackButton = () => {
    const now = Date.now();
    if (currentUrl === 'https://today-s-horoscope.vercel.app/') {
      if (now - lastBackPressed <= 2000) {
        BackHandler.exitApp();
      } else {
        ToastAndroid.show(
          '뒤로가기 버튼을 한번 더 누르면 종료됩니다.',
          ToastAndroid.SHORT,
        );
        setLastBackPressed(now);
      }
      return true;
    } else if (webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      onPressHardwareBackButton,
    );
  }, [currentUrl, lastBackPressed]);

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    setCurrentUrl(navState.url);
  };

  return {
    webViewRef,
    handleNavigationStateChange,
  };
};
export default useAndroidBackHandler;
