import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button, Collapse} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { Checkbox } from 'antd';
import Select from 'react-select';
import CustomRadioButton from '../../../RadioButton'
import { createNotification } from '../../../../toast';
import{CorrectionsheetService} from '../../../../redux/Export/correctionsheet/saga'
import{errortypeService} from '../../../../redux/Export/masters/errortype/saga'
import{remarksService} from '../../../../redux/Export/masters/remarks/saga'
import{amttypeService} from '../../../../redux/Export/masters/amttype/saga'
import{teamService} from '../../../../redux/Export/masters/exportteam/saga'
import{regionexportService} from '../../../../redux/Export/masters/exportregion/saga'
import{userService} from '../../../../redux/users/saga'
import{roleService} from '../../../../redux/role/saga'
import moment from 'moment';
import Workbook from 'react-excel-workbook'
import{issuecodeService} from '../../../../redux/Export/masters/issuercode/saga';
import {onChangeLanguage,convertLocalToUTCDate,convertUTCToLocalDate,getstarttimeendtimeDifferencebew,permittedusers,getValue,getTimeDifference,getCountryName} from '../../../../helper'
import Loading from "react-fullscreen-loading"; 
import {getValue_D1040,getValue_S8100} from '../../pasteData'
import * as clipboard from "clipboard-polyfill/text";
import DatePicker from "../../datePicker";
import DatePickerDate from "../../datePickerDate";
import{teamsiteService} from '../../../../redux/Export/masters/teamsite/saga';
import{reportService} from '../../../../redux/Export/report/saga'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

