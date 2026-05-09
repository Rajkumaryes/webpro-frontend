import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import DatePicker from "../../datePicker";
import Select from 'react-select';
import{areaimportService} from '../../../../redux/imports/areaimport/saga'
import{FeederService} from '../../../../redux/FeedersSchedules/feeder/saga'
import{typeService} from '../../../../redux/projectmasters/type/saga'
import {onChangeLanguage,getCurrentWeek,getTimeDifference,Check_ValidDate,getValue,convertLocalToUTCDate,convertUTCToLocalDate,
  getVesselValue,getActivityValue,getAreaValue} from '../../../../helper'
import { createNotification } from '../../../../toast';
import Loading from "react-fullscreen-loading";
import moment from 'moment';
import{subactivityService} from '../../../../redux/FeedersSchedules/feedermaster/subactivity/saga';
import{vesselService} from '../../../../redux/FeedersSchedules/feedermaster/vesseloperator/saga';
import{requestService} from '../../../../redux/FeedersSchedules/feedermaster/requesttype/saga';
import{ActivityselectionService} from '../../../../redux/FeedersSchedules/feedermaster/activityselection/saga';
import{regionService} from '../../../../redux/FeedersSchedules/feedermaster/region/saga';
import{AreaselectionService} from '../../../../redux/FeedersSchedules/feedermaster/areaselection/saga';

