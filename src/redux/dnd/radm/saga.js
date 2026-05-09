import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,DnD,apiUrlDD} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
export const radmService = {
  fetchradm,
  createradm,
  fetchradmcount
};
export function fetchradmcount(user) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user})
};
return fetch(  `${apiUrlDD}${DnD}radm/radmcount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchradm() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlDD}${DnD}radm`, requestOptions)
  .then(response => {
    if(!response.ok) 
    {
      if(response.status === 401)
      {
        logout()
      }
  
    }
    return response.json();
  })
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    });

}  
export function createradm(user,region,subareas, date,week, month,imports_export,total,start_datetime,end_datetime,tat,filename,
trigger,re_export,re_use,triggers,re_exports,re_uses,blocked_byra,completed,missing_cases,wrong_seq,duplications,others,triggered,
queries,amount_usd,start_time,end_time,updated_start_time,updated_end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user,region,subareas, date,week, month,imports_export,total,start_datetime,end_datetime,tat,filename,
      trigger,re_export,re_use,triggers,re_exports,re_uses,blocked_byra,completed,missing_cases,wrong_seq,duplications,others,triggered,
      queries,amount_usd,start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrlDD}${DnD}radm/create`, requestOptions)
.then(response => {
  if(!response.ok) 
  {
    if(response.status === 401)
    {
      logout()
    }

  }
  return response.json();
})
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });

}

  export default function* rootSaga() {
    yield all([
      fork(fetchradm),
      fork(createradm),
      fork(fetchradmcount)
    ]);
  }
  