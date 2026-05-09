import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import{areaimportService} from '../../../../redux/imports/areaimport/saga'
import{typeService} from '../../../../redux/imports/type/saga';
import {onChangeLanguage,getCurrentWeek,getTimeDifference,getValue,convertLocalToUTCDate,convertUTCToLocalDate} from '../../../../helper'
import {GetReceviedTime} from '../../../../helper'
import moment from 'moment';
import { createNotification } from '../../../../toast';
import { docountService } from '../../../../redux/imports/docountsheet/saga';
import Workbook from 'react-excel-workbook'
import DatePicker from "../../datePicker";

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        username:'',
        date:'',
        week:'',
        region:'',
        type:'',
        mtdnumber:'',
        received_time:'',
        remarks:'',
        unit: '',
        tat_time: '',
        user_id: '',
        is_submit:false,
        regoin_Data:[],
        type_Data:[],
        data:[],
        all_type_Data:[],
        receivetime_format:false,
        start_time:new Date(),
        updated_start_time:new Date(),
        end_time:'',
        docount:'',
        docountlast:'',
      };
    }

    componentWillMount()
    {
      this.setState({
        date:moment(new Date()).format('MM/DD/YYYY'),
        week:getCurrentWeek(new Date()).toString(),
      })
        this.fetchregion()
        this.fetchtype()
       this.fetchDoCount()
    }

   
    fetchDoCount(){
      this.setState({loading:true})
      const {username} = this.props
      console.log(username)
      docountService.fetchdocounts(username)
      .then((res) => {
         if(res.status)   { 
                let filterstatus = res.data;
                let lastdata = res.lastcount;
                this.setState({ 
                  docount:filterstatus, 
                  docountlast:lastdata     
                }) 
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})

}
   
    onSubmit() { 
        const {date,week,region, type,mtdnumber, received_time ,
            remarks ,unit,start_time,updated_start_time } = this.state;
            
        if(  region !=="" && type !=="" && mtdnumber !=="" && received_time !=="" &&
            remarks !=="" && unit!=="")
        {
        
          const end_time =   new Date() ,updated_end_time = new Date()
          var times = moment(convertUTCToLocalDate(received_time)).format('MM/DD/YYYY hh:mm:ss a')
          var tat_time = getTimeDifference(received_time, convertLocalToUTCDate(end_time))
          this.setState({
            end_time:end_time,
            tat_time:tat_time,
            is_submit:false
          })
          if(times !== "Invalid date")
          {
            const {username} = this.props
            this.setState({
              loading : true
            })
            // var startdatess = convertLocalToUTCDate(start_time)
            docountService.createdocount(username,date,week,region, type,mtdnumber, times ,
              remarks ,unit, tat_time,
              convertLocalToUTCDate(start_time),
              convertLocalToUTCDate( end_time),
              convertLocalToUTCDate( updated_start_time),
              convertLocalToUTCDate(updated_end_time))
              .then((res) => { 
                 
                if(res.status)
                  {
                    createNotification('Created','success','filled')
                    this.Refress()
                    this.fetchDoCount()
                  }else{
                    this.setState({   
                      loading : false     
                    })
                    createNotification(res.message,'error','filled')
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
            this.setState({receivetime_format:true})
            createNotification('Please fill Received Time(MM/DD/YYYY hh:mm:ss AM/PM) this format','error','filled')
          }
         
        }
        else
        {
            this.setState({
                is_submit:true
            })
          createNotification('Please Fill Mandatory Field','error','filled')
        }
       
      }



      Refress()
      {
          this.setState({
            start_time:new Date(),
            date:moment(new Date()).format('MM/DD/YYYY'),
            week:getCurrentWeek(new Date()).toString(),
            end_time:'',
             region:'',
             type:'',
             mtdnumber:'',
             received_time:'',
             remarks:'',
             unit: '',
             tat_time: '',
             user_id: '',
             is_submit:false,
             receivetime_format:false
          })
      } 
  
   
    fetchtype_area(area_id)
    {
      this.setState({
        loading : true
      })
      typeService.fetchtype_area(area_id)
    .then((res) => {
        this.setState({loading:false})
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var typelist = filterstatus.map(function(typename) {
                  return  {label : typename.name ,value : (typename.id).toString(),unit : (typename.unit).toString()};
               });  
                this.setState({
                  type_Data :  typelist,
                })
             }
            
             })
             .catch((error) => { 
                this.setState({
                    loading : false
                  })
             }); 
    }
    onChangeRegion(value)
    {
      this.setState({  
        region: value,
        type_Data:[],
        type:'',
        unit:''
       })
       this.fetchtype_area(value)
    }

    fetchData() {
        this.setState({loading:true})
        docountService.fetchdocount()
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

    fetchtype() {
        this.setState({
            loading : true
          })
          typeService.fetchtype()
        .then((res) => {
            this.setState({loading:false})
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var typelist = filterstatus.map(function(typename) {
                      return  {label : typename.name ,value : (typename.id).toString(),unit : (typename.unit).toString()};
                   });  
                    this.setState({
                      all_type_Data :  typelist,
                    })
                 }
                
                 })
                 .catch((error) => { 
                    this.setState({
                        loading : false
                      })
                 }); 
     } 
     
     fetchregion() {
        this.setState({
            loading : true
          })
          areaimportService.fetchareaimport()
        .then((res) => {
            this.setState({loading:false})
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var regionlist = filterstatus.map(function(regionname) {
                      return  {label : regionname.area_name ,value : (regionname.id).toString()};
                   });  
                    this.setState({
                        regoin_Data :  regionlist,
                    })
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
      this.setState({received_time  : date})
      
     }
     
    renderTemplate()
    {
      const {languageData,locale} = this.props
      const {data,regoin_Data,all_type_Data} = this.state
      var array = data.map(record=> {
            return {
              'username' : record.username,
              'Start Date Time' : record.start_time,
              'End Date Time' : record.end_time,
              'Week' : record.week,
              'Date' : record.date,
              'Region':getValue(regoin_Data,'value','label',record.region) ,
              'Type' : getValue(all_type_Data,'value','label',record.type),
              'MTD Number': record.mtdnumber,
              'Received Time': record.received_time,
              'Unit': record.unit,
              'TAT Time': record.tat_time,
              'Remarks': record.remarks,
          };
        })
        return(
          
          <Workbook filename="DoCountSheet.xlsx" element={
            <Button className = "button-width" color="secondary" 
            >{ onChangeLanguage(locale,'Download Template',languageData)}  
            </Button>
                }>
            <Workbook.Sheet data={array} name="Sheet A">
            <Workbook.Column label="User Name" value="username"/>
            <Workbook.Column label="Start Date Time" value="Start Date Time"/>
              <Workbook.Column label="End Date Time" value="End Date Time"/>
              <Workbook.Column label="Week" value="Week"/>
              <Workbook.Column label="Date" value="Date"/>
              <Workbook.Column label="Region" value="Region"/>
              <Workbook.Column label="Type" value="Type"/>
              <Workbook.Column label="MTD Nubmber" value="MTD Number"/>
              <Workbook.Column label="Received Time" value="Received Time"/>
              <Workbook.Column label="Unit" value="Unit"/>
              <Workbook.Column label="TAT Time" value="TAT Time"/>
              <Workbook.Column label="Remarks" value="Remarks"/>
            </Workbook.Sheet> 
          </Workbook>    
  
        );
    }
  
    render()
    {
        const {start_time,date,week,region, type,mtdnumber, received_time ,docount,docountlast,
            remarks ,unit, tat_time,regoin_Data,type_Data,is_submit,end_time} = this.state
       const {match,languageData,locale,username} = this.props

        return (
            <>
            <title>{onChangeLanguage(locale,'DO Count Sheet',languageData)}</title>
            <Row>
              <Colxx xxs="12">


              <div className = "row">
                      <div className = "col-md-8">
                      <Breadcrumb heading={onChangeLanguage(locale,'DO Count Sheet',languageData)} match={match} />
                    </div>
                    <div className = "col-md-2" >
                        <h2 style = {{marginTop:'15px'}}>Total EQ : {docount}</h2>
                        </div>
                        <div className = "col-md-2">
                            <h2  style = {{marginTop:'15px'}}>Last EQ : {docountlast}</h2>
                        </div>
              
                  </div>


                
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
            <div className = "" style = {{borderRadius:'10px',marginBottom:'10px'}}>
                    <div className = "row" >
                    <div className = "col-md-2 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'User Name',languageData)}
                            <br></br>{username}</Label>
                                
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a >{onChangeLanguage(locale,'Start Date Time',languageData)}</a><br></br>
                            { moment(start_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                           
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a >{onChangeLanguage(locale,'End Date Time',languageData)}</a>
                            <br></br>{end_time !== '' && moment(end_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Week',languageData)}</a><br></br> 
                            {week}</Label>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Date',languageData)}</a><br></br> 
                            { date}</Label>
                        </div>
                    </div>
                </div>  
                <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                  <div className = "publish-title" >
                          <Row>
                              <Colxx xxs="12">
                                  <Label  className = "fontstyle" 
                                  style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'DO Form',languageData)}</Label>
                                  
                              </Colxx>
                          </Row>
                          </div>
                          <div className = "row" style = {{padding:'10px'}}>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Region',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                        <Select  className={is_submit === true && region === ''?  "error-border-select":"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={regoin_Data.filter(option =>option.value === region)}
                                            options={regoin_Data}
                                            onChange={(option) => this.onChangeRegion(option.value)}
                                        />
                                </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Type',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Select className={is_submit === true && region === ''?  "error-border-select":"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={type_Data.filter(option =>option.value === type)}
                                            options={type_Data}
                                            onChange={(option) => this.setState({  type: option.value,unit:option.unit })}
                                        />
                                </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'MTD Number',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Input  className = {is_submit === true && mtdnumber === ''?  "error-border":"fontstyle text-background"}
                                         
                                        value = {mtdnumber}  
                                        onChange= {(e)=>this.setState({mtdnumber  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Received Time',languageData)}
                                    <a style = {{color :'red'}}>*</a>
                                    {(is_submit === true && received_time === '')  && <a className ="fontstyle mandatory-label">{onChangeLanguage(locale,'Mandatory Field',languageData)}</a>}</Label>
                                    <DatePicker
                                    selected={received_time}
                                    className = "text-background-paste"
                                    onChange={(date) => this.onChangetime(date)}
                                    />
                                </div>
                                
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Unit',languageData)}
                                    <a style = {{color :'red'}}>*</a><br></br>{unit}</Label>
                                    {/* <Input  className = {is_submit === true && mtdnumber === ''?  "error-border":"fontstyle text-background"}
                                        type = "number"
                                        value = {unit}  
                                        onChange= {(e)=>this.setState({unit  : e.target.value})} ></Input> */}
                                </div>
                            

                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" ><a >{onChangeLanguage(locale,'TAT Time',languageData)}</a><br></br>{tat_time}</Label>
                        </div>
                            
                                <div className = "col-md-12 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Remarks',languageData)}
                                    <a style = {{color :'red'}}>*</a>
                                    </Label>
                                    <textarea className ={is_submit === true && remarks === ''?  "error-textarea-background":"fontstyle textarea-background"}  
                                        placeholder = ''
                                        value = {remarks}  
                                        onChange= {(e)=>this.setState({remarks : e.target.value})} 
                                    />
                                        </div>
                                
                               
                                
                             </div>
                             <div className = "row text-center" >
                                 {/* {this.renderTemplate()} */}
                                 <Button className = "button-width" color="primary"  
                                  onClick={()=>this.onSubmit()}
                                  >{onChangeLanguage(locale,'Save',languageData)} </Button> 
                                    <Button className = "button-width" color="secondary" 
                                    onClick={()=>this.Refress()}
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

