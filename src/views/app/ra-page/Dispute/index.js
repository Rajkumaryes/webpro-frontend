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
import { createNotification } from '../../../../toast';
import {onChangeLanguage,getValue,getTimeDifference,convertLocalToUTCDate,convertUTCToLocalDate,getPermission} from '../../../../helper';
import Loading from "react-fullscreen-loading";
import{RAareaService} from '../../../../redux/ra/area/saga';
import{statusService} from '../../../../redux/ra/status/saga'
import{userService} from '../../../../redux/users/saga'
import{disputeService} from '../../../../redux/ra/dispute/saga'
import moment from 'moment';
import {setContainerClassnames} from '../../../../redux/actions';
import DatePicker from "../../datePicker";
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../constants/defaultValues';
import {customStyles,getStausOptionEnable,getEnableStatus} from '../../../../helper';

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        selectedRowKeys: [], 
        data:[],
        user_data:[],
        status_data:[],
        area_data:[],
        request_no:'',
        booking_no:'',
        dispute_no :'',
        publisher:'',
        publisher_status:'',
        auditor:'',
        auditor_status:'',
        area:'',
        customer:'',
        is_submit_table:false,
        select_index : -1,
        page:1,
        pageSize:25,
        total :0,
        is_search:false,
        modalOpen_routes:false,
        modalOpen_time:false,
        no_of_rutes:'',
        pending_out:'',
        modal_index:-1,
        is_publish:'',
      }
    }
    componentDidMount()
    {
     
      this.fetchuser()
      this.fetchstatus()
      this.fetcharea()
      this.ClearValue(1,25)
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
     getTime(start,end)
     {
       var  new_tat = ''
       if(start !== '' && start !== null && end !== ''&& end !== null)
       {
         new_tat = getTimeDifference(new Date(start),new Date(end))
       }
   
     
       return new_tat
     }
   
    onSubmitData(value,is_new)
    {
      const {status_data} = this.state
    
        var isfill = true
        const id = value.id
        var record = Object.assign({}, value);
        if(typeof record.id === 'string')
        {
          record.id = 0
          record.end_time = convertLocalToUTCDate(new Date())
        }
        if(record.dispute_no   === null || record.dispute_no  === "" || record.received_time  === null || record.received_time === "")
        {
          isfill = false
        
        }
        // if(record.received_time  !== "" && record.received_time  !== null)
        // {
        //   let re = /^\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}:\d{2} ([AaPp][Mm])?$/ ;
        //       let received_time =(record.received_time).match(re)
        //       if(received_time === null )
        //       {
        //         isfill = false
        //       }
        // }
        const {username} = this.props
        record.user_id = username
        record.updated_end_time = convertLocalToUTCDate(new Date())
        record.log_time  = moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
        record.pub_total = this.getTime(record.pub_pending_out,record.pub_pending_in)
        record.aud_total = this.getTime( record.aud_pending_out, record.aud_pending_in)
      
        
        if(isfill === true)
        {
          if(record.received_time  !== "" && record.received_time  !== null)
          {
          let re = /^\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}:\d{2} ([AaPp][Mm])?$/ ;
          let received_time =(record.received_time).match(re)
          console.log('received_time',received_time)
          if(received_time !== null )
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
          disputeService.multiupdate_api([record])
            .then((res) => { 
              this.setState({   
                loading : false     
              }) 
              if(res.status)
                {
                  
                  if(is_new === true)
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
          else{
            createNotification('Please fill Request In Time is (MM/DD/YYYY hh:mm AM/PM) this format','error','filled')
          }
        }
        }
        else
        {
          this.setState({
            is_submit_table:true
          })
          createNotification('Please fill mandatory fieldthis format','error','filled')
        }
      
    }
    ClearValue(page,pagesize)
    {
        this.setState({
          request_no:'',
          booking_no:'',
          dispute_no :'',
          publisher:'',
          publisher_status:'',
          auditor:'',
          auditor_status:'',
          area:'',
          customer:'',
          is_submit_table:false,
          select_index : -1,
          is_search:false,
        })
        var request_no = ''  
        if(localStorage.getItem('dispute_id') !== null)
        {
          request_no = localStorage.getItem('dispute_id')
          localStorage.removeItem('dispute_id')
          this.setState({
            request_no:request_no,
          })
        }
      
       this.fetchPagination(page,pagesize,'', '' ,request_no,'','' ,'','','','')
    }
    fetchPagination(page,per_page,publisher, dispute_no ,request_no,booking_no,publisher_status ,auditor,auditor_status,area,customer)
    {
      this.setState({
        loading : true
      })
      disputeService.filterapi(page,per_page,publisher, dispute_no ,request_no,booking_no,publisher_status ,auditor,auditor_status,area,customer)
        .then((res) => { 
          this.setState({   
            loading : false ,
            pageSize : per_page,
            page:page,     
          }) 
          if(res.status)
            {
            
                this.setState({
                    data:res.data,
                    select_index : -1,
                    selectedRowKeys:[],
                    total : res.total,
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
      
      const {page,pageSize, publisher, dispute_no ,request_no,booking_no,publisher_status ,auditor,auditor_status,area,customer} = this.state
    var isfill = false
    if(publisher !== '' || dispute_no  !== '' || request_no !== "" || booking_no !== '' ||publisher_status !== '' 
    ||auditor !== '' || auditor_status  !== '' || area !== "" || customer !== '' )
    {
        isfill = true  
    }

      if(isfill === true)
      {
          this.fetchPagination(page,pageSize, publisher, dispute_no ,request_no,booking_no,publisher_status ,auditor,auditor_status,area,customer)
      }
      else
      {
        createNotification('Please Choose any one details then can search','error','filled')
       
      }
    }
    onSubmitClear()
    {
      const { selectedRowKeys} = this.state

      if(selectedRowKeys.length > 0 )
      {
          this.setState({
            loading : true
          })
          disputeService.clear_api(selectedRowKeys)
            .then((res) => { 
              this.setState({   
                loading : false     
              }) 
              if(res.status)
                {
                  createNotification('Updated','success','filled')
                  
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
     
      if (e.key === 'Enter') {
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
            if(key === 'area'  || key === 'publisher' || key === 'publisher_status' || key === 'auditor'|| key === 'auditor_status')
            {
              var is_new = false
              if(typeof id == 'string')
              {
                is_new = true
              }
              this.onSubmitData(data[index],is_new)
            }
        }
        this.setState({
          select_index : -1,
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
                if(record.dispute_no   === null || record.dispute_no  === ""  || record.received_time  === null || record.received_time === "")
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
            "received_time":"",
            "request_no": "",
            "booking_no": "",
            "dispute_no": "",
            "area":'',
            "customer": "",
            "publisher": "",
            "publisher_status":"",
            "publisher_status": '',
            "pub_in_progress": '',
            "pub_pending_in": '',
            "pub_pending_out": '',
            "pub_done_time": '',
            "pub_disregrads": '',
            "pub_total": '',
            "pub_routes": '',
            "auditor": "",
            "auditor_status":"",
            "aud_in_progress": '',
            "aud_pending_in": '',
            "aud_pending_out": '',
            "aud_done_time": '',
            "aud_disregrads": '',
            "aud_total": '',
            "aud_routes": '',
            "status" : 1,
            "start_time":convertLocalToUTCDate(new Date()),
            "end_time":convertLocalToUTCDate(new Date()),
            "updated_start_time":convertLocalToUTCDate(new Date()),
            "updated_end_time":convertLocalToUTCDate(new Date()),
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
    onClickDetails(id){
      if(id !== -1)
      {
        this.props.history.push(`${adminRoot}/ra/details-box-dispute/${id}`)
      }
      else
      {
        createNotification('Please choose row','error','filled')
      }
   
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
        const { publisher, dispute_no ,request_no,booking_no,publisher_status ,auditor,auditor_status,area,customer,is_search} = this.state
        if(is_search === true)
        {
          this.fetchPagination(page,pageSize, publisher, dispute_no ,request_no,booking_no,publisher_status ,auditor,auditor_status,area,customer)
          
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
        const {data,loading,selectedRowKeys,status_data,user_data,publisher,area_data,
          dispute_no ,select_index,request_no,publisher_status ,is_submit_table,
        auditor,auditor_status,area,customer} = this.state
            const columns = [
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
                title:onChangeLanguage(locale,'Request In Time',languageData) ,
                dataIndex: 'received_time',
                key: 'received_time',
                render: (text, record) => (	
                    <div style = {{padding:'2px',width:'200px'}}>
                        {(typeof record.id === 'string') ? 
                            <Input  className = {(is_submit_table === true && text === "" )   ?  "fontstyle error-border" :"fontstyle"  }
                            value = {text}  
                            placeholder = "MM/DD/YYYY hh:mm:ss AM/PM"
                            onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'received_time')} 
                            onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'received_time')}
                            onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'received_time')} 
                            />   :moment(text).format('MM/DD/YYYY hh:mm:ss a')
                         }
                    </div>
                    ),
              },
               
                
                 {
                  title: onChangeLanguage(locale,'Dispute No',languageData),
                  dataIndex: 'dispute_no',
                  key: 'dispute_no',
                  render: (text, record,index) => ( 
                    <div style = {{padding:'2px',width:'100px'}}>
                       <Input  className = {(is_submit_table === true && text === "" )   ?  "fontstyle error-border" :"fontstyle"  }
                                value = {text}  
                                onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'dispute_no')} 
                                onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'dispute_no')}
                                onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'dispute_no')} 
                                />
          
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
                          value={area_data.filter(option =>option.value === text)}
                          options={area_data}
                          onChange={({value}) =>this.onChangeValue_row(value,record.id,'area')} /> 
                  
                    </div>),
                },      
                {
                  title: onChangeLanguage(locale,'Customer Name',languageData),
                  dataIndex: 'customer',
                  key: 'customer',
                  render: (text, record,index) => ( 
                    <div style = {{padding:'2px',width:'100px'}}>
                        <Input  className = "fontstyle"
                                value = {text}  
                                onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'customer')} 
                                onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'customer')}
                                onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'customer')} 
                                />
                    </div>),
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
                        isDisabled = {getEnableStatus('publisher',status_data,record.request_no,record.publisher,record.publisher_status,record.auditor)}
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
                        isDisabled = {getEnableStatus('publisher_status',status_data,record.request_no,record.publisher,record.publisher_status,record.auditor)}
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
                        isDisabled = {getEnableStatus('auditor',status_data,record.request_no,record.publisher,record.publisher_status,record.auditor)}
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
                        isDisabled = {getEnableStatus('auditor_status',status_data,record.request_no,record.publisher,record.publisher_status,record.auditor)}
                        onChange={({value}) =>this.onChangeValue_row(value,record.id,'auditor_status')} /> 
                
                  </div>),
              },
                    
              
           ]
        
        const pagination = {
          ...this.paginationOptions,
          total: this.state.total,
          current: this.state.page,
          pageSize: this.state.pageSize,
          };
            return (
            <>
            <title>{onChangeLanguage(locale,'Dispute',languageData)}</title>
            {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <Row>
              <Colxx xxs="12">
              <div className = "row">
                      <div className = "col-md-10">
                      <Breadcrumb heading={onChangeLanguage(locale,'Dispute',languageData)} match={match} />
                    </div>
                    </div>
                  <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
        <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'10px'}}>
            <div className = "row">
                <div className = "col-md-12">  
                    <div className = "row" style = {{padding:'10px'}}>
                       <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Request No',languageData)} </Label>
                           
                          <Input  className = "fontstyle text-background"  
                            value = {request_no}  
                            onChange={(e) => this.setState({  request_no: e.target.value })}
                          
                            />
                        </div>
                        {/* <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Booking No',languageData)}</Label>
                            <Input  className = "fontstyle text-background"  
                            value = {booking_no}  
                            onChange={(e) => this.setState({  booking_no: e.target.value })}
                          
                            />
                        </div> */}
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Dispute No',languageData)}</Label>
                            <Input  className = "fontstyle text-background"  
                            value = {dispute_no }  
                            onChange={(e) => this.setState({  dispute_no : e.target.value })}
                          
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Area',languageData)} </Label>
                            <Select  
                                className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={area_data.filter(option =>option.value === area)}
                                options={area_data}
                                onChange={({value}) => this.setState({  area: value })}
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Customer Name',languageData)}</Label>
                            <Input  className = "fontstyle text-background"  
                            value = {customer }  
                            onChange={(e) => this.setState({  customer : e.target.value })}
                          
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
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
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Publisher Status',languageData)}</Label>
                            <Select  
                                className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={status_data.filter(option =>option.value === publisher_status )}
                                options={status_data}
                                onChange={({value}) => this.setState({  publisher_status : value })}
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Auditor',languageData)} </Label>
                            <Select  
                                className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={user_data.filter(option =>option.value === auditor)}
                                options={user_data}
                                onChange={({value}) => this.setState({  auditor: value })}
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Auditor Status',languageData)}</Label>
                            <Select  
                                className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={status_data.filter(option =>option.value === auditor_status )}
                                options={status_data}
                                onChange={({value}) => this.setState({  auditor_status : value })}
                            />
                        </div>
                      
                </div>
            </div>
        <div className = "row text-center" style = {{margin:'0px 5px'}} >
                    <Button className = "button-width" color="primary" 
                               onClick={()=>this.onSubmitFilter()}>
                  {onChangeLanguage(locale,'Search',languageData)}   
                    </Button>
                    <Button className = "button-width" color="secondary"  
                            onClick={()=>this.onClickDetails(select_index)}
                    >{onChangeLanguage(locale,'Details',languageData)}</Button>
                    {getPermission(role_permission_data,'RA','AMD / Contracts',true)  ==true &&
                      <Button className = "button-width" color="secondary"  
                        onClick={()=>this.onClickAMD_Contract()}
                        >{onChangeLanguage(locale,'AMD / Contracts',languageData)}</Button> 
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
            {this.renderModal_Routes()}
            {this.renderModal_PendingOut()}
          </>
        )
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
        this.onSubmitData(value[modal_index],false)
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