import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../../containers/navs/Breadcrumb';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label, Input, Button } from 'reactstrap';
import { createNotification } from '../../../../../toast';
import Select from 'react-select';
import Loading from "react-fullscreen-loading";
import { userService } from '../../../../../redux/users/saga'
import { getValue, onChangeLanguage } from '../../../../../helper'
import { roleService } from '../../../../../redux/role/saga'
import { regionService } from '../../../../../redux/region/saga'
import { teamsService } from '../../../../../redux/teams/saga'
import { areaService } from '../../../../../redux/area/saga';
import { ProcessService } from '../../../../../redux/process/saga'
import { LocationService } from '../../../../../redux/location/saga'
import { levelService } from '../../../../../redux/level/saga'
import { TLService } from '../../../../../redux/tl/saga'
import { departmentService } from '../../../../../redux/department/saga'
import { designationService } from '../../../../../redux/designation/saga'
import { ManagerService } from '../../../../../redux/manager/saga'
import { MDService } from '../../../../../redux/md/saga'
import { directorService } from '../../../../../redux/director/saga'
import moment from 'moment';
import CustomRadioButton from '../../../../RadioButton'
import Eyeopen from '../../../../../assets/img/app_image/eyeopen.png'
import Eyeclose from '../../../../../assets/img/app_image/eyeclose.png'


class RegisterUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: '',
      lastname: '',
      email: '',
      username: '',
      mobile_phone: '',
      role_id: '',
      islogin: true,
      region: '',
      area: '',
      subarea: '',
      department: '',
      designation: '',
      location: '',
      code: '',
      level: '',
      doj: '',
      process: '',
      teamleader: '',
      manager: '',
      director: '',
      md: '',
      highcost_employee:'',
      probation:false,
      is_active: 1,
      regiondata: [],
      areadata: [],
      role_data: [],
      team_data: [],
      designation_data: [],
      level_data: [],
      location_data: [],
      process_data: [],
      department_data: [],
      tl_data: [],
      manager_data: [],
      director_data: [],
      MD_data: [],
      loading: false,
      password: '',
      isreset: false,
      showpassword: false,
      is_submit:false,
    };
  }

  componentDidMount() {
    const { isEdit, record } = this.props
    if (isEdit === true) {
      this.setState({
        id: record.id,
        name: record.name,
        username: record.username,
        lastname: record.lastname,
        email: record.email,
        mobile_phone: record.mobile_phone !== null ? record.mobile_phone : '',
        department_id: record.department_id,
        designation_id: record.designation_id,
        role_id: record.role_id,
        region: record.region,
        area: record.area,
        subarea: record.subarea,
        is_active: record.is_active,
        department: record.department !== null ? record.department : '',
        designation: record.designation !== null ? record.designation : '',
        location: record.location !== null ? record.location : '',
        code: record.code !== null ? record.code : '',
        level: record.level !== null ? record.level : '',
        doj: record.doj !== null ? moment(record.doj).format('YYYY-MM-DD') : '',
        process: record.process !== null ? record.process : '',
        teamleader: record.teamleader !== null ? record.teamleader : '',
        manager: record.manager !== null ? record.manager : '',
        director: record.director !== null ? record.director : '',
        md: record.md !== null ? record.md : '',
        highcost_employee:record.highcost_employee !== null ? record.highcost_employee : '',
        probation: (record.probation && record.probation !== null) ? record.probation : false,
        isEdit: true
      })

    }
    this.fetchrole()
    this.fetchteam()
    this.fetchregion()
    this.fetcharea()
    this.fetch_process()
    this.fetch_designation()
    this.fetch_department()
    this.fetch_location()
    this.fetch_level()
    this.fetch_tl()
    this.fetch_manager()
    this.fetch_director()
    this.fetch_MD()
  }
  fetchrole() {
    this.setState({ loading: true });
    roleService.fetchroleData()
      .then((res) => {
        this.setState({ loading: false });
        if (res.status) {
          let RoleId = localStorage.getItem("role_id");
          let filterstatus = res.data.filter(item => {
            if (item.status !== 1) return false;
            if (item.name === "Admin" && RoleId !== "1") return false;
            return true;
          });
  
          var rolelist = filterstatus.map(function (cusmaidid) {
            return { label: cusmaidid.name, value: cusmaidid.id };
          });
  
          this.setState({
            role_data: rolelist,
          });
        } else {
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
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
            regiondata: regionlist,
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
            areadata: regionlist,
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
            team_data: regionlist,
          })
        }
      })
      .catch((error) => { this.setState({ loading: false }) });
  }
  fetch_process() {
    this.setState({ loading: true })
    ProcessService.fetchProcess()
      .then((res) => {
        this.setState({ loading: false })
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return { label: cusmaidid.name, value: cusmaidid.id.toString() };
          });
          this.setState({
            process_data: regionlist,
          })
        }
      })
      .catch((error) => { this.setState({ loading: false }) });
  }
  fetch_designation() {
    this.setState({ loading: true })
    designationService.fetchdesignation()
      .then((res) => {
        if (res.status) {
          this.setState({ loading: false })
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return { label: cusmaidid.name, value: cusmaidid.id.toString() };
          });
          this.setState({
            designation_data: regionlist,
          })
        }
      })
      .catch((error) => { this.setState({ loading: false }) });
  }
  fetch_department() {
    this.setState({ loading: true })
    departmentService.fetchdepartment()
      .then((res) => {
        this.setState({ loading: false })
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return { label: cusmaidid.name, value: cusmaidid.id.toString() };
          });
          this.setState({
            department_data: regionlist,
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
            location_data: regionlist,
          })
        }
      })
      .catch((error) => { this.setState({ loading: false }) });
  }
  fetch_level() {
    this.setState({ loading: true })
    levelService.fetchlevel()
      .then((res) => {
        this.setState({ loading: false })
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return { label: cusmaidid.name, value: cusmaidid.id.toString() };
          });
          this.setState({
            level_data: regionlist,
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
            tl_data: regionlist,
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
            manager_data: regionlist,
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
            director_data: regionlist,
          })
        }
      })
      .catch((error) => { this.setState({ loading: false }) });
  }
  fetch_MD() {
    MDService.fetchMD()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return { label: cusmaidid.name, value: cusmaidid.name };
          });
          this.setState({
            MD_data: regionlist,
          })
        }
      })
      .catch((error) => { this.setState({ loading: false }) });
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  onSubmit() {
    const { id, name, lastname, email, username, is_active, role_id, mobile_phone, region, area,probation,
      subarea, password, doj, department, designation, process, level, code, location, teamleader, manager, md,
      director, isEdit, team_data,highcost_employee } = this.state

    console.log("kjbjkvkj ", JSON.stringify({
      name, lastname, email, username, is_active, role_id, mobile_phone, region, area,
      subarea, password, doj, department, designation, process, level, code, location, teamleader, manager, md, director,probation
    }))
    if (name !== "" && username !== '' && role_id !== '' && email !== '' && region !== '' &&
      area !== '' && subarea !== '' && doj !== '' && department !== '' && designation !== '' && process !== ''
      && level !== '' && code !== '' && location !== '' && highcost_employee !== '') {
        this.setState({
          is_submit:false
        })
      if (this.validateEmail(email)) {
        var geocode = getValue(team_data, 'value', 'country_code', subarea)
        if (isEdit === true) {
          this.updateAPI(id, name, lastname, email, username, is_active, role_id, mobile_phone, region, area,
            subarea, password, doj, department, designation, process, level, code, location, teamleader, manager, md, director, geocode,probation,highcost_employee)
        }
        else {
          this.createAPI(name, lastname, email, username, is_active, role_id, mobile_phone, region, area,
            subarea, password, doj, department, designation, process, level, code, location, teamleader, manager, md, director, geocode,probation,highcost_employee)
        }

      }
      else {
        createNotification('Please fill valid email', 'error', 'filled')
      }


    }
    else {
      this.setState({
        is_submit:true
      })
      createNotification('Please fill mandatory field', 'error', 'filled')
    }
  }
  createAPI(name, lastname, email, username, is_active, role_id, mobile_phone, region, area,
    subarea, password, doj, department, designation, process, level, code, location, teamleader, manager, md, director, geocode,probation,highcost_employee) {
    this.setState({
      loading: true
    })
    userService.createuser(name, lastname, email, username, is_active, role_id, mobile_phone, region, area,
      subarea, password, doj, department, designation, process, level, code, location, teamleader, manager, md, director, geocode,probation,highcost_employee)
      .then((res) => {
        this.setState({
          loading: false
        })
        if (res.status) {
          createNotification('Created', 'success', 'filled')
          this.close(true)
        }
        else {

          createNotification(res.message, 'error', 'filled');
        }

      })
      .catch((error) => {
        this.setState({
          loading: false
        })
      });

  }
  updateAPI(id, name, lastname, email, username, is_active, role_id, mobile_phone, region, area,
    subarea, password, doj, department, designation, process, level, code, location, teamleader, manager, md, director, geocode,probation,highcost_employee) {
    this.setState({
      loading: true
    })
    userService.updateuser(id, name, lastname, email, username, is_active, role_id, mobile_phone, region, area,
      subarea, password, doj, department, designation, process, level, code, location, teamleader, manager, md, director, geocode,probation,highcost_employee)
      .then((res) => {
        this.setState({
          loading: false
        })
        if (res.status) {
          createNotification('Updated', 'success', 'filled')
          this.close(true)
        }
        else {

          createNotification(res.message, 'error', 'filled');
        }

      })
      .catch((error) => {
        this.setState({
          loading: false
        })
      });
  }
  close(isedit) {
    this.props.closeModal(isedit)
  }

  onChangeusername = (username) => {
    if (username.match("^[a-zA-Z0-9]*$")) {
      this.setState({ username: username.toUpperCase() })
    }
  }

  getArrayValue(array, value, key) {
    var list = []
    if (array && array !== null && value !== '' && value !== null) {
      list = array.filter(item => item[key] === value)
    }
    return list
  }
  render() {

    const { name, lastname, email, username, role_data, is_active, role_id, mobile_phone, region, area,
      subarea, team_data, areadata, regiondata, loading, password, isreset, showpassword, doj,
      department, designation, process, level, code, location, teamleader, manager, md, director,highcost_employee,
      department_data, designation_data, level_data, location_data, tl_data, manager_data, MD_data, director_data,
      process_data,is_submit,probation } = this.state
    const { match, languageData, locale, isEdit } = this.props
    const current_date = moment(new Date()).format('YYYY-MM-DD')
    var highcost_data = [
      {
        "label": "Yes",
        "value": "Yes"
      },
      {
        "label": "No",
        "value": "No"
      },
    ];
    return (
      <div>
        {loading &&
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
        <Row>
          <Colxx xxs="12">
            <div className="row">
              <div className="col-md-10">
                <Breadcrumb heading={onChangeLanguage(locale, (isEdit === true ? 'Update ' : 'Add ') + 'User', languageData)} match={match} />
              </div>
              <div className="col-md-2">
                <Button color="primary" className='fontstyle button-width' onClick={() => this.close(false)}>
                  {onChangeLanguage(locale, 'Cancel', languageData)}

                </Button>
                <Button color="secondary" className="fontstyle button-width" onClick={() => this.onSubmit()}>
                  {onChangeLanguage(locale, 'Submit', languageData)}
                </Button>

              </div>

            </div>
            <Separator className="separator-margin" />
          </Colxx>
        </Row>
        <div className="publishuser-card-component" style={{ padding: '10px',borderRadius:'10px' }}>
          <Row>
            <Colxx xxs="3" className="mb-4 space-margin">
              <Label className="fontstyle">{onChangeLanguage(locale, 'First Name', languageData)}
                <a style={{ color: 'red' }}>*</a></Label>
              <Input className = {is_submit === true && name === ''?  "error-border":"fontstyle text-background" }  
                placeholder={onChangeLanguage(locale, 'First Name', languageData)}
                value={name}
                onChange={(e) => this.setState({ name: e.target.value })} />
            </Colxx>
            <Colxx xxs="3" className="mb-4 space-margin">
              <Label className="fontstyle">{onChangeLanguage(locale, 'Last Name', languageData)}</Label>
              <Input className = "fontstyle text-background"  
                placeholder={onChangeLanguage(locale, 'Last Name', languageData)}
                value={lastname}
                onChange={(e) => this.setState({ lastname: e.target.value })} />
            </Colxx>
            <Colxx xxs="3" className="mb-4 space-margin">
              <Label className="fontstyle">{onChangeLanguage(locale, 'Code', languageData)}
                <a style={{ color: 'red' }}>*</a></Label>
              <Input className = {is_submit === true && code === ''?  "error-border":"fontstyle text-background" }   type="number"
                placeholder={onChangeLanguage(locale, 'Code', languageData)}
                value={code}
                onChange={(e) => this.setState({ code: e.target.value })} />
            </Colxx>
            <Colxx xxs="3" className="mb-4 space-margin">
              <Label className="fontstyle">{onChangeLanguage(locale, 'User ID', languageData)}
                <a style={{ color: 'red' }}>*</a></Label>
              <Input className = {is_submit === true && username === ''?  "error-border":"fontstyle text-background" }  
                placeholder={onChangeLanguage(locale, 'User ID', languageData)}
                value={username}
                disabled= {isEdit === true}
                onChange={(e) => this.onChangeusername(e.target.value)} />
            </Colxx>
            <Colxx xxs="3" className="mb-4 space-margin">
              <Label className="fontstyle">{onChangeLanguage(locale, 'Email', languageData)}
                <a style={{ color: 'red' }}>*</a></Label>
              <Input className = {is_submit === true && email === ''?  "error-border":"fontstyle text-background" }   type="email"
                placeholder={onChangeLanguage(locale, 'Email', languageData)}
                value={email}
                onChange={(e) => this.setState({ email: e.target.value })} />
            </Colxx>
            <Colxx xxs="3" className="mb-4 space-margin">
              <Label className="fontstyle">{onChangeLanguage(locale, 'Mobile', languageData)}
              </Label>
              <Input className="fontstyle text-background" type="number"
                placeholder={onChangeLanguage(locale, 'Mobile', languageData)}
                value={mobile_phone}
                onChange={(e) => this.setState({ mobile_phone: e.target.value })} />
            </Colxx>
            <Colxx xxs="3" className="mb-4 space-margin">
              <Label className="fontstyle">{onChangeLanguage(locale, 'Date of Join', languageData)}
                <a style={{ color: 'red' }}>*</a></Label>
              <Input className = {is_submit === true && doj === ''?  "error-border":"fontstyle text-background" }   type="date"
                placeholder={onChangeLanguage(locale, 'DOJ', languageData)}
                value={doj}
                max={current_date}
                onChange={(e) => this.setState({ doj: e.target.value })} />
            </Colxx>
            <Colxx xxs="3" className="mb-4 space-margin">
              <Label className="fontstyle">{onChangeLanguage(locale, 'Role', languageData)}
                <a style={{ color: 'red' }}>*</a></Label>
              <Select className = {is_submit === true && role_id === ''?  "error-border-select":"react-select fontstyle" }  
                classNamePrefix="react-select"
                name="form-field-name"
                placeholder={onChangeLanguage(locale, 'Role', languageData)}
                value={role_data.filter(option => option.value === role_id)}
                options={role_data}
                onChange={({ value }) => this.setState({ role_id: value })}
              />
            </Colxx>
            <Colxx xxs="3" className="mb-4 space-margin">
              <Label className="fontstyle">{onChangeLanguage(locale, 'Location', languageData)}
                <a style={{ color: 'red' }}>*</a></Label>
              <Select className = {is_submit === true && location === ''?  "error-border-select":"react-select fontstyle" }  
                classNamePrefix="react-select"
                name="form-field-name"
                placeholder={onChangeLanguage(locale, 'Location', languageData)}
                value={location_data.filter(option => option.value === location)}
                options={location_data}
                onChange={({ value }) => this.setState({ location: value })}
              />
            </Colxx>
            <Colxx xxs="3" className="mb-4 space-margin">
              <Label className="fontstyle">{onChangeLanguage(locale, 'Designation', languageData)}
                <a style={{ color: 'red' }}>*</a></Label>
              <Select className = {is_submit === true && designation === ''?  "error-border-select":"react-select fontstyle" }  
                classNamePrefix="react-select"
                name="form-field-name"
                placeholder={onChangeLanguage(locale, 'Designation', languageData)}
                value={designation_data.filter(option => option.value === designation)}
                options={designation_data}
                onChange={({ value }) => this.setState({ designation: value })}
              />
            </Colxx>
            <Colxx xxs="3" className="mb-4 space-margin">
              <Label className="fontstyle">{onChangeLanguage(locale, 'Level', languageData)}
                <a style={{ color: 'red' }}>*</a></Label>
              <Select className = {is_submit === true && level === ''?  "error-border-select":"react-select fontstyle" }  
                classNamePrefix="react-select"
                name="form-field-name"
                placeholder={onChangeLanguage(locale, 'Level', languageData)}
                value={level_data.filter(option => option.value === level)}
                options={level_data}
                onChange={({ value }) => this.setState({ level: value })}
              />
            </Colxx>
            <Colxx xxs="3" className="mb-4 space-margin">
              <Label className="fontstyle">{onChangeLanguage(locale, 'Department', languageData)}
                <a style={{ color: 'red' }}>*</a></Label>
              <Select className = {is_submit === true && department === ''?  "error-border-select":"react-select fontstyle" }  
                classNamePrefix="react-select"
                name="form-field-name"
                placeholder={onChangeLanguage(locale, 'Department', languageData)}
                value={department_data.filter(option => option.value === department)}
                options={department_data}
                onChange={({ value }) => this.setState({ department: value })}
              />
            </Colxx>
            <Colxx xxs="3" className="mb-4 space-margin">
              <Label className="fontstyle">{onChangeLanguage(locale, 'Process', languageData)}
                <a style={{ color: 'red' }}>*</a></Label>
              <Select className = {is_submit === true && process === ''?  "error-border-select":"react-select fontstyle" }  
                classNamePrefix="react-select"
                name="form-field-name"
                placeholder={onChangeLanguage(locale, 'Process', languageData)}
                value={process_data.filter(option => option.value === process)}
                options={process_data}
                onChange={({ value }) => this.setState({ process: value })}
              />
            </Colxx>
            <Colxx xxs="3" className="mb-4 space-margin">
              <Label className="fontstyle">{onChangeLanguage(locale, 'Region', languageData)}
                <a style={{ color: 'red' }}>*</a></Label>
              <Select
                className = {is_submit === true && region === ''?  "error-border-select":"react-select fontstyle" }  
                classNamePrefix="react-select"
                name="form-field-name"
                placeholder={onChangeLanguage(locale, 'Region', languageData)}
                value={regiondata.filter(option => option.value === region)}
                options={regiondata}
                onChange={({ value }) => this.setState({ region: value, area: '', subarea: '' })}
              />
            </Colxx>
            <Colxx xxs="3" className="mb-4 space-margin">
              <Label className="fontstyle">{onChangeLanguage(locale, 'Area', languageData)}
                <a style={{ color: 'red' }}>*</a></Label>
              <Select
                className = {is_submit === true && area === ''?  "error-border-select":"react-select fontstyle" }  
                classNamePrefix="react-select"
                name="form-field-name"
                placeholder={onChangeLanguage(locale, 'Area', languageData)}
                value={areadata.filter(option => option.value === area)}
                options={this.getArrayValue(areadata, region, 'region')}
                onChange={({ value }) => this.setState({ area: value, subarea: '' })}
              />
            </Colxx>
            <Colxx xxs="3" className="mb-4 space-margin">
              <Label className="fontstyle">{onChangeLanguage(locale, 'Team', languageData)}
                <a style={{ color: 'red' }}>*</a></Label>
              <Select
               className = {is_submit === true && subarea === ''?  "error-border-select":"react-select fontstyle" }  
                classNamePrefix="react-select"
                name="form-field-name"
                placeholder={onChangeLanguage(locale, 'Team', languageData)}
                value={team_data.filter(option => option.value === subarea)}
                options={this.getArrayValue(team_data, area, 'area')}
                onChange={({ value }) => this.setState({ subarea: value })}
              />
            </Colxx>
            <Colxx xxs="3" className="mb-4 space-margin">
              <Label className="fontstyle">{onChangeLanguage(locale, 'Team Leader', languageData)}
              </Label>
              <Select className="fontstyle react-select"
                //className="react-select"
                classNamePrefix="react-select"
                name="form-field-name"
                placeholder={onChangeLanguage(locale, 'Team Leader', languageData)}
                value={tl_data.filter(option => option.value === teamleader)}
                options={tl_data}
                onChange={({ value }) => this.setState({ teamleader: value })}
              />
            </Colxx>
            <Colxx xxs="3" className="mb-4 space-margin">
              <Label className="fontstyle">{onChangeLanguage(locale, 'Manager', languageData)}
              </Label>
              <Select className="fontstyle react-select"
                // className="react-select"
                classNamePrefix="react-select"
                name="form-field-name"
                placeholder={onChangeLanguage(locale, 'Manager', languageData)}
                value={manager_data.filter(option => option.value === manager)}
                options={manager_data}
                onChange={({ value }) => this.setState({ manager: value })}
              />
            </Colxx>
            <Colxx xxs="3" className="mb-4 space-margin">
              <Label className="fontstyle">{onChangeLanguage(locale, 'Director', languageData)}
              </Label>
              <Select className="fontstyle react-select"
                // className="react-select"
                classNamePrefix="react-select"
                name="form-field-name"
                placeholder={onChangeLanguage(locale, 'Director', languageData)}
                value={director_data.filter(option => option.value === director)}
                options={director_data}
                onChange={({ value }) => this.setState({ director: value })}
              />
            </Colxx>
            <Colxx xxs="3" className="mb-4 space-margin">
              <Label className="fontstyle">{onChangeLanguage(locale, 'Managing Director', languageData)}
              </Label>
              <Select className="fontstyle react-select"
                // className="react-select"
                classNamePrefix="react-select"
                name="form-field-name"
                placeholder={onChangeLanguage(locale, 'Managing Director', languageData)}
                value={MD_data.filter(option => option.value === md)}
                options={MD_data}
                onChange={({ value }) => this.setState({ md: value })}
              />
            </Colxx>
            
            {isEdit &&
              <Colxx xxs="3" className="mb-4 space-margin">
                <Label className="fontstyle">{onChangeLanguage(locale, 'Status', languageData)}
                </Label>
                <select className='fontstyle buttoncolor input-text'
                  type="select"
                  name="aggregatename"
                  id="name"
                  placeholder="Select"
                  value={is_active}
                  onChange={(e) => this.setState({ is_active: parseInt(e.target.value) })}
                >
                  <option value={1}>{onChangeLanguage(locale, 'Active', languageData)}</option>
                  <option value={0}>{onChangeLanguage(locale, 'In - Active', languageData)}</option>

                </select>
              </Colxx>
            }
            {isEdit &&
              <Colxx xxs="3" className="mb-4 space-margin">
                <Label className="fontstyle">{onChangeLanguage(locale, 'Password', languageData)}
                </Label><br></br>
                {!isreset &&
                  <Button color="primary" outline onClick={() => this.setState({ isreset: true })}>
                    {onChangeLanguage(locale, isEdit ? 'Reset Password' : 'Set Password', languageData)}
                  </Button>
                }
                {isreset &&
                  <span>
                    <Input type={showpassword ? 'text' : 'password'}
                      placeholder={onChangeLanguage(locale, 'Password', languageData)}
                      value={password}
                      onChange={(e) => this.setState({ password: e.target.value })} />
                    <img src={showpassword ? Eyeclose : Eyeopen} alt="thumbnail"
                      style={{ width: '15px', height: '15px', cursor: 'pointer', position: 'absolute', right: '22px', top: '71px' }}
                      onClick={() => this.setState({ showpassword: !showpassword })} />
                  </span>

                }
              </Colxx>
            }
            
            <Colxx xxs="3" className="mb-4 space-margin">
              
              <Row style={{marginTop:'25px'}}>
                     <Colxx xxs="6">
                         <CustomRadioButton checked = {false} name = "Probation" value = {probation} 
                             onChangeRadio={()=>this.setState({probation:false})}/>
                         
                     </Colxx>
                     <Colxx xxs="6">
                       <CustomRadioButton checked = {true} name = "Confirm" value = {probation}
                             onChangeRadio={()=>this.setState({probation:true})}/>
                         
                     </Colxx>
                 </Row>
            </Colxx>
            <Colxx xxs="3" className="mb-4 space-margin">
              <Label className="fontstyle">{onChangeLanguage(locale, 'High Cost Employee', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <Select className = {is_submit === true && designation === ''?  "error-border-select":"react-select fontstyle" }
                // className="react-select"
                classNamePrefix="react-select"
                name="form-field-name"
                placeholder={onChangeLanguage(locale, 'High Cost Employee', languageData)}
                value={highcost_data.filter(option => option.value === highcost_employee)}
                options={highcost_data}
                onChange={({ value }) => this.setState({ highcost_employee: value })}
              />
            </Colxx>
          </Row>

        </div>



      </div>
    );
  }
}
// export default RegisterUser


const mapStateToProps = ({ settings }) => {
  const { locale, languageData } = settings;
  return { locale, languageData };
};
export default injectIntl(
  connect(mapStateToProps, {

  })(RegisterUser)
);

