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
import{reportService} from '../../../../redux/tender/errorcapturingrawdata/saga'
import moment from 'moment';
import { Table,Tooltip } from 'antd';
import Select from 'react-select';
import DatePicker from "../../datePicker";
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../constants/defaultValues';
import{checklistService} from '../../../../redux/imports/checklist/saga';
import{areaimportService} from '../../../../redux/imports/areaimport/saga';
import{tendercategoryService} from '../../../../redux/projectmasters/tendercategory/saga';
import{tenderroundService} from '../../../../redux/projectmasters/tenderround/saga';
import{TendertypeService} from '../../../../redux/projectmasters/tendertype/saga';
import{tenderactivityService} from '../../../../redux/projectmasters/tenderactivity/saga';
import{tendersubactivityService} from '../../../../redux/projectmasters/tendersubactivity/saga';
import{tendersectionService} from '../../../../redux/projectmasters/tendersection/saga';
import{tenderareaService} from '../../../../redux/projectmasters/tenderarea/saga';
import{tendererrortypeService} from '../../../../redux/projectmasters/tendererrortype/saga';
import{tendererrorstatusService} from '../../../../redux/projectmasters/tendererrorstatus/saga';
import{tendererrorseverityService} from '../../../../redux/projectmasters/tendererrorseverity/saga';
import{TendernameService} from '../../../../redux/projectmasters/tendername/saga';

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
        tendercategorydata:[],
        rounddata:[],
        activitydata:[],
        subsectiondata:[],
        sectiondata:[],
        areacodedata:[],
        tendertypedata:[],
        errortypedata:[],
        errorstatusdata:[],
        errorseveritydata:[],
        tendernamedata:[],
      };
    }
    componentDidMount()
    {
        this.fetchTeamData()
        this.fetchtendercategory()
        this.fetchtenderround()
        this.fetcharea()
        this.fetchtendertype()
        this.fetchtendererrorseverity()
        this.fetchtendererrortype()
        this.fetchtendererrorstatus()
        this.fetchtendername()
        this.fetchsection()
        this.fetchsubactivity()
        this.fetchactivity()
     }
     fetchactivity() {
      this.setState({loading:true})
      tenderactivityService.fetchtenderactivity()
      .then((res) => {
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var regionlist = filterstatus.map(function(cusmaidid) {
                    return  {label : cusmaidid.name ,value : cusmaidid.id.toString(),
                      is_subactivity:cusmaidid.is_subactivity};
                 });  
                  this.setState({
                  activitydata :  regionlist
                  })
                 
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})
   }  
     fetchtendercategory() {
         tendercategoryService.fetchtendercategory()
         .then((res) => {
            if(res.status)   { 
               let filterstatus = (res.data).filter(item => item.status === 1)
                  var rolelist = filterstatus.map(function(cusmaidid) {
                       return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                    });  
                     this.setState({
                     tendercategorydata :  rolelist,
                     })
                  }
                  else{
                  this.setState({loading:false})}
                  })
                  .catch((error) => { }); 
       } 
       fetchtendername() {
         TendernameService.fetchtendername()
         .then((res) => {
            if(res.status)   { 
               let filterstatus = (res.data).filter(item => item.status === 1)
                  var rolelist = filterstatus.map(function(cusmaidid) {
                       return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                    });  
                     this.setState({
                     tendernamedata :  rolelist,
                     })
                  }
                  else{
                  this.setState({loading:false})}
                  })
                  .catch((error) => { }); 
       } 
       fetchtenderround() {
         tenderroundService.fetchtenderround()
         .then((res) => {
            if(res.status)   { 
               let filterstatus = (res.data).filter(item => item.status === 1)
                  var rolelist = filterstatus.map(function(cusmaidid) {
                       return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                    });  
                     this.setState({
                     rounddata :  rolelist,
                     })
                  }
                  else{
                  this.setState({loading:false})}
                  })
                  .catch((error) => { }); 
       } 
      
      
      fetcharea() {
         this.setState({loading:true})
         tenderareaService.fetchtenderarea()
         .then((res) => {
            if(res.status)   { 
               let filterstatus = (res.data).filter(item => item.status === 1)
                  var typelist = filterstatus.map(function(cusmaidid) {
                       return  {label : cusmaidid.code +'-'+cusmaidid.name,code : cusmaidid.code ,value : cusmaidid.id.toString(),unit:cusmaidid.unit};
                    });
                     this.setState({
                       areacodedata :  typelist
                     })
                    
                  }
                  else{
                  this.setState({loading:false})}
                  })
                  .catch((error) => { }); 
                  this.setState({loading:false})
      }  
      fetchsubactivity() {
        this.setState({loading:true})
        tendersectionService.fetchtendersection()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var typelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.subactivity ,value : cusmaidid.id.toString()};
                   });
                   var sectionlist = filterstatus.map(function(cusmaidid) {
                    return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                 });
                   var eallyUniqueArr =  typelist.filter((v,i,a)=>a.findIndex(t=>(t.label === v.label && t.label===v.label))===i)  
                    this.setState({
                      subsectiondata :  eallyUniqueArr,
                      sectiondata:sectionlist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     } 
      fetchtendertype() {
         TendertypeService.fetchtendertype()
         .then((res) => {
            if(res.status)   { 
               let filterstatus = (res.data).filter(item => item.status === 1)
                  var rolelist = filterstatus.map(function(cusmaidid) {
                       return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                    });  
                     this.setState({
                     tendertypedata :  rolelist,
                     })
                  }
                  else{
                  this.setState({loading:false})}
                  })
                  .catch((error) => { }); 
       } 
       fetchtendererrorseverity() {
         tendererrorseverityService.fetchtendererrorseverity()
         .then((res) => {
            if(res.status)   { 
               let filterstatus = (res.data).filter(item => item.status === 1)
                  var rolelist = filterstatus.map(function(cusmaidid) {
                       return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                    });  
                     this.setState({
                         errorseveritydata :  rolelist,
                     })
                  }
                  else{
                  this.setState({loading:false})}
                  })
                  .catch((error) => { }); 
       } 
       fetchtendererrortype() {
         tendererrortypeService.fetchtendererrortype()
         .then((res) => {
            if(res.status)   { 
               let filterstatus = (res.data).filter(item => item.status === 1)
                  var rolelist = filterstatus.map(function(cusmaidid) {
                       return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                    });  
                     this.setState({
                     errortypedata :  rolelist,
                     })
                  }
                  else{
                  this.setState({loading:false})}
                  })
                  .catch((error) => { }); 
       } 
       fetchtendererrorstatus() {
         tendererrorstatusService.fetchtendererrorstatus()
         .then((res) => {
            if(res.status)   { 
               let filterstatus = (res.data).filter(item => item.status === 1)
                  var rolelist = filterstatus.map(function(cusmaidid) {
                       return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                    });  
                     this.setState({
                     errorstatusdata :  rolelist,
                     })
                  }
                  else{
                  this.setState({loading:false})}
                  })
                  .catch((error) => { }); 
       } 
       fetchsection() {
        this.setState({loading:true})
        tendersectionService.fetchtendersection()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var typelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   });
                   var eallyUniqueArr =  typelist.filter((v,i,a)=>a.findIndex(t=>(t.label === v.label && t.label===v.label))===i)  
                    this.setState({
                      sectiondata :  eallyUniqueArr
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
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
                     return  {label : areaaval.name+'-'+areaaval.country_code,name : areaaval.name ,value : (areaaval.id).toString()};
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
            const menu= 'Tender' , 
            submenu='Error Capturing',
            type = 'Raw Data',
            audit_type= 'import'
            reportService.fetchapi(page,per_page,startdate,enddate,user_data,is_report,
              username,menu,submenu,team_id,team,type,audit_type)
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
                    else{
                      this.setState({
                       data:[]
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
      console.log("lklkgkjkv startdate " ,date)
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
    var endddatess = convertLocalToUTCDate(new Date())
    this.setState({
      startdate:new Date(finalDate),
      enddate:endddatess
    })
    this.fetchPagination(1,25, new Date(finalDate),endddatess,false)
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
          tendercategorydata,rounddata,activitydata,subsectiondata,sectiondata,areacodedata,
          tendertypedata,errortypedata,errorstatusdata,errorseveritydata,tendernamedata} = this.state
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
            title: onChangeLanguage(locale,'Error Reported Week',languageData),
            dataIndex: 'error_reported_week',
            key: 'error_reported_week',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Tender Processed Week',languageData),
            dataIndex: 'tender_processed_week',
            key: 'tender_processed_week',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Error Reported Date',languageData),
            dataIndex: 'error_reported_date',
            key: 'error_reported_date',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {(text !== null && text !== '')  && moment(text).format('MM/DD/YYYY hh:mm:ss a')}
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Tender Processed Date',languageData),
            dataIndex: 'tender_processed_date',
            key: 'tender_processed_date',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {(text !== null && text !== '')  && moment(text).format('MM/DD/YYYY hh:mm:ss a')}
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Error User ID',languageData),
            dataIndex: 'error_userid',
            key: 'error_userid',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Tender Name',languageData),
            dataIndex: 'tendername',
            key: 'tendername',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {getValue(tendernamedata,'value','label',text)}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Area Code',languageData),
            dataIndex: 'areacode',
            key: 'areacode',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {getValue(areacodedata,'value','label',text)}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Tender Round',languageData),
            dataIndex: 'tender_round',
            key: 'tender_round',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {getValue(rounddata,'value','label',text)}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Tender Category',languageData),
            dataIndex: 'tender_category',
            key: 'tender_category',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {getValue(tendercategorydata,'value','label',text)}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Tender Type',languageData),
            dataIndex: 'tender_type',
            key: 'tender_type',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {getValue(tendertypedata,'value','label',text)}
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
            title: onChangeLanguage(locale,'Total Lanes',languageData),
            dataIndex: 'total_lanes',
            key: 'total_lanes',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}
              </div>),           
          },
          
          {
            title: onChangeLanguage(locale,'Activity',languageData),
            dataIndex: 'activity',
            key: 'activity',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {getValue(activitydata,'value','label',text)}
              </div>),           
          },
          
          {
            title: onChangeLanguage(locale,'Section',languageData),
            dataIndex: 'section',
            key: 'section',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
                {/* {text} */}
               {getValue(sectiondata,'value','label',text)}
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Sub Section',languageData),
            dataIndex: 'subactivity',
            key: 'subactivity',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {getValue(subsectiondata,'value','label',text)}
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Error Status',languageData),
            dataIndex: 'error_status',
            key: 'error_status',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {getValue(errorstatusdata,'value','label',text)}
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Error Lane count',languageData),
            dataIndex: 'error_lanecount',
            key: 'error_lanecount',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Error Severity',languageData),
            dataIndex: 'error_severity',
            key: 'error_severity',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {getValue(errorseveritydata,'value','label',text)}
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Lane Count on Severity',languageData),
            dataIndex: 'lanecount_severity',
            key: 'lanecount_severity',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Error Captured by',languageData),
            dataIndex: 'error_capturedby',
            key: 'error_capturedby',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Error Comments',languageData),
            dataIndex: 'error_comments',
            key: 'error_comments',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'GTM HH Error Comments',languageData),
            dataIndex: 'gtm_hh_comments',
            key: 'gtm_hh_comments',
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
            <title>{onChangeLanguage(locale,'Error Capturing Raw Data',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'Error Capturing Raw Data',languageData)} match={match} />
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

