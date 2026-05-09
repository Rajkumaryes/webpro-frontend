import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Popover,Input, PopoverBody,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { Table,Popconfirm ,Tooltip} from 'antd';
import Select from 'react-select';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import {onChangeLanguage,getValue,getAreaValue,convertLocalToUTCDate} from '../../../../helper'
import{regionsService} from '../../../../redux/ap/region/saga'
import{areasService} from '../../../../redux/ap/area/saga'
import moment from 'moment';
import{userService} from '../../../../redux/users/saga'
import{errorreportingService} from '../../../../redux/ap/errorreporting/saga'
import{categoryService} from '../../../../redux/ap/category/saga'
import{errortypeService} from '../../../../redux/ap/errortype/saga'
import{gsccommentsService} from '../../../../redux/ap/gsccomments/saga'
import{scanlocationService} from '../../../../redux/ap/scanlocation/saga'
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../constants/defaultValues';
import DatePickerDate from "../../datePickerDate";

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedRowKeys: [],
        loading:false,
        region_data:[],
        area_data:[],
        user_data:[],
        scanloaction_data:[],
        gsc_comments_data:[],
        category_data:[],
        error_type_data:[],
        data:[],
        column_value:[],
        open_popup: '',
        page:1,
        pageSize:25,
        total :0,
        submit_column:false
        
      };
    }
    componentDidMount()
    {
      this.fetchData(1,25)
      this.fetchregion()  
      this.fetcharea()
      this.fetchuser()
      this.fetchGSC_Comments()
      this.fetchscanloaction()
      this.fetchErrorType()
      this.fetchcategory()
    }
    fetchData(page,per_page) {
      this.setState({
        loading:true,
      })
      errorreportingService.fetchPaginationapi(page,per_page)
      .then((res) => {
        this.setState({loading:false})
         if(res.status)   { 
       
                  this.setState({
                    total : res.total,
                    data:res.data,
                    pageSize : per_page,
                    page:page,
                  })
                 
               }
               else
               {
                this.setState({
                  total :0,
                  data:[],
                  pageSize : 25,
                  page:1,
                })
               }
              
               })
               .catch((error) => {this.setState({loading:false}) }); 
   } 
   fetchregion() {
    this.setState({loading:true})
    regionsService.fetchapi()
    .then((res) => {
      this.setState({loading:false})
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                region_data :  regionlist,
                })
             }
             
             })
             .catch((error) => {  this.setState({loading:false})}); 
 }  
 fetcharea() {
  this.setState({loading:true})
  areasService.fetchapi()
  .then((res) => {
    this.setState({loading:false})
     if(res.status)   { 
        let filterstatus = (res.data).filter(item => item.status === 1)
           var regionlist = filterstatus.map(function(cusmaidid) {
                return  {label : cusmaidid.name ,value : cusmaidid.id.toString(),region:cusmaidid.region};
             });  
              this.setState({
              area_data :  regionlist,
              })
           }
           
           })
           .catch((error) => {  this.setState({loading:false})}); 
} 
fetchcategory() {
  this.setState({loading:true})
  categoryService.fetchapi()
  .then((res) => {
    this.setState({loading:false})
     if(res.status)   { 
        let filterstatus = (res.data).filter(item => item.status === 1)
           var regionlist = filterstatus.map(function(cusmaidid) {
                return  {label : cusmaidid.name ,value : cusmaidid.id.toString(),sensitivity:cusmaidid.sensitivity.toString()};
             });  
              this.setState({
              category_data :  regionlist,
              })
           }
           
           })
           .catch((error) => {  this.setState({loading:false})}); 
} 
fetchuser() {  
  this.setState({
    loading : true
  })
  userService.fetchpermission_user('AP')
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
fetchscanloaction() {
  this.setState({loading:true})
  scanlocationService.fetchapi()
  .then((res) => {
    this.setState({loading:false})
     if(res.status)   { 
        let filterstatus = (res.data).filter(item => item.status === 1)
           var regionlist = filterstatus.map(function(cusmaidid) {
                return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
             });  
              this.setState({
              scanloaction_data :  regionlist,
              })
           }
           
           })
           .catch((error) => {  this.setState({loading:false})}); 
} 
fetchGSC_Comments() {
  this.setState({loading:true})
  gsccommentsService.fetchapi()
  .then((res) => {
    this.setState({loading:false})
     if(res.status)   { 
        let filterstatus = (res.data).filter(item => item.status === 1)
           var regionlist = filterstatus.map(function(cusmaidid) {
                return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
             });  
              this.setState({
              gsc_comments_data :  regionlist,
              })
           }
           
           })
           .catch((error) => {  this.setState({loading:false})}); 
} 
fetchErrorType() {
  this.setState({loading:true})
  errortypeService.fetchapi()
  .then((res) => {
    this.setState({loading:false})
     if(res.status)   { 
        let filterstatus = (res.data).filter(item => item.status === 1)
           var regionlist = filterstatus.map(function(cusmaidid) {
                return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
             });  
              this.setState({
              error_type_data :  regionlist,
              })
           }
           
           })
           .catch((error) => {  this.setState({loading:false})}); 
} 

      handleChangeColumn= (option) =>
      {
        
        this.setState({column_value:option})
      }
      closedate()
      {
        this.setState({open_popup:''})
      }
      getData()
      {
        this.setState({submit_column:true,open_popup:''})
      }
      clearData()
      {
        this.setState({column_value:[],submit_column:false,open_popup:''})
      }
      onChangeFileUpload(files)
      {
        const file = files[0]
        const {username} = this.props
        errorreportingService.fileUpload(file,username)
          .then((res) => { 
         
            if(res.status)
            {
              if(res.data.status)
              {
                createNotification('Uploaded','success','filled')
                this.fetchData(1,25)
              } 
              else
              {
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
      
      onSubmitData(value,is_new)
      {
   
        
          var isfill = true
          const id = value.id
          var record = Object.assign({}, value);
          if(typeof record.id === 'string')
          {
            record.id = 0
            record.end_time = convertLocalToUTCDate(new Date())
          }
          if(record.document_number  === null || record.document_number === "" || record.date_reported  === "" || record.date_reported  === null)
          {
            isfill = false
          }
          if(record.date_reported  !== "" && record.date_reported  !== null)
          {
           
            let re = /^\d{1,2}\/\d{1,2}\/\d{4}?$/ ;
            let date_reported_ =(record.date_reported).match(re)
            if(date_reported_ === null )
            {
              isfill = false
            }
          }
          record.error_updatedate =  moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
          record.updated_end_time = convertLocalToUTCDate(new Date())
          if(isfill === true)
          {
          
            errorreportingService.multiupdate_api([record])
              .then((res) => { 
               
                if(res.status === true)
                  {
                    
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
                    if(is_new === true)
                    {
                      createNotification('Successful Saving of Records','success','filled')
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
            createNotification('Please fill mandatory field and fill the Date is (MM/DD/YYYY) this format ','error','filled')
          }
           
       
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
      const {category_data} = this.state
      const data = [...this.state.data]
      const index = data.findIndex(x => x.id === id)
        if(index >= 0)
        {
          data[index][key] = value
          if(key === 'category')
          {
            data[index].sensitivity = getValue(category_data,'value','sensitivity',value)
          }
          if(key === 'region')
          {
            data[index].area = ''
          }
          if(key === 'region' || key === 'area' || key === 'user_id' || key === 'scanlocation' || key === 'gsc_comments'
          || key === 'category' || key === 'error_type' || key === 'gsc_comments')
          {
            if(typeof id == 'number')
            {
                this.onSubmitData(data[index],false)
            }
          }
          this.setState({
            data:data
          })
        }
    }
    onChangeDate(value,id,key)
    { 
      const data = [...this.state.data]
      const index = data.findIndex(x => x.id === id)
        if(index >= 0)
        {
          data[index][key] = moment(value).format('MM/DD/YYYY')
          this.onSubmitData(data[index],false)
          this.setState({
            data:data
          })
         
        }
    }
    getDate(value)
    { 
      var date = ''
      if(value !== '' && value !== null && value)
      {
        date = moment(value).format('MM/DD/YYYY')
      }
    
      return date
    }
    handleDelete = id => {
      const {page,pageSize} = this.state
      errorreportingService.deleteapi(id)
      .then((res) => {
        if(res){
          createNotification('Deleted','success','filled')
          this.fetchData(page,pageSize)
        }			
      })
      .catch((error) => { });
    }
    addRowDetails()
    {
      const {username} = this.props
      const {pageSize} = this.state
        var data = [...this.state.data]
        var count = data.length,isfill = true
        
        for(var i = 0 ; i<data.length;i++)
        {
            const record = Object.assign({}, data[i]);
            
            if(typeof record.id === 'string')
            {
              if(record.document_number  === null || record.document_number === "")
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
            "user_id":username,
            "week_no": "",
            "date_reported": moment(new Date()).format('MM/DD/YYYY'),
            "invoice_no": "",
            "companycode": "",
            "vendor": "",
            "vendor_name": "",
            "amount": "",
            "document_currency": "",
            "scanlocation": "",
            "document_number": "",
            "region": '',
            "area": '',
            "error_description": "",
            "gsc_comments": "",
            "category": "",
            "sensitivity": "",
            "jiraticket": "",
            "error_reportby": "",
            "error_updatedate": "",
            "error_type": "",
            "other_comments": "",
            "status": 0,
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
          createNotification('Please fill Document Number','error','filled')
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
      console.log("libkhjvh onChange")
       this.fetchData(page,pageSize)
      },
      pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
      // total: this.state.total  ,
      showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total}`,
    };
    render()
    { 
        const{column_value,data,open_popup,submit_column,loading,is_submit_table,
          region_data,area_data,error_type_data,gsc_comments_data,user_data,category_data,
          scanloaction_data}=this.state
        const {match,locale,languageData} = this.props
        var columnsss = [],columndata = []
        const  column_data = [
         
          {
            title:onChangeLanguage(locale,'Date Reported',languageData) ,
            dataIndex: 'date_reported',
            key: 'date_reported',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {/* { moment(text).format('MM/DD/YYYY') } */}
               <Input  className = {(is_submit_table === true && text === "" )   ?  "fontstyle error-border" :"fontstyle"  }
                    value = {text}  
                    onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'date_reported')} 
                    onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'date_reported')}
                    onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'date_reported')} 
                    />
                    {/* <DatePickerDate
                      selected={this.getDate(text)}
                      className = "" 
                      onChange={(date) =>this.onChangeDate(date,record.id,'date_reported')}
                      /> */}
              </div>),
          },
          {
            title:onChangeLanguage(locale,'Week No',languageData) ,
            dataIndex: 'week_no',
            key: 'week_no',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               <Input  className = "fontstyle" 
                    value = {text}  
                    onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'week_no')} 
                    onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'week_no')}
                    onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'week_no')} 
                    />
              </div>),
          },  {
            title: onChangeLanguage(locale,'Region',languageData),
            dataIndex: 'region',
            key: 'region',
            render: (text, record,index) => ( 
              <div style = {{padding:'2px',width:'100px'}}>
               <Select  className= "react-select fontstyle"
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
                  <Select   className= "react-select fontstyle"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    value={area_data.filter(option =>option.value === text)}
                    options={getAreaValue(area_data,record.region)}
                    onChange={({value}) =>this.onChangeValue_row(value,record.id,'area')} /> 
            
              </div>),
          },
          {
            title: onChangeLanguage(locale,'Document Number',languageData),
            dataIndex: 'document_number',
            key: 'document_number',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
              <Input  className = {(is_submit_table === true && typeof record.id === 'string' && text === "" )   ?  "fontstyle error-border" :"fontstyle"  }
                    value = {text} 
                    type="text"
                    onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'document_number')} 
                    onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'document_number')}
                    onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'document_number')} 
                    />    
              </div>),
           
          },
          {
            title:onChangeLanguage(locale,'Invoice Number',languageData) ,
            dataIndex: 'invoice_no',
            key: 'invoice_no', 
             render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
                 <Input  className = "fontstyle"
                    value = {text}  
                    onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'invoice_no')} 
                    onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'invoice_no')}
                    onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'invoice_no')} 
                    />
                   
                
              </div>),
          },
          {
            title: onChangeLanguage(locale,'Vendor',languageData),
            dataIndex: 'vendor',
            key: 'vendor',
          sortDirections: ['descend', 'ascend'],
          render: (text, record,index) => ( 
            <div  style = {{padding:'2px',width:'100px'}}>
               <Input  className = "fontstyle" 
                    value = {text}  
                    onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'vendor')} 
                    onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'vendor')}
                    onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'vendor')} 
                    />  
            </div>),
          },
          {
            title: onChangeLanguage(locale,'Vendor Name',languageData),
            dataIndex: 'vendor_name',
            key: 'vendor_name',
          render: (text, record,index) => ( 
            <div  style = {{padding:'2px',width:'100px'}}>
               <Input  className = "fontstyle" 
                    value = {text}  
                    onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'vendor_name')} 
                    onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'vendor_name')}
                    onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'vendor_name')} 
                    />  
            </div>),
          },
          {
            title: onChangeLanguage(locale,'Company Code',languageData),
            dataIndex: 'companycode',
            key: 'companycode',
          render: (text, record,index) => ( 
            <div  style = {{padding:'2px',width:'100px'}}>
              <Input  className = "fontstyle" 
                    value = {text} 
                    onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'companycode')} 
                    onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'companycode')} 
                    onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'companycode')} 
                    />
            </div>),
          },
          {
            title: onChangeLanguage(locale,'Amount',languageData),
            dataIndex: 'amount',
            key: 'amount',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               <Input  className = "fontstyle" 
                    value = {text}
                    onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'amount')} 
                    onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'amount')}  
                    onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'amount')} 
                    />  
              </div>),
          },
          
          {
            title:onChangeLanguage(locale,'Currency',languageData) ,
            dataIndex: 'document_currency',
            key: 'document_currency',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
                 <Input  className = "fontstyle" 
                    value = {text}  
                    onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'document_currency')} 
                    onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'document_currency')}  
                    onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'document_currency')} 
                    />    
              </div>),
          },
          {
            title:onChangeLanguage(locale,'User ID',languageData) ,
            dataIndex: 'user_id',
            key: 'user_id',
            render: (text, record,index) => ( 
              <div style = {{padding:'2px',width:'100px'}}>
                  <Select   className= "react-select fontstyle"
                      classNamePrefix="react-select"
                      name="form-field-name"
                      value={user_data.filter(option =>option.value === text)}
                      options={user_data}
                      onChange={({value}) =>this.onChangeValue_row(value,record.id,'user_id')} /> 
            
  
            </div>),
          },
          {
            title: onChangeLanguage(locale,'Scan Location',languageData),
            dataIndex: 'scanlocation',
            key: 'scanlocation',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               <Select  className= "react-select fontstyle"
                  classNamePrefix="react-select"
                  name="form-field-name"
                  value={scanloaction_data.filter(option =>option.value === text)}
                  options={scanloaction_data}
                  onChange={({value}) =>this.onChangeValue_row(value,record.id,'scanlocation')} />
              </div>),
          },
          {
            title:onChangeLanguage(locale,'Error Description',languageData) ,
            dataIndex: 'error_description',
            key: 'error_description',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
                <Input  className = "fontstyle" 
                    value = {text}  
                    onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'error_description')} 
                    onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'error_description')}  
                    onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'error_description')} 
                    />
              </div>),
          },
          {
            title:onChangeLanguage(locale,'GSC Comments',languageData) ,
            dataIndex: 'gsc_comments',
            key: 'gsc_comments',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
                 <Select  className= "react-select fontstyle"
                  classNamePrefix="react-select"
                  name="form-field-name"
                  value={gsc_comments_data.filter(option =>option.value === text)}
                  options={gsc_comments_data}
                  onChange={({value}) =>this.onChangeValue_row(value,record.id,'gsc_comments')} /> 
              </div>),
          },
          {
            title:onChangeLanguage(locale,'Category',languageData) ,
            dataIndex: 'category',
            key: 'category',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
                 <Select  className= "react-select fontstyle"
                  classNamePrefix="react-select"
                  name="form-field-name"
                  value={category_data.filter(option =>option.value === text)}
                  options={category_data}
                  onChange={({value}) =>this.onChangeValue_row(value,record.id,'category')} /> 
              </div>),
          },

           {
            title:onChangeLanguage(locale,'Sensitivity',languageData) ,
            dataIndex: 'sensitivity',
            key: 'sensitivity',
          render: (text, record,index) => ( 
            <div  style = {{padding:'2px',width:'100px'}}>
             {record.sensitivity}
            </div>),
          },  
          {
            title:onChangeLanguage(locale,'JIRA Ticket',languageData) ,
            dataIndex: 'jiraticket',
            key: 'jiraticket',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
                <Input  className = "fontstyle" 
                    value = {text}  
                    onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'jiraticket')} 
                    onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'jiraticket')} 
                    onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'jiraticket')} 
                    />  
              </div>),
          }, 
          {
            title: onChangeLanguage(locale,'Error Report By',languageData),
            dataIndex: 'error_reportby',
            key: 'error_reportby',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
                <Input  className = "fontstyle" 
                    value = {text}  
                    onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'error_reportby')} 
                    onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'error_reportby')} 
                    onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'error_reportby')} 
                    />
              </div>),
          },
           {
            title:onChangeLanguage(locale,'Error Update Date',languageData) ,
            dataIndex: 'error_updatedate',
            key: 'error_updatedate',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}> 
               {(record.error_updatedate !== null && record.error_updatedate !== '')&&
                moment(record.error_updatedate).format('MM/DD/YYYY') } 
              </div>),
          },
           {
            title: onChangeLanguage(locale,'Error Type',languageData),
            dataIndex: 'error_type',
            key: 'error_type',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
                 <Select  className= "react-select fontstyle"
                  classNamePrefix="react-select"
                  name="form-field-name"
                  value={error_type_data.filter(option =>option.value === text)}
                  options={error_type_data}
                  onChange={({value}) =>this.onChangeValue_row(value,record.id,'error_type')} />  
              </div>),
          },
           {
            title:onChangeLanguage(locale,'Other Comments',languageData) ,
            dataIndex: 'other_comments',
            key: 'other_comments',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               <Input  className = "fontstyle" 
                    value = {text}  
                    onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'other_comments')} 
                    onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'other_comments')}
                    onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'other_comments')} 
                    />
              </div>),
          },
          {
            title: 'Action',
            key: 'id',
           dataIndex: 'id',
            render: (id,record) => (
                <div className="row d-flex justify-content-center" >
                 <Popconfirm className = 'fontstyle' variant="contained" 
                 title="Are you sure to delete?"
                 style = {{
                    backgroundColor: 'rgb(79, 156, 1)',
                    color: 'white' }}
                   onConfirm={() => this.handleDelete(record.id)}
                    >
                       <Tooltip title="Delete" placement="bottom">
                 <a style = {{color  :'red' ,height:'25px',width:'25px',
                            padding:'4px',marginLeft:'12px'}}><i className = "simple-icon-trash"></i></a></Tooltip>
                    </Popconfirm>
            
                     
                  </div>
            )
        }
          
        ];
        const pagination = {
          ...this.paginationOptions,
          total: this.state.total,
          current: this.state.page,
          pageSize: this.state.pageSize,
          };
        columndata = column_data.map(value => {
                return {label :value.title,value : value.title};
                           })
         if(submit_column === true)
         {
            for(var j = 0 ; j < column_value.length;j++)
            {
              for(var i = 0 ; i < column_data.length;i++)
              {
                    if(column_value[j].label === column_data[i].title)
                    {
                      columnsss.push(column_data[i])
                    }
              }
            }
         }
         else
         {
          columnsss = [...column_data]
         }
         

        return (
            <>
            <title>{onChangeLanguage(locale,'Error Reporting',languageData)}</title>
            {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <Row>
              <Colxx xxs="12">
              <div className = "row">
                    <div className = "col-md-6">
                      <Breadcrumb heading={onChangeLanguage(locale,'Error Reporting',languageData)} match={match} />
                    </div>
                    <div className = "col-md-6" style = {{marginTop:'10px'}}>
                        <ul style = {{listStyle : 'none', display : 'inline-flex'}}>
                           <li>   
                            <span>
                              <Button color="secondary" outline
                                className="button-width mr-1 mb-2"
                                id="column"
                                onClick={() => this.setState({open_popup:'column'})}
                              >{submit_column === true ?  (column_value.length + ' ' +onChangeLanguage(locale,'Column Selected',languageData) ) :onChangeLanguage(locale,'Select Column',languageData)}
                                 < i  style = {{marginLeft:'5px'}} className = {open_popup === 'column' ? "simple-icon-arrow-up":"simple-icon-arrow-down"}/>
                              </Button>
                              <Popover
                                placement='bottom'
                                isOpen={open_popup === 'column'}
                                target="column"
                                toggle={() =>  this.setState({open_popup:''})}
                              >
                                <PopoverBody>
                                <Row> 
                                <Colxx xxs="12">
                                    <Label className = "fontstyle" style = {{color:'red',cursor :'pointer',padding:'5px'}}  onClick = {() =>  this.closedate()}> 
                                    <i className = "simple-icon-close" style = {{position:'absolute',right:'10px'}} /></Label> 
                                    
                                </Colxx>
                              
                                  <Colxx xxs="12">
                                  <div style = {{padding :'10px'}}>
                                      <Label className = "fontstyle">{onChangeLanguage(locale,'Column Name',languageData)}</Label> 
                                        <ReactMultiSelectCheckboxes  className = 'fontstyle' 
                                        value={column_value}
                                        onChange={this.handleChangeColumn}
                                        options={columndata}
                                        getDropdownButtonLabel={({ placeholderButtonLabel, value }) => { if(value.length==0) {return "Select.."; }else{ var item = value.filter(item=>item.label.includes('Select All')); if(item.length!=0){ return (value.length-1)+" selected";} else {return value.length+" selected";}  }}}
                                        />
                                  </div>
                                  </Colxx>
                                  <Colxx  xxs="12" className = "text-center">
                                    <Button color="primary" className = "button-width"
                                      className="mr-1 mb-2 button-width"
                                      id={`popover_0`}
                                      onClick={() => this.getData()} >{onChangeLanguage(locale,'Submit',languageData)}</Button>
                                    <Button color="secondary" className = "button-width"
                                      className="mr-1 mb-2 button-width"
                                      onClick={() => this.clearData('column',false) }>{onChangeLanguage(locale,'Clear',languageData)}</Button>
                                  </Colxx>
                                </Row>
                                </PopoverBody>
                              </Popover>
                          </span>
                           </li>
                           <li >
                           <Button className = "button-width" color="primary"
                            onClick = {()=>this.addRowDetails()}  >
                           {onChangeLanguage(locale,'Add Error Details',languageData)}
                          </Button>
                            </li>
                            <li>
                            <Button className = "button-width" color="secondary" 
                            onClick = {()=>this.fetchData(1,25)} >
                            {onChangeLanguage(locale,'Refresh',languageData)} 
                            </Button>
                            </li>
                            <li>
                            {/* <Button className = "button-width" color="primary" 
                            onClick = {()=>this.onSubmitData1()} >
                            {onChangeLanguage(locale,'Save',languageData)} 
                            </Button> */}
                            </li>
                            <li>
                            <Button className = "button-width" color="primary" style= {{width :'100px'}}>
                              <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
                              <a style= {{margin :'0px'}} >{onChangeLanguage(locale,'Upload',languageData)} </a>
                              <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                                  className = "filepicker_customButton"
                                  style = {{width : '95px',marginLeft :'-10%'}}
                                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                      onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
                          </Button>
                            </li>
                           
                        </ul>
                      
                       
                    </div>
                   
                  
                  </div>
               
                
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div >
                    {columnsss.length > 0 && 
                    
                    <Table                 
                  columns={columnsss}
                  pagination = {pagination}
                  dataSource={data} 
                  rowKey="id"
                  rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}/>

                    }  
                    
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

