import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Checkbox} from 'antd';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.stattimee = {
        username:'',
        startdate:'',
        endtime:'',
        date:'',
        week:'',
        region:'',
        charges:'',
        mtdnumber:'',
        cnmc:'',
        receivedtime:'',
        type:'',
        unit: '',
        tattime: '',
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
        navigator.clipboard.writeText(this.stattimee.shipment)
    }

    render()
    {
        const {match} = this.props
        const {username,date,endtime,startdate,week,region,charges,regoin_Data,type,mtdnumber,receivedtime,cnmc,unit,tattime} = this.stattimee
        return (
            <>
            <title>DO / RAD / Mail Count Sheet</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading="DO / RAD / Mail Count Sheet" match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
            <div className = "" style = {{borderRadius:'10px',marginBottom:'10px'}}>
                    <div className = "row" >
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>User Name</a><br></br>  Test</Label>
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>Start Time</a><br></br>  12/2/2021 12.30 PM</Label>
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>End Time</a><br></br>  15/2/2021 01.30 PM</Label>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>Week</a><br></br>  1</Label>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>Date</a><br></br>  12/2/2021</Label>
                        </div>
                    </div>
                </div>  
                <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                  <div className = "publish-title" >
                          <Row>
                              <Colxx xxs="12">
                                  <Label  className = "fontstyle" 
                                  style = {{fontWeight:700,fontSize:'15px'}}>Release Form</Label>
                                  
                              </Colxx>
                          </Row>
                          </div>
                          <div className = "row" style = {{padding:'10px'}}>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >Region</Label>
                                        <Select  
                                            style={{height:'85px'}}
                                            className="react-select fontstyle"
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={regoin_Data.filter(option =>option.value === region)}
                                            options={regoin_Data}
                                            onChange={({value}) => this.setStattimee({  region: value })}
                                        />
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >Charges</Label>
                                    <Select  
                                            style={{height:'85px'}}
                                            className="react-select fontstyle"
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={regoin_Data.filter(option =>option.value === charges)}
                                            options={regoin_Data}
                                            onChange={({value}) => this.setStattimee({  charges: value })}
                                        />
                                </div>
                                
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >MTD Number</Label>
                                    <Input  className = "fontstyle text-background"
                                         type="number"
                                        value = {mtdnumber}  
                                        onChange= {(e)=>this.setStattimee({mtdnumber  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >CN MC</Label>
                                    <Input  className = "fontstyle text-background"
                                        value = {cnmc}  
                                        onChange= {(e)=>this.setStattimee({cnmc  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >Received Time</Label>
                                    <Input  className = "fontstyle text-background"  
                                    placeholder = ''
                                    value = {receivedtime}  
                                    onChange= {(e)=>this.setStattimee({receivedtime : e.target.value})} 
                                    />
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >Type</Label>
                            <Select  
                                    style={{height:'85px'}}
                                    className="react-select fontstyle"
                                    classNamePrefix="react-select"
                                    name="form-field-name"
                                    value={regoin_Data.filter(option =>option.value === type)}
                                    options={regoin_Data}
                                    onChange={({value}) => this.setStattimee({  type: value })}
                                />
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >Unit</Label>
                                    <Input  className = "fontstyle text-background"
                                        value = {unit}  
                                        onChange= {(e)=>this.setStattimee({unit  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >TAT Time</Label>
                                    <Input  className = "fontstyle text-background"
                                        value = {tattime}  
                                        onChange= {(e)=>this.setStattimee({tattime  : e.target.value})} ></Input>
                                </div>
                                
                               
                                
                             </div>
                             <div className = "row text-center" >
                                <div className = "col-md-3"></div>
                                    <div className = "col-md-2">
                                    <Button className = "button-width" color="secondary"  
                                            onClick={()=>this.onPaste()}
                                            >Save</Button> 
                                    </div>
                                    <div className = "col-md-2">
                                    <Button className = "button-width" color="primary"  
                                            // onClick={()=>this.close(false,false,{})}
                                            >Refresh </Button> 
                                    </div>
                                    <div className = "col-md-2">
                                        <Button className = "button-width" color="secondary"  
                                                // onClick={()=>this.onCopy()}
                                    >Raw Data</Button>
                                    </div>
                            </div>
                
                </div> 
              </div>
          </>
        )
    }
}

const mapStattimeeToProps = ({  authUser }) => {
   
  
    const { currentUser } = authUser;
    return {
      currentUser
    };
  };
  export default withRouter(
    connect(mapStattimeeToProps, {

   })(QueryResolveSheet)
  );

