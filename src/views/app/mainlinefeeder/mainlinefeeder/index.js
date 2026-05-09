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
import{typeService} from '../../../../redux/projectmasters/type/saga'
import {onChangeLanguage,getCurrentWeek,getTimeDifference,Check_ValidDate,getValue,convertLocalToUTCDate,convertUTCToLocalDate,
  getVesselValue,getActivityValue,getAreaValue} from '../../../../helper'
import { createNotification } from '../../../../toast';
import Loading from "react-fullscreen-loading";
import moment from 'moment';
import{ssydetailsService} from '../../../../redux/mainlinefeeder/master/ssydetails/saga';
import{requestService} from '../../../../redux/mainlinefeeder/master/requesttype/saga';
import{regionService} from '../../../../redux/mainlinefeeder/master/region/saga';
import{activityService} from '../../../../redux/mainlinefeeder/master/activity/saga';
import { getValue_communication } from '../pasteData'
import * as clipboard from "clipboard-polyfill/text";
import { LocationService } from '../../../../redux/location/saga'
import { MainlinefeederService } from '../../../../redux/mainlinefeeder/mainlinefeeder/saga'

class Mainline extends Component {
    constructor(props) {
      super(props);
      this.state = {
        start_datetime:'',
        end_datetime:'',
        week_number:'',
        region:'',
        activity:'',
        dp_voyage:'',
        request_type:'',
        tat:'',
        user_id:'',
        received_datetime:'',
        sent_datetime:'',
        activityselectiondata:[],
        regiondata:[],
        ssydetailsdata:[],
        subactivitydata:[],
        requesttypedata:[],
        activitydata:[],
        location_data:[],
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
        isDataPasted: false,
        subject:'',
        mailreceived_from:'',
        ssydetails:'',
        location:'',
        mainline_status:'',
        mainlinecount:'',
        mainlinecountlast:'',
      };
    }
    componentDidMount() {
      this.setState({
        start_datetime:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
        week_number:getCurrentWeek(new Date()).toString(),
      })
       this.fetchssydetails()
       this.fetchregion()
       this.fetchactivity()
       this.fetchrequest()
       this.fetch_location()
       this.fetchMainlineCount()
    }
    fetchMainlineCount(){
      this.setState({loading:true})
      const {username} = this.props
      //console.log(username)
      MainlinefeederService.fetchmainlinecount(username)
      .then((res) => {
         if(res.status)   { 
                let filterstatus = res.data;
                let lastdata = res.lastcount;
                this.setState({ 
                  mainlinecount:filterstatus, 
                  mainlinecountlast:lastdata     
                }) 
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})

}
    fetch_location() {
      this.setState({ loading: true })
      LocationService.fetchLocation()
        .then((res) => {
          this.setState({ loading: false })
          if (res.status) {
            let filterstatus = (res.data).filter(item => item.status === 1)
            var regionlist = filterstatus.map(function (cusmaidid) {
              return { label: cusmaidid.name, value: cusmaidid.id.toString() };
            });
            this.setState({
              location_data: regionlist,
            })
          }
        })
        .catch((error) => { this.setState({ loading: false }) });
    }
    fetchssydetails() {
      ssydetailsService.fetchssydetails()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var rolelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : (cusmaidid.id).toString(),area:cusmaidid.area,
                      region:cusmaidid.region};
                   });  
                  
                    this.setState({
                      ssydetailsdata :  rolelist,
                    })
                  
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
      } 
      

     
     fetchregion() {
        this.setState({loading:true})
        regionService.fetchregion()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var typelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
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
      
      fetchactivity() {
        activityService.fetchactivity()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var rolelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : (cusmaidid.id).toString(),region:(cusmaidid.region).toString()};
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

     async onPaste() {
        clipboard.readText().then((text) => {
          var record = getValue_communication(text)
          this.setState({
            mailreceived_from: record.from,
            received_datetime: this.validDate(record.received_time, 'received_time'),
            // received_datetime:record.received_time,
            subject: record.subject,
          })
    
        });
        this.setState({
          isDataPasted: true
      });
      }

      validDate(date, title) {
        var date_value = '', isfill = false;
        if (date && date !== null && date !== '') {
            var end_date = new Date(date);
            if (Object.prototype.toString.call(end_date) === "[object Date]") {
                if (isNaN(end_date.getTime())) { 
                    console.log("date is not valid");
                } else {
                    // Convert date to UTC string
                    date_value = this.convertLocalToUTCDate(end_date);
                    console.log("date is valid", date_value);
                    isfill = true;
                }
            } else {
                console.log("not a date");
            }
        }
        return date_value;
    }
    
    // Function to convert local date to UTC date string
    convertLocalToUTCDate(date) {
        return date.toISOString();
    }
    
     setValue(record)
     {
         
         if(record !== null && record)
         {
            this.setState({
                
                start_datetime:record.start_datetime,
                end_datetime:record.end_datetime,
                week_number:record.week_number,
                region:record.region,
                activity:record.activity,
                dp_voyage:record.dp_voyage,
                request_type:record.request_type,
                tat:record.tat,
                user_id:record.user_id,
                is_search:true,
                mainline_status:record.mainline_status
             })
         }

     } 
    handlecustomtype = (selectedOptions) => {
        this.setState({region : selectedOptions.value})  
      }  
      onSubmit() {
        const {
          start_datetime, week_number, region, location, ssydetails,
          activity, dp_voyage, request_type, subject, mailreceived_from, mainline_status,
          received_datetime, sent_datetime, updated_start_time, requesttypedata, activitydata
        } = this.state;
      
        let isMandateFieldsFilled = true;
      
        // Determine if the selected request type is special
        const selectedRequestTypeLabel = requesttypedata.find(item => item.value === request_type)?.label;
        const selectedActivityLabel = activitydata.find(item => item.value === activity)?.label;
        
        // Check if the selected request type or activity is special
        const isSpecialRequestType = ["Transit Time", "Advance creation", "ERD", "Cut-off"].includes(selectedRequestTypeLabel);
        const isSpecialActivity = selectedActivityLabel === "Audit";
      
        // Define mandatory fields
        const mandatoryFields = {
          location,
          region,
          activity,
          ssydetails,
          dp_voyage,
          request_type,
          mainline_status,
        };
      
        // Conditionally add fields to mandatoryFields based on whether it is a special request type or activity
        if (!isSpecialRequestType && !isSpecialActivity) {
          mandatoryFields.received_datetime = received_datetime;
          mandatoryFields.subject = subject;
          mandatoryFields.mailreceived_from = mailreceived_from;
        }
      
        // Check if all mandatory fields are filled
        Object.entries(mandatoryFields).forEach(([key, field]) => {
          console.log(`Checking field ${key}: `, field);  // Debug log
          if (!field || field === '') {
            isMandateFieldsFilled = false;
          }
        });
      
        console.log("Is Mandate Fields Filled:", isMandateFieldsFilled);  // Debug log
      
        // Proceed if all mandatory fields are filled
        if (isMandateFieldsFilled) {
          // Process date and time
          const end_datetime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss a');
          const times1 = received_datetime ? moment(convertUTCToLocalDate(received_datetime)).format('MM/DD/YYYY hh:mm:ss a') : '';
          const times2 = sent_datetime ? moment(convertUTCToLocalDate(sent_datetime)).format('MM/DD/YYYY hh:mm:ss a') : '';
          const tat_time = times1 ? getTimeDifference(new Date(times1), new Date(times2)) : '';
          const end_date = convertLocalToUTCDate(new Date());
          const start_date = convertLocalToUTCDate(updated_start_time);
          const updatedstarttime = convertLocalToUTCDate(updated_start_time);
          const updated_end_time = convertLocalToUTCDate(new Date());
      
          this.setState({
            is_submit: false,
            tat: tat_time,
            end_datetime: end_datetime
          });
      
          const { username } = this.props;
          this.setState({ loading: true });
      
          // API call
          MainlinefeederService.createapi(
            start_datetime, end_datetime, week_number, location,
            region, activity, ssydetails, dp_voyage, request_type, subject, mailreceived_from, mainline_status,
            tat_time, username, times1, times2, start_date, end_date, updatedstarttime, updated_end_time
          )
            .then((res) => {
              this.setState({ loading: false });
              if (res.status) {
                createNotification('Created', 'success', 'filled');
                this.fetchMainlineCount();
                this.setState({
                  start_datetime: moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
                  week_number: getCurrentWeek(new Date()).toString(),
                  end_datetime: '',
                  dp_voyage: '',
                  tat: '',
                  is_submit: false,
                  is_subactivity: false,
                  is_valid_date: false,
                  is_search: false,
                });
      
                // Check if sent_datetime is not empty and call onrefresh()
                if (sent_datetime) {
                  this.onrefresh();
                }
              } else {
                createNotification(res.message, 'error', 'filled');
              }
            })
            .catch((error) => {
              this.setState({ loading: false });
              createNotification('Error submitting form', 'error', 'filled');
            });
        } else {
          // If any mandatory field is not filled
          this.setState({ is_submit: true });
          createNotification('Please fill mandatory fields', 'error', 'filled');
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
        end_datetime:'',
        region:'',
        activity:'',
        dp_voyage:'',
        request_type:'',
        tat:'',
        user_id:'',
        received_datetime:'',
        sent_datetime:'',
        is_submit:false,
        is_subactivity:false,
        is_valid_date:false,
        is_search:false,
        location:'',
        subject:'',
        mailreceived_from:'',
        mainline_status:'',
        mailreceived_from:'',
        subject:''
    })
   
  } 
  handlechangeactivity = (selectedOptions) => {
       
    const {activitydata,subactivity}=this.state
    let value =selectedOptions.value
    this.setState({
      activity : selectedOptions.value,
      is_subactivity:getValue(activitydata,'value','is_subactivity',value.toString()),
    })
    this.fetchsection(selectedOptions.value,subactivity)
      
  } 
  handlechangelocation = (selectedOptions) => {
    this.setState({
      location : selectedOptions.value,
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



  onChangemailsenttime(date)
  {
    this.setState({sent_datetime  : date}) 
  }
onChangemailstarttime (date) {
  this.setState({received_datetime  : date})
   
  }
  

    handlechangeregion = (selectedOptions) => {
      let value=selectedOptions.value
      this.setState({
        region : selectedOptions.value,
        })  
     
    } 
  handlemainlinestatus = (selectedOptions) => {
    this.setState({ mainline_status: selectedOptions.value })
  }
    gettatvalue(value)
    {
      const{end_time,sent_datetime,received_datetime}=this.state
       console.log("sent_datetime = " ,value)
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
   if(this.state.roundthe<sent_datetime){
    let tatne=received_datetime-this.state.roundthe
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
        const{start_datetime,end_datetime,week_number,region,isDataPasted,subject,mailreceived_from,ssydetails,mainlinecount,mainlinecountlast,
          activity,dp_voyage,request_type,location_data,location,mainline_status,
            tat,user_id,received_datetime,sent_datetime,activitydata,
            activityselectiondata,regiondata,ssydetailsdata,requesttypedata,isSpecialRequestType,isSpecialActivity,
            is_subactivity,is_submit,is_valid_date,is_search,loading}=this.state
        const {match,username,locale,languageData,receivetime_format} = this.props
        var mainlinestatus_data = [
          {
            "label": "In Process",
            "value": "In Process"
          },
          {
            "label": "Awating Information",
            "value": "Awating Information"
          },
          {
            "label": "Resolved",
            "value": "Resolved"
          },
          {
            "label": "Transfer to Area",
            "value": "Transfer to Area"
          },
        ];
        return (
            <>
            <title>{onChangeLanguage(locale,'Mainline Feeders',languageData)}</title>
            <Row>
              <Colxx xxs="12">
              <div className = "row">
                      <div className = "col-md-8">
                      <Breadcrumb heading={onChangeLanguage(locale,'Mainline Feeders',languageData)} match={match} />
                    </div>
                    <div className = "col-md-2">
                        <h2 style = {{marginTop:'15px'}}>Total EQ : {mainlinecount}</h2>
                    </div>
                    <div className = "col-md-2">
                        <h2  style = {{marginTop:'15px'}}>Last EQ : {mainlinecountlast}</h2>
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
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'User ID',languageData)}
                            <br></br>{username}</Label>
                          
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Start Date / Time',languageData)}
                            <br></br>{start_datetime}</Label>
                            
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
                            {onChangeLanguage(locale,'Location',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && location === ''?  "error-border-select-paste":"react-select fontstyle" }                          
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={location_data.filter(option =>option.value === location)}
                            options={location_data}
                            onChange={this.handlechangelocation}
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
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Activity',languageData)} <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && activity === ''?  "error-border-select-paste":"react-select fontstyle" }                          
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={activitydata.filter(option =>option.value === activity)}
                            options={getAreaValue(activitydata,region)}
                            onChange={({value}) => this.setState({  activity: value })}
                          />
                        </div>
                        
                        
                        <div className = "col-md-3 space-margin ">
                            <Label  className = "fontstyle normal-font" > 
                            {onChangeLanguage(locale,'SSY',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                                <Select  
                                className = {is_submit === true && ssydetails === ''?  "error-border-select-paste":"react-select fontstyle" } 
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={ssydetailsdata.filter(option =>option.value === ssydetails)}
                                options={getAreaValue(ssydetailsdata,region)}
                                onChange={({value}) => this.setState({  ssydetails: value })}
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
                        
                        {!isSpecialRequestType && !isSpecialActivity && (
                          <>
                            <div className="col-md-3 space-margin">
                              <Label className="fontstyle normal-font">
                                {onChangeLanguage(locale, 'Mail Received Time', languageData)}
                              </Label>
                              <Input
                                className={is_submit && received_datetime === '' ? "error-border" : "fontstyle text-background-paste"}
                                type="text"
                                disabled={isDataPasted} 
                                value={received_datetime}
                                onChange={(e) => this.setState({ received_datetime: e.target.value })}
                              />
                            </div>
                            </>
                          )}
                            <div className="col-md-3 space-margin">
                              <Label className="fontstyle normal-font">
                                {onChangeLanguage(locale, 'Mail Sent Date/ Time', languageData)}
                              </Label>
                              <DatePicker
                                selected={sent_datetime}
                                className="fontstyle text-background-paste"
                                onChange={(date) => this.onChangemailsenttime(date)}
                              />
                            </div>
                          
                        

                        <div className="col-md-3 space-margin">
                          <Label className="fontstyle normal-font">
                            {onChangeLanguage(locale, 'TAT', languageData)}
                          </Label>
                          <Input  
                            className="fontstyle text-background"
                            value={tat}  
                            disabled
                          />
                        </div>

                        <div className="col-md-3 space-margin">
                          <Label className="fontstyle normal-font">
                            {onChangeLanguage(locale, 'Status', languageData)}<a style={{ color: 'red' }}>*</a>
                          </Label>
                          <Select
                            className={is_submit && mainline_status === '' ? "error-border-select-paste" : "react-select fontstyle"}
                            classNamePrefix="react-select"
                            value={mainlinestatus_data.filter(option => option.value === mainline_status)}
                            options={mainlinestatus_data}
                            onChange={this.handlemainlinestatus}
                          />
                        </div>

                        {!isSpecialRequestType && !isSpecialActivity && (
                          <>
                            <div className="col-lg-3 space-margin">
                              <Label className="fontstyle normal-font">
                                {onChangeLanguage(locale, 'Mail Received From', languageData)}<a style={{ color: 'red' }}>*</a>
                              </Label>
                              <Input
                                className={is_submit && mailreceived_from === '' ? "error-border" : "fontstyle text-background-paste"}
                                disabled={isDataPasted} 
                                value={mailreceived_from}
                                onChange={(e) => this.setState({ mailreceived_from: e.target.value })}
                              />
                            </div>
                            <div className="col-md-3 space-margin">
                              <Label className="fontstyle normal-font">
                                {onChangeLanguage(locale, 'Subject', languageData)}<a style={{ color: 'red' }}>*</a>
                              </Label>
                              <textarea
                                className={is_submit && subject === '' ? "border-textarea-background-paste" : "fontstyle textarea-background-paste"}
                                disabled={isDataPasted}
                                value={subject}
                                onChange={(e) => this.setState({ subject: e.target.value })}
                              />
                            </div>
                          </>
                        )}

                    </div>
                    <div className = "row text-center" style = {{margin:'0px 5px'}}> 
                             <Button
                                className="button-width" color="secondary"
                                onClick={() => this.onPaste()}>
                                {onChangeLanguage(locale, 'Paste from Mail', languageData)}
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

   })(Mainline)
  );

