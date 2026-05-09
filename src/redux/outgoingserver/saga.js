import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Master_gateway} from '../../constants/defaultValues'
import {authHeader} from '../../helpers/authheader';

export const outgoingService = {
  fetchuoutgoingserver,
  createoutgoingserver,
  
   };
  export function fetchuoutgoingserver() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrl}${Master_gateway}outgoingserver/fetch`, requestOptions)
  .then(response => response.json())
  .then(user => { 
    console.log(user, 'userchccccccccccc')
      return user;
      }) 
      .catch((error) => {
    }); 

}  


export function createoutgoingserver(from_email, host,port,username,password) {
  var dict = {
    from_email:from_email, 
    host:host,
    port:parseInt(port),
    username:username,
    password:password
  }
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    
      body: JSON.stringify(dict)
};
return fetch(  `${apiUrl}${Master_gateway}outgoingserver/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  export default function* rootSaga() {
    yield all([
      fork(fetchuoutgoingserver),
      fork(createoutgoingserver),      
     ]);
  }
  