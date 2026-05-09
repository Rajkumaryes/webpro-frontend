import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import {onChangeLanguage,getValue,convertLocalToUTCDate} from '../../../../helper'
import{teamsService} from '../../../../redux/teams/saga'
import{userService} from '../../../../redux/users/saga'
import{reportService} from '../../../../redux/Export/report/saga'
import moment from 'moment';
import { Table,Tooltip } from 'antd';
import Select from 'react-select';
import DatePicker from "../../datePicker";
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../constants/defaultValues';
import{regionexportService} from '../../../../redux/Export/masters/exportregion/saga'
import{teamService} from '../../../../redux/Export/masters/exportteam/saga'
import{errortypeService} from '../../../../redux/Export/masters/errortype/saga'

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
        is_submit:false,
        data:[],
        page:1,
        pageSize:25,
        total :0,
        days_value:'',
        teamdata:[],
        errortypedata:[],
        auditcategorydata:[],
      };
    }
    componentDidMount()
    {
        this.fetchTeamData()
        this.fetchteam()
        this.fetcherrortype()
        this.fetchregion()
        this.fetchauditcategory()
    }
      
    fetcherrortype() {
      this.setState({
          loading : true
        })
      errortypeService.fetcherrortype()
      .then((res) => {
        this.setState({loading:false})
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var rolelist = filterstatus.map(function(cusmaidid) {
                    return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                 }); 
                
                  this.setState({
                  errortypedata :  rolelist,
                  })
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})
   }  
   fetchauditcategory() {
    this.setState({
        loading : true
      })
      auditcategoryservice.fetchauditcategory()
    .then((res) => {
      this.setState({loading:false})
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var rolelist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               }); 
              
                this.setState({
                  auditcategorydata :  rolelist,
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
    regionexportService.fetchregion()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.region_name ,value : cusmaidid.id.toString()};
               });  
             
                this.setState({
                regiondata :  regionlist,
               
                })
               
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})
 }  
    fetchteam() {
      this.setState({
          loading : true
        })
      teamService.fetchteams()
      .then((res) => {
          this.setState({loading:false})
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var teamlist = filterstatus.map(function(cusmaidid) {
                    return  {label : cusmaidid.team_name ,value : (cusmaidid.id).toString()};
                 });  
                  this.setState({
                  teamdata :  teamlist,
                  })
               }
              
               })
               .catch((error) => { 
                  this.setState({
                      loading : false
                    })
               }); 
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
            const report_url =  'auditsheet',
            menu= 'Export' , 
            submenu='Audit Sheet',
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
                      this.setState({
                        total:res.total,
                        data:res.data
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
          errortypedata,regiondata,teamdata,auditcategorydata} = this.state
        var columns= [
          {
            title: onChangeLanguage(locale,'ID',languageData),
            dataIndex: 'id',
            key: 'id',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Exception',languageData),
            dataIndex: 'exception',
            key: 'exception',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Shipment Type',languageData),
            dataIndex: 'shipment_type',
            key: 'shipment_type',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'MTD Type',languageData),
            dataIndex: 'mtd_type',
            key: 'mtd_type',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text !== null && text.toString() }    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'HBL',languageData),
            dataIndex: 'hbl',
            key: 'hbl',
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
            title: onChangeLanguage(locale,'TAT Time',languageData),
            dataIndex: 'tat_time',
            key: 'tat_time',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Time Taken',languageData),
            dataIndex: 'time_taken',
            key: 'time_taken',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Time',languageData),
            dataIndex: 'time',
            key: 'time',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'No of Container',languageData),
            dataIndex: 'no_of_container',
            key: 'no_of_container',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'No of Cargo Item',languageData),
            dataIndex: 'no_of_cargoitem',
            key: 'no_of_cargoitem',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'No of HBL',languageData),
            dataIndex: 'no_of_hbl',
            key: 'no_of_hbl',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Error',languageData),
            dataIndex: 'error',
            key: 'error',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          // {
          //   title: onChangeLanguage(locale,'Comments',languageData),
          //   dataIndex: 'comments',
          //   key: 'comments',
          //   render: (text, record,index) => ( 
          //     <div  style = {{padding:'2px',width:'100px'}}>
          //      {text}    
          //     </div>),           
          // },
          {
            title: onChangeLanguage(locale,'Buddy User ID',languageData),
            dataIndex: 'buddy_userid',
            key: 'buddy_userid',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Shipment Number',languageData),
            dataIndex: 'shipment_no',
            key: 'shipment_no',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Customer',languageData),
            dataIndex: 'customer',
            key: 'customer',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
         
          {
            title: onChangeLanguage(locale,'Doc Cut-Off',languageData),
            dataIndex: 'doc_cutoff',
            key: 'doc_cutoff',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
                {text}      
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Aggregated Status',languageData),
            dataIndex: 'aggregated_status',
            key: 'aggregated_status',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
                 {text}    
              </div>),           
          },
         
          {
            title: onChangeLanguage(locale,'Type',languageData),
            dataIndex: 'type',
            key: 'type',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Date',languageData),
            dataIndex: 'date',
            key: 'date',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
        
         
          {
            title: onChangeLanguage(locale,'Medium',languageData),
            dataIndex: 'medium',
            key: 'medium',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Numbers',languageData),
            dataIndex: 'numbers',
            key: 'numbers',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'BL',languageData),
            dataIndex: 'bl',
            key: 'bl',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'ETD',languageData),
            dataIndex: 'etd',
            key: 'etd',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Main POL',languageData),
            dataIndex: 'main_pol',
            key: 'main_pol',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Main Voyage',languageData),
            dataIndex: 'main_voyage',
            key: 'main_voyage',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Last Pod',languageData),
            dataIndex: 'main_pod',
            key: 'main_pod',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
         
          {
            title: onChangeLanguage(locale,'Issuer',languageData),
            dataIndex: 'issuer',
            key: 'issuer',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Team',languageData),
            dataIndex: 'team',
            key: 'team',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {getValue(teamdata,'value','label',text)}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Shipper Coder',languageData),
            dataIndex: 'shipper_coder',
            key: 'shipper_coder',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'MR Code',languageData),
            dataIndex: 'mr_code',
            key: 'mr_code',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Consignee',languageData),
            dataIndex: 'consignee',
            key: 'consignee',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          
          {
            title: onChangeLanguage(locale,'Error Type',languageData),
            dataIndex: 'error_type',
            key: 'error_type',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {getValue(errortypedata,'value','label',text)}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Audit Category',languageData),
            dataIndex: 'audit_category',
            key: 'audit_category',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {getValue(auditcategorydata,'value','label',text)}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Auditor Remarks',languageData),
            dataIndex: 'auditor_remarks',
            key: 'auditor_remarks',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Corrected Remarks',languageData),
            dataIndex: 'corrected_remarks',
            key: 'corrected_remarks',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text === true && 'TRUE'} 
              </div>),           
          },
          // {
          //   title: onChangeLanguage(locale,'User ID',languageData),
          //   dataIndex: 'audit_userid',
          //   key: 'audit_userid',
          //   render: (text, record,index) => ( 
          //     <div  style = {{padding:'2px',width:'100px'}}>
          //      {text}    
          //     </div>),           
          // },
          {
            title: onChangeLanguage(locale,'I have read and processed the shipment as per the above requirements',languageData),
            dataIndex: 'read',
            key: 'read',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text === true && 'TRUE'}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Draft Sent',languageData),
            dataIndex: 'draft',
            key: 'draft',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
              {text === true && 'TRUE'}     
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'SDC Y',languageData),
            dataIndex: 'sdc',
            key: 'sdc',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text === true && 'TRUE'}   
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Free Time Checked',languageData),
            dataIndex: 'free_time',
            key: 'free_time',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text === true && 'TRUE'}   
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Credit Check',languageData),
            dataIndex: 'credit',
            key: 'credit',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text === true && 'TRUE'}   
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Start Date Time',languageData),
            dataIndex: 'start_time',
            key: 'start_time',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
            {text!==''&& moment(text).format('MM/DD/YYYY hh:mm:ss a')} 
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'End Date Time',languageData),
            dataIndex: 'end_time',
            key: 'end_time',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text!==''&& moment(text).format('MM/DD/YYYY hh:mm:ss a')} 
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
            <title>{onChangeLanguage(locale,'Audit Sheet Raw Data',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'Audit Sheet Raw Data',languageData)} match={match} />
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
                             <div className = "text-center" style = {{padding:'0px 0px 20px'}}>
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

