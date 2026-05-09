import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const FreeTimeNotification = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './free_time_notification')
);
const ContainerRelease = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './containerrelease')
);
const CommunicationSheet = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './communication')
);
const AnnouncementData = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './announcement')
);


const Others = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './others')
);
const Report = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './report')
);
const Accuracy = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './accuracy')
);
const Fronodata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './frnodata')
);
const Activity = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/activity')
);
const Type = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/type')
);
const Reports = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/reports')
);
const ErrorType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/errortype')
);
const Reportrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './reportrawdata')
);
const ProductivityReport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './productivity-report')
);

const EQMaster = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/eqmaster')
);
const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/freenotification`} />
        <Route
              path={`${match.url}/freenotification`}
              render={(props) => <FreeTimeNotification {...props} />}
            />
          <Route
              path={`${match.url}/freenotification`}
              render={(props) => <FreeTimeNotification {...props} />}
            />
           <Route
              path={`${match.url}/containerdata`}
              render={(props) => <ContainerRelease {...props} />}
            />
             <Route
              path={`${match.url}/communicationdata`}
              render={(props) => <CommunicationSheet {...props} />}
            />
             <Route
              path={`${match.url}/announcement`}
              render={(props) => <AnnouncementData {...props} />}
            />
          <Route
              path={`${match.url}/others`}
              render={(props) => <Others {...props} />}
            />
             <Route
              path={`${match.url}/report`}
              render={(props) => <Report {...props} />}
            />
             <Route
              path={`${match.url}/accuracy`}
              render={(props) => <Accuracy {...props} />}
            />
            <Route
              path={`${match.url}/frnodata`}
              render={(props) => <Fronodata {...props} />}
            />
            <Route
              path={`${match.url}/master/activity`}
              render={(props) => <Activity {...props} />}
            />
            <Route
              path={`${match.url}/master/type`}
              render={(props) => <Type {...props} />}
            />
            <Route
              path={`${match.url}/master/reports`}
              render={(props) => <Reports {...props} />}
            />
             <Route
              path={`${match.url}/master/errortype`}
              render={(props) => <ErrorType {...props} />}
            />
             <Route
              path={`${match.url}/master/eqmaster`}
              render={(props) => <EQMaster {...props} />}
            />
            
              <Route
              path={`${match.url}/reportrawdata`}
              render={(props) => <Reportrawdata {...props} />}
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