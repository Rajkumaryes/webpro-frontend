
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import{containerService} from '../../../../redux/railnotification/container/saga';
import {onChangeLanguage,convertLocalToUTCDate} from '../../../../helper';
import { createNotification } from '../../../../toast'
import {getValue_S7220} from '../../pasteData'
import * as clipboard from "clipboard-polyfill/text";
import moment from 'moment';
import DatePickerDate from "../datePicker";


class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        arrival_mot:'', 
        container_number:'',
        pickup_number:'',
        lfd:'',
        termial:'',
        movement:'',
        location:'',
        user_id:'',
        last_update:'',
        completed_update:'',   
        start_time:new Date(),
        updated_start_time:new Date(),  
        is_submit:false,
        containercount:'',
        containercountlast:''
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
       this.fetchContainerCount()
       }
       fetchContainerCount(){
        this.setState({loading:true})
        const {username} = this.props
        containerService.fetchcontainerCount(username)
        .then((res) => {
           if(res.status)   { 
                  let filterstatus = res.data;
                  let lastdata = res.lastcount; 
                  this.setState({ 
                    containercount:filterstatus, 
                    containercountlast:lastdata     
                  }) 
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
    
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
    
        fetchcontainersearch() {
            const {container_number} = this.state
            if(container_number !== "")
            {
              this.setState({
                loading : true
              })
              this.onrefresh()
              containerService.fetchcontainersearch(container_number)
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

                arrival_mot: record.arrival_mot, 
                container_number:record.container_number,
                pickup_number:record.pickup_number,
                lfd:this.validDate(record.lfd, 'LFD'),
                termial:record.termial,
                movement:record.movement,
                location:record.location,
                user_id:record.user_id,
                last_update:record.last_update,
                completed_update:record.completed_update,     
                is_submit :false,
             })
           }
         }
        onSubmit() { 
            const {  arrival_mot,container_number,pickup_number,lfd,termial,movement,location,user_id,
                last_update,completed_update ,start_time,updated_start_time } = this.state;
                let end_date=convertLocalToUTCDate(new Date()),
                start_date=convertLocalToUTCDate(updated_start_time),
                updatedstarttime=convertLocalToUTCDate(updated_start_time),
                 updated_end_time=convertLocalToUTCDate(new Date())   
            if(arrival_mot !==''&& container_number !==''&& pickup_number!==''&&lfd!==''&&termial!==''&& movement !==''
            &&location!=='')
            {
              const completed_update =  moment(new Date()).format('hh:mm:ss a') 
              const lfd =  moment(new Date()).format('MM/DD/YYYY') 

                        const {username}=this.props
                containerService.createcontainer(  arrival_mot,container_number,pickup_number,lfd,termial,movement,location,username,
                    last_update,completed_update,start_date,end_date,updatedstarttime,updated_end_time)
                  .then((res) => { 
                    this.setState({  
                      completed_update:completed_update, 
                      loading : false     
                    }) 
                    if(res.status)
                      {
                        createNotification('Created','success','filled')
                        this.setState({
                          arrival_mot:'',
                          container_number:'',
                          pickup_number:'',
                          lfd:'',
                          termial:'',
                          movement:'',
                          location:'',         
                          completed_update:'',   
                          is_submit:false,
                      })
                      this.fetchContainerCount()
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
            arrival_mot:'',
            container_number:'',
            pickup_number:'',
            lfd:'',
            termial:'',
            movement:'',
            location:'',         
            completed_update:'',   
            is_submit:false,
        })
       
      }
  


    onCopy()
    {
        navigator.clipboard.writeText(this.state.containerno)
    }
  


    async onPasteS7220() {
      clipboard.readText().then((text)=>{
          var record = getValue_S7220(text)
      console.log("kjbkj " , JSON.stringify(record))
      this.setState({
          paste_data:text,
          arrival_mot: record.arrival_mot, 
                container_number:record.container_number,
                pickup_number:record.pickup_number,
                lfd:this.validDate(record.lfd,'LFD'),
                termial:record.termial,
                movement:record.movement,
                location:record.location,
               
          })
          // if(record.issuer !== "")
          // {
          //     this.getteamvalue(record.issuer)
          // }
      });
      
  }

    render()
    {
        const {match,locale,languageData,username} = this.props
        const {arrival_mot,container_number,pickup_number,lfd,termial,movement,location,user_id,containercount,containercountlast,
            last_update,completed_update,is_submit} = this.state
        return (
            <>
            <title>{onChangeLanguage(locale,'Container Release Data',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                
                <div className="row">
                <div className="col-md-8">
                <Breadcrumb heading={onChangeLanguage(locale,'Container Release Data',languageData)}match={match} />
                </div>
                <div className = "col-md-2">
                    <h2 style = {{marginTop:'15px'}}>Total EQ : {containercount}</h2>
                </div>
                <div className = "col-md-2">
                    <h2  style = {{marginTop:'15px'}}>Last EQ : {containercountlast}</h2>
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
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Arrival MOT',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && arrival_mot === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                            placeholder = ''
                            value = {arrival_mot}  
                            onChange= {(e)=>this.setState({arrival_mot : e.target.value})} 
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
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Pickup Number',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && pickup_number === ''?  "error-border-paste":"fontstyle text-background-paste" } 
                                placeholder = ''
                                value = {pickup_number}  
                                onChange= {(e)=>this.setState({pickup_number  : e.target.value})} ></Input>
                        </div>
                        {/* <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'LFD',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && lfd === ''?  "error-border-paste":"fontstyle text-background-paste" } 
                                 placeholder = ''
                                value = {lfd}  
                                onChange= {(e)=>this.setState({lfd  : e.target.value})} ></Input>
                        </div> */}
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'LFD',languageData)}
                              <a style = {{color :'red'}}>*</a></Label>
                               <a className = 'fontstyle mandatory-label'>
                                {is_submit === true && lfd === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>
                              <DatePickerDate
                                 selected={lfd}
                                 className = "text-background-paste" 
                                 onChange={(date) => this.setState({lfd:date})}
                                 />
                                
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Terminal',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && termial === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                            placeholder = ''
                            value = {termial}  
                            onChange= {(e)=>this.setState({termial : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Movement',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input   className = {is_submit === true && movement === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                            placeholder = ''
                            value = {movement}  
                            onChange= {(e)=>this.setState({movement : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Location',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input   className = {is_submit === true && location === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                            placeholder = ''
                            value = {location}  
                            onChange= {(e)=>this.setState({location : e.target.value})} 
                            />
                        </div>
                             
                        
                    </div>
                    <div className = "row text-center">                      
                           <Button className = "button-width" color="secondary" 
                               onClick={()=>this.onPasteS7220()}
                               >
                               {onChangeLanguage(locale,'Paste S7220',languageData)}
                                </Button>                  
                          <Button className = "button-width" color="primary" 
                                 onClick={()=>this.fetchcontainersearch()}
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




