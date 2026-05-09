import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import moment from 'moment';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import {onChangeLanguage,convertLocalToUTCDate} from '../../../../helper'
import{productivityService} from '../../../../redux/pack-kpi/productivityeh_finding/saga'
import {getValue_Z1910} from '../../pasteData'
import * as clipboard from "clipboard-polyfill/text";
class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        analysis_done_week:'',
        end_time:'',
        exception_no:'',
        start_time:new Date(),
        updated_start_time:new Date(),
        action_party:'',
        document_no:'',
        shipment_no:'',
        reason_code:'',
        eh_status:'',
        remarks:'',
        is_submit:false
      };
    }
    componentDidMount()
    {

    }
    
    onSubmit()
    {
        const {analysis_done_week,action_party,document_no,shipment_no,exception_no,
            reason_code,eh_status,start_time,updated_start_time,remarks} = this.state
        if(analysis_done_week !== "" &&   action_party !== "" &&   document_no !== "" &&   shipment_no !== "" &&   
        exception_no !== "" && reason_code !== "" &&   eh_status !== "")
        {
          const end_time =   new Date() ,updated_end_time = new Date()
            this.setState({end_time:end_time,  })
            const {username} = this.props
            this.setState({
              loading : true
            })
            productivityService.createapi(username,analysis_done_week,action_party,document_no,shipment_no,exception_no,
                reason_code,eh_status,
                convertLocalToUTCDate( start_time),
                convertLocalToUTCDate( end_time),
                convertLocalToUTCDate( updated_start_time),
                convertLocalToUTCDate(updated_end_time),remarks)
              .then((res) => { 
                this.setState({   
                  loading : false     
                }) 
                if(res.status)
                  {
                    createNotification('Created','success','filled')
                    this.setState({
                      analysis_done_week:'',
                      end_time:'',
                      exception_no:'',
                      start_time:new Date(),
                      updated_start_time:new Date(),
                      action_party:'',
                      document_no:'',
                      shipment_no:'',
                      reason_code:'',
                      eh_status:'',
                      remarks:'',
                      is_submit:false
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
            analysis_done_week:'',
            end_time:'',
            exception_no:'',
            start_time:new Date(),
            updated_start_time:new Date(),
            action_party:'',
            document_no:'',
            shipment_no:'',
            reason_code:'',
            eh_status:'',
            remarks:'',
            is_submit:false
        })
    }
    async onPasteZ1910() {
      clipboard.readText().then((text)=>{
          var record = getValue_Z1910(text)
      console.log("kjbkj " , JSON.stringify(record))
      this.setState({
          paste_data:text,
             document_no:record.document_no,
             shipment_no:record.shipment_no,
             reason_code:record.reason_code,
             eh_status:record.eh_status,
             action_party:record.action_party,
             exception_no:record.exception_no,
          })
         
      });
      
  }
  handleKeypress (e) {
    const characterCode = e.key
    if (characterCode === 'Backspace') return

    const characterNumber = Number(characterCode)
    if (characterNumber >= 0 && characterNumber <= 9) {
      if (e.currentTarget.value && e.currentTarget.value.length) {
        return
      } else if (characterNumber === 0) {
        e.preventDefault()
      }
    } else {
      e.preventDefault()
    }
  }
  
    render()
    {
        const {match,locale,languageData,username} = this.props
        const {analysis_done_week,action_party,document_no,shipment_no,exception_no,
            reason_code,eh_status,start_time,end_time,remarks,is_submit,loading} = this.state
        return (
            <>
            <title>{ onChangeLanguage(locale,'Productivity EH Finding',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'Productivity EH Finding',languageData)} match={match} />
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
                    <div className = "row" style = {{marginBottom:'10px'}}>
                         <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Processing Start Time',languageData)}
                            <br></br>{ moment(start_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                            
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Processing End Time',languageData)}
                            <br></br>{end_time !== '' && moment(end_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                            
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'User ID',languageData)}
                            <br></br>{username}</Label>
                           
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Document Number',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && document_no === ''?  "error-border-paste":"fontstyle text-background-paste" }
                            placeholder = ''
                            value = {document_no}  
                            onChange= {(e)=>this.setState({document_no : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Shipment Number',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && shipment_no === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                            placeholder = ''
                            value = {shipment_no}  
                            onChange= {(e)=>this.setState({shipment_no : e.target.value})} 
                            />
                        </div>
                        
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Exception Number',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && exception_no === ''?  "error-border-paste":"fontstyle text-background-paste" }
                            placeholder = ''
                            value = {exception_no}  
                            onChange= {(e)=>this.setState({exception_no : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'EH Reason Code',languageData)}<a style = {{color :'red'}}>*</a></Label>
                         
                               <Input  className = {is_submit === true && reason_code === ''?  "error-border-paste":"fontstyle text-background-paste" } 
                           value = {reason_code}  
                           onChange= {(e)=>this.setState({reason_code : e.target.value})} 
                           />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'EH Status',languageData)}<a style = {{color :'red'}}>*</a></Label>
                         
                            <Input  className = {is_submit === true && eh_status === ''?  "error-border-paste":"fontstyle text-background-paste" }    
                           value = {eh_status}  
                           onChange= {(e)=>this.setState({eh_status : e.target.value})} 
                           />
                        </div>
                        <div className = "col-md-3  space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Action Party',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && action_party === ''?  "error-border-paste":"fontstyle text-background-paste" }    
                            value = {action_party}  
                            onChange= {(e)=>this.setState({action_party : e.target.value})} 
                            />
                        </div>
                       
                     
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Analysis Done For Week',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && analysis_done_week === ''?  "error-border":"fontstyle text-background" }
                            placeholder = ''
                            type = "number" min="0"  step='1'
                            onKeyDown={this.handleKeypress}
                            value = {analysis_done_week}  
                            onChange= {(e)=>this.setState({analysis_done_week : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-12 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Remarks',languageData)}</Label>
                            <textarea  
                            className = {"fontstyle textarea-background"}
                            placeholder = ''
                            value = {remarks}  
                            onChange= {(e)=>this.setState({remarks : e.target.value})} 
                            />
                        </div>
                    </div>
                    <div className = "row text-center" >               
                          <Button className = "button-width" color="secondary"  
                                onClick={()=>this.onPasteZ1910()}>
                               {onChangeLanguage(locale,'Paste Z1910',languageData)}
                                </Button>                      
                          <Button className = "button-width" color="primary"  
                                onClick={()=>this.onSubmit()}
                                >{onChangeLanguage(locale,'Save',languageData)} </Button>                         
                             <Button className = "button-width" color="secondary" 
                                    onClick={()=>this.clearValue()}
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


