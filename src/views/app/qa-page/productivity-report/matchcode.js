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
import{matchcodeService} from '../../../../redux/qa/matchcode/saga'
import{matchcodecategoryService} from '../../../../redux/qa/matchcodecategory/saga'
import{matchcodesubcategoryService} from '../../../../redux/qa/matchcodesubcategory/saga'
import{tlacceptanceService} from '../../../../redux/qa/tlacceptance/saga'
import {getValue_MatchCodeAudit} from '../pasteData'
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
        category_data:[],
        subcategory_data:[],
        is_submit:false,
      };
    }
    componentDidMount()
    {
        
        this.fetchErrorCategory()
        this.fetchErrorSubCategory()
        this.fetchTLAcceptance()
       
    }
    fetchErrorCategory() {
        this.setState({
          loading : true
        })
        matchcodecategoryService.fetchapi()
          .then((res) => {
              this.setState({loading:false})
             if(res.status)   { 
                let filterstatus = (res.data).filter(item => item.status === 1)
                   var arealist = filterstatus.map(function(areaaval) {
                        return  {label : areaaval.name ,value : (areaaval.id).toString()};
                     });  
                      this.setState({
                      category_data :  arealist,
                      })
                   }
                  
                   })
                   .catch((error) => { 
                      this.setState({
                          loading : false
                        })
                   }); 
       }
       fetchErrorSubCategory() {
        this.setState({
          loading : true
        })
        matchcodesubcategoryService.fetchapi()
          .then((res) => {
              this.setState({loading:false})
             if(res.status)   { 
                let filterstatus = (res.data).filter(item => item.status === 1)
                   var arealist = filterstatus.map(function(areaaval) {
                        return  {label : areaaval.name ,value : (areaaval.id).toString()};
                     });  
                      this.setState({
                      subcategory_data :  arealist,
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
        const {loading,error_data,category_data,tl_acceptance_data,subcategory_data} = this.state
         var columns =  [
            {
              title:  onChangeLanguage(locale,'Shipment Number',languageData),
              dataIndex: 'shipment_no',
              key: 'shipment_no',
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
                 title:  onChangeLanguage(locale,'Customer',languageData),
                 dataIndex: 'customer',
                 key: 'customer',
                 render: (text, record) => (	
                  <div style = {{padding:'2px',width:'100px'}}>
                   {text}
                  </div>
                  ),
               },
               {
                title: onChangeLanguage(locale,'MTD Processed Date',languageData),
                dataIndex: 'mtd_processed_date',
                key: 'mtd_processed_date',
                render: (text, record,index) => ( 
                  <div style = {{padding:'2px',width:'100px'}}>
                   {text}
                  </div>),
              }, 
              {
                title: onChangeLanguage(locale,'Main POL',languageData),
                dataIndex: 'main_pol',
                key: 'main_pol',
                render: (text, record,index) => ( 
                  <div style = {{padding:'2px',width:'100px'}}>
                     {text}
                  </div>),
              },
            {
              title:onChangeLanguage(locale,'Main POD',languageData) ,
              dataIndex: 'main_pod',
              key: 'main_pod',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                   {text}
              
                </div>),
            },
            {
              title:onChangeLanguage(locale,'Inputter ID',languageData) ,
              dataIndex: 'input_id',
              key: 'input_id',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {text}
              
                </div>),
            },
            {
                title:onChangeLanguage(locale,'Team',languageData) ,
                dataIndex: 'team',
                key: 'team',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'100px'}}>
                   {text}
                
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Correct Match Code',languageData) ,
                dataIndex: 'correct_matchcode',
                key: 'correct_matchcode',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'100px'}}>
                   {text}
                
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'CNEE / Notify',languageData) ,
                dataIndex: 'cnee',
                key: 'cnee',
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
              title:onChangeLanguage(locale,'Error Category',languageData) ,
              dataIndex: 'category',
              key: 'category',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                    {getValue(category_data,'value','label',text)}
              
                </div>),
            },
          
            {
              title: onChangeLanguage(locale,'Error Sub Category',languageData),
              dataIndex: 'subcategory',
              key: 'subcategory',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                {getValue(subcategory_data,'value','label',text)}
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

