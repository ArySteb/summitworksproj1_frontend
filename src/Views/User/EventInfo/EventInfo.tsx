import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {
  Button,
  CircularProgress,
  Container,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core';
import { readEventById } from '../../../Api/events';
import { useQuery } from '../../../Utils/UseQuery';
import { GetEventData } from '../../../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: theme.spacing(2),
      textAlign: 'center',
      minHeight: '3rem',
    },
    desc: {
      minHeight: '11rem',
    },
    img: {
      maxWidth: '100%',
      maxHeight: '100%',
    },
    ta: {
      width: '100%',
      textAlign: 'center',
      margin: theme.spacing(2),
    },
  })
);

export default function EventInfo(): JSX.Element {
  const qid = useQuery().get('event');
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState<GetEventData | null>(null);

  useEffect(() => {
    setLoading(true);
    readEventById(Number(qid))
      .then((res) => {
        setEvent(res);
      })
      .catch(() => {
        setEvent(null);
      })
      .finally(() => setLoading(false));
  }, [qid]);

  const url = useRouteMatch(['/user', '/admin/user_view'])?.url;

  const button = event?.allow_reg ? (
    <Button
      variant="outlined"
      className={classes.ta}
      component={Link}
      to={url ? `${url}/register?event=${qid}` : `/`}
    >
      Register
    </Button>
  ) : (
    <></>
  );

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }
  if (event === null) {
    return (
      <Container>
        <h1>
          Error Loading Data... <Link to="/">go back</Link>
        </h1>
      </Container>
    );
  }
  return (
    <Container>
      <h2>
        Event Registration Detail : <span>{event.name}</span>
      </h2>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            Event Name
            <div>{event.name}</div>
          </Paper>
          <Paper className={classes.paper}>
            Category
            <div>{event.category}</div>
          </Paper>
          <Paper className={classes.paper}>
            Location
            <div>{event.location}</div>
          </Paper>
          <Paper className={classes.paper}>
            Start Date &amp; Time
            <div>
              {event.start_date} at {event.start_time}
            </div>
          </Paper>
          <Paper className={classes.paper}>
            End Date &amp; Time
            <div>
              {event.end_date} at {event.end_time}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={`${classes.paper} ${classes.desc}`}>
            Event Description
            <div>{event.desc}</div>
          </Paper>
          <Paper className={classes.paper}>
            Adult Ticket Prices
            <div>&#36;{event.adult_price}</div>
          </Paper>
          <Paper className={classes.paper}>
            Child Ticket Prices
            <div>&#36;{event.child_price}</div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <img src={event.img_url} className={classes.img} alt="" />
        </Grid>
      </Grid>
      {button}
      <Button component={Link} to="/" variant="outlined" className={classes.ta}>
        Go Back (Cannot Register.)
      </Button>
    </Container>
  );
}
