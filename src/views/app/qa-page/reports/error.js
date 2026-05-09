import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import moment from 'moment';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import Select from 'react-select';
import {onChangeLanguage,getValue} from '../../../../helper'
import{errorcodeauditService} from '../../../../redux/qa/errorcodeaudit/saga'
import{shipperService} from '../../../../redux/qa/shipper/saga'
import{tlacceptanceService} from '../../../../redux/qa/tlacceptance/saga'
import {getValue_ErrorCode} from '../pasteData'
import * as clipboard from "clipboard-polyfill/text";
import { Table,Tooltip } from 'antd';

class InputAudit extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        tl_acceptance_data:[],
        error_data:[
            {label:'YES',value:'YES'},
            {label:'NO',value:'NO'},
        ],
        correct_error_code_data:[],

      };
    }
    componentDidMount()
    {
      
        this.fetchShipper()
        this.fetchTLAcceptance()
    }
    fetchShipper() {
        this.setState({
          loading : true
        })
        shipperService.fetchapi()
          .then((res) => {
              this.setState({loading:false})
             if(res.status)   { 
                let filterstatus = (res.data).filter(item => item.status === 1)
                   var arealist = filterstatus.map(function(areaaval) {
                        return  {label : areaaval.name ,value : (areaaval.id).toString()};
                     });  
                      this.setState({
                        correct_error_code_data :  arealist,
                      })
                   }
                  
                   })
                   .catch((error) => { 
                      this.setState({
                          loading : false
                        })
                   }); 
       }
    fetchTLAcceptance() {
        this.setState({
          loading : true
        })
        tlacceptanceService.fetchapi()
          .then((res) => {
              this.setState({loading:false})
             if(res.status)   { 
                let filterstatus = (res.data).filter(item => item.status === 1)
                   var arealist = filterstatus.map(function(areaaval) {
                        return  {label : areaaval.name ,value : (areaaval.id).toString()};
                     });  
                      this.setState({
                      tl_acceptance_data :  arealist,
                      })
                   }
                  
                   })
                   .catch((error) => { 
                      this.setState({
                          loading : false
                        })
                   }); 
       }
   
    render()
    {
        const {locale,languageData,title,data} = this.props
        const {loading,error_data,tl_acceptance_data} = this.state
         var columns =  [
          {
            title:  onChangeLanguage(locale,'Exception Issue Date',languageData),
            dataIndex: 'exception_issuedate',
            key: 'exception_issuedate',
            render: (text, record) => (	
              <div style = {{padding:'2px',width:'100px'}}>
                  {text}

              </div>
          ),
          },
          {
            title:  onChangeLanguage(locale,'Exception Number',languageData),
            dataIndex: 'exception_no',
            key: 'exception_no',
            render: (text, record) => (	
             <div style = {{padding:'2px',width:'100px'}}>
              {text}
             </div>
             ),
          },
          {
            title:onChangeLanguage(locale,'MTD Number',languageData) ,
            dataIndex: 'mtd_no',
            key: 'mtd_no',
            render: (text, record) => (	
                <div style = {{padding:'2px',width:'200px'}}>
                    {text}
                </div>
                ),
          },
            
             
             {
              title: onChangeLanguage(locale,'Region (Issuer)',languageData),
              dataIndex: 'region',
              key: 'region',
              render: (text, record,index) => ( 
                <div style = {{padding:'2px',width:'100px'}}>
                 {text}
                </div>),
            }, 
            {
              title: onChangeLanguage(locale,'Subregion (Issuer)',languageData),
              dataIndex: 'subregion',
              key: 'subregion',
              render: (text, record,index) => ( 
                <div style = {{padding:'2px',width:'100px'}}>
                   {text}
                </div>),
            },
          {
            title:onChangeLanguage(locale,'Area (Issuer)',languageData) ,
            dataIndex: 'area',
            key: 'area',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
                 {text}
            
              </div>),
          },
          {
            title:onChangeLanguage(locale,'Error Code Group',languageData) ,
            dataIndex: 'errorcode_group',
            key: 'errorcode_group',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
               {text}
            
              </div>),
          },
          {
              title:onChangeLanguage(locale,'Error Code',languageData) ,
              dataIndex: 'errorcode',
              key: 'errorcode',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}
              
                </div>),
            },
            {
              title:onChangeLanguage(locale,'Receiver',languageData) ,
              dataIndex: 'receiver',
              key: 'receiver',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                   {text}
              
                </div>),
            },
            {
              title:onChangeLanguage(locale,'User of Last Action',languageData) ,
              dataIndex: 'user_of_lastaction',
              key: 'user_of_lastaction',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}
              
                </div>),
            },
            {
                title:onChangeLanguage(locale,'Capturing User',languageData) ,
                dataIndex: 'capture_user',
                key: 'capture_user',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'100px'}}>
                   {text}
                
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Solved by Capturing User',languageData) ,
                dataIndex: 'solvedby_capture_user',
                key: 'solvedby_capture_user',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'100px'}}>
                   {text}
                
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Exception Status',languageData) ,
                dataIndex: 'exception_status',
                key: 'exception_status',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'100px'}}>
                     {text}
                
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Performed Action',languageData) ,
                dataIndex: 'performed_action',
                key: 'performed_action',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'100px'}}>
                   {text}
                
                  </div>),
              },
              {
                  title:onChangeLanguage(locale,'Date of Creation (MTD)',languageData) ,
                  dataIndex: 'dod',
                  key: 'dod',
                  render: (text, record,index) => ( 
                    <div  style = {{padding:'2px',width:'100px'}}>
                     {text}
                  
                    </div>),
                },
            {
              title: onChangeLanguage(locale,'Start Date Time',languageData),
              dataIndex: 'start_datetime',
              key: 'start_datetime',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {(text !== null && text !== '')  && moment(text).format('MM/DD/YYYY hh:mm:ss a')}
                </div>),           
            },
            {
              title: onChangeLanguage(locale,'End Date Time',languageData),
              dataIndex: 'end_datetime',
              key: 'end_datetime',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {(text !== null && text !== '')  && moment(text).format('MM/DD/YYYY hh:mm:ss a')}
                </div>),           
            },
            
          {
            title:onChangeLanguage(locale,'Error',languageData) ,
            dataIndex: 'error',
            key: 'error',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
                  {getValue(error_data,'value','label',text)} 
            
              </div>),
          },
          {
            title:onChangeLanguage(locale,'Correct Error code',languageData) ,
            dataIndex: 'correct_error_code',
            key: 'correct_error_code',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'100px'}}>
                  {text} 
            
              </div>),
          },
         
          {
              title: onChangeLanguage(locale,'Auditor ID',languageData),
              dataIndex: 'auditor_id',
              key: 'auditor_id',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                {text}
                </div>),           
            },
            {
              title: onChangeLanguage(locale,'Auditor Remarks',languageData),
              dataIndex: 'auditor_remarks',
              key: 'auditor_remarks',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                {text}
                </div>),           
            },
            {
              title: onChangeLanguage(locale,'TL Acceptance',languageData),
              dataIndex: 'tl_acceptance',
              key: 'tl_acceptance',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
               {getValue(tl_acceptance_data,'value','label',text)}
                </div>),           
            },
            {
              title: onChangeLanguage(locale,'TL Remarks',languageData),
              dataIndex: 'tl_remarks',
              key: 'tl_remarks',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
               {text}
                </div>),           
            },
            {
              title: onChangeLanguage(locale,'Issue Description',languageData),
              dataIndex: 'issue_description',
              key: 'issue_description',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
               {text}
                </div>),           
            },
           
         ]
        const pagination = {
          ...this.paginationOptions,
          total: this.state.total,
          current: this.state.page,
          pageSize: this.state.pageSize,
          };
        return(
            <>
             <title>{onChangeLanguage(locale,title,languageData)}</title>
                 {loading && 
                    <div>
                        <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
                    </div>
                 }
               <div style = {{padding :'10px',width:'100%',overflow:'auto'}}>
                     {(columns.length > 0 && data.length > 0) && 
                         <Table                 
                           columns={columns}
                           pagination = {pagination}
                           dataSource={data} 
                           rowKey="id"
                           rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}/>
       
                        }
                     
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

   })(InputAudit)
  );

