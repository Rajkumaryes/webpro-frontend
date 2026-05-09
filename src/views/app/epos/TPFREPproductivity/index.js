import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import DatePicker from "../../datePicker";
import{areatpfrepService} from '../../../../redux/EPOS/areatpfrep/saga';
import{activitytpfrepService} from '../../../../redux/EPOS/activitytpfrep/saga';
import{TPFREPService} from '../../../../redux/EPOS/tpfrep_productivity/saga';
import{hlclformatService} from '../../../../redux/EPOS/hlclformat/saga';
import moment from 'moment';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import {onChangeLanguage,convertLocalToUTCDate,convertUTCToLocalDate} from '../../../../helper'
import {getValue_V2500_Vessle,getValue_V2500_Port} from '../../pasteData'
import * as clipboard from "clipboard-polyfill/text";


class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        mail_datetime:'',
        departure_datetime:'',
        vessel_name:'',
        schedule_voy:'',
        start_date:'',
        end_date:'',
        port:'',
        dp_voyage:'',
        eta:'',
        terminal:'',
        ssy:'',
        hlgl_format:'',
        activity:'',
        user_id:'',
        area:'',
        team:'',


        ssy_class:'',
        dir:'',
        pol:'',
        departure_date:'',
        departure_actual:'',
        pod:'',
        arrival_date:'',
        arrival_actual:'',
        transit:'',
        booking_restr:'',
        auto_wo:'',
        vco_phase:'',
        vessel_operator:'',
        valid_state:'',
        pt:'',
        omit:'',
        call_sign:'',
        fcl_cutoff_date:'',
        fcl_cutoff_time:'',
        port_authorities_export:'',
        port_authorities_import:'',
        eventcode:'',
        late_early_hrs:'',
        delay_reason:'',
        delay_remark:'',
        coastal_arr_dif:'',
        coastal_dep_dif:'',
        tpfrep_exp:'',
        tpfrep_rec:'',
        port_departure_actual:'',
        port_arrival_actual:'',
        port_transit:'',


        activitydata:[],
        hlgldata:[],
        areadata:[],
        start_time:new Date(),
        updated_start_time:new Date(),
        is_search:false,
        is_submit :false,
      };
    }
    componentDidMount() {
        this.setState({
            start_date:new Date(),
            
        })
       this.fetcharea() 
       this.fetchactivityapi()
       this.fetchhlclformatapi()
    }
    fetcharea() {
        this.setState({
          loading : true
        })
        areatpfrepService.fetcharearegion()
          .then((res) => {
              this.setState({loading:false})
             if(res.status)   { 
                let filterstatus = (res.data).filter(item => item.status === 1)
                   var arealist = filterstatus.map(function(areaaval) {
                        return  {label : areaaval.name ,value : (areaaval.id).toString()};
                     });  
                      this.setState({
                      areadata :  arealist,
                      })
                   }
                  
                   })
                   .catch((error) => { 
                      this.setState({
                          loading : false
                        })
                   }); 
       }
       fetchactivityapi() {
        this.setState({
          loading : true
        })
        activitytpfrepService.fetchactivitytpfrep()
        .then((res) => {
            this.setState({loading:false})
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var list = filterstatus.map(function(areaaval) {
                      return  {label : areaaval.name ,value : (areaaval.id).toString()};
                   });  
                    this.setState({
                    activitydata :  list,
                    })
                 }
                
                 })
                 .catch((error) => { 
                    this.setState({
                        loading : false
                      })
                 }); 
     }
     fetchhlclformatapi() {
        this.setState({
          loading : true
        })
        hlclformatService.fetchhlclformat()
        .then((res) => {
            this.setState({loading:false})
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var list = filterstatus.map(function(areaaval) {
                      return  {label : areaaval.name ,value : (areaaval.id).toString()};
                   });  
                    this.setState({
                        hlgldata :  list,
                    })
                 }
                
                 })
                 .catch((error) => { 
                    this.setState({
                        loading : false
                      })
                 }); 
     }
     fetchTpfrepAPI() {
        const {dp_voyage} = this.state
        if(dp_voyage !== "")
        {
        this.setState({
          loading : true
        })
        this.clearValue()
        TPFREPService.fetchTpfrepIndividual(dp_voyage)
        .then((res) => {
            this.setState({loading:false})
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
        else
        {
            createNotification('Please fill DP Voyage','error','filled')
        }
     }
     setValue(record)
     {
        if(record && record !== null)
        {
            this.setState({
                mail_datetime:convertLocalToUTCDate(record.mail_datetime),
                departure_datetime:record.departure_datetime,
                vessel_name:record.vessel_name,
                schedule_voy:record.schedule_voy,
                port:record.port,
                dp_voyage:record.dp_voyage,
                eta:record.eta,
                terminal:record.terminal,
                ssy:record.ssy,
                hlgl_format:record.hlgl_format,
                activity:record.activity,
                user_id:record.user_id,
                area:record.area,
                team:record.team,

                ssy_class:record.ssy_class,
                dir:record.dir,
                pol:record.pol,
                departure_date:record.departure_date,
                departure_actual:record.departure_actual,
                pod:record.pod,
                arrival_date:record.arrival_date,
                arrival_actual:record.arrival_actual,
                transit:record.transit,
                booking_restr:record.booking_restr,
                auto_wo:record.auto_wo,
                vco_phase:record.vco_phase,
                vessel_operator:record.vessel_operator,
                valid_state:record.valid_state,
                pt:record.pt,
                omit:record.omit,
                call_sign:record.call_sign,
                fcl_cutoff_date:record.fcl_cutoff_date,
                fcl_cutoff_time:record.fcl_cutoff_time,
                port_authorities_export:record.port_authorities_export,
                port_authorities_import:record.port_authorities_import,
                eventcode:record.eventcode,
                late_early_hrs:record.late_early_hrs,
                delay_reason:record.delay_reason,
                delay_remark:record.delay_reason,
                coastal_arr_dif:record.coastal_arr_dif,
                coastal_dep_dif:record.coastal_dep_dif,
                tpfrep_exp:record.tpfrep_exp,
                tpfrep_rec:record.tpfrep_rec,

                port_departure_actual:record.port_departure_actual,
                port_arrival_actual:record.port_arrival_actual,
                port_transit:record.port_transit,


                is_search:true,
                is_submit :false,
              })
        }
        console.log("lhnkjh " ,record.departure_datetime )
     }
     onChangetime(date)
     {
       console.log("lhnkjh " ,date)
       var time = moment(date).format('HH:mm:ss')
       if(time !== "00:00:00")
       {
         this.setState({departure_datetime  : date})
       }
      
     }
     onPasteVessle() 
    {
        clipboard.readText().then((text)=>{
            var record = getValue_V2500_Vessle(text)
            this.setState({
                vessel_name:record.vessel_name,
                ssy:record.ssy,
                schedule_voy:record.schedule_voy,
                dp_voyage:record.dp_voyage,
                
                ssy_class:record.ssy_class,
                dir:record.dir,
                pol:record.pol,
                departure_date:record.departure_date,
                departure_actual:record.departure_actual,
                pod:record.pod,
                arrival_date:record.arrival_date,
                arrival_actual:record.arrival_actual,
                transit:record.transit,
                booking_restr:record.booking_restr,
                auto_wo:record.auto_wo,
                vco_phase:record.vco_phase,
                vessel_operator:record.vessel_operator,
                valid_state:record.valid_state,
            })

        })
    }
    onChangetime(date)
    {
      console.log("lhnkjh " ,date)
      var time = moment(date).format('HH:mm:ss')
      if(time !== "00:00:00")
      {
        this.setState({mail_datetime  : date})
      }
     
    }
    onChangedepart(date)
    {
      console.log("lhnkjh " ,date)
      var time = moment(date).format('HH:mm:ss')
      if(time !== "00:00:00")
      {
        this.setState({departure_datetime  : date})
      }
     
    }
    onPastePort() 
    {
        clipboard.readText().then((text)=>{
            var record = getValue_V2500_Port(text)
            this.setState({
              departure_datetime:this.validDate(record.departure_datetime,'Departure Date Time'),
              port:record.port,
              terminal:record.terminal,
              eta:record.eta,
              pt:record.pt,
              omit:record.omit,
              call_sign:record.call_sign,
              fcl_cutoff_date:record.fcl_cutoff_date,
              fcl_cutoff_time:record.fcl_cutoff_time,
              port_authorities_export:record.port_authorities_export,
              port_authorities_import:record.port_authorities_import,
              eventcode:record.eventcode,
              late_early_hrs:record.late_early_hrs,
              delay_reason:record.delay_reason,
              delay_remark:record.delay_remark,
              coastal_arr_dif:record.coastal_arr_dif,
              coastal_dep_dif:record.coastal_dep_dif,
              tpfrep_exp:record.tpfrep_exp,
              tpfrep_rec:record.tpfrep_rec,
              port_departure_actual:record.port_departure_actual,
              port_arrival_actual:record.port_arrival_actual,
              port_transit:record.port_transit,

            })

        })
    }
    onSubmit()
    {
        const {mail_datetime,departure_datetime,ssy,schedule_voy,port,eta,terminal,area,start_date,
            vessel_name,dp_voyage,hlgl_format,activity,start_time,updated_start_time,ssy_class,
            dir,pol,departure_date,departure_actual,pod,arrival_date,arrival_actual,transit,booking_restr,auto_wo,vco_phase, vessel_operator,
            valid_state,pt, omit, call_sign,fcl_cutoff_date,fcl_cutoff_time,port_authorities_export,port_authorities_import,eventcode,
            late_early_hrs,delay_reason,delay_remark,coastal_arr_dif, coastal_dep_dif,tpfrep_exp,tpfrep_rec, port_departure_actual, port_arrival_actual, port_transit} = this.state
        let startdate = moment(start_date).format('MM/DD/YYYY hh:mm:ss a'),
        end_date = moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')

        if(mail_datetime !== "" &&  departure_datetime !== "" &&  ssy !== "" &&  schedule_voy !== "" &&  port !== "" &&  eta !== "" &&  
        terminal !== "" && area !== "" &&  vessel_name !== "" &&  dp_voyage !== "" &&  hlgl_format !== "" &&  activity)
        {
            this.setState({end_date:end_date,  })
                const {username} = this.props
                let end_date1=convertLocalToUTCDate(new Date()),
                start_date=convertLocalToUTCDate(start_time),
                updatedstarttime=convertLocalToUTCDate(updated_start_time),
                 updated_end_time=convertLocalToUTCDate(new Date()),
                 maildd=moment(convertUTCToLocalDate(mail_datetime)).format('MM/DD/YYYY hh:mm:ss a'),
                 departuredate=moment(convertUTCToLocalDate(departure_datetime)).format('MM/DD/YYYY hh:mm:ss a')

                this.setState({
                    loading : true
                  })
                  TPFREPService.createTpfrep(username, startdate,end_date,maildd,departuredate,ssy,schedule_voy,
                    port,eta,terminal,area,vessel_name,dp_voyage,hlgl_format,activity,start_date,end_date1,updatedstarttime,updated_end_time,ssy_class,
                    dir,pol,departure_date,departure_actual,pod,arrival_date,arrival_actual,transit,booking_restr,auto_wo,vco_phase, vessel_operator,
                    valid_state,pt, omit, call_sign,fcl_cutoff_date,fcl_cutoff_time,port_authorities_export,port_authorities_import,eventcode,
                    late_early_hrs,delay_reason,delay_remark,coastal_arr_dif, coastal_dep_dif,tpfrep_exp,tpfrep_rec,port_departure_actual, port_arrival_actual, port_transit)
                    .then((res) => { 
                      this.setState({   
                        loading : false     
                      }) 
                      if(res.status)
                        {
                          createNotification('Created','success','filled')
                          this.clearValue()
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
    handleactivity = (selectedOptions) => {
        this.setState({activity : selectedOptions.value})  
    } 
    handlehlgl = (selectedOptions) => {
        this.setState({hlgl_format : selectedOptions.value})  
    } 
    handlearea = (selectedOptions) => {
        this.setState({area : selectedOptions.value})  
    } 
    validDate(date)
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
                    date_value =  moment(end_date).format('MM/DD/YYYY hh:mm:ss a')
                    console.log("date is valid")
                    isfill = true
                }
              } else 
              {
                 console.log("not a date")
              }

         }
        
 
         return date_value

     }
    clearValue()
    {
        this.setState({
        mail_datetime:'',
        departure_datetime:'',
        vessel_name:'',
        schedule_voy:'',
        start_date:new Date(),
        end_date:'',
        port:'',
        eta:'',
        terminal:'',
        dp_voyage:'',
        ssy:'',
        hlgl_format:'',
        activity:'',
        user_id:'',
        area:'',
        team:'',
        is_search:false,
        is_submit :false,
      })
    }
  
    
    render()
    {
        const {match,locale,languageData,username} = this.props
        const {loading,mail_datetime,departure_datetime,ssy,schedule_voy,port,eta,terminal,user_id,area,start_date,end_date,
            vessel_name,dp_voyage,hlgldata,hlgl_format,activitydata,activity,areadata,is_search,is_submit} = this.state
        return (
            <>
            <title>{ onChangeLanguage(locale,"TPFREP Productivity",languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={ onChangeLanguage(locale,"TPFREP Productivity",languageData)} match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row" style = {{marginBottom:'30px'}}>
                       <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Start Date',languageData)}
                            <br></br> {moment(start_date).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                           
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'End Date',languageData)}
                            <br></br>{end_date}</Label>
                           
                        </div>
                       

                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Mail Date Time',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <p1 className = 'fontstyle mandatory-label'>{is_submit === true && mail_datetime === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                                <DatePicker
                                 selected={mail_datetime}
                                 className = "text-background"
                                 onChange={(date) => this.onChangetime(date)}
                                 />
                        </div>


                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Departure Date / Time',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <p1 className = 'fontstyle mandatory-label'>{is_submit === true && departure_datetime === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                                {/* <DatePicker
                                 selected={departure_datetime}
                                 className = "text-background-paste"
                                 onChange={(date) => this.onChangedepart(date)}
                                 /> */}
                                  <Input  className = {is_submit === true && departure_datetime === ''?  "error-border-paste":"fontstyle text-background-paste" }    
                            placeholder = 'MM/DD/YYYY hh:mm:ss AM/PM'
                            value = {departure_datetime}  
                            disabled = {true}  
                            onChange= {(e)=>this.setState({departure_datetime : e.target.value})} 
                            />
                        </div>
                       
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Vessel Name',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && vessel_name === ''?  "error-border-paste":"fontstyle text-background-paste" }    
                            placeholder = ''
                            value = {vessel_name}  
                            disabled = {true}  
                            onChange= {(e)=>this.setState({vessel_name : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'SSY',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && ssy === ''?  "error-border-paste":"fontstyle text-background-paste" }   
                                value = {ssy}  
                                disabled = {true}  
                                onChange= {(e)=>this.setState({ssy : e.target.value})} ></Input>
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Schedule Voyage',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && schedule_voy === ''?  "error-border-paste":"fontstyle text-background-paste" }   
                                value = {schedule_voy}
                                disabled = {true}  
                                onChange= {(e)=>this.setState({schedule_voy : e.target.value})} ></Input>
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'DP Voyage',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && dp_voyage === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                                value = {dp_voyage} 
                                onChange= {(e)=>this.setState({dp_voyage : e.target.value})} ></Input>
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Port',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && port === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                                value = {port}  
                                disabled = {true}  
                                onChange= {(e)=>this.setState({port : e.target.value})} ></Input>
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'ETA',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && eta === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                                value = {eta} 
                                disabled = {true}  
                                onChange= {(e)=>this.setState({eta : e.target.value})} ></Input>
                        </div>
                        
                        
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Terminal',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && terminal === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                            placeholder = ''
                            value = {terminal}  
                            disabled = {true}  
                            onChange= {(e)=>this.setState({terminal : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'HLCL Format',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select  
                             style={{height:'85px'}}
                             className={is_submit === true && hlgl_format === ''?  "error-border-select":"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={hlgldata.filter(option =>option.value === hlgl_format)}
                            options={hlgldata}
                            onChange={this.handlehlgl}
                      />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Region',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select  
                             style={{height:'85px'}}
                             className={is_submit === true && area === ''?  "error-border-select":"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={areadata.filter(option =>option.value === area)}
                            options={areadata}
                            onChange={this.handlearea}
                      />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Activity',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select  
                             style={{height:'85px'}}
                             className={is_submit === true && activity === ''?  "error-border-select":"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={activitydata.filter(option =>option.value === activity)}
                            options={activitydata}
                            onChange={this.handleactivity}
                      />
                        </div>
                    </div>
                    <div className = "row text-center">                     
                          <Button className = "button-width" color="secondary" 
                                onClick={()=>this.onPasteVessle()}
                                >{ onChangeLanguage(locale,'Paste Vessle',languageData)}</Button>                        
                          <Button className = "button-width" color="secondary" 
                                onClick={()=>this.onPastePort()}
                                >{ onChangeLanguage(locale,'Paste Port',languageData)}</Button>                        
                          <Button className = "button-width" color="primary"  
                                onClick={()=>this.onSubmit()}
                                >{ onChangeLanguage(locale,'Save',languageData)} </Button>                          
                          <Button className = "button-width" color="primary" 
                                onClick={()=>this.fetchTpfrepAPI()}
                                >{ onChangeLanguage(locale,'Find',languageData)} </Button>                        
                             <Button className = "button-width" color="secondary" 
                            onClick={()=>this.clearValue()}>{ onChangeLanguage(locale,'Refresh',languageData)}</Button>                   
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

