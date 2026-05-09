import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import{NonproductivityService} from '../../../../redux/MIS/nonproductivity/saga'
import {onChangeLanguage,getCurrentWeek,getstarttimeminnn,permittedsupervisor,convertLocalToUTCDate} from '../../../../helper'
import { createNotification } from '../../../../toast';
import Loading from "react-fullscreen-loading";
import moment from 'moment';
import{miscategoryService} from '../../../../redux/projectmasters/miscategory/saga'
import{misforService} from '../../../../redux/projectmasters/misfor/saga'
import{missupervisorService} from '../../../../redux/projectmasters/missupervisor/saga'
import{roleService} from '../../../../redux/role/saga'


class Sidebar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        week:'',
        date:'',
        region:'',
        totaltime:'',
        endtime:'',
        username:'',
        supervisor:'',
        starttime:'',
        endtime:'',
        ford:'',
        category:'',
        type:'',
        taskdescription:'',
        fordata:[],
        categorydata:[
          {label:'MIS',value:'1'},
          {label:'QSC',value:'2'},
        ],
        supervisordata:[],
        is_submit:false,
        loading:false,
        isadmin:false,
        start_time:new Date(),
        updated_start_time:new Date(),
      };
    }
    componentDidMount() {
       
        this.setState({
            date:moment(new Date()).format('MM/DD/YYYY'),
            week:getCurrentWeek(new Date()).toString()
        })
       this.fetchfordata()
       this.fetchcatagory()
       this.fetchsupervisordata()
       this.fetchroleData()
    }
    fetchroleData() {  
      this.setState({
        loading : true
      })
      roleService.fetchroleData()
        .then((res) => { 
          this.setState({   
        loading : false 
                
          }) 
          if(res.status)
            {
              var role_id = localStorage.getItem("role_id")
              let is_admin =permittedsupervisor(res.data,role_id)
             this.setState({
                 isadmin:is_admin
             })
            }            
      
      })
      .catch((error) => { 
        this.setState({
          loading : false
        })
        });   
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
    fetchfordata() {
        this.setState({loading:true})
        misforService.fetchmisfor()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var regionlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                   });  
                    this.setState({
                    fordata :  regionlist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  
     fetchsupervisordata() {
        this.setState({loading:true})
        missupervisorService.fetchmissupervisor()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var typelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.id.toString(),unit:cusmaidid.unit};
                   });
                    this.setState({
                    supervisordata :  typelist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  
    handlecustomtype = (selectedOptions) => {
        this.setState({region : selectedOptions.value})  
      }  
      onSubmit() { 
        const {week,date,ford,category,endtime,supervisor,starttime,taskdescription,isadmin,
          start_time} = this.state;
          let startdate = moment(starttime, "HH:mm"),
             enddate =  moment(endtime, "HH:mm") ,
             time_taken=getstarttimeminnn(moment.duration(enddate.diff(startdate)))
        var is_fill = false
        if(isadmin === true)
        {
            if( supervisor!== "" &&  taskdescription !=='' && ford !=='' && category !==''&&
             starttime !== ""&&  endtime !== "")
            {
                is_fill = true
            }
        }
        else
        {
            if(supervisor!== "" &&  taskdescription !=='' && ford !=='' && category !=='')
            {
                is_fill = true
            }
        }
        if(is_fill === true)
        {
            const {username} = this.props
            this.setState({
              loading : true,
              totaltime:time_taken
            })
            let end_date=convertLocalToUTCDate(new Date()),
            updatedstart_time=convertLocalToUTCDate(start_time),
            start_date=convertLocalToUTCDate(start_time),
            updated_end_time=convertLocalToUTCDate(new Date())
            NonproductivityService.createnonproductivity(date,username,week,time_taken.toString(),supervisor,ford,category,starttime,endtime,taskdescription,
            start_date,end_date,updatedstart_time,updated_end_time)
              .then((res) => { 
                this.setState({   
                  loading : false     
                }) 
                if(res.status)
                  {
                    createNotification('Created','success','filled')
                    this.setState({
                      date:moment(new Date()).format('MM/DD/YYYY'),
                      week:getCurrentWeek(new Date()).toString(),
                      totaltime:'',
                      supervisor:'',
                      ford:'',
                      category:'',
                      starttime:'',
                      endtime:'',
                      taskdescription:''
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
    console.log("lhnkjh " ,date)
    var time = moment(date).format('HH:mm:ss')
    if(time !== "00:00:00")
    {
      this.setState({starttime  : date})
    }
   
  }
 
  onrefresh() {
    this.setState({
        date:moment(new Date()).format('MM/DD/YYYY'),
        week:getCurrentWeek(new Date()).toString(),
        totaltime:'',
        supervisor:'',
        ford:'',
        category:'',
        starttime:'',
        endtime:'',
        taskdescription:''
    })
   
  } 
  handleKeypress (e) {
    const {startdate}=this.state
    const characterCode = e.key
    if (characterCode === 'Backspace') return

    const characterNumber = Number(characterCode)
    if (characterNumber >= startdate && characterNumber <= 9) {
      if (e.currentTarget.value && e.currentTarget.value.length) {
        return
      } else if (characterNumber === startdate) {
        e.preventDefault()
      }
    } else {
      e.preventDefault()
    }
  }
  handleendtime = (e) => {
    const{starttime,endtime}=this.state
    let value =e.target.value
    if(starttime !==''){
    if(starttime <= value) {
      this.setState({endtime : e.target.value})  
    }else{
      createNotification('End Time Must be bigger then Start Time','error','filled')
    }
    }
    else{
      createNotification('First Choose the Start Time','error','filled')
    }
  }  
    render()
    { 
        const{category,supervisor,taskdescription,fordata,starttime,
        ford,endtime,totaltime,date,week,is_submit,categorydata,supervisordata,loading,isadmin}=this.state
        const {match,username,locale,languageData} = this.props
        return (
            <>
            <title>{onChangeLanguage(locale,'Non-Productive Hours',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'Non-Productive Hours',languageData)} match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            {loading && 
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
          }
            <div>
            <div className = "" style = {{padding:'0px 10px',borderRadius:'10px',marginBottom:'10px'}}>
                    <div className = "row" >
                    <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Date',languageData)}</a>
                            <br></br> {date}</Label>
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Week',languageData)}</a>
                            <br></br>{week}</Label>
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'User Name',languageData)}</a><br></br>{username}</Label>
                        </div>
                        {isadmin === true &&
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'TAT Time',languageData)}</a><br></br> 
                            {totaltime}</Label>
                        </div>
                        }
                    </div>
                </div> 
            <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>

                <div className = "row">
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'For',languageData)} <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && ford === ''?  "error-border-select-paste":"react-select fontstyle" }                          
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={fordata.filter(option =>option.value === ford)}
                            options={fordata}
                            onChange={({value}) => this.setState({  ford: value })}
                          />
                        </div>
                        <div className = "col-lg-2-0 space-margin ">
                            <Label  className = "fontstyle normal-font" > 
                            {onChangeLanguage(locale,'Category',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                                <Select  
                                className = {is_submit === true && category === ''?  "error-border-select-paste":"react-select fontstyle" }  
                                
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={categorydata.filter(option =>option.value === category)}
                                options={categorydata}
                                onChange={(option) => this.setState({  category: option.value })}
                             />
                        </div>
                        <div className = "col-lg-2-0 space-margin ">
                            <Label  className = "fontstyle normal-font" > 
                            {onChangeLanguage(locale,'Supervisor Approval',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                                <Select  
                                className = {is_submit === true && supervisor === ''?  "error-border-select-paste":"react-select fontstyle" }  
                                
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={supervisordata.filter(option =>option.value === supervisor)}
                                options={supervisordata}
                                onChange={(option) => this.setState({  supervisor: option.value })}
                             />
                        </div>
                        {isadmin === true &&
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Start Time',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {(is_submit === true && starttime === '') || starttime === true?  "error-border":"fontstyle text-background" }    
                            data-date-format='hh:mm:ss a'
                            type="time"  
                            value = {starttime}  
                            onChange= {(e)=>this.setState({starttime : e.target.value})} 
                            />
                           
                        </div>}
                        {isadmin === true &&
                         <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'End Time',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && endtime === ''?  "error-border":"fontstyle text-background" }    
                            data-date-format='hh:mm:ss a'
                            type="time"  
                            min="08:00:00"
                            value = {endtime}  
                            onChange={(e)=>this.handleendtime(e)}
                            // onChange= {(e)=>this.setState({endtime : e.target.value})} 
                            />
                        </div>
    }
                        <div className = "col-md-12 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Non-Productivity Task Description',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <textarea
                                className = {is_submit === true && taskdescription === ''?  "border-textarea-background":"fontstyle textarea-background" }  
                                placeholder = ''
                                value = {taskdescription}  
                                onChange= {(e)=>this.setState({taskdescription : e.target.value})} 
                            />
                        </div>
                        
                    </div>
                    <div className = "row" >
                   
                       <div className = "col-md-4"></div>
                            <div className = "col-md-2">
                            <Button 
                            style={{width:'150px'}}
                            className = "button-width" color="primary"  
                                        onClick={()=>this.onSubmit()}
                                >
                                {onChangeLanguage(locale,'Save',languageData)} 
                            </Button>
                            </div>
                            <div className = "col-md-2">

                                <Button className = "button-width" color="secondary" 
                                    style={{width:'150px'}} 
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

   })(Sidebar)
  );

