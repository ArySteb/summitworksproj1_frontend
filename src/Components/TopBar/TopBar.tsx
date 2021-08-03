import React from 'react';
import {
  AppBar,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
} from '@material-ui/core';

const useStyles = (drawerWidth: number) =>
  makeStyles((theme: Theme) =>
    createStyles({
      topBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
      topBarTitle: {
        flexGrow: 1,
      },
      topBarName: {
        marginRight: theme.spacing(1),
      },
    })
  )();

export default function TopBar(props: {
  drawerWidth?: number;
  name?: string;
}): JSX.Element {
  const { name = '', drawerWidth = 0 } = props;
  const classes = useStyles(drawerWidth);

  return (
    <AppBar position="fixed" className={classes.topBar}>
      <Toolbar>
        <div className={classes.topBarTitle}>NGO</div>
        <div className={classes.topBarName}>{name}</div>
        <div className="material-icons">person</div>
      </Toolbar>
    </AppBar>
  );
}
