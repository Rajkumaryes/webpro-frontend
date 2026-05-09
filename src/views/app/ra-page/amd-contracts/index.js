import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button,ModalHeader,Modal,ModalBody} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { adminRoot } from "../../../../constants/defaultValues";
import Select from 'react-select';
import{RAareaService} from '../../../../redux/ra/area/saga';
import { createNotification } from '../../../../toast';
import {onChangeLanguage,getValue,getTimeDifference,getAreaValue,getEnableStatus,
  convertLocalToUTCDate,convertUTCToLocalDate,getPermission} from '../../../../helper';
import Loading from "react-fullscreen-loading";
import{regionsService} from '../../../../redux/ra/region/saga'
import{priorityService} from '../../../../redux/ra/priority/saga'
import{sizeService} from '../../../../redux/ra/size/saga'
import{statusService} from '../../../../redux/ra/status/saga'
import{userService} from '../../../../redux/users/saga'
import{amdcontractsService} from '../../../../redux/ra/amdcontracts/saga'
import moment from 'moment';
import DatePicker from "../../datePicker";
import{sharedService} from '../../../../redux/ra/shared/saga'
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../constants/defaultValues';
import {customStyles,getStausOptionEnable} from '../../../../helper';
import{roleService} from '../../../../redux/role/saga'
import Workbook from 'react-excel-workbook'


