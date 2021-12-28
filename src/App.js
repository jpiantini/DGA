import * as React from 'react';
import { Global } from '@emotion/react';
import Router from './router/Router';
import { BrowserRouter } from "react-router-dom";
import Layouts from './router/Layouts';
import { Provider } from "react-redux";
import Store from './redux/store/Store';
import DateFnsUtils from '@date-io/date-fns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Zoom from '@mui/material/Zoom';
import {SnackbarProvider} from 'notistack'
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
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        TransitionComponent={Zoom}
      >
        <LocalizationProvider dateAdapter={DateFnsUtils}>
          <BrowserRouter>
            <Router routes={Layouts} />
          </BrowserRouter>
        </LocalizationProvider>
      </SnackbarProvider>

    </Provider>

  );
}

export default App;
