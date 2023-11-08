/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import { Text, Image, ScrollView } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoadingComponent } from 'components/LoadingComponent';
import { useCharacter } from 'contexts/CharacterContext';
import { getImageUrl } from 'helpers/index';
import { CharacterRouterParamListType } from 'routes/CharacterRoute';
import { CharacterType } from 'types/CharacterType';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CharacterScreenType = NativeStackScreenProps<
  CharacterRouterParamListType,
  'Character'
> & {
  character: CharacterType
};

const { width } = Dimensions.get('screen')

const imageWidth = width * 0.8;
const backgroundImageWidth = width;
const backgroundImageHeight = width * 0.5;

const Screen: React.FC<CharacterScreenType> = ({ character: RouteCharacter }) => {
  const { character, isLoading, fetchCharacter } = useCharacter()


  useEffect(() => {
    if (RouteCharacter.id) fetchCharacter(RouteCharacter.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCharacter])

  return (
    <>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="light" backgroundColor="black" />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black', }} >
        {isLoading && !character && <LoadingComponent hei={200} wid={200} />
        }
        {character &&
          <ScrollView>
            <Image
              source={{ uri: getImageUrl(character.thumbnail) }}
              alt={character.name}
              width={imageWidth}
              height={imageWidth}
              alignSelf='center'
            />
            {character.description &&
              <Text color='$white' alignSelf='center' paddingHorizontal={40} paddingTop={20}>
                {character.description}
              </Text>
            }
            {!character.description &&
              <Text color='$white' alignSelf='center' paddingHorizontal={40} paddingTop={20}>
                This character doesn&apos;t have a description yet.
              </Text>
            }
            <Image
              // eslint-disable-next-line global-require
              source={require('../../assets/background.png')}
              alt='Background Image with Waves'
              height={backgroundImageHeight}
              width={backgroundImageWidth}
              style={{ transform: [{ scaleX: -1 }] }}
            />
          </ScrollView>
        }

      </SafeAreaView >
    </>
  );
};
export default memo(Screen);
