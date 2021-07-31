import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  createStyles,
  Input,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
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
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    axios
      .get('api/users', {
        headers: {
          credentials: 'include',
          'content-type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log('error', err);
      });
  }, []);

  const handleSubmit = (event: any): void => {
    event.preventDefault();
    axios('/api/users', {
      method: 'POST',
      data: {
        email,
        password,
      },
      auth: {
        username: 'steb@mail.com',
        password: 'password123',
      },
      withCredentials: true,
    }).catch((err) => {
      console.log('other error', err);
    });
  };

  const handleEmailChange = (event: any): void => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any): void => {
    setPassword(event.target.value);
  };

  return (
    <Container>
      <header>
        <h1 className={classes.title}>NGO Site!</h1>
      </header>
      <main className={classes.mainContent}>
        <h2 className={classes.loginTitle}>Make a User here!</h2>
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
            Register
          </Button>
        </form>
      </main>
      <footer>
        <></>
      </footer>
    </Container>
  );
}
