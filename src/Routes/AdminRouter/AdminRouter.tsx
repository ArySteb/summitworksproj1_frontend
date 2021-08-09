import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import {
  AddEvent,
  AddUser,
  EditEvent,
  EditUser,
  EventManagement,
  UserManagement,
  UserView,
} from '../../Views/Admin';
import { AdminLayout } from '../../Components/AdminLayout';

export default function AdminRouter(): JSX.Element {
  const { url, path } = useRouteMatch();

  return (
    <>
      <AdminLayout>
        <Switch>
          <Route exact path={path}>
            <Redirect to={`${url}/user_management`} />
          </Route>
          <Route exact path={`${path}/user_management`}>
            <UserManagement />
          </Route>
          <Route path={`${path}/user_management/add`}>
            <AddUser />
          </Route>
          <Route path={`${path}/user_management/edit`}>
            <EditUser />
          </Route>
          <Route exact path={`${path}/event_management`}>
            <EventManagement />
          </Route>
          <Route path={`${path}/event_management/add`}>
            <AddEvent />
          </Route>
          <Route path={`${path}/event_management/edit`}>
            <EditEvent />
          </Route>
          <Route path={`${path}/user_view`}>
            <UserView />
          </Route>
          <Route path={path}>error 404</Route>
        </Switch>
      </AdminLayout>
    </>
  );
}
