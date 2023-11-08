import { memo, useCallback, useState, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderComponent } from 'components/HeaderComponent';
import { LoadingComponent } from 'components/LoadingComponent';
import { useCharacters } from 'contexts/CharactersContext';
import { HomeRouterParamListType } from 'routes/HomeCharactersRoute';
import { CharacterCard } from './CharacterCard';

export type CharactersScreenType = NativeStackScreenProps<
  HomeRouterParamListType,
  'Characters'
>;

const Screen: React.FC<CharactersScreenType> = ({ navigation }) => {
  const { characters, isLoading, currentPage, totalPages, fetchCharacters } =
    useCharacters();

  const [isFetching, setIsFetching] = useState(false);

  const Header = useCallback(() => <HeaderComponent title="Characters" />, []);
  const Footer = useCallback(
    () =>
      currentPage < totalPages ? (
        <LoadingComponent hei={20} wid={20} />
      ) : undefined,
    [totalPages, currentPage],
  );
  const onEndReached = useCallback(async () => {
    if (currentPage < totalPages && !isFetching) {
      setIsFetching(true);
      await fetchCharacters(currentPage + 1);
      setIsFetching(false);
    }
  }, [currentPage, fetchCharacters, isFetching, totalPages]);
  useEffect(() => {
    fetchCharacters(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      {(!isLoading || characters.length > 0) && (
        <FlatList
          data={characters}
          renderItem={({ item }) => (
            <CharacterCard
              character={item}
              onPress={() =>
                navigation.navigate('OneCharacterRoute', {
                  character: item,
                  screen: 'Character',
                })
              }
            />
          )}
          numColumns={2}
          keyExtractor={(_, index) => index.toString()}
          ListHeaderComponent={Header}
          ListFooterComponent={Footer}
          onEndReached={onEndReached}
        />
      )}
    </SafeAreaView>
  );
};

export default memo(Screen);
