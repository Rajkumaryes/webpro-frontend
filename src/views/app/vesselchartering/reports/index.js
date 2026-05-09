import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Payment = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './payment')
);
const Paymentbunker = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './paymentbunker')
);
const Charterexpense = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './charterexpense')
);
const Ownersexpenses = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './ownersexpenses')
);
const Monthhire = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './monthhire')
);
const Statementaccounts = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './statementaccounts')
);
const Retrieval = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './retrieval')
);
const Debitnote = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './debitnote')
);
const Creditnote = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './creditnote')
);
const Downpayement = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './downpayement')
);
const Communicationemail = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './communicationemail')
);
const ErrorSheet = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './errorsheet')
);


const Reports = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/paymentbunker`} />
        <Route
              path={`${match.url}/payment`}
              render={(props) => <Payment {...props} />}
            />
           <Route
              path={`${match.url}/paymentbunker`}
              render={(props) => <Paymentbunker {...props} />}
            />
            <Route
              path={`${match.url}/charterexpense`}
              render={(props) => <Charterexpense {...props} />}
            />
             <Route
              path={`${match.url}/ownersexpenses`}
              render={(props) => <Ownersexpenses {...props} />}
            />
           <Route
              path={`${match.url}/monthhire`}
              render={(props) => <Monthhire {...props} />}
            />
            <Route
              path={`${match.url}/statementaccounts`}
              render={(props) => <Statementaccounts {...props} />}
            />
             <Route
              path={`${match.url}/retrieval`}
              render={(props) => <Retrieval {...props} />}
            />
            <Route
              path={`${match.url}/debitnote`}
              render={(props) => <Debitnote {...props} />}
            />
           <Route
              path={`${match.url}/creditnote`}
              render={(props) => <Creditnote {...props} />}
            />
            <Route
              path={`${match.url}/downpayement`}
              render={(props) => <Downpayement {...props} />}
            />
             <Route
              path={`${match.url}/communicationemail`}
              render={(props) => <Communicationemail {...props} />}
            />
            <Route
              path={`${match.url}/errorsheet`}
              render={(props) => <ErrorSheet {...props} />}
            />
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
  export default Reports;