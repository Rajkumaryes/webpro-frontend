import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,VesselChartering,currentUser} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';
export const paymentadviceService = {
  fetchpaymentadvice,
  createpaymentadvice,
  updatepaymentadvice,
  deletepaymentadvice,
};
  export function fetchpaymentadvice() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrl}${VesselChartering}paymentadvice`, requestOptions)
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
export function createpaymentadvice( user_id,vessel_name,tat_time,
  activity_type,week_no,email_datetime, start_time,end_time,updated_start_time,updated_end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({  user_id,vessel_name,tat_time,
      activity_type,week_no,email_datetime, start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrl}${VesselChartering}paymentadvice/create`, requestOptions)
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
export function updatepaymentadvice(id, week,month,year,date,region,report,error_reported,no_of_error,reported_by,error_des,error_doneby,error_email) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({id, week,month,year,date,region,report,error_reported,no_of_error,reported_by,error_des,error_doneby,error_email})
};
return fetch(  `${apiUrl}${VesselChartering}paymentadvice/update/${id}`, requestOptions)
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

function deletepaymentadvice(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrl}${VesselChartering}paymentadvice/delete/${id}`, requestOptions)
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
      fork(fetchpaymentadvice),
      fork(createpaymentadvice),
     fork(updatepaymentadvice),
     fork(deletepaymentadvice),
    ]);
  }
  