

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Button,Input} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import {onChangeLanguage,getPermission} from '../../../../helper'
import{WorkingdaysService} from '../../../../redux/kfr_report/workingdays/saga'
import moment from 'moment';
import { Table,Tooltip,Popconfirm } from 'antd';
import Select from 'react-select';
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../constants/defaultValues';
import{roleService} from '../../../../redux/role/saga'
import { regionService } from '../../../../redux/region/saga'
import { areaService } from '../../../../redux/area/saga';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';
import Workbook from 'react-excel-workbook'
import{ProcessService} from '../../../../redux/process/saga'
import{teamsService} from '../../../../redux/teams/saga'
import CustomRadioButton from '../../../RadioButton'

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        team:'',
        year:'',
        month:'',
        process:'',
        region:'',
        area:'',
        location:'',
        process_data:[],
        regiondata:[],
        areadata:[],
        team_data:[],
        isdoc:false,
        monthdata:[
             {value:'Jan',label:'Jan'},
             {value:'Feb',label:'Feb'},
             {value:'Mar',label:'Mar'},
             {value:'Apr',label:'Apr'},
             {value:'May',label:'May'},
             {value:'Jun',label:'Jun'},
             {value:'Jul',label:'Jul'},
             {value:'Aug',label:'Aug'},
             {value:'Sep',label:'Sep'},
             {value:'Oct',label:'Oct'},
             {value:'Nov',label:'Nov'},
             {value:'Dec',label:'Dec'},
        ],
        is_submit:false,
        data:[],
        selectedRowKeys:[],
        page:1,
        pageSize:25,
        total :0,
        is_submit_table :false,
        selected_id:-1
      };
    }
    componentDidMount()
    {
        this.fetchmenuData()
        this.fetchregion()
        this.fetcharea()
        this.fetchteam()
       
    }
    fetchData() {  
      this.setState({
        loading : true
      })
      WorkingdaysService.fetchData()
        .then((res) => { 
          this.setState({   
        loading : false 
                
          }) 
          if(res.status)
            {
              this.setState({ 
                data:res.data  , 
                         
              }) 
            }    else
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
    fetchregion() {
      regionService.fetchregion()
        .then((res) => {
          if (res.status) {
            let filterstatus = (res.data).filter(item => item.status === 1)
            var regionlist = filterstatus.map(function (cusmaidid) {
              return { label: cusmaidid.region, text: cusmaidid.region, value: cusmaidid.id.toString() };
            });
            this.setState({
              regiondata: regionlist,
            })
          }
          else {
            this.setState({ loading: false })
          }
        })
        .catch((error) => { });
    }
    fetcharea() {
      areaService.fetcharea()
        .then((res) => {
          if (res.status) {
            let filterstatus = (res.data).filter(item => item.status === 1)
            var regionlist = filterstatus.map(function (cusmaidid) {
              return {
                label: cusmaidid.name,
                value: cusmaidid.id.toString(), region: cusmaidid.region
              };
            });
            this.setState({
              areadata: regionlist,
            })
          }
          else {
            this.setState({ loading: false })
          }
        })
        .catch((error) => { });
    }
    fetchmenuData() {  
      this.setState({
        loading : true
      })
      roleService.fetchrolepermissionData()
      .then((res) => { 
        this.setState({   
      loading : false 
              
        }) 
        if(res.status === true)
          {
              if(res.data)
              {
                let filterstatus =(res.data).filter(item => (item.name !== 'KFR Report' && item.name !== 'Dashboard'
                && item.name !== 'Productivity Masters' && item.name !== 'General Master' && item.name !== 'General Master'))
                  var menu = filterstatus.map(function(cusmaidid) {
                    return  {label : cusmaidid.name ,value : cusmaidid.name};
                  });   
                this.setState({
                  process_data:menu
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
   fetchteam() {
    teamsService.fetchteams()
      .then((res) => {
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return {
              label: cusmaidid.name,
              value: cusmaidid.name, area: cusmaidid.area
            };
          });
          this.setState({
            team_data: this.removeduplicatecolumns(regionlist) ,
          })
        }
        else {
          this.setState({ loading: false })
        }
      })
      .catch((error) => { });
  }
  removeduplicatecolumns(list){
    const output = [...new Map(list.map(o => [o.value, o])).values()] 
    return output
}
onFilter()
   {
     const {page,per_page,region,area,team,process,month,year,location,isdoc,is_report} = this.state
     this.fetchPagination(page,per_page,region,area,team,process,month,year,location,isdoc,is_report)
      
   }
    fetchPagination(page,per_page,region,area,team,process,month,year,location,isdoc,is_report)
    {
      const {username} = this.props
      const date_time = moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
        if(region !=='' || area !=='' || process !=='' ||  month !=='' || 
        year !=='' || location !==''  )
        {
          
            this.setState({
                loading : true,
                page:page,
                pageSize:per_page
            })
            if(is_report === true)
            {
              createNotification('Download is processing...','primary','filled');
            }
            WorkingdaysService.filter(page,per_page,region,area,team,process,month,year,location,isdoc,is_report,username,date_time)
            .then((res) => { 
              this.setState({   
                   loading : false   
              }) 
              if(res.status)
                {
                 
                    if(res.data)
                    {
                      this.setState({
                        total:res.total,
                        data:res.data
                       })
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
        
    }
   
    clearValue()
    {
        this.setState({
            process:'',
            year:'',
            month:'',
            region:'',
            area:'',
            year:'',
            location:'',
            team:'',
            data:[],
            is_submit:false,
            is_submit_table :false,
            selected_id:-1
        })
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
     this.fetchPagination(page,pageSize)
    },
    pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
    // total: this.state.total  ,
    showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total}`,
  };
  onClickTab(menu)
 {
    this.setState({
        menu:menu
    })
 }
 onChangeFileUpload(files)
	{
  const {region,area,team,process,month,year,location,isdoc} =this.state
    this.setState({
      loading : true
    })
    WorkingdaysService.fileUpload(files[0],region,area,team,process,month,year,location,isdoc)
      .then((res) => { 
        this.setState({
          loading : false
        })
        if(res.status)
        {
          if(res.data.status)   
          {   
         
            createNotification('Uploaded','success','filled')
            this.onSubmitFilter(false,false)
          }   
          else{
            
            createNotification(res.data.message,'error','filled')
          }  
        }
    })
    .catch((error) => { 
      this.setState({
        loading : false
      })
      });
    
  }
  serDoc(isdoc)
    {
      this.setState({
        isdoc:isdoc
      })
      
    }
    getArrayValue(array, value, key) {
      var list = []
      if (array && array !== null && value !== '' && value !== null) {
        list = array.filter(item => item[key] === value)
      }
      return list
    }
    renderTemplate()
    {
      const {languageData,locale} = this.props
      const {data,region_data} = this.state
      var array = data.map(record=> {
            return {
              'Month':record.month,
              'Year':record.year,
              'Process':record.process,
              'Centre':record.location,
              'Region':record.region,
              'Area':record.area,
              'Team' :record.team ,
              'Doc/Non-Doc':record.isdoc,
              'Value' : record.name,
          };
        })
        return(
          
          <Workbook filename="Working Days.xlsx" element={
            <Button className = "button-width" color="secondary" >
               <i className = "simple-icon-cloud-download" style = {{marginRight:'5px'}}/>
              { onChangeLanguage(locale,'Download Template',languageData)}  
            </Button>
            }>
            <Workbook.Sheet data={array} name="Sheet A">
            <Workbook.Column label="Month" value="Month"/>
            <Workbook.Column label="Year" value="Year"/>
            <Workbook.Column label="Process" value="Process"/>
            <Workbook.Column label="Centre" value="Centre"/>
            <Workbook.Column label="Region" value="Region"/>
            <Workbook.Column label="Area" value="Area"/>
            <Workbook.Column label="Team" value="Team"/>
            <Workbook.Column label="Doc/Non-Doc" value="Doc/Non-Doc"/>
            <Workbook.Column label="Value" value="Value"/>
            </Workbook.Sheet> 
          </Workbook>
        );
    }
    onSubmitFilter(is_report,is_search)
    {
      const {process,month,year,isdoc,team,region,area,location} = this.state
    var isfill = false
    if(month !== '' || process !== '' || year !== "" || isdoc !== '' ||
    region !== '' ||  area !== '' || location !== '' )
    {
        
      isfill = true
        
    }

      if(isfill === true )
      {
            this.fetchPagination(1,25,region,area,team,process,month,year,location,isdoc,is_report)
         
      }
      else
      {
         
        if(is_search === true)
        {
         createNotification('Please choose any one details then can filter','error','filled');
        }
      
      }
    }
    onKeyDownValue_row(e,record,key)
    { 
     
      var code = e.keyCode || e.which;
          if (code === 9) 
         {
            if(record[key] !== '')
           {
             this.onUpdate(record)
          }
       }
    }
    onKeyPressValue_row(e,record,key)
    { 
     
      if (e.key == 'Enter') {
        console.log('test');
        if(record[key] !== '')
        {
          this.onUpdate(record)
        }
      }
    }
  onUpdate(record)
 { 
    const{id,page,per_page,region,area,team,process,month,year,location,isdoc,value}= record
    const {username} = this.props
    if(process !== '' && region !== '' && area !== '' && team !== '' && year !== '' && month !== '')
    {
      this.setState({
        is_submit_table :false,
        selected_id:-1 
      })
      WorkingdaysService.updateData(id,page,per_page,region,area,team,process,month,year,location,isdoc,value,username)
      .then((res) => { 
        this.setState({   
          loading : false     
        }) 
        if(res.status === true)
          {
            createNotification('Updated','success','filled')
            if(res.data)
            {
             const data = [...this.state.data]
             const index = data.findIndex(x => x.id === id)
             if(index >= 0)
             {
               this.setState({
                 data:data
               })

             }
             
            }
            
          } else{
            
            createNotification(res.message,'error','filled')
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
    this.setState({
      is_submit_table :true,
      selected_id:id 
    })
     createNotification('Please fill Mandatory field','error','filled');
   }

  }
  onChangeValue_row(value,id,key)
    { 
      const data = [...this.state.data]
      const index = data.findIndex(x => x.id === id)
        if(index >= 0)
        {
          if(key === 'year')
          {
            data[index][key] = this.onchangeYear(value)

          }
          else
          {
            data[index][key] = value
          }
          if(key === 'region')
          {
            data[index].area = ''
            data[index].team = ''
          }
          else if(key === 'area')
          {
            data[index].team = ''
          }
          this.setState({
            data:data,
          })
          if( key === 'region' || key === 'area' ||  key === 'process' || key === 'team' || key =='month' || key =='isdoc')
            {
              data[index][key] = value
                 this.onUpdate(data[index])
            }
         
        }
    }
    onchangeYear(value)
  {
       var val = ''
       if(value.length < 5 && Number.isInteger(parseInt(value)) === true)
      {
        val = value
      }

      return val 

  }
  handleDelete = id => {
    WorkingdaysService.deleteapi(id)
    .then((res) => {
      if(res){
        createNotification('Deleted','success','filled')
        this.onFilter()
      }			
    })
    .catch((error) => { });
  }
    render()
    {
        const {match,locale,languageData,role_permission_data} = this.props
        const {is_submit,loading,data,page,pageSize,process,process_data,month,monthdata,year,isdoc,team,
              region,regiondata,area,areadata,location,team_data,is_submit_table,selected_id} = this.state
        const is_edit = getPermission(role_permission_data,'KFR Report','KFR Access',true)
        var columns= [
          {
            title: onChangeLanguage(locale,'Process',languageData),
            dataIndex: 'process',
            key: 'process',
            render: (text, record,index) => ( 
              <div style = {{padding:'2px',width:'100px'}}>
              <Select  
                  className = {"react-select fontstyle"  } 
                  classNamePrefix="react-select"
                  name="form-field-name"
                  value={process_data.filter(option =>option.value === text)}
                  options={process_data}
                  isDisabled={!is_edit}
                  onChange={({value}) =>this.onChangeValue_row(value,record.id,'process')}
              /> 
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Month',languageData),
            dataIndex: 'month',
            key: 'month',
            render: (text, record,index) => ( 
            <div style = {{padding:'2px',width:'100px'}}>
            <Select  className = {"react-select fontstyle"  } 
                      classNamePrefix="react-select"
                      name="form-field-name"
                      value={monthdata.filter(option =>(option.value).toLowerCase() === (text).toLowerCase())}
                      options={monthdata}
                      isDisabled={!is_edit}
                      onChange={({value}) =>this.onChangeValue_row((value).toLowerCase(),record.id,'month')}
                  />  
          </div>),           
          },
          {
            title: onChangeLanguage(locale,'Value',languageData),
            dataIndex: 'value',
            key: 'value',
            render: (text, record,index) => ( 
              <div className="row d-flex justify-content-center" style = {{}}>
             <Input
              className = {"fontstyle"  } 
              value={text} 
              type='number'
              disabled={!is_edit}
              onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'value')} 
              onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'value')}
              onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'value')}
              />
          </div>),           
          },
          {
            title: onChangeLanguage(locale,'Year',languageData),
            dataIndex: 'year',
            key: 'year',
            render: (text, record,index) => ( 
              <div style = {{}}>
              <Input
              className = {"fontstyle"  } 
              type='number'
              disabled={!is_edit}
              onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'year')} 
              onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'year')}
              onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'year')}
              value={text} 
              />
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Region',languageData),
            dataIndex: 'region',
            key: 'region',
            render: (text, record,index) => ( 
              <div   style = {{padding:'2px',width:'100px'}}>
              <Select  
                  className = {"react-select fontstyle"  } 
                  classNamePrefix="react-select"
                  name="form-field-name"
                  value={regiondata.filter(option =>option.value === text)}
                  options={regiondata}
                  isDisabled={!is_edit}
                  onChange={({value}) =>this.onChangeValue_row(value,record.id,'region')}
              />  
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Area',languageData),
            dataIndex: 'area',
            key: 'area',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
                <Select  
                    className = {"react-select fontstyle"  } 
                    classNamePrefix="react-select"
                    name="form-field-name"
                    value={areadata.filter(option =>option.value === text)}
                    options={this.getArrayValue(areadata, record.region, 'region')}
                    isDisabled={!is_edit}
                    onChange={({value}) =>this.onChangeValue_row(value,record.id,'area')}
                />
              </div>),           
          },
          {
            title:  onChangeLanguage(locale,'Team',languageData),
            dataIndex: 'team',
            key: 'team',
            render: (text, record,index) => ( 
              <div   style = {{padding:'2px',width:'100px'}}>
              <Select  
                  className = {"react-select fontstyle"  } 
                  classNamePrefix="react-select"
                  name="form-field-name"
                  value={team_data.filter(option =>option.value === text)}
                  options={this.getArrayValue(team_data,record.area,'area')}
                  isDisabled={!is_edit}
                  onChange={({value}) =>this.onChangeValue_row(value,record.id,'team')}
              />  
              </div>), 
          },
          {
            title: onChangeLanguage(locale,'Centre',languageData),
            dataIndex: 'location',
            key: 'location',
            render: (text, record,index) => ( 
              <div className="row d-flex justify-content-center" style = {{}}>
              <Input
              className = {"fontstyle"  }
              value={text} 
              disabled={!is_edit}
              onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'location')} 
              onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'location')}
              onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'location')}
              />
              </div>),           
          },
          {
            title: onChangeLanguage(locale,'Doc/Non Doc',languageData),
            dataIndex: 'isdoc',
            key: 'isdoc',
            render: (text, record,index) => (
              <span className="row d-flex justify-content-center">                             
                  <Row>
                  <Colxx xxs="12">
                        <CustomRadioButton checked  = {true} name = {onChangeLanguage(locale,'Doc',languageData)} 
                        value = {text} 
                        disabled={!is_edit}
                        onChangeRadio={(value)=>this.onChangeValue_row(true,record.id,'isdoc')}/>
                    </Colxx>
                    <Colxx xxs="12">
                      <CustomRadioButton checked  = {false} 
                      disabled={!is_edit}
                      name = {onChangeLanguage(locale,'Non Doc',languageData)} value = {text } 
                      onChangeRadio={(value)=>this.onChangeValue_row(false,record.id,'isdoc')}/>
                    </Colxx>
                  </Row>
                </span>
                 ),        
          },
          {
            title: 'Action',
            key: 'id',
           dataIndex: 'id',
            render: (id,record) => (
                <div className="row d-flex justify-content-center" >
                    
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
            <title>{onChangeLanguage(locale,'Working Days',languageData)}</title>
            <Row>
              <Colxx xxs="12">
              <Row>
             <Colxx xxs="8">
             <Breadcrumb heading={onChangeLanguage(locale,'Working Days',languageData)} match={match} />
             </Colxx>
             {is_edit === true &&
             <Colxx xxs="4">
             <Button className = "button-width" color="primary">
              <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
              <a style= {{margin :'0px'}} > 
              {onChangeLanguage(locale,'Upload',languageData)}</a>
            <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
            className = "filepicker_customButton"
            style = {{width : '26%',marginLeft :'-22%'}}
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
          </Button>
             {this.renderTemplate()}
             
             </Colxx>
    }
          </Row>
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
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Process',languageData)}</Label>
                                        <Select  className={"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={process_data.filter(option =>option.value === process)}
                                            options={process_data}
                                            onChange={({value}) => this.setState({  process: value })}
                                        />
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Month',languageData)}</Label>
                                        <Select  className={"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={monthdata.filter(option =>option.value === month)}
                                            options={monthdata}
                                            onChange={({value}) => this.setState({  month: value })}
                                        />
                                
                            </div>
                                <div className = "col-md-3 space-margin"  >
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Year',languageData)}</Label>
                                         <Input className = {"fontstyle text-background" }  
                                        placeholder={onChangeLanguage(locale, 'Year', languageData)}
                                        value={year}
                                        type='number'
                                        onChange={(e) => this.setState({ year: this.onchangeYear(e.target.value) })} />
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Region',languageData)}</Label>
                                        <Select  className={"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={regiondata.filter(option =>option.value === region)}
                                            options={regiondata}
                                            onChange={({value}) => this.setState({  region: value,area:'' })}
                                        />
                                
                            </div>
                            <div className = "col-md-3 space-margin"  >
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Area',languageData)}</Label>
                                        <Select  className={"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={areadata.filter(option =>option.value === area)}
                                            options={this.getArrayValue(areadata, region, 'region')}
                                            onChange={({value}) => this.setState({  area: value })}
                                        />
                                
                            </div>
                            <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Team',languageData)}</Label>
                                        <Select  className={"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={team_data.filter(option =>option.value === team)}
                                            options={this.getArrayValue(team_data, area, 'area')}
                                            onChange={({value}) => this.setState({  team: value })}
                                        />
                                </div>
                            <div className = "col-md-3 space-margin"  >
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Centre',languageData)}</Label>
                                         <Input className = {"fontstyle text-background" }  
                                        placeholder={onChangeLanguage(locale, 'Centre', languageData)}
                                        value={location}
                                        onChange={(e) => this.setState({ location: e.target.value })} />
                                </div>
                                <div className = "col-md-3 space-margin" style={{marginTop:'20px'}}>
                             <Button className = "button-width" color="secondary"
                                  onClick={()=>this.onSubmitFilter(true,true)}
                                   >
                                  {onChangeLanguage(locale,'Download',languageData)} </Button>
                                <Button className = "button-width" color="primary"
                                  onClick={()=>this.onSubmitFilter(false,true)}
                                   >
                                  {onChangeLanguage(locale,'Filter',languageData)} </Button>
                                 <Button className = "button-width" color="secondary" 
                                onClick={()=>this.clearValue()}
                                >{onChangeLanguage(locale,'Refresh',languageData)}</Button> 
                                  
                            </div>
                             </div>
                             
                
                </div> 
                <div style = {{padding :'10px',width:'100%',overflow:'auto'}}>
                     {data.length > 0 && 
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
    const { locale,languageData,username,role_permission_data} = settings;
    return {locale, languageData,username,role_permission_data};
  };
  export default withRouter(
    connect(mapStateToProps, {

   })(QueryResolveSheet)
  );



