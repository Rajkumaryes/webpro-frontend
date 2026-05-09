
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import{ProcessService} from '../../../../redux/projectmasters/diputemaster/process/saga'
import{CountryService} from '../../../../redux/projectmasters/diputemaster/country/saga';
import {onChangeLanguage,getCurrentWeek,getTimeDifference,getValue,convertLocalToUTCDate} from '../../../../helper'
import {GetReceviedTime} from '../../../../helper'
import moment from 'moment';
import { createNotification } from '../../../../toast';
import { communicationService } from '../../../../redux/Dispute-process/communication/saga';
import { MailactionService } from '../../../../redux/projectmasters/diputemaster/mailaction/saga';
import DatePicker from "../../datePicker";
import {getValue_D1040,getValue_dispute} from '../pasteData'
import * as clipboard from "clipboard-polyfill/text";

import Workbook from 'react-excel-workbook'

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user_id:'',
        start_time:'',
        end_time:'',
        from:'',
        subject:'',
        mail_received:'',
        process:'',
        country:'',
        mail_action:'',
        remarks:'',
        data:[],
        mailactiondata:[],
        countrydata:[],
        processdata:[],
        loading:false,
        is_submit:false,
        receivetime_format:false,
        paste_data:'',
        updated_start_time:new Date(),
        communicationcount:'',
        communicationcountlast:''
      };
    }

    componentWillMount()
    {
      this.setState({
        start_time:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
        
      })
        this.fetchprocess()
        this.fetchcountry()
        this.fetchData()
        this.fetchmailaction()
        this.fetchCommunicationCount()
    }
    fetchCommunicationCount(){
      this.setState({loading:true})
      const {username} = this.props
      // console.log(username)
      communicationService.fetchcommunicationCount(username)
      .then((res) => {
         if(res.status)   { 
                let filterstatus = res.data;
                let lastdata = res.lastcount;
                this.setState({ 
                  communicationcount:filterstatus, 
                  communicationcountlast:lastdata     
                }) 
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})

}
    onSubmit() { 
        const {user_id,start_time,end_time,from,subject,mail_received,process,country,mail_action,remarks,updated_start_time } = this.state;
            
        if(  from !=='' &&subject!=='' &&mail_received !=='' &&process !=='' &&country !=='' &&mail_action!=='' )
        {
          let end_date=convertLocalToUTCDate(new Date()),
          start_date=convertLocalToUTCDate(updated_start_time),
          updatedstarttime=convertLocalToUTCDate(updated_start_time),
          updated_end_time=convertLocalToUTCDate(new Date())
          const end_datetime =  moment(new Date()).format('MM/DD/YYYY hh:mm:ss a') 
          this.setState({
            end_time:end_datetime,
            is_submit:false
          })
         
            const {username} = this.props
            this.createAPI(username,start_time,end_datetime,from,subject,mail_received,process,
              country,mail_action,remarks,start_date,end_date,updatedstarttime,updated_end_time )
          
            }
        else
        {
            this.setState({
                is_submit:true
            })
          createNotification('Please Fill Mandatory Field','error','filled')
        }
       
      }
      Refress()
      {
          this.setState({
            start_time:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
            end_time:'',
            from:'',
            subject:'',
            mail_received:'',
            process:'',
            country:'',
            mail_action:'',
            remarks:'',
            paste_data:'',
          })
      } 
  
    createAPI(user_id,start_time,end_time,from,subject,mail_received,process,
      country,mail_action,remarks,start_date,end_date,updatedstarttime,updated_end_time)
    {
      this.setState({
        loading : true
      })
      communicationService.createapi(user_id,start_time,end_time,from,subject,mail_received,
        process,country,mail_action,remarks,start_date,end_date,updatedstarttime,updated_end_time)
        .then((res) => { 
           
          if(res.status)
            {
              createNotification('Created','success','filled')
              this.fetchData()
              this.fetchCommunicationCount()
              this.setState({
                start_time:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
                end_time:'',
                from:'',
                subject:'',
                mail_received:'',
                process:'',
                country:'',
                mail_action:'',
                remarks:'',
                paste_data:'',
              })
              
            }else{
              this.setState({   
                loading : false     
              })
              createNotification(res.message,'error','filled')
            }                
      
      })
      .catch((error) => { 
        this.setState({
          loading : false
        })
      });
       
    }


    fetchData() {
        this.setState({loading:true})
        communicationService.fetchapi()
        .then((res) => {
           if(res.status)   { 
                    this.setState({
                    data :  res.data,
                    loading:false
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({
                  loading : false
                })
      } 

    fetchcountry() {
        this.setState({
            loading : true
          })
          CountryService.fetchcountry()
        .then((res) => {
            this.setState({loading:false})
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var typelist = filterstatus.map(function(typename) {
                      return  {label : typename.name ,value : (typename.id).toString()};
                   });  
                    this.setState({
                      countrydata :  typelist,
                    })
                 }
                
                 })
                 .catch((error) => { 
                    this.setState({
                        loading : false
                      })
                 }); 
     } 
     
     fetchprocess() {
        this.setState({
            loading : true
          })
          ProcessService.fetchProcess()
        .then((res) => {
            this.setState({loading:false})
           if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
            var regionlist = filterstatus.map(function(regionname) {
                 return  {label : regionname.name ,value : (regionname.id).toString()};
              }); 
                    this.setState({
                        processdata :  regionlist,
                    })
                 }
                
                 })
                 .catch((error) => { 
                    this.setState({
                        loading : false
                      })
                 }); 
     } 
   
     fetchmailaction() {
      this.setState({
          loading : true
        })
        MailactionService.fetchmailaction()
      .then((res) => {
          this.setState({loading:false})
         if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function(regionname) {
               return  {label : regionname.name ,value : (regionname.id).toString()};
            }); 
                  this.setState({
                      mailactiondata :  regionlist,
                  })
               }
              
               })
               .catch((error) => { 
                  this.setState({
                      loading : false
                    })
               }); 
   } 
   async onPaste() {
    clipboard.readText().then((text)=>{
        var record = getValue_dispute(text)
        
        this.setState({
            paste_data:text,
            from:record.from,
            subject:record.subject,
            mail_received:record.mail_received,
            })
       
    });
    
}  
    renderTemplate()
    {
      const {languageData,locale} = this.props
      const {data,regoin_Data,all_type_Data,charge_Data} = this.state
      var array = data.map(record=> {
            return {
              'User Name' : record.username,
              'Start Date Time' : record.starttime,
              'End Date Time' : record.endtime,
              'Week' : record.week,
              'Date' : record.date,
              // 'Region':getValue(regoin_Data,'value','label',record.region) ,
              // 'Type' : getValue(all_type_Data,'value','label',record.type),
              'MTD No': record.mtdnumber,
              'Received Time': record.received_time,
              'Unit': record.unit,
              'TAT Time': record.tat_time,
              // 'charges':  getValue(charge_Data,'value','label',record.charges),
          };
        })
        return(
          
          <Workbook filename="ReleaseCountSheet.xlsx" element={
            <Button className = "button-width" color="secondary"  style={{width:'150px'}}
            >{ onChangeLanguage(locale,'Raw Data',languageData)}  
            </Button>
                }>
            <Workbook.Sheet data={array} name="Sheet A">
            <Workbook.Column label="User Name" value="User Name"/>
            <Workbook.Column label="Start Date Time" value="Start Date Time"/>
              <Workbook.Column label="End Date Time" value="End Date Time"/>
              <Workbook.Column label="Week" value="Week"/>
              <Workbook.Column label="Date" value="Date"/>
              <Workbook.Column label="Region" value="Region"/>
              <Workbook.Column label="Type" value="Type"/>
              <Workbook.Column label="MTD Nubmber" value="MTD No"/>
              <Workbook.Column label="Received Time" value="Received Time"/>
              <Workbook.Column label="Unit" value="Unit"/>
              <Workbook.Column label="TAT Time" value="TAT Time"/>
              <Workbook.Column label="charges" value="charges"/>
            </Workbook.Sheet> 
          </Workbook>    
  
        );
    }
    onChangetime(date)
    {
      console.log("lhnkjh " ,date)
      var time = moment(date).format('HH:mm:ss')
      if(time !== "00:00:00")
      {
        this.setState({
          mail_received  : date,
        })
        console.log("lhnkjh " ,date)
      }
     
    } 
    render()
    {
        const {user_id,start_time,end_time,from,subject,mail_received,process,country,mail_action,remarks,communicationcount,communicationcountlast,
          is_submit,countrydata,processdata,mailactiondata} = this.state
       const {match,languageData,locale,username,receivetime_format} = this.props
        return (
            <>
            <title>{onChangeLanguage(locale,'Communication',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                
                <div className = "row">
                      <div className = "col-md-8">
                      <Breadcrumb heading={onChangeLanguage(locale,'Communication',languageData)} match={match} />
                    </div>
                    <div className = "col-md-2" >
                        <h2 style = {{marginTop:'15px'}}>Total EQ : {communicationcount}</h2>
                        </div>
                        <div className = "col-md-2">
                            <h2  style = {{marginTop:'15px'}}>Last EQ : {communicationcountlast}</h2>
                        </div>
                  </div>
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
            <div className = "" style = {{borderRadius:'10px',marginBottom:'10px'}}>
                    <div className = "row" >
                    <div className = "col-md-2 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'User ID',languageData)}
                            <br></br>{username}</Label>
                                
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a >{onChangeLanguage(locale,'Start Time',languageData)}</a><br></br>
                            { start_time}</Label>
                           
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a >{onChangeLanguage(locale,'End Time',languageData)}</a>
                            <br></br>{end_time}</Label>
                        </div>
                    </div>
                </div>  
                <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                  <div className = "publish-title" >
                          <Row>
                              <Colxx xxs="12">
                                  <Label  className = "fontstyle" 
                                  style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'Communication Sheet',languageData)}</Label>
                                  
                              </Colxx>
                          </Row>
                          </div>
                          <div className = "row" style = {{padding:'10px'}}>
                               
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'From',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Input  
                                    className = {is_submit === true && from === ''?  "error-border-paste":"fontstyle text-background-paste"}
                                    value = {from}  
                                    onChange= {(e)=>this.setState({from  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Subject',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Input  
                                    className = {is_submit === true && subject === ''?  "error-border-paste":"fontstyle text-background-paste"}
                                    value = {subject}  
                                    onChange= {(e)=>this.setState({subject  : e.target.value})} ></Input>
                                </div>
                                {/* <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Mail Received Time',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Input  className = {(is_submit === true && mail_received === '') || receivetime_format === true?  "error-border-paste":"fontstyle text-background"}
                                    placeholder = 'hh:mm:ss AM/PM'
                                    value = {mail_received}  
                                    onChange= {(e)=>this.setState({mail_received : e.target.value})} 
                                    />
                                </div> */}
                                <div className = "col-md-3 space-margin">
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Mail Received Time',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    {/* {is_submit === true && mail_received === '' &&   
                                    <p1 className = 'fontstyle mandatory-label'> 
                                    {onChangeLanguage(locale,'Mandatory Field',languageData)} 
                                    </p1>}
                                    <DatePicker
                                        selected={mail_received}
                                        className = "text-background" 
                                        onChange={(date) => this.onChangetime(date)}
                                    /> */}
                                    <Input  
                                    className = {(is_submit === true && mail_received === '') || receivetime_format === true?  "error-border-paste":"fontstyle text-background-paste"}
                                    placeholder = ''
                                    value = {mail_received}  
                                    onChange= {(e)=>this.setState({mail_received : e.target.value})} 
                                    />
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Process',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                        <Select  className={is_submit === true && process === ''?  "error-border-select":"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={processdata.filter(option =>option.value === process)}
                                            options={processdata}
                                            onChange={({value}) => this.setState({  process: value })}
                                        />
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Country',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Select className={is_submit === true && country === ''?  "error-border-select":"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={countrydata.filter(option =>option.value === country)}
                                            options={countrydata}
                                            onChange={({value}) => this.setState({  country: value })}
                                        />
                                </div>
                                
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Mail Action',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Select className={is_submit === true && mail_action === ''?  "error-border-select":"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={mailactiondata.filter(option =>option.value === mail_action)}
                                            options={mailactiondata}
                                            onChange={({value}) => this.setState({  mail_action: value })}
                                        />
                                </div>
                                <div className = "col-md-12 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Remarks',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <textarea  
                                      className = {"fontstyle textarea-background"}
                                      value = {remarks}  
                                      onChange= {(e)=>this.setState({remarks  : e.target.value})} ></textarea>
                                </div>
                           </div>
                             <div className = "row text-center" style = {{margin:'0px 5px'}}>
                                
                                    <Button className = "button-width" color="secondary"   
                                      onClick={()=>this.onPaste()}>
                                        {onChangeLanguage(locale,'Paste',languageData)}
                                    </Button>
                                   
                                    <Button className = "button-width" color="primary"  
                                            onClick={()=>this.onSubmit()}
                                            >{onChangeLanguage(locale,'Save',languageData)} </Button> 
                                    
                                    <Button className = "button-width" color="secondary"  
                                             onClick={()=>this.Refress()}
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

