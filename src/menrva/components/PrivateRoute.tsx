import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component, isAuthenticated, ...rest }: any) => {
  const routeComponent = (props: any) =>
    isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: '/' }} />
    );
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...rest} render={routeComponent} />;
};

export default PrivateRoute;
