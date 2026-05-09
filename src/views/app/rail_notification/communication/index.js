import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import{communicationService} from '../../../../redux/railnotification/communication/saga';
import {onChangeLanguage,convertLocalToUTCDate} from '../../../../helper';
import { createNotification } from '../../../../toast'
import moment from 'moment';
import DatePicker from "../../datePicker";
import {getValuepaste,getValue_rail} from '../pasteData'
import * as clipboard from "clipboard-polyfill/text";
import DatePickerDate from "../datePicker";



class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        from:'',
        start_date:'',
        end_date:'',
        user_id:'',
        last_update:'',
        completed_update:'',
        subject:'',
        start_time:new Date(),
        updated_start_time:new Date(),
        is_submit:false,
        communicationcount:'',
        communicationcountlast:''
      };
    }
    // onPaste() 
    // {
    //     navigator.clipboard.readText().then((text)=>{
    //         console.log("lkbkjj" , text)
    //         console.log("lkbkjj" ,typeof text)
          
    //     })
    // }
    componentDidMount() {
       
        //   this.fetchData()
        this.fetchCommunicationCount()
        }
        fetchCommunicationCount(){
          this.setState({loading:true})
          const {username} = this.props
          communicationService.fetchcommunicationCount(username)
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
    
    
        onSubmit() { 
            const { from ,start_date,end_date,user_id,last_update,completed_update,subject,start_time,updated_start_time} = this.state;
            let end_time=convertLocalToUTCDate(new Date()),
            start_time1=convertLocalToUTCDate(start_time),
            updatedstarttime=convertLocalToUTCDate(updated_start_time),
             updated_end_time=convertLocalToUTCDate(new Date()) 
             const{username}=this.props    
            if(from !==''&& start_date !==''&& end_date!==''&& user_id!==''&& last_update !==''&&completed_update!==''&& subject!=='')
            {
                communicationService.createcommunication( from ,start_date,end_date,user_id,last_update,completed_update,subject,username,start_time1,end_time,updatedstarttime,updated_end_time)
                  .then((res) => { 
                    this.setState({   
                      loading : false     
                    }) 
                    if(res.status)
                      {
                        createNotification('Created','success','filled')
                        this.setState({
                          from:'',
                          start_date:'',
                          end_date:'',
                          user_id:'',
                          last_update:'',
                          completed_update:'',
                          subject:'',
                          is_submit:false,
                      })
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
            else
            {
              this.setState({
                is_submit:true
            })
              createNotification('Please fill mandatory field','error','filled')
            }
          }
       
     
      onrefresh() {
        this.setState({
            from:'',
            start_date:'',
            end_date:'',
            user_id:'',
            last_update:'',
            completed_update:'',
            subject:'',
            is_submit:false,
        })
       
      }   


      validDate(date,title)
      {
         var date_value = '',isfill = false
          if(date && date !== null && date !== '')
          {
             
             var end_date =  new Date(date)
             if (Object.prototype.toString.call(end_date) === "[object Date]") {
                 if (isNaN(end_date.getTime())) 
                 { 
                     console.log("date is not valid")
                 } 
                 else 
                 {
                     date_value = end_date
                     console.log("date is valid")
                     isfill = true
                 }
               } else 
               {
                  console.log("not a date")
               }
 
          }
          if(isfill === false)
          {
             createNotification(`Please Enter ${title} (MM/DD/YYYY)`,'error','filled') 
          }
  
          return date_value
 
      }

    onCopy()
    {
        navigator.clipboard.writeText(this.state.containerno)
    }

  //   async onPaste() {
  //     clipboard.readText().then((text)=>{
  //         var record = getValuepaste(text)
       
  //     this.setState({
  //         paste_data:text,
  //         from:record.from,
  //         start_date:this.validDate(record.start_date,'Start Date'),
  //         subject: record.subject,
  //         })
         
  //     });
      
  // } 
  async onPaste() {
    clipboard.readText().then((text)=>{
        var record = getValue_rail(text)
        
        this.setState({
            paste_data:text,
            from:record.from,
            subject:record.subject,
            start_date:record.start_date,
            })
       
    });
    
}  
    onChangeRadio(value)
    {
        this.setState({activity:value})
    }

    onChangetime(date)
  {
    this.setState({
      start_date  : date,
    })
   
  } 
  onChangeendtime(date)
  {
    this.setState({
      end_date:date
    })
   
  } 
    render()
    {
        const {match,locale,languageData} = this.props
        const {from ,start_date,end_date,user_id,last_update,completed_update,subject,is_submit,communicationcount,communicationcountlast} = this.state
        return (
            <>
            <title>{onChangeLanguage(locale,'Communication Data',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                
                <div className="row">
                <div className="col-md-8">
                <Breadcrumb heading={onChangeLanguage(locale,'Communication Data',languageData)}match={match} />
                </div>
                <div className = "col-md-2">
                    <h2 style = {{marginTop:'15px'}}>Total EQ : {communicationcount}</h2>
                </div>
                <div className = "col-md-2">
                    <h2  style = {{marginTop:'15px'}}>Last EQ : {communicationcountlast}</h2>
                </div>

            </div>
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row" style = {{marginBottom:'10px'}}>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'From',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && from === ''?  "error-border ":"fontstyle text-background-paste " }  
                            placeholder = ''
                            value = {from}  
                            onChange= {(e)=>this.setState({from : e.target.value})} 
                            />
                        </div>
                       
                        {/* <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Start Date',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && start_date === ''?  "error-border-paste":"fontstyle text-background-paste" } 
                                // placeholder = 'MM/DD/YYYY'
                               
                                value = {start_date}  
                                onChange= {(e)=>this.setState({start_date  : e.target.value})} ></Input>
                                
                        </div> */}

                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Start Date',languageData)}
                              <a style = {{color :'red'}}>*</a></Label>
                               {/* <a className = 'fontstyle mandatory-label'>
                                {is_submit === true && start_date === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>
                              <DatePickerDate
                                 selected={start_date}
                                 className = "text-background-paste" 
                                 onChange={(date) => this.setState({start_date:date})}
                                 /> */}
                                <Input className = {is_submit === true && start_date === ''?  "error-border ":"fontstyle text-background-paste " }  
                            placeholder = ''
                            value = {start_date}  
                            onChange= {(e)=>this.setState({start_date : e.target.value})} 
                            />
                        </div>

                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'End Date',languageData)}
                              <a style = {{color :'red'}}>*</a></Label>
                               <a className = 'fontstyle mandatory-label'>
                                {is_submit === true && end_date === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>
                              <DatePickerDate
                                 min_date = {start_date}
                                 selected={end_date}
                                 className = "text-background" 
                                 onChange={(date) => this.setState({end_date:date})}
                                 />
                                
                        </div>
                       

                        
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'User ID',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input   className = {is_submit === true && user_id === ''?  "error-border ":"fontstyle text-background " }  
                            placeholder = ''
                            value = {user_id}  
                            onChange= {(e)=>this.setState({user_id : (e.target.value).toUpperCase()})}
                            />
                        </div>
                        {/* <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >TAT</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {tat}  
                            onChange= {(e)=>this.setState({tat : e.target.value})} 
                            />
                        </div> */}
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Last Update Time In FIS',languageData)}<a style = {{color :'red'}}>*</a></Label>
                               <Input   className = {is_submit === true && last_update === ''?  "error-border ":"fontstyle text-background " }   
                            placeholder ="hh:mm:ss AM/PM" 
                            type ='time'
                          value = {last_update}  
                           onChange= {(e)=>this.setState({last_update : e.target.value})} 
                           />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Completed Update Time In FIS',languageData)}<a style = {{color :'red'}}>*</a></Label>
                         
                               <Input   className = {is_submit === true && completed_update === ''?  "error-border ":"fontstyle text-background " }   
                          placeholder ="hh:mm:ss AM/PM"
                          type ='time'   
                           value = {completed_update}  
                           onChange= {(e)=>this.setState({completed_update : e.target.value})} 
                           />
                        </div>
                        <div className = "col-md-12 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Subject',languageData)}<a style = {{color :'red'}}>*</a></Label><br></br>
                            <textarea className = "fontstyle textarea-background-paste"  
                                placeholder = ''
                                value = {subject}  
                                onChange= {(e)=>this.setState({subject : e.target.value})} 
                            />
                        </div>
                        
                    </div>
                    <div className = "row text-center" >
                    <Button className = "button-width" color="secondary"
                                      onClick={()=>this.onPaste()}>
                                        {onChangeLanguage(locale,'Paste',languageData)}
                                    </Button>               
                          <Button className = "button-width" color="primary" 
                                onClick={()=>this.onSubmit()}
                                >
                               {onChangeLanguage(locale,'Save',languageData)}</Button>                   
                             <Button className = "button-width" color="secondary" 
                                onClick={()=>this.onrefresh()}>
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

   })(QueryResolveSheet)
  );

