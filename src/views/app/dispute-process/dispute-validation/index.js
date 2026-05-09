import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label, Input, Button } from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import {
  onChangeLanguage, getCurrentWeek, getTimeDifference, getValue, convertLocalToUTCDate,
  convertUTCToLocalDate
} from '../../../../helper'
import { GetReceviedTime } from '../../../../helper'
import moment from 'moment';
import { createNotification } from '../../../../toast';
import { disputevalidationService } from '../../../../redux/Dispute-process/disputevalidation/saga';
import { DisputeinputService } from '../../../../redux/projectmasters/diputemaster/disputeinput/saga';
import DatePickerDate from "../datePicker";
import { areaService } from '../../../../redux/Dispute-process/area/saga';
import { DisputestatusService } from '../../../../redux/projectmasters/diputemaster/diputevalitationstatus/saga'
import Workbook from 'react-excel-workbook'
import CustomRadioButton from '../../../RadioButton'
import Loading from "react-fullscreen-loading";

class QueryResolveSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      last_changed: '',
      data: [],
      statusdata: [],
      dispute_validity: '',
      loading: false,
      is_submit: false,
      isSubmitting: false,
      start_time: new Date(),
      end_time: '',
      updated_start_time: new Date(),
      disputevalidationcount: '',
      disputevalidationcountlast: '',
      region: '',
      area: '',
      areadata: [],
      disputevaliditydata: [],
      dispute_id: '',
      dispute_type: '',
      charge_type: '',
      capture_date: '',
      followup_with: '',
      followup_with_username: '',
      comments: '',
      isFollowupRequired: false  // ✅ Track in state so it's consistent everywhere
    };
  }

  componentWillMount() {
    this.fetchValidationCount()
    this.fetcharea()
    this.fetchvalidationstatus()
  }

  fetchValidationCount() {
    this.setState({ loading: true })
    const { username } = this.props
    disputevalidationService.fetchdisputevalidationCount(username)
      .then((res) => {
        if (res.status) {
          this.setState({
            disputevalidationcount: res.data,
            disputevalidationcountlast: res.lastcount,
            loading: false
          })
        } else {
          this.setState({ loading: false })
        }
      })
      .catch((error) => {
        this.setState({ loading: false })
      });
  }

  fetcharea() {
    this.setState({ loading: true })
    areaService.fetcharea()
      .then((res) => {
        this.setState({ loading: false })
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var typelist = filterstatus.map(function (typename) {
            return { label: typename.name, value: (typename.id).toString(), region: typename.region };
          });
          this.setState({ areadata: typelist })
        }
      })
      .catch((error) => {
        this.setState({ loading: false })
      });
  }

  fetchvalidationstatus() {
    this.setState({ loading: true })
    DisputestatusService.fetchDisputestatus()
      .then((res) => {
        this.setState({ loading: false })
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var typelist = filterstatus.map(function (typename) {
            return { label: typename.name, value: (typename.id).toString() };
          });
          this.setState({ statusdata: typelist })
        }
      })
      .catch((error) => {
        this.setState({ loading: false })
      });
  }

  clearvalue() {
    this.setState({
      start_time: new Date(),
      end_time: '',
      dispute_validity: '',
      result_code: '',
      internal_result: '',
      action_request: '',
      status: '',
      last_changed: '',
      rec_org: '',
      receiver: '',
      request: '',
      last_changedusername: '',
      last_changeddate: '',
      last_changetime: '',
      diputeinput: '',
      document: '',
      input: '',
      dispute: '',
      country: '',
      area: '',
      loading: false,
      is_submit: false,
      isSubmitting: false,
      followup_with: '',
      followup_with_username: '',
      comments: '',
      dispute_id: '',
      dispute_type: '',
      charge_type: '',
      capture_date: '',
      region: '',
      updated_start_time: new Date(),
      isFollowupRequired: false  // ✅ Reset followup required on clear
    })
  }

  handlechangearea = (selectedOptions) => {
    const { areadata } = this.state;
    let regionname = getValue(areadata, 'value', 'region', selectedOptions.value);
    this.setState({
      area: selectedOptions.value,
      region: regionname,
    });
  }

  // ✅ Key fix: derive isFollowupRequired by label and store in state
  handleStatusChange = ({ value }) => {
    const { statusdata } = this.state;
    const selectedStatus = statusdata.find(option => option.value === value);
    const selectedStatusLabel = selectedStatus ? selectedStatus.label.toLowerCase().trim() : '';
    const isFollowupRequired = selectedStatusLabel !== 'completed';

    if (!isFollowupRequired) {
      // Status is 'completed' — clear followup fields, not mandatory
      this.setState({
        status: value,
        isFollowupRequired: false,
        followup_with: '',
        followup_with_username: '',
        is_submit: false
      });
    } else {
      // Status is NOT 'completed' — followup fields are mandatory
      this.setState({
        status: value,
        isFollowupRequired: true,
        is_submit: false
      });
    }
  }

  onSubmit() {
    const {
      region, area, dispute_id, dispute_type, dispute_validity, status,
      start_time, capture_date, followup_with, followup_with_username,
      charge_type, comments, updated_start_time, statusdata, isFollowupRequired
    } = this.state
    const { username } = this.props

    // ✅ Use state-based isFollowupRequired (consistent with render and handleStatusChange)
    const isFollowupValid = !isFollowupRequired || (followup_with !== '' && followup_with_username !== '');

    if (
      area !== '' &&
      dispute_id !== '' &&
      dispute_type !== '' &&
      capture_date !== '' &&
      dispute_validity !== '' &&
      charge_type !== '' &&
      status !== '' &&
      isFollowupValid
    ) {
      this.setState({ loading: true, isSubmitting: true, is_submit: false })

      const end_time = moment(new Date()).format('hh:mm:ss a');
      let updatedstarttime = convertLocalToUTCDate(updated_start_time),
        updated_end_time = convertLocalToUTCDate(new Date())

      disputevalidationService.createapi(
        username, region, area, dispute_id, dispute_type, capture_date,
        dispute_validity, status, followup_with, followup_with_username,
        charge_type, comments, start_time, end_time, updatedstarttime, updated_end_time
      )
        .then((res) => {
          this.setState({
            end_time: new Date(),
            loading: false,
            isSubmitting: false
          })
          if (res.status) {
            createNotification('Created', 'success', 'filled')
            this.clearvalue()
            this.fetchValidationCount()
          } else {
            createNotification(res.message, 'error', 'filled');
          }
        })
        .catch((error) => {
          this.setState({ loading: false, isSubmitting: false })
        });
    } else {
      this.setState({
        is_submit: true,
        isSubmitting: false
      })

      if (status !== '' && !isFollowupValid) {
        createNotification('Please fill Followup With and Followup Username as status is not Completed', 'error', 'filled')
      } else {
        createNotification('Please fill all mandatory fields', 'error', 'filled')
      }
    }
  }

  render() {
    const {
      loading, start_time, end_time, dispute_validity, disputevalidationcount,
      disputevalidationcountlast, statusdata, is_submit, areadata, area, dispute_id,
      dispute_type, charge_type, capture_date, status, comments,
      followup_with, followup_with_username,
      isFollowupRequired  // ✅ Get from state, not computed in render
    } = this.state
    const { match, languageData, locale, username } = this.props

    const disputevaliditydata = [
      { label: onChangeLanguage(locale, 'Valid', languageData), value: 'Valid' },
      { label: onChangeLanguage(locale, 'Invalid', languageData), value: 'Invalid' },
      { label: onChangeLanguage(locale, 'Not Yet Valid', languageData), value: 'Not Yet Valid' }
    ]

    const followupwithdata = [
      { label: onChangeLanguage(locale, 'Customer', languageData), value: 'Customer' },
      { label: onChangeLanguage(locale, 'QSC', languageData), value: 'QSC' },
      { label: onChangeLanguage(locale, 'Sales', languageData), value: 'Sales' },
      { label: onChangeLanguage(locale, 'ED', languageData), value: 'ED' },
      { label: onChangeLanguage(locale, 'IDT', languageData), value: 'IDT' },
      { label: onChangeLanguage(locale, 'GCC', languageData), value: 'GCC' },
      { label: onChangeLanguage(locale, 'TD', languageData), value: 'TD' },
      { label: onChangeLanguage(locale, 'Overseas', languageData), value: 'Overseas' },
      { label: onChangeLanguage(locale, 'BA', languageData), value: 'BA' },
      { label: onChangeLanguage(locale, 'Others', languageData), value: 'Others' },
    ]

    return (
      <>
        <title>{onChangeLanguage(locale, 'Dispute Validation & Settlement', languageData)}</title>
        <Row>
          <Colxx xxs="12">
            <div className="row">
              <div className="col-md-8">
                <Breadcrumb heading={onChangeLanguage(locale, 'Dispute Validation & Settlement', languageData)} match={match} />
              </div>
              <div className="col-md-2">
                <h2 style={{ marginTop: '15px' }}>Total EQ : {disputevalidationcount}</h2>
              </div>
              <div className="col-md-2">
                <h2 style={{ marginTop: '15px' }}>Last EQ : {disputevalidationcountlast}</h2>
              </div>
            </div>
            <Separator className="separator-margin" />
          </Colxx>
        </Row>

        {loading &&
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }

        <div>
          <div className="publishuser-card-component" style={{ borderRadius: '10px', marginBottom: '30px' }}>
            <div className="row" style={{ padding: '10px' }}>

              <div className="col-md-3 space-margin">
                <Label className="fontstyle normal-font">
                  <a style={{ fontWeight: 700 }}>{onChangeLanguage(locale, 'User ID', languageData)}</a>
                  <br />
                  {username}
                </Label>
              </div>

              <div className="col-md-3 space-margin">
                <Label className="fontstyle normal-font">
                  <a>{onChangeLanguage(locale, 'Start Date Time', languageData)}</a>
                  <br />
                  {moment(start_time).format('MM/DD/YYYY hh:mm:ss a')}
                </Label>
              </div>

              <div className="col-md-3 space-margin">
                <Label className="fontstyle normal-font">
                  <a>{onChangeLanguage(locale, 'End Date Time', languageData)}</a>
                  <br />
                  {end_time !== '' && moment(end_time).format('MM/DD/YYYY hh:mm:ss a')}
                </Label>
              </div>

              <div className="col-md-3 space-margin">
                <Label className="fontstyle normal-font">
                  {onChangeLanguage(locale, 'Area', languageData)}
                  <a style={{ color: 'red' }}>*</a>
                </Label>
                <Select
                  className={is_submit && area === '' ? "error-border-select-paste" : "react-select fontstyle"}
                  classNamePrefix="react-select"
                  name="form-field-name"
                  value={areadata.filter(option => option.value === area)}
                  options={areadata}
                  onChange={this.handlechangearea}
                />
              </div>

              <div className="col-md-3 space-margin">
                <Label className="fontstyle normal-font">
                  {onChangeLanguage(locale, 'Dispute ID', languageData)}
                  <a style={{ color: 'red' }}>*</a>
                </Label>
                <Input
                  className={is_submit && dispute_id === '' ? "error-border" : "fontstyle text-background"}
                  value={dispute_id}
                  onChange={(e) => this.setState({ dispute_id: e.target.value })}
                />
              </div>

              <div className="col-md-3 space-margin">
                <Label className="fontstyle normal-font">
                  {onChangeLanguage(locale, 'Dispute Type', languageData)}
                  <a style={{ color: 'red' }}>*</a>
                </Label>
                <Input
                  className={is_submit && dispute_type === '' ? "error-border" : "fontstyle text-background"}
                  value={dispute_type}
                  onChange={(e) => this.setState({ dispute_type: e.target.value })}
                />
              </div>

              <div className="col-md-3 space-margin">
                <Label className="fontstyle normal-font">
                  {onChangeLanguage(locale, 'Capture Date', languageData)}
                  <a style={{ color: 'red' }}>*</a>
                </Label>
                <DatePickerDate
                  selected={capture_date ? new Date(capture_date) : null}
                  className={is_submit && capture_date === '' ? "error-border" : "fontstyle text-background"}
                  onChange={(date) => this.setState({ capture_date: date ? new Date(date) : '' })}
                />
              </div>

              <div className="col-md-3 space-margin">
                <Label className="fontstyle normal-font">
                  {onChangeLanguage(locale, 'Charge Type', languageData)}
                  <a style={{ color: 'red' }}>*</a>
                </Label>
                <Input
                  className={is_submit && charge_type === '' ? "error-border" : "fontstyle text-background"}
                  value={charge_type}
                  onChange={(e) => this.setState({ charge_type: e.target.value })}
                />
              </div>

              <div className="col-md-3 space-margin">
                <Label className="fontstyle normal-font">
                  {onChangeLanguage(locale, 'Dispute Validity', languageData)}
                  <a style={{ color: 'red' }}>*</a>
                </Label>
                <Select
                  className={is_submit && dispute_validity === '' ? "error-border-select-paste" : "react-select fontstyle"}
                  classNamePrefix="react-select"
                  name="form-field-name"
                  value={disputevaliditydata.filter(option => option.value === dispute_validity)}
                  options={disputevaliditydata}
                  onChange={({ value }) => this.setState({ dispute_validity: value })}
                />
              </div>

              <div className="col-md-3 space-margin">
                <Label className="fontstyle normal-font">
                  {onChangeLanguage(locale, 'Status', languageData)}
                  <a style={{ color: 'red' }}>*</a>
                </Label>
                <Select
                  className={is_submit && status === '' ? "error-border-select-paste" : "react-select fontstyle"}
                  classNamePrefix="react-select"
                  name="form-field-name"
                  value={statusdata.filter(option => option.value === status)}
                  options={statusdata}
                  onChange={this.handleStatusChange}
                />
              </div>

              {/* ✅ Followup fields use isFollowupRequired from state */}
              <div className="col-md-3 space-margin">
                <Label className="fontstyle normal-font">
                  {onChangeLanguage(locale, 'Followup With', languageData)}
                  {isFollowupRequired && <a style={{ color: 'red' }}>*</a>}
                </Label>
                <Select
                  className={is_submit && isFollowupRequired && followup_with === '' ? "error-border-select-paste" : "react-select fontstyle"}
                  classNamePrefix="react-select"
                  name="form-field-name"
                  value={followupwithdata.filter(option => option.value === followup_with)}
                  options={followupwithdata}
                  onChange={({ value }) => this.setState({ followup_with: value })}
                />
              </div>

              <div className="col-md-3 space-margin">
                <Label className="fontstyle normal-font">
                  {onChangeLanguage(locale, 'Followup With Username', languageData)}
                  {isFollowupRequired && <a style={{ color: 'red' }}>*</a>}
                </Label>
                <Input
                  className={is_submit && isFollowupRequired && followup_with_username === '' ? "error-border" : "fontstyle text-background"}
                  value={followup_with_username}
                  onChange={(e) => this.setState({ followup_with_username: e.target.value })}
                />
              </div>

              <div className="col-md-3 space-margin">
                <Label className="fontstyle normal-font">Comments</Label>
                <textarea
                  className="fontstyle textarea-background"
                  placeholder=''
                  value={comments}
                  onChange={(e) => this.setState({ comments: e.target.value })}
                />
              </div>

            </div>

            <div className="row text-center" style={{ margin: '0px 5px' }}>
              <Button
                className="button-width"
                color="primary"
                onClick={() => this.onSubmit()}
              >
                {onChangeLanguage(locale, 'Save', languageData)}
              </Button>

              <Button
                className="button-width"
                color="secondary"
                onClick={() => this.clearvalue()}
              >
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale, languageData, username } = settings;
  return { locale, languageData, username };
};

export default withRouter(
  connect(mapStateToProps, {})(QueryResolveSheet)
);