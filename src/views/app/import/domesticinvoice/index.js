import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import DatePicker from "../../datePicker";
import Select from 'react-select';
import{areaimportService} from '../../../../redux/imports/areaimport/saga'
import{DomesticService} from '../../../../redux/imports/domesticinvoice/saga'
import{domestictypeService} from '../../../../redux/imports/domestictype/saga'
import {onChangeLanguage,getCurrentWeek,getTimeDifference,GetReceviedTime,getValue
  ,convertLocalToUTCDate,convertUTCToLocalDate} from '../../../../helper'
import { createNotification } from '../../../../toast';
import Loading from "react-fullscreen-loading";
import Workbook from 'react-excel-workbook'
import moment from 'moment';


class Sidebar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        week:'',
        date:'',
        region:'',
        username:'',
        container_number:'',
        received_time:'',
        charges:'',
        pc:'',
        cc:'',
        unit:'',
        type:'',
        tat_time:'',
        regiondata:[],
        data:[],
        type_Data:[],
        all_type_Data:[],
        is_submit:false,
        loading:false,
        receivetime_format:false,
        start_time:new Date(),
        updated_start_time:new Date(),
        end_time:'',
        domesticinvoicecount:'',
        domesticinvoicecountlast:'',
      };
    }
    componentDidMount() {
       
        this.setState({
            date:moment(new Date()).format('MM/DD/YYYY'),
            week:getCurrentWeek(new Date()).toString()
        })
       
       this.fetchregion()
      this.fetchDomesticinvoiceCount()
    }

    fetchDomesticinvoiceCount(){
      this.setState({loading:true})
      const {username} = this.props
      console.log(username)
      DomesticService.fetchdomesticinvoicecount(username)
      .then((res) => {
         if(res.status)   { 
                let filterstatus = res.data;
                let lastdata = res.lastcount;
                this.setState({ 
                  domesticinvoicecount:filterstatus, 
                  domesticinvoicecountlast:lastdata     
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
        areaimportService.fetchareaimport()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var regionlist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.area_name ,value : cusmaidid.id.toString()};
                   });  
                    this.setState({
                    regiondata :  regionlist
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
        const {week,date,region,start_time,container_number,received_time,charges,pc,cc,unit,type,updated_start_time} = this.state;
         
        if(received_time !== ""&& region !== "" && container_number!== "" && received_time !== "" && charges!== ""  && pc !=='' && cc !=='' && 
          unit !=='' && type !=='')
        {
          const end_time = new Date() ,updated_end_time = new Date()
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
                this.setState({ loading : true })
                DomesticService.createdomesticinvoice(week,date,region,username,container_number,
                  received_time,charges,pc,cc,unit,type,tat_time,
                  convertLocalToUTCDate(start_time),
                  convertLocalToUTCDate( end_time),
                  convertLocalToUTCDate( updated_start_time),
                  convertLocalToUTCDate(updated_end_time))
                .then((res) => { 
                  this.setState({   
                    loading : false     
                  }) 
                  if(res.status)
                    {
                      createNotification('Created','success','filled')
                      this.onrefresh()
                      this.fetchDomesticinvoiceCount()
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
                this.setState({receivetime_format:true})
                createNotification('Please fill Received Time(MM/DD/YYYY hh:mm:ss AM/PM) this format','error','filled')
              }
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
    this.setState({received_time  : date})
  }
  fetchtype_area(area_id)
    {
      this.setState({
        loading : true
      })
      domestictypeService.fetchdomestictype_area(area_id)
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
    onChangetime(date)
    {
      console.log("lhnkjh " ,date)
      var time = moment(date).format('HH:mm:ss')
      if(time !== "00:00:00")
      {
        this.setState({received_time  : date})
      }
     
    }
  renderTemplate()
  {
    const {languageData,locale} = this.props
    const {data} = this.state
    var array = data.map(record=> {
          return {
            'UserName' : record.username,
            'start_time' : record.start_time,
            'end_time' : record.end_time,
            'week' : record.week,
            'date' : record.date,
            'region':getValue(this.state.regiondata,'value','label',record.region),
            'container_number' : record.container_number,
            'received_time':record.received_time,
            'charges':record.charges,
            'pc':record.pc,
            'cc':record.cc,
            'type':getValue(this.state.all_type_Data,'value','label',record.type),
            'Unit':record.unit,
            'tat_time':record.tat_time

        };
      })
      return(
        
        <Workbook filename="Domestic_invoice.xlsx" element={
            <Button className = "button-width"
            style={{width:'150px'}} color="secondary" >
            {onChangeLanguage(locale,'Raw Data',languageData)} 
            </Button>
		      }>
          <Workbook.Sheet data={array} name="Sheet A">
          <Workbook.Column label="User Name" value="UserName"  />
            <Workbook.Column label="Start Time" value="start_time"  />
            <Workbook.Column label="End Time" value="end_time"  />
            <Workbook.Column label="Week" value="week"  />
            <Workbook.Column label="Date" value="date"  />
            <Workbook.Column label="Region" value="region"  />
            <Workbook.Column label="Container Number" value="container_number"  />
            <Workbook.Column label="Received Time" value="received_time"  />
            <Workbook.Column label="Charges" value="charges"  />
            <Workbook.Column label="PC" value="pc"  />
            <Workbook.Column label="CC" value="cc"  />
            <Workbook.Column label="Type" value="type"  />
            <Workbook.Column label="Unit" value="Unit"  />
            <Workbook.Column label="TAT Time" value="tat_time"/>
          </Workbook.Sheet> 
        </Workbook>
     

      );
  }
  onrefresh() {
    this.setState({
        region:'',
        start_time:new Date(),
        updated_start_time:new Date(),
        date:moment(new Date()).format('MM/DD/YYYY'),
        week:getCurrentWeek(new Date()).toString(),
        end_time:'',
        container_number:'',
        received_time:'',
        charges:'',
        pc:'',
        cc:'',
        unit:'',
        type:'',
        tat_time:'',
        receivetime_format:false,
        is_submit:false,
    })
   
  } 
    render()
    { 
        const{region,type,container_number,unit,tat_time,regiondata,received_time,domesticinvoicecount,domesticinvoicecountlast,
        cc,pc,charges,start_time,end_time,date,week,is_submit,type_Data,loading}=this.state
        const {match,username,locale,languageData,receivetime_format} = this.props
        return (
            <>
            <title>{onChangeLanguage(locale,'Domestic Invoice',languageData)}</title>
            <Row>
              <Colxx xxs="12">


              <div className = "row">
                      <div className = "col-md-8">
                      <Breadcrumb heading={onChangeLanguage(locale,'Domestic Invoice',languageData)} match={match} />
                    </div>
                    <div className = "col-md-2" >
                        <h2 style = {{marginTop:'15px'}}>Total EQ : {domesticinvoicecount}</h2>
                        </div>
                        <div className = "col-md-2">
                            <h2  style = {{marginTop:'15px'}}>Last EQ : {domesticinvoicecountlast}</h2>
                        </div>
              
                  </div>


                
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
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'User Name',languageData)}</a><br></br>{username}</Label>
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Start Time',languageData)}</a><br></br> 
                            {moment(start_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'End Time',languageData)}</a><br></br>  
                            {end_time !== '' && moment(end_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Week',languageData)}</a>
                            <br></br>{week}</Label>
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Date',languageData)}</a>
                            <br></br> {date}</Label>
                        </div>
                    </div>
                </div>  

              
            <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>

                <div className = "row">
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Region',languageData)} <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && region === ''?  "error-border-select-paste":"react-select fontstyle" }                          
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={regiondata.filter(option =>option.value === region)}
                            options={regiondata}
                            onChange={(option) => this.onChangeRegion(option.value)}
                          />
                        </div>
                      
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Container Number',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input 
                             className = {is_submit === true && container_number === ''?  "error-border":"fontstyle text-background" }    
                            // placeholder = 'End date'
                            value = {container_number}  
                            onChange= {(e)=>this.setState({container_number : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Received Time',languageData)}
                            <a style = {{color :'red'}}>*</a>
                            {(is_submit === true && received_time === '')  && <a className ="fontstyle mandatory-label">{onChangeLanguage(locale,'Mandatory Field',languageData)}</a>}
                            </Label>
                            <DatePicker
                                    selected={received_time}
                                    className = "text-background-paste"
                                    onChange={(date) => this.onChangetime(date)}
                                    />
                           
                        </div>
                         <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Charges',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && charges === ''?  "error-border":"fontstyle text-background" }    
                            // placeholder = 'End date'
                            value = {charges}  
                            onChange= {(e)=>this.setState({charges : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'PC',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && pc === ''?  "error-border":"fontstyle text-background" }    
                            // placeholder = 'End date'
                            value = {pc}  
                            onChange= {(e)=>this.setState({pc : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'CC',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {is_submit === true && cc === ''?  "error-border":"fontstyle text-background" }    
                            // placeholder = 'End date'
                            value = {cc}  
                            onChange= {(e)=>this.setState({cc : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin ">
                            <Label  className = "fontstyle normal-font" > 
                            {onChangeLanguage(locale,'Type',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                                <Select  
                                className = {is_submit === true && type === ''?  "error-border-select-paste":"react-select fontstyle" }  
                                
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={type_Data.filter(option =>option.value === type)}
                                options={type_Data}
                                onChange={(option) => this.setState({  type: option.value,unit:option.unit })}
                             />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Unit',languageData)}
                            <a style = {{color :'red'}}>*</a><br></br>{unit}</Label>
                            {/* <Input  
                            className = {is_submit === true && unit === ''?  "error-border":"fontstyle text-background" }      
                            // placeholder = 'End date'
                            value = {unit}  
                            onChange= {(e)=>this.setState({unit : e.target.value})} 
                            /> */}
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'TAT Time',languageData)}
                            <br></br>{tat_time}</Label>
                           
                        </div>
                    </div>
                    <div className = "row text-center" >
                        {/* {this.renderTemplate()} */}
                        <Button                          
                            className = "button-width" color="primary"  
                                        onClick={()=>this.onSubmit()}
                                >
                                {onChangeLanguage(locale,'Save',languageData)} 
                            </Button>
                            <Button className = "button-width" color="secondary" 
                                 onClick={()=>this.onrefresh()}
                                >
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

   })(Sidebar)
  );

