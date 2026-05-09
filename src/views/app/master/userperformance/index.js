import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
// import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import {onChangeLanguage,getValue,convertLocalToUTCDate,getTimeDifference} from '../../../../helper'
import{teamsService} from '../../../../redux/teams/saga'
import{userService} from '../../../../redux/users/saga'
import moment from 'moment';
// import { Table,Tooltip,Checkbox,Popconfirm  } from 'antd';
import Select from 'react-select';
import DatePicker from "../../datePicker";
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../constants/defaultValues';
import{teamService} from '../../../../redux/Export/masters/exportteam/saga'
import{usercountService} from '../../../../redux/usercount/saga'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import {  TableContainer,Paper,Table,TableHead,TableRow,TableCell,TableBody,IconButton,Collapse,Box } from '@mui/material';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { Doughnut } from "react-chartjs-2";
// import Card from 'react-bootstrap/Card';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip';
import { CSVLink, CSVDownload } from "react-csv";
import { Tabs, Tab } from 'react-bootstrap';
import CloudPopup from "../CloudPopup";

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        start_datetime:'',
        enddate:'',
        team_id:'',
        report:'',
        team_data:[],
        user_data:[],
        is_submit:false,
        data:[],
        performance_data:[],
        datamanager:[],
        datadirector:[],
        originalData:[],
        page:1,
        pageSize:150,
        total :0,
        days_value:'',
        teamdata:[],
        tldata:[],
        tlname:'',
        week_no:'',
        week:'',
        submit_column:false,
        selectedRowKeys: [],
        // attendance:'',
        sundayChecked: false,
        mondayChecked: false,
        tuesdayChecked: false,
        wednesdayChecked: false,
        thursdayChecked: false,
        fridayChecked: false,
        saturdayChecked: false,
        isAllChecked: false,
        attendance: 'PP',
        attendance: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        leavedays:'',
        attendance_date:'',
        date:'',
        week_value: "",
        producitivity:'',
        totalcounts:'',
        user_role:'',
        openRows: {},
        week_data:[],
        month_data:[],
        month:'',
        user_productivity:'0',
        user_accuracy:'0',
        user_targetunits:'0',
        user_achievedunits:'0',
        user_totalcounts:'0',
        user_eqtarget:'0',
        user_presentdays:'0',
        user_errors:'0',
        user_internalerror:'0',
        user_externalerror:'0',
        user_errorcode:'',
        user_nonproductivityprocess:'0',
        user_nonproductivitynonprocess:'0',
        user_errorwithsensitivity:'0',
        user_errorwithoutsensitivity:'0',
        user_nonproductivitypendingprocess:'0',
        user_nonproductivityapprovedprocess:'0',
        user_nonproductivityrejectedprocess:'0',
        user_nonproductivitypendingnonprocess:'0',
        user_nonproductivityapprovednonprocess:'0',
        user_nonproductivityrejectednonprocess:'0',
        user_dailytargetunits:'0',
        user_dailyachievedunits:'0',
        user_monthlytargetunits:'0',
        user_monthlyachievedunits:'0',
        hovered: false,
        downloadexcelData:[],
        downloadexcelMonthlyData:[],
        activeTab: 'hourly',
      };
      this.handleRowClick = this.handleRowClick.bind(this);
    }
    componentDidMount()
    { 
      this.setState({
        start_datetime:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
    })
        this.fetchTeamData()
        this.fetchuserperformance()
        this.fetchWeekData();
        // this.fetchPerformanceData()
        this.getAllMonths()
        
    }


    getAllMonths = () => {
      this.setState({loading:true})
      const months = [];
      const currentYear = new Date().getFullYear();
    
      for (let month = 0; month < 12; month++) {
        const startDate = new Date(currentYear, month, 1);
        const endDate = new Date(currentYear, month + 1, 0);
        const formattedStartDate = `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`;
        const formattedEndDate = `${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}`;
    
        const monthName = startDate.toLocaleString('default', { month: 'long' });
        months.push({
          label: `${monthName} ${currentYear}`, 
          value: `(${formattedStartDate} - ${formattedEndDate})`,
        });
      }
    
      this.setState({
        month_data: months,
        loading:false
      });
    
      return months;
    };
    
    
    handleTabSelect = (selectedTab) => {
      this.setState({ activeTab: selectedTab });
    };
    fetchWeekData() {
      this.setState({ loading: true });
      let weekNumbers = this.generateWeekNumbers();
  
      this.setState({
        loading: false,
        week_data: weekNumbers,
      });
    }
  
    generateWeekNumbers() {
      let currentDate = new Date();
      let currentYear = currentDate.getFullYear();
      let weekNumbers = [];
      for (let i = 1; i <= 52; i++) { 
          let weekStartDate = this.getWeekStartDate(currentYear, i);
          let weekEndDate = new Date(weekStartDate.getTime() + (6 * 24 * 60 * 60 * 1000));
          let weekLabel = `Week ${i} (${weekStartDate.toLocaleDateString()} - ${weekEndDate.toLocaleDateString()})`;
    
          weekNumbers.push({ label: weekLabel, value: weekLabel });
      }
    
      return weekNumbers;
    }
    
    getWeekStartDate(year, weekValue) {
      let januaryFirst = new Date(year, 0, 1);
      let daysOffset = januaryFirst.getDay();
      let startDate = new Date(januaryFirst.getTime() + (weekValue - 1) * 7 * 24 * 60 * 60 * 1000);
      if (daysOffset !== 0) {
          startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
      }
    
      return startDate;
    }
    onChangeMonth = (selectedValue, currentMonth, monthData) => {
      const selectedMonth = monthData.find(option => option.value === selectedValue);
      // const {username} = this.props
      const username = localStorage.getItem('username');
      if (selectedMonth) {
        this.setState({
          month: selectedValue, 
          month_label: selectedMonth.label, 
        });
      } else {
        this.setState({
          month: null,
          month_label: null,
        });
      }
      if(username !== '' && selectedValue !== ''){
        this.setState({loading:true})
        usercountService.fetchuserperformaneweekly(username, selectedValue)
        .then((res) => {
            this.setState({ loading: false });
    
            if (res.status) { 
                
                if (Array.isArray(res.datas)) {
                    const userProductivity = res.datas.map(productivityData => ({
                        user_targetunits: parseFloat(productivityData.target_Units) || 0,
                        user_achievedunits: parseFloat(productivityData.total_Units_with_NP) || 0,
                    }));
    
                    const totalUserTargetUnits = userProductivity.reduce(
                        (sum, item) => sum + item.user_targetunits, 
                        0
                    ).toFixed(2);
    
                    const totalUserAchievedUnits = userProductivity.reduce(
                        (sum, item) => sum + item.user_achievedunits, 
                        0
                    ).toFixed(2);
    
                    this.setState({
                        user_monthlytargetunits: totalUserTargetUnits,
                        user_monthlyachievedunits: totalUserAchievedUnits,
                    });
    
                    // Map data for download
                    const userProductivitys = res.datas.map(productivityData => {
                      const targetUnits = productivityData.target_Units || 0; 
                      const totalUnits = productivityData.total_Units_with_NP || 0; 
                    
                      return {
                        UserId: productivityData.user_Name,
                        TargetUnits: targetUnits,
                        PresentDays: productivityData.present_Working_days,
                        AchievedUnits: productivityData.total_Units,
                        NonProductivityProcess: productivityData.non_Productive_Units_process,
                        NonProductivityNonProcess: productivityData.non_Productive_Units_nonprocess,
                        TotalUnits: totalUnits,
                        TotalCounts: productivityData.total_Counts,
                        Error: productivityData.errors,
                        Productivity: targetUnits > 0
                        ? `${((totalUnits / targetUnits) * 100).toFixed(2)}` // Append '%' to the calculated value
                        : "0.00",
                        Accuracy: productivityData.accuracy,
                        CapacityUtilization: targetUnits > 0
                          ? `${((totalUnits / targetUnits) * 100).toFixed(2)}%` 
                          : "0.00%", 
                      };
                    });
                    
                    this.setState({ downloadexcelMonthlyData: userProductivitys });
                    
                } else {
                    console.error("res.datas is not an array");
                }
            } else {
                console.error("Error in response status");
            }
        })
        .catch((error) => {
            console.error("Error in API call:", error);
            this.setState({ loading: false });
        });
    
      }
    };
    
  onChangeWeek(value) {
    // const {username} = this.props
    const username = localStorage.getItem('username');
    this.setState({ week_no: value});
    
    if(username !== '' && value !== ''){
      this.setState({ loading: true });
      usercountService.fetchuserperformaneweekly(username,value)
      .then((res) => {
        this.setState({loading:false})
        if (res.status) { 
          this.setState({performance_data:res.data});
          const userProductivity = res.data.map(productivityData => ({
              user_productivity: productivityData.productivity,
              user_accuracy: productivityData.accuracy,
              user_targetunits:productivityData.target_Units,
              user_achievedunits:productivityData.total_Units_with_NP,
              user_totalcounts:productivityData.total_Counts,
              user_eqtarget:productivityData.eQ_Target,
              user_internalerror:productivityData.internal_error,
              user_externalerror:productivityData.external_error,
              user_presentdays:productivityData.present_Working_days,
              user_errors:productivityData.errors,
              user_errorcode:productivityData.error_code,
              user_errorwithsensitivity:productivityData.error_withsensitivity,
              user_errorwithoutsensitivity:productivityData.error_withoutsensitivity,
              user_nonproductivityprocess:productivityData.non_Productive_Units_process,
              user_nonproductivitynonprocess:productivityData.non_Productive_Units_nonprocess,
              user_nonproductivitypendingprocess:productivityData.non_pending_process,
              user_nonproductivityapprovedprocess:productivityData.non_approved_process,
              user_nonproductivityrejectedprocess:productivityData.non_rejected_process,
              user_nonproductivitypendingnonprocess:productivityData.non_pending_non_process,
              user_nonproductivityapprovednonprocess:productivityData.non_approved_non_process,
              user_nonproductivityrejectednonprocess:productivityData.non_rejected_non_process,
          }));

          if (res.datas) {
            const userProductivitys = res.datas.map(productivityData => {
              const targetUnits = productivityData.target_Units || 0; // Fallback to 0 if undefined
              const totalUnits = productivityData.total_Units_with_NP || 0; // Fallback to 0 if undefined
          
              return {
                UserId: productivityData.user_Name,
                TargetUnits: targetUnits,
                AchievedUnits: productivityData.total_Units,
                PresentDays: productivityData.present_Working_days,
                NonProductivityProcess: productivityData.non_Productive_Units_process,
                NonProductivityNonProcess: productivityData.non_Productive_Units_nonprocess,
                TotalUnits: totalUnits,
                TotalCounts: productivityData.total_Counts,
                Error: productivityData.errors,
                // Productivity: productivityData.productivity,
                Productivity: targetUnits > 0
                ? `${((totalUnits / targetUnits) * 100).toFixed(2)}` // Append '%' to the calculated value
                : "0.00",
                Accuracy: productivityData.accuracy,
                CapacityUtilization: targetUnits > 0
                  ? `${((totalUnits / targetUnits) * 100).toFixed(2)}%` // Append '%' to the calculated value
                  : "0.00%" // Default to "0.00%" if TargetUnits is 0
              };
            });
          
            this.setState({ downloadexcelData: userProductivitys });
          }
          
          
          
      
          this.setState({
              user_productivity: userProductivity[0].user_productivity,
              user_accuracy: userProductivity[0].user_accuracy,
              user_targetunits: userProductivity[0].user_targetunits,
              user_achievedunits: userProductivity[0].user_achievedunits,
              user_totalcounts: userProductivity[0].user_totalcounts,
              user_eqtarget: userProductivity[0].user_eqtarget,
              user_internalerror : userProductivity[0].user_internalerror,
              user_externalerror : userProductivity[0].user_externalerror,
              user_presentdays: userProductivity[0].user_presentdays,
              user_errors: userProductivity[0].user_errors,
              user_errorcode: userProductivity[0].user_errorcode,
              user_errorwithsensitivity: userProductivity[0].user_errorwithsensitivity,
              user_errorwithoutsensitivity: userProductivity[0].user_errorwithoutsensitivity,
              user_nonproductivityprocess: userProductivity[0].user_nonproductivityprocess,
              user_nonproductivitynonprocess: userProductivity[0].user_nonproductivitynonprocess,
              user_nonproductivitypendingprocess: userProductivity[0].user_nonproductivitypendingprocess,
              user_nonproductivityapprovedprocess: userProductivity[0].user_nonproductivityapprovedprocess,
              user_nonproductivityrejectedprocess: userProductivity[0].user_nonproductivityrejectedprocess,
              user_nonproductivitypendingnonprocess: userProductivity[0].user_nonproductivitypendingnonprocess,
              user_nonproductivityapprovednonprocess: userProductivity[0].user_nonproductivityapprovednonprocess,
              user_nonproductivityrejectednonprocess: userProductivity[0].user_nonproductivityrejectednonprocess,
          });
      }
            
             })
             .catch((error) => { 
                this.setState({
                    loading : false
                  })
             });
    }
  
 
  }
    fetchuserperformance() {
      // const {username} = this.props
      
      this.setState({
          loading : true
        })
        
        const username = localStorage.getItem('username');
        userService.fetchuserperformance(username)
      .then((res) => {
          this.setState({loading:false})
         if(res)   {  
          
          if (res.role == "manager") {
            // console.log("Manager",res.role)
            const newData = [];
            const groupedData = {};
            
          
            res.datamanager.forEach(({ teamLeader, username, userFullName, dateHour, eqvalue }, index) => {
              const teamLeaderKey = `${teamLeader.username}-${teamLeader.name}`;
              
              if (!groupedData[teamLeaderKey]) {
                groupedData[teamLeaderKey] = {
                  teamLeader: { username: teamLeader.username, name: teamLeader.name },
                  users: {}
                };
                newData.push(groupedData[teamLeaderKey]);
              }
          
              if (!groupedData[teamLeaderKey].users[username]) {
                groupedData[teamLeaderKey].users[username] = {
                  username,
                  userFullName,
                  hours: {}
                };
              }
          
              groupedData[teamLeaderKey].users[username].hours[`dateHour${dateHour}`] = dateHour;
              groupedData[teamLeaderKey].users[username].hours[`eqvalue${dateHour}`] = eqvalue;
            });
            const transformedData = newData.map(team => {
              const users = Object.values(team.users).map(user => ({
                username: user.username,
                userFullName: user.userFullName, 
                ...user.hours
              }));
              return {
                teamLeader: team.teamLeader,
                users
              };
            });
            this.setState({
              user_role: res.role,
              datamanager: transformedData,
              data: transformedData,
            });
          }
          
            
          
            else if (res.role === "director") {
              // console.log("director",res.role)
              const newData = [];
              const groupedData = {};
              
              if (Array.isArray(res.datadirector)) {
                res.datadirector.forEach(manager => {
                  const managerUserName = manager.manager.username;
                  const managerName = manager.manager.name;
                  
                  if (!managerUserName) {
                    return;
                  }
              
                  if (!groupedData[managerUserName]) {
                    groupedData[managerUserName] = {
                      manager: managerUserName,
                      managername:managerName,
                      teamLeaders: {}
                    };
                    newData.push(groupedData[managerUserName]);
                  }
                  
                  if (Array.isArray(manager.teamLeaders)) {
                    manager.teamLeaders.forEach(teamLeader => {
                      
                      const teamLeaderUserName = teamLeader.TeamLeader || teamLeader.teamLeader;
                      if (!teamLeaderUserName) {
                        return;
                      }
                      
                      if (!groupedData[managerUserName].teamLeaders[teamLeaderUserName.username]) {
                        const totalEqvalue = teamLeader.TotalEqvalue || 0;
                        const totalCount = teamLeader.TotalCount || 0;
                        const productivity = teamLeader.Productivity || 0;
              
                        groupedData[managerUserName].teamLeaders[teamLeaderUserName.username] = {
                          teamLeader: teamLeaderUserName.username,
                          teamLeadername: teamLeaderUserName.name,
                          totalEqvalue,
                          totalCount,
                          productivity,
                          users: []
                        };
                      }
                      
                      if (Array.isArray(teamLeader.users)) {
                        
                        groupedData[managerUserName].teamLeaders[teamLeaderUserName.username].users = teamLeader.users.map(user => {
                          
                          const userData = Array.isArray(user.userData) ? user.userData.reduce((acc, ud) => {
                            acc[`date${ud.Date}_hour${ud.Hour}`] = {
                              eqvalue: ud.Eqvalue,
                              count: ud.Count
                            };
                            return acc;
                          }, {}) : {};
                          
                          return {
                            username: user.username,
                            name: user.name,
                            data: user.userData
                          };
                        });
                      } else {
                      }
                    });
                  } else {
                  }
                });
              } else {
              }
              
            
              const transformedData = newData.map(manager => {
                
                const teamLeaders = Object.values(manager.teamLeaders).map(teamLeader => ({
                  teamLeader: teamLeader.teamLeader,
                  teamLeadername: teamLeader.teamLeadername,
                  totalEqvalue: teamLeader.totalEqvalue,
                  totalCount: teamLeader.totalCount,
                  productivity: teamLeader.productivity,
                  users: teamLeader.users
                }));
                return {
                  manager: manager.manager,
                  managername:manager.managername,
                  teamLeaders
                };
              });
              
              
              
              this.setState({
                user_role: res.role,
                datadirector: transformedData,
                data: transformedData,
              });
          }
          else if(res.role == 'supervisor'){
            // console.log("supervisor",res.role)
            const newData = [];
                const groupedData = {};
                const tablearray = [];
                res.data.forEach(({ username, dateHour, eqvalue }, index) => {
                  if (!groupedData[username]) {
                    groupedData[username] = {
                      username,
                    };
                    newData.push(groupedData[username]);
                  }

                  groupedData[username][`dateHour${dateHour}`] = dateHour;
                  groupedData[username][`eqvalue${dateHour}`] = eqvalue;
                });
                var counts = newData.length;
                const uniqueUsers = [...new Set(res.data.map(item => item.username))];
            const userCount = uniqueUsers.length;

            // Calculate total eqvalue
            const totalEqValue = res.data.reduce((sum, item) => sum + item.eqvalue, 0);
            let targetEQ = userCount * 48;
            let achievedEQ = totalEqValue;
            let Capacity = ((achievedEQ / targetEQ) * 100).toFixed(2);

              this.setState({
                total:counts,
                data:newData,
                producitivity:res.producitivity,
                totalcounts:res.totalcounts,
                tldata:res.tlname,
                user_role:res.role,
                exceldata:tablearray,
                user_dailytargetunits : targetEQ,
                user_dailyachievedunits : achievedEQ,
              })
            
          }
            else{
              // console.log("user",res.role)
                const newData = [];
                const groupedData = {};
                const tablearray = [];
                res.data.forEach(({ username, dateHour, eqvalue }, index) => {
                  if (!groupedData[username]) {
                    groupedData[username] = {
                      username,
                    };
                    newData.push(groupedData[username]);
                  }

                  groupedData[username][`dateHour${dateHour}`] = dateHour;
                  groupedData[username][`eqvalue${dateHour}`] = eqvalue;
                });
                var counts = newData.length;
              this.setState({
                total:counts,
                data:newData,
                producitivity:res.producitivity,
                totalcounts:res.totalcounts,
                tldata:res.tlname,
                user_role:res.role,
                exceldata:tablearray
              })
            }
                  
               }else{
                let filterstatus = res.tlname;
                var list = filterstatus.map(function(username) {
                  return  { label: username, value: username.toString() };
                });
                
                this.setState({
                  tldata: list,
                  user_role:res.role
                });
               }
              
               })
               .catch((error) => { 
                  this.setState({
                      loading : false
                    })
               }); 
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



   
    clearValue()
    {
        this.setState({
          start_datetime:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
            startdate:'',
            enddate:'',
            team_id:'',
            user_data:[],
            data:[],
            is_submit:false,
            week:'',
            week:'',
            week_value:'',
            tlname:'',
        })
    }


    fetchPerformanceData() {  
      this.setState({
        loading : true
      })
      // const {username} = this.props
      const username = localStorage.getItem('username');
      userService.fetchuserperformance(username)
    .then((res) => {
        this.setState({loading:false})
       if(res.status)   {
                  const newData = [];
                  const groupedData = {};
                  const tablearray = [];
                  res.data.forEach(({ username, dateHour, eqvalue }, index) => {
                    if (!groupedData[username]) {
                      groupedData[username] = {
                        username,
                      };
                      newData.push(groupedData[username]);
                    }

                    groupedData[username][`dateHour${dateHour}`] = dateHour;
                    groupedData[username][`eqvalue${dateHour}`] = eqvalue;
                  });
               
                  var counts = newData.length;
                this.setState({
                  total:counts,
                  data:newData,
                  producitivity:res.producitivity,
                  totalcounts:res.totalcounts,
                  // tldata:res.tlname,
                  exceldata:tablearray
                })
             }
            
             })
             .catch((error) => { 
                this.setState({
                    loading : false
                  })
             }); 
   }



    

    onChangeTL(value) {
      this.setState({ tlname: value });
      this.setState({
        loading : true
      })
      userService.fetchuserperformance(value)
    .then((res) => {
        this.setState({loading:false})
       if(res.status)   {
                  const newData = [];
                  const groupedData = {};
                  const tablearray = [];
                  res.data.forEach(({ username, dateHour, eqvalue }, index) => {
                    if (!groupedData[username]) {
                      groupedData[username] = {
                        username,
                      };
                      newData.push(groupedData[username]);
                    }

                    groupedData[username][`dateHour${dateHour}`] = dateHour;
                    groupedData[username][`eqvalue${dateHour}`] = eqvalue;
                  });
               
                  var counts = newData.length;
                this.setState({
                  total:counts,
                  data:newData,
                  producitivity:res.producitivity,
                  totalcounts:res.totalcounts,
                  // tldata:res.tlname,
                  exceldata:tablearray
                })
             }
            
             })
             .catch((error) => { 
                this.setState({
                    loading : false
                  })
             });
    }

    handleRowClicks(level, index) {
      this.setState(prevState => ({
        openRows: {
          ...prevState.openRows,
          [`${level}-${index}`]: !prevState.openRows[`${level}-${index}`],
        }
      }));
    }
    handleRowClick = (index) => {
      this.setState((prevState) => ({
        openRows: {
          ...prevState.openRows,
          [index]: !prevState.openRows[index]
        }
      }));
    };


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
    handleMouseEnter = () => {
      this.setState({ hovered: true });
    }
  
    handleMouseLeave = () => {
      this.setState({ hovered: false });
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
    alert(finalDate)
    if(team_id !== '')
    {
    this.setState({
      startdate:new Date(finalDate),
      enddate:convertLocalToUTCDate(new Date())
    })
    // this.fetchPagination(1,25, new Date(finalDate),convertLocalToUTCDate(new Date()),false)
    }
    else
    {
    createNotification('Please Choose Team','error','filled');
    }
    
    }
     cardStyle = {
      width: '100%',
      borderRadius: '10px',
      height: '120px',
      marginBottom: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      backgroundColor: '#F8F9FA', // Light gray background
      border: '1px solid #CED4DA', // Light border
      transition: 'box-shadow 0.3s ease-in-out',
    };

     cardTitleStyle = {
      textAlign: 'center',
      fontSize: '1.2em',
      color: '#333',
      marginBottom: '10px',
    };

     cardValueStyle = {
      fontSize: '2em',
      fontWeight: 'bold',
      color: '#555',
      marginBottom: '0',
    };
    render()
    {
        const {match,locale,languageData,} = this.props
        const {enddate,startdate,team_id,team_data,is_submit,loading,data,page,pageSize,tlname,producitivity,totalcounts,user_role,datamanager,openRows,groupedData,datadirector,
          filteredData,user_productivity,user_accuracy,user_targetunits,user_achievedunits,user_errors,user_presentdays,user_eqtarget,user_totalcounts,teamdata,user_internalerror,user_externalerror,
          user_nonproductivitynonprocess,user_nonproductivityprocess,user_errorwithsensitivity,user_errorwithoutsensitivity,week_data,week_no,month_data,month,cardStyle,cardTitleStyle ,cardValueStyle ,
          user_nonproductivitypendingprocess,user_nonproductivitypendingnonprocess,user_nonproductivityapprovedprocess,user_nonproductivityapprovednonprocess,user_nonproductivityrejectedprocess,
          user_nonproductivityrejectednonprocess,submit_column,selectedRowKeys,attendance,isAllChecked,attendance_date,start_datetime,tldata,downloadexcelData,downloadexcelMonthlyData,
          handleMouseEnter,handleMouseLeave,user_errorcode,hovered,performance_data,activeTab,user_dailytargetunits,user_dailyachievedunits,user_monthlytargetunits,user_monthlyachievedunits  } = this.state

          const tooltipContent = `
          <div style="text-align: center;">
            <h1 style="font-size: 1.2em; color: #FFF; margin: 0;">Error Code</h1>
            <p style="font-size: 1em; color: #FFF; margin: 0;">${user_errorcode}</p>
          </div>
        `;
          const chartData1 = [user_productivity, 300 - user_productivity]; 
          const showData1 = chartData1[0] + "%"; 

          const datas1 = {
            // labels: ["Red", "Green"], // Labels for the chart segments
            datasets: [
              {
                data: chartData1, 
                backgroundColor: ["#003060", "#C2E2F5"], 
              },
            ],
          };
          
          const options1 = {
            responsive: true,
            legend: {
              display: false,
              position: 'bottom',
              labels: {
                fontSize: 18,
                fontColor: '#6D7278',
                fontFamily: 'kanit light',
              },
            },
            animation: {
              animateScale: true,
              animateRotate: true,
            },
            plugins: {
              beforeDraw: (chart) => {
                const ctx = chart.ctx;
                const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
                const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

                ctx.save();
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = 'bold 24px Arial'; 
                ctx.fillText(showData1, centerX, centerY);
                ctx.restore();
              },
            },
          };

          const chartData2 = [user_accuracy, 100 - user_accuracy]; 
          const showData = chartData2[0] + "%"; 

          const datas2 = {
            datasets: [
              {
                data: chartData2, 
                backgroundColor: ["#003060", "#C2E2F5"],
              },
            ],
          };
          
          const options2 = {
            responsive: true,
            legend: {
              display: false,
              position: 'bottom',
              labels: {
                fontSize: 18,
                fontColor: '#6D7278',
                fontFamily: 'kanit light',
              },
            },
            animation: {
              animateScale: true,
              animateRotate: true,
            },
            plugins: {
              beforeDraw: (chart) => {
                const ctx = chart.ctx;
                const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
                const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

                ctx.save();
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = 'bold 24px Arial'; 
                ctx.fillText(showData2, centerX, centerY);
                ctx.restore();
              },
            },
          };
          // console.log("return",user_role)
          const hours = Array.from({ length: 24 }, (_, i) => i + 1);
        return (
            <>
            <title>{onChangeLanguage(locale,'Performance Dashboard',languageData)}</title>
            {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'Performance Dashboard',languageData)} match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
          
            <div>
            <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
            <style>
          {`
          .custom-tab h1 {
            font-size: 1.5rem;
            margin: 0;
            transition: color 0.3s ease, font-weight 0.3s ease;
          }
          .custom-tab:hover h1 {
            color: #FF8000; /* Highlight color on hover */
            font-weight: bold; /* Make bold on hover */
          }
          .custom-tab.active h1 {
            color: #121C50; /* Active tab color */
            font-weight: bold;
          }
          `}
        </style>
        

<CloudPopup />
      {/* <h1>Your Main Application Content</h1> */}
{(user_role && user_role === 'director') && (
    <div>
  <h1 style = {{padding:'10px'}}>Hourly Performance</h1>
  <TableContainer component={Paper} style={{ padding: '10px' }}>
    <Table style={{ minWidth: '650px', overflowX: 'auto', border: '1px solid rgba(224, 224, 224, 1)', borderRadius: '10px' }}>
      <TableHead style={{ backgroundColor: '#EF6432' }}>
        <TableRow>
          <TableCell style={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)' }}>Manager</TableCell>
          <TableCell style={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)' }}>Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {datadirector.map((manager, managerIndex) => (
          <React.Fragment key={managerIndex}>
            <TableRow
              onClick={() => this.handleRowClicks('manager', managerIndex)}
              style={{
                cursor: 'pointer',
                backgroundColor: openRows[`manager-${managerIndex}`] ? '#f5f5f5' : 'inherit',
                transition: 'background-color 0.3s ease',
              }}
            >
              <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{manager.manager}</TableCell>
              <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{manager.managername}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} style={{ paddingBottom: 0, paddingTop: 0 }}>
                <Collapse in={openRows[`manager-${managerIndex}`]} timeout="auto" unmountOnExit>
                  <Box margin={1}>
                    <Table style={{ minWidth: '650px', overflowX: 'auto', border: '1px solid rgba(224, 224, 224, 1)', borderRadius: '10px' }}>
                      <TableHead style={{ backgroundColor: '#EF6432' }}>
                        <TableRow>
                          <TableCell style={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)' }}>Team Leader</TableCell>
                          <TableCell style={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)' }}>Name</TableCell>
                          <TableCell style={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)' }}>Total Eqvalue</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {manager.teamLeaders.map((teamLeader, teamLeaderIndex) => {
                          let totalEqvalue = teamLeader.users.reduce((teamTotal, user) => {
                            return teamTotal + hours.reduce((userTotal, hour) => {
                              const userData = user.data.find(d => d.hour === hour);
                              return userTotal + (userData ? userData.eqvalue : 0);
                            }, 0);
                          }, 0).toFixed(3);

                          return (
                            <React.Fragment key={teamLeaderIndex}>
                              <TableRow
                                onClick={() => this.handleRowClicks('teamLeader', `${managerIndex}-${teamLeaderIndex}`)}
                                style={{ overflowX: 'auto', border: '1px solid rgba(224, 224, 224, 1)', borderRadius: '10px' }}
                              >
                                <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)', cursor: 'pointer' }}>{teamLeader.teamLeader}</TableCell>
                                <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)', cursor: 'pointer' }}>{teamLeader.teamLeadername}</TableCell>
                                <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)', cursor: 'pointer' }}>{totalEqvalue}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell colSpan={5} style={{ paddingBottom: 0, paddingTop: 0 }}>
                                  <Collapse in={openRows[`teamLeader-${managerIndex}-${teamLeaderIndex}`]} timeout="auto" unmountOnExit>
                                    <Box margin={1}>
                                      <Table size="small">
                                        <TableHead style={{ backgroundColor: '#EF6432' }}>
                                          <TableRow>
                                            <TableCell style={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)' }}>Username</TableCell>
                                            <TableCell style={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)' }}>Name</TableCell>
                                            {hours.map(hour => (
                                              <TableCell key={hour} style={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)' }}>
                                                {hour}
                                              </TableCell>
                                            ))}
                                            <TableCell style={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)' }}>Achieved Units</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {teamLeader.users.map((user, userIndex) => (
                                            <TableRow key={userIndex}>
                                              <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{user.username}</TableCell>
                                              <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{user.name}</TableCell>
                                              {/* {hours.map(hour => {
                                                const userData = user.data.find(d => d.hour === hour);
                                                return (
                                                  <TableCell key={hour} style={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
                                                    {userData ? userData.eqvalue : '0'}
                                                  </TableCell>
                                                );
                                              })} */}
                                             {hours.map(hour => {
                                              const userData = user.data.find(d => d.hour === hour);
                                              const value = userData ? Number(userData.eqvalue) : 0; // Ensure value is numeric, default to 0

                                              let backgroundColor = ''; // Default to no background color
                                              let textColor = 'inherit'; // Default text color

                                              // Logic for background and text color
                                              if (value >= 0 && value <= 4.5) {
                                                backgroundColor = '#e4021b'; // Red
                                                textColor = 'white'; // White text for red background
                                              } else if (value > 4.5 && value < 6) {
                                                backgroundColor = '#FF8000'; // Orange
                                                textColor = 'white'; // White text for orange background
                                              } else if (value >= 6) {
                                                backgroundColor = '#008000'; // Green
                                                textColor = 'white'; // White text for green background
                                              }

                                              return (
                                                <TableCell
                                                  key={hour}
                                                  style={{
                                                    border: '1px solid rgba(224, 224, 224, 1)',
                                                    backgroundColor: backgroundColor || 'inherit', // Apply background color only if defined
                                                    color: textColor, // Apply text color
                                                  }}
                                                >
                                                  {value || '0'}
                                                </TableCell>
                                              );
                                            })}


                                              <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
                                                {hours.reduce((total, hour) => {
                                                  const userData = user.data.find(d => d.hour === hour);
                                                  return total + (userData ? userData.eqvalue : 0);
                                                }, 0) > 48 ? (
                                                  <span style={{ color: 'green', fontWeight: 'bold' }}>
                                                    <AiOutlineArrowUp />
                                                  </span>
                                                ) : (
                                                  <span style={{ color: 'red', fontWeight: 'bold' }}>
                                                    <AiOutlineArrowDown />
                                                  </span>
                                                )}
                                                {hours.reduce((total, hour) => {
                                                  const userData = user.data.find(d => d.hour === hour);
                                                  return total + (userData ? userData.eqvalue : 0);
                                                }, 0).toFixed(3)}
                                              </TableCell>
                                            </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    </Box>
                                  </Collapse>
                                </TableCell>
                              </TableRow>
                            </React.Fragment>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </div>
)}



