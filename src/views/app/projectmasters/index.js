import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import dectype from './dectype';

const Department = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './department')
);
const Team = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './team')
);
const ABC = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './abc')
);
const Handling = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './handling')
);
const Reasons = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './reasons')
);
const CargoType = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './cargotype')
);
const BookingType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './bookingtype')
);
const RequestType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './requesttype')
);
const Region = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './region')
);
const Remarks = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './remarks')
);
const Exception = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './exception')
);
const Errortype = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './errortype')
);
const AMTType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './amttype')
);
const Erroruserid = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './erroruserid')
);
const Buddyuserid = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './buddyuserid')
);
const Area = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './area')
);


const HlclFormat = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './hlclformat')
);

const ActivityType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './activitytype')
);
const VesselOprator = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './vesseloperator')
);

const InputStatus = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './inputstatus')
);
const DecType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './dectype')
);
const Typeofot = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './typeofot')
);

const IssuerCode = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './issuercode')
);
const CustomType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './customtype')
);
const EposArea = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './eposarea')
);
const EposActivity = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './eposactivity')
);
const AreaStreet = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './areastreet')
);
const AreaTpfrep = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './areatpfrep')
);
const ActivityTpfrep = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './activitytpfrep')
);
const ActivityTime = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './activitytime')
);
const AreaTime = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './areatime')
);
const TypeBulk = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './typebulk')
);


const AreaError = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './areaerror')
);
const RegionError = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './regionerror')
);
const ActivityTypeError = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './activitytypeerror')
);
const SourceError = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './sourceerror')
);
const TypeofReport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './typeofreport')
);
const AreaBulk = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './areabulk')
);
const ActivityBulk = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './activitybulk')
);

// const MISTeams = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-blank-page" */ './misteam')
// );
// const MISCategory = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-blank-page" */ './miscategory')
// );
// const MISReportFor = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-blank-page" */ './misreportfor')
// );
// const MISFor = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-blank-page" */ './misfor')
// );
// const MISSupervisor = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-blank-page" */ './missupervisor')
// );
// const MISQSCMaster = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-blank-page" */ './misqscmaster')
// );
// const Tendername = React.lazy(() =>
// import(/* webpackChunkName: "viwes-blank-page" */ './Tender/tendername')
// );
// const Tendertype = React.lazy(() =>
// import(/* webpackChunkName: "viwes-blank-page" */ './Tender/tendertype')
// );
// const Tendercategory = React.lazy(() =>
// import(/* webpackChunkName: "viwes-blank-page" */ './Tender/tendercategory')
// );
// const Tenderarea = React.lazy(() =>
// import(/* webpackChunkName: "viwes-blank-page" */ './Tender/tenderarea')
// );
// const Tendererrorseverity = React.lazy(() =>
// import(/* webpackChunkName: "viwes-blank-page" */ './Tender/tendererrorseverity')
// );
// const Tendererrorstatus = React.lazy(() =>
// import(/* webpackChunkName: "viwes-blank-page" */ './Tender/tendererrorstatus')
// );
// const Tendererrortype = React.lazy(() =>
// import(/* webpackChunkName: "viwes-blank-page" */ './Tender/tendererrortype')
// );
// const Tenderfeedback = React.lazy(() =>
// import(/* webpackChunkName: "viwes-blank-page" */ './Tender/tenderfeedback')
// );

// const Tenderquerytype = React.lazy(() =>
// import(/* webpackChunkName: "viwes-blank-page" */ './Tender/tenderquerytype')
// );
// const Tenderround = React.lazy(() =>
// import(/* webpackChunkName: "viwes-blank-page" */ './Tender/tenderround')
// );
// const Tendersection = React.lazy(() =>
// import(/* webpackChunkName: "viwes-blank-page" */ './Tender/tendersection')
// );
// const Tenderactivity = React.lazy(() =>
// import(/* webpackChunkName: "viwes-blank-page" */ './Tender/tenderactivity')
// );
// const Tendersubactivity = React.lazy(() =>
// import(/* webpackChunkName: "viwes-blank-page" */ './Tender/tendersubactivity')
// );
const DndArea = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './dndarea')
);
const DndSubArea = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './dndsubarea')
);
const ErrorVesselOperator = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './errorvesseloperator')
);

