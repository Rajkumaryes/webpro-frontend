import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import moment from 'moment';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import Select from 'react-select';
import {onChangeLanguage,convertLocalToUTCDate,convertUTCToLocalDate} from '../../../../helper'
import{surprisecorrectionService} from '../../../../redux/qa/surprisecorrection/saga'
import{shipperService} from '../../../../redux/qa/shipper/saga'
import{tlacceptanceService} from '../../../../redux/qa/tlacceptance/saga'
import {getValue_Surprise} from '../pasteData'
import * as clipboard from "clipboard-polyfill/text";

class InputAudit extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        shipment_no:'',
        mtd_no:'',
        customer:'',
        correcter_id:'',
        req_type:'',
        amd_type:'',
        remarks:'',
        team:'',
        start_datetime:'',
        end_datetime:'',
        region:'',
        error:'',
        correction_remarks:'',
        auditor_id:'',
        auditor_remarks:'',
        tl_acceptance:'',
        tl_remarks:'',
        received_datetime:'',
        shipper:'',
        tl_acceptance_data:[],
        error_data:[
            {label:'YES',value:'YES'},
            {label:'NO',value:'NO'},
        ],
        shipper_data:[],
        is_submit:false,
        start_time:new Date(),
        updated_start_time:new Date(),
      };
    }
    componentDidMount()
    {
        this.setState({
            start_datetime : moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
        })
       this.fetchShipper()
       this.fetchTLAcceptance()
    }
    fetchShipper() {
        this.setState({
          loading : true
        })
        shipperService.fetchapi()
          .then((res) => {
              this.setState({loading:false})
             if(res.status)   { 
                let filterstatus = (res.data).filter(item => item.status === 1)
                   var arealist = filterstatus.map(function(areaaval) {
                        return  {label : areaaval.name ,value : (areaaval.id).toString()};
                     });  
                      this.setState({
                      shipper_data :  arealist,
                      })
                   }
                  
                   })
                   .catch((error) => { 
                      this.setState({
                          loading : false
                        })
                   }); 
       }
    fetchTLAcceptance() {
        this.setState({
          loading : true
        })
        tlacceptanceService.fetchapi()
          .then((res) => {
              this.setState({loading:false})
             if(res.status)   { 
                let filterstatus = (res.data).filter(item => item.status === 1)
                   var arealist = filterstatus.map(function(areaaval) {
                        return  {label : areaaval.name ,value : (areaaval.id).toString()};
                     });  
                      this.setState({
                      tl_acceptance_data :  arealist,
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
        const {shipment_no,mtd_no,customer,correcter_id,amd_type,req_type,remarks,team,
            start_datetime,region,error,correction_remarks,auditor_id,shipper,
             auditor_remarks,tl_acceptance,tl_remarks,received_datetime,
             start_time,updated_start_time} = this.state
        var end_datetime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
        if(shipment_no !== "" &&  mtd_no !== "" && correcter_id !== "" && 
            received_datetime !== "" &&shipper !== "" &&
            start_datetime !== ""  &&  error !== "" && auditor_id !== "" && auditor_remarks !== "" )
        {
            const {username} = this.props
            const end_time = new Date() ,updated_end_time = new Date()
            this.setState({
              loading : true,
              end_datetime :end_datetime ,
            })
            surprisecorrectionService.createapi(username,shipment_no,mtd_no,customer,correcter_id,amd_type,
                req_type,remarks,team, start_datetime,end_datetime,region,error,correction_remarks,
                auditor_id,shipper,auditor_remarks,tl_acceptance,tl_remarks,received_datetime,
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
                        shipment_no:'',
                        mtd_no:'',
                        customer:'',
                        correcter_id:'',
                        req_type:'',
                        amd_type:'',
                        remarks:'',
                        team:'',
                        start_datetime : moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
                        end_datetime:'',
                        region:'',
                        error:'',
                        correction_remarks:'',
                        auditor_id:'',
                        auditor_remarks:'',
                        received_datetime:'',
                        shipper:'',
                        tl_acceptance:'',
                        tl_remarks:'',
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
            shipment_no:'',
            mtd_no:'',
            customer:'',
            correcter_id:'',
            req_type:'',
            amd_type:'',
            remarks:'',
            team:'',
            start_datetime : moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
            end_datetime:'',
            region:'',
            error:'',
            correction_remarks:'',
            auditor_id:'',
            auditor_remarks:'',
            received_datetime:'',
            shipper:'',
            tl_acceptance:'',
            tl_remarks:'',
            is_submit:false,
        })
    }
    onPaste()
    {
        clipboard.readText().then((text)=>{
            var record = getValue_Surprise(text)
            console.log("kjbkj " , JSON.stringify(record))
            this.setState({
                shipment_no:record.shipment_no,
                mtd_no:record.mtd_no,
                customer:record.customer,
                correcter_id:record.correcter_id,
                team:record.team,
                region:record.region,
                amd_type:record.amd_type,
                received_datetime:record.received_datetime,
                req_type:record.req_type,
                remarks:record.remarks,
                correction_remarks:record.correction_remarks
                })
              
            });
    }
   
    
    render()
    {
        const {locale,languageData,title,data} = this.props
        const {shipment_no,mtd_no,customer,correcter_id,amd_type,req_type,remarks,team,shipper,shipper_data,
        start_datetime,end_datetime,region,error,correction_remarks,auditor_id,loading,is_submit,
         auditor_remarks,tl_acceptance,tl_remarks,error_data,tl_acceptance_data,received_datetime} = this.state
        return(
            <>
                 {loading && 
                    <div>
                        <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
                    </div>
                 }
                <div  style = {{paddingBottom:'20px'}}>
                <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "publish-title" >
                        <Row>
                            <Colxx xxs="4">
                                <Label  className = "fontstyle" 
                                style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,title,languageData)}</Label>
                            </Colxx>
                        </Row>
                    </div>
                    <div className = "row" style={{padding:'10px'}}>
                   
                   <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Shipment Number',languageData)}<a style = {{color :'red'}}>*</a></Label>
                           <Input   className = {is_submit === true && shipment_no === ''?  "error-border-paste":"fontstyle text-background-paste" }
                           placeholder = ''
                           value = {shipment_no}  
                           onChange= {(e)=>this.setState({shipment_no : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'MTD Number',languageData)}<a style = {{color :'red'}}>*</a></Label>
                           <Input   className = {is_submit === true && mtd_no === ''?  "error-border-paste":"fontstyle text-background-paste" }
                           placeholder = ''
                           value = {mtd_no}  
                           onChange= {(e)=>this.setState({mtd_no : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Customer',languageData)}</Label>
                           <Input   className = {"fontstyle text-background-paste" }  
                           placeholder = ''
                           value = {customer}  
                           onChange= {(e)=>this.setState({customer : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Corrector ID',languageData)}<a style = {{color :'red'}}>*</a></Label>
                           <Input   className = {is_submit === true && correcter_id === ''?  "error-border-paste":"fontstyle text-background-paste" } 
                           placeholder = ''
                           value = {correcter_id}  
                           onChange= {(e)=>this.setState({correcter_id : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Team',languageData)}</Label>
                           <Input   className = {"fontstyle text-background-paste" }   
                           placeholder = ''
                           value = {team}  
                           onChange= {(e)=>this.setState({team : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Region',languageData)}</Label>
                            <Input   className = {"fontstyle text-background-paste" }   
                           placeholder = ''
                           value = {region}  
                           onChange= {(e)=>this.setState({region : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Req Type',languageData)}</Label>
                           <Input   className = {"fontstyle text-background-paste" }
                           placeholder = ''
                           value = {req_type}  
                           onChange= {(e)=>this.setState({req_type : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Amd Type',languageData)}</Label>
                           <Input   className = {"fontstyle text-background-paste" }
                           placeholder = ''
                           value = {amd_type}  
                           onChange= {(e)=>this.setState({amd_type : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Remarks',languageData)}</Label>
                           <Input   className = {"fontstyle text-background-paste" } 
                           placeholder = ''
                           value = {remarks}  
                           onChange= {(e)=>this.setState({remarks : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'Inputter/ Corrector',languageData)}</Label>
                            <Input   className = {"fontstyle text-background-paste" } 
                            placeholder = ''
                            value = {correction_remarks}  
                            onChange= {(e)=>this.setState({correction_remarks : e.target.value})} 
                            />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Correction Received Date Time',languageData)}<a style = {{color :'red'}}>*</a></Label>
                           <Input   className = {is_submit === true && received_datetime === ''?  "error-border-paste":"fontstyle text-background-paste" } 
                           placeholder = ''
                           value = {received_datetime}  
                           onChange= {(e)=>this.setState({received_datetime : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Start Date Time',languageData)}
                           <br></br>{start_datetime}</Label>
                           
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'End Date Time',languageData)}
                           <br></br>{end_datetime}</Label>
                         
                       </div>
                      
                       
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error',languageData)}<a style = {{color :'red'}}>*</a></Label>
                           <Select className={is_submit === true && error === ''?  "error-border-select":"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={error_data.filter(option =>option.value === error)}
                            options={error_data}
                            onChange={(option) => this.setState({  error: option.value })}
                            />
                       </div>
                      
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Shipper / GSC',languageData)}<a style = {{color :'red'}}>*</a></Label>
                           <Select className={is_submit === true && shipper === ''?  "error-border-select":"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={shipper_data.filter(option =>option.value === shipper)}
                            options={shipper_data}
                            onChange={(option) => this.setState({  shipper: option.value })}
                            />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Auditor ID',languageData)}<a style = {{color :'red'}}>*</a></Label>
                           <Input   className = {is_submit === true && auditor_id === ''?  "error-border":"fontstyle text-background" } 
                           placeholder = ''
                           value = {auditor_id}  
                           onChange= {(e)=>this.setState({auditor_id : e.target.value})} 
                           />
                       </div>
                   
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Auditor Remarks',languageData)}<a style = {{color :'red'}}>*</a></Label>
                           <Input   className = {is_submit === true && auditor_remarks === ''?  "error-border":"fontstyle text-background" } 
                           placeholder = ''
                           value = {auditor_remarks}  
                           onChange= {(e)=>this.setState({auditor_remarks : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'TL Acceptance',languageData)}</Label>
                           <Select className={"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={tl_acceptance_data.filter(option =>option.value === tl_acceptance)}
                            options={tl_acceptance_data}
                            onChange={(option) => this.setState({  tl_acceptance: option.value })}
                            />
                       </div>
               
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'TL Remarks',languageData)}</Label>
                           <Input   className = {"fontstyle text-background" }  
                           placeholder = ''
                           value = {tl_remarks}  
                           onChange= {(e)=>this.setState({tl_remarks : e.target.value})} 
                           />
                       </div> 
                   </div>
                  
               
               <div className = "text-center" style = {{paddingBottom:'20px'}}>
                <Button className = "button-width" color="secondary"  style={{width:'150px'}}
                    onClick={()=>this.onPaste()} >
                        {onChangeLanguage(locale,'Paste',languageData)} </Button> 
                 <Button className = "button-width" color="primary"  style={{width:'150px'}}
                                onClick={()=>this.onSubmit()}>
                 {onChangeLanguage(locale,'Save',languageData)} </Button> 
                <Button className = "button-width" color="secondary"  style={{width:'150px'}}
                    onClick={()=>this.clearValue()} >
                        {onChangeLanguage(locale,'Reset',languageData)} </Button> 
                        
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

   })(InputAudit)
  );

