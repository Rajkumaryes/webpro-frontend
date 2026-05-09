import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import {onChangeLanguage,getCurrentWeek,getTimeDifference,convertLocalToUTCDate} from '../../../../helper'
import Select from 'react-select';
import DatePicker from "react-datepicker";
import moment from 'moment';
import{ratpService} from '../../../../redux/dnd/ratp/saga'
import { createNotification } from '../../../../toast';
import{dndareaService} from '../../../../redux/dnd/dndarea/saga'

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {

        region:'',
        date:'',
        week:'',
        month:'',
        mho:'',
        count:'',
        user:'',
        start_datetime:'',
        end_datetime:'',
        tat:'',
        filename:'',
        start_time:new Date(),
        updated_start_time:new Date(),
        end_time:'',
        ratpcount:'',
        ratpcountlast:'',
        mhodata:[
            {value:'Yes',label:'Yes' },
            {value:'No',label:'No' },],
            regiondata:[],
            is_submit:false,
            loading:false,
    
     
    }

    }
    onPaste() 
    {
        navigator.clipboard.readText().then((text)=>{
            console.log("lkbkjj" , text)
            console.log("lkbkjj" ,typeof text)
          
        })
    }

    componentDidMount() {
       
        this.setState({
            date:moment(new Date()).format('MM/DD/YYYY'),
            week:getCurrentWeek(new Date()).toString(),
            month:new Date().getMonth() + 1,
            start_datetime:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
        })
      this.fetchregion()
      this.fetchRatpCount()
    }
      fetchRatpCount(){
          this.setState({loading:true})
          const {username} = this.props
          ratpService.fetchratpcount(username)
          .then((res) => {
             if(res.status)   { 
                    let filterstatus = res.data;
                    let lastdata = res.lastcount;
                    this.setState({ 
                        ratpcount:filterstatus, 
                        ratpcountlast:lastdata     
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


    onSubmit() { 
        const {region,date,week,month, mho,count,user,start_datetime,end_datetime,filename,start_time,updated_start_time} = this.state;
        // let  end_time =  moment(new Date()).format('MM/DD/YYYY hh:mm:ss a') ,
          var time_taken = getTimeDifference(start_time,new Date())
        if(region!==''&&date!==''&&week!==''&&month!==''&& mho!==''&&count!==''&&filename!=='')
        {   
          
          let end_date=convertLocalToUTCDate(new Date()),
          start_date=convertLocalToUTCDate(start_time),
          updatedstarttime=convertLocalToUTCDate(updated_start_time),
           updated_end_time=convertLocalToUTCDate(new Date()) ,
           end_time=new Date()        
             const {username}= this.props;
            this.setState({
              loading : true,
              end_time:end_time,
              tat:time_taken
            })
            ratpService.createratp(username,region,date,week,month.toString(),mho,count,start_datetime,end_datetime,time_taken,filename,start_date,end_date,updatedstarttime,updated_end_time)
              .then((res) => { 
                this.setState({   
                  loading : false     
                }) 
                if(res.status)
                  {
                    createNotification('Created','success','filled')
                    this.fetchRatpCount()
                    this.setState({
                      date:moment(new Date()).format('MM/DD/YYYY'),
                      week:getCurrentWeek(new Date()).toString(),
                      month:new Date().getMonth() + 1,
                      start_time:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
                      region:'',
                      mho:'',
                      count:'',
                      user:'',
                      end_datetime:'',
                      tat:'',
                      filename:'',
                      end_time:'',
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
    onChangetime(date)
  {
    console.log("lhnkjh " ,date)
    var time = moment(date).format('HH:mm:ss')
    if(time !== "00:00:00")
    {
      this.setState({start_datetime  : date})
    }
   
  }
 
  onrefresh() {
    this.setState({
        date:moment(new Date()).format('MM/DD/YYYY'),
        week:getCurrentWeek(new Date()).toString(),
        month:new Date().getMonth() + 1,
        start_time:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
        region:'',
        mho:'',
        count:'',
        user:'',
        end_datetime:'',
        tat:'',
        filename:'',
        end_time:'',
        is_submit:false,
    })
   
  }
    onCopy()
    {
        navigator.clipboard.writeText(this.state.region)
    }
    handleregion = (selectedOptions) => {
        this.setState({region : selectedOptions.value})  
    } 
    handlemho = (selectedOptions) => {
        this.setState({mho : selectedOptions.value})  
    }
   
    render()
    {
        const {match,locale,languageData,username} = this.props
        const {  region,date,week,month, mho,count,user,start_datetime,end_datetime,tat,filename,regiondata ,mhodata,is_submit,start_time,end_time,ratpcount,ratpcountlast} = this.state
        return (
            <>
            <title>RATP</title>
            <Row>
              <Colxx xxs="12"> 
                <div className = "row">
                      <div className = "col-md-8">
                      <Breadcrumb heading="RATP" match={match} />
                    </div>
                    <div className = "col-md-2">
                        <h2 style = {{marginTop:'15px'}}>Total EQ : {ratpcount}</h2>
                    </div>
                    <div className = "col-md-2">
                        <h2  style = {{marginTop:'15px'}}>Last EQ : {ratpcountlast}</h2>
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
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Date',languageData)}</a>
                            <br></br> {date}</Label>
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
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Start Time',languageData)}</a>
                            <br></br> { moment(start_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>

                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'End Time',languageData)}</a>
                            <br></br>{end_time !== '' && moment(end_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                        </div>
                        {/* <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'TAT',languageData)}</a><br></br> 
                            {tat}</Label>
                        </div> */}
                    </div>
                </div> 
          


                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row" style = {{marginBottom:'6px'}}>
                        <div className = "col-md-3 space-margin">
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
                       
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'MHO',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            
                                       <Select  
                                       className={is_submit === true && mho === ''?  "error-border-select":"react-select fontstyle" }

                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={mhodata.filter(option =>option.value === mho)}
                                        options={mhodata}
                                        onChange={this.handlemho}
                                    />
                                    </div>
                        
                                    <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Count of Contracts to be Checked',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className={is_submit === true && count === ''?  "error-border":"fontstyle text-background" }
                               type="number" min="0"
                                value = {count}  
                                onChange= {(e)=>this.setState({count : e.target.value})} 
                                />
                        </div>
                                              
                       
                        <div className = "col-md-12 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'File Name',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <textarea 

                               className = {is_submit === true && filename === ''?  "border-textarea-background":"fontstyle textarea-background" } 
                              placeholder = ''
                                value = {filename}  
                                onChange= {(e)=>this.setState({filename : e.target.value})} 
                            />
                        </div>
                    </div>
                 <div className = "row text-center" style = {{margin:'0px 5px'}}>
                    <Button className = "button-width" color="primary"
                        onClick={()=>this.onSubmit()}>
                               {onChangeLanguage(locale,'Save',languageData)} 
                    </Button>
                    <Button className = "button-width"color="secondary"  
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

