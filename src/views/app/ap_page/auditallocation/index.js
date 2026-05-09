import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row, Modal,ModalHeader,ModalBody,Popover, PopoverBody} from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { Table } from 'antd';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import {onChangeLanguage,get_array_id,getValue,convertLocalToUTCDate,getAreaValue,getoptionvalue} from '../../../../helper'
import{regionsService} from '../../../../redux/ap/region/saga'
import{areasService} from '../../../../redux/ap/area/saga'
import{userService} from '../../../../redux/users/saga'
import{auditallocationService} from '../../../../redux/ap/auditallocation/saga'
import Workbook from 'react-excel-workbook'
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../constants/defaultValues';
import moment from 'moment';


class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        tabvalue:'total',
        selectedRowKeys: [], 
        all_data:[],
        modalOpen:false,
        columndata:[],
        column_value:[],
        open_popup: '',
        open_clear: '',
        open_clearall:'',
        open_movecomplete:'',
        submit_column:false,
        region_data:[],
        area_data:[],
        user_data:[],
        area_all_data:[],
        region:[],
        area:[],
        user:[],
        file:null,
        no_of_task:'',
        is_submit:false,
        is_submit_table:false,
        username:'',
        area_filter:[],
        region_filter:[],
        companycode_filter:'',
        vendor_filter:'',
        document_number_filter:'',
        scanlocation_filter:'',
        document_id_filter:'',
        is_reassign:false,
        user_status:false,
        summary_data:[],
        is_summary:false,
        page:1,
        pageSize:25,
        total :0,
        total_count :0,
        pending_count :0,
        complete_count :0,
        auditallocation:'',
        auditallocationlast:'',
      };
    }
    componentDidMount()
    {
      
      this.fetchregion()  
      this.fetchuser()
     
      this.fetcharea()
      this.ClearValue()
      this.fetchAuditCount()
    }
       fetchAuditCount(){
         this.setState({loading:true})
         const {username} = this.props
         //console.log(username)
         auditallocationService.fetchauditcount(username)
         .then((res) => {
            if(res.status)   { 
                   let filterstatus = res.data;
                   let lastdata = res.lastcount;
                   this.setState({ 
                   auditallocation:filterstatus, 
                   auditallocationlast:lastdata     
                   }) 
                  }
                  else{
                  this.setState({loading:false})}
                  })
                  .catch((error) => { }); 
                  this.setState({loading:false})
   
   }
  
    fetchregion() {
      this.setState({loading:true})
      regionsService.fetchapi()
      .then((res) => {
        this.setState({loading:false})
         if(res.status)   { 
                    let filterstatus = (res.data).filter(item => item.status === 1)
                    if(filterstatus.length > 0)
                    {
                      var regionlist = [{label : 'Select All' ,value : 'Select All'}]
                      regionlist.push(...filterstatus.map(function(cusmaidid) {
                          return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                      }))
                            this.setState({
                            region_data :  regionlist,
                            })
                    }
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
                area_all_data :  regionlist,
                })
             }
             
             })
             .catch((error) => {  this.setState({loading:false})}); 
 }  

  fetcharea_multipleregionwise(ids) {
    this.setState({loading:true})
    areasService.fetchapiMultipleRegionWise(ids)
    .then((res) => {
       if(res.status)   {
        this.setState({loading:false}) 
                let filterstatus = (res.data).filter(item => item.status === 1)
                if(filterstatus.length > 0)
                {
                  var regionlist = [{label : 'Select All' ,value : 'Select All'}]
                  regionlist.push(...filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                  }))
                  this.setState({
                    area_data :  regionlist,
                  })
                }
             }
             
             })
             .catch((error) => { this.setState({loading:false}) }); 
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
              if(filterstatus.length > 0)
              {
                var regionlist = [{label : 'Select All' ,value : 'Select All'}]
               regionlist.push(...filterstatus.map(function(cusmaidid) {
                    return  {label : cusmaidid.username ,value : cusmaidid.username};
                }))
                this.setState({
                  user_data :  regionlist,
                })
              }
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
   
    onChangeFileUpload(files)
    {
      this.setState({
        modalOpen:true,
        file:files[0],
        is_reassign:false
      })
    }
    openModal()
    {
      this.setState({
        modalOpen:true,
        is_reassign:true
      })
    }
    
    handleChangeColumn= (option) =>
    {
      
      this.setState({column_value:option})
    }
    closedate()
    {
      this.setState({open_popup:'',open_clear:'',open_clearall:'',open_movecomplete:''})
    }
    getData()
    {
      this.setState({submit_column:true,submit_clear:true,open_popup:'',open_clear:'',open_clearall:'',open_movecomplete:''})
    }
    clearData()
    {
      this.setState({column_value:[],submit_column:false,submit_clear:false,open_popup:'',open_clear:'',open_clearall:'',open_movecomplete:''})
    }
    onSelectChange = selectedRowKeys => {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.setState({ selectedRowKeys });
    };
    onSubmitClear()
    {
      const { selectedRowKeys,page,pageSize,region_filter,area_filter,document_id_filter,companycode_filter,username,
        scanlocation_filter,vendor_filter,document_number_filter,user_status,tabvalue} = this.state
    

      if(selectedRowKeys.length > 0)
      {
          this.setState({
            loading : true
          })
          auditallocationService.clear_api(selectedRowKeys)
            .then((res) => { 
              this.setState({   
                loading : false,
                open_clear:''     
              }) 
              if(res.status)
                {
                  createNotification('Updated','success','filled')
                  this.fetchPagination(page,pageSize,region_filter,area_filter,document_id_filter,companycode_filter,username,
                  scanlocation_filter,vendor_filter,document_number_filter,user_status,tabvalue)
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
    onSubmitClearAll()
    {
      const { all_data,user_status} = this.state
 
      if(all_data.length > 0)
      {
          this.setState({
            loading : true
          })
          auditallocationService.clearAll()
            .then((res) => { 
              this.setState({   
                loading : false,
                open_clearall:''       
              }) 
              if(res.status)
                {
                  createNotification('Updated','success','filled')
                  this.setuserReport(user_status)
                 
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
        
        createNotification('There is no Data','error','filled')
      }
    }
    onChangeValue_row(value,id,key)
    { 
      const data = [...this.state.all_data]
      const index = data.findIndex(x => x.id === id)
        if(index >= 0)
        {
          data[index][key] = value
          if(key === 'region')
          {
            data[index].area = ''
          }
          this.setState({
            all_data:data
          })
          this.onSubmitRecord(data[index])
        }
    }
    onSubmitData()
    {
      const { selectedRowKeys,all_data,tabvalue,page,pageSize} = this.state
     

      if(all_data.length > 0)
      {
          var list = [],isfill = true
          for(var i = 0 ; i<all_data.length;i++)
          {
              const record = Object.assign({}, all_data[i]);
              record.updated_start_time = convertLocalToUTCDate(new Date())
              for(var j = 0 ; j<selectedRowKeys.length;j++)
              {
                if(record.id === selectedRowKeys[j])
                {
                  record.status = 1
                  if(record.region === null || record.region === "" 
                  || record.area === null || record.area === "" 
                  || record.user_id === null || record.user_id === "")
                  {
                    isfill = false
                    break;
                  }
                 
                }
              }
              
              record.updated_end_time =convertLocalToUTCDate(new Date())
              list.push(record)
          }
         if(isfill === true)
         {
          this.setState({
            loading : true,
            open_movecomplete:''
          })
          auditallocationService.multiupdate_api(list)
            .then((res) => { 
              this.setState({   
                loading : false     
              }) 
              if(res.status)
                {
                  createNotification('Updated','success','filled')
                  this.setTabvlaue(tabvalue,page,pageSize)
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
      else
      {
        
        createNotification('There is no Data to save','error','filled')
      }
    }
    onSubmitRecord(record)
    {
     
      record.updated_start_time = convertLocalToUTCDate(new Date())
      record.updated_end_time = convertLocalToUTCDate(new Date())

      auditallocationService.multiupdate_api([record])
        .then((res) => { 
         
          if(res.status)
            {
            
             
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
    handleChangeRegionFilter= (value) =>
    {
      this.setState({  region_filter: value,area_filter:[],area_data:[] })
      var ids = get_array_id(value)
      if(ids.length > 0)
      {
        this.fetcharea_multipleregionwise(ids)
      }
      
    }
    setTabvlaue(tab,page,pagesize)
    {
      this.setState({
        tabvalue:tab,
        is_summary:false,
      })
      const {region_filter,area_filter,document_id_filter,companycode_filter,username,
        scanlocation_filter,vendor_filter,document_number_filter,user_status} = this.state
      this.fetchPagination(page,pagesize,region_filter,area_filter,document_id_filter,companycode_filter,username,
      scanlocation_filter,vendor_filter,document_number_filter,user_status,tab)
    }
    setuserReport(user_status)
    {
      this.setState({
        user_status:user_status
      })
      const {region_filter,area_filter,document_id_filter,companycode_filter,username,
        scanlocation_filter,vendor_filter,document_number_filter,tabvalue} = this.state
     this.fetchPagination(1,25,region_filter,area_filter,document_id_filter,companycode_filter,username,
      scanlocation_filter,vendor_filter,document_number_filter,user_status,tabvalue)
    }
    setuserSummary()
    {

      const {region_filter,area_filter,document_id_filter,companycode_filter,username,
        scanlocation_filter,vendor_filter,document_number_filter,tabvalue} = this.state
      this.setState({is_summary:true,tabvalue:'',user_status:false})
      this.fetchPagination(1,25,region_filter,area_filter,document_id_filter,companycode_filter,username,
      scanlocation_filter,vendor_filter,document_number_filter,false,tabvalue)
    }
    ClearValue()
    {
      this.setState({
        region_filter:[],
        area_filter:[],
        username:'',
        companycode_filter:'',
        vendor_filter:'',
        document_number_filter:'',
        scanlocation_filter:'',
        document_id_filter:'',
        area_data:[],
        user_status:false,
        is_summary:false,
        is_submit_table:false,
        tabvalue:'total'
      })
    
      this.fetchPagination(1,25,[],[],'','','','','','',false,'total')
    }
    fetchPagination(page,per_page,region_filter,area_filter,document_id_filter,companycode_filter,username,
      scanlocation_filter,vendor_filter,document_number_filter,user_status,tabvalue)
    {
      const region = get_array_id(region_filter),
      area = get_array_id(area_filter),
      user_id = username !== "" ?  [username] : [] ,
      document_id  =document_id_filter !== '' ? [document_id_filter] :[],
      companycode  =companycode_filter !== '' ? [companycode_filter] :[], 
      document_number   =document_number_filter !== '' ? [document_number_filter] :[], 
      scanlocation   =scanlocation_filter !== '' ? [scanlocation_filter] :[],
      vendor   =vendor_filter !== '' ? [vendor_filter] :[],
      invoice_status=[]
     
       this.setState({
        loading : true,
         page:page,
         pageSize:per_page,
       })
       auditallocationService.filter_api(page,per_page,region,area,document_id,companycode,user_id,
        document_number,scanlocation,vendor,invoice_status,user_status,tabvalue)
         .then((res) => { 
           this.setState({   
             loading : false,
           })
           
           if(res.status)
             {
               this.setState({
                 all_data:res.data,
                 selectedRowKeys:[],
                 total:res.total,
                 total_count:res.totalcount,
                 pending_count:res.pending,
                 complete_count:res.completed,
                 summary_data:res.regionbased,
               })
               
             } 
             else{
               this.setState({
                 all_data:[],
                 total_count:0,
                  pending_count:0,
                  complete_count:0,
                  total:0,
                  summary_data:[],
                  selectedRowKeys:[]
               })
               createNotification(res.message,'error','filled')
             }             
       
       })
       .catch((error) => { 
         this.setState({
           loading : false
         })
         
       });
    }
    onSubmitFilter()
    {
      const { region_filter,area_filter,username,companycode_filter, vendor_filter,document_number_filter,
        scanlocation_filter,document_id_filter,user_status,tabvalue} = this.state
      var isfill = false
      if(region_filter.length > 0 || area_filter.length > 0 || username !== "" || 
        companycode_filter.length > 0 ||  vendor_filter.length > 0 || document_number_filter.length> 0 || 
        scanlocation_filter.length > 0 || document_id_filter.length > 0 )
      {
        isfill = true
      }
       if(isfill)
      {
        
       this.fetchPagination(1,25,region_filter,area_filter,document_id_filter,companycode_filter,username,
        scanlocation_filter,vendor_filter,document_number_filter,user_status,tabvalue)
        
      }
      else
      {
        
        createNotification('Please Choose any one details then can search','error','filled')
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
        const {region_filter,area_filter,document_id_filter,companycode_filter,username,
          scanlocation_filter,vendor_filter,document_number_filter,user_status,tabvalue} = this.state
       this.fetchPagination(page,pageSize,region_filter,area_filter,document_id_filter,companycode_filter,username,
        scanlocation_filter,vendor_filter,document_number_filter,user_status,tabvalue)
      },
      pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
      // total: this.state.total  ,
      showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total}`,
    };
    render()
    {
       const {match,locale,languageData} = this.props
        const {username,all_data,area_data,selectedRowKeys,region_data,is_submit_table,area_filter,region_filter,auditallocation,auditallocationlast,
          tabvalue,submit_column,area_all_data,column_value,open_popup,open_clear,open_clearall,open_movecomplete,user_data,loading,
          companycode_filter, vendor_filter,document_number_filter,scanlocation_filter,document_id_filter,
          user_status,is_summary,total_count,pending_count,complete_count} = this.state
          var columnsss = [],columndata = []
          const  column_data = [
            {
              title:onChangeLanguage(locale, 'ID',languageData),
              dataIndex: 'id',
              key: 'id',
              // sorter: (a, b) => (a.id != null ?
              //   a.id : "").localeCompare(b.id !== null ? 
              //   b.id : ""),
              //   sortDirections: ['descend', 'ascend'],
            },
            {
              title: onChangeLanguage(locale,'Document ID',languageData),
              dataIndex: 'document_id',
              key: 'document_id',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}    
                </div>),
                 sorter: (a, b) => (a.document_id != null ?
                  a.document_id : "").localeCompare(b.document_id !== null ? 
                  b.document_id : ""),
                  sortDirections: ['descend', 'ascend'],
             
            },
            {
              title:onChangeLanguage(locale,'VIM Processs Status Text',languageData) ,
              dataIndex: 'vimprocess',
              key: 'vimprocess',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}
                </div>),
                sorter: (a, b) => (a.vimprocess != null ?
                  a.vimprocess : "").localeCompare(b.vimprocess !== null ? 
                  b.vimprocess : ""),
                  sortDirections: ['descend', 'ascend'],
               
            },
            {
              title: onChangeLanguage(locale,'Scan Location',languageData),
              dataIndex: 'scanlocation',
              key: 'scanlocation',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}    
                </div>),
                sorter: (a, b) => (a.scanlocation != null ?
                  a.scanlocation : "").localeCompare(b.scanlocation !== null ? 
                  b.scanlocation : ""),
                  sortDirections: ['descend', 'ascend'],
            },
           
           
            {
              title:onChangeLanguage(locale,'Vendor',languageData) ,
              dataIndex: 'vendor',
              key: 'vendor',  render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}    
                </div>),
                sorter: (a, b) => (a.vendor != null ?
                  a.vendor : "").localeCompare(b.vendor !== null ? 
                  b.vendor : ""),
                  sortDirections: ['descend', 'ascend'],
                
            },
            {
              title: onChangeLanguage(locale,'Gross Invoice Amount',languageData),
              dataIndex: 'gross_invoice',
              key: 'gross_invoice',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}    
                </div>),
                sorter: (a, b) => (a.gross_invoice != null ?
                  a.gross_invoice : "").localeCompare(b.gross_invoice !== null ? 
                  b.gross_invoice : ""),
                  sortDirections: ['descend', 'ascend'],
            },
             
            {
              title:onChangeLanguage(locale,'Currency',languageData) ,
              dataIndex: 'document_currency',
              key: 'document_currency',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}    
                </div>),
                sorter: (a, b) => (a.document_currency != null ?
                  a.document_currency : "").localeCompare(b.document_currency !== null ? 
                  b.document_currency : ""),
                  sortDirections: ['descend', 'ascend'],
            },
            {
              title:onChangeLanguage(locale,'Company Code',languageData) ,
              dataIndex: 'companycode',
              key: 'companycode',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}
                   
                </div>),
                sorter: (a, b) => (a.companycode != null ?
                  a.companycode : "").localeCompare(b.companycode !== null ? 
                  b.companycode : ""),
                  sortDirections: ['descend', 'ascend'],
                
            },
            {
              title: onChangeLanguage(locale,'Document Number',languageData),
              dataIndex: 'document_number',
              key: 'document_number',
              sorter: (a, b) => (a.document_number != null ?
                a.document_number : "").localeCompare(b.document_number !== null ? 
                b.document_number : ""),
                sortDirections: ['descend', 'ascend'],
            },
            {
              title:onChangeLanguage(locale,'Posting Date',languageData) ,
              dataIndex: 'posting_date',
              key: 'posting_date',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                {(text !== null && text !== '') && moment(text).format('MM/DD/YYYY')}  
                </div>),
            },
                
            {
              title:onChangeLanguage(locale,'Last User',languageData) ,
              dataIndex: 'lastuser',
              key: 'lastuser',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}    
                </div>),
                sorter: (a, b) => (a.lastuser != null ?
                  a.lastuser : "").localeCompare(b.lastuser !== null ? 
                  b.lastuser : ""),
                  sortDirections: ['descend', 'ascend'],
            },
            {
              title:onChangeLanguage(locale,'User ID',languageData) ,
              dataIndex: 'user_id',
              key: 'user_id',
              render: (text, record,index) => ( 
                <div style = {{padding:'2px',width:'100px'}}>
                   {record.status === 0  ||  (text === null || text === "")?
                        <Select   className={is_submit_table === true && (text === '' || text === null)?  "error-border-select":"react-select fontstyle" }
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={user_data.filter(option =>option.value === text)}
                        options={user_data.filter(item => item.label !== "Select All")}
                        onChange={({value}) =>this.onChangeValue_row(value,record.id,'user_id')} /> :
                        text
                  }
   
              </div>),
              
            },
            {
              title: onChangeLanguage(locale,'Region',languageData),
              dataIndex: 'region',
              key: 'region',
              render: (text, record,index) => ( 
                <div style = {{padding:'2px',width:'100px'}}>
                   <Select  className={is_submit_table === true && (text === '' || text === null)?  "error-border-select":"react-select fontstyle" }
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
                  <Select   className={is_submit_table === true && (text === '' || text === null)?  "error-border-select":"react-select fontstyle" }
                      classNamePrefix="react-select"
                      name="form-field-name"
                      value={area_all_data.filter(option =>option.value === text)}
                      options={getAreaValue(area_all_data,record.region)}
                      onChange={({value}) =>this.onChangeValue_row(value,record.id,'area')} /> 
              
                </div>),
            },
           
            
          ];
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
             {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <title>{onChangeLanguage(locale,'Audit Allocation',languageData)}</title>
            <Row>
              <Colxx xxs="12">
              <div className = "row">
                      <div className = "col-md-4">
                      <Breadcrumb heading={onChangeLanguage(locale,'Audit Allocation',languageData)} match={match} />
                    </div>
                    <div className = "col-md-4" style = {{marginTop:'10px'}}>
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
                                        getDropdownButtonLabel={({ placeholderButtonLabel, value }) => { if(value.length===0) {return "Select.."; }else{ var item = value.filter(item=>item.label.includes('Select All')); if(item.length!==0){ return (value.length-1)+" selected";} else {return value.length+" selected";}  }}}
                                        />
                                  </div>
                                  </Colxx>
                                  <Colxx  xxs="12" className = "text-center">
                                    <Button color="primary" 
                                      className="mr-1 mb-2 button-width"
                                      id={`popover_0`}
                                      onClick={() => this.getData()} >{onChangeLanguage(locale,'Submit',languageData)}</Button>
                                    <Button color="secondary" 
                                      className="mr-1 mb-2 button-width"
                                      onClick={() => this.clearData('column',false) }>{onChangeLanguage(locale,'Clear',languageData)}</Button>
                                  </Colxx>
                                </Row>
                                </PopoverBody>
                              </Popover>
                          </span>
                           </li>
                           <li>
                           <Button className = "button-width" color="primary" style= {{width :'130px'}}>
                            <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
                            <a style= {{margin :'0px'}} > {onChangeLanguage(locale,'Upload',languageData)}</a>
                            <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                                className = "filepicker_customButton"
                                style = {{width : '130px',marginLeft :'-25%'}}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
                        </Button>
                           </li>
                        </ul>
                      
                       
                    </div>
                    <div className = "col-md-2">
                        <h2 style = {{marginTop:'15px'}}>Total EQ : {auditallocation}</h2>
                    </div>
                    <div className = "col-md-2">
                        <h2  style = {{marginTop:'15px'}}>Last EQ : {auditallocationlast}</h2>
                    </div>
                  </div>
               
               
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>

                    <div className = "row">
                            
                          
                            <div className = "col-lg-2-0 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Region',languageData)}</Label>
                                  <ReactMultiSelectCheckboxes  className = 'fontstyle' 
                                    value={region_filter}
                                    onChange={(option) =>this.handleChangeRegionFilter(option)}
                                    options={region_data.filter(item => item.label !== "Select All") }
                                    getDropdownButtonLabel={({ placeholderButtonLabel, value }) => { if(value.length==0) {return "Select.."; }else{ var item = value.filter(item=>item.label.includes('Select All')); if(item.length!=0){ return (value.length-1)+" selected";} else {return value.length+" selected";}  }}}
                                   />
                            </div>
                          
                            <div className = "col-lg-2-0 space-margin ">
                                <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'Area',languageData)}</Label>
                                 <ReactMultiSelectCheckboxes  className = 'fontstyle' 
                                    value={area_filter}
                                    onChange={(option)=>  this.setState({area_filter :option })}
                                    options={area_data.filter(item => item.label !== "Select All")}
                                    getDropdownButtonLabel={({ placeholderButtonLabel, value }) => { if(value.length==0) {return "Select.."; }else{ var item = value.filter(item=>item.label.includes('Select All')); if(item.length!=0){ return (value.length-1)+" selected";} else {return value.length+" selected";}  }}}
                                   />
                            </div>
                            <div className = "col-lg-2-0 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Company Code',languageData)}</Label>
                                
                                    <Input  className = "fontstyle text-background" 
                                      value = {companycode_filter}  
                                      onChange= {(e)=>this.setState({companycode_filter : e.target.value})} 
                                    />
                            </div>
                            <div className = "col-lg-2-0 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Document Id',languageData)}</Label>
                               
                                    <Input  className = "fontstyle text-background" 
                                      value = {document_id_filter}  
                                      onChange= {(e)=>this.setState({document_id_filter : e.target.value})} 
                                    />
                            </div>
                            <div className = "col-lg-2-0 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Vendor',languageData)}</Label>
                                    <Input  className = "fontstyle text-background" 
                                      value = {vendor_filter}  
                                      onChange= {(e)=>this.setState({vendor_filter : e.target.value})} 
                                    />
                                    
                            </div>
                            <div className = "col-lg-2-0 space-margin">

                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Document Number',languageData)}</Label>
                                    <Input  className = "fontstyle text-background" 
                                      value = {document_number_filter}  
                                      onChange= {(e)=>this.setState({document_number_filter : e.target.value})} 
                                    />
                                   
                            </div>
                            <div className = "col-lg-2-0 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Scan Location',languageData)}</Label>
                               
                                    <Input  className = "fontstyle text-background" 
                                      value = {scanlocation_filter}  
                                      onChange= {(e)=>this.setState({scanlocation_filter : e.target.value})} 
                                    />
                            </div>
                            <div className = "col-lg-2-0 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'User Name',languageData)}</Label>
                                <Input  className = "fontstyle text-background"  
                                    // placeholder = 'End date'
                                    value = {username}  
                                    onChange= {(e)=>this.setState({username : (e.target.value).toUpperCase()})} 
                                    />
                            </div>
                             <div className = "col-md-4" style = {{marginTop:'22px'}}>
                                  <Button 
                                  className = "button-width" color="primary"  
                                    onClick={()=>this.onSubmitFilter()}
                                      >
                                      {onChangeLanguage(locale,'Search',languageData)} 
                                  </Button>
                                   {/* {this.renderTemplate()} */}
                                    <Button className = "button-width" color="secondary" 
                                        onClick={()=>this.ClearValue()}
                                        >
                                      {onChangeLanguage(locale,'Refresh',languageData)} 
                                    </Button>
                             </div>
                          
                        </div>
               
                </div>

            <div>
            <div className = "publishuser-card-component" style = {{borderRadius:'10px'}}>
               <div className = "publish-title1" style = {{borderRadius:'10px 10px 0px 0px'}}>
                    <div className = "row">
                         <div className = "col-md-4 text-center" style = {{color:tabvalue === 'total' ? 'white' : 'rgb(255 255 255 / 70%)',cursor:'pointer'}}
                            onClick = {()=>this.setTabvlaue('total',1,25)}>
                              <a className = "fontstyle">{onChangeLanguage(locale,'Total Task',languageData)} ({onChangeLanguage(locale,'No. of Task',languageData)} - {total_count})</a>
                            </div>
                            <div className = "col-md-4 text-center" style = {{color:tabvalue === 'complete' ? 'white' : 'rgb(255 255 255 / 70%)',cursor:'pointer'}}
                            onClick = {()=>this.setTabvlaue('complete',1,25)}>
                              <a className = "fontstyle">{onChangeLanguage(locale,user_status === false?  'Allotted User': 'User Completed Task',languageData)} ({onChangeLanguage(locale,'No. of Task',languageData)} - {complete_count})</a>
                            </div>
                            <div className = "col-md-4 text-center" style = {{color:tabvalue === 'pending' ? 'white' : 'rgb(255 255 255 / 70%)',cursor:'pointer'}}
                            onClick = {()=>this.setTabvlaue('pending',1,25)}>
                              <a className = "fontstyle">{onChangeLanguage(locale,user_status === false? 'Pending Allotted User' : 'User Pending Task',languageData)} ({onChangeLanguage(locale,'No. of Task',languageData)} - {pending_count})</a>
                            </div>
                    </div>
                  </div>
                    <div style = {{backgroundColor :'rgb(239,100,50,0.3)'}}>
                          <div className = "row">
                            <div className = "col-md-3 text-center">
                                <span>
                                  <Row>
                                  <Colxx xxs="9"><a>{onChangeLanguage(locale,'User Status Report',languageData)}</a></Colxx>
                                  <Colxx xxs="2">
                                      <Switch
                                          id="tooltip_switch"
                                          disabled={is_summary === true}
                                          className="custom-switch custom-switch-secondary custom-switch-small"
                                          checked={user_status}
                                          onChange={()=>this.setuserReport(!user_status)}
                                        />
                                      </Colxx>
                                  </Row>      
                              </span>
                            </div>
                            <div className = "col-md-2 text-center">
                                <Button className = "button-width" color="secondary" style = {{width:'100%'}}
                                        onClick = {()=>this.openModal()}>
                                        {onChangeLanguage(locale,'Reassign',languageData)}   
                                </Button> 
                            </div>
                            {( tabvalue === 'pending'  || (tabvalue !== 'total' && tabvalue === 'complete'  && user_status === false)) &&
                              <div className = "col-md-1 text-center">
                                  {/* <Button className = "button-width" color="secondary"  style = {{width:'100%'}}
                                            onClick = {()=>this.onSubmitClear()}  >
                                            {onChangeLanguage(locale,'Clear',languageData)}   
                                      </Button>  */}
                                       <span>
                      <Button 
                        id="Clear"
                        className = "button-width" color="secondary"  style = {{width:'100%'}}
                                onClick={() => this.setState({open_clear:'Clear'})}
                              >{onChangeLanguage(locale,'Clear',languageData)}  
                              </Button>
                              <Popover
                                placement='bottom'
                                isOpen={open_clear === 'Clear'}
                                target="Clearall"
                                toggle={() =>  this.setState({open_clear:''})}
                              >
                                <PopoverBody>
                                <Row> 
                                <Colxx xxs="12">
                                  <div style = {{padding :'10px'}}>
                                      <Label className = "fontstyle">{onChangeLanguage(locale,'Are you sure to Clear?',languageData)}</Label> 
                                  </div>
                                  </Colxx>
                                <Colxx xxs="12">
                                    <Label className = "fontstyle" style = {{color:'red',cursor :'pointer',padding:'5px'}}  onClick = {() =>  this.closedate()}> 
                                    <i className = "simple-icon-close" style = {{position:'absolute',right:'10px',top:'-34px'}} /></Label> 
                                    
                                </Colxx>
                                  <Colxx  xxs="12" className = "text-center">
                                    <Button color="primary" 
                                      className="mr-1 mb-2 button-width"
                                      id={`popover_0`}
                                      onClick = {()=>this.onSubmitClear()} >{onChangeLanguage(locale,'YES',languageData)}</Button>
                                    <Button color="secondary" 
                                      className="mr-1 mb-2 button-width"
                                      onClick={() => this.clearData('Clear',false) }>{onChangeLanguage(locale,'NO',languageData)}</Button>
                                  </Colxx>
                                </Row>
                                </PopoverBody>
                              </Popover>
                              </span>
                              </div>
                            }
                             <div className = "col-md-2 text-center">
                               <span>
                             <Button 
                              id="Clearall"
                              className = "button-width" color="secondary"  style = {{width:'100%'}}
                                onClick={() => this.setState({open_clearall:'Clearall'})}
                              >{onChangeLanguage(locale,'Clear All',languageData)}  
                              </Button>
                              <Popover
                                placement='bottom'
                                isOpen={open_clearall === 'Clearall'}
                                target="Clearall"
                                toggle={() =>  this.setState({open_clearall:''})}
                              >
                                <PopoverBody>
                                <Row> 
                                <Colxx xxs="12">
                                  <div style = {{padding :'10px'}}>
                                      <Label className = "fontstyle">{onChangeLanguage(locale,'Are you sure to Clear All?',languageData)}</Label> 
                                  </div>
                                  </Colxx>
                                <Colxx xxs="12">
                                    <Label className = "fontstyle" style = {{color:'red',cursor :'pointer',padding:'5px'}}  onClick = {() =>  this.closedate()}> 
                                    <i className = "simple-icon-close" style = {{position:'absolute',right:'10px',top:'-34px'}} /></Label> 
                                    
                                </Colxx>
                                  <Colxx  xxs="12" className = "text-center">
                                    <Button color="primary" 
                                      className="mr-1 mb-2 button-width"
                                      id={`popover_0`}
                                      onClick = {()=>this.onSubmitClearAll()} >{onChangeLanguage(locale,'YES',languageData)}</Button>
                                    <Button color="secondary" 
                                      className="mr-1 mb-2 button-width"
                                      onClick={() => this.clearData('Clearall',false) }>{onChangeLanguage(locale,'NO',languageData)}</Button>
                                  </Colxx>
                                </Row>
                                </PopoverBody>
                              </Popover>
                              </span>
                            </div>
                            <div className = "col-md-2 text-center">
                                <Button className = "button-width" color="secondary"  style = {{width:'100%'}}
                                    onClick = {()=>this.setuserSummary()}  >
                                    {onChangeLanguage(locale,'Summary',languageData)}  
                                  </Button> 
                            </div>
                            {((tabvalue === 'pending' && user_status === true) || (tabvalue === 'complete' && user_status === false)) && 
                              <div className = "col-md-2 text-center">
                                {/* <Button className = "button-width" color="secondary"  style = {{width:'100%'}}
                                      onClick = {()=>this.onSubmitData()}  >
                                      {onChangeLanguage(locale,'Move Complete',languageData)}  
                                    </Button> */}
                                     <span>
                      <Button 
                        id="movecomplete"
                        className = "button-width" color="secondary"  style = {{width:'100%'}}
                                onClick={() => this.setState({open_movecomplete:'movecomplete'})}
                              >{onChangeLanguage(locale,'Move Complete',languageData)}  
                              </Button>
                              <Popover
                                placement='bottom'
                                isOpen={open_movecomplete === 'movecomplete'}
                                target="movecomplete"
                                toggle={() =>  this.setState({open_movecomplete:''})}
                              >
                                <PopoverBody>
                                <Row> 
                                <Colxx xxs="12">
                                  <div style = {{padding :'10px'}}>
                                      <Label className = "fontstyle">{onChangeLanguage(locale,'Are you sure to Move Complete?',languageData)}</Label> 
                                  </div>
                                  </Colxx>
                                <Colxx xxs="12">
                                    <Label className = "fontstyle" style = {{color:'red',cursor :'pointer',padding:'5px'}}  onClick = {() =>  this.closedate()}> 
                                    <i className = "simple-icon-close" style = {{position:'absolute',right:'10px',top:'-34px'}} /></Label> 
                                    
                                </Colxx>
                                  <Colxx  xxs="12" className = "text-center">
                                    <Button color="primary" 
                                      className="mr-1 mb-2 button-width"
                                      id={`popover_0`}
                                      onClick = {()=>this.onSubmitData()} >{onChangeLanguage(locale,'Yes',languageData)}</Button>
                                    <Button color="secondary" 
                                      className="mr-1 mb-2 button-width"
                                      onClick={() => this.clearData('movecomplete',false) }>{onChangeLanguage(locale,'NO',languageData)}</Button>
                                  </Colxx>
                                </Row>
                                </PopoverBody>
                              </Popover>
                              </span>
                              </div>
                            }
                           
                          </div>
                    </div>
                   
                  {is_summary === true ? 
                    <div style = {{padding :'10px'}}>
                          {this.renderSummary()}
                    </div> :
                     <div style = {{padding :'10px',width:'100%',overflow:'auto'}}>
                     {columnsss.length > 0 && 
                         <Table                 
                           columns={columnsss}
                           rowSelection={rowSelection}
                           pagination = {pagination}
                           dataSource={all_data} 
                           rowKey="id"
                           rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}/>
       
                         }  
                     
                   </div>  

                    }  
             </div>
            </div>
            {this.renderModal()}
          </>
        )
    }
    getregionCount(subarray,key)
    {

      var count = 0;
      if(subarray && subarray !== null)
      {
        for(var i = 0;i<subarray.length;i++)
        {
          const value = subarray[i][key] !== null && subarray[i][key]!== '' ?subarray[i][key] : 0
          count = count + parseInt(value)
        }
      }
     

      return count
    }
    getregiontotal(subarray)
    {
     const users_count =  this.getregionCount(subarray,'users_count')
     const unassigned_count =  this.getregionCount(subarray,'unassigned_count')
     var count = 0
     if(users_count !== 0 || unassigned_count !== 0)
     {
      count = ( parseFloat(users_count)/(parseFloat(users_count) + parseFloat(unassigned_count))) * 100
      count = parseFloat(count).toFixed(2)
     }
     if(count === 'NaN')
     {
      count = 0
     }

     return count + ' %'
   
    }
    getareatotal(users_count,unassigned_count)
    {
     var count = 0
     if(users_count !== 0 || unassigned_count !== 0)
     {
      count = (parseFloat(users_count) /(parseFloat(users_count) + parseFloat(unassigned_count)) ) * 100
      count = parseFloat(count).toFixed(2)
     }
     if(count === 'NaN')
     {
      count = 0
     }

     return count + ' %'
   
    }
    
    renderSummary()
    {
      const {summary_data} = this.state
      const {locale,languageData} = this.props
      return(
        <div className = "row">
            {summary_data && summary_data.map((value,index) =>
                <div className = "col-md-4">
                     <div  className = "publish-title2" style = {{fontSize:'10px'}}>
                         <Row>
                          <Colxx xxs="2">
                          {onChangeLanguage(locale,'Name',languageData)}    
                          </Colxx>
                          <Colxx xxs="2">
                          {onChangeLanguage(locale,'Total',languageData)}    
                            </Colxx>
                            <Colxx xxs="2">
                            {onChangeLanguage(locale,'Assign',languageData)}    
                            </Colxx>
                            <Colxx xxs="2">
                            {onChangeLanguage(locale,'Not Assign ',languageData)}    
                            </Colxx>
                            <Colxx xxs="2">
                            {onChangeLanguage(locale,'Com. User',languageData)}    
                            </Colxx>
                            <Colxx xxs="2">
                            {onChangeLanguage(locale,'Pen. User',languageData)}    
                            </Colxx>
                        </Row>
                        </div>
                        <div  className = "publish-title1"  style = {{fontSize:'10px'}}>
                        <Row>
                          <Colxx xxs="2">
                          {value.name}   
                          </Colxx>
                            <Colxx xxs="2"> 
                                {this.getregiontotal(value.subarray)}
                            </Colxx>
                            <Colxx xxs="2">
                            {this.getregionCount(value.subarray,'users_count')}   
                            </Colxx>
                             <Colxx xxs="2">
                            {this.getregionCount(value.subarray,'unassigned_count')}   
                            </Colxx>
                             <Colxx xxs="2">
                            {this.getregionCount(value.subarray,'completed_count')}   
                            </Colxx>
                             <Colxx xxs="2">
                            {this.getregionCount(value.subarray,'pending_count')}   
                            </Colxx>
                        </Row>
                                 
                        </div>
                        {value.subarray && value.subarray.length > 0 &&
                            <div className= 'publish-title3' style = {{border:'1px solid gray',marginBottom:'10px',fontSize:'10px'}}>
                            { value.subarray.map((item,index) =>
                              <div >
                                <Row>
                                  <Colxx xxs="2">
                                  {item.name}   
                                  </Colxx>
                                  <Colxx xxs="2">
                                    {this.getareatotal(item.users_count,item.unassigned_count)}
                                    </Colxx>
                                    <Colxx xxs="2">
                                    {item.users_count !== '' && item.users_count !== null ? item.users_count : '0'}   
                                    </Colxx>
                                    <Colxx xxs="2">
                                    {item.unassigned_count}
                                      </Colxx>
                                      <Colxx xxs="2">
                                      {item.completed_count}    
                                      </Colxx>
                                      <Colxx xxs="2">
                                      {item.pending_count}    
                                      </Colxx>
                                </Row>
                                
                              </div>
                            )}   
                            </div>

                        }
                       
                </div>
            )}   
        </div>
      )
    }
    getPercentage(listdata,key1,key2,keyvalue)
    {
      let name = '0'
      console.log("kjvkhj" , JSON.stringify(listdata))
      console.log("kjvkhj" , JSON.stringify(keyvalue))
      for (let i = 0; i < listdata.length; i++) {
        if(listdata[i][key1] === keyvalue){
          name = listdata[i][key2]
        }
      }
      return name
    }
    handleChangeRegion= (value) =>
    {
      const {region_data,region} = this.state

      var value = getoptionvalue(value,region_data,region)
      this.setState({
        region :value,
        area:[],area_data:[]
      })
      var ids = get_array_id(value)
      if(ids.length > 0)
      {
        this.fetcharea_multipleregionwise(ids)
      }
    }
    handleChangeArea= (value) =>
    {
      const {area_data,area} = this.state

      var value = getoptionvalue(value,area_data,area)
      this.setState({
        area :value,
      })
    }
    
    handleChangeuser= (value) =>
    {
      const {user_data,user} = this.state
        this.setState({
          user :getoptionvalue(value,user_data,user)
        })
    }
    onSubmit()
    {
      const { file,no_of_task,region,area,user,is_reassign} = this.state
        var is_fill = true
        if(file === null && is_reassign !== true)
        {
          is_fill = false
        }
      if(is_fill === true && no_of_task !== '' && region.length > 0 && area.length > 0 && user.length > 0)
      {
        if(parseInt(no_of_task) > 0)
        {
          var userarray = get_array_id(user),
          area_id = get_array_id(area)
          var regionss = get_array_id(region) 
          const {username} = this.props
          if(is_reassign === true)
          {
            this.reassign_User(userarray,regionss,area_id,parseInt(no_of_task),username)
          }
          else
          {
            this.fileUpload(file,userarray,regionss,area_id,parseInt(no_of_task),username)
          }
        
        }
        else
        {
          createNotification('Please fill No of task above 0','error','filled')
        }
      
        
      }
      else
      {
        this.setState({
          is_submit:true
        })
        createNotification('Please fill mandatory field','error','filled')
      }

      
    }
    reassign_User(userarray,regionss,area_id,no_of_task,username)
    {
     
          this.setState({
            loading : true
          })
          this.closeModal()
          auditallocationService.reassign_api(userarray,regionss,area_id,no_of_task,username)
            .then((res) => { 
              this.setState({   
                loading : false     
              }) 
              if(res.status)
                {
                  createNotification('Updated','success','filled')
                 
                  this.ClearValue()
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
    fileUpload(file,userarray,regionss,area_id,no_of_task,username)
    {
      this.closeModal()
      auditallocationService.fileUpload(file,userarray,regionss,area_id,no_of_task,username)
        .then((res) => { 
          if(res.status)
            {
              if(res.data.status)
              {
                createNotification('Uploaded','success','filled')
                this.ClearValue()
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
    closeModal()
    {
      this.setState({
        area_data:[],
        area:[],
        user:[],
        region:[],
        no_of_task:'',
        file:null,
        is_submit:false,
        modalOpen:false,
        is_reassign:false
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
  
    renderModal()
    {
      const {locale,languageData} = this.props
        const {modalOpen,region_data,area_data,region,area,user,user_data,
          is_submit,no_of_task} = this.state
        return (
            <Modal
              isOpen={modalOpen}
              toggle={()=>this.closeModal()}
              wrapClassName="modal-right"
              backdrop="static"
            >
              <ModalHeader className = "fontstyle"  toggle={()=>this.closeModal()}>
              {onChangeLanguage(locale,'Upload Task',languageData)}
              </ModalHeader>
              <ModalBody>
                         <Row>
                                <Colxx xxs="4"><Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Region',languageData)}<a style = {{color :'red'}}>*</a></Label></Colxx>
                                <Colxx xxs="8">

                                 <ReactMultiSelectCheckboxes  className = 'fontstyle' 
                                    value={region}
                                    onChange={this.handleChangeRegion}
                                    options={region_data}
                                    getDropdownButtonLabel={({ placeholderButtonLabel, value }) => { if(value.length==0) {return "Select.."; }else{ var item = value.filter(item=>item.label.includes('Select All')); if(item.length!=0){ return (value.length-1)+" selected";} else {return value.length+" selected";}  }}}
                                   />
                                </Colxx>
                                
                              
                            </Row><br></br>
                          
                            <Row>
                                <Colxx xxs="4"><Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'Area',languageData)}<a style = {{color :'red'}}>*</a></Label></Colxx>
                                <Colxx xxs="8">
                               
                                <ReactMultiSelectCheckboxes  className = 'fontstyle' 
                                        value={area}
                                        onChange={this.handleChangeArea}
                                        options={area_data}
                                        getDropdownButtonLabel={({ placeholderButtonLabel, value }) => { if(value.length==0) {return "Select.."; }else{ var item = value.filter(item=>item.label.includes('Select All')); if(item.length!=0){ return (value.length-1)+" selected";} else {return value.length+" selected";}  }}}
                                        />
                                </Colxx>
                                
                                    
                            </Row><br></br>
                            <Row >
                                 <Colxx xxs="4"> <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'User',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                  <br></br>  {is_submit === true && get_array_id(user).length === 0 &&   
                                    <p1 className = 'fontstyle mandatory-label'> 
                                    {onChangeLanguage(locale,'Mandatory Field',languageData)} 
                                    </p1>}
                                </Colxx>
                                <Colxx xxs="8">
                               
                                    <ReactMultiSelectCheckboxes  className = 'fontstyle' 
                                    value={user}
                                    onChange={this.handleChangeuser}
                                    options={user_data}
                                    getDropdownButtonLabel={({ placeholderButtonLabel, value }) => { if(value.length==0) {return "Select.."; }else{ var item = value.filter(item=>item.label.includes('Select All')); if(item.length!=0){ return (value.length-1)+" selected";} else {return value.length+" selected";}  }}}
                                   />
                                  
                                </Colxx>
                           
                           
                            </Row> <br></br>
                            <Row >
                                 <Colxx xxs="4"> <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Allocated Percentage',languageData)}<a style = {{color :'red'}}>*</a></Label></Colxx>
                                <Colxx xxs="8">
                                <Input  className = {is_submit === true && no_of_task === ''?  "error-border":"fontstyle text-background" } 
                                     type = "number" min="0"  step='1'
                                     placeholder = ''
                                     onKeyDown={this.handleKeypress}
                                    value = {no_of_task}  
                                    onChange= {(e)=>this.setState({no_of_task : e.target.value})} 
                                    />
                                </Colxx>
                           
                           
                            </Row> <br></br>
                            <Row className = "text-center">
                                <Button className = "button-width" color="secondary"
                                onClick = {()=>this.onSubmit()}>
                                  {onChangeLanguage(locale,'Submit',languageData)}   
                                </Button>
                            </Row>
                          
              </ModalBody>
             
            </Modal>
          );
    }
    renderTemplate()
    {
      const {languageData,locale} = this.props
      const {all_data,region_data,area_all_data} = this.state
      var array = all_data.map(record=> {
            return {
                "Document ID": record.document_id,
                "VIM Processs Status Text": record.vimprocess,
                "Scan Location":record.scanlocation,
                "Vendor":record.vendor,
                "Gross Invoice Amount":record.gross_invoice,
                "Document Currency": record.document_currency,
                "Company Code":record.companycode,
                "Document Number":record.document_number,
                "Posting Date":record.posting_date,
                "Last User":record.lastuser,
                "User ID": record.user_id,
                "Region":getValue(region_data,'value','label',record.region) ,
                "Area":getValue(area_all_data,'value','label',record.area), 
                
          };
        })
        return(
          
          <Workbook filename="Invoice Processing - Input.xlsx" element={
            <Button style={{width:'150px'}} className = "button-width" color="secondary">
                {onChangeLanguage(locale,'Raw Data',languageData)} 
            </Button>
            }>
            <Workbook.Sheet data={array} name="Sheet A">
              <Workbook.Column label="Document ID" value="Document ID"/>
              <Workbook.Column label="VIM Processs Status Text" value="VIM Processs Status Text"/>
              <Workbook.Column label="Scan Location" value="Scan Location"/>
              <Workbook.Column label="Vendor" value="Vendor"/>
              <Workbook.Column label="Gross Invoice Amount" value="Gross Invoice Amount"/>
              <Workbook.Column label="Document Currency" value="Document Currency"/>
              <Workbook.Column label="Company Code" value="Company Code"/>
              <Workbook.Column label="Document Number" value="Document Number"/>
              <Workbook.Column label="Posting Date" value="Posting Date"/>
              <Workbook.Column label="Last User" value="Last User"/>
              <Workbook.Column label="User ID" value="User ID"/>
              <Workbook.Column label="Region" value="Region"/>
              <Workbook.Column label="Area" value="Area"/>
            </Workbook.Sheet> 
          </Workbook>
       
  
        );
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


