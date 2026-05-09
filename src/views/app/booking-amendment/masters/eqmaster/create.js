import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Input,Button} from 'reactstrap';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage,getValue} from '../../../../../helper'
import{eqmasterService} from '../../../../../redux/bookingamendment/eqmaster/saga'
import Loading from "react-fullscreen-loading";
import Select from 'react-select';
import{issuecodeService} from '../../../../../redux/bookingamendment/issuecode/saga';
import{amendmentmediumService} from '../../../../../redux/bookingprocess/amendmentmedium/saga'

import{pendingexceptiontypeService} from '../../../../../redux/bookingprocess/pendingexceptiontype/saga'
class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:0,
      module: '',
      eq:'',
      name:'',
      region:'',
      team:'',
      area:'',
      status : 1,
      module_data:[
        {value:'Booking Creation Original',label:'Booking Creation Original'},
        {value:'CRM Process',label:'CRM Process'},
        {value:'Email Handling',label:'Email Handling'},
        {value:'DOC Exception',label:'DOC Exception'},
        {value:'Error Capturing',label:'Error Capturing'},
        {value:'AF Exceptions',label:'AF Exceptions'},
        {value:'Booking Amendment',label:'Booking Amendment'},
        {value:'Pending Follow-up Sheet',label:'Pending Follow-up Sheet'},
       ],
       regiondata:[],
       team_data:[],
       teamdata:[],
       exception_type_data:[],
       amendment_medium_data:[],
      isEdit:false,
      loading:false
    };
  }

  componentDidMount() {
   this.fetchissie()
   this.fetchexception()
   this.fetchamendmentmedium()
   const {teamdata}=this.state
    const {isEdit,record} = this.props
    if(isEdit === true)
    {
      this.setState({
        id:record.id,
        name:record.name,
        module:record.menu,
        team:record.team,
        region:record.region,
        eq:record.unit,
        area:getValue(teamdata, 'value', 'area',record.region),
        status: record.status,
        isEdit:true
      })
      this.fetchregion()
    }  
    }
    fetchamendmentmedium() {
      this.setState({ loading: true })
      amendmentmediumService.fetchapi()
        .then((res) => {
          this.setState({ loading: false })
          if (res.status) {
            let filterstatus = (res.data).filter(item => item.status === 1)
            var regionlist = filterstatus.map(function (cusmaidid) {
              return {
                label: cusmaidid.name ,value: cusmaidid.id.toString()
              };
            });
            this.setState({
              amendment_medium_data: regionlist,
            })
          }
        })
        .catch((error) => { this.setState({ loading: false }) });
    }
    fetchissie() {  
      this.setState({
        loading : true
      })
      issuecodeService.fetchapi()
        .then((res) => { 
          this.setState({   
        loading : false 
                
          }) 
          if(res.status)
            {
              let filterstatus = (res.data).filter(item => item.status === 1)
              var regionlist = filterstatus.map(function (cusmaidid) {
                return { label: cusmaidid.region, value: cusmaidid.id.toString(),text: cusmaidid.region };
              });
              
              var teamlist = filterstatus.map(function (cusmaidid) {
                console.log("cusmaidid",cusmaidid)
                return {
                  label: cusmaidid.team, text: cusmaidid.name,
                  value: cusmaidid.id.toString(), region: cusmaidid.region,
                  area: cusmaidid.area,
                };
              });
              var eallyUniqueArr =  regionlist.filter((v,i,a)=>a.findIndex(t=>(t.label === v.label && t.label===v.label))===i)
              var teamUniqueArr =  teamlist.filter((v,i,a)=>a.findIndex(t=>(t.label === v.label && t.label===v.label))===i)
           
              this.setState({
                regiondata: eallyUniqueArr,
                team_data:teamUniqueArr,

              })
            
            }   else
            {
              this.setState({ 
                data:[]  , 
                         
              }) 
            }               
      
      })
      .catch((error) => { 
        this.setState({
          loading : false
        })
        });   
   }
   fetchregion() {  
    this.setState({
      loading : true
    })
    issuecodeService.fetchapi()
      .then((res) => { 
        this.setState({   
      loading : false 
              
        }) 
        if(res.status)
          {
            let filterstatus = (res.data).filter(item => item.status === 1)
          
            var teamlist = filterstatus.map(function (cusmaidid) {
              return {
                label: cusmaidid.team, text: cusmaidid.name,
                value: cusmaidid.id.toString(), region: cusmaidid.region,
                area: cusmaidid.area,
              };
            });
            var teamUniqueArr =  teamlist.filter((v,i,a)=>a.findIndex(t=>(t.label === v.label && t.label===v.label))===i)
            this.setState({
              teamdata:teamUniqueArr,

            })
          
          }   else
          {
            this.setState({ 
              data:[]  , 
                       
            }) 
          }               
    
    })
    .catch((error) => { 
      this.setState({
        loading : false
      })
      });   
 }
   fetchexception() {
    this.setState({loading:true})
    pendingexceptiontypeService.fetchapi()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = res.data
             var statuslist = filterstatus.map(function(response) {
                  return  {label : response.name ,value : response.id.toString()};
               });  
                this.setState({
                  exception_type_data :  statuslist
                })
               
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})
 } 
