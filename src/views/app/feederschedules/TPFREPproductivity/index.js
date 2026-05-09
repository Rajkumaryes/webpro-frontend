import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
// import { Checkbox, Popconfirm ,Tooltip } from 'antd';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        maildatetime:'',
        departuretime:'',
        vesselname:'',
        schedulevoy:'',
        startdate:'',
        enddate:'',
        port:'',
        eta:'',
        terminal:'',
        ssy:'',
        hlglformat:'',
        activity:'',
        userid:'',
        area:'',
        team:'',
        closed:'',
        activitydata:[],
        hlgldata:[],
        areadata:[]
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
        navigator.clipboard.writeText(this.state.maildatetime)
    }
    handleactivity = (selectedOptions) => {
        this.setState({activity : selectedOptions.value})  
    } 
    handlehlgl = (selectedOptions) => {
        this.setState({hlglformat : selectedOptions.value})  
    } 
    handlearea = (selectedOptions) => {
        this.setState({area : selectedOptions.value})  
    } 
    
    render()
    {
        const {match} = this.props
        const {maildatetime,departuretime,ssy,schedulevoy,port,eta,terminal,userid,area,startdate,enddate,
            vesselname,dpvoyage,hlgldata,hlglformat,activitydata,activity,areadata} = this.state
        return (
            <>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading="TPFREP Productivity" match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row" style = {{marginBottom:'30px'}}>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Mail Date Time</Label>
                            <DatePicker
                                selected={maildatetime}
                                onChange={(date) => this.setState({maildatetime  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Departure Time</Label>
                            <Input  className = "fontstyle text-background"  
                            type='time'
                            placeholder = ''
                            value = {departuretime}  
                            onChange= {(e)=>this.setState({departuretime : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Vessel Name</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {vesselname}  
                            onChange= {(e)=>this.setState({vesselname : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >SSY</Label>
                            <Input className = "fontstyle text-background" 
                                value = {ssy}  
                                onChange= {(e)=>this.setState({ssy : e.target.value})} ></Input>
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Schedule Voy.</Label>
                            <Input className = "fontstyle text-background" 
                                value = {schedulevoy}  
                                onChange= {(e)=>this.setState({schedulevoy : e.target.value})} ></Input>
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >DP Voyage</Label>
                            <Input className = "fontstyle text-background" 
                                value = {dpvoyage}  
                                onChange= {(e)=>this.setState({dpvoyage : e.target.value})} ></Input>
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Port</Label>
                            <Input className = "fontstyle text-background" 
                                value = {port}  
                                onChange= {(e)=>this.setState({port : e.target.value})} ></Input>
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >ETA</Label>
                            <Input className = "fontstyle text-background" 
                                value = {eta}  
                                onChange= {(e)=>this.setState({eta : e.target.value})} ></Input>
                        </div>
                        
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Start Date</Label>
                            <DatePicker
                                selected={startdate}
                                onChange={(date) => this.setState({startdate  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >End Date</Label>
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
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Terminal</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {terminal}  
                            onChange= {(e)=>this.setState({terminal : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >HLGL Format</Label>
                            <Select  
                             style={{height:'85px'}}
                            className="react-select fontstyle"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={hlgldata.filter(option =>option.value === hlglformat)}
                            options={hlgldata}
                            onChange={this.handlehlgl}
                      />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Area</Label>
                            <Select  
                             style={{height:'85px'}}
                            className="react-select fontstyle"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={areadata.filter(option =>option.value === area)}
                            options={areadata}
                            onChange={this.handlearea}
                      />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Activity</Label>
                            <Select  
                             style={{height:'85px'}}
                            className="react-select fontstyle"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={activitydata.filter(option =>option.value === activity)}
                            options={activitydata}
                            onChange={this.handleactivity}
                      />
                        </div>
                    </div>
                    <div className = "row">
                       <div className = "col-md-2"></div>
                        <div className = "col-md-2">
                          <Button className = "button-width" color="secondary"  style={{width:'150px'}}
                                onClick={()=>this.onPaste()}
                                >Paste</Button> 
                         </div>
                         <div className = "col-md-2">
                          <Button className = "button-width" color="primary"  style={{width:'150px'}}
                                // onClick={()=>this.close(false,false,{})}
                                >Save </Button> 
                         </div>
                         <div className = "col-md-2">
                          <Button className = "button-width" color="primary"  style={{width:'150px'}}
                                // onClick={()=>this.close(false,false,{})}
                                >Find </Button> 
                         </div>
                         <div className = "col-md-2">
                             <Button className = "button-width" color="secondary" style={{width:'150px'}} 
                                    // onClick={()=>this.onCopy()}
                           >Refresh</Button>
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

   })(QueryResolveSheet)
  );

