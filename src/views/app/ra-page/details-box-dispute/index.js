import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button,Modal,
    ModalHeader,
    ModalBody} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import { createNotification } from '../../../../toast';
import {onChangeLanguage,getValue,getTimeDifference,convertLocalToUTCDate,convertUTCToLocalDate,getPermission} from '../../../../helper';
import Loading from "react-fullscreen-loading";
import{statusService} from '../../../../redux/ra/status/saga'
import{RAareaService} from '../../../../redux/ra/area/saga'
import{userService} from '../../../../redux/users/saga'
import{disputeService} from '../../../../redux/ra/dispute/saga'
import moment from 'moment';
import DatePicker from "../../datePicker";
import {customStyles,getStausOptionEnable,getEnableStatus,getStausOptionAdminEnable} from '../../../../helper';

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        id:'',
        request_no: '',
        dispute_no:'',
        customer:'',
        received_time: '',
        area: '',
        publisher:'',
        publisher_status:'',
        auditor:'',
        auditor_status:'',
        pub_in_progress:'',
        pub_pending_in:'',
        pub_pending_out:'',
        pub_done_time:'',
        pub_disregrads:'',
        pub_total:'',
        pub_routes:'',
        comments_publisher:'',
        aud_in_progress:'',
        aud_pending_in:'',
        aud_pending_out:'',
        aud_done_time:'',
        aud_disregrads:'',
        aud_total:'',
        aud_routes:'',
        comments_audit:'',
        error_log:false,
        modalOpen:false,
        is_publish:'',
        no_of_rutes:'',
        user_data:[],
        status_data:[],
        area_data:[],
        pending_out:'',
        modalOpen_time:false,
        start_time:convertLocalToUTCDate(new Date()),
        end_time:convertLocalToUTCDate(new Date()),
        updated_start_time:convertLocalToUTCDate(new Date()),
        updated_end_time:convertLocalToUTCDate(new Date()),

        is_changed_staus:false,
        is_submit:false,
        record:{}

      };
    }
    componentDidMount()
    {
        const { pathname } = this.props.location;
        const path = pathname.substring(pathname.lastIndexOf('/') + 1)
        this.setState({
            id:path
        })
        this.fetchData(path)
        this.fetchuser()
        this.fetcharea()
        this.fetchstatus()
    }

    fetchData(id) {  
        this.setState({
          loading : true,
          is_submit:false,
        })    
        disputeService.fetchIndividual_api(id)
          .then((res) => { 
            this.setState({   
          loading : false 
                  
            }) 
            if(res.status)
              {
                this.setValue(res.data)
              }   
                            
        
        })
        .catch((error) => { 
          this.setState({
            loading : false
          })
          });   
     }

     setValue(record)
     {
         if(record && record !== null)
         {
             this.setState({
                request_no: record.request_no,
                dispute_no:record.dispute_no,
                customer:record.customer,
                received_time: convertLocalToUTCDate(record.received_time),
                area: record.area,
                publisher:record.publisher,
                publisher_status:record.publisher_status,
                auditor:record.auditor,
                auditor_status:record.auditor_status,
                pub_in_progress:record.pub_in_progress !== null ? record.pub_in_progress : '',
                pub_pending_in:record.pub_pending_in !== null ? record.pub_pending_in : '',
                pub_pending_out:record.pub_pending_out !== null ? record.pub_pending_out : '',
                pub_done_time:record.pub_done_time !== null ? record.pub_done_time : '',
                pub_disregrads:record.pub_disregrads !== null ? record.pub_disregrads : '',
                pub_total:record.pub_total,
                pub_routes:record.pub_routes,
                comments_publisher:record.comments_publisher,
                aud_in_progress:record.aud_in_progress !== null ? record.aud_in_progress : '',
                aud_pending_in:record.aud_pending_in !== null ? record.aud_pending_in : '',
                aud_pending_out:record.aud_pending_out !== null ? record.aud_pending_out : '',
                aud_done_time:record.aud_done_time !== null ? record.aud_done_time : '',
                aud_disregrads:record.aud_disregrads !== null ? record.aud_disregrads : '',
                aud_total:record.aud_total,
                aud_routes:record.aud_routes,
                comments_audit:record.comments_audit,
                error_log:record.error_log,
                start_time:record.start_time,
                end_time:record.end_time,
                updated_start_time:convertLocalToUTCDate(new Date()),
                is_changed_staus:false,
                record:record
             })
         }

     }
     fetchuser() {  
        this.setState({
          loading : true
        })
        userService.fetchpermission_user('RA')
          .then((res) => { 
            this.setState({   
          loading : false 
                  
            }) 
            if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.is_active === 1)
                 var regionlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.username ,value : cusmaidid.username};
                   });  
                    this.setState({
                    user_data :  regionlist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
        })
        .catch((error) => { 
          this.setState({
            loading : false
          })
          });   
     }
   
     fetchstatus() {
        statusService.fetchapi()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var regionlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   });  
                    this.setState({
                        status_data :  regionlist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
     } 
     fetcharea() {
        RAareaService.fetchapi()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var regionlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   });  
                    this.setState({
                    area_data :  regionlist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
     }  
     onChangePublisher(value,key)
     {
      const{ status_data,publisher_status,auditor_status} = this.state
      var list = status_data.filter(option =>(option.label).toUpperCase() === 'TO BE STARTED')
      if(key === 'publisher')
      {
        this.setState({  publisher: value })
        if(publisher_status === null || publisher_status === '')
        {
          if(list.length > 0)
          {
            this.setState({  publisher_status: list[0].value })
          }
        }
      }
      else
      {
        this.setState({  auditor: value })
        if(auditor_status === null || auditor_status === '')
        {
          if(list.length > 0)
          {
            this.setState({  auditor_status: list[0].value })
          }
        }
      }
     
     

     }
    onChangeStatus(value,key)
    {
      // if(is_changed_staus === false)
      // {
        if(key === 'publisher_status')
        {
            this.setState({
                publisher_status:value
            })
           
        }
        else
        {
            this.setState({
                auditor_status:value
            })
        }
        this.setState({
          is_changed_staus:true   
        })
        this.getTimebasedonstatus(value,key)
      // }
      // else
      // {
      //   createNotification('Pleace save the changes','error','filled')
      // }
       
    }
    getTimebasedonstatus(id,key)
    {
      const{ status_data} = this.state
      const current_date = moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
      var value  = getValue(status_data,'value','label',id)
      if((value).toUpperCase() === 'TO BE STARTED')
      {
        if(key === 'publisher_status')
        {
          this.setState({
            pub_in_progress : '',
            pub_pending_in:'',
            pub_pending_out:'',
            pub_done_time:'',
            pub_disregrads:'',
            pub_total:'',
            pub_routes:'',
            auditor:'',
            auditor_status:'',
            aud_in_progress : '',
            aud_pending_in:'',
            aud_pending_out:'',
            aud_done_time:'',
            aud_disregrads:'',
            aud_total:'',
            aud_routes:''
          })
        }
        else
        {
          this.setState({
            aud_in_progress : '',
            aud_pending_in:'',
            aud_pending_out:'',
            aud_done_time:'',
            aud_disregrads:'',
            aud_total:'',
            aud_routes:''
          })
        }
       
      }
      else if((value).toUpperCase() === 'IN PROCESS')
      {
        if(key === 'publisher_status')
        {
        
          this.setState({
            pub_in_progress : current_date,
            pub_pending_in:'',
            pub_pending_out:'',
            pub_done_time:'',
            pub_disregrads:'',
            pub_total:'',
            pub_routes:'',
            auditor:'',
            auditor_status:'',
            aud_in_progress : '',
            aud_pending_in:'',
            aud_pending_out:'',
            aud_done_time:'',
            aud_disregrads:'',
            aud_total:'',
            aud_routes:''
          })
        }
        else
        {
            this.setState({
              aud_in_progress : current_date,
              aud_pending_in:'',
              aud_pending_out:'',
              aud_done_time:'',
              aud_disregrads:'',
              aud_total:'',
              aud_routes:''
            })
   
        }
      
       
      }
      else if((value).toUpperCase() === 'PENDING IN')
      {
        if(key === 'publisher_status')
        {
            this.setState({
                pub_pending_in : current_date,
                pub_pending_out:'',
                pub_done_time:'',
                pub_disregrads:'',
                pub_total:'',
                pub_routes:'',
                auditor:'',
                auditor_status:'',
                aud_in_progress : '',
                aud_pending_in:'',
                aud_pending_out:'',
                aud_done_time:'',
                aud_disregrads:'',
                aud_total:'',
                aud_routes:''
              })
        
        }
        else
        {
            this.setState({
                aud_pending_in : current_date,
                aud_pending_out:'',
                aud_done_time:'',
                aud_disregrads:'',
                aud_total:'',
                aud_routes:'',
                
              })
        
        }
       
      }
      else if((value).toUpperCase() === 'PENDING OUT')
      {
        this.setState({
            modalOpen_time:true,
            is_publish:key,
            
        })
      }
      else if((value).toUpperCase() === 'DONE')
      {
        if(key === 'publisher_status')
        {
            this.setState({
                pub_done_time : current_date,
                pub_disregrads:'',
                auditor:'',
                auditor_status:'',
                aud_in_progress : '',
                aud_pending_in:'',
                aud_pending_out:'',
                aud_done_time:'',
                aud_disregrads:'',
                aud_total:'',
                aud_routes:''
              })
        }
        else
        {
            this.setState({
                aud_done_time : current_date,
                aud_disregrads:'',
              })
        }
        this.setState({
          modalOpen:true,
          is_publish:key,
         })
       
      }
      else if((value).toUpperCase() === 'DISREGARD')
      {
        if(key === 'publisher_status')
        {
            this.setState({
                pub_disregrads : current_date
              })
         
        }
        else
        {
            this.setState({
                aud_disregrads : current_date
              })
        }
      }
     
    }
      onClickback()
      {
        
        this.props.history.goBack()
      }
      onClickCurrenrecord()
      {
      
        localStorage.setItem('dispute_id' , this.state.request_no)
        this.props.history.goBack()
      }
     
   
  getTime(start,end)
  {
    var  new_tat = ''
    if(start !== '' && start !== null && end !== ''&& end !== null)
    {
       new_tat = getTimeDifference(new Date(start),new Date(end))
    }
  
    return new_tat
  }
  

  onSubmit()
  {
    const{id,request_no,dispute_no,customer,booking_no,area
        ,received_time,publisher,publisher_status,pub_in_progress,pub_pending_in,pub_pending_out,
        pub_done_time,pub_disregrads,pub_routes,comments_publisher,auditor,
        auditor_status,aud_in_progress,aud_pending_in,aud_pending_out,
        aud_done_time,aud_disregrads,aud_routes,comments_audit,start_time,end_time,updated_start_time}=this.state
      var isfill = true
      if(dispute_no   === null || dispute_no  === "" || received_time  === null || received_time === "")
      {
        isfill = false
      }
      if(isfill === true)
      {
          var aud_total = '',pub_total = '',updated_end_time= convertLocalToUTCDate(new Date())
          pub_total = this.getTime(pub_pending_out,pub_pending_in)
          aud_total = this.getTime(aud_pending_out,aud_pending_in)

          
          console.log("lkbj pub_total " , pub_total)
          console.log("lkbj aud_total " , aud_total)
          this.setState({
            loading : true,
            pub_total:pub_total,
            aud_total:aud_total,
            })
            const {username} = this.props
        disputeService.updateapi(id,request_no,booking_no,dispute_no,area,customer
          ,received_time,publisher,publisher_status,pub_in_progress,pub_pending_in,pub_pending_out,
          pub_done_time,pub_disregrads,pub_total,pub_routes,comments_publisher,auditor,
          auditor_status,aud_in_progress,aud_pending_in,aud_pending_out,
          aud_done_time,aud_disregrads,aud_total,aud_routes,comments_audit,username,start_time,end_time,updated_start_time,updated_end_time)
          .then((res) => { 
            this.setState({   
              loading : false,
              is_changed_staus:false   
            }) 
            if(res.status)
              {
                createNotification('Updated','success','filled')
                this.fetchData(id)
                
              } else{
                createNotification(res.message,'error','filled')
              }             
        
        })
        .catch((error) => { 
          this.setState({
            loading : false,
            
          })
          
        });
     
      }
      else
      {
        this.setState({
          is_submit:true,
        })
        createNotification('Please fill mandatory field','error','filled')
      }
   
  }
  handleDelete(id)
  {
    
    this.setState({   
        loading : true     
      }) 
    disputeService.deleteapi(id)
    .then((res) => {
      if(res){
        this.setState({   
            loading : false     
          }) 
        createNotification('Deleted','success','filled')
        this.onClickback()
      }			
    })
    .catch((error) => { });
  }
  getDisabled(key,data)
  {
    const {request_no,publisher,publisher_status,auditor} = this.state
    const {role_permission_data} = this.props
    const is_adimin_Edit = getPermission(role_permission_data,'RA','Dispute - Details Box',true)
    var isDisabled = true
    if(is_adimin_Edit === true)
    {
      if(getEnableStatus(key,data,request_no,publisher,publisher_status,auditor) === false)
      {
        isDisabled = false
      }

    }
    return isDisabled
  }
  getTimeDisabled(key,status,value)
  {
    const {status_data,record} = this.state
    const {role_permission_data} = this.props
    const is_adimin_Edit = getPermission(role_permission_data,'RA','Dispute - Details Box',true)
   
    var isDisabled = true
    if(is_adimin_Edit === true)
    {
      var statusss =  getValue(status_data,'value','label',status)
      if(statusss !== '')
      {
        statusss = statusss.toUpperCase()
        if(statusss === 'IN PROCESS' ||statusss === 'PENDING IN'|| statusss === 'PENDING OUT' || statusss === 'DONE'|| statusss === 'DISREGARD')
        {
          if(value !== '' || record[key]  !== '')
          {
            isDisabled = false
          }
        }
        if(key === 'pub_routes' || key === 'aud_routes')
        {
          statusss = statusss.toUpperCase()
          if(statusss === 'DONE')
          {
            isDisabled = false
          }
  
        }
       
       
      }

    }
    
    return isDisabled
  }
  getDateTime(date)
  {
    var d_value = ''
    if(date && date !== null && date !== '')
    {
      d_value = new Date(date)
    }

    return d_value

  }
  getStatustime(value)
  {
    const {status_data} = this.state
    var list  = [...getStausOptionEnable(status_data,value)]
    const {role_permission_data} = this.props
    const is_adimin_Edit = getPermission(role_permission_data,'RA','Dispute - Details Box',true)
    if(is_adimin_Edit === true)
    {
     
      list = [...getStausOptionAdminEnable(status_data,value)]
      
    }
  
    return list
  }

  getDate(date)
  {
    var value = ''
    if(date && date !== null && date !== '' && date !== 'Invalid date')
    {
      value = convertLocalToUTCDate(new Date(date))
    }

    return value
  }
   setDate(date)
  {
    var value = ''
    
    if(date && date !== null && date !== '' )
    {
      let dates =  moment(convertUTCToLocalDate(date)).format('MM/DD/YYYY hh:mm:ss a')
      if(dates !== 'Invalid date')
      {
        value = dates
      }
      
    }

    return value
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
        const{loading,id,user_data,area_data,status_data,request_no,dispute_no,customer,area
        ,received_time,publisher,publisher_status,pub_in_progress,pub_pending_in,pub_pending_out,
        pub_done_time,pub_disregrads,pub_total,pub_routes,comments_publisher,auditor,
        auditor_status,aud_in_progress,aud_pending_in,aud_pending_out,is_submit,
        aud_done_time,aud_disregrads,aud_total,aud_routes,comments_audit}=this.state
        const {locale,languageData,role_permission_data,match} = this.props
        const is_adimin_Edit = getPermission(role_permission_data,'RA','Dispute - Details Box',true)
        return (
            <>
            <title>{onChangeLanguage(locale,'Dispute - Details Box',languageData)}</title>
            {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <Row>
              <Colxx xxs="12">
              <div className = "row">
                      <div className = "col-md-10">
                      <Breadcrumb heading={onChangeLanguage(locale,'Dispute - Details Box',languageData)} match={match} />
                    </div>
                  </div>
               
                
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
            <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
            <div className = "row" style = {{}}>
                    <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Request No',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {request_no}  
                            disabled = {true}
                            />
                            
                    </div>
                    <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Dispute No',languageData)}</Label>
                            <Input  className = {is_submit === true && dispute_no === ''?  "error-border":"fontstyle text-background" } 
                            placeholder = ''
                            value = {dispute_no}  
                            onChange={(e) =>this.setState({dispute_no:e.target.value})}
                            disabled = {!is_adimin_Edit}
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Customer Name',languageData)}</Label>
                                <Input  className = "fontstyle text-background"  
                                  placeholder = ''
                                  value = {customer}  
                                  onChange={(e) =>this.setState({customer:e.target.value})}
                                  disabled = {!is_adimin_Edit}
                                  />
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Received Time',languageData)}
                            <a style = {{color :'red'}}>*</a>
                            <a className = 'fontstyle mandatory-label'>
                                {is_submit === true && received_time === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a></Label>
                             <DatePicker
                                  selected={received_time }
                                  className = "text-background"
                                  disabled = {!is_adimin_Edit}
                                  onChange={(date) => this.setState({received_time  : date})}
                                  />
                           
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Area',languageData)}</Label>
                            <Select className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={area_data.filter(option =>option.value === area)}
                                options={area_data}
                                isDisabled = {!is_adimin_Edit} 
                                onChange={({value}) =>this.setState({area:value})}
                              />
                        </div>
                        
                        </div>
                    </div>
            <div className = "row" style = {{marginBottom:'30px',paddingBottom:'20px'}}>
                 <div className = "col-md-12">
                    <div className = "publishuser-card-component" style = {{borderRadius:'10px'}}>
                            <div className = "publish-title" >
                                <Row>
                                    <Colxx xxs="4">
                                        <Label  className = "fontstyle" 
                                        style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'Publish Details',languageData)}</Label>
                                    </Colxx>
                                </Row>
                            </div>
                            <div className = "row" style = {{padding:'10px'}}>
                            <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Publish By',languageData)}</Label>
                             <Select  
                                className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={user_data.filter(option =>option.value === publisher)}
                                options={user_data}
                                isDisabled={this.getDisabled('publisher',user_data)}
                                onChange={({value}) => this.onChangePublisher(value,'publisher') }
                      />
                    </div>
                    <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Status',languageData)}</Label>
                             <Select className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={status_data.filter(option =>option.value === publisher_status)}
                                options={this.getStatustime(publisher_status)}
                                styles={customStyles}
                                isDisabled={this.getDisabled('publisher_status',status_data)}
                                onChange={({value}) =>this.onChangeStatus(value,'publisher_status')}
                      />
                    </div>
                 
                   
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Pub. In Progress',languageData)}</Label>
                               {/* <Input  className = "fontstyle text-background"  
                                placeholder = 'MM/DD/YYYY hh:mm:ss AM/PM'
                                value = {pub_in_progress} 
                                disabled = {true}
                                /> */}
                                <DatePicker
                                  selected={this.getDate(pub_in_progress) }
                                  className = "text-background"
                                  disabled = {this.getTimeDisabled('pub_in_progress',publisher_status,pub_in_progress)}
                                  onChange={(date) =>  this.setState({pub_in_progress  : this.setDate(date)})}
                                  />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Pub. Pending In',languageData)}</Label>
                                <DatePicker
                                  selected={this.getDate(pub_pending_in) }
                                  className = "text-background"
                                  disabled = {this.getTimeDisabled('pub_pending_in',publisher_status,pub_pending_in)}
                                  onChange={(date) => this.setState({pub_pending_in  : this.setDate(date)})}
                                  />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Pub. Pending Out',languageData)}</Label>
                                 <DatePicker
                                  selected={this.getDate(pub_pending_out) }
                                  className = "text-background"
                                  disabled = {this.getTimeDisabled('pub_pending_out',publisher_status,pub_pending_out)}
                                  onChange={(date) => this.setState({pub_pending_out  : this.setDate(date)})}
                                  />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Pub. Done Time',languageData)}</Label>
                             
                                 <DatePicker
                                  selected={this.getDate(pub_done_time) }
                                  className = "text-background"
                                  disabled = {this.getTimeDisabled('pub_done_time',publisher_status,pub_done_time)}
                                  onChange={(date) => this.setState({pub_done_time  : this.setDate(date)})}
                                  />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Pub. Disregards',languageData)}</Label>
                                 <DatePicker
                                  selected={this.getDate(pub_disregrads) }
                                  className = "text-background"
                                  disabled = {this.getTimeDisabled('pub_disregrads',publisher_status,pub_disregrads)}
                                  onChange={(date) => this.setState({pub_disregrads  : this.setDate(date)})}
                                  />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Pub. Total Time In Pending',languageData)}</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {pub_total} 
                            disabled = {true}
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Pub. Total Routes',languageData)}</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            min="1"
                            type = 'number'
                            value = {pub_routes} 
                            onKeyDown={this.handleKeypress}
                            onChange= {(e)=>this.setState({pub_routes : e.target.value})}  
                            disabled = {this.getTimeDisabled('pub_routes',publisher_status,pub_routes)} 
                            />
                        </div>
                        <div className = "col-md-2" style = {{marginTop:'20px'}}>
                        
                            </div>
                          
                            <div className = "col-md-12 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Comments',languageData)}</Label>
                            <textarea  className = "fontstyle textarea-background"  
                            placeholder = ''
                            disabled = {!is_adimin_Edit} 
                            value = {comments_publisher}  
                            onChange= {(e)=>this.setState({comments_publisher : e.target.value})} 
                            />
                        </div>
                    </div>
                    </div>
                    </div> 
                </div>
                <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                        <div className = "publish-title" >
                                <Row>
                                    <Colxx xxs="4">
                                        <Label  className = "fontstyle" 
                                        style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'Audit Details',languageData)}</Label>
                                    </Colxx>
                                </Row>
                            </div>
                    <div className = "row" style = {{padding:'10px'}}>
                    <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Audited By',languageData)}</Label>
                             <Select  className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={user_data.filter(option =>option.value === auditor)}
                                options={user_data.filter(option =>option.value !== publisher)}
                                isDisabled={this.getDisabled('auditor',status_data)}
                                onChange={({value}) => this.onChangePublisher(value,'auditor') }
                            />
                    </div>
                    <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Status',languageData)}</Label>
                            <Select className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={status_data.filter(option =>option.value === auditor_status)}
                                options={this.getStatustime(auditor_status)}
                                styles={customStyles}
                                isDisabled={this.getDisabled('auditor_status',status_data)}
                                onChange={({value}) =>this.onChangeStatus(value,'auditor_status')}
                            />
                    </div>
                   
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Aud. In Progress',languageData)}</Label>
                                 <DatePicker
                                  selected={this.getDate(aud_in_progress) }
                                  className = "text-background"
                                  disabled = {this.getTimeDisabled('aud_in_progress',auditor_status)}
                                  onChange={(date) => this.setState({aud_in_progress  : this.setDate(date)})}
                                  />
                                 
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Aud. Pending In',languageData)}</Label>

                                 <DatePicker
                                  selected={this.getDate(aud_pending_in) }
                                  className = "text-background"
                                  disabled = {this.getTimeDisabled('aud_pending_in',auditor_status,aud_pending_in)}
                                  onChange={(date) => this.setState({aud_pending_in  : this.setDate(date)})}
                                  />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Aud. Pending Out',languageData)}</Label>
                                 <DatePicker
                                  selected={this.getDate(aud_pending_out) }
                                  className = "text-background"
                                  disabled = {this.getTimeDisabled('aud_pending_out',auditor_status,aud_pending_out)}
                                  onChange={(date) => this.setState({aud_pending_out  : this.setDate(date)})}
                                  />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Aud. Done Time',languageData)}</Label>
                            <DatePicker
                              selected={this.getDate(aud_done_time) }
                              className = "text-background"
                              disabled = {this.getTimeDisabled('aud_done_time',auditor_status,aud_done_time)}
                              onChange={(date) => this.setState({aud_done_time  : this.setDate(date)})}
                              />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Aud. Disregards',languageData)}</Label>
                            <DatePicker
                              selected={this.getDate(aud_disregrads) }
                              className = "text-background"
                              disabled = {this.getTimeDisabled('aud_disregrads',auditor_status,aud_disregrads)}
                              onChange={(date) => this.setState({aud_disregrads  : this.setDate(date)})}
                              />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Aud. Total Time In Pending',languageData)}</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {aud_total} 
                            disabled = {true}
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Aud. Total Routes',languageData)}</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {aud_routes} 
                            min="1"
                            type = 'number'
                            onKeyDown={this.handleKeypress}
                            onChange= {(e)=>this.setState({aud_routes : e.target.value})} 
                            disabled = {this.getTimeDisabled('aud_routes',auditor_status,aud_routes)}
                            />
                        </div>
                        <div className = "col-md-12 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Comments',languageData)}</Label>
                            <textarea className = "fontstyle textarea-background"  
                                placeholder = ''
                                disabled = {!is_adimin_Edit} 
                                value = {comments_audit}  
                                onChange= {(e)=>this.setState({comments_audit : e.target.value})} 
                            />
                        </div>
                    </div>
                </div>   
                <div className = "row text-center" style = {{margin:'0px 5px'}}>
                        <Button disabled = {!is_adimin_Edit}
                            className = "button-width" color="primary"  
                            onClick={()=>this.onSubmit()}
                        >
                      {onChangeLanguage(locale,'Save',languageData)}  
                        </Button>
                        <Button className = "button-width" color="secondary" 
                                onClick={()=>this.onClickback()}
                        >
                       {onChangeLanguage(locale,'Back',languageData)} 
                        </Button>
                        <Button disabled = {!is_adimin_Edit}
                          className = "button-width" color="primary"  
                          onClick={()=>this.handleDelete(id)}
                          >
                          {onChangeLanguage(locale,'Delete Current Record',languageData)} 
                          </Button>
                       
                        <Button 
                            className = "button-width" color="secondary"  
                            onClick={()=>this.onClickCurrenrecord()}
                        >
                      {onChangeLanguage(locale,'Open Current Record',languageData)}  
                        </Button>
                       
                        <Button className = "button-width"
                       color="secondary" 
                        onClick={()=>this.fetchData(id)}
                        >
                      {onChangeLanguage(locale,'Refresh',languageData)}  
                    </Button>
                </div>
            </div>
            {this.renderModal()}
            {this.renderModal_PendingOut()}
          </>
        )
    }
    
    setRoutes_value()
    {
      const {no_of_rutes,is_publish} = this.state
     
      if(no_of_rutes !== '')
      {
          if(is_publish === 'publisher_status')
          {
              this.setState({
                  pub_routes:no_of_rutes
              }) 
          }
          else
          {
              this.setState({
                  aud_routes:no_of_rutes
              }) 
          }
        this.closeModal()
      }
      else
      {
          createNotification('Please fill the value','error','filled')
      }
    }
    closeModal()
    {
      this.setState({
        modalOpen : false,
        no_of_rutes:'',
        is_publish:'',
        modalOpen_time:false,
        pending_out:''
      })     
    }
   
    renderModal()
    {
       
      const {modalOpen,no_of_rutes} = this.state
      const {locale,languageData} = this.props
      return (
          <Modal
            isOpen={modalOpen}
            toggle={this.setRoutes_value}
            wrapClassName="modal-right"
            backdrop="static"
          >
            <ModalHeader className = "fontstyle"  toggle={()=>this.setRoutes_value()}>
            {onChangeLanguage(locale,'Please Enter the Value',languageData)}
            </ModalHeader>
            <ModalBody>
            <div className = "col-md-12 space-margin"  >
                    
                    <Input  className = "fontstyle text-background"  
                    placeholder = ''
                    type = 'number'
                    min="1"
                    value = {no_of_rutes}  
                    onKeyDown={this.handleKeypress}
                    onChange= {(e)=>this.setState({no_of_rutes : e.target.value})}
                    />
                </div>
             <Colxx xxs="12"> 
            <div className = "text-center">
            
                    <Button className = "button-width" color="secondary" onClick={()=>this.setRoutes_value()}>
                          {onChangeLanguage(locale,'Submit',languageData)} 
                  </Button>
            </div>
            </Colxx>  
            </ModalBody>
          
          </Modal>
        );
    }
    setPendingtime()
    {
      const {pending_out,is_publish,pub_pending_in,aud_pending_in} = this.state
     
      if(pending_out !== '')
      {
        var isfill = false
        if(is_publish === 'publisher_status')
        {
          var startdate = pub_pending_in !== '' ? new Date(pub_pending_in) : new Date()

          if ((Date.parse(pending_out) > Date.parse(startdate)))
          {
            isfill = true
          }
        }
        else
        {
          var startdate = aud_pending_in !== '' ? new Date(aud_pending_in) : new Date()

          if ((Date.parse(pending_out) > Date.parse(startdate)))
          {
            isfill = true
          }
       
        }
        if(isfill == true)
        {
          if(is_publish === 'publisher_status')
          {
              this.setState({
                  pub_pending_out:moment(convertUTCToLocalDate(pending_out)).format('MM/DD/YYYY hh:mm:ss a'),
                  pub_done_time:'',
                  pub_disregrads:'',
                  pub_total:'',
                  pub_routes:'',
                  auditor:'',
                  auditor_status:'',
                  aud_in_progress : '',
                  aud_pending_in:'',
                  aud_pending_out:'',
                  aud_done_time:'',
                  aud_disregrads:'',
                  aud_total:'',
                  aud_routes:''
              }) 
          }
          else
          {
              this.setState({
                  aud_pending_out:moment(convertUTCToLocalDate(pending_out)).format('MM/DD/YYYY hh:mm:ss a'),
                  aud_done_time:'',
                  aud_disregrads:'',
                  aud_total:'',
                  aud_routes:''
              }) 
          }
          this.closeModal()
        }
        else
        {
          createNotification('Pending Out Greater than Pening In or Current Date/Time','error','filled')
        }
      }
      else
      {
          createNotification('Please fill the value','error','filled')
      }
    }
    onChangePendingtime(date)
    {
      this.setState({pending_out  : date})
    }
    renderModal_PendingOut()
    {
       
      const {modalOpen_time,pending_out,pub_pending_in} = this.state
      const {locale,languageData} = this.props
      var min_date = new Date()
      if(pub_pending_in !== '' && pub_pending_in !== null)
      {
        min_date = new Date(pub_pending_in)
      }
      return (
          <Modal
            isOpen={modalOpen_time}
            toggle={this.setPendingtime}
            wrapClassName="modal-right"
            backdrop="static"
          >
            <ModalHeader className = "fontstyle"  toggle={()=>this.setPendingtime()}>
              {onChangeLanguage(locale,'Pending Out Date/Time',languageData)}
            </ModalHeader>
            <ModalBody>
            <div className = "col-md-12 space-margin"  >
                    
                    <DatePicker
                      min_date= {min_date}
                      selected={pending_out}
                      className = "text-background"
                      onChange={(date) => this.onChangePendingtime(date)}
                      />
                </div>
             <Colxx xxs="12"> 
            <div className = "text-center">
            
                    <Button className = "button-width" color="secondary" onClick={()=>this.setPendingtime()}>
                          {onChangeLanguage(locale,'Submit',languageData)} 
                  </Button>
            </div>
            </Colxx>  
            </ModalBody>
          
          </Modal>
        );
    }
}

const mapStateToProps = ({ settings }) => {
    const { locale,languageData,username,role_permission_data} = settings;
    return {locale, languageData,username,role_permission_data};
  };
    export default withRouter(
      connect(mapStateToProps, {
  
     })(QueryResolveSheet)
    );

