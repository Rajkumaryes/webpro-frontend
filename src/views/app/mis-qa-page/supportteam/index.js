import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
// import { Checkbox, Popconfirm ,Tooltip } from 'antd';
import Select from 'react-select';
import DatePicker from "../../datePicker";
import "react-datepicker/dist/react-datepicker.css";
import { createNotification } from '../../../../toast';
import{MisQscService} from '../../../../redux/MIS/misqsc/saga'
import {onChangeLanguage,getValue,convertLocalToUTCDate} from '../../../../helper'
import Loading from "react-fullscreen-loading";
import moment from 'moment';
import{misqscmasterService} from '../../../../redux/projectmasters/misqscmaster/saga'
import{miscategoryService} from '../../../../redux/projectmasters/miscategory/saga'
import{misreportforService} from '../../../../redux/projectmasters/misreportfor/saga'
class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        userid:'',
        misqsc:'',
        time_taken:'',
        category:'',
        reportfor:'',
        reportfordata:[],
        misqscdata:[],
        categorydata:[],
        timetakendata:[],
        loading:false,
        is_submit:false,
        start_time:new Date(),
        updated_start_time:new Date(),
      };
    }
    componentDidMount() {
       
      this.setState({
          date:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
      })
    this.fetchmisqsc()
   this.fetchcatagory()
   this.fetchreportfor()

  }
  fetchmisqsc() {
    this.setState({loading:true})
    misqscmasterService.fetchmisqscmaster()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.reportname ,value : cusmaidid.id.toString(),timetaken:cusmaidid.timetaken};
               });  
                this.setState({
                misqscdata :  regionlist,
                timetakendata:res.data
                })
               
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})
 }  
 
 fetchcatagory() {
  this.setState({loading:true})
  miscategoryService.fetchmiscategory()
  .then((res) => {
     if(res.status)   { 
        let filterstatus = (res.data).filter(item => item.status === 1)
           var regionlist = filterstatus.map(function(cusmaidid) {
                return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
             });  
              this.setState({
              categorydata :  regionlist
              })
             
           }
           else{
           this.setState({loading:false})}
           })
           .catch((error) => { }); 
           this.setState({loading:false})
}  
fetchreportfor() {
    this.setState({loading:true})
    misreportforService.fetchmisreportfor()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                reportfordata :  regionlist
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})
  }  
clearvalue()
     {
       
         this.setState({
            date:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
            userid:'',
            misqsc:'',
            time_taken:'',
            category:'',
            reportfor:'',
            is_submit:false,
           
         })
     } 
   
    handlemisqsc = (selectedOptions) => {
       
        const {timetakendata,misqscdata,misqsc}=this.state
        let value =selectedOptions.value
        this.setState({
          misqsc : selectedOptions.value,
          time_taken:getValue(misqscdata,'value','timetaken',value.toString()),
        })
        console.log('mmm',value.toString())
    } 
   
    handlereportfor = (selectedOptions) => {
        this.setState({reportfor : selectedOptions.value})  
    } 
    handlecategory = (selectedOptions) => {
        this.setState({category : selectedOptions.value})  
    } 
    onSubmit() { 
        const {date,userid,misqsc,time_taken,category,reportfor,start_time,updated_start_time} = this.state;
            if(misqsc !=='' &&time_taken !=='' && category !=='' && reportfor !=='' )
            { 
              const {username} = this.props
              this.setState({
                userid:username
              })
              let end_date=convertLocalToUTCDate(new Date()),
              updatedstart_time=convertLocalToUTCDate(start_time),
              start_date=convertLocalToUTCDate(start_time),
              updated_end_time=convertLocalToUTCDate(new Date())
            this.createAPI(date,username,misqsc,time_taken,category,reportfor,start_date,end_date,updatedstart_time,updated_end_time)
            }
            else
            {
              this.setState({
                is_submit:true
            })
            createNotification('Please fill mandatory field','error','filled')
            }
      }
      createAPI(date,userid,misqsc,time_taken,category,reportfor,start_time,end_date,updated_start_time,updated_end_time)
        {
            this.setState({
            loading : true
            })
            MisQscService.createmisqsc(date,userid,misqsc,time_taken,category,reportfor,start_time,end_date,updated_start_time,updated_end_time)
          .then((res) => { 
            this.setState({   
              loading : false     
            }) 
            if(res.status)
              {
                createNotification('Created','success','filled')
                this.setState({
                  date:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
                  userid:'',
                  misqsc:'',
                  time_taken:'',
                  category:'',
                  reportfor:'',
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
    onChangetime(date)
  {
    console.log("lhnkjh " ,date)
    var time = moment(date).format('HH:mm:ss')
    if(time !== "00:00:00")
    {
      this.setState({
        mailrecevieddate  : date,
        
      })
      console.log("lhnkjh " ,date)
    }
   
  } 
  onChangeannouncement(date)
  {
    console.log("lhnkjh " ,date)
    var time = moment(date).format('HH:mm:ss')
    if(time !== "00:00:00")
    {
      this.setState({
        announcement  : date,
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
    render()
    {
        const {match,languageData,locale,username} = this.props
        const {shipment,time_taken,reportfor,area,category,date,reportfordata,categorydata,misqsc,misqscdata,loading,is_submit} = this.state
        return (
            <>
            <title>{onChangeLanguage(locale,'MIS QSC',languageData)}</title>
            {loading && 
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'MIS QSC',languageData)} match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row" style = {{padding:'10px'}}>
                    <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Date',languageData)}
                            <br></br>{date}</Label>
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'User ID',languageData)}
                            <br></br>{username}</Label>
                            
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Category',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                             style={{height:'85px'}}
                             className = {is_submit === true && category === ''?  "error-border-select-paste":"react-select fontstyle" } 
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={categorydata.filter(option =>option.value === category)}
                            options={categorydata}
                            onChange={this.handlecategory}
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'MIS/QSC Tasks',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select 
                            className = {is_submit === true && misqsc === ''?  "error-border-select-paste":"react-select fontstyle" }  
                             style={{height:'85px'}}
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={misqscdata.filter(option =>option.value === misqsc)}
                            options={misqscdata}
                            onChange={this.handlemisqsc}
                            />
                        </div>
                        
                      {category ==="1" &&  <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Time Taken',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && time_taken === ''?  "error-border":"fontstyle text-background" }   
                            placeholder = ''
                            value = {time_taken}  
                            disabled
                            onChange= {(e)=>this.setState({time_taken : e.target.value})} 
                            />
                        </div>}
                        {category ==="2" &&  <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Time Taken',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && time_taken === ''?  "error-border":"fontstyle text-background" }   
                            placeholder = ''
                            type="number"
                            min="0"  step='1'
                            onKeyDown={this.handleKeypress}
                            value = {time_taken}
                            onChange= {(e)=>this.setState({time_taken : e.target.value})} 
                            />
                        </div>}
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Report For',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                             style={{height:'85px'}}
                             className = {is_submit === true && reportfor === ''?  "error-border-select-paste":"react-select fontstyle" } 
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={reportfordata.filter(option =>option.value === reportfor)}
                            options={reportfordata}
                            onChange={this.handlereportfor}
                            />
                        </div>
                    </div>
                    <div className = "row text-center" style = {{margin:'0px 5px'}}>
                          <Button className = "button-width" color="primary"  
                                 onClick={()=>this.onSubmit()}
                                >{onChangeLanguage(locale,'Save',languageData)} </Button> 
                             <Button className = "button-width" color="secondary" 
                                    onClick={()=>this.clearvalue()}
                           >{onChangeLanguage(locale,'Refresh',languageData)}</Button>
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

