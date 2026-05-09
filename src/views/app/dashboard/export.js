import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label, Input, Button, Popover, PopoverBody } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../toast';
import DatePicker from "../datePicker";
import { Checkbox} from 'antd';
import { onChangeLanguage, get_array_id,convertUTCToLocalDate,convertLocalToUTCDate} from '../../../helper'
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
      tabvalue1:'Productivity',
      days_value: '',
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
      report_data:[],
      probation:false
   
    };
  }
  componentDidMount() {
 
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
      tabvalue: 'Productivity',
      tabvalue1:'Productivity',
      open_popup: '',
      fromdate:'',
      todate:'',
      days_value: '',
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
      report_data:[],
      probation:false,
    })
   
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
    if(value.length > 1)
    {
      this.setState({
        days_value:''
      })
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
      probation:false,
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
      probation:false,
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
      probation:false,
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
      probation:false,
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
      probation:false,
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
      probation:false,
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
      probation:false,
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
  handleChangeProbation(probation) {
    this.setState({
      centre_value: [],
      director_value:[],
      manager_value: [],
      region_value: [],
      area_value: [],
      subarea_value: [],
      teamleader_value: [],
      user:[],
      user_data:[],
      select_type:[],
      probation : !probation
    })
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
    const {probation} = this.state
    userService.userSearch((username).toUpperCase())
    .then((res) => {
     
      if (res.status) {
        if(res.data)
        {
          var filterstatus = (res.data).filter(item => item.is_active === 1 )
          if(probation  === true)
          {
            filterstatus = filterstatus.filter(item => item.probation !== true )
          }
          var regionlist = filterstatus.map(function (cusmaidid) {
            return { label: cusmaidid.username, value: cusmaidid.username };
          });
          this.setState({ user_data:regionlist });
        }
        
      }
     
    })
    .catch((error) => { });
  }
  handleChangeFromDate(date)
   {
     this.setState({
       fromdate:date,
       todate:'',
     })

   }
   handleChangeEndDate(date)
   {
     this.setState({
       todate:date
     })
   }
  closedate(is_close) {
    const {fromdate,todate} = this.state
    if (((fromdate && fromdate !== '' && fromdate !== null) && (todate && todate !== '' && todate !== null)) || is_close === false) {
      this.setState({ open_popup: '' })
    }
    else 
    {
      createNotification('Please choose Start date and End date', 'error', 'filled')
    }

  }
  onClickDay(value) {

    const {days_value} = this.state
  
    if(this.getDaySelectValue() === true)
    {
      this.setState({
        days_value: ''
      })

    }
    else
    {
      if(days_value  === value)
      {
        this.setState({
          days_value: ''
        })
      }
      else
      {
        this.setState({
          days_value: value
        })
      }
    }
    

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
  getType(select_type)
  {
    return select_type[select_type.length - 1]
  }
  callDashboard()
  {
    const {select_type ,user,days_value,fromdate,todate} = this.state
    const type = this.getType(select_type)
    this.setState({
      data:[],
      report_data:[],
      open_popup:'',
      tabvalue: 'Productivity',
      tabvalue1:'Productivity',
    })
    const {MENU} = this.props
    
    if(type === 'User')
    {
      
      if( user.length  === 1 && days_value !== '')
      {
        var list = []
        var days = this.getDatesarr(days_value,fromdate,todate)
        for(var i = 0;i < days.length ; i++)
        {
          const start = (i === 0) ?fromdate :days[i].startdate ,
          end = (i === days.length -1) ?todate :days[i].enddate
          list.push({
            startdate : start,
            enddate : end,
            user_array:[user[0]],
            name: days[i].name,
            menu :MENU,
          })
        }
        this.fetchDahboardReport(list)
      }
      var list1 = []
      for(var i = 0;i < user.length ; i++)
      {
        list1.push({
          startdate : fromdate,
          enddate : todate,
          user_array:[user[i]],
          name: user[i],
          menu :MENU,
        })
      }
      this.fetchDahboard(list1)
      
    }
    else
    {
      this.getUser(type)
    }
  }
  getUser(type)
  {

    const {centre_value,director_value,manager_value,teamleader_value,
    region_value,area_value,subarea_value,fromdate,todate,days_value} = this.state
    
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
              const {MENU} = this.props
              
              if(res.data.length  === 1 && days_value !== '')
              {
                var list = []
                var days = this.getDatesarr(days_value,fromdate,todate)
                for(var i = 0;i < days.length ; i++)
                {
                  const start = (i === 0) ?fromdate :days[i].startdate ,
                    end = (i === days.length -1) ?todate :days[i].enddate
                  list.push({
                    startdate : start,
                    enddate : end,
                    user_array:res.data[0].user_array,
                    name: days[i].name,
                    menu :MENU,
                  })
                }
                this.fetchDahboardReport(list)
              }
              var list1 = []
              for(var i = 0;i < res.data.length ; i++)
              {
                list1.push({
                  startdate : fromdate,
                  enddate : todate,
                  user_array:res.data[i].user_array,
                  name: res.data[i].name,
                  menu :MENU,
                })
              }
              
              this.fetchDahboard(list1)
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

  fetchDahboard(array)
  {
    const {fromdate,todate,days_value} = this.state
    const dayscount = this.dateDiff(fromdate,todate)
    if(dayscount  <= 31)
    {
    const {API_NAME} = this.props
    this.setState({ loading: true })
    
    dashboardService.fetchdashboard(API_NAME,array)
      .then((res) => {
        this.setState({ loading: false })
        if (res.status) 
        {
          if(res.data)
          {
            this.setState({
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
    else
    {
      if(days_value === '')
      {
        createNotification('Please select below 31 days','error','filled')
      }
      
    }
  }
  fetchDahboardReport(array)
  {
    const {days_value } = this.state
    var isfill = true
    if(days_value === 'Daily')
    {
      if(array.length > 31)
      {
        createNotification('Please select below 31 days','error','filled')
        isfill = false
      }
    }
    else if(days_value === 'Weekly')
    {
      if(array.length > 52)
      {
        createNotification('Please select below 52 weeks','error','filled')
        isfill = false
      }
    }
    else if(days_value === 'Monthly')
    {
      if(array.length > 12)
      {
        createNotification('Please select below 12 months','error','filled')
        isfill = false
      }
    }


    
    if(isfill === true)
    {
    const {API_NAME} = this.props
    this.setState({ loading: true })
    
    dashboardService.fetchdashboard(API_NAME,array)
      .then((res) => {
        this.setState({ loading: false })
        if (res.status) 
        {
          if(res.data)
          {
            this.setState({
              report_data:res.data
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
   
  }
  getbetweendays(d1, d2, interval) {

    let dates = [];

      let startDate = moment(d1).format('MM/DD/YYYY');
      let endDate = moment(d2).format('MM/DD/YYYY');
      while ( moment(startDate, "MM/DD/YYYY").valueOf() <= moment(endDate, "MM/DD/YYYY").valueOf()) {
        dates.push(moment(startDate, "MM/DD/YYYY").format("MM/DD/YYYY"));
        startDate = moment(startDate, "MM/DD/YYYY").add(interval, "days").format("MM/DD/YYYY");
      }
      console.log("jbkjvkjv dates " , JSON.stringify(dates))

      return dates

    
   }
   dateDiff(fromdate, todate) 
   {
    const d1 = moment(fromdate).format('MM/DD/YYYY'),
    d2 = moment(todate).format('MM/DD/YYYY')
    var a = moment(d1);
    var b = moment(d2);
    const diff = b.diff(a, 'days')
    return  diff
   }
   monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
   }

  getDatesarr(days_value,fromdate,todate)
  {
    var list = []
    console.log("jbkjvkjv fromdate " , JSON.stringify(fromdate))
    console.log("jbkjvkjv todate " , JSON.stringify(todate))
    console.log("jbkjvkjv days_value " , JSON.stringify(days_value))
    const d1 = moment(fromdate).format('MM/DD/YYYY'),
    d2 = moment(todate).format('MM/DD/YYYY')
    
    if(days_value === 'Daily')
    {
      const days = this.getbetweendays(fromdate,todate,1)
      for(var i = 0;i < days.length ; i++)
        {
          var start = days[i],
          end = days[i]
          list.push({
            startdate : start,
            enddate : end,
            name: days[i],
          })
        }
    }
    else if(days_value === 'Weekly')
    {
      const ends = moment(fromdate).weekday(6).format('MM/DD/YYYY')
      list.push({
        startdate : moment(convertUTCToLocalDate(fromdate)).format('MM/DD/YYYY'),
        enddate : ends,
        name: 'W1',
      })
      // console.log("jbkjvkjv ends " , JSON.stringify(ends))
      var next_start_day=  moment(fromdate).weekday(7).format('MM/DD/YYYY')
      // console.log("jbkjvkjv next_start_day " , JSON.stringify(next_start_day))
      if( moment(ends, "MM/DD/YYYY").valueOf() < moment(d2, "MM/DD/YYYY").valueOf())
      {
        var next_end_day = null
        const days = this.getbetweendays(next_start_day,todate,6)
        for(var i = 0;i < days.length -1 ; i++)
        {
            var start = i === 0 ? days[i] : moment(days[i], "MM/DD/YYYY").add((i), "days").format("MM/DD/YYYY"),
            end = i === 0 ? days[i+1] : moment(days[i+1], "MM/DD/YYYY").add((i), "days").format("MM/DD/YYYY")
            list.push({
              startdate : start,
              enddate : end,
              name: 'W' + (i + 2),
            })
            next_end_day = end
          }
          
          // console.log("jbkjvkjv next_end_day " , JSON.stringify(next_end_day))
          if((moment(next_end_day, "MM/DD/YYYY").valueOf() < moment(d2, "MM/DD/YYYY").valueOf()) || next_end_day === null)
          {
            const starts = moment(todate).weekday(0).format('MM/DD/YYYY')
            // console.log("jbkjvkjv starts " , JSON.stringify(starts))
            list.push({
              startdate :starts,
              enddate :  moment(todate).format('MM/DD/YYYY'),
              name: 'W' + (list.length + 1),
            })
          }
          
      }
     
      
    }
    else if(days_value === 'Monthly')
    {

      const months_diff = this.monthDiff(fromdate,todate)
      console.log("jbkjvkjv months_diff " , JSON.stringify(months_diff))
     
      
      const start_y = parseInt(moment(fromdate).format('YYYY')),
      end_y = parseInt(moment(todate).format('YYYY'))
      // console.log("jbkjvkjv start_y " , start_y)
      // console.log("jbkjvkjv end_y " , end_y)
      
      var month_value = 1
      for(var i = start_y ; i <= end_y ; i++)
      {
        for(var j = 1 ; j <= 12 ; j++)
        {
          const starts = moment(`${j}/01/${i}`).startOf('month').format('MM/DD/YYYY'),
          ends = moment(`${j}/01/${i}`).endOf('month').format('MM/DD/YYYY')
         
          // console.log("jbkjvkjv d1 " , d1 , ' --> ' , d2)
          // console.log("jbkjvkjv  " , starts , ' --> ' , ends)
          // console.log(`jbkjvkjv ${new Date(ends)} >= ${new Date(d1)}   ` , new Date(ends) >= new Date(d1))
         
          // console.log(`jbkjvkjv ${new Date(starts)} <= ${new Date(d2)}     ` ,new Date(starts) <= new Date(d2))

          if(new Date(ends) >= new Date(d1) &&  new Date(starts) <= new Date(d2))
          {
            list.push({
              startdate : starts,
              enddate : ends,
              name: 'M' + month_value,
            })
            month_value = month_value + 1
          }
        }
      }
    }

    var date_list = []
    for(var i = 0 ; i <list.length ; i++)
    {
      var start = (i === 0) ?d1 :list[i].startdate ,
      end = (i === list.length -1) ?d2 :list[i].enddate
        date_list.push({
          startdate : this.addTime(start , '00:00:00') ,
          enddate : this.addTime(end , '23:59:59') ,
          name: list[i].name,
        })

    }
   
    console.log("jbkjvkjv " , JSON.stringify(date_list))
    return date_list

  }
  addTime(date,time)
  {
    var datetime =moment(date + " " + time).format('MM/DD/YYYY HH:mm:ss') 
    console.log("jbkjvkjv datetime " , JSON.stringify(datetime))
    return convertLocalToUTCDate(new Date(datetime))

  }

  getDaySelectValue()
  {

    const {centre_value,director_value,manager_value,teamleader_value,
    region_value,area_value,subarea_value,user,select_type} = this.state
    
    var value = [],type = this.getType(select_type)
    if(type === 'Centre')
    {
      value = get_array_id(centre_value)
    }
    else if(type === 'Director')
    {
      value = get_array_id(director_value)
    }
    else if(type === 'Manager')
    {
      value = get_array_id(manager_value)
    }
    else if(type === 'Team Leader')
    {
      value = get_array_id(teamleader_value)
    }
    else if(type === 'Region')
    {
      value = get_array_id(region_value)
    }
    else if(type === 'Area')
    {
      value = get_array_id(area_value)
    }
    else if(type === 'Subarea')
    {
      value = get_array_id(subarea_value)
    }
    else if(type === 'User')
    {
      value = user
    }
    return value.length > 1 ? true : false
    
  }
 

  
 
  
  render() {
    const { locale, languageData } = this.props
    const { loading, open_popup, fromdate, todate, days_value, dayscount_arr,
      centre_arr, centre_value, director_user_arr, director_value, manager_user_arr, manager_value,
      region_data, region_value, area_data, area_value, subarea_data, subarea_value, team_leader_data, teamleader_value,
      user_data, user,data,report_data,tabvalue,tabvalue1,probation } = this.state
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
                    {((fromdate && fromdate !== '' && fromdate !== null) && (todate && todate !== '' && todate !== null) ? (
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
                        <Colxx xxs="12">
                          <Label className="fontstyle" style={{ color: 'red', cursor: 'pointer', padding: '5px' }} onClick={() => this.closedate(false)}>
                            <i className="simple-icon-close" style={{ position: 'absolute', right: '10px' }} /></Label>

                        </Colxx>

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
                          onClick={() => this.closedate(true)}
                         
                          >
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
              <div className="col-md-3 space-margin" style={{marginTop:'20px'}}>
              <Checkbox value = "checkbox" checked = {probation}
                                className = "fontstyle"
                                onChange={() => this.handleChangeProbation(probation)}>
                                {'Probation Users'}</Checkbox>
              </div>
              <div className="col-md-7 space-margin">
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
          <div  style={{ margin: '10px', padding: '10px' }}>
            <div className="row">
            {data && data.length > 0 &&
              <div className="col-md-12">
                {this.renderBarChart(data,tabvalue,'Over All')}
              </div>
              }
              {report_data && report_data.length > 0 &&

                <div className="col-md-12">
                {this.renderBarChart(report_data,tabvalue1,'Individual')}
                </div>
              }
             
            </div>
          </div>
         
        </div>
      </>
    )
  }
  setTabvlaue(tabname,title) {

    if(title === 'Over All')
    {
      this.setState({
        tabvalue: tabname
      })
    }
    else
    {
      this.setState({
        tabvalue1: tabname
      })
    }
   
  }

  getFileName(header_title,tabvalue)
  {
    var filename = 'Chart'
    if(header_title !== '')
    {
      filename = header_title
    }
    else
    {
      filename = tabvalue + ' Report'
    }

    return filename

  }

  renderBarChart(data,tabvalue,title) {
    const { locale, languageData } = this.props
    const { days_value ,select_type} = this.state
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
      name:title === 'Over All' ?'Percentage (%)' : 'Percentage (%)',
      data:value
    },
    ]
    var header_title = ''
    const val = tabvalue === 'Productivity' ? 'Productivity' : 'Accuracy'
    if(title === 'Individual')
    {
      if(days_value === 'Daily')
      {
        header_title = `${val} ` + 'Daily Metrics'
      }
      else if(days_value === 'Weekly')
      {
        header_title = `${val} ` + 'Weekly Metrics'
      }
      else if(days_value === 'Monthly')
      {
        header_title = `${val} ` +  'Monthly Metrics'
      }

    }

    return (
      <div className="publishuser-card-component" style = {{borderRadius:'10px'}}>
        {header_title !== '' &&
          <div className = "publish-title text-center" style = {{borderRadius:'10px 10px 0px 0px'}}>
              {header_title}
          </div>
        }
        <div>
          <div className = "publish-title1" style={{borderRadius:header_title === '' ? '10px 10px 0px 0px' : '',padding:'5px'}}>
          <div className="row">
            <div className="col-md-6 text-center" style={{ color: tabvalue === 'Productivity' ? 'white' : 'rgb(255 255 255 / 50%)', cursor: 'pointer', fontWeight: tabvalue === 'Productivity' ? '600' : '', fontSize: '15px' }}
              onClick={() => this.setTabvlaue('Productivity',title)}>
              <a className="fontstyle">{onChangeLanguage(locale, 'Productivity Report', languageData)}</a>
            </div>
            <div className="col-md-6 text-center" style={{ color: tabvalue === 'Accuracy' ? 'white' : 'rgb(255 255 255 / 50%)', cursor: 'pointer', fontWeight: tabvalue === 'Accuracy' ? '600' : '', fontSize: '15px' }}
              onClick={() => this.setTabvlaue('Accuracy',title)}>
              <a className="fontstyle">{onChangeLanguage(locale, 'Accuracy Report', languageData)}</a>
            </div>
            {/* <div className="col-md-3 text-center" style={{ color: tabvalue === 'Performance' ? 'white' : 'rgb(255 255 255 / 50%)', cursor: 'pointer', fontWeight: tabvalue === 'Performance' ? '600' : '', fontSize: '15px' }}
              onClick={() => this.setTabvlaue('Performance',title)}>
              <a className="fontstyle">{onChangeLanguage(locale, 'Performance Report', languageData)}</a>
            </div> */}


          </div>
          </div>
          <HighBarChart 
          series={series} 
          categories={categories} 
          title = {this.getType(select_type)}
          file_name = {this.getFileName(header_title,tabvalue)}
          
          />
        </div>
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

