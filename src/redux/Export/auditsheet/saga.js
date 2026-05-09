import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Export,currentUser,apiUrlExport} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';
export const AuditService = {
  fetchaudit,
  createaudit,
  updateaudit,
  deleteaudit,
  fetchIndividualAuditsheet,
  fetchauditcheck,
  fetchauditcount
};
export function fetchauditcount(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlExport}${Export}auditsheet/auditsheetcount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchaudit() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlExport}${Export}auditsheet`, requestOptions)
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
export function fetchauditcheck() {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    // body: JSON.stringify({shipment_no})
};
return fetch(  `${apiUrlExport}${Export}auditsheet/next`, requestOptions)
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

// export function fetchauditcheck() {

//   const requestOptions = {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
//         'Content-Type': 'application/json',
//         ...authHeader()
//       },
// };
// return fetch(  `${apiUrlExport}${Export}auditsheet/next`, requestOptions)
// .then(response => {
//   if(!response.ok) 
//   {
//     if(response.status === 401)
//     {
//       logout()
//     }

//   }
  
//   return response.json();
// })
// .then(user => { 
//     return user;
//     }) 
//     .catch((error) => {
//   });

// } 

export function fetchIndividualAuditsheet(numbers) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
};
return fetch(  `${apiUrlExport}${Export}auditsheet/find/`+numbers, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

} 
export function createaudit(user_id,exception,shipment_type,mtd_type,hbl,time,time_taken,
  no_of_container,no_of_cargoitem,tat_time,no_of_hbl,error,comments,buddy_userid,
  shipment_no,customer,doc_cutoff,aggregated_status,type,date,medium,numbers,bl,etd,
  main_pol,main_voyage,main_pod,issuer,team,error_type,auditor_remarks,audit_userid,corrected_remarks,read,draft,
  sdc,free_time,credit, shipper_coder,mr_code,consignee,audit_category,start_time,end_time,updated_start_time,updated_end_time,status) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({user_id,exception,shipment_type,mtd_type,hbl,time,time_taken,
      no_of_container,no_of_cargoitem,tat_time,no_of_hbl,error,comments,buddy_userid,
      shipment_no,customer,doc_cutoff,aggregated_status,type,date,medium,numbers,bl,etd,
      main_pol,main_voyage,main_pod,issuer,team,error_type,auditor_remarks,audit_userid,corrected_remarks,read,draft,
      sdc,free_time,credit, shipper_coder,mr_code,consignee,audit_category,start_time,end_time,updated_start_time,updated_end_time,status})
};
return fetch(  `${apiUrlExport}${Export}auditsheet/create`, requestOptions)
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
export function updateaudit(id,exception,shipment_type,mtd_type,hbl,user_id,start_date,end_date,time,time_taken,
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
return fetch(  `${apiUrlExport}${Export}auditsheet/auditsheetupdate/${id}`, requestOptions)
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

function deleteaudit(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrlExport}${Export}auditsheet/auditsheetdelete/${id}`, requestOptions)
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
      fork(fetchaudit),
      fork(createaudit),
     fork(updateaudit),
     fork(deleteaudit),
     fork(fetchauditcount)
    ]);
  }
  