onSubmit() { 
  const {id,name,eq,module,region,team,status,isEdit} = this.state;

  if(eq!=="" && name !== '')
  {
    if(isEdit === true)
    {
      this.updateAPI(id,module,name,eq,region,team,status)
    }
    else
    {
      this.createAPI(module,name,eq,region,team,status)
    }
   
  }
  else
  {
    createNotification('Please fill mandatory field','error','filled')
  }
 
}
createAPI(module,name,eq,region,team,status)
{
  this.setState({
    loading : true
  })
  eqmasterService.createeqmaster(module,name,eq,region,team,status)
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
updateAPI(id,module,name,eq,region,team,status)
{
  this.setState({
    loading : true
  })
  eqmasterService.updateeqmaster(id,module,name,eq,region,team,status)
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
getacitivity=(module) =>
{
  const {error_handleactivity,tpfrepactivitydata,timepending_activitydata,adhocactivitydata}=this.state
  var list = []
  if( module !== null && module === "Error Handling Productivity")
  {
    list =error_handleactivity
  } 
  if( module !== null && module === "TPFREP Productivity"){
    list =tpfrepactivitydata
  }
  if( module !== null && module === "Time Pending Monitoring"){
    list =timepending_activitydata
  }
  else if( module !== null && module === "Adhoc / Bulk Upload Productivity"){
    list =adhocactivitydata
  }
 return list
}
getArrayValue(array, value, key) {
    console.log("array",array)
    console.log("value",value)
    console.log("key",key)
  var list = []
  if (array && array !== null && value !== '' && value !== null) {
    list = array.filter(item => item[key] === value)
  }
  console.log("list",list)
  return list
}
handlechangeregion = (selectedOptions) => {
  const {team_data}=this.state
  this.setState({
    region : selectedOptions.value,
    teamdata:this.getArrayValue(team_data, selectedOptions.label, 'region')
    })  
}
handlechangearea = (selectedOptions) => {
  const {team_data}=this.state
  console.log("team_data",team_data)
  console.log("selectedOptions",selectedOptions)
  this.setState({
    team : selectedOptions.value,
    area:getValue(team_data, 'value', 'area', selectedOptions.value)
    })  
}

  render()
  {
  
    const {module,name,module_data,eq,area,exception_type_data,amendment_medium_data,region,team,regiondata,teamdata,isEdit,status,loading} = this.state
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
                   <Label> {onChangeLanguage(locale,'Exception type',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
            <Colxx xxs="8" className="mb-4">
            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={module_data.filter(option =>option.value === module)}
                        options={module_data}
                        onChange={({value}) => this.setState({  module: value })}
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
                   <Label> {onChangeLanguage(locale,'EQ',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="number"
                        placeholder = {onChangeLanguage(locale,'EQ',languageData)} 
                        value = {eq}  
                        onChange= {(e)=>this.setState({eq : e.target.value})} ></Input>
                 </Colxx>
                
             </Row>
             <Row>
             <Colxx xxs="4" className="mb-4">
              <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Region Name',languageData)}</Label>
              </Colxx>
            <Colxx xxs="8" className="mb-4">
                            <Select
                            className = {"react-select fontstyle" }  
                            classNamePrefix="react-select"
                            name="form-field-name"
                            placeholder={onChangeLanguage(locale, 'Region', languageData)}
                            value={regiondata.filter(option => option.value === region)}
                            options={regiondata}
                            onChange={this.handlechangeregion}
                            // onChange={({ label }) => this.setState({ region: label, area: '', sub_area: '' })}
                          />
                          </Colxx>
                        </Row>
                        <Row>
                        <Colxx>
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Sub Area Name',languageData)}</Label>
                            </Colxx>
                        <Colxx xxs="8" className="mb-4">
                            <Select
                            className = {"react-select fontstyle" }  
                              classNamePrefix="react-select"
                              name="form-field-name"
                              placeholder={onChangeLanguage(locale, 'Sub Area', languageData)}
                              value={teamdata.filter(option => option.value === team)}
                              options={teamdata}
                              onChange={this.handlechangearea}
                              // onChange={({ value }) => this.setState({ team: value })}
                            />
                            </Colxx>
                        </Row>
                        <Row>
                        <Colxx>
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Area',languageData)}</Label>
                            </Colxx>
                        <Colxx xxs="8" className="mb-4">
                        <Input 
                        placeholder = {onChangeLanguage(locale,'Area',languageData)} 
                        value = {area} 
                        disabled 
                        // onChange= {(e)=>this.setState({area : e.target.value})} 
                        ></Input>
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


