import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,FeedersSchedules,apiUrlFeeder} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
export const FeederService = {
  fetchapi,
  createapi,
  updateapi,
  deleteapi,
  findapi,
  fetchfeedercount
};
export function fetchfeedercount(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlFeeder}${FeedersSchedules}feeder/feedercount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchapi() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlFeeder}${FeedersSchedules}feeder`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
 
export function createapi(start_datetime,end_datetime,area_selection,activity_selection,week_number,month,
  region,vessel_operator,subactivity,dp_voyage,request_type,schedule,taskstart_datetime,taskend_datetime,
  tat,user_id,received_datetime,sent_datetime,start_time,end_time,updated_start_time,updated_end_time) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({   start_datetime,end_datetime,area_selection,activity_selection,week_number,
      month,region,vessel_operator,subactivity,dp_voyage,request_type,schedule,taskstart_datetime,
      taskend_datetime,tat,user_id,received_datetime,sent_datetime,start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrlFeeder}${FeedersSchedules}feeder/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  
export function updateapi(id,  start_datetime,end_datetime,area_selection,activity_selection,week_number,month,region,vessel_operator,subactivity,dp_voyage,request_type,schedule,taskstart_datetime,taskend_datetime,tat,user_id,received_datetime,sent_datetime) {

  const requestOptions = {
    method: 'Post',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({  start_datetime,end_datetime,area_selection,activity_selection,week_number,month,region,vessel_operator,subactivity,dp_voyage,request_type,schedule,taskstart_datetime,taskend_datetime,tat,user_id,received_datetime,sent_datetime})
};
return fetch(  `${apiUrlFeeder}${FeedersSchedules}feeder/update/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
 
function deleteapi(id) {
  // const user_id = localStorage.getItem('user_id') !== null ?  parseInt(localStorage.getItem('user_id')) :null
  const requestOptions = {
      method: 'Post',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({  })
  };
  return fetch(`${apiUrlFeeder}${FeedersSchedules}feeder/delete/${id}`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
export function findapi(dp_voyage ) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({  dp_voyage})
};
return fetch(  `${apiUrlFeeder}${FeedersSchedules}feeder/search`, requestOptions)
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
      fork(createapi),
     fork(updateapi),
     fork(deleteapi),
     fork(fetchfeedercount)
    ]);
  }
  