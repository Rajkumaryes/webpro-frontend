import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import Loading from "react-fullscreen-loading";
import { Label, Input, Button } from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { onChangeLanguage, convertLocalToUTCDate, getValue, get_array_id, get_multiplechoose_array, getoptionvalue } from '../../../../helper'
import Select from 'react-select';
import moment from 'moment';
import Workbook from 'react-excel-workbook'
import * as clipboard from "clipboard-polyfill/text";
import { getValue_S9610,getValue_D1040, getValue_S8100 } from '../../pasteData'
import { createNotification } from '../../../../toast';
import DatePicker from "../../datePicker";
import { Table, Checkbox } from 'antd';
import { audittypeService } from '../../../../redux/bookingamendment/audittype/saga'
import { processtypeService } from '../../../../redux/bookingamendment/processtype/saga'
import { productivityslabService } from '../../../../redux/productivityslab/saga'
import { accuracyslabService } from '../../../../redux/errorcode/saga';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import CustomLoader from "../CustomLoader";

class BookingSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      id: 0,
      region: '',
      area: '',
      team: '',
      user_id: '',
      csb_office: '',
      error_date: '',
      error_type: '',
      start_date: new Date(),
      process: '',
      sub_process:'',
      category:'',
      error_code:'',
      detailed_description: '',
      route_cause: '',
      error_captured_userid:'',
      error_reviewed_userid:'',
      transaction_no:'',
      exception_id:'',
      updated_start_time: new Date(),
      is_search: false,
      is_submit: false,
      crmsearch: false,
      tableindex: 0,
      tabledata: [],
      issuecode_data: [],
      teamdata: [],
      searchdata: [],
      tableindex: 0,
      audittype_data: [],
      process_data: [],
      sub_process_data:[],
      filtered_sub_process_data: [],
      filtered_error_code_data: [],
      category_data:[],
      error_code_data: [],
      data:[],
      internalauditcount:'',
      internalauditcountlast:'',
      crm_case_no:''
    }
  }
  componentDidMount() {
    this.setState({
      start_date: new Date(),
    })

  }

 

 


  onChangeFileUploadproductivity(files)
	{
    this.setState({
      loading : true
    })
    productivityslabService.fileUpload(files[0])
      .then((res) => { 
        this.setState({
          loading : false
        })
        if(res.status)
        {
         if(res.data)
         {
          if(res.data.status)   
          {   
         
            createNotification('Uploaded','success','filled')
            this.fetchinternalauditCount()
          } 
          else
          {
          
            createNotification(res.data.message,'error','filled');
          } 
         }  
        }
         
    
    })
    .catch((error) => { 
      this.setState({
        loading : false
      })
      });
  }

  onChangeFileUploadaccuracy(files)
	{
    this.setState({
      loading : true
    })
    productivityslabService.fileUploads(files[0])
      .then((res) => { 
        this.setState({
          loading : false
        })
        if(res.status)
        {
         if(res.data)
         {
          if(res.data.status)   
          {   
         
            createNotification('Uploaded','success','filled')
            this.fetchinternalauditCount()
          } 
          else
          {
          
            createNotification(res.data.message,'error','filled');
          } 
         }  
        }
         
    
    })
    .catch((error) => { 
      this.setState({
        loading : false
      })
      });
  }
  renderTemplate()
  {
    const {languageData,locale} = this.props
  
    const column_name = ["Year","Productivity Percentage","EQ Units","Productivity Rating"]
      return(
        
        <Workbook filename="ProductivitySlab.xlsx" element={
            <Button className = "button-width"
             color="secondary" >
            {onChangeLanguage(locale,'Download Template',languageData)} 
            </Button>
          }>
          <Workbook.Sheet data={[]} name="Sheet A">
          {column_name && column_name.map((value,index) =>
           <Workbook.Column label={value} value={value}  />
           )}
          </Workbook.Sheet> 
        </Workbook>
     

      );
  }

  renderTemplates()
  {
    const {languageData,locale} = this.props
  
    const column_name = ["Year","Process", "Accuracy Percentage","Accuracy Rating"]
      return(
        
        <Workbook filename="AccuracySlab.xlsx" element={
            <Button className = "button-width"
             color="secondary" >
            {onChangeLanguage(locale,'Download Template',languageData)} 
            </Button>
          }>
          <Workbook.Sheet data={[]} name="Sheet A">
          {column_name && column_name.map((value,index) =>
           <Workbook.Column label={value} value={value}  />
           )}
          </Workbook.Sheet> 
        </Workbook>
     

      );
  }
  
  render() {
    const { match, locale, languageData, username } = this.props
    const { loading, region, area, team, csb_office, assigned_to,
      error_code,error_code_data, error_date, error_type, process,sub_process,process_data, sub_process_data, filtered_sub_process_data,filtered_error_code_data, error_reviewed_userid,transaction_no,exception_id, category, category_data,detailed_description,route_cause,error_captured_userid,
      last_pod, end_pod, start_date, end_date, is_search, is_submit, searchdata, teamdata, tabledata, tableindex, crmsearch, } = this.state
    var errortype_data = [
      {
        "label": "Internal",
        "value": "internal"
      },
      {
        "label": "External",
        "value": "external"
      },
    ];

    return (

      <>
        {loading &&
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
        {/* <div>
        <CustomLoader loading={loading} />
        {!loading && <div>Your main application content goes here</div>}
      </div> */}
        <title>{onChangeLanguage(locale, 'Productivity & Accuracy Upload', languageData)}</title>
        <Row>
          <Colxx xxs="12">
            <div className="row">
              <div className="col-md-8">
                <Breadcrumb heading={onChangeLanguage(locale, 'Productivity & Accuracy Upload', languageData)} match={match} />
              </div>
            </div>
            <Separator className="separator-margin" />
          </Colxx>
        </Row>
        <div className="publishuser-card-component" style={{ padding: '10px', borderRadius: '10px', marginBottom: '30px' }}>
        <div className="row" style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  
  {/* Productivity Slab Upload */}
  <div className="col-md-2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <label style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
      Productivity Slab Upload
    </label>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Button color="primary" style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
        <i className="simple-icon-cloud-upload" style={{ marginRight: '5px', fontSize: '14px' }} />
        Upload
        <input 
          type="file" 
          name="file" 
          id="File-1" 
          onClick={(e) => e.target.value = null}
          className="filepicker_customButton"
          style={{ opacity: 0, position: 'absolute', left: 0, width: '100%', height: '100%', cursor: 'pointer' }}
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={({ target: { files }}) => this.onChangeFileUploadproductivity(files)}
        />
      </Button>
    </div>
  </div>

  {/* Productivity Template Download */}
  <div className="col-md-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {this.renderTemplate()}
  </div>

  {/* Vertical Line */}
  <div className="col-md-1" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ height: '100px', width: '1px', backgroundColor: '#ccc' }}></div>
  </div>

  {/* Accuracy Slab Upload */}
  <div className="col-md-2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <label style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
      Accuracy Slab Upload
    </label>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Button color="primary" style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
        <i className="simple-icon-cloud-upload" style={{ marginRight: '5px', fontSize: '14px' }} />
        Upload
        <input 
          type="file" 
          name="file" 
          id="File-2" 
          onClick={(e) => e.target.value = null}
          className="filepicker_customButton"
          style={{ opacity: 0, position: 'absolute', left: 0, width: '100%', height: '100%', cursor: 'pointer' }}
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={({ target: { files }}) => this.onChangeFileUploadaccuracy(files)}
        />
      </Button>
    </div>
  </div>

  {/* Accuracy Template Download */}
  <div className="col-md-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {this.renderTemplates()}
  </div>
</div>







          <div className="row text-center" style={{ margin: '0px 5px' }}>
            {/* <Button className="button-width" color="secondary"
              onClick={() => this.onPasteS9610()}>
              {onChangeLanguage(locale, 'Paste S9610', languageData)}
            </Button> */}
            {/* <Button className="button-width" color="secondary"
                onClick={() => this.onPasteD1040()}>
              {onChangeLanguage(locale, 'Paste From D1040', languageData)}
            </Button> */}
            {/* <Button className="button-width" color="primary"
              onClick={() => this.onSubmit()}>
              {onChangeLanguage(locale, 'Save', languageData)}
            </Button>
            <Button className="button-width" color="secondary"
              onClick={() => this.onClearValue()}>
              {onChangeLanguage(locale, 'Refresh', languageData)}
            </Button> */}
          </div>
          {is_search == true &&
            <div className="publishuser-card-component" style={{ borderRadius: '10px', marginBottom: '30px' }}>

              <div style={{ padding: '10px' }}>
                <Table
                  dataSource={tabledata}
                  columns={columsss}
                  // rowSelection={rowSelection}
                  tableLayout="auto"
                  rowKey="id"
                  scroll={{ y: 240, x: "max-content" }}
                  pagination={false}
                  rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'} />
              </div>
              <div className="row text-center" style={{ margin: '0px 5px' }}>
                <Button className="button-width" color="primary"
                  disabled={searchdata.length > 0 ? false : true}
                  onClick={() => this.prevTitle(tableindex, searchdata)}>
                  {onChangeLanguage(locale, 'Prev', languageData)}
                </Button>
                <Button className="button-width" color="secondary"
                  onClick={() => this.nextTitle(tableindex, searchdata)}
                  disabled={searchdata.length > 0 ? false : true}>
                  {onChangeLanguage(locale, 'Next', languageData)}
                </Button>
              </div>
            </div>
          }
        </div>
      </>
    )
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale, languageData, username } = settings;
  return { locale, languageData, username };
};
export default withRouter(
  connect(mapStateToProps, {

  })(BookingSheet)
);
