import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Input,Button} from 'reactstrap';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage,getValue} from '../../../../../helper'
import{eqmasterService} from '../../../../../redux/tender/eqmaster/saga'
import Loading from "react-fullscreen-loading";
import Select from 'react-select';
import{tenderactivityService} from '../../../../../redux/projectmasters/tenderactivity/saga';
import{tendersubactivityService} from '../../../../../redux/projectmasters/tendersubactivity/saga';
import{tendersectionService} from '../../../../../redux/projectmasters/tendersection/saga';
class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:0,
      subactivity: '',
      activity:'',
      section:'',
      eq:'',
      name:'',
      activitydata:[],
      subsectiondata:[],
      sectiondata:[],
      status : 1,
      region_data:[],
      team_data:[],
      is_subsection:'',
      is_subactivity:false,
      isEdit:false,
      loading:false
    };
  }

  componentDidMount() {
    const {isEdit,record} = this.props
    if(isEdit === true)
    {
      this.setState({
        id:record.id,
        activity:record.activity,
        subactivity:record.subactivity,
        section:record.section,
        eq:record.eq,
        status: record.status,
        isEdit:true
      })
      this.fetchsection(record.activity,record.section)
      this.section_subactivity_fetch(record.activity,record.subactivity)
    }  
    this.fetchactivity() 
  }
  fetchactivity() {
    this.setState({loading:true})
    tenderactivityService.fetchtenderactivity()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString(),
                    is_subactivity:cusmaidid.is_subactivity};
               });  
                this.setState({
                activitydata :  regionlist
                })
               
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})
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
               var eallyUniqueArr =  typelist.filter((v,i,a)=>a.findIndex(t=>(t.label === v.label && t.label===v.label))===i) 
                this.setState({
                  subsectiondata :  eallyUniqueArr
                })
               
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})
 }  
 fetchsection(activity,subactivity) {
    this.setState({loading:true})
    tendersectionService.activitywisesection(activity,subactivity)
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var typelist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               });
             var subactivitylist = filterstatus.map(function(cusmaidid) {
                return  {label : cusmaidid.subactivity ,value : cusmaidid.subactivity};
             });
             var eallyUniqueArr =  typelist.filter((v,i,a)=>a.findIndex(t=>(t.label === v.label && t.label===v.label))===i)
                this.setState({
                  sectiondata :  eallyUniqueArr,
                  subsectiondata:subactivitylist
                })
               console.log("kkkk",typelist)
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})
 } 
 section_subactivity_fetch(activity,subactivity) {
  this.setState({loading:true})
  tendersectionService.section_subactivity_fetch(activity,subactivity)
  .then((res) => {
     if(res.status)   { 
        let filterstatus = (res.data).filter(item => item.status === 1)
           var typelist = filterstatus.map(function(cusmaidid) {
                return  {label : cusmaidid.subactivity ,value : cusmaidid.id.toString(),unit:cusmaidid.unit};
             });
              this.setState({
                subsectiondata :  typelist
              })
             
           }
           else{
           this.setState({loading:false})}
           })
           .catch((error) => { }); 
           this.setState({loading:false})
}   
onSubmit() { 
  const {id,activity,subactivity,section,eq,status,isEdit} = this.state;


  if( eq!=="" && activity !== '' && subactivity !=='')
  {
    if(isEdit === true)
    {
      this.updateAPI(id,activity,subactivity,section,eq,status)
    }
    else
    {
      this.createAPI(activity,subactivity,section,eq,status)
    }
   
  }
  else
  {
    createNotification('Please fill mandatory field','error','filled')
  }
 
}
createAPI(activity,subactivity,section,eq,status)
{
  this.setState({
    loading : true
  })
  eqmasterService.createeqmaster(activity,subactivity,section,eq,status)
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
updateAPI(id,activity,subactivity,section,eq,status)
{
  this.setState({
    loading : true
  })
  eqmasterService.updateeqmaster(id,activity,subactivity,section,eq,status)
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
onChangeRegion(value)
{
  this.setState({region:value,team:'',team_data:[]})
  this.fetchteam(value)
}
handlechangeactivity = (selectedOptions) => {
       
  const {section,activitydata}=this.state
  let value =selectedOptions.value
  this.setState({
    activity : selectedOptions.value,
    is_subsection:getValue(activitydata,'value','label',value)
  })
  this.fetchsection(selectedOptions.value,section)
} 
handlechangesection = (selectedOptions) => {
     
  const {activity}=this.state
  this.setState({
    section : selectedOptions.value
  })
  this.section_subactivity_fetch(activity,selectedOptions.label)
} 
  render()
  {
  
    const {activity,subactivity,section,eq,activitydata,subsectiondata,sectiondata,isEdit,status,loading} = this.state
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
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Activity',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
              </Colxx>
              <Colxx xxs="8" className="mb-4">
                            <Select  
                            className = {"react-select fontstyle" }                          
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={activitydata.filter(option =>option.value === activity)}
                            options={activitydata}
                            onChange={this.handlechangeactivity}
                            // onChange={({value}) => this.setState({  activity: value })}
                          />
                          </Colxx>
                        </Row>
              <Row>
              <Colxx xxs="4" className="mb-4">
                        <Label  className = "fontstyle normal-font" >
                        {onChangeLanguage(locale,'Section',languageData)}
                        <a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
               <Colxx xxs="8" className="mb-4">
                        <Select  
                        className = {"react-select fontstyle"}                          
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={sectiondata.filter(option =>option.value === section)}
                        options={sectiondata}
                        onChange={this.handlechangesection}
                        // onChange={({value}) => this.setState({  section: value })}
                      />
                     </Colxx>
                        </Row>
                        {(getValue(activitydata,'value','label',activity)).toLowerCase() === "other tasks"  && 
                       <Row>
                       <Colxx xxs="4" className="mb-4">
                        <Label  className = "fontstyle normal-font" >
                        {onChangeLanguage(locale,'Sub Section',languageData)}
                        </Label>
                        </Colxx>
               <Colxx xxs="8" className="mb-4">
                        <Select  
                        className = {"react-select fontstyle" }                          
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={subsectiondata.filter(option =>option.value === subactivity)}
                        options={subsectiondata}
                        onChange={({value}) => this.setState({  subactivity: value })}
                      />
                    </Colxx>
              </Row>}
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

