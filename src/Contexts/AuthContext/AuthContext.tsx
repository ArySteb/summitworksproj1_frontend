import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const AuthContext = React.createContext<{
  userInfo: UserInfo;
  refresh: (instant?: boolean) => void;
}>({
  userInfo: null,
  refresh: () => {
    //
  },
});

type UserInfo = {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  role: 'USER' | 'ADMIN';
} | null;

export default function AuthContextProvider(props: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element {
  const { children } = props;
  const [userInfo, setUserInfo] = useState<UserInfo>(null);

  const refresh = (): Promise<void> =>
    axios
      .get<UserInfo>('/api/session')
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch(() => {
        setUserInfo(null);
        axios.delete('/api/session').catch(() => {
          //
        });
      });

  useEffect(() => {
    refresh();
  }, []);

  return (
    <AuthContext.Provider value={{ userInfo, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}
