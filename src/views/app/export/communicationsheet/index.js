import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label, Input, Button } from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import { createNotification } from '../../../../toast';
import { CommunicationlevelService } from '../../../../redux/Export/levelsheet/saga'
import { customtypeService } from '../../../../redux/Export/masters/customtype/saga'
import Workbook from 'react-excel-workbook'
import moment from 'moment';
import CustomRadioButton from '../../../RadioButton'
import { onChangeLanguage, getValue, convertLocalToUTCDate } from '../../../../helper'
import Loading from "react-fullscreen-loading";
import { getValue_communication } from '../pasteData'
import * as clipboard from "clipboard-polyfill/text";
import DatePickerDate from "../../datePickerDate";
import DatePickerTime from "../../timePicker";
import{teamService} from '../../../../redux/Export/masters/exportteam/saga'
import{oblactivityService} from '../../../../redux/Export/masters/oblactivity/saga'

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      process_type: '',
      from: '',
      subject: '',
      end_time: '',
      userid: '',
      customtype: '',
      remark: '',
      transmission_level: '',
      noofshipment: '',
      dp_voyage: '',
      pol: '',
      ssy: '',
      vesselname: '',
      arrivaldate: '',
      arrivaltime: '',
      custome_declaration: '',
      doc_cut_of: '',
      customtypedata: [],
      is_submit: false,
      received_time: '',
      start_time: new Date(),
      updated_start_time: new Date(),
      team_data:[],
      mtd_number:'',
      email_type:'',
      emailtype_data : [],
      oblactivity_data:[],
      customsactivity_data:[],
      isDataPasted: false,
      communicationcount:'',
      communicationcountlast:'',
      shipment_no:'',
      obl_activity:'',
      customs_activity:''
    };
  }
  componentDidMount() {
    // this.fetchData()
    this.fetchcustomeType()
    this.fetchteam()
    this.fetchemailType()
    this.fetchCommunicationCount()
    this.fetchOblactivity()
  }
  fetchCommunicationCount(){
    this.setState({loading:true})
    const {username} = this.props
    console.log(username)
    CommunicationlevelService.fetchcommunicationcount(username)
    .then((res) => {
       if(res.status)   { 
              let filterstatus = res.data;
              let lastdata = res.lastcount;
              this.setState({ 
                communicationcount:filterstatus, 
                communicationcountlast:lastdata     
              }) 
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})

}
  fetchteam() {
    this.setState({
        loading : true
      })
      teamService.fetchteams()
    .then((res) => {
        this.setState({loading:false})
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var teamlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.team_name ,value : (cusmaidid.id).toString()};
               });  
                this.setState({
                  team_data :  teamlist,
                })
             }
            
             })
             .catch((error) => { 
                this.setState({
                    loading : false
                  })
             }); 
    } 
    fetchemailType(){
      this.setState({
        loading : true  
      })
      teamService.fetchemailtypes()
      .then((res) => {
        this.setState({loading:false})
        if(res.status)   { 
          // let filterstatus = (res.data).filter(item => item.status === 1)
             var teamlist = res.data.map(function(cusmaidid) {

                  return  {label : cusmaidid.name ,value : (cusmaidid.name).toString()};
               });  
                this.setState({
                  emailtype_data :  teamlist,
                })
             }
             
      })
      .catch((error) => { 
        this.setState({
            loading : false
          })
     });
    } 
    fetchOblactivity(){
      this.setState({
        loading : true  
      })
      oblactivityService.fetchoblactivity()
      .then((res) => {
        this.setState({loading:false})
        if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1 && item.category == "OBL")

             var teamlist = filterstatus.map(function(cusmaidid) {

                  return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
               });  
                this.setState({
                  oblactivity_data :  teamlist,
                })

                let filterstatuss = (res.data).filter(item => item.status === 1 && item.category == "Customs")
          
                var teamlists = filterstatuss.map(function(cusmaidid) {
   
                     return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                  });  
                   this.setState({
                     customsactivity_data :  teamlists,
                   })

             }
             
      })
      .catch((error) => { 
        this.setState({
            loading : false
          })
     });
    }  
  fetchData() {
    this.setState({
      loading: true
    })
    CommunicationlevelService.fetchcommunicationlevel()
      .then((res) => {
        if (res.status) {
          this.setState({
            data: res.data,
          })
        }
        else {
          this.setState({ loading: false })
        }

      })
      .catch((error) => { });
    this.setState({ loading: false })
  }

  fetchcustomeType() {
    this.setState({
      loading: true
    })
    customtypeService.fetchcustomtype()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var customlist = filterstatus.map(function (cusmaidid) {
            return { label: cusmaidid.name, value: cusmaidid.id.toString() };
          });

          this.setState({
            customtypedata: customlist,
            loading: false
          })
        }
        else {
          this.setState({ loading: false })
        }
      })
      .catch((error) => { });
    this.setState({ loading: false })
  }
  handlecustomtype = (selectedOptions) => {
    this.setState({ customtype: selectedOptions.value })
  }
  onChangeFileUpload(files) {

  }
  onSubmit() {
    const { process_type, from, subject, customtype, remark, noofshipment,
      dp_voyage, pol, ssy, vesselname, arrivaldate, arrivaltime, custome_declaration, doc_cut_of, transmission_level,
      start_time, updated_start_time, received_time,team,mtd_number,email_type,obl_activity,shipment_no,customs_activity,port } = this.state;
    var is_fill = false
   
    if (process_type === 'Transmission') {
      if (from !== "" && received_time !== '' && start_time !== "" && subject !== "" && customtype !== '' && noofshipment !== ''
        && dp_voyage !== '' && pol !== '' && ssy !== '' && vesselname !== '' && arrivaldate !== ''
        && arrivaltime !== '' && custome_declaration !== '' && doc_cut_of !== '' && transmission_level !== ''&& team!=='') {
        is_fill = true
      }
    }
    else if (process_type === 'OBL Process') {
      if (obl_activity !== "" && team!=='' ) {
        is_fill = true;
      }
    }
    else if (process_type === 'Customs Transmission') {
      if (customs_activity !== "" && team!=='' ) {
        is_fill = true;
      }
    }
    else {
      if (from !== "" && received_time !== "" && subject !== ""&& team !=='') {
        is_fill = true
      }
    }
    if (is_fill === true) {
      
      const updated_end_time = new Date()
      var arrivaldates = (arrivaldate !== '' && arrivaldate !== null) ? moment(arrivaldate).format('MM/DD/YYYY') : ''
      var doc_cut_of_dates = (doc_cut_of !== '' && doc_cut_of !== null) ? moment(doc_cut_of).format('MM/DD/YYYY') : ''
      var receivedtimes = (received_time !== '' && received_time !== null) ? moment(received_time).format('MM/DD/YYYY hh:mm:ss a') : ''
      // alert(receivedDate)
      const { username } = this.props
      const end_time = new Date()

      this.setState({
        loading: true,
      })
      CommunicationlevelService.createcommunicationlevel(process_type, from, username, customtype, noofshipment,
        dp_voyage, pol, ssy, vesselname, arrivaldates, arrivaltime,
        custome_declaration, doc_cut_of_dates, subject, remark, transmission_level,mtd_number,shipment_no,obl_activity,customs_activity,port,email_type,
        convertLocalToUTCDate(start_time),
        convertLocalToUTCDate(end_time),
        convertLocalToUTCDate(updated_start_time),
        convertLocalToUTCDate(updated_end_time),
        receivedtimes,team)
        .then((res) => {
          this.setState({
            loading: false
          })
          if (res.status) {
            createNotification('Created', 'success', 'filled')
            this.clearvalue(true)
            this.fetchCommunicationCount()
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

  onchangeprocess(value) {

    var process_type = [...this.state.process_type]
    if (process_type.includes(value)) {
      process_type = process_type.filter(e => e !== value);
    }
    else {
      process_type.push(value)
    }
    this.setState({ process_type: process_type })
  }
  onchangetransmission(value) {

    var transmission = [...this.state.transmission_level]
    if (transmission.includes(value)) {
      transmission = transmission.filter(e => e !== value);
    }
    else {
      transmission.push(value)
    }
    this.setState({ transmission_level: transmission })
  }
  clearvalue(is_refresh) {
    this.setState({
      start_time: new Date(),
      updated_start_time: new Date(),
      from: '',
      subject: '',
      end_time: '',
      userid: '',
      customtype: '',
      remark: '',
      transmission_level: '',
      dp_voyage: '',
      pol: '',
      ssy: '',
      vesselname: '',
      arrivaldate: '',
      arrivaltime: '',
      custome_declaration: '',
      doc_cut_of: '',
      noofshipment: '',
      received_time: '',
      team:'',
      is_submit: false,
      mtd_number: '',
      shipment_no: '',
      email_type:'',
      obl_activity:'',
      port:'',
      customs_activity:''
    })
    // if (is_refresh === true) {
    //   this.setState({
    //     process_type: '',
    //   })
    // }
  }

  renderTemplate() {
    const { languageData, locale } = this.props
    const { data, customtypedata } = this.state
    var array = data.map(record => {
      return {
        'process_type': record.process_type,
        'Shipment_Number': record.no_of_shipment,
        'from': record.from,
        'team':record.team,
        'start_date': record.received_time,
        'end_date': record.end_date,
        'customs_type': getValue(customtypedata, 'value', 'label', record.customs_type),
        'subject': record.subject,
        'remarks': record.remarks,
        'transmission_level': record.transmission_level,
        'dp_voyage': record.dp_voyage,
        'pol': record.pol,
        'ssy': record.ssy,
        'vesselname': record.vesselname,
        'arrivaldate': record.arrivaldate,
        'arrivaltime': record.arrivaltime,
        'custome_declaration': record.custome_declaration,
        'doc_cut_of': record.doc_cut_of,
      };
    })
    return (

      <Workbook filename="Communication.xlsx" element={
        <Button className="button-width"
          style={{ width: '150px' }} color="secondary" >
          {onChangeLanguage(locale, 'Download', languageData)}
        </Button>
      }>
        <Workbook.Sheet data={array} name="Sheet A">
          <Workbook.Column label="Process Type" value="process_type" />
          <Workbook.Column label="Number of Shipment" value="Shipment_Number" />
          <Workbook.Column label="from" value="from" />
          <Workbook.Column label="team" value="team" />
          <Workbook.Column label="start_date" value="start_date" />
          <Workbook.Column label="end_date" value="end_date" />
          <Workbook.Column label="customs_type" value="customs_type" />
          <Workbook.Column label="subject" value="subject" />
          <Workbook.Column label="remarks" value="remarks" />
          <Workbook.Column label="transmission_level" value="transmission_level" />
          <Workbook.Column label="Dp_Voyage" value="db_voyage " />
          <Workbook.Column label="POL" value="pol" />
          <Workbook.Column label="SSY" value="ssy" />
          <Workbook.Column label="Vessel Name" value="vesselname" />
          <Workbook.Column label="Custom Declartion" value="custome_declaration" />
          <Workbook.Column label="Arrival Date" value="arrivaldate" />
          <Workbook.Column label="Arrival Time" value="arrivaltime" />
          <Workbook.Column label="Doc cut off" value="doc_cut_of" />


        </Workbook.Sheet>
      </Workbook>


    );
  }
  onChangetime(date) {

    this.setState({
      start_time: date,
      end_time: ''
    })
  }
  onChangeendtime(date) {
    this.setState({
      end_time: date
    })

  }
  validDate(date, title) {
    var date_value = '', isfill = false
    if (date && date !== null && date !== '') {

      var end_date = new Date(date)
      if (Object.prototype.toString.call(end_date) === "[object Date]") {
        if (isNaN(end_date.getTime())) {
          console.log("date is not valid")
        }
        else {
          date_value = end_date
          console.log("date is valid")
          isfill = true
        }
      } else {
        console.log("not a date")
      }

    }
    if (isfill === false) {
      createNotification(`Please Enter ${title} (MM/DD/YYYY)`, 'error', 'filled')
    }

    return date_value

  }
  
  
  async onPaste() {
    clipboard.readText().then((text) => {
      var record = getValue_communication(text)

      this.setState({
        from: record.from,
        // start_time:this.validDate(record.mail_received,'Start Date') ,
        // received_time: record.received_time,
        received_time: this.validDate(record.received_time, 'received_time'),
        subject: record.subject,
      })

    });
    this.setState({
      isDataPasted: true
  });
  }
  handleKeypress(e) {
    const characterCode = e.key
    if (characterCode === 'Backspace') return

    const characterNumber = Number(characterCode)
    if (characterNumber >= 0 && characterNumber <= 9) {
      if (e.currentTarget.value && e.currentTarget.value.length) {
        return
      } else if (characterNumber === 0) {
        e.preventDefault()
      }
    } else {
      e.preventDefault()
    }
  }
  onChangearrivaltime(time)
  {
    var times = moment(time).format('hh:mm a')
    this.setState({ arrivaltime :times })
  }
  render() {

    const { loading, process_type, from, end_time, customtype, noofshipment,isDataPasted ,
      subject, remark, transmission_level, dp_voyage, pol, ssy, vesselname, arrivaldate, arrivaltime,communicationcount,communicationcountlast,port,customs_activity,customsactivity_data,
      received_time, custome_declaration, doc_cut_of, customtypedata, team,team_data, is_submit,mtd_number,shipment_no,email_type,emailtype_data,oblactivity_data,obl_activity } = this.state
    const { match, languageData, locale, username } = this.props

    return (
      <>
        <title>{onChangeLanguage(locale, 'Communication & Transmission Level Sheet', languageData)}</title>
        {loading &&
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
        <Row>
          <Colxx xxs="12">
            <div className="row">
              <div className="col-md-8">
                <Breadcrumb heading={onChangeLanguage(locale, 'Communication & Transmission Level Sheet', languageData)} match={match} />
              </div>
              <div className = "col-md-2" >
                        <h2 style = {{marginTop:'15px'}}>Total EQ : {communicationcount}</h2>
                        </div>
                        <div className = "col-md-2">
                            <h2  style = {{marginTop:'15px'}}>Last EQ : {communicationcountlast}</h2>
                        </div>
              {/* <div className = "col-md-2">
                        <Button className = "button-width" color="primary" style= {{width :'100%'}}>
                            <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
                            <a style= {{margin :'0px'}} > Upload</a>
                            <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                                className = "filepicker_customButton"
                                style = {{width : '80%',marginLeft :'-56%'}}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
                        </Button>
                    </div> */}
              {/* <div className = "col-md-2" >
                        {this.renderTemplate()}
                    </div> */}
            </div>
            <Separator className="separator-margin" />
          </Colxx>
        </Row>
        <div>
          <div className="publishuser-card-component" style={{ marginBottom: '15px', borderRadius: '10px' }}>
            <div className="publish-title" >
              <Row>
                <Colxx xxs="4">
                  <Label className="fontstyle"
                    style={{ fontWeight: 700, fontSize: '15px' }}>{onChangeLanguage(locale, 'Process Type', languageData)}
                  </Label>
                </Colxx>
              </Row>
            </div>
            <div className="row" style={{ padding: '10px' }}>
              <p1 className='fontstyle mandatory-label'>{is_submit === true && process_type === '' && `${onChangeLanguage(locale, 'Mandatory Field', languageData)}`}</p1>
              <div className="col-md-2" style={{ marginTop: '10px' }}>
                <CustomRadioButton checked="Transmission" name={onChangeLanguage(locale, 'Transmission', languageData)} value={process_type}
                  onChangeRadio={(value) => {
                    this.setState({ process_type: value })
                    this.clearvalue(false)
                  }} />

              </div>
              <div className="col-md-2" style={{ marginTop: '10px' }}>
                <CustomRadioButton checked="Communication" name={onChangeLanguage(locale, 'Communication', languageData)} value={process_type}
                  onChangeRadio={(value) => {
                    this.setState({ process_type: value })
                    this.clearvalue(false)
                  }} />
              </div>
              <div className="col-md-3" style={{ marginTop: '10px' }}>
                <CustomRadioButton checked="Error Check Communication" name={onChangeLanguage(locale, 'Error Check Communication', languageData)} value={process_type}
                  onChangeRadio={(value) => {
                    this.setState({ process_type: value })
                    this.clearvalue(false)
                  }} />

              </div>
              <div className="col-md-2" style={{ marginTop: '10px' }}>
                <CustomRadioButton checked="OBL Process" name={onChangeLanguage(locale, 'OBL Process', languageData)} value={process_type}
                  onChangeRadio={(value) => {
                    this.setState({ process_type: value })
                    this.clearvalue(false)
                  }} />

              </div>
              <div className="col-md-2" style={{ marginTop: '10px' }}>
                <CustomRadioButton checked="Customs Transmission" name={onChangeLanguage(locale, 'Customs Transmission', languageData)} value={process_type}
                  onChangeRadio={(value) => {
                    this.setState({ process_type: value })
                    this.clearvalue(false)
                  }} />

              </div>
            </div>
          </div>
          {process_type !== '' && process_type !== 'OBL Process' && process_type !== 'Customs Transmission' &&

            <div className="publishuser-card-component" style={{ marginBottom: '15px', borderRadius: '10px' }}>
              <div className="publish-title" >
                <Row>
                  <Colxx xxs="4">
                    <Label className="fontstyle"
                      style={{ fontWeight: 700, fontSize: '15px' }}>{onChangeLanguage(locale, process_type, languageData)}
                    </Label>
                  </Colxx>
                </Row>
              </div>
              <div className="row" style={{ padding: '10px' }}>
                <div className="col-lg-2 space-margin">
                  <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'User ID', languageData)}
                    <br></br> {username}</Label>
                </div>

                
                <div className="col-lg-2 space-margin">
                  <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'From', languageData)}
                    <a style={{ color: 'red' }}>*</a></Label>
                  <Input
                    className={is_submit === true && from === '' ? "error-border" : "fontstyle text-background-paste"}
                    disabled={isDataPasted} 
                    value={from}
                    onChange={(e) => this.setState({ from: e.target.value })}
                  />
                </div>

                <div className="col-lg-2">
                  <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Start Date', languageData)}
                    <a style={{ color: 'red' }}>*</a>
                  </Label>
                  <Input
                    className={is_submit === true && received_time === '' ? "error-border" : "fontstyle text-background-paste"}
                    type="text"
                    placeholder=''
                    disabled={isDataPasted} 
                    value={received_time}
                    onChange={(e) => this.setState({ received_time: e.target.value })}
                  />
                  {/* {is_submit === true && start_time === '' &&   
                          <p1 className = 'fontstyle mandatory-label'> {onChangeLanguage(locale,'Mandatory Field',languageData)} </p1>}
                            <DatePicker
                                 selected={start_time}
                                 className = "text-background-paste" 
                                 onChange={(date) => this.onChangetime(date)}
                                 /> */}
                </div>
                <div className="col-lg-2 space-margin">
                  <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'End Date', languageData)}
                    <br></br> {end_time !== '' && moment(end_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                  {/* {is_submit === true && end_time === '' &&   <p1 className = 'fontstyle mandatory-label'> {onChangeLanguage(locale,'Mandatory Field',languageData)} </p1>}
                               <DatePicker
                                 selected={end_time}
                                 min_date = {start_time}
                                 className = "text-background" 
                                 onChange={(date) => this.onChangeendtime(date)}
                                 /> */}
                </div>
                <div className = "col-lg-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Team',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                                <Select  
                            className = {is_submit === true && team === ''?  "error-border-select-paste":"react-select fontstyle" } 
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={team_data.filter(option =>option.value === team)}
                            options={team_data}
                            onChange={({value}) => this.setState({  team: value })}
                        />
                        </div>
                {process_type === 'Communication' &&
                  <div className="col-lg-2 space-margin">
                    <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'MTD Number', languageData)}
                      <a style={{ color: 'red' }}>*</a></Label>
                    <Input
                      className={is_submit === true && mtd_number === '' ? "error-border" : "fontstyle text-background"}
                      value={mtd_number}
                      onChange={(e) => this.setState({ mtd_number: e.target.value })}
                    />
                  </div>
                }
                {process_type === 'Communication' &&
                  <div className="col-lg-2 space-margin">
                    <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Email Type',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                                <Select  
                            className = {is_submit === true && email_type === ''?  "error-border-select-paste":"react-select fontstyle" } 
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={emailtype_data.filter(option =>option.value === email_type)}
                            options={emailtype_data}
                            // value={selectValues.filter(option =>(option.value).toLowerCase() === email_type.toLowerCase())}
                            // options={selectValues}
                            onChange={({value}) => this.setState({  email_type: value })}
                        />
                  </div>
                } 
                {process_type === 'Transmission' &&
                  <div className="col-md-6">
                    <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Customs Type', languageData)}
                      <a style={{ color: 'red' }}>*</a></Label>
                    <Select
                      style={{ height: '85px' }}
                      className={is_submit === true && customtype === '' ? "error-border-select" : "react-select fontstyle"}
                      classNamePrefix="react-select"
                      name="form-field-name"
                      value={customtypedata.filter(option => option.value === customtype)}
                      options={customtypedata}
                      onChange={this.handlecustomtype} />
                  </div>}
                {process_type === 'Transmission' &&
                  <div className="col-md-6 space-margin">
                    <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'No. of Shipment', languageData)}
                      <a style={{ color: 'red' }}>*</a></Label>
                    <Input
                      className={is_submit === true && noofshipment === '' ? "error-border" : "fontstyle text-background"}
                      type="number" min="0" step='1'
                      placeholder=''
                      onKeyDown={this.handleKeypress}
                      value={noofshipment}
                      onChange={(e) => this.setState({ noofshipment: e.target.value })}
                    />
                  </div>
                }
               {process_type !== 'Communication' && 
                <div className="col-md-6 space-margin">
                  <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Subject', languageData)}
                    <a style={{ color: 'red' }}>*</a></Label>
                  <textarea
                    className={is_submit === true && subject === '' ? "border-textarea-background-paste" : "fontstyle textarea-background-paste"}
                    placeholder=''
                    value={subject}
                    disabled={isDataPasted} 
                    onChange={(e) => this.setState({ subject: e.target.value })}
                  />
                </div>
              }
              {process_type !== 'Communication' &&
                <div className="col-md-6 space-margin">
                  <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Remarks', languageData)}
                  </Label>
                  <textarea
                    className={"fontstyle textarea-background"}
                    placeholder=''
                    value={remark}
                    onChange={(e) => this.setState({ remark: e.target.value })}
                  />
                </div>
              }
             {process_type === 'Communication' &&
                <div className="col-md-5 space-margin">
                  <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Subject', languageData)}
                    <a style={{ color: 'red' }}>*</a></Label>
                  <textarea
                    className={is_submit === true && subject === '' ? "border-textarea-background-paste" : "fontstyle textarea-background-paste"}
                    placeholder=''
                    value={subject}
                    disabled={isDataPasted} 
                    onChange={(e) => this.setState({ subject: e.target.value })}
                  />
                </div>
              }
              {process_type === 'Communication' && 
                <div className="col-md-5 space-margin">
                  <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Remarks', languageData)}
                  </Label>
                  <textarea
                    className={"fontstyle textarea-background"}
                    placeholder=''
                    value={remark}
                    onChange={(e) => this.setState({ remark: e.target.value })}
                  />
                </div>
              }


              </div>
            </div>
          }