class Sidebar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        start_datetime:'',
        end_datetime:'',
        area_selection:'',
        activity_selection:'',
        week_number:'',
        month:'',
        region:'',
        vessel_operator:'',
        subactivity:'',
        dp_voyage:'',
        request_type:'',
        schedule:'',
        taskstart_datetime:'',
        taskend_datetime:'',
        tat:'',
        user_id:'',
        received_datetime:'',
        sent_datetime:'',
        activityselectiondata:[],
        regiondata:[],
        vesseloperatordata:[],
        subactivitydata:[],
        requesttypedata:[],
        areaselectiondata:[],
        starttime:0,
        endtime:0,
        roundthe:0,
        is_submit:false,
        loading:false,
        is_subactivity:false,
        receivetime_format:false,
        is_valid_date:false,
        is_search:false,
        updated_start_time:new Date(),
        feedercount:'',
        feedercountlast:''
      };
    }
    componentDidMount() {
      this.setState({
        start_datetime:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
        week_number:getCurrentWeek(new Date()).toString(),
        month:(new Date().getMonth() + 1).toString()
      })
       this.fetchsubactivity()
       this.fetchvessel()
       this.fetchactivityselection()
       this.fetchregion()
       this.fetchareaselection()
       this.fetchrequest()
       this.fetchFeederCount()
    }
    fetchFeederCount(){
      this.setState({loading:true})
      const {username} = this.props
      //console.log(username)
      FeederService.fetchfeedercount(username)
      .then((res) => {
         if(res.status)   { 
                let filterstatus = res.data;
                let lastdata = res.lastcount;
                this.setState({ 
                  feedercount:filterstatus, 
                  feedercountlast:lastdata     
                }) 
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})

}
    fetchsubactivity() {
        subactivityService.fetchsubactivity()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var rolelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : (cusmaidid.id).toString(),activityselection:(cusmaidid.activityselection).toString()};
                   });  
                    this.setState({
                    subactivitydata :  rolelist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
      } 
      fetchvessel() {
        vesselService.fetchvessel()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var rolelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : (cusmaidid.id).toString(),area:cusmaidid.area,
                      region:cusmaidid.region};
                   });  
                  
                    this.setState({
                    vesseloperatordata :  rolelist,
                    })
                  
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
      } 
      
    fetchactivityselection() {
        this.setState({loading:true})
        ActivityselectionService.fetchactivityselection()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var regionlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   });  
                    this.setState({
                    activityselectiondata :  regionlist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  
     
     fetchregion() {
        this.setState({loading:true})
        regionService.fetchregion()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var typelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString(),
                      start_time:cusmaidid.start_time,end_time:cusmaidid.end_time};
                   });
                    this.setState({
                      regiondata :  typelist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  
     fetchrequest() {
        requestService.fetchrequest()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var rolelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                   });  
                    this.setState({
                    requesttypedata :  rolelist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
      } 
      
      fetchareaselection() {
        AreaselectionService.fetchareaselection()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var rolelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : (cusmaidid.id).toString(),region:(cusmaidid.region).toString()};
                   });  
                    this.setState({
                    areaselectiondata :  rolelist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
      } 
      fetchData() {
        const {dp_voyage} = this.state 
        if(dp_voyage !== "")
        {
            this.setState({
                loading : true,
                is_submit:false
            })
            FeederService.findapi(dp_voyage)
            .then((res) => {
               
                this.setState({loading:false})
                this.onrefresh()
            if(res.status)   { 
                this.setValue(res.data)
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
          createNotification('Please Enter Dp Voyage','error','filled')
        }
     }

     validDate(date,title)
     {
        var date_value = '',isfill = false
         if(date && date !== null && date !== '')
         {
            
            var end_date =  new Date(date)
            if (Object.prototype.toString.call(end_date) === "[object Date]") {
                if (isNaN(end_date.getTime())) 
                { 
                    console.log("date is not valid")
                } 
                else 
                {
                    date_value = convertLocalToUTCDate(end_date)
                    console.log("date is valid")
                    isfill = true
                }
              } else 
              {
                 console.log("not a date")
              }

         }
        //  if(isfill === false)
        //  {
        //     createNotification(`Please Enter ${title} (MM/DD/YYYY)`,'error','filled') 
        //  }
 
         return date_value

     }
     setValue(record)
     {
         
         if(record !== null && record)
         {
            this.setState({
                
                start_datetime:record.start_datetime,
                end_datetime:record.end_datetime,
                area_selection:record.area_selection,
                activity_selection:record.activity_selection,
                week_number:record.week_number,
                month:record.month,
                region:record.region,
                vessel_operator:record.vessel_operator,
                subactivity:record.subactivity,
                dp_voyage:record.dp_voyage,
                request_type:record.request_type,
                schedule:record.schedule,
                taskstart_datetime:record.taskstart_datetime,
                taskend_datetime:record.taskend_datetime,
                tat:record.tat,
                user_id:record.user_id,
                received_datetime:this.validDate(record.received_datetime)   ,
                sent_datetime:this.validDate(record.sent_datetime),
                is_search:true
             })
         }

     } 
    handlecustomtype = (selectedOptions) => {
        this.setState({region : selectedOptions.value})  
      }  
      onSubmit() { 
        const {start_datetime,area_selection,activity_selection,week_number,month,region,
            vessel_operator,subactivity,dp_voyage,request_type,schedule,taskstart_datetime,taskend_datetime,
            received_datetime,sent_datetime,updated_start_time} = this.state;
         
        if(area_selection!==''  &&activity_selection!==''  &&region!=='' &&
          vessel_operator!=='' && subactivity!=='' &&dp_voyage!=='' &&request_type!=='')
        {
       
          const end_datetime =  moment(new Date()).format('MM/DD/YYYY hh:mm:ss a') 
          var times =(received_datetime !=='' && received_datetime !== null && received_datetime) ? moment(convertUTCToLocalDate(received_datetime)).format('MM/DD/YYYY hh:mm:ss a') :''
          // var start_datetime1 = moment(convertUTCToLocalDate(start_datetime)).format('MM/DD/YYYY hh:mm:ss a') 
          var received_datetime1 =(received_datetime !=='' && received_datetime !== null && received_datetime)? moment(convertUTCToLocalDate(received_datetime)).format('MM/DD/YYYY hh:mm:ss a'):'' 
          var sent_datetime1 =(sent_datetime !=='' && sent_datetime !== null && sent_datetime) ? moment(convertUTCToLocalDate(sent_datetime)).format('MM/DD/YYYY hh:mm:ss a') :''
          var tat_time =times !=='' ?getTimeDifference(new Date(times),new Date()) : ''
          let end_date=convertLocalToUTCDate(new Date()),
          start_date=convertLocalToUTCDate(updated_start_time),
          updatedstarttime=convertLocalToUTCDate(updated_start_time),
           updated_end_time=convertLocalToUTCDate(new Date())
              this.setState({
                is_submit:false,
                tat:tat_time,
                end_datetime:end_datetime
              })
             
                const {username} = this.props
                this.setState({ loading : true })
                FeederService.createapi(start_datetime,end_datetime,area_selection,activity_selection,week_number,month,
                    region,vessel_operator,subactivity,dp_voyage,request_type,schedule,taskstart_datetime,taskend_datetime,
                    tat_time,username,received_datetime1,sent_datetime1,start_date,end_date,updatedstarttime,updated_end_time)
                .then((res) => { 
                  this.setState({   
                    loading : false     
                  }) 
                  if(res.status)
                    {
                      createNotification('Created','success','filled')
                      this.setState({
                        start_datetime:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
                        week_number:getCurrentWeek(new Date()).toString(),
                        month:(new Date().getMonth() + 1).toString(),
                        end_datetime:'',
                        area_selection:'',
                        activity_selection:'',
                        region:'',
                        vessel_operator:'',
                        subactivity:'',
                        dp_voyage:'',
                        request_type:'',
                        schedule:'',
                        taskstart_datetime:'',
                        taskend_datetime:'',
                        tat:'',
                        user_id:'',
                        received_datetime:'',
                        sent_datetime:'',
                        is_submit:false,
                        is_subactivity:false,
                        is_valid_date:false,
                        is_search:false
                    })
                    this.fetchFeederCount()
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
        start_datetime:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
        week_number:getCurrentWeek(new Date()).toString(),
        month:(new Date().getMonth() + 1).toString(),
        end_datetime:'',
        area_selection:'',
        activity_selection:'',
        region:'',
        vessel_operator:'',
        subactivity:'',
        dp_voyage:'',
        request_type:'',
        schedule:'',
        taskstart_datetime:'',
        taskend_datetime:'',
        tat:'',
        user_id:'',
        received_datetime:'',
        sent_datetime:'',
        is_submit:false,
        is_subactivity:false,
        is_valid_date:false,
        is_search:false
    })
   
  } 
  handlechangeactivity = (selectedOptions) => {
       
    const {activitydata,subactivity}=this.state
    let value =selectedOptions.value
    this.setState({
      activity : selectedOptions.value,
      is_subactivity:getValue(activitydata,'value','is_subactivity',value.toString()),
    })
    this.fetchsubactivity(selectedOptions.value)
    this.fetchsection(selectedOptions.value,subactivity)
      
  } 
  handlechangeactivityselection = (selectedOptions) => {
    this.setState({
      activity_selection : selectedOptions.value,
      subactivity:''
    })
   
  } 
 
  handlechangesubactivity = (selectedOptions) => {
       
    const {activity,subactivitydata}=this.state
    let value =selectedOptions.value
    this.setState({
      subactivity : selectedOptions.value
    })
    this.fetchsection(activity,selectedOptions.value)
  } 
  
  handleChangeerrorreporteddate(e) {
    var date1 = new Date(e.target.value)
    var datenew=getCurrentWeek(date1).toString()
    this.setState({
        error_reported_date:e.target.value,
        error_reported_week:datenew,
    });
  
  }
  
  handleChange(e) {
    var date1 = new Date(e.target.value)
    var datenew=getCurrentWeek(date1).toString()
    this.setState({tender_processed_date:e.target.value,
        tender_processed_week:datenew,
    });
 
  }
  handleChangedp= e => {
    const re = /^[0-9\b]+$/;
      if (e.target.value === '' || re.test(e.target.value)) {
         this.setState({dp_voyage: e.target.value})
         console.log('kkkkk',e.target.value)
      }else{
        createNotification('Enter the Numeric Value only','error','filled')
      }
      
  }
  handleChangeSchedule= e => {
    const re = /^[0-9\b]+$/;
      if (e.target.value === '' || re.test(e.target.value)) {
         this.setState({schedule: e.target.value})
         console.log('kkkkk',e.target.value)
      }else{
        createNotification('Enter the Numeric Value only','error','filled')
      }
      
  }
//   onChangetime(date)
//   {
//     console.log("lhnkjh " ,date)
//     var time = moment(date).format('HH:mm:ss')
//     var date1=getCurrentWeek(date).toString()
//     this.setState({
//         error_reported_date:date1})
//     if(time !== "00:00:00")
//     {
//       this.setState({ error_reported_date  : date})
//     }
//    console.log('datttt',date1)
//   }
onChangestarttime(date)
  {
    this.setState({
      start_datetime  : date,
      week_number:getCurrentWeek(date).toString(),
      month:(date.getMonth() + 1).toString()
    })
   
  }
  onChangeendtime(date)
  {
    console.log("lhnkjh " ,date)
    var time = moment(date).format('HH:mm:ss')
    var date1=getCurrentWeek(date).toString()
    this.setState({
        tender_processed_week:date1
    })
    if(time !== "00:00:00")
    {
      this.setState({tender_processed_date  : date,})
    }
   
  }
  onChangemailsenttime(date)
  {
    this.setState({sent_datetime  : date})
    // const {received_datetime}=this.state
    // var time = moment(date).format('HH:mm:ss')
    // var timerece = moment(received_datetime).format('HH:mm:ss')
    // if(date !== '')
    // {
    //     if(received_datetime !== '')
    //     {
    //       if(timerece <= time) {
    //         this.setState({sent_datetime  : date})
           
    //       }else{
    //         createNotification('Mail Send Date Must be bigger then Mail Received Start Date','error','filled')
    //       }
            
    //     }
    //     else
    //     {
    //       createNotification('Please Choose Mail Received Start Date / Time','error','filled')
          
         
    //     }
     
    // }
   
  }
onChangemailstarttime (date) {
  this.setState({received_datetime  : date})
   
  }
  

    handlechangeregion = (selectedOptions) => {
      let value=selectedOptions.value
      this.setState({
        region : selectedOptions.value,
        area_selection:''
        })  
     
    } 
    handlechangearea = (selectedOptions) => {
    
      this.setState({
        area_selection : selectedOptions.value,
        vessel_operator:''
        })  
        
    } 
    gettatvalue(value)
    {
      const{end_time,starttime,endtime}=this.state
       console.log("kjbkj issuer = " ,value)
       this.setState({
            received_datetime : value})
        var valid_date = moment(value).format('hh')
       let Totalmailreceive =Number(valid_date) + Number(8)
       console.log("kkkk",Totalmailreceive)
       if(Totalmailreceive>12){
        let mins=Totalmailreceive-12
        this.setState({
          roundthe:mins
        })
        console.log("kkkkkkkkkkkkkkk",mins)
       }else{
        this.setState({
          roundthe:Totalmailreceive
        })
       }
   if(this.state.roundthe<endtime){
    let tatne=starttime-this.state.roundthe
    this.setState({
      tat:tatne
    })
    console.log("kkkkkkkkkkkkkkk",tatne)
    }
    }else(){
      this.setState({
        tat:0
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
    render()
    { 
        const{start_datetime,end_datetime,area_selection,activity_selection,week_number,month,region,feedercount,feedercountlast,
            vessel_operator,subactivity,dp_voyage,request_type,schedule,taskstart_datetime,
            taskend_datetime,tat,user_id,received_datetime,sent_datetime,areaselectiondata,
            activityselectiondata,regiondata,vesseloperatordata,subactivitydata,requesttypedata,
            is_subactivity,is_submit,is_valid_date,is_search,loading}=this.state
        const {match,username,locale,languageData,receivetime_format} = this.props
        return (
            <>
            <title>{onChangeLanguage(locale,'Feeder Schedules',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                
                <div className = "row">
                      <div className = "col-md-8">
                      <Breadcrumb heading={onChangeLanguage(locale,'Feeder Schedules',languageData)} match={match} />
                    </div>
                    <div className = "col-md-2">
                        <h2 style = {{marginTop:'15px'}}>Total EQ : {feedercount}</h2>
                    </div>
                    <div className = "col-md-2">
                        <h2  style = {{marginTop:'15px'}}>Last EQ : {feedercountlast}</h2>
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
                            {onChangeLanguage(locale,'Start Date / Time',languageData)}
                            <br></br>{start_datetime}</Label>
                            {/* <p1 className = 'fontstyle mandatory-label'>{is_submit === true && start_datetime === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                            {is_search ===false && <DatePicker
                                 selected={start_datetime}
                                 className = "text-background" 
                                 placeholder="ll"
                                 onChange={(date) => this.onChangestarttime(date)}
                            />
                        }
                            {is_search === true && 
                                   <Input  className = {"fontstyle text-background" }    
                                    disabled
                                   value = {start_datetime}  
                                   onChange= {(e)=>this.setState({start_datetime : e.target.value})} 
                            />} */}
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {/* {onChangeLanguage(locale,'Activity Selection',languageData)} */}
                            {onChangeLanguage(locale,'Location',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && activity_selection === ''?  "error-border-select-paste":"react-select fontstyle" }                          
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={activityselectiondata.filter(option =>option.value === activity_selection)}
                            options={activityselectiondata}
                            // onChange= {(e)=>this.gettatvalue11(e.target.value)}
                            onChange={this.handlechangeactivityselection}
                            // onChange={({value}) => this.setState({  activity_selection: value })}
                          />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Activity',languageData)} <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && subactivity === ''?  "error-border-select-paste":"react-select fontstyle" }                          
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={subactivitydata.filter(option =>option.value === subactivity)}
                            options={getActivityValue(subactivitydata,activity_selection)}
                            onChange={({value}) => this.setState({  subactivity: value })}
                          />
                        </div>
                        
                        <div className = "col-md-3 space-margin ">
                            <Label  className = "fontstyle normal-font" > 
                            {onChangeLanguage(locale,'Region',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                                <Select  
                                className = {is_submit === true && region === ''?  "error-border-select-paste":"react-select fontstyle" } 
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={regiondata.filter(option =>option.value === region)}
                                options={regiondata}
                                onChange={this.handlechangeregion}
                             />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Area Selection',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && area_selection === ''?  "error-border-select-paste":"react-select fontstyle" }                          
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={areaselectiondata.filter(option =>option.value === area_selection)}
                            options={getAreaValue(areaselectiondata,region)}
                            onChange={this.handlechangearea}
                            // onChange={({value}) => this.setState({  area_selection: value })}
                          />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Vessel Operator',languageData)} <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && vessel_operator === ''?  "error-border-select-paste":"react-select fontstyle" }                          
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={vesseloperatordata.filter(option =>option.value === vessel_operator)}
                            options={getVesselValue(vesseloperatordata,area_selection,region)}
                            onChange={({value}) => this.setState({  vessel_operator: value })}
                          />
                        </div>
                        
                         <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Dp Voyage',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && dp_voyage === ''?  "error-border":"fontstyle text-background" }    
                            // placeholder = 'End date'
                            type="tel"
                            //  min="0"  step='1'
                            // onKeyDown={this.handleKeypress}
                            value = {dp_voyage}  
                            onChange={this.handleChangedp}
                            // onChange= {(e)=>this.setState({dp_voyage : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Request Type',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && request_type === ''?  "error-border-select-paste":"react-select fontstyle" }                          
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={requesttypedata.filter(option =>option.value === request_type)}
                            options={requesttypedata}
                            onChange={({value}) => this.setState({  request_type: value })}
                          />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Schedule Volume Counts',languageData)}
                            </Label>
                            <Input  
                            className = {"fontstyle text-background" }      
                            // placeholder = 'End date'
                            value = {schedule}  
                            type="tel"
                            onChange={this.handleChangeSchedule}
                            // onChange= {(e)=>this.setState({schedule : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Mail Received Start Date / Time',languageData)}
                            </Label>
                            <DatePicker
                                 selected={received_datetime}
                                 className = "text-background" 
                                 onChange={(date) => this.onChangemailstarttime(date)}
                              /> 
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'TAT',languageData)}
                           </Label>
                            <Input  
                            className = {"fontstyle text-background" }      
                            // placeholder = 'End date'
                            value = {tat}  
                            disabled
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Mail Sent Date/ Time',languageData)}
                            </Label>
                             <DatePicker
                                 selected={sent_datetime}
                                 className = "text-background" 
                                 onChange={(date) => this.onChangemailsenttime(date)}
                                 />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'User ID',languageData)}
                            <br></br>{username}</Label>
                          
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'End Date/ Time',languageData)}
                           <br></br> {end_datetime}</Label>
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Week Number',languageData)}
                           <br></br>{week_number}</Label>
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Month',languageData)}
                           <br></br>{month}</Label>
                        </div>
                    </div>
                    <div className = "row text-center" style = {{margin:'0px 5px'}}> 
                        <Button 
                            style={{width:'150px'}}
                            className = "button-width" color="secondary"  
                                        onClick={()=>this.fetchData()}
                                >
                                {onChangeLanguage(locale,'Find',languageData)} 
                            </Button>
                            <Button 
                            style={{width:'150px'}}
                            className = "button-width" color="primary"  
                                        onClick={()=>this.onSubmit()}
                                >
                                {onChangeLanguage(locale,'Save',languageData)} 
                            </Button>
                            <Button className = "button-width" color="secondary" 
                                    style={{width:'150px'}} 
                                onClick={()=>this.onrefresh()}
                                >
                               {onChangeLanguage(locale,'Clear',languageData)} 
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

