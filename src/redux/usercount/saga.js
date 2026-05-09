import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Master_gateway} from '../../constants/defaultValues'
import {authHeader,logout} from '../../helpers/authheader';
import axios from 'axios';
export const usercountService = {
    fetchuserperformaneweekly,
    fetchuserperformance,
    fetchuserrating
};
  export function fetchuserperformaneweekly(user_id,weeks) {
    
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ user_id,weeks})
  };
  return fetch(  `${apiUrl}${Master_gateway}usercount/performanceweekly`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function fetchuserperformance(user_id) {
    
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrl}${Master_gateway}users/userperformance`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

} 
export function fetchuserrating(user_id,weeks,user_role) {
    
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id,weeks,user_role})
};
return fetch(  `${apiUrl}${Master_gateway}usercount/userrating`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

} 

  export default function* rootSaga() {
    yield all([
      fork(fetchuserperformaneweekly),
     fork(fetchuserperformance),
     fork(fetchuserrating)
    ]);
  }
  