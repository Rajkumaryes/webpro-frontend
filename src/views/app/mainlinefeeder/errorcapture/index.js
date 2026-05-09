import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import DatePicker from "../../datePicker";
import Select from 'react-select';
import{ErrorCaptureService} from '../../../../redux/mainlinefeeder/errorcapture/saga'
import{typeService} from '../../../../redux/projectmasters/type/saga'
import {onChangeLanguage,getCurrentWeek,getTimeDifference,Check_ValidDate,getValue,convertLocalToUTCDate,convertUTCToLocalDate,
  getVesselValue,getActivityValue,getAreaValue} from '../../../../helper'
import { createNotification } from '../../../../toast';
import Loading from "react-fullscreen-loading";
import moment from 'moment';
import{ErrortypeService} from '../../../../redux/mainlinefeeder/master/errortype/saga';
import{vesselService} from '../../../../redux/FeedersSchedules/feedermaster/vesseloperator/saga';
import{sourceService} from '../../../../redux/FeedersSchedules/feedermaster/source/saga';
import{ActivityService} from '../../../../redux/FeedersSchedules/feedermaster/activitytype/saga';
import{regionService} from '../../../../redux/mainlinefeeder/master/region/saga';
import{AreaselectionService} from '../../../../redux/FeedersSchedules/feedermaster/areaselection/saga';

