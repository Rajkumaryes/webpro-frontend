
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import DatePicker from "../../datePicker";
import "react-datepicker/dist/react-datepicker.css";
import{reportService} from '../../../../redux/railnotification/report/saga';
import{railtypeService} from '../../../../redux/railnotification/type/saga';
import{reportsService} from '../../../../redux/railnotification/reports/saga';
import {onChangeLanguage,convertLocalToUTCDate} from '../../../../helper';
import { createNotification } from '../../../../toast';
import Select from 'react-select';
import moment from 'moment';


class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user_id:'',
        team:'',
        start_date:'',
        end_date:'',
        reports:'',
        type:'',
        start_time:new Date(),
        updated_start_time:new Date(),
        reportdata:[],
        typedata:[],
        is_submit: false,
      };
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
        navigator.clipboard.writeText(this.state.errortype)
    }
    handletype = (selectedOptions) => {
              this.setState({type : selectedOptions.value})  
          } 
    handlereport = (selectedOptions) => {
              this.setState({reports : selectedOptions.value})  
          } 
    componentDidMount() {
       
      this.fetchtype()
      this.fetchreports()
    }


    fetchreports() {
      this.setState({loading:true})
      reportsService.fetchreports()
      .then((res) => {
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var reportlist = filterstatus.map(function(response) {
                    return  {label : response.name ,value : response.id.toString()};
                 });  
                  this.setState({
                  reportdata :  reportlist
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
        const {user_id,team,start_date,end_date,reports,type,start_time,updated_start_time} = this.state;
        let end_time=convertLocalToUTCDate(new Date()),
        start_date1=convertLocalToUTCDate(updated_start_time),
        updatedstarttime=convertLocalToUTCDate(updated_start_time),
         updated_end_time=convertLocalToUTCDate(new Date())  
         const{username}=this.props
        if(user_id !==''&& team !==''&& start_date!==''&& end_date!=='' &&type!=='')
        {
          reportService.createreport( user_id,team,start_date,end_date,reports,type,username,start_date1,end_time,updatedstarttime,updated_end_time)
              .then((res) => { 
                this.setState({   
                  loading : false     
                }) 
                if(res.status)
                  {
                    createNotification('Created','success','filled')
                    this.setState({
                      user_id:'',
                      team:'',
                      start_date:'',
                      end_date:'',
                      reports:'',
                      type:'',
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
      user_id:'',
      team:'',
      start_date:'',
      end_date:'',
      reports:'',
      type:'',
        is_submit:false,
    })
   
  }
   

  onChangetime(date)
  {
    this.setState({start_date  : date})
   
  }
  onChangetimeend(date)
  {
    this.setState({end_date  : date})
   
  }







    render()
    {
        const {match,locale,languageData} = this.props
        const {user_id,team,start_date,end_date,reports,type,reportdata,typedata,is_submit} = this.state
        return (
            <>
            <title>Accuracy{onChangeLanguage(locale,'Report',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading= {onChangeLanguage(locale,'Report',languageData)} match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row" style = {{marginBottom:'10px'}}>
                       
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'User ID',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className={is_submit === true && user_id === ''?  "error-border":"fontstyle text-background" }
                            placeholder = ''
                            value = {user_id}  
                            onChange= {(e)=>this.setState({user_id : (e.target.value).toUpperCase()})}
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Team',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className={is_submit === true && team === ''?  "error-border":"fontstyle text-background" }
                            placeholder = ''
                            value = {team}  
                            onChange= {(e)=>this.setState({team : e.target.value})} 
                            />
                        </div>

                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Start Date / Time',languageData)}
                              <a style = {{color :'red'}}>*</a></Label>
                               <p1 className = 'fontstyle mandatory-label'>
                                {is_submit === true && start_date === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }
                                </p1>
                              <DatePicker
                                 selected={start_date}
                                 className = "text-background" 
                                 onChange={(date) => this.onChangetime(date)}
                                 />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'End Date / Time',languageData)}
                              <a style = {{color :'red'}}>*</a></Label>
                               <p1 className = 'fontstyle mandatory-label'>
                                {is_submit === true && end_date === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }
                                </p1>
                              <DatePicker
                               min_date = {start_date}
                                selected={end_date}
                                 className = "text-background" 
                                 onChange={(date) => this.onChangetimeend(date)}
                                 />
                        </div>
                       
                            <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Reports',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select  
                             style={{height:'85px'}}
                             className={is_submit === true && reports === ''?  "error-border-select":"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={reportdata.filter(option =>option.value === reports)}
                            options={reportdata}
                            onChange={this.handlereport}
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
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
                        
                    </div>
                    <div className = "row" style = {{marginBottom:'10px'}}>
                       <div className = "col-md-4"></div>
                         <div className = "col-md-2">
                          <Button className = "button-width" color="primary"  style={{width:'150px'}}
                                onClick={()=>this.onSubmit()}
                                >
                               {onChangeLanguage(locale,'Save',languageData)} </Button>
                         </div>
                         <div className = "col-md-2">
                             <Button className = "button-width" color="secondary" style={{width:'150px'}} 
                                 onClick={()=>this.onrefresh()}
                                 >
                                 {onChangeLanguage(locale,'Refresh',languageData)}
                           </Button>
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


