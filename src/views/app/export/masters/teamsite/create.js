import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Input,Button} from 'reactstrap';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage} from '../../../../../helper'
import{teamsiteService} from '../../../../../redux/Export/masters/teamsite/saga'
import{teamService} from '../../../../../redux/Export/masters/exportteam/saga'
import Loading from "react-fullscreen-loading";
import Select from 'react-select';

class RegisterUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id:0,
      customer :'',
      origin :'',
      country: '',
      team_data: [],
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
        customer :record.customer ,
        origin :record.origin ,
        country :record.country ,
        team:record.team,
        status: record.status,
        isEdit:true
      })
     
    } 
    this.fetchteam()   
  }



  fetchteam() {
    this.setState({loading:true})
    teamService.fetchteams()
    .then((res) => {
       if(res.status)   { 
         console.log(res,'resssssssssssssss')
           let filterstatus = (res.data).filter(item => item.status === 1)
             var teams = filterstatus.map(function(response) {
                  return  {label : response.team_name ,value : response.id.toString()};
               });  
                this.setState({
                team_data :  teams,
                loading:false
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})
 }  

onSubmit() { 
  const {id,customer,country,origin ,team,status,isEdit} = this.state;

  if(customer  !== "" && team !== '')
  {
    if(isEdit === true)
    {
      this.updateAPI(id,customer,origin,country ,team,status)
    }
    else
    {
      this.createAPI(customer,origin,country ,team,status)
    }
   
  }
  else
  {
    createNotification('Please fill mandatory field','error','filled')
  }
 
}
createAPI(customer,origin,country ,team,status)
{
  this.setState({
    loading : true
  })
  teamsiteService.createteamsite(customer,origin,country ,team,status)
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
updateAPI(id,customer,origin,country ,team,status)
{
  this.setState({
    loading : true
  })
  teamsiteService.updateteamsite(id,customer,origin,country ,team,status)
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
  
    const {customer,origin,country ,team,team_data,isEdit,status,loading} = this.state
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
               <Label className = "fontstyle">{onChangeLanguage(locale,'Team',languageData)}
               <a style = {{color :'red'}}>*</a>
               </Label>
               </Colxx>
               <Colxx xxs="8" className="mb-4">
                  <Select className = "fontstyle"
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    placeholder= {onChangeLanguage(locale,'Team',languageData)}
                    value={team_data.filter(option =>option.value === team)}
                    options={team_data}
                    onChange={({value}) => this.setState({  team: value })}
                  />
               </Colxx>
           </Row>
     
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Customer Title',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Customer Title',languageData)} 
                        value = {customer }  
                        onChange= {(e)=>this.setState({customer  : e.target.value})} ></Input>
                 </Colxx>
                
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Origin Title',languageData)}</Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Origin Title',languageData)} 
                        value = {origin }  
                        onChange= {(e)=>this.setState({origin  : e.target.value})} ></Input>
                 </Colxx>
                
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Country Title',languageData)}</Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Country Title',languageData)} 
                        value = {country }  
                        onChange= {(e)=>this.setState({country  : e.target.value})} ></Input>
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

