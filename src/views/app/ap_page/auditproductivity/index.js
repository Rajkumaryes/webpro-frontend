import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import DatePicker from "react-datepicker";
import "../../mis-qa-page/supportteam/node_modules/react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import {onChangeLanguage} from '../../../../helper'

class Sidebar extends Component {
    constructor(props) {
      super(props);
      this.state = {

        region:'',
        type:'',
        container_no:'',
        unit: '',
        tat_time: '',
        received_time:'',
        changes:'',
        pc:'',cc:'',
        customtypedata:[]
      };
    }
    handlecustomtype = (selectedOptions) => {
        this.setState({region : selectedOptions.value})  
      }  
    render()
    { 
        const{region,type,container_no,unit,tat_time,customtypedata,received_time,
        cc,pc,changes}=this.state
        const {match,locale,languageData} = this.props
        return (
            <>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading="Audit Productivity" match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
          <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>

                <div className = "row">
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Status</Label>
                            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={customtypedata.filter(option =>option.value === region)}
                        options={customtypedata}
                        onChange={({value}) => this.setState({  region: value })}
                        />
                        </div>
                      
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Jira Ticket</Label>
                            <Input  className = "fontstyle text-background"  
                            // placeholder = 'End date'
                            value = {container_no}  
                            onChange= {(e)=>this.setState({container_no : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >User Name</Label>
                            <Input  className = "fontstyle text-background"  
                            // placeholder = 'End date'
                            value = {changes}  
                            onChange= {(e)=>this.setState({changes : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >Audited Date</Label>
  
                            <Input  className = "fontstyle text-background"  
                            type='date'
                            placeholder = ''
                            value = {received_time}  
                            onChange= {(e)=>this.setState({received_time : e.target.value})} 
                            />
                           
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >Audited Time</Label>
                            <Input  className = "fontstyle text-background"   
                           data-date-format='hh:mm a'
                           type="time"  
                            value = {received_time}  
                            onChange= {(e)=>this.setState({received_time : e.target.value})} 
                            />
                           
                        </div>
                         
                        
                    </div>
                    <div className = "row" style = {{margin:'0px 5px',marginTop:'22px'}}>
                    <div className = "col-md-3">  
                    </div>
                    <div className = "col-md-6">
                       <div className = "row">
                         <div className = "col-md-4">
                            <Button 
                            style={{width:'150px'}}
                            className = "button-width" color="secondary"  
                                        // onClick={()=>this.close(false,false,{})}
                                >
                                  {onChangeLanguage(locale,'Save',languageData)}
                                 
                            </Button>
                            </div>
                            <div className = "col-md-4">
                                <Button className = "button-width"
                                style={{width:'150px'}}
                                color="primary"  
                                        // onClick={()=>this.close(false,false,{})}
                                        >{onChangeLanguage(locale,'Raw Data',languageData)}
                                       
                                    </Button>
                            </div>
                            <div className = "col-md-4">

                                <Button className = "button-width" color="secondary" 
                                    style={{width:'150px'}} 
                                // onClick={()=>this.close(false,false,{})}
                                >
                                  {onChangeLanguage(locale,'Refresh',languageData)}
                                
                            </Button>
                            </div>
                            
                        </div>
                        <div className = "col-md-3">  
                    </div>
                    </div>
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

   })(Sidebar)
  );

