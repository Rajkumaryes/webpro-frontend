import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Supportteam,currentUser} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';
export const TaskDeliverService = {
  fetchtaskdelivery,
  createtaskdelivery,
  updatetaskdelivery,
  deletetaskdelivery,
  fetchIndividualtaskdelivery
};
  export function fetchtaskdelivery() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrl}${Supportteam}task`, requestOptions)
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
export function createtaskdelivery(user_id,date,adhoc_request,details,email_subject,time_taken,severity,team,start_time,end_time,updated_start_time,updated_end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({user_id,date,adhoc_request,details,email_subject,time_taken,severity,team,start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrl}${Supportteam}task/create`, requestOptions)
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
export function updatetaskdelivery(id,user_id,date,adhoc_request,details,email_subject,severity,time_taken,team) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({id,user_id,date,adhoc_request,details,email_subject,severity,time_taken,team})
};
return fetch(  `${apiUrl}${Supportteam}taskdelivery/update/${id}`, requestOptions)
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

function deletetaskdelivery(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrl}${Supportteam}taskdelivery/delete/${id}`, requestOptions)
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
export function fetchIndividualtaskdelivery(user_id,date) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify({ user_id,date })
};
return fetch(  `${apiUrl}${Supportteam}task/find`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

} 
  export default function* rootSaga() {
    yield all([
      fork(fetchtaskdelivery),
      fork(createtaskdelivery),
     fork(updatetaskdelivery),
     fork(deletetaskdelivery),
    ]);
  }
  