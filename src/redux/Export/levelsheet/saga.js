import { all,fork } from 'redux-saga/effects';
import {apiUrl,Export,apiUrlExport} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';
export const CommunicationlevelService = {
  fetchcommunicationlevel,
  createcommunicationlevel,
  updatecommunicationlevel,
  deletecommunicationlevel,
  fetchcommunicationcount
};
export function fetchcommunicationcount(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlExport}${Export}levelsheet/levelsheetcount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchcommunicationlevel() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrl}${Export}levelsheet`, requestOptions)
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
export function createcommunicationlevel( process_type,from,user_id,customs_type,no_of_shipment,
  dp_voyage,pol,ssy,vesselname,arrivaldate,arrivaltime,custome_declaration,doc_cut_of,subject,remarks,transmission_level,mtd_number,shipment_no,obl_activity,customs_activity,port,email_type,
  start_time,end_time,updated_start_time,updated_end_time,received_time,team) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ process_type,from,user_id,customs_type,no_of_shipment,dp_voyage,pol,ssy,
      vesselname,arrivaldate,arrivaltime,custome_declaration,doc_cut_of,subject,remarks,transmission_level,mtd_number,shipment_no,obl_activity,customs_activity,port,email_type,
      start_time,end_time,updated_start_time,updated_end_time,received_time,team})
};
return fetch(  `${apiUrlExport}${Export}levelsheet/create`, requestOptions)
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
export function updatecommunicationlevel(id, process_type,from,start_date,end_date,user_id,customs_type,no_of_shipment,dp_voyage,pol,ssy,vesselname,arrivaldate,arrivaltime,custome_declaration,doc_cut_of,subject,remarks,transmission_level) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({id, process_type,from,start_date,end_date,user_id,customs_type,no_of_shipment,dp_voyage,pol,ssy,vesselname,arrivaldate,arrivaltime,custome_declaration,doc_cut_of,subject,remarks,transmission_level})
};
return fetch(  `${apiUrl}${Export}levelsheet/levelsheetupdate/${id}`, requestOptions)
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

function deletecommunicationlevel(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrl}${Export}levelsheet/levelsheetdelete/${id}`, requestOptions)
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
      fork(fetchcommunicationlevel),
      fork(createcommunicationlevel),
     fork(updatecommunicationlevel),
     fork(deletecommunicationlevel),
     fork(fetchcommunicationcount)
    ]);
  }
  