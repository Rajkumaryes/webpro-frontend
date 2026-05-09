import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,DG,currentUser,apiUrlDG} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';
export const DgService = {
  fetchdg,
  createdg,
  updatedg,
  deletedg,
  fetchIndividualIndexingsheet,
  fetchdginputcount
};
export function fetchdginputcount(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlDG}${DG}dg/dgcount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchdg() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlDG}${DG}dg`, requestOptions)
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
export function createdg( shipment_no,area,dec_type,container_type,no_of_container,no_of_cargoes,mail_recived_datetime,start_date,end_date,
  user_id,input_status,announcement_datetime,pending_reason,container_no,query,timezone,start_time,end_time,updated_start_time,updated_end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ shipment_no,area,dec_type,container_type,no_of_container,no_of_cargoes,mail_recived_datetime,start_date,end_date,
      user_id,input_status,announcement_datetime,pending_reason,container_no,query,timezone,start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrlDG}${DG}dg/create`, requestOptions)
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
export function updatedg(id, shipment_no,area,dec_type,container_type,no_of_container,no_of_cargoes,mail_recived_datetime,start_date,end_date,
  user_id,input_status,announcement_datetime,pending_reason,container_no,query,start_time,end_time,updated_start_time,updated_end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({id, shipment_no,area,dec_type,container_type,no_of_container,no_of_cargoes,mail_recived_datetime,start_date,end_date,
      user_id,input_status,announcement_datetime,pending_reason,container_no,query,start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrlDG}${DG}dg/update/${id}`, requestOptions)
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

function deletedg(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrlDG}${DG}dg/delete/${id}`, requestOptions)
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
export function fetchIndividualIndexingsheet(shipment_no,mail_recived_datetime) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify({ shipment_no,mail_recived_datetime })
};
return fetch(  `${apiUrlDG}${DG}dg/find`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

} 
  export default function* rootSaga() {
    yield all([
      fork(fetchdg),
      fork(createdg),
     fork(updatedg),
     fork(deletedg),
     fork(fetchdginputcount)
    ]);
  }
  