/**
 * App.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 11:17:55
 * @last-modified 2019-08-31 16:06:16
 */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { resetAppActionType } from './reducers/rootReducer';
import MainBoardContainer from './components/MainBoard';
import Toolbar from './components/Toolbar';
import './App.css';

const App = () => {
  store.dispatch({ type: resetAppActionType });

  return (
    <div className="App">
      <Provider store={store}>
        <MainBoardContainer />
        <Toolbar />
      </Provider>
    </div>
  );
};

export default App;
