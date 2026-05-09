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
import{reportService} from '../../../../redux/FeedersSchedules/report/saga'
import moment from 'moment';
import { Table,Tooltip } from 'antd';
import Select from 'react-select';
import DatePicker from "../../datePicker";
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../constants/defaultValues';
import{SupportteamService} from '../../../../redux/projectmasters/supportteammaster/saga'
import{subactivityService} from '../../../../redux/FeedersSchedules/feedermaster/subactivity/saga';
import{vesselService} from '../../../../redux/FeedersSchedules/feedermaster/vesseloperator/saga';
import{requestService} from '../../../../redux/FeedersSchedules/feedermaster/requesttype/saga';
import{ActivityselectionService} from '../../../../redux/FeedersSchedules/feedermaster/activityselection/saga';
import{regionService} from '../../../../redux/FeedersSchedules/feedermaster/region/saga';
import{AreaselectionService} from '../../../../redux/FeedersSchedules/feedermaster/areaselection/saga';
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
        activityselectiondata:[],
        regiondata:[],
        vesseloperatordata:[],
        subactivitydata:[],
        requesttypedata:[],
        areaselectiondata:[],
      };
    }
    componentDidMount()
    {
        this.fetchTeamData()
        this.fetchteam()
        this.fetchsubactivity()
        this.fetchvessel()
        this.fetchactivityselection()
        this.fetchregion()
        this.fetchareaselection()
        this.fetchrequest()
  }
  fetchsubactivity() {
    subactivityService.fetchsubactivity()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var rolelist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
               });  
                this.setState({
                subactivitydata :  rolelist,
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
  } 
  fetchvessel() {
    vesselService.fetchvessel()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var rolelist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
               });  
                this.setState({
                vesseloperatordata :  rolelist,
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
  } 
  
fetchactivityselection() {
    this.setState({loading:true})
    ActivityselectionService.fetchactivityselection()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                activityselectiondata :  regionlist
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
    regionService.fetchregion()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var typelist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString(),
                  start_time:cusmaidid.start_time,end_time:cusmaidid.end_time};
               });
                this.setState({
                  regiondata :  typelist
                })
               
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})
 }  
 fetchrequest() {
    requestService.fetchrequest()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var rolelist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
               });  
                this.setState({
                requesttypedata :  rolelist,
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
  } 
  
  fetchareaselection() {
    AreaselectionService.fetchareaselection()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var rolelist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
               });  
                this.setState({
                areaselectiondata :  rolelist,
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
  } 
  fetchteam() {
    this.setState({loading:true})
    SupportteamService.fetchsupportteam()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                teamdata :  regionlist
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
            const menu= 'Feeder Schedules' , 
            report_url ='feeder' ,
            submenu='Feeder Schedules',
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
    let end_date=convertLocalToUTCDate(new Date())
    this.setState({
      startdate:new Date(finalDate),
      enddate:end_date
    })
    this.fetchPagination(1,25, new Date(finalDate),end_date,false)
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
          teamdata,areaselectiondata,activityselectiondata,regiondata,vesseloperatordata,subactivitydata,requesttypedata,
          errortypedata,sourcedata} = this.state
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
            title: onChangeLanguage(locale,'Start Date / Time',languageData),
            dataIndex: 'start_datetime',
            key: 'start_datetime',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text !== '' ? moment(text).format('MM/DD/YYYY hh:mm:ss a') :''}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Location',languageData),
            dataIndex: 'activity_selection',
            key: 'activity_selection',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {getValue(activityselectiondata,'value','label',text)}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Activity',languageData),
            dataIndex: 'subactivity',
            key: 'subactivity',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {getValue(subactivitydata,'value','label',text)}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Region',languageData),
            dataIndex: 'region',
            key: 'region',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {getValue(regiondata,'value','label',text)}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Area Selection',languageData),
            dataIndex: 'area_selection',
            key: 'area_selection',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {getValue(areaselectiondata,'value','label',text)}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Vessel Operator',languageData),
            dataIndex: 'vessel_operator',
            key: 'vessel_operator',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {getValue(vesseloperatordata,'value','label',text)}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Dp Voyage',languageData),
            dataIndex: 'dp_voyage',
            key: 'dp_voyage',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Request Type',languageData),
            dataIndex: 'request_type',
            key: 'request_type',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {getValue(requesttypedata,'value','label',text)}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Schedule Volume Counts',languageData),
            dataIndex: 'schedule',
            key: 'schedule',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Mail Received Start Date / Time',languageData),
            dataIndex: 'received_datetime',
            key: 'received_datetime',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text !== '' && text !== 'Invalid date'? moment(text).format('MM/DD/YYYY hh:mm:ss a') :''}  
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'TAT',languageData),
            dataIndex: 'tat',
            key: 'tat',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text !=='NaN:NaN:NaN' ? text:''}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Mail Sent Date/ Time',languageData),
            dataIndex: 'sent_datetime',
            key: 'sent_datetime',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text !== '' && text !== 'Invalid date'? moment(text).format('MM/DD/YYYY hh:mm:ss a') :''}  
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'End Date/ Time',languageData),
            dataIndex: 'end_datetime',
            key: 'end_datetime',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text !== '' ? moment(text).format('MM/DD/YYYY hh:mm:ss a') :''}  
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Week Number',languageData),
            dataIndex: 'week_number',
            key: 'week_number',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text }  
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Month',languageData),
            dataIndex: 'month',
            key: 'month',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text }  
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
        ]
        const pagination = {
          ...this.paginationOptions,
          total: this.state.total,
          current: this.state.page,
          pageSize: this.state.pageSize,
          };
        return (
            <>
            <title>{onChangeLanguage(locale,'Feeder Schedules Raw Data',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'Feeder Schedules Raw Data',languageData)} match={match} />
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

