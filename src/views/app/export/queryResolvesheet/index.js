import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { createNotification } from '../../../../toast';
import{QuerylevelService} from '../../../../redux/Export/querylevelsheet/saga'
import {onChangeLanguage,convertLocalToUTCDate} from '../../../../helper'
import Select from 'react-select';
import Loading from "react-fullscreen-loading";
import{teamService} from '../../../../redux/Export/masters/exportteam/saga'
import{userService} from '../../../../redux/users/saga'
import Workbook from 'react-excel-workbook'
import {getValue} from '../../../../helper'
import moment from 'moment';
import DatePicker from "../../datePicker";
import {getValue_Z1910} from '../../pasteData'
import * as clipboard from 'clipboard-polyfill/text'
import DatePickerDate from "../../datePickerDate";


class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data:[],
        user_data:[],
        loading:false,
        shipment_no:'',
        exception:'',
        status:'',
        issueDate:'',
        cr:'',
        mtd:'',
        ap:'',
        issueorg:'',
        issueuser:'',
        revierorg:'',
        usergroup:'',
        revierstatus:'',
        changedby:'',
        lastchange:'',
        start_time:new Date(),
        updated_start_time:new Date(),
        end_time:'',
        userid:'',
        team:'',
        createdat:'',
        completed:'',
        closed:'',
        region:'',
        teamdata:[],
        regiondata:[],
        userdata:[],
        team_data:[],
        errortypedata:[],
        is_submit:false,
        issuecode_data:[],
        isDataPasted: false,
        queryresolvecount:'',
        queryresolvecountlast:'',
      };
    }
    componentDidMount() {
       
        // this.fetchData()
        this.fetchuserid()
        this.fetchteam()
        this.fetchQueryresolveCount()
      }
      fetchQueryresolveCount(){
        this.setState({loading:true})
        const {username} = this.props
        console.log(username)
        QuerylevelService.fetchqueryresolvecount(username)
        .then((res) => {
           if(res.status)   { 
                  let filterstatus = res.data;
                  let lastdata = res.lastcount;
                  this.setState({ 
                    queryresolvecount:filterstatus, 
                    queryresolvecountlast:lastdata     
                  }) 
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
  
  }
      fetchData() {
        this.setState({
            loading : true
          })
        QuerylevelService.fetchquerylevel()
        .then((res) => {
           if(res.status)   { 
                    this.setState({
                    data :  res.data,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
      } 
    fetchuserid() {
        this.setState({
            loading : true
          })
          userService.fetchpermission_user('Exports')
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.is_active === 1)
                 var useridlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.username ,value : cusmaidid.username};
                   });  
                   var userid_list = filterstatus.map(function(cusmaidid) {
                    return  {text : cusmaidid.username ,value : cusmaidid.username};
                 });  
                    this.setState({
                    userdata :  useridlist,
                    user_data:userid_list,
                    loading:false
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
     }  
     fetchteam() {
        teamService.fetchteams()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var team_list = filterstatus.map(function(cusmaidid) {
                      return  {text : cusmaidid.team_name ,value : cusmaidid.id};
                   });  
                   var teamlist = filterstatus.map(function(cusmaidid) {
                    return  {label : cusmaidid.team_name ,value : cusmaidid.id.toString()};
                 });  
                    this.setState({
                    teamdata :  teamlist,
                    team_data :  team_list,
                    })
                 }
                 else{
                 this.setState({})}
                 })
                 .catch((error) => { }); 
     }  
 
    
    onPaste() 
    {
        navigator.clipboard.readText().then((text)=>{
            console.log("lkbkjj" , text)
            console.log("lkbkjj" ,typeof text)
          
        })
    }
    onCopy()
    {
        navigator.clipboard.writeText(this.state.shipment_no)
    }
    onChangeFileUpload(files)
    {

    }

    validDate(date,title)
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
        if(isfill === false)
        {
           createNotification(`Please Enter ${title} (MM/DD/YYYY)`,'error','filled') 
        }

        return date_value

    }

   
    onSubmit() { 
        const {shipment_no,exception,status,issueDate,cr,mtd,ap,issueorg,issueuser,revierorg,usergroup,
            revierstatus,changedby,lastchange,start_time,userid,team,createdat,completed,closed,updated_start_time} = this.state;
         
        if(shipment_no!== "" &&exception !== "" &&status!== "" &&issueDate!== "" &&cr!== "" &&mtd!== "" &&
                ap!== "" &&issueorg!== "" &&issueuser!== "" &&revierorg!== "" && 
                revierstatus!== "" && changedby!== "" && 
                team!== "" && createdat!== "" && completed!== "" && closed)
            { 
              const end_time =   new Date() ,updated_end_time = new Date()

              var issueDates =  moment(issueDate).format('MM/DD/YYYY')
              var lastchanges =  moment(lastchange).format('MM/DD/YYYY')
              const {username} = this.props


            this.setState({
              end_time:end_time
            })   
            this.setState({
              loading : true
            })
            QuerylevelService.createquerylevel(shipment_no,exception,status,issueDates,cr,mtd,ap,issueorg,issueuser,revierorg,usergroup,
                revierstatus,changedby,lastchanges,username,team,createdat,completed,closed,
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
                    this.onrefresh()
                    this.fetchQueryresolveCount()
                  }    
                  else
                  {
                    createNotification(res.message,'error','filled');
                  }          
            
            })
            .catch((error) => { 
              this.setState({
                loading : false,
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

      onChangeissue(value)
      {
          this.setState({issueDate:value})
      }
      onChangelast(value)
      {
          this.setState({lastchange:value})
      }
      
      onrefresh() {
        this.setState({
          shipment_no:'',
          exception:'',
          status:'',
          issueDate:'',
          cr:'',
          mtd:'',
          ap:'',
          issueorg:'',
          issueuser:'',
          revierorg:'',
          usergroup:'',
          revierstatus:'',
          changedby:'',
          lastchange:'',
          start_time:new Date(),
          updated_start_time:new Date(),
          end_time:'',
          userid:'',
          team:'',
          createdat:'',
          completed:'',
          closed:'',
          region:'',
          is_submit:false,
        })
        
      } 
      renderTemplate()
  {
    const {languageData,locale} = this.props
    const {data} = this.state
    var array = data.map(record=> {
          return {
            'Shipment Number' : record.shipment_no,
            'Exception' : record.exception,
            'Status' : record.status,
            'Issue Date' : record.issue_date,
            'CR':record.cr,
            'MTD Number':record.mtd,
            'AP':record.ap,
            'Issue Org':record.issue_org,
            'Received organization':record.receiver_org,
            'Iss. User ID':record.iss_userid,
            'Reiver Org':record.revier_org,
            'User/ Group':record.user,
            'Changed by':record.changed_by,
            'Last change':record.last_change,
            'Start date' :record.start_date,
            'End date':record.end_date,
            'User ID':getValue(this.state.user_data,'value','text',parseInt(record.userid)),
            'Team':getValue(this.state.team_data,'value','text',parseInt(record.team)),
            'Created at':record.created_at,
            'Completed':record.completed,
            'Closed':record.closed,
        };
      })
      return(
        
        <Workbook filename="Query_Resolve_Sheet.xlsx" element={
          <Button className = "button-width" color="secondary"  style={{width:'150px'}}
          >{ onChangeLanguage(locale,'Download',languageData)}  
          </Button>
		      }>
        <Workbook.Sheet data={array} name="Sheet A">
        <Workbook.Column label="Shipment Number" value="Shipment Number"/>
        <Workbook.Column label="Exception"  value="Exception"/>
        <Workbook.Column label="Status"  value="Status"/>
        <Workbook.Column label="Issue Date"  value="Issue Date"/>
        <Workbook.Column label="CR" value="CR"/>
        <Workbook.Column label="MTD Number" value="MTD Number"/>
        <Workbook.Column label="AP" value="AP"/>
        <Workbook.Column label="Issue Org" value="Issue Org"/>
        <Workbook.Column label="Received organization" value="Received organization"/>
        <Workbook.Column label="Iss. User ID" value="Iss. User ID"/>
        <Workbook.Column label="Reiver Org" value="Reiver Org"/>
        <Workbook.Column label="User/ Group" value="User/ Group"/>
        <Workbook.Column label="Changed by" value="Changed by"/>
        {/* <Workbook.Column label="Last Change" value="Last change"/> */}
        <Workbook.Column label="Start Date " value="Start date"/>
        <Workbook.Column label="End Date" value="End date"/>
        <Workbook.Column label="User ID" value="User ID"/>
        <Workbook.Column label="Team" value="Team"/>
        <Workbook.Column label="Created At" value="Created at"/>
        <Workbook.Column label="Completed" value="Completed"/>
        <Workbook.Column label="Closed" value="Closed"/>
          </Workbook.Sheet> 
        </Workbook>
     

      );
  }
  onChangetime(date)
  {
    console.log("lhnkjh " ,date)
    var time = moment(date).format('HH:mm:ss')
    if(time !== "00:00:00")
    {
      this.setState({createdat  : date})
    }
   
  }
  onChangecompleted(date)
  {
    console.log("lhnkjh " ,date)
    var time = moment(date).format('HH:mm:ss')
    if(time !== "00:00:00")
    {
      this.setState({completed  : date})
    }
   
  }
  onChangeclosed(date)
  {
    console.log("lhnkjh " ,date)
    var time = moment(date).format('HH:mm:ss')
    if(time !== "00:00:00")
    {
      this.setState({closed  : date})
    }
   
  }
 

  async onPasteZ1910() {
    clipboard.readText().then((text)=>{
        var record = getValue_Z1910(text)
    console.log("kjbkj " , JSON.stringify(record))
    this.setState({
           mtd:record.document_no,
           shipment_no:record.shipment_no,
           cr:record.reason_code,
           status:record.eh_status,
           ap:record.action_party,
           exception:record.exception_no,
           issueDate:this.validDate(record.issue_date,'Issue Date'),
           issueorg:record.issueorg,
           issueuser:record.issueuser,
           revierorg:record.revierorg,
           usergroup:record.usergroup,
           revierstatus:record.revierstatus,
        })
        
       
    });
    this.setState({
      isDataPasted: true
  });
}

    render()
    {
        const {match,languageData,locale,username} = this.props
        const {loading,shipment_no,exception,status,issueDate,cr,mtd,ap,issueorg,issueuser,revierorg,usergroup,isDataPasted,queryresolvecount,queryresolvecountlast,
        revierstatus,changedby,start_time,end_time,team,createdat,completed,closed,teamdata,is_submit} = this.state
        return (
            <>
            <title>{onChangeLanguage(locale,'Query Resolve Sheet',languageData)}</title>
            {loading && 
            <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
            </div>
            }
            <Row>
              <Colxx xxs="12">
              <div className = "row">
                      <div className = "col-md-8">
                        <Breadcrumb heading={onChangeLanguage(locale,'Query Resolve Sheet',languageData)} match={match} />
                    </div>
                    <div className = "col-md-2" >
                        <h2 style = {{marginTop:'15px'}}>Total EQ : {queryresolvecount}</h2>
                        </div>
                        <div className = "col-md-2">
                            <h2  style = {{marginTop:'15px'}}>Last EQ : {queryresolvecountlast}</h2>
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
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row" style = {{marginBottom:'5px'}}>
                    <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'User ID',languageData)}
                            <br></br> {username}</Label>
                           
                        </div>

                    <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Start Date',languageData)}
                                <br></br>{moment(start_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'End Date',languageData)}
                                <br></br>
                                {end_time !== '' && moment(end_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Shipment Number',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && shipment_no === ''?  "error-border-paste":"fontstyle text-background-paste" }    
                            placeholder = ''
                            value = {shipment_no}  
                            disabled={isDataPasted} 
                            onChange= {(e)=>this.setState({shipment_no : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Exception',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && exception === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                            placeholder = ''
                            value = {exception}  
                            disabled={isDataPasted} 
                            onChange= {(e)=>this.setState({exception : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Status',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                            <Input 
                            className = {is_submit === true && status === ''?  "error-border-paste":"fontstyle text-background-paste" }    
                            placeholder = ''
                            value = {status}  
                            disabled={isDataPasted} 
                            onChange= {(e)=>this.setState({status : e.target.value})} 
                            />
                        </div>
                      

                     <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Issue Date',languageData)}
                              <a style = {{color :'red'}}>*</a></Label>
                               <p1 className = 'fontstyle mandatory-label'>
                                {is_submit === true && issueDate === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                              <DatePickerDate
                                 selected={issueDate}
                                 className = "text-background-paste" 
                                 disabled={isDataPasted} 
                                 onChange={(date) => this.onChangeissue(date)}
                                 />
                                
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'CR',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && cr === ''?  "error-border-paste":"fontstyle text-background-paste" }   
                            placeholder = ''
                            value = {cr}  
                            disabled={isDataPasted} 
                            onChange= {(e)=>this.setState({cr : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'MTD Number',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && mtd === ''?  "error-border-paste":"fontstyle text-background-paste" }   
                            placeholder = ''
                            value = {mtd}  
                            disabled={isDataPasted} 
                            onChange= {(e)=>this.setState({mtd : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'AP',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && ap === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                            placeholder = ''
                            value = {ap}  
                            disabled={isDataPasted} 
                            onChange= {(e)=>this.setState({ap : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Issue Org.',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && issueorg === ''?  "error-border-paste":"fontstyle text-background-paste" }   
                            placeholder = ''
                            value = {issueorg} 
                            disabled={isDataPasted} 
                            onChange= {(e)=>this.setState({issueorg : e.target.value})} 
                            />
                        </div>
                        
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Iss User ID.',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && issueuser === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                            placeholder = ''
                            value = {issueuser}  
                            disabled={isDataPasted} 
                            onChange= {(e)=>this.setState({issueuser : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Receiver Organization',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && revierorg === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                            placeholder = ''
                            value = {revierorg} 
                            disabled={isDataPasted}  
                            onChange= {(e)=>this.setState({revierorg : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'User / Group',languageData)}
                                </Label>
                            <Input  
                            className = "fontstyle text-background-paste" 
                            placeholder = ''
                            value = {usergroup}  
                            disabled={isDataPasted} 
                            onChange= {(e)=>this.setState({usergroup : e.target.value})} 
                            />
                        </div>
                        
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Receiver Status',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && revierstatus === ''?  "error-border-paste":"fontstyle text-background-paste" }   
                            placeholder = ''
                            value = {revierstatus} 
                            disabled={isDataPasted}  
                            onChange= {(e)=>this.setState({revierstatus : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Changed By',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && changedby === ''?  "error-border":"fontstyle text-background" }   
                            placeholder = ''
                            value = {changedby}  
                            onChange= {(e)=>this.setState({changedby : e.target.value})} 
                            />
                        </div>
                      
                         
                       
                     <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Completed',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                                <p1 className = 'fontstyle mandatory-label'>{is_submit === true && completed === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                               <DatePicker
                                 selected={completed}
                                 className = "text-background" 
                                 onChange={(date) => this.onChangecompleted(date)}
                                 />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Created At',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                                <p1 className = 'fontstyle mandatory-label'>{is_submit === true && createdat === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                                <DatePicker
                                 selected={createdat}
                                 className = {is_submit === true && createdat === ''?  "error-border":"fontstyle text-background" }  
                                 onChange={(date) => this.onChangetime(date)}
                                 />
                        </div>
                        
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Closed',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                                <p1 className = 'fontstyle mandatory-label'>{is_submit === true && closed === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                              <DatePicker
                                 selected={closed}
                                 className = {is_submit === true && closed === ''?  "error-border":"fontstyle text-background" }  
                                 onChange={(date) => this.onChangeclosed(date)}
                                 />
                        </div>
                       
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Team',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                                <Select  
                            className = {is_submit === true && team === ''?  "error-border-select-paste":"react-select fontstyle" } 
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={teamdata.filter(option =>option.value === team)}
                            options={teamdata}
                            onChange={({value}) => this.setState({  team: value })}
                        />
                        </div>
                    </div>
                    <div className = "row text-center">
                          <Button className = "button-width" color="secondary" 
                                onClick={()=>this.onPasteZ1910()}>
                                {onChangeLanguage(locale,'Paste From Z1910',languageData)}
                                </Button> 
                          <Button className = "button-width" color="primary"    
                                 onClick={()=>this.onSubmit()}
                                >{onChangeLanguage(locale,'Save',languageData)} </Button> 
                             <Button className = "button-width" color="secondary"   
                                    onClick={()=>this.onrefresh()}
                           >{onChangeLanguage(locale,'Refresh',languageData)}</Button>
                         
                    </div>
                </div>   
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

