import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { Table,Checkbox } from 'antd';

import "react-datepicker/dist/react-datepicker.css";
import { adminRoot } from "../../../../constants/defaultValues";
import {columns } from '../sampledata'

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data:[],
        

      };
    }
    componentDidMount()
    {
      
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
        navigator.clipboard.writeText(this.state.shipment_no)
    }
    onChangeFileUpload(files)
    {

    }
    onClickDetails(){
        this.props.history.push(`${adminRoot}/ra/details-box`)
        }
    render()
    {
        const {match} = this.props
        const {data} = this.state
        return (
            <>
            <title>Administrator</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading="Administrator" match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
                  
                    <div  style = {{borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row text-center">
                        <div className = "col-md-7">
                            <div className = "row"> 
                                <div className = "col-md-4">
                                <Button className = "button-width" color="secondary"  style={{width:'150px'}}
                                        // onClick={()=>this.onClickDetails()}
                                        >Start Backup</Button> 
                                </div>
                                <div className = "col-md-4">
                                <Button className = "button-width" color="primary"  style={{width:'150px'}}
                                        onClick={()=>this.onClickDetails()}
                                        >Add New Names</Button> 
                                </div>
                                <div className = "col-md-4">
                                <Button className = "button-width" color="secondary"  style={{width:'150px'}}
                                        onClick={()=>this.onClickDetails()}
                                        >Login Status</Button> 
                                </div>
                                <div className = "col-md-4">
                                <Button className = "button-width" color="secondary"  style={{width:'150px'}}
                                        onClick={()=>this.onClickDetails()}
                                        >Main Menu</Button> 
                                </div>
                                <div className = "col-md-4">
                                <Button className = "button-width" color="primary"  style={{width:'150px'}}
                                        onClick={()=>this.onClickDetails()}
                                        >Logout All User</Button> 
                                </div>
                                <div className = "col-md-4">
                                <Button className = "button-width" color="secondary"  style={{width:'150px'}}
                                        onClick={()=>this.onClickDetails()}
                                        >AMD / Contract</Button> 
                                </div>
                                <div className = "col-md-4">
                                <Button className = "button-width" color="secondary"  style={{width:'150px'}}
                                        onClick={()=>this.onClickDetails()}
                                        >Exit</Button> 
                                </div>
                                <div className = "col-md-4">
                                <Button className = "button-width" color="primary"  style={{width:'150px'}}
                                        onClick={()=>this.onClickDetails()}
                                        >Login</Button> 
                                </div>
                                <div className = "col-md-4">
                                <Button className = "button-width" color="secondary"  style={{width:'150px'}}
                                        onClick={()=>this.onClickDetails()}
                                        >Startup</Button> 
                                </div>
                            </div>
                        </div>
                    </div> 
                    </div>
               
             
            <div> 
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

