import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Input,Button} from 'reactstrap';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage} from '../../../../../helper';
import{checklistactivityService} from '../../../../../redux/imports/checklistday/saga';
import{checklistService} from '../../../../../redux/imports/checklist/saga';
import Loading from "react-fullscreen-loading";
import Select from 'react-select';
import{areaimportService} from '../../../../../redux/imports/areaimport/saga';

class RegisterUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id:0,
      checklist_id:'',
      eta:'',
      eq:'',
      kpi:'',
      area:'',
      activity: '',
      status : 1,
      checklist_data: [],
      area_Data: [],
      isEdit:false,
      loading:false
    };
  }

  componentDidMount() {
    const {isEdit,record} = this.props
    if(isEdit === true)
    {
      console.log("kjvkjv " , JSON.stringify(record))
      this.setState({
        id:record.id,
        checklist_id:record.checklist_id,
        eta: record.eta,
        eq:record.eq,
        kpi:record.kpi,
        area:record.area,
        activity:record.activity,
        status: record.status,
        isEdit:true
      })
      this.fetchchecklist(record.area);
    } 
   
     this.fetcharea()
  }

  fetchchecklist(id) {
    this.setState({loading:true})
    checklistService.fetchchecklisttaemWise(id)
    .then((res) => {
      this.setState({loading:false})
       if(res.status)   { 
           let filterstatus = (res.data).filter(item => item.status === 1)
             var checklist = filterstatus.map(function(response) {
                  return  {label : response.type ,value : response.id.toString()};
               });  
                this.setState({
                checklist_data :  checklist,
                loading:false
                })
             }
             })
             .catch((error) => { }); 
             this.setState({loading:false})
 }
 

 fetcharea() {
  this.setState({loading:true})
  areaimportService.fetchareaimport()
  .then((res) => {
     if(res.status)   { 
         let filterstatus = (res.data).filter(item => item.status === 1)
           var arealist = filterstatus.map(function(response) {
                return  {label : response.area_name ,value : response.id.toString()};
             });  
              this.setState({
              area_Data :  arealist,
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
  const {id,checklist_id,activity,eta,eq,kpi,area,status,isEdit} = this.state;

  if(checklist_id !== "" && activity !== "" && eta !== "" && eq !=="" && kpi !=="" && area!=="")
  {
    if(isEdit === true)
    {
      this.updateAPI(id,checklist_id,activity,eta,eq,kpi,area,status)
    }
    else
    {
      this.createAPI(checklist_id,activity,eta,eq,kpi,area,status)
    }
   
  }
  else
  {
    createNotification('Please fill mandatory field','error','filled')
  }
 
}
createAPI(checklist_id,activity,eta,eq,kpi,area,status)
{
  this.setState({
    loading : true
  })
  checklistactivityService.createchecklistactivity(checklist_id,activity,eta,eq,kpi,area,status)
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
updateAPI(id,checklist_id,activity,eta,eq,kpi,area,status)
{
  this.setState({
    loading : true
  })
  checklistactivityService.updatechecklistactivity(id,checklist_id,activity,eta,eq,kpi,area,status)
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
handlechangeArea(value)
{
  this.setState({  area: value,checklist_data:[],checklist_id:'' })
  this.fetchchecklist(value)
}
  render()
  {
  
    const {checklist_id,activity,eta,eq,kpi,area,isEdit,status,checklist_data,area_Data,loading} = this.state
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
                   <Label className = "fontstyle"> {onChangeLanguage(locale,'Team',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
              <Colxx xxs="8" className="mb-4">
                  <Select className = "fontstyle"
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    placeholder= {onChangeLanguage(locale,'Team',languageData)}
                    value={area_Data.filter(option =>option.value === area)}
                    options={area_Data}
                    onChange={({value}) =>this.handlechangeArea(value)}
                  />
               </Colxx>
                
             </Row>
            <Row>
              <Colxx xxs="4" className="mb-4">
               <Label className = "fontstyle">{onChangeLanguage(locale,'Check List',languageData)}
               <a style = {{color :'red'}}>*</a>
               </Label>
               </Colxx>
               <Colxx xxs="8" className="mb-4">
                  <Select className = "fontstyle"
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    placeholder= {onChangeLanguage(locale,'Check List',languageData)}
                    value={checklist_data.filter(option =>option.value === checklist_id)}
                    options={checklist_data}
                    onChange={({value}) => this.setState({  checklist_id: value })}
                  />
               </Colxx>
           </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'ETA',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'ETA',languageData)} 
                        value = {eta}  
                        onChange= {(e)=>this.setState({eta : e.target.value})} ></Input>
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

             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'KPI',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'KPI',languageData)} 
                        value = {kpi}  
                        onChange= {(e)=>this.setState({kpi : e.target.value})} ></Input>
                 </Colxx>
                
             </Row>


            

             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Activity Name',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Activity',languageData)} 
                        value = {activity}  
                        onChange= {(e)=>this.setState({activity : e.target.value})} ></Input>
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

