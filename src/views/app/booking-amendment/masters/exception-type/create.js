import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Input,Button} from 'reactstrap';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage} from '../../../../../helper'
import{exceptiontypeService} from '../../../../../redux/bookingamendment/exceptiontype/saga'
import Loading from "react-fullscreen-loading";
import Select from 'react-select';
class RegisterUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id:0,
      name:'',
      exception_type:'',
      exception_reason:'',
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
        exception_type:record.exception_type,
        exception_reason:record.exception_reason,
        status: record.status,
        isEdit:true
      })
     
    }    
  }

onSubmit() { 
  const {id,exception_type,exception_reason,status,isEdit} = this.state;

  if(exception_type !== "" && exception_reason!=='')
  {
    if(isEdit === true)
    {
      this.updateAPI(id,exception_type,exception_reason,status)
    }
    else
    {
      this.createAPI(exception_type,exception_reason,status)
    }
   
  }
  else
  {
    createNotification('Please fill mandatory field','error','filled')
  }
 
}
createAPI(exception_type,exception_reason,status)
{
  this.setState({
    loading : true
  })
  exceptiontypeService.createapi(exception_type,exception_reason,status)
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
updateAPI(id,name,status)
{
  this.setState({
    loading : true
  })
  exceptiontypeService.updateapi(id,name,status)
    .then((res) => { 
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
handleexceptiontype = (selectedOptions) => {
  this.setState({ exception_type: selectedOptions.value })
}
  render()
  {
  
    const {name,isEdit,status,loading,exception_type ,exception_reason} = this.state
    const {locale,languageData} = this.props
    var exceptiontype_data = [
      {
        "label": "No Exception",
        "value": "No Exception"
      },
      {
        "label": "Internal",
        "value": "Internal"
      },
      {
        "label": "External",
        "value": "External"
      },
      {
        "label": "Internal & External",
        "value": "Internal & External"
      },
    ];
    return (
      <div>
           {loading && 
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Exception Type',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  {/* <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Exception Type',languageData)} 
                        value = {name}  
                        onChange= {(e)=>this.setState({name : e.target.value})} ></Input> */}
                                
              <Select
                className={"react-select fontstyle"}
                classNamePrefix="react-select"
                name="form-field-name"
                value={exceptiontype_data.filter(option => option.value === exception_type)}
                options={exceptiontype_data}
                onChange={this.handleexceptiontype}
              />
            
                 </Colxx>

                 <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Exception Reason',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Exception Reason',languageData)} 
                        value = {exception_reason}  
                        onChange= {(e)=>this.setState({exception_reason : e.target.value})} ></Input>
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

