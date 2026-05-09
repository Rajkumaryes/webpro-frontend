import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
// import { Checkbox, Popconfirm ,Tooltip } from 'antd';
import Select from 'react-select';
import{othersService} from '../../../../redux/railnotification/others/saga';
import{railactivityService} from '../../../../redux/railnotification/activity/saga';
import{railtypeService} from '../../../../redux/railnotification/type/saga';

import {onChangeLanguage,convertLocalToUTCDate} from '../../../../helper';
import { createNotification } from '../../../../toast'
import DatePickerDate from "../datePicker";

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user_id:'',
        region:'',
        processed_date:'',
        type:'',
        activity:'',
        count:'',
        start_time:new Date(),
        updated_start_time:new Date(),
        typedata:[],
        activitydata:[],
        is_submit:false,
        othercount:'',
        othercountlast:''
      };
    }
    onPaste() 
    {
        navigator.clipboard.readText().then((text)=>{
            console.log("lkbkjj" , text)
            console.log("lkbkjj" ,typeof text)
          
        })
    }
    componentDidMount() {
        this.fetchactivity()
        this.fetchtype()
        this.fetchOtherCount()
       
    }

    fetchOtherCount(){
      this.setState({loading:true})
      const {username} = this.props
      othersService.fetchotherCount(username)
      .then((res) => {
         if(res.status)   { 
                let filterstatus = res.data;
                let lastdata = res.lastcount; 
                this.setState({ 
                  othercount:filterstatus, 
                  othercountlast:lastdata     
                }) 
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})
  
  }

    onChangetime(date)
    {
      this.setState({processed_date  : date})
    }
    fetchactivity() {
        this.setState({loading:true})
        railactivityService.fetchactivity()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var activitylist = filterstatus.map(function(response) {
                      return  {label : response.name ,value : response.id.toString()};
                   });  
                    this.setState({
                    activitydata :  activitylist
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
        railtypeService.fetchtype()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var typelist = filterstatus.map(function(response) {
                      return  {label : response.name ,value : response.id.toString()};
                   });  
                    this.setState({
                    typedata :  typelist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  


    onSubmit() { 
        const { user_id, region,processed_date,type,activity,count,start_time,updated_start_time} = this.state;
        let end_date=convertLocalToUTCDate(new Date()),
        start_date=convertLocalToUTCDate(updated_start_time),
        updatedstarttime=convertLocalToUTCDate(updated_start_time),
         updated_end_time=convertLocalToUTCDate(new Date())  
         const{username}= this.props
        if(user_id !==''&& region!==''&&processed_date!==''&&type!==''&& activity !==''&&count!=='')
        {
            othersService.createothers( user_id, region,processed_date,type,activity,count,username,start_date,end_date,updatedstarttime,updated_end_time)
              .then((res) => { 
                this.setState({   
                  loading : false     
                }) 
                if(res.status)
                  {
                    createNotification('Created','success','filled')
                    this.setState({
                      user_id:'',
                      region:'',
                      processed_date:'',
                      type:'',
                      activity:'',
                      count:'',
                      is_submit:false,
                  })
                  this.fetchOtherCount()
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
        user_id:'',
        region:'',
        processed_date:'',
        type:'',
        activity:'',
        count:'',
        is_submit:false,
    })
   
  }
   
    onCopy()
    {
        navigator.clipboard.writeText(this.state.teamname)
    }
    handletype = (selectedOptions) => {
        this.setState({type : selectedOptions.value})  
    } 
    handleactivity = (selectedOptions) => {
        this.setState({activity : selectedOptions.value})  
    } 
    render()
    {
        const {match,locale,languageData} = this.props
        const { user_id, region,processed_date,type,activity,count,typedata,activitydata,is_submit,othercount,othercountlast} = this.state
        return (
            <>
            <title>Others</title>
            <Row>
              <Colxx xxs="12">
                
                <div className="row">
                <div className="col-md-8">
                <Breadcrumb heading="Others" match={match} />
                </div>
                <div className = "col-md-2">
                    <h2 style = {{marginTop:'15px'}}>Total EQ : {othercount}</h2>
                </div>
                <div className = "col-md-2">
                    <h2  style = {{marginTop:'15px'}}>Last EQ : {othercountlast}</h2>
                </div>

            </div>
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row" style = {{marginBottom:'30px'}}>
                    <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'User ID',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && user_id === ''?  "error-border":"fontstyle text-background" }
                                value = {user_id}  
                                onChange= {(e)=>this.setState({user_id : (e.target.value).toUpperCase()})}
                                ></Input>
                        </div>
                  
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Ramp/Region',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && region === ''?  "error-border":"fontstyle text-background" } 
                            placeholder = ''
                            value = {region}  
                            onChange= {(e)=>this.setState({region : e.target.value})} 
                            />
                        </div>
                          <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Processed Date',languageData)}
                              <a style = {{color :'red'}}>*</a></Label>
                               <p1 className = 'fontstyle mandatory-label'>
                                {is_submit === true && processed_date === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                              <DatePickerDate
                                 selected={processed_date}
                                 className = "text-background" 
                                 onChange={(date) => this.onChangetime(date)}
                                 />
                                
                        </div>
                        
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Type',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select  
                             style={{height:'85px'}}
                             className={is_submit === true && type === ''?  "error-border-select":"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={typedata.filter(option =>option.value === type)}
                            options={typedata}
                            onChange={this.handletype}
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Activity',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select  
                             style={{height:'85px'}}
                             className={is_submit === true && activity === ''?  "error-border-select":"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={activitydata.filter(option =>option.value === activity)}
                            options={activitydata}
                            onChange={this.handleactivity}
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Count',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && count === ''?  "error-border":"fontstyle text-background" }    
                            placeholder = ''
                            type='number' min='0'
                            value = {count}  
                            onChange= {(e)=>this.setState({count : e.target.value})} 
                            />
                        </div>
                    </div>
                    <div className = "row text-center">                     
                          <Button className = "button-width" color="primary"  
                               onClick={()=>this.onSubmit()}    >
                              {onChangeLanguage(locale,'Save',languageData)}</Button>                        
                          <Button className = "button-width" color="secondary" 
                                // onClick={()=>this.onPaste()}
                                // >Cancel</Button> 
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

 })(QueryResolveSheet)
);
