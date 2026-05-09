import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Button,ModalHeader,Modal,ModalBody} from 'reactstrap';
import { Colxx, Separator } from '../../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../../containers/navs/Breadcrumb';
// import Create from './create'
import { Table,Input, Popconfirm ,Tooltip } from 'antd';
import 'antd/dist/antd.css';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage,getValue} from '../../../../../helper'
import Select from 'react-select';
import{teamsService} from '../../../../../redux/teams/saga'
import{userService} from '../../../../../redux/users/saga'
import{reportService} from '../../../../../redux/bookingprocess/report/saga'
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../../constants/defaultValues';
// import{uploadService} from '../../../../../redux/automation/automation/saga'
import Workbook from 'react-excel-workbook'
import DatePicker from "../../../datePicker";
import { date } from 'yup';
import Loading from "react-fullscreen-loading";
import moment from 'moment';

class MasterPage extends Component {
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
        activity_data:[],
        issuecode_data:[],
        exception_partydata:[],
        bookingstatusdata:[],
        is_submit:false,
        data:[],
        page:1,
        pageSize:25,
        total :0,
        days_value:'',
      };
    }
    componentWillMount()
    {
      this.fetchTeamData()
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
      loading : false
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
         const report_url =  'booking',
         menu= 'Booking Process' , 
         submenu='Booking Process',
         type = 'Raw Data'
         reportService.fetchapi(report_url,page,per_page,startdate,enddate,user_data,is_report,
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
      const {locale,languageData,match} = this.props
      const {enddate,startdate,team_id,team_data,is_submit,loading,data,page,pageSize,
        bookingstatusdata,exception_partydata} = this.state
    
        var columns= [
          {
            title: onChangeLanguage(locale,'GSC User Id',languageData),
            dataIndex: 'gsc_userid',
            key: 'gsc_userid',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'200px'}}>
                {text}
              </div>)
          },
          {
            title: onChangeLanguage(locale,'Start Time',languageData),
            dataIndex: 'start_time',
            key: 'start_time',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'200px'}}>
                {text !== '' ? moment(text).format('hh:mm:ss a') :''} 
              </div>)
          },
          {
            title: onChangeLanguage(locale,'End Time',languageData),
            dataIndex: 'end_time',
            key: 'end_time',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'200px'}}>
               {text !== '' ? moment(text).format('hh:mm:ss a') :''} 
              </div>)
          },
          {
            title:onChangeLanguage(locale,'CSB Office/Assigned user ID',languageData),
            dataIndex: 'csb_office',
            key: 'csb_office',
            render: (text, record,index) => ( 
              <div   style = {{padding:'2px',width:'200px'}}>
              {text}
              </div>),
          },
          {
              title: onChangeLanguage(locale,'Region',languageData),
              dataIndex: 'region',
              key: 'region',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                  {getValue(this.state.issuecode_data, 'id', 'region', text)}
                  </div>),
            },
            {
              title: onChangeLanguage(locale,'Area',languageData),
              dataIndex: 'area',
              key: 'area',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                 {getValue(this.state.issuecode_data, 'id', 'area', text)}
                </div>),
            },
            {
              title: onChangeLanguage(locale,'Sub Area',languageData),
              dataIndex: 'team',
              key: 'team',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                 {getValue(this.state.issuecode_data, 'id', 'team', text)}
                 
                </div>),
            },
            {
              title: onChangeLanguage(locale,'Booking Number',languageData),
              dataIndex: 'booking_number',
              key: 'booking_number',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'200px'}}>
                  {text}
                </div>)
            },
            
            // {
            //   title: onChangeLanguage(locale,'Assigned user ID',languageData),
            //   dataIndex: 'assigned_user',
            //   key: 'assigned_user',
            //   render: (text, record) => ( 
            //       <div className="row d-flex justify-content-center"  style = {{padding:'2px',width:'200px'}}>
            //         {text}
            //       </div>)
            // },
            {
              title: onChangeLanguage(locale,'CU Match Code',languageData),
              dataIndex: 'cu_matchcode',
              key: 'cu_matchcode',
              render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>{text}
                  </div>)
            },
              {
                title:onChangeLanguage(locale,'MR Match Code',languageData) ,
                dataIndex: 'mr_matchcode',
                key: 'mr_matchcode',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                    {text}
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'ABC/Non ABC',languageData) ,
                dataIndex: 'abc_nonabc',
                key: 'abc_nonabc',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                    {text}
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Export Haulage',languageData) ,
                dataIndex: 'export_haulage',
                key: 'export_haulage',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                    {text}
                  </div>),
              },
             
              {
                title:onChangeLanguage(locale,'Received Date',languageData) ,
                dataIndex: 'received_date',
                key: 'received_date',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                     {text !== '' ? moment(text).format('MM/DD/YYYY hh:mm:ss a') :''} 
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Function',languageData) ,
                dataIndex: 'functions',
                key: 'functions',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                    {text}
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Cargo Type',languageData) ,
                dataIndex: 'cargo_type',
                key: 'cargo_type',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                    {text}
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Tariff ID',languageData) ,
                dataIndex: 'tariff_id',
                key: 'tariff_id',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                    {text}
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'No of Roll Overs',languageData) ,
                dataIndex: 'no_of_roll',
                key: 'no_of_roll',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                    {text}
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Booking Status',languageData) ,
                dataIndex: 'booking_status',
                key: 'booking_status',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                    {getValue(bookingstatusdata, 'value', 'label', text)} 
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Exception party',languageData) ,
                dataIndex: 'exception_party',
                key: 'exception_party',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                     {getValue(exception_partydata, 'value', 'label', text)} 
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Exception Raised Date & Time',languageData) ,
                dataIndex: 'exception_raised_date',
                key: 'exception_raised_date',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                   {text !== '' ? moment(text).format('MM/DD/YYYY hh:mm:ss a') :''} 
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'CRM Case Number',languageData) ,
                dataIndex: 'case_number',
                key: 'case_number',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                    {text}
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Exception Reason',languageData) ,
                dataIndex: 'reasons',
                key: 'reasons',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                    {text}
                  </div>),
              },
              // {
              //   title:onChangeLanguage(locale,'Last POD',languageData) ,
              //   dataIndex: 'last_pod',
              //   key: 'last_pod',
              //   render: (text, record) => ( 
              //     <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
              //       {text}
              //     </div>),
              // },
              // {
              //   title:onChangeLanguage(locale,'End POD',languageData) ,
              //   dataIndex: 'end_pod',
              //   key: 'end_pod',
              //   render: (text, record) => ( 
              //     <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
              //       {text}
              //     </div>),
              // },
              {
                title:onChangeLanguage(locale,'Comments',languageData) ,
                dataIndex: 'comments',
                key: 'comments',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
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
            <title>{onChangeLanguage(locale,'Auditing',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'Auditing',languageData)} match={match} />
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
                                    <Label  className = {is_submit === true && team_id === ''?  "error-border-select":"react-select fontstyle" } >{onChangeLanguage(locale,'Team',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                        <Select  className=""
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
                                {/* <Button className = "button-width" color="secondary" 
                                    onClick={()=>this.fetchPagination(page,pageSize,starttime,endtime,true)} >
                                      <i className = "simple-icon-cloud-download" style = {{marginRight:'5px'}}/>
                                      {onChangeLanguage(locale,'Download',languageData)}</Button>  */}

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
  const { locale,languageData} = settings;
  return {locale, languageData};
};
  export default withRouter(
    connect(mapStateToProps, {

   })(MasterPage)
  );

