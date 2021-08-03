import React, { useContext, useState } from 'react';
import {
  Button,
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import axios from 'axios';

import { AuthContext } from '../../Contexts/AuthContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(3),
    },
  })
);

export default function LogoutButton(props: { text?: string }) {
  const { text = 'Log Out' } = props;
  const classes = useStyles();
  const [loggingOut, setLoggingOut] = useState(false);
  const { refresh } = useContext(AuthContext);

  const logout = () => {
    setLoggingOut(true);
    axios.delete('/api/session').then(() => {
      setLoggingOut(false);
      refresh();
    });
  };

  return (
    <Button
      className={classes.button}
      variant="contained"
      color="primary"
      onClick={logout}
    >
      {loggingOut ? <CircularProgress color="secondary" /> : text}
    </Button>
  );
}
