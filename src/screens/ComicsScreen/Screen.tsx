import { memo, useEffect, useState, useCallback } from 'react';
import { Text } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderComponent } from 'components/HeaderComponent';
import { useComics } from 'contexts/ComicsContext';
import { ComicRouterParamListType } from 'routes/HomeComicsRoute';
import { ComicCard } from './ComicCard';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComicsScreenType = NativeStackScreenProps<
  ComicRouterParamListType,
  'Comics'
>;
const Screen: React.FC<ComicsScreenType> = ({ navigation }) => {
  const { comics, currentPage, totalPages, isLoading, fetchComics } =
    useComics();

  const [isFetching, setIsFetching] = useState(false);

  const Header = useCallback(() => <HeaderComponent title="Comics" />, []);
  const Footer = useCallback(
    () => (currentPage < totalPages ? <Text>Loading...</Text> : undefined),
    [totalPages, currentPage],
  );

  const onEndReached = useCallback(async () => {
    if (currentPage < totalPages && !isFetching) {
      setIsFetching(true);
      await fetchComics(currentPage + 1);
      setIsFetching(false);
    }
  }, [currentPage, fetchComics, isFetching, totalPages]);
  useEffect(() => {
    fetchComics(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      {(!isLoading || comics.length > 0) && (
        <FlatList
          data={comics}
          renderItem={({ item }) => (
            <ComicCard
              comic={item}
              onPress={() => navigation.navigate('Comic', { comic: item })}
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
