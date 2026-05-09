import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  HashRouter
} from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import './helpers/Firebase';
import AppLocale from './lang';
import { NotificationContainer } from './components/common/react-notifications';
import {  adminRoot } from './constants/defaultValues';
import { getDirection,getCurrentUser,getCurrentpath } from './helpers/Utils';
import { ProtectedRoute, UserRole } from './helpers/authHelper';

const ViewHome = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './views/home')
);
const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './views/app')
);
const ViewUser = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/user')
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/error')
);
const ViewUnauthorized = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/unauthorized')
);


class App extends React.Component {
  constructor(props) {
    super(props);
    const direction = getDirection();
    if (direction.isRtl) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }

  render() {
    const { locale } = this.props;
    const currentAppLocale = AppLocale[locale];
    const currentUser = getCurrentUser();
    const location = window.location.pathname
    const Currentpath = getCurrentpath();
    return (
      <div className="h-100">
        <IntlProvider
          locale={currentAppLocale ? currentAppLocale.locale : 'en'}
          messages={currentAppLocale ? currentAppLocale.messages : {}}
        >
          <>
           <NotificationContainer />
            <Suspense fallback={<div className="loading" />}>
              {/* <Router basename = "/webpro/#"> */}
                 <Router>
                <HashRouter>
                <Switch>
                   <ProtectedRoute
                    path={adminRoot}
                    component={ViewApp}
                    roles={[UserRole.Admin, UserRole.Editor]}
                  />
                  <Route
                    path="/user"
                    render={(props) => <ViewUser {...props} />}
                  />
                  <Route
                    path="/error"
                    exact
                    render={(props) => <ViewError {...props} />}
                  />
                  <Route
                    path="/unauthorized"
                    exact
                    render={(props) => <ViewUnauthorized {...props} />}
                  />
                  {location === '/' && 
                  currentUser === "" ?
                  <Redirect exact from="/" to={'/user/login'} /> :
                  Currentpath !== '' ?
                  <Redirect exact from="/" to={Currentpath} /> :
                  <Redirect exact from="/" to={'/app/export/indexing'} />
                  }
               
                 
                  <Redirect to="/error" />
                </Switch>
                </HashRouter>
              </Router>
              
            </Suspense>
          </>
        </IntlProvider>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser, settings }) => {
  const { currentUser } = authUser;
  const { locale } = settings;
  return { currentUser, locale };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
