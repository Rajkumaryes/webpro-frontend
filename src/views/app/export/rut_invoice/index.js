import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button,Collapse} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { Checkbox} from 'antd';
import{issuecodeService} from '../../../../redux/Export/masters/issuercode/saga';
import CustomRadioButton from '../../../RadioButton'
import {onChangeLanguage,getTimeDifference,permittedusers,getValue,convertLocalToUTCDate,getCountryName} from '../../../../helper'
import{RutService} from '../../../../redux/Export/Rutinvoice/saga'
import { createNotification } from '../../../../toast';
import Loading from "react-fullscreen-loading";
import{teamService} from '../../../../redux/Export/masters/exportteam/saga'
import moment from 'moment';
import Workbook from 'react-excel-workbook'
import{roleService} from '../../../../redux/role/saga'
import {getValue_D1040,getValue_S8100} from '../../pasteData'
import * as clipboard from "clipboard-polyfill/text";
import DatePickerDate from "../../datePickerDate";
import{teamsiteService} from '../../../../redux/Export/masters/teamsite/saga';
import{reportService} from '../../../../redux/Export/report/saga'


class Sidebar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        user_id:'',
        start_time:new Date(),
        updated_start_time:new Date(),
         end_time:'', 
        time:'',
        time_taken:'',
        no_of_container:'',
        no_of_cargoitem:'',
        mtd_number:'',
        customer:'',
        doc_cutoff:'',
        aggregated_status:'',
        type:'',
        date:'',
        medium:'',
        shipment_no:'',
        bl:'',
        etd:'',
        main_pol:'',
        main_voyage:'',
        main_pod:'',
        issuer:'',
        team:'',
        tat_time:'',
        last_pod:'',
        shipper_coder:'',
        mr_code:'',
        consignee: '',
        audit_sheet:false,
        exception:'',
        shipment_type:'',
        mtd_type:'',
        hbl:'',
        read:false,
        draft:false,
        sdc:false,
        free_time:false,
        credit:false,
        teamdata:[],
        collapse:false,
        is_search:false,
        is_admin:false,
        data:[],
        team_data:[],
        issuecode_data:[],
        is_submit:false,
        origin_requirements : [],
        country_requirements : [],
        customer_requirements : [],
        teamsite_data:[],
        rutinvoicecount:'',
        rutinvoicecountlast:'',
      };
    }
    componentDidMount() {
        
       this.fetchteam() 
       this.fetchroleData()
       this.fetchIssueCodeData()
       this.fetchteamsite()
       this.fetchRutinvoiceCount()
    }
        fetchRutinvoiceCount(){
      this.setState({loading:true})
      const {username} = this.props
      console.log(username)
      RutService.fetchrutinvoicecount(username)
      .then((res) => {
         if(res.status)   { 
                let filterstatus = res.data;
                let lastdata = res.lastcount;
                this.setState({ 
                  rutinvoicecount:filterstatus, 
                  rutinvoicecountlast:lastdata     
                }) 
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})
  
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
    fetchteam() {
        this.setState({
            loading : true
          })
        teamService.fetchteams()
        .then((res) => {
            this.setState({loading:false})
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var teamlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.team_name ,value : (cusmaidid.id).toString(),country_code : cusmaidid.country_code};
                   }); 
                   
                    this.setState({
                    teamdata :  teamlist
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

    onChangeFileUpload(files)
      {

      }
      setCollapse() 
      {
       
        this.setState({
            collapse:!this.state.collapse
        })
      }
      fetchData() {
        const {mtd_number} = this.state 
        if(mtd_number !== "")
        {
            this.setState({
                loading : true
            })
            RutService.fetchIndividualRut(mtd_number)
            .then((res) => {
               
                this.setState({loading:false})
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
          createNotification('Please Enter Mtd Number','error','filled')
        }
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
      setValue(record)
      {
          
          if(record !== null && record)
          {
            this.setState({
                user_id:record.user_id,
                start_time:record.start_time,
                end_time:record.end_time, 
                time:record.time,
                time_taken:record.time_taken,
                no_of_container:record.no_of_container,
                no_of_cargoitem:record.no_of_cargoitem,
                mtd_number:record.mtd_number,
                customer:record.customer,
                doc_cutoff:this.validDate(record.doc_cutoff,'Doc Cut-Off'),
                aggregated_status:record.aggregated_status,
                type:record.type,
                date:this.validDate(record.date,'Date'),
                medium:record.medium,
                shipment_no:record.shipment_no,
                bl:record.bl,
                etd:this.validDate(record.etd,'ETD'),
                main_pol:record.main_pol,
                main_voyage:record.main_voyage,
                main_pod:record.main_pod,
                issuer:record.issuer,
                team:record.team,
                tat_time:record.tat_time,
                consignee:record.consignee,
                last_pod:record.last_pod,
                shipper_coder:record.shipper_coder,
                mr_code:record.mr_code,
                audit_sheet:record.audit_sheet,
                exception:record.exception,
                shipment_type:record.shipment_type,
                mtd_type:record.mtd_type,
                hbl:record.hbl,
                read:record.read,
                draft:record.draft,
                sdc:record.sdc,
                free_time:record.free_time,
                credit:record.credit,
                is_search:true,
              })
          }  setTimeout(() =>{
            this.searchTeamSite()
     }, 500);

 
      } 
      clearvalue()
      {
        
          this.setState({
            user_id:'',
            start_time:new Date(),
            end_time:'', 
            time:'',
            time_taken:'',
            no_of_container:'',
            no_of_cargoitem:'',
            mtd_number:'',
            customer:'',
            doc_cutoff:'',
            aggregated_status:'',
            type:'',
            date:'',
            medium:'',
            shipment_no:'',
            bl:'',
            etd:'',
            main_pol:'',
            main_voyage:'',
            main_pod:'',
            issuer:'',
            consignee : '',
            team:'',
            tat_time:'',
            last_pod:'',
            shipper_coder:'',
            mr_code:'',
            audit_sheet:false,
            exception:'',
            shipment_type:'',
            mtd_type:'',
            hbl:'',
            read:false,
            draft:false,
            sdc:false,
            free_time:false,
            credit:false,
            is_search:false,
            is_submit:false,
            origin_requirements:[],
            country_requirements:[],
            customer_requirements:[],
          })
      } 


      searchTeamSite()
      {
          const {issuer,shipper_coder,mr_code,consignee,customer,
             teamdata,teamsite_data,last_pod,team,main_pod} = this.state
              var country_code = ''
         
             if(last_pod.trim() !== ''&& last_pod !== null)
              {
                 country_code = last_pod.substring(0, 2)
              }
              else if(main_pod.trim() !== ''&& main_pod !== null)
              {
                 country_code = main_pod.substring(0, 2)
              }
             
              console.log("lbkjbkj country_code = " , country_code)
              console.log("lbkjbkj issuer = " , issuer)
              console.log("lbkjbkj shipper_coder = " , shipper_coder)
              console.log("lbkjbkj mr_code = " , mr_code)
              console.log("lbkjbkj consignee = " , consignee)
          if(country_code !== '' && issuer !== '')
          {
            var teams = getValue(teamdata,'value','label',team)
            console.log("lbkjbkj teams = " , teams)
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
      onSubmit() { 
        const {start_time, time,no_of_container,audit_sheet,no_of_cargoitem,mtd_number,customer,doc_cutoff,aggregated_status,type,date,
            medium,shipment_no,bl,etd,main_pol,main_voyage,main_pod,issuer,team,last_pod,shipper_coder,mr_code,exception,
            shipment_type,mtd_type,hbl,read,draft,sdc,free_time,credit,is_admin,updated_start_time,consignee} = this.state;
        
      
            if(date !== "" && time !== "")
            {
                tat_time  = getTimeDifference(start_time,new Date(date+" "+ time))
            }
            var is_fill = false
            if(is_admin === true)
            {
                if( time !== "" && mtd_number !== "" && customer !== "" && doc_cutoff !== "" && aggregated_status !== "" && type !== "" && date !== "" && 
                medium !== "" && shipment_no !== "" && bl !== "" && etd !== "" && main_pol !== "" && main_voyage !== "" && main_pod !== "" && issuer !== "" && team !== "" && last_pod !== "" && 
                shipper_coder !== "" && mr_code !== "" && read !== false)
                {
                    is_fill = true
                }
            }
            else
            {
                if( time !== ""  && shipment_no !== "" &&
                    shipper_coder !== '' && mr_code !== '')
                {
                    is_fill = true
                }
            }
            if(is_fill === true)
            {    
                const end_time =new Date() ,updated_end_time = new Date()
                const {username} = this.props
                var dates =(date !=='' && date !== null) ?  moment(date).format('MM/DD/YYYY') :''
                var etd_date =(etd !=='' && etd !== null) ?  moment(etd).format('MM/DD/YYYY')  :''
                var doc_cutoff_date= (doc_cutoff !=='' && doc_cutoff !== null) ? moment(doc_cutoff).format('MM/DD/YYYY') :''
                var time_taken = getTimeDifference(start_time,new Date())
                var tat_time = ''
                if(date !== "" && time !== "")
                {
                    tat_time  = getTimeDifference(new Date(),new Date(dates+" "+ time))
                }
                this.setState({
                    end_time:end_time,
                    time_taken:time_taken,
                    tat_time:tat_time,
                    loading : true
                  })
                  RutService.createRut(username, time_taken,time,no_of_container,audit_sheet,no_of_cargoitem,mtd_number,customer,doc_cutoff_date,aggregated_status,type,dates,
                    medium,shipment_no,bl,etd_date,main_pol,main_voyage,main_pod,issuer,team,tat_time,last_pod,shipper_coder,mr_code,exception,shipment_type,mtd_type,hbl,read,draft,sdc,free_time,credit,
                    consignee,
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
                          this.fetchRutinvoiceCount()
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
        const {data,is_admin,teamdata} = this.state
        var array = data.map(record=> {
              return {
                'user_id':record.user_id,
                'start_time':record.start_time,
                'end_time':record.end_time, 
                'time':record.time,
                'time_taken':record.time_taken,
                'mtd_number':record.mtd_number,
                'customer':record.customer,
                'doc_cutoff':record.doc_cutoff,
                'aggregated_status':record.aggregated_status,
                'type':record.type,
                'date':record.date,
                'medium':record.medium,
                'shipment_no':record.shipment_no,
                'bl':record.bl,
                'etd':record.etd,
                'main_pol':record.main_pol,
                'main_voyage':record.main_voyage,
                'main_pod':record.main_pod,
                'issuer':record.issuer,
                'team':getValue(teamdata,'value','label',record.team),
                'tat_time':record.tat_time,
                'last_pod':record.last_pod,
                'shipper_coder':record.shipper_coder,
                'mr_code':record.mr_code,
                'audit_sheet':record.audit_sheet,
                'exception':record.exception,
                // 'shipment_type':record.shipment_type,
                'mtd_type':record.mtd_type,
                'hbl':record.hbl,
                'read':record.read,
                'draft':record.draft,
                'sdc':record.sdc,
                'free_time':record.free_time,
                'credit':record.credit,
            };
          })
          return(
            
            <Workbook filename="RUT_Invoice.xlsx" element={
              <Button className = "button-width" color="secondary"  style={{width:'150px'}}
              >{ onChangeLanguage(locale,'Download',languageData)}  
              </Button>
              }>
              <Workbook.Sheet data={array} name="Sheet A">
              <Workbook.Column label="User ID" value="user_id" />
                <Workbook.Column label="Start Date Time" value="startdate" />
                <Workbook.Column label="End Date Time" value="end_time" /> 
                <Workbook.Column label="Time" value="time" />
                <Workbook.Column label="Time Taken" value="time_taken" />
                {/* <Workbook.Column label="No of Container" value="no_of_container" />
                <Workbook.Column label="No of Cargo Item" value="no_of_cargoitem" /> */}
                <Workbook.Column label="Shipment Number" value="shipment_no" />
                {is_admin === true &&<Workbook.Column label="MTD Number" value="mtd_number" />  }
                {is_admin === true &&<Workbook.Column label="Customer" value="customer" />  }
                {is_admin === true &&<Workbook.Column label="Doc Cut-Off" value="doc_cutoff" />  }
                {is_admin === true &&<Workbook.Column label="Aggregated Status" value="aggregated_status" />  }
                {is_admin === true &&<Workbook.Column label="Type" value="type" />  }
                {is_admin === true &&<Workbook.Column label="Date" value="date" />  }
                {is_admin === true &&<Workbook.Column label="Medium" value="medium" />  }
                {is_admin === true &&<Workbook.Column label="BL" value="bl" />  }
                {is_admin === true &&<Workbook.Column label="ETD" value="etd" />  }
                {is_admin === true &&<Workbook.Column label="Main POl" value="main_pol" />  }
                {is_admin === true &&<Workbook.Column label="Main Voyage" value="main_voyage" />  }
                {is_admin === true &&<Workbook.Column label="Main Pod" value="main_pod" />  }
                {is_admin === true &&<Workbook.Column label="Issuer" value="issuer" />  }
                {is_admin === true &&<Workbook.Column label="Team" value="team" />  }
                {is_admin === true &&<Workbook.Column label="TAT Time" value="tat_time" />  }
                {is_admin === true &&<Workbook.Column label="Last Pod" value="last_pod" />  }
                {is_admin === true &&<Workbook.Column label="Shipper Coder" value="shipper_coder" />  }
                {is_admin === true &&<Workbook.Column label="MR Code" value="mr_code" />  }
                {is_admin === true &&<Workbook.Column label="Audit sheet" value="audit_sheet" />  }
                <Workbook.Column label="Exception" value="exception" />
                {/* <Workbook.Column label="Shipment_type" value="shipment_type" /> */}
                <Workbook.Column label="MTD type" value="mtd_type" />
                <Workbook.Column label="HBL" value="hbl" />
                <Workbook.Column label="I have read and processed the shipment as per the above requirements" value="read" />
                <Workbook.Column label="Draft Sent" value="draft" />
                <Workbook.Column label="SDC Y" value="sdc" />
                <Workbook.Column label="Free Time Checked" value="free_time" />
                <Workbook.Column label="Credit Check" value="credit" />
                                
              </Workbook.Sheet> 
            </Workbook>
         
    
          );
      }
      async onPasteS8100() {
        clipboard.readText().then((text)=>{
        var record = getValue_S8100(text)
        console.log("kjbkj " , JSON.stringify(record))
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
        console.log("kjbkj " , JSON.stringify(record))
        this.setState({
            paste_data:text,
            shipment_no:record.shipment_no,
            mtd_number:record.mtd_number,
            customer:record.customer,
            issuer:record.issuer,
            main_pod:record.main_pod,
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
            pod_end:record.pod_end,
            last_pod:record.last_pod,
            })
            if(record.issuer !== "")
            {
                this.getteamvalue(record.issuer)
            }
            createNotification('Please Wait to load Requirement','success','filled')
            setTimeout(() =>{
                // this.searchTeamSite()
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
    } 
    onChangestart(value)
    {
        this.setState({date:value})
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
        const{loading,user_id,collapse,start_time,end_time, time,time_taken,consignee,mtd_number,customer,doc_cutoff,aggregated_status,type,date,isDataPasted,
            medium,shipment_no,bl,etd,main_pol,main_voyage,main_pod,issuer,team,tat_time,last_pod,shipper_coder,mr_code,audit_sheet,exception,mtd_type,hbl,rutinvoicecount,rutinvoicecountlast,
            read,draft,sdc,free_time,credit,teamdata,is_search,is_admin,is_submit,origin_requirements,country_requirements,customer_requirements}=this.state
        const {match,locale,languageData,username} = this.props
        return (
            <>
            <title>{onChangeLanguage(locale,'RUT, Invoice & SDC',languageData)}</title>
             {loading && 
            <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
            </div>
            }
            <Row>
              <Colxx xxs="12">
               
                <div className = "row">
                      <div className = "col-md-8">
                      <Breadcrumb heading={onChangeLanguage(locale,'RUT, Invoice & SDC',languageData)} match={match} />
                        
                    </div>
                    <div className = "col-md-2" >
                        <h2 style = {{marginTop:'15px'}}>Total EQ : {rutinvoicecount}</h2>
                        </div>
                        <div className = "col-md-2">
                            <h2  style = {{marginTop:'15px'}}>Last EQ : {rutinvoicecountlast}</h2>
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
                    <div className = "col-lg-2-0 space-margin">
                    <Label  className = "fontstyle normal-font" ><a >{onChangeLanguage(locale,'User ID',languageData)}</a><br></br> 
                    {is_search ? user_id : username}</Label>
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                        <Label  className = "fontstyle normal-font" ><a >{onChangeLanguage(locale,'Start Date Time',languageData)}</a><br></br> 
                        { moment(start_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                           
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                        <Label  className = "fontstyle normal-font" ><a >{onChangeLanguage(locale,'End Date Time',languageData)}</a><br></br>{end_time!==''&& moment(end_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>

                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Time',languageData)}</Label>
                            <Input className = {is_submit === true && time === ''?  "error-border-paste":"fontstyle text-background-paste" }    
                              placeholder = 'hh:mm:ss AM/PM'
                              type = 'time'
                              value = {time}   
                              disabled={isDataPasted} 
                            onChange= {(e)=>this.setState({time : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                        <Label  className = "fontstyle normal-font" ><a >{onChangeLanguage(locale,'Time Taken',languageData)}</a><br></br>{time_taken}</Label>
                          
                        </div>
                       
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Shipment Number',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && shipment_no === ''?  "error-border-paste":"fontstyle text-background-paste" }     
                            placeholder = ''
                            value = {shipment_no}  
                            disabled={isDataPasted} 
                            onChange= {(e)=>this.setState({shipment_no : e.target.value})} 
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
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'MTD Number',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && mtd_number === ''?  "error-border-paste":"fontstyle text-background-paste" }     
                            placeholder = ''
                            value = {mtd_number} 
                            disabled={isDataPasted} 
                            onChange= {(e)=>this.setState({mtd_number : e.target.value})} 
                            />
                        </div>
                       
                        
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Customer',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && customer === ''?  "error-border-paste":"fontstyle text-background-paste" }     
                            placeholder = ''
                            value = {customer}  
                            disabled={isDataPasted}
                            onChange= {(e)=>this.setState({customer : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Doc Cut-Off',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                           
                             <a className = 'fontstyle mandatory-label'>
                                {is_submit === true && doc_cutoff === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>
                              <DatePickerDate
                                 selected={doc_cutoff}
                                 className = "text-background-paste" 
                                 disabled={isDataPasted}
                                 onChange={(date) => this.setState({doc_cutoff:date})}
                                 />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Aggregated Status',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && aggregated_status === ''?  "error-border-paste":"fontstyle text-background-paste" }     
                            placeholder = ''
                            value = {aggregated_status}  
                            onChange= {(e)=>this.setState({aggregated_status : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Type',languageData)}
                            <a style = {{color :'red'}}>*</a>
                           </Label>
                            <Input  className = {is_submit === true && type === ''?  "error-border-paste":"fontstyle text-background-paste" }     
                            placeholder = ''
                            value = {type}  
                            disabled={isDataPasted}
                            onChange= {(e)=>this.setState({type : e.target.value})} 
                            />
                        </div>
                
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Date',languageData)}
                              <a style = {{color :'red'}}>*</a></Label>
                               <p1 className = 'fontstyle mandatory-label'>
                                {is_submit === true && date === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                              <DatePickerDate
                                 selected={date}
                                 className = "text-background-paste"
                                 disabled={isDataPasted} 
                                 onChange={(date) => this.onChangestart(date)}
                                 />
                                
                        </div>


                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Medium',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && medium === ''?  "error-border-paste":"fontstyle text-background-paste" }     
                            placeholder = ''
                            value = {medium}  
                            disabled={isDataPasted}
                            onChange= {(e)=>this.setState({medium : e.target.value})} 
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
                                 disabled={isDataPasted}
                                 onChange={(date) => this.setState({etd:date})}
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
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Main POD',languageData)} 
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
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Team',languageData)}
                                <a style = {{color :'red'}}>*</a>
                                {is_submit === true && team=== '' &&   <p className = 'fontstyle mandatory-label'> {onChangeLanguage(locale,'Mandatory Field',languageData)} </p>}
                                <br></br>{team !== "" &&  getValue(teamdata,'value','label',team)}
                                </Label>
                            
                        </div>
                        
                        <div className = "col-lg-2-0 space-margin">
                        <Label  className = "fontstyle normal-font" ><a >
                        {onChangeLanguage(locale,'TAT Time',languageData)}</a><br></br> {tat_time}</Label>

                        </div>
                       
                       
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'Shipper Coder',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && shipper_coder === ''?  "error-border-paste":"fontstyle text-background-paste" }     
                            placeholder = ''
                            value = {shipper_coder}  
                            disabled={shipper_coder !== ''}
                            onChange= {(e)=>this.setState({shipper_coder : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'MR Code',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && mr_code === ''?  "error-border-paste":"fontstyle text-background-paste" }     
                            placeholder = ''
                            value = {mr_code}  
                            disabled={mr_code !== ''}
                            onChange= {(e)=>this.setState({mr_code : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Last POD',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && last_pod === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                            placeholder = ''
                            value = {last_pod}  
                            disabled={isDataPasted}
                            onChange= {(e)=>this.setState({last_pod : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Consignee',languageData)}</Label>
                            <Input  className = "text-background-paste"  
                            placeholder = ''
                            value = {consignee} 
                            disabled={consignee !== ''} 
                            onChange= {(e)=>this.setState({consignee: e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                          
                          <div  style = {{marginTop:'20px'}}> 
                           <Checkbox color="blue" checked = {audit_sheet === true} onChange = {()=>this.setState({audit_sheet:!audit_sheet})}> 
                               <Label style = {{marginLeft:'7px'}} className = "fontstyle normal-font" >{onChangeLanguage(locale,'Audit Sheet',languageData)}</Label>
                           </Checkbox>
                           </div>
                   </div>
                    </div>
                    </Collapse>
               </div>   
               <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'15px'}}>
               <div className = "row">
                        <div className = "col-md-2 radiobut">
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Exception',languageData)}  </Label>
                        <p className = 'fontstyle mandatory-label'></p>
                            <div style = {{margin:'10px 0px'}}>
                                <Row>
                                    <Colxx xxs="4">
                                        <CustomRadioButton checked  = "Yes" name = {onChangeLanguage(locale,'Yes',languageData)} value = {exception} 
                                            onChangeRadio={(value)=>this.setState({exception:value})}/>
                                       
                                    </Colxx>
                                    <Colxx xxs="4">
                                     <CustomRadioButton checked  = "No" name = {onChangeLanguage(locale,'No',languageData)} value = {exception} 
                                            onChangeRadio={(value)=>this.setState({exception:value})}/>
                                        
                                    </Colxx>
                                </Row>
                            </div>   
                        </div>
                       
{/*                        
                        <div className = "col-md-3 radiobut">
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Shipment Type',languageData)}<a style = {{color :'red'}}>*</a> </Label>
                        <p className = 'fontstyle mandatory-label'>{is_submit === true && shipment_type === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p>
                            <div style = {{margin:'10px 0px'}}>
                                <Row>
                                    <Colxx xxs="3">
                                        <CustomRadioButton checked  = "DG" name = "DG" value = {shipment_type} 
                                            onChangeRadio={(value)=>this.setState({shipment_type:value})}/>
                                       
                                    </Colxx>
                                    <Colxx xxs="3">
                                     <CustomRadioButton checked  = "Reefer" name = "Reefer" value = {shipment_type} 
                                            onChangeRadio={(value)=>this.setState({shipment_type:value})}/>
                                        
                                    </Colxx>
                                    <Colxx xxs="3">
                                     <CustomRadioButton checked  = "Normal" name = "Normal" value = {shipment_type} 
                                            onChangeRadio={(value)=>this.setState({shipment_type:value})}/>
                                        
                                    </Colxx>
                                </Row>
                            </div>   
                        </div>
                         */}
                        <div className = "col-md-4 radiobut">
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'MTD Type',languageData)}  </Label>
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
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'HBL',languageData)} </Label>
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
                    <Row>
                            <Colxx xxs="7" style = {{marginTop:'10px'}}>
                                <Label  className = "fontstyle" 
                                style = {{fontWeight:700,fontSize:'15px'}}>
                                    {onChangeLanguage(locale,'Customer Requirement ',languageData)}</Label> : 
                                    {issuer !== '' && <Label  className = "fontstyle" style = {{fontSize:'14px',color:''}}> *For {issuer} Based Requirements</Label>}

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
                                > {onChangeLanguage(locale,'Search',languageData)}
                                 <i className="simple-icon-magnifier" style = {{fontSize:'15px',marginLeft:'45px'}} />
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
                                                    style={{ fontWeight: 700, fontSize: '15px' }}>{onChangeLanguage(locale, 'Country Requirements - (Source - ', languageData) + getCountryName('', last_pod, main_pod, teamdata) + ')'}</Label>

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
                  </div>

                      
                {/* <div className = "row" style = {{marginBottom:'15px'}}>
                      <div className = "col-md-4 text-center" style = {{padding:'0px 5px',borderRight:'1px solid gray'}}><Label  className = "fontstyle small-font">Chennai Requirement Last Update    : 03/12/2020 - 6:33 PM</Label></div>
                      <div className = "col-md-4 text-center" style = {{padding:'0px 5px',borderRight:'1px solid gray'}}><Label  className = "fontstyle small-font">Mumbai Requirement Last Update     : 03/12/2020 - 6:33 PM</Label></div>
                      <div className = "col-md-4 text-center" style = {{padding:'0px 5px'}}><Label  className = "fontstyle small-font">Shanghai Requirement Last Update   : 03/12/2020 - 6:33 PM</Label></div>
                </div>   */}
                <ul className = "ul-list-style ultext-center" style = {{marginBottom:'15px'}}>
                <a style = {{color :'red'}}>*</a> 
                        <li style = {{margin:'0px 5px'}}>
                            <a  className = {is_submit === true && read === false?  "error-border":"fontstyle text-background" } style = {{padding:'7px 5px',fontSize:'12px',width:'100%'}}>
                                <Checkbox color="blue" style = {{marginRight:'6px'}}                                
                                checked = {read === true} onChange = {()=>this.setState({read:!read})} > 
                                <a style = {{marginLeft:'2px'}}>
                                {onChangeLanguage(locale,'I have read and processed the shipment as per the above requirements',languageData)}
                              
                                </a>
                                </Checkbox>
                                
                                
                            </a>
                        </li>
                        <li style = {{margin:'0px 5px'}}>
                            <a className='fontstyle text-background' style = {{ padding:'7px 5px',fontSize:'12px',width:'100%'}}>
                             <Checkbox color="blue" style = {{marginRight:'6px'}} checked = {draft === true} onChange = {()=>this.setState({draft:!draft})}> 
                            <a style = {{marginLeft:'2px'}}>{onChangeLanguage(locale,'Draft Sent',languageData)}
                            </a>
                            </Checkbox>
                        </a></li>
                        <li style = {{margin:'0px 5px'}} > 
                            <a className='fontstyle text-background' style = {{ padding:'7px 5px',fontSize:'12px',width:'100%'}}>
                            <Checkbox color="blue" style = {{marginRight:'6px'}}checked = {sdc === true} onChange = {()=>this.setState({sdc:!sdc})} > 
                            <a style = {{marginLeft:'2px'}}>{onChangeLanguage(locale,'SDC Y',languageData)}
                            </a>
                            </Checkbox>
                        </a></li>
                        <li style = {{margin:'0px 5px'}} >
                        <a className='fontstyle text-background' style = {{ padding:'7px 5px',fontSize:'12px',width:'100%'}}>
                            <Checkbox color="blue" style = {{marginRight:'6px'}} checked = {free_time === true} onChange = {()=>this.setState({free_time:!free_time})}> 
                            <a style = {{marginLeft:'2px'}}> {onChangeLanguage(locale,'Free Time Checked',languageData)}
                            </a>
                            </Checkbox>
                        </a>
                        </li>
                        <li style = {{margin:'0px 5px'}} >
                        <a className='fontstyle text-background' style = {{ padding:'7px 5px',fontSize:'12px',width:'100%'}}>
                            <Checkbox color="blue" style = {{marginRight:'6px'}} checked = {credit === true} onChange = {()=>this.setState({credit:!credit})}> 
                            <a style = {{marginLeft:'2px'}}>{onChangeLanguage(locale,'Credit Check',languageData)}
                           </a>
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
                                >{onChangeLanguage(locale,'Find',languageData)}
                                
                            </Button>
                       <Button className = "button-width" color="primary"  
                                onClick={()=>this.onSubmit()}
                                >
                                {onChangeLanguage(locale,'Save',languageData)}
                            </Button>
                        
                       <Button className = "button-width" color="secondary"  
                            onClick={()=>this.clearvalue()}
                    >
                     {onChangeLanguage(locale,'Refresh',languageData)}
                    </Button>     
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







// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import {  withRouter } from 'react-router-dom';
// import { Row } from 'reactstrap';
// import { Label,Input,Button,Collapse} from 'reactstrap';
// import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
// import Breadcrumb from '../../../../containers/navs/Breadcrumb';
// import { Checkbox} from 'antd';
// import{issuecodeService} from '../../../../redux/Export/masters/issuercode/saga';
// import CustomRadioButton from '../../../RadioButton'
// import {onChangeLanguage,getTimeDifference,permittedusers,getValue,convertLocalToUTCDate,getCountryName} from '../../../../helper'
// import{RutService} from '../../../../redux/Export/Rutinvoice/saga'
// import { createNotification } from '../../../../toast';
// import Loading from "react-fullscreen-loading";
// import{teamService} from '../../../../redux/Export/masters/exportteam/saga'
// import moment from 'moment';
// import Workbook from 'react-excel-workbook'
// import{roleService} from '../../../../redux/role/saga'
// import {getValue_D1040,getValue_S8100} from '../../pasteData'
// import * as clipboard from "clipboard-polyfill/text";
// import DatePickerDate from "../../datePickerDate";
// import{teamsiteService} from '../../../../redux/Export/masters/teamsite/saga';
// import{reportService} from '../../../../redux/Export/report/saga';
// import Tabs from 'react-bootstrap/Tabs';
// import Tab from 'react-bootstrap/Tab';


// class Sidebar extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         loading:false,
//         user_id:'',
//         start_time:new Date(),
//         updated_start_time:new Date(),
//          end_time:'', 
//         time:'',
//         time_taken:'',
//         no_of_container:'',
//         no_of_cargoitem:'',
//         mtd_number:'',
//         customer:'',
//         doc_cutoff:'',
//         aggregated_status:'',
//         type:'',
//         date:'',
//         medium:'',
//         shipment_no:'',
//         bl:'',
//         etd:'',
//         main_pol:'',
//         main_voyage:'',
//         main_pod:'',
//         issuer:'',
//         team:'',
//         tat_time:'',
//         last_pod:'',
//         shipper_coder:'',
//         mr_code:'',
//         consignee: '',
//         audit_sheet:false,
//         exception:'',
//         shipment_type:'',
//         mtd_type:'',
//         hbl:'',
//         read:false,
//         draft:false,
//         sdc:false,
//         free_time:false,
//         credit:false,
//         teamdata:[],
//         collapse:false,
//         is_search:false,
//         is_admin:false,
//         data:[],
//         team_data:[],
//         issuecode_data:[],
//         is_submit:false,
//         rut_invoice_sdc:'',
//         origin_requirements : [],
//         country_requirements : [],
//         customer_requirements : [],
//         teamsite_data:[],
//         rutinvoicecount:'',
//         rutinvoicecountlast:'',

//       };
//     }
//     componentDidMount() {
        
//        this.fetchteam() 
//        this.fetchroleData()
//        this.fetchIssueCodeData()
//        this.fetchteamsite()
//        this.fetchRutinvoiceCount()
//     }
//     fetchRutinvoiceCount(){
//       this.setState({loading:true})
//       const {username} = this.props
//       console.log(username)
//       RutService.fetchrutinvoicecount(username)
//       .then((res) => {
//          if(res.status)   { 
//                 let filterstatus = res.data;
//                 let lastdata = res.lastcount;
//                 this.setState({ 
//                   rutinvoicecount:filterstatus, 
//                   rutinvoicecountlast:lastdata     
//                 }) 
//                }
//                else{
//                this.setState({loading:false})}
//                })
//                .catch((error) => { }); 
//                this.setState({loading:false})
  
//   }
//     fetchIssueCodeData() {  
//         this.setState({
//           loading : true
//         })
//         issuecodeService.fetchissuecode()
//           .then((res) => { 
//             this.setState({   
//           loading : false 
                  
//             }) 
//             if(res.status)
//               {
//                 this.setState({ 
//                   issuecode_data:res.data  , 
                           
//                 }) 
//               }   
//         })
//         .catch((error) => { 
//           this.setState({
//             loading : false
//           })
//           });   
//      }
   
//     fetchroleData() {  
//         this.setState({
//           loading : true
//         })
//         roleService.fetchroleData()
//           .then((res) => { 
//             this.setState({   
//             loading : false 
                  
//             }) 
//             if(res.status)
//               {
//                 var role_id = localStorage.getItem("role_id")
//                 let isadmin =permittedusers(res.data,role_id)
//                this.setState({
//                    is_admin:isadmin
//                })
//               }            
        
//         })
//         .catch((error) => { 
//           this.setState({
//             loading : false
//           })
//           });   
//      }
//     fetchteam() {
//         this.setState({
//             loading : true
//           })
//         teamService.fetchteams()
//         .then((res) => {
//             this.setState({loading:false})
//            if(res.status)   { 
//               let filterstatus = (res.data).filter(item => item.status === 1)
//                  var teamlist = filterstatus.map(function(cusmaidid) {
//                       return  {label : cusmaidid.team_name ,value : (cusmaidid.id).toString(),country_code : cusmaidid.country_code};
//                    }); 
                   
//                     this.setState({
//                     teamdata :  teamlist
//                     })
//                  }
                
//                  })
//                  .catch((error) => { 
//                     this.setState({
//                         loading : false
//                       })
//                  }); 
//      } 

//      fetchteamsite() {
//         this.setState({
//             loading : true
//           })
//           teamsiteService.fetchteamsite()
//         .then((res) => {
//             this.setState({loading:false})
//            if(res.status)   { 
//               let filterstatus = (res.data).filter(item => item.status === 1)  
//                     this.setState({
//                         teamsite_data :  filterstatus,
//                     })
//                  }
                
//                  })
//                  .catch((error) => { 
//                     this.setState({
//                         loading : false
//                       })
//                  }); 
//      } 

//     onChangeFileUpload(files)
//       {
//         const {username}=this.props
//         this.setState({
//           loading : true
//         })
//         RutService.fileUpload(files[0],username)
//           .then((res) => { 
//             if(res.status)
//             {
//               this.setState({
//                 loading : false
//               })
//               if(res.data.status)   
//               {   
             
//                 createNotification('Uploaded','success','filled')
                
//               }    
//               else{
//                 this.setState({
//                   loading : false
//                 })
//                 createNotification(res.data.message,'error','filled')
//               }
//             }
              
        
//         })
//         .catch((error) => { 
//           this.setState({
//             loading : false
//           })
//           });
//       }
//       setCollapse() 
//       {
       
//         this.setState({
//             collapse:!this.state.collapse
//         })
//       }
//       fetchData() {
//         const {mtd_number} = this.state 
//         if(mtd_number !== "")
//         {
//             this.setState({
//                 loading : true
//             })
//             RutService.fetchIndividualRut(mtd_number)
//             .then((res) => {
               
//                 this.setState({loading:false})
//                 this.clearvalue()
//             if(res.status)   { 
//                 this.setValue(res.data)
//              }
//              else
//              {
//                 createNotification(res.message,'error','filled');
//              }
                    
//                     })
//                     .catch((error) => { 
//                         this.setState({
//                             loading : false
//                         })
//                     });
//         }
//         else
//         {
//           createNotification('Please Enter Mtd Number','error','filled')
//         }
//      }
//      validDate(date,title)
//      {
//         var date_value = '',isfill = false
//          if(date && date !== null && date !== '')
//          {
            
//             var end_date =  new Date(date)
//             if (Object.prototype.toString.call(end_date) === "[object Date]") {
//                 if (isNaN(end_date.getTime())) 
//                 { 
//                     console.log("date is not valid")
//                 } 
//                 else 
//                 {
//                     date_value = end_date
//                     console.log("date is valid")
//                     isfill = true
//                 }
//               } else 
//               {
//                  console.log("not a date")
//               }

//          }
//          if(isfill === false)
//          {
//             createNotification(`Please Enter ${title} (MM/DD/YYYY)`,'error','filled') 
//          }
 
//          return date_value

//      }
//      validTime(timess,title){
//         var timevalue = '', isfill=true;
//         if(timess && timess !== null && timess !== '')
//         {
//             console.log("kjgkjgkj " ,timess)
//             var isvalid = moment(timess, ["h:mm:ss A"]).format("HH:mm:ss");
//             console.log("kjgkjgkj " ,isvalid)
//             if(isvalid !== 'Invalid date')
//             {
//                 timevalue = isvalid
//             }
//             else
//             {
//                 isfill = false 
//             }

//             if(isfill === false)
//             {
//                 createNotification(`Please Enter ${title} (hh:mm:ss AM/PM)`,'error','filled') 
//             }
//       }
//         return timevalue
    
//     }
//       setValue(record)
//       {
          
//           if(record !== null && record)
//           {
//             this.setState({
//                 user_id:record.user_id,
//                 start_time:record.start_time,
//                 end_time:record.end_time, 
//                 time:record.time,
//                 time_taken:record.time_taken,
//                 no_of_container:record.no_of_container,
//                 no_of_cargoitem:record.no_of_cargoitem,
//                 mtd_number:record.mtd_number,
//                 customer:record.customer,
//                 doc_cutoff:this.validDate(record.doc_cutoff,'Doc Cut-Off'),
//                 aggregated_status:record.aggregated_status,
//                 type:record.type,
//                 date:this.validDate(record.date,'Date'),
//                 medium:record.medium,
//                 shipment_no:record.shipment_no,
//                 bl:record.bl,
//                 etd:this.validDate(record.etd,'ETD'),
//                 main_pol:record.main_pol,
//                 main_voyage:record.main_voyage,
//                 main_pod:record.main_pod,
//                 issuer:record.issuer,
//                 team:record.team,
//                 tat_time:record.tat_time,
//                 consignee:record.consignee,
//                 last_pod:record.last_pod,
//                 shipper_coder:record.shipper_coder,
//                 mr_code:record.mr_code,
//                 audit_sheet:record.audit_sheet,
//                 exception:record.exception,
//                 shipment_type:record.shipment_type,
//                 mtd_type:record.mtd_type,
//                 hbl:record.hbl,
//                 read:record.read,
//                 draft:record.draft,
//                 sdc:record.sdc,
//                 free_time:record.free_time,
//                 credit:record.credit,
//                 is_search:true,
//               })
//           }  setTimeout(() =>{
//             this.searchTeamSite()
//      }, 500);

 
//       } 
//       clearvalue()
//       {
        
//           this.setState({
//             user_id:'',
//             start_time:new Date(),
//             end_time:'', 
//             time:'',
//             time_taken:'',
//             no_of_container:'',
//             no_of_cargoitem:'',
//             mtd_number:'',
//             customer:'',
//             doc_cutoff:'',
//             aggregated_status:'',
//             type:'',
//             date:'',
//             medium:'',
//             shipment_no:'',
//             bl:'',
//             etd:'',
//             main_pol:'',
//             main_voyage:'',
//             main_pod:'',
//             issuer:'',
//             consignee : '',
//             team:'',
//             tat_time:'',
//             last_pod:'',
//             shipper_coder:'',
//             mr_code:'',
//             audit_sheet:false,
//             exception:'',
//             shipment_type:'',
//             mtd_type:'',
//             hbl:'',
//             read:false,
//             draft:false,
//             sdc:false,
//             free_time:false,
//             credit:false,
//             is_search:false,
//             is_submit:false,
//             origin_requirements:[],
//             country_requirements:[],
//             customer_requirements:[],
//           })
//       } 


//       searchTeamSite()
//       {
//           const {issuer,shipper_coder,mr_code,consignee,customer,
//              teamdata,teamsite_data,last_pod,team,main_pod} = this.state
//               var country_code = ''
         
//              if(last_pod.trim() !== ''&& last_pod !== null)
//               {
//                  country_code = last_pod.substring(0, 2)
//               }
//               else if(main_pod.trim() !== ''&& main_pod !== null)
//               {
//                  country_code = main_pod.substring(0, 2)
//               }
             
//               console.log("lbkjbkj country_code = " , country_code)
//               console.log("lbkjbkj issuer = " , issuer)
//               console.log("lbkjbkj shipper_coder = " , shipper_coder)
//               console.log("lbkjbkj mr_code = " , mr_code)
//               console.log("lbkjbkj consignee = " , consignee)
//           if(country_code !== '' && issuer !== '')
//           {
//             var teams = getValue(teamdata,'value','label',team)
//             console.log("lbkjbkj teams = " , teams)
//              this.setState({
//                  loading : true,
//              })
//              var customer_title = getValue(teamsite_data,'team','customer',team),
//              origin_title = getValue(teamsite_data,'team','origin',team),
//              country_title = getValue(teamsite_data,'team','country',team)
//              reportService.fetchTeamSiteapi(teams,issuer,shipper_coder,mr_code,consignee,country_code,
//                 customer,customer_title,origin_title,country_title)
//              .then((res) => {
                
//                  this.setState({loading:false})
//                      if(res)  
//                       { 
//                           if(res.orgi)
//                           {
//                               this.setState({
//                                  origin_requirements :res.orgi
//                               })
//                           }
//                           if(res.cou)
//                           {
//                               this.setState({
//                                  country_requirements :res.cou
//                               })
//                           }
//                           if(res.cus)
//                           {
//                             var list = []
//                             const data = res.cus
//                             for(var i = 0; i < data.length;i++)
//                             {
//                                 var dict = data[i]
//                                 if((dict.MR !== null && dict.MR !== '') || (dict.CU !== null && dict.CU !== '') ||
//                                 (dict.CN !== null && dict.CN !== '') || (dict.SH !== null && dict.SH !== ''))
//                                 {
//                                     list.push(dict)
//                                 }
//                             }
//                             this.setState({
//                                 customer_requirements: list
//                             })
//                           }
//                      }
                     
                             
//              })
//              .catch((error) => { 
//                  this.setState({
//                      loading : false
//                  })
//              });   
//           }
//           else
//           {
//              createNotification(`Please Enter Mandatory Field`,'error','filled')   
//           }
 
//       }
//       onSubmit1() { 
//         const {start_time, time,no_of_container,audit_sheet,no_of_cargoitem,mtd_number,customer,doc_cutoff,aggregated_status,type,date,
//             medium,shipment_no,bl,etd,main_pol,main_voyage,main_pod,issuer,team,last_pod,shipper_coder,mr_code,exception,rutinvoicecount,rutinvoicecountlast,
//             shipment_type,mtd_type,hbl,read,draft,sdc,free_time,credit,is_admin,updated_start_time,consignee,rut_invoice_sdc} = this.state;

//             if(date !== "" && time !== "")
//             {
//                 tat_time  = getTimeDifference(start_time,new Date(date+" "+ time))
//             }
//             var is_fill = false
//             if(is_admin === true)
//             {
//                 if( mtd_number !== "" && customer !== "" && doc_cutoff !== "" && aggregated_status !== "" && type !== "" && 
//                 medium !== "" && shipment_no !== "" && bl !== "" && etd !== "" && main_pol !== "" && main_voyage !== "" && main_pod !== "" && issuer !== ""  && last_pod !== "" && 
//                 shipper_coder !== "" && mr_code !== "")
//                 {
//                     is_fill = true
//                 }
//             }
//             else
//             {
//                 if( shipment_no !== "" && shipper_coder !== '' && mr_code !== '')
//                 {
//                     is_fill = true
//                 }
//             }
//             if(is_fill === true)
//             {    
//                 const end_time =new Date() ,updated_end_time = new Date()
//                 const {username} = this.props
//                 var dates =(date !=='' && date !== null) ?  moment(date).format('MM/DD/YYYY') :''
//                 var etd_date =(etd !=='' && etd !== null) ?  moment(etd).format('MM/DD/YYYY')  :''
//                 var doc_cutoff_date= (doc_cutoff !=='' && doc_cutoff !== null) ? moment(doc_cutoff).format('MM/DD/YYYY') :''
//                 var time_taken = getTimeDifference(start_time,new Date())
//                 var tat_time = ''
//                 var rut_invoice_sdc_value = this.actionInput1;
//                 if(date !== "" && time !== "")
//                 {
//                     tat_time  = getTimeDifference(new Date(),new Date(dates+" "+ time))
//                 }
//                 this.setState({
//                     end_time:end_time,
//                     time_taken:time_taken,
//                     tat_time:tat_time,
//                     loading : true
//                   })
//                   RutService.createRut(username, time_taken,time,no_of_container,audit_sheet,no_of_cargoitem,mtd_number,customer,doc_cutoff_date,aggregated_status,type,dates,
//                     medium,shipment_no,bl,etd_date,main_pol,main_voyage,main_pod,issuer,team,tat_time,last_pod,shipper_coder,mr_code,exception,shipment_type,mtd_type,hbl,read,draft,sdc,free_time,credit,
//                     consignee,rut_invoice_sdc_value,
//                     convertLocalToUTCDate(start_time),
//                     convertLocalToUTCDate( end_time),
//                     convertLocalToUTCDate( updated_start_time),
//                     convertLocalToUTCDate(updated_end_time))
//                     .then((res) => { 
//                       this.setState({   
//                         loading : false     
//                       }) 
//                       if(res.status)
//                         {
//                           createNotification('Success','success','filled')
//                           this.clearvalue()
//                         }            
//                         else
//                         {
//                           createNotification(res.message,'error','filled');
//                         }  
//                   })
//                   .catch((error) => { 
//                     this.setState({
//                       loading : false
//                     })
//                 });
              
//             }
          
//         else
//         {
//             this.setState({
//                 is_submit:true
//             })
//           createNotification('Please fill mandatory field','error','filled')
//         }
//       }

//       onSubmit2() { 
//         const {start_time, time,no_of_container,audit_sheet,no_of_cargoitem,mtd_number,customer,doc_cutoff,aggregated_status,type,date,
//             medium,shipment_no,bl,etd,main_pol,main_voyage,main_pod,issuer,team,last_pod,shipper_coder,mr_code,exception,
//             shipment_type,mtd_type,hbl,read,draft,sdc,free_time,credit,is_admin,updated_start_time,consignee,rut_invoice_sdc} = this.state;
//             if(date !== "" && time !== "")
//             {
//                 tat_time  = getTimeDifference(start_time,new Date(date+" "+ time))
//             }
//             var is_fill = false
//             if(is_admin === true)
//             {
//                 if( mtd_number !== "" && customer !== "" && doc_cutoff !== "" && aggregated_status !== "" && type !== "" && 
//                 medium !== "" && shipment_no !== "" && bl !== "" && etd !== "" && main_pol !== "" && main_voyage !== "" && main_pod !== "" && issuer !== "" && team !== "" && last_pod !== "" && 
//                 shipper_coder !== "" && mr_code !== "")
//                 {
//                     is_fill = true
//                 }
//             }
//             else
//             {
//                 if( shipment_no !== "" && shipper_coder !== '' && mr_code !== '')
//                 {
//                     is_fill = true
//                 }
//             }
//             if(is_fill === true)
//             {    
//                 const end_time =new Date() ,updated_end_time = new Date()
//                 const {username} = this.props
//                 var dates =(date !=='' && date !== null) ?  moment(date).format('MM/DD/YYYY') :''
//                 var etd_date =(etd !=='' && etd !== null) ?  moment(etd).format('MM/DD/YYYY')  :''
//                 var doc_cutoff_date= (doc_cutoff !=='' && doc_cutoff !== null) ? moment(doc_cutoff).format('MM/DD/YYYY') :''
//                 var time_taken = getTimeDifference(start_time,new Date())
//                 var tat_time = ''
//                 var rut_invoice_sdc_value = this.actionInput2;
//                 if(date !== "" && time !== "")
//                 {
//                     tat_time  = getTimeDifference(new Date(),new Date(dates+" "+ time))
//                 }
//                 this.setState({
//                     end_time:end_time,
//                     time_taken:time_taken,
//                     tat_time:tat_time,
//                     loading : true
//                   })
//                   RutService.createRut(username, time_taken,time,no_of_container,audit_sheet,no_of_cargoitem,mtd_number,customer,doc_cutoff_date,aggregated_status,type,dates,
//                     medium,shipment_no,bl,etd_date,main_pol,main_voyage,main_pod,issuer,team,tat_time,last_pod,shipper_coder,mr_code,exception,shipment_type,mtd_type,hbl,read,draft,sdc,free_time,credit,
//                     consignee,rut_invoice_sdc_value,
//                     convertLocalToUTCDate(start_time),
//                     convertLocalToUTCDate( end_time),
//                     convertLocalToUTCDate( updated_start_time),
//                     convertLocalToUTCDate(updated_end_time))
//                     .then((res) => { 
//                       this.setState({   
//                         loading : false     
//                       }) 
//                       if(res.status)
//                         {
//                           createNotification('Success','success','filled')
//                           this.clearvalue()
//                         }            
//                         else
//                         {
//                           createNotification(res.message,'error','filled');
//                         }  
//                   })
//                   .catch((error) => { 
//                     this.setState({
//                       loading : false
//                     })
//                 });
              
//             }
          
//         else
//         {
//             this.setState({
//                 is_submit:true
//             })
//           createNotification('Please fill mandatory field','error','filled')
//         }
//       }
//       onSubmit3() { 
//         const {start_time, time,no_of_container,audit_sheet,no_of_cargoitem,mtd_number,customer,doc_cutoff,aggregated_status,type,date,
//             medium,shipment_no,bl,etd,main_pol,main_voyage,main_pod,issuer,team,last_pod,shipper_coder,mr_code,exception,
//             shipment_type,mtd_type,hbl,read,draft,sdc,free_time,credit,is_admin,updated_start_time,consignee,rut_invoice_sdc} = this.state;
//             if(date !== "" && time !== "")
//             {
//                 tat_time  = getTimeDifference(start_time,new Date(date+" "+ time))
//             }
//             var is_fill = false
//             if(is_admin === true)
//             {
//                 if( mtd_number !== "" && customer !== "" && doc_cutoff !== "" && aggregated_status !== "" && type !== "" && 
//                 medium !== "" && shipment_no !== "" && bl !== "" && etd !== "" && main_pol !== "" && main_voyage !== "" && main_pod !== "" && issuer !== "" && team !== "" && last_pod !== "" && 
//                 shipper_coder !== "" && mr_code !== "")
//                 {
//                     is_fill = true
//                 }
//             }
//             else
//             {
//                 if( shipment_no !== "" && shipper_coder !== '' && mr_code !== '')
//                 {
//                     is_fill = true
//                 }
//             }
//             if(is_fill === true)
//             {    
//                 const end_time =new Date() ,updated_end_time = new Date()
//                 const {username} = this.props
//                 var dates =(date !=='' && date !== null) ?  moment(date).format('MM/DD/YYYY') :''
//                 var etd_date =(etd !=='' && etd !== null) ?  moment(etd).format('MM/DD/YYYY')  :''
//                 var doc_cutoff_date= (doc_cutoff !=='' && doc_cutoff !== null) ? moment(doc_cutoff).format('MM/DD/YYYY') :''
//                 var time_taken = getTimeDifference(start_time,new Date())
//                 var tat_time = ''
//                 var rut_invoice_sdc_value = this.actionInput3;
//                 if(date !== "" && time !== "")
//                 {
//                     tat_time  = getTimeDifference(new Date(),new Date(dates+" "+ time))
//                 }
//                 this.setState({
//                     end_time:end_time,
//                     time_taken:time_taken,
//                     tat_time:tat_time,
//                     loading : true
//                   })
//                   RutService.createRut(username, time_taken,time,no_of_container,audit_sheet,no_of_cargoitem,mtd_number,customer,doc_cutoff_date,aggregated_status,type,dates,
//                     medium,shipment_no,bl,etd_date,main_pol,main_voyage,main_pod,issuer,team,tat_time,last_pod,shipper_coder,mr_code,exception,shipment_type,mtd_type,hbl,read,draft,sdc,free_time,credit,
//                     consignee,rut_invoice_sdc_value,
//                     convertLocalToUTCDate(start_time),
//                     convertLocalToUTCDate( end_time),
//                     convertLocalToUTCDate( updated_start_time),
//                     convertLocalToUTCDate(updated_end_time))
//                     .then((res) => { 
//                       this.setState({   
//                         loading : false     
//                       }) 
//                       if(res.status)
//                         {
//                           createNotification('Success','success','filled')
//                           this.clearvalue()
//                         }            
//                         else
//                         {
//                           createNotification(res.message,'error','filled');
//                         }  
//                   })
//                   .catch((error) => { 
//                     this.setState({
//                       loading : false
//                     })
//                 });
              
//             }
          
//         else
//         {
//             this.setState({
//                 is_submit:true
//             })
//           createNotification('Please fill mandatory field','error','filled')
//         }
//       }
     
//       renderTemplate()
//       {
//         const {languageData,locale} = this.props
//         const {data,is_admin,teamdata} = this.state
//         var array = data.map(record=> {
//               return {
//                 'user_id':record.user_id,
//                 'start_time':record.start_time,
//                 'end_time':record.end_time, 
//                 'time':record.time,
//                 'time_taken':record.time_taken,
//                 'mtd_number':record.mtd_number,
//                 'customer':record.customer,
//                 'doc_cutoff':record.doc_cutoff,
//                 'aggregated_status':record.aggregated_status,
//                 'type':record.type,
//                 'date':record.date,
//                 'medium':record.medium,
//                 'shipment_no':record.shipment_no,
//                 'bl':record.bl,
//                 'etd':record.etd,
//                 'main_pol':record.main_pol,
//                 'main_voyage':record.main_voyage,
//                 'main_pod':record.main_pod,
//                 'issuer':record.issuer,
//                 'team':getValue(teamdata,'value','label',record.team),
//                 'tat_time':record.tat_time,
//                 'last_pod':record.last_pod,
//                 'shipper_coder':record.shipper_coder,
//                 'mr_code':record.mr_code,
//                 'audit_sheet':record.audit_sheet,
//                 'exception':record.exception,
//                 // 'shipment_type':record.shipment_type,
//                 'mtd_type':record.mtd_type,
//                 'hbl':record.hbl,
//                 'read':record.read,
//                 'draft':record.draft,
//                 'sdc':record.sdc,
//                 'free_time':record.free_time,
//                 'credit':record.credit,
//             };
//           })
//           return(
            
//             <Workbook filename="RUT_Invoice.xlsx" element={
//               <Button className = "button-width" color="secondary"  style={{width:'150px'}}
//               >{ onChangeLanguage(locale,'Download',languageData)}  
//               </Button>
//               }>
//               <Workbook.Sheet data={array} name="Sheet A">
//               <Workbook.Column label="Shipment Number" value="shipment_no" />
//               <Workbook.Column label="User ID" value="user_id" />
//                 {/* <Workbook.Column label="Start Date Time" value="startdate" />
//                 <Workbook.Column label="End Date Time" value="end_time" />  */}
//                 {/* <Workbook.Column label="Time" value="time" /> */}
//                 {/* <Workbook.Column label="Time Taken" value="time_taken" /> */}
//                 <Workbook.Column label="No of Container" value="no_of_container" />
//                 <Workbook.Column label="No of Cargo Item" value="no_of_cargoitem" />
//                 {/* <Workbook.Column label="Shipment Number" value="shipment_no" /> */}
//                 {is_admin === true &&<Workbook.Column label="MTD Number" value="mtd_number" />  }
//                 {is_admin === true &&<Workbook.Column label="Customer" value="customer" />  }
//                 {is_admin === true &&<Workbook.Column label="Doc Cut-Off" value="doc_cutoff" />  }
//                 {is_admin === true &&<Workbook.Column label="Aggregated Status" value="aggregated_status" />  }
//                 {is_admin === true &&<Workbook.Column label="Type" value="type" />  }
//                 {/* {is_admin === true &&<Workbook.Column label="Date" value="date" />  } */}
//                 {is_admin === true &&<Workbook.Column label="Medium" value="medium" />  }
//                 {is_admin === true &&<Workbook.Column label="Numbers" value="numbers" />  }
//                 {is_admin === true &&<Workbook.Column label="BL" value="bl" />  }
//                 {is_admin === true &&<Workbook.Column label="ETD" value="etd" />  }
//                 {is_admin === true &&<Workbook.Column label="Main POl" value="main_pol" />  }
//                 {is_admin === true &&<Workbook.Column label="Main Voyage" value="main_voyage" />  }
//                 {is_admin === true &&<Workbook.Column label="Main Pod" value="main_pod" />  }
//                 {is_admin === true &&<Workbook.Column label="Issuer" value="issuer" />  }
//                 {is_admin === true &&<Workbook.Column label="Team" value="team" />  }
//                 {/* {is_admin === true &&<Workbook.Column label="TAT Time" value="tat_time" />  } */}
//                 {is_admin === true &&<Workbook.Column label="Last Pod" value="last_pod" />  }
//                 {is_admin === true &&<Workbook.Column label="Shipper Coder" value="shipper_coder" />  }
//                 {is_admin === true &&<Workbook.Column label="MR Code" value="mr_code" />  }
//                 {/* {is_admin === true &&<Workbook.Column label="Audit sheet" value="audit_sheet" />  } */}
//                 {/* <Workbook.Column label="Exception" value="exception" />
//                 <Workbook.Column label="Shipment Type" value="shipment_type" />
//                 <Workbook.Column label="MTD type" value="mtd_type" />
//                 <Workbook.Column label="HBL" value="hbl" />
//                 <Workbook.Column label="I have read and processed the shipment as per the above requirements" value="read" />
//                 <Workbook.Column label="Draft Sent" value="draft" />
//                 <Workbook.Column label="SDC Y" value="sdc" />
//                 <Workbook.Column label="Free Time Checked" value="free_time" />
//                 <Workbook.Column label="Credit Check" value="credit" />    */}
//                 {/* <Workbook.Column label="POD" value="pod" />
//                 <Workbook.Column label="Action Party" value="action_party" />
//                 <Workbook.Column label="Organization Code" value="organization_code" />
//                 <Workbook.Column label="MR" value="mr" />  */}
//                 <Workbook.Column label="Consignee" value="consignee" /> 
//                 <Workbook.Column label="RUT Invoice SDC" value="rut_invoice_sdc" /> 
//                 {/* <Workbook.Column label="Frob Shipment" value="frob_shipment" />             */}
//               </Workbook.Sheet> 
//             </Workbook>
         
    
//           );
//       }
//       async onPasteS8100() {
//         clipboard.readText().then((text)=>{
//         var record = getValue_S8100(text)
//         console.log("kjbkj " , JSON.stringify(record))
//         this.setState({
//             shipper_coder:record.shipper_coder,
//             mr_code:record.mr_code,
//             consignee:record.consignee

   
//             })
//             createNotification('Please Wait to load Requirement','success','filled')
//             setTimeout(() =>{
//                 this.searchTeamSite()
//             }, 500);
          
//         });
        
//     }
//       async onPasteD1040() {
//         clipboard.readText().then((text)=>{
//             var record = getValue_D1040(text)
//         console.log("kjbkj " , JSON.stringify(record))
//         this.setState({
//             paste_data:text,
//             shipment_no:record.shipment_no,
//             mtd_number:record.mtd_number,
//             customer:record.customer,
//             issuer:record.issuer,
//             main_pod:record.main_pod,
//             doc_cutoff:this.validDate(record.doc_cutoff,'Doc Cut-Off'),
//             aggregated_status:record.aggregated_status,
//             type:record.type,
//             date:this.validDate(record.date,'Date'),
//             time:this.validTime(record.time,'Time'),
//             medium:record.medium,
//             bl:record.bl,
//             etd:this.validDate(record.etd,'ETD'),
//             main_pol:record.main_pol,
//             main_voyage:record.main_voyage,
//             pod_end:record.pod_end,
//             last_pod:record.last_pod,
//             })
//             if(record.issuer !== "")
//             {
//                 this.getteamvalue(record.issuer)
//             }
//             createNotification('Please Wait to load Requirement','success','filled')
//             setTimeout(() =>{
//                 // this.searchTeamSite()
//         }, 500);
//         });
        
//     }
//       getteamvalue(value)
//     {
//        this.setState({
//            issuer : value,
//            team:getValue(this.state.issuecode_data,'issure_code','team',value)
//        })
//     } 
//     onChangestart(value)
//     {
//         this.setState({date:value})
//     }
//     handleKeypress (e) {
//         const characterCode = e.key
//         if (characterCode === 'Backspace') return
    
//         const characterNumber = Number(characterCode)
//         if (characterNumber >= 0 && characterNumber <= 9) {
//           if (e.currentTarget.value && e.currentTarget.value.length) {
//             return
//           } else if (characterNumber === 0) {
//             e.preventDefault()
//           }
//         } else {
//           e.preventDefault()
//         }
//       }
//     render()
//     {
//         const{loading,user_id,collapse,start_time,end_time, time,time_taken,consignee,mtd_number,customer,doc_cutoff,aggregated_status,type,date,
//             medium,shipment_no,bl,etd,main_pol,main_voyage,main_pod,issuer,team,tat_time,last_pod,shipper_coder,mr_code,audit_sheet,exception,mtd_type,hbl,
//             read,draft,sdc,free_time,credit,teamdata,is_search,is_admin,is_submit,origin_requirements,country_requirements,customer_requirements,rut_invoice_sdc}=this.state
//         const {match,locale,languageData,username} = this.props
//         return (
//             <>
//                  < defaultActiveKey="first">
//         <Tab eventKey="first" title={<h3>RUT</h3>}>
//         <Row>
//               <Colxx xxs="12">
               
//                <div><br />
//                                 <div className = "row">
//                        <div className = "col-md-8">
//                        {/* <Breadcrumb heading={onChangeLanguage(locale,'RUT, Invoice & SDC',languageData)} match={match} /> */}
                        
//                      </div>
//                      <div className = "col-md-2">
//                          <Button className = "button-width" color="primary" style= {{width :'100%'}}>
//                              <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
//                              <a style= {{margin :'0px'}} > Upload</a>
//                              <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
//                                 className = "filepicker_customButton"
//                                 style = {{width : '80%',marginLeft :'-56%'}}
//                                 accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
//                                     onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
//                         </Button>
//                     </div>
//                     <div className = "col-md-2" >
//                      {this.renderTemplate()}
//                      </div>
//                      <div className = "col-md-2" >
//                         <h2 style = {{marginTop:'15px'}}>Total EQ : {communicationcount}</h2>
//                         </div>
//                         <div className = "col-md-2">
//                             <h2  style = {{marginTop:'15px'}}>Last EQ : {communicationcountlast}</h2>
//                         </div>
//                    </div><br />
//             <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'15px'}}>
//                     <div className = "row">
//                     <div className = "col-lg-2-0 space-margin">
//                     <Label  className = "fontstyle normal-font" ><a >{onChangeLanguage(locale,'User ID',languageData)}</a><br></br> 
//                     {is_search ? user_id : username}</Label>
//                         </div>

//                         <input type="hidden" name="rut_invoice_sdc" value="rut" ref={(input) => { this.actionInput1 = 'rut' }} />
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Shipment Number',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && shipment_no === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {shipment_no}  
//                             onChange= {(e)=>this.setState({shipment_no : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                         {/* {is_admin === true && */}
//                         <Button
//                          style = {{marginTop:'20px'}}
//                         color="primary"
//                         onClick={() => this.setCollapse()}
//                         className="mb-1">
//                         <i className={collapse ? "simple-icon-minus" : "simple-icon-plus"}  />
//                     </Button>
//                     {/* } */}
//                     </div>
                        
//                 </div>
//                 <Collapse isOpen={collapse}>  
//                     <div className = "row">
//                     <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >
//                             {onChangeLanguage(locale,'MTD Number',languageData)}<a style = {{color :'red'}}>*</a></Label>
//                             <Input className = {is_submit === true && mtd_number === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {mtd_number}  
//                             onChange= {(e)=>this.setState({mtd_number : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >
//                             {onChangeLanguage(locale,'Customer',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && customer === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {customer}  
//                             onChange= {(e)=>this.setState({customer : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >
//                             {onChangeLanguage(locale,'Doc Cut-Off',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
                           
//                              <a className = 'fontstyle mandatory-label'>
//                                 {is_submit === true && doc_cutoff === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>
//                               <DatePickerDate
//                                  selected={doc_cutoff}
//                                  className = "text-background-paste" 
//                                  onChange={(date) => this.setState({doc_cutoff:date})}
//                                  />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >
//                             {onChangeLanguage(locale,'Aggregated Status',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && aggregated_status === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {aggregated_status}  
//                             onChange= {(e)=>this.setState({aggregated_status : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >
//                             {onChangeLanguage(locale,'Type',languageData)}
//                             <a style = {{color :'red'}}>*</a>
//                            </Label>
//                             <Input  className = {is_submit === true && type === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {type}  
//                             onChange= {(e)=>this.setState({type : e.target.value})} 
//                             />
//                         </div>
                
//                         <div className = "col-lg-2-0 space-margin"  >
//                             <Label  className = "fontstyle normal-font" >
//                               {onChangeLanguage(locale,'Date',languageData)}
//                               <a style = {{color :'red'}}>*</a></Label>
//                                <p1 className = 'fontstyle mandatory-label'>
//                                 {is_submit === true && date === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
//                               <DatePickerDate
//                                  selected={date}
//                                  className = "text-background-paste" 
//                                  onChange={(date) => this.onChangestart(date)}
//                                  />
                                
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Medium',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && medium === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {medium}  
//                             onChange= {(e)=>this.setState({medium : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'BL',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && bl === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {bl}  
//                             onChange= {(e)=>this.setState({bl : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'ETD',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <a className = 'fontstyle mandatory-label'>
//                                 {is_submit === true && etd === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>
//                               <DatePickerDate
//                                  selected={etd}
//                                  className = "text-background-paste" 
//                                  onChange={(date) => this.setState({etd:date})}
//                                  />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Main POL',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && main_pol === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {main_pol}  
//                             onChange= {(e)=>this.setState({main_pol : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Main Voyage',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && main_voyage === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {main_voyage}  
//                             onChange= {(e)=>this.setState({main_voyage : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Main POD',languageData)} 
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && main_pod === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {main_pod}  
//                             onChange= {(e)=>this.setState({main_pod : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Issuer',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && issuer === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {issuer}  
//                             onChange= {(e)=>this.getteamvalue(e.target.value)} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >
//                                 {onChangeLanguage(locale,'Team',languageData)}
//                                 <a style = {{color :'red'}}>*</a>
//                                 {is_submit === true && team=== '' &&   <p className = 'fontstyle mandatory-label'> {onChangeLanguage(locale,'Mandatory Field',languageData)} </p>}
//                                 <br></br>{team !== "" &&  getValue(teamdata,'value','label',team)}
//                                 </Label>
                            
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'Shipper Coder',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && shipper_coder === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {shipper_coder}  
//                             onChange= {(e)=>this.setState({shipper_coder : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'MR Code',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && mr_code === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {mr_code}  
//                             onChange= {(e)=>this.setState({mr_code : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Last POD',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && last_pod === ''?  "error-border-paste":"fontstyle text-background-paste" }  
//                             placeholder = ''
//                             value = {last_pod}  
//                             onChange= {(e)=>this.setState({last_pod : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Consignee',languageData)}</Label>
//                             <Input  className = "text-background-paste"  
//                             placeholder = ''
//                             value = {consignee}  
//                             onChange= {(e)=>this.setState({consignee: e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">

//                    </div>
//                     </div>
//                     </Collapse>
//                </div>   
                
//                 <div className = "row text-center" style = {{margin:'0px 5px'}}> 
//                         <Button className = "button-width" color="secondary"  
//                                 onClick={()=>this.onPasteD1040()}
//                                 >
//                                 {onChangeLanguage(locale,'Paste From D1040',languageData)}
//                             </Button>
//                             {/* <Button className = "button-width" color="primary"  
//                                 onClick={()=>this.fetchData()}
//                                 >{onChangeLanguage(locale,'Find',languageData)}
                                
//                             </Button> */}
//                        <Button className = "button-width" color="primary"  
//                                 onClick={()=>this.onSubmit1()}
//                                 >
//                                 {onChangeLanguage(locale,'Save',languageData)}
//                             </Button>
                        
//                        <Button className = "button-width" color="secondary"  
//                             onClick={()=>this.clearvalue()}
//                     >
//                      {onChangeLanguage(locale,'Refresh',languageData)}
//                     </Button>     
//              </div>
            
 
//  </div>
               
               
//               </Colxx>
//             </Row>
//         </Tab>
//         <Tab eventKey="second" title={<h3>Invoice</h3>}>
//         <Row>
//               <Colxx xxs="12">
//                 <div><br />
//               <div className = "row">
//                        <div className = "col-md-8">
//                        {/* <Breadcrumb heading={onChangeLanguage(locale,'RUT, Invoice & SDC',languageData)} match={match} /> */}
                        
//                      </div>
//                      <div className = "col-md-2">
//                          <Button className = "button-width" color="primary" style= {{width :'100%'}}>
//                              <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
//                              <a style= {{margin :'0px'}} > Upload</a>
//                              <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
//                                 className = "filepicker_customButton"
//                                 style = {{width : '80%',marginLeft :'-56%'}}
//                                 accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
//                                     onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
//                         </Button>
//                     </div>
//                     <div className = "col-md-2" >
//                      {this.renderTemplate()}
//                      </div>
//                    </div><br />
//                   <div>
//             <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'15px'}}>
//                     <div className = "row">
//                     <div className = "col-lg-2-0 space-margin">
//                     <Label  className = "fontstyle normal-font" ><a >{onChangeLanguage(locale,'User ID',languageData)}</a><br></br> 
//                     {is_search ? user_id : username}</Label>
//                         </div>
//                         <input type="hidden" name="rut_invoice_sdc" value="invoice" ref={(input) => { this.actionInput2 = 'invoice' }} />
                       
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Shipment Number',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && shipment_no === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {shipment_no}  
//                             onChange= {(e)=>this.setState({shipment_no : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                         {/* {is_admin === true && */}
//                         <Button
//                          style = {{marginTop:'20px'}}
//                         color="primary"
//                         onClick={() => this.setCollapse()}
//                         className="mb-1">
//                         <i className={collapse ? "simple-icon-minus" : "simple-icon-plus"}  />
//                     </Button>
//                     {/* } */}
//                     </div>
   
                        
//                 </div>
//                 <Collapse isOpen={collapse}>  
//                     <div className = "row">
//                     <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >
//                             {onChangeLanguage(locale,'MTD Number',languageData)}<a style = {{color :'red'}}>*</a></Label>
//                             <Input className = {is_submit === true && mtd_number === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {mtd_number}  
//                             onChange= {(e)=>this.setState({mtd_number : e.target.value})} 
//                             />
//                         </div>
                       
                        
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >
//                             {onChangeLanguage(locale,'Customer',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && customer === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {customer}  
//                             onChange= {(e)=>this.setState({customer : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >
//                             {onChangeLanguage(locale,'Doc Cut-Off',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
                           
//                              <a className = 'fontstyle mandatory-label'>
//                                 {is_submit === true && doc_cutoff === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>
//                               <DatePickerDate
//                                  selected={doc_cutoff}
//                                  className = "text-background-paste" 
//                                  onChange={(date) => this.setState({doc_cutoff:date})}
//                                  />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >
//                             {onChangeLanguage(locale,'Aggregated Status',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && aggregated_status === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {aggregated_status}  
//                             onChange= {(e)=>this.setState({aggregated_status : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >
//                             {onChangeLanguage(locale,'Type',languageData)}
//                             <a style = {{color :'red'}}>*</a>
//                            </Label>
//                             <Input  className = {is_submit === true && type === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {type}  
//                             onChange= {(e)=>this.setState({type : e.target.value})} 
//                             />
//                         </div>
                
//                         <div className = "col-lg-2-0 space-margin"  >
//                             <Label  className = "fontstyle normal-font" >
//                               {onChangeLanguage(locale,'Date',languageData)}
//                               <a style = {{color :'red'}}>*</a></Label>
//                                <p1 className = 'fontstyle mandatory-label'>
//                                 {is_submit === true && date === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
//                               <DatePickerDate
//                                  selected={date}
//                                  className = "text-background-paste" 
//                                  onChange={(date) => this.onChangestart(date)}
//                                  />
                                
//                         </div>


//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Medium',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && medium === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {medium}  
//                             onChange= {(e)=>this.setState({medium : e.target.value})} 
//                             />
//                         </div>
                       
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'BL',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && bl === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {bl}  
//                             onChange= {(e)=>this.setState({bl : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'ETD',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <a className = 'fontstyle mandatory-label'>
//                                 {is_submit === true && etd === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>
//                               <DatePickerDate
//                                  selected={etd}
//                                  className = "text-background-paste" 
//                                  onChange={(date) => this.setState({etd:date})}
//                                  />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Main POL',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && main_pol === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {main_pol}  
//                             onChange= {(e)=>this.setState({main_pol : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Main Voyage',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && main_voyage === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {main_voyage}  
//                             onChange= {(e)=>this.setState({main_voyage : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Main POD',languageData)} 
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && main_pod === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {main_pod}  
//                             onChange= {(e)=>this.setState({main_pod : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Issuer',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && issuer === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {issuer}  
//                             onChange= {(e)=>this.getteamvalue(e.target.value)} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >
//                                 {onChangeLanguage(locale,'Team',languageData)}
//                                 <a style = {{color :'red'}}>*</a>
//                                 {is_submit === true && team=== '' &&   <p className = 'fontstyle mandatory-label'> {onChangeLanguage(locale,'Mandatory Field',languageData)} </p>}
//                                 <br></br>{team !== "" &&  getValue(teamdata,'value','label',team)}
//                                 </Label>
                            
//                         </div>

//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'Shipper Coder',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && shipper_coder === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {shipper_coder}  
//                             onChange= {(e)=>this.setState({shipper_coder : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'MR Code',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && mr_code === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {mr_code}  
//                             onChange= {(e)=>this.setState({mr_code : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Last POD',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && last_pod === ''?  "error-border-paste":"fontstyle text-background-paste" }  
//                             placeholder = ''
//                             value = {last_pod}  
//                             onChange= {(e)=>this.setState({last_pod : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Consignee',languageData)}</Label>
//                             <Input  className = "text-background-paste"  
//                             placeholder = ''
//                             value = {consignee}  
//                             onChange= {(e)=>this.setState({consignee: e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                    </div>
//                     </div>
//                     </Collapse>
//                </div>   

                
//                 <div className = "row text-center" style = {{margin:'0px 5px'}}> 
//                         {/* <Button className = "button-width" color="secondary"  
//                                 onClick={()=>this.onPasteD1040()}
//                                 >
//                                 {onChangeLanguage(locale,'Paste From D1040',languageData)}
//                             </Button> */}
//                             {/* <Button className = "button-width" color="primary"  
//                                 onClick={()=>this.fetchData()}
//                                 >{onChangeLanguage(locale,'Find',languageData)}
                                
//                             </Button> */}
//                        <Button className = "button-width" color="primary"  
//                                 onClick={()=>this.onSubmit2()}
//                                 >
//                                 {onChangeLanguage(locale,'Save',languageData)}
//                             </Button>
                        
//                        <Button className = "button-width" color="secondary"  
//                             onClick={()=>this.clearvalue()}
//                     >
//                      {onChangeLanguage(locale,'Refresh',languageData)}
//                     </Button>     
//              </div>
            
 
//  </div>
//  </div>
//               </Colxx>
//             </Row>
//         </Tab>
//         <Tab eventKey="third" title={<h3>SDC</h3>}>
//         <Row>
//               <Colxx xxs="12">
//               <div><br />
//               <div className = "row">
//                        <div className = "col-md-8">
//                        {/* <Breadcrumb heading={onChangeLanguage(locale,'RUT, Invoice & SDC',languageData)} match={match} /> */}
                        
//                      </div>
//                      <div className = "col-md-2">
//                          <Button className = "button-width" color="primary" style= {{width :'100%'}}>
//                              <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
//                              <a style= {{margin :'0px'}} > Upload</a>
//                              <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
//                                 className = "filepicker_customButton"
//                                 style = {{width : '80%',marginLeft :'-56%'}}
//                                 accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
//                                     onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
//                         </Button>
//                     </div>
//                     <div className = "col-md-2" >
//                      {this.renderTemplate()}
//                      </div>
//                    </div>
//                <div><br />
//             <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'15px'}}>
//                     <div className = "row">
//                     <div className = "col-lg-2-0 space-margin">
//                     <Label  className = "fontstyle normal-font" ><a >{onChangeLanguage(locale,'User ID',languageData)}</a><br></br> 
//                     {is_search ? user_id : username}</Label>
//                         </div>
//                         <input type="hidden" name="rut_invoice_sdc" value="sdc" ref={(input) => { this.actionInput3 = 'sdc' }} />
                       
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Shipment Number',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && shipment_no === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {shipment_no}  
//                             onChange= {(e)=>this.setState({shipment_no : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                         <Button
//                          style = {{marginTop:'20px'}}
//                         color="primary"
//                         onClick={() => this.setCollapse()}
//                         className="mb-1">
//                         <i className={collapse ? "simple-icon-minus" : "simple-icon-plus"}  />
//                     </Button>

//                     </div>
                        
//                 </div>
//                 <Collapse isOpen={collapse}>  
//                     <div className = "row">
//                     <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >
//                             {onChangeLanguage(locale,'MTD Number',languageData)}<a style = {{color :'red'}}>*</a></Label>
//                             <Input className = {is_submit === true && mtd_number === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {mtd_number}  
//                             onChange= {(e)=>this.setState({mtd_number : e.target.value})} 
//                             />
//                         </div>
                       
                        
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >
//                             {onChangeLanguage(locale,'Customer',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && customer === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {customer}  
//                             onChange= {(e)=>this.setState({customer : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >
//                             {onChangeLanguage(locale,'Doc Cut-Off',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
                           
//                              <a className = 'fontstyle mandatory-label'>
//                                 {is_submit === true && doc_cutoff === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>
//                               <DatePickerDate
//                                  selected={doc_cutoff}
//                                  className = "text-background-paste" 
//                                  onChange={(date) => this.setState({doc_cutoff:date})}
//                                  />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >
//                             {onChangeLanguage(locale,'Aggregated Status',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && aggregated_status === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {aggregated_status}  
//                             onChange= {(e)=>this.setState({aggregated_status : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >
//                             {onChangeLanguage(locale,'Type',languageData)}
//                             <a style = {{color :'red'}}>*</a>
//                            </Label>
//                             <Input  className = {is_submit === true && type === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {type}  
//                             onChange= {(e)=>this.setState({type : e.target.value})} 
//                             />
//                         </div>
                
//                         <div className = "col-lg-2-0 space-margin"  >
//                             <Label  className = "fontstyle normal-font" >
//                               {onChangeLanguage(locale,'Date',languageData)}
//                               <a style = {{color :'red'}}>*</a></Label>
//                                <p1 className = 'fontstyle mandatory-label'>
//                                 {is_submit === true && date === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
//                               <DatePickerDate
//                                  selected={date}
//                                  className = "text-background-paste" 
//                                  onChange={(date) => this.onChangestart(date)}
//                                  />
                                
//                         </div>


//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Medium',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && medium === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {medium}  
//                             onChange= {(e)=>this.setState({medium : e.target.value})} 
//                             />
//                         </div>
                       
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'BL',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && bl === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {bl}  
//                             onChange= {(e)=>this.setState({bl : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'ETD',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <a className = 'fontstyle mandatory-label'>
//                                 {is_submit === true && etd === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>
//                               <DatePickerDate
//                                  selected={etd}
//                                  className = "text-background-paste" 
//                                  onChange={(date) => this.setState({etd:date})}
//                                  />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Main POL',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && main_pol === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {main_pol}  
//                             onChange= {(e)=>this.setState({main_pol : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Main Voyage',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && main_voyage === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {main_voyage}  
//                             onChange= {(e)=>this.setState({main_voyage : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Main POD',languageData)} 
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && main_pod === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {main_pod}  
//                             onChange= {(e)=>this.setState({main_pod : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Issuer',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && issuer === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {issuer}  
//                             onChange= {(e)=>this.getteamvalue(e.target.value)} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >
//                                 {onChangeLanguage(locale,'Team',languageData)}
//                                 <a style = {{color :'red'}}>*</a>
//                                 {is_submit === true && team=== '' &&   <p className = 'fontstyle mandatory-label'> {onChangeLanguage(locale,'Mandatory Field',languageData)} </p>}
//                                 <br></br>{team !== "" &&  getValue(teamdata,'value','label',team)}
//                                 </Label>
                            
//                         </div>
                        
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'Shipper Coder',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && shipper_coder === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {shipper_coder}  
//                             onChange= {(e)=>this.setState({shipper_coder : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'MR Code',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && mr_code === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {mr_code}  
//                             onChange= {(e)=>this.setState({mr_code : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Last POD',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && last_pod === ''?  "error-border-paste":"fontstyle text-background-paste" }  
//                             placeholder = ''
//                             value = {last_pod}  
//                             onChange= {(e)=>this.setState({last_pod : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Consignee',languageData)}</Label>
//                             <Input  className = "text-background-paste"  
//                             placeholder = ''
//                             value = {consignee}  
//                             onChange= {(e)=>this.setState({consignee: e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">

//                    </div>
//                     </div>
//                     </Collapse>
//                </div>   

//                 <div className = "row text-center" style = {{margin:'0px 5px'}}> 
//                         {/* <Button className = "button-width" color="secondary"  
//                                 onClick={()=>this.onPasteD1040()}
//                                 >
//                                 {onChangeLanguage(locale,'Paste From D1040',languageData)}
//                             </Button> */}
//                             {/* <Button className = "button-width" color="primary"  
//                                 onClick={()=>this.fetchData()}
//                                 >{onChangeLanguage(locale,'Find',languageData)}
                                
//                             </Button> */}
//                        <Button className = "button-width" color="primary"  
//                                 onClick={()=>this.onSubmit3()}
//                                 >
//                                 {onChangeLanguage(locale,'Save',languageData)}
//                             </Button>
                        
//                        <Button className = "button-width" color="secondary"  
//                             onClick={()=>this.clearvalue()}
//                     >
//                      {onChangeLanguage(locale,'Refresh',languageData)}
//                     </Button>     
//              </div>
            
 
//  </div>
               
//  </div>
//               </Colxx>
//             </Row>
//         </Tab>

//       </Tabs>
//             <title>{onChangeLanguage(locale,'RUT, Invoice & SDC',languageData)}</title>
//              {loading && 
//             <div>
//                 <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
//             </div>
//             }
//           </>
//         )
//     }
// }

// const mapStateToProps = ({ settings }) => {
//     const { locale,languageData,username} = settings;
//     return {locale, languageData,username};
//   };
//   export default withRouter(
//     connect(mapStateToProps, {

//    })(Sidebar)
//   );





//   old code -->
//   <>
//                  <Tabs defaultActiveKey="first">
//         <Tab eventKey="first" title={onChangeLanguage(locale,'RUT, Invoice & SDC',languageData)}>
//           Hii, I am 1st tab content
//         </Tab>
//         <Tab eventKey="second" title="Setting">
//           Hii, I am 2nd tab content
//         </Tab>
//         <Tab eventKey="third" title="Aboutus">
//           Hii, I am 3rd tab content
//         </Tab>
//       </Tabs>
//             <title>{onChangeLanguage(locale,'RUT, Invoice & SDC',languageData)}</title>
//              {loading && 
//             <div>
//                 <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
//             </div>
//             }
//             <Row>
//               <Colxx xxs="12">
               
//                 <div className = "row">
//                       <div className = "col-md-8">
//                       <Breadcrumb heading={onChangeLanguage(locale,'RUT, Invoice & SDC',languageData)} match={match} />
                        
//                     </div>
//                     <div className = "col-md-2">
//                         <Button className = "button-width" color="primary" style= {{width :'100%'}}>
//                             <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
//                             <a style= {{margin :'0px'}} > Upload</a>
//                             <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
//                                 className = "filepicker_customButton"
//                                 style = {{width : '80%',marginLeft :'-56%'}}
//                                 accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
//                                     onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
//                         </Button>
//                     </div>
//                     <div className = "col-md-2" >
//                     {this.renderTemplate()}
//                     </div>
//                   </div>
               
//                 <Separator className = "separator-margin"/>
//               </Colxx>
//             </Row>
//             <div>
//             <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'15px'}}>
//                     <div className = "row">
//                     <div className = "col-lg-2-0 space-margin">
//                     <Label  className = "fontstyle normal-font" ><a >{onChangeLanguage(locale,'User ID',languageData)}</a><br></br> 
//                     {is_search ? user_id : username}</Label>
//                         </div>
//                         {/* <div className = "col-lg-2-0 space-margin"  >
//                         <Label  className = "fontstyle normal-font" ><a >{onChangeLanguage(locale,'Start Date Time',languageData)}</a><br></br> 
//                         { moment(start_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                           
//                         </div>
//                         <div className = "col-lg-2-0 space-margin"  >
//                         <Label  className = "fontstyle normal-font" ><a >{onChangeLanguage(locale,'End Date Time',languageData)}</a><br></br>{end_time!==''&& moment(end_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>

//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Time',languageData)}</Label>
//                             <Input className = "" 
//                               placeholder = 'hh:mm:ss AM/PM'
//                               type = 'time'
//                               value = {time}   
//                             onChange= {(e)=>this.setState({time : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                         <Label  className = "fontstyle normal-font" ><a >{onChangeLanguage(locale,'Time Taken',languageData)}</a><br></br>{time_taken}</Label>
                          
//                         </div> */}
                       
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Shipment Number',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && shipment_no === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {shipment_no}  
//                             onChange= {(e)=>this.setState({shipment_no : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                         {/* {is_admin === true && */}
//                         <Button
//                          style = {{marginTop:'20px'}}
//                         color="primary"
//                         onClick={() => this.setCollapse()}
//                         className="mb-1">
//                         <i className={collapse ? "simple-icon-minus" : "simple-icon-plus"}  />
//                     </Button>
//                     {/* } */}
//                     </div>
                        
//                 </div>
//                 <Collapse isOpen={collapse}>  
//                     <div className = "row">
//                     <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >
//                             {onChangeLanguage(locale,'MTD Number',languageData)}<a style = {{color :'red'}}>*</a></Label>
//                             <Input className = {is_submit === true && mtd_number === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {mtd_number}  
//                             onChange= {(e)=>this.setState({mtd_number : e.target.value})} 
//                             />
//                         </div>
                       
                        
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >
//                             {onChangeLanguage(locale,'Customer',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && customer === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {customer}  
//                             onChange= {(e)=>this.setState({customer : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >
//                             {onChangeLanguage(locale,'Doc Cut-Off',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
                           
//                              <a className = 'fontstyle mandatory-label'>
//                                 {is_submit === true && doc_cutoff === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>
//                               <DatePickerDate
//                                  selected={doc_cutoff}
//                                  className = "text-background-paste" 
//                                  onChange={(date) => this.setState({doc_cutoff:date})}
//                                  />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >
//                             {onChangeLanguage(locale,'Aggregated Status',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && aggregated_status === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {aggregated_status}  
//                             onChange= {(e)=>this.setState({aggregated_status : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >
//                             {onChangeLanguage(locale,'Type',languageData)}
//                             <a style = {{color :'red'}}>*</a>
//                            </Label>
//                             <Input  className = {is_submit === true && type === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {type}  
//                             onChange= {(e)=>this.setState({type : e.target.value})} 
//                             />
//                         </div>
                
//                         <div className = "col-lg-2-0 space-margin"  >
//                             <Label  className = "fontstyle normal-font" >
//                               {onChangeLanguage(locale,'Date',languageData)}
//                               <a style = {{color :'red'}}>*</a></Label>
//                                <p1 className = 'fontstyle mandatory-label'>
//                                 {is_submit === true && date === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
//                               <DatePickerDate
//                                  selected={date}
//                                  className = "text-background-paste" 
//                                  onChange={(date) => this.onChangestart(date)}
//                                  />
                                
//                         </div>


//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Medium',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && medium === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {medium}  
//                             onChange= {(e)=>this.setState({medium : e.target.value})} 
//                             />
//                         </div>
                       
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'BL',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && bl === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {bl}  
//                             onChange= {(e)=>this.setState({bl : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'ETD',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <a className = 'fontstyle mandatory-label'>
//                                 {is_submit === true && etd === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</a>
//                               <DatePickerDate
//                                  selected={etd}
//                                  className = "text-background-paste" 
//                                  onChange={(date) => this.setState({etd:date})}
//                                  />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Main POL',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && main_pol === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {main_pol}  
//                             onChange= {(e)=>this.setState({main_pol : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Main Voyage',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && main_voyage === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {main_voyage}  
//                             onChange= {(e)=>this.setState({main_voyage : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Main POD',languageData)} 
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && main_pod === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {main_pod}  
//                             onChange= {(e)=>this.setState({main_pod : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Issuer',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && issuer === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {issuer}  
//                             onChange= {(e)=>this.getteamvalue(e.target.value)} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >
//                                 {onChangeLanguage(locale,'Team',languageData)}
//                                 <a style = {{color :'red'}}>*</a>
//                                 {is_submit === true && team=== '' &&   <p className = 'fontstyle mandatory-label'> {onChangeLanguage(locale,'Mandatory Field',languageData)} </p>}
//                                 <br></br>{team !== "" &&  getValue(teamdata,'value','label',team)}
//                                 </Label>
                            
//                         </div>
                        
//                         {/* <div className = "col-lg-2-0 space-margin">
//                         <Label  className = "fontstyle normal-font" ><a >
//                         {onChangeLanguage(locale,'TAT Time',languageData)}</a><br></br> {tat_time}</Label>

//                         </div> */}
                       
                       
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'Shipper Coder',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && shipper_coder === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {shipper_coder}  
//                             onChange= {(e)=>this.setState({shipper_coder : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'MR Code',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && mr_code === ''?  "error-border-paste":"fontstyle text-background-paste" }     
//                             placeholder = ''
//                             value = {mr_code}  
//                             onChange= {(e)=>this.setState({mr_code : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Last POD',languageData)}
//                             <a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = {is_submit === true && last_pod === ''?  "error-border-paste":"fontstyle text-background-paste" }  
//                             placeholder = ''
//                             value = {last_pod}  
//                             onChange= {(e)=>this.setState({last_pod : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
//                             <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Consignee',languageData)}</Label>
//                             <Input  className = "text-background-paste"  
//                             placeholder = ''
//                             value = {consignee}  
//                             onChange= {(e)=>this.setState({consignee: e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-lg-2-0 space-margin">
                          
//                           {/* <div  style = {{marginTop:'20px'}}> 
//                            <Checkbox color="blue" checked = {audit_sheet === true} onChange = {()=>this.setState({audit_sheet:!audit_sheet})}> 
//                                <Label style = {{marginLeft:'7px'}} className = "fontstyle normal-font" >{onChangeLanguage(locale,'Audit Sheet',languageData)}</Label>
//                            </Checkbox>
//                            </div> */}
//                    </div>
//                     </div>
//                     </Collapse>
//                </div>   
//                {/* <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'15px'}}>
//                <div className = "row">
//                         <div className = "col-md-2 radiobut">
//                         <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Exception',languageData)} <a style = {{color :'red'}}>*</a> </Label>
//                         <p className = 'fontstyle mandatory-label'></p>
//                             <div style = {{margin:'10px 0px'}}>
//                                 <Row>
//                                     <Colxx xxs="4">
//                                         <CustomRadioButton checked  = "Yes" name = {onChangeLanguage(locale,'Yes',languageData)} value = {exception} 
//                                             onChangeRadio={(value)=>this.setState({exception:value})}/>
                                       
//                                     </Colxx>
//                                     <Colxx xxs="4">
//                                      <CustomRadioButton checked  = "No" name = {onChangeLanguage(locale,'No',languageData)} value = {exception} 
//                                             onChangeRadio={(value)=>this.setState({exception:value})}/>
                                        
//                                     </Colxx>
//                                 </Row>
//                             </div>   
//                         </div> */}
                       
// {/*                        
//                         <div className = "col-md-3 radiobut">
//                         <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Shipment Type',languageData)}<a style = {{color :'red'}}>*</a> </Label>
//                         <p className = 'fontstyle mandatory-label'></p>
//                             <div style = {{margin:'10px 0px'}}>
//                                 <Row>
//                                     <Colxx xxs="3">
//                                         <CustomRadioButton checked  = "DG" name = "DG" value = {shipment_type} 
//                                             onChangeRadio={(value)=>this.setState({shipment_type:value})}/>
                                       
//                                     </Colxx>
//                                     <Colxx xxs="3">
//                                      <CustomRadioButton checked  = "Reefer" name = "Reefer" value = {shipment_type} 
//                                             onChangeRadio={(value)=>this.setState({shipment_type:value})}/>
                                        
//                                     </Colxx>
//                                     <Colxx xxs="3">
//                                      <CustomRadioButton checked  = "Normal" name = "Normal" value = {shipment_type} 
//                                             onChangeRadio={(value)=>this.setState({shipment_type:value})}/>
                                        
//                                     </Colxx>
//                                 </Row>
//                             </div>   
//                         </div>
//                          */}
//                         {/* <div className = "col-md-4 radiobut">
//                         <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'MTD Type',languageData)} <a style = {{color :'red'}}>*</a> </Label>
//                         <p className = 'fontstyle mandatory-label'></p>
//                             <div style = {{margin:'10px 0px'}}>
//                                 <Row>
//                                     <Colxx xxs="2">
//                                         <CustomRadioButton checked  = "Split" name = {onChangeLanguage(locale,'Split',languageData)} value = {mtd_type} 
//                                             onChangeRadio={(value)=>this.setState({mtd_type:value})}/>
                                       
//                                     </Colxx>
//                                     <Colxx xxs="4">
//                                      <CustomRadioButton checked  = "Part Load" name = {onChangeLanguage(locale,'Part Load',languageData)} value = {mtd_type} 
//                                             onChangeRadio={(value)=>this.setState({mtd_type:value})}/>
                                        
//                                     </Colxx>
//                                     <Colxx xxs="3">
//                                      <CustomRadioButton checked  = "Combined" name = {onChangeLanguage(locale,'Combined',languageData)} value = {mtd_type} 
//                                            onChangeRadio={(value)=>this.setState({mtd_type:value})}/>
                                        
//                                     </Colxx>
//                                     <Colxx xxs="2">
//                                      <CustomRadioButton checked  = "Normal" name = {onChangeLanguage(locale,'Normal',languageData)} value = {mtd_type} 
//                                            onChangeRadio={(value)=>this.setState({mtd_type:value})}/>
                                        
//                                     </Colxx>
//                                 </Row>
//                             </div>  
//                         </div> 
//                         <div className = "col-md-3 ">
//                         <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'HBL',languageData)} <a style = {{color :'red'}}>*</a></Label>
//                         <p className = 'fontstyle mandatory-label'></p>
//                         <div style = {{margin:'10px 0px'}}>
//                                 <Row>
//                                 <Colxx xxs="4">
//                                         <CustomRadioButton checked  = "Yes" name = {onChangeLanguage(locale,'Yes',languageData)} value = {hbl} 
//                                             onChangeRadio={(value)=>this.setState({hbl:value})}/>
                                       
//                                     </Colxx>
//                                     <Colxx xxs="4">
//                                      <CustomRadioButton checked  = "No" name = {onChangeLanguage(locale,'No',languageData)} value = {hbl} 
//                                             onChangeRadio={(value)=>this.setState({hbl:value})}/>
                                        
//                                     </Colxx>
                 
//                                 </Row>
//                             </div>   
//                         </div>
                       
//                     </div>  
//                     </div> */}
                
               
//                   {/* <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'15px'}}>
//                     <Row>
//                             <Colxx xxs="7" style = {{marginTop:'10px'}}>
//                                 <Label  className = "fontstyle" 
//                                 style = {{fontWeight:700,fontSize:'15px'}}>
//                                     {onChangeLanguage(locale,'Customer Requirement ',languageData)}</Label> : 
//                                     {issuer !== '' && <Label  className = "fontstyle" style = {{fontSize:'14px',color:''}}> *For {issuer} Based Requirements</Label>}

//                             </Colxx>
//                             <Colxx xxs="1"></Colxx>
//                             <Colxx xxs="2">
//                             <Button className = "button-width" color="secondary"  
//                                 onClick={()=>this.onPasteS8100()}
//                                 >
//                             {onChangeLanguage(locale,'Paste From  S8100',languageData)}
//                             </Button>
//                             </Colxx>
                           
//                             <Colxx xxs="2">
//                             <Button className = "button-width" color="primary"  
//                                 onClick={()=>this.searchTeamSite()}
//                                 > {onChangeLanguage(locale,'Search',languageData)}
//                                  <i className="simple-icon-magnifier" style = {{fontSize:'15px',marginLeft:'45px'}} />
//                             </Button>
                               
//                             </Colxx>
//                         </Row>
//                 </div>  */}

//                 {/* <div>
//                 {issuer !== '' &&

//                     <div className="row" style={{ marginBottom: '7px' }}>
//                         {origin_requirements && origin_requirements.length > 0 &&
//                             <div className="col-md-6">
//                                 <div className="publishuser-card-component" style={{ borderRadius: '10px' }}>
//                                     <div className="publish-title" >
//                                         <Row>
//                                             <Colxx xxs="12">
//                                                 <Label className="fontstyle"
//                                                     style={{ fontWeight: 700, fontSize: '15px' }}>{onChangeLanguage(locale, 'Origin Requirements - (Source - ', languageData) + getValue(teamdata, 'value', 'label', team) + ')'}</Label>

//                                             </Colxx>
//                                         </Row>

//                                     </div>
//                                     <table>
//                                         <thead className="thead-height publish-title1">
//                                             <tr>
//                                                 <td style={{ padding: '2px 10px',width: '20%' }}>
//                                                     {onChangeLanguage(locale, 'Item', languageData)}
//                                                 </td>
//                                                 <td style={{ padding: '2px 10px' }}>
//                                                     {onChangeLanguage(locale, 'Key Descriptions', languageData)}
//                                                 </td>
//                                             </tr>
//                                         </thead>
//                                         <tbody className="tbody-height">
//                                             {origin_requirements.map((value, index) =>
//                                                 <tr>
//                                                     <td style={{ width: '20%' }}>
//                                                         <div className="" style={{ backgroundColor: 'rgb(239 100 50/20%)', padding: '2px', margin: '10px' }}>
//                                                             <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }}>{value.Items}</Label>
//                                                         </div></td>
//                                                     <td>  <div className="" style={{ backgroundColor: '#F5F6F8', padding: '2px', margin: '10px', width: '96%' }}>
//                                                         <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }} >
//                                                             {value.Requirements}
//                                                         </Label>
//                                                     </div></td>
//                                                 </tr>
//                                             )}

//                                         </tbody>
//                                     </table>


//                                 </div>
//                             </div>
//                         }
//                         {country_requirements && country_requirements.length > 0 &&
//                             <div className="col-md-6">
//                                 <div className="publishuser-card-component" style={{ borderRadius: '10px' }}>
//                                     <div className="publish-title" >
//                                         <Row>
//                                             <Colxx xxs="12">
//                                                 <Label className="fontstyle"
//                                                     style={{ fontWeight: 700, fontSize: '15px' }}>{onChangeLanguage(locale, 'Country Requirements - (Source - ', languageData) + getCountryName('', last_pod, main_pod, teamdata) + ')'}</Label>

//                                             </Colxx>
//                                         </Row>

//                                     </div>
//                                     <table>
//                                         <thead className="thead-height publish-title1">
//                                             <tr>
//                                                 <td style={{ padding: '2px 10px',width: '20%' }}>
//                                                     {onChangeLanguage(locale, 'Item', languageData)}
//                                                 </td>
//                                                 <td style={{ padding: '2px 10px' }}>
//                                                     {onChangeLanguage(locale, 'Key Descriptions', languageData)}
//                                                 </td>
//                                             </tr>
//                                         </thead>
//                                         <tbody className="tbody-height">
//                                             {country_requirements.map((value, index) =>
//                                                 <tr>
//                                                     <td style={{ width: '20%' }}>
//                                                         <div className="" style={{ backgroundColor: 'rgb(239 100 50/20%)', padding: '2px', margin: '10px' }}>
//                                                             <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }}>{value.Items}</Label>
//                                                         </div></td>
//                                                     <td>  <div className="" style={{ backgroundColor: '#F5F6F8', padding: '2px', margin: '10px', width: '96%' }}>
//                                                         <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }} >
//                                                             {value.Requirements}
//                                                         </Label>
//                                                     </div></td>
//                                                 </tr>
//                                             )}

//                                         </tbody>
//                                     </table>


//                                 </div>
//                             </div>
//                         }
//                         {customer_requirements && customer_requirements.length > 0 &&
//                             <div className="col-md-12">
//                                 <div className="publishuser-card-component" style={{ borderRadius: '10px' }}>
//                                     <div className="publish-title" >
//                                         <Row>
//                                             <Colxx xxs="12">
//                                                 <Label className="fontstyle"
//                                                     style={{ fontWeight: 700, fontSize: '15px' }}>{onChangeLanguage(locale, 'Customer Requirements - (Source - ', languageData) + getValue(teamdata, 'value', 'label', team) + ')'}</Label>

//                                             </Colxx>
//                                         </Row>

//                                     </div>
//                                     <table>
//                                         <thead className="thead-height publish-title1">
//                                             <tr>
//                                                 <td style={{ padding: '2px 10px',width: '10%' }}>
//                                                     {onChangeLanguage(locale, 'Item', languageData)}
//                                                 </td>
//                                                 <td style={{ padding: '2px 10px',width: '10%'  }}>
//                                                     {onChangeLanguage(locale, 'CU', languageData)}
//                                                 </td>
//                                                 <td style={{ padding: '2px 10px',width: '10%'  }}>
//                                                     {onChangeLanguage(locale, 'SH', languageData)}
//                                                 </td>
//                                                 <td style={{ padding: '2px 10px',width: '10%'  }}>
//                                                     {onChangeLanguage(locale, 'MR', languageData)}
//                                                 </td>
//                                                 <td style={{ padding: '2px 10px',width: '10%'  }}>
//                                                     {onChangeLanguage(locale, 'CN', languageData)}
//                                                 </td>
                                                
//                                                 <td style={{ padding: '2px 10px' }}>
//                                                     {onChangeLanguage(locale, 'Key Descriptions', languageData)}
//                                                 </td>
//                                                 <td style={{ padding: '2px 10px',width: '10%'  }}>
//                                                     {onChangeLanguage(locale, 'Destination', languageData)}
//                                                 </td>
//                                             </tr>
//                                         </thead>
//                                         <tbody className="tbody-height">
//                                         {customer_requirements.map((value, index) =>
//                                                 <tr>
//                                                     <td style={{width: '10%' }}>
//                                                     {(value.Items && value.Items !== null && value.Items !== '') && 
//                                                     <div className="" style={{ backgroundColor: 'rgb(239 100 50/20%)', padding: '2px', margin: '10px' }}>
//                                                             <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }}>{value.Items}</Label>
//                                                         </div>}
//                                                     </td>
//                                                     <td style={{width: '10%' }}>
//                                                     {(value.CU !== null && value.CU !== '') &&
//                                                         <div className="" style={{ backgroundColor: 'rgb(239 100 50/20%)', padding: '2px', margin: '10px' }}>
//                                                             <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }}>{value.CU}</Label>
//                                                         </div>}
//                                                     </td>
//                                                     <td style={{width: '10%' }}>
//                                                     {(value.SH !== null && value.SH !== '') &&
//                                                         <div className="" style={{ backgroundColor: 'rgb(239 100 50/20%)', padding: '2px', margin: '10px' }}>
//                                                             <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }}>{value.SH}</Label>
//                                                         </div>}
//                                                     </td>
//                                                     <td style={{width: '10%' }}>
//                                                     {(value.MR !== null && value.MR !== '') &&
//                                                         <div className="" style={{ backgroundColor: 'rgb(239 100 50/20%)', padding: '2px', margin: '10px' }}>
//                                                             <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }}>{value.MR}</Label>
//                                                         </div>}
//                                                     </td>
//                                                     <td style={{width: '10%' }}>
//                                                         {(value.CN !== null && value.CN !== '') &&
//                                                             <div className="" style={{ backgroundColor: 'rgb(239 100 50/20%)', padding: '2px', margin: '10px',width: '70%'}}>
//                                                             <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }}>{value.CN}</Label>
//                                                         </div>}
//                                                     </td>
//                                                     <td>
//                                                         <div className="" style={{ backgroundColor: '#F5F6F8', padding: '2px', margin: '10px'}}>
//                                                             <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }} >
//                                                                 {value.Requirements}
//                                                             </Label>
//                                                         </div>
//                                                     </td>
//                                                     <td style={{width: '10%' }}>
//                                                         {(value.Destination !== null && value.Destination !== '') && 
//                                                         <div className="" style={{ backgroundColor: 'rgb(239 100 50/20%)', padding: '2px', margin: '10px' }}>
//                                                             <Label className="fontstyle small-font" style={{ height: '60px', overflowY: 'auto', padding: '7px' }}>{value.Destination}</Label>
//                                                         </div>}
//                                                     </td>
//                                                 </tr>
//                                             )}

//                                         </tbody>
//                                     </table>

//                                 </div>
//                             </div>
//                         }


//                     </div>
//                     }
//                   </div> */}

                      
//                 {/* <div className = "row" style = {{marginBottom:'15px'}}>
//                       <div className = "col-md-4 text-center" style = {{padding:'0px 5px',borderRight:'1px solid gray'}}><Label  className = "fontstyle small-font">Chennai Requirement Last Update    : 03/12/2020 - 6:33 PM</Label></div>
//                       <div className = "col-md-4 text-center" style = {{padding:'0px 5px',borderRight:'1px solid gray'}}><Label  className = "fontstyle small-font">Mumbai Requirement Last Update     : 03/12/2020 - 6:33 PM</Label></div>
//                       <div className = "col-md-4 text-center" style = {{padding:'0px 5px'}}><Label  className = "fontstyle small-font">Shanghai Requirement Last Update   : 03/12/2020 - 6:33 PM</Label></div>
//                 </div>   */}
//                 {/* <ul className = "ul-list-style ultext-center" style = {{marginBottom:'15px'}}>
//                 <a style = {{color :'red'}}>*</a> 
//                         <li style = {{margin:'0px 5px'}}>
//                             <a  className = "" style = {{padding:'7px 5px',fontSize:'12px',width:'100%'}}>
//                                 <Checkbox color="blue" style = {{marginRight:'6px'}}                                
//                                 checked = {read === true} onChange = {()=>this.setState({read:!read})} > 
//                                 <a style = {{marginLeft:'2px'}}>
//                                 {onChangeLanguage(locale,'I have read and processed the shipment as per the above requirements',languageData)}
                              
//                                 </a>
//                                 </Checkbox>
                                
                                
//                             </a>
//                         </li>
//                         <li style = {{margin:'0px 5px'}}>
//                             <a className='fontstyle text-background' style = {{ padding:'7px 5px',fontSize:'12px',width:'100%'}}>
//                              <Checkbox color="blue" style = {{marginRight:'6px'}} checked = {draft === true} onChange = {()=>this.setState({draft:!draft})}> 
//                             <a style = {{marginLeft:'2px'}}>{onChangeLanguage(locale,'Draft Sent',languageData)}
//                             </a>
//                             </Checkbox>
//                         </a></li>
//                         <li style = {{margin:'0px 5px'}} > 
//                             <a className='fontstyle text-background' style = {{ padding:'7px 5px',fontSize:'12px',width:'100%'}}>
//                             <Checkbox color="blue" style = {{marginRight:'6px'}}checked = {sdc === true} onChange = {()=>this.setState({sdc:!sdc})} > 
//                             <a style = {{marginLeft:'2px'}}>{onChangeLanguage(locale,'SDC Y',languageData)}
//                             </a>
//                             </Checkbox>
//                         </a></li>
//                         <li style = {{margin:'0px 5px'}} >
//                         <a className='fontstyle text-background' style = {{ padding:'7px 5px',fontSize:'12px',width:'100%'}}>
//                             <Checkbox color="blue" style = {{marginRight:'6px'}} checked = {free_time === true} onChange = {()=>this.setState({free_time:!free_time})}> 
//                             <a style = {{marginLeft:'2px'}}> {onChangeLanguage(locale,'Free Time Checked',languageData)}
//                             </a>
//                             </Checkbox>
//                         </a>
//                         </li>
//                         <li style = {{margin:'0px 5px'}} >
//                         <a className='fontstyle text-background' style = {{ padding:'7px 5px',fontSize:'12px',width:'100%'}}>
//                             <Checkbox color="blue" style = {{marginRight:'6px'}} checked = {credit === true} onChange = {()=>this.setState({credit:!credit})}> 
//                             <a style = {{marginLeft:'2px'}}>{onChangeLanguage(locale,'Credit Check',languageData)}
//                            </a>
//                             </Checkbox>
//                         </a>
//                         </li>
//                 </ul>  */}
                
//                 <div className = "row text-center" style = {{margin:'0px 5px'}}> 
//                         <Button className = "button-width" color="secondary"  
//                                 onClick={()=>this.onPasteD1040()}
//                                 >
//                                 {onChangeLanguage(locale,'Paste From D1040',languageData)}
//                             </Button>
//                             <Button className = "button-width" color="primary"  
//                                 onClick={()=>this.fetchData()}
//                                 >{onChangeLanguage(locale,'Find',languageData)}
                                
//                             </Button>
//                        <Button className = "button-width" color="primary"  
//                                 onClick={()=>this.onSubmit()}
//                                 >
//                                 {onChangeLanguage(locale,'Save',languageData)}
//                             </Button>
                        
//                        <Button className = "button-width" color="secondary"  
//                             onClick={()=>this.clearvalue()}
//                     >
//                      {onChangeLanguage(locale,'Refresh',languageData)}
//                     </Button>     
//              </div>
            
 
//  </div>
//           </>