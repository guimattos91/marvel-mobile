import React, { memo } from 'react';
import { View } from '@gluestack-ui/themed';
import LottieView from 'lottie-react-native';

interface ILoadingLottieProps {
  wid: number;
  hei: number;
}

const LoadingComponent: React.FC<ILoadingLottieProps> = ({ wid, hei }) => (
  <View flex={1} justifyContent="center" alignItems="center" my={16}>
    <LottieView
      // eslint-disable-next-line global-require
      source={require('../../assets/animation/IronManLoading.json')}
      style={{ width: wid, height: hei }}
      autoPlay
      loop
    />
  </View>
);

export default memo(LoadingComponent);
