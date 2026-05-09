import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import moment from 'moment';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import {onChangeLanguage,getCurrentWeek,convertLocalToUTCDate,convertUTCToLocalDate} from '../../../../helper'
import DatePicker from "../../datePicker";
import{userService} from '../../../../redux/users/saga'
import{errortypeService} from '../../../../redux/vesselchartering/errortype/saga'
import{errorsheetService} from '../../../../redux/vesselchartering/errorsheet/saga'

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        email_datetime:'',
        sensitivity :'',
        error_description :'',
        user_id :'',
        week_no :'',
        email_datetime :'',
        error_type : '',
        start_time:new Date(),
        updated_start_time:new Date(),
        is_submit:false,
        error_data: [],
        user_data:[],

      };
    }
    componentDidMount() {

        this.fetchErrorData()
        this.fetchuserData()
     }
   
    fetchErrorData() {  
        this.setState({
          loading : true
        })
        errortypeService.fetcherrortype()
          .then((res) => { 
            this.setState({   
          loading : false 
                  
            }) 
            if(res.status)
              {
                let filterstatus = (res.data).filter(item => item.status === 1)
                var list = filterstatus.map(function(areaaval) {
                     return  {label : areaaval.name ,value : (areaaval.id).toString()};
                  });  
                   this.setState({
                       error_data :  list,
                   })
              }              
        
        })
        .catch((error) => { 
          this.setState({
            loading : false
          })
          });   
     }
    fetchuserData() {  
        this.setState({
          loading : true
        })
        userService.fetchpermission_user('Vessel Chartering')
          .then((res) => { 
            this.setState({   
          loading : false 
                  
            }) 
            if(res.status)
              {
                let filterstatus = (res.data).filter(item => item.is_active === 1)
                 var list = filterstatus.map(function(areaaval) {
                      return  {label : areaaval.username ,value : areaaval.username};
                   });  
                    this.setState({
                        user_data :  list,
                    })
              }            
        
        })
        .catch((error) => { 
          this.setState({
            loading : false
          })
          });   
     }
    onSubmit()
    {
        const {email_datetime ,sensitivity,week_no  ,user_id ,error_type,error_description,
            start_time,updated_start_time} = this.state
        if(email_datetime !== '' && sensitivity !== '' && week_no !== '' && user_id !== ''
        && error_type !== '' && error_description !== '')
        {
            var end_time = new Date(),updated_end_time = new Date()
            var email_datetimes = moment(convertUTCToLocalDate(email_datetime)).format('MM/DD/YYYY hh:mm:ss a')
            
            this.setState({
                loading : true
            })
            errorsheetService.createerrorsheet(sensitivity,week_no  ,user_id ,error_type,error_description,email_datetimes,  
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
                    email_datetime:'',
                    sensitivity :'',
                    error_description :'',
                    user_id :'',
                    week_no :'',
                    email_datetime :'',
                    error_type : '',
                    start_time:new Date(),
                    updated_start_time:new Date(),
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
    clearValue()
    {
        this.setState({
            email_datetime:'',
            sensitivity :'',
            error_description :'',
            user_id :'',
            week_no :'',
            email_datetime :'',
            error_type : '',
            start_time:new Date(),
            updated_start_time:new Date(),
            is_submit:false,
        })
    }
    
   
    render()
    {
        const {match,locale,languageData,username} = this.props
        const {email_datetime ,user_data,sensitivity,week_no  ,user_id ,
            error_type,error_data,error_description,is_submit,loading} = this.state
        return (
            <>
            <title>{onChangeLanguage(locale,"Error Sheet",languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,"Error Sheet",languageData)} match={match} />
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
                    <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Email Date/Time',languageData)}
                            {(is_submit === true && email_datetime === '') &&  <a className = 'fontstyle mandatory-label'>{ `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>}</Label>
                             <DatePicker
                                selected={email_datetime }
                                onChange={(date) => this.setState({email_datetime   : date})}
                              />
                        </div>
                        
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'User ID',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select  className={is_submit === true && user_id === ''?  "error-border-select":"react-select fontstyle" }
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={user_data.filter(option =>option.value === user_id )}
                                options={user_data}
                                onChange={({value}) => this.setState({  user_id : value })}
                             />

                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Week',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input   className = {is_submit === true && week_no === ''?  "error-border":"fontstyle text-background" } 
                            placeholder = ''
                            type= 'number'
                            value = {week_no}  
                            onChange= {(e)=>this.setState({week_no  : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Sensitivity',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input   className = {is_submit === true && sensitivity === ''?  "error-border":"fontstyle text-background" } 
                            placeholder = ''
                            value = {sensitivity }  
                            onChange= {(e)=>this.setState({sensitivity  : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-6 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Type',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select  className={is_submit === true && error_type === ''?  "error-border-select":"react-select fontstyle" }
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={error_data.filter(option =>option.value === error_type)}
                                options={error_data}
                                onChange={(option)=>this.setState({error_type :option.value})}
                            />
                            
                        </div>
                        
                        <div className = "col-md-6 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Description',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input
                                 className = {is_submit === true && error_description === ''?  "error-border":"fontstyle text-background" }
                                value = {error_description } 
                                onChange={(e) => this.setState({error_description   : e.target.value})}
                                
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