{(user_role && user_role === 'manager') && (
<div>
  <h1 style = {{padding:'10px'}}>Hourly Performance</h1>
  <TableContainer component={Paper} style={{ padding: '10px' }}>
    <Table
      style={{
        minWidth: '650px',
        overflowX: 'auto',
        border: '1px solid rgba(224, 224, 224, 1)',
        borderRadius: '10px',
        borderCollapse: 'collapse',
      }}
    >
      <TableHead style={{ backgroundColor: '#EF6432' }}>
        <TableRow>
          <TableCell style={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)' }}>TeamLeader</TableCell>
          <TableCell style={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)' }}>Total Eqvalue</TableCell>
          {/* <TableCell style={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)' }}>Productivity</TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {datamanager.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} style={{ textAlign: 'center' }}>No data available</TableCell>
          </TableRow>
        ) : (
          datamanager.map((team, index) => {
            const teamLeader = team.teamLeader;
            const validUsers = team.users ? team.users.filter(user => hours.some(hour => user[`eqvalue${hour}`] && user[`eqvalue${hour}`] > 0)) : [];
            const allUsersTotalEqvalue = validUsers.reduce((total, user) => {
              return total + hours.reduce((userTotal, hour) => userTotal + (user[`eqvalue${hour}`] || 0), 0);
            }, 0).toFixed(3);
            return (
              <React.Fragment key={index}>
                <TableRow
                  onClick={() => this.handleRowClick(index)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: openRows[index] ? '#f5f5f5' : 'inherit',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = openRows[index] ? '#e0e0e0' : '#f5f5f5')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = openRows[index] ? '#f5f5f5' : 'inherit')}
                >
                  <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{teamLeader.username} ({teamLeader.name})</TableCell>
                  <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{allUsersTotalEqvalue}</TableCell>
                  {/* <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{team.productivity}</TableCell> */}
                </TableRow>
                
                {openRows[index] && (
                    <TableRow>
                      <TableCell colSpan={3} style={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
                        <Table size="small" style={{ width: '100%', paddingLeft: '40px' }}>
                          <TableHead style={{ backgroundColor: '#EF6432' }}>
                            <TableRow>
                              <TableCell style={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)' }}>Username</TableCell>
                              <TableCell style={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)' }}>Name</TableCell>
                              {hours.map((hour) => (
                                <TableCell key={hour} style={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)' }}>{hour}</TableCell>
                              ))}
                              <TableCell style={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)' }}>Achieved Units</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {validUsers.length > 0 ? (
                              validUsers.map((user, idx) => (
                                <TableRow key={idx}>
                                  {/* Username */}
                                  <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{user.username}</TableCell>
                                  {/* Name */}
                                  <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{user.userFullName}</TableCell>
                                  {/* Hourly eqvalues */}
                                  {/* {hours.map((hour) => (
                                    <TableCell key={hour} style={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
                                      {user[`eqvalue${hour}`] || '0'}
                                    </TableCell>
                                  ))} */}
                                  {hours.map((hour) => {
                                    const value = user[`eqvalue${hour}`] ? Number(user[`eqvalue${hour}`]) : 0; // Ensure value is numeric, default to 0
                                    let backgroundColor = ''; // Default to no background color
                                    let textColor = 'inherit'; // Default text color

                                    // Logic for background and text color
                                    if (value >= 0 && value <= 4.5) {
                                      backgroundColor = '#e4021b'; // Red
                                      textColor = 'white'; // White text for red background
                                    } else if (value > 4.5 && value < 6) {
                                      backgroundColor = '#FF8000'; // Orange
                                      textColor = 'white'; // White text for orange background
                                    } else if (value >= 6) {
                                      backgroundColor = '#008000'; // Green
                                      textColor = 'white'; // White text for green background
                                    }

                                    return (
                                      <TableCell
                                        key={hour}
                                        style={{
                                          border: '1px solid rgba(224, 224, 224, 1)',
                                          backgroundColor: backgroundColor || 'inherit', // Apply background color only if defined
                                          color: textColor, // Apply the text color dynamically
                                        }}
                                      >
                                        {value || '0'}
                                      </TableCell>
                                    );
                                  })}


                                  {/* Achieved Units */}
                                  <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
                                  {hours.reduce((total, hour) => total + (user[`eqvalue${hour}`] || 0), 0).toFixed(3)}
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={hours.length + 3} style={{ textAlign: 'center' }}>No data available</TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </TableCell>
                    </TableRow>
                  )}

              </React.Fragment>
            );
          })
        )}
      </TableBody>
    </Table>
  </TableContainer>
  </div>
)}



