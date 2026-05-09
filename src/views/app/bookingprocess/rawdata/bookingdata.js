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
import{reportService} from '../../../../redux/bookingprocess/report/saga'
import{activitytypeService} from '../../../../redux/vesselchartering/activitytype_vessle/saga';
import moment from 'moment';
import { Table,Tooltip } from 'antd';
import Select from 'react-select';
import DatePicker from "../../datePicker";
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../constants/defaultValues';
import{issuecodeService} from '../../../../redux/bookingprocess/issuecode/saga';
import{bookingstatusService} from '../../../../redux/bookingprocess/bookingstatus/saga'
import{exceptionpartyService} from '../../../../redux/bookingprocess/exceptionparty/saga'
import { getCurrentUser } from '../../../../helpers/Utils';

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
        activity_data:[],
        issuecode_data:[],
        exception_partydata:[],
        bookingstatusdata:[],
        is_submit:false,
        data:[],
        page:1,
        pageSize:25,
        total :0,
        days_value:'',
        teams_id:[],
        teams_name:[],
        count:0,
        usersList:[],
      };
      this.countRef = React.createRef();
    }
  
    componentDidMount()
    {
        this.fetchTeamData()
        this.fetchissie()
        this.fetchstatus()
        this.fetchexception()
        this.fetchUserData()
        const {username} = this.props
        var self = this;
        //  function 1 
        var newArray = ["ADMIN","KUMARNR","PHILIAS"];
        // if(newArray.includes(username) == true){
        //     const Hour = 60 * 60 * 1000;
        //       const currentDate = new Date();
        //       const firstCall = Hour - (currentDate.getMinutes() * 60 + currentDate.getSeconds()) * 1000 - currentDate.getMilliseconds();
        //     setTimeout(function() {
        //       var teamsGet = self.state.teams_id;
        //       setInterval(self.loadData(teamsGet),Hour)
        //     }, firstCall);
        //   }
        //  function 2
        // if(newArray.includes(username) == true){
        //     setInterval(function() {
        //       var teamsGet = self.state.teams_id;
        //       console.log(teamsGet)
        //       self.loadData(teamsGet)
        //     }, 60000);
        //   }
        var teamsGet = this.state.teams_id;
        console.log(teamsGet)

    }
    loadData(test) {
      var testTeam = test;
        userService.fetch_hierarchyuserData(test)
        .then((res) => { 
          if(res.status)
            {
              let filterstatus = (res.data).filter(item => item.is_active === 1)
              var list = []
              for(var i =0;i<filterstatus.length;i++)
              {
                  list.push(filterstatus[i].username)
              }
              this.setState({
                usersList :  list,
             
            })
            } 
            else
            {
              this.setState({
                user_data :  [],
                data:[],
               })
            } 
            var date = moment(new Date()).format('YYYY-MM-DD')
            var hour = moment().hour();
            var hourminus = hour - 1;
            var startHour  =  'T'+hourminus+':00:00.000Z';
            var endHour  =  'T'+hour +':00:00.000Z';
            const {username} = this.props             
            const report_url =  'booking';
            var menu= 'Booking Process' ; 
            var submenu='Booking Process';
            var type = 'Raw Data'
            var page = this.state.page;
            var per_page = this.state.pageSize;
            // var startdate = date + startHour;
            // var enddate = date + endHour;
            var startdate = "2023-06-22T12:00:00.000Z";
            var enddate = "2023-06-22T13:00:00.000Z";
            var user_data = list;
            var is_report = true;
            var team_id = "";
            var team = "";
            console.log(team_id)
            console.log(this.state.teams_name)
            this.loadReport(report_url,page,per_page,startdate,enddate,user_data,is_report,
              username,menu,submenu,team_id,team,type)
      })
   }

   loadReport(report_url,page,per_page,startdate,enddate,user_data,is_report,
    username,menu,submenu,team_id,team,type){
    reportService.fetchapiautodownload(report_url,page,per_page,startdate,enddate,user_data,is_report,
      username,menu,submenu,team_id,team,type)
    .then((res) => { 
      // this.setState({   
      //      loading : false   
      // }) 
      
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
           
          createNotification('Downloaded','success','filled')
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
   }
    fetchstatus() {
      this.setState({loading:true})
      bookingstatusService.fetchapi()
      .then((res) => {
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var statuslist = filterstatus.map(function(response) {
                    return  {label : response.name ,value : response.id.toString()};
                 });  
                  this.setState({
                  bookingstatusdata :  statuslist
                  })
                 
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})
   } 
   fetchexception() {
    this.setState({loading:true})
    exceptionpartyService.fetchapi()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = res.data
             var statuslist = filterstatus.map(function(response) {
                  return  {label : response.name ,value : response.id.toString()};
               });  
                this.setState({
                  exception_partydata :  statuslist
                })
               
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})
 } 
    fetchissie() {  
      this.setState({
        loading : true
      })
      issuecodeService.fetchapi()
        .then((res) => { 
          this.setState({   
        loading : false 
                
          }) 
          if(res.status)
            {
              let filterstatus = res.data
              var list = filterstatus.map(function(areaaval) {
                return  {id : (areaaval.id).toString(),
                area: areaaval.area,region: areaaval.region,team: areaaval.team,issue_code:areaaval.issue_code};
                }); 
              this.setState({ 
                issuecode_data:list  , 
                         
              }) 
            }   else
            {
              this.setState({ 
                data:[]  , 
                         
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
                 loading : true   
            }) 
            
            if(res.status)
              {
                let filterstatus = (res.data).filter(item => item.status === 1)
                
                var list = filterstatus.map(function(areaaval) {
                  return  {label : areaaval.name+'-'+areaaval.country_code ,value : (areaaval.id).toString(),name:areaaval.name};
                  });  
                   
                    let tmpArray = []
                    for (var i = 0; i < res.data.length; i++) {
                        tmpArray.push(String(res.data[i].id))
                    }             
                  
                    let tmpArray2 = []
                    for (var i = 0; i < res.data.length; i++) {
                      tmpArray2.push(String(res.data[i].name))
                    } 
                  this.setState({
                    team_data :  list,
                    teams_id :  tmpArray,
                    teams_name :  tmpArray2,
                })
                //this.loadData(tmpArray)
                //console.log(res.data)  
              }  
              
              
        })
        .catch((error) => { 
          this.setState({
            loading : false
          })
          });   
     }
     fetchUserData() {  
        this.setState({
          loading : false
        })
        var ProcessId = "12";
        userService.fetchuserDataProcesswise(ProcessId)
          .then((res) => { 
            this.setState({   
                 loading : false   
            }) 
            if(res.status)
              {
                
                let filterstatus = (res.data)
                var list = []
                for(var i =0;i<filterstatus.length;i++)
                {
                  
                    list.push(filterstatus[i])
                }

                   this.setState({
                       user_data :  list,
                   })
                   var {user_data} = this.state;
                   console.log(user_data) 
                
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
        if(enddate !== "" && startdate !== "")
        {
          console.log(startdate)
          console.log(enddate)
          if ((Date.parse(enddate) > Date.parse(startdate)))
           {
            // const team = getValue(team_data,'value','name',team_id)
            const team = "0";
            const team_id = "0";
            this.setState({
                loading : true,
                page:page,
                pageSize:per_page
            })
            const {username} = this.props
            const report_url =  'booking',
            menu= 'Booking Process' , 
            submenu='Booking Process',
            type = 'Raw Data'
            reportService.fetchapiprocesswise(report_url,page,per_page,startdate,enddate,user_data,is_report,
              username,menu,submenu,type)
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
        
    }
    onChangestarttime(date)
    {
      
      this.setState({startdate  : date,enddate:''})
     
    }
    
    onChangeendtime(date)
     {
       const {startdate,user_data} = this.state
       if(startdate !== '' && user_data !== '')
       {
        this.setState({enddate  : date})
        this.fetchPagination(1,25,startdate,date,false)
       }
       else
       {
        createNotification('Please Choose Start Date','error','filled');
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
          bookingstatusdata,exception_partydata} = this.state
        var columns= [
          {
            title: onChangeLanguage(locale,'GSC User Id',languageData),
            dataIndex: 'gsc_userid',
            key: 'gsc_userid',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'200px'}}>
                {text}
              </div>)
          },
          {
            title: onChangeLanguage(locale,'Start Time',languageData),
            dataIndex: 'start_time',
            key: 'start_time',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'200px'}}>
                {text !== '' ? moment(text).format('hh:mm:ss a') :''} 
              </div>)
          },
          {
            title: onChangeLanguage(locale,'End Time',languageData),
            dataIndex: 'end_time',
            key: 'end_time',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'200px'}}>
               {text !== '' ? moment(text).format('hh:mm:ss a') :''} 
              </div>)
          },
          {
            title:onChangeLanguage(locale,'CSB Office/Assigned user ID',languageData),
            dataIndex: 'csb_office',
            key: 'csb_office',
            render: (text, record,index) => ( 
              <div   style = {{padding:'2px',width:'200px'}}>
              {text}
              </div>),
          },
          {
              title: onChangeLanguage(locale,'Region',languageData),
              dataIndex: 'region',
              key: 'region',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                  {getValue(this.state.issuecode_data, 'id', 'region', text)}
                  </div>),
            },
            {
              title: onChangeLanguage(locale,'Area',languageData),
              dataIndex: 'area',
              key: 'area',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                 {getValue(this.state.issuecode_data, 'id', 'area', text)}
                </div>),
            },
            {
              title: onChangeLanguage(locale,'Sub Area',languageData),
              dataIndex: 'team',
              key: 'team',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                 {getValue(this.state.issuecode_data, 'id', 'team', text)}
                 
                </div>),
            },
            {
              title: onChangeLanguage(locale,'Booking Number',languageData),
              dataIndex: 'booking_number',
              key: 'booking_number',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'200px'}}>
                  {text}
                </div>)
            },
            
            // {
            //   title: onChangeLanguage(locale,'Assigned user ID',languageData),
            //   dataIndex: 'assigned_user',
            //   key: 'assigned_user',
            //   render: (text, record) => ( 
            //       <div className="row d-flex justify-content-center"  style = {{padding:'2px',width:'200px'}}>
            //         {text}
            //       </div>)
            // },
            {
              title: onChangeLanguage(locale,'CU Match Code',languageData),
              dataIndex: 'cu_matchcode',
              key: 'cu_matchcode',
              render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>{text}
                  </div>)
            },
              {
                title:onChangeLanguage(locale,'MR Match Code',languageData) ,
                dataIndex: 'mr_matchcode',
                key: 'mr_matchcode',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                    {text}
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'ABC/Non ABC',languageData) ,
                dataIndex: 'abc_nonabc',
                key: 'abc_nonabc',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                    {text}
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Export Haulage',languageData) ,
                dataIndex: 'export_haulage',
                key: 'export_haulage',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                    {text}
                  </div>),
              },
             
              {
                title:onChangeLanguage(locale,'Received Date',languageData) ,
                dataIndex: 'received_date',
                key: 'received_date',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                     {text !== '' ? moment(text).format('MM/DD/YYYY hh:mm:ss a') :''} 
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Function',languageData) ,
                dataIndex: 'functions',
                key: 'functions',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                    {text}
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Cargo Type',languageData) ,
                dataIndex: 'cargo_type',
                key: 'cargo_type',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                    {text}
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Tariff ID',languageData) ,
                dataIndex: 'tariff_id',
                key: 'tariff_id',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                    {text}
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'No of Roll Overs',languageData) ,
                dataIndex: 'no_of_roll',
                key: 'no_of_roll',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                    {text}
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Booking Status',languageData) ,
                dataIndex: 'booking_status',
                key: 'booking_status',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                    {getValue(bookingstatusdata, 'value', 'label', text)} 
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Exception party',languageData) ,
                dataIndex: 'exception_party',
                key: 'exception_party',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                     {getValue(exception_partydata, 'value', 'label', text)} 
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Exception Raised Date & Time',languageData) ,
                dataIndex: 'exception_raised_date',
                key: 'exception_raised_date',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                   {text !== '' ? moment(text).format('MM/DD/YYYY hh:mm:ss a') :''} 
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'CRM Case Number',languageData) ,
                dataIndex: 'case_number',
                key: 'case_number',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                    {text}
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Exception Reason',languageData) ,
                dataIndex: 'reasons',
                key: 'reasons',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                    {text}
                  </div>),
              },
              // {
              //   title:onChangeLanguage(locale,'Last POD',languageData) ,
              //   dataIndex: 'last_pod',
              //   key: 'last_pod',
              //   render: (text, record) => ( 
              //     <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
              //       {text}
              //     </div>),
              // },
              // {
              //   title:onChangeLanguage(locale,'End POD',languageData) ,
              //   dataIndex: 'end_pod',
              //   key: 'end_pod',
              //   render: (text, record) => ( 
              //     <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
              //       {text}
              //     </div>),
              // },
              {
                title:onChangeLanguage(locale,'Comments',languageData) ,
                dataIndex: 'comments',
                key: 'comments',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
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
            <title>{onChangeLanguage(locale,'Booking Data',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'Booking Data',languageData)} match={match} />
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
                                {/* <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Team',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                        <Select  className={is_submit === true && team_id === ''?  "error-border-select":"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={team_data.filter(option =>option.value === team_id)}
                                            options={team_data}
                                            onChange={(option) => this.onChangeTeam(option.value)}
                                        />
                                </div> */}
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
                               {/* <Button className = "button-width" color="secondary" 
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
                                >{onChangeLanguage(locale,'Refresh',languageData)}</Button>  */}
                                  
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

