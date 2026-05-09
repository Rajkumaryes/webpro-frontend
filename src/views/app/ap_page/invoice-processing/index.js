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
import moment from 'moment';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import {onChangeLanguage,get_array_id,getValue,convertLocalToUTCDate,
  removeNullvalue,permittedadmin,getAreaValue} from '../../../../helper'
import{regionsService} from '../../../../redux/ap/region/saga'
import{areasService} from '../../../../redux/ap/area/saga'
import{invoiceService} from '../../../../redux/ap/invoice/saga'
import{userService} from '../../../../redux/users/saga'
import{standardcommentService} from '../../../../redux/ap/standardcomment/saga'
import{invoiceallocationService} from '../../../../redux/ap/invoiceallocation/saga'
import * as clipboard from "clipboard-polyfill/text";
import Workbook from 'react-excel-workbook'
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../constants/defaultValues';


class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedRowKeys: [],
        loading:false,
        tabvalue:'total',
        all_data:[],
        modalOpen:false,
        columndata:[],
        column_value:[],
        open_popup: '',
        submit_column:false,
        region_data:[],
        area_data:[],
        area_all_data:[],
        user_data:[],
        invoice_status_data:[],
        standard_comments_data:[],
        region:'',
        area:'',
        invoice_statuss:'',
        user:[],
        file:null,
        no_of_task:'',
        is_submit:false,
        selected_id: -1,
        is_submit_table:false,
        area_filter:[],
        region_filter:[],
        companycode_filter:'',
        vendor_filter:'',
        reference_filter:'',
        scanlocation_filter:'',
        document_id_filter:'',
        is_admin:false,

        page:1,
        pageSize:25,
        total :0,
        total_count :0,
        pending_count :0,
        complete_count :0,
      };
    }
    componentDidMount()
    {
      
      this.fetchregion() 
      this.fetcharea() 
      this.fetchuser()
      this.fetchStandardComments()
      this.fetchinvoice()
      this.ClearValue()
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
                area_all_data :  regionlist,
                })
             }
             
             })
             .catch((error) => {  this.setState({loading:false})}); 
 }  
   fetchStandardComments() {
    this.setState({loading:true})
    standardcommentService.fetchapi()
    .then((res) => {
      this.setState({loading:false})
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                standard_comments_data :  regionlist,
                })
             }
             
             })
             .catch((error) => {  this.setState({loading:false})}); 
 }  
   fetchinvoice() {
    this.setState({loading:true})
    invoiceService.fetchapi()
    .then((res) => {
      this.setState({loading:false})
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1 && item.invoice_type === 'Invoice Processing' )
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                invoice_status_data :  regionlist,
                })
             }
             
             })
             .catch((error) => {  this.setState({loading:false})}); 
 }  
   fetcharea_regionwise(region) {
    this.setState({loading:true})
    areasService.fetchapiRegionWise(region)
    .then((res) => {
       if(res.status)   {
        this.setState({loading:false}) 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                area_data :  regionlist,
                })
             }
             
             })
             .catch((error) => { this.setState({loading:false}) }); 
  } 
  fetcharea_multipleregionwise(ids) {
    this.setState({loading:true})
    areasService.fetchapiMultipleRegionWise(ids)
    .then((res) => {
       if(res.status)   {
        this.setState({loading:false}) 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                area_data :  regionlist,
                })
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
    onPaste() 
    {
        navigator.clipboard.readText().then((text)=>{
            console.log("lkbkjj" , text)
            console.log("lkbkjj" ,typeof text)
          
        })
    }
    onCopy()
    {
      
      const {all_data,standard_comments_data,invoice_status_data,selectedRowKeys,column_value,
        region_data,area_all_data} = this.state
      if(all_data.length > 0)
      {
        var array = all_data.map(record=> {
                    return {
                         "ID": record.id,
                        "VIM Processs Status Text": record.vimprocess,
                        "Company Code":record.companycode,
                        "Document ID": record.document_id,
                        "Vendor":record.vendor,
                        "Vendor Name": record.vendor_name,
                        "Reference":record.reference,
                        "Gross Invoice Amount":record.gross_invoice,
                        "Document Currency": record.document_currency,
                        "Scan Location":record.scanlocation,
                        "Update Date":record.update_date,
                        "Update Time":record.update_time,
                        "Current Role":record.current_role,
                        "Additional Comment": record.additional_comment,
                        "User ID": record.user_id,
                        "Region":getValue(region_data,'value','label',record.region) ,
                        "Area":getValue(area_all_data,'value','label',record.area) ,
                        "Invoice Status":getValue(invoice_status_data,'value','label',record.invoice_status) ,
                        "Forwarded To":record.forwarded_to,
                        "Description": record.description,
                        "Standard Comments":getValue(standard_comments_data,'value','label',record.standard_comments), 
                        "GSC Process Date": record.gscprocess_date,
                        "GSC Process Time": record.gscprocess_time,
                  };
                })
       var header = Object.keys(array[0])
        if(selectedRowKeys.length > 0)
        {
          var Copy_str = ""
          var value = [...this.GetCopyValue(array)]
         
          if(column_value.length > 0)
          {
          
            for(var i = 0 ; i <column_value.length;i++)
            {
              Copy_str  = Copy_str + column_value[i].value + (i ===  (column_value.length -1) ? '\r\n' :  '\t')
            }
            for(var i = 0 ; i <value.length;i++)
            {
              for(var j = 0 ; j <column_value.length;j++)
              {
                Copy_str  = Copy_str + removeNullvalue(value[i][column_value[j].value]) + (j ===  (column_value.length -1) ? '\r\n' :  '\t')
                
              }
             
            }
          }
          else
          {
           
          
            for(var i = 0 ; i <header.length;i++)
            {
              Copy_str  = Copy_str + header[i] + (i ===  (header.length -1) ? '\r\n' :  '\t')
            }
            for(var i = 0 ; i <value.length;i++)
            {
              for(var j = 0 ; j <header.length;j++)
              {
                Copy_str  = Copy_str + removeNullvalue(value[i][header[j]]) + (j ===  (header.length -1) ? '\r\n' :  '\t')
              }
             
            }
                

          }
          clipboard.writeText(Copy_str)
          createNotification('Copied Success','success','filled')
        }
        else
        {
          createNotification('Please Select the Row','error','filled')
        }
       
      
     } 
     else
     {
        createNotification('There is No Data to Copy','error','filled')
     }
    }
    
    GetCopyValue(all_data)
    {
      const {selectedRowKeys} = this.state
      var list = []
      for(var i = 0 ; i <all_data.length;i++)
      {
        for(var j = 0 ; j <selectedRowKeys.length;j++)
        {
          if(selectedRowKeys[j] === all_data[i].ID)
          {
            list.push(all_data[i])
          }
          
        }
      }

      return  list
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
    onKeyDownValue_row(e,record,key)
      { 
       
        var code = e.keyCode || e.which;
            if (code === 9) 
           {
              if(record[key] !== '')
             {
              this.onSubmitData(record,false)
             
            }
         }
      }
      onKeyPressValue_row(e,record,key)
      { 
       
        if (e.key == 'Enter') {
          console.log('test');
          if(record[key] !== '')
          {
            this.onSubmitData(record,false)
           
          }
        }
      }
  
    onChangeValue_row(value,id,key)
    { 
      const data = [...this.state.all_data]
      const index = data.findIndex(x => x.id === id)
        if(index >= 0)
        {
          data[index][key] = value
          this.setState({
            all_data:data
          })
          if(key === 'invoice_status' || key === 'standard_comments')
          {
            this.onSubmitData(data[index],false)
          }
          
        }
    }
    onSubmitData(record,is_submit)
    {
      const {tabvalue,invoice_status_data,page,pageSize} = this.state
      var is_fill = true
      if(is_submit === true)
      {
        if(record.invoice_status === null || record.invoice_status === ""
        || record.region === null || record.region === ""
        || record.area === null || record.area === "")
        {
          is_fill = false
          
        }
        const invoice_status = getValue(invoice_status_data,'value','label',record.invoice_status)
        if(invoice_status === 'Forwarded' || invoice_status === 'Deleted' || invoice_status === 'Hold')
        {
          if( record.standard_comments === null || record.standard_comments === "")
          {
            is_fill = false
          }
        }
      }
     
      if(is_fill === true)
      {       
        record.gscprocess_date = moment(new Date()).format('MM/DD/YYYY')
        record.gscprocess_time = moment(new Date()).format('hh:mm:ss a')
        if(is_submit === true)
        {
          record.updated_start_time = convertLocalToUTCDate(new Date())
          record.updated_end_time = convertLocalToUTCDate(new Date())
          record.user_status = 1
          record.status = 1
        }
        this.setState({
          selected_id:-1,
          is_submit_table:false
        })
        invoiceallocationService.multiupdate_api([record])
          .then((res) => { 
            
            if(res.status)
              {
                if(is_submit === true)
                {
                 createNotification('Updated','success','filled')
                 this.setTabvlaue(tabvalue,page,pageSize)
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
          selected_id:record.id,
          is_submit_table:true
        })
        createNotification('Please fill mandatory field','error','filled')
      }    
       
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
    onSubmitClear()
    {
      const { selectedRowKeys,page,pageSize,region_filter,area_filter,companycode_filter, vendor_filter,reference_filter,
        scanlocation_filter,document_id_filter,invoice_statuss,tabvalue} = this.state
      if(selectedRowKeys.length > 0 )
      {
          this.setState({
            loading : true
          })
          invoiceallocationService.clear_api(selectedRowKeys)
            .then((res) => { 
              this.setState({   
                loading : false     
              }) 
              if(res.status)
                {
                  createNotification('Updated','success','filled')
              
                 this.fetchPagination(page,pageSize,region_filter,area_filter,document_id_filter,companycode_filter,
                  reference_filter,scanlocation_filter,vendor_filter,invoice_statuss,tabvalue)
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
    setTabvlaue(tab,page,pagesize)
    {
      const {region_filter,area_filter,companycode_filter, vendor_filter,reference_filter,
        scanlocation_filter,document_id_filter,invoice_statuss} = this.state
      this.setState({
        tabvalue:tab
      })
     
     this.fetchPagination(page,pagesize,region_filter,area_filter,document_id_filter,companycode_filter,
      reference_filter,scanlocation_filter,vendor_filter,invoice_statuss,tab)
    }
   
    ClearValue()
    {
      this.setState({
        region_filter:[],
        area_filter:[],
        companycode_filter:'',
        vendor_filter:'',
        reference_filter:'',
        scanlocation_filter:'',
        document_id_filter:'',
        area_data:[],
        invoice_statuss:'',
        selectedRowKeys:[],
        selected_id:-1,
        is_submit_table:false,
        tabvalue:'total'
      })
      this.fetchPagination(1,25,[],[],'','','','','','','total')
    }
    fetchPagination(page,per_page,region_filter,area_filter,document_id_filter,companycode_filter,reference_filter,
      scanlocation_filter,vendor_filter,invoice_statuss,tabvalue)
    {
      const {username} = this.props
      const region =get_array_id(region_filter),
      area = get_array_id(area_filter),
      document_id  = document_id_filter !== '' ? [document_id_filter] :[],
      companycode  = companycode_filter !== '' ? [companycode_filter] :[], 
      user_id = [username] ,
      invoice_status=invoice_statuss !== '' ? [invoice_statuss] :[],
      reference   =reference_filter !== '' ? [reference_filter] :[], 
      scanlocation   =scanlocation_filter !== '' ? [scanlocation_filter] :[], 
      vendor   =vendor_filter !== '' ? [vendor_filter] :[]
      
       this.setState({
         loading : true,
         page:page,
         pageSize:per_page,
       })
       invoiceallocationService.filter_api(page,per_page,region,area,document_id,companycode,user_id,reference,scanlocation,vendor,invoice_status,true,tabvalue)
         .then((res) => { 
           this.setState({   
             loading : false     
           }) 
           if(res.status)
             {
               var list  = res.data.filter(item => item.is_delete === 0)
               this.setState({
                 all_data:list,
                 selectedRowKeys:[],
                 total:res.total,
                 total_count:res.totalcount,
                 pending_count:res.pending,
                 complete_count:res.completed,
               })
             } 
             else{
               this.setState({
                 all_data:[],
                 selectedRowKeys:[],
                 total_count:0,
                 pending_count:0,
                 complete_count:0,
                 total:0,
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
      const { page,pageSize, region_filter,area_filter,companycode_filter, vendor_filter,reference_filter,scanlocation_filter,document_id_filter,
        invoice_statuss,user_status,tabvalue} = this.state
       
  
      var isfill = false
      if(region_filter.length > 0 || area_filter.length > 0 || invoice_statuss !== '' ||
        companycode_filter.length > 0 ||  vendor_filter.length > 0 || reference_filter.length> 0 || 
        scanlocation_filter.length > 0 || document_id_filter.length > 0 )
      {
        isfill = true
      }
       if(isfill)
      {
        
        
       this.fetchPagination(page,pageSize,region_filter,area_filter,document_id_filter,companycode_filter,
        reference_filter,scanlocation_filter,vendor_filter,invoice_statuss,tabvalue)
        
      }
      else
      {
        
        createNotification('Please Choose any one details then can search','error','filled')
      }
    
    }
    onSelectChange = selectedRowKeys => {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.setState({ selectedRowKeys });
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
        const {region_filter,area_filter,companycode_filter, vendor_filter,reference_filter,
          scanlocation_filter,document_id_filter,invoice_statuss,tabvalue} = this.state
       this.fetchPagination(page,pageSize,region_filter,area_filter,document_id_filter,companycode_filter,
        reference_filter,scanlocation_filter,vendor_filter,invoice_statuss,tabvalue)
      },
      pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
      // total: this.state.total  ,
      showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total}`,
    };
    render()
    {
       const {match,locale,languageData} = this.props
        const {all_data,area_data,region_data,selectedRowKeys,is_submit_table,area_filter,region_filter,invoice_statuss,
          tabvalue,submit_column,invoice_status_data,column_value,open_popup,standard_comments_data,loading,
          companycode_filter, vendor_filter,reference_filter,scanlocation_filter,document_id_filter,
          selected_id,total_count,pending_count,complete_count,area_all_data} = this.state
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
              title: onChangeLanguage(locale,'Vendor Name',languageData),
              dataIndex: 'vendor_name',
              key: 'vendor_name',
              render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),
              sorter: (a, b) => (a.vendor_name != null ?
                a.vendor_name : "").localeCompare(b.vendor_name !== null ? 
                b.vendor_name : ""),
                sortDirections: ['descend', 'ascend'], 
            },
            {
              title: onChangeLanguage(locale,'Reference',languageData),
              dataIndex: 'reference',
              key: 'reference',
              render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),
              sorter: (a, b) => (a.reference != null ?
                a.reference : "").localeCompare(b.reference !== null ? 
                b.reference : ""),
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
              title:onChangeLanguage(locale,'Document Currency',languageData) ,
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
              title:onChangeLanguage(locale,'Update Date',languageData) ,
              dataIndex: 'update_date',
              key: 'update_date',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {(text !== null && text !== '') && moment(text).format('MM/DD/YYYY')}  
                </div>),
                sorter: (a, b) => (a.update_date != null ?
                  a.update_date : "").localeCompare(b.update_date !== null ? 
                  b.update_date : ""),
                  sortDirections: ['descend', 'ascend'], 
            },
            {
              title:onChangeLanguage(locale,'Update Time',languageData) ,
              dataIndex: 'update_time',
              key: 'update_time',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}    
                </div>),
                sorter: (a, b) => (a.update_time != null ?
                  a.update_time : "").localeCompare(b.update_time !== null ? 
                  b.update_time : ""),
                  sortDirections: ['descend', 'ascend'], 
            },
            {
              title:onChangeLanguage(locale,'Current Role',languageData),
              dataIndex: 'current_role',
              key: 'current_role',
               render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),
              sorter: (a, b) => (a.current_role != null ?
                a.current_role : "").localeCompare(b.current_role !== null ? 
                b.current_role : ""),
                sortDirections: ['descend', 'ascend'], 
            },  

             {
              title:onChangeLanguage(locale,'Additional Comment',languageData) ,
              dataIndex: 'additional_comment',
              key: 'additional_comment',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}    
                </div>),
            },
             
            {
              title: onChangeLanguage(locale,'User ID',languageData),
              dataIndex: 'user_id',
              key: 'user_id',
              render: (text, record,index) => ( 
                <div style = {{padding:'2px',width:'100px'}}>
                  {text}
    
              </div>),
              
            },
            {
              title: onChangeLanguage(locale,'Region',languageData),
              dataIndex: 'region',
              key: 'region',
              render: (text, record,index) => ( 
                <div style = {{padding:'2px',width:'100px'}}>
                   {getValue(region_data,'value','label',text)}
                </div>),
            },
            {
              title:onChangeLanguage(locale,'Area',languageData) ,
              dataIndex: 'area',
              key: 'area',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                    {getValue(area_all_data,'value','label',text)}
                   
              
                </div>),
            },
            {
              title:onChangeLanguage(locale,'Invoice Status',languageData) ,
              dataIndex: 'invoice_status',
              key: 'invoice_status',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                   {  tabvalue !== 'complete' ?
                    <Select   className={(is_submit_table === true && selected_id === record.id) && (text === '' || text === null)?  "error-border-select":"react-select fontstyle" }
                      classNamePrefix="react-select"
                      name="form-field-name"
                      value={invoice_status_data.filter(option =>option.value === text)}
                      options={invoice_status_data}
                      onChange={({value}) =>this.onChangeValue_row(value,record.id,'invoice_status')} />
                      : getValue(invoice_status_data,'value','label',text)
                    }
                </div>),
            },
            {
              title: onChangeLanguage(locale,'Forwarded To',languageData),
              dataIndex: 'forwarded_to',
              key: 'forwarded_to',
              render: (text, record,index) => ( 
                <div style = {{padding:'2px',width:'100px'}}>
                   {  tabvalue !== 'complete' ?
                  <Input  className = "fontstyle" 
                    value = {text}  
                    onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'forwarded_to')} 
                    onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'forwarded_to')}
                    onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'forwarded_to')} 
                    />:text}
      
                </div>),
            },
            {
              title: onChangeLanguage(locale,'Description',languageData),
              dataIndex: 'description',
              key: 'description',
              render: (text, record,index) => ( 
                <div style = {{padding:'2px',width:'100px'}}>
                  {  tabvalue !== 'complete' ?
                  <Input  className = "fontstyle" 
                    value = {text}  
                    onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'description')} 
                    onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'description')}
                    onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'description')} 
                    /> :text}
      
                </div>),
            },
           
            {
              title:onChangeLanguage(locale,'Standard Comments',languageData) ,
              dataIndex: 'standard_comments',
              key: 'standard_comments',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                  {  tabvalue !== 'complete' ?
                      <Select   className={(is_submit_table === true && selected_id === record.id) && (text === '' || text === null)?  "error-border-select":"react-select fontstyle" }
                      classNamePrefix="react-select"
                      name="form-field-name"
                      value={standard_comments_data.filter(option =>option.value === text)}
                      options={standard_comments_data}
                      onChange={({value}) =>this.onChangeValue_row(value,record.id,'standard_comments')} /> 
                      : getValue(standard_comments_data,'value','label',text)
                  }
                  
              
                </div>),
            },
            
            {
              title: onChangeLanguage(locale,'GSC Process Date',languageData),
              dataIndex: 'gscprocess_date',
              key: 'gscprocess_date',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}    
                </div>),
            }, 
            {
              title: onChangeLanguage(locale,'GSC Process Time',languageData),
              dataIndex: 'gscprocess_time',
              key: 'gscprocess_time',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}    
                </div>),
            }, 
            {
              title: onChangeLanguage(locale,'Action',languageData),
              key: 'id',
             dataIndex: 'id',
              render: (id,record) => (
                <div className="row d-flex justify-content-center" >
                  { tabvalue !== 'complete' &&
                      <Button color = "secondary" className="fontstyle button-width" onClick={()=>this.onSubmitData(record,true)}>
                      {onChangeLanguage(locale,'Save',languageData)} 
                    </Button>
                  }
                       
                 </div>
              )
          }
            
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

          const pagination = {
            ...this.paginationOptions,
            total: this.state.total,
            current: this.state.page,
            pageSize: this.state.pageSize,
            };
          const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
          };

        return (
            <>
             {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <title>{onChangeLanguage(locale,'Invoice Processing - Input',languageData)}</title>
            <Row>
              <Colxx xxs="12">
              <div className = "row">
                      <div className = "col-md-9">
                      <Breadcrumb heading={onChangeLanguage(locale,'Invoice Processing - Input',languageData)} match={match} />
                    </div>
                    <div className = "col-md-3" style = {{marginTop:'10px'}}>
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
                          
                        </ul>
                      
                       
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
                                    options={region_data}
                                    getDropdownButtonLabel={({ placeholderButtonLabel, value }) => { if(value.length==0) {return "Select.."; }else{ var item = value.filter(item=>item.label.includes('Select All')); if(item.length!=0){ return (value.length-1)+" selected";} else {return value.length+" selected";}  }}}
                                   />
                            </div>
                          
                            <div className = "col-lg-2-0 space-margin ">
                                <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'Area',languageData)}</Label>
                                 <ReactMultiSelectCheckboxes  className = 'fontstyle' 
                                    value={area_filter}
                                    onChange={(option)=>  this.setState({area_filter :option })}
                                    options={area_data}
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
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Reference',languageData)}</Label>
                               
                                    <Input  className = "fontstyle text-background" 
                                      value = {reference_filter}  
                                      onChange= {(e)=>this.setState({reference_filter : e.target.value})} 
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
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Invoice Status',languageData)}</Label>
                               
                                <Select   className="react-select fontstyle" 
                                    classNamePrefix="react-select"
                                    name="form-field-name"
                                    value={invoice_status_data.filter(option =>option.value === invoice_statuss)}
                                    options={invoice_status_data}
                                    onChange={({value}) =>this.setState({invoice_statuss:value})} />
                                   
                            </div>
                            <div className = "col-md-4" style = {{marginTop:'22px'}}>
                                <Button className = "button-width" color="secondary" 
                                  onClick={()=>this.onCopy()}
                                  >
                                {onChangeLanguage(locale,'Copy',languageData)} 
                                </Button>
                              <Button 
                                className = "button-width" color="primary"  
                                  onClick={()=>this.onSubmitFilter()}
                                    >
                                    {onChangeLanguage(locale,'Filter',languageData)} 
                                </Button>
                                <Button className = "button-width" color="secondary" 
                                  onClick={()=>this.ClearValue()}
                                  >
                                {onChangeLanguage(locale,'Refresh',languageData)} 
                                </Button>
                                  {this.renderTemplate()}
                                
                            </div>
                          
                        </div>
                </div>

             

            <div>
            <div className = "publishuser-card-component" style = {{borderRadius:'10px'}}>
               <div className = "publish-title1" style = {{borderRadius:'10px 10px 0px 0px'}}>
                    <div className = "row">
                        <div className = "col-md-4 text-center" style = {{color:tabvalue === 'total' ? 'white' : 'rgb(255 255 255 / 70%)',cursor:'pointer'}}
                        onClick = {()=>this.setTabvlaue('total',1,25)}>
                          <a className = "fontstyle">{onChangeLanguage(locale,'Number of Invoice Allocated',languageData)} - ({total_count})</a>
                        </div>
                        <div className = "col-md-4 text-center" style = {{color:tabvalue === 'complete' ? 'white' : 'rgb(255 255 255 / 70%)',cursor:'pointer'}}
                        onClick = {()=>this.setTabvlaue('complete',1,25)}>
                          <a className = "fontstyle">{onChangeLanguage(locale,'Number of Invoice Actioned ',languageData)} - ({complete_count})</a>
                        </div>
                        <div className = "col-md-4 text-center" style = {{color:tabvalue === 'pending' ? 'white' : 'rgb(255 255 255 / 70%)',cursor:'pointer'}}
                        onClick = {()=>this.setTabvlaue('pending',1,25)}>
                          <a className = "fontstyle">{onChangeLanguage(locale,'Number of Pending',languageData)}  - ({pending_count})</a>
                        </div>
                        {/* <div className = "col-md-1">
                        {tabvalue === 'pending' &&
                           <div>
                            <Button className = "button-width" color="secondary"
                            onClick = {()=>this.onSubmitClear()}  >
                            {onChangeLanguage(locale,'Clear',languageData)}   
                            </Button>
                             
                           </div> 
                            }
                          
                        </div>
                         */}
                      </div>
                  </div> 
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
             </div>
            </div>

          </>
        )
    }
    handleChangeRegion= (value) =>
    {
      this.setState({  region: value,area:'',area_data:[] })
      this.fetcharea_regionwise(value)
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
    renderTemplate()
  {
    const {languageData,locale} = this.props
    const {all_data,standard_comments_data,invoice_status_data,region_data,area_all_data} = this.state
    var array = all_data.map(record=> {
          return {
              
              "VIM Processs Status Text": record.vimprocess,
              "Company Code":record.companycode,
              "Document ID": record.document_id,
              "Vendor":record.vendor,
              "Vendor Name": record.vendor_name,
              "Reference":record.reference,
              "Gross Invoice Amount":record.gross_invoice,
              "Document Currency": record.document_currency,
              "Scan Location":record.scanlocation,
              "Update Date":record.update_date,
              "Update Time":record.update_time,
              "Current Role":record.current_role,
              "Additional Comment": record.additional_comment,
              "User ID": record.user_id,
              "Region":getValue(region_data,'value','label',record.region) ,
              "Area":getValue(area_all_data,'value','label',record.area) ,
              "Invoice Status":getValue(invoice_status_data,'value','label',record.invoice_status) ,
              "Forwarded To":record.forwarded_to,
              "Description": record.description,
              "Standard Comments":getValue(standard_comments_data,'value','label',record.standard_comments), 
              "GSC Process Date": record.gscprocess_date,
              "GSC Process Time": record.gscprocess_time,
        };
      })
      return(
        
        <Workbook filename="Invoice Processing - Input.xlsx" element={
          <Button className = "button-width" color="primary">
              {onChangeLanguage(locale,'Export Excel',languageData)} 
          </Button>
		      }>
          <Workbook.Sheet data={array} name="Sheet A">
          <Workbook.Column label="VIM Processs Status Text" value="VIM Processs Status Text"/>
          <Workbook.Column label="Company Code" value="Company Code"/>
            <Workbook.Column label="Document ID" value="Document ID"/>
            <Workbook.Column label="Vendor" value="Vendor"/>
            <Workbook.Column label="Vendor Name" value="Vendor Name"/>
            <Workbook.Column label="Reference" value="Reference"/>
            <Workbook.Column label="Gross Invoice Amount" value="Gross Invoice Amount"/>
            <Workbook.Column label="Document Currency" value="Document Currency"/>
            <Workbook.Column label="Scan Location" value="Scan Location"/>
            <Workbook.Column label="Update Date" value="Update Date"/>
            <Workbook.Column label="Update Time" value="Update Time"/>
            <Workbook.Column label="Current Role" value="Current Role"/>
            <Workbook.Column label="Additional Comment" value="Additional Comment"/>
            <Workbook.Column label="User ID" value="User ID"/>
            <Workbook.Column label="Region" value="Region"/>
            <Workbook.Column label="Area" value="Area"/>  
            <Workbook.Column label="Invoice Status" value="Invoice Status"/>
            <Workbook.Column label="Forwarded To" value="Forwarded To"/>
            <Workbook.Column label="Description" value="Description"/>
            <Workbook.Column label="Standard Comments" value="Standard Comments"/>
            <Workbook.Column label="GSC Process Date" value="GSC Process Date"/>
            <Workbook.Column label="GSC Process Time" value="GSC Process Time"/>
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


