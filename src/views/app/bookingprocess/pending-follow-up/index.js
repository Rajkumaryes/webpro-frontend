import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import Loading from "react-fullscreen-loading";
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import {onChangeLanguage,convertLocalToUTCDate,getValue} from '../../../../helper'
import Select from 'react-select';
import moment from 'moment';
import { createNotification } from '../../../../toast';
import Workbook from 'react-excel-workbook'
import * as clipboard from "clipboard-polyfill/text";
import { getValue_S9610 } from '../../pasteData'
import DatePicker from "../../datePicker";
import{pendingfollowupService} from '../../../../redux/bookingprocess/pendingfollowup/saga'
import { Table,Checkbox } from 'antd';
import{issuecodeService} from '../../../../redux/bookingprocess/issuecode/saga';
import{pendingexceptiontypeService} from '../../../../redux/bookingprocess/pendingexceptiontype/saga'
import{pending_actionService} from '../../../../redux/bookingprocess/pending_action/saga'
import{teamsService} from '../../../../redux/teams/saga';

class BookingSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
            loading:false,
            id:0,
            region: '',
            area: '',
            team: '',
            user_id: '',
            booking_no: '',
            booking_type:'',
            exception_type:'',
            action_type:'',
            exception_raised_date:'',
            exception_resolved_date:'',
            start_date: new Date(),
            end_date: '',
            updated_start_time:new Date(),
            is_search: false,
            is_submit: false,
            exception_type_data: [],
            action_type_data: [],
            csb_office:'',
            issuecode_data:[],
            teamdata:[],
            tableindex:0,
            tabledata:[],
            searchdata:[],
            isDataPasted: false,
            pendingfollowupcount:'',
            pendingfollowupcountlast:'',
            isSubmitting: false 
      }
    }
    componentDidMount() {
       
    this.fetchissie()
    this.fetchexception()
    this.fetchpendingaction()
    this.fetchPendingfollowupCount()
  }
  fetchPendingfollowupCount(){
    this.setState({loading:true})
    const {username} = this.props
    //console.log(username)
    pendingfollowupService.fetchpendingfollowupcount(username)
    .then((res) => {
       if(res.status)   { 
              let filterstatus = res.data;
              let lastdata = res.lastcount;
              this.setState({ 
                pendingfollowupcount:filterstatus, 
                pendingfollowupcountlast:lastdata     
              }) 
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})

}
  fetchexception() {
    this.setState({loading:true})
    pendingexceptiontypeService.fetchapi()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = res.data
             var statuslist = filterstatus.map(function(response) {
                  return  {label : response.name ,value : response.id.toString()};
               });  
                this.setState({
                  exception_type_data :  statuslist
                })
               
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})
 } 
 fetchpendingaction() {
  this.setState({loading:true})
  pending_actionService.fetchapi()
  .then((res) => {
     if(res.status)   { 
        let filterstatus = res.data
           var statuslist = filterstatus.map(function(response) {
                return  {label : response.name ,value : response.id.toString()};
             });  
              this.setState({
                action_type_data :  statuslist
              })
             
           }
           else{
           this.setState({loading:false})}
           })
           .catch((error) => { }); 
           this.setState({loading:false})
} 
fetchissie() {  
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
          let filterstatus = res.data
          var list = filterstatus.map(function(areaaval) {
            return  {id : (areaaval.id).toString(),
            area: areaaval.area,region: areaaval.region,team: areaaval.team,issue_code:areaaval.issue_code};
            }); 
          this.setState({ 
            issuecode_data:list  , 
                     
          }) 
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
   onChangeFileUpload(files)
    {
      const {tableindex}=this.state
      this.setState({
        loading : true
      })
      pendingfollowupService.fileUpload(files[0])
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
                  is_search:true,
                  loading:false
                })
              createNotification('Uploaded','success','filled')
             
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
       
   
  
      onClearValue() {
          this.setState({
            region: '',
            area: '',
            team: '',
            user_id: '',
            booking_no: '',
            booking_type:'',
            exception_type:'',
            action_type:'',
            exception_raised_date:'',
            exception_resolved_date:'',
            start_date: new Date(),
            end_date: '',
            id:0,
            csb_office:'',
            is_search: false,
            is_submit: false,
            updated_start_time:new Date(),
            tableindex:0,
            tabledata:[],
          })
         
        } 
        onSubmit() { 
          this.setState({ isSubmitting: true });
          const { id,region,area,team,booking_no,booking_type,exception_type,exception_type_data,
            action_type,csb_office,exception_raised_date,exception_resolved_date,updated_start_time} = this.state;
          if( booking_no !=='' && booking_type  !=='' && exception_type!=='' && 
          action_type!=='' && exception_raised_date !=='' && exception_resolved_date !=='' && csb_office !=='' && region !=='' && area !=='' && team !=='')
          {
              const end_time =  moment(new Date()).format(' hh:mm:ss a') 
              const {username} = this.props
              let   end_date=convertLocalToUTCDate(new Date()),
              start_date=convertLocalToUTCDate(updated_start_time),
                updatedstarttime=convertLocalToUTCDate(updated_start_time),
                updated_end_time=convertLocalToUTCDate(new Date())
              pendingfollowupService.creatependingfollowup(id, region,area,team,csb_office,username,booking_no,booking_type,exception_type,action_type,exception_raised_date,exception_resolved_date,start_date,end_date,updatedstarttime ,updated_end_time)
                .then((res) => { 
                  this.setState({  
                    end_date:end_time,
                    loading : false,
                    isSubmitting: false    
                  }) 
                  if(res.status)
                    {
                      createNotification('Created','success','filled')
                      this.onClearValue()
                      this.fetchPendingfollowupCount()
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
        gsc_userid:record.user_id,
        region:record.region,
        area:record.area,
        team:record.team,
        user_id:record.user_id,
        booking_no:record.booking_no,
        booking_type:record.booking_type,
        exception_type:record.exception_type,
        action_type:record.action_type,
        exception_raised_date:record.exception_raised_date,
        csb_office:record.csb_office,
        exception_resolved_date:record.exception_resolved_date,
        start_date:moment(record.start_time).format('MM/DD/YYYY hh:mm:ss a'),
        end_date:moment(record.end_time).format('MM/DD/YYYY hh:mm:ss a'),
        is_submit:false,
        is_search:true
        })
    }

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
  const {booking_no,exception_raised_date,tableindex} = this.state 
  if(booking_no !== "" || exception_raised_date !=='')
  {
      this.setState({
          loading : true,
          is_submit:false
      })
      pendingfollowupService.search(booking_no,exception_raised_date)
      .then((res) => {
         
          this.setState({loading:false})
          // this.onrefresh()
      if(res.status)   { 
        let dta =res.data
        this.setValue(dta[tableindex],tableindex)
        
          this.setState({
            searchdata:res.data,
            is_search:true,
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
    createNotification('Please Enter Booking Number or Exception Raised Date/Time','error','filled')
  }
}
        renderTemplate()
        {
          const {languageData,locale} = this.props
        
          const column_name = ["GSC User ID","Region", "Area", "Sub Area","CSB Office", "Booking Number","Booking Type","Exception Type",
          "Action Type", "Exception Raised Date/Time", "Exception Resolved Date/Time","Start DateTime","End DateTime"]
            return(
              
              <Workbook filename="Pending Follow-up Sheet.xlsx" element={
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
        async onPasteS9610() {
          const {issuecode_data}=this.state
          clipboard.readText().then((text) => {
            var record = getValue_S9610(text)
            console.log("kjbkj ", JSON.stringify(record))
            let bookingtype=''
            if(record.temp ==='N'){
              if(record.oog ==='N'){
                if(record.dg ==='N'){
                  bookingtype = 'Standard Cargo'
                }
              }
            }if(record.temp ==='Y'){
              bookingtype = 'Reefer'
            }else if(record.oog ==='Y'){
              bookingtype = 'OOG'
            }else if(record.dg ==='Y'){
              bookingtype = 'DG'
            }
            let value=(record.csb_office).trim()
            this.setState({
                   booking_no:record.booking_number,
                   booking_type:bookingtype,
                   csb_office:record.csb_office,
                   region:getValue(issuecode_data, 'issue_code', 'id',value),
                  area:  getValue(issuecode_data, 'issue_code', 'id',value),
                  team: getValue(issuecode_data, 'issue_code', 'id',value)
                })
      
          });
          this.setState({
            isDataPasted: true
        }); 
  }
        handleChangeException_type = (selectedOptions) => {
          this.setState({ exception_type: selectedOptions.value })
        }
        handleChangeAction_Type = (selectedOptions) => {
          this.setState({ action_type: selectedOptions.value })
        }
        onChangeraisedtime(date)
        {
          this.setState({exception_raised_date  : date})
         
        }
        onChangeresolvedtime(date)
        {
          this.setState({exception_resolved_date  : date})
         
        }
        getteamvalue(value) {
          console.log("kjbkj issuer = ", getValue(this.state.issuecode_data, 'issue_code', 'id', value))
          this.setState({
            csb_office: value,
              region:getValue(this.state.issuecode_data, 'issue_code', 'id', value),
              area:  getValue(this.state.issuecode_data, 'issue_code', 'id', value),
              team: getValue(this.state.issuecode_data, 'issue_code', 'id', value)
          })
      }
    render()
    {
        const {match,locale,languageData,username} = this.props
        const {loading,region,area,team,booking_no,booking_type,exception_type,exception_type_data,isDataPasted,
        action_type,action_type_data,exception_raised_date,exception_resolved_date,start_date,end_date,pendingfollowupcount,pendingfollowupcountlast,
        is_submit,is_search,searchdata,teamdata,csb_office,tabledata,tableindex} = this.state
        const  columsss = [
          {
            title:onChangeLanguage(locale,'GSC user ID',languageData),
            dataIndex: 'user_id',
            key: 'user_id',
            render: (text, record,index) => ( 
              <div   style = {{padding:'2px',width:'200px'}}>
              {text}
              </div>),
          },
          {
            title:onChangeLanguage(locale,'CSB Office/Assigned user id',languageData),
            dataIndex: 'csb_office',
            key: 'csb_office',
            render: (text, record,index) => ( 
              <div   style = {{padding:'2px',width:'200px'}}>
              {text}
              </div>),
          },
          {
            title: onChangeLanguage(locale,'Region',languageData),
            dataIndex: 'region',
            key: 'region',
            render: (text, record) => ( 
              <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                {getValue(this.state.issuecode_data, 'id', 'region', text)}
                </div>),
          },
          {
            title: onChangeLanguage(locale,'Area',languageData),
            dataIndex: 'area',
            key: 'area',
            render: (text, record) => ( 
              <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
               {getValue(this.state.issuecode_data, 'id', 'area', text)}
              </div>),
          },
          {
            title: onChangeLanguage(locale,'Sub Area',languageData),
            dataIndex: 'team',
            key: 'team',
            render: (text, record) => ( 
              <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
               {getValue(this.state.issuecode_data, 'id', 'team', text)}
               
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
              title: onChangeLanguage(locale,'Booking Type',languageData),
              dataIndex: 'booking_type',
              key: 'booking_type',
              render: (text, record) => ( 
                  <div className="row d-flex justify-content-center"  style = {{padding:'2px',width:'200px'}}>
                    {text}
                  </div>)
            },
            {
              title: onChangeLanguage(locale,'Exception Type',languageData),
              dataIndex: 'exception_type',
              key: 'exception_type',
              render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>
                     {getValue(exception_type_data, 'value', 'label', text)} 
                  </div>)
            },
              {
                title:onChangeLanguage(locale,'Action Type',languageData) ,
                dataIndex: 'action_type',
                key: 'action_type',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                    {getValue(action_type_data, 'value', 'label', text)} 
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Exception Raised Date/Time',languageData) ,
                dataIndex: 'exception_raised_date',
                key: 'exception_raised_date',
                render: (text, record) => ( 
                  <div  style = {{padding:'2px',width:'100px'}}>
                  {(text !== null && text !== '')  && moment(text).format('MM/DD/YYYY hh:mm:ss a')}
                 </div>),
              },
              {
                title:onChangeLanguage(locale,'Exception Resolved Date/Time',languageData) ,
                dataIndex: 'exception_resolved_date',
                key: 'exception_resolved_date',
                render: (text, record) => ( 
                  <div  style = {{padding:'2px',width:'100px'}}>
                  {(text !== null && text !== '')  && moment(text).format('MM/DD/YYYY hh:mm:ss a')}
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
             {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <title>{onChangeLanguage(locale,'Pending Follow-up Sheet',languageData)}</title>
                <Row>
                    <Colxx xxs="12">
                        <div className = "row">
                        <div className = "col-md-5">
                        <Breadcrumb heading={onChangeLanguage(locale,'Pending Follow-up Sheet',languageData)} match={match} />
                        </div>
                       
                        <div className = "col-md-3">
                                 {this.renderTemplate()}
                            <Button className = "button-width" color="primary">
                            <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
                            <a style= {{margin :'0px'}} > {onChangeLanguage(locale,'Upload',languageData)}</a>
                            <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                                className = "filepicker_customButton"
                                style = {{width : '26%',marginLeft :'-22%'}}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
                            </Button>
                        </div>
                        <div className = "col-md-2">
                          <h2 style = {{marginTop:'15px'}}>Total EQ : {pendingfollowupcount}</h2>
                        </div>
                        <div className = "col-md-2">
                            <h2  style = {{marginTop:'15px'}}>Last EQ : {pendingfollowupcountlast}</h2>
                        </div>
                        </div>
                        <Separator className = "separator-margin"/>
                    </Colxx>
                </Row>
                <div className="publishuser-card-component" style={{ padding: '10px', borderRadius: '10px', marginBottom: '30px' }}>
                  <div className="row" style={{ marginBottom: '30px' }}>
                    <div className="col-md-3 space-margin">
                      <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'GSC user ID', languageData)}
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
                    <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'CSB Office/Assigned user id',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                <Input  className={is_submit === true && csb_office === ''?  "error-border-paste":"fontstyle text-background-paste" }
                                value = {csb_office} 
                                onChange={(e) => this.getteamvalue(e.target.value)} 
                                disabled={isDataPasted} 
                                // onChange= {(e)=>this.setState({csb_office : e.target.value})} 
                                />
                        </div>
                        <div className = "col-md-3 space-margin">
                      
                      <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Region Name',languageData)}
                      <a style={{ color: 'red' }}>*</a>
                      {is_submit === true && region === '' && <p className='fontstyle mandatory-label'> {onChangeLanguage(locale, 'Mandatory Field', languageData)} </p>}
                                  <br></br>{getValue(this.state.issuecode_data, 'id', 'region', region)}
                                  </Label>
                  </div>
                  <div className = "col-md-3 space-margin">
                      <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Area Name',languageData)}
                      <a style={{ color: 'red' }}>*</a>
                      {is_submit === true && area === '' && <p className='fontstyle mandatory-label'> {onChangeLanguage(locale, 'Mandatory Field', languageData)} </p>}
                                  <br></br>{getValue(this.state.issuecode_data, 'id', 'area', area)}
                                  </Label>
                  </div>
                  <div className = "col-md-3 space-margin">
                      <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Sub Area Name',languageData)}
                      <a style={{ color: 'red' }}>*</a>
                      {is_submit === true && team === '' && <p className='fontstyle mandatory-label'> {onChangeLanguage(locale, 'Mandatory Field', languageData)} </p>}
                                  <br></br>{getValue(this.state.issuecode_data, 'id', 'team', team)}
                                  </Label>             
                  </div>
                    <div className="col-md-3 space-margin">
                        <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Booking Number', languageData)}<a style={{ color: 'red' }}>*</a></Label>
                        <Input className={is_submit === true && booking_no === '' ? "error-border-paste" : "fontstyle text-background-paste"}
                          value={booking_no}
                          type = 'number'
                          disabled={isDataPasted}
                          onChange={(e) => this.setState({ booking_no: e.target.value })}
                        />
                      </div>
                      <div className="col-md-3 space-margin">
                        <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Booking Type', languageData)}<a style={{ color: 'red' }}>*</a></Label>
                        <Input className={is_submit === true && booking_type === '' ? "error-border-paste" : "fontstyle text-background-paste"}
                          value={booking_type}
                          disabled={isDataPasted}
                          onChange={(e) => this.setState({ booking_type: e.target.value })}
                        />
                      </div>
                      <div className="col-md-3 space-margin">
                        <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Exception Type', languageData)}<a style={{ color: 'red' }}>*</a></Label>
                        <Select
                          className={is_submit === true && exception_type === '' ? "error-border-select" : "react-select fontstyle"}
                          classNamePrefix="react-select"
                          name="form-field-name"
                          value={exception_type_data.filter(option => option.value === exception_type)}
                          options={exception_type_data}
                          onChange={this.handleChangeException_type}
                        />
                      </div>
                      <div className="col-md-3 space-margin">
                        <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Action Type', languageData)}<a style={{ color: 'red' }}>*</a></Label>
                        <Select
                          className={is_submit === true && action_type === '' ? "error-border-select" : "react-select fontstyle"}
                          classNamePrefix="react-select"
                          name="form-field-name"
                          value={action_type_data.filter(option => option.value === action_type)}
                          options={action_type_data}
                          onChange={this.handleChangeAction_Type}
                        />
                      </div>
                      <div className = "col-md-3 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Exception Raised Date/Time',languageData)}<a style = {{color :'red'}}>*</a>
                          {(is_submit === true && exception_raised_date === '')  && <a className ="fontstyle mandatory-label">{onChangeLanguage(locale,'Mandatory Field',languageData)}</a>}
                          </Label>
                            <DatePicker
                            selected={exception_raised_date}
                            className = "text-background"
                            onChange={(date) => this.onChangeraisedtime(date)}
                            />
                          
                      </div>
                      <div className = "col-md-3 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Exception Resolved Date/Time',languageData)}<a style = {{color :'red'}}>*</a>
                          {(is_submit === true && exception_resolved_date === '')  && <a className ="fontstyle mandatory-label">{onChangeLanguage(locale,'Mandatory Field',languageData)}</a>}
                          </Label>
                            <DatePicker
                            selected={exception_resolved_date}
                            className = "text-background"
                            onChange={(date) => this.onChangeresolvedtime(date)}
                            />
                          
                      </div>
                    </div>
                    <div className="row text-center" style={{ margin: '0px 5px' }}>
                        <Button className="button-width" color="secondary"
                          onClick={() => this.onPasteS9610()}>
                          {onChangeLanguage(locale, 'Paste S9610', languageData)}
                        </Button>
                        <Button  className = "button-width" color="secondary"  
                    onClick={()=>this.fetchData()}>
                      {onChangeLanguage(locale,'Search',languageData)} 
                    </Button> 
                        <Button className="button-width" color="primary"
                          onClick={() => this.onSubmit()} disabled={this.state.isSubmitting}>
                          {onChangeLanguage(locale, 'Save', languageData)}
                        </Button>
                        <Button className="button-width" color="secondary"
                          onClick={() => this.onClearValue()}>
                          {onChangeLanguage(locale, 'Refresh', languageData)}
                        </Button>
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

   })(BookingSheet)
  );
