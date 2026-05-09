import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const TestingInputSheet = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './testingInputSheet')
);
const TestingReport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './testingReport')
);


const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/testing`} />
        <Route
              path={`${match.url}/inputsheet`}
              render={(props) => <TestingInputSheet {...props} />}
            />
         <Route
              path={`${match.url}/report`}
              render={(props) => <TestingReport {...props} />}
            />
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
  export default Master;