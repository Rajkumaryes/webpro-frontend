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
import{ErrorCaptureService} from '../../../../redux/supportteam/errorcapture/saga'
import {onChangeLanguage,convertLocalToUTCDate} from '../../../../helper'
import Loading from "react-fullscreen-loading";
import moment from 'moment';
import{SupportteamService} from '../../../../redux/projectmasters/supportteammaster/saga'
class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        date:'',
        error_reportedby:'',
        details:'',
        report:'',
        user_id:'',
        email_subject:'',
        team:'',
        start_date:'',
        teamdata:[],
        loading:false,
        is_submit:false,
        start_time:new Date(),
        updated_start_time:new Date()
      };
    }
    componentDidMount() {
      this.setState({
        start_date:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
    })
    this.fetchteam()
  }
  fetchteam() {
    this.setState({loading:true})
    SupportteamService.fetchsupportteam()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                teamdata :  regionlist
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
            date:'',
            error_reportedby:'',
            details:'',
            report:'',
            user_id:'',
            email_subject:'',
            team:'',
            is_submit:false,
           
         })
     } 
   
    handleteam = (selectedOptions) => {
        this.setState({team : selectedOptions.value})  
    } 
   
    onSubmit() { 
        const {date,error_reportedby,details,report,user_id,email_subject,team,updated_start_time} = this.state;
            
            if(date !=='' &&error_reportedby !=='' && details !=='' && report !=='' && 
            email_subject !=='' &&team !==''  )
            { 
              const end_datetime =  moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
              const {username} = this.props
              this.setState({
                userid:username
              })
              let end_date=convertLocalToUTCDate(new Date()),
              start_date=convertLocalToUTCDate(updated_start_time),
              updatedstarttime=convertLocalToUTCDate(updated_start_time),
              updated_end_time=convertLocalToUTCDate(new Date())
            this.createAPI(date,error_reportedby,details,report,user_id,email_subject,team,start_date,end_date,updatedstarttime,updated_end_time)
            }
            else
            {
              this.setState({
                is_submit:true
            })
            createNotification('Please fill mandatory field','error','filled')
            }
      }
      createAPI(date,error_reportedby,details,report,user_id,email_subject,team,start_date,end_date,updatedstarttime,updated_end_time)
        {
            this.setState({
            loading : true
            })
            ErrorCaptureService.createerrorcapture(date,error_reportedby,details,report,user_id,email_subject,team,start_date,end_date,updatedstarttime,updated_end_time)
          .then((res) => { 
            this.setState({   
              loading : false     
            }) 
            if(res.status)
              {
                createNotification('Created','success','filled')
                this.setState({
                  date:'',
                  error_reportedby:'',
                  details:'',
                  report:'',
                  user_id:'',
                  email_subject:'',
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
        const {match,languageData,locale,username} = this.props
        const {date,error_reportedby,details,report,user_id,email_subject,team,teamdata,loading,is_submit} = this.state
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
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row" style = {{marginBottom:'30px'}}>
                    <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'User ID',languageData)}
                            <a style = {{color :'red'}}>*</a>
                           </Label>
                            <Input  
                            className = {is_submit === true && user_id === ''?  "error-border":"fontstyle text-background" }  
                            placeholder = ''
                            value = {user_id}  
                            onChange= {(e)=>this.setState({user_id :  (e.target.value).toUpperCase()})} 
                            />
                            
                        </div>
                    <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Date',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && date === ''?  "error-border":"fontstyle text-background" }  
                            placeholder = ''
                            type="date"
                            data-date-format='MM/DD/YYYY'
                            value = {date}  
                            onChange= {(e)=>this.setState({date : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Reported By',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && error_reportedby === ''?  "error-border":"fontstyle text-background" }  
                            placeholder = ''
                            value = {error_reportedby}  
                            onChange= {(e)=>this.setState({error_reportedby :  (e.target.value).toUpperCase()})} 
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
                            value = {report}  
                            onChange= {(e)=>this.setState({report : e.target.value})} ></Input>
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Email Subject',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && email_subject === ''?  "error-border":"fontstyle text-background" }  
                            placeholder = ''
                            value = {email_subject}  
                            onChange= {(e)=>this.setState({email_subject : e.target.value})} 
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
                    <div className = "row text-center">                      
                          <Button className = "button-width" color="primary" 
                                 onClick={()=>this.onSubmit()}
                                >{onChangeLanguage(locale,'Save',languageData)} </Button>                      
                             <Button className = "button-width" color="secondary" 
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

