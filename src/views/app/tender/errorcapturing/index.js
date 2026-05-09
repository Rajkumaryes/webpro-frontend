import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import DatePicker from "../../datePicker";
import Select from 'react-select';
import{ErrorCaptureService} from '../../../../redux/tender/errorcapture/saga'
import{typeService} from '../../../../redux/projectmasters/type/saga'
import {onChangeLanguage,getCurrentWeek,getTimeDifference,Check_ValidDate,getValue,
  convertUTCToLocalDate,convertLocalToUTCDate} from '../../../../helper'
import { createNotification } from '../../../../toast';
import Loading from "react-fullscreen-loading";
import moment from 'moment';
import{tendercategoryService} from '../../../../redux/projectmasters/tendercategory/saga';
import{tenderroundService} from '../../../../redux/projectmasters/tenderround/saga';
import{TendertypeService} from '../../../../redux/projectmasters/tendertype/saga';
import{tenderactivityService} from '../../../../redux/projectmasters/tenderactivity/saga';
import{tendersubactivityService} from '../../../../redux/projectmasters/tendersubactivity/saga';
import{tendersectionService} from '../../../../redux/projectmasters/tendersection/saga';
import{tenderareaService} from '../../../../redux/projectmasters/tenderarea/saga';
import{tendererrortypeService} from '../../../../redux/projectmasters/tendererrortype/saga';
import{tendererrorstatusService} from '../../../../redux/projectmasters/tendererrorstatus/saga';
import{tendererrorseverityService} from '../../../../redux/projectmasters/tendererrorseverity/saga';
import{TendernameService} from '../../../../redux/projectmasters/tendername/saga';

