import { all, fork} from 'redux-saga/effects';
import {apiUrl} from '../../constants/defaultValues'
import {authHeader} from '../../helpers/authheader';
import axios from "axios"

const CancelToken = axios.CancelToken;

let cancel;
export const dashboardService = {
  fetchdashboard,
  fetchdashboard1
 
};
  export function fetchdashboard(API_NAME,array) {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
        timeout: 12000,
        body: JSON.stringify(array)
  };
  return fetch(  `${apiUrl}${API_NAME}dashboard/report`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function fetchdashboard1(API_NAME,array)
{
  
  const headers = {
    'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
    'Content-Type': 'application/json',
    ...authHeader()
  }
  
 
    return axios.post(`${apiUrl}${API_NAME}dashboard/report`, array,  {
      headers: headers,
      // timeout: 12000,
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        }),
      })
      .then((response) => {
        //responce Body
        return response
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("post Request canceled");
        }
      });
         
}


  export default function* rootSaga() {
    yield all([
      fork(fetchdashboard),
    
  
    ]);
  }
  