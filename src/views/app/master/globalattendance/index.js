import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import Workbook from 'react-excel-workbook'
import {onChangeLanguage,getValue,convertLocalToUTCDate,getTimeDifference} from '../../../../helper'
import{teamsService} from '../../../../redux/teams/saga'
import{userService} from '../../../../redux/users/saga'
import{reportService} from '../../../../redux/Export/report/saga'
import moment from 'moment';
import { Table,Tooltip,Checkbox,Popconfirm  } from 'antd';
import Select from 'react-select';
import DatePicker from "../../datePicker";
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../constants/defaultValues';
import{checklistService} from '../../../../redux/imports/checklist/saga';
import{globalattendanceService} from '../../../../redux/global_attendance/saga';
import{teamService} from '../../../../redux/Export/masters/exportteam/saga'
import{TLService} from '../../../../redux/tl/saga'
import "./index.scss";
import loading from 'react-fullscreen-loading';

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
        originalData:[],
        column_value:[],
        page:1,
        pageSize:150,
        total :0,
        days_value:'',
        teamdata:[],
        week_data:[],
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
        sundayCheckedAll: false,
        mondayCheckedAll: true,
        tuesdayCheckedAll: true,
        wednesdayCheckedAll: true,
        thursdayCheckedAll: true,
        fridayCheckedAll: true,
        saturdayCheckedAll: false,
        weekStartdate:''
      };
    }
    componentDidMount()
    {
      this.setState({
        start_datetime:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
    })
        this.fetchTeamData()
        // this.fetchteam()
        this.fetchWeekData();
        this.fetchtlData();
        // const weekNumbers = this.generateWeekNumbers(); // Generate week numbers
        // this.setState({ weekNumbers });
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
     fetchtlData() {  
      this.setState({
        loading : true
      })
      TLService.fetchtl()
        .then((res) => { 
          this.setState({   
        loading : false 
                
          }) 
          if(res.status)
            {
              this.setState({ 
                tldata:res.data  , 
                         
              }) 
            } 
            if(res.status)
            {
              let filterstatus = (res.data).filter(item => item.status === 1)
              var list = filterstatus.map(function(areaaval) {
                return  {label : areaaval.name,value : (areaaval.id).toString(),name:areaaval.name};
                });  
                 this.setState({
                  tldata :  list,
                 })
              
            } 
            else
            {
              this.setState({ 
                tldata:[]  , 
                         
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
     
      const {start_datetime,team_id,week,tlname} = this.state
      const {username} = this.props
        this.setState({
          loading : true
        })
        globalattendanceService.fetchapi(week,team_id,tlname)
        .then((res) => {
          
        if(res.data && res.data.length !== 0){
          
          this.setState({
            loading: false,
          })
          let filterstatus = (res.data).filter(item => item.is_active === 1)
                var list = []
                // var listtl = []
                const listtl = [...new Set(filterstatus.map(item => item.teamleader))];
                for(var i =0;i<filterstatus.length;i++)
                {
                    list.push(filterstatus[i].username)
                    
                }
                console.log("rajkumar",res.data)
          this.setState({
            data:res.data,
            originalData:res.data,
        })
        }else{
          userService.fetch_hierarchyuserDataUnderTL(team_array,tlname)
          .then((res) => { 
            this.setState({   
                 loading : false   
            }) 
            if(res.status)
              {
                let filterstatus = (res.data).filter(item => item.is_active === 1)
                var list = []
                // var listtl = []
                const listtl = [...new Set(filterstatus.map(item => item.teamleader))];
                for(var i =0;i<filterstatus.length;i++)
                {
                    list.push(filterstatus[i].username)
                    
                }
                
                const formattedTldata = listtl
                  .filter(item => item.trim() !== '') // Remove empty strings
                  .map(item => ({
                      label: item,
                      value: item
                  }));
                const formattedData = [];
                // console.log("formattedData",res.data)
                res.data.map((item) => {
                  const row = item;
                  row["monday"] = true;
                  row["monday_leave_type"] = "8";
                  row["tuesday"] = true;
                  row["tuesday_leave_type"] = "8";
                  row["wednesday"] = true;
                  row["wednesday_leave_type"] = "8";
                  row["thursday"] = true;
                  row["thursday_leave_type"] = "8";
                  row["friday"] = true;
                  row["friday_leave_type"] = "8";
                  row["saturday"] = false;
                  row["saturday_leave_type"] = "0";
                  row["sunday"] = false;
                  row["sunday_leave_type"] = "0";
                  // row["date"] = this.state.weekStartdate;
                  // row["date"] = new Date(this.state.weekStartdate).toISOString();
                  row["date"] = this.state.weekStartdate ? new Date(this.state.weekStartdate).toISOString() : new Date().toISOString();
                  row["upload_username"] = tlname;
                  row["week"] = this.state.week.toString();
                  row["team_id"] = team_id;
                  row["user_id"] = item.id.toString();
                  formattedData.push(row)
                  
                })
                
                   this.setState({
                       user_data :  list,
                       data:formattedData,
                       originalData:formattedData,
                      //  tldata:formattedTldata ,
                   })
                
              } 
              else
              {
                this.setState({
                  user_data :  [],
                  data:[],
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
        })
        .catch((error) => {
          this.setState({
            loading: false,
          })
        });
        // console.log("team_id",team_id)
        // console.log("week",week)
  
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
            const report_url =  'inputsheet',
            menu= 'Export' , 
            submenu='Input Sheet',
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
    onChangeTeam(value) {
    this.setState({ team_id: value,  startdate: '', enddate: '', user_data: [], data: [] });
    // this.setState({ week_data: "" });
    this.setState({ week_value: "",tlname:""})
}

onChangeWeek(value, week, week_data) {
  const { team_id } = this.state;

  if (!team_id) {
    createNotification("Please Choose Team", "error", "filled");
    return;
  }

  this.setState({ loading: true });

  // Find the week details
  const weekDetails = week_data.find(option => option.value === value); // Ensure `value` is correct

  // Extract the start date using regex
  const match = value.match(/\((\d{1,2})\/(\d{1,2})\/(\d{4})/); // Captures MM/DD/YYYY format

  if (match) {
    const [, month, day, year] = match;
    const currentTime = new Date();
    //const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")} ${currentTime.toLocaleTimeString("en-US", { hour12: false })}+05:30`;
    const selectedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        
        // Format for Indian timezone (IST)
        const istFormatter = new Intl.DateTimeFormat('en-CA', {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        
        const dateStr = istFormatter.format(selectedDate);
        const formattedDate = `${dateStr} 00:00:00+05:30`;
        
    this.setState(
      {
        week: value,
        week_value: weekDetails || null, // Ensure this updates properly
        weekStartdate: formattedDate,
        tlname: '',
        data: [],
      },
      () => {
        console.log("Updated Week State:", this.state.week_value); // Debugging log
      }
    );
  } else {
    console.error("Start date not found in value.");
  }

  this.setState({ loading: false });
}




onChangeTL(value) {
  
  const { team_id, week, originalData } = this.state;

  this.setState({ tlname: value, loading: true }, () => {
    if (!value) {
      this.setState({ data: originalData, loading: false });
      return;
    }

    // Filter first before making API call
    const filteredData = originalData.filter(item => item.teamleader === value);
    this.setState({ data: filteredData, loading: false });

    // Fetch data only if required
    this.fetchUserData([team_id]);
  });
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
  //  console.log("lgkjgjgkj  finalDate = " , JSON.stringify(finalDate) , 'currentdate ==>' , currentdate)
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
  fetchWeekData() {
    this.setState({ loading: true });

    // Call the generateWeekNumbers function and update the state with the generated week numbers
    let weekNumbers = this.generateWeekNumbers();
    
    this.setState({
        loading: false,
        week_data: weekNumbers
    });
}

generateWeekNumbers() {
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let weekNumbers = [];


  const getFirstMonday = (year) => {
    const jan4 = new Date(year, 0, 4); 
    const dayOfWeek = jan4.getDay(); 
    const offset = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek; 
    return new Date(jan4.setDate(jan4.getDate() + offset));
  };

  const getWeekStartDate = (firstMonday, week) => {
    const daysOffset = (week - 1) * 7; 
    return new Date(firstMonday.getTime() + daysOffset * 24 * 60 * 60 * 1000);
  };

  const firstMondayCurrentYear = getFirstMonday(currentYear);
  const firstMondayLastYear = getFirstMonday(currentYear - 1);
  const firstMondayNextYear = getFirstMonday(currentYear + 1);

  for (let i = -4; i <= 0; i++) {
    let weekStartDate = getWeekStartDate(firstMondayLastYear, 52 + i);
    let weekEndDate = new Date(weekStartDate.getTime() + 6 * 24 * 60 * 60 * 1000);
    let weekLabel = `Week ${52 + i} (${weekStartDate.toLocaleDateString()} - ${weekEndDate.toLocaleDateString()})`;

    weekNumbers.push({ label: weekLabel, value: weekLabel });
  }

  for (let i = 1; i <= 52; i++) {
    let weekStartDate = getWeekStartDate(firstMondayCurrentYear, i);
    let weekEndDate = new Date(weekStartDate.getTime() + 6 * 24 * 60 * 60 * 1000);
    let weekLabel = `Week ${i} (${weekStartDate.toLocaleDateString()} - ${weekEndDate.toLocaleDateString()})`;

    weekNumbers.push({ label: weekLabel, value: weekLabel });
  }

  for (let i = 1; i <= 4; i++) {
    let weekStartDate = getWeekStartDate(firstMondayNextYear, i);
    let weekEndDate = new Date(weekStartDate.getTime() + 6 * 24 * 60 * 60 * 1000);
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

onChangeCheckbox = (checked, day, username) => {
  const oldData = this.state.data;
console.log("oldData",oldData)

const referenceRecord = oldData.find(
    (item) => item.upload_username && item.date
  );

  const fallbackUsername = referenceRecord?.upload_username || "SYSTEM";
  const fallbackDate = referenceRecord?.date || moment().format("YYYY-MM-DD");
  const leaveTypeFields = {
    sunday: "sunday_leave_type",
    monday: "monday_leave_type",
    tuesday: "tuesday_leave_type",
    wednesday: "wednesday_leave_type",
    thursday: "thursday_leave_type",
    friday: "friday_leave_type",
    saturday: "saturday_leave_type",
  };

  const newData = oldData.map((item) => {
    const newRow = { ...item };
    if (item.username === username) {
      newRow[day] = checked;

      // Set the corresponding leave_type based on the day
      const leaveTypeField = leaveTypeFields[day];
      if (leaveTypeField) {
        newRow[leaveTypeField] = checked ? "8" : "0";
      }
       if (!newRow.upload_username) {
        newRow.upload_username = fallbackUsername;
      }
      if (!newRow.date) {
        newRow.date = fallbackDate;
      }
    }
    return newRow;
  });

  this.setState((prevState) => {
    return { ...prevState, data: newData };
  });
};


onChangeOverallCheckbox = (checked, day) => {
  const oldData = this.state.data;
  const newData = oldData.map((item) => {
    const newRow = { ...item };
    newRow[day] = checked;
    if (day === "sunday") {
      newRow.sunday_leave_type = checked ? '8' : '0';
    }
    else if (day === "monday") {
      newRow.monday_leave_type = checked ? '8' : '0';
    }
    else if (day === "tuesday") {
      newRow.tuesday_leave_type = checked ? '8' : '0';
    }
    else if (day === "wednesday") {
      newRow.wednesday_leave_type = checked ? '8' : '0';
    }
    else if (day === "thursday") {
      newRow.thursday_leave_type = checked ? '8' : '0';
    }
    else if (day === "friday") {
      newRow.friday_leave_type = checked ? '8' : '0';
    }
     else if (day === "saturday") {
      newRow.saturday_leave_type = checked ? '8' : '0';
    }

    return newRow;
  });

  if (day === "sunday") {
    this.setState((prevState) => {
      return {
        ...prevState,
        data: newData,
        sundayCheckedAll: checked,
      };
    });
  }else if (day === "monday") {
    this.setState((prevState) => {
      return {
        ...prevState,
        data: newData,
        mondayCheckedAll: checked,
      };
    });
  } 
  else if (day === "tuesday") {
    this.setState((prevState) => {
      return {
        ...prevState,
        data: newData,
        tuesdayCheckedAll: checked,
      };
    });
  }
  else if (day === "wednesday") {
    this.setState((prevState) => {
      return {
        ...prevState,
        data: newData,
        wednesdayCheckedAll: checked,
      };
    });
  }
  else if (day === "thursday") {
    this.setState((prevState) => {
      return {
        ...prevState,
        data: newData,
        thursdayCheckedAll: checked,
      };
    });
  }
  else if (day === "friday") {
    this.setState((prevState) => {
      return {
        ...prevState,
        data: newData,
        fridayCheckedAll: checked,
      };
    });
  }
  else if (day === "saturday") {
    this.setState((prevState) => {
      return {
        ...prevState,
        data: newData,
        saturdayCheckedAll: checked,
      };
    });
  }
};



onChangeLeaveType = (selectedOption, record, key) => {
  // console.log(selectedOption, record, key);
 
    const oldData = this.state.data;
    const newData = oldData.map((item) => {
      const newRow = item;
      if (item.id === record.id) {
        newRow[key] = selectedOption.label;
      }
      return newRow;
    })
    
    this.setState((prevState) => {
      return { ...prevState, data: newData}
    })
};
// onChangeCheckbox = (checked, dayOfWeek, userId) => {
//   // Find the user by userId and update the state for the specific day
//   // alert(dayOfWeek)
//   console.log("checked",checked)
//   console.log("dayOfWeek",dayOfWeek)
//   console.log("userId",userId)
//   this.setState((prevState) => ({
//       data: prevState.data.map((user) => {
//           if (user.id === userId) {
//               return { ...user, [dayOfWeek + 'Checked']: checked };
//           }
//           return user;
//       })
//   }));
// }

componentDidUpdate(prevProps, prevState) {
  if (
      this.state.sundayChecked !== prevState.sundayChecked ||
      this.state.mondayChecked !== prevState.mondayChecked ||
      this.state.tuesdayChecked !== prevState.tuesdayChecked ||
      this.state.wednesdayChecked !== prevState.wednesdayChecked ||
      this.state.thursdayChecked !== prevState.thursdayChecked ||
      this.state.fridayChecked !== prevState.fridayChecked ||
      this.state.saturdayChecked !== prevState.saturdayChecked
  ) {
      // Handle logic if checkbox state changes
      // For example, you can update the select value here
      const newValue = this.getSelectValue();
      // this.setState({ selectValue: newValue });
  }
}
areAllDaysChecked = (currentState) => {
  // Check if all checkboxes from Sunday to Saturday are checked
  return (
      currentState.sundayChecked &&
      currentState.mondayChecked &&
      currentState.tuesdayChecked &&
      currentState.wednesdayChecked &&
      currentState.thursdayChecked &&
      currentState.fridayChecked &&
      currentState.saturdayChecked
  );
};

handleCheckboxChange = (day) => (event) => {
  this.setState(
      { [`${day}Checked`]: event.target.checked },
      () => {
          // After updating checkbox state, check if all checkboxes are checked
          this.updateAllCheckedState();
      }
  );
};
updateSelectedAttendance = () => {
  // Check if all checkboxes for the row are checked
  const allCheckboxesChecked = this.state.sundayChecked && this.state.mondayChecked &&
      this.state.tuesdayChecked && this.state.wednesdayChecked &&
      this.state.thursdayChecked && this.state.fridayChecked && this.state.saturdayChecked;
  
  // If all checkboxes for the row are checked, update attendance to 'PP', else keep the current selected attendance option
  this.setState({ attendance: allCheckboxesChecked ? 'PP' : this.state.attendance });
};

getSelectValue() {
  const { sundayChecked, mondayChecked, tuesdayChecked, wednesdayChecked, thursdayChecked, fridayChecked, saturdayChecked } = this.state;

  if (!sundayChecked || !mondayChecked || !tuesdayChecked ||
      !wednesdayChecked || !thursdayChecked || !fridayChecked ||
      !saturdayChecked) {
      return 'AA';
  } else {
      return 'PP';
  }
}
handleSubmit = () => {

  const { data,team_id,week } = this.state;
  // console.log("data",data)
  // return;
  if(team_id !== "" && week !== ""){
    globalattendanceService.createGlobalattendance(data)
    .then((res) => {
      this.setState({
        loading: false,
      })
      if (res.status) {
        createNotification('Attendance Uploaded', 'success', 'filled')
        this.clearValue()
      }
      else {
        createNotification(res.message, 'error', 'filled');
      }
    })
    .catch((error) => {
      this.setState({
        loading: false,
      })
    });
  }else{
    createNotification('Please fill mandatory field','error','filled')
  }
  
}

updateAllCheckedState = () => {
  const { sundayChecked, mondayChecked, tuesdayChecked, wednesdayChecked, thursdayChecked, fridayChecked, saturdayChecked } = this.state;
  // Check if all checkboxes are checked
  const isAllChecked = sundayChecked && mondayChecked && tuesdayChecked &&
      wednesdayChecked && thursdayChecked && fridayChecked && saturdayChecked;
  // Update state with the result
  this.setState({ isAllChecked });
};

onSelectChange = selectedRowKeys => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  handleleavedays = (selectedOptions) => {
    this.setState({ leavedays: selectedOptions.value })
}
onChangeFileUpload(files)
{
  this.setState({
    loading : true
  })
  globalattendanceService.fileUpload(files[0])
    .then((res) => { 
      this.setState({
        loading : false
      })
      if(res.status)
      {
       if(res.data)
       {
        if(res.data.status)   
        {   
       
          createNotification('Uploaded','success','filled')
          this.fetchinternalauditCount()
        } 
        else
        {
        
          createNotification(res.data.message,'error','filled');
        } 
       }  
      }
       
  
  })
  .catch((error) => { 
    this.setState({
      loading : false
    })
    });
}
renderTemplate()
{
  const {languageData,locale} = this.props

  const column_name = ["UserName", "Week", "Date", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Upload Username"]
    return(
      
      <Workbook filename="AttendanceUpload.xlsx" element={
          <Button className = "button-width"
           color="secondary" >
          {onChangeLanguage(locale,'Download Template',languageData)} 
          </Button>
        }>
        <Workbook.Sheet data={[]} name="Sheet A">
        {column_name && column_name.map((value,index) =>
         <Workbook.Column label={value} value={value}  />
         )}
        </Workbook.Sheet> 
      </Workbook>
   

    );
}

    render()
    {
        const {match,locale,languageData,} = this.props
        const {enddate,startdate,team_id,team_data,is_submit,loading,data,page,pageSize,tlname,column_value,
          checklist_data,teamdata,week_data,week,submit_column,selectedRowKeys,attendance,isAllChecked,attendance_date,start_datetime,tldata  } = this.state
          var attendance_data = [
            {
              "label": "Present",
              "value": "PP"
            },
            {
              "label": "Absent",
              "value": "AA"
            },
          ];
          var leave_data = [
            {
              "label": "Working Hours",
              "value": ""
            },
            {
              "label": "0",
              "value": "0"
            },
            {
              "label": "1",
              "value": "1"
            },
            {
              "label": "2",
              "value": "2"
            },
            {
              "label": "3",
              "value": "3"
            },
            {
              "label": "4",
              "value": "4"
            },
            {
              "label": "5",
              "value": "5"
            },
            {
              "label": "6",
              "value": "6"
            },
            {
              "label": "7",
              "value": "7"
            },
            {
              "label": "8",
              "value": "8"
            },
            {
              "label": "9",
              "value": "9"
            },
            {
              "label": "10",
              "value": "10"
            },
            {
              "label": "11",
              "value": "11"
            },
            {
              "label": "12",
              "value": "12"
            },

          ];
        var columnsss = [],columndata = []
        const  column_data = [
              {
                title: onChangeLanguage(locale, 'User Name', languageData),
                dataIndex: 'name',
                key: 'name',
                width: 150, // Adjust width as needed
                align: 'center', // Align content to center
                sorter: (a, b) => a.name.localeCompare(b.name), // Sorts in ascending order
                render: (text, record, index) => (
                    <div style={{ padding: '2px' }}>
                        {text}
                    </div>
                ),
            },
            {
                title: onChangeLanguage(locale, 'User ID', languageData),
                dataIndex: 'username',
                key: 'username',
                width: 150, // Adjust width as needed
                align: 'center', // Align content to center
                render: (text, record, index) => (
                    <div style={{ padding: '2px' }}>
                        {text}
                    </div>
                ),
            },
            {
              title: (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Checkbox
                    checked={this.state.sundayCheckedAll}
                    onChange={() => this.onChangeOverallCheckbox(!this.state.sundayCheckedAll, "sunday")}
                  />
                  <span style={{ marginLeft: '8px' }}>Sunday All</span>
                </div>
              ),
              dataIndex: 'sunday',
              key: 'sunday',
              align: 'center', // Align content to center
              width: 100, // Adjust width as needed
              render: (text, record, index) => {
                return (
                  <div style={{ padding: '2px', display: "flex", alignItems: "center" }}>
                    <Checkbox
                      checked={record.sunday}
                      style={{ color: record.sundayChecked ? 'green' : 'inherit' }}
                      onChange={(e) => {
                        this.onChangeCheckbox(e.target.checked, 'sunday', record.username);
                      }}
                    />
                    <div style={{ marginLeft: '10px' }}>
                      <Select
                        className="react-select fontstyle ms-2"
                        classNamePrefix="react-select"
                        value={{ label: record.sunday_leave_type, value: record.sunday_leave_type }}
                        options={leave_data}
                        onChange={selectedOption => {
                          this.handleleavedays(selectedOption, record);
                          this.onChangeLeaveType(selectedOption, record, "sunday_leave_type");
                        }}
                        style={{ width: '100%' }}
                        styles={{
                          control: provided => ({ ...provided, width: 90, paddingLeft: 0 })
                        }}
                      />
                    </div>
                  </div>
                );
              }
            },
            
            
            {
              // title: 'Monday',
              title: (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Checkbox
                    checked={this.state.mondayCheckedAll}
                    onChange={() => this.onChangeOverallCheckbox(!this.state.mondayCheckedAll, "monday")}
                  />
                  <span style={{ marginLeft: '8px' }}>Monday All</span>
                </div>
              ),
              dataIndex: 'monday',
              key: 'monday',
              align: 'center', // Align content to center
              width: 100, // Adjust width as needed
              render: (text, record, index) => {
                // console.log("record", record);
                return (
                  <div style={{ padding: '2px', display: "flex", alignItems: "center"}}>

                      
                   
                         <Checkbox
                          checked={record.monday} // Set checked attribute based on record's specific state or default to true
                          style={{ color: record.MondayChecked ? 'green' : 'inherit' }}
                          onChange={(e) => {
                            this.onChangeCheckbox(e.target.checked, 'monday', record.username);
                            
                        }}
                          
                      /> <div style={{ marginLeft: '10px' }}>
                                                <Select
                            className="react-select fontstyle ms-2"
                            classNamePrefix="react-select"
                            value={{ label: record.monday_leave_type, value: record.monday_leave_type}}
                            options={leave_data}
                            onChange={selectedOption => {
                              this.handleleavedays(selectedOption, record);
                              this.onChangeLeaveType(selectedOption, record, "monday_leave_type");
                            }}
                            style={{ width: '100%' }}
                            styles={{
                              control: provided => ({ ...provided, width: 90, paddingLeft: 0 }) // Set width and remove left padding
                            }}                        
                        />
                    </div>
                  </div>
                )}
          },
          {
            // title: 'Tuesday',
            title: (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Checkbox
                  checked={this.state.tuesdayCheckedAll}
                  onChange={() => this.onChangeOverallCheckbox(!this.state.tuesdayCheckedAll, "tuesday")}
                />
                <span style={{ marginLeft: '8px' }}>Tuesday All</span>
              </div>
            ),
            dataIndex: 'tuesday',
            key: 'tuesday',
            align: 'center', // Align content to center
            width: 100, // Adjust width as needed
            render: (text, record, index) => {
              // console.log("record", record);
              return (
                <div style={{ padding: '2px', display: "flex", alignItems: "center"}}>

                    
                 
                       <Checkbox
                        checked={record.tuesday} // Set checked attribute based on record's specific state or default to true
                        style={{ color: record.TuesdayChecked ? 'green' : 'inherit' }}
                        onChange={(e) => {
                          console.log("record",record)
                          this.onChangeCheckbox(e.target.checked, 'tuesday', record.username);
                          
                      }}
                        
                    /> <div style={{ marginLeft: '10px' }}>
                                              <Select
                          className="react-select fontstyle ms-2"
                          classNamePrefix="react-select"
                          value={{ label: record.tuesday_leave_type, value: record.tuesday_leave_type}}
                          options={leave_data}
                          onChange={selectedOption => {
                            this.handleleavedays(selectedOption, record);
                            this.onChangeLeaveType(selectedOption, record, "tuesday_leave_type");
                          }}
                          style={{ width: '100%' }}
                          styles={{
                            control: provided => ({ ...provided, width: 90, paddingLeft: 0 }) // Set width and remove left padding
                          }}                        
                      />
                  </div>
                </div>
              )}
        },
        {
          // title: 'Wednesday',
          title: (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Checkbox
                checked={this.state.wednesdayCheckedAll}
                onChange={() => this.onChangeOverallCheckbox(!this.state.wednesdayCheckedAll, "wednesday")}
              />
              <span style={{ marginLeft: '8px' }}>Wednesday All</span>
            </div>
          ),
          dataIndex: 'wednesday',
          key: 'wednesday',
          align: 'center', // Align content to center
          width: 100, // Adjust width as needed
          render: (text, record, index) => {
            // console.log("record", record);
            return (
              <div style={{ padding: '2px', display: "flex", alignItems: "center"}}>

                  
               
                     <Checkbox
                      checked={record.wednesday} // Set checked attribute based on record's specific state or default to true
                      style={{ color: record.WednesdayChecked ? 'green' : 'inherit' }}
                      onChange={(e) => {
                        this.onChangeCheckbox(e.target.checked, 'wednesday', record.username);
                        
                    }}
                      
                  /> <div style={{ marginLeft: '10px' }}>
                                            <Select
                        className="react-select fontstyle ms-2"
                        classNamePrefix="react-select"
                        value={{ label: record.wednesday_leave_type, value: record.wednesday_leave_type}}
                        options={leave_data}
                        onChange={selectedOption => {
                          this.handleleavedays(selectedOption, record);
                          this.onChangeLeaveType(selectedOption, record, "wednesday_leave_type");
                        }}
                        style={{ width: '100%' }}
                        styles={{
                          control: provided => ({ ...provided, width: 90, paddingLeft: 0 }) // Set width and remove left padding
                        }}                        
                    />
                </div>
              </div>
            )}
      },
      {
        // title: 'Thursday',
        title: (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Checkbox
              checked={this.state.thursdayCheckedAll}
              onChange={() => this.onChangeOverallCheckbox(!this.state.thursdayCheckedAll, "thursday")}
            />
            <span style={{ marginLeft: '8px' }}>Thursday All</span>
          </div>
        ),
        dataIndex: 'thursday',
        key: 'thursday',
        align: 'center', // Align content to center
        width: 100, // Adjust width as needed
        render: (text, record, index) => {
          // console.log("record", record);
          return (
            <div style={{ padding: '2px', display: "flex", alignItems: "center"}}>

                
             
                   <Checkbox
                    checked={record.thursday} // Set checked attribute based on record's specific state or default to true
                    style={{ color: record.ThursdayChecked ? 'green' : 'inherit' }}
                    onChange={(e) => {
                      this.onChangeCheckbox(e.target.checked, 'thursday', record.username);
                      
                  }}
                    
                /> <div style={{ marginLeft: '10px' }}>
                                          <Select
                      className="react-select fontstyle ms-2"
                      classNamePrefix="react-select"
                      value={{ label: record.thursday_leave_type, value: record.thursday_leave_type}}
                      options={leave_data}
                      onChange={selectedOption => {
                        this.handleleavedays(selectedOption, record);
                        this.onChangeLeaveType(selectedOption, record, "thursday_leave_type");
                      }}
                      style={{ width: '100%' }}
                      styles={{
                        control: provided => ({ ...provided, width: 90, paddingLeft: 0 }) // Set width and remove left padding
                      }}                        
                  />
                </div>
            </div>
          )}
    },
    {
      // title: 'Friday',
      title: (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Checkbox
            checked={this.state.fridayCheckedAll}
            onChange={() => this.onChangeOverallCheckbox(!this.state.fridayCheckedAll, "friday")}
          />
          <span style={{ marginLeft: '8px' }}>Friday All</span>
        </div>
      ),
      dataIndex: 'friday',
      key: 'friday',
      align: 'center', // Align content to center
      width: 100, // Adjust width as needed
      render: (text, record, index) => {
        // console.log("record", record);
        return (
          <div style={{ padding: '2px', display: "flex", alignItems: "center"}}>

              
           
                 <Checkbox
                  checked={record.friday} // Set checked attribute based on record's specific state or default to true
                  style={{ color: record.FridayChecked ? 'green' : 'inherit' }}
                  onChange={(e) => {
                    this.onChangeCheckbox(e.target.checked, 'friday', record.username);
                    
                }}
                  
              /> <div style={{ marginLeft: '10px' }}>
                                        <Select
                    className="react-select fontstyle ms-2"
                    classNamePrefix="react-select"
                    value={{ label: record.friday_leave_type, value: record.friday_leave_type}}
                    options={leave_data}
                    onChange={selectedOption => {
                      this.handleleavedays(selectedOption, record);
                      this.onChangeLeaveType(selectedOption, record, "friday_leave_type");
                    }}
                    style={{ width: '100%' }}
                    styles={{
                      control: provided => ({ ...provided, width: 90, paddingLeft: 0 }) // Set width and remove left padding
                    }}                        
                />
              </div>
          </div>
        )}
  },
  {
    // title: 'Saturday',
    title: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Checkbox
          checked={this.state.saturdayCheckedAll}
          onChange={() => this.onChangeOverallCheckbox(!this.state.saturdayCheckedAll, "saturday")}
        />
        <span style={{ marginLeft: '8px' }}>Saturday All</span>
      </div>
    ),
    dataIndex: 'saturday',
    key: 'saturday',
    align: 'center', // Align content to center
    width: 100, // Adjust width as needed
    render: (text, record, index) => {
      // console.log("record", record);
      return (
        <div style={{ padding: '2px', display: "flex", alignItems: "center"}}>

            
         
               <Checkbox
                checked={record.saturday} // Set checked attribute based on record's specific state or default to true
                style={{ color: record.SaturdayChecked ? 'green' : 'inherit' }}
                onChange={(e) => {
                  this.onChangeCheckbox(e.target.checked, 'saturday', record.username);
                  
              }}
                
            /> <div style={{ marginLeft: '10px' }}>
                                      <Select
                  className="react-select fontstyle ms-2"
                  classNamePrefix="react-select"
                  value={{ label: record.saturday_leave_type, value: record.saturday_leave_type}}
                  options={leave_data}
                  onChange={selectedOption => {
                    this.handleleavedays(selectedOption, record);
                    this.onChangeLeaveType(selectedOption, record, "saturday_leave_type");
                  }}
                  style={{ width: '100%' }}
                  styles={{
                    control: provided => ({ ...provided, width: 90, paddingLeft: 0 }) // Set width and remove left padding
                  }}                        
              />
          </div>
        </div>
      )}
},

                
        ];
        // console.log("HERE", data)
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
            <title>{onChangeLanguage(locale,'Global Attendance',languageData)}</title>
            <Row>
              <Colxx xxs="12">
              <div className="row">
                <div className="col-md-8">
                <Breadcrumb heading={onChangeLanguage(locale,'Global Attendance',languageData)} match={match} />
                </div>
              
              {/* <div className="col-md-4 space-margin">
                      <Button className = "button-width" color="primary">
                            <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
                            <a style= {{margin :'0px'}} > {onChangeLanguage(locale,'Upload',languageData)} </a>
                            <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                                className = "filepicker_customButton"
                                style = {{width : '26%',marginLeft :'-22%'}}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
                        </Button>
                        {this.renderTemplate()}
                        </div> */}
                   
            </div>
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
                          
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Team',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                        <Select  className={is_submit === true && team_id === ''?  "error-border-select":"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={team_data.filter(option =>option.value === team_id)}
                                            options={team_data}
                                            onChange={(option) => this.onChangeTeam(option.value)}
                                            
                                        />
                                </div>
                                <div className="col-md-3 space-margin">
                                    <Label className="fontstyle normal-font">
                                        {onChangeLanguage(locale, 'Week', languageData)}
                                        <a style={{ color: 'red' }}>*</a>
                                    </Label>
                                    <Select
                                        className={is_submit === true && week === '' ? "error-border-select" : "react-select fontstyle"}
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={this.state.week_value}
                                        options={week_data}
                                        onChange={(option) => this.onChangeWeek(option.value, week, week_data)}
                                        clearValues={() => this.setState({ week: null })}
                                    />
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'TL Username',languageData)}</Label>
                                        <Select  className={is_submit === true && tlname === ''?  "error-border-select":"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={tldata.filter(option =>option.name === tlname)}
                                            // options={tldata}
                                            options={[{ label: "-- All --", value: "" }, ...tldata]}
                                            onChange={(option) => this.onChangeTL(option.name)}
                                            
                                        />
                                </div>
             
                             </div>
                           
                
                </div> 
                <div style = {{padding :'10px',width:'100%',overflow:'auto'}}>
                  
              
                                  <div>
                          {(columnsss.length > 0 && data.length > 0) && (
                            <div>
                              {/* <div style={{ display: "flex", justifyContent: "space-between"}}>
                                <div> 
                                  <Checkbox
                                    checked={this.state.sundayCheckedAll}
                                    onChange={() => this.onChangeOverallCheckbox(!this.state.sundayCheckedAll, "sunday")}
                                  /> Sunday all
                                </div>
                                <div>
                                  <Checkbox
                                    checked={this.state.saturdayCheckedAll}
                                    onChange={() => this.onChangeOverallCheckbox(!this.state.saturdayCheckedAll, "saturday")}
                                  /> Saturday all
                                </div>
                              </div> */}
                              <Table
                                columns={columnsss}
                                pagination={pagination}
                                dataSource={data}
                                // rowKey="id"
                                rowKey={(record) => record.id || `${record.username}-${record.week}`}
                                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                              />
                            </div>
                          )}
                           <Button className = "button-width" color="secondary" 
                                onClick={()=>this.handleSubmit ()} >
                                  <i className = "simple-icon-cloud-download" style = {{marginRight:'5px'}}/>
                                  {onChangeLanguage(locale,'Submit',languageData)}</Button>
                        </div> 
                      
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

