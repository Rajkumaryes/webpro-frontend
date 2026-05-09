import { FETCH_ROLE_SUCCESS,FETCH_ROLE_ERROR } from '../actions'



  export const fetch_channelSuccess = (data) => ({
    type: FETCH_ROLE_SUCCESS,
    payload: data,
  });
  export const fetch_channelError = (message) => ({
    type: FETCH_ROLE_ERROR,
    payload: { message },
  });
  