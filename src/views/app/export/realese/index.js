import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import CustomRadioButton from '../../../RadioButton'
import { createNotification } from '../../../../toast';
import{ReleaseService} from '../../../../redux/Export/exportrelease/saga'
import {onChangeLanguage,getTimeDifference,convertLocalToUTCDate,convertUTCToLocalDate} from '../../../../helper'
import Loading from "react-fullscreen-loading";
import moment from 'moment';
import Workbook from 'react-excel-workbook'
import DatePicker from "../../datePicker";
import{teamService} from '../../../../redux/Export/masters/exportteam/saga'
import Select from 'react-select';

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        dp_voyage:'',
        vessel_name:'',
        pol:'',
        actualization:'',
        remarks:'',
        team:'',
        mtd:'',
        atd_date_time:'',
        gst_date_time:'',
        msdc_date_time:'',
        gstrec_date_time:'',
        foo_date_time:'',
        final_date_time:'',
        time_taken:'',
        start_date:new Date(),
        end_date:'',
        task:'',
        start_time: new Date(),
        updated_start_time:new Date(),
        data:[],
        team_data:[],
        is_submit:false,
        releasecount:'',
        releasecountlast:'',
      };
    }
    componentWillMount()
    {
      this.fetchteam()
       this.fetchReleaseCount()
    }
    fetchReleaseCount(){
      this.setState({loading:true})
      const {username} = this.props
      console.log(username)
      ReleaseService.fetchreleasecount(username)
      .then((res) => {
         if(res.status)   { 
                let filterstatus = res.data;
                let lastdata = res.lastcount;
                this.setState({ 
                  releasecount:filterstatus, 
                  releasecountlast:lastdata     
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
      ReleaseService.fetchrelease()
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
    fetchteam() {
      this.setState({
          loading : true
        })
        teamService.fetchteams()
      .then((res) => {
          this.setState({loading:false})
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var teamlist = filterstatus.map(function(cusmaidid) {
                    return  {label : cusmaidid.team_name ,value : (cusmaidid.id).toString()};
                 });  
                  this.setState({
                    team_data :  teamlist,
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
    onCopy()
    {
        navigator.clipboard.writeText(this.state.dp_voyage)
    }
    onChangeFileUpload(files)
    {

    }
    onChangeRadio(value)
    {
        this.setState({task:value})
    }
    onSubmit() { 
        
        const {dp_voyage,vessel_name,pol,mtd,actualization,start_date,remarks,team,atd_date_time,gst_date_time,msdc_date_time,
            gstrec_date_time,foo_date_time,final_date_time,time_taken,task,start_time,updated_start_time} = this.state;
          
        var isfill = false
        if(pol.toLowerCase() === "india")
        {
          if(dp_voyage !== "" && vessel_name!== "" && pol!== "" && mtd!== "" && actualization!== "" && start_date!== "" &&  task !== '' && team!==''
          && atd_date_time!== "" && gst_date_time!== "" && msdc_date_time!== "" && gstrec_date_time!== "" && foo_date_time!== "" && final_date_time!== ""  )
          { 
            isfill = true
          }
       }
       else if(pol !== '')
       {
        if(dp_voyage !== "" && vessel_name!== "" && pol!== "" && mtd!== "" && actualization!== "" && start_date!== ""  &&task !== ''&& team!=='')
        { 
          isfill = true
        }
       }
      if(isfill == true)
      {  
        const end_time =   new Date() ,updated_end_time = new Date(),end_date = new Date()
        // if ((Date.parse(end_date) > Date.parse(start_date)))
        // {
          this.createAPI(dp_voyage,vessel_name,pol,mtd,actualization,start_date,convertLocalToUTCDate(end_date),remarks,team,atd_date_time,gst_date_time,msdc_date_time,
          gstrec_date_time,foo_date_time,final_date_time,time_taken,task,
          convertLocalToUTCDate(start_time),
          convertLocalToUTCDate( end_time),
          convertLocalToUTCDate( updated_start_time),
          convertLocalToUTCDate(updated_end_time))
        }
      //   else
      //   {
      //     createNotification('Please Choose End Date Above  Start Date','error','filled')
      //   } 
      // }
      else
      {
        this.setState({
          is_submit:true
        })
        createNotification('Please fill mandatory field','error','filled')
      }
        
    }

      
      createAPI(dp_voyage,vessel_name,pol,mtd,actualization,start_date,end_date,remarks,team,atd_date_time,gst_date_time,msdc_date_time,
        gstrec_date_time,foo_date_time,final_date_time,time_taken1,task,start_time,end_time, updated_start_time,updated_end_time,)
      {

        var end_time =   new Date() ,updated_end_time = new Date(),end_date = new Date()

       
        this.setState({
          loading : true
        })
         const  
         start_dates = (start_date !=='' && start_date !== null) ? moment(convertUTCToLocalDate(start_date)).format('MM/DD/YYYY hh:mm:ss a') :'',
          end_dates = (end_date !=='' && end_date !== null) ? moment(end_date).format('MM/DD/YYYY hh:mm:ss a') :'',
        atd_date = (atd_date_time !=='' && atd_date_time !== null) ? moment(convertUTCToLocalDate(atd_date_time)).format('MM/DD/YYYY hh:mm:ss a') :'',
        gst_date = (gst_date_time !=='' && gst_date_time !== null) ? moment(convertUTCToLocalDate(gst_date_time)).format('MM/DD/YYYY hh:mm:ss a') :'',
        msdc_date = (msdc_date_time !=='' && msdc_date_time !== null) ? moment(convertUTCToLocalDate(msdc_date_time)).format('MM/DD/YYYY hh:mm:ss a') :'',
        gstrec_date = (gstrec_date_time !=='' && gstrec_date_time !== null) ? moment(convertUTCToLocalDate(gstrec_date_time)).format('MM/DD/YYYY hh:mm:ss a') :'',
        foo_date = (foo_date_time !=='' && foo_date_time !== null) ? moment(convertUTCToLocalDate(foo_date_time)).format('MM/DD/YYYY hh:mm:ss a') :'',
        final_date = (final_date_time !=='' && final_date_time !== null) ? moment(convertUTCToLocalDate(final_date_time)).format('MM/DD/YYYY hh:mm:ss a') :''

        const {username} = this.props
        ReleaseService.createrelease(username,dp_voyage,vessel_name,pol,mtd,actualization,start_dates,end_dates,remarks,team,
          atd_date,gst_date,msdc_date,gstrec_date,foo_date,final_date,
          time_taken1,task,start_time,convertLocalToUTCDate(end_time),updated_start_time,updated_end_time)
          .then((res) => { 
            this.setState({   
              loading : false     
            }) 
            if(res.status)
              {
                createNotification('Created','success','filled')
                this.clearvalue()
                this.fetchReleaseCount()
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
      clearvalue()
     {
       
         this.setState({
          dp_voyage:'',
          vessel_name:'',
          pol:'',
          actualization:'',
          remarks:'',
          team:'',
          mtd:'',
          atd_date_time:'',
          gst_date_time:'',
          msdc_date_time:'',
          gstrec_date_time:'',
          foo_date_time:'',
          final_date_time:'',
          time_taken:'',
          start_date: new Date(),
          end_date:'',
          task:'',
          start_time: new Date(),
          updated_start_time:new Date(),
          is_submit:false,
         })
     } 
     renderTemplate()
     {
       const {languageData,locale} = this.props
       const {data} = this.state
       var array = data.map(record=> {
             return {
               'DP Voyage' : record.dp_voyage,
               'Vessel Name' : record.vessel_name,
               'POL' : record.pol,
               'MTD' : record.mtd,
               'Actualization' : record.actualization,
               'Start Date':record.start_date,
               'End Date' : record.end_date,
               'Remarks' : record.remarks,
               'Team':record.team,
               'ATD Date & Timing(IST)' : record.atd_date_time,
               'GST Mail Sent Date & Time' : record.gst_date_time,
               'MSDC Pulled Date & Time' : record.msdc_date_time,
               'GST Confirmation Received Date & Time' : record.gstrec_date_time,
               'F0030 Date & Time':record.foo_date_time,
               'Final Status Sent Date & Time' : record.final_date_time,
               'Time Taken From ATD to GST Mail Sent' : record.time_taken,
               'Task' : record.task,
           };
         })
         return(
           
           <Workbook filename="Release.xlsx" element={
             <Button className = "button-width" color="secondary"  style={{width:'150px'}}
             >{ onChangeLanguage(locale,'Download',languageData)}  
             </Button>
             }>
             <Workbook.Sheet data={array} name="Sheet A">
             <Workbook.Column label="DP Voyage" value="DP Voyage"/>
             <Workbook.Column label="Vessel Name" value="Vessel Name"/>
               <Workbook.Column label="POL" value="POL"/>
               <Workbook.Column label="MTD" value="MTD"/>
               <Workbook.Column label="Actualization" value="Actualization"/>
               <Workbook.Column label="Start Date" value="Start Date"/>
               <Workbook.Column label="End Date" value="End Date"/>
               <Workbook.Column label="Remarks" value="Remarks"/>
               <Workbook.Column label="Team" value="Team"/>
               <Workbook.Column label="ATD Date & Timing(IST)" value="ATD Date & Timing(IST)"/>
               <Workbook.Column label="GST Mail Sent Date & Time" value="GST Mail Sent Date & Time"/>
               <Workbook.Column label="MSDC Pulled Date & Time" value="MSDC Pulled Date & Time"/>
               <Workbook.Column label="GST Confirmation Received Date & Time" value="GST Confirmation Received Date & Time"/>
               <Workbook.Column label="F0030 Date & Time" value="F0030 Date & Time"/>
               <Workbook.Column label="Final Status Sent Date & Time" value="Final Status Sent Date & Time"/>
               <Workbook.Column label="Time Taken From ATD to GST Mail Sent" value="Time Taken From ATD to GST Mail Sent"/>
               <Workbook.Column label="Task" value="Task"/>
             </Workbook.Sheet> 
           </Workbook>
         );
     }
     onChangetime(date)
    {
      this.setState({
        start_date  : date,
        end_date:''
      })
    
    }
  onChangeendtime(date)
  {
    this.setState({
      end_date:date
    })
   
  }
  onChangeatdtime(date)
  {
   
      const {gst_date_time} = this.state
      this.setState({
        atd_date_time:date
      })
      if(gst_date_time !== "" )
      {
        const timetaken = getTimeDifference(date,gst_date_time)
        this.setState({
          time_taken:timetaken
        })
        console.log('timetaken',timetaken)
      }
      else
      {
        this.setState({
          time_taken:''
        })
      }
     
   
   
  }
  onChangegstrectime(date)
  {
    
      const {atd_date_time} = this.state
      this.setState({
        gst_date_time:date
      })
      if(atd_date_time !== "" )
      {
        const timetaken = getTimeDifference(atd_date_time,date)
        this.setState({
          time_taken:timetaken
        })
      }
      else
      {
        this.setState({
          time_taken:''
        })
      }
    
    
   
  }
 
  onChangegsttime(date)
  {
    this.setState({
      gst_date_time:date
    })
   
  }
  onChangemsdctime(date)
  {
    
    this.setState({
      msdc_date_time:date
    })
  }
 
  onChangefootime(date)
  {
    this.setState({
      foo_date_time:date
    })
   
  }
  onChangetimegstrec(date)
  {
    this.setState({
      gstrec_date_time:date
    })
  }

  onChangefinaltime(date)
  {
    this.setState({
      final_date_time:date
    })
   
  }
  
  

    render()
    {
        const {match,languageData,locale,username} = this.props
        const {loading,dp_voyage,vessel_name,pol,actualization,remarks,mtd,atd_date_time,gst_date_time,msdc_date_time,gstrec_date_time,foo_date_time,releasecount,releasecountlast,
        final_date_time,time_taken,start_date,end_date,task,is_submit,team,team_data} = this.state
        return (
            <>
             <title>{onChangeLanguage(locale,'Release',languageData)}</title>
             {loading && 
            <div>
              <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
            </div>
            }
            <Row>
              <Colxx xxs="12">
              <div className = "row">
                      <div className = "col-md-8">
                        <Breadcrumb heading={onChangeLanguage(locale,'Release',languageData)} match={match} />
                    </div>
                    <div className = "col-md-2" >
                        <h2 style = {{marginTop:'15px'}}>Total EQ : {releasecount}</h2>
                        </div>
                        <div className = "col-md-2">
                            <h2  style = {{marginTop:'15px'}}>Last EQ : {releasecountlast}</h2>
                        </div>
                    {/* <div className = "col-md-2" >
                    {this.renderTemplate()}
                    </div> */}
                  </div>
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'15px'}}>
                    <div className = "row" >



                    <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'User ID',languageData)}
                            <br></br> {username}</Label>
                           
                        </div>

                    <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Start Date',languageData)}
                                <br></br>{moment(start_date).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'End Date',languageData)}
                                <br></br>
                                {end_date !== '' && moment(end_date).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                        </div>


                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'DP Voyage',languageData)}
                              <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && dp_voyage === ''?  "error-border":"fontstyle text-background" }  
                            placeholder = ''
                            value = {dp_voyage}  
                            onChange= {(e)=>this.setState({dp_voyage : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Vessel Name',languageData)}
                              <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && vessel_name === ''?  "error-border":"fontstyle text-background" }  
                            placeholder = ''
                            value = {vessel_name}  
                            onChange= {(e)=>this.setState({vessel_name : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'POL',languageData)}
                              <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && pol === ''?  "error-border":"fontstyle text-background" } 
                            placeholder = ''
                            value = {pol}  
                            onChange= {(e)=>this.setState({pol : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'MTD Count',languageData)}
                              <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && mtd === ''?  "error-border":"fontstyle text-background" } 
                            placeholder = ''
                            value = {mtd}  
                            onChange= {(e)=>this.setState({mtd : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Actualization',languageData)}
                              <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && actualization === ''?  "error-border":"fontstyle text-background" } 
                            placeholder = ''
                            value = {actualization}  
                            onChange= {(e)=>this.setState({actualization : e.target.value})} 
                            />
                           
                        </div>
                        {/* <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Start Date',languageData)}
                              <a style = {{color :'red'}}>*</a></Label>
                               <p1 className = 'fontstyle mandatory-label'>{is_submit === true && start_date === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                              <DatePicker
                                 selected={start_date}
                                 className = "text-background" 
                                 onChange={(date) => this.onChangetime(date)}
                                 min_date = {end_date}
                                 />
                        </div> */}
                        {/* <div className = "col-md-4 space-margin"  >
                        <Label  className = "fontstyle normal-font" >
                          <a >{onChangeLanguage(locale,'End Date Time',languageData)}</a><br></br> 
                          {end_date !== '' && moment(end_date).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                        </div> */}
                       
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Remarks',languageData)}
                             </Label>
                            <Input  
                            className = "fontstyle text-background"
                            placeholder = ''
                            value = {remarks}  
                            onChange= {(e)=>this.setState({remarks : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Team',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                                <Select  
                            className = {is_submit === true && team === ''?  "error-border-select-paste":"react-select fontstyle" } 
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={team_data.filter(option =>option.value === team)}
                            options={team_data}
                            onChange={({value}) => this.setState({  team: value })}
                        />
                        </div>

                        {pol.toLowerCase() === "india" &&
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'ATD Date & Timing(IST)',languageData)}
                              <a style = {{color :'red'}}>*</a></Label>
                              <p1 className = 'fontstyle mandatory-label'>{is_submit === true && atd_date_time === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                              <DatePicker
                                 selected={atd_date_time}
                                 className = "text-background" 
                                 onChange={(date) => this.onChangeatdtime(date)}
                                 />
                        </div>
                       }
                     {pol.toLowerCase() === "india" &&
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'GST Mail Sent Date & Time',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                                <p1 className = 'fontstyle mandatory-label'>{is_submit === true && gst_date_time === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                              <DatePicker
                                 selected={gst_date_time}
                                 className = "text-background" 
                                 onChange={(date) => this.onChangegstrectime(date)}
                                 />
                        </div>
                       }
                       {pol.toLowerCase() === "india"&&
                              <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'MSDC Pulled Date & Time',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                              <p1 className = 'fontstyle mandatory-label'>{is_submit === true && msdc_date_time === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                              <DatePicker
                                 selected={msdc_date_time}
                                 className = "text-background" 
                                 onChange={(date) => this.onChangemsdctime(date)}
                                 />
                        </div>
                        }
                        {pol.toLowerCase() === "india"&&
                           <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'GST Confirmation Received Date & Time',languageData)}
                                <a style = {{color :'red'}}>*</a></Label>
                              <p1 className = 'fontstyle mandatory-label'>{is_submit === true && gstrec_date_time === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                              <DatePicker
                                 selected={gstrec_date_time}
                                 className = "text-background" 
                                 onChange={(date) => this.onChangetimegstrec(date)}
                                 />
                        </div>
                           }
                        {pol.toLowerCase() === "india"&& 
                           <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'F0030 Date & Time',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                              <p1 className = 'fontstyle mandatory-label'>{is_submit === true && foo_date_time === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                              <DatePicker
                                 selected={foo_date_time}
                                 className = "text-background" 
                                 onChange={(date) => this.onChangefootime(date)}
                                 />
                        </div>
                          }
                    {pol.toLowerCase() === "india"&&
                       <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Final Status Sent Date & Time',languageData)}
                              <a style = {{color :'red'}}>*</a></Label>
                              <p1 className = 'fontstyle mandatory-label'>{is_submit === true && final_date_time === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                              <DatePicker
                                 selected={final_date_time}
                                 className = "text-background" 
                                 onChange={(date) => this.onChangefinaltime(date)}
                                 />
                        </div>
                     }
                   {pol.toLowerCase() === "india"&&
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Time Taken From ATD to GST Mail Sent',languageData)}
                              <br></br>{time_taken}</Label>
                           
                        </div>
                    }
                        <div className = "col-md-6 space-margin">
                        <Label  className = "fontstyle normal-font" >
                          {onChangeLanguage(locale,'Task',languageData)}
                          <a style = {{color :'red'}}>*</a>
                          {is_submit === true && task === '' &&<p1 className = 'fontstyle mandatory-label'> {onChangeLanguage(locale,'Mandatory Field',languageData)}</p1>}</Label>
                            <div style = {{margin:'10px 0px'}}>
                            
                                <Row>
                                    <Colxx xxs="2">
                                        <CustomRadioButton checked  = "Release" name = {onChangeLanguage(locale,'Release',languageData)} value = {task} 
                                            onChangeRadio={this.onChangeRadio.bind(this)}/>
                                    </Colxx>
                                    <Colxx xxs="2">
                                     <CustomRadioButton checked  = "Invoice" name = {onChangeLanguage(locale,'Invoice',languageData)} value = {task} 
                                            onChangeRadio={this.onChangeRadio.bind(this)}/>
                                        
                                    </Colxx>
                                    <Colxx xxs="2">
                                     <CustomRadioButton checked  = "SDC" name = {onChangeLanguage(locale,'SDC',languageData)} value = {task} 
                                            onChangeRadio={this.onChangeRadio.bind(this)}/>
                                        
                                    </Colxx>
                                    <Colxx xxs="2">
                                     <CustomRadioButton checked  = "Revenue" name = {onChangeLanguage(locale,'Revenue',languageData)} value = {task} 
                                            onChangeRadio={this.onChangeRadio.bind(this)}/>
                                        
                                    </Colxx>
                                    <Colxx xxs="4">
                                     <CustomRadioButton checked  = "AMS Validation" name = {onChangeLanguage(locale,'AMS Validation',languageData)} value = {task} 
                                            onChangeRadio={this.onChangeRadio.bind(this)}/>
                                        
                                    </Colxx>
                                </Row>
                            </div>   
                           
                        </div>
                        
                    </div>
                    <div className = "row text-center">                      
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

