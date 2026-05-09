import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import{asiaerrorreportService} from '../../../../redux/asia/asiaerrorreport/saga'
import{ErrorSheetService} from '../../../../redux/asia/errorsheet/saga'
import{typeService} from '../../../../redux/projectmasters/type/saga'
import {onChangeLanguage,getCurrentWeek,convertLocalToUTCDate} from '../../../../helper'
import { createNotification } from '../../../../toast';
import Loading from "react-fullscreen-loading";
import moment from 'moment';
import{asiareportService} from '../../../../redux/asia/asiareport/saga'

class Sidebar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        week:'',
        date:'',
        region:'',
        totaltime:'',
        starttime:'',
        endtime:'',
        month:'',
        report:'',
        regiondata:[],
        reportdata:[],
        errorreported:'',
        nooferror:'',
        reportedby:'',
        errordescription:'',
        error_email:'',
        error_doneby:'',
        is_submit:false,
        loading:false,
        start_time:new Date(),
        updated_start_time:new Date()
      };
    }
    componentDidMount() {
       
        this.setState({
            date:moment(new Date()).format('MM/DD/YYYY'),
            week:getCurrentWeek(new Date()).toString(),
            month:new Date().getMonth() + 1,
            year:new Date().getFullYear(),
        })
       this.fetchregion()
       this.fetchcatagory()
    }
    fetchcatagory() {
        this.setState({loading:true})
        asiareportService.fetchasiareport()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var regionlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   });  
                    this.setState({
                    reportdata :  regionlist
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
        asiaerrorreportService.fetchasiaerrorreport()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var regionlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   });  
                    this.setState({
                    regiondata :  regionlist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  
     fetchtype() {
        this.setState({loading:true})
        typeService.fetchtype()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var typelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString(),unit:cusmaidid.unit};
                   });
                    this.setState({
                    categorydata :  typelist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  
    handlecustomtype = (selectedOptions) => {
        this.setState({region : selectedOptions.value})  
      }  
      onSubmit() { 
        const {year,week,date,report,region,month,errorreported,nooferror,reportedby,errordescription,
          error_email,error_doneby,updated_start_time} = this.state;
        
        if(region !== '' &&report!== '' && errorreported !== '' && nooferror !== '' &&
            reportedby !== '' && errordescription !== '' &&error_doneby !== '' &&error_email!== ''  )
        {
           
            this.setState({
              loading : true,
            })
            const {username}=this.props
            let end_date=convertLocalToUTCDate(new Date()),
                 start_date=convertLocalToUTCDate(updated_start_time),
                 updatedstarttime=convertLocalToUTCDate(updated_start_time),
                 updated_end_time=convertLocalToUTCDate(new Date())
            ErrorSheetService.createerrorsheet(week,month.toString(),year.toString(),date,region,report,errorreported,nooferror,
            reportedby,errordescription,error_doneby,error_email,start_date,end_date,updatedstarttime,updated_end_time,username)
              .then((res) => { 
                this.setState({   
                  loading : false     
                }) 
                if(res.status)
                  {
                    createNotification('Created','success','filled')
                    this.setState({
                      date:moment(new Date()).format('MM/DD/YYYY'),
                      week:getCurrentWeek(new Date()).toString(),
                      month:new Date().getMonth() + 1,
                      report:'',
                      region:'',
                      error_doneby:'',
                      error_email:'',
                      errordescription:'',
                      errorreported:'',
                      nooferror:'',
                      reportedby:'',
                      is_submit:false,
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
            is_submit:true
        })
          createNotification('Please fill mandatory field','error','filled')
        }
      }
   
 
  onrefresh() {
    this.setState({
        date:moment(new Date()).format('MM/DD/YYYY'),
        week:getCurrentWeek(new Date()).toString(),
        month:new Date().getMonth() + 1,
        report:'',
        region:'',
        error_doneby:'',
        error_email:'',
        errordescription:'',
        errorreported:'',
        nooferror:'',
        reportedby:'',
        is_submit:false,
    })
   
  } 
  onChangenn = (e) => {
    let value = e.target.value
  
    value = value.replace(/[^A-Za-z]/ig, '')
    
    this.setState({
      errorreported:value.toUpperCase()
    })
  }
  onChangeerror = (e) => {
    let value = e.target.value
  
    value = value.replace(/[^A-Za-z]/ig, '')
  
    this.setState({
      error_doneby:value.toUpperCase()
    })
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
        const{year,date,week,month,is_submit,region,report,reportdata,regiondata,loading,
            errorreported,nooferror,reportedby,errordescription,error_email,error_doneby}=this.state
        const {match,username,locale,languageData} = this.props
        return (
            <>
            <title>{onChangeLanguage(locale,'Error Sheet',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'Error Sheet',languageData)} match={match} />
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
                <div className = "row" style = {{padding:'10px'}}>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Week',languageData)}</a>
                            <br></br>{week}</Label>
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Month',languageData)}</a>
                            <br></br>{month}</Label>
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Year',languageData)}</a><br></br>{year}</Label>
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Date',languageData)}</a>
                            <br></br> {date}</Label>
                        </div>
                        <div className = "col-md-3 space-margin ">
                            <Label  className = "fontstyle normal-font" > 
                            {onChangeLanguage(locale,'Region',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                                <Select  
                                className = {is_submit === true && region === ''?  "error-border-select-paste":"react-select fontstyle" }  
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={regiondata.filter(option =>option.value === region)}
                                options={regiondata}
                                onChange={(option) => this.setState({  region: option.value })}
                             />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Report',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                                className = {is_submit === true && region === ''?  "error-border-select-paste":"react-select fontstyle" }  
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={reportdata.filter(option =>option.value === report)}
                                options={reportdata}
                                onChange={(option) => this.setState({  report: option.value })}
                             />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Error Reported',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                           
                            <Input  className = {is_submit === true && errorreported === ''?  "error-border":"fontstyle text-background" }
                            value = {errorreported}  
                            onChange={this.onChangenn} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Number of Error/Instance',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && nooferror === ''?  "error-border":"fontstyle text-background" }    
                              type = "number" min="0"  step='1'
                              onKeyDown={this.handleKeypress}
                            // placeholder = 'End date'
                            value = {nooferror}  
                            onChange= {(e)=>this.setState({nooferror : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Reported By',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && reportedby === ''?  "error-border":"fontstyle text-background" }    
                             
                            // placeholder = 'End date'
                            value = {reportedby}  
                            onChange= {(e)=>this.setState({reportedby :  (e.target.value).toUpperCase()})}
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Error Description',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && errordescription === ''?  "error-border":"fontstyle text-background" }    
                           
                            // placeholder = 'End date'
                            value = {errordescription}  
                            onChange= {(e)=>this.setState({errordescription : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Error Done By',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && error_doneby === ''?  "error-border":"fontstyle text-background" }  
                            // placeholder = 'End date'
                            value = {error_doneby}  
                            onChange={this.onChangeerror} 
                            // onChange= {(e)=>this.setState({error_doneby : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Error Email Timestamp',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && error_email === ''?  "error-border":"fontstyle text-background" }    
                          
                            // placeholder = 'End date'
                            value = {error_email}  
                            onChange= {(e)=>this.setState({error_email : e.target.value})} 
                            />
                        </div>
                    </div>
                    <div className = "row text-center" style = {{margin:'0px 5px'}}>
                        <Button className = "button-width" color="primary"  
                                onClick={()=>this.onSubmit()}>
                        {onChangeLanguage(locale,'Save',languageData)} 
                        </Button>
                        <Button className = "button-width" color="secondary"
                                onClick={()=>this.onrefresh()}>
                               {onChangeLanguage(locale,'Refresh',languageData)} 
                            </Button>
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

   })(Sidebar)
  );

