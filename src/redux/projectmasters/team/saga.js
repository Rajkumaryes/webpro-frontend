import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Masters} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
export const teamsService = {
  fetchteams,
  createteams,
  updateteams,
  deleteteams,
 regionwisefilter,
};
let user_id = parseInt(localStorage.getItem('user_id'));
export function fetchteams() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrl}${Masters}teams`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function createteams(team_name,region_id,area_id,country_code,status) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ team_name,region_id,area_id,country_code,status,user_id})
};
return fetch(  `${apiUrl}${Masters}teams/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  
export function updateteams(id,team_name,region_id,area_id,country_code,status) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({team_name,region_id,area_id,country_code,status,user_id})
};
return fetch(  `${apiUrl}${Masters}teams/update/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  

function deleteteams(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrl}${Masters}teams/delete/${id}`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
export function regionwisefilter(region_id) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ region_id})
};
return fetch(  `${apiUrl}${Masters}teams/regionwise`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  export default function* rootSaga() {
    yield all([
      fork(fetchteams),
      fork(createteams),
     fork(updateteams),
     fork(deleteteams),
  
    ]);
  }
  