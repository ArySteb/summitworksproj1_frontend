import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import axios from 'axios';
import React from 'react';

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

  const logout = () => {
    axios.delete('/api/session').then(() =>
      axios.post('/api/session', {
        email: '_',
        password: '_',
      })
    );
  };

  return (
    <Button
      className={classes.button}
      variant="contained"
      color="primary"
      onClick={logout}
    >
      {text}
    </Button>
  );
}
