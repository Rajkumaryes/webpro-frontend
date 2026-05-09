import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Tender,currentUser,apiUrlTender} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';
export const TenderInputService = {
  fetchtenderinput,
  createtenderinput,
  updatetenderinput,
  deletetenderinput,
  fetchinputsheet
};
export function fetchinputsheet(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlTender}${Tender}inputsheet/inputsheetcount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchtenderinput() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlTender}${Tender}inputsheet/fetch`, requestOptions)
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
export function createtenderinput(user_id,mail_receiveddate,tender_actiondate,week,tender_name,
  tender_category,tender_round,lane_count,typeof_tender,activity,subactivity,section,
  no_of_responseactioned,areacode,validity_start,validity_end,bitvolume,accountmanager,
  gtmpoe,tender_feedback,query_type,query_startdate,query_enddate,past_performance,
  mail_sentdate,start_time,end_time,updated_start_time,updated_end_time,comments) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id,mail_receiveddate,tender_actiondate,week,tender_name,
      tender_category,tender_round,lane_count,typeof_tender,activity,subactivity,section,
      no_of_responseactioned,areacode,validity_start,validity_end,bitvolume,accountmanager,
      gtmpoe,tender_feedback,query_type,query_startdate,query_enddate,past_performance,
      mail_sentdate,start_time,end_time,updated_start_time,updated_end_time,comments})
};
return fetch(  `${apiUrlTender}${Tender}inputsheet/create`, requestOptions)
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
export function updatetenderinput(id,user_id,mail_receiveddate,tender_actiondate,week,tender_name,tender_category,tender_round,lane_count,typeof_tender,activity,subactivity,section,no_of_responseactioned,areacode,validity_start,validity_end,bitvolume,accountmanager,gtmpoe,tender_feedback,query_type,query_startdate,query_enddate,past_performance,mail_sentdate) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({id,user_id,mail_receiveddate,tender_actiondate,week,tender_name,tender_category,tender_round,lane_count,typeof_tender,activity,subactivity,section,no_of_responseactioned,areacode,validity_start,validity_end,bitvolume,accountmanager,gtmpoe,tender_feedback,query_type,query_startdate,query_enddate,past_performance,mail_sentdate})
};
return fetch(  `${apiUrlTender}${Tender}tenderinput/update/${id}`, requestOptions)
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

function deletetenderinput(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrlTender}${Tender}tenderinput/delete/${id}`, requestOptions)
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
      fork(fetchtenderinput),
      fork(createtenderinput),
     fork(updatetenderinput),
     fork(deletetenderinput),
     fork(fetchinputsheet)
    ]);
  }
  