import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Input,Button} from 'reactstrap';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage} from '../../../../../helper'
import{eqmasterService} from '../../../../../redux/qa/eqmaster/saga'
import Loading from "react-fullscreen-loading";
import Select from 'react-select';

class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:0,
      eq:'',
      module:'',
      status : 1,
      isEdit:false,
      loading:false,
      module_data:[
        {value:'Input Audit',label:'Input Audit',url :'inputaudit',submenu:'Input Audit'},
            {value:'Surprise Correction Audit',label:'Surprise Correction Audit',url:'surprisecorrection',submenu:'Surprise Correction Audit'},
            {value:'SDEM Withdrawn Audit',label:'SDEM Withdrawn Audit',url:'sdemwithdrawn',submenu:'SDEM Withdrawn Audit'},
            {value:'Match Code Audit',label:'Match Code Audit',url:'matchcode',submenu:'Match Code Audit'},
            {value:'Destination Audit',label:'Destination Audit',url:'destination',submenu:'Destination Audit'},
            {value:'Error Code Audit',label:'Error Code Audit',url:'errorcodeaudit',submenu:'Error Code Audit'},
            {value:'MAF Audit',label:'MAF Audit',url:'mafaudit',submenu:'MAF Audit'},
            {value:'1st Instance Audit',label:'1st Instance Audit',url:'instance',submenu:'1st Instance Audit'},
            {value:'Other Audit 1',label:'Other Audit 1',url:'otherauditsone',submenu:'Other Audit 1'},
            {value:'Other Audit 2',label:'Other Audit 2',url:'otherauditstwo',submenu:'Other Audit 2'},
      ],
    };
  }

  componentDidMount() {
    const {isEdit,record} = this.props
    if(isEdit == true)
    {
      this.setState({
        id:record.id,
        module:record.module,
        eq:record.eq,
        status: record.status,
        isEdit:true
      })
   
    }  
  
  }

onSubmit() { 
  const {id,module,eq,status,isEdit} = this.state;


  if(eq!=="" && module !== '')
  {
    if(isEdit === true)
    {
      this.updateAPI(id,module,eq,status)
    }
    else
    {
      this.createAPI(module,eq,status)
    }
   
  }
  else
  {
    createNotification('Please fill mandatory field','error','filled')
  }
 
}
createAPI(module,eq,status)
{
  this.setState({
    loading : true
  })
  eqmasterService.createeqmaster(module,eq,status)
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
updateAPI(id,module,eq,status)
{
  this.setState({
    loading : true
  })
  eqmasterService.updateeqmaster(id,module,eq,status)
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
  this.setState({region:value,team:'',team_data:[]})
  this.fetchteam(value)
}

  render()
  {
  
    const {module_data,module,eq,isEdit,status,loading} = this.state
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
                   <Label> {onChangeLanguage(locale,'Name',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                    <Select  
                          className="react-select fontstyle"
                        classNamePrefix="react-select"
                        module="form-field-module"
                        value={module_data.filter(option =>option.value === module)}
                        options={module_data}
                        onChange={({value}) => this.setState({  module: value })}
                      />
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
                        value = {eq}  
                        onChange= {(e)=>this.setState({eq : e.target.value})} ></Input>
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
                     module="aggregatemodule"
                     id="module"
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

