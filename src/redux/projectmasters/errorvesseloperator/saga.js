import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Masters} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
export const errorvesseloperatorsService = {
  fetcherrorvesseloperators,
  createerrorvesseloperators,
  updateerrorvesseloperators,
  deleteerrorvesseloperators,
 regionwisefilter,
 fetchAreaRegionWise
};
let user_id = parseInt(localStorage.getItem('user_id'));
export function fetcherrorvesseloperators() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrl}${Masters}vesseloperator`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function fetchAreaRegionWise(region,area) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify({ region,area})
};
return fetch(  `${apiUrl}${Masters}vesseloperator/arearegionwise`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
export function createerrorvesseloperators(name,region,area,status) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ name,region,area,status,user_id})
};
return fetch(  `${apiUrl}${Masters}vesseloperator/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  
export function updateerrorvesseloperators(id,name,region,area,status) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({name,region,area,status,user_id})
};
return fetch(  `${apiUrl}${Masters}vesseloperator/update/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  

function deleteerrorvesseloperators(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrl}${Masters}vesseloperator/delete/${id}`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
export function regionwisefilter(region) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ region})
};
return fetch(  `${apiUrl}${Masters}vesseloperator/regionwise`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  export default function* rootSaga() {
    yield all([
      fork(fetcherrorvesseloperators),
      fork(createerrorvesseloperators),
     fork(updateerrorvesseloperators),
     fork(deleteerrorvesseloperators),
  
    ]);
  }
  