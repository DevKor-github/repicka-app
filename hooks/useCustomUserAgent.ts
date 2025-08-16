import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import UserAgent from 'react-native-user-agent';

const useCustomUserAgent = () => {
  const [customUserAgent, setCustomUserAgent] = useState('customUserAgent');

  const changeUserAgent = async () => {
    try {
      const userAgent = await UserAgent.getWebViewUserAgent();
      const agent =
        Platform.OS === 'ios'
          ? userAgent + ' Safari/604.1'
          : userAgent?.substring(0, userAgent?.indexOf('Chrome'));
      setCustomUserAgent(agent);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    changeUserAgent();
  }, []);

  return customUserAgent;
};
export default useCustomUserAgent;
