import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        source={{uri: 'https://devkor-github.github.io/repicka-web/'}}
        scrollEnabled={false}
        overScrollMode="never"
        bounces={false}
      />
    </SafeAreaView>
  );
}
