import React from "react";
import { WebView } from "react-native-webview";
// import {WebView} from 'react-native-web'

const NewsViewer = ({ navigation, route }) => {
  const { url } = route.params;
  return <WebView className='mt-10' source={{ uri: url }} style={{ flex: 1 }} />;
};

export default NewsViewer;
