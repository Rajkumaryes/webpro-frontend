import { FETCH_GROUP_SUCCESS,FETCH_GROUP_ERROR } from '../actions'



  export const fetch_channelSuccess = (data) => ({
    type: FETCH_GROUP_SUCCESS,
    payload: data,
  });
  export const fetch_channelError = (message) => ({
    type: FETCH_GROUP_ERROR,
    payload: { message },
  });
  