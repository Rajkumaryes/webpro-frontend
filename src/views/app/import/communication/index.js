import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import CustomRadioButton from '../../../RadioButton'
import Select from 'react-select';
import DatePicker from "../../datePicker";
import "react-datepicker/dist/react-datepicker.css";
import { createNotification } from '../../../../toast';
import{CommunicationService} from '../../../../redux/imports/communicationsheet/saga'
import{customstypeService} from '../../../../redux/imports/customstype/saga'
import Workbook from 'react-excel-workbook'
import * as clipboard from "clipboard-polyfill/text";
import { getValue_communication } from '../pasteData'

import {onChangeLanguage,convertLocalToUTCDate,convertUTCToLocalDate} from '../../../../helper'
import Loading from "react-fullscreen-loading";
class Sidebar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        data:[],
        transmission:'',
        from:'',
        subject:'',
        startdate:'',
        enddate:'',
        userid:'',
        customtype:'',
        remarks:'',
        intermediate:'',
        no_shipment:'',
        customtypedata:[],
        customtype_data:[],
        is_submit:false,
        start_time:new Date(),
        updated_start_time:new Date(),
        communicationcount:'',
        communicationcountlast:'',
      };
    }
    componentDidMount() {
      this.fetchData()
      this.fetchcustome()
      this.fetchCommunicationCount()
    }
    fetchCommunicationCount(){
      this.setState({loading:true})
      const {username} = this.props
      console.log(username)
      CommunicationService.fetchcommunicationcount(username)
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
    fetchData() {
      this.setState({
          loading : true
        })
      CommunicationService.fetchcommunication()
      .then((res) => {
         if(res.status)   { 
                  this.setState({
                  data :  res.data,
                  })
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})
    } 
    
    fetchcustome() {
      this.setState({
          loading : true
        })
      customstypeService.fetchcustomstype()
      .then((res) => {
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var customlist = filterstatus.map(function(cusmaidid) {
                    return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                 });  
                 var custom_list = filterstatus.map(function(cusmaidid) {
                  return  {text : cusmaidid.name ,value : cusmaidid.id};
               });  
                  this.setState({
                  customtypedata :  customlist,
                  customtype_data :  custom_list,
                  loading:false
                  })
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})
   }  

      onSubmit() { 
        const {transmission,from,subject,startdate,enddate,customtype,remarks,no_shipment,intermediate,
        start_time,updated_start_time} = this.state;
        
        var isfill = true
        if(from === "" ||  startdate === "" || enddate === "" || customtype === "" || no_shipment === "" || subject === "" || remarks === "" || transmission === "" )
        {
          isfill = false
        }
        if(transmission === 'Transmission' && intermediate === '')
        {
          isfill = false
        }
        if(isfill === true)
        { 
          const {username} = this.props
          const end_time = new Date() ,updated_end_time = new Date()
          this.setState({
            loading : true
          })
                        
          CommunicationService.createcommunication(from,convertLocalToUTCDate(startdate),enddate,username,customtype,no_shipment,subject,remarks,
            transmission,intermediate,
            convertUTCToLocalDate(start_time),
            convertUTCToLocalDate( end_time),
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
                  this.fetchCommunicationCount()
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
        else{
          this.setState({
            is_submit:true
          })
          createNotification('Please fill mandatory field','error','filled')

        }
      }
        
      async onPaste() {
        clipboard.readText().then((text) => {
          var record = getValue_communication(text)
    
          this.setState({
            from: record.from,
            // start_time:this.validDate(record.mail_received,'Start Date') ,
            startdate: record.received_time,
            subject: record.subject,
          })
    
        });
    
      } 
     
      onchangeprocess(value)
    {
        
        var transmission = [...this.state.transmission]
        if(transmission.includes(value))
        {
            transmission = transmission.filter(e => e  === value); 
        }
        else
        {
            transmission.push(value)            
        }
        this.setState({transmission:transmission})
    }
    onchangetransmission(value)
    {
        
        var transmission = [...this.state.intermediate]
        if(transmission.includes(value))
        {
          transmission = transmission.filter(e => e  === value); 
        }
        else
        {
          transmission.push(value)            
        }
        this.setState({intermediate:transmission})
    }
    clearvalue()
      {
      
        this.setState({
          transmission:'',
          from:'',
          subject:'',
          startdate:'',
          enddate:'',
          userid:'',
          customtype:'0',
          remarks:'',
          intermediate:'',
          no_shipment:'',
          is_submit:false,
          start_time:new Date(),
          updated_start_time:new Date(),
        })
} 
renderTemplate()
  {
    const {languageData,locale} = this.props
    const {data} = this.state
    var array = data.map(record=> {
          return {
            'transmission':record.transmission,
            'Shipment_Number' : record.shipment_no,
            'from' : record.from,
            'start_date' : record.start_date,
            'end_date' : record.end_date,
            'customs_type' : record.customs_type,
            'subject':record.subject,
            'remarkss':record.remarkss,
            'intermediate':record.intermediate
        };
      })
      return(
        
        <Workbook filename="Indexing_process.xlsx" element={
          <Button className = "button-width" color="secondary"  style={{width:'150px'}}
          >{ onChangeLanguage(locale,'Download',languageData)}  
          </Button>
		      }>
          <Workbook.Sheet data={array} name="Sheet A">
          <Workbook.Column label="Process Type" value="transmission"/>
          <Workbook.Column label="Shipment Number" value="Shipment Number"/>
          <Workbook.Column label="from" value="from"/>
          <Workbook.Column label="start_date" value="start_date"/>
          <Workbook.Column label="end_date" value="end_date"/>
          <Workbook.Column label="customs_type" value="customs_type"/>
          <Workbook.Column label="subject"value="subject"/>
          <Workbook.Column label="remarkss"value="remarkss"/>
          <Workbook.Column label="intermediate"value="intermediate"/>
          </Workbook.Sheet> 
        </Workbook>
     

      );
  } 
  onChangetime(date)
  {
    this.setState({
      startdate  : date,
      enddate:''
    })
  } 
  onChangeendtime(date)
  { 
     
    this.setState({
      enddate:date
    })
} 
    render()
    { 
       
        const{loading,transmission,from,startdate,enddate,customtype,no_shipment,communicationcount,communicationcountlast,
          subject,remarks,intermediate,customtypedata,is_submit}=this.state
        const {match,languageData,locale,username} = this.props
        return (
            <>
             <title>{onChangeLanguage(locale,'Communication Sheet',languageData)}</title>
             {loading && 
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
            <Row>
              <Colxx xxs="12">
              <div className = "row">
                      <div className = "col-md-8">
                      <Breadcrumb heading={onChangeLanguage(locale,'Communication Sheet',languageData)} match={match} />
                    </div>
                    <div className = "col-md-2" >
                        <h2 style = {{marginTop:'15px'}}>Total EQ : {communicationcount}</h2>
                        </div>
                        <div className = "col-md-2">
                            <h2  style = {{marginTop:'15px'}}>Last EQ : {communicationcountlast}</h2>
                        </div>
                    {/* <div className = "col-md-2">
                        <Button className = "button-width" color="primary" style= {{width :'100%'}}>
                            <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
                            <a style= {{margin :'0px'}} > Upload</a>
                            <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                                className = "filepicker_customButton"
                                style = {{width : '80%',marginLeft :'-56%'}}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
                        </Button>
                    </div> */}
                    {/* <div className = "col-md-2" >
                        {this.renderTemplate()}
                    </div> */}
                  </div>
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
            <div className = "publishuser-card-component" style = {{marginBottom:'15px',borderRadius:'10px'}}>
                        
                        <div className = "row" style = {{padding:'10px'}}>
                            <div className = "col-md-4 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'From',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                                <Input  
                                className = {is_submit === true && from === ''?  "error-border":"fontstyle text-background" }   
                                // placeholder = 'From'
                                value = {from}  
                                onChange= {(e)=>this.setState({from : e.target.value})} 
                                />
                            </div>
                            <div className = "col-md-4">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Start Date',languageData)}
                                <a style = {{color :'red'}}>*</a>
                              </Label>
                              <Input
                                  className={is_submit === true && startdate === '' ? "error-border" : "fontstyle text-background"}
                                  type="text"
                                  placeholder=''
                                  value={startdate}
                                  onChange={(e) => this.setState({ startdate: e.target.value })}
                                />
                              
                            </div>
                            <div className = "col-md-4 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'End Date',languageData)}
                                  <a style = {{color :'red'}}>*</a></Label>
                                  {is_submit === true && enddate === '' &&   
                                  <p1 className = 'fontstyle mandatory-label'> 
                                  {onChangeLanguage(locale,'Mandatory Field',languageData)} 
                                  </p1>}
                                    <DatePicker
                                     selected={enddate}
                                     className = "text-background" 
                                     onChange={(date) => this.onChangeendtime(date)}
                                     min_date = {startdate}
                                     
                                     />
                            </div>
                            <div className = "col-md-4 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'User ID',languageData)}
                                <br></br> {username}</Label>


                            </div>
                            <div className = "col-md-4">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Customs Type',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                                 <Select  
                                 style={{height:'85px'}}
                                 className = {is_submit === true && customtype === ''?   "error-border-select-paste":"react-select fontstyle" }  
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={customtypedata.filter(option =>option.value === customtype)}
                                options={customtypedata}
                               onChange={({value}) => this.setState({  customtype: value })}
                          />
                            </div>
                            <div className = "col-md-4 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Shipment Number',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                                <Input  
                                className = {is_submit === true && no_shipment === ''?  "error-border":"fontstyle text-background" }   
                                placeholder = ''
                                type='number'
                                value = {no_shipment}  
                                onChange= {(e)=>this.setState({no_shipment : e.target.value})} 
                                />
                            </div>
                            <div className = "col-md-6 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Subject',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                                <textarea
                                    className = {is_submit === true && subject === ''?  "border-textarea-background":"fontstyle textarea-background" }  
                                    placeholder = ''
                                    value = {subject}  
                                    onChange= {(e)=>this.setState({subject : e.target.value})} 
                                />
                            </div>
                            <div className = "col-md-6 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Remarks',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                                <textarea  
                                className = {is_submit === true && remarks === ''?  "border-textarea-background":"fontstyle textarea-background" }  
                                placeholder = ''
                                value = {remarks}  
                                onChange= {(e)=>this.setState({remarks : e.target.value})} 
                                />
                            </div>
                        </div>
                    </div>   
            <div className = "publishuser-card-component" style = {{marginBottom:'15px',borderRadius:'10px'}}>
                            <div className = "publish-title" >
                                <Row>
                                    <Colxx xxs="4">
                                        <Label  className = "fontstyle" 
                                        style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'Process Type',languageData)}
                                  </Label>
                                    </Colxx>
                                </Row>
                            </div>
                            
                            <div className = "row" style = {{padding:'10px'}}>
                            <div className = "col-md-2" style = {{marginTop:'10px'}}>
                                    <CustomRadioButton checked  = "Transmission" name ={onChangeLanguage(locale,'Transmission',languageData)} value = {transmission} 
                                            onChangeRadio={(value)=>this.setState({transmission:value,intermediate:''})}/>
                                  
                            </div>
                            <div className = "col-md-2" style = {{marginTop:'10px'}}>
                                    <CustomRadioButton checked  = "Communication" name ={onChangeLanguage(locale,'Communication',languageData)}  value = {transmission} 
                                        onChangeRadio={(value)=>this.setState({transmission:value,intermediate:''})}/>
                            </div>
                            <div className = "col-md-2" style = {{marginTop:'10px'}}>
                                    <CustomRadioButton checked  = "Match Code" name ={onChangeLanguage(locale,'Match Code',languageData)}  value = {transmission} 
                                        onChangeRadio={(value)=>this.setState({transmission:value,intermediate:''})}/>
                            </div>
                            <div className = "col-md-4" style = {{marginTop:'10px'}}>
                                    <CustomRadioButton checked  = "Error Check Communication" name ={onChangeLanguage(locale,'Error Check Communication',languageData)} value = {transmission} 
                                            onChangeRadio={(value)=>this.setState({transmission:value,intermediate:''})}/>
                                   
                            </div>
                            </div>
                    </div>
                    { transmission === 'Transmission' &&
                    <div className = "publishuser-card-component" style = {{borderRadius:'10px'}}>
                              <div className = "publish-title" >
                                  <Row>
                                      <Colxx xxs="12">
                                          <Label  className = "fontstyle" 
                                          style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'Transmission level',languageData)}
                                      </Label>
                                      </Colxx>
                                  </Row>
                              </div>
                              <div className = "row" style = {{padding:'10px'}}>
                              <div className = "col-md-2" style = {{marginTop:'10px'}}>
                              <CustomRadioButton checked  = "Initial" name ={onChangeLanguage(locale,'Initial',languageData)} value = {intermediate} 
                                          onChangeRadio={(value)=>this.setState({intermediate:value})}/>
                              </div>
                              <div className = "col-md-2" style = {{marginTop:'10px'}}>
                              <CustomRadioButton checked  = "Intermediate" name ={onChangeLanguage(locale,'Intermediate',languageData)}  value = {intermediate} 
                                          onChangeRadio={(value)=>this.setState({intermediate:value})}/>
                                    
                              </div>
                              <div className = "col-md-2" style = {{marginTop:'10px'}}>
                              <CustomRadioButton checked  = "Error Check" name ={onChangeLanguage(locale,'Error Check',languageData)}  value = {intermediate} 
                                          onChangeRadio={(value)=>this.setState({intermediate:value})}/>
                                    
                              </div>
                              </div>
                      </div>
                  }
             <div className = "row text-center" >                 
                          <Button
                            className="button-width" color="secondary"
                            onClick={() => this.onPaste()}>
                            {onChangeLanguage(locale, 'Paste', languageData)}
                          </Button>   
                          <Button className = "button-width" color="primary"                            
                            onClick={()=>this.onSubmit()} >
                                {onChangeLanguage(locale,'Save',languageData)}
                            </Button>
                            <Button className = "button-width"
                                  color="secondary"  
                                    onClick={()=>this.clearvalue()}
                                    >
                              {onChangeLanguage(locale,'Refresh',languageData)}    </Button>                   
                                                                 
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