class Sidebar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user_id:'',
        error_reported_date:'',
        error_reported_week:'',
        tender_processed_date:'',
        tender_processed_week:'',
        error_userid:'',
        tendername:'',
        areacode:'',
        tender_round:'',
        tender_category:'',
        tender_type:'',
        error_type:'',
        total_lanes:'',
        activity:'',
        subactivity:'',
        section:'',
        error_status:'',
        error_lanecount:'',
        error_severity:'',
        lanecount_severity:'',
        error_capturedby:'',
        error_comments:'',
        gtm_hh_comments:'',
        tendercategorydata:[],
        rounddata:[],
        activitydata:[],
        subsectiondata:[],
        sectiondata:[],
        areacodedata:[],
        tendertypedata:[],
        errortypedata:[],
        errorstatusdata:[],
        errorseveritydata:[],
        tendernamedata:[],
        start_date:'',
        is_submit:false,
        loading:false,
        is_subactivity:false,
        receivetime_format:false,
        is_valid_date:false,
        is_subsection:'',
        updated_start_time:''
      };
    }
    componentDidMount() {
      this.setState({
        start_date:moment(new Date()).format('MM/DD/YYYY'),
        updated_start_time:new Date()
    })
       this.fetchtendercategory()
       this.fetchtenderround()
       this.fetchactivity()
       this.fetcharea()
       this.fetchtendertype()
       this.fetchtendererrorseverity()
       this.fetchtendererrortype()
       this.fetchtendererrorstatus()
       this.fetchtendername()
    }
    fetchtendercategory() {
        tendercategoryService.fetchtendercategory()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var rolelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                   });  
                    this.setState({
                    tendercategorydata :  rolelist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
      } 
      fetchtendername() {
        TendernameService.fetchtendername()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var rolelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                   });  
                    this.setState({
                    tendernamedata :  rolelist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
      } 
      fetchtenderround() {
        tenderroundService.fetchtenderround()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var rolelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                   });  
                    this.setState({
                    rounddata :  rolelist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
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
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString(),unit:cusmaidid.unit};
                   });
                   var eallyUniqueArr =  typelist.filter((v,i,a)=>a.findIndex(t=>(t.label === v.label && t.label===v.label))===i)  
                    this.setState({
                      sectiondata :  eallyUniqueArr
                    })
                   
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
     fetcharea() {
        this.setState({loading:true})
        tenderareaService.fetchtenderarea()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var typelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.code+'-'+cusmaidid.name ,value : cusmaidid.id.toString(),unit:cusmaidid.unit};
                   });
                    this.setState({
                      areacodedata :  typelist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  
     fetchtendertype() {
        TendertypeService.fetchtendertype()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var rolelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                   });  
                    this.setState({
                    tendertypedata :  rolelist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
      } 
      fetchtendererrorseverity() {
        tendererrorseverityService.fetchtendererrorseverity()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var rolelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                   });  
                    this.setState({
                        errorseveritydata :  rolelist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
      } 
      fetchtendererrortype() {
        tendererrortypeService.fetchtendererrortype()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var rolelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                   });  
                    this.setState({
                    errortypedata :  rolelist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
      } 
      fetchtendererrorstatus() {
        tendererrorstatusService.fetchtendererrorstatus()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var rolelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                   });  
                    this.setState({
                    errorstatusdata :  rolelist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
      } 
    handlecustomtype = (selectedOptions) => {
        this.setState({region : selectedOptions.value})  
      }  
      onSubmit() { 
        const {date,user_id,error_reported_date,error_reported_week,tender_processed_date,tender_processed_week,
            error_userid,tendername,areacode,tender_round,tender_category,tender_type,error_type,total_lanes,
            activity,subactivity,section,error_status,error_lanecount,error_severity,lanecount_severity,
            error_capturedby,error_comments,gtm_hh_comments,start_date,updated_start_time} = this.state;
         
        if(error_reported_date!=='' &&tender_processed_date!=='' &&error_userid!=='' &&tendername!=='' 
        &&tender_round!=='' &&tender_category!=='' &&tender_type!=='' &&error_type!==''
         &&total_lanes!=='' && activity!=='' &&section!=='' &&error_status!=='' 
         &&error_lanecount!=='' &&error_severity!=='' &&lanecount_severity!=='' 
        &&error_capturedby!=='' 
        )
        {     
                const {username} = this.props
                this.setState({ loading : true ,is_submit:false})
                let end_date=convertLocalToUTCDate(error_reported_date),
                 start_date=convertLocalToUTCDate(updated_start_time),
                 updatedstarttime=convertLocalToUTCDate(updated_start_time),
                 updated_end_time=convertLocalToUTCDate(new Date()),
                 errorreported_date=moment(convertUTCToLocalDate(error_reported_date)).format('MM/DD/YYYY hh:mm:ss a') ,
                 tenderprocessed_date=moment(convertUTCToLocalDate(tender_processed_date)).format('MM/DD/YYYY hh:mm:ss a') 
                 alert(end_date)
                ErrorCaptureService.createerrorcapture(username,errorreported_date,error_reported_week,tenderprocessed_date,tender_processed_week,
                    error_userid,tendername,areacode,tender_round,tender_category,tender_type,error_type,total_lanes,
                    activity,subactivity,section,error_status,error_lanecount,error_severity,lanecount_severity,
                    error_capturedby,error_comments,gtm_hh_comments,start_date,end_date,updatedstarttime,updated_end_time)
                .then((res) => { 
                  this.setState({   
                    loading : false     
                  }) 
                  if(res.status)
                    {
                      createNotification('Created','success','filled')
                      this.setState({
                        user_id:'',
                        error_reported_date:'',
                        error_reported_week:'',
                        tender_processed_date:'',
                        tender_processed_week:'',
                        error_userid:'',
                        tendername:'',
                        areacode:'',
                        tender_round:'',
                        tender_category:'',
                        tender_type:'',
                        error_type:'',
                        total_lanes:'',
                        activity:'',
                        subactivity:'',
                        section:'',
                        error_status:'',
                        error_lanecount:'',
                        error_severity:'',
                        lanecount_severity:'',
                        error_capturedby:'',
                        error_comments:'',
                        gtm_hh_comments:'',
                        is_submit:false,
                        is_subactivity:false,
                        is_valid_date:false
                    })
                    }   
                    else
                      {
                        createNotification(res.message,'error','filled');
                      }    
              })
              .catch((error) => { 
                this.setState({
                  loading : false
                })
              });    
        }
        else
        {
          this.setState({
            is_submit:true
        })
          createNotification('Please fill mandatory field','error','filled')
        }
      }
  
  fetchtype_area(area_id)
    {
      this.setState({
        loading : true
      })
      typeService.fetchtype_area(area_id)
    .then((res) => {
        this.setState({loading:false})
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var typelist = filterstatus.map(function(typename) {
                  return  {label : typename.name ,value : (typename.id).toString(),unit : (typename.unit).toString()};
               });  
                this.setState({
                  type_Data :  typelist,
                })
             }
            
             })
             .catch((error) => { 
                this.setState({
                    loading : false
                  })
             }); 
    }
    
  onrefresh() {
    this.setState({
        user_id:'',
        error_reported_date:'',
        error_reported_week:'',
        tender_processed_date:'',
        tender_processed_week:'',
        error_userid:'',
        tendername:'',
        areacode:'',
        tender_round:'',
        tender_category:'',
        tender_type:'',
        error_type:'',
        total_lanes:'',
        activity:'',
        subactivity:'',
        section:'',
        error_status:'',
        error_lanecount:'',
        error_severity:'',
        lanecount_severity:'',
        error_capturedby:'',
        error_comments:'',
        gtm_hh_comments:'',
        is_submit:false,
        is_subactivity:false,
        is_valid_date:false
    })
   
  } 
  handlechangeactivity = (selectedOptions) => {
       
    const {activitydata,section}=this.state
    let value =selectedOptions.value
    this.setState({
      activity : selectedOptions.value,
      is_subsection:getValue(activitydata,'value','label',value)
    })
    this.fetchsection(selectedOptions.value,section)
  } 
  handlechangesection = (selectedOptions) => {
       
    const {activity,subsectiondata}=this.state
    let value =selectedOptions.value
    this.setState({
      section : selectedOptions.value
    })
    this.section_subactivity_fetch(activity,selectedOptions.label)
  } 
 
  
  handleKeypress (e) {
    const characterCode = e.key
    if (characterCode === 'Backspace') return

    const characterNumber = Number(characterCode)
    if (characterNumber >= 0 && characterNumber <= 9) {
      if (e.currentTarget.value && e.currentTarget.value.length) {
        return
      } else if (characterNumber === 0) {
        e.preventDefault()
      }
    } else {
      e.preventDefault()
    }
  }

  onChangeerror_reported_date(date)
    {
      var datenew=getCurrentWeek(date).toString()
     this.setState({
          error_reported_date  : date,
          error_reported_week:datenew,
        })
    } 
    onChangetender_processed_date(date)
  {
    var datenew=getCurrentWeek(date).toString()
    
    this.setState({
      tender_processed_date:date,
      tender_processed_week:datenew
    })
  
   
  }
  onChangeQuerytime(date)
  {
    console.log("lhnkjh " ,date)
    var time = moment(date).format('HH:mm:ss')
    if(time !== "00:00:00")
    {
      this.setState({query_startdate  : date})
    }
   
  }
onChangeQueryendtime (date) {
    console.log("lhnkjh " ,date)
    var time = moment(date).format('HH:mm:ss')
    if(time !== "00:00:00")
    {
      this.setState({query_enddate  : date})
    }
   
  }
    render()
    { 
        const{user_id,error_reported_date,error_reported_week,tender_processed_date,tender_processed_week,
            error_userid,tendername,areacode,tender_round,tender_category,tender_type,error_type,total_lanes,
            activity,subactivity,section,error_status,error_lanecount,error_severity,lanecount_severity,
            error_capturedby,error_comments,gtm_hh_comments,tendercategorydata,rounddata,activitydata,
            subsectiondata,sectiondata,areacodedata,tendernamedata,tendertypedata,errortypedata,errorstatusdata,errorseveritydata,
            is_subactivity,is_submit,is_valid_date,loading,is_subsection}=this.state
        const {match,username,locale,languageData,receivetime_format} = this.props
        return (
            <>
            <title>{onChangeLanguage(locale,'Error Capturing',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'Error Capturing',languageData)} match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            {loading && 
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
          }
            <div>
            <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>

                <div className = "row">
                <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Error Reported Week',languageData)}</a>
                           <br></br> {error_reported_week}</Label>
                           
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Tender Processed Week',languageData)}</a>
                            <br></br>{tender_processed_week}</Label>
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Error Reported Date',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            {is_submit === true && error_reported_date === '' && 
                            <p1 className = 'fontstyle mandatory-label'> 
                            {onChangeLanguage(locale,'Mandatory Field',languageData)} 
                            </p1>}
                            <DatePicker
                              selected={error_reported_date}
                              className = "text-background" 
                              onChange={(date) => this.onChangeerror_reported_date(date)}
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Tender Processed Date',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            {is_submit === true && tender_processed_date === '' && 
                            <p1 className = 'fontstyle mandatory-label'> 
                            {onChangeLanguage(locale,'Mandatory Field',languageData)} 
                            </p1>}
                            <DatePicker
                              selected={tender_processed_date}
                              className = "text-background" 
                              onChange={(date) => this.onChangetender_processed_date(date)}
                            />
                          
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Error User ID',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input 
                             className = {is_submit === true && error_userid === ''?  "error-border":"fontstyle text-background" }    
                            // placeholder = 'End date'
                            value = {error_userid}  
                            onChange= {(e)=>this.setState({error_userid :  (e.target.value).toUpperCase()})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Tender Name',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && tendername === ''?  "error-border-select-paste":"react-select fontstyle" }                          
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={tendernamedata.filter(option =>option.value === tendername)}
                            options={tendernamedata}
                            onChange={({value}) => this.setState({  tendername: value })}
                          />
                        </div>
                        <div className = "col-md-3 space-margin ">
                            <Label  className = "fontstyle normal-font" > 
                            {onChangeLanguage(locale,'Area Code',languageData)}
                            </Label>
                                <Select  
                                className = {"react-select fontstyle" } 
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={areacodedata.filter(option =>option.value === areacode)}
                                options={areacodedata}
                                onChange={(option) => this.setState({  areacode: option.value })}
                             />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Tender Round',languageData)} <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && tender_round === ''?  "error-border-select-paste":"react-select fontstyle" }                          
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={rounddata.filter(option =>option.value === tender_round)}
                            options={rounddata}
                            onChange={({value}) => this.setState({  tender_round: value })}
                          />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Tender Category',languageData)} <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && tender_category === ''?  "error-border-select-paste":"react-select fontstyle" }                          
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={tendercategorydata.filter(option =>option.value === tender_category)}
                            options={tendercategorydata}
                            onChange={({value}) => this.setState({  tender_category: value })}
                          />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Tender Type',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && tender_type === ''?  "error-border-select-paste":"react-select fontstyle" }                          
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={tendertypedata.filter(option =>option.value === tender_type)}
                            options={tendertypedata}
                            onChange={({value}) => this.setState({  tender_type: value })}
                          />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Error Type',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && error_type === ''?  "error-border-select-paste":"react-select fontstyle" }                          
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={errortypedata.filter(option =>option.value === error_type)}
                            options={errortypedata}
                            onChange={({value}) => this.setState({  error_type: value })}
                          />
                        </div>
                        
                         <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Total Lanes',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && total_lanes === ''?  "error-border":"fontstyle text-background" }    
                            // placeholder = 'End date'
                            type = "number" min="0"  step='1'
		                        onKeyDown={this.handleKeypress}
                            value = {total_lanes}  
                            onChange= {(e)=>this.setState({total_lanes : e.target.value})} 
                            />
                        </div>
                       
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Activity',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && activity === ''?  "error-border-select-paste":"react-select fontstyle" }                          
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={activitydata.filter(option =>option.value === activity)}
                            options={activitydata}
                            onChange={this.handlechangeactivity}
                            // onChange={({value}) => this.setState({  activity: value })}
                          />
                        </div>
                        <div className = "col-md-3 space-margin">
                        <Label  className = "fontstyle normal-font" >
                        {onChangeLanguage(locale,'Section',languageData)}
                        <a style = {{color :'red'}}>*</a></Label>
                        <Select  
                        className = {is_submit === true && section === ''?  "error-border-select-paste":"react-select fontstyle" }                          
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={sectiondata.filter(option =>option.value === section)}
                        options={sectiondata}
                        onChange={this.handlechangesection}
                        // onChange={({value}) => this.setState({  section: value })}
                      />
                    </div>
                        {(is_subsection).toLowerCase() === "other tasks" && 
                        <div className = "col-md-3 space-margin">
                        <Label  className = "fontstyle normal-font" >
                        {onChangeLanguage(locale,'Sub Section',languageData)}
                        </Label>
                        <Select  
                        className = {"react-select fontstyle" }                          
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={subsectiondata.filter(option =>option.value === subactivity)}
                        options={subsectiondata}
                        onChange={({value}) => this.setState({  subactivity: value })}
                      />
                    </div>}
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Error Status',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                        className = {is_submit === true && error_status === ''?  "error-border-select-paste":"react-select fontstyle" }                          
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={errorstatusdata.filter(option =>option.value === error_status)}
                        options={errorstatusdata}
                        onChange={({value}) => this.setState({  error_status: value })}
                      />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Error Lane count',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && error_lanecount === ''?  "error-border":"fontstyle text-background" }      
                            // placeholder = 'End date'
                            type = "number" min="0"  step='1'
		                        onKeyDown={this.handleKeypress}
                            value = {error_lanecount}  
                            onChange= {(e)=>this.setState({error_lanecount : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Error Severity',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                        className = {is_submit === true && error_severity === ''?  "error-border-select-paste":"react-select fontstyle" }                          
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={errorseveritydata.filter(option =>option.value === error_severity)}
                        options={errorseveritydata}
                        onChange={({value}) => this.setState({  error_severity: value })}
                      />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Lane Count on Severity',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && lanecount_severity === ''?  "error-border":"fontstyle text-background" }      
                            // placeholder = 'End date'
                            type = "number" min="0"  step='1'
		                        onKeyDown={this.handleKeypress}
                            value = {lanecount_severity}  
                            onChange= {(e)=>this.setState({lanecount_severity : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Error Captured by',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && error_capturedby === ''?  "error-border":"fontstyle text-background" }      
                            // placeholder = 'End date'
                            value = {error_capturedby}  
                            onChange= {(e)=>this.setState({error_capturedby : e.target.value.toUpperCase()})} 
                            />
                        </div>
                        
                        <div className = "col-md-12 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Error Comments',languageData)}
                           </Label>
                            <textarea  
                            className = {"fontstyle textarea-background" }      
                            // placeholder = 'End date'
                            value = {error_comments}  
                            onChange= {(e)=>this.setState({error_comments : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-12 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'GTM HH Error Comments',languageData)}
                            </Label>
                            <textarea  
                            className = {"fontstyle textarea-background" }    
                            // placeholder = 'hh:mm:ss AM/PM'
                            value = {gtm_hh_comments}  
                            onChange= {(e)=>this.setState({gtm_hh_comments : e.target.value})} 
                            />
                           
                        </div>
                    </div>
                    <div className = "row text-center" style = {{margin:'0px 5px'}}>
                    <Button className = "button-width" color="primary"  
                    onClick={()=>this.onSubmit()}>
                    {onChangeLanguage(locale,'Save',languageData)} 
                    </Button>
                    <Button className = "button-width" color="secondary"
                            onClick={()=>this.onrefresh()}
                    >
                    {onChangeLanguage(locale,'Refresh',languageData)} 
                    </Button>
             </div>
             </div>
            </div>
          </>
        )
    }
}

const mapStateToProps = ({ settings }) => {
    const { locale,languageData,username} = settings;
    return {locale, languageData,username};
  };
  export default withRouter(
    connect(mapStateToProps, {

   })(Sidebar)
  );

