import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const TenderInputsheet = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './tenderinputsheet')
);
const ErrorCapturing = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './errorcapturing')
);
const Tenderinputsheetrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/tenderinputsheetrawdata')
);

const Errorcapturingrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/errorcapturingrawdata')
);
const Tendername = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './master/tendername')
);
const Tendertype = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './master/tendertype')
);
const Tendercategory = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './master/tendercategory')
);
const Tenderarea = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './master/tenderarea')
);
const Tendererrorseverity = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './master/tendererrorseverity')
);
const Tendererrorstatus = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './master/tendererrorstatus')
);
const Tendererrortype = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './master/tendererrortype')
);
const Tenderfeedback = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './master/tenderfeedback')
);

const Tenderquerytype = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './master/tenderquerytype')
);
const Tenderround = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './master/tenderround')
);
const Tendersection = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './master/tendersection')
);
const Tenderactivity = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './master/tenderactivity')
);
const Tendersubactivity = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './master/tendersubactivity')
);
const Eqmaster = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './master/eqmaster')
);
const Productivityreport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './productivity-report')
);
const KPIReport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './kpi-report')
);
const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/tenderinputsheet`} />
      
            <Route
              path={`${match.url}/tenderinputsheet`}
              render={(props) => <TenderInputsheet {...props} />}
            />
            <Route
              path={`${match.url}/errorcapturing`}
              render={(props) => <ErrorCapturing {...props} />}
            />
         <Route
              path={`${match.url}/rawdata/tenderinputsheetrawdata`}
              render={(props) => <Tenderinputsheetrawdata {...props} />}
            />
        
         <Route
              path={`${match.url}/rawdata/errorcapturingrawdata`}
              render={(props) => <Errorcapturingrawdata {...props} />}
            />
           <Route
              path={`${match.url}/master/tendername`}
              render={(props) => <Tendername {...props} />}
            />
             <Route
              path={`${match.url}/master/tendertype`}
              render={(props) => <Tendertype {...props} />}
            />
             <Route
              path={`${match.url}/master/tendercategory`}
              render={(props) => <Tendercategory {...props} />}
            />
             <Route
              path={`${match.url}/master/tenderarea`}
              render={(props) => <Tenderarea {...props} />}
            />
             <Route
              path={`${match.url}/master/tendererrorseverity`}
              render={(props) => <Tendererrorseverity {...props} />}
            />
            <Route
              path={`${match.url}/master/tendererrorstatus`}
              render={(props) => <Tendererrorstatus {...props} />}
            />
             <Route
              path={`${match.url}/master/tendererrortype`}
              render={(props) => <Tendererrortype {...props} />}
            />
             <Route
              path={`${match.url}/master/tenderfeedback`}
              render={(props) => <Tenderfeedback {...props} />}
            />
             <Route
              path={`${match.url}/master/tenderquerytype`}
              render={(props) => <Tenderquerytype {...props} />}
            />
             <Route
              path={`${match.url}/master/tenderround`}
              render={(props) => <Tenderround {...props} />}
            />
           <Route
              path={`${match.url}/master/tendersection`}
              render={(props) => <Tendersection {...props} />}
            />
             <Route
              path={`${match.url}/master/tenderactivity`}
              render={(props) => <Tenderactivity {...props} />}
            />
             <Route
              path={`${match.url}/master/tendersubactivity`}
              render={(props) => <Tendersubactivity {...props} />}
            />
             <Route
              path={`${match.url}/master/eqmaster`}
              render={(props) => <Eqmaster {...props} />}
            />
         <Route
              path={`${match.url}/productivity-report`}
              render={(props) => <Productivityreport {...props} />}
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