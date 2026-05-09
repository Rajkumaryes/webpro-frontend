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
import { Descriptions } from 'antd';

class Sidebar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username:'',
        standard_comments:'',
        invoice_status:'',
        processed_date: '',
        processed_time: '',
        forwarded_to:'',
        changes:'',
        descriptions:'',cc:'',
        customtypedata:[]
      };
    }
    handlecustomtype = (selectedOptions) => {
        this.setState({username : selectedOptions.value})  
      }  
    render()
    { 
        const{username,standard_comments,invoice_status,processed_date,processed_time,customtypedata,forwarded_to,descriptions,changes}=this.state
        const {match} = this.props
        return (
            <>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading="AP Process" match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
          <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>

                <div className = "row">
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >User Name</Label>
                            <Input  className = "fontstyle text-background"  
                                // placeholder = 'End date'
                                value = {username}  
                                onChange= {(e)=>this.setState({username : e.target.value})} 
                                />
                        </div>
                      
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Invoice Status</Label>
                            <Select  
                                className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={customtypedata.filter(option =>option.value === invoice_status)}
                                options={customtypedata}
                                onChange={({value}) => this.setState({  invoice_status: value })}
                             />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >Forwarded To</Label>
                             <Input  className = "fontstyle text-background"  
                                // placeholder = 'End date'
                                value = {forwarded_to}  
                                onChange= {(e)=>this.setState({forwarded_to : e.target.value})} 
                                />
                           
                        </div>
                         {/* <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Changes</Label>
                            <Input  className = "fontstyle text-background"  
                            // placeholder = 'End date'
                            value = {changes}  
                            onChange= {(e)=>this.setState({changes : e.target.value})} 
                            />
                        </div> */}
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Description</Label>
                            <Input  className = "fontstyle text-background"  
                            // placeholder = 'End date'
                            value = {descriptions}  
                            onChange= {(e)=>this.setState({descriptions : e.target.value})} 
                            />
                        </div>
                       
                        <div className = "col-md-4 space-margin ">
                            <Label  className = "fontstyle normal-font" > Standard Comments</Label>
                                <Select  
                                className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={customtypedata.filter(option =>option.value === standard_comments)}
                                options={customtypedata}
                                onChange={({value}) => this.setState({  standard_comments: value })}
                             />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >GSC Processed Date</Label>
                            <Input  className = "fontstyle text-background"  
                            type='date'
                            placeholder = ''
                            value = {processed_date}  
                            onChange= {(e)=>this.setState({processed_date : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >GSC Processed Time</Label>
                            <Input  className = "fontstyle text-background"  
                            type='time'
                            placeholder = ''
                            value = {processed_time}  
                            onChange= {(e)=>this.setState({processed_time : e.target.value})} 
                            />
                        </div>
                       
                    </div>
                    <div className = "row" style = {{margin:'0px 5px'}}>
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
                                Save 
                            </Button>
                            </div>
                            <div className = "col-md-4">
                                <Button className = "button-width"
                                style={{width:'150px'}}
                                color="primary"  
                                        // onClick={()=>this.close(false,false,{})}
                                        >
                                        Raw Data
                                    </Button>
                            </div>
                            <div className = "col-md-4">

                                <Button className = "button-width" color="secondary" 
                                    style={{width:'150px'}} 
                                // onClick={()=>this.close(false,false,{})}
                                >
                                Refresh
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

const mapStateToProps = ({  authUser }) => {
   
  
    const { currentUser } = authUser;
    return {
      currentUser
    };
  };
  export default withRouter(
    connect(mapStateToProps, {

   })(Sidebar)
  );

