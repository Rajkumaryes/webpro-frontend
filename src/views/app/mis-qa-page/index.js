import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const QualityAssurance = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './quality-assurance')
);
const Errorcapture = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './errorcapture')
);
const Adhoc = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './adhoc')
);
const SupportTeam = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './supportteam')
);

const NonProduct = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './nonproductivityhours')
);
const Supportteamrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/supportteamrawdata')
);
const Adhocrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/adhocrawdata')
);
const Errorcapturerawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/errorcapturerawdata')
);

const Nonproductivityhoursrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/nonproductivityhoursrawdata')
);
const MISTeams = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './master/misteam')
);
const MISCategory = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './master/miscategory')
);
const MISReportFor = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './master/misreportfor')
);
const MISFor = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './master/misfor')
);
const MISSupervisor = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './master/missupervisor')
);
const MISQSCMaster = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './master/misqscmaster')
);
const ProductivityReport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './productivity-report')
);

const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/supportteam`} />
        <Route
              path={`${match.url}/quality-assurance`}
              render={(props) => <QualityAssurance {...props} />}
            />
          <Route
              path={`${match.url}/errorcapture`}
              render={(props) => <Errorcapture {...props} />}
            />
            <Route
              path={`${match.url}/adhoc`}
              render={(props) => <Adhoc {...props} />}
            />
            <Route
              path={`${match.url}/supportteam`}
              render={(props) => <SupportTeam {...props} />}
            />
        
         <Route
              path={`${match.url}/rawdata/supportteamrawdata`}
              render={(props) => <Supportteamrawdata {...props} />}
            />
             <Route
              path={`${match.url}/rawdata/adhocrawdata`}
              render={(props) => <Adhocrawdata {...props} />}
            />
            <Route
              path={`${match.url}/rawdata/errorcapturerawdata`}
              render={(props) => <Errorcapturerawdata {...props} />}
            />
            <Route
              path={`${match.url}/rawdata/nonproductivityhoursrawdata`}
              render={(props) => <Nonproductivityhoursrawdata {...props} />}
            />
        
         <Route
              path={`${match.url}/nonproductivityhours`}
              render={(props) => <NonProduct {...props} />}
            />
           <Route
              path={`${match.url}/master/miscategory`}
              render={(props) => <MISCategory {...props} />}
            />
             <Route
              path={`${match.url}/master/misteam`}
              render={(props) => <MISTeams {...props} />}
            /> 
             <Route
              path={`${match.url}/master/misfor`}
              render={(props) => <MISFor {...props} />}
            />
             <Route
              path={`${match.url}/master/missupervisor`}
              render={(props) => <MISSupervisor {...props} />}
            />
             <Route
              path={`${match.url}/master/misreportfor`}
              render={(props) => <MISReportFor {...props} />}
            />
             <Route
              path={`${match.url}/master/misqscmaster`}
              render={(props) => <MISQSCMaster {...props} />}
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