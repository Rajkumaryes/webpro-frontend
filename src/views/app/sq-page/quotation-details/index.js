import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button,ModalHeader,Modal,ModalBody} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { Table } from 'antd';
import{quotationdetailsService} from '../../../../redux/sq/qutodationdetails/saga'
import{userService} from '../../../../redux/users/saga'
import Loading from "react-fullscreen-loading";
import{StatusService} from '../../../../redux/sq/sqmasters/status/saga'
import{PriorityService} from '../../../../redux/sq/sqmasters/priority/saga'
import{SQareaService} from '../../../../redux/sq/sqmasters/area/saga'
import{regionService} from '../../../../redux/sq/sqmasters/region/saga'
import{TypeService} from '../../../../redux/sq/sqmasters/Typeofrequest/saga'
import{SizeService} from '../../../../redux/sq/sqmasters/size/saga'
import{roleService} from '../../../../redux/role/saga'
import {onChangeLanguage,getTimeDifference,getValue,getAreaValue,getEnableStatus,
      customStyles,getStausOptionEnable,convertLocalToUTCDate,convertUTCToLocalDate,
      getStausOptionAdminEnable,getPermission} from '../../../../helper'
import { createNotification } from '../../../../toast';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import DatePicker from "../../datePicker";
import moment from 'moment';
import { adminRoot } from "../../../../constants/defaultValues";
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../constants/defaultValues';
import Workbook from 'react-excel-workbook'
import{sharedService} from '../../../../redux/sq/sharedscreen/saga'

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        region:'',
        start_date:'',
        end_date:'',
        area:'',
        priority:'',
        size:'',
        quotation_no:'',
        request_no:'',
        publisher:'',
        publisher_status:'',
        auditor:'',
        auditor_status:'',
        created_at:'',
        updated_at:'',
        areadata:[],
        priority_data:[],
        publisherdata:[],
        auditordata:[],
        status_data:[],
        data:[], 
        selectedRowKeys: [],
        column_value:[],
        region_data:[],
        typeofrequestdata:[],
        size_data:[],
        submit_column:false,
        is_submit_table:false,
        column_name:'',
        modalOpen:false,
        dynamic_columns :[],
        select_index : -1,
        is_shared:false,
        priority_dynamic_data:[],
        area_dynamic_data:[],
        page:1,
        pageSize:25,
        total :0,
        modalOpen_routes:false,
        modalOpen_time:false,
        no_of_rutes:'',
        pending_out:'',
        modal_index:-1,
        is_publish:'',
        is_search:false,
        is_adimin_Edit:false,
        modalOpen_delete:false,
      };
    }
    componentDidMount()
    {
      
          // this.fetchData()
        this.fetchpriority()
        this.fetchstatus()
        this.fetchpublisher()
        this.fetcharea()
        this.fetchregion()
        this.fetchtype()
        this.fetchsize()
        this.fetchroleData()
        this.ClearValue(1,25)
    }
    fetchIndividualrequestnodetails(request_no_open) {
      const {area,priority,size,quotation_no,publisher,publisher_status,auditor,auditor_status,created_at,updated_at} = this.state 
          this.setState({
              loading : true
          })
          quotationdetailsService.filter_api(request_no_open,area,priority,size,quotation_no,publisher,publisher_status,auditor,auditor_status,created_at,updated_at)
          .then((res) => {
              if(res.status)   { 
                      this.setState({
                          data :  res.data,})
                          }
                       else{
                      createNotification(res.message,'error','filled')
                       this.setState({
                          data:[],
                          loading:false})}
                       })
                       .catch((error) => { }); 
                       this.setState({loading:false})
   }
  
    fetchData() {
        this.setState({
            loading : true
          })
        quotationdetailsService.fetchapi()
        .then((res) => {
           if(res.status)   { 
            var list = [...res.data]
            if(localStorage.getItem('request_no_id') !== null)
            {
              list = list.filter(item => parseInt(item.id) === parseInt(localStorage.getItem('request_no_id')))
              localStorage.removeItem('request_no_id')
            }
            this.setState({
            data :  res.data,
            // dynamic_columns:res.dynamic_columns,
            select_index : -1  , 
            is_shared:false,
            selectedRowKeys:[]
            })
            }
           else{
            this.setState({
              data:[]  , 
              dynamic_columns:[],
              is_shared:false,
              selectedRowKeys:[],
              loading:false})}
            })
          .catch((error) => { }); 
          this.setState({loading:false})
      } 
    fetcharea() {
        SQareaService.fetcharea()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var regionlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString(),region : cusmaidid.region};
                   });  
                    this.setState({
                    areadata :  regionlist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  
     fetchsize() {
        SizeService.fetchsize()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var regionlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   });  
                    this.setState({
                    size_data :  regionlist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  
     fetchregion() {
        regionService.fetchregion()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var regionlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   });  
                    this.setState({
                    region_data :  regionlist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     } 
     fetchtype() {
        TypeService.fetchtype()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var regionlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   });  
                    this.setState({
                    typeofrequestdata :  regionlist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  
     fetchpriority() {
        PriorityService.fetchpriority()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var regionlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   });  
                    this.setState({
                    priority_data:  regionlist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  
     fetchpublisher() {
      userService.fetchpermission_user('SQ')
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.is_active === 1)
                 var regionlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.username ,value : cusmaidid.username};
                   });  
                    this.setState({
                    publisherdata:  regionlist,
                    auditordata:  regionlist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  
     fetchstatus() {
        StatusService.fetchstatus()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var regionlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   });  
                    this.setState({
                    status_data:  regionlist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  
     fetchroleData() {  
      this.setState({
        loading : true
      })
      roleService.fetchroleData()
        .then((res) => { 
          this.setState({   
        loading : false 
                
          }) 
          if(res.status)
            {
              var role_id = localStorage.getItem("role_id")
              if(role_id !== null)
              {
                let filterstatus = (res.data).filter(item => ((item.name).toLowerCase() === 'admin' || (item.name).toLowerCase() === 'tl' || (item.name).toLowerCase() === 'manager' ||  (item.name).toLowerCase() === 'match code super user'  ))
                let is_role = (filterstatus).filter(item => (parseInt(role_id) === item.id))
                if(is_role.length > 0)
                {
                  this.setState({
                    is_adimin_Edit:true
                  })
                }
              }
             
              
  
            }            
      
      })
      .catch((error) => { 
        this.setState({
          loading : false
        })
        });   
   }
     onSubmitFilter(is_create)
    {
      const { page,pageSize,request_no,area,priority,size,quotation_no,publisher,publisher_status,auditor,
        auditor_status,start_date,end_date,region} = this.state
    var isfill = false,is_date = true
    if(start_date !== '' || end_date !== '' || request_no !== "" || quotation_no !== '' ||
    publisher !== '' ||  publisher_status !== '' || auditor !== '' || 
    auditor_status !== '' || size !== '' || priority !== '' || area !== '')
    {
      if(start_date !== '' && start_date !== null )
        {
            if(end_date === '' || end_date === null)
            {
                is_date = false
                createNotification('Please Choose end date','error','filled')
            }
            else
            {
                is_date = true
            }
            isfill = true
        }
        else  if(end_date !== '' )
        {
            if(start_date === '' || start_date === null)
            {
                is_date = false
                createNotification('Please Choose start date','error','filled')
            }
            else
            {
                is_date = true
            }
            isfill = true
        }
        else
        {
            isfill = true
        }
        
    }

      if(isfill === true && is_date || is_create === true)
      {
        
          if(is_create === false)
          {
            this.setState({
              loading : true,
              is_search:true
            })
            this.fetchPagination(1,25,request_no,area,priority,size,quotation_no,publisher,publisher_status,auditor,auditor_status,start_date,end_date,region,is_create)
          } else{
            this.fetchPagination(page,pageSize,request_no,area,priority,size,quotation_no,publisher,publisher_status,auditor,auditor_status,start_date,end_date,region,is_create)
          }
          
          
      }
      else
      {
          if(is_date === true)
          {
            createNotification('Please Choose any one details then can search','error','filled')
          }
       
      }
    }
    ClearValue(page,pagesize)
    {
        this.setState({
            request_no:'',
            area:'',
            priority:'',
            size:'',
            quotation_no:'',
            publisher:'',
            publisher_status:'',
            auditor:'',
            auditor_status:'',
            start_date:'',
            end_date:'',
            created_at:'',
            updated_at:'',
            is_submit_table:false,
            select_index : -1,
            is_shared:false,
            dynamic_columns:[],
            is_search : false
        })
       this.fetchPagination(page,pagesize,'','','','','','', '','','','','','',false)
    }
    fetchPagination(page,per_page,request_no,area,priority,size,quotation_no,publisher,
      publisher_status,auditor,auditor_status,start_date,end_date,region,is_create)
    {

      if(is_create === false)
      {
        this.setState({
          loading : true,
        })
      }
      this.setState({
        priority_dynamic_data:[],
        area_dynamic_data:[],
      })
      quotationdetailsService.filterapi(page,per_page,request_no,area,priority,size,quotation_no,publisher,publisher_status,auditor,auditor_status,start_date,end_date,region)
        .then((res) => { 
          this.setState({   
            loading : false,
            select_index : -1,
            is_shared:false,
            selectedRowKeys:[],   
            pageSize : per_page,
            page:page, 
          }) 
          if(res.status)
            {
              if(res.data)
              {
                
                var list = [...res.data]
                if(localStorage.getItem('request_no_id') !== null)
                    {
                      list = list.filter(item => parseInt(item.id) === parseInt(localStorage.getItem('request_no_id')))
                      localStorage.removeItem('request_no_id')
                      this.setState({
                        data:list,
                        total : res.total,
                        dynamic_columns:res.dynamic_columns,
                        })
                    }
               
                    else{
                      if(is_create === false)
                      {
                        this.setState({
                          data:res.data,
                          total : res.total,
                          dynamic_columns:res.dynamic_columns,
                        })
                      }
                      this.setState({
                        priority_dynamic_data:res.priority,
                        area_dynamic_data:res.area,
                      })
                      console.log()
                    }
                }
                 
            } else{
                this.setState({
                    data:[],
                    pageSize : 25,
                    page:1, 
                    total:0
                })
             
            }             
      
      })
      .catch((error) => { 
        this.setState({
          loading : false,
          
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
    onCopy()
    {
        navigator.clipboard.writeText(this.state.contractno)
    }
    
    onClickDetails(id){
      if(id !== -1)
      {
        this.props.history.push(`${adminRoot}/sq/general-information/${id}`)
      }
      else
      {
        createNotification('Please choose row','error','filled')
      }
   
    }
    onClickshared()
    {
      const {select_index} = this.state
      if(select_index !== -1)
      {
        this.props.history.push(`${adminRoot}/sq/sharedpage/${select_index}`)
      }
      else
      {
        createNotification('Please choose row','error','filled')
      }
  }
    onChangeControl(){
      const {select_index} = this.state
      if(select_index !== -1)
      {
        localStorage.setItem('request_no_id' , select_index)
      }
      this.props.history.push(`${adminRoot}/sq/controlpage`)
       
    }
    
    onChangeFileUpload(files)
	{
    const {username} = this.props
    this.setState({
      loading : true
    })
    
    quotationdetailsService.fileUpload(files[0],username)
      .then((res) => { 
        if(res.status)
        {
          if(res.data.status)   
          {   
         
            createNotification('Uploaded','success','filled')
            this.ClearValue(1,25)
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
  onKeyDownValue_row(e,record,key)
    { 
     
      var code = e.keyCode || e.which;
          if (code === 9) 
         {
            if(record[key] !== '' || key === 'customer_require' || key === 'quotation_no')
           {
            var is_new = false
            if(typeof record.id == 'string')
            {
              is_new = true
            }
            this.onSubmitData(record,is_new,false)
          }
       }
    }
    onKeyPressValue_row(e,record,key)
    { 
     
      if (e.key == 'Enter') {
        if(record[key] !== '' || key === 'customer_require' || key === 'quotation_no')
        {
          var is_new = false
          if(typeof record.id == 'string')
          {
            is_new = true
          }
          this.onSubmitData(record,is_new,false)
        }
      }
    }
  onChangeValue_row(value,id,key)
    { 
      const{ status_data} = this.state
      const data = [...this.state.data]
      const index = data.findIndex(x => x.id === id)
        if(index >= 0)
        {
          
            data[index][key] = value
            if(key === 'region')
            {
              data[index].area = ''
            }
            if(key === 'publisher_status')
            {
              data[index] = this.getTimebasedonstatus(value,key,data[index],index)
             
            }
            else if(key === 'auditor_status')
            {
              data[index] = this.getTimebasedonstatus(value,key,data[index],index)
            } 
          this.setState({
            data:data
          })
          if(key === 'region' || key === 'area'  || key === 'priority' || key === 'size' || key ==='type_of_req'
          || key === 'publisher' || key === 'publisher_status' || key === 'auditor'|| key === 'auditor_status')
          {
            if(typeof id == 'number')
            {
                var is_priority = false
                if( key === 'priority' || key === 'size' || key === 'publisher' || key === 'publisher_status' || key === 'auditor'|| key === 'auditor_status')
                {
                  is_priority = true
                }
                data[index].updated_start_time =convertLocalToUTCDate(new Date())
                this.onSubmitData(data[index],false,is_priority)
            }
          }
          
        }
        this.setState({
          select_index : -1,
          is_shared:false,
        })
    }

   getTimebasedonstatus(id,key,item,index)
    {
      const{ status_data} = this.state
      var record =  {...item}
      const current_date = moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
      var value  = getValue(status_data,'value','label',id)
      if((value).toUpperCase() === 'TO BE STARTED')
      {
        if(key === 'publisher_status')
        {
          record.pub_in_progress = ''
          record.pub_pending_in =''
          record.pub_pending_out =''
          record.pub_done_time =''
          record.pub_disregrads =''
          record.pub_total =''
          record.pub_routes =''
          record.auditor =''
          record.auditor_status =''
          record.aud_in_progress  = ''
          record.aud_pending_in =''
          record.aud_pending_out =''
          record.aud_done_time =''
          record.aud_disregrads =''
          record.aud_total =''
          record.aud_routes =''
        }
        else
        {
          record.aud_in_progress  = ''
          record.aud_pending_in =''
          record.aud_pending_out =''
          record.aud_done_time =''
          record.aud_disregrads =''
          record.aud_total =''
          record.aud_routes =''
        }
       
      }
      else if((value).toUpperCase() === 'IN PROCESS')
      {
        if(key === 'publisher_status')
        {
          record.pub_in_progress = current_date
          record.pub_pending_in =''
          record.pub_pending_out =''
          record.pub_done_time =''
          record.pub_disregrads =''
          record.pub_total =''
          record.pub_routes =''
          record.auditor =''
          record.auditor_status =''
          record.aud_in_progress  = ''
          record.aud_pending_in =''
          record.aud_pending_out =''
          record.aud_done_time =''
          record.aud_disregrads =''
          record.aud_total =''
          record.aud_routes =''
        }
        else
        {
          record.aud_in_progress = current_date
          record.aud_pending_in =''
          record.aud_pending_out =''
          record.aud_done_time =''
          record.aud_disregrads =''
          record.aud_total =''
          record.aud_routes =''
        }
       
      }
      else if((value).toUpperCase() === 'PENDING IN')
      {
        if(key === 'publisher_status')
        {
          record.pub_pending_in = current_date
          record.pub_pending_out =''
          record.pub_done_time =''
          record.pub_disregrads =''
          record.pub_total =''
          record.pub_routes =''
          record.auditor =''
          record.auditor_status =''
          record.aud_in_progress  = ''
          record.aud_pending_in =''
          record.aud_pending_out =''
          record.aud_done_time =''
          record.aud_disregrads =''
          record.aud_total =''
          record.aud_routes =''
        }
        else
        {
          record.aud_pending_in = current_date
          record.aud_pending_out =''
          record.aud_done_time =''
          record.aud_disregrads =''
          record.aud_total =''
          record.aud_routes =''
        }
       
      }
      else if((value).toUpperCase() === 'PENDING OUT')
      {
        this.setState({
          modal_index:index,
          is_publish:key,
          modalOpen_time:true
        })
       
      }
      else if((value).toUpperCase() === 'DONE')
      {
        if(key === 'publisher_status')
        {
          record.pub_done_time = current_date
          record.pub_disregrads =''
          record.pub_routes =''
          record.auditor =''
          record.auditor_status =''
          record.aud_in_progress  = ''
          record.aud_pending_in =''
          record.aud_pending_out =''
          record.aud_done_time =''
          record.aud_disregrads =''
          record.aud_total =''
          record.aud_routes =''
        }
        else
        {
          record.aud_done_time = current_date
          record.aud_disregrads =''
          record.aud_routes =''
        }
        this.setState({
          modal_index:index,
          is_publish:key,
          modalOpen_routes:true
        })
        this.fetchDatabasedReq(record.id,record.publisher,record.auditor,key)
      }
      else if((value).toUpperCase() === 'DISREGARD')
      {
        if(key === 'publisher_status')
        {
          record.pub_disregrads = current_date
        }
        else
        {
          record.aud_disregrads = current_date
        }
      }
      
      return record

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
    onSubmitData(value,is_new,is_priority)
    {
      const { status_data} = this.state
            const id = value.id
            var isfill = true
            var record = Object.assign({}, value);
           
            if(typeof record.id === 'string')
            {
              record.id = 0
              record.end_time = convertLocalToUTCDate(new Date())
            }
            if( record.received_time  === null || record.received_time === "")
            {
              isfill = false
            }
            if(record.received_time  !== "" && record.received_time  !== null)
            {
              var times = moment(record.received_time).format('MM/DD/YYYY hh:mm:ss a')
              if(times === "Invalid date" )
              {
                isfill = false
              }
            }
            if(record.customer_require  !== "" && record.customer_require  !== null)
            {
            
              let re = /^\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}:\d{2}:\d{2} ([AaPp][Mm])?$/ ;
              let customer_require =(record.customer_require).match(re)
              if(customer_require === null )
              {
                isfill = false
              }
            }
            const {username} = this.props
            record.user_id = username
            record.status = 1
            record.updated_end_time = convertLocalToUTCDate(new Date())
            record.error_log = record.error_log !== null ?record.error_log  : false
            record.pub_total = this.getTime(record.pub_pending_out,record.pub_pending_in)
            record.aud_total = this.getTime( record.aud_pending_out, record.aud_pending_in)
            record.undefined = undefined
           
          if(isfill === true )
          {
            var list = status_data.filter(option =>(option.label).toUpperCase() === 'TO BE STARTED')
            if(record.publisher_status === null || record.publisher_status === '')
            {
              if(list.length > 0)
              {
                record.publisher_status = list[0].value
              }
            
            }
            if(record.auditor_status === null || record.auditor_status === '')
            {
              if(list.length > 0)
              {
                record.auditor_status = list[0].value
              }
            
            }
            quotationdetailsService.multiupdate_api([record])
            .then((res) => { 
              this.setState({   
                is_submit_table:false    
              }) 
              if(res.status)
                {
                  const data = [...this.state.data]
                  const index = data.findIndex(x => x.id === id)
                  if(is_new === true)
                  {
                    createNotification('Successful Saving of Records','success','filled')
                  }
                  
                    if(res.data)
                    {
                      if(res.data.length > 0)
                      {
                        data[index] = res.data[0]
                      
                      }
                    }
                  this.setState({
                    data:data
                  })
                  if(is_priority === true)
                  {
                    this.onSubmitFilter(true)
                  }
                    
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
            is_submit_table:true
          })
          createNotification('Please fill mandatory field and fill the Date is (MM/DD/YYYY hh:mm:ss AM/PM) this format','error','filled')
        }   
    }
   
   
     
     addRowDetails()
     {
      const {dynamic_columns,pageSize} = this.state
         var data = [...this.state.data]
         var count = data.length,isfill = true
         const {username} = this.state
         for(var i = 0 ; i<data.length;i++)
         {
             const record = Object.assign({}, data[i]);
             
             if(typeof record.id === 'string')
             {
               if(record.request_no  === null || record.request_no === "")
               {
                 isfill = false
               }
             }
         }
         if(isfill === true)
         {
           this.setState({
             is_submit_table:false
           })
           var record = {
             "id": 'new' + count,
             "area":"",
            "priority":"",
            "size":"",
            "quotation_no":"",
            "request_no":"",
            "received_time":'',
            "publisher":"",
            "publisher_status":"",
            "pub_in_progress": '',
            "pub_pending_in": '',
            "pub_pending_out": '',
            "pub_done_time": '',
            "pub_disregrads": '',
            "pub_total": '',
            "pub_routes": '',
            "auditor":"",
            "auditor_status":"",
            "aud_in_progress": '',
            "aud_pending_in": '',
            "aud_pending_out": '',
            "aud_done_time": '',
            "aud_disregrads": '',
            "aud_total": '',
            "aud_routes": '',
            "oot":'',
            "type_of_req":'',
            "customer_require":'',
            "customer_volume":'',
            "time_left":'',
            "tat":'',
            "error_log":false,
            "start_time":convertLocalToUTCDate(new Date()),
            "end_time":'',
            "updated_start_time":convertLocalToUTCDate(new Date()),
            "updated_end_time":''
           }
           for(var i = 0;i<dynamic_columns.length;i++)
           {
             record[dynamic_columns[i]] = ''
           }
           var list = []
           list.push(record)
           for(let i=0;(i<data.length && list.length < pageSize);i++)
           {
              list.push(data[i])
           }
           this.setState({
             data:list
           })
          //  data.push(record)
          //  this.setState({
          //    data:data
          //  })
         }
         else
         {
           this.setState({
             is_submit_table:true
           })
           createNotification('Please fill mandatory field','error','filled')
         }
     }
    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    onChangefrom(date)
    {
      
     
      this.setState({start_date  : date,end_date:''})
    }
    onChangedto(date)
  {
    this.setState({end_date  : date})
    
   
  }
  onClickRow = (record) => {
    return {
      onClick: () => this.OnchangeRow(record),
    };
  }
  OnchangeRow(record)
  {
    
    this.setState({
      select_index :record.id
    })
    if((record.publisher).toUpperCase() === 'SHARED' || (record.auditor).toUpperCase() === 'SHARED')
    {
      this.setState({
        is_shared : true
      })
    }
    else
    {
      this.setState({
        is_shared : false
      })
    }

   
  }
  
  paginationOptions = {
    showSizeChanger: true,
    showQuickJumper: true,
    onShowSizeChange: (_, pageSize) => {
      this.setState({
        pageSize : pageSize
      })
      
    },
    onChange: (page,pageSize) => {
      const {start_date,end_date,request_no,publisher,publisher_status,auditor,
        auditor_status,size,priority,area,quotation_no,region,is_search} = this.state
      if(is_search === true)
      {
        
        this.fetchPagination(page,pageSize,start_date,end_date,request_no,publisher,publisher_status,auditor,
          auditor_status,size,priority,area,quotation_no,region,false)
      }
      else
      {
        this.ClearValue(page,pageSize)
      }
    
    },
    pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
    // total: this.state.total  ,
    showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total}`,
  };
  getStatustime(value)
  {
    const {status_data,is_adimin_Edit} = this.state
    var list  = [...getStausOptionEnable(status_data,value)]
    if(is_adimin_Edit === true)
    {
      list = [...getStausOptionAdminEnable(status_data,value)]
    }
  
    return list
  }
  renderTemplate()
    {
      const {languageData,locale} = this.props
    
      const column_name = ["Request No","Reqno","Quotationno","Typeofrequest","Region","Area","Priority","Size",
                           "Receivedtime","TAT","Publisher","Publisherstatus","Auditor","Auditorstatus","Pubinprocess",
                           "Pubpendingin","Pubpendingout","Pubdisregards","Pubdone","Audinprocess","Audpendingin",
                           "Audpendingout","Auddone","Auddisregards","Pubtotaltimepending","Audtotaltimepending",
                           "Pubroutes","Audroutes","Static","Time Left","OOT","Expected_time","Pubqry1",
                           "Contractcomplete-Pub","Contractcomplete-Aud","Customer Request Time"]
        return(
          
          <Workbook filename="SQ.xlsx" element={
              <Button className = "button-width"
               color="secondary" >
              {onChangeLanguage(locale,'Download Template',languageData)} 
              </Button>
            }>
            <Workbook.Sheet data={[]} name="Sheet A">
            {column_name && column_name.map((value,index) =>
             <Workbook.Column label={value} value={value}  />
             )}
            </Workbook.Sheet> 
          </Workbook>
       
  
        );
    }
    getEditField(publisher_status,auditor_status)
    {
      var isfill = false
      const {status_data} = this.state
      const publisher_statuss = getValue(status_data,'value','label',publisher_status)
      ,auditor_statuss = getValue(status_data,'value','label',auditor_status)
      if(publisher_statuss !== '' && auditor_statuss !== '')
      {
          if((publisher_statuss).toUpperCase() === 'DONE' && (auditor_statuss).toUpperCase() === 'DONE')
          {
            isfill = true
          }
      }

      return isfill

    }
    getEditStatusField(key,record,data)
    {
      
      var isfill = true
      const {status_data} = this.state
      const publisher_statuss = getValue(status_data,'value','label',record.publisher_status)
      ,auditor_statuss = getValue(status_data,'value','label',record.auditor_status)
      var not_status = false
      if(publisher_statuss !== '' || auditor_statuss !== '')
      {
          if((publisher_statuss).toUpperCase() === 'DONE' && (auditor_statuss).toUpperCase() === 'DONE')
          {
            isfill = true
          }
          else
          {
            not_status = true
          }
      }
      else
      {
        not_status = true
      }
      if(not_status === true)
      {
        isfill = getEnableStatus(key,data,record.request_no,record.publisher,record.publisher_status,record.auditor)
      }
     
      
      return isfill

    }
    render()
    {
        const {match,locale,languageData,role_permission_data} = this.props
        const {start_date,end_date,area,priority,size,quotation_no,request_no,publisher,publisher_status,
            auditor,auditor_status,created_at,updated_at,areadata,priority_data,publisherdata,auditordata,status_data,
            data,is_submit_table,region,submit_column,column_value,dynamic_columns,selectedRowKeys,region_data,
            typeofrequestdata,size_data,loading,modalOpen,select_index,is_shared,is_adimin_Edit} = this.state
            const  columsss = [
              {
                title:onChangeLanguage(locale,'Request No',languageData) ,
                dataIndex: 'request_no',
                key: 'request_no',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'100px'}}>
                     {text}
                  </div>),
              },
              {
                title: onChangeLanguage(locale,'Quotation Number',languageData),
                dataIndex: 'quotation_no',
                key: 'quotation_no',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                 
                      <Input
                      className = {"fontstyle"  }
                      value = {text}
                      disabled={this.getEditField(record.publisher_status,record.auditor_status)}
                      onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'quotation_no')} 
                      onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'quotation_no')}  
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'quotation_no')} 
                       />
                      
                    </div>)
                },
                {
                  title: onChangeLanguage(locale,'Type of Request',languageData),
                  dataIndex: 'type_of_req',
                  key: 'type_of_req',
                  render: (text, record) => ( 
                    <div  style = {{padding:'2px',width:'100px'}}>
                       <Select  className= "react-select fontstyle"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    isDisabled={this.getEditField(record.publisher_status,record.auditor_status)}
                    value={typeofrequestdata.filter(option =>option.value === text)}
                    options={typeofrequestdata}
                    onChange={({value}) =>this.onChangeValue_row(value,record.id,'type_of_req')} />
                   
                    </div>),
                  },
                {
                    title: onChangeLanguage(locale,'Region',languageData),
                    dataIndex: 'region',
                    key: 'region',
                    render: (text, record) => ( 
                      <div  style = {{padding:'2px',width:'100px'}}>
                        <Select  className= "react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        isDisabled={this.getEditField(record.publisher_status,record.auditor_status)}
                        value={region_data.filter(option =>option.value === text)}
                        options={region_data}
                        onChange={({value}) =>this.onChangeValue_row(value,record.id,'region')} />
                        </div>),
                  },
                  {
                    title: onChangeLanguage(locale,'Area',languageData),
                    dataIndex: 'area',
                    key: 'area',
                    render: (text, record) => ( 
                      <div  style = {{padding:'2px',width:'100px'}}>
                        <Select  className= "react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        isDisabled={this.getEditField(record.publisher_status,record.auditor_status)}
                        value={areadata.filter(option =>option.value === text)}
                        options={getAreaValue(areadata,record.region)}
                        onChange={({value}) =>this.onChangeValue_row(value,record.id,'area')} />
                      </div>),
                  },
                  {
                    title: onChangeLanguage(locale,'Priority',languageData),
                    dataIndex: 'priority',
                    key: 'priority',
                    render: (text, record) => ( 
                      <div  style = {{padding:'2px',width:'100px'}}>
                      <Select  className= "react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        isDisabled={this.getEditField(record.publisher_status,record.auditor_status)}
                        value={priority_data.filter(option =>option.value === text)}
                        options={priority_data}
                        onChange={({value}) =>this.onChangeValue_row(value,record.id,'priority')} />
                      </div>),
                  },
                  {
                    title: onChangeLanguage(locale,'Size',languageData),
                    dataIndex: 'size',
                    key: 'size',
                    render: (text, record) => ( 
                        <div  style = {{padding:'2px',width:'100px'}}>
                        <Select  className= "react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        isDisabled={this.getEditField(record.publisher_status,record.auditor_status)}
                        value={size_data.filter(option =>option.value === text)}
                        options={size_data}
                        onChange={({value}) =>this.onChangeValue_row(value,record.id,'size')} />
                        </div>)
                  },
                  {
                    title: onChangeLanguage(locale,'Received Date',languageData),
                    dataIndex: 'received_time',
                    key: 'received_time',
                    render: (text, record) => ( 
                        <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                             {(typeof record.id === 'string') ? 
                            <Input  className = {(is_submit_table === true && text === "" )   ?  "fontstyle error-border" :"fontstyle"  }
                            value = {text}  
                            placeholder = "MM/DD/YYYY hh:mm:ss AM/PM"
                            disabled={this.getEditField(record.publisher_status,record.auditor_status)}
                            onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'received_time')} 
                            onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'received_time')}
                            onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'received_time')} 
                            /> :moment(text).format('MM/DD/YYYY hh:mm:ss a')
                         }
                        </div>)
                  },
                    {
                      title:onChangeLanguage(locale,'Publisher',languageData) ,
                      dataIndex: 'publisher',
                      key: 'publisher',
                      render: (text, record) => ( 
                        <div  style = {{padding:'2px',width:'100px'}}>
                        <Select  className= "react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={publisherdata.filter(option =>option.value === text)}
                        options={publisherdata}
                        isDisabled = {this.getEditStatusField('publisher',record,publisherdata)}
                        // isDisabled = {getEnableStatus('publisher',publisherdata,record.request_no,record.publisher,record.publisher_status,record.auditor)}
                        onChange={({value}) =>this.onChangeValue_row(value,record.id,'publisher')} />
                        </div>),
                    },
                    {
                      title:onChangeLanguage(locale,'Publisher Status',languageData) ,
                      dataIndex: 'publisher_status',
                      key: 'publisher_status',
                      render: (text, record) => ( 
                        <div  style = {{padding:'2px',width:'100px'}}>
                        <Select  className= "react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={status_data.filter(option =>option.value === text)}
                        styles={customStyles}
                        options={getStausOptionEnable(status_data,text) }
                        isDisabled = {this.getEditStatusField('publisher_status',record,status_data)}
                        // isDisabled = {getEnableStatus('publisher_status',status_data,record.request_no,record.publisher,record.publisher_status,record.auditor)}
                        onChange={({value}) =>this.onChangeValue_row(value,record.id,'publisher_status')} />
                        </div>),
                    },
                    {
                      title: onChangeLanguage(locale,'Auditor',languageData),
                      dataIndex: 'auditor',
                      key: 'auditor',
                      render: (text, record) => ( 
                        <div  style = {{padding:'2px',width:'100px'}}>
                        <Select  className= "react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={auditordata.filter(option =>option.value === text)}
                        options={auditordata.filter(option =>(option.value !== record.publisher || record.publisher === 'SHARED'))}
                        // options={auditordata.filter(option =>option.value !== record.publisher)}
                        isDisabled = {this.getEditStatusField('auditor',record,status_data)}
                        onChange={({value}) =>this.onChangeValue_row(value,record.id,'auditor')} />
                        </div>),
                    },
                    {
                      title:onChangeLanguage(locale,'Auditor Status',languageData),
                      dataIndex: 'auditor_status',
                      key: 'auditor_status',
                      render: (text, record) => ( 
                        <div  style = {{padding:'2px',width:'100px'}}>
                        <Select  className= "react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={status_data.filter(option =>option.value === text)}
                        styles={customStyles}
                        options={getStausOptionEnable(status_data,text) }
                        isDisabled = {this.getEditStatusField('auditor_status',record,status_data)}
                        // isDisabled = {getEnableStatus('auditor_status',status_data,record.request_no,record.publisher,record.publisher_status,record.auditor)}
                        onChange={({value}) =>this.onChangeValue_row(value,record.id,'auditor_status')} />
                        </div>),
                    },
                    {
                      title: onChangeLanguage(locale,'Customer Request Time',languageData),
                      dataIndex: 'customer_require',
                      key: 'customer_require',
                      render: (text, record) => ( 
                        <div  style = {{padding:'2px',width:'100px'}}>
                          <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'100px'}}>
                         
                          <Input  className = {"fontstyle"  }
                            value = {text}  
                            placeholder = "MM/DD/YYYY hh:mm:ss AM/PM"
                            disabled={this.getEditField(record.publisher_status,record.auditor_status)}
                            onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'customer_require')} 
                            onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'customer_require')}
                            onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'customer_require')} 
                            /> 
                        </div>
                        </div>),
                    },
                    // {
                    //   title: onChangeLanguage(locale,'Customer Volume Details',languageData),
                    //   dataIndex: 'customer_volume',
                    //   key: 'customer_volume',
                    //   render: (text, record) => ( 
                    //     <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'100px'}}>
                    //         <Input
                    //         className = "fontstyle" 
                    //         value={text} 
                    //         onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'customer_volume')} 
                    //         onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'customer_volume')}
                    //         onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'customer_volume')} />
                    //     </div>)
                    // },
                    {
                      title: onChangeLanguage(locale,'Time Left',languageData),
                      dataIndex: 'time_left',
                      key: 'time_left',
                      render: (text, record) => ( 
                        <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'150px'}}>
                            {text}
                        </div>)
                    },
                    {
                      title: onChangeLanguage(locale,'TAT',languageData),
                      dataIndex: 'tat',
                      key: 'tat',
                      render: (text, record) => ( 
                        <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'150px'}}>
                          {text}
                        </div>)
                    },
                    {
                      title: onChangeLanguage(locale,'OOT',languageData),
                      dataIndex: 'oot',
                      key: 'oot',
                      render: (text, record) => ( 
                        <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'100px'}}>
                           {text}
                        </div>)
                    },
            ]
            if(dynamic_columns.length > 0)
           {
              dynamic_columns  &&  dynamic_columns.map((value,index) => 
              columsss.push({
                    title:  onChangeLanguage(locale,value,languageData),
                    dataIndex: value,
                    key: value,
                    render: (text, record) => (	
                      <div style = {{padding:'2px',width:'100px'}}>
                          <Input  className = "fontstyle"
                            value = {text}  
                            onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,value)} 
                            onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,value)}
                            onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,value)} 
                            />
                      </div>
                  ),
                }))
           }
        columsss.push({
          title: onChangeLanguage(locale,'Static',languageData),
          key: 'statics',
         dataIndex: 'statics',
          render: (text,record) => (
              <div  style = {{padding:'2px',width:'100px'}} >
                {text}
             </div>
          )
       })
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
          };
          const pagination = {
            ...this.paginationOptions,
            total: this.state.total,
            current: this.state.page,
            pageSize: this.state.pageSize,
            };
        return (
            <>
            <title>{onChangeLanguage(locale,'Quotation Details',languageData)}</title>
            {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <Row>
              <Colxx xxs="12">
              <div className = "row">
                      <div className = "col-md-8">
                        <Breadcrumb heading={onChangeLanguage(locale,'Quotation Details',languageData)} match={match} />
                    </div>
                    <div className = "col-md-4">
                    {this.renderTemplate()}
                    <Button className = "button-width" color="primary">
                            <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
                            <a style= {{margin :'0px'}} > {onChangeLanguage(locale,'Upload',languageData)} </a>
                            <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                                className = "filepicker_customButton"
                                style = {{width : '26%',marginLeft :'-22%'}}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
                        </Button>
                    </div>
                  </div>
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                <div className = "publish-title" >
                    <Row>
                    <Colxx xxs="12">
                    <Label  className = "fontstyle" 
                        style = {{fontWeight:700,fontSize:'15px'}}>
                          {onChangeLanguage(locale,'Received Time Filter',languageData)}
                    </Label>
                    </Colxx>
                    </Row>
            </div>
            <div className = "row" style = {{padding:'10px'}}>
                <div className = "col-md-5 space-margin"  >
                    <Label  className = "fontstyle normal-font" >
                    {onChangeLanguage(locale,'From',languageData)}</Label>
                    <DatePicker
                                 selected={start_date}
                                 className = "text-background" 
                                 onChange={(date) => this.onChangefrom(date)}
                                 />
                </div>
               <div className = "col-md-5 space-margin"  >
                    <Label  className = "fontstyle normal-font" >
                    {onChangeLanguage(locale,'To',languageData)} </Label>
                        <DatePicker
                                 selected={end_date}
                                 min_date = {start_date}
                                 className = "text-background" 
                                 onChange={(date) => this.onChangedto(date)}
                                 />
                </div>
                <div className = "col-md-2 space-margin" >
                    <Button className = "button-width" color="primary"  style={{margin:'19px'}}
                                onClick={()=>this.onSubmitFilter(false)}
                        >
                  {onChangeLanguage(locale,'Search',languageData)}   
                    </Button>
                </div>
            </div>
        </div>
        <div>
        <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
          <div className = "row" style = {{padding:'10px'}}>
                      <div className = "col-md-3 space-margin"  >
                              <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Request No',languageData)}</Label>
                              <Input  className = "fontstyle text-background"  
                              placeholder = ''
                              value = {request_no}  
                              onChange= {(e)=>this.setState({request_no : e.target.value})} 
                              />
                          </div>
                          <div className = "col-md-3 space-margin"  >
                              <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Quotation Number',languageData)}</Label>
                              <Input  className = "fontstyle text-background"  
                              placeholder = ''
                              value = {quotation_no}  
                              onChange= {(e)=>this.setState({quotation_no : e.target.value})} 
                              />
                          </div>
                                               
                          <div className = "col-md-3 space-margin"  >
                              <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Publisher',languageData)}</Label>
                              <Select  
                              className="react-select fontstyle"
                              classNamePrefix="react-select"
                              name="form-field-name"
                              value={publisherdata.filter(option =>option.value === publisher)}
                              options={publisherdata}
                              onChange={({value}) => this.setState({  publisher: value })}
                              />
                          </div>
                          <div className = "col-md-3 space-margin"  >
                              <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Publisher Status',languageData)}</Label>
                              <Select  
                              className="react-select fontstyle"
                              classNamePrefix="react-select"
                              name="form-field-name"
                              value={status_data.filter(option =>option.value === publisher_status)}
                              options={status_data}
                              onChange={({value}) => this.setState({  publisher_status: value })}
                              />
                          </div>
                          <div className = "col-md-3 space-margin"  >
                              <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Auditor',languageData)}</Label>
                              <Select  
                              className="react-select fontstyle"
                              classNamePrefix="react-select"
                              name="form-field-name"
                              value={auditordata.filter(option =>option.value === auditor)}
                              options={auditordata}
                              onChange={({value}) => this.setState({  auditor: value })}
                              />
                          </div>
                          <div className = "col-md-3 space-margin"  >
                              <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Auditor Status',languageData)}</Label>
                              <Select  
                              className="react-select fontstyle"
                              classNamePrefix="react-select"
                              name="form-field-name"
                              value={status_data.filter(option =>option.value === auditor_status)}
                              options={status_data}
                              onChange={({value}) => this.setState({  auditor_status: value })}
                              />
                          </div>  
                      <div className = "col-md-3 space-margin"  >
                              <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Area',languageData)}</Label>
                              <Select  
                              className="react-select fontstyle"
                              classNamePrefix="react-select"
                              name="form-field-name"
                              value={areadata.filter(option =>option.value === area)}
                              options={areadata}
                              onChange={({value}) => this.setState({  area: value })}
                              />
                          </div>
                          <div className = "col-md-3 space-margin"  >
                              <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Priority',languageData)} </Label>
                              <Select  
                              className="react-select fontstyle"
                              classNamePrefix="react-select"
                              name="form-field-name"
                              value={priority_data.filter(option =>option.value === priority)}
                              options={priority_data}
                              onChange={({value}) => this.setState({  priority: value })}
                              />
                          </div>                    
                          <div className = "col-md-3 space-margin"  >
                              <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Size',languageData)}</Label>
                               <Select  
                              className="react-select fontstyle"
                              classNamePrefix="react-select"
                              name="form-field-name"
                              value={size_data.filter(option =>option.value === size)}
                              options={size_data}
                              onChange={({value}) => this.setState({  size: value })}
                              />
                          </div>
                          
                          <div className = "row text-center" style = {{margin:'0px 5px'}}>
                              <Button className = "button-width" color="primary" 
                                  onClick={()=>this.onSubmitFilter(false)}>
                                    {onChangeLanguage(locale,'Search',languageData)} </Button> 
                               
                              <Button className = "button-width" color="primary" 
                                  onClick={()=>this.onClickshared()} disabled = {!is_shared}>
                                    {onChangeLanguage(locale,'Share',languageData)}
                                     </Button> 
                                
                              <Button className = "button-width" color="secondary" 
                                  onClick={()=>this.ClearValue(1,25)}
                                  >{onChangeLanguage(locale,'Refresh',languageData)} </Button>
                               
                                {getPermission(role_permission_data,'SQ','Control Screen',true)  ==true &&
                              
                              <Button className = "button-width" color="secondary" 
                                  onClick={()=>this.onChangeControl()}
                                  >
                                {onChangeLanguage(locale,'Control',languageData)} </Button> 
                              
                        }
                             
                              <Button className = "button-width" color="secondary" 
                                  onClick={()=>this.onClickDetails(select_index)}>
                                    {onChangeLanguage(locale,'Details',languageData)} </Button> 
                                </div>
                      </div>     
                    </div>
                <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px',paddingBottom:'100px'}}>
                <div className = "row" style = {{padding:'10px',margin: '0px 5px'}}>
                
                    <Button className = "button-width" color="primary" 
                    onClick = {()=>this.addRowDetails()}>
                      {onChangeLanguage(locale,'Add Row',languageData)}
                    </Button>
                    {is_adimin_Edit ==true &&
                    <Button className = "button-width" color="primary" 
                     onClick = {()=>this.setState({modalOpen:true})}>
                    {onChangeLanguage(locale,'Add Column',languageData)}    
                    </Button>
              }
               {(is_adimin_Edit === true && dynamic_columns.length > 0) && 
                              <Button className = "button-width" color="primary" 
                              onClick = {()=>this.setState({modalOpen_delete:true})}>
                              {onChangeLanguage(locale,'Delete Column',languageData)}       
                              </Button>
                            }
            </div>
              <div style = {{padding:'10px'}}>
                <Table 
                dataSource={data} 
                columns={columsss} 
                pagination = {pagination}
                // rowSelection={rowSelection}
                tableLayout="auto"
                rowKey="id"
                onRow={this.onClickRow}
                rowClassName={(record, index) =>  record.id === select_index ? 'selected-table-color' :( index % 2 === 0 ? 'table-row-light' :  'table-row-dark')}/>
                </div> 
            </div> 
            <div className = "row" style = {{marginBottom:'30px'}}>
            <div className = "col-md-6">
                        {this.renderPublish_Status()}
            </div>
            <div className = "col-md-6">
                        {this.renderCurrentVolumes()}
            </div>
                </div>
            </div>
            {this.renderModal()}
            {this.renderModalDelete()}
            {this.renderModal_Routes()}
            {this.renderModal_PendingOut()}
          </>
        )
    }
    closeModal()
    {
      this.setState({
        modalOpen:false,
       column_name:'',
       modalOpen_delete:false,
      })
    }
    onSubmitdeleteColumn()
    {
      const { column_name,dynamic_columns} = this.state
      if(column_name !== '')
      {
         
            this.setState({
            loading : true
            })
            quotationdetailsService.delete_columnapi(column_name)
            .then((res) => { 
              this.setState({   
                loading : false     
              }) 
              this.closeModal()
              if(res.status)
                {
                  createNotification('Deleted','success','filled')
                  this.setState({
                    dynamic_columns: dynamic_columns.filter(item => (item !== column_name))
                  })
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
        
        createNotification('Please fill Column name','error','filled')
      }
    }
    renderModalDelete()
    {
      const {locale,languageData} = this.props
      const {modalOpen_delete,column_name,dynamic_columns} = this.state
      var list = dynamic_columns.map(function(name) {
        return  {label : name ,value : name};
     });  
      return (
          <Modal
            isOpen={modalOpen_delete}
            toggle={this.closeModal}
            wrapClassName="modal-right"
            backdrop="static"
          >
            <ModalHeader toggle={()=>this.closeModal()}>
                {onChangeLanguage(locale,'Delete Column',languageData)}   
            </ModalHeader>
            <ModalBody>
                    <div>
                    <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={list.filter(option =>option.value === column_name)}
                        options={list}
                        onChange={({value}) => this.setState({  column_name: value })}
                    />
                    </div>
                    <div className = "text-center" >
                        <Button className = "button-width" color="secondary" 
                            onClick = {()=>this.onSubmitdeleteColumn()}>
                            {onChangeLanguage(locale,'Submit',languageData)}       
                        </Button>
                    </div>
               
            </ModalBody>
           
          </Modal>
        );
    }
    onSubmitaddColumn()
    {
      const { column_name} = this.state
     

      if(column_name !== '')
      {
         
            this.setState({
            loading : true
            })
          quotationdetailsService.add_columnapi(column_name)
            .then((res) => { 
              this.setState({   
                loading : false     
              }) 
              this.closeModal()
              if(res.status)
                {
                  createNotification('Updated','success','filled')
                  this.ClearValue(1,25)
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
        
        createNotification('Please fill Column name','error','filled')
      }
    }
    
    renderModal()
    {
      const {locale,languageData} = this.props
      const {modalOpen,column_name} = this.state
      return (
          <Modal
            isOpen={modalOpen}
            toggle={this.closeModal}
            wrapClassName="modal-right"
            backdrop="static"
          >
            <ModalHeader toggle={()=>this.closeModal()}>
                {onChangeLanguage(locale,'Add New Column',languageData)}   
            </ModalHeader>
            <ModalBody>
                    <div>
                        <Input  className = "fontstyle"  
                            placeholder ={onChangeLanguage(locale,'Column Name',languageData)}   
                            value = {column_name}  
                            onChange = {(e)=>this.setState({column_name:e.target.value})}
                        />
                    </div>
                    <div className = "text-center" style={{marginTop:'15px'}}>
                        <Button className = "button-width" color="secondary" 
                            onClick = {()=>this.onSubmitaddColumn()}>
                            {onChangeLanguage(locale,'Submit',languageData)}       
                        </Button>
                    </div>
               
            </ModalBody>
           
          </Modal>
        );
    }
    setRoutes_value()
    {
      const {no_of_rutes,modal_index,is_publish,data} = this.state
      if(modal_index !== -1 && is_publish !== '' && no_of_rutes !== '')
      {
        var value = [...data]
        if(is_publish === 'publisher_status')
        {
          value[modal_index].pub_routes = no_of_rutes
        }
        else
        {
          value[modal_index].aud_routes = no_of_rutes
        }
        
        this.setState({
          data:value
        })
        this.onSubmitData(value[modal_index],false,false)
        this.closeModal_routes()
      }
      else
      {
          createNotification('Please fill the value','error','filled')
      }
      
    }
    closeModal_routes()
    {
      this.setState({
        modalOpen_time:false,
        modalOpen_routes:false,
        no_of_rutes:'',
        pending_out:'',
        is_publish:'',
        modal_index:-1,
      })
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
    renderModal_Routes()
    {
       
      const {modalOpen_routes,no_of_rutes} = this.state
      const {locale,languageData} = this.props
      return (
          <Modal
            isOpen={modalOpen_routes}
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
                    min="1"
                    type = 'number'
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
      const {pending_out,modal_index,is_publish,data} = this.state
      if(modal_index !== -1 && is_publish !== '' && pending_out !== '')
      {
        var value = [...data],isfill= false
        let list = value.filter((item,index) => index === modal_index)
        var time = moment(pending_out).format('HH:mm:ss'),pub_pending_in= '',aud_pending_in=''
        if(list.length > 0)
        {
          pub_pending_in = list[0].pub_pending_in !== null ? list[0].pub_pending_in:''
          aud_pending_in = list[0].aud_pending_in !== null ? list[0].aud_pending_in:''
        }
        
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
        if(isfill === true)
        {
          if(is_publish === 'publisher_status')
          {
            value[modal_index].pub_pending_out = moment(convertUTCToLocalDate(pending_out)).format('MM/DD/YYYY hh:mm:ss a')
            value[modal_index].pub_done_time =''
            value[modal_index].pub_disregrads =''
            value[modal_index].pub_total =''
            value[modal_index].pub_routes =''
            value[modal_index].auditor =''
            value[modal_index].auditor_status =''
            value[modal_index].aud_in_progress  = ''
            value[modal_index].aud_pending_in =''
            value[modal_index].aud_pending_out =''
            value[modal_index].aud_done_time =''
            value[modal_index].aud_disregrads =''
            value[modal_index].aud_total =''
            value[modal_index].aud_routes =''
          }
          else
          {
            value[modal_index].aud_pending_out = moment(convertUTCToLocalDate(pending_out)).format('MM/DD/YYYY hh:mm:ss a')
            value[modal_index].aud_done_time =''
            value[modal_index].aud_disregrads =''
            value[modal_index].aud_total =''
            value[modal_index].aud_routes =''
          }
          this.setState({
            data:value,
          })
          this.onSubmitData(value[modal_index],false,false)
          this.closeModal_routes()
         }
         else
         {
          createNotification('Pending Out Greater than Pening In or Current Date/Time','error','filled')
         }
      
      }
      else
      {
          createNotification('Please fill the date','error','filled')
      }
    }
    closeModal_routes()
    {
      this.setState({
        modalOpen_time:false,
        modalOpen_routes:false,
        no_of_rutes:'',
        pending_out:'',
        is_publish:'',
        modal_index:-1,
      })
    }
    onChangePendingtime(date)
    {
      this.setState({pending_out  : date})
    
    }
    renderModal_PendingOut()
    {
       
      const {modalOpen_time,pending_out,modal_index,data} = this.state
      const {locale,languageData} = this.props
      var min_date = new Date()
      if(modal_index !== 1)
      {
        let list = data.filter((item,index) => index === modal_index)
        if(list.length > 0)
        {
          if(list[0].pub_pending_in && list[0].pub_pending_in !== '' && list[0].pub_pending_in !== null)
          {
            min_date = new Date(list[0].pub_pending_in)
          }
          
        }
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
    fetchDatabasedReq(id,publisher,auditor,is_publish) {  
      this.setState({
        loading : true
      })    
      sharedService.fetchIndividualapi(id)
        .then((res) => { 
          this.setState({   
        loading : false 
                
          }) 
          if(res.status)
            {
              if(res.data && res.data !== null)
              {
                  if(res.data.length > 0)
                  {
                    const value = this.getShared_no_of_rutes(res.data,publisher,auditor,is_publish)
                    if(value !== null && value !== '')
                    {
                      this.setState({
                        no_of_rutes : value.toString()
                      })
                    }
                 

                  }
              }
                
            }   
          
                       
      
      })
      .catch((error) => { 
        this.setState({
          loading : false
        })
        });   
   }
   getShared_no_of_rutes(shared_data,publisher,auditor,is_publish)
   {
     var value = ''
     if(shared_data.length > 0)
     {
       if((publisher).toUpperCase() === 'SHARED' || (auditor).toUpperCase() === 'SHARED')
       {
          if(is_publish === 'publisher_status')
           {
               value = this.getCount('pub_routes' , shared_data)
           }
           else if(is_publish === 'auditor_status')
           {
             value = this.getCount('aud_routes' , shared_data)
           }
       }
     }

     return value

   }
   getCount(key,data)
   {
      var count = 0
      for(var i = 0; i <data.length;i++)
      {
            if(data[i][key] !== null && data[i][key] !== '')
            {
                  count = count + parseInt(data[i][key] )
            }
      }


      return count !== 0  ?  count : ''
      
   }
    getTotal(value)
    {
        var count = 0
      
       if(value && value !== null)
       {
          for(var i = 0; i <value.length;i++)
          {
              count = count + parseInt(value[i].count)
          }
       }
       
        return count
    }
    renderPublish_Status()
    {
        const {locale,languageData} = this.props
        const {priority_dynamic_data} = this.state
      

        return(
                <div className = "publishuser-card-component" style = {{borderRadius:'10px'}}>
                        <div className = "publish-title">
                            <Row>
                                    <Colxx xxs="2"> </Colxx>
                                    <Colxx xxs="5" className = "text-center"> <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Publish',languageData)} </Label> </Colxx>
                                    <Colxx xxs="5" className = "text-center"> <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Audit',languageData)} </Label> </Colxx>
                            </Row>
                        </div>
                        <div className = "publish-title1">
                            <Row>
                                    <Colxx xxs="2"> </Colxx>
                                    <Colxx xxs="5">
                                            <Row>
                                            <Colxx xxs="6" className = "text-center">  <Label  className = "fontstyle to-small-font" >{onChangeLanguage(locale,'TO BE STARTED',languageData)}</Label></Colxx>
                                            <Colxx xxs="6" className = "text-center">  <Label  className = "fontstyle to-small-font" >{onChangeLanguage(locale,'IN PROCESS',languageData)}</Label></Colxx>
                                              
                                            </Row>
                                      </Colxx>
                                      <Colxx xxs="5">
                                            <Row>
                                            <Colxx xxs="6" className = "text-center">  <Label  className = "fontstyle to-small-font" >{onChangeLanguage(locale,'TO BE STARTED',languageData)}</Label></Colxx>
                                            <Colxx xxs="6" className = "text-center">  <Label  className = "fontstyle to-small-font" >{onChangeLanguage(locale,'IN PROCESS',languageData)}</Label></Colxx>
                                            </Row>
                                      </Colxx>
                            </Row>
                        </div>
                        <div style = {{padding:'10px'}}>
                        {priority_dynamic_data && priority_dynamic_data.map((item,index) =>
                                    <div>
                                     
                                    <Row>
                                        <Colxx xxs="2"> <Label  className = "fontstyle normal-font" >{item.name} </Label> </Colxx>
                                        <Colxx xxs="5">
                                            <Row>
                                            <Colxx xxs="6" className = "text-center"> 
                                                    <Input  className = "fontstyle text-background"  
                                                    placeholder = ''
                                                    value = {item.pubstarted }  
                                                    disabled = {true}
                                                    />
                                                </Colxx>
                                                <Colxx xxs="6" className = "text-center"> 
                                                    <Input  className = "fontstyle text-background"  
                                                    placeholder = ''
                                                    value = {item.pub_in_process}  
                                                    disabled = {true}
                                                    />
                                                </Colxx>
                                                </Row>
                                        </Colxx>
                                        <Colxx xxs="5">
                                            <Row>
                                            <Colxx xxs="6" className = "text-center"> 
                                                    <Input  className = "fontstyle text-background"  
                                                    placeholder = ''
                                                    value = {item.aud_started}  
                                                    disabled = {true}
                                                    />
                                                </Colxx>
                                                <Colxx xxs="6" className = "text-center"> 
                                                    <Input  className = "fontstyle text-background"  
                                                    placeholder = ''
                                                    value = {item.aud_in_process}   
                                                    disabled = {true}
                                                    />
                                                </Colxx>
                                                </Row>
                                        </Colxx>
                                    </Row><br></br>
                                </div>
                        )}
                                
                        </div>
                    </div>
                    
        )
    }
    getSubTotal(id)
    {
        var count = 0
      
        const {area_dynamic_data} = this.state
       
        for(var i = 0; i <area_dynamic_data.length;i++)
        {
              const size  = area_dynamic_data[i].size_list
              for(var j = 0; j <size.length;j++)
              {
                  if(parseInt(size[j].id) === parseInt(id))
                  {
                    count = count + size[j].count
                  }
                
              }
            
        }
       
        return count
    }
    getoverallTotal()
    {

        var count = 0
        const {area_dynamic_data} = this.state
       
        for(var i = 0; i <area_dynamic_data.length;i++)
        {
              const size  = area_dynamic_data[i].size_list
              for(var j = 0; j <size.length;j++)
              {
                count = count + size[j].count
              }
            
        }
        return count
    }
    renderCurrentVolumes()
    {
        const {locale,languageData} = this.props
        const {area_dynamic_data,size_data} = this.state

        return(
                <div className = "publishuser-card-component" style = {{borderRadius:'10px'}}>
                        <div className = "publish-title">
                            <Row>
                                    <Colxx xxs="2"> </Colxx>
                                    <Colxx xxs="10" className = "text-center"> <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Current Volumes',languageData)} </Label> </Colxx>
                                   
                            </Row>
                        </div>
                        <div className = "publish-title1">
                            <Row>
                                    <Colxx xxs="2"> </Colxx>
                                    <Colxx xxs="10">
                                            <Row>
                                            {size_data && size_data.map((value,index) =>
                                             <Colxx xxs="3" className = "text-center">  <Label  className = "fontstyle to-small-font" >{value.label}</Label></Colxx>
                                            )}
                                             <Colxx xxs="3" className = "text-center">  <Label  className = "fontstyle to-small-font" >{onChangeLanguage(locale,'Total',languageData)}</Label></Colxx> 
                                            </Row>
                                      </Colxx>
                                     
                            </Row>
                        </div>
                        <div style = {{padding:'10px'}}>
                          {area_dynamic_data && area_dynamic_data.map((value,index) =>
                              <div>
                                {this.getTotal(value.size_list) !== 0 && 
                                  <div>
                                      <Row>
                                          <Colxx xxs="2"> <Label  className = "fontstyle normal-font" >{value.name} </Label> </Colxx>
                                          <Colxx xxs="10">
                                              <Row>
                                                  {value.size_list && value.size_list.map((item,index) =>
                                                  <Colxx xxs="3" className = "text-center"> 
                                                      <Input  className = "fontstyle text-background"  
                                                      placeholder = ''
                                                      value = {item.count}  
                                                      disabled = {true}
                                                      />
                                                  </Colxx>
                                                  )}
                                                    <Colxx xxs="3" className = "text-center"> 
                                                      <Input  className = "fontstyle text-background"  
                                                      placeholder = ''
                                                      value = {this.getTotal(value.size_list)}  
                                                      disabled = {true}
                                                      />
                                                  </Colxx>
                                                  </Row>
                                          </Colxx>
                                        
                                      </Row><br></br>
                                      </div>
                                      } 
                                  </div>
                                
                          )}
                        <Row>
                         <Colxx xxs="2"> <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Total',languageData)} </Label> </Colxx>
                         <Colxx xxs="10">
                                <Row>
                                    {size_data && size_data.map((value,index) =>
                                    <Colxx xxs="3" className = "text-center"> 
                                        <Input  className = "fontstyle text-background"  
                                        placeholder = ''
                                        value = {this.getSubTotal(value.value)}   
                                        disabled = {true}
                                        />
                                    </Colxx>
                                    )}
                                    <Colxx xxs="3" className = "text-center"> 
                                        <Input  className = "fontstyle text-background"  
                                        placeholder = ''
                                        value = {this.getoverallTotal()}   
                                        disabled = {true}
                                        />
                                    </Colxx>
                                    </Row>
                            </Colxx>
                        </Row>
                                
                        </div>
                    </div>
                    
        )
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

