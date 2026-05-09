import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,SQ} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
import axios from 'axios';
export const quotationdetailsService = {
  fetchapi,
  createapi,
  updateapi,
  deleteapi,
  fileUpload,
  clear_api,
  reassign_api,
  multiupdate_api,
  filter_api,
  filter_correction,
  fetchUSerBasedapi,
  requestnowise,
  add_columnapi,
  fetchIndividualapi,
  filterapi,
  filtercontrolapi,
  delete_columnapi
};
  export function fetchapi() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrl}${SQ}quotationdetails`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function fetchUSerBasedapi(user_id) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify({user_id})
};
return fetch(  `${apiUrl}${SQ}quotationdetails/userwise`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
export function createapi(name,status) {

  const user_id = localStorage.getItem('user_id') !== null ?  parseInt(localStorage.getItem('user_id')) :null
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ name,status,user_id})
};
return fetch(  `${apiUrl}${SQ}quotationdetails/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
export function updateapi(id,request_no,quotation_no,type_of_req,priority,size
  ,received_time,publisher,publisher_status,pub_in_progress,pub_pending_in,pub_pending_out,
  pub_done_time,pub_disregrads,pub_total,pub_routes,comments_publisher,auditor,
  auditor_status,aud_in_progress,aud_pending_in,aud_pending_out,error_log,
  aud_done_time,aud_disregrads,aud_total,aud_routes,comments_audit,
  start_time,end_time,updated_start_time,updated_end_time,region,area,user_id,customer_require) {
  // const user_id = localStorage.getItem('user_id') !== null ?  parseInt(localStorage.getItem('user_id')) :null
  const requestOptions = {
    method: 'Post',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({request_no,quotation_no,type_of_req,priority,size
      ,received_time,publisher,publisher_status,pub_in_progress,pub_pending_in,pub_pending_out,
      pub_done_time,pub_disregrads,pub_total,pub_routes,comments_publisher,auditor,
      auditor_status,aud_in_progress,aud_pending_in,aud_pending_out,error_log,
      aud_done_time,aud_disregrads,aud_total,aud_routes,comments_audit,
      start_time,end_time,updated_start_time,updated_end_time,region,area,user_id,customer_require})
};
return fetch(  `${apiUrl}${SQ}quotationdetails/update/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
 
function deleteapi(id) {
  const user_id = localStorage.getItem('username')
  const requestOptions = {
      method: 'Post',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ user_id })
  };
  return fetch(`${apiUrl}${SQ}quotationdetails/delete/${id}`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
function clear_api(ids) {
 
  const requestOptions = {
      method: 'Post',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ ids })
  };
  return fetch(`${apiUrl}${SQ}quotationdetails/clear_all`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
function filter_api(request_no,area,priority,size,quotation_no,publisher,publisher_status,auditor,auditor_status,start_date,end_date) {
 
  const requestOptions = {
      method: 'Post',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({request_no,area,priority,size,quotation_no,publisher,publisher_status,auditor,auditor_status,start_date,end_date})
  };
  return fetch(`${apiUrl}${SQ}quotationdetails/quotationdetails_filter`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
function filter_correction(request_no,quotation_no,area,internal_external,quotation_done,auditor,error_type,comment,
                          date_time,corrector,log_time) {
  const requestOptions = {
      method: 'Post',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({request_no,quotation_no,area,internal_external,quotation_done,auditor,error_type,comment,
        date_time,corrector,log_time})
  };
  return fetch(`${apiUrl}${SQ}shared/correctionlogsearch`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
function reassign_api(ids) {
 
  const requestOptions = {
      method: 'Post',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify(ids)
  };
  return fetch(`${apiUrl}${SQ}quotationdetails/reassign`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
function multiupdate_api(update) {
 
  const requestOptions = {
      method: 'Post',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({update})
  };
  return fetch(`${apiUrl}${SQ}quotationdetails/multiupdate`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
export function fileUpload(file,user_id)
{
  // const user_id = localStorage.getItem('user_id') !== null ?  parseInt(localStorage.getItem('user_id')) :null
  let data = new FormData();
  data.append('formFile', file);
  data.append('user_id',user_id);
  var url = `${apiUrl}${SQ}quotationdetails/bulkupload`
  return axios.post(url, data, {
    headers: {
    'content-type': 'multipart/form-data',
    ...authHeader()
    }
    })
    .then(res => {
     return res
      
    })
    .catch()
         
}
function requestnowise(request_no) {
 
  const requestOptions = {
      method: 'Post',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({request_no})
  };
  return fetch(`${apiUrl}${SQ}shared/requestnowise`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
export function add_columnapi(columns) {
  const requestOptions = {
    method: 'Post',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({columns})
};
return fetch(  `${apiUrl}${SQ}quotationdetails/addcolumn`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
export function fetchIndividualapi(id) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
};
return fetch(  `${apiUrl}${SQ}quotationdetails/`+id, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

} 
export function filterapi(page,per_page,request_no,area,priority,size,quotation_no,publisher,publisher_status,auditor,auditor_status,start_date,end_date,region) {

  
  const requestOptions = {
    method: 'Post',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({page,per_page,request_no,area,priority,size,quotation_no,publisher,publisher_status,auditor,auditor_status,start_date,end_date,region})
};
return fetch(  `${apiUrl}${SQ}quotationdetails/pagination`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
export function filtercontrolapi(page,per_page,request_no,area,priority,size,quotation_no,publisher,publisher_status,auditor,auditor_status,start_date,end_date,region) {

  
  const requestOptions = {
    method: 'Post',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({page,per_page,request_no,area,priority,size,quotation_no,publisher,publisher_status,auditor,auditor_status,start_date,end_date,region})
};
return fetch(  `${apiUrl}${SQ}quotationdetails/controlscreen_pagination`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
export function delete_columnapi(columns) {

 
  const requestOptions = {
    method: 'Post',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({columns})
};
return fetch(  `${apiUrl}${SQ}quotationdetails/deletecolumn`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
  export default function* rootSaga() {
    yield all([
      fork(fetchapi),
      fork(createapi),
     fork(updateapi),
     fork(deleteapi),
    ]);
  }
  