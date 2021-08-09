import React, { useReducer } from 'react';
import {
  Button,
  Checkbox,
  Container,
  createStyles,
  FormControlLabel,
  makeStyles,
  MenuItem,
  TextField,
  Theme,
  InputAdornment,
} from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import type { PostEventData } from '../../../types';

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

type ReduxAction = {
  type: string;
  data?: unknown;
  field?: string;
};

function reducer(event: PostEventData, action: ReduxAction): PostEventData {
  switch (action.type) {
    case 'change':
      if (action.field) {
        return {
          ...event,
          [action.field]: action.data,
        };
      }
      return event;
    default:
      return event;
  }
}

export default function AddEvent(): JSX.Element {
  const classes = useStyles();
  const history = useHistory();

  const [event, dispatch] = useReducer(reducer, {
    adult_price: 0,
    allow_reg: true,
    category: 'conference',
    child_price: 0,
    desc: '',
    end_date: '1970-01-01',
    end_time: '00:00',
    img_url: '',
    location: '',
    name: '',
    start_date: '1970-01-01',
    start_time: '00:00',
  });

  const changeField = (field: string, data: unknown) =>
    dispatch({ type: 'change', field, data });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    axios
      .post('/api/events', event)
      .then(() => {
        history.push(`/admin/event_management`);
      })
      .catch(() => {
        // nothing
      });
  };

  return (
    <Container>
      <header>
        <h2 className={classes.title}>Add a new event!</h2>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <TextField
            className={classes.field}
            label="Name"
            type="text"
            value={event.name}
            onChange={(e) => changeField('name', e.target.value)}
          />
          <br />
          <TextField
            select
            className={classes.field}
            value={event.category}
            onChange={(e) => changeField('category', e.target.value)}
            label="Category"
          >
            <MenuItem value="conference">Conference</MenuItem>
            <MenuItem value="seminar">Seminar</MenuItem>
            <MenuItem value="presentation">Presentation</MenuItem>
          </TextField>
          <TextField
            className={classes.field}
            label="Description"
            type="text"
            value={event.desc}
            onChange={(e) => changeField('desc', e.target.value)}
          />
          <br />
          <TextField
            className={classes.field}
            label="Start Date"
            type="date"
            value={event.start_date}
            onChange={(e) => changeField('start_date', e.target.value)}
          />
          <br />
          <TextField
            className={classes.field}
            type="date"
            label="End Date"
            value={event.end_date}
            onChange={(e) => changeField('end_date', e.target.value)}
          />
          <br />

          <TextField
            className={classes.field}
            label="Start Time"
            type="time"
            value={event.start_time}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => changeField('start_time', e.target.value)}
          />

          <br />

          <TextField
            className={classes.field}
            label="End Time"
            type="time"
            value={event.end_time}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => changeField('end_time', e.target.value)}
          />

          <br />

          <FormControlLabel
            control={
              <Checkbox
                className={classes.field}
                checked={event.allow_reg}
                onChange={(e) => changeField('allow_reg', e.target.checked)}
              />
            }
            label="Allow Registration"
          />

          <br />

          <TextField
            className={classes.field}
            label="Image URL"
            type="text"
            value={event.img_url}
            onChange={(e) => changeField('img_url', e.target.value)}
          />

          <br />

          <TextField
            className={classes.field}
            label="Adult Price"
            type="number"
            value={event.adult_price}
            onChange={(e) =>
              changeField('adult_price', Math.max(0, Number(e.target.value)))
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />

          <br />

          <TextField
            className={classes.field}
            label="Child Price"
            type="number"
            value={event.child_price}
            onChange={(e) =>
              changeField('child_price', Math.max(0, Number(e.target.value)))
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />

          <br />
          <Button className={classes.field} type="submit">
            Create Event
          </Button>
        </form>
      </main>
    </Container>
  );
}
