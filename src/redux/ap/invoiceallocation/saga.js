import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,AP,apiUrlAP} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
import axios from 'axios';
export const invoiceallocationService = {
  fetchapi,
  createapi,
  updateapi,
  deleteapi,
  fileUpload,
  clear_api,
  reassign_api,
  multiupdate_api,
  filter_api,
  fetchUSerBasedapi,
  fetchsummary,
  clearAll,
  fetchinvoicecount
};
export function fetchinvoicecount(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlAP}${AP}invoiceallocation/invoiceallocationcount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchapi() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlAP}${AP}invoiceallocation`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function fetchsummary() {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
};
return fetch(  `${apiUrlAP}${AP}invoiceallocation/region_based`, requestOptions)
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
return fetch(  `${apiUrlAP}${AP}invoiceallocation/userwise`, requestOptions)
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
return fetch(  `${apiUrlAP}${AP}invoiceallocation/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  
export function updateapi(id,name,status) {

  const user_id = localStorage.getItem('user_id') !== null ?  parseInt(localStorage.getItem('user_id')) :null
  const requestOptions = {
    method: 'Post',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({name,status,user_id})
};
return fetch(  `${apiUrlAP}${AP}invoiceallocation/update/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
 
function deleteapi(id) {
  const user_id = localStorage.getItem('user_id') !== null ?  parseInt(localStorage.getItem('user_id')) :null
  const requestOptions = {
      method: 'Post',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ user_id })
  };
  return fetch(`${apiUrlAP}${AP}invoiceallocation/delete/${id}`, requestOptions)
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
  return fetch(`${apiUrlAP}${AP}invoiceallocation/multidelete`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
function clearAll() {
 
  const requestOptions = {
      method: 'Post',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  
  };
  return fetch(`${apiUrlAP}${AP}invoiceallocation/clearall`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
function filter_api(page,per_page,region,area,document_id,companycode,
  user_id,reference,scanlocation,vendor,invoice_status,user_status,tabvalue) {
 
  const requestOptions = {
      method: 'Post',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({page,per_page,region,area,document_id,companycode,
        user_id,reference,scanlocation,vendor,invoice_status,user_status,tabvalue })
  };
  return fetch(`${apiUrlAP}${AP}invoiceallocation/pagination`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
function reassign_api(userarray,region,area,no_of_task,created_by) {
 
  const requestOptions = {
      method: 'Post',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({userarray,region,area,no_of_task,created_by})
  };
  return fetch(`${apiUrlAP}${AP}invoiceallocation/reassign`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
function multiupdate_api(array) {
 
  const requestOptions = {
      method: 'Post',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify(array)
  };
  return fetch(`${apiUrlAP}${AP}invoiceallocation/multiupdate`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
export function fileUpload(file,userarray,region,area,no_of_task,created_by)
{
  let data = new FormData();
  data.append('formFile', file);
  for(var i = 0 ; i< region.length;i++)
  {
    data.append('region['+[i]+']', region[i]);
  }
  for(var i = 0 ; i< area.length;i++)
  {
    data.append('area['+[i]+']', area[i]);
  }
  for(var i = 0 ; i< userarray.length;i++)
  {
    data.append('userarray['+[i]+']', userarray[i]);
  }
  data.append('no_of_task', no_of_task);
  data.append('created_by', created_by);
  var url = `${apiUrlAP}${AP}invoiceallocation/bulkupload`
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

  export default function* rootSaga() {
    yield all([
      fork(fetchapi),
      fork(createapi),
     fork(updateapi),
     fork(deleteapi),
     fork(fetchinvoicecount)
    ]);
  }
  