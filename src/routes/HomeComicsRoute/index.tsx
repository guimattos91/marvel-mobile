import { ParamListBase } from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { ComicProvider } from 'contexts/ComicContext';
import { ComicsProvider } from 'contexts/ComicsContext';
import { ComicScreen } from 'screens/ComicScreen';
import { ComicsScreen } from 'screens/ComicsScreen';
import { ComicsType } from 'types/ComicType';

export type ComicRouterParamListType = {
  Comics: NativeStackScreenProps<ParamListBase>;
  Comic: { comic: ComicsType };
};

const Stack = createNativeStackNavigator<ComicRouterParamListType>();

const HomeComicsRoute: React.FC = () => {
  return (
    <ComicsProvider>
      <ComicProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'black',
            },
          }}
        >
          <Stack.Screen name="Comics" component={ComicsScreen} />
          <Stack.Screen
            name="Comic"
            component={ComicScreen}
            options={({ route }) => ({
              headerShown: true,
              headerTitle: route.params.comic.title,
              headerTintColor: '#aa0000',
              headerStyle: {
                backgroundColor: 'black',
              },
            })}
          />
        </Stack.Navigator>
      </ComicProvider>
    </ComicsProvider>
  );
};

export default HomeComicsRoute;
