import React from 'react';
import {
  ActivityConsumer,
  ActivityProvider,
} from '@database/providers/ActivityProvider';

import { Notification } from '@database/models/types';

const Info = ({ notification }: { notification: Notification }) => (
  <>
    <div className="container-fluid padding-25 sm-padding-10">
      <div
        className="card social-card status w-100 bg-primary"
        data-social="item"
      >
        <div
          className="circle bg-white"
          data-toggle="tooltip"
          title=""
          data-container="body"
          data-original-title="Label"
        />
        <h5 className="text-white">
          <span className="text-uppercase bold">{notification.sender}</span>{' '}
          sent a notification.
          <span className="hint-text"> few seconds ago</span>
        </h5>
        <h2 className="text-white text-ellipsis">{notification.message}</h2>
      </div>
    </div>
    <div className="clearfix" />
  </>
);

const Infobar = () => {
  return (
    <ActivityProvider database="notifications">
      <ActivityConsumer>
        {(changes: Notification[]) => {
          if (changes.length > 0)
            return <Info notification={changes[changes.length - 1]} />;
          return <></>;
        }}
      </ActivityConsumer>
    </ActivityProvider>
  );
};

export default Infobar;
