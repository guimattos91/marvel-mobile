/* eslint-disable prettier/prettier */
import { NavigatorScreenParams } from '@react-navigation/native';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { CharactersProvider } from 'contexts/CharactersContext';
import CharacterRoute, { CharacterRouterParamListType } from 'routes/CharacterRoute';
import { HomeScreen } from 'screens/HomeScreen';
import { CharacterType } from 'types/CharacterType';

type CharacterRouteType = { character: CharacterType } & NavigatorScreenParams<CharacterRouterParamListType>

export type HomeRouterParamListType = {
  Characters: undefined;
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
        <Stack.Screen name="OneCharacterRoute" component={CharacterRoute} options={({ route }) => ({
          headerShown: true,
          headerTitle: route.params.character.name,
          headerTintColor: '#aa0000',
          headerStyle: {
            backgroundColor: 'black',
          }
        })}
        />
      </Stack.Navigator>
    </CharactersProvider>
  );
};

export default HomeCharactersRoute;
