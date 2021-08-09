/* eslint-disable react/jsx-props-no-spreading */

import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';

interface AuthComponentProps {
  authRole: 'USER' | 'ADMIN';
  errorComponent?: JSX.Element;
  children: JSX.Element | JSX.Element[] | string;
}

function AuthComponent(props: AuthComponentProps): JSX.Element {
  const {
    children,
    authRole,
    errorComponent = (
      <>
        <header>
          <h2>404</h2>
        </header>
        <main>Not Found... Redirecting...</main>
      </>
    ),
  } = props;

  const { userInfo } = useContext(AuthContext);
  const history = useHistory();

  const authVal = (r: typeof authRole) => {
    switch (r) {
      case 'ADMIN':
        return 2;
      case 'USER':
        return 1;
      default:
        return 0;
    }
  };

  const isAuthed =
    userInfo !== null && authVal(authRole) <= authVal(userInfo.role);

  useEffect(() => {
    if (!isAuthed) {
      const t = setTimeout(() => {
        history.push('/');
      }, 0);
      return () => {
        clearTimeout(t);
      };
    }
    return () => {
      //
    };
  });
  return <>{isAuthed ? children : errorComponent}</>;
}

export default AuthComponent;
