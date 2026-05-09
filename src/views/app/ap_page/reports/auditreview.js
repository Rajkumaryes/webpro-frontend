import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import {onChangeLanguage,getValue,convertLocalToUTCDate} from '../../../../helper'
import{teamsService} from '../../../../redux/teams/saga'
import{userService} from '../../../../redux/users/saga'
import{reportService} from '../../../../redux/ap/report/saga'
import{regionsService} from '../../../../redux/ap/region/saga'
import{areasService} from '../../../../redux/ap/area/saga'
import{invoiceService} from '../../../../redux/ap/invoice/saga'
import{errorcategoryService} from '../../../../redux/ap/errorcategory/saga'
import{auditstatusService} from '../../../../redux/ap/auditstatus/saga'
import moment from 'moment';
import { Table,Tooltip } from 'antd';
import Select from 'react-select';
import DatePicker from "../../datePicker";
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../constants/defaultValues';

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        startdate:'',
        enddate:'',
        team_id:'',
        report:'',
        team_data:[],
        user_data:[],
        is_submit:false,
        data:[],
        page:1,
        pageSize:25,
        total :0,
        days_value:'',
        region_data:[],
        area_data:[],
        audit_status_data:[],
        invoice_status_data:[],
        error_category_data:[]
      };
    }
    componentDidMount()
    {
        this.fetchTeamData()
        this.fetchregion()  
        this.fetcharea()
        this.fetcherrorCategory()
        this.fetchinvoice()
        this.fetchauditstatus()
    }
     fetchregion() {
      this.setState({loading:true})
      regionsService.fetchapi()
      .then((res) => {
        this.setState({loading:false})
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var regionlist = filterstatus.map(function(cusmaidid) {
                    return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                 });  
                  this.setState({
                  region_data :  regionlist,
                  })
               }
               
               })
               .catch((error) => {  this.setState({loading:false})}); 
   }  
   fetcherrorCategory() {
    this.setState({loading:true})
    errorcategoryService.fetchapi()
    .then((res) => {
      this.setState({loading:false})
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                error_category_data :  regionlist,
                })
             }
             
             })
             .catch((error) => {  this.setState({loading:false})}); 
 }  
   fetchinvoice() {
    this.setState({loading:true})
    invoiceService.fetchapi()
    .then((res) => {
      this.setState({loading:false})
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1 && item.invoice_type === 'Audit Review' )
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                invoice_status_data :  regionlist,
                })
             }
             
             })
             .catch((error) => {  this.setState({loading:false})}); 
 }  
 fetchauditstatus() {
  this.setState({loading:true})
  auditstatusService.fetchapi()
  .then((res) => {
    this.setState({loading:false})
     if(res.status)   { 
        let filterstatus = (res.data).filter(item => item.status === 1)
           var regionlist = filterstatus.map(function(cusmaidid) {
                return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
             });  
              this.setState({
                audit_status_data :  regionlist,
              })
           }
           
           })
           .catch((error) => {  this.setState({loading:false})}); 
}  
   fetcharea() {
    this.setState({loading:true})
    areasService.fetchapi()
    .then((res) => {
      this.setState({loading:false})
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString(),region:cusmaidid.region};
               });  
                this.setState({
                area_data :  regionlist,
                })
             }
             
             })
             .catch((error) => {  this.setState({loading:false})}); 
 } 
 
    fetchTeamData() {  
        this.setState({
          loading : true
        })
        teamsService.fetchteams()
          .then((res) => { 
            this.setState({   
                 loading : false   
            }) 
            if(res.status)
              {
                let filterstatus = (res.data).filter(item => item.status === 1)
                var list = filterstatus.map(function(areaaval) {
                  return  {label : areaaval.name+'-'+areaaval.country_code ,value : (areaaval.id).toString(),name:areaaval.name};
                  });  
                   this.setState({
                       team_data :  list,
                   })
                
              }                
        
        })
        .catch((error) => { 
          this.setState({
            loading : false
          })
          });   
     }
     fetchUserData(team_array) {  
        this.setState({
          loading : true
        })
        userService.fetch_hierarchyuserData(team_array)
          .then((res) => { 
            this.setState({   
                 loading : false   
            }) 
            if(res.status)
              {
                let filterstatus = (res.data).filter(item => item.is_active === 1)
                var list = []
                for(var i =0;i<filterstatus.length;i++)
                {
                    list.push(filterstatus[i].username)
                }
                   this.setState({
                       user_data :  list,
                   })
                
              }    
              else
              {
                this.setState({
                  user_data :  [],
                  data:[],
                 })
              }              
        
        })
        .catch((error) => { 
          this.setState({
            loading : false
          })
          });   
     }
    fetchPagination(page,per_page,startdate,enddate,is_report)
    {
        const {team_id,user_data,team_data} = this.state
        if(enddate !== "" && startdate !== ""  && team_id !== "")
        {
          if ((Date.parse(enddate) > Date.parse(startdate)))
          {
            const team = getValue(team_data,'value','name',team_id)
            this.setState({
                loading : true,
                page:page,
                pageSize:per_page
            })
            const {username} = this.props
            const report_url =  'auditallocation',
            menu= 'AP' , 
            submenu='Audit Review',
            type = 'Raw Data'
            reportService.fetchapi1(report_url,page,per_page,startdate,enddate,user_data,is_report,
              username,menu,submenu,team_id,team,type)
            .then((res) => { 
              this.setState({   
                   loading : false   
              }) 
              if(res.status)
                {
                  if(is_report !== true)
                  {
                    if(res.data)
                    {
                      this.setState({
                        total:res.total,
                        data:res.data
                       })
                    }
                   
                  }
                   
                  
                }    
                else
                {
                  this.setState({
                    total:0,
                    data:[]
                   })
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
            createNotification('Please Choose End Date Above  Start Date','error','filled')
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
   
    clearValue()
    {
        this.setState({
            startdate:'',
            enddate:'',
            team_id:'',
            user_data:[],
            data:[],
            is_submit:false,
           
        })
    }
    onChangeTeam(value)
    {
        this.setState({  team_id: value,startdate  : '',enddate:'',user_data:[],data:[] })
        this.fetchUserData([value])
    }
    onChangestarttime(date)
    {
      this.setState({startdate  : date,enddate:''})
    }
    
    onChangeendtime(date)
     {
       const {startdate,team_id} = this.state
       if(startdate !== '' && team_id !== '')
       {
        this.setState({enddate  : date})
        this.fetchPagination(1,25,startdate,date,false)
       }
       else
       {
        createNotification('Please Choose Start Date and Team','error','filled');
       }
       
     }
    
    onClickDay(value)
    {
      
      this.setState({
        days_value:value
      })
     
      if(value === "Past 1 Days")
      {
        this.getdaywiseChart(0,false,value)
      }
      else if(value === "1 Month")
      {
        this.getdaywiseChart(29,value)
      }
      else if(value === "1 Year")
      {
        this.getdaywiseChart(364,value)
      }
      else if(value === "This Week")
      {
        
        this.getdaywiseChart(6,value)
      }
      else if(value === "This Month")
      {
        this.getdaywiseChart(29,value)
      }
      else if(value === "This Year")
      {
        this.getdaywiseChart(364,value)
      }

    }
    getdaywiseChart(day,days_value)
  {
   
    var date = new Date();
    date.setDate(date.getDate() - day);
    var currentdate = moment(new Date()).format('YYYY-MM-DD')
    const lastdate = ("0" + date.getDate()).slice(-2),
    month = ("0" + (date.getMonth() + 1)).slice(-2)
    var finalDate = date.getFullYear() +'-'+ month +'-' + lastdate ;
    if(days_value === "This Week")
    {
     
      var startOfWeek = moment().startOf('week').toDate();
      finalDate = moment(startOfWeek).format('YYYY-MM-DD')
    }
    else if(days_value === "This Month")
    {
      var startOfWeek = moment().startOf('month').toDate();
      finalDate = moment(startOfWeek).format('YYYY-MM-DD')
    }
    else if(days_value === "This Year")
    {
      var startOfWeek = moment().startOf('year').toDate();
      finalDate = moment(startOfWeek).format('YYYY-MM-DD') 
    }
   console.log("lgkjgjgkj  finalDate = " , JSON.stringify(finalDate) , 'currentdate ==>' , currentdate)
   const {team_id} = this.state
  if(team_id !== '')
  {
    this.setState({
      startdate:new Date(finalDate),
      enddate:convertLocalToUTCDate(new Date())
    })
    this.fetchPagination(1,25, new Date(finalDate),convertLocalToUTCDate(new Date()),false)
  }
  else
  {
   createNotification('Please Choose Team','error','filled');
  }

  }
  paginationOptions = {
    showSizeChanger: true,
    showQuickJumper: true,
    onShowSizeChange: (_, pageSize) => {
      this.setState({
        pageSize : pageSize
      })
      
    },
    onChange: (page,pageSize) => {
      const {startdate,enddate} = this.state
     this.fetchPagination(page,pageSize,startdate,enddate,false)
    },
    pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
    // total: this.state.total  ,
    showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total}`,
  };
    render()
    {
        const {match,locale,languageData} = this.props
        const {enddate,startdate,team_id,team_data,is_submit,loading,data,page,pageSize,
          region_data,area_data,error_category_data,invoice_status_data,audit_status_data} = this.state
          var  columns =[
            {
              title:onChangeLanguage(locale, 'ID',languageData),
              dataIndex: 'id',
              key: 'id',
            },
            {
              title: onChangeLanguage(locale,'Document ID',languageData),
              dataIndex: 'document_id',
              key: 'document_id',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}    
                </div>),
             
            },
            {
              title:onChangeLanguage(locale,'VIM Processs Status Text',languageData) ,
              dataIndex: 'vimprocess',
              key: 'vimprocess',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}
                </div>),
            },
            {
              title: onChangeLanguage(locale,'Scan Location',languageData),
              dataIndex: 'scanlocation',
              key: 'scanlocation',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}    
                </div>),
            },
           
           
            {
              title:onChangeLanguage(locale,'Vendor',languageData) ,
              dataIndex: 'vendor',
              key: 'vendor',  render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}    
                </div>),
            },
           
            {
              title: onChangeLanguage(locale,'Gross Invoice Amount',languageData),
              dataIndex: 'gross_invoice',
              key: 'gross_invoice',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}    
                </div>),
            },
            
            {
              title:onChangeLanguage(locale,'Currency',languageData) ,
              dataIndex: 'document_currency',
              key: 'document_currency',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}    
                </div>),
            },
            {
              title:onChangeLanguage(locale,'Company Code',languageData) ,
              dataIndex: 'companycode',
              key: 'companycode',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}
                   
                </div>),
            },
            {
              title: onChangeLanguage(locale,'Document Number',languageData),
              dataIndex: 'document_number',
              key: 'document_number',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),
            },
            {
              title:onChangeLanguage(locale,'Posting Date',languageData) ,
              dataIndex: 'posting_date',
              key: 'posting_date',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                {(text !== null && text !== '') && moment(text).format('MM/DD/YYYY')}
                </div>),
            },
             {
              title:onChangeLanguage(locale,'Last User',languageData) ,
              dataIndex: 'lastuser',
              key: 'lastuser',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}    
                </div>),
            },
             
            {
              title: onChangeLanguage(locale,'User ID',languageData),
              dataIndex: 'user_id',
              key: 'user_id',
              render: (text, record,index) => ( 
                <div style = {{padding:'2px',width:'100px'}}>
                  {text}
    
              </div>),
            },
            {
              title: onChangeLanguage(locale,'Region',languageData),
              dataIndex: 'region',
              key: 'region',
              render: (text, record,index) => ( 
                <div style = {{padding:'2px',width:'100px'}}>
              {getValue(region_data,'value','label',text)}
                 
      
                </div>),
            },
            {
              title:onChangeLanguage(locale,'Area',languageData) ,
              dataIndex: 'area',
              key: 'area',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
               {getValue(area_data,'value','label',text)}
              
                </div>),
            },
      
            {
              title:onChangeLanguage(locale,'Invoice Status',languageData) ,
              dataIndex: 'invoice_status',
              key: 'invoice_status',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                  {getValue(invoice_status_data,'value','label',text)}
              
                </div>),
            },
            {
              title: onChangeLanguage(locale,'JIRA Ticket',languageData),
              dataIndex: 'jiraticket',
              key: 'jiraticket',
              render: (text, record,index) => ( 
                <div style = {{padding:'2px',width:'100px'}}>
                {text}
      
                </div>),
            },
            {
              title: onChangeLanguage(locale,'Posting User ID',languageData),
              dataIndex: 'posting_user',
              key: 'posting_user',
              render: (text, record,index) => ( 
                <div style = {{padding:'2px',width:'100px'}}>
                 {text}
                </div>),
            },
           
            {
              title:onChangeLanguage(locale,'Error Category',languageData) ,
              dataIndex: 'error_category',
              key: 'error_category',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {getValue(error_category_data,'value','label',text)}
                </div>),
            },
            {
              title:onChangeLanguage(locale,'Final Audit Status',languageData) ,
              dataIndex: 'final_audit_status',
              key: 'final_audit_status',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                  {getValue(audit_status_data,'value','label',text)}
                </div>),
            },
            {
              title: onChangeLanguage(locale,'GSC Process Date',languageData),
              dataIndex: 'gsc_date',
              key: 'gsc_date',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}    
                </div>),
            }, 
            {
              title: onChangeLanguage(locale,'GSC Process Time',languageData),
              dataIndex: 'gsc_time',
              key: 'gsc_time',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}    
                </div>),
            }, 
           
            
          ];
        const pagination = {
          ...this.paginationOptions,
          total: this.state.total,
          current: this.state.page,
          pageSize: this.state.pageSize,
          };
        return (
            <>
            <title>{onChangeLanguage(locale,'Audit Review Raw Data',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'Audit Review Raw Data',languageData)} match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <div>
            <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                          <div className = "row" style = {{padding:'10px'}}>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Team',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                        <Select  className={is_submit === true && team_id === ''?  "error-border-select":"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={team_data.filter(option =>option.value === team_id)}
                                            options={team_data}
                                            onChange={(option) => this.onChangeTeam(option.value)}
                                        />
                                </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Start Date',languageData)}<a style = {{color :'red'}}>*</a>
                                    {(is_submit === true && startdate === '')  && <a className ="fontstyle mandatory-label">{onChangeLanguage(locale,'Mandatory Field',languageData)}</a>}</Label>
                                    
                                     <DatePicker
                                    selected={startdate}
                                    className = "text-background"
                                    onChange={(date) => this.onChangestarttime(date)}
                                    />
                                
                            </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'End Date',languageData)}<a style = {{color :'red'}}>*</a>
                                    {(is_submit === true && enddate === '')  && <a className ="fontstyle mandatory-label">{onChangeLanguage(locale,'Mandatory Field',languageData)}</a>}</Label>
                                  
                                    <DatePicker
                                    selected={enddate}
                                    min_date= {startdate}
                                    className = "text-background"
                                    onChange={(date) => this.onChangeendtime(date)}
                                    />
                                </div>
                             </div>
                             <div className = "text-center" style = {{padding:'0px 0px 10px'}}>
                               <Button className = "button-width" color="secondary" 
                                onClick={()=>this.fetchPagination(page,pageSize,startdate,enddate,true)} >
                                  <i className = "simple-icon-cloud-download" style = {{marginRight:'5px'}}/>
                                  {onChangeLanguage(locale,'Download',languageData)}</Button> 

                                <Button className = "button-width" color="primary" 
                                     onClick={()=>this.onClickDay('Past 1 Days')} >
                                        <i className = "simple-icon-cloud-download" style = {{marginRight:'5px'}}/>
                                        {onChangeLanguage(locale,'Daily',languageData)} </Button> 

                                <Button className = "button-width" color="primary" 
                                  onClick={()=>this.onClickDay('This Week')} >
                                    <i className = "simple-icon-cloud-download" style = {{marginRight:'5px'}}/>
                                    {onChangeLanguage(locale,'Weekly',languageData)} </Button> 

                                <Button className = "button-width" color="primary"
                                  onClick={()=>this.onClickDay('This Month')} >
                                    <i className = "simple-icon-cloud-download" style = {{marginRight:'5px'}}/>
                                    {onChangeLanguage(locale,'Monthly',languageData)} </Button>  

                                 <Button className = "button-width" color="secondary" 
                                onClick={()=>this.clearValue()}
                                >{onChangeLanguage(locale,'Refresh',languageData)}</Button> 
                                  
                            </div>
                
                </div> 
                <div style = {{padding :'10px',width:'100%',overflow:'auto'}}>
                     {(columns.length > 0 && data.length > 0) && 
                         <Table                 
                           columns={columns}
                           pagination = {pagination}
                           dataSource={data} 
                           rowKey="id"
                           rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}/>
       
                        }
                     
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

