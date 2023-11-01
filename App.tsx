/* eslint-disable react/style-prop-object */
import { GluestackUIProvider, config } from '@gluestack-ui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import Routes from 'routes/index';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <GluestackUIProvider config={config.theme}>
        <Routes />
        <StatusBar style="light" backgroundColor="#aa0000" />
      </GluestackUIProvider>
    </NavigationContainer>
  );
};

export default App;
