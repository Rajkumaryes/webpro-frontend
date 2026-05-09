// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import {  withRouter } from 'react-router-dom';
// import { Row } from 'reactstrap';
// import { Label,Input,Button} from 'reactstrap';
// import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
// import Breadcrumb from '../../../../containers/navs/Breadcrumb';
// import DatePicker from "react-datepicker";
// import { Table,Checkbox } from 'antd';

// import "react-datepicker/dist/react-datepicker.css";
// import Select from 'react-select';
// import {columns1 } from '../sampledata'

// class Sidebar extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {

//         region:'',
//         type:'',
//         container_no:'',
//         unit: '',
//         tat_time: '',
//         received_time:'',
//         changes:'',
//         pc:'',cc:'',
//         customtypedata:[],
//         data:[],
//         is_rawdata:false,
//         userid:''
//       };
//     }
//     componentDidMount()
//     {
//       var list = []
//       for(var i = 0; i<1;i++)
//       {
//         var dict = {
//           'Date':'12/2/2021',
//           'Team Name':'7575767',
//           'Booking Number':'875757',
//           'Vendor Name':'FLISNDERS PART',
//           'Customer MC':'7576',
//           'MR Match Code':'$9798',
//           'Error Type':'INR',
//           'Error Description':'XCG 00067',
//           'GSC UserID':'TEST',
//           'QSC UserID':'ABCDEFG',

//           }
//         list.push(dict)
//       }
//       this.setState({
//         data:list
//       })
//     }
//     handlecustomtype = (selectedOptions) => {
//         this.setState({region : selectedOptions.value})  
//       }  
//     render()
//     { 
//         const{region,container_no,data,customtypedata,received_time,changes,userid}=this.state
//         const {match} = this.props
//         return (
//             <>
//             <Row>
//               <Colxx xxs="12">
//               <div className = "row">
//                       <div className = "col-md-10">
//                       <Breadcrumb heading="Internal Error" match={match} />
//                     </div>
//                     <div className = "col-md-2">
//                         <Button className = "button-width" color="primary" style= {{width :'100%'}}>
//                             <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
//                             <a style= {{margin :'0px'}} > Upload</a>
//                             <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
//                                 className = "filepicker_customButton"
//                                 style = {{width : '80%',marginLeft :'-56%'}}
//                                 accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
//                                     onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
//                         </Button>
//                     </div>
                    
//                   </div>
               
               
               
//                 <Separator className = "separator-margin"/>
//               </Colxx>
//             </Row>
//             <div>
//           <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>

//                 <div className = "row">
//                          <div className = "col-md-3 space-margin"  >
//                             <Label  className = "fontstyle normal-font" >GSC UserID</Label>
  
//                             <Input  className = "fontstyle text-background"  
//                             // placeholder = 'End date'
//                             value = {userid}  
//                             onChange= {(e)=>this.setState({userid : e.target.value})} 
//                             />
                           
//                         </div>
//                         <div className = "col-md-3 space-margin"  >
//                             <Label  className = "fontstyle normal-font" >Date</Label>
  
//                             <Input  className = "fontstyle text-background"  
//                             type='date'
//                             placeholder = ''
//                             value = {received_time}  
//                             onChange= {(e)=>this.setState({received_time : e.target.value})} 
//                             />
                           
//                         </div>
                        
//                         <div className = "col-md-3 space-margin">
//                             <Label  className = "fontstyle normal-font" >Team Name</Label>
//                             <Select  
//                         className="react-select fontstyle"
//                         classNamePrefix="react-select"
//                         name="form-field-name"
//                         value={customtypedata.filter(option =>option.value === region)}
//                         options={customtypedata}
//                         onChange={({value}) => this.setState({  region: value })}
//                         />
//                         </div>
                      
//                         <div className = "col-md-3 space-margin">
//                             <Label  className = "fontstyle normal-font" >Booking Number</Label>
//                             <Input  className = "fontstyle text-background"  
//                             // placeholder = 'End date'
//                             type ='number'
//                             value = {container_no}  
//                             onChange= {(e)=>this.setState({container_no : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-md-3 space-margin">
//                             <Label  className = "fontstyle normal-font" >Customer MC</Label>
//                             <Input  className = "fontstyle text-background"  
//                             // placeholder = 'End date'
//                             value = {changes}  
//                             onChange= {(e)=>this.setState({changes : e.target.value})} 
//                             />
//                         </div>
                      
