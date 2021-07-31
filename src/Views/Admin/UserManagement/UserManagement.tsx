import {
  CircularProgress,
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
  Theme,
} from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    columnTitle: {
      width: '100px',
      borderRight: 'solid 1px black',
    },
  })
);

export default function UserManagement(): JSX.Element {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:9090/users').then((res) => {
      setLoading(false);
      console.log(res);
    });
  }, []);

  return (
    <Container>
      <header>
        <h2>User Management</h2>
      </header>
      <main>
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
              <TableRow>
                {loading ? (
                  <TableCell colSpan={6}>
                    <LinearProgress />
                  </TableCell>
                ) : (
                  <></>
                )}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </Container>
  );
}
