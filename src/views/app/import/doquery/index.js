import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Checkbox} from 'antd';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import {onChangeLanguage,getCurrentWeek,getTimeDifference,getValue
  ,convertLocalToUTCDate,convertUTCToLocalDate} from '../../../../helper'
import { createNotification } from '../../../../toast';
import Loading from "react-fullscreen-loading";
import{DeliveryorderService} from '../../../../redux/imports/deliverorderquery/saga'
import{areaimportService} from '../../../../redux/imports/areaimport/saga'
import DatePicker from "../../datePicker";
import{deliveryorder_teamService} from '../../../../redux/imports/deliveryorder_team/saga';

import moment from 'moment';

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username:'',
        date:'',
        week:'',
        mtd_number:'',
        query_time:'',
        team:'',
        previoustat:'0',
        newtat:'0',
        totaltat:'0',
        unit:'0',
        teamdata:[],
        is_submit:false,
        loading:false,
        receivetime_format:false,
        prev_time:'',
        start_time:new Date(),
        updated_start_time:new Date(),
        end_time:'',
        unit_data:[],
        deliveryordercount:'',
        deliveryordercountlast:'',
      };
    }
    componentDidMount() {
       
        this.setState({
            date:moment(new Date()).format('MM/DD/YYYY'),
            week:getCurrentWeek(new Date()).toString()
        })
      this.fetcharea()
      this.fetchunitData()
      this.fetchDeliveryorderCount()
    }
    fetchDeliveryorderCount(){
      this.setState({loading:true})
      const {username} = this.props
      console.log(username)
      DeliveryorderService.fetchdeliveryordercount(username)
      .then((res) => {
         if(res.status)   { 
                let filterstatus = res.data;
                let lastdata = res.lastcount;
                this.setState({ 
                  deliveryordercount:filterstatus, 
                  deliveryordercountlast:lastdata     
                }) 
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})

}
    fetcharea() {
      this.setState({loading:true})
      areaimportService.fetchareaimport()
      .then((res) => {
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var regionlist = filterstatus.map(function(cusmaidid) {
                    return  {label : cusmaidid.area_name ,value : cusmaidid.id.toString()};
                 });  
                  this.setState({
                  teamdata :  regionlist
                  })
                 
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})
    } 
    fetchunitData() {  
      this.setState({
        loading : true
      })
      deliveryorder_teamService.fetchdeliveryorder_team()
        .then((res) => { 
          this.setState({   
        loading : false 
                
          }) 
          if(res.status)
            {
              this.setState({ 
                unit_data:res.data  , 
                         
              }) 
            }               
      
      })
      .catch((error) => { 
        this.setState({
          loading : false
        })
        });   
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
    addTimes(times = []) {

      const z = (n) => (n < 10 ? '0' : '') + n;
  
      let hour = 0
      let minute = 0
      let second = 0
      for (const time of times) {
          const splited = time.split(':');
          hour += parseInt(splited[0]);
          minute += parseInt(splited[1])
          second += parseInt(splited[2])
      }
      const seconds = second % 60
      const minutes = parseInt(minute % 60) + parseInt(second / 60)
      const hours = hour + parseInt(minute / 60)
  
      return z(hours) + ':' + z(minutes) + ':' + z(seconds)
  }
    onSubmit() { 
        const {mtd_number,query_time,start_time,updated_start_time,week,date,team,prev_date,prev_time,unit} = this.state;

       
        if(mtd_number !=='' && query_time !==''   && team !=='')
        {
          var end_date =  moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
          var times = moment(convertUTCToLocalDate(query_time)).format('MM/DD/YYYY hh:mm:ss a')
          console.log("kjvvhh times " ,times)
          var new_tat = '', previous_tat =  '00:00:00',total_tat=''
          console.log("kjvvhh prev_date "  , "===> " , prev_time)
          if(prev_date === '' || prev_time  === '')
          {
            new_tat = getTimeDifference(query_time, convertLocalToUTCDate(new Date()))
          
          }
          else
          {

            new_tat = getTimeDifference(query_time, convertLocalToUTCDate(new Date()))
            var pretime = moment(prev_time).format('MM/DD/YYYY hh:mm:ss a')           
            previous_tat = getTimeDifference(new Date(pretime),new Date())
          }
          console.log("kjvvhh new_tat " ,new_tat)
          console.log("kjvvhh previous_tat " ,previous_tat)
          var time_sum = [new_tat,previous_tat]
          total_tat = this.addTimes(time_sum)
          console.log("kjvvhh total_tat" ,total_tat )
          this.setState({
            end_time:end_date,
            newtat:new_tat,
            previoustat:previous_tat,
            totaltat:total_tat,
            loading : true
          })   

          const end_time = new Date() ,updated_end_time = new Date()
          
          if(times !== "Invalid date")
          {
            const {username} = this.props
            DeliveryorderService.createDeliveryorder(mtd_number,times,username,week,date,team,
              previous_tat,new_tat,total_tat,unit,
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
                  this.fetchDeliveryorderCount()
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
            this.setState({receivetime_format:true})
            createNotification('Please fill Received Time(MM/DD/YYYY hh:mm:ss AM/PM) this format','error','filled')
          }
          
          
        }
        else
        {
          this.setState({
            is_submit:true
        })
          createNotification('Please fill mandatory field','error','filled')
        }
      }
      fetchTime(value)
    {
     
      this.setState({
        mtd_number:value,
        prev_time:'',
      })
      DeliveryorderService.fetchMailrecievedTime(value)
      .then((res) => {
        
        if(res.status)   { 
                  if(res.data)
                  {
                    this.setState({
                      prev_time:res.data.query_time
                    })
                  }
                  else
                  {
                    this.setState({
                      prev_time:''
                    })
                  }
                 
              }
              
            })
            .catch((error) => { 
              this.setState({
                  loading : false
                })
        }); 
    }

      onrefresh() {
        this.setState({
            start_time:new Date(),
            updated_start_time:new Date(),
            date:moment(new Date()).format('MM/DD/YYYY'),
            week:getCurrentWeek(new Date()).toString(),
            mtd_number:'',
            query_time:'',
            end_time:'',
            team:'0',
            previoustat:'0',
            newtat:'0',
            totaltat:'0',
            unit:'0',
            receivetime_format:false,
            is_submit:false,
        })
       
      } 
      onChangetime(date)
      {
        this.setState({query_time  : date})
       
      }
    render()
    {
        const {match,locale, languageData,username} = this.props
        const {mtd_number,query_time,start_time,end_time,week,date,team,previoustat,newtat,totaltat,unit,
          deliveryordercount,deliveryordercountlast,unit_data,teamdata,is_submit} = this.state
        return (
            <>
            <title>{onChangeLanguage(locale,'Delivery Order Query',languageData)}</title>
            <Row>
              <Colxx xxs="12">


              <div className = "row">
                      <div className = "col-md-8">
                      <Breadcrumb heading={onChangeLanguage(locale,'Delivery Order Query',languageData)} match={match} />
                    </div>
                    <div className = "col-md-2" >
                        <h2 style = {{marginTop:'15px'}}>Total EQ : {deliveryordercount}</h2>
                        </div>
                        <div className = "col-md-2">
                            <h2  style = {{marginTop:'15px'}}>Last EQ : {deliveryordercountlast}</h2>
                        </div>
              
                  </div>
                
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
            <div className = "" style = {{padding:'0px 10px',borderRadius:'10px',marginBottom:'10px'}}>
                    <div className = "row" >
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'User Name',languageData)}</a><br></br> {username} </Label>
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Start Time',languageData)}</a><br></br> 
                            {moment(start_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'End Time',languageData)}</a><br></br> 
                            {end_time !== '' && moment(end_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Week',languageData)}</a><br></br> {week}</Label>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Date',languageData)}</a><br></br> 
                            {date}</Label>
                        </div>
                    </div>
                </div>  
                <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                  <div className = "publish-title" >
                          <Row>
                              <Colxx xxs="12">
                                  <Label  className = "fontstyle" 
                                  style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'DO Query Resolve Form',languageData)}</Label>
                                  
                              </Colxx>
                          </Row>
                          </div>
                          <div className = "row" style = {{padding:'10px'}}>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'MTD Number',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                    <span>
                                        <Input  
                                        className = {is_submit === true && mtd_number === ''?  "error-border-paste":"fontstyle text-background" }  
                                        placeholder = ''
                                        value = {mtd_number}  
                                        onChange= {(e)=>this.fetchTime(e.target.value)} 
                                        />
                                      
                                    </span>
                                </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Mail Received Time',languageData)}<a style = {{color :'red'}}>*</a>
                                    {(is_submit === true && query_time === '')  && <a className ="fontstyle mandatory-label">{onChangeLanguage(locale,'Mandatory Field',languageData)}</a>}
                                    </Label>
                                    <DatePicker
                                    selected={query_time}
                                    className = "text-background-paste"
                                    onChange={(date) => this.onChangetime(date)}
                                    />
                                   
                                </div>
                                <div className = " row text-center" >
                                    <Button className = "button-width" color="primary" 
                                            onClick={()=>this.onSubmit()}
                                            >{onChangeLanguage(locale,'Save',languageData)} </Button> 
                                   
                                        <Button className = "button-width" color="secondary"  
                                                onClick={()=>this.onrefresh()}
                                    >{onChangeLanguage(locale,'Refresh',languageData)}</Button>
                                 </div>
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
                        <div className = "col-md-2 space-margin"  >
                                <Label  className = "fontstyle normal-font" >
                                  {onChangeLanguage(locale,'Team',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                                <Select  
                                className = {is_submit === true && team === ''?  "error-border-select-paste":"react-select fontstyle" }  
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={teamdata.filter(option =>option.value === team)}
                                options={teamdata}
                                onChange={(option) => this.setState({  team: option.value,unit: getValue(unit_data,'team_id','unit',option.value)  })}
                             />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                                <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Previous TAT',languageData)}</a><br></br> {previoustat}</Label>
                        </div>
                        <div className = "col-md-3 space-margin"  >
                                <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'New TAT',languageData)}</a><br></br>  {newtat}</Label>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                                <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Total TAT',languageData)}</a><br></br>  {totaltat}</Label>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                                <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Units',languageData)}</a><br></br>{unit}</Label>
                        </div>
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