{process_type !== '' && process_type !== 'Transmission' && process_type !== 'Communication' && process_type !== 'Error Check Communication' &&

<div className="publishuser-card-component" style={{ marginBottom: '15px', borderRadius: '10px' }}>
  <div className="publish-title" >
    <Row>
      <Colxx xxs="4">
        <Label className="fontstyle"
          style={{ fontWeight: 700, fontSize: '15px' }}>{onChangeLanguage(locale, process_type, languageData)}
        </Label>
      </Colxx>
    </Row>
  </div>
  <div className="row" style={{ padding: '10px' }}>
    <div className="col-lg-3 space-margin">
      <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'User ID', languageData)}
        <br></br> {username}</Label>
    </div>

    
    <div className="col-lg-3 space-margin">
      <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Shipment Number', languageData)}</Label>
      <Input
        className="fontstyle text-background"
        value={shipment_no}
        onChange={(e) => this.setState({ shipment_no: e.target.value })}
      />
    </div>

    <div className="col-lg-3 space-margin">
      <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'MTD Number', languageData)}</Label>
      <Input
        className="fontstyle text-background"
        value={mtd_number}
        onChange={(e) => this.setState({ mtd_number: e.target.value })}
      />
    </div>
    {process_type === 'OBL Process' && 
    <div className = "col-lg-3 space-margin"  >
        <Label  className = "fontstyle normal-font" >
            {onChangeLanguage(locale,'OBL Activity',languageData)}
            <a style = {{color :'red'}}>*</a></Label>
            <Select  
        className = {is_submit === true && obl_activity === ''?  "error-border-select":"react-select fontstyle" } 
        classNamePrefix="react-select"
        name="form-field-name"
        value={oblactivity_data.filter(option =>option.value === obl_activity)}
        options={oblactivity_data}
        onChange={({value}) => this.setState({  obl_activity: value })}
    />
    </div>
  }
   {process_type === 'Customs Transmission' && 
          <div className = "col-lg-3 space-margin"  >
                  <Label  className = "fontstyle normal-font" >
                      {onChangeLanguage(locale,'Customs Activity',languageData)}
                      <a style = {{color :'red'}}>*</a></Label>
                      <Select  
                  className = {is_submit === true && customs_activity === ''?  "error-border-select":"react-select fontstyle" } 
                  classNamePrefix="react-select"
                  name="form-field-name"
                  value={customsactivity_data.filter(option =>option.value === customs_activity)}
                  options={customsactivity_data}
                  onChange={({value}) => this.setState({  customs_activity: value })}
              />
              </div>
              }
               <div className = "col-lg-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Team',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                                <Select  
                            className = {is_submit === true && team === ''?  "error-border-select-paste":"react-select fontstyle" } 
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={team_data.filter(option =>option.value === team)}
                            options={team_data}
                            onChange={({value}) => this.setState({  team: value })}
                        />
                        </div>
    {process_type === 'Customs Transmission' && 
                <div className="col-md-3 space-margin">
                  <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'DP Voyage', languageData)}
                  </Label>
                  <Input
                    className="fontstyle text-background"
                    value={dp_voyage}
                    onChange={(e) => this.setState({ dp_voyage: e.target.value })}
                  />
                </div>
              }

          {process_type === 'Customs Transmission' && 
                <div className="col-md-3 space-margin">
                  <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Port', languageData)}
                  </Label>
                  <Input
                    className="fontstyle text-background"
                    value={port}
                    onChange={(e) => this.setState({ port: e.target.value })}
                  />
                </div>
              }
         
  </div>
