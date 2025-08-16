import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import * as NavigationBar from 'expo-navigation-bar';

export default function App() {
  NavigationBar.setBackgroundColorAsync('#1C1C1E');
  NavigationBar.setButtonStyleAsync('light');

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#1C1C1E'}}>
      <StatusBar barStyle="light-content" />
      <WebView
        source={{uri: 'https://repicka-back-dev.shop'}}
        scrollEnabled={false}
        overScrollMode="never"
        bounces={false}
        allowsBackForwardNavigationGestures
      />
    </SafeAreaView>
  );
}
