import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import {onChangeLanguage,getCurrentWeek,convertLocalToUTCDate} from '../../../../helper'
import Select from 'react-select';
import moment from 'moment';
import{errorsheetService} from '../../../../redux/dnd/errorsheet/saga'
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
        number_error:'',
        error_done:'',
        error_des:'',
        reported_by:'',
        process_type:'',  
        start_time:new Date(),
        updated_start_time:new Date(),
        processtypedata: [
            {label:'RADM',value:'RADM'},
            {label:' RATP',value:' RADM'},
        ],
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
            // start_datetime:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
        })
      this.fetchregion()
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
        const {region,date,week,month,number_error,error_done,error_des,reported_by,process_type,updated_start_time} = this.state;
       
        if(region!==''&&date!==''&&week!==''&&month!==''&&number_error!==''&&error_done!==''&&reported_by!==''&&process_type!=='')
        {
          let end_date=convertLocalToUTCDate(new Date()),
          start_date=convertLocalToUTCDate(updated_start_time),
          updatedstarttime=convertLocalToUTCDate(updated_start_time),
           updated_end_time=convertLocalToUTCDate(new Date())               
           this.setState({
              loading : true,
              end_date:end_date,
              // tat:time_taken
            })
            errorsheetService.createerrorsheet( region,date,week,month.toString(),number_error,error_done,error_des,reported_by,process_type,start_date,end_date,updatedstarttime,updated_end_time)
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
                      month:new Date().getMonth() + 1,
                      start_datetime:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
                      region:'',
                     number_error:'',
                     error_done:'',
                     error_des:'',
                     reported_by:'',
                     process_type:'',
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
//     onChangetime(date)
//   {
//     console.log("lhnkjh " ,date)
//     var time = moment(date).format('HH:mm:ss')
//     if(time !== "00:00:00")
//     {
//       this.setState({start_datetime  : date})
//     }
   
//   }
 
  onrefresh() {
    this.setState({
        date:moment(new Date()).format('MM/DD/YYYY'),
        week:getCurrentWeek(new Date()).toString(),
        month:new Date().getMonth() + 1,
        start_datetime:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
        region:'',
       number_error:'',
       error_done:'',
       error_des:'',
       reported_by:'',
       process_type:'',
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
    handleprocess = (selectedOptions) => {
        this.setState({process_type : selectedOptions.value})  
    }
   
    render()
    {
        const {match,locale,languageData} = this.props
        const {  region,date,week,month,number_error,error_done,error_des,reported_by,process_type,regiondata ,processtypedata,is_submit} = this.state
        return (
            <>
            <title>Error Sheet</title>
            <Row>
              <Colxx xxs="12"> 
                <Breadcrumb heading="Error Sheet" match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
            <div className = "" style = {{padding:'0px 10px',borderRadius:'10px',marginBottom:'10px'}}>
                    <div className = "row" >
                    <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Date',languageData)}</a>
                            {/* <br></br> { moment(date).format('MM/DD/YYYY hh:mm:ss a')}</Label> */}

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
                    </div>
                </div> 
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row" style={{padding:'10px'}}>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Region',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select   className = {is_submit === true && region === ''?  "error-border":"fontstyle text-background" }
                                       classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={regiondata.filter(option =>option.value === region)}
                                        options={regiondata}
                                        onChange={this.handleregion}
                                    />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Number of Error/Instance',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && number_error === ''?  "error-border":"fontstyle text-background" }
                                type="number" min="0"
                                value = {number_error}  
                                onChange= {(e)=>this.setState({number_error : e.target.value})} 
                                />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Done By',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && error_done === ''?  "error-border":"fontstyle text-background" }
                                 type="text" pattern="[a-zA-Z]"     title=" Alphabetic Only Enter "   
                                value = {error_done} 
                                onChange= {(e)=>this.setState({error_done :  (e.target.value).toUpperCase()})}  
                                />
                        </div>

                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Description',languageData)}</Label>
                            <Input  className ="fontstyle text-background" 

                                value = {error_des}  
                                onChange= {(e)=>this.setState({error_des : e.target.value})} 
                                />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Reported By',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            type="text" pattern="[a-zA-Z]"     title=" Alphabetic Only Enter "   

                            className = {is_submit === true && reported_by === ''?  "error-border":"fontstyle text-background" }
                               value = {reported_by} 
                                onChange= {(e)=>this.setState({reported_by : e.target.value.toUpperCase()})} 
                                />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Process Type',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            
                                       <Select  
                                         className = {is_submit === true && process_type === ''?  "error-border":"fontstyle text-background" }
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={processtypedata.filter(option =>option.value === process_type)}
                                        options={processtypedata}
                                        onChange={this.handleprocess}
                                    />
                        </div>           
                    </div>
                 <div className = "row text-center" style = {{margin:'0px 5px'}}>
                      <Button className = "button-width" color="primary" 
                        onClick={()=>this.onSubmit()}>
                               {onChangeLanguage(locale,'Save',languageData)} 
                      </Button>
                      <Button className = "button-width" color="secondary"  
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
  const { locale,languageData} = settings;
  return {locale, languageData};
};
  export default withRouter(
    connect(mapStateToProps, {

   })(QueryResolveSheet)
  );

