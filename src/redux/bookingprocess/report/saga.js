import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrlBooking,BookingProcess} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
export const reportService = {
  fetchapi,
  fetchapikpi,
  fetchbookingcreation,
  fetchapiautodownload,
  fetchapiprocesswise
};
  export function fetchapi(apiname,page,per_page,startdate,enddate,user_array,is_report,
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
  return fetch(  `${apiUrlBooking}${BookingProcess}${apiname}/report`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}
export function fetchbookingcreation(apiname,page,per_page,enddate,user_array,is_report,
  username,menu,submenu,team_id,team,type) {


  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify({page,per_page,enddate,user_array,is_report,
        username,menu,submenu,team_id,team,type})
};
return fetch(  `${apiUrlBooking}${BookingProcess}${apiname}/bookingcreationdashboard`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}   
export function fetchapiautodownload(apiname,page,per_page,startdate,enddate,user_array,is_report,
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
return fetch(  `${apiUrlBooking}${BookingProcess}${apiname}/autodownloadreport`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

} 
export function fetchapiprocesswise(apiname,page,per_page,startdate,enddate,user_array,is_report,
  username,menu,submenu,type) {


  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify({page,per_page,startdate,enddate,user_array,is_report,
        username,menu,submenu,type})
};
return fetch(  `${apiUrlBooking}${BookingProcess}${apiname}/reportprocesswise`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
export function fetchapikpi(startdate,enddate,is_report,username,menu,submenu) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify({startdate,enddate,is_report,username,menu,submenu})
};
return fetch(  `${apiUrlBooking}${BookingProcess}kpireport/report`, requestOptions)
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
      fork(fetchapikpi),
      fork(fetchbookingcreation),
      fork(fetchapiautodownload),
      fork(fetchapiprocesswise)
    ]);
  }
  