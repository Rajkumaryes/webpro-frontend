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
import { businesspartnercatalogService } from '../../../../redux/bchteam/businesspartnercatalog/saga'
import { categoryService } from '../../../../redux/bchteam/category/saga'
import { matchcodetypeService } from '../../../../redux/bchteam/matchcodetype/saga'
import { bpcareaService } from '../../../../redux/bchteam/bpcarea/saga'

class BookingSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      id: 0,
      area: '',
      area_data:[],
      team: '',
      user_id: '',
      match_code:'',
      category: '',
      matchcode_type:'',
      status:'',
      pending_reason: '',
      query:'',
      start_date: new Date(),
      end_date: '',
      updated_start_time: new Date(),
      is_search: false,
      is_submit: false,
      crmsearch: false,
      tableindex: 0,
      tabledata: [],
      category_data: [],
      matchcode_type_data: [],
      teamdata: [],
      searchdata: [],
      tableindex: 0,
      tabledata: [],
      bpccount:'',
      bpccountlast:''
    }
  }
  componentDidMount() {
    this.setState({
      start_date: new Date(),
    })

    this.fetchcategory()
    this.fetchmatchcode_type()
    this.fetchBpcCount()
    this.fetcharea()
  }
  fetchBpcCount(){
    this.setState({loading:true})
    const {username} = this.props
    // console.log(username)
    businesspartnercatalogService.fetchbpccount(username)
    .then((res) => {
       if(res.status)   { 
              let filterstatus = res.data;
              let lastdata = res.lastcount;
              this.setState({ 
                bpccount:filterstatus, 
                bpccountlast:lastdata     
              }) 
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})

}
  fetchcategory() {
    this.setState({ loading: true })
    categoryService.fetchapi()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var teamlist = filterstatus.map(function (response) {
            return { label: response.name, value: response.id.toString() };
          });
          this.setState({
            category_data: teamlist
          })

        }
        else {
          this.setState({ loading: false })
        }
      })
      .catch((error) => { });
    this.setState({ loading: false })
  }


  fetcharea() {
    this.setState({ loading: true })
    bpcareaService.fetchapi()
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
  fetchmatchcode_type() {
    this.setState({ loading: true })
    matchcodetypeService.fetchapi()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var teamlist = filterstatus.map(function (response) {
            return { label: response.name, value: response.id.toString() };
          });
          this.setState({
            matchcode_type_data: teamlist
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
      match_code:'',
      category: '',
      status:'',
      matchcode_type:'',
      pending_reason: '',
      query:'',
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
    const { id,  area,  match_code, category,matchcode_type, status,
        pending_reason,query, updated_start_time } = this.state;
    var is_fill = false

    if (match_code !== '' && area !== '' && matchcode_type !== '' && status !== '') {
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
        businesspartnercatalogService.createapi(id, area, username,
        match_code, category,matchcode_type,status,pending_reason,query,
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
        category: '',
        pending_reason: record.pending_reason,
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

  handlecategory = (selectedOptions) => {
    this.setState({ category: selectedOptions.value })
  }
  handlearea = (selectedOptions) => {
    this.setState({ area: selectedOptions.value })
  }
  handlematchecode_type = (selectedOptions) => {
    this.setState({ matchcode_type: selectedOptions.value })
  }
  handlestatus = (selectedOptions) => {
    this.setState({ status: selectedOptions.value })
  }


  render() {
    const { match, locale, languageData, username } = this.props
    const { loading, region, area, team, area_data,
        match_code, category, category_data,matchcode_type,status,bpccount,bpccountlast,
        pending_reason,query,   matchcode_type_data,   
       start_date, end_date, is_search, is_submit, searchdata, teamdata, tabledata, tableindex, crmsearch, statusofthecase_data } = this.state
      var status_data = [
        {
          "label": "Pending",
          "value": "Pending"
        },
        {
          "label": "Complete",
          "value": "Complete"
        },
      ];
    return (

      <>
        {loading &&
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
        <title>{onChangeLanguage(locale, 'Business Partner Catalog', languageData)}</title>
        <Row>
          <Colxx xxs="12">
            <div className="row">
              <div className="col-md-8">
                <Breadcrumb heading={onChangeLanguage(locale, 'Business Partner Catalog', languageData)} match={match} />
              </div>
              <div className = "col-md-2" >
                <h2 style = {{marginTop:'15px'}}>Total EQ : {bpccount}</h2>
                </div>
                <div className = "col-md-2">
                    <h2  style = {{marginTop:'15px'}}>Last EQ : {bpccountlast}</h2>
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
              {(is_submit === true && match_code.length === 0) && <a className="fontstyle mandatory-label">{onChangeLanguage(locale, 'Mandatory Field', languageData)}</a>}</Label>
              <Input className={is_submit === true && match_code === '' ? "error-border-paste" : "fontstyle text-background"}
                value={match_code} 
                onChange={(e) => this.setState({ match_code: e.target.value })}
              />
            </div>

            {/* <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Area', languageData)}<a style={{ color: 'red' }}>*</a>
              {(is_submit === true && area.length === 0) && <a className="fontstyle mandatory-label">{onChangeLanguage(locale, 'Mandatory Field', languageData)}</a>}</Label>
              <Input className={is_submit === true && area === '' ? "error-border-paste" : "fontstyle text-background"}
                value={area} 
                onChange={(e) => this.setState({ area: e.target.value })}
              />
            </div> */}
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
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Category', languageData)}</Label>
              <Select
                className={"react-select fontstyle"}
                classNamePrefix="react-select"
                name="form-field-name"
                value={category_data.filter(option => option.value === category)}
                options={category_data}
                onChange={this.handlecategory}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Match Code Type', languageData)}<a style={{ color: 'red' }}>*</a>
                {(is_submit === true && matchcode_type.length === 0) && <a className="fontstyle mandatory-label">{onChangeLanguage(locale, 'Mandatory Field', languageData)}</a>}</Label>
              <Select
                className={is_submit === true && matchcode_type === '' ? "error-border-select" : "react-select fontstyle"}
                classNamePrefix="react-select"
                name="form-field-name"
                value={matchcode_type_data.filter(option => option.value === matchcode_type)}
                options={matchcode_type_data}
                onChange={this.handlematchecode_type}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Status', languageData)}<a style={{ color: 'red' }}>*</a>
              {(is_submit === true && status.length === 0) && <a className="fontstyle mandatory-label">{onChangeLanguage(locale, 'Mandatory Field', languageData)}</a>}</Label>
              <Select
                className={is_submit === true && status === '' ? "error-border-select" : "react-select fontstyle"}
                classNamePrefix="react-select"
                name="form-field-name"
                value={status_data.filter(option => option.value === status)}
                options={status_data}
                onChange={this.handlestatus}
              />
            </div>
            
            <div className="col-md-6 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Pending Reason', languageData)}</Label>
              <textarea className={"fontstyle textarea-background"}
                value={pending_reason}
                onChange={(e) => this.setState({ pending_reason: e.target.value })}
              />
            </div>

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
