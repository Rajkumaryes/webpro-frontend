import React, { Component } from 'react';
import { Card, CardBody,Row ,Label} from 'reactstrap';
import { Colxx, Separator } from '../../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../../containers/navs/Breadcrumb';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Button} from 'reactstrap';
import { Checkbox} from 'antd';
import Loading from "react-fullscreen-loading";
import Workbook from 'react-excel-workbook'
import {getValue,onChangeLanguage} from '../../../../../helper'
import {userService} from '../../../../../redux/users/saga'
import{roleService} from '../../../../../redux/role/saga'
import{regionService} from '../../../../../redux/region/saga'
import{teamsService} from '../../../../../redux/teams/saga'
import{areaService} from '../../../../../redux/area/saga';
import { ProcessService } from '../../../../../redux/process/saga'
import { LocationService } from '../../../../../redux/location/saga'
import { levelService } from '../../../../../redux/level/saga'
import { departmentService } from '../../../../../redux/department/saga'
import { designationService } from '../../../../../redux/designation/saga'
import moment from 'moment';


class RegisterUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      user_id: 0,
      role_data:[],
      filename : '',
      loading:false,
      active_user:true,
      deactivate_user:false,
      subareadata:[],
      regiondata:[],
      areadata:[],
      designation_data: [],
      level_data: [],
      location_data: [],
      process_data: [],
      department_data: [],

    };
  }

  componentDidMount() {
    this.fetchuserData()
    this.fetchrole()
    this.fetcharea()
    this.fetchregion()
    this.fetchteam()
    this.fetch_process()
    this.fetch_designation()
    this.fetch_department()
    this.fetch_location()
    this.fetch_level()
  
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
 
  teamsService.fetchteams()
  .then((res) => {
     if(res.status)   { 
        let filterstatus = (res.data).filter(item => item.status === 1)
           var teamlist = filterstatus.map(function(cusmaidid) {
                return  {text : cusmaidid.name ,geocode:cusmaidid.country_code ,label : cusmaidid.name,value : cusmaidid.id};
             });  
              this.setState({
              subareadata:teamlist,
              })
           }
          
           })
           .catch((error) => { }); 
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
              })
           }
         
           })
           .catch((error) => { }); 
} 
fetcharea() {
  areaService.fetcharea()
  .then((res) => {
     if(res.status)   { 
        let filterstatus = (res.data).filter(item => item.status === 1)
           var regionlist = filterstatus.map(function(cusmaidid) {
                return  {label : cusmaidid.name ,value : cusmaidid.id};
             });  
              this.setState({
              areadata :  regionlist,
              })
           }
         
           })
           .catch((error) => { }); 
}  
fetchrole() {
  roleService.fetchroleData()
  .then((res) => {
     if(res.status)   { 
        let filterstatus = (res.data).filter(item => item.status === 1)
           var rolelist = filterstatus.map(function(cusmaidid) {
                return  {text : cusmaidid.name ,value : cusmaidid.id};
             });  
              this.setState({
              role_data :  rolelist,
              })
           }
         
           })
           .catch((error) => { }); 
}  
fetch_process() {
 
  ProcessService.fetchProcess()
    .then((res) => {
      
      if (res.status) {
        let filterstatus = (res.data).filter(item => item.status === 1)
        var regionlist = filterstatus.map(function (cusmaidid) {
          return { label: cusmaidid.name, value: cusmaidid.id.toString() };
        });
        this.setState({
          process_data: regionlist,
        })
      }
    })
    .catch((error) => {  });
}
fetch_designation() {
 
  designationService.fetchdesignation()
    .then((res) => {
      if (res.status) {
        
        let filterstatus = (res.data).filter(item => item.status === 1)
        var regionlist = filterstatus.map(function (cusmaidid) {
          return { label: cusmaidid.name, value: cusmaidid.id.toString() };
        });
        this.setState({
          designation_data: regionlist,
        })
      }
    })
    .catch((error) => {  });
}
fetch_department() {
 
  departmentService.fetchdepartment()
    .then((res) => {
      
      if (res.status) {
        let filterstatus = (res.data).filter(item => item.status === 1)
        var regionlist = filterstatus.map(function (cusmaidid) {
          return { label: cusmaidid.name, value: cusmaidid.id.toString() };
        });
        this.setState({
          department_data: regionlist,
        })
      }
    })
    .catch((error) => {  });
}
fetch_location() {
 
  LocationService.fetchLocation()
    .then((res) => {
      
      if (res.status) {
        let filterstatus = (res.data).filter(item => item.status === 1)
        var regionlist = filterstatus.map(function (cusmaidid) {
          return { label: cusmaidid.name, value: cusmaidid.id.toString() };
        });
        this.setState({
          location_data: regionlist,
        })
      }
    })
    .catch((error) => {  });
}
fetch_level() {
 
  levelService.fetchlevel()
    .then((res) => {
      if (res.status) {
        let filterstatus = (res.data).filter(item => item.status === 1)
        var regionlist = filterstatus.map(function (cusmaidid) {
          return { label: cusmaidid.name, value: cusmaidid.id.toString() };
        });
        this.setState({
          level_data: regionlist,
        })
      }
    })
    .catch((error) => {  });
}

  setUserStatus(value)
  {
    const {active_user,deactivate_user} = this.state
    if(value === 'Active Users')
    {
      this.setState({
        active_user: !active_user
      })
    }
    else
    {
      this.setState({
        deactivate_user: !deactivate_user
      })
    }
   
  }

  renderTemplate()
  {
    const {locale,languageData} = this.props
    const {role_data,data,active_user,deactivate_user, process_data,areadata,subareadata,
      department_data, designation_data, level_data, location_data,regiondata} = this.state
    var list = []
    if(active_user && deactivate_user)
    {
      list = [...data]
    }
    else if(active_user)
    {
      list = data.filter(item => parseInt(item.is_active) === 1)
    }
    else if(deactivate_user)
    {
      list = data.filter(item => parseInt(item.is_active) === 0)
    }
    var columnarray =  [ "First Name", "Last Name", "User ID", "Email", "Mobile", "Role Name","Region", "Area", 
    "Team", "Geo Code" , "Location","Code","Designation","Department","Level","DOJ","Process",
    "Team Leader","Manager Name","Director Name","Managing Director","Probation/Confirm" ];
    
    var array = list.map(record=> {
                        return {
                      'First Name' : record.name,
                      'Last Name' : record.lastname,
                      'User ID' : record.username,
                      'Email' : record.email,
                      'Mobile' : record.mobile_phone,
                      'Role Name':getValue(role_data,'value','text',parseInt(record.role_id)),
                      'Region' : getValue(regiondata,'value','text',parseInt(record.region)),
                      'Area' : getValue(areadata,'value','label',parseInt(record.area)),
                      'Team' : getValue(subareadata,'value','text',parseInt(record.subarea)),
                      'Geo Code' : getValue(subareadata,'value','geocode',parseInt(record.subarea)),
                      'Location' : getValue(location_data,'value','label',record.location),
                      'Code' : record.code,
                      'Designation' : getValue(designation_data,'value','label',record.designation),
                      'Department' : getValue(department_data,'value','label',record.department),
                      'Level' : getValue(level_data,'value','label',record.level),
                      'DOJ' : record.doj !== null  ? moment(record.doj).format('MM/DD/YYYY') : '',
                      'Process' : getValue(process_data,'value','label',record.process),
                      'Team Leader': record.teamleader !== null ? record.teamleader : '',
                      'Manager Name': record.manager !== null ? record.manager : '',
                      'Director Name': record.director !== null ? record.director : '',
                      'Managing Director': record.md !== null ? record.md : '',
                      'Probation/Confirm': record.probation === true ? 'TRUE' : 'FALSE',
                      
                    };
                     })
      return(
        <div className="row text-center">
        <Workbook filename="user.xlsx" element={
           <Button className = "button-width" color="secondary"  style={{width:'150px'}}
           >{ onChangeLanguage(locale,'Download User List',languageData)}  
           </Button>
           }>
          <Workbook.Sheet data={array} name="Sheet A">
          {columnarray && columnarray.map((value,index) => 
                <Workbook.Column label={value} value={value}/>
           )}
          </Workbook.Sheet> 
        </Workbook>
      </div>

      );
  }
  render()
  {
    const {match} = this.props
    const {loading,active_user,deactivate_user} = this.state
    return (
      <div>
        <title> {'User Export'}</title>
        <Row>
          <Colxx xxs="12"> 
               <Breadcrumb heading= {'User Export'}
                  match={match} />
              <Separator className="mb-5" />
            </Colxx> 
             
        </Row>
        {loading && 
				<div>
				
					<Loading loading={loading} background="rgb(0, 103, 127,0.3)" loaderColor="rgb(0,122,147)" />
				</div>
			} 
         <Card>
              <CardBody className="wizard wizard-default">
              <div className = "row" style = {{margin :'10px'}}> 
                   <div className = "col-md-6">
                       <Label className = "fontstyle space-margin">{'User Status'}</Label>	
                      <Row>
                        <Colxx xxs="4" className="mb-4">
                        <Checkbox value = "checkbox" checked = {active_user}
                                className = "fontstyle"
                                onChange={() => this.setUserStatus('Active Users')}>
                                {'Active Users'}</Checkbox>
                        </Colxx>
                        <Colxx xxs="5" className="mb-4">
                        <Checkbox value = "checkbox" checked = {deactivate_user}
                                className = "fontstyle"
                                onChange={() => this.setUserStatus('Deactivated Users')}>
                                {'Deactivated Users'}</Checkbox>
                        </Colxx>
                      </Row>
                   </div>
                   <div className = "col-md-2 text-center">
                   {this.renderTemplate()}
                    </div>
                </div>
            

              </CardBody>
          </Card>
         
       </div>
    );
  }
  
  

}

const mapStateToProps = ({ settings }) => {
  const { locale,languageData} = settings;
  return {locale, languageData};
};
export default injectIntl(
  connect(mapStateToProps, {

  })(RegisterUser)
);
