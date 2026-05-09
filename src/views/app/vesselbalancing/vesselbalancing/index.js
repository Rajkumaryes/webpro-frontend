import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label, Input, Button } from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { onChangeLanguage, convertLocalToUTCDate, getValue } from '../../../../helper'
import Select from 'react-select';
import moment from 'moment';
import { emailhandlingService } from '../../../../redux/bookingprocess/emailhandling/saga'
import { createNotification } from '../../../../toast';
import { activityService } from '../../../../redux/vesselbalancing/activity/saga'
import { statusofcaseService } from '../../../../redux/vesselbalancing/statusofcase/saga';
import Workbook from 'react-excel-workbook'
import { getValue_emailhandling } from '../../pasteData'
import * as clipboard from 'clipboard-polyfill/text'
import { Table, Checkbox } from 'antd';
import { regionService } from '../../../../redux/region/saga'
import { areaService } from '../../../../redux/area/saga';
import { teamsService } from '../../../../redux/teams/saga';
import { vesselbalancingService } from '../../../../redux/vesselbalancing/vesselbalancing/saga';

class QueryResolveSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      from: '',
      user_id: '',
      shipment_no: "",
      start_date: '',
      end_date: '',
      request_type: '',
      no_of_shipment: '',
      subject: '',
      comments: '',
      region: '',
      area: '',
      sub_area: '',
      received_date_time: '',
      cargo_type: '',
      activity: '',
      activity_data: [],
      statusofcase: '',
      statusofcase_data: [],
      searchdata: [],
      team_data: [],
      teamdata: [],
      areadata: [],
      area_data: [],
      regiondata: [],
      cargotypedata: [],
      is_submit: false,
      is_search: false,
      loading: false,
      updated_start_time: new Date(),
      tableindex: 0,
      tabledata: [],
      isDataPasted: false,
      vbcount: '',
      vbcountlast: '',
      dp_voyage: '',
      port: '',
      activity: '',
      buttonDisabled: false
    }

  }

  componentDidMount() {

    this.setState({
      start_date: moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
    })
    this.fetchactivity()
    this.fetchstatusofcase()
    this.fetchregion()
    this.fetcharea()
    this.fetchteam()
    this.fetchVBCount()
  }
  fetchVBCount() {
    this.setState({ loading: true })
    const { username } = this.props
    vesselbalancingService.fetchvbcount(username)
      .then((res) => {
        if (res.status) {
          let filterstatus = res.data;
          let lastdata = res.lastcount;
          this.setState({
            vbcount: filterstatus,
            vbcountlast: lastdata
          })
        }
        else {
          this.setState({ loading: false })
        }
      })
      .catch((error) => { });
    this.setState({ loading: false })

  }
  fetchactivity() {
    this.setState({ loading: true })
    activityService.fetchactivity()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var requestlist = filterstatus.map(function (response) {
            return { label: response.name, text: response.name, value: response.id.toString() };
          });
          this.setState({
            activity_data: requestlist
          })

        }
        else {
          this.setState({ loading: false })
        }
      })
      .catch((error) => { });
    this.setState({ loading: false })
  }
  fetchstatusofcase() {
    this.setState({ loading: true })
    statusofcaseService.fetchstatusofcase()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var requestlist = filterstatus.map(function (response) {
            return { label: response.name, text: response.name, value: response.id.toString() };
          });
          this.setState({
            statusofcase_data: requestlist
          })

        }
        else {
          this.setState({ loading: false })
        }
      })
      .catch((error) => { });
    this.setState({ loading: false })
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
  fetchteam() {
    this.setState({ loading: true })
    teamsService.fetchteams()
      .then((res) => {
        this.setState({ loading: false })
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return {
              label: cusmaidid.name, value: cusmaidid.id.toString(), area: cusmaidid.area,
              region: cusmaidid.region
            };
          });
          this.setState({
            team_data: regionlist,
          })
        }
      })
      .catch((error) => { this.setState({ loading: false }) });
  }

  onSubmit() {
    this.setState({ buttonDisabled: true });
    const { id, from, user_id, region, area, sub_area, received_date_time, shipment_no, request_type, cargo_type, no_of_shipment, subject, comments, updated_start_time } = this.state;
    var isfill = false
    if (region !== '' && area !== '' && sub_area !== '' && from !== '' && request_type !== '') {
      isfill = true
    }
    if (isfill === true) {
      const end_date = moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
      const { username } = this.props
      let end_date1 = convertLocalToUTCDate(new Date()),
        start_date = convertLocalToUTCDate(updated_start_time),
        updatedstarttime = convertLocalToUTCDate(updated_start_time),
        updated_end_time = convertLocalToUTCDate(new Date()),
        receiveddate = convertLocalToUTCDate(received_date_time)
      this.setState({
        end_date: end_date,
        loading: true
      })
      vesselbalancingService.createvb(id, username, region, area, sub_area, receiveddate, from, request_type, no_of_shipment, subject, comments, cargo_type, start_date, end_date1, updatedstarttime, updated_end_time)
        .then((res) => {
          this.setState({
            // endtime:end_date,
            // // gsc_userid:username, 
            loading: false,
            buttonDisabled: false
          })
          if (res.status) {
            createNotification('Created', 'success', 'filled')
            this.onrefresh()
            this.fetchVBCount()
          }
          else {
            createNotification(res.message, 'error', 'filled');
          }
        })
        .catch((error) => {
          this.setState({
            loading: false,
            buttonDisabled: false
          })
        });
    }
    else {
      this.setState({
        is_submit: true
      })
      createNotification('Please fill mandatory field', 'error', 'filled')
    }
  }

  onrefresh() {
    this.setState({
      from: '',
      user_id: '',
      start_date: '',
      end_date: '',
      request_type: '',
      no_of_shipment: '',
      subject: '',
      comments: '',
      region: '',
      area: '',
      sub_area: '',
      cargo_type: '',
      received_date_time: '',
      searchdata: [],
      is_submit: false,
      is_search: false,
      loading: false,
      updated_start_time: new Date(),
      start_date: moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
      tableindex: 0,
      tabledata: [],
      id: 0,
      dp_voyage: '',
      port: '',
      activity: ''
    })
  }
  onCopy() {
    navigator.clipboard.writeText(this.state.region)
  }

  handleactivity = (selectedOptions) => {
    this.setState({ activity: selectedOptions.value })
  }
  handlestatusofcase = (selectedOptions) => {
    this.setState({ statusofcase: selectedOptions.value })
  }
  setValue(record, id) {

    let nn = []
    nn.push(record)
    this.setState({
      tabledata: nn,
      tableindex: id
    })
    const { team_data, areadata } = this.state
    if (record !== null && record) {
      this.setState({
        id: record.id,
        gsc_userid: record.user_id,
        no_of_shipment: record.no_of_shipment,
        start_date: moment(record.start_time).format('MM/DD/YYYY hh:mm:ss a'),
        end_date: moment(record.end_time).format('MM/DD/YYYY hh:mm:ss a'),
        received_date_time: moment(record.received_datetime).format('MM/DD/YYYY hh:mm:ss a'),
        area: record.area,
        sub_area: record.team,
        status_of_case: record.status_case,
        region: record.region,
        from: record.from,
        request_type: record.request_type,
        subject: record.subject,
        comments: record.comments,
        cargo_type: record.cargo_type,
        teamdata: team_data,
        area_data: areadata,
        is_submit: false,
        is_search: true
      })
    }

  }
  nextTitle = (idx, arr) => {
    console.log('arridx', idx)
    var i = idx + 1;
    var i = i % arr.length;

    this.setValue(arr[i], i)
    this.setState({
      tableindex: i
    })
  }

  prevTitle = (idx, arr) => {
    if (idx === 0) {
      var i = arr.length - 1;

    } else {
      var i = idx - 1;

    }
    this.setState({
      tableindex: i
    })
    this.setValue(arr[i], i)
  }

  renderTemplate() {
    const { languageData, locale } = this.props

    const column_name = ["GSC User ID", "Region", "Area", "Sub Area", "Received Date & Time", "From", "Request Type", "No of Shipment", "Booking Number", "Email Subject", "Comments", "Start DateTime", "End DateTime"]
    return (

      <Workbook filename="Email_handling.xlsx" element={
        <Button className="button-width"
          color="secondary" >
          {onChangeLanguage(locale, 'Download Template', languageData)}
        </Button>
      }>
        <Workbook.Sheet data={[]} name="Sheet A">
          {column_name && column_name.map((value, index) =>
            <Workbook.Column label={value} value={value} />
          )}
        </Workbook.Sheet>
      </Workbook>


    );
  }
  onChangeFileUpload(files) {
    const { tableindex } = this.state
    this.setState({
      loading: true
    })
    emailhandlingService.fileUpload(files[0])
      .then((res) => {
        if (res.status) {
          if (res.data.status) {
            let dta = res.data
            let dtabee = dta.data
            this.setValue(dtabee[tableindex], tableindex)
            this.setState({
              searchdata: dta.data,
              is_search: true
            })
            createNotification('Uploaded', 'success', 'filled')
          }
          else {
            createNotification(res.data.message, 'error', 'filled')
            this.setState({
              loading: false
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

  validDate(date) {
    var date_value = '', isfill = false
    if (date && date !== null && date !== '') {

      var end_date = new Date(date)
      if (Object.prototype.toString.call(end_date) === "[object Date]") {
        if (isNaN(end_date.getTime())) {
          console.log("date is not valid", end_date)
        }
        else {
          date_value = moment(end_date).format('MM/DD/YYYY hh:mm:ss a')
          console.log("date is valid", date_value)
          isfill = true
        }
      } else {
        console.log("not a date")
      }

    }


    return date_value

  }
  getArrayValue(array, value, key) {
    var list = []
    if (array && array !== null && value !== '' && value !== null) {
      list = array.filter(item => item[key] === value)
    }
    return list
  }
  handlechangeregion = (selectedOptions) => {
    const { areadata } = this.state
    this.setState({
      region: selectedOptions.value,
      area_data: this.getArrayValue(areadata, selectedOptions.value, 'region'), sub_area: '', area: ''
    })

  }
  handlechangearea = (selectedOptions) => {
    const { team_data } = this.state
    this.setState({
      area: selectedOptions.value,
      teamdata: this.getArrayValue(team_data, selectedOptions.value, 'area'), sub_area: ''
    })
  }
  handlechangeteam = (selectedOptions) => {
    const { team_data, audittypedata } = this.state;

    let areaname = getValue(team_data, 'value', 'area', selectedOptions.value);
    let regionname = getValue(team_data, 'value', 'region', selectedOptions.value);

    // getValue likely returns a single region string
    let regionValue = getValue(team_data, 'value', 'region', selectedOptions.value);

    // If you need to filter audittypedata based on region
    let filteredAuditTypes = (audittypedata || []).filter(
      option => option.region === regionValue
    );

    this.setState({
      team: selectedOptions.value,
      area: areaname,
      region: regionname,
      audittypedata: filteredAuditTypes // ✅ stays as an array
    });
  }
  render() {
    const { match, locale, languageData, username } = this.props
    const { from, shipment_no, start_date, end_date, request_type, no_of_shipment, subject, isDataPasted, emailhandlingcount, emailhandlingcountlast,
      comments, activity, activity_data, statusofcase, statusofcase_data, region, area, sub_area, received_date_time, cargo_type, is_submit, is_search, dp_voyage, port,
      searchdata, teamdata, regiondata,team_data, area_data, cargotypedata, tabledata, tableindex, buttonDisabled } = this.state
    return (
      <>
        <Row>
          <Colxx xxs="12">
            <div className="row">
              <div className="col-md-8">
                <Breadcrumb heading="Vessel Balancing" match={match} />
              </div>
              <div className="col-md-2">
                <h2 style={{ marginTop: '15px' }}>Total EQ : {emailhandlingcount}</h2>
              </div>
              <div className="col-md-2">
                <h2 style={{ marginTop: '15px' }}>Last EQ : {emailhandlingcountlast}</h2>
              </div>
            </div>
            <Separator className="separator-margin" />
          </Colxx>
        </Row>
        <div>
          <div className="" style={{ padding: '0px 10px', borderRadius: '10px', marginBottom: '10px' }}>
            <div className="row" >
              <div className="col-md-3 space-margin"  >
                <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700 }}>{onChangeLanguage(locale, 'user ID', languageData)}</a><br></br>
                  {username}</Label>
              </div>
              <div className="col-md-2 space-margin"  >
                <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700 }}>{onChangeLanguage(locale, 'Start Date', languageData)}</a><br></br>{start_date}</Label>
              </div>
              <div className="col-md-2 space-margin"  >
                <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700 }}>{onChangeLanguage(locale, 'End Date', languageData)}</a><br></br>{end_date}</Label>
              </div>

            </div>
          </div>



          <div className="publishuser-card-component" style={{ borderRadius: '10px' }}>

            <div className="publish-title" >
              <Row>
                <Colxx xxs="4">
                  <Label className="fontstyle"
                    style={{ fontWeight: 700, fontSize: '15px' }}>Vessel Balancing</Label>
                </Colxx>
              </Row>
            </div>
            <div className="row" style={{ padding: '10px' }}>
              {/* <div className="col-md-4 space-margin">
                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Region Name', languageData)}<a style={{ color: 'red' }}>*</a></Label>

                <Select
                  className={is_submit === true && region === '' ? "error-border-select" : "react-select fontstyle"}
                  classNamePrefix="react-select"
                  name="form-field-name"
                  placeholder={onChangeLanguage(locale, 'Region', languageData)}
                  value={regiondata.filter(option => option.value === region)}
                  options={regiondata}
                  isDisabled={is_search === true ? true : false}
                  onChange={this.handlechangeregion}
                // onChange={({ label }) => this.setState({ region: label, area: '', sub_area: '' })}
                />
              </div>
              <div className="col-md-4 space-margin">
                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Area Name', languageData)}<a style={{ color: 'red' }}>*</a></Label>
                <Select
                  className={is_submit === true && area === '' ? "error-border-select" : "react-select fontstyle"}
                  classNamePrefix="react-select"
                  name="form-field-name"
                  placeholder={onChangeLanguage(locale, 'Area', languageData)}
                  value={area_data.filter(option => option.value === area)}
                  options={area_data}
                  isDisabled={is_search === true ? true : false}
                  onChange={this.handlechangearea}
                // onChange={({ label }) => this.setState({ area: label, sub_area: '' })}
                />
              </div> */}
              <div className="col-md-3 space-margin">
                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Sub Area', languageData)}<a style={{ color: 'red' }}>*</a></Label>
                <Select
                  className={is_submit === true && sub_area === '' ? "error-border-select" : "react-select fontstyle"}
                  classNamePrefix="react-select"
                  name="form-field-name"
                  placeholder={onChangeLanguage(locale, 'Sub Area', languageData)}
                  value={team_data?.find(option => option.value === sub_area) || null}
                  options={team_data || []}
                  isDisabled={is_search === true ? true : false}
                  onChange={this.handlechangeteam}
                // onChange={({ value }) => this.setState({ sub_area: value })}
                />
              </div>
              <div className="col-md-3 space-margin">
                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Received Date & Time', languageData)}<a style={{ color: 'red' }}>*</a></Label>
                <Input className="fontstyle text-background"
                  value={received_date_time}
                  disabled={isDataPasted}
                  onChange={(e) => this.setState({ received_date_time: e.target.value })}
                />
              </div>
              <div className="col-md-3 space-margin">
                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'From', languageData)}<a style={{ color: 'red' }}>*</a></Label>
                <Input className="fontstyle text-background"
                  value={from}
                  disabled={is_search || isDataPasted}
                  onChange={(e) => this.setState({ from: e.target.value })}
                />
              </div>
              <div className="col-md-3 space-margin">
                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Activity', languageData)}<a style={{ color: 'red' }}>*</a></Label>

                <Select
                  className={is_submit === true && activity === '' ? "error-border-select" : "react-select fontstyle"}

                  classNamePrefix="react-select"
                  name="form-field-name"
                  value={activity_data.filter(option => option.value === activity)}
                  options={activity_data}
                  onChange={this.handleactivity}
                />
              </div>
              <div className="col-md-3 space-margin">
                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Status of Activity', languageData)}<a style={{ color: 'red' }}>*</a></Label>

                <Select
                  className="react-select fontstyle"

                  classNamePrefix="react-select"
                  name="form-field-name"
                  value={statusofcase_data.filter(option => option.value === statusofcase)}
                  options={statusofcase_data}
                  onChange={this.handlestatusofcase}
                />
              </div>
              <div className="col-md-3 space-margin">
                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'No. of Shipments', languageData)}</Label>
                <Input className={"fontstyle text-background"}
                  value={no_of_shipment}
                  onChange={(e) => this.setState({ no_of_shipment: e.target.value })}
                />
              </div>
              {/* <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Booking Number',languageData)}</Label>
                                <Input  className={"fontstyle text-background" }
                              
                                value = {shipment_no}  
                                onChange= {(e)=>this.setState({shipment_no : e.target.value})} 
                                />
                        </div> */}
              <div className="col-md-3 space-margin">
                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'DP Voyage', languageData)}</Label>
                <Input className={"fontstyle text-background"}

                  value={dp_voyage}
                  onChange={(e) => this.setState({ dp_voyage: e.target.value })}
                />
              </div>
              <div className="col-md-3 space-margin">
                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Port', languageData)}</Label>
                <Input className={"fontstyle text-background"}

                  value={port}
                  onChange={(e) => this.setState({ port: e.target.value })}
                />
              </div>
              <div className="col-md-3 space-margin">
                <Label className="fontstyle normal-font" >Email Subject
                  <a style={{ color: 'red' }}>*</a></Label>
                <textarea
                  className="fontstyle textarea-background"
                  placeholder=''
                  value={subject}
                  // disabled={is_search === true ? true : false}
                  disabled={is_search || isDataPasted}
                  onChange={(e) => this.setState({ subject: e.target.value })}
                />
              </div>
              <div className="col-md-3 space-margin">
                <Label className="fontstyle normal-font" >Comments</Label>
                <textarea className="fontstyle textarea-background"
                  placeholder=''
                  value={comments}
                  onChange={(e) => this.setState({ comments: e.target.value })}
                />
              </div>

            </div>
            <div className="row text-center">
              <Button className="button-width" color="secondary"
                onClick={() => this.onPasteZ1910()}
              >
                {onChangeLanguage(locale, 'Paste', languageData)}
              </Button>
              {/* <Button 
                            className = "button-width" color="secondary"  
                                        onClick={()=>this.fetchData()}
                                >
                                {onChangeLanguage(locale,'Search',languageData)} 
                            </Button>   */}
              <Button className="button-width" color="primary"
                onClick={() => this.onSubmit()} disabled={buttonDisabled}
              >
                {onChangeLanguage(locale, 'Save', languageData)}
              </Button>
              <Button className="button-width"
                color="secondary"
                onClick={() => this.onrefresh()}
              >
                {onChangeLanguage(locale, 'Refresh', languageData)}
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
  connect(mapStateToProps, {

  })(QueryResolveSheet)
);

