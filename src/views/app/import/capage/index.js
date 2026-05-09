import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import {getCurrentWeek,getValue,onChangeLanguage,convertLocalToUTCDate} from '../../../../helper'
import CustomRadioButton from '../../../RadioButton'
import { createNotification } from '../../../../toast';
import{csiproductivityService} from '../../../../redux/imports/csiproductivity/saga'
import Loading from "react-fullscreen-loading";
import{areaimportService} from '../../../../redux/imports/areaimport/saga'
import{checklistactivityService} from '../../../../redux/imports/checklistday/saga';
import moment from 'moment';


class CSIProductivitySheet extends Component { 
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        week:'',
        date:'',
        region:'',
        ssy:'',
        dp_voyage:'',
        count:'',
        pod:'',
        no_of_mtd:'',
        pre_pond:'',
        region_data:[],
        is_search:false,
        unit:'0',
        total_unit:'0',
        vessel_date:'',
        eta:'0',
        kpi:'0',
        is_submit :false,
        activity:[],
        activity_data:[],
        activity_id: '',
        start_time:new Date(),
        updated_start_time:new Date(),
        csiproductivitycount:'',
        csiproductivitycountlast:'',
      };
    }
    componentDidMount() {
        this.setState({
            week:getCurrentWeek(new Date()).toString(),

        })
        this.fetchregion()
        this.fetchactivityData()
        this.fetchCsiproductivityCount()
      }

      fetchCsiproductivityCount(){
        this.setState({loading:true})
        const {username} = this.props
        console.log(username)
        csiproductivityService.fetchcsiproductivitycount(username)
        .then((res) => {
           if(res.status)   { 
                  let filterstatus = res.data;
                  let lastdata = res.lastcount;
                  this.setState({ 
                    csiproductivitycount:filterstatus, 
                    csiproductivitycountlast:lastdata     
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
        areaimportService.fetchareaimport()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var regionlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.area_name ,value : cusmaidid.id.toString()};
                   });  
                    this.setState({
                    region_data :  regionlist,
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  
     fetchactivityData() {  
        this.setState({
          loading : true
        })
        checklistactivityService.fetchchecklistactivity()
          .then((res) => { 
            this.setState({   
          loading : false 
                  
            }) 
            if(res.status)
              {
                this.setState({ 
                    activity_data:res.data  ,        
                }) 
              }               
        
        })
        .catch((error) => { 
          this.setState({
            loading : false
          })
          });   
     }
   

     fetchSearchData() {
         
        const {pod ,dp_voyage,region,ssy,pre_pond} = this.state
        
        if(pod !== "" && dp_voyage !== "" && region !== "" && ssy !== "")
        {
          this.clearvalue(false)
            this.setState({
                loading : true,
                is_search:false,
                is_submit:false,
              })
              csiproductivityService.fetchcsiproductivitySerach(pod ,dp_voyage,region,ssy,pre_pond)
                .then((res) => { 
                  this.setState({   
                    loading : false ,
                    
                        
                  }) 
                  if(res.status)
                    {
                        this.setValue(res.data)
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
          this.setState({
            is_search:true,
            is_submit:false,
          })
          createNotification('Please fill mandatory field','error','filled')
        }
       
     }
     setValue(record)
     {
         if(record && record !== null)
         {
                 console.log("djcjd " , JSON.stringify(record))
                 this.setState({
                  dp_voyage:record.dp_voyage,
                  pod:record.pod,
                  ssy:record.ssy,
                  region:record.team,
                  vessel_date:record.eta,
                  eta:record.eta_count,
                  activity:this.setactivitydate(record.activity,record.csi_activities),
                 })
                 if(record.csi_activities !== null && record.csi_activities)
                 {
                   if(record.csi_activities.length > 0)
                   {
                     var total_unit = '',no_of_mtd = record.csi_activities[record.csi_activities.length -1].no_of_mtd,
                     unit = record.csi_activities[record.csi_activities.length -1].unit,
                     count = record.csi_activities[record.csi_activities.length -1].count
                     if(no_of_mtd && no_of_mtd !== null && unit && unit !== null)
                     {
                      total_unit  = (parseFloat(no_of_mtd) * parseFloat(unit)).toFixed(6)
                      this.setState({
                        no_of_mtd:no_of_mtd,
                      })
                     }

                     if(count && count !== null)
                     {
                      this.setState({
                        count:count,
                      })
                     }
                      this.setState({
                        total_unit:total_unit,
                        unit:unit,
                        kpi:record.csi_activities[record.csi_activities.length -1].kpi,
                      })
                   }
                 }
         }

     }
      setactivitydate(activity,csi_activities)
     {
      const  {activity_data,pre_pond} = this.state
        var value = []
        if(activity !== null && activity_data)
        {
          var current_date =  moment(new Date()).format('MM/DD/YYYY')
            for(var i=0;i<activity.length;i++)
            {
             
              var list = activity_data.filter(option => parseInt(option.id) === parseInt(activity[i]))
              if(list.length > 0)
              {
                var dict = list[0]
                var status = 0,date = current_date,prepond = '',user_id=''
                var id = (dict.id).toString()
                if(csi_activities !== null)
                {
                  
                  status = this.checkStatusactivity(csi_activities,id,'status')
                  if(status === 1)
                  {
                    date = this.checkStatusactivitydate(csi_activities,id,current_date)
                  }
                  prepond = this.checkStatusactivity(csi_activities,id,'prepond')
                  user_id = this.checkStatusactivity(csi_activities,id,'user_id')
                }
                  value.push({
                    name:id,
                    unit:dict.eq ? dict.eq : "0",
                    kpi:dict.kpi ? dict.kpi : "",
                    status:status,
                    date: date,
                    prepond:prepond,
                    user_id:user_id
                  })
              }
            }
            
        }
        if(pre_pond === 'Pending' && csi_activities !== null)
        { 
          for(var i=0;i<csi_activities.length;i++)
          {
            var activitys_c = value.filter(option => parseInt(option.name) === parseInt(csi_activities[i].name))
            if(activitys_c.length === 0)
            {
              var list = activity_data.filter(option => parseInt(option.id) === parseInt(csi_activities[i].name))
              if(list.length > 0)
              {
                var dict = list[0]
                var id = (dict.id).toString()
                if(csi_activities[i].prepond === 'Pending' && csi_activities[i].status !== 1)
                {
                  value.push({
                    name:id,
                    unit:dict.eq ? dict.eq : "0",
                    kpi:dict.kpi ? dict.kpi : "",
                    status:0,
                    date: current_date,
                    prepond:csi_activities[i].prepond,
                    user_id:csi_activities[i].user_id
                  })
                }
                  
              }
            }
            
          }

        }
        
       
       return value
      
     }
     checkStatusactivity(activity_data,id,key)
     {
        var status = (key === 'status' ?  0  :'');
        if(activity_data !== null)
        {
          const value =   activity_data.filter(option =>option.name === id)
          if(value.length > 0)
          {
            status = value[0][key]
          }
        }
       
        return status
     }
     checkStatusactivitydate(activity_data,id,current_date)
     {
        var date = "";
        if(activity_data !== null)
        {
          const value =   activity_data.filter(option =>option.name === id)
          if(value.length > 0)
          {
            date = value[0].date !== null ? value[0].date : ""
          }
        }
       
        return date !== "" ? date : current_date
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
      clearvalue(is_clear)
    {
      this.setState({
        start_time:new Date(),
        updated_start_time:new Date(),
        week:getCurrentWeek(new Date()).toString(),
        date:'',
        region:'',
        ssy:'',
        dp_voyage:'',
        count:'',
        pod:'',
        no_of_mtd:'',
        unit:'0',
        total_unit:'0',
        vessel_date:'',
        eta:'0',
        kpi:'0',
        activity:[],
        activity_id:'',
        is_submit :false,
        is_search:false,
      })
      if(is_clear === true)
      {
        this.setState({
          pre_pond:'',
        })
      }
    }
    onSubmit() { 
        const {start_time,week,region,ssy,dp_voyage,count,pod,no_of_mtd,pre_pond,unit,total_unit,vessel_date,eta,kpi,
          activity,activity_id,updated_start_time} = this.state;
        if (region !=="" && ssy !=="" && dp_voyage !=="" && count !=="" && pod !=="" && no_of_mtd !=="")
        {
           
            var date = moment(start_time).format('MM/DD/YYYY'),end_time = new Date(),updated_end_time = new Date()
             var activitylist = []
               const {username} = this.props
            for(var i=0;i<activity.length;i++)
            {
              if(activity_id === activity[i].name)
              {
                  activitylist.push({
                    name:activity[i].name,
                    status:activity[i].name === activity_id ? 1 :activity[i].status,
                    unit:activity[i].unit,
                    count:activity[i].name === activity_id ? count : "0",
                    no_of_mtd:activity[i].name === activity_id ? no_of_mtd : "0",
                    kpi:activity[i].name === activity_id ? activity[i].kpi : "0",
                    date:activity[i].name === activity_id ? moment(new Date()).format('MM/DD/YYYY'): activity[i].date ,
                    prepond:'',
                    user_id:username,
                })
              }
              else if(activity[i].prepond === 'Pending' && activity[i].status !== 1)
              {
                activitylist.push({
                    name:activity[i].name,
                    status:0,
                    unit:activity[i].unit,
                    count:count,
                    no_of_mtd:no_of_mtd,
                    kpi:activity[i].kpi,
                    date:moment(new Date()).format('MM/DD/YYYY'),
                    prepond:'Pending',
                    user_id:activity[i].user_id,
                })
              }
              
            }
            var day_of_activity = (activity.length).toString()
            this.setState({
                loading : true,
                eta_format:false
              })

             
              csiproductivityService.createcsiproductivity(username,activitylist,date,week,region,ssy,dp_voyage,count,pod,
                day_of_activity, no_of_mtd,pre_pond,unit,(total_unit).toString(),vessel_date,eta,kpi,
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
                      this.fetchSearchData()
                      this.fetchCsiproductivityCount()
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
            this.setState({is_submit:true,is_search:false})
            createNotification('Please fill mandatory field','error','filled')
        }
      }
      onChangeDpVoyage(dp_voyage)
      {
        if(dp_voyage.length <= 6)
        {
          this.setState({
              dp_voyage:dp_voyage,
              activity : [],
              eta:'0',
          })
        }
       
      }
      onChangePOD(pod)
      {
        if(pod.length <= 5)
        {
            this.setState({
              pod:pod,
              activity : [],
              eta:'0',
          })
        }
          
      }

    
      onChangeChangeActivity(value,index)
      {
        console.log("value",value)
        console.log("index",index)
        const {no_of_mtd,activity} = this.state
        this.setState({
          activity_id:value.name,
          unit:value.unit,
          kpi:value.kpi
        })
        if(no_of_mtd !== '' && value.unit !== '')
        {
            this.setState({
              total_unit : (parseFloat(no_of_mtd) * parseFloat(value.unit)).toFixed(6)
            }) 
        }
        else
        {
          this.setState({
            total_unit : '0'
          })
        }
        if(index >= 0)
        {
          var list = [...activity]
          list[index].prepond = ''
        }
        this.setState({
          activity:list,
        })

      }
      onChangeChangeMTD(value)
      {
        
        const {unit} = this.state
        this.setState({no_of_mtd  : value})
        if(value !== '' && unit !== '')
        {
            this.setState({
              total_unit : (parseFloat(value) * parseFloat(unit)).toFixed(6)
            }) 
        }
        else
        {
          this.setState({
            total_unit : '0'
          })
        }

      }
      onChangeChangePending(index)
      {
        const {activity} = this.state
        if(index >= 0)
        {
          var list = [...activity]
          list[index].prepond = 'Pending'
        }
        this.setState({
          activity:list,
          activity_id:'',
          unit:'',
          kpi:'',
          total_unit : '0'
        })

      }
  
    render()
    {
        const {locale,languageData,match,username} = this.props
        const {loading,region_data,start_time,week,region,ssy,dp_voyage,count,pod,no_of_mtd,csiproductivitycount,csiproductivitycountlast,
            pre_pond,unit,total_unit,date,vessel_date,eta,kpi,activity,is_search,is_submit,activity_data,activity_id} = this.state

         console.log("blkbbkvl " , JSON.stringify(activity))
        return (
            <>
             <title>{onChangeLanguage(locale,'CSI Productivity (Basis Activity)',languageData)}</title>
            <Row>
              <Colxx xxs="12">


              <div className = "row">
                      <div className = "col-md-8">
                      <Breadcrumb heading={onChangeLanguage(locale,'CSI Productivity (Basis Activity)',languageData)} match={match} />
                    </div>
                    <div className = "col-md-2" >
                        <h2 style = {{marginTop:'15px'}}>Total EQ : {csiproductivitycount}</h2>
                        </div>
                        <div className = "col-md-2">
                            <h2  style = {{marginTop:'15px'}}>Last EQ : {csiproductivitycountlast}</h2>
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
            <div className = "" style = {{padding:'0px 10px', borderRadius:'10px',marginBottom:'10px'}}>
                    <div className = "row" >
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'UserName',languageData)}</a><br></br>  
                            {username}</Label>
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Start Time',languageData)}</a><br></br>
                            {moment(start_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Day of Activity',languageData)}</a><br></br>  
                            {activity && activity.length}</Label>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Week',languageData)}</a><br></br>
                            {week}  </Label>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Date',languageData)}</a><br></br>
                            { moment(start_time).format('MM/DD/YYYY')}</Label>
                        </div>
                    </div>
                </div>  
                <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                  <div className = "publish-title" >
                          <Row>
                              <Colxx xxs="12">
                                  <Label  className = "fontstyle" 
                                  style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'User Form',languageData)}</Label>
                                  
                              </Colxx>
                          </Row>
                          </div>
                          <div className = "row" style = {{padding:'10px'}}>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Region',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                        <Select  
                                            style={{height:'85px'}}
                                            className={((is_submit === true || is_search === true) && region === '') ?  "error-border-select":"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={region_data.filter(option =>option.value === region)}
                                            options={region_data}
                                            onChange={({value}) => this.setState({  region: value })}
                                        />
                                </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'SSY',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                    <Input  className = {((is_submit === true || is_search === true) && ssy === '')?  "error-border":"fontstyle text-background" }  
                                    placeholder = ''
                                    value = {ssy}  
                                    onChange= {(e)=>this.setState({ssy : e.target.value})} 
                                    />
                                </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'DP Voyage',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                    <Input  className = {((is_submit === true || is_search === true) && dp_voyage === '')?  "error-border":"fontstyle text-background" }
                                      placeholder = ''
                                    value = {dp_voyage}  
                                    onChange= {(e)=>this.onChangeDpVoyage(e.target.value)} ></Input>
                                    
                                </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Count',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                    <Input  className = {is_submit === true && count === ''?  "error-border":"fontstyle text-background" } 
                                    type = "number" min="0"  step='1'
                                    placeholder = ''
                                    onKeyDown={this.handleKeypress}
                                    value = {count}  
                                    
                                    onChange= {(e)=>this.setState({count  : e.target.value})}
                                    />
                                </div>
                             
                            
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'POD',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                    <Input  className = {((is_submit === true || is_search === true) && pod === '')?  "error-border":"fontstyle text-background" }
                                         placeholder = ''
                                        value = {pod}  
                                        onChange= {(e)=>this.onChangePOD(e.target.value)}  ></Input>
                                    
                                </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'No. of MTD',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                    <Input  className = {is_submit === true && no_of_mtd === ''?  "error-border":"fontstyle text-background" }
                                       type = "number" min="0"  step='1'
                                         placeholder = ''
                                         onKeyDown={this.handleKeypress}
                                        value = {no_of_mtd}  
                                        onChangeChangeMTD
                                        onChange= {(e)=>this.onChangeChangeMTD(e.target.value)} ></Input>
                                </div>
                                <div className = "col-md-4 space-margin">
                                    <div style = {{margin:'10px 0px'}}>
                                           
                                        <Row>
                                            <Colxx xxs="4">
                                                <CustomRadioButton checked  = "Pre-pond" name = "Pre-pond" value = {pre_pond} 
                                                    onChangeRadio={(value)=>this.setState({pre_pond:value})}/>
                                            
                                            </Colxx>
                                            <Colxx xxs="4">
                                            <CustomRadioButton checked  = "Pending" name = "Pending" value = {pre_pond} 
                                                onChangeRadio={(value)=>this.setState({pre_pond:value})}/>
                                                
                                            </Colxx>
                                        </Row>
                                    </div>   
                                </div>
                            
                                

                             </div>
                             <div className = "row text-center" >                             
                                    <Button className = "button-width" color="secondary"  
                                            onClick={()=>this.fetchSearchData()}
                                            >{onChangeLanguage(locale,'Search',languageData)}</Button>                                    
                                    <Button className = "button-width" color="primary"  
                                            onClick={()=>this.onSubmit()}
                                            >{onChangeLanguage(locale,'Save',languageData)} </Button>                                   
                                        <Button className = "button-width" color="secondary" 
                                                onClick={()=>this.clearvalue(true)}
                                    >{onChangeLanguage(locale,'Refresh',languageData)}</Button>
                                    
                            </div>
                
                </div> 
                <div className = "publishuser-card-component" style = {{borderRadius:'10px'}}>
                    <div className = "publish-title" >
                          <Row>
                              <Colxx xxs="12">
                                  <Label  className = "fontstyle" 
                                  style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'Information',languageData)}</Label>
                                  
                              </Colxx>
                          </Row>
                    </div>
                    <div className = "row" style = {{padding:'10px',marginBottom:'30px'}}>
                        <div className = "col-lg-2-0 space-margin"  >
                                <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Unit',languageData)}</a><br></br>  {unit}</Label>
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                                <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Total Unit',languageData)}</a><br></br>  {total_unit}</Label>
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                                <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Vessel Arrival Date',languageData)}</a><br></br>  {vessel_date}</Label>
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                                <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'ETA',languageData)}</a><br></br>  {eta}</Label>
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                                <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'KPI',languageData)}</a><br></br>  {kpi}</Label>
                        </div>
                    </div>
                </div>
                {activity && activity.length > 0 && 
                 <div className = "publishuser-card-component" style = {{borderRadius:'10px',paddingBottom:'30px'}}>
                    <div className = "publish-title" >
                        <Row>
                            <Colxx xxs="12">
                                <Label  className = "fontstyle" 
                                style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'Day of Activity',languageData)}</Label>
                                
                            </Colxx>
                        </Row>
                  </div>
                    <table style={{width:'100%'}}>
                        <thead className = "publish-title1">
                            <tr>
                               
                              <td>  <Label  className = "fontstyle normal-font text-center">{onChangeLanguage(locale,'Date',languageData)}</Label></td>
                              <td><Label  className = "fontstyle normal-font text-center" >{onChangeLanguage(locale,'Activity',languageData)}</Label></td>
                              <td><Label  className = "fontstyle normal-font text-center" >{onChangeLanguage(locale,'Action',languageData)}</Label></td>
                              
                            </tr>
                        </thead>
                        <tbody>
                        {activity && activity.map((value,index) => 
                          <tr>
                            <td> 
                              <div className = "text-center" style = {{backgroundColor:'rgb(239 100 50/20%)',padding:'2px',height:'100%'}}>
                                  <Label  className = "fontstyle small-font">{(value.date !== null  && value.date && value.date !== '')? value.date  : date}</Label>
                              </div>
                            </td>
                            <td>
                            <div className = "text-center" style = {{backgroundColor:'#F5F6F8',padding:'2px',height:'100%'}}>
                                 <Label  className = "fontstyle small-font">{getValue(activity_data,"id","activity",parseInt(value.name))}</Label>
                             </div>
                            </td>
                            <td>
                            {parseInt(value.status) !== 1 ?
                              <Row>
                                  <Colxx xxs="6">
                                    <CustomRadioButton checked  = { value.name} name = "Complete" value = {activity_id} 
                                    onChangeRadio={()=>this.onChangeChangeActivity(value,index) }/>
                                  </Colxx>
                                  <Colxx xxs="6">
                                    <CustomRadioButton checked  = {value.prepond} name = "Pending" value = "Pending" 
                                    onChangeRadio={()=>this.onChangeChangePending(index)}/>
                                  </Colxx>
                                  
                                   
                              </Row> : 
                              <div className="text-center ">
                                  <span className="active-buttoncolor" style={{padding:'2px',margin:'2px'}}>{onChangeLanguage(locale,'Activity Completed',languageData)}</span>
                              </div>
                              }
                               
                                 
                            </td>
                            
                          </tr>
                         )}
                        </tbody>
                      </table>
                
                
             </div>
         

                }
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
  
    })(CSIProductivitySheet)
  );

