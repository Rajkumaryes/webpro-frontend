import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Kfrreport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './report')
);
const Budgeted_hc = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './budgeted-hc')
);
const Workingdays = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './working-days')
);
const Actualhc = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './actual-hc')
);
const Totalefforts = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './total-efforts')
);
const Totaleffortsnon = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './total-efforts-non')
);
const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/kfr-report`} />
        <Route
              path={`${match.url}/report`}
              render={(props) => <Kfrreport {...props} />}
            />
            <Route
              path={`${match.url}/budgeted-hc`}
              render={(props) => <Budgeted_hc {...props} />}
            />
           <Route
              path={`${match.url}/working-days`}
              render={(props) => <Workingdays {...props} />}
            />
            <Route
              path={`${match.url}/actual-hc`}
              render={(props) => <Actualhc {...props} />}
            />
             <Route
              path={`${match.url}/total-efforts-non`}
              render={(props) => <Totaleffortsnon {...props} />}
            />
            <Route
              path={`${match.url}/total-efforts`}
              render={(props) => <Totalefforts {...props} />}
            />
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
  export default Master;