import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label, Input, Button } from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import DatePickerss from "../../datePicker";
import "react-datepicker/dist/react-datepicker.css";
import { createNotification } from '../../../../toast';
import { DgService } from '../../../../redux/dgtt/dg/saga'
import { onChangeLanguage, convertLocalToUTCDate, convertUTCToLocalDate, getValue,Date_Different } from '../../../../helper'
import Loading from "react-fullscreen-loading";
import moment from 'moment';
import { inputstatusService } from '../../../../redux/dgtt/inputstatus/saga'
import { AreaService } from '../../../../redux/dgtt/dgarea/saga'
import{timezoneService} from '../../../../redux/timezone/saga'
import { dectypeService } from '../../../../redux/dgtt/dectype/saga'
import { containertypeService } from '../../../../redux/dgtt/containertype/saga'


class QueryResolveSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipment: '',
      no_of_container: '',
      status: '',
      cargoes: '',
      userid: '',
      startdate: '',
      enddate: '',
      inputstatus: '',
      inputstatusdata: [],
      pendingreason: '',
      ap: '',
      announcement: '',
      query: '',
      containerno: '',
      area: '',
      timezone: '',
      timezonedata: [],
      areadata: [],
      dectype: '',
      dectypedata: [],
      cntrtype: '',
      cntrtypedata: [],
      category: '',
      enddate: '',
      userid: '',
      team: '',
      mailrecevieddate: '',
      loading: false,
      is_submit: false,
      start_time: new Date(),
      updated_start_time: new Date(),
      dginpucount:'',
      dginputcountlast:''
    };
  }
  componentDidMount() {

    
    this.setState({
      startdate: moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
    })
   
    this.fetcharea()
    this.fetchinputstatus()
    this.fetchdectype()
    this.fetchcontainertype()
    this.fetchtimezone()
    this.fetchdginputcount()
  }
  fetchdginputcount(){
    this.setState({loading:true})
    const {username} = this.props
    // console.log(username)
    DgService.fetchdginputcount(username)
    .then((res) => {
       if(res.status)   { 
              let filterstatus = res.data;
              let lastdata = res.lastcount;
              this.setState({ 
                dginpucount:filterstatus, 
                dginpucountlast:lastdata     
              }) 
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})

}
  fetcharea() {
    this.setState({ loading: true })
    AreaService.fetcharea()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return { label: cusmaidid.name, value: cusmaidid.id.toString() };
          });
          this.setState({
            areadata: regionlist
          })

        }
        else {
          this.setState({ loading: false })
        }
      })
      .catch((error) => { });
    this.setState({ loading: false })
  }
  fetchtimezone() {
    this.setState({ loading: true })
    timezoneService.fetchtimezone()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return { label: cusmaidid.code, value: cusmaidid.code};
          });
          this.setState({
            timezonedata: regionlist
          })

        }
        else {
          this.setState({ loading: false })
        }
      })
      .catch((error) => { });
    this.setState({ loading: false })
  }

  fetchinputstatus() {
    this.setState({ loading: true })
    inputstatusService.fetchinputstatus()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return { label: cusmaidid.name, value: cusmaidid.id.toString() };
          });
          this.setState({
            inputstatusdata: regionlist
          })

        }
        else {
          this.setState({ loading: false })
        }
      })
      .catch((error) => { });
    this.setState({ loading: false })
  }
  fetchdectype() {
    this.setState({ loading: true })
    dectypeService.fetchdectype()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return { label: cusmaidid.name, value: cusmaidid.id.toString() };
          });
          this.setState({
            dectypedata: regionlist
          })

        }
        else {
          this.setState({ loading: false })
        }
      })
      .catch((error) => { });
    this.setState({ loading: false })
  }
  fetchcontainertype() {
    this.setState({ loading: true })
    containertypeService.fetchcontainertype()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return { label: cusmaidid.name, value: cusmaidid.id.toString() };
          });
          this.setState({
            cntrtypedata: regionlist
          })

        }
        else {
          this.setState({ loading: false })
        }
      })
      .catch((error) => { });
    this.setState({ loading: false })
  }
  fetchData() {
    const { shipment,mailrecevieddate } = this.state
  let  mailrecevieddate1 = moment(convertUTCToLocalDate(mailrecevieddate)).format('MM/DD/YYYY hh:mm:ss a')
    if (shipment !== "" && mailrecevieddate!=='') {
      this.setState({
        loading: true,
        is_submit: false
      })
      DgService.fetchIndividualIndexingsheet(shipment,mailrecevieddate1)
        .then((res) => {

          this.setState({ loading: false })
          this.clearvalue()
          if (res.status) {
            this.setValue(res.data)
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
      createNotification('Please Enter Shipment Number and Mail Received Date & Time', 'error', 'filled')
    }
  }
  setValue(record) {

    if (record !== null && record) {
      this.setState({
        shipment: record.shipment_no,
        no_of_container: record.no_of_container,
        cargoes: record.no_of_cargoes,
        userid: record.user_id,
        startdate: record.start_date,
        enddate: record.end_date,
        inputstatus: record.input_status,
        pendingreason: record.pending_reason,
        announcement: record.announcement_datetime,
        query: record.query,
        containerno: record.container_no,
        area: record.area,
        dectype: record.dec_type,
        cntrtype: record.container_type,
        mailrecevieddate: convertLocalToUTCDate(record.mail_recived_datetime),
        timezone: (record.timezone && record.timezone !== null)? record.timezone : '',
        // mailrecevieddate:record.start_date
      })
      
    }

  }
  clearvalue() {

    this.setState({
      startdate: moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
      shipment: '',
      no_of_container: '',
      status: '',
      cargoes: '',
      userid: '',
      enddate: '',
      inputstatus: '',
      pendingreason: '',
      ap: '',
      announcement: '',
      query: '',
      containerno: '',
      area: '',
      dectype: '',
      cntrtype: '',
      category: '',
      enddate: '',
      userid: '',
      team: '',
      mailrecevieddate: '',
      timezone:'',
      is_submit: false,

    })
  }
  onPaste() {
    navigator.clipboard.readText().then((text) => {
      console.log("lkbkjj", text)
      console.log("lkbkjj", typeof text)

    })
  }
  onCopy() {
    navigator.clipboard.writeText(this.state.shipment)
  }
  handlearea = (selectedOptions) => {
    this.setState({ area: selectedOptions.value })
  }
  handledectype = (selectedOptions) => {
    this.setState({ dectype: selectedOptions.value })
  }
  handleinputstatue = (selectedOptions) => {
    const { inputstatusdata } = this.state
    this.setState({
      inputstatus: selectedOptions.value,
    })
  }
  handlecntrtype = (selectedOptions) => {
    this.setState({ cntrtype: selectedOptions.value })
  }
  onSubmit() {
    const { shipment, no_of_container, cargoes, inputstatusdata, inputstatus, pendingreason, announcement, query, containerno, area,
      dectype, cntrtype, startdate, enddate, mailrecevieddate, updated_start_time,timezone } = this.state;
    const end_datetime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
    var is_fill = false
    const is_announcement = getValue(inputstatusdata, 'value', 'label',inputstatus)
    if (is_announcement === "Complete") {
      if (shipment !== "" && area !== "" && dectype !== "" && cntrtype !== "" && no_of_container !== ""
        && cargoes !== "" && mailrecevieddate !== "" && startdate !== "" && inputstatus !== "" && containerno !== "" && announcement !== '' && timezone !== '') {
        is_fill = true
      }
    }
    else {
      if (shipment !== "" && area !== "" && dectype !== "" && cntrtype !== "" && no_of_container !== ""
        && cargoes !== "" && mailrecevieddate !== "" && startdate !== "" && inputstatus !== "" && containerno !== "") {
        is_fill = true
      }
    }

    if (is_fill === true) {
      const { username } = this.props
      let start_time = startdate
      this.setState({
        enddate: end_datetime,
        userid: username
      })
      let end_date = convertLocalToUTCDate(new Date()),
        start_date = convertLocalToUTCDate(updated_start_time),
        updatedstarttime = convertLocalToUTCDate(updated_start_time),
        updated_end_time = convertLocalToUTCDate(new Date()),
        mailrecevieddate1 = moment(convertUTCToLocalDate(mailrecevieddate)).format('MM/DD/YYYY hh:mm:ss a')

      this.createAPI(shipment, area, dectype, cntrtype, no_of_container, cargoes, mailrecevieddate1, startdate, end_datetime, username,
        inputstatus, announcement, pendingreason, containerno, query,timezone, start_date, end_date, updatedstarttime, updated_end_time)


    }
    else {
      this.setState({
        is_submit: true
      })
      createNotification('Please fill mandatory field', 'error', 'filled')
    }
  }
  createAPI(shipment, area, dectype, cntrtype, no_of_container, cargoes, mailrecevieddate, startdate, enddate, userid,
    inputstatus, announcement, pendingreason, containerno, query,timezone, start_date, end_date, updatedstarttime, updated_end_time) {
    this.setState({
      loading: true
    })
    DgService.createdg(shipment, area, dectype, cntrtype, no_of_container, cargoes, mailrecevieddate, startdate, enddate, userid,
      inputstatus, announcement, pendingreason, containerno, query,timezone, start_date, end_date, updatedstarttime, updated_end_time)
      .then((res) => {
        this.setState({
          loading: false
        })
        if (res.status) {
          createNotification('Created', 'success', 'filled')
          this.setState({
            startdate: moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
            shipment: '',
            no_of_container: '',
            status: '',
            cargoes: '',
            userid: '',
            enddate: '',
            inputstatus: '',
            pendingreason: '',
            ap: '',
            announcement: '',
            query: '',
            containerno: '',
            area: '',
            dectype: '',
            cntrtype: '',
            category: '',
            enddate: '',
            userid: '',
            team: '',
            mailrecevieddate: '',
            is_submit: false,

          })
          this.fetchdginputcount()
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
  onChangetime(date) {
    this.setState({
      mailrecevieddate: date,
    })
  }
  onChangeannouncement1(date) {
    console.log("jhvhjvhj date " ,date)
    const { timezone } = this.state
    if (timezone !== '') {
      console.log("jhvhjvhj timezone " ,  timezone)
     const  todayDateTime =  this.convertTZ(date, timezone)
     
     console.log("jhvhjvhj todayDateTime " ,todayDateTime)
      var seconds = (new Date(date).getTime() - todayDateTime.getTime()) / 1000;
     console.log("jhvhjvhj seconds = " ,seconds)
     var t = new Date(date);
      t.setSeconds(t.getSeconds() + seconds);
    console.log("jhvhjvhj  add " ,t)
      var dtes =  moment(t).format('MM/DD/YYYY hh:mm:ss A')
      console.log("jhvhjvhj  dtes " ,dtes)
      if(this.validDate(dtes) !== '')
      {
        this.setState({
          announcement:  dtes,
        })
      }

    }

  }
  validDate(date)
  {
     var date_value = '',isfill = false
      if(date && date !== null && date !== '')
      {
         
         var end_date =  new Date(date)
         if (Object.prototype.toString.call(end_date) === "[object Date]") {
             if (isNaN(end_date.getTime())) 
             { 
                 console.log("date is not valid")
             } 
             else 
             {
                 date_value = end_date
                 console.log("date is valid")
                 isfill = true
             }
           } else 
           {
              console.log("not a date")
           }

      }
      // if(isfill === false)
      // {
      //    createNotification(`Please Enter Valid Date`,'error','filled') 
      // }
      return date_value
  }
  convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
   }
  onChangeannouncement(date) {
    console.log("jhvhjvhj date " ,date)
    const { timezone } = this.state
    if (timezone !== '') {
      console.log("jhvhjvhj timezone " ,  timezone)
     const  todayDateTime =  this.convertTZ(date, timezone)
     
     console.log("jhvhjvhj todayDateTime " ,todayDateTime)
      var seconds = (date.getTime() - todayDateTime.getTime()) / 1000;
     console.log("jhvhjvhj seconds = " ,seconds)
     var t = date;
      t.setSeconds(t.getSeconds() + seconds);
    console.log("jhvhjvhj  add " ,t)
    var dtes =  moment(t).format('MM/DD/YYYY hh:mm:ss a')
    console.log("jhvhjvhj  dtes " ,dtes)
   
      this.setState({
        announcement: t,
      })
    }
  }
  
  render() {
    const { match, languageData, locale, username } = this.props
    const { shipment, no_of_container, cargoes, userid, inputstatus, pendingreason, announcement, query, containerno, area,dginpucount,dginpucountlast,
      dectype, cntrtype, startdate, enddate, mailrecevieddate, inputstatusdata, cntrtypedata, areadata, dectypedata, loading,
       is_submit, timezonedata, timezone } = this.state
    return (
      <>
        <title>{onChangeLanguage(locale, 'DG', languageData)}</title>
        {loading &&
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
        <Row>
          <Colxx xxs="12">
          <div className="row">
                  <div className="col-md-8">
                    <Breadcrumb heading={onChangeLanguage(locale, 'DG', languageData)} match={match} />
                  </div>
                  <div className = "col-md-2" >
                  <h2 style = {{marginTop:'15px'}}>Total EQ : {dginpucount}</h2>
                  </div>
                  <div className = "col-md-2">
                      <h2  style = {{marginTop:'15px'}}>Last EQ : {dginpucountlast}</h2>
                  </div>
            </div>
            
            <Separator className="separator-margin" />
          </Colxx>
        </Row>
        <div>
          <div className="publishuser-card-component" style={{ padding: '10px', borderRadius: '10px', marginBottom: '30px' }}>
            <div className="row" >
              <div className="col-md-4 space-margin">
                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Start Date', languageData)}
                  <br></br>{startdate}</Label>
              </div>
              <div className="col-md-4 space-margin">
                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'End Date', languageData)}
                  <br></br>{enddate}</Label>

              </div>
              <div className="col-md-4 space-margin">
                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'User ID', languageData)}
                  <br></br>{username}</Label>

              </div>
              <div className="col-md-4 space-margin">
                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Shipment Number.', languageData)}
                  <a style={{ color: 'red' }}>*</a></Label>
                <Input
                  className={is_submit === true && shipment === '' ? "error-border" : "fontstyle text-background"}
                  placeholder=''
                  value={shipment}
                  onChange={(e) => this.setState({ shipment: e.target.value })}
                />
              </div>
              <div className="col-md-4 space-margin">
                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Area', languageData)}
                  <a style={{ color: 'red' }}>*</a></Label>
                <Select
                  className={is_submit === true && area === '' ? "error-border-select-paste" : "react-select fontstyle"}
                  style={{ height: '85px' }}
                  classNamePrefix="react-select"
                  name="form-field-name"
                  value={areadata.filter(option => option.value === area)}
                  options={areadata}
                  onChange={this.handlearea}
                />
              </div>
              <div className="col-md-4 space-margin">
                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Dec Type', languageData)}
                  <a style={{ color: 'red' }}>*</a></Label>
                <Select
                  style={{ height: '85px' }}
                  className={is_submit === true && dectype === '' ? "error-border-select-paste" : "react-select fontstyle"}
                  classNamePrefix="react-select"
                  name="form-field-name"
                  value={dectypedata.filter(option => option.value === dectype)}
                  options={dectypedata}
                  onChange={this.handledectype}
                />
              </div>
              <div className="col-md-4 space-margin">
                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Container Type', languageData)}
                  <a style={{ color: 'red' }}>*</a></Label>
                <Select
                  style={{ height: '85px' }}
                  className={is_submit === true && cntrtype === '' ? "error-border-select-paste" : "react-select fontstyle"}
                  classNamePrefix="react-select"
                  name="form-field-name"
                  value={cntrtypedata.filter(option => option.value === cntrtype)}
                  options={cntrtypedata}
                  onChange={this.handlecntrtype}
                />
              </div>
              <div className="col-md-4 space-margin">
                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'No. of Container', languageData)}
                  <a style={{ color: 'red' }}>*</a></Label>
                <Input
                  className={is_submit === true && no_of_container === '' ? "error-border" : "fontstyle text-background"}
                  placeholder=''
                  type = "number" min="0" 
                  value={no_of_container}
                  onChange={(e) => this.setState({ no_of_container: e.target.value })}
                />
              </div>
              <div className="col-md-4 space-margin">
                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'No. of Cargoes', languageData)}
                  <a style={{ color: 'red' }}>*</a></Label>
                <Input
                  className={is_submit === true && cargoes === '' ? "error-border" : "fontstyle text-background"}
                  value={cargoes}
                  type = "number" min="0" 
                  onChange={(e) => this.setState({ cargoes: e.target.value })} ></Input>
              </div>
              <div className="col-md-4 space-margin">
                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Mail Received Date & Time', languageData)}
                  <a style={{ color: 'red' }}>*</a></Label>
                {is_submit === true && mailrecevieddate === '' &&
                  <p1 className='fontstyle mandatory-label'>
                    {onChangeLanguage(locale, 'Mandatory Field', languageData)}
                  </p1>}
                <DatePickerss
                  selected={mailrecevieddate}
                  className="text-background"
                  onChange={(date) => this.onChangetime(date)}
                />
                
              </div>
              <div className="col-md-4 space-margin">
                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Input Status', languageData)}
                  <a style={{ color: 'red' }}>*</a></Label>
                <Select
                  style={{ height: '85px' }}
                  className={is_submit === true && inputstatus === '' ? "error-border-select-paste" : "react-select fontstyle"}
                  classNamePrefix="react-select"
                  name="form-field-name"
                  value={inputstatusdata.filter(option => option.value === inputstatus)}
                  options={inputstatusdata}
                  onChange={this.handleinputstatue}
                />
              </div>
              {getValue(inputstatusdata,'value','label',inputstatus) !== "Complete" &&
                <div className="col-md-4 space-margin">
                  <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Pending Reason', languageData)}</Label>
                  <Input
                    className={"fontstyle text-background"}
                    placeholder=''
                    value={pendingreason}
                    onChange={(e) => this.setState({ pendingreason: e.target.value })}
                  />
                </div>
              }
              {getValue(inputstatusdata,'value','label',inputstatus) === "Complete" &&
                <div className="col-md-4 space-margin">
                  <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Time Zone', languageData)}
                    <a style={{ color: 'red' }}>*</a></Label>
                  <Select
                    className={is_submit === true && timezone === '' ? "error-border-select-paste" : "react-select fontstyle"}
                    style={{ height: '85px' }}
                    classNamePrefix="react-select"
                    name="form-field-name"
                    value={timezonedata.filter(option => option.value === timezone)}
                    options={timezonedata}
                    onChange={({value}) => this.setState({timezone:value,announcement:''})}

                  />
                </div>
              }
              {getValue(inputstatusdata,'value','label',inputstatus) === "Complete" && 

                <div className="col-md-4 space-margin">
                  <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Announcement Date & Time', languageData)}
                    <a style={{ color: 'red' }}>*</a></Label>
                  {is_submit === true && announcement === '' &&
                    <p1 className='fontstyle mandatory-label'>
                      {onChangeLanguage(locale, 'Mandatory Field', languageData)}
                    </p1>}
                      <Input 
                        placeholder = "MM/DD/YYYY hh:mm:ss AM/PM"
                        className={is_submit === true && announcement === '' ? "error-border" : "fontstyle text-background"}
                        value={announcement}
                        onChange={(e) => this.onChangeannouncement1(e.target.value)}
                      />
                </div>
              }
              <div className="col-md-4 space-margin">
                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Container No.', languageData)}
                  <a style={{ color: 'red' }}>*</a></Label>
                <Input
                  className={is_submit === true && containerno === '' ? "error-border" : "fontstyle text-background"}
                  placeholder=''
                  value={containerno}
                  onChange={(e) => this.setState({ containerno: e.target.value })}
                />
              </div>
              <div className="col-md-12 space-margin">
                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Query', languageData)}
                </Label>
                <textarea
                  className={"fontstyle textarea-background"}
                  placeholder=''
                  value={query}
                  onChange={(e) => this.setState({ query: e.target.value })}
                />
              </div>
            </div>
            <div className = "row text-center" style = {{margin:'0px 5px'}}>
                <Button className="button-width" color="primary" 
                  onClick={() => this.onSubmit()}
                >{onChangeLanguage(locale, 'Save', languageData)} </Button>
                <Button className="button-width" color="secondary" 
                  onClick={() => this.fetchData()}
                >{onChangeLanguage(locale, 'Find', languageData)}</Button>
                <Button className="button-width" color="secondary" 
                  onClick={() => this.clearvalue()}
                >{onChangeLanguage(locale, 'Refresh', languageData)}</Button>
              
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

