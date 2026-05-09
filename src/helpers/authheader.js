import SimpleCrypto from "simple-crypto-js"
import{userService} from '../redux/users/saga'
import {LiveBuild} from '../constants/defaultValues'

export function authHeader() {
    let token = getToken();
    if (token) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
}

export function encryptToken(token) {

    const encryptInit = new SimpleCrypto('1234567');
    const encryptedToken = encryptInit.encrypt(token);
    return encryptedToken
    
}
export function decryptToken(token) {

    if(token !== null && token)
    {
        const encryptInit = new SimpleCrypto('1234567');
        const decryptToken = encryptInit.decrypt(token);
        return decryptToken
    }
    else
    {
        return ''
    }
   
}
export function getToken() {
   
    let token = localStorage.getItem('access_token');
    if(token && token !== null)
    {
        return decryptToken(token)
    }
    else
    {
        return ''
    }
}
export function setToken(token) {

    let tokenss = encryptToken(token)
    localStorage.setItem('access_token', tokenss);
}

export function logout() {
    console.log('logout');
    logoutAPI()
    localStorage.clear()
    var url = LiveBuild === true ? '/webpro/#' : '/'
    window.location.replace(url)
}
export function logoutAPI()  {
    userService.userlogout()
       .then((res) => {
          if(res.data)
        {
          
        }
    })
    .catch(error => {
    console.log('ERROR ==>', error)})
 }