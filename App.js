import React from 'react';
import {View} from 'react-native';
import AppNavigator from './AppNavigator';
import {LogContextProvider} from './components/dailypage/contexts/LogContext';

function App(){
 
  return (
    <LogContextProvider>
      <AppNavigator/>
    </LogContextProvider>
  );
}

export default App;
