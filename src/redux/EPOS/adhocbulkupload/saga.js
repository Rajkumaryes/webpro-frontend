import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Epos,currentUser} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';
export const AdhocService = {
  fetchadhoc,
  createadhoc,
  updateadhoc,
  deleteadhoc,
  fetchadhocsearch
};
  export function fetchadhoc() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrl}${Epos}adhocbulk`, requestOptions)
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
export function fetchadhocsearch(mail_date) {
  
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body:JSON.stringify({mail_date})
};
return fetch(  `${apiUrl}${Epos}adhocbulk/search`, requestOptions)
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

export function createadhoc(user_id,start_date,end_date,mail_date, no_of_containers, poa,type,
  area,activity_type,start_time,end_time,updated_start_time,updated_end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({user_id,start_date,end_date,mail_date, no_of_containers, poa,type,
      area,activity_type,start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrl}${Epos}adhocbulk/create`, requestOptions)
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
export function updateadhoc(id,dp_voyage,vessel_name,pol,mtd,actualization,start_date,end_date,remarks,atd_date_time,
  gst_date_time, msdc_date_time,gstrec_date_time,foo_date_time,final_date_time,time_taken,task) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({id,dp_voyage,vessel_name,pol,mtd,actualization,start_date,end_date,remarks,atd_date_time,
      gst_date_time, msdc_date_time,gstrec_date_time,foo_date_time,final_date_time,time_taken,task})
};
return fetch(  `${apiUrl}${Epos}adhocbulk/adhocupdate/${id}`, requestOptions)
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

function deleteadhoc(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrl}${Epos}adhocbulk/adhocdelete/${id}`, requestOptions)
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
      fork(fetchadhoc),
      fork(createadhoc),
     fork(updateadhoc),
     fork(deleteadhoc),
    ]);
  }
  