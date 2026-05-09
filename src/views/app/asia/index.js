import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const AsiaReporting = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './asiareporting')
);
const ErrorSheet = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './errorsheet')
);
const AsiaReport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './master/asiareport')
);
const AsiaErrorReport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './master/asiaregion')
);
const EQmaster = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './master/eqmaster')
);
const Asiareportingrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/asiareportingrawdata')
);
const Errorsheetrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/errorsheetrawdata')
);
const Productivity_report = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './productivity-report')
);
const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/asiareporting`} />
        <Route
              path={`${match.url}/asiareporting`}
              render={(props) => <AsiaReporting {...props} />}
            />
            <Route
              path={`${match.url}/errorsheet`}
              render={(props) => <ErrorSheet {...props} />}
            />
           <Route
              path={`${match.url}/master/asiareport`}
              render={(props) => <AsiaReport {...props} />}
            />
             <Route
              path={`${match.url}/master/asiaregion`}
              render={(props) => <AsiaErrorReport {...props} />}
            />
             <Route
              path={`${match.url}/master/eqmaster`}
              render={(props) => <EQmaster {...props} />}
            />
             <Route
              path={`${match.url}/rawdata/errorsheetrawdata`}
              render={(props) => <Errorsheetrawdata {...props} />}
            />
             <Route
              path={`${match.url}/rawdata/asiareportingrawdata`}
              render={(props) => <Asiareportingrawdata {...props} />}
            />
         <Route
            path={`${match.url}/productivity-report`}
            render={(props) => <Productivity_report {...props} />}
          /> 
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
  export default Master;