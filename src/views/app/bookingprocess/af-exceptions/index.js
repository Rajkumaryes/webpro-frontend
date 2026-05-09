import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import Loading from "react-fullscreen-loading";
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import {onChangeLanguage,convertLocalToUTCDate,getValue} from '../../../../helper'
import Select from 'react-select';
import moment from 'moment';
import Workbook from 'react-excel-workbook'
import * as clipboard from "clipboard-polyfill/text";
import {getValueAF_Z1910} from '../../pasteData'
import { createNotification } from '../../../../toast';
import DatePickerDate from "../../datePickerDate";
import { Table,Checkbox } from 'antd';
import{AfExceptionServiceService} from '../../../../redux/bookingprocess/afexceptionservice/saga'
import{exceptiontypeService} from '../../../../redux/bookingprocess/exceptiontype/saga'
import{statusexceptionService} from '../../../../redux/bookingprocess/statusexception/saga'
import{issuecodeService} from '../../../../redux/bookingprocess/issuecode/saga';


class BookingSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
            loading:false,
            id:0,
            region:'',
            area:'',
            team:'',
            user_id:'',
            shipment:'',
            dp_number:'',
            mr_party:'',
            category:'',
            result_code:'',
            issuer_userid:'',
            group:'',
            issue_date:'',
            exception_type:'',
            status_of_exception:'',
            comments:'',
            start_date:new Date(),
            end_date:'',
            is_search:false,
            is_submit:false,
            updated_start_time:new Date(),
            exception_type_data:[],
            status_of_exception_data:[],
            tableindex:0,
            tabledata:[],
            searchdata:[],
            team_data:[],
            teamdata:[],
            areadata:[],
            area_data:[],
            regiondata:[],
            afexce:'',
            isDataPasted: false,
            afexceptioncount:'',
            afexceptioncountlast:'',
            isSubmitting: false
      }
    }
    componentDidMount() {
      this.setState({
          start_date: new Date(), 
        })
      this.fetchexceptiontype()
      this.fetchstatusofexception()
      this.fetchissie()
        this.fetchAfexceptionCount()
    }
    fetchAfexceptionCount(){
      this.setState({loading:true})
      const {username} = this.props
      //console.log(username)
      AfExceptionServiceService.fetchafexceptioncount(username)
      .then((res) => {
         if(res.status)   { 
                let filterstatus = res.data;
                let lastdata = res.lastcount;
                this.setState({ 
                  afexceptioncount:filterstatus, 
                  afexceptioncountlast:lastdata     
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
           
              this.setState({
                regiondata: eallyUniqueArr,
                issuecode_data:res.data  , 
                areadata:areaUniqueArr,
                team_data:teamUniqueArr,

              })
            
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
   fetchregionarea() {  
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
           
            this.setState({
              regiondata: regionlist,
              area_data:arealist,
              teamdata:teamlist,

            })
        
          }  else
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
    handleChangeException_type = (selectedOptions) => {
      this.setState({exception_type : selectedOptions.value})  
   }
   handleChangeStatus_Exception = (selectedOptions) => {
    this.setState({status_of_exception : selectedOptions.value})  
 }
 onChangeFileUpload(files)
 {
   const {tableindex}=this.state
   this.setState({
     loading : true
   })
   AfExceptionServiceService.fileUpload(files[0])
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
             this.fetchregionarea()
           createNotification('Uploaded','success','filled')
          
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
   
  
      fetchexceptiontype() {
        this.setState({ loading: true })
        exceptiontypeService.fetchapi()
          .then((res) => {
            this.setState({ loading: false })
            if (res.status) {
              let filterstatus = (res.data).filter(item => item.status === 1)
              var regionlist = filterstatus.map(function (cusmaidid) {
                return {
                  label: cusmaidid.name ,value: cusmaidid.id.toString()
                };
              });
              this.setState({
                exception_type_data: regionlist,
              })
            }
          })
          .catch((error) => { this.setState({ loading: false }) });
      }
      fetchstatusofexception() {
        this.setState({ loading: true })
        statusexceptionService.fetchapi()
          .then((res) => {
            this.setState({ loading: false })
            if (res.status) {
              let filterstatus = (res.data).filter(item => item.status === 1)
              var regionlist = filterstatus.map(function (cusmaidid) {
                return {
                  label: cusmaidid.name ,value: cusmaidid.id.toString()
                };
              });
              this.setState({
                status_of_exception_data: regionlist,
              })
            }
          })
          .catch((error) => { this.setState({ loading: false }) });
      }
      onClearValue() {
          this.setState({
            region:'',
            area:'',
            team:'',
            user_id:'',
            shipment:'',
            dp_number:'',
            mr_party:'',
            category:'',
            result_code:'',
            issuer_userid:'',
            group:'',
            issue_date:'',
            exception_type:'',
            status_of_exception:'',
            comments:'',
            start_date:new Date(),
            end_date:'',
            updated_start_time:new Date(),
            tableindex:0,
            id:0,
            is_search:false,
            is_submit:false,
          })
         this.fetchissie()
        } 
        onSubmit() { 
          this.setState({ isSubmitting: true });
          const {id,region,area,team,shipment,dp_number,mr_party,
            category,result_code,issuer_userid,group,issue_date,exception_type,status_of_exception,
          comments,start_date,updated_start_time} = this.state;
          if(region!==''&& area!==''&& team!==''&& shipment !==''&& mr_party !==''&& category !==''&& 
          result_code !==''&& issuer_userid !==''&& group !==''&& issue_date !==''&& exception_type !==''&& status_of_exception!=='')
          {
              const end_time =  moment(new Date()).format(' hh:mm:ss a') 
              const {username} = this.props
              let   end_date=convertLocalToUTCDate(new Date()),
              start_date=convertLocalToUTCDate(updated_start_time),
                updatedstarttime=convertLocalToUTCDate(updated_start_time),
                updated_end_time=convertLocalToUTCDate(new Date())
                AfExceptionServiceService.createAfExceptionService(id, region,area,team,username,shipment,dp_number,mr_party,category,result_code,issuer_userid,group,issue_date,exception_type,status_of_exception,comments,start_date,end_date,updatedstarttime ,updated_end_time)
                .then((res) => { 
                  this.setState({  
                      end_time:end_time,
                    loading : false ,
                    isSubmitting: false     
                  }) 
                  if(res.status)
                    {
                      createNotification('Created','success','filled')
                      this.onClearValue()
                      this.fetchAfexceptionCount()
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
        team:record.team,
        user_id:record.user_id,
        shipment:record.shipment,
        dp_number:record.dp_number,
        mr_party:record.mr_party,
        category:record.category,
        result_code:record.result_code,
        issuer_userid:record.issuer_userid,
        group:record.group,
        issue_date:record.received_date !== null && this.validDate(record.issue_date) ?convertLocalToUTCDate(record.issue_date) : '',
        exception_type:record.exception_type,
        status_of_exception:record.status_of_exception,
        comments:record.comments,
        start_date:moment(record.start_time).format('MM/DD/YYYY hh:mm:ss a'),
        end_date:moment(record.end_time).format('MM/DD/YYYY hh:mm:ss a'),
        is_submit:false,
        is_search:true
        })
    }

} 
fetchData() {
  const {shipment,searchdata,tableindex} = this.state 
  if(shipment !== "" )
  {
      this.setState({
          loading : true,
          is_submit:false
      })
      
      AfExceptionServiceService.search(shipment)
      .then((res) => {
         
          this.setState({loading:false})
         
          // this.onrefresh()
      if(res.status)   { 
        let dta =res.data
        this.setValue(dta[tableindex],tableindex)
        this.fetchregionarea()
          this.setState({
            searchdata:res.data
          })
       }
       else
       {
          createNotification(res.message,'error','filled');
          this.setState({
            searchdata:[]
          })
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
    createNotification('Please Enter Booking Number','error','filled')
  }
}
        renderTemplate()
        {
          const {languageData,locale} = this.props
        
          const column_name =["GSC User ID","Region", "Area", "Sub Area", "Shipment","DP Number","MR Party","Category", "Result code", "Issuer User ID",
          "Group", "Issue Date", "Exception Type","Status of Exception","Comments","Start DateTime","End DateTime"]
            return(
              
              <Workbook filename="AF-Exceptions.xlsx" element={
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
        async onPasteZ1910() {
          clipboard.readText().then((text)=>{
              var record = getValueAF_Z1910(text)
          console.log("kjbkj " , JSON.stringify(record))
          this.setState({
                dp_number:record.dp_number,
                shipment:record.shipment,
                mr_party:record.mr_party,
                category:record.category,
                result_code:record.result_code,
                issuer_userid:record.issuer_userid,
                group:record.group,
                issue_date:this.validDate(record.issue_date, 'Issue Date'),
                // issue_date:record.issue_date
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
      validDate(date, title) {
        var date_value = '', isfill = false
        if (date && date !== null && date !== '') {

            var end_date = new Date(date)
            if (Object.prototype.toString.call(end_date) === "[object Date]") {
                if (isNaN(end_date.getTime())) {
                    console.log("date is not valid")
                }
                else {
                    date_value = end_date
                    console.log("date is valid")
                    isfill = true
                }
            } else {
                console.log("not a date")
            }

        }
        if (isfill === false) {
            createNotification(`Please Enter ${title} (MM/DD/YYYY)`, 'error', 'filled')
        }

        return date_value

    }
    render()
    {
        const {match,locale,languageData,username} = this.props
        const {loading,region,area,team,shipment,dp_number,mr_party,afexceptioncount,afexceptioncountlast,
        category,result_code,issuer_userid,group,issue_date,exception_type,status_of_exception,isDataPasted,
      comments,exception_type_data,status_of_exception_data,start_date,end_date,
      team_data,teamdata,area_data,regiondata,tabledata,is_submit,is_search,searchdata,tableindex} = this.state
     
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
            title:onChangeLanguage(locale,'DP Number',languageData),
            dataIndex: 'dp_number',
            key: 'dp_number',
            render: (text, record,index) => ( 
              <div   style = {{padding:'2px',width:'200px'}}>
              {text}
              </div>),
          },
          {
            title: onChangeLanguage(locale,'MR Party',languageData),
            dataIndex: 'mr_party',
            key: 'mr_party',
            render: (text, record) => ( 
                <div className="row d-flex justify-content-center"  style = {{padding:'2px',width:'200px'}}>
                  {text}
                </div>)
          },
          {
            title: onChangeLanguage(locale,'Category',languageData),
            dataIndex: 'category',
            key: 'category',
            render: (text, record,index) => ( 
                <div   style = {{padding:'2px',width:'200px'}}>{text}
                </div>)
          },
            {
              title:onChangeLanguage(locale,'Result Code',languageData) ,
              dataIndex: 'result_code',
              key: 'result_code',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                  {text}
                </div>),
            },
            {
              title:onChangeLanguage(locale,'Issuer User ID',languageData) ,
              dataIndex: 'issuer_userid',
              key: 'issuer_userid',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                  {text}
                </div>),
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
              title:onChangeLanguage(locale,'Issue Date',languageData) ,
              dataIndex: 'issue_date',
              key: 'issue_date',
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
                   {getValue(exception_type_data, 'value', 'label', text)} 
                </div>),
            },
            {
              title:onChangeLanguage(locale,'Status of Exception',languageData) ,
              dataIndex: 'status_of_exception',
              key: 'status_of_exception',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                   {getValue(status_of_exception_data, 'value', 'label', text)} 
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
             {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <title>{onChangeLanguage(locale,'AF Exceptions',languageData)}</title>
                <Row>
                    <Colxx xxs="12">
                        <div className = "row">
                        <div className = "col-md-5">
                        <Breadcrumb heading={onChangeLanguage(locale,'AF Exceptions',languageData)} match={match} />
                        </div>
                       
                        <div className = "col-md-3">
                                 {this.renderTemplate()}
                            <Button className = "button-width" color="primary">
                            <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
                            <a style= {{margin :'0px'}} > {onChangeLanguage(locale,'Upload',languageData)}</a>
                            <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                                className = "filepicker_customButton"
                                style = {{ width: '26%', marginLeft: '-22%'}}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
                            </Button>
                        </div>
                        <div className = "col-md-2">
                          <h2 style = {{marginTop:'15px'}}>Total EQ : {afexceptioncount}</h2>
                        </div>
                        <div className = "col-md-2">
                            <h2  style = {{marginTop:'15px'}}>Last EQ : {afexceptioncountlast}</h2>
                        </div>
                        </div>
                        <Separator className = "separator-margin"/>
                    </Colxx>
                </Row>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                        <div className = "row" style = {{marginBottom:'30px'}}>
                            <div className = "col-md-3 space-margin">
                                  <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'GSC user ID',languageData)}
                                  <br></br>{username}
                                  </Label>
                                        
                              </div>
                              <div className = "col-md-3 space-margin">
                                  <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Start Date',languageData)}
                                  <br></br>{moment(start_date).format('MM/DD/YYYY hh:mm:ss a')}
                                  </Label>
                                        
                              </div>
                              <div className = "col-md-3 space-margin">
                                  <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'End Date',languageData)}
                                  <br></br>{end_date !== '' && moment(end_date).format('MM/DD/YYYY hh:mm:ss a')}
                                  </Label>
                                        
                              </div>
                              <div className = "col-md-3 space-margin">
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
                    <div className = "col-md-3 space-margin">
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
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Sub Area Name',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select
                            className = {is_submit === true && team === ''?  "error-border-select":"react-select fontstyle" }  
                              classNamePrefix="react-select"
                              name="form-field-name"
                              placeholder={onChangeLanguage(locale, 'Sub Area', languageData)}
                              value={teamdata.filter(option => option.value === team)}
                              options={teamdata}
                              isDisabled={is_search === true ? true : false}
                              onChange={({ value }) => this.setState({ team: value })}
                            />
                        </div>
                            <div className = "col-md-3 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Booking Number',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                        <Input  className={is_submit === true && shipment === ''?  "error-border-paste":"fontstyle text-background-paste" }
                                        value = {shipment}  
                                        disabled={is_search || isDataPasted}
                                        onChange= {(e)=>this.setState({shipment : e.target.value})} 
                                    />
                            </div>
                            <div className = "col-md-3 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'DP Number',languageData)}</Label>
                                        <Input  className={"fontstyle text-background-paste" }
                                        value = {dp_number}  
                                        disabled={is_search || isDataPasted} 
                                        onChange= {(e)=>this.setState({dp_number : e.target.value})} 
                                    />
                            </div>
                            <div className = "col-md-3 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'MR Party',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                        <Input  className={is_submit === true && mr_party === ''?  "error-border-paste":"fontstyle text-background-paste" }
                                        value = {mr_party} 
                                        disabled={is_search === true ? true : false}  
                                        onChange= {(e)=>this.setState({mr_party : e.target.value})} 
                                    />
                            </div>
                            <div className = "col-md-3 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Category',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                        <Input  className={is_submit === true && category === ''?  "error-border":"fontstyle text-background" }
                                        value = {category}  
                                        disabled={is_search === true ? true : false} 
                                        onChange= {(e)=>this.setState({category : e.target.value})} 
                                    />
                            </div>
                            <div className = "col-md-3 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Result Code',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                        <Input  className={is_submit === true && result_code === ''?  "error-border-paste":"fontstyle text-background-paste" }
                                        value = {result_code}  
                                        disabled={is_search || isDataPasted} 
                                        onChange= {(e)=>this.setState({result_code : e.target.value})} 
                                    />
                            </div>
                            <div className = "col-md-3 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Issuer User ID',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                        <Input  className={is_submit === true && issuer_userid === ''?  "error-border-paste":"fontstyle text-background-paste" }
                                        value = {issuer_userid}
                                        disabled={is_search || isDataPasted}   
                                        onChange= {(e)=>this.setState({issuer_userid : e.target.value})} 
                                    />
                            </div>
                            <div className = "col-md-3 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Group',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                        <Input  className={is_submit === true && group === ''?  "error-border-paste":"fontstyle text-background-paste" }
                                        value = {group}  
                                        disabled={is_search || isDataPasted} 
                                        onChange= {(e)=>this.setState({group : e.target.value})} 
                                    />
                            </div>
                            <div className = "col-md-3 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Issue Date',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                  <a className='fontstyle mandatory-label'>
                                  {is_submit === true && issue_date === '' && `${onChangeLanguage(locale, 'Mandatory Field', languageData)}`}</a>
                                      
                                     <DatePickerDate
                                        selected={issue_date}
                                        className="text-background-paste"
                                        onChange={(date) => this.setState({ issue_date: date })}
                                        disabled={isDataPasted}
                                    />
                                      {/* <Input  className = {is_submit === true && issue_date === ''?  "error-border-paste":"fontstyle text-background-paste" }    
                            placeholder = 'DD-MM-YYYY'
                            value = {issue_date}  
                            // disabled = {true}  
                            disabled={is_search === true ? true : false} 
                            onChange= {(e)=>this.setState({issue_date : e.target.value})} 
                            /> */}
                            </div>
                            <div className = "col-md-3 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Exception Type',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                     <Select  
                                       className={is_submit === true && exception_type === ''?  "error-border-select":"react-select fontstyle" }
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={exception_type_data.filter(option =>option.value === exception_type)}
                                        options={exception_type_data}
                                        onChange={this.handleChangeException_type}
                                    />
                            </div>
                            <div className = "col-md-3 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Status of Exception',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                     <Select  
                                       className={is_submit === true && status_of_exception === ''?  "error-border-select":"react-select fontstyle" }
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={status_of_exception_data.filter(option =>option.value === status_of_exception)}
                                        options={status_of_exception_data}
                                        onChange={this.handleChangeStatus_Exception}
                                    />
                            </div>
                            <div className = "col-md-12 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Comments',languageData)}</Label>
                                <textarea  className = {"fontstyle textarea-background" } 
                                        value = {comments}  
                                        onChange= {(e)=>this.setState({comments : e.target.value})} 
                                      />
                            </div>
                            <div className = "row text-center" style = {{margin:'0px 5px'}}>
                            <Button className = "button-width" color="secondary" 
                                    onClick={()=>this.onPasteZ1910()}>
                            {onChangeLanguage(locale,'Paste Z1910',languageData)} 
                            </Button>
                            <Button 
                            className = "button-width" color="secondary"  
                                        onClick={()=>this.fetchData()}
                                >
                                {onChangeLanguage(locale,'Search',languageData)} 
                            </Button>  
                            <Button className = "button-width" color="primary"  
                                            onClick={()=>this.onSubmit()} disabled={this.state.isSubmitting}>
                            {onChangeLanguage(locale,'Save',languageData)} 
                            </Button>
                            <Button className = "button-width" color="secondary" 
                                    onClick={()=>this.onClearValue()}>
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
                    defaultCurrent={1}
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

   })(BookingSheet)
  );
