import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const QuotationDetails = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './quotation-details')
);
const CorrectionLog = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './correction-log')
);
const GeneralInformation = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './general-information')
);
const Administrator = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './administrator')
);

const Report = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './report')
);

const ControlPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './controlpage')
);
const SharedPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './sharedpage')
);
const Area = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './sqmaster/area')
);
const Auditedby = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './sqmaster/auditedby')
);
const Auditor = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './sqmaster/auditor')
);
const Errortype = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './sqmaster/errortype')
);
const Internal = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './sqmaster/internal')
);
const Priority = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './sqmaster/priority')
);
const Publisher = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './sqmaster/publisher')
);
const Quotationdoneby = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './sqmaster/quotationdoneby')
);
const Reporttype = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './sqmaster/reporttype')
);
const Status = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './sqmaster/status')
);
const Typeofrequest = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './sqmaster/Typeofrequest')
);
const Region = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './sqmaster/region')
);
const Size = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './sqmaster/size')
);
const Eqmaster = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './sqmaster/eqmaster')
);
const Quodationdetailsrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/quodationdetailsrawdata')
);
const Correctionlograwdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/correction-lograwdata')
);

const Controlrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/controlrawdata')
);
const Productivity_report = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ '../sq-page/productivity-report')
);
const KPIReport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './kpi-report')
);
const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/quotation-details`} />
        <Route
              path={`${match.url}/quotation-details`}
              render={(props) => <QuotationDetails {...props} />}
            />
              <Route
              path={`${match.url}/general-information`}
              render={(props) => <GeneralInformation {...props} />}
            />
            <Route
              path={`${match.url}/correction-log`}
              render={(props) => <CorrectionLog {...props} />}
            />
            <Route
              path={`${match.url}/administrator`}
              render={(props) => <Administrator {...props} />}
            />
             <Route
              path={`${match.url}/report`}
              render={(props) => <Report {...props} />}
            />
             <Route
              path={`${match.url}/controlpage`}
              render={(props) => <ControlPage {...props} />}
            />
              <Route
              path={`${match.url}/sharedpage`}
              render={(props) => <SharedPage {...props} />}
            />
            <Route
              path={`${match.url}/master/area`}
              render={(props) => <Area {...props} />}
            />
            <Route
              path={`${match.url}/master/auditedby`}
              render={(props) => <Auditedby {...props} />}
            />
            <Route
              path={`${match.url}/auditor`}
              render={(props) => <Auditor {...props} />}
            />
            <Route
              path={`${match.url}/master/errortype`}
              render={(props) => <Errortype {...props} />}
            />
             <Route
              path={`${match.url}/master/internal`}
              render={(props) => <Internal {...props} />}
            />
            <Route
              path={`${match.url}/master/priority`}
              render={(props) => <Priority {...props} />}
            />
            <Route
              path={`${match.url}/master/publisher`}
              render={(props) => <Publisher {...props} />}
            />
            <Route
              path={`${match.url}/quotationdoneby`}
              render={(props) => <Quotationdoneby {...props} />}
            />
             <Route
              path={`${match.url}/master/reporttype`}
              render={(props) => <Reporttype {...props} />}
            />
            <Route
              path={`${match.url}/master/auditedby`}
              render={(props) => <Auditedby {...props} />}
            />
            <Route
              path={`${match.url}/master/status`}
              render={(props) => <Status {...props} />}
            />
            <Route
              path={`${match.url}/master/typeofrequest`}
              render={(props) => <Typeofrequest {...props} />}
            />
            <Route
              path={`${match.url}/master/region`}
              render={(props) => <Region {...props} />}
            />
             <Route
              path={`${match.url}/master/size`}
              render={(props) => <Size {...props} />}
            />
             <Route
              path={`${match.url}/master/eqmaster`}
              render={(props) => <Eqmaster {...props} />}
            />
            <Route
              path={`${match.url}/rawdata/quodationdetailsrawdata`}
              render={(props) => <Quodationdetailsrawdata {...props} />}
            />
             <Route
              path={`${match.url}/rawdata/correction-lograwdata`}
              render={(props) => <Correctionlograwdata {...props} />}
            />
             <Route
              path={`${match.url}/rawdata/controlrawdata`}
              render={(props) => <Controlrawdata {...props} />}
            />
            <Route
            path={`${match.url}/productivity-report`}
            render={(props) => <Productivity_report {...props} />}
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