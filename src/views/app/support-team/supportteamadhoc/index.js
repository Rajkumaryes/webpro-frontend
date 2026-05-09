import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import DatePicker from "../../datePicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import {onChangeLanguage,permittedadmintl,convertLocalToUTCDate,convertUTCToLocalDate} from '../../../../helper'
import{roleService} from '../../../../redux/role/saga'
import{userService} from '../../../../redux/users/saga'
import{TaskDeliverService} from '../../../../redux/supportteam/taskdelivery/saga'
import{SupportteamService} from '../../../../redux/projectmasters/supportteammaster/saga'

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        date:'',
        user_id:'',
        adhoc_request_from:'',
        details:'',
        email_subject:'',
        timetaken:'',
        severity:'',
        team:'',
        team_data:[
          {label:'MIS',value:'1'},
          {label:'QSC',value:'2'},
        ],
        is_submit :false,
        isadmin:false,
        start_time:new Date(),
        updated_start_time:new Date(),
        user_data:[],
        adhocdate:''
      };
    }
    componentDidMount()
    {
      this.setState({
        adhocdate:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
        })
        this.fetchteam()
        this.fetchroleData()
        this.fetchuser()
    }
    fetchroleData() {  
      this.setState({
        loading : true
      })
      roleService.fetchroleData()
        .then((res) => { 
          this.setState({   
        loading : false 
                
          }) 
          if(res.status)
            {
              var role_id = localStorage.getItem("role_id")
              let is_admin =permittedadmintl(res.data,role_id)
             this.setState({
                 isadmin:is_admin
             })
            //  if(is_admin === true){
            //   this.setState({
            //     date:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
            // })
            //  }
            }            
      
      })
      .catch((error) => { 
        this.setState({
          loading : false
        })
        });   
   }
   fetchuser() {
    userService.fetchpermission_user('Support Team')
      .then((res) => {
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.is_active === 1)
               var list = filterstatus.map(function(cusmaidid) {
                    return  {label : cusmaidid.username ,value : cusmaidid.username};
                 });  
                  this.setState({
                  user_data:  list,
                  })
                 
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})
   }  
    fetchteam() {
        this.setState({loading:true})
        SupportteamService.fetchsupportteam()
        .then((res) => {
            this.setState({loading:false})
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var teamlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                   }); 
                    this.setState({
                        team_data :  teamlist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
     }  
     fetchData() {
      const {user_id,date} = this.state 
      if(user_id !== "" && date !=='' )
      {
        let date1=moment(convertUTCToLocalDate(date)).format('MM/DD/YYYY hh:mm:ss a')
          this.setState({
              loading : true,
              is_submit:false
          })
          TaskDeliverService.fetchIndividualtaskdelivery(user_id,date1)
          .then((res) => {
             
              this.setState({loading:false})
              this.clearValue()
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
        createNotification('Please Enter User ID and Date','error','filled')
      }
    }
    onSubmit()
    {
        const {date,adhoc_request_from,details,email_subject,timetaken,
            severity,team,isadmin,start_time,updated_start_time,user_id,adhocdate} = this.state
            const {username} = this.props
            var is_fill = false
            var userid =''
            var date_n =''
            if(isadmin === true)
            {
                if(date !== "" && adhoc_request_from !== "" && details !== "" && email_subject !== "" && timetaken !== "" && 
                severity !== "" && team !== "")
                {
                    is_fill = true
                    userid = user_id
                    date_n =moment(convertUTCToLocalDate(date)).format('MM/DD/YYYY hh:mm:ss a')
                }
            }
            else
            {
                if(
                   adhoc_request_from !== "" && details !== "" && email_subject !== "" && 
                 team !== "")
                {
                    is_fill = true
                    userid = username
                    date_n =adhocdate
                }
            }
            if(is_fill === true)
            {
                this.setState({
                    loading : true
                  })
                  let start_date=convertLocalToUTCDate(start_time),
                   end_date=convertLocalToUTCDate(new Date()),
                   updated_end_time=convertLocalToUTCDate(new Date()),
                   updatedstart_date=convertLocalToUTCDate(start_time)
                  
                  TaskDeliverService.createtaskdelivery(userid,date_n,adhoc_request_from,details,email_subject,timetaken,
                    severity,team,start_date,end_date,updatedstart_date,updated_end_time)
                    .then((res) => { 
                      this.setState({   
                        loading : false     
                      }) 
                      if(res.status)
                        {
                          createNotification('Created','success','filled')
                          this.setState({
                            date:'',
                            user_id:'',
                            adhocdate:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
                            adhoc_request_from:'',
                            details:'',
                            email_subject:'',
                            timetaken:'',
                            severity:'',
                            team:'',
                            is_submit :false,
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
    setValue(record)
{
   
   if(record !== null && record)
   {
      this.setState({
        date:convertLocalToUTCDate(record.date),
        adhocdate:convertLocalToUTCDate(record.date),
        adhoc_request_from:record.adhoc_request,
        details:record.details,
        email_subject:record.email_subject,
        timetaken:record.time_taken,
        severity:record.severity,
        team:record.team,
        user_id:record.user_id
       })
       console.log(new Date().toString())
   }

} 
    clearValue()
    {
        this.setState({
            date:'',
            adhocdate:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
            user_id:'',
            adhoc_request_from:'',
            details:'',
            email_subject:'',
            timetaken:'',
            severity:'',
            team:'',
            is_submit :false,
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
    onChangefrom(date)
    {
      let date1=moment(convertUTCToLocalDate(date)).format('MM/DD/YYYY hh:mm:ss a')
      this.setState({date  : date})
    }
    render()
    {
        const {match,locale,languageData,username} = this.props
        const {date,adhoc_request_from,details,email_subject,timetaken,adhocdate,
            severity,team,team_data,is_submit,loading,isadmin,user_data,user_id} = this.state
        return (
            <>
            <title>{onChangeLanguage(locale,'Task Delievered',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'Task Delievered',languageData)} match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'15px'}}>
                    <div className = "row" style = {{}}>
                    {isadmin !== true &&
                    <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'User ID',languageData)}
                            <br></br> 
                            {username}
                            </Label>
                            
                        </div>
                     }
                       {isadmin === true && <div className = "col-md-3 space-margin">
                       <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'User ID',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                        <Select  
                              className={is_submit === true && user_id === ''?  "error-border-select":"react-select fontstyle"}
                              classNamePrefix="react-select"
                              name="form-field-name"
                              value={user_data.filter(option =>option.value === user_id)}
                              options={user_data}
                              onChange={({value}) => this.setState({  user_id: value })}
                              />
                        </div>
                      }
                        {isadmin !== true &&
                    <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Date',languageData)}
                            <br></br> 
                            {adhocdate}</Label>
                        </div>
                     }
                     {isadmin === true &&
                     <div className = "col-md-3 space-margin">
                     <Label  className = "fontstyle normal-font" >
                    {onChangeLanguage(locale,'Date',languageData)}</Label>
                    <DatePicker
                                 selected={date}
                                 className = "text-background" 
                                 onChange={(date) => this.onChangefrom(date)}
                                 />
                     </div>
                    }
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'ADHOC Request From',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && adhoc_request_from === ''?  "error-border":"fontstyle text-background" } 
                                value = {adhoc_request_from} 
                                onChange={(e) => this.setState({adhoc_request_from  : e.target.value})}
                                
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Details',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && details === ''?  "error-border":"fontstyle text-background" } 
                                value = {details} 
                                onChange={(e) => this.setState({details  : e.target.value})}
                                
                            />

                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Email Subject',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && email_subject === ''?  "error-border":"fontstyle text-background" }  
                            placeholder = ''
                            value = {email_subject}  
                            onChange= {(e)=>this.setState({email_subject : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Severity',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && severity === ''?  "error-border":"fontstyle text-background" } 
                            placeholder = ''
                            type="number"
                            min="0"  step='1'
                            onKeyDown={this.handleKeypress}
                            value = {severity}  
                            onChange= {(e)=>this.setState({severity : e.target.value})} 
                            />
                        </div>
                     
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Time Taken',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && timetaken === ''?  "error-border":"fontstyle text-background" }   
                            placeholder = ''
                            type="number"
                            min="0"  step='1'
                            onKeyDown={this.handleKeypress}
                            value = {timetaken}  
                            onChange= {(e)=>this.setState({timetaken : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Team',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select  className={is_submit === true && team === ''?  "error-border-select":"react-select fontstyle" }
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={team_data.filter(option =>option.value === team)}
                                options={team_data}
                                onChange={(option) => this.setState({  team: option.value })}
                            />
                            
                        </div>
                        <div className = "row text-center" >
                        <Button className = "button-width" color="primary"  
                                onClick={()=>this.onSubmit()}
                                >{onChangeLanguage(locale,'Save',languageData)} </Button> 
                        <Button className = "button-width" color="secondary"  
                                onClick={()=>this.clearValue()}
                                >{onChangeLanguage(locale,'Refresh',languageData)} </Button> 
                         {isadmin == true &&
                        <Button className = "button-width" color="secondary" 
                                onClick={()=>this.fetchData()}
                                >{onChangeLanguage(locale,'Find',languageData)} </Button> 
                                }   
                        </div>
                       </div>
                    {/* <div className = "row text-center" style = {{margin:'0px 5px'}}>
                       <div className = "col-md-3"></div>
                         <div className = "col-md-2">
                          <Button className = "button-width" color="primary"  style={{width:'150px'}}
                                onClick={()=>this.onSubmit()}
                                >{onChangeLanguage(locale,'Save',languageData)} </Button> 
                         </div>
                         <div className = "col-md-2">
                          <Button className = "button-width" color="secondary"  style={{width:'150px'}}
                                onClick={()=>this.clearValue()}
                                >{onChangeLanguage(locale,'Refresh',languageData)} </Button> 
                         </div>
                         {isadmin == true &&
                         <div className = "col-md-2">
                          <Button className = "button-width" color="secondary"  style={{width:'150px'}}
                                onClick={()=>this.fetchData()}
                                >{onChangeLanguage(locale,'Find',languageData)} </Button> 
                         </div>
                     }
                    </div> */}
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


