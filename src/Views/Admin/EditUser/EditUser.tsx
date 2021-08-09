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
import React, { useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import type { GetUserData, PostUserData } from '../../../types';
import { useQuery } from '../../../Utils/UseQuery';

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

export type ReduxAction =
  | {
      type: 'change';
      data: PostUserData[keyof PostUserData];
      field: keyof PostUserData;
    }
  | {
      type: 'init';
      data: Partial<PostUserData>;
    };

function reducer(user: PostUserData, action: ReduxAction): PostUserData {
  switch (action.type) {
    case 'change':
      return {
        ...user,
        [action.field]: action.data,
      };
    case 'init':
      return {
        ...user,
        ...action.data,
      };
    default:
      return { ...user };
  }
}

export default function EditUser(): JSX.Element {
  const classes = useStyles();
  const query = useQuery();
  const id = query.get('id');

  const history = useHistory();

  const [user, dispatch] = useReducer(reducer, {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'USER',
  });

  useEffect(() => {
    axios
      .get<GetUserData>(`/api/users/${id}`)
      .then((res) => {
        const { first_name, last_name, email, role } = res.data;
        dispatch({
          type: 'init',
          data: { first_name, last_name, email, role },
        });
        // console.log('');
      })
      .catch(() => {
        history.push('/admin');
      });
  }, [history, id]);

  const changeField = (
    field: keyof PostUserData,
    data: PostUserData[keyof PostUserData]
  ) => dispatch({ type: 'change', field, data });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    axios
      .put(`/api/users/${id}`, user)
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
        <h2 className={classes.title}>Edit user!</h2>
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
            placeholder="New Password"
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
            Submit Changes
          </Button>
        </form>
      </main>
    </Container>
  );
}