{(user_role && (user_role === 'user')) && (
  <div>
  <h1 style = {{padding:'10px'}}>Hourly Performance</h1>
  <TableContainer component={Paper} style={{ padding: '20px' }}>
    <Table
      style={{
        minWidth: '650px',
        overflowX: 'auto',
        border: '1px solid rgba(224, 224, 224, 1)',
        borderRadius: '10px',
        borderCollapse: 'collapse',
      }}
    >
      <TableHead style={{ backgroundColor: '#121C50', color: 'white' }}>
        <TableRow>
          <TableCell style={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)', color: 'white' }}>Username</TableCell>
          {hours.map(hour => (
            <TableCell key={hour} style={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)', color: 'white' }}>{hour}</TableCell>
          ))}
          <TableCell style={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)', color: 'white' }}>Achieved Unit</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
  {data.filter(row => row.username).length === 0 ? (
    <TableRow>
      <TableCell colSpan={hours.length + 2} style={{ textAlign: 'center' }}>
        No data available
      </TableCell>
    </TableRow>
  ) : (
    data
      .filter(row => row.username)
      .map((row, index) => {
        const total = hours.reduce(
          (sum, hour) => sum + (parseFloat(row[`eqvalue${hour}`]) || 0),
          0
        );
        return (
          <TableRow key={index}>
            <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
              {row.username}
            </TableCell>
            {hours.map(hour => (
              <TableCell
                key={hour}
                style={{ border: '1px solid rgba(224, 224, 224, 1)' }}
              >
                {row[`eqvalue${hour}`] || '0'}
              </TableCell>
            ))}
            <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
              {total > 48 ? (
                <span style={{ color: 'green', fontWeight: 'bold' }}>
                  <AiOutlineArrowUp />
                </span>
              ) : (
                <span style={{ color: 'red', fontWeight: 'bold' }}>
                  <AiOutlineArrowDown />
                </span>
              )}
              {total.toFixed(3)}
            </TableCell>
          </TableRow>
        );
      })
  )}
</TableBody>


    </Table>
  </TableContainer>
  </div>
)}


