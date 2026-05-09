
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button,Collapse} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import {onChangeLanguage,convertLocalToUTCDate,getValue} from '../../../../helper'
import Select from 'react-select';
import moment from 'moment';
import{bookingService} from '../../../../redux/bookingprocess/bookingprocess/saga'
import { createNotification } from '../../../../toast';
import{teamsService} from '../../../../redux/teams/saga';
import{abcService} from '../../../../redux/bookingprocess/abc/saga';
import{bookingtypeService} from '../../../../redux/bookingprocess/bookingtype/saga';
import{handlingService} from '../../../../redux/bookingprocess/handling/saga';
import{reasonsService} from '../../../../redux/bookingprocess/reasons/saga' ;
import{cargotypeService} from '../../../../redux/bookingprocess/cargotype/saga'; 
import{bookingstatusService} from '../../../../redux/bookingprocess/bookingstatus/saga'
import{exceptionpartyService} from '../../../../redux/bookingprocess/exceptionparty/saga'
import { teamsiteService } from '../../../../redux/bookingprocess/teamsite/saga';
// import {getValuepaste,getValue_rail} from '../pasteData'
import Workbook from 'react-excel-workbook'
import {getValue_S9610,getValue_B2000} from '../../pasteData'
import * as clipboard from 'clipboard-polyfill/text'
import DatePicker from "../../datePicker";
import { Table,Checkbox } from 'antd';
import { exceptionService } from '../../../../redux/bookingprocess/docexception/saga';
import{issuecodeService} from '../../../../redux/bookingprocess/issuecode/saga';
import Loading from "react-fullscreen-loading";
import DatePickerDate from "../../datePickerDate";

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        id:0,
        gsc_userid:'',
        date:'',
        start_time:'',
        end_time:'',
        booking_number:'',
        team_name:'',
        cu_match_code:'',
        mr_matchcode:'',
        abc_nonabc:'',
        booking_type:'',
        handling_type:'',
        reasons:'',
        cargo_type:'',
        temp:'',
        dg:'',
        oog:'',
        final_status:'',
        comments:'',
        region:'',
        area:'',
        subarea:'',
        csb_office:'',
        assigned_user_id:'',
        export_haulage:'',
        first_pol:'',
        received_date:'',
        received_time:'',
        function_:'',
        exception_party:'',
        last_pod:'',
        end_pod:'',
        exception_partydata:[],
        exception_reason:'',
        exception_reasondata:[],
        crm_case_number:'',
        exception_raised_date_time:'',
        ariff_id:'',
        no_of_roll:'',
        cargodata:[],
        bookingstatusdata:[],
        reasonsdata:[],
        handlingdata:[],
        bookingdata:[],
        abcdata:[],
         teamdata:[],
         issuecode_data:[],
         searchdata:[],      
         is_submit:false,
         is_search:false,
         loading:false,
         updated_start_time:new Date(),
         tableindex:0,
         tabledata:[],
         issuer: '',
         customer: '',
         teamsite_data: [],
         customer_requirements: [],
         origin_requirements : [],
         country_requirements : [],
         main_pod: '',
         team: '',
         collapse:false,
         bookingcount:'',
         bookingcountlast:'',
         isDataPasted: false,
         bookingdiffminutes:'',
         bookingdiffseconds: 0,
         isSubmitting: false
    }
    this.timer = null;
    }

    componentDidMount() {
       
        this.setState({
            start_time:moment(new Date()).format('hh:mm:ss a')
        })
      this.fetchabc()
      this.fetchbooking()
      this.fetchteam()
      this.fetchhandling()
      this.fetchreasons()
      this.fetchcargotype()
      this.fetchstatus()
      this.fetchexception()
      this.fetchissie()
      this.fetchteamsite()
      this.fetchBookingCount()
    }
    componentWillUnmount() {
      clearInterval(this.timer);
    }
    fetchBookingCount(){
          this.setState({loading:true})
          const {username} = this.props
          //console.log(username)
          bookingService.fetchbookingcount(username)
          .then((res) => {
             if(res.status)   { 
                    let filterstatus = res.data;
                    let lastdata = res.lastcount;
                    // console.log("raj",filterstatus)
                    // var list = filterstatus.map(function(areaaval) {
                    //   return  {id : (areaaval.id).toString(),
                    //   area: areaaval.area,region: areaaval.region,team: areaaval.team,issue_code:areaaval.issue_code};
                    //   }); 
                    this.setState({ 
                      bookingcount:filterstatus, 
                      bookingcountlast:lastdata     
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
    fetchabc() {
        this.setState({loading:true})
        abcService.fetchapi()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var abclist = filterstatus.map(function(response) {
                      return  {label : response.name ,value : response.id.toString()};
                   });  
                    this.setState({
                    abcdata :  abclist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  

     fetchteam() {
        this.setState({loading:true})
        teamsService.fetchteams()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var teamlist = filterstatus.map(function(response) {
                      return  {label : response.name ,value : response.id.toString()};
                   });  
                    this.setState({
                    teamdata :  teamlist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  
     fetchbooking() {
        this.setState({loading:true})
        bookingtypeService.fetchapi()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var bookinglist = filterstatus.map(function(response) {
                      return  {label : response.name ,value : response.id.toString()};
                   });  
                    this.setState({
                    bookingdata :  bookinglist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  
     fetchhandling() {
        this.setState({loading:true})
        handlingService.fetchapi()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var handlinlist = filterstatus.map(function(response) {
                      return  {label : response.name ,value : response.id.toString()};
                   });  
                    this.setState({
                    handlingdata :  handlinlist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     } 
     
     fetchreasons() {
        this.setState({loading:true})
        reasonsService.fetchapi()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var reasonlist = filterstatus.map(function(response) {
                      return  {label : response.name ,value : response.id.toString()};
                   });  
                    this.setState({
                    reasonsdata :  reasonlist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     } 


     fetchcargotype() {
        this.setState({loading:true})
        cargotypeService.fetchapi()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var cargolist = filterstatus.map(function(response) {
                      return  {label : response.name ,value : response.id.toString()};
                   });  
                    this.setState({
                    cargodata :  cargolist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     } 


     fetchstatus() {
        this.setState({loading:true})
        bookingstatusService.fetchapi()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var statuslist = filterstatus.map(function(response) {
                      return  {label : response.name ,value : response.id.toString()};
                   });  
                    this.setState({
                    bookingstatusdata :  statuslist
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
      exceptionpartyService.fetchapi()
      .then((res) => {
         if(res.status)   { 
            let filterstatus = res.data
               var statuslist = filterstatus.map(function(response) {
                    return  {label : response.name ,value : response.id.toString()};
                 });  
                  this.setState({
                    exception_partydata :  statuslist
                  })
                 
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})
   }
   setCollapse() 
   {
    
     this.setState({
         collapse:!this.state.collapse
     })
   } 
     onSubmit() { 
      this.setState({ isSubmitting: true });
        const { id,exception_raised_date_time,date,booking_number,cu_match_code ,mr_matchcode ,abc_nonabc ,
          booking_type ,handling_type ,reasons ,cargo_type ,final_status ,comments,  cargodata,region,area,subarea,csb_office,
          assigned_user_id,export_haulage,first_pol,received_date,function_, exception_party,exception_partydata,
           exception_reason,crm_case_number, last_pod,end_pod,tariff_id,no_of_roll,updated_start_time} = this.state;
        if( booking_number !==''&& cu_match_code!=='' && region !=='' &&area !=='' &&subarea!=='' && csb_office !=='' && 
        abc_nonabc!=='' && export_haulage !=='' && received_date !=='' && function_ !=='' && cargo_type !=='' && final_status!==''  )
        {
            const end_time =  moment(new Date()).format('hh:mm:ss a') 
            const {username} = this.props
            let   end_date=convertLocalToUTCDate(new Date()),
            start_date=convertLocalToUTCDate(updated_start_time),
              updatedstarttime=convertLocalToUTCDate(updated_start_time),
              updated_end_time=convertLocalToUTCDate(new Date()),
              receiveddate=convertLocalToUTCDate(received_date)
            bookingService.createbooking(id, username,exception_raised_date_time,start_date,end_date,region,area,subarea,booking_number,csb_office,assigned_user_id,cu_match_code ,mr_matchcode ,
              abc_nonabc ,export_haulage ,receiveddate ,function_,cargo_type,tariff_id,no_of_roll,booking_type,exception_party,crm_case_number,
                reasons ,comments,last_pod,end_pod,final_status,updatedstarttime ,updated_end_time)
              .then((res) => { 
                this.setState({  
                    end_time:end_time,
                  loading : false,
                  isSubmitting: false      
                }) 
                if(res.status)
                  {
                    createNotification('Created','success','filled')
                    this.onrefresh()
                    this.fetchBookingCount()
                    //window.location.reload(true);
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
    
  onrefresh() {
    clearInterval(this.timer);
    this.setState({
      gsc_userid:'',
        date:'',
        start_time:'',
        end_time:'',
        booking_number:'',
        cu_match_code:'',
        mr_matchcode:'',
        abc_nonabc:'',
        booking_type:'',
        handling_type:'',
        reasons:'',
        cargo_type:'',
        temp:'',
        dg:'',
        oog:'',
        final_status:'',
        comments:'',
        region:'',
        area:'',
        subarea:'',
        csb_office:'',
        assigned_user_id:'',
        export_haulage:'',
        first_pol:'',
        received_date:'',
        received_time:'',
        function_:'',
        exception_party:'',
        exception_reason:'',
        crm_case_number:'',
        exception_raised_date_time:'',
        start_time:moment(new Date()).format('hh:mm:ss a'),
        end_time:'',
        tariff_id:'',
        no_of_roll:'', 
        last_pod:'',
      end_pod:'',    
         is_submit:false,
         is_search:false,
         loading:false,
         id:0,
         updated_start_time:new Date(),
         tableindex:0,
        tabledata:[],
        customer_requirements: [],
        origin_requirements : [],
        country_requirements : [],
        issuer: '',
        customer: '',
        main_pod: '',
        team: '',
        bookingdiffseconds: 0,
    })
   
  }
    onCopy()
    {
        navigator.clipboard.writeText(this.state.region)
    }
    handleteam = (selectedOptions) => {
        this.setState({team_name : selectedOptions.value})  
    } 
    handleabc = (selectedOptions) => {
        this.setState({abc_nonabc : selectedOptions.value})  
    }
    handlebooking = (selectedOptions) => {
        this.setState({booking_type : selectedOptions.value})  
    }
    handletype = (selectedOptions) => {
        this.setState({handling_type : selectedOptions.value})  
    }
    handlereasons = (selectedOptions) => {
        this.setState({reasons : selectedOptions.value})  
    }
    handlecargotype= (selectedOptions) => {
        this.setState({cargo_type : selectedOptions.value})  
    }
    handlestatus = (selectedOptions) => {
        this.setState({final_status : selectedOptions.value})  
    }
    handleexceptionparty = (selectedOptions) => {
      this.setState({exception_party : selectedOptions.value})  
  }
  handleexceptionreason = (selectedOptions) => {
    this.setState({exception_reason : selectedOptions.value})  
}
onChangetime(date)
{
  this.setState({exception_raised_date_time  : date})
 
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
        region:  record.region,
        area:record.area,
        subarea: record.team,
        csb_office:record.csb_office,
        assigned_user_id:record.assigned_user,
        cu_match_code:record.cu_matchcode,
        mr_matchcode:record.mr_matchcode,
        issuer: record.issuer_office,
        abc_nonabc:record.abc_nonabc,
        export_haulage:record.export_haulage,
        first_pol:record.first_pol,
        received_date:record.received_date !== null && this.validDate(record.received_date) ?convertLocalToUTCDate(record.received_date) : '',
        // received_date:moment(new Date()).format('MM/DD/YYYY'),
        function_:record.functions,
        cargo_type:record.cargo_type,
        tariff_id:record.tariff_id,
        no_of_roll:record.no_of_roll,
        booking_type:record.booking_type,
        exception_party:record.exception_party,
        crm_case_number:record.case_number,
        reasons:record.reasons,
        final_status:record.booking_status,
        exception_raised_date_time:record.exception_raised_date,
        booking_number:record.booking_number,
        case_number:record.case_number,
        start_time:moment(record.start_time).format('hh:mm:ss a'),
        end_time:moment(record.end_time).format('hh:mm:ss a'),
        comments:record.comments,
        last_pod:record.last_pod,
        end_pod:record.end_pod,
        // subarea:record.team,
        is_submit:false,
        is_search:true,
        customer: record.cu_matchcode,
        main_pod: record.main_pod,
        team: record.team,
        })
    }
    setTimeout(() => {
      this.searchTeamSite()
  }, 500);
} 
nextTitle =(idx, arr) =>{
  //console.log('arridx',idx)
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
  const {booking_number,function_,tableindex} = this.state 
  if(booking_number !== "" || function_ !=='')
  {
      this.setState({
          loading : true,
          is_submit:false
      })
      bookingService.search(booking_number,function_)
      .then((res) => {
         
          this.setState({loading:false})
          this.onrefresh()
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
    createNotification('Please Enter Booking Number or Function','error','filled')
  }
}
fetchteamsite() {
  this.setState({
      loading: true
  })
  teamsiteService.fetchteamsite()
      .then((res) => {
          this.setState({ loading: false })
          if (res.status) {
              let filterstatus = (res.data).filter(item => item.status === 1)
              this.setState({
                  teamsite_data: filterstatus,
              })
          }

      })
      .catch((error) => {
          this.setState({
              loading: false
          })
      });
}
renderTemplate()
{
  const {languageData,locale} = this.props

  const column_name = ["GSC User ID","Region", "Area", "Sub Area", "Booking Number","CSB Office","Assigned user ID",
  "CU Match Code", "MR Match Code", "ABC/Non ABC","Export Haulage", "Received Date", "Function","Cargo Type","Tariff ID",
  "No of Roll Overs","Booking Status","Exception party","Exception Raised Date & Time","CRM Case Number","Exception Reason",
  "Comments","Last POD", "POD/End","Start DateTime","End DateTime"]
    return(
      
      <Workbook filename="Booking .xlsx" element={
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
    bookingService.fileUpload(files[0])
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
 
  startCountdown = () => {
    if (this.timer) clearInterval(this.timer); // Ensure no multiple intervals

    this.timer = setInterval(() => {
      this.setState((prevState) => ({
        bookingdiffseconds: prevState.bookingdiffseconds - 1, // Decrease continuously, even when negative
      }));
    }, 1000);
  };
  
  // Stop Timer on Unmount
 
  
  // Format Minutes & Seconds


  getteamvalue(value) {
    this.setState({
      csb_office: value,
        region:getValue(this.state.issuecode_data, 'issue_code', 'id', value),
        area:  getValue(this.state.issuecode_data, 'issue_code', 'id', value),
        subarea: getValue(this.state.issuecode_data, 'issue_code', 'id', value)
    })
}
    async onPasteS9610() {
      const {issuecode_data,mr_matchcode}=this.state
     
    if(mr_matchcode == ""){
      createNotification('If you need MR Party related shipment, Please fill MR Match code First and rest of other Field','custom','filled') 
      clipboard.readText().then((text)=>{
        var test = getValue_B2000(text)
     console.log("Rajkumar",test)
        var record = getValue_S9610(text)
    console.log("rajkumar " , JSON.stringify(record))
    let carcotype=''
    if(record.temp ==='N'){
      if(record.oog ==='N'){
        if(record.dg ==='N'){
          carcotype = 'Standard Cargo'
        }
      }
    }if(record.temp ==='Y'){
      carcotype = 'Reefer'
    }else if(record.oog ==='Y'){
      carcotype = 'OOG'
    }else if(record.dg ==='Y'){
      carcotype = 'DG'
    }
    let abcnonabc=''
    let newnm =record.abc_nonabc
    var firstStringChar = newnm.charAt(0)
    //var received_date = record.received_date +' '+ record.received_time;

    var received_date = `${record.received_date} ${record.received_time}`;
    var addedTime = moment(received_date, "MM/DD/YYYY h:mm A").add(45, "minutes");
  
    var currentTime = moment();
    var diffInSeconds = addedTime.diff(currentTime, "seconds"); // Allow negative values
  
    console.log("Time Difference (seconds):", diffInSeconds);
  
    clearInterval(this.timer);
    // if(firstStringChar ==='0'){
    if(newnm =='0' || newnm == '0:00'){
      abcnonabc = 'ABC'
    }else {
      abcnonabc = 'Non-ABC'
    }
    this.setState(
      {
        booking_number: record.booking_number,
        bookingdiffseconds: diffInSeconds,
        cu_match_code: record.cu_match_code,
        abc_nonabc: abcnonabc,
        export_haulage: record.export_haulage,
        first_pol: record.first_pol,
        function_: record.function_,
        cargo_type: carcotype,
        last_pod: record.last_pod,
        end_pod: record.end_pod,
        issuer: record.issuer_office,
        received_date: this.validDate(received_date, "Received Date"),
        temp: "",
        dg: "",
        oog: "",
        customer: record.customer,
        isDataPasted: true,
      },
      () => this.startCountdown()
    );
      if( record.csb_office !=='' )
      {
        let value=(record.csb_office).trim()
          this.setState({
            csb_office:record.csb_office,
            assigned_user_id:record.assigned_user_id,
            region:getValue(issuecode_data, 'issue_code', 'id',value),
            area:  getValue(issuecode_data, 'issue_code', 'id',value),
            subarea: getValue(issuecode_data, 'issue_code', 'id',value)
          })
      }
      else
      {
        createNotification('Please Fill CSB OFFICE and Assigned user ID') 
      }
      //createNotification('Please Wait to load Requirement','success','filled')

      setTimeout(() => {
          this.searchTeamSite()
      }, 500);
    });
    }else{

       
      clipboard.readText().then((text)=>{
          var record = getValue_S9610(text)
      console.log("rajkumar " , JSON.stringify(record))
      let carcotype=''
      if(record.temp ==='N'){
        if(record.oog ==='N'){
          if(record.dg ==='N'){
            carcotype = 'Standard Cargo'
          }
        }
      }if(record.temp ==='Y'){
        carcotype = 'Reefer'
      }else if(record.oog ==='Y'){
        carcotype = 'OOG'
      }else if(record.dg ==='Y'){
        carcotype = 'DG'
      }
      let abcnonabc=''
      let newnm =record.abc_nonabc
      var firstStringChar = newnm.charAt(0)
      //var received_date = record.received_date +' '+ record.received_time;
      var received_date = `${record.received_date} ${record.received_time}`;
    var addedTime = moment(received_date, "MM/DD/YYYY h:mm A").add(45, "minutes");
  
    var currentTime = moment();
    var diffInSeconds = addedTime.diff(currentTime, "seconds"); // Allow negative values
  
    // console.log("Time Difference (seconds):", diffInSeconds);
  
    clearInterval(this.timer);
      console.log("received_date"+received_date)
      // if(firstStringChar ==='0'){
      if(newnm =='0' || newnm == '0:00'){
        abcnonabc = 'ABC'
      }else {
        abcnonabc = 'Non-ABC'
      }
      this.setState({
        booking_number:record.booking_number,
        bookingdiffseconds: diffInSeconds,
        cu_match_code:record.cu_match_code,
        abc_nonabc:abcnonabc,
        export_haulage:record.export_haulage,
        first_pol:record.first_pol,
        function_:record.function_,
        cargo_type:carcotype,
        last_pod:record.last_pod,
        end_pod:record.end_pod,
        issuer: record.issuer_office,
        // received_date:this.validDate(record.received_date, 'Received Date'),
        received_date:this.validDate(received_date, 'Received Date'),
        // received_date:record.received_date,
        temp:'',
        dg:'',
        oog:'',
        customer: record.customer,
        },() => this.startCountdown())
        if( record.csb_office !=='' )
        {
          let value=(record.csb_office).trim()
            this.setState({
              csb_office:record.csb_office,
              assigned_user_id:record.assigned_user_id,
              region:getValue(issuecode_data, 'issue_code', 'id',value),
              area:  getValue(issuecode_data, 'issue_code', 'id',value),
              subarea: getValue(issuecode_data, 'issue_code', 'id',value)
            })
        }
        else
        {
          createNotification('Please Fill CSB OFFICE and Assigned user ID') 
        }
        //createNotification('Please Wait to load Requirement','success','filled')

        setTimeout(() => {
            this.searchTeamSite()
        }, 500);
      });
    }
    this.setState({
      isDataPasted: true
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
Capitalize(string){
  return string.replace(/\w\S*/g, function(txt){
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
});
  }
searchTeamSite() {
  
  const { issuer,teamdata, teamsite_data,cu_match_code,subarea,export_haulage,first_pol,mr_matchcode,last_pod,issuecode_data,cargo_type  } = this.state

  if (issuer !== '' ) {
    //createNotification('Please Wait to load Requirement','success','filled')
      //var teams = getValue(teamdata, 'value', 'label', subarea)
      var country_code = '';
      if(last_pod.trim() !== ''&& last_pod !== null)
      {
         country_code = last_pod.substring(0, 2)
      }
      this.setState({
          loading: true,
      })
      var customer_title = getValue(teamsite_data, 'team', 'customer', subarea)
      //var teamsss = "VIETNAM";
      var teamsss =  getValue(issuecode_data, 'issue_code', 'area',issuer)
      var teams = this.Capitalize(teamsss)
      var origin_title = getValue(teamsite_data, 'team', 'origin', subarea)
      var country_title = getValue(teamsite_data, 'team', 'country', subarea)
      console.log("7 subarea = ", subarea)
      console.log("7 teamdata = ", teamdata)
      console.log("7 teamsite_data = ", teamsite_data)
      console.log("7 teamsVI = ", teams)
      console.log("7 issuer = ", issuer)
      console.log("7 cu_match_code = ", cu_match_code)
      console.log("7 customer_title = ", customer_title)
      console.log("7 origin_title = ", origin_title)
      console.log("7 country_title = ", country_title)
      console.log("7 export_haulage = ", export_haulage)
      console.log("7 first_pol = ", first_pol)
      console.log("7 mr_matchcode = ", mr_matchcode)
      console.log("7 main_pod = ", last_pod)
      console.log("7 country_code = ", country_code)
      console.log("7 cargo_type = ", cargo_type)
      teamsiteService.fetchTeamSiteapi(teams, issuer,export_haulage,first_pol,mr_matchcode,country_code,cu_match_code,customer_title,origin_title,country_title,cargo_type)
          .then((res) => {
            console.log(res)
              this.setState({ loading: false })
              if (res) {
                  if (res.orgi) {
                      this.setState({
                        origin_requirements: res.orgi
                      })
                  }
                  if (res.cou) {
                      this.setState({
                          country_requirements: res.cou
                      })
                  }
                  if (res.cus && res.cus !== null) {
                      var list = []
                      const data = res.cus
                      for(var i = 0; i < data.length;i++)
                      {
                          var dict = data[i]
                          if((dict.MR !== null && dict.MR !== '') || (dict.CU !== null && dict.CU !== '') ||
                          (dict.CN !== null && dict.CN !== '') || (dict.SH !== null && dict.SH !== ''))
                          {
                              list.push(dict)
                          }
                      }
                      this.setState({
                          customer_requirements: list
                      })
                  }else{
                    createNotification(`No Customer Requirements`, 'error', 'filled')
                  }
              }


          })
          .catch((error) => {
              this.setState({
                  loading: false
              })
          });
  }
  else {
      createNotification(`Please Enter Mandatory Field`, 'error', 'filled')
  }

}
formatTime = (totalSeconds) => {
  if (!Number.isFinite(totalSeconds)) return { minutes: 0, seconds: 0, isNegative: false }; // ✅ Ensure valid number
  const absSeconds = Math.abs(totalSeconds);
  const minutes = Math.floor(absSeconds / 60);
  const seconds = absSeconds % 60;
  return { minutes, seconds, isNegative: totalSeconds < 0 };
};
    render()
    {
        const {match,locale,languageData,username} = this.props
        const { gsc_userid,date,start_time,end_time,booking_number,team_name,cu_match_code ,mr_matchcode ,abc_nonabc ,
            booking_type ,handling_type ,reasons ,cargo_type ,final_status ,comments,  cargodata,
            bookingstatusdata, reasonsdata,handlingdata,bookingdata,abcdata,teamdata,region,area,subarea,csb_office,
            assigned_user_id,export_haulage,received_date,function_, exception_party,exception_partydata,bookingdiffminutes,bookingdiffseconds,
             exception_reason,exception_reasondata,crm_case_number, exception_raised_date_time,tariff_id,no_of_roll, bookingcount,bookingcountlast,isDataPasted,
             last_pod,end_pod,is_submit,is_search,searchdata,tabledata,tableindex,customer_requirements,origin_requirements,country_requirements,loading,collapse} = this.state
             const { minutes, seconds,isNegative } = this.formatTime(this.state.bookingdiffseconds || 0);
    const timeColor = isNegative ? "red" : "green";
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
                title: onChangeLanguage(locale,'Start Time',languageData),
                dataIndex: 'start_time',
                key: 'start_time',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'200px'}}>
                    {text !== '' ? moment(text).format('hh:mm:ss a') :''} 
                  </div>)
              },
              {
                title: onChangeLanguage(locale,'End Time',languageData),
                dataIndex: 'end_time',
                key: 'end_time',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'200px'}}>
                   {text !== '' ? moment(text).format('hh:mm:ss a') :''} 
                  </div>)
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
                  dataIndex: 'booking_number',
                  key: 'booking_number',
                  render: (text, record,index) => ( 
                    <div  style = {{padding:'2px',width:'200px'}}>
                      {text}
                    </div>)
                },
                
                // {
                //   title: onChangeLanguage(locale,'Assigned user ID',languageData),
                //   dataIndex: 'assigned_user',
                //   key: 'assigned_user',
                //   render: (text, record) => ( 
                //       <div className="row d-flex justify-content-center"  style = {{padding:'2px',width:'200px'}}>
                //         {text}
                //       </div>)
                // },
                {
                  title: onChangeLanguage(locale,'CU Match Code',languageData),
                  dataIndex: 'cu_matchcode',
                  key: 'cu_matchcode',
                  render: (text, record,index) => ( 
                      <div   style = {{padding:'2px',width:'200px'}}>{text}
                      </div>)
                },
                  {
                    title:onChangeLanguage(locale,'MR Match Code',languageData) ,
                    dataIndex: 'mr_matchcode',
                    key: 'mr_matchcode',
                    render: (text, record) => ( 
                      <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                        {text}
                      </div>),
                  },
                  {
                    title:onChangeLanguage(locale,'ABC/Non ABC',languageData) ,
                    dataIndex: 'abc_nonabc',
                    key: 'abc_nonabc',
                    render: (text, record) => ( 
                      <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                        {text}
                      </div>),
                  },
                  {
                    title:onChangeLanguage(locale,'Export Haulage',languageData) ,
                    dataIndex: 'export_haulage',
                    key: 'export_haulage',
                    render: (text, record) => ( 
                      <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                        {text}
                      </div>),
                  },
                 
                  {
                    title:onChangeLanguage(locale,'Received Date',languageData) ,
                    dataIndex: 'received_date',
                    key: 'received_date',
                    render: (text, record) => ( 
                      <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                         {text !== '' ? moment(text).format('MM/DD/YYYY hh:mm:ss a') :''} 
                      </div>),
                  },
                  {
                    title:onChangeLanguage(locale,'Function',languageData) ,
                    dataIndex: 'functions',
                    key: 'functions',
                    render: (text, record) => ( 
                      <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                        {text}
                      </div>),
                  },
                  {
                    title:onChangeLanguage(locale,'Cargo Type',languageData) ,
                    dataIndex: 'cargo_type',
                    key: 'cargo_type',
                    render: (text, record) => ( 
                      <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                        {text}
                      </div>),
                  },
                  {
                    title:onChangeLanguage(locale,'Tariff ID',languageData) ,
                    dataIndex: 'tariff_id',
                    key: 'tariff_id',
                    render: (text, record) => ( 
                      <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                        {text}
                      </div>),
                  },
                  {
                    title:onChangeLanguage(locale,'No of Roll Overs',languageData) ,
                    dataIndex: 'no_of_roll',
                    key: 'no_of_roll',
                    render: (text, record) => ( 
                      <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                        {text}
                      </div>),
                  },
                  {
                    title:onChangeLanguage(locale,'Booking Status',languageData) ,
                    dataIndex: 'booking_status',
                    key: 'booking_status',
                    render: (text, record) => ( 
                      <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                        {getValue(bookingstatusdata, 'value', 'label', text)} 
                      </div>),
                  },
                  {
                    title:onChangeLanguage(locale,'Exception party',languageData) ,
                    dataIndex: 'exception_party',
                    key: 'exception_party',
                    render: (text, record) => ( 
                      <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                         {getValue(exception_partydata, 'value', 'label', text)} 
                      </div>),
                  },
                  {
                    title:onChangeLanguage(locale,'Exception Raised Date & Time',languageData) ,
                    dataIndex: 'exception_raised_date',
                    key: 'exception_raised_date',
                    render: (text, record) => ( 
                      <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                       {text !== '' ? moment(text).format('MM/DD/YYYY hh:mm:ss a') :''} 
                      </div>),
                  },
                  {
                    title:onChangeLanguage(locale,'CRM Case Number',languageData) ,
                    dataIndex: 'case_number',
                    key: 'case_number',
                    render: (text, record) => ( 
                      <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                        {text}
                      </div>),
                  },
                  {
                    title:onChangeLanguage(locale,'Exception Reason',languageData) ,
                    dataIndex: 'reasons',
                    key: 'reasons',
                    render: (text, record) => ( 
                      <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                        {text}
                      </div>),
                  },
                  // {
                  //   title:onChangeLanguage(locale,'Last POD',languageData) ,
                  //   dataIndex: 'last_pod',
                  //   key: 'last_pod',
                  //   render: (text, record) => ( 
                  //     <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                  //       {text}
                  //     </div>),
                  // },
                  // {
                  //   title:onChangeLanguage(locale,'End POD',languageData) ,
                  //   dataIndex: 'end_pod',
                  //   key: 'end_pod',
                  //   render: (text, record) => ( 
                  //     <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                  //       {text}
                  //     </div>),
                  // },
                  {
                    title:onChangeLanguage(locale,'Comments',languageData) ,
                    dataIndex: 'comments',
                    key: 'comments',
                    render: (text, record) => ( 
                      <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                        {text}
                      </div>),
                  },
                  
                  
                 
          ]
        return (
            <>
                            {loading &&
                    <div>
                        <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
                    </div>
                }
            <Row>
              <Colxx xxs="12"> 
                <div className = "row">
                      <div className = "col-md-8">
                      <Breadcrumb heading="Booking Creation Original" match={match} />
                    </div>
                    <div className = "col-md-2">
                        {/* <Button className = "button-width" color="primary" style= {{}}>
                            <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
                            <a style= {{margin :'0px'}} > {onChangeLanguage(locale,'Upload',languageData)}</a>
                            <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                                className = "filepicker_customButton"
                                style = {{width : '26%',marginLeft :'-22%'}}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
                        </Button>
                        {this.renderTemplate()} */}
                        <h2 style = {{marginTop:'15px'}}>Total EQ : {bookingcount}</h2>
                    </div>
                    <div className = "col-md-2">
                        <h2  style = {{marginTop:'15px'}}>Last EQ : {bookingcountlast}</h2>
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
                        {/* <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Date',languageData)}</a><br></br>{date}</Label>
                        </div> */}
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Start Time',languageData)}</a><br></br>{start_time}</Label>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'End Time',languageData)}</a><br></br>{end_time}</Label>
                        </div>
                        <div className="col-md-5 space-margin">
        <Label className="fontstyle normal-font">
          <a style={{ fontWeight: 700, display: "block", marginBottom: "3px" }}>
            {onChangeLanguage(locale, "Remaining TAT Time", languageData)}
          </a>
          {bookingdiffseconds !== null ? (
            <span style={{ 
              color: isNegative ? "red" : "green", 
              fontWeight: "bold", 
              fontSize: "28px", 
              display: "inline-flex", 
              alignItems: "baseline",
            }}>
              <span style={{ fontSize: "36px", fontWeight: "bold", marginRight: "4px" }}>
                {isNegative ? "-" : ""}{minutes}
              </span>
              <span style={{ fontSize: "18px", fontWeight: "normal", marginRight: "8px" }}>m</span>
              <span style={{ fontSize: "36px", fontWeight: "bold", marginRight: "4px" }}>
                {seconds}
              </span>
              <span style={{ fontSize: "18px", fontWeight: "normal" }}>s</span>
            </span>
          ) : (
            <span style={{ fontWeight: "bold", fontSize: "28px" }}>--</span> // Placeholder if value is empty
          )}
        </Label>
      </div>





                    </div>
                </div> 

                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    {/* <div className = "row" style = {{marginBottom:'30px'}}> */}
                    <div className = "row">
                    <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'CSB Office/Assigned user ID',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                <Input  className={is_submit === true && csb_office === ''?  "error-border-paste":"fontstyle text-background-paste" }
                                value = {csb_office} 
                                onChange={(e) => this.getteamvalue(e.target.value)} 
                                // disabled={is_search === true ? true : false} 
                                disabled={isDataPasted}
                                // onChange= {(e)=>this.setState({csb_office : e.target.value})} 
                                />
                        </div>
                    <div className = "col-md-3 space-margin">
                      
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Region Name',languageData)}
                            <a style={{ color: 'red' }}>*</a>
                            {is_submit === true && region === '' && <p className='fontstyle mandatory-label'> {onChangeLanguage(locale, 'Mandatory Field', languageData)} </p>}
                                        <br></br>{getValue(this.state.issuecode_data, 'id', 'region',region)}
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
                            {is_submit === true && subarea === '' && <p className='fontstyle mandatory-label'> {onChangeLanguage(locale, 'Mandatory Field', languageData)} </p>}
                                        <br></br>{getValue(this.state.issuecode_data, 'id', 'team', subarea)}
                                        </Label>             
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Booking Number',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                <Input  className={is_submit === true && booking_number === ''?  "error-border-paste":"fontstyle text-background-paste" }
                                value = {booking_number}  
                                type="number"
                                disabled={isDataPasted}
                                // disabled={is_search === true ? true : false} 
                                onChange= {(e)=>this.setState({booking_number : e.target.value})}  
                                />
                        </div>
                        
                        {/* <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Assigned user ID',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                <Input  className={is_submit === true && assigned_user_id === ''?  "error-border-paste":"fontstyle text-background-paste" }
                                value = {assigned_user_id}  
                                disabled={is_search === true ? true : false} 
                                onChange= {(e)=>this.setState({assigned_user_id : e.target.value})} 
                                />
                        </div> */}
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'CU Match Code',languageData)}<a style = {{color :'red'}}>*</a></Label>
                              <Input  className={is_submit === true && cu_match_code === ''?  "error-border-paste":"fontstyle text-background-paste" }
                                value = {cu_match_code}  
                                // disabled={is_search === true ? true : false} 
                                disabled={isDataPasted}
                                onChange= {(e)=>this.setState({cu_match_code : e.target.value})} 
                                />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'MR Match Code',languageData)}</Label>
                              <Input  className="fontstyle text-background-paste"
                               value = {mr_matchcode} 
                                onChange= {(e)=>this.setState({mr_matchcode : e.target.value})} 
                                />
                        </div>
                        <div className = "col-md-3 space-margin">
                          <Button
                          style = {{marginTop:'20px'}}
                          color="primary"
                          onClick={() => this.setCollapse()}
                          className="mb-1">
                          <i className={collapse ? "simple-icon-minus" : "simple-icon-plus"}  />
                          </Button>
                        </div> 
                        </div>
                        <Collapse isOpen={collapse}>
                          <div className = "row">
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'ABC/Non ABC',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className={is_submit === true && abc_nonabc === ''?  "error-border-paste":"fontstyle text-background-paste" }
                                value = {abc_nonabc}  
                                // disabled={is_search === true ? true : false} 
                                disabled={isDataPasted}
                                onChange= {(e)=>this.setState({abc_nonabc : e.target.value})} 
                                />
                          </div>
                            
                          <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Export Haulage',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                <Input  className={is_submit === true && export_haulage === ''?  "error-border-paste":"fontstyle text-background-paste" }
                                value = {export_haulage}  
                                disabled={isDataPasted}
                                onChange= {(e)=>this.setState({export_haulage : e.target.value})} 
                                />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Received Date',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <a className='fontstyle mandatory-label'>
                                  {is_submit === true && received_date === '' && `${onChangeLanguage(locale, 'Mandatory Field', languageData)}`}</a>
                            <DatePickerDate
                                        selected={received_date}
                                        className="text-background-paste"
                                        onChange={(date) => this.setState({ received_date: date })}
                                        disabled={isDataPasted}
                                    />
                                {/* <Input  className={is_submit === true && received_date === ''?  "error-border-paste":"fontstyle text-background-paste" }
                                value = {received_date}  
                                disabled={is_search === true ? true : false} 
                                onChange= {(e)=>this.setState({received_date : e.target.value})} 
                                /> */}
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Function',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                <Input  className={is_submit === true && function_ === ''?  "error-border-paste":"fontstyle text-background-paste" }
                                value = {function_}  
                                min='1'
                                // disabled={is_search === true ? true : false} 
                                disabled={isDataPasted}
                                onChange= {(e)=>this.setState({function_ : e.target.value})} 
                                />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Cargo Type',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className={is_submit === true && cargo_type === ''?  "error-border-paste":"fontstyle text-background-paste" }
                                value = {cargo_type}  
                                onChange= {(e)=>this.setState({cargo_type : e.target.value})} 
                                disabled={isDataPasted}
                                />
                          </div> 
                          <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Tariff ID',languageData)}</Label>
                              <Input  
                              className={"fontstyle text-background" }
                                value = {tariff_id}  
                                onChange= {(e)=>this.setState({tariff_id : e.target.value})} 
                                />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'No of Roll Overs',languageData)}</Label>
                              <Input  className={"fontstyle text-background" }
                                value = {no_of_roll}  
                                type="number"
                                onChange= {(e)=>this.setState({no_of_roll : e.target.value})} 
                                />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Booking Status',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select  
                                className={is_submit === true && final_status === ''?  "error-border-select":"react-select fontstyle" }
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={bookingstatusdata.filter(option =>option.value === final_status)}
                                options={bookingstatusdata}
                                onChange={this.handlestatus}
                            />
                      </div> 
                      <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Exception party',languageData)}</Label>
                            <Select  
                                className={"react-select fontstyle" }
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={exception_partydata.filter(option =>option.value === exception_party)}
                                options={exception_partydata}
                                onChange={this.handleexceptionparty}
                            />
                      </div> 
                      <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Exception Raised Date & Time',languageData)}</Label>
                                 <DatePicker
                                selected={exception_raised_date_time}
                                className = "text-background"
                                onChange={(date) => this.onChangetime(date)}
                                />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'CRM Case Number',languageData)}</Label>
                              <Input  className={"fontstyle text-background" }
                                value = {crm_case_number}
                                type="number"  
                                onChange= {(e)=>this.setState({crm_case_number : e.target.value})} 
                                />
                        </div>
                      <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Exception Reason',languageData)}</Label>
                            <Input  className={"fontstyle text-background" }
                                value = {reasons}
                                type="number"  
                                onChange= {(e)=>this.setState({reasons : e.target.value})} 
                                />
                      </div> 
                      
                      
                      {/* <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Last POD', languageData)}</Label>
              <Input className={"fontstyle text-background-paste"}
                value={last_pod}
                disabled={is_search === true ? true : false}
                onChange={(e) => this.setState({ last_pod: e.target.value })}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'End POD', languageData)}</Label>
              <Input className={"fontstyle text-background-paste"}
                value={end_pod}
                disabled={is_search === true ? true : false}
                onChange={(e) => this.setState({ end_pod: e.target.value })}
              />
            </div> */}
                         <div className = "col-md-12 space-margin">
                             <Label  className = "fontstyle normal-font" >Comments</Label>
                           <textarea  
                           //className = "fontstyle textarea-background"  
                            placeholder = ''
                            className = {"fontstyle textarea-background" } 
                            value = {comments}  
                            onChange= {(e)=>this.setState({comments : e.target.value})} 
                            />
                        </div>

                                 </div>
                                 </Collapse> 
                                 <div>
                     

                                 <div className="row" style={{ marginBottom: '7px' }}>
                                {origin_requirements && origin_requirements.length > 0 &&
                                    <div className="col-md-6">
                                        <div className="publishuser-card-component" style={{ borderRadius: '10px' }}>
                                            <div className="publish-title" >
                                                <Row>
                                                    <Colxx xxs="12">
                                                        <Label className="fontstyle"                                                                                                  
                                                            style={{ fontWeight: 700, fontSize: '15px' }}>{onChangeLanguage(locale, 'Origin Requirements - (Source - ', languageData) + getValue(issuecode_data, 'issue_code', 'team', issuer) + ')'}</Label>

                                                    </Colxx>
                                                </Row>

                                            </div>
                                            <table>
                                                <thead className="thead-height publish-title1">
                                                    <tr>
                                                        <td style={{ padding: '2px 10px',width: '20%' }}>
                                                            {onChangeLanguage(locale, 'Issuer', languageData)}
                                                        </td>
                                                        <td style={{ padding: '2px 10px' }}>
                                                            {onChangeLanguage(locale, 'Key Descriptions', languageData)}
                                                        </td>
                                                    </tr>
                                                </thead>
                                                <tbody className="tbody-height">
                                                    {origin_requirements.map((value, index) =>
                                                        <tr>
                                                            <td style={{ width: '20%' }}>
                                                                <div className="" style={{ backgroundColor: 'rgb(239 100 50/20%)', padding: '2px', margin: '10px' }}>
                                                                    <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }}>{value.Title}</Label>
                                                                </div></td>
                                                            <td>  <div className="" style={{ backgroundColor: '#F5F6F8', padding: '2px', margin: '10px', width: '96%' }}>
                                                                <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }} >
                                                                    {value.Requirement}
                                                                </Label>
                                                            </div></td>
                                                        </tr>
                                                    )}

                                                </tbody>
                                            </table>


                                        </div>
                                    </div>
                                }
                                {
                                  country_requirements && country_requirements.length > 0 &&
                                    <div className="col-md-6">
                                        <div className="publishuser-card-component" style={{ borderRadius: '10px' }}>
                                            <div className="publish-title" >
                                                <Row>
                                                    <Colxx xxs="12">
                                                        <Label className="fontstyle"
                                                            style={{ fontWeight: 700, fontSize: '15px' }}>{onChangeLanguage(locale, 'Country Requirements - (Source - ', languageData) + getValue(issuecode_data, 'issue_code', 'team', issuer) + ')'}</Label>

                                                    </Colxx>
                                                </Row>

                                            </div>
                                            <table>
                                                <thead className="thead-height publish-title1">
                                                    <tr>
                                                        <td style={{ padding: '2px 10px',width: '20%' }}>
                                                            {onChangeLanguage(locale, 'Issuer', languageData)}
                                                        </td>
                                                        <td style={{ padding: '2px 10px',width: '20%' }}>
                                                            {onChangeLanguage(locale, 'POL', languageData)}
                                                        </td>
                                                        <td style={{ padding: '2px 10px',width: '20%' }}>
                                                            {onChangeLanguage(locale, 'POD', languageData)}
                                                        </td>
                                                        <td style={{ padding: '2px 10px' }}>
                                                            {onChangeLanguage(locale, 'Key Descriptions', languageData)}
                                                        </td>
                                                    </tr>
                                                </thead>
                                                <tbody className="tbody-height">
                                                    {country_requirements.map((value, index) =>
                                                        <tr>
                                                            <td style={{ width: '20%' }}>
                                                                <div className="" style={{ backgroundColor: 'rgb(239 100 50/20%)', padding: '2px', margin: '10px' }}>
                                                                    <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }}>{value.Title}</Label>
                                                                </div></td>
                                                            <td style={{ width: '20%' }}>
                                                              <div className="" style={{ backgroundColor: 'rgb(239 100 50/20%)', padding: '2px', margin: '10px' }}>
                                                                  <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }}>{value.POL}</Label>
                                                              </div>
                                                            </td>
                                                            <td style={{ width: '20%' }}>
                                                              <div className="" style={{ backgroundColor: 'rgb(239 100 50/20%)', padding: '2px', margin: '10px' }}>
                                                                  <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }}>{value.POD}</Label>
                                                              </div>
                                                            </td>
                                                            <td>  <div className="" style={{ backgroundColor: '#F5F6F8', padding: '2px', margin: '10px', width: '96%' }}>
                                                                <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }} >
                                                                    {value.Requirement}
                                                                </Label>
                                                            </div></td>
                                                        </tr>
                                                    )}

                                                </tbody>
                                            </table>


                                        </div>
                                    </div>
                                }
   
                                {customer_requirements && customer_requirements.length > 0 &&
                                    <div className="col-md-12">
                                        <div className="publishuser-card-component" style={{ borderRadius: '10px' }}>
                                            <div className="publish-title" >
                                                <Row>
                                                    <Colxx xxs="12">
                                                        <Label className="fontstyle"
                                                            style={{ fontWeight: 700, fontSize: '15px' }}>{onChangeLanguage(locale, 'Customer Requirements - (Source - ', languageData) + getValue(issuecode_data, 'issue_code', 'team', issuer) + ')'}</Label>

                                                    </Colxx>
                                                </Row>

                                            </div>
                                            <table>
                                                <thead className="thead-height publish-title1">
                                                    <tr>
                                                        {/* <td style={{ padding: '2px 10px',width: '10%' }}>
                                                            {onChangeLanguage(locale, 'Item', languageData)}
                                                        </td>
                                                        <td style={{ padding: '2px 10px',width: '10%'  }}>
                                                            {onChangeLanguage(locale, 'CU', languageData)}
                                                        </td>
                                                        <td style={{ padding: '2px 10px',width: '10%'  }}>
                                                            {onChangeLanguage(locale, 'SH', languageData)}
                                                        </td>
                                                        <td style={{ padding: '2px 10px',width: '10%'  }}>
                                                            {onChangeLanguage(locale, 'MR', languageData)}
                                                        </td>
                                                        <td style={{ padding: '2px 10px',width: '10%'  }}>
                                                            {onChangeLanguage(locale, 'CN', languageData)}
                                                        </td>
                                                        
                                                        <td style={{ padding: '2px 10px' }}>
                                                            {onChangeLanguage(locale, 'Key Descriptions', languageData)}
                                                        </td>
                                                        <td style={{ padding: '2px 10px',width: '10%'  }}>
                                                            {onChangeLanguage(locale, 'Destination', languageData)}
                                                        </td> */}
                                                         <td style={{ padding: '2px 10px',width: '10%'  }}>
                                                            {onChangeLanguage(locale, 'Issuer', languageData)}
                                                        </td>
                                                        <td style={{ padding: '2px 10px',width: '10%'  }}>
                                                            {onChangeLanguage(locale, 'CU', languageData)}
                                                        </td>
                                                        <td style={{ padding: '2px 10px',width: '10%'  }}>
                                                            {onChangeLanguage(locale, 'MR', languageData)}
                                                        </td>
                                                        <td style={{ padding: '2px 10px',width: '10%'  }}>
                                                            {onChangeLanguage(locale, 'Export Haluage', languageData)}
                                                        </td>
                                                        <td style={{ padding: '2px 10px',width: '10%'  }}>
                                                            {onChangeLanguage(locale, 'POL', languageData)}
                                                        </td>
                                                        <td style={{ padding: '2px 10px' }}>
                                                            {onChangeLanguage(locale, 'Key Descriptions', languageData)}
                                                        </td>
                                                    </tr>
                                                </thead>
                                                <tbody className="tbody-height">
                                                {customer_requirements.map((value, index) =>
                                                        <tr>
                                                            {/* <td style={{width: '10%' }}>
                                                               {(value.Items && value.Items !== null && value.Items !== '') && 
                                                               <div className="" style={{ backgroundColor: 'rgb(239 100 50/20%)', padding: '2px', margin: '10px' }}>
                                                                    <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }}>{value.Items}</Label>
                                                                </div>}
                                                            </td>
                                                            <td style={{width: '10%' }}>
                                                              {(value.CU !== null && value.CU !== '') &&
                                                                <div className="" style={{ backgroundColor: 'rgb(239 100 50/20%)', padding: '2px', margin: '10px' }}>
                                                                    <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }}>{value.CU}</Label>
                                                                </div>}
                                                            </td>
                                                            <td style={{width: '10%' }}>
                                                               {(value.SH !== null && value.SH !== '') &&
                                                                <div className="" style={{ backgroundColor: 'rgb(239 100 50/20%)', padding: '2px', margin: '10px' }}>
                                                                    <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }}>{value.SH}</Label>
                                                                </div>}
                                                            </td>
                                                            <td style={{width: '10%' }}>
                                                               {(value.MR !== null && value.MR !== '') &&
                                                                <div className="" style={{ backgroundColor: 'rgb(239 100 50/20%)', padding: '2px', margin: '10px' }}>
                                                                    <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }}>{value.MR}</Label>
                                                                </div>}
                                                            </td>
                                                            <td style={{width: '10%' }}>
                                                                {(value.CN !== null && value.CN !== '') &&
                                                                    <div className="" style={{ backgroundColor: 'rgb(239 100 50/20%)', padding: '2px', margin: '10px',width: '70%'}}>
                                                                    <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }}>{value.CN}</Label>
                                                                </div>}
                                                            </td>
                                                            <td>
                                                                <div className="" style={{ backgroundColor: '#F5F6F8', padding: '2px', margin: '10px'}}>
                                                                    <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }} >
                                                                        {value.Requirement}
                                                                    </Label>
                                                                </div>
                                                            </td>
                                                            <td style={{width: '10%' }}>
                                                                {(value.Destination !== null && value.Destination !== '') && 
                                                                <div className="" style={{ backgroundColor: 'rgb(239 100 50/20%)', padding: '2px', margin: '10px' }}>
                                                                    <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }}>{value.Destination}</Label>
                                                                </div>}
                                                            </td> */}
                                                            <td style={{width: '10%' }}>
                                                              {(value.Title !== null && value.Title !== '') &&
                                                                <div className="" style={{ backgroundColor: 'rgb(239 100 50/20%)', padding: '2px', margin: '10px' }}>
                                                                    <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }}>{value.Title}</Label>
                                                                </div>}
                                                            </td>
                                                            <td style={{width: '10%' }}>
                                                              {(value.CU !== null && value.CU !== '') &&
                                                                <div className="" style={{ backgroundColor: 'rgb(239 100 50/20%)', padding: '2px', margin: '10px' }}>
                                                                    <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }}>{value.CU}</Label>
                                                                </div>}
                                                            </td>
                                                            <td style={{width: '10%' }}>
                                                               {(value.MR !== null && value.MR !== '') &&
                                                                <div className="" style={{ backgroundColor: 'rgb(239 100 50/20%)', padding: '2px', margin: '10px' }}>
                                                                    <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }}>{value.MR}</Label>
                                                                </div>}
                                                            </td>
                                                            <td style={{width: '10%' }}>
                                                               {(value.Export_x0020_Haluage !== null && value.Export_x0020_Haluage !== '') &&
                                                                <div className="" style={{ backgroundColor: 'rgb(239 100 50/20%)', padding: '2px', margin: '10px' }}>
                                                                    <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }}>{value.Export_x0020_Haluage}</Label>
                                                                </div>}
                                                            </td>
                                                            <td style={{width: '10%' }}>
                                                               {(value.POL !== null && value.POL !== '') &&
                                                                <div className="" style={{ backgroundColor: 'rgb(239 100 50/20%)', padding: '2px', margin: '10px' }}>
                                                                    <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }}>{value.POL}</Label>
                                                                </div>}
                                                            </td>
                                                            <td>
                                                                <div className="" style={{ backgroundColor: '#F5F6F8', padding: '2px', margin: '10px'}}>
                                                                    <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }} >
                                                                        {value.Requirement}
                                                                    </Label>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}

                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                }


                            </div>
                       
                    </div>
                 <div className = "row text-center" >  
                <Button className = "button-width" color="secondary"
                      onClick={()=>this.onPasteS9610()}>
                    {onChangeLanguage(locale,'Paste S9610',languageData)}
                  </Button>  
                <Button className = "button-width" color="secondary" onClick={()=>this.fetchData()}>
                      {onChangeLanguage(locale,'Search',languageData)} 
                  </Button>                    
                <Button className = "button-width" color="primary" onClick={()=>this.onSubmit()} disabled={this.state.isSubmitting}>
                      {onChangeLanguage(locale,'Save',languageData)} 
                </Button>                           
                <Button className = "button-width" color="secondary" onClick={()=>this.onrefresh()}>
                      {onChangeLanguage(locale,'Refresh',languageData)}
                </Button>  
                {/* <Button className = "button-width" color="secondary"
                      onClick={()=>this.searchTeamSite()}>
                    {onChangeLanguage(locale,'Get CRs',languageData)}
                  </Button>   */}
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


