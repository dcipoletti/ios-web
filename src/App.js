import React, {useReducer} from 'react';
import Phone from './components/Phone';
import './App.scss';

// Persistent State
import { Context, state, reducer } from './DataStore';

function App() {
  const [store, dispatch] = useReducer(reducer, state);

  return (
    <Context.Provider value={{store, dispatch}}>
      <div className="App">
        <Phone />
      </div>
    </Context.Provider>
  );
}

export default App;
