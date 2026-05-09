import { changeConfirmLocale } from 'antd/lib/modal/locale';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Productivity_Finding = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './productivity-finding')
)
const Productivity_without_EH = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './productivity-without-eh')
);
const Productivity_EH = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './productivity-eh')
);
const Productivity_Audit = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './productivity-audit')
);
const Errorcapture = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './error-capture')
);
const NonProductivity = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './non-productivity')
);
const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/productivity-finding`} />
        <Route
              path={`${match.url}/productivity-finding`}
              render={(props) => <Productivity_Finding {...props} />}
            />
              <Route
              path={`${match.url}/productivity-without-eh`}
              render={(props) => <Productivity_without_EH {...props} />}
            />
              <Route
              path={`${match.url}/productivity-eh`}
              render={(props) => <Productivity_EH {...props} />}
            />
             <Route
              path={`${match.url}/productivity-audit`}
              render={(props) => <Productivity_Audit {...props} />}
            />
               <Route
              path={`${match.url}/error-capture`}
              render={(props) => <Errorcapture {...props} />}
            />
             <Route
              path={`${match.url}/non-productivity`}
              render={(props) => <NonProductivity {...props} />}
            />
             <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
  export default Master;