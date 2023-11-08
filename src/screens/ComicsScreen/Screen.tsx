import { memo, useEffect, useState, useCallback } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderComponent } from 'components/HeaderComponent';
import { LoadingComponent } from 'components/LoadingComponent';
import { useComics } from 'contexts/ComicsContext';
import { ComicRouterParamListType } from 'routes/HomeComicsRoute';
import { ComicCard } from './ComicCard';

export type ComicsScreenType = NativeStackScreenProps<
  ComicRouterParamListType,
  'Comics'
>;

const Header: React.FC = () => <HeaderComponent title="Comics" />;

const Screen: React.FC<ComicsScreenType> = ({ navigation }) => {
  const { comics, currentPage, totalPages, isLoading, fetchComics } =
    useComics();

  const [isFetching, setIsFetching] = useState(false);

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
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={Header}
          ListFooterComponent={Footer}
          onEndReached={onEndReached}
        />
      )}
    </SafeAreaView>
  );
};

export default memo(Screen);
