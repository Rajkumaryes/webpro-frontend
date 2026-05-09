import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Export,currentUser,apiUrlExport} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';
export const OtService = {
  fetchot,
  createot,
  updateot,
  deleteot,
  fetchotcount
};
export function fetchotcount(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlExport}${Export}ot/otcount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchot() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlExport}${Export}ot`, requestOptions)
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
export function createot(	shipment_no,customer,dates,times,medium,numbers,bl,etd,main_pod,
  issuer,user_id,team,type_of_ot,time_taken,start_time,end_time,updated_start_time,updated_end_time
  ) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({shipment_no,customer,dates,times,medium,numbers,bl,etd,main_pod,
      issuer,user_id,team,type_of_ot,time_taken,start_time,end_time,updated_start_time,updated_end_time
    })
};
return fetch(  `${apiUrlExport}${Export}ot/create`, requestOptions)
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
export function updateot(id,shipment_no,customer,dates,times,medium,numbers,bl,etd,main_pod,issuer,user_id,team,type_of_ot,start_date,end_date, time_taken
  ) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({id,shipment_no,customer,dates,times,medium,numbers,bl,etd,main_pod,issuer,user_id,team,type_of_ot,start_date,end_date, time_taken
    })
};
return fetch(  `${apiUrlExport}${Export}ot/update/${id}`, requestOptions)
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

function deleteot(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrlExport}${Export}ot/delete/${id}`, requestOptions)
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
      fork(fetchot),
      fork(createot),
     fork(updateot),
     fork(deleteot),
     fork(fetchotcount)
    ]);
  }
  