import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Email_handling = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './email-handling')
);
const BookingProcessrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/bookingprocess')
);
const CloudBookingrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/cloudbooking')
);
const CrmProcessrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/crmprocess')
);
const Email_handlingrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/email-handling')
);
const DocExceptionrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/doc-exception')
);
const ErrorCapturingrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/error-capturing')
);
const AFExceptionrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/af-exceptions')
);
const BookingAmendmentrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/booking-amendment')
);
const PendingFollowUPrawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/pending-follow-up')
);
const Bookingdatarawdata = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './rawdata/bookingdata')
);
const DocException = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './doc-exception')
);
const ProductivityReport = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './productivity-report')
);
const BookingType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/bookingtype')
);
const HandlingType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/handling')
);
const Reasons = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/reasons')
);
const CargoType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/cargotype')
);
const FinalStatus = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/finalstatus')
);
const StatusException = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/statusexception')
);
const IssueCode = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/issuecode')
);
const EqMaster = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/eqmaster')
);
const Teamsite = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/teamsite')
);
const BookingProcess = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './bookingprocess')
);
const CloudBooking = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './cloudbooking')
);
const CrmProcess = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './crmprocess')
);
const ErrorCapturing = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './error-capturing')
);
const BookingAmendment = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './booking-amendment')
);
const AfException = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './af-exceptions')
);
const PendingFollowUP = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './pending-follow-up')
);
const RequestType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/request')
);
const ExceptionType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/exceptiontype')
);
const BookingStatus = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/bookingstatus')
);
const ExceptionParty = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/exceptionparty')
);
const ActionType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/action')
);
const StatusOfCase = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/statusofcase')
);
const Errortype = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/errortype')
);
const ErrorStatus = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/errorstatus')
);
const AFException = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/afexception')
);
const AFStatusException = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/Af_status_exception')
);
const Category = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/category')
);
const AmendmentMedium = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/amendmentmedium')
);
const AmendmentType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/Amendmenttype')
);
const AmendmentInduced = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/Amendmentinduced')
);
const AmendmentStatus = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/Amendmentstatus')
);
const AssignedTo = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/Assignedto')
);
const PendingExceptionType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/pendingexceptiontype')
);
const PendingActionType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './masters/pendingaction')
);
const Auditing1 = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './auditing/auditing1')
);
const Auditing2 = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './auditing/auditing2')
);
const BookingCreationDashboard = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './dashboard/bookingcreation')
);

const ViewUnauthorized = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ '../../../views/unauthorized')
);

