import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';


const SupportTeamAdhoc = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './supportteamadhoc')
);
const SupportTeamError = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './supportteamerrorcapture')
);
const Supportteamerrorcapturerawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/supportteamerrorcapturerawdata')
);
const Supportteamtaskrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/supportteamtaskrawdata')
);
const Supportteam = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './master/supportteam')
);
const ProductivityReport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './productivity-report')
);
const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/supportteamadhoc`} />
          
             <Route
              path={`${match.url}/supportteamadhoc`}
              render={(props) => <SupportTeamAdhoc {...props} />}
            />
             <Route
              path={`${match.url}/supportteamerrorcapture`}
              render={(props) => <SupportTeamError {...props} />}
            />
          <Route
              path={`${match.url}/rawdata/supportteamerrorcapturerawdata`}
              render={(props) => <Supportteamerrorcapturerawdata {...props} />}
            />
             <Route
              path={`${match.url}/rawdata/supportteamtaskrawdata`}
              render={(props) => <Supportteamtaskrawdata {...props} />}
            />
         <Route
              path={`${match.url}/master/supportteam`}
              render={(props) => <Supportteam {...props} />}
            />
              <Route
              path={`${match.url}/productivity-report`}
              render={(props) => <ProductivityReport {...props} />}
            /> 
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
  export default Master;