import { useNanoDatabase } from '@database/hooks/nano-hooks';
import { DomainResource } from 'fhir-typescript-models';
import nano from 'nano';
import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';
import usePromise from 'react-use-promise';

export type ViewRow<T extends DomainResource> = {
  id: string;
  key: string;
  value: T;
  doc?: (T & nano.Document) | undefined;
};

export const ViewDataContext = createContext<
  [ViewRow<DomainResource>[], Dispatch<SetStateAction<string>>]
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
>(undefined!);

const ViewDataProvider = <T extends DomainResource>({
  children,
  dbName,
  viewDesign,
  viewName,
}: {
  children: JSX.Element;
  dbName: string;
  viewDesign: string;
  viewName: string;
}) => {
  const database = useNanoDatabase(dbName);

  const [records, setData] = useState<ViewRow<T>[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  usePromise(async () => {
    let response = null;
    if (searchQuery === '')
      response = await database.viewAll(viewDesign, viewName);
    else
      response = await database.viewSearch(viewDesign, viewName, searchQuery);
    setData(response);
  }, [searchQuery]);

  return (
    <ViewDataContext.Provider value={[records, setSearchQuery]}>
      {children}
    </ViewDataContext.Provider>
  );
};

// eslint-disable-next-line react/prop-types
const ViewDataConsumer = ({ children }) => {
  return <ViewDataContext.Consumer>{children}</ViewDataContext.Consumer>;
};

export { ViewDataProvider, ViewDataConsumer };
