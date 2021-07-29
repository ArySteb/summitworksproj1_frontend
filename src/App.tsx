import React from 'react';
import {
  BrowserRouter, Route, Switch
} from "react-router-dom";
import { NgoLayout } from './Components/Layout';
import { UserManagement } from './Views/Admin/UserManagement';
import { Home } from './Views/Home';

function App() {
  return (
    <BrowserRouter>
      <NgoLayout>
        <Switch>
          <Route exact path="/">
            initial page  
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/userm">
            <UserManagement />
          </Route>
          <Route path="/">
            error 404
          </Route>
        </Switch>
      </NgoLayout>
    </BrowserRouter>
  );
}

export default App;
