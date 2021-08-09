import React, { useEffect, useState } from 'react';
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
import { Link, useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import { GetEventData } from '../../../types';

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

export default function EventManagement(): JSX.Element {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<GetEventData[]>([]);
  const { url } = useRouteMatch();

  const fetchData = () => {
    setLoading(true);
    axios.get<GetEventData[]>('/api/events').then((res) => {
      setEvents(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  function deleteById(id: number): void {
    axios
      .delete(`/api/events/${id}`)
      .then(() => {
        fetchData();
      })
      .catch(() => {
        // console.log('[Error] error deleting event', id);
      });
  }

  return (
    <Container>
      <header>
        <h2 className={classes.title}>Event Management</h2>
      </header>
      <main>
        <Toolbar>
          <Button
            className={classes.addButton}
            component={Link}
            to={`${url}/add`}
          >
            Add New Event
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
                <TableCell className={classes.columnTitle}>Event</TableCell>
                <TableCell className={classes.columnTitle}>Category</TableCell>
                <TableCell className={classes.columnTitle}>Location</TableCell>
                <TableCell className={classes.columnTitle}>
                  Start Date
                </TableCell>
                <TableCell className={classes.columnTitle}>End Date</TableCell>
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
                events.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="">{e.name ?? '<None>'}</TableCell>
                    <TableCell className="">{e.category ?? '<None>'}</TableCell>
                    <TableCell className="">{e.location ?? '<None>'}</TableCell>
                    <TableCell className="">
                      {e.start_date ?? '<None>'}
                    </TableCell>
                    <TableCell className="">{e.end_date}</TableCell>
                    <TableCell className={classes.tableButton}>
                      <Button component={Link} to={`${url}/edit?id=${e.id}`}>
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell className={classes.tableButton}>
                      <Button onClick={() => deleteById(e.id)}>Delete</Button>
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
