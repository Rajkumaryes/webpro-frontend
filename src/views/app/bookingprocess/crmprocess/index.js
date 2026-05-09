import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import {onChangeLanguage,convertLocalToUTCDate,convertUTCToLocalDate,getValue} from '../../../../helper'
import Select from 'react-select';
import moment from 'moment';
import{crmprocessService} from '../../../../redux/bookingprocess/crmprocess/saga'
import { createNotification } from '../../../../toast';
import Workbook from 'react-excel-workbook'
import { Table,Checkbox } from 'antd';
import{actionService} from '../../../../redux/bookingprocess/action/saga'
import{casestatusService} from '../../../../redux/bookingprocess/statusofcase/saga'
import{issuecodeService} from '../../../../redux/bookingprocess/issuecode/saga';

import DatePicker from "../../datePicker";

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        id:0,
        gsc_userid:'',
        booking_number:'',
        case_number:'',
        team_name:'',
        action_type:'',
        start_datetime:'',
        end_datetime:'',
        comments:'',
        area:'',
        sub_area:'',
        status_of_case:'',
        region:'',
         team_data:[],
         teamdata:[],
         areadata:[],
         area_data:[],
         regiondata:[],
         actiondata:[],   
         searchdata:[],      
         statuscasedata:[],
         is_submit:false,
         is_search:false,
         loading:false,
         updated_start_time:new Date(),
         tableindex:0,
         tabledata:[],
        crmcount:'',
        crmcountlast:'',
        isSubmitting: false,
        received_datetime:'',
        isDataPasted: false,
    }

    }

    componentDidMount() {
       
        this.setState({
            start_datetime:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
        })
      this.fetchaction()
      this.fetchcase()
      this.fetchissie()
      this.fetchCrmCount()
    }
    fetchCrmCount(){
      this.setState({loading:true})
      const {username} = this.props
      //console.log(username)
      crmprocessService.fetchcrmcount(username)
      .then((res) => {
         if(res.status)   { 
                let filterstatus = res.data;
                let lastdata = res.lastcount;
                this.setState({ 
                  crmcount:filterstatus, 
                  crmcountlast:lastdata     
                }) 
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})
  
  }
    fetchissie() {  
      const {is_search}=this.state
      console.log('is_search',is_search)
      this.setState({
        loading : true
      })
      issuecodeService.fetchapi()
        .then((res) => { 
          this.setState({   
        loading : false 
                
          }) 
          if(res.status)
            {
              let filterstatus = (res.data).filter(item => item.status === 1)
              var regionlist = filterstatus.map(function (cusmaidid) {
                return { label: cusmaidid.region, value: cusmaidid.id.toString(),text: cusmaidid.region };
              });
              var arealist = filterstatus.map(function (cusmaidid) {
                return {
                  label: cusmaidid.area, text: cusmaidid.name,
                  value: cusmaidid.id.toString(), region: cusmaidid.region,
                };
              });
              var teamlist = filterstatus.map(function (cusmaidid) {
                return {
                  label: cusmaidid.team, text: cusmaidid.name,
                  value: cusmaidid.id.toString(), area: cusmaidid.area,
                };
              });
              var eallyUniqueArr =  regionlist.filter((v,i,a)=>a.findIndex(t=>(t.label === v.label && t.label===v.label))===i)
              var areaUniqueArr =  arealist.filter((v,i,a)=>a.findIndex(t=>(t.label === v.label && t.label===v.label))===i)
              var teamUniqueArr =  teamlist.filter((v,i,a)=>a.findIndex(t=>(t.label === v.label && t.label===v.label))===i)
              if(is_search === false)
              {
              this.setState({
                regiondata: eallyUniqueArr,
                issuecode_data:res.data  , 
                areadata:areaUniqueArr,
                team_data:teamUniqueArr,

              })
            }else{
              this.setState({
                regiondata: regionlist,
                areadata:arealist,
                team_data:teamlist,

              })
            }
            }   else
            {
              this.setState({ 
                data:[]  , 
                         
              }) 
            }               
      
      })
      .catch((error) => { 
        this.setState({
          loading : false
        })
        });   
   }
    fetchaction() {
        this.setState({loading:true})
        actionService.fetchapi()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var actionlist = filterstatus.map(function(response) {
                      return  {label : response.name ,value : response.id.toString()};
                   });  
                    this.setState({
                    actiondata :  actionlist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  
     fetchcase() {
      this.setState({loading:true})
      casestatusService.fetchapi()
      .then((res) => {
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var actionlist = filterstatus.map(function(response) {
                    return  {label : response.name ,value : response.id.toString()};
                 });  
                  this.setState({
                  statuscasedata :  actionlist
                  })
                 
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})
   }  
     
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
                 "MMMM D, YYYY [at] h:mm A" 
             ];
         
            //  console.log("Input DateTime:", dateTime);  
         
             if (dateTime && dateTime.trim() !== '') {
                 const parsedMoment = moment(dateTime, inputFormats, true); 
                //  console.log("Is Valid Moment:", parsedMoment.isValid());  // Debugging: Check if the moment is valid
                
                 if (parsedMoment.isValid()) {
                     dateTimeValue = parsedMoment.format("MM/DD/YYYY hh:mm:ss A");
                    //  console.log("Valid dateTime (moment):", dateTimeValue);
                 } else {
                     const nativeDate = new Date(dateTime);
                     if (!isNaN(nativeDate.getTime())) {
                         dateTimeValue = moment(nativeDate).format("MM/DD/YYYY hh:mm:ss A");
                        //  console.log("Valid dateTime (native):", dateTimeValue);
                     } else {
                        //  console.log("Invalid dateTime:", dateTime);
                     }
                 }
             }
         
             if (dateTimeValue === '') {
                 createNotification(`Please enter a valid ${title} (e.g., MM/DD/YYYY hh:mm:ss AM/PM)`, 'error', 'filled');
             }
         
             return dateTimeValue;
         }
      onChangeReceivedTime(value){

        var receivedDate = this.validDate(value,'reeived_time')
        //   console.log("rajkumar",receivedDate)
          this.setState({ 
            received_datetime:receivedDate })
      }
  
     onSubmit() { 
      this.setState({ isSubmitting: true });
        const {id,sub_area,booking_number,case_number,action_type,start_datetime,statuscasedata,received_datetime,
          region,comments,area,status_of_case,end_datetime,updated_start_time} = this.state;
       
        if(booking_number !==''&& case_number!==''&& action_type!=='' && sub_area !=='' &&
         region!=='' && area !=='' && status_of_case!=='')
        {
            const selectedStatusLabel = getValue(statuscasedata, 'value', 'label', status_of_case);
            const isNonMandatoryStatus = ['Standard Reply', 'Unassigned Cases'].includes(selectedStatusLabel);
            // console.log("selectedStatusLabel",selectedStatusLabel)
            // console.log("isNonMandatoryStatus",isNonMandatoryStatus)
            
            const {username} = this.props
            const end_time =  moment(new Date()).format('MM/DD/YYYY hh:mm:ss a') 
            let   end_date=convertLocalToUTCDate(new Date()),
          start_date=convertLocalToUTCDate(updated_start_time),
            updatedstarttime=convertLocalToUTCDate(updated_start_time),
            updated_end_time=convertLocalToUTCDate(new Date())
            crmprocessService.createcrmprocess( id,username,booking_number,case_number,sub_area,region,area,
              comments,status_of_case,convertLocalToUTCDate(received_datetime),start_date,end_date,updatedstarttime,updated_end_time,action_type)
              .then((res) => { 
                this.setState({  
                  end_datetime:end_datetime,
                  loading : false,
                  isSubmitting: false     
                }) 
                if(res.status)
                  {
                    createNotification('Created','success','filled')
                    // this.onrefresh()
                    this.onrefresh(isNonMandatoryStatus);
                    this.fetchCrmCount()
                  }   
                  else
                    {
                      createNotification(res.message,'error','filled');
                    }    
            })
            .catch((error) => { 
              this.setState({
                loading : false,
                isSubmitting: false
              })
            });
        }
        else
        {
          this.setState({
            is_submit:true,
            isSubmitting: false
        })
          createNotification('Please fill mandatory field','error','filled')
        }
      }
    
 onrefresh(preserveLocationFields = false) {
  this.setState({
    gsc_userid: '',
    booking_number: '',
    case_number: '',
    team_name: '',
    action_type: '',
    start_datetime: moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
    end_datetime: '',
    comments: '',
    status_of_case: '',
    updated_start_time: new Date(),
    is_submit: false,
    is_search: false,
    tableindex: 0,
    tabledata: [],
    received_datetime:'',
    id: 0,
    ...(preserveLocationFields
      ? {}
      : {
          region: '',
          area: '',
          sub_area: '',
        }),
  });

  this.fetchissie();
}
    onCopy()
    {
        navigator.clipboard.writeText(this.state.region)
    }
    handleteam = (selectedOptions) => {
        this.setState({team_name : selectedOptions.value})  
    } 
    handleactoin = (selectedOptions) => {
        this.setState({action_type : selectedOptions.value})  
    }
    handlestatus = (selectedOptions) => {
      this.setState({status_of_case : selectedOptions.value})  
  }
  setValue(record,id)
  {
  
    let nn =[]
    nn.push(record)
        this.setState({
          tabledata:nn,
          tableindex:id
        })
        const {team_data,areadata}=this.state
        if(record !== null && record)
        {
           this.setState({
              id:record.id,
            gsc_userid:record.gsc_userid,
            booking_number:record.booking_no,
            case_number:record.case_number,
            team_name:record.team,
            action_type:record.action_type,
            start_datetime:moment(record.start_time).format('MM/DD/YYYY hh:mm:ss a'),
            end_datetime:moment(record.end_time).format('MM/DD/YYYY hh:mm:ss a'),
            comments:record.comments,
            area:record.area,
            sub_area:record.team,
            status_of_case:record.status_case,
            region:record.region,
            teamdata:team_data,
            area_data:areadata,
            is_submit:false,
            is_search:true
            })
        }
        this.fetchissie()
    } 
    nextTitle =(idx, arr) =>{
      console.log('arridx',idx)
      var i = idx + 1;
      var i = i % arr.length;
      
      this.setValue(arr[i],i)
      this.setState({
        tableindex:i
      })
    }
    
     prevTitle=(idx, arr) =>{
      if (idx === 0) {
        var i = arr.length -1;
       
      } else {
        var i = idx -1;
        
      }
      this.setState({
        tableindex:i
      })
      this.setValue(arr[i],i)
    }
    fetchData() {
      const {booking_number,case_number,tableindex} = this.state 
      if(booking_number !== "" || case_number !=='')
      {
          this.setState({
              loading : true,
              is_submit:false
          })
          crmprocessService.search(booking_number,case_number)
          .then((res) => {
             
              this.setState({loading:false})
              // this.onrefresh()
          if(res.status)   { 
              this.setValue(res.data)
              let dta =res.data
        this.setValue(dta[tableindex],tableindex)
        
          this.setState({
            searchdata:res.data
          })
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
        createNotification('Please Enter Booking Number or Case Number','error','filled')
      }
   }
    renderTemplate()
    {
      const {languageData,locale} = this.props
      
      const column_name = ["GSC User ID","Region", "Area", "Sub Area", "Booking Number","Case Number","Action Type","Status of the Case","Comments","Start DateTime","End DateTime"]
        return(
          
          <Workbook filename="CRM Process.xlsx" element={
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
    onChangeFileUpload(files)
  {
    const {tableindex}=this.state
    this.setState({
      loading : true
    })
    crmprocessService.fileUpload(files[0])
      .then((res) => { 
        if(res.status)
        {
          if(res.data.status)   
          {   
            let dta =res.data
            let dtabee=dta.data
            this.setValue(dtabee[tableindex],tableindex)
              this.setState({
                searchdata:dta.data,
                is_search:true
              })
            createNotification('Uploaded','success','filled')
            this.fetchissie()
            this.fetchCrmCount()
          }  
          else{
            createNotification(res.data.message,'error','filled')
            this.setState({
                loading : false
              })
          }  
        }
          
    
    })
    .catch((error) => { 
      this.setState({
        loading : false
      })
      });
  }
 
     
        getArrayValue(array, value, key) {
          var list = []
          if (array && array !== null && value !== '' && value !== null) {
            list = array.filter(item => item[key] === value)
          }
          return list
        }
        handlechangeregion = (selectedOptions) => {
          const {areadata,regiondata}=this.state
          this.setState({
            region : selectedOptions.value,
            area_data:this.getArrayValue(areadata, selectedOptions.label, 'region'),sub_area:'',area:''
            })  
        }
        handlechangearea = (selectedOptions) => {
          const {team_data}=this.state
          this.setState({
            area : selectedOptions.value,
            teamdata:this.getArrayValue(team_data, selectedOptions.label, 'area'),sub_area:''
            })  
        }
        onChangetime(date)
        {
          this.setState({end_datetime  : date})
         
        }
    render()
    {
        const {match,locale,languageData,username} = this.props
        const {  gsc_userid,booking_number,case_number,action_type,start_datetime,end_datetime,comments,area,sub_area,actiondata,crmcount,crmcountlast,received_datetime,
          status_of_case,region,regiondata,area_data,teamdata,searchdata,tabledata,tableindex,statuscasedata, is_submit,is_search,isDataPasted} = this.state
          const  columsss = [
            {
              title: onChangeLanguage(locale,'GSC User Id',languageData),
              dataIndex: 'gsc_userid',
              key: 'gsc_userid',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'200px'}}>
                  {text}
                </div>)
            },
            {
              title: onChangeLanguage(locale,'Region',languageData),
              dataIndex: 'region',
              key: 'region',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                  {getValue(regiondata, 'value', 'label', text)}
                  </div>),
            },
            {
              title: onChangeLanguage(locale,'Area',languageData),
              dataIndex: 'area',
              key: 'area',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                  {getValue(area_data, 'value', 'label', text)}
                </div>),
            },
            {
              title: onChangeLanguage(locale,'Sub Area',languageData),
              dataIndex: 'team',
              key: 'team',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                  {getValue(teamdata, 'value', 'label', text)}
                 
                </div>),
            },
              {
                title: onChangeLanguage(locale,'Booking Number',languageData),
                dataIndex: 'booking_no',
                key: 'booking_no',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'200px'}}>
                    {text}
                  </div>)
              },
              {
                title:onChangeLanguage(locale,'Case Number',languageData),
                dataIndex: 'case_number',
                key: 'case_number',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>
                  {text}
                  </div>),
              },
              {
                title: onChangeLanguage(locale,'Action Party',languageData),
                dataIndex: 'action_type',
                key: 'action_type',
                render: (text, record) => ( 
                    <div className="row d-flex justify-content-center"  style = {{padding:'2px',width:'200px'}}>
                      {getValue(actiondata, 'value', 'label', text)} 
                    </div>)
              },
              {
                title: onChangeLanguage(locale,'Status of the Case',languageData),
                dataIndex: 'status_case',
                key: 'status_case',
                render: (text, record,index) => ( 
                    <div   style = {{padding:'2px',width:'200px'}}>
                       {getValue(statuscasedata, 'value', 'label', text)} 
                    </div>)
              },
                {
                  title:onChangeLanguage(locale,'Comments',languageData) ,
                  dataIndex: 'comments',
                  key: 'comments',
                  render: (text, record) => ( 
                    <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                      {text}
                    </div>),
                },
                {
                  title: onChangeLanguage(locale,'Start Date Time',languageData),
                  dataIndex: 'start_time',
                  key: 'start_time',
                  render: (text, record,index) => ( 
                    <div  style = {{padding:'2px',width:'200px'}}>
                      {text !== '' ? moment(text).format('MM/DD/YYYY hh:mm:ss a') :''} 
                    </div>)
                },
                {
                  title: onChangeLanguage(locale,'End Date Time',languageData),
                  dataIndex: 'end_time',
                  key: 'end_time',
                  render: (text, record,index) => ( 
                    <div  style = {{padding:'2px',width:'200px'}}>
                     {text !== '' ? moment(text).format('MM/DD/YYYY hh:mm:ss a') :''} 
                    </div>)
                },
               
        ]
        return (
            <>
            <Row>
              <Colxx xxs="12"> 
                <div className = "row">
                      <div className = "col-md-8">
                      <Breadcrumb heading="CRM Process" match={match} />
                    </div>
                    {/* <div className = "col-md-3">
                        <Button className = "button-width" color="primary" style= {{}}>
                            <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
                            <a style= {{margin :'0px'}} > {onChangeLanguage(locale,'Upload',languageData)}</a>
                            <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                                className = "filepicker_customButton"
                                style = {{width : '26%',marginLeft :'-22%'}}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
                        </Button>
                        {this.renderTemplate()}
                    </div> */}
                    <div className = "col-md-2">
                          <h2 style = {{marginTop:'15px'}}>Total EQ : {crmcount}</h2>
                        </div>
                        <div className = "col-md-2">
                            <h2  style = {{marginTop:'15px'}}>Last EQ : {crmcountlast}</h2>
                        </div>
                  </div>
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
            <div className = "" style = {{padding:'0px 10px',borderRadius:'10px',marginBottom:'10px'}}>
                    <div className = "row" >
                    <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'GSC user ID',languageData)}</a><br></br> 
                            {username}</Label>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Start Date Time',languageData)}</a><br></br>{start_datetime}</Label>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'End Date Time',languageData)}</a><br></br>{end_datetime}</Label>
                        </div>
                        
                    </div>
                </div> 
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row" style = {{marginBottom:'30px'}}>
                    {/* <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'End Date Time',languageData)}
                            <a style = {{color :'red'}}>*</a>
                                    {(is_submit === true && end_datetime === '')  && <a className ="fontstyle mandatory-label">{onChangeLanguage(locale,'Mandatory Field',languageData)}</a>}</Label>
                                 <DatePicker
                                 isDisabled={is_search === true ? true : false}
                                selected={end_datetime}
                                className = "text-background"
                                onChange={(date) => this.onChangetime(date)}
                                />
                        </div> */}
                    <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Region Name',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select
                            className = {is_submit === true && region === ''?  "error-border-select":"react-select fontstyle" }  
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
                    <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Area Name',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select
                            className = {is_submit === true && area === ''?  "error-border-select":"react-select fontstyle" }  
                            classNamePrefix="react-select"
                            name="form-field-name"
                            placeholder={onChangeLanguage(locale, 'Area', languageData)}
                            value={area_data.filter(option => option.value === area)}
                            options={area_data}
                            isDisabled={is_search === true ? true : false}
                            onChange={this.handlechangearea}
                            // onChange={({ label }) => this.setState({ area: label, sub_area: '' })}
                          />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Sub Area Name',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select
                            className = {is_submit === true && sub_area === ''?  "error-border-select":"react-select fontstyle" }  
                              classNamePrefix="react-select"
                              name="form-field-name"
                              placeholder={onChangeLanguage(locale, 'Sub Area', languageData)}
                              value={teamdata.filter(option => option.value === sub_area)}
                              options={teamdata}
                              isDisabled={is_search === true ? true : false}
                              onChange={({ value }) => this.setState({ sub_area: value })}
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Booking Number',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className={is_submit === true && booking_number === ''?  "error-border":"fontstyle text-background" }
                            value = {booking_number}  
                            type='number'
                            onChange= {(e)=>this.setState({booking_number : e.target.value})} 
                                />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Case Number',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                <Input  className={is_submit === true && case_number === ''?  "error-border":"fontstyle text-background" }
                             type='number'
                                value = {case_number}  
                                
                                onChange= {(e)=>this.setState({case_number : e.target.value})} 
                                />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Action Type',languageData)}<a style = {{color :'red'}}>*</a></Label>
                             <Select  
                                       className={is_submit === true && action_type === ''?  "error-border-select":"react-select fontstyle" }
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={actiondata.filter(option =>option.value === action_type)}
                                        options={actiondata}
                                        onChange={this.handleactoin}
                                    />
                                    </div> 
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Status of the Case',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                
                                <Select  
                                       className={is_submit === true && action_type === ''?  "error-border-select":"react-select fontstyle" }
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={statuscasedata.filter(option =>option.value === status_of_case)}
                                        options={statuscasedata}
                                        isDisabled={is_search === true ? true : false}
                                        onChange={this.handlestatus}
                                    />
                        </div> 
                       <div className="col-lg-3 space-margin">
                            <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Case Received Time', languageData)} <a style={{ color: 'red' }}>*</a></Label>
                            <Input className={is_submit === true && received_datetime === '' ? "error-border" : "fontstyle text-background"}
                                placeholder=''
                                value={received_datetime}
                                disabled={isDataPasted} 
                                onChange={(e) => this.onChangeReceivedTime(e.target.value)}
                                // onChange={(e) => this.setState({ received_time: e.target.value })}
                            />
                            </div>
                      <div className = "col-md-12 space-margin">
                             <Label  className = "fontstyle normal-font" >Comments</Label>
                           <textarea  className = "fontstyle textarea-background"  
                            placeholder = ''
                            value = {comments}  
                            onChange= {(e)=>this.setState({comments : e.target.value})} 
                            />
                        </div>                     
                                 </div>
                 <div className = "row text-center" >                  
                 <Button 
                            className = "button-width" color="secondary"  
                                        onClick={()=>this.fetchData()}
                                >
                                {onChangeLanguage(locale,'Search',languageData)} 
                            </Button>
                       <Button className = "button-width" color="primary"                       
                        onClick={()=>this.onSubmit()}
                        disabled={this.state.isSubmitting}
                                >
                               {onChangeLanguage(locale,'Save',languageData)} 
                            </Button>                           
                        <Button className = "button-width"                        
                        color="secondary"  
                        onClick={()=>this.onrefresh()}
                                >
                                {onChangeLanguage(locale,'Refresh',languageData)}
                            </Button>                          
                </div>
           
                </div>   
                {is_search == true  &&
                <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                
                 <div style = {{padding:'10px'}}>
                    <Table 
                    dataSource={tabledata} 
                    columns={columsss}
                    // rowSelection={rowSelection}
                    tableLayout="auto"
                    rowKey="id"
                    scroll={{ y: 240, x: "max-content" }}
                    pagination={false} 
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}/>
                   
                    </div> 
                    <div className = "row text-center" style = {{margin:'0px 5px'}}>
                    <Button className = "button-width" color="primary"  
                    disabled={searchdata.length >0 ? false :true}
                                           onClick={()=>this.prevTitle(tableindex,searchdata)}>
                            {onChangeLanguage(locale,'Prev',languageData)} 
                            </Button>
                            <Button className = "button-width" color="secondary" 
                                    onClick={()=>this.nextTitle(tableindex,searchdata)}
                                    disabled={searchdata.length >0 ? false :true}>
                            {onChangeLanguage(locale,'Next',languageData)} 
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
  const { locale,languageData,username} = settings;
  return {locale, languageData,username};
};
  export default withRouter(
    connect(mapStateToProps, {

   })(QueryResolveSheet)
  );

