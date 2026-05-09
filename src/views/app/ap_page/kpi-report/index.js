import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import {onChangeLanguage,getValue,convertLocalToUTCDate,get_array_id,get_multiplechoose_scanarray,getoptionvalue} from '../../../../helper'
import{teamsService} from '../../../../redux/teams/saga'
import{userService} from '../../../../redux/users/saga'
import{reportService} from '../../../../redux/ap/productivityreport/saga'
import moment from 'moment';
import { Table,Tooltip } from 'antd';
import Select from 'react-select';
import DatePicker from "../../datePicker";
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../constants/defaultValues';
import{regionsService} from '../../../../redux/ap/region/saga'
import{areasService} from '../../../../redux/ap/area/saga'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import{scanlocationService} from '../../../../redux/ap/scanlocation/saga'

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        startdate:'',
        enddate:'',
        team_id:'',
        report:'',
        region:[],
        area:[],
        scanlocation:[],
        team_data:[],
        user_data:[],
        region_data:[],
        area_data:[],
        scanlocation_data:[],
        is_submit:false,
        data:[],
        page:1,
        pageSize:25,
        total :0,
        days_value:'',
        userarr:[]
      };
    }
    componentDidMount()
    {
        this.fetchTeamData()
        this.fetchregion()
        this.fetchscan()
        this.fetcharea()
    }
    fetchscan() {  
      this.setState({
        loading : true
      })
      scanlocationService.fetchapi()
        .then((res) => { 
          this.setState({   
        loading : false 
                
          }) 
          if(res.status)
            {
              let filterstatus = (res.data).filter(item => item.status === 1)
              var list = filterstatus.map(function(cusmaidid) {
                   return  {label : cusmaidid.name ,value : cusmaidid.name,area : cusmaidid.area};
                });  
              
              this.setState({
                 scanlocation_data:list
              })
            }            
      
      })
      .catch((error) => { 
        this.setState({
          loading : false
        })
        });   
   }
    fetchData(userarray) {  
      this.setState({
        loading : true
      })
      scanlocationService.fetchapi()
        .then((res) => { 
          this.setState({   
        loading : false 
                
          }) 
          if(res.status)
            {
              let filterstatus = (res.data).filter(item => item.status === 1)
              var list = filterstatus.map(function(cusmaidid) {
                   return  {label : cusmaidid.name ,value : cusmaidid.name,area : cusmaidid.area};
                });  
              console.log('userarray',userarray)
              let option =  getoptionvalue(get_multiplechoose_scanarray(list,userarray),list,[])
              console.log('userarray',option)
              this.setState({
                 scanlocation_data : option
              })
            }            
      
      })
      .catch((error) => { 
        this.setState({
          loading : false
        })
        });   
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
   fetcharea_multipleregionwise(ids) {
    this.setState({loading:true})
    areasService.fetchapiMultipleRegionWise(ids)
    .then((res) => {
       if(res.status)   {
        this.setState({loading:false}) 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                area_data :  regionlist,
                })
             }
             
             })
             .catch((error) => { this.setState({loading:false}) }); 
  } 
  fetcharea() {
    this.setState({loading:true})
    areasService.fetchapi()
    .then((res) => {
       if(res.status)   {
        this.setState({loading:false}) 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                area_data :  regionlist,
                })
             }
             
             })
             .catch((error) => { this.setState({loading:false}) }); 
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
                     return  {label : areaaval.name+'-'+areaaval.country_code ,value : (areaaval.id).toString()};
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
        const {team_id,user_data,team_data,region,area,scanlocation} = this.state
        if(enddate !== "" && startdate !== ""  )
        {
          if ((Date.parse(enddate) > Date.parse(startdate)))
          {
            const team = getValue(team_data,'value','label',team_id)
            this.setState({
                loading : true,
                page:page,
                pageSize:per_page
            })
            const {username} = this.props
            const menu= 'AP' , 
            submenu='Invoice processing input',
            type = 'Kpi Report',
            region_ =get_array_id(region),
            area_ = get_array_id(area),
            scanlocation_ = get_array_id(scanlocation)
            reportService.fetchkpireport(page,per_page,startdate,enddate,user_data,is_report,
              username,menu,submenu,team_id,team,type,region_,area_,scanlocation_)
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
            region:[],
            area:[],
            scanlocation:[],
            user_data:[],
            data:[],
            is_submit:false,
           
        })
        this.fetchregion()
        this.fetchscan()
        this.fetcharea()
    }
    onChangeTeam(value)
    {
        this.setState({  team_id: value,startdate  : '',enddate:'' })
        this.fetchUserData([value])
    }
    onChangestarttime(date)
    {
      console.log("lklkgkjkv startdate " ,date)
      this.setState({startdate  : date,enddate:''})
     
    }
    
    onChangeendtime(date)
     {
       const {startdate} = this.state
       if(startdate !== '' )
       {
        this.setState({enddate  : date})
       }
       else
       {
        createNotification('Please Choose Start Date ','error','filled');
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
  //  const {team_id} = this.state
  // if(team_id !== '')
  // {
    this.setState({
      startdate:new Date(finalDate),
      enddate:convertLocalToUTCDate(new Date())
    })
    this.fetchPagination(1,25, new Date(finalDate),convertLocalToUTCDate(new Date()),false)
  // }
  // else
  // {
  //  createNotification('Please Choose Team','error','filled');
  // }

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
  handleChangeRegionFilter= (value) =>
    {
      this.setState({  region: value,area:[],area_data:[] })
      var ids = get_array_id(value)
      if(ids.length > 0)
      {
        this.fetcharea_multipleregionwise(ids)
      }
      
    }
    handleChangeareaFilter= (value) =>
    {
      this.setState({  area: value,scanlocation:[],scanlocation_data:[] })
      var ids = get_array_id(value)
      if(ids.length > 0)
      {
        this.fetchData(ids)
      }
      
    }
    render()
    {
        const {match,locale,languageData} = this.props
        const {enddate,startdate,team_id,team_data,is_submit,loading,data,page,pageSize,
          region_data,region,area,area_data,scanlocation,scanlocation_data} = this.state
        var columns= [
          {
            title: onChangeLanguage(locale,'Description',languageData),
            dataIndex: 'description',
            key: 'description',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px'}}>
               {text}    
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Period(as per date selected)',languageData),
            dataIndex: 'period_as_per_date_selected',
            key: 'period_as_per_date_selected',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px'}}>
               {text}    
              </div>),           
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
            <title>{onChangeLanguage(locale,'KPI Report',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'KPI Report',languageData)} match={match} />
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
                          <div className = "col-md-4 space-margin">
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Region',languageData)}</Label>
                                  <ReactMultiSelectCheckboxes  className = 'fontstyle' 
                                    value={region}
                                    onChange={(option) =>this.handleChangeRegionFilter(option)}
                                    options={region_data}
                                    getDropdownButtonLabel={({ placeholderButtonLabel, value }) => { if(value.length==0) {return "Select.."; }else{ var item = value.filter(item=>item.label.includes('Select All')); if(item.length!=0){ return (value.length-1)+" selected";} else {return value.length+" selected";}  }}}
                                   />
                            </div>
                          
                            <div className = "col-md-4 space-margin">
                                <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'Area',languageData)}</Label>
                                 <ReactMultiSelectCheckboxes  className = 'fontstyle' 
                                    value={area}
                                    onChange={(option) =>this.handleChangeareaFilter(option)}
                                    // onChange={(option)=>  this.setState({area :option })}
                                    options={area_data}
                                    getDropdownButtonLabel={({ placeholderButtonLabel, value }) => { if(value.length==0) {return "Select.."; }else{ var item = value.filter(item=>item.label.includes('Select All')); if(item.length!=0){ return (value.length-1)+" selected";} else {return value.length+" selected";}  }}}
                                   />
                            </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Scan Location',languageData)}</Label>
                                        {/* <Select  className={is_submit === true && scanlocation === ''?  "error-border-select":"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={scanlocation_data.filter(option =>option.value === scanlocation)}
                                            options={scanlocation_data}
                                            onChange={(option)=>  this.setState({area :option })}}
                                        /> */}
                                         <ReactMultiSelectCheckboxes  className = 'fontstyle' 
                                    value={scanlocation}
                                    onChange={(option)=>  this.setState({scanlocation :option })}
                                    options={scanlocation_data}
                                    getDropdownButtonLabel={({ placeholderButtonLabel, value }) => { if(value.length==0) {return "Select.."; }else{ var item = value.filter(item=>item.label.includes('Select All')); if(item.length!=0){ return (value.length-1)+" selected";} else {return value.length+" selected";}  }}}
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
                                onClick={()=>this.fetchPagination(page,pageSize,startdate,enddate,false)} >
                                  {onChangeLanguage(locale,'Generate Report',languageData)}</Button> 
                               <Button className = "button-width" color="secondary" 
                                onClick={()=>this.fetchPagination(page,pageSize,startdate,enddate,true)} >
                                  <i className = "simple-icon-cloud-download" style = {{marginRight:'5px'}}/>
                                  {onChangeLanguage(locale,'Download Report',languageData)}</Button> 

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
                          //  pagination = {pagination}
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

