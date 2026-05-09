import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Input,Button} from 'reactstrap';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage} from '../../../../../helper'
import{roleService} from '../../../../../redux/role/saga'
import{categoryService} from '../../../../../redux/productivty/category/saga'
import{typeService} from '../../../../../redux/productivty/type/saga'
import Loading from "react-fullscreen-loading";
import Select from 'react-select';

class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:0,
      name: '',
      menu:'',
      status : 1,
      type:'',
      menu_data:[],
      type_data:[],
      isEdit:false,
      loading:false,
      time_limit:''
    };
  }

  componentDidMount() {
    const {isEdit,record} = this.props
    if(isEdit == true)
    {
      this.setState({
        id:record.id,
        menu:record.menu,
        name:record.name,
        time_limit:record.time_limit,
        type:record.type,
        status: record.status,
        isEdit:true
      })
     
    }  
    this.fetchmenu()  
    this.fetchtype()
  }
  fetchtype() {
    typeService.fetchapi()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var categorylist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                type_data :  categorylist,
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
  }  
  fetchmenu() {
    roleService.fetchrolepermissionData()
    .then((res) => {
       if(res.status)   { 
        let filterstatus = (res.data).filter(item => item.name !== 'Productivity Masters' &&  item.name !== 'General Master' &&  item.name !== 'Dashboard')
              var menu = filterstatus.map(function(cusmaidid) {
                return  {label : cusmaidid.name ,value : cusmaidid.name};
              });  
                this.setState({
                menu_data :  menu,
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
 }  
onSubmit() { 
  const {id,menu,name,type,status,isEdit,time_limit} = this.state;


  if(menu !== "" && name !=='' && type !== '')
  {
    if(isEdit === true)
    {
      this.updateAPI(id,menu,name,type,time_limit,status)
    }
    else
    {
      this.createAPI(menu,name,type,time_limit,status)
    }
   
  }
  else
  {
    createNotification('Please fill mandatory field','error','filled')
  }
 
}
createAPI(menu,name,type,status)
{
  this.setState({
    loading : true
  })
  categoryService.createapi(menu,name,type,status)
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
updateAPI(id,menu,name,type,time_limit,status)
{
  this.setState({
    loading : true
  })
  categoryService.updateapi(id,menu,name,type,time_limit,status)
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
  
    const {menu,name,menu_data,type,type_data,isEdit,status,loading,time_limit} = this.state
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
                   <Label> {onChangeLanguage(locale,'For',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
            <Colxx xxs="8" className="mb-4">
            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={menu_data.filter(option =>option.value === menu)}
                        options={menu_data}
                        onChange={({value}) => this.setState({  menu: value })}
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
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Time Limit',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Minutes',languageData)} 
                        value = {time_limit}  
                        onChange= {(e)=>this.setState({time_limit : e.target.value})} ></Input>
                        {/* <Input      
                            data-date-format='hh:mm:ss'
                            type="time"  
                            step="60"
                            value = {time_limit}  
                            onChange= {(e)=>this.setState({time_limit : e.target.value})} 
                            /> */}
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

