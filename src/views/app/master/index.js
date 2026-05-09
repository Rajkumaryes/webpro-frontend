import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Language = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './language')
);
const Groups = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './groups')
);

const SingleGroups = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './groups/singlegroup')
);

const LanguageData = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './languagedata')
);

const Hierarchy = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './hierarchy')
);
const MenuManager = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './menumanager')
);
const SubMenuManager = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './menumanager/submenu')
);
const UserLog = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './userlog')
);
const TimeZone = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './timezone')
);
const Department = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './department')
);
const Designation = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './designation')
);
const Process = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './process')
);
const Usermanagement = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './usermanagement')
);

const Outgoingserver = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './outgoingserver')
);
const Role = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './role')
);
const RolePermission = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './role/rolepermission')
);

const Location = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './location')
);
const MD = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './md')
);
const TL = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './tl')
);
const Manager = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './manager')
);
const Director = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './director')
);
const Level = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './level')
);
const ErrorUpload = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './errorupload')
);
const ErrorRemoval = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './errorremoval')
);
const AttendanceUpload = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './globalattendance')
);
const UserPerformance = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './userperformance')
);
const ValueBasedBehaviour = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './vbb')
);
const VBBMaster = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './vbbmaster')
);
const UserRating = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './userrating')
);
const SlabsUpload = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './slabs_upload')
);
const AIChat = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './chatai')
);

const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/language`} />
          <Route
              path={`${match.url}/language`}
              render={(props) => <Language {...props} />}
            />
             <Route
              path={`${match.url}/menumanager`}
              render={(props) => <MenuManager {...props} />}
            />
             <Route
              path={`${match.url}/submenumanager`}
              render={(props) => <SubMenuManager {...props} />}
            />
             <Route
              path={`${match.url}/groups`}
              render={(props) => <Groups {...props} />}
            />
             <Route
              path={`${match.url}/singlegroup`}
              render={(props) => <SingleGroups {...props} />}
            />
            
             <Route
              path={`${match.url}/hierarchy`}
              render={(props) => <Hierarchy {...props} />}
            />
             <Route
              path={`${match.url}/languagedata`}
              render={(props) => <LanguageData {...props} />}
            />
            <Route
              path={`${match.url}/userlog`}
              render={(props) => <UserLog {...props} />}
            />
            <Route
              path={`${match.url}/timezone`}
              render={(props) => <TimeZone {...props} />}
            />
            <Route
              path={`${match.url}/department`}
              render={(props) => <Department {...props} />}
            />
            <Route
              path={`${match.url}/designation`}
              render={(props) => <Designation {...props} />}
            />
             <Route
              path={`${match.url}/process`}
              render={(props) => <Process {...props} />}
            />

            <Route
              path={`${match.url}/location`}
              render={(props) => <Location {...props} />}
            />
            <Route
              path={`${match.url}/md`}
              render={(props) => <MD {...props} />}
            />
            <Route
              path={`${match.url}/tl`}
              render={(props) => <TL {...props} />}
            />
            <Route
              path={`${match.url}/director`}
              render={(props) => <Director {...props} />}
            />
            <Route
              path={`${match.url}/manager`}
              render={(props) => <Manager {...props} />}
            />
           <Route
              path={`${match.url}/usermanagement`}
              render={(props) => <Usermanagement {...props} />}
            />
            <Route
              path={`${match.url}/rolemanagment`}
              render={(props) => <Role {...props} />}
            />
            <Route
              path={`${match.url}/outgoingserver`}
              render={(props) => <Outgoingserver {...props} />}
            />
             <Route
              path={`${match.url}/rolepermission`}
              render={(props) => <RolePermission {...props} />}
            />
           
            <Route
              path={`${match.url}/level`}
              render={(props) => <Level {...props} />}
            />
            <Route
              path={`${match.url}/errorupload`}
              render={(props) => <ErrorUpload {...props} />}
            />
            <Route
              path={`${match.url}/errorremoval`}
              render={(props) => <ErrorRemoval {...props} />}
            />
            <Route
              path={`${match.url}/attendanceupload`}
              render={(props) => <AttendanceUpload {...props} />}
            />
            <Route
              path={`${match.url}/userperformance`}
              render={(props) => <UserPerformance {...props} />}
            />
            <Route
              path={`${match.url}/vbb`}
              render={(props) => <ValueBasedBehaviour {...props} />}
            />
            <Route
              path={`${match.url}/vbbmaster`}
              render={(props) => <VBBMaster {...props} />}
            />
             <Route
              path={`${match.url}/user-rating`}
              render={(props) => <UserRating {...props} />}
            />
            <Route
              path={`${match.url}/slabs_upload`}
              render={(props) => <SlabsUpload {...props} />}
            />
             <Route
              path={`${match.url}/test`}
              render={(props) => <Test {...props} />}
            />
             <Route
              path={`${match.url}/chatai`}
              render={(props) => <AIChat {...props} />}
            />
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
  export default Master;