
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
import {onChangeLanguage,getCurrentWeek,getTimeDifference,getValue,convertLocalToUTCDate,convertUTCToLocalDate} from '../../../../helper'
import {GetReceviedTime} from '../../../../helper'
import moment from 'moment';
import { createNotification } from '../../../../toast';
import { errorcaptureService } from '../../../../redux/Dispute-process/errorcapture/saga';
import { precollectService } from '../../../../redux/projectmasters/diputemaster/precollect/saga';
import{ErrortypeService} from '../../../../redux/projectmasters/diputemaster/errortype/saga'

import DatePicker from "../../datePicker";

import Workbook from 'react-excel-workbook'

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error_type:'',
        dispute_no:'',
        shipment_number:'',
        original_invoice:'',
        reinvoice_no:'',
        reinvoice_date:'',
        cancellation:'',
        dispute_capture:'',
        prepaid:'',
        process:'',
        country:'',
        error_marked:'',
        error_receiveduser:'',
        error_receiveddate:'',
        week_no:'',
        remarks:'',
        data:[],
        prepaiddata:[],
        countrydata:[],
        processdata:[],
        errortypedata:[],
        loading:false,
        is_submit:false,
        receivetime_format:false,
        updated_start_time:new Date()
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
        this.fetchprecollect()
        this.fetcherrortype()
    }
    onSubmit() { 
        const {error_type,dispute_no,shipment_number,original_invoice,reinvoice_no,reinvoice_date,cancellation,dispute_capture,
            prepaid,process,country,error_marked,error_receiveduser,error_receiveddate,week_no,remarks,updated_start_time} = this.state;
            
        if(error_type!=='' &&dispute_no!=='' &&shipment_number!=='' &&reinvoice_no!=='' &&reinvoice_date!=='' &&cancellation!=='' &&dispute_capture!=='' &&
        prepaid!=='' &&process!=='' &&country!=='' &&error_marked!=='' &&error_receiveduser!=='' &&error_receiveddate!=='')
        {
          const {username}=this.props
          let end_date=convertLocalToUTCDate(new Date()),
             start_date=convertLocalToUTCDate(updated_start_time),
             updatedstarttime=convertLocalToUTCDate(updated_start_time),
             updated_end_time=convertLocalToUTCDate(new Date()),
             errorreceiveddate=moment(convertUTCToLocalDate(error_receiveddate)).format('MM/DD/YYYY hh:mm:ss a')
          this.setState({
            is_submit:false
          })
         
            this.createAPI(error_type,dispute_no,shipment_number,original_invoice,reinvoice_no,reinvoice_date,cancellation,dispute_capture,
                prepaid,process,country,error_marked,error_receiveduser,errorreceiveddate,week_no,remarks,start_date,end_date,updatedstarttime,
                updated_end_time,username)
        
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
            error_type:'',
        dispute_no:'',
        shipment_number:'',
        original_invoice:'',
        reinvoice_no:'',
        reinvoice_date:'',
        cancellation:'',
        dispute_capture:'',
        prepaid:'',
        process:'',
        country:'',
        error_marked:'',
        error_receiveduser:'',
        error_receiveddate:'',
        week_no:'',
        remarks:'',
        is_submit:false
          })
      } 
  
    createAPI(error_type,dispute_no,shipment_number,original_invoice,reinvoice_no,reinvoice_date,cancellation,dispute_capture,
        prepaid,process,country,error_marked,error_receiveduser,error_receiveddate,week_no,remarks,start_date,end_date,updatedstarttime,
        updated_end_time,username)
    {
      this.setState({
        loading : true
      })
      errorcaptureService.createapi(error_type,dispute_no,shipment_number,original_invoice,reinvoice_no,reinvoice_date,cancellation,dispute_capture,
        prepaid,process,country,error_marked,error_receiveduser,error_receiveddate,week_no,remarks,start_date,end_date,updatedstarttime,
        updated_end_time,username)
        .then((res) => { 
           
          if(res.status)
            {
              createNotification('Created','success','filled')
              this.fetchData()
              this.setState({
                error_type:'',
            dispute_no:'',
            shipment_number:'',
            original_invoice:'',
            reinvoice_no:'',
            reinvoice_date:'',
            cancellation:'',
            dispute_capture:'',
            prepaid:'',
            process:'',
            country:'',
            error_marked:'',
            error_receiveduser:'',
            error_receiveddate:'',
            week_no:'',
            remarks:'',
            is_submit:false
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
        errorcaptureService.fetchapi()
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
     fetcherrortype() {
      this.setState({
          loading : true
        })
        ErrortypeService.fetcherrortype()
      .then((res) => {
          this.setState({loading:false})
         if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function(regionname) {
               return  {label : regionname.name ,value : (regionname.id).toString()};
            }); 
                  this.setState({
                      errortypedata :  regionlist,
                  })
               }
              
               })
               .catch((error) => { 
                  this.setState({
                      loading : false
                    })
               }); 
   } 
     fetchprecollect() {
      this.setState({
          loading : true
        })
        precollectService.fetchprecollect()
      .then((res) => {
          this.setState({loading:false})
         if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function(regionname) {
               return  {label : regionname.name ,value : (regionname.id).toString()};
            }); 
                  this.setState({
                      prepaiddata :  regionlist,
                  })
               }
              
               })
               .catch((error) => { 
                  this.setState({
                      loading : false
                    })
               }); 
   } 
     
    renderTemplate()
    {
      const {languageData,locale} = this.props
      const {data,regoin_Data,all_type_Data,charge_Data} = this.state
      var array = data.map(record=> {
            return {
              'amount_disputed' : record.amount_disputed,
              'company_name' : record.company_name,
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
            <Workbook.Column label="Email Date/ From / Subject" value="Start Date Time"/>
              <Workbook.Column label="Original Invoice Amount" value="End Date Time"/>
              <Workbook.Column label="Status" value="Week"/>
              <Workbook.Column label="Dispute Status" value="Date"/>
              <Workbook.Column label="Dispute ID" value="Region"/>
              <Workbook.Column label="MESSAGE" value="Type"/>
              <Workbook.Column label="FIS or MACRO ERROR" value="MTD No"/>
              <Workbook.Column label="Invoice Number" value="Received Time"/>
              <Workbook.Column label="Customer ref Number" value="Unit"/>
              <Workbook.Column label="Bill of Lading Number" value="TAT Time"/>
              <Workbook.Column label="Amount Disputed" value="amount_disputed"/>
              <Workbook.Column label="Currency" value="Start Date Time"/>
              <Workbook.Column label="Amount to be Billed" value="End Date Time"/>
              <Workbook.Column label="Charge Type" value="Week"/>
              <Workbook.Column label="Dispute Type" value="Date"/>
              <Workbook.Column label="Dispute Description" value="Region"/>
              <Workbook.Column label="Dispute Type Code" value="Type"/>
              <Workbook.Column label="Company Name" value="company_name"/>
              <Workbook.Column label="Name" value="Received Time"/>
              <Workbook.Column label="Phone Number" value="Unit"/>
              <Workbook.Column label="Email (from Template Form)" value="TAT Time"/>
              <Workbook.Column label="Exchange ID" value="charges"/>
              <Workbook.Column label="Email Attached" value="charges"/>
              <Workbook.Column label="Email Address" value="charges"/>
              <Workbook.Column label="Internal Email Address" value="charges"/>
            </Workbook.Sheet> 
          </Workbook>    
  
        );
    }
    onChangeFileUpload(files)
	{
    this.setState({
      loading : true
    })
    precollectService.fileUpload(files[0])
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
  onChangetime(date)
  {
    this.setState({
      error_receiveddate  : date,
      week_no:getCurrentWeek(date).toString()
    })
   
  } 
  onChangereinvo(date)
  {
  let reinvoicedate=moment(convertUTCToLocalDate(date)).format('MM/DD/YYYY hh:mm:ss a')
  this.setState({
    reinvoice_date  : reinvoicedate, 
  })
  
}
    render()
    {
        const {error_type,dispute_no,shipment_number,original_invoice,reinvoice_no,reinvoice_date,cancellation,dispute_capture,
            prepaid,process,country,error_marked,error_receiveduser,error_receiveddate,week_no,remarks,
          is_submit,countrydata,processdata,prepaiddata,errortypedata} = this.state
       const {match,languageData,locale,username,receivetime_format} = this.props
        return (
            <>
            <title>{onChangeLanguage(locale,'Error Capturing',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'Error Capturing',languageData)} match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>  
                <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                 
                          <div className = "row" style = {{padding:'10px'}}>
                               
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Type',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Select  className={is_submit === true && process === ''?  "error-border-select":"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={errortypedata.filter(option =>option.value === error_type)}
                                            options={errortypedata}
                                            onChange={({value}) => this.setState({  error_type: value })}
                                        />
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Dispute No',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Input  className = {is_submit === true && dispute_no === ''?  "error-border":"fontstyle text-background"}
                                        value = {dispute_no}  
                                        onChange= {(e)=>this.setState({dispute_no  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Shipment Number',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Input  className = {is_submit === true && shipment_number === ''?  "error-border":"fontstyle text-background"}
                                    placeholder = ''
                                    value = {shipment_number}  
                                    onChange= {(e)=>this.setState({shipment_number : e.target.value})} 
                                    />
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Original Invoice No',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Input  className = {is_submit === true && original_invoice === ''?  "error-border":"fontstyle text-background"}
                                        value = {original_invoice}  
                                        onChange= {(e)=>this.setState({original_invoice  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Re-Invoice No',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Input  className = {is_submit === true && reinvoice_no === ''?  "error-border":"fontstyle text-background"}
                                        value = {reinvoice_no}  
                                        onChange= {(e)=>this.setState({reinvoice_no  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Re-Invoice Date',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    {/* <Input  className = {is_submit === true && reinvoice_date === ''?  "error-border":"fontstyle text-background"}
                                        type="date"
                                        value = {reinvoice_date}  
                                        onChange= {(e)=>this.setState({reinvoice_date  : e.target.value})} ></Input> */}
                                        {is_submit === true && reinvoice_date === '' &&   
                                    <p1 className = 'fontstyle mandatory-label'> 
                                    {onChangeLanguage(locale,'Mandatory Field',languageData)} 
                                    </p1>}
                                    <DatePicker
                                        selected={reinvoice_date}
                                        className = "text-background" 
                                        onChange={(date) => this.onChangereinvo(date)}
                                    />
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Cancellation Reason Code',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Input  className = {is_submit === true && cancellation === ''?  "error-border":"fontstyle text-background"}
                                       
                                        value = {cancellation}  
                                        onChange= {(e)=>this.setState({cancellation  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Dispute Capture Code',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Input  className = {is_submit === true && dispute_capture === ''?  "error-border":"fontstyle text-background"}
                                        value = {dispute_capture}  
                                        onChange= {(e)=>this.setState({dispute_capture  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Prepaid / Collect',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Select className={is_submit === true && prepaid === ''?  "error-border-select":"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={prepaiddata.filter(option =>option.value === prepaid)}
                                            options={prepaiddata}
                                            onChange={({value}) => this.setState({  prepaid: value })}
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
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Marked By User',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Input  
                                        className = {is_submit === true && error_marked === ''?  "error-border":"fontstyle text-background"}
                                        value = {error_marked} 
                                        onChange= {(e)=>this.setState({error_marked :  (e.target.value).toUpperCase()})}> 
                                        </Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Received By User',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Input  
                                        className = {is_submit === true && error_receiveduser === ''?  "error-border":"fontstyle text-background"}
                                        value = {error_receiveduser}  
                                        onChange= {(e)=>this.setState({error_receiveduser :  (e.target.value).toUpperCase()})}
                                        >
                                        </Input>
                                </div>
                                <div className = "col-md-3 space-margin">
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Captured Date / Time',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    {is_submit === true && error_receiveddate === '' &&   
                                    <p1 className = 'fontstyle mandatory-label'> 
                                    {onChangeLanguage(locale,'Mandatory Field',languageData)} 
                                    </p1>}
                                    <DatePicker
                                        selected={error_receiveddate}
                                        className = "text-background" 
                                        onChange={(date) => this.onChangetime(date)}
                                    />
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Week No',languageData)}
                                   <br></br>{week_no}</Label>
                                    {/* <Input  className = {is_submit === true && week_no === ''?  "error-border":"fontstyle text-background"}
                                        value = {week_no}  
                                        onChange= {(e)=>this.setState({week_no  : e.target.value})} ></Input> */}
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
                           
                            <Button className = "button-width" color="primary"  style={{width:'150px'}}
                                    onClick={()=>this.onSubmit()}
                            >{onChangeLanguage(locale,'Save',languageData)} </Button> 
                            
                            <Button className = "button-width" color="secondary"  style={{width:'150px'}}
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

