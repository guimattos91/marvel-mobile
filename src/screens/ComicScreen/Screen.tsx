import React, { memo, useEffect, useCallback } from 'react';
import { Entypo } from '@expo/vector-icons';
import { View, Text, Image, ScrollView } from '@gluestack-ui/themed';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, TouchableOpacity } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useComic } from 'contexts/ComicContext';
import { getImageUrl } from 'helpers/index';
import { ComicRouterParamListType } from 'routes/HomeComicsRoute';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ComicScreenType = NativeStackScreenProps<
  ComicRouterParamListType,
  'Comic'
>;

const imageWidth = Dimensions.get('screen').width * 0.8;
const imageHeight = Dimensions.get('screen').width * 1.2;

const backgroundImageWidth = Dimensions.get('screen').width;
const backgroundImageHeight = Dimensions.get('screen').width * 0.5;

const Screen: React.FC<ComicScreenType> = ({ route, navigation }) => {
  const { comic, fetchComic, setComic } = useComic();
  const { id } = route.params.comic;
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      return () => setComic(null);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  useEffect(() => {
    if (id) fetchComic(id);
  }, [fetchComic, id]);

  return (
    <>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="light" backgroundColor="black" />

      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        {comic && (
          <ScrollView paddingTop={insets.top}>
            <View
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              paddingBottom={20}
              paddingTop={20}
              paddingHorizontal={30}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Entypo name="chevron-left" size={20} color="white" />
              </TouchableOpacity>
              <Text
                color="white"
                fontSize={20}
                lineHeight={20}
                marginTop={3}
                textAlign="center"
                bold
              >
                {comic?.title}
              </Text>
            </View>
            <Image
              source={{ uri: getImageUrl(comic.thumbnail) }}
              alt={comic.title}
              width={imageWidth}
              height={imageHeight}
              alignSelf="center"
            />
            <Text
              color="$white"
              alignSelf="center"
              paddingHorizontal={40}
              paddingTop={20}
            >
              {comic.description}
            </Text>
            <Image
              // eslint-disable-next-line global-require
              source={require('../../assets/background.png')}
              alt="Background Image with Waves"
              height={backgroundImageHeight}
              width={backgroundImageWidth}
            />
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
};

export default memo(Screen);
