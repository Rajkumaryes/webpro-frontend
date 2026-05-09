import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Input,Button} from 'reactstrap';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage} from '../../../../../helper'
import{regionService} from '../../../../../redux/vesselbalancing/region/saga'
import{areaService} from '../../../../../redux/vesselbalancing/area/saga'
import{subareaService} from '../../../../../redux/vesselbalancing/subarea/saga'
import Loading from "react-fullscreen-loading";
import Select from 'react-select';

class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:0,
      region:'',
      area : '',
      name:'',
      status : 1,
      region_data:[],
      area_data:[],
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
        name:record.name,
        region:record.region,
        area:record.area,
        status: record.status,
        isEdit:true
      })
    }  
    this.fetchregion()  
    this.fetcharea()  
  }
  fetchregion() {
    regionService.fetchregion()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
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
fetcharea() {
  areaService.fetcharea()
    .then((res) => {
      if (res.status) {
        const { region } = this.state;
        console.log("rajkumar",res.data)
        let filterstatus = res.data.filter(item => item.status === 1);

        let regionlist = filterstatus.map(cusmaidid => {
          return { label: cusmaidid.name, value: cusmaidid.id.toString(), region : cusmaidid.region };
        });

        this.setState({
          area_data: regionlist,
        });
      } else {
        this.setState({ loading: false });
      }
    })
    .catch((error) => {
      console.error("fetcharea error:", error);
    });
}

onSubmit() { 
  const {id,name,status,isEdit,region,area} = this.state;


  if(name !== '' )
  {
    if(isEdit === true)
    {
      this.updateAPI(id,region,area,name,status)
    }
    else
    {
      this.createAPI(region,area,name,status)
    }
   
  }
  else
  {
    createNotification('Please fill mandatory field','error','filled')
  }
 
}
createAPI(region,area,name,status)
{
  this.setState({
    loading : true
  })
  subareaService.createsubarea(region,area,name,status)
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
updateAPI(id,region,area,name,status)
{
  this.setState({
    loading : true
  })
  subareaService.updatesubarea(id,region,area,name,status)
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
getArrayValue(array, value, key) {
  var list = []
  if (array && array !== null && value !== '' && value !== null) {
    list = array.filter(item => item[key] === value)
  }
  return list
}
onChangeRegion(value) {
  const { area_data } = this.state;
  console.log("area_data before filter:", area_data);

  // Ensure both are compared as strings
  let areadataFiltered = this.getArrayValue(area_data, value, 'region')

  this.setState({ region: value, area_data: areadataFiltered, area: '' });
}

onChangeArea(value)
{
  this.setState({area:value})
}

  render()
  {
  
    const {region,name,region_data,area_data,area,isEdit,status,loading} = this.state
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
                        // value={region_data.filter(option =>option.value === region)}
                        value={region_data.find(option => option.value === region)}
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
                        onChange={({value}) => this.onChangeArea(value)}
                      />
                 </Colxx>
             </Row>
             
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Name',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Name',languageData)} 
                        value = {name}  
                        onChange= {(e)=>this.setState({name : e.target.value})} ></Input>
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

