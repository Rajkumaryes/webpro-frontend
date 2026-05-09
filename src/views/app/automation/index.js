import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const AutomationDashboard = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './automationDashboard')
);
const AutomationImport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './automationImport')
);


const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/automation`} />
        <Route
              path={`${match.url}/dashboard`}
              render={(props) => <AutomationDashboard {...props} />}
            />
         <Route
              path={`${match.url}/import`}
              render={(props) => <AutomationImport {...props} />}
            />
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
  export default Master;