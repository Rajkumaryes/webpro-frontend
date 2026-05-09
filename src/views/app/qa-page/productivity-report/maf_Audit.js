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
import{mafauditService} from '../../../../redux/qa/mafaudit/saga'
import{tlacceptanceService} from '../../../../redux/qa/tlacceptance/saga'
import{chargecodetypeService} from '../../../../redux/qa/chargecodetype/saga'
import{standardcommentService} from '../../../../redux/qa/standardcomment/saga'
import{mafapplicableService} from '../../../../redux/qa/mafapplicable/saga'
import {getValue_MAF} from '../pasteData'
import * as clipboard from "clipboard-polyfill/text";
import { Table,Tooltip } from 'antd';

class InputAudit extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        shipment_no:'',
        mtd_no:'',
        customer:'',
        corrector_id:'',
        charge_applicable:'',
        standardcomment:'',
        maf_applicable:'',
        start_datetime:'',
        end_datetime:'',
        chargecode:'',
        error:'',
        sob_date:'',
        auditor_id:'',
        auditor_remarks:'',
        tl_acceptance:'',
        tl_remarks:'',
        subcategory_comment:'',
        first_received_date:'',
        second_received_date:'',
        third_received_date:'',
        fourth_received_date:'',
        fifth_received_date:'',
        sixth_received_date:'',
        seventh_received_date:'',
        maf_xnx:'',
        maf_procedure:'',
        tl_acceptance_data:[],
        chargecode_data:[],
        error_data:[
            {label:'YES',value:'YES'},
            {label:'NO',value:'NO'},
        ],
        standardcomment_data:[],
        maf_applicable_data:[],
        charge_applicable_data:[
            {label:'YES',value:'YES'},
            {label:'NO',value:'NO'},
        ],
        is_submit:false,
      };
    }
    componentDidMount()
    {
        this.setState({
            start_datetime : moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
        })
        this.fetchTLAcceptance()
        this.fetchMAFApplicable()
        this.fetchChargeCode()
        this.fetchStandardComment()
       
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
     fetchMAFApplicable() {
        this.setState({
          loading : true
        })
        mafapplicableService.fetchapi()
          .then((res) => {
              this.setState({loading:false})
             if(res.status)   { 
                let filterstatus = (res.data).filter(item => item.status === 1)
                   var arealist = filterstatus.map(function(areaaval) {
                        return  {label : areaaval.name ,value : (areaaval.id).toString()};
                     });  
                      this.setState({
                      maf_applicable_data :  arealist,
                      })
                   }
                  
                   })
                   .catch((error) => { 
                      this.setState({
                          loading : false
                        })
                   }); 
       }
       fetchChargeCode() {
        this.setState({
          loading : true
        })
        chargecodetypeService.fetchapi()
          .then((res) => {
              this.setState({loading:false})
             if(res.status)   { 
                let filterstatus = (res.data).filter(item => item.status === 1)
                   var arealist = filterstatus.map(function(areaaval) {
                        return  {label : areaaval.name ,value : (areaaval.id).toString()};
                     });  
                      this.setState({
                        chargecode_data :  arealist,
                      })
                   }
                  
                   })
                   .catch((error) => { 
                      this.setState({
                          loading : false
                        })
                   }); 
       }
       fetchStandardComment() {
        this.setState({
          loading : true
        })
        standardcommentService.fetchapi()
          .then((res) => {
              this.setState({loading:false})
             if(res.status)   { 
                let filterstatus = (res.data).filter(item => item.status === 1)
                   var arealist = filterstatus.map(function(areaaval) {
                        return  {label : areaaval.name ,value : (areaaval.id).toString()};
                     });  
                      this.setState({
                      standardcomment_data :  arealist,
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
        const {loading,chargecode_data,error_data,tl_acceptance_data,charge_applicable_data} = this.state
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
                 title:  onChangeLanguage(locale,'SOB Date',languageData),
                 dataIndex: 'sob_date',
                 key: 'sob_date',
                 render: (text, record) => (	
                  <div style = {{padding:'2px',width:'100px'}}>
                   {text}
                  </div>
                  ),
               },
               {
                title: onChangeLanguage(locale,'Customer Name',languageData),
                dataIndex: 'customer',
                key: 'customer',
                render: (text, record,index) => ( 
                  <div style = {{padding:'2px',width:'100px'}}>
                   {text}
                  </div>),
              }, 
              {
                title: onChangeLanguage(locale,'1st DC Received Date & Time',languageData),
                dataIndex: 'first_received_date',
                key: 'first_received_date',
                render: (text, record,index) => ( 
                  <div style = {{padding:'2px',width:'100px'}}>
                     {text}
                  </div>),
              },
              {
                title: onChangeLanguage(locale,'2st DC Received Date & Time',languageData),
                dataIndex: 'second_received_date',
                key: 'second_received_date',
                render: (text, record,index) => ( 
                  <div style = {{padding:'2px',width:'100px'}}>
                     {text}
                  </div>),
              },
              {
                title: onChangeLanguage(locale,'3rd DC Received Date & Time',languageData),
                dataIndex: 'third_received_date',
                key: 'third_received_date',
                render: (text, record,index) => ( 
                  <div style = {{padding:'2px',width:'100px'}}>
                     {text}
                  </div>),
              },
              {
                title: onChangeLanguage(locale,'4th DC Received Date & Time',languageData),
                dataIndex: 'fourth_received_date',
                key: 'fourth_received_date',
                render: (text, record,index) => ( 
                  <div style = {{padding:'2px',width:'100px'}}>
                     {text}
                  </div>),
              },
              {
                title: onChangeLanguage(locale,'5th DC Received Date & Time',languageData),
                dataIndex: 'fifth_received_date',
                key: 'fifth_received_date',
                render: (text, record,index) => ( 
                  <div style = {{padding:'2px',width:'100px'}}>
                     {text}
                  </div>),
              },
              {
                title: onChangeLanguage(locale,'6th DC Received Date & Time',languageData),
                dataIndex: 'sixth_received_date',
                key: 'sixth_received_date',
                render: (text, record,index) => ( 
                  <div style = {{padding:'2px',width:'100px'}}>
                     {text}
                  </div>),
              },
              {
                title: onChangeLanguage(locale,'7th DC Received Date & Time',languageData),
                dataIndex: 'seventh_received_date',
                key: 'seventh_received_date',
                render: (text, record,index) => ( 
                  <div style = {{padding:'2px',width:'100px'}}>
                     {text}
                  </div>),
              },
            {
              title:onChangeLanguage(locale,'MAF/XNX/XNH',languageData) ,
              dataIndex: 'maf_xnx',
              key: 'maf_xnx',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                   {text}
              
                </div>),
            },
            {
              title:onChangeLanguage(locale,'Type of Charge Code',languageData) ,
              dataIndex: 'chargecode',
              key: 'chargecode',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                 {getValue(chargecode_data,'value','label',text)} 
              
                </div>),
            },
            {
                title:onChangeLanguage(locale,'MAF has to Apply as per Procedure',languageData) ,
                dataIndex: 'maf_procedure',
                key: 'maf_procedure',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'100px'}}>
                   {text}
                
                  </div>),
              },
              {
                title:onChangeLanguage(locale,'Charge Application',languageData) ,
                dataIndex: 'charge_applicable',
                key: 'charge_applicable',
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px',width:'100px'}}>
                   {getValue(charge_applicable_data,'value','label',text)} 
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
              title:onChangeLanguage(locale,'Standard Comment',languageData) ,
              dataIndex: 'standardcomment',
              key: 'standardcomment',
              render: (text, record,index) => ( 
                <div  style = {{padding:'2px',width:'100px'}}>
                    {text}
              
                </div>),
            },
          
            {
              title: onChangeLanguage(locale,'Sub Category Standard Comment',languageData),
              dataIndex: 'subcategory_comment',
              key: 'subcategory_comment',
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
              title: onChangeLanguage(locale,'Corrector ID',languageData),
              dataIndex: 'corrector_id',
              key: 'corrector_id',
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

