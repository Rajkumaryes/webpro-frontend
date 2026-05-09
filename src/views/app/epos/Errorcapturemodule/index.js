import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import {onChangeLanguage,convertLocalToUTCDate} from '../../../../helper'

import{ErrorcaptureService} from '../../../../redux/EPOS/error_capture/saga';
import{areaerrorService} from '../../../../redux/EPOS/areaerror/saga';
import{sourceerrorService} from '../../../../redux/EPOS/sourceerror/saga';
import{regionerrorService} from '../../../../redux/EPOS/regionerror/saga';
import{activitytypeerrorService} from '../../../../redux/EPOS/activitytypeerror/saga';
import{typeofreportService} from '../../../../redux/EPOS/typeofreport/saga';
import{activitysService} from '../../../../redux/EPOS/activitys/saga';
import{errorvesseloperatorsService} from '../../../../redux/projectmasters/errorvesseloperator/saga'



class QueryResolveSheet extends Component {
    constructor(props) 
    {
      super(props);
      this.state = {
        loading:false,
        eops_date:'',
        eops_activity_type:'',
        eops_no_of_containers:'',
        eops_user:'',
        eops_comments:'',
        eops_source:'',
        eops_week:'',
        eops_region:'',
        eops_area:'',
        eops_vesseloperator:'',
        sourcedata:[],
        activitydata:[],
        activitysdata:[],
        regiondata:[],
        areadata:[],
        vesseloperator_data:[],
        type_of_report_data:[],
        eops_is_submit:false,

        tpfrep_date:'',
        tpfrep_activity_type:'',
        tpfrep_no_of_dps:'',
        tpfrep_user:'',
        tpfrep_type_of_report:'',
        tpfrep_source:'',
        tpfrep_week:'',
        tpfrep_region:'',
        tpfrep_area:'',
        tpfrep_is_submit:false,
        start_time:new Date(),
        updated_start_time:new Date(),


      };
    }
    componentDidMount() {

    
     this.fetchactivityapi()
     this.fetchRegion()
     this.fetchtype()
     this.fetchSource()
     this.fetchactivitys()
  }
  fetchtype() {
    this.setState({
      loading : true
    })
    typeofreportService.fetchtypeofreport()
      .then((res) => {
          this.setState({loading:false})
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var arealist = filterstatus.map(function(areaaval) {
                    return  {label : areaaval.name ,value : (areaaval.id).toString()};
                 });  
                  this.setState({
                  type_of_report_data :  arealist,
                  })
               }
              
               })
               .catch((error) => { 
                  this.setState({
                      loading : false
                    })
               }); 
   }
  fetchSource() {
    this.setState({
      loading : true
    })
    sourceerrorService.fetchsourceerror()
      .then((res) => {
          this.setState({loading:false})
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var arealist = filterstatus.map(function(areaaval) {
                    return  {label : areaaval.name ,value : (areaaval.id).toString()};
                 });  
                  this.setState({
                  sourcedata :  arealist,
                  })
               }
              
               })
               .catch((error) => { 
                  this.setState({
                      loading : false
                    })
               }); 
   }
  fetchRegion() {
    this.setState({
      loading : true
    })
    regionerrorService.fetchregionerror()
      .then((res) => {
          this.setState({loading:false})
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var arealist = filterstatus.map(function(areaaval) {
                    return  {label : areaaval.name ,value : (areaaval.id).toString()};
                 });  
                  this.setState({
                  regiondata :  arealist,
                  })
               }
              
               })
               .catch((error) => { 
                  this.setState({
                      loading : false
                    })
               }); 
   }
    fetcharea(region_id) {
      this.setState({
        loading : true
      })
      areaerrorService.fetchAreaRegionWise(region_id)
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
      activitytypeerrorService.fetchactivitytypeerror()
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

   fetchactivitys() {
    this.setState({
      loading : true
    })
    activitysService.fetchactivitys()
    .then((res) => {
        this.setState({loading:false})
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var list = filterstatus.map(function(response) {
                  return  {label : response.name ,value : (response.id).toString()};
               });  
                this.setState({
                  activitysdata :  list,
                })
             }
            
             })
             .catch((error) => { 
                this.setState({
                    loading : false
                  })
             }); 
 }

   fetchvesseloperator(region,area) {
    this.setState({
      loading : true
    })
    errorvesseloperatorsService.fetchAreaRegionWise(region,area)
      .then((res) => {
          this.setState({loading:false})
         if(res.status)   {
         
             let filterstatus = (res.data).filter(item => item.status === 1)
               var list = filterstatus.map(function(areaaval) {
                    return  {label : areaaval.name ,value : (areaaval.id).toString()};
                 });  
                 
                  this.setState({
                  vesseloperator_data :  list,
                  })
               }
              
               })
               .catch((error) => { 
                  this.setState({
                      loading : false
                    })
               }); 
   }
    onSubmitEPOS()
    {
        const {eops_date, eops_no_of_containers,eops_activity_type,eops_area,eops_comments,eops_region,
            eops_source, eops_user,eops_week,start_time,updated_start_time } = this.state
        if(eops_date !== "" && eops_no_of_containers !== "" && eops_activity_type !== "" && eops_area !== "" && eops_comments !== "" && 
        eops_region  !== "" &&  eops_source !== "" &&  eops_user  !== "" && eops_week  !== "")
        {
          let end_date=convertLocalToUTCDate(new Date()),
          start_date=convertLocalToUTCDate(start_time),
          updatedstarttime=convertLocalToUTCDate(updated_start_time),
           updated_end_time=convertLocalToUTCDate(new Date())
           const{username}=this.props
        this.setState({
          loading : true
        })
        ErrorcaptureService.createerrorcaptureEPOS(eops_date, eops_no_of_containers,eops_activity_type,eops_area,eops_comments,eops_region,
            eops_source, eops_user,eops_week,username,start_date,end_date,updatedstarttime,updated_end_time,1)
          .then((res) => { 
            this.setState({   
              loading : false     
            }) 
            if(res.status)
              {
                createNotification('Created','success','filled')
                this.setState({
                  eops_date:'',
                  eops_activity_type:'',
                  eops_no_of_containers:'',
                  eops_user:'',
                  eops_comments:'',
                  eops_source:'',
                  eops_week:'',
                  eops_region:'',
                  eops_area:'',
                  eops_vesseloperator:'',
                  areadata:[],
                  vesseloperator_data:[],
                  eops_is_submit:false,
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
            this.setState({
                eops_is_submit:true
              })
              createNotification('Please fill mandatory field','error','filled')
        }
    }
    clearValueEPOS()
    {
        this.setState({
            eops_date:'',
            eops_activity_type:'',
            eops_no_of_containers:'',
            eops_user:'',
            eops_comments:'',
            eops_source:'',
            eops_week:'',
            eops_region:'',
            eops_area:'',
            eops_vesseloperator:'',
            areadata:[],
            vesseloperator_data:[],
            eops_is_submit:false,
        })
    }
    onSubmitTPFREP()
    {
        const { tpfrep_date,
            tpfrep_no_of_dps,tpfrep_activity_type,tpfrep_area,tpfrep_user,
            tpfrep_region,tpfrep_type_of_report,tpfrep_week,tpfrep_source,start_time,updated_start_time } = this.state
        if( tpfrep_date !== "" && tpfrep_no_of_dps !== "" && tpfrep_activity_type !== "" && 
        tpfrep_area  !== "" &&  tpfrep_user !== "" &&  tpfrep_region  !== "" && tpfrep_type_of_report  !== "" &&
        tpfrep_week !== "" && tpfrep_source !== "")
        {
          let end_date=convertLocalToUTCDate(new Date()),
          start_date=convertLocalToUTCDate(start_time),
          updatedstarttime=convertLocalToUTCDate(updated_start_time),
           updated_end_time=convertLocalToUTCDate(new Date())
           const{username}=this.props

            this.setState({
                loading : true
              })
              ErrorcaptureService.createerrorcaptureTPFREP(tpfrep_date,
                tpfrep_no_of_dps,tpfrep_activity_type,tpfrep_area,tpfrep_user,
                tpfrep_region,tpfrep_type_of_report,tpfrep_week,tpfrep_source,username,start_date,end_date,updatedstarttime,updated_end_time,2)
                .then((res) => { 
                  this.setState({   
                    loading : false     
                  }) 
                  if(res.status)
                    {
                      createNotification('Created','success','filled')
                      this.setState({
                        tpfrep_date:'',
                        tpfrep_activity_type:'',
                        tpfrep_no_of_dps:'',
                        tpfrep_user:'',
                        tpfrep_type_of_report:'',
                        tpfrep_source:'',
                        tpfrep_week:'',
                        tpfrep_region:'',
                        tpfrep_area:'',
                        areadata:[],
                        vesseloperator_data:[],
                        tpfrep_is_submit:false,
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
            this.setState({
                tpfrep_is_submit:true
              })
              createNotification('Please fill mandatory field','error','filled')
        }
    }
    clearValueTPFREP()
    {
        this.setState({
            tpfrep_date:'',
            tpfrep_activity_type:'',
            tpfrep_no_of_dps:'',
            tpfrep_user:'',
            tpfrep_type_of_report:'',
            tpfrep_source:'',
            tpfrep_week:'',
            tpfrep_region:'',
            tpfrep_area:'',
            areadata:[],
            vesseloperator_data:[],
            tpfrep_is_submit:false,
        })
    }
  
    handleChangeregionEpos(value)
    {
      this.setState({  eops_region: value,eops_area:'',areadata:[],vesseloperator_data:[],eops_vesseloperator:'' })
      this.fetcharea(value)
    }
    handleChangeareaEpos(value)
    {
      const {eops_region} = this.state
      this.setState({  eops_area: value,vesseloperator_data:[],eops_vesseloperator:'' })
      // this.fetchvesseloperator(eops_region,value)
    }
    
    handleChangeregionTPFREP(value)
    {
      this.setState({  tpfrep_region: value ,tpfrep_area:'',areadata:[]})
      this.fetcharea(value)
    }
    handleChangeareaTPFREP(value)
    {
      
      this.setState({  tpfrep_area: value })
     
    }
 
    render()
    {
        const {match,locale,languageData} = this.props
        const { loading} = this.state
        return (
            <>
            <title>{onChangeLanguage(locale,'Error Capture Module',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'Error Capture Module',languageData)} match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <div>
                {this.renderEPOS()}
                {this.renderTPFREP()}
              </div>
          </>
        )
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
    renderEPOS()
    {
        const {locale,languageData} = this.props
        const { areadata,sourcedata,regiondata,activitydata,eops_is_submit,eops_date,
            eops_no_of_containers,eops_activity_type,eops_area,eops_comments,eops_region,
            eops_source, eops_user,eops_week} = this.state
        return(
            <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
           <div className = "publish-title" >
                <Row>
                <Colxx xxs="12">
                    <Label  className = "fontstyle" 
                        style = {{fontWeight:700,fontSize:'15px'}}>{ onChangeLanguage(locale,'EPOS (Issue Handling, Street Turns, Time Pending Montoring)',languageData)}</Label>
                </Colxx>
                </Row>
            </div>
            <div className = "row" style = {{padding:'10px'}}>
                <div className = "col-lg-2-0 space-margin">
                    <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Date',languageData)}<a style = {{color :'red'}}>*</a></Label>
                    <Input className = {eops_is_submit === true && eops_date === ''?  "error-border":"fontstyle text-background" }   
                        data-date-format='mm/dd/yy'
                        type="date"  
                        placeholder = ''
                        value = {eops_date}  
                        onChange= {(e)=>this.setState({eops_date : e.target.value})} 
                        />
                </div>
                <div className = "col-lg-2-0 space-margin">
                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Activity Type',languageData)}<a style = {{color :'red'}}>*</a></Label>
                    <Select   className={eops_is_submit === true && eops_activity_type === ''?  "error-border-select":"react-select fontstyle" }
                    classNamePrefix="react-select"
                    name="form-field-name"
                    value={activitydata.filter(option =>option.value === eops_activity_type)}
                    options={activitydata}
                    onChange={(option)=>this.setState({eops_activity_type:option.value})}
                />
                </div>
                <div className = "col-lg-2-0 space-margin">
                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'No of Containers',languageData)}<a style = {{color :'red'}}>*</a></Label>
                    <Input  className = {eops_is_submit === true && eops_no_of_containers === ''?  "error-border":"fontstyle text-background" }    
                    type = "number" min="0"  step='1'
                    placeholder = ''
                    onKeyDown={this.handleKeypress}
                    value = {eops_no_of_containers}  
                    onChange= {(e)=>this.setState({eops_no_of_containers : e.target.value})} 
                    />
                </div>
                <div className = "col-lg-2-0 space-margin">
                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'User ID',languageData)}<a style = {{color :'red'}}>*</a></Label>
                    <Input  className = {eops_is_submit === true && eops_user === ''?  "error-border":"fontstyle text-background" }     
                    placeholder = ''
                    value = {eops_user}  
                    onChange= {(e)=>this.setState({eops_user : (e.target.value).toUpperCase()})} 
                    />
                </div>
                <div className = "col-lg-2-0 space-margin">
                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Comments',languageData)}<a style = {{color :'red'}}>*</a></Label>
                    <Input className = {eops_is_submit === true && eops_comments === ''?  "error-border":"fontstyle text-background" }   
                        value = {eops_comments}  
                        onChange= {(e)=>this.setState({eops_comments : e.target.value})} ></Input>
                </div>
                
                <div className = "col-lg-2-0 space-margin">
                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Source',languageData)}<a style = {{color :'red'}}>*</a></Label>
                    <Select className={eops_is_submit === true && eops_source === ''?  "error-border-select":"react-select fontstyle" }
                    classNamePrefix="react-select"
                    name="form-field-name"
                    value={sourcedata.filter(option =>option.value === eops_source)}
                    options={sourcedata}
                    onChange={(option)=>this.setState({eops_source:option.value})}
                />
                </div>
                <div className = "col-lg-2-0 space-margin">
                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Week',languageData)}<a style = {{color :'red'}}>*</a></Label>
                    <Input className = {eops_is_submit === true && eops_week === ''?  "error-border":"fontstyle text-background" }   
                        value = {eops_week}  
                        onChange= {(e)=>this.setState({eops_week : e.target.value})} ></Input>
                </div>
                <div className = "col-lg-2-0 space-margin">
                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Region',languageData)}<a style = {{color :'red'}}>*</a></Label>
                    <Select  className={eops_is_submit === true && eops_region === ''?  "error-border-select":"react-select fontstyle" }
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={regiondata.filter(option =>option.value === eops_region)}
                        options={regiondata}
                        onChange={({value}) => this.handleChangeregionEpos(value) }
                    />
                </div>
                <div className = "col-lg-2-0 space-margin">
                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Area',languageData)}<a style = {{color :'red'}}>*</a></Label>
                    <Select className={eops_is_submit === true && eops_area === ''?  "error-border-select":"react-select fontstyle" }
                    classNamePrefix="react-select"
                    name="form-field-name"
                    value={areadata.filter(option =>option.value === eops_area)}
                    options={areadata}
                    onChange={(option) => this.handleChangeareaEpos(option.value)}
                  />
                </div>
                {/* <div className = "col-lg-2-0 space-margin">
                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Vessle Operator',languageData)}<a style = {{color :'red'}}>*</a></Label>
                    <Select className={eops_is_submit === true && eops_vesseloperator === ''?  "error-border-select":"react-select fontstyle" }
                    classNamePrefix="react-select"
                    name="form-field-name"
                    value={vesseloperator_data.filter(option =>option.value === eops_vesseloperator)}
                    options={vesseloperator_data}
                    onChange={({value}) => this.setState({  eops_vesseloperator: value })}
                  />
                </div> */}
                
            </div>
            <div className = "row text-center">              
                  <Button className = "button-width" color="primary"  
                        onClick={()=>this.onSubmitEPOS()}
                        >{onChangeLanguage(locale,'Save',languageData)} </Button>            
                     <Button className = "button-width" color="secondary" 
                            onClick={()=>this.clearValueEPOS()}
                   >{onChangeLanguage(locale,'Refresh',languageData)}</Button>            
            </div>
        </div>  
        
        )
    }
    renderTPFREP()
    {
        const {locale,languageData} = this.props
        const {areadata,sourcedata,regiondata,activitysdata,type_of_report_data,tpfrep_is_submit,tpfrep_date,
            tpfrep_no_of_dps,tpfrep_activity_type,tpfrep_area,tpfrep_user,
            tpfrep_region,tpfrep_type_of_report,tpfrep_week,tpfrep_source} = this.state
        return(
            <div className = "publishuser-card-component" style = {{marginBottom:'30px',borderRadius:'10px'}}>
            <div className = "publish-title" >
                <Row>
                <Colxx xxs="4">
                    <Label  className = "fontstyle" 
                        style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'Terminal Performance Report (TPFREP)',languageData)}</Label>
                </Colxx>
                </Row>
            </div>
        <div className = "row" style = {{padding:'10px'}}>
        <div className = "col-lg-2-0 space-margin">
                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Date',languageData)}<a style = {{color :'red'}}>*</a></Label>
                    <Input className = {tpfrep_is_submit === true && tpfrep_date === ''?  "error-border":"fontstyle text-background" }   
                        data-date-format='mm/dd/yy'
                        type="date"  
                        placeholder = ''
                        value = {tpfrep_date}  
                        onChange= {(e)=>this.setState({tpfrep_date : e.target.value})} 
                        />
                </div>
                <div className = "col-lg-2-0 space-margin">
                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Activity Type',languageData)}<a style = {{color :'red'}}>*</a></Label>
                    <Select  className={tpfrep_is_submit === true && tpfrep_activity_type === ''?  "error-border-select":"react-select fontstyle" }
                    classNamePrefix="react-select"
                    name="form-field-name"
                    value={activitysdata.filter(option =>option.value === tpfrep_activity_type)}
                    options={activitysdata}
                    onChange={(option) =>this.setState({tpfrep_activity_type:option.value})}
                />
                </div>
                <div className = "col-lg-2-0 space-margin">
                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'No of TDRs',languageData)}<a style = {{color :'red'}}>*</a></Label>
                    <Input  className = {tpfrep_is_submit === true && tpfrep_no_of_dps === ''?  "error-border":"fontstyle text-background" }  
                    type = "number" min="0"  step='1'
                    placeholder = ''
                    onKeyDown={this.handleKeypress}
                    value = {tpfrep_no_of_dps}  
                    onChange= {(e)=>this.setState({tpfrep_no_of_dps : e.target.value})} 
                    />
                </div>
                <div className = "col-lg-2-0 space-margin">
                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'User ID',languageData)}<a style = {{color :'red'}}>*</a></Label>
                    <Input  className = {tpfrep_is_submit === true && tpfrep_user === ''?  "error-border":"fontstyle text-background" }  
                    placeholder = ''
                    value = {tpfrep_user}  
                    onChange= {(e)=>this.setState({tpfrep_user : (e.target.value).toUpperCase()})} 
                    />
                </div>
                <div className = "col-lg-2-0 space-margin">
                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Type of Report',languageData)}<a style = {{color :'red'}}>*</a></Label>
                    <Select  className={tpfrep_is_submit === true && tpfrep_activity_type === ''?  "error-border-select":"react-select fontstyle" }
                    classNamePrefix="react-select"
                    name="form-field-name"
                    value={type_of_report_data.filter(option =>option.value === tpfrep_type_of_report)}
                    options={type_of_report_data}
                    onChange={(option) =>this.setState({tpfrep_type_of_report:option.value})}
                />
                </div>
                <div className = "col-lg-2-0 space-margin">
                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Source',languageData)}<a style = {{color :'red'}}>*</a></Label>
                    <Select  className={tpfrep_is_submit === true && tpfrep_source === ''?  "error-border-select":"react-select fontstyle" }
                    classNamePrefix="react-select"
                    name="form-field-name"
                    value={sourcedata.filter(option =>option.value === tpfrep_source)}
                    options={sourcedata}
                    onChange={(option) =>this.setState({tpfrep_source:option.value})}
                />
                </div>
                <div className = "col-lg-2-0 space-margin">
                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Week',languageData)}<a style = {{color :'red'}}>*</a></Label>
                    <Input className = {tpfrep_is_submit === true && tpfrep_week === ''?  "error-border":"fontstyle text-background" } 
                        value = {tpfrep_week}  
                        onChange= {(e)=>this.setState({tpfrep_week : e.target.value})} ></Input>
                </div>
                <div className = "col-lg-2-0 space-margin">
                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Region',languageData)}<a style = {{color :'red'}}>*</a></Label>
                    <Select  className={tpfrep_is_submit === true && tpfrep_region === ''?  "error-border-select":"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={regiondata.filter(option =>option.value === tpfrep_region)}
                            options={regiondata}
                            onChange={(option) =>this.handleChangeregionTPFREP(option.value)}
                        />
                </div>
                <div className = "col-lg-2-0 space-margin">
                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Area',languageData)}<a style = {{color :'red'}}>*</a></Label>
                    <Select className={tpfrep_is_submit === true && tpfrep_area === ''?  "error-border-select":"react-select fontstyle" }
                    classNamePrefix="react-select"
                    name="form-field-name"
                    value={areadata.filter(option =>option.value === tpfrep_area)}
                    options={areadata}
                    onChange={(option) =>this.handleChangeareaTPFREP(option.value)}
              />
                </div>
               
                
        </div> 
        <div className = "row text-center">              
                  <Button className = "button-width" color="primary"  
                        onClick={()=>this.onSubmitTPFREP()}
                        >{onChangeLanguage(locale,'Save',languageData)} </Button>                 
                     <Button className = "button-width" color="secondary" 
                            onClick={()=>this.clearValueTPFREP()}
                   >{onChangeLanguage(locale,'Refresh',languageData)}</Button>                
            </div>
        </div>
      
    
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

