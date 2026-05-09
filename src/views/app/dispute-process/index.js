import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const DisputeCapture = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './dispute-capture')
);
const DisputeValidation = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './dispute-validation')
);
const InvoiceCancellation = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './invoice-cancellation')
);
const Communication = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './communication')
);

const ErrorCapturing = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './error-capturing')
);
const Country = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/country')
);
const Process = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/process')
);
const Mailaction = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/mailaction')
);
const Disputesource = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/disputesource')
);
const Paymentterms = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/paymentterms')
);
const Currency = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/currency')
);
const Collection = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/collection')
);
const Layouttype = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/layouttype')
);
const Disputevalidationstatus = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/disputevalidationstatus')
);
const Disputestatus = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/disputestatus')
);
const Errortype = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/errortype')
);
const Precollect = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/precollect')
);
const Language = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/language')
);
const Disputeinput = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/disputeinput')
);
const Eqmaster = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/eqmaster')
);
const Region = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/region')
);
const Area = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/area')
);
const Disputecapturerawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/dispute-capturerawdata')
);
const Disputevalidationrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/dispute-validationrawdata')
);
const Invoicecancellationrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/invoice-cancellationrawdata')
);
const Communicationrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/communicationrawdata')
);
const Errorcapturingrawdata = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/error-capturingrawdata')
);
const Productivity_report = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './productivity-report')
);
const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/dispute-capture`} />
        <Route
              path={`${match.url}/dispute-capture`}
              render={(props) => <DisputeCapture {...props} />}
            />
            <Route
              path={`${match.url}/dispute-validation`}
              render={(props) => <DisputeValidation {...props} />}
            />
            <Route
              path={`${match.url}/invoice-cancellation`}
              render={(props) => <InvoiceCancellation {...props} />}
            />
              <Route
              path={`${match.url}/communication`}
              render={(props) => <Communication {...props} />}
            />
            <Route
              path={`${match.url}/error-capturing`}
              render={(props) => <ErrorCapturing {...props} />}
            />
          <Route
              path={`${match.url}/master/country`}
              render={(props) => <Country {...props} />}
            />
            <Route
              path={`${match.url}/master/disputesource`}
              render={(props) => <Disputesource {...props} />}
            />
            <Route
              path={`${match.url}/master/mailaction`}
              render={(props) => <Mailaction {...props} />}
            />
              <Route
              path={`${match.url}/master/precollect`}
              render={(props) => <Precollect {...props} />}
            />
            <Route
              path={`${match.url}/master/process`}
              render={(props) => <Process {...props} />}
            />
            <Route
              path={`${match.url}/master/currency`}
              render={(props) => <Currency {...props} />}
            />
            <Route
              path={`${match.url}/master/collection`}
              render={(props) => <Collection {...props} />}
            />
             <Route
              path={`${match.url}/master/disputestatus`}
              render={(props) => <Disputestatus {...props} />}
            />
            <Route
              path={`${match.url}/master/disputevalidationstatus`}
              render={(props) => <Disputevalidationstatus {...props} />}
            />
             <Route
              path={`${match.url}/master/errortype`}
              render={(props) => <Errortype {...props} />}
            />
             <Route
              path={`${match.url}/master/layouttype`}
              render={(props) => <Layouttype {...props} />}
            />
             <Route
              path={`${match.url}/master/paymentterms`}
              render={(props) => <Paymentterms {...props} />}
            />
            <Route
              path={`${match.url}/master/language`}
              render={(props) => <Language {...props} />}
            />
            <Route
              path={`${match.url}/master/disputeinput`}
              render={(props) => <Disputeinput {...props} />}
            />
             <Route
              path={`${match.url}/master/eqmaster`}
              render={(props) => <Eqmaster {...props} />}
            />
              <Route
              path={`${match.url}/master/region`}
              render={(props) => <Region {...props} />}
            />
               <Route
              path={`${match.url}/master/area`}
              render={(props) => <Area {...props} />}
            />
            <Route
              path={`${match.url}/rawdata/dispute-capturerawdata`}
              render={(props) => <Disputecapturerawdata {...props} />}
            />
            <Route
              path={`${match.url}/rawdata/dispute-validationrawdata`}
              render={(props) => <Disputevalidationrawdata {...props} />}
            />
            <Route
              path={`${match.url}/rawdata/invoice-cancellationrawdata`}
              render={(props) => <Invoicecancellationrawdata {...props} />}
            />
            <Route
              path={`${match.url}/rawdata/communicationrawdata`}
              render={(props) => <Communicationrawdata {...props} />}
            />
             <Route
              path={`${match.url}/rawdata/error-capturingrawdata`}
              render={(props) => <Errorcapturingrawdata {...props} />}
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