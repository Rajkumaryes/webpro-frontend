import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Button} from 'reactstrap';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage} from '../../../../../helper'
import{regionsService} from '../../../../../redux/ra/region/saga'
import{RAareaService} from '../../../../../redux/ra/area/saga'
import Loading from "react-fullscreen-loading";
import Select from 'react-select';
import { TimePicker } from 'antd';
import moment from 'moment';
import CustomRadioButton from '../../../../RadioButton'
import{areaService} from '../../../../../redux/area/saga'

class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:0,
      name: '',
      region:'',
      status : 1,
      start_time :'',
      end_time:'',
      start_time1 :'',
      end_time1:'',
      range1:'',
      range2:'',
      region_data:[],
      team_data:[],
      range1_currentday:'',
      isEdit:false,
      loading:false
    };
  }

  componentDidMount() {
    const {isEdit,record} = this.props
    if(isEdit == true)
    {
      this.setState({
        id:record.id,
        region:record.region,
        name:record.name,
        status: record.status,
        start_time :record.start_time,
        end_time:record.end_time,
        start_time1 :record.start_time1,
        end_time1:record.end_time1,
        range1:record.range1,
        range2:record.range2,
        range1_currentday:record.range1_currentday !== null ?record.range1_currentday : '',
        isEdit:true
      })
     
    }  
    this.fetchregion()
    this.fetcharea()
  }
  fetcharea() {
    areaService.fetcharea()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.name};
               });  
                this.setState({
                  team_data :  regionlist,
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
  }  
  fetchregion() {
    regionsService.fetchapi()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                region_data :  regionlist,
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
 }  
onSubmit() { 
  const {id,region,name,status,isEdit,start_time,end_time,range1,range2,start_time1,end_time1,range1_currentday} = this.state;
  if(region !== "" && name !=='' && start_time !== '' && end_time !== '' && range1_currentday !== ''
    && range1!== "" &&range2 !== "" && start_time1 !== "" && end_time1 !== "")
  {
    
    
    if(isEdit === true)
    {
      this.updateAPI(id,region,name,status,start_time,end_time,range1,range2,start_time1,end_time1,range1_currentday)
    }
    else
    {
      this.createAPI(region,name,status,start_time,end_time,range1,range2,start_time1,end_time1,range1_currentday)
    }
   
  }
  else
  {
    createNotification('Please fill mandatory field','error','filled')
  }
 
}
createAPI(region,name,status,start_time,end_time,range1,range2,start_time1,end_time1,range1_currentday)
{
  this.setState({
    loading : true
  })
  RAareaService.createapi(region,name,status,start_time,end_time,range1,range2,start_time1,end_time1,range1_currentday)
    .then((res) => { 
      this.setState({   
        loading : false     
      }) 
      if(res.status)
        {
          createNotification('Created','success','filled')
          this.close(true)
        }    
        else{
          createNotification(res.message,'error','filled')
        }        
  
  })
  .catch((error) => { 
    this.setState({
      loading : false
    })
  });
   
}
updateAPI(id,region,name,status,start_time,end_time,range1,range2,start_time1,end_time1,range1_currentday)
{
  this.setState({
    loading : true
  })
  RAareaService.updateapi(id,region,name,status,start_time,end_time,range1,range2,start_time1,end_time1,range1_currentday)
    .then((res) => { 
      this.setState({   
        loading : false     
      }) 
      if(res.status)
        {
          createNotification('Updated','success','filled')
          this.close(true)
        }  
        else{
          createNotification(res.message,'error','filled')
        }            
  
  })
  .catch((error) => { 
    this.setState({
      loading : false
    })
  });
}

close(isedit)
{
  this.props.closeModal(isedit)
}
onChangeEndtime1(timeString)
{
  let endtime= (timeString !== '' && timeString !== null) ?  moment(timeString).format('HH:mm:ss') : ''
  this.setState({
    end_time : endtime
  }) 
 
}
onChangestarttime1(timeString)
  {
    let stattime= (timeString !== '' && timeString !== null) ?  moment(timeString).format('HH:mm:ss') : ''
      this.setState({
        start_time  : stattime
      })
  } 
onChangeEndtime(timeString)
{
  let endtime= (timeString !== '' && timeString !== null) ?  moment(timeString).format('HH:mm:ss') : ''
  this.setState({
    end_time1  : endtime
  }) 
 
 
}
onChangestarttime(timeString)
  {
    let stattime= (timeString !== '' && timeString !== null) ?  moment(timeString).format('HH:mm:ss') : ''
      this.setState({
        start_time1  : stattime
      })
  } 
  onChangeendtime(timeString)
  {
    let endtime= (timeString !== '' && timeString !== null) ?  moment(timeString).format('HH:mm:ss a') : ''
      this.setState({
        end_time:endtime
      })
  } 
  onChangerange1(timeString)
  {
    let range= (timeString !== '' && timeString !== null) ?  moment(timeString).format('HH:mm:ss') : ''
      this.setState({
        range1  : range,
      })
  } 
  onChangerange2(timeString)
  {
    let range= (timeString !== '' && timeString !== null) ?  moment(timeString).format('HH:mm:ss') : ''
      this.setState({
        range2  : range,
      })
  } 
  setRangeCurrentDay(range1_currentday)
  {
    if(range1_currentday === 'CURRENT DAY')
    {
      this.setState({
        range1_currentday : 'CURRENT DAY'
      })
    }
    else
    {
      this.setState({
        range1_currentday : 'NEXT DAY'
      })
    }
    
    
  }
  render()
  {
  
    const {region,name,region_data,team_data,isEdit,status,loading,start_time,end_time,
      range1,range2,start_time1,end_time1,range1_currentday} = this.state
    const {locale,languageData} = this.props
    return (
      <div>
           {loading && 
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
        <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Region Name',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
            <Colxx xxs="8" className="mb-4">
            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={region_data.filter(option =>option.value === region)}
                        options={region_data}
                        onChange={({value}) => this.setState({  region: value })}
                      />
                 </Colxx>
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Area Name',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                     <Select  
                          className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={team_data.filter(option =>option.value === name)}
                        options={team_data}
                        onChange={({value}) => this.setState({  name: value })}
                      />
                
                 </Colxx>
                
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Range1 Start Time',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
            <TimePicker className = "fontstyle text-background" 
                    style = {{width:'100%'}}  
                    format="HH:mm:ss"
                     value = {(start_time !== null  && start_time)? moment(start_time, "HH:mm:ss a") : '' }  
                    //  onChange= {(timeString)=>this.setState({start_time : timeString})} 
                     onChange={(timeString) => this.onChangestarttime1(timeString)}
                     />
                 </Colxx>
                
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Range1 End Time',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
            <TimePicker className = "fontstyle text-background" 
                    style = {{width:'100%'}}  
                    format="HH:mm:ss"
                     value = {(end_time !== null  && end_time)? moment(end_time, "HH:mm:ss a") : '' }  
                     onChange={(timeString) => this.onChangeEndtime1(timeString)}/>
                 </Colxx>
                
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Range1',languageData)}</Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
            <TimePicker className = "fontstyle text-background" 
                    style = {{width:'100%'}}  
                    format="HH:mm:ss"
                     value = {(range1 !== null  && range1)? moment(range1, "HH:mm:ss a") : '' }  
                     onChange= {(timeString)=>this.setState({range1 : timeString})}  
                     onChange={(timeString) => this.onChangerange1(timeString)}/>
                 </Colxx>
                
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Range1 Current day',languageData)}</Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                    <Row>
                          <Colxx xxs="6">
                              <CustomRadioButton checked = "CURRENT DAY" name = "Current Day" value = {range1_currentday} 
                                  onChangeRadio={()=>this.setState({range1_currentday:"CURRENT DAY"})}/>
                              
                          </Colxx>
                          <Colxx xxs="6">
                            <CustomRadioButton checked = "NEXT DAY" name = "Next Day" value = {range1_currentday}
                                  onChangeRadio={()=>this.setState({range1_currentday:"NEXT DAY"})}/>
                              
                          </Colxx>
                      </Row>
                 </Colxx>
                
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Range2 Start Time',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
            <TimePicker className = "fontstyle text-background" 
                    style = {{width:'100%'}}  
                    format="HH:mm:ss"
                     value = {(start_time1 !== null  && start_time1)? moment(start_time1, "HH:mm:ss a") : '' }  
                    //  onChange= {(timeString)=>this.setState({start_time : timeString})} 
                     onChange={(timeString) => this.onChangestarttime(timeString)}
                     />
                 </Colxx>
                
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Range2 End Time',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
            <TimePicker className = "fontstyle text-background" 
                    style = {{width:'100%'}}  
                    format="HH:mm:ss"
                     value = {(end_time1 !== null  && end_time1)? moment(end_time1, "HH:mm:ss a") : '' }
                     onChange={(timeString) => this.onChangeEndtime(timeString)}/>
                 </Colxx>
                
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Range2',languageData)}</Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
            <TimePicker className = "fontstyle text-background" 
                    style = {{width:'100%'}}  
                    format="HH:mm:ss"
                     value = {(range2 !== null  && range2)? moment(range2, "HH:mm:ss a") : '' }  
                     onChange= {(timeString)=>this.setState({range2 : timeString})}  
                     onChange={(timeString) => this.onChangerange2(timeString)}/>
                 </Colxx>
                
             </Row>
             {isEdit && 
                <Row>
                <Colxx xxs="4" className="mb-4">
                      <Label>{onChangeLanguage(locale,'Status',languageData)}</Label>
                </Colxx>
                  
                <Colxx xxs="8" className="mb-4">
                 <select className='fontstyle buttoncolor input-text'
                     type="select"
                     name="aggregatename"
                     id="name"
                     placeholder="Select"
                     value={status}
                     onChange={(e) =>this.setState({status :parseInt(e.target.value)})}
                     >
                     <option value = {1}>{onChangeLanguage(locale,'Active',languageData)}</option>
                     <option value = {0}>{onChangeLanguage(locale,'In - Active',languageData)}</option>
                  
                  </select>
                  </Colxx>
                  
                </Row>
             }
           <Row>
               <Colxx xxs="4" className="mb-4"> </Colxx>       
               <Colxx xxs="3" className="mb-4"> 
                  <Button color = "primary" className = 'fontstyle button-width'  onClick={()=>this.close(false)}>
                  {onChangeLanguage(locale,'Cancel',languageData)} 
                   
                  </Button>
                  
               </Colxx>   
               <Colxx xxs="5" className="mb-4"> 
                <Button color = "secondary" className="fontstyle button-width" onClick={()=>this.onSubmit()}>
                    {onChangeLanguage(locale,'Submit',languageData)} 
                  </Button>
               </Colxx>       
               
            </Row>
      </div>
    );
  }
}


const mapStateToProps = ({ settings }) => {
  const { locale,languageData} = settings;
  return {locale, languageData};
};
export default injectIntl(
  connect(mapStateToProps, {

  })(RegisterUser)
);

