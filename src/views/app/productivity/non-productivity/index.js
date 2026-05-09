import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import {onChangeLanguage,getCurrentWeek,} from '../../../../helper'
import { createNotification } from '../../../../toast';
import Loading from "react-fullscreen-loading";
import moment from 'moment';
import{nonproductivityService} from '../../../../redux/productivty/non-productivity/saga'
import{roleService} from '../../../../redux/role/saga'
import{categoryService} from '../../../../redux/productivty/category/saga'
import{typeService} from '../../../../redux/productivty/type/saga'
import CustomDatePicker from "../../../../components/datepicker/CustomDatePicker";
import { customdateService } from '../../../../redux/productivty/customdate/saga';

class Sidebar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        date:'',
        week:'',
        menu:'',
        category:'',
        type:'',
        start_time:'',
        end_time:'',
        description:'',
        approval_status: 0,
        user_id:'',
        typeeee:'',
        approval_userid:'',
        menu_data:[],
        category_data:[],
        type_data:[],
        is_submit:false,
        howManyDays:'',
      };
    }
    componentDidMount() {
       
      this.fetchData()
      this.fetchcategory()
      this.fetchtype()
      this.fetchDaysCustomDate()
    }
    fetchDaysCustomDate() {
        this.setState({ loading: true });
    
        customdateService.applydatefetchapi()
            .then((res) => {
                console.log("API Response:", res.data);
                this.setState({ loading: false });
    
               if (res.status && Array.isArray(res.data) && res.data.length > 0) {
                    const firstRecord = res.data[0];
    
                    this.setState({
                        recordId: firstRecord.id, // store id
                        applyDateEnabled: !!firstRecord.applydate,
                        howManyDays: firstRecord.applydays ? String(firstRecord.applydays) : ''
                    });
                } else {
                    this.setState({
                        recordId: null, // no existing row
                        applyDateEnabled: false,
                        howManyDays: ''
                    });
                }
    
            })
            .catch((error) => {
                this.setState({ loading: false });
                console.error('Fetch error:', error);
            });
    }
    fetchData() {  
      this.setState({
        loading : true
      })
      roleService.fetchrolepermissionData()
        .then((res) => { 
          this.setState({   
        loading : false 
                
          }) 
          if(res.status === true)
            {
                if(res.data)
                {
                  let filterstatus = (res.data).filter(item => item.name !== 'Productivity Masters' &&  item.name !== 'General Master' &&  item.name !== 'Dashboard')
                    var menu = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : cusmaidid.name};
                    });   
                  this.setState({
                    menu_data:menu
                  })
                }
                
            }            
      
      })
      .catch((error) => { 
        this.setState({
          loading : false
        })
        });   
   }
   fetchcategory() {
    categoryService.fetchapi()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var categorylist = filterstatus.map(function(cusmaidid) {
                  return  {label : cusmaidid.name ,value : cusmaidid.id.toString() ,menu : cusmaidid.menu,type : cusmaidid.type};
               });  
                this.setState({
                category_data :  categorylist,
                })
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
 }  
 fetchtype() {
  typeService.fetchapi()
  .then((res) => {
     if(res.status)   { 
        let filterstatus = (res.data).filter(item => item.status === 1)
           var categorylist = filterstatus.map(function(cusmaidid) {
                return  {label : cusmaidid.name ,value : cusmaidid.name,text : cusmaidid.id.toString()};
             });  
              this.setState({
              type_data :  categorylist,
              })
           }
           else{
           this.setState({loading:false})}
           })
           .catch((error) => { }); 
}  
      onSubmit() { 
        const{category,description,start_time,end_time, menu,date,week,type,approval_status}=this.state

        const {username} = this.props
        if(username !== '' && description !== '' && start_time !== '' &&  menu !== '' && end_time !== '' && date !== '' 
        && type !== '' && category !=='')
        {
          this.setState({
            is_submit:true,
            loading : true
          })
          
          nonproductivityService.createapi(username,category,description,start_time,end_time, menu,date,week,type,approval_status,1)
            .then((res) => { 
              this.setState({   
                loading : false     
              }) 
              if(res.status === true)
                {
                  createNotification('Created','success','filled')
                  this.clearValue()
                  
                } else{
                  createNotification(res.message,'error','filled')
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
   
  clearValue() {
    this.setState({
        date:'',
        week:'',
        menu:'',
        category:'',
        type:'',
        start_time:'',
        end_time:'',
        description:'',
        approval_status: 0,
        user_id:'',
        approval_userid:'',
        is_submit:false,
        selectedDate:''
    })
   
  } 
  // handleChangedate = (date) => {
  //   this.setState({date : date,week:getCurrentWeek(new Date(date)).toString()})
  // }
handleChangedate = (date) => {
  const dateObj = new Date(date);
  this.setState({
    selectedDate: dateObj, // keep picker in sync
    date: dateObj,
    week: getCurrentWeek(dateObj).toString()
  });
};


  handleend_time = (e) => {
    const{start_time}=this.state
    let value =e.target.value
    if(start_time !==''){
    if(start_time <= value) {
      this.setState({end_time : e.target.value})  
    }else{
      createNotification('End Time Must be bigger then Start Time','error','filled')
    }
    }
    else{
      createNotification('Please Choose the Start Time','error','filled')
    }
  }  

  getCategoryData(menu,type)
  {
    const{category_data}=this.state
    var list = category_data.filter(option =>option.menu === menu && option.type === type )
    return list
  }
  handletype = (selectedOptions) => {
    this.setState({type : selectedOptions.value,category:'',typeeee:selectedOptions.text})  
} 
    render()
    { 
        const{category,description,menu_data,start_time,howManyDays,
        menu,end_time,date,week,is_submit,category_data,type,typeeee,type_data,loading}=this.state
        const {match,username,locale,languageData} = this.props
        const current_date = moment(new Date()).format('YYYY-MM-DD')
        return (
            <>
            <title>{onChangeLanguage(locale,'Non-Productive Hours',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'Non-Productive Hours',languageData)} match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            {loading && 
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
          }
            <div>
           
            <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>

                <div className = "row">
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'User ID',languageData)}</a><br></br>{username}</Label>
                        </div>
                        {/* <div className="col-md-3 space-margin">
                          <Label className="fontstyle normal-font">
                            {onChangeLanguage(locale, 'Date & Time', languageData)}
                            <a style={{ color: 'red' }}>*</a>
                          </Label>
                          <Input
                            className={
                              (is_submit === true && date === '') || date === true
                                ? 'error-border'
                                : 'fontstyle text-background'
                            }
                            type="datetime-local"
                            max={current_date}
                            value={date}
                            onChange={(e) => this.handleChangedate(e.target.value)}
                          />
                        </div> */}
                        {/* <div className="col-md-3 space-margin">
                          <Label className="fontstyle normal-font">
                            {onChangeLanguage(locale, 'Date & Time', languageData)}
                            <a style={{ color: 'red' }}>*</a>
                          </Label>
                         <CustomDatePicker
                            value={date}
                            onChange={(date) => this.handleChangedate(date)}
                            className={
                              (is_submit === true && date === '') || date === true
                                ? 'error-border'
                                : 'fontstyle text-background'
                            }
                            isSubmit={is_submit}
                          />
                        </div> */}

                    <div className="col-md-3 space-margin">
                      <Label className="fontstyle normal-font">
                        {onChangeLanguage(locale, 'Date & Time', languageData)}
                        <a style={{ color: 'red' }}>*</a>
                      </Label>

                      <CustomDatePicker
                        value={this.state.selectedDate}
                        // onChange={(date) => this.handleChangedate({ selectedDate: date })}
                        onChange={(date) => this.handleChangedate(date)}
                        days={this.state.howManyDays ? parseInt(this.state.howManyDays) : 7} // dynamic from DB
                        className={
                          is_submit && (!this.state.selectedDate || this.state.selectedDate === '')
                            ? 'error-border'
                            : 'fontstyle text-background'
                        }
                        isSubmit={is_submit}
                      />
                    </div>



                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Week',languageData)}</a>
                            <br></br>{week}</Label>
                        </div>
                        
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'For',languageData)} <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && menu === ''?  "error-border-select":"react-select fontstyle" }                          
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={menu_data.filter(option =>option.value === menu)}
                            options={menu_data}
                            onChange={({value}) => this.setState({  menu: value,category:'' })}
                          />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Type',languageData)} <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                            className = {is_submit === true && type === ''?  "error-border-select":"react-select fontstyle" }                          
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={type_data.filter(option =>option.value === type)}
                            options={type_data}
                            onChange={this.handletype}
                            // onChange={({value}) => this.setState({  type: value,category:'' })}
                          />
                        </div>
                        <div className = "col-md-3 space-margin ">
                            <Label  className = "fontstyle normal-font" > 
                            {onChangeLanguage(locale,'Category',languageData)}</Label>
                                <Select 
                                
                                className = {is_submit === true && category === ''?  "error-border-select":"react-select fontstyle" }
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={category_data.filter(option =>option.value === category)}
                                options={this.getCategoryData(menu,typeeee)}
                                onChange={(option) => this.setState({  category: option.value })}
                             />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Start Time',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  
                            className = {(is_submit === true && start_time === '') || start_time === true?  "error-border":"fontstyle text-background" }    
                            data-date-format='hh:mm:ss a'
                            type="time"  
                            value = {start_time}  
                            onChange= {(e)=>this.setState({start_time : e.target.value})} 
                            />
                           
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'End Time',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input  className = {is_submit === true && end_time === ''?  "error-border":"fontstyle text-background" }    
                            data-date-format='hh:mm:ss a'
                            type="time"  
                            min="08:00:00"
                            value = {end_time}  
                            onChange={(e)=>this.handleend_time(e)}
                            />
                        </div>
                        <div className = "col-md-12 space-margin">
                            <Label  className = "fontstyle normal-font" >
                            {onChangeLanguage(locale,'Task Description',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <textarea
                                className = {is_submit === true && description === ''?  "border-textarea-background":"fontstyle textarea-background" }  
                                placeholder = ''
                                value = {description}  
                                onChange= {(e)=>this.setState({description : e.target.value})} 
                            />
                        </div>
                        
                    </div>
                    <div className = "text-center" >
                   
                         <Button 
                            style={{width:'150px'}}
                            className = "button-width" color="primary"  
                                        onClick={()=>this.onSubmit()}
                                >
                                {onChangeLanguage(locale,'Save',languageData)} 
                            </Button>
                            <Button className = "button-width" color="secondary" 
                                    style={{width:'150px'}} 
                                onClick={()=>this.clearValue()}
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

   })(Sidebar)
  );

