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
        csbooking:'',
        mr:'',
        region:'',
        dataselected:'',
        subregion:'',
        startdate:'',
        enddate:'',
        area:'',
        office: '',
        qualityexp: '',
        qualityimp: '',
        pol: '',
        pod: '',
        ccsalesheir: '',   
        regoin_Data:[]

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
        navigator.clipboard.writeText(this.state.mr)
    }
    onChangeRadio(value)
    {
        this.setState({activity:value})
    }
    render()
    {
        const {match} = this.props
        const {mr,region,subregion,startdate,area,csbooking,enddate,office, pol,pod,dataselected,qualityexp, 
            qualityimp,ccsalesheir,regoin_Data} = this.state
        return (
            <>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading=" Freight Audit Detailed Findings" match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row" style = {{marginBottom:'10px'}}>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >Cs Booking</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {csbooking}  
                            onChange= {(e)=>this.setState({csbooking : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >MR</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {mr}  
                            onChange= {(e)=>this.setState({mr : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >Region</Label>
                            <Select  
                                style={{height:'85px'}}
                                className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={regoin_Data.filter(option =>option.value === region)}
                                options={regoin_Data}
                                onChange={({value}) => this.setState({  region: value })}
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >Data selected</Label>
                                <Select  
                                style={{height:'85px'}}
                                className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={regoin_Data.filter(option =>option.value === dataselected)}
                                options={regoin_Data}
                                onChange={({value}) => this.setState({  dataselected: value })}
                            />
                            
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >Subregion</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {subregion}  
                            onChange= {(e)=>this.setState({subregion : e.target.value})} 
                            />
                                               
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >Start Date</Label>
                            {/* <Input  className = "fontstyle text-background"  data-date-format='mm/dd/yy'
                                type="date"
                             value = {startdate}  
                            onChange= {(e)=>this.setState({startdate : e.target.value})} 
                            /> */}
                             <DatePicker
                                selected={startdate}
                                onChange={(date) => {this.changecontractstartdate(date)}}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                                />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >End Date</Label>
                            <Input  className = "fontstyle text-background"  
                          data-date-format='mm/dd/yy'
                          type="date"
                            value = {enddate}  
                            onChange= {(e)=>this.setState({enddate : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >Area</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {area}  
                            onChange= {(e)=>this.setState({area : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >Office</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {office}  
                            onChange= {(e)=>this.setState({office : e.target.value})} 
                            />
                        </div>
                        
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >POL</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {pol}  
                            onChange= {(e)=>this.setState({pol : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >POD</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {pod}  
                            onChange= {(e)=>this.setState({pod : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >CC Sales Heir</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {ccsalesheir}  
                            onChange= {(e)=>this.setState({ccsalesheir : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-6 space-margin"  >
                            <Label  className = "fontstyle normal-font" >Quality(Exp.)</Label>
                               <Select  
                                style={{height:'85px'}}
                                className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={regoin_Data.filter(option =>option.value === qualityexp)}
                                options={regoin_Data}
                                onChange={({value}) => this.setState({  qualityexp: value })}
                            />
                        </div>
                        <div className = "col-md-6 space-margin"  >
                            <Label  className = "fontstyle normal-font" >Quality(Imp.)</Label>
                             <Select  
                                style={{height:'85px'}}
                                className="react-select fontstyle"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={regoin_Data.filter(option =>option.value === qualityimp)}
                                options={regoin_Data}
                                onChange={({value}) => this.setState({  qualityimp: value })}
                            />
                        </div>
                      

                    </div>
                    <div className = "row" style = {{marginBottom:'10px'}}>
                       <div className = "col-md-4"></div>
                        
                         <div className = "col-md-2">
                          <Button className = "button-width" color="primary"  style={{width:'150px'}}
                                // onClick={()=>this.close(false,false,{})}
                                >Back </Button> 
                         </div>
                         <div className = "col-md-2">
                             <Button className = "button-width" color="secondary" style={{width:'150px'}} 
                                    // onClick={()=>this.onCopy()}
                           >Process</Button>
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

