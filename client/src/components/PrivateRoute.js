// Purpose -> replace the <Route /> in our routing setup for any routes that should be protected.

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
/*
  Private Route rules:
  1. It has the same API as <Route />.
  2. It renders a <Route /> and passes all the props through to it.
  3. It checks if the user is authenticated, if they are, it renders the “component” prop. If not, it redirects the user to /login.
*/

const PrivateRoute = ({ component: Component, ...rest }) => {
  // fancy JS to pull the component prop out of the props obj
  // use the ...rest operator
  // rename component to Component
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem('token')) {
          // user is authed
          return <Component {...props} />;
        } else {
          // user not authed - redirect to /login
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};




export default PrivateRoute;

// rest operator does this:
// const someObj = {
//   prop1: 'a',
//   prop2: 'b',
//   prop3: 'c',
//   prop4: 'd',
//   prop5: 'e'
// };

// // destructure someObj to pull out prop2
// // use the ...rest operator to keep the other properties in a new object
// const { prop2, ...rest } = someObj;
// console.log(someObj); // ==> original obj with all properties
// console.log(rest); // ==> original obj with all properties except prop2
// console.log(prop2); // ==> 'b'
