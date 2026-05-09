import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { createNotification } from '../../../../toast';
import{dgerrorService} from '../../../../redux/dgtt/dgerror/saga'
import {onChangeLanguage,convertLocalToUTCDate,getCurrentWeek} from '../../../../helper'
import Select from 'react-select';
import{RegionService} from '../../../../redux/dgtt/dgerroregion/saga';
import moment from 'moment';
import CustomRadioButton from '../../../RadioButton'

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dg:'',
        track_trace:'',
        date:'',
        booking:'',
        total_cargo_email_booking_reminder:'',
        user:'',
        week_no:'',
        region:'',
        remark:'',
        regiondata:[ ],
        is_submit:false,
        start_time:new Date(),
        updated_start_time:new Date()
      };
    }
    componentDidMount() {
      
    this.fetchregion()
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
 clearvalue()
    {
      
        this.setState({
          // date:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
          date:'',
          dg:'',
          track_trace:'',
          booking:'',
          total_cargo_email_booking_reminder:'',
          user:'',
          week_no:'',
          region:'',
          remark:'',
           is_submit:false,
          
        })
    } 
    onPaste() 
    {
        navigator.clipboard.readText().then((text)=>{          
        })
    }
    onCopy()
    {
        navigator.clipboard.writeText(this.state.booking)
    }
   
    handleregion = (selectedOptions) => {
        this.setState({region : selectedOptions.value})  
    } 
    
    onSubmit() { 
        const {dg,track_trace,date,booking,total_cargo_email_booking_reminder,user,week_no,region,remark,updated_start_time} = this.state;
        var is_fill = false
        if(track_trace ==="DG")
        {
            if(booking !== "" && date !=='' && track_trace !=='' && total_cargo_email_booking_reminder !=='' &&
              user !=='' && region !=='' )
            {
                is_fill = true
            }
        }
        else
        {
            if(date !=='' && track_trace !=='' && total_cargo_email_booking_reminder !=='' &&
              user !=='' && region !=='' )
            {
                is_fill = true
            }
        }
        if(is_fill === true)
        {  
          const {username} = this.props
          let end_date=convertLocalToUTCDate(new Date()),
                 start_date=convertLocalToUTCDate(updated_start_time),
                 updatedstarttime=convertLocalToUTCDate(updated_start_time),
                 updated_end_time=convertLocalToUTCDate(new Date())
          this.createAPI(dg,track_trace,date,booking,total_cargo_email_booking_reminder,user,week_no,
            region,remark,start_date,end_date,updatedstarttime,updated_end_time,username)
         }
        else
        {
          this.setState({
            is_submit:true
        })
          createNotification('Please fill mandatory field','error','filled')
        }
      }
      createAPI(dg,track_trace,date,booking,total_cargo_email_booking_reminder,user,week_no,region,remark,start_date,end_date,updatedstarttime,updated_end_time,username)
      {
        dgerrorService.createdgerror(dg,track_trace,date,booking,total_cargo_email_booking_reminder,user,week_no,region,remark,start_date,end_date,updatedstarttime,updated_end_time,username)
          .then((res) => { 
            if(res.status)
              {
                createNotification('Created','success','filled')
                this.setState({
                  // date:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
                  date:'',
                  dg:'',
                  track_trace:'',
                  booking:'',
                  total_cargo_email_booking_reminder:'',
                  user:'',
                  week_no:'',
                  region:'',
                  remark:'',
                   is_submit:false,
                  
                })

              }            
         else
              {
                createNotification(res.message,'error','filled');
              } 
        })
        .catch((error) => { 
        });
         
      }
      onChangeaggregate(value)
      {
          this.setState({track_trace:value})
      }
      onChangeFileUpload(files)
      {
        this.setState({
          loading : true
        })
        dgerrorService.fileUpload(files[0])
          .then((res) => { 
            if(res.status)
            {
              if(res.data.status)   
              {   
             
                createNotification('Uploaded','success','filled')
                  this.fetchData()
              }    
            }
              
        
        })
        .catch((error) => { 
          this.setState({
            loading : false
          })
          });
      }
      handleChangeerrorreporteddate(e) {
        var date1 = new Date(e.target.value)
        var datenew=getCurrentWeek(date1).toString()
        this.setState({
          date:e.target.value,
          week_no:datenew,
        });
      
      }
    render()
    {
        const {match,locale,languageData} = this.props
        const {track_trace,date,booking,total_cargo_email_booking_reminder,user,
          week_no,region,remark,regiondata,is_submit} = this.state
        return (
            <>
           <title>{onChangeLanguage(locale,'Errors',languageData)}</title>
            <Row>
              <Colxx xxs="12">
              <div className = "row">
                      <div className = "col-md-10">
                      <Breadcrumb heading= {onChangeLanguage(locale,'Errors',languageData)} match={match} />
                    </div>
                    </div>
                <Separator className = "separator-margin"/>
              </Colxx>
             
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'15px'}}>
                <div className = "row" >
                        <div className = "col-md-2 space-margin"  >
                        <CustomRadioButton checked  = "DG" name = "DG" value = {track_trace} 
                                          onChangeRadio={this.onChangeaggregate.bind(this)}/>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                             <CustomRadioButton checked  = "Track&Trace" name = "Track&Trace" value = {track_trace} 
                                            onChangeRadio={this.onChangeaggregate.bind(this)}/>
                           
                        </div>
                        <p1 className = 'fontstyle mandatory-label'>{is_submit === true && track_trace === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                    </div>
                    <div className = "row" style = {{padding:'10px'}}>
                      <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Date',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && date === ''?  "error-border":"fontstyle text-background" }  
                            placeholder = ''
                            type="date"
                            value = {date}  
                            onChange={(e)=>this.handleChangeerrorreporteddate(e)}
                            // onChange= {(e)=>this.setState({date : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'Week No',languageData)}</Label>
                            <Input  
                            className = {is_submit === true && week_no === ''?  "error-border":"fontstyle text-background" } 
                            placeholder = ''
                            value = {week_no}
                            disabled  
                            onChange= {(e)=>this.setState({week_no : e.target.value})} 
                            />
                        </div>
                        {track_trace ==="DG" &&
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'Booking',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && booking === ''?  "error-border":"fontstyle text-background" }  
                            placeholder = ''
                            value = {booking}  
                            onChange= {(e)=>this.setState({booking : e.target.value})} 
                            />
                        </div>
                      }
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Total Cargo/E-mail/Booking/Reminder',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>

                            <Input 
                            className = {is_submit === true && total_cargo_email_booking_reminder === ''?  "error-border":"fontstyle text-background" }   
                            placeholder = ''
                            type = "number" min="0" 
                            value = {total_cargo_email_booking_reminder}  
                            onChange= {(e)=>this.setState({total_cargo_email_booking_reminder : e.target.value})} 
                            />
                        </div>
                       
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'User',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && user === ''?  "error-border":"fontstyle text-background" } 
                            placeholder = ''
                            value = {user}  
                            onChange= {(e)=>this.setState({user :  (e.target.value).toUpperCase()})}
                            />
                        </div>
                        
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'Region',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                             style={{height:'85px'}}
                             className = {is_submit === true && region === ''?  "error-border-select-paste":"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={regiondata.filter(option =>option.value === region)}
                            options={regiondata}
                            onChange={this.handleregion}
                            />
                        </div>
                        <div className = "col-md-12 space-margin">
                            <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'Remark',languageData)}</Label>
                            <textarea  
                            className = {"fontstyle textarea-background" } 
                            placeholder = ''
                            value = {remark}  
                            onChange= {(e)=>this.setState({remark : e.target.value})} 
                            />
                        </div>
                    </div>
                    <div className = "row text-center" style = {{margin:'0px 5px'}}> 
                        <Button className = "button-width" color="primary"  style={{width:'150px'}}
                                 onClick={()=>this.onSubmit()}
                                > {onChangeLanguage(locale,'Save',languageData)}</Button>
                       
                        <Button className = "button-width" color="secondary" style={{width:'150px'}} 
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

