import * as React from 'react';
import { Global } from '@emotion/react';
import Router from './router/Router';
import { BrowserRouter } from "react-router-dom";
import Layouts from './router/Layouts';
import { Provider } from "react-redux";
import Store from './redux/store/Store';
//ACCESSIBILITY IS A SCRIPT INSIDE OF public/index.html

function App() {
  return (
    <Provider store={Store}>
      <Global
        styles={`
          body {
            margin: 0;
          }
        `}
      />
      <BrowserRouter>
          <Router routes={Layouts} />
      </BrowserRouter>
    </Provider>

  );
}

export default App;
