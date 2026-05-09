import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button,ModalHeader,Modal,ModalBody} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { Table } from 'antd';
import Select from 'react-select';
import { createNotification } from '../../../../toast';
import {onChangeLanguage,getValue,getTimeDifference,convertUTCToLocalDate,
  convertLocalToUTCDate} from '../../../../helper';
import Loading from "react-fullscreen-loading";
import{RAareaService} from '../../../../redux/ra/area/saga';
import{regionsService} from '../../../../redux/ra/region/saga'
import{statusService} from '../../../../redux/ra/status/saga'
import{priorityService} from '../../../../redux/ra/priority/saga'
import{sizeService} from '../../../../redux/ra/size/saga'
import{userService} from '../../../../redux/users/saga'
import{amdcontractsService} from '../../../../redux/ra/amdcontracts/saga'
import{sharedService} from '../../../../redux/ra/shared/saga'
import moment from 'moment';
import {setContainerClassnames} from '../../../../redux/actions';
import {customStyles,getStausOptionAdminEnable,getEnableStatus} from '../../../../helper';
import DatePicker from "../../datePicker";
import{roleService} from '../../../../redux/role/saga'
import Workbook from 'react-excel-workbook'

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        data:[],
        id:'',
        request_no: '',
        contract_no:'',
        amd_no:'',
        type_of_req:'',
        received_time: '',
        priority:'',
        size: '',
        publisher:'',
        area:'',
        region:'',
        region_data:[],
        area_data:[],
        amd_no_data:[],
        user_data:[],
        status_data:[],
        priority_data:[],
        size_data:[],
        dynamic_columns:[],
        column_name:'',
        modalOpen:false,
        modalOpen_delete:false,
        is_submit_table:false,
        modalOpen_Routes:false,
        no_of_rutes:'',
        is_publish:'',
        select_index:-1,
        modalOpen_time:false,
        pending_out:'',
        is_adimin_Edit:false,
        publisher_status:'',
        auditor_status:'',
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
      this.fetchDatabasedReq(path)
      this.fetcharea()
      this.fetchregion()
      this.fetchuser()
      this.fetchpriority()
      this.fetchsize()
      this.fetchstatus()
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
    fetchDatabasedReq(id) {  
      this.setState({
        loading : true
      })    
      sharedService.fetchIndividualapi(id)
        .then((res) => { 
          this.setState({   
        loading : false 
                
          }) 
          var is_fill = true
          if(res.status)
            {
                  if(res.data.length > 0)
                  {
                        is_fill = false
                        var list = [...res.data]
                        if(list.length < 5)
                        {
                              const {request_no} = this.state
                              for(var i = list.length ; i <5;i++)
                              {
                                list.push(this.getrecord(i,request_no,id))
                              }
                                
                        }
                        this.setState({
                              data:list
                        }) 

                  }
                  this.setState({
                        dynamic_columns:res.dynamic_columns,
                  })
                
            }   
            if(is_fill === true)
            {
                  const {request_no} = this.state
                  var value = []
                  for(var i = 0 ; i <5;i++)
                  {
                    value.push(this.getrecord(i,request_no,id))
                  }
                  this.setState({
                        data:value
                   }) 
            }
                       
      
      })
      .catch((error) => { 
        this.setState({
          loading : false
        })
        });   
   }
    fetchData(id) {  
      this.setState({
        loading : true
      })    
      amdcontractsService.fetchIndividualapi(id)
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
                contract_no:record.contract_no,
                amd_no:record.amd_no,
                received_time: moment(record.received_time).format('MM/DD/YYYY hh:mm:ss a'),
                priority:record.priority,
                size: record.size,
                publisher:record.publisher,
                region:record.region,
                area:record.area,
                type_of_req:record.type_of_req,
                publisher_status:record.publisher_status,
                auditor_status:record.auditor_status,
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
    onClickback()
    {
      this.props.history.goBack()
    }
    onSubmitData(value,is_new)
    {
      const { id,request_no,status_data} = this.state
      const {username} = this.props
        const record = Object.assign({}, value);
        record.status = 1
        record.request_no = request_no
        if(typeof record.id === 'string')
        {
          record.id = 0
          record.end_time = convertLocalToUTCDate(new Date())
          this.setState({
            loading:true,
          })
        }
        record.updated_end_time = convertLocalToUTCDate(new Date())
        record.user_id = username
        record.undefined = undefined
        var list = status_data.filter(option =>(option.label).toUpperCase() === 'TO BE STARTED')
        if(record.publisher_status === null || record.publisher_status === '')
        {
          if(list.length > 0)
          {
            record.publisher_status = list[0].value
          }
        
        }
        
          sharedService.multiupdate_api([record])
            .then((res) => { 
              this.setState({
                loading:false,
              })
              if(res.status)
                {                
                  if(is_new === true)
                    {
                      this.fetchDatabasedReq(id)
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
            this.onSubmitData(record,is_new)
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
          this.onSubmitData(record,is_new)
        }
      }
    }
    onChangeValue_row(value,id,key)
    { 
     
      const data = [...this.state.data]
      const {status_data}=this.state
      const index = data.findIndex(x => x.id === id)
      
        if(index >= 0)
        {
          
            data[index][key] = value
            if(key === 'publisher_status')
            {
              data[index] = this.getTimebasedonstatus(value,key,data[index],index)
             
            }
            else if(key === 'auditor_status')
            {
              data[index] = this.getTimebasedonstatus(value,key,data[index],index)
            }
            var list = status_data.filter(option =>(option.label).toUpperCase() === 'TO BE STARTED')
            if(key === 'auditor')
            {
              if(data[index].auditor_status === null ||data[index].auditor_status === '')
              {
                if(list.length > 0)
                {
                  data[index].auditor_status = list[0].value
                }
              
              }
            }
            this.setState({
                  data:data
            })
            if(key === 'publisher' || key === 'auditor' || key === 'publisher_status' || key === 'auditor_status'
            || key === 'pub_in_progress'  || key === 'pub_done_time'|| key === 'aud_in_progress' || key === 'aud_done_time'  )
            {
                var is_new = false
                if(typeof id == 'string')
                {
                  is_new = true
                  data[index].start_time = convertLocalToUTCDate(new Date())
                }
                data[index].updated_start_time = convertLocalToUTCDate(new Date())
                this.onSubmitData(data[index],is_new)
            }
        }
   
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
          is_publish:key,
          select_index:index,
          modalOpen_time:true,
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
          modalOpen_Routes:true,
          is_publish:key,
          select_index:index,
        
        })
        
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
   
    addRowDetails()
    {
      const {dynamic_columns} = this.state
        var data = [...this.state.data]
        var count = data.length,isfill = true
        for(var i = 0 ; i<data.length;i++)
        {
            const record = Object.assign({}, data[i]);
            
            if(typeof record.id === 'string')
            {
                if(record.tab_details  === null || record.tab_details === "")
                {
                  // isfill = false
                }
            }
        }
        if(isfill === true)
        {
         
          this.setState({
            is_submit_table:false
          })
          const {request_no,id} = this.state
          var record = this.getrecord(count,request_no,id)
          for(var i = 0;i<dynamic_columns.length;i++)
          {
            record[dynamic_columns[i]] = ''
          }
          data.push(record)
          this.setState({
            data:data
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
    getrecord(count,request_no,id)
    {
      
      var record = {
          "id": 'new' + count,
          "contract_id":id ,
          "request_no":request_no ,
          "tab_details":'' ,
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
          "status":1 ,
          "start_time":new Date(),
          "end_time":new Date(),
          "updated_start_time":new Date(),
          "updated_end_time":new Date(),
          }
      return record
    }
    clearValue()
    {
      const {id} = this.state
      this.fetchData(id)
      this.fetchDatabasedReq(id)
    }
    menuButtonClick = (e) => {
      e.preventDefault();
      setTimeout(() => {
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', false, false);
        window.dispatchEvent(event);
      }, 350);
      this.props.setContainerClassnamesAction(
        3,
        'menu-sub-hidden sub-show-temporary',
        this.props.selectedMenuHasSubItems
      );
    };

    getEditStatusField(key,record,data)
    {
      var  isfill = getEnableStatus(key,data,record.request_no,record.publisher,record.publisher_status,record.auditor)
      return isfill
    }
    
    renderTemplate()
    {
      const {locale,languageData} = this.props
      const {request_no,contract_no,type_of_req,region,amd_no,area,priority,size,received_time ,
       region_data,area_data,priority_data,size_data ,status_data,data} = this.state
       var list = data.filter(record => typeof record.id !== 'string')
      var array = list.map(record=> {
                return {
                    'Request No' : request_no,
                    'Contract No' : contract_no ,
                    'Types Of RQ' : type_of_req ,
                    'AMD No' : amd_no ,
                    'Region' : getValue(region_data,'value','label',region) ,
                    'Area' : getValue(area_data,'value','label',area) ,
                    'Priority' : getValue(priority_data,'value','label',priority) ,
                    'Size' : getValue(size_data,'value','label',size) ,
                    'Received Time' :  received_time,
                    'Publisher' : record.publisher,
                    'Publisher Status' :getValue(status_data,'value','label',record.publisher_status) ,
                    'Auditor' : record.auditor,
                    'Auditor Status' :getValue(status_data,'value','label',record.auditor_status) ,
                    'Pub In Progress' : record.pub_in_progress !== null ? record.pub_in_progress : '',
                    'Pub Pending In' : record.pub_pending_in !== null ? record.pub_pending_in : '',
                    'Pub Pending Out' : record.pub_pending_out !== null ? record.pub_pending_out : '',
                    'Pub Done Time' : record.pub_done_time !== null ? record.pub_done_time : '',
                    'Pub Disregards' : record.pub_disregrads !== null ? record.pub_disregrads : '',
                    'Pub Totaltime' : record.pub_done_time !== null ? this.getTime(record.pub_done_time ,record.pub_in_progress) : '',
                    'Pub Total Routes' : record.pub_routes !== null ? record.pub_routes : '',
                    'Aud In Progress' : record.aud_in_progress !== null ? record.aud_in_progress : '',
                    'Aud Pending In' : record.aud_pending_in !== null ? record.aud_pending_in : '',
                    'Aud Pending Out' : record.aud_pending_out !== null ? record.aud_pending_out : '',
                    'Aud Done Time' : record.aud_done_time !== null ? record.aud_done_time : '',
                    'Aud Disregards' : record.aud_disregrads !== null ? record.aud_disregrads : '',
                    'Aud Totaltime' : record.aud_done_time !== null ? this.getTime(record.aud_done_time ,record.aud_in_progress) : '',
                    'Aud Total Routes' : record.aud_routes !== null ? record.aud_routes : '',
                    'TAB details' : record.tab_details !== null ? record.tab_details : '',

                };
              })
      return(
        <Workbook filename="RA-Shared.xlsx" element={<Button  className = "button-width" color="secondary">
        {onChangeLanguage(locale,'Download',languageData)}
        </Button>}>
        <Workbook.Sheet data={array} name="Sheet A">
        <Workbook.Column label="Request No" value="Request No"/>
        <Workbook.Column label="Contract No" value="Contract No"/>
        <Workbook.Column label="Types Of RQ" value="Types Of RQ"/>
        <Workbook.Column label="AMD No" value="AMD No"/>
        <Workbook.Column label="Region" value="Region"/>
        <Workbook.Column label="Area" value="Area"/>
        <Workbook.Column label="Priority" value="Priority"/>
        <Workbook.Column label="Size" value="Size"/>
        <Workbook.Column label="Received Time" value="Received Time"/>
        <Workbook.Column label="Publisher" value="Publisher"/>
        <Workbook.Column label="Publisher Status" value="Publisher Status"/>
        <Workbook.Column label="Auditor" value="Auditor"/>
        <Workbook.Column label="Auditor Status" value="Auditor Status"/>
        <Workbook.Column label="Pub In Progress" value="Pub In Progress"/>
        <Workbook.Column label="Pub Pending In" value="Pub Pending In"/>
        <Workbook.Column label="Pub Pending Out" value="Pub Pending Out"/>
        <Workbook.Column label="Pub Done Time" value="Pub Done Time"/>
        <Workbook.Column label="Pub Disregards" value="Pub Disregards"/>
        <Workbook.Column label="Pub Totaltime" value="Pub Totaltime"/>
        <Workbook.Column label="Pub Total Routes" value="Pub Total Routes"/>
        <Workbook.Column label="Aud In Progress" value="Aud In Progress"/>
        <Workbook.Column label="Aud Pending In" value="Aud Pending In"/>
        <Workbook.Column label="Aud Pending Out" value="Aud Pending Out"/>
        <Workbook.Column label="Aud Done Time" value="Aud Done Time"/>
        <Workbook.Column label="Aud Disregards" value="Aud Disregards"/>
        <Workbook.Column label="Aud Totaltime" value="Aud Totaltime"/>
        <Workbook.Column label="Aud Total Routes" value="Aud Total Routes"/>
        <Workbook.Column label="TAB details" value="TAB details"/>
        
        </Workbook.Sheet>
        
          </Workbook>
      )
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
        const {match,locale,languageData} = this.props
        const { loading,data, request_no, contract_no,  amd_no,type_of_req,is_submit_table,
            received_time, priority, size, publisher, area, area_data,is_adimin_Edit,
            user_data,status_data, priority_data,size_data,dynamic_columns,} = this.state
            
            var columns = [
                  {
                        title:onChangeLanguage(locale,'',languageData) ,
                        dataIndex: 'publisher',
                        key: 'publisher',
                        render: (text, record,index) => ( 
                          <div  style = {{padding:'2px'}}>
                                {index+1}
                          </div>),
                      },
                  {
                        title:onChangeLanguage(locale,'Publisher',languageData) ,
                        dataIndex: 'publisher',
                        key: 'publisher',
                        render: (text, record,index) => ( 
                          <div  style = {{padding:'2px'}}>
                            <Select   className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={user_data.filter(option =>option.value === text)}
                                options={user_data}
                                // isDisabled = {this.getEditStatusField('publisher',record,user_data)}
                                onChange={({value}) =>this.onChangeValue_row(value,record.id,'publisher')} /> 
                        
                          </div>),
                      },
                      {
                        title:onChangeLanguage(locale,'Publisher Status',languageData) ,
                        dataIndex: 'publisher_status',
                        key: 'publisher_status',
                        render: (text, record,index) => ( 
                          <div  style = {{padding:'2px'}}>
                            <Select   className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={status_data.filter(option =>option.value === text)}
                                styles={customStyles}
                                options={getStausOptionAdminEnable(status_data,record.publisher_status) }
                                isDisabled = {this.getEditStatusField('publisher_status',record,status_data)}
                                onChange={({value}) =>this.onChangeValue_row(value,record.id,'publisher_status')} /> 
                        
                          </div>),
                      },
                      {
                        title: onChangeLanguage(locale,'Tab Details',languageData),
                        dataIndex: 'tab_details',
                        key: 'tab_details',
                        render: (text, record,index) => ( 
                          <div style = {{padding:'2px'}}>
                            <Input  className =  {(is_submit_table === true && text === "" )   ?  "fontstyle error-border" :"fontstyle"  }
                              value = {text}  
                              onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'tab_details')} 
                              onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'tab_details')}
                              onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'tab_details')} 
                              />
                
                          </div>),
                      },
                      {
                        title:onChangeLanguage(locale,'Auditor',languageData) ,
                        dataIndex: 'auditor',
                        key: 'auditor',
                        render: (text, record,index) => ( 
                          <div  style = {{padding:'2px'}}>
                            <Select   className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={user_data.filter(option =>option.value === text)}
                                options={user_data.filter(option =>option.value !== record.publisher)}
                                isDisabled = {this.getEditStatusField('auditor',record,status_data)}
                                onChange={({value}) =>this.onChangeValue_row(value,record.id,'auditor')} /> 
                        
                          </div>),
                      },
                      {
                        title:onChangeLanguage(locale,'Auditor Status',languageData) ,
                        dataIndex: 'auditor_status',
                        key: 'auditor_status',
                        render: (text, record,index) => ( 
                          <div  style = {{padding:'2px'}}>
                            <Select   className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={status_data.filter(option =>option.value === text)}
                                styles={customStyles}
                                options={getStausOptionAdminEnable(status_data,record.auditor_status) }
                                isDisabled = {this.getEditStatusField('auditor_status',record,status_data)}
                                onChange={({value}) =>this.onChangeValue_row(value,record.id,'auditor_status')} /> 
                        
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
        return (
            <>
            <title>{onChangeLanguage(locale,'Shared Screen',languageData)}</title>
            {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <Row>
              <Colxx xxs="12">
              <div className = "row">
                      <div className = "col-md-10">
                      <Breadcrumb heading={onChangeLanguage(locale,'Shared Screen',languageData)} match={match} />
                    </div>
                    </div>
                  <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
             
                    <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                          <div className = "row" style = {{padding:'10px'}}>
                          <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Request No',languageData)}</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {request_no}  
                            disabled = {true}  
                            />
                        </div>
                          <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Contract No',languageData)}</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {contract_no}  
                            disabled = {true}  
                            />
                        </div>
                       
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Type of Req',languageData)}</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {type_of_req}
                            disabled = {true} 
                            />
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'AMD No',languageData)}</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {amd_no}
                            disabled = {true} 
                            />
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Area',languageData)}</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {getValue(area_data,'value','label',area)}
                            disabled = {true}  
                            />
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Publisher Name',languageData)}</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {publisher}
                            disabled = {true}  
                            />
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Priority',languageData)} </Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {getValue(priority_data,'value','label',priority)}
                            disabled = {true}  
                            />
                         
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Size',languageData)}</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {getValue(size_data,'value','label',size)}
                            disabled = {true}  
                            />
                        </div>
                        
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Received Time',languageData)}</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {received_time}
                            disabled = {true} 
                            />
                        </div>
                        
                    </div>
                    
                        <div className = "text-center" style = {{padding:'0px 0px 20px'}}>
                              
                              <Button className = "button-width" color="secondary"  style={{width:'150px'}}
                              onClick={()=>this.onClickback()}
                              >{onChangeLanguage(locale,'Back',languageData)}</Button> 
                              <Button className = "button-width" color="secondary" style={{width:'150px'}}
                              onClick={()=>this.clearValue()}
                              >{onChangeLanguage(locale,'Refresh',languageData)}</Button> 
                             {this.renderTemplate()}
                      
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
             
              <div style = {{padding :'10px'}}>
                <Table 
                dataSource={data} 
                columns={columns} 
                tableLayout="auto"
                rowKey="id"
                pagination={false} 
            //     scroll={{ y: '100%', x: "max-content" }}
                rowClassName={(record, index) =>  index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}/>
              </div> 
              <div className = "row" style = {{padding:'5px'}}>
                 <div className = "col-md-9"  ></div>
                 <div className = "col-md-2"  >
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Total Publisher Count',languageData)} </Label>
                 </div>

                  <div className = "col-md-1"  >
                       
                        <Input  className = "fontstyle"  
                        placeholder = ''
                        type = 'number'
                        value = {this.getCount('pub_routes')}
                        />
                  </div>
              </div>
              <div className = "row"  style = {{padding:'5px'}}>
                 <div className = "col-md-9"  ></div>
                 <div className = "col-md-2"  >
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Total Auditor Count',languageData)} </Label>
                 </div>

                  <div className = "col-md-1"  >
                       
                        <Input  className = "fontstyle"  
                        placeholder = ''
                        type = 'number'
                        value = {this.getCount('aud_routes')}
                        />
                  </div>
              </div>
              </div>
              
         
           </div>
           {this.renderPublish('Publisher Details','pub_in_progress','pub_routes','pub_done_time','publisher_status')}
           {this.renderPublish('Auditor Details','aud_in_progress','aud_routes','aud_done_time','auditor_status')}
           {this.renderModal()}
           {this.renderModalDelete()}
           {this.renderModal_Routes()}
           {this.renderModal_PendingOut()}
          </>
        )
    }
    getCount(key)
   {
      var count = 0
      const {data} = this.state
      for(var i = 0; i <data.length;i++)
      {
            if(data[i][key] !== null && data[i][key] !== '')
            {
                  count = count + parseInt(data[i][key] )
            }
      }


      return count
      
   }
    getTime(start,end)
    {
      var  new_tat = ''
      if(start !== '' && end !== '')
      {
         new_tat = getTimeDifference(new Date(start),new Date(end))
      }
    
      return new_tat
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
      let dates = moment(convertUTCToLocalDate(date)).format('MM/DD/YYYY hh:mm:ss a')
      if(dates !== 'Invalid date')
      {
        value = dates
      }
      
    }

    return value
  }
  getTimeDisabled(status,value,key)
  {
    const {status_data} = this.state
   
    var isDisabled = true
    var statusss =  getValue(status_data,'value','label',status)
    if(statusss !== '')
    {
      statusss = statusss.toUpperCase()
      if(key === 'pub_in_progress' || key === 'aud_in_progress')
      {
        if(statusss === 'IN PROCESS' ||statusss === 'PENDING IN'|| statusss === 'PENDING OUT' || statusss === 'DONE'|| statusss === 'DISREGARD')
        {
          // if(value !== '')
          // {
               isDisabled = false
          // }
          
        }
      }
      else
      {
        if(statusss === 'DONE'|| statusss === 'DISREGARD')
        {
          isDisabled = false
        }
      }
      
     
     
    }
    
    return isDisabled
  }
  

    renderPublish(title,key1,key2,key3,status_key)
    {
          
      const {locale,languageData} = this.props
      const {data} = this.state
      return(
            <div>
                  <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                        <div className = "publish-title" >
                              <Row>
                                    <Colxx xxs="12">
                                    <Label  className = "fontstyle"  style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,title,languageData)} </Label>
                                    </Colxx>
                              </Row>
                        </div>
                        <div style = {{padding:'10px',overflowX:'auto'}}>
                              <tabel>
                                     <tr>
                                          <td style = {{padding:'2px'}}></td>
                                          {data && data.map((value,index) =>
                                                <td align = 'center'  style = {{padding:'2px'}}> 
                                                      <Label lassName = "fontstyle">{index+1})</Label>
                                                </td>
                                          )}
                                    </tr>
                                    <tr>
                                          <td style = {{padding:'2px'}}> <Label  className = "fontstyle" >{onChangeLanguage(locale,'In Process',languageData)} </Label></td>
                                          {data && data.map((value,index) =>
                                                <td style = {{padding:'2px'}}>   
                                                       <DatePicker
                                                        selected={this.getDate(value[key1]) }
                                                        className = "text-background"
                                                        disabled = {this.getTimeDisabled(value[status_key],value[key1],key1)}
                                                        onChange={(date) =>this.onChangeValue_row(this.setDate(date),value.id,key1)} 
                                                        />
                                                </td>
                                          )}
                                    </tr>
                                    <tr>
                                          <td style = {{padding:'2px'}}> <Label  className = "fontstyle" >{onChangeLanguage(locale,'No of Routes',languageData)} </Label></td>
                                          {data && data.map((value,index) =>
                                                <td style = {{padding:'2px'}}> 
                                                <Input  className = "fontstyle text-background" style = {{width:'135px',fontSize:'10px'}}  
                                                      value = {value[key2]} 
                                                      min="1"
                                                      type = 'number'
                                                      onKeyDown={this.handleKeypress} 
                                                      onKeyPress = {(e)=>this.onKeyPressValue_row(e,value,key2)}
                                                      onChange={(e) =>this.onChangeValue_row(e.target.value,value.id,key2)} 
                                                      disabled = {this.getTimeDisabled(value[status_key],value[key2],key2)} 
                                                      />  
                                                </td>
                                          )}
                                    </tr>
                                    <tr>
                                          <td style = {{padding:'2px'}}> <Label  className = "fontstyle" >{onChangeLanguage(locale,'Complete',languageData)} </Label></td>
                                          {data && data.map((value,index) =>
                                                <td style = {{padding:'2px'}}> 
                                                <Input  className = "fontstyle text-background" style = {{width:'135px',fontSize:'10px'}}   
                                                      value = {this.getTime(value[key1],value[key3])}
                                                      
                                                      disabled = {true}
                                                      />  
                                                </td>
                                          )}
                                    </tr>
                                    <tr>
                                          <td style = {{padding:'2px'}}> <Label  className = "fontstyle" >{onChangeLanguage(locale,'Done',languageData)} </Label></td>
                                          {data && data.map((value,index) =>
                                                <td style = {{padding:'2px'}}> 
                                                  <DatePicker
                                                    selected={this.getDate(value[key3]) }
                                                    className = "text-background"
                                                    disabled = {this.getTimeDisabled(value[status_key],value[key3],key3)}
                                                    onChange={(date) =>this.onChangeValue_row(this.setDate(date),value.id,key3)} 
                                                    />  
                                                </td>
                                          )}
                                    </tr>
                              
                              </tabel>
                        </div>
                  </div>
            </div>
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
          sharedService.add_columnapi(column_name)
            .then((res) => { 
              this.setState({   
                loading : false     
              }) 
              this.closeModal()
              if(res.status)
                {
                  createNotification('Updated','success','filled')
                  this.clearValue()
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
            sharedService.delete_columnapi(column_name)
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
      const {no_of_rutes,is_publish,select_index} = this.state
   
      if(no_of_rutes !== '' && is_publish !== '' && select_index !== -1)
      {
            const data = [...this.state.data]
            if(select_index >= 0)
            {  
                  if(is_publish === 'publisher_status')
                  {        
                        data[select_index].pub_routes = no_of_rutes
                  }
                  else
                  {
                        data[select_index].aud_routes = no_of_rutes
                  }
            }
            this.setState({
              data:data,
            })
           this.onSubmitData(data[select_index],false)
           this.closeModal_Routes()
      }
      else
      {
          createNotification('Please fill the value','error','filled')
      }
    }
    closeModal_Routes()
    {
      
      this.setState({
        modalOpen_Routes : false,
        select_index:-1,
        pending_out:'',
        is_publish:'',
        no_of_rutes:'',
        modalOpen_time:false,
      })
    }
    
  renderModal_Routes()
    {
       
      const {modalOpen_Routes,no_of_rutes} = this.state
      const {locale,languageData} = this.props
      return (
          <Modal
            isOpen={modalOpen_Routes}
            toggle={this.setRoutes_value}
            wrapClassName="modal-right"
            backdrop="static"
          >
            <ModalHeader className = "fontstyle"  toggle={()=>this.setRoutes_value()}>
                {'Exit'}   
            </ModalHeader>
            <ModalBody>
            <div className = "col-md-12 space-margin"  >
                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Please Enter the Value',languageData)} </Label>
                    <Input  className = "fontstyle text-background"  
                    placeholder = ''
                    type = 'number'
                    value = {no_of_rutes}
                    min="1"  
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
      const {pending_out,is_publish,select_index} = this.state
   
      if(pending_out !== '' && is_publish !== '' && select_index !== -1)
      {
            const data = [...this.state.data]
           
            if(select_index >= 0)
            {  
                  let list = data.filter((item,index) => index === select_index)
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
                            data[select_index].pub_pending_out = moment(convertUTCToLocalDate(pending_out)).format('MM/DD/YYYY hh:mm:ss a')
                      }
                      else
                      {
                            data[select_index].aud_pending_out = moment(convertUTCToLocalDate(pending_out)).format('MM/DD/YYYY hh:mm:ss a')
                      }
                      this.setState({
                        data:data,
                      })
                      this.onSubmitData(data[select_index],false)
                      this.closeModal_Routes()
                    }
                    else
                    {
                      createNotification('Pending Out Greater than Pening In or Current Date/Time','error','filled')
                    }
                  
            }
            
      }
      else
      {
          createNotification('Please fill the value','error','filled')
      }
    }
    onChangePendingtime(date)
    {
      this.setState({pending_out  : date,end_date:''})
      
    }
    renderModal_PendingOut()
    {
       
      const {modalOpen_time,pending_out} = this.state
      const {locale,languageData} = this.props
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

const mapStateToProps = ({ settings,menu }) => {
      const { selectedMenuHasSubItems } = menu;
      const { locale,languageData,username} = settings;
      return {locale, languageData,username, selectedMenuHasSubItems};
};
export default withRouter(
      connect(mapStateToProps, {
      setContainerClassnamesAction: setContainerClassnames,
      })(QueryResolveSheet)
);

