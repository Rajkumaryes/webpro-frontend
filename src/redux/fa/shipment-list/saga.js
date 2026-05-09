import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,FA,apiUrlFA} from '../../../constants/defaultValues';
import {authHeader} from '../../../helpers/authheader';
import axios from 'axios';
import { searchshipmentDetails } from '../shipment-details/saga';

export const ShipmentListService = {
  filtershipmentList,
  updateshipmentList,
};
export function filtershipmentList(page,per_page,subregion,contract_party,data,export_quality,import_quality,startdate,enddate,auditor,tabvalue,is_report,user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({page,per_page,subregion,contract_party,data,export_quality,import_quality,startdate,enddate,auditor,tabvalue,is_report,user_id})
};
return fetch(  `${apiUrlFA}${FA}shipmentdetails/shipmentlist_filter`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  
export function updateshipmentList(name,status) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({name,status})
};
return fetch(  `${apiUrlFA}${FA}multipleupdate`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  

  export default function* rootSaga() {
    yield all([
      fork(filtershipmentList),
     fork(updateshipmentList),
  
    ]);
  }
  