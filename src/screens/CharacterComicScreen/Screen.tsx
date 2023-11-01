/* eslint-disable prettier/prettier */
import React, { memo } from 'react';
import { Text, } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CharacterRouterParamListType } from 'routes/CharacterRoute';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CharacterScreenType = NativeStackScreenProps<
  CharacterRouterParamListType,
  'ListBooks'
>;


const Screen: React.FC<CharacterScreenType> = () => {




  return (<>
    {/* eslint-disable-next-line react/style-prop-object */}
    <StatusBar style="light" backgroundColor="#272b33" />

    <SafeAreaView style={{ flex: 1, backgroundColor: '#272b33' }}>
      <Text color='white'>
        blaá
      </Text>

    </SafeAreaView ></>
  );
};
export default memo(Screen);
