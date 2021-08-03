import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { NgoLayout } from '../../Components/NgoLayout';
import { User } from '../../Views/User';

export default function UserRouter() {
  return (
    <NgoLayout>
      <Switch>
        <Route exact path="/">
          <User />
        </Route>
        <Route path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
    </NgoLayout>
  );
}
