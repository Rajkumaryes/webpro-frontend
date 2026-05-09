import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Export,currentUser,apiUrlExport} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';
export const ReleaseService = {
  fetchrelease,
  createrelease,
  updaterelease,
  deleterelease,
  fetchreleasecount,
};
export function fetchreleasecount(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlExport}${Export}release/releasecount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchrelease() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlExport}${Export}release`, requestOptions)
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
export function createrelease(user_id,dp_voyage,vessel_name,pol,mtd,actualization,start_date,end_date,remarks,team,atd_date_time,
  gst_date_time, msdc_date_time,gstrec_date_time,foo_date_time,final_date_time,time_taken,task,
  start_time,end_time,updated_start_time,updated_end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({user_id,dp_voyage,vessel_name,pol,mtd,actualization,start_date,end_date,remarks,team,atd_date_time,
      gst_date_time, msdc_date_time,gstrec_date_time,foo_date_time,final_date_time,time_taken,task,
      start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrlExport}${Export}release/create`, requestOptions)
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
export function updaterelease(id,dp_voyage,vessel_name,pol,mtd,actualization,start_date,end_date,remarks,atd_date_time,
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
return fetch(  `${apiUrlExport}${Export}release/releaseupdate/${id}`, requestOptions)
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

function deleterelease(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrlExport}${Export}release/releasedelete/${id}`, requestOptions)
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
      fork(fetchrelease),
      fork(createrelease),
     fork(updaterelease),
     fork(deleterelease),
     fork(fetchreleasecount)
    ]);
  }
  