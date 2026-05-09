import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Master_gateway} from '../../constants/defaultValues'
import {authHeader} from '../../helpers/authheader';
import axios from 'axios';

export const VbbService = {
    createUservbb,
};
export function createUservbb(user_vbb,team_id,vbb_cycle,user_level,user_id,total_score,average_rating,upload_username,upload_date) {
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({user_vbb,team_id,vbb_cycle,user_level,user_id,total_score,average_rating,upload_username,upload_date})
  };
  return fetch(  `${apiUrl}${Master_gateway}vbb/create`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 
  
  } 

 
  export default function* rootSaga() {
    yield all([
      fork(createUservbb),
    ]);
  } 
  