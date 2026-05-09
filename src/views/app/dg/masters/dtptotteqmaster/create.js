import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Input,Button} from 'reactstrap';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage} from '../../../../../helper'
import{eqmasterService} from '../../../../../redux/dgtt/dtptotteqmaster/saga'
import Loading from "react-fullscreen-loading";
import Select from 'react-select';
import{MisactivityService} from '../../../../../redux/dgtt/dgptoactivity/saga'
import{MisactivitytrackService}from '../../../../../redux/dgtt/misactivity/saga'

class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:0,
      module: '',
      eq:'',
      name:'',
      status : 1,
      module_data:[
        {value:'DG-PTO',label:'DG-PTO'},
        {value:'Track & Trace',label:'Track & Trace'},
       ],
      ptoactivity_data:[],
      trackactivity_data:[],
      activitydata:[],
      isEdit:false,
      loading:false
    };
  }

  componentDidMount() {
    this.fetchactivitypto()
    this.fetchtrackactivity()
    const {isEdit,record} = this.props
    if(isEdit === true)
    {
      this.setState({
        id:record.id,
        name:record.name,
        module:record.module,
        team:record.team,
        eq:record.eq,
        status: record.status,
        isEdit:true
      })
    }  
    }
    fetchactivitypto() {
      this.setState({loading:true})
      MisactivityService.fetchmisactivity()
      .then((res) => {
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var activitylist = filterstatus.map(function(cusmaidid) {
                    return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
                 });  
                  this.setState({
                    ptoactivity_data :  activitylist
                  })
                 
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})
   }  
   fetchtrackactivity() {
    this.setState({loading:true})
    MisactivitytrackService.fetchmisactivity()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var activitylist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               }); 
                this.setState({
                trackactivity_data :  activitylist
                })
               
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})
 }  
onSubmit() { 
  const {id,name,eq,module,status,isEdit} = this.state;


  if(eq!=="" && name !== '')
  {
    if(isEdit === true)
    {
      this.updateAPI(id,name,eq,module,status)
    }
    else
    {
      this.createAPI(name,eq,module,status)
    }
   
  }
  else
  {
    createNotification('Please fill mandatory field','error','filled')
  }
 
}
createAPI(name,eq,module,status)
{
  this.setState({
    loading : true
  })
  eqmasterService.createeqmaster(name,eq,module,status)
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
updateAPI(id,name,eq,module,status)
{
  this.setState({
    loading : true
  })
  eqmasterService.updateeqmaster(id,name,eq,module,status)
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
getacitivity=(module) =>
{
  const {ptoactivity_data,trackactivity_data}=this.state
  var list = []
  if( module !== null && module === "DG-PTO")
  {
    list =ptoactivity_data
  } else if( module !== null && module === "Track & Trace"){
    list =trackactivity_data
  }
 return list
}


  render()
  {
  
    const {module,name,module_data,eq,isEdit,status,loading} = this.state
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
                   <Label> {onChangeLanguage(locale,'Name',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
            <Colxx xxs="8" className="mb-4">
            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={this.getacitivity(module).filter(option =>option.value === name)}
                        options={this.getacitivity(module)}
                        onChange={({value}) => this.setState({  name: value })}
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

