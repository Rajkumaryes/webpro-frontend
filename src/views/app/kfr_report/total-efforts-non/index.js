import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Button,Label,Input} from 'reactstrap';
import Loading from "react-fullscreen-loading";
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { Table, Popconfirm ,Tooltip } from 'antd';
import { createNotification } from '../../../../toast';
import {onChangeLanguage,get_array_id,getPermission} from '../../../../helper';
import{roleService} from '../../../../redux/role/saga'
import { regionService } from '../../../../redux/region/saga'
import { areaService } from '../../../../redux/area/saga';
import { teamsService } from '../../../../redux/teams/saga';
import{NondocService} from '../../../../redux/kfr_report/total_nondoc/saga'
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../constants/defaultValues';
import Select from 'react-select';
import moment from 'moment';


class MasterPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
       data:[],
       loading:false,
       region_data: [],
       team_data:[],
       area_data:[],
       process_data:[],
       month_data:[
          {value:'1',label:'Jan'},
          {value:'2',label:'Feb'},
          {value:'3',label:'Mar'},
          {value:'4',label:'Apr'},
          {value:'5',label:'May'},
          {value:'6',label:'Jun'},
          {value:'7',label:'Jul'},
          {value:'8',label:'Aug'},
          {value:'9',label:'Sep'},
          {value:'10',label:'Oct'},
          {value:'11',label:'Nov'},
          {value:'12',label:'Dec'},
        ],

        page:1,
        pageSize:25,
        total :0,
        region:"",
        area:"",
        team:"",
        process:"",
        month:"",
        year:"",
        location:"",
        is_submit_table :false,
        selected_id:-1,
        is_submit:false,
      };
    }
    componentWillMount()
    {
      this.fetchregion()
      this.fetcharea()
      this.fetchmenuData()
      this.fetchteam()
    }
    fetchregion() {
      regionService.fetchregion()
        .then((res) => {
          if (res.status) {
            let filterstatus = (res.data).filter(item => item.status === 1)
            var regionlist = filterstatus.map(function (cusmaidid) {
              return { label: cusmaidid.region, value: cusmaidid.id.toString() };
            });
            this.setState({
              region_data: regionlist,
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
              area_data: regionlist,
            })
          }
          else {
            this.setState({ loading: false })
          }
        })
        .catch((error) => { });
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
   

   clearValue()
   {
     this.setState({
      page:1,
      pageSize:25,
      total :0,
      region:"",
      area:"",
      team:"",
      process:"",
      month:"",
      year:"",
      location:"",
      data:[]  , 
      is_submit_table :false,
      selected_id:-1,
      is_submit:false,
     })
    
   }
   onSubmitFilter(is_search,is_report)
   {
    this.setState({
      is_submit:false,
      is_submit_table:false,
      selected_id:-1
    })
     const {region,area,team,process,month,year,location} = this.state
     if(region !== ''  || area !== '' || team !== '' || process !== ''
     || month !== '' || year !== ''|| location !== '')
     {
      this.fetchPagination(1,25,region,area,team,process,month,year,location,is_report)
     }
     else
     {
       if(is_search === true)
       {
        createNotification('Please choose any one details then can filter','error','filled');
       }
      
     }
      
   }
   onFilter()
   {
     const {page, pageSize, region,area,team,process,month,year,location} = this.state
     this.fetchPagination(page, pageSize,region,area,team,process,month,year,location,false)
      
   }
   fetchPagination(page,per_page,region,area,team,process,month,year,location,is_report) {  
    this.setState({
      loading : true,
      page:page,
      pageSize:per_page,
    })
    const {username} = this.props
    const date_time = moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
    if(is_report === true)
    {
      createNotification('Download is processing...','primary','filled');
    }
    
    NondocService.fetchpagination(page,per_page,region,area,team,process,month,year,
      location,is_report,username,date_time)
      .then((res) => { 
        this.setState({   
           loading : false 
              
        }) 
        if(res.status === true)
          {
            this.setState({ 
              data:res.data  , 
              total:res.total  ,          
            }) 
          }  
          else
          {
            this.setState({ 
              data:[]  , 
              page:1,
              pageSize:25,
              total:0  , 
                      
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


 ongenerateUnit()
 {
   const {process ,month,year,team,process_data,team_data,location} = this.state
     if(month !=='' &&  year !=='')
     {
      const {username} = this.props
      const process_array = process !== '' ? [process] : get_array_id(process_data),
      team_array = team !== '' ? [team] : get_array_id(team_data)
         this.setState({
             
             is_submit:false
         })
        const date_time = moment(new Date()).format('MM-DD-YYYY hh:mm:ss a')

         NondocService.generateReport(process_array,parseInt(month),parseInt(year),team_array,
         location,username,date_time)
         .then((res) => { 

           if(res.status === true)
             {
              createNotification('Created','success','filled');
             }    
             else
             {
               createNotification(res.message,'error','filled');
             }             
       
       })
       .catch((error) => { 
         
         });
       
       
     } 
     else
     {
        this.setState({
          is_submit:true
        })
       createNotification('Please fill Month and Year','error','filled')
     }  
 }
   
   
  handleDelete = id => {
    NondocService.deleteapi(id)
    .then((res) => {
      if(res){
        createNotification('Deleted','success','filled')
        this.onFilter()
      }			
    })
    .catch((error) => { });
  }
  getArrayValue(array, value, key) {
    var list = []
    if (array && array !== null && value !== '' && value !== null) {
      list = array.filter(item => item[key] === value)
    }
    return list
  }
  onUpdate(record)
  { 
     
     if(record.team !== '' && record.process !== '' && record.month !== '' && record.year !== '' && record.value !== '')
     {
       record.user_id =  localStorage.getItem('user_id') !== null ?  parseInt(localStorage.getItem('user_id')) : 0 ;
       NondocService.multiupdate([record])
         .then((res) => { 
           this.setState({   
             loading : false ,
             selected_id:-1,
             is_submit_table:false    
           }) 
           if(res.status === true)
             {
               createNotification('Updated','success','filled')
               
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
          selected_id:record.id 
        })
        createNotification('Please fill Mandatory field','error','filled');
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
      if(key === 'month' || key === 'process' || key === 'region' ||
       key === 'area' || key === 'team' )
      {
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
      paginationOptions = {
        showSizeChanger: true,
        showQuickJumper: true,
        onShowSizeChange: (_, pageSize) => {
          this.setState({
            pageSize : pageSize
          })
          
        },
        onChange: (page,pageSize) => {
          const { region,area,team,process,month,year,location} = this.state
          this.fetchPagination(page, pageSize,region,area,team,process,month,year,location,false)
        },
        pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
        // total: this.state.total  ,
        showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total}`,
      };
    render()
    {
      const {locale,languageData,match,role_permission_data} = this.props
        const {data,loading , region,area,team ,location,month,year,process, is_submit_table,
          process_data,region_data,area_data,team_data ,month_data,selected_id,is_submit} = this.state
        const is_edit = getPermission(role_permission_data,'KFR Report','KFR Access',true)
        const columns = [
              {
                title:  onChangeLanguage(locale,'Month',languageData),
                dataIndex: 'month',
                key: 'month',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'100px'}}>
                  <Select  className = {(is_submit_table === true && text === "" && record.id === selected_id )   ?  "error-border-select" :"react-select fontstyle"  } 
                      classNamePrefix="react-select"
                      name="form-field-name"
                      value={month_data.filter(option =>option.value === text)}
                      options={month_data}
                      isDisabled={!is_edit}
                      onChange={({value}) =>this.onChangeValue_row(value,record.id,'month')}
                  />  
                  </div>),    
              },
              {
                title:  onChangeLanguage(locale,'Year',languageData),
                dataIndex: 'year',
                key: 'year',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'100px'}}>
                    <Input className = {(is_submit_table === true && text === "" && record.id === selected_id )   ?  "error-border" :"fontstyle text-background"  }
                      value={text}
                      type='number'
                      disabled={!is_edit}
                      onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'year')} 
                      onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'year')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'year')}
                  />  
                  </div>), 
              },
              {
                title:  onChangeLanguage(locale,'Process',languageData),
                dataIndex: 'process',
                key: 'process',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'100px'}}>
                  <Select  className = {(is_submit_table === true && text === "" && record.id === selected_id )   ?  "error-border-select" :"react-select fontstyle"  }
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
                title:  onChangeLanguage(locale,'Location',languageData),
                dataIndex: 'location',
                key: 'location',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'100px'}}>
                    <Input className = "fontstyle text-background"  
                      value={text}
                      disabled={!is_edit}
                      onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'location')} 
                      onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'location')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'location')}
                  />  
                  </div>), 
              },
              {
                title:  onChangeLanguage(locale,'Region',languageData),
                dataIndex: 'region',
                key: 'region',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'100px'}}>
                  <Select  className = {(is_submit_table === true && text === "" && record.id === selected_id )   ?  "error-border-select" :"react-select fontstyle"  }
                      classNamePrefix="react-select"
                      name="form-field-name"
                      value={region_data.filter(option =>option.value === text)}
                      options={region_data}
                      isDisabled={!is_edit}
                      onChange={({value}) =>this.onChangeValue_row(value,record.id,'region')}
                  />  
                  </div>),  
              },
              {
                title:  onChangeLanguage(locale,'Area',languageData),
                dataIndex: 'area',
                key: 'area',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'100px'}}>
                  <Select  className = {(is_submit_table === true && text === "" && record.id === selected_id )   ?  "error-border-select" :"react-select fontstyle"  }
                      classNamePrefix="react-select"
                      name="form-field-name"
                      isDisabled={!is_edit}
                      value={area_data.filter(option =>option.value === text)}
                      options={this.getArrayValue(area_data,record.region,'region')}
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
                  <Select  className = {(is_submit_table === true && text === "" && record.id === selected_id )   ?  "error-border-select" :"react-select fontstyle"  }
                      classNamePrefix="react-select"
                      name="form-field-name"
                      isDisabled={!is_edit}
                      value={team_data.filter(option =>option.value === text)}
                      options={this.getArrayValue(team_data,record.area,'area')}
                      onChange={({value}) =>this.onChangeValue_row(value,record.id,'team')}
                  />  
                  </div>), 
              },
              
              {
                title: onChangeLanguage(locale,'Unit',languageData),
                dataIndex: 'value',
                key: 'value',
                render: (text, record,index) => ( 
                  <div  className="row d-flex justify-content-center" style={{padding:'2px'}}>
                 <Input className = {(is_submit_table === true && text === "" && record.id === selected_id )   ?  "error-border" :"fontstyle"  }
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
            <title> {onChangeLanguage(locale,'Total Efforts Non Doc',languageData)}</title>
            {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <Row>
              <Colxx xxs="12">
                <div className = "row">
                    <div classN ame = "col-md-12">
                        <Breadcrumb heading= {onChangeLanguage(locale,'Total Efforts Non Doc',languageData)} match={match} />
                    </div>
                </div>
             
             
              <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
              <div className = "publishuser-card-component" style = {{borderRadius:'10px',padding:'10px'}}>
                <div className = "row">
                    <div className = "col-lg-2-0 space-margin"  >
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Process',languageData)}</Label>
                          <Select  className="react-select fontstyle"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={process_data.filter(option =>option.value === process)}
                            options={process_data}
                            onChange={({value}) => this.setState({  process: value })}
                        />
                    </div>
                    <div className = "col-lg-2-0 space-margin"  >
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Month',languageData)}</Label>
                          <Select  className={is_submit === true && month === ''?  "error-border-select":"react-select fontstyle" }
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={month_data.filter(option =>option.value === month)}
                            options={month_data}
                            onChange={({value}) => this.setState({  month: value })}
                        />
                    </div>
                    <div className = "col-lg-2-0 space-margin"  >
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Year',languageData)}</Label>
                            <Input className = {is_submit === true && year === ''?  "error-border":"fontstyle text-background" }  
                            value={year}
                            type='number'
                            onChange={(e) => this.setState({ year: this.onchangeYear(e.target.value) })} />
                    </div>
                    <div className = "col-lg-2-0 space-margin"  >
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Region',languageData)}</Label>
                                <Select  className="react-select fontstyle"
                                    classNamePrefix="react-select"
                                    name="form-field-name"
                                    value={region_data.filter(option =>option.value === region)}
                                    options={region_data}
                                    onChange={({value}) => this.setState({  region: value,area:'',team:'' })}
                                />
                        
                    </div>
                    <div className = "col-lg-2-0 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Area',languageData)}</Label>
                                  <Select  className="react-select fontstyle"
                                      classNamePrefix="react-select"
                                      name="form-field-name"
                                      value={area_data.filter(option =>option.value === area)}
                                      options={this.getArrayValue(area_data, region, 'region')}
                                      onChange={({value}) => this.setState({  area: value,team:'' })}
                                  />
                          
                      </div>
                      <div className = "col-lg-2-0 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Team',languageData)}</Label>
                                  <Select  className="react-select fontstyle"
                                      classNamePrefix="react-select"
                                      name="form-field-name"
                                      value={team_data.filter(option =>option.value === team)}
                                      options={this.getArrayValue(team_data, area, 'area')}
                                      onChange={({value}) => this.setState({  team: value })}
                                  />
                          
                      </div>
                      <div className = "col-lg-2-0 space-margin"  >
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Location',languageData)}</Label>
                            <Input className = "fontstyle text-background"  
                            value={location}
                            onChange={(e) => this.setState({ location: e.target.value})} />
                    </div>
                    <div className = "col-md-6 space-margin" style={{marginTop:'20px'}} >
                       <Button className = "button-width" color="secondary" 
                          onClick={()=>this.onSubmitFilter(true,true)} >
                            <i className = "simple-icon-cloud-download" style = {{marginRight:'5px'}}/>
                            {onChangeLanguage(locale,'Download',languageData)}</Button> 
                        {is_edit === true &&
                          <Button className = "button-width" color="primary"
                              onClick={()=>this.ongenerateUnit()}
                              >
                            {onChangeLanguage(locale,'Get Unit',languageData)} </Button>}
                            <Button className = "button-width" color="primary"
                           onClick={()=>this.onSubmitFilter(true,false)}
                              >
                            {onChangeLanguage(locale,'Filter',languageData)} </Button>
                          
                            <Button className = "button-width" color="secondary" 
                          onClick={()=>this.clearValue()}
                          >{onChangeLanguage(locale,'Refresh',languageData)}</Button> 
                    </div>
                </div>
               
              </div>
            </div>
           
            <div style = {{padding :'10px',width:'100%',overflow:'auto'}}>
                { data.length > 0 && 
                    <Table                 
                      columns={columns}
                      pagination = {pagination}
                      dataSource={data} 
                      rowKey="id"
                      rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}/>
  
                    }  
                
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

   })(MasterPage)
  );

