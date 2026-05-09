import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import{activitytypeService} from '../../../../redux/vesselchartering/activitytype_vessle/saga'
import{ownerexpenseService} from '../../../../redux/vesselchartering/ownersexpenses/saga'
import moment from 'moment';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import {onChangeLanguage,getCurrentWeek,getTimeDifference,convertLocalToUTCDate,convertUTCToLocalDate} from '../../../../helper'
import DatePicker from "../../datePicker";

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = 
      {
        loading:false,
        vessel_name:"",
        end_time:"",
        activity_type:"",
        user_id:"",
        email_datetime:"",
        week_no:"",
        tat_time:"",
        activity_data:[],
        is_submit:false,
        start_time:new Date(),
        updated_start_time:new Date(),
      };
    }
    componentDidMount() {
       this.setState({
           week_no:getCurrentWeek(new Date()).toString(),
       }) 
       this.fetchactivityapi()
    }
    fetchactivityapi() {
        this.setState({
          loading : true
        })
        activitytypeService.fetchactivitytype()
        .then((res) => {
            this.setState({loading:false})
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var list = filterstatus.map(function(areaaval) {
                      return  {label : areaaval.name ,value : (areaaval.id).toString()};
                   });  
                    this.setState({
                        activity_data :  list,
                    })
                 }
                
                 })
                 .catch((error) => { 
                    this.setState({
                        loading : false
                      })
                 }); 
     }
    handleactivitytype = (selectedOptions) => {
        this.setState({activity_type : selectedOptions.value})  
    } 
    clearValue()
    {
        this.setState({
            vessel_name:"",
            end_time:"",
            activity_type:"",
            user_id:"",
            email_datetime:"",
            start_time:new Date(),
            updated_start_time:new Date(),
            week_no:getCurrentWeek(new Date()).toString(),
            tat_time:"",
            is_submit:false,
        })
    }
    onSubmit()
    {
        const {vessel_name,start_time,updated_start_time,
            activity_type,week_no,email_datetime} = this.state
         
        if(vessel_name !== "" &&  activity_type!== "" && week_no!== "" && email_datetime !== "")
        {
           
                var end_time = new Date(),updated_end_time = new Date()
                var email_datetimes = moment(convertUTCToLocalDate(email_datetime)).format('MM/DD/YYYY hh:mm:ss a')
                var tat_time = getTimeDifference(email_datetime, convertLocalToUTCDate( end_time))
            
                this.setState({end_time:moment(end_time).format('MM/DD/YYYY hh:mm:ss a'),tat_time:tat_time  })
                const {username} = this.props
                this.setState({
                    loading : true
                })
                ownerexpenseService.createownerexpense(username,vessel_name,tat_time,
                activity_type,week_no,email_datetimes, 
                convertLocalToUTCDate(start_time),
                convertLocalToUTCDate( end_time),
                convertLocalToUTCDate( updated_start_time),
                convertLocalToUTCDate(updated_end_time))
                .then((res) => { 
                  this.setState({   
                    loading : false     
                  }) 
                  if(res.status)
                    {
                      createNotification('Created','success','filled')
                      this.setState({
                        vessel_name:"",
                        end_time:"",
                        activity_type:"",
                        user_id:"",
                        email_datetime:"",
                        start_time:new Date(),
                        updated_start_time:new Date(),
                        week_no:getCurrentWeek(new Date()).toString(),
                        tat_time:"",
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
        else
        {
          this.setState({
            is_submit:true
          })
          createNotification('Please fill mandatory field','error','filled')
        }

    }
    onChangetime(date)
    {
      this.setState({email_datetime  : date})
     
    }
    render()
    {
        const {match,locale,languageData,username} = this.props
        const {vessel_name,start_time,end_time,tat_time,
            activity_data,activity_type,loading,week_no,email_datetime,is_submit} = this.state
        return (
            <>
              <title>{onChangeLanguage(locale,'Owners Expenses',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'Owners Expenses',languageData)} match={match} />
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
                    <div className = "row" style = {{marginBottom:'30px'}}>
                    <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Start Date/Time',languageData)}
                            <br></br>{moment(start_time).format('MM/DD/YYYY hh:mm:ss a')}
                            </Label>
                          
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'End Date /Time',languageData)}
                            <br></br>{end_time}</Label>
                            
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'User ID',languageData)}
                            <br></br>{username}</Label>
                           
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'TAT',languageData)}
                            <br></br>{tat_time}</Label>
                          
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Week No',languageData)}
                            <br></br>{week_no}</Label>
                          
                        </div>
                       <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Vessel Name',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && vessel_name === ''?  "error-border":"fontstyle text-background" }
                                value = {vessel_name}  
                                onChange= {(e)=>this.setState({vessel_name : e.target.value})} ></Input>
                        </div>
                        
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Activity Type',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select   className={is_submit === true && activity_type === ''?  "error-border-select":"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={activity_data.filter(option =>option.value === activity_type)}
                            options={activity_data}
                            onChange={this.handleactivitytype}
                            />
                        </div>
                     
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Email Date /Time',languageData)}<a style = {{color :'red'}}>*</a>
                            {(is_submit === true && email_datetime === '') &&  <a className = 'fontstyle mandatory-label'>{ `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>}</Label>
                            <DatePicker
                              selected={email_datetime}
                              className = "text-background"
                              onChange={(date) => this.onChangetime(date)}
                              />
                            
                        </div>
                       
                    </div>
                    <div className = "row text-center">
                      
                      <Button className = "button-width" color="primary"  
                            onClick={()=>this.onSubmit()}
                            >{onChangeLanguage(locale,'Save',languageData)} </Button> 
                    
                      <Button className = "button-width" color="secondary"  
                            onClick={()=>this.clearValue()}
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

