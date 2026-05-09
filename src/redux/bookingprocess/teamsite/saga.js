import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,BookingProcess,teamsiteUrlBooking,apiUrlBooking} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
import axios from 'axios';

export const teamsiteService = {
  fetchteamsite,
  createteamsite,
  updateteamsite,
  deleteteamsite,
  fileUpload,
  fetchTeamSiteapi
 
};
  export function fetchteamsite() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlBooking}${BookingProcess}teamsite`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function createteamsite(customer,origin,country,team,status) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ customer,origin,country,team,status})
};
return fetch(  `${apiUrl}${BookingProcess}teamsite/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  
export function updateteamsite(id,customer,origin,country,team,status) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({customer,origin,country,team,status})
};
return fetch(  `${apiUrl}${BookingProcess}teamsite/update/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  

function deleteteamsite(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrl}${BookingProcess}teamsite/delete/${id}`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
export function fileUpload(file)
{
  let data = new FormData();
  data.append('formFile', file);
  var url = `${apiUrl}${BookingProcess}teamsite/bulkupload`
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
export function fetchTeamSiteapi(team,issuer,export_haulage,first_pol,mr_matchcode,country_code,customer_code,customer,origin_title,country_title,cargo_type) {

  return fetch(  `${teamsiteUrlBooking}?team=${team}&issuer=${issuer}&mr_code=${mr_matchcode}&customer_code=${customer_code}&country_code=${country_code}
  &origin=${origin_title}&country=${country_title}&customer=${customer}&export_haulage=${export_haulage}&first_pol=${first_pol}&process=Booking&cargo_type=${cargo_type}`)
  // return fetch(  `${teamsiteUrlBooking}?team=${team}&issuer=${issuer}&shipper_coder=""
  // &mr_code=${mr_matchcode}&consignee=""&country_code=""&customer_code=${customer_code}
  // &customer=${customer}&export_haulage=${export_haulage}&first_pol=${first_pol}&process=Booking`)
  // export function fetchTeamSiteapi(team,issuer,shipper_coder,mr_code,consignee,country_code,customer_code,customer,origin,country) {

  //   return fetch(  `${teamsiteUrl}?team=${team}&issuer=${issuer}&shipper_coder=${shipper_coder}
  //   &mr_code=${mr_code}&consignee=${consignee}&country_code=${country_code}&customer_code=${customer_code}
  //   &customer=${customer}&origin=${origin}&country=${country}`)

  // return fetch(  `${teamsiteUrl}?team=${team}&issuer=${issuer}&customer_code=${customer_code}
  // &customer=${customer}`)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 
  
  }
  export default function* rootSaga() {
    yield all([
      fork(fetchteamsite),
      fork(createteamsite),
     fork(updateteamsite),
     fork(deleteteamsite),
  
    ]);
  }
  