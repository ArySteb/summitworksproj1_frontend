import React, { useContext, useState } from 'react';
import {
  Button,
  Container,
  createStyles,
  makeStyles,
  TextField,
} from '@material-ui/core';
import axios from 'axios';
import { Redirect, useHistory, useRouteMatch } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import { TopBar } from '../../Components/TopBar';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      fontSize: '48px',
      textAlign: 'center',
    },
    mainContent: {
      textAlign: 'center',
    },
    loginTitle: {
      fontSize: '32px',
      textAlign: 'center',
    },
  })
);

export default function Home(): JSX.Element {
  const history = useHistory();
  const { url } = useRouteMatch();
  const { userInfo, refresh } = useContext(AuthContext);
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    event
  ): void => {
    event.preventDefault();
    axios('/api/session', {
      method: 'POST',
      data: {
        email,
        password,
      },
    })
      .then(() => {
        history.push(`${url}?loggedin`);
        refresh();
      })
      .catch(() => {
        history.push(`${url}?loginfailure`);
      });
  };

  const handleEmailChange = (event: { target: { value: string } }): void => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: string } }): void => {
    setPassword(event.target.value);
  };

  if (userInfo) {
    const page = userInfo.role === 'ADMIN' ? 'admin' : 'user';
    return <Redirect to={`${page}`} />;
  }

  return (
    <Container>
      <header>
        <TopBar />
        <h1 className={classes.title}>NGO Site!</h1>
      </header>
      <main className={classes.mainContent}>
        <h2 className={classes.loginTitle}>Log in to NGO here!</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            placeholder="Email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
          <br />
          <TextField
            placeholder="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <br />
          <Button variant="contained" type="submit">
            Log In
          </Button>
        </form>
      </main>
      <footer>
        <></>
      </footer>
    </Container>
  );
}
