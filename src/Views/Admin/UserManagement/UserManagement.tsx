import {
  Button,
  Container,
  createStyles,
  LinearProgress,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
} from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import type { GetUserData } from '../../../types';

const useStyles = makeStyles(() =>
  createStyles({
    columnTitle: {
      borderRight: 'solid 1px black',
    },
    tableButton: {
      textAlign: 'center',
    },
    title: {
      textAlign: 'center',
    },
    addButton: {
      // marginRight: theme.spacing(3),
    },
    refreshButton: {
      marginLeft: 'auto',
    },
  })
);

export default function UserManagement(): JSX.Element {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<GetUserData[]>([]);
  const { url } = useRouteMatch();

  const fetchData = () => {
    setLoading(true);
    axios.get<GetUserData[]>('/api/users').then((res) => {
      setUsers(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  function deleteById(id: number): void {
    axios
      .delete(`/api/users/${id}`)
      .then(() => {
        fetchData();
      })
      .catch(() => {
        // console.log('[Error] error deleting user', id);
      });
  }

  return (
    <Container>
      <header>
        <h2 className={classes.title}>User Management</h2>
      </header>
      <main>
        <Toolbar>
          <Button
            className={classes.addButton}
            component={Link}
            to={`${url}/add`}
          >
            Add New User
          </Button>
          <Button
            variant="outlined"
            className={classes.refreshButton}
            endIcon={<span className="material-icons">refresh</span>}
            onClick={fetchData}
          >
            Refresh
          </Button>
        </Toolbar>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.columnTitle}>
                  First Name
                </TableCell>
                <TableCell className={classes.columnTitle}>Last Name</TableCell>
                <TableCell className={classes.columnTitle}>Email</TableCell>
                <TableCell className={classes.columnTitle}>Role</TableCell>
                <TableCell className={classes.columnTitle} />
                <TableCell className={classes.columnTitle} />
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <LinearProgress />
                  </TableCell>
                </TableRow>
              ) : (
                users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="">
                      {u.first_name ?? '<None>'}
                    </TableCell>
                    <TableCell className="">
                      {u.last_name ?? '<None>'}
                    </TableCell>
                    <TableCell className="">{u.email ?? '<None>'}</TableCell>
                    <TableCell className="">{u.role ?? '<None>'}</TableCell>
                    <TableCell className={classes.tableButton}>
                      <Button component={Link} to={`${url}/edit?id=${u.id}`}>
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell className={classes.tableButton}>
                      <Button onClick={() => deleteById(u.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </Container>
  );
}
