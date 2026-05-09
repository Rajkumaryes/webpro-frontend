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
import{reportService} from '../../../../redux/Export/report/saga'
import moment from 'moment';
import { Table, Popconfirm ,Tooltip } from 'antd';
import Select from 'react-select';
import DatePicker from "../../datePicker";
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../constants/defaultValues';
import{checklistService} from '../../../../redux/imports/checklist/saga';
import{areaimportService} from '../../../../redux/imports/areaimport/saga';
import { globalerrorService } from '../../../../redux/globalerror/saga'
import { CSVLink } from "react-csv";

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        isEdit:false,
        startdate:'',
        enddate:'',
        team_id:'',
        report:'',
        team_data:[],
        user_data:[],
        is_submit:false,
        data:[],
        record: {},
        page:1,
        pageSize:25,
        total :0,
        days_value:'',
        checklist_data:[],
        area_data:[],
        downloadErrorodata : []
      };
    }
    componentDidMount()
    {
        this.fetchTeamData()
        const {isEdit,record} = this.props
      if(isEdit == true)
      {
        this.setState({
          id:record.id,
          name:record.name,
          status: record.status,
          isEdit:true
        })
      
      } 
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
      fetchPagination(page, per_page, startdate, enddate, is_report) {
        const { team_id, user_data, team_data } = this.state;

        if (enddate && startdate && team_id) {
          const start = Date.parse(startdate);
          const end = Date.parse(enddate);

          if (!isNaN(start) && !isNaN(end) && end > start) {
            const team = getValue(team_data, 'value', 'name', team_id);

            this.setState({
              loading: true,
              page: page,
              pageSize: per_page
            });

            const { username } = this.props;

            globalerrorService.fetcherror(page, per_page, startdate, enddate, user_data, username, team_id)
              .then((res) => {
                if (res.status && Array.isArray(res.data)) {
                  if (res.data.length === 0) {
                    createNotification(res.message, 'error', 'No Records Found');
                  }

                  if (!is_report) {
                    const npdata = res.data.map(productivityData => ({
                      UploadUsername: productivityData.user_id,
                      ErrorDate: productivityData.error_date,
                      ErrorType: productivityData.error_type,
                      Process: productivityData.process,
                      SubProcess: productivityData.sub_process,
                      ErrorCode: productivityData.error_code,
                      Category: productivityData.category,
                      ErrorCapturedUser: productivityData.error_captured_userid,
                      ErrorReviewedUser: productivityData.error_reviewed_userid,
                      Sensitivity: productivityData.with_sensitivity,
                      DetailedDescription: productivityData.detailed_description,
                      ...(productivityData.process === "Tender" && { NoOfLane: productivityData.no_of_lane })
                    }));

                    this.setState({
                      total: res.total,
                      data: res.data,
                      downloadErrorodata: npdata
                    });
                  }
                } else {
                  this.setState({
                    total: 0,
                    data: []
                  });
                  createNotification(res.message, 'error', 'filled');
                }
              })
              .catch(() => {
                createNotification('Something went wrong while fetching data', 'error', 'filled');
              })
              .finally(() => {
                this.setState({ loading: false });
              });

          } else {
            createNotification('Please Choose End Date Above Start Date', 'error', 'filled');
          }
        } else {
          this.setState({ is_submit: true });
          createNotification('Please fill mandatory field', 'error', 'filled');
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

  openModal(record)
  {
	 console.log("rajkumar",record)
	  if(record)
	  {
		  this.setState({
		  isEdit : true,
		  record : record,
		  })
	  }
	  this.setState({
		  modalOpen : true,
	  })
  }
  closeModal(isEdit)
  {
    this.setState({
      modalOpen:false,
      isEdit:false,
      record:{},
    })
    if(isEdit === true)
    {
      this.fetchData()
    }

   
  }

  handleDelete = id => {
    const {startdate,enddate} = this.state
    globalerrorService.errorDelete(id)
    .then((res) => {
      if(res){
        createNotification('Deleted','success','filled')
        this.fetchPagination(1,25,startdate,enddate,false)
      }			
    })
    .catch((error) => { });
  }

    render()
    {
        const {match,locale,languageData} = this.props
        const {enddate,startdate,team_id,team_data,is_submit,loading,data,page,pageSize,downloadErrorodata,
          checklist_data,area_data} = this.state
        var columns= [
        {
            title: onChangeLanguage(locale,'Error Captured User ID',languageData),
            dataIndex: 'error_captured_userid',
            key: 'error_captured_userid',
            render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                {text}    
                </div>),           
            },
            {
            title: onChangeLanguage(locale,'Error Revieved User ID',languageData),
            dataIndex: 'error_reviewed_userid',
            key: 'error_reviewed_userid',
            render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                {text}    
                </div>),           
            },
          {
            title: onChangeLanguage(locale,'Process',languageData),
            dataIndex: 'process',
            key: 'process',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Sub Process',languageData),
            dataIndex: 'sub_process',
            key: 'sub_process',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Error Type',languageData),
            dataIndex: 'error_type',
            key: 'error_type',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Category',languageData),
            dataIndex: 'category',
            key: 'category',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Error Code',languageData),
            dataIndex: 'error_code',
            key: 'error_code',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Transaction Number',languageData),
            dataIndex: 'transaction_no',
            key: 'transaction_no',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Error Date',languageData),
            dataIndex: 'error_date',
            key: 'error_date',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text!==''&& moment(text).format('MM/DD/YYYY hh:mm:ss a')}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Start Date Time',languageData),
            dataIndex: 'start_time',
            key: 'start_time',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text!==''&& moment(text).format('MM/DD/YYYY hh:mm:ss a')} 
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'End Date Time',languageData),
            dataIndex: 'end_time',
            key: 'end_time',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text!==''&& moment(text).format('MM/DD/YYYY hh:mm:ss a')} 
              </div>),           
          },
          
          {
            title: onChangeLanguage(locale,'Action',languageData),
            key: 'id',
           dataIndex: 'id',
            render: (id,record) => (
                <div className="row d-flex justify-content-center" >
                     <Tooltip className = 'fontstyle' title="Edit" placement="bottom">
                            <a onClick = {()=>this.openModal(record)} style = {{color  :'blue' ,height:'25px',width:'25px',padding:'4px'}}>
                                <i className = "simple-icon-pencil"></i>
                            </a>
                         </Tooltip>
                 <Popconfirm className = 'fontstyle' variant="contained" 
                 title="Are you sure to delete?"
                 style = {{
                    backgroundColor: 'rgb(79, 156, 1)',
                    color: 'white' }}
                   onConfirm={() => this.handleDelete(record.id)}
                    >
                       <Tooltip title="Delete" placement="bottom">
                 <a style = {{color  :'red' ,height:'25px',width:'25px',
                            padding:'4px',marginLeft:'12px'}}><i className = "simple-icon-trash"></i></a></Tooltip>
                    </Popconfirm>
            
                     
                  </div>
            )
        }
          
          
          
        ]
        const pagination = {
          ...this.paginationOptions,
          total: this.state.total,
          current: this.state.page,
          pageSize: this.state.pageSize,
          };
        return (
            <>
            <title>{onChangeLanguage(locale,'Error Removal',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'Error Removal',languageData)} match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
        
            <div>
            <CSVLink
              ref={this.csvLink}
              data={downloadErrorodata}
              filename={`Non-Productivity.csv`}
              style={{ display: "none" }} // hidden, triggered programmatically
            />
            <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                          <div className = "row" style = {{padding:'10px'}}>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Team',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                        <Select  className={is_submit === true && team_id === ''?  "error-border-select":"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={team_data.filter(option =>option.value === team_id)}
                                            options={team_data}
                                            onChange={(option) => this.onChangeTeam(option.value)}
                                        />
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Start Date',languageData)}<a style = {{color :'red'}}>*</a>
                                    {(is_submit === true && startdate === '')  && <a className ="fontstyle mandatory-label">{onChangeLanguage(locale,'Mandatory Field',languageData)}</a>}</Label>
                                    
                                     <DatePicker
                                    selected={startdate}
                                    className = "text-background"
                                    onChange={(date) => this.onChangestarttime(date)}
                                    />
                                
                            </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'End Date',languageData)}<a style = {{color :'red'}}>*</a>
                                    {(is_submit === true && enddate === '')  && <a className ="fontstyle mandatory-label">{onChangeLanguage(locale,'Mandatory Field',languageData)}</a>}</Label>
                                  
                                    <DatePicker
                                    selected={enddate}
                                    min_date= {startdate}
                                    className = "text-background"
                                    onChange={(date) => this.onChangeendtime(date)}
                                    />
                                </div>
                                 <div className = "col-md-3 space-margin"  >
                       
                                  {downloadErrorodata && downloadErrorodata.length > 0 && (
                                    <div className="text-center" style={{ marginBottom: '20px' }}>
                                      <CSVLink
                                        className="button-width"
                                        style={{
                                          color: 'white',
                                          padding: '10px 0', // Adjusted padding for better vertical alignment
                                          border: 'none',
                                          borderRadius: '5px',
                                          backgroundColor: '#008000',
                                          marginTop: '20px',
                                          cursor: 'pointer',
                                          fontSize: '14px',
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          height: '35px', // Slightly taller for better appearance
                                          width: '160px', // Wider for center alignment
                                        }}
                                        data={downloadErrorodata}
                                        filename={`Error.csv`}
                                      >
                                        <i className="simple-icon-cloud-download" style={{ marginRight: '8px' }} />
                                        {onChangeLanguage(locale, 'Download', languageData)}
                                      </CSVLink>
                                    </div>
                                  )}
                                  {/* ...existing code... */}
                                </div>
                             </div>
                             {/* <div className = "text-center" style = {{padding:'0px 0px 20px'}}>
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
                                  
                            </div> */}
                
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

