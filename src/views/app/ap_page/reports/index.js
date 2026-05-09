import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const InvoiceAllocation = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './invoice-allocation')
);
const Process = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './invoice-processing')
);
const AuditAllocation = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './auditallocation')
);
const AuditReview = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './auditreview')
);

const ErrorReporting = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './error-reporting')
);



const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/invoice-allocation`} />
              <Route
              path={`${match.url}/invoice-allocation`}
              render={(props) => <InvoiceAllocation {...props} />}
            />
            <Route
              path={`${match.url}/invoice-processing`}
              render={(props) => <Process {...props} />}
            />
            <Route
              path={`${match.url}/auditallocation`}
              render={(props) => <AuditAllocation {...props} />}
            />
           
              <Route
              path={`${match.url}/auditreview`}
              render={(props) => <AuditReview {...props} />}
            />
            <Route
              path={`${match.url}/error-reporting`}
              render={(props) => <ErrorReporting {...props} />}
            /> 
             
            
            
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
  export default Master;