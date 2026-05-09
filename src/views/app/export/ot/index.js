import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import Loading from "react-fullscreen-loading";
import {onChangeLanguage,getTimeDifference,getValue,convertLocalToUTCDate,convertUTCToLocalDate} from '../../../../helper'
import{OtService} from '../../../../redux/Export/Ot/saga'
import{typeofotService} from '../../../../redux/Export/masters/typeofot/saga'
import{teamService} from '../../../../redux/Export/masters/exportteam/saga'
import{userService} from '../../../../redux/users/saga'

import moment from 'moment';
import { createNotification } from '../../../../toast';
import Workbook from 'react-excel-workbook'
import {getValue_D1040} from '../../pasteData'
import * as clipboard from 'clipboard-polyfill/text'
import{issuecodeService} from '../../../../redux/Export/masters/issuercode/saga';

import DatePickerDate from "../../datePickerDate";

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        shipment_no:'',
        customer:'',
        dates:'',
        times:'',
        medium:'',
        numbers:'',
        bl:'',
        etd:'',
        main_pod:'',
        issuer:'',
        user_id:'',
        team:'',
        type_of_ot:'',
        end_time:'',
        start_time: new Date(),
        updated_start_time:new Date(),
        time_taken:'',
        useriddata:[],
        teamdata:[],
        typeofotdata:[],
        closed:'',
        data:[],
        issuecode_data:[],
        is_submit:false,
        isDataPasted: false,
        otcount:'',
        otcountlast:'',
      };
    }
    componentWillMount()
    {
      
    
        this.fetchteam()
        this.fetchuser()
        this.fetchtypeofot()
        this.fetchIssueCodeData()
        this.fetchOtCount()
       
    }
    fetchOtCount(){
      this.setState({loading:true})
      const {username} = this.props
      console.log(username)
      OtService.fetchotcount(username)
      .then((res) => {
         if(res.status)   { 
                let filterstatus = res.data;
                let lastdata = res.lastcount;
                this.setState({ 
                  otcount:filterstatus, 
                  otcountlast:lastdata     
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
      OtService.fetchot()
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
      this.setState({loading:true})
      teamService.fetchteams()
      .then((res) => {
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var teamlist = filterstatus.map(function(cusmaidid) {
                    return  {label : cusmaidid.team_name ,value : cusmaidid.id.toString()};
                 });  
                  this.setState({
                  teamdata :  teamlist
                  })
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})
   }  
   fetchtypeofot() {
    this.setState({loading:true})
    typeofotService.fetchtypeofot()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var typeofotlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               }); 
                this.setState({
                  typeofotdata :  typeofotlist
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})
 }  
 fetchuser() {
  this.setState({loading:true})
  userService.fetchpermission_user('Exports')
  .then((res) => {
     if(res.status)   { 
        let filterstatus = (res.data).filter(item => item.is_active === 1)
           var erroruseridlist = filterstatus.map(function(cusmaidid) {
                return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
             }); 
              this.setState({
              useriddata :  erroruseridlist
              })
           }
           else{
           this.setState({loading:false})}
           })
           .catch((error) => { });
           this.setState({loading:false}) 
} 
fetchIssueCodeData() {  
  this.setState({
    loading : true
  })
  issuecodeService.fetchissuecode()
    .then((res) => { 
      this.setState({   
    loading : false 
            
      }) 
      if(res.status)
        {
          this.setState({ 
            issuecode_data:res.data  , 
                     
          }) 
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
      start_time: new Date(),
      updated_start_time:new Date(),
       shipment_no:'',
       customer:'',
       dates:'',
       times:'',
       medium:'',
       numbers:'',
       bl:'',
       etd:'',
       main_pod:'',
       issuer:'',
       user_id:'',
       team:'',
       type_of_ot:'',
       end_time:'',
       time_taken:'',
       is_submit:false
    })
} 
   
    handleteam = (selectedOptions) => {
        this.setState({team : selectedOptions.value})  
      } 
      handletypeofot= (selectedOptions) => {
        this.setState({type_of_ot : selectedOptions.value})  
      } 
      handleuserid= (selectedOptions) => {
        this.setState({user_id : selectedOptions.value})  
      } 
    onCopy()
    {
        navigator.clipboard.writeText(this.state.shipment)
    }

      onChangeFileUpload(files)
    {

    }
    onChangestart(value)
    {
        this.setState({dates:value})
    }
    onSubmit() { 
        const {shipment_no,customer,dates,times,medium,numbers,bl,etd,main_pod,issuer,team,type_of_ot,start_time,end_time,updated_start_time, time_taken} = this.state;
     
      
        if(shipment_no!=='' && customer !=='' &&dates!=='' &&times !=='' &&medium !=='' &&numbers!=='' &&bl!=='' 
        &&etd!=='' &&main_pod !== '' && issuer!=='' &&team !=='' &&type_of_ot !=='' && numbers !== '')
        {
         const end_time = new Date(), updated_end_time= new Date() 
         var date = moment(dates).format('MM/DD/YYYY')
         var etd_date = moment(etd).format('MM/DD/YYYY')
         var timetaken = getTimeDifference(start_time,end_time)
         this.setState({
          loading : true,
          end_time:end_time,
          time_taken:timetaken
        })
        const {username} = this.props
        this.createAPI(shipment_no,customer,date,times,medium,numbers,bl,etd_date,main_pod,issuer,
          username,team,type_of_ot,timetaken,
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
      createAPI(shipment_no,customer,dates,times,medium,numbers,bl,etd,main_pod,issuer,
        user_id,team,type_of_ot,time_taken,start_time,end_time,updated_start_time,updated_end_time)
      {
        this.setState({
          loading : true
        })
        OtService.createot(shipment_no,customer,dates,times,medium,numbers,bl,etd,main_pod,
          issuer,user_id,team,type_of_ot,time_taken,start_time,end_time,updated_start_time,updated_end_time )
          .then((res) => { 
            this.setState({   
              loading : false     
            }) 
            if(res.status)
              {
                createNotification('Created','success','filled')
                this.clearvalue()
                this.fetchOtCount()
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
      renderTemplate()
      {
        const {languageData,locale} = this.props
        const {data,useriddata,teamdata,typeofotdata} = this.state
        var array = data.map(record=> {
              return {
                'Shipment Number' : record.shipment_no,
                'customer' : record.customer,
                'dates' : record.dates,
                'times' : record.times,
                'medium' : record.medium,
                'numbers':record.numbers,
                'bl' : record.bl,
                'etd' : record.etd,
                'main_pod' : record.main_pod,
                'issuer':record.issuer,
                'user_id':getValue(useriddata,'value','label',record.user_id),
                'team':getValue(teamdata,'value','label',record.team),
                'type_of_ot':getValue(typeofotdata,'value','label',record.type_of_ot),
                'start_date':record.start_time,
                'end_date':record.end_time,
                'time_taken':record.time_taken,
            };
          })
          return(
            
            <Workbook filename="OT.xlsx" element={
              <Button className = "button-width" color="secondary"  style={{width:'150px'}}
              >{ onChangeLanguage(locale,'Download',languageData)}  
              </Button>
              }>
              <Workbook.Sheet data={array} name="Sheet A">
              <Workbook.Column label="Shipment Number" value="Shipment Number"/>
              <Workbook.Column label="Customer" value="customer"/>
              <Workbook.Column label= "Dates" value="dates"/>
              <Workbook.Column label= "Times" value="times"/>
              <Workbook.Column label="Medium" value="medium"/>
              <Workbook.Column label= "Bumbers" value="numbers"/>
               <Workbook.Column label= "BL" value="bl"/>
               <Workbook.Column label= "ETD" value="etd"/>
               <Workbook.Column label="Main POD" value="main_pod"/>
               <Workbook.Column label= "Issuer" value="issuer"/>
               <Workbook.Column label= "User ID" value="user_id"/>
               <Workbook.Column label= "Team" value="team"/>
               <Workbook.Column label="Type of OT" value="type_of_ot"/>
               <Workbook.Column label="Start Date" value="start_date"/>
               <Workbook.Column label= "End Date" value="end_date"/>
               <Workbook.Column label= "Time Taken" value="time_taken"/>
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
    
      validDate(date,title)
      {
         var date_value = '',isfill = false
          if(date && date !== null && date !== '')
          {
             
             var end_date =  new Date(date)
             if (Object.prototype.toString.call(end_date) === "[object Date]") {
                 if (isNaN(end_date.getTime())) 
                 { 
                     console.log("date is not valid")
                 } 
                 else 
                 {
                     date_value = end_date
                     console.log("date is valid")
                     isfill = true
                 }
               } else 
               {
                  console.log("not a date")
               }
 
          }
          if(isfill === false)
          {
             createNotification(`Please Enter ${title} (MM/DD/YYYY)`,'error','filled') 
          }
  
          return date_value
 
      }
      validTime(timess,title){
         var timevalue = '', isfill=true;
         if(timess && timess !== null && timess !== '')
         {
             console.log("kjgkjgkj " ,timess)
             var isvalid = moment(timess, ["h:mm:ss A"]).format("HH:mm:ss");
             console.log("kjgkjgkj " ,isvalid)
             if(isvalid !== 'Invalid date')
             {
                 timevalue = isvalid
             }
             else
             {
                 isfill = false 
             }
 
             if(isfill === false)
             {
                 createNotification(`Please Enter ${title} (hh:mm:ss AM/PM)`,'error','filled') 
             }
       }
         return timevalue
     
     }
     getteamvalue(value)
     {
        this.setState({
           issuer : value,
            team:getValue(this.state.issuecode_data,'issure_code','team',value)
        })
     } 

      async onPasteD1040() {
        clipboard.readText().then((text)=>{
            var record = getValue_D1040(text)
        console.log("kjbkj " , JSON.stringify(record))
        this.setState({
            paste_data:text,
            shipment_no:record.shipment_no,
            customer:record.customer,
            dates:this.validDate(record.date,'Dates'),
            times:this.validTime(record.time,'Times'),
            medium:record.medium,
            numbers:record.numbers,
            bl:record.bl,
            etd:this.validDate(record.etd,'ETD'),
            main_pod:record.main_pod,
            })
            if(record.issuer !== "")
            {
                this.getteamvalue(record.issuer)
            }
           
        });
        this.setState({
          isDataPasted: true
      });
    }
  

    render()
    {
        const {match,locale,languageData,username} = this.props
        const {loading,shipment_no,customer,dates,times,medium,numbers,bl,etd,main_pod,issuer,team,type_of_ot,start_time,end_time,isDataPasted,otcount,otcountlast,
            time_taken,teamdata,typeofotdata,is_submit} = this.state
        return (
            <>
            <title>{onChangeLanguage(locale,'OT',languageData)}</title>
             {loading && 
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
            <Row>
              <Colxx xxs="12">
              <div className = "row">
                      <div className = "col-md-8">
                      <Breadcrumb heading={onChangeLanguage(locale,'OT',languageData)} match={match} />
                    </div>
                    <div className = "col-md-2" >
                        <h2 style = {{marginTop:'15px'}}>Total EQ : {otcount}</h2>
                        </div>
                        <div className = "col-md-2">
                            <h2  style = {{marginTop:'15px'}}>Last EQ : {otcountlast}</h2>
                        </div>
                    {/* <div className = "col-md-2">
                        <Button className = "button-width" color="primary" style= {{width :'100%'}}>
                            <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
                            <a style= {{margin :'0px'}} > Upload</a>
                            <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                                className = "filepicker_customButton"
                                style = {{width : '80%',marginLeft :'-56%'}}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
                        </Button>
                    </div> */}
                    {/* <div className = "col-md-2" >
                         {this.renderTemplate()}
                    </div> */}
                  </div>
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row" style = {{}}>
                    <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'User ID',languageData)}  
                            <br></br>{username}</Label>
                          
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Start Date Time',languageData)}  
                          <br></br> {moment(start_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'End Date Time',languageData)}  
                            <br></br> {end_time!==''&& moment(end_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Time Taken',languageData)}
                            <br></br> {time_taken}</Label>
                        </div>
                       
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Shipment Number',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && shipment_no === ''?  "error-border-paste":"fontstyle text-background-paste" }  
                            placeholder = ''
                            value = {shipment_no} 
                            disabled={isDataPasted} 
                            onChange= {(e)=>this.setState({shipment_no : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Customer',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && customer === ''?  "error-border-paste":"fontstyle text-background-paste" }
                            placeholder = ''
                            value = {customer}  
                            disabled={isDataPasted} 
                            onChange= {(e)=>this.setState({customer : e.target.value})} 
                            />
                        </div>
                       

                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Dates',languageData)}
                              <a style = {{color :'red'}}>*</a></Label>
                               <p1 className = 'fontstyle mandatory-label'>
                                {is_submit === true && dates === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                              <DatePickerDate
                                 selected={dates}
                                 disabled={isDataPasted} 
                                 className = "text-background-paste" 
                                 onChange={(date) => this.onChangestart(date)}
                                 />
                                
                        </div>


                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font-paste" >
                            {onChangeLanguage(locale,'Times',languageData)} 
                            <a style = {{color :'red'}}>*</a></Label>
                                <Input 
                                className = {is_submit === true && times === ''?  "error-border-paste":"fontstyle text-background-paste" } 
                                data-date-format='hh:mm:s a'
                                type="time"
                                value = {times}  
                                disabled={isDataPasted} 
                                onChange= {(e)=>this.setState({times  : e.target.value})} ></Input>
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Medium',languageData)}  
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && medium === ''?  "error-border-paste":"fontstyle text-background-paste" }
                            placeholder = ''
                            value = {medium}  
                            disabled={isDataPasted} 
                            onChange= {(e)=>this.setState({medium : e.target.value})} 
                            />
                        </div>
                    
                      
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'BL',languageData)}  
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && bl === ''?  "error-border-paste":"fontstyle text-background-paste" }
                            placeholder = ''
                            value = {bl}  
                            disabled={isDataPasted} 
                            onChange= {(e)=>this.setState({bl : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'ETD',languageData)}
                             <a style = {{color :'red'}}>*</a></Label>
                            
                            <p1 className = 'fontstyle mandatory-label'>
                                {is_submit === true && etd === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                              <DatePickerDate
                                 selected={etd}
                                 className = "text-background-paste" 
                                 disabled={isDataPasted} 
                                 onChange={(date) => this.setState({etd:date})}
                                 />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Main POD',languageData)}
                             <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && main_pod === ''?  "error-border-paste":"fontstyle text-background-paste" }
                            placeholder = ''
                            value = {main_pod} 
                            disabled={isDataPasted}  
                            onChange= {(e)=>this.setState({main_pod : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Issuer',languageData)} 
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && issuer === ''?  "error-border-paste":"fontstyle text-background-paste" }
                            placeholder = ''
                            value = {issuer} 
                            disabled={isDataPasted}  
                            onChange= {(e)=>this.getteamvalue(e.target.value)}  

                            // onChange= {(e)=>this.setState({issuer : e.target.value})} 
                            />
                        </div>
                        {/* <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Team',languageData)}  
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                                 className = {is_submit === true && team === ''?  "error-border-select-paste":"react-select fontstyle" } 
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={teamdata.filter(option =>option.value === team)}
                                options={teamdata}
                                onChange={this.handleteam}
                            />
                        </div> */}

                    <div className = "col-md-3 space-margin">
                        <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Team',languageData)}
                            {is_submit === true && team=== '' &&   <a className = 'fontstyle mandatory-label'> {onChangeLanguage(locale,'Mandatory Field',languageData)} </a>}
                            <br></br>{team !== "" &&  getValue(teamdata,'value','label',team)}</Label>
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Type of OT',languageData)}  
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                                 className = {is_submit === true && type_of_ot === ''?  "error-border-select-paste":"react-select fontstyle" } 
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={typeofotdata.filter(option =>option.value === type_of_ot)}
                                options={typeofotdata}
                                onChange={this.handletypeofot}
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Numbers',languageData)}  
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && numbers === ''?  "error-border-paste":"fontstyle text-background-paste" }
                            type = "text" 
                            placeholder = ''
                            value = {numbers}  
                            disabled={isDataPasted} 
                            onChange= {(e)=>this.setState({numbers : e.target.value})} 
                            />
                        </div>
                           </div>
                    <div className = "row text-center">                      
                          <Button className = "button-width" color="secondary"    
                                 onClick={()=>this.onPasteD1040()}
                                >{onChangeLanguage(locale,'Paste from D1040',languageData)} </Button>                        
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

