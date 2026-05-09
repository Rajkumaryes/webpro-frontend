import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Vesselinfo = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './vesselinfo')
);
const CAPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './capage')
);
const DOForm = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './doform')
);
const ReleaseForm = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './releaseform')
);
const DOQuery = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './doquery')
);
const DoradmailCount = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './doradmailcount')
);
const Communication = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './communication')
);
const VesselPosting = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './vesselposting')
);
const CRMProcess = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './crm')
);
const Reports = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './reports')
);
const DomesticInvoice = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './domesticinvoice')
);
const CsiErrorCapture = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './csierrorcapturing')
);
const InvoceCancel = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './invoicecancelation')
);

const Checklist = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/checklist')
);
const ChecklistDay = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/checklistday')
);
const Activity = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/activity')
);
const SubActivity = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/subactivity')
);
const ReasonCode = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/reasoncode')
);
const AcceptedRefuted = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/acceptedrefuted')
);
const Report = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/report')
);
const ErrorCode = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/errorcode')
);
const CustomType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/customstype')
);
const Charges = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/charges')
);
const Type = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/type')
);
const Area = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/areaimport')
);
const CrmActivity = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/crmactivity')
);
const Region = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/regionimport')
);
const Releasetype = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/releasetype')
);
const Domestictype = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/domestictype')
);

const CSIActivity = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/csi-error-activity')
);
const EQMaster = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/eqmaster')
);

const EqCommunication = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/eq-communication')
);

const DeliveryorderTeam = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/deliveryorder_team')
);

const ProductivityReport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './productivity-report')
);
const KPIReport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './kpireport')
);
const Master = ({ match }) => (
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
            render={(props) => <DOForm {...props} />}
          />
           <Route
            path={`${match.url}/releaseform`}
            render={(props) => <ReleaseForm {...props} />}
          />
          <Route
            path={`${match.url}/doquery`}
            render={(props) => <DOQuery {...props} />}
          />
          <Route
            path={`${match.url}/doradmailcount`}
            render={(props) => <DoradmailCount {...props} />}
          />
            <Route
            path={`${match.url}/communication`}
            render={(props) => <Communication {...props} />}
          />  
           <Route
            path={`${match.url}/vesselposting`}
            render={(props) => <VesselPosting {...props} />}
          /> 
           <Route
            path={`${match.url}/crm`}
            render={(props) => <CRMProcess {...props} />}
          /> 
            <Route
              path={`${match.url}/master/report`}
              render={(props) => <Report {...props} />}
            />  
           <Route
            path={`${match.url}/domesticinvoice`}
            render={(props) => <DomesticInvoice {...props} />}
          />  
            <Route
            path={`${match.url}/csierrorcapturing`}
            render={(props) => <CsiErrorCapture {...props} />}
          />  
            <Route
            path={`${match.url}/invoicecancelation`}
            render={(props) => <InvoceCancel {...props} />}
          />  
          <Route
            path={`${match.url}/vesselmaster/checklist`}
            render={(props) => <Checklist {...props} />}
          /> 
            <Route
            path={`${match.url}/checklistdaymaster/checklistday`}
            render={(props) => <ChecklistDay {...props} />}
          /> 
            <Route
            path={`${match.url}/mastervessel/activity`}
            render={(props) => <Activity {...props} />}
          /> 
          <Route
            path={`${match.url}/csierrormaster/subactivity`}
            render={(props) => <SubActivity {...props} />}
          />
           <Route
            path={`${match.url}/invoicemaster/reasoncode`}
            render={(props) => <ReasonCode {...props} />}
          />
           <Route
            path={`${match.url}/invoicemaster/acceptedrefuted`}
            render={(props) => <AcceptedRefuted {...props} />}
          />
           <Route
            path={`${match.url}/reports`}
            render={(props) => <Reports {...props} />}
          />
           <Route
            path={`${match.url}/csierrormaster/errorcode`}
            render={(props) => <ErrorCode {...props} />}
          />
          <Route
            path={`${match.url}/communicationmaster/customstype`}
            render={(props) => <CustomType {...props} />}
          />
             <Route
            path={`${match.url}/communicationmaster/eq-communication`}
            render={(props) => <EqCommunication {...props} />}
          />
           <Route
            path={`${match.url}/realsemaster/charges`}
            render={(props) => <Charges {...props} />}
          />
           <Route
            path={`${match.url}/docountmaster/type`}
            render={(props) => <Type {...props} />}
          />
           <Route
            path={`${match.url}/master/areaimport`}
            render={(props) => <Area {...props} />}
          />
           <Route
            path={`${match.url}/master/crmactivity`}
            render={(props) => <CrmActivity {...props} />}
          />
          <Route
            path={`${match.url}/master/regionimport`}
            render={(props) => <Region {...props} />}
          />
           <Route
            path={`${match.url}/realsemaster/releasetype`}
            render={(props) => <Releasetype {...props} />}
          />

          <Route
            path={`${match.url}/domesticmaster/domestictype`}
            render={(props) => <Domestictype {...props} />}
          />
          <Route
            path={`${match.url}/csierrormaster/csi-error-activity`}
            render={(props) => <CSIActivity {...props} />}
          />
          <Route
            path={`${match.url}/master/eqmaster`}
            render={(props) => <EQMaster {...props} />}
          />
          <Route
            path={`${match.url}/deliverymaster/deliveryorder_team`}
            render={(props) => <DeliveryorderTeam {...props} />}
          />
            <Route
              path={`${match.url}/productivity-report`}
              render={(props) => <ProductivityReport {...props} />}
            /> 
             <Route
              path={`${match.url}/kpireport`}
              render={(props) => <KPIReport {...props} />}
            /> 
          
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
  export default Master;