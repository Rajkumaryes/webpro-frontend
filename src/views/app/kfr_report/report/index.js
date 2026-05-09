import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Button,Input} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import {onChangeLanguage,get_array_id} from '../../../../helper'
import moment from 'moment';
import Select from 'react-select';
import{roleService} from '../../../../redux/role/saga'
import { regionService } from '../../../../redux/region/saga'
import { areaService } from '../../../../redux/area/saga';
import{teamsService} from '../../../../redux/teams/saga'
import DatePicker from "../datePicker";
import{kfrreportService} from '../../../../redux/kfr_report/kfrreport/saga'

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        start_date:'',
        end_date:'',
        team_id:'',
        report:'',
        process:'',
        region:'',
        area:'',
        location:'',
        comparision:'',
        process_data:[],
        region_data:[],
        area_data:[],
        team_data:[],
        comparision_data:[
          {value:'Quarterly',label:'Quarterly'},
          {value:'Half-Yearly',label:'Half-Yearly'},
          {value:'Yearly',label:'Yearly'}
        ],
        is_submit:false,

      };
    }
    componentDidMount()
    {
      this.fetchteam()
      this.fetchmenuData()
      this.fetcharea()
      this.fetchregion()
  }

  fetchmenuData() {  
    this.setState({
      loading : true
    })
    roleService.fetchrolepermissionData()
    .then((res) => { 
      this.setState({   
    loading : false 
            
      }) 
      if(res.status === true)
        {
            if(res.data)
            {
              let filterstatus =(res.data).filter(item => (item.name !== 'KFR Report' && item.name !== 'Dashboard'
              && item.name !== 'Productivity Masters' && item.name !== 'General Master' && item.name !== 'General Master'))
                var menu = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.name};
                });   
              this.setState({
                process_data:menu
              })
            }
            
        }                
    
    })
    .catch((error) => { 
      this.setState({
        loading : false
      })
      });   
 }
 fetchregion() {
  regionService.fetchregion()
    .then((res) => {
      if (res.status) {
        let filterstatus = (res.data).filter(item => item.status === 1)
        var regionlist = filterstatus.map(function (cusmaidid) {
          return { label: cusmaidid.region, value: cusmaidid.id.toString() };
        });
        this.setState({
          region_data: regionlist,
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
        let filterstatus = (res.data).filter(item => item.status === 1)
        var regionlist = filterstatus.map(function (cusmaidid) {
          return {
            label: cusmaidid.name,
            value: cusmaidid.id.toString(), region: cusmaidid.region
          };
        });
        this.setState({
          area_data: regionlist,
        })
      }
      else {
        this.setState({ loading: false })
      }
    })
    .catch((error) => { });
}
fetchteam() {
  teamsService.fetchteams()
    .then((res) => {
      if (res.status) {
        let filterstatus = (res.data).filter(item => item.status === 1)
        var regionlist = filterstatus.map(function (cusmaidid) {
          return {
            label: cusmaidid.name,
            value: cusmaidid.name, area: cusmaidid.area
          };
        });
        this.setState({
          team_data: this.removeduplicatecolumns(regionlist) ,
        })
      }
      else {
        this.setState({ loading: false })
      }
    })
    .catch((error) => { });
}
removeduplicatecolumns(list){
  const output = [...new Map(list.map(o => [o.value, o])).values()] 
  return output
}
  clearValue()
  {
      this.setState({
          start_date:'',
          end_date:'',
          team_id:'',
          process:'',
          location:'',
          region:'',
          area:'',
          comparision:'',
          is_submit:false,
         
      })
  }
  onChangeTeam(value)
  {
      this.setState({  team_id: value })
  }
  onChangestarttime(date)
  {
    console.log("lklkgkjkv start_date " ,date)
    this.setState({start_date  : date,end_date:''})
   
  }
  
    onChangeendtime(date)
   {
      this.setState({end_date  : date})
   }
   fetchData()
   {
     const {end_date,start_date,team_id,process,region,area,location,comparision,
      process_data,region_data,area_data,team_data} = this.state

     if(start_date !== '' && end_date !== '')
     {
      var team_array =[] ,area_array = [],
      month_year_array = []
      const process_array = process !== '' ? [process] : get_array_id(process_data),
      region_array = region !== '' ? [region] : get_array_id(region_data)

      if(area !== '')
      {
        area_array = [area]
      }
      else
      {
        area_array = this.getArrValue(area_data, region_array, 'region')
      }
      if(team_id !== '')
      {
        team_array = [team_id]
      }
      else
      {
        team_array = this.getArrValue(team_data, area_array, 'area')
      }
      const start_year  = parseInt( moment(start_date).format('YYYY')),
      end_year =  parseInt( moment(end_date).format('YYYY'))
      const {username} = this.props
      const date_time = moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
      var year = end_year - start_year
      for(var i = 0; i <= year;i++)
      {

        if(comparision === '')
        {
          month_year_array.push('Jan-'+ (start_year + i))
          month_year_array.push('Feb-'+ (start_year + i))
          month_year_array.push('Mar-'+ (start_year + i))
          month_year_array.push('Apr-'+ (start_year + i))
          month_year_array.push('May-'+ (start_year + i))
          month_year_array.push('Jun-'+ (start_year + i))
          month_year_array.push('Jul-'+ (start_year + i))
          month_year_array.push('Aug-'+ (start_year + i))
          month_year_array.push('Sep-'+ (start_year + i))
          month_year_array.push('Oct-'+ (start_year + i))
          month_year_array.push('Nov-'+ (start_year + i))
          month_year_array.push('Dec-'+ (start_year + i))

        }
        else
        {

          if(comparision === 'Quarterly')
          {
            month_year_array.push('Q1-'+ (start_year + i))
            month_year_array.push('Q2-'+ (start_year + i))
            month_year_array.push('Q3-'+ (start_year + i))
            month_year_array.push('Q4-'+ (start_year + i))
          }
          else if(comparision === 'Half-Yearly')
          {
            month_year_array.push('H1-'+ (start_year + i))
            month_year_array.push('H2-'+ (start_year + i))
          }
          else if(comparision === 'Yearly')
          {
            month_year_array.push('Y1-'+ (start_year + i))
          }

        }
        
      }

      createNotification('Download is processing...','primary','filled');
      kfrreportService.fetchapi(region_array,area_array,team_array,process_array,start_year,
         end_year,month_year_array,location,comparision,username,date_time)
        .then((res) => { 
          this.setState({   
             loading : false 
                
          }) 
          if(res.status === true)
            {
              createNotification('Report Generated.','success','filled');
            }  
            else
            { 
              createNotification(res.message,'error','filled');
            }         
      
      })
      .catch((error) => { 
        this.setState({
          loading : false
        })
        }); 
     }
     else
     {

      this.setState({
        is_submit:true
      })
      createNotification('Please choose Mandatory Field','error','filled');
     }

   }
   getArrValue(array, array1, key) {
    var list = []
    for(var i = 0; i<array.length;i++)
    {
      for(var j = 0; j<array1.length;j++)
      {
          if(array[i][key] === array1[j])
          {
            list.push(array[i].value)
          }
      }
    
    }

    return list
  }

  getArrayValue(array, value, key) {
    var list = []
    if (array && array !== null && value !== '' && value !== null) {
      list = array.filter(item => item[key] === value)
    }
    return list
  }

 
 
 
    render()
    {
        const {match,locale,languageData} = this.props
        const {end_date,start_date,team_id,team_data,is_submit,loading,process,region,area,location,comparision,
          region_data,area_data,comparision_data,process_data} = this.state
    
        return (
            <>
            <title>{onChangeLanguage(locale,'KFR Report',languageData)}</title>
            <Row>
              <Colxx xxs="12">
              <Row>
             <Colxx xxs="8">
             <Breadcrumb heading={onChangeLanguage(locale,'KFR Report',languageData)} match={match} />
             </Colxx>
             <Colxx xxs="4">
             
             </Colxx>
          </Row>
        <Separator className = "separator-margin"/>
      </Colxx>   
      </Row>
            {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <div>
            <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                          <div className = "row" style = {{padding:'10px'}}>
                          <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Start Year',languageData)}<a style = {{color :'red'}}>*</a>
                                    {(is_submit === true && start_date === '')  && <a className ="fontstyle mandatory-label">{onChangeLanguage(locale,'Mandatory Field',languageData)}</a>}</Label>
                                    
                                    <DatePicker
                                    selected={start_date}
                                    className = "text-background"
                                    onChange={(date) => this.onChangestarttime(date)}
                                    />
                                
                            </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'End Year',languageData)}<a style = {{color :'red'}}>*</a>
                                    {(is_submit === true && end_date === '')  && <a className ="fontstyle mandatory-label">{onChangeLanguage(locale,'Mandatory Field',languageData)}</a>}</Label>
                                  
                                    <DatePicker
                                    selected={end_date}
                                    min_date= {start_date}
                                    className = "text-background"
                                    onChange={(date) => this.onChangeendtime(date)}
                                    />
                                </div>
                          <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Comparision',languageData)}</Label>
                                        <Select  className="react-select fontstyle"
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={comparision_data.filter(option =>option.value === comparision)}
                                            options={comparision_data}
                                            onChange={({value}) => this.setState({  comparision: value })}
                                        />
                                </div>
                          <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Process',languageData)}</Label>
                                        <Select  className={"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={process_data.filter(option =>option.value === process)}
                                            options={process_data}
                                            onChange={({value}) => this.setState({  process: value })}
                                        />
                                </div>
                               
                                <div className = "col-md-3 space-margin"  >
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Region',languageData)}</Label>
                                        <Select  className={"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={region_data.filter(option =>option.value === region)}
                                            options={region_data}
                                            onChange={({value}) => this.setState({  region: value,area:'' })}
                                        />
                                
                            </div>
                            <div className = "col-md-3 space-margin"  >
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Area',languageData)}</Label>
                                        <Select  className={"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={area_data.filter(option =>option.value === area)}
                                            options={this.getArrayValue(area_data, region, 'region')}
                                            onChange={({value}) => this.setState({  area: value })}
                                        />
                                
                            </div>
                            <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Team',languageData)}</Label>
                                        <Select  className={"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={team_data.filter(option =>option.value === team_id)}
                                            options={this.getArrayValue(team_data, area, 'area')}
                                            onChange={(option) => this.onChangeTeam(option.value)}
                                        />
                                </div>
                            <div className = "col-md-3 space-margin"  >
                                <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Location',languageData)}</Label>
                                         <Input className = {"fontstyle text-background" }  
                                        placeholder={onChangeLanguage(locale, 'Location', languageData)}
                                        value={location}
                                        onChange={(e) => this.setState({ location: e.target.value })} />
                                </div>
                               
                               
                             </div>
                             <div className = "text-center" style = {{padding:'0px 0px 20px'}}>
                               <Button className = "button-width" color="secondary" 
                                onClick={()=>this.fetchData()} >
                                  <i className = "simple-icon-cloud-download" style = {{marginRight:'5px'}}/>
                                  {onChangeLanguage(locale,'Download',languageData)}</Button> 

                                  <Button className = "button-width" color="secondary" 
                                onClick={()=>this.clearValue()}
                                >{onChangeLanguage(locale,'Refresh',languageData)}</Button> 
                                  
                            </div>
                             
                
                </div> 
              
              </div>
          </>
        )
    }
}

const mapStateToProps = ({ settings }) => {
    const { locale,languageData,username} = settings;
    return {locale, languageData,username};
  };
  export default withRouter(
    connect(mapStateToProps, {

   })(QueryResolveSheet)
  );

