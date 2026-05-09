import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Export,currentUser,apiUrlExport} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';
export const CorrectionsheetService = {
  fetchcorrection,
  createcorrection,
  updatecorrection,
  deletecorrection,
  fetchIndividualcorrectionsheet,
  fetchmtdcount,
  fetchcorrectioncount
};
export function fetchcorrectioncount(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlExport}${Export}correctionsheet/correctionsheetcount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchcorrection() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlExport}${Export}correctionsheet`, requestOptions)
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

export function createcorrection(user_id,dcsrstart_time,complete_time,tat_time,error_type,remarks,amendment_type,error_userid,salled_date,beforeafter_etd,
  mtd_number,shipment_no,customer_code,issuer_code,pod, pol, team, region,received_time,copy_tpf_details,dp_voyage,receiver_org,shipper_code,mr_code,
  etd_date,doc_print,doc_cutoff,total_correction,type,charge,request_type,exception,consignee,trade,maf,maf_remarks,read,draft,sdc,free_time,credit,start_time,end_time,updated_start_time,updated_end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({user_id,dcsrstart_time,complete_time,tat_time,error_type,remarks,amendment_type,error_userid,salled_date,beforeafter_etd,
      mtd_number,shipment_no,customer_code,issuer_code,pod, pol, team, region,received_time,
      copy_tpf_details,dp_voyage,receiver_org,shipper_code,mr_code,etd_date,doc_print,doc_cutoff,
      total_correction,type,charge,request_type,exception,consignee,trade,maf,maf_remarks,read,draft,sdc,free_time,credit,start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrlExport}${Export}correctionsheet/create`, requestOptions)
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
export function updatecorrection(id,user_id,start_time,complete_time,tat_time,error_type,remarks,amendment_type,error_userid,salled_date,beforeafter_etd,
  mtd_number,shipment_no,customer_code,issuer_code,pod, pol, team, region,received_time,
  copy_tpf_details,dp_voyage,receiver_org,shipper_code,mr_code,etd_date,doc_print,doc_cutoff,
  total_correction,type,charge,request_type,exception,trade,maf,maf_remarks,read,draft,sdc,free_time,credit) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({id,user_id,start_time,complete_time,tat_time,error_type,remarks,amendment_type,error_userid,salled_date,beforeafter_etd,
      mtd_number,shipment_no,customer_code,issuer_code,pod, pol, team, region,received_time,
      copy_tpf_details,dp_voyage,receiver_org,shipper_code,mr_code,etd_date,doc_print,doc_cutoff,
      total_correction,type,charge,request_type,exception,trade,maf,maf_remarks,read,draft,sdc,free_time,credit})
};
return fetch(  `${apiUrlExport}${Export}correctionsheet/correctionupdate/${id}`, requestOptions)
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

function deletecorrection(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrlExport}${Export}correctionsheet/correctiondelete/${id}`, requestOptions)
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
export function fetchIndividualcorrectionsheet(mtd_number,received_time) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify({ mtd_number,received_time })
};
return fetch(  `${apiUrlExport}${Export}correctionsheet/find`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
export function fetchmtdcount(mtd_number) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
};
return fetch(  `${apiUrlExport}${Export}correctionsheet/mtdcount/`+mtd_number, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  





  export default function* rootSaga() {
    yield all([
      fork(fetchcorrection),
      fork(createcorrection),
     fork(updatecorrection),
     fork(deletecorrection),
     fork(fetchcorrectioncount),
    ]);
  }
  