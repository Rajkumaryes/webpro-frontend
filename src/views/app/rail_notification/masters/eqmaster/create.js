import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Input,Button} from 'reactstrap';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage} from '../../../../../helper';
 import{eqmasterService} from '../../../../../redux/railnotification/eqmaster/saga';
 import{railtypeService} from '../../../../../redux/railnotification/type/saga';
import Loading from "react-fullscreen-loading";
import Select from 'react-select';

class RegisterUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id:0,
      module:'',
      eq:'',
      type:'',
      status : 1,
      isEdit:false,
      loading:false,
      type_data:[],
      module_data:[
        {value:'Announcement Data',label:'Announcement Data'},
        {value:'Communication Data',label:'Communication Data'},
        {value:'Container Release Data',label:'Container Release Data'},
        {value:'Free Time Notification Data',label:'Free Time Notification Data'},
        {value:'Accuracy',label:'Accuracy'},
        {value:'Others',label:'Others'},
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
        type:record.type,
        status: record.status,
        isEdit:true
      })
     
    }
    this.fetchtypeData()
  }

  fetchtypeData() {  
    this.setState({
      loading : true
    })
    railtypeService.fetchtype()
      .then((res) => { 
        this.setState({   
      loading : false 
              
        }) 
        if(res.status)
          {
            let filterstatus = (res.data).filter(item => item.status === 1)
               var reportlist = filterstatus.map(function(response) {
                    return  {label : response.name ,value : response.id.toString()};
                 });  
                  this.setState({
                    type_data :  reportlist
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
  const {id,module,eq,type,status,isEdit} = this.state;
  var isfill = true
  if(module === "" || eq === '')
  {
    isfill = false
  }
  else if(module === "Others" && type === '')
  {
    isfill = false
  }

  if(isfill == true )
  {
    if(isEdit === true)
    {
      this.updateAPI(id,module,eq,type, status)
    }
    else
    {
      this.createAPI(module,eq,type, status)
    }
   
  }
  else
  {
    createNotification('Please fill mandatory field','error','filled')
  }
 
}
createAPI(module,eq,type, status)
{
  this.setState({
    loading : true
  })
  eqmasterService.createeqmaster(module,eq,type, status)
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
updateAPI(id,module,eq,type, status)
{
  this.setState({
    loading : true
  })
  eqmasterService.updateeqmaster(id,module,eq,type, status)
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
  
    const {module,eq,module_data,type,type_data, isEdit,status,loading} = this.state
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
                    <Select  className="react-select fontstyle"
                            classNamePrefix="react-select"
                            module="form-field-module"
                            value={module_data.filter(option =>option.value === module)}
                            options={module_data}
                            onChange={(option)=>this.setState({module:option.value})}
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
             {module === "Others" && 
                <Row>
                  <Colxx xxs="4" className="mb-4">
                      <Label> {onChangeLanguage(locale,'Type',languageData)}<a style = {{color :'red'}}>*</a></Label>
                  </Colxx>
                  
                <Colxx xxs="8" className="mb-4">
                        <Select  className="react-select fontstyle"
                                classNamePrefix="react-select"
                                module="form-field-module"
                                value={type_data.filter(option =>option.value === type)}
                                options={type_data}
                                onChange={(option)=>this.setState({type:option.value})}
                                />
                    </Colxx>
                    
                </Row>
             }
        
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

