import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import Select from 'react-select';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import moment from 'moment';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import {onChangeLanguage,getCurrentWeek,getstarttimeendtimeDifferencebew} from '../../../../helper'
import{categoryService} from '../../../../redux/qa/category/saga'
import{forService} from '../../../../redux/qa/non-productivity-for/saga'
import{productivityService} from '../../../../redux/qa/non-productivity/saga'

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        endtime:'',
        starttime:'',
        week:'',
        totaltime:'',
        catagory:'',
        catagorydata:[],
        supervisor:'',
        nonproductive_description:'',
        fors:'',
        date:'',
        for_data:[],
        supervisor_data:[
            {value:'Approved',label:'Approved'},
            {value:'Rejected',label:'Rejected'},
        ],
        is_submit:false,
      };
    }
    componentDidMount()
    {
        this.setState({
            date : moment(new Date()).format('MM/DD/YYYY'),
            week:getCurrentWeek(new Date()).toString(),
        })
        this.fetchData()
        this.fetchforData()
    }
    fetchData() {  
        this.setState({
          loading : true
        })
        categoryService.fetchapi()
          .then((res) => { 
            this.setState({   
          loading : false 
                  
            }) 
            if(res.status)
              {
                    let filterstatus = (res.data).filter(item => item.status === 1)
                    var list = filterstatus.map(function(areaaval) {
                        return  {label : areaaval.name ,value : (areaaval.id).toString()};
                    });  
                    this.setState({
                        catagorydata :  list,
                    })
              }  
        })
        .catch((error) => { 
          this.setState({
            loading : false
          })
          });   
     }
     fetchforData() {  
        this.setState({
          loading : true
        })
        forService.fetchapi()
          .then((res) => { 
            this.setState({   
          loading : false 
                  
            }) 
            if(res.status)
              {
                    let filterstatus = (res.data).filter(item => item.status === 1)
                    var list = filterstatus.map(function(areaaval) {
                        return  {label : areaaval.name ,value : (areaaval.id).toString()};
                    });  
                    this.setState({
                        for_data :  list,
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
   
    handlechangeatypeofaudit = (selectedOptions) => {
        this.setState({catagory : selectedOptions.value})  
    } 
    onSubmit()
    {
        const {fors,date, week,starttime,endtime,
            supervisor,nonproductive_description,catagory} = this.state
        if(fors !== "" && supervisor !== "" && nonproductive_description !== "" && catagory !== ""
        && starttime !== "" && endtime !== "")
        {
            let startdate = moment(starttime, "HH:mm"),
            enddate =  moment(endtime, "HH:mm") ,
            totaltime=getstarttimeendtimeDifferencebew(moment.duration(enddate.diff(startdate)))
            this.setState({endtime:endtime, totaltime:totaltime })
            const {username} = this.props
            this.setState({
              loading : true
            })
            productivityService.createapi(username,fors,date, week,starttime,endtime,totaltime,
                supervisor,nonproductive_description,catagory)
              .then((res) => { 
                this.setState({   
                  loading : false     
                }) 
                if(res.status)
                  {
                    createNotification('Created','success','filled')
                    this.close(true)
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
            endtime:'',
            date : moment(new Date()).format('MM/DD/YYYY'),
            week:getCurrentWeek(new Date()).toString(),
            totaltime:'',
            catagory:'',
            supervisor:'',
            nonproductive_description:'',
            fors:'',
            is_submit:false,
        })
    }
    render()
    {
        const {match,locale,languageData,username} = this.props
        const {fors,date, week,starttime,endtime,totaltime,loading,
            supervisor,nonproductive_description,catagory,catagorydata,for_data,supervisor_data,is_submit} = this.state
        return (
            <>
             <title>{ onChangeLanguage(locale,'Non-Productive',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={ onChangeLanguage(locale,'Non-Productive',languageData)} match={match} />
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
                    <div className = "row" style = {{marginBottom:'10px'}}>
                      <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'User ID',languageData)}
                            <br></br>{username}</Label>
                           
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Date',languageData)}
                            <br></br>{date}</Label>
                            
                        </div>
                        <div className = "col-md-3  space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Week',languageData)}
                            <br></br>{week}</Label>
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Start Time',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && starttime === ''?  "error-border":"fontstyle text-background" }    
                            data-date-format='hh:mm:ss a'
                            type="time"  
                            value = {starttime}  
                            onChange= {(e)=>this.setState({starttime : e.target.value})} 
                            />
                           
                        </div>
                         <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'End Time',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && endtime === ''?  "error-border":"fontstyle text-background" }    
                            data-date-format='hh:mm:ss a'
                            type="time"  
                            // placeholder = 'End date'
                            value = {endtime}  
                            onChange= {(e)=>this.setState({endtime : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Total Time',languageData)}
                            <br></br>{totaltime}</Label>
                        </div>
                        <div className = "col-md-3  space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Non-Productive Task Description',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && nonproductive_description === ''?  "error-border":"fontstyle text-background" }
                            value = {nonproductive_description}  
                            onChange= {(e)=>this.setState({nonproductive_description : e.target.value})} 
                            />
                        </div>
                       
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'For',languageData)}<a style = {{color :'red'}}>*</a></Label>
                             <Select   className={is_submit === true && fors === ''?  "error-border-select":"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={for_data.filter(option =>option.value === fors)}
                            options={for_data}
                            onChange={(option)=>this.setState({fors:option.value})}
                            />
                        </div>
                        
                        <div className = "col-md-3  space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Category',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select   className={is_submit === true && catagory === ''?  "error-border-select":"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={catagorydata.filter(option =>option.value === catagory)}
                            options={catagorydata}
                            onChange={(option)=>this.setState({catagory:option.value})}
                            />
                        </div>
                   
                        <div className = "col-md-3  space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Supervisor Approval',languageData)}<a style = {{color :'red'}}>*</a></Label>
                             <Select   className={is_submit === true && supervisor === ''?  "error-border-select":"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={supervisor_data.filter(option =>option.value === supervisor)}
                            options={supervisor_data}
                            onChange={(option)=>this.setState({supervisor:option.value})}
                            />
                        </div>
                    </div>
                    <div className = "row" style = {{marginBottom:'10px'}}>
                       <div className = "col-md-4"></div>
                        {/* <div className = "col-md-2">
                          <Button className = "button-width" color="secondary"  style={{width:'150px'}}
                                onClick={()=>this.onPaste()}
                                >{onChangeLanguage(locale,'Paste D1040',languageData)}</Button> 
                         </div> */}
                         <div className = "col-md-2">
                          <Button className = "button-width" color="primary"  style={{width:'150px'}}
                                onClick={()=>this.onSubmit()}
                                >{onChangeLanguage(locale,'Save',languageData)} </Button> 
                         </div>
                         <div className = "col-md-2">
                             <Button className = "button-width" color="secondary" style={{width:'150px'}} 
                                    onClick={()=>this.clearValue()}
                           >{onChangeLanguage(locale,'Refresh',languageData)}</Button>
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

