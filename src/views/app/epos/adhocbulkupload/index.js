import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import{areabulkService} from '../../../../redux/EPOS/areabulk/saga';
import{AdhocService} from '../../../../redux/EPOS/adhocbulkupload/saga';
import{typebulkService} from '../../../../redux/EPOS/typebulk/saga';
import moment from 'moment';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import {onChangeLanguage,convertLocalToUTCDate,convertUTCToLocalDate} from '../../../../helper'
import DatePicker from "../../datePicker";


class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        mail_date:'',
        start_date:'',
        no_of_containers:'',
        end_date:'',
        poa:'',
        user_id:'',
        type: '',
        type_data:[],
        area:'',
        activity_type:'',    
        areadata:[],
        activitydata:[],
        start_time:new Date(),
        updated_start_time:new Date(),
      
        is_search:false,
        is_submit :false,

      };
    }
    componentDidMount() {
        this.setState({
            start_date:new Date(),
            
        })
       this.fetcharea() 
      //  this.fetchactivityapi()
       this.fetchtype()
    }

    fetcharea() {
      this.setState({
        loading : true
      })
      areabulkService.fetchareabulk()
        .then((res) => {
            this.setState({loading:false})
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var arealist = filterstatus.map(function(areaaval) {
                      return  {label : areaaval.name ,value : (areaaval.id).toString()};
                   });  
                    this.setState({
                    areadata :  arealist,
                    })
                 }
                
                 })
                 .catch((error) => { 
                    this.setState({
                        loading : false
                      })
                 }); 
     }
  //    fetchactivityapi() {
  //     this.setState({
  //       loading : true
  //     })
  //     activitybulkService.fetchactivitybulk()
  //     .then((res) => {
  //         this.setState({loading:false})
  //        if(res.status)   { 
  //           let filterstatus = (res.data).filter(item => item.status === 1)
  //              var list = filterstatus.map(function(areaaval) {
  //                   return  {label : areaaval.name ,value : (areaaval.id).toString()};
  //                });  
  //                 this.setState({
  //                 activitydata :  list,
  //                 })
  //              }
              
  //              })
  //              .catch((error) => { 
  //                 this.setState({
  //                     loading : false
  //                   })
  //              }); 
  //  }
   fetchtype() {
    this.setState({
      loading : true
    })
    typebulkService.fetchtypebulk()
    .then((res) => {
        this.setState({loading:false})
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var list = filterstatus.map(function(areaaval) {
                  return  {label : areaaval.name ,value : (areaaval.id).toString()};
               });  
                this.setState({
                type_data :  list,
                })
             }
            
             })
             .catch((error) => { 
                this.setState({
                    loading : false
                  })
             }); 
 }
   fetchAdhochandling() {
    const {mail_date} = this.state
    if(mail_date !== "")
    {
      this.setState({
        loading : true
      })
      this.clearValue()
      let mail=moment(convertUTCToLocalDate(mail_date)).format('MM/DD/YYYY hh:mm:ss a')

      AdhocService.fetchadhocsearch(mail)
      .then((res) => {
          this.setState({loading:false})
              if(res.status)   { 
                    this.setValue(res.data)
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
        createNotification('Please fill Mail Date Time','error','filled')
      }
     
 }
  setValue(record)
  {
    if(record && record !== null)
    {
      this.setState({
        mail_date:convertLocalToUTCDate(record.mail_date),
        // start_date:record.start_date,
        no_of_containers:record.no_of_containers,
        // end_date:record.end_date,
        poa:record.poa,
        user_id:record.user_id,
        type: record.type,
        area:record.area,
        activity_type:record.activity_type,   
        is_search:true,
        is_submit :false,
      })
    }
  }
   onSubmit() { 
    const {mail_date, start_date, no_of_containers, poa,user_id,type,
        area,activity_type,start_time,updated_start_time} = this.state
    let startdate = moment(start_date).format('MM/DD/YYYY hh:mm:ss a'),
    end_date = moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')

    if(mail_date !== "" &&   no_of_containers !== "" &&  poa !== "" &&  type !== "" )
    {

  
        this.setState({end_date:end_date,  })
        
        const {username} = this.props
        let end_date1=convertLocalToUTCDate(new Date()),
          start_date=convertLocalToUTCDate(start_time),
          updatedstarttime=convertLocalToUTCDate(updated_start_time),
           updated_end_time=convertLocalToUTCDate(new Date()),
           maildd=moment(convertUTCToLocalDate(mail_date)).format('MM/DD/YYYY hh:mm:ss a')

        this.setState({
          loading : true
        })
        AdhocService.createadhoc(username,startdate,end_date,maildd, no_of_containers, poa,type,
          area,activity_type,start_date,end_date1,updatedstarttime,updated_end_time)
          .then((res) => { 
            this.setState({   
              loading : false     
            }) 
            if(res.status)
              {
                createNotification('Created','success','filled')
                this.setState({
                  mail_date:'',
                  start_date:new Date(),
                  no_of_containers:'',
                  end_date:'',
                  poa:'',
                  user_id:'',
                  type: '',
                  area:'',
                  activity_type:'',    
                  is_search:false,
                  is_submit :false,
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
   clearValue()
   {
      this.setState({
        mail_date:'',
        start_date:new Date(),
        no_of_containers:'',
        end_date:'',
        poa:'',
        user_id:'',
        type: '',
        area:'',
        activity_type:'',    
        is_search:false,
        is_submit :false,
       })
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
   
  onChangecompleted(date)
  {
    console.log("lhnkjh " ,date)
    var time = moment(date).format('HH:mm:ss')
    if(time !== "00:00:00")
    {
      this.setState({mail_date  : date})
    }
   
  }
    render()
    {
        const {match,locale,languageData,username} = this.props
        const {mail_date, start_date, no_of_containers, end_date, poa,user_id,type,loading,
           type_data,is_search,is_submit} = this.state
        return (
            <>
            <title>{ onChangeLanguage(locale,'Adhoc / Bulk Upload Productivity',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={ onChangeLanguage(locale,'Adhoc / Bulk Upload Productivity',languageData)} match={match} />
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
                    <div className = "row" style = {{marginBottom:'30px'}}>
                    <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Start Date / Time',languageData)}
                            <br></br> 
                            {moment(start_date).format('MM/DD/YYYY hh:mm:ss a')}
                            </Label>
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'End Date /  Time',languageData)}
                            <br></br>{end_date}</Label>
                            
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'User ID',languageData)}
                            <br></br>{is_search === true ? user_id:username}</Label>
                            
                        </div>
                        <div className = "col-md-3 space-margin"  ></div>
                   
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Mail Date Time',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                                <p1 className = 'fontstyle mandatory-label'>{is_submit === true && mail_date === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                               <DatePicker
                                 selected={mail_date}
                                 className = "text-background" 
                                 onChange={(date) => this.onChangecompleted(date)}
                                 />
                        </div>
                        
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'No. of Containers',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && no_of_containers === ''?  "error-border":"fontstyle text-background" }  
                            type = "number" min="0"  step='1'
                            placeholder = ''
                            onKeyDown={this.handleKeypress}
                            value = {no_of_containers}  
                            onChange= {(e)=>this.setState({no_of_containers : e.target.value})} 
                            />
                        </div>
                        
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'POA',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && poa === ''?  "error-border":"fontstyle text-background" }
                                value = {poa}  
                                onChange= {(e)=>this.setState({poa  : e.target.value})} ></Input>
                        </div>
                       
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Activity Type',languageData)}<a style = {{color :'red'}}>*</a></Label>
                             <Select  
                             style={{height:'85px'}}
                             className={is_submit === true && type === ''?  "error-border-select":"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={type_data.filter(option =>option.value === type)}
                            options={type_data}
                            onChange={(option)=>this.setState({type:option.value})}
                        />
                        </div>
                        {/* <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Activity Type',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select  
                             style={{height:'85px'}}
                             className={is_submit === true && activity_type === ''?  "error-border-select":"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={ areadata.filter(option =>option.value === activity_type)}
                            options={areadata}
                            onChange={(option)=>this.setState({activity_type:option.value})}
                        />
                        </div> */}
                        {/* <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Activity Type',languageData)}<a style = {{color :'red'}}>*</a></Label>
                             <Select  
                             style={{height:'85px'}}
                             className={is_submit === true && area === ''?  "error-border-select":"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={activitydata.filter(option =>option.value === area)}
                            options={activitydata}
                            onChange={(option)=>this.setState({area:option.value})}
                        />
                        </div>
                       */}
                        
                    </div>
                    <div className = "row text-center">                      
                          <Button className = "button-width" color="secondary"  
                                onClick={()=>this.fetchAdhochandling()}
                                >{ onChangeLanguage(locale,'Find',languageData)}</Button>                          
                          <Button className = "button-width" color="primary"  
                                onClick={()=>this.onSubmit()}
                                >{ onChangeLanguage(locale,'Save',languageData)} </Button>                       
                         <Button className = "button-width" color="secondary"  
                                onClick={()=>this.clearValue()}
                                >{ onChangeLanguage(locale,'Refresh',languageData)} </Button>                        
                        
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

