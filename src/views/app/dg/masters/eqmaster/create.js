import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Input,Button} from 'reactstrap';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage} from '../../../../../helper'
import{eqmasterService} from '../../../../../redux/dgtt/dgmodeleqmaster/saga'
import Loading from "react-fullscreen-loading";
import Select from 'react-select';
import{AreaService} from '../../../../../redux/dgtt/dgarea/saga'
import{dectypeService} from '../../../../../redux/dgtt/dectype/saga'
import{containertypeService} from '../../../../../redux/dgtt/containertype/saga'
class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:0,
      area: '',
      dec_type:'',
      container_type:'',
      eq:'',
      name:'',
      areadata:[],
      dectypedata:[],
      cntrtypedata:[],
      status : 1,
      isEdit:false,
      loading:false
    };
  }

  componentDidMount() {
    const {isEdit,record} = this.props
    if(isEdit === true)
    {
      this.setState({
        id:record.id,
        name:record.name,
        area:record.area,
        dec_type:record.dec_type,
        container_type:record.container_type,
        eq:record.eq,
        status: record.status,
        isEdit:true
      })
    }  
    this.fetcharea()
    this.fetchcontainertype()
    this.fetchdectype() 
  }
  fetcharea() {
    this.setState({loading:true})
    AreaService.fetcharea()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                areadata :  regionlist
                })
               
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})
 }  
  
fetchdectype() {
  this.setState({loading:true})
  dectypeService.fetchdectype()
  .then((res) => {
     if(res.status)   { 
        let filterstatus = (res.data).filter(item => item.status === 1)
           var regionlist = filterstatus.map(function(cusmaidid) {
                return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
             });  
              this.setState({
              dectypedata :  regionlist
              })
             
           }
           else{
           this.setState({loading:false})}
           })
           .catch((error) => { }); 
           this.setState({loading:false})
}  
fetchcontainertype() {
this.setState({loading:true})
containertypeService.fetchcontainertype()
.then((res) => {
   if(res.status)   { 
      let filterstatus = (res.data).filter(item => item.status === 1)
         var regionlist = filterstatus.map(function(cusmaidid) {
              return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
           });  
            this.setState({
              cntrtypedata :  regionlist
            })
           
         }
         else{
         this.setState({loading:false})}
         })
         .catch((error) => { }); 
         this.setState({loading:false})
}  
 
onSubmit() { 
  const {id,name,area,dec_type,container_type,eq,status,isEdit} = this.state;


  if(area !=='' && dec_type !=='' && container_type!=='' && eq!=="" && name !== '')
  {
    if(isEdit === true)
    {
      this.updateAPI(id,name,area,dec_type,container_type,eq,status)
    }
    else
    {
      this.createAPI(name,area,dec_type,container_type,eq,status)
    }
   
  }
  else
  {
    createNotification('Please fill mandatory field','error','filled')
  }
 
}
createAPI(name,area,dec_type,container_type,eq,status)
{
  this.setState({
    loading : true
  })
  eqmasterService.createeqmaster(name,area,dec_type,container_type,eq,status)
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
updateAPI(id,name,area,dec_type,container_type,eq,status)
{
  this.setState({
    loading : true
  })
  eqmasterService.updateeqmaster(id,name,area,dec_type,container_type,eq,status)
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
  
    const {dec_type,area,container_type,name,eq,areadata,cntrtypedata,dectypedata,isEdit,status,loading} = this.state
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
                   <Label> {onChangeLanguage(locale,'Area',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
            <Colxx xxs="8" className="mb-4">
            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={areadata.filter(option =>option.value === area)}
                        options={areadata}
                        onChange={({value}) => this.setState({  area: value })}
                      />
                 </Colxx>
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Dec Type',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
            <Colxx xxs="8" className="mb-4">
            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={dectypedata.filter(option =>option.value === dec_type)}
                        options={dectypedata}
                        onChange={({value}) => this.setState({  dec_type: value })}
                      />
                 </Colxx>
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Container Type',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
            <Colxx xxs="8" className="mb-4">
            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={cntrtypedata.filter(option =>option.value === container_type)}
                        options={cntrtypedata}
                        onChange={({value}) => this.setState({  container_type: value })}
                      />
                 </Colxx>
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'No of Cargoes',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Name',languageData)} 
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

