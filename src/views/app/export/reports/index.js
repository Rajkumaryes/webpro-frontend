import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const MatchCode = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './matchcode')
);
const InputSheet = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './inputsheet')
);
// const Otheractivity = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-blank-page" */ './otheractivites')
// );
const CorrectionSheet = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './correctionsheet')
);
const Comunicationsheet = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './communicationsheet')
);

const QueryResolveSheet = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './queryResolvesheet')
);
const AuditSheet = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './auditsheet')
);

const COD = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './cod')
);

const Indexing = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './indexing')
);
const Realese = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './realese')
);
const Rut_Invoice = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rut_invoice')
);
const SI_Remainder = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './si-remainder')
);
const ErrorModule = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './errormodule')
);
const OT = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './ot')
);
const CRMCasehandling = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './crmcasehandling')
);
// const Report = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-blank-page" */ './reports')
// );

const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/inputsheet`} />
        <Route
              path={`${match.url}/matchcode`}
              render={(props) => <MatchCode {...props} />}
            />
        <Route
              path={`${match.url}/inputsheet`}
              render={(props) => <InputSheet {...props} />}
            />
              {/* <Route
              path={`${match.url}/otheractivites`}
              render={(props) => <Otheractivity {...props} />}
            /> */}
             <Route
              path={`${match.url}/correctionsheet`}
              render={(props) => <CorrectionSheet {...props} />}
            />
             <Route
              path={`${match.url}/communicationsheet`}
              render={(props) => <Comunicationsheet {...props} />}
            />
             <Route
              path={`${match.url}/queryResolvesheet`}
              render={(props) => <QueryResolveSheet {...props} />}
            />
            <Route
              path={`${match.url}/auditsheet`}
              render={(props) => <AuditSheet {...props} />}
            />
             <Route
              path={`${match.url}/cod`}
              render={(props) => <COD {...props} />}
            />
             <Route
              path={`${match.url}/indexing`}
              render={(props) => <Indexing {...props} />}
            />
              <Route
              path={`${match.url}/realese`}
              render={(props) => <Realese {...props} />}
            />
              <Route
              path={`${match.url}/rut_invoice`}
              render={(props) => <Rut_Invoice {...props} />}
            />
            <Route
              path={`${match.url}/si-remainder`}
              render={(props) => <SI_Remainder {...props} />}
            />
               <Route
              path={`${match.url}/errormodule`}
              render={(props) => <ErrorModule {...props} />}
            />
               <Route
              path={`${match.url}/ot`}
              render={(props) => <OT {...props} />}
            />
             <Route
              path={`${match.url}/crmcasehandling`}
              render={(props) => <CRMCasehandling {...props} />}
            />
             {/* <Route
              path={`${match.url}/reports`}
              render={(props) => <Report {...props} />}
            /> */}
            
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
  export default Master;