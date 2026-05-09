import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,DG,apiUrlDG} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
export const reportService = {
  fetchapi,
  fetchkpiapi,
  fetchdgapi

};
  export function fetchapi(page,per_page,startdate,enddate,user_array,is_report,
    username,menu,submenu,team_id,team,type) {

  
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
        body: JSON.stringify({page,per_page,startdate,enddate,user_array,is_report,
          username,menu,submenu,team_id,team,type})
  };
  return fetch(  `${apiUrlDG}${DG}productivityreport/report`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function fetchkpiapi(apiname,page,per_page,startdate,enddate,user_array,is_report,
  username,menu,submenu,team_id,team,type,area) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify({page,per_page,startdate,enddate,user_array,is_report,
        username,menu,submenu,team_id,team,type,area})
};
return fetch(  `${apiUrlDG}${DG}kpireport/${apiname}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
export function fetchdgapi(page,per_page,startdate,enddate,user_array,is_report,
  username,menu,submenu,team_id,team,type) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify({page,per_page,startdate,enddate,user_array,is_report,
        username,menu,submenu,team_id,team,type})
};
return fetch(  `${apiUrlDG}${DG}kpireport/report`, requestOptions)
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
,
    ]);
  }
  