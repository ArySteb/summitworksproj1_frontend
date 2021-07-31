import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { UserManagement } from '../../Views/Admin/UserManagement';
import { Home } from '../../Views/Home';

interface MainRouterProps {}

export default function MainRouter(props: MainRouterProps): JSX.Element {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/userm">
        <UserManagement />
      </Route>
      <Route path="/">error 404</Route>
    </Switch>
  );
}
