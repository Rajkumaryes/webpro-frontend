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
        source:[],
        week:'',
        sourcedata:[
            {value:1,label:'Internal'},
            {value:2,label:'External'},
        ],
        activitydata:[
            {value:1,label:'Event Update'},
            {value:2,label:'Checks'},
            {value:3,label:'Clear'},
            {value:4,label:'Delete'},
            {value:5,label:'Escalate'},
            {value:6,label:'Bulk upload'},
            {value:7,label:'F3000 - Clear'},
            {value:8,label:'F3000 - Delete'},
            {value:9,label:'F3000 - Escalate'},
        ],
        activity2:[],
        activitydata2:[
            {value:1,label:'RAS'},
            {value:2,label:'RLA'},
            {value:3,label:'RNA'},
            {value:4,label:'RME'},
            {value:5,label:'Checks'},
            {value:6,label:'Query'},
            {value:7,label:'Revised Reports'}
        ],
        activity3:[],
        activitydata3:[
            {value:1,label:'Updation'},
            {value:2,label:'Creation'},
            {value:3,label:'Actualization'},
            {value:4,label:'Deletion'},
            {value:5,label:'Checks'},
            {value:6,label:'Query'},
            {value:7,label:'V2640'}
        ],
        regiondata:[],
        areadata:[],
        region:[],
        errortypedata:[],
        errortype:[],
        vesseloperator:[],
        vesseloperatordata:[
            {value:1,label:'ADX'},
            {value:2,label:'AKKON Lines'},
            {value:3,label:'BAX'},
            {value:4,label:'BG'},
            {value:5,label:'BMX'},
            {value:6,label:'CARMEL'},
            {value:7,label:'CMACGM'},
            {value:8,label:'CMACGM'},
            {value:9,label:'CTN'},
            {value:10,label:'Eimskip'},
            {value:11,label:'EMES'},
            {value:12,label:'Esf Fesco'},
            {value:13,label:'Eucon'},
            {value:14,label:'GTE'},
            {value:15,label:'Mannlines'},
            {value:16,label:'MCL'},
            {value:17,label:'MEDSHIP'},
            {value:18,label:'NBS'},
            {value:19,label:'NCL'},
            {value:20,label:'NPX'},
            {value:21,label:'OPDR'},
            {value:22,label:'PEX'},
            {value:23,label:'REX'},
            {value:24,label:'Samskip'},
            {value:25,label:'TA'},
            {value:26,label:'UFS'},
            {value:27,label:'Unifeeder'},
            {value:28,label:'WBS'},
            {value:29,label:'Wec Line'},
            {value:30,label:'X-press'},
            {value:31,label:'AA shipping'},
        ],
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
    handlesource = (selectedOptions) => {
        this.setState({source : selectedOptions.value})  
    }
    handleerrortype = (selectedOptions) => {
        this.setState({errortype : selectedOptions.value})  
    }  
    handlevesseloperator = (selectedOptions) => {
        this.setState({vesseloperator: selectedOptions.value})  
    }  
    render()
    {
        const {match} = this.props
        const {maildatetime,departuretime,ssy,region,area,vesselname,regiondata,week,activitydata,activity2,activitydata2,activity3,activitydata3,activity,
            errortypedata,errortype,areadata,sourcedata,source,vesseloperator,vesseloperatordata} = this.state
        return (
            <>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading="Error Capture Module" match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row" style = {{marginBottom:'30px'}}>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Date</Label>
                            <DatePicker
                                selected={maildatetime}
                                onChange={(date) => this.setState({maildatetime  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Activity Type</Label>
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
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >No of Containers</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {departuretime}  
                            onChange= {(e)=>this.setState({departuretime : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >User</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {vesselname}  
                            onChange= {(e)=>this.setState({vesselname : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Comments</Label>
                            <Input className = "fontstyle text-background" 
                                value = {ssy}  
                                onChange= {(e)=>this.setState({ssy : e.target.value})} ></Input>
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
                            onChange={this.handlevesseloperator}
                        />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Source</Label>
                            <Select  
                             style={{height:'85px'}}
                            className="react-select fontstyle"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={sourcedata.filter(option =>option.value === source)}
                            options={sourcedata}
                            onChange={this.handlesource}
                        />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Week</Label>
                            <Input className = "fontstyle text-background" 
                                value = {week}  
                                onChange= {(e)=>this.setState({week : e.target.value})} ></Input>
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
                            <Label  className = "fontstyle normal-font" >Region</Label>
                            <Select  
                                    className="react-select fontstyle"
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={regiondata.filter(option =>option.value === region)}
                                        options={regiondata}
                                        onChange={({value}) => this.setState({  region: value })}
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
                <div className = "publishuser-card-component" style = {{padding:'10px',marginBottom:'30px'}}>
                    <div className = "publish-title" >
                        <Row>
                        <Colxx xxs="4">
                            <Label  className = "fontstyle" 
                                style = {{fontWeight:700,fontSize:'15px'}}>Terminal Performance Report (TPFREP)</Label>
                        </Colxx>
                        </Row>
                    </div>
                <div className = "row" style = {{padding:'10px'}}>
                <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Date</Label>
                            <DatePicker
                                selected={maildatetime}
                                onChange={(date) => this.setState({maildatetime  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Activity Type</Label>
                            <Select  
                             style={{height:'85px'}}
                            className="react-select fontstyle"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={activitydata2.filter(option =>option.value === activity2)}
                            options={activitydata2}
                            onChange={this.handleactivity}
                        />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >No of DPs</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {departuretime}  
                            onChange= {(e)=>this.setState({departuretime : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >User</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {vesselname}  
                            onChange= {(e)=>this.setState({vesselname : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Type of Report</Label>
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
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Source</Label>
                            <Select  
                             style={{height:'85px'}}
                            className="react-select fontstyle"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={sourcedata.filter(option =>option.value === source)}
                            options={sourcedata}
                            onChange={this.handlesource}
                        />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Week</Label>
                            <Input className = "fontstyle text-background" 
                                value = {week}  
                                onChange= {(e)=>this.setState({week : e.target.value})} ></Input>
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
                            <Label  className = "fontstyle normal-font" >Region</Label>
                            <Select  
                                    className="react-select fontstyle"
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={regiondata.filter(option =>option.value === region)}
                                        options={regiondata}
                                        onChange={({value}) => this.setState({  region: value })}
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
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "publish-title" >
                        <Row>
                        <Colxx xxs="4">
                            <Label  className = "fontstyle" 
                                style = {{fontWeight:700,fontSize:'15px'}}>Feeders Schedules</Label>
                        </Colxx>
                        </Row>
                    </div>
                <div className = "row" style = {{marginBottom:'30px'}}>
                <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Date</Label>
                            <DatePicker
                                selected={maildatetime}
                                onChange={(date) => this.setState({maildatetime  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Activity Type</Label>
                            <Select  
                             style={{height:'85px'}}
                            className="react-select fontstyle"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={activitydata3.filter(option =>option.value === activity3)}
                            options={activitydata3}
                            onChange={this.handleactivity}
                        />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >No of DPs</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {departuretime}  
                            onChange= {(e)=>this.setState({departuretime : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >User</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {vesselname}  
                            onChange= {(e)=>this.setState({vesselname : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Comments</Label>
                            <Input className = "fontstyle text-background" 
                                value = {ssy}  
                                onChange= {(e)=>this.setState({ssy : e.target.value})} ></Input>
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Source</Label>
                            <Select  
                             style={{height:'85px'}}
                            className="react-select fontstyle"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={sourcedata.filter(option =>option.value === source)}
                            options={sourcedata}
                            onChange={this.handlesource}
                        />
                        </div>
                        <div className = "col-md-4 space-margin">
                            <Label  className = "fontstyle normal-font" >Week</Label>
                            <Input className = "fontstyle text-background" 
                                value = {week}  
                                onChange= {(e)=>this.setState({week : e.target.value})} ></Input>
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
                            <Label  className = "fontstyle normal-font" >Region</Label>
                            <Select  
                                    className="react-select fontstyle"
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={regiondata.filter(option =>option.value === region)}
                                        options={regiondata}
                                        onChange={({value}) => this.setState({  region: value })}
                                    />
                        </div>
                        <div className = "col-md-4 space-margin">
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