//                         <div className = "col-md-3 space-margin"  >
//                             <Label  className = "fontstyle normal-font" >MR Match Code</Label>
//                              <Input  className = "fontstyle text-background"  
//                             // placeholder = 'End date'
//                             value = {received_time}  
//                             onChange= {(e)=>this.setState({received_time : e.target.value})} 
//                             />
                           
//                         </div>
//                         <div className = "col-md-3 space-margin"  >
//                             <Label  className = "fontstyle normal-font" >Error Type</Label>
//                              <Input  className = "fontstyle text-background"  
//                             // placeholder = 'End date'
//                             value = {received_time}  
//                             onChange= {(e)=>this.setState({received_time : e.target.value})} 
//                             />
                           
//                         </div>
//                         <div className = "col-md-3 space-margin"  >
//                             <Label  className = "fontstyle normal-font" >Error Description</Label>
//                              <Input  className = "fontstyle text-background"  
//                             // placeholder = 'End date'
//                             value = {received_time}  
//                             onChange= {(e)=>this.setState({received_time : e.target.value})} 
//                             />
                           
//                         </div>
//                         <div className = "col-md-3 space-margin"  >
//                             <Label  className = "fontstyle normal-font" >Error UserID</Label>
//                              <Input  className = "fontstyle text-background"  
//                             // placeholder = 'End date'
//                             value = {received_time}  
//                             onChange= {(e)=>this.setState({received_time : e.target.value})} 
//                             />
                           
//                         </div>
                         
                        
//                     </div>
//                     <div className = "row" style = {{margin:'0px 5px',marginTop:'22px'}}>
//                     <div className = "col-md-4">  </div>
//                     <div className = "col-md-2">
//                             <Button 
//                             style={{width:'150px'}}
//                             className = "button-width" color="primary"  
//                                         // onClick={()=>this.close(false,false,{})}
//                                 >
//                                 Save 
//                             </Button>
//                             </div>
//                             <div className = "col-md-2">

//                                 <Button className = "button-width" color="secondary" 
//                                     style={{width:'150px'}} 
//                                     onClick={()=>this.setState({is_rawdata:false})}
//                                 >
//                                 Refresh
//                             </Button>
//                             </div>
                            
//                 </div>
           
//              </div>

//              <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>

//                   <div >
//                       <div style = {{padding :'10px'}}>
//                       <Table dataSource={data} columns={columns1} 
//                       rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}/>
//                       </div>  
                    
//                   </div>
//               </div>
        

             
                
//           </div>

//           </>
//         )
//     }
// }

// const mapStateToProps = ({  authUser }) => {
   
  
//     const { currentUser } = authUser;
//     return {
//       currentUser
//     };
//   };
//   export default withRouter(
//     connect(mapStateToProps, {

//    })(Sidebar)
//   );



// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import {  withRouter } from 'react-router-dom';
// import { Row } from 'reactstrap';
// import { Label,Input,Button} from 'reactstrap';
// import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
// import Breadcrumb from '../../../../containers/navs/Breadcrumb';
// // import { Checkbox, Popconfirm ,Tooltip } from 'antd';
// import Select from 'react-select';

// class QueryResolveSheet extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         gscuserid:'',
//         cumatchcode:'',
//         status:'',
//         mrmatchcode:'',
//         handlingtype:[],
//         handlingdata:[],
//         reason:[],
//         bookingnumber:'',
//         cargotype:[],
//         comments:'',
//         finalbbooking:'',
//         teamdata:[],
//         abc:[],
//         abcdata:[],
//         bookingtype:[],
//         bookingdata:[],
//         team:'',
//         date:'',
//         finalbbookingdata:[],
//         reasondata:[],
//         cargotypedata:[],
//         booking_no_data:[
//             {label:'Original',value:'Original'},
//             {label:'Replacement',value:'Replacement'},
//         ],
//         booking_no:''
//       };
//     }
//     onPaste() 
//     {
//         navigator.clipboard.readText().then((text)=>{
//             console.log("lkbkjj" , text)
//             console.log("lkbkjj" ,typeof text)
          
