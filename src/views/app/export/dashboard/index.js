import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label, Input, Button, Popover, PopoverBody } from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import { onChangeLanguage, getoptionvalue, convertLocalToUTCDate, Date_Different, GetDateFromDaysCount } from '../../../../helper'
import { teamsService } from '../../../../redux/teams/saga'
import { userService } from '../../../../redux/users/saga'
import { reportService } from '../../../../redux/Export/report/saga'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import moment from 'moment';
import Select from 'react-select';
import DatePicker from "../../datePicker";
import HighBarChart from '../../barHicharts'

class QueryResolveSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      fromdate: '',
      todate: '',
      open_popup: '',
      day_count: 0,
      tabvalue: 'Productivity',
      days_value: 'Weekly',
      dayscount_arr: ["Daily", "Weekly", "Monthly", "This Week", "This Month", "This Year"],
      center_arr: [
        { label: 'Chennai', value: 'Chennai' },
        { label: 'Mumbai', value: 'Mumbai' },
      ],
      center: '',
      director_user_arr: [
        { label: 'Test 1', value: 'Test 1' },
        { label: 'Test 2', value: 'Test 2' },
      ],
      director: '',
      manager_user_arr: [
        { label: 'Select All', value: 'Select All' },
        { label: 'Test 1', value: 'Test 1' },
        { label: 'Test 2', value: 'Test 2' },
      ],
      manager_user: [],
      region_data: [],
      region: [],
      area_data: [],
      area: [],
      subarea_data: [],
      subarea: [],
      team_leader_data: [],
      team_leader: [],
      user_data: [],
      user: [],
    };
  }
  componentDidMount() {
    this.getActivateuser()

  }
  getActivateuser() {
    var date = new Date();
    date.setDate(date.getDate() - 6);
    var currentdate = moment(new Date()).format('YYYY-MM-DD')
    const lastdate = ("0" + date.getDate()).slice(-2),
      month = ("0" + (date.getMonth() + 1)).slice(-2)
    var finalDate = date.getFullYear() + '-' + month + '-' + lastdate;

    // console.log("lgkjgjgkj  finalDate = " , JSON.stringify(finalDate) , 'currentdate ==>' , currentdate)
    const { days_value } = this.state
    this.setDateAPI(finalDate, currentdate, days_value)

  }
  setDateAPI(fromdate, todate, days_value) {

    const day_count = Date_Different(fromdate, todate)
    this.setState({
      fromdate: fromdate,
      todate: todate,
      day_count: day_count,
      open_popup: '',
      // loading:true,
    })
  }

  getData() {
    this.clearData('', false)
  }
  reset() {
    this.clearData('', true)
  }
  clearData(type, isreset) {
    if (this.state.fromdate !== '' && this.state.todate !== '') {
      const { fromdate, todate } = this.state
      var fromdates = fromdate, todates = todate

      if (type === 'Days' || isreset === true) {
        var date = new Date();
        date.setDate(date.getDate() - 6);
        var currentdate = moment(new Date()).format('YYYY-MM-DD')
        const lastdate = ("0" + date.getDate()).slice(-2),
          month = ("0" + (date.getMonth() + 1)).slice(-2)
        var finalDate = date.getFullYear() + '-' + month + '-' + lastdate;
        fromdates = finalDate
        todates = currentdate
        this.setState({
          days_value: 'Weekly',
        })
      }
      if (type === 'Center' || isreset === true) {
        this.setState({
          center: '',
        })
      }
      if (type === 'Director' || isreset === true) {
        this.setState({
          director: '',
        })
      }
      if (type === 'Manager' || isreset === true) {
        this.setState({
          manager_user: [],
        })
      }
      if (type === 'Region' || isreset === true) {
        this.setState({
          region: [],
        })
      }
      if (type === 'Area' || isreset === true) {
        this.setState({
          area: [],
        })
      }
      if (type === 'SubArea' || isreset === true) {
        this.setState({
          subarea: [],
        })
      }
      if (type === 'TeamLeader' || isreset === true) {
        this.setState({
          team_leader: [],
        })
      }
      if (type === 'User' || isreset === true) {
        this.setState({
          user: [],
        })
      }



      this.setDateAPI(fromdates, todates, 'Weekly')
    }
    else {
      createNotification('Please choose date', 'error', 'filled')
    }
  }
  handleChangeManager = (option) => {
    const { manager_user_arr, manager_user } = this.state

    var value = getoptionvalue(option, manager_user_arr, manager_user)
    this.setState({
      manager_user: value
    })
  }
  handleChangeRegion = (option) => {
    const { region_data, region } = this.state

    var value = getoptionvalue(option, region_data, region)
    this.setState({
      region: value
    })
  }
  handleChangeArea = (option) => {
    const { area_data, area } = this.state

    var value = getoptionvalue(option, area_data, area)
    this.setState({
      area: value
    })
  }
  handleChangeSubArea = (option) => {
    const { subarea_data, subarea } = this.state

    var value = getoptionvalue(option, subarea_data, subarea)
    this.setState({
      subarea: value
    })
  }
  handleChangeTeamLeader = (option) => {
    const { team_leader_data, team_leader } = this.state

    var value = getoptionvalue(option, team_leader_data, team_leader)
    this.setState({
      team_leader: value
    })
  }
  handleChangeUser = (option) => {
    const { user_data, user } = this.state

    var value = getoptionvalue(option, user_data, user)
    this.setState({
      user: value
    })
  }
  closedate() {
    if (this.state.fromdate !== '' && this.state.todate !== '') {
      this.setState({ open_popup: '' })
    }
    else {
      createNotification('Please choose date', 'error', 'filled')
    }

  }
  onClickDay(value) {

    this.setState({
      days_value: value
    })
    if (value === "Weekly") {
      this.getdaywiseChart(6, false, value)
    }
    else if (value === "Monthly") {
      this.getdaywiseChart(29, value)
    }
    else if (value === "Daily") {
      this.getdaywiseChart(0, value)
    }
    else if (value === "This Week") {
      this.getdaywiseChart(6, value)
    }
    else if (value === "This Month") {
      this.getdaywiseChart(29, value)
    }
    else if (value === "This Year") {
      this.getdaywiseChart(364, value)
    }

  }
  getdaywiseChart(day, days_value) {
    var date = new Date();
    date.setDate(date.getDate() - day);
    var currentdate = moment(new Date()).format('YYYY-MM-DD')
    const lastdate = ("0" + date.getDate()).slice(-2),
      month = ("0" + (date.getMonth() + 1)).slice(-2)
    var finalDate = date.getFullYear() + '-' + month + '-' + lastdate;
    if (days_value === "This Week") {
      var startOfWeek = moment().startOf('week').toDate();
      finalDate = moment(startOfWeek).format('YYYY-MM-DD')
    }
    else if (days_value === "This Month") {
      var startOfWeek = moment().startOf('month').toDate();
      finalDate = moment(startOfWeek).format('YYYY-MM-DD')
    }
    else if (days_value === "This Year") {
      var startOfWeek = moment().startOf('year').toDate();
      finalDate = moment(startOfWeek).format('YYYY-MM-DD')
    }
    //  console.log("lgkjgjgkj  finalDate = " , JSON.stringify(finalDate) , 'currentdate ==>' , currentdate)
    this.setState({
      fromdate: finalDate,
      todate: currentdate
    })

  }


  render() {
    const { match, locale, languageData } = this.props
    const { loading, open_popup, fromdate, todate, day_count, days_value, dayscount_arr,
      center_arr, center, director_user_arr, director, manager_user_arr, manager_user,
      region_data, region, area_data, area, subarea_data, subarea, team_leader_data, team_leader,
      user_data, user } = this.state
    const currentdate = moment(new Date()).format('YYYY-MM-DD')
    return (
      <>
        <title>{onChangeLanguage(locale, 'Dashboard', languageData)}</title>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading={onChangeLanguage(locale, 'Dashboard', languageData)} match={match} />
            <Separator className="separator-margin" />
          </Colxx>
        </Row>
        {loading &&
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
        <div>
          <div>
            <div className="row">
              <div className="col-md-2">
                <span>
                  <Button color="secondary" outline
                    className="mr-1 mb-2 button-width"
                    id="Days"
                    style={{ width: '100%' }}
                    onClick={() => this.setState({ open_popup: 'Days' })}
                  >
                    {days_value !== '' ? days_value :
                      (fromdate !== '' && todate !== '' ? (
                        moment(new Date(fromdate)).format('DD MMM YYYY') + ' - ' + moment(new Date(todate)).format('DD MMM YYYY')) :
                        day_count + ' Days')}
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
                          <Label className="fontstyle" style={{ color: 'red', cursor: 'pointer', padding: '5px' }} onClick={() => this.closedate()}>
                            <i className="simple-icon-close" style={{ position: 'absolute', right: '10px' }} /></Label>

                        </Colxx>

                        <Colxx xxs="12">
                          <div style={{ padding: '10px' }}>
                            <Label className="fontstyle"> {onChangeLanguage(locale, 'Start Date', languageData)}</Label>
                            <Input className="fontstyle" type="date" data-date-format='yy-mm-dd' value={fromdate}
                              max={currentdate}
                              placeholder={onChangeLanguage(locale, 'Start Date', languageData)}
                              onChange={(e) => this.handleChangeFromDate(e.target.value)} />
                          </div>
                        </Colxx>
                        <Colxx xxs="12">
                          <div style={{ padding: '10px' }}>
                            <Label className="fontstyle"> {onChangeLanguage(locale, 'End Date', languageData)}</Label>
                            <Input className="fontstyle" type="date" data-date-format='yy-mm-dd' value={todate}
                              placeholder={onChangeLanguage(locale, 'End Date', languageData)}
                              min={fromdate}
                              max={currentdate}
                              onChange={(e) => this.handleChangeEndDate(e.target.value)} />
                          </div>
                        </Colxx>
                        <Colxx xxs="12">
                          <div className="row">
                            {dayscount_arr && dayscount_arr.map((value, index) =>
                              <div className="col-md-4 text-center">
                                <Label className="fontstyle" onClick={() => this.onClickDay(value)}
                                  style={{
                                    backgroundColor: value === days_value ? '#00677f' : 'rgb(116, 210, 231,0.3)', width: '60px',
                                    borderRadius: '15px', color: value === days_value ? 'white' : 'black', fontSize: '7px', padding: '7px', cursor: 'pointer', margin: '2px 0px'
                                  }}>
                                  {onChangeLanguage(locale, value, languageData)}</Label>
                              </div>

                            )}
                          </div>
                        </Colxx>
                        <Colxx xxs="12" className="text-center">
                          <Button color="primary"
                            className="mr-1 mb-2 button-width"
                            id={`popover_0`}
                            onClick={() => this.getData()} >{onChangeLanguage(locale, 'Update', languageData)}</Button>
                          <Button color="secondary"
                            className="mr-1 mb-2 button-width"
                            onClick={() => this.clearData('Days', false)}>{onChangeLanguage(locale, 'Clear', languageData)}</Button>

                        </Colxx>
                      </Row>
                    </PopoverBody>
                  </Popover>
                </span>


              </div>
              <div className="col-md-3">
                <span>
                  <Button color="secondary" outline
                    className="mr-1 mb-2 button-width"
                    id='Center'
                    style={{ width: '100%' }}
                    onClick={() => this.setState({ open_popup: 'Center' })}
                  >
                    {onChangeLanguage(locale, 'Center Level Bifurcation', languageData)}
                    < i style={{ position: 'absolute', right: '18px' }} className={open_popup === 'Center' ? "simple-icon-arrow-up" : "simple-icon-arrow-down"} />
                  </Button>
                  <Popover
                    placement='bottom'
                    isOpen={open_popup === 'Center'}
                    target='Center'
                    toggle={() => this.setState({ open_popup: '' })}
                  >
                    <PopoverBody>
                      <Row>
                        <Colxx xxs="12">
                          <Label className="fontstyle" style={{ color: 'red', cursor: 'pointer', padding: '5px' }}
                            onClick={() => this.closedate()}>
                            <i className="simple-icon-close" style={{ position: 'absolute', right: '10px' }} /></Label>

                        </Colxx>

                        <Colxx xxs="12">
                          <div style={{ padding: '10px' }}>
                            <Label className="fontstyle"> {onChangeLanguage(locale, 'Center Level Bifurcation', languageData)}</Label>
                            <Select className="react-select fontstyle"
                              classNamePrefix="react-select"
                              name="form-field-name"
                              value={center_arr.filter(option => option.value === center)}
                              options={center_arr}
                              onChange={(option) => this.setState({ center: option.value })}
                            />
                          </div>
                        </Colxx>
                        <Colxx xxs="12" className="text-center">
                          <Button color="primary"
                            className="mr-1 mb-2 button-width"
                            id={`popover_0`}
                            onClick={() => this.getData()} >{onChangeLanguage(locale, 'Update', languageData)}</Button>
                          <Button color="secondary"
                            className="mr-1 mb-2 button-width"
                            onClick={() => this.clearData('Center', false)}>{onChangeLanguage(locale, 'Clear', languageData)}</Button>

                        </Colxx>
                      </Row>
                    </PopoverBody>
                  </Popover>
                </span>


              </div>
              <div className="col-md-2">
                <span>
                  <Button color="secondary" outline
                    className="mr-1 mb-2 button-width"
                    id='Director'
                    style={{ width: '100%' }}
                    onClick={() => this.setState({ open_popup: 'Director' })}
                  >
                    {onChangeLanguage(locale, 'Director', languageData)}
                    < i style={{ position: 'absolute', right: '18px' }} className={open_popup === 'Director' ? "simple-icon-arrow-up" : "simple-icon-arrow-down"} />
                  </Button>
                  <Popover
                    placement='bottom'
                    isOpen={open_popup === 'Director'}
                    target='Director'
                    toggle={() => this.setState({ open_popup: '' })}
                  >
                    <PopoverBody>
                      <Row>
                        <Colxx xxs="12">
                          <Label className="fontstyle" style={{ color: 'red', cursor: 'pointer', padding: '5px' }}
                            onClick={() => this.closedate()}>
                            <i className="simple-icon-close" style={{ position: 'absolute', right: '10px' }} /></Label>

                        </Colxx>

                        <Colxx xxs="12">
                          <div style={{ padding: '10px' }}>
                            <Label className="fontstyle"> {onChangeLanguage(locale, 'Director', languageData)}</Label>
                            <Select className="react-select fontstyle"
                              classNamePrefix="react-select"
                              name="form-field-name"
                              value={director_user_arr.filter(option => option.value === director)}
                              options={director_user_arr}
                              onChange={(option) => this.setState({ director: option.value })}
                            />
                          </div>
                        </Colxx>
                        <Colxx xxs="12" className="text-center">
                          <Button color="primary"
                            className="mr-1 mb-2 button-width"
                            id={`popover_0`}
                            onClick={() => this.getData()} >{onChangeLanguage(locale, 'Update', languageData)}</Button>
                          <Button color="secondary"
                            className="mr-1 mb-2 button-width"
                            onClick={() => this.clearData('Director', false)}>{onChangeLanguage(locale, 'Clear', languageData)}</Button>

                        </Colxx>
                      </Row>
                    </PopoverBody>
                  </Popover>
                </span>


              </div>
              <div className="col-md-2">
                <span>
                  <Button color="secondary" outline
                    className="mr-1 mb-2 button-width"
                    id='Manager'
                    style={{ width: '100%' }}
                    onClick={() => this.setState({ open_popup: 'Manager' })}
                  >
                    {onChangeLanguage(locale, 'Manager', languageData)}
                    < i style={{ position: 'absolute', right: '18px' }} className={open_popup === 'Manager' ? "simple-icon-arrow-up" : "simple-icon-arrow-down"} />
                  </Button>
                  <Popover
                    placement='bottom'
                    isOpen={open_popup === 'Manager'}
                    target='Manager'
                    toggle={() => this.setState({ open_popup: '' })}
                  >
                    <PopoverBody>
                      <Row>
                        <Colxx xxs="12">
                          <Label className="fontstyle" style={{ color: 'red', cursor: 'pointer', padding: '5px' }}
                            onClick={() => this.closedate()}>
                            <i className="simple-icon-close" style={{ position: 'absolute', right: '10px' }} /></Label>

                        </Colxx>

                        <Colxx xxs="12">
                          <div style={{ padding: '10px' }}>
                            <Label className="fontstyle"> {onChangeLanguage(locale, 'Manager', languageData)}</Label>
                            <ReactMultiSelectCheckboxes className='fontstyle'
                              value={manager_user}
                              onChange={this.handleChangeManager}
                              options={manager_user_arr}
                              getDropdownButtonLabel={({ placeholderButtonLabel, value }) => { if (value.length == 0) { return "Select.."; } else { var item = value.filter(item => item.label.includes('Select All')); if (item.length != 0) { return (value.length - 1) + " selected"; } else { return value.length + " selected"; } } }}
                            />
                          </div>
                        </Colxx>
                        <Colxx xxs="12" className="text-center">
                          <Button color="primary"
                            className="mr-1 mb-2 button-width"
                            id={`popover_0`}
                            onClick={() => this.getData()} >{onChangeLanguage(locale, 'Update', languageData)}</Button>
                          <Button color="secondary"
                            className="mr-1 mb-2 button-width"
                            onClick={() => this.clearData('Manager', false)}>{onChangeLanguage(locale, 'Clear', languageData)}</Button>

                        </Colxx>
                      </Row>
                    </PopoverBody>
                  </Popover>
                </span>


              </div>
              <div className="col-md-2">
                <span>
                  <Button color="secondary" outline
                    className="mr-1 mb-2 button-width"
                    id='Region'
                    style={{ width: '100%' }}
                    onClick={() => this.setState({ open_popup: 'Region' })}
                  >
                    {onChangeLanguage(locale, 'Region', languageData)}
                    < i style={{ position: 'absolute', right: '18px' }} className={open_popup === 'Region' ? "simple-icon-arrow-up" : "simple-icon-arrow-down"} />
                  </Button>
                  <Popover
                    placement='bottom'
                    isOpen={open_popup === 'Region'}
                    target='Region'
                    toggle={() => this.setState({ open_popup: '' })}
                  >
                    <PopoverBody>
                      <Row>
                        <Colxx xxs="12">
                          <Label className="fontstyle" style={{ color: 'red', cursor: 'pointer', padding: '5px' }}
                            onClick={() => this.closedate()}>
                            <i className="simple-icon-close" style={{ position: 'absolute', right: '10px' }} /></Label>

                        </Colxx>

                        <Colxx xxs="12">
                          <div style={{ padding: '10px' }}>
                            <Label className="fontstyle"> {onChangeLanguage(locale, 'Region', languageData)}</Label>
                            <ReactMultiSelectCheckboxes className='fontstyle'
                              value={region}
                              onChange={this.handleChangeRegion}
                              options={region_data}
                              getDropdownButtonLabel={({ placeholderButtonLabel, value }) => { if (value.length == 0) { return "Select.."; } else { var item = value.filter(item => item.label.includes('Select All')); if (item.length != 0) { return (value.length - 1) + " selected"; } else { return value.length + " selected"; } } }}
                            />
                          </div>
                        </Colxx>
                        <Colxx xxs="12" className="text-center">
                          <Button color="primary"
                            className="mr-1 mb-2 button-width"
                            id={`popover_0`}
                            onClick={() => this.getData()} >{onChangeLanguage(locale, 'Update', languageData)}</Button>
                          <Button color="secondary"
                            className="mr-1 mb-2 button-width"
                            onClick={() => this.clearData('Region', false)}>{onChangeLanguage(locale, 'Clear', languageData)}</Button>

                        </Colxx>
                      </Row>
                    </PopoverBody>
                  </Popover>
                </span>


              </div>
              <div className="col-md-2">
                <span>
                  <Button color="secondary" outline
                    className="mr-1 mb-2 button-width"
                    id='Area'
                    style={{ width: '100%' }}
                    onClick={() => this.setState({ open_popup: 'Area' })}
                  >
                    {onChangeLanguage(locale, 'Area', languageData)}
                    < i style={{ position: 'absolute', right: '18px' }} className={open_popup === 'Area' ? "simple-icon-arrow-up" : "simple-icon-arrow-down"} />
                  </Button>
                  <Popover
                    placement='bottom'
                    isOpen={open_popup === 'Area'}
                    target='Area'
                    toggle={() => this.setState({ open_popup: '' })}
                  >
                    <PopoverBody>
                      <Row>
                        <Colxx xxs="12">
                          <Label className="fontstyle" style={{ color: 'red', cursor: 'pointer', padding: '5px' }}
                            onClick={() => this.closedate()}>
                            <i className="simple-icon-close" style={{ position: 'absolute', right: '10px' }} /></Label>

                        </Colxx>

                        <Colxx xxs="12">
                          <div style={{ padding: '10px' }}>
                            <Label className="fontstyle"> {onChangeLanguage(locale, 'Area', languageData)}</Label>
                            <ReactMultiSelectCheckboxes className='fontstyle'
                              value={area}
                              onChange={this.handleChangeArea}
                              options={area_data}
                              getDropdownButtonLabel={({ placeholderButtonLabel, value }) => { if (value.length == 0) { return "Select.."; } else { var item = value.filter(item => item.label.includes('Select All')); if (item.length != 0) { return (value.length - 1) + " selected"; } else { return value.length + " selected"; } } }}
                            />
                          </div>
                        </Colxx>
                        <Colxx xxs="12" className="text-center">
                          <Button color="primary"
                            className="mr-1 mb-2 button-width"
                            id={`popover_0`}
                            onClick={() => this.getData()} >{onChangeLanguage(locale, 'Update', languageData)}</Button>
                          <Button color="secondary"
                            className="mr-1 mb-2 button-width"
                            onClick={() => this.clearData('Area', false)}>{onChangeLanguage(locale, 'Clear', languageData)}</Button>

                        </Colxx>
                      </Row>
                    </PopoverBody>
                  </Popover>
                </span>


              </div>
              <div className="col-md-3">
                <span>
                  <Button color="secondary" outline
                    className="mr-1 mb-2 button-width"
                    id='SubArea'
                    style={{ width: '100%' }}
                    onClick={() => this.setState({ open_popup: 'SubArea' })}
                  >
                    {onChangeLanguage(locale, 'Sub Area', languageData)}
                    < i style={{ position: 'absolute', right: '18px' }} className={open_popup === 'SubArea' ? "simple-icon-arrow-up" : "simple-icon-arrow-down"} />
                  </Button>
                  <Popover
                    placement='bottom'
                    isOpen={open_popup === 'SubArea'}
                    target='SubArea'
                    toggle={() => this.setState({ open_popup: '' })}
                  >
                    <PopoverBody>
                      <Row>
                        <Colxx xxs="12">
                          <Label className="fontstyle" style={{ color: 'red', cursor: 'pointer', padding: '5px' }}
                            onClick={() => this.closedate()}>
                            <i className="simple-icon-close" style={{ position: 'absolute', right: '10px' }} /></Label>

                        </Colxx>

                        <Colxx xxs="12">
                          <div style={{ padding: '10px' }}>
                            <Label className="fontstyle"> {onChangeLanguage(locale, 'Sub Area', languageData)}</Label>
                            <ReactMultiSelectCheckboxes className='fontstyle'
                              value={subarea}
                              onChange={this.handleChangeSubArea}
                              options={subarea_data}
                              getDropdownButtonLabel={({ placeholderButtonLabel, value }) => { if (value.length == 0) { return "Select.."; } else { var item = value.filter(item => item.label.includes('Select All')); if (item.length != 0) { return (value.length - 1) + " selected"; } else { return value.length + " selected"; } } }}
                            />
                          </div>
                        </Colxx>
                        <Colxx xxs="12" className="text-center">
                          <Button color="primary"
                            className="mr-1 mb-2 button-width"
                            id={`popover_0`}
                            onClick={() => this.getData()} >{onChangeLanguage(locale, 'Update', languageData)}</Button>
                          <Button color="secondary"
                            className="mr-1 mb-2 button-width"
                            onClick={() => this.clearData('SubArea', false)}>{onChangeLanguage(locale, 'Clear', languageData)}</Button>

                        </Colxx>
                      </Row>
                    </PopoverBody>
                  </Popover>
                </span>


              </div>
              <div className="col-md-2">
                <span>
                  <Button color="secondary" outline
                    className="mr-1 mb-2 button-width"
                    id='TeamLeader'
                    style={{ width: '100%' }}
                    onClick={() => this.setState({ open_popup: 'TeamLeader' })}
                  >
                    {onChangeLanguage(locale, 'Team Leader', languageData)}
                    < i style={{ position: 'absolute', right: '18px' }} className={open_popup === 'TeamLeader' ? "simple-icon-arrow-up" : "simple-icon-arrow-down"} />
                  </Button>
                  <Popover
                    placement='bottom'
                    isOpen={open_popup === 'TeamLeader'}
                    target='TeamLeader'
                    toggle={() => this.setState({ open_popup: '' })}
                  >
                    <PopoverBody>
                      <Row>
                        <Colxx xxs="12">
                          <Label className="fontstyle" style={{ color: 'red', cursor: 'pointer', padding: '5px' }}
                            onClick={() => this.closedate()}>
                            <i className="simple-icon-close" style={{ position: 'absolute', right: '10px' }} /></Label>

                        </Colxx>

                        <Colxx xxs="12">
                          <div style={{ padding: '10px' }}>
                            <Label className="fontstyle"> {onChangeLanguage(locale, 'Team Leader', languageData)}</Label>
                            <ReactMultiSelectCheckboxes className='fontstyle'
                              value={team_leader}
                              onChange={this.handleChangeTeamLeader}
                              options={team_leader_data}
                              getDropdownButtonLabel={({ placeholderButtonLabel, value }) => { if (value.length == 0) { return "Select.."; } else { var item = value.filter(item => item.label.includes('Select All')); if (item.length != 0) { return (value.length - 1) + " selected"; } else { return value.length + " selected"; } } }}
                            />
                          </div>
                        </Colxx>
                        <Colxx xxs="12" className="text-center">
                          <Button color="primary"
                            className="mr-1 mb-2 button-width"
                            id={`popover_0`}
                            onClick={() => this.getData()} >{onChangeLanguage(locale, 'Update', languageData)}</Button>
                          <Button color="secondary"
                            className="mr-1 mb-2 button-width"
                            onClick={() => this.clearData('TeamLeader', false)}>{onChangeLanguage(locale, 'Clear', languageData)}</Button>

                        </Colxx>
                      </Row>
                    </PopoverBody>
                  </Popover>
                </span>


              </div>
              <div className="col-md-2">
                <span>
                  <Button color="secondary" outline
                    className="mr-1 mb-2 button-width"
                    id='User'
                    style={{ width: '100%' }}
                    onClick={() => this.setState({ open_popup: 'User' })}
                  >
                    {onChangeLanguage(locale, 'User', languageData)}
                    < i style={{ position: 'absolute', right: '18px' }} className={open_popup === 'User' ? "simple-icon-arrow-up" : "simple-icon-arrow-down"} />
                  </Button>
                  <Popover
                    placement='bottom'
                    isOpen={open_popup === 'User'}
                    target='User'
                    toggle={() => this.setState({ open_popup: '' })}
                  >
                    <PopoverBody>
                      <Row>
                        <Colxx xxs="12">
                          <Label className="fontstyle" style={{ color: 'red', cursor: 'pointer', padding: '5px' }}
                            onClick={() => this.closedate()}>
                            <i className="simple-icon-close" style={{ position: 'absolute', right: '10px' }} /></Label>

                        </Colxx>

                        <Colxx xxs="12">
                          <div style={{ padding: '10px' }}>
                            <Label className="fontstyle"> {onChangeLanguage(locale, 'User', languageData)}</Label>
                            <ReactMultiSelectCheckboxes className='fontstyle'
                              value={user}
                              onChange={this.handleChangeUser}
                              options={user_data}
                              getDropdownButtonLabel={({ placeholderButtonLabel, value }) => { if (value.length == 0) { return "Select.."; } else { var item = value.filter(item => item.label.includes('Select All')); if (item.length != 0) { return (value.length - 1) + " selected"; } else { return value.length + " selected"; } } }}
                            />
                          </div>
                        </Colxx>
                        <Colxx xxs="12" className="text-center">
                          <Button color="primary"
                            className="mr-1 mb-2 button-width"
                            id={`popover_0`}
                            onClick={() => this.getData()} >{onChangeLanguage(locale, 'Update', languageData)}</Button>
                          <Button color="secondary"
                            className="mr-1 mb-2 button-width"
                            onClick={() => this.clearData('User', false)}>{onChangeLanguage(locale, 'Clear', languageData)}</Button>

                        </Colxx>
                      </Row>
                    </PopoverBody>
                  </Popover>
                </span>


              </div>

              <div className="col-md-2">
                <Button className="button-width" color="primary" outline
                  style={{ width: '100%' }}
                  onClick={() => this.reset()}>
                  {onChangeLanguage(locale, 'Reset', languageData)}
                </Button>
              </div>
            </div>

          </div>

          <div>
            <div className="row">
              <div className="col-md-12">
                {this.renderBarChart()}
              </div>
            </div>
          </div>
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
    const { tabvalue } = this.state
    const series = [{
      name: 'Unit',
      data: [23, 55, 12, 4, 7, 23, 55, 12, 4, 7, 55, 12, 55, 12]
    },
    ], categories = ['TEST1', 'TEST2', 'TEST3', 'TEST4', 'TEST5', 'TEST6', 'TEST7', 'TEST8', 'TEST9', 'TEST10', 'TEST11', 'TEST12', 'TEST13', 'TEST14']
    return (
      <div className="publishuser-card-component" style={{ margin: '10px', padding: '10px' }}>
        <div className="row" style={{ margin: '10px' }}>
          <div className="col-md-4 text-center" style={{ color: tabvalue === 'Productivity' ? 'black' : 'gray', cursor: 'pointer', fontWeight: tabvalue === 'Productivity' ? '600' : '', fontSize: '15px' }}
            onClick={() => this.setTabvlaue('Productivity')}>
            <a className="fontstyle">{onChangeLanguage(locale, 'Productivity Report', languageData)}</a>
          </div>
          <div className="col-md-4 text-center" style={{ color: tabvalue === 'Accuracy' ? 'black' : 'gray', cursor: 'pointer', fontWeight: tabvalue === 'Accuracy' ? '600' : '', fontSize: '15px' }}
            onClick={() => this.setTabvlaue('Accuracy')}>
            <a className="fontstyle">{onChangeLanguage(locale, 'Accuracy Report', languageData)}</a>
          </div>
          <div className="col-md-4 text-center" style={{ color: tabvalue === 'Performance' ? 'black' : 'gray', cursor: 'pointer', fontWeight: tabvalue === 'Performance' ? '600' : '', fontSize: '15px' }}
            onClick={() => this.setTabvlaue('Performance')}>
            <a className="fontstyle">{onChangeLanguage(locale, 'Performance Report', languageData)}</a>
          </div>


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

  })(QueryResolveSheet)
);