class Sidebar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        data:[],
        dcsrstart_time:new Date(),
        start_time:new Date(),
        updated_start_time:new Date(),
        complete_time:'',
        amendment_type: '',
        error_type:'',
        remarks:'',
        selectedRemarks: [],
        salled_date: '',
        error_userid:'',
        user_id:'',
        mtd_number:'',
        isuuer:'',
        mr_code:'',
        doc_cutoff:'',
        type:'',
        charge:[],
        date:'',
        time:'',
        bl:'',
        etd:'',
        tat_time:'',
        exception:'',
        trade:'',
        shipment_type:'',
        mtd_type:'',
        hbl:'',
        chargeiomaf:'',
        maf_remarks:'',
        errortypedata:[],
        remarksdata:[],
        amendmenttypedata:[],
        erroruseriddata:[],
        region:'',
        regiondata:[],
        shipment_no:'',
        customer_code:'',
        issuer_code:'',
        pod:'',
        pol:'',
        team:'',
        received_time:'',
        beforeafter_etd:'',
        receiver_org:'',
        shipper_code:'',
        etd_date:'',
        doc_print:'',
        total_correction:'',
        request_type:'',
        copy_tpf_details:'',
        dp_voyage:'',
        consignee : '',
        teamdata:[],
        chargemafdata:[],
        MAF:'',
        SAC:'',
        read:false,
        draft:false,
        sdc:false,
        free_time:false,
        credit:false,
        collapse:false,
        erroruserid_data:[],
        region_data:[],
        team_data:[],
        amendmenttype_data:[],
        reamarks_data:[],
        errortype_data:[],
        issuecode_data:[],
        regionwisefilterdata:[],
        origin_requirements : [],
        country_requirements : [],
        customer_requirements : [],
        teamsite_data:[],
        is_submit:false,
        isDataPasted: false,
        correctioncount:'',
        correctioncountlast:'',
        multiple_amendments:'',
        validationMessage:''
      };
    }
    componentDidMount() {
        this.fetcherrortype()
        this.fetchamttype()
        this.fetchremarks()
        this.fetcherroruserid()
        this.fetchteam()
        this.fetchregion()
        this.fetchroleData()
        this.fetchIssueCodeData()
        this.fetchteamsite(),
        this.fetchCorrectionCount()
      }
      fetchCorrectionCount(){
        this.setState({loading:true})
        const {username} = this.props
        // console.log(username)
        CorrectionsheetService.fetchcorrectioncount(username)
        .then((res) => {
           if(res.status)   { 
                  let filterstatus = res.data;
                  let lastdata = res.lastcount;
                  this.setState({ 
                    correctioncount:filterstatus, 
                    correctioncountlast:lastdata     
                  }) 
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
  
  }
      fetchroleData() {  
        this.setState({
          loading : true
        })
        roleService.fetchroleData()
          .then((res) => { 
            this.setState({   
            loading : false 
                  
            }) 
            if(res.status)
              {
                var role_id = localStorage.getItem("role_id")
                let isadmin =permittedusers(res.data,role_id)
               this.setState({
                   is_admin:isadmin
               })
              }            
        
        })
        .catch((error) => { 
          this.setState({
            loading : false
          })
          });   
     }
   
      
      fetcherrortype() {
        this.setState({
            loading : true
          })
        errortypeService.fetcherrortype()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var rolelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   }); 
                   var errortype_list = filterstatus.map(function(cusmaidid) {
                    return  {text : cusmaidid.name ,value : cusmaidid.id};
                 });  
                    this.setState({
                    errortypedata :  rolelist,
                    errortype_data:errortype_list,
                    loading:false
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  
     fetchremarks() {
        this.setState({loading:true})
        remarksService.fetchremarks()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var rolelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   });  
                   var remark_list = filterstatus.map(function(cusmaidid) {
                    return  {text : cusmaidid.name ,value : cusmaidid.id};
                 });  
                    this.setState({
                    remarksdata :  rolelist,
                    reamarks_data:remark_list
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  
     fetchamttype() {
        this.setState({loading:true})
        amttypeService.fetchamttype()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var amendmentlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   }); 
                var amendment_list = filterstatus.map(function(cusmaidid) {
                    return  {text : cusmaidid.name ,value : cusmaidid.id};
                 });  
                    this.setState({
                    amendmenttypedata :  amendmentlist,
                    amendmenttype_data :  amendment_list,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  
     fetcherroruserid() {
        this.setState({loading:true})
        userService.fetchpermission_user('Exports')
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.is_active === 1)
                 var erroruseridlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.username ,value : cusmaidid.username};
                   });  
                var erroruserid_list = filterstatus.map(function(cusmaidid) {
                    return  {text : cusmaidid.username ,value : cusmaidid.username};
                 });  
                    this.setState({
                    erroruseriddata :  erroruseridlist,
                    erroruserid_data :  erroruserid_list,
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
        teamService.fetchteams()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var teamlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.team_name ,value : cusmaidid.id.toString(),region_id:cusmaidid.region_id,country_code : cusmaidid.country_code};
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
     fetchregion() {
        this.setState({loading:true})
        regionexportService.fetchregion()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var regionlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.region_name ,value : cusmaidid.id.toString()};
                   });  
                   var region_list = filterstatus.map(function(cusmaidid) {
                    return  {text : cusmaidid.region_name ,value : cusmaidid.id};
                 });  
                    this.setState({
                    regiondata :  regionlist,
                    region_data :  region_list,
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  
     fetchIndividualcorrectionsheet() {
        const {mtd_number,received_time} = this.state 
        if(mtd_number !== ""&& received_time!=="")
        {
            const received_times = moment(convertUTCToLocalDate(received_time)).format('MM/DD/YYYY hh:mm:ss a')

            this.setState({
                loading : true
            })
            CorrectionsheetService.fetchIndividualcorrectionsheet(mtd_number,received_times)
            .then((res) => {
               
                this.setState({
                    loading:false})
                this.clearvalue()
            if(res.status)   { 
                this.setValue(res.data)
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
          createNotification('Please Enter Mtd Number and DC/SR Received Time','error','filled')
        }
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
     fetchteamsite() {
        this.setState({
            loading : true
          })
          teamsiteService.fetchteamsite()
        .then((res) => {
            this.setState({loading:false})
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)  
                    this.setState({
                        teamsite_data :  filterstatus,
                    })
                 }
                
                 })
                 .catch((error) => { 
                    this.setState({
                        loading : false
                      })
                 }); 
     }  
     fetchregionname() {  
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
   

     getmtdcount(mtd_number) {  
        this.setState({
          loading : true
        })
        CorrectionsheetService.fetchmtdcount(mtd_number)
          .then((res) => { 
            this.setState({   
          loading : false 
                  
            }) 
            if(res.status)
              {
                  this.setState({
                    total_correction : res.data.toString(),
                  })
                
              }   
        })
        .catch((error) => { 
          this.setState({
            loading : false
          })
          });   
     }


     validTime(timess,title){
        var timevalue = '', isfill=true;
        if(timess && timess !== null && timess !== '')
        {
            // console.log("kjgkjgkj " ,timess)
            var isvalid = moment(timess, ["h:mm:ss A"]).format("HH:mm:ss");
            // console.log("kjgkjgkj " ,isvalid)
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
                    // console.log("date is not valid")
                } 
                else 
                {
                    date_value = end_date
                    // console.log("date is valid")
                    isfill = true
                }
              } else 
              {
                //  console.log("not a date")
              }

         }
         if(isfill === false)
         {
            createNotification(`Please Enter ${title} (MM/DD/YYYY)`,'error','filled') 
         }
 
         return date_value

     }
     setValue(record)
     {
         
         if(record !== null && record)
         {
            this.setState({
                user_id:record.user_id,
                dcsrstart_time:record.dcsrstart_time,
                complete_time:record.complete_time,
                tat_time:record.tat_time,
                error_type:record.error_type,
                remarks:record.remarks,
                amendment_type:record.amendment_type,
                error_userid:record.error_userid,
                salled_date:record.salled_date !== ""  ? this.validDate(record.salled_date,'FCL Cut off/ Sailed Date') : '',
                beforeafter_etd:record.beforeafter_etd,
                mtd_number:record.mtd_number,
                shipment_no:record.shipment_no,
                customer_code:record.customer_code,
                issuer_code:record.issuer_code,
                pod:record.pod,
                pol:record.pol, 
                team:record.team, 
                region:record.region,
                received_time:record.received_time !== null && this.validDate(record.received_time) ?convertLocalToUTCDate(record.received_time) : '',
                dp_voyage:record.dp_voyage,
                receiver_org:record.receiver_org,
                shipper_code:record.shipper_code,
                mr_code:record.mr_code,
                etd_date:this.validDate(record.etd_date,'ETD Date'),
                doc_print:record.doc_print,
                doc_cutoff:this.validDate(record.doc_cutoff,'Doc Cut off'),
                total_correction:record.total_correction,
                type:record.type,
                charge:record.charge !== null ? record.charge : [] ,
                request_type:record.request_type,
                exception:record.exception,
                trade:record.trade,
                chargeiomaf:record.maf,
                maf_remarks:record.maf_remarks,
                read:record.read,
                draft:record.draft,
                sdc:record.sdc,
                free_time:record.free_time,
                credit:record.credit,
                consignee:record.consignee,
                is_search:true
             })
            
         }
         setTimeout(() =>{
            this.searchTeamSite()
     }, 500);
     } 
     clearvalue()
     {
       
         this.setState({
            dcsrstart_time:new Date(),
            complete_time:'',
            amendment_type: '',
            error_type:'',
            remarks:'',
            salled_date: '',
            error_userid:'',
            customtypedata:[],
            user_id:'',
            mtd_number:'',
            isuuer:'',
            mr_code:'',
            doc_cutoff:'',
            type:'',
            charge:[],
            date:'',
            time:'',
            bl:'',
            etd:'',
            tat_time:'',
            exception:'',
            trade:'',
            shipment_type:'',
            mtd_type:'',
            hbl:'',
            chargeiomaf:'',
            maf_remarks:'',
            region:'',
            shipment_no:'',
            customer_code:'',
            issuer_code:'',
            pod:'',
            pol:'',
            team:'',
            received_time:'',
            beforeafter_etd:'',
            receiver_org:'',
            shipper_code:'',
            etd_date:'',
            doc_print:'',
            total_correction:'',
            request_type:'',
            copy_tpf_details:'',
            dp_voyage:'',
            consignee:'',
            read:false,
            draft:false,
            sdc:false,
            free_time:false,
            credit:false,
            is_search:false,
            is_submit:false,
            updated_start_time:new Date(),
            start_time:new Date(),
            origin_requirements : [],
            country_requirements : [],
            customer_requirements : [],
            selectedRemarks:[],
            multiple_amendments:''
         })
     } 
     async onPasteD1040() {
        clipboard.readText().then((text)=>{
            var record = getValue_D1040(text)
        // console.log("kjbkj " , JSON.stringify(record))
        this.setState({
            shipment_no:record.shipment_no,
            mtd_number:record.mtd_number,
            issuer:record.issuer,         
            pod:record.last_pod,
            customer_code:record.customer,
            pol:record.main_pol,
            dp_voyage:record.main_voyage,
            etd_date:this.validDate(record.etd,'ETD'),
            doc_cutoff:this.validDate(record.doc_cutoff,'Doc Cut-Off'),
            })
            var date = this.validDate(record.date,'Date'),
            time = this.validTime(record.time,'DC/SR Received Time')
            if(date !== '' && time !== '')
            {
                var date_time = moment(date).format('MM/DD/YYYY') + ' ' + time
                this.setState({
                    received_time:convertLocalToUTCDate(date_time),
                })
            }
            var etddate = record.etd
            const {dcsrstart_time} = this.state
            var dcstartdate = moment(convertUTCToLocalDate(dcsrstart_time)).format('MM/DD/YYYY')

        //    console.log(dcstartdate,etddate, 'datessssssssssssss')
            if(dcstartdate < etddate){
                this.setState({
                    beforeafter_etd: "After"
                })
            }else{
                this.setState({
                    beforeafter_etd: "Before"
                })
            }

            if(record.issuer !== "")
            {
                this.getteamvalue(record.issuer)
            }
            if(record.mtd_number !==""){
                this.getmtdcount(record.mtd_number)
            }
            createNotification('Please Wait to load Requirement','success','filled')
            setTimeout(() =>{
                this.searchTeamSite()
        }, 500);
        });
        this.setState({
            isDataPasted: true
        }); 
    } 

    async onPasteS8100() {
        clipboard.readText().then((text)=>{
        var record = getValue_S8100(text)
        // console.log("kjbkj " , JSON.stringify(record))
        this.setState({
            shipper_code:record.shipper_coder,
            mr_code:record.mr_code,
            consignee:record.consignee
            })
            createNotification('Please Wait to load Requirement','success','filled')
            setTimeout(() =>{
                this.searchTeamSite()
            }, 500);
          
        });
        
    }
    searchTeamSite()
     {
         const {team,issuer_code,shipper_code,mr_code,consignee,customer_code,teamdata,teamsite_data,pod} = this.state
         var country_code = ''
         if(pod.trim() !== ''&& pod !== null)
         {
            country_code = pod.substring(0, 2)
         }
            //  console.log("lbkjbkj teams = " , teams)
            //  console.log("lbkjbkj country_code = " , country_code)
            //  console.log("lbkjbkj issuer = " , issuer_code)
            //  console.log("lbkjbkj shipper_coder = " , shipper_code)
            //  console.log("lbkjbkj mr_code = " , mr_code)
            //  console.log("lbkjbkj consignee = " , consignee)
            //  console.log("lbkjbkj customer = " , customer_code)
         if(country_code !== '' && issuer_code !== '')
         {
            var teams = getValue(teamdata,'value','label',team)
            this.setState({
                loading : true,
            })
            var customer_title = getValue(teamsite_data,'team','customer',team),
           origin_title = getValue(teamsite_data,'team','origin',team),
           country_title = getValue(teamsite_data,'team','country',team)
            reportService.fetchTeamSiteapi(teams,issuer_code,shipper_code,mr_code,consignee,country_code,
                customer_code,customer_title,origin_title,country_title)
            .then((res) => {
               
                this.setState({loading:false})
                    if(res)  
                     { 
                         if(res.orgi)
                         {
                             this.setState({
                                origin_requirements :res.orgi
                             })
                         }
                         if(res.cou)
                         {
                             this.setState({
                                country_requirements :res.cou
                             })
                         }
                         if(res.cus)
                         {
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
                         }
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
            createNotification(`Please Enter Mandatory Field`,'error','filled')   
         }

     }
    getteamvalue(value)
     {
        this.setState({
            issuer_code : value})
        const {teamdata} =this.state
        var team = getValue(this.state.issuecode_data,'issure_code','team',value)
        if (team !==''){
            this.setState({
                team:team,
                region:getValue(teamdata,'value','region_id',team.toString()),
                
            })
            }
       
     }
    handlechangeerrortype = (selectedOptions) => {
        this.setState({error_type : selectedOptions.value})  
    } 
    // handlechangeremarks = (selectedOptions) => {
    //     this.setState({remarks : selectedOptions.value})  
    // } 
    handleChangeRemarks(option) {
        // Store selected items as an array in `selectedRemarks`
        this.setState({ 
          selectedRemarks: option,
          remarks: option.map(item => item.value).join(","), // Convert to comma-separated string
        }, () => {
          // Validation: if multiple_amendments is "Yes", ensure at least 2 options are selected
          if (this.state.multiple_amendments === 'Yes' && option.length < 2) {
            this.setState({ validationMessage: "Please select at least two options for remarks." });
          } else {
            this.setState({ validationMessage: '' });
          }
        });
      }

handleChangeMultipleAmendments(value) {
    this.setState({ multiple_amendments: value }, () => {
        if (value === 'Yes' && this.state.remarks.length < 2) {
            // Show validation message if "Yes" is selected and less than 2 options are selected in remarks
            this.setState({ validationMessage: "Please select at least two options." });
        } else {
            // Clear validation message if "No" is selected or if there are 2 or more options selected in remarks
            this.setState({ validationMessage: '' });
        }
    });
}

    handleamendmenttype = (selectedOptions) => {
        this.setState({amendment_type : selectedOptions.value})  
    } 
    handleerroruseriddata = (selectedOptions) => {
        this.setState({error_userid : selectedOptions.value})  
    } 
    handlechangereagion = (selectedOptions) => {
        this.setState({region : selectedOptions.value})  
    } 
    handlechangeteam = (selectedOptions) => {
        this.setState({team : selectedOptions.value})  
    } 
    handlechargemafdata = (selectedOptions) => {
        this.setState({maf_remarks : selectedOptions.value})  
    } 
    onChangechargeiomaf(value)
    {
        this.setState({chargeiomaf:value})
    }
      onChangeRadio(value)
    {
        this.setState({exception:value})
    }
    onChangedocprinted(value){
        this.setState({doc_print:value})

    }
    onChangetype (value)
    {
        this.setState({type:value})
    }
    onchangecharge(value)
    {
        
        var charge_value = [...this.state.charge]
        if(charge_value.includes(value))
        {
            charge_value = charge_value.filter(e => e !== value); 
        }
        else
        {
            charge_value.push(value)            
        }
        this.setState({charge:charge_value})
    }
    onChangeRadioETD(value)
    {
        this.setState({beforeafter_etd:value})
    }
    onChangerequesttype(value)
    {
        this.setState({request_type:value})
    }
    onChangemultipleamendments(value)
    {
        alert(value)
        this.setState({multiple_amendments:value})
    }
   
    onChangetrade(value)
    {
        this.setState({trade:value})
    }
    onChangedoc(value)
    {
        this.setState({doc_cutoff:value})
    }
    onChangeetd(value){
        this.setState({etd_date:value})
    }
  
    onChangeFileUpload(files)
    {

    }
    onChangetime(date)
    {
      this.setState({salled_date  : date})
    }
  
    setCollapse() 
    {
     
      this.setState({
          collapse:!this.state.collapse
      })
    }

    getDate(date)
    {
       var date_value = '',isfill = false
        if(date && date !== null && date !== '')
        {
           
           var end_date =  new Date(date)
           if (Object.prototype.toString.call(end_date) === "[object Date]") {
               if (isNaN(end_date.getTime())) 
               { 
                //    console.log("date is not valid")
               } 
               else 
               {
                   date_value = end_date
                //    console.log("date is valid")
                   isfill = true
               }
             } else 
             {
                // console.log("not a date")
             }

        }
        if(isfill === false)
        {
           createNotification('Please Enter Date (MM/DD/YYYY)','error','filled') 
        }

        return date_value

    }
    onSubmit() { 
        const {dcsrstart_time,error_type,remarks,amendment_type,error_userid,salled_date,beforeafter_etd,
            mtd_number,shipment_no,customer_code,issuer_code,pod, pol, team, region,received_time,
            copy_tpf_details,dp_voyage,receiver_org,shipper_code,mr_code,etd_date,doc_print,doc_cutoff,
            total_correction,type,charge,request_type,exception,trade,chargeiomaf,maf_remarks,read,
            draft,sdc,free_time,credit,is_admin,updated_start_time,start_time,consignee,multiple_amendments} = this.state;
      
            var is_fill = false
            if(is_admin === true)
            {
                if(amendment_type!=='' && remarks!=='' &&
                mtd_number!=='' &&shipment_no!=='' &&customer_code!=='' &&issuer_code!=='' &&pod!=='' && pol!=='' && received_time!=='' 
                 &&dp_voyage!==''  &&shipper_code!=='' &&mr_code!=='' &&etd_date!=='' &&doc_print!=='' &&doc_cutoff!==''&& region !==''&&team!=='' 
                && total_correction!=='' &&type!==''  &&request_type!=='' &&exception!=='' && read === true 
              )
                {
                    is_fill = true
                }
            }
            else
            {
                if( amendment_type!==''&& remarks!=='' &&doc_print!=='' &&
                type!==''  &&request_type!=='' &&exception!=='' && read === true && shipper_code !== '' && mr_code !== '')
                {
                    is_fill = true
                }
            }
             if (multiple_amendments === 'Yes' && (!remarks || remarks.length < 2)) {
        this.setState({
            is_submit: true,
            validationMessage: "Please select at least two options in 'Remarks' when 'Multiple Amendments' is set to Yes."
        });
            createNotification("At least two 'Remarks' options must be selected when 'Multiple Amendments' is set to Yes.", 'error', 'filled');

        return; // Stop the submission if validation fails
    }
            if(is_fill === true)
            {    
                
                // if(dcsrstart_time < complete_time) 
                // {
                    var salled_dates = (salled_date !== '' && salled_date !== null) ? moment(salled_date).format('MM/DD/YYYY') : ''
               var doc_cutoffs=  moment(doc_cutoff).format('MM/DD/YYYY')
                var etd_dates=  moment(etd_date).format('MM/DD/YYYY')
                var received_times = moment(convertUTCToLocalDate(received_time)).format('MM/DD/YYYY hh:mm:ss a')
                var end_time = new Date(),updated_end_time = new Date(), complete_time = new Date()
                var tat_time = getTimeDifference(dcsrstart_time,complete_time)
               
                const {username} = this.props
             
                this.setState({
                    loading : true,
                  })
                 
                  CorrectionsheetService.createcorrection(username,dcsrstart_time, complete_time,tat_time,error_type,remarks,amendment_type,error_userid,salled_dates,beforeafter_etd,
                   mtd_number,shipment_no,customer_code,issuer_code,pod, pol, team, region,received_times,
                    copy_tpf_details,dp_voyage,receiver_org,shipper_code,mr_code,etd_dates,doc_print,doc_cutoffs,
                    total_correction,type,charge,request_type,exception,consignee,trade,chargeiomaf,maf_remarks,read,draft,sdc,free_time,credit,
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
                          createNotification('Success','success','filled')
                          this.clearvalue()
                          this.fetchCorrectionCount()
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
                // }
                // else
                // {
                //     createNotification('Please fill start time less than completed time','error','filled')
                // }
             }
            else
            {
                this.setState({
                    is_submit:true,
                })
              createNotification('Please fill mandatory field','error','filled')
            }
         
      }
renderTemplate()
 {
   const {languageData,locale} = this.props
   const {data} = this.state
   var array = data.map(record=> {
          return {
    'user_id':record.user_id,
                'dcsrstart_time':record.dcsrstart_time,
                'complete_time':record.complete_time,
                'tat_time':record.tat_time,
                'error_type':getValue(this.state.errortype_data,'value','text',parseInt(record.error_type)),
                'remarks':getValue(this.state.reamarks_data,'value','text',parseInt(record.remarks)),
                'amendment_type':getValue(this.state.amendmenttype_data,'value','text',parseInt(record.amendment_type)),
                'error_userid':getValue(this.state.erroruserid_data,'value','text',parseInt(record.error_userid)),
                'salled_date':record.salled_date,
                'beforeafter_etd':record.beforeafter_etd,
                'mtd_number':record.mtd_number,
                'shipment_no':record.shipment_no,
                'customer_code':record.customer_code,
                'issuer_code':record.issuer_code,
                'pod':record.pod,
                'pol':record.pol, 
                'team':getValue(this.state.teamdata,'value','label',record.team), 
                'region':getValue(this.state.region_data,'value','text',parseInt(record.region)),
                'received_time':record.received_time,
                // 'copy_tpf_details':record.copy_tpf_details,
                'dp_voyage':record.dp_voyage,
                'receiver_org':record.receiver_org,
                'shipper_code':record.shipper_code,
                'mr_code':record.mr_code,
                'etd_date':record.etd_date,
                'doc_print':record.doc_print,
                'doc_cutoff':record.doc_cutoff,
                'total_correction':record.total_correction,
                'type':record.type,
                'charge':record.charge,
                'request_type':record.request_type,
                'exception':record.exception,
                'trade':record.trade,
                'chargeiomaf':record.maf,
                'maf_remarks':record.maf_remarks,
                'read':record.read,
                'draft':record.draft,
                'sdc':record.sdc,
                'free_time':record.free_time,
                'credit':record.credit
       };
      })
     return(
       
       <Workbook filename="Correction_Sheet.xlsx" element={
         <Button className = "button-width" color="secondary"  style={{width:'150px'}}
         >{ onChangeLanguage(locale,'Download',languageData)}  
         </Button>
         }>
         <Workbook.Sheet data={array} name="Sheet A">
         <Workbook.Column label="User ID" value="user_id" />
         <Workbook.Column label="DC/SR Start Time" value="dcsrstart_time" />
            <Workbook.Column label="DC/SR Complete Time" value="complete_time" />
            <Workbook.Column label="TAT Time" value="tat_time" />
            <Workbook.Column label="Error Type" value="error_type" />
            <Workbook.Column label="Remarks" value="remarks" />
            <Workbook.Column label="Amendment Type" value="amendment_type" />
            <Workbook.Column label="Error User ID" value="error_userid" />
            <Workbook.Column label="FCL Cut off/ Sailed Date" value="salled_date" />
            <Workbook.Column label="ETD" value="beforeafter_etd" />
            <Workbook.Column label="MTD Number" value="mtd_number" />
            <Workbook.Column label="Shipment Number" value="shipment_no" />
            <Workbook.Column label="Customer Code" value="customer_code" />
            <Workbook.Column label="Issuer Code" value="issuer_code" />
            <Workbook.Column label="POD" value="pod" />
            <Workbook.Column label="POL" value="pol" /> 
            <Workbook.Column label="Team" value="team" /> 
            <Workbook.Column label="Region" value="region" />
            <Workbook.Column label="DC/SR Received Time" value="received_time" />
            {/* <Workbook.Column label="Copy TPF Details" value="copy_tpf_details" /> */}
            <Workbook.Column label="DP Voyage" value="dp_voyage" />
            {/* <Workbook.Column label="Receiver Organization" value="receiver_org" /> */}
            <Workbook.Column label="Shipper Code" value="shipper_code" />
            <Workbook.Column label="MR Code" value="mr_code" />
            <Workbook.Column label="ETD" value="etd_date" />
            <Workbook.Column label="Document Printed" value="doc_print" />
            <Workbook.Column label="Doc Cut off" value="doc_cutoff" />
            <Workbook.Column label="Total Number of Correction" value="total_correction" />
            <Workbook.Column label="Type" value="type" />
            <Workbook.Column label="Request Type" value="request_type" />
            <Workbook.Column label="Exception" value="exception" />
            <Workbook.Column label="Trade" value="trade" />
            {/* <Workbook.Column label="Charge I/O MAF" value="chargeiomaf" /> */}
            <Workbook.Column label="Charge I/O MAF Remark" value="maf_remarks" />
            <Workbook.Column label="I have read and processed the shipment as per the above requirements" value="read" />
            <Workbook.Column label="Draft Sent" value="draft" />
            <Workbook.Column label="SDC Y" value="sdc" />
            <Workbook.Column label="Free Time Checked" value="free_time" />
            <Workbook.Column label="Credit Check" value="credit" />
         </Workbook.Sheet> 
       </Workbook>
    

     );
 }
 onChangecompletetime = (time) => {
	const {dcsrstart_time}=this.state
   
	if(dcsrstart_time!==''){
        let startdate = moment(dcsrstart_time, "HH:mm"),
        enddate =  moment(time, "HH:mm") ,
        time_taken=getstarttimeendtimeDifferencebew(moment.duration(enddate.diff(startdate)))
        this.setState({
                complete_time:time,
                tat_time: time_taken 
            })
    }
    else{
        createNotification('Please Ender the DC/SR Start Time','error','filled')
    }
	
} 
handleKeypress (e) {
    const characterCode = e.key
    if (characterCode === 'Backspace') return

    const characterNumber = Number(characterCode)
    if (characterNumber >= 0 && characterNumber <= 9) {
      if (e.currentTarget.value && e.currentTarget.value.length) {
        return
      } else if (characterNumber === 0) {
        e.preventDefault()
      }
    } else {
      e.preventDefault()
    }
  }
  
    render()
    {
        const{loading,etd,consignee,collapse,dcsrstart_time,complete_time,tat_time,
            error_type,remarks,amendment_type,error_userid,salled_date,beforeafter_etd,mtd_number,shipment_no,isDataPasted,
            customer_code,issuer_code,pod, pol, team, region,received_time,dp_voyage,correctioncount,correctioncountlast,
           shipper_code,mr_code,etd_date,doc_print,doc_cutoff,total_correction,type,charge,
            request_type,exception,trade,maf_remarks,read,draft,sdc,free_time,credit,multiple_amendments,validationMessage,
            errortypedata,remarksdata,amendmenttypedata,erroruseriddata,teamdata,regiondata,selectedRemarks,
            is_submit,origin_requirements,country_requirements,customer_requirements,user_id,is_search}=this.state
        const {match,languageData,locale,username} = this.props
  
        return (
            <>
             <title>{onChangeLanguage(locale,'Correction Sheet',languageData)}</title>
             {loading && 
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
            <Row>
              <Colxx xxs="12">
                <div className = "row">
                      <div className = "col-md-8">
                      <Breadcrumb heading={onChangeLanguage(locale,'Correction Sheet',languageData)} match={match} />
                        
                    </div>
                    <div className = "col-md-2" >
                        <h2 style = {{marginTop:'15px'}}>Total EQ : {correctioncount}</h2>
                        </div>
                        <div className = "col-md-2">
                            <h2  style = {{marginTop:'15px'}}>Last EQ : {correctioncountlast}</h2>
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
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'15px'}}>
                    <div className = "row">
                    <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'User ID',languageData)}
                            <br></br> {is_search ? user_id : username}</Label>
                           
                        </div>

                       


                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'DC/SR Start Time',languageData)}
                                <br></br>
                                {moment(dcsrstart_time).format('MM/DD/YYYY hh:mm:ss a')}
                            </Label>
                           
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'DC/SR Complete Time',languageData)}
                                <br></br>
                            {complete_time !== '' && moment(complete_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                           
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'TAT Time',languageData)}
                            <br></br>{tat_time}</Label>
                           
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstylde normal-font" >
                                {onChangeLanguage(locale,'Error Type',languageData)}
                               </Label>
                            <Select  
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={errortypedata.filter(option =>option.value === error_type)}
                        options={errortypedata}
                        onChange={({value}) => this.setState({  error_type: value })}
                        // onChange={this.handlechangeerrortype}
                      />
                        </div>
   <div className = "col-md-3 ">
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Multiple Amendments',languageData)}
                        <a style = {{color :'red'}}>*</a> </Label>
                        <a className = 'fontstyle mandatory-label'>{is_submit === true && multiple_amendments === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>
                            <div style = {{margin:'10px 0px'}}>
                                <Row>
                                    <Colxx xxs="2">
                                        <CustomRadioButton checked  = "Yes" name = {onChangeLanguage(locale,'Yes',languageData)} value = {multiple_amendments} 
                                            onChangeRadio={this.handleChangeMultipleAmendments.bind(this)}/>
                                       
                                    </Colxx>
                                    <Colxx xxs="2">
                                     <CustomRadioButton checked  = "No" name = {onChangeLanguage(locale,'No',languageData)} value = {multiple_amendments} 
                                            onChangeRadio={this.handleChangeMultipleAmendments.bind(this)}/>
                                        
                                    </Colxx>  
                                </Row>
                            </div>   
                            </div>
                        {/* <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Remarks',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                        className = {is_submit === true && remarks === ''?  "error-border-select-paste":"react-select fontstyle" } 
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={remarksdata.filter(option =>option.value === remarks)}
                        options={remarksdata}
                        onChange={this.handlechangeremarks}
                      />
                        </div> */}


<div className="col-lg-3 space-margin">
      <Label className="fontstyle normal-font">
        {onChangeLanguage(locale, 'Remarks', languageData)}<a style={{ color: 'red' }}>*</a>
        <a className='fontstyle mandatory-label'>
          {is_submit === true && remarks === '' && `${onChangeLanguage(locale, 'Mandatory Field', languageData)}`}
        </a>
      </Label>
      <ReactMultiSelectCheckboxes
        className="fontstyle"
        value={selectedRemarks} // Use the array here
        onChange={(option) => this.handleChangeRemarks(option)}
        options={this.state.remarksdata.filter(item => item.label !== 'Select All')}
        getDropdownButtonLabel={({ placeholderButtonLabel, value }) => {
          if (!value || value.length === 0) {
            return 'Select..';
          } else {
            const item = value.filter(item => item.label.includes('Select All'));
            if (item.length !== 0) {
              return `${value.length - 1} selected`;
            } else {
              return `${value.length} selected`;
            }
          }
        }}
      />
      {/* Display validation message if applicable */}
      {validationMessage && <p style={{ color: 'red' }}>{validationMessage}</p>}
    </div>




                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Amendment Type',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                        className = {is_submit === true && amendment_type === ''?  "error-border-select-paste":"react-select fontstyle" } 
                        // className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={amendmenttypedata.filter(option =>option.value === amendment_type)}
                        options={amendmenttypedata}
                        onChange={this.handleamendmenttype}
                      />
                        </div>
                        
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Error User ID',languageData)}
                               </Label>
                            <Select  
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={erroruseriddata.filter(option =>option.value === error_userid)}
                        options={erroruseriddata}
                        onChange={this.handleerroruseriddata}
                      />
                        </div>

                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'FCL Cut off/ Sailed Date',languageData)}
                             </Label>
                             
                                 <DatePickerDate
                                 selected={salled_date}
                                 className = "text-background" 
                                 onChange={(date) => this.onChangetime(date)}
                                 />
                                
                        </div>


                       <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Shipment Number',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && shipment_no === ''?  "error-border-paste":"fontstyle text-background-paste" }   
                            placeholder = ''
                            value = {shipment_no}  
                            disabled={isDataPasted}
                            onChange= {(e)=>this.setState({shipment_no : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-2 space-margin">
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Customer Code',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && customer_code === ''?  "error-border-paste":"fontstyle text-background-paste" }   
                            placeholder = ''
                            value = {customer_code}  
                            disabled={isDataPasted}
                            onChange= {(e)=>this.setState({customer_code : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-1 space-margin">
                       {/* {is_admin === true && */}
                        <Button
                         style = {{marginTop:'20px'}}
                        color="primary"
                        onClick={() => this.setCollapse()}
                        className="mb-1">
                        <i className={collapse ? "simple-icon-minus" : "simple-icon-plus"}  />
                    </Button>
                    {/* } */}
                    </div>
                         </div>

                <Collapse isOpen={collapse}>
                     <div className = "row">
                   
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'MTD Number',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && mtd_number === ''?  "error-border-paste":"fontstyle text-background-paste" } 
                            placeholder = ''
                            value = {mtd_number}  
                            disabled={isDataPasted}
                            onChange= {(e)=>this.setState({mtd_number : e.target.value})} 
                            />
                        </div>
                       
                       
                        
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Issuer',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                           
                            <Input  className = {is_submit === true && issuer_code === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                            placeholder = ''
                            value = {issuer_code}  
                            disabled={isDataPasted}
                            onChange= {(e)=>this.getteamvalue(e.target.value)} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                        <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Team',languageData)} <a style = {{color :'red'}}>*</a>
                            {is_submit === true && team=== '' &&   <a className = 'fontstyle mandatory-label'> {onChangeLanguage(locale,'Mandatory Field',languageData)} </a>}
                            <br></br>{team !== "" &&  getValue(teamdata,'value','label',team)}</Label>
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Region',languageData)} <a style = {{color :'red'}}>*</a>
                                {is_submit === true && team=== '' &&   <a className = 'fontstyle mandatory-label'> {onChangeLanguage(locale,'Mandatory Field',languageData)} </a>}
                                <br></br>{region !== "" &&  getValue(regiondata,'value','label',region)}</Label>
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'POL',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && pol === ''?  "error-border-paste":"fontstyle text-background-paste" }   
                            placeholder = ''
                            value = {pol}  
                            disabled={isDataPasted}
                            onChange= {(e)=>this.setState({pol : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'POD',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && pod === ''?  "error-border-paste":"fontstyle text-background-paste" }   
                            placeholder = ''
                            value = {pod}  
                            disabled={isDataPasted}
                            onChange= {(e)=>this.setState({pod : e.target.value})} 
                            />
                        </div>
                       
                       
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'DC/SR Received Time',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                            {/* <Input  className = {is_submit === true && received_time === ''?  "error-border-paste":"fontstyle text-background-paste" }    
                            placeholder ="hh:mm:ss AM/PM" 
                            type = 'time'
                            value = {received_time}  
                            onChange= {(e)=>this.setState({received_time : e.target.value})} 
                            /> */}
                             <a className = 'fontstyle mandatory-label'>
                                {is_submit === true && received_time === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>
                                <DatePicker
                                 selected={received_time}
                                 className = "text-background-paste" 
                                 onChange={(date) => this.setState({received_time:date})}
                                 disabled={isDataPasted}
                                 />
                        </div>
                       
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'DP Voyage',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && dp_voyage === ''?  "error-border-paste":"fontstyle text-background-paste" }   
                            placeholder = ''
                            value = {dp_voyage}  
                            disabled={isDataPasted}
                            onChange= {(e)=>this.setState({dp_voyage : e.target.value})} 
                            />
                        </div>
                        
                        
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Shipper Code',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && shipper_code === ''?  "error-border-paste":"fontstyle text-background-paste" }   
                            placeholder = ''
                            value = {shipper_code}  
                            disabled={shipper_code !== ''}
                            onChange= {(e)=>this.setState({shipper_code : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'MR Code',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && mr_code === ''?  "error-border-paste":"fontstyle text-background-paste" }   
                            placeholder = ''
                            value = {mr_code}  
                            disabled={mr_code !== ''}
                            onChange= {(e)=>this.setState({mr_code : e.target.value})} 
                            />
                        </div>
                        {/* <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Receiver Organization',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && receiver_org === ''?  "error-border":"fontstyle text-background" }   
                            placeholder = ''
                            value = {receiver_org}  
                            onChange= {(e)=>this.setState({receiver_org : e.target.value})} 
                            />
                        </div> */}
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'ETD',languageData)}
                                <a style = {{color :'red'}}>*</a>
                                <a className = 'fontstyle mandatory-label'>{is_submit === true && beforeafter_etd === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>
                            </Label>
                            <div style = {{margin:'10px 0px'}}>
                                <Row>
                                    <Colxx xxs="4">
                                        <CustomRadioButton checked  = "Before" name = "Before" value = {beforeafter_etd} 
                                            onChangeRadio={this.onChangeRadioETD.bind(this)}/>
                                       
                                    </Colxx>
                                    <Colxx xxs="4">
                                     <CustomRadioButton checked  = "After" name = "After" value = {beforeafter_etd} 
                                            onChangeRadio={this.onChangeRadioETD.bind(this)}/>
                                        
                                    </Colxx>
                                </Row>
                            </div>   
                        </div>


                                <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'ETD Date',languageData)}
                              <a style = {{color :'red'}}>*</a></Label>
                               <a className = 'fontstyle mandatory-label'>
                                {is_submit === true && etd_date === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>
                                <DatePickerDate
                                 selected={etd_date}
                                 disabled={isDataPasted}
                                 className = "text-background-paste" 
                                 onChange={(date) => this.onChangeetd(date)}
                                 />
                                
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Consignee',languageData)}</Label>
                            <Input className = "text-background-paste"   
                            placeholder = ''
                            value = {consignee}
                            disabled={consignee !== ''}  
                            onChange= {(e)=>this.setState({consignee: e.target.value})} 
                            />
                        </div>

                        

                        {/* <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Doc Cut off',languageData)}
                              <a style = {{color :'red'}}>*</a></Label>
                               <a  className = {is_submit === true && doc_cutoff === ''?  "error-border":"fontstyle text-background" } 

                            >
                                {is_submit === true && doc_cutoff === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>
                              <DatePickerDate
                                 selected={doc_cutoff}
                                 className = "text-background" 
                                 onChange={(date) => this.onChangedoc(date)}
                                 />
                                
                        </div> */}

                        <div className = "col-md-3 space-margin">
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Doc Cut-Off',languageData)} <a style = {{color :'red'}}>*</a></Label>
                                    
                                      <DatePickerDate
                                        selected={doc_cutoff}
                                        className = "text-background-paste" 
                                        disabled={isDataPasted}
                                        onChange={(date) => this.setState({doc_cutoff:date})}
                                        />
                                </div>
                      
                                {/* <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Document Printed',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                             className = {is_submit === true && doc_print === ''?  "error-border":"fontstyle text-background" } 
                            placeholder = ''
                            value = {doc_print}  
                            onChange= {(e)=>this.setState({doc_print : e.target.value})} 
                            />
                        </div> */}


                      
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Total Number of Correction',languageData)}
                            <a style = {{color :'red'}}>*</a><br></br> {total_correction} </Label>
                            {/* <Input  
                             className = {is_submit === true && total_correction === ''?  "error-border":"fontstyle text-background" } 
                            placeholder = ''
                            type = "number" min="0"  step='1'
                            onKeyDown={this.handleKeypress}
                            value = {total_correction}  
                            onChange= {(e)=>this.setState({total_correction : e.target.value})} 
                            /> */}
                        </div>
                       
                    </div>
               </Collapse>
                </div>   
                
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'15px'}}>
                    <div className = "row">
                  
                    <div className = "col-md-3 radiobut">
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Type',languageData)} 
                        <a style = {{color :'red'}}>*</a></Label>
                        <a className = 'fontstyle mandatory-label'>{is_submit === true && type === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>
                            <div style = {{margin:'10px 0px'}}>
                                <Row>
                                    <Colxx xxs="3">
                                        <CustomRadioButton checked  = "Web" name = {onChangeLanguage(locale,'Web',languageData)} value = {type} 
                                            onChangeRadio={this.onChangetype.bind(this)}/>
                                    </Colxx>
                                    <Colxx xxs="3">
                                     <CustomRadioButton checked  = "Manual" name = {onChangeLanguage(locale,'Manual',languageData)} value = {type} 
                                            onChangeRadio={this.onChangetype.bind(this)}/>
                                        
                                    </Colxx>
                                    <Colxx xxs="3">
                                     <CustomRadioButton checked  = "EDI" name = {onChangeLanguage(locale,'EDI',languageData)} value = {type} 
                                            onChangeRadio={this.onChangetype.bind(this)}/>
                                        
                                    </Colxx>
                                </Row>
                            </div>   
                            </div>

                       
                            {/* <div className = "col-md-3 radiobut">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Charge I/O MAF',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <a className = 'fontstyle mandatory-label'>{is_submit === true && chargeiomaf === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>
                            <div style = {{margin:'10px 0px'}}>
                                <Row>
                                    <Colxx xxs="2">
                                        <CustomRadioButton checked  = "Yes" name = "Yes" value = {chargeiomaf} 
                                            onChangeRadio={this.onChangechargeiomaf.bind(this)}/>
                                    </Colxx>
                                    <Colxx xxs="2">
                                    
                                     <CustomRadioButton checked  = "No" name = "No" value = {chargeiomaf} 
                                            onChangeRadio={this.onChangechargeiomaf.bind(this)}/>
                                        
                                    </Colxx>
                                </Row>
                            </div>
                           
                        </div> */}
                     

                            <div className = "col-md-3 radiobut">
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Request Type',languageData)}
                        <a style = {{color :'red'}}>*</a> </Label>
                        <a className = 'fontstyle mandatory-label'>{is_submit === true && request_type === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>
                            <div style = {{margin:'10px 0 px'}}>
                                <Row>
                                    <Colxx xxs="2">
                                        <CustomRadioButton checked  = "DC" name = {onChangeLanguage(locale,'DC',languageData)} value = {request_type} 
                                            onChangeRadio={this.onChangerequesttype.bind(this)}/>
                                       
                                    </Colxx>
                                    <Colxx xxs="2">
                                     <CustomRadioButton checked  = "SR" name = {onChangeLanguage(locale,'SR',languageData)} value = {request_type} 
                                            onChangeRadio={this.onChangerequesttype.bind(this)}/>
                                        
                                    </Colxx>    
                                    <Colxx xxs="2">
                                     <CustomRadioButton checked  = "AS" name = {onChangeLanguage(locale,'AS',languageData)} value = {request_type} 
                                            onChangeRadio={this.onChangerequesttype.bind(this)}/>
                                        
                                    </Colxx>
                                </Row>
                            </div>   
                            </div>
                            <div className = "col-md-3 radiobut">
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Exception',languageData)}
                        <a style = {{color :'red'}}>*</a> </Label>
                        <a className = 'fontstyle mandatory-label'>{is_submit === true && exception === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>
                            <div style = {{margin:'10px 0px'}}>
                           
                                <Row>
                                    <Colxx xxs="2">
                                        <CustomRadioButton checked  = "Yes" name = {onChangeLanguage(locale,'Yes',languageData)} value = {exception} 
                                            onChangeRadio={this.onChangeRadio.bind(this)}/>
                                       
                                    </Colxx>
                                    <Colxx xxs="2">
                                     <CustomRadioButton checked  = "No" name = {onChangeLanguage(locale,'No',languageData)} value = {exception} 
                                            onChangeRadio={this.onChangeRadio.bind(this)}/>
                                        
                                    </Colxx>
                                </Row>
                            </div>   
                            </div>

                            <div className = "col-md-3">
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Document Printed',languageData)}
                        <a style = {{color :'red'}}>*</a> </Label>
                        <a className = 'fontstyle mandatory-label'>{is_submit === true && doc_print === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>
                            <div style = {{margin:'10px 0px'}}>
                           
                                <Row>
                                    <Colxx xxs="2">
                                        <CustomRadioButton checked  = "Yes" name = {onChangeLanguage(locale,'Yes',languageData)} value = {doc_print} 
                                            onChangeRadio={this.onChangedocprinted.bind(this)}/>
                                       
                                    </Colxx>
                                    <Colxx xxs="2">
                                     <CustomRadioButton checked  = "No" name = {onChangeLanguage(locale,'No',languageData)} value = {doc_print} 
                                            onChangeRadio={this.onChangedocprinted.bind(this)}/>
                                        
                                    </Colxx>
                                </Row>
                            </div>   
                            </div>


                        </div>
                        </div>
                
                        <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'15px'}}>
                    <div className = "row">
                  
                          
                    <div className = "col-md-3 radiobut ">
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Trade',languageData)} 
                        </Label>
                            <div style = {{margin:'10px 0px'}}>
                                <Row>
                                    <Colxx xxs="3">
                                        <CustomRadioButton checked  = "AMS" name ={onChangeLanguage(locale,'AMS',languageData)} value = {trade} 
                                            onChangeRadio={this.onChangetrade.bind(this)}/>
                                    </Colxx>
                                    <Colxx xxs="2">
                                     <CustomRadioButton checked  = "EU" name = {onChangeLanguage(locale,'EU',languageData)} value = {trade} 
                                            onChangeRadio={this.onChangetrade.bind(this)}/>
                                       
                                    </Colxx>
                                    <Colxx xxs="2">
                                     <CustomRadioButton checked  = "ASIA" name = {onChangeLanguage(locale,'ASIA',languageData)} value = {trade} 
                                            onChangeRadio={this.onChangetrade.bind(this)}/>
                                        
                                    </Colxx>
                                </Row>
                            </div>   
                            </div>
                        
                            <div className = "col-md-4 ">
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Charge',languageData)}
                         </Label>
                            <div  style = {{}}>
                                <Row>
                                <a style = {{padding:'7px 5px',fontSize:'13px'}}>
                                            <Checkbox color="blue" style = {{marginRight:'6px'}} 
                                            checked = {charge.includes('MAF')}
                                            onChange={()=>this.onchangecharge('MAF')}
                                            /> 
                                            {onChangeLanguage(locale,'MAF',languageData)}  
                                    </a> 
                                    <a style = {{padding:'7px 5px',fontSize:'13px'}}>
                                         <Checkbox color="blue" style = {{marginRight:'6px'}} checked = {charge.includes('SAC')}
                                         onChange={()=>this.onchangecharge('SAC')}
                                            /> 
                                            {onChangeLanguage(locale,'SMC',languageData)}   
                                    </a> 
                                  
                                </Row>
                                
                            </div>   
                            </div>
                           
                        </div>
                        </div>
                

                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'15px'}}>
                    <Row>
                            <Colxx xxs="7" style = {{marginTop:'10px'}}>
                                <Label  className = "fontstyle" 
                                style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'Special Requirement',languageData)} </Label> : 
                                <Label  className = "fontstyle" style = {{fontSize:'14px',color:''}}> *For {issuer_code} Based Requirements</Label>
                            </Colxx>
                            <Colxx xxs="1"></Colxx>
                            <Colxx xxs="2">
                            <Button className = "button-width" color="secondary"  
                                onClick={()=>this.onPasteS8100()}
                                >
                                {onChangeLanguage(locale,'Paste From  S8100',languageData)}
                            </Button>
                            </Colxx>
                            <Colxx xxs="2">
                            <Button className = "button-width" color="primary"  
                            onClick={()=>this.searchTeamSite()}
                                // onClick={()=>this.fetchIndividualcorrectionsheet()}
                                >
                                {onChangeLanguage(locale,'Search',languageData)} <i className="simple-icon-magnifier" style = {{fontSize:'15px',marginLeft:'45px'}} />
                            </Button>
                               
                            </Colxx>
                        </Row>
                </div> 
                {issuer_code !== '' &&

                    <div className="row" style={{ marginBottom: '7px' }}>
                        {origin_requirements && origin_requirements.length > 0 &&
                            <div className="col-md-6">
                                <div className="publishuser-card-component" style={{ borderRadius: '10px' }}>
                                    <div className="publish-title" >
                                        <Row>
                                            <Colxx xxs="12">
                                                <Label className="fontstyle"
                                                    style={{ fontWeight: 700, fontSize: '15px' }}>{onChangeLanguage(locale, 'Origin Requirements - (Source - ', languageData) + getValue(teamdata, 'value', 'label', team)+ ')'}</Label>

                                            </Colxx>
                                        </Row>

                                    </div>
                                    <table>
                                        <thead className="thead-height publish-title1">
                                            <tr>
                                                <td style={{ padding: '2px 10px',width: '20%' }}>
                                                    {onChangeLanguage(locale, 'Item', languageData)}
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
                                                            <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }}>{value.Items}</Label>
                                                        </div></td>
                                                    <td>  <div className="" style={{ backgroundColor: '#F5F6F8', padding: '2px', margin: '10px', width: '96%' }}>
                                                        <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }} >
                                                            {value.Requirements}
                                                        </Label>
                                                    </div></td>
                                                </tr>
                                            )}

                                        </tbody>
                                    </table>


                                </div>
                            </div>
                        }
                        {country_requirements && country_requirements.length > 0 &&
                            <div className="col-md-6">
                                <div className="publishuser-card-component" style={{ borderRadius: '10px' }}>
                                    <div className="publish-title" >
                                        <Row>
                                            <Colxx xxs="12">
                                                <Label className="fontstyle"
                                                    style={{ fontWeight: 700, fontSize: '15px' }}>{onChangeLanguage(locale, 'Country Requirements - (Source - ', languageData) + getCountryName(pod, '', '', teamdata) + ')'}</Label>

                                            </Colxx>
                                        </Row>

                                    </div>
                                    <table>
                                        <thead className="thead-height publish-title1">
                                            <tr>
                                                <td style={{ padding: '2px 10px',width: '20%' }}>
                                                    {onChangeLanguage(locale, 'Item', languageData)}
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
                                                            <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }}>{value.Items}</Label>
                                                        </div></td>
                                                    <td>  <div className="" style={{ backgroundColor: '#F5F6F8', padding: '2px', margin: '10px', width: '96%' }}>
                                                        <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }} >
                                                            {value.Requirements}
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
                                                    style={{ fontWeight: 700, fontSize: '15px' }}>{onChangeLanguage(locale, 'Customer Requirements - (Source - ', languageData) + getValue(teamdata, 'value', 'label', team) + ')'}</Label>

                                            </Colxx>
                                        </Row>

                                    </div>
                                    <table>
                                        <thead className="thead-height publish-title1">
                                            <tr>
                                                <td style={{ padding: '2px 10px',width: '10%' }}>
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
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody className="tbody-height">
                                        {customer_requirements.map((value, index) =>
                                                <tr>
                                                    <td style={{width: '10%' }}>
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
                                                                {value.Requirements}
                                                            </Label>
                                                        </div>
                                                    </td>
                                                    <td style={{width: '10%' }}>
                                                        {(value.Destination !== null && value.Destination !== '') && 
                                                        <div className="" style={{ backgroundColor: 'rgb(239 100 50/20%)', padding: '2px', margin: '10px' }}>
                                                            <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }}>{value.Destination}</Label>
                                                        </div>}
                                                    </td>
                                                </tr>
                                            )}

                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        }


                    </div>
                    }
            
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'15px'}}>
                    <div className = "row">
                   
                           <div className = "col-md-12 space-margin">
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Charge I/O MAF Remark',languageData)}
                              </Label>
                            <textarea 
                             className = "fontstyle textarea-background"
                                placeholder = ''
                                value = {maf_remarks}  
                                onChange= {(e)=>this.setState({maf_remarks : e.target.value})} 
                            />
                        </div>
                       

                       
                        
                    </div>
                </div>   
               
            
                <ul className = "ul-list-style ultext-center" style = {{marginBottom:'15px'}}>
                <a style = {{color :'red'}}>*</a> 
                        
                        <li style = {{margin:'0px 5px'}}>
                            <a className = {is_submit === true && read === false?  "error-border":"fontstyle text-background" } style = {{ padding:'7px 5px',fontSize:'12px',width:'100%'}}>
                                <Checkbox color="blue" style = {{marginRight:'6px'}} checked = {read} onChange = {(e)=>this.setState({read: e.target.checked})}> 
                                <a style = {{marginLeft:'2px'}}>
                                
                                {onChangeLanguage(locale,'I have read and processed the shipment as per the above requirements',languageData)}</a>
                                </Checkbox>
                            </a>
                        </li>
                        <li style = {{margin:'0px 5px'}}>
                            <a className='fontstyle text-background' style = {{ padding:'7px 5px',fontSize:'12px',width:'100%'}}>
                             <Checkbox color="blue" style = {{marginRight:'6px'}} checked = {draft} onChange = {(e)=>this.setState({draft: e.target.checked})}> 
                            <a style = {{marginLeft:'2px'}}>{onChangeLanguage(locale,'Draft Sent',languageData)}</a>
                            </Checkbox>
                        </a></li>
                        <li style = {{margin:'0px 5px'}}> 
                            <a className='fontstyle text-background' style = {{ padding:'7px 5px',fontSize:'12px',width:'100%'}}>
                            <Checkbox color="blue" style = {{marginRight:'6px'}} checked = {sdc } onChange = {(e)=>this.setState({sdc: e.target.checked})}> 
                            <a style = {{marginLeft:'2px'}}>{onChangeLanguage(locale,'SDC Y',languageData)}</a>
                            </Checkbox>
                        </a></li>
                        <li style = {{margin:'0px 5px'}}>
                        <a className='fontstyle text-background' style = {{ padding:'7px 5px',fontSize:'12px',width:'100%'}}>
                            <Checkbox color="blue" style = {{marginRight:'6px'}} checked = {free_time } onChange = {(e)=>this.setState({free_time: e.target.checked})}> 
                            <a style = {{marginLeft:'2px'}}>{onChangeLanguage(locale,'Free Time Checked',languageData)}</a>
                            </Checkbox>
                        </a>
                        </li>
                        <li style = {{margin:'0px 5px'}}>
                        <a className='fontstyle text-background' style = {{ padding:'7px 5px',fontSize:'12px',width:'100%'}}>
                            <Checkbox color="blue" style = {{marginRight:'6px'}} checked = {credit } onChange = {(e)=>this.setState({credit: e.target.checked})}> 
                            <a style = {{marginLeft:'2px'}}>{onChangeLanguage(locale,'Credit Check',languageData)}</a>
                            </Checkbox>
                        </a>
                        </li>
                </ul> 
                
                <div className = "row text-center" style = {{margin:'0px 5px'}}> 
                        <Button className = "button-width" color="secondary"  
                                onClick={()=>this.onPasteD1040()}
                                >
                               {onChangeLanguage(locale,'Paste From D1040',languageData)}
                            </Button>
                            <Button className = "button-width" color="primary"  
                                onClick={()=>this.fetchIndividualcorrectionsheet()}
                                >
                               {onChangeLanguage(locale,'Find',languageData)}
                            </Button>
                       <Button className = "button-width" color="primary"  
                                onClick={()=>this.onSubmit()}
                                >
                               {onChangeLanguage(locale,'Save',languageData)}
                            </Button>
                                     
                       <Button className = "button-width" color="secondary"  
                            onClick={()=>this.clearvalue()}
                    >{onChangeLanguage(locale,'Refresh',languageData)}</Button>     
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

   })(Sidebar)
  );

