import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Dginputsheet = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './dginputsheet')
);
const Dgpto = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './dgpto')
);
const Error = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './errorpage')
);
const Track = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './track')
);
const Dgactivity = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './masters/dgactivity')
);
const Dgarea = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './masters/dgarea')
);
const Dgregion = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './masters/dgregion')
);
const InputStatus = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/inputstatus')
);
const ContainerType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/containertype')
);
const DecType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/dectype')
);
const Dgptoactivity = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/dgptoactivity')
);
const Dgtrackregion = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/dgtrackregion')
);
const Dgerrorregion = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/dgerrorregion')
);
const Eqmaster = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/eqmaster')
);
const Dtptotteqmaster = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/dtptotteqmaster')
);
const Dginputsheetrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/dginputsheetrawdata')
);
const Dgptorawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/dgptorawdata')
);
const Errorrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/errorrawdata')
);
const Trackrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/trackrawdata')
);
const Productivityreport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './productivity-report')
);
const Timezone = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/timezone')
);
const Kpireport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './kpi-report')
);
const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/dginputsheet`} />
        <Route
              path={`${match.url}/dginputsheet`}
              render={(props) => <Dginputsheet {...props} />}
            />
           <Route
            path={`${match.url}/dgpto`}
            render={(props) => <Dgpto {...props} />}
          /> 
           <Route
            path={`${match.url}/error`}
            render={(props) => <Error {...props} />}
          /> 
          <Route
              path={`${match.url}/master/dgactivity`}
              render={(props) => <Dgactivity {...props} />}
            />
             <Route
              path={`${match.url}/master/dgregion`}
              render={(props) => <Dgregion {...props} />}
            />
            <Route
              path={`${match.url}/master/dgarea`}
              render={(props) => <Dgarea {...props} />}
            />
            <Route
              path={`${match.url}/master/containertype`}
              render={(props) => <ContainerType {...props} />}
            />
             <Route
              path={`${match.url}/master/inputstatus`}
              render={(props) => <InputStatus {...props} />}
            />
             <Route
              path={`${match.url}/master/dectype`}
              render={(props) => <DecType {...props} />}
            />
            <Route
              path={`${match.url}/master/dgptoactivity`}
              render={(props) => <Dgptoactivity {...props} />}
            />
             <Route
              path={`${match.url}/master/dgerrorregion`}
              render={(props) => <Dgerrorregion {...props} />}
            />
             <Route
              path={`${match.url}/master/dgtrackregion`}
              render={(props) => <Dgtrackregion {...props} />}
            />
            <Route
              path={`${match.url}/master/eqmaster`}
              render={(props) => <Eqmaster {...props} />}
            />
             <Route
              path={`${match.url}/master/dtptotteqmaster`}
              render={(props) => <Dtptotteqmaster {...props} />}
            />
             <Route
              path={`${match.url}/track`}
              render={(props) => <Track {...props} />}
            />
             <Route
              path={`${match.url}/rawdata/dginputsheetrawdata`}
              render={(props) => <Dginputsheetrawdata {...props} />}
            />
             <Route
              path={`${match.url}/rawdata/dgptorawdata`}
              render={(props) => <Dgptorawdata {...props} />}
            />
             <Route
              path={`${match.url}/rawdata/errorrawdata`}
              render={(props) => <Errorrawdata {...props} />}
            />
             <Route
              path={`${match.url}/rawdata/trackrawdata`}
              render={(props) => <Trackrawdata {...props} />}
            />
             <Route
              path={`${match.url}/productivity-report`}
              render={(props) => <Productivityreport {...props} />}
            />
             <Route
              path={`${match.url}/master/timezone`}
              render={(props) => <Timezone {...props} />}
            />
            <Route
              path={`${match.url}/kpireport`}
              render={(props) => <Kpireport {...props} />}
            />
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
  export default Master;