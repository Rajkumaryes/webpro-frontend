import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label, Button, Collapse } from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { Checkbox,Input } from 'antd';
import CustomRadioButton from '../../../RadioButton'
import moment from 'moment';
import Workbook from 'react-excel-workbook'
import { teamService } from '../../../../redux/Export/masters/exportteam/saga'
import { reportService } from '../../../../redux/Export/report/saga'
import { createNotification } from '../../../../toast';
import { onChangeLanguage, getTimeDifference, permittedusers, getValue, convertLocalToUTCDate, getCountryName } from '../../../../helper'
import { IndexingsheetService } from '../../../../redux/Export/inputsheet/saga'
import Loading from "react-fullscreen-loading";
import { roleService } from '../../../../redux/role/saga'
import { teamsiteService } from '../../../../redux/Export/masters/teamsite/saga';
import * as clipboard from "clipboard-polyfill/text";
import DatePickerDate from "../../datePickerDate";
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import{regionexportService} from '../../../../redux/Export/masters/exportregion/saga'
import{areaexportservice} from '../../../../redux/Export/masters/exportarea/saga'
import{listviewService} from '../../../../redux/Export/masters/listview/saga'
import{crmstatusofcaseService} from '../../../../redux/Export/masters/crmstatusofcase/saga'
import {crmactivityService} from '../../../../redux/Export/masters/crmactivity/saga'
import {CrmcasehandlingService} from '../../../../redux/Export/crmcasehandling/saga'

class Sidebar extends Component {
    constructor(props) {
        super(props);
        // this.handleKeyDown = this.handleKeyDown.bind(this);
        this.state = {
            loading: false,
            selectedParentMenu: '',
            viewingParentMenu: '',
            collapsedMenus: [],
            end_time: '',
            start_time: new Date(),
            updated_start_time: new Date(),
            shipment_no: '',
            case_number:'',
            team: '',
            teamdata: [],
            regiondata:[],
            areadata:[],
            listviewdata:[],
            statusofcasedata:[],
            activitydata:[],
            regions:'',
            area:'',
            listview:'',
            statusofcase:'',
            activity:'',
            user_id: '',
            isadmin: false,
            is_submit: false,
            issuecode_data: [],
            data: [],
            isDataPasted: false,
            crmcasehandlingcount:'',
            crmcasehandlingcountlast:'',
            received_time:''
        };
    }
    componentDidMount() {

        this.setState({
            start_time: new Date(),

        })
        this.fetchregion()
        this.fetcharea()
        this.fetchteam()
        this.fetchlistview() 
        this.fetchstatusofcase()
        // this. fetchactivity()
        this.fetchcrmcasehandling()

    }

