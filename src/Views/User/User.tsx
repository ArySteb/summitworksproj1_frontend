import { CircularProgress, Container, Grid } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { EventBox } from '../../Components/EventBox';
import { GetEventData } from '../../types';

export default function User(): JSX.Element {
  const [events, setEvents] = useState<GetEventData[]>([]);

  const [isloading, setIsLoading] = useState(true);

  const fetchEvents = () => {
    setIsLoading(true);
    axios.get<GetEventData[]>('/api/events').then((es) => {
      setEvents(es.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (isloading) return <CircularProgress />;

  return (
    <Container>
      <Grid container direction="row">
        {events.map((ev) => {
          return (
            <Grid item xs={3} key={ev.id}>
              <EventBox
                img_url={ev.img_url}
                name={ev.name}
                desc={ev.desc}
                event_id={ev.id}
              />
            </Grid>
          );
        })}
      </Grid>
      {events.length === 0 ? <div>nothing!</div> : <></>}
    </Container>
  );
}