//         })
//     }
//     onCopy()
//     {
//         navigator.clipboard.writeText(this.state.gscuserid)
//     }
//     handleteam = (selectedOptions) => {
//         this.setState({team : selectedOptions.value})  
//     } 
//     handleabc = (selectedOptions) => {
//         this.setState({abc : selectedOptions.value})  
//     } 
//     handlehandlingdata = (selectedOptions) => {
//         this.setState({handlingtype : selectedOptions.value})  
//     } 
//     handlebookingtype = (selectedOptions) => {
//         this.setState({bookingtype : selectedOptions.value})  
//     } 
//     handlecargotype = (selectedOptions) => {
//         this.setState({cargotype : selectedOptions.value})  
//     } 
//     handlefinalbbooking = (selectedOptions) => {
//         this.setState({finalbbooking : selectedOptions.value})  
//     } 
//     handlereason = (selectedOptions) => {
//         this.setState({reason : selectedOptions.value})  
//     } 
//     render()
//     {
//         const {match} = this.props
//         const {gscuserid,cumatchcode,team,mrmatchcode,handlingtype,reason,cargotype,comments,finalbbooking,bookingnumber,
//         abc,bookingtype,handlingdata,finalbbookingdata,reasondata,cargotypedata,date,bookingdata,teamdata,abcdata,
//         booking_no_data,booking_no} = this.state
//         return (
//             <>
//             <Row>
//               <Colxx xxs="12">
//                 <Breadcrumb heading="Booking Process" match={match} />
//                 <Separator className = "separator-margin"/>
//               </Colxx>
//             </Row>
//             <div>
//                 <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
//                     <div className = "row">
//                         <div className = "col-md-3 space-margin">
//                             <Label  className = "fontstyle normal-font" >GSC UserID<a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = "fontstyle text-background"  
//                             placeholder = ''
//                             value = {gscuserid}  
//                             onChange= {(e)=>this.setState({gscuserid : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-md-3 space-margin">
//                             <Label  className = "fontstyle normal-font" >Date<a style = {{color :'red'}}>*</a></Label>
//                             <Input className = "fontstyle text-background" data-date-format='mm/dd/yy'
//                                 type="date"
//                                 value = {date}  
//                                 onChange= {(e)=>this.setState({date : e.target.value})} ></Input>
//                         </div>
//                         <div className = "col-md-3 space-margin">
//                             <Label  className = "fontstyle normal-font" >Start Time<a style = {{color :'red'}}>*</a></Label>
//                             <Input className = "fontstyle text-background" data-date-format='hh:mm a'
//                                 type="time"
//                                 value = {date}  
//                                 onChange= {(e)=>this.setState({date : e.target.value})} ></Input>
//                         </div>
//                         <div className = "col-md-3 space-margin">
//                             <Label  className = "fontstyle normal-font" >End Time<a style = {{color :'red'}}>*</a></Label>
//                             <Input className = "fontstyle text-background" data-date-format='hh:mm a'
//                                 type="time"
//                                 value = {date}  
//                                 onChange= {(e)=>this.setState({date : e.target.value})} ></Input>
//                         </div>
//                         <div className = "col-md-3 space-margin">
//                             <Label  className = "fontstyle normal-font" >Booking Number<a style = {{color :'red'}}>*</a></Label>
//                             <Select  
//                              style={{height:'85px'}}
//                             className="react-select fontstyle"
//                             classNamePrefix="react-select"
//                             name="form-field-name"
//                             value={booking_no_data.filter(option =>option.value === booking_no)}
//                             options={booking_no_data}
//                             onChange={({value}) => this.setState({booking_no:value})}
//                             />
//                         </div>
//                         <div className = "col-md-3 space-margin">
//                             <Label  className = "fontstyle normal-font" >Team Name<a style = {{color :'red'}}>*</a></Label>
//                             <Select  
//                              style={{height:'85px'}}
//                             className="react-select fontstyle"
//                             classNamePrefix="react-select"
//                             name="form-field-name"
//                             value={teamdata.filter(option =>option.value === team)}
//                             options={teamdata}
//                             onChange={this.handleteam}
//                             />
//                         </div>
//                         <div className = "col-md-3 space-margin">
//                             <Label  className = "fontstyle normal-font" >Customer Match Code<a style = {{color :'red'}}>*</a></Label>
//                             <Input  className = "fontstyle text-background"  
//                             placeholder = ''
//                             value = {cumatchcode}  
//                             onChange= {(e)=>this.setState({cumatchcode : e.target.value})} 
//                             />
//                         </div>
//                         <div className = "col-md-3 space-margin">
//                             <Label  className = "fontstyle normal-font" >MR Match Code<a style = {{color :'red'}}>*</a></Label>
//                             <Input className = "fontstyle text-background" 
//                                 value = {mrmatchcode}  
//                                 onChange= {(e)=>this.setState({mrmatchcode : e.target.value})} ></Input>
//                         </div>
//                         <div className = "col-md-3 space-margin">
//                             <Label  className = "fontstyle normal-font" >ABC/Non ABC<a style = {{color :'red'}}>*</a></Label>
//                             <Select  
//                              style={{height:'85px'}}
//                             className="react-select fontstyle"
//                             classNamePrefix="react-select"
//                             name="form-field-name"
//                             value={abcdata.filter(option =>option.value === abc)}
//                             options={abcdata}
//                             onChange={this.handleabc}
//                             />
//                         </div>
//                         <div className = "col-md-3 space-margin">
//                             <Label  className = "fontstyle normal-font" >Booking Type<a style = {{color :'red'}}>*</a></Label>
//                             <Select  
//                              style={{height:'85px'}}
//                             className="react-select fontstyle"
//                             classNamePrefix="react-select"
//                             name="form-field-name"
//                             value={bookingdata.filter(option =>option.value === bookingtype)}
//                             options={bookingdata}
//                             onChange={this.handlebookingtype}
//                             />
//                         </div>
//                         <div className = "col-md-3 space-margin">
//                             <Label  className = "fontstyle normal-font" >Handling Type<a style = {{color :'red'}}>*</a></Label>
//                             <Select  
//                              style={{height:'85px'}}
//                             className="react-select fontstyle"
//                             classNamePrefix="react-select"
//                             name="form-field-name"
//                             value={handlingdata.filter(option =>option.value === handlingtype)}
//                             options={handlingdata}
//                             onChange={this.handlehandlingdata}
//                             />
//                         </div>
//                         <div className = "col-md-3 space-margin">
//                             <Label  className = "fontstyle normal-font" >Reasons<a style = {{color :'red'}}>*</a></Label>
//                             <Select  
//                              style={{height:'85px'}}
//                             className="react-select fontstyle"
//                             classNamePrefix="react-select"
//                             name="form-field-name"
//                             value={reasondata.filter(option =>option.value === reason)}
//                             options={reasondata}
//                             onChange={this.handlereason}
//                             />
//                         </div>
//                         <div className = "col-md-3 space-margin">
//                             <Label  className = "fontstyle normal-font" >Cargo Type<a style = {{color :'red'}}>*</a></Label>
//                             <Select  
//                              style={{height:'85px'}}
//                             className="react-select fontstyle"
//                             classNamePrefix="react-select"
//                             name="form-field-name"
//                             value={cargotypedata.filter(option =>option.value === cargotype)}
//                             options={cargotypedata}
//                             onChange={this.handlecargotype}
//                             />
//                         </div>
//                         <div className = "col-md-3 space-margin">
//                             <Label  className = "fontstyle normal-font" >Final Status Of Booking<a style = {{color :'red'}}>*</a></Label>
//                             <Select  
//                              style={{height:'85px'}}
//                             className="react-select fontstyle"
//                             classNamePrefix="react-select"
//                             name="form-field-name"
//                             value={finalbbookingdata.filter(option =>option.value === finalbbooking)}
//                             options={finalbbookingdata}
//                             onChange={this.handlefinalbbooking}
//                             />
//                         </div>
//                         <div className = "col-md-12 space-margin">
//                             <Label  className = "fontstyle normal-font" >Comments</Label>
//                             <textarea  className = "fontstyle textarea-background"  
//                             placeholder = ''
//                             value = {comments}  
//                             onChange= {(e)=>this.setState({comments : e.target.value})} 
//                             />
//                         </div>
//                     </div>
//                     <div className = "row">
//                        <div className = "col-md-3"></div>
                       
