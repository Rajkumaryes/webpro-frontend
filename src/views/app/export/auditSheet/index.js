import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button,Collapse} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { Checkbox } from 'antd';
import Select from 'react-select';
import moment from 'moment';
import CustomRadioButton from '../../../RadioButton'
import{issuecodeService} from '../../../../redux/Export/masters/issuercode/saga';
import{audittypeService} from '../../../../redux/Export/masters/audittype/saga';
import { createNotification } from '../../../../toast';
import{AuditService} from '../../../../redux/Export/auditsheet/saga'
import{reportService} from '../../../../redux/Export/report/saga'
import{userService} from '../../../../redux/users/saga'
import {onChangeLanguage,getTimeDifference,permittedusers,getValue,convertLocalToUTCDate,getCountryName} from '../../../../helper'
import Loading from "react-fullscreen-loading";
import{teamService} from '../../../../redux/Export/masters/exportteam/saga'
import{errortypeService} from '../../../../redux/Export/masters/errortype/saga'
import{roleService} from '../../../../redux/role/saga'
import{teamsiteService} from '../../../../redux/Export/masters/teamsite/saga';
import{auditcategoryservice } from '../../../../redux/Export/masters/auditcategory/saga';
import Workbook from 'react-excel-workbook'
import * as clipboard from "clipboard-polyfill/text";
import {getValue_D1040,getValue_S8100} from '../../pasteData'
import DatePickerDate from "../../datePickerDate";

