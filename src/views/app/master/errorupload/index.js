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
import { audittypeService } from '../../../../redux/bookingamendment/audittype/saga'
import { processtypeService } from '../../../../redux/bookingamendment/processtype/saga'
import { globalerrorService } from '../../../../redux/globalerror/saga'
import { errorcodeService } from '../../../../redux/errorcode/saga';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

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
      error_date: '',
      error_type: '',
      start_date: new Date(),
      process: '',
      sub_process:'',
      category:'',
      error_code:'',
      detailed_description: '',
      route_cause: '',
      error_captured_userid:'',
      error_reviewed_userid:'',
      transaction_no:'',
      exception_id:'0',
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
      audittype_data: [],
      process_data: [],
      sub_process_data:[],
      filtered_sub_process_data: [],
      filtered_error_code_data: [],
      category_data:[],
      error_code_data: [],
      data:[],
      internalauditcount:'',
      internalauditcountlast:'',
      crm_case_no:'',
      showLaneField: false,
      no_of_lane: '',
    }
  }
  componentDidMount() {
    this.setState({
      start_date: new Date(),
    })


    this.fetchprocess()
  }


fetchprocess() {  
  const {is_search} = this.state
  console.log('is_search', is_search)
  
  this.setState({
    loading: true
  })
  
  errorcodeService.fetchErrorcode()
    .then((res) => { 
      this.setState({   
        loading: false 
      }) 
      
      if(res.status) {
        let filterstatus = (res.data).filter(item => item.status === 1)
        
        // Create process list (unique processes)
        var processlist = filterstatus.map(function (item) {
          return { 
            label: item.process, 
            value: item.process,
            text: item.process 
          };
        });
        
        // Create subprocess list with process reference
        var subprocesslist = filterstatus.map(function (item) {
          return {
            label: item.sub_process, 
            value: item.sub_process, 
            process: item.process, // Keep process reference
            text: item.sub_process
          };
        });
        
        // Create error code list with subprocess reference
        var errorcodelist = filterstatus.map(function (item) {
          return {
            label: item.error_code, 
            value: item.error_code, 
            sub_process: item.sub_process, // Keep subprocess reference
            process: item.process, // Also keep process reference if needed
            text: item.error_code
          };
        });
        
        // Create category list
        var categorylist = filterstatus.map(function (item) {
          return {
            label: item.category, 
            value: item.category.toString(), 
            category: item.category,
            text: item.category
          };
        });
        
        // Remove duplicates
        var uniqueProcessList = processlist.filter((v,i,a) => 
          a.findIndex(t => (t.label === v.label)) === i
        );
        
        var uniqueSubprocessList = subprocesslist.filter((v,i,a) => 
          a.findIndex(t => (t.label === v.label && t.process === v.process)) === i
        );
        
        var uniqueErrorcodeList = errorcodelist.filter((v,i,a) => 
          a.findIndex(t => (t.label === v.label && t.sub_process === v.sub_process)) === i
        );
        
        var uniqueCategoryList = categorylist.filter((v,i,a) => 
          a.findIndex(t => (t.label === v.label)) === i
        );
        
        if(is_search === false) {
          this.setState({
            process_data: uniqueProcessList,
            issuecode_data: res.data,
            sub_process_data: uniqueSubprocessList,
            filtered_sub_process_data: [], // Initially empty
            error_code_data: uniqueErrorcodeList,
            filtered_error_code_data: [], // Initially empty
            category_data: uniqueCategoryList,
          })
        } else {
          this.setState({
            process_data: uniqueProcessList,
            sub_process_data: uniqueSubprocessList,
            error_code_data: uniqueErrorcodeList,
            category_data: uniqueCategoryList,
          })
        }
      } else {
        this.setState({ 
          data: []
        }) 
      }               
    })
    .catch((error) => { 
      this.setState({
        loading: false
      })
    });   
}


  // fetchissie() {
  //   this.setState({
  //     loading: true
  //   })
  //   issuecodeService.fetchapi()
  //     .then((res) => {
  //       this.setState({
  //         loading: false

  //       })
  //       if (res.status) {
  //         let filterstatus = res.data
  //         var list = filterstatus.map(function (areaaval) {
  //           return {
  //             id: (areaaval.id).toString(),
  //             area: areaaval.area, region: areaaval.region, team: areaaval.team, issue_code: areaaval.issue_code
  //           };
  //         });
  //         this.setState({
  //           issuecode_data: list,

  //         })
  //       } else {
  //         this.setState({
  //           data: [],

  //         })
  //       }

  //     })
  //     .catch((error) => {
  //       this.setState({
  //         loading: false
  //       })
  //     });
  // }

  onClearValue() {
    this.setState({
      id: 0,
      region: '',
      area: '',
      team: '',
      user_id: '',
      error_code: '',
      sub_process: '',
      start_date: new Date(),
      process: '',
      category:'',
      detailed_description: '',
      route_cause: '',
      error_reviewed_userid:'',
      transaction_no:'',
      // exception_id:'',
      error_captured_userid:'',
      updated_start_time: new Date(),
      is_search: false,
      is_submit: false,
      tableindex: 0,
      tabledata: [],
      crmsearch: false,
      error_date: '',
      error_type: '',
      audittype: '',
      booking_number: '',
      crm_case_no: '',
      process:'',
      sub_process:'',
      no_of_lane:'',
      showLaneField:false,
      filtered_sub_process_data: [],
    filtered_error_code_data: []
    })

  }
  onSubmit() {
    const { id, 
      updated_start_time, error_date,error_type, category,sub_process, process, detailed_description, route_cause,error_reviewed_userid,error_captured_userid,error_code,transaction_no,exception_id,no_of_lane } = this.state;
    var is_fill = false

    if (error_date !== '' && error_type !== '' && process !== '' && sub_process !== '' && category !== '' && detailed_description !== '' && route_cause !== '' &&
     error_reviewed_userid !=='' && error_code !== '' && error_captured_userid !== '') {
      this.setState({
        crmsearch: true
      })
      is_fill = true
    }

    if (this.state.process.toLowerCase() === 'tender' && (!this.state.no_of_lane || this.state.no_of_lane.trim() === '')) {
      createNotification("No of Lane is mandatory for Tender process.", 'error', 'filled');
      return;
    }
    if (is_fill === true) {
      const end_time = moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
      const { username } = this.props
      let end_date = convertLocalToUTCDate(new Date()),
        start_date = convertLocalToUTCDate(updated_start_time),
        updatedstarttime = convertLocalToUTCDate(updated_start_time),
        updated_end_time = convertLocalToUTCDate(new Date()),
        // error_dates = convertLocalToUTCDate(error_date)
        error_dates = error_date

        globalerrorService.createGlobalerror(username,error_dates,error_type,process,sub_process,error_code,category,error_captured_userid,error_reviewed_userid,transaction_no,exception_id,detailed_description,route_cause,
        no_of_lane)
        .then((res) => {
          this.setState({
            end_date: end_time,
            loading: false
          })
          if (res.status) {
            createNotification('Created', 'success', 'filled')
            this.onClearValue()
            this.fetchinternalauditCount()
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
        category: record.category,
        process: record.process,
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
            booking_number: record.shipment_no,
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
 

handleprocess = (selectedOptions) => {
  const selectedProcess = selectedOptions.value;
  
  // Filter sub processes based on selected process
  const filteredSubProcesses = this.state.sub_process_data.filter(item => item.process === selectedProcess);
  
  this.setState({
    process: selectedProcess,
    sub_process: '', // Reset sub process selection
    error_code: '', // Reset error code selection
    showLaneField: selectedProcess.toLowerCase() === 'tender',
    filtered_sub_process_data: filteredSubProcesses,
    filtered_error_code_data: [] // Clear error codes when process changes
  });
}

  handlesubprocess = (selectedOptions) => {
  const selectedSubProcess = selectedOptions.value;
  
  // Filter error codes based on selected sub process
  const filteredErrorCodes = this.state.error_code_data.filter(item => item.sub_process === selectedSubProcess);
  
  this.setState({ 
    sub_process: selectedSubProcess,
    error_code: '', // Reset error code selection when sub process changes
    filtered_error_code_data: filteredErrorCodes
  });
}
  handleerrortype = (selectedOptions) => {
    this.setState({ error_type: selectedOptions.value })
  }
  handlecategory = (selectedOptions) => {
    this.setState({ category: selectedOptions.value })
  }
  handleerrorcode = (selectedOptions) => {
    // console.log("rajkumar",selectedOptions.value)
    this.setState({ error_code: selectedOptions.value })
  }
  onChangeFileUpload(files)
	{
    this.setState({
      loading : true
    })
    globalerrorService.fileUpload(files[0])
      .then((res) => { 
        this.setState({
          loading : false
        })
        if(res.status)
        {
         if(res.data)
         {
          if(res.data.status)   
          {   
         
            createNotification('Uploaded','success','filled')
            this.fetchinternalauditCount()
          } 
          else
          {
          
            createNotification(res.data.message,'error','filled');
          } 
         }  
        }
         
    
    })
    .catch((error) => { 
      this.setState({
        loading : false
      })
      });
  }

  renderTemplate()
  {
    const {languageData,locale} = this.props
  
    const column_name = ["User ID","Error Date", "Error Type","Process","Sub Process","Error Code","Category","Error Committed By", "Error Reviewed UserID","Transaction No","Detailed Description / Root Cause","Preventive / Corrective Action", "No Of Lane"]
      return(
        
        <Workbook filename="ErrorUpload.xlsx" element={
            <Button className = "button-width"
             color="secondary" >
            {onChangeLanguage(locale,'Download Template',languageData)} 
            </Button>
          }>
          <Workbook.Sheet data={[]} name="Sheet A">
          {column_name && column_name.map((value,index) =>
           <Workbook.Column label={value} value={value}  />
           )}
          </Workbook.Sheet> 
        </Workbook>
     

      );
  }
  
  render() {
    const { match, locale, languageData, username } = this.props
    const { loading, region, area, team, csb_office, assigned_to,showLaneField,
      error_code,error_code_data, error_date, error_type, process,sub_process,process_data, sub_process_data, filtered_sub_process_data,filtered_error_code_data, error_reviewed_userid,transaction_no,exception_id, category, category_data,detailed_description,route_cause,error_captured_userid,
      last_pod, end_pod, start_date, end_date, is_search, is_submit, searchdata, teamdata, tabledata, tableindex, crmsearch, } = this.state
    var errortype_data = [
      {
        "label": "Internal",
        "value": "internal"
      },
      {
        "label": "External",
        "value": "external"
      },
    ];

    return (

      <>
        {loading &&
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
        <title>{onChangeLanguage(locale, 'Global Error Module', languageData)}</title>
        <Row>
          <Colxx xxs="12">
            <div className="row">
              <div className="col-md-8">
                <Breadcrumb heading={onChangeLanguage(locale, 'Global Error Module', languageData)} match={match} />
              </div>
              
              <div className="col-md-4 space-margin">
                      <Button className = "button-width" color="primary">
                            <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
                            <a style= {{margin :'0px'}} > {onChangeLanguage(locale,'Upload',languageData)} </a>
                            <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                                className = "filepicker_customButton"
                                style = {{width : '26%',marginLeft :'-22%'}}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
                        </Button>
                        {this.renderTemplate()}
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
            {/* <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Start Date', languageData)}
                <br></br>{moment(start_date).format('MM/DD/YYYY hh:mm:ss a')}
              </Label>

            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'End Date', languageData)}
                <br></br>{end_date !== '' && moment(end_date).format('MM/DD/YYYY hh:mm:ss a')}
              </Label>

            </div> */}
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Error Date', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <a className='fontstyle mandatory-label'>
                {is_submit === true && error_date === '' && `${onChangeLanguage(locale, 'Mandatory Field', languageData)}`}</a>
              <DatePicker
                selected={error_date}
                className="text-background"
                onChange={(date) => this.setState({ error_date: date })}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Error Type', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <Select
                className={is_submit === true && error_type === '' ? "error-border-select" : "react-select fontstyle"}
                classNamePrefix="react-select"
                name="form-field-name"
                value={errortype_data.filter(option => option.value === error_type)}
                options={errortype_data}
                onChange={this.handleerrortype}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Process', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <Select
                className={is_submit === true && process === '' ? "error-border-select" : "react-select fontstyle"}
                classNamePrefix="react-select"
                name="form-field-name"
                value={process_data.filter(option => option.value === process)}
                options={process_data}
                onChange={this.handleprocess}
              />
            </div>

            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Sub Process', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <Select
                className={is_submit === true && sub_process === '' ? "error-border-select" : "react-select fontstyle"}
                classNamePrefix="react-select"
                name="form-field-name"
                value={filtered_sub_process_data.filter(option => option.value === sub_process)}
                options={filtered_sub_process_data}
                onChange={this.handlesubprocess}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Error Code', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <Select
                className={is_submit === true && error_code === '' ? "error-border-select" : "react-select fontstyle"}
                classNamePrefix="react-select"
                name="form-field-name"
                value={filtered_error_code_data.filter(option => option.value === error_code)}
                options={filtered_error_code_data}
                onChange={this.handleerrorcode}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Category', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <Select
                className={is_submit === true && category === '' ? "error-border-select" : "react-select fontstyle"}
                classNamePrefix="react-select"
                name="form-field-name"
                value={category_data.filter(option => option.value === category)}
                options={category_data}
                onChange={this.handlecategory}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Error Committed By', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <Input className={is_submit === true && error_captured_userid === '' ? "error-border" : "fontstyle text-background"}
                value={error_captured_userid}
                disabled={is_search === true ? true : false}
                // onChange={(e) => this.setState({ error_captured_userid: e.target.value })}
                onChange={(e) => this.setState({ error_captured_userid: (e.target.value).toUpperCase() })} 
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Error Reviewed UserID', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <Input className={is_submit === true && error_reviewed_userid === '' ? "error-border" : "fontstyle text-background"}
                value={error_reviewed_userid}
                disabled={is_search === true ? true : false}
                // onChange={(e) => this.setState({ error_reviewed_userid: e.target.value })}
                onChange={(e) => this.setState({ error_reviewed_userid: (e.target.value).toUpperCase() })} 
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Transaction No', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <Input className={is_submit === true && transaction_no === '' ? "error-border" : "fontstyle text-background"}
                value={transaction_no}
                disabled={is_search === true ? true : false}
                onChange={(e) => this.setState({ transaction_no: e.target.value })}
              />
            </div>
            {/* <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Exception ID', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <Input className={is_submit === true && exception_id === '' ? "error-border" : "fontstyle text-background"}
                value={exception_id}
                disabled={is_search === true ? true : false}
                onChange={(e) => this.setState({ exception_id: e.target.value })}
              />
            </div> */}
            {/* <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Detailed Description / Root Cause', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <textarea className={is_submit === true && detailed_description === '' ? "error-border" : "fontstyle text-background"}
                value={detailed_description}
                onChange={(e) => this.setState({ detailed_description: e.target.value })}
              />
            </div> */}

            <div className="col-md-3 space-margin">


            <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Detailed Description / Root Cause', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <a className='fontstyle mandatory-label'>
                {is_submit === true && detailed_description === '' && `${onChangeLanguage(locale, 'Mandatory Field', languageData)}`}</a>


                  {/* <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Detailed Description / Root Cause', languageData)}
                  <a style={{ color: 'red' }}>*</a></Label> */}
                  <textarea
                    className={"fontstyle textarea-background"}
                    placeholder=''
                    value={detailed_description}
                    onChange={(e) => this.setState({ detailed_description: e.target.value })}
                  />
                </div>

                <div className="col-md-3 space-margin">
                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Preventive / Corrective Action', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <a className='fontstyle mandatory-label'>
                {is_submit === true && route_cause === '' && `${onChangeLanguage(locale, 'Mandatory Field', languageData)}`}</a>
                  {/* <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Preventive / Corrective Action', languageData)}
                  <a style={{ color: 'red' }}>*</a></Label> */}
                  <textarea
                    className={"fontstyle textarea-background"}
                    placeholder=''
                    value={route_cause}
                    onChange={(e) => this.setState({ route_cause: e.target.value })}
                  />
                </div>
           {showLaneField && (
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font">
                {onChangeLanguage(locale, 'No of Lane', languageData)}<a style={{ color: 'red' }}>*</a>
              </Label>
              <Input
                type = "number" min="0" 
                className={is_submit === true && (this.state.no_of_lane === '' || this.state.no_of_lane == null) ? "fontstyle text-background" : "fontstyle text-background"}
                value={this.state.no_of_lane || ''}
                onChange={(e) => this.setState({ no_of_lane: e.target.value })}
              />
            </div>
          )}

          {/* <div className = "col-lg-2-0 space-margin">
                                      <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'No of Cargo Item',languageData)}
                                     </Label>
                                      <Input  className = {"fontstyle text-background" }  
                                      type = "number" min="0"  
                                      placeholder = ''
                                      // onKeyDown={this.handleKeypress}
                                      value = {no_of_cargoitem}  
                                      onChange= {(e)=>this.setState({no_of_cargoitem : e.target.value})} 
                                      />
                                  </div> */}
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