//                        <div className = "col-md-2">
//                           <Button className = "button-width" color="secondary"  style={{width:'150px'}}
//                                 onClick={()=>this.onPaste()}
//                                 >Paste S9610</Button> 
//                          </div>
//                          <div className = "col-md-2">
//                           <Button className = "button-width" color="primary"  style={{width:'150px'}}
//                                 // onClick={()=>this.close(false,false,{})}
//                                 >Save </Button> 
//                          </div>
//                          <div className = "col-md-2">
//                           <Button className = "button-width" color="secondary"  style={{width:'150px'}}
//                                 onClick={()=>this.onPaste()}
//                                 >Cancel</Button> 
//                          </div>
                         
//                     </div>
//                 </div>   
//             </div>
//           </>
//         )
//     }
// }

// const mapStateToProps = ({  authUser }) => {
   
  
//     const { currentUser } = authUser;
//     return {
//       currentUser
//     };
//   };
//   export default withRouter(
//     connect(mapStateToProps, {

//    })(QueryResolveSheet)
//   );






import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import {onChangeLanguage} from '../../../../helper'
import Select from 'react-select';
import moment from 'moment';
import{internalService} from '../../../../redux/bookingprocess/internalerror/saga';
import { createNotification } from '../../../../toast';
import{teamsService} from '../../../../redux/bookingprocess/teams/saga';
import { Table,Checkbox } from 'antd';
 import {columns1 } from '../sampledata'

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        gsc_userid:'',
        date:'',
        team_name:'',
        booking_number:'',
        customer_mc:'',
        mr_matchcode:'',
        error_type:'',
        error_des:'',
        error_userid:'',
         teamdata:[],
         data:[],
         is_submit:false,
         loading:false,
    
     
    }

    }

    componentDidMount() {


      // var list = []
      //       for(var i = 0; i<1;i++)
      //       {
      //         var dict = {
      //           'Date':'12/2/2021',
      //           'Team Name':'7575767',
      //           'Booking Number':'875757',
      //           'Vendor Name':'FLISNDERS PART',
      //           'Customer MC':'7576',
      //           'MR Match Code':'$9798',
      //           'Error Type':'INR',
      //           'Error Description':'XCG 00067',
      //           'GSC UserID':'TEST',
      //           'QSC UserID':'ABCDEFG',
      
      //           }
      //         list.push(dict)
      //       }
      //       this.setState({
      //         data:list
      //       })
      


       
        this.setState({
            date:moment(new Date()).format('MM/DD/YYYY'),
        })
  
      this.fetchteam()
      this.fetchData()
      
    }

  
    fetchData() {  
      this.setState({
        loading : true
      })
      internalService.fetchinternal()
        .then((res) => { 
          this.setState({   
        loading : false 
                
          }) 
          if(res.status)
            {
              this.setState({ 
                data:res.data  , 
                         
              }) 
            }  else
            {
              this.setState({ 
                data:[]  , 
                         
              }) 
            }                
      
      })
      .catch((error) => { 
        this.setState({
          loading : false
        })
        });   
   }



     fetchteam() {
        this.setState({loading:true})
        teamsService.fetchapi()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var teamlist = filterstatus.map(function(response) {
                      return  {label : response.name ,value : response.id.toString()};
                   });  
                    this.setState({
                    teamdata :  teamlist
                    })
                   
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
     }     
 
     onSubmit() { 
        const { gsc_userid ,date ,team_name ,booking_number,customer_mc , mr_matchcode ,error_type ,error_des ,error_userid} = this.state;
        
        if( date!==''&& team_name !==''&& booking_number!==''&& customer_mc!=='' &&mr_matchcode!==''&&error_type!==''&&
        error_des!==''&&  error_userid!=='')
        {
            const {username} = this.props
              
            internalService.createinternal( username,date ,team_name ,booking_number,customer_mc , mr_matchcode ,error_type ,error_des ,error_userid )
              .then((res) => { 
                this.setState({                   
                  loading : false     
                }) 
                if(res.status)
                  {
                    createNotification('Created','success','filled')
                  }   
                  else
                    {
                      createNotification(res.message,'error','filled');
                    }    
            })
            .catch((error) => { 
              this.setState({
                loading : false
              })
            });
        }
        else
        {
          this.setState({
            is_submit:true
        })
          createNotification('Please fill mandatory field','error','filled')
        }
      }
    
