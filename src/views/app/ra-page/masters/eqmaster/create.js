import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Input,Button} from 'reactstrap';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage} from '../../../../../helper'
import{regionsService} from '../../../../../redux/ra/region/saga'
import{eqmasterService} from '../../../../../redux/ra/eqmaster/saga'
import Loading from "react-fullscreen-loading";
import Select from 'react-select';
import{sizeService} from '../../../../../redux/ra/size/saga'

class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:0,
      name: '',
      region:'',
      status : 1,
      module :'',
      size:'',
      typeofreq:'',
      type:'',
      eq:'',
      region_data:[],
      size_data:[],
      type_data:[
        {label : 'Publish' ,value : 'Publish'},
        {label : 'Audit' ,value : 'Audit'},
      ],
      type_of_req_data:[
        {label : 'All' ,value : 'All'},
        {label : 'CC' ,value : 'CC'},
      ],
      module_data:[
        {label : 'AMD / Contracts' ,value : 'AMD / Contracts'},
        {label : 'Cross Borders' ,value : 'Cross Borders'},
        {label : 'Dispute' ,value : 'Dispute'},
      ],
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
        name:record.name,
        status: record.status,
        module :record.module ,
        size:record.size !== null ? record.size:'',
        typeofreq:record.typeofreq!== null ? record.typeofreq:'',
        type :record.type !== null ? record.type:'',
        eq:record.eq,
        isEdit:true
      })
     
    }  
    this.fetchregion()  
    this.fetchsize()
  }
  fetchregion() {
    regionsService.fetchapi()
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
 fetchsize() {
  sizeService.fetchapi()
  .then((res) => {
     if(res.status)   { 
        let filterstatus = (res.data).filter(item => item.status === 1)
           var regionlist = filterstatus.map(function(cusmaidid) {
                return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
             });  
              this.setState({
                size_data :  regionlist,
              })
           }
           else{
           this.setState({loading:false})}
           })
           .catch((error) => { }); 
} 
onSubmit() { 
  const {isEdit,id,region,name,module,size,eq,typeofreq,type,status} = this.state;

  if(region !== "" && typeofreq !=='' && module !== '' && size !== '' && eq !== '' && type !== '')
  {

 
    
    if(isEdit === true)
    {
      this.updateAPI(id,region,name,module,size,eq,typeofreq,type,status)
    }
    else
    {
      this.createAPI(region,name,module,size,eq,typeofreq,type,status)
    }
   
  }
  else
  {
    createNotification('Please fill mandatory field','error','filled')
  }
 
}
createAPI(region,name,module,size,eq,typeofreq,type,status)
{
  this.setState({
    loading : true
  })
  eqmasterService.createapi(region,name,module,size,eq,typeofreq,type,status)
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
updateAPI(id,region,name,module,size,eq,typeofreq,type,status)
{
  this.setState({
    loading : true
  })
  eqmasterService.updateapi(id,region,name,module,size,eq,typeofreq,type,status)
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
  
    const {region,name,region_data,size_data,isEdit,status,loading,module,size,
    type_data,type_of_req_data,module_data,typeofreq,type,eq} = this.state
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
                        value={region_data.filter(option =>option.value === region)}
                        options={region_data}
                        onChange={({value}) => this.setState({  region: value })}
                      />
                 </Colxx>
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Size',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                     <Select  
                          className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={size_data.filter(option =>option.value === size)}
                        options={size_data}
                        onChange={({value}) => this.setState({  size: value })}
                      />
                
                 </Colxx>
                
             </Row>
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
                   <Label> {onChangeLanguage(locale,'Activity Type',languageData)}<a style = {{color :'red'}}>*</a></Label>
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
                   <Label> {onChangeLanguage(locale,'Type of Request',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                   <Select  
                          className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={type_of_req_data.filter(option =>(option.value).toUpperCase() === (typeofreq).toUpperCase())}
                        options={type_of_req_data}
                        onChange={({value}) => this.setState({  typeofreq: value })}
                      />
                 </Colxx>
                
             </Row>
             
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Route Service',languageData)}</Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Route Service',languageData)} 
                        value = {name}  
                        onChange= {(e)=>this.setState({name : e.target.value})}></Input>
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
                        onChange= {(e)=>this.setState({eq : e.target.value})}></Input>
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

