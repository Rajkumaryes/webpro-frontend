import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Railnotification,apiUrlRailNotification} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
export const containerService = {
  fetchcontainer,
  createcontainer,
  fetchcontainersearch,
  fetchcontainerCount
};
export function fetchcontainerCount(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlRailNotification}${Railnotification}container/containercount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchcontainer() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlRailNotification}${Railnotification}container`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
 
export function createcontainer(arrival_mot,container_number,pickup_number,lfd,termial,movement,location,user_id,
  last_update,completed_update,start_time,end_time,updated_end_time,updated_start_time) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ arrival_mot,container_number,pickup_number,lfd,termial,movement,location,user_id,
      last_update,completed_update,start_time,end_time,updated_end_time,updated_start_time})
};
return fetch(  `${apiUrlRailNotification}${Railnotification}container/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
export function fetchcontainersearch(container_number) {
  
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body:JSON.stringify({container_number})
};
return fetch(  `${apiUrlRailNotification}${Railnotification}container/search`, requestOptions)
.then(response => {
  if(!response.ok) 
  {
    if(response.status === 401)
    {
      logout()
    }

  }
  return response.json();
})
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
} 
 

  export default function* rootSaga() {
    yield all([
      fork(fetchcontainer),
      fork(createcontainer),
      fork(fetchcontainersearch),
      fork(fetchcontainerCount)
    ]);
  }
  