class Sidebar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        data:[],
        exception:'',
        shipment_type:'',
        mtd_type:'', 
        hbl:'',
        user_id:'',
        start_time:new Date(),
        updated_start_time:new Date(),
        end_time:'',
        time:'',
        time_taken:'',
        no_of_container:'',
        no_of_cargoitem:'',
        tat_time:'',
        no_of_hbl:'',
        shipper_coder:'',
        mr_code:'',
        error:'',
        comments:'',
        buddy_userid:'',
        shipment_no:'',
        customer:'',
        doc_cutoff:'',
        aggregated_status:'',
        type:'',
        date:'',
        medium:'',
        numbers:'',
        bl:'',
        etd:'',
        main_pol:'',
        main_voyage:'',
        main_pod:'',
        issuer:'',
        consignee : '',
        team:'',
        buddyuserdata:[],
        buddyuser_data:[],
        teamdata:[],
        team_data:[],
        regiondata:[],
        error_type:'',
        auditor_remarks:'',
        category:'',
        read:false,
        draft:false,
        sdc:false,
        free_time:false,
        credit:false,
        error_typedata:[],
        errortypedata:[],
        categorydata:[],
        collapse:false,
        is_search:false,
        corrected_remarks:false,
        audit_userid:'',
        is_admin:false,
        issuecode_data:[],
        is_submit:false,
        origin_requirements : [],
        country_requirements : [],
        customer_requirements : [],
        teamsite_data:[],
        isDataPasted: false,
        audit_category:'',
        audit_categorydata:[],
        auditsheetcount:'',
        auditsheetcountlast:'',
      };
    }
    
    componentDidMount() {

        this.fetcherroruserid()
        this.fetchteam()
        this.fetcherror_type()
        this.fetchroleData()
        this.fetchIssueCodeData()
        // this.fetchauditcheck()
        this.fetchteamsite()
        this.fetchAuditsheetCount()
        // this.fetchaudit_category()
      }
      fetchAuditsheetCount(){
        this.setState({loading:true})
        const {username} = this.props
        // console.log(username)
        AuditService.fetchauditcount(username)
        .then((res) => {
           if(res.status)   { 
                  let filterstatus = res.data;
                  let lastdata = res.lastcount;
                  this.setState({ 
                    auditsheetcount:filterstatus, 
                    auditsheetcountlast:lastdata     
                  }) 
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
  
  }
      fetchauditcheck(){
      
        this.setState({
        loading : true
        })
        AuditService.fetchauditcheck()
        .then((res) => { 
            this.setState({   
            loading : false     
            }) 
            if(res.status)
            {
                
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

     getValues = (listdata, key1, key2, keyvalue, returnKey = key2) => {
        let result = '';
        if (keyvalue !== '') {
          for (let i = 0; i < listdata.length; i++) {
            if (listdata[i][key1] === keyvalue) {
              result = listdata[i][returnKey]; // Return the desired key (default: key2)
              break;
            }
          }
        }
        return result;
      };
     fetchaudit_category() {
        // alert("123")
        const {team,teamdata} = this.state 
    
        const region = getValue(teamdata, 'value', 'region_id', team);
        // console.log("rajkumar1 (team ID):", team);
        // console.log("rajkumar2 (team name):", teams);
        // console.log("rajkumar3 (region ID):", region);
        auditcategoryservice.fetchauditcategory()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1 && item.region === region)
                 var rolelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                   });  
                //    console.log("audit_categorydata:", rolelist);
                    this.setState({
                        audit_categorydata :  rolelist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
     } 
      fetcherror_type() {
        errortypeService.fetcherrortype()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var rolelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                   });  
                var errortype_list = filterstatus.map(function(cusmaidid) {
                    return  {text : cusmaidid.name ,value : (cusmaidid.id)};
                 });  
                    this.setState({
                    error_typedata :  rolelist,
                    errortypedata:errortype_list
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
     }  
    fetcherroruserid() {
        userService.fetchpermission_user('Exports')
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.is_active === 1)
                 var erroruseridlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.username ,value : (cusmaidid.id).toString()};
                   });  
                var buddyuserlist = filterstatus.map(function(cusmaidid) {
                    return  {text : cusmaidid.username ,value : (cusmaidid.id)};
                 });  
                    this.setState({
                    buddyuserdata :  erroruseridlist,
                    buddyuser_data :  buddyuserlist,
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
                 var teamlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.team_name ,value : (cusmaidid.id).toString(),region_id:cusmaidid.region_id,country_code : cusmaidid.country_code};
                   });
                var team_list = filterstatus.map(function(cusmaidid) {
                    return  {text : cusmaidid.team_name ,value : (cusmaidid.id)};
                 });  
                 var regionlist = filterstatus.map(function(cusmaidid) {
                    return  {label : cusmaidid.team_name ,value : cusmaidid.region_id,country_code : cusmaidid.country_code};
                 });
                    this.setState({
                    teamdata :  teamlist,
                    team_data:team_list,
                    regiondata:regionlist
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
     }  
     fetchData() {
        const {numbers} = this.state 
        if(numbers !== "")
        {
            this.setState({
                loading : true
            })
            AuditService.fetchIndividualAuditsheet(numbers)
            .then((res) => {
               
                this.setState({loading:false})
                this.clearvalue()
            if(res.status)   { 
                this.setValue(res.data)
                this.fetchroleData()
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
          createNotification('Please Enter Number','error','filled')
        }
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
                start_time:record.start_time,
                exception:record.exception,
                shipment_type:record.shipment_type,
                mtd_type:record.mtd_type,
                hbl:record.hbl,
                user_id:record.user_id,
                end_time:record.end_time,
                time:this.validTime(record.time,'Time'),
                time_taken:record.time_taken,
                no_of_container:record.no_of_container,
                no_of_cargoitem:record.no_of_cargoitem,
                tat_time:record.tat_time,
                no_of_hbl:record.no_of_hbl,
                shipper_coder:record.shipper_coder,
                mr_code:record.mr_code,
                consignee:record.consignee,
                error:record.error,
                comments:record.comments,
                buddy_userid:record.buddy_userid,
                shipment_no:record.shipment_no,
                customer:record.customer,
                doc_cutoff:this.validDate(record.doc_cutoff,'Doc Cut-Off'),
                aggregated_status:record.aggregated_status,
                type:record.type,
                date:this.validDate(record.date,'Date'),
                medium:record.medium,
                numbers:record.numbers,
                bl:record.bl,
                etd:this.validDate(record.etd,'ETD'),
                main_pol:record.main_pol,
                main_voyage:record.main_voyage,
                main_pod:record.main_pod,
                issuer:record.issuer,
                team:record.team,
                error_type:record.error_type,
                auditor_remarks:record.auditor_remarks,
                audit_userid:record.audit_userid,
                category:record.category,
                read:record.read,
                draft:record.draft,
                sdc:record.sdc,
                free_time:record.free_time,
                credit:record.credit,
                corrected_remarks:record.corrected_remarks,
                is_search:true,
                is_admin:this.state.is_admin,
                is_submit:false
             })
         }
         setTimeout(() =>{
            this.searchTeamSite()
        }, 500);
    }
     clearvalue()
     {
       
         this.setState({
            start_time:new Date(),
            updated_start_time:new Date(),
            exception:'',
            shipment_type:'',
            mtd_type:'', 
            hbl:'',
            user_id:'',
            end_time:'',
            time:'',
            time_taken:'',
            no_of_container:'',
            no_of_cargoitem:'',
            tat_time:'',
            no_of_hbl:'',
            shipper_coder:'',
            mr_code:'',
            error:'',
            comments:'',
            buddy_userid:'',
            shipment_no:'',
            customer:'',
            consignee : '',
            doc_cutoff:'',
            aggregated_status:'',
            type:'',
            date:'',
            medium:'',
            numbers:'',
            bl:'',
            etd:'',
            main_pol:'',
            main_voyage:'',
            main_pod:'',
            issuer:'',
            team:'',
            consignee : '',
            error_type:'',
            auditor_remarks:'',
            audit_userid:'',
            category:'',
            read:false,
            draft:false,
            sdc:false,
            free_time:false,
            credit:false,
            corrected_remarks:false,
            is_search:false,
            is_submit:false,
            audit_category:''
         })
    }
    searchTeamSite()
    {
        const {issuer,shipper_coder,mr_code,consignee,customer,
           teamdata,teamsite_data,team,main_pod} = this.state
            var country_code = ''
            if(main_pod.trim() !== ''&& main_pod !== null)
            {
               country_code = main_pod.substring(0, 2)
            }
           
            // console.log("lbkjbkj country_code = " , country_code)
            // console.log("lbkjbkj issuer = " , issuer)
            // console.log("lbkjbkj shipper_coder = " , shipper_coder)
            // console.log("lbkjbkj mr_code = " , mr_code)
            // console.log("lbkjbkj consignee = " , consignee)
            // console.log("lbkjbkj customer = " , customer)
        if(country_code !== '' && issuer !== '')
        {
            var teams = getValue(teamdata,'value','label',team)
        //   console.log("lbkjbkj teams = " , teams)
           this.setState({
               loading : true,
           })
           var customer_title = getValue(teamsite_data,'team','customer',team),
           origin_title = getValue(teamsite_data,'team','origin',team),
           country_title = getValue(teamsite_data,'team','country',team)
           reportService.fetchTeamSiteapi(teams,issuer,shipper_coder,mr_code,consignee,country_code,
            customer,customer_title,origin_title,country_title)
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
    async onPasteS8100() {
        clipboard.readText().then((text)=>{
        var record = getValue_S8100(text)
        // console.log("kjbkj " , JSON.stringify(record))
        
        this.setState({
            shipper_coder:record.shipper_coder,
            mr_code:record.mr_code,
            consignee:record.consignee
   
            })
     createNotification('Please Wait to load Requirement','success','filled')
            setTimeout(() =>{
                this.searchTeamSite()
            }, 500);
        });
        
    }
    async onPasteD1040() {
        clipboard.readText().then((text)=>{
            var record = getValue_D1040(text)
            
        this.setState({
            shipment_no:record.shipment_no,
            customer:record.customer,
            numbers:record.mtd_number,
            issuer:record.issuer,
            main_pod:record.last_pod,
            doc_cutoff:this.validDate(record.doc_cutoff,'Doc Cut-Off'),
            aggregated_status:record.aggregated_status,
            type:record.type,
            date:this.validDate(record.date,'Date'),
            time:this.validTime(record.time,'Time'),
            medium:record.medium,
            bl:record.bl,
            etd:this.validDate(record.etd,'ETD'),
            main_pol:record.main_pol,
            main_voyage:record.main_voyage,
            })
            if(record.issuer !== "")
            {
                this.getteamvalue(record.issuer)
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
    getteamvalue(value)
    {
       this.setState({
           issuer : value,
           team:getValue(this.state.issuecode_data,'issure_code','team',value)
       })
       this.fetchaudit_category()
    }
      setCollapse() 
      {
       
        this.setState({
            collapse:!this.state.collapse
        })
      }
    onSubmit() {
    const {
        exception, shipment_type, mtd_type, hbl, start_time, time,
        no_of_container, no_of_cargoitem, no_of_hbl, error, comments, buddy_userid,
        shipment_no, customer, doc_cutoff, aggregated_status, type, date, medium, numbers, bl, etd,
        main_pol, main_voyage, main_pod, issuer, team, error_type, auditor_remarks, audit_userid, consignee, audit_category,
        corrected_remarks, read, draft, sdc, free_time, credit, is_admin, updated_start_time, shipper_coder, mr_code
    } = this.state;

    let is_fill = false;

    const isFilled = (val) => val !== "" && val !== null && val !== undefined;

    if (is_admin === true) {
        if (
            // isFilled(exception) && isFilled(shipment_type) && isFilled(mtd_type) && isFilled(hbl) && isFilled(time) &&
            // isFilled(no_of_container) && isFilled(no_of_cargoitem) && isFilled(no_of_hbl) &&
             isFilled(error) &&
            isFilled(buddy_userid) && isFilled(shipment_no) && isFilled(customer) && isFilled(doc_cutoff) &&
            isFilled(aggregated_status) && isFilled(type) && isFilled(date) && isFilled(medium) &&
            isFilled(numbers) && isFilled(bl) && isFilled(etd) && isFilled(main_pol) && isFilled(main_voyage) &&
            isFilled(main_pod) && isFilled(team) && isFilled(issuer) && read !== false &&
            isFilled(shipper_coder) && isFilled(mr_code) && isFilled(audit_category)
        ) {
            is_fill = true;
        }
    } else {
        if (
            // isFilled(exception) && isFilled(shipment_type) && isFilled(mtd_type) && isFilled(hbl) && isFilled(time) &&
            // isFilled(no_of_container) && isFilled(no_of_cargoitem) && isFilled(no_of_hbl) &&
            isFilled(error) && isFilled(buddy_userid) && isFilled(shipment_no) &&
            read !== false && isFilled(shipper_coder) && isFilled(mr_code) && isFilled(audit_category)
        ) {
            is_fill = true;
        }
    }

    if (is_fill) {
        const { username } = this.props;

        const formattedDate = isFilled(date) ? moment(date).format('MM/DD/YYYY') : '';
        const end_time = new Date();
        const updated_end_time = new Date();
        const doc_cutoff_date = isFilled(doc_cutoff) ? moment(doc_cutoff).format('MM/DD/YYYY') : '';
        const etd_date = isFilled(etd) ? moment(etd).format('MM/DD/YYYY') : '';
        const time_taken = getTimeDifference(start_time, end_time);

        let tat_time = '';
        if (isFilled(date) && isFilled(time)) {
            const datetimeString = `${formattedDate} ${time}`;
            tat_time = getTimeDifference(new Date(), new Date(datetimeString));
        }

        this.setState({
            end_time,
            time_taken,
            tat_time,
            loading: true
        }, () => {
            AuditService.createaudit(
                username, exception, shipment_type, mtd_type, hbl, time, time_taken,
                no_of_container, no_of_cargoitem, tat_time, no_of_hbl, error, comments, buddy_userid,
                shipment_no, customer, doc_cutoff_date, aggregated_status, type, formattedDate, medium, numbers, bl, etd_date,
                main_pol, main_voyage, main_pod, issuer, team, error_type, auditor_remarks, audit_userid, corrected_remarks,
                read, draft, sdc, free_time, credit, shipper_coder, mr_code, consignee, audit_category,
                convertLocalToUTCDate(start_time),
                convertLocalToUTCDate(end_time),
                convertLocalToUTCDate(updated_start_time),
                convertLocalToUTCDate(updated_end_time),
                1
            ).then((res) => {
                this.setState({ loading: false });
                if (res.status) {
                    createNotification('Success', 'success', 'filled');
                    this.fetchAuditsheetCount()
                    this.clearvalue();
                } else {
                    createNotification(res.message, 'error', 'filled');
                }
            }).catch(() => {
                this.setState({ loading: false });
            });
        });
    } else {
        this.setState({ is_submit: true });
        createNotification('Please fill mandatory field', 'error', 'filled');
    }
}

      renderTemplate()
      {
        const {languageData,locale} = this.props
        const {data} = this.state
        var array = data.map(record=> {
              return {
                'start_time':record.start_time,
                'exception':record.exception,
                'shipment_type':record.shipment_type,
                'mtd_type':record.mtd_type,
                'hbl':record.hbl,
                'user_id':record.user_id,
                'end_date':record.end_date,
                'time':record.time,
                'time_taken':record.time_taken,
                'no_of_container':record.no_of_container,
                'no_of_cargoitem':record.no_of_cargoitem,
                'tat_time':record.tat_time,
                'no_of_hbl':record.no_of_hbl,
                'error':record.error,
                'comments':record.comments,
                'buddy_userid':record.buddy_userid,
                'shipment_no':record.shipment_no,
                'customer':record.customer,
                'doc_cutoff':record.doc_cutoff,
                'aggregated_status':record.aggregated_status,
                'type':record.type,
                'date':record.date,
                'medium':record.medium,
                'numbers':record.numbers,
                'bl':record.bl,
                'etd':record.etd,
                'main_pol':record.main_pol,
                'main_voyage':record.main_voyage,
                'main_pod':record.main_pod,
                'issuer':record.issuer,
                'team':getValue(this.state.teamdata,'value','label',record.team),
                'error_type':getValue(this.state.errortypedata,'value','text',parseInt(record.error_type)),
                'auditor_remarks':record.auditor_remarks,
                'audit_userid':record.audit_userid,
                'read':record.read,
                'draft':record.draft,
                'sdc':record.sdc,
                'free_time':record.free_time,
                'credit':record.credit,
                'corrected_remarks':record.corrected_remarks,
            };
          })
          return(
            
            <Workbook filename="Audit_Sheet.xlsx" element={
              <Button className = "button-width" color="secondary"  style={{width:'150px'}}
              >{ onChangeLanguage(locale,'Download',languageData)}  
              </Button>
              }>
                <Workbook.Sheet data={array} name="Sheet A">
                <Workbook.Column label="Exception" value="exception" />
                <Workbook.Column label="Shipment Type" value="shipment_type" />
                <Workbook.Column label="MTD Type" value="mtd_type" />
                <Workbook.Column label="HBL" value="hbl" />
                <Workbook.Column label="User ID" value="user_id" />
                <Workbook.Column label="Start Date Time" value="start_time" />
                <Workbook.Column label="End Date Time" value="end_time" />
                <Workbook.Column label="Time" value="time" />
                <Workbook.Column label="Time Taken" value="time_taken" />
                <Workbook.Column label="No of Container" value="no_of_container" />
                <Workbook.Column label="No of Cargo Item" value="no_of_cargoitem" />
                <Workbook.Column label="TAT Time" value="tat_time" />
                <Workbook.Column label="No of HBL" value="no_of_hbl" />
                <Workbook.Column label="Error" value="error" />
                <Workbook.Column label="Comments" value="comments" />
                <Workbook.Column label="Buddy User ID" value="buddy_userid" />
                <Workbook.Column label="Shipment Number" value="shipment_no" />
                <Workbook.Column label="Customer" value="customer" />
                <Workbook.Column label="Doc Cut-Off" value="doc_cutoff" />
                <Workbook.Column label="Aggregated Status" value="aggregated_status" />
                <Workbook.Column label="Type" value="type" />
                <Workbook.Column label="Date" value="date" />
                <Workbook.Column label="Medium" value="medium" />
                <Workbook.Column label="Numbers" value="numbers" />
                <Workbook.Column label="BL" value="bl" />
                <Workbook.Column label="ETD" value="etd" />
                <Workbook.Column label="Main POL" value="main_pol" />
                <Workbook.Column label="Main Voyage" value="main_voyage" />
                <Workbook.Column label="Main POD" value="main_pod" />
                <Workbook.Column label="Issuer" value="issuer" />
                <Workbook.Column label="Team" value="team" />
                <Workbook.Column label="Error Type" value="error_type" />
                <Workbook.Column label="Auditor Remarks" value="auditor_remarks" />
                <Workbook.Column label="Corrected Remarks" value="corrected_remarks" />
                <Workbook.Column label="Audit User ID" value="audit_userid" />
                <Workbook.Column label="I have read and processed the shipment as per the above requirements" value="read" />
                <Workbook.Column label="Draft Sent" value="draft" />
                <Workbook.Column label="SDC Y" value="sdc" />
                <Workbook.Column label="Free Time Checked" value="free_time" />
                <Workbook.Column label="Credit Check" value="credit" />
              </Workbook.Sheet> 
            </Workbook>
         
    
          );
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

      onChangedate(value)
      {
          this.setState({date:value})
      }

      

   
    render()
    {
        const{loading,exception,shipment_type,mtd_type,hbl,corrected_remarks,start_time,end_time,time,time_taken,isDataPasted,
            no_of_container,no_of_cargoitem,tat_time,no_of_hbl,error,buddy_userid,auditsheetcount,auditsheetcountlast,
            shipment_no,customer,doc_cutoff,aggregated_status,type,date,medium,numbers,bl,etd,
            main_pol,main_voyage,main_pod,issuer,team,error_type,auditor_remarks,error_typedata,audit_categorydata,audit_category,
            buddyuserdata,teamdata,collapse,read,draft,sdc,free_time,
            credit,is_submit,shipper_coder,mr_code,consignee
            ,origin_requirements,country_requirements,customer_requirements}=this.state
            
        const {match,languageData,locale,username} = this.props
        return (
            <>
            <title>{onChangeLanguage(locale,'Audit Sheet',languageData)}</title>
            {loading && 
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
            <Row>
              <Colxx xxs="12">
                    <div className = "row">
                      <div className = "col-md-8">
                         <Breadcrumb heading={onChangeLanguage(locale,'Audit Sheet',languageData)} match={match} />
                    </div>
                    <div className = "col-md-2" >
                        <h2 style = {{marginTop:'15px'}}>Total EQ : {auditsheetcount}</h2>
                        </div>
                        <div className = "col-md-2">
                            <h2  style = {{marginTop:'15px'}}>Last EQ : {auditsheetcountlast}</h2>
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
                        <div className = "col-md-2 radiobut">
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Exception',languageData)} 
                        </Label>
                        <p className = 'fontstyle mandatory-label'></p>
                            <div style = {{margin:'10px 0px'}}>
                                <Row>
                                    <Colxx xxs="4">
                                        <CustomRadioButton checked  = "Yes" name = {onChangeLanguage(locale,'Yes',languageData)} value = {exception} 
                                            onChangeRadio={(value)=>this.setState({exception:value})}/>
                                       
                                    </Colxx>
                                    <Colxx xxs="4">
                                     <CustomRadioButton checked  = "No" name ={onChangeLanguage(locale,'No',languageData)} value = {exception} 
                                            onChangeRadio={(value)=>this.setState({exception:value})}/>
                                        
                                    </Colxx>
                                </Row>
                            </div>   
                        </div>
                       
                       
                        <div className = "col-md-3 radiobut">
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Shipment Type',languageData)} 
                        </Label>
                        <p className = 'fontstyle mandatory-label'></p>
                            <div style = {{margin:'10px 0px'}}>
                                <Row>
                                    <Colxx xxs="3">
                                        <CustomRadioButton checked  = "DG" name = {onChangeLanguage(locale,'DG',languageData)} value = {shipment_type} 
                                           onChangeRadio={(value)=>this.setState({shipment_type:value})}/>
                                       
                                    </Colxx>
                                    <Colxx xxs="3">
                                     <CustomRadioButton checked  = "Refer" name = {onChangeLanguage(locale,'Refer',languageData)} value = {shipment_type} 
                                            onChangeRadio={(value)=>this.setState({shipment_type:value})}/>
                                        
                                    </Colxx>
                                    <Colxx xxs="3">
                                     <CustomRadioButton checked  = "Normal" name = {onChangeLanguage(locale,'Normal',languageData)} value = {shipment_type} 
                                            onChangeRadio={(value)=>this.setState({shipment_type:value})}/>
                                        
                                    </Colxx>
                                </Row>
                            </div>   
                        </div>
                        <div className = "col-md-4 radiobut">
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'MTD Type',languageData)}
                         </Label>
                        <p className = 'fontstyle mandatory-label'></p>
                            <div style = {{margin:'10px 0px'}}>
                                <Row>
                                    <Colxx xxs="2">
                                        <CustomRadioButton checked  = "Split" name = {onChangeLanguage(locale,'Split',languageData)} value = {mtd_type} 
                                            onChangeRadio={(value)=>this.setState({mtd_type:value})}/>
                                    </Colxx>
                                    <Colxx xxs="4">
                                     <CustomRadioButton checked  = "Part Load" name = {onChangeLanguage(locale,'Part Load',languageData)} value = {mtd_type} 
                                             onChangeRadio={(value)=>this.setState({mtd_type:value})}/>
                                    </Colxx>
                                    <Colxx xxs="3">
                                     <CustomRadioButton checked  = "Combined" name = {onChangeLanguage(locale,'Combined',languageData)} value = {mtd_type} 
                                            onChangeRadio={(value)=>this.setState({mtd_type:value})}/>
                                        
                                    </Colxx>
                                    <Colxx xxs="2">
                                     <CustomRadioButton checked  = "Normal" name = {onChangeLanguage(locale,'Normal',languageData)} value = {mtd_type} 
                                            onChangeRadio={(value)=>this.setState({mtd_type:value})}/>
                                        
                                    </Colxx>
                                </Row>
                            </div>  
                        </div> 
                        <div className = "col-md-3 ">
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'HBL',languageData)} 
                         </Label>
                        <p className = 'fontstyle mandatory-label'></p>
                        <div style = {{margin:'10px 0px'}}>
                                <Row>
                                <Colxx xxs="4">
                                        <CustomRadioButton checked  = "Yes" name = {onChangeLanguage(locale,'Yes',languageData)} value = {hbl} 
                                          onChangeRadio={(value)=>this.setState({hbl:value})}/>
                                       
                                    </Colxx>
                                    <Colxx xxs="4">
                                     <CustomRadioButton checked  = "No" name = {onChangeLanguage(locale,'No',languageData)} value = {hbl} 
                                           onChangeRadio={(value)=>this.setState({hbl:value})}/>
                                        
                                    </Colxx>
                 
                                </Row>
                            </div>   
                        </div>
                       
                    </div>  
                    </div>
              
            <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'15px'}}>
                    <div className = "row">
                    <div className = "col-lg-2-0 space-margin">
                    <Label  className = "fontstyle normal-font" ><a >{onChangeLanguage(locale,'User ID',languageData)}</a><br></br> {username}</Label>

                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                        <Label  className = "fontstyle normal-font" ><a >{onChangeLanguage(locale,'Start Date Time',languageData)}</a><br></br> {moment(start_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                           
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                        <Label  className = "fontstyle normal-font" ><a >{onChangeLanguage(locale,'End Date Time',languageData)}</a><br></br> {end_time !== '' && moment(end_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" ><a>{onChangeLanguage(locale,'TAT Time',languageData)}</a><br></br> {tat_time}</Label>
                            
                        </div>
                        
                        <div className = "col-lg-2-0 space-margin">
                        <Label  className = "fontstyle normal-font" ><a >{onChangeLanguage(locale,'Time Taken',languageData)}</a><br></br>  
                        {time_taken}</Label>
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Time',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && time === ''?  "error-border-paste":"fontstyle text-background-paste" }   
                            placeholder = 'hh:mm:ss AM/PM'
                            type = 'time'
                            value = {time} 
                            disabled={isDataPasted} 
                            onChange= {(e)=>this.setState({time : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'No of Container',languageData)}
                           </Label>
                            <Input  className = {"fontstyle text-background" }    
                            type = "number" min="0"  
                            placeholder = ''
                            // onKeyDown={this.handleKeypress}
                            value = {no_of_container}  
                            onChange= {(e)=>this.setState({no_of_container : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'No of Cargo Item',languageData)}
                           </Label>
                            <Input  className = {"fontstyle text-background" }  
                            type = "number" min="0"  
                            placeholder = ''
                            // onKeyDown={this.handleKeypress}
                            value = {no_of_cargoitem}  
                            onChange= {(e)=>this.setState({no_of_cargoitem : e.target.value})} 
                            />
                        </div>
                       
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'No of HBL',languageData)}
                            </Label>
                            <Input  className = {"fontstyle text-background" }  
                             type = "number" min="0"  
                             placeholder = ''
                            //  onKeyDown={this.handleKeypress}
                            value = {no_of_hbl}  
                            onChange= {(e)=>this.setState({no_of_hbl : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && error === ''?  "error-border":"fontstyle text-background" }    
                            placeholder = ''
                            value = {error}  
                            onChange= {(e)=>this.setState({error : e.target.value})} 
                            />
                        </div>
                        {/* <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Comments',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && comments === ''?  "error-border":"fontstyle text-background" }  
                            placeholder = ''
                            value = {comments}  
                            onChange= {(e)=>this.setState({comments : e.target.value})} 
                            />
                        </div> */}
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Buddy User ID',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                                <Select  className = {is_submit === true && buddy_userid === ''?  "error-border-select":"react-select fontstyle" }  
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={buddyuserdata.filter(option =>option.label === buddy_userid)}
                                options={buddyuserdata}
                                onChange={(option)=>this.setState({buddy_userid:option.label})}
                                disabled
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Shipment Number',languageData)}
                            <a style = {{color :'red'}}>*</a>
                            </Label>
                            <Input  className = {is_submit === true && shipment_no === ''?  "error-border-paste":"fontstyle text-background-paste" }    
                            placeholder = ''
                            value = {shipment_no}  
                            disabled={isDataPasted}
                            onChange= {(e)=>this.setState({shipment_no : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Audit Category',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select
                                className={is_submit === true && audit_category === '' ? "error-border-select" : "react-select fontstyle"}
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={audit_categorydata.filter(option => option.value === audit_category)}
                                options={audit_categorydata}
                                onChange={(option)=>this.setState({audit_category:option.value})}
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
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
                   
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Customer',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && customer === ''?  "error-border-paste":"fontstyle text-background-paste" }    
                            placeholder = ''
                            value = {customer}  
                            disabled={isDataPasted}
                            onChange= {(e)=>this.setState({customer : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Doc Cut-Off',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                                <DatePickerDate
                                    selected={doc_cutoff}
                                    className = "text-background-paste" 
                                    onChange={(date) => this.setState({doc_cutoff:date})}
                                    disabled={isDataPasted}
                                    />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Aggregated Status',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && aggregated_status === ''?  "error-border-paste":"fontstyle text-background-paste" }    
                            placeholder = ''
                            value = {aggregated_status}  
                            onChange= {(e)=>this.setState({aggregated_status : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Type',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && type === ''?  "error-border-paste":"fontstyle text-background-paste" }    
                            placeholder = ''
                            value = {type}  
                            disabled={isDataPasted}
                            onChange= {(e)=>this.setState({type : e.target.value})} 
                            />
                        </div>
                        {/* <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Date',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && date === ''?  "error-border-paste":"fontstyle text-background-paste" }   
                            placeholder = 'MM/dd/yyyy'
                            value = {date} 
                            onChange= {(e)=>this.setState({date : e.target.value})} 
                            />
                        </div> */}

                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Date',languageData)}
                              <a style = {{color :'red'}}>*</a></Label>
                               <a className = 'fontstyle mandatory-label'>
                                {is_submit === true && date === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>
                              <DatePickerDate
                                 selected={date}
                                 className = "text-background-paste" 
                                 onChange={(date) => this.setState({date:date})}
                                 disabled={isDataPasted}
                                 />
                                
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Medium',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && medium === ''?  "error-border-paste":"fontstyle text-background-paste" }    
                            placeholder = ''
                            value = {medium}  
                            onChange= {(e)=>this.setState({medium : e.target.value})} 
                            disabled={isDataPasted}
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Numbers',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && numbers === ''?  "error-border-paste":"fontstyle text-background-paste" }    
                       
                            value = {numbers}  
                            onChange= {(e)=>this.setState({numbers : e.target.value})} 
                            disabled={isDataPasted}
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'BL',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && bl === ''?  "error-border-paste":"fontstyle text-background-paste" }    
                            placeholder = ''
                            value = {bl} 
                            disabled={isDataPasted} 
                            onChange= {(e)=>this.setState({bl : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'ETD',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <a className = 'fontstyle mandatory-label'>
                                {is_submit === true && etd === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>
                             <DatePickerDate
                                 selected={etd}
                                 className = "text-background-paste" 
                                 onChange={(date) => this.setState({etd:date})}
                                 disabled={isDataPasted}
                                 />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Main POL',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && main_pol === ''?  "error-border-paste":"fontstyle text-background-paste" }    
                            placeholder = ''
                            value = {main_pol}  
                            disabled={isDataPasted}
                            onChange= {(e)=>this.setState({main_pol : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Main Voyage',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && main_voyage === ''?  "error-border-paste":"fontstyle text-background-paste" }   
                            placeholder = ''
                            value = {main_voyage} 
                            disabled={isDataPasted} 
                            onChange= {(e)=>this.setState({main_voyage : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Last POD',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && main_pod === ''?  "error-border-paste":"fontstyle text-background-paste" }   
                            placeholder = ''
                            value = {main_pod}  
                            disabled={isDataPasted}
                            onChange= {(e)=>this.setState({main_pod : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Issuer',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && issuer === ''?  "error-border-paste":"fontstyle text-background-paste" }   
                            placeholder = ''
                            value = {issuer}  
                            disabled={isDataPasted}
                            onChange= {(e)=>this.getteamvalue(e.target.value)} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Team',languageData)}
                            <a style = {{color :'red'}}>*</a>
                            {is_submit === true && team=== '' &&   <p className = 'fontstyle mandatory-label'> {onChangeLanguage(locale,'Mandatory Field',languageData)} </p>}
                            <br></br>{team !== "" &&  getValue(teamdata,'value','label',team)}
                            </Label>
                            
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Shipper Coder',languageData)} <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && shipper_coder === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                            placeholder = ''
                            value = {shipper_coder}  
                            disabled={shipper_coder !== ''}
                            onChange= {(e)=>this.setState({shipper_coder : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'MR Code',languageData)} <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && mr_code === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                            placeholder = ''
                            value = {mr_code}  
                            disabled={mr_code !== ''}
                            onChange= {(e)=>this.setState({mr_code : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Consignee',languageData)}</Label>
                            <Input  className = "fontstyle text-background-paste"  
                            placeholder = ''
                            value = {consignee}  
                            disabled={consignee !== ''}
                            onChange= {(e)=>this.setState({consignee: e.target.value})} 
                            />
                        </div>
                    </div>
                    </Collapse>
                </div>
            <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'15px'}}>
                    <Row>
                            <Colxx xxs="7" style = {{marginTop:'10px'}}>
                            <Label  className = "fontstyle" 
                                    style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'Customer Requirement',languageData)} </Label> : 
                                {issuer !== '' && <Label  className = "fontstyle" style = {{fontSize:'14px',color:''}}> *For {issuer} Based Requirements</Label>}
                            </Colxx>
                            <Colxx xxs="1"></Colxx>
                             <Colxx xxs="2">
                            <Button className = "button-width" color="secondary"  
                                 onClick={()=>this.onPasteS8100()}
                                >
                                {onChangeLanguage(locale,'Paste from S8100',languageData)}
                            </Button> 
                            </Colxx>
                            <Colxx xxs="2">
                            <Button className = "button-width" color="primary"  
                                onClick={()=>this.searchTeamSite()}
                                >
                                {onChangeLanguage(locale,'Search',languageData)} <i className="simple-icon-magnifier" style = {{fontSize:'15px',marginLeft:'45px'}} />
                            </Button>
                               
                            </Colxx>
                        </Row>
                </div> 
                <div>
                {issuer !== '' &&

                    <div className="row" style={{ marginBottom: '7px' }}>
                        {origin_requirements && origin_requirements.length > 0 &&
                            <div className="col-md-6">
                                <div className="publishuser-card-component" style={{ borderRadius: '10px' }}>
                                    <div className="publish-title" >
                                        <Row>
                                            <Colxx xxs="12">
                                                <Label className="fontstyle"
                                                    style={{ fontWeight: 700, fontSize: '15px' }}>{onChangeLanguage(locale, 'Origin Requirements - (Source - ', languageData) + getValue(teamdata, 'value', 'label', team) + ')'}</Label>

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
                                                    style={{ fontWeight: 700, fontSize: '15px' }}>{onChangeLanguage(locale, 'Country Requirements - (Source - ', languageData) + getCountryName('', '', main_pod, teamdata) + ')'}</Label>

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
                  </div><div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'15px'}}>
                    <div className = "row">
                    <div className = "col-md-3 space-margin" >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Error Type',languageData)}
                                </Label>
                                <Select  className ="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={error_typedata.filter(option =>option.value === error_type)}
                                options={error_typedata}
                                onChange={(option)=>this.setState({error_type:option.value})}
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Auditor Remarks',languageData)}
                           </Label>
                       <Input  className ="fontstyle text-background"   
                            placeholder = ''
                            value = {auditor_remarks}  
                            onChange= {(e)=>this.setState({auditor_remarks : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Corrected Remarks',languageData)}
                            {/* <a style = {{color :'red'}}>*</a> */}
                            </Label>
                            <div  style = {{marginTop:'10px'}}>
                            <a style = {{padding:'7px 5px',fontSize:'12px'}}>
                            <Checkbox color="blue" style = {{marginRight:'6px'}}  checked = {corrected_remarks === true}
                             onChange = {()=>this.setState({corrected_remarks:!corrected_remarks})}  /> 
                            {onChangeLanguage(locale,'Error',languageData)}   
                                 </a> 
                                    </div>
                        </div>
                        {/* <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'User ID',languageData)}</Label>
                            <Input  className = "fontstyle text-background"  
                                placeholder = ''
                                value = {audit_userid}  
                                onChange= {(e)=>this.setState({audit_userid : (e.target.value).toUpperCase()})} 
                              />
                        </div> */}
                        {/* <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Category',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={categorydata.filter(option =>option.value === category)}
                        options={categorydata}
                        onChange={this.handlecategory}
                      />
                        </div> */}
                       
                        
                    </div>
                </div>   
               

                {/* <div className = "row" style = {{marginBottom:'15px'}}>
                      <div className = "col-md-4 text-center" style = {{padding:'0px 5px',borderRight:'1px solid gray'}}><Label  className = "fontstyle small-font">Chennai Requirement Last Update    : 03/12/2020 - 6:33 PM</Label></div>
                      <div className = "col-md-4 text-center" style = {{padding:'0px 5px',borderRight:'1px solid gray'}}><Label  className = "fontstyle small-font">Mumbai Requirement Last Update     : 03/12/2020 - 6:33 PM</Label></div>
                      <div className = "col-md-4 text-center" style = {{padding:'0px 5px'}}><Label  className = "fontstyle small-font">Shanghai Requirement Last Update   : 03/12/2020 - 6:33 PM</Label></div>
                </div> */}
                <ul className = "ul-list-style ultext-center" style = {{marginBottom:'15px'}}>
                <a style = {{color :'red'}}>*</a> 

                        <li style = {{margin:'0px 5px'}}>
                            <a className = {is_submit === true && read === false?  "error-border":"fontstyle text-background" }  style = {{ padding:'7px 5px',fontSize:'12px',width:'100%'}}>
                                <Checkbox color="blue" style = {{marginRight:'6px'}} checked = {read === true} onChange = {()=>this.setState({read:!read})}> 
                                <a style = {{marginLeft:'2px'}}>{onChangeLanguage(locale,'I have read and processed the shipment as per the above requirements',languageData)}</a>
                                </Checkbox>
                                
                                
                            </a>
                        </li>
                        <li style = {{margin:'0px 5px'}}>
                            <a className='fontstyle text-background' style = {{ padding:'7px 5px',fontSize:'12px',width:'100%'}}>
                             <Checkbox color="blue" style = {{marginRight:'6px'}} checked = {draft === true} onChange = {()=>this.setState({draft:!draft})}> 
                            <a style = {{marginLeft:'2px'}}>{onChangeLanguage(locale,'Draft Sent',languageData)}</a>
                            </Checkbox>
                        </a></li>
                        <li style = {{margin:'0px 5px'}}> 
                            <a className='fontstyle text-background' style = {{ padding:'7px 5px',fontSize:'12px',width:'100%'}}>
                            <Checkbox color="blue" style = {{marginRight:'6px'}} checked = {sdc === true} onChange = {()=>this.setState({sdc:!sdc})}> 
                            <a style = {{marginLeft:'2px'}}>{onChangeLanguage(locale,'SDC Y',languageData)}</a>
                            </Checkbox>
                        </a></li>
                        <li style = {{margin:'0px 5px'}}>
                        <a className='fontstyle text-background' style = {{ padding:'7px 5px',fontSize:'12px',width:'100%'}}>
                            <Checkbox color="blue" style = {{marginRight:'6px'}} checked = {free_time === true} onChange = {()=>this.setState({free_time:!free_time})}> 
                            <a style = {{marginLeft:'2px'}}> {onChangeLanguage(locale,'Free Time Checked',languageData)}</a>
                            </Checkbox>
                        </a>
                        </li>
                        <li style = {{margin:'0px 5px'}}>
                        <a  className='fontstyle text-background' style = {{ padding:'7px 5px',fontSize:'12px',width:'100%'}}>
                            <Checkbox color="blue" style = {{marginRight:'6px'}} checked = {credit === true} onChange = {()=>this.setState({credit:!credit})}> 
                            <a style = {{marginLeft:'2px'}}> {onChangeLanguage(locale,'Credit Check',languageData)}</a>
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
                                onClick={()=>this.fetchData()}
                                >
                                {onChangeLanguage(locale,'Find',languageData)}
                            </Button>
                       <Button className = "button-width" color="primary"  
                                onClick={()=>this.onSubmit()}
                                >
                                {onChangeLanguage(locale,'Save',languageData)}
                            </Button>                          
                            <Button className = "button-width" color="secondary"  
                                 onClick={()=>this.fetchauditcheck()}
                                >
                                {onChangeLanguage(locale,'Next Audit',languageData)}
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

