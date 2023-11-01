import React, { memo } from 'react';
import { Image, Text, View } from '@gluestack-ui/themed';

interface IHeaderComponentProps {
  title: string | null;
}

const HeaderComponent: React.FC<IHeaderComponentProps> = ({ title }) => (
  <>
    <View bgColor="#aa0000" alignItems="center">
      <Image
        // eslint-disable-next-line global-require
        source={require('../../assets/marvel-logo.png')}
        alt="marvel logo"
        h={80}
        w={142}
      />
    </View>
    <Text
      fontSize={24}
      bold
      lineHeight={24}
      color="white"
      textAlign="center"
      marginVertical={25}
    >
      {title?.toUpperCase()}
    </Text>
  </>
);

export default memo(HeaderComponent);
