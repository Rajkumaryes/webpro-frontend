import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Input,Button} from 'reactstrap';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage} from '../../../../../helper'
import{timeService} from '../../../../../redux/EPOS/time/saga'
import Loading from "react-fullscreen-loading";
import{areaService} from '../../../../../redux/area/saga'
import Select from 'react-select';

class RegisterUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id:0,
      name: '',
      area:'',
      areadata:[],
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
        area:record.area,
        name:record.name,
        status: record.status,
        isEdit:true
      })
     
    }
    this.fetcharea()    
  }

  
  fetcharea() {
    areaService.fetcharea()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var arealist = filterstatus.map(function(response) {
                  return  {label : response.name ,value : response.name};
               });  
                this.setState({
                areadata :  arealist,
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
 } 
onSubmit() { 
  const {id,area,name,status,isEdit} = this.state;

  if(area !== "")
  {
    if(isEdit === true)
    {
      this.updateAPI(id,name,area,status)
    }
    else
    {
      this.createAPI(name,area,status)
    }
   
  }
  else
  {
    createNotification('Please fill mandatory field','error','filled')
  }
 
}
createAPI(name,area,status)
{
  this.setState({
    loading : true
  })
  timeService.createtime(name,area,status)
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
updateAPI(id,name,area,status)
{
  this.setState({
    loading : true
  })
  timeService.updatetime(id,name,area,status)
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
  
    const {area,name,isEdit,status,loading,areadata} = this.state
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
                   <Label> {onChangeLanguage(locale,'Location',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Location',languageData)} 
                        value = {name}  
                        onChange= {(e)=>this.setState({name : e.target.value})} ></Input>
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
                        value={areadata.filter(option =>(option.value).toLowerCase() === area.toLowerCase())}
                       options={areadata}
                        onChange={({value}) => this.setState({  area: value })}
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

