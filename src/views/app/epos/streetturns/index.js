import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import {onChangeLanguage,convertLocalToUTCDate,convertUTCToLocalDate} from '../../../../helper'
import moment from 'moment';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import{StreetturnsService} from '../../../../redux/EPOS/streetturns/saga';
import{stturncodeService} from '../../../../redux/EPOS/stturncode/saga'

  import DatePicker from "../../datePicker";


class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        mail_date:'',
        stturn_code:'',
        event_updated:'',
        event_deleted:'',
        start_date:'',
        end_date:'',
        no_of_checks:'',
        no_of_query:'',
        user_id:'',
        purple_category:'',
        is_search:false,
        is_submit :false,
        start_time:new Date(),
        updated_start_time:new Date(),
        area:'',
        stturnsdata:[],

      };
    }
    componentDidMount() {
        this.setState({
            start_date:new Date(),
            
        })
       this.fetchstturncode()  
   }
   
   fetchstturncode() {
    stturncodeService.fetchstturncode()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var stlist = filterstatus.map(function(response) {
                  return  {label : response.name ,value : response.id.toString()};
               });  
                this.setState({
                stturnsdata :  stlist,
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
 } 

     fetchstreetturns() {
        const {mail_date} = this.state
        if(mail_date !== "")
        {
          this.setState({
            loading : true
          })
         let mail=moment(convertUTCToLocalDate(mail_date)).format('MM/DD/YYYY hh:mm:ss a')

          this.claerValue()
           console.log(mail_date,'mmmmmm')
          // let mail=convertUTCToLocalDate(mail_date)

          StreetturnsService.fetchIndividualstreetturns(mail)
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
                stturn_code:record.stturn_code,
                event_updated:record.event_updated,
                event_deleted:record.event_deleted,
                // start_date:record.start_date,
                // end_date:record.end_date,
                purple_category:record.purple_category,
                no_of_checks:record.no_of_checks,
                no_of_query:record.no_of_query,
                user_id:record.user_id,
                is_search:true,
                is_submit:false,
                area:record.area,
            })
        }
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
    onSubmit() 
    {
        const {mail_date,stturn_code,event_updated,purple_category,no_of_checks,
            no_of_query,event_deleted,start_date,area,start_time,updated_start_time} = this.state
            let startdate = moment(start_date).format('MM/DD/YYYY hh:mm:ss a'),
            end_date = moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
             maildd = moment(convertUTCToLocalDate(mail_date)).format('MM/DD/YYYY hh:mm:ss a')

            if(mail_date !== "" )
            { 
                this.setState({end_date:end_date,  })
                const {username} = this.props
                let end_date1=convertLocalToUTCDate(new Date()),
                start_date=convertLocalToUTCDate(start_time),
                updatedstarttime=convertLocalToUTCDate(updated_start_time),
                 updated_end_time=convertLocalToUTCDate(new Date())
                //  maildd=moment(convertUTCToLocalDate(mail_date)).format('MM/DD/YYYY hh:mm:ss a')

                this.setState({
                    loading : true
                  })
                  StreetturnsService.createstreetturns(username, startdate,end_date,maildd,stturn_code,event_updated,purple_category,no_of_checks,
                    no_of_query,event_deleted,area,start_date,end_date1,updatedstarttime,updated_end_time)
                    .then((res) => { 
                      this.setState({   
                        loading : false     
                      }) 
                      if(res.status)
                        {
                          createNotification('Created','success','filled')
                          this.setState({
                            mail_date:'',
                            stturn_code:'',
                            event_updated:'',
                            event_deleted:'',
                            start_date:new Date(),
                            end_date:'',
                            no_of_checks:'',
                            no_of_query:'',
                            user_id:'',
                            purple_category:'',
                            is_search:false,
                            is_submit :false,
                            area:'',
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
    onChangetime(date)
    {
      this.setState({mail_date  : date})
     
    }
    claerValue()
    {
        this.setState({
            mail_date:'',
            stturn_code:'',
            event_updated:'',
            event_deleted:'',
            start_date:new Date(),
            end_date:'',
            no_of_checks:'',
            no_of_query:'',
            user_id:'',
            purple_category:'',
            is_search:false,
            is_submit :false,
            area:'',
        })
    }

    render()
    {
        const {match,locale,languageData,username} = this.props
        const {loading,mail_date,stturn_code,event_updated,purple_category,no_of_checks,
            no_of_query,event_deleted,user_id,start_date,end_date,stturnsdata,is_search,is_submit} = this.state
        return (
            <>
            <title>{ onChangeLanguage(locale,'Street Turns',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={ onChangeLanguage(locale,'Street Turns',languageData)} match={match} />
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
                    <div className = "row" >
                       <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Start Date',languageData)}
                            <br></br> 
                            {moment(start_date).format('MM/DD/YYYY hh:mm:ss a') }</Label>
                           
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'End Date',languageData)} <br></br>{end_date}</Label>
                            
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'User ID',languageData)}
                            <br></br>{is_search === true ? user_id:username}
                            </Label>
                           
                        </div>
                      
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Mail Date Time',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                                <p1 className = 'fontstyle mandatory-label'>{is_submit === true && mail_date === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                                <DatePicker
                                    selected={mail_date}
                                    className = "text-background"
                                    onChange={(date) => this.onChangetime(date)}
                                    />
                                    </div>

                        {/* <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Stturn Code',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && stturn_code === ''?  "error-border":"fontstyle text-background" }  
                            placeholder = ''
                            value = {stturn_code}  
                            onChange= {(e)=>this.setState({stturn_code : e.target.value})} 
                            />
                        </div> */}

                      <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Stturn Code',languageData)}</Label>
                            <Select  className = "text-background"
                             style={{height:'85px'}}
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={stturnsdata.filter(option =>option.value === stturn_code)}
                            options={stturnsdata}
                            onChange= {(option)=>this.setState({stturn_code : option.value})} 
                            />
                        </div>

                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Event Updated',languageData)}</Label>
                            <Input className = "text-background"
                               value = {event_updated}  
                                onChange= {(e)=>this.setState({event_updated : e.target.value})} ></Input>
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'Event Deleted',languageData)}</Label>
                            <Input className = "text-background"
                                value = {event_deleted}  
                                onChange= {(e)=>this.setState({event_deleted : e.target.value})} ></Input>
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'No. of Checks',languageData)}</Label>
                            <Input className = "text-background"
                               type = "number" min="0"  step='1'
                               placeholder = ''
                               onKeyDown={this.handleKeypress}
                               value = {no_of_checks}  
                                onChange= {(e)=>this.setState({no_of_checks : e.target.value})} ></Input>
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'No. of Query',languageData)}</Label>
                            <Input  className = "text-background"
                               type = "number" min="0"  step='1'
                               placeholder = ''
                               onKeyDown={this.handleKeypress}
                               value = {no_of_query}  
                                onChange= {(e)=>this.setState({no_of_query : e.target.value})} ></Input>
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{ onChangeLanguage(locale,'NE Purple Category',languageData)}</Label>
                            <Input className = "text-background"  
                                value = {purple_category}  
                                onChange= {(e)=>this.setState({purple_category : e.target.value})} ></Input>
                        </div>
                        
                       
                        
                        
                    </div>
                    <div className = "row text-center ">                      
                          <Button className = "button-width" color="secondary"  
                                onClick={()=>this.fetchstreetturns()}
                                >{ onChangeLanguage(locale,'Find',languageData)}</Button>                        
                          <Button className = "button-width" color="primary"  
                                onClick={()=>this.onSubmit()}
                                >{ onChangeLanguage(locale,'Save',languageData)} </Button>                       
                             <Button className = "button-width" color="secondary" 
                                    onClick={()=>this.claerValue()}
                           >{ onChangeLanguage(locale,'Refresh',languageData)}</Button>                       
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

