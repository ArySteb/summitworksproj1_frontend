import React, { useContext } from 'react';
import {
  createStyles,
  Divider,
  Drawer,
  List,
  ListItem,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import { TopBar } from '../TopBar';
import { LogoutButton } from '../LogoutButton';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  })
);

export default function AdminLayout(props: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element {
  const classes = useStyles();
  const { children } = props;
  const { userInfo } = useContext(AuthContext);
  return (
    <div className={classes.root}>
      <TopBar drawerWidth={drawerWidth} name={userInfo?.email ?? '<none>'} />
      <Drawer
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
        variant="permanent"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem
            button
            key="user_management"
            component={Link}
            to="/admin/user_management"
          >
            User Management
          </ListItem>
          <ListItem
            button
            key="event_management"
            component={Link}
            to="/admin/event_management"
          >
            Event Management
          </ListItem>
          <ListItem
            button
            key="user_view"
            component={Link}
            to="/admin/user_view"
          >
            User View
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <header>
          <div className={classes.toolbar} />
        </header>
        <main>{children}</main>
        <footer>
          <LogoutButton />
        </footer>
      </main>
    </div>
  );
}
