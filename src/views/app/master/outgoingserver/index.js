import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import 'antd/dist/antd.css';
import {onChangeLanguage} from '../../../../helper'
import { createNotification } from '../../../../toast';
import{outgoingService} from '../../../../redux/outgoingserver/saga'

class MasterPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
       from_email:'',
        host:'',
        port: 0,
        username:'',
        password:''
      };
    }
    componentWillMount()
    {
        this.fetchData()
    }
    fetchData() {  
      outgoingService.fetchuoutgoingserver()
        .then((res) => { 
          if(res.data)
            {
                this.setState({ 
                from_email:res.data[0].from_email,
                host:res.data[0].host,
                port:res.data[0].port,
                username:res.data[0].username,
                password:res.data[0].password
                         
              }) 
            }            
      
      })
      .catch((error) => { 
        });   
   }
    
    onSubmit() { 
      const {from_email, host,port,username,password} = this.state;

      if(from_email !== "" && host !== ""&& port !== ""&& username !== ""&& password !== "")
      {
        this.createapi(from_email, host,port,username,password)
      }else{
        createNotification('Please fill mandatory field','error','filled')
      }
    }

    createapi( from_email,host,port,username,password)
    {
      outgoingService.createoutgoingserver( from_email,host, port,username,password)
        .then((res) => { 
         
          if(res.status)
            {
              createNotification('Updated','success','filled')
            }            
      
      })
      .catch((error) => { 
      });
         
    } 
    
    render()
    {
      const {match,locale,languageData} = this.props
      const {from_email, host,port,username,password} = this.state
        
        return (
            <>
            <title>{onChangeLanguage(locale,'Outgoing Server',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <div className = "row">
                    <div className = "col-md-10">
                        <Breadcrumb heading={onChangeLanguage(locale,'Outgoing Server',languageData)} match={match} />
                    </div>
                </div>
              <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <Row>
            <Colxx xxs="8" className="mb-4">
            <Label className = "fontstyle normal-font">Mail Driver<a style = {{color :'red'}}>*</a></Label>
                  <Input 
                        type="text"
                        className = "fontstyle"  
                        placeholder = {onChangeLanguage(locale,'Mail Driver',languageData)}
                        value = {from_email}  
                        onChange= {(e)=>this.setState({from_email : e.target.value})} ></Input>
                 </Colxx>
             </Row>
             <Row>
            <Colxx xxs="8" className="mb-4">
            <Label className = "fontstyle normal-font">Mail Host<a style = {{color :'red'}}>*</a></Label>
                  <Input 
                        type="text"
                        className = "fontstyle"  
                        placeholder =  {onChangeLanguage(locale,'Mail Host',languageData)}
                        value = {host}  
                        onChange= {(e)=>this.setState({host : e.target.value})} ></Input>
                 </Colxx>
             </Row>
             <Row>
            <Colxx xxs="8" className="mb-4">
            <Label className = "fontstyle normal-font">Mail Port<a style = {{color :'red'}}>*</a></Label>
                  <Input 
                        type="number"
                        className = "fontstyle"  
                        placeholder = {onChangeLanguage(locale,'Mail Port',languageData)}
                        value = {port}  
                        onChange= {(e)=>this.setState({port : e.target.value})}></Input>
                 </Colxx>
             </Row>
             <Row>
            <Colxx xxs="8" className="mb-4">
            <Label className = "fontstyle normal-font">Mail Username<a style = {{color :'red'}}>*</a></Label>
                  <Input 
                        type="text"
                        className = "fontstyle"  
                        placeholder =  {onChangeLanguage(locale,'Mail Username',languageData)} 
                        value = {username}  
                        onChange= {(e)=>this.setState({username : e.target.value})} ></Input>
                 </Colxx>
             </Row>
             <Row>
            <Colxx xxs="8" className="mb-4">
            <Label className = "fontstyle normal-font">Mail Password<a style = {{color :'red'}}>*</a></Label>
                  <Input 
                        type="text"
                        className = "fontstyle"  
                        placeholder =  {onChangeLanguage(locale,'Mail Password',languageData)} 
                        value = {password}  
                        onChange= {(e)=>this.setState({password : e.target.value})} ></Input>
                 </Colxx>
             </Row>
             <Row>
               <Colxx xxs="5" className="mb-4"> 
                <Button color = "primary" className="fontstyle button-width" onClick={()=>this.onSubmit()}>
                {onChangeLanguage(locale,'Update Settings',languageData)}
                  </Button>
               </Colxx>       
               
            </Row>

        </>
        )
    }
 
}

const mapStateToProps = ({  authUser }) => {
   
  
    const { currentUser } = authUser;
    return {
      currentUser
    };
  };
  export default withRouter(
    connect(mapStateToProps, {

   })(MasterPage)
  );

