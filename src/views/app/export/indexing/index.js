import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import{IndexingService} from '../../../../redux/Export/indexingprocess/saga'
import {onChangeLanguage,convertLocalToUTCDate,convertUTCToLocalDate} from '../../../../helper'
import { createNotification } from '../../../../toast';
import Loading from "react-fullscreen-loading";
import Workbook from 'react-excel-workbook'
import moment from 'moment';
import DatePicker from "../../datePicker";
import * as clipboard from "clipboard-polyfill/text";
import {getValue_D1100} from '../../pasteData'

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data:[],
        loading:false,
        shipment_no:'',
        type:'',
        location:'',
        sender_id:'',
        user_id:'',
        date_time:'',
        start_time: new Date(),
        updated_start_time:new Date(),
        end_time:'',
        closed:'',
        is_submit:false,
        isDataPasted: false,
        indexingcount:'',
        indexingcountlast:'',
      };
    }
    componentWillMount()
    {
        // this.fetchData()
        this.fetchIndexingCount()
    }
    fetchIndexingCount(){
      this.setState({loading:true})
      const {username} = this.props
      //console.log(username)
      IndexingService.fetchindexingcount(username)
      .then((res) => {
         if(res.status)   { 
                let filterstatus = res.data;
                let lastdata = res.lastcount;
                this.setState({ 
                  indexingcount:filterstatus, 
                  indexingcountlast:lastdata     
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
      IndexingService.fetchindexingprocess()
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
    
    validDate(date)
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
        
 
         return date_value

     }
     validTime(timess){
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

         
      }
        return timevalue
    
    }
    async onPasteD1100() {
      clipboard.readText().then((text)=>{
          var record = getValue_D1100(text)
      console.log("kjbkj " , JSON.stringify(record))
        this.setState({
          shipment_no:record.shipment_no,
          type:record.type,
          location:record.location,
          sender_id:record.sender_id,
        })
        var date = this.validDate(record.date), time = this.validTime(record.time)
        if(date !=='' && time !== '')
        {
            var date1 = moment(date).format('MM/DD/YYYY')
            var date_time = new Date(date1 + ' ' + time)
            this.setState({
              date_time:convertLocalToUTCDate(date_time),
            })
        }
        else
        {
          createNotification(`Please use format Date (MM/DD/YYYY) Time (hh:mm:ss AM/PM)`,'error','filled') 
        }

      });
      this.setState({
        isDataPasted: true
    }); 
  }
    onCopy()
    {
        navigator.clipboard.writeText(this.state.shipment_no)
    }
   
      onChangeFileUpload(files)
    {
      const {username}=this.props
      this.setState({
        loading : true
      })
      IndexingService.fileUpload(files[0],username)
        .then((res) => { 
          if(res.status)
          {
            this.setState({
              loading : false
            })
            if(res.data.status)   
            {   
           
              createNotification('Uploaded','success','filled')
              
            }    
            else{
              this.setState({
                loading : false
              })
              createNotification(res.data.message,'error','filled')
            }
          }
            
      
      })
      .catch((error) => { 
        this.setState({
          loading : false
        })
        });
    }
    onSubmit() { 
      const {shipment_no,type,location,sender_id,date_time,start_time,updated_start_time} = this.state;
     
     var datetime=moment(convertUTCToLocalDate(date_time)).format('MM/DD/YYYY hh:mm:ss a')
      if(shipment_no !== "" && type!== "" && location !== "" && sender_id!== ""  && date_time !=='' )
      {
        const end_time= new Date(), updated_end_time= new Date() 

        this.setState({
          end_time:end_time
      })    
      const {username} = this.props
        this.setState({
          loading : true
        })
        IndexingService.createindexing(shipment_no,type,location,sender_id,username,datetime,
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
                this.fetchIndexingCount()
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
        shipment_no:'',
        type:'',
        location:'',
        sender_id:'',
        date_time:'',
        end_time:'',
        is_submit:false
      })
     
    } 
  renderTemplate()
  {
    const {languageData,locale} = this.props
    const {data} = this.state
    var array = data.map(record=> {
          return {
            'MTD Number' : record.shipment_no,
            'Type' : record.type,
            'Location' : record.location,
            'Sender Id' : record.sender_id,
            'User Id' : record.user_id,
            'Date & Time Item Received':record.date_time,
            'End Time' : record.end_time,
        };
      })
      return(
        
        <Workbook filename="Indexing_process.xlsx" element={
          <Button className = "button-width" color="secondary"  style={{width:'150px'}}
          >{ onChangeLanguage(locale,'Download',languageData)}  
          </Button>
		      }>
          <Workbook.Sheet data={array} name="Sheet A">
          <Workbook.Column label="MTD Number" value="MTD Number"/>
          <Workbook.Column label="Type" value="Type"/>
            <Workbook.Column label="Location" value="Location"/>
            <Workbook.Column label="Sender Id" value="Sender Id"/>
            <Workbook.Column label="User Id" value="User Id"/>
            <Workbook.Column label="Date & Time Item Received" value="Date & Time Item Received"/>
            <Workbook.Column label="End Time" value="End Time"/>
          </Workbook.Sheet> 
        </Workbook>
     

      );
  }
  onChangetime(date)
  {
    console.log("lhnkjh " ,date)
    var time = moment(date).format('HH:mm:ss')
    if(time !== "00:00:00")
    {
      this.setState({date_time  : date})
    }
   
  }

    render()
    {
        const {match,languageData,locale,username} = this.props
        const {shipment_no,type,location,sender_id,date_time,end_time,loading,is_submit,isDataPasted,indexingcount,indexingcountlast} = this.state
       
        return (
            <>
            <title>{onChangeLanguage(locale,'Indexing Process',languageData)}</title>
            {loading && 
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
          }
            <Row>
              <Colxx xxs="12">
              <div className = "row">
                      {/* <div className = "col-md-4">
                      <Breadcrumb heading={onChangeLanguage(locale,'Indexing Process',languageData)} match={match} />
                    </div>
                    <div className = "col-md-2">
                        <Button className = "button-width" color="primary" style= {{width :'100%'}}>
                            <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
                            <a style= {{margin :'0px'}} > Upload</a>
                            <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                                className = "filepicker_customButton"
                                style = {{width : '80%',marginLeft :'-56%'}}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
                        </Button>
                    </div>
                    <div className = "col-md-2" >
                    {this.renderTemplate()}
                    </div>
                    <div className = "col-md-2" >
                      <h2 style = {{marginTop:'15px'}}>Total EQ : {indexingcount}</h2>
                    </div>
                    <div className = "col-md-2">
                        <h2  style = {{marginTop:'15px'}}>Last EQ : {indexingcountlast}</h2>
                  </div> */}



                  <div className="col-md-5">
                <Breadcrumb heading={onChangeLanguage(locale, 'Indexing Process', languageData)} match={match} />
              </div>
              
              <div className="col-md-3 space-margin">
                      <Button className = "button-width" color="primary">
                            <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
                            <a style= {{margin :'0px'}} > {onChangeLanguage(locale,'Upload',languageData)} </a>
                            <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                                className = "filepicker_customButton"
                                style = {{width : '26%',marginLeft :'-22%'}}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
                        </Button>
                        {this.renderTemplate()}
                        </div>
                     <div className = "col-md-2">
                        <h2 style = {{marginTop:'15px'}}>Total EQ : {indexingcount}</h2>
                    </div>
                    <div className = "col-md-2">
                        <h2  style = {{marginTop:'15px'}}>Last EQ : {indexingcountlast}</h2>
                    </div>


                  </div>
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row" style = {{marginBottom:'5px'}}>
                    <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'User ID',languageData)}
                           <br></br>{username}</Label>
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'End Date Time',languageData)}
                            <br></br> {end_time!==''&& moment(end_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'MTD Number',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && shipment_no === ''?  "error-border-paste":"fontstyle text-background-paste" }    
                            placeholder = ''
                            value = {shipment_no}
                            disabled={isDataPasted}  
                            onChange= {(e)=>this.setState({shipment_no : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Type',languageData)} 
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && type === ''?  "error-border-paste":"fontstyle text-background-paste" }    
                            placeholder = ''
                            value = {type}  
                            disabled={isDataPasted}
                            onChange= {(e)=>this.setState({type : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Location',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && location === ''?  "error-border-paste":"fontstyle text-background-paste" }   
                                value = {location}  
                                disabled={isDataPasted}
                                onChange= {(e)=>this.setState({location : e.target.value})} ></Input>
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Sender ID',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input 
                            className = {is_submit === true && sender_id === ''?  "error-border-paste":"fontstyle text-background-paste" }   
                                value = {sender_id}  
                                disabled={isDataPasted}
                                onChange= {(e)=>this.setState({sender_id : e.target.value})} ></Input>
                        </div>
                       
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Date & Time Item Received-paste',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <p1 className = 'fontstyle mandatory-label'>{is_submit === true && date_time === '' && `${onChangeLanguage(locale,'Mandatory Field',languageData)}` }</p1>
                                <DatePicker
                                 selected={date_time}
                                 className = "text-background-paste"
                                 onChange={(date) => this.onChangetime(date)}
                                 disabled={isDataPasted}
                                 />
                        </div>
                        
                       
                    </div>
                        <div  className = "row text-center" >
                          <Button className = "button-width" color="secondary"
                                onClick={()=>this.onPasteD1100()}
                                >{onChangeLanguage(locale,'Paste D1100',languageData)}</Button> 
                        
                          <Button className = "button-width" color="primary" 
                                onClick={()=>this.onSubmit()}
                                >{onChangeLanguage(locale,'Save',languageData)} </Button> 
                     
                             <Button className = "button-width" color="secondary"
                                    onClick={()=>this.onrefresh()}
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

