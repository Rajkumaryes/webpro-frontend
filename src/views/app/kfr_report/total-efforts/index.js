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
import{effortsdocService } from '../../../../redux/kfr_report/total-efforts/saga'
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
   clearValue()
   {
     this.setState({
      page:1,
      pageSize:25,
      total :0,
      region:"",
      area:"",
      team:"",
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
     const {region,area,team,month,year,location} = this.state
     if(region !== ''  || area !== '' || team !== '' 
     || month !== '' || year !== ''|| location !== '')
     {
      this.fetchPagination(1,25,region,area,team,month,year,location,is_report)
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
     const {page, pageSize, region,area,team,month,year,location} = this.state
     this.fetchPagination(page, pageSize,region,area,team,month,year,location,false)
      
   }
   fetchPagination(page,per_page,region,area,team,month,year,location,is_report) {  
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
    effortsdocService.fetchpagination(page,per_page,region,area,team,month,year,
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
    effortsdocService .deleteapi(id)
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
    const columnarray = ["Sub Area", "area", "service_center", "region_name", "Year", 
    "Month", "MTD Volume + HB","Acual MTD Volume (BMCS)","BCM- Total Shipment Shared(A)",
    "BCM - Total Shipment Processed(B)", "Post BCM - MTD volume", "Total EDI", "EDI Console",
     "Manual Console", "DG EDI", "Manual DG Console", "LCL", "HBL creation (BMDO)","Indexing (DOSI)", "Exception (PEAR)", "Draft Correction",
      "Release OBL+SWB", "Customs Transmission", "Mailbox Handling","Query resolved ( Int & Ext)", "SI Replacements", "VIP", "Attach Sheet (Minutes 00.00)",
     "Working Days", "Tagging", "Total Efforts", "Region Based Total Efforts" ];
      return(
        
        <Workbook filename="Total Efforts Doc.xlsx" element={
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
    effortsdocService .fileUpload(files[0])
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

    
     const{id,month,year,region,area,location,team,mtd_volume_hb, actual_mtd_volume, bcm_shipment_shared, bcm_shipment_processed, post_bcm
      , total_edi, edi_console, manual_console, dg_edi, manual_dg_console, lcl
      , hbl_creation, indexing, exception, draft_correction, release_obl_swb, custom_transmission
      , mailbox_handling, query_resolved, si_replacements, vip, attach_sheet
      , working_days, tagging, total_efforts, region_total_efforts,status}= record
      if(region !== '' && area !== '' && team !== '' && year !== '' && month !== '')
      {
        this.setState({
          is_submit_table :false,
          selected_id:-1 
        })
        effortsdocService .updateapi(id,month,year,region,area,location,team,mtd_volume_hb, actual_mtd_volume, bcm_shipment_shared, bcm_shipment_processed, post_bcm
          , total_edi, edi_console, manual_console, dg_edi, manual_dg_console, lcl
          , hbl_creation, indexing, exception, draft_correction, release_obl_swb, custom_transmission
          , mailbox_handling, query_resolved, si_replacements, vip, attach_sheet
          , working_days, tagging, total_efforts, region_total_efforts,status)
         .then((res) => { 
           this.setState({   
             loading : false     
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
      if(key === 'month' || key === 'region' ||
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
          const { region,area,team,month,year,location} = this.state
          this.fetchPagination(page, pageSize,region,area,team,month,year,location,false)
        },
        pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
        // total: this.state.total  ,
        showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total}`,
      };
    render()
    {
      const {locale,languageData,match,role_permission_data} = this.props
        const {data,loading , region,area,team ,location,month,year, is_submit_table,
          region_data,area_data,team_data ,month_data,selected_id} = this.state
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
                      isDisabled={!is_edit}
                      value={month_data.filter(option =>(option.value).toLowerCase() === (text).toLowerCase())}
                      options={month_data}
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
                title:  onChangeLanguage(locale,'Service Centre',languageData),
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
                      isDisabled={!is_edit}
                      value={region_data.filter(option =>option.value === text)}
                      options={region_data}
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
                title:  onChangeLanguage(locale,'MTD Volume + HB',languageData),
                dataIndex: 'mtd_volume_hb',
                key: 'mtd_volume_hb',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'mtd_volume_hb')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'mtd_volume_hb')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'mtd_volume_hb')}
                  />  
                  </div>),
              },
              {
                title:  onChangeLanguage(locale,'Acual MTD Volume (BMCS)',languageData),
                dataIndex: 'actual_mtd_volume',
                key: 'actual_mtd_volume',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'actual_mtd_volume')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'actual_mtd_volume')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'actual_mtd_volume')}
                  />  
                  </div>),
              },
              {
                title:  onChangeLanguage(locale,'BCM- Total Shipment Shared(A)',languageData),
                dataIndex: 'bcm_shipment_shared',
                key: 'bcm_shipment_shared',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'bcm_shipment_shared')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'bcm_shipment_shared')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'bcm_shipment_shared')}
                  />  
                  </div>),
              },
              {
                title:  onChangeLanguage(locale,'BCM - Total Shipment Processed(B)',languageData),
                dataIndex: 'bcm_shipment_processed',
                key: 'bcm_shipment_processed',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'bcm_shipment_processed')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'bcm_shipment_processed')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'bcm_shipment_processed')}
                  />  
                  </div>),
              },
              {
                title:  onChangeLanguage(locale,'Post BCM - MTD volume',languageData),
                dataIndex: 'post_bcm',
                key: 'post_bcm',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'post_bcm')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'post_bcm')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'post_bcm')}
                  />  
                  </div>),
              },
              {
                title:  onChangeLanguage(locale,'Total EDI',languageData),
                dataIndex: 'total_edi',
                key: 'total_edi',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'total_edi')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'total_edi')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'total_edi')}
                  />  
                  </div>),
              },
              {
                title:  onChangeLanguage(locale,'EDI Console',languageData),
                dataIndex: 'edi_console',
                key: 'edi_console',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'edi_console')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'edi_console')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'edi_console')}
                  />  
                  </div>),
              },
              {
                title:  onChangeLanguage(locale,'Manual Console',languageData),
                dataIndex: 'manual_console',
                key: 'manual_console',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'100px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'manual_console')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'manual_console')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'manual_console')}
                  />  
                  </div>),
              }, 
              {
                title:  onChangeLanguage(locale,'DG EDI',languageData),
                dataIndex: 'dg_edi',
                key: 'dg_edi',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'100px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'dg_edi')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'dg_edi')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'dg_edi')}
                  />  
                  </div>),
              },
               {
                title:  onChangeLanguage(locale,'Manual DG Console',languageData),
                dataIndex: 'manual_dg_console',
                key: 'manual_dg_console',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'manual_dg_console')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'manual_dg_console')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'manual_dg_console')}
                  />  
                  </div>),
              },
               {
                title:  onChangeLanguage(locale,'LCL',languageData),
                dataIndex: 'lcl',
                key: 'lcl',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'lcl')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'lcl')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'lcl')}
                  />  
                  </div>),
              }, 
              {
                title:  onChangeLanguage(locale,'HBL creation (BMDO)',languageData),
                dataIndex: 'hbl_creation',
                key: 'hbl_creation',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'hbl_creation')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'hbl_creation')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'hbl_creation')}
                  />  
                  </div>),
              }, 
              {
                title:  onChangeLanguage(locale,'Indexing (DOSI)',languageData),
                dataIndex: 'indexing',
                key: 'indexing',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'indexing')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'indexing')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'indexing')}
                  />  
                  </div>),
              }, 
              {
                title:  onChangeLanguage(locale,'Exception (PEAR)',languageData),
                dataIndex: 'exception',
                key: 'exception',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'200px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'exception')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'exception')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'exception')}
                  />  
                  </div>),
              },
              {
                title:  onChangeLanguage(locale,'Draft Correction',languageData),
                dataIndex: 'draft_correction',
                key: 'draft_correction',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'100px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'draft_correction')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'draft_correction')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'draft_correction')}
                  />  
                  </div>),
              },
              {
                title:  onChangeLanguage(locale,'Release OBL+SWB',languageData),
                dataIndex: 'release_obl_swb',
                key: 'release_obl_swb',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'100px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'release_obl_swb')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'release_obl_swb')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'release_obl_swb')}
                  />  
                  </div>),
              },
              {
                title:  onChangeLanguage(locale,'Customs Transmission',languageData),
                dataIndex: 'custom_transmission',
                key: 'custom_transmission',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'100px'}}>
                    <Input className = "fontstyle text-background"  
                        value={text}
                        type='number'
                        disabled={!is_edit}
                        onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'custom_transmission')} 
                        onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'custom_transmission')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'custom_transmission')}
                  />  
                  </div>),
              },
              {
                title:  onChangeLanguage(locale,'Mailbox Handling',languageData),
                dataIndex: 'mailbox_handling',
                key: 'mailbox_handling',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'100px'}}>
                    <Input className = "fontstyle text-background"
                      value={text}
                      type='number'
                      disabled={!is_edit}
                      onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'mailbox_handling')} 
                      onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'mailbox_handling')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'mailbox_handling')}
                  />  
                  </div>), 
              },
              {
                title:  onChangeLanguage(locale,'Query resolved ( Int & Ext)',languageData),
                dataIndex: 'query_resolved',
                key: 'query_resolved',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'100px'}}>
                    <Input className = "fontstyle text-background"
                      value={text}
                      type='number'
                      disabled={!is_edit}
                      onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'query_resolved')} 
                      onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'query_resolved')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'query_resolved')}
                  />  
                  </div>), 
              },
              {
                title:  onChangeLanguage(locale,'SI Replacements',languageData),
                dataIndex: 'si_replacements',
                key: 'si_replacements',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'100px'}}>
                   <Input className = "fontstyle text-background"
                      value={text}
                      type='number'
                      disabled={!is_edit}
                      onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'si_replacements')} 
                      onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'si_replacements')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'si_replacements')}
                  />  
                  </div>), 
              },
              {
                title:  onChangeLanguage(locale,'VIP',languageData),
                dataIndex: 'vip',
                key: 'vip',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'100px'}}>
                   <Input className = "fontstyle text-background"
                      value={text}
                      type='number'
                      disabled={!is_edit}
                      onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'vip')} 
                      onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'vip')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'vip')}
                  />  
                  </div>), 
              },
              {
                title:  onChangeLanguage(locale,'Attach Sheet (Minutes 00.00)',languageData),
                dataIndex: 'attach_sheet',
                key: 'attach_sheet',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'100px'}}>
                   <Input className = "fontstyle text-background"
                      value={text}
                      type='number'
                      disabled={!is_edit}
                      onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'attach_sheet')} 
                      onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'attach_sheet')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'attach_sheet')}
                  />   
                  </div>), 
              },
              {
                title:  onChangeLanguage(locale,'Working Days',languageData),
                dataIndex: 'working_days',
                key: 'working_days',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'100px'}}>
                   <Input className = "fontstyle text-background"
                      value={text}
                      type='number'
                      disabled={!is_edit}
                      onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'working_days')} 
                      onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'working_days')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'working_days')}
                  />   
                  </div>), 
              },
              {
                title:  onChangeLanguage(locale,'Tagging',languageData),
                dataIndex: 'tagging',
                key: 'tagging',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'100px'}}>
                    <Input className = "fontstyle text-background"
                      value={text}
                      type='number'
                      disabled={!is_edit}
                      onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'tagging')} 
                      onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'tagging')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'tagging')}
                  />   
                  </div>), 
              },
              {
                title:  onChangeLanguage(locale,'Total Efforts',languageData),
                dataIndex: 'total_efforts',
                key: 'total_efforts',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'100px'}}>
                   <Input className = "fontstyle text-background"
                      value={text}
                      type='number'
                      disabled={!is_edit}
                      onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'total_efforts')} 
                      onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'total_efforts')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'total_efforts')}
                  />  
                  </div>), 
              },
              {
                title:  onChangeLanguage(locale,'Region Based Total Efforts',languageData),
                dataIndex: 'region_total_efforts',
                key: 'region_total_efforts',
                render: (text, record,index) => ( 
                  <div   style = {{padding:'2px',width:'100px'}}>
                    <Input className = "fontstyle text-background"
                      value={text}
                      type='number'
                      disabled={!is_edit}
                      onKeyDown ={(e)=>this.onKeyDownValue_row(e,record,'region_total_efforts')} 
                      onKeyPress = {(e)=>this.onKeyPressValue_row(e,record,'region_total_efforts')}
                      onChange={(e) =>this.onChangeValue_row(e.target.value,record.id,'region_total_efforts')}
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
            <title> {onChangeLanguage(locale,'Total Efforts Doc',languageData)}</title>
            {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <Row>
              <Colxx xxs="12">
                <div className = "row">
                    <div className = "col-md-8">
                        <Breadcrumb heading= {onChangeLanguage(locale,'Total Efforts Doc',languageData)} match={match} />
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
                    
                    <div className = "col-md-3 space-margin"  >
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Month',languageData)}</Label>
                          <Select  className="react-select fontstyle"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={month_data.filter(option =>option.value === month)}
                            options={month_data}
                            onChange={({value}) => this.setState({  month: value })}
                        />
                    </div>
                    <div className = "col-md-3 space-margin"  >
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Year',languageData)}</Label>
                            <Input className = "fontstyle text-background"  
                            value={year}
                            type='number'
                            onChange={(e) => this.setState({ year: this.onchangeYear(e.target.value) })} />
                    </div>
                    <div className = "col-md-3 space-margin"  >
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Region',languageData)}</Label>
                                <Select  className="react-select fontstyle"
                                    classNamePrefix="react-select"
                                    name="form-field-name"
                                    value={region_data.filter(option =>option.value === region)}
                                    options={region_data}
                                    onChange={({value}) => this.setState({  region: value,area:'',team:'' })}
                                />
                        
                    </div>
                    <div className = "col-md-3 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Area',languageData)}</Label>
                                  <Select  className="react-select fontstyle"
                                      classNamePrefix="react-select"
                                      name="form-field-name"
                                      value={area_data.filter(option =>option.value === area)}
                                      options={this.getArrayValue(area_data, region, 'region')}
                                      onChange={({value}) => this.setState({  area: value,team:'' })}
                                  />
                          
                      </div>
                      <div className = "col-md-3 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Team',languageData)}</Label>
                                  <Select  className="react-select fontstyle"
                                      classNamePrefix="react-select"
                                      name="form-field-name"
                                      value={team_data.filter(option =>option.value === team)}
                                      options={this.getArrayValue(team_data, area, 'area')}
                                      onChange={({value}) => this.setState({  team: value })}
                                  />
                          
                      </div>
                      <div className = "col-md-3 space-margin"  >
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Service Centre',languageData)}</Label>
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

