import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Input,Button} from 'reactstrap';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage} from '../../../../../helper'
import{issuecodeService} from '../../../../../redux/bookingamendment/issuecode/saga';
import { teamsService } from '../../../../../redux/teams/saga'
import Loading from "react-fullscreen-loading";
import Select from 'react-select';
import { areaService } from '../../../../../redux/area/saga';
import { regionService } from '../../../../../redux/region/saga'
import { getValue } from '../../../../../helper'

class RegisterUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id:0,
      issure_code:'',
      team: '',
      region:'',
      area:'',
      geo_code:'',
      team_data: [],
      areadata:[],
      regiondata:[],
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
        issure_code:record.issue_code,
        team:record.team,
        area:record.area,
        region:record.region,
        geo_code:record.geo_code,
        status: record.status,
        isEdit:true
      })
     
    } 
    this.fetchteam()  
    this.fetcharea()
    this.fetchregion() 
  }

  fetchteam() {
    this.setState({ loading: true })
    teamsService.fetchteams()
      .then((res) => {
        this.setState({ loading: false })
        if (res.status) {
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function (cusmaidid) {
            return {
              label: (cusmaidid.name + '-' + cusmaidid.country_code),
              value: cusmaidid.name, area: cusmaidid.area, country_code: cusmaidid.country_code,
              region: cusmaidid.region,geo_code:cusmaidid.country_code
            };
          });
          this.setState({
            team_data: regionlist,
          })
        }
      })
      .catch((error) => { this.setState({ loading: false }) });
  }
  fetchregion() {
    regionService.fetchregion()
      .then((res) => {
        if (res.status) {
          // let filterstatus = (res.data).filter(item => item.status === 1)
          let filterstatus = res.data
          var regionlist = filterstatus.map(function (cusmaidid) {
            return { label: cusmaidid.region, text: cusmaidid.region, value: cusmaidid.id.toString() };
          });
          this.setState({
            regiondata: regionlist,
          })
        }
        else {
          this.setState({ loading: false })
        }
      })
      .catch((error) => { });
  }
  fetcharea() {
    areaService.fetcharea()
      .then((res) => {
        if (res.status) {
          // let filterstatus = (res.data).filter(item => item.status === 1)
          let filterstatus = res.data
          var regionlist = filterstatus.map(function (cusmaidid) {
            return {
              label: cusmaidid.name,
              value: cusmaidid.id.toString(), region: cusmaidid.region
            };
          });
          this.setState({
            areadata: regionlist,
          })
        }
        else {
          this.setState({ loading: false })
        }
      })
      .catch((error) => { });
  }
onSubmit() { 
  const {id,issure_code, team,region,area,geo_code,status,isEdit} = this.state;

  if(issure_code !== "")
  {
    if(isEdit === true)
    {
      this.updateAPI(id,issure_code,team,region,area,geo_code,status)
    }
    else
    {
      this.createAPI(issure_code,team,region,area,geo_code,status)
    }
   
  }
  else
  {
    createNotification('Please fill mandatory field','error','filled')
  }
 
}
createAPI(issure_code,team,region,area,geo_code,status)
{
  this.setState({
    loading : true
  })
  issuecodeService.createapi(issure_code,team,region,area,geo_code,status)
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
updateAPI(id,issure_code,team,region,area,geo_code,status)
{
  this.setState({
    loading : true
  })
  issuecodeService.updateapi(id,issure_code,team,region,area,geo_code,status)
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
handlechangeteam = (selectedOptions) => {
  const {areadata,regiondata,team_data}=this.state
  this.setState({
    team : selectedOptions.value,
    region:getValue(regiondata, 'value', 'label', selectedOptions.region),
    area:getValue(areadata, 'value', 'label', selectedOptions.area),
    geo_code:selectedOptions.geo_code,
    })  
}
  render()
  {
  
    const {issure_code,team,region,area,geo_code,team_data,isEdit,status,loading} = this.state
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
                   <Label> {onChangeLanguage(locale,'Issuer Code',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Issuer Code',languageData)} 
                        value = {issure_code}  
                        onChange= {(e)=>this.setState({issure_code : e.target.value})} ></Input>
                 </Colxx>
                
             </Row>
             {/* <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Geo Code',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Geo Code',languageData)} 
                        value = {geo_code}  
                        onChange= {(e)=>this.setState({geo_code : e.target.value})} ></Input>
                 </Colxx>
                
             </Row> */}
             <Row>
              <Colxx xxs="4" className="mb-4">
               <Label className = "fontstyle">{onChangeLanguage(locale,'Team',languageData)}
               <a style = {{color :'red'}}>*</a>
               </Label>
               </Colxx>
               <Colxx xxs="8" className="mb-4">
                  <Select className = "fontstyle react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    placeholder= {onChangeLanguage(locale,'Team',languageData)}
                    value={team_data.filter(option =>option.value === team)}
                    options={team_data}
                    onChange={this.handlechangeteam}
                    // onChange={({value}) => this.setState({  team: value })}
                  />
               </Colxx>
           </Row>
           <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Area',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Area',languageData)} 
                        value = {area}  
                        disabled ></Input>
                 </Colxx>
                
             </Row>
             <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label> {onChangeLanguage(locale,'Region',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Region',languageData)} 
                        value = {region}  
                        disabled ></Input>
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

