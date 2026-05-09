import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Import,apiUrlImport} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
export const DeliveryorderService = {
  fetchDeliveryorder,
  createDeliveryorder,
  updateDeliveryorder,
  deleteDeliveryorder,
  fetchMailrecievedTime,
  fetchdeliveryordercount
};
export function fetchdeliveryordercount(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlImport}${Import }deliveryorder/deliveryordercount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchDeliveryorder() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlImport}${Import}deliveryorder`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

} 

export function fetchMailrecievedTime(mtd_number) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body:JSON.stringify({mtd_number})
};
return fetch(  `${apiUrlImport}${Import}deliveryorder/search`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

} 
export function createDeliveryorder(mtd_number,query_time,user_name,week,date,team,previous_tat,new_tat,
  total_tat,units,start_time,end_time,updated_start_time,updated_end_time) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({mtd_number,query_time,user_name,week,date,team,previous_tat,new_tat,total_tat,units,
      start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrlImport}${Import}deliveryorder/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  
export function updateDeliveryorder(id,mtd_number,query_time,user_name,start_time,end_time,week,date,team,previous_tat,new_tat,total_tat,units) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({mtd_number,query_time,user_name,start_time,end_time,week,date,team,previous_tat,new_tat,total_tat,units})
};
return fetch(  `${apiUrlImport}${Import}deliveryorder/update/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  

function deleteDeliveryorder(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrlImport}${Import}deliveryorder/delete/${id}`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
  export default function* rootSaga() {
    yield all([
      fork(fetchDeliveryorder),
      fork(createDeliveryorder),
     fork(updateDeliveryorder),
     fork(deleteDeliveryorder),
      fork(fetchdeliveryordercount)
    ]);
  }
  