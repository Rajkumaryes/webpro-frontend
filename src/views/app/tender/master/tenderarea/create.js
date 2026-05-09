import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Button} from 'reactstrap';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage} from '../../../../../helper';
import{tenderareaService} from '../../../../../redux/projectmasters/tenderarea/saga';
import Loading from "react-fullscreen-loading";
import{areaService} from '../../../../../redux/area/saga'
import Select from 'react-select';
import{teamsService} from '../../../../../redux/teams/saga'

class RegisterUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id:0,
      name:'',
      code:'',
      status : 1,
      isEdit:false,
      loading:false,
      geocode_data:[],
      area_data:[],
      region_data:[]
    };
  }

  componentDidMount() {
    const {isEdit,record} = this.props
    if(isEdit == true)
    {
      this.setState({
        id:record.id,
        name:record.name,
        code:record.code,
        status: record.status,
        isEdit:true
      })
     
    } 
    this.fetchteams() 
    // this.fetcharea()  
  }
  fetcharea() {
    this.setState({loading:true})
    areaService.fetcharea()
    .then((res) => {
      this.setState({loading:false})
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1 )
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.name};
               });  
                this.setState({
                area_data :  regionlist,
                })
             }
             })
             .catch((error) => { this.setState({loading:false})}); 
  } 
  fetchteams() {
    teamsService.fetchteams()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.country_code ,value : cusmaidid.country_code};
               });  
               var List = filterstatus.map(function(cusmaidid) {
                return  {label : cusmaidid.name ,value : cusmaidid.name,country_code : cusmaidid.country_code};
             }); 
             var eallyUniqueArr =  regionlist.filter((v,i,a)=>a.findIndex(t=>(t.label === v.label && t.value===v.value))===i)
                this.setState({
                geocode_data :  eallyUniqueArr,
                area_data:List
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
 }  
onSubmit() { 
  const {id,name,code,status,isEdit} = this.state;

  if(name !== "" && code !=='')
  {
    if(isEdit === true)
    {
      this.updateAPI(id,name,code,status)
    }
    else
    {
      this.createAPI(name,code,status)
    }
   
  }
  else
  {
    createNotification('Please fill mandatory field','error','filled')
  }
 
}
createAPI(name,code,status)
{
  this.setState({
    loading : true
  })
  tenderareaService.createtenderarea(name,code,status)
    .then((res) => { 
      this.setState({   
        loading : false     
      }) 
      if(res.status)
        {
          createNotification('Created','success','filled')
          this.close(true)
        }else{
          createNotification(res.message,'error','filled')
        }                
  
  })
  .catch((error) => { 
    this.setState({
      loading : false
    })
  });
   
}
updateAPI(id,name,code,status)
{
  this.setState({
    loading : true
  })
  tenderareaService.updatetenderarea(id,name,code,status)
    .then((res) => { 
      this.setState({   
        loading : false     
      }) 
      if(res.status)
        {
          createNotification('Updated','success','filled')
          this.close(true)
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

close(isedit)
{
  this.props.closeModal(isedit)
}
handlechangecode = (selectedOptions) => {
  this.setState({
    code : selectedOptions.value,
    name:''
  })
} 
getAreaValue(array,code)
{
  console.log('array',array)
  console.log('array',code)
  var list = []
  if(array && array !== null && code !== '' && code !== null )
  {
    
    list = array.filter(item => item.country_code === code)
  } 
  return list
}
  render()
  {
  
    const {name,isEdit,code,status,loading,area_data,geocode_data} = this.state
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
                   <Label> {onChangeLanguage(locale,'Geo Code',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
            <Colxx xxs="8" className="mb-4">
            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={geocode_data.filter(option =>option.value === code)}
                        options={geocode_data}
                        onChange={this.handlechangecode}
                        // onChange={({value}) => this.setState({  code: value })}
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
                        value={area_data.filter(option =>(option.value).toLowerCase() === name.toLowerCase())}
                        // options={area_data}
                        options={this.getAreaValue(area_data,code)}
                        onChange={({value}) => this.setState({  name: value })}
                      />
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

