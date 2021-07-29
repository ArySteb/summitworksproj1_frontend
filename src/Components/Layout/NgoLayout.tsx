import { AppBar, Toolbar } from '@material-ui/core';
import React from 'react';

interface LayoutProps {
  children? : String | JSX.Element;
}

export default function NgoLayout(props: LayoutProps): JSX.Element {
  const { children } = props;



  return <><AppBar><Toolbar>app bar</Toolbar></AppBar><Toolbar /> {children} </>;
}