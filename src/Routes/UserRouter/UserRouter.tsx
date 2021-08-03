import React from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import { NgoLayout } from '../../Components/NgoLayout';
import { User } from '../../Views/User';

export default function UserRouter() {
  const { path, url } = useRouteMatch();
  return (
    <NgoLayout>
      <Switch>
        <Route exact path={path}>
          <User />
        </Route>
        <Route path="/">
          <Redirect to="/user" />
        </Route>
      </Switch>
    </NgoLayout>
  );
}
