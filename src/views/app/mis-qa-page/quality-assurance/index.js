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
        auditorname:'',
        startdate:'',
        enddate:'',
        regiondata:[],
        mtdnumber:'',
        requesttype: [],
        etd : [],
        amdtype: [],
        errortype:[],
        remarks:[],
        mafadded: '',
        fcldate: '',
        erroruserid: [],
        mafremarks:[],
        customtypedata:[],
        exception: '',
        activitiesdata:[
            {id:1,label:'Description Of Activities'},
            {id:2,label:' Request From'},
            {id:3,label:'Start Time & End Time'},
        ],
        activities:[],
        typeofaudit:[],
        typeofauditdata:[
            {value:1,label:'Surprise Correction ( DC Data)'},
            {value:2,label:'Withdrawn / Error Code'},
            {value:3,label:'Match Code ( Input Data)'},
            {value:4,label:'Brazil Audit( Input Data) / Destination of Brazil)'},
            {value:5,label:'Input Audit'},
            {value:6,label:'TL Cross Site Audit ( Team Site Excel file)'},
            {value:7,label:'MAF Audit ( DC Data)'},
            {value:8,label:'Imports Audit'},
            {value:9,label:'Other Audit ( Extra Text Box For Comment)'},
            {value:10,label:'1st Instance DC (SDEM 0101 Report)'},
        ],
        auditeddate:'',
        shipergsc:'',
        variance:'',
        tattime:'',
        surpriseendtime:'',
        surprisestarttime:'',
        erroruseriddata:[],
        remarksdata:[],
        amttypedata:[],
        amttype:[],
        reqtypedata:[],
        reqtype:[],
        cender:'',
        teamdata:[],
        team:[],
        userid:'',
        customer:'',
        shipmentnumber:'',
        comment:'',
        errordata:[
            {id:1,label:'Yes'},
            {id:2,label:'No'},
        ],
        error:[]
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
    handlechangeactivities = (selectedOptions) => {
        this.setState({activities : selectedOptions.value})  
    } 
    handlechangeatypeofaudit = (selectedOptions) => {
        this.setState({typeofaudit : selectedOptions.value})  
    } 
    render()
    {
        const {match} = this.props
        const {region,reminders,auditorname,startdate,enddate,regiondata,mtdnumber,activitiesdata,activities,
            typeofauditdata,typeofaudit,erroruserid,mafremarks,auditeddate,shipergsc,variance,tattime,
            surpriseendtime,surprisestarttime,erroruseriddata,remarksdata,amttypedata,amttype,reqtypedata,
            reqtype,cender,teamdata,team,userid,customer,shipmentnumber,comment,errordata,error} = this.state
        return (
            <>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading="Quality Assurance" match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
               
                    <div className = "row" style = {{marginBottom:'30px'}}>
                        <div className = "col-md-6 space-margin">
                            <Label  className = "fontstyle normal-font" >Types Of Audit</Label>
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
                            <Label  className = "fontstyle normal-font" >Auditor Name</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            disabled = {false}
                            value = {auditorname}  
                            onChange= {(e)=>this.setState({auditorname : e.target.value})} 
                            />
                        </div>
                        {/* <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >Start Date / Time</Label>
                            <DatePicker
                                selected={startdate}
                                onChange={(date) => this.setState({startdate  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >End Date / Time</Label>
                            <DatePicker
                                selected={enddate}
                                onChange={(date) => this.setState({enddate  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />

                        </div> */}
                       </div>   
                    </div> 
                    {typeofaudit === 1 &&  
                <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "publish-title" >
                                <Row>
                                    <Colxx xxs="4">
                                        <Label  className = "fontstyle" 
                                        style = {{fontWeight:700,fontSize:'15px'}}>Surprise Correction ( DC Data)</Label>
                                    </Colxx>
                                </Row>
                            </div>
                    <div className = "row" style={{padding:'10px'}}>
                    <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Shipment Number</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {shipmentnumber}  
                            onChange= {(e)=>this.setState({shipmentnumber : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Customer</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {customer}  
                            onChange= {(e)=>this.setState({customer : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >MTD Number</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {mtdnumber}  
                            onChange= {(e)=>this.setState({mtdnumber : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >User Id</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {userid}  
                            onChange= {(e)=>this.setState({userid : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Team</Label>
                                 <Select  
                                className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={teamdata.filter(option =>option.value === team)}
                                options={teamdata}
                                onChange={({value}) => this.setState({  team: value })}
                      />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
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
                       
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Center</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {cender}  
                            onChange= {(e)=>this.setState({center : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Req Type</Label>
                            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={reqtypedata.filter(option =>option.value === reqtype)}
                        options={reqtypedata}
                        // onChange={this.handlecustomtype}
                        onChange={({value}) => this.setState({  reqtype: value })}
                      />
                        </div>
                        
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Amt Type</Label>
                            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={amttypedata.filter(option =>option.value === amttype)}
                        options={amttypedata}
                        onChange={({value}) => this.setState({  amttype: value })}
                      />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Remarks</Label>
                            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={remarksdata.filter(option =>option.value === mafremarks)}
                        options={remarksdata}
                        onChange={({value}) => this.setState({  mafremarks: value })}
                      />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Error User ID</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {erroruserid}  
                            onChange= {(e)=>this.setState({erroruserid : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Start Date Time</Label>
                            <DatePicker
                                selected={surprisestarttime}
                                onChange={(date) => this.setState({surprisestarttime  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >End Date Time</Label>
                            <DatePicker
                                selected={surpriseendtime}
                                onChange={(date) => this.setState({surpriseendtime  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >TAT Time</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {tattime}  
                            onChange= {(e)=>this.setState({tattime : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Variance</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {variance}  
                            onChange= {(e)=>this.setState({variance : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Shiper / GSC</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {shipergsc}  
                            onChange= {(e)=>this.setState({shipergsc : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Audited Date</Label>
                            <DatePicker
                                selected={auditeddate}
                                onChange={(date) => this.setState({auditeddate  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-md-12 space-margin">
                            <Label  className = "fontstyle normal-font" >Comments</Label>
                            <textarea  className = "fontstyle textarea-background"  
                            placeholder = ''
                            value = {comment}  
                            onChange= {(e)=>this.setState({comment : e.target.value})} 
                            />
                        </div>
                    </div>
                </div>   
                }
                {typeofaudit === 2 && 
                <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "publish-title" >
                                <Row>
                                    <Colxx xxs="4">
                                        <Label  className = "fontstyle" 
                                        style = {{fontWeight:700,fontSize:'15px'}}>Withdrawn / Error Code</Label>
                                    </Colxx>
                                </Row>
                            </div>
                    <div className = "row" style={{padding:'10px'}}>
                    <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Exception Issue Date</Label>
                            <DatePicker
                                selected={surprisestarttime}
                                onChange={(date) => this.setState({surprisestarttime  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Exception Number</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {customer}  
                            onChange= {(e)=>this.setState({customer : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >MTD Number</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {mtdnumber}  
                            onChange= {(e)=>this.setState({mtdnumber : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Region (Issuer)</Label>
                            <Select  
                            className="react-select fontstyle"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={regiondata.filter(option =>option.value === region)}
                            options={regiondata}
                            onChange={({value}) => this.setState({  region: value })}
                      />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Subregion (Issuer)</Label>
                                 <Select  
                                className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={teamdata.filter(option =>option.value === team)}
                                options={teamdata}
                                onChange={({value}) => this.setState({  team: value })}
                      />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Area (Issuer)</Label>
                            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={reqtypedata.filter(option =>option.value === reqtype)}
                        options={reqtypedata}
                        // onChange={this.handlecustomtype}
                        onChange={({value}) => this.setState({  reqtype: value })}
                      />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Error Code Group</Label>
                            <Select  
                            className="react-select fontstyle"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={reqtypedata.filter(option =>option.value === reqtype)}
                            options={reqtypedata}
                            // onChange={this.handlecustomtype}
                            onChange={({value}) => this.setState({  reqtype: value })}
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Error Code</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {cender}  
                            onChange= {(e)=>this.setState({center : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Receiver</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {shipergsc}  
                            onChange= {(e)=>this.setState({shipergsc : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >User of last action</Label>
                            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={amttypedata.filter(option =>option.value === amttype)}
                        options={amttypedata}
                        onChange={({value}) => this.setState({  amttype: value })}
                      />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Capturing User</Label>
                            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={remarksdata.filter(option =>option.value === mafremarks)}
                        options={remarksdata}
                        onChange={({value}) => this.setState({  mafremarks: value })}
                      />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Solved by Capturing User</Label>
                            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={erroruseriddata.filter(option =>option.value === erroruserid)}
                        options={erroruseriddata}
                        onChange={({value}) => this.setState({  erroruserid: value })}
                      />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Exception Status</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {tattime}  
                            onChange= {(e)=>this.setState({tattime : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Performed Action</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {tattime}  
                            onChange= {(e)=>this.setState({tattime : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Date Of Creation (MTD)</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {tattime}  
                            onChange= {(e)=>this.setState({tattime : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Auditor</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {tattime}  
                            onChange= {(e)=>this.setState({tattime : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Issue Description</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {tattime}  
                            onChange= {(e)=>this.setState({tattime : e.target.value})} 
                            />
                        </div>
                        
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Error Status</Label>
                            <Select  
                                className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={errordata.filter(option =>option.value === error)}
                                options={errordata}
                                onChange={({value}) => this.setState({  error: value })}
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Audited Date</Label>
                            <DatePicker
                                selected={auditeddate}
                                onChange={(date) => this.setState({auditeddate  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-md-12 space-margin">
                            <Label  className = "fontstyle normal-font" >Auditor Comments</Label>
                            <textarea  className = "fontstyle textarea-background"  
                            placeholder = ''
                            value = {comment}  
                            onChange= {(e)=>this.setState({comment : e.target.value})} 
                            />
                        </div>
                    </div>
                </div>   
                }
                {typeofaudit === 3 && 
                <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "publish-title" >
                                <Row>
                                    <Colxx xxs="4">
                                        <Label  className = "fontstyle" 
                                        style = {{fontWeight:700,fontSize:'15px'}}>Match Code ( input Data)</Label>
                                    </Colxx>
                                </Row>
                            </div>
                    <div className = "row" style={{padding:'10px'}}>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >MTD Number</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {mtdnumber}  
                            onChange= {(e)=>this.setState({mtdnumber : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Customer (CU) Process [CSD_CU_DOC_3]</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {shipmentnumber}  
                            onChange= {(e)=>this.setState({shipmentnumber : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Process</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {customer}  
                            onChange= {(e)=>this.setState({customer : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Processor</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {userid}  
                            onChange= {(e)=>this.setState({userid : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >MAIN_POD</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {userid}  
                            onChange= {(e)=>this.setState({userid : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Week</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {userid}  
                            onChange= {(e)=>this.setState({userid : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Sub Area</Label>
                            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={reqtypedata.filter(option =>option.value === reqtype)}
                        options={reqtypedata}
                        // onChange={this.handlecustomtype}
                        onChange={({value}) => this.setState({  reqtype: value })}
                      />
                        </div>
                        
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Area</Label>
                            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={amttypedata.filter(option =>option.value === amttype)}
                        options={amttypedata}
                        onChange={({value}) => this.setState({  amttype: value })}
                      />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
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
                       
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Center</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {cender}  
                            onChange= {(e)=>this.setState({center : e.target.value})} 
                            />
                        </div>
                       
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Consignee</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {cender}  
                            onChange= {(e)=>this.setState({center : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Notify</Label>
                            <DatePicker
                                selected={surprisestarttime}
                                onChange={(date) => this.setState({surprisestarttime  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Error</Label>
                            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={errordata.filter(option =>option.value === error)}
                        options={errordata}
                        onChange={({value}) => this.setState({  error: value })}
                      />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Error Type</Label>
                            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={erroruseriddata.filter(option =>option.value === error)}
                        options={erroruseriddata}
                        onChange={({value}) => this.setState({  error: value })}
                      />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Correct Match code</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {tattime}  
                            onChange= {(e)=>this.setState({tattime : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >CNEE/Notify</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {variance}  
                            onChange= {(e)=>this.setState({variance : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Auditor  Name</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {shipergsc}  
                            onChange= {(e)=>this.setState({shipergsc : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Audited Date</Label>
                            <DatePicker
                                selected={auditeddate}
                                onChange={(date) => this.setState({auditeddate  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-md-12 space-margin">
                            <Label  className = "fontstyle normal-font" >Comments</Label>
                            <textarea  className = "fontstyle textarea-background"  
                            placeholder = ''
                            value = {comment}  
                            onChange= {(e)=>this.setState({comment : e.target.value})} 
                            />
                        </div>
                    </div>
                </div>  
                }
                {typeofaudit === 4 &&  
                <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "publish-title" >
                                <Row>
                                    <Colxx xxs="4">
                                        <Label  className = "fontstyle" 
                                        style = {{fontWeight:700,fontSize:'15px'}}>Brazil Audit( Input Data) / Destination of Brazil)</Label>
                                    </Colxx>
                                </Row>
                            </div>
                    <div className = "row" style={{padding:'10px'}}>
                    <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >MTD</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {mtdnumber}  
                            onChange= {(e)=>this.setState({mtdnumber : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Customer Name</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {customer}  
                            onChange= {(e)=>this.setState({customer : e.target.value})} 
                            />
                        </div>
                    <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Main POL</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {shipmentnumber}  
                            onChange= {(e)=>this.setState({shipmentnumber : e.target.value})} 
                            />
                        </div>
                        
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >SDC</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {userid}  
                            onChange= {(e)=>this.setState({userid : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Draft Send</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {cender}  
                            onChange= {(e)=>this.setState({center : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Last POD</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {cender}  
                            onChange= {(e)=>this.setState({center : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >User</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {cender}  
                            onChange= {(e)=>this.setState({center : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Error</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {tattime}  
                            onChange= {(e)=>this.setState({tattime : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >NCM</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {variance}  
                            onChange= {(e)=>this.setState({variance : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Tax Id</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {shipergsc}  
                            onChange= {(e)=>this.setState({shipergsc : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Auditor</Label>
                            <DatePicker
                                selected={auditeddate}
                                onChange={(date) => this.setState({auditeddate  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-md-12 space-margin">
                            <Label  className = "fontstyle normal-font" >Comments</Label>
                            <textarea  className = "fontstyle textarea-background"  
                            placeholder = ''
                            value = {comment}  
                            onChange= {(e)=>this.setState({comment : e.target.value})} 
                            />
                        </div>
                    </div>
                </div>   
                }
                {typeofaudit === 5 && 
                <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "publish-title" >
                                <Row>
                                    <Colxx xxs="4">
                                        <Label  className = "fontstyle" 
                                        style = {{fontWeight:700,fontSize:'15px'}}>Input Audit</Label>
                                    </Colxx>
                                </Row>
                            </div>
                    <div className = "row" style={{padding:'10px'}}>
                    <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Team</Label>
                                 <Select  
                                className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={teamdata.filter(option =>option.value === team)}
                                options={teamdata}
                                onChange={({value}) => this.setState({  team: value })}
                      />
                        </div>
                    <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Shipment Number</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {shipmentnumber}  
                            onChange= {(e)=>this.setState({shipmentnumber : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >MTD Number</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {mtdnumber}  
                            onChange= {(e)=>this.setState({mtdnumber : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Customer</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {customer}  
                            onChange= {(e)=>this.setState({customer : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >SI Type (EDI/Manual)</Label>
                            <Select  
                            className="react-select fontstyle"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={regiondata.filter(option =>option.value === region)}
                            options={regiondata}
                            onChange={({value}) => this.setState({  region: value })}
                      />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >User Name</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {userid}  
                            onChange= {(e)=>this.setState({userid : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Error</Label>
                            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={errordata.filter(option =>option.value === error)}
                        options={errordata}
                        // onChange={this.handlecustomtype}
                        onChange={({value}) => this.setState({  reqtype: value })}
                      />
                        </div>
                        
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Error category</Label>
                            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={amttypedata.filter(option =>option.value === amttype)}
                        options={amttypedata}
                        onChange={({value}) => this.setState({  amttype: value })}
                      />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Sub category</Label>
                            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={remarksdata.filter(option =>option.value === mafremarks)}
                        options={remarksdata}
                        onChange={({value}) => this.setState({  mafremarks: value })}
                      />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Auditor</Label>
                            <DatePicker
                                selected={auditeddate}
                                onChange={(date) => this.setState({auditeddate  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-md-12 space-margin">
                            <Label  className = "fontstyle normal-font" >Comments</Label>
                            <textarea  className = "fontstyle textarea-background"  
                            placeholder = ''
                            value = {comment}  
                            onChange= {(e)=>this.setState({comment : e.target.value})} 
                            />
                        </div>
                    </div>
                </div>  
                }
                {typeofaudit === 6 && 
                <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "publish-title" >
                                <Row>
                                    <Colxx xxs="4">
                                        <Label  className = "fontstyle" 
                                        style = {{fontWeight:700,fontSize:'15px'}}>TL Cross site Audit ( team Site Excel file)</Label>
                                    </Colxx>
                                </Row>
                            </div>
                    <div className = "row" style={{padding:'10px'}}>
                    </div>
                </div>    
                }
                {typeofaudit === 7 && 
                <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "publish-title" >
                                <Row>
                                    <Colxx xxs="4">
                                        <Label  className = "fontstyle" 
                                        style = {{fontWeight:700,fontSize:'15px'}}>MAF Audit ( DC Data)</Label>
                                    </Colxx>
                                </Row>
                            </div>
                    <div className = "row" style={{padding:'10px'}}>
                    <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >MTD</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {mtdnumber}  
                            onChange= {(e)=>this.setState({mtdnumber : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >SOB Date</Label>
                            <DatePicker
                                selected={surprisestarttime}
                                onChange={(date) => this.setState({surprisestarttime  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Customer Name</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {customer}  
                            onChange= {(e)=>this.setState({customer : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >1st DC Received Date & Time</Label>
                            <DatePicker
                                selected={surprisestarttime}
                                onChange={(date) => this.setState({surprisestarttime  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >2nd DC Received Date & Time</Label>
                            <DatePicker
                                selected={surpriseendtime}
                                onChange={(date) => this.setState({surpriseendtime  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >3rd DC Received Date & Time</Label>
                            <DatePicker
                                selected={surprisestarttime}
                                onChange={(date) => this.setState({surprisestarttime  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >4th DC Received Date & Time</Label>
                            <DatePicker
                                selected={surpriseendtime}
                                onChange={(date) => this.setState({surpriseendtime  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >5th DC Received Date & Time</Label>
                            <DatePicker
                                selected={surprisestarttime}
                                onChange={(date) => this.setState({surprisestarttime  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >6th DC Received Date & Time</Label>
                            <DatePicker
                                selected={surpriseendtime}
                                onChange={(date) => this.setState({surpriseendtime  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >7th DC Received Date & Time</Label>
                            <DatePicker
                                selected={surpriseendtime}
                                onChange={(date) => this.setState({surpriseendtime  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Shipment</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {tattime}  
                            onChange= {(e)=>this.setState({tattime : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >MAF/XNX/XNH</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {variance}  
                            onChange= {(e)=>this.setState({variance : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >MAF has to Apply as per Procedure</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {shipergsc}  
                            onChange= {(e)=>this.setState({shipergsc : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Auditor</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {shipergsc}  
                            onChange= {(e)=>this.setState({shipergsc : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Error Status</Label>
                            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={errordata.filter(option =>option.value === error)}
                        options={errordata}
                        onChange={({value}) => this.setState({  error: value })}
                      />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Correctors Name</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {shipergsc}  
                            onChange= {(e)=>this.setState({shipergsc : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Audited Date</Label>
                            <DatePicker
                                selected={auditeddate}
                                onChange={(date) => this.setState({auditeddate  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-lg-12 space-margin">
                            <Label  className = "fontstyle normal-font" >Slandered Comment</Label>
                            <textarea  className = "fontstyle textarea-background"  
                            placeholder = ''
                            value = {comment}  
                            onChange= {(e)=>this.setState({comment : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-12 space-margin">
                            <Label  className = "fontstyle normal-font" >Detail comment for variance "Yes" cases</Label>
                            <textarea  className = "fontstyle textarea-background"  
                            placeholder = ''
                            value = {comment}  
                            onChange= {(e)=>this.setState({comment : e.target.value})} 
                            />
                        </div>
                    </div>
                </div> 
                }
                {typeofaudit === 8 &&   
                <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "publish-title" >
                                <Row>
                                    <Colxx xxs="4">
                                        <Label  className = "fontstyle" 
                                        style = {{fontWeight:700,fontSize:'15px'}}>Imports Audit</Label>
                                    </Colxx>
                                </Row>
                            </div>
                    <div className = "row" style={{padding:'10px'}}>
                        </div>
                        </div>
                }
                {typeofaudit === 9 && this.renderotherActivities() }
                {typeofaudit === 10 && 
                <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "publish-title" >
                                <Row>
                                    <Colxx xxs="4">
                                        <Label  className = "fontstyle" 
                                        style = {{fontWeight:700,fontSize:'15px'}}>1st Instance DC (SDEM 0101 Report)</Label>
                                    </Colxx>
                                </Row>
                            </div>
                    <div className = "row" style={{padding:'10px'}}>
                    <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Exception Issue Date</Label>
                            <DatePicker
                                selected={surprisestarttime}
                                onChange={(date) => this.setState({surprisestarttime  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Exception Number</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {customer}  
                            onChange= {(e)=>this.setState({customer : e.target.value})} 
                            />
                        </div>
                    <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Shipment Number</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {shipmentnumber}  
                            onChange= {(e)=>this.setState({shipmentnumber : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Customer Matchcode</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {customer}  
                            onChange= {(e)=>this.setState({customer : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >MTD Number</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {mtdnumber}  
                            onChange= {(e)=>this.setState({mtdnumber : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Issuer Matchcode</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {userid}  
                            onChange= {(e)=>this.setState({userid : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Region (Issuer)</Label>
                            <Select  
                            className="react-select fontstyle"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={regiondata.filter(option =>option.value === region)}
                            options={regiondata}
                            onChange={({value}) => this.setState({  region: value })}
                      />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Subregion (Issuer)</Label>
                                 <Select  
                                className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={teamdata.filter(option =>option.value === team)}
                                options={teamdata}
                                onChange={({value}) => this.setState({  team: value })}
                      />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Area (Issuer)</Label>
                            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={reqtypedata.filter(option =>option.value === reqtype)}
                        options={reqtypedata}
                        // onChange={this.handlecustomtype}
                        onChange={({value}) => this.setState({  reqtype: value })}
                      />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Subarea (Issuer)</Label>
                            <Select  
                            className="react-select fontstyle"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={reqtypedata.filter(option =>option.value === reqtype)}
                            options={reqtypedata}
                            // onChange={this.handlecustomtype}
                            onChange={({value}) => this.setState({  reqtype: value })}
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Error Code Group</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {cender}  
                            onChange= {(e)=>this.setState({center : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Receiver</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {shipergsc}  
                            onChange= {(e)=>this.setState({shipergsc : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >User of last action</Label>
                            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={amttypedata.filter(option =>option.value === amttype)}
                        options={amttypedata}
                        onChange={({value}) => this.setState({  amttype: value })}
                      />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Capturing User</Label>
                            <Select  
                        className="react-select fontstyle"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={remarksdata.filter(option =>option.value === mafremarks)}
                        options={remarksdata}
                        onChange={({value}) => this.setState({  mafremarks: value })}
                      />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Exception Status</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {cender}  
                            onChange= {(e)=>this.setState({center : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Error Status</Label>
                            <Select  
                            className="react-select fontstyle"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={errordata.filter(option =>option.value === error)}
                            options={errordata}
                            onChange={({value}) => this.setState({  error: value })}
                        />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >L</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {shipergsc}  
                            onChange= {(e)=>this.setState({shipergsc : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Missed To Mark SDEM Correctly in Other DC</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {comment}  
                            onChange= {(e)=>this.setState({comment : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Audited Date</Label>
                            <DatePicker
                                selected={auditeddate}
                                onChange={(date) => this.setState({auditeddate  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Auditor</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {comment}  
                            onChange= {(e)=>this.setState({comment : e.target.value})} 
                            />
                        </div> 
                    </div>
                </div>   
    }
                <div className = "row text-center" style = {{margin:'0px 5px'}}>
                          <Button className = "button-width" color="secondary" 
                                // onClick={()=>this.close(false,false,{})}
                                >Save </Button> 
                          <Button className = "button-width" color="primary" 
                                // onClick={()=>this.close(false,false,{})}
                                >Reset </Button> 
                    </div>
            </div>
          </>
        )
    }
    renderotherActivities()
    {
        const {team,area,region,startdate,enddate} = this.state
        return(
            <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "publish-title" >
                                <Row>
                                    <Colxx xxs="4">
                                        <Label  className = "fontstyle" 
                                        style = {{fontWeight:700,fontSize:'15px'}}>Other Audit ( extra text box for Comment)</Label>
                                    </Colxx>
                                </Row>
                            </div>
                        <div className = "row" style={{padding:'10px'}}>
                            <div className = "col-lg-2-0 space-margin">
                                    <Label  className = "fontstyle normal-font" >Team</Label>
                                    <Input  className = "fontstyle text-background"  
                                    placeholder = ''
                                    value = {team}  
                                    onChange= {(e)=>this.setState({team : e.target.value})} 
                                    />
                            </div> 
                            <div className = "col-lg-2-0 space-margin">
                                    <Label  className = "fontstyle normal-font" >Area</Label>
                                    <Input  className = "fontstyle text-background"  
                                    placeholder = ''
                                    value = {area}  
                                    onChange= {(e)=>this.setState({area : e.target.value})} 
                                    />
                            </div> 
                            <div className = "col-lg-2-0 space-margin">
                                    <Label  className = "fontstyle normal-font" >Region</Label>
                                    <Input  className = "fontstyle text-background"  
                                    placeholder = ''
                                    value = {region}  
                                    onChange= {(e)=>this.setState({region : e.target.value})} 
                                    />
                            </div>
                            <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >Start Date / Time</Label>
                            <DatePicker
                                selected={startdate}
                                onChange={(date) => this.setState({startdate  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >End Date / Time</Label>
                            <DatePicker
                                selected={enddate}
                                onChange={(date) => this.setState({enddate  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />

                        </div>
                        <div className = "col-lg-2-0 space-margin">
                                    <Label  className = "fontstyle normal-font" >Comments</Label>
                                    <Input  className = "fontstyle text-background"  
                                    placeholder = ''
                                    value = {region}  
                                    onChange= {(e)=>this.setState({region : e.target.value})} 
                                    />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                                    <Label  className = "fontstyle normal-font" >Activity Type</Label>
                                    <Input  className = "fontstyle text-background"  
                                    placeholder = ''
                                    value = {region}  
                                    onChange= {(e)=>this.setState({region : e.target.value})} 
                                    />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                                    <Label  className = "fontstyle normal-font" >Audit Date</Label>
                                    <DatePicker
                                    selected={enddate}
                                    onChange={(date) => this.setState({enddate  : date})}
                                    timeInputLabel="Time:"
                                    dateFormat="MM/dd/yyyy h:mm aa"
                                    showTimeInput
                                />
                        </div>
                        <div className = "col-lg-2-0 space-margin">
                                <Label  className = "fontstyle normal-font" >Auditor</Label>
                                <Input  className = "fontstyle text-background"  
                                placeholder = ''
                                value = {region}  
                                onChange= {(e)=>this.setState({region : e.target.value})} 
                                />
                        </div>
                            
                            
                    </div>
                </div>   
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

