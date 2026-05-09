import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Epos,currentUser} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';
export const ErrorcaptureService = {
  fetcherrorcapture,
  createerrorcaptureEPOS,
  updateerrorcapture,
  deleteerrorcapture,
  createerrorcaptureTPFREP
};
  export function fetcherrorcapture() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrl}${Epos}errorcapturesheet`, requestOptions)
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

export function createerrorcaptureEPOS(date, no_of_containers,activity_type,area,comments,region,
  source, user,week,user_id,start_time,end_time,updated_start_time,updated_end_time,status) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({date, no_of_containers,activity_type,area,comments,region,
      source, user,week,user_id,start_time,end_time,updated_start_time,updated_end_time,status})
};
return fetch(  `${apiUrl}${Epos}errorcapture/create`, requestOptions)
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
export function createerrorcaptureTPFREP(date,
  no_of_containers,activity_type,area,user,
  region,comments,week,source,user_id,start_time,end_time,updated_start_time,updated_end_time,status) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({date,
      no_of_containers,activity_type,area,user,
      region,comments,week,source,user_id,start_time,end_time,updated_start_time,updated_end_time,status})
};
return fetch(  `${apiUrl}${Epos}errorcapture/create`, requestOptions)
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
export function updateerrorcapture(id,user_id,start_time,complete_time,tat_time,error_type,remarks,amendment_type,error_userid,salled_date,beforeafter_etd,
  mtd_number,shipment_number,customer_code,issuer_code,pod, pol, team, region,received_time,
  copy_tpf_details,dp_voyage,receiver_org,shipper_code,mr_code,etd_date,doc_print,doc_cutoff,
  total_errorcapture,type,charge,request_type,exception,trade,maf,maf_remarks,read,draft,sdc,free_time,credit) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({id,user_id,start_time,complete_time,tat_time,error_type,remarks,amendment_type,error_userid,salled_date,beforeafter_etd,
      mtd_number,shipment_number,customer_code,issuer_code,pod, pol, team, region,received_time,
      copy_tpf_details,dp_voyage,receiver_org,shipper_code,mr_code,etd_date,doc_print,doc_cutoff,
      total_errorcapture,type,charge,request_type,exception,trade,maf,maf_remarks,read,draft,sdc,free_time,credit})
};
return fetch(  `${apiUrl}${Epos}errorcapturesheet/errorcaptureupdate/${id}`, requestOptions)
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

function deleteerrorcapture(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrl}${Epos}errorcapturesheet/errorcapturedelete/${id}`, requestOptions)
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
      fork(fetcherrorcapture),
      fork(createerrorcaptureEPOS),
     fork(updateerrorcapture),
     fork(deleteerrorcapture),
    ]);
  }
  