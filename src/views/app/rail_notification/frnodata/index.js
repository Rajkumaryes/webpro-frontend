import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        from:'',
        containerno:'',
        pickupno:'',
        tat:'',
        movement:'',
        location:'',
        subject:'',
        userid:'',
        containernumber:'',
        enddate:'',
        lastupdatetime:'',
        completedupdatetime:''
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
        const {userid,subject,containernumber,lastupdatetime,completedupdatetime} = this.state
        return (
            <>
            <title>Free Time Notification Data</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading="Free Time Notification Data" match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row" style = {{marginBottom:'10px'}}>
                    <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >Container Number</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {containernumber}  
                            onChange= {(e)=>this.setState({containernumber : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >User Id</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {userid}  
                            onChange= {(e)=>this.setState({userid : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >Last Update Time In FIS</Label>
                         
                               <Input  className = "fontstyle text-background"   
                           data-date-format='hh:mm a'
                           type="time"  
                           value = {lastupdatetime}  
                           onChange= {(e)=>this.setState({lastupdatetime : e.target.value})} 
                           />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >Completed Update Time In FIS</Label>
                         
                               <Input  className = "fontstyle text-background"   
                           data-date-format='hh:mm a'
                           type="time"  
                           value = {completedupdatetime}  
                           onChange= {(e)=>this.setState({completedupdatetime : e.target.value})} 
                           />
                        </div>
                        <div className = "col-md-12 space-margin"  >
                            <Label  className = "fontstyle normal-font" >Subject</Label><br></br>
                            <textarea className = "fontstyle textarea-background"  
                                placeholder = ''
                                value = {subject}  
                                onChange= {(e)=>this.setState({subject : e.target.value})} 
                            />
                        </div>
                        
                    </div>
                    <div className = "row text-center">                
                          <Button className = "button-width" color="secondary"  
                                onClick={()=>this.onPaste()}
                                >Paste</Button>                   
                          <Button className = "button-width" color="primary"  
                                // onClick={()=>this.close(false,false,{})}
                                >Save </Button>                       
                             <Button className = "button-width" color="secondary" 
                                    // onClick={()=>this.onCopy()}
                           >Refresh</Button>               
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