//       onChangetime(date)
//   {
//     console.log("lhnkjh " ,date)
//     var time = moment(date).format('HH:mm:ss')
//     if(time !== "00:00:00")
//     {
//       this.setState({start_datetime  : date})
//     }
   
//   }
 
  onrefresh() {
    this.setState({

      gsc_userid:'',
      team_name:'',
      booking_number:'',
      customer_mc:'',
      mr_matchcode:'',
      error_type:'',
      error_des:'',
      error_userid:'',
        is_submit:false,
    })
   
  }
    onCopy()
    {
        navigator.clipboard.writeText(this.state.region)
    }
    handleteam = (selectedOptions) => {
        this.setState({team_name : selectedOptions.value})  
    } 
    
    render()
    {
        const {match,locale,languageData,username} = this.props
        const { gsc_userid ,date ,team_name ,booking_number,customer_mc , mr_matchcode ,error_type ,error_des ,error_userid,teamdata,data, is_submit} = this.state
        return (
            <>
            <Row>
              <Colxx xxs="12"> 

              <div className = "row">
                       <div className = "col-md-10">
                       <Breadcrumb heading="Internal Error" match={match} />
                     </div>
                     <div className = "col-md-2">
                         <Button className = "button-width" color="primary" style= {{width :'62%'}}>
                             <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
                             <a style= {{margin :'0px'}} > Upload</a>
                             <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                                className = "filepicker_customButton"
                                style = {{width : '80%',marginLeft :'-56%'}}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
                        </Button>
                    </div>
                    
                  </div>

                {/* <Breadcrumb heading="Internal Error" match={match} />
                <Separator className = "separator-margin"/> */}
              </Colxx>
            </Row>
            <div>
            <div className = "" style = {{padding:'0px 10px',borderRadius:'10px',marginBottom:'10px'}}>
                    <div className = "row" >
                    <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'GSC UserID',languageData)}</a><br></br> 
                            {username}</Label>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Date',languageData)}</a><br></br>{date}</Label>
                        </div>
                                             
                    </div>
                </div> 
          


                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row" style = {{marginBottom:'30px'}}>
                        
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Team Name',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            
                                       <Select  
                                       className={is_submit === true && team_name === ''?  "error-border-select":"react-select fontstyle" }

                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={teamdata.filter(option =>option.value === team_name)}
                                        options={teamdata}
                                        onChange={this.handleteam}
                                    />
                                    </div>
                                    <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Booking Number',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                    <Input  className={is_submit === true && booking_number === ''?  "error-border":"fontstyle text-background" }
                              
                                value = {booking_number}  
                                onChange= {(e)=>this.setState({booking_number : e.target.value})} 
                                />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Customer MC',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                    <Input  className={is_submit === true && customer_mc === ''?  "error-border":"fontstyle text-background" }
                             
                                value = {customer_mc}  
                                onChange= {(e)=>this.setState({customer_mc : e.target.value})} 
                                />
                        </div>
                       
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'MR Match Code',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                    <Input  className={is_submit === true && mr_matchcode === ''?  "error-border":"fontstyle text-background" }
                             
                                value = {mr_matchcode}  
                                onChange= {(e)=>this.setState({mr_matchcode : e.target.value})} 
                                />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Type',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                    <Input  className={is_submit === true && error_type === ''?  "error-border":"fontstyle text-background" }
                             
                                value = {error_type}  
                                onChange= {(e)=>this.setState({error_type : e.target.value})} 
                                />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Description',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                    <Input  className={is_submit === true && error_des === ''?  "error-border":"fontstyle text-background" }
                             
                                value = {error_des}  
                                onChange= {(e)=>this.setState({error_des : e.target.value})} 
                                />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error UserID',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                    <Input  className={is_submit === true && error_userid === ''?  "error-border":"fontstyle text-background" }
                             
                                value = {error_userid}  
                                onChange= {(e)=>this.setState({error_userid : e.target.value})} 
                                />
                        </div>

                        
                                 </div>
                 <div className = "row text-center" >                   

                       <Button className = "button-width" color="primary"                        
                        onClick={()=>this.onSubmit()}
                                >
                               {onChangeLanguage(locale,'Save',languageData)} 
                            </Button>                           
                        <Button className = "button-width"                         
                        color="secondary"  
                        onClick={()=>this.onrefresh()}
                                >
                                {onChangeLanguage(locale,'Refresh',languageData)}
                            </Button>      
                  
                </div>
           
                </div>   
           

                <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>

                   <div >
                       <div style = {{padding :'10px'}}>
                      <Table dataSource={data} columns={columns1} 
                      rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}/>
                      </div>  
                    
                  </div>
              </div>
           
            </div>
          </>
        )
    }
}

const mapStateToProps = ({ settings }) => {
  const { locale,languageData,username} = settings;
  return {locale, languageData,username};
};
  export default withRouter(
    connect(mapStateToProps, {

   })(QueryResolveSheet)
  );


