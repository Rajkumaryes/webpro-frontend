import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Input,Button} from 'reactstrap';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage} from '../../../../../helper'
import{subactivityService} from '../../../../../redux/FeedersSchedules/feedermaster/subactivity/saga'
import Loading from "react-fullscreen-loading";
import{ActivityselectionService} from '../../../../../redux/FeedersSchedules/feedermaster/activityselection/saga'
import Select from 'react-select';

class RegisterUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id:0,
      name:'',
      status : 1,
      activityselection:'',
      activityselectiondata:[],
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
        activityselection:record.activityselection,
        status: record.status,
        isEdit:true
      })
     
    }  
    this.fetchactivityselection()  
  }
  fetchactivityselection() {
    ActivityselectionService.fetchactivityselection()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var arealist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                activityselectiondata :  arealist,
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
  } 
onSubmit() { 
  const {id,name,activityselection,status,isEdit} = this.state;

  if(name !== "")
  {
    if(isEdit === true)
    {
      this.updateAPI(id,name,activityselection,status)
    }
    else
    {
      this.createAPI(name,activityselection,status)
    }
   
  }
  else
  {
    createNotification('Please fill mandatory field','error','filled')
  }
 
}
createAPI(name,activityselection,status)
{
  this.setState({
    loading : true
  })
  subactivityService.createsubactivity(name,activityselection,status)
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
updateAPI(id,name,activityselection,status)
{
  this.setState({
    loading : true
  })
  subactivityService.updatesubactivity(id,name,activityselection,status)
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
  
    const {name,isEdit,status,activityselection,activityselectiondata,loading} = this.state
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
              <Label> {onChangeLanguage(locale,'Activity Selection',languageData)}<a style = {{color :'red'}}>*</a></Label>
            </Colxx>
            <Colxx xxs="8" className="mb-4">
            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={activityselectiondata.filter(option =>option.value === activityselection)}
                        options={activityselectiondata}
                        onChange={({value}) => this.setState({  activityselection: value })}
                      />
            </Colxx>
             </Row>
             <Row>
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

