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
import{destinationService} from '../../../../redux/qa/destination/saga'
import{destinationcategoryService} from '../../../../redux/qa/destinationcategory/saga'
import{destinationsubcategoryService} from '../../../../redux/qa/destinationsubcategory/saga'
import{tlacceptanceService} from '../../../../redux/qa/tlacceptance/saga'
import {getValue_Destination} from '../pasteData'
import * as clipboard from "clipboard-polyfill/text";

class InputAudit extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        shipment_no:'',
        mtd_no:'',
        customer:'',
        mtd_processed_date:'',
        main_pol:'',
        main_pod:'',
        input_id:'',
        origin_team:'',
        destination_team:'',
        start_datetime:'',
        end_datetime:'',
        error:'',
        category:'',
        subcategory:'',
        auditor_id:'',
        auditor_remarks:'',
        tl_acceptance:'',
        tl_remarks:'',
        tl_acceptance_data:[],
        error_data:[
            {label:'YES',value:'YES'},
            {label:'NO',value:'NO'},
        ],
        category_data:[],
        subcategory_data:[],
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
        this.fetchErrorCategory()
        this.fetchErrorSubCategory()
        this.fetchTLAcceptance()
       
    }
    fetchErrorCategory() {
        this.setState({
          loading : true
        })
        destinationcategoryService.fetchapi()
          .then((res) => {
              this.setState({loading:false})
             if(res.status)   { 
                let filterstatus = (res.data).filter(item => item.status === 1)
                   var arealist = filterstatus.map(function(areaaval) {
                        return  {label : areaaval.name ,value : (areaaval.id).toString()};
                     });  
                      this.setState({
                      category_data :  arealist,
                      })
                   }
                  
                   })
                   .catch((error) => { 
                      this.setState({
                          loading : false
                        })
                   }); 
       }
       fetchErrorSubCategory() {
        this.setState({
          loading : true
        })
        destinationsubcategoryService.fetchapi()
          .then((res) => {
              this.setState({loading:false})
             if(res.status)   { 
                let filterstatus = (res.data).filter(item => item.status === 1)
                   var arealist = filterstatus.map(function(areaaval) {
                        return  {label : areaaval.name ,value : (areaaval.id).toString()};
                     });  
                      this.setState({
                      subcategory_data :  arealist,
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
        const {shipment_no,mtd_no,customer,mtd_processed_date,main_pod,main_pol,input_id,origin_team,destination_team,
            start_datetime,error,category,subcategory,auditor_id,
             auditor_remarks,tl_acceptance,tl_remarks,start_time,updated_start_time} = this.state
        var end_datetime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
        if(shipment_no !== "" &&  mtd_no !== "" &&  customer !== "" &&  mtd_processed_date !== "" &&  main_pod !== "" &&  
           main_pol !== "" &&  input_id !== "" &&  origin_team !== "" &&  destination_team !== "" && 
            start_datetime !== ""  &&  error !== "" &&  category !== "" &&  
            subcategory !== "" &&  auditor_id !== "" && auditor_remarks !== "" )
        {
            const {username} = this.props
            const end_time = new Date() ,updated_end_time = new Date()
            this.setState({
              loading : true,
              end_datetime :end_datetime ,
            })
            destinationService.createapi(username,shipment_no,mtd_no,customer,mtd_processed_date,main_pod,main_pol,input_id,origin_team,destination_team,
                start_datetime,end_datetime,error,category,subcategory,auditor_id,
                 auditor_remarks,tl_acceptance,tl_remarks,
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
                        mtd_processed_date:'',
                        main_pol:'',
                        main_pod:'',
                        input_id:'',
                        origin_team:'',
                        destination_team:'',
                        start_datetime : moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
                        end_datetime:'',
                        error:'',
                        category:'',
                        subcategory:'',
                        auditor_id:'',
                        auditor_remarks:'',
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
            mtd_processed_date:'',
            main_pol:'',
            main_pod:'',
            input_id:'',
            origin_team:'',
            destination_team:'',
            start_datetime : moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
            end_datetime:'',
            error:'',
            category:'',
            subcategory:'',
            auditor_id:'',
            auditor_remarks:'',
            tl_acceptance:'',
            tl_remarks:'',
            is_submit:false,
        })
    }
    onPaste()
    {
        clipboard.readText().then((text)=>{
            var record = getValue_Destination(text)
            console.log("kjbkj " , JSON.stringify(record))
            this.setState({
                shipment_no:record.shipment_no,	
            mtd_no:record.mtd_no,	
            customer:record.customer,	
            mtd_processed_date:record.mtd_processed_date,	
            main_pol:record.main_pol,	
            main_pod:record.main_pod,	
            input_id:record.input_id,	
            origin_team:record.origin_team,	
            destination_team:record.destination_team,
            end_datetime:record.end_datetime,	
            error:record.error,	
            category:record.category,	
            subcategory:record.subcategory,	
            auditor_id:record.auditor_id,	
            auditor_remarks:record.auditor_remarks,	
            tl_acceptance:record.tl_acceptance,	
            tl_remarks:record.tl_remarks
                })
              
            });
    }
   
    
    render()
    {
        const {locale,languageData,title} = this.props
        const {shipment_no,mtd_no,customer,mtd_processed_date,main_pod,main_pol,input_id,origin_team,destination_team,
        start_datetime,end_datetime,error,category,subcategory,auditor_id,loading,is_submit,
         auditor_remarks,tl_acceptance,tl_remarks,error_data,category_data,tl_acceptance_data,subcategory_data} = this.state
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
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Customer',languageData)}<a style = {{color :'red'}}>*</a></Label>
                           <Input   className = {is_submit === true && customer === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                           placeholder = ''
                           value = {customer}  
                           onChange= {(e)=>this.setState({customer : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'MTD Processed Date',languageData)}<a style = {{color :'red'}}>*</a></Label>
                           <Input   className = {is_submit === true && mtd_processed_date === ''?  "error-border-paste":"fontstyle text-background-paste" } 
                           placeholder = ''
                           value = {mtd_processed_date}  
                           onChange= {(e)=>this.setState({mtd_processed_date : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Main POL',languageData)}<a style = {{color :'red'}}>*</a></Label>
                           <Input   className = {is_submit === true && main_pol === ''?  "error-border-paste":"fontstyle text-background-paste" }
                           placeholder = ''
                           value = {main_pol}  
                           onChange= {(e)=>this.setState({main_pol : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Main POD',languageData)}<a style = {{color :'red'}}>*</a></Label>
                           <Input   className = {is_submit === true && main_pod === ''?  "error-border-paste":"fontstyle text-background-paste" }
                           placeholder = ''
                           value = {main_pod}  
                           onChange= {(e)=>this.setState({main_pod : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Inputter ID',languageData)}<a style = {{color :'red'}}>*</a></Label>
                           <Input   className = {is_submit === true && input_id === ''?  "error-border-paste":"fontstyle text-background-paste" } 
                           placeholder = ''
                           value = {input_id}  
                           onChange= {(e)=>this.setState({input_id : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Origin Team',languageData)}<a style = {{color :'red'}}>*</a></Label>
                           <Input   className = {is_submit === true && origin_team === ''?  "error-border-paste":"fontstyle text-background-paste" }   
                           placeholder = ''
                           value = {origin_team}  
                           onChange= {(e)=>this.setState({origin_team : e.target.value})} 
                           />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Destination Team',languageData)}<a style = {{color :'red'}}>*</a></Label>
                           <Input   className = {is_submit === true && destination_team === ''?  "error-border-paste":"fontstyle text-background-paste" }   
                           placeholder = ''
                           value = {destination_team}  
                           onChange= {(e)=>this.setState({destination_team : e.target.value})} 
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
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Category',languageData)}<a style = {{color :'red'}}>*</a></Label>
                           <Select className={is_submit === true && category === ''?  "error-border-select":"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={category_data.filter(option =>option.value === category)}
                            options={category_data}
                            onChange={(option) => this.setState({  category: option.value })}
                            />
                       </div>
                       <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'Error Sub Category',languageData)}<a style = {{color :'red'}}>*</a></Label>
                           <Select  className={is_submit === true && subcategory === ''?  "error-border-select":"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={subcategory_data.filter(option =>option.value === subcategory)}
                            options={subcategory_data}
                            onChange={(option) => this.setState({  subcategory: option.value })}
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

