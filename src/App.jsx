import React from 'react';
import { LightTheme, BaseProvider } from 'baseui';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import Main from './screens/Main';
import './App.css';

const engine = new Styletron();

function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <div className="App">
          <Main />
        </div>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
