import { CssBaseline } from '@material-ui/core';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { NgoLayout } from './Components/NgoLayout';
import { MainRouter } from './Routes/MainRouter';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <CssBaseline />
      <NgoLayout>
        <MainRouter />
      </NgoLayout>
    </BrowserRouter>
  );
}

export default App;
