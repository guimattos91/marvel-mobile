/* eslint-disable prettier/prettier */
import React, { memo, useEffect, useCallback } from 'react';
import { Text, View } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCharacter } from 'contexts/CharacterContext';
import { CharacterRouterParamListType } from 'routes/CharacterRoute';
import { CharacterType } from 'types/CharacterType';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CharacterScreenType = NativeStackScreenProps<
  CharacterRouterParamListType,
  'ListBooks'
> & {
  character: CharacterType
};


const Screen: React.FC<CharacterScreenType> = ({ character: RouteCharacter }) => {
  const { character, isLoading, fetchCharacter } = useCharacter()

  const Header = useCallback(
    () => (
      <View my={40}>
        <Text
          fontSize={24}
          bold
          lineHeight={31.2}
          color="white"
          textAlign="center"
        >
          Comics of this character.
        </Text>
      </View>
    ),
    [],
  );

  useEffect(() => {
    fetchCharacter(RouteCharacter.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCharacter])

  return (
    <>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="light" backgroundColor="black" />

      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        {(!isLoading || character && character.comics.items.length > 0) && (
          <FlatList
            data={character?.comics?.items}
            style={{ flexDirection: 'column', paddingHorizontal: 10, flexWrap: 'wrap' }}
            renderItem={({ item }) => (
              <Text color='white' textAlign='center' marginBottom={10} >
                {item.name}
              </Text>
            )}
            numColumns={1}
            keyExtractor={(_, index) => index.toString()}
            ListHeaderComponent={Header}
          />
        )}
      </SafeAreaView >
    </>
  );
};
export default memo(Screen);
