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
import{mafauditService} from '../../../../redux/qa/mafaudit/saga'
import{tlacceptanceService} from '../../../../redux/qa/tlacceptance/saga'
import{chargecodetypeService} from '../../../../redux/qa/chargecodetype/saga'
import{standardcommentService} from '../../../../redux/qa/standardcomment/saga'
import{mafapplicableService} from '../../../../redux/qa/mafapplicable/saga'
import {getValue_MAF} from '../pasteData'
import * as clipboard from "clipboard-polyfill/text";
class InputAudit extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        shipment_no:'',
        mtd_no:'',
        customer:'',
        corrector_id:'',
        charge_applicable:'',
        standardcomment:'',
        maf_applicable:'',
        start_datetime:'',
        end_datetime:'',
        chargecode:'',
        error:'',
        sob_date:'',
        auditor_id:'',
        auditor_remarks:'',
        tl_acceptance:'',
        tl_remarks:'',
        subcategory_comment:'',
        first_received_date:'',
        second_received_date:'',
        third_received_date:'',
        fourth_received_date:'',
        fifth_received_date:'',
        sixth_received_date:'',
        seventh_received_date:'',
        maf_xnx:'',
        maf_procedure:'',
        tl_acceptance_data:[],
        chargecode_data:[],
        error_data:[
            {label:'YES',value:'YES'},
            {label:'NO',value:'NO'},
        ],
        standardcomment_data:[],
        maf_applicable_data:[],
        charge_applicable_data:[
            {label:'YES',value:'YES'},
            {label:'NO',value:'NO'},
        ],
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
        this.fetchTLAcceptance()
        this.fetchMAFApplicable()
        this.fetchChargeCode()
        this.fetchStandardComment()
       
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
     fetchMAFApplicable() {
        this.setState({
          loading : true
        })
        mafapplicableService.fetchapi()
          .then((res) => {
              this.setState({loading:false})
             if(res.status)   { 
                let filterstatus = (res.data).filter(item => item.status === 1)
                   var arealist = filterstatus.map(function(areaaval) {
                        return  {label : areaaval.name ,value : (areaaval.id).toString()};
                     });  
                      this.setState({
                      maf_applicable_data :  arealist,
                      })
                   }
                  
                   })
                   .catch((error) => { 
                      this.setState({
                          loading : false
                        })
                   }); 
       }
       fetchChargeCode() {
        this.setState({
          loading : true
        })
        chargecodetypeService.fetchapi()
          .then((res) => {
              this.setState({loading:false})
             if(res.status)   { 
                let filterstatus = (res.data).filter(item => item.status === 1)
                   var arealist = filterstatus.map(function(areaaval) {
                        return  {label : areaaval.name ,value : (areaaval.id).toString()};
                     });  
                      this.setState({
                        chargecode_data :  arealist,
                      })
                   }
                  
                   })
                   .catch((error) => { 
                      this.setState({
                          loading : false
                        })
                   }); 
       }
       fetchStandardComment() {
        this.setState({
          loading : true
        })
        standardcommentService.fetchapi()
          .then((res) => {
              this.setState({loading:false})
             if(res.status)   { 
                let filterstatus = (res.data).filter(item => item.status === 1)
                   var arealist = filterstatus.map(function(areaaval) {
                        return  {label : areaaval.name ,value : (areaaval.id).toString()};
                     });  
                      this.setState({
                      standardcomment_data :  arealist,
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
        const {shipment_no,mtd_no,customer,corrector_id,subcategory_comment,charge_applicable,maf_applicable,
            start_datetime,chargecode,error,sob_date,auditor_id,standardcomment,
             auditor_remarks,tl_acceptance,tl_remarks,first_received_date,second_received_date,third_received_date,fourth_received_date,
             fifth_received_date,sixth_received_date,seventh_received_date,maf_xnx,maf_procedure,start_time,updated_start_time} = this.state
        var end_datetime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
        if(shipment_no !== "" &&  mtd_no !== "" &&  customer !== "" &&  corrector_id !== "" &&  
        standardcomment !== "" &&  error !== "" &&  
        auditor_id !== "" && auditor_remarks !== "" && maf_procedure!== "")
        {
            const {username} = this.props
            const end_time = new Date() ,updated_end_time = new Date()
            this.setState({
              loading : true,
              end_datetime :end_datetime ,
            })
            mafauditService.createapi(username,shipment_no,mtd_no,customer,corrector_id,charge_applicable,maf_applicable,
                start_datetime,end_datetime,chargecode,error,sob_date,auditor_id,standardcomment,
                 auditor_remarks,tl_acceptance,tl_remarks,subcategory_comment,first_received_date,second_received_date,third_received_date,fourth_received_date,
                 fifth_received_date,sixth_received_date,seventh_received_date,maf_xnx,maf_procedure,
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
                        corrector_id:'',
                        charge_applicable:'',
                        standardcomment:'',
                        maf_applicable:'',
                        start_datetime : moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
                        end_datetime:'',
                        chargecode:'',
                        error:'',
                        sob_date:'',
                        subcategory_comment:'',
                        auditor_id:'',
                        auditor_remarks:'',
                        tl_acceptance:'',
                        tl_remarks:'',
                        first_received_date:'',
                        second_received_date:'',
                        third_received_date:'',
                        fourth_received_date:'',
                        fifth_received_date:'',
                        sixth_received_date:'',
                        seventh_received_date:'',
                        maf_xnx:'',
                        maf_procedure:'',
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
            corrector_id:'',
            charge_applicable:'',
            standardcomment:'',
            maf_applicable:'',
            start_datetime : moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
            end_datetime:'',
            chargecode:'',
            error:'',
            sob_date:'',
            subcategory_comment:'',
            auditor_id:'',
            auditor_remarks:'',
            tl_acceptance:'',
            tl_remarks:'',
            first_received_date:'',
            second_received_date:'',
            third_received_date:'',
            fourth_received_date:'',
            fifth_received_date:'',
            sixth_received_date:'',
            seventh_received_date:'',
            maf_xnx:'',
            maf_procedure:'',
            is_submit:false,
        })
    }
    onPaste()
    {
        clipboard.readText().then((text)=>{
            var record = getValue_MAF(text)
            console.log("kjbkj " , JSON.stringify(record))
            this.setState({
                shipment_no:record.shipment_no,
                mtd_no:record.mtd_no,
                customer:record.customer,
                corrector_id:record.corrector_id,
                charge_applicable:record.charge_applicable,
                standardcomment:record.standardcomment,
                maf_applicable:record.maf_applicable,
                end_datetime:record.end_datetime,
                chargecode:record.chargecode,
                error:record.error,
                sob_date:record.sob_date,
                subcategory_comment:record.subcategory_comment,
                auditor_id:record.auditor_id,
                auditor_remarks:record.auditor_remarks,
                tl_acceptance:record.tl_acceptance,
                tl_remarks:record.tl_remarks,
                first_received_date:record.first_received_date,
                second_received_date:record.second_received_date,
                third_received_date:record.third_received_date,
                fourth_received_date:record.fourth_received_date,
                fifth_received_date:record.fifth_received_date,
                sixth_received_date:record.sixth_received_date,
                seventh_received_date:record.seventh_received_date,
                maf_xnx:record.maf_xnx,
                maf_procedure:record.maf_procedure,
                })
              
            });
    }
   
    
    render()
    {
        const {locale,languageData,title} = this.props
        const {shipment_no,mtd_no,customer,corrector_id,standardcomment,charge_applicable,maf_applicable,standardcomment_data,
        start_datetime,end_datetime,chargecode,error,sob_date,auditor_id,loading,is_submit,maf_applicable_data,subcategory_comment,
         auditor_remarks,tl_acceptance,tl_remarks,first_received_date,second_received_date,third_received_date,fourth_received_date,
         fifth_received_date,sixth_received_date,seventh_received_date,maf_xnx,maf_procedure,chargecode_data,error_data,tl_acceptance_data,charge_applicable_data} = this.state
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
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'SOB Date',languageData)}</Label>
                           <Input   className = {"fontstyle text-background-paste" }  
                           placeholder = ''
                           value = {sob_date}  
                           onChange= {(e)=>this.setState({sob_date : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Customer Name',languageData)}<a style = {{color :'red'}}>*</a></Label>
                           <Input   className = {is_submit === true && customer === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                           placeholder = ''
                           value = {customer}  
                           onChange= {(e)=>this.setState({customer : e.target.value})} 
                           />
                       </div>
                       
                       {/* <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'MAF Applicable Stage',languageData)}<a style = {{color :'red'}}>*</a></Label>
                           <Select className={is_submit === true && maf_applicable === ''?  "error-border-select":"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={maf_applicable_data.filter(option =>option.value === maf_applicable)}
                            options={maf_applicable_data}
                            onChange={(option) => this.setState({  maf_applicable: option.value })}
                            />
                       </div> */}
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'1st DC Received Date & Time',languageData)}</Label>
                           <Input   className = {"fontstyle text-background-paste" }  
                           placeholder = ''
                           value = {first_received_date}  
                           onChange= {(e)=>this.setState({first_received_date : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'2st DC Received Date & Time',languageData)}</Label>
                           <Input   className = {"fontstyle text-background-paste" }  
                           placeholder = ''
                           value = {second_received_date}  
                           onChange= {(e)=>this.setState({second_received_date : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'3rd DC Received Date & Time',languageData)}</Label>
                           <Input   className = {"fontstyle text-background-paste" }  
                           placeholder = ''
                           value = {third_received_date}  
                           onChange= {(e)=>this.setState({third_received_date : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'4th DC Received Date & Time',languageData)}</Label>
                           <Input   className = {"fontstyle text-background-paste" }  
                           placeholder = ''
                           value = {fourth_received_date}  
                           onChange= {(e)=>this.setState({fourth_received_date : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'5th DC Received Date & Time',languageData)}</Label>
                           <Input   className = {"fontstyle text-background-paste" }  
                           placeholder = ''
                           value = {fifth_received_date}  
                           onChange= {(e)=>this.setState({fifth_received_date : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'6th DC Received Date & Time',languageData)}</Label>
                           <Input   className = {"fontstyle text-background-paste" }  
                           placeholder = ''
                           value = {sixth_received_date}  
                           onChange= {(e)=>this.setState({sixth_received_date : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'7th DC Received Date & Time',languageData)}</Label>
                           <Input   className = {"fontstyle text-background-paste" }  
                           placeholder = ''
                           value = {seventh_received_date}  
                           onChange= {(e)=>this.setState({seventh_received_date : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'MAF/XNX/XNH',languageData)}</Label>
                           <Input   className = {"fontstyle text-background-paste" }  
                           placeholder = ''
                           value = {maf_xnx}  
                           onChange= {(e)=>this.setState({maf_xnx : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Type of Charge Code',languageData)}</Label>
                           <Select className={"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={chargecode_data.filter(option =>option.value === chargecode)}
                            options={chargecode_data}
                            onChange={(option) => this.setState({  chargecode: option.value })}
                            />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'MAF has to Apply as per Procedure',languageData)}<a style = {{color :'red'}}>*</a></Label>
                           <Input   className = {is_submit === true && maf_procedure === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                           placeholder = ''
                           value = {maf_procedure}  
                           onChange= {(e)=>this.setState({maf_procedure : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Charge Application',languageData)}</Label>
                           <Select className={"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"charge_applicable
                            value={charge_applicable_data.filter(option =>option.value === charge_applicable)}
                            options={charge_applicable_data}
                            onChange={(option) => this.setState({  charge_applicable: option.value })}
                            />
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
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Standard Comment',languageData)}<a style = {{color :'red'}}>*</a></Label>
                           <Select className={is_submit === true && standardcomment === ''?  "error-border-select":"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={standardcomment_data.filter(option =>option.value === standardcomment)}
                            options={standardcomment_data}
                            onChange={(option) => this.setState({  standardcomment: option.value })}
                            />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Sub Category Standard Comment',languageData)}</Label>
                           <Input   className = {"fontstyle text-background" }
                           placeholder = ''
                           value = {subcategory_comment}  
                           onChange= {(e)=>this.setState({subcategory_comment : e.target.value})} 
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
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Corrector ID',languageData)}<a style = {{color :'red'}}>*</a></Label>
                           <Input   className = {is_submit === true && corrector_id === ''?  "error-border":"fontstyle text-background" } 
                           placeholder = ''
                           value = {corrector_id}  
                           onChange= {(e)=>this.setState({corrector_id : e.target.value})} 
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

