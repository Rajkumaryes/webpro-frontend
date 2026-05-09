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
        startdate:'',
        enddate:'',
        team:'',
        report:'',
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
        navigator.clipboard.writeText(this.state.shipment)
    }

    render()
    {
        const {match} = this.props
        const {enddate,startdate,report,team,regoin_Data} = this.state
        return (
            <>
            <title>Reports</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading="Reports" match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
            <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                          <div className = "row" style = {{padding:'10px'}}>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >Team</Label>
                                        <Select  
                                            style={{height:'85px'}}
                                            className="react-select fontstyle"
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={regoin_Data.filter(option =>option.value === team)}
                                            options={regoin_Data}
                                            onChange={({value}) => this.setState({  team: value })}
                                        />
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >Reports</Label>
                                    <Select  
                                            style={{height:'85px'}}
                                            className="react-select fontstyle"
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={regoin_Data.filter(option =>option.value === report)}
                                            options={regoin_Data}
                                            onChange={({value}) => this.setState({  report: value })}
                                        />
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >Start Date / Time</Label>
                                    <DatePicker
                                        selected={startdate}
                                        onChange={(date) => this.setState({startdate  : date})}
                                        timeInputLabel="Time:"
                                        dateFormat="MM/dd/yyyy h:mm aa"
                                        showTimeInput
                                    />
                                
                            </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >End Date  / Time</Label>
                                    <DatePicker
                                        selected={enddate}
                                        onChange={(date) => this.setState({enddate  : date})}
                                        timeInputLabel="Time:"
                                        dateFormat="MM/dd/yyyy h:mm aa"
                                        showTimeInput
                                    />
                                </div>
                             </div>
                             <div className = "row" style = {{padding:'0px 0px 20px'}}>
                                <div className = "col-md-5"></div>

                                    <div className = "col-md-2">
                                    <Button className = "button-width" color="secondary"  style={{width:'150px'}}
                                            // onClick={()=>this.close(false,false,{})}
                                            >
                                                <i className = "simple-icon-cloud-download" style = {{marginRight:'5px'}}/>
                                                Download </Button> 
                                    </div>
                                  
                            </div>
                
                </div> 
              </div>
          </>
        )
    }
}

const mapStateToProps = ({  settings }) => {
   
    const { locale,languageData} = settings;
    return {locale, languageData};
  };
  export default withRouter(
    connect(mapStateToProps, {

   })(QueryResolveSheet)
  );