{( user_role && user_role == 'user') && (
  <div>
        <h1 style = {{padding:'10px'}}>Weekly Performance</h1>
                    <div className = "row" style = {{margin:'0px'}}>
                        <div className="col-md-3 space-margin">
                            <Label className="fontstyle normal-font">
                                {onChangeLanguage(locale, 'Week', languageData)}
                                <a style={{ color: 'red' }}>*</a>
                            </Label>
                            <Select
                                className={is_submit === true && week_no === '' ? "error-border-select" : "react-select fontstyle"}
                                classNamePrefix="react-select"
                                name="form-field-name"
                                // value={this.state.week_value}
                                value={week_data.filter(option =>option.value === week_no)}
                                options={week_data}
                                onChange={(option) => this.onChangeWeek(option.value, week_no, week_data)}
                                clearValues={() => this.setState({ week_no: null })}
                            />
                          </div>
                      </div>
                
                      <Container>
  {/* First Row */}
  <h2 style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#333' }}>Productivity Units</h2>
  <Row>
    <Col md={2} className="space-margin">
      <Card style={{
       width: '100%',
       borderRadius: '15px',
       height: '150px',
       marginBottom: '20px',
       display: 'flex',
       flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center',
       overflow: 'hidden',
       boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
       position: 'relative',
       background: '#C2E2F5', // Gradient from light teal to teal
       border: 'none',
       color: '#121C50',
      }}>
        <Card.Body style={{ textAlign: 'center' }}>
          <Card.Title style={{ fontSize: '1.2em', color: '#555' }}>Target Units</Card.Title>
          <h1 style={{ fontSize: '2em', fontWeight: 'bold', color: '#333' }}>{user_targetunits}</h1>
        </Card.Body>
      </Card>
    </Col>
    <Col md={2} className="space-margin">
      <Card style={{
       width: '100%',
       borderRadius: '15px',
       height: '150px',
       marginBottom: '20px',
       display: 'flex',
       flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center',
       overflow: 'hidden',
       boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
       position: 'relative',
       background: '#C2E2F5', // Gradient from teal to darker teal
       border: 'none',
       color: '#121C50',
      }}>
        <Card.Body style={{ textAlign: 'center' }}>
          <Card.Title style={{ fontSize: '1.2em', color: '#555' }}>Present Days</Card.Title>
          <h1 style={{ fontSize: '2em', fontWeight: 'bold', color: '#333' }}>{user_presentdays}</h1>
        </Card.Body>
      </Card>
    </Col>
    <Col md={2} className="space-margin">
      <Card style={{
       width: '100%',
       borderRadius: '15px',
       height: '150px',
       marginBottom: '20px',
       display: 'flex',
       flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center',
       overflow: 'hidden',
       boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
       position: 'relative',
       background: '#C2E2F5', // Gradient from teal to darker teal
       border: 'none',
       color: '#121C50',
      }}>
        <Card.Body style={{ textAlign: 'center' }}>
          <Card.Title style={{ fontSize: '1.2em', color: '#555' }}>Productive Units</Card.Title>
          <h1 style={{ fontSize: '2em', fontWeight: 'bold', color: '#333' }}>{user_achievedunits}</h1>
        </Card.Body>
      </Card>
    </Col>
    <Col md={2} className="space-margin">
      <Card style={{
       width: '100%',
       borderRadius: '15px',
       height: '150px',
       marginBottom: '20px',
       display: 'flex',
       flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center',
       overflow: 'hidden',
       boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
       position: 'relative',
       background: '#C2E2F5', // Gradient from light blue to darker blue
       border: 'none',
       color: '#121C50',
      }}>
        <Card.Body style={{ textAlign: 'center' }}>
          <Card.Title style={{ fontSize: '1.2em', color: '#555' }}>NonProductive Units</Card.Title>
          <h1 style={{ fontSize: '2em', fontWeight: 'bold', color: '#333' }}>{user_nonproductivityprocess}</h1>
        </Card.Body>
      </Card>
    </Col>
    <Col md={2} className="space-margin">
      <Card style={{
       width: '100%',
       borderRadius: '15px',
       height: '150px',
       marginBottom: '20px',
       display: 'flex',
       flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center',
       overflow: 'hidden',
       boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
       position: 'relative',
       background: '#C2E2F5', // Gradient from light red to darker red
       border: 'none',
       color: '#121C50',
      }}>
        <Card.Body style={{ textAlign: 'center' }}>
          <Card.Title style={{ fontSize: '1.2em', color: '#555' }}>Total Units</Card.Title>
          <h1 style={{ fontSize: '2em', fontWeight: 'bold', color: '#333' }}>{(parseFloat(user_achievedunits) || 0) + (parseFloat(user_nonproductivityprocess) || 0)}</h1>
        </Card.Body>
      </Card>
    </Col>
    <Col md={2} className="space-margin">
      <Card style={{
       width: '100%',
       borderRadius: '15px',
       height: '150px',
       marginBottom: '20px',
       display: 'flex',
       flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center',
       overflow: 'hidden',
       boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
       position: 'relative',
       background: '#C2E2F5', // Gradient from light red to darker red
       border: 'none',
       color: '#121C50',
      }}>
        <Card.Body style={{ textAlign: 'center' }}>
          <Card.Title style={{ fontSize: '1.2em', color: '#555' }}>Total Counts</Card.Title>
          <h1 style={{ fontSize: '2em', fontWeight: 'bold', color: '#333' }}>{user_totalcounts}</h1>
        </Card.Body>
      </Card>
    </Col>
  </Row>
  
  {/* Combined Row */}
  <h2 style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#333' }}>Errors</h2>
  <Row>
    <Col md={6}>
      <Row>
      <Col md={4} className="space-margin">
      <Card
          id="error-card"
          style={{
            width: '100%',
            borderRadius: '15px',
            height: '110px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            background: '#C2E2F5', // Light blue background
            border: 'none',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            padding: '10px', // Added padding for alignment
          }}
          // onMouseEnter={this.handleMouseEnter}
          // onMouseLeave={this.handleMouseLeave}
        >
          <Card.Body
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            {hovered ? (
              <div style={{ textAlign: 'center', color: '#555' }}>
                <h1 style={{ fontSize: '1.2em' }}>Error Code</h1>
                <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>
                  {user_errorcode}
                </h1>
              </div>
            ) : (
              <>
                <Card.Title
                  style={{
                    fontSize: '1.2em',
                    color: '#555',
                    marginBottom: '4px',
                  }}
                >
                  Error
                </Card.Title>
                <h1
                  style={{
                    fontSize: '2em',
                    fontWeight: 'bold',
                    color: '#333',
                  }}
                >
                  {user_errorwithsensitivity}
                </h1>
              </>
            )}
          </Card.Body>
        </Card>

            <Tooltip
              anchorSelect="#error-card"
              place="top"
              html={tooltipContent} // Use the html prop for custom content
              effect="solid"
              style={{
                backgroundColor: '#121C50', // Custom background color
                color: '#FFFFFF', // Custom text color
                padding: '10px',
                borderRadius: '8px',
                fontSize: '1em'
              }}
            />
          </Col>

        <Col md={4} className="space-margin">
        <Card style={{
              width: '100%',
              borderRadius: '15px',
              height: '110px',  // Keeping the height unchanged
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              background: '#C2E2F5', // Light teal background
              border: 'none',
              padding: '10px' // Add padding for better spacing
            }}>
              <Card.Body style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                textAlign: 'center'
              }}>
                <Card.Title style={{
                  fontSize: '1.1em', // Slightly reduced font size for the title
                  color: '#555',
                  marginBottom: '4px' // Smaller margin to avoid excess spacing
                }}>
                  Internal Error
                </Card.Title>
                <h1 style={{
                  fontSize: '2em', // Keeping font size similar but centered properly
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  {user_internalerror} {/* Dynamic value placeholder */}
                </h1>
              </Card.Body>
            </Card>

        </Col>
        <Col md={4} className="space-margin">
        <Card style={{
              width: '100%',
              borderRadius: '15px',
              height: '110px',  // Keeping the height unchanged
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              background: '#C2E2F5', // Light teal background
              border: 'none',
              padding: '10px' // Add padding for better spacing
            }}>
              <Card.Body style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                textAlign: 'center'
              }}>
                <Card.Title style={{
                  fontSize: '1.1em', // Slightly reduced font size for the title
                  color: '#555',
                  marginBottom: '4px' // Smaller margin to avoid excess spacing
                }}>
                  External Error
                </Card.Title>
                <h1 style={{
                  fontSize: '2em', // Keeping font size similar but centered properly
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  {user_externalerror} {/* Dynamic value placeholder */}
                </h1>
              </Card.Body>
            </Card>
        </Col>
      </Row>
      <h2 style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#333' }}>Process(NP Hours)</h2>
      <Row>
        <Col md={4} className="space-margin">
        <Card style={{
            width: '100%',
            borderRadius: '15px',
            height: '110px',  // Keeping the height unchanged
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            background: '#C2E2F5', // Light teal background
            border: 'none',
            padding: '10px' // Add padding for better spacing
          }}>
            <Card.Body style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              textAlign: 'center'
            }}>
              <Card.Title style={{
                fontSize: '1.1em', // Slightly reduced font size for the title
                color: '#555',
                marginBottom: '4px' // Smaller margin to avoid excess spacing
              }}>
                Pending
              </Card.Title>
              <h1 style={{
                fontSize: '2em', // Keeping font size similar but centered properly
                fontWeight: 'bold',
                color: '#333'
              }}>
                {user_nonproductivitypendingprocess} {/* Dynamic value placeholder */}
              </h1>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="space-margin">
        <Card style={{
            width: '100%',
            borderRadius: '15px',
            height: '110px',  // Keeping the height unchanged
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            background: '#C2E2F5', // Light teal background
            border: 'none',
            padding: '10px' // Add padding for better spacing
          }}>
            <Card.Body style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              textAlign: 'center'
            }}>
              <Card.Title style={{
                fontSize: '1.1em', // Slightly reduced font size for the title
                color: '#555',
                marginBottom: '4px' // Smaller margin to avoid excess spacing
              }}>
                Approved
              </Card.Title>
              <h1 style={{
                fontSize: '2em', // Keeping font size similar but centered properly
                fontWeight: 'bold',
                color: '#333'
              }}>
                {user_nonproductivityapprovedprocess} {/* Dynamic value placeholder */}
              </h1>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="space-margin">
        <Card style={{
            width: '100%',
            borderRadius: '15px',
            height: '110px',  // Keeping the height unchanged
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            background: '#C2E2F5', // Light teal background
            border: 'none',
            padding: '10px' // Add padding for better spacing
          }}>
            <Card.Body style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              textAlign: 'center'
            }}>
              <Card.Title style={{
                fontSize: '1.1em', // Slightly reduced font size for the title
                color: '#555',
                marginBottom: '4px' // Smaller margin to avoid excess spacing
              }}>
                Rejected
              </Card.Title>
              <h1 style={{
                fontSize: '2em', // Keeping font size similar but centered properly
                fontWeight: 'bold',
                color: '#333'
              }}>
                {user_nonproductivityrejectedprocess} {/* Dynamic value placeholder */}
              </h1>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <h2 style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#333' }}>Non Process(NP Hours)</h2>
      <Row>
        <Col md={4} className="space-margin">
        <Card style={{
            width: '100%',
            borderRadius: '15px',
            height: '110px',  // Keeping the height unchanged
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            background: '#C2E2F5', // Light teal background
            border: 'none',
            padding: '10px' // Add padding for better spacing
          }}>
            <Card.Body style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              textAlign: 'center'
            }}>
              <Card.Title style={{
                fontSize: '1.1em', // Slightly reduced font size for the title
                color: '#555',
                marginBottom: '4px' // Smaller margin to avoid excess spacing
              }}>
                Pending
              </Card.Title>
              <h1 style={{
                fontSize: '2em', // Keeping font size similar but centered properly
                fontWeight: 'bold',
                color: '#333'
              }}>
                {user_nonproductivitypendingnonprocess} {/* Dynamic value placeholder */}
              </h1>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="space-margin">
        <Card style={{
            width: '100%',
            borderRadius: '15px',
            height: '110px',  // Keeping the height unchanged
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            background: '#C2E2F5', // Light teal background
            border: 'none',
            padding: '10px' // Add padding for better spacing
          }}>
            <Card.Body style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              textAlign: 'center'
            }}>
              <Card.Title style={{
                fontSize: '1.1em', // Slightly reduced font size for the title
                color: '#555',
                marginBottom: '4px' // Smaller margin to avoid excess spacing
              }}>
                Approved
              </Card.Title>
              <h1 style={{
                fontSize: '2em', // Keeping font size similar but centered properly
                fontWeight: 'bold',
                color: '#333'
              }}>
                {user_nonproductivityapprovednonprocess} {/* Dynamic value placeholder */}
              </h1>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="space-margin">
        <Card style={{
          width: '100%',
          borderRadius: '15px',
          height: '110px',  // Keeping the height unchanged
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          background: '#C2E2F5', // Light teal background
          border: 'none',
          padding: '10px' // Add padding for better spacing
          }}>
          <Card.Body style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            textAlign: 'center'
          }}>
            <Card.Title style={{
              fontSize: '1.1em', // Slightly reduced font size for the title
              color: '#555',
              marginBottom: '4px' // Smaller margin to avoid excess spacing
            }}>
              Rejected
            </Card.Title>
            <h1 style={{
              fontSize: '2em', // Keeping font size similar but centered properly
              fontWeight: 'bold',
              color: '#333'
            }}>
              {user_nonproductivityrejectednonprocess} {/* Dynamic value placeholder */}
            </h1>
          </Card.Body>
          </Card>
        </Col>
      </Row>
    </Col>
    <Col md={6}>
      <Row>
        <Col md={6} className="space-margin">
          <Card style={{
            width: '100%',
            borderRadius: '15px',
            height: '400px', // Adjusted height for better chart visualization
            marginBottom: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            backgroundColor: '#FFFFFF',
            border: 'none'
          }}>
            <Card.Body style={{ textAlign: 'center', padding: '10' }}>
              <Card.Text style={{ textAlign: 'center' }}>
                <h1>Productivity</h1>
              </Card.Text>
              <div>
                <Doughnut data={datas1} options={options1} style={{ height: '100%', width: '100%' }} />
              </div>
              <Card.Text style={{ textAlign: 'center' }}>
                <h1>{user_productivity} %</h1>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="space-margin">
          <Card style={{
            width: '100%',
            borderRadius: '15px',
            height: '400px', // Adjusted height for better chart visualization
            marginBottom: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            backgroundColor: '#FFFFFF',
            border: 'none'
          }}>
            <Card.Body style={{ textAlign: 'center', padding: '10' }}>
              <Card.Text style={{ textAlign: 'center' }}>
                <h1>Accuracy</h1>
              </Card.Text>
              <div>
                <Doughnut data={datas2} options={options1} style={{ height: '100%', width: '100%' }} />
              </div>
              <Card.Text style={{ textAlign: 'center' }}>
                <h1>{user_accuracy} %</h1>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Col>
  </Row>
