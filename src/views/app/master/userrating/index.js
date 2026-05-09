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
import { Card, Container, Row, Col,Image } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip';
import { FaStar,FaStarHalfAlt } from 'react-icons/fa';
import {imageURL} from '../../../../constants/defaultValues';
import {setProfileImage} from '../../../../redux/actions';
import ProfileImage from '../../../../assets/img/app_image/profile.png'
import HapagLogo from '../../../../assets/img/app_image/profile.png'
import { CSVLink, CSVDownload } from "react-csv";
import{designationService} from '../../../../redux/designation/saga'

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        start_datetime:'',
        enddate:'',
        team_id:'',
        team_data:[],
        user_data:[],
        is_submit:false,
        data:[],
        page:1,
        pageSize:150,
        total :0,
        days_value:'',
        teamdata:[],
        week_no:'',
        week:'',
        submit_column:false,
        selectedRowKeys: [],
        producitivity:'',
        totalcounts:'',
        user_role:'',
        openRows: {},
        openProductivity: false,
        openAccuracy: false,
        openVBB: false,
        user_firstname:'',
        user_designation:'',
        user_productivity:'',
        user_accuracy:'',
        user_overallrating:'',
        uservbb_average:'',
        user_vbbscore:[],
        profile_image:'',
        userData:[],
        teamleaders : [],
        managers: [],
        managerUsername:[],
        selectedManager: null, 
        selectedTeamLeader: null,
        tlname : '',
        exceldata:[],
        designation_data:[],
        user_designation_name:''
      };
    }
    componentDidMount()
    {
      this.setState({
        start_datetime:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
    })
        this.fetchTeamData()
        // this.fetchuserrating()
        this.fetchWeekData();
        this.fetchUserData();
        this.findTlManagers();
        // this.fetchDesignation()
    }

    
    fetchUserData() {
      let user_id = localStorage.getItem('user_id');
      console.log("user_id", user_id);
    
      userService.fetchprofile(user_id)
        .then((res) => {
          this.setState({ loading: false });
    
          if (res.status) {
            console.log("User designation ID:", res.data.designation);
            this.setState({
              user_firstname: res.data.name,
              user_designation: res.data.designation // Set the user_designation ID
            }, this.fetchDesignation); // Fetch designation after setting user_designation
          }
        })
        .catch((error) => { 
          this.setState({ loading: false });
          console.error("Error fetching user data:", error);
        });
    }
    
    // Fetch designation data and map the designation name
    fetchDesignation() {
      designationService.fetchdesignation()
        .then((res) => { 
          this.setState({ loading: false });
    
          if (res.status) {
            console.log("Fetched designation data:", res.data);
            this.setState({ designation_data: res.data }, this.mapDesignationName);
          } else {
            this.setState({ designation_data: [] });
            console.warn("No designation data found");
          }
        })
        .catch((error) => { 
          this.setState({ loading: false });
          console.error("Error fetching designation data:", error);
        });
    }
    

    mapDesignationName() {
      const { designation_data, user_designation } = this.state;
    
      if (!designation_data || designation_data.length === 0) {
        return;
      }
      const designation = designation_data.find(item => item.id === Number(user_designation));
      // console.log("Found designation:", designation.name);
    
      if (designation) {
        this.setState({
          user_designation_name: designation.name 
        });
      } else {
        console.warn(`Designation not found for user_designation: ${user_designation}`);
      }
    }
    
    
    
    findTlManagers(){
      // const {user_id} = this.props
      let user_id = localStorage.getItem('username')
      userService.findTlManagers(user_id)
      .then((res) => {
          this.setState({loading:false})
         if(res.status)   { 
          if (res.role === 'manager') {
            if (res.teamLeaders && res.teamLeaders.length > 0) {
                const teamLeadersList = res.teamLeaders.map((leader) => ({
                    label: `${leader.username} - ${leader.name}`,
                    value: leader.username,
                }));
                this.setState({
                    teamleaders: teamLeadersList,
                    user_role: res.role,
                });
            } else {
                console.error('No active team leaders found or the teamLeaders array is empty.');
            }
        } else if (res.role === 'director') {
          // Setting the user role to 'director'
          this.setState({ user_role: res.role });
      
          if (res.managers && res.managers.length > 0) {
              const managersList = res.managers.map(manager => {
                  const teamLeadersList = manager.teamLeaders.map(leader => ({
                      label: `${leader.teamLeaderUsername} - ${leader.teamLeaderName}`,
                      value: leader.teamLeaderUsername,
                  }));
      
                  return {
                      managerUsername: manager.managerUsername,
                      managerName: manager.managerName,  // Include managerName here
                      teamleaders: teamLeadersList,
                  };
              });
      
              // Update the state with managers and reset selected values
              this.setState({
                  managers: managersList,
                  selectedManager: '', // Reset selected manager
                  selectedTeamLeader: '', // Reset selected team leader
                  teamleaders: [], // Clear the team leaders if necessary
              });
          } else {
              console.error('No managers found or the managers array is empty.');
          }
      }else if (res.role === 'user') {
        this.setState({ user_role: res.role });
      }else if(res.role === 'supervisor'){
        this.setState({ user_role: res.role });
      }
      
        
        
                 
               }
              
               })
               .catch((error) => { 
                  this.setState({
                      loading : false
                    })
               });
    }

    fetchWeekData() {
      this.setState({ loading: true });
      let weekNumbers = this.generateWeekNumbers();
  
      this.setState({
        loading: false,
        week_data: weekNumbers,
      });
    }
  
  //   generateWeekNumbers() {
  //     let currentDate = new Date();
  //     let currentYear = currentDate.getFullYear();
  //     let weekNumbers = [];
  
  //     // Loop through each week of the current year
  //     for (let i = 1; i <= 52; i++) { // Assuming 52 weeks in a year
  //         let weekStartDate = this.getWeekStartDate(currentYear, i);
  //         let weekEndDate = new Date(weekStartDate.getTime() + (6 * 24 * 60 * 60 * 1000)); // Add 6 days to get end of the week
  //         let weekLabel = `Week ${i} (${weekStartDate.toLocaleDateString()} - ${weekEndDate.toLocaleDateString()})`;
  
  //         weekNumbers.push({ label: weekLabel, value: weekLabel });
  //     }
  
  //     return weekNumbers;
  // }

  generateWeekNumbers() {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let weekNumbers = [];

    // Loop through each week of the current year
    for (let i = 1; i <= 52; i++) { // Assuming 52 weeks in a year
        let weekStartDate = this.getWeekStartDate(currentYear, i);
        let weekEndDate = new Date(weekStartDate.getTime() + (6 * 24 * 60 * 60 * 1000)); // Add 6 days to get end of the week
        
        let startYear = weekStartDate.getFullYear();
        let endYear = weekEndDate.getFullYear();

        let weekValue = `Week ${i} (${weekStartDate.toLocaleDateString()} - ${weekEndDate.toLocaleDateString()})`;
        
        let weekLabel = `${startYear} - ${endYear}`;
        
        weekNumbers.push({ label: weekLabel, value: weekValue });
    }

    return weekNumbers;
}
  
  getWeekStartDate(year, weekValue) {
      let januaryFirst = new Date(year, 0, 1);
      let firstDayOfFirstWeek = januaryFirst.getDay();
      let weekStartDay = 0; // Sunday
      let startDate = new Date(year, 0, (1 + (weekValue - 1) * 7) - firstDayOfFirstWeek + weekStartDay);
      return startDate;
  }
    



  generateYearOptions = () => {
    let years = [];
    let currentYear = moment().year();

    for (let i = currentYear - 2; i <= currentYear + 2; i++) {
        let startOfWeek48 = moment().year(i).week(48).startOf('week');
        let endOfWeek47NextYear = moment().year(i + 1).week(47).endOf('week');
        
        years.push({
            value: `${startOfWeek48.format('DD/MM/YYYY')}-to-${endOfWeek47NextYear.format('DD/MM/YYYY')}`,
            label: `${i} - ${i + 1}`, 
        });
    }

    return years;
};