</div>
}



          
          {process_type === 'Transmission' &&
            <div className="publishuser-card-component" style={{ borderRadius: '10px' }}>
              <div className="publish-title" >
                <Row>
                  <Colxx xxs="12">
                    <Label className="fontstyle"
                      style={{ fontWeight: 700, fontSize: '15px' }}>{onChangeLanguage(locale, 'Transmission level', languageData)}
                    </Label>
                  </Colxx>
                </Row>
              </div>
              <div className="row" style={{ padding: '10px' }}>
                <div className="col-md-2" style={{ marginTop: '10px' }}>
                  <CustomRadioButton checked="Initial" name={onChangeLanguage(locale, 'Initial', languageData)} value={transmission_level}
                    onChangeRadio={(value) => this.setState({ transmission_level: value })} />
                </div>
                <div className="col-md-2" style={{ marginTop: '10px' }}>
                  <CustomRadioButton checked="Intermediate" name={onChangeLanguage(locale, 'Intermediate', languageData)} value={transmission_level}
                    onChangeRadio={(value) => this.setState({ transmission_level: value })} />

                </div>
                <div className="col-md-2" style={{ marginTop: '10px' }}>
                  <CustomRadioButton checked="Error Check" name={onChangeLanguage(locale, 'Error Check', languageData)} value={transmission_level}
                    onChangeRadio={(value) => this.setState({ transmission_level: value })} />

                </div>
                <div className="col-md-2" style={{ marginTop: '10px' }}>
                  <CustomRadioButton checked="Final" name={onChangeLanguage(locale, 'Final', languageData)} value={transmission_level}
                    onChangeRadio={(value) => this.setState({ transmission_level: value })} />
                </div>
              </div>
              <div className="row" style={{ padding: '10px' }}>
                <div className="col-md-3 space-margin">
                  <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'DP Voyage', languageData)}
                    <a style={{ color: 'red' }}>*</a></Label>
                  <Input
                    className={is_submit === true && dp_voyage === '' ? "error-border" : "fontstyle text-background"}
                    value={dp_voyage}
                    onChange={(e) => this.setState({ dp_voyage: e.target.value })}
                  />
                </div>
                <div className="col-md-3 space-margin">
                  <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'PoL', languageData)}
                    <a style={{ color: 'red' }}>*</a></Label>
                  <Input
                    className={is_submit === true && pol === '' ? "error-border" : "fontstyle text-background"}
                    value={pol}
                    onChange={(e) => this.setState({ pol: e.target.value })}
                  />
                </div>

                <div className="col-md-3 space-margin">
                  <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'SSY', languageData)}
                    <a style={{ color: 'red' }}>*</a></Label>
                  <Input
                    className={is_submit === true && ssy === '' ? "error-border" : "fontstyle text-background"}
                    value={ssy}
                    onChange={(e) => this.setState({ ssy: e.target.value })}
                  />
                </div>
                <div className="col-md-3 space-margin">
                  <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Vessel Name', languageData)}
                    <a style={{ color: 'red' }}>*</a></Label>
                  <Input
                    className={is_submit === true && vesselname === '' ? "error-border" : "fontstyle text-background"}
                    value={vesselname}
                    onChange={(e) => this.setState({ vesselname: e.target.value })}
                  />
                </div>
                <div className="col-md-3 space-margin">
                  <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Arrival Date', languageData)}                            <a style={{ color: 'red' }}>*</a></Label>

                  <DatePickerDate
                    selected={arrivaldate}
                    className="text-background"
                    onChange={(date) => this.setState({ arrivaldate: date })}
                  />
                </div>

              
                <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Arrival Time',languageData)} <a style = {{color :'red'}}>*</a></Label>
                                <a className = 'fontstyle mandatory-label'>
                                {is_submit === true && arrivaltime === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>
                                <br></br>
                                <DatePickerTime
                                    selected={arrivaltime}
                                    dateFormat= "hh:mm a"
                                    onChange={(time) => this.onChangearrivaltime(time)}
                                />                          
                                                          
                        </div>
                       

                <div className="col-md-3 space-margin">
                  <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Custom Declaration', languageData)}
                    <a style={{ color: 'red' }}>*</a></Label>
                  <Input
                    className={is_submit === true && custome_declaration === '' ? "error-border" : "fontstyle text-background"}
                    value={custome_declaration}
                    onChange={(e) => this.setState({ custome_declaration: e.target.value })}
                  />
                </div>
                <div className="col-md-3 space-margin">
                  <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Doc Cut off', languageData)}
                    <a style={{ color: 'red' }}>*</a></Label>

                  <DatePickerDate
                    selected={doc_cut_of}
                    className="text-background"
                    onChange={(date) => this.setState({ doc_cut_of: date })}
                  />
                </div>




              </div>

            </div>
          }
          {process_type !== '' &&
            <div className="row text-center">             
                  <Button
                    className="button-width" color="secondary"
                    onClick={() => this.onPaste()}>
                    {onChangeLanguage(locale, 'Paste', languageData)}
                  </Button>               
                  <Button className="button-width" color="primary"                    
                    onClick={() => this.onSubmit()} >
                    {onChangeLanguage(locale, 'Save', languageData)}
                  </Button>
                  <Button className="button-width"                    
                    color="secondary"
                    onClick={() => this.clearvalue(true)}>
                    {onChangeLanguage(locale, 'Refresh', languageData)}
                  </Button>
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

  })(Sidebar)
);

