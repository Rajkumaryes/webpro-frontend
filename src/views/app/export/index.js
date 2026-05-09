import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const MatchCode = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './matchcode')
);
const InputSheet = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './inputSheet')
);

const CorrectionSheet = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './CorrectionSheet')
);
const Comunicationsheet = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './communicationsheet')
);

const QueryResolveSheet = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './queryResolvesheet')
);
const AuditSheet = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './auditSheet')
);

const COD = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './COD')
);

const Indexing = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './indexing')
);
const Realese = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './realese')
);
const Rut_Invoice = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rut_invoice')
);
const SI_Remainder = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './si-remainder')
);
const ErrorModule = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './errormodule')
);
const CRMCaseHandling = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './crmcasehandling')
);
const CustomsandObl = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './customsandobl')
);
const OT = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './ot')
);
const Report = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './reports')
);
const ExportTeam = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/exportteam')
);
const ExportRegion = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/exportregion')
);
const ExportArea = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/exportarea')
);
const Country = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/country')
);
const Purpose = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/purpose')
);
const RequestType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/requesttype')
);
const ListView = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/listview')
);
const CRMActivity = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/crmactivity')
);
const OBLActivity = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/oblactivity')
);
const CRMStatusofcase = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/crmstatusofcase')
);
const Remarks = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/remarks')
);
const Exception = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './masters/exception')
);
const Errortype = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/errortype')
);
const AMTType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/amttype')
);
const DPREType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/dpretype')
);
const Typeofot = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/typeofot')
);
const IssuerCode = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/issuercode')
);
const CustomType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/customtype')
);
const Eqmaster = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/eqmaster')
);
const AuditCategory = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/auditcategory')
);
const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './dashboard')
);
const Productivity_report = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './productivity-report')
);

const Teamsite = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/teamsite')
);
const ViewUnauthorized = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ '../../../views/unauthorized')
);

