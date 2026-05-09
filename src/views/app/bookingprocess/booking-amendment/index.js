import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import Loading from "react-fullscreen-loading";
import { Label, Input, Button } from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { onChangeLanguage,convertLocalToUTCDate ,getValue,get_array_id,get_multiplechoose_array,getoptionvalue} from '../../../../helper'
import Select from 'react-select';
import moment from 'moment';
import Workbook from 'react-excel-workbook'
import * as clipboard from "clipboard-polyfill/text";
import { getValue_S9610 } from '../../pasteData'
import { createNotification } from '../../../../toast';
import DatePicker from "../../datePicker";
import { Table,Checkbox } from 'antd';

import{bookingamendmentService} from '../../../../redux/bookingprocess/bookingamentment/saga'

import{amendmentmediumService} from '../../../../redux/bookingprocess/amendmentmedium/saga'
import{amendmenttypeService} from '../../../../redux/bookingprocess/amendmenttype/saga'
import{amendmentinducedService} from '../../../../redux/bookingprocess/amendmentinduced/saga'
import{amendmentstatusService} from '../../../../redux/bookingprocess/amendmentstatus/saga'
import{cargotypeService} from '../../../../redux/bookingprocess/cargotype/saga'
import{assignedService} from '../../../../redux/bookingprocess/assigned/saga'
import{reasonsService} from '../../../../redux/bookingprocess/reasons/saga'
import{teamsService} from '../../../../redux/teams/saga';
import{issuecodeService} from '../../../../redux/bookingprocess/issuecode/saga';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

class BookingSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      id:0,
      region: '',
      area: '',
      team: '',
      user_id: '',
      issuer_office: '',
      csb_office: '',
      booking_number: '',
      cu_match_code: '',
      mr_matchcode: '',
      amendment_medium: '',
      crm_case_no: '',
      amendment_type: [],
      amendment_induced_by: '',
      amendment_status: '',
      reason: '',
      assigned_to: '',
      cargo_type: '',
      comments: '',
      exception_start_date: '',
      start_date: new Date(),
      end_date: '',
      no_of_shipment:'',
      last_pod:'',
      end_pod:'',
      updated_start_time:new Date(),
      is_search: false,
      is_submit: false,
      crmsearch:false,
      tableindex:0,
      tabledata:[],
      amendment_medium_data: [],
      amendment_type_data: [],
      amendment_induced_by_data: [],
      amendment_status_data: [],
      reason_data: [],
      assigned_to_data: [],
      cargo_type_data: [],
      issuecode_data:[],
      teamdata:[],
      searchdata:[],  
      tableindex:0,
      tabledata:[],
      isDataPasted: false,
      bookingamendmentcount:'',
      bookingamendmentcountlast:'',
    }
  }
  componentDidMount() {
    this.setState({
        start_date: new Date(), 
      })
      
    this.fetchamendmentmedium()
    this.fetchamendmenttype()
    this.fetchamendmentinduced()
    this.fetchamendmentstatus()
    this.fetchcargotype()
    this.fetchassigned()
    this.fetchreason()
    this.fetchissie()
    this.fetchteam()
    this.fetchBookingamendmentCount()
  }
  fetchBookingamendmentCount(){
    this.setState({loading:true})
    const {username} = this.props
    //console.log(username)
    bookingamendmentService.fetchbookingamendmentcount(username)
    .then((res) => {
       if(res.status)   { 
              let filterstatus = res.data;
              let lastdata = res.lastcount;
              this.setState({ 
                bookingamendmentcount:filterstatus, 
                bookingamendmentcountlast:lastdata     
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
  fetchamendmentmedium() {
    this.setState({ loading: true })
    amendmentmediumService.fetchapi()
      .then((res) => {
        this.setState({ loading: false })
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return {
              label: cusmaidid.name ,value: cusmaidid.id.toString()
            };
          });
          this.setState({
            amendment_medium_data: regionlist,
          })
        }
      })
      .catch((error) => { this.setState({ loading: false }) });
  }
  fetchamendmenttype(amendmenttype) {
    this.setState({ loading: true })
    amendmenttypeService.fetchapi()
      .then((res) => {
        this.setState({ loading: false })
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return {
              label: cusmaidid.name ,value: cusmaidid.id.toString()
            };
          });
          this.setState({
            amendment_type_data: regionlist,
          })
          if(amendmenttype)
            {
              var  list = [{label :'Select All' ,value : 0}]
              let option =  getoptionvalue(get_multiplechoose_array(regionlist,amendmenttype),regionlist,[])
              // let filterstatus = (option).filter(item => item.value !== 0)
              this.setState({ 
                amendment_type:option  , 
                         
              }) 
              console.log('option',amendmenttype)
              console.log('option',filterstatus)
              console.log('option',option)
            }
        }
      })
      .catch((error) => { this.setState({ loading: false }) });
  }
  fetchamendmentstatus() {
    this.setState({ loading: true })
    amendmentstatusService.fetchapi()
      .then((res) => {
        this.setState({ loading: false })
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return {
              label: cusmaidid.name ,value: cusmaidid.id.toString()
            };
          });
          this.setState({
            amendment_status_data: regionlist,
          })
        }
      })
      .catch((error) => { this.setState({ loading: false }) });
  }
  fetchamendmentinduced() {
    this.setState({ loading: true })
    amendmentinducedService.fetchapi()
      .then((res) => {
        this.setState({ loading: false })
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return {
              label: cusmaidid.name ,value: cusmaidid.id.toString()
            };
          });
          this.setState({
            amendment_induced_by_data: regionlist,
          })
        }
      })
      .catch((error) => { this.setState({ loading: false }) });
  }
  fetchcargotype() {
    this.setState({ loading: true })
    cargotypeService.fetchapi()
      .then((res) => {
        this.setState({ loading: false })
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return {
              label: cusmaidid.name ,value: cusmaidid.id.toString()
            };
          });
          this.setState({
            cargo_type_data: regionlist,
          })
        }
      })
      .catch((error) => { this.setState({ loading: false }) });
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
  fetchreason() {
    this.setState({ loading: true })
    reasonsService.fetchapi()
      .then((res) => {
        this.setState({ loading: false })
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return {
              label: cusmaidid.name ,value: cusmaidid.id.toString()
            };
          });
          this.setState({
            reason_data: regionlist,
          })
        }
      })
      .catch((error) => { this.setState({ loading: false }) });
  }
  fetchassigned() {
    this.setState({ loading: true })
    assignedService.fetchapi()
    .then((res) => {
        this.setState({ loading: false })
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return {
              label: cusmaidid.name ,value: cusmaidid.id.toString()
            };
          });
          this.setState({
            assigned_to_data: regionlist,
          })
        }
      })
      .catch((error) => { this.setState({ loading: false }) });
  }
  handleChangeAmendment_Medium = (selectedOptions) => {
    this.setState({ amendment_medium: selectedOptions.value })
  }
  handleChangeAmendment_Type = (value) => {
    this.setState({ amendment_type: value })
    const {amendment_type}=this.state
    console.log("amendment", amendment_type)
  }
  handleChangeAmendment_Induced_by = (selectedOptions) => {
    this.setState({ amendment_induced_by: selectedOptions.value })
  }
  handleChangeAmendment_status = (selectedOptions) => {
    this.setState({ amendment_status: selectedOptions.value })
  }
  handleChangeReason = (selectedOptions) => {
    this.setState({ reason: selectedOptions.value })
  }
  handleChangeAssigned_to = (selectedOptions) => {
    this.setState({ assigned_to: selectedOptions.value })
  }
  handleChangeCargo_type = (selectedOptions) => {
    this.setState({ cargo_type: selectedOptions.value })
  }

  onChangeFileUpload(files)
  {
    const {tableindex}=this.state
    this.setState({
      loading : true
    })
    bookingamendmentService.fileUpload(files[0])
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
 
  onClearValue() {
    this.setState({
      id:0,
      region: '',
      area: '',
      team: '',
      user_id: '',
      issuer_office: '',
      csb_office: '',
      booking_number: '',
      cu_match_code: '',
      mr_matchcode: '',
      amendment_medium: '',
      crm_case_no: '',
      amendment_type: [],
      amendment_induced_by: '',
      amendment_status: '',
      reason: '',
      assigned_to: '',
      cargo_type: '',
      comments: '',
      exception_start_date: '',
      start_date: new Date(),
      end_date: '',
      no_of_shipment:'',
      last_pod:'',
      end_pod:'',
      updated_start_time:new Date(),
      is_search: false,
      is_submit: false,
      tableindex:0,
      tabledata:[],
      crmsearch:false
    })

  }
  onSubmit() { 
    const {id, region, area, team, issuer_office, csb_office, booking_number, cu_match_code, mr_matchcode, assigned_to,
      amendment_medium, crm_case_no, amendment_type,amendment_induced_by,last_pod,
      end_pod,amendment_status, reason, cargo_type, comments, exception_start_date,updated_start_time,no_of_shipment} = this.state;
      var is_fill = false
      // if (booking_number !==''&& cu_match_code!=='' && region !=='' &&area !==''&& team!==''&& mr_matchcode !==''&& amendment_medium !=='' 
      // &&amendment_type!==''&&amendment_induced_by!==''&&amendment_status!==''&& reason !=='' && cargo_type !=='' && 
      // csb_office !=='' && exception_start_date !=='' && no_of_shipment !=='' && crm_case_no !=='') {
      //   this.setState({
      //     crmsearch:true
      //   })
      //   is_fill = true
      // }
      if (amendment_medium === '4') {
        this.setState({
          crmsearch:true
        })
        if (booking_number !==''&& cu_match_code!=='' && region !=='' &&area !==''&& team!==''&& mr_matchcode !==''&& amendment_medium !=='' 
        &&amendment_type!==''&&amendment_induced_by!==''&&amendment_status!==''&& reason !=='' && cargo_type !=='' && 
        csb_office !=='' && exception_start_date !=='' && no_of_shipment !=='' && crm_case_no !=='') {
          
          is_fill = true
        }
      }
      else {
        this.setState({
          crmsearch:false
        })
        if (booking_number !==''&& cu_match_code!=='' && region !=='' &&area !==''&& team!==''&& mr_matchcode !==''&& amendment_medium !=='' 
        &&amendment_type!==''&&amendment_induced_by!==''&&amendment_status!==''&& reason !=='' && cargo_type !=='' && 
        csb_office !=='' && exception_start_date !=='' && no_of_shipment !=='' ) {
          
          is_fill = true
         
        }
      }
      if( is_fill === true )
    {
        const end_time =  moment(new Date()).format('MM/DD/YYYY hh:mm:ss a') 
        const {username} = this.props
        let   end_date=convertLocalToUTCDate(new Date()),
        start_date=convertLocalToUTCDate(updated_start_time),
          updatedstarttime=convertLocalToUTCDate(updated_start_time),
          updated_end_time=convertLocalToUTCDate(new Date())
          const amendment_typefile = get_array_id(amendment_type)
        bookingamendmentService.createbookingamendment(id,region,area,team, username,issuer_office,csb_office,booking_number,cu_match_code,mr_matchcode,amendment_medium,
          crm_case_no,amendment_typefile,amendment_induced_by,amendment_status,reason,assigned_to,cargo_type,comments,exception_start_date ,no_of_shipment,last_pod,
          end_pod,start_date,end_date,updatedstarttime ,updated_end_time)
          .then((res) => { 
            this.setState({  
              end_date:end_time,
              loading : false     
            }) 
            if(res.status)
              {
                createNotification('Created','success','filled')
                this.onClearValue()
                this.fetchBookingamendmentCount()
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
    const {team_data,areadata}=this.state
    if(record !== null && record)
    {
       this.setState({
        id:record.id,
        gsc_userid:record.gsc_userid,
        region:record.region,
        area:record.area,
        team:record.team,
        issuer_office:record.issuer_office,
        csb_office:record.csb_office,
        booking_no:record.booking_no,
        cu_match_code:record.cu_match_code,
        mr_matchcode:record.mr_match_code,
        amendment_medium:record.amendment_medium,
        crm_case_no:record.crm_case_no,
        amendment_type:[],
        amendment_induced_by:record.amendment_induced_by,
        amendment_status:record.amendment_status,
        no_of_shipment:record.no_of_shipment,
        reason:record.reason,
        assigned_to:record.assigned_to,
        cargo_type:record.cargo_type,
        comments:record.comments,
        exception_start_date:record.exception_start_date,
        start_date:record.start_time,
        end_date:record.end_time,
        last_pod:record.last_pod,
        end_pod:record.end_pod,
        is_submit:false,
        is_search:true
        })
    }
    this.fetchamendmenttype(record.amendment_type_array)

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
  const {booking_number,exception_start_date,tableindex} = this.state 
  if(booking_number !== "" || exception_start_date !=='')
  {
      this.setState({
          loading : true,
          is_submit:false
      })
      bookingamendmentService.search(booking_number,exception_start_date)
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
    createNotification('Please Enter Booking Number or Exception Start Date','error','filled')
  }
}
  renderTemplate() {
    const { languageData, locale } = this.props

    const column_name = ["GSC User ID", "Region", "Area", "Sub Area", "Issuer Office", "CSB Office / Assigned User ID", "Booking Number", "CU Match Code", "MR Match Code", "Amendment Medium", "CRM Case Number", "Amendment Type", "Amendment Induced By", "Amendment Status", "Reason", "Assigned To(basis reason)", "Cargo Type", "Exception Start Date/Time", "No of Shipment", "Comments", "Last POD", "POD/End" , "Start DateTime", "End DateTime"]
    return (

      <Workbook filename="Booking Amendment.xlsx" element={
        <Button className="button-width"
          color="secondary" >
          {onChangeLanguage(locale, 'Download Template', languageData)}
        </Button>
      }>
        <Workbook.Sheet data={[]} name="Sheet A">
          {column_name && column_name.map((value, index) =>
            <Workbook.Column label={value} value={value} />
          )}
        </Workbook.Sheet>
      </Workbook>


    );
  }
  async onPasteS9610() {
    clipboard.readText().then((text) => {
      var record = getValue_S9610(text)
      console.log("kjbkj ", JSON.stringify(record))
      let value=(record.csb_office).trim()
      console.log("kjbkj jjk", value)
      this.setState({
             issuer_office:record.issuer_office,
             csb_office:record.csb_office,
             booking_number:record.booking_number,
             cu_match_code:record.cu_match_code,
             last_pod:record.last_pod,
            end_pod:record.end_pod,
             region:getValue(this.state.issuecode_data, 'issue_code', 'id', value),
             area:  getValue(this.state.issuecode_data, 'issue_code', 'id', value),
             team: getValue(this.state.issuecode_data, 'issue_code', 'id', value)
             
          })

    });
    this.setState({
      isDataPasted: true
  }); 
  }
  onChangetime(date)
  {
    this.setState({exception_start_date  : date})
   
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
getamendmentvalue(id,array)
    {
     var name = ' '
          if(array != null)
          {
                for(var i=0;i< array.length;i++)
                {
                    if(array[i].value === id)
                    {
                       name = array[i].label
                    }
            }
        }
      return name
}   
  render() {
    const { match, locale, languageData, username } = this.props
    const { loading, region, area, team, issuer_office, csb_office, booking_number, cu_match_code, mr_matchcode, assigned_to, assigned_to_data,isDataPasted,
      amendment_medium, amendment_medium_data, crm_case_no, amendment_type, amendment_type_data, amendment_induced_by, amendment_induced_by_data,
      amendment_status, amendment_status_data, reason, reason_data, cargo_type, cargo_type_data, comments, exception_start_date,bookingamendmentcount,bookingamendmentcountlast,
      no_of_shipment,last_pod,end_pod,start_date,end_date, is_search, is_submit ,searchdata,teamdata,tabledata,tableindex,crmsearch} = this.state
    
      const  columsss = [
        {
          title: onChangeLanguage(locale,'GSC User Id',languageData),
          dataIndex: 'user_id',
          key: 'user_id',
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
            title:onChangeLanguage(locale,'CSB Office/Assigned user id',languageData),
            dataIndex: 'csb_office',
            key: 'csb_office',
            render: (text, record,index) => ( 
              <div   style = {{padding:'2px',width:'200px'}}>
              {text}
              </div>),
          },
          {
            title: onChangeLanguage(locale,'Issuer Office',languageData),
            dataIndex: 'issuer_office',
            key: 'issuer_office',
            render: (text, record) => ( 
                <div className="row d-flex justify-content-center"  style = {{padding:'2px',width:'200px'}}>
                  {text}
                </div>)
          },
          {
            title: onChangeLanguage(locale,'CU Match Code',languageData),
            dataIndex: 'cu_match_code',
            key: 'cu_match_code',
            render: (text, record,index) => ( 
                <div   style = {{padding:'2px',width:'200px'}}>{text}
                </div>)
          },
            {
              title:onChangeLanguage(locale,'MR Match Code',languageData) ,
              dataIndex: 'mr_match_code',
              key: 'mr_match_code',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                  {text}
                </div>),
            },
            {
              title:onChangeLanguage(locale,'Amendment Medium',languageData) ,
              dataIndex: 'amendment_medium',
              key: 'amendment_medium',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                  {getValue(amendment_medium_data, 'value', 'label', text)} 
                </div>),
            },
            {
              title:onChangeLanguage(locale,'CRM Case Number',languageData) ,
              dataIndex: 'crm_case_no',
              key: 'crm_case_no',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                  {text}
                </div>),
            },
           
            {
              title:onChangeLanguage(locale,'Amendment Type',languageData) ,
              dataIndex: 'amendment_type_array',
              key: 'amendment_type_array',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                 { record.amendment_type_array && record.amendment_type_array.map((value,index) => 
                  <div >
                     {this.getamendmentvalue(value,this.state.amendment_type_data)}
                  </div>)} 
            
                </div>),
            },
            {
              title:onChangeLanguage(locale,'Amendment Induced By',languageData) ,
              dataIndex: 'amendment_induced_by',
              key: 'amendment_induced_by',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                  {getValue(amendment_induced_by_data, 'value', 'label', text)} 
                </div>),
            },
            {
              title:onChangeLanguage(locale,'Amendment Status',languageData) ,
              dataIndex: 'amendment_status',
              key: 'amendment_status',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                 {getValue(amendment_status_data, 'value', 'label', text)} 
                </div>),
            },
            {
              title:onChangeLanguage(locale,'Reason',languageData) ,
              dataIndex: 'reason',
              key: 'reason',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                {getValue(reason_data, 'value', 'label', text)} 
                </div>),
            },
            {
              title:onChangeLanguage(locale,'Assigned To(basis reason)',languageData) ,
              dataIndex: 'assigned_to',
              key: 'assigned_to',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                  {getValue(assigned_to_data, 'value', 'label', text)} 
                </div>),
            },
            {
              title:onChangeLanguage(locale,'Cargo Type',languageData) ,
              dataIndex: 'cargo_type',
              key: 'cargo_type',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                 {getValue(cargo_type_data, 'value', 'label', text)} 
                </div>),
            },
            {
              title:onChangeLanguage(locale,'Exception Start Date',languageData) ,
              dataIndex: 'exception_start_date',
              key: 'exception_start_date',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                  {text}
                </div>),
            },
            {
              title:onChangeLanguage(locale,'No of Shipment',languageData) ,
              dataIndex: 'no_of_shipment',
              key: 'no_of_shipment',
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
        <title>{onChangeLanguage(locale, 'Booking Amendment', languageData)}</title>
        <Row>
          <Colxx xxs="12">
            <div className="row">
              <div className="col-md-5">
                <Breadcrumb heading={onChangeLanguage(locale, 'Booking Amendment', languageData)} match={match} />
              </div>

              <div className="col-md-3">
                {this.renderTemplate()}
                <Button className="button-width" color="primary">
                  <i className="simple-icon-cloud-upload" style={{ margin: '0px 4px', fontSize: '12px' }} />
                  <a style={{ margin: '0px' }} > {onChangeLanguage(locale, 'Upload', languageData)}</a>
                  <input type="file" name="file" id="File-1" onClick={(e) => e.target.value = null}
                    className="filepicker_customButton"
                    style={{ width: '26%', marginLeft: '-22%' }}
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={({ target: { files } }) => this.onChangeFileUpload(files)} />
                </Button>
              </div>
              <div className = "col-md-2">
                          <h2 style = {{marginTop:'15px'}}>Total EQ : {bookingamendmentcount}</h2>
                        </div>
                        <div className = "col-md-2">
                            <h2  style = {{marginTop:'15px'}}>Last EQ : {bookingamendmentcountlast}</h2>
                        </div>
            </div>
            <Separator className="separator-margin" />
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
                                disabled={is_search || isDataPasted}
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
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Issuer Office', languageData)}</Label>
              <Input className={ "fontstyle text-background-paste"}
                value={issuer_office}
                disabled={is_search || isDataPasted}
                onChange={(e) => this.setState({ issuer_office: e.target.value })}
              />
            </div>
            
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Booking Number', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <Input className={is_submit === true && booking_number === '' ? "error-border-paste" : "fontstyle text-background-paste"}
                value={booking_number}
                type = 'number'
                disabled={is_search || isDataPasted}
                onChange={(e) => this.setState({ booking_number: e.target.value })}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'CU Match Code', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <Input className={is_submit === true && cu_match_code === '' ? "error-border-paste" : "fontstyle text-background-paste"}
                value={cu_match_code} disabled={isDataPasted} 
                onChange={(e) => this.setState({ cu_match_code: e.target.value })}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'MR Match Code', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <Input className={is_submit === true && mr_matchcode === '' ? "error-border" : "fontstyle text-background"}
                value={mr_matchcode}
                disabled={is_search === true ? true : false}
                onChange={(e) => this.setState({ mr_matchcode: e.target.value })}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Amendment Medium', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <Select
                className={is_submit === true && amendment_medium === '' ? "error-border-select" : "react-select fontstyle"}
                classNamePrefix="react-select"
                name="form-field-name"
                value={amendment_medium_data.filter(option => option.value === amendment_medium)}
                options={amendment_medium_data}
                isDisabled={is_search === true ? true : false}
                onChange={this.handleChangeAmendment_Medium}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'CRM Case Number', languageData)}</Label>
              <Input className={crmsearch === true && crm_case_no=== ''?  "error-border":"fontstyle text-background"}
                value={crm_case_no}
                onChange={(e) => this.setState({ crm_case_no: e.target.value })}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Amendment Type', languageData)}<a style={{ color: 'red' }}>*</a>
              {(is_submit === true && amendment_type.length ===0)  && <a className ="fontstyle mandatory-label">{onChangeLanguage(locale,'Mandatory Field',languageData)}</a>}</Label>
             
              <ReactMultiSelectCheckboxes  className = 'fontstyle' 
                                    value={amendment_type}
                                    onChange={(option) =>this.handleChangeAmendment_Type(option)}
                                    // onChange={(option)=>  this.setState({amendment_type :option })}
                                    options={amendment_type_data}
                                    getDropdownButtonLabel={({ placeholderButtonLabel, value }) => { if(value.length==0) {return "Select.."; }else{ var item = value.filter(item=>item.label.includes('Select All')); if(item.length!=0){ return (value.length-1)+" selected";} else {return value.length+" selected";}  }}}
                                   />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Amendment Induced By', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <Select
                className={is_submit === true && amendment_induced_by === '' ? "error-border-select" : "react-select fontstyle"}
                classNamePrefix="react-select"
                name="form-field-name"
                value={amendment_induced_by_data.filter(option => option.value === amendment_induced_by)}
                options={amendment_induced_by_data}
                onChange={this.handleChangeAmendment_Induced_by}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Amendment Status', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <Select
                className={is_submit === true && amendment_status === '' ? "error-border-select" : "react-select fontstyle"}
                classNamePrefix="react-select"
                name="form-field-name"
                value={amendment_status_data.filter(option => option.value === amendment_status)}
                options={amendment_status_data}
                onChange={this.handleChangeAmendment_status}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Reason', languageData)}</Label>
              <Select
                className={is_submit === true && reason === '' ? "error-border-select" : "react-select fontstyle"}
                classNamePrefix="react-select"
                name="form-field-name"
                value={reason_data.filter(option => option.value === reason)}
                options={reason_data}
                onChange={this.handleChangeReason}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Assigned To(basis reason)', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <Select
                className={"react-select fontstyle"}
                classNamePrefix="react-select"
                name="form-field-name"
                value={assigned_to_data.filter(option => option.value === assigned_to)}
                options={assigned_to_data}
                onChange={this.handleChangeAssigned_to}
              />
            </div>
            <div className="col-md-3 space-margin">
              <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Cargo Type', languageData)}<a style={{ color: 'red' }}>*</a></Label>
              <Select
                className={is_submit === true && cargo_type === '' ? "error-border-select" : "react-select fontstyle"}
                classNamePrefix="react-select"
                name="form-field-name"
                value={cargo_type_data.filter(option => option.value === cargo_type)}
                options={cargo_type_data}
                onChange={this.handleChangeCargo_type}
              />
            </div>
            <div className = "col-md-3 space-margin"  >
                  <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Exception Start Date/Time',languageData)}<a style = {{color :'red'}}>*</a>
                  {(is_submit === true && exception_start_date === '')  && <a className ="fontstyle mandatory-label">{onChangeLanguage(locale,'Mandatory Field',languageData)}</a>}
                  </Label>
                    <DatePicker
                    selected={exception_start_date}
                    className = "text-background"
                    onChange={(date) => this.onChangetime(date)}
                    />
              </div>
              <div className = "col-md-3 space-margin"  >
                  <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'No of Shipment',languageData)}<a style = {{color :'red'}}>*</a>
                  {(is_submit === true && no_of_shipment === '')  && <a className ="fontstyle mandatory-label">{onChangeLanguage(locale,'Mandatory Field',languageData)}</a>}
                  </Label>
                   <Input className={"fontstyle text-background"}
                  value={no_of_shipment}
                  onChange={(e) => this.setState({ no_of_shipment: e.target.value })}
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
              <Input className={ "fontstyle text-background-paste"}
                value={end_pod}
                disabled={is_search === true ? true : false}
                onChange={(e) => this.setState({ end_pod: e.target.value })}
              />
            </div> */}
              <div className = "col-md-12 space-margin">
                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Comments',languageData)}</Label>
                    <textarea  className = {"fontstyle textarea-background" } 
                            value = {comments}  
                            onChange= {(e)=>this.setState({comments : e.target.value})} 
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
              onClick={() => this.onSubmit()}>
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
  const { locale, languageData, username } = settings;
  return { locale, languageData, username };
};
export default withRouter(
  connect(mapStateToProps, {

  })(BookingSheet)
);
