import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';


const Errorcapturemodule = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../feederschedules/Error_capturemodule')
);

const FeederSchedules = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../feederschedules/feeder_schedules')
);
const Activitytype = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../feederschedules/feedermaster/activitytype')
);
const Activityselection = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../feederschedules/feedermaster/activityselection')
);
const Area = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../feederschedules/feedermaster/area')
);
const Errortype = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../feederschedules/feedermaster/errortype')
);
const Region = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../feederschedules/feedermaster/region')
);
const RequestType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../feederschedules/feedermaster/requesttype')
);
const Source = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../feederschedules/feedermaster/source')
);
const Subactivity = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../feederschedules/feedermaster/subactivity')
);
const Vesseloperator = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../feederschedules/feedermaster/vesseloperator')
);
const Erroractivity = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../feederschedules/feedermaster/erroractivitytype')
);
const Eqmaster = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../feederschedules/feedermaster/eqmaster')
);
const Feeder_schedulesrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../feederschedules/rawdata/feeder_schedulesrawdata')
);
const Error_capturemodulerawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../feederschedules/rawdata/Error_capturemodulerawdata')
);
const Productivity_report = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ '../feederschedules/productivity-report')
);
const Kpireport = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './kpi-report')
);

const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/feeder_schedules`} />
         
            <Route
            path={`${match.url}/feeder_schedules`}
            render={(props) => <FeederSchedules {...props} />}
          /> 
          <Route
            path={`${match.url}/Error_capturemodule`}
            render={(props) => <Errorcapturemodule {...props} />}
          /> 
           <Route
            path={`${match.url}/master/activitytype`}
            render={(props) => <Activitytype {...props} />}
          /> 
           <Route
            path={`${match.url}/master/activityselection`}
            render={(props) => <Activityselection {...props} />}
          /> 
           <Route
            path={`${match.url}/master/area`}
            render={(props) => <Area {...props} />}
          /> 
           <Route
            path={`${match.url}/master/errortype`}
            render={(props) => <Errortype {...props} />}
          /> 
           <Route
            path={`${match.url}/master/region`}
            render={(props) => <Region {...props} />}
          /> 
           <Route
            path={`${match.url}/master/requesttype`}
            render={(props) => <RequestType {...props} />}
          /> 
           <Route
            path={`${match.url}/master/source`}
            render={(props) => <Source {...props} />}
          /> 
          <Route
            path={`${match.url}/master/subactivity`}
            render={(props) => <Subactivity {...props} />}
          /> 
          <Route
            path={`${match.url}/master/vesseloperator`}
            render={(props) => <Vesseloperator {...props} />}
          /> 
           <Route
            path={`${match.url}/master/erroractivitytype`}
            render={(props) => <Erroractivity {...props} />}
          /> 
           <Route
            path={`${match.url}/master/eqmaster`}
            render={(props) => <Eqmaster {...props} />}
          /> 
          <Route
            path={`${match.url}/rawdata/feeder_schedulesrawdata`}
            render={(props) => <Feeder_schedulesrawdata {...props} />}
          /> 
           <Route
            path={`${match.url}/rawdata/error_capturemodulerawdata`}
            render={(props) => <Error_capturemodulerawdata {...props} />}
          /> 
          <Route
            path={`${match.url}/productivity-report`}
            render={(props) => <Productivity_report {...props} />}
          /> 
           <Route
            path={`${match.url}/kpireport`}
            render={(props) => <Kpireport {...props} />}
          /> 
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
  export default Master;