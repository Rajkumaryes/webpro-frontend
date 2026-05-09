import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { createNotification } from '../../../../toast';
import{ErrorService} from '../../../../redux/Export/errormodule/saga'
import {onChangeLanguage,convertLocalToUTCDate} from '../../../../helper'
import Loading from "react-fullscreen-loading";
import moment from 'moment';
import Workbook from 'react-excel-workbook'
import DatePickerDate from "../../datePickerDate";


class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        shipment_no:'',
        mtd:'',
        invoice_no:'',
        customer_name:'',
        error_code_group:'',
        error_code:'',
        reason_code:'',
        recd_date:'',
        error_userid:'',
        receiver:'',
        error_des:'',
        remarks:'',
        start_time: new Date(),
        updated_start_time:new Date(),
         data:[],
        is_submit:false
      };
    }
    componentWillMount()
    {
     
    }
   
  
   
    changecontractstartdate = (date) => {  
        this.setState({
           startdate : date,
           
        }); 
      }
     
    onSubmit() { 
        const {date,shipment_no,mtd,invoice_no,customer_name,error_code_group,error_code,reason_code,recd_date,error_userid,receiver,error_des,remarks, start_time,updated_start_time} = this.state;
        if(date,shipment_no,mtd,invoice_no,customer_name,error_code_group,error_code!=='' &&reason_code!=='' &&recd_date!=='' &&error_userid!=='' &&receiver!=='' &&
        error_des!=='' )
        { 
      
          var recd_datess =  moment(recd_date).format('MM/DD/YYYY')
          const end_time = recd_datess, updated_end_time= new Date()
          const {username} = this.props

          ErrorService.createerrormodule(username,shipment_no,mtd,invoice_no,customer_name,error_code_group,error_code,
            reason_code,recd_datess,error_userid,receiver,error_des,remarks,
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
                this.clearvalue()
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
      
  clearvalue()
  {
    this.setState({
        shipment_no:'',
        mtd:'',
        invoice_no:'',
        customer_name:'',
        error_code_group:'',
        error_code:'',
        reason_code:'',
        recd_date:'',
        error_userid:'',
        receiver:'',
        error_des:'',
        remarks:'',
        start_time: new Date(),
        updated_start_time:new Date(),
        is_submit:false,
    })
} 
      renderTemplate()
  {
    const {languageData,locale} = this.props
    const {data} = this.state
    var array = data.map(record=> {
          return {
            'Date':record.date,
            'shipment_no' : record.shipment_no,
            'MTD' : record.mtd,
            'Invoice No (For INVS)' : record.invoice_no,
            'Customer Name' : record.customer_name,
            'Error Code Group' : record.error_code_group,
            'Error Sensitivity':record.error_code,
            'Error/Reason code':record.reason_code,
            'Error Description':record.error_des,
            'Correction/Audit recd date':record.recd_date,
            'error_useridCorrection' : record.error_userid,
            'Receiver':record.receiver,
            'Remarks':record.remarks,
        };
      })
      return(
        
        <Workbook filename="Error_module.xlsx" element={
          <Button className = "button-width" color="secondary"
          >{ onChangeLanguage(locale,'Download Template',languageData)}  
          </Button>
		      }>
          <Workbook.Sheet data={array} name="Sheet A">
          <Workbook.Column label= "Date" value="Date"/>
          <Workbook.Column label= "Shipment" value="shipment_no"/>
          <Workbook.Column label= "MTD" value="MTD"/>
          <Workbook.Column label= "Invoice no (For INVS)" value="Invoice No (For INVS)"/>
          <Workbook.Column label= "Customer Name" value="Customer Name"/>
          <Workbook.Column label= "Error code group" value="Error Code Group"/>
          <Workbook.Column label= "Error Sensitivity" value="Error Sensitivity"/>
          <Workbook.Column label= "Error/Reason code" value="Error/Reason code"/>
          <Workbook.Column label= "Error description" value="Error Description"/>
          <Workbook.Column label= "Correction/Audit  recd date" value="Correction/Audit recd date"/>
          <Workbook.Column label= "Error capturing user id" value="error_useridCorrection"/>
          <Workbook.Column label= "Receiver" value="Receiver"/>
          <Workbook.Column label= "Remarks" value="Remarks"/>
          </Workbook.Sheet> 
        </Workbook>
     

      );
  }  
  onChangeFileUpload(files)
	{
    const {username}=this.props
    this.setState({
      loading : true
    })
    ErrorService.fileUpload(files[0],username)
      .then((res) => { 
        if(res.status)
        {
          this.setState({
            loading : false
          })
          if(res.data.status)   
          {   
         
            createNotification('Uploaded','success','filled')
            
          }    
          else{
            this.setState({
              loading : false
            })
            createNotification(res.data.message,'error','filled')
          }
        }
          
    
    })
    .catch((error) => { 
      this.setState({
        loading : false
      })
      });
  }
  onChangestart(value)
  {
      this.setState({recd_date:value})
  }
    render()
    {
        const {match,languageData,locale} = this.props
        const { loading,start_time,shipment_no,mtd,invoice_no,customer_name,error_code_group,error_code,
          reason_code,recd_date,error_userid,receiver,error_des,remarks,is_submit} = this.state
        return (
            <>
             <title>{onChangeLanguage(locale,'Error Module',languageData)}</title>
             {loading && 
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
            <Row>
              <Colxx xxs="12">
              <div className = "row">
                      <div className = "col-md-8">
                      <Breadcrumb heading={onChangeLanguage(locale,'Error Module',languageData)} match={match} />
                    </div>
                    <div className = "col-md-2">
                        <Button className = "button-width" color="primary" style= {{width: '63%', marginLeft: '83px'}}>
                            <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
                            <a style= {{margin :'0px'}} >{onChangeLanguage(locale,'Upload',languageData)} </a>
                            <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                                className = "filepicker_customButton"
                                style = {{width : '80%',marginLeft :'-56%'}}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
                        </Button>
                    </div>
                    <div className = "col-md-2" >
                       {this.renderTemplate()}
                    </div>
                  </div>
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row" style = {{}}>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Date',languageData)}
                            <br></br> {moment(start_time).format('MM/DD/YYYY hh:mm a')}</Label>
                           
                        </div>
                       
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Shipment Number',languageData)} <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && shipment_no === ''?  "error-border":"fontstyle text-background" }  
                            placeholder = ''
                            value = {shipment_no}  
                            onChange= {(e)=>this.setState({shipment_no : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'MTD Number',languageData)} <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && mtd === ''?  "error-border":"fontstyle text-background" }  
                            placeholder = ''
                            value = {mtd}  
                            onChange= {(e)=>this.setState({mtd : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Invoice No (For INVS)',languageData)} <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && invoice_no === ''?  "error-border":"fontstyle text-background" }  
                            placeholder = ''
                            value = {invoice_no}  
                            onChange= {(e)=>this.setState({invoice_no : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Customer Name',languageData)} <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && customer_name === ''?  "error-border":"fontstyle text-background" }  
                            placeholder = ''
                            value = {customer_name}  
                            onChange= {(e)=>this.setState({customer_name : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Code Group',languageData)} <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && error_code_group === ''?  "error-border":"fontstyle text-background" }  
                            placeholder = ''
                            value = {error_code_group}  
                            onChange= {(e)=>this.setState({error_code_group : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Sensitivity',languageData)} <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && error_code === ''?  "error-border":"fontstyle text-background" }  
                            placeholder = ''
                            value = {error_code}  
                            onChange= {(e)=>this.setState({error_code : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error/Reason code ',languageData)} <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && reason_code === ''?  "error-border":"fontstyle text-background" }  
                            placeholder = ''
                            value = {reason_code}  
                            onChange= {(e)=>this.setState({reason_code : e.target.value})} 
                            />
                        </div>
                 
                    <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Correction/Audit Recd Date',languageData)}
                              <a style = {{color :'red'}}>*</a></Label>
                               <p1 className = 'fontstyle mandatory-label'>
                                {is_submit === true && recd_date === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                              <DatePickerDate
                                 selected={recd_date}
                                 className = "text-background" 
                                 onChange={(date) => this.onChangestart(date)}
                                 />
                                
                        </div> 
                       
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Receiver',languageData)} <a style = {{color :'red'}}>*</a> </Label>
                            <Input  className = {is_submit === true && receiver === ''?  "error-border":"fontstyle text-background" }  
                            placeholder = ''
                            value = {receiver}  
                            onChange= {(e)=>this.setState({receiver : e.target.value.toUpperCase()})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Correction/Audit Recd DateError Capturing User ID',languageData)}  <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && error_userid === ''?  "error-border":"fontstyle text-background" }  
                            placeholder = ''
                            value = {error_userid}  
                            onChange= {(e)=>this.setState({error_userid : e.target.value.toUpperCase()})} 
                            />
                        </div>  
                        </div>
                        <div className = "row">                  
                          <div className = "col-md-6 space-margin">
                              <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Description',languageData)} <a style = {{color :'red'}}>*</a></Label>
                              <textarea 
                              className = {is_submit === true && error_des === ''?  "border-textarea-background":"fontstyle textarea-background" } 
                                  placeholder = ''
                                  value = {error_des}  
                                  onChange= {(e)=>this.setState({error_des : e.target.value})} 
                              />
                          </div>
                          <div className = "col-md-6 space-margin">
                              <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Remarks',languageData)} <a style = {{color :'red'}}>*</a></Label>
                              <textarea 
                              className = "fontstyle textarea-background"
                                  placeholder = ''
                                  value = {remarks}  
                                  onChange= {(e)=>this.setState({remarks : e.target.value})} 
                              />
                          </div>
                     </div>
                    <div className = "row text-center">                      
                          <Button className = "button-width" color="primary"    
                                onClick={()=>this.onSubmit()}
                                >{onChangeLanguage(locale,'Save',languageData)} </Button>                         
                             <Button className = "button-width" color="secondary"   
                                    onClick={()=>this.clearvalue()}
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

