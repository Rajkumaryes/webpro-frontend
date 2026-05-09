import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import DatePicker from "../../datePicker";
import Select from 'react-select';
import{userService} from '../../../../redux/users/saga'
import{InvoiceCancelService} from '../../../../redux/imports/invoicecancel/saga'
import{areaimportService} from '../../../../redux/imports/areaimport/saga'
import{reasoncodeService} from '../../../../redux/imports/reasoncode/saga'
import{acceptedrefutedService} from '../../../../redux/imports/acceptedrefuted/saga'
import {onChangeLanguage,getValue ,convertLocalToUTCDate,convertUTCToLocalDate} from '../../../../helper'
import { createNotification } from '../../../../toast';
import Loading from "react-fullscreen-loading";
import Workbook from 'react-excel-workbook'
import moment from 'moment';
class Sidebar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        invoice_no:'',
        invoice_date:'',
        invoice_currency:'',
        invoice_amount:'',
        payer:'',
        shipment:'',
        invoice_creater:'',
        reasoncode:'',
        reason_remarks:'',
        orginal_invoice_no:'',
        area:'',
        userid:'',
        capturedid:'',
        invoice_type:'',
        gsc_comments:'',
        data:[],
        areadata:[],
        area_data:[],
        reasoncodedata:[],
        reasoncode_data:[],
        accepteddata:[],
        accepted_data:[],
        user_data:[],
        is_submit:false,
        loading:false,
        start_time:new Date(),
        updated_start_time:new Date(),
      };
    }
    componentDidMount() {
      //  this.fetchinvoicecancel()
       this.fetchreason()
       this.fetcharea()
      //  this.fetchuser()
       this.fetchaccepted()
       this.fetchuserid()
    }



    fetchuserid() {
      this.setState({loading:true})
      userService.fetchpermission_user('Imports')
      .then((res) => {
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.is_active === 1)
               var erroruseridlist = filterstatus.map(function(cusmaidid) {
                    return  {label : cusmaidid.username ,value : cusmaidid.username};
                 });  
                 this.setState({
                  user_data :  erroruseridlist,
                  })
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { });
               this.setState({loading:false}) 
   } 
  //   fetchuser() {  
  //     this.setState({
  //       loading : true
  //     })
  //           userService.fetchuserData()
  //       .then((res) => { 
  //         this.setState({   
  //       loading : false 
                
  //         }) 
  //         if(res.status)   { 
  //           let filterstatus = (res.data).filter(item => item.is_active === 1)
  //              var regionlist = filterstatus.map(function(cusmaidid) {
  //                   return  {label : cusmaidid.username ,value : cusmaidid.username};
  //                });  
  //                 this.setState({
  //                 user_data :  regionlist,
  //                 })
  //              }
  //              else{
  //              this.setState({loading:false})}
  //     })
  //     .catch((error) => { 
  //       this.setState({
  //         loading : false
  //       })
  //       });   
  //  }
    fetchinvoicecancel() {
        this.setState({loading:true})
        InvoiceCancelService.fetchinvoicecancel()
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
      fetchreason() {
        this.setState({loading:true})
        reasoncodeService.fetchreasoncode()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var reasonlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   });  
                   var reason_list = filterstatus.map(function(cusmaidid) {
                    return  {text : cusmaidid.name ,value : cusmaidid.id};
                 });  
                    this.setState({
                    reasoncodedata :  reasonlist,
                    reasoncode_data :  reason_list,
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  
     fetchaccepted() {
        this.setState({loading:true})
        acceptedrefutedService.fetchacceptedrefuted()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var acceptedlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   });  
                   var accepted_list = filterstatus.map(function(cusmaidid) {
                    return  {text : cusmaidid.name ,value : cusmaidid.id};
                 });  
                    this.setState({
                    accepteddata :  acceptedlist,
                    accepted_data :  accepted_list,
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  
     fetcharea() {
        this.setState({loading:true})
        areaimportService.fetchareaimport()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var arealist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.area_name ,value : cusmaidid.id.toString()};
                   });  
                   var area_list = filterstatus.map(function(cusmaidid) {
                    return  {text : cusmaidid.area_name ,value : cusmaidid.id};
                 });  
                    this.setState({
                    areadata :  arealist,
                    area_data :  area_list,
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  
    handlecustomtype = (selectedOptions) => {
        this.setState({region : selectedOptions.value})  
      }  
      onSubmit() { 
        const {invoice_no,invoice_date,invoice_currency,invoice_amount,payer,shipment,invoice_creater,reasoncode,
          reason_remarks,orginal_invoice_no,area,userid,capturedid,invoice_type,gsc_comments,
        start_time,updated_start_time} = this.state;
 
        if(invoice_no !=='' && invoice_date !=='' && invoice_currency !=='' && invoice_amount !=='' && payer !=='' && shipment !=='' && invoice_creater !=='' && reasoncode !=='' &&
         reason_remarks !=='' && orginal_invoice_no !=='' && area !=='' && userid !=='' && invoice_type !=='' && gsc_comments !=='')
        {  
            const {username} = this.props
            var invoice = moment(convertUTCToLocalDate(invoice_date)).format('MM/DD/YYYY hh:mm:ss a')
            const end_time = new Date() ,updated_end_time = new Date()
          this.setState({
            loading : true
          })
         
          InvoiceCancelService.createinvoicecancel(invoice_no,invoice,invoice_currency,invoice_amount,payer,shipment,invoice_creater,reasoncode,
            reason_remarks,orginal_invoice_no,area,userid,username,invoice_type,gsc_comments,
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
                  this.onrefresh()
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
    this.setState({invoice_date  : date})
  }
  renderTemplate()
  {
    const {languageData,locale} = this.props
    const {data,area_data,reasoncode_data,accepted_data} = this.state
    var array = data.map(record=> {
          return {
                'invoice_no':record.invoice_no,
                'invoice_date':record.invoice_date,
                'invoice_currency':record.invoice_currency,
                'invoice_amount':record.invoice_amount,
                'payer':record.payer,
                'shipment':record.shipment,
                'invoice_creater':record.invoice_creater,
                'reasoncode':getValue(reasoncode_data,'value','text',parseInt(record.reasoncode)),
                'reason_remarks':record.reason_remarks,
                'orginal_invoice_no':record.orginal_invoice_no,
                'area':getValue(area_data,'value','text',parseInt(record.area)),
                'userid':record.userid,
                'capturedid':record.capturedid,
                'invoice_type':getValue(accepted_data,'value','text',parseInt(record.invoice_type)),
                'gsc_comments':record.gsc_comments,
        };
      })
      return(
        
        <Workbook filename="Invoice_Cancellation.xlsx" element={
            <Button className = "button-width"
            style={{width:'155px'}} color="secondary" >
            {onChangeLanguage(locale,'Download Template',languageData)} 
            </Button>
		      }>
          <Workbook.Sheet data={array} name="Sheet A">
                <Workbook.Column label="Week Number" value=""  />
                <Workbook.Column label="Invoice Number" value="invoice_no"  />
                <Workbook.Column label="Invoice Date" value="invoice_date"  />
                <Workbook.Column label="Payer" value="payer"  />
                <Workbook.Column label="Shipment Number" value="shipment"  />
                <Workbook.Column label="Invoice Currency" value="invoice_currency"  />
                <Workbook.Column label="Invoice Amount" value="invoice_amount"  />
                <Workbook.Column label="Invoice Creator" value="invoice_creater"  />
                <Workbook.Column label="Reason Code1" value="reasoncode"  />
                <Workbook.Column label="Reason Remarks" value="reason_remarks"  />
                <Workbook.Column label="Original Invoice Number" value="orginal_invoice_no"  />
                <Workbook.Column label="Area" value="area"  />
                <Workbook.Column label="Accepted/Refuted" value="invoice_type"  />
                <Workbook.Column label="User ID" value="capturedid"  />                
                <Workbook.Column label="GSC comments" value="gsc_comments"  />
          </Workbook.Sheet> 
        </Workbook>
     

      );
  }
  onrefresh() {
    this.setState({
        invoice_no:'',
        invoice_date:'',
        invoice_currency:'',
        invoice_amount:'',
        payer:'',
        shipment:'',
        invoice_creater:'',
        reasoncode:'',
        reason_remarks:'',
        orginal_invoice_no:'',
        area:'',
        userid:'',
        capturedid:'',
        invoice_type:'',
        gsc_comments:''
    })
   
  }
  onChangeFileUpload(files)
	{
    this.setState({
      loading : true
    })
    const {username} = this.props
    InvoiceCancelService.fileUpload(files[0],username)
      .then((res) => { 
        this.setState({
          loading : false
        })
        if(res.status)
        {
          if(res.data)
          {
           if(res.data.status)   
           {   
          
             createNotification('Uploaded','success','filled')
     
           } 
           else
           {
           
             createNotification(res.data.message,'error','filled');
           } 
          }     
        }
       
          
    
    })
    .catch((error) => { 
      this.setState({
        loading : false
      })
      });
  }
    render()
    { 
        const{invoice_no,invoice_date,invoice_currency,invoice_amount,payer,shipment,invoice_creater,
            reasoncode,reason_remarks,orginal_invoice_no,area,userid,user_data,invoice_type,gsc_comments,
            areadata,reasoncodedata,accepteddata,is_submit,loading}=this.state
        const {match,username,locale,languageData} = this.props
        return (
            <>
            <title>{onChangeLanguage(locale,'Invoice Cancellation Import',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <div className = "row">
                <div className = "col-md-10">
                <Breadcrumb heading={onChangeLanguage(locale,'Invoice Cancellation Import',languageData)} match={match} />
                </div>
                <div className = "col-md-2">
                    <Button className = "button-width" color="primary" style= {{width :'62%'}}>
                    <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
                    <a style= {{margin :'0px'}} > Upload</a>
                    <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                        className = "filepicker_customButton"
                        style = {{width : '80%',marginLeft :'-56%'}}
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
                    </Button>
                </div>
                </div>
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
                <div className = "row">
                <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Invoice Number',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input 
                             className = {is_submit === true && invoice_no === ''?  "error-border":"fontstyle text-background" }    
                            // placeholder = 'End date'
                            value = {invoice_no}  
                            onChange= {(e)=>this.setState({invoice_no : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Invoice Date',languageData)}
                              <a style = {{color :'red'}}>*</a></Label>
                               <p1 className = 'fontstyle mandatory-label'>
                                {is_submit === true && invoice_date === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                              <DatePicker
                                 selected={invoice_date}
                                 className = "text-background" 
                                 onChange={(date) => this.setState({invoice_date  : date})}
                                 />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Payer',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input 
                             className = {is_submit === true && payer === ''?  "error-border":"fontstyle text-background" }    
                            // placeholder = 'End date'
                            value = {payer}  
                            onChange= {(e)=>this.setState({payer : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Shipment Number',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input 
                             className = {is_submit === true && shipment === ''?  "error-border":"fontstyle text-background" }    
                            // placeholder = 'End date'
                            value = {shipment}  
                            onChange= {(e)=>this.setState({shipment : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Invoice Currency',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input 
                             className = {is_submit === true && invoice_currency === ''?  "error-border":"fontstyle text-background" }    
                            // placeholder = 'End date'
                            value = {invoice_currency}  
                            onChange= {(e)=>this.setState({invoice_currency : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Invoice Amount',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input 
                             className = {is_submit === true && invoice_amount === ''?  "error-border":"fontstyle text-background" }    
                            type = 'number'
                            value = {invoice_amount}  
                            onChange= {(e)=>this.setState({invoice_amount : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Invoice Creator',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input 
                             className = {is_submit === true && invoice_creater === ''?  "error-border":"fontstyle text-background" }    
                            // placeholder = 'End date'
                            value = {invoice_creater}  
                            onChange= {(e)=>this.setState({invoice_creater : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Reason Code1',languageData)} <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && reasoncode === ''?  "error-border-select-paste":"react-select fontstyle" }  
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={reasoncodedata.filter(option =>option.value === reasoncode)}
                            options={reasoncodedata}
                            onChange={({value}) => this.setState({  reasoncode: value })}
                        />
                        </div>
                        
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Reason Remarks',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && reason_remarks === ''?  "error-border":"fontstyle text-background" }    
                            // placeholder = 'End date'
                            value = {reason_remarks}  
                            onChange= {(e)=>this.setState({reason_remarks : e.target.value})} 
                            />
                           
                        </div>
                         <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Original Invoice Number',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && orginal_invoice_no === ''?  "error-border":"fontstyle text-background" }    
                            // placeholder = 'End date'
                            value = {orginal_invoice_no}  
                            onChange= {(e)=>this.setState({orginal_invoice_no : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin ">
                            <Label  className = "fontstyle normal-font" > 
                            {onChangeLanguage(locale,'Area',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                                <Select  
                                className = {is_submit === true && area === ''?  "error-border-select-paste":"react-select fontstyle" }  
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={areadata.filter(option =>option.value === area)}
                                options={areadata}
                                onChange={({value}) => this.setState({  area: value })}
                             />
                        </div>
                        <div className = "col-md-4 space-margin ">
                            <Label  className = "fontstyle normal-font" > 
                            {onChangeLanguage(locale,'Accepted/Refuted',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                                <Select  
                                className = {is_submit === true && invoice_type === ''?  "error-border-select-paste":"react-select fontstyle" }  
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={accepteddata.filter(option =>option.value === invoice_type)}
                                options={accepteddata}
                                onChange={({value}) => this.setState({  invoice_type: value })}
                             />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'User ID',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && userid === ''?  "error-border-select-paste":"react-select fontstyle" }  
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={user_data.filter(option =>option.value === userid)}
                            options={user_data}
                            onChange={({value}) => this.setState({  userid: value })}
                           />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Captured ID',languageData)}
                            <br></br>{username}</Label>
                        </div>
                        <div className = "col-md-12 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'GSC comments',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <textarea
                                className = {is_submit === true && gsc_comments === ''?  "border-textarea-background-paste":"fontstyle textarea-background" }  
                                placeholder = ''
                                value = {gsc_comments}  
                                onChange= {(e)=>this.setState({gsc_comments : e.target.value})} 
                            />
                        </div>
                        
                    </div>
                    <div className = "row text-center" >
                            {this.renderTemplate()}
                             <Button 
                              className = "button-width" color="primary"  
                                        onClick={()=>this.onSubmit()}
                                >
                                {onChangeLanguage(locale,'Save',languageData)} 
                            </Button>
                            <Button className = "button-width" color="secondary"                                    
                                onClick={()=>this.onrefresh()}
                                >
                               {onChangeLanguage(locale,'Refresh',languageData)} 
                            </Button>
                   
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

   })(Sidebar)
  );

