
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import{areaimportService} from '../../../../redux/imports/areaimport/saga'
import{activityService} from '../../../../redux/imports/activity/saga';
import {onChangeLanguage,getCurrentWeek,getTimeDifference,getValue,convertLocalToUTCDate,convertUTCToLocalDate} from '../../../../helper'
import {GetReceviedTime} from '../../../../helper'
import moment from 'moment';
import { createNotification } from '../../../../toast';
import { vesselpostingService } from '../../../../redux/imports/vesselposting/saga';
import Workbook from 'react-excel-workbook'

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        username:'',
        date:'',
        week:'',
        region:'',
        activity:'',
        volume:'',
        charges:'',
        unit: '',
        tat_time: '',
        user_id: '',
        is_submit:false,
        regoin_Data:[],
        activity_Data:[],
        data:[],
        receivetime_format:false,
        start_time:new Date(),
        updated_start_time:new Date(),
        end_time:'',
        vesselpostingcount:'',
        vesselpostingcountlast:'',
      };
    }

    componentWillMount()
    {
      this.setState({
        date:moment(new Date()).format('MM/DD/YYYY'),
        week:getCurrentWeek(new Date()).toString(),
      })
        this.fetchregion()
       this.fetchVesselpostingCount()
    }

    fetchVesselpostingCount(){
      this.setState({loading:true})
      const {username} = this.props
      console.log(username)
      vesselpostingService.fetchvesselpostingcount(username)
      .then((res) => {
         if(res.status)   { 
                let filterstatus = res.data;
                let lastdata = res.lastcount;
                this.setState({ 
                  vesselpostingcount:filterstatus, 
                  vesselpostingcountlast:lastdata     
                }) 
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})

}
    fetchactivity(id) {
      this.setState({
          loading : true
        })
        activityService.fetchactivity()
      .then((res) => {
          this.setState({loading:false})
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1 && item.team === id)
               var activitylist = filterstatus.map(function(activityname) {
                    return  {label : activityname.name ,value : (activityname.id).toString(),unit:activityname.unit};
                 });  
                  this.setState({
                      activity_Data :  activitylist,
                  })
               }
              
               })
               .catch((error) => { 
                  this.setState({
                      loading : false
                    })
               }); 
   } 
   
   
    onSubmit() { 
        const {date,start_time,week,region, activity,volume,   
            unit,updated_start_time } = this.state;
            
        if(  region !=="" && activity !=="" && volume !=="" && start_time !=="" && unit!=="") 
         {
          var end_time = new Date(),updated_end_time = new Date(),
          tat = getTimeDifference(start_time,new Date())
      
          this.setState({
            end_time:end_time,
            tat_time:tat,
            is_submit:false 
          })
      
            const {username} = this.props
            this.setState({
              loading : true
            })
            vesselpostingService.createvesselposting(username,date,week,region, activity,volume,   
              unit, tat,
              convertLocalToUTCDate(start_time),
              convertLocalToUTCDate( end_time),
              convertLocalToUTCDate( updated_start_time),
              convertLocalToUTCDate(updated_end_time))
              .then((res) => { 
                 
                if(res.status)
                  {
                    createNotification('Created','success','filled')
                    this.Refress()
                    this.fetchVesselpostingCount()
                  }else{
                    this.setState({   
                      loading : false     
                    })
                    createNotification(res.message,'error','filled')
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
          createNotification('Please Fill Mandatory Field','error','filled')
        }
       
      }



      Refress()
      {
          this.setState({
            start_time:new Date(),
            updated_start_time:new Date(),
            date:moment(new Date()).format('MM/DD/YYYY'),
            week:getCurrentWeek(new Date()).toString(),
             end_time:'',
             region:'',
             activity:'',
             volume:'',
             received_time:'',
             charges:'',
             unit: '',
             tat_time: '',
             user_id: '',
             is_submit:false,
             receivetime_format:false
          })
      } 
  
    
     
     fetchregion() {
        this.setState({
            loading : true
          })
          areaimportService.fetchareaimport()
        .then((res) => {
            this.setState({loading:false})
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var regionlist = filterstatus.map(function(regionname) {
                      return  {label : regionname.area_name ,value : (regionname.id).toString()};
                   });  
                    this.setState({
                        regoin_Data :  regionlist,
                    })
                 }
                
                 })
                 .catch((error) => { 
                    this.setState({
                        loading : false
                      })
                 }); 
     } 

     
    renderTemplate()
    {
      const {languageData,locale} = this.props
      const {data,regoin_Data,activity_Data} = this.state
      var array = data.map(record=> {
            return {
              'User Name' : record.username,
              'Start Date Time' : record.start_time,
              'End Date Time' : record.end_time,
              'Week' : record.week,
              'Date' : record.date,
              'Region':getValue(regoin_Data,'value','label',record.region) ,
              'Activity' : getValue(activity_Data,'value','label',record.activity),
              'Volume': record.volume,
              'Unit': record.unit,
              'tat_time': record.tat,
          };
        })
        return(
          
          <Workbook filename="Vesselposting.xlsx" element={
            <Button className = "button-width" color="secondary"  style={{width:'150px'}}
            >{ onChangeLanguage(locale,'Raw Data',languageData)}  
            </Button>
                }>
            <Workbook.Sheet data={array} name="Sheet A">
            <Workbook.Column label="User Name" value="User Name"/>
            <Workbook.Column label="Start Date Time" value="Start Date Time"/>
              <Workbook.Column label="End Date Time" value="End Date Time"/>
              <Workbook.Column label="Week" value="Week"/>
              <Workbook.Column label="Date" value="Date"/>
              <Workbook.Column label="Region" value="Region"/>
              <Workbook.Column label="activity" value="Activity"/>
              <Workbook.Column label="Volume" value="Volume"/>
              <Workbook.Column label="Unit" value="Unit"/>
              <Workbook.Column label="TAT Time" value="tat_time"/>
            </Workbook.Sheet> 
          </Workbook>    
  
        );
    }
    onChangeRegion(value)
    {
      this.setState({  
        region: value,
        activity_Data:[],
        activity:'',
        unit:''
       })
       this.fetchactivity(value)
      
    }
  
    render()
    {
        const {start_time,end_time,date,week,region, activity,volume ,vesselpostingcount,vesselpostingcountlast
             ,unit, tat_time,regoin_Data,activity_Data,is_submit} = this.state
       const {match,languageData,locale,username} = this.props

        return (
            <>
            <title>{onChangeLanguage(locale,'Vessel Posting',languageData)}</title>
            <Row>
              <Colxx xxs="12">


              <div className = "row">
                      <div className = "col-md-8">
                      <Breadcrumb heading={onChangeLanguage(locale,'Vessel Posting',languageData)} match={match} />
                    </div>
                    <div className = "col-md-2" >
                        <h2 style = {{marginTop:'15px'}}>Total EQ : {vesselpostingcount}</h2>
                        </div>
                        <div className = "col-md-2">
                            <h2  style = {{marginTop:'15px'}}>Last EQ : {vesselpostingcountlast}</h2>
                        </div>
              
                  </div>

                
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
            <div className = "" style = {{borderRadius:'10px',marginBottom:'10px'}}>
                    <div className = "row" >
                    <div className = "col-md-2 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'User Name',languageData)}
                            <br></br>{username}</Label>
                                
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a >{onChangeLanguage(locale,'Start Date Time',languageData)}</a><br></br>
                            { moment(start_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                           
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a >{onChangeLanguage(locale,'End Date Time',languageData)}</a>
                            <br></br>{end_time !== '' && moment(end_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Week',languageData)}</a><br></br> 
                            {week}</Label>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Date',languageData)}</a><br></br> 
                            { date}</Label>
                        </div>
                    </div>
                </div>  
                <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                  <div className = "publish-title" >
                          <Row>
                              <Colxx xxs="12">
                                  <Label  className = "fontstyle" 
                                  style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'Vessel Posting',languageData)}</Label>
                                  
                              </Colxx>
                          </Row>
                          </div>
                          <div className = "row" style = {{padding:'10px'}}>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Region',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                        <Select  className={is_submit === true && region === ''?  "error-border-select":"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={regoin_Data.filter(option =>option.value === region)}
                                            options={regoin_Data}
                                            onChange={(option) =>this.onChangeRegion(option.value)}
                                        />
                                </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Activity',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Select className={is_submit === true && activity === ''?  "error-border-select":"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={activity_Data.filter(option =>option.value === activity)}
                                            options={activity_Data}
                                            onChange={(option) => this.setState({  activity: option.value,unit: option.unit})}
                                        />
                                </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Volume',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Input  className = {is_submit === true && volume === ''?  "error-border":"fontstyle text-background"}
                                         
                                        value = {volume}  
                                        onChange= {(e)=>this.setState({volume  : e.target.value})} ></Input>
                                </div>
                               
                                
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Unit',languageData)}
                                    <a style = {{color :'red'}}>*</a><br></br>{unit}</Label>
                                    {/* <Input  className = {is_submit === true && volume === ''?  "error-border":"fontstyle text-background"}
                                        value = {unit}  
                                        onChange= {(e)=>this.setState({unit  : e.target.value})} ></Input> */}
                                </div>
                                
                            

                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" ><a >{onChangeLanguage(locale,'TAT Time',languageData)}</a><br></br>{tat_time}</Label>
                        </div>                                                  
                            
                           </div>
                             <div className = "row text-center" >
                                      <Button className = "button-width" color="primary"  
                                      onClick={()=>this.onSubmit()}
                                      >{onChangeLanguage(locale,'Save',languageData)} </Button> 
                                      <Button className = "button-width" color="secondary"  
                                        onClick={()=>this.Refress()}
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

