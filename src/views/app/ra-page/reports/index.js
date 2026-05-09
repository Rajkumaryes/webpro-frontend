import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';


const AmdContracts = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './amd-contracts')
);
const Controlescreen = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './controlescreen')
);
const CorrectionLog = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './correction-log')
);
const CrossBorders = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './cross-borders')
);
const Dispute = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './Dispute')
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
              path={`${match.url}/controlescreen`}
              render={(props) => <Controlescreen {...props} />}
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
              path={`${match.url}/Dispute`}
              render={(props) => <Dispute {...props} />}
            />
              <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
  export default Master;