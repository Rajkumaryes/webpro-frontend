import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx,Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import {onChangeLanguage} from '../../../helper'
import { createNotification } from '../../../toast';
import {  Popconfirm ,Tooltip } from 'antd';
import moment from 'moment';
import { apiUrlBooking } from "../../../constants/defaultValues";
import{notificationService} from '../../../redux/notification/saga'
import Loading from "react-fullscreen-loading";
import BackIcon from '../../../assets/img/app_image/left-arrow.png'

class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading:false,
        messages: [], 
        user_data:[]
    };
  }

componentDidMount() {
    if(localStorage.getItem('username') !== null)
    {
      const username= localStorage.getItem('username')
       this.fetchdata(username)
   }
 
  }
  fetchdata = (username) =>
  {
      this.setState({
        loading:true
      })
    notificationService.fetchnotification(username)
    .then((res) => { 
        this.setState({
            loading:false
          })
      if(res.status)
        {
          
          if(res.data)
          {
            
             this.setState({
               messages:res.data,

             })
          }
         
        }            
  
      })
      .catch((error) => {
        this.setState({
            loading:false
          })
      });  
  }

onClickback()
  {
    this.props.history.goBack()
  }
  handleDelete = id => {
    this.setState({
        loading:true
      })
      notificationService.deletenotification(id)
    .then((res) => {
        this.setState({
            loading:false
          })
      if(res){
        createNotification('Deleted','success','filled')
        let messages = this.state.messages.filter(item => item.id !== id)
        this.setState({
            messages:messages
        })
      }			
    })
    .catch((error) => {
        this.setState({
            loading:false
          })
     });
  }

render()
  {
    
    const {match,locale,languageData} = this.props
    const { messages,loading} = this.state
    return (
      <>
      <title>{ onChangeLanguage(locale,'Notification',languageData)} </title>
          <Row>
            <Colxx xxs="12">
                <img src={BackIcon} alt="thumbnail"  
                style = {{width :'25px',height:'25px',cursor :'pointer',marginTop :'-9px',marginRight:'10px'}}
                onClick={()=>this.onClickback()}/>
               <h1> { onChangeLanguage(locale,'Notification',languageData)}</h1>
                
                {/* <Breadcrumb heading= { onChangeLanguage(locale,'Notification',languageData)}  />       */}
			    <Separator className="mb-5" />
            </Colxx>
            </Row>
            {loading && 
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
        <div>
             {messages.map((record, index) => 
                  <div className="publishuser-card-component" style = {{padding:'10px'}}>
                      <Popconfirm className = 'fontstyle' variant="contained" 
                        title={onChangeLanguage(locale,"Are you sure to delete?",languageData)}
                        style = {{
                            backgroundColor: 'rgb(79, 156, 1)',
                            color: 'white' }}
                        onConfirm={() => this.handleDelete(record.id)}>
                        <Tooltip title={onChangeLanguage(locale,"Delete",languageData)} placement="bottom">
                            <a style = {{color  :'red',fontSize:'15px' ,float:'right',marginLeft:'12px'}}><i className = "simple-icon-close"></i></a></Tooltip>
                        </Popconfirm>
                      <p className="text-small" style = {{float:'right',marginTop:'4px'}}>{moment(record.created_at).format('MM/DD/YYYY hh:mm:ss a')}</p>
                      <p className="font-weight-medium mb-1">{record.module}</p>
                      <p className="text-muted" style = {{whiteSpace:'pre-line',fontSize:'10px'}}>{record.name}</p>
                      {record.type !== 'Total Efforts Non-Doc' &&  
                      <p> <a style ={{color:'blue'}} href={apiUrlBooking+'/'+record.download_url} download=  "download" >
                      {onChangeLanguage(locale,'Download Report',languageData)}
                      </a></p>
                        }
                  </div>
                )}
        </div>
          
         </>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale,languageData} = settings;
  return {locale, languageData};
};
export default injectIntl(
  connect(mapStateToProps, {
  })(RegisterUser)
);

