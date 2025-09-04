import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView, {type WebViewMessageEvent} from 'react-native-webview';
import * as NavigationBar from 'expo-navigation-bar';
import useCustomUserAgent from 'hooks/useCustomUserAgent';
import useAndroidBackHandler from 'hooks/useAndroidBackHandler';
import useNotification from 'hooks/useNotification';

export default function App() {
  NavigationBar.setBackgroundColorAsync('#1C1C1E');
  NavigationBar.setButtonStyleAsync('light');

  const {webViewRef, handleNavigationStateChange} = useAndroidBackHandler();
  const customUserAgent = useCustomUserAgent();

  useNotification(webViewRef);

  const onMessageFromWebView = ({nativeEvent}: WebViewMessageEvent) => {
    // TODO: 받는 거 있으면 여기서 처리하기
    const {type, data} = JSON.parse(nativeEvent.data);
    console.log(type, data);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#1C1C1E'}}>
      <StatusBar barStyle="light-content" />
      <WebView
        ref={webViewRef}
        onNavigationStateChange={handleNavigationStateChange}
        source={{uri: 'https://repicka.shop/'}}
        scrollEnabled={false}
        overScrollMode="never"
        bounces={false}
        userAgent={customUserAgent}
        allowsBackForwardNavigationGestures
        onMessage={onMessageFromWebView}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        sharedCookiesEnabled // iOS/Android 둘 다 쿠키 공유 허용
        thirdPartyCookiesEnabled // Android에서 쿠키 허용
        mixedContentMode="always"
      />
    </SafeAreaView>
  );
}
