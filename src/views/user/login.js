import React, { useState, useEffect } from 'react';
import { Row, Card, Input, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { createNotification } from '../../toast';
import { Formik, Form, Field } from 'formik';
import { NotificationManager } from '../../components/common/react-notifications';
import {userService} from '../../redux/users/saga'
import {setToken  } from '../../helpers/authheader'
import { loginUser } from '../../redux/actions';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import {adminRoot} from '../../constants/defaultValues'
import Loading from "react-fullscreen-loading";
import{roleService} from '../../redux/role/saga'
import{levelService} from '../../redux/level/saga'
import sideMenuItems from '../../containers/navs/menu';
import HapagLogo from '../../assets/logos/Hapag-Lloyd-Logo.png'
import WebproLoginLogo from '../../assets/logos/Webpro-Login-Logo.jpg'
import WebproLogo from '../../assets/logos/Webpro-Logo.png'
import Eyeopen from '../../assets/img/app_image/eyeopen.png'
import Eyeclose from '../../assets/img/app_image/eyeclose.png'
import login_image from '../../assets/img/login/login_image.jpg'


const Login = ({ history, error }) => {
  const [username,setusername] = useState('');
  const [password,setpassword] = useState('');
  const [showpassword,setshowpassword] = useState(false);
  const [loading,setloading] = useState(true);
  const [role_data,setrole_data] = useState([]);
  

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error, 'Login Error', 3000, null, null, '');
    }
    fetchrole_permissionData()
  }, [error]);

  const fetchrole_permissionData  =() =>
  {  

    roleService.fetchrolepermissionData()
      .then((res) => { 
        setloading(false)
        if(res.status)
          {
            setrole_data(res.data)
          }            
    
    })
    .catch((error) => { 
      setloading(false)
     });   
 }
  const onUserLogin = () => {
    if (username !== '' && password !== '') {
      setloading(true)
      userService.userlogin(username,password)
      .then((res) => {
        setloading(false)
        if(res.status){
          if(res.data)  
          {
              getpath(res.data)
          }
        }	
        else{
        createNotification('Incorrect Credentials','error','filled')      
        }		
      })
      .catch((error) => { });
         setloading(false)
       }
    
  };
  const getpath = (data)=>
  {
    let token = data.remember_token,path = '',
    role_id = data.role_id
   
    var list = []
    for(var i = 0; i<role_data.length;i++)
    {
         var subs = [],children = role_data[i].children,value = {key:role_data[i].key}
         if(role_data[i].role_id.includes(parseInt(role_id)))
         {
           if(role_data[i].key === 'Dashboard')
           {
              path = '/app/dashboard'
              break;
           }
           else
           {
            for(var j = 0; j<children.length;j++)
            {
              if(children[j].role_id.includes(parseInt(role_id)))
              {
                subs.push(children[j])
              }
            }
            value.subs = subs
            list.push(value)
            break;
           }
           
           
           
         }
    }
    
    if(list.length > 0)
    {
      for(var j = 0; j<sideMenuItems.length;j++)
      {
          if(list[0].key  === sideMenuItems[j].key)
          {
            var subs = getmenuItem(list[0].subs,sideMenuItems[j].subs)
            if(subs.length > 0)
            {
              path = subs[0].to
            }
          }
      }
    }
    
    console.log("kjkvk path = " , JSON.stringify(path))
    if(path !== "")
    {
      createNotification('Login Success','success','filled')   
      setToken(token)
      localStorage.setItem('user_id',data.id);
      localStorage.setItem('role_id',data.role_id);
      localStorage.setItem('mainpath',path);
      localStorage.setItem('userLevel',data.level);
      localStorage.setItem('username',data.username);
      // console.log("raj",data)
      history.push(`${path}`);
    }
    else
    {
      createNotification('There is no permission for any menu','error','filled')
    }

  

  }
 function getmenuItem(data,sideMenuItems)
 {
  
    var subs = [] 
     for(var i = 0; i<data.length;i++)
    {
          for(var j = 0; j<sideMenuItems.length;j++)
          {
              if(data[i].key  === sideMenuItems[j].key)
              {
                if(sideMenuItems[j].subs)
                {
                  if(sideMenuItems[j].subs.length > 0)
                  {
                    subs.push(sideMenuItems[j].subs[0])
                  }
                }
                else
                {
                  subs.push(sideMenuItems[j])
                }
                break;
              
              }
          }
    }

    return subs
 }
  const initialValues = { username, password };

  return (
    <Row className="h-100">
      <title>Login</title>
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
        {loading && 
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.0)" loaderColor="#EF6432" />
          </div>
        }
        <div className="position-relative image-side" style = {{backgroundImage :`url(${WebproLoginLogo})`,backgroundRepeat:'round'}}>
          </div> 
         
          <div className="form-side">
          <div className = "login-web-hide">
              <div className = "row" style = {{margin:'12px 0px'}}>
                    <div className = "col-md-7">
                       <img src={HapagLogo} alt="thumbnail"
                        style = {{width:'100%',marginLeft:'-22px',marginTop:'-15px'}} />
                    </div>
                    <div className = "col-md-5">
                        <p className = "fontstyle login-lbl login-lbl-font">LOGIN</p>
                    </div>

              </div>
            </div>

            <Formik initialValues={initialValues} onSubmit={onUserLogin}>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="User Name" />
                    </Label>
                    <Input className="form-control fontstyle"
                    id= "username"
                    value = {username}  
                    onChange= {(e)=>setusername(e.target.value.toUpperCase())} />
                    
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.password" />
                    </Label>
                    <Input className="form-control fontstyle"
                    id= "password"
                     type= {showpassword ? 'text' : 'password'}
                    value = {password}  
                    onChange= {(e)=>setpassword(e.target.value)} />
                    <img src={showpassword  ? Eyeclose : Eyeopen} alt="thumbnail"  
                            style = {{width :'15px',height:'15px',cursor:'pointer',position:'absolute',right:'10px',top:'10px'}}
                            onClick={()=>setshowpassword(!showpassword)}/>
                  </FormGroup>
                  <div className = "login-web-hide">
                     <div className="d-flex justify-content-between align-items-center">
                     <NavLink to="/user/forgot-password" style = {{color:'black'}}>
                      <IntlMessages id="user.forgot-password-question" />
                        </NavLink>
                      <Button
                          color="primary"
                          size="lg" 
                          className={`btn-shadow btn-multiple-state ${
                            loading ? 'show-spinner' : ''
                          }`}
                          // onClick = {()=>onUserLogin()}
                        >
                          <span className="spinner d-inline-block">
                            <span className="bounce1" />
                            <span className="bounce2" />
                            <span className="bounce3" />
                          </span>
                          <span className="label">
                            Login
                          </span>
                        </Button>
                 
                      </div>
                   </div>
                 
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = ({ authUser }) => {
  const { loading, error } = authUser;
  return { loading, error };
};

export default connect(mapStateToProps, {
  loginUserAction: loginUser,
})(Login);
