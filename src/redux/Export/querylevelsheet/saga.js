import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Export,currentUser,apiUrlExport} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';
export const QuerylevelService = {
  fetchquerylevel,
  createquerylevel,
  updatequerylevel,
  deletequerylevel,
  fetchqueryresolvecount
};
export function fetchqueryresolvecount(userid) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ userid})
};
return fetch(  `${apiUrlExport}${Export}queryresolvesheet/queryresolvesheetcount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchquerylevel() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlExport}${Export}queryresolvesheet`, requestOptions)
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
export function createquerylevel(shipment_no,exception,status,issue_date,cr,mtd,ap,issue_org,iss_userid,revier_org,user,receiver_org,
  changed_by,last_change,userid,team,created_at,completed,closed
  ,start_time,end_time,updated_start_time,updated_end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({shipment_no,exception,status,issue_date,cr,mtd,ap,issue_org,iss_userid,revier_org,user,receiver_org,
      changed_by,last_change,userid,team,created_at,completed,closed,
       start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrlExport}${Export}queryresolvesheet/create`, requestOptions)
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
export function updatequerylevel(id,shipment_no,exception,status,issue_date,
  cr,mtd,ap,issue_org,iss_userid,revier_org,user,receiver_org,
  changed_by,last_change,start_date,end_date,userid,team,created_at,completed,closed) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({id,shipment_no,exception,status,issue_date,cr,mtd,ap,issue_org,iss_userid,revier_org,user,receiver_org,
      changed_by,last_change,start_date,end_date,userid,team,created_at,completed,closed})
};
return fetch(  `${apiUrlExport}${Export}queryresolvesheet/queryupdate/${id}`, requestOptions)
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

function deletequerylevel(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrlExport}${Export}queryresolvesheet/querydelete/${id}`, requestOptions)
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
      fork(fetchquerylevel),
      fork(createquerylevel),
     fork(updatequerylevel),
     fork(deletequerylevel),
     fork(fetchqueryresolvecount)
    ]);
  }
  