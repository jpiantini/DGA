import { useEffect } from 'react';
import { Global } from '@emotion/react';
import Router from './router/Router';
import { BrowserRouter } from "react-router-dom";
import Layouts from './router/Layouts';
import { Provider } from "react-redux";
import Store from './redux/store/Store';
import DateFnsUtils from '@date-io/date-fns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Zoom from '@mui/material/Zoom';
import { SnackbarProvider } from 'notistack'
import GlobalLoading from './components/GlobalLoading/GlobalLoading';
import Auth from './auth/Auth';
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
        <GlobalLoading />
        <LocalizationProvider dateAdapter={DateFnsUtils}>
          <BrowserRouter>
            <Auth>
              <Router routes={Layouts} />
            </Auth>
          </BrowserRouter>
        </LocalizationProvider>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
