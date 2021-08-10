import {
  Button,
  Container,
  createStyles,
  makeStyles,
  TextField,
  CircularProgress,
  Theme,
} from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthContext';
import type { GetEventData, TicketData } from '../../../types';
import { useQuery } from '../../../Utils/UseQuery';
import { ReduxAction } from '../../Admin/EditUser';
import { errReducer } from '../../Admin/EditUser/EditUser';

const phoneNumberRegex =
  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
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

function reducer(
  user: TicketData,
  action: ReduxAction<TicketData>
): TicketData {
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
  const event_id = Number(useQuery().get('event') ?? -1);
  const { userInfo } = useContext(AuthContext);
  const user_id = userInfo?.id ?? -1;

  const [loading, setLoading] = useState(true);
  const [eventName, setEventName] = useState('');
  const [adultPrice, setAdultPrice] = useState(0);
  const [childPrice, setChildPrice] = useState(0);

  const [ticket, dispatch] = useReducer<typeof reducer>(reducer, {
    address: '',
    adult_qty: 0,
    child_qty: 0,
    contact_number: '',
    email: '',
    eventId: event_id,
    first_name: '',
    last_name: '',
    userId: user_id,
  });
  const [errs, errDispatch] = useReducer(
    (a: Record<keyof TicketData, boolean>, b: [keyof TicketData, boolean]) =>
      errReducer<TicketData>(a, b),
    {
      address: true,
      adult_qty: true,
      child_qty: true,
      contact_number: true,
      email: true,
      first_name: true,
      last_name: true,
      eventId: false,
      userId: false,
    }
  );

  useEffect(() => {
    setLoading(true);
    axios.get<GetEventData>(`/api/events/${event_id}`).then((res) => {
      setEventName(res.data.name);
      setChildPrice(res.data.child_price);
      setAdultPrice(res.data.adult_price);
      setLoading(false);
    });
  }, [event_id, user_id]);

  if (userInfo === null) {
    return (
      <Container>
        <h1>
          You&apos;re not in a valid user account! (If you are main admin,
          switch to a created account)
        </h1>
        <Button className={classes.field} component={Link} to="/">
          Cancel
        </Button>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  const changeField = (
    field: keyof TicketData,
    data: TicketData[keyof TicketData]
  ) => dispatch({ type: 'change', field, data });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (Object.values(errs).some((x) => x)) return;
    axios
      .post('/api/tickets', {
        ...ticket,
      })
      .then(() => {
        history.push(`/`);
      })
      .catch(() => {
        // nothing
      });
  };

  return (
    <Container>
      <header>
        <h2 className={classes.title}>
          Register for <span>{eventName}</span>!
        </h2>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <TextField
            error={errs.first_name}
            helperText={errs.first_name ? 'field cannot be blank' : ''}
            className={classes.field}
            placeholder="First Name"
            type="text"
            value={ticket.first_name}
            onChange={(e) => {
              changeField('first_name', e.target.value);
              errDispatch(['first_name', !e.target.value.trim()]);
            }}
          />
          <br />
          <TextField
            error={errs.last_name}
            helperText={errs.last_name ? 'field cannot be blank' : ''}
            className={classes.field}
            placeholder="Last Name"
            type="text"
            value={ticket.last_name}
            onChange={(e) => {
              changeField('last_name', e.target.value);
              errDispatch(['last_name', !e.target.value.trim()]);
            }}
          />
          <br />
          <TextField
            error={errs.email}
            helperText={errs.email ? 'field cannot be blank' : ''}
            className={classes.field}
            placeholder="Email"
            type="email"
            value={ticket.email}
            onChange={(e) => {
              changeField('email', e.target.value);
              errDispatch(['email', !e.target.value.trim()]);
            }}
          />
          <br />
          <TextField
            error={errs.contact_number}
            helperText={
              errs.contact_number ? 'invalid phone number' : 'phone number'
            }
            className={classes.field}
            type="text"
            value={ticket.contact_number}
            onChange={(e) => {
              changeField('contact_number', e.target.value);
              errDispatch([
                'contact_number',
                !e.target.value.match(phoneNumberRegex),
              ]);
            }}
          />
          <br />
          <TextField
            error={errs.address}
            helperText={errs.address ? 'field cannot be blank' : ''}
            className={classes.field}
            placeholder="Address"
            type="text"
            value={ticket.address}
            onChange={(e) => {
              changeField('address', e.target.value);
              errDispatch(['address', !e.target.value.trim()]);
            }}
          />
          <br />
          <TextField
            error={errs.adult_qty}
            helperText={`${
              errs.adult_qty
                ? 'you must order at least one ticket'
                : 'quantity of adult tickets'
            } (Price: $${adultPrice})`}
            className={classes.field}
            type="number"
            value={ticket.adult_qty}
            onChange={(e) => {
              changeField('adult_qty', Number(e.target.value));
              const isErrorFul =
                Number(e.target.value) + ticket.adult_qty === 0;
              errDispatch(['child_qty', isErrorFul]);
              errDispatch(['adult_qty', isErrorFul]);
            }}
          />
          <br />
          <TextField
            error={errs.child_qty}
            helperText={`${
              errs.child_qty
                ? 'you must order at least one ticket'
                : 'quantity of child tickets'
            } (Price: $${childPrice})`}
            className={classes.field}
            type="number"
            value={ticket.child_qty}
            onChange={(e) => {
              changeField('child_qty', Number(e.target.value));
              const isErrorFul =
                Number(e.target.value) + ticket.adult_qty === 0;
              errDispatch(['child_qty', isErrorFul]);
              errDispatch(['adult_qty', isErrorFul]);
            }}
          />
          <br />
          <Button className={classes.field} type="submit">
            Buy Ticket
          </Button>
          <Button className={classes.field} component={Link} to="/">
            Cancel
          </Button>
        </form>
      </main>
    </Container>
  );
}
