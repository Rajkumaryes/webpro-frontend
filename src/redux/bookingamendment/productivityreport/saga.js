import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,BookingAmendment,apiUrlBookingAmendment} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
export const reportService = {
  fetchapi,
  fetchapidownload,
};
  export function fetchapi(page,per_page,startdate,enddate,user_array,is_report,
    username,menu,submenu,team_id,team,type) {

  
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
        body: JSON.stringify({page,per_page,startdate,enddate,user_array,is_report,
          username,menu,submenu,team_id,team,type})
  };
  return fetch(  `${apiUrlBookingAmendment}${BookingAmendment}productivityreport/report`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function fetchapidownload(page,per_page,startdate,enddate,user_array,is_report,
  username,menu,submenu,team_id,team,type) {


  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify({page,per_page,startdate,enddate,user_array,is_report,
        username,menu,submenu,team_id,team,type})
};
return fetch(  `${apiUrlBookingAmendment}${BookingAmendment}productivityreport/download`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}

  export default function* rootSaga() {
    yield all([
      fork(fetchapi),
      fork(fetchapidownload),
,
    ]);
  }
  