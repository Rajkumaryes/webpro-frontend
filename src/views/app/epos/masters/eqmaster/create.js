import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Input,Button} from 'reactstrap';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage} from '../../../../../helper'
import{eqmasterService} from '../../../../../redux/EPOS/eqmaster/saga'
import Loading from "react-fullscreen-loading";
import Select from 'react-select';
import{eposactivityService} from '../../../../../redux/EPOS/eposactivity/saga';
import{activitytimeService} from '../../../../../redux/EPOS/activitytime/saga';
import{typebulkService} from '../../../../../redux/EPOS/typebulk/saga';
import{activitytpfrepService} from '../../../../../redux/EPOS/activitytpfrep/saga';

class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:0,
      module: '',
      eq:'',
      name:'',
      status : 1,
      module_data:[
        {value:'Error Handling Productivity',label:'Error Handling Productivity'},
        {value:'Street Turns',label:'Street Turns'},
        {value:'TPFREP Productivity',label:'TPFREP Productivity'},
        {value:'Adhoc / Bulk Upload Productivity',label:'Adhoc / Bulk Upload Productivity'},
        {value:'Time Pending Monitoring',label:'Time Pending Monitoring'}
       ],
      error_handleactivity:[],
      tpfrepactivitydata:[],
      adhocactivitydata:[],
      timepending_activitydata:[],
      activitydata:[],
      isEdit:false,
      loading:false
    };
  }

  componentDidMount() {
    this.fetcherrorhandleactivityapi()
    this.fetchtpfrepactivityapi()
    this.fetchtimependingactivityapi()
    this.fetchadhoctype()
    const {isEdit,record} = this.props
    if(isEdit === true)
    {
      this.setState({
        id:record.id,
        name:record.name,
        module:record.module,
        team:record.team,
        eq:record.eq,
        status: record.status,
        isEdit:true
      })
    }  
    }
    fetchtimependingactivityapi() {
      this.setState({
        loading : true
      })
      activitytimeService.fetchactivitytime()
      .then((res) => {
          this.setState({loading:false})
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var list = filterstatus.map(function(areaaval) {
                    return  {label : areaaval.name ,value : (areaaval.id).toString()};
                 });  
                  this.setState({
                  timepending_activitydata :  list,
                  })
               }
              
               })
               .catch((error) => { 
                  this.setState({
                      loading : false
                    })
               }); 
   }
    fetchadhoctype() {
      this.setState({
        loading : true
      })
      typebulkService.fetchtypebulk()
      .then((res) => {
          this.setState({loading:false})
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var list = filterstatus.map(function(areaaval) {
                    return  {label : areaaval.name ,value : (areaaval.id).toString()};
                 });  
                  this.setState({
                  adhocactivitydata :  list,
                  })
               }
              
               })
               .catch((error) => { 
                  this.setState({
                      loading : false
                    })
               }); 
   }
    fetchtpfrepactivityapi() {
      this.setState({
        loading : true
      })
      activitytpfrepService.fetchactivitytpfrep()
      .then((res) => {
          this.setState({loading:false})
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var list = filterstatus.map(function(areaaval) {
                    return  {label : areaaval.name ,value : (areaaval.id).toString()};
                 });  
                  this.setState({
                  tpfrepactivitydata :  list,
                  })
               }
              
               })
               .catch((error) => { 
                  this.setState({
                      loading : false
                    })
               }); 
   }
    fetcherrorhandleactivityapi() {
      this.setState({
        loading : true
      })
      eposactivityService.fetchactivityepos()
      .then((res) => {
          this.setState({loading:false})
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var list = filterstatus.map(function(areaaval) {
                    return  {label : areaaval.name ,value : (areaaval.id).toString()};
                 });  
                  this.setState({
                    error_handleactivity :  list,
                  })
               }
              
               })
               .catch((error) => { 
                  this.setState({
                      loading : false
                    })
               }); 
   } 
