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
import{emailhandlingService} from '../../../../redux/bookingprocess/emailhandling/saga'
import { createNotification } from '../../../../toast';
import{requestService} from '../../../../redux/bookingprocess/request/saga';
import Workbook from 'react-excel-workbook'
import {getValue_emailhandling} from '../../pasteData'
import * as clipboard from 'clipboard-polyfill/text'
import { Table,Checkbox } from 'antd';
import { regionService } from '../../../../redux/region/saga'
import { areaService } from '../../../../redux/area/saga';
import{teamsService} from '../../../../redux/teams/saga';
import{cargotypeService} from '../../../../redux/bookingprocess/cargotype/saga'
import{issuecodeService} from '../../../../redux/bookingprocess/issuecode/saga';

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        id:0,
        from:'',
        user_id:'',
        shipment_no:"",
        start_date:'',
        end_date:'',
        request_type:'',
        no_of_shipment:'',
        subject:'',
        remarks:'',
        region:'',
        area:'',
        sub_area:'',
        received_date_time:'',
        cargo_type:'',
        requesttypedata:[],
        searchdata:[],  
        team_data:[],
         teamdata:[],
         areadata:[],
         area_data:[],
         regiondata:[],    
         cargotypedata:[],
         is_submit:false,
         is_search:false,
         loading:false,
         updated_start_time:new Date(),
         tableindex:0,
         tabledata:[],
         isDataPasted: false,
         emailhandlingcount:'',
         emailhandlingcountlast:'',
         isSubmitting: false 
    }

    }

    componentDidMount() {
       
        this.setState({
            start_date:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
        })
      this.fetchrequest()
      this.fetchcargo()
      this.fetchissie()
      this.fetchEmailhandlingCount()
    }
    fetchEmailhandlingCount(){
      this.setState({loading:true})
      const {username} = this.props
      //console.log(username)
      emailhandlingService.fetchemailhandlingcount(username)
      .then((res) => {
         if(res.status)   { 
                let filterstatus = res.data;
                let lastdata = res.lastcount;
                this.setState({ 
                  emailhandlingcount:filterstatus, 
                  emailhandlingcountlast:lastdata     
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
    fetchrequest() {
        this.setState({loading:true})
        requestService.fetchapi()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var requestlist = filterstatus.map(function(response) {
                      return  {label : response.name ,text : response.name,value : response.id.toString()};
                   });  
                    this.setState({
                    requesttypedata :  requestlist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }  
     fetchcargo() {
      this.setState({loading:true})
      cargotypeService.fetchapi()
      .then((res) => {
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var requestlist = filterstatus.map(function(response) {
                    return  {label : response.name ,text : response.name ,value : response.id.toString()};
                 });  
                  this.setState({
                  cargotypedata :  requestlist
                  })
                 
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})
   }  

     fetchregion() {
      this.setState({ loading: true })
      regionService.fetchregion()
        .then((res) => {
          this.setState({ loading: false })
          if (res.status) {
            let filterstatus = (res.data).filter(item => item.status === 1)
            var regionlist = filterstatus.map(function (cusmaidid) {
              return { label: cusmaidid.region, value: cusmaidid.id.toString() };
            });
            this.setState({
              regiondata: regionlist,
            })
          }
        })
        .catch((error) => { this.setState({ loading: false }) });
    }
    fetcharea() {
      this.setState({ loading: true })
      areaService.fetcharea()
        .then((res) => {
          this.setState({ loading: false })
          if (res.status) {
            let filterstatus = (res.data).filter(item => item.status === 1)
            var regionlist = filterstatus.map(function (cusmaidid) {
              return {
                label: cusmaidid.name, text: cusmaidid.name,
                value: cusmaidid.id.toString(), region: cusmaidid.region,
              };
            });
            this.setState({
              areadata: regionlist,
            })
          }
        })
        .catch((error) => { this.setState({ loading: false }) });
    }
    fetchteam() {
      this.setState({ loading: true })
      teamsService.fetchteams()
        .then((res) => {
          this.setState({ loading: false })
          if (res.status) {
            let filterstatus = (res.data).filter(item => item.status === 1)
            var regionlist = filterstatus.map(function (cusmaidid) {
              return {
                label: cusmaidid.name ,value: cusmaidid.id.toString(), area: cusmaidid.area, 
                region: cusmaidid.region
              };
            });
            this.setState({
              team_data: regionlist,
            })
          }
        })
        .catch((error) => { this.setState({ loading: false }) });
    }
    
     onSubmit() { 
      this.setState({ isSubmitting: true });
        const {id,from,user_id,region,area,sub_area,received_date_time,shipment_no,request_type,cargo_type,no_of_shipment,subject,remarks,updated_start_time} = this.state;
        var isfill = false
        if(region !=='' && area !=='' &&  sub_area !=='' &&  from !=='' &&  request_type !=='' && subject !=='' && cargo_type !=='' && received_date_time !== "")
        {
          isfill = true
          // if(received_date_time !== "" && received_date_time  !== null)
          //   {
          //     let re = /^\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}:\d{2}:\d{2} ([AaPp][Mm])?$/ ;
          //     let times =received_date_time.match(re)
          //     console.log('times',times)
          //     console.log('re',re)
          //     if(times === null )
          //     {
               
          //       isfill = true
          //     }
             
          //   }
          
        }
        if(isfill === true )
        {
          const end_date =  moment(new Date()).format('MM/DD/YYYY hh:mm:ss a') 
          const {username} = this.props
          let end_date1=convertLocalToUTCDate(new Date()),
          start_date=convertLocalToUTCDate(updated_start_time),
          updatedstarttime=convertLocalToUTCDate(updated_start_time),
          updated_end_time=convertLocalToUTCDate(new Date()),
          receiveddate=convertLocalToUTCDate(received_date_time)
          this.setState({  
              end_date:end_date,
            loading : true     
          }) 
          emailhandlingService.createemailhandling( id,username,region,area,sub_area,receiveddate,from,request_type,no_of_shipment,shipment_no,subject,remarks,cargo_type,start_date,end_date1,updatedstarttime ,updated_end_time)
            .then((res) => { 
              this.setState({  
                  // endtime:end_date,
                  // // gsc_userid:username, 
                loading : false,
                isSubmitting: false    
              }) 
              if(res.status)
                {
                  createNotification('Created','success','filled')
                  this.onrefresh()
                  this.fetchEmailhandlingCount()
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
    
  onrefresh() {
    this.setState({
      from:'',
        user_id:'',
        shipment_no:"",
        start_date:'',
        end_date:'',
        request_type:'',
        no_of_shipment:'',
        subject:'',
        remarks:'',
        region:'',
        area:'',
        sub_area:'',
        cargo_type:'',
        received_date_time:'',
        searchdata:[],      
         is_submit:false,
         is_search:false,
         loading:false,
         updated_start_time:new Date(),
         start_date:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
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
 
    handlerequest = (selectedOptions) => {
        this.setState({request_type : selectedOptions.value})  
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
            gsc_userid:record.user_id,
            shipment_no:record.shipment_no,
            no_of_shipment:record.no_of_shipment,
            start_date:moment(record.start_time).format('MM/DD/YYYY hh:mm:ss a'),
            end_date:moment(record.end_time).format('MM/DD/YYYY hh:mm:ss a'),
            received_date_time:moment(record.received_datetime).format('MM/DD/YYYY hh:mm:ss a'),
            area:record.area,
            sub_area:record.team,
            status_of_case:record.status_case,
            region:record.region,
            from:record.from,
            request_type:record.request_type,
            subject:record.subject,
            remarks:record.remarks,
            cargo_type:record.cargo_type,
            teamdata:team_data,
            area_data:areadata,
            is_submit:false,
            is_search:true
            })
            this.fetchissie()
        }

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
      const {shipment_no,received_date_time,tableindex} = this.state 
      if(shipment_no !== "" || received_date_time !=='')
      {
        let receiveddate=convertLocalToUTCDate(received_date_time)
          this.setState({
              loading : true,
              is_submit:false
          })
          emailhandlingService.search(shipment_no,receiveddate)
          .then((res) => {
             
              this.setState({loading:false})
              // this.onrefresh()
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
        createNotification('Please Enter Booking Number or Received Date & Time','error','filled')
      }
   }
    renderTemplate()
    {
      const {languageData,locale} = this.props
    
      const column_name = ["GSC User ID","Region", "Area", "Sub Area","Received Date & Time", "From","Request Type","No of Shipment","Booking Number","Email Subject","Remarks","Start DateTime","End DateTime"]
        return(
          
          <Workbook filename="Email_handling.xlsx" element={
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
      emailhandlingService.fileUpload(files[0])
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
       
        validDate(date)
     {
        var date_value = '',isfill = false
         if(date && date !== null && date !== '')
         {
            
            var end_date =  new Date(date)
            if (Object.prototype.toString.call(end_date) === "[object Date]") {
                if (isNaN(end_date.getTime())) 
                { 
                    console.log("date is not valid",end_date)
                } 
                else 
                {
                    date_value =  moment(end_date).format('MM/DD/YYYY hh:mm:ss a')
                    console.log("date is valid",date_value)
                    isfill = true
                }
              } else 
              {
                 console.log("not a date")
              }

         }
        
 
         return date_value

     }
        async onPasteZ1910() {
          clipboard.readText().then((text)=>{
            var record = getValue_emailhandling(text)
            
            this.setState({
                paste_data:text,
                from:record.from,
                subject:record.subject,
                received_date_time:record.received_date_time
                })
                // var date = this.validDate(record.received_date_time)
                // if(date !=='')
                // {
                //     var date1 = moment(date).format('MM/DD/YYYY hh:mm:ss a')
                //     var date_time = new Date(date1)
                //     this.setState({
                //       received_date_time:convertLocalToUTCDate(date_time),
                //     })
                // }
                // else
                // {
                //   createNotification(`Please use format Date (MM/DD/YYYY)`,'error','filled') 
                // }
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
      handlecargotype = (selectedOptions) => {
        
        this.setState({
          cargo_type : selectedOptions.value
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
        const { from,shipment_no,start_date,end_date,request_type,no_of_shipment,subject,isDataPasted,emailhandlingcount,emailhandlingcountlast,
          remarks,requesttypedata,region,area,sub_area,received_date_time,cargo_type, is_submit,is_search,
          searchdata,teamdata,regiondata,area_data,cargotypedata,tabledata,tableindex} = this.state
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
              title: onChangeLanguage(locale,'Start Date',languageData),
              dataIndex: 'start_time',
              key: 'start_time',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'200px'}}>
                  {text !== '' ? moment(text).format('MM/DD/YYYY hh:mm:ss a') :''} 
                </div>)
            },
            {
              title: onChangeLanguage(locale,'End Date',languageData),
              dataIndex: 'end_time',
              key: 'end_time',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'200px'}}>
                 {text !== '' ? moment(text).format('MM/DD/YYYY hh:mm:ss a') :''} 
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
                title:onChangeLanguage(locale,'Received Date & Time',languageData),
                dataIndex: 'received_datetime',
                key: 'received_datetime',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>
                  {text}
                  </div>),
              },
              {
                title: onChangeLanguage(locale,'From',languageData),
                dataIndex: 'from',
                key: 'from',
                render: (text, record) => ( 
                    <div className="row d-flex justify-content-center"  style = {{padding:'2px',width:'200px'}}>
                      {text}
                    </div>)
              },
              {
                title: onChangeLanguage(locale,'Request Type',languageData),
                dataIndex: 'request_type',
                key: 'request_type',
                render: (text, record,index) => ( 
                    <div   style = {{padding:'2px',width:'200px'}}>  
                    {getValue(requesttypedata, 'value', 'label', text)} 
                    </div>)
              },
              {
                title: onChangeLanguage(locale,'Cargo Type',languageData),
                dataIndex: 'cargo_type',
                key: 'cargo_type',
                render: (text, record,index) => ( 
                    <div   style = {{padding:'2px',width:'200px'}}>
                      {getValue(cargotypedata, 'value', 'label', text)} 
                    </div>)
              },
              {
                title: onChangeLanguage(locale,'No. Of Shipment',languageData),
                dataIndex: 'no_of_shipment',
                key: 'no_of_shipment',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'200px'}}>
                    {text}
                  </div>)
              },
              {
                title: onChangeLanguage(locale,'Booking Number',languageData),
                dataIndex: 'shipment_no',
                key: 'shipment_no',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'200px'}}>
                    {text}
                  </div>)
              },
              {
                title: onChangeLanguage(locale,'Email Subject',languageData),
                dataIndex: 'subject',
                key: 'subject',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'200px'}}>
                    {text}
                  </div>)
              },
                {
                  title:onChangeLanguage(locale,'Remarks',languageData) ,
                  dataIndex: 'remarks',
                  key: 'remarks',
                  render: (text, record) => ( 
                    <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                      {text}
                    </div>),
                },
                
               
        ]
        return (
            <>
            <Row>
              <Colxx xxs="12"> 
                <div className = "row">
                      <div className = "col-md-5">
                      <Breadcrumb heading="Email Handling" match={match} />
                    </div>
                    <div className = "col-md-3">
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
                          <h2 style = {{marginTop:'15px'}}>Total EQ : {emailhandlingcount}</h2>
                        </div>
                        <div className = "col-md-2">
                            <h2  style = {{marginTop:'15px'}}>Last EQ : {emailhandlingcountlast}</h2>
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
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Start Date',languageData)}</a><br></br>{start_date}</Label>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'End Date',languageData)}</a><br></br>{end_date}</Label>
                        </div>
                        
                    </div>
                </div> 
          


                <div className = "publishuser-card-component" style = {{borderRadius:'10px'}}>
                   
                <div className = "publish-title" >
                                 <Row>
                                     <Colxx xxs="4">
                                        <Label  className = "fontstyle" 
                                        style = {{fontWeight:700,fontSize:'15px'}}>Email Handling</Label>
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
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Received Date & Time',languageData)}<a style = {{color :'red'}}>*</a></Label>
                              <Input  className={is_submit === true && received_date_time === ''?  "error-border-paste":"fontstyle text-background-paste" }
                                value = {received_date_time}
                                disabled={isDataPasted}  
                                onChange= {(e)=>this.setState({received_date_time : e.target.value})} 
                                />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'From',languageData)}<a style = {{color :'red'}}>*</a></Label>
                              <Input  className={is_submit === true && from === ''?  "error-border-paste":"fontstyle text-background-paste" }
                                value = {from}  
                                disabled={is_search || isDataPasted}
                                onChange= {(e)=>this.setState({from : e.target.value})} 
                                />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Request Type',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            
                                       <Select  
                                       className={is_submit === true && request_type === ''?  "error-border-select":"react-select fontstyle" }

                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={requesttypedata.filter(option =>option.value === request_type)}
                                        options={requesttypedata}
                                        onChange={this.handlerequest}
                                    />
                                    </div>
                                    <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Cargo Type',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Select  
                                       className={is_submit === true && cargo_type === ''?  "error-border-select":"react-select fontstyle" }

                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={cargotypedata.filter(option =>option.value === cargo_type)}
                                        options={cargotypedata}
                                        onChange={this.handlecargotype}
                                    />
                                    </div>
                       <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'No. of Shipment',languageData)}</Label>
                                <Input  className={"fontstyle text-background" }
                                value = {no_of_shipment}  
                                onChange= {(e)=>this.setState({no_of_shipment : e.target.value})} 
                                />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Booking Number',languageData)}</Label>
                                <Input  className={"fontstyle text-background" }
                              
                                value = {shipment_no}  
                                onChange= {(e)=>this.setState({shipment_no : e.target.value})} 
                                />
                        </div>

                        <div className = "col-md-12 space-margin">
                             <Label  className = "fontstyle normal-font" >Email Subject
                             <a style = {{color :'red'}}>*</a></Label>
                            <textarea 
                            className={is_submit === true && subject === ''?  "border-textarea-background":"fontstyle textarea-background-paste" } 
                                placeholder = ''
                                value = {subject}  
                                // disabled={is_search === true ? true : false}
                                disabled={is_search || isDataPasted} 
                                onChange= {(e)=>this.setState({subject : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-12 space-margin">
                            <Label  className = "fontstyle normal-font" >Remarks</Label>
                            <textarea  className = "fontstyle textarea-background"  
                            placeholder = ''
                            value = {remarks}  
                            onChange= {(e)=>this.setState({remarks : e.target.value})} 
                            />
                        </div>
                                               
                                 </div>
                 <div className = "row text-center">                  
                 <Button className = "button-width" color="secondary"
                        onClick={()=>this.onPasteZ1910()}
                        >
                          {onChangeLanguage(locale,'Paste',languageData)}
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

