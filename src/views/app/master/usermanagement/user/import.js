import React, { Component } from 'react';
import { Card, CardBody,Row ,Label} from 'reactstrap';
import { Colxx, Separator } from '../../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../../containers/navs/Breadcrumb';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Button,Input} from 'reactstrap';
import Select from 'react-select';
// import {onChangeLanguage,getValue} from '../../../../../helper'
import  {EditableCell , EditableRow} from '../../../EditableCell'
import 'antd/dist/antd.css';
import { createNotification } from '../../../../../toast';
import { Table,Tooltip,Popconfirm, Checkbox,Radio} from 'antd';
import Loading from "react-fullscreen-loading";
import { Wizard, Steps, Step } from 'react-albus';
import TopNavigation from '../../../../../components/wizard/TopNavigation';
import Workbook from 'react-excel-workbook'
import { WithWizard } from 'react-albus';
import {userService} from '../../../../../redux/users/saga'
import moment from 'moment';
import {onChangeLanguage} from '../../../../../helper'
import{roleService} from '../../../../../redux/role/saga'
import{regionService} from '../../../../../redux/region/saga'
import{teamsService} from '../../../../../redux/teams/saga'
import{areaService} from '../../../../../redux/area/saga';
import { ProcessService } from '../../../../../redux/process/saga'
import { LocationService } from '../../../../../redux/location/saga'
import { levelService } from '../../../../../redux/level/saga'
import { TLService } from '../../../../../redux/tl/saga'
import { departmentService } from '../../../../../redux/department/saga'
import { designationService } from '../../../../../redux/designation/saga'
import { ManagerService } from '../../../../../redux/manager/saga'
import { MDService } from '../../../../../redux/md/saga'
import { directorService } from '../../../../../redux/director/saga'
import CustomRadioButton from '../../../../RadioButton'


class RegisterUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchedColumn: '',
      orginal_data: [],
      record : {},
      data: [],
      isEdit : false,
      user_id: 0,
      role_data:[],
      is_active:1,
      roledata:[],
      filename : '',
      loading:false,
      error_data:[],
      create_data:[],
      update_data:[],
      tabvalue:'create',
      upload_data:[],
      subareadata:[],
      subarea_data:[],
      regiondata:[],
      region_data:[],
      areadata:[],
      area_data:[],
      designation_data: [],
      designationdata:[],
      level_data: [],
      leveldata: [],
      location_data: [],
      locationdata: [],
      process_data: [],
      processdata: [],
      department_data: [],
      departmentdata: [],
      tl_data: [],
      tldata: [],
      manager_data: [],
      managerdata: [],
      director_data: [],
      directordata: [],
      MD_data: [],
      MDdata: [],
      show_table:false,
      is_submit_table:false,
    };
  }

  componentDidMount() {
    // this.fetchuserData()
    this.fetchrole()
    this.fetcharea()
    this.fetchregion()
    this.fetchteam()
    this.fetch_process()
    this.fetch_designation()
    this.fetch_department()
    this.fetch_location()
    this.fetch_level()
    this.fetch_tl()
    this.fetch_manager()
    this.fetch_director()
    this.fetch_MD()
   }
   fetchuserData() {  
    this.setState({
      loading : true
    })
    userService.fetchuserData()
      .then((res) => { 
        this.setState({   
		  loading : false 
		          
        }) 
        if(res.status)
          {
            this.setState({ 
              data:res.data  , 
                       
            }) 
          }            
	  
    })
    .catch((error) => { 
      this.setState({
        loading : false
      })
      });   
}
fetchteam() {
  this.setState({loading:true})
  teamsService.fetchteams()
  .then((res) => {
     if(res.status)   { 
        let filterstatus = (res.data).filter(item => item.status === 1)
           var teamlist = filterstatus.map(function(cusmaidid) {
                return  {text : cusmaidid.name ,geocode:cusmaidid.country_code ,label : cusmaidid.name+'-'+cusmaidid.country_code,value : cusmaidid.id.toString(),
                area:cusmaidid.area,region:cusmaidid.region};
             });  
              this.setState({
              subarea_data : filterstatus ,
              subareadata:teamlist,
              loading:false
              })
             
           }
           else{
           this.setState({loading:false})}
           })
           .catch((error) => { }); 
           this.setState({loading:false})
}     
fetchregion() {
  regionService.fetchregion()
  .then((res) => {
     if(res.status)   { 
        let filterstatus = (res.data).filter(item => item.status === 1)
           var regionlist = filterstatus.map(function(cusmaidid) {
                return  {text : cusmaidid.region ,value : cusmaidid.id};
             });  
              this.setState({
              regiondata :  regionlist,
              region_data:filterstatus
              })
           }
           else{
           this.setState({loading:false})}
           })
           .catch((error) => { }); 
} 
fetcharea() {
  areaService.fetcharea()
  .then((res) => {
     if(res.status)   { 
        let filterstatus = (res.data).filter(item => item.status === 1)
           var regionlist = filterstatus.map(function(cusmaidid) {
                return  {label : cusmaidid.name ,text : cusmaidid.name,value : cusmaidid.id.toString(),
                  region : cusmaidid.region};
             });  
              this.setState({
              areadata :  regionlist,
              area_data:filterstatus
              })
           }
           else{
           this.setState({loading:false})}
           })
           .catch((error) => { }); 
} 
fetchrole() {
  roleService.fetchroleData()
  .then((res) => {
     if(res.status)   { 
        let filterstatus = (res.data).filter(item => item.status === 1)
           var rolelist = filterstatus.map(function(cusmaidid) {
                return  {label : cusmaidid.name ,text : cusmaidid.name ,value : cusmaidid.id};
             });  
              this.setState({
              role_data :  rolelist,
              roledata: filterstatus
              })
            
           }
          
           else{
           this.setState({loading:false})}
           })
           .catch((error) => { }); 
} 
fetch_process() {
  this.setState({ loading: true })
  ProcessService.fetchProcess()
    .then((res) => {
      this.setState({ loading: false })
      if (res.status) {
        let filterstatus = (res.data).filter(item => item.status === 1)
        var regionlist = filterstatus.map(function (cusmaidid) {
          return { label: cusmaidid.name, value: cusmaidid.id.toString() };
        });
        this.setState({
          process_data: regionlist,
          processdata: filterstatus,
        })
      }
    })
    .catch((error) => { this.setState({ loading: false }) });
}
fetch_designation() {
  this.setState({ loading: true })
  designationService.fetchdesignation()
    .then((res) => {
      if (res.status) {
        this.setState({ loading: false })
        let filterstatus = (res.data).filter(item => item.status === 1)
        var regionlist = filterstatus.map(function (cusmaidid) {
          return { label: cusmaidid.name, value: cusmaidid.id.toString() };
        });
        this.setState({
          designation_data: regionlist,
          designationdata: filterstatus,
        })
      }
    })
    .catch((error) => { this.setState({ loading: false }) });
}
fetch_department() {
  this.setState({ loading: true })
  departmentService.fetchdepartment()
    .then((res) => {
      this.setState({ loading: false })
      if (res.status) {
        let filterstatus = (res.data).filter(item => item.status === 1)
        var regionlist = filterstatus.map(function (cusmaidid) {
          return { label: cusmaidid.name, value: cusmaidid.id.toString() };
        });
        this.setState({
          department_data: regionlist,
          departmentdata: filterstatus,
        })
      }
    })
    .catch((error) => { this.setState({ loading: false }) });
}
fetch_location() {
  this.setState({ loading: true })
  LocationService.fetchLocation()
    .then((res) => {
      this.setState({ loading: false })
      if (res.status) {
        let filterstatus = (res.data).filter(item => item.status === 1)
        var regionlist = filterstatus.map(function (cusmaidid) {
          return { label: cusmaidid.name, value: cusmaidid.id.toString() };
        });
        this.setState({
          location_data: regionlist,
          locationdata: filterstatus,
        })
      }
    })
    .catch((error) => { this.setState({ loading: false }) });
}
fetch_level() {
  this.setState({ loading: true })
  levelService.fetchlevel()
    .then((res) => {
      this.setState({ loading: false })
      if (res.status) {
        let filterstatus = (res.data).filter(item => item.status === 1)
        var regionlist = filterstatus.map(function (cusmaidid) {
          return { label: cusmaidid.name, value: cusmaidid.id.toString() };
        });
        this.setState({
          level_data: regionlist,
          leveldata: filterstatus,
        })
      }
    })
    .catch((error) => { this.setState({ loading: false }) });
}
fetch_tl() {
  TLService.fetchtl()
    .then((res) => {
      if (res.status) {
        let filterstatus = (res.data).filter(item => item.status === 1)
        var regionlist = filterstatus.map(function (cusmaidid) {
          return { label: cusmaidid.name, value: cusmaidid.name };
        });
        this.setState({
          tl_data: regionlist,
          tldata: filterstatus,
        })
      }
    })
    .catch((error) => { this.setState({ loading: false }) });
}
fetch_manager() {
  ManagerService.fetchManager()
    .then((res) => {
      if (res.status) {
        let filterstatus = (res.data).filter(item => item.status === 1)
        var regionlist = filterstatus.map(function (cusmaidid) {
          return { label: cusmaidid.name, value: cusmaidid.name };
        });
        this.setState({
          manager_data: regionlist,
          managerdata: filterstatus,
        })
      }
    })
    .catch((error) => { this.setState({ loading: false }) });
}
fetch_director() {
  directorService.fetchDirector()
    .then((res) => {
      if (res.status) {
        let filterstatus = (res.data).filter(item => item.status === 1)
        var regionlist = filterstatus.map(function (cusmaidid) {
          return { label: cusmaidid.name, value: cusmaidid.name };
        });
        this.setState({
          director_data: regionlist,
          directordata: filterstatus,
        })
      }
    })
    .catch((error) => { this.setState({ loading: false }) });
}
fetch_MD() {
  MDService.fetchMD()
    .then((res) => {
      if (res.status) {
        let filterstatus = (res.data).filter(item => item.status === 1)
        var regionlist = filterstatus.map(function (cusmaidid) {
          return { label: cusmaidid.name, value: cusmaidid.name };
        });
        this.setState({
          MD_data: regionlist,
          MDdata: filterstatus,
        })
      }
    })
    .catch((error) => { this.setState({ loading: false }) });
}
   oncreate = () => {
    const {name,username,role_id,email,mobile_phone,is_active} = this.state;
    const {category} =this.props;
    let newaggrte = {
    ...this.state,
    id: new Date().getTime()
   }   
    userService.createuser(name,username,role_id,email,mobile_phone,is_active )
    .then((data) => {
      if(data.status)  {          
        createNotification('Created','success','filled')
        this.setState({                   
          name:'',
          username:'',email:'',
          mobile_phone:'',
          loading : false,
          tablename:''
      })
     }
     else
     {
      createNotification.error(data.message);
     }
     this.fetchuserData()
     })
  
  }
  onSubmit = (goToNext) => {
    const {create_data,update_data,error_data} = this.state
    var update = []
    for(var i = 0 ;i <create_data.length;i++)
    {
      var value = this.deleteValue(create_data[i]) 
      update.push(value)
    }
    for(var i = 0 ;i <update_data.length;i++)
    {
      var value = this.deleteValue(update_data[i]) 
      update.push(value)
    }
    for(var i = 0 ;i <error_data.length;i++)
    {
      var value = this.deleteValue(error_data[i]) 
      update.push(value)
    }
    var list = [],isfill = true
    for(var i = 0 ; i<update.length;i++)
    {
        var record = Object.assign({}, update[i]);
        list.push(update)
    }
    if(record.doj  !== "" && record.doj  !== null)
    {
      let re = /^\d{1,2}\/\d{1,2}\/\d{4}?$/ ;
      let do_j =(record.doj).match(re)
      if(do_j === null )
      {
        isfill = false
      }
    }
    if( isfill === true){
    userService.uploaddata(update)
     .then((res) => {
          if(res)
          {
            
            if(res.errordata.length  === 0)
            {
              createNotification('Uploaded','success','filled')
              this.setState({
                show_table:false
              })
              goToNext()
              setTimeout(
                function() {
                  this.props.history.push('/app/generalmaster/usermanagement/user')
                }
                .bind(this),
                500
              );

            }
            else
            {
              if(res.createdata)
              {
                this.setState({
                  create_data : this.getJsonvalue(res.updatedata),
                  
                })
              }
              if(res.errordata)
              {
                this.setState({
                  error_data :this.getJsonvalue(res.errordata),
                  upload_data:this.getJsonvalue(res.errordata),
                  tabvalue : 'error'
                })

              }
              if(res.updatedata)
              {
                this.setState({
                  update_data :res.updatedata

                })
              }
              
              createNotification('Error data validation pending.\n Already Exists','error','filled')
              
            }
           
            // this.fetchdata()
            this.setState({
              loading:false,
              
            }) 
          }
        }).catch(error => {
            this.setState({
              loading:false
            }) 
            if(error.graphQLErrors)
            {
              if(error.graphQLErrors.length > 0)
              {
                  if(error.graphQLErrors[0].message)
                  {
                    createNotification('Invalid Data uploaded','error','filled')
                    
                  }
              }
            }
        });
     
      }else{
        createNotification('Please fill mandatory field and fill the DOJ is (MM/DD/YYYY) this format','error','filled')
      }
   
  };

  deleteValue(array)
  {
    var value = {...array}
    value.name = value.name !== '-' ?  value.name : ''
    value.lastname = value.lastname !== '-' ?  value.lastname : ''
    value.email =  value.email !== '-' ?  value.email : ''
    value.mobile_phone =  value.mobile_phone !== '-' ?  value.mobile_phone : ''
    value.username = value.username !== '-' ?  value.username : ''
    value.geocode =  value.geocode !== '-' ?  value.subarea: ''
    delete value.__typename

    return value
  }
  handlechangerow(access,id,key)
  {
   
    const {tabvalue} = this.state
    var value = [...this.state.upload_data]
    const index = value.findIndex(item => id === item.id);
    value[index][key] = access
    if(key === 'region')
    {
      // value[index].region = parseInt(access)
      value[index].region = access
      value[index].area = ''
    }
    if(key === 'area')
    {
      value[index].subarea = ''
    }
    if(key === 'role_id')
    {
      value[index].role_id = parseInt(access)
    }
   
    this.setState({
      upload_data:value
    })
    if(tabvalue === 'create')
    {
      this.setState({create_data :value})
    }
    else if(tabvalue === 'update')
    {
      this.setState({update_data :value})
    }
    else if(tabvalue === 'error')
    {
      this.setState({error_data :value})
    }
  }
 
  handleSave = (row) => 
	{
    const {tabvalue} = this.state
    const newData = [...this.state.upload_data];
    const index = newData.findIndex(item => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
    ...item,
    ...row,
    });
    if(tabvalue === 'create')
    {
      this.setState({create_data :newData})
    }
    else if(tabvalue === 'update')
    {
      this.setState({update_data :newData})
    }
    else if(tabvalue === 'error')
    {
      this.setState({error_data :newData})
    }

    this.setState({ upload_data: newData });
  };
  
  handleDelete(id)
  {
    const {tabvalue} = this.state
    var value = this.state.upload_data.filter(item => item.id !== id)
    this.setState({
      upload_data:value
    })
    if(tabvalue === 'create')
    {
      this.setState({create_data :value})
    }
    else if(tabvalue === 'update')
    {
      this.setState({update_data :value})
    }
    else if(tabvalue === 'error')
    {
      this.setState({error_data :value})
    }

  };
  upload(files) 
  { 
    const file = files[0]
    this.setState({
      filename : file.name,
      loading:true,
      show_table:false
      })
    if (file != null)
      {
        let user_id = localStorage.getItem('user_id'); 
        userService.fileUpload(file,user_id)
        .then(res => {
          if(res.status)
          {
          if(res.data.status)
            {
              
              createNotification('Excel uploaded','success','filled')  
              this.fetchuserData()
              this.setState({
                loading:false,
                show_table:true
              })
              
              if(res.data.createdata)
              {
                this.setState({
                  create_data : this.getJsonvalue(res.data.createdata),
                  // create_data : res.data.createdata,
                  // upload_data : this.getJsonvaluecr(res.data.createdata),
                  upload_data:res.data.createdata
                }) 
              }
              if(res.data.errordata)
              {
                this.setState({
                  error_data :this.getJsonvalue(res.data.errordata)
                  // error_data :res.errordata
                })
                
              }
              if(res.data.updatedata)
              {
                this.setState({
                  update_data :this.getJsonvalue(res.data.updatedata)
                })
                
              }
             
              
                  }
                  else
                  {
                    createNotification(res.data.message,'error','filled')
                    this.setState({ 
                      loading : false
                               
                    }) 
                  }  
                }
                 })
                 .catch()
             }
             else
             {
              createNotification('Please choose file','error','filled')
            }
   }
  
 
  getJsonvalue(datass)
  {
    var list = [...datass],data = []
    for(var i = 0 ; i <list.length;i++)
    {
      var record = list[i]
      record.id = i
      record.doj = (record.doj !== null && record.doj !=='')  ? moment(record.doj).format('MM/DD/YYYY') : ''
      data.push(record)
    }
    return data
  }

  setTabvlaue(tabname)
  {
    
    const {create_data,update_data,error_data} = this.state
    this.setState({
      tabvalue : tabname
    })
    if(tabname === 'create')
    {
      this.setState({upload_data :create_data})
    }
    else if(tabname === 'update')
    {
      this.setState({upload_data :update_data})
    }
    else if(tabname === 'error')
    {
      this.setState({upload_data :error_data})
    }

  }
  
  renderTemplate1()
  {
   
    var columnarray =  [ "First Name", "Last Name", "User ID", "Email", "Mobile", "Role Name","Region", "Area", 
    "Team", "Geo Code" , "Location","Code","Designation","Department","Level","DOJ","Process",
    "Team Leader","Manager Name","Director Name","Managing Director","Probation/Confirm"];
      return(
        <div className="row text-center">
        <Workbook filename="user.xlsx" element={<Button color="secondary" outline>
          {'Download Template'}
          </Button>}>
          <Workbook.Sheet data={[]} name="Sheet A">
          {columnarray && columnarray.map((value,index) => 
                <Workbook.Column label={value} value={value}/>
           )}
          </Workbook.Sheet> 
        </Workbook>
      </div>

      );
  }
