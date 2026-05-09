import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx,Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Input,Button} from 'reactstrap';
import 'antd/dist/antd.css';
import {onChangeLanguage} from '../../../helper'
import { createNotification } from '../../../toast';
import {userService} from '../../../redux/users/saga'
import {setProfileImage,setName } from '../../../redux/actions';
import {fileUploadService} from '../../../redux/fileupload/saga'
import Loading from "react-fullscreen-loading";
import BackIcon from '../../../assets/img/app_image/left-arrow.png'
import {logoutAPI} from '../../../helpers/authheader';

class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading:false,
         id:0,
        username:'',
        lastname:'',
        password:'',
        confirmpassword:'',
       user_id : parseInt(localStorage.getItem('user_id'))
    };
  }

componentDidMount() {
    if(localStorage.getItem('user_id') !== null)
    {
        let user_id = localStorage.getItem('user_id')
        this.fetchprofile(parseInt(user_id))
    }
    
  }
fetchprofile(user_id)  {
    this.setState({
        loading : true
      })
    userService.fetchprofile(user_id)
       .then((res) => {
        this.setState({
            loading : false
          })
          if(res.data)
            {
               
                this.setValue(res.data)
            }
    })
    .catch(error => {
        this.setState({
            loading : false
          })
    console.log('ERROR ==>', error)})
 }
setValue(value)
{
     this.setState({
             id:parseInt(value.id),
             profile_image_path:value.profile_image_path !== null ? value.profile_image_path :'',
             name:value.name !== null ? value.name :'',
             lastname:value.lastname !== null ? value.lastname :'',
             mobile:value.mobile !== null ? value.mobile :'',
             username:value.username !== null ? value.username :'',
         })      
}

 handleLogout = () => {
  logoutAPI()
  localStorage.clear()
  this.props.history.push('/user/login')
}; 
onSubmitpage = () => {
      const {name,lastname,username,password,confirmpassword,profile_image_path} = this.state;
      if(name !== ""  && username !== "" )
      {
            var isfill = true
            if(password !== "")
            {
                if(password !== confirmpassword)
                {
                    isfill = false
                }
            }
            if(isfill)
            {
                userService.updateprofile(name,lastname,username,password,profile_image_path )
                .then((data) => {
                    if(data.status)  
                     {          
                          createNotification('Updated','success','filled')
                            if(username !== "")
                            {
                                this.props.setNameAction(name,this.state)
                            }
                            if(profile_image_path !== "")
                            {
                                 this.props.setProfileImageAction(profile_image_path)
                            }
                            this.handleLogout();
                        }
                        else
                        {
                          createNotification('Please enter mandatory fields','error','filled')
                        }
                })
            }
            else
            {
            createNotification('Password Error','error','filled')
            }
        }
        else
        {
        createNotification('Please enter mandatory fields','error','filled')
        }
      }

onClickback()
  {
    this.props.history.goBack()
  }
  onChangeFileUpload(files)
  {
  this.setState({
    loading : true
  })
  fileUploadService.fileUpload(files[0])
    .then((res) => {
        this.setState({
            loading : false
          }) 
      if(res.status)
      {
       
        if(res.data.status)   
        {   
       
          createNotification('Uploaded','success','filled')
          this.setState({
            profile_image_path : res.data.url,
          })
        }    
      }
        
  
  })
  .catch((error) => { 
    this.setState({
      loading : false
    })
    });
}

render()
  {
    
    const {match,locale,languageData} = this.props
    const { username,lastname,password,confirmpassword,name,loading} = this.state
    return (
      <>
      <title>{ onChangeLanguage(locale,'Profile',languageData)} </title>
          <Row>
            <Colxx xxs="12">
                <img src={BackIcon} alt="thumbnail"  
                style = {{width :'25px',height:'25px',cursor :'pointer',marginTop :'-9px',marginRight:'10px'}}
                onClick={()=>this.onClickback()}/>
                <h1>{ onChangeLanguage(locale,'Profile',languageData)}</h1>
                {/* <Breadcrumb heading= { onChangeLanguage(locale,'Profile',languageData)} match={match} /> */}
                <Button color="primary" className = 'fontstyle button-width'
                        onClick={()=>this.onSubmitpage()}  
                        style= {{margin :'0px 2px',position:'absolute',right :'10px'}}>
                        {'Save'}
                </Button>       
				    	<Separator className="mb-5" />
            </Colxx>
            </Row>
            {loading && 
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
            <Row>
            <Colxx xxs="2" className="mb-4">
                <Label>{ onChangeLanguage(locale,'First Name',languageData)}
                 <a style = {{color :'red'}}>*</a></Label>
            </Colxx>
            <Colxx xxs="10" className="mb-4">
                <Input 
                placeholder ={ onChangeLanguage(locale,'First Name',languageData)} 
                value = {name}  
                onChange= {(e)=>this.setState({name : e.target.value})} ></Input>
            </Colxx>
          </Row>
          <Row>
            <Colxx xxs="2" className="mb-4">
              <Label>{ onChangeLanguage(locale,'Last Name',languageData)}
             </Label>
              </Colxx>
              <Colxx xxs="10" className="mb-4">
                <Input 
                placeholder ={ onChangeLanguage(locale,'Last Name',languageData)}
                value = {lastname}  
                onChange= {(e)=>this.setState({lastname : e.target.value})} ></Input>
              </Colxx>
          </Row>
            <Row>
            <Colxx xxs="2" className="mb-4">
              <Label>{ onChangeLanguage(locale,'User ID',languageData)}
              <a style = {{color :'red'}}>*</a></Label>
              </Colxx>
              <Colxx xxs="10" className="mb-4">
                <Input 
                placeholder = { onChangeLanguage(locale,'User ID',languageData)}
                value = {username}  
                disabled = {true}
                onChange= {(e)=>this.setState({username : e.target.value.toUpperCase()})} ></Input>
              </Colxx>
          </Row>
          <Row>
            <Colxx xxs="2" className="mb-4">
            <Label>{ onChangeLanguage(locale,'Password',languageData)}</Label>
            </Colxx>
            <Colxx xxs="10" className="mb-4">
               <Input type = "password"
               placeholder = { onChangeLanguage(locale,'Password',languageData)}
               value = {password}  
               onChange= {(e)=>this.setState({password : e.target.value})} ></Input>
            </Colxx>
         </Row>
         <Row>
            <Colxx xxs="2" className="mb-4">
            <Label>{ onChangeLanguage(locale,'Confirm Password',languageData)}</Label>
            </Colxx>
            <Colxx xxs="10" className="mb-4">
               <Input type = "password"
               placeholder ={ onChangeLanguage(locale,'Confirm Password',languageData)}
               value = {confirmpassword}  
               onChange= {(e)=>this.setState({confirmpassword : e.target.value})} ></Input>
            </Colxx>
         </Row>
         <Row>
            <Colxx xxs="2" className="mb-4">
            <Label>{ onChangeLanguage(locale,'Profile Image',languageData)}</Label>
            </Colxx>
            <Colxx xxs="10" className="mb-4">
            <Input type="file" 
              accept="image/*"
              onClick ={(e) => e.target.value=null }
              onChange={({target: { files }}) => this.onChangeFileUpload(files)}
              /> 
           </Colxx>
        </Row>
         </>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale,languageData} = settings;
  return {locale, languageData};
};
export default injectIntl(
  connect(mapStateToProps, {
    setProfileImageAction:setProfileImage,
    setNameAction : setName,
  })(RegisterUser)
);

