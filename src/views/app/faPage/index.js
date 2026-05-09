import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const PostFreightAudit = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './postfreightaudit')
);

const FreightAudit = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './freightaudit')
);

const ShipmentDetails = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './shipment-details')
);
const ShipmentList = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './shipmentlist')
);
const ShipmentAuditinformation = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './frightauditinformation')
);
const Report = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './Report')
);

const DataSelected = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/data')
);
const Quality = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/quality')
);
const ErrorType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/errortype')
);
const QualityExport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/qualityexport')
);
const QualityImport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/qualityimport')
);
const Subregion = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/subregion')
);
const Area = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/area')
);
const Region = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/region')
);
const Eqmaster = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/eqmaster')
);
const Productivityreport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './productivity-report')
);
const Shipmentexportrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/shipmentexportrawdata.js')
);
const Shipmentimportrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/shipmentimportrawdata.js')
);
const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/shipment-details`} />
        <Route
            path={`${match.url}/postfreight`}
            render={(props) => <PostFreightAudit {...props} />}
          />    
           <Route
            path={`${match.url}/freightaudit`}
            render={(props) => <FreightAudit {...props} />}
          /> 
           <Route
            path={`${match.url}/shipment-details`}
            render={(props) => <ShipmentDetails {...props} />}
          />     
           <Route
            path={`${match.url}/shipmentlist`}
            render={(props) => <ShipmentList {...props} />}
          />     
           <Route
            path={`${match.url}/frightauditinformation`}
            render={(props) => <ShipmentAuditinformation {...props} />}
          />  
          <Route
            path={`${match.url}/Report`}
            render={(props) => <Report {...props} />}
          />    

          
           <Route
            path={`${match.url}/master/data`}
            render={(props) => <DataSelected {...props} />}
          />  
           <Route
            path={`${match.url}/master/quality`}
            render={(props) => <Quality {...props} />}
          />  
           <Route
            path={`${match.url}/master/errortype`}
            render={(props) => <ErrorType {...props} />}
          />    
           <Route
            path={`${match.url}/master/qualityexport`}
            render={(props) => <QualityExport {...props} />}
          />    
           <Route
            path={`${match.url}/master/qualityimport`}
            render={(props) => <QualityImport {...props} />}
          />    
           <Route
            path={`${match.url}/master/subregion`}
            render={(props) => <Subregion {...props} />}
          />   
           <Route
            path={`${match.url}/master/area`}
            render={(props) => <Area {...props} />}
          />    
           <Route
            path={`${match.url}/productivity-report`}
            render={(props) => <Productivityreport {...props} />}
          />    
          <Route
            path={`${match.url}/master/eqmaster`}
            render={(props) => <Eqmaster {...props} />}
          />     
           <Route
            path={`${match.url}/rawdata/shipmentimportrawdata`}
            render={(props) => <Shipmentimportrawdata {...props} />}
          />    
           <Route
            path={`${match.url}/rawdata/shipmentexportrawdata`}
            render={(props) => <Shipmentexportrawdata {...props} />}
          />   
           <Route
            path={`${match.url}/master/region`}
            render={(props) => <Region {...props} />}
          />  
          <Route
            path={`${match.url}/master/eqmaster`}
            render={(props) => <Eqmaster {...props} />}
          />    
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
  export default Master;