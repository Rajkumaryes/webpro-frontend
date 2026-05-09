import { changeConfirmLocale } from 'antd/lib/modal/locale';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// const Report = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-blank-page" */ './reports')
// );
const Vesselbalancing = React.lazy(() =>
    import(/* webpackChunkName: "viwes-blank-page" */ '../vesselbalancing/vesselbalancing')
  );
const PendingFolloUp = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../vesselbalancing/pendingfollowup')
);
const InternalAudit = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../vesselbalancing/internalaudit')
);
const Activity = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/activity')
);
const Statusofcase = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/statusofcase')
);
const Pendingtype = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/pendingtype')
);
const Region = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/region')
);
const Area = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/area')
);
const Subarea = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/subarea')
);
const AuditType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/audittype')
);
// const Eqmaster = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-blank-page" */ './masters/eqmaster')
// );

const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/vesselbalancing`} />

        <Route
            path={`${match.url}/vesselbalancing`}
            render={(props) => <Vesselbalancing {...props} />}
          /> 
          <Route
            path={`${match.url}/pendingfollowup`}
            render={(props) => <PendingFolloUp {...props} />}
          /> 
           <Route
            path={`${match.url}/internalaudit`}
            render={(props) => <InternalAudit {...props} />}
          /> 
             {/* <Route
              path={`${match.url}/reports`}
              render={(props) => <Report {...props} />}
            /> */}
             <Route
              path={`${match.url}/masters/activity`}
              render={(props) => <Activity {...props} />}
            />
          <Route
              path={`${match.url}/masters/statusofcase`}
              render={(props) => <Statusofcase {...props} />}
            />
            <Route
              path={`${match.url}/masters/pendingtype`}
              render={(props) => <Pendingtype {...props} />}
            />
            <Route
              path={`${match.url}/masters/region`}
              render={(props) => <Region {...props} />}
            />
            <Route
              path={`${match.url}/masters/area`}
              render={(props) => <Area {...props} />}
            />
             <Route
              path={`${match.url}/masters/subarea`}
              render={(props) => <Subarea {...props} />}
            />
             <Route
              path={`${match.url}/masters/audittype`}
              render={(props) => <AuditType {...props} />}
            />
        {/* <Route
              path={`${match.url}/master/eqmaster`}
              render={(props) => <Eqmaster {...props} />}
            /> */}
            
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
  export default Master;