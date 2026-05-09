import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Button} from 'reactstrap';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage} from '../../../../../helper'
import{AreaselectionService} from '../../../../../redux/FeedersSchedules/feedermaster/areaselection/saga'
import Loading from "react-fullscreen-loading";
import{regionService} from '../../../../../redux/FeedersSchedules/feedermaster/region/saga'
import Select from 'react-select';
import{areaService} from '../../../../../redux/area/saga'

class RegisterUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id:0,
      name:'',
      region:'',
      regiondata:[],
      area_data:[],
      status : 1,
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
        status: record.status,
        isEdit:true
      })
     
    }    
    this.fetchregion()  
    this.fetcharea()
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
  fetchregion() {
    regionService.fetchregion()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var arealist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                regiondata :  arealist,
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
  } 

onSubmit() { 
  const {id,name,region,status,isEdit} = this.state;

  if(name !== "")
  {
    if(isEdit === true)
    {
      this.updateAPI(id,name,region,status)
    }
    else
    {
      this.createAPI(name,region,status)
    }
   
  }
  else
  {
    createNotification('Please fill mandatory field','error','filled')
  }
 
}
createAPI(name,region,status)
{
  const {username} = this.props
  this.setState({
    loading : true
  })
  AreaselectionService.createareaselection(name,region,status,username)
    .then((res) => { 
      this.setState({   
        loading : false     
      }) 
      if(res.status)
        {
          createNotification('Created','success','filled')
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
updateAPI(id,name,region,status)
{
  this.setState({
    loading : true
  })
  AreaselectionService.updateareaselection(id,name,region,status)
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

  render()
  {
  
    const {name,region,isEdit,regiondata,status,area_data,loading} = this.state
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
                        value={regiondata.filter(option =>option.value === region)}
                        options={regiondata}
                        onChange={({value}) => this.setState({  region: value })}
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
                        options={area_data}
                        onChange={({value}) => this.setState({  name: value })}
                      />
                  {/* <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Area',languageData)} 
                        value = {name}  
                        onChange= {(e)=>this.setState({name : e.target.value})} ></Input> */}
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
  const { locale,languageData,username} = settings;
  return {locale, languageData,username};
};
export default injectIntl(
  connect(mapStateToProps, {

  })(RegisterUser)
);