const Master = ({ match }) => {

//   const menuData = JSON.parse(localStorage.getItem("menuData"));

// console.log("menuData",menuData)
// if (Array.isArray(menuData)) {
//   const exportsMenu = menuData.find(menu => menu.key === "Exports");
//   if (exportsMenu && Array.isArray(exportsMenu.children)) {
//     exportsMenu.children.forEach(item => {
//       if (item && item.key && item.role_id) {
//         allowedRoleIds[item.key] = item.role_id;
//       }
//     });
//   }
// }

//   const allowedRoleIds = {};
//   // const menuData = JSON.parse(localStorage.getItem("menuData"));
//   const menuData = localStorage.getItem("menuData");

//   console.log("menuData",menuData)
// const exportsMenu = menuData ? menuData.filter((menu) => menu.key === "Booking Process") : [];

// const firstExport = exportsMenu.length > 0 ? exportsMenu[0] : null;

// const children = firstExport ? firstExport.children : [];

// children.forEach((item) => {
//   // console.log("item",item)
//   allowedRoleIds[item.key] = item.role_id;
// });

const roleID = parseInt(localStorage.getItem("role_id"));
console.log("roleID",roleID)
return (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
       
        <Redirect exact from={`${match.url}/`} to={`${match.url}/bookingprocess`} />
        <Route
              path={`${match.url}/email-handling`}
              render={(props) => <Email_handling {...props} />}
            />
            {/* <Route
              path={`${match.url}/email-handling`}
              render={(props) => {
                if (allowedRoleIds["Email Handling"] && allowedRoleIds["Email Handling"].includes(roleID)) {
                  return <Email_handling {...props} /> 
                } else {
                  return <ViewUnauthorized {...props} />
                }
              }}
            /> */}



            <Route
              path={`${match.url}/rawdata/bookingprocess`}
              render={(props) => <BookingProcessrawdata {...props} />}
            />
            <Route
              path={`${match.url}/rawdata/cloudbooking`}
              render={(props) => <CloudBookingrawdata {...props} />}
            />
            <Route
              path={`${match.url}/rawdata/crmprocess`}
              render={(props) => <CrmProcessrawdata {...props} />}
            />
            <Route
              path={`${match.url}/rawdata/email-handling`}
              render={(props) => <Email_handlingrawdata {...props} />}
            />
            <Route
              path={`${match.url}/rawdata/doc-exception`}
              render={(props) => <DocExceptionrawdata {...props} />}
            />
            <Route
              path={`${match.url}/rawdata/error-capturing`}
              render={(props) => <ErrorCapturingrawdata {...props} />}
            />
             <Route
              path={`${match.url}/rawdata/af-exceptions`}
              render={(props) => <AFExceptionrawdata {...props} />}
            />
            <Route
              path={`${match.url}/rawdata/booking-amendment`}
              render={(props) => <BookingAmendmentrawdata {...props} />}
            />
            <Route
              path={`${match.url}/rawdata/pending-follow-up`}
              render={(props) => <PendingFollowUPrawdata {...props} />}
            />
            <Route
              path={`${match.url}/rawdata/bookingdata`}
              render={(props) => <Bookingdatarawdata {...props} />}
            />
            <Route
              path={`${match.url}/doc-exception`}
              render={(props) => <DocException {...props} />}
            />
            <Route
              path={`${match.url}/productivity-report`}
              render={(props) => <ProductivityReport {...props} />}
            />
            <Route
              path={`${match.url}/productivity-report`}
              render={(props) => <ProductivityReport {...props} />}
            />
            <Route
              path={`${match.url}/bookingtype`}
              render={(props) => <BookingType {...props} />}
            />
            <Route
              path={`${match.url}/handling`}
              render={(props) => <HandlingType {...props} />}
            />
            <Route
              path={`${match.url}/reasons`}
              render={(props) => <Reasons {...props} />}
            />
            <Route
              path={`${match.url}/cargotype`}
              render={(props) => <CargoType {...props} />}
            />
            <Route
              path={`${match.url}/finalstatus`}
              render={(props) => <FinalStatus {...props} />}
            />
            <Route
              path={`${match.url}/statusexception`}
              render={(props) => <StatusException {...props} />}
            />
            <Route
              path={`${match.url}/issuecode`}
              render={(props) => <IssueCode {...props} />}
            />
            <Route
            path={`${match.url}/eqmaster`}
            render={(props) => <EqMaster {...props} />}
            />
            <Route
            path={`${match.url}/teamsite`}
            render={(props) => <Teamsite {...props} />}
            />
            <Route
              path={`${match.url}/bookingprocess`}
              render={(props) => <BookingProcess {...props} />}
            />
            <Route
              path={`${match.url}/cloudbooking`}
              render={(props) => <CloudBooking {...props} />}
            />
            <Route
              path={`${match.url}/crmprocess`}
              render={(props) => <CrmProcess {...props} />}
            />
            <Route
              path={`${match.url}/error-capturing`}
              render={(props) => <ErrorCapturing {...props} />}
            />
            <Route
              path={`${match.url}/booking-amendment`}
              render={(props) => <BookingAmendment {...props} />}
            />
            <Route
              path={`${match.url}/af-exceptions`}
              render={(props) => <AfException {...props} />}
            />
             <Route
              path={`${match.url}/pending-follow-up`}
              render={(props) => <PendingFollowUP {...props} />}
            />
            <Route
              path={`${match.url}/emailhandling/requesttype`}
              render={(props) => <RequestType {...props} />}
            />
            <Route
              path={`${match.url}/doc_exception/exceptiontype`}
              render={(props) => <ExceptionType {...props} />}
            />
            <Route
              path={`${match.url}/bookingoriginal/bookingstatus`}
              render={(props) => <BookingStatus {...props} />}
            />
            <Route
              path={`${match.url}/bookingoriginal/exceptionparty`}
              render={(props) => <ExceptionParty {...props} />}
            />
            <Route
              path={`${match.url}/crm_process/action`}
              render={(props) => <ActionType {...props} />}
            />
            <Route
              path={`${match.url}/crm_process/statusofcase`}
              render={(props) => <StatusOfCase {...props} />}
            />
            <Route
              path={`${match.url}/error_capturing/errortype`}
              render={(props) => <Errortype {...props} />}
            />
            <Route
              path={`${match.url}/error_capturing/errorstatus`}
              render={(props) => <ErrorStatus {...props} />}
            />
            <Route
              path={`${match.url}/afexceptions/afexception`}
              render={(props) => <AFException {...props} />}
            />
            <Route
              path={`${match.url}/afexceptions/Af_status_exception`}
              render={(props) => <AFStatusException {...props} />}
            />
            <Route
              path={`${match.url}/afexceptions/category`}
              render={(props) => <Category {...props} />}
            />
            <Route
              path={`${match.url}/booking_amendment/amendmentmedium`}
              render={(props) => <AmendmentMedium {...props} />}
            />
            <Route
              path={`${match.url}/booking_amendment/Amendmenttype`}
              render={(props) => <AmendmentType {...props} />}
            />
            <Route
              path={`${match.url}/booking_amendment/Amendmentinduced`}
              render={(props) => <AmendmentInduced {...props} />}
            />
            <Route
              path={`${match.url}/booking_amendment/Amendmentstatus`}
              render={(props) => <AmendmentStatus {...props} />}
            />
            <Route
              path={`${match.url}/booking_amendment/Assignedto`}
              render={(props) => <AssignedTo {...props} />}
            />
            <Route
              path={`${match.url}/pendingfollow/pendingexceptiontype`}
              render={(props) => <PendingExceptionType {...props} />}
            />
            <Route
              path={`${match.url}/pendingfollow/pendingaction`}
              render={(props) => <PendingActionType {...props} />}
            />
              <Route
              path={`${match.url}/auditing/auditing1`}
              render={(props) => <Auditing1 {...props} />}
            />
            <Route
              path={`${match.url}/auditing/auditing2`}
              render={(props) => <Auditing2 {...props} />}
            />
            <Route
              path={`${match.url}/dashboard/bookingcreation`}
              render={(props) => <BookingCreationDashboard {...props} />}
            />
        <Redirect to="/error" />
      </Switch>
    </Suspense>
    )
  };
  export default Master;