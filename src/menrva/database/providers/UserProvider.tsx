import React, { createContext, ReactNode, useState } from 'react';
import usePromise from 'react-use-promise';
import { useNanoUser } from '@database/hooks/nano-hooks';

import Login from '@pages/Login';
import { Practitioner } from 'fhir-typescript-models';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const UserContext = createContext<Practitioner>(undefined!);

const UserProvider = ({ children }: { children: JSX.Element }) => {
  const auth = useNanoUser();
  const [loggedIn, setLoggedIn] = useState(false);

  const [result, error, state] = usePromise(auth.isLoggedIn(), [loggedIn]);

  if (state !== 'resolved') {
    return <p>Loading</p>;
  }

  if (error !== undefined) {
    return <p>Error</p>;
  }

  if (state === 'resolved' && (result === null || result === undefined)) {
    return <Login setLoggedIn={setLoggedIn} auth={auth} />;
  }

  const user: Practitioner = result;
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

const UserConsumer = ({
  children,
}: {
  children: (value: Practitioner | null | undefined) => ReactNode;
}) => {
  return <UserContext.Consumer>{children}</UserContext.Consumer>;
};

export { UserProvider, UserConsumer };
