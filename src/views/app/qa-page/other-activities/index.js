import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        vesselname:'',
        enddatetime:'',
        status:'',
        userid:'',
        handlingtype:[],
        handlingdata:[],
        reason:[],
        bookingnumber:'',
        activity:[],
        weekno:'',
        finalbbooking:'',
        emaildatetime:'',
        activitytypedata:[{id:1,label:'Projected '},
                          {id:2,label:'Actual'},
                          {id:3,label:'Query'}],
        abc:[],
        abcdata:[],
        bookingtype:[],
        bookingdata:[],
        activitytype:'',
        date:'',
        tat:''
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
        navigator.clipboard.writeText(this.state.vesselname)
    }
    handleactivitytype = (selectedOptions) => {
        this.setState({activitytype : selectedOptions.value})  
    } 
    
    render()
    {
        const {match} = this.props
        const {team,area,region,startdate,enddate} = this.state
        return (
            <>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading="Other Activities" match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
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
                <div className = "row">
                       <div className = "col-md-4"></div>
                         <div className = "col-md-2">
                          <Button className = "button-width" color="primary"  style={{width:'150px'}}
                                // onClick={()=>this.close(false,false,{})}
                                >Save </Button> 
                         </div>
                         <div className = "col-md-2">
                          <Button className = "button-width" color="secondary"  style={{width:'150px'}}
                                onClick={()=>this.onPaste()}
                                >Cancel</Button> 
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

