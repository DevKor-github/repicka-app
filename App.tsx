import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import * as NavigationBar from 'expo-navigation-bar';
import useCustomUserAgent from 'hooks/useCustomUserAgent';

export default function App() {
  NavigationBar.setBackgroundColorAsync('#1C1C1E');
  NavigationBar.setButtonStyleAsync('light');

  const customUserAgent = useCustomUserAgent();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#1C1C1E'}}>
      <StatusBar barStyle="light-content" />
      <WebView
        source={{uri: 'https://repicka-back-dev.shop'}}
        scrollEnabled={false}
        overScrollMode="never"
        bounces={false}
        userAgent={customUserAgent}
        allowsBackForwardNavigationGestures
      />
    </SafeAreaView>
  );
}
