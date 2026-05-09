import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';


const MainlineFeeders = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../mainlinefeeder/mainlinefeeder')
);
const ErrorCaptureModule = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../mainlinefeeder/errorcapture')
);
const Region = React.lazy(() =>
    import(/* webpackChunkName: "viwes-blank-page" */ '../mainlinefeeder/master/region')
  );
const Eqmaster = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../mainlinefeeder/master/eqmaster')
);
const Activity = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../mainlinefeeder/master/activity')
);
const SSY = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../mainlinefeeder/master/ssydetails')
);
const Requesttype = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../mainlinefeeder/master/requesttype')
);
const Errortype = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../mainlinefeeder/master/errortype')
);
const Mainlinefeederrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../mainlinefeeder/rawdata/mainlinefeeder')
);
const Errorcapturerawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../mainlinefeeder/rawdata/errorcapture')
);
const Productivity_report = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../mainlinefeeder/productivity-report')
  );

const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/mainlinefeeder`} />
         
          <Route
            path={`${match.url}/mainlinefeeder`}
            render={(props) => <MainlineFeeders {...props} />}
          /> 
          <Route
            path={`${match.url}/error_capture_module`}
            render={(props) => <ErrorCaptureModule {...props} />}
          /> 
          <Route
            path={`${match.url}/master/region`}
            render={(props) => <Region {...props} />}
          /> 
          <Route
            path={`${match.url}/master/eqmaster`}
            render={(props) => <Eqmaster {...props} />}
          /> 
          <Route
            path={`${match.url}/master/activity`}
            render={(props) => <Activity {...props} />}
          /> 
          <Route
            path={`${match.url}/master/ssydetails`}
            render={(props) => <SSY {...props} />}
          /> 
          <Route
            path={`${match.url}/master/requesttype`}
            render={(props) => <Requesttype {...props} />}
          /> 
          <Route
            path={`${match.url}/master/errortype`}
            render={(props) => <Errortype {...props} />}
          /> 
          <Route
            path={`${match.url}/rawdata/mainlinefeeder`}
            render={(props) => <Mainlinefeederrawdata {...props} />}
          />
          <Route
            path={`${match.url}/rawdata/error_capture`}
            render={(props) => <Errorcapturerawdata {...props} />}
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