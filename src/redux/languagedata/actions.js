import { FETCH_LANGUAGE_DATA_SUCCESS,FETCH_LANGUAGE_DATA_ERROR } from '../actions'



  export const fetch_channelSuccess = (data) => ({
    type: FETCH_LANGUAGE_DATA_SUCCESS,
    payload: data,
  });
  export const fetch_channelError = (message) => ({
    type: FETCH_LANGUAGE_DATA_ERROR,
    payload: { message },
  });
  