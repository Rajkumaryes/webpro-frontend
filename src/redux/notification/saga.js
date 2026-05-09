import { all, fork } from 'redux-saga/effects';
import {apiUrlNotification,Notification   } from '../../constants/defaultValues'
import {authHeader} from '../../helpers/authheader';
export const notificationService = {
  fetchnotification,
  deletenotification,
  clearnotification
 };
  export function fetchnotification(to_userid) {

    const requestOptions = {
      method: 'Post',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
        body: JSON.stringify({ to_userid })
  };
  return fetch(  `${apiUrlNotification}${Notification}notification/userwise`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function clearnotification(ids) {

  const requestOptions = {
    method: 'Post',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify({ ids })
};
return fetch(  `${apiUrlNotification}${Notification}notification/update_readstatus`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
function deletenotification(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrlNotification}${Notification}notification/delete/${id}`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
  export default function* rootSaga() {
    yield all([
      fork(fetchnotification),
     fork(deletenotification),
     ]);
  }
  