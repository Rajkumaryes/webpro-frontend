import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Input,Button} from 'reactstrap';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage} from '../../../../../helper';
import{tendersubactivityService} from '../../../../../redux/projectmasters/tendersubactivity/saga';
import{tenderactivityService} from '../../../../../redux/projectmasters/tenderactivity/saga';
import Select from 'react-select';

import Loading from "react-fullscreen-loading";
class RegisterUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id:0,
      name:'',
      activity:'',
      status : 1,
      activitydata:[],
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
        activity:record.activity,
        status: record.status,
        isEdit:true
      })
     
    }   
    this.fetchactivity() 
  }
  fetchactivity() {
    tenderactivityService.fetchtenderactivity()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1 && item.is_subactivity === true)
             var rolelist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
               });  
                this.setState({
                activitydata :  rolelist,
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
  } 
onSubmit() { 
  const {id,name,activity,status,isEdit} = this.state;

  if(name !== "")
  {
    if(isEdit === true)
    {
      this.updateAPI(id,name,activity,status)
    }
    else
    {
      this.createAPI(name,activity,status)
    }
   
  }
  else
  {
    createNotification('Please fill mandatory field','error','filled')
  }
 
}
createAPI(name,activity,status)
{
  this.setState({
    loading : true
  })
  tendersubactivityService.createtendersubactivity(name,activity,status)
    .then((res) => { 
      this.setState({   
        loading : false     
      }) 
      if(res.status)
        {
          createNotification('Created','success','filled')
          this.close(true)
        }else{
          createNotification(res.message,'error','filled')
        }                
  
  })
  .catch((error) => { 
    this.setState({
      loading : false
    })
  });
   
}
updateAPI(id,name,activity,status)
{
  this.setState({
    loading : true
  })
  tendersubactivityService.updatetendersubactivity(id,name,activity,status)
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

  render()
  {
  
    const {name,isEdit,status,activity,activitydata,loading} = this.state
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
                   <Label> {onChangeLanguage(locale,'Activity',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
            <Select className = "fontstyle"
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    placeholder= {onChangeLanguage(locale,'Activity',languageData)}
                    value={activitydata.filter(option =>option.value === activity)}
                    options={activitydata}
                    onChange={({value}) => this.setState({  activity: value })}
                  />
                 </Colxx>
                
             </Row>
             {/* <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Sub Activity',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Sub Activity',languageData)} 
                        value = {name}  
                        onChange= {(e)=>this.setState({name : e.target.value})} ></Input>
                 </Colxx>
                
             </Row> */}
             
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

