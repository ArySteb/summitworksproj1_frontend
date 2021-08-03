import {
  Button,
  CardActions,
  Container,
  createStyles,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
} from '@material-ui/core';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import React, { useContext, useReducer } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { reduceEachLeadingCommentRange } from 'typescript';
import { AuthContext } from '../../../Contexts/AuthContext';

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

type UserData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN';
};

function reducer(
  user: UserData,
  action: {
    type: string;
    data?: unknown;
    field?: string;
  }
): UserData {
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

export default function AddUser() {
  const classes = useStyles();
  const { url } = useRouteMatch();
  const history = useHistory();

  const [user, dispatch] = useReducer(reducer, {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'USER',
  });

  const changeField = (field: string, data: unknown) =>
    dispatch({ type: 'change', field, data });

  const handleSubmit = (event: any): void => {
    event.preventDefault();
    axios
      .post('/api/users', user)
      .then((res) => {
        history.push(`/admin`);
      })
      .catch(console.log);
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
            onChange={(e) => changeField('role', e.target.value)}
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
