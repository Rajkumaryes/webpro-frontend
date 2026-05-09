import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { apiUrl, DisputeProcess, apiUrlDispute } from '../../../constants/defaultValues'
import { authHeader } from '../../../helpers/authheader';
import axios from 'axios';

export const disputecaptureService = {
  fetchapi,
  createapi,
  updateapi,
  deleteapi,
  fileUpload,
  multiupdate_api,
  fetchdisputecaptureCount
};
export function fetchdisputecaptureCount(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
      'Content-Type': 'application/json',
      ...authHeader()
    },
    body: JSON.stringify({ user_id })
  };
  return fetch(`${apiUrlDispute}${DisputeProcess}disputecapture/disputecapturecount`, requestOptions)
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
  return fetch(`${apiUrlDispute}${DisputeProcess}disputecapture`, requestOptions)
    .then(response => response.json())
    .then(user => {
      return user;
    })
    .catch((error) => {
    });

}

export function createapi(user_id, start_time, end_time, from, subject, mail_received, original_invoice, dispute_status, dispute_id,
  invoice_number, mtd_number, amount_disputed, dispute_des, dispute_code, dispute_creation, company_name,
  phone_number, email, dispute_source, process, country, payer, receiver_user, remarks, start_times, end_times, updated_start_time, updated_end_time) {

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
      'Content-Type': 'application/json',
      ...authHeader()
    },
    body: JSON.stringify({
      user_id, start_time, end_time, from, subject, mail_received, original_invoice, dispute_status, dispute_id,
      invoice_number, mtd_number, amount_disputed, dispute_des, dispute_code, dispute_creation, company_name,
      phone_number, email, dispute_source, process, country, payer, receiver_user, remarks, start_times, end_times, updated_start_time, updated_end_time
    })
  };
  return fetch(`${apiUrlDispute}${DisputeProcess}disputecapture/create`, requestOptions)
    .then(response => response.json())
    .then(user => {
      return user;
    })
    .catch((error) => {
    });

}

export function updateapi(id, user_id, start_time, end_time, from, subject, mail_received, original_invoice, dispute_status, dispute_id,
  invoice_number, mtd_number, amount_disputed, dispute_des, dispute_code, dispute_creation, company_name,
  phone_number, email, dispute_source, process, country, payer, receiver_user, remarks) {
  const requestOptions = {
    method: 'Post',
    headers: {
      'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
      'Content-Type': 'application/json',
      ...authHeader()
    },
    body: JSON.stringify({
      user_id, start_time, end_time, from, subject, mail_received, original_invoice, dispute_status, dispute_id,
      invoice_number, mtd_number, amount_disputed, dispute_des, dispute_code, dispute_creation, company_name,
      phone_number, email, dispute_source, process, country, payer, receiver_user, remarks
    })
  };
  return fetch(`${apiUrlDispute}${DisputeProcess}disputecapture/update/${id}`, requestOptions)
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
  return fetch(`${apiUrlDispute}${DisputeProcess}disputecapture/delete/${id}`, requestOptions)
    .then(response => response.json())
    .then(user => {
      return user;
    })
    .catch((error) => {

    });
}
export function fileUpload(file, user_id) {
  let data = new FormData();
  data.append('formFile', file);
  data.append('user_id', user_id);
  console.log('formFile', file)
  var url = `${apiUrlDispute}${DisputeProcess}disputecapture/bulkupload`
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
function multiupdate_api(array) {

  const requestOptions = {
    method: 'Post',
    headers: {
      'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
      'Content-Type': 'application/json',
      ...authHeader()
    },
    body: JSON.stringify(array)
  };
  return fetch(`${apiUrlDispute}${DisputeProcess}disputecapture/disputecapturemultiupdate`, requestOptions)
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
    fork(createapi),
    fork(updateapi),
    fork(deleteapi),
    fork(fetchdisputecaptureCount)
  ]);
}
