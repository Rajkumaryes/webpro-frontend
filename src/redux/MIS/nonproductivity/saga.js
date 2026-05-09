import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,MIS,currentUser} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';
export const NonproductivityService = {
  fetchnonproductivity,
  createnonproductivity,
  updatenonproductivity,
  deletenonproductivity,
};
  export function fetchnonproductivity() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrl}${MIS}nonproductivity`, requestOptions)
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
export function createnonproductivity(date,user_id,week,total_time,supervisor,fors,category,starttime,endtime,task_description,start_time,end_time,updated_start_time,updated_end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({date,user_id,week,total_time,supervisor,fors,category,starttime,endtime,task_description,start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrl}${MIS}nonproductivity/create`, requestOptions)
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
export function updatenonproductivity(id,  date,user_id,week,total_time,supervisor,fors,category,starttime,endtime,task_description) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({id,  date,user_id,week,total_time,supervisor,fors,category,starttime,endtime,task_description})
};
return fetch(  `${apiUrl}${MIS}nonproductivitys/update/${id}`, requestOptions)
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

function deletenonproductivity(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrl}${MIS}nonproductivitys/delete/${id}`, requestOptions)
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
      fork(fetchnonproductivity),
      fork(createnonproductivity),
     fork(updatenonproductivity),
     fork(deletenonproductivity),
    ]);
  }
  