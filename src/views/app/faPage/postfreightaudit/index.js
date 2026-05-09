import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import { date } from 'yup';

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        csbooking:'',
        startdate:'',
        enddate:'',
        region:'',
        date:'',
        subregion:'',
        area:'',
        ccsales:'',
        mr:'',
        office:'',
        pol:'',
        pod:'',
        regoin_Data:[],
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
        navigator.clipboard.writeText(this.state.containerno)
    }
    onChangeRadio(value)
    {
        this.setState({activity:value})
    }
    render()
    {
        const {match} = this.props
        const {pod,regoin_Data,startdate,enddate,region,subregion,ccsales,area,mr,pol,csbooking,office} = this.state
        return (
            <>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading="Post Freight Audit Overview" match={match} />
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
                            <Label  className = "fontstyle normal-font" >Sub Region</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {subregion}  
                            onChange= {(e)=>this.setState({subregion : e.target.value})} 
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
                            <Label  className = "fontstyle normal-font" >CC Sales</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {ccsales}  
                            onChange= {(e)=>this.setState({ccsales : e.target.value})} 
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
                            <Label  className = "fontstyle normal-font" >Date</Label>
                            <Input className = "fontstyle text-background" data-date-format='mm/dd/yy'
                                type="date"
                                value = {date}  
                                onChange= {(e)=>this.setState({date  : e.target.value})} ></Input>
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >Start Date</Label>
                            <Input className = "fontstyle text-background" data-date-format='mm/dd/yy'
                                type="date"
                                value = {startdate}  
                                onChange= {(e)=>this.setState({startdate  : e.target.value})} ></Input>
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >End Date</Label>
                            <Input className = "fontstyle text-background" data-date-format='mm/dd/yy'
                                type="date"
                                value = {enddate}  
                                onChange= {(e)=>this.setState({enddate  : e.target.value})} ></Input>
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
                      
                        
                    </div>
                    <div className = "row" style = {{marginBottom:'10px'}}>
                       <div className = "col-md-3"></div>
                        <div className = "col-md-2">
                          <Button className = "button-width" color="secondary"  style={{width:'150px'}}
                                onClick={()=>this.onPaste()}
                                >Back</Button> 
                         </div>
                         <div className = "col-md-2">
                             <Button className = "button-width" color="primary" style={{width:'150px'}} 
                                    // onClick={()=>this.onCopy()}
                           >Import Audit</Button>
                         </div>
                         <div className = "col-md-2">
                          <Button className = "button-width" color="secondary"  style={{width:'150px'}}
                                // onClick={()=>this.close(false,false,{})}
                                >Export Audit </Button> 
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

