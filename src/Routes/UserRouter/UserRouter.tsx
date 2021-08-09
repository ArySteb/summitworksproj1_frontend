import React from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import { NgoLayout } from '../../Components/NgoLayout';
import { EventInfo, Events } from '../../Views/User';

export default function UserRouter(): JSX.Element {
  const { path, url } = useRouteMatch();
  return (
    <>
      <NgoLayout>
        <Switch>
          <Route exact path={`${path}/events`}>
            <Events />
          </Route>
          <Route exact path={`${path}/events/view`}>
            <EventInfo />
          </Route>
          <Route path={path}>
            <Redirect to={`${url}/events`} />
          </Route>
        </Switch>
      </NgoLayout>
    </>
  );
}
