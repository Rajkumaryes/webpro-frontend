import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label, Input, Button, Popover, PopoverBody } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../toast';
import DatePicker from "../datePicker";
import { onChangeLanguage, get_array_id,convertUTCToLocalDate} from '../../../helper'
import { regionService } from '../../../redux/region/saga'
import { teamsService } from '../../../redux/teams/saga'
import { areaService } from '../../../redux/area/saga';
import { Select } from 'antd';
import { LocationService } from '../../../redux/location/saga'
import { TLService } from '../../../redux/tl/saga'
import { ManagerService } from '../../../redux/manager/saga'
import { directorService } from '../../../redux/director/saga'
import { userService } from '../../../redux/users/saga'
import { dashboardService } from '../../../redux/dashboard/saga'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import moment from 'moment';
import HighBarChart from '../barHicharts'

const { Option } = Select;


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      fromdate: '',
      todate: '',
      open_popup: '',
      tabvalue: 'Productivity',
      days_value: 'Weekly',
      dayscount_arr: ["Daily", "Weekly", "Monthly"],
      centre_arr: [],
      centre_value: [],
      director_user_arr: [],
      director_value:[],
      manager_user_arr: [],
      manager_value: [],
      region_data: [],
      region_value: [],
      area_data: [],
      area_value: [],
      subarea_data: [],
      subarea_value: [],
      team_leader_data: [],
      teamleader_value: [],
      user_data: [],
      user: [],
      data:[],
      select_type : [],
      final_length:25,
      is_submit:false,
   
    };
  }
  componentDidMount() {
 
    this.onClickDay('Weekly')
    this.fetchteam()
    this.fetchregion()
    this.fetcharea()
    this.fetch_location()
    this.fetch_tl()
    this.fetch_manager()
    this.fetch_director()

  }
  fetchregion() {
    this.setState({ loading: true })
    regionService.fetchregion()
      .then((res) => {
        this.setState({ loading: false })
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return { label: cusmaidid.region, value: cusmaidid.id.toString() };
          });
          this.setState({
            region_data: regionlist,
          })
        }
      })
      .catch((error) => { this.setState({ loading: false }) });
  }
  fetcharea() {
    this.setState({ loading: true })
    areaService.fetcharea()
      .then((res) => {
        this.setState({ loading: false })
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return {
              label: cusmaidid.name, text: cusmaidid.name,
              value: cusmaidid.id.toString(), region: cusmaidid.region,
            };
          });
          this.setState({
            area_data: regionlist,
          })
        }
      })
      .catch((error) => { this.setState({ loading: false }) });
  }
  fetchteam() {
    this.setState({ loading: true })
    teamsService.fetchteams()
      .then((res) => {
        this.setState({ loading: false })
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return {
              label: (cusmaidid.name + '-' + cusmaidid.country_code),
              value: cusmaidid.id.toString(), area: cusmaidid.area, country_code: cusmaidid.country_code
            };
          });
          this.setState({
            subarea_data: regionlist,
          })
        }
      })
      .catch((error) => { this.setState({ loading: false }) });
  }
 
  fetch_location() {
    this.setState({ loading: true })
    LocationService.fetchLocation()
      .then((res) => {
        this.setState({ loading: false })
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return { label: cusmaidid.name, value: cusmaidid.id.toString() };
          });
          this.setState({
            centre_arr: regionlist,
          })
        }
      })
      .catch((error) => { this.setState({ loading: false }) });
  }
  fetch_tl() {
    TLService.fetchtl()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return { label: cusmaidid.name, value: cusmaidid.name };
          });
          this.setState({
            team_leader_data: regionlist,
          })
        }
      })
      .catch((error) => { this.setState({ loading: false }) });
  }
  fetch_manager() {
    ManagerService.fetchManager()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return { label: cusmaidid.name, value: cusmaidid.name };
          });
          this.setState({
            manager_user_arr: regionlist,
          })
        }
      })
      .catch((error) => { this.setState({ loading: false }) });
  }
  fetch_director() {
    directorService.fetchDirector()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return { label: cusmaidid.name, value: cusmaidid.name };
          });
          this.setState({
            director_user_arr: regionlist,
          })
        }
      })
      .catch((error) => { this.setState({ loading: false }) });
  }

  
  clearData()
  {
    this.setState({
      open_popup: '',
      days_value: 'Weekly',
      centre_value: [],
      director_value:[],
      manager_value: [],
      region_value: [],
      area_value: [],
      subarea_value: [],
      teamleader_value: [],
      user: [],
      user_data:[],
      select_type : [],
      data:[],
      is_submit:false
    })
    this.onClickDay('Weekly')
  }
  setTypeValue(value,type)
  {
    const {select_type } = this.state
    var array = [...select_type]
    array = array.filter(option => option !== type)
    if(value.length > 0)
    {
      array.push(type)
    }
    this.setState({
      select_type : array,
      open_popup:''
    })

  }

  handleChangeCentre = (option) => {
    if(option.length  <= this.state.final_length)
    {
      this.setState({
        centre_value: option
      })
      this.setTypeValue(option,'Centre')
    }
    else
    {
      createNotification('Please choose below 25 items','error','filled')
    }
    this.setState({
      director_value:[],
      manager_value: [],
      region_value: [],
      area_value: [],
      subarea_value: [],
      teamleader_value: [],
      user: [],
    })
   
  }
  handleChangeDirector = (option) => {

    if(option.length  <= this.state.final_length)
    {
      this.setState({
        director_value: option
      })
      this.setTypeValue(option,'Director')
    }
    else
    {
      createNotification('Please choose below 25 items','error','filled')
    }
    this.setState({
      centre_value: [],
      manager_value: [],
      region_value: [],
      area_value: [],
      subarea_value: [],
      teamleader_value: [],
      user: [],
    })
  }
  handleChangeManager = (option) => {
    if(option.length  <= this.state.final_length)
    {
      this.setState({
        manager_value: option
      })
      this.setTypeValue(option,'Manager')
    }
    else
    {
      createNotification('Please choose below 25 items','error','filled')
    }
    this.setState({
      centre_value: [],
      director_value:[],
      region_value: [],
      area_value: [],
      subarea_value: [],
      teamleader_value: [],
      user: [],
    })
  }
  handleChangeTeamLeader = (option) => {
   
    if(option.length  <= this.state.final_length)
    {
      this.setState({
        teamleader_value: option
      })
      this.setTypeValue(option,'Team Leader')
    }
    else
    {
      createNotification('Please choose below 25 items','error','filled')
    }
    this.setState({
      centre_value: [],
      director_value:[],
      manager_value: [],
      region_value: [],
      area_value: [],
      subarea_value: [],
      user: [],
    })
  }
  handleChangeRegion = (option) => {
    this.setState({
      centre_value: [],
      director_value:[],
      manager_value: [],
      area_value: [],
      subarea_value: [],
      teamleader_value: [],
      user: [],
    })
    if(option.length  <= this.state.final_length)
    {
      this.setState({
        region_value: option,
        
      })
      this.setTypeValue(option,'Region')
    }
    else
    {
      createNotification('Please choose below 25 items','error','filled')
    }
  
    
  }
  handleChangeArea = (option) => {
    this.setState({
      centre_value: [],
      director_value:[],
      manager_value: [],
      // region_value: [],
      subarea_value: [],
      teamleader_value: [],
      user: [],
    })
    if(option.length  <= this.state.final_length)
    {
      this.setState({
        area_value: option,
        
      })
      this.setTypeValue(option,'Area')
    }
    else
    {
      createNotification('Please choose below 25 items','error','filled')
    }
   
    
  }
  handleChangeSubArea = (option) => {
    
    this.setState({
      centre_value: [],
      director_value:[],
      manager_value: [],
      // region_value: [],
      // area_value: [],
      teamleader_value: [],
      user: [],
    })
    if(option.length  <= this.state.final_length)
    {
      this.setState({
        subarea_value: option,
        
      })
      this.setTypeValue(option,'Subarea')
    }
    else
    {
      createNotification('Please choose below 25 items','error','filled')
    }
  }
  handleChangeUser = option => {
    this.setState({
      centre_value: [],
      director_value:[],
      manager_value: [],
      region_value: [],
      area_value: [],
      subarea_value: [],
      teamleader_value: [],
    })
    if(option.length  <= this.state.final_length)
    {
      this.setState({
        user: option,
      })
      this.setTypeValue(option,'User')
    }
    else
    {
      createNotification('Please choose below 25 items','error','filled')
    }
    
  };
  
  handleChangeFromDate(date)
   {
     this.setState({
       fromdate:date,
       todate:'',
       days_value:''
     })

   }
   handleChangeEndDate(date)
   {
     this.setState({
       todate:date
     })
   }
  closedate() {
    const {fromdate,todate} = this.state
    if ((fromdate && fromdate !== '' && fromdate !== null) && (todate && todate !== '' && todate !== null)) {
      this.setState({ open_popup: '' })
    }
    else 
    {
      createNotification('Please choose date', 'error', 'filled')
    }

  }
  onClickDay(value) {

    this.setState({
      days_value: value
    })
    if (value === "Weekly") {
      this.getdaywiseChart(6, value)
    }
    else if (value === "Monthly") {
      this.getdaywiseChart(29, value)
    }
    else if (value === "Daily") {
      this.getdaywiseChart(0, value)
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
    if(days_value === "Weekly")
    {
      var startOfWeek = moment().startOf('week').toDate();
      finalDate = moment(startOfWeek).format('YYYY-MM-DD')
    }
    else if(days_value === "Monthly")
    {
      var startOfWeek = moment().startOf('month').toDate();
      finalDate = moment(startOfWeek).format('YYYY-MM-DD')
    }
    else if(days_value === "This Year")
    {
      var startOfWeek = moment().startOf('year').toDate();
      finalDate = moment(startOfWeek).format('YYYY-MM-DD') 
    }
    this.setState({
      fromdate: new Date(finalDate),
      todate: new Date(currentdate),
      open_popup:''
    })

  }

  getArrayValue(array, array1, key) {
    var list = []
    for(var i = 0; i<array.length;i++)
    {
      for(var j = 0; j<array1.length;j++)
      {
          if(array[i][key] === array1[j].value)
          {
            list.push(array[i])
          }
      }
    
    }

    return list
  }
  onSubmitData()
  {
    const {fromdate,todate,select_type} = this.state
    if((fromdate && fromdate !== '' && fromdate !== null) && (todate && todate !== '' && todate !== null) && select_type.length > 0)
    {
      // console.log("lhlklkvjkvk " , JSON.stringify(select_type))
      this.callDashboard()
    }
    else
    {
      createNotification('Please choose any one filter and proper Date','error','filled')
    }


  }
  callDashboard()
  {
    const {select_type ,user} = this.state
    const type = select_type[select_type.length - 1]
    this.setState({
      data:[],
      is_submit:false,
      open_popup:''
    })
    if(type === 'User')
    {
      this.fetchDahboard(user,type)
    }
    else
    {
      this.getUser(type)
    }
  }

  getUser(type)
  {

    const {centre_value,director_value,manager_value,teamleader_value,
    region_value,area_value,subarea_value} = this.state
    
    var centre = [],region = [] ,area = [] ,subarea = [] ,teamleader = [],
    director = [] ,manager = []
    if(type === 'Centre')
    {
      centre = get_array_id(centre_value)
    }
    else if(type === 'Director')
    {
      director = get_array_id(director_value)
    }
    else if(type === 'Manager')
    {
      manager = get_array_id(manager_value)
    }
    else if(type === 'Team Leader')
    {
      teamleader = get_array_id(teamleader_value)
    }
    else if(type === 'Region')
    {
      region = get_array_id(region_value)
    }
    else if(type === 'Area')
    {
      area = get_array_id(area_value)
    }
    else if(type === 'Subarea')
    {
      subarea = get_array_id(subarea_value)
    }

    this.setState({ loading: true })
    userService.userFilter(centre,director,manager,teamleader,region,area,subarea,type)
      .then((res) => {
        this.setState({ loading: false })
        if (res.status) {
          if(res.data)
          {
            if(res.data.length > 0)
            {
              this.fetchDahboard(res.data,type)
            }
          }
          
        }
        else
        {
          createNotification(res.message,'error','filled')
        }
      })
      .catch((error) => { this.setState({ loading: false }) });
  }

  fetchDahboard(array,type)
  {
    
    const {fromdate,todate} = this.state
    const {API_NAME,MENU} = this.props
    this.setState({ loading: true })
    var list = []
    for(var i = 0;i < array.length ; i++)
    {
      list.push({
        startdate : fromdate,
        enddate : todate,
        user_array:type === 'User' ? [array[i]] : array[i].user_array,
        name:type === 'User' ? array[i] : array[i].name,
        menu :MENU,
      })
    }
    dashboardService.fetchdashboard(API_NAME,list)
      .then((res) => {
        this.setState({ loading: false })
        if (res.status) 
        {
          if(res.data)
          {
            this.setState({
              is_submit:true,
              data:res.data
            })
          }
        }
        else
        {
          createNotification(res.message,'error','filled')
        }
      })
      .catch((error) => { this.setState({ loading: false }) });
  }
  handleSearchuser = value => {

    if (value) {

      this.fetchuser(value)
     
    } else {
      this.setState({ user_data: [] });
    }
  };
  fetchuser(username)
  {
    userService.userSearch((username).toUpperCase())
    .then((res) => {
     
      if (res.status) {
        if(res.data)
        {
          let filterstatus = (res.data).filter(item => item.is_active === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return { label: cusmaidid.username, value: cusmaidid.username };
          });
          this.setState({ user_data:regionlist });
        }
        
      }
     
    })
    .catch((error) => { });
  }
  
 
  
  render() {
    const { locale, languageData } = this.props
    const { loading, open_popup, fromdate, todate, days_value, dayscount_arr,
      centre_arr, centre_value, director_user_arr, director_value, manager_user_arr, manager_value,
      region_data, region_value, area_data, area_value, subarea_data, subarea_value, team_leader_data, teamleader_value,
      user_data, user,is_submit } = this.state
      const options = user_data.map(d => <Option key={d.value}>{d.label}</Option>);
    return (
      <>
        {loading &&
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
        <div>
        <div className="publishuser-card-component" style={{ padding: '10px', borderRadius: '10px', marginBottom: '15px' }}>
            <div className="row">
              <div className="col-md-3">
              <Label className="fontstyle"> {onChangeLanguage(locale, 'Select Date', languageData)}
              <a style={{ color: 'red' }}>*</a></Label>
                <span>
                  <Button color="secondary" outline
                    className="mr-1 mb-2 button-width"
                    id="Days"
                    style={{ width: '100%' }}
                    onClick={() => this.setState({ open_popup: 'Days' })}
                  >
                    {days_value !== '' ? days_value :
                      ((fromdate && fromdate !== '' && fromdate !== null) && (todate && todate !== '' && todate !== null) ? (
                        moment(convertUTCToLocalDate(fromdate)).format('MM/DD/YYYY hh:mm a') + ' - ' + moment(convertUTCToLocalDate(todate)).format('MM/DD/YYYY hh:mm a')) :
                       'Choose Date' )}
                    < i style={{ position: 'absolute', right: '18px' }} className={open_popup === 'Days' ? "simple-icon-arrow-up" : "simple-icon-arrow-down"} />
                  </Button>
                  <Popover
                    placement='bottom'
                    isOpen={open_popup === 'Days'}
                    target="Days"
                    toggle={() => this.setState({ open_popup: '' })}
                  >
                    <PopoverBody>
                      <Row>
                        {/* <Colxx xxs="12">
                          <Label className="fontstyle" style={{ color: 'red', cursor: 'pointer', padding: '5px' }} onClick={() => this.closedate()}>
                            <i className="simple-icon-close" style={{ position: 'absolute', right: '10px' }} /></Label>

                        </Colxx> */}

                        <Colxx xxs="12">
                          <div style={{ padding: '10px' }}>
                            <Label className="fontstyle"> {onChangeLanguage(locale, 'Start Date', languageData)}</Label>

                               <DatePicker
                                  selected={fromdate}
                                  className = "text-background"
                                  onChange={(date) => this.handleChangeFromDate(date)}
                                  />
                          </div>
                        </Colxx>
                        <Colxx xxs="12">
                          <div style={{ padding: '10px' }}>
                            <Label className="fontstyle"> {onChangeLanguage(locale, 'End Date', languageData)}</Label>

                               <DatePicker
                                    selected={todate}
                                    min_date= {fromdate}
                                    className = "text-background"
                                    onChange={(date) => this.handleChangeEndDate(date)}
                                    />
                          </div>
                        </Colxx>
                        <Colxx xxs="12">
                          <div className="row">
                            {dayscount_arr && dayscount_arr.map((value, index) =>
                              <div className="col-md-4 text-center">
                                <Label className="fontstyle" onClick={() => this.onClickDay(value)}
                                  style={{
                                    backgroundColor: value === days_value ? '#1E2758' : 'rgb(30, 39, 88 , 0.22)', width: '60px',
                                    borderRadius: '15px', color: value === days_value ? 'white' : 'black', fontSize: '7px', padding: '7px', cursor: 'pointer', margin: '2px 0px'
                                  }}>
                                  {onChangeLanguage(locale, value, languageData)}</Label>
                              </div>

                            )}
                          </div>
                        </Colxx>
                      </Row>
                      <div className="text-center" style={{marginTop:'10px'}}>
                        <Button className="button-width" color="primary"
                          onClick={() => this.closedate()}>
                          {onChangeLanguage(locale, 'Submit', languageData)}
                        </Button>
                      </div>
                    </PopoverBody>
                  </Popover>
                </span>


              </div>
              <div className="col-md-3 space-margin">
                  <Label className="fontstyle"> {onChangeLanguage(locale, 'Centre Level Bifurcation', languageData)}</Label>
                  <ReactMultiSelectCheckboxes className='fontstyle'
                        value={centre_value}
                        onChange={this.handleChangeCentre}
                        options={centre_arr}
                      getDropdownButtonLabel={({ placeholderButtonLabel, value }) => { if (value.length == 0) { return "Select.."; } else { var item = value.filter(item => item.label.includes('Select All')); if (item.length != 0) { return (value.length - 1) + " selected"; } else { return value.length + " selected"; } } }}
                    />
              </div>
              <div className="col-md-3 space-margin">
                  <Label className="fontstyle"> {onChangeLanguage(locale, 'Director', languageData)}</Label>
                    <ReactMultiSelectCheckboxes className='fontstyle'
                      value={director_value}
                      onChange={this.handleChangeDirector}
                      options={director_user_arr}
                      getDropdownButtonLabel={({ placeholderButtonLabel, value }) => { if (value.length == 0) { return "Select.."; } else { var item = value.filter(item => item.label.includes('Select All')); if (item.length != 0) { return (value.length - 1) + " selected"; } else { return value.length + " selected"; } } }}
                    />
              </div>
              <div className="col-md-3 space-margin">
                <Label className="fontstyle"> {onChangeLanguage(locale, 'Manager', languageData)}</Label>
                  <ReactMultiSelectCheckboxes className='fontstyle'
                    value={manager_value}
                    onChange={this.handleChangeManager}
                    options={manager_user_arr}
                    getDropdownButtonLabel={({ placeholderButtonLabel, value }) => { if (value.length == 0) { return "Select.."; } else { var item = value.filter(item => item.label.includes('Select All')); if (item.length != 0) { return (value.length - 1) + " selected"; } else { return value.length + " selected"; } } }}
                  />
              </div>
              <div className="col-md-3 space-margin">
                  <Label className="fontstyle"> {onChangeLanguage(locale, 'Team Leader', languageData)}</Label>
                      <ReactMultiSelectCheckboxes className='fontstyle'
                        value={teamleader_value}
                        onChange={this.handleChangeTeamLeader}
                        options={team_leader_data}
                        getDropdownButtonLabel={({ placeholderButtonLabel, value }) => { if (value.length == 0) { return "Select.."; } else { var item = value.filter(item => item.label.includes('Select All')); if (item.length != 0) { return (value.length - 1) + " selected"; } else { return value.length + " selected"; } } }}
                      />
              </div>
              <div className="col-md-3 space-margin">
                <Label className="fontstyle"> {onChangeLanguage(locale, 'Region', languageData)}</Label>
                <ReactMultiSelectCheckboxes className='fontstyle'
                  value={region_value}
                  onChange={this.handleChangeRegion}
                  options={region_data}
                  getDropdownButtonLabel={({ placeholderButtonLabel, value }) => { if (value.length == 0) { return "Select.."; } else { var item = value.filter(item => item.label.includes('Select All')); if (item.length != 0) { return (value.length - 1) + " selected"; } else { return value.length + " selected"; } } }}
                />
              </div>
              <div className="col-md-3 space-margin">
                <Label className="fontstyle"> {onChangeLanguage(locale, 'Area', languageData)}</Label>
                <ReactMultiSelectCheckboxes className='fontstyle'
                    value={area_value}
                    onChange={this.handleChangeArea}
                    options={this.getArrayValue(area_data,region_value,'region')  }
                  getDropdownButtonLabel={({ placeholderButtonLabel, value }) => { if (value.length == 0) { return "Select.."; } else { var item = value.filter(item => item.label.includes('Select All')); if (item.length != 0) { return (value.length - 1) + " selected"; } else { return value.length + " selected"; } } }}
                />
              </div>
              <div className="col-md-3 space-margin">
                  <Label className="fontstyle"> {onChangeLanguage(locale, 'Sub Area', languageData)}</Label>
                    <ReactMultiSelectCheckboxes className='fontstyle'
                      value={subarea_value}
                      onChange={this.handleChangeSubArea}
                      options={this.getArrayValue(subarea_data,area_value,'area')  }
                      getDropdownButtonLabel={({ placeholderButtonLabel, value }) => { if (value.length == 0) { return "Select.."; } else { var item = value.filter(item => item.label.includes('Select All')); if (item.length != 0) { return (value.length - 1) + " selected"; } else { return value.length + " selected"; } } }}
                    />
              </div>
              <div className="col-md-10 space-margin">
                 <Label className="fontstyle"> {onChangeLanguage(locale, 'User', languageData)}</Label>

                    <br></br>
                     <Select
                      showSearch
                      mode="multiple"
                      value={user}
                      placeholder='User Search'
                      style={{width:'100%'}}
                      defaultActiveFirstOption={false}
                      showArrow={false}
                      filterOption={false}
                      onSearch={this.handleSearchuser}
                      onChange={this.handleChangeUser}
                      // notFoundContent={null}
                     >
                      {options}
                    </Select>
              </div>
              
              <div className="col-md-2" style={{marginTop:'20px'}}>
                <Button className="button-width" color="secondary"
                  onClick={() => this.onSubmitData()}>
                  {onChangeLanguage(locale, 'Filter', languageData)}
                </Button>
                <Button className="button-width" color="primary"
                  onClick={() => this.clearData()}>
                  {onChangeLanguage(locale, 'Reset', languageData)}
                </Button>
              </div>
              
            </div>

          </div>

          {is_submit === true &&
            <div>
            <div className="row">
              <div className="col-md-12">
                {this.renderBarChart()}
              </div>
            </div>
          </div>
         }
        </div>
      </>
    )
  }
  setTabvlaue(tabname) {
    this.setState({
      tabvalue: tabname
    })
  }

  renderBarChart() {
    const { locale, languageData } = this.props
    const { tabvalue,data } = this.state
    var  categories = [] , value = []
    if(data && data !== null)
    {
      for(var i = 0 ; i < data.length;i++)
      {
        categories.push(data[i].user_Name) 
        if(tabvalue === 'Productivity')
        {
          value.push(data[i].productivity !== null ? parseFloat(data[i].productivity)  : 0 )
        }
        else
        {
          value.push(data[i].accuracy !== null ? parseFloat(data[i].accuracy)  : 0 )
        }
      }
    }
    
    const series = [{
      name: 'Percentage (%)',
      data:value
    },
    ]
    return (
      <div className="publishuser-card-component" style={{ margin: '10px', padding: '10px' }}>
        <div className="row" style={{ margin: '10px' }}>
          <div className="col-md-6 text-center" style={{ color: tabvalue === 'Productivity' ? 'black' : 'gray', cursor: 'pointer', fontWeight: tabvalue === 'Productivity' ? '600' : '', fontSize: '15px' }}
            onClick={() => this.setTabvlaue('Productivity')}>
            <a className="fontstyle">{onChangeLanguage(locale, 'Productivity Report', languageData)}</a>
          </div>
          <div className="col-md-6 text-center" style={{ color: tabvalue === 'Accuracy' ? 'black' : 'gray', cursor: 'pointer', fontWeight: tabvalue === 'Accuracy' ? '600' : '', fontSize: '15px' }}
            onClick={() => this.setTabvlaue('Accuracy')}>
            <a className="fontstyle">{onChangeLanguage(locale, 'Accuracy Report', languageData)}</a>
          </div>
          {/* <div className="col-md-3 text-center" style={{ color: tabvalue === 'Performance' ? 'black' : 'gray', cursor: 'pointer', fontWeight: tabvalue === 'Performance' ? '600' : '', fontSize: '15px' }}
            onClick={() => this.setTabvlaue('Performance')}>
            <a className="fontstyle">{onChangeLanguage(locale, 'Performance Report', languageData)}</a>
          </div> */}


        </div>

        <HighBarChart series={series} categories={categories} />
      </div>
    )
  }

}

const mapStateToProps = ({ settings }) => {
  const { locale, languageData, username } = settings;
  return { locale, languageData, username };
};
export default withRouter(
  connect(mapStateToProps, {

  })(Dashboard)
);

