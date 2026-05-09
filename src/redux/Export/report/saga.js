import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Export,teamsiteUrl,apiUrlExport} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
export const reportService = {
  fetchapi,
  fetchTeamSiteapi

};
  export function fetchapi(apiname,page,per_page,startdate,enddate,user_array,is_report,
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
  return fetch(  `${apiUrlExport}${Export}${apiname}/report`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
 

export function fetchTeamSiteapi(team,issuer,shipper_coder,mr_code,consignee,country_code,customer_code,customer,origin,country) {

return fetch(  `${teamsiteUrl}?team=${team}&issuer=${issuer}&shipper_coder=${shipper_coder}
&mr_code=${mr_code}&consignee=${consignee}&country_code=${country_code}&customer_code=${customer_code}
&customer=${customer}&origin=${origin}&country=${country}`)
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
  