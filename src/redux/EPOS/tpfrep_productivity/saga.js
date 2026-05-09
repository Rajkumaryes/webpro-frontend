import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Epos,currentUser} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';
export const TPFREPService = {
  fetchTpfrep,
  createTpfrep,
  updateTpfrep,
  deleteTpfrep,
  fetchTpfrepIndividual
};
  export function fetchTpfrep() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrl}${Epos}Tpfrep`, requestOptions)
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
export function fetchTpfrepIndividual(dp_voyage) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body:JSON.stringify({dp_voyage})
};
return fetch(  `${apiUrl}${Epos}tpfrep/search`, requestOptions)
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
export function createTpfrep(	user_id, start_date,end_date,mail_datetime,departure_datetime,ssy,schedule_voy,
  port,eta,terminal,area,vessel_name,dp_voyage,hlgl_format,activity,start_time,end_time,updated_start_time,updated_end_time,ssy_class,
  dir,pol,departure_date,departure_actual,pod,arrival_date,arrival_actual,transit,booking_restr,auto_wo,vco_phase, vessel_operator,
  valid_state,pt, omit, call_sign,fcl_cutoff_date,fcl_cutoff_time,port_authorities_export,port_authorities_import,eventcode,
  late_early_hrs,delay_reason,delay_remark,coastal_arr_dif, coastal_dep_dif,tpfrep_exp,tpfrep_rec,port_departure_actual, port_arrival_actual, port_transit) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({user_id, start_date,end_date,mail_datetime,departure_datetime,ssy,schedule_voy,
      port,eta,terminal,area,vessel_name,dp_voyage,hlgl_format,activity,start_time,end_time,updated_start_time,updated_end_time,ssy_class,
      dir,pol,departure_date,departure_actual,pod,arrival_date,arrival_actual,transit,booking_restr,auto_wo,vco_phase, vessel_operator,
      valid_state,pt, omit, call_sign,fcl_cutoff_date,fcl_cutoff_time,port_authorities_export,port_authorities_import,eventcode,
      late_early_hrs,delay_reason,delay_remark,coastal_arr_dif, coastal_dep_dif,tpfrep_exp,tpfrep_rec,port_departure_actual, port_arrival_actual, port_transit})
};
return fetch(  `${apiUrl}${Epos}tpfrep/create`, requestOptions)
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
export function updateTpfrep(id,shipment_no,customer,doc_cutoff,aggregated_status,type,dates,
  times,medium,numbers,bl,etd,main_pol,main_voyage,main_pod,issuer,
  user_id,team,start_date_time,end_date_time,time_taken,exception) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({id,shipment_no,customer,doc_cutoff,aggregated_status,type,dates,
      times,medium,numbers,bl,etd,main_pol,main_voyage,main_pod,issuer,
      user_id,team,start_date_time,end_date_time,time_taken,exception})
};
return fetch(  `${apiUrl}${Epos}Tpfrep/Tpfrepupdate/${id}`, requestOptions)
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

function deleteTpfrep(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrl}${Epos}Tpfrep/Tpfrepdelete/${id}`, requestOptions)
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
      fork(fetchTpfrep),
      fork(createTpfrep),
     fork(updateTpfrep),
     fork(deleteTpfrep),
    ]);
  }
  