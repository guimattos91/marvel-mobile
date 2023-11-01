/* eslint-disable prettier/prettier */
import { NavigatorScreenParams } from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { CharactersProvider } from 'contexts/CharactersContext';
import CharacterRoute, { CharacterRouterParamListType } from 'routes/CharacterRoute';
import { HomeScreen } from 'screens/HomeScreen';
import { CharacterType } from 'types/CharacterType';

type CharacterRouteType = { character: CharacterType } & Partial<
  NativeStackScreenProps<CharacterRouterParamListType, 'Character'>
>

export type HomeRouterParamListType = {
  Characters: NavigatorScreenParams<CharacterRouterParamListType>;
  OneCharacterRoute: CharacterRouteType;
};

const Stack = createNativeStackNavigator<HomeRouterParamListType>();

const HomeCharactersRoute: React.FC = () => {
  return (
    <CharactersProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Characters" component={HomeScreen} />
        <Stack.Screen name="OneCharacterRoute" component={CharacterRoute} />
      </Stack.Navigator>
    </CharactersProvider>
  );
};

export default HomeCharactersRoute;
