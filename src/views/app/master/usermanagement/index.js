import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Usermanagement = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './user')
);
const Usermanagementimport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './user/import')
);
const Usermanagementexport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './user/export')
);
const Region = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './region')
);
const Area = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './area')
);
const Team = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './team')
);

const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/user`} />
         
           <Route
              path={`${match.url}/user`}
              render={(props) => <Usermanagement {...props} />}
            />
            <Route
              path={`${match.url}/import`}
              render={(props) => <Usermanagementimport {...props} />}
            />
              <Route
              path={`${match.url}/region`}
              render={(props) => <Region {...props} />}
            />
              <Route
              path={`${match.url}/area`}
              render={(props) => <Area {...props} />}
            />
            <Route
              path={`${match.url}/team`}
              render={(props) => <Team {...props} />}
            />
            <Route
              path={`${match.url}/export`}
              render={(props) => <Usermanagementexport {...props} />}
            />
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
  export default Master;