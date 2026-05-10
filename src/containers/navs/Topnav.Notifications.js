/* eslint-disable react/no-array-index-key */
import React,{Component} from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import {onChangeLanguage} from '../../helper'
import moment from 'moment';
import { HubConnection } from 'signalr-client-react';
import { apiUrl } from "../../constants/defaultValues";
import{notificationService} from '../../redux/notification/saga'

class TopnavNotifications extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
       messages: [], 
       nick: '',
       message: '',
       hubConnection: null,
       count  : 0,
       user_data:[],
       dropdownOpen:false
    };
  }
  componentDidMount() {
    
    
    if(localStorage.getItem('username') !== null)
    {
      const username= localStorage.getItem('username')
       this.fetchdata(username)
       this.getNotification(username)
   }
 
  }
  fetchdata = (username) =>
  {
    notificationService.fetchnotification(username)
    .then((res) => { 
      if(res.status)
        {
          
          if(res.data)
          {
            let list = (res.data).filter(item => item.isread === 0)
             this.setState({
               messages:res.data,
               count :list.length
             })
          }
         
        }            
  
      })
      .catch((error) => {});  
  }
  getNotification(username)
  {
    // Create a single connection instance. Use apiUrl if available, otherwise fall back to relative path.
    try {
      const connectionUrl = apiUrl ? `${apiUrl}/chat` : '/chat';
      const connection = new HubConnection(connectionUrl);

      // Safe message handler: attempt to parse JSON if a string is received.
      const safeHandler = (receivedMessage) => {
        let payload = receivedMessage;
        if (typeof receivedMessage === 'string') {
          try {
            payload = JSON.parse(receivedMessage);
          } catch (e) {
            // If parsing fails, keep the raw string as payload
            // eslint-disable-next-line no-console
            console.warn('Notification: failed to parse receivedMessage as JSON, using raw string', e);
            payload = { text: receivedMessage };
          }
        }

        // If payload is an object, inspect to_userid field safely
        try {
          if (payload && payload.to_userid && payload.to_userid === username) {
            const messages = this.state.messages.concat([payload]);
            this.setState({ messages, count: messages.length });
          }
        } catch (err) {
          // eslint-disable-next-line no-console
          console.warn('Notification: error handling payload', err, payload);
        }
      };

      connection.on('sendToAll', safeHandler);

      // start connection but don't let failures break the app
      connection.start()
        .then(() => {
          // eslint-disable-next-line no-console
          console.log('notification testing ===> Connection started!');
          this.setState({ hubConnection: connection });
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.warn('notification testing ===> Error while establishing connection :(', err);
        });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('notification testing ===> Failed to initialize HubConnection', e);
    }
 
  }
  onClickView()
  {
    this.props.history.push('/app/notification')
  }
  onClickClear()
  {
    var list = []
    const {messages} = this.state
    for(var i=0;i<messages.length;i++)
    {
      if(messages[i].isread === 0)
      {
        list.push(messages[i].id)
      }
    }
    if(list.length > 0)
    {
      
      notificationService.clearnotification(list)
      .then((res) => { 
        if(res.status === true)
          {
            this.setState({
              // messages:[],
              count:0
            })
           
          }            
    
        })
        .catch((error) => {});  
    }
   

  }
   toggle = (value) => {
     this.setState({
      dropdownOpen:value
     })
     if(value === true)
     {
        this.onClickClear()
     }
  
   }
  render()
  {
    const {messages,count,dropdownOpen} = this.state
    const {locale,languageData} = this.props
    return (
      <div className="position-relative d-inline-block">
        <Dropdown className="dropdown-menu-right"  isOpen={dropdownOpen} toggle={()=>this.toggle(!dropdownOpen)}>
          <DropdownToggle
            className="header-icon notificationButton"
            color="empty"
          >
            <i className="simple-icon-bell" />
            {count !== 0 &&  <span className="count">{count}</span>}
          </DropdownToggle>
          <DropdownMenu
            className="position-absolute mt-3 scroll"
            right
            // id="notificationDropdown"
          >
           <div>
            <div className ="notification-card">
                {messages.slice(0, 5).map((record, index) => 
                  <div className="border-bottom">
                      <p className="text-small" style = {{float:'right'}}>{moment(record.created_at).format('MM/DD/YYYY')}</p>
                      <p className="font-weight-medium mb-1">{record.module}</p>
                      <p className="text-muted" style = {{whiteSpace:'pre-line',fontSize:'10px'}}>{record.name}</p>
                      {record.type !== 'Total Efforts Non-Doc' &&
                        <p> <a style ={{color:'blue'}} href={apiUrl+'/'+record.download_url} download=  "download" >
                        {onChangeLanguage(locale,'Download Report',languageData)}
                        </a></p>
                        // <p> <a style ={{color:'blue'}} href={apiUrl+'/'+record.download_url} download=  "download" >
                        // {onChangeLanguage(locale,'Download Report',languageData)}
                        // </a></p>
                      }
                  </div>
                )}
              </div>
           </div>
           <div className = "text-center">
              <span style ={{color:'#EF6432',cursor:'pointer',marginTop:'10px'}}  onClick = {()=>this.onClickView()}><u>{onChangeLanguage(locale,'View All',languageData)}</u></span>
             
           </div>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
};

const mapStateToProps = ({ settings }) => {
  const { locale,languageData,username} = settings;
  return {locale, languageData,username};
};
export default withRouter(
  connect(mapStateToProps, {

 })(TopnavNotifications)
);

