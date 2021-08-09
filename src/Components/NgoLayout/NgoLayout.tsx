import {
  AppBar,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

interface NgoLayoutProps {
  children?: string | JSX.Element | JSX.Element[];
}

export default function NgoLayout(props: NgoLayoutProps): JSX.Element {
  const { children = '' } = props;

  const classes = useStyles();

  return (
    <>
      <AppBar>
        <Toolbar>
          <div className={classes.title}>NGO</div>
          <div>
            <span className="material-icons">person</span>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {children}
    </>
  );
}
