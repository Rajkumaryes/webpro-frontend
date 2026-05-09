import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { apiUrl, DisputeProcess, apiUrlDispute } from '../../../constants/defaultValues'
import { authHeader } from '../../../helpers/authheader';
export const disputevalidationService = {
  fetchapi,
  createapi,
  updateapi,
  deleteapi,
  // fileUpload,
  fetchdisputevalidationCount
};
export function fetchdisputevalidationCount(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
      'Content-Type': 'application/json',
      ...authHeader()
    },
    body: JSON.stringify({ user_id })
  };
  return fetch(`${apiUrlDispute}${DisputeProcess}disputevalidation/disputevalidationcount`, requestOptions)
    .then(response => response.json())
    .then(user => {
      return user;
    })
    .catch((error) => {
    });
}
export function fetchapi() {

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
      'Content-Type': 'application/json',
      ...authHeader()
    },
  };
  return fetch(`${apiUrlDispute}${DisputeProcess}disputevalidation`, requestOptions)
    .then(response => response.json())
    .then(user => {
      return user;
    })
    .catch((error) => {
    });

}

export function createapi(user_id, region, area, dispute_id, dispute_type, capture_date,
        dispute_validity, status, followup_with, followup_with_username,
        charge_type, comments, start_time, end_time, updatedstarttime, updated_end_time) {

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
      'Content-Type': 'application/json',
      ...authHeader()
    },
    body: JSON.stringify({
      user_id, region, area, dispute_id, dispute_type, capture_date,
        dispute_validity, status, followup_with, followup_with_username,
        charge_type, comments, start_time, end_time, updatedstarttime, updated_end_time
    })
  };
  return fetch(`${apiUrlDispute}${DisputeProcess}disputevalidation/create`, requestOptions)
    .then(response => response.json())
    .then(user => {
      return user;
    })
    .catch((error) => {
    });

}

export function updateapi(id, dispute_validity, result_code, internal_result, action_request, status,
  last_changed, rec_org, receiver, request, diputeinput, input, document, dispute) {
  const requestOptions = {
    method: 'Post',
    headers: {
      'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
      'Content-Type': 'application/json',
      ...authHeader()
    },
    body: JSON.stringify({
      dispute_validity, result_code, internal_result, action_request, status,
      last_changed, rec_org, receiver, request, diputeinput, input, document, dispute
    })
  };
  return fetch(`${apiUrlDispute}${DisputeProcess}disputevalidation/update/${id}`, requestOptions)
    .then(response => response.json())
    .then(user => {
      return user;
    })
    .catch((error) => {
    });

}

function deleteapi(id) {
  const user_id = localStorage.getItem('user_id') !== null ? parseInt(localStorage.getItem('user_id')) : null
  const requestOptions = {
    method: 'Post',
    headers: {
      'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
      'Content-Type': 'application/json',
      ...authHeader()
    },
    body: JSON.stringify({ user_id })
  };
  return fetch(`${apiUrlDispute}${DisputeProcess}disputevalidation/delete/${id}`, requestOptions)
    .then(response => response.json())
    .then(user => {
      return user;
    })
    .catch((error) => {

    });
}
// export function fileUpload(file)
// {
//   let data = new FormData();
//   data.append('formFile', file);
//   var url = `${apiUrl}${DisputeProcess}disputevalidation/bulkupload`
//   return axios.post(url, data, {
//     headers: {
//     'content-type': 'multipart/form-data',
//     ...authHeader()
//     }
//     })
//     .then(res => {
//      return res

//     })
//     .catch()

// }
export default function* rootSaga() {
  yield all([
    fork(fetchapi),
    fork(createapi),
    fork(updateapi),
    fork(deleteapi),
    fork(fetchdisputevalidationCount)
  ]);
}
