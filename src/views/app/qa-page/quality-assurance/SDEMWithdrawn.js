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
import{sdemwithdrawnService} from '../../../../redux/qa/sdemwithdrawn/saga'
import{shipperService} from '../../../../redux/qa/shipper/saga'
import{tlacceptanceService} from '../../../../redux/qa/tlacceptance/saga'

import {getValue_SDEMWithdrawn} from '../pasteData'
import * as clipboard from "clipboard-polyfill/text";
class InputAudit extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        exception_issuedate:'',
        mtd_no:'',
        exception_no:'',
        subregion:'',
        errorcode_group:'',
        errorcode:'',
        receiver:'',
        area:'',
        start_datetime:'',
        end_datetime:'',
        region:'',
        error:'',
        user_of_lastaction:'',
        auditor_id:'',
        auditor_remarks:'',
        tl_acceptance:'',
        tl_remarks:'',
        capture_user:'',
        shipper:'',
        solvedby_capture_user:'',
        exception_status:'',
        performed_action:'',
        dod:'',
        issue_description:'',
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
        const {exception_issuedate,mtd_no,exception_no,subregion,errorcode,errorcode_group,receiver,area,
            start_datetime,region,error,user_of_lastaction,auditor_id,shipper,issue_description,
             auditor_remarks,tl_acceptance,tl_remarks,capture_user,solvedby_capture_user,exception_status,
             dod,performed_action,start_time,updated_start_time} = this.state
        var end_datetime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
        if(exception_issuedate !== "" &&  mtd_no !== "" &&  exception_no !== "" &&      
         receiver !== "" &&  capture_user !== "" &&shipper !== "" &&
            start_datetime !== "" &&   error !== "" &&  issue_description !== "" && 
            user_of_lastaction !== "" &&  auditor_id !== "" && auditor_remarks !== "" &&
            solvedby_capture_user !== "" && performed_action !== "")
        {
            const {username} = this.props
            const end_time = new Date() ,updated_end_time = new Date()
            this.setState({
              loading : true,
              end_datetime :end_datetime ,
            })
            sdemwithdrawnService.createapi(username,exception_issuedate,mtd_no,exception_no,subregion,errorcode,errorcode_group,receiver,area,
                start_datetime,end_datetime,region,error,user_of_lastaction,auditor_id,shipper,issue_description,
                 auditor_remarks,tl_acceptance,tl_remarks,capture_user,solvedby_capture_user,exception_status,
                 dod,performed_action,
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
                        exception_issuedate:'',
                        mtd_no:'',
                        exception_no:'',
                        subregion:'',
                        errorcode_group:'',
                        errorcode:'',
                        receiver:'',
                        area:'',
                        start_datetime : moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
                        end_datetime:'',
                        region:'',
                        error:'',
                        user_of_lastaction:'',
                        auditor_id:'',
                        auditor_remarks:'',
                        capture_user:'',
                        shipper:'',
                        tl_acceptance:'',
                        tl_remarks:'',
                        solvedby_capture_user:'',
                        exception_status:'',
                        performed_action:'',
                        dod:'',
                        issue_description:'',
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
            exception_issuedate:'',
            mtd_no:'',
            exception_no:'',
            subregion:'',
            errorcode_group:'',
            errorcode:'',
            receiver:'',
            area:'',
            start_datetime : moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
            end_datetime:'',
            region:'',
            error:'',
            user_of_lastaction:'',
            auditor_id:'',
            auditor_remarks:'',
            capture_user:'',
            shipper:'',
            tl_acceptance:'',
            tl_remarks:'',
            solvedby_capture_user:'',
            exception_status:'',
            performed_action:'',
            dod:'',
            issue_description:'',
            is_submit:false,
        })
    }
    onPaste()
    {
        clipboard.readText().then((text)=>{
            var record = getValue_SDEMWithdrawn(text)
            console.log("kjbkj " , JSON.stringify(record))
            this.setState({
                 exception_issuedate:record.exception_issuedate,
                mtd_no:record.mtd_no,
                exception_no:record.exception_no,
                subregion:record.subregion,
                errorcode_group:record.errorcode_group,
                errorcode:record.errorcode,
                receiver:record.receiver,
                area:record.area,
                end_datetime:record.end_datetime,
                region:record.region,
                error:record.error,
                user_of_lastaction:record.user_of_lastaction,
                auditor_id:record.auditor_id,
                auditor_remarks:record.auditor_remarks,
                capture_user:record.capture_user,
                shipper:record.shipper,
                tl_acceptance:record.tl_acceptance,
                tl_remarks:record.tl_remarks,
                solvedby_capture_user:record.solvedby_capture_user,
                exception_status:record.exception_status,
                performed_action:record.performed_action,
                dod:record.dod,
                issue_description:record.issue_description,
                })
              
            });
    }
   
    
    render()
    {
        const {locale,languageData,title} = this.props
        const {exception_issuedate,mtd_no,exception_no,subregion,errorcode,errorcode_group,receiver,area,shipper,shipper_data,
        start_datetime,end_datetime,region,error,user_of_lastaction,auditor_id,loading,is_submit,issue_description,
         auditor_remarks,tl_acceptance,tl_remarks,error_data,tl_acceptance_data,capture_user,solvedby_capture_user,exception_status,
         dod,performed_action} = this.state
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
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Exception Issue Date',languageData)}<a style = {{color :'red'}}>*</a></Label>
                           <Input   className = {is_submit === true && exception_issuedate === ''?  "error-border-paste":"fontstyle text-background-paste" }
                           placeholder = ''
                           value = {exception_issuedate}  
                           onChange= {(e)=>this.setState({exception_issuedate : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Exception Number',languageData)}<a style = {{color :'red'}}>*</a></Label>
                           <Input   className = {is_submit === true && exception_no === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                           placeholder = ''
                           value = {exception_no}  
                           onChange= {(e)=>this.setState({exception_no : e.target.value})} 
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
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Region (Issuer)',languageData)}</Label>
                             <Input   className = {"fontstyle text-background-paste" }
                           placeholder = ''
                           value = {region}  
                           onChange= {(e)=>this.setState({region : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Subregion (Issuer)',languageData)}</Label>
                           <Input   className = {"fontstyle text-background-paste" } 
                           placeholder = ''
                           value = {subregion}  
                           onChange= {(e)=>this.setState({subregion : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Area (Issuer)',languageData)}</Label>
                           <Input   className = {"fontstyle text-background-paste" }   
                           placeholder = ''
                           value = {area}  
                           onChange= {(e)=>this.setState({area : e.target.value})} 
                           />
                       </div>
                      
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Code Group',languageData)}</Label>
                           <Input   className = {"fontstyle text-background-paste" }
                           placeholder = ''
                           value = {errorcode_group}  
                           onChange= {(e)=>this.setState({errorcode_group : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Code',languageData)}</Label>
                           <Input   className = {"fontstyle text-background-paste" }
                           placeholder = ''
                           value = {errorcode}  
                           onChange= {(e)=>this.setState({errorcode : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Receiver',languageData)}<a style = {{color :'red'}}>*</a></Label>
                           <Input   className = {is_submit === true && receiver === ''?  "error-border-paste":"fontstyle text-background-paste" } 
                           placeholder = ''
                           value = {receiver}  
                           onChange= {(e)=>this.setState({receiver : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'User of Last Action',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input   className = {is_submit === true && user_of_lastaction === ''?  "error-border-paste":"fontstyle text-background-paste" } 
                            placeholder = ''
                            value = {user_of_lastaction}  
                            onChange= {(e)=>this.setState({user_of_lastaction : e.target.value})} 
                            />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Capturing User',languageData)}<a style = {{color :'red'}}>*</a></Label>
                           <Input   className = {is_submit === true && capture_user === ''?  "error-border-paste":"fontstyle text-background-paste" } 
                           placeholder = ''
                           value = {capture_user}  
                           onChange= {(e)=>this.setState({capture_user : e.target.value})} 
                           />
                       </div>
                       
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Solved by Capturing User',languageData)}<a style = {{color :'red'}}>*</a></Label>
                           <Input   className = {is_submit === true && solvedby_capture_user === ''?  "error-border-paste":"fontstyle text-background-paste" } 
                           placeholder = ''
                           value = {solvedby_capture_user}  
                           onChange= {(e)=>this.setState({solvedby_capture_user : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Exception Status',languageData)}</Label>
                           <Input   className = {"fontstyle text-background-paste" } 
                           placeholder = ''
                           value = {exception_status}  
                           onChange= {(e)=>this.setState({exception_status : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Performed Action',languageData)}<a style = {{color :'red'}}>*</a></Label>
                           <Input   className = {is_submit === true && performed_action === ''?  "error-border-paste":"fontstyle text-background-paste" } 
                           placeholder = ''
                           value = {performed_action}  
                           onChange= {(e)=>this.setState({performed_action : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Date of Creation (MTD)',languageData)}</Label>
                           <Input   className = {"fontstyle text-background-paste" } 
                           placeholder = ''
                           value = {dod}  
                           onChange= {(e)=>this.setState({dod : e.target.value})} 
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
                       <div className = "col-md-12 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Issue Description',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <textarea 
                            className = {is_submit === true && issue_description === ''?  "border-textarea-background-paste":"fontstyle textarea-background-paste" }  
                            placeholder = ''
                            value = {issue_description}  
                            onChange= {(e)=>this.setState({issue_description : e.target.value})} 
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

