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
import { omnicasehandlingService } from '../../../../redux/bookingamendment/omnicasehandling/saga'
import { amendmenttypeService } from '../../../../redux/bookingamendment/amendmenttype/saga'
import { amendmentinducedService } from '../../../../redux/bookingprocess/amendmentinduced/saga'
import { amendmentstatusService } from '../../../../redux/bookingprocess/amendmentstatus/saga'
import { cargotypeService } from '../../../../redux/bookingprocess/cargotype/saga'
import { assignedService } from '../../../../redux/bookingprocess/assigned/saga'
import { reasonsService } from '../../../../redux/bookingprocess/reasons/saga'
import { teamsService } from '../../../../redux/teams/saga';
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
      booking_number: [],
      no_of_booking_number:'1',
      crm_case_no: '',
      amendment_caused_userid: '',
      amendment_type: '',
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
      amendment_type_data: [],
      issuecode_data: [],
      teamdata: [],
      searchdata: [],
      tableindex: 0,
      tabledata: [],
      statusofthecase_data: [],
      status_of_the_case: '',
      exception_type: '',
      amendmentdueto_data: [],
      amendment_dueto: '',
      inquiry_reason: '',
      exceptionreason_data:[],
      exception_reason:[],
      exception_reasonselect:[],
      bookingamendmentcount:'',
      bookingamendmentcountlast:'',
      hasNoOfBookingTouched : false,
      buttonDisabled: false
    }
  }
  componentDidMount() {
    this.setState({
      start_date: new Date(),
    })

    this.fetchamendmenttype()
    this.fetchissie()
    this.fetchteam()
    this.fetchstatusofthecase()
    this.fetchexceptiontype()
    this.fetchamendmentdueto()
    this.fetchBookingAmendmentCount()
  }
  fetchBookingAmendmentCount(){
    this.setState({loading:true})
    const {username} = this.props
    omnicasehandlingService.fetchbookingamendmentcount(username)
    .then((res) => {
       if(res.status)   { 
              let filterstatus = res.data;
              let lastdata = res.lastcount; 
              this.setState({ 
                bookingamendmentcount:filterstatus, 
                bookingamendmentcountlast:lastdata     
              }) 
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})

}
  fetchamendmentdueto() {
    this.setState({ loading: true })
    amendmentduetoService.fetchapi()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var teamlist = filterstatus.map(function (response) {
            return { label: response.name, value: response.id.toString() };
          });
          this.setState({
            amendmentdueto_data: teamlist
          })

        }
        else {
          this.setState({ loading: false })
        }
      })
      .catch((error) => { });
    this.setState({ loading: false })
  }
  fetchexceptiontype() {
    this.setState({ loading: true })
    exceptiontypeService.fetchapi()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var teamlist = filterstatus.map(function (response) {
            return { label: response.exception_type, value: response.id.toString() };
          });
          var reasonlist = filterstatus.map(function (cusmaidid) {
            return {
              
              label: cusmaidid.exception_reason,value: cusmaidid.id.toString(), region: cusmaidid.exception_type,
              exception_reason: cusmaidid.exception_reason,
            };
          });
          var teamUniqueArr =  reasonlist.filter((v,i,a)=>a.findIndex(t=>(t.label === v.label && t.label===v.label))===i)
          this.setState({
            exceptionreason_data: teamUniqueArr
          })

        }
        else {
          this.setState({ loading: false })
        }
      })
      .catch((error) => { });
    this.setState({ loading: false })
  }
  fetchstatusofthecase() {
    this.setState({ loading: true })
    statusofthecaseService.fetchapi()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var teamlist = filterstatus.map(function (response) {
            return { label: response.name, value: response.id.toString() };
          });
          this.setState({
            statusofthecase_data: teamlist
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
  fetchamendmenttype() {
    this.setState({ loading: true })
    amendmenttypeService.fetchapi()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var teamlist = filterstatus.map(function (response) {
            return { label: response.name, value: response.id.toString() };
          });
          this.setState({
            amendment_type_data: teamlist
          })

        }
        else {
          this.setState({ loading: false })
        }
      })
      .catch((error) => { });
    this.setState({ loading: false })
  }

  fetchteam() {
    this.setState({ loading: true })
    teamsService.fetchteams()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var teamlist = filterstatus.map(function (response) {
            return { label: response.name, value: response.id.toString() };
          });
          this.setState({
            teamdata: teamlist
          })

        }
        else {
          this.setState({ loading: false })
        }
      })
      .catch((error) => { });
    this.setState({ loading: false })
  }
  handleChangeExceptionReason = (value) => {
    // console.log("value", value)
    this.setState({ exception_reason: value })
    const {exception_reason}=this.state
    // console.log("exception_reason", exception_reason)
  }
  handleChangeReason = (selectedOptions) => {
    this.setState({ reason: selectedOptions.value })
  }
  handleChangeAssigned_to = (selectedOptions) => {
    this.setState({ assigned_to: selectedOptions.value })
  }
  handleChangeCargo_type = (selectedOptions) => {
    this.setState({ cargo_type: selectedOptions.value })
  }


  onClearValue() {
    this.setState({
      id: 0,
      region: '',
      area: '',
      team: '',
      user_id: '',
      csb_office: '',
      booking_number: [],
      no_of_booking_number:'1',
      crm_case_no: '',
      amendment_caused_userid: '',
      amendment_type: '',
      amendment_dueto:'',
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
      status_of_the_case: '',
      exception_reason: [],
      exception_type:''
    })

  }
