import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button,ModalHeader,Modal,ModalBody} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { Table,Tooltip } from 'antd';
import 'antd/dist/antd.css';
import { adminRoot } from "../../../../constants/defaultValues";
import Select from 'react-select';
import{RAareaService} from '../../../../redux/ra/area/saga';
import { createNotification } from '../../../../toast';
import {onChangeLanguage,getValue,convertLocalToUTCDate,getAreaValue,getPermission} from '../../../../helper';
import Loading from "react-fullscreen-loading";
import{regionsService} from '../../../../redux/ra/region/saga'
import{amdnoService} from '../../../../redux/ra/amdno/saga'
import{internalexternalService} from '../../../../redux/ra/internalexternal/saga'
import{errortypeService} from '../../../../redux/ra/errortype/saga'
import{userService} from '../../../../redux/users/saga'
import{correctionlogService} from '../../../../redux/ra/correctionlog/saga'
import moment from 'moment';
import {setContainerClassnames} from '../../../../redux/actions';
import DatePicker from "../../datePicker";
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../constants/defaultValues';
import {customStyles,getStausOptionEnable,getISnumber} from '../../../../helper';
import{roleService} from '../../../../redux/role/saga'

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        selectedRowKeys: [], 
        data:[],
        region_data: [],
        area_all_data:[],
        amd_no_data:[],
        user_data:[],
        internalexternal_data:[],
        errortype_data:[],
        inter_exter:'',
        contract_doneby:'',
        auditor:'',
        publisher:'',
        is_submit_table:false,
        select_index : -1,
        page:1,
        pageSize:25,
        total :0,
        is_search:false,
        is_adimin_Edit:false,
      }
    }
    componentDidMount()
    {
      
      this.fetchregion()
      this.fetcharea()
      this.fetchamdno()
      this.fetchuser()
      this.fetchinternalexternal()
      this.fetcherrortype()
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
                let filterstatus = (res.data).filter(item => ((item.name).toLowerCase() === 'supervisor'))
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
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString(),region:cusmaidid.region};
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
     fetchamdno() {
        amdnoService.fetchapi()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var regionlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   });  
                    this.setState({
                    amd_no_data :  regionlist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
     } 
     
     fetchinternalexternal() {
        internalexternalService.fetchapi()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var regionlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   });  
                    this.setState({
                    internalexternal_data :  regionlist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
     } 
     fetcherrortype() {
        errortypeService.fetchapi()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var regionlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   });  
                    this.setState({
                    errortype_data :  regionlist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
     }  
     getMandatory(record,key)
     {
 
       var isfill = false
       const{internalexternal_data} = this.state
       if(record.inter_exter  !== "" && record.inter_exter  !== null)
       {
        if((getValue(internalexternal_data,'value','label',record.inter_exter)).toLowerCase() === 'external')
        {
          if(key === 'auditor')
          {
            if(record.auditor  === null || record.auditor === "")
            {
              isfill = true
            }
          }
          else  if(key === 'error_type')
          {
            if(record.error_type  === null || record.error_type === "")
            {
              isfill = true
            }
          }
        }
        else
        {
          if(key === 'auditor')
          {
            if(record.auditor  === null || record.auditor === "")
            {
              isfill = true
            }
            
          }
          else if(key === 'publisher')
          {
            if(record.publisher  === null || record.publisher === "")
            {
              isfill = true
            }
            
          }
          else  if(key === 'error_type')
          {
            if(record.error_type  === null || record.error_type === "")
            {
              isfill = true
            }
          }
          
        }
        
        
      }
 
       return isfill
 
     }
   
    onSubmitData(value,is_new)
    {
      
      const{username} = this.props
      const{internalexternal_data} = this.state
      
         const id = value.id
        var record = Object.assign({}, value),isfill = true
        if(typeof record.id === 'string')
        {
          record.id = 0
          record.end_time = convertLocalToUTCDate(new Date())
        }
        if(record.received_time  === null || record.received_time === "")
        {
          isfill = false
          
        }
        if(record.received_time  !== "" && record.received_time  !== null)
        {
          let re = /^\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}:\d{2}:\d{2} ([AaPp][Mm])?$/ ;
          let received_time =(record.received_time).match(re)
          if(received_time === null )
          {
            isfill = false
          }

          if( record.amd_no  === null || record.amd_no === "" ||
          record.region  === null || record.region === "" ||
          record.request_no  === null || record.request_no === "" ||
          record.area  === null || record.area === "" ||
          record.inter_exter  === null || record.inter_exter === "" ||
          record.error_type  === null || record.error_type === "")
          {
            isfill = false
          }
        }
        if(record.inter_exter  !== "" && record.inter_exter  !== null)
        {
          if((getValue(internalexternal_data,'value','label',record.inter_exter)).toLowerCase() === 'external')
          {
            if(record.auditor  === null || record.auditor === "")
            {
              isfill = false
            }
          }
          else
          {
            if( record.publisher  === null || record.publisher === "" ||  record.auditor  === null || record.auditor === "" )
            {
              isfill = false
            }
          }

        }

      record.user_id = username
      record.corrector  = username
      record.updated_end_time = convertLocalToUTCDate(new Date())
      if(record.log_time === '' || record.log_time === null)
      {
        record.log_time  = moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
      }
     
     
        if(isfill === true)
        {
           
          if(record.id === 0)
          {
            this.setState({
              loading:true
            })
          }
          correctionlogService.multiupdate_api([record])
            .then((res) => { 
              this.setState({   
                loading : false     
              }) 
              if(res.status)
                {
                 
                
                  // if(is_new === true)
                  //   {
                      if(res.data)
                      {
                        if(res.data.length > 0)
                        {
                          const data = [...this.state.data]
                          const index = data.findIndex(x => x.id === id)
                          data[index] = res.data[0]
                          this.setState({
                            data:data
                          })
                        }
                      }
                     
                    // }
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
          // createNotification('Please fill mandatory field','error','filled')
        }
    }
    
   
    ClearValue(page,pagesize)
    {
        this.setState({
          inter_exter:'',
          contract_doneby:'',
          auditor:'',
          publisher:'',
          is_submit_table:false,
          select_index : -1,
          is_search:false,
        })
        this.fetchPagination(page,pagesize,'','','','')
    }
    fetchPagination(page,per_page,publisher,auditor,inter_exter,contract_doneby)
    {
      this.setState({
        loading : true
      })
      correctionlogService.filterapi(page,per_page,publisher,auditor,inter_exter,contract_doneby)
        .then((res) => { 
          this.setState({   
            loading : false,
            pageSize : per_page,
            page:page,   
          }) 
          if(res.status)
            {
            
                this.setState({
                    data:res.data,
                    total : res.total,
                    select_index : -1,
                    selectedRowKeys:[],
                })
            } else{
                this.setState({
                    data:[],
                    select_index : -1, 
                    selectedRowKeys:[],
                    total : 0,
                    pageSize : 25,
                    page:1,
                })
             
            }             
      
      })
      .catch((error) => { 
        this.setState({
          loading : false,
          
        })
        
      });
    }
    onSubmitFilter()
    {
      const {page,pageSize, publisher,auditor,inter_exter,contract_doneby} = this.state
    var isfill = false
    if(publisher !== '' || auditor !== '' || inter_exter !== "" || contract_doneby !== '')
    {
        isfill = true  
    }

      if(isfill === true)
      {
          this.setState({
            is_search:true
          })
        this.fetchPagination(page,pageSize, publisher,auditor,inter_exter,contract_doneby)
      }
      else
      {
        createNotification('Please Choose any one details then can search','error','filled')
       
      }
    }
    handleDelete(id)
    {
      const {page,pageSize, publisher,auditor,inter_exter,contract_doneby} = this.state
      this.setState({   
          loading : true     
        }) 
      correctionlogService.deleteapi(id)
      .then((res) => {
        if(res){
          this.setState({   
              loading : false,
              select_index:-1     
            }) 
            if(res.status)
            {
              createNotification('Deleted','success','filled')
              this.fetchPagination(page,pageSize, publisher,auditor,inter_exter,contract_doneby)
            }
          
        }			
      })
      .catch((error) => { });
    }

    onClickAMD_Contract(){
      
      this.props.history.push(`${adminRoot}/ra/amd-contracts`)
       
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
      const index = data.findIndex(x => x.id === id)
        if(index >= 0)
        {
            data[index][key] = value
            if(key === 'region')
            {
              data[index].area = ''
            }
            else if(key === 'publisher_status')
            {
              data[index] = this.getTimebasedonstatus(value,key,data[index])
             
            }
            else if(key === 'auditor_status')
            {
              data[index] = this.getTimebasedonstatus(value,key,data[index])
            }
            else if(key === 'inter_exter')
            {
              data[index].publisher =  ''
              data[index].auditor =  ''
            }
            
            this.setState({
              data:data
            })
            var is_new = false
            if(typeof id == 'string')
            {
              is_new = true
            }
            data[index].updated_start_time = convertLocalToUTCDate(new Date())
            
            if(key === 'region' || key === 'area' || key === 'inter_exter'
            || key === 'auditor' || key === 'error_type' || key === 'publisher')
            {
              this.onSubmitData(data[index],is_new)
            }
            
        }
        this.setState({
          select_index : -1,
        })
    }
   
    getTimebasedonstatus(id,key,item)
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
        if(key === 'publisher_status')
        {
          record.pub_pending_out = current_date
        }
        else
        {
          record.aud_pending_out = current_date
        }
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
      const {pageSize} = this.state
        var data = [...this.state.data]
        var count = data.length,isfill = true
        for(var i = 0 ; i<data.length;i++)
        {
            const record = Object.assign({}, data[i]);
            
            if(typeof record.id === 'string')
            {
                if(record.contract_no  === null || record.contract_no === ""  || record.received_time  === null || record.received_time === "")
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
            "amd_no": "",
            "region": "",
            "area": "",
            "received_time": "",
            "inter_exter": "",
            "contract_doneby": "",
            "publisher": '',
            "auditor": '',
            "error_type": "",            
            "comments_audit": "",
            "corrector": "",
            "log_time": "",
            "status" : 1,
            "start_time":convertLocalToUTCDate(new Date()),
            "end_time":'',
            "updated_start_time":convertLocalToUTCDate(new Date()),
            "updated_end_time":''
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
    }
   
   
    onSelectChange = selectedRowKeys => {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.setState({ selectedRowKeys});
    };
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
   


    paginationOptions = {
      showSizeChanger: true,
      showQuickJumper: true,
      onShowSizeChange: (_, pageSize) => {
        this.setState({
          pageSize : pageSize
        })
        
      },
      onChange: (page,pageSize) => {
        const { publisher,auditor,inter_exter,contract_doneby,is_search} = this.state
        if(is_search === true)
        {
          
          this.fetchPagination(page,pageSize, publisher,auditor,inter_exter,contract_doneby)
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
    render()
    {

        const {locale,languageData,role_permission_data,match} = this.props
        const {data,loading,region_data,area_all_data,internalexternal_data,selectedRowKeys,is_adimin_Edit,
            errortype_data,user_data,publisher,auditor,select_index,inter_exter,contract_doneby ,is_submit_table} = this.state
            const columns = [
                {
                   title:  onChangeLanguage(locale,'Request No',languageData),
                   dataIndex: 'request_no',
                   key: 'request_no',
                   render: (text, record) => (	
                     <div style = {{padding:'2px',width:'100px'}}>
                         <Input  className = {(is_submit_table === true && text === "" && typeof record.id === 'string' )   ?  "fontstyle error-border" :"fontstyle"  }
                          value = {text}  
                          onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'request_no')} 
                          onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'request_no')}
                          onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'request_no')} 
                          />

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
                                onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'contract_no')} 
                                onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'contract_no')}
                                onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'contract_no')} 
                                /> :text
                         }
                    </div>
                    ),
                 },
                 {
                  title: onChangeLanguage(locale,'AMD No',languageData),
                  dataIndex: 'amd_no',
                  key: 'amd_no',
                  render: (text, record,index) => ( 
                    <div style = {{padding:'2px',width:'100px'}}>
                      <Input  className = {(is_submit_table === true && text === "" && typeof record.id === 'string' )   ?  "fontstyle error-border" :"fontstyle"  }
                          value = {text}  
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
                          value={area_all_data.filter(option =>option.value === text)}
                          options={getAreaValue(area_all_data,record.region)}
                          onChange={({value}) =>this.onChangeValue_row(value,record.id,'area')} /> 
                  
                    </div>),
                },        
                {
                  title:onChangeLanguage(locale,'Date and Time',languageData) ,
                  dataIndex: 'received_time',
                  key: 'received_time',
                  render: (text, record) => (	
                      <div style = {{padding:'2px',width:'200px'}}>
                          {(typeof record.id === 'string') ? 
                              <Input  className = {(is_submit_table === true && text === "" )   ?  "fontstyle error-border" :"fontstyle"  }
                              value = {text}  
                              onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'received_time')} 
                              onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'received_time')}
                              placeholder = "MM/DD/YYYY hh:mm:ss AM/PM"
                              onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'received_time')} 
                              />   :text
                           }
                      </div>
                      ),
                },
              {
                title:onChangeLanguage(locale,'Internal /External',languageData) ,
                dataIndex: 'inter_exter',
                key: 'inter_exter',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'100px'}}>
                    <Select   className = {(is_submit_table === true && text === "" && typeof record.id === 'string' )   ?  "error-border-select" :"react-select fontstyle"  } 
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={internalexternal_data.filter(option =>option.value === text)}
                        options={internalexternal_data}
                        onChange={({value}) =>this.onChangeValue_row(value,record.id,'inter_exter')} /> 
                
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Publisher',languageData) ,
                dataIndex: 'publisher',
                key: 'publisher',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'100px'}}>
                    <Select   className = {this.getMandatory(record,'publisher')  ?  "error-border-select" :"react-select fontstyle"  } 
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={user_data.filter(option =>option.value === text)}
                        options={user_data}
                        // isDisabled = {(record.request_no !== ''&& record.request_no !== null )? false: true }
                        onChange={({value}) =>this.onChangeValue_row(value,record.id,'publisher')} /> 
                
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Auditor',languageData) ,
                dataIndex: 'auditor',
                key: 'auditor',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'100px'}}>
                    <Select   className = {this.getMandatory(record,'auditor')  ?  "error-border-select" :"react-select fontstyle"  } 
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={user_data.filter(option =>option.value === text)}
                        options={user_data.filter(option =>(option.value !== record.publisher || record.publisher === 'SHAREDR'))}
                        // isDisabled = {((record.publisher !== ''&& record.publisher !== null) && (record.request_no !== ''&& record.request_no !== null ) )? false: true }
                        onChange={({value}) =>this.onChangeValue_row(value,record.id,'auditor')} /> 
                
                  </div>),
              },
            
              {
                title:onChangeLanguage(locale,'Error Type',languageData) ,
                dataIndex: 'error_type',
                key: 'error_type',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'100px'}}>
                    <Select   className = {(this.getMandatory(record,'error_type') )?  "error-border-select" :"react-select fontstyle"  } 
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={errortype_data.filter(option =>option.value === text)}
                        options={errortype_data}
                        onChange={({value}) =>this.onChangeValue_row(value,record.id,'error_type')} /> 
                
                  </div>),
              },
             
            
              
            
              {
                title:onChangeLanguage(locale,'Comment',languageData) ,
                dataIndex: 'comment',
                key: 'comment',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'100px'}}>
                    <Input  className = "fontstyle" 
                            value = {text} 
                            onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'comment')} 
                            onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'comment')} 
                            onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'comment')} 
                            /> 
                
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Corrector',languageData) ,
                dataIndex: 'corrector',
                key: 'corrector',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'100px'}}>
                   {text} 
                
                  </div>),
              },
              {
                title: onChangeLanguage(locale,'Log Time',languageData),
                dataIndex: 'log_time',
                key: 'log_time',
                render: (text, record,index) => ( 
                  <div style = {{padding:'2px',width:'100px'}}>
                      {text}
        
                  </div>),
              },
              
              
           ]
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
            <title>{onChangeLanguage(locale,'Correction Log',languageData)}</title>
            {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <Row>
              <Colxx xxs="12">
              <div className = "row">
                      <div className = "col-md-10">
                      <Breadcrumb heading={onChangeLanguage(locale,'Correction Log',languageData)} match={match} />
                    </div>
                    </div>
                  <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
        <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'10px',marginBottom:'30px'}}>
            <div className = "row">
                <div className = "col-md-12">  
                    <div className = "row" style = {{padding:'10px'}}>
                       <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Internal / External',languageData)} </Label>
                            <Select  
                                className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={internalexternal_data.filter(option =>option.value === inter_exter)}
                                options={internalexternal_data}
                                onChange={({value}) => this.setState({  inter_exter: value })}
                            />
                         
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Auditor',languageData)}</Label>
                            <Select  
                                className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={user_data.filter(option =>option.value === auditor )}
                                options={user_data}
                                onChange={({value}) => this.setState({  auditor : value })}
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
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
                </div>
            </div>
        <div className = "row text-center" style = {{margin:'0px 5px'}} >
                    <Button className = "button-width" color="primary" 
                               onClick={()=>this.onSubmitFilter()}>
                  {onChangeLanguage(locale,'Search',languageData)}   
                    </Button>
                    {getPermission(role_permission_data,'RA','AMD / Contracts',true)  ==true &&
                      <Button className = "button-width" color="secondary"  
                        onClick={()=>this.onClickAMD_Contract()}
                        >{onChangeLanguage(locale,'AMD / Contracts',languageData)}</Button> 
                }
                {is_adimin_Edit === true &&
                 <Button className = "button-width" color="primary"  disabled = {select_index === -1}
                                onClick={()=>this.handleDelete(select_index)}
                    >{onChangeLanguage(locale,'Delete',languageData)}</Button> 
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
                  <div className = "col-md-3" >
                        <Button className = "button-width" color="primary" 
                        onClick = {()=>this.addRowDetails()} >
                        {onChangeLanguage(locale,'Add Row',languageData)}      
                            </Button>
                           
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
             
            
            </div>
          
          </>
        )
    }
    

}

const mapStateToProps = ({ settings,menu }) => {
  const { selectedMenuHasSubItems } = menu;
  const { locale,languageData,username,role_permission_data} = settings;
  return {locale, languageData, username,selectedMenuHasSubItems,role_permission_data};
};
export default withRouter(
  connect(mapStateToProps, {
  setContainerClassnamesAction: setContainerClassnames,
  })(QueryResolveSheet)
);