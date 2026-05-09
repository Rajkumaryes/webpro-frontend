import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        region:'',
        reminders:'',
        userid:'',
        startdate:'',
        enddate:'',
        regiondata:[],
        week:'',
        month:'',
        areaselectiondata:[],
        area:[],
        vesseloperatordata:[],
        vesseloperator:[],
        subactivitydata:[],
        subactivity:[],
        dpvoyage:'',
        requesttypedata:[],
        requesttype:[],
        taksenddatetime:'',
        schedulevolumcount:'',
        startdatetime:'',
        tat:'',
        
      };
    }
    onPaste() 
    {
        navigator.clipboard.readText().then((text)=>{
            console.log("lkbkjj" , text)
            console.log("lkbkjj" ,typeof text)
          
        })
    }
    onCopy()
    {
        navigator.clipboard.writeText(this.state.region)
    }
    handleregion = (selectedOptions) => {
        this.setState({region : selectedOptions.value})  
    } 
    handlechangearea = (selectedOptions) => {
        this.setState({area : selectedOptions.value})  
    } 
    handlechangevesseleoperator = (selectedOptions) => {
        this.setState({vesseloperator : selectedOptions.value})  
    } 
    handlechangesubactivity = (selectedOptions) => {
        this.setState({subactivity : selectedOptions.value})  
    } 
    handlechangearequest = (selectedOptions) => {
        this.setState({requesttype : selectedOptions.value})  
    } 
    handleerrortype = (selectedOptions) => {
        this.setState({errortype : selectedOptions.value})  
    } 
    render()
    {
        const {match} = this.props
        const {region,reminders,userid,startdate,enddate,regiondata,week,areaselectiondata,area,vesseloperatordata,vesseloperator,tat,
            subactivitydata,subactivity,dpvoyage,requesttypedata,requesttype,schedulevolumcount,startdatetime,month,taksenddatetime} = this.state
        return (
            <>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading="Feeder Schedules" match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row" style = {{marginBottom:'30px'}}>
                    <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Month</Label>
                            <DatePicker
                                selected={month}
                                // disabled={!month}
                                onChange={(date) => this.setState({month  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Region</Label>
                            <Select  
                             style={{height:'85px'}}
                            className="react-select fontstyle"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={regiondata.filter(option =>option.value === region)}
                            options={regiondata}
                            onChange={this.handleregion}
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Vessel Operator</Label>
                            <Select  
                             style={{height:'85px'}}
                            className="react-select fontstyle"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={vesseloperatordata.filter(option =>option.value === vesseloperator)}
                            options={vesseloperatordata}
                            onChange={this.handlechangevesseleoperator}
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Sub Activity</Label>
                            <Select  
                             style={{height:'85px'}}
                            className="react-select fontstyle"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={subactivitydata.filter(option =>option.value === subactivity)}
                            options={subactivitydata}
                            onChange={this.handlechangesubactivity}
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Dp Voyage</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {dpvoyage}  
                            onChange= {(e)=>this.setState({dpvoyage : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Request Type</Label>
                            <Select  
                             style={{height:'85px'}}
                            className="react-select fontstyle"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={requesttypedata.filter(option =>option.value === requesttype)}
                            options={requesttypedata}
                            onChange={this.handlechangearequest}
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Schedule Volume Counts</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {schedulevolumcount}  
                            onChange= {(e)=>this.setState({schedulevolumcount : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Task Start Date / Time</Label>
                            <DatePicker
                                selected={startdatetime}
                                // disabled={!startdatetime}
                                onChange={(date) => this.setState({startdatetime  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Task End Date / Time</Label>
                            <DatePicker
                                selected={taksenddatetime}
                                // disabled={!taksenddatetime}
                                onChange={(date) => this.setState({taksenddatetime  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >TAT</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {tat}  
                            onChange= {(e)=>this.setState({tat : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Mail Received Start Date / Time</Label>
                            <DatePicker
                                selected={startdate}
                                onChange={(date) => this.setState({startdate  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Mail Sent Date/ Time</Label>
                            <DatePicker
                                selected={enddate}
                                onChange={(date) => this.setState({enddate  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />

                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >User ID</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {userid}  
                            onChange= {(e)=>this.setState({userid : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin"  >
                            <Label  className = "fontstyle normal-font" >Week Number</Label>
                            <DatePicker
                                selected={week}
                                onChange={(date) => this.setState({week  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Area Selection</Label>
                            <Select  
                             style={{height:'85px'}}
                            className="react-select fontstyle"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={areaselectiondata.filter(option =>option.value === area)}
                            options={areaselectiondata}
                            onChange={this.handleregion}
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Activity Selection</Label>
                            <Select  
                                className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={regiondata.filter(option =>option.value === reminders)}
                                options={regiondata}
                                onChange={({value}) => this.setState({  reminders: value })}
                            />
                            
                        </div>
                        {/* <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Error Type</Label>
                            <Select  
                             style={{height:'85px'}}
                            className="react-select fontstyle"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={errortypedata.filter(option =>option.value === errortype)}
                            options={errortypedata}
                            onChange={this.handleerrortype}
                            />
                        </div> */}
                       </div>
                    <div className = "row">
                       <div className = "col-md-3"></div>
                         <div className = "col-md-2">
                          <Button className = "button-width" color="secondary"  style={{width:'150px'}}
                                // onClick={()=>this.close(false,false,{})}
                                >Find </Button> 
                         </div>
                         <div className = "col-md-2">
                          <Button className = "button-width" color="primary"  style={{width:'150px'}}
                                // onClick={()=>this.close(false,false,{})}
                                >Save </Button> 
                         </div>
                         
                         <div className = "col-md-2">
                          <Button className = "button-width" color="secondary"  style={{width:'150px'}}
                                // onClick={()=>this.close(false,false,{})}
                                >Clear </Button> 
                         </div>
                        
                    </div>
                </div>   
            </div>
          </>
        )
    }
}
const mapStateToProps = ({ settings }) => {
    const { locale,languageData} = settings;
    return {locale, languageData};
  };
  export default withRouter(
    connect(mapStateToProps, {

   })(QueryResolveSheet)
  );

