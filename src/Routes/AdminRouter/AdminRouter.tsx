import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { EventManagement } from '../../Views/Admin/EventManagement';
import { UserManagement } from '../../Views/Admin/UserManagement';
import { Home } from '../../Views/Home';
import { UserView } from '../../Views/Admin/UserView';
import { AdminLayout } from '../../Components/AdminLayout';
import { AddUser } from '../../Views/Admin/AddUser';
import WithAuth from '../../Utils/WithAuth';

interface MainRouterProps {}

export default function AdminRouter(props: MainRouterProps): JSX.Element {
  const { url, path } = useRouteMatch();

  return (
    <AdminLayout>
      <Switch>
        <Route exact path={path}>
          <Redirect to={`${url}/user_management`} />
        </Route>
        <Route exact path={`${path}/user_management`}>
          <UserManagement />
        </Route>
        <Route exact path={`${path}/user_management/add`}>
          <AddUser />
        </Route>
        <Route path={`${path}/event_management`}>
          <EventManagement />
        </Route>
        <Route path={`${path}/user_view`}>
          <UserView />
        </Route>
        <Route path={path}>error 404</Route>
      </Switch>
    </AdminLayout>
  );
}
