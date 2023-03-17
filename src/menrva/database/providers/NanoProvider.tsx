import React, { createContext } from 'react';
import Nano, { ServerScope } from 'nano';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const NanoContext = createContext<ServerScope>(undefined!);

// eslint-disable-next-line react/prop-types
const NanoProvider = ({ children }) => {
  const nano = Nano('http://localhost:5984') as ServerScope;
  return <NanoContext.Provider value={nano}>{children}</NanoContext.Provider>;
};

// eslint-disable-next-line react/prop-types
const NanoConsumer = ({ children }) => {
  return <NanoContext.Consumer>{children}</NanoContext.Consumer>;
};

export { NanoProvider, NanoConsumer };
