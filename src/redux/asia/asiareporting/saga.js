import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,ASIA,currentUser,apiUrlAsia} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';
export const AsiaReportingService = {
  fetchasiareporting,
  createasiareporting,
  updateasiareporting,
  deleteasiareporting,
};
  export function fetchasiareporting() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlAsia}${ASIA}asiareporting`, requestOptions)
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
export function createasiareporting( date,week,month,tat,report,region,start_datetime,end_datetime,start_time,end_time,updated_start_time,updated_end_time,user_id) {
  // const user_id = parseInt(localStorage.getItem('user_id'))
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ date,week,month,tat,report,region,start_datetime,end_datetime,start_time,end_time,updated_start_time,updated_end_time,user_id})
};
return fetch(  `${apiUrlAsia}${ASIA}asiareporting/create`, requestOptions)
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
export function updateasiareporting(id,   date,week,month,tat,report,region,start_datetime,end_datetime) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({id,   date,week,month,tat,report,region,start_datetime,end_datetime})
};
return fetch(  `${apiUrlAsia}${ASIA}asiareportings/update/${id}`, requestOptions)
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

function deleteasiareporting(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrlAsia}${ASIA}asiareportings/delete/${id}`, requestOptions)
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
      fork(fetchasiareporting),
      fork(createasiareporting),
     fork(updateasiareporting),
     fork(deleteasiareporting),
    ]);
  }
  