import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const BusinessPartnerCatalog = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './business-partner-catalog')
);
const Category = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/category')
);
const Matchcodetype = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/matchcodetype')
);
const ContactCleanupServices  = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './contact-cleanup-services')
);
const Actioncategory = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/actioncategory')
);
const BPCArea = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/bpcarea')
);
const CCSArea = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/ccsarea')
);
const CCSComments = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/ccscomments')
);
const HighVelocitySales  = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './high-velocity-sales')
);
const HVSArea = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/hvsarea')
);
const EQmaster = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/eqmaster')
);
const BusinessPartnerCatalograwdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/businesspartnercatalog')
);
const ContactCleanupServicerawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/contactcleanupservice')
);
const HighVelocitySalesrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/highvelocitysales')
);
const ProductivityReport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './productivity-report')
);

const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/bchteam`} />
        <Route
              path={`${match.url}/business-partner-catalog`}
              render={(props) => <BusinessPartnerCatalog {...props} />}
            />
          <Route
              path={`${match.url}/category`}
              render={(props) => <Category {...props} />}
            />
            <Route
              path={`${match.url}/matchcodetype`}
              render={(props) => <Matchcodetype {...props} />}
            />
            <Route
              path={`${match.url}/contact-cleanup-services`}
              render={(props) => <ContactCleanupServices {...props} />}
            />
            <Route
              path={`${match.url}/actioncategory`}
              render={(props) => <Actioncategory {...props} />}
            />
             <Route
              path={`${match.url}/bpcarea`}
              render={(props) => <BPCArea {...props} />}
            />
             <Route
              path={`${match.url}/ccsarea`}
              render={(props) => <CCSArea {...props} />}
            />
            <Route
              path={`${match.url}/ccscomments`}
              render={(props) => <CCSComments {...props} />}
            />
            <Route
              path={`${match.url}/high-velocity-sales`}
              render={(props) => <HighVelocitySales {...props} />}
            />
            <Route
              path={`${match.url}/hvsarea`}
              render={(props) => <HVSArea {...props} />}
            />
            <Route
              path={`${match.url}/eqmaster`}
              render={(props) => <EQmaster {...props} />}
            />
                 <Route
              path={`${match.url}/rawdata/businesspartnercatalog`}
              render={(props) => <BusinessPartnerCatalograwdata {...props} />}
            />
            <Route
              path={`${match.url}/rawdata/contactcleanupservice`}
              render={(props) => <ContactCleanupServicerawdata {...props} />}
            />
            <Route
              path={`${match.url}/rawdata/highvelocitysales`}
              render={(props) => <HighVelocitySalesrawdata {...props} />}
            />
            <Route
              path={`${match.url}/productivity-report`}
              render={(props) => <ProductivityReport {...props} />}
            />
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
  export default Master;