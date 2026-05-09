import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Process = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './invoice-processing')
);
const AuditAllocation = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './auditallocation')
);

const InvoiceAllocation = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './invoice-allocation')
);

const AuditReview = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './auditreview')
);

const ErrorReporting = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './error-reporting')
);

const Region = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/region')
);
const Area = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/area')
);
const InvoiceStatus = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/invoice-status')
);
const Category = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/category')
);
const AuditStatus = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/auditstatus')
);
const ErrorCategory = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/errorcategory')
);

const GSCcomments = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/gsccomments')
);
const StandardComment = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/standardcomment')
);
const ErrorType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/errortype')
);
const ScanLocation = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/scanlocation')
);
const Reports = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './reports')
);
const Eqmaster = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/eqmaster')
);
const Productivity_report = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ '../ap_page/productivity-report')
);
const KPI_report = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ '../ap_page/kpi-report')
);
const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/invoice-processing`} />
        <Route
              path={`${match.url}/invoice-processing`}
              render={(props) => <Process {...props} />}
            />
             <Route
              path={`${match.url}/auditallocation`}
              render={(props) => <AuditAllocation {...props} />}
            />
             <Route
              path={`${match.url}/invoice-allocation`}
              render={(props) => <InvoiceAllocation {...props} />}
            />
             <Route
              path={`${match.url}/auditreview`}
              render={(props) => <AuditReview {...props} />}
            />
            <Route
              path={`${match.url}/error-reporting`}
              render={(props) => <ErrorReporting {...props} />}
            />
             <Route
              path={`${match.url}/master/region`}
              render={(props) => <Region {...props} />}
            />
            <Route
              path={`${match.url}/master/area`}
              render={(props) => <Area {...props} />}
            />
             <Route
              path={`${match.url}/master/category`}
              render={(props) => <Category {...props} />}
            />
            
              <Route
              path={`${match.url}/master/invoice-status`}
              render={(props) => <InvoiceStatus {...props} />}
            />
            <Route
              path={`${match.url}/master/auditstatus`}
              render={(props) => <AuditStatus {...props} />}
            />
            <Route
              path={`${match.url}/master/errorcategory`}
              render={(props) => <ErrorCategory {...props} />}
            />
            <Route
              path={`${match.url}/master/gsccomments`}
              render={(props) => <GSCcomments {...props} />}
            />
             <Route
              path={`${match.url}/master/standardcomment`}
              render={(props) => <StandardComment {...props} />}
            />
             <Route
              path={`${match.url}/master/errortype`}
              render={(props) => <ErrorType {...props} />}
            />
             <Route
              path={`${match.url}/master/scanlocation`}
              render={(props) => <ScanLocation {...props} />}
            />
              <Route
              path={`${match.url}/master/scanlocation`}
              render={(props) => <ScanLocation {...props} />}
            />
              <Route
            path={`${match.url}/reports`}
            render={(props) => <Reports {...props} />}
          />
            <Route
            path={`${match.url}/master/eqmaster`}
            render={(props) => <Eqmaster {...props} />}
          />
            <Route
            path={`${match.url}/productivity-report`}
            render={(props) => <Productivity_report {...props} />}
          /> 
           <Route
            path={`${match.url}/kpi-report`}
            render={(props) => <KPI_report {...props} />}
          /> 
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
  export default Master;