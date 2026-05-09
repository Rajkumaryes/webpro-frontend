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
import{reportService} from '../../../../redux/EPOS/report/saga'
import moment from 'moment';
import { Table,Tooltip } from 'antd';
import Select from 'react-select';
import DatePicker from "../../datePicker";
import{areatpfrepService} from '../../../../redux/EPOS/areatpfrep/saga';
import{activitytpfrepService} from '../../../../redux/EPOS/activitytpfrep/saga';
import{hlclformatService} from '../../../../redux/EPOS/hlclformat/saga';
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
        is_submit:false,
        data:[],
        page:1,
        pageSize:25,
        total :0,
        days_value:'',
        activitydata:[],
        hlgldata:[],
        areadata:[],
      };
    }
    componentDidMount()
    {
        this.fetchTeamData()
        this.fetcharea() 
        this.fetchactivityapi() 
        this.fetchhlclformatapi()
    }


    fetcharea() {
      this.setState({
        loading : true
      })
      areatpfrepService.fetcharearegion()
        .then((res) => {
            this.setState({loading:false})
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var arealist = filterstatus.map(function(areaaval) {
                      return  {label : areaaval.name ,value : (areaaval.id).toString()};
                   });  
                    this.setState({
                    areadata :  arealist,
                    })
                 }
                
                 })
                 .catch((error) => { 
                    this.setState({
                        loading : false
                      })
                 }); 
     }
     fetchactivityapi() {
      this.setState({
        loading : true
      })
      activitytpfrepService.fetchactivitytpfrep()
      .then((res) => {
          this.setState({loading:false})
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var list = filterstatus.map(function(areaaval) {
                    return  {label : areaaval.name ,value : (areaaval.id).toString()};
                 });  
                  this.setState({
                  activitydata :  list,
                  })
               }
              console.log(list,'activtyyyyy')
               })
               .catch((error) => { 
                  this.setState({
                      loading : false
                    })
               }); 
   }
   fetchhlclformatapi() {
      this.setState({
        loading : true
      })
      hlclformatService.fetchhlclformat()
      .then((res) => {
          this.setState({loading:false})
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var list = filterstatus.map(function(areaaval) {
                    return  {label : areaaval.name ,value : (areaaval.id).toString()};
                 });  
                  this.setState({
                      hlgldata :  list,
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
            const report_url ='tpfrep',
            menu= 'EPOS' , 
            submenu='TPFREP Productivity',
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
          activitydata,hlgldata,areadata} = this.state
        var columns= [
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
            title: onChangeLanguage(locale,'Mail Date Time',languageData),
            dataIndex: 'mail_datetime',
            key: 'mail_datetime',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {(text !== null && text !== '')  && moment(text).format('MM/DD/YYYY hh:mm:ss a')}
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Departure Date / Time',languageData),
            dataIndex: 'departure_datetime',
            key: 'departure_datetime',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {(text !== null && text !== '')  && moment(text).format('MM/DD/YYYY hh:mm:ss a')}
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Vessel Name',languageData),
            dataIndex: 'vessel_name',
            key: 'vessel_name',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
        
          {
            title: onChangeLanguage(locale,'SSY',languageData),
            dataIndex: 'ssy',
            key: 'ssy',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
              {text}   
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Schedule Voyage',languageData),
            dataIndex: 'schedule_voy',
            key: 'schedule_voy',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'DP Voyage',languageData),
            dataIndex: 'dp_voyage',
            key: 'dp_voyage',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Port',languageData),
            dataIndex: 'port',
            key: 'port',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'ETA',languageData),
            dataIndex: 'eta',
            key: 'eta',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Terminal',languageData),
            dataIndex: 'terminal',
            key: 'terminal',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'HLCL Format',languageData),
            dataIndex: 'hlgl_format',
            key: 'hlgl_format',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {getValue(hlgldata,'value','label',text)}   
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Region',languageData),
            dataIndex: 'area',
            key: 'area',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {getValue(areadata,'value','label',text)}   
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
            title: onChangeLanguage(locale,'SSY Class',languageData),
            dataIndex: 'ssy_class',
            key: 'ssy_class',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {text}              
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Dir',languageData),
            dataIndex: 'dir',
            key: 'dir',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {text}              
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'POL',languageData),
            dataIndex: 'pol',
            key: 'pol',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {text}              
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Departure Date',languageData),
            dataIndex: 'departure_date',
            key: 'departure_date',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {(text !== null && text !== '')  && moment(text).format('MM/DD/YYYY')}
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Departure Actual',languageData),
            dataIndex: 'departure_actual',
            key: 'departure_actual',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {text}              
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'POD',languageData),
            dataIndex: 'pod',
            key: 'pod',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {text}              
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Arrival Date',languageData),
            dataIndex: 'arrival_date',
            key: 'arrival_date',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {(text !== null && text !== '')  && moment(text).format('MM/DD/YYYY')}
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Arrival Actual',languageData),
            dataIndex: 'arrival_actual',
            key: 'arrival_actual',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {text}              
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Transit',languageData),
            dataIndex: 'transit',
            key: 'transit',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {text}              
              </div>),           
          },

          {
            title: onChangeLanguage(locale,'Booking Restr',languageData),
            dataIndex: 'booking_restr',
            key: 'booking_restr',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {text}              
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Auto Wo',languageData),
            dataIndex: 'auto_wo',
            key: 'auto_wo',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {text}              
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'VCO Phase',languageData),
            dataIndex: 'vco_phase',
            key: 'vco_phase',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {text}              
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Veseel Operator',languageData),
            dataIndex: 'vessel_operator',
            key: 'vessel_operator',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {text}              
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Valid state',languageData),
            dataIndex: 'valid_state',
            key: 'valid_state',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {text}              
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Port Departure Actual',languageData),
            dataIndex: 'port_departure_actual',
            key: 'port_departure_actual',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {text}              
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Port Arrival Actual',languageData),
            dataIndex: 'port_arrival_actual',
            key: 'port_arrival_actual',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {text}              
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Port Transit',languageData),
            dataIndex: 'port_transit',
            key: 'port_transit',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {text}              
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'PT',languageData),
            dataIndex: 'pt',
            key: 'pt',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {text}              
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Omit',languageData),
            dataIndex: 'omit',
            key: 'omit',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {text}              
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Call Sign',languageData),
            dataIndex: 'call_sign',
            key: 'call_sign',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {text}              
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Fcl Cutoff Date',languageData),
            dataIndex: 'fcl_cutoff_date',
            key: 'fcl_cutoff_date',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {(text !== null && text !== '')  && moment(text).format('MM/DD/YYYY')}
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Fcl Cutoff Time',languageData),
            dataIndex: 'fcl_cutoff_time',
            key: 'fcl_cutoff_time',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}  
             </div>),           
          },
          {
            title: onChangeLanguage(locale,'Port Authorities Export',languageData),
            dataIndex: 'port_authorities_export',
            key: 'port_authorities_export',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {text}              
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Port Authorities Import',languageData),
            dataIndex: 'port_authorities_import',
            key: 'port_authorities_import',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {text}              
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Event Code',languageData),
            dataIndex: 'eventcode',
            key: 'eventcode',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {text}              
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Late Early hrs',languageData),
            dataIndex: 'late_early_hrs',
            key: 'late_early_hrs',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {text}              
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Delay Reason',languageData),
            dataIndex: 'delay_reason',
            key: 'delay_reason',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {text}              
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Delay Remark',languageData),
            dataIndex: 'delay_remark',
            key: 'delay_remark',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {text}              
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Coastal Arr. Diff.',languageData),
            dataIndex: 'coastal_arr_dif',
            key: 'coastal_arr_dif',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {text}              
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Coastal Dep. Diff.',languageData),
            dataIndex: 'coastal_dep_dif',
            key: 'coastal_dep_dif',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {text}              
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'TPFREP Exp.',languageData),
            dataIndex: 'tpfrep_exp',
            key: 'tpfrep_exp',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {text}              
        </div>),           
          },
          {
            title: onChangeLanguage(locale,'TPFREP Rec.',languageData),
            dataIndex: 'tpfrep_rec',
            key: 'tpfrep_rec',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {text}  
              </div>),           
          },



          {
            title: onChangeLanguage(locale,'Start Date',languageData),
            dataIndex: 'start_time',
            key: 'start_time',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {(text !== null && text !== '')  && moment(text).format('MM/DD/YYYY hh:mm:ss a')}
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'End Date',languageData),
            dataIndex: 'end_time',
            key: 'end_time',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {(text !== null && text !== '')  && moment(text).format('MM/DD/YYYY hh:mm:ss a')}
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Tat',languageData),
            dataIndex: 'tat',
            key: 'tat',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Tat Status',languageData),
            dataIndex: 'tat_status',
            key: 'tat_status',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          }
        ]
        const pagination = {
          ...this.paginationOptions,
          total: this.state.total,
          current: this.state.page,
          pageSize: this.state.pageSize,
          };
        return (
            <>
            <title>{onChangeLanguage(locale,'TPFREP Productivity Raw Data',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'TPFREP Productivity Raw Data',languageData)} match={match} />
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

