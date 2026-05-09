import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import Select from 'react-select';
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../constants/defaultValues';
import { Label,Button,Input,Popover, PopoverBody} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { Table, Popconfirm ,Tooltip,TimePicker } from 'antd';
import 'antd/dist/antd.css';
import { createNotification } from '../../../../toast';
import {onChangeLanguage,getValue} from '../../../../helper'
import{attendanceService} from '../../../../redux/productivty/attendance/saga'
import{teamsService} from '../../../../redux/teams/saga'
import moment from 'moment';
import Workbook from 'react-excel-workbook'

class MasterPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
       data:[],
       selectedRowKeys:[],
       team:'',
       team_upload:'',
       team_data:[],
       user_id:'',
       start_time:'',
       end_time:'',
       page:1,
       pageSize:25,
       total :0,
       open_popup:'',
       file:null
      };
    }
    componentWillMount()
    {
        this.ClearValue()
        this.fetchteam()
    }
   
    ClearValue()
    {
      this.setState({
        team:'',
        user_id:'',
        start_time:'',
        end_time:'',
        page:1,
        pageSize:25,
        total :0,
        open_popup:'',
        file:null,
        team_upload:'',
      })
    
      this.fetchPagination(1,25,'','','','')
      
    }
    fetchteam() {
      teamsService.fetchteams()
      .then((res) => {
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var teamlist = filterstatus.map(function(cusmaidid) {
                    return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                 });  
                  this.setState({
                  team_data :  teamlist,
                  })
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
   }  
    fetchPagination(page,per_page,start_time,end_time,team,user_id) {  
      this.setState({
        loading : true,

      })
      attendanceService.fetchpaginationapi(page,per_page,start_time,end_time,team,user_id)
        .then((res) => { 
          this.setState({   
          loading : false ,
          selectedRowKeys:[],  
          page:page,
          pageSize:per_page,
          }) 
          if(res.status)
            {
              this.setState({ 
                data:res.data  , 
                total:res.total,       
              }) 
            }
            else
            {
              this.setState({ 
                data:[]  ,  
                page:1,
                pageSize:25,
                total:0,        
              }) 
            }                
      
      })
      .catch((error) => { 
        this.setState({
          loading : false
        })
        });   
   }
 
 
    fetchData()
    {
      const {page,pageSize,start_time,end_time,team,user_id} = this.state
      this.fetchPagination(page,pageSize,start_time,end_time,team,user_id)
    }
  
   
  handleDelete = id => {
    attendanceService.deleteapi(id)
    .then((res) => {
      if(res.status){
        createNotification('Deleted','success','filled')
        this.fetchData()
      }			
    })
    .catch((error) => { });
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
      const {start_time,end_time,team,user_id} = this.state
     this.fetchPagination(page,pageSize,start_time,end_time,team,user_id)
    },
    pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
    // total: this.state.total  ,
    showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total}`,
  };
  onSelectChangeHeader = () => {
    const {selectedRowKeys,data} = this.state
    var list = [...selectedRowKeys]
    if(list.length > 0)
    {
      list = []
    }
    else
    {
      for(var i = 0 ; i <data.length;i++)
      {
        if(data[i].approval_status  === 0 && data[i].end_time !== '' &&  data[i].end_time !== null)
        {
          list.push(data[i].id)
        }

      }
    }
    this.setState({ selectedRowKeys : list });
  };
  onSelectChange = id => {
    const {selectedRowKeys} = this.state
    var list = [...selectedRowKeys]
    if(list.includes(id))
    {
      list = list.filter(option =>option !== id)
    }
    else
    {
      list.push(id)
    }
    this.setState({ selectedRowKeys : list });
  };

  onSearch()
  {
    const {start_time,end_time,team,user_id} = this.state
    var isfill = false,is_date = true
    if(start_time !== '' || end_time !== '' || team !== '' || user_id !== '')
    {
      if(start_time !== '')
      {
          if(end_time === '')
          {
              is_date = false
              createNotification('Please Choose end date','error','filled')
          }
          else
          {
              is_date = true
          }
          isfill = true
      }
      else  if(end_time !== '')
      {
          if(start_time === '')
          {
              is_date = false
              createNotification('Please Choose start date','error','filled')
          }
          else
          {
              is_date = true
          }
          isfill = true
      }
      else
      {
          isfill = true
      }
      if(isfill === true && is_date === true)
      {
        this.fetchPagination(1,25,start_time,end_time,team,user_id)
      }
      else
      {
          if(is_date === true)
          {
            createNotification('Please Choose any one details then can search','error','filled')
          }
       
      }
      
    }
    else
    {
      createNotification('Please fill any one details','error','filled')
    }
    
  }

  getTime(time)
  {
    var t_time= ''
    
    if(time !== null && time && time !== '')
    {
      var current_d = moment(new Date()).format('MM/DD/YYYY')
      var date_time = current_d + " " + time
      t_time =   moment(date_time).format('hh:mm a')
    
    }
    return t_time
  }
  onSubmit()
  {
    const {file, team_upload,} = this.state
    if(file !== null && team_upload !== '')
    {
      this.closedate()
      attendanceService.fileUpload(file,team_upload)
      .then((res) => { 
        if(res.status)
        {
          if(res.data.status)   
          {   
            createNotification('Uploaded','success','filled')
            this.ClearValue()
            } else{
              createNotification(res.data.message,'error','filled')
            }     
        }
          
    
    })
    .catch((error) => { 
     
      });
    }
    else
    {
      createNotification('Please choose file and team','error','filled')
    }
   
  }
  onChangeFileUpload(files)
 {
   
   this.setState({
     file:files[0]
   })
  }
  renderTemplate()
  {
    const {locale,languageData} = this.props
    const column_name = ["Emp. Id", "USER ID","Func. Appraiser", "Department", "Location", "Roster Data", "Week Day", "Shift", "Login", "Logout", "Working Hours","Extra Hours", "Attendance", "Leave Pending", "Leave Approved"]
    return(
      <Workbook filename="Attendance.xlsx" element={<Button  className = "button-width" color="secondary">
      {onChangeLanguage(locale,'Download Template',languageData)}
      </Button>}>
      <Workbook.Sheet data={[]} name="Sheet A">
      {column_name && column_name.map((value,index) =>
        <Workbook.Column label={value} value={value}  />
        )}
      </Workbook.Sheet>
      
        </Workbook>
    )
  }
  closedate()
  {
    this.setState({
      team_upload:'',
      open_popup:'',
      file:null
    })
  }
  onUpdate(record)
 { 
    const{id,user_id,location,roaster_date,week_day,shift,login,logout,working_hour,extra_hour,attendance,leave_pending,leave_approved,team}= record

      attendanceService.updateapi(id,user_id,location,roaster_date,week_day,shift,login,logout,working_hour,extra_hour,attendance,leave_pending,leave_approved,team)
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
  onChangeValue_row(value,id,key)
    { 
      const data = [...this.state.data]
      const index = data.findIndex(x => x.id === id)
        if(index >= 0)
        {
           
            if( key === 'login' || key === 'logout' || key === 'working_hour'|| key === 'extra_hour')
            {
              data[index][key] = value
              this.setState({
                data:data,
                selectedRowKeys : []
               })
               
                 this.onUpdate(data[index])
            }
         
        }
    }
    render()
    {
      const {locale,languageData,match} = this.props
        const {data,open_popup,team_upload,team_data} = this.state
      
        const columns = [
           
             {
                title:  onChangeLanguage(locale,'USER ID',languageData),
                dataIndex: 'user_id',
                key: 'user_id',

              },
              {
                title:  onChangeLanguage(locale,'Location',languageData),
                dataIndex: 'location',
                key: 'location',

              },
              {
                title:  onChangeLanguage(locale,'Roster Data',languageData),
                dataIndex: 'roaster_date',
                key: 'roaster_date',
                render: (text,record) => (
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'100px'}} >
                     {  moment(text).format('MM/DD/YYYY')}
                    </div>
               ),
              

              },
              {
                title:  onChangeLanguage(locale,'Week Day',languageData),
                dataIndex: 'week_day',
                key: 'week_day',

              },
              {
                title:  onChangeLanguage(locale,'Shift',languageData),
                dataIndex: 'shift',
                key: 'shift',

              },
              {
                title:  onChangeLanguage(locale,'Login',languageData),
                dataIndex: 'login',
                key: 'login',
                render: (text, record) => (	
                  <div>
                     <TimePicker className = "fontstyle text-background" 
                    style = {{width:'80px'}}  
                    format="HH:mm"
                     value = {(text !== null  && text)? moment(text, "HH:mm") : ''}  
                    onChange={(time,timeString) =>this.onChangeValue_row(timeString,record.id,'login')}   />
                  
                  </div>
                  ),
              },
              {
                title:  onChangeLanguage(locale,'Logout',languageData),
                dataIndex: 'logout',
                key: 'logout',
                render: (text, record) => (	
                  <div>
                   
                     <TimePicker className = "fontstyle text-background" 
                    style = {{width:'80px'}}  
                    format="HH:mm"
                     value = {(text !== null  && text)? moment(text, "HH:mm") : ''}  
                    onChange={(time,timeString) =>this.onChangeValue_row(timeString,record.id,'logout')}   />
                  </div>
                  ),
              },
              {
                title:  onChangeLanguage(locale,'Working Hours',languageData),
                dataIndex: 'working_hour',
                key: 'working_hour',
                render: (text, record) => (	
                  <div>
                    <TimePicker className = "fontstyle text-background" 
                    style = {{width:'80px'}}  
                    format="HH:mm"
                     value = {(text !== null  && text)? moment(text, "HH:mm") : ''}  
                    onChange={(time,timeString) =>this.onChangeValue_row(timeString,record.id,'working_hour')}   />
                  </div>
                  ),
              },
               {
                title:  onChangeLanguage(locale,'Extra Hours',languageData),
                dataIndex: 'extra_hour',
                key: 'extra_hour',
                render: (text, record) => (	
                  <div>
                    <TimePicker className = "fontstyle text-background" 
                    style = {{width:'80px'}}  
                    format="HH:mm"
                     value = {(text !== null  && text)? moment(text, "HH:mm") : ''}  
                    onChange={(time,timeString) =>this.onChangeValue_row(timeString,record.id,'extra_hour')}   />
                  
                  </div>
                  ),
              },
               {
                title:  onChangeLanguage(locale,'Attendance',languageData),
                dataIndex: 'attendance',
                key: 'attendance',
              },
               {
                title:  onChangeLanguage(locale,'Leave Pending',languageData),
                dataIndex: 'leave_pending',
                key: 'leave_pending',
              },
              {
                title:  onChangeLanguage(locale,'Leave Approved',languageData),
                dataIndex: 'leave_approved',
                key: 'leave_approved',
              },
              {
                title:  onChangeLanguage(locale,'Team',languageData),
                dataIndex: 'team',
                key: 'team',
                render: (text,record) => (
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'100px'}} >
                    {getValue(team_data,'value','label',text)}
                    </div>
              )

              },
            // {
            //     title: 'Action',
            //     key: 'id',
            //    dataIndex: 'id',
            //     render: (id,record) => (
            //         <div className="row d-flex justify-content-center" >
                     
            //          <Popconfirm className = 'fontstyle' variant="contained" 
            //          title="Are you sure to delete?"
            //          style = {{
            //             backgroundColor: 'rgb(79, 156, 1)',
            //             color: 'white' }}
            //            onConfirm={() => this.handleDelete(record.id)}
            //             >
            //                <Tooltip title="Delete" placement="bottom">
            //          <a style = {{color  :'red' ,height:'25px',width:'25px',
            //                     padding:'4px',marginLeft:'12px'}}><i className = "simple-icon-trash"></i></a></Tooltip>
            //             </Popconfirm>
                
                         
            //           </div>
            //     )
            // }
        ]
       
        const pagination = {
          ...this.paginationOptions,
          total: this.state.total,
          current: this.state.page,
          pageSize: this.state.pageSize,
          };
        return (
            <>
            <title> {onChangeLanguage(locale,'Attendance Master',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <div className = "row">
                    <div className = "col-md-8">
                        <Breadcrumb heading= {onChangeLanguage(locale,'Attendance Master',languageData)} match={match} />
                    </div>
                    <div className = "col-md-4" style = {{marginTop:'4px'}}>
                     
                        <span>
                              <Button color="primary"
                                style = {{marginTop:'6px'}}
                                className="button-width mr-1 mb-2"
                                id="column"
                                onClick={() => this.setState({open_popup:'upload'})}
                              >{onChangeLanguage(locale,'Upload',languageData)}
                                 < i  style = {{marginLeft:'5px'}} className = {open_popup === 'upload' ? "simple-icon-arrow-up":"simple-icon-arrow-down"}/>
                              </Button>
                              <Popover
                                placement='bottom'
                                isOpen={open_popup === 'upload'}
                                target="column"
                                toggle={() =>  this.setState({open_popup:''})}
                              >
                                <PopoverBody>
                                <Row> 
                                <Colxx xxs="12">
                                    <Label className = "fontstyle" style = {{fontSize:'17px',padding:'5px'}} > 
                                    {onChangeLanguage(locale,'Upload Attendance Report',languageData)} </Label> 
                                    
                                </Colxx>
                              
                                  <Colxx xxs="12">
                                  <div style = {{padding :'10px'}}>
                                      <Label className = "fontstyle">{onChangeLanguage(locale,'Team',languageData)}</Label> 
                                        <Select  
                                        className = "react-select fontstyle"                         
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={team_data.filter(option =>option.value === team_upload)}
                                        options={team_data}
                                        onChange={({value}) => this.setState({  team_upload: value})}
                                      />
                                  </div>
                                  </Colxx>
                                  <Colxx xxs="12">
                                  <div style = {{padding :'10px'}}>
                                  <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                                    style = {{width : '100%'}}
                                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
                                       
                                  </div>
                                  </Colxx>
                                  <Colxx  xxs="12" className = "text-center">
                                    <Button color="primary" className = "button-width"
                                      className="mr-1 mb-2 button-width"
                                      id={`popover_0`}
                                      onClick={() => this.onSubmit()} >{onChangeLanguage(locale,'Submit',languageData)}</Button>
                                    <Button color="secondary" className = "button-width"
                                      className="mr-1 mb-2 button-width"
                                      onClick={() => this.closedate() }>{onChangeLanguage(locale,'Cancel',languageData)}</Button>
                                  </Colxx>
                                </Row>
                                </PopoverBody>
                              </Popover>
                          </span>
                          
                        {this.renderTemplate()}
                    </div>
                   

                </div>
             
             
              <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
           <div>
             {this.renderSearch()}
           </div>

            <div>
              <Table 
              dataSource={data} 
              columns={columns} 
              // rowSelection={rowSelection}
              pagination = {pagination}
              loading={this.state.loading}
              rowKey={record => record.id}
              rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
              onChange={this.handleTableChange}
              />
            </div>
			

        </>
        )
    }

    renderSearch()
    {
      const {start_time,end_time,user_id,team_data,team} = this.state
      const {locale,languageData} = this.props
      const current_date = moment(new Date()).format('YYYY-MM-DD')
      return(
        <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
            <div className = "row">
                    <div className = "col-lg-2-0 space-margin">
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Start Date',languageData)}</Label>
                          
                              <Input  className = "fontstyle text-background" type="date"
                                  data-date-format='mm/dd/yyyy'
                                  max={current_date}
                                value = {start_time}  
                                onChange= {(e)=>this.setState({start_time : e.target.value,end_time:''})} 
                              />
                      </div>
                      <div className = "col-lg-2-0 space-margin">
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'End Date',languageData)}</Label>
                          
                              <Input  className = "fontstyle text-background" type="date"
                                  data-date-format='mm/dd/yyyy'
                                  max={current_date}
                                  min={start_time}
                                value = {end_time}  
                                onChange= {(e)=>this.setState({end_time : e.target.value})} 
                              />
                      </div>
                      <div className = "col-lg-2-0 space-margin">
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'User ID',languageData)}</Label>
                          
                              <Input  className = "fontstyle text-background" type="text"
                                value = {user_id}  
                                onChange= {(e)=>this.setState({user_id : (e.target.value).toLocaleUpperCase()})} 
                              />
                      </div>
                      <div className = "col-lg-2-0 space-margin">
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Team',languageData)}</Label>
                          <Select  
                            className = "react-select fontstyle"                         
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={team_data.filter(option =>option.value === team)}
                            options={team_data}
                            onChange={({value}) => this.setState({  team: value})}
                          />
                             
                      </div>
                      <div className = "col-lg-2-0 space-margin" style= {{marginTop:'25px'}}>
                          <Button color = "primary"  className = 'fontstyle button-width' onClick ={(event) => this.onSearch()}>
                            {onChangeLanguage(locale,'Search',languageData)}
                          </Button>
                          <Button color = "secondary"  className = 'fontstyle button-width' onClick ={(event) => this.ClearValue()}>
                            {onChangeLanguage(locale,'Refresh',languageData)}
                          </Button>
                      </div>
            </div>
        </div>
      )
    }
 
}
const mapStateToProps = ({ settings }) => {
    const { locale,languageData,username} = settings;
    return {locale, languageData,username};
  };
  export default withRouter(
    connect(mapStateToProps, {

   })(MasterPage)
  );


