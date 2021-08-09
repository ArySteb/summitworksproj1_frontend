import {
  Button,
  Checkbox,
  Container,
  createStyles,
  FormControlLabel,
  InputAdornment,
  makeStyles,
  MenuItem,
  TextField,
  Theme,
} from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import type { GetEventData, PostEventData } from '../../../types';
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
      data: PostEventData[keyof PostEventData];
      field: keyof PostEventData;
    }
  | {
      type: 'init';
      data: Partial<PostEventData>;
    };

function reducer(user: PostEventData, action: ReduxAction): PostEventData {
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

  useEffect(() => {
    axios
      .get<GetEventData>(`/api/events/${id}`)
      .then((res) => {
        const {
          adult_price,
          allow_reg,
          category,
          child_price,
          desc,
          end_date,
          end_time,
          img_url,
          location,
          name,
          start_date,
          start_time,
        } = res.data;
        // console.log(res.data);
        dispatch({
          type: 'init',
          data: {
            adult_price,
            allow_reg,
            category,
            child_price,
            desc,
            end_date,
            start_time,
            end_time,
            img_url,
            location,
            name,
            start_date,
          },
        });
        // console.log('');
      })
      .catch(() => {
        // console.log(e);
        history.push('/admin');
      });
  }, [history, id]);

  const changeField = (
    field: keyof PostEventData,
    data: PostEventData[keyof PostEventData]
  ) => dispatch({ type: 'change', field, data });

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>): void => {
    ev.preventDefault();
    axios
      .put(`/api/events/${id}`, event)
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
        <h2 className={classes.title}>Edit Event!</h2>
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
            Submit Changes
          </Button>
        </form>
      </main>
    </Container>
  );
}
