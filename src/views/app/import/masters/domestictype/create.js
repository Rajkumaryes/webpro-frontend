import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Input,Button} from 'reactstrap';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage} from '../../../../../helper'
import{domestictypeService} from '../../../../../redux/imports/domestictype/saga'
import Loading from "react-fullscreen-loading";
import{areaimportService} from '../../../../../redux/imports/areaimport/saga';
import Select from 'react-select';

class RegisterUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id:0,
      name:'',
      unit:'',
      area:'',
      area_Data: [],
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
        unit:record.unit,
        area:record.area_id,
        status: record.status,
        isEdit:true
      })
     
    }
    this.fetcharea()    
  }
  fetcharea() {
    this.setState({loading:true})
    areaimportService.fetchareaimport()
    .then((res) => {
       if(res.status)   { 
           let filterstatus = (res.data).filter(item => item.status === 1)
             var arealist = filterstatus.map(function(response) {
                  return  {label : response.area_name ,value : response.id.toString()};
               });  
                this.setState({
                area_Data :  arealist,
                loading:false
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})
  } 

onSubmit() { 
  const {id,name,unit,area,status,isEdit} = this.state;

  if(name !== "" && unit !== ""&& area !== "")
  {
    if(isEdit === true)
    {
      this.updateAPI(id,name,unit,area,status)
    }
    else
    {
      this.createAPI(name,unit,area,status)
    }
   
  }
  else
  {
    createNotification('Please fill mandatory field','error','filled')
  }
 
}
createAPI(name,unit,area,status)
{
  this.setState({
    loading : true
  })
  domestictypeService.createdomestictype(name,unit,area,status)
    .then((res) => { 
      this.setState({   
        loading : false     
      }) 
      if(res.status)
        {
          createNotification('Created','success','filled')
          this.close(true)
        }  else{
          createNotification(res.message,'error','filled')
        }            
  
  })
  .catch((error) => { 
    this.setState({
      loading : false
    })
  });
   
}
updateAPI(id,name,unit,area,status)
{
  this.setState({
    loading : true
  })
  domestictypeService.updatedomestictype(id,name,unit,area,status)
    .then((res) => { 
      this.setState({   
        loading : false     
      }) 
      if(res.status)
        {
          createNotification('Updated','success','filled')
          this.close(true)
        }    else{
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
  
    const {name,unit,area,isEdit,status,area_Data,loading} = this.state
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
                   <Label> {onChangeLanguage(locale,'Type',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Type',languageData)} 
                        value = {name}  
                        onChange= {(e)=>this.setState({name : e.target.value})} ></Input>
                 </Colxx>
                
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'EQ',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'EQ',languageData)} 
                        value = {unit}  
                        onChange= {(e)=>this.setState({unit : e.target.value})} ></Input>
                 </Colxx>
                
             </Row>
           
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Team',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
              <Colxx xxs="8" className="mb-4">
                  <Select className = "fontstyle"
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    placeholder= {onChangeLanguage(locale,'Team',languageData)}
                    value={area_Data.filter(option =>option.value === area)}
                    options={area_Data}
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