// const Supportteam = React.lazy(() =>
// import(/* webpackChunkName: "viwes-blank-page" */ './supportteam')
// );


const Time = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './time')
);
const StturnCode = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './stturncode')
);
const Reportedby = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './reportby')
);
const Activitys = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './activitys')
);
const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/abc`} />
         
             <Route
              path={`${match.url}/team`}
              render={(props) => <Team {...props} />}
            />
             <Route
              path={`${match.url}/abc`}
              render={(props) => <ABC {...props} />}
            />
             <Route
              path={`${match.url}/handling`}
              render={(props) => <Handling {...props} />}
            />
             <Route
              path={`${match.url}/reasons`}
              render={(props) => <Reasons {...props} />}
            />
             <Route
              path={`${match.url}/cargotype`}
              render={(props) => <CargoType {...props} />}
            />
            <Route
              path={`${match.url}/bookingtype`}
              render={(props) => <BookingType {...props} />}
            />
             <Route
              path={`${match.url}/requesttype`}
              render={(props) => <RequestType {...props} />}
            />
             <Route
              path={`${match.url}/region`}
              render={(props) => <Region {...props} />}
            />
             <Route
              path={`${match.url}/department`}
              render={(props) => <Department {...props} />}
            />
             <Route
              path={`${match.url}/amttype`}
              render={(props) => <AMTType {...props} />}
            />
           <Route
              path={`${match.url}/exception`}
              render={(props) => <Exception {...props} />}
            />
             <Route
              path={`${match.url}/erroruserid`}
              render={(props) => <Erroruserid {...props} />}
            />
             <Route
              path={`${match.url}/buddyuserid`}
              render={(props) => <Buddyuserid {...props} />}
            />
             <Route
              path={`${match.url}/errortype`}
              render={(props) => <Errortype {...props} />}
            />
             <Route
              path={`${match.url}/remarks`}
              render={(props) => <Remarks {...props} />}
            />
            <Route
              path={`${match.url}/area`}
              render={(props) => <Area {...props} />}
            />
             
             <Route
              path={`${match.url}/activitytype`}
              render={(props) => <ActivityType {...props} />}
            />
             <Route
              path={`${match.url}/hlclformat`}
              render={(props) => <HlclFormat {...props} />}
            />
             <Route
              path={`${match.url}/vesseloperator`}
              render={(props) => <VesselOprator {...props} />}
            />
             <Route
              path={`${match.url}/inputstatus`}
              render={(props) => <InputStatus {...props} />}
            />
             <Route
              path={`${match.url}/dectype`}
              render={(props) => <DecType {...props} />}
            />
             <Route
              path={`${match.url}/typeofot`}
              render={(props) => <Typeofot {...props} />}
            />
                <Route
              path={`${match.url}/issuercode`}
              render={(props) => <IssuerCode {...props} />}
            />
              <Route
              path={`${match.url}/customtype`}
              render={(props) => <CustomType {...props} />}
            />
             <Route
              path={`${match.url}/eposarea`}
              render={(props) => <EposArea {...props} />}
            />
             <Route
              path={`${match.url}/eposactivity`}
              render={(props) => <EposActivity {...props} />}
            />
              <Route
              path={`${match.url}/areastreet`}
              render={(props) => <AreaStreet {...props} />}
            />
             <Route
              path={`${match.url}/areatpfrep`}
              render={(props) => <AreaTpfrep {...props} />}
            />
             <Route
              path={`${match.url}/activitytpfrep`}
              render={(props) => <ActivityTpfrep {...props} />}
            />
             <Route
              path={`${match.url}/activitytime`}
              render={(props) => <ActivityTime {...props} />}
            />
             <Route
              path={`${match.url}/areatime`}
              render={(props) => <AreaTime {...props} />}
            />
             <Route
              path={`${match.url}/typebulk`}
              render={(props) => <TypeBulk {...props} />}
            />
           

          <Route
              path={`${match.url}/areaerror`}
              render={(props) => <AreaError {...props} />}
            />
             <Route
              path={`${match.url}/regionerror`}
              render={(props) => <RegionError {...props} />}
            />
             <Route
              path={`${match.url}/activitytypeerror`}
              render={(props) => <ActivityTypeError {...props} />}
            />
             <Route
              path={`${match.url}/sourceerror`}
              render={(props) => <SourceError {...props} />}
            />
             <Route
              path={`${match.url}/typeofreport`}
              render={(props) => <TypeofReport {...props} />}
            />
             <Route
              path={`${match.url}/areabulk`}
              render={(props) => <AreaBulk {...props} />}
            />
             <Route
              path={`${match.url}/activitybulk`}
              render={(props) => <ActivityBulk {...props} />}
            />
             
             {/* <Route
              path={`${match.url}/miscategory`}
              render={(props) => <MISCategory {...props} />}
            />
             <Route
              path={`${match.url}/misteam`}
              render={(props) => <MISTeams {...props} />}
            /> 
             <Route
              path={`${match.url}/misfor`}
              render={(props) => <MISFor {...props} />}
            />
             <Route
              path={`${match.url}/missupervisor`}
              render={(props) => <MISSupervisor {...props} />}
            />
             <Route
              path={`${match.url}/misreportfor`}
              render={(props) => <MISReportFor {...props} />}
            />
             <Route
              path={`${match.url}/misqscmaster`}
              render={(props) => <MISQSCMaster {...props} />}
            />  */}
              {/* <Route
              path={`${match.url}/tendername`}
              render={(props) => <Tendername {...props} />}
            />
             <Route
              path={`${match.url}/tendertype`}
              render={(props) => <Tendertype {...props} />}
            />
             <Route
              path={`${match.url}/tendercategory`}
              render={(props) => <Tendercategory {...props} />}
            />
             <Route
              path={`${match.url}/tenderarea`}
              render={(props) => <Tenderarea {...props} />}
            />
             <Route
              path={`${match.url}/tendererrorseverity`}
              render={(props) => <Tendererrorseverity {...props} />}
            />
            <Route
              path={`${match.url}/tendererrorstatus`}
              render={(props) => <Tendererrorstatus {...props} />}
            />
             <Route
              path={`${match.url}/tendererrortype`}
              render={(props) => <Tendererrortype {...props} />}
            />
             <Route
              path={`${match.url}/tenderfeedback`}
              render={(props) => <Tenderfeedback {...props} />}
            />
             <Route
              path={`${match.url}/tenderquerytype`}
              render={(props) => <Tenderquerytype {...props} />}
            />
             <Route
              path={`${match.url}/tenderround`}
              render={(props) => <Tenderround {...props} />}
            />
           <Route
              path={`${match.url}/tendersection`}
              render={(props) => <Tendersection {...props} />}
            />
             <Route
              path={`${match.url}/tenderactivity`}
              render={(props) => <Tenderactivity {...props} />}
            />
             <Route
              path={`${match.url}/tendersubactivity`}
              render={(props) => <Tendersubactivity {...props} />}
            /> */}
             <Route
              path={`${match.url}/dndarea`}
              render={(props) => <DndArea {...props} />}
            />
             <Route
              path={`${match.url}/dndsubarea`}
              render={(props) => <DndSubArea {...props} />}
            />
             <Route
              path={`${match.url}/errorvesseloperator`}
              render={(props) => <ErrorVesselOperator {...props} />}
            />
            {/* <Route
              path={`${match.url}/supportteam`}
              render={(props) => <Supportteam {...props} />}
            /> */}
            <Route
              path={`${match.url}/time`}
              render={(props) => <Time {...props} />}
            />
            <Route
              path={`${match.url}/stturncode`}
              render={(props) => <StturnCode {...props} />}
            />
            <Route
              path={`${match.url}/reportby`}
              render={(props) => <Reportedby {...props} />}
            />
             <Route
              path={`${match.url}/activitys`}
              render={(props) => <Activitys {...props} />}
            />
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
  export default Master;