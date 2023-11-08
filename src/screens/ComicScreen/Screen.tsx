import React, { memo, useEffect, useCallback } from 'react';
import { Text, Image, ScrollView } from '@gluestack-ui/themed';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoadingComponent } from 'components/LoadingComponent';
import { useComic } from 'contexts/ComicContext';
import { getImageUrl } from 'helpers/index';
import { ComicRouterParamListType } from 'routes/HomeComicsRoute';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ComicScreenType = NativeStackScreenProps<
  ComicRouterParamListType,
  'Comic'
>;

const { width } = Dimensions.get('screen');

const imageWidth = width * 0.8;
const imageHeight = width * 1.2;

const backgroundImageWidth = width;
const backgroundImageHeight = width * 0.5;

const Screen: React.FC<ComicScreenType> = ({ route }) => {
  const { comic, isLoading, fetchComic, setComic } = useComic();
  const { id } = route.params.comic;

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
        {isLoading && !comic && <LoadingComponent hei={200} wid={200} />}
        {comic && (
          <ScrollView>
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
