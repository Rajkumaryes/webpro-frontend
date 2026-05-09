import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Epos,currentUser} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
export const ErrorhandlingService = {
  fetcherrorhandling,
  createerrorhandling,
  createerrorhandlingMultiple,
  updateerrorhandling,
  deleteerrorhandling,
  fetcherrorhandlingsearch
};
  export function fetcherrorhandling() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrl}${Epos}errorhandling`, requestOptions)
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
export function fetcherrorhandlingsearch(equipment_number) {
  
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body:JSON.stringify({equipment_number})
};
return fetch(  `${apiUrl}${Epos}errorhandling/search`, requestOptions)
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

export function createerrorhandlingMultiple(arr) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify(arr)
};
return fetch(  `${apiUrl}${Epos}errorhandling/create`, requestOptions)
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
export function createerrorhandling(startdate,equipment_number,events,events_date,end_date,user_id,
  place_of_act,total,reference,issue_code,reported_by,area,activity_type) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({startdate,equipment_number,events,events_date,end_date,user_id,
      place_of_act,total,reference,issue_code,reported_by,area,activity_type})
};
return fetch(  `${apiUrl}${Epos}errorhandling/create`, requestOptions)
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
export function updateerrorhandling(id,start_date,equipment_number,events,events_date,end_date,user_id,
  place_of_act,total,reference,issue_code,reported_by,area,activity_type) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({start_date,equipment_number,events,events_date,end_date,user_id,
      place_of_act,total,reference,issue_code,reported_by,area,activity_type})
};
return fetch(  `${apiUrl}${Epos}errorhandling/update/${id}`, requestOptions)
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

function deleteerrorhandling(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrl}${Epos}errorhandling/delete/${id}`, requestOptions)
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
      fork(fetcherrorhandling),
      fork(createerrorhandling),
     fork(updateerrorhandling),
     fork(deleteerrorhandling),
    ]);
  }
  