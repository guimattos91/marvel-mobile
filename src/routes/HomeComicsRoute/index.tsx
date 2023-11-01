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
              backgroundColor: '#272b33',
            },
          }}
        >
          <Stack.Screen name="Comics" component={ComicsScreen} />
          <Stack.Screen name="Comic" component={ComicScreen} />
        </Stack.Navigator>
      </ComicProvider>
    </ComicsProvider>
  );
};

export default HomeComicsRoute;