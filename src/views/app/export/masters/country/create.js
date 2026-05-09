import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Input,Button} from 'reactstrap';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage,getValue} from '../../../../../helper'
import Loading from "react-fullscreen-loading";
import{matchcountryService} from '../../../../../redux/Export/masters/country/saga'
import { boolean } from 'yup';
import Checkbox from '@material-ui/core/Checkbox';
import{regionexportService} from '../../../../../redux/Export/masters/exportregion/saga'
import Select from 'react-select';


class RegisterUser extends Component {
  constructor(props) {
   
    super(props);
    this.state = {
      id:0,
      region_id:'',
      regiondata:[],
      name:'',
      telephone:false,
      fax:false,
      taxcode:false,
      email_address:false,
      status : 1,
      isEdit:false,
      loading:false,
      // checked:true,
      // setChecked:true
    };
  }
  
  componentDidMount() {
    const {isEdit,record} = this.props
    if(isEdit == true)
    {
      this.setState({
        id:record.id,
        region_id:record.region_id !== null ? record.region_id : '',
        name:record.name,
        telephone:record.telephone,
        fax:record.fax,
        taxcode:record.taxcode,
        email_address:record.email_address,
        status: record.status,
        isEdit:true
      })
    }
    this.fetchregion()    
  }
 
  fetchregion() {
    regionexportService.fetchregion()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.region_code ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                regiondata :  regionlist,
                })
                console.log(regionlist,'ddddddddddddddddddd')

             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
 } 
onSubmit() { 
  const {id,region_id,name,telephone,fax,taxcode,email_address,status,isEdit} = this.state;

  if(name !== "" && region_id !== '')
  {
    if(isEdit === true)
    {
      this.updateAPI(id,region_id,name,telephone,fax,taxcode,email_address,status)
    }
    else
    {
      this.createAPI(region_id,name,telephone,fax,taxcode,email_address,status)
    }
   
  }
  else
  {
    createNotification('Please fill mandatory field','error','filled')
  }
 
}
createAPI(region_id,name,telephone,fax,taxcode,email_address,status)
{
  this.setState({
    loading : true
  })
  matchcountryService.creatematchcountry(region_id,name,telephone,fax,taxcode,email_address,status)
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
updateAPI(id,region_id,name,telephone,fax,taxcode,email_address,status)
{
  this.setState({
    loading : true
  })
  matchcountryService.updatematchcountry(id,region_id,name,telephone,fax,taxcode,email_address,status)
    .then((res) => { 
      this.setState({   
        loading : false     
      }) 
      if(res.status)
        {
          createNotification('Updated','success','filled')
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

close(isedit)
{
  this.props.closeModal(isedit)
}

  render()
  {
  
    const {region_id,name,telephone,fax,taxcode,email_address,isEdit,status,loading,regiondata} = this.state
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
                        value={regiondata.filter(option =>option.value === region_id)}
                        options={regiondata}
                        onChange={({value}) => this.setState({region_id: value})}
                      />
                 </Colxx>
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Country',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Country',languageData)} 
                        value = {name}  
                        onChange= {(e)=>this.setState({name : e.target.value})} ></Input>
                 </Colxx>
                
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Telephone',languageData)}</Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                 
                              <Checkbox
                              
                               
                                checked = {telephone === true} onChange = {()=>this.setState({telephone:!telephone})}

                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                              />

                 </Colxx>
                
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Fax',languageData)}</Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  {/* <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Fax',languageData)} 
                        value = {fax}  
                        onChange= {(e)=>this.setState({fax : e.target.value})} ></Input> */}
                         <Checkbox
                       checked = {fax === true} onChange = {()=>this.setState({fax:!fax})}

                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                              />
                 </Colxx>
                
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Tax Code',languageData)}</Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  {/* <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Tax Code',languageData)} 
                        value = {taxcode}  
                        onChange= {(e)=>this.setState({taxcode : e.target.value})} ></Input> */}
                         <Checkbox
                           checked = {taxcode === true} onChange = {()=>this.setState({taxcode:!taxcode})}
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                              />
                 </Colxx>
                
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Email Address',languageData)}</Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  {/* <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Email Address',languageData)} 
                        value = {email_address}  
                        onChange= {(e)=>this.setState({email_address : e.target.value})} ></Input> */}
                  <Checkbox
                                 // defaultChecked
                                // onChange={this.handleChange}
                                checked = {email_address === true} onChange = {()=>this.setState({email_address:!email_address})}

                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
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

