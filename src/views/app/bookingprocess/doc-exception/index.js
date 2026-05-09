import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import {onChangeLanguage,convertLocalToUTCDate,getValue} from '../../../../helper'
import Select from 'react-select';
import moment from 'moment';
import{exceptionService} from '../../../../redux/bookingprocess/docexception/saga'
import { createNotification } from '../../../../toast';
import Workbook from 'react-excel-workbook'
import * as clipboard from 'clipboard-polyfill/text'
import {getValueDoc_Z1910} from '../../pasteData'
import { Table,Checkbox } from 'antd';
import{exceptiontypeService} from '../../../../redux/bookingprocess/exceptiontype/saga'
import{issuecodeService} from '../../../../redux/bookingprocess/issuecode/saga';
import{statusexceptionService} from '../../../../redux/bookingprocess/statusexception/saga';

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        id:0,
        shipment:'',
        mtd:'',
        user_id:'',
        start_datetime:'',
        end_datetime:'',
        team:'',
        exception_type:'',
        comments:'',
        status:'',
        region:'',
        area:'',
        sub_area:'',
        action_party:'',
        exception_number:'',
        exception_code:'',
        group:'',
        team_data:[],
         teamdata:[],
         areadata:[],
         area_data:[],
         regiondata:[],
        exceptiondata:[],
        statusdata:[],
        searchdata:[],      
         is_submit:false,
         is_search:false,
         loading:false,
         updated_start_time:new Date(),
         tableindex:0,
         tabledata:[],
         isDataPasted: false,
        docexceptioncount:'',
        docexceptioncountlast:'',
        isSubmitting: false
    }

    }

    componentDidMount() {
       
        this.setState({
            start_datetime:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
        })
      this.fetchstatus()
      this.fetchexceptiontype()
      this.fetchissie(),
      this.fetchDocexceptionCount()
    }
    fetchDocexceptionCount(){
      this.setState({loading:true})
      const {username} = this.props
      //console.log(username)
      exceptionService.fetchdocexceptioncount(username)
      .then((res) => {
         if(res.status)   { 
                let filterstatus = res.data;
                let lastdata = res.lastcount;
                this.setState({ 
                  docexceptioncount:filterstatus, 
                  docexceptioncountlast:lastdata     
                }) 
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})
  
  }
    fetchissie() {  
      const {is_search}=this.state
      console.log('is_search',is_search)
      this.setState({
        loading : true
      })
      issuecodeService.fetchapi()
        .then((res) => { 
          this.setState({   
        loading : false 
                
          }) 
          if(res.status)
            {
              let filterstatus = (res.data).filter(item => item.status === 1)
              var regionlist = filterstatus.map(function (cusmaidid) {
                return { label: cusmaidid.region, value: cusmaidid.id.toString(),text: cusmaidid.region };
              });
              var arealist = filterstatus.map(function (cusmaidid) {
                return {
                  label: cusmaidid.area, text: cusmaidid.name,
                  value: cusmaidid.id.toString(), region: cusmaidid.region,
                };
              });
              var teamlist = filterstatus.map(function (cusmaidid) {
                return {
                  label: cusmaidid.team, text: cusmaidid.name,
                  value: cusmaidid.id.toString(), area: cusmaidid.area,
                };
              });
              var eallyUniqueArr =  regionlist.filter((v,i,a)=>a.findIndex(t=>(t.label === v.label && t.label===v.label))===i)
              var areaUniqueArr =  arealist.filter((v,i,a)=>a.findIndex(t=>(t.label === v.label && t.label===v.label))===i)
              var teamUniqueArr =  teamlist.filter((v,i,a)=>a.findIndex(t=>(t.label === v.label && t.label===v.label))===i)
              if(is_search === false)
              {
              this.setState({
                regiondata: eallyUniqueArr,
                issuecode_data:res.data  , 
                areadata:areaUniqueArr,
                team_data:teamUniqueArr,

              })
            }else{
              this.setState({
                regiondata: regionlist,
                areadata:arealist,
                team_data:teamlist,

              })
            }
            }   else
            {
              this.setState({ 
                data:[]  , 
                         
              }) 
            }               
      
      })
      .catch((error) => { 
        this.setState({
          loading : false
        })
        });   
   }
    fetchstatus() {
        this.setState({loading:true})
        statusexceptionService.fetchapi()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var requestlist = filterstatus.map(function(response) {
                      return  {label : response.name ,value : response.id.toString()};
                   });  
                    this.setState({
                    statusdata :  requestlist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     } 
     fetchexceptiontype() {
      this.setState({loading:true})
      exceptiontypeService.fetchapi()
      .then((res) => {
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var requestlist = filterstatus.map(function(response) {
                    return  {label : response.name ,value : response.id.toString()};
                 });  
                  this.setState({
                  exceptiondata :  requestlist
                  })
                 
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})
   }  
  
    
     onSubmit() { 
      this.setState({ isSubmitting: true });
        const { id,shipment,mtd,region,area,exception_code,end_datetime ,team,exception_type ,
          comments,status,status_of_case,sub_area,action_party,
          exception_number,updated_start_time,group} = this.state;
       
        if(shipment !==''&& sub_area!=='' &&region!=='' && area !=='' && 
        action_party !=='' && group !=='' && status_of_case !=='' && exception_type !=='' && exception_code !=='' && status !=='')
        {
            const end_datetime =  moment(new Date()).format('MM/DD/YYYY hh:mm:ss a') 
            const {username} = this.props
            let   end_date=convertLocalToUTCDate(new Date()),
            start_date=convertLocalToUTCDate(updated_start_time),
              updatedstarttime=convertLocalToUTCDate(updated_start_time),
              updated_end_time=convertLocalToUTCDate(new Date())
            exceptionService.createexception(id,username,region,area,sub_area,shipment,mtd,exception_number,action_party,group,
              exception_code,exception_type,status,comments,start_date,end_date,updatedstarttime ,updated_end_time)
              .then((res) => { 
                this.setState({  
                  end_datetime:end_datetime,
                  loading : false,
                  isSubmitting: false   
                }) 
                if(res.status)
                  {
                    createNotification('Created','success','filled')
                    this.onrefresh()
                    this.fetchDocexceptionCount()
                  }   
                  else
                    {
                      createNotification(res.message,'error','filled');
                    }    
            })
            .catch((error) => { 
              this.setState({
                loading : false,
                isSubmitting: false 
              })
            });
        }
        else
        {
          this.setState({
            is_submit:true,
            isSubmitting: false 
        })
          createNotification('Please fill mandatory field','error','filled')
        }
      }
    
//       onChangetime(date)
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
       
        start_datetime:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
        updated_start_time:new Date(),
        end_datetime:'',
        region:'',
        area:'',
        sub_area:'',
        shipment:'',
        mtd:'',
        exception_number:'',
        action_party:'',
        group:'',
        exception_code:'',
        exception_type:'',
        status:'',
        comments:'',
        is_submit:false,
        is_search:false,
        tableindex:0,
            tabledata:[],
            id:0
    })
    this.fetchissie()
  }
    onCopy()
    {
        navigator.clipboard.writeText(this.state.region)
    }
 
    handleteam = (selectedOptions) => {
        this.setState({team : selectedOptions.value})  
    }
    
    handleexception = (selectedOptions) => {
        this.setState({exception_type : selectedOptions.value})  
    }
    
    handlestatus = (selectedOptions) => {
        this.setState({status : selectedOptions.value})  
    }
    setValue(record,id)
    {
    
      let nn =[]
      nn.push(record)
          this.setState({
            tabledata:nn,
            tableindex:id
          })
        const {team_data,areadata}=this.state
        if(record !== null && record)
        {
           this.setState({
             id:record.id,
            region:record.region,
            area:record.area,
            sub_area:record.team,
            shipment:record.shipment,
            mtd:record.mtd,
            exception_number:record.exception_no,
            action_party:record.action_party,
            start_datetime:moment(record.start_time).format('MM/DD/YYYY hh:mm:ss a'),
            end_datetime:moment(record.end_time).format('MM/DD/YYYY hh:mm:ss a'),
            group:record.group,
            exception_code:record.exception_reason,
            exception_type:record.exception_type,
            status:record.status_of_exception,
            comments:record.comments,
            teamdata:team_data,
            area_data:areadata,
            is_submit:false,
            is_search:true
            })
        }
        this.fetchissie()
    } 
    nextTitle =(idx, arr) =>{
      console.log('arridx',idx)
      var i = idx + 1;
      var i = i % arr.length;
      
      this.setValue(arr[i],i)
      this.setState({
        tableindex:i
      })
    }
    
     prevTitle=(idx, arr) =>{
      if (idx === 0) {
        var i = arr.length -1;
       
      } else {
        var i = idx -1;
        
      }
      this.setState({
        tableindex:i
      })
      this.setValue(arr[i],i)
    }
    fetchData() {
      const {shipment,exception_number,tableindex} = this.state 
      if(shipment !== "" || exception_number !=='')
      {
          this.setState({
              loading : true,
              is_submit:false
          })
          exceptionService.search(shipment,exception_number)
          .then((res) => {
             
              this.setState({loading:false})
              this.onrefresh()
          if(res.status)   { 
            let dta =res.data
            this.setValue(dta[tableindex],tableindex)
            
              this.setState({
                searchdata:res.data
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
        createNotification('Please Enter Booking Number or Exception Number','error','filled')
      }
   }
    renderTemplate()
    {
      const {languageData,locale} = this.props
    
      const column_name = ["GSC User ID","Region", "Area", "Sub Area","Booking Number", "MTD","Exception Number","Action Party",
      "Group","Exception Reason Code","Exception Type","Status of exception","Comments","Start DateTime","End DateTime"]
        return(
          
          <Workbook filename="Doc Exception.xlsx" element={
              <Button className = "button-width"
               color="secondary" >
              {onChangeLanguage(locale,'Download Template',languageData)} 
              </Button>
            }>
            <Workbook.Sheet data={[]} name="Sheet A">
            {column_name && column_name.map((value,index) =>
             <Workbook.Column label={value} value={value}  />
             )}
            </Workbook.Sheet> 
          </Workbook>
       
    
        );
    }
    onChangeFileUpload(files)
    {
      const {tableindex}=this.state
      this.setState({
        loading : true
      })
      exceptionService.fileUpload(files[0])
        .then((res) => { 
          if(res.status)
          {
            if(res.data.status)   
            {   
              let dta =res.data
              let dtabee=dta.data
              this.setValue(dtabee[tableindex],tableindex)
                this.setState({
                  searchdata:dta.data,
                  is_search:true
                })
              createNotification('Uploaded','success','filled')
              this.fetchissie()
            }  
            else{
              createNotification(res.data.message,'error','filled')
              this.setState({
                  loading : false
                })
            }  
          }
            
      
      })
      .catch((error) => { 
        this.setState({
          loading : false
        })
        });
    }
   
       
     
        async onPasteZ1910() {
          clipboard.readText().then((text)=>{
              var record = getValueDoc_Z1910(text)
          console.log("kjbkj " , JSON.stringify(record))
          this.setState({
              exception_number:record.exception_number,
              action_party:record.action_party,
              group:record.group,
              exception_code:record.exception_code,
              mtd:record.mtd,
              shipment:record.shipment,
              
            })
             
          });
          this.setState({
            isDataPasted: true
        }); 
      } 
      getArrayValue(array, value, key) {
        var list = []
        if (array && array !== null && value !== '' && value !== null) {
          list = array.filter(item => item[key] === value)
        }
        return list
      }
      handlechangeregion = (selectedOptions) => {
        const {areadata,regiondata}=this.state
        this.setState({
          region : selectedOptions.value,
          area_data:this.getArrayValue(areadata, selectedOptions.label, 'region'),sub_area:'',area:''
          })  
      }
      handlechangearea = (selectedOptions) => {
        const {team_data}=this.state
        this.setState({
          area : selectedOptions.value,
          teamdata:this.getArrayValue(team_data, selectedOptions.label, 'area'),sub_area:''
          })  
      }
    render()
    {
        const {match,locale,languageData,username} = this.props
        const { shipment,mtd,user_id,start_datetime,end_datetime ,team,exception_type ,isDataPasted,
          comments,status,exceptiondata,statusdata,region,area,sub_area,action_party,docexceptioncount,docexceptioncountlast,
          exception_number,exception_code,group, is_submit,is_search,searchdata,teamdata,regiondata,area_data,tabledata,tableindex} = this.state
          const  columsss = [
            {
              title: onChangeLanguage(locale,'GSC User Id',languageData),
              dataIndex: 'user_id',
              key: 'user_id',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'200px'}}>
                  {text}
                </div>)
            },
            {
              title: onChangeLanguage(locale,'Region',languageData),
              dataIndex: 'region',
              key: 'region',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                  {getValue(regiondata, 'value', 'label', text)}
                  </div>),
            },
            {
              title: onChangeLanguage(locale,'Area',languageData),
              dataIndex: 'area',
              key: 'area',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                  {getValue(area_data, 'value', 'label', text)}
                </div>),
            },
            {
              title: onChangeLanguage(locale,'Sub Area',languageData),
              dataIndex: 'team',
              key: 'team',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                  {getValue(teamdata, 'value', 'label', text)}
                 
                </div>),
            },
              {
                title: onChangeLanguage(locale,'Booking Number',languageData),
                dataIndex: 'shipment',
                key: 'shipment',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'200px'}}>
                    {text}
                  </div>)
              },
              {
                title:onChangeLanguage(locale,'MTD',languageData),
                dataIndex: 'mtd',
                key: 'mtd',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>
                  {text}
                  </div>),
              },
              {
                title: onChangeLanguage(locale,'Exception Number',languageData),
                dataIndex: 'exception_no',
                key: 'exception_no',
                render: (text, record) => ( 
                    <div className="row d-flex justify-content-center"  style = {{padding:'2px',width:'200px'}}>
                      {text}
                    </div>)
              },
              {
                title: onChangeLanguage(locale,'Action Party',languageData),
                dataIndex: 'action_party',
                key: 'action_party',
                render: (text, record,index) => ( 
                    <div   style = {{padding:'2px',width:'200px'}}>{text}
                    </div>)
              },
                {
                  title:onChangeLanguage(locale,'Group',languageData) ,
                  dataIndex: 'group',
                  key: 'group',
                  render: (text, record) => ( 
                    <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                      {text}
                    </div>),
                },
               
                {
                  title:onChangeLanguage(locale,'Exception Reason Code',languageData) ,
                  dataIndex: 'exception_reason',
                  key: 'exception_reason',
                  render: (text, record) => ( 
                    <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                      {text}
                    </div>),
                },
                {
                  title:onChangeLanguage(locale,'Exception Type',languageData) ,
                  dataIndex: 'exception_type',
                  key: 'exception_type',
                  render: (text, record) => ( 
                    <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                      {getValue(exceptiondata, 'value', 'label', text)} 
                    </div>),
                },
                {
                  title:onChangeLanguage(locale,'Status of exception',languageData) ,
                  dataIndex: 'status_of_exception',
                  key: 'status_of_exception',
                  render: (text, record) => ( 
                    <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                      {getValue(statusdata, 'value', 'label', text)} 
                    </div>),
                },
                {
                  title:onChangeLanguage(locale,'Comments',languageData) ,
                  dataIndex: 'comments',
                  key: 'comments',
                  render: (text, record) => ( 
                    <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                      {text}
                    </div>),
                },
                {
                  title: onChangeLanguage(locale,'Start Date Time',languageData),
                  dataIndex: 'start_time',
                  key: 'start_time',
                  render: (text, record,index) => ( 
                    <div  style = {{padding:'2px',width:'200px'}}>
                      {text !== '' ? moment(text).format('MM/DD/YYYY hh:mm:ss a') :''} 
                    </div>)
                },
                {
                  title: onChangeLanguage(locale,'End Date Time',languageData),
                  dataIndex: 'end_time',
                  key: 'end_time',
                  render: (text, record,index) => ( 
                    <div  style = {{padding:'2px',width:'200px'}}>
                     {text !== '' ? moment(text).format('MM/DD/YYYY hh:mm:ss a') :''} 
                    </div>)
                },
        ]
        return (
            <>
            <Row>
              <Colxx xxs="12"> 
                <div className = "row">
                      <div className = "col-md-8">
                      <Breadcrumb heading="DOC Exception" match={match} />
                    </div>
                    {/* <div className = "col-md-3">
                    <Button className = "button-width" color="primary" style= {{}}>
                        <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
                        <a style= {{margin :'0px'}} > {onChangeLanguage(locale,'Upload',languageData)}</a>
                        <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                            className = "filepicker_customButton"
                            style = {{width : '26%',marginLeft :'-22%'}}
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
                    </Button>
                    {this.renderTemplate()}
                  </div> */}
                  <div className = "col-md-2">
                          <h2 style = {{marginTop:'15px'}}>Total EQ : {docexceptioncount}</h2>
                        </div>
                        <div className = "col-md-2">
                            <h2  style = {{marginTop:'15px'}}>Last EQ : {docexceptioncountlast}</h2>
                        </div>
                  </div>
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
            <div className = "" style = {{padding:'0px 10px',borderRadius:'10px',marginBottom:'10px'}}>
                    <div className = "row" >
                    <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'GSC user ID',languageData)}</a><br></br> 
                            {username}</Label>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Start Date Time',languageData)}</a><br></br>{start_datetime}</Label>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'End Date Time',languageData)}</a><br></br>{end_datetime}</Label>
                        </div>
                        
                    </div>
                </div> 
                <div className = "publishuser-card-component" style = {{borderRadius:'10px'}}>
                   
                <div className = "publish-title" >
                                 <Row>
                                     <Colxx xxs="4">
                                        <Label  className = "fontstyle" 
                                        style = {{fontWeight:700,fontSize:'15px'}}>DOC Exception</Label>
                                    </Colxx>
                                </Row>
                            </div>
                    <div className = "row" style = {{padding:'10px'}}>
                    <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Region Name',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select
                            className = {is_submit === true && region === ''?  "error-border-select":"react-select fontstyle" }  
                            classNamePrefix="react-select"
                            name="form-field-name"
                            placeholder={onChangeLanguage(locale, 'Region', languageData)}
                            value={regiondata.filter(option => option.value === region)}
                            options={regiondata}
                            isDisabled={is_search === true ? true : false}
                            onChange={this.handlechangeregion}
                            // onChange={({ label }) => this.setState({ region: label, area: '', sub_area: '' })}
                          />
                        </div>
                    <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Area Name',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select
                            className = {is_submit === true && area === ''?  "error-border-select":"react-select fontstyle" }  
                            classNamePrefix="react-select"
                            name="form-field-name"
                            placeholder={onChangeLanguage(locale, 'Area', languageData)}
                            value={area_data.filter(option => option.value === area)}
                            options={area_data}
                            isDisabled={is_search === true ? true : false}
                            onChange={this.handlechangearea}
                            // onChange={({ label }) => this.setState({ area: label, sub_area: '' })}
                          />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Sub Area Name',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select
                            className = {is_submit === true && sub_area === ''?  "error-border-select":"react-select fontstyle" }  
                              classNamePrefix="react-select"
                              name="form-field-name"
                              placeholder={onChangeLanguage(locale, 'Sub Area', languageData)}
                              value={teamdata.filter(option => option.value === sub_area)}
                              options={teamdata}
                              isDisabled={is_search === true ? true : false}
                              onChange={({ value }) => this.setState({ sub_area: value })}
                            />
                        </div>
                    <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Booking Number',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                    <Input  className={is_submit === true && shipment === ''?  "error-border-paste":"fontstyle text-background-paste" }
                                 value = {shipment}  
                                 type="number"
                                 disabled={is_search || isDataPasted}
                                onChange= {(e)=>this.setState({shipment : e.target.value})} 
                                />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'MTD',languageData)}</Label>
                                    <Input  className={"fontstyle text-background-paste" }
                              // type="number"
                                value = {mtd}  
                                disabled={is_search || isDataPasted}
                                onChange= {(e)=>this.setState({mtd : e.target.value})} 
                                />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Exception Number',languageData)}</Label>
                                    <Input  className={"fontstyle text-background-paste" }
                                 value = {exception_number} 
                                 disabled={is_search || isDataPasted}
                                onChange= {(e)=>this.setState({exception_number : e.target.value})} 
                                />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Action Party',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                    <Input  className={is_submit === true && action_party === ''?  "error-border-paste":"fontstyle text-background-paste" }
                                 value = {action_party}  
                                 disabled={is_search || isDataPasted} 
                                onChange= {(e)=>this.setState({action_party : e.target.value})} 
                                />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Group',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                    <Input  className={is_submit === true && group === ''?  "error-border-paste":"fontstyle text-background-paste" }
                                 value = {group} 
                                 disabled={is_search || isDataPasted}  
                                onChange= {(e)=>this.setState({group : e.target.value})} 
                                />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Exception Reason Code',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                    <Input  className={is_submit === true && exception_code === ''?  "error-border-paste":"fontstyle text-background-paste" }
                                 value = {exception_code}  
                                 disabled={is_search || isDataPasted} 
                                onChange= {(e)=>this.setState({exception_code : e.target.value})} 
                                />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Exception Type',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            
                                       <Select  
                                       className={is_submit === true && exception_type === ''?  "error-border-select":"react-select fontstyle" }

                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={exceptiondata.filter(option =>option.value === exception_type)}
                                        options={exceptiondata}
                                        onChange={this.handleexception}
                                    />
                                    </div>
                       <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Status of exception',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select  
                                       className={is_submit === true && status === ''?  "error-border-select":"react-select fontstyle" }

                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={statusdata.filter(option =>option.value === status)}
                                        options={statusdata}
                                        onChange={this.handlestatus}
                                    />
                        </div> 
                        <div className = "col-md-12 space-margin">
                             <Label  className = "fontstyle normal-font" >Comments</Label>
                           <textarea  className = "fontstyle textarea-background"  
                            placeholder = ''
                            value = {comments}  
                            onChange= {(e)=>this.setState({comments : e.target.value})} 
                            />
                        </div>            
                                 </div>
                 <div className = "row text-center" >
                 <Button className = "button-width" color="secondary"
                        onClick={()=>this.onPasteZ1910()}
                        >
                          {onChangeLanguage(locale,'Paste Z1910',languageData)}
                  </Button>   
                  <Button 
                            className = "button-width" color="secondary"  
                                        onClick={()=>this.fetchData()}
                                >
                                {onChangeLanguage(locale,'Search',languageData)} 
                            </Button>
                       <Button className = "button-width" color="primary"                     
                        onClick={()=>this.onSubmit()} disabled={this.state.isSubmitting}
                                >
                               {onChangeLanguage(locale,'Save',languageData)} 
                            </Button>                          
                        <Button className = "button-width"                       
                        color="secondary"  
                        onClick={()=>this.onrefresh()}
                                >
                                {onChangeLanguage(locale,'Refresh',languageData)}
                            </Button>  
                            </div>                       
           
                </div>   
                {is_search == true  &&
                <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                
                 <div style = {{padding:'10px'}}>
                    <Table 
                    dataSource={tabledata} 
                    columns={columsss}
                    // rowSelection={rowSelection}
                    tableLayout="auto"
                    rowKey="id"
                    scroll={{ y: 240, x: "max-content" }}
                    pagination={false} 
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}/>
                   
                    </div> 
                    <div className = "row text-center" style = {{margin:'0px 5px'}}>
                    <Button className = "button-width" color="primary"  
                    disabled={searchdata.length >0 ? false :true}
                                           onClick={()=>this.prevTitle(tableindex,searchdata)}>
                            {onChangeLanguage(locale,'Prev',languageData)} 
                            </Button>
                            <Button className = "button-width" color="secondary" 
                                    onClick={()=>this.nextTitle(tableindex,searchdata)}
                                    disabled={searchdata.length >0 ? false :true}>
                            {onChangeLanguage(locale,'Next',languageData)} 
                            </Button>
                            </div>
            </div> 
           } 
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

