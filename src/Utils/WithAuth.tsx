/* eslint-disable react/jsx-props-no-spreading */

import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';

export const withAuth: <T>(
  role: 'ADMIN' | 'USER'
) => (
  WrappedComponent: (props: T) => JSX.Element
) => (props: T) => JSX.Element = (role) => (WrappedComponent) => (props) => {
  const { userInfo } = useContext(AuthContext);
  const history = useHistory();

  const authVal = (r: typeof role) => {
    switch (r) {
      case 'ADMIN':
        return 2;
      case 'USER':
        return 1;
      default:
        return 0;
    }
  };

  const isAuthed = userInfo !== null && authVal(role) <= authVal(userInfo.role);

  useEffect(() => {
    if (!isAuthed) {
      const t = setTimeout(() => {
        history.push('/');
      }, 3000);
    }
  }, [isAuthed]);

  if (!isAuthed) {
    return (
      <>
        <header>
          <h2>404</h2>
        </header>
        <main>Not Found... Redirecting...</main>
      </>
    );
  }
  return <WrappedComponent {...props} />;
};

function AuthComponent(props: {
  children: JSX.Element | JSX.Element | string;
  authRole: 'USER' | 'ADMIN';
}) {
  const { children, authRole } = props;

  const Authed = withAuth(authRole)(() => <>{children}</>);

  return <Authed />;
}

export default AuthComponent;
