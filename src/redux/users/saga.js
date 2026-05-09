import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Master_gateway} from '../../constants/defaultValues'
import {authHeader,logout} from '../../helpers/authheader';
import axios from 'axios';
export const userService = {
  fetchuserData,
  createuser,
  updateuser,
  deleteuser,
  updateprofile,
  uploaddata,
  fetchuserDataRolewise,
  fetchprofile,
  userlogin,
  userlogout,
  fetchhierarchyData,
  userhierarchy,
  fetch_hierarchyuserData,
  fetch_hierarchyuserDataUnderTL,
  fetchpagination,
  fetchpermission_user,
  fileUpload,
  fetchuserlogpagination,
  fetch_teamwiseuser,
  userFilter,
  userSearch,
  fetchuserDataProcesswise,
  fetchuserperformance,
  findTlManagers,
  fetchuser_underTlManager
};
export function fetchuser_underTlManager(user_id) {
    
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrl}${Master_gateway}users/fetchusertlmanagers`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

} 
export function findTlManagers(user_id) {
    
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrl}${Master_gateway}users/findtlmanagers`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

} 
  export function fetchuserData() {
    
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      // body: JSON.stringify({ user_id})
  };
  return fetch(  `${apiUrl}${Master_gateway}users/fetch`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function fetchuserperformance(user_id) {
    
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrl}${Master_gateway}users/userperformance`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

} 
export function fetch_hierarchyuserData(team_array) {
  var user_id = localStorage.getItem('user_id') !== null ? localStorage.getItem('user_id'):0
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({team_array})
};
return fetch(  `${apiUrl}${Master_gateway}users/hierarchyuser/${user_id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
export function fetch_hierarchyuserDataUnderTL(team_array,user_id) {
  // var user_id = localStorage.getItem('user_id') !== null ? localStorage.getItem('user_id'):0
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({team_array,user_id})
};
return fetch(  `${apiUrl}${Master_gateway}users/hierarchyuserundertl`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
export function fetchhierarchyData() {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    // body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrl}${Master_gateway}users/hierarchylevel`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
export function userhierarchy(item) {
  const user_id = parseInt(localStorage.getItem('user_id'))
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify(item)
};
return fetch(  `${apiUrl}${Master_gateway}users/hierarchymenu/${user_id}`, requestOptions)
.then(response => response.json())
.then(user => { 
 
    return user;
    }) 
    .catch((error) => {
      return error;
  }); 

}
export function fetchpermission_user(name) {

  const user_id = parseInt(localStorage.getItem('user_id'))
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ name,user_id})
};
return fetch(  `${apiUrl}${Master_gateway}menumanager/menuwise`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 
}  
export function fetchprofile(user_id) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
};
return fetch(  `${apiUrl}${Master_gateway}users/${user_id}`, requestOptions)
.then(response => {
  if(!response.ok) 
  {
    if(response.status === 401)
    {
      logout()
    }

  }
  return response.json();
})
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}  
export function fetchuserDataRolewise() {

  var role_id = parseInt(localStorage.getItem('role_id')),
  user_id = parseInt(localStorage.getItem('user_id'))
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify({role_id,user_id})
};
return fetch(  `${apiUrl}${Master_gateway}users/usersfetch`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
export function uploaddata(update) {
  let user_id = localStorage.getItem('user_id');
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify(update)
};
return fetch(  `${apiUrl}${Master_gateway}users/userupload_save/${user_id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
export function userSearch(username) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({username})
};
return fetch(  `${apiUrl}${Master_gateway}users/user_search`, requestOptions)
.then(response => response.json())
.then(user => { 
 
    return user;
    }) 
    .catch((error) => {
      return error;
  }); 

}

export function userFilter(centre,director,manager,teamleader,region,area,subarea,type) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ centre,director,manager,teamleader,region,area,subarea,type})
};
return fetch(  `${apiUrl}${Master_gateway}users/dashboard_filter`, requestOptions)
.then(response => response.json())
.then(user => { 
 
    return user;
    }) 
    .catch((error) => {
      return error;
  }); 

}
export function userlogin(username, password) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({ username, password})
};
return fetch(  `${apiUrl}${Master_gateway}users/login`, requestOptions)
.then(response => response.json())
.then(user => { 
 
    return user;
    }) 
    .catch((error) => {
      return error;
  }); 

}

export function createuser(name,lastname,email,username,is_active,role_id,mobile_phone,region,area,
  subarea,password,doj ,department,designation,process,level,code,location,teamleader,manager,md,director,geocode,probation,highcost_employee) {
  let created_by = parseInt(localStorage.getItem('user_id'));
  let updated_by= created_by
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ name,lastname,email,username,is_active,role_id,mobile_phone,region,area,
      subarea,password,doj ,department,designation,process,level,code,location,teamleader,manager,md,director,geocode,
      probation,highcost_employee,created_by,updated_by})
};
return fetch(  `${apiUrl}${Master_gateway}users/register`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}

export function updateuser(id,name,lastname,email,username,is_active,role_id,mobile_phone,region,area,
  subarea,password,doj ,department,designation,process,level,code,location,teamleader,manager,md,director,geocode,probation,highcost_employee) {
  let updated_by= parseInt(localStorage.getItem('user_id'));
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({id,name,lastname,email,username,is_active,role_id,mobile_phone,region,area,
      subarea,password,doj ,department,designation,process,level,code,location,teamleader,manager,md,director,geocode,
      probation,highcost_employee,updated_by})
};
return fetch(  `${apiUrl}${Master_gateway}users/update/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}

export function updateprofile(name,lastname,username,password,profile_image_path ) {
  let User_id = localStorage.getItem('user_id');

  const requestOptions = {
    method: 'post',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({name,lastname,username,password,profile_image_path })
};
return fetch(  `${apiUrl}${Master_gateway}users/profile/${User_id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
function deleteuser(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrl}${Master_gateway}users/delete/${id}`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
export function fetchpagination(page, per_page, username, role_id, region, area, subarea,doj,  department, designation,
  process, level, code, location, teamleader, manager, md,director,probation, is_active) {
  

  const requestOptions = {
    method: 'post',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({page, per_page, username, role_id, region, area, subarea,doj,  department, designation,
      process, level, code, location, teamleader, manager, md,director,probation, is_active})
};
return fetch(  `${apiUrl}${Master_gateway}users/pagination`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
export function fetchuserlogpagination(page, per_page, username) {
  

  const requestOptions = {
    method: 'post',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({page, per_page, username})
};
return fetch(  `${apiUrl}${Master_gateway}users/userlog_pagination`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
export function fileUpload(file,user_id)
{
  let data = new FormData();
  data.append('formFile', file);
  data.append('user_id',user_id);
  var url = `${apiUrl}${Master_gateway}users/userupload`
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
export function userlogout() {

  let User_id = localStorage.getItem('user_id');
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
      },
};
return fetch(  `${apiUrl}${Master_gateway}users/logout/${User_id}`, requestOptions)
.then(response => response.json())
.then(user => { 
 
    return user;
    }) 
    .catch((error) => {
      return error;
  }); 

}
export function fetch_teamwiseuser(team_array) {
  // var user_id = localStorage.getItem('user_id') !== null ? localStorage.getItem('user_id'):0
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({team_array})
};
return fetch(  `${apiUrl}${Master_gateway}users/teamuser`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
export function fetchuserDataProcesswise(id) {
  // var user_id = localStorage.getItem('user_id') !== null ? localStorage.getItem('user_id'):0
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify({ id })
};
return fetch(  `${apiUrl}${Master_gateway}users/processuser/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  export default function* rootSaga() {
    yield all([
      fork(fetchuserData),
      fork(fetch_hierarchyuserDataUnderTL),
      fork(createuser),
     fork(updateuser),
     fork(deleteuser),
     fork(updateprofile),
     fork(uploaddata),
     fork(fetchprofile),
     fork(userlogin),
     fork(fileUpload),
     fork(fetch_teamwiseuser),
     fork(fetchuserDataProcesswise),
     fork(fetchuserperformance),
     fork(findTlManagers),
     fork(fetchuser_underTlManager)
    ]);
  }
  