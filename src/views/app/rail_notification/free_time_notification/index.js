import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import "react-datepicker/dist/react-datepicker.css";
import{freetimeService} from '../../../../redux/railnotification/freetime/saga';
import {onChangeLanguage,convertLocalToUTCDate} from '../../../../helper';
import { createNotification } from '../../../../toast';

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        container_number:'',
        user_id:'',
        last_update:'',
        completed_update:'',
        start_time:new Date(),
        updated_start_time:new Date(),
        is_submit: false,
        freetimecount:'',
        freetimecountlast:''
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
        navigator.clipboard.writeText(this.state.errortype)
    }
    
    componentDidMount() {
       
    //   this.fetchData()
    this.fetchFreetimeCount()
    }
    fetchFreetimeCount(){
      this.setState({loading:true})
      const {username} = this.props
      freetimeService.fetchfreetimeCount(username)
      .then((res) => {
         if(res.status)   { 
                let filterstatus = res.data;
                let lastdata = res.lastcount; 
                this.setState({ 
                  freetimecount:filterstatus, 
                  freetimecountlast:lastdata     
                }) 
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})
  
  }


    onSubmit() { 
        const {container_number,user_id, last_update,completed_update,updated_start_time} = this.state;
        let end_date=convertLocalToUTCDate(new Date()),
        start_date=convertLocalToUTCDate(updated_start_time),
        updatedstarttime=convertLocalToUTCDate(updated_start_time),
         updated_end_time=convertLocalToUTCDate(new Date())  
         const{username}=this.props 

        if(container_number !==''&& user_id !==''&& last_update!==''&& completed_update!=='')
        {
            freetimeService.createfreetime( container_number,user_id, last_update,completed_update,username,start_date,end_date,updatedstarttime,updated_end_time)
              .then((res) => { 
                this.setState({   
                  loading : false     
                }) 
                if(res.status)
                  {
                    createNotification('Created','success','filled')
                    this.setState({
                      container_number:'',
                      user_id:'',
                      last_update:'',
                      completed_update:'',
                        is_submit:false,
                    })
                    this.fetchFreetimeCount()
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
   
 
  onrefresh() {
    this.setState({
      container_number:'',
      user_id:'',
      last_update:'',
      completed_update:'',
        is_submit:false,
    })
   
  }
   









    render()
    {
        const {match,locale,languageData} = this.props
        const {container_number,user_id, last_update,completed_update,is_submit,freetimecount,freetimecountlast} = this.state
        return (
            <>
            <title>{onChangeLanguage(locale,'Free Time Notification',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                
                <div className="row">
                <div className="col-md-8">
                <Breadcrumb heading= {onChangeLanguage(locale,'Free Time Notification',languageData)} match={match} />
                </div>
                <div className = "col-md-2">
                    <h2 style = {{marginTop:'15px'}}>Total EQ : {freetimecount}</h2>
                </div>
                <div className = "col-md-2">
                    <h2  style = {{marginTop:'15px'}}>Last EQ : {freetimecountlast}</h2>
                </div>

            </div>
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row" style = {{marginBottom:'10px'}}>
                    <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Container Number',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && container_number === ''?  "error-border  ":"fontstyle text-background  " }
  
                            placeholder = ''
                            value = {container_number}  
                            onChange= {(e)=>this.setState({container_number : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'User ID',languageData)}<a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && user_id === ''?  "error-border  ":"fontstyle text-background  " }
                            placeholder = ''
                            value = {user_id}  
                            onChange= {(e)=>this.setState({user_id : (e.target.value).toUpperCase()})}
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Last Update Time In FIS',languageData)}<a style = {{color :'red'}}>*</a></Label>
                         
                               <Input className = {is_submit === true && last_update === ''?  "error-border  ":"fontstyle text-background  " } 
                              placeholder ="hh:mm:ss AM/PM" 
                              type ='time' 
                           value = {last_update}  
                           onChange= {(e)=>this.setState({last_update : e.target.value})} 
                           />
                        </div>


                      
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Completed Update Time In FIS',languageData)}<a style = {{color :'red'}}>*</a></Label>
                         
                               <Input className = {is_submit === true && completed_update === ''?  "error-border  ":"fontstyle text-background  " } 
                               placeholder ="hh:mm:ss AM/PM" 
                               min_time = {last_update}
                               type ='time'
                           value = {completed_update}  
                           onChange= {(e)=>this.setState({completed_update : e.target.value})} 
                           />
                        </div>
                        
                        
                    </div>
                    <div className = "row text-center" >                 
                          <Button className = "button-width" color="primary" 
                                onClick={()=>this.onSubmit()}
                                >
                               {onChangeLanguage(locale,'Save',languageData)} </Button>
                        
                             <Button className = "button-width" color="secondary" 
                                onClick={()=>this.onrefresh()}
                                >
                                {onChangeLanguage(locale,'Refresh',languageData)}
                           </Button>                        
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

