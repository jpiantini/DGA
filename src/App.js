import * as React from 'react';
import Home from './views/Home/Home';
import { Global } from '@emotion/react';
import Router from './router/Router';
import { BrowserRouter } from "react-router-dom";
import Layouts from './router/Layouts';

function App() {
  return (
    <div>
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

    </div>

  );
}

export default App;
