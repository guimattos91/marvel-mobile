import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import HomeCharactersRoute, {
  HomeRouterParamListType,
} from './HomeCharactersRoute';
import HomeComicsRoute, { ComicRouterParamListType } from './HomeComicsRoute';

export type RootStackParamListType = {
  HomeCharacters: NavigatorScreenParams<HomeRouterParamListType>;
  HomeComics: NavigatorScreenParams<ComicRouterParamListType>;
};

interface ITabProps {
  color: string;
  size: number;
}

const Tab = createBottomTabNavigator<RootStackParamListType>();

const HomeTab: React.FC<ITabProps> = ({ color, size }) => (
  <Ionicons name="person" color={color} size={size} />
);

const ComicsTab: React.FC<ITabProps> = ({ color, size }) => (
  <Ionicons name="book" color={color} size={size} />
);

const Routes: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopColor: '#aa0000',
          borderTopWidth: 3,
          height: 70,
        },
        tabBarActiveTintColor: '#aa0000',
        tabBarInactiveTintColor: 'grey',
      }}
    >
      <Tab.Screen
        name="HomeCharacters"
        component={HomeCharactersRoute}
        options={{
          tabBarIcon: HomeTab,
          tabBarLabel: 'Characters',
          tabBarLabelPosition: 'beside-icon',
        }}
      />
      <Tab.Screen
        name="HomeComics"
        component={HomeComicsRoute}
        options={{
          tabBarIcon: ComicsTab,
          tabBarLabel: 'Comics',
          tabBarLabelPosition: 'beside-icon',
        }}
      />
    </Tab.Navigator>
  );
};

export default Routes;
