import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const OmniCaseHandling = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './omni-case-handling')
);
const OmniCaseMerging = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './omni-case-merging')
);
const UnassignedListView = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './unassigned-list-view')
);
const WorkOrderRemoval = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './work-order-removal')
);
const InternalAudit = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './internal-audit')
);
const ErrorLogIssue = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './error-log-issue')
);
const CaseAllocations = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './caseallocations')
);
const EscalationEmailAssistance = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './escalation-email-assistance')
);
const AmendmentDueTo = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/amendment-due-to')
);
const AmendmentType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/amendment-type')
);
const ExceptionType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/exception-type')
);
const StatusOfTheCase = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/status-of-the-case')
);
const IssuerCode = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/issuecode')
);
const QueueName = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/queuename')
);
const ProcessType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/processtype')
);
const AuditType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/audittype')
);
const ErrorCategory = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/errorcategory')
);
const QueryType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/querytype')
);
const EQmaster = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/eqmaster')
);
const Omnicasehandlingrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/omnicasehandling')
);
const Omnicasemergingrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/omnicasemerging')
);
const Unassignedlistrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/unassignedlistview')
);
const Workorderremovalrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/workorderremoval')
);
const Internalauditrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/internalaudit')
);
const Errorlogissuerawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/errorlogissue')
);
const Emailescalationrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/escalationemailassistance')
);
const OmniCaseHandlinDashboard = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './dashboard/omnicasehandling')
);
const StatusOfTheCaseMerging = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/statusofthecase')
);
const Userallocation = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/userallocation')
);
const ProductivityReport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './productivity-report')
);
const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/automation`} />
        <Route
              path={`${match.url}/omni-case-handling`}
              render={(props) => <OmniCaseHandling {...props} />}
            />
         <Route
              path={`${match.url}/omni-case-merging`}
              render={(props) => <OmniCaseMerging {...props} />}
            />
             <Route
              path={`${match.url}/unassigned-list-view`}
              render={(props) => <UnassignedListView {...props} />}
            />
             <Route
              path={`${match.url}/work-order-removal`}
              render={(props) => <WorkOrderRemoval {...props} />}
            />
             <Route
              path={`${match.url}/internal-audit`}
              render={(props) => <InternalAudit {...props} />}
            />
             <Route
              path={`${match.url}/error-log-issue`}
              render={(props) => <ErrorLogIssue {...props} />}
            />
            <Route
              path={`${match.url}/caseallocations`}
              render={(props) => <CaseAllocations {...props} />}
            />
             <Route
              path={`${match.url}/escalation-email-assistance`}
              render={(props) => <EscalationEmailAssistance {...props} />}
            />
             <Route
              path={`${match.url}/amendment-due-to`}
              render={(props) => <AmendmentDueTo {...props} />}
            />
             <Route
              path={`${match.url}/userallocation`}
              render={(props) => <Userallocation {...props} />}
            />
            <Route
              path={`${match.url}/amendment-type`}
              render={(props) => <AmendmentType {...props} />}
            />
            <Route
              path={`${match.url}/exception-type`}
              render={(props) => <ExceptionType {...props} />}
            />
            <Route
              path={`${match.url}/exception-type`}
              render={(props) => <ExceptionType {...props} />}
            />
            <Route
              path={`${match.url}/status-of-the-case`}
              render={(props) => <StatusOfTheCase {...props} />}
            />
            <Route
              path={`${match.url}/issuecode`}
              render={(props) => <IssuerCode {...props} />}
            />
            <Route
              path={`${match.url}/queuename`}
              render={(props) => <QueueName {...props} />}
            />
            <Route
              path={`${match.url}/processtype`}
              render={(props) => <ProcessType {...props} />}
            />
            <Route
              path={`${match.url}/audittype`}
              render={(props) => <AuditType {...props} />}
            />
            <Route
              path={`${match.url}/errorcategory`}
              render={(props) => <ErrorCategory {...props} />}
            />
            <Route
              path={`${match.url}/querytype`}
              render={(props) => <QueryType {...props} />}
            />
            <Route
              path={`${match.url}/eqmaster`}
              render={(props) => <EQmaster {...props} />}
            />
              <Route
              path={`${match.url}/rawdata/omnicasehandling`}
              render={(props) => <Omnicasehandlingrawdata {...props} />}
            />
            <Route
              path={`${match.url}/rawdata/omnicasemerging`}
              render={(props) => <Omnicasemergingrawdata {...props} />}
            />
            <Route
              path={`${match.url}/rawdata/unassignedlistview`}
              render={(props) => <Unassignedlistrawdata {...props} />}
            />
            <Route
              path={`${match.url}/rawdata/workorderremoval`}
              render={(props) => <Workorderremovalrawdata {...props} />}
            />
            <Route
              path={`${match.url}/rawdata/internalaudit`}
              render={(props) => <Internalauditrawdata {...props} />}
            />
            <Route
              path={`${match.url}/rawdata/errorlogissue`}
              render={(props) => <Errorlogissuerawdata {...props} />}
            />
            <Route
              path={`${match.url}/rawdata/escalationemailassistance`}
              render={(props) => <Emailescalationrawdata {...props} />}
            />
            <Route
              path={`${match.url}/dashboard/omnicasehandling`}
              render={(props) => <OmniCaseHandlinDashboard {...props} />}
            />
            <Route
              path={`${match.url}/statusofthecase`}
              render={(props) => <StatusOfTheCaseMerging {...props} />}
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