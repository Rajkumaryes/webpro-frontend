import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const RADM = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './radm')
);
const RATP = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './ratp')
);
const ErrorSheet = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './errorsheet')
);
const Reports = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './reports')
);
const DndArea = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './masters/dndarea')
);
const DndSubArea = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './masters/dndsubarea')
);
const Eqmaster = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './masters/eqmaster')
);
const Productivity_report = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './productivity-report')
);
const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/radm`} />
      
            <Route
              path={`${match.url}/radm`}
              render={(props) => <RADM {...props} />}
            />
            <Route
              path={`${match.url}/ratp`}
              render={(props) => <RATP {...props} />}
            />
             <Route
              path={`${match.url}/errorsheet`}
              render={(props) => <ErrorSheet {...props} />}
            />
              <Route
            path={`${match.url}/reports`}
            render={(props) => <Reports {...props} />}
          />
               <Route
              path={`${match.url}/master/dndarea`}
              render={(props) => <DndArea {...props} />}
            />
             <Route
              path={`${match.url}/master/dndsubarea`}
              render={(props) => <DndSubArea {...props} />}
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