import { Container } from '@material-ui/core';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { LogoutButton } from '../../Components/LogoutButton';
import AuthComponent from '../../Utils/WithAuth';
import { Home } from '../../Views/Home';
import { AdminRouter } from '../AdminRouter';
import { UserRouter } from '../UserRouter';

export default function MainRouter(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/admin">
        <AuthComponent authRole="ADMIN">
          <AdminRouter />
        </AuthComponent>
      </Route>
      <Route path="/user">
        <AuthComponent authRole="USER">
          <UserRouter />

          <footer>
            <Container>
              <LogoutButton />
            </Container>
          </footer>
        </AuthComponent>
      </Route>
      <Route path="/">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}
