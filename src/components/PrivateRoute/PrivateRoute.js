/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
// eslint-disable-next-line import/no-cycle
import { UserContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
  const [loggedInUser] = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedInUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
