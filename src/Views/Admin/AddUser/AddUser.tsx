import {
  Button,
  Container,
  createStyles,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
} from '@material-ui/core';
import axios from 'axios';
import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import type { PostUserData } from '../../../types';
import { ReduxAction } from '../EditUser';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      textAlign: 'center',
    },
    field: {
      margin: theme.spacing(2),
    },
  })
);

function reducer(user: PostUserData, action: ReduxAction): PostUserData {
  switch (action.type) {
    case 'change':
      if (action.field) {
        return {
          ...user,
          [action.field]: action.data,
        };
      }
      return user;
    default:
      return user;
  }
}

export default function AddUser(): JSX.Element {
  const classes = useStyles();
  const history = useHistory();

  const [user, dispatch] = useReducer<typeof reducer>(reducer, {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'USER',
  });

  const changeField = (
    field: keyof PostUserData,
    data: PostUserData[keyof PostUserData]
  ) => dispatch({ type: 'change', field, data });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    axios
      .post('/api/users', user)
      .then(() => {
        history.push(`/admin`);
      })
      .catch(() => {
        // nothing
      });
  };

  return (
    <Container>
      <header>
        <h2 className={classes.title}>Add a new user!</h2>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <TextField
            className={classes.field}
            placeholder="First Name"
            type="text"
            value={user.first_name}
            onChange={(e) => changeField('first_name', e.target.value)}
          />
          <br />
          <TextField
            className={classes.field}
            placeholder="Last Name"
            type="text"
            value={user.last_name}
            onChange={(e) => changeField('last_name', e.target.value)}
          />
          <br />
          <TextField
            className={classes.field}
            placeholder="Email"
            type="text"
            value={user.email}
            onChange={(e) => changeField('email', e.target.value)}
          />
          <br />
          <TextField
            className={classes.field}
            placeholder="Password"
            type="password"
            value={user.password}
            onChange={(e) => changeField('password', e.target.value)}
          />
          <br />
          <Select
            className={classes.field}
            value={user.role}
            onChange={(e) =>
              changeField('role', e.target.value as PostUserData['role'])
            }
            label="Role"
          >
            <MenuItem value="ADMIN">Admin</MenuItem>
            <MenuItem value="USER">User</MenuItem>
          </Select>
          <br />
          <Button className={classes.field} type="submit">
            Create User
          </Button>
        </form>
      </main>
    </Container>
  );
}
