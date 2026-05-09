import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import Loading from "react-fullscreen-loading";
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import {onChangeLanguage,convertLocalToUTCDate,getValue,permittedlevel} from '../../../../helper'
import Select from 'react-select';
import moment from 'moment';
import Workbook from 'react-excel-workbook'
import { createNotification } from '../../../../toast';
import{errorcapturingService} from '../../../../redux/bookingprocess/errorcaptureservice/saga'
import { Table,Checkbox } from 'antd';
import{teamsService} from '../../../../redux/teams/saga';
import{errortypeService} from '../../../../redux/bookingprocess/errortype/saga'
import{errorstatusService} from '../../../../redux/bookingprocess/errorstatus/saga'
import{issuecodeService} from '../../../../redux/bookingprocess/issuecode/saga';
import{roleService} from '../../../../redux/role/saga'
import{levelService} from '../../../../redux/level/saga'
import { userService } from '../../../../redux/users/saga';



class BookingSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
            loading:false,
            id:0,
            region:'',
            area:'',
            team:'',
            user_id:'',
            date:'',
            booking_no:'',
            customer_mc:'',
            mr_match_code:'',
            error_type:'',
            error_description:'',
            error_userid:'',
            error_status:'',
            action_plan:'',
            error_sensitivity:'',
            csb_office:'',
            updated_start_time:new Date(),
            is_search:false,
            is_submit:false,
            teamdata:[],
            error_type_data:[],
            error_status_data:[],
            tableindex:0,
            tabledata:[],
            searchdata:[],
            issuecode_data:[],
            is_adimin_Edit:false,
            userdata:[]

      }
    }
    componentDidMount() {
        this.setState({
            date:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'), 
        })
        this.fetcherrortype()
        this.fetcherrorstatus()
        this.fetchissie()
        this.fetchuser()
    }
    fetchuser() {  
      this.setState({
        loading : true
      })
      userService.fetchuserData()
        .then((res) => { 
          this.setState({   
        loading : false 
                
          }) 
          if(res.status)
            {
             
              var user_id = localStorage.getItem("user_id")
              let is_admin =permittedlevel(res.data,user_id)
             this.setState({
              is_adimin_Edit:is_admin
             })
            }            
      
      })
      .catch((error) => { 
        this.setState({
          loading : false
        })
        });   
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
    
   fetcherrorstatus() {
    this.setState({loading:true})
    errorstatusService.fetchapi()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var teamlist = filterstatus.map(function(response) {
                  return  {label : response.name ,value : response.id.toString()};
               });  
                this.setState({
                  error_status_data :  teamlist
                })
               
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})
 }  
 fetcherrortype() {
  this.setState({loading:true})
  errortypeService.fetchapi()
  .then((res) => {
     if(res.status)   { 
        let filterstatus = (res.data).filter(item => item.status === 1)
           var teamlist = filterstatus.map(function(response) {
                return  {label : response.name ,value : response.id.toString()};
             });  
              this.setState({
              error_type_data :  teamlist
              })
             
           }
           else{
           this.setState({loading:false})}
           })
           .catch((error) => { }); 
           this.setState({loading:false})
}  
    handleChangeError_type = (selectedOptions) => {
        this.setState({error_type : selectedOptions.value})  
    }
    handleChangeError_Status = (selectedOptions) => {
        this.setState({error_status : selectedOptions.value})  
    }
    onChangeFileUpload(files)
    {
      const {tableindex}=this.state
      this.setState({
        loading : true
      })
      errorcapturingService.fileUpload(files[0])
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
                  loading : false
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
            region:'',
            area:'',
            team:'',
            user_id:'',
            date:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
            booking_no:'',
            customer_mc:'',
            mr_match_code:'',
            error_type:'',
            error_description:'',
            error_userid:'',
            error_status:'',
            action_plan:'',
            is_search:false,
            is_submit:false,
            updated_start_time:new Date(),
            csb_office:'',
            error_sensitivity:'',
            tableindex:0,
            tabledata:[],
            id:0
        })
       
      } 
      onSubmit() { 
        const {id, region, area,team,date,booking_no,customer_mc,mr_match_code,error_type,
          error_description,error_userid,error_status,action_plan,error_sensitivity,updated_start_time,csb_office} = this.state;
        if( booking_no !==''&& customer_mc!=='' && region !=='' &&area !=='' &&team!=='' && csb_office !=='' && mr_match_code !=='' &&error_type !=='' &&
        error_userid !=='' && error_sensitivity !=='' && error_description !=='')
        {
            const end_time =  moment(new Date()).format(' hh:mm:ss a') 
            const {username} = this.props
            let   end_date=convertLocalToUTCDate(new Date()),
            start_date=convertLocalToUTCDate(updated_start_time),
              updatedstarttime=convertLocalToUTCDate(updated_start_time),
              updated_end_time=convertLocalToUTCDate(new Date())
            errorcapturingService.createerrorcapturing( id, region,area,team,username,date,booking_no,customer_mc,mr_match_code,error_type,error_description,error_userid,error_status,csb_office,action_plan,parseInt(error_sensitivity),start_date,end_date ,updatedstarttime ,updated_end_time)
              .then((res) => { 
                this.setState({  
                    end_time:end_time,
                  loading : false     
                }) 
                if(res.status)
                  {
                    createNotification('Created','success','filled')
                    this.onClearValue()
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
setValue(record,id)
  {
    let nn =[]
        nn.push(record)
            this.setState({
              tabledata:nn,
              tableindex:id
            })
            console.log('record',record)
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
        date:record.date,
        booking_no:record.booking_no,
        customer_mc:record.customer_mc,
        mr_match_code:record.mr_match_code,
        error_type:record.error_type,
        error_description:record.error_description,
        error_userid:record.error_userid,
        error_status:record.error_status,
        csb_office:record.csb_office,
        action_plan:record.action_plan,
        error_sensitivity:record.sensitivity,
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
  const {booking_no,error_type,tableindex} = this.state 
  if(booking_no !== "" || error_type !=='')
  {
      this.setState({
          loading : true,
          is_submit:false
      })
      errorcapturingService.search(booking_no,error_type)
      .then((res) => {
         
          this.setState({loading:false})
         
      if(res.status)   { 
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
    createNotification('Please Enter Booking Number or Error Type','error','filled')
  }
}
      renderTemplate()
      {
        const {languageData,locale} = this.props
      
        const column_name = ["Region", "Area", "Sub Area","CSB Office", "GSC user ID", "Date","Booking Number","Customer MC","MR Match Code", "Error Type", "Error Description","Error User ID", "Error Status", "Action Plan","Error Sensitivity"  ]
          return(
            
            <Workbook filename="Error Capturing.xlsx" element={
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
        const {loading ,region, area,team,date,booking_no,customer_mc,mr_match_code,error_type,
        error_description,error_userid,error_status,action_plan,error_sensitivity,error_type_data,error_status_data,
        is_search, csb_office,is_submit,searchdata,teamdata,tabledata,tableindex,is_adimin_Edit} = this.state
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
            title:onChangeLanguage(locale,'Date',languageData),
            dataIndex: 'date',
            key: 'date',
            render: (text, record,index) => ( 
              <div   style = {{padding:'2px',width:'200px'}}>
              {text}
              </div>),
          },
          {
            title:onChangeLanguage(locale,'CSB Office/Assigned user ID',languageData),
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
                title: onChangeLanguage(locale,'Customer MC',languageData),
                dataIndex: 'customer_mc',
                key: 'customer_mc',
                render: (text, record) => ( 
                    <div className="row d-flex justify-content-center"  style = {{padding:'2px',width:'200px'}}>
                      {text}
                    </div>)
              },
              {
                title: onChangeLanguage(locale,'MR Match Code',languageData),
                dataIndex: 'mr_match_code',
                key: 'mr_match_code',
                render: (text, record,index) => ( 
                    <div   style = {{padding:'2px',width:'200px'}}>{text}
                    </div>)
              },
                {
                  title:onChangeLanguage(locale,'Error Type',languageData) ,
                  dataIndex: 'error_type',
                  key: 'error_type',
                  render: (text, record) => ( 
                    <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                       {getValue(error_type_data, 'value', 'label', text)} 
                    </div>),
                },
                {
                  title:onChangeLanguage(locale,'Error User ID',languageData) ,
                  dataIndex: 'error_userid',
                  key: 'error_userid',
                  render: (text, record) => ( 
                    <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                      {text}
                    </div>),
                },
                {
                  title:onChangeLanguage(locale,'Error Status',languageData) ,
                  dataIndex: 'error_status',
                  key: 'error_status',
                  render: (text, record) => ( 
                    <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                      {getValue(error_status_data, 'value', 'label', text)} 
                    </div>),
                },
               
                {
                  title:onChangeLanguage(locale,'Action Plan',languageData) ,
                  dataIndex: 'action_plan',
                  key: 'action_plan',
                  render: (text, record) => ( 
                    <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                      {text}
                    </div>),
                },
                {
                  title:onChangeLanguage(locale,'Error Sensitivity',languageData) ,
                  dataIndex: 'sensitivity',
                  key: 'sensitivity',
                  render: (text, record) => ( 
                    <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                      {text}
                    </div>),
                },
                {
                  title:onChangeLanguage(locale,'Error Description',languageData) ,
                  dataIndex: 'error_description',
                  key: 'error_description',
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
             {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <title>{onChangeLanguage(locale,'Error Capturing',languageData)}</title>
               
                <Row>
                    <Colxx xxs="12">
                        <div className = "row">
                        <div className = "col-md-8">
                        <Breadcrumb heading={onChangeLanguage(locale,'Error Capturing',languageData)} match={match} />
                        </div>
                       
                        <div className = "col-md-4">
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
                        </div>
                        <Separator className = "separator-margin"/>
                    </Colxx>
                 </Row>
                    <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                        <div className = "row" style = {{marginBottom:'30px'}}>
                        <div className = "col-md-3 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'GSC user ID',languageData)}
                                <br></br>{username}
                                </Label>
                                       
                            </div>
                            <div className = "col-md-3 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Date',languageData)}
                                <br></br>{date}
                                </Label>
                                       
                            </div>
                            <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'CSB Office/Assigned user ID',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                <Input  className={is_submit === true && csb_office === ''?  "error-border":"fontstyle text-background" }
                                value = {csb_office} 
                                onChange={(e) => this.getteamvalue(e.target.value)} 
                                disabled={is_search === true ? true : false} 
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
                            <div className = "col-md-3 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Booking Number',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                        <Input  className={is_submit === true && booking_no === ''?  "error-border":"fontstyle text-background" }
                                        value = {booking_no}  
                                        type = 'number'
                                        onChange= {(e)=>this.setState({booking_no : e.target.value})} 
                                    />
                            </div>
                            <div className = "col-md-3 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Customer MC',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                        <Input  className={is_submit === true && customer_mc === ''?  "error-border":"fontstyle text-background" }
                                        value = {customer_mc}  
                                        onChange= {(e)=>this.setState({customer_mc : e.target.value})} 
                                    />
                            </div>
                            <div className = "col-md-3 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'MR Match Code',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                        <Input  className={is_submit === true && mr_match_code === ''?  "error-border":"fontstyle text-background" }
                                        value = {mr_match_code}  
                                        onChange= {(e)=>this.setState({mr_match_code : e.target.value})} 
                                    />
                            </div>
                            <div className = "col-md-3 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Type',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                     <Select  
                                       className={is_submit === true && error_type === ''?  "error-border-select":"react-select fontstyle" }
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={error_type_data.filter(option =>option.value === error_type)}
                                        options={error_type_data}
                                        onChange={this.handleChangeError_type}
                                    />
                            </div>
                           
                            <div className = "col-md-3 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error User ID',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                        <Input  className={is_submit === true && error_userid === ''?  "error-border":"fontstyle text-background" }
                                        value = {error_userid}  
                                        onChange= {(e)=>this.setState({error_userid : e.target.value})} 
                                    />
                            </div>
                            <div className = "col-md-3 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Status',languageData)}</Label>
                                     <Select  
                                       className={"react-select fontstyle" }
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={error_status_data.filter(option =>option.value === error_status)}
                                        options={error_status_data}
                                        isDisabled={is_adimin_Edit === true ? false : true} 
                                        onChange={this.handleChangeError_Status}
                                    />
                            </div>
                            <div className = "col-md-3 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Action Plan',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                        <Input  className={"fontstyle text-background" }
                                        value = {action_plan}  
                                        onChange= {(e)=>this.setState({action_plan : e.target.value})} 
                                    />
                            </div>
                            <div className = "col-md-3 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Sensitivity',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                        <Input  className={is_submit === true && error_sensitivity === ''?  "error-border":"fontstyle text-background" }
                                        value = {error_sensitivity}  
                                        type='number'
                                        onChange= {(e)=>this.setState({error_sensitivity : e.target.value})} 
                                    />
                            </div>
                            <div className = "col-md-12 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Description',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                <textarea  className = {is_submit === true && error_description === ''?  "border-textarea-background":"fontstyle textarea-background" } 
                                        value = {error_description}  
                                        onChange= {(e)=>this.setState({error_description : e.target.value})} 
                                      />
                            </div>
                        </div>
                        <div className = "row text-center" style = {{margin:'0px 5px'}}>
                        <Button  className = "button-width" color="secondary"  
                                onClick={()=>this.fetchData()}>
                        {onChangeLanguage(locale,'Search',languageData)} 
                        </Button> 
                            <Button className = "button-width" color="primary"  
                                            onClick={()=>this.onSubmit()}>
                            {onChangeLanguage(locale,'Save',languageData)} 
                            </Button>
                            <Button className = "button-width" color="secondary" 
                                    onClick={()=>this.onClearValue()}>
                            {onChangeLanguage(locale,'Refresh',languageData)} 
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
