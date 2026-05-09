import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Import,apiUrlImport} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
export const DomesticService = {
  fetchdomesticinvoice,
  createdomesticinvoice,
  updatedomesticinvoice,
  deletedomesticinvoice,
  fetchdomesticinvoicecount
};
export function fetchdomesticinvoicecount(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlImport}${Import}domesticinvoice/domesticinvoicecount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchdomesticinvoice() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlImport}${Import}domesticinvoice/fetch`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function createdomesticinvoice(week,date,region,username,container_number,received_time,charges,pc,cc,unit,type,tat_time,start_time,end_time,updated_start_time,updated_end_time) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({week,date,region,username,container_number,received_time,charges,pc,cc,unit,type,tat_time,start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrlImport}${Import}domesticinvoice/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  
export function updatedomesticinvoice(id,week,date,region,starttime,endtime,username,container_number,received_time,charges,pc,cc,unit,type,tat_time) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({week,date,region,starttime,endtime,username,container_number,received_time,charges,pc,cc,unit,type,tat_time})
};
return fetch(  `${apiUrlImport}${Import}domesticinvoice/update/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  

function deletedomesticinvoice(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrlImport}${Import}domesticinvoice/delete/${id}`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
  export default function* rootSaga() {
    yield all([
      fork(fetchdomesticinvoice),
      fork(createdomesticinvoice),
     fork(updatedomesticinvoice),
     fork(deletedomesticinvoice),
      fork(fetchdomesticinvoicecount)
    ]);
  }
  