getAreaValue(array,region)
{
  var list = []
  if(array && array !== null && region !== '' && region !== null )
  {
    
    list = array.filter(item => item.region === region)
  }
  return list
}
getteamValue(array,region,area)
{
  var list = []
  if(array && array !== null && region !== '' && region !== null && area!== '' && area!== null)
  {
    
    list = array.filter(item => item.area === area)
  } 
  return list
}
  render()
  {
    const {match,locale,languageData} = this.props
    const {regiondata,areadata,subareadata,role_data,department_data, designation_data, level_data, location_data, tl_data, manager_data, MD_data, director_data,
      process_data,departmentdata, designationdata, leveldata, locationdata, tldata, managerdata, MDdata, directordata,
      processdata,loading,upload_data,tabvalue,is_submit_table} = this.state
    const columns = [
    	{
        title: 'First Name',
        dataIndex: 'name',
        key: 'name',
        // ...this.getColumnSearchProps('name'),
        render: (text, record) => ( 
          <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'100px'}}>
            <Input
            className = {text === ""    ?  "fontstyle error-border" :"fontstyle"  }
            
              value={text} 
              onChange={(e) =>this.handlechangerow(e.target.value,record.id,'name')}
              />
          </div>),
       
        },
        {
          title: 'Last Name',
          dataIndex: 'lastname',
          key: 'lastname',
          render: (text, record) => ( 
            <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'100px'}}>
              <Input
                className = {"fontstyle" }
                value={text} 
                onChange={(e) =>this.handlechangerow(e.target.value,record.id,'lastname')}
                />
            </div>),
          },
          {
            title: onChangeLanguage(locale, 'Emp. Code', languageData),
            dataIndex: 'code',
            key: 'code',
            render: (text, record) => ( 
              <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'100px'}}>
                <Input
                  className = {text === ""   ?  "fontstyle error-border" :"fontstyle" }
                  value={text} 
                  onChange={(e) =>this.handlechangerow(e.target.value,record.id,'code')}
                  />
              </div>),
          },
        {
        title: 'User ID',
        dataIndex: 'username',
        key: 'username',
        },
        {
          title:'Email',
          dataIndex: 'email',
          key: 'email',
          render: (text, record) => ( 
            <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'100px'}}>
              <Input
                className = { text === ""  ?  "fontstyle error-border" :"fontstyle" }
                value={text} 
                onChange={(e) =>this.handlechangerow(e.target.value,record.id,'email')}
                />
            </div>),
          
        },
        {
          title: 'Mobile' ,
          dataIndex: 'mobile_phone',
          key: 'mobile_phone',
          render: (text, record) => ( 
            <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'100px'}}>
              <Input
                className = { "fontstyle" }
                value={text} 
                type='number'
                onChange={(e) =>this.handlechangerow(e.target.value,record.id,'mobile_phone')}
                />
            </div>),
          
        },
        {
          title: 'DOJ' ,
          dataIndex: 'doj',
          key: 'doj',
          render: (text, record) => ( 
            <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'100px'}}>
              <Input
                placeholder = "MM/DD/YYYY"
                className = { text === ""    ?  "fontstyle error-border" :"fontstyle" }
                value={text} 
                onChange={(e) =>this.handlechangerow(e.target.value,record.id,'doj')}
                />
            </div>),
          
        },
        {
          title:'Role Name',
          dataIndex: 'role_id',
          key: 'role_id',
          render: (role_id, record,text,index) => (  
            <span className="table-operation">                
            <select className={ role_id === ""  ?  "form-control error-border" :'form-control' }
            onChange={(e) => this.handlechangerow(e.target.value , record.id,'role_id')}
               value= {role_id} style={{width:'136px'}} >
                    <option value="Select">Select Role</option>
                  {this.state.roledata && this.state.roledata.map((value,index) =>
                  <option value={value.id}>{ value.name ? value.name :
                  ('selectrole')}</option>)}
                  </select>  
                  </span> 
              ),  
        },
        {
          title: onChangeLanguage(locale, 'Location', languageData),
          dataIndex: 'location',
          key: 'location',
          render: (text, record) => (
            <span className="table-operation">                
            <select className= {text === ""   ?  "form-control error-border" :'form-control'}
            onChange={(e) => this.handlechangerow(e.target.value , record.id,'location')}
               value= {text} style={{width:'136px'}} >
                    <option value="Select">Select location</option>
                  {locationdata && locationdata.map((value,index) =>
                  <option value={value.id}>{ value.name ? value.name :
                  ('Select location')}</option>)}
                  </select>  
                  </span> 
              ),   
        },
        {
          title: onChangeLanguage(locale, 'Designation', languageData),
          dataIndex: 'designation',
          key: 'designation',
            render: (text, record) => (
              <span className="table-operation">                
              <select className={ text === ""   ?  "form-control error-border" :'form-control' }
              onChange={(e) => this.handlechangerow(e.target.value , record.id,'designation')}
                 value= {text} style={{width:'136px'}} >
                      <option value="Select">Select Designation</option>
                    {designationdata && designationdata.map((value,index) =>
                    <option value={value.id}>{ value.name ? value.name :
                    ('selectrole')}</option>)}
                    </select>  
                    </span> 
                ),
            
        },
        {
          title: onChangeLanguage(locale, 'Level', languageData),
          dataIndex: 'level',
          key: 'level',
          render: (text, record) => (
            <span className="table-operation">                
              <select 
              className={ text === ""   ?  "form-control error-border" :'form-control' } 
              onChange={(e) => this.handlechangerow(e.target.value , record.id,'level')}
                 value= {text} style={{width:'136px'}} >
                      <option value="Select">Select Level</option>
                    {leveldata && leveldata.map((value,index) =>
                    <option value={value.id}>{ value.name ? value.name :
                    ('Select Level')}</option>)}
                    </select>  
                    </span> 
                ),
        },
        {
          title: onChangeLanguage(locale, 'Department', languageData),
          dataIndex: 'department',
          key: 'department',
          render: (text, record) => (
            <span className="table-operation">                
              <select 
              className={ text === ""    ?  "form-control error-border" :'form-control' }
              onChange={(e) => this.handlechangerow(e.target.value , record.id,'department')}
                 value= {text} style={{width:'136px'}} >
                      <option value="Select">Select Department</option>
                    {departmentdata && departmentdata.map((value,index) =>
                    <option value={value.id}>{ value.name ? value.name :
                    ('selectrole')}</option>)}
                    </select>  
                    </span> 
                ),
        },
        {
          title: onChangeLanguage(locale, 'Process', languageData),
          dataIndex: 'process',
          key: 'process',
          render: (text, record) => (
            <span className="table-operation">            
            <select 
            className={ text === ""   ?  "form-control error-border" :'form-control' } 
            onChange={(e) => this.handlechangerow(e.target.value , record.id,'process')}
               value= {text} style={{width:'136px'}} >
                    <option value="Select">Select Process</option>
                  {processdata && processdata.map((value,index) =>
                  <option value={value.id}>{ value.name ? value.name :
                  ('Select Process')}</option>)}
                  </select>  
                  </span> 
              ),
        },
        {
          title:  onChangeLanguage(locale,'Region',languageData)  ,
          dataIndex: 'region',
          key: 'region',
          render: (region, record,text,index) => (        
            <span className="table-operation">                    
            <select 
              className={ region === "" ?  "form-control error-border" :'form-control' }
                    onChange={(e) => this.handlechangerow(e.target.value , record.id,'region')}
                    value= {region} style={{width:'136px'}} >
                    <option value="Select">Select Region</option>
                  {this.state.region_data && this.state.region_data.map((value,index) =>
                  <option value={value.id}>{ value.region ? value.region :
                  ('Select Region')}</option>)}
                  </select>                  
                  </span>), 
        },
        {
          title:  onChangeLanguage(locale,'Area',languageData)  ,
          dataIndex: 'area',
          key: 'area',
          render: (text,record,index) => ( 
            <div  style = {{padding:'2px',width:'100px'}}>
               <Select  className= {text === ''?  "error-border-select":"react-select fontstyle"}
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={areadata.filter(option =>option.value === text)}
                        options={this.getAreaValue(areadata,record.region)}
                        onChange={({value}) =>this.handlechangerow(value,record.id,'area',record.region,)} />      
            </div> ),
         
        },
        {
          title:  onChangeLanguage(locale,'Team',languageData)  ,
          dataIndex: 'subarea',
          key: 'subarea',
          render: (text,record,index) => ( 
            <div  style = {{padding:'2px',width:'100px'}}>
               <Select  className= {text === ''?  "error-border-select":"react-select fontstyle"}
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={subareadata.filter(option =>option.value === text)}
                        options={this.getteamValue(subareadata,record.region,record.area)}
                        onChange={({value}) =>this.handlechangerow(value,record.id,'subarea',record.subarea,)} />      
            </div> ),
        
        },
        {
          title: onChangeLanguage(locale, 'Team Leader', languageData),
          dataIndex: 'teamleader',
          key: 'teamleader',
          render: (text, record,index) => (        
            <span className="table-operation">                    
            <select className={'form-control' }
                    onChange={(e) => this.handlechangerow(e.target.value , record.id,'teamleader')}
                    value= {text} style={{width:'136px'}} >
                    <option value="Select">Select Team Leader</option>
                  {tldata && tldata.map((value,index) =>
                  <option value={value.name}>{ value.name ? value.name :
                  ('Select Team Leader')}</option>)}
                  </select>                  
                  </span>),
        },
        {
          title: onChangeLanguage(locale, 'Manager', languageData),
          dataIndex: 'manager',
          key: 'manager',
          render: (text, record,index) => (        
            <span className="table-operation">                    
            <select className={'form-control' }
                    onChange={(e) => this.handlechangerow(e.target.value , record.id,'manager')}
                    value= {text} style={{width:'136px'}} >
                    <option value="Select">Select Manager</option>
                  {managerdata && managerdata.map((value,index) =>
                  <option value={value.name}>{ value.name ? value.name :
                  ('Select Manager')}</option>)}
                  </select>                  
                  </span>),
        },
        {
          title: onChangeLanguage(locale, 'Director', languageData),
          dataIndex: 'director',
          key: 'director',
          render: (text, record,index) => (        
            <span className="table-operation">                    
            <select className={ 'form-control' }
                    onChange={(e) => this.handlechangerow(e.target.value , record.id,'director')}
                    value= {text} style={{width:'136px'}} >
                    <option value="Select">Select Director</option>
                  {directordata && directordata.map((value,index) =>
                  <option value={value.name}>{ value.name ? value.name :
                  ('Select Director')}</option>)}
                  </select>                  
                  </span>),
        },
        {
          title: onChangeLanguage(locale, 'Managing Director', languageData),
          dataIndex: 'md',
          key: 'md',
          render: (text, record,index) => (        
            <span className="table-operation">                    
            <select className={'form-control' }
                    onChange={(e) => this.handlechangerow(e.target.value , record.id,'md')}
                    value= {text} style={{width:'136px'}} >
                    <option value="Select">Select Managing Director</option>
                  {MDdata &&MDdata.map((value,index) =>
                  <option value={value.name}>{ value.name ? value.name :
                  ('Select Managing Director')}</option>)}
                  </select>                  
                  </span>),
        },
        {
          title:'Probation/Confirm',
          key: 'probation',
          dataIndex: 'probation',
          render: (text, record) => (
              <div className="row d-flex justify-content-center" style = {{width:'75px',margin:'2px'}}>
                <Row>
                     <Colxx xxs="12">
                         <CustomRadioButton checked = {false} name = "Probation" value = {text} 
                             onChangeRadio={()=>this.handlechangerow(false,record.id,'probation')}/>
                         
                     </Colxx>
                     <Colxx xxs="12">
                       <CustomRadioButton checked = {true} name = "Confirm" value = {text}
                             onChangeRadio={()=>this.handlechangerow(true,record.id,'probation')}/>
                         
                     </Colxx>
                 </Row>
              </div>
          )
        },
        {
          title:'Action',
          key: 'id',
          dataIndex: 'id',
          render: (id, record) => (
            record.key !== "en" &&
              <div className="row d-flex justify-content-center" style = {{width:'50px'}}>
                <Popconfirm className = 'fontstyle' variant="contained" 
                title="Are you sure to delete?"
                style = {{
                  backgroundColor: 'rgb(79, 156, 1)',
                  color: 'white' }}
                  onConfirm={() => this.handleDelete(record.id)}
                  >
                  <Tooltip title="Delete" placement="bottom">
                <a style = {{color  :'red', marginLeft :'10px'}}><i className = "simple-icon-trash"></i></a></Tooltip>
                  </Popconfirm>
            
                  </div>
          )
        },
     
    ];
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
      };
      const columns1 = columns.map((col) => {
      if (!col.editable) {
        return col;
      }
    
      return {
        ...col,
        onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: this.handleSave,
        }),
      };
      });
      const array_data = upload_data.map(record=> {
            return {
          'id' : record.id,
          'name' : (record.name !== null && record.name !== "") ?  record.name : '',
          'lastname' : (record.lastname !== null && record.lastname !== "") ?  record.lastname : '',
          'username' : (record.username !== null && record.username !== "") ?  record.username : '',
          'email' : (record.email !== null && record.email !== "") ?  record.email : '',
          'mobile_phone' : (record.mobile_phone !== null && record.mobile_phone !== "")  ?  record.mobile_phone : '',
          'role_id' : record.role_id !== null ? record.role_id :'',
          'region' : record.region !== null ? record.region :'',
          'area' : record.area !== null ? record.area :'',
          'subarea' : record.subarea !== null ? record.subarea :'',
          'geocode':'0',
          'location':record.location !== null ? record.location :'',
          'code':record.code !== null ? record.code :'',
          'designation':record.designation !== null ? record.designation :'',
          'department':record.department !== null ? record.department :'',
          'level':record.level !== null ? record.level :'',
          'process':record.process !== null ? record.process :'',
          'teamleader':record.teamleader !== null ? record.teamleader :'',
          'manager':record.manager !== null ? record.manager :'',
          'director':record.director !== null ? record.director :'',
          'md':record.md !== null ? record.md :'',
          'doj':record.doj !== null ? record.doj :'',
          'is_active' : record.is_active !== null ? record.is_active :'',
          'flag':record.flag !== null ? record.flag :'',
          'probation':record.probation !== null ? record.probation : false,
                                  };
                             })
    return (
      <div>
        <title> {'User Import'}</title>
        <Row>
          <Colxx xxs="12"> 
               
                   <Row>
                      <Colxx xxs="10"> 
                      <Breadcrumb heading= {'User Import'}
                              match={match} />
                      </Colxx>
                      <Colxx xxs="2">
                        {this.renderTemplate1()}
                      </Colxx>
                      
                    </Row>
                 
              <Separator className="mb-5" />
            </Colxx> 
             
        </Row>
        {loading && 
				<div>
				
					<Loading loading={true} background="rgb(0, 103, 127,0.3)" loaderColor="rgb(0,122,147)" />
				</div>
			} 

          <Card>
          <CardBody className="wizard wizard-default">
            <Wizard>
              <TopNavigation
                className="justify-content-between"
                disableNav={true}
                topNavClick={this.topNavClick}
              />
              <Steps>
             <Step
                  id="step1"
                  name={'Step 1'}
                  desc={'User Import'}>
                  <div className="wizard-basic-step">
                  {/* <div className = "fontstyle" style = {{padding:'10px'}}><a style = {{color :'red'}}>*</a>
                    {'Please note that the User name and Employee ID are unique fields and they cannot be changed for any user.'}
                    </div> */}
                    <Row>
                       <Colxx xxs="4">
                                <Button color="secondary"
                                  // onClick = {()=>this.upload()} 
                                  style= {{margin :'0px 2px',width :'100%'}}>
                                        <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
                                        <a style= {{margin :'0px'}} > {'Upload'}</a>
                                        <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                                            className = "filepicker_customButton"
                                            style = {{width : '100%',marginLeft :'-56%'}}
                                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                              onChange={({target: { files }}) => this.upload(files)}
                                              />
                                       </Button>		          
                </Colxx>
                    </Row>
                 </div>
                </Step>
                <Step
                  id="step2"
                  name={'Step 2'}
                  desc={'Upload Data'}>
                  <div className="wizard-basic-step text-center" >
                      <Row> 
                        <Colxx xxs="12" className="mb-4" >
                            <div className = "row" style = {{margin:'10px'}}>
                              <div className = "col-md-4 text-center" style = {{borderBottom:tabvalue === 'create' ? '1px solid red' : '',cursor:'pointer'}}
                              onClick = {()=>this.setTabvlaue('create')}>
                                <a className = "fontstyle">{'Create Data'}</a>
                              </div>
                              <div className = "col-md-4 text-center" style = {{borderBottom:tabvalue === 'update' ? '1px solid red' : '',cursor:'pointer'}}
                              onClick = {()=>this.setTabvlaue('update')}>
                                <a className = "fontstyle">{'Update Data'}</a>
                              </div>
                              <div className = "col-md-4 text-center" style = {{borderBottom:tabvalue === 'error' ? '1px solid red' : '',cursor:'pointer'}}
                              onClick = {()=>this.setTabvlaue('error')}>
                                <a className = "fontstyle">{'Error Data'}</a>
                              </div>
                             
                            </div>
                        </Colxx>

                        <Colxx xxs="12" className="mb-4">
                        <div style = {{padding :'10px',width:'calc(100vw - 20vw)',overflowY:'auto'}}>
                            <Table 
                            rowClassName={(record, index) =>  record.flag === 1 ? 'selected-table-color' :( index % 2 === 0 ? 'table-row-light' :  'table-row-dark')}
                            // rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                            dataSource={array_data} 
                            components={components}
                            columns={columns1}
                              />
                        </div>    
                        </Colxx>
                      </Row>


                  </div>
                </Step>
              
                <Step
                  id="step3"
                  name={'Step 3'}
                  desc={'Success'}>
                  <div className="wizard-basic-step text-center">
                        <h1 style = {{color : 'rgb(0, 103, 127)'}}>
                        {'UPLOADED SUCCESSFULLY'}</h1>
                  </div>
                </Step>
              
            </Steps>
           
                <WithWizard
                render={({ next, previous, step, steps }) => 
                (
                  step.id !== 'step3' &&
                  <div className={`wizard-buttons justify-content-end`}>
                    <Button
                      color="primary"
                      className={`mr-1 ${steps.indexOf(step) <= 0 ? 'disabled' : ''}`}
                      onClick={() => {
                        this.onClickPrev(previous, steps, step);
                      }}
                    >
                      {'Prev'}
                    </Button>
                          <Button
                          color="primary"
                          className={
                            steps.indexOf(step) >= steps.length - 1 ? 'disabled' : ''
                          }
                          onClick={() => {
                            this.onClickNext(next, steps, step);
                          }}
                        >
                          {step.id === "step2" ? 'Submit' : 'Next'}
                        </Button>
                    
                  </div>
                )}
              />
              
            
            </Wizard>
          </CardBody>
        </Card>
        
       </div>
    );
  }
   topNavClick = (stepItem, push) => {
    push(stepItem.id);
  };

   onClickNext = (goToNext, steps, step) => {
     const {show_table} = this.state
      if(show_table)
     {
        step.isDone = true;
        if (steps.length - 1 <= steps.indexOf(step)) {
          return;
        }
        else if(step.id === 'step2')
        {
          this.onSubmit(goToNext)
        }
        else
        {
          goToNext();
        }
       
     }
     else
     {
      createNotification('Please upload a valid excel sheet.','error','filled')
     }
     this.setTabvlaue('create')
  };

   onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
    this.setTabvlaue('create')
  };
  

  

}

const mapStateToProps = ({ settings }) => {
  const { locale,languageData} = settings;
  return {locale, languageData};
};
export default injectIntl(
  connect(mapStateToProps, {

  })(RegisterUser)
);
