import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import{announcementService} from '../../../../redux/railnotification/announcement/saga';
import {onChangeLanguage,convertLocalToUTCDate} from '../../../../helper';
import { createNotification } from '../../../../toast'
 import CustomRadioButton from '../../../RadioButton'
 import {getValue_S7210} from '../../pasteData'
 import * as clipboard from "clipboard-polyfill/text";
 import DatePickerDate from "../datePicker";

 import moment from 'moment';

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        announced_by:'',
        departure_date:'',
        arrival_date:'',
        container_number:'',
        user_id:'',
        last_update:'',
        completed_update:'',
        cross_town:'',
        start_time:new Date(),
        updated_start_time:new Date(),
        is_submit:false,
        announcementcount:'',
        announcementcountlast:''
      };
    }
    onPaste() 
    {
        navigator.clipboard.readText().then((text)=>{
            console.log("lkbkjj" , text)
            console.log("lkbkjj" ,typeof text)
          
        })
    }
    componentDidMount() {
      this.setState({
        last_update:moment(new Date()).format('hh:mm:ss a')
    })
       this.fetchAnouncementCount()
       }
       fetchAnouncementCount(){
        this.setState({loading:true})
        const {username} = this.props
        announcementService.fetchanouncementCount(username)
        .then((res) => {
           if(res.status)   { 
                  let filterstatus = res.data;
                  let lastdata = res.lastcount; 
                  this.setState({ 
                    announcementcount:filterstatus, 
                    announcementcountlast:lastdata     
                  }) 
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
    
    }
    
        fetchannocement() {
            const {container_number} = this.state
            if(container_number !== "")
            {
              this.setState({
                loading : true
              })
              this.onrefresh()
              announcementService.fetchannouncementsearch(container_number)
              .then((res) => {
                  this.setState({loading:false})
                      if(res.status)   { 
                            this.setValue(res.data)
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
                createNotification('Please fill Container Number','error','filled')
              }
             
         }
   
         setValue(record)
         {
           if(record && record !== null)
           {
             this.setState({

              announced_by:record.announced_by,
              departure_date:this.validDate(record.departure_date,'Departure Date'),
              arrival_date:this.validDate(record.arrival_date,'Arrival Date'),
              container_number:record.container_number,
              user_id:record.user_id,
              last_update:record.last_update,
              completed_update:record.completed_update,
              cross_town:record.cross_town,    
                is_submit :false,
             })
           }
         }
    
        onSubmit() { 
            const { announced_by ,departure_date,arrival_date,container_number,user_id,last_update,completed_update,cross_town,start_time,updated_start_time} = this.state;
           
            if(announced_by !==''&& departure_date !==''&& arrival_date!==''&&container_number!==''&& cross_town!=='')
            {
              const completed_update =  moment(new Date()).format('hh:mm:ss a') , end_date=convertLocalToUTCDate(new Date()),
              start_date=convertLocalToUTCDate(updated_start_time),
              updatedstarttime=convertLocalToUTCDate(updated_start_time),
               updated_end_time=convertLocalToUTCDate(new Date())      
               var departure_date_date= (departure_date !=='' && departure_date !== null) ? moment(departure_date).format('MM/DD/YYYY') :''    
               var arrival_date_date= (arrival_date !=='' && arrival_date !== null) ? moment(arrival_date).format('MM/DD/YYYY') :''        
                  const {username}=this.props
                announcementService.createannouncement( announced_by ,departure_date_date,arrival_date_date,container_number,username,last_update,completed_update,cross_town,start_date,end_date,updatedstarttime,updated_end_time)
                  .then((res) => { 
                    this.setState({  
                      completed_update:completed_update, 
                      loading : false     
                    }) 
                    if(res.status)
                      {
                        createNotification('Created','success','filled')
                        this.setState({
                          announced_by:'',
                          departure_date:'',
                          arrival_date:'',
                          container_number:'',
                          completed_update:'',
                          cross_town:'',
                          is_submit:false,
                      })
                      this.fetchAnouncementCount()
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
            announced_by:'',
            departure_date:'',
            arrival_date:'',
            container_number:'',
            completed_update:'',
            cross_town:'',
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
    onChangeRadio(value)
    {
        this.setState({cross_town:value})
    }



    async getValue_S7210() {
      clipboard.readText().then((text)=>{
          var record = getValue_S7210(text)
      console.log("kjbkj " , JSON.stringify(record))
      this.setState({
          paste_data:text,
              announced_by:record.announced_by,
              departure_date:this.validDate(record.departure_date,'Departure Date'),
              arrival_date:this.validDate(record.arrival_date,'Arrival Date'),
              container_number:record.container_number,
             
          })
          
      });
      
  }

  
  onChangedeparture(date)
  {
    this.setState({departure_date  : date})
  }
  onChangearrival(date)
  {
    this.setState({arrival_date  : date})
  }
    render()
    {
        const {match,locale,languageData,username} = this.props
        const {announced_by ,departure_date,arrival_date,container_number,user_id,last_update,completed_update,cross_town,is_submit,announcementcount,announcementcountlast} = this.state
        return (
            <>
            <title>{onChangeLanguage(locale,'Announcement Data',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <div className="row">
              <div className="col-md-8">
              <Breadcrumb heading={onChangeLanguage(locale,'Announcement Data',languageData)}match={match} />
              </div>
              <div className = "col-md-2">
                        <h2 style = {{marginTop:'15px'}}>Total EQ : {announcementcount}</h2>
                    </div>
                    <div className = "col-md-2">
                        <h2  style = {{marginTop:'15px'}}>Last EQ : {announcementcountlast}</h2>
                    </div>

            </div>
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
            <div className = "" style = {{padding:'0px 10px',borderRadius:'10px',marginBottom:'10px'}}>
                    <div className = "row" >
                    <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'User ID',languageData)}</a><br></br> 
                            {username}</Label>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Start Time',languageData)}</a><br></br>
                            {last_update}</Label>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'End Time',languageData)}</a><br></br>
                            {completed_update}</Label>
                        </div>
                        
                    </div>
                </div> 
          

                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row" style = {{marginBottom:'10px'}}>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Announced by',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && announced_by === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                            placeholder = ''
                            value = {announced_by}  
                            onChange= {(e)=>this.setState({announced_by : e.target.value})} 
                            />
                        </div>
                        {/* <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Departure Date',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && departure_date === ''?  "error-border-paste":"fontstyle text-background-paste" } 
                                placeholder = 'MM/DD/YYYY'
                               
                                value = {departure_date}  
                                onChange= {(e)=>this.setState({departure_date  : e.target.value})} ></Input>
                                
                        </div> */}


                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Departure Date',languageData)}
                              <a style = {{color :'red'}}>*</a></Label>
                               <a className = 'fontstyle mandatory-label'>
                                {is_submit === true && departure_date === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>
                              <DatePickerDate
                                 selected={departure_date}
                                 className = "text-background-paste" 
                                 onChange={(date) => this.setState({departure_date:date})}
                                 />
                                
                        </div>

                        {/* <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Arrival Date',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && arrival_date === ''?  "error-border-paste":"fontstyle text-background-paste" } 
                                placeholder = 'MM/DD/YYYY'
                               
                                value = {arrival_date}  
                                onChange= {(e)=>this.setState({arrival_date  : e.target.value})} ></Input>
                                
                        </div> */}

                         <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Arrival Date',languageData)}
                              <a style = {{color :'red'}}>*</a></Label>
                               <a className = 'fontstyle mandatory-label'>
                                {is_submit === true && arrival_date === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>
                              <DatePickerDate
                                 selected={arrival_date}
                                 className = "text-background-paste" 
                                 onChange={(date) => this.setState({arrival_date:date})}
                                 />
                                
                        </div>

                       
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Container Number',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && container_number === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                            placeholder = ''
                            value = {container_number}  
                            onChange= {(e)=>this.setState({container_number : e.target.value})} 
                            />
                        </div>
                       
                        <div className = "col-md-3 space-margin">
                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Cross Town',languageData)}</Label>
                             <Row style = {{marginTop:'10px'}}>
                                 <Colxx xxs="4">
                                      <CustomRadioButton checked  = "Yes" name = {onChangeLanguage(locale,'Yes',languageData)} value = {cross_town} 
                                        onChangeRadio={this.onChangeRadio.bind(this)}/>
                                </Colxx>
                                <Colxx xxs="4">
                                        <CustomRadioButton checked  = "No" name = {onChangeLanguage(locale,'No',languageData)} value = {cross_town} 
                                        onChangeRadio={this.onChangeRadio.bind(this)}/>
                                    
                                </Colxx>
                            </Row>
                         
                      </div>   
                
                        
                    </div>
                    <div className = "row text-center" >                    
                           <Button className = "button-width" color="secondary"  
                                 onClick={()=>this.getValue_S7210()}
                                 >
                                 {onChangeLanguage(locale,'Paste S7210',languageData)}                                
                                </Button>                       
                          <Button className = "button-width" color="primary" 
                                 onClick={()=>this.fetchannocement()}
                                 >{ onChangeLanguage(locale,'Find',languageData)}</Button>                        
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


