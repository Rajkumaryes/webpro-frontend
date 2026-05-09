import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import Loading from "react-fullscreen-loading";
import { Label, Input, Button } from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { onChangeLanguage, convertLocalToUTCDate, getValue, get_array_id, get_multiplechoose_array, getoptionvalue } from '../../../../helper'
import Select from 'react-select';
import moment from 'moment';
import Workbook from 'react-excel-workbook'
import * as clipboard from "clipboard-polyfill/text";
import { getValue_S9610, getValue_D1040, getValue_S8100 } from '../../pasteData'
import { createNotification } from '../../../../toast';
import DatePicker from "../../datePicker";
import { Table, Checkbox } from 'antd';
import { highvelocitysalesService } from '../../../../redux/bchteam/highvelocitysales/saga'
import { hvsareaService } from '../../../../redux/bchteam/hvsarea/saga'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import CustomLoader from '../../../../loader'

class BookingSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      id: 0,
      area: '',
      team: '',
      user_id: '',
      matchcode:'',
      quotation_number:'',
      company_name:'',
      query: '',
      leadsource:'',
      start_date: new Date(),
      end_date: '',
      updated_start_time: new Date(),
      is_search: false,
      is_submit: false,
      crmsearch: false,
      tableindex: 0,
      tabledata: [],
      area_data: [],
      teamdata: [],
      searchdata: [],
      tableindex: 0,
      tabledata: [],
      report_starttime:'',
      report_endtime:'',
      excel_starttime:'',
      excel_endtime:'',
      lead_starttime:'',
      lead_endtime:''
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: true });
    }, 3000);
    this.setState({
      start_date: new Date(),
    })

    this.fetcharea()
  }

  



  fetcharea() {
    this.setState({ loading: true })
    hvsareaService.fetchapi()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var teamlist = filterstatus.map(function (response) {
            return { label: response.name, value: response.id.toString() };
          });
          this.setState({
            area_data: teamlist
          })

        }
        else {
          this.setState({ loading: false })
        }
      })
      .catch((error) => { });
    this.setState({ loading: false })
  }


  onClearValue() {
    this.setState({
      id: 0,
      area: '',
      user_id: '',
      matchcode:'',
      quotation_number:'',
      company_name:'',
      query: '',
      leadsource:'',
      start_date: new Date(),
      end_date: '',
      updated_start_time: new Date(),
      is_search: false,
      is_submit: false,
      tableindex: 0,
      tabledata: [],
      crmsearch: false,
    })

  }
  onSubmit() {
    const { id,  area,  matchcode,quotation_number,company_name,leadsource,
        query, updated_start_time } = this.state;
    var is_fill = false

    if ( matchcode !== '' && company_name !== '' && area !== '' && leadsource !== '') {
      this.setState({
        crmsearch: true
      })
      is_fill = true
    }
    
    if (is_fill === true) {
      const end_time = moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
      const { username } = this.props
      let end_date = convertLocalToUTCDate(new Date()),
        start_date = convertLocalToUTCDate(updated_start_time),
        updatedstarttime = convertLocalToUTCDate(updated_start_time),
        updated_end_time = convertLocalToUTCDate(new Date())
        highvelocitysalesService.createapi(id, area, username,
            matchcode,quotation_number,company_name,leadsource, query,
        start_date, end_date, updatedstarttime, updated_end_time)
        .then((res) => {
          this.setState({
            end_date: end_time,
            loading: false
          })
          if (res.status) {
            createNotification('Created', 'success', 'filled')
            this.onClearValue()
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
    else {
      this.setState({
        is_submit: true
      })
      createNotification('Please fill mandatory field', 'error', 'filled')
    }
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
        gsc_userid: record.gsc_userid,
        region: record.region,
        area: record.area,
        team: record.team,
        booking_no: record.booking_no,
        start_date: record.start_time,
        end_date: record.end_time,
        is_submit: false,
        is_search: true
      })
    }
    // this.fetchamendmenttype(record.amendment_type_array)

  }
  nextTitle = (idx, arr) => {
    // console.log('arridx', idx)
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



  validDate(date, title) {
    var date_value = '', isfill = false
    if (date && date !== null && date !== '') {

      var end_date = new Date(date)
      if (Object.prototype.toString.call(end_date) === "[object Date]") {
        if (isNaN(end_date.getTime())) {
          //console.log("date is not valid")
        }
        else {
          date_value = end_date
          //console.log("date is valid")
          isfill = true
        }
      } else {
        //console.log("not a date")
      }

    }
    if (isfill === false) {
      createNotification(`Please Enter ${title} (MM/DD/YYYY)`, 'error', 'filled')
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


  handlearea = (selectedOptions) => {
    this.setState({ area: selectedOptions.value })
  }
  handleleadsource = (selectedOptions) => {
    this.setState({ leadsource: selectedOptions.value })
  }
  onChangereportstarttime(date)
  {
    this.setState({report_starttime  : date}) 
  }
  onChangereportendtime(date)
  {
    this.setState({report_endtime  : date}) 
  }
  onChangeexcelstarttime(date)
  {
    this.setState({excel_starttime  : date}) 
  }
  onChangeexcelendtime(date)
  {
    this.setState({excel_endtime  : date}) 
  }
  onChangeleadstarttime(date)
  {
    this.setState({lead_starttime  : date}) 
  }
  onChangeleadendtime(date)
  {
    this.setState({lead_endtime  : date}) 
  }

  render() {
    const { match, locale, languageData, username } = this.props
    const { loading, region, area, team,report_starttime,report_endtime,excel_starttime,excel_endtime,lead_starttime,lead_endtime,
        matchcode,quotation_number, area_data, leadsource,company_name,
        query, 
       start_date, end_date, is_search, is_submit, searchdata, teamdata, tabledata, tableindex, crmsearch, statusofthecase_data } = this.state
      var leadsource_data = [
        {
          "label": "Lost Business",
          "value": "Lost Business"
        },
        {
          "label": "Quick Quote",
          "value": "Quick Quote"
        },
        {
            "label": "Market Data",
            "value": "Market Data"
        },
      ];
    return (

      <>
      {/* <Loader /> */}
      {loading && <CustomLoader />}
        {/* {loading && 
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        } */}
        <title>{onChangeLanguage(locale, 'High Velocity Sales', languageData)}</title>
        <Row>
          <Colxx xxs="12">
            <div className="row">
              <div className="col-md-8">
                <Breadcrumb heading={onChangeLanguage(locale, 'High Velocity Sales', languageData)} match={match} />
              </div>

            </div>
            <Separator className="separator-margin" />
          </Colxx>
        </Row>
        <div className="publishuser-card-component" style={{ padding: '10px', borderRadius: '10px', marginBottom: '30px' }}>
          <div className="row" style={{ marginBottom: '30px' }}>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'GCC user ID', languageData)}
                <br></br>{username}
              </Label>

            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Start Date', languageData)}
                <br></br>{moment(start_date).format('MM/DD/YYYY hh:mm:ss a')}
              </Label>

            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'End Date', languageData)}
                <br></br>{end_date !== '' && moment(end_date).format('MM/DD/YYYY hh:mm:ss a')}
              </Label>

            </div>
        
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Match Code', languageData)}<a style={{ color: 'red' }}>*</a>
              {(is_submit === true && matchcode.length === 0) && <a className="fontstyle mandatory-label">{onChangeLanguage(locale, 'Mandatory Field', languageData)}</a>}</Label>
              <Input className={is_submit === true && matchcode === '' ? "error-border-paste" : "fontstyle text-background"}
                value={matchcode} 
                onChange={(e) => this.setState({ matchcode: e.target.value })}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Quotation Number', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <Input className={"fontstyle text-background"}
                value={quotation_number} 
                onChange={(e) => this.setState({ quotation_number: e.target.value })}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Compnay Name', languageData)}<a style={{ color: 'red' }}>*</a>
              {(is_submit === true && company_name.length === 0) && <a className="fontstyle mandatory-label">{onChangeLanguage(locale, 'Mandatory Field', languageData)}</a>}</Label>
              <Input className={is_submit === true && company_name === '' ? "error-border-paste" : "fontstyle text-background"}
                value={company_name} 
                onChange={(e) => this.setState({ company_name: e.target.value })}
              />
            </div>

            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Lead Source', languageData)}<a style={{ color: 'red' }}>*</a>
                {(is_submit === true && leadsource.length === 0) && <a className="fontstyle mandatory-label">{onChangeLanguage(locale, 'Mandatory Field', languageData)}</a>}</Label>
              <Select
                className={is_submit === true && leadsource === '' ? "error-border-select" : "react-select fontstyle"}
                classNamePrefix="react-select"
                name="form-field-name"
                value={leadsource_data.filter(option => option.value === leadsource)}
                options={leadsource_data}
                onChange={this.handleleadsource}
              />
            </div>

            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Area', languageData)}<a style={{ color: 'red' }}>*</a>
                {(is_submit === true && area.length === 0) && <a className="fontstyle mandatory-label">{onChangeLanguage(locale, 'Mandatory Field', languageData)}</a>}</Label>
              <Select
                className={is_submit === true && area === '' ? "error-border-select" : "react-select fontstyle"}
                classNamePrefix="react-select"
                name="form-field-name"
                value={area_data.filter(option => option.value === area)}
                options={area_data}
                onChange={this.handlearea}
              />
            </div>

            {/* <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font">
                {onChangeLanguage(locale, 'Report Start Time', languageData)}
              </Label>
              <DatePicker
                selected={report_starttime}
                className="fontstyle text-background"
                onChange={(date) => this.onChangereportstarttime(date)}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font">
                {onChangeLanguage(locale, 'Report End Time', languageData)}
              </Label>
              <DatePicker
                selected={report_endtime}
                className="fontstyle text-background"
                onChange={(date) => this.onChangereportendtime(date)}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font">
                {onChangeLanguage(locale, 'Excel Start Time', languageData)}
              </Label>
              <DatePicker
                selected={excel_starttime}
                className="fontstyle text-background"
                onChange={(date) => this.onChangeexcelstarttime(date)}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font">
                {onChangeLanguage(locale, 'Excel End Time', languageData)}
              </Label>
              <DatePicker
                selected={excel_endtime}
                className="fontstyle text-background"
                onChange={(date) => this.onChangeexcelendtime(date)}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font">
                {onChangeLanguage(locale, 'Lead Start Time', languageData)}
              </Label>
              <DatePicker
                selected={lead_starttime}
                className="fontstyle text-background"
                onChange={(date) => this.onChangeleadstarttime(date)}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font">
                {onChangeLanguage(locale, 'Lead End Time', languageData)}
              </Label>
              <DatePicker
                selected={lead_endtime}
                className="fontstyle text-background"
                onChange={(date) => this.onChangeleadendtime(date)}
              />
            </div> */}
            <div className="col-md-6 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Query', languageData)}</Label>
              <textarea className={"fontstyle textarea-background"}
                value={query}
                onChange={(e) => this.setState({ query: e.target.value })}
              />
            </div>
           
          </div>
          <div className="row text-center" style={{ margin: '0px 5px' }}>
            {/* <Button className="button-width" color="secondary"
              onClick={() => this.onPasteS9610()}>
              {onChangeLanguage(locale, 'Paste S9610', languageData)}
            </Button> */}
            {/* <Button className="button-width" color="secondary"
                onClick={() => this.onPasteD1040()}>
              {onChangeLanguage(locale, 'Paste From D1040', languageData)}
            </Button> */}
            <Button className="button-width" color="primary"
              onClick={() => this.onSubmit()}>
              {onChangeLanguage(locale, 'Save', languageData)}
            </Button>
            <Button className="button-width" color="secondary"
              onClick={() => this.onClearValue()}>
              {onChangeLanguage(locale, 'Refresh', languageData)}
            </Button>
          </div>
          {is_search == true &&
            <div className="publishuser-card-component" style={{ borderRadius: '10px', marginBottom: '30px' }}>

              <div style={{ padding: '10px' }}>
                <Table
                  dataSource={tabledata}
                  columns={columsss}
                  // rowSelection={rowSelection}
                  tableLayout="auto"
                  rowKey="id"
                  scroll={{ y: 240, x: "max-content" }}
                  pagination={false}
                  rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'} />
              </div>
              <div className="row text-center" style={{ margin: '0px 5px' }}>
                <Button className="button-width" color="primary"
                  disabled={searchdata.length > 0 ? false : true}
                  onClick={() => this.prevTitle(tableindex, searchdata)}>
                  {onChangeLanguage(locale, 'Prev', languageData)}
                </Button>
                <Button className="button-width" color="secondary"
                  onClick={() => this.nextTitle(tableindex, searchdata)}
                  disabled={searchdata.length > 0 ? false : true}>
                  {onChangeLanguage(locale, 'Next', languageData)}
                </Button>
              </div>
            </div>
          }
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

  })(BookingSheet)
);
