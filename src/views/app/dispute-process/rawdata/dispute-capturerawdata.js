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
import{reportService} from '../../../../redux/Dispute-process/dispute-capturerawdata/saga'
import moment from 'moment';
import { Table,Tooltip } from 'antd';
import Select from 'react-select';
import DatePicker from "../../datePicker";
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../constants/defaultValues';
import{ProcessService} from '../../../../redux/projectmasters/diputemaster/process/saga'
import{CountryService} from '../../../../redux/projectmasters/diputemaster/country/saga';
import{DisputestatusService} from '../../../../redux/projectmasters/diputemaster/diputestatus/saga'
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
        teamdata:[],
        diputesourcedata:[],
        countrydata:[],
        processdata:[],
        disputestatusdata:[],
      };
    }
    componentDidMount()
    {
        this.fetchTeamData()
        this.fetchcountry()
        this.fetchdiputestatus()
        this.fetchprocess()
  }
  fetchcountry() {
    this.setState({
        loading : true
      })
      CountryService.fetchcountry()
    .then((res) => {
        this.setState({loading:false})
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var typelist = filterstatus.map(function(typename) {
                  return  {label : typename.name ,value : (typename.id).toString()};
               });  
                this.setState({
                  countrydata :  typelist,
                })
             }
            
             })
             .catch((error) => { 
                this.setState({
                    loading : false
                  })
             }); 
 } 
 
 fetchprocess() {
    this.setState({
        loading : true
      })
      ProcessService.fetchProcess()
    .then((res) => {
        this.setState({loading:false})
       if(res.status)   { 
        let filterstatus = (res.data).filter(item => item.status === 1)
        var regionlist = filterstatus.map(function(regionname) {
             return  {label : regionname.name ,value : (regionname.id).toString()};
          }); 
                this.setState({
                    processdata :  regionlist,
                })
             }
            
             })
             .catch((error) => { 
                this.setState({
                    loading : false
                  })
             }); 
 } 

