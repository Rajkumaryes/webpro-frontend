import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Input,Button} from 'reactstrap';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage} from '../../../../../helper'
import{eqmasterService} from '../../../../../redux/Dispute-process/eqmaster/saga'
import{areaimportService} from '../../../../../redux/imports/areaimport/saga'
import Loading from "react-fullscreen-loading";
import Select from 'react-select';
import{CountryService} from '../../../../../redux/projectmasters/diputemaster/country/saga';

class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:0,
      module: '',
      country:'',
      eq:'',
      type:'',
      type_data:[
        {label:'Manual',value:'Manual'},
        {label:'Macro',value:'Macro'},
      ],
      module_data:[
        {label:'Dispute Capture',value:'Dispute Capture'},
        {label:'Invoice Cancellation',value:'Invoice Cancellation'},
        {label:'Communication',value:'Communication'},
        {label:'Dispute Validation & Settlement',value:'Dispute Validation & Settlement'},
        {label:'Error Capturing',value:'Error Capturing'},
      ],
      status : 1,
      country_data:[],
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
        type:record.type,
        country:record.country,
        module:record.module,
        eq:record.eq,
        status: record.status,
        isEdit:true
      })
    }  
    this.fetchcountry()  
  }
  fetchcountry() {
    this.setState({
        loading : true
      })
      CountryService.fetchcountry()
    .then((res) => {
        this.setState({loading:false})
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var typelist = filterstatus.map(function(typename) {
                  return  {label : typename.name ,value : (typename.id).toString()};
               });  
                this.setState({
                  country_data :  typelist,
                })
             }
            
             })
             .catch((error) => { 
                this.setState({
                    loading : false
                  })
             }); 
 } 
onSubmit() { 
  const {id,type,country,module,eq,status,isEdit} = this.state;


  if(module !=='' && eq!=="" && type !== '')
  {
    if(isEdit === true)
    {
      this.updateAPI(id,type,country,module,eq,status)
    }
    else
    {
      this.createAPI(type,country,module,eq,status)
    }
   
  }
  else
  {
    createNotification('Please fill mandatory field','error','filled')
  }
 
}
createAPI(name,country,module,eq,status)
{
  this.setState({
    loading : true
  })
  eqmasterService.createeqmaster(name,country,module,eq,status)
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
updateAPI(id,type,country,module,eq,status)
{
  this.setState({
    loading : true
  })
  eqmasterService.updateeqmaster(id,type,country,module,eq,status)
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
  this.setState({country:value,module:'',module_data:[]})
  this.fetchmodule(value)
}

  render()
  {
  
    const {country,type,module,module_data,eq,country_data,type_data,isEdit,status,loading} = this.state
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
                   <Label> {onChangeLanguage(locale,'Module',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
            <Colxx xxs="8" className="mb-4">
            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={module_data.filter(option =>option.value === module)}
                        options={module_data}
                        onChange={({value}) => this.setState({  module: value })}
                      />
                 </Colxx>
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Type',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
            <Colxx xxs="8" className="mb-4">
            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={type_data.filter(option =>option.value === type)}
                        options={type_data}
                        onChange={({value}) => this.setState({  type: value })}
                      />
                 </Colxx>
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Country',languageData)}</Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={country_data.filter(option =>option.value === country)}
                        options={country_data}
                        onChange={({value}) => this.setState({  country: value })}
                      />
                 </Colxx>
                
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'EQ',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="number"
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

