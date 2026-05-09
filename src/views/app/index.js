import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';
// import { ProtectedRoute, UserRole } from '../../helpers/authHelper';
const Import = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './import')
);
const Gogo = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './gogo')
);
const SecondMenu = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './second-menu')
);
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './blank-page')
);
const Export = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './export')
);
const Epos = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './epos')
);

const RailNotification = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rail_notification')
);
const DG = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './dg')
);
const Track = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './track')
);
const Bookingprocess = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './bookingprocess')
);
const FAPgae = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './faPage')
);
const Vesselchartering = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './vesselchartering')
);

const APPgae = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './ap_page')
);

const DisputeProcess = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './dispute-process')
);

const MIS_QA = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './mis-qa-page')
);

const RAPage = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './ra-page')
);

const SQPage = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './sq-page')
);
const Asia = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './asia')
);
const DND = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './dnd')
);
const Tender = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './tender')
);

const Pact_KPI = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './pack-kpi')
);
const GeneralMaster = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './master')
);

const QA_page = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './qa-page')
);
const SupportTeam = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './support-team')
);
const Feederschedules = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './feederschedules')
);
const Masters = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './projectmasters')
);

const Profile = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './profile')
);

const Notification = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './notification')
);
const Productivity = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './productivity')
);

const Dashboard = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './dashboard')
);
const Kfrreport = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './kfr_report')
);
const Testing = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './testing')
);
const Automation = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './automation')
);
const Meeting = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './meeting')
);
const Bookingamendment = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './booking-amendment')
);
const BCHTeam = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './bchteam')
);
const Mainline = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './mainlinefeeder')
);
const VesselBalancing = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './vesselbalancing')
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/export`} />
            <Route
              path={`${match.url}/gogo`}
              render={(props) => <Gogo {...props} />}
            />
            <Route
              path={`${match.url}/second-menu`}
              render={(props) => <SecondMenu {...props} />}
            />
            {/* <ProtectedRoute
                    path={`${match.url}/second-menu`}
                    component={SecondMenu}
                    roles={[UserRole.Admin]}
            /> */}
            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            />
             <Route
              path={`${match.url}/export`}
              render={(props) => <Export {...props} />}
            />
               <Route
              path={`${match.url}/import`}
              render={(props) => <Import {...props} />}
            />
            <Route
              path={`${match.url}/epos`}
              render={(props) => <Epos {...props} />}
            />
            <Route
              path={`${match.url}/railnotification`}
              render={(props) => <RailNotification {...props} />}
            />
            <Route
              path={`${match.url}/dg`}
              render={(props) => <DG {...props} />}
            />
            <Route
              path={`${match.url}/track`}
              render={(props) => <Track {...props} />}
            />
            <Route
              path={`${match.url}/bookingprocess`}
              render={(props) => <Bookingprocess {...props} />}
            />
            <Route
              path={`${match.url}/fa`}
              render={(props) => <FAPgae {...props} />}
            />
             <Route
              path={`${match.url}/vesselchartering`}
              render={(props) => <Vesselchartering{...props} />}
            />
              <Route
              path={`${match.url}/ap`}
              render={(props) => <APPgae {...props} />}
            />
             <Route
              path={`${match.url}/dispute-process`}
              render={(props) => <DisputeProcess {...props} />}
            />
             <Route
              path={`${match.url}/mis-qa`}
              render={(props) => <MIS_QA {...props} />}
            />
             <Route
              path={`${match.url}/ra`}
              render={(props) => <RAPage {...props} />}
            />
             <Route
              path={`${match.url}/asia`}
              render={(props) => <Asia {...props} />}
            />
            <Route
              path={`${match.url}/dnd`}
              render={(props) => <DND {...props} />}
            />
              <Route
              path={`${match.url}/sq`}
              render={(props) => <SQPage {...props} />}
            />
              <Route
              path={`${match.url}/tender`}
              render={(props) => <Tender {...props} />}
            />
              <Route
              path={`${match.url}/pact-kpi`}
              render={(props) => <Pact_KPI {...props} />}
            />
             <Route
              path={`${match.url}/qa`}
              render={(props) => <QA_page {...props} />}
            />
             <Route
              path={`${match.url}/support-team`}
              render={(props) => <SupportTeam {...props} />}
            />
            <Route
              path={`${match.url}/feederschedules`}
              render={(props) => <Feederschedules {...props} />}
            />
             <Route
              path={`${match.url}/generalmaster`}
              render={(props) => <GeneralMaster {...props} />}
            />
             <Route
              path={`${match.url}/masters`}
              render={(props) => <Masters {...props} />}
            />
            <Route
              path={`${match.url}/profile`}
              render={(props) => <Profile {...props} />}
            />
             <Route
              path={`${match.url}/notification`}
              render={(props) => <Notification {...props} />}
            />
             <Route
              path={`${match.url}/productivity`}
              render={(props) => <Productivity {...props} />}
            />
             <Route
              path={`${match.url}/dashboard`}
              render={(props) => <Dashboard {...props} />}
            />
            <Route
              path={`${match.url}/kfr-report`}
              render={(props) => <Kfrreport {...props} />}
            />
            <Route
              path={`${match.url}/testing`}
              render={(props) => <Testing {...props} />}
            />
            <Route
              path={`${match.url}/automation`}
              render={(props) => <Automation {...props} />}
            />
             <Route
              path={`${match.url}/meeting`}
              render={(props) => <Meeting {...props} />}
            /> 
            <Route
              path={`${match.url}/bookingamendment`}
              render={(props) => <Bookingamendment {...props} />}
            /> 
            <Route
              path={`${match.url}/bchteam`}
              render={(props) => <BCHTeam {...props} />}
            /> 
            <Route
              path={`${match.url}/mainlinefeeder`}
              render={(props) => <Mainline {...props} />}
            /> 
            <Route
              path={`${match.url}/vesselbalancing`}
              render={(props) => <VesselBalancing {...props} />}
            /> 
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
