import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import { createNotification } from '../../../../toast';
import moment from 'moment';
import {onChangeLanguage,getCurrentWeek,getTimeDifference,convertLocalToUTCDate} from '../../../../helper'
import{dndareaService} from '../../../../redux/dnd/dndarea/saga'
import{subareaService} from '../../../../redux/dnd/dndsubarea/saga'
import{radmService} from '../../../../redux/dnd/radm/saga'
import DatePicker from "../../datePicker";


class Sidebar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        region:'',
        subareas:'',
        date:'',
        week:'',
        month:'',
        imports_export:'',
        total:'',
        start_datetime:'',
        end_datetime:'',
        tat:'',
        filename:'',
        trigger:'',
        re_export:'',
        re_use:'',
        triggers:'',
        re_exports:'',
        re_uses:'',
        blocked_byra:'',
        completed:'',
        missing_cases:'',
        wrong_seq:'',
        duplications:'',
        others:'',
        triggered:'',
        queries:'',
        user:'',
        amount_usd:'',
        start_time:new Date(),
        updated_start_time: new Date(),
        end_time:'',
        data:[],
        inportexport_data:[
            {label:'Export',value:'Export'},
            {label:'Import',value:' Import'},
        ],
        subareadata:[],
        regiondata:[],
        radmcount:'',
        radmcountlast:'',
      };
    }
    handlesubarea = (selectedOptions) => {
        this.setState({subareas : selectedOptions.value})  
      }
      handleimexpo= (selectedOptions) => {
        this.setState({imports_export : selectedOptions.value})  
      }
      handleregion= (selectedOptions) => {
        this.setState({region : selectedOptions.value})  
      }
      onChangeFileUpload(files)
      {

      }
      
      componentDidMount() {
       
        this.setState({
            date:moment(new Date()).format('MM/DD/YYYY'),
            week:getCurrentWeek(new Date()).toString(),
            month:new Date().getMonth() + 1,
            // start_datetime:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
        })
      this.fetchregion()
      this.fetchsubarea()
      this.fetchData()
      this.fetchRadmCount()
    }
        fetchRadmCount(){
          this.setState({loading:true})
          const {username} = this.props
          radmService.fetchradmcount(username)
          .then((res) => {
             if(res.status)   { 
                    let filterstatus = res.data;
                    let lastdata = res.lastcount;
                    this.setState({ 
                        radmcount:filterstatus, 
                    radmcountlast:lastdata     
                    }) 
                   }
                   else{
                   this.setState({loading:false})}
                   })
                   .catch((error) => { }); 
                   this.setState({loading:false})

    }
    fetchData() {
        this.setState({loading:true})
        radmService.fetchradm()
        .then((res) => {
           if(res.status)   { 
                    this.setState({
                    data :  res.data,
                    loading:false
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({
                  loading : false
                })
      } 

    fetchregion() {
        this.setState({loading:true})
        dndareaService.fetcharea()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var arealist = filterstatus.map(function(response) {
                      return  {label : response.name ,value : response.id.toString()};
                   });  
                    this.setState({
                    regiondata :  arealist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  

     
    fetchsubarea() {
        this.setState({loading:true})
        subareaService.fetchsubarea()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var arealist = filterstatus.map(function(response) {
                      return  {label : response.name ,value : response.id.toString()};
                   });  
                    this.setState({
                        subareadata :  arealist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  


    onSubmit() { 
        const {user,region,subareas, date,week, month,imports_export,total,start_datetime,end_datetime,tat,filename,
            trigger,re_export,re_use,triggers,re_exports,re_uses,blocked_byra,completed,missing_cases,wrong_seq,duplications,others,triggered,
            queries,amount_usd,start_time,updated_start_time} = this.state;
console.log(this.setState.value,'ssss')
        let  end_time =  moment(new Date()).format('MM/DD/YYYY hh:mm:ss a') ,
            time_taken = getTimeDifference(start_time,new Date())
        if(region!==''&&start_datetime!==''&&subareas!==''&& imports_export !==''&&total!==''&&filename!==''&&
        amount_usd!=='' && trigger!=='' &&re_export !=='' && re_use !=='' && triggers !==''
		&& re_exports !=='' && re_uses!=='' &&blocked_byra!=='' &&completed !=='' &&missing_cases!==''
	&&wrong_seq!=='' && duplications !=='' && others!=='' && triggered !=='' && queries !=='' )
        {
            // const end_time = new Date(), updated_end_time= new Date()
            let end_date=convertLocalToUTCDate(new Date()),
            start_date=convertLocalToUTCDate(start_time),
            updatedstarttime=convertLocalToUTCDate(updated_start_time),
             updated_end_time=convertLocalToUTCDate(new Date())
            const {username } = this.props
           
            this.setState({
              loading : true,
              end_time:end_time,
              tat:time_taken
            })
            radmService.createradm( username,region,subareas, date,week, month.toString(),imports_export,total,start_datetime,end_time,time_taken,filename,
                trigger,re_export,re_use,triggers,re_exports,re_uses,blocked_byra,completed,missing_cases,wrong_seq,duplications,others,triggered,
                queries,amount_usd,start_date,end_date,updatedstarttime,updated_end_time)
              .then((res) => { 
                this.setState({   
                  loading : false     
                }) 
                if(res.status)
                  {
                    createNotification('Created','success','filled')
                    this.fetchData()
                    this.fetchRadmCount()
                    this.setState({
                        // date:moment(new Date()).format('MM/DD/YYYY'),
                        // week:getCurrentWeek(new Date()).toString(),
                        // month:new Date().getMonth() + 1,
                        // start_datetime:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
                        start_datetime:'',
                        region:'',
                        subareas:'',
                        imports_export:'',
                        total:'',
                        end_datetime:'',
                        end_time:'',
                        tat:'',
                        filename:'',
                        trigger:'',
                        re_export:'',
                        re_use:'',
                        triggers:'',
                        re_exports:'',
                        re_uses:'',
                        blocked_byra:'',
                        completed:'',
                        missing_cases:'',
                        wrong_seq:'',
                        duplications:'',
                        others:'',
                        triggered:'',
                        queries:'',
                        user:'',
                        amount_usd:'',
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
        // date:moment(new Date()).format('MM/DD/YYYY'),
        // week:getCurrentWeek(new Date()).toString(),
        // month:new Date().getMonth() + 1,
        // start_datetime:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
        region:'',
        subareas:'',
        imports_export:'',
        total:'',
        end_datetime:'',
        end_time:'',
        tat:'',
        filename:'',
        trigger:'',
        re_export:'',
        re_use:'',
        triggers:'',
        re_exports:'',
        re_uses:'',
        blocked_byra:'',
        completed:'',
        missing_cases:'',
        wrong_seq:'',
        duplications:'',
        others:'',
        triggered:'',
        queries:'',
        user:'',
        amount_usd:'',
        is_submit:false,
    })
   
  }
  onChangetime(date)
  {
    this.setState({start_datetime  : date})
  }
    render()
    { 
        const{region,subareas, date,week, month,imports_export,total,start_datetime,filename,radmcount,radmcountlast,
        trigger,re_export,re_use,triggers,re_exports,re_uses,blocked_byra,completed,missing_cases,wrong_seq,duplications,others,triggered,
        queries,amount_usd,inportexport_data,subareadata,regiondata,is_submit,end_time}=this.state
        const {match,locale,languageData,username} = this.props
        return (
            <>
            <title>RADM </title>
            <Row>
              <Colxx xxs="12">
              <div className = "row">
                      <div className = "col-md-8">
                      <Breadcrumb heading= {onChangeLanguage(locale,'RADM',languageData)} match={match} />
                    </div>
                    {/* <div className = "col-md-2" >
                    {this.renderTemplate()}
                    </div> */}
                    <div className = "col-md-2">
                        <h2 style = {{marginTop:'15px'}}>Total EQ : {radmcount}</h2>
                    </div>
                    <div className = "col-md-2">
                        <h2  style = {{marginTop:'15px'}}>Last EQ : {radmcountlast}</h2>
                    </div>
                  </div>
               
                
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>

            <div className = "" style = {{padding:'0px 10px',borderRadius:'10px',marginBottom:'10px'}}>
                    <div className = "row" >
                    <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'User',languageData)}</a>
                            <br></br> {username}</Label>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Week',languageData)}</a>
                            <br></br>{week}</Label>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Month',languageData)}</a>
                            <br></br>{month}</Label>
                        </div>
                    <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Date',languageData)}</a>
                            {/* <br></br> {date}</Label> */}
                            <br></br> { moment(date).format('MM/DD/YYYY')}</Label>

                        </div>
                    
                        {/* <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Start Time',languageData)}</a><br></br>{start_datetime}</Label>
                        </div> */}
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'End Time',languageData)}</a>
                            <br></br>{end_time !== '' && moment(end_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>

                            {/* <br></br>{end_datetime}</Label> */}
                        </div>
                        {/* <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'TAT',languageData)}</a><br></br> 
                            {tat}</Label>
                        </div> */}
                    </div>
                </div> 
          


                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row" style = {{marginBottom:'6px'}}>

                              <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Start Date',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                    {is_submit === true && start_datetime=== '' &&   <p className = 'fontstyle mandatory-label'> {onChangeLanguage(locale,'Mandatory Field',languageData)} </p>}
                                    <DatePicker
                                    selected={start_datetime}
                                    className = "text-background"
                                    onChange={(date) => this.onChangetime(date)}
                                    />
                                   
                                </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Region',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select  
                                       className={is_submit === true && region === ''?  "error-border-select":"react-select fontstyle" }
                                       classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={regiondata.filter(option =>option.value === region)}
                                        options={regiondata}
                                        onChange={this.handleregion}
                                    />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Sub Areas',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            
                                       <Select  
                                       className={is_submit === true && subareas === ''?  "error-border-select":"react-select fontstyle" }
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={subareadata.filter(option =>option.value === subareas)}
                                        options={subareadata}
                                        onChange={this.handlesubarea}
                                    />
                                    </div>
                        
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Import/Export',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select  
                                       className={is_submit === true && imports_export === ''?  "error-border-select":"react-select fontstyle" }
                                       classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={inportexport_data.filter(option =>option.value === imports_export)}
                                        options={inportexport_data}
                                        onChange={this.handleimexpo}
                                    />
                        </div>
                        
                                    <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Total to be Checked',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input   type="number" min="0"
                            className = {is_submit === true && total === ''?  "error-border":"fontstyle text-background" }
                                value = {total}  
                                onChange= {(e)=>this.setState({total : e.target.value})} 
                                />
                        </div>
                        <div className = "col-md-12 space-margin">
                            <Label   >{onChangeLanguage(locale,'File Name',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <textarea 
                           className = {is_submit === true && filename === ''?  "border-textarea-background":"fontstyle textarea-background" } 
                           placeholder = ''
                                value = {filename}  
                               
                                onChange= {(e)=>this.setState({filename : e.target.value})}
                                 /> 
                        </div>
                    </div>
           
           
                </div>   
            </div>
            <div>
            <div className = "row" style = {{marginBottom:'1px',paddingBottom:'20px'}}>
                    <div className = "col-md-12">
                    <div className = "publishuser-card-component" style = {{borderRadius:'10px'}}>
                            <div className = "publish-title" >
                                <Row>
                                    <Colxx xxs="4">
                                        <Label  className = "fontstyle" 
                                        style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'Rates Found',languageData)}</Label>
                                    </Colxx>
                                </Row>
                            </div>
                            <div className = "row" style = {{padding:'10px'}}>
                            
                            <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Trigger',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input   type="number" min="0"
                           className = {is_submit === true && trigger === ''?  "error-border":"fontstyle text-background" }

                                value = {trigger}  
                                onChange= {(e)=>this.setState({trigger : e.target.value})} 
                                />
                        </div>
                            
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Re Export',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input   type="number" min="0"
                            className = {is_submit === true && re_export === ''?  "error-border":"fontstyle text-background" }
                                value = {re_export}  
                                onChange= {(e)=>this.setState({re_export : e.target.value})} 
                                />
                        </div>
                           
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Re Use',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input   
                            className = {is_submit === true && re_use === ''?  "error-border":"fontstyle text-background" }
                                value = {re_use}  
                                onChange= {(e)=>this.setState({re_use : e.target.value})} 
                                />
                        </div>
                            </div>
                    </div>
                    
                    </div>
                  
                </div>
                
                <div className = "row" style = {{marginBottom:'1px',paddingBottom:'20px'}}>
                    <div className = "col-md-12">
                    <div className = "publishuser-card-component" style = {{borderRadius:'10px'}}>
                            <div className = "publish-title" >
                                <Row>
                                    <Colxx xxs="4">
                                        <Label  className = "fontstyle" 
                                        style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'Zero Rates',languageData)}</Label>
                                    </Colxx>
                                </Row>
                            </div>
                            <div className = "row" style = {{padding:'10px'}}>
                            
                            <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Trigger',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input   type="number" min="0"
                            className = {is_submit === true && triggers === ''?  "error-border":"fontstyle text-background" }
                                value = {triggers}  
                                onChange= {(e)=>this.setState({triggers : e.target.value})} 
                                />
                        </div>
                            
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Re Export',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input   type="number" min="0"
                            className = {is_submit === true && re_exports === ''?  "error-border":"fontstyle text-background" }
                                value = {re_exports}  
                                onChange= {(e)=>this.setState({re_exports : e.target.value})} 
                                />
                        </div>
                           
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Re Use',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input   type="number" min="0"
                            className = {is_submit === true && re_uses === ''?  "error-border":"fontstyle text-background" }
                                value = {re_uses}  
                                onChange= {(e)=>this.setState({re_uses : e.target.value})} 
                                />
                        </div>
                            </div>
                    </div>
                    
                    </div>
                  
                </div>
             
                <div className = "row" style = {{marginBottom:'1px',paddingBottom:'20px'}}>
                    <div className = "col-md-12">
                    <div className = "publishuser-card-component" style = {{borderRadius:'10px'}}>
                            <div className = "publish-title" >
                                <Row>
                                    <Colxx xxs="4">
                                        <Label  className = "fontstyle" 
                                        style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'Successful Cases',languageData)}</Label>
                                    </Colxx>
                                </Row>
                            </div>
                            <div className = "row" style = {{padding:'10px'}}>
                            
                            <div className = "col-md-6 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Blocked by RA',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input   type="number" min="0"
                            className = {is_submit === true && blocked_byra === ''?  "error-border":"fontstyle text-background" }
                                value = {blocked_byra}  
                                onChange= {(e)=>this.setState({blocked_byra : e.target.value})} 
                                />
                        </div>
                            
                        <div className = "col-md-6 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Completed',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input   type="number" min="0"
                            className = {is_submit === true && completed === ''?  "error-border":"fontstyle text-background" }
                                value = {completed}  
                                onChange= {(e)=>this.setState({completed : e.target.value})} 
                                />
                        </div>
                           
                       
                            </div>
                    </div>
                    
                    </div>
                  
                </div>
             
                <div className = "row" style = {{marginBottom:'1px',paddingBottom:'20px'}}>
                    <div className = "col-md-12">
                    <div className = "publishuser-card-component" style = {{borderRadius:'10px'}}>
                            <div className = "publish-title" >
                                <Row>
                                    <Colxx xxs="4">
                                        <Label  className = "fontstyle" 
                                        style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'Checked by Area',languageData)}</Label>
                                    </Colxx>
                                </Row>
                            </div>
                            <div className = "row" style = {{padding:'10px'}}>
                            
                            <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Missing Cases',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input   type="number" min="0"
                            className = {is_submit === true && missing_cases === ''?  "error-border":"fontstyle text-background" }
                                value = {missing_cases}  
                                onChange= {(e)=>this.setState({missing_cases : e.target.value})} 
                                />
                        </div>
                            
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Wrong Sequence',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input   type="number" min="0"
                            className = {is_submit === true && wrong_seq === ''?  "error-border":"fontstyle text-background" }
                                value = {wrong_seq}  
                                onChange= {(e)=>this.setState({wrong_seq : e.target.value})} 
                                />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Duplications',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input   type="number" min="0"
                            className = {is_submit === true && duplications === ''?  "error-border":"fontstyle text-background" }
                                value = {duplications}  
                                onChange= {(e)=>this.setState({duplications : e.target.value})} 
                                />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Others',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input   type="number" min="0"
                            className = {is_submit === true && others === ''?  "error-border":"fontstyle text-background" }
                                value = {others}  
                                onChange= {(e)=>this.setState({others : e.target.value})} 
                                />
                        </div>
                           
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Tiggered But Color Not Changed',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input   type="number" min="0"
                            className = {is_submit === true && triggered === ''?  "error-border":"fontstyle text-background" }
                                value = {triggered}  
                                onChange= {(e)=>this.setState({triggered : e.target.value})} 
                                />
                        </div>
                            </div>
                    </div>
                    
                    </div>
                  
                </div>
              
                <div className = "row" style = {{marginBottom:'1px'}}>
                    <div className = "col-md-12">
                    <div className = "publishuser-card-component" style = {{borderRadius:'10px'}}>
                            
                            <div className = "row" style = {{padding:'10px'}}>
                            
                            <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Queries',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input   type="number" min="0"
                           className = {is_submit === true && queries === ''?  "error-border":"fontstyle text-background" }                          

                                value = {queries}  
                                onChange= {(e)=>this.setState({queries : e.target.value})} 
                                />
                        </div>
                            
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Amount in USD',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input   type="number" min="0"
                        className = {is_submit === true && amount_usd === ''?  "error-border":"fontstyle text-background" }                          

                                value = {amount_usd}  
                                 onChange= {(e)=>this.setState({amount_usd : e.target.value})} 
                                />
                        </div>
                       
                            </div>
                    </div>
                    
                    </div>
                  
                </div>
              
                <div className = "row text-center" style = {{margin:'0px 5px'}}>
                       <Button className = "button-width" color="primary" 
                       onClick={()=>this.onSubmit()}>
                       {onChangeLanguage(locale,'Save',languageData)} 
                       </Button>
                        <Button className = "button-width" color="secondary"  
                        onClick={()=>this.onrefresh()} >
                        {onChangeLanguage(locale,'Refresh',languageData)}
                        </Button>
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

   })(Sidebar)
  );

