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
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { cacheConfig } from './cacheConfig';

//ACCESSIBILITY IS A SCRIPT INSIDE OF public/index.html

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 24 hours / 1 day time of data from server is considered fresh
      staleTime: cacheConfig.staleTimeGeneral,
      cacheTime: cacheConfig.cacheTime
    }
  }
})


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
      <QueryClientProvider client={queryClient}>
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
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
