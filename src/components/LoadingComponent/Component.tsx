import React, { memo } from 'react';
import { View } from '@gluestack-ui/themed';
import LottieView from 'lottie-react-native';

const LoadingComponent: React.FC = () => (
  <View flex={1} justifyContent="center" alignItems="center" my={16}>
    <LottieView
      // eslint-disable-next-line global-require
      source={require('../../assets/animation/spiderLoading.json')}
      style={{ width: 80, height: 80 }}
      autoPlay
      loop
    />
  </View>
);

export default memo(LoadingComponent);
