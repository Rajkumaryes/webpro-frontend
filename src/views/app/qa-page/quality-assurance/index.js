import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import {onChangeLanguage} from '../../../../helper'
import InputAudit from './input'
import SurpriseCorrectionAudit from './Surprise'
import SDEMWithdrawn from './SDEMWithdrawn'
import MatchCode from './matchcode'
import DestinationAudit from './destination'
import ErrorCode from './error'
import MAFAudit from './maf_Audit'
import InstanceAudit from './instance_audit'
import OtherAudit1 from './other_audit1'
import OtherAudit2 from './other_audit2'


class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        typeofaudit:'',
        typeofauditdata:[
            {value:'Input Audit',label:'Input Audit'},
            {value:'Surprise Correction Audit',label:'Surprise Correction Audit'},
            {value:'SDEM Withdrawn Audit',label:'SDEM Withdrawn Audit'},
            {value:'Match Code Audit',label:'Match Code Audit'},
            {value:'Destination Audit',label:'Destination Audit'},
            {value:'Error Code Audit',label:'Error Code Audit'},
            {value:'MAF Audit',label:'MAF Audit'},
            {value:'1st Instance Audit',label:'1st Instance Audit'},
            {value:'Other Audit 1',label:'Other Audit 1'},
            {value:'Other Audit 2',label:'Other Audit 2'},
        ],
        
      };
    }
   
    handlechangeatypeofaudit = (selectedOptions) => {
        this.setState({typeofaudit : selectedOptions.value})  
    } 
    render()
    {
        const {match,locale,languageData,username} = this.props
        const {typeofaudit,typeofauditdata} = this.state
        return(
            <>
                <title>{onChangeLanguage(locale,'Quality Assurance',languageData)}</title>
                <Row>
                <Colxx xxs="12">
                    <Breadcrumb heading={onChangeLanguage(locale,'Quality Assurance',languageData)} match={match} />
                    <Separator className = "separator-margin"/>
                </Colxx>
                </Row>
                <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
               
               <div className = "row" style = {{marginBottom:'30px'}}>
                   <div className = "col-md-6 space-margin">
                       <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Types of Audit',languageData)}
                       <a style = {{color :'red'}}>*</a></Label>
                       <Select  
                        style={{height:'85px'}}
                       className="react-select fontstyle"
                       classNamePrefix="react-select"
                       name="form-field-name"
                       value={typeofauditdata.filter(option =>option.value === typeofaudit)}
                       options={typeofauditdata}
                       onChange={this.handlechangeatypeofaudit}
                       />
                   </div>
                   <div className = "col-md-6 space-margin">
                       <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Auditor Name',languageData)}
                       <br></br>{username}</Label>
                       
                   </div>
                  </div>   
               </div> 
               {typeofaudit === "Input Audit" && <InputAudit  title = {typeofaudit}/>}
               {typeofaudit === "Surprise Correction Audit" && <SurpriseCorrectionAudit  title = {typeofaudit}/>}
               {typeofaudit === "SDEM Withdrawn Audit" && <SDEMWithdrawn  title = {typeofaudit}/>}
               {typeofaudit === "Match Code Audit" && <MatchCode  title = {typeofaudit}/>}
               {typeofaudit === "Destination Audit" && <DestinationAudit  title = {typeofaudit}/>}
               {typeofaudit === "Error Code Audit" && <ErrorCode  title = {typeofaudit}/>}
               {typeofaudit === "MAF Audit" && <MAFAudit  title = {typeofaudit}/>}
               {typeofaudit === "1st Instance Audit" && <InstanceAudit  title = {typeofaudit}/>}
               {typeofaudit === "Other Audit 1" && <OtherAudit1  title = {typeofaudit}/>}
               {typeofaudit === "Other Audit 2" && <OtherAudit2  title = {typeofaudit}/>}
               
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

