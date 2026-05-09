import { FETCH_CHANNEL_SUCCESS,FETCH_CHANNEL_ERROR } from '../../../actions'



  export const fetch_channelSuccess = (data) => ({
    type: FETCH_CHANNEL_SUCCESS,
    payload: data,
  });
  export const fetch_channelError = (message) => ({
    type: FETCH_CHANNEL_ERROR,
    payload: { message },
  });
  