//   onSubmit() {
//     this.setState({ buttonDisabled: true });
//     const { id, region, area, team, booking_number,no_of_booking_number, crm_case_no, amendment_caused_userid, amendment_type, exception_type, amendment_dueto, exception_reason,
//       status_of_the_case, comments, updated_start_time, received_date } = this.state;
//     var is_fill = false

//     if (region !== '' && area !== '' && team !== ''
//       && amendment_type !== '' && status_of_the_case !== '' && amendment_dueto !== ''
//       && crm_case_no !== '') {
//       this.setState({
//         crmsearch: true
//       })
//       is_fill = true
//     }

// // console.log("booking_number",booking_number)
//     if (is_fill === true) {
//       const end_time = moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
//       const { username } = this.props
//       let end_date = convertLocalToUTCDate(new Date()),
//         start_date = convertLocalToUTCDate(updated_start_time),
//         updatedstarttime = convertLocalToUTCDate(updated_start_time),
//         updated_end_time = convertLocalToUTCDate(new Date()),
//         receiveddate = convertLocalToUTCDate(received_date)
//       const exceptionreason_typefile = get_array_id(exception_reason)
//       omnicasehandlingService.createbookingamendment(id, region, area, team, username,no_of_booking_number, booking_number,
//         crm_case_no, amendment_caused_userid, amendment_type, status_of_the_case, exception_type,exceptionreason_typefile, amendment_dueto, comments,
//         start_date, end_date, updatedstarttime, updated_end_time, received_date)
//         .then((res) => {
//           this.setState({
//             end_date: end_time,
//             loading: false,
//             buttonDisabled: false
//           })
//           if (res.status) {
//             createNotification('Created', 'success', 'filled')
//             this.onClearValue()
//             this.fetchBookingAmendmentCount()
//           }
//           else {
//             createNotification(res.message, 'error', 'filled');
//           }
//         })
//         .catch((error) => {
//           this.setState({
//             loading: false,
//             buttonDisabled: false
//           })
//         });
//     }
//     else {
//       this.setState({
//         is_submit: true,
//         buttonDisabled: false
//       })
//       createNotification('Please fill mandatory field', 'error', 'filled')
//     }
//   }

  validateForm() {
    const {
      region, area, team, amendment_type, status_of_the_case, amendment_dueto,
      crm_case_no, amendment_caused_userid, exception_type, exception_reason
    } = this.state;

    const errors = [];

    if (!region) errors.push('Region is required');
    if (!area) errors.push('Area is required');
    if (!team) errors.push('Team is required');
    if (!amendment_type) errors.push('Amendment Type is required');
    if (!status_of_the_case) errors.push('Status of the Case is required');
    if (!amendment_dueto) errors.push('Amendment Due To is required');
    if (!crm_case_no) errors.push('CRM Case Number is required');

    // Validate CRM case number is numeric
    if (crm_case_no && isNaN(crm_case_no)) {
      errors.push('CRM Case Number must be numeric');
    }

    // Validate booking numbers match count
    if (this.state.hasNoOfBookingTouched && this.state.booking_number) {
      const bookingCount = this.state.booking_number.split(',').filter(b => b.trim()).length;
      const expectedCount = parseInt(this.state.no_of_booking_number);
      if (bookingCount !== expectedCount) {
        errors.push(`Booking numbers count (${bookingCount}) doesn't match expected count (${expectedCount})`);
      }
    }

    return errors;
  }

  onSubmit() {
    this.setState({ buttonDisabled: true });

    // Validate form
    const errors = this.validateForm();
    if (errors.length > 0) {
      this.setState({
        is_submit: true,
        buttonDisabled: false
      });
      createNotification(errors[0], 'error', 'filled');
      return;
    }

    const {
      id, region, area, team, booking_number, no_of_booking_number, crm_case_no,
      amendment_caused_userid, amendment_type, exception_type, amendment_dueto,
      exception_reason, status_of_the_case, comments, updated_start_time, received_date
    } = this.state;

    try {
      const end_time = moment(new Date()).format('MM/DD/YYYY hh:mm:ss a');
      const { username } = this.props;

      // Prepare dates with proper error handling
      let end_date = convertLocalToUTCDate(new Date());
      let start_date = convertLocalToUTCDate(updated_start_time);
      let updatedstarttime = convertLocalToUTCDate(updated_start_time);
      let updated_end_time = convertLocalToUTCDate(new Date());
      let receiveddate = received_date ? convertLocalToUTCDate(received_date) : null;

      // Prepare exception reason data
      const exceptionreason_typefile = get_array_id(exception_reason) || [];

      // Log parameters for debugging
      console.log('API Parameters:', {
        id, region, area, team, username, no_of_booking_number, booking_number,
        crm_case_no, amendment_caused_userid, amendment_type, status_of_the_case,
        exception_type, exceptionreason_typefile, amendment_dueto, comments,
        start_date, end_date, updatedstarttime, updated_end_time, receiveddate
      });

      this.setState({ crmsearch: true });

      omnicasehandlingService.createbookingamendment(
        id, region, area, team, username, no_of_booking_number, booking_number,
        crm_case_no, amendment_caused_userid, amendment_type, status_of_the_case,
        exception_type, exceptionreason_typefile, amendment_dueto, comments,
        start_date, end_date, updatedstarttime, updated_end_time, receiveddate
      )
        .then((res) => {
          if (res && res.status) {
            this.setState({
              end_date: end_time,
            });
            createNotification('Created', 'success', 'filled');
            this.onClearValue();
            this.fetchBookingAmendmentCount();
          } else {
            createNotification(res?.message || 'Failed to save data', 'error', 'filled');
          }
        })
        .catch((error) => {
          console.error('API Error:', error);
          createNotification('Failed to save data', 'error', 'filled');
        })
        .finally(() => {
          this.setState({
            loading: false,
            buttonDisabled: false,
            crmsearch: false
          });
        });

    } catch (error) {
      console.error('Form submission error:', error);
      createNotification('Error preparing data for submission', 'error', 'filled');
      this.setState({
        buttonDisabled: false,
        loading: false
      });
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
        crm_case_no: record.crm_case_no,
        amendment_type: '',
        reason: record.reason,
        assigned_to: record.assigned_to,
        cargo_type: record.cargo_type,
        comments: record.comments,
        start_date: record.start_time,
        end_date: record.end_time,
        last_pod: record.last_pod,
        end_pod: record.end_pod,
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
  async onPasteD1040() {
    clipboard.readText().then((text) => {
        var record = getValue_D1040(text)
        let value = (record.issuer).trim()
        // console.log(text, 'tetttttt')
        // console.log("kjbkj ", JSON.stringify(record))
        this.setState({
            issuer: record.issuer,
            booking_number: record.shipment_no,
            region: getValue(this.state.issuecode_data, 'issue_code', 'id', value),
            area: getValue(this.state.issuecode_data, 'issue_code', 'id', value),
            team: getValue(this.state.issuecode_data, 'issue_code', 'id', value)
        })
      
    });

}

  async onPasteS9610() {
    clipboard.readText().then((text) => {
      var record = getValue_S9610(text)
      // console.log("kjbkj ", JSON.stringify(record))
      let value = (record.csb_office).trim()
      // console.log("kjbkj jjk", value)
      var received_date = record.received_date + ' ' + record.received_time;
      this.setState({
        csb_office: record.csb_office,
        booking_number: record.booking_number,
        last_pod: record.last_pod,
        end_pod: record.end_pod,
        received_date: this.validDate(received_date, 'Received Date'),
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
  handlestatus_ofthecase = (selectedOptions) => {
    this.setState({ status_of_the_case: selectedOptions.value })
  }
  // handleexceptiontype = (selectedOptions) => {
  //   this.setState({ exception_type: selectedOptions.value })
  // }
  getArrayValue(array, value, key) {
    var list = []
    if (array && array !== null && value !== '' && value !== null) {
      list = array.filter(item => item[key] === value)
    }
    return list
  }

  handleexceptiontype = (selectedOptions) => {
    const {exceptionreason_data}=this.state
    this.setState({
      exception_type : selectedOptions.value,
      exception_reasonselect:this.getArrayValue(exceptionreason_data, selectedOptions.label, 'region')
      }) 
  }
  handleamendmenttype = (selectedOptions) => {
    this.setState({ amendment_type: selectedOptions.value })
  }
  handleamendmentdueto = (selectedOptions) => {
    this.setState({ amendment_dueto: selectedOptions.value })
  }
  handleinquiry_reason = (selectedOptions) => {
    this.setState({ inquiry_reason: selectedOptions.value })
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
  handleNoOfBookingChange = (e) => {
    //const count = parseInt(e.target.value, 10);
    console.log("ghh", e.target.value, e)
    this.setState({ no_of_booking_number: e.target.value });
  };

  handleBookingNumberChange = (e) => {
    const inputValue = e.target.value;
    const commaCount = (inputValue.match(/,/g) || []).length;
    if (commaCount <= this.state.no_of_booking_number - 1) {
      this.setState({ booking_number: inputValue });
    }
    this.setState({ booking_number: inputValue });

  };
  render() {
    const { match, locale, languageData, username } = this.props
    const { loading, region, area, team, csb_office, booking_number,no_of_booking_number, assigned_to,hasNoOfBookingTouched,
      crm_case_no, amendment_caused_userid, amendment_type, amendment_type_data,exception_reasonselect,exception_reason,
      cargo_type, comments, received_date,  exception_type, amendmentdueto_data, amendment_dueto, inquiry_reason,bookingamendmentcount,bookingamendmentcountlast,
      last_pod, end_pod, start_date, end_date, is_search, is_submit, searchdata, teamdata, tabledata, tableindex, crmsearch, statusofthecase_data, status_of_the_case,buttonDisabled  } = this.state
      var exceptiontype_data = [
        {
          "label": "No Exception",
          "value": "No Exception"
        },
        {
          "label": "Internal",
          "value": "Internal"
        },
        {
          "label": "External",
          "value": "External"
        },
        {
          "label": "Internal & External",
          "value": "Internal & External"
        },
      ];
    return (

      <>
        {loading &&
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
        <title>{onChangeLanguage(locale, 'Omni Case Handling', languageData)}</title>
        <Row>
          <Colxx xxs="12">
            <div className="row">
              <div className="col-md-8">
                <Breadcrumb heading={onChangeLanguage(locale, 'Omni Case Handling', languageData)} match={match} />
              </div>
              <div className = "col-md-2">
                        <h2 style = {{marginTop:'15px'}}>Total EQ : {bookingamendmentcount}</h2>
                    </div>
                    <div className = "col-md-2">
                        <h2  style = {{marginTop:'15px'}}>Last EQ : {bookingamendmentcountlast}</h2>
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
            {/* <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'CSB Office/Assigned user id',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                <Input  className={is_submit === true && csb_office === ''?  "error-border-paste":"fontstyle text-background-paste" }
                                value = {csb_office} 
                                onChange={(e) => this.getteamvalue(e.target.value)} 
                                disabled={is_search === true ? true : false} 
                                // onChange= {(e)=>this.setState({csb_office : e.target.value})} 
                                />
                        </div> */}
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Received Date', languageData)}</Label>
              
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
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Amendment Type', languageData)}<a style={{ color: 'red' }}>*</a>
                {(is_submit === true && amendment_type.length === 0) && <a className="fontstyle mandatory-label">{onChangeLanguage(locale, 'Mandatory Field', languageData)}</a>}</Label>
              <Select
                className={is_submit === true && amendment_type === '' ? "error-border-select" : "react-select fontstyle"}
                classNamePrefix="react-select"
                name="form-field-name"
                value={amendment_type_data.filter(option => option.value === amendment_type)}
                options={amendment_type_data}
                onChange={this.handleamendmenttype}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Status of the Case', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <Select
                className={is_submit === true && status_of_the_case === '' ? "error-border-select" : "react-select fontstyle"}
                classNamePrefix="react-select"
                name="form-field-name"
                value={statusofthecase_data.filter(option => option.value === status_of_the_case)}
                options={statusofthecase_data}
                onChange={this.handlestatus_ofthecase}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'CRM Case Number', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <Input className={is_submit === true && crm_case_no === '' ? "error-border-paste" : "fontstyle text-background"}
                value={crm_case_no}
                type='number'
                onChange={(e) => this.setState({ crm_case_no: e.target.value })}
              />
            </div>
            {/* <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'No of Booking Number', languageData)}</Label>
              <Input className={"fontstyle text-background"}
                value={no_of_booking_number}
                type='number'
                disabled={is_search === true ? true : false}
                // onChange={(e) => this.setState({ no_of_booking_number: e.target.value })}
                onChange={(e) => {
                  if (!this.state.hasNoOfBookingTouched) {
                    this.setState({ hasNoOfBookingTouched: true })
                  }
                  this.handleNoOfBookingChange(e)
                }}
              />
            </div> */}
 <div className="col-md-3 space-margin">
  <Label className="fontstyle normal-font">{onChangeLanguage(locale, 'No of Booking Number', languageData)}</Label>
  <Input
    className={"fontstyle text-background"}
    value={no_of_booking_number}
    type='number'
    disabled={is_search === true ? true : false}
    onChange={(e) => {
      const inputValue = e.target.value;
      
      // Update hasNoOfBookingTouched state if not already set
      if (!this.state.hasNoOfBookingTouched) {
        this.setState({ hasNoOfBookingTouched: true });
      }

      // Restrict input to two-digit numbers
      if (inputValue.length <= 2) {
        this.setState({ no_of_booking_number: inputValue });
        this.handleNoOfBookingChange(e);
      }
    }}
  />
</div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Booking Number', languageData)}</Label>
              <Input className={(hasNoOfBookingTouched && this.state.booking_number.length === 0) || ( hasNoOfBookingTouched && this.state.booking_number.length > 0 && parseInt(this.state.no_of_booking_number) !== this.state.booking_number.split(",")?.length) ? "error-border-paste" : "fontstyle text-background"}
                value={booking_number}
                disabled={is_search === true ? true : false}
                // onChange={(e) => this.setState({ booking_number: e.target.value })}
                onChange={this.handleBookingNumberChange}
              />
            </div>
           

           
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Amendment Due To', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <Select
                className={is_submit === true && amendment_dueto === '' ? "error-border-select" : "react-select fontstyle"}
                classNamePrefix="react-select"
                name="form-field-name"
                value={amendmentdueto_data.filter(option => option.value === amendment_dueto)}
                options={amendmentdueto_data}
                onChange={this.handleamendmentdueto}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Amendment Caused USER ID', languageData)}</Label>
              <Input className={"fontstyle text-background"}
                value={amendment_caused_userid} maxLength={7}
                onChange={(e) => this.setState({ amendment_caused_userid: e.target.value })}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Exception Type', languageData)}</Label>
              <Select
                className={"react-select fontstyle"}
                classNamePrefix="react-select"
                name="form-field-name"
                value={exceptiontype_data.filter(option => option.value === exception_type)}
                options={exceptiontype_data}
                onChange={this.handleexceptiontype}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Exception Reason', languageData)}
              {(is_submit === true && amendment_type.length ===0)  && <a className ="fontstyle mandatory-label">{onChangeLanguage(locale,'Mandatory Field',languageData)}</a>}</Label>
             
              <ReactMultiSelectCheckboxes  className = 'fontstyle' 
              value={exception_reason}
              onChange={(option) =>this.handleChangeExceptionReason(option)}
              // onChange={(option)=>  this.setState({exception_reason :option })}
              options={exception_reasonselect}
              getDropdownButtonLabel={({ placeholderButtonLabel, value }) => { if(value.length==0) {return "Select.."; }else{ var item = value.filter(item=>item.label.includes('Select All')); if(item.length!=0){ return (value.length-1)+" selected";} else {return value.length+" selected";}  }}}
            />
            </div>
            

            {/* <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Handover / Inquiry Reason',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select  
                                className={is_submit === true && inquiry_reason === ''?  "error-border-select":"react-select fontstyle" }
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={amendmentdueto_data.filter(option =>option.value === inquiry_reason)}
                                options={amendmentdueto_data}
                                onChange={this.handleinquiry_reason}
                            />
                      </div> */}
            {/* <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Last POD', languageData)}</Label>
              <Input className={"fontstyle text-background-paste"}
                value={last_pod}
                disabled={is_search === true ? true : false}
                onChange={(e) => this.setState({ last_pod: e.target.value })}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'End POD', languageData)}</Label>
              <Input className={ "fontstyle text-background-paste"}
                value={end_pod}
                disabled={is_search === true ? true : false}
                onChange={(e) => this.setState({ end_pod: e.target.value })}
              />
            </div> */}
            <div className="col-md-12 space-margin">
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
              onClick={() => this.onSubmit()} disabled={buttonDisabled}>
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
