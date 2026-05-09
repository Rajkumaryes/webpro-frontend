import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Input,Button} from 'reactstrap';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage,getValue} from '../../../../../helper';
import{tendersubactivityService} from '../../../../../redux/projectmasters/tendersubactivity/saga';
import{tendersectionService} from '../../../../../redux/projectmasters/tendersection/saga';
import{tenderactivityService} from '../../../../../redux/projectmasters/tenderactivity/saga';

import Select from 'react-select';

import Loading from "react-fullscreen-loading";
class RegisterUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id:0,
      name:'',
      activity:'',
      subactivity:'',
      status : 1,
      activitydata:[],
      subactivitydata:[],
      isEdit:false,
      is_subactivity:false,
      loading:false
    };
  }

  componentDidMount() {
    const {isEdit,record} = this.props
    if(isEdit == true)
    {
      this.setState({
        id:record.id,
        name:record.name,
        activity:record.activity,
        subactivity:record.subactivity,
        status: record.status,
        isEdit:true
      })
     
    }   
    this.fetchactivity() 
    this.fetchsubactivity() 

  }
  fetchactivity() {
    tenderactivityService.fetchtenderactivity()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var rolelist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : (cusmaidid.id).toString(),
                    is_subactivity:cusmaidid.is_subactivity};
               });  
                this.setState({
                activitydata :  rolelist,
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
  }
  fetchsubactivity(activity) {
    this.setState({loading:true})
    tendersubactivityService.activitywisesubactivity(activity)
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var typelist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString(),unit:cusmaidid.unit};
               });
                this.setState({
                  subactivitydata :  typelist
                })
               
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})
 }  
onSubmit() { 
  const {id,name,activity,subactivity,status,isEdit} = this.state;

  if(name !== "")
  {
    if(isEdit === true)
    {
      this.updateAPI(id,name,activity,subactivity,status)
    }
    else
    {
      this.createAPI(name,activity,subactivity,status)
    }
   
  }
  else
  {
    createNotification('Please fill mandatory field','error','filled')
  }
 
}
createAPI(name,activity,subactivity,status)
{
  this.setState({
    loading : true
  })
  tendersectionService.createtendersection(name,activity,subactivity,status)
    .then((res) => { 
      this.setState({   
        loading : false     
      }) 
      if(res.status)
        {
          createNotification('Created','success','filled')
          this.close(true)
        }else{
          createNotification(res.message,'error','filled')
        }                
  
  })
  .catch((error) => { 
    this.setState({
      loading : false
    })
  });
   
}
updateAPI(id,name,activity,subactivity,status)
{
  this.setState({
    loading : true
  })
  tendersectionService.updatetendersection(id,name,activity,subactivity,status)
    .then((res) => { 
      this.setState({   
        loading : false     
      }) 
      if(res.status)
        {
          createNotification('Updated','success','filled')
          this.close(true)
        } else{
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
handlechangeactivity = (selectedOptions) => {
       
  const {activitydata,subactivitydata}=this.state
  let value =selectedOptions.value
  this.setState({
    activity : selectedOptions.value,
    is_subactivity:getValue(activitydata,'value','is_subactivity',value.toString()),
  })
  this.fetchsubactivity(selectedOptions.value)
} 
  render()
  {
  
    const {name,isEdit,status,activity,subactivity,activitydata,is_subactivity,subactivitydata,loading} = this.state
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
                   <Label> {onChangeLanguage(locale,'Activity',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
            <Select className = "fontstyle"
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    placeholder= {onChangeLanguage(locale,'Activity',languageData)}
                    value={activitydata.filter(option =>option.value === activity)}
                    options={activitydata}
                    onChange={this.handlechangeactivity}
                  />
                 </Colxx> 
             </Row>
             
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Section',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Section',languageData)} 
                        value = {name}  
                        onChange= {(e)=>this.setState({name : e.target.value})} ></Input>
                 </Colxx>
                
             </Row>
             {activity === "2"  &&
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Sub Section',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
              <Colxx xxs="8" className="mb-4">
              {/* <Select  
                        className = "react-select fontstyle"                          
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={subactivitydata.filter(option =>option.value === subactivity)}
                        options={subactivitydata}
                        onChange={({value}) => this.setState({  subactivity: value })}
                      /> */}
                       <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Sub Section',languageData)} 
                        value = {subactivity}  
                        onChange= {(e)=>this.setState({subactivity : e.target.value})} ></Input>
                 </Colxx>
             </Row>
          }
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

