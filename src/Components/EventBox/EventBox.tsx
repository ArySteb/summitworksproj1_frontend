import React from 'react';

import {
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      margin: theme.spacing(3),
      width: '200px',
    },
    image: {
      width: '200px',
      height: '200px',
    },
    name: {
      fontWeight: 'bold',
      textTransform: 'capitalize',
      textAlign: 'center',
    },
    desc: {
      textAlign: 'center',
    },
  })
);

export default function EventBox(props: {
  img_url: string;
  name: string;
  desc: string;
  event_id: number;
}) {
  const classes = useStyles();

  const {
    img_url = 'https://ngoeventimages.s3.us-east-2.amazonaws.com/event1.png',
    name,
    desc,
    event_id,
  } = props;

  return (
    <div className={classes.box}>
      <Link to={`/events/register?event=${event_id}`}>
        <img alt={name} src={img_url} className={classes.image} />
      </Link>
      <div className={classes.name}>{name}</div>
      <div className={classes.desc}>{desc}</div>
    </div>
  );
}
