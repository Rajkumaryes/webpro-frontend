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
import { getValue_S9610,getValue_D1040, getValue_S8100 } from '../../pasteData'
import { createNotification } from '../../../../toast';
import DatePicker from "../../datePicker";
import { Table, Checkbox } from 'antd';
import { omnicasemergingService } from '../../../../redux/bookingamendment/omnicasemerging/saga'
import { querytypeService } from '../../../../redux/bookingamendment/querytype/saga'
import { statusofthecaseMergingService } from '../../../../redux/bookingamendment/statusofthecasemerging/saga'
import { issuecodeService } from '../../../../redux/bookingamendment/issuecode/saga';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import { statusofthecaseService } from '../../../../redux/bookingamendment/statusofthecase/saga'
import { exceptiontypeService } from '../../../../redux/bookingamendment/exceptiontype/saga'
import { amendmentduetoService } from '../../../../redux/bookingamendment/amendmentdueto/saga'

class BookingSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      id: 0,
      region: '',
      area: '',
      team: '',
      user_id: '',
      csb_office: '',
      received_date: '',
      received_time: '',
      reason: '',
      assigned_to: '',
      cargo_type: '',
      comments: '',
      start_date: new Date(),
      end_date: '',
      last_pod: '',
      end_pod: '',
      updated_start_time: new Date(),
      is_search: false,
      is_submit: false,
      crmsearch: false,
      tableindex: 0,
      tabledata: [],
      issuecode_data: [],
      teamdata: [],
      searchdata: [],
      tableindex: 0,
      tabledata: [],
      booking_number:'',
      no_of_booking_number:'1',
      status_of_the_case:'',
      query_type_data:[],
      querytype:'',
      status_of_the_case_data:[],
      omnicasemergingcount:'',
      omnicasemergingcountlaset:''
    }
  }
  componentDidMount() {
    this.setState({
      start_date: new Date(),
    })


    this.fetchissie()
    this.fetchquerytype()
    this.fetchstatusofthecasemerging()
    this.fetchomnicasemergingCount()
  }
  fetchomnicasemergingCount(){
    this.setState({loading:true})
    const {username} = this.props
    omnicasemergingService.fetchomnicasemergingcount(username)
    .then((res) => {
       if(res.status)   { 
              let filterstatus = res.data;
              let lastdata = res.lastcount; 
              this.setState({ 
                omnicasemergingcount:filterstatus, 
                omnicasemergingcountlast:lastdata     
              }) 
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})

}
  fetchstatusofthecasemerging() {
    this.setState({ loading: true })
    statusofthecaseMergingService.fetchapi()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var teamlist = filterstatus.map(function (response) {
            return { label: response.name, value: response.id.toString() };
          });
          this.setState({
            status_of_the_case_data: teamlist
          })

        }
        else {
          this.setState({ loading: false })
        }
      })
      .catch((error) => { });
    this.setState({ loading: false })
  }
  fetchquerytype() {
    this.setState({ loading: true })
    querytypeService.fetchapi()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var teamlist = filterstatus.map(function (response) {
            return { label: response.name, value: response.id.toString() };
          });
          this.setState({
            query_type_data: teamlist
          })

        }
        else {
          this.setState({ loading: false })
        }
      })
      .catch((error) => { });
    this.setState({ loading: false })
  }
  fetchissie() {
    this.setState({
      loading: true
    })
    issuecodeService.fetchapi()
      .then((res) => {
        this.setState({
          loading: false

        })
        if (res.status) {
          let filterstatus = res.data
          var list = filterstatus.map(function (areaaval) {
            return {
              id: (areaaval.id).toString(),
              area: areaaval.area, region: areaaval.region, team: areaaval.team, issue_code: areaaval.issue_code
            };
          });
          this.setState({
            issuecode_data: list,

          })
        } else {
          this.setState({
            data: [],

          })
        }

      })
      .catch((error) => {
        this.setState({
          loading: false
        })
      });
  }

  onClearValue() {
    this.setState({
      id: 0,
      region: '',
      area: '',
      team: '',
      user_id: '',
      csb_office: '',
      reason: '',
      assigned_to: '',
      cargo_type: '',
      comments: '',
      start_date: new Date(),
      end_date: '',
      last_pod: '',
      end_pod: '',
      updated_start_time: new Date(),
      is_search: false,
      is_submit: false,
      tableindex: 0,
      tabledata: [],
      crmsearch: false,
      received_date: '',
      received_time: '',
      booking_number:'',
      no_of_booking_number:'',
      status_of_the_case:'',
      querytype:''
    })

  }
  onSubmit() {
    const { id, region, area, team,  
       updated_start_time, received_date, no_of_booking_number,booking_number,status_of_the_case,querytype,comments } = this.state;
    var is_fill = false

    if (region !== '' && area !== '' && team !== '' && status_of_the_case !== '' && querytype !== ''
       
      && received_date !== '' && booking_number !=='') {
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
        updated_end_time = convertLocalToUTCDate(new Date()),
        receiveddate = convertLocalToUTCDate(received_date)
   
      omnicasemergingService.createbookingamendment(id, region, area, team, username, no_of_booking_number,booking_number,querytype,status_of_the_case,
         
        start_date, end_date, updatedstarttime, updated_end_time, received_date,comments)
        .then((res) => {
          this.setState({
            end_date: end_time,
            loading: false
          })
          if (res.status) {
            createNotification('Created', 'success', 'filled')
            this.onClearValue()
            this.fetchomnicasemergingCount()
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
        csb_office: record.csb_office,
        booking_no: record.booking_no,
        reason: record.reason,
        assigned_to: record.assigned_to,
        cargo_type: record.cargo_type,
        start_date: record.start_time,
        end_date: record.end_time,
        last_pod: record.last_pod,
        end_pod: record.end_pod,
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
  async onPasteD1040() {
    clipboard.readText().then((text) => {
        var record = getValue_D1040(text)
        let value = (record.issuer).trim()
        // console.log(text, 'tetttttt')
        // console.log("kjbkj ", JSON.stringify(record))
        this.setState({
            issuer: record.issuer,
            booking_number:record.shipment_no,
            region: getValue(this.state.issuecode_data, 'issue_code', 'id', value),
            area: getValue(this.state.issuecode_data, 'issue_code', 'id', value),
            team: getValue(this.state.issuecode_data, 'issue_code', 'id', value)
        })
      
    });

}

  async onPasteS9610() {
    clipboard.readText().then((text) => {
      var record = getValue_S9610(text)
      console.log("kjbkj ", JSON.stringify(record))
      let value = (record.csb_office).trim()
      console.log("kjbkj jjk", value)
      //var received_date = record.received_date + ' ' + record.received_time;
      this.setState({
        csb_office: record.csb_office,
        last_pod: record.last_pod,
        end_pod: record.end_pod,
        // received_date: this.validDate(received_date, 'Received Date'),
        region: getValue(this.state.issuecode_data, 'issue_code', 'id', value),
        area: getValue(this.state.issuecode_data, 'issue_code', 'id', value),
        team: getValue(this.state.issuecode_data, 'issue_code', 'id', value)

      })

    });

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

  getteamvalue(value) {
    console.log("kjbkj issuer = ", getValue(this.state.issuecode_data, 'issue_code', 'id', value))
    this.setState({
      csb_office: value,
      region: getValue(this.state.issuecode_data, 'issue_code', 'id', value),
      area: getValue(this.state.issuecode_data, 'issue_code', 'id', value),
      team: getValue(this.state.issuecode_data, 'issue_code', 'id', value)
    })
  }

  // getamendmentvalue(id,array)
  //     {
  //      var name = ' '
  //           if(array != null)
  //           {
  //                 for(var i=0;i< array.length;i++)
  //                 {
  //                     if(array[i].value === id)
  //                     {
  //                        name = array[i].label
  //                     }
  //             }
  //         }
  //       return name
  // }  
  handleQuery_type = (selectedOptions) => {
    this.setState({ querytype: selectedOptions.value })
  }
  handleStatusofthecase = (selectedOptions) => {
    this.setState({ status_of_the_case: selectedOptions.value })
  } 
  render() {
    const { match, locale, languageData, username } = this.props
    const { loading, region, area, team, no_of_booking_number,booking_number,
        received_date,querytype ,comments, status_of_the_case,query_type_data ,status_of_the_case_data,omnicasemergingcount,omnicasemergingcountlast,
      last_pod, end_pod, start_date, end_date, is_search, is_submit, searchdata, teamdata, tabledata, tableindex, crmsearch, } = this.state

    return (

      <>
        {loading &&
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
        <title>{onChangeLanguage(locale, 'Omni Case Merging', languageData)}</title>
        <Row>
          <Colxx xxs="12">
            <div className="row">
              <div className="col-md-8">
                <Breadcrumb heading={onChangeLanguage(locale, 'Omni Case Merging', languageData)} match={match} />
              </div>
              <div className = "col-md-2">
                        <h2 style = {{marginTop:'15px'}}>Total EQ : {omnicasemergingcount}</h2>
                    </div>
                    <div className = "col-md-2">
                        <h2  style = {{marginTop:'15px'}}>Last EQ : {omnicasemergingcountlast}</h2>
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
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Received Date', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <a className='fontstyle mandatory-label'>
                {is_submit === true && received_date === '' && `${onChangeLanguage(locale, 'Mandatory Field', languageData)}`}</a>
              <DatePicker
                selected={received_date}
                className="text-background"
                onChange={(date) => this.setState({ received_date: date })}
              />
            </div>
            <div className="col-md-3 space-margin">

              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Region Name', languageData)}
                <a style={{ color: 'red' }}>*</a>
                {is_submit === true && region === '' && <p className='fontstyle mandatory-label'> {onChangeLanguage(locale, 'Mandatory Field', languageData)} </p>}
                <br></br>{getValue(this.state.issuecode_data, 'id', 'region', region)}
              </Label>
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Area Name', languageData)}
                <a style={{ color: 'red' }}>*</a>
                {is_submit === true && area === '' && <p className='fontstyle mandatory-label'> {onChangeLanguage(locale, 'Mandatory Field', languageData)} </p>}
                <br></br>{getValue(this.state.issuecode_data, 'id', 'area', area)}
              </Label>
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Sub Area Name', languageData)}
                <a style={{ color: 'red' }}>*</a>
                {is_submit === true && team === '' && <p className='fontstyle mandatory-label'> {onChangeLanguage(locale, 'Mandatory Field', languageData)} </p>}
                <br></br>{getValue(this.state.issuecode_data, 'id', 'team', team)}
              </Label>
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Booking Number', languageData)}</Label>
              <Input className={is_submit === true && booking_number === '' ? "error-border-paste" : "fontstyle text-background"}
                value={booking_number}
                type='number'
                disabled={is_search === true ? true : false}
                onChange={(e) => this.setState({ booking_number: e.target.value })}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'No of Booking Number', languageData)}</Label>
              <Input className={"fontstyle text-background"}
                value={no_of_booking_number}
                type='number'
                placeholder="1"
                disabled={is_search === true ? true : false}
                onChange={(e) => this.setState({ no_of_booking_number: e.target.value })}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Query Type', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <Select
                className={is_submit === true && querytype === '' ? "error-border-select" : "react-select fontstyle"}
                classNamePrefix="react-select"
                name="form-field-name"
                value={query_type_data.filter(option => option.value === querytype)}
                options={query_type_data}
                onChange={this.handleQuery_type}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Status of the Case', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <Select
                className={is_submit === true && status_of_the_case === '' ? "error-border-select" : "react-select fontstyle"}
                classNamePrefix="react-select"
                name="form-field-name"
                value={status_of_the_case_data.filter(option => option.value === status_of_the_case)}
                options={status_of_the_case_data}
                onChange={this.handleStatusofthecase}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Comments', languageData)}</Label>
              <textarea className={"fontstyle textarea-background"}
                value={comments}
                onChange={(e) => this.setState({ comments: e.target.value })}
              />
            </div>
          </div>
          <div className="row text-center" style={{ margin: '0px 5px' }}>
            {/* <Button className="button-width" color="secondary"
              onClick={() => this.onPasteS9610()}>
              {onChangeLanguage(locale, 'Paste S9610', languageData)}
            </Button> */}
            <Button className="button-width" color="secondary"
                onClick={() => this.onPasteD1040()}>
              {onChangeLanguage(locale, 'Paste From D1040', languageData)}
            </Button>
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
