import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import {onChangeLanguage,getValue,convertLocalToUTCDate,getTimeDifference} from '../../../../helper'
import{teamsService} from '../../../../redux/teams/saga'
import{userService} from '../../../../redux/users/saga'
import{reportService} from '../../../../redux/ra/report/saga'
import moment from 'moment';
import { Table,Tooltip } from 'antd';
import Select from 'react-select';
import DatePicker from "../../datePicker";
import{regionsService} from '../../../../redux/ra/region/saga'
import{priorityService} from '../../../../redux/ra/priority/saga'
import{sizeService} from '../../../../redux/ra/size/saga'
import{statusService} from '../../../../redux/ra/status/saga'
import{RAareaService} from '../../../../redux/ra/area/saga';
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../constants/defaultValues';

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        startdate:'',
        enddate:'',
        team_id:'',
        report:'',
        team_data:[],
        user_data:[],
        region_data: [],
        area_data:[],
        status_data:[],
        priority_data:[],
        size_data:[],
        is_submit:false,
        data:[],
        page:1,
        pageSize:25,
        total :0,
        days_value:'',
      };
    }
    componentDidMount()
    {
        this.fetchTeamData()
        this.fetchregion()
        this.fetcharea()
        this.fetchpriority()
        this.fetchsize()
        this.fetchstatus()
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
                 var regionlist = filterstatus.map(function(cusmaidid,index) {
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
    fetchTeamData() {  
        this.setState({
          loading : true
        })
        teamsService.fetchteams()
          .then((res) => { 
            this.setState({   
                 loading : false   
            }) 
            if(res.status)
              {
                let filterstatus = (res.data).filter(item => item.status === 1)
                var list = filterstatus.map(function(areaaval) {
                     return  {label : areaaval.name+'-'+areaaval.country_code ,value : (areaaval.id).toString(),name:areaaval.name};
                  });  
                   this.setState({
                       team_data :  list,
                   })
                
              }                
        
        })
        .catch((error) => { 
          this.setState({
            loading : false
          })
          });   
     }
     fetchUserData(team_array) {  
        this.setState({
          loading : true
        })
        userService.fetch_hierarchyuserData(team_array)
          .then((res) => { 
            this.setState({   
                 loading : false   
            }) 
            if(res.status)
              {
                let filterstatus = (res.data).filter(item => item.is_active === 1)
                var list = []
                for(var i =0;i<filterstatus.length;i++)
                {
                    list.push(filterstatus[i].username)
                }
                   this.setState({
                       user_data :  list,
                   })
                
              } 
              else
              {
                this.setState({
                  user_data :  [],
                  data:[],
                 })
              }                 
        
        })
        .catch((error) => { 
          this.setState({
            loading : false
          })
          });   
     }
    fetchPagination(page,per_page,startdate,enddate,is_report)
    {
        const {team_id,user_data,team_data} = this.state
        if(enddate !== "" && startdate !== ""  && team_id !== "")
        {
          if ((Date.parse(enddate) > Date.parse(startdate)))
          {
            const team = getValue(team_data,'value','name',team_id)
            this.setState({
                loading : true,
                page:page,
                pageSize:per_page
            })
            const {username} = this.props
            const report_url =  'amdcontracts',
            menu= 'RA' , 
            submenu='AMD / Contracts',
            type = 'Raw Data'
            reportService.fetchapi(report_url,page,per_page,startdate,enddate,user_data,is_report,
              username,menu,submenu,team_id,team,type)
            .then((res) => { 
              this.setState({   
                   loading : false   
              }) 
              if(res.status)
                {
                  if(is_report !== true)
                  {
                    if(res.data)
                    {
                      var list = []
                      for(var i =0 ;i<res.data.length;i++)
                      {
                        var dict = res.data[i]
                        var child_list = []
                        const children = dict.children
                        if(children && children !== null)
                        {
                          if(children.length > 0)
                          {
                            for(var j =0 ;j<children.length;j++)
                            {
                              var record = children[j]
                              record.pub_total = ''
                              record.aud_total = ''
                              child_list.push(record)
                              
                            }
                          }

                        }
                        dict.children = child_list.length > 0 ? child_list : null
                        list.push(dict)
                      }
                      this.setState({
                        total:res.total,
                        data:list
                       })
                    }
                   
                  }
                   
                  
                }    
                else
                {
                  this.setState({
                    total:0,
                    data:[]
                   })
                  createNotification(res.message,'error','filled');
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
            createNotification('Please Choose End Date Above  Start Date','error','filled')
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
   
    clearValue()
    {
        this.setState({
            startdate:'',
            enddate:'',
            team_id:'',
            user_data:[],
            data:[],
            is_submit:false,
           
        })
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

    onChangeTeam(value)
    {
        this.setState({  team_id: value,startdate  : '',enddate:'',user_data:[],data:[] })
        this.fetchUserData([value])
    }
    onChangestarttime(date)
    {
      
      this.setState({startdate  : date,enddate:''})
     
    }
    
    onChangeendtime(date)
     {
       const {startdate,team_id} = this.state
       if(startdate !== '' && team_id !== '')
       {
        this.setState({enddate  : date})
        this.fetchPagination(1,25,startdate,date,false)
       }
       else
       {
        createNotification('Please Choose Start Date and Team','error','filled');
       }
       
     }
    
    onClickDay(value)
    {
      
      this.setState({
        days_value:value
      })
     
      if(value === "Past 1 Days")
      {
        this.getdaywiseChart(0,false,value)
      }
      else if(value === "1 Month")
      {
        this.getdaywiseChart(29,value)
      }
      else if(value === "1 Year")
      {
        this.getdaywiseChart(364,value)
      }
      else if(value === "This Week")
      {
        
        this.getdaywiseChart(6,value)
      }
      else if(value === "This Month")
      {
        this.getdaywiseChart(29,value)
      }
      else if(value === "This Year")
      {
        this.getdaywiseChart(364,value)
      }

    }
    getdaywiseChart(day,days_value)
  {
   
    var date = new Date();
    date.setDate(date.getDate() - day);
    var currentdate = moment(new Date()).format('YYYY-MM-DD')
    const lastdate = ("0" + date.getDate()).slice(-2),
    month = ("0" + (date.getMonth() + 1)).slice(-2)
    var finalDate = date.getFullYear() +'-'+ month +'-' + lastdate ;
    if(days_value === "This Week")
    {
     
      var startOfWeek = moment().startOf('week').toDate();
      finalDate = moment(startOfWeek).format('YYYY-MM-DD')
    }
    else if(days_value === "This Month")
    {
      var startOfWeek = moment().startOf('month').toDate();
      finalDate = moment(startOfWeek).format('YYYY-MM-DD')
    }
    else if(days_value === "This Year")
    {
      var startOfWeek = moment().startOf('year').toDate();
      finalDate = moment(startOfWeek).format('YYYY-MM-DD') 
    }
   console.log("lgkjgjgkj  finalDate = " , JSON.stringify(finalDate) , 'currentdate ==>' , currentdate)
   const {team_id} = this.state
  if(team_id !== '')
  {
    this.setState({
      startdate:new Date(finalDate),
      enddate:convertLocalToUTCDate(new Date())
    })
    this.fetchPagination(1,25, new Date(finalDate),convertLocalToUTCDate(new Date()),false)
  }
  else
  {
   createNotification('Please Choose Team','error','filled');
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
      const {startdate,enddate} = this.state
     this.fetchPagination(page,pageSize,startdate,enddate,false)
    },
    pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
    // total: this.state.total  ,
    showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total}`,
  };
    render()
    {
        const {match,locale,languageData} = this.props
        const {enddate,startdate,team_id,team_data,is_submit,loading,data,page,pageSize,
            size_data,area_data,region_data,priority_data,status_data} = this.state
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
                     {text}
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
               {getValue(area_data,'value','label',text)} 
            
              </div>),
          },
          {
            title:onChangeLanguage(locale,'Priority',languageData) ,
            dataIndex: 'priority',
            key: 'priority',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
                {getValue(priority_data,'value','label',text)} 
            
              </div>),
          },
          {
            title:onChangeLanguage(locale,'Size',languageData) ,
            dataIndex: 'size',
            key: 'size',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
                {getValue(size_data,'value','label',text)} 
              </div>),
          },
          {
            title:onChangeLanguage(locale,'Received Time',languageData) ,
            dataIndex: 'received_time',
            key: 'received_time',
            render: (text, record) => (	
                <div style = {{padding:'2px',width:'200px'}}>
                    {moment(text).format('MM/DD/YYYY hh:mm:ss a')}
                </div>
                ),
          },
          {
            title:onChangeLanguage(locale,'Publisher',languageData) ,
            dataIndex: 'publisher',
            key: 'publisher',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text} 
              </div>),
          },
          {
            title:onChangeLanguage(locale,'Publisher Status',languageData) ,
            dataIndex: 'publisher_status',
            key: 'publisher_status',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
                  {getValue(status_data,'value','label',text)} 
            
              </div>),
          },
          {
            title:onChangeLanguage(locale,'Auditor',languageData) ,
            dataIndex: 'auditor',
            key: 'auditor',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
                {text} 
            
              </div>),
          },
          {
            title:onChangeLanguage(locale,'Auditor Status',languageData) ,
            dataIndex: 'auditor_status',
            key: 'auditor_status',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
                {getValue(status_data,'value','label',text)} 
            
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
                {text} 
    
              </div>),
          },
          {
            title: onChangeLanguage(locale,'Static',languageData),
            key: 'statics',
           dataIndex: 'statics',
            render: (text,record) => (
                <div  style = {{padding:'2px',width:'100px'}} >
                  {text}
               </div>
            )
         },
          {
            title:onChangeLanguage(locale,'Pub. In Progress',languageData) ,
            dataIndex: 'pub_in_progress',
            key: 'pub_in_progress',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text} 
            
              </div>),
          },
          {
            title:onChangeLanguage(locale,'Pub. Pending In',languageData) ,
            dataIndex: 'pub_pending_in',
            key: 'pub_pending_in',
            render: (text, record,index) => ( 
              <div  
              style = {{padding:'2px',width:'100px'}}>
               {text} 
            
              </div>),
          },
          {
            title:onChangeLanguage(locale,'Pub. Pending Out',languageData) ,
            dataIndex: 'pub_pending_out',
            key: 'pub_pending_out',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text} 
            
              </div>),
          },
          {
            title:onChangeLanguage(locale,'Pub. Done Time',languageData) ,
            dataIndex: 'pub_done_time',
            key: 'pub_done_time',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text} 
            
              </div>),
          },
          {
            title:onChangeLanguage(locale,'Pub. Disregards',languageData) ,
            dataIndex: 'pub_disregrads',
            key: 'pub_disregrads',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text} 
            
              </div>),
          },
          {
            title:onChangeLanguage(locale,'Pub. Total Time In Pending',languageData) ,
            dataIndex: 'pub_total',
            key: 'pub_total',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text} 
            
              </div>),
          },
          {
            title:onChangeLanguage(locale,'Pub. Total Routes',languageData) ,
            dataIndex: 'pub_routes',
            key: 'pub_routes',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text} 
            
              </div>),
          },
          {
            title:onChangeLanguage(locale,'Publisher Comments',languageData) ,
            dataIndex: 'comments_publisher',
            key: 'comments_publisher',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text} 
            
              </div>),
          },
          {
            title:onChangeLanguage(locale,'Aud. In Progress',languageData) ,
            dataIndex: 'aud_in_progress',
            key: 'aud_in_progress',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text} 
            
              </div>),
          },
          {
            title:onChangeLanguage(locale,'Aud. Pending In',languageData) ,
            dataIndex: 'aud_pending_in',
            key: 'aud_pending_in',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text} 
            
              </div>),
          },
          {
            title:onChangeLanguage(locale,'Aud. Pending Out',languageData) ,
            dataIndex: 'aud_pending_out',
            key: 'aud_pending_out',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text} 
            
              </div>),
          },
          {
            title:onChangeLanguage(locale,'Aud. Done Time',languageData) ,
            dataIndex: 'aud_done_time',
            key: 'aud_done_time',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text} 
            
              </div>),
          },
          {
            title:onChangeLanguage(locale,'Aud. Disregards',languageData) ,
            dataIndex: 'aud_disregrads',
            key: 'aud_disregrads',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text} 
            
              </div>),
          },
          {
            title:onChangeLanguage(locale,'Aud. Total Time In Pending',languageData) ,
            dataIndex: 'aud_total',
            key: 'aud_total',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text} 
            
              </div>),
          },
          {
            title:onChangeLanguage(locale,'Aud. Total Routes',languageData) ,
            dataIndex: 'aud_routes',
            key: 'aud_routes',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text} 
            
              </div>),
          },
          {
            title:onChangeLanguage(locale,'Auditor Comments',languageData) ,
            dataIndex: 'comments_audit',
            key: 'comments_audit',
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
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}
              </div>),           
          },          
          {
            title: onChangeLanguage(locale,'Start Date Time',languageData),
            dataIndex: 'start_time',
            key: 'start_time',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {(text !== null && text !== '')  && moment(text).format('MM/DD/YYYY hh:mm:ss a')}
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'End Date Time',languageData),
            dataIndex: 'end_time',
            key: 'end_time',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {(text !== null && text !== '')  && moment(text).format('MM/DD/YYYY hh:mm:ss a')}
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Tab Details',languageData),
            dataIndex: 'tab_details',
            key: 'tab_details',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}
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
            <title>{onChangeLanguage(locale,'AMD / Contracts Raw Data',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'AMD / Contracts Raw Data',languageData)} match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <div>
            <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                          <div className = "row" style = {{padding:'10px'}}>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Team',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                        <Select  className={is_submit === true && team_id === ''?  "error-border-select":"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={team_data.filter(option =>option.value === team_id)}
                                            options={team_data}
                                            onChange={(option) => this.onChangeTeam(option.value)}
                                        />
                                </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Start Date',languageData)}<a style = {{color :'red'}}>*</a>
                                    {(is_submit === true && startdate === '')  && <a className ="fontstyle mandatory-label">{onChangeLanguage(locale,'Mandatory Field',languageData)}</a>}</Label>
                                    
                                     <DatePicker
                                    selected={startdate}
                                    className = "text-background"
                                    onChange={(date) => this.onChangestarttime(date)}
                                    />
                                
                            </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'End Date',languageData)}<a style = {{color :'red'}}>*</a>
                                    {(is_submit === true && enddate === '')  && <a className ="fontstyle mandatory-label">{onChangeLanguage(locale,'Mandatory Field',languageData)}</a>}</Label>
                                  
                                    <DatePicker
                                    selected={enddate}
                                    min_date= {startdate}
                                    className = "text-background"
                                    onChange={(date) => this.onChangeendtime(date)}
                                    />
                                </div>
                             </div>
                             <div className = "text-center" style = {{padding:'0px 0px 10px'}}>
                               <Button className = "button-width" color="secondary" 
                                onClick={()=>this.fetchPagination(page,pageSize,startdate,enddate,true)} >
                                  <i className = "simple-icon-cloud-download" style = {{marginRight:'5px'}}/>
                                  {onChangeLanguage(locale,'Download',languageData)}</Button> 

                                <Button className = "button-width" color="primary" 
                                     onClick={()=>this.onClickDay('Past 1 Days')} >
                                        <i className = "simple-icon-cloud-download" style = {{marginRight:'5px'}}/>
                                        {onChangeLanguage(locale,'Daily',languageData)} </Button> 

                                <Button className = "button-width" color="primary" 
                                  onClick={()=>this.onClickDay('This Week')} >
                                    <i className = "simple-icon-cloud-download" style = {{marginRight:'5px'}}/>
                                    {onChangeLanguage(locale,'Weekly',languageData)} </Button> 

                                <Button className = "button-width" color="primary"
                                  onClick={()=>this.onClickDay('This Month')} >
                                    <i className = "simple-icon-cloud-download" style = {{marginRight:'5px'}}/>
                                    {onChangeLanguage(locale,'Monthly',languageData)} </Button>  

                                 <Button className = "button-width" color="secondary" 
                                onClick={()=>this.clearValue()}
                                >{onChangeLanguage(locale,'Refresh',languageData)}</Button> 
                                  
                            </div>
                
                </div> 
                <div style = {{padding :'10px',width:'100%',overflow:'auto'}}>
                     {(columns.length > 0 && data.length > 0) && 
                         <Table                 
                           columns={columns}
                           pagination = {pagination}
                           dataSource={data} 
                           rowKey="id"
                           rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}/>
       
                        }
                     
                   </div>  
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

