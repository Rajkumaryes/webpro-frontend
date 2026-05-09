import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Input,Button} from 'reactstrap';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage} from '../../../../../helper'
import{teamService} from '../../../../../redux/Export/masters/exportteam/saga'
import Loading from "react-fullscreen-loading";
import Select from 'react-select';
import{regionexportService} from '../../../../../redux/Export/masters/exportregion/saga'
import{teamsService} from '../../../../../redux/teams/saga'


class RegisterUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id:0,
      team_name:'',
      region_id:'',
      area_id:'',
      country_code:'',
      status : 1,
      region_data:[],
      area_data:[],
      team_data:[],
      isEdit:false,
      loading:false
    };
  }

  componentDidMount() {
    const {isEdit,record} = this.props
    if(isEdit == true)
    {
      this.setState({
        id:record.id,
        team_name:record.team_name,
        region_id:record.region_id,
        area_id:record.area_id,
        country_code:record.country_code,
        status: record.status,
        isEdit:true
      })
      this.fetchregionwise(record.region_id)
    } 
    this.fetchregion();  
    this.fetchteam()
    
  }
  fetchteam() {
    teamsService.fetchteams()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.name};
               });  
                this.setState({
                  team_data :  this.removeduplicatecolumns(regionlist),
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
  }  
  removeduplicatecolumns(list){
    const output = [...new Map(list.map(o => [o.value, o])).values()] 
    return output
  }
  fetchregion() {
    regionexportService.fetchregion()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.region_code ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                region_data :  regionlist,
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
 } 
 fetchregionwise(region) {
  this.setState({loading:true})
  teamService.regionwisefilter(region)
  .then((res) => {
  if(res.status)   { 
    let filterstatus = (res.data).filter(item => item.status === 1)
       var arealist = filterstatus.map(function(cusmaidid) {
            return  {label : cusmaidid.area_name ,value : cusmaidid.id.toString()};
         });  
          this.setState({
          area_data :  arealist,
          })
       }
       else{
       this.setState({loading:false})}
       })
       .catch((error) => { });  
       this.setState({loading:false})
} 
handlechangeregion = (selectedOptions) => {
  this.setState({region_id : selectedOptions.value})
  teamService.regionwisefilter(selectedOptions.value.toString())
  .then((res) => {
  if(res.status)   { 
    let filterstatus = (res.data).filter(item => item.status === 1)
       var arealist = filterstatus.map(function(cusmaidid) {
            return  {label : cusmaidid.area_name ,value : cusmaidid.id.toString()};
         });  
          this.setState({
          area_data :  arealist,
          })
       }
       else{
       this.setState({loading:false})}
       })
       .catch((error) => { });  
} 
onSubmit() { 
  const {id,team_name,region_id,area_id,country_code,status,isEdit} = this.state;

  if(team_name !=='' && region_id !=='' &&  country_code !=='' && area_id !=='' )
  {
    if(isEdit === true)
    {
      this.updateAPI(id,team_name,region_id,area_id,country_code,status)
    }
    else
    {
      this.createAPI(team_name,region_id,area_id,country_code,status)
    }
   
  }
  else
  {
    createNotification('Please fill mandatory field','error','filled')
  }
 
}
createAPI(team_name,region_id,area_id,country_code,status)
{
  this.setState({
    loading : true
  })
  teamService.createteams(team_name,region_id,area_id,country_code,status)
    .then((res) => { 
      this.setState({   
        loading : false     
      }) 
      if(res.status)
        {
          createNotification('Created','success','filled')
          this.close(true)
        }   
        else{
          createNotification(res.message,'error','filled')
        }           
  
  })
  .catch((error) => { 
    this.setState({
      loading : false
    })
  });
   
}
updateAPI(id,team_name,region_id,area_id,country_code,status)
{
  this.setState({
    loading : true
  })
  teamService.updateteams(id,team_name,region_id,area_id,country_code,status)
    .then((res) => { 
      this.setState({   
        loading : false     
      }) 
      if(res.status)
        {
          createNotification('Updated','success','filled')
          this.close(true)
        }    
        else{
          createNotification(res.message,'error','filled')
        }          
  
  })
  .catch((error) => { 
    this.setState({
      loading : false
    })
  });
}

close(isedit)
{
  this.props.closeModal(isedit)
}

  render()
  {
  
    const {team_name,region_id,area_id,country_code,region_data,area_data,
      isEdit,status,team_data,loading} = this.state
    const {locale,languageData} = this.props
    return (
      <div>
           {loading && 
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
         <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Region Name',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
            <Colxx xxs="8" className="mb-4">
            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={region_data.filter(option =>option.value === region_id)}
                        options={region_data}
                        onChange={this.handlechangeregion}
                        // onChange={({value}) => this.setState({  region_id: value })}
                      />
                 </Colxx>
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Area Name',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
            <Colxx xxs="8" className="mb-4">
            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={area_data.filter(option =>option.value === area_id)}
                        options={area_data}
                        onChange={({value}) => this.setState({  area_id: value })}
                      />
                 </Colxx>
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Team',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
                  <Colxx xxs="8" className="mb-4">
                  <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={team_data.filter(option =>option.value === team_name)}
                        options={team_data}
                        onChange={({value}) => this.setState({  team_name: value })}
                      />
                 
                 </Colxx>
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Country Code',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Country Code',languageData)} 
                        value = {country_code}  
                        onChange= {(e)=>this.setState({country_code : e.target.value})} ></Input>
                 </Colxx>
             </Row>
             {isEdit && 
                <Row>
                <Colxx xxs="4" className="mb-4">
                      <Label>{onChangeLanguage(locale,'Status',languageData)}</Label>
                </Colxx>
                  
                <Colxx xxs="8" className="mb-4">
                 <select className='fontstyle buttoncolor input-text'
                     type="select"
                     name="aggregatename"
                     id="name"
                     placeholder="Select"
                     value={status}
                     onChange={(e) =>this.setState({status :parseInt(e.target.value)})}
                     >
                     <option value = {1}>{onChangeLanguage(locale,'Active',languageData)}</option>
                     <option value = {0}>{onChangeLanguage(locale,'In - Active',languageData)}</option>
                  
                  </select>
                  </Colxx>
                  
                </Row>
             }
           <Row>
               <Colxx xxs="4" className="mb-4"> </Colxx>       
               <Colxx xxs="3" className="mb-4"> 
                  <Button color = "primary" className = 'fontstyle button-width'  onClick={()=>this.close(false)}>
                  {onChangeLanguage(locale,'Cancel',languageData)} 
                   
                  </Button>
                  
               </Colxx>   
               <Colxx xxs="5" className="mb-4"> 
                <Button color = "secondary" className="fontstyle button-width" onClick={()=>this.onSubmit()}>
                    {onChangeLanguage(locale,'Submit',languageData)} 
                  </Button>
               </Colxx>       
               
            </Row>
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

