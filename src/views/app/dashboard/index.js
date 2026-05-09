import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row ,Button, 
    ButtonDropdown,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle, } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { onChangeLanguage } from '../../../helper'
import ExportDashboard from './export'
import {Export , DG ,Import ,Epos ,Supportteam ,AP,SQ,BookingProcess,FA,RA,
  MIS,ASIA,Tender,DnD,PactKPI,QA,Railnotification,DisputeProcess,FeedersSchedules} from '../../../constants/defaultValues'

class QueryResolveSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      menu_data:[
        {label:'Exports',value:Export},
        {label:'Imports',value:Import},
        {label:'EPOS',value:Epos},
        {label:'DG',value:DG},
        {label:'Asia Reporting',value:ASIA},
        {label:'AP',value:AP},
        {label:'Detention Demurrage',value:DnD},
        {label:'Feeder Schedules',value:FeedersSchedules},
        {label:'FA',value:FA},
        {label:'RA',value:RA},
        {label:'SQ',value:SQ},
        {label:'QA',value:QA},
        {label:'MIS QSC',value:MIS},
        {label:'Support Team',value:Supportteam},
        {label:'PACT KPI',value:PactKPI},
        {label:'Rail Notification',value:Railnotification},
        {label:'Tender',value:Tender},
        {label:'Dispute Process',value:DisputeProcess},
        {label:'Booking Process',value:BookingProcess},
      ],
      menu:'Exports',
      apiname:Export

     
    };
  }
  componentDidMount() {

  }
  
 onClickTab(menu,apiname)
 {
    this.setState({
        menu:'',
        apiname: ''
    })
    setTimeout(() => {
      this.setState({
        menu:menu,
        apiname:apiname
    })
    }, 100);
  
   
 }
  render() {
    const { match, locale, languageData } = this.props
    const {menu_data,menu,apiname } = this.state
   
    return (
      <>
        <title>{onChangeLanguage(locale, 'Dashboard', languageData)}</title>
        <Row>
          <Colxx xxs="12">
          <Row>
             <Colxx xxs="10">
               <Breadcrumb heading={onChangeLanguage(locale, 'Dashboard', languageData)} match={match} />
             </Colxx>
             <Colxx xxs="2">
                <div className="d-block d-md-inline-block pt-1">
                  <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                    <DropdownToggle caret color="primary" className="button-width" style={{width:'100%'}}>
                      {menu}
                    </DropdownToggle>
                    <DropdownMenu style={{height:'300px',overflowY:'auto'}}>
                    {menu_data && menu_data.map((value,index) =>
                        <DropdownItem  key={value.label} onClick={() => this.onClickTab(value.label,value.value)}> {value.label}</DropdownItem>
                        )}
                    </DropdownMenu>
                  </UncontrolledDropdown>

                </div>
           
            
             </Colxx>
            
          </Row>
          
            
            <Separator className="separator-margin" />
          </Colxx>
          {menu !== '' && 
              <div style={{width:'98%'}}>
              <ExportDashboard  API_NAME = {apiname} MENU = {menu}/>
            </div>
          }
        
        </Row>
      </>
    )
  }


}

const mapStateToProps = ({ settings }) => {
  const { locale, languageData, username } = settings;
  return { locale, languageData, username };
};
export default withRouter(
  connect(mapStateToProps, {

  })(QueryResolveSheet)
);

