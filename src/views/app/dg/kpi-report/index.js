import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import {onChangeLanguage,getValue,convertLocalToUTCDate,get_array_id} from '../../../../helper'
import{teamsService} from '../../../../redux/teams/saga'
import{userService} from '../../../../redux/users/saga'
import{reportService} from '../../../../redux/dgtt/productivityreport/saga'
import moment from 'moment';
import { Table } from 'antd';
import DatePicker from "../../datePicker";
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../constants/defaultValues';
import CustomRadioButton from '../../../RadioButton'
import { AreaService } from '../../../../redux/dgtt/dgarea/saga'
import{RegionService} from '../../../../redux/dgtt/dgregiontracktrace/saga';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        startdate:'',
        enddate:'',
        team_id:'',
        report:'',
        area:[],
        team_data:[],
        user_data:[],
        is_submit:false,
        data:[],
        page:1,
        pageSize:25,
        total :0,
        days_value:'',
        is_dg:'',
        api_url:'',
        areadata:[],
        regiondata:[]
      };
    }
    componentDidMount()
    {
       this.fetcharea()
       this.fetchregion() 
    }
  
    fetcharea() {
      this.setState({ loading: true })
      AreaService.fetcharea()
        .then((res) => {
          if (res.status) {
            let filterstatus = (res.data).filter(item => item.status === 1)
            var regionlist = filterstatus.map(function (cusmaidid) {
              return { label: cusmaidid.name, value: cusmaidid.id.toString() };
            });
            this.setState({
              areadata: regionlist
            })
  
          }
          else {
            this.setState({ loading: false })
          }
        })
        .catch((error) => { });
      this.setState({ loading: false })
    }
    fetchregion() {
      this.setState({loading:true})
      RegionService.fetchregion()
      .then((res) => {
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var regionlist = filterstatus.map(function(cusmaidid) {
                    return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                 });  
                  this.setState({
                  regiondata :  regionlist
                  })
                 
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})
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
        const {team_id,user_data,team_data,is_dg,api_url,area} = this.state
        const area_ = get_array_id(area)
        if(enddate !== "" && startdate !== "" && is_dg !=='' && area.length > 0)
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
            const menu= 'DG' , 
            submenu='KPI Report',
            type = 'KPI Report'
            reportService.fetchkpiapi(api_url,page,per_page,startdate,enddate,user_data,is_report,
              username,menu,submenu,team_id,team,type,area_)
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
          createNotification('Please fill mandatory field and Choose DG or Track&Trace','error','filled')
        }  
    }
   
    clearValue()
    {
        this.setState({
            startdate:'',
            enddate:'',
            user_data:[],
            data:[],
            area:[],
            is_dg:'',
            is_submit:false,
           
        })
    }
    
    onChangestarttime(date)
    {
      console.log("lklkgkjkv startdate " ,date)
      this.setState({startdate  : date,enddate:''})
     
    }
    
    onChangeendtime(date)
    {
      const {startdate} = this.state
      if(startdate !== '')
      {
       this.setState({enddate  : date})
      }
      else
      {
       createNotification('Please Choose Start Date','error','filled');
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
    this.setState({
      startdate:new Date(finalDate),
      enddate:convertLocalToUTCDate(new Date())
    })
    this.fetchPagination(1,25, new Date(finalDate),convertLocalToUTCDate(new Date()),false)
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
  onChangeaggregate(value)
      {
          this.setState({is_dg:value,area:[]})
          if(value ==="DG"){
            let mmm="report"
            this.setState({api_url:mmm})
          }else if(value ==="Track&Trace"){
            let mmm="tracktrace"
            this.setState({api_url:mmm})
          }
      }
      handleChangearea= (value) =>
      {
        
        this.setState({area:value})
      }
    render()
    {
        const {match,locale,languageData} = this.props
        const {enddate,startdate,area,areadata,regiondata,is_submit,loading,data,page,pageSize,is_dg} = this.state
        var columns= [
          {
            title: onChangeLanguage(locale,'KPI Name',languageData),
            dataIndex: 'kpi_Name',
            key: 'kpi_Name',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px'}}>
               {text}
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Value',languageData),
            dataIndex: 'value',
            key: 'value',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px'}}>
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
                        <div className = "col-md-2 space-margin"  >
                        <CustomRadioButton checked  = "DG" name = "DG" value = {is_dg} 
                                          onChangeRadio={this.onChangeaggregate.bind(this)}/>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                             <CustomRadioButton checked  = "Track&Trace" name = "Track&Trace" value = {is_dg} 
                                            onChangeRadio={this.onChangeaggregate.bind(this)}/>
                           
                        </div>
                    </div>
                          <div className = "row" style = {{padding:'10px'}}>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Area',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <ReactMultiSelectCheckboxes  className = {is_submit === true && area.length < 0?  "error-border-select-paste":'fontstyle' }
                                        value={area}
                                        onChange={(option) =>this.handleChangearea(option)}
                                        options={is_dg ==="DG"? areadata.filter(item => item.label !== "Select All"): is_dg ==="Track&Trace"? regiondata.filter(item => item.label !== "Select All") :[]}
                                        // options={is_dg ==="DG"? areadata : is_dg ==="Track&Trace"? regiondata :[]}
                                        getDropdownButtonLabel={({ placeholderButtonLabel, value }) => { if(value.length===0) {return "Select.."; }else{ var item = value.filter(item=>item.label.includes('Select All')); if(item.length!==0){ return (value.length-1)+" selected";} else {return value.length+" selected";}  }}}
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
                           pagination = {false}
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