class Sidebar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        date:'',
        error_classification:'',
        no_of_dps:'',
        dp_voyage:'',
        dpvoyage_sensitivity:'',
        user:'',
        reported_by:'',
        comments:'',
        source:'',
        week:'',
        area:'',
        region:'',
        vessel_operator:'',
        error_type:'',
        activityselectiondata:[],
        regiondata:[],
        vesseloperatordata:[],
        errortypedata:[],
        errorTypeSensitivityMap: {},
        sensitivity:'',
        sourcedata:[],
        areaselectiondata:[],
        is_submit:false,
        loading:false,
        is_subactivity:false,
        receivetime_format:false,
        is_valid_date:false,
        updated_start_time:new Date(),
        error_occurred:''
      };
    }
    componentDidMount() {
       this.fetcherrortype()
    //    this.fetchvessel()
       this.fetchregion()
    }
    fetcherrortype() {
        ErrortypeService.fetcherrortype()
        .then((res) => {
            if(res.status) {
                let filterstatus = (res.data).filter(item => item.status === 1);
                let rolelist = filterstatus.map(cusmaidid => ({
                    label: cusmaidid.name,
                    value: (cusmaidid.id).toString()
                }));
                let errorTypeSensitivityMap = {};
                filterstatus.forEach(cusmaidid => {
                    errorTypeSensitivityMap[cusmaidid.id] = cusmaidid.sensitivity;
                });
    
                this.setState({
                    errortypedata: rolelist,
                    errorTypeSensitivityMap: errorTypeSensitivityMap
                });
            } else {
                this.setState({loading:false});
            }
        })
        .catch((error) => {
            // Handle error
        });
    }
     
     fetchregion() {
        this.setState({loading:true})
        regionService.fetchregion()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var typelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString(),unit:cusmaidid.unit};
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
       
      fetchData() {
        const {shipment_no} = this.state 
        if(shipment_no !== "")
        {
            this.setState({
                loading : true,
                is_submit:false
            })
            ErrorCaptureService.fetchapi(shipment_no)
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
          createNotification('Please Enter Shipment Number','error','filled')
        }
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
                dpvoyage_sensitivity:record.dpvoyage_sensitivity,
                request_type:record.request_type,
                schedule:record.schedule,
                taskstart_datetime:record.taskstart_datetime,
                taskend_datetime:record.taskend_datetime,
                tat:record.tat,
                user_id:record.user_id,
                received_datetime:record.received_datetime,
                is_search:true
             })
         }

     } 
    handlecustomtype = (selectedOptions) => {
        this.setState({region : selectedOptions.value})  
      }  
      onSubmit() { 
        const {date,error_classification,dp_voyage,no_of_dps,user,reported_by,comments,week,region,error_type,updated_start_time,
            errortypedata,errortypedataall,error_occurred,sensitivity} = this.state;
         
        if(date!=='' &&error_classification!=='' &&error_type!=='' &&error_occurred!=='' && dp_voyage !== ""&& no_of_dps!=='' && region!=='' &&user!=='')
        {
         
              this.setState({
                is_submit:false
              })
              var sensitivitys = sensitivity * no_of_dps;
              console.log("sensitivity",sensitivitys)
              let end_date=convertLocalToUTCDate(new Date()),
                start_date=convertLocalToUTCDate(updated_start_time),
                updatedstarttime=convertLocalToUTCDate(updated_start_time),
                 updated_end_time=convertLocalToUTCDate(new Date()),
                 date1=moment(convertUTCToLocalDate(date)).format('MM/DD/YYYY hh:mm:ss a') 
                const {username} = this.props
                this.setState({ loading : true })
                ErrorCaptureService.createapi(date1,error_classification,error_occurred,dp_voyage,no_of_dps,user,comments,week,region,sensitivitys.toString,
                  error_type,start_date,end_date,updatedstarttime,updated_end_time,username)
                .then((res) => { 
                  this.setState({   
                    loading : false     
                  }) 
                  if(res.status)
                    {
                      createNotification('Created','success','filled')
                      this.setState({
                        date:'',
                        error_classification:'',
                        error_occurred:'',
                        dp_voyage:'',
                        dpvoyage_sensitivity:'',
                        no_of_dps:'',
                        user:'',
                        reported_by:'',
                        comments:'',
                        source:'',
                        week:'',
                        area:'',
                        region:'',
                        vessel_operator:'',
                        error_type:'',
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
        date:'',
        error_classification:'',
        error_occurred:'',
        dp_voyage:'',
        no_of_dps:'',
        dpvoyage_sensitivity:'',
        user:'',
        comments:'',
        source:'',
        week:'',
        area:'',
        region:'',
        vessel_operator:'',
        error_type:'',
        is_submit:false,
        is_subactivity:false,
        is_valid_date:false
    })
   
  } 
  handlechangeactivity = (selectedOptions) => {
       
    const {activitydata,subactivity}=this.state
    let value =selectedOptions.value
    this.setState({
      activity : selectedOptions.value,
      is_subactivity:getValue(activitydata,'value','is_subactivity',value.toString()),
    })
    this.fetcherrortype(selectedOptions.value)
    this.fetchsection(selectedOptions.value,subactivity)
      
  }  
  handlechangeerrortype = (selectedOptions) => {
       
    let value =selectedOptions.value
    this.setState({
      error_type : selectedOptions.value,
    })
      
  }  


  handlechangesubactivity = (selectedOptions) => {
       
    const {activity,errortypedata}=this.state
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
         this.setState({no_of_dps: e.target.value})
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
  handlechangeregion = (selectedOptions) => {
    let value=selectedOptions.value
    this.setState({
      region : selectedOptions.value,
      area:''
      })  
    
  } 
  handlechangearea = (selectedOptions) => {
    this.setState({
      area : selectedOptions.value,
      vessel_operator:''
      })  
      
  } 
  onChangedate(date)
  {
    this.setState({date  : date,
      week:getCurrentWeek(date)})
   
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
        const{date,error_classification,dp_voyage,no_of_dps,user,reported_by,dpvoyage_sensitivity,comments,source,week,area,region,vessel_operator,error_type,areaselectiondata,
            activityselectiondata,regiondata,vesseloperatordata,errortypedata,sourcedata,error_occurred,
            is_subactivity,is_submit,is_valid_date,loading}=this.state
        const {match,username,locale,languageData,receivetime_format} = this.props
        var errorclassification_data = [
            {
              "label": "Internal",
              "value": "internal"
            },
            {
              "label": "External",
              "value": "external"
            },
          ];
          var erroroccured_data = [
            {
              "label": "Update",
              "value": "update"
            },
            {
              "label": "Audit",
              "value": "audit"
            },
            {
                "label": "Creations",
                "value": "creations"
            },
          ];
        return (
            <>
            <title>{onChangeLanguage(locale,'Error Capture',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'Error Capture',languageData)} match={match} />
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
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Error Upload User',languageData)}
                            <br></br>{username}</Label>
                          
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Date',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <p1 className = 'fontstyle mandatory-label'>{is_submit === true && date === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                             <DatePicker
                                 selected={date}
                                 className = "text-background" 
                                 onChange={(date) => this.onChangedate(date)}
                                 />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Week',languageData)}
                            <br></br>{week}</Label>
                           
                        </div>
                        
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Error Classification',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && error_classification === ''?  "error-border-select-paste":"react-select fontstyle" }                          
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={errorclassification_data.filter(option =>option.value === error_classification)}
                            options={errorclassification_data}
                            onChange={({value}) => this.setState({  error_classification: value })}
                          />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Type',languageData)} <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                                className={is_submit === true && error_type === '' ? "error-border-select-paste" : "react-select fontstyle"}
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={errortypedata.filter(option => option.value === error_type)}
                                options={errortypedata}
                                onChange={({ value }) => {
                                    this.setState({ 
                                        error_type: value, 
                                        sensitivity: this.state.errorTypeSensitivityMap[value] 
                                    });
                                }}
                            />
                        </div>
                        {/* <div className = "col-lg-2-0 space-margin ">
                            <Label  className = "fontstyle normal-font" > 
                            {onChangeLanguage(locale,'Error Type',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                                <Select  
                                className = {is_submit === true && error_type === ''?  "error-border-select-paste":"react-select fontstyle" } 
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={errortypedata.filter(option =>option.value === error_type)}
                                options={errortypedata}
                                onChange={this.handlechangeerrortype}
                                // onChange={(option) => this.setState({  region: option.value })}
                             />
                        </div> */}
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Error Occurred While',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && error_occurred === ''?  "error-border-select-paste":"react-select fontstyle" }                          
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={erroroccured_data.filter(option =>option.value === error_occurred)}
                            options={erroroccured_data}
                            onChange={({value}) => this.setState({  error_occurred: value })}
                          />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Dp voyage number',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input 
                             className = {is_submit === true && dp_voyage === ''?  "error-border":"fontstyle text-background" }    
                            // placeholder = 'End date'
                            value = {dp_voyage}  
                            min="0"  step='1'
                            type="tel"
                            // onChange={this.handleChangedp}
                            onChange= {(e)=>this.setState({dp_voyage : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Number of DP voyage',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input 
                             className = {is_submit === true && no_of_dps === ''?  "error-border":"fontstyle text-background" }    
                            // placeholder = 'End date'
                            value = {no_of_dps}  
                            // onKeyDown={this.handleKeypress}
                            min="0"  step='1'
                            type="tel"
                            onChange={this.handleChangedp}
                            // onChange= {(e)=>this.setState({no_of_dps : e.target.value})} 
                            />
                        </div>
                        {/* <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'DP Voyage Sensitivity',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input 
                             className = {is_submit === true && dpvoyage_sensitivity === ''?  "error-border":"fontstyle text-background" }    
                            // placeholder = 'End date'
                            value = {dpvoyage_sensitivity}  
                            min="0"  step='1'
                            type="tel"
                            // onChange={this.handleChangedp}
                            onChange= {(e)=>this.setState({dpvoyage_sensitivity : e.target.value})} 
                            />
                        </div> */}
                         <div className = "col-lg-2-0 space-margin ">
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
                                // onChange={(option) => this.setState({  region: option.value })}
                             />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Error Captured User',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input 
                             className = {is_submit === true && user === ''?  "error-border":"fontstyle text-background" }    
                            // placeholder = 'End date'
                            value = {user} 
                            onChange= {(e)=>this.setState({user :  (e.target.value).toUpperCase()})} 
                            />
                        </div>
                        {/* <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Reported By',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input 
                             className = {is_submit === true && reported_by === ''?  "error-border":"fontstyle text-background" }    
                            // placeholder = 'End date'
                            value = {reported_by} 
                            onChange= {(e)=>this.setState({reported_by :  (e.target.value).toUpperCase()})} 
                            />
                        </div> */}
                         <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Comments',languageData)}
                            {/* <a style = {{color :'red'}}>*</a> */}
                            </Label>
                            {/* <Input  
                            className = {"fontstyle text-background" }    
                            // placeholder = 'End date'
                            value = {comments}  
                            onChange= {(e)=>this.setState({comments : e.target.value})} 
                            /> */}
                            <textarea className = "fontstyle textarea-background"  
                                value = {comments}  
                                onChange= {(e)=>this.setState({comments : e.target.value})}
                                 /> 
                        </div>
                        {/* <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Source',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && source === ''?  "error-border-select-paste":"react-select fontstyle" }                          
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={sourcedata.filter(option =>option.value === source)}
                            options={sourcedata}
                            onChange={({value}) => this.setState({  source: value })}
                          />
                        </div> */}
                        
                       
                        {/* <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Area Selection',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && area === ''?  "error-border-select-paste":"react-select fontstyle" }                          
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={areaselectiondata.filter(option =>option.value === area)}
                            options={getAreaValue(areaselectiondata,region)}
                            onChange={this.handlechangearea}
                            // onChange={({value}) => this.setState({  area: value })}
                          />
                        </div> */}
                        {/* <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Vessel Operator',languageData)} <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && vessel_operator === ''?  "error-border-select-paste":"react-select fontstyle" }                          
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={vesseloperatordata.filter(option =>option.value === vessel_operator)}
                            options={getVesselValue(vesseloperatordata,area,region)}
                            onChange={({value}) => this.setState({  vessel_operator: value })}
                          />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Type',languageData)} <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && error_type === ''?  "error-border-select-paste":"react-select fontstyle" }                          
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={errortypedata.filter(option =>option.value === error_type)}
                            options={errortypedata}
                            onChange={({value}) => this.setState({  error_type: value })}
                          />
                        </div> */}
                    </div>
                    <div className = "row text-center" style = {{margin:'0px 5px'}}> 
                   
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

