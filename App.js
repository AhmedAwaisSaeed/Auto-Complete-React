import React from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';
const store = configureStore();
const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};

export default App;
