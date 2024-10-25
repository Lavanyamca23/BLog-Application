import {View} from 'react-native';
import React, {useEffect} from 'react';
import * as Animatable from 'react-native-animatable';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
  }, []);
  return (
    <View className="flex-1 justify-center items-center bg-red-500">
      <Animatable.Text
        className="text-4xl text-white font-SemiBold"
        animation="fadeInDownBig"
        duration={2000}>
          Blog
          LIVE
      </Animatable.Text>
    </View>
  );
};

export default Splash;