</Container>
</div>
)}

{( user_role == 'supervisor') && (
  <div>


<Tabs
    className="publishuser-card-component"
    style={{
      // borderRadius: '10px',
      marginTop:'10px',
      marginBottom: '30px',
      // border: '2px solid #121C50', // Border for Tabs
      padding: '15px', 
    }}
    id="controlled-tab-example"
    activeKey={this.state.activeTab}
    onSelect={this.handleTabSelect}
  >
    
    <Tab
      eventKey="hourly"
      title={
        <div
          className={`custom-tab ${activeTab === 'hourly' ? 'active' : ''}`}
          style={{
            textAlign: 'center', 
            padding: '10px', 
            fontSize: '1.2rem', 
          }}
        >
          <h1 style={{ margin: 0 }}>Houry</h1>
        </div>
      }
    >
<h1 style = {{padding:'10px'}}>Hourly Performance</h1>

{(user_role && (user_role === 'supervisor')) && (
  <div>
     {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
  <TableContainer component={Paper} style={{ padding: '20px' }}>
    <Table
      style={{
        minWidth: '650px',
        overflowX: 'auto',
        border: '1px solid rgba(224, 224, 224, 1)',
        borderRadius: '10px',
        borderCollapse: 'collapse',
      }}
    >
      <TableHead style={{ backgroundColor: '#121C50', color: 'white' }}>
        <TableRow>
          <TableCell style={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)', color: 'white' }}>Username</TableCell>
          {hours.map(hour => (
            <TableCell key={hour} style={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)', color: 'white' }}>{hour}</TableCell>
          ))}
          <TableCell style={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)', color: 'white' }}>Achieved Unit</TableCell>
          {/* <TableCell style={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)', color: 'white' }}>Daily Utilization</TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={hours.length + 2} style={{ textAlign: 'center' }}>No data available</TableCell>
          </TableRow>
        ) : (
          data.map((row, index) => (
            <TableRow key={index}>
              <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{row.username}</TableCell>


{/* {hours.map(hour => (
                <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)' }} key={hour}>{row[`eqvalue${hour}`] || "0"}</TableCell>
              ))} */}


                                {hours.map(hour => {
                                  const targetEQ = 6; // Define the target EQ
                                  const achievedEQ = row[`eqvalue${hour}`] ? Number(row[`eqvalue${hour}`]) : 0; // Ensure value is numeric, default to 0
                                  const percentage = ((achievedEQ / targetEQ) * 100).toFixed(2); // Calculate percentage and format to 2 decimals

                                  let backgroundColor = ''; // Default to no background color
                                  let textColor = 'inherit'; // Default text color

                                  // Logic for background and text color
                                  if (achievedEQ >= 0 && achievedEQ <= 4.5) {
                                    backgroundColor = '#e4021b'; // Red
                                    textColor = 'white'; // White text for red background
                                  } else if (achievedEQ > 4.5 && achievedEQ < 6) {
                                    backgroundColor = '#FF8000'; // Orange
                                    textColor = 'white'; // White text for orange background
                                  } else if (achievedEQ >= 6) {
                                    backgroundColor = '#008000'; // Green
                                    textColor = 'white'; // White text for green background
                                  }

                                  return (
                                    <TableCell
                                      key={hour}
                                      style={{
                                        border: '1px solid rgba(224, 224, 224, 1)',
                                        backgroundColor: backgroundColor || 'inherit', // Apply background color only if defined
                                        color: textColor, // Apply text color to TableCell
                                      }}
                                    >
                                      <div>
                                        {/* Apply textColor directly to the styles */}
                                        <span style={{ fontSize: '1rem', color: textColor }}>
                                          {achievedEQ || "0"} 
                                        </span>
                                        <br />
                                        <span style={{ fontSize: '0.9rem', color: textColor }}>
                                          {percentage}% {/* Percentage */}
                                        </span>
                                      </div>
                                    </TableCell>
                                  );
                                })}






              <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
                {hours.reduce((total, hour) => total + (row[`eqvalue${hour}`] || 0), 0) > 48 ? (
                  <span style={{ color: 'green', fontWeight: 'bold' }}><AiOutlineArrowUp /></span>
                ) : (
                  <span style={{ color: 'red', fontWeight: 'bold' }}><AiOutlineArrowDown /></span>
                )}
                {/* {hours.reduce((total, hour) => total + (row[`eqvalue${hour}`] || 0), 0)} */}
                <span style={{ fontWeight: 'bold' }}>
                {hours.reduce((total, hour) => total + (row[`eqvalue${hour}`] || 0), 0).toFixed(2)}</span>
              </TableCell>
              
              {/* <TableCell>
                {(() => {
                  const achievedEQ = hours.reduce((total, hour) => total + (row[`eqvalue${hour}`] || 0), 0); 
                  const targetEQ = 48; 
                  const capacityUtilization = ((achievedEQ / targetEQ) * 100).toFixed(2); 

                  return (
                    <div>
                          <span style={{ fontSize: '0.9rem',fontWeight: 'bold' }}>
                                          {capacityUtilization}% 
                                        </span>
                    </div>
                  );
                })()}
              </TableCell> */}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </TableContainer>
  </div>
)}


    </Tab>
    <Tab
      eventKey="daily"
      title={
        <div
          className={`custom-tab ${activeTab === 'daily' ? 'active' : ''}`}
          style={{
            textAlign: 'center', 
            padding: '10px', 
            fontSize: '1.2rem', 
          }}
        >
          <h1 style={{ margin: 0 }}>Daily</h1>
        </div>
      }
    >
      <div >
      <h1 style = {{marginLeft:'15px'}}>Daily Capacity Utilization </h1>
        <Container>
        <Row>
        <Col md={4} className="space-margin">
<Card style={{
    width: '100%',
    height: '150px',
    marginBottom: '20px',
    position: 'relative',
    backgroundColor: '#EF6432', // Container color
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Deeper shadow for 3D effect
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    border: 'none',
  }}
> 
  <div style={{position: 'absolute', top: '0',width: '100%',height: '10px',backgroundColor: '#d9534f',zIndex: 2,
  }}></div>
  <div style={{
      position: 'absolute',
      bottom: '0',
      width: '100%',
      height: '10px',
      backgroundColor: '#d9534f',
      zIndex: 2,
  }}></div>
  <div style={{position: 'absolute',top: '10px',left: 0,width: '100%',height: 'calc(100% - 20px)',backgroundImage: 'repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.15) 2px, transparent 10px)',
      zIndex: 1,
  }}></div>
  {[{ top: '5px', left: '5px' }, { top: '5px', right: '5px' }, { bottom: '5px', left: '5px' }, { bottom: '5px', right: '5px' }]
    .map((style, index) => (
      <div key={index} style={{
          ...style,
          width: '8px',
          height: '8px',
          backgroundColor: '#333',
          borderRadius: '50%',
          position: 'absolute',
          zIndex: 3,
      }}></div>
  ))}
  <Card.Body style={{ 
      textAlign: 'center', 
      zIndex: 4, 
      color: '#121C50',
      fontFamily: 'Arial, sans-serif',
  }}>
    <Card.Title style={{ fontSize: '1.2em', color: 'black', fontWeight: 'bold' }}>Target Units</Card.Title>
    <h1 style={{ fontSize: '2em', fontWeight: 'bold', color: '#fff', margin: '0' }}>{user_dailytargetunits} Units</h1>
  </Card.Body>
</Card>
</Col>
<Col md={4} className="space-margin">
  <Card
    style={{
      width: '100%',
      height: '150px',
      marginBottom: '20px',
      position: 'relative',
      backgroundColor: '#EF6432', // Container color
      borderRadius: '10px', // Slightly increased border radius for smoother edges
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Deeper shadow for 3D effect
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      border: 'none',
    }}
  >
    {/* Top Accent */}
    <div
      style={{
        position: 'absolute',
        top: '0',
        width: '100%',
        height: '10px',
        backgroundColor: '#d9534f',
        zIndex: 2,
      }}
    ></div>
    {/* Bottom Accent */}
    <div
      style={{
        position: 'absolute',
        bottom: '0',
        width: '100%',
        height: '10px',
        backgroundColor: '#d9534f',
        zIndex: 2,
      }}
    ></div>
    {/* Pattern Background */}
    <div
      style={{
        position: 'absolute',
        top: '10px',
        left: 0,
        width: '100%',
        height: 'calc(100% - 20px)',
        backgroundImage:
          'repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.15) 2px, transparent 10px)',
        zIndex: 1,
      }}
    ></div>
    {/* Corner Dots */}
    {[
      { top: '5px', left: '5px' },
      { top: '5px', right: '5px' },
      { bottom: '5px', left: '5px' },
      { bottom: '5px', right: '5px' },
    ].map((style, index) => (
      <div
        key={index}
        style={{
          ...style,
          width: '8px',
          height: '8px',
          backgroundColor: '#333',
          borderRadius: '50%',
          position: 'absolute',
          zIndex: 3,
        }}
      ></div>
    ))}
    {/* Card Content */}
    <Card.Body
      style={{
        textAlign: 'center',
        zIndex: 4,
        color: '#121C50',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <Card.Title
        style={{
          fontSize: '1.2em',
          color: 'black',
          fontWeight: 'bold',
        }}
      >
        Achieved Units
      </Card.Title>
      {/* Achieved Units Value */}
      <h1
        style={{
          fontSize: '2em',
          fontWeight: 'bold',
          color: '#fff',
          margin: '0',
        }}
      >
        {parseFloat(user_dailyachievedunits || 0).toFixed(2)} Units
      </h1>
    </Card.Body>
  </Card>
</Col>

<Col md={4} className="space-margin">
<Card style={{
    width: '100%',
    height: '150px',
    marginBottom: '20px',
    position: 'relative',
    backgroundColor: '#EF6432', // Container color
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Deeper shadow for 3D effect
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    border: 'none',
  }}
> 
  <div style={{position: 'absolute', top: '0',width: '100%',height: '10px',backgroundColor: '#d9534f',zIndex: 2,
  }}></div>
  <div style={{
      position: 'absolute',
      bottom: '0',
      width: '100%',
      height: '10px',
      backgroundColor: '#d9534f',
      zIndex: 2,
  }}></div>
  <div style={{position: 'absolute',top: '10px',left: 0,width: '100%',height: 'calc(100% - 20px)',backgroundImage: 'repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.15) 2px, transparent 10px)',
      zIndex: 1,
  }}></div>
  {[{ top: '5px', left: '5px' }, { top: '5px', right: '5px' }, { bottom: '5px', left: '5px' }, { bottom: '5px', right: '5px' }]
    .map((style, index) => (
      <div key={index} style={{
          ...style,
          width: '8px',
          height: '8px',
          backgroundColor: '#333',
          borderRadius: '50%',
          position: 'absolute',
          zIndex: 3,
      }}></div>
  ))}
  <Card.Body style={{ 
      textAlign: 'center', 
      zIndex: 4, 
      color: '#121C50',
      fontFamily: 'Arial, sans-serif',
  }}>
    <Card.Title style={{ fontSize: '1.2em', color: 'black', fontWeight: 'bold' }}>Capacity Utilization</Card.Title>
    <h1 style={{ fontSize: '2em', fontWeight: 'bold', color: '#fff', margin: '0' }}>
      {user_dailytargetunits && user_dailyachievedunits
        ? ((user_dailyachievedunits / user_dailytargetunits) * 100).toFixed(2)
        : 0} %
    </h1>
  </Card.Body>
</Card>
</Col>
</Row>
</Container>
      </div>
    </Tab>

    {/* Weekly Tab */}
    <Tab
      eventKey="weekly"
      title={
        <div
          className={`custom-tab ${activeTab === 'weekly' ? 'active' : ''}`}
          style={{
            textAlign: 'center',
            padding: '10px',
            fontSize: '1.2rem',
          }}
        >
          <h1 style={{ margin: 0 }}>Weekly</h1>
        </div>
      }
    >
    <div >
    <h1 style = {{marginLeft:'15px'}}>Weekly Capacity Utilization </h1>
    <div className="row" style={{ margin: '0px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  {/* Left Aligned Select Option */}
  <div className="col-md-3">
                            <Label className="fontstyle normal-font">
                                {onChangeLanguage(locale, 'Week', languageData)}
                                <a style={{ color: 'red' }}>*</a>
                            </Label>
                            <Select
                                className={is_submit === true && week_no === '' ? "error-border-select" : "react-select fontstyle"}
                                classNamePrefix="react-select"
                                name="form-field-name"
                                // value={this.state.week_value}
                                value={week_data.filter(option =>option.value === week_no)}
                                options={week_data}
                                onChange={(option) => this.onChangeWeek(option.value, week_no, week_data)}
                                clearValues={() => this.setState({ week_no: null })}
                            />
                          </div>


                                                
                      {user_targetunits !== 0 && (
  <Col md={2}>


{downloadexcelData && downloadexcelData.length > 0 && (
  
  <div className="col-md-3" style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <CSVLink
    className="button-width"
    color="secondary"
    style={{
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '6px',
      backgroundColor: '#121C50',
      cursor: 'pointer',
      fontSize: '14px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    data={downloadexcelData}
    filename={`Download.csv`}
  >
    <i className="simple-icon-cloud-download" style={{ marginRight: '5px' }} />
    {onChangeLanguage(locale, 'Download', languageData)}
  </CSVLink>
</div>
)}


  </Col>
)}
                      </div>


          <Container style={{marginTop:'20px'}}>
        <Row>
        <Col md={4} className="space-margin">
<Card style={{
    width: '100%',
    height: '150px',
    marginBottom: '20px',
    position: 'relative',
    backgroundColor: '#EF6432', // Container color
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Deeper shadow for 3D effect
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    border: 'none',
  }}
> 
  <div style={{position: 'absolute', top: '0',width: '100%',height: '10px',backgroundColor: '#d9534f',zIndex: 2,
  }}></div>
  <div style={{
      position: 'absolute',
      bottom: '0',
      width: '100%',
      height: '10px',
      backgroundColor: '#d9534f',
      zIndex: 2,
  }}></div>
  <div style={{position: 'absolute',top: '10px',left: 0,width: '100%',height: 'calc(100% - 20px)',backgroundImage: 'repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.15) 2px, transparent 10px)',
      zIndex: 1,
  }}></div>
  {[{ top: '5px', left: '5px' }, { top: '5px', right: '5px' }, { bottom: '5px', left: '5px' }, { bottom: '5px', right: '5px' }]
    .map((style, index) => (
      <div key={index} style={{
          ...style,
          width: '8px',
          height: '8px',
          backgroundColor: '#333',
          borderRadius: '50%',
          position: 'absolute',
          zIndex: 3,
      }}></div>
  ))}
  <Card.Body style={{ 
      textAlign: 'center', 
      zIndex: 4, 
      color: '#121C50',
      fontFamily: 'Arial, sans-serif',
  }}>
    <Card.Title style={{ fontSize: '1.2em', color: 'black', fontWeight: 'bold' }}>Target Units</Card.Title>
    <h1 style={{ fontSize: '2em', fontWeight: 'bold', color: '#fff', margin: '0' }}>{user_targetunits} Units</h1>
  </Card.Body>
</Card>
</Col>
<Col md={4} className="space-margin">
  <Card
    style={{
      width: '100%',
      height: '150px',
      marginBottom: '20px',
      position: 'relative',
      backgroundColor: '#EF6432', // Container color
      borderRadius: '10px', // Slightly increased border radius for smoother edges
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Deeper shadow for 3D effect
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      border: 'none',
    }}
  >
    {/* Top Accent */}
    <div
      style={{
        position: 'absolute',
        top: '0',
        width: '100%',
        height: '10px',
        backgroundColor: '#d9534f',
        zIndex: 2,
      }}
    ></div>
    {/* Bottom Accent */}
    <div
      style={{
        position: 'absolute',
        bottom: '0',
        width: '100%',
        height: '10px',
        backgroundColor: '#d9534f',
        zIndex: 2,
      }}
    ></div>
    {/* Pattern Background */}
    <div
      style={{
        position: 'absolute',
        top: '10px',
        left: 0,
        width: '100%',
        height: 'calc(100% - 20px)',
        backgroundImage:
          'repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.15) 2px, transparent 10px)',
        zIndex: 1,
      }}
    ></div>
    {/* Corner Dots */}
    {[
      { top: '5px', left: '5px' },
      { top: '5px', right: '5px' },
      { bottom: '5px', left: '5px' },
      { bottom: '5px', right: '5px' },
    ].map((style, index) => (
      <div
        key={index}
        style={{
          ...style,
          width: '8px',
          height: '8px',
          backgroundColor: '#333',
          borderRadius: '50%',
          position: 'absolute',
          zIndex: 3,
        }}
      ></div>
    ))}
    {/* Card Content */}
    <Card.Body
      style={{
        textAlign: 'center',
        zIndex: 4,
        color: '#121C50',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <Card.Title
        style={{
          fontSize: '1.2em',
          color: 'black',
          fontWeight: 'bold',
        }}
      >
        Achieved Units
      </Card.Title>
      {/* Achieved Units Value */}
      <h1
        style={{
          fontSize: '2em',
          fontWeight: 'bold',
          color: '#fff',
          margin: '0',
        }}
      >
        {parseFloat(user_achievedunits || 0).toFixed(2)} Units
      </h1>
    </Card.Body>
  </Card>
</Col>

<Col md={4} className="space-margin">
<Card style={{
    width: '100%',
    height: '150px',
    marginBottom: '20px',
    position: 'relative',
    backgroundColor: '#EF6432', // Container color
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Deeper shadow for 3D effect
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    border: 'none',
  }}
> 
  <div style={{position: 'absolute', top: '0',width: '100%',height: '10px',backgroundColor: '#d9534f',zIndex: 2,
  }}></div>
  <div style={{
      position: 'absolute',
      bottom: '0',
      width: '100%',
      height: '10px',
      backgroundColor: '#d9534f',
      zIndex: 2,
  }}></div>
  <div style={{position: 'absolute',top: '10px',left: 0,width: '100%',height: 'calc(100% - 20px)',backgroundImage: 'repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.15) 2px, transparent 10px)',
      zIndex: 1,
  }}></div>
  {[{ top: '5px', left: '5px' }, { top: '5px', right: '5px' }, { bottom: '5px', left: '5px' }, { bottom: '5px', right: '5px' }]
    .map((style, index) => (
      <div key={index} style={{
          ...style,
          width: '8px',
          height: '8px',
          backgroundColor: '#333',
          borderRadius: '50%',
          position: 'absolute',
          zIndex: 3,
      }}></div>
  ))}
  <Card.Body style={{ 
      textAlign: 'center', 
      zIndex: 4, 
      color: '#121C50',
      fontFamily: 'Arial, sans-serif',
  }}>
    <Card.Title style={{ fontSize: '1.2em', color: 'black', fontWeight: 'bold' }}>Capacity Utilization</Card.Title>
    <h1 style={{ fontSize: '2em', fontWeight: 'bold', color: '#fff', margin: '0' }}>
      {user_targetunits == null || user_achievedunits == null
        ? "Loading..."
        : user_targetunits > 0
        ? ((user_achievedunits / user_targetunits) * 100).toFixed(2)
        : 0} %
    </h1>
  </Card.Body>
</Card>
</Col>
</Row>
</Container>


      </div>
    </Tab>

    {/* Monthly Tab */}
    <Tab
      eventKey="monthly"
      title={
        <div
          className={`custom-tab ${activeTab === 'monthly' ? 'active' : ''}`}
          style={{
            textAlign: 'center',
            padding: '10px',
            fontSize: '1.2rem',
          }}
        >
          <h1 style={{ margin: 0 }}>Monthly</h1>
        </div>
      }
    >
      <div style={{  marginTop: '20px' }}>
      <h1 style = {{marginLeft:'15px'}}>Monthly Capacity Utilization </h1>
      <div className="row" style={{ margin: '0px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  {/* Left Aligned Select Option */}
  <div className="col-md-3">
    <Label className="fontstyle normal-font">
      {onChangeLanguage(locale, 'Month', languageData)}
      <a style={{ color: 'red' }}>*</a>
    </Label>
    <Select
      className={is_submit === true && month === '' ? "error-border-select" : "react-select fontstyle"}
      classNamePrefix="react-select"
      name="form-field-name"
      value={month_data.filter(option => option.value === month)}
      options={month_data}
      onChange={(option) => this.onChangeMonth(option.value, month, month_data)}
      clearValues={() => this.setState({ month: null })}
    />
  </div>


{user_monthlytargetunits !== 0 && (
  <Col md={2}>
{downloadexcelMonthlyData && downloadexcelMonthlyData.length > 0 && (
  
  <div className="col-md-3" style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <CSVLink
    className="button-width"
    color="secondary"
    style={{
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '6px',
      backgroundColor: '#121C50',
      cursor: 'pointer',
      fontSize: '14px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    data={downloadexcelMonthlyData}
    filename={`Download.csv`}
  >
    <i className="simple-icon-cloud-download" style={{ marginRight: '5px' }} />
    {onChangeLanguage(locale, 'Download', languageData)}
  </CSVLink>
</div>
)}
  </Col>
)}








</div>

        <Container style={{marginTop:'20px'}}>
        <Row>
        <Col md={4} className="space-margin">
<Card style={{
    width: '100%',
    height: '150px',
    marginBottom: '20px',
    position: 'relative',
    backgroundColor: '#EF6432', // Container color
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Deeper shadow for 3D effect
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    border: 'none',
  }}
> 
  <div style={{position: 'absolute', top: '0',width: '100%',height: '10px',backgroundColor: '#d9534f',zIndex: 2,
  }}></div>
  <div style={{
      position: 'absolute',
      bottom: '0',
      width: '100%',
      height: '10px',
      backgroundColor: '#d9534f',
      zIndex: 2,
  }}></div>
  <div style={{position: 'absolute',top: '10px',left: 0,width: '100%',height: 'calc(100% - 20px)',backgroundImage: 'repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.15) 2px, transparent 10px)',
      zIndex: 1,
  }}></div>
  {[{ top: '5px', left: '5px' }, { top: '5px', right: '5px' }, { bottom: '5px', left: '5px' }, { bottom: '5px', right: '5px' }]
    .map((style, index) => (
      <div key={index} style={{
          ...style,
          width: '8px',
          height: '8px',
          backgroundColor: '#333',
          borderRadius: '50%',
          position: 'absolute',
          zIndex: 3,
      }}></div>
  ))}
  <Card.Body style={{ 
      textAlign: 'center', 
      zIndex: 4, 
      color: '#121C50',
      fontFamily: 'Arial, sans-serif',
  }}>
    <Card.Title style={{ fontSize: '1.2em', color: 'black', fontWeight: 'bold' }}>Target Units</Card.Title>
    <h1 style={{ fontSize: '2em', fontWeight: 'bold', color: '#fff', margin: '0' }}>{user_monthlytargetunits} Units</h1>
  </Card.Body>
</Card>
</Col>
<Col md={4} className="space-margin">
  <Card
    style={{
      width: '100%',
      height: '150px',
      marginBottom: '20px',
      position: 'relative',
      backgroundColor: '#EF6432', // Container color
      borderRadius: '10px', // Slightly increased border radius for smoother edges
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Deeper shadow for 3D effect
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      border: 'none',
    }}
  >
    {/* Top Accent */}
    <div
      style={{
        position: 'absolute',
        top: '0',
        width: '100%',
        height: '10px',
        backgroundColor: '#d9534f',
        zIndex: 2,
      }}
    ></div>
    {/* Bottom Accent */}
    <div
      style={{
        position: 'absolute',
        bottom: '0',
        width: '100%',
        height: '10px',
        backgroundColor: '#d9534f',
        zIndex: 2,
      }}
    ></div>
    {/* Pattern Background */}
    <div
      style={{
        position: 'absolute',
        top: '10px',
        left: 0,
        width: '100%',
        height: 'calc(100% - 20px)',
        backgroundImage:
          'repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.15) 2px, transparent 10px)',
        zIndex: 1,
      }}
    ></div>
    {/* Corner Dots */}
    {[
      { top: '5px', left: '5px' },
      { top: '5px', right: '5px' },
      { bottom: '5px', left: '5px' },
      { bottom: '5px', right: '5px' },
    ].map((style, index) => (
      <div
        key={index}
        style={{
          ...style,
          width: '8px',
          height: '8px',
          backgroundColor: '#333',
          borderRadius: '50%',
          position: 'absolute',
          zIndex: 3,
        }}
      ></div>
    ))}
    {/* Card Content */}
    <Card.Body
      style={{
        textAlign: 'center',
        zIndex: 4,
        color: '#121C50',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <Card.Title
        style={{
          fontSize: '1.2em',
          color: 'black',
          fontWeight: 'bold',
        }}
      >
        Achieved Units
      </Card.Title>
      {/* Achieved Units Value */}
      <h1
        style={{
          fontSize: '2em',
          fontWeight: 'bold',
          color: '#fff',
          margin: '0',
        }}
      >
        {parseFloat(user_monthlyachievedunits || 0).toFixed(2)} Units
      </h1>
    </Card.Body>
  </Card>
</Col>

<Col md={4} className="space-margin">
<Card style={{
    width: '100%',
    height: '150px',
    marginBottom: '20px',
    position: 'relative',
    backgroundColor: '#EF6432', // Container color
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Deeper shadow for 3D effect
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    border: 'none',
  }}
> 
  <div style={{position: 'absolute', top: '0',width: '100%',height: '10px',backgroundColor: '#d9534f',zIndex: 2,
  }}></div>
  <div style={{
      position: 'absolute',
      bottom: '0',
      width: '100%',
      height: '10px',
      backgroundColor: '#d9534f',
      zIndex: 2,
  }}></div>
  <div style={{position: 'absolute',top: '10px',left: 0,width: '100%',height: 'calc(100% - 20px)',backgroundImage: 'repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.15) 2px, transparent 10px)',
      zIndex: 1,
  }}></div>
  {[{ top: '5px', left: '5px' }, { top: '5px', right: '5px' }, { bottom: '5px', left: '5px' }, { bottom: '5px', right: '5px' }]
    .map((style, index) => (
      <div key={index} style={{
          ...style,
          width: '8px',
          height: '8px',
          backgroundColor: '#333',
          borderRadius: '50%',
          position: 'absolute',
          zIndex: 3,
      }}></div>
  ))}
  <Card.Body style={{ 
      textAlign: 'center', 
      zIndex: 4, 
      color: '#121C50',
      fontFamily: 'Arial, sans-serif',
  }}>
    <Card.Title style={{ fontSize: '1.2em', color: 'black', fontWeight: 'bold' }}>Capacity Utilization</Card.Title>
    <h1 style={{ fontSize: '2em', fontWeight: 'bold', color: '#fff', margin: '0' }}>
      {user_monthlytargetunits == null || user_monthlyachievedunits == null
        ? "Loading..."
        : user_monthlytargetunits > 0
        ? ((user_monthlyachievedunits / user_monthlytargetunits) * 100).toFixed(2)
        : 0} %
    </h1>
  </Card.Body>
</Card>
</Col>
</Row>
</Container>
      </div>
    </Tab>
  </Tabs>

<Row
  style={{
    alignItems: 'center',
    justifyContent: 'center', // Center the row content
    margin: '20px 10px', // Consistent spacing
  }}
>
  
  {/* <Col md={6}>
    <h1 style={{ padding: '10px', margin: '10px' }}>Weekly Performance / Capacity Utilization</h1>
    <div className="row" style={{ margin: '10px' }}>
      <div className="col-md-6">
        <Label className="fontstyle normal-font">
          {onChangeLanguage(locale, 'Week', languageData)}
          <a style={{ color: 'red' }}>*</a>
        </Label>
        <Select
          className={
            is_submit === true && week_no === '' ? "error-border-select" : "react-select fontstyle"
          }
          classNamePrefix="react-select"
          name="form-field-name"
          value={week_data.filter(option => option.value === week_no)}
          options={week_data}
          onChange={(option) => this.onChangeWeek(option.value, week_no, week_data)}
          clearValues={() => this.setState({ week_no: null })}
        />
      </div>
    </div>
  </Col> */}


</Row>

                
                {/* <Container>

<h2 style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#333' }}>Productivity Units</h2>
<Row>
<Col md={3} className="space-margin">
<Card style={{
    width: '100%',
    height: '150px',
    marginBottom: '20px',
    position: 'relative',
    backgroundColor: '#EF6432', // Container color
    borderRadius: '5px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Deeper shadow for 3D effect
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    border: 'none',
  }}
>
  
  <div style={{
      position: 'absolute',
      top: '0',
      width: '100%',
      height: '10px',
      backgroundColor: '#d9534f', // Darker shade for the top border
      zIndex: 2,
  }}></div>
  <div style={{
      position: 'absolute',
      bottom: '0',
      width: '100%',
      height: '10px',
      backgroundColor: '#d9534f', // Darker shade for the bottom border
      zIndex: 2,
  }}></div>

  
  <div style={{
      position: 'absolute',
      top: '10px',
      left: 0,
      width: '100%',
      height: 'calc(100% - 20px)', // Leaves space for top and bottom borders
      backgroundImage: 'repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.15) 2px, transparent 10px)',
      zIndex: 1,
  }}></div>


  {[{ top: '5px', left: '5px' }, { top: '5px', right: '5px' }, { bottom: '5px', left: '5px' }, { bottom: '5px', right: '5px' }]
    .map((style, index) => (
      <div key={index} style={{
          ...style,
          width: '8px',
          height: '8px',
          backgroundColor: '#333',
          borderRadius: '50%',
          position: 'absolute',
          zIndex: 3,
      }}></div>
  ))}


  <Card.Body style={{ 
      textAlign: 'center', 
      zIndex: 4, 
      color: '#121C50', // Font color applied
      fontFamily: 'Arial, sans-serif',
  }}>
    <Card.Title style={{ fontSize: '1.2em', color: 'black', fontWeight: 'bold' }}>Target Units</Card.Title>
    <h1 style={{ fontSize: '2em', fontWeight: 'bold', color: '#fff', margin: '0' }}>{user_targetunits} Units</h1>
  </Card.Body>
</Card>



</Col>
<Col md={3} className="space-margin">
  <Card style={{
    width: '100%',
    height: '150px',
    marginBottom: '20px',
    position: 'relative',
    backgroundColor: '#EF6432', // Container background color
    borderRadius: '5px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Deeper shadow for realism
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    border: 'none',
  }}>
   
    <div style={{
        position: 'absolute',
        top: '0',
        width: '100%',
        height: '10px',
        backgroundColor: '#d9534f', // Darker shade for container edges
        zIndex: 2,
    }}></div>
    <div style={{
        position: 'absolute',
        bottom: '0',
        width: '100%',
        height: '10px',
        backgroundColor: '#d9534f', // Darker shade for container edges
        zIndex: 2,
    }}></div>

   
    <div style={{
        position: 'absolute',
        top: '10px',
        left: 0,
        width: '100%',
        height: 'calc(100% - 20px)', // Leaves space for borders
        backgroundImage: 'repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.15) 2px, transparent 10px)',
        zIndex: 1,
    }}></div>

   
    {[{ top: '5px', left: '5px' }, { top: '5px', right: '5px' }, { bottom: '5px', left: '5px' }, { bottom: '5px', right: '5px' }]
      .map((style, index) => (
        <div key={index} style={{
            ...style,
            width: '8px',
            height: '8px',
            backgroundColor: '#333',
            borderRadius: '50%',
            position: 'absolute',
            zIndex: 3,
        }}></div>
    ))}

   
    <Card.Body style={{ 
        textAlign: 'center', 
        zIndex: 4, 
        color: '#121C50',
        fontFamily: 'Arial, sans-serif',
    }}>
      <Card.Title style={{ fontSize: '1.2em', color: 'black', fontWeight: 'bold' }}>Productive Units</Card.Title>
      <h1 style={{ fontSize: '2em', fontWeight: 'bold', color: '#fff', margin: '0' }}>{user_achievedunits} Units</h1>
    </Card.Body>
  </Card>
</Col>

<Col md={3} className="space-margin">
  <Card style={{
    width: '100%',
    height: '150px',
    marginBottom: '20px',
    position: 'relative',
    backgroundColor: '#EF6432',
    borderRadius: '5px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    border: 'none',
  }}>
    <div style={{position: 'absolute', top: '0', width: '100%', height: '10px', backgroundColor: '#d9534f', zIndex: 2}}></div>
    <div style={{position: 'absolute', bottom: '0', width: '100%', height: '10px', backgroundColor: '#d9534f', zIndex: 2}}></div>
    <div style={{position: 'absolute', top: '10px', left: 0, width: '100%', height: 'calc(100% - 20px)', backgroundImage: 'repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.15) 2px, transparent 10px)', zIndex: 1}}></div>
    {[{ top: '5px', left: '5px' }, { top: '5px', right: '5px' }, { bottom: '5px', left: '5px' }, { bottom: '5px', right: '5px' }]
      .map((style, index) => (
        <div key={index} style={{...style, width: '8px', height: '8px', backgroundColor: '#333', borderRadius: '50%', position: 'absolute', zIndex: 3}}></div>
    ))}
    <Card.Body style={{textAlign: 'center', zIndex: 4, color: '#121C50', fontFamily: 'Arial, sans-serif'}}>
      <Card.Title style={{ fontSize: '1.2em', color: 'black', fontWeight: 'bold' }}>NonProductive Units</Card.Title>
      <h1 style={{ fontSize: '2em', fontWeight: 'bold', color: '#fff', margin: '0' }}>{user_nonproductivityprocess} Units</h1>
    </Card.Body>
  </Card>
</Col>

<Col md={3} className="space-margin">
  <Card style={{
    width: '100%',
    height: '150px',
    marginBottom: '20px',
    position: 'relative',
    backgroundColor: '#EF6432',
    borderRadius: '5px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    border: 'none',
  }}>
    <div style={{position: 'absolute', top: '0', width: '100%', height: '10px', backgroundColor: '#d9534f', zIndex: 2}}></div>
    <div style={{position: 'absolute', bottom: '0', width: '100%', height: '10px', backgroundColor: '#d9534f', zIndex: 2}}></div>
    <div style={{position: 'absolute', top: '10px', left: 0, width: '100%', height: 'calc(100% - 20px)', backgroundImage: 'repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.15) 2px, transparent 10px)', zIndex: 1}}></div>
    {[{ top: '5px', left: '5px' }, { top: '5px', right: '5px' }, { bottom: '5px', left: '5px' }, { bottom: '5px', right: '5px' }]
      .map((style, index) => (
        <div key={index} style={{...style, width: '8px', height: '8px', backgroundColor: '#333', borderRadius: '50%', position: 'absolute', zIndex: 3}}></div>
    ))}
    <Card.Body style={{textAlign: 'center', zIndex: 4, color: '#121C50', fontFamily: 'Arial, sans-serif'}}>
      <Card.Title style={{ fontSize: '1.2em', color: 'black', fontWeight: 'bold' }}>Total Units</Card.Title>
      <h1 style={{ fontSize: '2em', fontWeight: 'bold', color: '#fff', margin: '0' }}>
        {(parseFloat(user_achievedunits) || 0) + (parseFloat(user_nonproductivityprocess) || 0)} Units
      </h1>
    </Card.Body>
  </Card>
</Col>

</Row>


<Row>
<Col md={6}>
<h2 style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#333' }}>Non Productivity (Process)</h2>
<Row>
  <Col md={6} className="space-margin">
 
    <Card style={{
      width: '100%',
      height: '150px',
      marginBottom: '20px',
      position: 'relative',
      backgroundColor: '#EF6432', // Container color
      borderRadius: '5px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Deeper shadow for 3D effect
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      border: 'none',
    }}>
    
      <div style={{
        position: 'absolute',
        top: '0',
        width: '100%',
        height: '10px',
        backgroundColor: '#d9534f', // Darker shade for the top border
        zIndex: 2,
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '0',
        width: '100%',
        height: '10px',
        backgroundColor: '#d9534f', // Darker shade for the bottom border
        zIndex: 2,
      }}></div>

      
      <div style={{
        position: 'absolute',
        top: '10px',
        left: 0,
        width: '100%',
        height: 'calc(100% - 20px)', // Leaves space for top and bottom borders
        backgroundImage: 'repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.15) 2px, transparent 10px)',
        zIndex: 1,
      }}></div>

    
      {[{ top: '5px', left: '5px' }, { top: '5px', right: '5px' }, { bottom: '5px', left: '5px' }, { bottom: '5px', right: '5px' }]
        .map((style, index) => (
          <div key={index} style={{
            ...style,
            width: '8px',
            height: '8px',
            backgroundColor: '#333',
            borderRadius: '50%',
            position: 'absolute',
            zIndex: 3,
          }}></div>
      ))}

    
      <Card.Body style={{
        textAlign: 'center',
        zIndex: 4,
        color: '#121C50', // Font color applied
        fontFamily: 'Arial, sans-serif',
      }}>
        <Card.Title style={{ fontSize: '1.2em', color: 'black', fontWeight: 'bold' }}>Non Process (Pending)</Card.Title>
        <h1 style={{ fontSize: '2em', fontWeight: 'bold', color: '#fff', margin: '0' }}>{user_nonproductivitypendingprocess} hours</h1>
      </Card.Body>
    </Card>
  </Col>
  
  <Col md={6} className="space-margin">
    <Card style={{
      width: '100%',
      height: '150px',
      marginBottom: '20px',
      position: 'relative',
      backgroundColor: '#EF6432', // Container background color
      borderRadius: '5px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Deeper shadow for realism
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      border: 'none',
    }}>
      
      <div style={{
        position: 'absolute',
        top: '0',
        width: '100%',
        height: '10px',
        backgroundColor: '#d9534f', // Darker shade for container edges
        zIndex: 2,
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '0',
        width: '100%',
        height: '10px',
        backgroundColor: '#d9534f', // Darker shade for container edges
        zIndex: 2,
      }}></div>

  
      <div style={{
        position: 'absolute',
        top: '10px',
        left: 0,
        width: '100%',
        height: 'calc(100% - 20px)', // Leaves space for borders
        backgroundImage: 'repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.15) 2px, transparent 10px)',
        zIndex: 1,
      }}></div>

     
      {[{ top: '5px', left: '5px' }, { top: '5px', right: '5px' }, { bottom: '5px', left: '5px' }, { bottom: '5px', right: '5px' }]
        .map((style, index) => (
          <div key={index} style={{
            ...style,
            width: '8px',
            height: '8px',
            backgroundColor: '#333',
            borderRadius: '50%',
            position: 'absolute',
            zIndex: 3,
          }}></div>
      ))}

      
      <Card.Body style={{
        textAlign: 'center',
        zIndex: 4,
        color: '#121C50',
        fontFamily: 'Arial, sans-serif',
      }}>
        <Card.Title style={{ fontSize: '1.2em', color: 'black', fontWeight: 'bold' }}>Non Process (Approved)</Card.Title>
        <h1 style={{ fontSize: '2em', fontWeight: 'bold', color: '#fff', margin: '0' }}>{user_nonproductivityapprovedprocess} hours</h1>
      </Card.Body>
    </Card>
  </Col>
  </Row>
  </Col>
  
  
 
  <Col md={6}>
  <h2 style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#333' }}>Non Productivity (Non Process)</h2>
  <Row>
  <Col md={6} className="space-margin">

    <Card style={{
      width: '100%',
      height: '150px',
      marginBottom: '20px',
      position: 'relative',
      backgroundColor: '#EF6432',
      borderRadius: '5px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      border: 'none',
    }}>
      <div style={{ position: 'absolute', top: '0', width: '100%', height: '10px', backgroundColor: '#d9534f', zIndex: 2 }}></div>
      <div style={{ position: 'absolute', bottom: '0', width: '100%', height: '10px', backgroundColor: '#d9534f', zIndex: 2 }}></div>
      <div style={{ position: 'absolute', top: '10px', left: 0, width: '100%', height: 'calc(100% - 20px)', backgroundImage: 'repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.15) 2px, transparent 10px)', zIndex: 1 }}></div>
      {[{ top: '5px', left: '5px' }, { top: '5px', right: '5px' }, { bottom: '5px', left: '5px' }, { bottom: '5px', right: '5px' }]
        .map((style, index) => (
          <div key={index} style={{ ...style, width: '8px', height: '8px', backgroundColor: '#333', borderRadius: '50%', position: 'absolute', zIndex: 3 }}></div>
      ))}
      <Card.Body style={{ textAlign: 'center', zIndex: 4, color: '#121C50', fontFamily: 'Arial, sans-serif' }}>
        <Card.Title style={{ fontSize: '1.2em', color: 'black', fontWeight: 'bold' }}>Non Process (Pending)</Card.Title>
        <h1 style={{ fontSize: '2em', fontWeight: 'bold', color: '#fff', margin: '0' }}>{user_nonproductivitypendingnonprocess} hours</h1>
      </Card.Body>
    </Card>
  </Col>

  <Col md={6} className="space-margin">
    <Card style={{
      width: '100%',
      height: '150px',
      marginBottom: '20px',
      position: 'relative',
      backgroundColor: '#EF6432',
      borderRadius: '5px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      border: 'none',
    }}>
      <div style={{ position: 'absolute', top: '0', width: '100%', height: '10px', backgroundColor: '#d9534f', zIndex: 2 }}></div>
      <div style={{ position: 'absolute', bottom: '0', width: '100%', height: '10px', backgroundColor: '#d9534f', zIndex: 2 }}></div>
      <div style={{ position: 'absolute', top: '10px', left: 0, width: '100%', height: 'calc(100% - 20px)', backgroundImage: 'repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.15) 2px, transparent 10px)', zIndex: 1 }}></div>
      {[{ top: '5px', left: '5px' }, { top: '5px', right: '5px' }, { bottom: '5px', left: '5px' }, { bottom: '5px', right: '5px' }]
        .map((style, index) => (
          <div key={index} style={{ ...style, width: '8px', height: '8px', backgroundColor: '#333', borderRadius: '50%', position: 'absolute', zIndex: 3 }}></div>
      ))}
      <Card.Body style={{ textAlign: 'center', zIndex: 4, color: '#121C50', fontFamily: 'Arial, sans-serif' }}>
        <Card.Title style={{ fontSize: '1.2em', color: 'black', fontWeight: 'bold' }}>Non Process (Approved)</Card.Title>
        <h1 style={{ fontSize: '2em', fontWeight: 'bold', color: '#fff', margin: '0' }}>{user_nonproductivityapprovednonprocess} hours</h1>
      </Card.Body>
    </Card>
  </Col>
</Row>
</Col>
</Row>

</Container> */}
</div>
)}
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

