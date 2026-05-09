import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import{regionimportService} from '../../../../redux/imports/regionimport/saga'
import{CSIerrorService} from '../../../../redux/imports/csierrorcapturing/saga'
import{areaimportService} from '../../../../redux/imports/areaimport/saga'
import{errorcodeService} from '../../../../redux/imports/errorcode/saga'
import{csierroractivityService} from '../../../../redux/imports/csierroractivity/saga'
import{subactivityService} from '../../../../redux/imports/subactivity/saga'
import {onChangeLanguage,getCurrentWeek,getValue,
  convertLocalToUTCDate} from '../../../../helper'
import { createNotification } from '../../../../toast';
import Loading from "react-fullscreen-loading";
import Workbook from 'react-excel-workbook'
import moment from 'moment';
class Sidebar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        week:'',
        date:'',
        region:'',
        team:'',
        userid:'',
        error_userid:'',
        shipmentnumber:'',
        mtdnumber:'',
        errorcode:'',
        errorcount:'',
        activity:'',
        subactivity:'',
        error_description:'',
        data:[],
        teamdata:[],
        regiondata:[],
        errorcodedata:[],
        errorcode_data:[],
        subactivitydata:[],
        subactivity_data:[],
        activitydata:[],
        activity_data:[],
        is_submit:false,
        loading:false,
        start_time:new Date(),
        updated_start_time:new Date(),
      };
    }
    componentDidMount() {
        this.setState({
            date:moment(new Date()).format('MM/DD/YYYY'),
            week: getCurrentWeek(new Date())
        })
      //  this.fetchcsierror()
       this.fetchregion()
       this.fetchteam()
       this.fetcherrorcode()
       this.fetchactivity()
       this.fetchsubactivity()
    }
    fetchcsierror() {
        this.setState({loading:true})
        CSIerrorService.fetchcsierror()
        .then((res) => {
           if(res.status)   { 
                    this.setState({
                    data :  res.data,
                    loading:false
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({
                  loading : false
                })
      } 
      fetchregion() {
        this.setState({loading:true})
        regionimportService.fetchregionimport()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var regionlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   }); 
                    this.setState({
                    regiondata :  regionlist,
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
        areaimportService.fetchareaimport()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var teamlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.area_name ,value : cusmaidid.id.toString(),region_id:cusmaidid.region_id};
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
     fetcherrorcode() {
        this.setState({loading:true})
        errorcodeService.fetcherrorcode()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var errorcodelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   });  
                   var errorcode_list = filterstatus.map(function(cusmaidid) {
                    return  {text : cusmaidid.name ,value : cusmaidid.id};
                 });  
                    this.setState({
                    errorcodedata :  errorcodelist,
                    errorcode_data :  errorcode_list,
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
        csierroractivityService.fetchcsierroractivity()
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
     fetchsubactivity() {
        this.setState({loading:true})
        subactivityService.fetchsubactivity()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var subactivitylist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString(),error_code : cusmaidid.error_code};
                   });  
                   var subactivity_list = filterstatus.map(function(cusmaidid) {
                    return  {text : cusmaidid.name ,value : cusmaidid.id};
                 });  
                    this.setState({
                    subactivitydata :  subactivitylist,
                    subactivity_data :  subactivity_list,
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
        const {week,date,region,team,userid,error_userid,shipmentnumber,mtdnumber,errorcode,errorcount,activity,
          subactivity,error_description,start_time,updated_start_time} = this.state;
       
        if(region!=='' &&team!=='' &&error_userid!=='' && shipmentnumber!=='' &&mtdnumber!=='' &&
        errorcode!=='' &&errorcount!=='' &&activity!=='' &&subactivity!=='' &&error_description!=='')
        {  
            const {username} = this.props
            const end_time = new Date() ,updated_end_time = new Date()
          this.setState({
            loading : true
          })
          CSIerrorService.createcsierror(week.toString(),date,region,team,username,error_userid,shipmentnumber,mtdnumber,errorcode,
          errorcount,activity,subactivity,error_description,
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
                  createNotification('Created','success','filled')
                  this.onrefresh()
                  
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
    const {data,teamdata,regiondata,activity_data,subactivity_data,errorcode_data} = this.state
    var array = data.map(record=> {
          return {
            'week':record.week,
            'date':record.date,
            'region':getValue(regiondata,'value','label',parseInt(record.region)),
            'team':getValue(teamdata,'value','label',parseInt(record.team)),
            'userid':record.userid,
            'error_userid':record.error_userid,
            'shipmentnumber':record.shipmentnumber,
            'mtdnumber':record.mtdnumber,
            'errorcode':getValue(errorcode_data,'value','text',parseInt(record.errorcode)),
            'errorcount':record.errorcount,
            'activity':getValue(activity_data,'value','text',parseInt(record.activity)),
            'subactivity':getValue(subactivity_data,'value','text',parseInt(record.subactivity)),
            'error_description':record.error_description,
        };
      })
      return(
        
        <Workbook filename="CSI Error Capture.xlsx" element={
            <Button className = "button-width"  style={{width:'155px'}}
             color="secondary" >
            {onChangeLanguage(locale,'Download Template',languageData)} 
            </Button>
		      }>
          <Workbook.Sheet data={array} name="Sheet A">
          <Workbook.Column label="Week" value="week"  />
          <Workbook.Column label="Date" value="date"  />
          <Workbook.Column label="Region" value="region"  />
          <Workbook.Column label="Team" value="region"  />
          <Workbook.Column label="User ID" value="userid"  />
          <Workbook.Column label="Error - User ID" value="error_userid"  />
          <Workbook.Column label="Shipment Number" value="shipmentnumber"  />
          <Workbook.Column label="Mtd Number" value="mtdnumber"  />
          <Workbook.Column label="Error Code" value="errorcode"  />
          <Workbook.Column label="Count of Error" value="errorcount"  />
          <Workbook.Column label="Sub Activity" value="subactivity"  />
          <Workbook.Column label="Activity" value="activity"  />
          <Workbook.Column label="Error Description" value="error_description"  />
          </Workbook.Sheet> 
        </Workbook>
     

      );
  }
  onrefresh() {
    this.setState({
        date:moment(new Date()).format('MM/DD/YYYY'),
        start_time:new Date(),
        updated_start_time:new Date(),
        week: getCurrentWeek(new Date()),
        region:'',
        team:'',
        error_userid:'',
        shipmentnumber:'',
        mtdnumber:'',
        errorcode:'',
        errorcount:'',
        activity:'',
        subactivity:'',
        error_description:'',
        is_submit:false,
    })
   
  }
  onChangeFileUpload(files)
	{
    this.setState({
      loading : true
    })
    CSIerrorService.fileUpload(files[0])
      .then((res) => { 
        this.setState({
          loading : false
        })
        if(res.status)
        {
         if(res.data)
         {
          if(res.data.status)   
          {   
         
            createNotification('Uploaded','success','filled')
    
          } 
          else
          {
          
            createNotification(res.data.message,'error','filled');
          } 
         }  
        }
         
    
    })
    .catch((error) => { 
      this.setState({
        loading : false
      })
      });
  }
  handlechangeregion = (selectedOptions) => {
    this.setState({region : selectedOptions.value,team:''})

  } 
  getAreaValue(array,region,key)
  {
    var list = []
    if(array && array !== null && region !== '' && region !== null )
    {
      list = array.filter(item => item[key] === region)
    } 
    return list
  }
    render()
    { 
        const{week,date,region,team,error_userid,shipmentnumber,mtdnumber,errorcode,errorcount,activity,subactivity,error_description,
            teamdata,regiondata,errorcodedata,subactivitydata,activitydata,is_submit,loading}=this.state
        const {match,username,locale,languageData} = this.props
        return (
            <>
            <title>{onChangeLanguage(locale,'CSI Error Capturing',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <div className = "row">
                <div className = "col-md-10">
                <Breadcrumb heading={onChangeLanguage(locale,'CSI Error Capturing',languageData)} match={match} />
                </div>
                <div className = "col-md-2">
                    <Button className = "button-width" color="primary" style= {{width :'62%'}}>
                    <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
                    <a style= {{margin :'0px'}} > Upload</a>
                    <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                        className = "filepicker_customButton"
                        style = {{width : '80%',marginLeft :'-56%'}}
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
                    </Button>
                </div>
                </div>
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
                <div className = "row">
                <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Week',languageData)}
                            <br></br>{week}</Label>
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Date',languageData)}
                             <br></br> {date }</Label>
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'User ID',languageData)}
                            <br></br>{username}</Label>
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Region',languageData)} <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && region === ''?  "error-border-select-paste":"react-select fontstyle" }  
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={regiondata.filter(option =>option.value === region)}
                            options={regiondata}
                            onChange={this.handlechangeregion}
                        />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Team',languageData)} <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && team === ''?  "error-border-select-paste":"react-select fontstyle" }  
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={teamdata.filter(option =>option.value === team)}
                            options={this.getAreaValue(teamdata,region,'region_id') }
                            onChange={({value}) => this.setState({  team: value })}
                        />
                        </div>
                        
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Error - User ID',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input 
                             className = {is_submit === true && error_userid === ''?  "error-border":"fontstyle text-background" }    
                            // placeholder = 'End date'
                            value = {error_userid}  
                            onChange= {(e)=>this.setState({error_userid : e.target.value.toUpperCase()})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Shipment Number',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input 
                             className = {is_submit === true && shipmentnumber === ''?  "error-border":"fontstyle text-background" }    
                            // placeholder = 'End date'
                            value = {shipmentnumber}  
                            onChange= {(e)=>this.setState({shipmentnumber : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'MTD Number',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input 
                             className = {is_submit === true && mtdnumber === ''?  "error-border":"fontstyle text-background" }    
                            // placeholder = 'End date'
                            value = {mtdnumber}  
                            onChange= {(e)=>this.setState({mtdnumber : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin ">
                            <Label  className = "fontstyle normal-font" > 
                            {onChangeLanguage(locale,'Error Code',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                                <Select  
                                className = {is_submit === true && errorcode === ''?  "error-border-select-paste":"react-select fontstyle" }  
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={errorcodedata.filter(option =>option.value === errorcode)}
                                options={errorcodedata}
                                onChange={({value}) => this.setState({  errorcode: value ,subactivity:''})}
                             />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Count of Error',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input 
                             className = {is_submit === true && errorcount === ''?  "error-border":"fontstyle text-background" }    
                            // placeholder = 'End date'
                            value = {errorcount}  
                            onChange= {(e)=>this.setState({errorcount : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin ">
                            <Label  className = "fontstyle normal-font" > 
                            {onChangeLanguage(locale,'Sub Activity',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                                <Select  
                                className = {is_submit === true && subactivity === ''?  "error-border-select-paste":"react-select fontstyle" }  
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={subactivitydata.filter(option =>option.value === subactivity)}
                                options={subactivitydata}
                                options={this.getAreaValue(subactivitydata,errorcode,'error_code') }
                                onChange={({value}) => this.setState({  subactivity: value })}
                             />
                        </div>
                        <div className = "col-md-4 space-margin ">
                            <Label  className = "fontstyle normal-font" > 
                            {onChangeLanguage(locale,'Activity',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                                <Select  
                                className = {is_submit === true && activity === ''?  "error-border-select-paste":"react-select fontstyle" }  
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={activitydata.filter(option =>option.value === activity)}
                                options={activitydata}
                                onChange={({value}) => this.setState({  activity: value })}
                             />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Error Description',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input 
                             className = {is_submit === true && error_description === ''?  "error-border":"fontstyle text-background" }    
                            // placeholder = 'End date'
                            value = {error_description}  
                            onChange= {(e)=>this.setState({error_description : e.target.value})} 
                            />
                        </div>
                    </div>
                    <div className = "row text-center" >
                        {this.renderTemplate()}
                              <Button                            
                            className = "button-width" color="primary"  
                                        onClick={()=>this.onSubmit()}                                >
                                {onChangeLanguage(locale,'Save',languageData)} 
                            </Button>
                              <Button className = "button-width" color="secondary"                                 
                            onClick={()=>this.onrefresh()}
                            >
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

