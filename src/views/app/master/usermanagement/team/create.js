import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Input,Button} from 'reactstrap';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage} from '../../../../../helper'
import{regionService} from '../../../../../redux/region/saga'
import{areaService} from '../../../../../redux/area/saga'
import{teamsService} from '../../../../../redux/teams/saga'
import Loading from "react-fullscreen-loading";
import Select from 'react-select';

class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:0,
      name: '',
      region:'',
      area:'',
      status : 1,
      region_data:[],
      area_data:[],
      country_code:'',
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
        region:record.region,
        area:record.area,
        name:record.name,
        country_code:record.country_code,
        status: record.status,
        isEdit:true
      })
     this.fetcharea(record.region)
    }  
    this.fetchregion()  
  }
  fetchregion() {
    this.setState({loading:true})
    regionService.fetchregion()
    .then((res) => {
      this.setState({loading:false})
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.region ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                region_data :  regionlist,
                })
             }
             })
             .catch((error) => { this.setState({loading:false})}); 
 }  
 fetcharea(id) {
  this.setState({loading:true})
  areaService.fetcharea_regionwise(id)
  .then((res) => {
    this.setState({loading:false})
     if(res.status)   { 
        let filterstatus = (res.data).filter(item => item.status === 1 && id)
           var regionlist = filterstatus.map(function(cusmaidid) {
                return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
             });  
              this.setState({
              area_data :  regionlist,
              })
           }
           })
           .catch((error) => { this.setState({loading:false})}); 
}  
onSubmit() { 
  const {id,region,name,area,status,country_code,isEdit} = this.state;


  if(region !== "" && name !=='' && area !== '' && country_code !== '')
  {
    if(isEdit === true)
    {
      this.updateAPI(id,region,area,name,country_code,status)
    }
    else
    {
      this.createAPI(region,area,name,country_code,status)
    }
   
  }
  else
  {
    createNotification('Please fill mandatory field','error','filled')
  }
 
}
createAPI(region,area,name,country_code,status)
{
  this.setState({
    loading : true
  })
  teamsService.createteams(region,area,name,country_code,status)
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
updateAPI(id,region,area,name,country_code,status)
{
  this.setState({
    loading : true
  })
  teamsService.updateteams(id,region,area,name,country_code,status)
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
onChangeRegion(value)
{
  this.setState({  region: value ,area:'',area_data:[]})
  this.fetcharea(value)
}
  render()
  {
  
    const {region,name,region_data,area,area_data,isEdit,status,country_code,loading} = this.state
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
                   <Label> {onChangeLanguage(locale,'Region',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
            <Colxx xxs="8" className="mb-4">
            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={region_data.filter(option =>option.value === region)}
                        options={region_data}
                        onChange={({value}) => this.onChangeRegion(value)}
                      />
                 </Colxx>
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Area',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
            <Colxx xxs="8" className="mb-4">
            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={area_data.filter(option =>option.value === area)}
                        options={area_data}
                        onChange={({value}) => this.setState({  area: value })}
                      />
                 </Colxx>
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Team',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Team',languageData)} 
                        value = {name}  
                        onChange= {(e)=>this.setState({name : e.target.value})} ></Input>
                 </Colxx>
                
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Geo Code',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Geo Code',languageData)} 
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

