import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import DatePicker from "../../datePicker";
import DatePickerDate from "../../datePickerDate";

import Select from 'react-select';
import{TenderInputService} from '../../../../redux/tender/tenderinput/saga'
import{typeService} from '../../../../redux/projectmasters/type/saga'
import {onChangeLanguage,getCurrentWeek,getTimeDifference,Check_ValidDate,getValue,convertLocalToUTCDate,convertUTCToLocalDate} from '../../../../helper'
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
import{tenderfeedbackService} from '../../../../redux/projectmasters/tenderfeedback/saga';
import{tenderquerytypeService} from '../../../../redux/projectmasters/tenderquerytype/saga';
import{TendernameService} from '../../../../redux/projectmasters/tendername/saga';

class Sidebar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user_id:'',
        mail_receiveddate:'',
        tender_actiondate:'',
        week:'',
        tender_name:'',
        tender_category:'',
        tender_round:'',
        lane_count:'',
        typeof_tender:'',
        activity:'',
        subactivity:'',
        section:'',
        no_of_responseactioned:'',
        areacode:'',
        validity_start:'',
        validity_end:'',
        bitvolume:'',
        accountmanager:'',
        gtmpoe:'',
        tender_feedback:'',
        query_type:'',
        query_startdate:'',
        query_enddate:'',
        past_performance:'',
        mail_sentdate:'',
        tendercategorydata:[],
        typeoftenderdata:[],
        rounddata:[],
        activitydata:[],
        subsectiondata:[],
        sectiondata:[],
        areacodedata:[],
        feedbackdata:[],
        querytypedata:[],
        tendernamedata:[],
        is_submit:false,
        loading:false,
        is_subactivity:false,
        receivetime_format:false,
        is_subsection:'',
        updated_start_time:'',
        comments:'',
        inputsheetcount:'',
        inputsheetcountlast:''
      };
    }
    componentDidMount() {
       
        this.setState({
            tender_actiondate:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
            date:moment(new Date()).format('MM/DD/YYYY'),
            week:getCurrentWeek(new Date()).toString(),
            updated_start_time:new Date()
        })
       this.fetchtendercategory()
       this.fetchtenderround()
       this.fetchtendertype()
       this.fetchactivity()
       this.fetcharea()
       this.fetchfeedback()
       this.fetchtendername()
       this.fetchquerytype()
       this.fetchinputsheetcount()
    }
    fetchinputsheetcount(){
      this.setState({loading:true})
      const {username} = this.props
      // console.log(username)
      TenderInputService.fetchinputsheet(username)
      .then((res) => {
         if(res.status)   { 
                let filterstatus = res.data;
                let lastdata = res.lastcount;
                this.setState({ 
                  inputsheetcount:filterstatus, 
                  inputsheetcountlast:lastdata     
                }) 
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})

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
                      return  {label : cusmaidid.name ,value : (cusmaidid.id).toString(),lane_count:cusmaidid.lane_count};
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
      fetchtendertype() {
        TendertypeService.fetchtendertype()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var rolelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                   });  
                    this.setState({
                    typeoftenderdata :  rolelist,
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
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   });
                 var subactivitylist = filterstatus.map(function(cusmaidid) {
                    return  {label : cusmaidid.subactivity ,value : cusmaidid.id.toString()};
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
     fetcharea() {
        this.setState({loading:true})
        tenderareaService.fetchtenderarea()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var typelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.code+'-'+cusmaidid.name,value : cusmaidid.id.toString(),unit:cusmaidid.unit};
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
     fetchfeedback() {
        this.setState({loading:true})
        tenderfeedbackService.fetchtenderfeedback()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var typelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString(),unit:cusmaidid.unit};
                   });
                    this.setState({
                      feedbackdata :  typelist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  
     fetchquerytype() {
        this.setState({loading:true})
        tenderquerytypeService.fetchtenderquerytype()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var typelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString(),unit:cusmaidid.unit};
                   });
                    this.setState({
                      querytypedata :  typelist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  
    handlecustomtype = (selectedOptions) => {
        this.setState({region : selectedOptions.value})  
      }  
      onSubmit() { 
        const {mail_receiveddate,tender_actiondate,week,tender_name,tender_category,tender_round,
            lane_count,typeof_tender,activity,subactivity,section,no_of_responseactioned,areacode,comments,
            validity_start,validity_end,bitvolume,accountmanager,gtmpoe,tender_feedback,query_type,
            query_startdate,query_enddate,past_performance,mail_sentdate,updated_start_time} = this.state;
         var isfill =true
        if(tender_name=== '' ||tender_category === '' ||tender_round === '' ||lane_count === '' 
        ||typeof_tender === '' ||activity === '' ||no_of_responseactioned === ''
        ||mail_sentdate ==='' || mail_receiveddate ==='' || section ==='')
        {
                isfill= false 
        }
        // alert(activity)
        const selectedActivityLabel = this.state.activitydata.find(item => item.value === activity)?.label;
        const isCommentsMandatory = selectedActivityLabel === 'Rework' || selectedActivityLabel === 'Big Tender Rework' || selectedActivityLabel === 'Small Tender Rework';
    
        if (isCommentsMandatory && comments === '') {
            this.setState({ is_submit: true });
            createNotification('Comments are mandatory for rework activities', 'error', 'filled');
            return; // Prevent form submission
        }
        if(query_type !==''){
          if(query_startdate === '' || query_enddate ==='')
          {
            isfill = false
          }
        }
        if (isfill ===true){
          const {username} = this.props
          this.setState({ loading : true ,is_submit:false})
          let end_date=convertLocalToUTCDate(new Date()),
          start_date=convertLocalToUTCDate(updated_start_time),
          updatedstarttime=convertLocalToUTCDate(updated_start_time),
           updated_end_time=convertLocalToUTCDate(new Date()),
           mailreceiveddate=moment(convertUTCToLocalDate(mail_receiveddate)).format('MM/DD/YYYY hh:mm:ss a') ,
           mailsentdate=moment(convertUTCToLocalDate(mail_sentdate)).format('MM/DD/YYYY hh:mm:ss a'),
           query_startdate_=moment(convertUTCToLocalDate(query_startdate)).format('MM/DD/YYYY hh:mm:ss a') ,
           query_enddate_=moment(convertUTCToLocalDate(query_enddate)).format('MM/DD/YYYY hh:mm:ss a')

           var validity_start_date = (validity_start !== '' && validity_start !== null) ? moment(validity_start).format('MM/DD/YYYY') : '' 
           var validity_end_date = (validity_end !== '' && validity_end !== null) ? moment(validity_end).format('MM/DD/YYYY') : '' 
          TenderInputService.createtenderinput(username,mailreceiveddate,tender_actiondate,week,tender_name,tender_category,tender_round,
              lane_count,typeof_tender,activity,subactivity,section,no_of_responseactioned,areacode,
              validity_start_date,validity_end_date,bitvolume,accountmanager,gtmpoe,tender_feedback,query_type,
              query_startdate_,query_enddate_,past_performance,mailsentdate,start_date,end_date,
              updatedstarttime,updated_end_time,comments)
          .then((res) => { 
            this.setState({   
              loading : false     
            }) 
            if(res.status)
              {
                createNotification('Created','success','filled')
                this.setState({
                  tender_actiondate:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
                  date:moment(new Date()).format('MM/DD/YYYY'),
                  week:getCurrentWeek(new Date()).toString(),
                  mail_receiveddate:'',
                  tender_name:'',
                  tender_category:'',
                  tender_round:'',
                  lane_count:'',
                  typeof_tender:'',
                  activity:'',
                  subactivity:'',
                  section:'',
                  no_of_responseactioned:'',
                  areacode:'',
                  validity_start:'',
                  validity_end:'',
                  bitvolume:'',
                  accountmanager:'',
                  gtmpoe:'',
                  tender_feedback:'',
                  query_type:'',
                  query_startdate:'',
                  query_enddate:'',
                  past_performance:'',
                  mail_sentdate:'',
                loading:false,
                is_submit:false,
                comments:''
                })
                this.fetchinputsheetcount()
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
    
  handlechangeactivity = (selectedOptions) => {
       
    const {section,activitydata,subactivity,sectiondata}=this.state
    let value =selectedOptions.value
    this.setState({
      activity : selectedOptions.value,
      is_subsection:getValue(activitydata,'value','label',value)
    })
    this.fetchsection(selectedOptions.value,section)
  } 
  handlechangesection = (selectedOptions) => {
       
    const {activity}=this.state
    let value =selectedOptions.value
    this.setState({
      section : selectedOptions.value
    })
    this.section_subactivity_fetch(activity,selectedOptions.label)
  } 
  onChangemailrec(date)
  {
    this.setState({mail_receiveddate  : date})
   
  }
  onChangetime(date)
  {
    this.setState({validity_start  : date})
  }
  onChangeendtime(date)
  {
    const {validity_start,validity_end}=this.state
   
    if(date !== '')
        {
            if(validity_start === '')
            {
                createNotification('Please Choose Validity Start','error','filled')
            }
            else
            {
                this.setState({validity_end  : date})
            }
         
        }
   
  }
  calculateMinTime = date => {
    let isToday = moment(date).isSame(moment(), 'day');
    if (isToday) {
        let nowAddOneHour = moment(new Date()).add({hours: 1}).toDate();
        return nowAddOneHour;
    }
    return moment().startOf('day').toDate(); 
}
  onChangeQuerytime(date)
  {
    this.setState({
      query_startdate  : date, 
    })
  }
  
onChangeQueryendtime (date) {
  const {query_startdate,query_enddate}=this.state
  let queryenddate=moment(convertUTCToLocalDate(date)).format('MM/DD/YYYY hh:mm:ss a')
    if(date !== '')
    {
        if(query_startdate === '')
        {
            createNotification('Please Choose Query Start Date','error','filled')
        }
        else
        {
            this.setState({
              query_enddate  : date, 
            })     
          
        }
     
    }
  }
  onChangemailsentdate (date) {
  
    this.setState({mail_sentdate  : date})
   
  }
  clearvalue()
  {
    this.setState({
        tender_actiondate:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
        date:moment(new Date()).format('MM/DD/YYYY'),
        week:getCurrentWeek(new Date()).toString(),
        mail_receiveddate:'',
        tender_name:'',
        tender_category:'',
        tender_round:'',
        lane_count:'',
        typeof_tender:'',
        activity:'',
        subactivity:'',
        section:'',
        no_of_responseactioned:'',
        areacode:'',
        validity_start:'',
        validity_end:'',
        bitvolume:'',
        accountmanager:'',
        gtmpoe:'',
        tender_feedback:'',
        query_type:'',
        query_startdate:'',
        query_enddate:'',
        past_performance:'',
        mail_sentdate:'',
      loading:false,
      is_submit:false,
      comments
      })
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
  onChangenn = (e) => {
    let value = e.target.value
  
    value = value.replace(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/ig, '')
    this.setState({
      validity_start:value
    })
  }

    render()
    { 
        const{user_id,mail_receiveddate,tender_actiondate,week,tender_name,tender_category,tender_round,
            lane_count,typeof_tender,activity,subactivity,section,no_of_responseactioned,areacode,
            validity_start,validity_end,bitvolume,accountmanager,gtmpoe,tender_feedback,query_type,
            query_startdate,query_enddate,past_performance,mail_sentdate,tendercategorydata,rounddata,comments,isCommentsMandatory,
            typeoftenderdata,activitydata,subsectiondata,tendernamedata,sectiondata,areacodedata,feedbackdata,querytypedata,
            is_subactivity,is_submit,is_subsection,loading,inputsheetcount,inputsheetcountlast}=this.state
        const {match,username,locale,languageData,receivetime_format} = this.props
        return (
            <>
            <title>{onChangeLanguage(locale,'Tender Input Sheet',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <div className="row">
                      <div className="col-md-8">
                          <Breadcrumb heading={onChangeLanguage(locale, 'Tender Input Sheet', languageData)} match={match} />
                      </div>
                      <div className = "col-md-2" >
                      <h2 style = {{marginTop:'15px'}}>Total EQ : {inputsheetcount}</h2>
                      </div>
                      <div className = "col-md-2">
                          <h2  style = {{marginTop:'15px'}}>Last EQ : {inputsheetcountlast}</h2>
                      </div>
                  </div>
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
                            <Label  className = "fontstyle normal-font" >
                              <a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Mail Received Date',languageData)}</a>
                            <a style = {{color :'red'}}>*</a></Label>
                            <p1 className = 'fontstyle mandatory-label'>
                                {is_submit === true && mail_receiveddate === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                            <DatePicker
                                 selected={mail_receiveddate}
                                 className = "text-background" 
                                 onChange={(date) => this.onChangemailrec(date)}
                                 />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Task action date',languageData)}</a><br></br> 
                            {tender_actiondate}</Label>
                        </div>
                <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'User Name',languageData)}</a><br></br>{username}</Label>
                        </div>
                        
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Week',languageData)}</a>
                            <br></br>{week}</Label>
                        </div>
                        
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Tender Name',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && tender_name === ''?  "error-border-select-paste":"react-select fontstyle" }                          
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={tendernamedata.filter(option =>option.value === tender_name)}
                            options={tendernamedata}
                            onChange={({value,lane_count}) => this.setState({  tender_name: value,lane_count: lane_count})}
                          />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Tender Category(GTM/Area)',languageData)} <a style = {{color :'red'}}>*</a></Label>
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
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Lane Count',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && lane_count === ''?  "error-border":"fontstyle text-background" }    
                            type = "number" min="0"  step='1'
                            onKeyDown={this.handleKeypress}
                            value = {lane_count}  
                            // onChange= {(e)=>this.setState({lane_count : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Type Of Tender',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && typeof_tender === ''?  "error-border-select-paste":"react-select fontstyle" }                          
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={typeoftenderdata.filter(option =>option.value === typeof_tender)}
                            options={typeoftenderdata}
                            onChange={({value}) => this.setState({  typeof_tender: value })}
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
                            {onChangeLanguage(locale,'Number of Response Actioned',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && no_of_responseactioned === ''?  "error-border":"fontstyle text-background" }    
                            // placeholder = 'End date'
                            type = "number" min="0"  step='1'
                            onKeyDown={this.handleKeypress}
                            value = {no_of_responseactioned}  
                            onChange= {(e)=>this.setState({no_of_responseactioned : e.target.value})} 
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
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Validity Start',languageData)}
                              </Label>
                              <DatePickerDate
                                 selected={validity_start}
                                 className = "text-background" 
                                 onChange={(date) => this.onChangetime(date)}
                                 />
                                
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Validity End',languageData)}
                            </Label>
                            <DatePickerDate
                                 selected={validity_end}
                                 min_date = {validity_start}
                                 className = "text-background" 
                                 onChange={(date) => this.onChangeendtime(date)}
                            />
                             
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Bid Volume TEU',languageData)}
                            </Label>
                            <Input  
                            className = {"fontstyle text-background" }      
                            // placeholder = 'End date'
                            value = {bitvolume}  
                            onChange= {(e)=>this.setState({bitvolume : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Account Manager',languageData)}
                           </Label>
                            <Input  
                            className = {"fontstyle text-background" }      
                            // placeholder = 'End date'
                            value = {accountmanager}  
                            onChange= {(e)=>this.setState({accountmanager : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'GTM POE',languageData)}
                            </Label>
                            <Input  
                            className = {"fontstyle text-background" }      
                            // placeholder = 'End date'
                            value = {gtmpoe}  
                            onChange= {(e)=>this.setState({gtmpoe : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin ">
                            <Label  className = "fontstyle normal-font" > 
                            {onChangeLanguage(locale,'Tender Feedback',languageData)}
                            </Label>
                                <Select  
                                className = {"react-select fontstyle" }  
                                
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={feedbackdata.filter(option =>option.value === tender_feedback)}
                                options={feedbackdata}
                                onChange={(option) => this.setState({  tender_feedback: option.value })}
                             />
                        </div>
                        <div className = "col-md-3 space-margin ">
                            <Label  className = "fontstyle normal-font" > 
                            {onChangeLanguage(locale,'Query Type',languageData)}
                            </Label>
                                <Select  
                                className = {"react-select fontstyle" }  
                                
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={querytypedata.filter(option =>option.value === query_type)}
                                options={querytypedata}
                                onChange={(option) => this.setState({  query_type: option.value })}
                             />
                        </div>
                      {query_type !=='' &&<div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Query Start date',languageData)}
                              <a style = {{color :'red'}}>*</a></Label>
                              <p1 className = 'fontstyle mandatory-label'>
                                {is_submit === true && query_startdate === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                              <DatePicker
                                 selected={query_startdate}
                                 className = "text-background" 
                                 onChange={(date) => this.onChangeQuerytime(date)}
                                 />
                        </div>
                      }
                         {query_type !=='' && 
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Query End date',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <p1 className = 'fontstyle mandatory-label'>
                                {is_submit === true && query_enddate === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                            <DatePicker
                                 selected={query_enddate}
                                 min_date={query_startdate}
                                 className = "text-background" 
                                 onChange={(date) => this.onChangeQueryendtime(date)}
                            />
                        </div>}
    
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Past Performance Volume',languageData)}
                            </Label>
                            <Input  
                            className = {"fontstyle text-background" }      
                            // placeholder = 'End date'
                            value = {past_performance}  
                            onChange= {(e)=>this.setState({past_performance : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Mail sent date',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            {/* <Input  
                            className = {(is_submit === true && mail_sentdate === '') || receivetime_format === true?  "error-border":"fontstyle text-background" }    
                            placeholder = 'MM/DD/YYYY hh:mm:ss AM/PM'
                            value = {mail_sentdate}  
                            onChange= {(e)=>this.setState({mail_sentdate : e.target.value})} 
                            /> */}
                           <p1 className = 'fontstyle mandatory-label'>
                                {is_submit === true && mail_sentdate === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                              <DatePicker
                                 selected={mail_sentdate}
                                 className = "text-background" 
                                 onChange={(date) => this.onChangemailsentdate(date)}
                                 />
                        </div>
                        <div className="col-md-3 space-margin">
                          <Label className="fontstyle normal-font">
                              {onChangeLanguage(locale, 'Comments', languageData)}
                          </Label>
                          <Input 
                              className={is_submit && isCommentsMandatory && comments === '' ? "error-border" : "fontstyle text-background"}
                              value={comments}
                              onChange={(e) => this.setState({ comments: e.target.value })}
                          />
                      </div>
                    </div>
                    <div className = "row text-center" style = {{margin:'0px 5px'}}> 
                          <Button className = "button-width" color="primary"  
                          onClick={()=>this.onSubmit()}>
                          {onChangeLanguage(locale,'Save',languageData)} 
                          </Button>
                        <Button className = "button-width" color="secondary"  
                          onClick={()=>this.clearvalue()}
                        >{onChangeLanguage(locale,'Refresh',languageData)} </Button> 
                 
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

