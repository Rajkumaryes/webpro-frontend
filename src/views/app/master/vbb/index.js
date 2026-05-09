import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import {onChangeLanguage,getValue,convertLocalToUTCDate,get_multiplechoose_array,getoptionvalue} from '../../../../helper'
import{teamsService} from '../../../../redux/teams/saga'
import{userService} from '../../../../redux/users/saga'
import{VbbService} from '../../../../redux/vbbscore/saga'
import{VbbparameterService} from '../../../../redux/vbb/saga'
import{activitytypeService} from '../../../../redux/vesselchartering/activitytype_vessle/saga';
import moment from 'moment';
import { Table,Tooltip } from 'antd';
import Select from 'react-select';
import DatePicker from "../../datePicker";
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../constants/defaultValues';
import{hvsareaService} from '../../../../redux/bchteam/hvsarea/saga'

class ValueBasedBehaviour extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        startdate:'',
        enddate:'',
        team_id:'',
        report:'',
        team_data:[],
        user_data:[],
        users_data:[],
        is_submit:false,
        data:[],
        page:1,
        pageSize:150,
        total :0,
        days_value:'',
        cycleOptions : [],
        selectedCycle: '',
        vbb_user:'',
        user_level:'',
        selectedLevels:'',
        totalScore: 0,
        averageRating: 0,
        anchor_rating:'',
      };
    }
    componentDidMount()
    {
        this.fetchTeamData()
        // this.fetchVbbparameter()
           const currentYear = new Date().getFullYear();
           const cycleOptions = [];
           
           const getCycleDates = (year, cycleNumber) => {
               let cycleStartDate;
               let cycleEndDate;
           
               if (cycleNumber === 1) {
                   cycleStartDate = new Date(year, 0, 1, 6, 0, 0, 0); 
                   cycleEndDate = new Date(year, 3, 30, 23, 59, 59, 999); 
               } else if (cycleNumber === 2) {
                   cycleStartDate = new Date(year, 3, 30, 6, 0, 0, 0); 
                   cycleEndDate = new Date(year, 7, 30, 23, 59, 59, 999); 
               } else if (cycleNumber === 3) {
                   cycleStartDate = new Date(year, 7, 31, 6, 0, 0, 0); 
                   cycleEndDate = new Date(year, 11, 30, 23, 59, 59, 999); 
               }
           
               return { startDate: cycleStartDate, endDate: cycleEndDate };
           };
           
           const formatDate = (date) => {
               return date instanceof Date && !isNaN(date) ? date.toISOString().split('T')[0] : 'Invalid Date';
           };
           
           // Generate cycle options for the current year
           for (let i = 1; i <= 3; i++) {
               const { startDate, endDate } = getCycleDates(currentYear, i);
               
               const formattedStartDate = formatDate(startDate);
               const formattedEndDate = formatDate(endDate);
               const label = `Cycle ${i} (${formattedStartDate} - ${formattedEndDate}) ${currentYear}`;
               const value = `Cycle ${i} (${formattedStartDate} - ${formattedEndDate}) ${currentYear}`;
              
               cycleOptions.push({ label, value });
           }
           
           // Set state with generated cycle options
           this.setState({ cycleOptions });
               
    }

    fetchVbbparameter(selectedLevels,selectedCycle,team_id,user_id) { 
        this.setState({
          loading : true
        })
        VbbparameterService.fetchVBBs(selectedLevels,selectedCycle,team_id,user_id)
          .then((res) => { 
            this.setState({   
                 loading : false   
            }) 
            if(res.status)
              {
              
                if(res.key == 'exists'){
                  this.setState({
                    data :  res.data[0].user_vbb,
                    totalScore:res.data[0].total_score,
                    averageRating:res.data[0].average_rating,
                })
                } 
                else if(res.key == 'notexists'){
                  this.setState({
                    data :  res.data
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
  
    fetchTeamData() {  
        this.setState({
          loading : true
        })
        teamsService.fetchteams()
          .then((res) => { 
            this.setState({   
                 loading : false   
            }) 
            if(res.status)
              {
                let filterstatus = (res.data).filter(item => item.status === 1)
                var list = filterstatus.map(function(areaaval) {
                  return  {label : areaaval.name+'-'+areaaval.country_code ,value : (areaaval.id).toString(),name:areaaval.name};
                  });  
                   this.setState({
                       team_data :  list,
                   })
                
              }                
        
        })
        .catch((error) => { 
          this.setState({
            loading : false
          })
          });   
     }
     fetchUserData(team_id) {  
        
        this.setState({
          loading : true
        })
        userService.fetch_hierarchyuserData(team_id)
          .then((res) => { 
            this.setState({   
                 loading : false   
            }) 
            if(res.status)
              {
                let filterstatus = (res.data).filter(item => item.is_active === 1)
                var users = filterstatus.map(function(areaaval) {
                    return  {label : areaaval.username ,value : (areaaval.username).toString(),name:areaaval.username};

                    });
                var list = []
                for(var i =0;i<filterstatus.length;i++)
                {
                    list.push(filterstatus[i].username)
                }
                   this.setState({
                    //    data :  res.data,
                       user_data:res.data,
                   })  
              } 
              else
              {
                this.setState({
                  user_data :  [],
                  data:[],
                 })
              }                
        
        })
        .catch((error) => { 
          this.setState({
            loading : false
          })
          });   
     }
   
    clearValue()
    {
        this.setState({
            startdate:'',
            enddate:'',
            team_id:'',
            user_data:[],
            data:[],
            is_submit:false,
            selectedCycle:'',
            user_level:'',
            vbb_user:'',
            totalScore:'',
            averageRating:'',
        })
    }
    onChangeTeam(value)
    {
        this.setState({  team_id: value,selectedCycle  : '',enddate:'',user_data:[],data:[] })
        // this.fetchUserData([value])
    }
    onChangeCycle = (value) => {
        const { team_id,user_level } = this.state;
        if( team_id !== '')
        {
            this.setState({ selectedCycle: value,user_level:'',vbb_user:'' });
            this.fetchUserData([team_id]);
        }
        else
        {
        createNotification('Please Choose Team','error','filled');
        }
    }
    onChangeLevel = (value) => {
        const { team_id,user_data,selectedCycle,vbb_user } = this.state;
        if( value !== '' && team_id !==''  && selectedCycle !=='' )
        {
            const filteredList = user_data
                .filter(user => user.designation === value)
                .map(user => ({
                    label: user.username,
                    value: user.username
                }));

           
            this.setState({ user_level: value,vbb_user:'' });
            this.setState({ users_data: filteredList });
        }
        else
        {
        createNotification('Please Choose Team and VBB','error','filled');
        }
    }
    onChangeUsername(value)
    {
      const { team_id,selectedCycle } = this.state;
      if(this.state.user_level == 10){
        var selectedLevels = "l6A"
      }else{
        var selectedLevels = "l6B"
      }
    
      this.setState({selectedLevels  : selectedLevels})
      this.setState({vbb_user  : value})
      this.setState({data  : []})
      this.fetchVbbparameter(selectedLevels,selectedCycle,team_id,value)
     
    }
    onChangestarttime(date)
    {
      
      this.setState({startdate  : date,enddate:''})
     
    }
    
    onChangeendtime(date)
     {
       const {startdate} = this.state
       if(startdate !== '')
       {
        this.setState({enddate  : date})
        this.fetchPagination(1,25,startdate,date,false)
       }
       else
       {
        createNotification('Please Choose Start Date and Team','error','filled');
       }
       
     }
    
    onClickDay(value)
    {
      
      this.setState({
        days_value:value
      })
     
      if(value === "Past 1 Days")
      {
        this.getdaywiseChart(0,false,value)
      }
      else if(value === "1 Month")
      {
        this.getdaywiseChart(29,value)
      }
      else if(value === "1 Year")
      {
        this.getdaywiseChart(364,value)
      }
      else if(value === "This Week")
      {
        
        this.getdaywiseChart(6,value)
      }
      else if(value === "This Month")
      {
        this.getdaywiseChart(29,value)
      }
      else if(value === "This Year")
      {
        this.getdaywiseChart(364,value)
      }

    }
    getdaywiseChart(day,days_value)
  {
   
    var date = new Date();
    date.setDate(date.getDate() - day);
    var currentdate = moment(new Date()).format('YYYY-MM-DD')
    const lastdate = ("0" + date.getDate()).slice(-2),
    month = ("0" + (date.getMonth() + 1)).slice(-2)
    var finalDate = date.getFullYear() +'-'+ month +'-' + lastdate ;
    if(days_value === "This Week")
    {
     
      var startOfWeek = moment().startOf('week').toDate();
      finalDate = moment(startOfWeek).format('YYYY-MM-DD')
    }
    else if(days_value === "This Month")
    {
      var startOfWeek = moment().startOf('month').toDate();
      finalDate = moment(startOfWeek).format('YYYY-MM-DD')
    }
    else if(days_value === "This Year")
    {
      var startOfWeek = moment().startOf('year').toDate();
      finalDate = moment(startOfWeek).format('YYYY-MM-DD') 
    }
   console.log("lgkjgjgkj  finalDate = " , JSON.stringify(finalDate) , 'currentdate ==>' , currentdate)
   const {team_id} = this.state
//   if(team_id !== '')
//   {
    this.setState({
      startdate:new Date(finalDate),
      enddate:convertLocalToUTCDate(new Date())
    })
    this.fetchPagination(1,25, new Date(finalDate),convertLocalToUTCDate(new Date()),false)
//   }
//   else
//   {
//    createNotification('Please Choose Team','error','filled');
//   }

  }
  paginationOptions = {
    showSizeChanger: true,
    showQuickJumper: true,
    onShowSizeChange: (_, pageSize) => {
      this.setState({
        pageSize : pageSize
      })
      
    },
    onChange: (page,pageSize) => {
      const {startdate,enddate} = this.state
     this.fetchPagination(page,pageSize,startdate,enddate,false)
    },
    pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
    // total: this.state.total  ,
    showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total}`,
  };
  getamendmentvalue(id,array)
    {
    //   console.log("id",id)
    //   console.log("array",array)
     var name = ' '
          if(array != null)
          {
                for(var i=0;i< array.length;i++)
                {
                    if(array[i].value === id)
                    {
                       name = array[i].label
                    }
            }
        }
   
      return name
}  
onChangeLanguage = (locale, key, languageData) => {
   
    return languageData[key] || key;
  };

handleRatingChange = (value, recordId) => {
  let parsedValue = parseFloat(value);
  if (isNaN(parsedValue)) parsedValue = 0;
  if (parsedValue > 5) parsedValue = 5;
  if (parsedValue < 0) parsedValue = 0;

  const updatedData = this.state.data.map(item => {
    if (item.id === recordId) {
      const newRating = parsedValue;
      const newScore = newRating * item.userLevel;
      return { ...item, rating: newRating, score: newScore };
    }
    return item;
  });

 
  const totalScore = updatedData
    .filter(item => item.score !== null && !isNaN(item.score))
    .reduce((acc, curr) => acc + curr.score, 0);


  const nonEmptyRatings = updatedData
    .filter(item => item.score !== null && !isNaN(item.score))
    .map(item => item.score);


  const totalRatingSum = nonEmptyRatings.reduce((acc, curr) => acc + curr, 0);
  const averageRatings = nonEmptyRatings.length > 0 ? (totalRatingSum / nonEmptyRatings.length) : 0;


  this.setState({ data: updatedData, anchor_rating: parsedValue, totalScore,  averageRating:averageRatings });
};




  handleSubmit = () => {

    const { data,team_id,selectedCycle,user_level,vbb_user,totalScore,averageRating } = this.state;
    const {username} = this.props
    console.log("value",data)
    var currentdate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    if(team_id !== ""  && selectedCycle !== "" && user_level !== "" && vbb_user !== "" && totalScore !== "" && averageRating !== ""){

        VbbService.createUservbb(data,team_id,selectedCycle,user_level,vbb_user,totalScore,averageRating,username,currentdate)
      .then((res) => {
        this.setState({
          loading: false,
        })
        if (res.status) {
          createNotification('Attendance Uploaded', 'success', 'filled')
          this.clearValue()
        }
        else {
          createNotification(res.message, 'error', 'filled');
        }
      })
      .catch((error) => {
        this.setState({
          loading: false,
        })
      });
    }else{
      createNotification('Please fill mandatory field','error','filled')
    }
    
  }
  

    render()
    {
        const {match,locale,languageData} = this.props
        const {enddate,startdate,team_id,team_data,is_submit,loading,data,page,pageSize,selectedCycle,cycleOptions ,vbb_user,user_data,users_data,vbb_data,user_level,averageRating ,totalScore,
          anchor_rating} = this.state
          const columns = [
            {
              title: this.onChangeLanguage(locale, 'VBB', languageData),
              dataIndex: 'vbb_name',
              key: 'vbb_name',
              width: 200,
              render: text => <div style={{ padding: '2px' }}>{text}</div>,
            },
            {
              title: this.onChangeLanguage(locale, 'Anchors', languageData),
              dataIndex: 'vbb_anchor',
              key: 'vbb_anchor',
              width: 200,
              render: text => <div style={{ padding: '2px' }}>{text}</div>,
            },
            {
              title: this.onChangeLanguage(locale, 'Rating', languageData),
              dataIndex: 'rating',
              key: 'rating',
              width: 70,
              render: (text, record) => (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5px' }}>
                  <Input
                    type="number"
                    step="0.1" // Allows decimal values
                    min="0"
                    max="5"
                    className={(is_submit && !text) ? "fontstyle error-border" : "fontstyle"}
                    value={text}
                    onChange={(e) => this.handleRatingChange(e.target.value, record.id)}
                  />
                </div>
              ),
            },
            {
              title: this.onChangeLanguage(locale, 'Percentage(%)', languageData),
              dataIndex: 'userLevel',
              key: 'userLevel',
              width: 100,
              render: (text) => (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5px' }}>
                  <Input
                    className="fontstyle"
                    value={text}
                    type="text"
                    style={{ width: '100px' }}
                    readOnly
                  />
                </div>
              ),
            },
            {
              title: this.onChangeLanguage(locale, 'Score', languageData),
              dataIndex: 'score',
              key: 'score',
              width: 100,
              render: text => (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5px' }}>
                  <Input
                    className="fontstyle"
                    value={text}
                    type="text"
                    style={{ width: '100px' }}
                    readOnly
                  />
                </div>
              ),
            },
          ];
          var level_data = [
            {
              "label": "L6A - Sr. Coordinator - Customer Service",
              "value": "10"
            },
            {
              "label": "L6B - Co-ordinator Customer Service",
              "value": "13"
            },
          ];
          const pagination = {
            ...this.paginationOptions,
            total: this.state.total,
            current: this.state.page,
            pageSize: this.state.pageSize,
            };
        return (
            <>
            <title>{onChangeLanguage(locale,'Value Based Behaviour',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading={onChangeLanguage(locale,'Value Based Behaviour',languageData)} match={match} />
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <div>
            <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                          <div className = "row" style = {{padding:'10px'}}>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Team',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                        <Select  className={is_submit === true && team_id === ''?  "error-border-select":"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={team_data.filter(option =>option.value === team_id)}
                                            options={team_data}
                                            onChange={(option) => this.onChangeTeam(option.value)}
                                        />
                                </div>
                                
                                <div className="col-md-3 space-margin">
                                    <label className="fontstyle normal-font">VBB Cycle</label>
                                    <Select
                                        className="react-select fontstyle"
                                        classNamePrefix="react-select"
                                        name="quarter-select"
                                        value={cycleOptions.filter(option =>option.value === selectedCycle)}
                                        options={cycleOptions}
                                        onChange={(option) => this.onChangeCycle(option.value)}
                                    />
                                </div>
                                <div className="col-md-3 space-margin">
                                    <label className="fontstyle normal-font">Level</label>
                                    <Select
                                        className="react-select fontstyle"
                                        classNamePrefix="react-select"
                                        name="quarter-select"
                                        value={level_data.filter(option =>option.value === user_level)}
                                        options={level_data}
                                        onChange={(option) => this.onChangeLevel(option.value)}
                                    />
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Username',languageData)}<a style = {{color :'red'}}>*</a></Label>
                                        <Select  className={is_submit === true && vbb_user === ''?  "error-border-select":"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={users_data.filter(option =>option.value === vbb_user)}
                                            options={users_data}
                                            onChange={(option) => this.onChangeUsername(option.value)}
                                        />
                                </div>
                             </div>
                             {/* <div className = "text-center" style = {{padding:'0px 0px 20px'}}>
                               <Button className = "button-width" color="secondary" 
                                onClick={()=>this.fetchPagination(page,pageSize,startdate,enddate,true)} >
                                  <i className = "simple-icon-cloud-download" style = {{marginRight:'5px'}}/>
                                  {onChangeLanguage(locale,'Download',languageData)}</Button> 

                                <Button className = "button-width" color="primary" 
                                     onClick={()=>this.onClickDay('Past 1 Days')} >
                                        <i className = "simple-icon-cloud-download" style = {{marginRight:'5px'}}/>
                                        {onChangeLanguage(locale,'Daily',languageData)} </Button> 

                                <Button className = "button-width" color="primary" 
                                  onClick={()=>this.onClickDay('This Week')} >
                                    <i className = "simple-icon-cloud-download" style = {{marginRight:'5px'}}/>
                                    {onChangeLanguage(locale,'Weekly',languageData)} </Button> 

                                <Button className = "button-width" color="primary"
                                  onClick={()=>this.onClickDay('This Month')} >
                                    <i className = "simple-icon-cloud-download" style = {{marginRight:'5px'}}/>
                                    {onChangeLanguage(locale,'Monthly',languageData)} </Button>  

                                 <Button className = "button-width" color="secondary" 
                                onClick={()=>this.clearValue()}
                                >{onChangeLanguage(locale,'Refresh',languageData)}</Button> 
                                  
                            </div> */}
                
                </div> 
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <div style={{ marginRight: '20px' }}>
                    <strong>Total Score: </strong>{typeof totalScore === 'number' ? totalScore.toFixed(2) : '0'}
                </div>
                <div>
                    <strong>Average Rating: </strong>{typeof averageRating === 'number' ? averageRating.toFixed(2) : '0'}
                </div>
                </div>
                <div style = {{padding :'10px',width:'100%',overflow:'auto'}}>
                     {(columns.length > 0 && data.length > 0) && 
                         <Table                 
                           columns={columns}
                           pagination = {pagination}
                           dataSource={data} 
                           rowKey="id"
                           rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}/>
       
                        }
                     <Button className = "button-width" color="secondary" 
                                onClick={()=>this.handleSubmit ()} >
                                  <i className = "simple-icon-cloud-download" style = {{marginRight:'5px'}}/>
                                  {onChangeLanguage(locale,'Submit',languageData)}</Button>
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

   })(ValueBasedBehaviour)
  );

