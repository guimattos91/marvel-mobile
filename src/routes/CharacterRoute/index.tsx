/* eslint-disable arrow-parens */
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CharacterProvider } from 'contexts/CharacterContext';
import { HomeRouterParamListType } from 'routes/HomeCharactersRoute';
import { CharacterComicScreen } from 'screens/CharacterComicScreen';
import { CharacterScreen } from 'screens/CharacterScreen';
import { CharacterType } from 'types/CharacterType';

export type CharacterRouterParamListType = {
  Character: { character: CharacterType };
  ListBooks: undefined;
};

export type CharacterViewRouterType = NativeStackScreenProps<
  HomeRouterParamListType,
  'OneCharacterRoute'
>;

const Tab = createMaterialTopTabNavigator<CharacterRouterParamListType>();

const CharacterRoute: React.FC<CharacterViewRouterType> = ({ route }) => {
  const { character } = route.params;

  return (
    <CharacterProvider>
      <Tab.Navigator>
        <Tab.Screen name="Character" options={{ title: 'Character' }}>
          {props => <CharacterScreen {...props} character={character} />}
        </Tab.Screen>
        <Tab.Screen
          name="ListBooks"
          options={{ title: 'Comics' }}
          component={CharacterComicScreen}
        />
      </Tab.Navigator>
    </CharacterProvider>
  );
};

export default CharacterRoute;
