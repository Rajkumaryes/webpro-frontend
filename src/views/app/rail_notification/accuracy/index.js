import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import DatePicker from "../../datePicker";
import "react-datepicker/dist/react-datepicker.css";
import{accuracyService} from '../../../../redux/railnotification/accuracy/saga';
import {onChangeLanguage,convertLocalToUTCDate,convertUTCToLocalDate} from '../../../../helper';
import { createNotification } from '../../../../toast';
import{errortypeService} from '../../../../redux/railnotification/errortype/saga';
import Select from 'react-select';
import moment from 'moment';


class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user_id:'',
        team:'',
        error_type:'',
        errortypedata:[],
        error_nos:'',
        date_of_error:'',
        source:'',
        start_time:new Date(),
        updated_start_time:new Date(),
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
    
    componentDidMount() {
       
       this.fetcherrortype()
    }
    onChangedate(date)
    {
      this.setState({date_of_error  : date})
    }

    onChangetime(date)
    {
      console.log("lhnkjh " ,date)
      var time = moment(date).format('HH:mm:ss')
      if(time !== "00:00:00")
      {
        this.setState({date_of_error  : date})
      }
     
    }
    fetcherrortype() {
      this.setState({loading:true})
      errortypeService.fetcherrortype()
      .then((res) => {
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var typelist = filterstatus.map(function(response) {
                    return  {label : response.name ,value : response.id.toString()};
                 });  
                  this.setState({
                    errortypedata :  typelist
                  })
                 
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})
   }  
    onSubmit() { 
        const {user_id,team,error_type,error_nos,date_of_error,source,updated_start_time} = this.state;
        let end_date=convertLocalToUTCDate(new Date()),
        start_date=convertLocalToUTCDate(updated_start_time),
        updatedstarttime=convertLocalToUTCDate(updated_start_time),
         updated_end_time=convertLocalToUTCDate(new Date()),
         dateoferror=moment(convertUTCToLocalDate(date_of_error)).format('MM/DD/YYYY hh:mm:ss a')

         const{username}=this.props 
      if(user_id !==''&& error_type!==''&& error_nos!=='' &&date_of_error!==''&&source!=='')
        {
            accuracyService.createaccuracy( user_id,team,error_type,error_nos,dateoferror,source,username,start_date,end_date,updatedstarttime,updated_end_time)
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
                      error_type:'',
                      error_nos:'',
                      date_of_error:'',
                      source:'',
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
        error_type:'',
        error_nos:'',
        date_of_error:'',
        source:'',
        is_submit:false,
    })
   
  }
   

  handletype = (selectedOptions) => {
    this.setState({error_type : selectedOptions.value})  
} 







    render()
    {
        const {match,locale,languageData} = this.props
        const {user_id,error_type,error_nos,date_of_error,source,is_submit,errortypedata} = this.state
        return (
            <>
            <title>Accuracy{onChangeLanguage(locale,'Accuracy',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading= {onChangeLanguage(locale,'Accuracy',languageData)} match={match} />
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
                      
                     
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Type',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select  
                             style={{height:'85px'}}
                             className={is_submit === true && error_type === ''?  "error-border-select":"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={errortypedata.filter(option =>option.value === error_type)}
                            options={errortypedata}
                            onChange={this.handletype}
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error No',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className={is_submit === true && error_nos === ''?  "error-border":"fontstyle text-background" }
                            placeholder = ''
                            type='number'
                            value = {error_nos}  
                            onChange= {(e)=>this.setState({error_nos : e.target.value})} 
                            />
                        </div>
                        

                   
                         <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Date of Error',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <p1 className = 'fontstyle mandatory-label'>{is_submit === true && date_of_error === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                                <DatePicker
                                 selected={date_of_error}
                                 className = "text-background"
                                 onChange={(date) => this.onChangetime(date)}
                                 />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Source',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className={is_submit === true && source === ''?  "error-border":"fontstyle text-background" }

                            placeholder = ''
                            value = {source}  
                            onChange= {(e)=>this.setState({source : e.target.value})} 
                            />
                        </div>
                        
                    </div>
                    <div className = "row text-center">                       
                          <Button className = "button-width" color="primary"  
                                onClick={()=>this.onSubmit()}  >
                               {onChangeLanguage(locale,'Save',languageData)} </Button>                        
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

   })(QueryResolveSheet)
  );

