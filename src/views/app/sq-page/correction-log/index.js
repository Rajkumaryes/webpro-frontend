import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button,ModalHeader,Modal,ModalBody} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { Table,Checkbox,Tooltip } from 'antd';
import 'antd/dist/antd.css';
import { adminRoot } from "../../../../constants/defaultValues";
import Select from 'react-select';
import{SQareaService} from '../../../../redux/sq/sqmasters/area/saga';
import { createNotification } from '../../../../toast';
import {onChangeLanguage,getValue} from '../../../../helper';
import Loading from "react-fullscreen-loading";
import{regionService} from '../../../../redux/sq/sqmasters/region/saga'
import{amdnoService} from '../../../../redux/ra/amdno/saga'
import{InternalService} from '../../../../redux/sq/sqmasters/internal/saga'
import{ErrortypeService} from '../../../../redux/sq/sqmasters/errortype/saga'
import{userService} from '../../../../redux/users/saga'
import{correctionlogService} from '../../../../redux/sq/correctionlog/saga'
import moment from 'moment';
import{QuotationService} from '../../../../redux/sq/sqmasters/quotation/saga'
import{SizeService} from '../../../../redux/sq/sqmasters/size/saga'
import {setContainerClassnames} from '../../../../redux/actions';
import DatePicker from "../../datePicker";
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../constants/defaultValues';
import {customStyles,getStausOptionEnable,getISnumber,getAreaValue,
  convertLocalToUTCDate,convertUTCToLocalDate} from '../../../../helper';
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
        quodationdonedata:[],
        request_no:'',
        quotation_no:'',
        area:'',
        inter_exter:'',
        quotation_doneby:'',
        auditor:'',
        error_type:'',
        comment:'',
        corrector:'',
        log_time:'',
        date:'',
        is_submit_table:false,
        select_index : -1,
        page:1,
        pageSize:25,
        total :0,
        is_search:false,
        is_adimin_delete:false,
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
      this.fetchquotation()
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
                    is_adimin_delete:true
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
        userService.fetchpermission_user('SQ')
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
        regionService.fetchregion()
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
        SQareaService.fetcharea()
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
     fetchquotation() {
      this.setState({loading:true})
      QuotationService.fetchquotation()
      .then((res) => {
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var regionlist = filterstatus.map(function(cusmaidid) {
                    return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                 });  
                  this.setState({
                  quodationdonedata :  regionlist
                  })
                 
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})
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
        InternalService.fetchinternal()
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
        ErrortypeService.fetcherrortype()
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

   
    onSubmitData(value,is_new)
    {
      
      const{username} = this.props
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
              if(    record.request_no  === null || record.request_no === "" )
              {
                isfill = false
              }
         
        }
      record.user_id = username
      record.corrector  = username
      record.updated_end_time =convertLocalToUTCDate(new Date())
      record.log_time  = moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
      
        if(isfill === true)
        {
           
          correctionlogService.multiupdate_api([record])
            .then((res) => { 
              this.setState({   
                loading : false     
              }) 
              if(res.status)
                {
                 
                
                  if(is_new === true)
                    {
                      createNotification('Successful Saving of Records','success','filled')
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
    
   
    ClearValue(page,pagesize)
    {
        this.setState({
          request_no:'',
          quotation_no:'',
          area:'',
          inter_exter:'',
          quotation_doneby:'',
          auditor:'',
          error_type:'',
          comment:'',
          date:'',
          is_submit_table:false,
          select_index : -1,
          is_search:false,
        })
        this.fetchPagination(page,pagesize,'','','','','','','','','','','')
    }
    fetchPagination(page,per_page,request_no,quotation_no,area,inter_exter,quotation_doneby,auditor,error_type,comment,corrector,log_time,date)
    {
      this.setState({
        loading : true
      })
      correctionlogService.filterapi(page,per_page,request_no,quotation_no,area,inter_exter,quotation_doneby,auditor,error_type,comment,corrector,log_time,date)
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
              createNotification(res.message,'error','filled')
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
      const {page,pageSize,request_no,quotation_no,area,inter_exter,quotation_doneby,auditor,error_type,comment,corrector,log_time,date} = this.state
    var isfill = false
    if( request_no !== '' || area!=='' || inter_exter !== "" || quotation_no !==''
        || auditor !=='' || error_type !=='' || comment !=='' || date !=='')
    {
        isfill = true  
    }

      if(isfill === true)
      {
          this.setState({
            is_search:true
          })
        this.fetchPagination(page,pageSize, request_no,quotation_no,area,inter_exter,quotation_doneby,auditor,error_type,comment,corrector,log_time,date)
      }
      else
      {
        createNotification('Please Choose any one details then can search','error','filled')
       
      }
    }
   

    onClickAMD_Contract(){
      
      this.props.history.push(`${adminRoot}/ra/amd-contracts`)
       
    }
    onKeyDownValue_row(e,record,key)
    { 
     
      var code = e.keyCode || e.which;
          if (code === 9) 
         {
            if(record[key] !== '' || key === 'quotation_no')
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
        if(record[key] !== '' || key === 'quotation_no')
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
            if(key === 'publisher_status')
            {
              data[index] = this.getTimebasedonstatus(value,key,data[index])
             
            }
            else if(key === 'auditor_status')
            {
              data[index] = this.getTimebasedonstatus(value,key,data[index])
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
            
            if(key === 'region' || key === 'area' || key === 'inter_exter' || key === 'contract_doneby'
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
                if(record.quotation_no  === null || record.quotation_no === ""  || record.received_time  === null || record.received_time === "")
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
            "quotation_no": "",
            "amd_no": "",
            "region": "",
            "area": "",
            "received_time": "",
            "inter_exter": "",
            "contract_doneby": "",
            "auditor": '',
            "error_type": "",            
            "comment": "",
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
          for(let i=0;i<data.length;i++)
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
          createNotification('Please fill mandatory field and fill the Date is (MM/DD/YYYY hh:mm:ss AM/PM) this format','error','filled')
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
        const { request_no,quotation_no,area,inter_exter,quotation_doneby,auditor,error_type,comment,corrector,log_time,date,is_search} = this.state
        if(is_search === true)
        {
          
          this.fetchPagination(page,pageSize,request_no,quotation_no,area,inter_exter,quotation_doneby,auditor,error_type,comment,corrector,log_time,date)
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
    handleDelete(id)
    {
      const {page,pageSize,request_no,quotation_no,area,inter_exter,quotation_doneby,auditor,error_type,comment,corrector,log_time,date} = this.state
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
              this.fetchPagination(page,pageSize,request_no,quotation_no,area,inter_exter,quotation_doneby,auditor,error_type,comment,corrector,log_time,date)
            }
          
        }			
      })
      .catch((error) => { });
    }
    render()
    {

        const {locale,languageData,match} = this.props
        const {data,loading,region_data,amd_no_data,area_all_data,internalexternal_data,selectedRowKeys,
            errortype_data,user_data,publisher,select_index,contract_doneby ,
            request_no,quotation_no,area,inter_exter,quotation_doneby,auditor,error_type,comment,
            corrector,log_time,date,is_submit_table,quodationdonedata,is_adimin_delete} = this.state
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
                   title:  onChangeLanguage(locale,'Quotation Number',languageData),
                   dataIndex: 'quotation_no',
                   key: 'quotation_no',
                   render: (text, record) => (	
                    <div style = {{padding:'2px',width:'100px'}}>
                        {/* {(typeof record.id === 'string') ?  */}
                                <Input  className = {"fontstyle"  }
                                value = {text}  
                                onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'quotation_no')} 
                                onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'quotation_no')}
                                onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'quotation_no')} 
                                />
                                 {/* :text } */}
                    </div>
                    ),
                 },
                
                {
                  title: onChangeLanguage(locale,'Region',languageData),
                  dataIndex: 'region',
                  key: 'region',
                  render: (text, record,index) => ( 
                    <div style = {{padding:'2px',width:'100px'}}>
                       <Select  className="react-select fontstyle"
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
                      <Select   className="react-select fontstyle"
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
                              />   :moment(text).format('MM/DD/YYYY hh:mm:ss a')
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
                    <Select   className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={internalexternal_data.filter(option =>option.value === text)}
                        options={internalexternal_data}
                        onChange={({value}) =>this.onChangeValue_row(value,record.id,'inter_exter')} /> 
                
                  </div>),
              },
              // {
              //   title:onChangeLanguage(locale,'Contract Done By',languageData) ,
              //   dataIndex: 'quotation_doneby',
              //   key: 'quotation_doneby',
              //   render: (text, record,index) => ( 
              //     <div  style = {{padding:'2px',width:'100px'}}>
              //       <Select   className="react-select fontstyle"
              //           classNamePrefix="react-select"
              //           name="form-field-name"
              //           value={user_data.filter(option =>option.value === text)}
              //           options={user_data}
              //           onChange={({value}) =>this.onChangeValue_row(value,record.id,'quotation_doneby')} /> 
                
              //     </div>),
              // },
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
                        isDisabled = {(record.request_no !== ''&& record.request_no !== null )? false: true }
                        onChange={({value}) =>this.onChangeValue_row(value,record.id,'publisher')} /> 
                
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
                        options={user_data.filter(option =>option.value !== record.publisher)}
                        isDisabled = {(record.publisher !== ''&& record.publisher !== null )? false: true }
                        onChange={({value}) =>this.onChangeValue_row(value,record.id,'auditor')} /> 
                
                  </div>),
              },
            
              {
                title:onChangeLanguage(locale,'Error Type',languageData) ,
                dataIndex: 'error_type',
                key: 'error_type',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'100px'}}>
                    <Select   className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={errortype_data.filter(option =>option.value === text)}
                        options={errortype_data}
                        onChange={({value}) =>this.onChangeValue_row(value,record.id,'error_type')} /> 
                
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Auditor Comment',languageData) ,
                dataIndex: 'comments_audit',
                key: 'comments_audit',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'100px'}}>
                      {(typeof record.id === 'string') ? 
                            <Input  className = "fontstyle" 
                            value = {text} 
                            onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'comments_audit')} 
                            onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'comments_audit')} 
                            onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'comments_audit')} 
                            /> 
                          : 
                          <Tooltip className = 'fontstyle' title={text} placement="bottom">
                              <a>{(text && text !== null && text !== '') &&  (text.length > 25 ? text.substring(1, 25) : text)}</a>
                        </Tooltip>
                          } 
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
                              {onChangeLanguage(locale,'Area',languageData)}</Label>
                              <Select  
                              className="react-select fontstyle"
                              classNamePrefix="react-select"
                              name="form-field-name"
                              value={area_all_data.filter(option =>option.value === area)}
                              options={area_all_data}
                              onChange={({value}) => this.setState({  area: value })}
                              />
                          </div>
                          <div className = "col-md-3 space-margin"  >
                              <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Internal / External',languageData)} </Label>
                              <Select  
                              className="react-select fontstyle"
                              classNamePrefix="react-select"
                              name="form-field-name"
                              value={internalexternal_data.filter(option =>option.value === inter_exter)}
                              options={internalexternal_data}
                              onChange={({value}) => this.setState({  inter_exter: value })}
                              />
                          
                          </div>                    
                          {/* <div className = "col-md-3 space-margin"  >
                              <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Contract Done By',languageData)}</Label>
                               <Select  
                              className="react-select fontstyle"
                              classNamePrefix="react-select"
                              name="form-field-name"
                              value={user_data.filter(option =>option.value === quotation_doneby)}
                              options={user_data}
                              onChange={({value}) => this.setState({  quotation_doneby: value })}
                              />
                          </div> */}
                          <div className = "col-md-3 space-margin"  >
                              <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Auditor',languageData)}</Label>
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
                              <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Error Type',languageData)}</Label>
                              <Select  
                              className="react-select fontstyle"
                              classNamePrefix="react-select"
                              name="form-field-name"
                              value={errortype_data.filter(option =>option.value === error_type)}
                              options={errortype_data}
                              onChange={({value}) => this.setState({  error_type: value })}
                              />
                          </div>
                          <div className = "col-md-3 space-margin"  >
                              <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Comment',languageData)}</Label>
                              <Input  className = "fontstyle text-background"  
                              placeholder = ''
                              value = {comment}  
                              onChange= {(e)=>this.setState({comment : e.target.value})} 
                              />
                          </div>   
                          <div className = "col-md-3 space-margin"  >
                              <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Date',languageData)}</Label>
                              <Input  className = "fontstyle text-background"  
                              placeholder = ''
                              type="date"
                              value = {date}  
                              onChange= {(e)=>this.setState({date : e.target.value})} 
                              />
                          </div>   
                </div>
            </div>
        <div className = "row text-center" style = {{margin:'0px 5px'}} >
                    <Button className = "button-width" color="primary" 
                               onClick={()=>this.onSubmitFilter()}>
                  {onChangeLanguage(locale,'Search',languageData)}   
                    </Button> 
                    {is_adimin_delete ==true &&
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
  const { locale,languageData,username} = settings;
  return {locale, languageData, username,selectedMenuHasSubItems};
};
export default withRouter(
  connect(mapStateToProps, {
  setContainerClassnamesAction: setContainerClassnames,
  })(QueryResolveSheet)
);