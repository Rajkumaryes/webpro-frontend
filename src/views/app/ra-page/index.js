import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';


const AmdContracts = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './amd-contracts')
);
const CorrectionLog = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './correction-log')
);
const CrossBorders = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './cross-borders')
);

const DetailsBox = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './details-box')
);
const DetailsBoxDispute = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './details-box-dispute')
);
const Controlescreen = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './controlescreen')
);
const Shared = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './shared')
);
const Report = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './reports')
);
const Dispute = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './Dispute')
);

const Region = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/region')
);
const Area = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/area')
);
const Priority = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/priority')
);
const Size = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/size')
);

const ErrorType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/errortype')
);

const Status = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/status')
);
const InternalExternal = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/internalexternal')
);
const AmdNo = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/amdno')
);
const Amendments = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/amendments')
);
const Eqmaster = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/eqmaster')
);
const ProductivityReport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './productivity-report')
);
const KPIReport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './kpi-report')
);

const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/amd-contracts`} />
        <Route
              path={`${match.url}/amd-contracts`}
              render={(props) => <AmdContracts {...props} />}
            />
            <Route
              path={`${match.url}/correction-log`}
              render={(props) => <CorrectionLog {...props} />}
            />
            <Route
              path={`${match.url}/cross-borders`}
              render={(props) => <CrossBorders {...props} />}
            />
          <Route
              path={`${match.url}/details-box`}
              render={(props) => <DetailsBox {...props} />}
            />
             <Route
              path={`${match.url}/details-box-dispute`}
              render={(props) => <DetailsBoxDispute {...props} />}
            />
            
             <Route
              path={`${match.url}/controlescreen`}
              render={(props) => <Controlescreen {...props} />}
            />
            <Route
              path={`${match.url}/shared`}
              render={(props) => <Shared {...props} />}
            />
           
             <Route
              path={`${match.url}/reports`}
              render={(props) => <Report {...props} />}
            />
             <Route
              path={`${match.url}/Dispute`}
              render={(props) => <Dispute {...props} />}
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
              path={`${match.url}/master/priority`}
              render={(props) => <Priority {...props} />}
            />
             <Route
              path={`${match.url}/master/size`}
              render={(props) => <Size {...props} />}
            />
             <Route
              path={`${match.url}/master/errortype`}
              render={(props) => <ErrorType {...props} />}
            />
            <Route
              path={`${match.url}/master/status`}
              render={(props) => <Status {...props} />}
            />
             <Route
              path={`${match.url}/master/internalexternal`}
              render={(props) => <InternalExternal {...props} />}
            />
            <Route
              path={`${match.url}/master/amdno`}
              render={(props) => <AmdNo {...props} />}
            />
             <Route
              path={`${match.url}/master/amendments`}
              render={(props) => <Amendments {...props} />}
            />
           <Route
              path={`${match.url}/master/eqmaster`}
              render={(props) => <Eqmaster {...props} />}
            />
             <Route
              path={`${match.url}/productivity-report`}
              render={(props) => <ProductivityReport {...props} />}
            /> 
             <Route
              path={`${match.url}/kpi-report`}
              render={(props) => <KPIReport {...props} />}
            /> 
            
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
  export default Master;