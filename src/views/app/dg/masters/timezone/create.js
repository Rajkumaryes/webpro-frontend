import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Input,Button} from 'reactstrap';
import { createNotification } from '../../../../../toast';
import{timezoneService} from '../../../../../redux/timezone/saga'
import {onChangeLanguage} from '../../../../../helper'
import Loading from "react-fullscreen-loading";
import Select from 'react-select';
import {timezonedata} from './data'


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
      mobile_timezone_data:[],
    };
  }

  componentDidMount() {
    const {isEdit,record} = this.props
    var array = []
    for(var i = 0;i < timezonedata.length;i++)
    {
     array.push({label:timezonedata[i],value:timezonedata[i]})
    }
    this.setState({
      mobile_timezone_data:array
    })
    if(isEdit == true)
    {
      this.setState({
        id:record.id,
        name:record.name,
        code:record.code,
        status:record.status,
        isEdit:true
      })
    }    
  }

onSubmit() { 
  const {id,name,code,status,isEdit} = this.state;

  if(name !== "")
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
  timezoneService.createtimezone(name,code,status)
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
updateAPI(id,name,code,status)
{
  this.setState({
    loading : true
  })
  timezoneService.updatetimezone(id,name,code,status)
    .then((res) => { 
      console.log(res,'checkinggggggggggggggg')
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
  
    const {name,code,isEdit,loading,status,mobile_timezone_data} = this.state
    
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
                   <Label>{onChangeLanguage(locale,'Name',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,' Name',languageData)}
                        value = {name}  
                        onChange= {(e)=>this.setState({name : e.target.value})} ></Input>
                 </Colxx>
                
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label>{onChangeLanguage(locale,'TimeZone',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  {/* <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'TimeZone',languageData)}
                        value = {code}  
                        onChange= {(e)=>this.setState({code : e.target.value})} ></Input> */}
                         <Select
                          className="react-select fontstyle"
                          classNamePrefix="react-select"
                          name="form-field-name"
                          placeholder = {onChangeLanguage(locale,'Time Zone',languageData)}
                          value={mobile_timezone_data.filter(option =>option.value === code)}
                          options={mobile_timezone_data}
                          onChange={({value}) => this.setState({  code: value })}
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
// export default RegisterUser


const mapStateToProps = ({ settings }) => {
  const { locale,languageData} = settings;
  return {locale, languageData};
};
export default injectIntl(
  connect(mapStateToProps, {

  })(RegisterUser)
);

