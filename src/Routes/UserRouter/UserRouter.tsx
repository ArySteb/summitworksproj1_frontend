import React from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import { NgoLayout } from '../../Components/NgoLayout';
import { EventInfo, EventRegistration, Events } from '../../Views/User';

export default function UserRouter(): JSX.Element {
  const { url, path } = useRouteMatch();

  return (
    <>
      <NgoLayout>
        <Switch>
          <Route exact path={`${path}/events`}>
            <Events />
          </Route>
          <Route exact path={`${path}/view-event`}>
            <EventInfo />
          </Route>
          <Route exact path={`${path}/register`}>
            <EventRegistration />
          </Route>
          <Route path={path}>
            <Redirect to={`${url}/events`} />
          </Route>
        </Switch>
      </NgoLayout>
    </>
  );
}