fetchdiputestatus() {
this.setState({
    loading : true
  })
  DisputestatusService.fetchDisputestatus()
.then((res) => {
    this.setState({loading:false})
   if(res.status)   { 
    let filterstatus = (res.data).filter(item => item.status === 1)
    var regionlist = filterstatus.map(function(regionname) {
         return  {label : regionname.name ,value : (regionname.id).toString()};
      }); 
            this.setState({
                disputestatusdata :  regionlist,
            })
         }
        
         })
         .catch((error) => { 
            this.setState({
                loading : false
              })
         }); 
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
                     return  {label : areaaval.name+'-'+areaaval.country_code ,name : areaaval.name,value : (areaaval.id).toString()};
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
            const menu= 'Dispute Process' , 
            submenu='Dispute Capture',
            type = 'Raw Data'
            reportService.fetchapi(page,per_page,startdate,enddate,user_data,is_report,
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
                    else{
                      this.setState({
                       data:[]
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
      console.log("lklkgkjkv startdate " ,date)
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
    let end_date=convertLocalToUTCDate(new Date())
    this.setState({
      startdate:new Date(finalDate),
      enddate:end_date
    })
    this.fetchPagination(1,25, new Date(finalDate),end_date,false)
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
          processdata,countrydata,disputestatusdata,  teamdata} = this.state
        var columns= [
          {
            title: onChangeLanguage(locale,'ID',languageData),
            dataIndex: 'id',
            key: 'id',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'From',languageData),
            dataIndex: 'from',
            key: 'from',
            render: (text, record) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text} 
                </div>),
          },
          {
            title: onChangeLanguage(locale,'Subject',languageData),
            dataIndex: 'subject',
            key: 'subject',
            render: (text, record) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
              {text} 
              </div>),
          },
          {
            title: onChangeLanguage(locale,'Mail Received Time',languageData),
            dataIndex: 'mail_received',
            key: 'mail_received',
            render: (text, record) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
              {text !=='' ? moment((text)).format('MM/DD/YYYY hh:mm:ss a'):''} 
              </div>),
          },
          {
            title: onChangeLanguage(locale,'Dispute Source',languageData),
            dataIndex: 'dispute_source',
            key: 'dispute_source',
            render: (text, record) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
                {text} 
              </div>)
          },
          {
            title: onChangeLanguage(locale,'Process',languageData),
            dataIndex: 'process',
            key: 'process',
            render: (text, record) => ( 
              <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'100px'}}>
                  {getValue(processdata,'value','label',text)} 
              </div>)
          },
          {
            title:onChangeLanguage(locale,'Country',languageData),
            dataIndex: 'country',
            key: 'country',
            render: (text, record) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
                {getValue(countrydata,'value','label',text)} 
              
              </div>),
          },
          {
            title: onChangeLanguage(locale,'Original Invoice Amount',languageData),
            dataIndex: 'original_invoice',
            key: 'original_invoice',
            render: (text, record) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                {text}
                </div>)
          },
          {
            title: onChangeLanguage(locale,'Dispute Status',languageData),
            dataIndex: 'dispute_status',
            key: 'dispute_status',
            render: (text, record) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                  {getValue(disputestatusdata,'value','label',text)}
                </div>)
          },
            {
              title:onChangeLanguage(locale,'Dispute ID',languageData) ,
              dataIndex: 'dispute_id',
              key: 'dispute_id',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'100px'}}>
                  {text}
                </div>),
            },
            {
              title: onChangeLanguage(locale,'Invoice Number',languageData),
              dataIndex: 'invoice_number',
              key: 'invoice_number',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'100px'}}>
                 {text}
                </div>)
            },
            {
              title: onChangeLanguage(locale,'MTD Number / Bill',languageData),
              dataIndex: 'mtd_number',
              key: 'mtd_number',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'100px'}}>
                  {text}
                </div>)
            },
            {
              title: onChangeLanguage(locale,'Amount Disputed',languageData),
              dataIndex: 'amount_disputed',
              key: 'amount_disputed',
              render: (text, record) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}
                </div>),
              },
            {
              title:onChangeLanguage(locale,'Dispute Reason / Dispute Description',languageData) ,
              dataIndex: 'dispute_des',
              key: 'dispute_des',
              render: (text, record) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                {text}
                </div>),
            },
            {
              title:onChangeLanguage(locale,'Dispute Type Code',languageData) ,
              dataIndex: 'dispute_code',
              key: 'dispute_code',
              render: (text, record) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
              {text}
                </div>),
            },
            
            {
              title: onChangeLanguage(locale,'Dispute Creation Date & Time',languageData),
              dataIndex: 'dispute_creation',
              key: 'dispute_creation',
              render: (text, record) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
              {text !=='' ? moment((text)).format('MM/DD/YYYY hh:mm:ss a'):''} 
                </div>),
            },
            {
              title:onChangeLanguage(locale,'Company Name',languageData),
              dataIndex: 'company_name',
              key: 'company_name',
              render: (text, record) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                {text}
                </div>),
            },
            {
              title: onChangeLanguage(locale,'Phone Number',languageData),
              dataIndex: 'phone_number',
              key: 'phone_number',
              render: (text, record) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                {text}
                </div>),
            },
            {
              title: onChangeLanguage(locale,'Email',languageData),
              dataIndex: 'email',
              key: 'email',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'100px'}}>
                   {text}
                </div>)
             
            },
            {
              title: onChangeLanguage(locale,'Payer',languageData),
              dataIndex: 'payer',
              key: 'payer',
              render: (text, record) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}
                </div>),
            },
            {
              title: onChangeLanguage(locale,'Receiver User / Group',languageData),
              dataIndex: 'receiver_user',
              key: 'receiver_user',
              render: (text, record) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}
                </div>),
            },
            
            {
              title: onChangeLanguage(locale,'Remarks',languageData),
              dataIndex: 'remarks',
              key: 'remarks',
              render: (text, record) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}
                </div>),
            },
          
        ]
        const pagination = {
          ...this.paginationOptions,
          total: this.state.total,
          current: this.state.page,
          pageSize: this.state.pageSize,
          };
        return (
            <>
            <title>{onChangeLanguage(locale,'Dispute Capture Raw Data',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'Dispute Capture Raw Data',languageData)} match={match} />
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

