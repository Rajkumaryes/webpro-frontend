import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import { createNotification } from '../../../../toast';
import{ReportService} from '../../../../redux/fa/report/saga';
import {onChangeLanguage,getEnableexportimport} from '../../../../helper'
import "react-datepicker/dist/react-datepicker.css";
import{qualityexportService} from '../../../../redux/fa/qualityexport/saga';
import{subregionService} from '../../../../redux/fa/subregion/saga';
import{qualityimportService} from '../../../../redux/fa/qualityimport/saga';
import{dataService} from '../../../../redux/fa/data/saga';
import{AreaService} from '../../../../redux/fa/area/saga';
import{RegionService} from '../../../../redux/fa/region/saga';
import{errortypeService} from '../../../../redux/fa/errortype/saga';

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        subregion:'',
        area:'',
        region:'', 
        csbooking:'', 
        op_pol:'', 
        op_pod:'', 
        cc_saler:'',
        contract_party:'',
        data:'',
        export_quality:'',
        import_quality:'',
        startdate:'',
        enddate:'',
        auditor:'',
        subregionover:'',
        areaover:'',
        regionover:'',
        csbookingover:'', 
        op_polover:'', 
        op_podover:'', 
        cc_salerover:'',
        contract_partyover:'',
        dataover:'',
        export_qualityover:'',
        import_qualityover:'',
        startdateover:'',
        enddateover:'',
        auditorover:'',
        office:'',
        officeover:'',
        audit_type:'',
        office:'',
        areadata:[],
        exportqualitydata:[],
        importqualitydata:[],
        regoin_Data:[],
        subregiondata:[],
        dataselectedata:[],
        subregiondataover:[],
        exporterrortypeData:[],
        areaoverdata:[],
        is_submit:false,
        is_submitimport:false
      };
    }
    componentDidMount()
    {
      // var list = []
      // for(var i = 0; i<5;i++)
      // {
      //   var dict = {
      //     'Shipment':'757567',
      //   }
      //   list.push(dict)
      // }
      // this.setState({
      //   data:list
      // })
      this.fetchqualityimport()
      this.fetchqualityexport()
      this.fetchDataselected()
      this.fetchsubregion()
      this.fetcharea()
      this.fetchregion()
      this.fetcherrortype()
    }
    fetchqualityexport() {
        qualityexportService.fetchqualityexport()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var rolelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                   });  
                    this.setState({
                    exportqualitydata :  rolelist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
      } 
      fetchsubregion() {
        subregionService.fetchsubregion()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var rolelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                   });  
                    this.setState({
                    subregiondata :  rolelist,
                    subregiondataover:rolelist
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
      } 
      fetchDataselected() {
        dataService.fetchdata()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var rolelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.name};
                   });  
                    this.setState({
                        dataselectedata :  rolelist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
      } 
      fetcherrortype() {
        errortypeService.fetcherrortype()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var rolelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                   });  
                    this.setState({
                    exporterrortypeData :  rolelist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
      } 
      fetchqualityimport() {
        qualityimportService.fetchqualityimport()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var rolelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                   });  
                    this.setState({
                    importqualitydata :  rolelist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
      } 
      fetcharea() {
        AreaService.fetcharea()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var rolelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                   });  
                    this.setState({
                    areadata :  rolelist,
                    areaoverdata:rolelist
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
      } 
      fetchregion() {
        RegionService.fetchregion()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var rolelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                   });  
                    this.setState({
                    regoin_Data :  rolelist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
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
        navigator.clipboard.writeText(this.state.containerno)
    }
    onChangeRadio(value)
    {
        this.setState({activity:value})
    }
   
   
    fetchAPI()
    {
        const {subregion,area,region, csbooking, op_pol, op_pod, cc_saler,
            contract_party,data,export_quality,import_quality,startdate,enddate,auditor,audit_type,office} = this.state
            if(import_quality !=='' || export_quality !=='')
            {
            this.setState({
                loading : true
            })
            const {username} = this.props
            ReportService.downloadfinding(subregion,area,region, csbooking, op_pol, op_pod, cc_saler,
                contract_party,data,export_quality,import_quality,startdate,enddate,auditor,audit_type,office,username)
            .then((res) => { 
              this.setState({   
                   loading : false   
              }) 
              if(res.status)
                {
                  // let url = `${apiUrl}/${res.url}`;
                  // window.location.href = url;
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
        } else
        {
          createNotification('Please choose Quality(Exp.) or Quality(Imp.)','error','filled');
        }  
        } 
          
    
    fetchImport(audittype)
    {
        const {subregionover,areaover,regionover, csbookingover, op_polover, op_podover, cc_salerover,
            contract_partyover,dataover,export_qualityover,import_qualityover,startdateover,enddateover,
            auditorover,audit_type,officeover} = this.state
           
            this.setState({
                loading : true
            })
            const {username} = this.props
            ReportService.downloadoverview(subregionover,areaover,regionover, csbookingover, op_polover, op_podover, cc_salerover,
                contract_partyover,dataover,export_qualityover,import_qualityover,startdateover,enddateover,
                auditorover,audittype,officeover,username)
            .then((res) => { 
              this.setState({   
                   loading : false   
              }) 
              if(res.status)
                {

                  
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
        
  
    // onClickback()
    // {
    //     this.props.history.push(`/app/fa/shipment-details`)
    // }
    onClickback()
    {
      this.props.history.goBack()
    }
    handlechange_region_over = (selectedOptions) => {
        this.setState({regionover : selectedOptions.value})
        subregionService.regionwisefilter(selectedOptions.value.toString())
        .then((res) => {
        if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var arealist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                subregiondataover :  arealist,
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { });  
      } 
      handlechange_subregion_over = (selectedOptions) => {
        const{regionover}=this.state
        this.setState({subregionover : selectedOptions.value})
        AreaService.filterarea(regionover,selectedOptions.value.toString())
        .then((res) => {
        if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var arealist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                areaoverdata :  arealist,
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { });  
      } 
      handlechangeregion = (selectedOptions) => {
        this.setState({region : selectedOptions.value})
        subregionService.regionwisefilter(selectedOptions.value.toString())
        .then((res) => {
        if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var arealist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                subregiondata :  arealist,
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { });  
      } 
      handlechangesubregion = (selectedOptions) => {
        const{region}=this.state
        this.setState({subregion : selectedOptions.value})
        AreaService.filterarea(region,selectedOptions.value.toString())
        .then((res) => {
        if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var arealist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                areadata :  arealist,
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { });  
      } 
      handlechangedataselected = (selectedOptions) => {
        const {startdate,enddate}=this.state
        if (startdate !=='' && enddate !=='') {
          this.setState({data : selectedOptions.value})
        }
        else{
          createNotification('Please Ender the Start Date and End Date','error','filled')
      }
      } 
      handlechangeover_dataselected = (selectedOptions) => {
        const {startdateover,enddateover}=this.state
        if (startdateover !=='' && enddateover !=='') {
          this.setState({dataover : selectedOptions.value})
        }
        else{
          createNotification('Please Ender the Start Date and End Date','error','filled')
      }
      } 
      clearvalue()
     {
        this.setState({
            subregion:'',
            area:'',
            region:'',
            csbooking:'',
            op_pol:'',
            op_pod:'',
            cc_saler:'',
            contract_party:'',
            data:'',
            export_quality:'',
            import_quality:'',
            startdate:'',
            enddate:'',
            office:''
        })
      }
      overviewclearvalue()
     {
        this.setState({
            subregionover:'',
            areaover:'',
            regionover:'',
            csbookingover:'',
            op_polover:'',
            op_podover:'',
            cc_salerover:'',
            contract_partyover:'',
            dataover:'',
            export_qualityover:'',
            import_qualityover:'',
            startdateover:'',
            enddateover:'',
            officeover:''
        })
      }
      handlechangeexportqyuality = (selectedOptions) => {
        this.setState({export_quality : selectedOptions.value})
      }
      handlechangeimportqyuality = (selectedOptions) => {
        this.setState({export_quality : selectedOptions.value})
      }
    render()
    {
        const {match,locale,languageData} = this.props
        const { subregion,area,region, csbooking, op_pol, op_pod, cc_saler,
            contract_party,data,export_quality,import_quality,startdate,enddate,auditor,
            subregionover,areaover,regionover, csbookingover, op_polover, op_podover, cc_salerover,
            contract_partyover,dataover,export_qualityover,import_qualityover,startdateover,enddateover,
            auditorover,areadata,office,officeover,exportqualitydata,importqualitydata,regoin_Data,dataselectedata,
            subregiondata,is_submit,is_submitimport,subregiondataover,areaoverdata
            
            } = this.state
        return (
            <>
            <title>{onChangeLanguage(locale,'Report',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'Report',languageData)} match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
            <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
            <div className = "publish-title" >
                          <Row>
                              <Colxx xxs="12">
                                  <Label  className = "fontstyle" 
                                  style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'Freight Audit Detailed Findings',languageData)}</Label>
                              </Colxx>
                          </Row>
                </div>
                    <div className = "row" style = {{padding:'10px'}}>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Cs Booking',languageData)}</Label>
                            <Input  
                            className = {"fontstyle text-background" } 
                            placeholder = ''
                            value = {csbooking}  
                            onChange= {(e)=>this.setState({csbooking : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'MR',languageData)}</Label>
                            <Input  className = {"fontstyle text-background" }  
                            placeholder = ''
                            value = {contract_party}  
                            onChange= {(e)=>this.setState({contract_party : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'POL',languageData)}</Label>
                            <Input  
                            className = {"fontstyle text-background" } 
                            placeholder = ''
                            value = {op_pol}  
                            onChange= {(e)=>this.setState({op_pol : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'POD',languageData)}</Label>
                            <Input  
                            className = {"fontstyle text-background" } 
                            placeholder = ''
                            value = {op_pod}  
                            onChange= {(e)=>this.setState({op_pod : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Region',languageData)}</Label>
                            <Select  
                                style={{height:'85px'}}
                                className = {"react-select fontstyle" } 
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={regoin_Data.filter(option =>option.value === region)}
                                options={regoin_Data}
                                onChange={this.handlechangeregion}
                                // onChange={({value}) => this.setState({  region: value })}
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Sub Region',languageData)}</Label>
                            <Select  
                                style={{height:'85px'}}
                                className = {"react-select fontstyle" }
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={subregiondata.filter(option =>option.value === subregion)}
                                options={subregiondata}
                                onChange={this.handlechangesubregion}
                                // onChange={({value}) => this.setState({  subregion: value })}
                            />                     
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Area',languageData)}</Label>
                            <Select  
                                style={{height:'85px'}}
                                className = {"react-select fontstyle" }
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={areadata.filter(option =>option.value === area)}
                                options={areadata}
                                onChange={({value}) => this.setState({  area: value })}
                            />  
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Office',languageData)}</Label>
                            <Input  
                            className = {"fontstyle text-background" }  
                            placeholder = ''
                            value = {office}  
                            onChange= {(e)=>this.setState({office : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Data Selected',languageData)}</Label>
                                <Select  
                                style={{height:'85px'}}
                                className = {"react-select fontstyle" }
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={dataselectedata.filter(option =>option.value === data)}
                                options={dataselectedata}
                                onChange={this.handlechangedataselected}
                                // onChange={({value}) => this.setState({  data: value })}
                            />
                            
                        </div>
                        
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Start Date',languageData)}</Label>
                            <Input  
                            className = {"fontstyle text-background" } 
                            data-date-format='mm/dd/yy'
                            type="date"
                            value = {startdate}  
                            onChange= {(e)=>this.setState({startdate : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'End Date',languageData)}</Label>
                            <Input  
                            className = {"fontstyle text-background" }  
                            data-date-format='mm/dd/yy'
                            type="date"
                            value = {enddate}  
                            onChange= {(e)=>this.setState({enddate : e.target.value})} 
                            />
                        </div>
                        
                        
                        
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'CC Sales Heir',languageData)}</Label>
                            <Input  
                            className = {"fontstyle text-background" } 
                            placeholder = ''
                            value = {cc_saler}  
                            onChange= {(e)=>this.setState({cc_saler : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-6 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Quality(Exp.)',languageData)}</Label>
                               <Select  
                                style={{height:'85px'}}
                                className = {"react-select fontstyle" }
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={exportqualitydata.filter(option =>option.value === export_quality)}
                                options={exportqualitydata}
                                isDisabled = {getEnableexportimport('export_quality',import_quality,export_quality)}
                                onChange={({value}) => this.setState({  export_quality: value })}
                            />
                        </div>
                        <div className = "col-md-6 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Quality(Imp.)',languageData)}</Label>
                             <Select  
                                style={{height:'85px'}}
                                className = {"react-select fontstyle" }
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={importqualitydata.filter(option =>option.value === import_quality)}
                                options={importqualitydata}
                                isDisabled = {getEnableexportimport('import_quality',import_quality,export_quality)}
                                onChange={({value}) => this.setState({  import_quality: value })}
                            />
                        </div>
                      

                    </div>
                    <div className = "row text-center" style = {{margin:'0px 5px'}}>
                       <Button className = "button-width" color="secondary"
                                    onClick={()=>this.clearvalue()}
                           >{onChangeLanguage(locale,'Refresh',languageData)}</Button>
                          <Button className = "button-width" color="primary"  
                                onClick={()=>this.onClickback()}
                                >{onChangeLanguage(locale,'Back',languageData)} </Button> 
                             <Button className = "button-width" color="secondary" 
                                    onClick={()=>this.fetchAPI()}
                           >{onChangeLanguage(locale,'Download',languageData)}</Button>
                    </div>
                </div>   
                <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                <div className = "publish-title" >
                          <Row>
                              <Colxx xxs="12">
                                  <Label  className = "fontstyle" 
                                  style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'Post Freight Audit Overview',languageData)}</Label>
                              </Colxx>
                          </Row>
                </div>
                    <div className = "row" style = {{padding:'10px'}}>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Cs Booking',languageData)}</Label>
                            <Input  
                            className = {"fontstyle text-background" } 
                            placeholder = ''
                            value = {csbookingover}  
                            onChange= {(e)=>this.setState({csbookingover : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'POL',languageData)}</Label>
                            <Input  
                            className = {"fontstyle text-background" } 
                            placeholder = ''
                            value = {op_polover}  
                            onChange= {(e)=>this.setState({op_polover : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'POD',languageData)}</Label>
                            <Input  
                            className = {"fontstyle text-background" } 
                            placeholder = ''
                            value = {op_podover}  
                            onChange= {(e)=>this.setState({op_podover : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >CC Sales</Label>
                            <Input  
                            className = {"fontstyle text-background" }  
                            placeholder = ''
                            value = {cc_salerover}  
                            onChange= {(e)=>this.setState({cc_salerover : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Region',languageData)}</Label>
                                <Select  
                                    style={{height:'85px'}}
                                    className = {"react-select fontstyle" }
                                    classNamePrefix="react-select"
                                    name="form-field-name"
                                    value={regoin_Data.filter(option =>option.value === regionover)}
                                    options={regoin_Data}
                                    onChange={this.handlechange_region_over}
                                    // onChange={({value}) => this.setState({  regionover: value })}
                                />
                         </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Sub Region',languageData)}</Label>
                            <Select  
                                    style={{height:'85px'}}
                                    className = {"react-select fontstyle" }
                                    classNamePrefix="react-select"
                                    name="form-field-name"
                                    value={subregiondataover.filter(option =>option.value === subregionover)}
                                    options={subregiondataover}
                                    onChange={this.handlechange_subregion_over}
                                    // onChange={({value}) => this.setState({  subregionover: value })}
                                />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >Area</Label>
                            <Select  
                                    style={{height:'85px'}}
                                    className = {"react-select fontstyle" }
                                    classNamePrefix="react-select"
                                    name="form-field-name"
                                    value={areaoverdata.filter(option =>option.value === areaover)}
                                    options={areaoverdata}
                                    onChange={({value}) => this.setState({  areaover: value })}
                                />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >Office</Label>
                            <Input  
                            className = {"fontstyle text-background" }  
                            placeholder = ''
                            value = {officeover}  
                            onChange= {(e)=>this.setState({officeover : e.target.value})} 
                            />
                        </div>
                       
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >MR</Label>
                            <Input  
                            className = {"fontstyle text-background" } 
                            placeholder = ''
                            value = {contract_partyover}  
                            onChange= {(e)=>this.setState({contract_partyover : e.target.value})} 
                            />
                        </div>
                        
                            <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >Data Selected</Label>
                                <Select  
                                style={{height:'85px'}}
                                className = {"react-select fontstyle" }
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={dataselectedata.filter(option =>option.value === dataover)}
                                options={dataselectedata}
                                onChange={this.handlechangeover_dataselected}
                                // onChange={({value}) => this.setState({  dataover: value })}
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Start Date',languageData)}</Label>
                            <Input 
                            className = {"fontstyle text-background" } 
                             data-date-format='mm/dd/yy'
                                type="date"
                                value = {startdateover}  
                                onChange= {(e)=>this.setState({startdateover  : e.target.value})} ></Input>
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'End Date',languageData)}</Label>
                            <Input 
                            className = {"fontstyle text-background" } 
                            data-date-format='mm/dd/yy'
                                type="date"
                                value = {enddateover}  
                                onChange= {(e)=>this.setState({enddateover  : e.target.value})} ></Input>
                        </div>
                    </div>
                    <div className = "row text-center" style = {{margin:'0px 5px'}}>
                       <Button className = "button-width" color="secondary"
                                    onClick={()=>this.overviewclearvalue()}
                           >{onChangeLanguage(locale,'Refresh',languageData)}</Button>
                          
                          <Button className = "button-width" color="primary"
                                onClick={()=>this.onClickback()}
                                >{onChangeLanguage(locale,'Back',languageData)}</Button> 
                             <Button className = "button-width" color="secondary" 
                                    onClick={()=>this.fetchImport('import')}
                           >{onChangeLanguage(locale,'Import Audit',languageData)}</Button>
                          <Button className = "button-width" color="secondary"  
                                onClick={()=>this.fetchImport('export')}
                                >{onChangeLanguage(locale,'Export Audit',languageData)} </Button> 
                         
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

