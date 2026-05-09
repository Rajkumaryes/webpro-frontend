import { FETCH_LANGUAGE_SUCCESS,FETCH_LANGUAGE_ERROR } from '../actions'



  export const fetch_channelSuccess = (data) => ({
    type: FETCH_LANGUAGE_SUCCESS,
    payload: data,
  });
  export const fetch_channelError = (message) => ({
    type: FETCH_LANGUAGE_ERROR,
    payload: { message },
  });
  