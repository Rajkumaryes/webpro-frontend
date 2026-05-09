import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const NonProductivity = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './non-productivity')
);
const ApproveNonProductivity = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './approve-non-productivity')
);
const Category = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/category')
);
const Type = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/type')
);
const ApproveDate = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/approvedate')
);
const ApplyDate = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/applydate')
);
const Attendance = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './attendance')
);
const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/non-productivity`} />
        <Route
              path={`${match.url}/non-productivity`}
              render={(props) => <NonProductivity {...props} />}
            />
             <Route
              path={`${match.url}/approve-non-productivity`}
              render={(props) => <ApproveNonProductivity {...props} />}
            />
            <Route
              path={`${match.url}/masters/category`}
              render={(props) => <Category {...props} />}
            />
              <Route
              path={`${match.url}/masters/type`}
              render={(props) => <Type {...props} />}
            />
             <Route
              path={`${match.url}/masters/approvedate`}
              render={(props) => <ApproveDate {...props} />}
            />
             <Route
              path={`${match.url}/masters/applydate`}
              render={(props) => <ApplyDate {...props} />}
            />
              <Route
              path={`${match.url}/attendance`}
              render={(props) => <Attendance {...props} />}
            />
            
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );

  export default Master;