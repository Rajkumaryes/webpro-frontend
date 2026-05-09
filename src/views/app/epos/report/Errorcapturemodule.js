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
import{reportService} from '../../../../redux/EPOS/report/saga'
import moment from 'moment';
import { Table,Tooltip } from 'antd';
import Select from 'react-select';
import DatePicker from "../../datePicker";
import{areaerrorService} from '../../../../redux/EPOS/areaerror/saga';
import{sourceerrorService} from '../../../../redux/EPOS/sourceerror/saga';
import{regionerrorService} from '../../../../redux/EPOS/regionerror/saga';
import{activitytypeerrorService} from '../../../../redux/EPOS/activitytypeerror/saga';
import{typeofreportService} from '../../../../redux/EPOS/typeofreport/saga';
import{activitysService} from '../../../../redux/EPOS/activitys/saga';
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../constants/defaultValues';


import{areaimportService} from '../../../../redux/imports/areaimport/saga';

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
        sourcedata:[],
        activitydata:[],
        activitysdata:[],
        regiondata:[],
        areadata:[],
        type_of_report_data:[],

      };
    }
    componentDidMount()
    {
        this.fetchTeamData()
        this.fetchactivityapi()
        this.fetchRegion()
        this.fetchtype()
        this.fetchSource()
        this.fetcharea()
        this.fetchactivitys()
    }

    fetchtype() {
      this.setState({
        loading : true
      })
      typeofreportService.fetchtypeofreport()
        .then((res) => {
            this.setState({loading:false})
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var arealist = filterstatus.map(function(areaaval) {
                      return  {label : areaaval.name ,value : (areaaval.id).toString()};
                   });  
                    this.setState({
                    type_of_report_data :  arealist,
                    })
                 }
                 console.log(arealist,'areaaaaaaaaaa')
                
                 })
                 .catch((error) => { 
                    this.setState({
                        loading : false
                      })
                 }); 
     }
    fetchSource() {
      this.setState({
        loading : true
      })
      sourceerrorService.fetchsourceerror()
        .then((res) => {
            this.setState({loading:false})
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var arealist = filterstatus.map(function(areaaval) {
                      return  {label : areaaval.name ,value : (areaaval.id).toString()};
                   });  
                    this.setState({
                    sourcedata :  arealist,
                    })
                 }
                
                 })
                 .catch((error) => { 
                    this.setState({
                        loading : false
                      })
                 }); 
     }
    fetchRegion() {
      this.setState({
        loading : true
      })
      regionerrorService.fetchregionerror()
        .then((res) => {
            this.setState({loading:false})
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var arealist = filterstatus.map(function(areaaval) {
                      return  {label : areaaval.name ,value : (areaaval.id).toString()};
                   });  
                    this.setState({
                    regiondata :  arealist,
                    })
                 }
                
                 })
                 .catch((error) => { 
                    this.setState({
                        loading : false
                      })
                 }); 
     }
   

     fetcharea() {
      this.setState({
        loading : true
      })
      areaerrorService.fetchareaerror()
        .then((res) => {
            this.setState({loading:false})
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var arealist = filterstatus.map(function(areaaval) {
                      return  {label : areaaval.name ,value : (areaaval.id).toString()};
                   });  
                    this.setState({
                    areadata :  arealist,
                    })
                 }
                
                 })
                 .catch((error) => { 
                    this.setState({
                        loading : false
                      })
                 }); 
     }
       fetchactivityapi() {
        this.setState({
          loading : true
        })
        activitytypeerrorService.fetchactivitytypeerror()
        .then((res) => {
            this.setState({loading:false})
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var list = filterstatus.map(function(areaaval) {
                      return  {label : areaaval.name ,value : (areaaval.id).toString()};
                   });  
                    this.setState({
                    activitydata :  list,
                    })
                 }
                
                 })
                 .catch((error) => { 
                    this.setState({
                        loading : false
                      })
                 }); 
     }
  
     fetchactivitys() {
      this.setState({
        loading : true
      })
      activitysService.fetchactivitys()
      .then((res) => {
          this.setState({loading:false})
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var list = filterstatus.map(function(response) {
                    return  {label : response.name ,value : (response.id).toString()};
                 });  
                  this.setState({
                    activitysdata :  list,
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
            const report_url ='errorcapture',
            menu= 'EPOS' , 
            submenu='Error Capture Module',
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
   const {team_id} = this.state
  if(team_id !== '')
  {
    var endddatess = convertLocalToUTCDate(new Date())

    this.setState({
      startdate:new Date(finalDate),
      enddate:endddatess
    })
    this.fetchPagination(1,25, new Date(finalDate),endddatess,false)
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
          sourcedata, activitydata,activitysdata,regiondata,areadata,type_of_report_data} = this.state
        var columns= [
          {
            title: onChangeLanguage(locale,'User ID',languageData),
            dataIndex: 'user',
            key: 'user',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Date',languageData),
            dataIndex: 'date',
            key: 'date',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {(text !== null && text !== '')  && moment(text).format('MM/DD/YYYY')}
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Week',languageData),
            dataIndex: 'week',
            key: 'week',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'No of Containers/TDRs',languageData),
            dataIndex: 'no_of_containers',
            key: 'no_of_containers',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}    
              </div>),           
          },
        
          {
            title: onChangeLanguage(locale,'Activity Type',languageData),
            dataIndex: 'activity_type',
            key: 'activity_type',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
              {record.status === 1 ?
                 getValue(activitydata,'value','label',text)
                   :'' }  
              </div>),   
           
          },
          {
            title: onChangeLanguage(locale,'Source',languageData),
            dataIndex: 'source',
            key: 'source',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {getValue(sourcedata,'value','label',text)}   
   
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Region',languageData),
            dataIndex: 'region',
            key: 'region',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {getValue(regiondata,'value','label',text)}   
   
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Area',languageData),
            dataIndex: 'area',
            key: 'area',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {getValue(areadata,'value','label',text)}   
   
              </div>),           
          },

          {
            title: onChangeLanguage(locale,'Comments',languageData),
            dataIndex: 'comments',
            key: 'comments',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
              {record.status === 1 ?
                   text
                   :'' }  
              </div>),           
          },

          // {
          //   title: onChangeLanguage(locale,'User ID',languageData),
          //   dataIndex: 'user',
          //   key: 'user',
          //   render: (text, record,index) => ( 
          //     <div  style = {{padding:'2px',width:'100px'}}>
          //      {text}    
          //     </div>),           
          // },
          // {
          //   title: onChangeLanguage(locale,'Date',languageData),
          //   dataIndex: 'date',
          //   key: 'date',
          //   render: (text, record,index) => ( 
          //     <div  style = {{padding:'2px',width:'100px'}}>
          //      {(text !== null && text !== '')  && moment(text).format('MM/DD/YYYY')}
          //     </div>),           
          // },
          // {
          //   title: onChangeLanguage(locale,'Week',languageData),
          //   dataIndex: 'week',
          //   key: 'week',
          //   render: (text, record,index) => ( 
          //     <div  style = {{padding:'2px',width:'100px'}}>
          //      {text}    
          //     </div>),           
          // },
          // {
          //   title: onChangeLanguage(locale,'No of TDRs',languageData),
          //   dataIndex: 'no_of_containers',
          //   key: 'no_of_containers',
          //   render: (text, record,index) => ( 
          //     <div  style = {{padding:'2px',width:'100px'}}>
          //      {text}    
          //     </div>),           
          // },
        
          // {
          //   title: onChangeLanguage(locale,'Activity Type',languageData),
          //   dataIndex: 'activity_type',
          //   key: 'activity_type',
          //   render: (text, record,index) => ( 
          //     <div  style = {{padding:'2px',width:'100px'}}>
          //    {getValue(activitysdata,'value','label',text)}   
   
          //     </div>),           
          // },
          // {
          //   title: onChangeLanguage(locale,'Source',languageData),
          //   dataIndex: 'source',
          //   key: 'source',
          //   render: (text, record,index) => ( 
          //     <div  style = {{padding:'2px',width:'100px'}}>
          //    {getValue(sourcedata,'value','label',text)}   
   
          //     </div>),           
          // },
          // {
          //   title: onChangeLanguage(locale,'Region',languageData),
          //   dataIndex: 'region',
          //   key: 'region',
          //   render: (text, record,index) => ( 
          //     <div  style = {{padding:'2px',width:'100px'}}>
          //    {getValue(regiondata,'value','label',text)}   
   
          //     </div>),           
          // },
          // {
          //   title: onChangeLanguage(locale,'Area',languageData),
          //   dataIndex: 'area',
          //   key: 'area',
          //   render: (text, record,index) => ( 
          //     <div  style = {{padding:'2px',width:'100px'}}>
          //    {getValue(areadata,'value','label',text)}   
   
          //     </div>),           
          // },
           {
            title: onChangeLanguage(locale,'TPFREF Activity Type',languageData),
            dataIndex: 'activity_type',
            key: 'activity_type',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
              {record.status === 2 ?
                 getValue(activitysdata,'value','label',text)
                   :'' }  
              </div>), 
               
          },

          {
            title: onChangeLanguage(locale,'Type of Report',languageData),
            dataIndex: 'comments',
            key: 'comments',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
             {getValue(type_of_report_data,'value','label',text)}   
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Type',languageData),
            dataIndex: 'comments',
            key: 'comments',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
              {record.status === 1 ?
                    'EPOS'
                   :'TPFREF' }  
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
            <title>{onChangeLanguage(locale,'Error Capture ModuleRaw Data',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'Error Capture ModuleRaw Data',languageData)} match={match} />
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
                             <div className = "text-center" style = {{padding:'0px 0px 20px'}}>
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

