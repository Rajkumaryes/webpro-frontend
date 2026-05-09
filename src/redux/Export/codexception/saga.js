import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Export,currentUser,apiUrlExport} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';
export const CodService = {
  fetchcodexception,
  createcodexception,
  updatecodexception,
  deletecodexception,
  fetchIndividualCod,
  fetchcodcount
};
export function fetchcodcount(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlExport}${Export}codexception/codexceptioncount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchcodexception() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlExport}${Export}codexception`, requestOptions)
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
export function createcodexception(	shipment_no,customer,doc_cutoff,aggregated_status,type,dates,
  times,medium,numbers,bl,etd,main_pol,main_voyage,main_pod,issuer,
  user_id,team,time_taken,exception,exception_number,
  issue_date,status,shipment_number,mtd_number,exception_code,action_party,userid,
  organization_code,issue_time,excep,created_by,start_date,end_date,start_time,end_time,updated_start_time, updated_end_time) {
  
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({shipment_no,customer,doc_cutoff,aggregated_status,type,dates,
      times,medium,numbers,bl,etd,main_pol,main_voyage,main_pod,issuer,
      user_id,team,time_taken,exception,exception_number,
      issue_date,status,shipment_number,mtd_number,exception_code,action_party,userid,
      organization_code,issue_time,excep,created_by,start_date,end_date,start_time,end_time,updated_start_time, updated_end_time,created_by})
};
return fetch(  `${apiUrlExport}${Export}codexception/create`, requestOptions)
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
export function updatecodexception(id,shipment_no,customer,doc_cutoff,aggregated_status,type,dates,
  times,medium,numbers,bl,etd,main_pol,main_voyage,main_pod,issuer,
  user_id,team,start_date_time,end_date_time,time_taken,exception,exception_number,
  issue_date,status,shipment_number,mtd_number,exception_code,action_party,userid,
  organization_code,issue_time,excep,start_date,end_date) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({id,shipment_no,customer,doc_cutoff,aggregated_status,type,dates,
      times,medium,numbers,bl,etd,main_pol,main_voyage,main_pod,issuer,
      user_id,team,start_date_time,end_date_time,time_taken,exception,exception_number,
      issue_date,status,shipment_number,mtd_number,exception_code,action_party,userid,
      organization_code,issue_time,excep,start_date,end_date})
};
return fetch(  `${apiUrlExport}${Export}codexception/codexceptionupdate/${id}`, requestOptions)
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

function deletecodexception(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrlExport}${Export}codexception/codexceptiondelete/${id}`, requestOptions)
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
export function fetchIndividualCod(	numbers) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({numbers})
};
return fetch(  `${apiUrlExport}${Export}codexception/shipmentwise`, requestOptions)
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
      fork(fetchcodexception),
      fork(createcodexception),
     fork(updatecodexception),
     fork(deletecodexception),
     fork(fetchcodcount)
    ]);
  }
  