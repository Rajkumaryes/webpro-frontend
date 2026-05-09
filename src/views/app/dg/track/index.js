import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
// import { Checkbox, Popconfirm ,Tooltip } from 'antd';
import Select from 'react-select';
import DatePicker from "../datePicker";
import "react-datepicker/dist/react-datepicker.css";
import { createNotification } from '../../../../toast';
import{trackandtraceService} from '../../../../redux/trackandtrace/saga'
import {onChangeLanguage,convertLocalToUTCDate} from '../../../../helper'
import{RegionService} from '../../../../redux/dgtt/dgregiontracktrace/saga';
import{MisactivitytrackService}from '../../../../redux/dgtt/misactivity/saga'
import moment from 'moment';

import Loading from "react-fullscreen-loading";
class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user_id: '',
        regions:'',
        activity:'',
        remainders_email:'',
        startdate_time:'',
        enddate_time:'',
        start_time:new Date(),
        updated_start_time:new Date(),
        regiondata:[],
        activitydata:[],
        indexingdata:[
          {id:1,label:'Email' },
          {id:2,label:'Remainders' },
        ],
        indexing:'',
          is_submit:false,
          trackcount:'',
          trackcountlast:''
      };
    }
    componentDidMount() {
       
      this.setState({
        startdate_time:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
      })
    this.fetchregion()
    this.fetchactivity()
    this.fetchtrackcount()
  }
  fetchtrackcount(){
    this.setState({loading:true})
    const {username} = this.props
    // console.log(username)
    trackandtraceService.fetchtrackcount(username)
    .then((res) => {
       if(res.status)   { 
              let filterstatus = res.data;
              let lastdata = res.lastcount;
              this.setState({ 
                trackcount:filterstatus, 
                trackcountlast:lastdata     
              }) 
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})

}
  fetchactivity() {
    this.setState({loading:true})
    MisactivitytrackService.fetchmisactivity()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var activitylist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               });  
               var activity_list = filterstatus.map(function(cusmaidid) {
                return  {text : cusmaidid.name ,value : cusmaidid.id};
             });  
                this.setState({
                activitydata :  activitylist,
                activity_data :  activity_list,
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
    RegionService.fetchregion()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                regiondata :  regionlist
                })
               
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})
 }  
    onPaste() 
    {
        navigator.clipboard.readText().then((text)=>{
            console.log("lkbkjj" , text)
            console.log("lkbkjj" ,typeof text)
          
        })
    }
    onCopy()
    {
        navigator.clipboard.writeText(this.state.region)
    }
    handleregion = (selectedOptions) => {
        this.setState({regions : selectedOptions.value})  
    } 
    clearvalue()
    {
      
        this.setState({
           regions:'',
           activity:'',
           remainders_email:'',
           enddate_time:'',
           is_submit:false,
          
        })
    } 
    
    onSubmit() { 
        const { user_id,regions,activity,remainders_email,startdate_time,enddate_time,updated_start_time} = this.state;
        const end_datetime =  moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
        if(regions !=='' && activity !=='' &&remainders_email !=='' )
        { 
          const {username} = this.props
          let start_time =startdate_time,
          end_time=moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
          this.setState({
            userid:username,
            enddate_time:end_datetime
          })
          let end_date=convertLocalToUTCDate(new Date()),
                 start_date=convertLocalToUTCDate(updated_start_time),
                 updatedstarttime=convertLocalToUTCDate(updated_start_time),
                 updated_end_time=convertLocalToUTCDate(new Date())
        this.createAPI( username,regions,activity,remainders_email,startdate_time,end_datetime,start_date,end_date,updatedstarttime,updated_end_time)
        }
        else
        {
          this.setState({
            is_submit:true
        })
          createNotification('Please fill mandatory field','error','filled')
        }
      }
      createAPI(user_id,regions,activity,remainders_email,startdate_time,enddate_time,start_date,end_date,updatedstarttime,updated_end_time)
      {
        trackandtraceService.createtrackandtrace(user_id,regions,activity,remainders_email,startdate_time,enddate_time,start_date,end_date,updatedstarttime,updated_end_time)
          .then((res) => { 
            if(res.status)
              {
                createNotification('Created','success','filled')
                this.setState({
                  regions:'',
                  activity:'',
                  remainders_email:'',
                  enddate_time:'',
                  is_submit:false,
                 
               })
               this.fetchtrackcount()
              }   
              else
                {
                  createNotification(res.message,'error','filled');
                }           
        
        })
        .catch((error) => { 
        });
         
      }

    render()
    {
        const {match,locale,languageData,username} = this.props
        const {user_id,regions,activity,remainders_email,startdate_time,enddate_time,regiondata,indexing,indexingdata,is_submit,activitydata,trackcount,trackcountlast} = this.state
        return (
            <>
            <title>{onChangeLanguage(locale,'Track & trace',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                
                <div className="row">
                  <div className="col-md-8">
                  <Breadcrumb heading= {onChangeLanguage(locale,'Track & Trace',languageData)} match={match} />
                  </div>
                  <div className = "col-md-2" >
                  <h2 style = {{marginTop:'15px'}}>Total EQ : {trackcount}</h2>
                  </div>
                  <div className = "col-md-2">
                      <h2  style = {{marginTop:'15px'}}>Last EQ : {trackcountlast}</h2>
                  </div>
            </div>
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row" style = {{padding:'10px'}}>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'User ID',languageData)}<br></br>
                            {username}</Label>
                           
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'Start Date & Time',languageData)}
                            <br></br>{startdate_time}</Label>
                            
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'End Date & Time',languageData)}
                            <br></br>{enddate_time}</Label>
                            
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'Regions',languageData)}<a style = {{color :'red'}}>*</a> </Label>
                            <Select  
                             style={{height:'85px'}}
                             className = {is_submit === true && regions === ''?  "error-border-select-paste":"react-select fontstyle" } 
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={regiondata.filter(option =>option.value === regions)}
                            options={regiondata}
                            onChange={this.handleregion}
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'Activity',languageData)}<a style = {{color :'red'}}>*</a> </Label>
                            <Select  
                                    className = {is_submit === true && activity === ''?  "error-border-select-paste":"react-select fontstyle" } 
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={activitydata.filter(option =>option.value === activity)}
                                        options={activitydata}
                                        onChange={({value}) => this.setState({  activity: value })}
                                    />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'Reminders / E-mail',languageData)}<a style = {{color :'red'}}>*</a> </Label>
                            <Input  
                            className = {is_submit === true && remainders_email === ''?  "error-border":"fontstyle text-background" } 
                            placeholder = ''
                            type = "number" min="0" 
                            value = {remainders_email}  
                            onChange= {(e)=>this.setState({remainders_email : e.target.value})} 
                            />
                        </div>
                        
                    </div>
                    <div className = "row text-center" style = {{margin:'0px 5px'}}>
                          <Button className = "button-width" color="primary"  style={{width:'150px'}}
                                  onClick={()=>this.onSubmit()}
                                > {onChangeLanguage(locale,'Save',languageData)}</Button> 
                          <Button className = "button-width" color="secondary"  style={{width:'150px'}}
                                  onClick={()=>this.clearvalue()}
                                > {onChangeLanguage(locale,'Refresh',languageData)}</Button>
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

   })(QueryResolveSheet)
  );

