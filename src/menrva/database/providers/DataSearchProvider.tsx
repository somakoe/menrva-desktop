import { load, search } from '@database/hooks/mango-fhir-queries';
import { useNanoDatabase } from '@database/hooks/nano-hooks';
import { DomainResource } from 'fhir-typescript-models';
import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';
import usePromise from 'react-use-promise';

export const DataSearchContext = createContext<
  [DomainResource[], Dispatch<SetStateAction<string>>]
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
>(undefined!);

const DataSearchProvider = ({
  children,
  dbName,
}: {
  children: JSX.Element;
  dbName: string;
}) => {
  const database = useNanoDatabase(dbName);

  const [records, setData] = useState<DomainResource[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  usePromise(async () => {
    let response = null;
    if (searchQuery === '') response = await database.query(load);
    else response = await database.query(search(searchQuery));
    setData(response);
  }, [searchQuery]);

  return (
    <DataSearchContext.Provider value={[records, setSearchQuery]}>
      {children}
    </DataSearchContext.Provider>
  );
};

// eslint-disable-next-line react/prop-types
const DataSearchConsumer = ({ children }) => {
  return <DataSearchContext.Consumer>{children}</DataSearchContext.Consumer>;
};

export { DataSearchProvider, DataSearchConsumer };
