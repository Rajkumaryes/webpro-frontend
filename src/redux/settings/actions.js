import { CHANGE_LOCALE,CHANGE_LANGUAGE_DATA,GET_LANGUAGE,
  CHANGE_USERNAME,CHANGE_PROFILE_IMAGE ,CHANGE_ROLE,CHANGE_NAME,GET_ROLE_PERMISSION} from '../actions';
import { setCurrentLanguage,setUser_id,setRole_id,setusername } from '../../helpers/Utils';


export function setLanguageData(data) {
  return {
    type: CHANGE_LANGUAGE_DATA,
    payload: data,
  };
}
export function setLanguage(data) {
  return {
    type: GET_LANGUAGE,
    payload: data,
  };
}

export const changeLocale = (locale) => {
  setCurrentLanguage(locale);
  return {
    type: CHANGE_LOCALE,
    payload: locale,
  };
};
export const setUserName = (name,user_id) => {
  
  setUser_id(user_id)
  setusername(name)
  return {
    type: CHANGE_USERNAME,
    payload: name,
  };
};
export const setName = (name) => {


  return {
    type: CHANGE_NAME,
    payload: name,
  };
};
export const setRole = (role) => {
  
  setRole_id(role)
  return {
    type: CHANGE_ROLE,
    payload: role,
  };
};

export const setProfileImage = (name) => {

  return {
    type: CHANGE_PROFILE_IMAGE,
    payload: name,
  };
};

export const setRolePermission = (role_data) => {
  
  return {
    type: GET_ROLE_PERMISSION,
    payload: role_data,
  };
};