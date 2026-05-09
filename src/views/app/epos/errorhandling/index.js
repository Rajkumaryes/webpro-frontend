import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import{eposactivityService} from '../../../../redux/EPOS/eposactivity/saga';
import{ErrorhandlingService} from '../../../../redux/EPOS/error_handling/saga';
import moment from 'moment';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import {onChangeLanguage,convertLocalToUTCDate} from '../../../../helper'
import {getValue_E3100} from '../../pasteData'
import * as clipboard from "clipboard-polyfill/text";

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        equipment_number:'',
        activity_type:'',
        activitydata:[],
        is_submit :false,
        start_time:new Date(),
        end_time:'',
        q:'',
        issue_level:'',
        state:'',
        creation_date:'', 
        creation_time:'', 
        changed_by: '', 
        claimed_at:'', 
        claimed_by:'',
        updated_start_time:new Date(),
        error_productivity_arr:[]
      };
    }

    componentDidMount() {
       this.setEmptyarrvalue()
       this.fetchactivityapi()
    }

    setEmptyarrvalue()
    {
        this.setState({
          error_productivity_arr :[
            {
              equipment_number:'',
              events:'',
              events_date:'',
              place_of_act:'',
              total:'',
              user_id:'',
              reference:'',
              issue_code:'',
              reported_by:'',
              activity_type:'',
              q:'',
              issue_level:'',
              state:'',
              creation_date:'', 
              creation_time:'', 
              changed_by: '', 
              claimed_at:'', 
              claimed_by:'',
            }
          ]
        })

    }
   
     fetchactivityapi() {
      this.setState({
        loading : true
      })
      eposactivityService.fetchactivityepos()
      .then((res) => {
          this.setState({loading:false})
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var list = filterstatus.map(function(areaaval) {
                    return  {label : areaaval.name ,value : (areaaval.id).toString()};
                 });  
                  this.setState({
                  activitydata :  list,
                  })
               }
              
               })
               .catch((error) => { 
                  this.setState({
                      loading : false
                    })
               }); 
   }

   fetcherrorhandling() {
    const {equipment_number} = this.state
    if(equipment_number !== "")
    {
      this.setState({
        loading : true
      })
      this.claerValue()
      ErrorhandlingService.fetcherrorhandlingsearch(equipment_number)
      .then((res) => {
          this.setState({loading:false})
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
        createNotification('Please fill Equipment Number','error','filled')
      }
     
 }
  setValue(record)
  {
    if(record && record !== null)
    {
      var list = [
        {
          equipment_number:record.equipment_number,
          events:record.events,
          events_date:record.events_date,
          place_of_act:record.place_of_act,
          total:record.total,
          user_id:record.user_id,
          reference:record.reference,
          issue_code:record.issue_code,
          reported_by:record.reported_by,
          activity_type:record.activity_type,
          q:record.q,
          issue_level:record.issue_level,
          state:record.state,
          creation_date:record.creation_date, 
          creation_time:record.creation_time, 
          changed_by: record.changed_by, 
          claimed_at:record.claimed_at, 
          claimed_by:record.claimed_by,
        }
      ]
      this.setState({
        error_productivity_arr : list,
        equipment_number:record.equipment_number,
        activity_type:record.activity_type,
        // start_time:record.start_time,
        // end_time:record.end_time,
      })
    }
  }

     onSubmit() { 
        const {equipment_number, activity_type,error_productivity_arr,start_time,updated_start_time,} = this.state;
           
        var isfill = false
        if(error_productivity_arr.length > 0)
        {
          if(this.checkMandatoryvalue(error_productivity_arr) === true && activity_type !== "")
          {
            isfill = true
          }
        }
         if(isfill === true)
        {    
            const end_times = new Date()
            this.setState({end_time:end_times,  })    
            var list = []
            let end_time=convertLocalToUTCDate(end_times),
            start_date=convertLocalToUTCDate(start_time),
            updatedstarttime=convertLocalToUTCDate(updated_start_time),
            updated_end_time=convertLocalToUTCDate(new Date())
            const {username} = this.props
            for(var i = 0 ; i <error_productivity_arr.length;i++)
            {
              const record = {...error_productivity_arr[i]}
              if(i === error_productivity_arr.length - 1)
              {
                record.equipment_number = equipment_number
              }
              record.user_id = username
              record.start_time = start_date
              record.end_time = end_time
              record.updated_start_time= updatedstarttime
              record.updated_end_time= updated_end_time
              record.activity_type = activity_type
              list.push(record)
            }
            this.setState({
                loading : true
              })
              ErrorhandlingService.createerrorhandlingMultiple(list)
                .then((res) => { 
                  this.setState({   
                    loading : false     
                  }) 
                  if(res.status)
                    {
                      createNotification('Created','success','filled')
                      this.setState({
                        start_time:new Date(),
                        end_time:'',
                        equipment_number:'',
                        activity_type:'',
                        is_submit :false,
                       })
                       this.setEmptyarrvalue()
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

      checkMandatoryvalue(productivity_arr)
      {
        var isfill = true
        for(var i = 0 ; i <productivity_arr;i++)
        {
          const record = productivity_arr[i]
         if( record.equipment_number === "" || record.events_date === "" || 
           record.events === "" ||  record.place_of_act === "" || record.reference === "" || record.issue_code === "" || 
          record.reported_by === "")
          {
            isfill = false;
            break;
          }
        }

        return isfill

      }

      async onPasteE3100() {
        clipboard.readText().then((text)=>{
         var productivity_arr = getValue_E3100(text)
        console.log("kjbkj " , JSON.stringify(productivity_arr))
        if(productivity_arr.length > 0)
        {
            var record = productivity_arr[productivity_arr.length - 1]
            this.setState({
              error_productivity_arr:productivity_arr,
              equipment_number:record.equipment_number
          })
        }
       
      });
      
    }
   claerValue()
   {
     this.setState({
      start_time:new Date(),
      end_time:'',
      equipment_number:'',
      activity_type:'',
      is_submit :false,
     })
     this.setEmptyarrvalue()
   }

 
   
    render()
    {
        const {match,locale,languageData,username} = this.props
        const { start_time,end_time,error_productivity_arr,loading,
          equipment_number, activity_type,activitydata,is_submit,} = this.state
        var data = []
        var user_id = username
        if(error_productivity_arr && error_productivity_arr !== null)
        {
          if(error_productivity_arr.length > 0)
          {
            var record = error_productivity_arr[error_productivity_arr.length - 1]
            data.push(record)
            if(record.user_id && record.user_id !== '' && record.user_id  !== null)
            {
              user_id = record.user_id
            }
          }
         
        }
        return (
            <>
            <title>{onChangeLanguage(locale,'Error Handling Productivity',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'Error Handling Productivity',languageData)} match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px'}}>
                    <div className = "row" style = {{marginBottom:'10px'}}>
                    <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'User ID',languageData)}
                            <br></br>{user_id}</Label>
                            
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Start Date / Time',languageData)}
                            <br></br> 
                            {moment(start_time).format('MM/DD/YYYY hh:mm:ss a')}
                            </Label>
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'End Date /  Time',languageData)}
                            <br></br>{end_time !== '' && moment(end_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                            
                        </div>
                        </div>
                        {data.map((value,index) =>
                        <div className = "row">
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Equipment Number',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && value.equipment_number === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                            placeholder = ''
                            value = {equipment_number}  
                            onChange= {(e)=>this.setState({equipment_number : e.target.value})} 
                            disabled = {true}
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Events',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && value.events === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                            placeholder = ''
                            value = {value.events} 
                            disabled = {true} 
                            
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Events Date /  Time',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && value.events_date === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                            placeholder = ''
                            value = {value.events_date} 
                            disabled = {true} 
                        
                            />
                        </div>
                        
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Place of Act',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && value.place_of_act === ''?  "error-border-paste":"fontstyle text-background-paste" } 
                            placeholder = ''
                            disabled = {true} 
                            value = {value.place_of_act}  
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Total',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && value.total === ''?  "error-border":"fontstyle text-background" } 
                            placeholder = ''
                            value = {value.total} 
                            disabled = {true} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Reference',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && value.reference === ''?  "error-border-paste":"fontstyle text-background-paste" } 
                            placeholder = ''
                            value = {value.reference}  
                            disabled = {true} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Issue Code',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && value.issue_code === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                            placeholder = ''
                            value = {value.issue_code} 
                            disabled = {true}  
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Reported By',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && value.reported_by === ''?  "error-border-paste":"fontstyle text-background-paste" }
                            placeholder = ''
                            value = {value.reported_by} 
                            disabled = {true}  
                            />
                        </div>
                       
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Activity Type',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select  
                             className={is_submit === true && activity_type === ''?  "error-border-select":"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={activitydata.filter(option =>option.value === activity_type)}
                            options={activitydata}
                            onChange={(option)=> this.setState({activity_type : option.value})  }
                            />
                        </div>
                       </div>
                        )}
                    <div className = "row text-center" >                       
                          <Button className = "button-width" color="secondary" 
                                onClick={()=>this.onPasteE3100()}
                                >{ onChangeLanguage(locale,'Paste',languageData)}</Button>                        
                          <Button className = "button-width" color="primary" 
                                 onClick={()=>this.onSubmit()}
                                >{ onChangeLanguage(locale,'Save',languageData)} </Button>                         
                          <Button className = "button-width" color="primary" 
                                onClick={()=>this.fetcherrorhandling()}
                                >{ onChangeLanguage(locale,'Find',languageData)} </Button>                          
                             <Button className = "button-width" color="secondary" 
                                    onClick={()=>this.claerValue()}
                           >{ onChangeLanguage(locale,'Refresh',languageData)}</Button>                      
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

