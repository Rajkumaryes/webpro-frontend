import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Epos,currentUser} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';
export const StreetturnsService = {
  fetchstreetturns,
  createstreetturns,
  updatestreetturns,
  deletestreetturns,
  fetchIndividualstreetturns
};
  export function fetchstreetturns() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrl}${Epos}streetturns`, requestOptions)
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

export function fetchIndividualstreetturns(mail_date) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({mail_date})
      
};
return fetch(  `${apiUrl}${Epos}streetturns/search`, requestOptions)
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
export function createstreetturns(user_id,start_date,end_date,mail_date,stturn_code,event_updated,
  purple_category,no_of_checks,no_of_query,event_deleted,area,start_time,end_time,updated_start_time,updated_end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({user_id,start_date,end_date,mail_date,stturn_code,event_updated,
      purple_category,no_of_checks,no_of_query,event_deleted,area,start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrl}${Epos}streetturns/create`, requestOptions)
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
export function updatestreetturns(id,exception,shipment_type,mtd_type,hbl,user_id,start_date,end_date,time,time_taken,
                              no_of_container,no_of_cargoitem,tat_time,no_of_hbl,error,comments,buddy_userid,
                              shipment,customer,doc_cutoff,aggregated_status,type,date,medium,numbers,bl,etd,
                              main_pol,main_voyage,main_pod,issuer,team,read,draft,sdc,free_time,credit) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({id,exception,shipment_type,mtd_type,hbl,user_id,start_date,end_date,time,time_taken,
                      no_of_container,no_of_cargoitem,tat_time,no_of_hbl,error,comments,buddy_userid,
                      shipment,customer,doc_cutoff,aggregated_status,type,date,medium,numbers,bl,etd,
                      main_pol,main_voyage,main_pod,issuer,team,read,draft,sdc,free_time,credit})
};
return fetch(  `${apiUrl}${Epos}streetturnssheet/streetturnssheetupdate/${id}`, requestOptions)
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

function deletestreetturns(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrl}${Epos}streetturnssheet/streetturnssheetdelete/${id}`, requestOptions)
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
      fork(fetchstreetturns),
      fork(createstreetturns),
     fork(updatestreetturns),
     fork(deletestreetturns),
    ]);
  }
  