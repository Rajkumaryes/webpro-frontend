import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Errorhandling = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './errorhandling')
);
const Streetturns = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../epos/streetturns')
);

const Adhocbulkupload = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './adhocbulkupload')
);
const TPFREPproductivity = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ '../epos/TPFREPproductivity')
);
const Timemonitoring = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../epos/timemonitoring')
);
const Errorcapturemodule = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../epos/Errorcapturemodule')
);

const FeederSchedules = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../epos/feeder-schedules')
);
const EposActivity = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/eposactivity')
);
// const AreaStreet = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-blank-page" */ './masters/areastreet')
// );
const AreaTpfrep = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/areatpfrep')
);
const ActivityTpfrep = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/activitytpfrep')
);
const ActivityTime = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/activitytime')
);
// const AreaTime = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-blank-page" */ './masters/areatime')
// );
const TypeBulk = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/typebulk')
);

const Reportedby = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './masters/reportby')
);
const AreaError = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/areaerror')
);
const RegionError = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/regionerror')
);
const ActivityTypeError = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/activitytypeerror')
);
const SourceError = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/sourceerror')
);
const TypeofReport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/typeofreport')
);
const AreaBulk = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/areabulk')
);
// const ActivityBulk = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-blank-page" */ './masters/activitybulk')
// );


const HlclFormat = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/hlclformat')
);

const StturnCode = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './masters/stturncode')
);

const Time = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './masters/time')
);
const Activitys = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './masters/activitys')
);
const Reports = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './reports')
);
const Report = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './report')
);
const Eqmaster = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/eqmaster')
);
const Productivity_report = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ '../epos/productivity-report')
);
const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/errorhandling`} />
        <Route
              path={`${match.url}/errorhandling`}
              render={(props) => <Errorhandling {...props} />}
            />
           <Route
            path={`${match.url}/streetturns`}
            render={(props) => <Streetturns {...props} />}
          /> 
          <Route
              path={`${match.url}/adhocbulkupload`}
              render={(props) => <Adhocbulkupload {...props} />}
            />
          <Route
            path={`${match.url}/timemonitoring`}
            render={(props) => <Timemonitoring {...props} />}
          />  
          <Route
            path={`${match.url}/TPFREPproductivity`}
            render={(props) => <TPFREPproductivity {...props} />}
          /> 
            <Route
            path={`${match.url}/feeder-schedules`}
            render={(props) => <FeederSchedules {...props} />}
          /> 
          <Route
            path={`${match.url}/Errorcapturemodule`}
            render={(props) => <Errorcapturemodule {...props} />}
          /> 
            <Route
              path={`${match.url}/reports`}
              render={(props) => <Reports {...props} />}
            />
              <Route
              path={`${match.url}/errorhandlingmaster/eposactivity`}
              render={(props) => <EposActivity {...props} />}
            />
   {/* <Route
              path={`${match.url}/areastreet`}
              render={(props) => <AreaStreet {...props} />}
            /> */}
             <Route
              path={`${match.url}/tpfrepproductivitymaster/areatpfrep`}
              render={(props) => <AreaTpfrep {...props} />}
            />
             <Route
              path={`${match.url}/tpfrepproductivitymaster/activitytpfrep`}
              render={(props) => <ActivityTpfrep {...props} />}
            />
             <Route
              path={`${match.url}/timependingmonitoring/activitytime`}
              render={(props) => <ActivityTime {...props} />}
            />
               <Route
              path={`${match.url}/timependingmonitoring/time`}
              render={(props) => <Time {...props} />}
            />
             <Route
              path={`${match.url}/adhocbulkproductivitymasters/typebulk`}
              render={(props) => <TypeBulk {...props} />}
            />
                <Route
              path={`${match.url}/errorhandlingmaster/reportby`}
              render={(props) => <Reportedby {...props} />}
            />
           

          <Route
              path={`${match.url}/errorcaputruemaster/areaerror`}
              render={(props) => <AreaError {...props} />}
            />
             <Route
              path={`${match.url}/errorcaputruemaster/regionerror`}
              render={(props) => <RegionError {...props} />}
            />
             <Route
              path={`${match.url}/errorcaputruemaster/activitytypeerror`}
              render={(props) => <ActivityTypeError {...props} />}
            />
             <Route
              path={`${match.url}/errorcaputruemaster/sourceerror`}
              render={(props) => <SourceError {...props} />}
            />
             <Route
              path={`${match.url}/errorcaputruemaster/typeofreport`}
              render={(props) => <TypeofReport {...props} />}
            />
             <Route
              path={`${match.url}/areabulk`}
              render={(props) => <AreaBulk {...props} />}
            />
             {/* <Route
              path={`${match.url}/activitybulk`}
              render={(props) => <ActivityBulk {...props} />}
            /> */}
                 <Route
              path={`${match.url}/tpfrepproductivitymaster/hlclformat`}
              render={(props) => <HlclFormat {...props} />}
            />

             <Route
              path={`${match.url}/streetturnsmaster/stturncode`}
              render={(props) => <StturnCode {...props} />}
            />
                <Route
              path={`${match.url}/errorcaputruemaster/activitys`}
              render={(props) => <Activitys {...props} />}
            />
            <Route
            path={`${match.url}/report`}
            render={(props) => <Report {...props} />}
          />
          <Route
            path={`${match.url}/master/eqmaster`}
            render={(props) => <Eqmaster {...props} />}
          />
          <Route
            path={`${match.url}/productivity-report`}
            render={(props) => <Productivity_report {...props} />}
          /> 
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
  export default Master;