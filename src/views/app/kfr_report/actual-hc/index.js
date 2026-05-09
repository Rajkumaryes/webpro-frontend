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
import {onChangeLanguage,getPermission} from '../../../../helper';
import{actualhcService} from '../../../../redux/kfr_report/actualhc/saga'
import{roleService} from '../../../../redux/role/saga'
import { regionService } from '../../../../redux/region/saga'
import { areaService } from '../../../../redux/area/saga';
import { teamsService } from '../../../../redux/teams/saga';
import Workbook from 'react-excel-workbook'
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
      selected_id:-1
     })
    
   }
   onSubmitFilter(is_search,is_report)
   {
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

    actualhcService.fetchpagination(page,per_page,region,area,team,process,month,year,
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
   
   
   
  handleDelete = id => {
    actualhcService.deleteapi(id)
    .then((res) => {
      if(res){
        createNotification('Deleted','success','filled')
        this.onFilter()
      }			
    })
    .catch((error) => { });
  }
  renderTemplate()
  {
    const {languageData,locale} = this.props
    const columnarray = [ "Month", "Year", "Process","Centre", "Region", "Team", "Area", "Loss due to Leaves (FTEs)(excluding Area Holidays & Comp Offs) - C1", 
    "Loss due to Comp Offs -  availed (FTEs) - C2", "Loss due to due to leaving early or coming in late (FTEs) - C3", "Loss due to initiatives / projects (FTEs) - C5", 
    "Shortfall from Approved/Budgeted HC (FTEs) - C6", "Support provided to other teams in (FTEs) - C7", "System Outages in (FTEs) - C8", "Non Automation Gain", "Automation Gain",
     "Productivity Loss - Learning Curve New Hires (FTEs) - C4", "Training Pool HC (FTEs) - D1", "No of HC worked on Area holidays/weekends (FTEs) - D2", "Extra Hours taken from other Teams (FTEs) - D3",
      "Extra Hours : Own Team -regular days - (FTEs) - D4", "Total Loss", "Total Gain", "Final Number" ];
      return(
        
        <Workbook filename="Actual HC.xlsx" element={
          <Button className = "button-width" color="secondary" 
          >{ onChangeLanguage(locale,'Download Template',languageData)}  
          </Button>
		      }>
          <Workbook.Sheet data={[]} name="Sheet A">
          {columnarray && columnarray.map((value,index) => 
                <Workbook.Column label={value} value={value}/>
           )}
          </Workbook.Sheet> 
        </Workbook>
     

      );
  }
  onChangeFileUpload(files)
	{
    this.setState({
      loading : true
    })
    actualhcService.fileUpload(files[0])
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
          else
          {
            createNotification(res.data.message,'error','filled');
          }  
        }
          
    
    })
    .catch((error) => { 
      this.setState({
        loading : false
      })
      });
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

    
     const{id,process,month,year,region,area,location,team,c1,c2,c3,c4,c5,c6,c7,c8,
      non_automation_gain,automation_gain,d1,d2,d3,d4,total_loss,total_gain,finalnumber,
      actualhc,status}= record
      if(process !== '' && region !== '' && area !== '' && team !== '' && year !== '' && month !== '')
      {
        this.setState({
          is_submit_table :false,
          selected_id:-1 
        })
        actualhcService.updateapi(id,process,month,year,region,area,location,team,c1,c2,c3,c4,c5,c6,c7,c8,
          non_automation_gain,automation_gain,d1,d2,d3,d4,total_loss,total_gain,finalnumber,
          actualhc,status)
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
                  data[index].actualhc =  res.data.actualhc
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
          process_data,region_data,area_data,team_data ,month_data,selected_id} = this.state
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
                      value={month_data.filter(option =>(option.value).toLowerCase() === (text).toLowerCase())}
                      options={month_data}
                      isDisabled={!is_edit}
                      onChange={({value}) =>this.onChangeValue_row((value).toLowerCase(),record.id,'month')}
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
                title:  onChangeLanguage(locale,'Centre',languageData),
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
                title:  onChangeLanguage(locale,'Loss due to Leaves (FTEs)(excluding  Area Holidays & Comp Offs) - C1',languageData),
                dataIndex: 'c1',
                key: 'c1',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'c1')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'c1')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'c1')}
                  />  
                  </div>),
              },
              {
                title:  onChangeLanguage(locale,'Loss due to Comp Offs - availed (FTEs) - C2',languageData),
                dataIndex: 'c2',
                key: 'c2',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'c2')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'c2')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'c2')}
                  />  
                  </div>),
              },
              {
                title:  onChangeLanguage(locale,'Loss due to due to leaving early or coming in late (FTEs) - C3',languageData),
                dataIndex: 'c3',
                key: 'c3',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'c3')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'c3')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'c3')}
                  />  
                  </div>),
              },
              {
                title:  onChangeLanguage(locale,'Loss due to initiatives / projects (FTEs) - C5',languageData),
                dataIndex: 'c5',
                key: 'c5',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'c5')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'c5')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'c5')}
                  />  
                  </div>),
              },
              {
                title:  onChangeLanguage(locale,'Shortfall from Approved/Budgeted HC (FTEs) - C6',languageData),
                dataIndex: 'c6',
                key: 'c6',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'c6')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'c6')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'c6')}
                  />  
                  </div>),
              },
              {
                title:  onChangeLanguage(locale,'Support provided to other teams in (FTEs) - C7',languageData),
                dataIndex: 'c7',
                key: 'c7',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'c7')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'c7')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'c7')}
                  />  
                  </div>),
              },
              {
                title:  onChangeLanguage(locale,'System Outages in (FTEs) - C8',languageData),
                dataIndex: 'c8',
                key: 'c8',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'c8')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'c8')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'c8')}
                  />  
                  </div>),
              },
              {
                title:  onChangeLanguage(locale,'Non Automation Gain',languageData),
                dataIndex: 'non_automation_gain',
                key: 'non_automation_gain',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'100px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'non_automation_gain')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'non_automation_gain')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'non_automation_gain')}
                  />  
                  </div>),
              }, 
              {
                title:  onChangeLanguage(locale,'Automation Gain',languageData),
                dataIndex: 'automation_gain',
                key: 'automation_gain',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'100px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'automation_gain')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'automation_gain')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'automation_gain')}
                  />  
                  </div>),
              },
               {
                title:  onChangeLanguage(locale,'Productivity Loss - Learning Curve New Hires (FTEs) - C4',languageData),
                dataIndex: 'c4',
                key: 'c4',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'c4')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'c4')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'c4')}
                  />  
                  </div>),
              },
               {
                title:  onChangeLanguage(locale,'Training Pool HC (FTEs) - D1',languageData),
                dataIndex: 'd1',
                key: 'd1',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'d1')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'d1')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'d1')}
                  />  
                  </div>),
              }, 
              {
                title:  onChangeLanguage(locale,'No of HC worked on Area holidays/weekends (FTEs) - D2',languageData),
                dataIndex: 'd2',
                key: 'd2',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'d2')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'d2')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'d2')}
                  />  
                  </div>),
              }, 
              {
                title:  onChangeLanguage(locale,'Extra Hours taken from other Teams (FTEs) - D3',languageData),
                dataIndex: 'd3',
                key: 'd3',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'d3')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'d3')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'d3')}
                  />  
                  </div>),
              }, 
              {
                title:  onChangeLanguage(locale,'Extra Hours : Own Team -regular days - (FTEs) - D4',languageData),
                dataIndex: 'd4',
                key: 'd4',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'d4')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'d4')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'d4')}
                  />  
                  </div>),
              },
              {
                title:  onChangeLanguage(locale,'Total Loss',languageData),
                dataIndex: 'total_loss',
                key: 'total_loss',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'100px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'total_loss')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'total_loss')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'total_loss')}
                  />  
                  </div>),
              },
              {
                title:  onChangeLanguage(locale,'Total Gain',languageData),
                dataIndex: 'total_gain',
                key: 'total_gain',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'100px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'total_gain')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'total_gain')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'total_gain')}
                  />  
                  </div>),
              },
              {
                title:  onChangeLanguage(locale,'Final Number',languageData),
                dataIndex: 'finalnumber',
                key: 'finalnumber',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'100px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'finalnumber')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'finalnumber')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'finalnumber')}
                  />  
                  </div>),
              },
              {
                title:  onChangeLanguage(locale,'Actual HC',languageData),
                dataIndex: 'actualhc',
                key: 'actualhc',
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
            <title> {onChangeLanguage(locale,'Actual HC',languageData)}</title>
            {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <Row>
              <Colxx xxs="12">
                <div className = "row">
                    <div className = "col-md-8">
                        <Breadcrumb heading= {onChangeLanguage(locale,'Actual HC',languageData)} match={match} />
                    </div>
               
                   {is_edit === true &&
                    <div className = "col-md-4">
                    <Button className = "button-width" color="primary">
                            <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
                            <a style= {{margin :'0px'}} > Upload</a>
                            <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                                className = "filepicker_customButton"
                                style = {{width : '26%',marginLeft :'-22%'}}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
                        </Button>
                        {this.renderTemplate()}
                     
                    </div>}
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
                          <Select  className="react-select fontstyle"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={month_data.filter(option =>option.value === month)}
                            options={month_data}
                            onChange={({value}) => this.setState({  month: value })}
                        />
                    </div>
                    <div className = "col-lg-2-0 space-margin"  >
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Year',languageData)}</Label>
                            <Input className = "fontstyle text-background"  
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
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Centre',languageData)}</Label>
                            <Input className = "fontstyle text-background"  
                            value={location}
                            onChange={(e) => this.setState({ location: e.target.value})} />
                    </div>
                    <div className = "col-md-4 space-margin" style={{marginTop:'20px'}} >
                       <Button className = "button-width" color="secondary" 
                          onClick={()=>this.onSubmitFilter(true,true)} >
                            <i className = "simple-icon-cloud-download" style = {{marginRight:'5px'}}/>
                            {onChangeLanguage(locale,'Download',languageData)}</Button> 
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