class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        selectedRowKeys: [], 
        data:[],
        region_data: [],
        area_all_data:[],
        user_data:[],
        status_data:[],
        priority_data:[],
        size_data:[],
        start_date:'',
        end_date:'',
        request_no:'',
        contract_no:'',
        publisher:'',
        publisher_status:'',
        auditor:'',
        auditor_status:'',
        size:'',
        priority:'',
        area:'',
        region:'',
        is_submit_table:false,
        column_name:'',
        modalOpen:false,
        modalOpen_delete:false,
        publish_detalis :[],
        current_volumes_detalis :[],
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
      

      }
    }
    componentDidMount()
    {
      this.fetchregion()
      this.fetcharea()
      this.fetchuser()
      this.fetchpriority()
      this.fetchsize()
      this.fetchstatus()
      this.ClearValue(1,25)
      this.fetchroleData()
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
                let filterstatus = (res.data).filter(item => ((item.name).toLowerCase() === 'admin'))
                let is_role = (filterstatus).filter(item => (parseInt(role_id) === parseInt(item.id)))
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
     fetchregion() {
        regionsService.fetchapi()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var regionlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   });  
                    this.setState({
                    region_data :  regionlist,
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
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString(),region : cusmaidid.region};
                   });  
                    this.setState({
                    area_all_data :  regionlist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
     }  
     
     fetchstatus() {
        statusService.fetchapi()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var regionlist = filterstatus.map(function(cusmaidid,index) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString(), isDisabled:false};
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
     fetchpriority() {
        priorityService.fetchapi()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var regionlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   });  
                    this.setState({
                    priority_data :  regionlist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
     } 
     fetchsize() {
        sizeService.fetchapi()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var regionlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   });  
                    this.setState({
                    size_data :  regionlist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
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
        navigator.clipboard.writeText(this.state.shipment_no)
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
          const {status_data} = this.state
            const id = value.id
            var isfill = true
            var record = Object.assign({}, value);
            if(typeof record.id === 'string')
            {
              record.id = 0
              record.end_time = convertLocalToUTCDate(new Date())
            }
            if(record.contract_no  === null || record.contract_no === ""  
            || record.received_time  === null || record.received_time === ""
            || record.amd_no  === null || record.amd_no === ""
            || record.priority  === null || record.priority === ""
            || record.size  === null || record.size === ""
            || record.region  === null || record.region === ""
            || record.area  === null || record.area === "")
            {
              isfill = false
            }
            if(record.received_time  !== "" && record.received_time  !== null)
            {
              var times = moment(record.received_time).format('MM/DD/YYYY hh:mm:ss a')

              if(times === "Invalid date")
              {
                console.log("jmvmjvk" , JSON.stringify(times))
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
            if(record.amd_no !== '' && record.amd_no !== null)
            {
              
                if(parseInt(record.amd_no) === 0)
                {
                  record.type_of_req  = 'Original'
                }
                else if((record.amd_no).toLowerCase() === 'dummy')
                {
                  record.type_of_req  = 'Internal Adjustment'
                }
                else if(record.amd_no.toLowerCase() === 'error')
                {
                  record.type_of_req  = 'Correction'
                }
                else
                {
                  record.type_of_req  = 'Amendment'
                }
            }
            else
            {
              record.type_of_req = ''
            }
          if(isfill === true)
          {
            if(record.id === 0)
            {
              this.setState({
                loading:true
              })
            }
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
            record.children = undefined
            record.tab_details = undefined
          amdcontractsService.multiupdate_api([record])
            .then((res) => { 
              this.setState({   
                is_submit_table:false  ,
                loading:false  
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
          createNotification('Please fill mandatory field','error','filled')
        }   
    }
   
    onSubmitClear()
    {
      const { select_index} = this.state

      if(select_index >= 0 )
      {
          this.setState({
            loading : true
          })
          amdcontractsService.clear_api([select_index])
            .then((res) => { 
              this.setState({   
                loading : false     
              }) 
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
              loading : false
            })
            
          });
       
        
      }
      else
      {
        
        createNotification('Please Select Row','error','filled')
      }
    }
    ClearValue(page,pagesize)
    {
        this.setState({
            start_date:'',
            end_date:'',
            request_no:'',
            contract_no:'',
            publisher:'',
            publisher_status:'',
            auditor:'',
            auditor_status:'',
            size:'',
            priority:'',
            area:'',
            region:'',
            is_submit_table:false,
            select_index : -1,
            is_shared:false,
            dynamic_columns:[],
            is_search : false
        })
        var request_no = ''  
        if(localStorage.getItem('amd_contract_id') !== null)
        {
          request_no = localStorage.getItem('amd_contract_id')
          localStorage.removeItem('amd_contract_id')
          this.setState({
            request_no:request_no,
          })
        }
       this.fetchPagination(page,pagesize,'','',request_no,'','','', '','','','','','',false)
    }
    fetchPagination(page,per_page,start_date,end_date,request_no,publisher,publisher_status,auditor,
      auditor_status,size,priority,area,region,contract_no,is_create)
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
      amdcontractsService.filterapi(page,per_page,start_date,end_date,request_no,publisher,publisher_status,auditor,
        auditor_status,size,priority,area,region,contract_no)
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
    onSubmitFilter(is_create)
    {
      const {page,pageSize, start_date,end_date,request_no,publisher,publisher_status,auditor,
             auditor_status,size,priority,area,region,contract_no,is_search} = this.state
    var isfill = false,is_date = true
    if(start_date !== '' || end_date !== '' || request_no !== "" || contract_no !== '' ||
    publisher !== '' ||  publisher_status !== '' || auditor !== '' || 
    auditor_status !== '' || size !== '' || priority !== '' || area !== '' || region !== '' )
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
        else  if(end_date !== '' && end_date !== null)
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

      if((isfill === true && is_date) || is_create === true)
      {
        if(is_create === false)
          {
              this.setState({
                is_search:true
              })
            this.fetchPagination(1,25, start_date,end_date,request_no,publisher,publisher_status,auditor,
              auditor_status,size,priority,area,region,contract_no,is_create)
          }
          else
          {
            this.fetchPagination(page,pageSize, start_date,end_date,request_no,publisher,publisher_status,auditor,
              auditor_status,size,priority,area,region,contract_no,is_create)
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
    onChangeFileUpload(files)
	{
   
    const {username} = this.props
    amdcontractsService.fileUpload(files[0],username)
      .then((res) => { 
        if(res.status)
        {
          if(res.data.status)   
          {   
         
            createNotification('Uploaded','success','filled')
              this.ClearValue(1,25)
            }    
            else{
             
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
    onClickControl(){
      const {select_index,data} = this.state
      if(select_index !== -1)
      {
        const list = data.filter(option =>select_index === option.id)
        if(list.length >0)
        {
          localStorage.setItem('amd_contract_id' , list[0].request_no)
        }
        
      }
      this.props.history.push(`${adminRoot}/ra/controlescreen`)
       
    }
    onClickDetails(id){
          if(id !== -1)
          {
            this.props.history.push(`${adminRoot}/ra/details-box/${id}`)
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
        this.props.history.push(`${adminRoot}/ra/shared/${select_index}`)
      }
      else
      {
        createNotification('Please choose row','error','filled')
      }
  }
    onClickCrossborders(){
      this.props.history.push(`${adminRoot}/ra/cross-borders`)
      
    }
    
    onKeyDownValue_row(e,record,key)
    { 
     
      var code = e.keyCode || e.which;
          if (code === 9) 
         {
            if(record[key] !== '')
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
        console.log('test');
        if(record[key] !== '')
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
      // console.log('jhchcjhcjh key ',key)
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
          if(key === 'region' || key === 'area'  || key === 'priority' || key === 'size'
          || key === 'publisher' || key === 'publisher_status' || key === 'auditor'|| key === 'auditor_status')
          {
            if(typeof id == 'number')
            {
                var is_priority = false
                if( key === 'priority' || key === 'size' || key === 'publisher' || key === 'publisher_status' || key === 'auditor'|| key === 'auditor_status')
                {
                  is_priority = true
                }
                data[index].updated_start_time = convertLocalToUTCDate(new Date())
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
      if((value).toUpperCase() === 'IN PROCESS')
      {
        if(key === 'publisher_status')
        {
          record.pub_in_progress = current_date
        }
        else
        {
          record.aud_in_progress = current_date
        }
       
      }
      else if((value).toUpperCase() === 'PENDING IN')
      {
        if(key === 'publisher_status')
        {
          record.pub_pending_in = current_date
        }
        else
        {
          record.aud_pending_in = current_date
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
        }
        else
        {
          record.aud_done_time = current_date
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
       if((publisher).toUpperCase() === 'SHAREDR' || (auditor).toUpperCase() === 'SHAREDR')
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
   
   addRowDetails()
   {
     const {dynamic_columns,pageSize} = this.state
       var data = [...this.state.data]
       var count = data.length,isfill = true
       for(var i = 0 ; i<data.length;i++)
       {
           const record = Object.assign({}, data[i]);
           
           if(typeof record.id === 'string')
           {
             if(record.contract_no  === null || record.contract_no === ""  
             || record.received_time  === null || record.received_time === ""
             || record.amd_no  === null || record.amd_no === ""
             || record.priority  === null || record.priority === ""
             || record.size  === null || record.size === "")
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
           "request_no": "",
           "contract_no": "",
           "type_of_req": "",
           "amd_no": "",
           "region": "",
           "area": "",
           "priority": "",
           "size": "",
           "received_time": "",
           "publisher": "",
           "publisher_status": '',
           "pub_in_progress": '',
           "pub_pending_in": '',
           "pub_pending_out": '',
           "pub_done_time": '',
           "pub_disregrads": '',
           "pub_total": '',
           "pub_routes": '',
           "auditor": '',
           "auditor_status": "",
           "aud_in_progress": '',
           "aud_pending_in": '',
           "aud_pending_out": '',
           "aud_done_time": '',
           "aud_disregrads": '',
           "aud_total": '',
           "aud_routes": '',
           "time_left": "",
           "tat": "",
           "oot": "",
           "status" : 1,
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
       }
       else
       {
         this.setState({
           is_submit_table:true
         })
         createNotification('Please fill mandatory field','error','filled')
       }
   }
    onChangeFromtime(date)
    {
      this.setState({start_date  : date,end_date:''})
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
        if((record.publisher).toUpperCase() === 'SHAREDR' || (record.auditor).toUpperCase() === 'SHAREDR')
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
    onChangeTotime(date)
    {
      this.setState({end_date  : date})
    }
    onSelectChange = selectedRowKeys => {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.setState({ selectedRowKeys});
    };
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
          auditor_status,size,priority,area,region,contract_no,is_search} = this.state
        if(is_search === true)
        {
          
          this.fetchPagination(page,pageSize,start_date,end_date,request_no,publisher,publisher_status,auditor,
            auditor_status,size,priority,area,region,contract_no,false)
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
    
    renderTemplate()
    {
      const {languageData,locale} = this.props
    
      const column_name = ["Request No", "Reqno", "Contractno", "Typeofrequest", "Amnno","Region","Area", "Priority", "Size", "Receivedtime",
                            "TAT", "Publisher", "Publisherstatus", "Auditor", "Auditorstatus", "Pubinprocess", "Pubpendingin", "Pubpendingout", "Pubdisregards", "Pubdone", "Audinprocess", "Audpendingin", "Audpendingout", "Auddone", "Auddisregards", "Pubtotaltimepending", "Audtotaltimepending"
                            ,"Pubroutes","Audroutes","Static","Time Left","OOT","Expected_time","Pubqry1","Contractcomplete-Pub","Contractcomplete-Aud"]
        return(
          
          <Workbook filename="Amd Contracts.xlsx" element={
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
    getDoneStatus(record)
    {
      var isfill = false
      const {status_data} = this.state
      const publisher_statuss = getValue(status_data,'value','label',record.publisher_status)
      ,auditor_statuss = getValue(status_data,'value','label',record.auditor_status)
      if((publisher_statuss).toUpperCase() === 'DONE' && (auditor_statuss).toUpperCase() === 'DONE')
      {
        isfill = true
      }

      return isfill

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

        const {locale,languageData,role_permission_data,match} = this.props
        const {data,loading,region_data,is_adimin_Edit,area_all_data,priority_data,status_data,selectedRowKeys,
            size_data,user_data,start_date,end_date,request_no,contract_no,dynamic_columns,is_shared,
        publisher,publisher_status,auditor,select_index,auditor_status,size,priority,area,region,is_submit_table} = this.state

        var columns = [
                {
                   title:  onChangeLanguage(locale,'Request No',languageData),
                   dataIndex: 'request_no',
                   key: 'request_no',
                   render: (text, record) => (	
                     <div style = {{padding:'2px',width:'100px'}}>
                         {text}

                     </div>
                 ),
                 },
                 {
                   title:  onChangeLanguage(locale,'Contract No',languageData),
                   dataIndex: 'contract_no',
                   key: 'contract_no',
                   render: (text, record) => (	
                    <div style = {{padding:'2px',width:'100px'}}>
                        {(typeof record.id === 'string') ? 
                                <Input  className = {(is_submit_table === true && text === "" )   ?  "fontstyle error-border" :"fontstyle"  }
                                value = {text}
                                disabled={this.getEditField(record.publisher_status,record.auditor_status)}
                                onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'contract_no')} 
                                onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'contract_no')}  
                                onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'contract_no')} 
                                /> :text
                         }
                    </div>
                    ),
                 },
                 {
                   title: onChangeLanguage(locale,'Types Of RQ',languageData),
                   dataIndex: 'type_of_req',
                   key: 'type_of_req',
                   render: (text, record) => (	
                    <div>
                        {text}
                    </div>
                ),  
            },
            {
                title: onChangeLanguage(locale,'AMD No',languageData),
                dataIndex: 'amd_no',
                key: 'amd_no',
                render: (text, record,index) => ( 
                  <div style = {{padding:'2px',width:'100px'}}>
                     <Input 
                        className = {(is_submit_table === true && text === "" && typeof record.id === 'string' )   ?  "error-border" :"fontstyle"  } 
                        value = {text} 
                        disabled={this.getEditField(record.publisher_status,record.auditor_status)}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'amd_no')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'amd_no')}
                        onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'amd_no')} 
                        />
        
                  </div>),
              }, 
            {
                title: onChangeLanguage(locale,'Region',languageData),
                dataIndex: 'region',
                key: 'region',
                render: (text, record,index) => ( 
                  <div style = {{padding:'2px',width:'100px'}}>
                     <Select  className = {(is_submit_table === true && text === "" && typeof record.id === 'string' )   ?  "error-border-select" :"react-select fontstyle"  } 
                      classNamePrefix="react-select"
                      name="form-field-name"
                      isDisabled={this.getEditField(record.publisher_status,record.auditor_status)}
                      value={region_data.filter(option =>option.value === text)}
                      options={region_data}
                      onChange={({value}) =>this.onChangeValue_row(value,record.id,'region')} />
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Area',languageData) ,
                dataIndex: 'area',
                key: 'area',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'100px'}}>
                    <Select   className = {(is_submit_table === true && text === "" && typeof record.id === 'string' )   ?  "error-border-select" :"react-select fontstyle"  } 
                        classNamePrefix="react-select"
                        name="form-field-name"
                        isDisabled={this.getEditField(record.publisher_status,record.auditor_status)}
                        value={area_all_data.filter(option =>option.value === text)}
                        options={getAreaValue(area_all_data,record.region)}
                        onChange={({value}) =>this.onChangeValue_row(value,record.id,'area')} /> 
                
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Priority',languageData) ,
                dataIndex: 'priority',
                key: 'priority',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'100px'}}>
                    <Select
                        className = {(is_submit_table === true && text === "" && typeof record.id === 'string' )   ?  "error-border-select" :"react-select fontstyle"  } 
                        classNamePrefix="react-select"
                        name="form-field-name"
                        isDisabled={this.getEditField(record.publisher_status,record.auditor_status)}
                        value={priority_data.filter(option =>option.value === text)}
                        options={priority_data}
                        onChange={({value}) =>this.onChangeValue_row(value,record.id,'priority')} /> 
                
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Size',languageData) ,
                dataIndex: 'size',
                key: 'size',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'100px'}}>
                    <Select   className = {(is_submit_table === true && text === ""  && typeof record.id === 'string')   ?  "error-border-select" :"react-select fontstyle"  } 
                        classNamePrefix="react-select"
                        name="form-field-name"
                        isDisabled={this.getEditField(record.publisher_status,record.auditor_status)}
                        value={size_data.filter(option =>option.value === text)}
                        options={size_data}
                        onChange={({value}) =>this.onChangeValue_row(value,record.id,'size')} /> 
                
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Received Time',languageData) ,
                dataIndex: 'received_time',
                key: 'received_time',
                render: (text, record) => (	
                    <div style = {{padding:'2px',width:'200px'}}>
                        {(typeof record.id === 'string') ? 
                            <Input  className = {(is_submit_table === true && text === "" )   ?  "fontstyle error-border" :"fontstyle"  }
                            value = {text}  
                            placeholder = "MM/DD/YYYY hh:mm:ss AM/PM"
                            disabled={this.getEditField(record.publisher_status,record.auditor_status)}
                            onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'received_time')} 
                            onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'received_time')}
                            onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'received_time')} 
                            /> 
                            :moment(text).format('MM/DD/YYYY hh:mm:ss a')
                         }
                    </div>
                    ),
              },
              {
                title:onChangeLanguage(locale,'Publisher',languageData) ,
                dataIndex: 'publisher',
                key: 'publisher',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'100px'}}>
                    <Select   className="react-select fontstyle"
                  classNamePrefix="react-select"
                  name="form-field-name"
                  value={user_data.filter(option =>option.value === text)}
                  options={user_data}
                  isDisabled = {this.getEditStatusField('publisher',record,user_data)}
                  onChange={({value}) =>this.onChangeValue_row(value,record.id,'publisher')} /> 
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Publisher Status',languageData) ,
                dataIndex: 'publisher_status',
                key: 'publisher_status',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'100px'}}>
                    <Select   className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={status_data.filter(option =>option.value === text)}
                        options={getStausOptionEnable(status_data,text) }
                        styles={customStyles}
                        isDisabled = {this.getEditStatusField('publisher_status',record,status_data)}
                        onChange={({value}) =>this.onChangeValue_row(value,record.id,'publisher_status')} /> 
                
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Auditor',languageData) ,
                dataIndex: 'auditor',
                key: 'auditor',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'100px'}}>
                     <Select   className="react-select fontstyle"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    value={user_data.filter(option =>option.value === text)}
                    options={user_data.filter(option =>(option.value !== record.publisher || record.publisher === 'SHAREDR'))}
                    isDisabled = {this.getEditStatusField('auditor',record,status_data)}
                    onChange={({value}) =>this.onChangeValue_row(value,record.id,'auditor')} />
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Auditor Status',languageData) ,
                dataIndex: 'auditor_status',
                key: 'auditor_status',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'100px'}}>
                    <Select   className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={status_data.filter(option =>option.value === text)}
                        options={getStausOptionEnable(status_data,text) }
                        styles={customStyles}
                        isDisabled = {this.getEditStatusField('auditor_status',record,status_data)}
                        onChange={({value}) =>this.onChangeValue_row(value,record.id,'auditor_status')} /> 
                
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Time Left',languageData) ,
                dataIndex: 'time_left',
                key: 'time_left',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'100px'}}>
                   {text} 
                
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'TAT',languageData) ,
                dataIndex: 'tat',
                key: 'tat',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'100px'}}>
                   {text} 
                
                  </div>),
              },
              {
                title: onChangeLanguage(locale,'OOT',languageData),
                dataIndex: 'oot',
                key: 'oot',
                render: (text, record,index) => ( 
                  <div style = {{padding:'2px',width:'100px'}}>
                    {/* <Input  className = "fontstyle" 
                      value = {text}  
                      disabled={this.getEditField(record.publisher_status,record.auditor_status)}
                      onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'oot')} 
                      onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'oot')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'oot')} 
                      /> */}
                  {text}
                  </div>),
              },
              
              
           ]
           if(dynamic_columns.length > 0)
           {
              dynamic_columns  &&  dynamic_columns.map((value,index) => 
                  columns.push({
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
          
         columns.push({
            title: onChangeLanguage(locale,'Static',languageData),
            key: 'statics',
           dataIndex: 'statics',
            render: (text,record) => (
                <div  style = {{padding:'2px',width:'100px'}} >
                    {text}
               </div>
            )
         })
        const pagination = {
          ...this.paginationOptions,
          total: this.state.total,
          current: this.state.page,
          pageSize: this.state.pageSize,
          };
            return (
            <>
            <title>{onChangeLanguage(locale,'Amd / Contracts',languageData)}</title>
            {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <Row>
              <Colxx xxs="12">
              <div className = "row">
                      <div className = "col-md-8">
                      <Breadcrumb heading={onChangeLanguage(locale,'Amd / Contracts',languageData)} match={match} />
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
                        style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'Received Time Filter',languageData)}</Label>
                    </Colxx>
                     </Row>
            </div>
            <div className = "row" style = {{padding:'10px'}}>
                <div className = "col-md-5 space-margin"  >
                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'From',languageData)}</Label>
                     <DatePicker
                          selected={start_date}
                          className = "text-background"
                          onChange={(date) => this.onChangeFromtime(date)}
                          />
                </div>
               <div className = "col-md-5 space-margin"  >
                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'To',languageData)} </Label>
                          <DatePicker
                          selected={end_date}
                          min_date = {start_date}
                          className = "text-background"
                          onChange={(date) => this.onChangeTotime(date)}
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
        <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'10px',marginBottom:'30px'}}>
            <div className = "row">
                <div className = "col-md-12">  
                    <div className = "row" style = {{padding:'10px'}}>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Contract No',languageData)}</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {contract_no}  
                            onChange= {(e)=>this.setState({contract_no : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Request No',languageData)}</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {request_no}  
                            onChange= {(e)=>this.setState({request_no : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Publisher',languageData)} </Label>
                            <Select  
                                className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={user_data.filter(option =>option.value === publisher)}
                                options={user_data}
                                onChange={({value}) => this.setState({  publisher: value })}
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Publisher Status',languageData)}</Label>
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
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Auditor',languageData)}</Label>
                            <Select  
                                className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={user_data.filter(option =>option.value === auditor)}
                                options={user_data}
                                onChange={({value}) => this.setState({  auditor: value })}
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Auditor Status',languageData)}</Label>
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
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Size',languageData)}</Label>
                            <Select  
                                className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={size_data.filter(option =>option.value === size)}
                                options={size_data}
                                onChange={({value}) => this.setState({  size: value })}
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Priority',languageData)} </Label>
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
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Region',languageData)} </Label>
                            <Select  
                                className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={region_data.filter(option =>option.value === region)}
                                options={region_data}
                                onChange={({value}) => this.setState({  region: value,area:'' })}
                            />
                         
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Area',languageData)}</Label>
                            <Select  
                                className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={area_all_data.filter(option =>option.value === area)}
                                options={getAreaValue(area_all_data,region)}
                                onChange={({value}) => this.setState({  area: value })}
                            />
                        </div>
                       
                </div>
            </div>
        <div className = "row text-center" style = {{margin:'0px 5px'}} >
                    <Button className = "button-width" color="primary" 
                               onClick={()=>this.onSubmitFilter(false)}>
                  {onChangeLanguage(locale,'Search',languageData)}   
                    </Button>
                    <Button className = "button-width" color="secondary"  
                            onClick={()=>this.onClickDetails(select_index)}
                    >{onChangeLanguage(locale,'Details',languageData)}</Button>
                    <Button className = "button-width" color="primary"  
                    onClick={()=>this.onClickshared()} disabled = {!is_shared}
                    >{onChangeLanguage(locale,'Share',languageData)}</Button> 
                    {getPermission(role_permission_data,'RA','Control Screen',true)  ==true &&
                      <Button className = "button-width" color="secondary"  
                      onClick={()=>this.onClickControl()}
                      >{onChangeLanguage(locale,'Control',languageData)}</Button> 
                    }
                     {getPermission(role_permission_data,'RA','Cross Borders',true)  ==true &&
                       <Button className = "button-width" color="secondary" style = {{}}  
                                onClick={()=>this.onClickCrossborders()}
                        >{onChangeLanguage(locale,'Cross Borders',languageData)}</Button> 
                     }
                  
                <Button className = "button-width" color="secondary" 
                                onClick={()=>this.ClearValue(1,25)}
                    >{onChangeLanguage(locale,'Refresh',languageData)}</Button> 
                
            </div>
            </div>
        </div>
        <div>
        <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
             <div className = "row" style = {{padding:'10px'}}>
                  <div className = "col-md-12" >
                        <Button className = "button-width" color="primary" 
                        onClick = {()=>this.addRowDetails()} >
                        {onChangeLanguage(locale,'Add Row',languageData)}      
                            </Button>
                            {is_adimin_Edit === true && 
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
                    
            </div>
             
                <div style = {{padding :'10px',width:'100%',overflow:'auto'}}>
                  <Table                 
                  columns={columns}
                  pagination = {pagination}
                  dataSource={data} 
                  rowKey="id"
                  onRow={this.onClickRow}
                  rowClassName={(record, index) =>  record.id === select_index ? 'selected-table-color' :( index % 2 === 0 ? 'table-row-light' :  'table-row-dark')}/>
               
                  </div>  
              </div>
              <div className = "row" style = {{marginBottom:'30px',paddingBottom:'100px'}}>
                    <div className = "col-md-5">
                        {this.renderPublish_Status()}
                    </div>
                    <div className = "col-md-7">
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
    onSubmitaddColumn()
    {
      const { column_name} = this.state
     

      if(column_name !== '')
      {
         
            this.setState({
            loading : true
            })
          amdcontractsService.add_columnapi(column_name)
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
                    <div className = "text-center" >
                        <Button className = "button-width" color="secondary" 
                            onClick = {()=>this.onSubmitaddColumn()}>
                            {onChangeLanguage(locale,'Submit',languageData)}       
                        </Button>
                    </div>
               
            </ModalBody>
           
          </Modal>
        );
    }
    onSubmitdeleteColumn()
    {
      const { column_name,dynamic_columns} = this.state
      if(column_name !== '')
      {
         
            this.setState({
            loading : true
            })
          amdcontractsService.delete_columnapi(column_name)
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
        var pub_pending_in= '',aud_pending_in=''
        if(list.length > 0)
        {
          pub_pending_in = list[0].pub_pending_in !== null ? list[0].pub_pending_in:''
          aud_pending_in = list[0].aud_pending_in !== null ? list[0].aud_pending_in:''
        }
        
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
                                             <Colxx xxs="2" className = "text-center" style = {{padding:'10px'}}>  <Label  className = "fontstyle to-small-font" >{value.label}</Label></Colxx>
                                            )}
                                             <Colxx xxs="2" className = "text-center" style = {{padding:'10px'}}>  <Label  className = "fontstyle to-small-font" >{onChangeLanguage(locale,'Total',languageData)}</Label></Colxx> 
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
                                          <Colxx xxs="2" className = "text-center" style = {{padding:'10px'}}> <Label  className = "fontstyle normal-font" >{value.name} </Label> </Colxx>
                                          <Colxx xxs="10">
                                              <Row>
                                                  {value.size_list && value.size_list.map((item,index) =>
                                                  <Colxx xxs="2" className = "text-center" style = {{padding:'10px'}}> 
                                                      <Input  className = "fontstyle text-background"  
                                                      placeholder = ''
                                                      value = {item.count}  
                                                      disabled = {true}
                                                      />
                                                  </Colxx>
                                                  )}
                                                    <Colxx xxs="2" className = "text-center"> 
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
                         <Colxx xxs="2" className = "text-center" style = {{padding:'10px'}}> <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Total',languageData)} </Label> </Colxx>
                         <Colxx xxs="10">
                                <Row>
                                    {size_data && size_data.map((value,index) =>
                                    <Colxx xxs="2" className = "text-center" style = {{padding:'10px'}}> 
                                        <Input  className = "fontstyle text-background"  
                                        placeholder = ''
                                        value = {this.getSubTotal(value.value)}   
                                        disabled = {true}
                                        />
                                    </Colxx>
                                    )}
                                    <Colxx xxs="2" className = "text-center"> 
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