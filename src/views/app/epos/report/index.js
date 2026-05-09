import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Errorhandling = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './errorhandling')
);
const Streetturns = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './streetturns')
);

const Adhocbulkupload = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './adhocbulkupload')
);
const TPFREPproductivity = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './TPFREPproductivity')
);
const Timemonitoring = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './timemonitoring')
);
const Errorcapturemodule = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './Errorcapturemodule')
);

// const FeederSchedules = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-blank-page" */ './feeder-schedules')
// );
// const EposActivity = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-blank-page" */ './masters/eposactivity')
// );

const Reports = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './reports')
);

const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/errorhandling`} />
        <Route
              path={`${match.url}/errorhandling`}
              render={(props) => <Errorhandling {...props} />}
            />
           <Route
            path={`${match.url}/streetturns`}
            render={(props) => <Streetturns {...props} />}
          /> 
          <Route
              path={`${match.url}/adhocbulkupload`}
              render={(props) => <Adhocbulkupload {...props} />}
            />
          <Route
            path={`${match.url}/timemonitoring`}
            render={(props) => <Timemonitoring {...props} />}
          />  
          <Route
            path={`${match.url}/TPFREPproductivity`}
            render={(props) => <TPFREPproductivity {...props} />}
          /> 
            {/* <Route
            path={`${match.url}/feeder-schedules`}
            render={(props) => <FeederSchedules {...props} />}
          />  */}
          <Route
            path={`${match.url}/Errorcapturemodule`}
            render={(props) => <Errorcapturemodule {...props} />}
          /> 
            <Route
              path={`${match.url}/reports`}
              render={(props) => <Reports {...props} />}
            />
        
              {/* <Route
              path={`${match.url}/eposactivity`}
              render={(props) => <EposActivity {...props} />}
            /> */}
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
  export default Master;