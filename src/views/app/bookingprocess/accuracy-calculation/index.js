import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
// import { Checkbox, Popconfirm ,Tooltip } from 'antd';
import Select from 'react-select';

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        qscuserid:'',
        cumatchcode:'',
        status:'',
        mrmatchcode:'',
        gsc_status:[],
        handlingdata:[],
        gsc_action_plan:[],
        bookingnumber:'',
        description:'',
        finalbbooking:'',
        teamdata:[],
        abc:[],
        abcdata:[],
        errorvalue:[],
        errordata:[],
        team:'',
        date:'',
        finalberrordata:[],
        gsc_action_plandata:[],
        booking_no_data:[
            {label:'Original',value:'Original'},
            {label:'Replacement',value:'Replacement'},
        ],
        booking_no:'',
        week_no:''
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
        navigator.clipboard.writeText(this.state.qscuserid)
    }
    handleteam = (selectedOptions) => {
        this.setState({team : selectedOptions.value})  
    } 
    handleabc = (selectedOptions) => {
        this.setState({abc : selectedOptions.value})  
    } 
    handlehandlingdata = (selectedOptions) => {
        this.setState({gsc_status : selectedOptions.value})  
    } 
    handleerrorvalue = (selectedOptions) => {
        this.setState({errorvalue : selectedOptions.value})  
    } 

    handlefinalbbooking = (selectedOptions) => {
        this.setState({finalbbooking : selectedOptions.value})  
    } 
    handlegsc_action_plan = (selectedOptions) => {
        this.setState({gsc_action_plan : selectedOptions.value})  
    } 
    render()
    {
        const {match} = this.props
        const {qscuserid,cumatchcode,team,mrmatchcode,gsc_status,gsc_action_plan,gsc_userid,description,bookingnumber,
        errorvalue,date,errordata,teamdata,week_no} = this.state
        return (
            <>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading="Accuracy Calculation" match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row">
                        <div className = "col-md-3  space-margin">
                            <Label  className = "fontstyle normal-font" >QSC UserID</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {qscuserid}  
                            onChange= {(e)=>this.setState({qscuserid : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3  space-margin">
                            <Label  className = "fontstyle normal-font" >Date</Label>
                            <Input className = "fontstyle text-background" data-date-format='mm/dd/yy'
                                type="date"
                                value = {date}  
                                onChange= {(e)=>this.setState({date : e.target.value})} ></Input>
                        </div>
                        <div className = "col-md-3  space-margin">
                            <Label  className = "fontstyle normal-font" >Team Name</Label>
                            <Select  
                             style={{height:'85px'}}
                            className="react-select fontstyle"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={teamdata.filter(option =>option.value === team)}
                            options={teamdata}
                            onChange={this.handleteam}
                            />
                        </div>
                        <div className = "col-md-3  space-margin">
                            <Label  className = "fontstyle normal-font" >Booking Number</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {bookingnumber}  
                            onChange= {(e)=>this.setState({bookingnumber : e.target.value})} 
                            />
                        </div>
                       
                        <div className = "col-md-3  space-margin">
                            <Label  className = "fontstyle normal-font" >Customer Match Code</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {cumatchcode}  
                            onChange= {(e)=>this.setState({cumatchcode : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3  space-margin">
                            <Label  className = "fontstyle normal-font" >MR Match Code</Label>
                            <Input className = "fontstyle text-background" 
                                value = {mrmatchcode}  
                                onChange= {(e)=>this.setState({mrmatchcode : e.target.value})} ></Input>
                        </div>
                        <div className = "col-md-3  space-margin">
                            <Label  className = "fontstyle normal-font" >Error Type</Label>
                            <Select  
                             style={{height:'85px'}}
                            className="react-select fontstyle"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={errordata.filter(option =>option.value === errorvalue)}
                            options={errordata}
                            onChange={this.handleerrorvalue}
                            />
                        </div>
                        <div className = "col-md-3  space-margin">
                            <Label  className = "fontstyle normal-font" >GSC Status</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {gsc_status}  
                            onChange= {(e)=>this.setState({gsc_status : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3  space-margin">
                            <Label  className = "fontstyle normal-font" >GSC Action Plan</Label>
                             <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {gsc_action_plan}  
                            onChange= {(e)=>this.setState({gsc_action_plan : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3  space-margin">
                            <Label  className = "fontstyle normal-font" >GSC UserID</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {gsc_userid}  
                            onChange= {(e)=>this.setState({gsc_userid : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3  space-margin">
                            <Label  className = "fontstyle normal-font" >Week No</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {week_no}  
                            onChange= {(e)=>this.setState({week_no : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-12 space-margin">
                            <Label  className = "fontstyle normal-font" >Resolution</Label>
                            <textarea  className = "fontstyle textarea-background"  
                            placeholder = ''
                            value = {description}  
                            onChange= {(e)=>this.setState({description : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-12 space-margin">
                            <Label  className = "fontstyle normal-font" >Error Description</Label>
                            <textarea  className = "fontstyle textarea-background"  
                            placeholder = ''
                            value = {description}  
                            onChange= {(e)=>this.setState({description : e.target.value})} 
                            />
                        </div>
                    </div>
                    <div className = "row text-center">                       
                          <Button className = "button-width" color="primary" 
                                // onClick={()=>this.close(false,false,{})}
                                >Save </Button>                          
                          <Button className = "button-width" color="secondary"  
                                onClick={()=>this.onPaste()}
                                >Cancel</Button>                      
                         
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

