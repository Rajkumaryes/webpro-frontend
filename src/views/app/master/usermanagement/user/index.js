import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {  Button, Row, Input } from 'reactstrap';
import { Colxx, Separator } from '../../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../../containers/navs/Breadcrumb';
import Create from './create'
import { Table, Popconfirm, Tooltip } from 'antd';
import { INDEX_PAGE_SIZE_OPTIONS } from "../../../../../constants/defaultValues";
import 'antd/dist/antd.css';
import { createNotification } from '../../../../../toast';
import { getValue } from '../../../../../helper'
import { onChangeLanguage } from '../../../../../helper'
import { userService } from '../../../../../redux/users/saga'
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
import Select from 'react-select';
import CustomRadioButton from '../../../../RadioButton'

class MasterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isEdit: false,
      modalOpen: false,
      record: {},
      role_data: [],
      team_data: [],
      regiondata: [],
      areadata: [],
      designation_data: [],
      level_data: [],
      location_data: [],
      process_data: [],
      department_data: [],
      tl_data: [],
      manager_data: [],
      director_data: [],
      MD_data: [],
      searchText: '',
      searchedColumn: '',
      page: 1,
      pageSize: 10,
      total: 0,
      area: '',
      region: '',
      subarea: '',
      role_id: 0,
      username: '',
      is_active: 2,
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
      probation:'',
    };
  }
  componentWillMount() {
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

    this.clearvalue()
  }
  fetchteam() {
    this.setState({ loading: true })
    teamsService.fetchteams()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var teamlist = filterstatus.map(function (cusmaidid) {
            return {
              label: (cusmaidid.name + '-' + cusmaidid.country_code), text: cusmaidid.name,
              value: cusmaidid.id.toString(), area: cusmaidid.area, country_code: cusmaidid.country_code
            };
          });
          this.setState({
            team_data: teamlist,
            loading: false
          })
          // console.log("kaviiiiii", teamlist)
        }
        else {
          this.setState({ loading: false })
        }
      })
      .catch((error) => { });
    this.setState({ loading: false })
  }

  fetchrole() {
    roleService.fetchroleData()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var rolelist = filterstatus.map(function (cusmaidid) {
            return { text: cusmaidid.name, label: cusmaidid.name, value: cusmaidid.id };
          });
          this.setState({
            role_data: rolelist,
          })
        }
        else {
          this.setState({ loading: false })
        }
      })
      .catch((error) => { });
  }
  fetchregion() {
    regionService.fetchregion()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return { label: cusmaidid.region, text: cusmaidid.region, value: cusmaidid.id.toString() };
          });
          this.setState({
            regiondata: regionlist,
          })
        }
        else {
          this.setState({ loading: false })
        }
      })
      .catch((error) => { });
  }
  fetcharea() {
    areaService.fetcharea()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return {
              label: cusmaidid.name,
              value: cusmaidid.id.toString(), region: cusmaidid.region
            };
          });
          this.setState({
            areadata: regionlist,
          })
        }
        else {
          this.setState({ loading: false })
        }
      })
      .catch((error) => { });
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

  openModal(record) {

    if (record) {
      this.setState({
        isEdit: true,
        record: record,
      })
    }
    this.setState({
      modalOpen: true,
    })
  }
  closeModal(isEdit) {
    this.setState({
      modalOpen: false,
      isEdit: false,
      record: {},
    })
    if (isEdit === true) {
      this.onclose()
    }
  }

  handleDelete = id => {
    this.setState({
      loading: true,
    })
    userService.deleteuser(id)
      .then((res) => {
        this.setState({
          loading: false,
        })
        if (res) {
          if (res.status) {
            createNotification('Deleted', 'success', 'filled')
            this.onclose()
          }

        }
      })
      .catch((error) => { 
        this.setState({
          loading: false,
        })
      });
  }
  onclose() {
    const { page, pageSize, username, role_id, region, area, subarea, doj, department, designation,
      process, level, code, location, teamleader, manager, md, director,probation, is_active } = this.state
    this.fetchpagination(page, pageSize, username, role_id, region, area, subarea, doj, department, designation,
      process, level, code, location, teamleader, manager, md, director,probation, is_active)
  }

  onSearch() {
    const {  username, role_id, region, area, subarea, doj, department, designation,
      process, level, code, location, teamleader, manager, md, director,probation, is_active } = this.state
    this.fetchpagination(1, 25, username, role_id, region, area, subarea, doj, department, designation,
      process, level, code, location, teamleader, manager, md, director,probation, is_active)
  }
  clearvalue() {

    this.setState({
      page: 1,
      pageSize: 10,
      firstname: '',
      lastname: '',
      username: '',
      subarea: '',
      area: '',
      region: '',
      role_id: 0,
      is_active: 2,
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
      probation:'',
    })
    this.fetchpagination(1, 25, '', 0, '', '', '', '', '', '',
      '', '', '', '', '', '', '', '','', 2)
  }

  fetchpagination(page, per_page, username, role_id, region, area, subarea, doj, department, designation,
    process, level, code, location, teamleader, manager, md, director,probation, is_active) {
    this.setState({
      loading: true,
      page: page,
      pageSize: per_page
    })
    userService.fetchpagination(page, per_page, username, role_id, region, area, subarea, doj, department, designation,
      process, level, code, location, teamleader, manager, md, director,probation, is_active)
      .then((res) => {
        this.setState({
          loading: false,

        })
        if (res.status) {
          if (res.data) {
            this.setState({
              data: res.data,
              total: res.total
            })
          }

        } else {
          this.setState({
            data: [],
            pageSize: 25,
            page: 1,
            total: 0
          })

        }

      })
      .catch((error) => {
        this.setState({
          loading: false,

        })

      });
  }

  getArrayValue(array, value, key) {
    var list = []
    if (array && array !== null && value !== '' && value !== null) {
      list = array.filter(item => item[key] === value)
    }
    return list
  }

  paginationOptions = {
    showSizeChanger: true,
    showQuickJumper: true,
    onShowSizeChange: (_, pageSize) => {
      this.setState({
        pageSize: pageSize
      })

    },
    onChange: (page, pageSize) => {
      const { username, role_id, region, area, subarea, doj, department, designation,
        process, level, code, location, teamleader, manager, md, director,probation, is_active } = this.state
      this.fetchpagination(page, pageSize, username, role_id, region, area, subarea, doj, department, designation,
        process, level, code, location, teamleader, manager, md, director,probation, is_active)
    },
    pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
    // total: this.state.total  ,
    showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total}`,
  };
  render() {
    const { match, languageData, locale } = this.props
    const { data, role_data, team_data, areadata, regiondata, username, area, region, subarea, role_id,
      is_active, department, designation, process, level, code, location, teamleader, manager, md, director,probation,
      department_data, designation_data, level_data, location_data, tl_data, manager_data, MD_data, director_data,
      process_data, modalOpen } = this.state
    const columns = [

      {
        title: onChangeLanguage(locale, 'First Name', languageData),
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: onChangeLanguage(locale, 'Last Name', languageData),
        dataIndex: 'lastname',
        key: 'lastname',
      },
      {
        title: onChangeLanguage(locale, 'Code', languageData),
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: onChangeLanguage(locale, 'User ID', languageData),
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: onChangeLanguage(locale, 'Email', languageData),
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: onChangeLanguage(locale, 'Mobile', languageData),
        dataIndex: 'mobile_phone',
        key: 'mobile_phone',
      },
      {
        title: onChangeLanguage(locale, 'DOJ', languageData),
        dataIndex: 'doj',
        key: 'doj',
        render: (text, record) => (
          <div>
            {text !== null && moment(text).format('MM/DD/YYYY')}
          </div>
        ),
      },
      {
        title: onChangeLanguage(locale, 'Role', languageData),
        dataIndex: 'role_id',
        key: 'role_id',
        render: (text, record) => (
          <div>
            {text !== null && getValue(role_data, 'value', 'text', text)}
          </div>
        ),
      },
      {
        title: onChangeLanguage(locale, 'Location', languageData),
        dataIndex: 'location',
        key: 'location',
        render: (text, record) => (
          <div>
            {text !== null && getValue(location_data, 'value', 'label', text)}
          </div>
        ),
      },
      {
        title: onChangeLanguage(locale, 'Designation', languageData),
        dataIndex: 'designation',
        key: 'designation',
        render: (text, record) => (
          <div>
            {text !== null && getValue(designation_data, 'value', 'label', text)}
          </div>
        ),
      },
      {
        title: onChangeLanguage(locale, 'Level', languageData),
        dataIndex: 'level',
        key: 'level',
        render: (text, record) => (
          <div>
            {text !== null && getValue(level_data, 'value', 'label', text)}
          </div>
        ),
      },
      {
        title: onChangeLanguage(locale, 'Department', languageData),
        dataIndex: 'department',
        key: 'department',
        render: (text, record) => (
          <div>
            {text !== null && getValue(department_data, 'value', 'label', text)}
          </div>
        ),
      },
      {
        title: onChangeLanguage(locale, 'Process', languageData),
        dataIndex: 'process',
        key: 'process',
        render: (text, record) => (
          <div>
            {text !== null && getValue(process_data, 'value', 'label', text)}
          </div>
        ),
      },

      {
        title: onChangeLanguage(locale, 'Region', languageData),
        dataIndex: 'region',
        key: 'region',
        render: (text, record) => (
          <div>

            {text !== null && getValue(regiondata, 'value', 'label', text)}
          </div>
        ),
      },
      {
        title: onChangeLanguage(locale, 'Area', languageData),
        dataIndex: 'area',
        key: 'area',
        render: (text, record) => (
          <div>
            {text !== null && getValue(areadata, 'value', 'label', text)}
          </div>
        ),
      },
      {
        title: onChangeLanguage(locale, 'Team', languageData),
        dataIndex: 'subarea',
        key: 'subarea',
        render: (text, record) => (
          <div>
            {text !== null && getValue(team_data, 'value', 'text', text) + ' - ' + getValue(team_data, 'value', 'country_code', text)}
          </div>
        ),
      },
      {
        title: onChangeLanguage(locale, 'Team Leader', languageData),
        dataIndex: 'teamleader',
        key: 'teamleader',
      },
      {
        title: onChangeLanguage(locale, 'Manager', languageData),
        dataIndex: 'manager',
        key: 'manager',
      },
      {
        title: onChangeLanguage(locale, 'Director', languageData),
        dataIndex: 'director',
        key: 'director',
      },
      {
        title: onChangeLanguage(locale, 'Managing Director', languageData),
        dataIndex: 'md',
        key: 'md',
      },
      {
        title: onChangeLanguage(locale, 'Probation/Confirm', languageData),
        dataIndex: 'probation',
        key: 'probation',
        render: (text, record) => (
          <div>
            {text === true ? 'Confirm' : 'Probation'}
          </div>
        ),
      },
      {
        title: onChangeLanguage(locale, 'Status', languageData),
        dataIndex: 'is_active',
        key: 'is_active',
        render: (text, record) => (
          <span className="d-flex justify-content-center">
            <div className={(text === 0) ? "inactive-buttoncolor" : "active-buttoncolor"}
              style={{ width: '80px', height: '20px', color: 'white', textAlign: 'center', margin: '2px' }}>
              <a style={{ marginTop: '2px' }}>{(text === 0) ? onChangeLanguage(locale, 'In-Active', languageData) : onChangeLanguage(locale, 'Active', languageData)}</a>
            </div>
          </span>
        ),
      },
      {
        title: onChangeLanguage(locale, 'Action', languageData),
        key: 'id',
        dataIndex: 'id',
        render: (id, record) => (
          <div className="row d-flex justify-content-center" style={{ width: '80px' }}>
            <Tooltip className='fontstyle' title="Edit" placement="bottom">
              <a onClick={() => this.openModal(record)} style={{ color: 'blue', height: '25px', width: '25px', padding: '4px' }}>
                <i className="simple-icon-pencil"></i>
              </a>
            </Tooltip>

            <Popconfirm className='fontstyle' variant="contained"
              title="Are you sure to delete?"
              style={{
                backgroundColor: 'rgb(79, 156, 1)',
                color: 'white'
              }}
              onConfirm={() => this.handleDelete(record.id)}
            >
              <Tooltip title="Delete" placement="bottom">
                <a style={{
                  color: 'red', height: '25px', width: '25px',
                  padding: '4px'
                }}><i className="simple-icon-trash"></i></a></Tooltip>
            </Popconfirm>


          </div>
        )
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
        <title>{onChangeLanguage(locale, 'User Management', languageData)}</title>
        {modalOpen === true ?
          this.renderModal() :
          <div>
            <Row>
              <Colxx xxs="12">
                <div className="row">
                  <div className="col-md-10">
                    <Breadcrumb heading={onChangeLanguage(locale, 'User Management', languageData)} match={match} />
                  </div>
                  <div className="col-md-2">
                    <Button color="primary" className='fontstyle button-width' onClick={(event) => this.openModal()}>
                      {onChangeLanguage(locale, 'Add User', languageData)}
                    </Button>
                  </div>

                </div>
                <Separator className="separator-margin" />
              </Colxx>
            </Row>

            <div className="publishuser-card-component" style={{ padding: '10px', borderRadius: '10px', marginBottom: '15px' }}>
              <Row>
                 <div className = "col-lg-2-0 space-margin">
                  <Input className="fontstyle text-background"
                    placeholder={onChangeLanguage(locale, 'User ID', languageData)}
                    value={username}
                    onChange={(e) => this.setState({ username: (e.target.value).toUpperCase() })} />
                </div>
                 <div className = "col-lg-2-0 space-margin">
                  <Select className="fontstyle"
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    placeholder={onChangeLanguage(locale, 'Role', languageData)}
                    value={role_data.filter(option => option.value === role_id)}
                    options={role_data}
                    onChange={({ value }) => this.setState({ role_id: value })}
                  />
                </div>
                 <div className = "col-lg-2-0 space-margin">                  
                 <Select className="fontstyle"
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    placeholder={onChangeLanguage(locale, 'Location', languageData)}
                    value={location_data.filter(option => option.value === location)}
                    options={location_data}
                    onChange={({ value }) => this.setState({ location: value })}
                  />
                </div>
                 {/* <div className = "col-lg-2-0 space-margin">                  
                 <Select className="fontstyle"
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    placeholder={onChangeLanguage(locale, 'Level', languageData)}
                    value={level_data.filter(option => option.value === level)}
                    options={level_data}
                    onChange={({ value }) => this.setState({ level: value })}
                  />
                </div> */}
                 <div className = "col-lg-2-0 space-margin">                  
                 <Select className="fontstyle"
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    placeholder={onChangeLanguage(locale, 'Designation', languageData)}
                    value={designation_data.filter(option => option.value === designation)}
                    options={designation_data}
                    onChange={({ value }) => this.setState({ designation: value })}
                  />
                </div>
                 <div className = "col-lg-2-0 space-margin">                  
                 <Select className="fontstyle"
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    placeholder={onChangeLanguage(locale, 'Department', languageData)}
                    value={department_data.filter(option => option.value === department)}
                    options={department_data}
                    onChange={({ value }) => this.setState({ department: value })}
                  />
                </div>
                 <div className = "col-lg-2-0 space-margin">
                  <Select className="fontstyle"
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    placeholder={onChangeLanguage(locale, 'Process', languageData)}
                    value={process_data.filter(option => option.value === process)}
                    options={process_data}
                    onChange={({ value }) => this.setState({ process: value })}
                  />
                </div>
                 <div className = "col-lg-2-0 space-margin">
                  <Select className="fontstyle"
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    placeholder={onChangeLanguage(locale, 'Region', languageData)}
                    value={regiondata.filter(option => option.value === region)}
                    options={regiondata}
                    onChange={({ value }) => this.setState({ region: value, area: '', subarea: '' })}
                  />
                </div>
                 <div className = "col-lg-2-0 space-margin">
                  <Select className="fontstyle input-text-select"
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    placeholder={onChangeLanguage(locale, 'Area', languageData)}
                    value={areadata.filter(option => option.value === area)}
                    options={this.getArrayValue(areadata, region, 'region')}
                    onChange={({ value }) => this.setState({ area: value, subarea: '' })}
                  />
                </div>
              
                 <div className = "col-lg-2-0 space-margin">
                  <Select className="fontstyle input-text-select"
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    placeholder={onChangeLanguage(locale, 'Team', languageData)}
                    value={team_data.filter(option => option.value === subarea)}
                    options={this.getArrayValue(team_data, area, 'area')}
                    onChange={({ value }) => this.setState({ subarea: value })}
                  />
                </div>
                 <div className = "col-lg-2-0 space-margin">
                  <Select className="fontstyle"
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    placeholder={onChangeLanguage(locale, 'Managing Director', languageData)}
                    value={MD_data.filter(option => option.value === md)}
                    options={MD_data}
                    onChange={({ value }) => this.setState({ md: value })}
                  />
                </div>
                 <div className = "col-lg-2-0 space-margin">
                  <Select className="fontstyle"
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    placeholder={onChangeLanguage(locale, 'Director', languageData)}
                    value={director_data.filter(option => option.value === director)}
                    options={director_data}
                    onChange={({ value }) => this.setState({ director: value })}
                  />
                </div>
                 <div className = "col-lg-2-0 space-margin">
                  <Select className="fontstyle"
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    placeholder={onChangeLanguage(locale, 'Manager', languageData)}
                    value={manager_data.filter(option => option.value === manager)}
                    options={manager_data}
                    onChange={({ value }) => this.setState({ manager: value })}
                  />
                </div>
                 <div className = "col-lg-2-0 space-margin">
                  <Select className="fontstyle"
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    placeholder={onChangeLanguage(locale, 'Team Leader', languageData)}
                    value={tl_data.filter(option => option.value === teamleader)}
                    options={tl_data}
                    onChange={({ value }) => this.setState({ teamleader: value })}
                  />
                </div>
                
                 <div className = "col-lg-2-0 space-margin">
                  <select className='fontstyle text-background'
                    style={{ height: '36px', width: '100%', color: 'black', border: '1px solid #d9d9d9' }}
                    type="select"
                    name="aggregatename"
                    id="name"
                    placeholder="Select"
                    value={is_active}
                    onChange={(e) => this.setState({ is_active: parseInt(e.target.value) })}
                  >
                    <option value={2}>{onChangeLanguage(locale, 'Select Status', languageData)}</option>
                    <option value={1}>{onChangeLanguage(locale, 'Active Users', languageData)}</option>
                    <option value={0}>{onChangeLanguage(locale, 'Deactivated Users', languageData)}</option>

                  </select>
                </div>
                <div className = "col-lg-2-0 space-margin">
                  <Row style={{marginTop:'10px'}}>
                      <Colxx xxs="6">
                          <CustomRadioButton checked = "false" name = "Probation" value = {probation} 
                              onChangeRadio={()=>this.setState({probation:"false"})}/>
                          
                      </Colxx>
                      <Colxx xxs="6">
                        <CustomRadioButton checked = "true" name = "Confirm" value = {probation}
                              onChangeRadio={()=>this.setState({probation:"true"})}/>
                          
                      </Colxx>
                  </Row>
                 </div>
                 <div className = "col-md-12 space-margin text-center">
                  <Button className="button-width" color="primary" onClick={() => this.onSearch()}>
                    {onChangeLanguage(locale, 'Search', languageData)}
                  </Button>
                  <Button className="button-width" color="secondary"  onClick={() => this.clearvalue()} style={{ margin: '0px 2px' }}>
                    {onChangeLanguage(locale, 'Reset', languageData)}
                  </Button>
                </div>
              </Row>
            </div>
            <Table
              dataSource={data}
              columns={columns}
              pagination={pagination}
              rowKey={record => record.id}
              rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
              onChange={this.handleTableChange}

            />
          </div>
        }
      </>
    )
  }
  renderModal() {
    const { record, isEdit, isadmin } = this.state
    const { match } = this.props
    return (
      <Create record={record}
        isEdit={isEdit}
        isadmin={isadmin}
        match={match}
        closeModal={this.closeModal.bind(this)} />
    );
  }
}


const mapStateToProps = ({ settings }) => {
  const { locale, languageData } = settings;
  return { locale, languageData };
};
export default injectIntl(
  connect(mapStateToProps, {

  })(MasterPage)
);



