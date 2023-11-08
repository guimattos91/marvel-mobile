/* eslint-disable arrow-parens */
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CharacterProvider } from 'contexts/CharacterContext';
import { HomeRouterParamListType } from 'routes/HomeCharactersRoute';
import { CharacterComicScreen } from 'screens/CharacterComicScreen';
import { CharacterScreen } from 'screens/CharacterScreen';

export type CharacterRouterParamListType = {
  Character: undefined;
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
        <Tab.Screen
          name="Character"
          options={{
            tabBarLabel: 'Characters',
            tabBarInactiveTintColor: 'grey',
            tabBarActiveTintColor: '#aa0000',
            tabBarIndicatorStyle: { backgroundColor: '#aa0000' },
            tabBarStyle: {
              backgroundColor: 'black',
              borderBottomColor: '#aa0000',
              borderColor: '#aa0000',
            },
          }}
        >
          {(props) => <CharacterScreen {...props} character={character} />}
        </Tab.Screen>
        <Tab.Screen
          name="ListBooks"
          options={{
            tabBarLabel: 'Comics',
            tabBarInactiveTintColor: 'grey',
            tabBarActiveTintColor: '#aa0000',
            tabBarIndicatorStyle: { backgroundColor: '#aa0000' },
            tabBarStyle: {
              backgroundColor: 'black',
              borderBottomColor: '#aa0000',
              borderColor: '#aa0000',
            },
          }}
        >
          {(props) => <CharacterComicScreen {...props} character={character} />}
        </Tab.Screen>
      </Tab.Navigator>
    </CharacterProvider>
  );
};

export default CharacterRoute;
