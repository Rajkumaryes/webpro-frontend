import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const OneonOneMeeting = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './1on1meeting')
);



const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/meeting`} />
        <Route
              path={`${match.url}/1on1meeting`}
              render={(props) => <OneonOneMeeting {...props} />}
            />
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
  export default Master;