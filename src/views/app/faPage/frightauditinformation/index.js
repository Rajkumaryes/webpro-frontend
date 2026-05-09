import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import { date } from 'yup';
import { Checkbox, Popconfirm ,Tooltip } from 'antd';

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
        isexport:''
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
        const {isexport,regoin_Data,region,csbooking} = this.state
        return (
            <>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading="Freight Audit Information" match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row">
                        <div className = "col-md-1 space-margin"  >
                             <div  style = {{marginTop:'16px'}}> 
                           <Checkbox color="blue" checked = {isexport === "Export"} onChange = {()=>this.setState({isexport:'Export'})}> 
                               <Label style = {{marginLeft:'5px'}} className = "fontstyle normal-font" >Export</Label>
                           </Checkbox>
                           </div>
                        </div>
                        <div className = "col-md-1 space-margin"  >
                             <div  style = {{marginTop:'16px'}}> 
                           <Checkbox color="blue" checked = {isexport === "Import"} onChange = {()=>this.setState({isexport:'Import'})}> 
                               <Label style = {{marginLeft:'5px'}} className = "fontstyle normal-font" >Import</Label>
                           </Checkbox>
                           </div>
                        </div>
                    </div>

                     <div className = "row">
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >Date</Label>
                            <Input className = "fontstyle text-background" data-date-format='mm/dd/yy'
                                type="date"
                                value = {date}  
                                onChange= {(e)=>this.setState({date  : e.target.value})} ></Input>
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >Auditior</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {csbooking}  
                            onChange= {(e)=>this.setState({csbooking : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >Quality</Label>
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
                         <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >Overcharged</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {csbooking}  
                            onChange= {(e)=>this.setState({csbooking : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >Undercharged</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {csbooking}  
                            onChange= {(e)=>this.setState({csbooking : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-12 space-margin"  >
                        <Label  className = "fontstyle normal-font" >Action Party</Label>
                             <div  style = {{marginTop:'5px'}}> 
                           <Checkbox color="blue" > 
                               <Label style = {{marginLeft:'5px',marginRight: '11px'}} className = "fontstyle normal-font" >Sales</Label>
                           </Checkbox>
                           <Checkbox color="blue" > 
                               <Label style = {{marginLeft:'5px',marginRight: '11px'}} className = "fontstyle normal-font" >CSB</Label>
                           </Checkbox>
                           <Checkbox color="blue" > 
                               <Label style = {{marginLeft:'5px',marginRight: '11px'}} className = "fontstyle normal-font" >CSD</Label>
                           </Checkbox>
                           <Checkbox color="blue" > 
                               <Label style = {{marginLeft:'5px',marginRight: '11px'}} className = "fontstyle normal-font" >CSI</Label>
                           </Checkbox> <Checkbox color="blue" > 
                               <Label style = {{marginLeft:'5px',marginRight: '11px'}} className = "fontstyle normal-font" >TM</Label>
                           </Checkbox>
                           <Checkbox color="blue" > 
                               <Label style = {{marginLeft:'5px',marginRight: '11px'}} className = "fontstyle normal-font" >CP</Label>
                           </Checkbox>
                           <Checkbox color="blue" > 
                               <Label style = {{marginLeft:'5px',marginRight: '11px'}} className = "fontstyle normal-font" >CC</Label>
                           </Checkbox>
                           </div>
                        
                          
                        </div>
                        <div className = "col-md-12 space-margin">
                            <Label  className = "fontstyle normal-font" >Comment</Label>
                            <textarea className = "fontstyle textarea-background"  
                                placeholder = ''
                                // value = {filename}  
                               
                                // onChange= {(e)=>this.setState({filename : e.target.value})}
                                 /> 
                            </div>
                         
                    </div>
                 

                    <div className = "row">
                    <div className = "col-md-5"></div>
                    <div className = "col-md-2">
                        <Button className = "button-width" color="primary"  style={{width:'150px'}}
                          onClick={()=>this.onPaste()}
                          >Saved</Button> 
                       
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

