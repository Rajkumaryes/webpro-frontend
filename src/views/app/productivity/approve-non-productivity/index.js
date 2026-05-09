import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import Select from 'react-select';
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../constants/defaultValues';
import { Label, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { Table, Popconfirm, Tooltip, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import { createNotification } from '../../../../toast';
import { onChangeLanguage, getValue } from '../../../../helper'
import { roleService } from '../../../../redux/role/saga'
import { nonproductivityService } from '../../../../redux/productivty/non-productivity/saga'
import { categoryService } from '../../../../redux/productivty/category/saga'
import { typeService } from '../../../../redux/productivty/type/saga'
import moment from 'moment';
import { teamsService } from '../../../../redux/teams/saga'
import { userService } from '../../../../redux/users/saga'
import { ProtectedRoute, UserRole } from '../../../../helpers/authHelper';
import { getDirection, getCurrentUser, getCurrentLevel } from '../../../../helpers/Utils';
import { CSVLink } from "react-csv";
import CustomDatePickerTwoWeeks from "../../../../components/datepicker/CustomDatePickerTwoWeeks";
import { customdateService } from '../../../../redux/productivty/customdate/saga';

class MasterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      category_data: [],
      timelimit_data: [],
      menu_data: [],
      type_data: [],
      team_data: [],
      user_data: [],
      selectedRowKeys: [],
      menu: '',
      user_id: '',
      start_time: '',
      end_time: '',
      page: 1,
      pageSize: 25,
      total: 0,
      isModalOpen: false,
      modalOpen: false,
      tlcomments: '',
      modalId: '',
      team_id: '',
      downloadNpdata: [],
      howManyDays: ''
    };
    this.csvLink = React.createRef();
  }
  componentWillMount() {
    this.ClearValue()
    this.fetchcategory()
    this.fetchpermissionData()
    this.fetchtype()
    this.fetchTeamData()
    this.fetchDaysCustomDate()
  }
  fetchDaysCustomDate() {
    this.setState({ loading: true });

    customdateService.approvedatefetchapi()
      .then((res) => {
        console.log("API Response:", res.data);
        this.setState({ loading: false });

        if (res.status && Array.isArray(res.data) && res.data.length > 0) {
          const firstRecord = res.data[0];

          this.setState({
            recordId: firstRecord.id, // store id
            approveDateEnabled: !!firstRecord.approvedate,
            howManyDays: firstRecord.approvedays ? String(firstRecord.approvedays) : ''
          });
        } else {
          this.setState({
            recordId: null, // no existing row
            approveDateEnabled: false,
            howManyDays: ''
          });
        }

      })
      .catch((error) => {
        this.setState({ loading: false });
        console.error('Fetch error:', error);
      });
  }
  fetchTeamData() {
    this.setState({
      loading: true
    })
    teamsService.fetchteams()
      .then((res) => {
        this.setState({
          loading: false
        })
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var list = filterstatus.map(function (areaaval) {
            return { label: areaaval.name + '-' + areaaval.country_code, value: (areaaval.id).toString() };
          });
          this.setState({
            team_data: list,
          })

        }

      })
      .catch((error) => {
        this.setState({
          loading: false
        })
      });
  }
  fetchUserData(team_array) {
    this.setState({
      loading: true
    })
    userService.fetch_hierarchyuserData(team_array)
      .then((res) => {
        this.setState({
          loading: false
        })
        if (res.status) {
          const { username } = this.props;
          let filterstatus = (res.data).filter(item => item.is_active === 1)
          var list = []
          for (var i = 0; i < filterstatus.length; i++) {
            list.push(filterstatus[i].username)
          }

          this.setState({
            user_data: list,
          })

        }

      })
      .catch((error) => {
        this.setState({
          loading: false
        })
      });
  }
  fetchpermissionData() {
    this.setState({
      loading: true
    })
    roleService.fetchrolepermissionData()
      .then((res) => {
        this.setState({
          loading: false

        })
        if (res.status === true) {
          if (res.data) {
            let filterstatus = (res.data).filter(item => item.id !== 24 && item.id !== 21)
            var menu = filterstatus.map(function (cusmaidid) {
              return { label: cusmaidid.name, value: cusmaidid.name };
            });
            this.setState({
              menu_data: menu
            })
          }

        }

      })
      .catch((error) => {
        this.setState({
          loading: false
        })
      });
  }
  fetchtype() {
    typeService.fetchapi()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var categorylist = filterstatus.map(function (cusmaidid) {
            return { label: cusmaidid.name, value: cusmaidid.id.toString() };
          });
          this.setState({
            type_data: categorylist,
          })
        }
        else {
          this.setState({ loading: false })
        }
      })
      .catch((error) => { });
  }
  ClearValue() {
    this.setState({
      menu: '',
      user_id: '',
      start_time: '',
      end_time: '',
      page: 1,
      pageSize: 25,
      total: 0,
      data: [],
      tlcomments: '',
      modalId: '',
      team_id: '',
      user_data: [],
    })

    // this.fetchPagination(1,25,'','','','')
  }
  fetchPagination(page, per_page, start_time, end_time, menu, user_id, user_data) {
    const { username } = this.props;
    const { downloadNpdata, category_data } = this.state;
    const userLevel = localStorage.getItem("userLevel");

    console.log("userLevel:", userLevel);
    console.log("username:", username);

    // Check if userLevel is "1" or "5" and assign username to user_data
    if (userLevel === "1" || userLevel === "5") {
      user_data = [username];
    }

    console.log("user_data after assignment:", user_data);

    this.setState({
      loading: true,
    });

    nonproductivityService.fetchpaginationapi(page, per_page, start_time, end_time, menu, user_id, user_data)
      .then((res) => {
        this.setState({
          loading: false,
          selectedRowKeys: [],
          page: page,
          pageSize: per_page,
        });
        console.log("rajkumar", res.data)

        const npdata = res.data.map(productivityData => ({
          UserId: productivityData.user_id,
          Date: productivityData.date,
          Week: productivityData.week,
          Type: productivityData.type,
          Category: getValue(category_data, 'value', 'label', productivityData.category),
          StartTime: productivityData.start_time,
          EndTime: productivityData.end_time,
          Status: productivityData.approval_status === 1 ? "Approved" : productivityData.approval_status === 2 ? "Rejected" : "Pending",
          TLComments: productivityData.tlcomments,
          Description: productivityData.description.replace(/\r?\n|\r/g, ' '),
        }));




        if (res.status) {
          this.setState({
            data: res.data,
            total: res.total,
            downloadNpdata: npdata
          });
        } else {
          this.setState({
            data: [],
            page: 1,
            pageSize: 25,
            total: 0,
          });
        }
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
      });
  }


  fetchcategory() {
    categoryService.fetchapi()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)

          var categorylist = filterstatus.map(function (cusmaidid) {
            return { label: cusmaidid.name, value: cusmaidid.id.toString() };
          });
          var timelimitlist = filterstatus.map(function (cusmaidids) {
            return { label: cusmaidids.time_limit, value: cusmaidids.id.toString() };
          });
          this.setState({
            category_data: categorylist,
            timelimit_data: timelimitlist,
          })
        }
        else {
          this.setState({ loading: false })
        }
      })
      .catch((error) => { });
  }
  approveAPI(id, status) {
    console.log("rajkumar", id)
    console.log("rajkumar", status)
    const { username } = this.props;
    const { tlcomments } = this.state;
    if (tlcomments === '') {
      createNotification('Please Fill the Comments', 'error', 'filled');
    } else {


      const requestData = [{
        id: id,
        approval_status: status,
        approval_userid: username,
        tlcomments: tlcomments
      }];
      console.log("testss", requestData);
      nonproductivityService.approveapi(requestData)
        .then((res) => {
          if (res.status) {
            createNotification('Success', 'success', 'filled');
            this.setState({ isModalOpen: false });
            this.fetchData();
          } else {
            createNotification('Failed to approve item', 'error', 'filled');
          }
        })
        .catch((error) => {
          createNotification('Failed to approve item', 'error', 'filled');
        });
    }
  }
  fetchData() {
    const { page, pageSize, start_time, end_time, menu, user_id, user_data } = this.state
    this.fetchPagination(page, pageSize, start_time, end_time, menu, user_id, user_data)
  }


  handleDelete = id => {
    nonproductivityService.deleteapi(id)
      .then((res) => {
        if (res.status) {
          createNotification('Deleted', 'success', 'filled')
          this.fetchData()
        }
      })
      .catch((error) => { });
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
      const { start_time, end_time, menu, user_id, user_data } = this.state
      this.fetchPagination(page, pageSize, start_time, end_time, menu, user_id, user_data)
    },
    pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
    // total: this.state.total  ,
    showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total}`,
  };
  onSelectChangeHeader = () => {
    const { selectedRowKeys, data } = this.state
    var list = [...selectedRowKeys]
    if (list.length > 0) {
      list = []
    }
    else {
      for (var i = 0; i < data.length; i++) {
        if (data[i].approval_status === 0 && data[i].end_time !== '' && data[i].end_time !== null) {
          list.push(data[i].id)
        }

      }
    }
    this.setState({ selectedRowKeys: list });
  };
  onSelectChange = id => {
    const { selectedRowKeys } = this.state
    var list = [...selectedRowKeys]
    if (list.includes(id)) {
      list = list.filter(option => option !== id)
    }
    else {
      list.push(id)
    }
    this.setState({ selectedRowKeys: list });
  };
  onChangeTeam(value) {
    this.setState({ team_id: value, startdate: '', enddate: '' })
    this.fetchUserData([value])
  }
  onSearch() {
    const { start_time, end_time, menu, user_id, user_data, team_id } = this.state
    var isfill = false, is_date = true
    if (start_time !== '' && end_time !== '' && (user_id !== '' || team_id !== '')) {
      // Mandatory fields are filled
      is_date = true;
      isfill = true;

      if (menu !== '' || user_data !== '') {
        this.fetchPagination(1, 25, start_time, end_time, menu, user_id, user_data, team_id);
      } else {
        createNotification('Please choose any additional details to search', 'error', 'filled');
      }
    } else {
      // Check for specific missing fields and alert accordingly
      if (start_time === '') {
        createNotification('Please choose start date', 'error', 'filled');
      }
      if (end_time === '') {
        createNotification('Please choose end date', 'error', 'filled');
      }
      if (user_id === '' && team_id === '') {
        createNotification('Please choose either Team or User ID', 'error', 'filled');
      }
    }

  }

  getTime(time) {
    var t_time = ''

    if (time !== null && time && time !== '') {
      var current_d = moment(new Date()).format('MM/DD/YYYY')
      var date_time = current_d + " " + time
      t_time = moment(date_time).format('hh:mm a')

    }
    return t_time
  }
  onSubmit(record) {
    const { id, user_id, category, description, start_time, end_time, menu, date, week, type, approval_status, approval_userid } = record

    if (start_time !== '' && end_time !== '') {


      nonproductivityService.updateapi(id, user_id, category, description, start_time, end_time, menu, date, week, type, approval_status, approval_userid)
        .then((res) => {
          this.setState({
            loading: false
          })
          if (res.status === true) {
            createNotification('Updated', 'success', 'filled')

          } else {
            createNotification(res.message, 'error', 'filled')
          }

        })
        .catch((error) => {
          this.setState({
            loading: false
          })
        });
    }

  }
  onChangeValue_row(value, id, key) {
    const data = [...this.state.data]
    const index = data.findIndex(x => x.id === id)
    if (index >= 0) {
      var isfill = true
      if (key === 'start_time') {
        data[index].end_time = ''
      }
      if (key === 'end_time') {
        const start_time = data[index].start_time
        if (start_time <= value) {
          data[index][key] = value

        }
        else {
          createNotification('End Time Must be bigger then Start Time', 'error', 'filled')
          isfill = false
        }


      }
      if (isfill === true) {
        data[index][key] = value
        this.setState({
          data: data,
          selectedRowKeys: []
        })
        if (key === 'end_time') {
          this.onSubmit(data[index])
        }
      }

    }
  }
  getTimeDifference = (startTime, endTime) => {
    const start = new Date(`1970-01-01T${startTime}:00Z`);
    const end = new Date(`1970-01-01T${endTime}:00Z`);
    const diffMs = end - start;
    const diffMinutes = Math.floor(diffMs / 60000);
    return diffMinutes;
  };
  //   toggleModal = (id, status) => {
  //     // Call approveAPI function here


  //     // Toggle the modal state
  //     this.setState(prevState => ({
  //         isModalOpen: !prevState.isModalOpen,
  //         modalOpen: !prev.modalOpen,
  //         modalId: id // Set the modalId state variable to the id parameter
  //     }));

  //     // this.approveAPI(id, status);
  // }

  toggleCommentsModal = (id, status) => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
      modalId: id,
      modalStatus: status
    }));
  };

  // Toggle for Download modal
  toggleDownloadModal = () => {
    this.ClearValue()
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen
    }));
  };

  toggleCommentsModal = (id, status) => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
      modalId: id,
      modalStatus: status
    }));
  };

  // Toggle for Download modal
  toggleDownloadModal = () => {
    this.ClearValue()
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen
    }));
  };

  fetchDownloadData = async (start_time, end_time, menu, user_id, user_data, team_id) => {
    try {
      const res = await nonproductivityService.fetchpaginationapi(
        1,
        100000,
        start_time,
        end_time,
        menu,
        user_id,
        user_data,
        team_id
      );
      this.ClearValue()
      return res;
    } catch (error) {
      console.error("Error fetching download data:", error);
      return null;
    }
  };
  handleSubmit = async () => {
    const { user_id, user_data, start_time, end_time, menu, team_id } = this.state;

    if (start_time !== '' && end_time !== '' && user_data) {
      try {
        const res = await this.fetchDownloadData(start_time, end_time, menu, user_id, user_data, team_id);

        if (res && res.status) {
          const npdata = res.data.map(productivityData => ({
            UserId: productivityData.user_id,
            Date: productivityData.date,
            Week: productivityData.week,
            Type: productivityData.type,
            Category: getValue(category_data, 'value', 'label', productivityData.category),
            StartTime: productivityData.start_time,
            EndTime: productivityData.end_time,
            Status: productivityData.approval_status === 1 ? "Approved" : productivityData.approval_status === 2 ? "Rejected" : "Pending",
            TLComments: productivityData.tlcomments,
            Description: productivityData.description.replace(/\r?\n|\r/g, ' '),
            AppliedDate: moment(productivityData.created_at).format('DD/MM/YYYY HH:mm:ss'),
            AprovedDate: moment(productivityData.updated_at).format('DD/MM/YYYY HH:mm:ss'),
          }));
          this.setState(
            {
              downloadNpdata: npdata,
            },
            () => {
              if (this.csvLink && this.csvLink.current) {
                this.csvLink.current.link.click();
              }
              this.toggleDownloadModal();
            }
          );
        } else {
          createNotification('No data available for the given filters', 'error', 'filled');
        }
      } catch (err) {
        console.error("Error fetching download data:", err);
        createNotification('Something went wrong while downloading', 'error', 'filled');
      }
    } else {
      createNotification('Please choose any additional details to search', 'error', 'filled');
    }
  };

  render() {
    const { locale, languageData, match } = this.props
    const { data, selectedRowKeys, category_data, type_data, timelimit_data, isModalOpen, tlcomments, modalId, downloadNpdata } = this.state

    const columns = [
      // {
      //   title: () => { 
      //     return <div>
      //         <Checkbox checked = {selectedRowKeys.length > 0}  onChange={()=>this.onSelectChangeHeader()}/ >  
      //     </div>;
      //   } ,
      //   dataIndex: 'id',
      //   key: 'id',
      //   render: (id,record) => (
      //     <div className="row d-flex justify-content-center" >
      //       {(record.approval_status  === 0 &&( record.end_time !== '' &&  record.end_time !== null)) && 
      //           <Checkbox checked = {selectedRowKeys.includes(id)}  onChange={()=>this.onSelectChange(id)}/ >  }

      //       </div>
      //   )

      // },
      {
        title: onChangeLanguage(locale, 'User ID', languageData),
        dataIndex: 'user_id',
        key: 'user_id',

      },
      {
        title: onChangeLanguage(locale, 'Date', languageData),
        dataIndex: 'date',
        key: 'date',
        render: (text, record) => (
          <div className="row d-flex justify-content-center" >
            {moment(text).format('MM/DD/YYYY')}
          </div>
        ),


      },
      {
        title: onChangeLanguage(locale, 'Week', languageData),
        dataIndex: 'week',
        key: 'week',

      },
      // {
      //   title:  onChangeLanguage(locale,'For',languageData),
      //   dataIndex: 'menu',
      //   key: 'menu',

      // },
      {
        title: onChangeLanguage(locale, 'Type', languageData),
        dataIndex: 'type',
        key: 'type',
        sorter: (a, b) => a.type.localeCompare(b.type),
        //   render: (text,record) => (
        //     <div className="row d-flex justify-content-center" >
        //       {getValue(type_data,'value','label',text)}
        //       </div>
        // )

      },
      {
        title: onChangeLanguage(locale, 'Category', languageData),
        dataIndex: 'category',
        key: 'category',
        render: (text, record) => (
          <div className="row d-flex justify-content-center" >
            {getValue(category_data, 'value', 'label', text)}
          </div>
        )

      },
      {
        title: onChangeLanguage(locale, 'Time Limit(min)', languageData),
        dataIndex: 'category',
        key: 'category',
        render: (text, record) => (
          <div className="row d-flex justify-content-center" >
            {getValue(timelimit_data, 'value', 'label', text)}
          </div>
        )

      },
      {
        title: 'Time Taken',
        key: 'time_taken',
        render: (text, record) => {
          const timeLimitStr = getValue(timelimit_data, 'value', 'label', record.category);
          const timeLimit = timeLimitStr ? parseInt(timeLimitStr, 10) : null;
          if (timeLimit === null) {
            return null;
          }

          const timeTaken = record.start_time && record.end_time ? this.getTimeDifference(record.start_time, record.end_time) : 'N/A';

          const cellStyle = timeTaken !== 'N/A' && timeTaken > timeLimit
            ? { backgroundColor: 'red', color: 'white', borderRadius: '5px' }
            : { backgroundColor: 'green', color: 'white', borderRadius: '5px' };

          return (
            <div style={cellStyle}>
              {timeLimit !== 'N/A' ? `${timeTaken} minutes` : 'N/A'}
            </div>
          );
        },
      }
      ,

      {
        title: onChangeLanguage(locale, 'Start Time', languageData),
        dataIndex: 'start_time',
        key: 'start_time',
        render: (text, record) => (
          <div>
            {record.approval_status === 0 ?
              <Input className="fontstyle text-background"
                style={{ margin: '5px' }}
                data-date-format='hh:mm:ss a'
                type="time"
                min="08:00:00"
                value={text}
                onChange={(e) => this.onChangeValue_row(e.target.value, record.id, 'start_time')}
              />
              : this.getTime(text)

            }

          </div>
        ),
      },
      {
        title: onChangeLanguage(locale, 'End Time', languageData),
        dataIndex: 'end_time',
        key: 'end_time',
        render: (text, record) => (
          <div>
            {record.approval_status === 0 ?
              <Input className="fontstyle text-background"
                style={{ margin: '5px' }}
                data-date-format='hh:mm:ss a'
                type="time"
                min="08:00:00"
                value={text}
                onChange={(e) => this.onChangeValue_row(e.target.value, record.id, 'end_time')}
              />
              : this.getTime(text)

            }
          </div>
        ),
      },
      {
        title: onChangeLanguage(locale, 'Applied Date', languageData),
        dataIndex: 'created_at',
        key: 'created_at',
        render: (text, record) => (
          <div className="row d-flex justify-content-center" >
            {moment(text).format('MM/DD/YYYY hh:mm a')}
          </div>
        ),


      },
      {
        title: onChangeLanguage(locale, 'Task Description', languageData),
        dataIndex: 'description',
        key: 'description',
        render: (text, record, index) => (
          <div style={{ padding: '2px', width: '100px' }}>
            <Tooltip className='fontstyle' title={text} placement="bottom">
              <a>{(text && text !== null && text !== '') && (text.length > 25 ? text.substring(1, 25) : text)}</a>
            </Tooltip>

          </div>),
      },
      {
        title: onChangeLanguage(locale, 'Approval Status', languageData),
        dataIndex: 'approval_status',
        key: 'approval_status',
        render: (text, record) => (
          <div className="row d-flex justify-content-center">
            <span style={{ color: text === 1 ? 'green' : 'red', fontWeight: 'bold' }}>
              {text === 1 ? 'Approved' : (text === 2 ? 'Rejected' : '')}
            </span>
          </div>
        )

      },
      {
        title: onChangeLanguage(locale, 'TL Comments', languageData),
        dataIndex: 'tlcomments',
        key: 'tlcomments',
        render: (text, record, index) => (
          <div style={{ padding: '2px', width: '100px' }}>
            <Tooltip className='fontstyle' title={text} placement="bottom">
              <a>{(text && text !== null && text !== '') && (text.length > 25 ? text.substring(1, 25) : text)}</a>
            </Tooltip>

          </div>),
      },
      // {
      //     title: 'Action',
      //     key: 'id',
      //    dataIndex: 'id',
      //     render: (id,record) => (
      //         <div className="row d-flex justify-content-center" >

      //          <Popconfirm className = 'fontstyle' variant="contained" 
      //          title="Are you sure to delete?"
      //          style = {{
      //             backgroundColor: 'rgb(79, 156, 1)',
      //             color: 'white' }}
      //            onConfirm={() => this.handleDelete(record.id)}
      //             >
      //                <Tooltip title="Delete" placement="bottom">
      //          <a style = {{color  :'red' ,height:'25px',width:'25px',
      //                     padding:'4px',marginLeft:'12px'}}><i className = "simple-icon-trash"></i></a></Tooltip>
      //             </Popconfirm>


      //           </div>
      //     )
      // }
      {
        title: 'Action',
        key: 'id',
        dataIndex: 'id',
        render: (id, record) => (
          <div className="row d-flex justify-content-center align-items-center">
            {record.approval_status === 0 &&
              // <Button color="secondary" className="fontstyle button-width" onClick={(event) => this.approveAPI(record.id, 1)} style={{ marginLeft: '12px' }}>
              <Button color="info" className="fontstyle button-width" onClick={() => { this.toggleCommentsModal(record.id, null) }} style={{ marginLeft: '12px' }}>
                {onChangeLanguage(locale, 'Comments', languageData)}
              </Button>
            }
            {/* {record.approval_status !== 2 && 
                          <Button color="primary" className="fontstyle button-width" onClick={(event) => this.approveAPI(record.id, 2)} style={{ marginLeft: '12px' }}>
                              {onChangeLanguage(locale, 'Reject', languageData)}
                          </Button>
                      } */}
            <Popconfirm
              className="fontstyle"
              variant="contained"
              title="Are you sure you want to delete?"
              style={{
                backgroundColor: 'rgb(79, 156, 1)',
                color: 'white'
              }}
              onConfirm={() => this.handleDelete(record.id)}
            >
              <Tooltip title="Delete" placement="bottom">
                <a style={{ color: 'red', height: '25px', width: '25px', padding: '4px', marginLeft: '12px' }}>
                  <i className="simple-icon-trash"></i>
                </a>
              </Tooltip>
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
        <title> {onChangeLanguage(locale, 'Approve Non-Productivity Hours', languageData)}</title>
        <Row>
          <Colxx xxs="12">
            <div className="row">
              <div className="col-md-9">
                <Breadcrumb heading={onChangeLanguage(locale, 'Approve Non-Productivity Hours', languageData)} match={match} />
              </div>
              <div className="col-md-3">
                {/* <Button color = "primary"  className = 'fontstyle button-width' onClick ={(event) => this.approveAPI(2)}>
                            {onChangeLanguage(locale,'Reject',languageData)}
                          </Button>
                        <Button color = "secondary"  className = 'fontstyle button-width' onClick ={(event) => this.approveAPI(1)}>
                        {onChangeLanguage(locale,'Approve',languageData)}
                      </Button> */}
              </div>


            </div>


            <Separator className="separator-margin" />
          </Colxx>
        </Row>
        <div>
          {this.renderSearch()}
        </div>

        <div>
          <Table
            dataSource={data}
            columns={columns}
            // rowSelection={rowSelection}
            pagination={pagination}
            loading={this.state.loading}
            rowKey={record => record.id}
            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
            onChange={this.handleTableChange}
          />
        </div>
        {/* Button to trigger modal */}
        {/* <Button color="primary" onClick={this.toggleModal}>Open Modal</Button> */}

        {/* Modal */}
        <Modal isOpen={isModalOpen} toggle={() => this.toggleCommentsModal(null, null)}>
          <ModalHeader toggle={() => this.toggleCommentsModal(null, null)}>Comments</ModalHeader>
          <ModalBody>
            <Label for="tlcomments">TL Comments</Label>
            <Input type="textarea" name="tlcomments" id="tlcomments" onChange={(e) => this.setState({ tlcomments: e.target.value })} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(event) => this.approveAPI(modalId, 2)}>Reject</Button>
            <Button color="secondary" onClick={() => { this.approveAPI(modalId, 1); }}>Approve</Button>{' '}
          </ModalFooter>
        </Modal>

      </>
    )
  }
  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };
  renderSearch() {
    const { start_time, end_time, menu, user_id, menu_data, team_data, team_id, downloadNpdata, howManyDays, modalOpen } = this.state
    const { locale, languageData } = this.props
    const current_date = moment(new Date()).format('YYYY-MM-DD')
    return (
      <div className="publishuser-card-component" style={{ padding: '10px', borderRadius: '10px', marginBottom: '30px' }}>
        <div className="row">
          {/* <div className="col-lg-2-0 space-margin">
              <Label className="fontstyle normal-font">
                {onChangeLanguage(locale, 'Start Date & Time', languageData)}
              </Label>
              <Input
                className="fontstyle text-background"
                type="datetime-local"
                max={current_date}
                value={start_time}
                onChange={(e) => this.setState({ start_time: e.target.value, end_time: '' })}
              />
            </div>
            <div className="col-lg-2-0 space-margin">
              <Label className="fontstyle normal-font">
                {onChangeLanguage(locale, 'End Date & Time', languageData)}
              </Label>
              <Input
                className="fontstyle text-background"
                type="datetime-local"
                max={current_date}
                min={start_time}
                value={end_time}
                onChange={(e) => this.setState({ end_time: e.target.value })}
              />
            </div> */}

          <Modal isOpen={modalOpen} toggle={this.toggleDownloadModal}>
            <ModalHeader toggle={this.toggleDownloadModal}>Download Non Productivity</ModalHeader>
            <ModalBody>
              <div className="publishuser-card-component" style={{ padding: '10px', borderRadius: '10px', marginBottom: '30px' }}>
                <div className="row">
                  <div className="col-md-12 space-margin">
                    <Label className="fontstyle normal-font">
                      {onChangeLanguage(locale, 'Start Date & Time', languageData)}
                    </Label>
                    <Input
                      className="fontstyle text-background"
                      type="datetime-local"
                      max={current_date}
                      value={start_time}
                      onChange={(e) => this.setState({ start_time: e.target.value, end_time: '' })}
                    />
                  </div>
                  <div className="col-md-12 space-margin">
                    <Label className="fontstyle normal-font">
                      {onChangeLanguage(locale, 'End Date & Time', languageData)}
                    </Label>
                    <Input
                      className="fontstyle text-background"
                      type="datetime-local"
                      max={current_date}
                      min={start_time}
                      value={end_time}
                      onChange={(e) => this.setState({ end_time: e.target.value })}
                    />
                  </div>

                  <div className="col-md-12 space-margin">
                    <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Team', languageData)}<a style={{ color: 'red' }}>*</a></Label>
                    <Select className="react-select fontstyle"
                      classNamePrefix="react-select"
                      name="form-field-name"
                      value={team_data.filter(option => option.value === team_id)}
                      options={team_data}
                      onChange={(option) => this.onChangeTeam(option.value)}
                    />
                  </div>
                  {/* <div className="col-md-12 space-margin">
                  <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'User ID',languageData)}</Label>
                  
                      <Input  className = "fontstyle text-background" type="text"
                        value = {user_id}  
                        onChange= {(e)=>this.setState({user_id : (e.target.value).toLocaleUpperCase()})} 
                      />
              </div> */}
                </div>
              </div>
            </ModalBody>
            <CSVLink
              ref={this.csvLink}
              data={downloadNpdata}
              filename={`Non-Productivity.csv`}
              style={{ display: "none" }} // hidden, triggered programmatically
            />
            {/* {downloadNpdata && downloadNpdata.length > 0 && (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
      <CSVLink
        className="button-width"
        style={{
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          backgroundColor: '#008000',
          cursor: 'pointer',
          fontSize: '14px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '35px',
          width: '150px',
        }}
        data={downloadNpdata}
        filename={`Non-Productivity.csv`}
        onClick={() => {
          // ✅ Close modal after CSV is clicked
          setTimeout(() => {
            this.toggleModal();
          }, 500);
        }}
      >
        <i className="simple-icon-cloud-download" style={{ marginRight: '5px' }} />
        {onChangeLanguage(locale, 'Download', languageData)}
      </CSVLink>
    </div>
  )} */}


            <ModalFooter>
              <Button color="secondary" onClick={this.toggleDownloadModal}>Cancel</Button>
              <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
            </ModalFooter>
          </Modal>
          <div className="col-md-2 space-margin">
            <Label className="fontstyle normal-font">
              {onChangeLanguage(locale, 'Start Date & Time', languageData)}
              <a style={{ color: 'red' }}>*</a>
            </Label>
            <CustomDatePickerTwoWeeks
              value={this.state.start_time}
              onChange={(date) => this.setState({ start_time: date })}
              days={this.state.howManyDays ? parseInt(this.state.howManyDays) : 15}
              className="fontstyle text-background"
            />
          </div>

          <div className="col-md-2 space-margin">
            <Label className="fontstyle normal-font">
              {onChangeLanguage(locale, 'End Date & Time', languageData)}
              <a style={{ color: 'red' }}>*</a>
            </Label>
            <CustomDatePickerTwoWeeks
              value={this.state.end_time}
              onChange={(date) => this.setState({ end_time: date })}
              days={this.state.howManyDays ? parseInt(this.state.howManyDays) : 7}
              className="fontstyle text-background"
            />
          </div>




          {/* <div className = "col-md-2 space-margin">
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'For',languageData)}</Label>
                          
                          <Select  
                            className = "react-select fontstyle"                         
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={menu_data.filter(option =>option.value === menu)}
                            options={menu_data}
                            onChange={({value}) => this.setState({  menu: value})}
                          />
                      </div> */}
          <div className="col-lg-2-0 space-margin"  >
            <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Team', languageData)}<a style={{ color: 'red' }}>*</a></Label>
            <Select className="react-select fontstyle"
              classNamePrefix="react-select"
              name="form-field-name"
              value={team_data.filter(option => option.value === team_id)}
              options={team_data}
              onChange={(option) => this.onChangeTeam(option.value)}
            />
          </div>
          <div className="col-lg-2-0 space-margin">
            <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'User ID', languageData)}</Label>

            <Input className="fontstyle text-background" type="text"
              value={user_id}
              onChange={(e) => this.setState({ user_id: (e.target.value).toLocaleUpperCase() })}
            />
          </div>
          <div className="col-lg-2-0 space-margin" style={{ marginTop: '25px' }}>
            <Button color="primary" className='fontstyle button-width' onClick={(event) => this.onSearch()}>
              {onChangeLanguage(locale, 'Search', languageData)}
            </Button>
            <Button color="secondary" className='fontstyle button-width' onClick={(event) => this.ClearValue()}>
              {onChangeLanguage(locale, 'Refresh', languageData)}
            </Button>
            {/* <Button color = "success"  className = 'fontstyle button-width' onClick ={(event) => this.ClearValue()}>
                            {onChangeLanguage(locale,'Refresh',languageData)}
                          </Button> */}
            {/* {downloadNpdata && downloadNpdata.length > 0 && (
 <CSVLink
 className="button-width"
 style={{
   color: 'white',
   padding: '10px 20px', // Match padding
   border: 'none',
   borderRadius: '5px', // Same border-radius
   backgroundColor: '#008000', // Keep the distinct color
   cursor: 'pointer',
   fontSize: '14px', // Same font size
   display: 'inline-flex',
   alignItems: 'center',
   justifyContent: 'center',
   height: '30px', // Ensure same height
   width: '120px', // Same width
 }}
 data={downloadNpdata}
 filename={`Non-Productivity.csv`}
>
 <i className="simple-icon-cloud-download" style={{ marginRight: '5px' }} />
 {onChangeLanguage(locale, 'Download', languageData)}
</CSVLink>
)} */}
            {/* <button
          className="button-width"
          style={{
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#008000",
            cursor: "pointer",
            fontSize: "14px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            height: "30px",
            width: "120px",
          }}
          onClick={this.toggleModal}
        >
          <i className="simple-icon-cloud-download" style={{ marginRight: "5px" }} />
          {(locale, "Download", languageData)}
        </button> */}
            <button
              className="button-width"
              style={{
                color: 'white',
                padding: '10px 20px', // Match padding
                border: 'none',
                borderRadius: '5px', // Same border-radius
                backgroundColor: '#008000', // Keep the distinct color
                cursor: 'pointer',
                fontSize: '14px', // Same font size
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '30px', // Ensure same height
                width: '120px', // Same width
              }}
              onClick={this.toggleDownloadModal}
            >
              <i className="simple-icon-cloud-download" style={{ marginRight: '5px' }} />
              {onChangeLanguage(locale, 'Download', languageData)}
            </button>

          </div>
          {/* <div className = "col-lg-2-0 space-margin" style= {{marginTop:'25px'}}>
                          <Button color = "primary"  className = 'fontstyle button-width' onClick ={(event) => this.onSearch()}>
                            {onChangeLanguage(locale,'Search',languageData)}
                          </Button>
                          <Button color = "secondary"  className = 'fontstyle button-width' onClick ={(event) => this.ClearValue()}>
                            {onChangeLanguage(locale,'Refresh',languageData)}
                          </Button>
                      </div> */}
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

  })(MasterPage)
);


