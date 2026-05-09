import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const RADM = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './radm')
);
const RATP = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './ratp')
);
const ErrorSheet = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './errorsheet')
);

const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/radm`} />
      
            <Route
              path={`${match.url}/radm`}
              render={(props) => <RADM {...props} />}
            />
            <Route
              path={`${match.url}/ratp`}
              render={(props) => <RATP {...props} />}
            />
             <Route
              path={`${match.url}/errorsheet`}
              render={(props) => <ErrorSheet {...props} />}
            />
           
         
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
  export default Master;