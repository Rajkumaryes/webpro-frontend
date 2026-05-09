import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
// import { Checkbox, Popconfirm ,Tooltip } from 'antd';
import Select from 'react-select';
import DatePicker from "../../datePicker";
import "react-datepicker/dist/react-datepicker.css";
import { createNotification } from '../../../../toast';
import{ErrorCaptureService} from '../../../../redux/MIS/errorcapture/saga'
import {onChangeLanguage,convertLocalToUTCDate} from '../../../../helper'
import Loading from "react-fullscreen-loading";
import moment from 'moment';
import{areaService} from '../../../../redux/projectmasters/area/saga'
import{misteamService} from '../../../../redux/projectmasters/misteam/saga'
import{containertypeService} from '../../../../redux/dgtt/containertype/saga'
class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        date:'',
        errorreportedby:'',
        details:'',
        report:'',
        userid:'',
        emailsubject:'',
        team:'',
        teamdata:[],
        loading:false,
        is_submit:false,
        start_time:new Date(),
        updated_start_time:new Date(),
      };
    }
    componentDidMount() {
       
      this.setState({
          date:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
      })
    this.fetchteam()
  }
  fetchteam() {
    this.setState({loading:true})
    misteamService.fetchmisteam()
    .then((res) => {
        this.setState({loading:false})
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var teamlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
               }); 
                this.setState({
                    teamdata :  teamlist,
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
 }  
  fetcharea() {
    this.setState({loading:true})
    areaService.fetcharea()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.area_name ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                errorreportedbydata :  regionlist
                })
               
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})
 }  
 

clearvalue()
     {
       
         this.setState({
            date:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
            errorreportedby:'',
            details:'',
            report:'',
            userid:'',
            emailsubject:'',
            team:'',
            is_submit:false,
           
         })
     } 
    handleteam = (selectedOptions) => {
        this.setState({team : selectedOptions.value})  
    } 
   
    onSubmit() { 
        const {date,errorreportedby,details,report,userid,emailsubject,team,start_time,updated_start_time} = this.state;
            if(userid!=='' &&date !==''&&errorreportedby !=='' &&details !=='' && report !=='' && emailsubject !=='' && team !=='' )
            { 
              const {username} = this.props
              this.setState({
                userid:username
              })
              let start_date=convertLocalToUTCDate(start_time),
                  end_date=convertLocalToUTCDate(new Date()),
                  updatedstart_time=convertLocalToUTCDate(start_time),
                  updated_end_time=convertLocalToUTCDate(new Date())
            this.createAPI(date,errorreportedby,details,report,userid,emailsubject,team,
              start_date,end_date,updatedstart_time,updated_end_time)
            }
            else
            {
              this.setState({
                is_submit:true
            })
            createNotification('Please fill mandatory field','error','filled')
            }
      }
      createAPI(date,errorreportedby,details,report,username,emailsubject,team,start_date,end_date,updated_start_time,updated_end_time)
        {
            this.setState({
            loading : true
            })
            ErrorCaptureService.createerrorcapture(date,errorreportedby,details,report,username,emailsubject,team,start_date,end_date,updated_start_time,updated_end_time)
          .then((res) => { 
            this.setState({   
              loading : false     
            }) 
            if(res.status)
              {
                createNotification('Created','success','filled')
                this.setState({
                  date:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
                  errorreportedby:'',
                  details:'',
                  report:'',
                  userid:'',
                  emailsubject:'',
                  team:'',
                  is_submit:false,
                 
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
    onChangetime(date)
  {
    console.log("lhnkjh " ,date)
    var time = moment(date).format('HH:mm:ss')
    if(time !== "00:00:00")
    {
      this.setState({
        mailrecevieddate  : date,
        
      })
      console.log("lhnkjh " ,date)
    }
   
  } 
  onChangeannouncement(date)
  {
    console.log("lhnkjh " ,date)
    var time = moment(date).format('HH:mm:ss')
    if(time !== "00:00:00")
    {
      this.setState({
        announcement  : date,
      })
    }
   
  } 
  
    render()
    {
        const {match,languageData,locale,username} = this.props
        const {userid,details,emailsubject,report,date,errorreportedby,team,teamdata,loading,is_submit} = this.state
        return (
            <>
            <title>{onChangeLanguage(locale,'Error Capture',languageData)}</title>
            {loading && 
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'Error Capture',languageData)} match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'15px'}}>
                    <div className = "row" style = {{padding:'10px'}}>
                   
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'User ID',languageData)}
                            <a style = {{color :'red'}}>*</a> </Label>
                            <Input  
                            className = {is_submit === true && userid === ''?  "error-border":"fontstyle text-background" }   
                            
                            placeholder = ''
                            value = {userid}  
                            onChange= {(e)=>this.setState({userid : (e.target.value).toUpperCase()})}
                            />
                            
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Date',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                           <Input  
                            className = {is_submit === true && date === ''?  "error-border":"fontstyle text-background" }   
                            data-date-format='mm/dd/yy'
                            type="date"  
                            placeholder = ''
                            value = {date}  
                            onChange= {(e)=>this.setState({date : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Reported By',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && errorreportedby === ''?  "error-border":"fontstyle text-background" }   
                            placeholder = ''
                            value = {errorreportedby}  
                            onChange= {(e)=>this.setState({errorreportedby : e.target.value})} 
                            />
                        </div>
                        
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Details',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && details === ''?  "error-border":"fontstyle text-background" }   
                            placeholder = ''
                            value = {details}  
                            onChange= {(e)=>this.setState({details : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Report',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && report === ''?  "error-border":"fontstyle text-background" }   
                            placeholder = ''
                            value = {report}  
                            onChange= {(e)=>this.setState({report : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Email Subject',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && emailsubject === ''?  "error-border":"fontstyle text-background" }   
                            placeholder = ''
                            value = {emailsubject}  
                            onChange= {(e)=>this.setState({emailsubject : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Team',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select 
                            className = {is_submit === true && team === ''?  "error-border-select-paste":"react-select fontstyle" }  
                             style={{height:'85px'}}
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={teamdata.filter(option =>option.value === team)}
                            options={teamdata}
                            onChange={this.handleteam}
                            />
                        </div>
                    </div>
                    <div className = "row text-center" style = {{margin:'0px 5px'}}>
                          <Button className = "button-width" color="primary"  style={{width:'150px'}}
                                 onClick={()=>this.onSubmit()}
                                >{onChangeLanguage(locale,'Save',languageData)} </Button> 
                             <Button className = "button-width" color="secondary" style={{width:'150px'}} 
                                    onClick={()=>this.clearvalue()}
                           >{onChangeLanguage(locale,'Refresh',languageData)}</Button>
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

