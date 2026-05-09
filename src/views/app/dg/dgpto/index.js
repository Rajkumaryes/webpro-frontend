import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
// import { Checkbox, Popconfirm ,Tooltip } from 'antd';
import Select from 'react-select';
import DatePicker from "../../datePicker";
import "react-datepicker/dist/react-datepicker.css";
import { createNotification } from '../../../../toast';
import{DgptoService} from '../../../../redux/dgtt/dg _pto/saga'
import{RegionService} from '../../../../redux/dgtt/dgregion/saga'
import{MisactivityService}from '../../../../redux/dgtt/dgptoactivity/saga'
import {onChangeLanguage,convertLocalToUTCDate,convertUTCToLocalDate} from '../../../../helper'
import Loading from "react-fullscreen-loading";
import moment from 'moment';

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        region:'',
        noofbooking:'',
        status:'',
        userid:'',
        startdate:'',
        enddate:'',
        activity:'',
        activitydata:[],
        vesselname:'',
        ap:'',
        document:'',
        containerno:'',
        regiondata:[],
        createdat:'',
        completed:'',
        closed:'',
        loading:false,
        is_submit:false,
        start_time:new Date(),
        updated_start_time:new Date(),
        dgptocount:'',
        dgptocountlast:''
      };
    }
    componentDidMount() {
       
      this.setState({
          startdate:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
      })
    this.fetchregion()
    this.fetchactivity()
    this.fetchdgptoinputcount()
  }
  fetchdgptoinputcount(){
    this.setState({loading:true})
    const {username} = this.props
    // console.log(username)
    DgptoService.fetchdgptoinputcount(username)
    .then((res) => {
       if(res.status)   { 
              let filterstatus = res.data;
              let lastdata = res.lastcount;
              this.setState({ 
                dgptocount:filterstatus, 
                dgptocountlast:lastdata     
              }) 
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})

}
  fetchactivity() {
    this.setState({loading:true})
    MisactivityService.fetchmisactivity()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var activitylist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               });  
               var activity_list = filterstatus.map(function(cusmaidid) {
                return  {text : cusmaidid.name ,value : cusmaidid.id};
             });  
                this.setState({
                activitydata :  activitylist,
                activity_data :  activity_list,
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
      RegionService.fetchregion()
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
    onPaste() 
    {
        navigator.clipboard.readText().then((text)=>{
            console.log("lkbkjj" , text)
            console.log("lkbkjj" ,typeof text)
          
        })
    }
    onCopy()
    {
        navigator.clipboard.writeText(this.state.shipment)
    }
    handleregion = (selectedOptions) => {
        this.setState({region : selectedOptions.value})  
    } 
    handleactivity = (selectedOptions) => {
        this.setState({activity : selectedOptions.value})  
    } 
    onSubmit() { 
        const {region,noofbooking,userid,activity,vesselname,containerno,startdate,document,updated_start_time} = this.state;
        if(region!== "" &&vesselname!== "" &&activity!== "" &&noofbooking!== "" &&containerno)
        { 
          const {username} = this.props
          let end_date=convertLocalToUTCDate(new Date()),
          start_date=convertLocalToUTCDate(updated_start_time),
          updatedstarttime=convertLocalToUTCDate(updated_start_time),
          updated_end_time=convertLocalToUTCDate(new Date()),
          end_time=moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
          this.setState({
            userid:username,
            enddate:end_time
          })
        this.createAPI(username,startdate,end_time,region,vesselname,document,activity,noofbooking,containerno,start_date,end_date,updatedstarttime,updated_end_time)
        }
        else
        {
        this.setState({
            is_submit:true
        })
          createNotification('Please fill mandatory field','error','filled')
        }
      }
      createAPI(userid,startdate,end_time,region,vesselname,document,activity,noofbooking,containerno,start_date,end_date,updatedstarttime,updated_end_time)
      {
        this.setState({
          loading : true
        })
        DgptoService.createdgpto(userid,startdate,end_time,region,vesselname,document,activity,noofbooking,containerno,start_date,end_date,updatedstarttime,updated_end_time)
          .then((res) => { 
            this.setState({   
              loading : false     
            }) 
            if(res.status)
              {
                createNotification('Created','success','filled')
                this.setState({
                  startdate:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
                  region:'',
                  noofbooking:'',
                  status:'',
                  userid:'',
                  enddate:'',
                  activity:'',
                  vesselname:'',
                  ap:'',
                  document:'',
                  containerno:'',
                  is_submit:false,
                   
                 })
                 this.fetchdgptoinputcount()
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
  onChangetime(date)
  {
    let documentdate=moment(convertUTCToLocalDate(date)).format('MM/DD/YYYY hh:mm:ss a')
    this.setState({
      document  : documentdate,
    })
   
  } 
  clearvalue()
     {
       
         this.setState({
          startdate:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
          region:'',
          noofbooking:'',
          status:'',
          userid:'',
          enddate:'',
          activity:'',
          vesselname:'',
          ap:'',
          document:'',
          containerno:'',
          is_submit:false,
           
         })
     } 
    render()
    {
        const {match,locale,languageData,username} = this.props
        const {region,noofbooking,userid,activity,vesselname,document,containerno,dgptocount,dgptocountlast,
        activitydata,startdate,enddate,regiondata,loading,is_submit} = this.state
        return (
            <>
            <title>{onChangeLanguage(locale,'DG-PTO',languageData)}</title>
            {loading && 
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
            <Row>
              <Colxx xxs="12">
                
                <div className="row">
                  <div className="col-md-8">
                  <Breadcrumb heading={onChangeLanguage(locale,'DG-PTO',languageData)} match={match} />
                  </div>
                  <div className = "col-md-2" >
                  <h2 style = {{marginTop:'15px'}}>Total EQ : {dgptocount}</h2>
                  </div>
                  <div className = "col-md-2">
                      <h2  style = {{marginTop:'15px'}}>Last EQ : {dgptocountlast}</h2>
                  </div>
            </div>
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row" style = {{padding:'10px'}}>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'User ID',languageData)}
                              <br></br>{username}</Label>
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Start Date',languageData)}
                              <br></br>{startdate}</Label>
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'End Date',languageData)}
                              <br></br>{enddate}</Label>
                           
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Region',languageData)}
                              <a style = {{color :'red'}}>*</a> </Label>
                            <Select  
                             style={{height:'85px'}}
                             className = {is_submit === true && region === ''?  "error-border-select-paste":"react-select fontstyle" } 
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={regiondata.filter(option =>option.value === region)}
                            options={regiondata}
                            onChange={this.handleregion}
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Vessel Name',languageData)}
                              <a style = {{color :'red'}}>*</a> </Label>
                            <Input  
                             className = {is_submit === true && vesselname === ''?  "error-border":"fontstyle text-background" }  
                            placeholder = ''
                            value = {vesselname}  
                            onChange= {(e)=>this.setState({vesselname : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Document Cut Off Time',languageData)}
                              <a style = {{color :'red'}}>*</a> </Label>
                              {is_submit === true && document === '' &&   
                              <p1 className = 'fontstyle mandatory-label'> 
                              {onChangeLanguage(locale,'Mandatory Field',languageData)} 
                              </p1>}
                            <DatePicker
                            selected={document}
                            className = "text-background" 
                            onChange={(date) => this.onChangetime(date)}
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Activity',languageData)}
                              <a style = {{color :'red'}}>*</a> </Label>
                            <Select  
                             style={{height:'85px'}}
                             className = {is_submit === true && activity === ''?  "error-border-select-paste":"react-select fontstyle" } 
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={activitydata.filter(option =>option.value === activity)}
                            options={activitydata}
                            onChange={this.handleactivity}
                            />
                        </div>
                        
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'No. of Booking',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && noofbooking === ''?  "error-border":"fontstyle text-background" }    
                            placeholder = ''
                            type = "number" min="0" 
                            value = {noofbooking}  
                            onChange= {(e)=>this.setState({noofbooking : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'No of Container',languageData)}
                            <a style = {{color :'red'}}>*</a> </Label>
                            <Input  
                             className = {is_submit === true && containerno === ''?  "error-border":"fontstyle text-background" }  
                            placeholder = ''
                            type = "number" min="0" 
                            value = {containerno}  
                            onChange= {(e)=>this.setState({containerno : e.target.value})} 
                            />
                        </div>
                       
                    </div>
                    <div className = "row text-center" style = {{margin:'0px 5px'}}>
                          <Button className = "button-width" color="primary"  style={{width:'150px'}}
                                onClick={()=>this.onSubmit()}
                                >{onChangeLanguage(locale,'Save',languageData)} </Button>
                             <Button className = "button-width" color="secondary" style={{width:'150px'}} 
                                    onClick={()=>this.clearvalue()}
                           >{onChangeLanguage(locale,'Refresh',languageData)}</Button>
                        
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