onSubmit() { 
  const {id,name,eq,module,status,isEdit} = this.state;


  if(eq!=="" && name !== '')
  {
    if(isEdit === true)
    {
      this.updateAPI(id,name,eq,module,status)
    }
    else
    {
      this.createAPI(name,eq,module,status)
    }
   
  }
  else
  {
    createNotification('Please fill mandatory field','error','filled')
  }
 
}
createAPI(name,eq,module,status)
{
  this.setState({
    loading : true
  })
  eqmasterService.createeqmaster(name,eq,module,status)
    .then((res) => { 
      this.setState({   
        loading : false     
      }) 
      if(res.status)
        {
          createNotification('Created','success','filled')
          this.close(true)
        }    
        else{
          createNotification(res.message,'error','filled')
        }        
  
  })
  .catch((error) => { 
    this.setState({
      loading : false
    })
  });
   
}
updateAPI(id,name,eq,module,status)
{
  this.setState({
    loading : true
  })
  eqmasterService.updateeqmaster(id,name,eq,module,status)
    .then((res) => { 
      this.setState({   
        loading : false     
      }) 
      if(res.status)
        {
          createNotification('Updated','success','filled')
          this.close(true)
        }  
        else{
          createNotification(res.message,'error','filled')
        }            
  
  })
  .catch((error) => { 
    this.setState({
      loading : false
    })
  });
}

close(isedit)
{
  this.props.closeModal(isedit)
}
getacitivity=(module) =>
{
  const {error_handleactivity,tpfrepactivitydata,timepending_activitydata,adhocactivitydata}=this.state
  var list = []
  if( module !== null && module === "Error Handling Productivity")
  {
    list =error_handleactivity
  } 
  if( module !== null && module === "TPFREP Productivity"){
    list =tpfrepactivitydata
  }
  if( module !== null && module === "Time Pending Monitoring"){
    list =timepending_activitydata
  }
  else if( module !== null && module === "Adhoc / Bulk Upload Productivity"){
    list =adhocactivitydata
  }
 return list
}


  render()
  {
  
    const {module,name,module_data,eq,isEdit,status,loading} = this.state
    const {locale,languageData} = this.props
    return (
      <div>
           {loading && 
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
        <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Module',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
            <Colxx xxs="8" className="mb-4">
            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={module_data.filter(option =>option.value === module)}
                        options={module_data}
                        onChange={({value}) => this.setState({  module: value })}
                      />
                 </Colxx>
             </Row>
        {module === 'Street Turns' &&
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Activity',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
            <Colxx xxs="8" className="mb-4">
            <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Activity',languageData)} 
                        value = {name}  
                        onChange= {(e)=>this.setState({name : e.target.value})} ></Input>
                 </Colxx>
             </Row>
     }
     {module !== 'Street Turns' &&
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Activity',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
            <Colxx xxs="8" className="mb-4">
            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={this.getacitivity(module).filter(option =>option.value === name)}
                        options={this.getacitivity(module)}
                        onChange={({value}) => this.setState({  name: value })}
                      />
                 </Colxx>
             </Row>
  }
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'EQ',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="number"
                        placeholder = {onChangeLanguage(locale,'EQ',languageData)} 
                        value = {eq}  
                        onChange= {(e)=>this.setState({eq : e.target.value})} ></Input>
                 </Colxx>
                
             </Row>
             {isEdit && 
                <Row>
                <Colxx xxs="4" className="mb-4">
                      <Label>{onChangeLanguage(locale,'Status',languageData)}</Label>
                </Colxx>
                  
                <Colxx xxs="8" className="mb-4">
                 <select className='fontstyle buttoncolor input-text'
                     type="select"
                     name="aggregatename"
                     id="name"
                     placeholder="Select"
                     value={status}
                     onChange={(e) =>this.setState({status :parseInt(e.target.value)})}
                     >
                     <option value = {1}>{onChangeLanguage(locale,'Active',languageData)}</option>
                     <option value = {0}>{onChangeLanguage(locale,'In - Active',languageData)}</option>
                  
                  </select>
                  </Colxx>
                  
                </Row>
             }
           <Row>
               <Colxx xxs="4" className="mb-4"> </Colxx>       
               <Colxx xxs="3" className="mb-4"> 
                  <Button color = "primary" className = 'fontstyle button-width'  onClick={()=>this.close(false)}>
                  {onChangeLanguage(locale,'Cancel',languageData)} 
                   
                  </Button>
                  
               </Colxx>   
               <Colxx xxs="5" className="mb-4"> 
                <Button color = "secondary" className="fontstyle button-width" onClick={()=>this.onSubmit()}>
                    {onChangeLanguage(locale,'Submit',languageData)} 
                  </Button>
               </Colxx>       
               
            </Row>
      </div>
    );
  }
}


const mapStateToProps = ({ settings }) => {
  const { locale,languageData} = settings;
  return {locale, languageData};
};
export default injectIntl(
  connect(mapStateToProps, {

  })(RegisterUser)
);


