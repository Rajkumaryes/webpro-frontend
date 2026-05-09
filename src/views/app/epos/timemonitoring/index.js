import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import {onChangeLanguage,convertLocalToUTCDate} from '../../../../helper'
import moment from 'moment';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import {getValue_F3000} from '../../pasteData'
import * as clipboard from "clipboard-polyfill/text";
import{activitytimeService} from '../../../../redux/EPOS/activitytime/saga';
import{TimependingService} from '../../../../redux/EPOS/time_pending/saga';

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        container_number:'',
        start_date:'',
        end_date:'',
         activity:'',
        areadata:[],
        activitydata:[],
        is_search:false,
        is_submit :false,
        start_time:new Date(),
        updated_start_time:new Date(),
        timepending_arr:[]

            };
    }
    componentDidMount() {
            this.setEmptyarrvalue()
             this.fetchactivityapi()
    }

    setEmptyarrvalue()
    {
        this.setState({
          timepending_arr :[
            {
                container_number:'',
                type:'',
                related_date:'',
                related_time:'',
                location:'',
                total:'',
                user_id:'',
                shipment_no:'',
                missing_event:'',
                related_place:'',
                activity:'',
                r:'',
                state:'',
                seq:'',
                hl:'',
                actual_type:'',
                charge:'',
                related_p:'',
                related_event:'',
                exp_imp:'',
                trigger_p:'',
                trigger_event:'',
                trigger_location:'',
                trigger_place:'',
                trigger_date:'',
                trigger_time:'',
                trigger_shipment:'',
                retrieval_run:'',
                processing_date:'',
                processing_time:'',
                claimed_by:'',
                responsible:'',
                comment:'',
                changed_by:'',
                last_change:'',
                kind:'',
                uni_id:'',
            }
          ]
        })

    }
 
     fetchactivityapi() {
      this.setState({
        loading : true
      })
      activitytimeService.fetchactivitytime()
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
   fetchTTimePending() {
    const {container_number} = this.state
    if(container_number !== "")
    {
    this.setState({
      loading : true
    })
    this.clearValue()
    TimependingService.fetchtimeIndividual(container_number)
    .then((res) => {
        this.setState({loading:false})
            if(res.status)   
             { 
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
        createNotification('Please fill Container Number','error','filled')
    }
 }
 setValue(record)
 {
    if(record && record !== null)
    {
      var list = [
      {
        container_number:record.container_number,
        type:record.type,
        related_date:record.related_date,
        related_time:record.related_time,
        location:record.location,
        total:record.total,
        shipment_no:record.shipment_no,
        missing_event:record.missing_event,
        related_place:record.related_place,
        user_id:record.user_id,
        r:record.r,
        state:record.state,
        seq:record.seq,
        hl:record.hl,
        actual_type:record.actual_type,
        charge:record.charge,
        related_p:record.related_event,
        related_event:record.related_event,
        exp_imp:record.exp_imp,
        trigger_p:record.trigger_p,
        trigger_event:record.trigger_event,
        trigger_location:record.trigger_location,
        trigger_place:record.trigger_place,
        trigger_date:record.trigger_date,
        trigger_time:record.trigger_time,
        trigger_shipment:record.trigger_shipment,
        retrieval_run:record.retrieval_run,
        processing_date:record.processing_date,
        processing_time:record.processing_time,
        claimed_by:record.claimed_by,
        responsible:record.responsible,
        comment:record.comment,
        changed_by:record.changed_by,
        last_change:record.last_change,
        kind:record.kind,
        uni_id:record.uni_id,
      }
      ]
              this.setState({
            timepending_arr : list,
            container_number:record.container_number,
            activity:record.activity,
            // start_time:record.start_time,
            // end_time:record.end_time,
            // start_date:record.start_date,
            // end_date:record.end_date,
          
            
          })
    }
    
 }
   onPaste() 
   {
       clipboard.readText().then((text)=>{
           var time_arr = getValue_F3000(text)
           console.log("kjbkj " ,JSON.stringify(time_arr))
           if(time_arr.length > 0)
           {
             var record = time_arr[time_arr.length - 1]

                this.setState({
                    timepending_arr:time_arr,
                    container_number:record.container_number
                  })
            }

       })
   }
    onSubmit()
    {
        const {container_number,start_date,activity,timepending_arr,start_time,updated_start_time} = this.state
            let  startdate = moment(start_date).format('MM/DD/YYYY hh:mm:ss a'), end_date = moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
            var isfill = false
            if(timepending_arr.length > 0)
            {
              if(this.checkMandatoryvalue(timepending_arr) === true &&  activity !== "" )
              {
                isfill = true
              }
            }

            if(isfill)
            {

                this.setState({end_date:end_date,  })
                const {username} = this.props
                var list = []
                let end_date1=convertLocalToUTCDate(new Date()),
                start_date=convertLocalToUTCDate(start_time),
                updatedstarttime=convertLocalToUTCDate(updated_start_time),
                 updated_end_time=convertLocalToUTCDate(new Date())
                for(var i = 0 ; i <timepending_arr.length;i++)
                {
                  const record = {...timepending_arr[i]}
                  if(i === timepending_arr.length - 1)
              {
                record.container_number = container_number
              }
                  record.user_id = username
                  // record.start_date = start_date
                  record.end_date = end_date
                  record.start_time= start_date
                  record.end_time= end_date1
                  record.updated_start_time= updatedstarttime
                  record.updated_end_time= updated_end_time
                  record.activity = activity
                  list.push(record)
                }
                this.setState({
                    loading : true
                  })
                  TimependingService.createtimepending(list)
                    .then((res) => { 
                      this.setState({   
                        loading : false     
                      }) 
                      if(res.status)
                        {
                          createNotification('Created','success','filled')
                          this.setState({
                              container_number:'',
                              start_time:new Date(),
                              end_date:'',
                              activity:'',
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
       if( record.container_number !== "" || record.type !== "" || record.related_date !== "" || record.location !== "" || 
       record.shipment_no !== "" || record.missing_event !== "" || record.related_place !== "" || record.related_time !== "")
        {
          isfill = false;
          break;
        }
      }

      return isfill

    }
    clearValue()
    {
        this.setState({
            timepending_arr:[],
            container_number:'',
            start_time:new Date(),
            end_date:'',
            activity:'',
            is_submit :false,
        })
        this.setEmptyarrvalue()
    }
 
    render()
    {
        const {match,locale,languageData,username} = this.props
        const { start_time,end_date,timepending_arr,loading,
          container_number, activity,activitydata,is_submit,} = this.state
          var data = []
          var user_id = username
          if(timepending_arr && timepending_arr !== null)
          {
            if(timepending_arr.length > 0)
            {
              var record = timepending_arr[timepending_arr.length - 1]
              data.push(record)
              if(record.user_id && record.user_id !== '' && record.user_id  !== null)
              {
                user_id = record.user_id
              }
            }
           
          }

     
        return (
            <>
            <title>{ onChangeLanguage(locale,'Time Pending Monitoring',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={ onChangeLanguage(locale,'Time Pending Monitoring',languageData)} match={match} />
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
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Start Date',languageData)}
                            <br></br>{moment(start_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>

                       </div>
                       <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'End Date',languageData)}
                            <br></br>{end_date}</Label>                            
                        </div>
                      </div>

                      {data.map((value,index) =>
                        <div className = "row">
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Container Number',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && value.container_number === ''?  "error-border-paste":"fontstyle text-background-paste" }    
                            placeholder = ''
                            value = {container_number}
                            onChange= {(e)=>this.setState({container_number : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Type',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && value.type === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                            placeholder = ''
                            value = {value.type}  
                            disabled = {true}
                         
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Related Date',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && value.related_date === ''?  "error-border-paste":"fontstyle text-background-paste" }
                             placeholder = 'MM/DD/YYYY'
                                value = {value.related_date} 
                                disabled = {true} 
                                ></Input>
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Related Time',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && value.container_number === ''?  "error-border-paste":"fontstyle text-background-paste" }
                            placeholder = ''
                                value = {value.related_time} 
                                disabled = {true} 
                                 ></Input>
                        </div>
                       
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Location',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && value.location === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                            placeholder = ''
                            value = {value.location}  
                            disabled = {true}
                           
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Total',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && value.total === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                            placeholder = ''
                            value = {value.total} 
                            disabled = {true} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Shipment Number',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && value.shipment_no === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                            placeholder = ''
                            value = {value.shipment_no}
                            disabled = {true}  
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Missing Event',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && value.missing_event === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                            placeholder = ''
                            value = {value.missing_event}
                            disabled = {true}  
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Related Place',languageData)}</Label>
                            <Input  className = {is_submit === true && value.related_place === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                            placeholder = ''
                            value = {value.related_place}
                            disabled = {true}  
                            />
                        </div>
                        {/* <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Area',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select  
                             style={{height:'85px'}}
                             className={is_submit === true && area === ''?  "error-border-select":"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={areadata.filter(option =>option.value === area)}
                            options={areadata}
                            onChange={(option)=>this.setState({area:option.value})}
                        />
                        </div> */}
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Activity',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select  
                             style={{height:'85px'}}
                             className={is_submit === true && activity === ''?  "error-border-select":"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={activitydata.filter(option =>option.value === activity)}
                            options={activitydata}
                            onChange={(option)=>this.setState({activity:option.value})}
                        />
                        </div>
                        
                        
                    </div>
                      )}
                    <div className = "row text-center" >                      
                          <Button className = "button-width" color="secondary"  
                                onClick={()=>this.onPaste()}
                                >{ onChangeLanguage(locale,'Paste',languageData)}</Button>                        
                          <Button className = "button-width" color="primary"
                                onClick={()=>this.onSubmit()}
                                >{ onChangeLanguage(locale,'Save',languageData)} </Button>                         
                          <Button className = "button-width" color="primary" 
                                onClick={()=>this.fetchTTimePending()}
                                >{ onChangeLanguage(locale,'Find',languageData)} </Button>                        
                             <Button className = "button-width" color="secondary" 
                                    onClick={()=>this.clearValue()}
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

