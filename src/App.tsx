import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';
import { MainRouter } from './Routes/MainRouter';
import { AuthContextProvider } from './Contexts/AuthContext';

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <CssBaseline />
        <MainRouter />
      </AuthContextProvider>
    </BrowserRouter>
  );
}
