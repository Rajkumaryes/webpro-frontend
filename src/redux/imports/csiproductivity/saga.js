import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Import,apiUrlImport} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
export const csiproductivityService = {
  fetchcsiproductivity,
  createcsiproductivity,
  updatecsiproductivity,
  deletecsiproductivity,
  fetchcsiproductivitySerach,
  fetchcsiproductivitycount
};
export function fetchcsiproductivitycount(username) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ username})
};
return fetch(  `${apiUrlImport}${Import }csiproductivity/csiproductivitycount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchcsiproductivity() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlImport}${Import}csiproductivity/fetch`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  

  export function fetchcsiproductivitySerach(pod ,dp_voyage,team,ssy,pre_pond) {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
        body: JSON.stringify({pod ,dp_voyage,team,ssy,pre_pond})
  };
  return fetch(  `${apiUrlImport}${Import}csiproductivity/vessel`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 
  
  } 
export function createcsiproductivity(username,activity,date,week,region,ssy,dp_voyage,
  count,pod,day_of_activity,no_of_mtd,pre_pond,unit,total_unit,vessel_date,eta,kpi,start_time,end_time,updated_start_time,updated_end_time) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ username,activity,date,week,region,ssy,dp_voyage,count,pod,day_of_activity,no_of_mtd,
      pre_pond,unit,total_unit,vessel_date,eta,kpi,start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrlImport}${Import}csiproductivity/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  
export function updatecsiproductivity(dpvoyage,eta,ssy) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({eta,ssy})
};
return fetch(  `${apiUrlImport}${Import}csiproductivity/updateeta/${dpvoyage}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  

function deletecsiproductivity(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrlImport}${Import}csiproductivity/delete/${id}`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
  export default function* rootSaga() {
    yield all([
      fork(fetchcsiproductivity),
      fork(createcsiproductivity),
     fork(updatecsiproductivity),
     fork(deletecsiproductivity),
      fork(fetchcsiproductivitycount)
    ]);
  }
  