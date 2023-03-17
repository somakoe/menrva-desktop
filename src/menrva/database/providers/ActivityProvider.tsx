import React, { createContext, ReactNode, useEffect } from 'react';
import { useNanoDatabaseChanges } from '@database/hooks/nano-hooks';
import { useList } from 'react-use';

export type Change = {
  _id: string;
  doc: never;
};

export const ActivityContext = createContext([]);

const ActivityProvider = ({
  children,
  database,
  fastChanges,
}: {
  children: JSX.Element;
  database: string;
  fastChanges: boolean;
}) => {
  const changesReader = useNanoDatabaseChanges(database);
  const [list, { upsert }] = useList([]);

  useEffect(() => {
    const changeListener = async () => {
      changesReader
        .start({
          fastChanges,
          includeDocs: true,
          selector: {
            _id: {
              // Exclude design documents
              $not: {
                $regex: '.*_design/.*',
              },
            },
          },
        })
        .on('change', (change: Change) => {
          upsert(
            // eslint-disable-next-line no-underscore-dangle
            (a: Change, b: Change) => a._id === b._id,
            change.doc
          );
        })
        .on('batch', (b) => {
          // console.log(
          //   `a batch of ${b.length} changes has arrived for ${database}`
          // );
        })
        .on('error', (e) => {
          // console.error('error', e);
        });
    };
    changeListener();

    return () => {
      changesReader.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ActivityContext.Provider value={list}>{children}</ActivityContext.Provider>
  );
};

const ActivityConsumer = ({
  children,
}: {
  children: (value: never[]) => ReactNode;
}) => {
  return <ActivityContext.Consumer>{children}</ActivityContext.Consumer>;
};

export { ActivityProvider, ActivityConsumer };