    fetchcrmcasehandling(){
        this.setState({loading:true})
        const {username} = this.props
        // console.log(username)
        CrmcasehandlingService.fetchcrmcasehandling(username)
        .then((res) => {
           if(res.status)   { 
                  let filterstatus = res.data;
                  let lastdata = res.lastcount;
                  this.setState({ 
                    crmcasehandlingcount:filterstatus, 
                    crmcasehandlingcountlast:lastdata     
                  }) 
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
  
  }

    fetchInput() {
        this.setState({ loading: true })
        IndexingsheetService.fetchIndexingsheet()
            .then((res) => {
                if (res.status) {
                    this.setState({
                        data: res.data,
                        loading: false
                    })
                }
                else {
                    this.setState({ loading: false })
                }
            })
            .catch((error) => { });
        this.setState({
            loading: false
        })
    }

    fetchregion() {
        this.setState({loading:true})
        regionexportService.fetchregion()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var regionlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.region_code ,value : cusmaidid.id.toString()};
                   });  
                    this.setState({
                    regiondata :  regionlist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }
     fetcharea() {
        this.setState({loading:true})
        areaexportservice.fetcharea()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var arealist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.area_name ,value : cusmaidid.id.toString(),text:cusmaidid.region_id};
                   });  
                //    console.log("arealist",arealist)
                    this.setState({
                    areadata :  arealist,
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
            loading: true
        })
        teamService.fetchteams()
            .then((res) => {
                this.setState({ loading: false })
                if (res.status) {
                    let filterstatus = (res.data).filter(item => item.status === 1)
                    var teamlist = filterstatus.map(function (cusmaidid) {
                        return { label: cusmaidid.team_name, value: (cusmaidid.id).toString(),area_id:cusmaidid.area_id,region_id:cusmaidid.region_id,country_code: cusmaidid.country_code };
                    
                    });
                    
                    this.setState({
                        teamdata: teamlist,
                    })
                }

            })
            .catch((error) => {
                this.setState({
                    loading: false
                })
            });
    }
    fetchlistview() {
        this.setState({loading:true})
        listviewService.fetchlistview()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var listviews = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   });  
                //    console.log("arealist",arealist)
                    this.setState({
                    listviewdata :  listviews,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }
     fetchstatusofcase() {
        this.setState({loading:true})
        crmstatusofcaseService.fetchcrmstatusofcase()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var statusofcases = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   });  
                //    console.log("arealist",arealist)
                    this.setState({
                        statusofcasedata :  statusofcases,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }
     fetchactivity() {
        this.setState({activitydata :  [] })
        this.setState({loading:true})
        const {regions} = this.state 
        
        crmactivityService.fetchcrmactivity()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1 && item.region === regions)
                 var activitys = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   });  
                //    console.log("arealist",arealist)
                    this.setState({
                        activitydata :  activitys,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }
    fetchData() {
        const { mtd_number } = this.state
        if (mtd_number !== "") {
            this.setState({
                loading: true,
                is_submit: false
            })
            IndexingsheetService.fetchIndividualIndexingsheet(mtd_number)
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
            createNotification('Please Enter Mtd Number', 'error', 'filled')
        }
    }
    // validDate(date, title) {
    //     var date_value = '', isfill = false
    //     if (date && date !== null && date !== '') {

    //         var end_date = new Date(date)
    //         if (Object.prototype.toString.call(end_date) === "[object Date]") {
    //             if (isNaN(end_date.getTime())) {
    //                 console.log("date is not valid")
    //             }
    //             else {
    //                 date_value = end_date
    //                 console.log("date is valid")
    //                 isfill = true
    //             }
    //         } else {
    //             console.log("not a date")
    //         }

    //     }
    //     if (isfill === false) {
    //         createNotification(`Please Enter ${title} (MM/DD/YYYY)`, 'error', 'filled')
    //     }

    //     return date_value

    // }
    validDate(dateTime, title) {
        let dateTimeValue = '';
    
        const inputFormats = [
            "MM/DD/YYYY hh:mm:ss A",
            "YYYY-MM-DD HH:mm:ss",
            "YYYY/MM/DD HH:mm:ss",
            "DD/MM/YYYY HH:mm:ss",
            "MM/DD/YYYY",
            "YYYY-MM-DD",
            "YYYY/MM/DD",
            "DD/MM/YYYY",
            "hh:mm:ss A",
            "HH:mm:ss",
            "D. MMMM YYYY [at] HH:mm",    
            "MMMM D, YYYY [at] hh:mm A",  
            "MMMM D YYYY hh:mm A",        
            "D MMM YYYY HH:mm",           
            "MMMM D YYYY",                
            "D MMMM YYYY",                
            "DD-MM-YYYY HH:mm:ss",        
            "DD/MM/YYYY HH:mm:ss",        
            "DD-MM-YYYY",                 
            "DD/MM/YYYY",
            "YYYY.MM.DD HH:mm:ss",         
            "MM-DD-YYYY hh:mm A",          
            "MMMM D, YYYY hh:mm:ss A",     
            "D MMM YYYY hh:mm:ss A",       
            "D-M-YYYY",                    
            "D/M/YYYY",                    
            "MMMM Do, YYYY",               
            "YYYYMMDD",                    
            "YYYY/MM/DD hh:mm A",          
            "MMMM D YYYY [at] HH:mm",      
            "DD MMM YYYY HH:mm:ss",        
            "DD MMM YYYY",                 
            "D MMM YYYY",                  
            "hh:mm A",                     
            "HH:mm",                       
            "hh:mm:ss",                    
            "HH:mm:ss",
            "YYYY-MM-DDTHH:mm:ssZ",        
            "YYYY-MM-DDTHH:mm:ss.SSSZ",    
            "ddd, MMM D YYYY HH:mm:ss",    
            // Added support for the specific format
            "MMMM D, YYYY [at] h:mm A"     // For example: January 17, 2025 at 2:46 AM
        ];
    
        console.log("Input DateTime:", dateTime);  // Debugging: Log the input dateTime
    
        if (dateTime && dateTime.trim() !== '') {
            const parsedMoment = moment(dateTime, inputFormats, true); 
            console.log("Is Valid Moment:", parsedMoment.isValid());  // Debugging: Check if the moment is valid
           
            if (parsedMoment.isValid()) {
                dateTimeValue = parsedMoment.format("MM/DD/YYYY hh:mm:ss A");
                console.log("Valid dateTime (moment):", dateTimeValue);
            } else {
                const nativeDate = new Date(dateTime);
                if (!isNaN(nativeDate.getTime())) {
                    dateTimeValue = moment(nativeDate).format("MM/DD/YYYY hh:mm:ss A");
                    console.log("Valid dateTime (native):", dateTimeValue);
                } else {
                    console.log("Invalid dateTime:", dateTime);
                }
            }
        }
    
        if (dateTimeValue === '') {
            createNotification(`Please enter a valid ${title} (e.g., MM/DD/YYYY hh:mm:ss AM/PM)`, 'error', 'filled');
        }
    
        return dateTimeValue;
    }
    
    
    
    
    validTime(timess, title) {
        var timevalue = '', isfill = true;
        if (timess && timess !== null && timess !== '') {
            console.log("kjgkjgkj ", timess)
            var isvalid = moment(timess, ["h:mm:ss A"]).format("HH:mm:ss");
            console.log("kjgkjgkj ", isvalid)
            if (isvalid !== 'Invalid date') {
                timevalue = isvalid
            }
            else {
                isfill = false
            }

            if (isfill === false) {
                createNotification(`Please Enter ${title} (hh:mm:ss AM/PM)`, 'error', 'filled')
            }
        }
        return timevalue

    }



    clearvalue() {

        this.setState({

            start_time: new Date(),
            updated_start_time: new Date(),
            end_time: '',
            date: '',
            shipment_no: '',
            case_number:'',
            regions:'',
            area:'',
            team:'',
            listview:'',
            statusofcase:'',
            activity:'',
            user_id: '',
            received_time:'',
            is_submit: false,

        })
    }

    // onChangeRegion(value) {
    //     const filteredArea = this.state.areadata.filter(item => item.text === value);
    //     this.setState({ 
    //         regions:value,
    //         areadata: filteredArea
    //      })
    //   }
    //   onChangeArea(value) {
    //     const filteredTeam= this.state.teamdata.filter(item => item.text === value);
    //     this.setState({ 
    //         area:value,
    //         teamdata: filteredTeam
    //      })
    //   }
    onChangeTeam(value) {
        var area = getValue(this.state.teamdata, 'value', 'area_id', value);
        var region = getValue(this.state.teamdata, 'value', 'region_id', value);
    
        this.setState(
            {
                team: value,
                area: area,
                regions: region,
            },
            () => {
                // Call fetchactivity only after regions state is updated
                this.fetchactivity();
            }
        );
    }
      onChangeListview(value) {
        this.setState({ 
            listview:value })
      }

    //   onChangeStatusofcase(value) {
    //     this.setState({ 
    //         statusofcase:value })
    //   }
      onChangeActivity(value){
        this.setState({ 
            activity:value })
      }

      onChangeReceivedTime(value){

        var receivedDate = this.validDate(value,'reeived_time')
        //   console.log("rajkumar",receivedDate)
          this.setState({ 
            received_time:receivedDate })
      }


    onSubmit() {
        
        const { start_time,regions,area,team,listview,statusofcase,received_time,activity,shipment_no,case_number,  updated_start_time } = this.state;

        // var datetime=moment(convertUTCToLocalDate(date_time)).format('MM/DD/YYYY hh:mm:ss a')
        if(team !== "" && activity !== "" &&  case_number!== "" )
        {
          const end_time= new Date(), updated_end_time= new Date() 
  
          this.setState({
            end_time:end_time
        })    
        const {username} = this.props
          this.setState({
            loading : true
          })
          
          CrmcasehandlingService.createcrmcasehandling(username,regions,area,team,shipment_no,activity,case_number,
            convertLocalToUTCDate(received_time),
            convertLocalToUTCDate(start_time),
            convertLocalToUTCDate( end_time),
            convertLocalToUTCDate( updated_start_time),
            convertLocalToUTCDate(updated_end_time))
            .then((res) => { 
              this.setState({  
               loading : false     
              }) 
              if(res.status)
                {
                  createNotification('Created','success','filled')
                  this.clearvalue()
                  this.fetchcrmcasehandling()
                }   
                else
                  {
                    createNotification(res.message,'error','filled');
                  }    
          })
          .catch((error) => { 
            this.setState({
              loading : false
            })
          });
          
        }
        else
        {
          this.setState({
            is_submit:true
        })
          createNotification('Please fill mandatory field','error','filled')
        }

    }



    render() {
        const { user_id, start_time, end_time, crmcasehandlingcount,crmcasehandlingcountlast,
         shipment_no,case_number,isDataPasted,regiondata,regions,
         team, teamdata,areadata,area,listviewdata,listview,statusofcasedata,statusofcase,received_time,activitydata,activity,  loading,   is_submit, is_search } = this.state
        const { match, languageData, locale, username } = this.props
        return (
            <>
                <title>{onChangeLanguage(locale, 'CRM Case Handling', languageData)}</title>
                {loading &&
                    <div>
                        <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
                    </div>
                }
                <Row>
                    <Colxx xxs="12">

                        <div className="row">
                            <div className="col-md-8">
                                <Breadcrumb heading={onChangeLanguage(locale, 'CRM Case Handling', languageData)} match={match} />
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
                       {isadmin === true ?this.renderTemplateadmin():this.renderTemplate()}
                       </div> */}
                        <div className = "col-md-2" >
                        <h2 style = {{marginTop:'15px'}}>Total EQ : {crmcasehandlingcount}</h2>
                        </div>
                        <div className = "col-md-2">
                            <h2  style = {{marginTop:'15px'}}>Last EQ : {crmcasehandlingcountlast}</h2>
                        </div>
                        </div>

                        <Separator className="separator-margin" />
                    </Colxx>
                </Row>
                {/* onKeyDown={this.handleKeyDown} */}
                <div>
                    <div className="publishuser-card-component" style={{ padding: '10px', borderRadius: '10px', marginBottom: '15px' }}>
                        <div className="row">
                            <div className="col-lg-3 space-margin">
                                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'User ID', languageData)}
                                    <br></br>{is_search ? user_id : username}</Label>

                            </div>
                            <div className="col-lg-3 space-margin"  >
                                <Label className="fontstyle normal-font" ><a >{onChangeLanguage(locale, 'Start Date Time', languageData)}</a><br></br>
                                    {moment(start_time).format('MM/DD/YYYY hh:mm:ss a')}
                                </Label>

                            </div>
                            <div className="col-lg-3 space-margin"  >
                                <Label className="fontstyle normal-font" ><a >{onChangeLanguage(locale, 'End Date Time', languageData)}</a>
                                    <br></br>
                                    {end_time !== '' && moment(end_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                            </div>
                          
                          {/* <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Regions',languageData)}</Label>
                            <a style = {{color :'red'}}>*</a>
                            <Select  
                             style={{height:'85px'}}
                             className = {is_submit === true && regions === ''?  "error-border-select-paste":"react-select fontstyle" }  
                           
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={regiondata.filter(option =>option.value === regions)}
                            options={regiondata}
                            onChange={(option) => this.onChangeRegion(option.value)}
                            // onChange={({value}) => this.setState({  regions: value })}
                            />
                        </div> */}
                        {/* <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Sub Area Name',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select
                            className = {is_submit === true && area === ''?  "error-border-select":"react-select fontstyle" }  
                              classNamePrefix="react-select"
                              name="form-field-name"
                              placeholder={onChangeLanguage(locale, 'Sub Area', languageData)}
                              value={areadata.filter(option => option.value === area)}
                              options={areadata}
                              onChange={(option) => this.onChangeArea(option.value)}
                            //   onChange={({ value }) => this.setState({ team: value })}
                            />
                        </div> */}
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Team',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select
                            className = {is_submit === true && team === ''?  "error-border-select":"react-select fontstyle" }  
                              classNamePrefix="react-select"
                              name="form-field-name"
                              placeholder={onChangeLanguage(locale, 'Team', languageData)}
                              value={teamdata.filter(option => option.value === team)}
                              options={teamdata}
                              onChange={(option) => this.onChangeTeam(option.value)}
                            //   onChange={({ value }) => this.setState({ team: value })}
                            />
                        </div>
                        {/* <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'List View',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select
                            className = {is_submit === true && listview === ''?  "error-border-select":"react-select fontstyle" }  
                              classNamePrefix="react-select"
                              name="form-field-name"
                              placeholder={onChangeLanguage(locale, 'List View', languageData)}
                              value={listviewdata.filter(option => option.value === listview)}
                              options={listviewdata}
                              onChange={(option) => this.onChangeListview(option.value)}
                            //   onChange={({ value }) => this.setState({ team: value })}
                            />
                        </div> */}
                        {/* <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Status of Case',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select
                            className = {is_submit === true && statusofcase === ''?  "error-border-select":"react-select fontstyle" }  
                              classNamePrefix="react-select"
                              name="form-field-name"
                              placeholder={onChangeLanguage(locale, 'Status of Case', languageData)}
                              value={statusofcasedata.filter(option => option.value === statusofcase)}
                              options={statusofcasedata}
                              onChange={(option) => this.onChangeStatusofcase(option.value)}
                            //   onChange={({ value }) => this.setState({ team: value })}
                            />
                        </div> */}
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Activity',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select
                            className = {is_submit === true && activity === ''?  "error-border-select":"react-select fontstyle" }  
                              classNamePrefix="react-select"
                              name="form-field-name"
                              placeholder={onChangeLanguage(locale, 'Activity', languageData)}
                              value={activitydata.filter(option => option.value === activity)}
                              options={activitydata}
                              onChange={(option) => this.onChangeActivity(option.value)}
                            //   onChange={({ value }) => this.setState({ team: value })}
                            />
                        </div>
                            <div className="col-lg-3 space-margin">
                                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Case Number', languageData)} <a style={{ color: 'red' }}>*</a></Label>
                                <Input className={is_submit === true && case_number === '' ? "error-border" : "fontstyle text-background"}
                                    placeholder=''
                                    value={case_number}
                                    disabled={isDataPasted} 
                                    onChange={(e) => this.setState({ case_number: e.target.value })}
                                />
                            </div>
                            <div className="col-lg-3 space-margin">
                                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Shipment Number', languageData)} <a style={{ color: 'red' }}>*</a></Label>
                                <Input className={"fontstyle text-background"}
                                    placeholder=''
                                    value={shipment_no}
                                    disabled={isDataPasted} 
                                    onChange={(e) => this.setState({ shipment_no: e.target.value })}
                                />
                            </div>
                            <div className="col-lg-3 space-margin">
                                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Case Received Time', languageData)} <a style={{ color: 'red' }}>*</a></Label>
                                <Input className={is_submit === true && received_time === '' ? "error-border" : "fontstyle text-background"}
                                    placeholder=''
                                    value={received_time}
                                    disabled={isDataPasted} 
                                    onChange={(e) => this.onChangeReceivedTime(e.target.value)}
                                    // onChange={(e) => this.setState({ received_time: e.target.value })}
                                />
                            </div>
                        </div>
                 
                    </div>
                    



                    <div className="row text-center" style={{ margin: '0px 5px' }}>
                        {/* <Button className="button-width" color="secondary"
                            onClick={() => this.onPasteD1040()}
                        >
                            {onChangeLanguage(locale, 'Paste From D1040', languageData)}
                        </Button>
                        <Button className="button-width" color="primary"
                            onClick={() => this.fetchData()}
                        >
                            {onChangeLanguage(locale, 'Find', languageData)}
                        </Button> */}
                        <Button className="button-width" color="primary"
                            onClick={() => this.onSubmit()}
                        >
                            {onChangeLanguage(locale, 'Save', languageData)}
                        </Button>
                        <Button className="button-width" color="secondary"
                            onClick={() => this.clearvalue()}
                        >{onChangeLanguage(locale, 'Refresh', languageData)}</Button>
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

    })(Sidebar)
);

