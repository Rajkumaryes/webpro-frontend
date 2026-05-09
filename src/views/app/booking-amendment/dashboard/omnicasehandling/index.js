import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../../containers/navs/Breadcrumb';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../../toast';
import {onChangeLanguage,getValue,convertLocalToUTCDate} from '../../../../../helper'
import{teamsService} from '../../../../../redux/teams/saga'
import{userService} from '../../../../../redux/users/saga'
import{reportService} from '../../../../../redux/bookingamendment/report/saga'
import{activitytypeService} from '../../../../../redux/vesselchartering/activitytype_vessle/saga';
import moment from 'moment';
import { Table,Tooltip } from 'antd';
import Select from 'react-select';
import DatePicker from "../../../datePicker";
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../../constants/defaultValues';
import{issuecodeService} from '../../../../../redux/bookingprocess/issuecode/saga';
import{bookingstatusService} from '../../../../../redux/bookingprocess/bookingstatus/saga'
import{exceptionpartyService} from '../../../../../redux/bookingprocess/exceptionparty/saga'
import { getCurrentUser } from '../../../../../helpers/Utils';
import { CSVLink, CSVDownload } from "react-csv";
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

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
        activity_data:[],
        issuecode_data:[],
        exception_partydata:[],
        bookingstatusdata:[],
        is_submit:false,
        data:[],
        exceldata:[],
        page:1,
        pageSize:25,
        total :0,
        days_value:'',
        teams_id:[],
        teams_name:[],
        count:0,
        usersList:[],
        searchString: '',
      };
      this.countRef = React.createRef();
    }
  
    componentDidMount()
    {
        this.fetchTeamData()
    }

    fetchTeamData() {  
        this.setState({
          loading : false
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
                   
                    let tmpArray = []
                    for (var i = 0; i < res.data.length; i++) {
                        tmpArray.push(String(res.data[i].id))
                    }             
                    
                    let tmpArray2 = []
                    for (var i = 0; i < res.data.length; i++) {
                      tmpArray2.push(String(res.data[i].name))
                    } 
                    
                  this.setState({
                    team_data :  list,
                    teams_id :  tmpArray,
                    teams_name :  tmpArray2,
                })
              }  
              
              console.log(teams_id)
              console.log(teams_name)
              
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
                var list = [];
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
     
    fetchPagination(page,per_page,enddate,is_report)
    {
        
        const {team_id,user_data,team_data} = this.state
        if(enddate !== ""  && team_id !== "")
        {
          if ((Date.parse(enddate)))
           {
            const team = getValue(team_data,'value','name',team_id)
            this.setState({
                loading : true,
                page:page,
                pageSize:per_page
            })
            const {username} = this.props
            const report_url =  'omnicasehandling',
            menu= 'Booking Process' , 
            submenu='Booking Process',
            type = 'Raw Data'
            reportService.fetchomnicasehandling(report_url,page,per_page,enddate,user_data,is_report,
              username,menu,submenu,team_id,team,type)
            .then((res) => { 
              this.setState({   
                   loading : false   
              }) 
              //alert(res)
            //   console.log(res.data)
              if(res.status)
                {
                  if(is_report !== true)
                  {
                    if(res.data)
                    {
                        const newData = [];
                        const groupedData = {};
                        const tablearray = [];
                        res.data.forEach(({ username, dateHour, eqvalue }, index) => {
                          if (!groupedData[username]) {
                            groupedData[username] = {
                              username,
                            };
                            newData.push(groupedData[username]);
                          }

                          groupedData[username][`dateHour${dateHour}`] = dateHour;
                          groupedData[username][`eqvalue${dateHour}`] = eqvalue;
                        });
                        newData.forEach((item,index) => {
                          const tableobj = {};
                          tableobj ["User"] = item.username;
                          tableobj ["1 AM"] = item.eqvalue1 || 0;
                          tableobj ["2 AM"] = item.eqvalue2 || 0;
                          tableobj ["3 AM"] = item.eqvalue3 || 0;
                          tableobj ["4 AM"] = item.eqvalue4 || 0;
                          tableobj ["5 AM"] = item.eqvalue5 || 0;
                          tableobj ["6 AM"] = item.eqvalue6 || 0;
                          tableobj ["7 AM"] = item.eqvalue7 || 0;
                          tableobj ["8 AM"] = item.eqvalue8 || 0;
                          tableobj ["9 AM"] = item.eqvalue9 || 0;
                          tableobj ["10 AM"] = item.eqvalue10 || 0;
                          tableobj ["11 AM"] = item.eqvalue11 || 0;
                          tableobj ["12 PM"] = item.eqvalue12 || 0;
                          tableobj ["1 PM"] = item.eqvalue13 || 0;
                          tableobj ["2 PM"] = item.eqvalue14 || 0;
                          tableobj ["3 PM"] = item.eqvalue15 || 0;
                          tableobj ["4 PM"] = item.eqvalue16 || 0;
                          tableobj ["5 PM"] = item.eqvalue17 || 0;
                          tableobj ["6 PM"] = item.eqvalue18 || 0;
                          tableobj ["7 PM"] = item.eqvalue19 || 0;
                          tableobj ["8 PM"] = item.eqvalue20 || 0;
                          tableobj ["9 PM"] = item.eqvalue21 || 0;
                          tableobj ["10 PM"] = item.eqvalue22 || 0;
                          tableobj ["11 PM"] = item.eqvalue23 || 0;
                          tableobj ["12 AM"] = item.eqvalue24 || 0;
                          const totalEQValue = (parseFloat(item.eqvalue1) || 0) + (parseFloat(item.eqvalue2) || 0) + (parseFloat(item.eqvalue3) || 0) + (parseFloat(item.eqvalue4) || 0) +
                          (parseFloat(item.eqvalue5) || 0) + (parseFloat(item.eqvalue6) || 0) + (parseFloat(item.eqvalue7) || 0) + (parseFloat(item.eqvalue8) || 0) + (parseFloat(item.eqvalue9) || 0) +
                          (parseFloat(item.eqvalue10) || 0) + (parseFloat(item.eqvalue11) || 0) + (parseFloat(item.eqvalue12) || 0) + (parseFloat(item.eqvalue13) || 0) + (parseFloat(item.eqvalue14) || 0) +
                          (parseFloat(item.eqvalue15) || 0) + (parseFloat(item.eqvalue16) || 0) + (parseFloat(item.eqvalue17) || 0) + (parseFloat(item.eqvalue18) || 0) + (parseFloat(item.eqvalue19) || 0) +
                          (parseFloat(item.eqvalue20) || 0) + (parseFloat(item.eqvalue21) || 0) + (parseFloat(item.eqvalue22) || 0) + (parseFloat(item.eqvalue23) || 0) + (parseFloat(item.eqvalue24) || 0);

                          tableobj ["Total EQ Value"] = totalEQValue;
                          var targetEq = 48;
                        //   if (targetEq !== 0) {
                        //       var percentage = (totalEQValue / targetEq) * 100;
                        //       var productivity = percentage.toFixed(0);
                        //     }
                            if (targetEq !== 0) {
                                const percentage = ((totalEQValue / targetEq) * 100).toFixed(2); 
                                tableobj["Productivity"] = `${percentage}%`;
                              } else {
                                tableobj["Productivity"] = "0%";
                              }
                        //   tableobj ["Productivity"] = productivity || 0;
                          tablearray.push(tableobj);
                        })
                        // console.log(tablearray)
                        var counts = newData.length;
                      this.setState({
                        total:counts,
                        data:newData,
                        exceldata:tablearray
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
       const {team_id} = this.state
       if(team_id !== '')
       {
        this.setState({enddate  : date})
        this.fetchPagination(1,25,date,false)
       }
       else
       {
        createNotification('Please Choose Team','error','filled');
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
    this.fetchPagination(1,25,convertLocalToUTCDate(new Date()),false)
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
     this.fetchPagination(page,pageSize,enddate,false)
    },
    pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
    // total: this.state.total  ,
    showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total}`,
  };

  handleChange = (e) => {
    this.setState({ searchString:e.target.value });
  }
    render()
    {
 
        const {match,locale,languageData,} = this.props
        const {enddate,startdate,team_id,team_data,is_submit,loading,data,exceldata,page,pageSize,
          bookingstatusdata,exception_partydata,user_data,searchString} = this.state
        var columns= [
          {
            title: onChangeLanguage(locale,'User',languageData),
            dataIndex: 'username',
            key: 'username',
            render: (text, record) => ( 
              <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'100px'}}>
                {text}
              </div>),
          },
          {
            title: onChangeLanguage(locale,'1 AM',languageData),
            dataIndex: 'eqvalue1',
            key: 'eqvalue1',
            render: (text, record) => ( 
              <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'50px'}}>
                {text || '0'}
              </div>),
          },
          {
            title: onChangeLanguage(locale,'2 AM',languageData),
            dataIndex: 'eqvalue2',
            key: 'eqvalue2',
            render: (text, record) => ( 
              <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'50px'}}>
                {text || '0'}
              </div>),
          },
          {
            title: onChangeLanguage(locale,'3 AM',languageData),
            dataIndex: 'eqvalue3',
            key: 'eqvalue3',
            render: (text, record) => ( 
              <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'50px'}}>
                {text || '0'}
              </div>),
          },
          {
              title: onChangeLanguage(locale,'4 AM',languageData),
              dataIndex: 'eqvalue4',
              key: 'eqvalue4',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'50px'}}>
                  {text || '0'}
                </div>),
            },
            {
              title: onChangeLanguage(locale,'5 AM',languageData),
              dataIndex: 'eqvalue5',
              key: 'eqvalue5',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'50px'}}>
                  {text || '0'}
                </div>),
            },
            {
              title: onChangeLanguage(locale,'6 AM',languageData),
              dataIndex: 'eqvalue6',
              key: 'eqvalue6',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'50px'}}>
                  {text || '0'}
                </div>),
            },
            {
              title: onChangeLanguage(locale,'7 AM',languageData),
              dataIndex: 'eqvalue7',
              key: 'eqvalue7',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'50px'}}>
                  {text || '0'}
                </div>),
            },
            {
              title: onChangeLanguage(locale,'8 AM',languageData),
              dataIndex: 'eqvalue8',
              key: 'eqvalue8',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'50px'}}>
                  {text || '0'}
                </div>),
            },
              {
                title:onChangeLanguage(locale,'9 AM',languageData) ,
                dataIndex: 'eqvalue9',
                key: 'eqvalue9',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'50px'}}>
                    {text || '0'}
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'10 AM',languageData) ,
                dataIndex: 'eqvalue10',
                key: 'eqvalue10',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'50px'}}>
                    {text || '0'}
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'11 AM',languageData) ,
                dataIndex: 'eqvalue11',
                key: 'eqvalue11',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'50px'}}>
                    {text || '0'}
                  </div>),
              },
             
              {
                title:onChangeLanguage(locale,'12 PM',languageData) ,
                dataIndex: 'eqvalue12',
                key: 'eqvalue12',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'50px'}}>
                    {text || '0'}
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'1 PM',languageData) ,
                dataIndex: 'eqvalue13',
                key: 'eqvalue13',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'50px'}}>
                    {text || '0'}
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'2 PM',languageData) ,
                dataIndex: 'eqvalue14',
                key: 'eqvalue14',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'50px'}}>
                    {text || '0'}
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'3 PM',languageData) ,
                dataIndex: 'eqvalue15',
                key: 'eqvalue15',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'50px'}}>
                    {text || '0'}
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'4 PM',languageData) ,
                dataIndex: 'eqvalue16',
                key: 'eqvalue16',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'50px'}}>
                    {text || '0'}
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'5 PM',languageData) ,
                dataIndex: 'eqvalue17',
                key: 'eqvalue17',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'50px'}}>
                    {text || '0'}
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'6 PM',languageData) ,
                dataIndex: 'eqvalue18',
                key: 'eqvalue18',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'50px'}}>
                    {text || '0'}
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'7 PM',languageData) ,
                dataIndex: 'eqvalue19',
                key: 'eqvalue19',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'50px'}}>
                    {text || '0'}
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'8 PM',languageData) ,
                dataIndex: 'eqvalue20',
                key: 'eqvalue20',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'50px'}}>
                    {text || '0'}
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'9 PM',languageData) ,
                dataIndex: 'eqvalue21',
                key: 'eqvalue21',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'50px'}}>
                    {text || '0'}
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'10 PM',languageData) ,
                dataIndex: 'eqvalue22',
                key: 'eqvalue22',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'50px'}}>
                    {text || '0'}
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'11 PM',languageData) ,
                dataIndex: 'eqvalue23',
                key: 'eqvalue23',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'50px'}}>
                    {text || '0'}
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'12 AM',languageData) ,
                dataIndex: 'eqvalue24',
                key: 'eqvalue24',
                render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'50px'}}>
                    {text || '0'}
                  </div>),
              },
              {
                title: 'Total EQ Value',
                dataIndex: 'total',
                key: 'total',
                render: (_, record) => {
                  const totalEQValue = (parseFloat(record.eqvalue1) || 0) + (parseFloat(record.eqvalue2) || 0) + (parseFloat(record.eqvalue3) || 0) + (parseFloat(record.eqvalue4) || 0) +
                  (parseFloat(record.eqvalue5) || 0) + (parseFloat(record.eqvalue6) || 0) + (parseFloat(record.eqvalue7) || 0) + (parseFloat(record.eqvalue8) || 0) + (parseFloat(record.eqvalue9) || 0) +
                  (parseFloat(record.eqvalue10) || 0) + (parseFloat(record.eqvalue11) || 0) + (parseFloat(record.eqvalue12) || 0) + (parseFloat(record.eqvalue13) || 0) + (parseFloat(record.eqvalue14) || 0) +
                  (parseFloat(record.eqvalue15) || 0) + (parseFloat(record.eqvalue16) || 0) + (parseFloat(record.eqvalue17) || 0) + (parseFloat(record.eqvalue18) || 0) + (parseFloat(record.eqvalue19) || 0) +
                  (parseFloat(record.eqvalue20) || 0) + (parseFloat(record.eqvalue21) || 0) + (parseFloat(record.eqvalue22) || 0) + (parseFloat(record.eqvalue23) || 0) + (parseFloat(record.eqvalue24) || 0);
                  const formattedTotalEQValue = totalEQValue.toFixed(2);
                  return <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'100px',color: formattedTotalEQValue >= 48 ? "green" : "red"}}>
                    {formattedTotalEQValue >= 48 ? <div><AiOutlineArrowUp/>{formattedTotalEQValue}</div>:<div><AiOutlineArrowDown/>{formattedTotalEQValue}</div>}
                    </div>;
                },
              },
              {
                title: 'Productivity',
                dataIndex: 'productivity',
                key: 'productivity',
                render: (_, record) => {
                    const totalEQValue = (parseFloat(record.eqvalue1) || 0) + (parseFloat(record.eqvalue2) || 0) + (parseFloat(record.eqvalue3) || 0) + (parseFloat(record.eqvalue4) || 0) +
                    (parseFloat(record.eqvalue5) || 0) + (parseFloat(record.eqvalue6) || 0) + (parseFloat(record.eqvalue7) || 0) + (parseFloat(record.eqvalue8) || 0) + (parseFloat(record.eqvalue9) || 0) +
                    (parseFloat(record.eqvalue10) || 0) + (parseFloat(record.eqvalue11) || 0) + (parseFloat(record.eqvalue12) || 0) + (parseFloat(record.eqvalue13) || 0) + (parseFloat(record.eqvalue14) || 0) +
                    (parseFloat(record.eqvalue15) || 0) + (parseFloat(record.eqvalue16) || 0) + (parseFloat(record.eqvalue17) || 0) + (parseFloat(record.eqvalue18) || 0) + (parseFloat(record.eqvalue19) || 0) +
                    (parseFloat(record.eqvalue20) || 0) + (parseFloat(record.eqvalue21) || 0) + (parseFloat(record.eqvalue22) || 0) + (parseFloat(record.eqvalue23) || 0) + (parseFloat(record.eqvalue24) || 0);
                    const formattedTotalEQValue = totalEQValue.toFixed(2);
                    var targetEq = 48;
                    // if (targetEq !== 0) {
                    //     var percentage = (totalEQValue / targetEq) * 100;
                    //     var productivity = percentage.toFixed(0);
                    //   }
                      if (targetEq !== 0) {
                        const percentage = ((totalEQValue / targetEq) * 100).toFixed(2); 
                        var productivity = `${percentage}%`;
                      } else {
                       var productivity = "0%";
                      }
                    return <div className="row d-flex justify-content-center" >
                      {productivity}
                      </div>;
                  },
              },
        ]
        const filteredData = data.filter((record) =>
        Object.values(record).some((value) =>
          value.toString().toLowerCase().includes(searchString.toLowerCase())
        ));
        const pagination = {
          ...this.paginationOptions,
          total: this.state.total,
          current: this.state.page,
          pageSize: this.state.pageSize,
          };
        return (
            <>
            <title>{onChangeLanguage(locale,'Booking Amendment Dashboard',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'Booking Amendment Dashboard',languageData)} match={match} />
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
                                {/* <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Start Date',languageData)}<a style = {{color :'red'}}>*</a>
                                    {(is_submit === true && startdate === '')  && <a className ="fontstyle mandatory-label">{onChangeLanguage(locale,'Mandatory Field',languageData)}</a>}</Label>
                                    
                                     <DatePicker
                                    selected={startdate}
                                    className = "text-background"
                                    onChange={(date) => this.onChangestarttime(date)}
                                    />
                                
                            </div> */}
                            
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Date',languageData)}<a style = {{color :'red'}}>*</a>
                                    {(is_submit === true && enddate === '')  && <a className ="fontstyle mandatory-label">{onChangeLanguage(locale,'Mandatory Field',languageData)}</a>}</Label>
                                  
                                    <DatePicker
                                    selected={enddate}
                                    min_date= {startdate}
                                    className = "text-background"
                                    onChange={(date) => this.onChangeendtime(date)}
                                    />
                                </div>
                                
                                <div className = "col-md-4 space-margin"  style={{textAlign:'center',marginTop:'25px'}}>
                                  
                                <Label  className = "fontstyle normal-font" ></Label>
                                {(columns.length > 0 && data.length > 0) && 
                               
                                  <CSVLink className = "button-width" color="secondary" 
                                  style = {{color :'white',padding:'8px 16px',border:'none',borderRadius:'4px',backgroundColor:'#121C50',cursor:'pointer',fontSize:'14px'}}
                                      data={exceldata} filename={`Booking Amendment ${moment(enddate).format('DD/MM/YYYY')}.csv`}
                                  ><i className = "simple-icon-cloud-download" style = {{marginRight:'5px'}}/>
                                  {onChangeLanguage(locale,'Download',languageData)} 
                                  </CSVLink>
                                }
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
                                  
                            </div>
                 */}
                </div> 
                <div style = {{padding :'0px',width:'100%',overflow:'auto'}}>
                     {(columns.length > 0 && data.length > 0) && 
                    
                      <>
                      <Colxx xxs="2" className="mb-2" style = {{paddingLeft : '0px'}}><Input 
                    type="text" value={this.state.searchString} onChange={this.handleChange}
                    placeholder={onChangeLanguage(locale, 'Search User', languageData)}
                    ></Input></Colxx>
                    <Table
                      columns={columns}
                      pagination={pagination}
                      dataSource={filteredData}
                      rowKey="id"
                      rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'} /></>
       
                        }


                        {/* <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Eqvalue</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([username, dataArray], index) => (
            dataArray.map(({ dateHour, eqvalue }, idx) => (
              <tr key={index + idx}>
                {idx === 0 ? <td rowSpan={dataArray.length}>{username}</td> : null}
                {dateHour == '19' ? <td >{eqvalue}</td> : null}
              </tr>
            ))
          ))}
        </tbody>
      </table> */}
                     
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