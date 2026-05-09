import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import { createNotification } from '../../../../toast';
import{siremainderService} from '../../../../redux/Export/siremainders/saga'
import {onChangeLanguage,getValue,convertLocalToUTCDate,convertUTCToLocalDate} from '../../../../helper'
import Loading from "react-fullscreen-loading";
import{regionexportService} from '../../../../redux/Export/masters/exportregion/saga'
import Workbook from 'react-excel-workbook'
import moment from 'moment';

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data:[],
        loading:false,
        user_id:'',
        regions:'',
        indexing:'',
        reminders:'',  
        start_time: new Date(),
        updated_start_time:new Date(),
        end_time:'',
        regiondata:[],
        is_submit:false,
        indexingdata:[
          {label:'Reminders',value:'Reminders'},
          {label:' E-mail',value:' E-mail'},
        ],
        siremindercount:'',
        siremindercountlast:'',
      };
    }
    componentDidMount() {
  
     this.fetchregion()
     this.fetchSireminderCount()
  }
  fetchSireminderCount(){
    this.setState({loading:true})
    const {username} = this.props
    console.log(username)
    siremainderService.fetchsiremindercount(username)
    .then((res) => {
       if(res.status)   { 
              let filterstatus = res.data;
              let lastdata = res.lastcount;
              this.setState({ 
                siremindercount:filterstatus, 
                siremindercountlast:lastdata     
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
    regionexportService.fetchregion()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.region_code ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                regiondata :  regionlist,
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})
 }  
    handleindexing = (selectedOptions) => {
      this.setState({  indexing : selectedOptions.value})  
    } 
    handleremainemail = (selectedOptions) => {
      this.setState({  reminders : selectedOptions.value})  
    }  
    onPaste() 
    {
        navigator.clipboard.readText().then((text)=>{          
        })
    }
    onCopy()
    {
        navigator.clipboard.writeText(this.state.regions)
    }
    handleregion = (selectedOptions) => {
        this.setState({regions : selectedOptions.value})  
    } 
    onSubmit() { 
      const {regions,indexing,reminders,start_time,updated_start_time} = this.state;
      
      if(regions !=='' && indexing !=='' && reminders !=='' )
      { 
        const end_time = new Date() ,updated_end_time = new Date()

        const {username} = this.props
        this.setState({
          end_time:end_time
        })    
      this.createAPI(regions,indexing,reminders,username,
        convertLocalToUTCDate(start_time),
        convertLocalToUTCDate( end_time),
        convertLocalToUTCDate( updated_start_time),
        convertLocalToUTCDate(updated_end_time))
      }
      else
      {
        this.setState({
          is_submit:true
        })
        createNotification('Please fill mandatory field','error','filled')
      }
    }
    createAPI(regions,indexing,reminders,user_id,start_time,end_time,updated_start_time,updated_end_time,time_taken)
    {
      siremainderService.createsiremainder(regions,indexing,reminders,user_id,start_time,end_time,updated_start_time,updated_end_time,time_taken)
        .then((res) => { 
          if(res.status)
            {
              createNotification('Created','success','filled')
              this.clearvalue()
              this.fetchSireminderCount()
            }   
            else
              {
                createNotification(res.message,'error','filled');
              }           
      
      })
      .catch((error) => { 
      });
       
    }
    renderTemplate()
    {
      const {languageData,locale} = this.props
      const {data,regiondata} = this.state
      var array = data.map(record=> {
            return {
              'user_id' : record.user_id,
              'regions' : getValue(regiondata,'value','label',record.regions),
              'indexing' : record.indexing,
              'reminders' : record.reminders,
              'start_time' : record.start_time,
              'end_time':record.end_time,
          };
        })
        return(
          
          <Workbook filename="Si_remainder.xlsx" element={
            <Button className = "button-width" color="secondary"  style={{width:'150px'}}
            >{ onChangeLanguage(locale,'Download',languageData)}  
            </Button>
            }>
            <Workbook.Sheet data={array} name="Sheet A">
            <Workbook.Column label="User Id" value="user_id"/>
            <Workbook.Column label="Regions" value="regions"/>
              <Workbook.Column label="Indexing" value="indexing"/>
              <Workbook.Column label="Remainders" value="reminders"/>
              <Workbook.Column label="Start Date" value="start_time"/>
              <Workbook.Column label="End Date" value="end_time"/>
            </Workbook.Sheet> 
          </Workbook>
       
  
        );
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
    clearvalue()
      {
      
        this.setState({
          regions:'',
          indexing:'',
          reminders:'',
          start_time: new Date(),
          updated_start_time:new Date(),
          end_time:'',    
          is_submit:false
        })
} 
    render()
    {
      const {match,languageData,locale,username} = this.props
      const {loading,regions,indexing,reminders,user_id,start_time,end_time,regiondata,indexingdata,remainandemaildata,is_submit,siremindercount,siremindercountlast} = this.state
        return (
            <>
            <title>{onChangeLanguage(locale,'SI Remainder',languageData)}</title>
            {loading && 
            <div>
              <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
            </div>
          }
            <Row>
              <Colxx xxs="12">
              <div className = "row">
              <div className = "col-md-8">
                <Breadcrumb heading="SI Reminder" match={match} />
              </div>
              <div className = "col-md-2" >
                        <h2 style = {{marginTop:'15px'}}>Total EQ : {siremindercount}</h2>
                        </div>
                        <div className = "col-md-2">
                            <h2  style = {{marginTop:'15px'}}>Last EQ : {siremindercountlast}</h2>
                        </div>
              {/* <div className = "col-md-2" >
                    {this.renderTemplate()}
              </div> */}
               </div>
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'15px'}}>
                <div className = "publish-title" >
                        <Row>
                            <Colxx xxs="4">
                                <Label  className = "fontstyle" 
                                style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'SI Reminder',languageData)}</Label>
                            </Colxx>
                        </Row>
                    </div>
                    <div className = "row" style = {{padding:'10px'}}>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'User ID',languageData)}
                            <br></br>{username}</Label>
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Start Date',languageData)}
                            <br></br>{moment(start_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                            
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'End Date',languageData)}
                            <br></br>{end_time !== '' && moment(end_time).format('MM/DD/YYYY hh:mm:ss a')} </Label>
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Regions',languageData)}</Label>
                            <a style = {{color :'red'}}>*</a>
                            <Select  
                             style={{height:'85px'}}
                             className = {is_submit === true && regions === ''?  "error-border-select-paste":"react-select fontstyle" }  
                           
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={regiondata.filter(option =>option.value === regions)}
                            options={regiondata}
                            onChange={({value}) => this.setState({  regions: value })}
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Indexing',languageData)}</Label>
                            <a style = {{color :'red'}}>*</a>
                              <Select  
                                        className = {is_submit === true && indexing === ''?  "error-border-select-paste":"react-select fontstyle" } 
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={indexingdata.filter(option =>option.value === indexing)}
                                        options={indexingdata}
                                        onChange={this.handleindexing}
                                    />
                                    </div>
                                    <div className = "col-md-4 space-margin">
                                    <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'Reminders / E-mail',languageData)}</Label>
                                    <a style = {{color :'red'}}>*</a>
                                    <Input 
                                     className = {is_submit === true && reminders === ''?  "error-border":"fontstyle text-background" }  
                                     type = "number" min="0"  step='1'
                                     placeholder = ''
                                     onKeyDown={this.handleKeypress}
                                     value = {reminders}  
                                     onChange= {(e)=>this.setState({reminders : e.target.value})} 
                                    /> 
                        </div>
                      
                    </div>
                    <div className = "row text-center" >                     
                          <Button className = "button-width" color="primary"    
                                onClick={()=>this.onSubmit()}
                                > {onChangeLanguage(locale,'Save',languageData)}</Button>                         
                        <Button className = "button-width"                          
                          color="secondary"  
                          onClick={()=>this.clearvalue()}>
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

