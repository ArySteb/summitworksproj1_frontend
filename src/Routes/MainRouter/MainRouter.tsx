import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthComponent from '../../Utils/WithAuth';
import { Home } from '../../Views/Home';
import { AdminRouter } from '../AdminRouter';
import { UserRouter } from '../UserRouter';

interface MainRouterProps {}

export default function MainRouter(props: MainRouterProps): JSX.Element {
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
        </AuthComponent>
      </Route>
      <Route path="/">error 404</Route>
    </Switch>
  );
}
