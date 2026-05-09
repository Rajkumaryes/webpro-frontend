import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import CustomRadioButton from '../../../RadioButton'
import { createNotification } from '../../../../toast';
import{CodService} from '../../../../redux/Export/codexception/saga'
import {onChangeLanguage,getTimeDifference,getValue,convertLocalToUTCDate} from '../../../../helper'
import Loading from "react-fullscreen-loading";
import Workbook from 'react-excel-workbook'
import moment from 'moment';
import{teamService} from '../../../../redux/Export/masters/exportteam/saga'
import{userService} from '../../../../redux/users/saga'
import{issuecodeService} from '../../../../redux/Export/masters/issuercode/saga';
import {getValue_D1040,getValue_Z1910} from '../../pasteData'
import DatePickerDate from "../../datePickerDate";
import DatePickerTime from "../../timePicker";

import * as clipboard from 'clipboard-polyfill/text'
class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        shipment_no:'',
        customer:'',
        doc_cutoff:'',
        aggregated_status:'',
        type:'',
        dates:"",
        times:"",
        medium:'',
        numbers:'',
        bl:'',
        etd:'',
        mainpol:'',
        main_voyage:'',
        minpod:'',
        issuer:'',
        userid:'',
        team:'0',
        start_time:new Date(),
        updated_start_time:new Date(),
        end_time:'',
        timetaken:'',
        exception:'Yes',
        exception_number:'',
        issue_date:'',
        status:'',
        shipment_number:'',
        mtd_number:'',
        exception_code:'',
        action_party:'',
        exceptionuserid:'',
        organization_code:'',
        issue_time:'',
        excep:'',
        start_date:'',
        end_date:'',
        userdata:[],
        teamdata:[],
        data:[],
        cod:[],
        issuecode_data:[] , 
        is_submit:false,
        is_search:false,
        isDataPasted: false,
        codcount:'',
        codcountlast:'',
      };
    }
    componentDidMount() {
      
        this.setState({
            start_date:moment(new Date()).format('MM/DD/YYYY')
        })
       this.fetchteam()
       this.fetchuser()
       this.fetchIssueCodeData()
        this.fetchCodCount()
    }
    fetchCodCount(){
        this.setState({loading:true})
        const {username} = this.props
        // console.log(username)
        CodService.fetchcodcount(username)
        .then((res) => {
           if(res.status)   { 
                  let filterstatus = res.data;
                  let lastdata = res.lastcount;
                  console.log("filterstatus",filterstatus)
                  console.log("lastdata",lastdata)
                  this.setState({ 
                    codcount:filterstatus, 
                    codcountlast:lastdata     
                  }) 
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
  
  }
    fetchData() {
      this.setState({loading:true})
      CodService.fetchcodexception()
      .then((res) => {
         if(res.status)   { 
                  this.setState({
                  data :  res.data,
                  loading:false
                  })
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({
                loading : false
              })
    } 
    fetchteam() {
        this.setState({loading:true})
        teamService.fetchteams()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var teamlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.team_name ,value : cusmaidid.id.toString()};
                   });  
                    
                    this.setState({
                    teamdata :  teamlist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  
   fetchuser() {
    this.setState({loading:true})
    userService.fetchpermission_user('Exports')
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.is_active === 1)
             var erroruseridlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.username ,value : cusmaidid.username};
               });  
              
                this.setState({
                userdata :  erroruseridlist,
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { });
             this.setState({loading:false}) 
  }  
  fetchshipment() {
    const {numbers} = this.state 
    if(numbers !== "")
    {
        this.setState({
            loading : true
        })
        CodService.fetchIndividualCod(numbers)
        .then((res) => {
           
            this.setState({loading:false})
            this.clearvalue()
        if(res.status)   { 
            this.setValue(res.data[0])
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
      createNotification('Please Enter Numbers','error','filled')
    }
 }


 onChangedate(value)
 {
     this.setState({dates:value})
 }
 onChangeissue(value){
    this.setState({issue_date:value})

 }
 onChangestart(value)
 {
     this.setState({start_date:value})
 }
 onChangeend(value)
 {
     this.setState({end_date:value})
 }
 fetchIssueCodeData() {  
    this.setState({
      loading : true
    })
    issuecodeService.fetchissuecode()
      .then((res) => { 
        this.setState({   
      loading : false 
              
        }) 
        if(res.status)
          {
            this.setState({ 
              issuecode_data:res.data  , 
                       
            }) 
          }   
    })
    .catch((error) => { 
      this.setState({
        loading : false
      })
      });   
 }
  setValue(record)
  {
      
      if(record !== null && record)
      {
        this.setState({
            shipment_no:record.shipment_no,
            customer:record.customer,
            doc_cutoff:record.doc_cutoff !== "" ? this.validDate(record.doc_cutoff,'Doc Cut-Off'): '',
            aggregated_status:record.aggregated_status,
            type:record.type,
            dates:record.dates !== "" ? this.validDate(record.dates,'Dates'): '',
            times:record.times,
            medium:record.medium,
            numbers:record.numbers,
            bl:record.bl,
            etd:record.etd !==""?this.validDate(record.etd,'ETD'):'',
            mainpol:record.main_pol,
            main_voyage:record.main_voyage,
            minpod:record.main_pod,
            issuer:record.issuer,
            userid:record.user_id,
            team:record.team,
            start_time:record.start_time,
            end_time:record.end_time,
            timetaken:record.time_taken,
            exception:record.exception,
            exception_number:record.exception_number,
            issue_date:record.issue_date !==""? this.validDate(record.issue_date,'Issue Date'):'',
            issue_time:record.issue_time,
            status:record.status,
            shipment_number:record.exception_number,
            mtd_number:record.mtd_number,
            exception_code:record.exception_code,
            action_party:record.action_party,
            exceptionuserid:record.userid,
            organization_code:record.organization_code,
            excep:record.excep,
            start_date:record.start_date, 
            end_date:record.end_date,
            is_search:true

          })
      }

  } 
  onChangeRadioException(value)
  {
      this.setState({
          exception:value,
          start_date:moment(new Date()).format('MM/DD/YYYY'),
          end_date:'',
          exception_number:'',
          issue_date:'',
          status:'',
          shipment_number:'',
          mtd_number:'',
          exception_code:'',
          action_party:'',
          exceptionuserid:'',
          organization_code:'',
          issue_time:'',
        })
  }
clearvalue()
{
  
    this.setState({
        start_time:new Date(),
        updated_start_time:new Date(),
       shipment_no:'',
       customer:'',
       doc_cutoff:'',
       aggregated_status:'',
       type:'',
       dates:"",
       times:"",
       medium:'',
       numbers:'',
       bl:'',
       etd:'',
       mainpol:'',
       main_voyage:'',
       minpod:'',
       issuer:'',
       userid:'',
       team:'0',
       end_time:'',
       timetaken:'',
       exception:'Yes',
       exception_number:'',
       issue_date:'',
       status:'',
       shipment_number:'',
       mtd_number:'',
       exception_code:'',
       action_party:'',
       exceptionuserid:'',
       organization_code:'',
       issue_time:'',
       excep:'',
       start_date:moment(new Date()).format('MM/DD/YYYY'),
       end_date:'',
       is_submit:false
    })
} 
    validTime(timess,title){
        var timevalue = '', isfill=true;
        if(timess && timess !== null && timess !== '')
        {
            console.log("kjgkjgkj " ,timess)
            var isvalid = moment(timess, ["h:mm:ss A"]).format("HH:mm:ss");
            console.log("kjgkjgkj " ,isvalid)
            if(isvalid !== 'Invalid date')
            {
                timevalue = isvalid
            }
            else
            {
                isfill = false 
            }

            if(isfill === false)
            {
                createNotification(`Please Enter ${title} (hh:mm:ss AM/PM)`,'error','filled') 
            }
      }
        return timevalue
    
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
    getDate(dates)
    {
       var date_value = '',isfill = false
        if(dates && dates !== null && dates !== '')
        {
           
           var end_date =  new Date(dates)
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
           createNotification('Please Enter Date (MM/DD/YYYY)','error','filled') 
        }

        return date_value

    }



    getissuedate(issue_date)
    {
       var date_value = '',isfill = false
        if(issue_date && issue_date !== null && issue_date !== '')
        {
           
           var end_date =  new Date(issue_date)
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
           createNotification('Please Enter Issue Date (MM/DD/YYYY)','error','filled') 
        }

        return date_value

    }
    onCopy()
    {
        navigator.clipboard.writeText(this.state.shipment_no)
    }
    onChangeFileUpload(files)
    {

    }
   
   
    handlechangeuser = (selectedOptions) => {
        this.setState({userid : selectedOptions.value})  
      }
    onSubmit() { 
        const {shipment_no,customer,doc_cutoff,aggregated_status,type,dates,times,medium,
            numbers,bl,etd,mainpol,main_voyage,minpod,issuer,userid,team,start_time,
            updated_start_time,exception,exception_number,issue_date,status,shipment_number,mtd_number,exception_code,action_party,exceptionuserid
            ,organization_code,issue_time,excep,start_date} = this.state;

         
            var is_fill = false
            if(exception === "Yes")
            {
                if(issuer!==''&&team!==''&&exception!==''&&issue_time!=='' 
                //   &&issue_date!=='' &&status!=='' &&shipment_number!=='' &&mtd_number!=='' 
                // &&action_party!=='' &&exceptionuserid!=='' &&organization_code!=='' &&exception_number!==''
                )
                {
                    is_fill = true
                }
            }
            else
            {
                if(exception!==''&& issuer!==''&&team!=='')
                {
                    is_fill = true
                }
            }
            if(is_fill === true)
            {    
                const {username}=this.props
                var datess =  (dates !==''&& dates !== null) ? moment(dates).format('MM/DD/YYYY'):''
                var etd_dates = (etd !=='' && etd !== null)? moment(etd).format('MM/DD/YYYY'): ''
                var issue_dates =  (issue_date !==''&& issue_date !== null) ? moment(issue_date).format('MM/DD/YYYY'):''
                var doc_cutoff_date = (doc_cutoff !==''&& doc_cutoff !== null) ? moment(doc_cutoff).format('MM/DD/YYYY'):''
                var end_date =  moment(new Date()).format('MM/DD/YYYY')
                const end_time = new Date() ,updated_end_time = new Date()
                var time_taken = getTimeDifference(start_time,end_time)
                this.setState({
                    end_time:end_time,
                    end_date:end_date,
                    timetaken:time_taken
                })    

                this.setState({
                    loading : true
                  })
                  CodService.createcodexception(shipment_no,customer,doc_cutoff_date,aggregated_status,type,datess,times,medium,
                    numbers,bl,etd_dates,mainpol,main_voyage,minpod,issuer,username,team, time_taken,exception,exception_number,issue_dates,status,shipment_number,mtd_number,
                    exception_code,action_party,exceptionuserid,organization_code,issue_time,excep,username,start_date,end_date,
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
                          this.fetchCodCount()
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
renderTemplate()
  {
    const {languageData,locale} = this.props
    const {data,exception,teamdata,userdata} = this.state
    var array = data.map(record=> {
          return {
            'shipment_no':record.shipment_no,
            'customer':record.customer,
            'doc_cutoff':record.doc_cutoff,
            'aggregated_status':record.aggregated_status,
            'type':record.type,
            'dates':record.dates,
            'times':record.times,
            'medium':record.medium,
            'numbers':record.numbers,
            'bl':record.bl,
            'etd':record.etd,
            'mainpol':record.main_pol,
            'main_voyage':record.main_voyage,
            'minpod':record.main_pod,
            'issuer':record.issuer,
            'userid':getValue(userdata,'value','label',record.user_id),
            'team':getValue(teamdata,'value','label',record.team),
            'start_time':record.start_time,
            'end_time':record.end_time,
            'timetaken':record.time_taken,
            'exception':record.exception,
            'exception_number':record.exception_number,
            'issue_date':record.issue_date,
            'status':record.status,
            'shipment_number':record.exception_number,
            'mtd_number':record.mtd_number_number,
            'exception_code':record.exception_code,
            'action_party':record.action_party,
            'exceptionuserid':record.exceptionuserid,
            'organization_code':record.organization_code,
            'issue_time':record.issue_time,
            'excep':record.excep,
            'start_date':record.start_date, 
            'end_date':record.end_date
        };
      })
     return(
        
        <Workbook filename="Cod.xlsx" element={
          <Button className = "button-width" color="secondary" 
        //    style={{width:'150px'}}
          >{ onChangeLanguage(locale,'Download Template',languageData)}  
          </Button>
		      }>
          <Workbook.Sheet data={array} name="Sheet A">
             <Workbook.Column label="Shipment Number" value="shipment_no"/> 
        <Workbook.Column label="Customer" value="customer" />
        <Workbook.Column label="Doc cutoff" value="doc_cutoff" />
        <Workbook.Column label="Aggregated_status" value="aggregated_status" />
        <Workbook.Column label="Type" value="type" />
        <Workbook.Column label="Dates" value="dates" />
        <Workbook.Column label="Times" value="times" />
        <Workbook.Column label="Medium" value="medium" />
        <Workbook.Column label="Numbers" value="numbers" />
        <Workbook.Column label="BL" value="bl" />
        <Workbook.Column label="ETD" value="etd" />
        <Workbook.Column label="Main pol" value="mainpol" />
        <Workbook.Column label="Main voyage" value="main_voyage" />
        <Workbook.Column label="Mainpod" value="minpod" />
        <Workbook.Column label="Issuer" value="issuer" />
        <Workbook.Column label="User ID" value="userid" />
        <Workbook.Column label="Team" value="team" />
        <Workbook.Column label="Start Date Time" value="start_time" />
        <Workbook.Column label="End Date Time" value="end_time" />
        <Workbook.Column label="Time Taken" value="timetaken" />
        <Workbook.Column label="Exception" value="exception" />
          </Workbook.Sheet> 
        </Workbook>
     

      );
        
  } 
  renderTemplateYes()
  {
    const {languageData,locale} = this.props
    const {data,exception} = this.state
    var array = data.map(record=> {
          return {
            'shipment_no':record.shipment_no,
            'customer':record.customer,
            'doc_cutoff':record.doc_cutoff,
            'aggregated_status':record.aggregated_status,
            'type':record.type,
            'dates':record.dates,
            'times':record.times,
            'medium':record.medium,
            'numbers':record.numbers,
            'bl':record.bl,
            'etd':record.etd,
            'mainpol':record.main_pol,
            'main_voyage':record.main_voyage,
            'minpod':record.main_pod,
            'issuer':record.issuer,
            'userid':record.userid,
            'team':record.team,
            'start_time':record.start_time,
            'end_time':record.end_time,
            'timetaken':record.time_taken,
            'exception':record.exception,
            'exception_number':record.exception_number,
            'issue_date':record.issue_date,
            'status':record.status,
            'shipment_number':record.exception_number,
            'mtd_number':record.mtd_number_number,
            'exception_code':record.exception_code,
            'action_party':record.action_party,
            'exceptionuserid':record.exceptionuserid,
            'organization_code':record.organization_code,
            'issue_time':record.issue_time,
            'excep':record.excep,
            'start_date':record.start_date, 
            'end_date':record.end_date
        };
      })
     return(
        
        <Workbook filename="Cod.xlsx" element={
          <Button className = "button-width" color="secondary"  
        //   style={{width:'150px'}}
          >{ onChangeLanguage(locale,'Download Template',languageData)}  
          </Button>
		      }>
          <Workbook.Sheet data={array} name="Sheet A">
             <Workbook.Column label="Shipment Number" value="shipment_no"/> 
        <Workbook.Column label="Customer" value="customer" />
        <Workbook.Column label="Doc cutoff" value="doc_cutoff" />
        <Workbook.Column label="Aggregated_status" value="aggregated_status" />
        <Workbook.Column label="Type" value="type" />
        <Workbook.Column label="Dates" value="dates" />
        <Workbook.Column label="Times" value="times" />
        <Workbook.Column label="Medium" value="medium" />
        <Workbook.Column label="Numbers" value="numbers" />
        <Workbook.Column label="BL" value="bl" />
        <Workbook.Column label="ETD" value="etd" />
        <Workbook.Column label="Main pol" value="mainpol" />
        <Workbook.Column label="Main voyage" value="main_voyage" />
        <Workbook.Column label="Mainpod" value="minpod" />
        <Workbook.Column label="Issuer" value="issuer" />
        <Workbook.Column label="Userid" value="userid" />
        <Workbook.Column label="Team" value="team" />
        <Workbook.Column label="start date time" value="start_time" />
        <Workbook.Column label="end date time" value="end_time" />
        <Workbook.Column label="Timetaken" value="time_taken" />
        <Workbook.Column label="Exception" value="exception" />
        <Workbook.Column label="exception_number" value="exception_number" /> 
        <Workbook.Column label="issue_date" value="issue_date" />
        <Workbook.Column label="status" value="status" />
        <Workbook.Column label="shipment_number" value="exception_number" />
        <Workbook.Column label="exception_number" value="exception_number" /> 
        <Workbook.Column label="issue_date" value="issue_date" />
        <Workbook.Column label="status" value="status" />
        <Workbook.Column label="shipment_number" value="exception_number" />
        <Workbook.Column label="mtd_number" value="mtd_number_number" />
        <Workbook.Column label="exception_code" value="exception_code" />
        <Workbook.Column label="action_party" value="action_party" />
        <Workbook.Column label="exceptionuserid" value="exceptionuserid" />
        <Workbook.Column label="organization_code" value="organization_code" />
        <Workbook.Column label="issue_time" value="issue_time" />
        <Workbook.Column label="excep" value="excep" />
        <Workbook.Column label="start_date" value="start_date" /> 
        <Workbook.Column label="end_date" value="end_date"/> 
          </Workbook.Sheet> 
        </Workbook>
     

      );
        
  } 
  getteamvalue(value)
  {
     console.log("kjbkj issuer = " ,value)
     this.setState({
         issuer : value,
         team:getValue(this.state.issuecode_data,'issure_code','team',value)
     })
  }
 async onPasteD1040() {
    clipboard.readText().then((text)=>{
        var record = getValue_D1040(text)
    console.log("kjbkj " , JSON.stringify(record))
    this.setState({
        paste_data:text,
        shipment_no:record.shipment_no,
        customer:record.customer,
        doc_cutoff:this.validDate(record.doc_cutoff,'Doc Cut-Off'),
        aggregated_status:record.aggregated_status,
        type:record.type,
        dates:this.validDate(record.date,'Dates'),
        times:this.validTime(record.time,'Times'),
        medium:record.medium,
        numbers:record.mtd_number,
        bl:record.bl,
        etd:this.validDate(record.etd,'ETD'),
        mainpol:record.main_pol,
        minpod:record.last_pod,
        main_voyage:record.main_voyage,
        
        })
       this.getteamvalue(record.issuer)
    });
    this.setState({
        isDataPasted: true
    });
    
}

async onPasteZ1910() {
    clipboard.readText().then((text)=>{
        var record = getValue_Z1910(text)
    console.log("kjbkj " , JSON.stringify(record))
    this.setState({
        exception_number:record.exception_no,
        issue_date:this.validDate(record.issue_date,'Issue Date'),
        status:record.eh_status,
        shipment_number:record.shipment_no,
        mtd_number:record.document_no,
        exception_code:record.exception_code,
        action_party:record.action_party,
        exceptionuserid:record.issueuser,
        organization_code:record.revierorg,
        
      })
       
    });
    this.setState({
        isDataPasted: true
    });
}
onChangeissue_time(time)
{
    if( time !== null){
      var times = moment(time).format('hh:mm a')
      this.setState({ issue_time :times })
      }else{
          this.setState({ issue_time :'' })
      }
     }

    render()
    {
        const {match,languageData,locale,username} = this.props
        const {loading,shipment_no,customer,doc_cutoff,aggregated_status,type,dates,times,medium,isDataPasted ,
            numbers,bl,etd,mainpol,main_voyage,minpod,exception_number,issuer,team,start_time,codcount,codcountlast,
            end_time,timetaken,exception,issue_date,status,shipment_number,mtd_number,action_party,exceptionuserid
            ,organization_code,issue_time,start_date, end_date,teamdata,is_submit,userid,is_search} = this.state
        return (
            <>
            <title>{onChangeLanguage(locale,'POST BOT Process',languageData)}</title>
            {loading && 
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
            <Row>
              <Colxx xxs="12">
              <div className = "row">
                      <div className = "col-md-8">
                      <Breadcrumb heading={onChangeLanguage(locale,'POST BOT Process',languageData)} match={match} />
                    </div>
                    <div className = "col-md-2" >
                    <h2 style = {{marginTop:'15px'}}>Total EQ : {codcount}</h2>
                    </div>
                    <div className = "col-md-2">
                        <h2  style = {{marginTop:'15px'}}>Last EQ : {codcountlast}</h2>
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
                    {exception === "Yes" ?this.renderTemplateYes():this.renderTemplate() }
                    </div> */}
                  </div>
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'15px'}}>
                <div className = "publish-title" >
                        <Row>
                            <Colxx xxs="4">
                                <Label  className = "fontstyle" 
                                style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'POST BOT Process',languageData)}</Label>
                            </Colxx>
                        </Row>
                    </div>
                    <div className = "row" style = {{padding:'10px',marginBottom:'-20px'}}>
                    <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'User ID',languageData)}
                            <br></br>  {is_search ? userid : username}</Label>
                           
                        </div>

                         
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Start Date Time',languageData)}
                                <br></br>{moment(start_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                           
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'End Date Time',languageData)}
                            <br></br>{end_time !== '' && moment(end_time).format('MM/DD/YYYY hh:mm:ss a')} </Label>
                            
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Time Taken',languageData)} 
                          <br></br> {timetaken}</Label>
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Issuer Code',languageData)}
                           <a style = {{color :'red'}}>*</a></Label>
                             <Input  
                             className = {is_submit === true && issuer === ''?  "error-border-paste":"fontstyle text-background-paste" } 
                            placeholder = ''
                            value = {issuer} 
                            disabled={isDataPasted}  
                            onChange= {(e)=>this.getteamvalue(e.target.value)} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Team',languageData)} 
                                <a style = {{color :'red'}}>*</a>
                                <br></br>{team !== "" &&  getValue(teamdata,'value','label',team)}</Label>
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Shipment Number',languageData)}
                            </Label>
                            <Input  
                            className = "fontstyle text-background-paste" 
                            placeholder = ''
                            value = {shipment_no}  
                            disabled={isDataPasted}  
                            onChange= {(e)=>this.setState({shipment_no : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Customer',languageData)}
                            </Label>
                            <Input  
                            className = "fontstyle text-background-paste" 
                            placeholder = ''
                            value = {customer}  
                            disabled={isDataPasted}  
                            onChange= {(e)=>this.setState({customer : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Doc Cut-Off',languageData)}
                            </Label>                        
                              <DatePickerDate
                                 selected={doc_cutoff}
                                 className = "text-background-paste" 
                                 onChange={(date) => this.setState({doc_cutoff:date})}
                                 disabled={isDataPasted}  
                                 />
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Aggregated Status',languageData)}
                            </Label>
                            <Input  
                            className = "fontstyle text-background-paste" 
                            placeholder = ''
                            value = {aggregated_status}  
                            onChange= {(e)=>this.setState({aggregated_status : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Type',languageData)}
                            </Label>
                            <Input  
                            className = "fontstyle text-background-paste" 
                            placeholder = ''
                            value = {type}  
                            disabled={isDataPasted}  
                            onChange= {(e)=>this.setState({type : e.target.value})} 
                            />
                        </div>
                       


                       <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Dates',languageData)}
                              </Label>
                            
                              <DatePickerDate
                                 selected={dates}
                                 className = "text-background-paste" 
                                 onChange={(date) => this.onChangedate(date)}
                                 disabled={isDataPasted}  
                                 />
                                
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Times',languageData)}
                            </Label>
                            <Input 
                                className = "fontstyle text-background-paste" 
                                data-date-format='hh:mm:ss a'
                                placeholder='hh:mm:ss a'
                                type="time"
                                value = {times}  
                                disabled={isDataPasted}  
                                onChange= {(e)=>this.setState({times  : e.target.value})} ></Input>

                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Medium',languageData)}
                            </Label>
                            <Input  
                            className = "fontstyle text-background-paste" 
                            placeholder = ''
                            value = {medium}  
                            disabled={isDataPasted}  
                            onChange= {(e)=>this.setState({medium : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Numbers',languageData)}
                            </Label>
                            <Input  
                            className = "fontstyle text-background-paste" 
                            placeholder = ''
                            type='numbers'
                            value = {numbers}  
                            disabled={isDataPasted}  
                            onChange= {(e)=>this.setState({numbers : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'BL',languageData)}
                            </Label>
                            <Input  
                            className = "fontstyle text-background-paste" 
                            placeholder = ''
                            value = {bl}  
                            disabled={isDataPasted}   
                            onChange= {(e)=>this.setState({bl : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'ETD',languageData)}
                            </Label>
                          
                             <DatePickerDate
                                 selected={etd}
                                 className = "text-background-paste" 
                                 disabled={isDataPasted}  
                                 onChange={(date) => this.setState({etd:date})}
                                 />
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Main POL',languageData)}
                            </Label>
                            <Input  
                            className = "fontstyle text-background-paste"
                            placeholder = ''
                            value = {mainpol}  
                            disabled={isDataPasted}  
                            onChange= {(e)=>this.setState({mainpol : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Main Voyage',languageData)}
                            </Label>
                            <Input  
                            className ="fontstyle text-background-paste" 
                            placeholder = ''
                            value = {main_voyage}  
                            disabled={isDataPasted}  
                            onChange= {(e)=>this.setState({main_voyage : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Last POD',languageData)}
                            </Label>
                            <Input  
                            className = "fontstyle text-background-paste" 
                            placeholder = ''
                            value = {minpod}
                            disabled={isDataPasted}    
                            onChange= {(e)=>this.setState({minpod : e.target.value})} 
                            />
                        </div>
                        
                        {/* <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'User ID',languageData)}
                            <a style = {{color :'red'}}>*</a> </Label>
                            <Select  
                                className = {is_submit === true && userid === ''?  "error-border-select-paste":"react-select fontstyle" } 
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={userdata.filter(option =>option.value === userid)}
                                options={userdata}
                                onChange={this.handlechangeuser}
                            />
                        </div> */}
                       
                        <div className = "col-md-2">
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Exception Handling',languageData)} 
                        <a style = {{color :'red'}}>*</a></Label>
                            <div style = {{margin:'10px 0px'}}>
                            <p className = 'fontstyle mandatory-label'>{is_submit === true && exception === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p>
                                <Row>
                                    <Colxx xxs="4">
                                        <CustomRadioButton checked  = "Yes" name = {onChangeLanguage(locale,'Yes',languageData)} value = {exception} 
                                            onChangeRadio={this.onChangeRadioException.bind(this)}/>
                                       
                                    </Colxx>
                                    <Colxx xxs="4">
                                     <CustomRadioButton checked  = "No" name = {onChangeLanguage(locale,'No',languageData)} value = {exception} 
                                            onChangeRadio={this.onChangeRadioException.bind(this)}/>
                                        
                                    </Colxx>
                                </Row>
                            </div>   
                        </div>
                    </div>
                    <div className = "row text-center" >
                          <Button className = "button-width" color="secondary"  
                              onClick={()=>this.fetchshipment()}
                                >{onChangeLanguage(locale,'Check Shipment',languageData)}
                                </Button>                                
                             <Button className = "button-width" color="primary"     
                                   onClick={()=>this.onSubmit()}
                           > {onChangeLanguage(locale,'Save',languageData)}</Button>                       
                             <Button className = "button-width" color="primary"     
                                     onClick={()=>this.onPasteD1040()}
                           > {onChangeLanguage(locale,'Paste Shipment From D1040',languageData)}</Button>                         
                             <Button className = "button-width" color="secondary" 
                                    onClick={()=>this.clearvalue()}
                           >{onChangeLanguage(locale,'Refresh',languageData)}</Button>
                        
                    </div>
              </div>   
             {exception === "Yes" &&
              <div className = "publishuser-card-component" style = {{borderRadius:'10px'}}>
                <div className = "publish-title" >
                        <Row>
                            <Colxx xxs="4">
                                <Label  className = "fontstyle" 
                                style = {{fontWeight:700,fontSize:'15px'}}>
                                    {onChangeLanguage(locale,'Exception',languageData)}</Label>
                            </Colxx>
                        </Row>
                    </div>
                    <div className = "row" style = {{padding:'10px',marginBottom:'-5px'}}>
                       
                          <div className = "col-md-3 space-margin"  >
                         
                                  <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Start Date',languageData)}
                                
                                <br></br>{start_date}</Label>
                           
                                
                        </div>


                        <div className = "col-md-3 space-margin"  >
                          
                                 <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'End Date',languageData)}
                                <br></br>{end_date}</Label>
                                
                        </div>
                     

                      <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Issue Date',languageData)}
                              </Label>
                               
                              <DatePickerDate
                                 selected={issue_date}
                                 className = "text-background-paste" 
                                 disabled={isDataPasted} 
                                 onChange={(date) => this.onChangeissue(date)}
                                 />
                                
                        </div>


                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Status',languageData)} </Label>
                            <Input  
                            className = "fontstyle text-background-paste" 
                            placeholder = ''
                            value = {status} 
                            disabled={isDataPasted}  
                            onChange= {(e)=>this.setState({status : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Shipment Number',languageData)} </Label>
                            <Input  
                            className = "fontstyle text-background-paste"
                            placeholder = ''
                            value = {shipment_number}  
                            disabled={isDataPasted} 
                            onChange= {(e)=>this.setState({shipment_number : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'MTD Number',languageData)} </Label>
                            <Input  
                            className = "fontstyle text-background-paste" 
                            placeholder = ''
                            value = {mtd_number}  
                            disabled={isDataPasted} 
                            onChange= {(e)=>this.setState({mtd_number : e.target.value})} 
                            />
                        </div>
                       
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Action Party',languageData)} </Label>
                            <Input  
                            className = "fontstyle text-background-paste" 
                            placeholder = ''
                            value = {action_party}  
                            disabled={isDataPasted} 
                            onChange= {(e)=>this.setState({action_party : e.target.value})} 
                            />
                        </div>
                        
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'User ID',languageData)} </Label>
                            <Input  
                            className = "fontstyle text-background-paste" 
                            placeholder = ''
                            value = {exceptionuserid}  
                            disabled={isDataPasted} 
                            onChange= {(e)=>this.setState({exceptionuserid : e.target.value})} 
                            />
                        </div>
                       
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Organization Code',languageData)} </Label>
                            <Input  
                            className = "fontstyle text-background-paste" 
                            placeholder = ''
                            value = {organization_code}
                            disabled={isDataPasted}   
                            onChange= {(e)=>this.setState({organization_code : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Issue Time',languageData)} <a style = {{color :'red'}}>*</a></Label>
                                <a className = 'fontstyle mandatory-label'>
                                {is_submit === true && issue_time === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>
                                <DatePickerTime
                                    selected={issue_time}
                                    dateFormat= "hh:mm a"
                                    onChange={(time) => this.onChangeissue_time(time)}
                                />
                            
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Exception',languageData)} </Label>
                            <Input  
                            className = "fontstyle text-background-paste" 
                            placeholder = ''
                            value = {exception_number}  
                            disabled={isDataPasted} 
                            onChange= {(e)=>this.setState({exception_number : e.target.value})} 
                            />
                        </div>
                     
                      
                    </div>
                    <div className = "row" style = {{padding:'10px'}}>
                        <div className = "col-md-4"> </div>
                         <div className = "col-md-4">
                             <Button className = "button-width" color="secondary"  style={{width:'60%'}}
                                     onClick={()=>this.onPasteZ1910()}
                           >{onChangeLanguage(locale,'Exception Paste From Z1910',languageData)}</Button>
                         </div>
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

