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
        type:'',
        report_type:'',
        weekly_eq:'',
        leaves:'',
        errors:'',
        non_Productive_days:'',
        workingdays:'',
        mqc_target:'',
        accuracy_calculation:'',
        cross_border_process:'',
        cross_border_pending:'',
        contract_received_report:'',
        contract_process_report:'',
        contract_pending:'',
        startdate:'',
        enddate:'',
        oot:'',
        contract_pending_auditor:'',
        details:'',
        publish:'',
        audit:'',
        report_type_data:[],
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
        navigator.clipboard.writeText(this.state.type)
    }
    onChangeFileUpload(files)
    {

    }
    render()
    {
        const {match} = this.props
        const {report_type_data,report_type,weekly_eq,leaves,errors,non_Productive_days,workingdays,mqc_target,accuracy_calculation,cross_border_process,cross_border_pending,
        contract_received_report,contract_process_report,contract_pending,startdate,enddate,oot,contract_pending_auditor,details,publish,audit} = this.state
        return (
            <>
            <title>Reports</title>
            <Row>
              <Colxx xxs="12">
              <div className = "row">
                      <div className = "col-md-8">
                        <Breadcrumb heading="Reports" match={match} />
                    </div>
                    {/* <div className = "col-md-2">
                        <Button className = "button-width" color="primary" style= {{width :'100%'}}>
                            <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fonterrors:'12px'}}/>
                            <a style= {{margin :'0px'}} > Upload</a>
                            <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                                className = "filepicker_customButton"
                                style = {{width : '80%',marginLeft :'-56%'}}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
                        </Button>
                    </div>
                    <div className = "col-md-2" >
                         <Button className = "button-width" color="secondary" style= {{width :'100%'}}>
                                 Download
                          </Button>
                    </div> */}
                  </div>
                
               
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row" style = {{marginBottom:'10px'}}>
                        <div className = "col-md-5 space-margin"  >
                            <Label  className = "fontstyle normal-font" >Start Date</Label>
                            <DatePicker
                                selected={startdate}
                                onChange={(date) => this.setState({startdate  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                           
                        </div>
                        <div className = "col-md-5 space-margin"  >
                            <Label  className = "fontstyle normal-font" >End Date</Label>
                            <DatePicker
                                selected={enddate}
                                onChange={(date) => this.setState({enddate  : date})}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className = "col-md-2" style={{marginTop:'16px'}}>
                          <Button className = "button-width" color="primary"  style={{width:'150px'}}
                                // onClick={()=>this.close(false,false,{})}
                                >Save </Button> 
                         </div>
                       
                    </div>
                    <div className = "row">
                        <div className = "col-md-12 text-center" >
                          <Button className = "button-width" color="secondary"  
                                // onClick={()=>this.close(false,false,{})}
                                >Daily Report </Button> 
                                  <Button className = "button-width" color="secondary"  
                                // onClick={()=>this.close(false,false,{})}
                                >Individual Productivity - YTD </Button> 
                                 <Button className = "button-width" color="secondary" 
                                // onClick={()=>this.close(false,false,{})}
                                >UnProcess Amendments </Button>
                                <Button className = "button-width" color="secondary"  
                                // onClick={()=>this.close(false,false,{})}
                                >Management Information System </Button>  
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

