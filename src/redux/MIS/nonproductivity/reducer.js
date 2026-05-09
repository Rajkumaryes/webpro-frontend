import { FETCH_USER_SUCCESS,FETCH_USER_ERROR } from '../actions'


const INIT_STATE = {
    data: [],
    loading: false,
    error: '',
  };

  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case FETCH_USER_SUCCESS:
        return { ...state, loading: false, data: action.payload, error: '' };
      case FETCH_USER_ERROR:
        return {
          ...state,
          loading: false,
          data: [],
          error: action.payload.message,
        };
      
      default:
        return { ...state };
    }
  };