const Master = ({ match }) => {
  const allowedRoleIds = {};
  const menuData = JSON.parse(localStorage.getItem("menuData"));
const exportsMenu = menuData ? menuData.filter((menu) => menu.key === "Exports") : [];
const firstExport = exportsMenu.length > 0 ? exportsMenu[0] : null;
const children = firstExport ? firstExport.children : [];
children.forEach((item) => {
  allowedRoleIds[item.key] = item.role_id;
});
const roleID = parseInt(localStorage.getItem("role_id"));

  return (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/inputsheet`} />
        {/* <Route
              path={`${match.url}/matchcode`}
              render={(props) => <MatchCode {...props} />}
            /> */}
        <Route
            path={`${match.url}/matchcode`}
            render={(props) => {
              if (allowedRoleIds["Match Code Creation"].includes(roleID)) {
                return <MatchCode {...props} /> 
              } else {
                return <ViewUnauthorized {...props} />
              }}}
          />
        
        {/* <Route
              path={`${match.url}/inputsheet`}
              render={(props) => <InputSheet {...props} /> 
              }
            /> */}
          <Route
            path={`${match.url}/inputsheet`}
            render={(props) => {
              if (allowedRoleIds["Input Sheet"].includes(roleID)) {
                return <InputSheet {...props} /> 
              } else {
                return <ViewUnauthorized {...props} />
              }}}
          />
             {/* <Route
              path={`${match.url}/correctionsheet`}
              render={(props) => <CorrectionSheet {...props} />}
            /> */}
            <Route
            path={`${match.url}/correctionsheet`}
            render={(props) => {
              if (allowedRoleIds["Correction Sheet"].includes(roleID)) {
                return <CorrectionSheet {...props} /> 
              } else {
                return <ViewUnauthorized {...props} />
              }}}
          />
             {/* <Route
              path={`${match.url}/communicationsheet`}
              render={(props) => <Comunicationsheet {...props} />}
            /> */}
             <Route
            path={`${match.url}/communicationsheet`}
            render={(props) => {
              if (allowedRoleIds["Communication & Transmission Level Sheet"].includes(roleID)) {
                return <Comunicationsheet {...props} /> 
              } else {
                return <ViewUnauthorized {...props} />
              }}}
          />
             {/* <Route
              path={`${match.url}/queryResolvesheet`}
              render={(props) => <QueryResolveSheet {...props} />}
            /> */}
            <Route
            path={`${match.url}/queryResolvesheet`}
            render={(props) => {
              if (allowedRoleIds["Query Resolve Sheet"].includes(roleID)) {
                return <QueryResolveSheet {...props} /> 
              } else {
                return <ViewUnauthorized {...props} />
              }}}
          />
            <Route
              path={`${match.url}/auditSheet`}
              render={(props) => {
                if (allowedRoleIds["Audit Sheet"].includes(roleID)) {
                  return <AuditSheet {...props} /> 
                } else {
                  return <ViewUnauthorized {...props} />
                }}}
          
            />
             {/* <Route
              path={`${match.url}/cod`}
              render={(props) => <COD {...props} />}
            /> */}
             <Route
              path={`${match.url}/cod`}
              render={(props) => {
                if (allowedRoleIds["POST BOT Process"].includes(roleID)) {
                  return <COD {...props} /> 
                } else {
                  return <ViewUnauthorized {...props} />
                }}}
            />
             <Route
              path={`${match.url}/indexing`}
              render={(props) => <Indexing {...props} />}
            />
            {/* <Route
              path={`${match.url}/indexing`}
              render={(props) => {
                if (allowedRoleIds["Indexing Process"].includes(roleID)) {
                  return <Indexing {...props} /> 
                } else {
                  return <ViewUnauthorized {...props} />
                }}}
            /> */}
              {/* <Route
              path={`${match.url}/realese`}
              render={(props) => <Realese {...props} />}
            /> */}
            <Route
              path={`${match.url}/realese`}
              render={(props) => {
                if (allowedRoleIds["Release"].includes(roleID)) {
                  return <Realese {...props} /> 
                } else {
                  return <ViewUnauthorized {...props} />
                }}}
            />
              {/* <Route
              path={`${match.url}/rut_invoice`}
              render={(props) => <Rut_Invoice {...props} />}
            /> */}
            <Route
              path={`${match.url}/rut_invoice`}
              render={(props) => {
                if (allowedRoleIds["RUT, Invoice & SDC"].includes(roleID)) {
                  return <Rut_Invoice {...props} /> 
                } else {
                  return <ViewUnauthorized {...props} />
                }}}
            />
            {/* <Route
              path={`${match.url}/si-remainder`}
              render={(props) => <SI_Remainder {...props} />}
            /> */}
            <Route
              path={`${match.url}/si-remainder`}
              render={(props) => {
                if (allowedRoleIds["SI Reminder"].includes(roleID)) {
                  return <SI_Remainder {...props} /> 
                } else {
                  return <ViewUnauthorized {...props} />
                }}}
            />
               {/* <Route
              path={`${match.url}/errormodule`}
              render={(props) => <ErrorModule {...props} />}
            /> */}
            <Route
              path={`${match.url}/errormodule`}
              render={(props) => {
                if (allowedRoleIds["Error Module"].includes(roleID)) {
                  return <ErrorModule {...props} /> 
                } else {
                  return <ViewUnauthorized {...props} />
                }}}
            />
            <Route
              path={`${match.url}/crmcasehandling`}
              render={(props) => {
                if (allowedRoleIds["CRM Case Handling"].includes(roleID)) {
                  return <CRMCaseHandling {...props} /> 
                } else {
                  return <ViewUnauthorized {...props} />
                }}}
            />
             <Route
              path={`${match.url}/customsandobl`}
              render={(props) => {
                if (allowedRoleIds["Customs and OBL"].includes(roleID)) {
                  return <CustomsandObl {...props} /> 
                } else {
                  return <ViewUnauthorized {...props} />
                }}}
            />
               {/* <Route
              path={`${match.url}/ot`}
              render={(props) => <OT {...props} />}
            /> */}
            <Route
              path={`${match.url}/ot`}
              render={(props) => {
                if (allowedRoleIds["OT"].includes(roleID)) {
                  return <OT {...props} /> 
                } else {
                  return <ViewUnauthorized {...props} />
                }}}
            />
             {/* <Route
              path={`${match.url}/report`}
              render={(props) => <Report {...props} />}
            /> */}
            <Route
              path={`${match.url}/report`}
              render={(props) => {
                if (allowedRoleIds["Export Raw Data"] && allowedRoleIds["Export Raw Data"].includes(roleID)) {
                  return <Report {...props} /> 
                } else {
                  return <ViewUnauthorized {...props} />
                }
              }}
            />
            <Route
              path={`${match.url}/ot`}
              render={(props) => {
                if (allowedRoleIds["OT"].includes(roleID)) {
                  return <OT {...props} /> 
                } else {
                  return <ViewUnauthorized {...props} />
                }}}
            />
             <Route
              path={`${match.url}/master/exportteam`}
              render={(props) => <ExportTeam {...props} />}
            />
             <Route
              path={`${match.url}/master/exportregion`}
              render={(props) => <ExportRegion {...props} />}
            />
             <Route
              path={`${match.url}/master/exportarea`}
              render={(props) => <ExportArea {...props} />}
            />
              <Route
              path={`${match.url}/master/country`}
              render={(props) => <Country {...props} />}
            />
              <Route
              path={`${match.url}/master/purpose`}
              render={(props) => <Purpose {...props} />}
            />
             <Route
              path={`${match.url}/master/requesttype`}
              render={(props) => <RequestType {...props} />}
            />
             <Route
              path={`${match.url}/master/listview`}
              render={(props) => <ListView {...props} />}
            />
             <Route
              path={`${match.url}/master/crmactivity`}
              render={(props) => <CRMActivity {...props} />}
            />
             <Route
              path={`${match.url}/master/oblactivity`}
              render={(props) => <OBLActivity {...props} />}
            />
            <Route
              path={`${match.url}/master/crmstatusofcase`}
              render={(props) => <CRMStatusofcase {...props} />}
            />
               <Route
              path={`${match.url}/master/remarks`}
              render={(props) => <Remarks {...props} />}
            />
              <Route
              path={`${match.url}/master/exception`}
              render={(props) => <Exception {...props} />}
            />
               <Route
              path={`${match.url}/master/errortype`}
              render={(props) => <Errortype {...props} />}
            />
               <Route
              path={`${match.url}/master/amttype`}
              render={(props) => <AMTType {...props} />}
            />
               <Route
              path={`${match.url}/master/dpretype`}
              render={(props) => <DPREType {...props} />}
            />
               <Route
              path={`${match.url}/master/typeofot`}
              render={(props) => <Typeofot {...props} />}
            />
                 <Route
              path={`${match.url}/master/issuercode`}
              render={(props) => <IssuerCode {...props} />}
            />
            <Route
              path={`${match.url}/master/customtype`}
              render={(props) => <CustomType {...props} />}
            />
            <Route
              path={`${match.url}/master/eqmaster`}
              render={(props) => <Eqmaster {...props} />}
            />
             <Route
              path={`${match.url}/master/auditcategory`}
              render={(props) => <AuditCategory {...props} />}
            />
            <Route
              path={`${match.url}/master/teamsite`}
              render={(props) => <Teamsite {...props} />}
            />
            
             <Route
              path={`${match.url}/dashboard`}
              render={(props) => <Dashboard {...props} />}
            />
            {/* <Route
            path={`${match.url}/productivity-report`}
            render={(props) => <Productivity_report {...props} />}
          />  */}


<Route
            path={`${match.url}/productivity-report`}
            render={(props) => {
              if (allowedRoleIds["Productivity Report"].includes(roleID)) {
                return <Productivity_report {...props} /> 
              } else {
                return <ViewUnauthorized {...props} />
              }}}
          />



        <Redirect to="/error" />
      </Switch>
    </Suspense>)
}
  export default Master;