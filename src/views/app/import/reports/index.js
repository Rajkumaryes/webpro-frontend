import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Vesselinfo = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './vesselinfo')
);
const CAPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './ca')
);
const DOPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './doform')
);
const ReleasePage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './releaseform')
);
const Vesselposting = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './vesselposting')
);
const Domesticinvoice = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './domesticinvoice')
);
const Invoicecancelation = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './invoicecancelation')
);
const Doquery = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './doquery')
);
const Csierrorcapturing = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './csierrorcapturing')
);
const Communication = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './communication')
);
const CRM = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './crm')
);
const Reports = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/vesselinfo`} />
        <Route
            path={`${match.url}/vesselinfo`}
            render={(props) => <Vesselinfo {...props} />}
          />
           <Route
            path={`${match.url}/ca`}
            render={(props) => <CAPage {...props} />}
          />
           <Route
            path={`${match.url}/doform`}
            render={(props) => <DOPage {...props} />}
          />
           <Route
            path={`${match.url}/releaseform`}
            render={(props) => <ReleasePage {...props} />}
          />
            <Route
            path={`${match.url}/vesselposting`}
            render={(props) => <Vesselposting {...props} />}
          />
            <Route
            path={`${match.url}/domesticinvoice`}
            render={(props) => <Domesticinvoice {...props} />}
          />
          <Route
            path={`${match.url}/invoicecancelation`}
            render={(props) => <Invoicecancelation {...props} />}
          />
          <Route
            path={`${match.url}/doquery`}
            render={(props) => <Doquery {...props} />}
          />
           <Route
            path={`${match.url}/csierrorcapturing`}
            render={(props) => <Csierrorcapturing {...props} />}
          />
          <Route
            path={`${match.url}/communication`}
            render={(props) => <Communication {...props} />}
          />
          <Route
            path={`${match.url}/crm`}
            render={(props) => <CRM {...props} />}
          />
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
  export default Reports;