handleManagerChange = (selectedOption) => {
  const selectedManager = selectedOption.value;
  const selectedManagerObj = this.state.managers.find(manager => manager.managerUsername === selectedManager);
  if (selectedManagerObj) {
      this.setState({
          selectedManager: selectedManager,
          teamleaders: selectedManagerObj.teamleaders.map(leader => ({
              value: leader.value,
              label: leader.label 
          })), // Map teamleaders to correct format
          tlname: '' // Reset selected team leader
      });
  }
};

onChangeTeamLeader(value) {
  this.setState({ tlname: value,week_no:'' });
}

onChangeWeek = (value) => {
  this.setState({ week_no: value });
  const { user_role,tlname,selectedManager } = this.state;
  const { username } = this.props;
  let finalUsername = username
  if(user_role == 'manager' || user_role == 'director'){
    finalUsername = tlname
  } 
  this.setState({ loading: true });
  this.setState({
    user_productivity: '', 
    user_accuracy: '',
    user_overallrating:'',
    uservbb_average:'',
    user_vbbscore: '', 
});
  usercountService.fetchuserrating(finalUsername, value, user_role)
      .then((res) => {
          this.setState({ loading: false });

          if (res.status) {

              const userData = res.data[0]; 
              const tablearray = [];
              const { productivity, accuracy, vbbscore,overAllRating,vbb_average,role } = userData;
              
              
             
              res.data.forEach((item,index) => {
                // console.log("userrole",item)
                const tableobj = {};
                tableobj ["User Name"] = item.username;
                tableobj ["Productivity Rating"] = item.proratedProductivityRating || 0;
                tableobj ["Accuracy Rating"] = item.proratedAccuracyRating || 0;
                tableobj ["VBB Score"] = item.vbbAverage || 0;
                tableobj ["User Rating"] = (parseFloat(item.proratedProductivityRating) || 0) + (parseFloat(item.proratedAccuracyRating) || 0) + (parseFloat(item.vbbAverage) || 0);
              
                tablearray.push(tableobj);
                this.setState({
                  exceldata:tablearray
                 })
                 this.setState({
                  user_productivity: productivity, 
                  user_accuracy: accuracy,
                  user_overallrating:overAllRating,
                  uservbb_average:vbb_average,
                  user_role : res.role,
                  user_vbbscore: vbbscore,  
                  teamdata: res.teamlist || []  
              });
              })
              createNotification('Success','success','filled');
          }else{
            createNotification('No scores found in the specified date range.','error','filled');
          }
      })
      .catch((error) => { 
          this.setState({ loading: false });
      });
};




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
    console.log("lgkjgjgkj  finalDate = " , JSON.stringify(finalDate) , 'currentdate ==>' , currentdate)
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
 



    toggleCollapse = (section) => {
        this.setState((prevState) => ({
          [section]: !prevState[section],
        }));
      };
    render()
    {
        const {match,locale,languageData,} = this.props
        const {enddate,startdate,team_id,team_data,is_submit,loading,data,page,pageSize,week_no,producitivity,totalcounts,user_role,openRows,groupedData,datadirector,
          filteredData,user_productivity,teamdata,user_firstname,user_designation,user_designation_name,ProfileImage,user_accuracy,user_vbbscore,user_overallrating,uservbb_average,
          start_datetime,openProductivity, openAccuracy, openVBB,teamleaders, tlname,exceldata,managers,selectedTeamLeader  } = this.state

          const week_data = this.generateYearOptions();

          const dashboardStyle = {
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
            // overflow: 'hidden',
          };
          
          const filterContainerStyle = {
            marginBottom: '20px',
            padding: '15px 20px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            border: '1px solid #e0e0e0',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          };
          
          const labelStyle = {
            fontSize: '1.1em',
            color: '#333',
            fontWeight: '500',
          };
          
          const requiredAsteriskStyle = {
            color: '#ff6f61',
          };
          
          const rowStyle = {
            marginBottom: '40px',
          };
          
          const profileSectionStyle = {
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #e0e0e0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start', // Align content to the left
            marginBottom: '20px',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
            width: '100%', // Ensure the card takes up the full width of its container
            maxWidth: '800px', // Optional: Define a max width to avoid the card stretching too wide
            margin: '0 auto', // Center the card horizontally
          };
          
          const profileImageContainerStyle = {
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            overflow: 'hidden',
            marginRight: '20px',
            border: '2px solid #ddd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', // Center the image inside the container
            backgroundColor: '#ffffff', // Ensure a white background around the image
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Slight shadow for depth
          };
          
          const profileImageStyle = {
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            objectFit: 'cover',
            backgroundColor: '#121C50', // Navy background for image container
            border: '2px solid #ccc', // Light border around the image
            padding: '5px', // Padding inside the border
          };
          
          const profileInfoStyle = {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', // Align text vertically
          };
          
          const profileNameStyle = {
            fontSize: '1.6em',
            color: '#333',
            margin: '0',
            fontWeight: '600',
          };
          
          const profileRoleStyle = {
            fontSize: '1em',
            color: '#777',
            margin: '0',
            fontStyle: 'italic',
          };
          
          const ratingSectionStyle = {
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '12px',
            marginTop:'20px',
            border: '1px solid #e0e0e0',
            textAlign: 'center',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
          };
          
          const sectionTitleStyle = {
            fontSize: '1.3em',
            color: '#333',
            marginBottom: '12px',
            fontWeight: '500',
          };
          
          const starContainerStyle = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
          };
          
          const starStyle = {
            color: '#ff8300',
            fontSize: '1.6em',
          };
          
          const performanceSectionStyle = {
            backgroundColor: '#ffffff',
            padding: '25px',
            borderRadius: '12px',
            border: '1px solid #e0e0e0',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
          };
          
          const metricCardStyle = {
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #e0e0e0',
            marginBottom: '20px',
            textAlign: 'center',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
          };
          
          const metricTitleStyle = {
            fontSize: '1.3em',
            color: '#333',
            marginBottom: '10px',
            fontWeight: '500',
          };
          
          const metricContentStyle = {
            fontSize: '1em',
            color: '#555',
          };
          
          const toggleButtonStyle = {
            backgroundColor: 'transparent',
            border: 'none',
            color: '#007bff',
            cursor: 'pointer',
            fontSize: '1em',
            marginTop: '10px',
            fontWeight: '600',
            transition: 'color 0.3s ease-in-out',
          };
          const smallCardStyle = {
            width: '200px',  // Set width to make it small
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: '#f4f4f4',  // You can adjust the background color
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            marginBottom: '15px'
          };
          
          const cardTitleStyle = {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#121C50'  // Adjust to your preferred color
          };
          
          const cardTextStyle = {
            fontSize: '14px',
            color: '#555'  // Adjust the text color
          };
          
          const averageScoreStyle = {
            marginTop: '15px',
            fontSize: '16px',
            color: '#121C50',
            fontWeight: 'bold'
          };

          const getResponsiveCardStyle = () => ({
            flex: '1 1 calc(33% - 15px)',
            minWidth: '200px',
            maxWidth: '300px',
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: '#f4f4f4',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            marginBottom: '15px',
            textAlign: 'center'
          });
          
          
          const hours = Array.from({ length: 24 }, (_, i) => i + 1);
        return (
            <>
            <title>{onChangeLanguage(locale,'User Rating',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'User Rating',languageData)} match={match} />
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


{/* <h1 style = {{padding:'20px'}}>Hourly Performance</h1> */}
<div className="dashboard" style={dashboardStyle}>
{(user_role && (user_role === 'user')) && (
  <div className="row" style={{ padding: '10px', marginBottom: '20px', alignItems: 'center' }}>
    <div className="col-md-3 space-margin" style={{ ...filterContainerStyle, marginRight: '10px' }}>
      <Label className="fontstyle normal-font" style={labelStyle}>
        Year <a style={requiredAsteriskStyle}>*</a>
      </Label>
      <Select
        className={is_submit && week_no === '' ? "error-border-select" : "react-select fontstyle"}
        classNamePrefix="react-select"
        name="form-field-name"
        value={week_data.filter(option => option.value === week_no)}
        options={week_data}
        onChange={(option) => this.onChangeWeek(option.value)}
        clearValues={() => this.setState({ week_no: null })}
      />
    </div>
  </div>
)}
{(user_role && (user_role === 'supervisor' )) && (
  <div className="row" style={{ padding: '10px', marginBottom: '20px', alignItems: 'center' }}>
    <div className="col-md-3 space-margin" style={{ ...filterContainerStyle, marginRight: '10px' }}>
      <Label className="fontstyle normal-font" style={labelStyle}>
        Year <a style={requiredAsteriskStyle}>*</a>
      </Label>
      <Select
        className={is_submit && week_no === '' ? "error-border-select" : "react-select fontstyle"}
        classNamePrefix="react-select"
        name="form-field-name"
        value={week_data.filter(option => option.value === week_no)}
        options={week_data}
        onChange={(option) => this.onChangeWeek(option.value)}
        clearValues={() => this.setState({ week_no: null })}
      />
    </div>
    <div className="col-md-4 space-margin" style={{ textAlign: 'center', marginTop: '25px' }}>
      {exceldata.length > 0 && (
        <>
          {/* Label Section */}
          <div>
            <Label className="fontstyle normal-font" style={{ ...labelStyle, display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
              Download User Rating here
            </Label>
          </div>

          {/* Button Section */}
          <div>
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
              data={exceldata}
              // Dynamically generate the filename based on the selected year label
              filename={`User_Rating_${week_data.find(option => option.value === this.state.week_no)?.label || 'No_Week_Selected'}.csv`}
            >
              <i className="simple-icon-cloud-download" style={{ marginRight: '5px' }} />
              {onChangeLanguage(locale, 'Download', languageData)}
            </CSVLink>
          </div>
        </>
      )}
    </div>
  </div>
  
)}
{(user_role && user_role === 'manager') && (
  <div className="row" style={{ padding: '10px', marginBottom: '20px', alignItems: 'center' }}>
    

    <div className="col-md-3 space-margin" style={{ ...filterContainerStyle,marginRight: '10px' }}>
      <Label className="fontstyle normal-font" style={labelStyle}>
        TeamLeader <a style={requiredAsteriskStyle}>*</a>
      </Label>
      <Select
        className={is_submit && tlname === '' ? "error-border-select" : "react-select fontstyle"}
        classNamePrefix="react-select"
        name="form-field-name"
        value={teamleaders.filter(option => option.value === tlname)}
        options={teamleaders}
        onChange={(option) => this.onChangeTeamLeader(option.value)}
        clearValues={() => this.setState({ tlname: null })}
      />
    </div>
    <div className="col-md-3 space-margin" style={{ ...filterContainerStyle, marginRight: '10px' }}>
      <Label className="fontstyle normal-font" style={labelStyle}>
        Year <a style={requiredAsteriskStyle}>*</a>
      </Label>
      <Select
        className={is_submit && week_no === '' ? "error-border-select" : "react-select fontstyle"}
        classNamePrefix="react-select"
        name="form-field-name"
        value={week_data.filter(option => option.value === week_no)}
        options={week_data}
        onChange={(option) => this.onChangeWeek(option.value)}
        clearValues={() => this.setState({ week_no: null })}
      />
    </div>
    <div className="col-md-4 space-margin" style={{ textAlign: 'center', marginTop: '25px' }}>
      {exceldata.length > 0 && (
        <>
          {/* Label Section */}
          <div>
            <Label className="fontstyle normal-font" style={{ ...labelStyle, display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
              Download User Rating here
            </Label>
          </div>

          {/* Button Section */}
          <div>
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
              data={exceldata}
              // filename={`User_Rating_${moment(enddate).format('DD-MM-YYYY')}.csv`}
              filename={`User_Rating_${week_data.find(option => option.value === this.state.week_no)?.label || 'No_Week_Selected'}.csv`}
            >
              <i className="simple-icon-cloud-download" style={{ marginRight: '5px' }} />
              {onChangeLanguage(locale, 'Download', languageData)}
            </CSVLink>
          </div>
        </>
      )}
    </div>
  </div>
)}

{(user_role && user_role === 'director') && (
  <div className="row" style={{ padding: '10px', marginBottom: '20px', alignItems: 'center' }}>
    
    <div className="col-md-3 space-margin" style={{ ...filterContainerStyle, marginRight: '10px' }}>
    {/* Manager Dropdown */}
    <Label className="fontstyle normal-font">
        Manager <span style={{ color: 'red' }}>*</span>
    </Label>
    <Select
        className="react-select fontstyle"
        classNamePrefix="react-select"
        name="managerSelect"
        options={this.state.managers.map(manager => ({
            value: manager.managerUsername,
            label: manager.managerUsername + ' - ' + manager.managerName, // Display managerName in the dropdown
        }))}
        value={this.state.selectedManager
            ? {
                value: this.state.selectedManager,
                label: this.state.managers.find(
                    manager => manager.managerUsername === this.state.selectedManager
                )?.managerName || "" // Use optional chaining to avoid undefined errors
            }
            : null
        }
        onChange={(selectedOption) => this.handleManagerChange(selectedOption)}
    />
</div>



<div className="col-md-3 space-margin" style={{ ...filterContainerStyle,marginRight: '10px' }}>
      <Label className="fontstyle normal-font" style={labelStyle}>
        TeamLeader <a style={requiredAsteriskStyle}>*</a>
      </Label>
      <Select
        className={is_submit && tlname === '' ? "error-border-select" : "react-select fontstyle"}
        classNamePrefix="react-select"
        name="form-field-name"
        value={teamleaders.filter(option => option.value === tlname)}
        options={teamleaders}
        onChange={(option) => this.onChangeTeamLeader(option.value)}
        clearValues={() => this.setState({ tlname: null })}
      />
    </div>





    {/* <div className="col-md-3 space-margin" style={{ ...filterContainerStyle,marginRight: '10px' }}>
      <Label className="fontstyle normal-font" style={labelStyle}>
        TeamLeader <a style={requiredAsteriskStyle}>*</a>
      </Label>
      <Select
        className={is_submit && tlname === '' ? "error-border-select" : "react-select fontstyle"}
        classNamePrefix="react-select"
        name="form-field-name"
        value={teamleaders.filter(option => option.value === tlname)}
        options={teamleaders}
        onChange={(option) => this.onChangeTeamLeader(option.value)}
        clearValues={() => this.setState({ tlname: null })}
      />
    </div> */}
    <div className="col-md-3 space-margin" style={{ ...filterContainerStyle, marginRight: '10px' }}>
      <Label className="fontstyle normal-font" style={labelStyle}>
        Year <a style={requiredAsteriskStyle}>*</a>
      </Label>
      <Select
        className={is_submit && week_no === '' ? "error-border-select" : "react-select fontstyle"}
        classNamePrefix="react-select"
        name="form-field-name"
        value={week_data.filter(option => option.value === week_no)}
        options={week_data}
        onChange={(option) => this.onChangeWeek(option.value)}
        clearValues={() => this.setState({ week_no: null })}
      />
    </div>
    <div className="col-md-3 space-margin" style={{ textAlign: 'center', marginTop: '10px' }}>
      {exceldata.length > 0 && (
        <>
          {/* Label Section */}
          <div>
            <Label className="fontstyle normal-font" style={{ ...labelStyle, display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
              Download User Rating here
            </Label>
          </div>

          {/* Button Section */}
          <div>
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
              data={exceldata}
              // filename={`User_Rating_${this.state.week_no}.csv`}
              filename={`User_Rating_${week_data.find(option => option.value === this.state.week_no)?.label || 'No_Week_Selected'}.csv`}
            >
              <i className="simple-icon-cloud-download" style={{ marginRight: '5px' }} />
              {onChangeLanguage(locale, 'Download', languageData)}
            </CSVLink>
          </div>
        </>
      )}
    </div>
  </div>
)}

{(user_role && (user_role === 'user')) && (
  <Row style={rowStyle}>
    <Col md={4}>
      {/* Profile Section */}
      <div style={profileSectionStyle}>
        <div style={profileImageContainerStyle}>
          <img src={HapagLogo} alt="Profile" style={profileImageStyle} />
        </div>
        <div style={profileInfoStyle}>
          <h3 style={profileNameStyle}>{user_firstname}</h3>
          <p style={profileRoleStyle}>{user_designation_name}</p>
        </div>
      </div>


      {/* User Rating Section */}
      <div style={{ ...ratingSectionStyle, padding: '20px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', borderRadius: '10px', backgroundColor: '#F8F9FA' }}>
  <h4 style={{ ...sectionTitleStyle, fontSize: '22px', fontWeight: 'bold', color: '#2C3E50' }}>User Rating</h4>
  <h4 style={{ ...sectionTitleStyle, fontSize: '28px', fontWeight: '700', color: '#27AE60' }}>{user_overallrating}</h4>
  <div style={{ ...starContainerStyle, display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
    {[...Array(5)].map((_, i) => {
      const fullStar = i < Math.floor(user_overallrating);
      const halfStar = i === Math.floor(user_overallrating) && user_overallrating % 1 !== 0;

      return fullStar ? (
        <FaStar
          key={i}
          style={{
            ...starStyle,
            fontSize: '30px',
            color: 'gold',
            margin: '0 5px'
          }}
        />
      ) : halfStar ? (
        <FaStarHalfAlt
          key={i}
          style={{
            ...starStyle,
            fontSize: '30px',
            color: 'gold',
            margin: '0 5px'
          }}
        />
      ) : (
        <FaStar
          key={i}
          style={{
            ...starStyle,
            fontSize: '30px',
            color: 'lightgray',
            margin: '0 5px'
          }}
        />
      );
    })}
  </div>
</div>

    </Col>

    <Col md={8}>
      {/* Performance Metrics Section */}
      <div style={performanceSectionStyle}>
      <Row>
  <Col md={6}>
    <div style={{ ...metricCardStyle, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', padding: '20px', borderRadius: '10px' }}>
      <h4 style={{ ...metricTitleStyle, fontSize: '20px', fontWeight: 'bold', color: '#2C3E50' }}>Productivity</h4>
      <p style={{ ...metricContentStyle, fontSize: '28px', fontWeight: '700', color: '#27AE60' }}>
        <strong>{user_productivity}</strong>
      </p>
    </div>
  </Col>
  <Col md={6}>
    <div style={{ ...metricCardStyle, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', padding: '20px', borderRadius: '10px' }}>
      <h4 style={{ ...metricTitleStyle, fontSize: '20px', fontWeight: 'bold', color: '#2C3E50' }}>Accuracy</h4>
      <p style={{ ...metricContentStyle, fontSize: '28px', fontWeight: '700', color: '#E74C3C' }}>
        <strong>{user_accuracy}</strong>
      </p>
    </div>
  </Col>
</Row>
        <Row>
        <Col md={12}>
  <div style={{ ...metricCardStyle, padding: '20px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', borderRadius: '10px', backgroundColor: '#F8F9FA' }}>
    <h4 style={{ ...metricTitleStyle, fontSize: '22px', fontWeight: 'bold', color: '#2C3E50' }}>VBB Performance</h4>
    <p style={{ ...metricContentStyle, fontSize: '28px', fontWeight: '700', color: '#E74C3C' }}>
        <strong>{uservbb_average}</strong>
      </p>
    <Collapse in={openVBB}>
      <div id="vbb-collapse-text">
        

        {/* Card Container */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'space-between' }}>
          {user_vbbscore && user_vbbscore
            .sort((a, b) => a.vbb_cycle - b.vbb_cycle)
            .map((score, index) => (
              <Card key={index} style={{ ...getResponsiveCardStyle(), padding: '15px', borderRadius: '10px', backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                <Card.Body>
                  <Card.Title style={{ ...cardTitleStyle, fontSize: '18px', fontWeight: 'bold', color: '#2980B9' }}>
                    Cycle: {score.vbb_cycle}
                  </Card.Title>
                  <Card.Text style={{ ...cardTextStyle, fontSize: '16px', color: '#27AE60', fontWeight: '600' }}>
                    Total Score: {score.total_score.toFixed(3)}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
        </div>

        {/* Display the average total score for cycles 1, 2, and 3 */}
        {user_vbbscore && (
          <div style={{ ...averageScoreStyle, marginTop: '20px', fontSize: '18px', color: '#E74C3C' }}>
            Average Total Score (Cycles 1, 2, 3): <strong>{uservbb_average}</strong>
          </div>
        )}
      </div>
    </Collapse>

    <button
      onClick={() => this.toggleCollapse('openVBB')}
      style={{ ...toggleButtonStyle, backgroundColor: '#007bff', color: '#FFFFFF', padding: '10px 20px', borderRadius: '5px', border: 'none', fontSize: '16px' }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
    >
      {openVBB ? 'Hide Details' : 'Show Details'}
    </button>
  </div>
</Col>

</Row>


      </div>
    </Col>
  </Row>
  )}
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

