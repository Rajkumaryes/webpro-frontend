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
import { caseallocationsService } from '../../../../redux/bookingamendment/caseallocations/saga'
import './index.scss'

class MasterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      start_time: '',
      end_time: '',
      page: 1,
      pageSize: 25,
      total: 0,
      loading: false,
      modalVisible: false,
      modalContent: '',
      modalRowIndex: null,
      consentChecked: false,
      cancelTimers: {}, // Track timers for cancel buttons
      rowTimers: {}, // Add this
    };
    this.cancelIntervals = {};
  }
  componentWillMount() {

  }


  onViewData = (username) => {
    this.setState({ loading: true });
    caseallocationsService.fetchcrm(username) // <-- Pass username here
      .then((res) => {
        if (res && res.status && Array.isArray(res.data)) {
          // Parse case_content for each row and extract Subject and ShortDes
          const parsedData = res.data.map(row => {
            let subject = '';
            let shortDes = '';
            try {
              if (row.case_content) {
                const contentArr = JSON.parse(row.case_content);
                if (Array.isArray(contentArr) && contentArr[0]) {
                  subject = contentArr[0].Subject || '';
                  shortDes = contentArr[0].ShortDes || '';
                } else {
                  subject = row.case_content;
                }
              }
            } catch (e) {
              subject = row.case_content;
            }
            return { ...row, case_subject: subject, case_shortdes: shortDes };
          });
          this.setState({
            data: parsedData,
            total: res.total || parsedData.length,
            loading: false,
          });
        } else {
          createNotification(res.message, 'error', 'filled');
          this.setState({ data: [], loading: false });
        }
      })
      .catch((error) => {
        createNotification('Failed to fetch data', 'error', 'filled');
        this.setState({ data: [], loading: false });
      });
  }


  handleViewShortDes = (content, index) => {
      console.log("content", content)
    this.setState({
      modalVisible: true,
      modalContent: content,
      modalRowIndex: index,
      consentChecked: this.state.data[index]?.consentChecked || false,
    });
  };

  handleConsentChange = (e) => {
    const { modalRowIndex, data } = this.state;
    const newData = [...data];
    newData[modalRowIndex].consentChecked = e.target.checked;
    this.setState({ data: newData, consentChecked: e.target.checked });
  };

  handleModalClose = () => {
    this.setState({ modalVisible: false, modalContent: '', modalRowIndex: null });
  };

  handleSubmitRow = async (index) => {
    const { username } = this.props;
    const row = { ...this.state.data[index] };

    row.user_id = username;
    row.allocation_status = "allocated";

    // Validation
    if (!row.case_status) {
      createNotification('Please select Case Status.', 'error', 'filled');
      return;
    }
    if (!row.consentChecked) {
      createNotification('Please check the consent checkbox.', 'error', 'filled');
      return;
    }
    if (row.case_status === 'roll' && (!row.rollover_count || !row.preferred_dp || !row.preferred_weekdays || !row.preferred_vessel || !row.container_type)) {
      createNotification('Please fill all temporary fields for Roll Over.', 'error', 'filled');
      return;
    }

    if (row.case_status === "roll") {
      row.roll_preferrences = JSON.stringify({
        preferred_dp: row.preferred_dp,
        preferred_vessel: row.preferred_vessel,
        preferred_weekdays: row.preferred_weekdays,
        container_type: row.container_type,
        rollover_count: row.rollover_count
      });
    }

    // Mark as submitting
    const updatedData = [...this.state.data];
    updatedData[index] = { ...row, submitting: true };
    this.setState({ data: updatedData });

    try {
      console.log("raj", row)
      const res = await caseallocationsService.submitRow(row);

      // If using axios → use res.data
      const response = res.data ? res.data : res;

      if (response && response.status) {
        createNotification('Row submitted successfully!', 'success', 'filled');
        updatedData[index] = { ...updatedData[index], submitted: true, submitting: false };
        this.setState({ data: updatedData }, () => this.startCancelTimer(index));
        this.onViewData(username); // Refresh data
      } else {
        createNotification('Submission failed.', 'error', 'filled');
        updatedData[index].submitting = false;
        this.setState({ data: updatedData });
      }
    } catch (error) {
      console.error("Submission error:", error);
      createNotification('Submission error.', 'error', 'filled');
      updatedData[index].submitting = false;
      this.setState({ data: updatedData });
    }
  };



  startCancelTimer = (index) => {
    const cancelTimers = { ...this.state.cancelTimers, [index]: 60 };
    this.setState({ cancelTimers });

    if (this.cancelIntervals[index]) clearInterval(this.cancelIntervals[index]);
    this.cancelIntervals[index] = setInterval(() => {
      this.setState(prevState => {
        const newTimers = { ...prevState.cancelTimers };
        if (newTimers[index] > 0) {
          newTimers[index] -= 1;
        } else {
          clearInterval(this.cancelIntervals[index]);
        }
        return { cancelTimers: newTimers };
      });
    }, 1000);
  };

  handleCancelRow = async (index) => {
    const row = this.state.data[index];
    // Call the same API for cancel (pass a cancel flag if needed)
    try {
      const res = await caseallocationsService.submitRow({ ...row, cancel: true });
      if (res && res.status) {
        createNotification('Row cancelled!', 'success', 'filled');
        // Optionally, remove the row or mark as cancelled
        const newData = [...this.state.data];
        newData[index].cancelled = true;
        this.setState({ data: newData });
      } else {
        createNotification('Cancel failed.', 'error', 'filled');
      }
    } catch (error) {
      createNotification('Cancel error.', 'error', 'filled');
    }
    clearInterval(this.cancelIntervals[index]);
  };

  componentWillUnmount() {
    // Clear all intervals
    Object.values(this.cancelIntervals).forEach(clearInterval);
  }

  render() {
    const { locale, languageData, match, username } = this.props;
    const { modalVisible, modalContent, consentChecked, modalRowIndex, data, cancelTimers, loading } = this.state;


    const caseStatusOptions = [
      { value: 'cancel', label: 'Cancel' },
      { value: 'roll', label: 'Roll Over' },
      { value: 'increase', label: 'Increase' },
    ];

    const columns = [
      {
        title: onChangeLanguage(locale, 'Shipment Number', languageData),
        dataIndex: 'shipment_number',
        key: 'shipment_number',
        width: 130,
        align: 'middle',
        ellipsis: true,
      },
      {
        title: onChangeLanguage(locale, 'Case Number', languageData),
        dataIndex: 'case_number',
        key: 'case_number',
        width: 130,
        align: 'middle',
        ellipsis: true,
      },
      {
        title: onChangeLanguage(locale, 'Case Subject', languageData),
        dataIndex: 'case_subject',
        key: 'case_subject',
        width: 250,
        align: 'middle',
        ellipsis: true,
        render: (text) => (
          <Tooltip title={text}>
            <span>{text || '-'}</span>
          </Tooltip>
        ),
      },
      {
        title: onChangeLanguage(locale, 'Short Description', languageData),
        dataIndex: 'case_shortdes',
        key: 'case_shortdes',
        width: 250,
        align: 'middle',
        ellipsis: true,
        render: (text, record, index) => (
          <Button color="info" size="sm" onClick={() => this.handleViewShortDes(text, index)}>
            View
          </Button>
        ),
      },
      {
        title: (
          <span>
            {onChangeLanguage(locale, 'Case Status', languageData)}
            <span style={{ color: 'red' }}> *</span>
          </span>
        ),
        dataIndex: 'case_status',
        key: 'case_status',
        width: 180,
        align: 'middle',
        render: (text, record, index) => (
          <div className="custom-select-cell">
            <Select
              value={caseStatusOptions.find(opt => opt.value === text) || null}
              options={caseStatusOptions}
              onChange={option => {
                const newData = [...this.state.data];
                newData[index].case_status = option.value;
                if (option.value === 'roll') {
                  newData[index].rollover_count = newData[index].rollover_count || '';
                  newData[index].preferred_dp = newData[index].preferred_dp || '';
                  newData[index].preferred_weekdays = newData[index].preferred_weekdays || '';
                  newData[index].preferred_vessel = newData[index].preferred_vessel || '';
                  newData[index].container_type = newData[index].container_type || '';
                }
                this.setState({ data: newData });
              }}
              className="react-select"
              classNamePrefix="react-select"
              placeholder="Select Status"
              menuPortalTarget={document.body}
              menuPosition="fixed"
              menuPlacement="auto"
              styles={{
                container: base => ({
                  ...base,
                  minWidth: 120,
                  maxWidth: 180,
                  width: '100%',
                  margin: 0,
                  padding: 0,
                  alignItems: 'center',
                }),
                control: base => ({
                  ...base,
                  minHeight: 36,
                  fontSize: 14,
                  borderRadius: 4,
                  borderColor: '#ced4da',
                  boxShadow: 'none',
                  margin: 0,
                  alignItems: 'center',
                }),
                valueContainer: base => ({
                  ...base,
                  padding: '0 8px',
                  alignItems: 'center',
                }),
                indicatorsContainer: base => ({
                  ...base,
                  height: 36,
                  alignItems: 'center',
                }),
                menuPortal: base => ({
                  ...base,
                  zIndex: 9999,
                }),
                menu: base => ({
                  ...base,
                  marginTop: 0,
                  zIndex: 9999,
                }),
              }}
            />
            {text === 'roll' && (
              <div style={{
                marginLeft: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%'
              }}>
                <Input
                  placeholder="Roll Count"
                  value={record.rollover_count || ''}
                  onChange={e => {
                    const newData = [...this.state.data];
                    newData[index].rollover_count = e.target.value;
                    this.setState({ data: newData });
                  }}
                  style={{ marginBottom: 3, marginTop: 2, fontSize: 12, height: 28, width: 130, maxWidth: '100%' }}
                />
                <Input
                  placeholder="Preferred DP"
                  value={record.preferred_dp || ''}
                  onChange={e => {
                    const newData = [...this.state.data];
                    newData[index].preferred_dp = e.target.value;
                    this.setState({ data: newData });
                  }}
                  style={{ marginBottom: 3, fontSize: 12, height: 28, width: 130, maxWidth: '100%' }}
                />
                <Input
                  placeholder="Weekdays"
                  value={record.preferred_weekdays || ''}
                  onChange={e => {
                    const newData = [...this.state.data];
                    newData[index].preferred_weekdays = e.target.value;
                    this.setState({ data: newData });
                  }}
                  style={{ marginBottom: 3, fontSize: 12, height: 28, width: 130, maxWidth: '100%' }}
                />
                <Input
                  placeholder="Vessel"
                  value={record.preferred_vessel || ''}
                  onChange={e => {
                    const newData = [...this.state.data];
                    newData[index].preferred_vessel = e.target.value;
                    this.setState({ data: newData });
                  }}
                  style={{ marginBottom: 3, fontSize: 12, height: 28, width: 130, maxWidth: '100%' }}
                />
                <Input
                  placeholder="Container Type"
                  value={record.container_type || ''}
                  onChange={e => {
                    const newData = [...this.state.data];
                    newData[index].container_type = e.target.value;
                    this.setState({ data: newData });
                  }}
                  style={{ marginBottom: 3, fontSize: 12, height: 28, width: 130, maxWidth: '100%' }}
                />

              </div>
            )}
          </div>
        ),
      },
      {
        title: onChangeLanguage(locale, 'Allocation Status', languageData),
        dataIndex: 'allocation_status',
        key: 'allocation_status',
        width: 160,
        align: 'center',
        render: (text) => text || '-',
      },
      {
        title: onChangeLanguage(locale, 'Timer', languageData),
        key: 'timer',
        width: 120,
        align: 'center',
        render: (text, record) => {
          if (!record.allocation_date) return '-';
          const now = moment();
          const rowTime = moment(record.allocation_date);
          const duration = moment.duration(now.diff(rowTime));
          const hours = Math.floor(duration.asHours());
          const minutes = duration.minutes();
          const seconds = duration.seconds();
          return `${hours}h ${minutes}m ${seconds}s`;
        }
      },
      {
        title: onChangeLanguage(locale, 'Action', languageData),
        key: 'action',
        width: 120,
        align: 'center',
        render: (text, record, index) => (
          <Button
            color="success"
            size="sm"
            disabled={
              !record.case_status ||                // Case Status must be selected
              !record.case_shortdes ||              // Short Description must exist
              !record.consentChecked ||             // Consent must be checked for this row
              record.submitting ||                  // Prevent double submit
              record.submitted ||                   // Already submitted
              (record.case_status === 'roll' &&     // If Roll Over, all temp fields required
                (!record.rollover_count || !record.preferred_dp || !record.preferred_weekdays || !record.preferred_vessel || !record.container_type))
            }
            onClick={() => this.handleSubmitRow(index)}
          >
            Submit
          </Button>
        ),
      },
      {
        title: onChangeLanguage(locale, 'Cancel', languageData),
        key: 'cancel',
        width: 150,
        align: 'center',
        render: (text, record, index) =>
          record.submitted && !record.cancelled && cancelTimers[index] > 0 ? (
            <Button
              color="danger"
              size="sm"
              onClick={() => this.handleCancelRow(index)}
              disabled={cancelTimers[index] === 0}
            >
              Cancel ({cancelTimers[index]}s)
            </Button>
          ) : record.cancelled ? (
            <span style={{ color: 'red' }}>Cancelled</span>
          ) : null,
      },
      {
        title: onChangeLanguage(locale, 'Consent', languageData),
        key: 'consent',
        width: 100,
        align: 'center',
        render: (text, record) =>
          record.consentChecked ? (
            <span style={{ color: 'green', fontWeight: 600 }}>✔</span>
          ) : (
            <span style={{ color: 'red', fontWeight: 600 }}>✖</span>
          ),
      },
    ];

    const pagination = {
      ...this.paginationOptions,
      total: this.state.total,
      current: this.state.page,
      pageSize: this.state.pageSize,
    };
    const showTable = data && data.length > 0;
    return (
      <>
        <title> {onChangeLanguage(locale, 'Case Allocations', languageData)}</title>
        <Row>
          <Colxx xxs="12">
            <div className="row">
              <div className="col-md-12">
                <Breadcrumb heading={onChangeLanguage(locale, 'Case Allocations', languageData)} match={match} />
                {/* <h2 style={{margin: '16px 0 8px 0', fontWeight: 700}}>Case Allocations</h2> */}
              </div>
            </div>
            <Separator className="separator-margin" />
          </Colxx>
        </Row>


        <div className="row" style={{ marginBottom: '15px' }}>
          <div className="col-md-12">
            <Button color="primary" onClick={() => this.onViewData(this.props.username)} disabled={this.state.loading || (this.state.data && this.state.data.length > 0)}>
              {onChangeLanguage(locale, 'View Data', languageData)}
            </Button>
          </div>
        </div>

        {showTable && (
          <div className="row">
            <div className="col-md-12">
              <div style={{ width: '100%', overflowX: 'auto' }}>
                <Table
                  columns={columns}
                  dataSource={data}
                  loading={loading}
                  rowKey="id"
                  pagination={{
                    pageSize: this.state.pageSize,
                    current: this.state.page,
                    total: this.state.total,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '25', '50', '100'],
                    onChange: (page, pageSize) => this.setState({ page, pageSize }),
                  }}
                  scroll={{ x: 'max-content' }}
                  rowClassName={record =>
                    record.submitting ? 'table-row-fade' : record.submitted ? 'table-row-faded' : ''
                  }
                />
              </div>
            </div>
          </div>
        )}

        {/* Modal for Short Description */}
        <Modal isOpen={modalVisible} toggle={this.handleModalClose}>
          <ModalHeader toggle={this.handleModalClose}>
            {onChangeLanguage(locale, 'Short Description', languageData)}
          </ModalHeader>
          <ModalBody>
            <div style={{
              whiteSpace: 'pre-line',
              fontSize: '16px',
              color: '#333',
              marginBottom: '20px',
              background: '#f8f9fa',
              borderRadius: '8px',
              padding: '12px'
            }}>
              {modalContent}
            </div>
            <div style={{ marginTop: 16 }}>
              <Checkbox
                checked={consentChecked}
                onChange={this.handleConsentChange}
                disabled={modalRowIndex === null}
              >
                {onChangeLanguage(locale, 'I have read and understood the content', languageData)}
              </Checkbox>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.handleModalClose}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
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

/*
.table-row-fade {
  opacity: 0.5;
  pointer-events: none;
}
.table-row-faded {
  opacity: 0.3;
  pointer-events: none;
}
*/


