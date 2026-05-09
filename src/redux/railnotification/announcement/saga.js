import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Railnotification,apiUrlRailNotification} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
export const announcementService = {
  fetchannouncement,
  createannouncement,
  fetchannouncementsearch,
  fetchanouncementCount
};
export function fetchanouncementCount(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlRailNotification}${Railnotification}announcement/announcementcount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchannouncement() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlRailNotification}${Railnotification}announcement`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
 
export function createannouncement(announced_by ,departure_date,arrival_date,container_number,user_id,last_update,completed_update,cross_town,start_time,end_time,updated_end_time,updated_start_time) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ announced_by ,departure_date,arrival_date,container_number,user_id,last_update,completed_update,cross_town,start_time,end_time,updated_end_time,updated_start_time})
};
return fetch(  `${apiUrlRailNotification}${Railnotification}announcement/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
export function fetchannouncementsearch(container_number) {
  
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body:JSON.stringify({container_number})
};
return fetch(  `${apiUrlRailNotification}${Railnotification}announcement/search`, requestOptions)
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
      fork(fetchannouncement),
      fork(createannouncement),
      fork(fetchannouncementsearch),
      fork(fetchanouncementCount)
    ]);
  }
  