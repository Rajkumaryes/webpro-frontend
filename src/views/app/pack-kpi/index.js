import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Productivity_EH = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './productivity-EH')
);
const Productivity_without_EH = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './productivity-without-eh')
);
const Productivity_Finding = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './productivity-finding')
);
const Productivity_Audit = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './productivity-audit')
);
const NonProductivity = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './non-productivity')
);
const Errorcapture = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './error-capture')
);

const ErrorReceivedBy = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/errorreceivedby')
);

const Category = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/category')
);

const Errortype = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/errortype')
);

const NonProductivityFor = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/non-productivity-for')
);
const Reports = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './reports')
);
const Eqmaster = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/eqmaster')
);

const ProductivityReport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './productivity-report')
);
const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/productivity-eh`} />
          <Route
              path={`${match.url}/productivity-EH`}
              render={(props) => <Productivity_EH {...props} />}
            />
            <Route
              path={`${match.url}/productivity-without-eh`}
              render={(props) => <Productivity_without_EH {...props} />}
            />
             <Route
              path={`${match.url}/productivity-finding`}
              render={(props) => <Productivity_Finding {...props} />}
            />
             <Route
              path={`${match.url}/productivity-audit`}
              render={(props) => <Productivity_Audit {...props} />}
            />
             <Route
              path={`${match.url}/non-productivity`}
              render={(props) => <NonProductivity {...props} />}
            />
             <Route
              path={`${match.url}/error-capture`}
              render={(props) => <Errorcapture {...props} />}
            />

              <Route
              path={`${match.url}/master/errorreceivedby`}
              render={(props) => <ErrorReceivedBy {...props} />}
            />
            <Route
              path={`${match.url}/master/category`}
              render={(props) => <Category {...props} />}
            />
             <Route
              path={`${match.url}/master/errortype`}
              render={(props) => <Errortype {...props} />}
            />
            <Route
              path={`${match.url}/master/for`}
              render={(props) => <NonProductivityFor {...props} />}
            />
            
            <Route
              path={`${match.url}/reports`}
              render={(props) => <Reports {...props} />}
            />
              <Route
              path={`${match.url}/productivity-report`}
              render={(props) => <ProductivityReport {...props} />}
            /> 
             <Route
              path={`${match.url}/master/eqmaster`}
              render={(props) => <Eqmaster {...props} />}
            />
         
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
  export default Master;