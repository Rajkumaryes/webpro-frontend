import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import {onChangeLanguage,convertLocalToUTCDate} from '../../../../helper'
import{errortypeService} from '../../../../redux/pack-kpi/errortype/saga'
import{productivityService} from '../../../../redux/pack-kpi/error-capture/saga'
import{userService} from '../../../../redux/users/saga'

import {getValue_Z1910} from '../../pasteData'
import * as clipboard from "clipboard-polyfill/text";
import DatePicker from "../../datePicker";


class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        error_type:'',
        error_receivedby:'',
        week_no:'',
        remarks:'',
        document_no:'',
        shipment_no:'',
        error_received:'',
        error_type_data:[],
        error_received_data:[],
        is_submit:false,
        start_time:new Date(),
        updated_start_time:new Date(),
      };
    }
    componentDidMount()
    {

        this.fetch_errorTypeData()
        this.fetch_error_receivedData()
    }
    fetch_errorTypeData() {  
        this.setState({
          loading : true
        })
        errortypeService.fetchapi()
          .then((res) => { 
            this.setState({   
          loading : false 
                  
            }) 
            if(res.status)
              {
                    let filterstatus = (res.data).filter(item => item.status === 1)
                    var list = filterstatus.map(function(areaaval) {
                        return  {label : areaaval.name ,value : (areaaval.id).toString()};
                    });  
                    this.setState({
                        error_type_data :  list,
                    })
              }  
        })
        .catch((error) => { 
          this.setState({
            loading : false
          })
          });   
     }
     fetch_error_receivedData() {  
        this.setState({
          loading : true
        })
        userService.fetchpermission_user('PACT KPI')
          .then((res) => { 
            this.setState({   
          loading : false 
                  
            }) 
            if(res.status)
              {
                let filterstatus = (res.data).filter(item => item.is_active === 1)
                var list = filterstatus.map(function(cusmaidid) {
                     return  {label : cusmaidid.username ,value : cusmaidid.username};
                  });  
                    this.setState({
                        error_received_data :  list,
                    })
              }  
        })
        .catch((error) => { 
          this.setState({
            loading : false
          })
          });   
     }
    onPaste() 
    {
        navigator.clipboard.readText().then((text)=>{
            console.log("lkbkjj" , text)
            console.log("lkbkjj" ,typeof text)
          
        })
    }
   onSubmit()
   {
    const {remarks,document_no,shipment_no,error_type,start_time,updated_start_time,
        error_received,week_no,error_receivedby} = this.state
        if(document_no !== "" && shipment_no !== "" && error_type !== "" && 
        error_received !== "" && week_no !== ""&& error_receivedby !== "")
        {
          const end_time =   new Date() ,updated_end_time = new Date()
            const {username} = this.props
            const error_markedby= username
            this.setState({
                loading : true
              })
              productivityService.createapi(username,remarks,document_no,shipment_no,error_type,
                error_received,error_markedby,week_no,error_receivedby,
                convertLocalToUTCDate( start_time),
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
                        error_type:'',
                        error_receivedby:'',
                        week_no:'',
                        remarks:'',
                        document_no:'',
                        shipment_no:'',
                        error_received:'',
                        is_submit:false,
                        start_time:new Date(),
                        updated_start_time:new Date(),
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
            error_type:'',
            error_receivedby:'',
            week_no:'',
            remarks:'',
            document_no:'',
            shipment_no:'',
            error_received:'',
            is_submit:false,
            start_time:new Date(),
            updated_start_time:new Date(),
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
        })
       
    });
    
}
onChangetime(date)
{
  this.setState({error_received  : date})
 
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
        const {error_type_data,error_received_data,remarks,document_no,shipment_no,error_type,
            error_received,week_no,loading,error_receivedby,is_submit} = this.state
        return (
            <>
              <title>{onChangeLanguage(locale,'Error Capture',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'Error Capture',languageData)} match={match} />
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
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Type',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                <Select  className={is_submit === true && error_type === ''?  "error-border-select":"react-select fontstyle" }
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={error_type_data.filter(option =>option.value ===   error_type)}
                                options={error_type_data}
                                onChange={({value}) =>this.setState({error_type:value})}/>
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Document Number',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && document_no === ''?  "error-border-paste":"fontstyle text-background-paste" }
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
                        
                        <div className = "col-md-3  space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Data Week No',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && week_no === ''?  "error-border":"fontstyle text-background" }   
                            value = {week_no}  
                            type = "number" min="0"  step='1'
                            onKeyDown={this.handleKeypress}
                            onChange= {(e)=>this.setState({week_no : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Marked By',languageData)}<br></br>
                            {username}</Label>
                               
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Received By',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select   className={is_submit === true && error_receivedby === ''?  "error-border-select":"react-select fontstyle" }
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={error_received_data.filter(option =>option.value ===   error_receivedby)}
                                options={error_received_data}
                                onChange={({value}) =>this.setState({error_receivedby:value})}/>
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Received Date',languageData)}<a style = {{color :'red'}}>*</a></Label>
                         

                            <p1 className = 'fontstyle mandatory-label'>{is_submit === true && error_received === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                                <DatePicker
                                 selected={error_received}
                                 className = "text-background"
                                 onChange={(date) => this.onChangetime(date)}
                                //  onSelect = {()=>this.setState({date_time  : ''})}
                                 />
                        </div>
                        <div className = "col-md-12  space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Remarks',languageData)}</Label>
                            <textarea className = "fontstyle textarea-background"   
                            value = {remarks}  
                            onChange= {(e)=>this.setState({remarks : e.target.value})} 
                            />
                        </div>
                       
                        
                    </div>
                    <div className = "row text-center" >                      
                          <Button className = "button-width" color="secondary"  
                                 onClick={()=>this.onPasteZ1910()}>
                                {onChangeLanguage(locale,'Paste Z1910',languageData)}</Button>                       
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

