import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import{asiaerrorreportService} from '../../../../redux/asia/asiaerrorreport/saga'
import{AsiaReportingService} from '../../../../redux/asia/asiareporting/saga'
import{typeService} from '../../../../redux/projectmasters/type/saga'
import {onChangeLanguage,getCurrentWeek,getTimeDifference,convertLocalToUTCDate} from '../../../../helper'
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
            starttime:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
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
        const {week,date,report,region,endtime,month,starttime,updated_start_time} = this.state;
        let  end_time =  moment(new Date()).format('MM/DD/YYYY hh:mm:ss a') ,
            time_taken = getTimeDifference(starttime,new Date())
            
        if(report !== "" && region !=='' )
        {
           
            this.setState({
              loading : true,
              endtime:end_time,
              totaltime:time_taken
            })
            const {username}=this.props
            let end_date=convertLocalToUTCDate(new Date()),
            start_date=convertLocalToUTCDate(updated_start_time),
            updatedstarttime=convertLocalToUTCDate(updated_start_time),
            updated_end_time=convertLocalToUTCDate(new Date())
            AsiaReportingService.createasiareporting(date,week,month.toString(),time_taken,report,region,starttime,end_time,
            start_date,end_date,updatedstarttime,updated_end_time,username)
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
                      starttime:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
                      report:'',
                      region:'',
                      endtime:'',
                      totaltime:'',
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
    onChangetime(date)
  {
    console.log("lhnkjh " ,date)
    var time = moment(date).format('HH:mm:ss')
    if(time !== "00:00:00")
    {
      this.setState({starttime  : date})
    }
   
  }
 
  onrefresh() {
    this.setState({
        date:moment(new Date()).format('MM/DD/YYYY'),
        week:getCurrentWeek(new Date()).toString(),
        month:new Date().getMonth() + 1,
        starttime:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
        report:'',
        region:'',
        endtime:'',
        totaltime:'',
        is_submit:false,
    })
   
  } 
    render()
    { 
        const{starttime,endtime,totaltime,date,week,month,is_submit,region,report,reportdata,regiondata,loading}=this.state
        const {match,username,locale,languageData} = this.props
        return (
            <>
            <title>{onChangeLanguage(locale,'Asia Reporting',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'Asia Reporting',languageData)} match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            {loading && 
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
          }
            <div>
            <div className = "" style = {{padding:'0px 10px',borderRadius:'10px',marginBottom:'10px'}}>
                    <div className = "row" >
                    <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Date',languageData)}</a>
                            <br></br> {date}</Label>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Week',languageData)}</a>
                            <br></br>{week}</Label>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Month',languageData)}</a>
                            <br></br>{month}</Label>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Start Time',languageData)}</a><br></br>{starttime}</Label>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'End Time',languageData)}</a><br></br>{endtime}</Label>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'TAT',languageData)}</a><br></br> 
                            {totaltime}</Label>
                        </div>
                    </div>
                </div> 
            <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>

                <div className = "row" style = {{padding:'10px'}}>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Report',languageData)} <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && report === ''?  "error-border-select-paste":"react-select fontstyle" }                          
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={reportdata.filter(option =>option.value === report)}
                            options={reportdata}
                            onChange={({value}) => this.setState({  report: value })}
                          />
                        </div>
                        <div className = "col-md-4 space-margin ">
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

