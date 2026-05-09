import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { Checkbox } from 'antd';
import Select from 'react-select';
import CustomRadioButton from '../../../RadioButton'
import {permittedusers,onChangeLanguage,convertLocalToUTCDate} from '../../../../helper'
import { createNotification } from '../../../../toast';
import{vesselinfoService} from '../../../../redux/imports/vesselinfo/saga'
import Loading from "react-fullscreen-loading";
import{checklistService} from '../../../../redux/imports/checklist/saga';
import{checklistactivityService} from '../../../../redux/imports/checklistday/saga';
import{areaimportService} from '../../../../redux/imports/areaimport/saga';
import{roleService} from '../../../../redux/role/saga'
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        dp_voyage:'',
        pod:'',
        checklist:'',
        eta:'',
        ssy:'',
        team:'',
        process:'',
        checklist_data:[],
        team_data:[],
        activity:[],
        activity_data :[],
        is_submit :false,
        is_submit1 : false,
        isadmin:true,
        start_time:new Date(),
        updated_start_time:new Date(),
      };
    }
    componentDidMount() {
 
      this.fetchteam()
      // this.fetchroleData()
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
                let is_admin =permittedusers(res.data,role_id)
               this.setState({
                  isadmin:is_admin
               })
              }            
        
        })
        .catch((error) => { 
          this.setState({
            loading : false
          })
          });   
     }
    fetchchecklist(id) {
      this.setState({loading:true})
      checklistService.fetchchecklisttaemWise(id)
      .then((res) => {
        this.setState({loading:false})
         if(res.status)   { 
             let filterstatus = (res.data).filter(item => item.status === 1)
               var checklist = filterstatus.map(function(response) {
                    return  {label : response.type ,value : response.id.toString()};
                 });  
                  this.setState({
                  checklist_data :  checklist,
                  loading:false
                  })
               }
               })
               .catch((error) => { }); 
               this.setState({loading:false})
   }
   fetchteam() {
    this.setState({
        loading : true
      })
      areaimportService.fetchareaimport()
    .then((res) => {
        this.setState({loading:false})
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var teamlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.area_name ,value : (cusmaidid.id).toString()};
               });  
                this.setState({
                  team_data :  teamlist,
                })
             }
            
             })
             .catch((error) => { 
                this.setState({
                    loading : false
                  })
             }); 
    }   
    fetchchecklistActivity(checklist_id) {
      this.setState({loading:true})
      checklistactivityService.fetchchecklistid_activity(checklist_id)
      .then((res) => {
        this.setState({loading:false})
              if(res.status)   { 
                  this.setState({activity_data:res.data})
               }

               })
               .catch((error) => { }); 
               this.setState({loading:false})
        }

   clearvalue()
    {
      this.setState({
        dp_voyage:'',
        pod:'',
        checklist:'',
        eta:'',
        ssy:'',
        team:'',
        process:'',
        activity:[],
        activity_data :[],
        is_submit :false,
        is_submit1:false
      })
    }
    handleteam = (selectedOptions) => {
        this.setState({team : selectedOptions.value,activity:[],activity_data:[],checklist:'',checklist_data:[]})  
        this.fetchchecklist(selectedOptions.value)
    } 
    handlechecklist = (selectedOptions) => {
        this.setState({checklist : selectedOptions.value,activity:[],activity_data:[]}) 
        this.fetchchecklistActivity(selectedOptions.value) 
    } 
    onChangeRadio(value)
    {
        this.setState({process:value,checklist:'',activity:[],activity_data:[],checklist_data:[],checklist:'',team:''})
    }

  onSubmit() { 
    const {dp_voyage,pod,checklist,eta,ssy,team,process,activity,start_time,updated_start_time} = this.state;
    
    var is_fill =false
    
    if(process === "DAY")
    {
      if(dp_voyage !== "" && pod !== "" && eta !== "" && ssy !== "" && process !== "" && team !== "" && activity.length > 0)
      {
        is_fill = true
      }
    }
    else  if(process === "SSY")
    {
      if(dp_voyage !== "" && pod !== "" && eta !== "" && ssy !== "" && process !== ""  && team !== "")
      {
        is_fill = true
      }
    }
    if(is_fill === true)
    {
    
      var date = moment(eta).format('MM/DD/YYYY'),end_time = new Date(),updated_end_time = new Date()
     
        this.setState({
          loading : true,
        })
        const {username} = this.props
        vesselinfoService.createvesselinfo(dp_voyage,pod,username,checklist,date,ssy,team,process,activity,
          
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
                this.clearvalue()
              }
              else
              {
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
        this.setState({is_submit:true})
        createNotification('Please fill mandatory field','error','filled')
    }
  }
  onChangeInfo() { 
    const {dp_voyage,pod,eta,ssy,updated_start_time} = this.state;
    this.setState({is_submit:false})
    if(dp_voyage !== "" && eta !== '' && ssy !== "" && pod !== '')
    {
    
      var date = moment(eta).format('MM/DD/YYYY'),updated_end_time= new Date()
        this.setState({
          loading : true,
        })
        vesselinfoService.updatevesselinfo(dp_voyage,pod,date,ssy,updated_start_time,updated_end_time)
          .then((res) => { 
            this.setState({   
              loading : false     
            }) 
            if(res.status)
              {
                createNotification('Updated','success','filled')
            
              }
              else
              {
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
      
      this.setState({is_submit1:true})
      createNotification('Please fill mandatory field','error','filled')
    }
    
  }
  onChangeAllActivity()
  {
    const {activity,activity_data} = this.state
    var value = []
    if(activity.length > 0)
    {
      value =  []
    }
    else
    {
      for(var i = 0; i <activity_data.length;i++)
      {
        value.push((activity_data[i].id).toString())
      }
      
    }
    this.setState({
      activity : value
    })

  }
  onChangeActivity(id)
  {
    const {activity} = this.state
    var value = [...activity]
    if(activity.includes(id))
    {
      value = value.filter(e=> e !== id)
    }
    else
    {
      value.push(id)
    }
    this.setState({
      activity : value
    })

  }
  onChangedp_voyage(value)
  {
    if(value.length <= 6)
    {
      this.setState({dp_voyage : value})
    }
    
  }
  onChangepod(value)
  {
    if(value.length <= 5)
    {
      this.setState({pod : value})
    }
    
  }
    render()
    {
        const {locale,languageData,match,username} = this.props
      
        const {dp_voyage,checklist_data,team_data,pod,activity,
            eta,ssy,checklist,team,process,loading,activity_data,is_submit,is_submit1,isadmin} = this.state
        return (
            <>
            <title>{onChangeLanguage(locale,'Vessel Information',languageData)}</title>
            {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'Vessel Information',languageData)} match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row" style = {{marginBottom:'10px'}}>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'DP Voyage',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input   className = {(is_submit === true || is_submit1  === true )&& dp_voyage === ''?  "error-border":"fontstyle text-background" }  
                            placeholder = ''
                            value = {dp_voyage}  
                            onChange= {(e)=>this.onChangedp_voyage(e.target.value)} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'POD',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input className = {(is_submit === true || is_submit1  === true ) && pod === ''?  "error-border":"fontstyle text-background" } 
                                value = {pod}  
                                onChange= {(e)=>this.onChangepod(e.target.value)} ></Input>
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'ETA',languageData)}<a style = {{color :'red'}}>*</a>
                            {((is_submit === true || is_submit1  === true ) &&  eta === '')  && <a className ="fontstyle mandatory-label">{onChangeLanguage(locale,'Mandatory Field',languageData)}</a>}  
                            </Label>
                             <DatePicker
                              placeholderText="MM/DD/YYYY"
                              className = "fontstyle text-background"
                              selected={eta}
                              dateFormat="MM/dd/yyyy"
                              onChange= {(date)=>this.setState({eta : date})} 
                              popperPlacement="top-start" />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'SSY',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {(is_submit === true || is_submit1  === true ) && ssy === ''?  "error-border":"fontstyle text-background" }  
                            placeholder = ''
                            value = {ssy}  
                            onChange= {(e)=>this.setState({ssy : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Process',languageData)}<a style = {{color :'red'}}>*</a>
                            {is_submit === true && process === '' && <a className = 'fontstyle mandatory-label'> {onChangeLanguage(locale,'Mandatory Field',languageData)}</a>}</Label>
                            
                            <div style = {{margin:'10px 0px'}}>
                                <Row>
                                    <Colxx xxs="4">
                                        <CustomRadioButton checked  = "DAY" name = {onChangeLanguage(locale,'DAY',languageData)} value = {process} 
                                            onChangeRadio={this.onChangeRadio.bind(this)}/>
                                       
                                    </Colxx>
                                    <Colxx xxs="4">
                                     <CustomRadioButton checked  = "SSY" name = {onChangeLanguage(locale,'SSY',languageData)} value = {process} 
                                            onChangeRadio={this.onChangeRadio.bind(this)}/>
                                        
                                    </Colxx>
                                </Row>
                            </div>
                            </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'User Name',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <br></br>{username}
                            {/* <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {username}  
                            disabled = {true}
                            /> */}
                        </div>
                        
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Team',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && team === ''?  "error-border-select":"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={team_data.filter(option =>option.value === team)}
                            options={team_data}
                            onChange={this.handleteam}
                        />
                        </div>
                        {process === "DAY" &&
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Checklist',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && checklist === ''?  "error-border-select":"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={checklist_data.filter(option =>option.value === checklist)}
                            options={checklist_data}
                            onChange={this.handlechecklist}
                        />
                        </div> 
                        }
                    </div>
                    {  process === "DAY" && checklist !== "" && 
                    <div  style = {{borderRadius:'10px',marginBottom:'30px'}}>
                        <div className = "row" style = {{marginBottom:'10px'}}>
                            <div className = "col-md-8 space-margin">
                             
                              <div className = "row">
                              <div className = "col-md-12 space-margin" style = {{marginLeft:'10px'}}>
                                     <Row>
                                      <Colxx xxs="1">
                                         <Checkbox color="blue" checked = {activity.length > 0} onChange= {()=>this.onChangeAllActivity()} />
                                      </Colxx>
                                      <Colxx xxs="2">
                                      <Label  className = "fontstyle small-font"  style = {{marginLeft:'7px'}}><b>{onChangeLanguage(locale,'ETA',languageData)}</b></Label>
                                      </Colxx>
                                      <Colxx xxs="9">
                                      <Label  className = "fontstyle small-font"  style = {{marginLeft:'7px'}}><b>{onChangeLanguage(locale,'Activity',languageData)}</b></Label>
                                      </Colxx>

                                    </Row>
                                 </div>
                              {activity_data && activity_data.map((value,index) =>
                                  <div className = "col-md-12 space-margin" style = {{marginLeft:'10px'}}>
                                     <Row>
                                      <Colxx xxs="1">
                                           <Checkbox color="blue" checked = {activity.includes((value.id).toString())} onChange= {()=>this.onChangeActivity((value.id).toString())} />
                                      </Colxx>
                                      <Colxx xxs="2">
                                      <Label  className = "fontstyle small-font"  style = {{marginLeft:'7px'}}>{value.eta}</Label>
                                      </Colxx>
                                      <Colxx xxs="9">
                                      <Label  className = "fontstyle small-font"  style = {{marginLeft:'7px'}}>{value.activity}</Label>
                                      </Colxx>

                                    </Row>
                                 </div>
                              )}
                            </div>
                            
                           </div>
                         </div>
                      </div>
                    }
                     
                    <div className = "row text-center">
                       {isadmin &&                          
                          <Button className = "button-width" color="secondary"  
                                onClick={()=>this.onChangeInfo()}
                                >Change Info</Button> 
                       }   
                          <Button className = "button-width" color="primary"  
                                onClick={()=>this.onSubmit()}
                                >Save Record</Button> 
                             <Button className = "button-width" color="secondary" 
                                    onClick={()=>this.clearvalue()}
                           >Refresh</Button>                        
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
  export default injectIntl(
    connect(mapStateToProps, {
  
    })(QueryResolveSheet)
  );

