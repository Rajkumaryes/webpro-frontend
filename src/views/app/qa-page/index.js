import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const QualityAssurance = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './quality-assurance')
);

const OtherActivities = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './other-activities')
);

const NonProductive = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './non-productive')
);
const NonProductivityFor = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/non-productivity-for')
);
const Category = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/category')
);
const TLacceptance = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/tlacceptance')
);

const Shipper = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/shipper')
);
const StandardComment = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/standardcomment')
);

const ChargeCodeType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/chargecodetype')
);
const MAFApplicable = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/mafapplicable')
);


const InputErrorCategory = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/inputerrorcategory')
);
const InputErrorSubCategory = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/inputerrorsubcategory')
);
const MatchCodeErrorCategory = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/matchcodecategory')
);
const MatchCodeErrorSubCategory = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/matchcodesubcategory')
);

const DestinationCategory = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/destinationcategory')
);
const DestinationSubCategory = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/destinationsubcategory')
);
const OtherErrorCategory = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/otherscategory')
);
const Eqmaster = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/eqmaster')
);
const ProductivityReport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './productivity-report')
);
const Report = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './reports')
);
const Master = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/quality-assurance`} />
        <Route
              path={`${match.url}/quality-assurance`}
              render={(props) => <QualityAssurance {...props} />}
            />
           <Route
              path={`${match.url}/other-activities`}
              render={(props) => <OtherActivities {...props} />}
            />
             <Route
              path={`${match.url}/non-productive`}
              render={(props) => <NonProductive {...props} />}
            />
             <Route
              path={`${match.url}/category`}
              render={(props) => <Category {...props} />}
            />
            <Route
              path={`${match.url}/for`}
              render={(props) => <NonProductivityFor {...props} />}
            />
            <Route
              path={`${match.url}/tlacceptance`}
              render={(props) => <TLacceptance {...props} />}
            />
             <Route
              path={`${match.url}/shipper`}
              render={(props) => <Shipper {...props} />}
            />
            <Route
              path={`${match.url}/standardcomment`}
              render={(props) => <StandardComment {...props} />}
            />
            <Route
              path={`${match.url}/chargecodetype`}
              render={(props) => <ChargeCodeType {...props} />}
            />
            <Route
              path={`${match.url}/mafapplicable`}
              render={(props) => <MAFApplicable {...props} />}
            />
             <Route
              path={`${match.url}/inputerrorcategory`}
              render={(props) => <InputErrorCategory {...props} />}
            />
            <Route
              path={`${match.url}/inputerrorsubcategory`}
              render={(props) => <InputErrorSubCategory {...props} />}
            />
            <Route
              path={`${match.url}/matchcodecategory`}
              render={(props) => <MatchCodeErrorCategory {...props} />}
            />
            <Route
              path={`${match.url}/matchcodesubcategory`}
              render={(props) => <MatchCodeErrorSubCategory {...props} />}
            />
            <Route
              path={`${match.url}/destinationcategory`}
              render={(props) => <DestinationCategory {...props} />}
            />
            <Route
              path={`${match.url}/destinationsubcategory`}
              render={(props) => <DestinationSubCategory {...props} />}
            />
            <Route
              path={`${match.url}/otherscategory`}
              render={(props) => <OtherErrorCategory {...props} />}
            />
            <Route
              path={`${match.url}/eqmaster`}
              render={(props) => <Eqmaster {...props} />}
            />
            <Route
              path={`${match.url}/productivity-report`}
              render={(props) => <ProductivityReport {...props} />}
            />
             <Route
              path={`${match.url}/reports`}
              render={(props) => <Report {...props} />}
            />
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );

  export default Master;