import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import { Table } from 'antd';
import BackIcon from '../../../../assets/img/app_image/left-arrow.png'
import {onChangeLanguage,getValue,getEnableexportimport} from '../../../../helper'
import{qualityexportService} from '../../../../redux/fa/qualityexport/saga';
import{subregionService} from '../../../../redux/fa/subregion/saga';
import{qualityimportService} from '../../../../redux/fa/qualityimport/saga';
import{ShipmentListService} from '../../../../redux/fa/shipment-list/saga';
import{dataService} from '../../../../redux/fa/data/saga';
import Loading from "react-fullscreen-loading";
import { createNotification } from '../../../../toast';
import {INDEX_PAGE_SIZE_OPTIONS} from '../../../../constants/defaultValues';
import{userService} from '../../../../redux/users/saga'

import moment from 'moment';
import{errortypeService} from '../../../../redux/fa/errortype/saga';

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        shipment_no:'',
        subregion:'',
        user_id:'',
        contract_party:'',
        datasele:'',
        export_quality:'',
        import_quality:'',
        startdate:'',
        enddate:'',
        tabvalue:'total',
        auditor:'',
        audit_complete:false,
        dataselectdata:[],
        qualityimportdata:[],
        exportqualitydata:[],
        subregiondata:[],
        exporterrortypeData:[],
        all_data:[],
        loading:false,
        is_submit:false,
        page:1,
        pageSize:25,
        total :0,
        is_search:false,
        total_count :0,
        pending_count :0,
        complete_count :0,
        user_data:[],
      };
    }
    componentDidMount()
    {
      this.fetchqualityimport()
      this.fetchqualityexport()
      this.fetchDataselected()
      this.fetchsubregion()
      this.fetcherrortype()
      this.fetchuser()
    }
    fetchuser() {  
      this.setState({
        loading : true
      })
      userService.fetchpermission_user('FA')
        .then((res) => { 
          this.setState({   
        loading : false 
                
          }) 
          if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.is_active === 1)
               var regionlist = filterstatus.map(function(cusmaidid) {
                    return  {label : cusmaidid.username ,value : cusmaidid.username};
                 });  
                  this.setState({
                  user_data :  regionlist,
                  })
               }
               else{
               this.setState({loading:false})}
      })
      .catch((error) => { 
        this.setState({
          loading : false
        })
        });   
   }
    fetchData(page,per_page,subregion,contract_party,datasele,export_quality,import_quality,startdate,enddate,auditor,is_report) {  
      this.setState({
        loading : true
      })
      const {username} = this.state

      ShipmentListService.filtershipmentList(page,per_page,subregion,contract_party,datasele,export_quality,import_quality,startdate,enddate,auditor,is_report,username)
        .then((res) => { 
        this.setState({   
        loading : false 
                
          }) 
          if(res.status)
            {
              this.setState({ 
                all_data:res.data  ,
                total:res.total,
                total_count:res.totalcount,
                pending_count:res.pending,
                complete_count:res.completed,
              }) 
             
            }  else
            {
              this.setState({ 
                all_data:[]  , 
                total_count:0,
                pending_count:0,
                complete_count:0,
                total:0,       
              }) 
              createNotification(res.message,'error','filled')
            }                
      
      })
      .catch((error) => { 
        this.setState({
          loading : false
        })
        });   
   }
    fetchqualityexport() {
      qualityexportService.fetchqualityexport()
      .then((res) => {
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var rolelist = filterstatus.map(function(cusmaidid) {
                    return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                 });  
                  this.setState({
                  exportqualitydata :  rolelist,
                  })
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
    } 
    fetcherrortype() {
      errortypeService.fetcherrortype()
      .then((res) => {
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var rolelist = filterstatus.map(function(cusmaidid) {
                    return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                 });  
                  this.setState({
                  exporterrortypeData :  rolelist,
                  })
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
    } 
    fetchsubregion() {
      subregionService.fetchsubregion()
      .then((res) => {
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var rolelist = filterstatus.map(function(cusmaidid) {
                    return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                 });  
                  this.setState({
                  subregiondata :  rolelist,
                  })
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
    } 
    fetchDataselected() {
      dataService.fetchdata()
      .then((res) => {
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var rolelist = filterstatus.map(function(cusmaidid) {
                    return  {label : cusmaidid.name ,value : cusmaidid.name};
                 });  
                  this.setState({
                  dataselectdata :  rolelist,
                  })
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
    } 
    fetchqualityimport() {
      qualityimportService.fetchqualityimport()
      .then((res) => {
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var rolelist = filterstatus.map(function(cusmaidid) {
                    return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                 });  
                  this.setState({
                  qualityimportdata :  rolelist,
                  })
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
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
        navigator.clipboard.writeText(this.state.containerno)
    }
    onChangeRadio(value)
    {
        this.setState({activity:value})
    }
    onClickback()
    {
      this.props.history.goBack()
    }
    clearvalue()
    {
      this.setState({
        subregion:'',
        user_id:'',
        contract_party:'',
        datasele:'',
        export_quality:'',
        import_quality:'',
        startdate:'',
        enddate:'',
        auditor:'',
        all_data:[],
        page:1,
        pageSize:25,
        total :0,
        is_search:false,
        total_count :0,
        pending_count :0,
        complete_count :0,

      })
    }
    
      handlechangedataselected = (selectedOptions) => {
        const {startdate,enddate}=this.state
        if (startdate !=='' && enddate !=='') {
          this.setState({datasele : selectedOptions.value})
        }
        else{
          createNotification('Please Ender the Start Date and End Date','error','filled')
      }
      } 
   
   

    onfilter(page,per_page,subregion,contract_party,datasele,export_quality,import_quality,startdate,enddate,auditor,tabvalue,is_report) { 
     
     
      if(subregion!=='' )
      {
            this.setState({
              is_submit:false,
              loading:true,
              page : page,
              pageSize:per_page
            })
            
              const {username} = this.props
              this.setState({ loading : true })
              ShipmentListService.filtershipmentList(page,per_page,subregion,contract_party,datasele,export_quality,import_quality,startdate,enddate,auditor,
                tabvalue,is_report,username)
              .then((res) => { 
              this.setState({   
              loading : false 
                      
                }) 
                if(res.status ===true)
                  {
                    this.setState({ 
                      all_data:res.data  ,
                      total : res.total,
                      complete_count : res.complted,
                      pending_count : res.pending,
                      total_count : res.totalcount,
                    }) 
                   
                  }  else
                  {
                    this.setState({ 
                      all_data:[]  , 
                      pageSize : 25,
                      page:1, 
                      total:0,
                      complete_count : 0,
                      pending_count :0,
                      total_count : 0,
                               
                    }) 
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
    setTabvlaue(tab)
    {
      this.setState({
        tabvalue:tab
      })
      const {subregion,contract_party,datasele,export_quality,import_quality,startdate,enddate,auditor} =this.state
       this.onfilter(1,25,subregion,contract_party,datasele,export_quality,import_quality,startdate,enddate,auditor,tab,false)
    }
  onSearch()
  {
    const {subregion,contract_party,datasele,export_quality,import_quality,startdate,enddate,auditor,tabvalue} =this.state
    this.onfilter(1,25,subregion,contract_party,datasele,export_quality,import_quality,startdate,enddate,auditor,tabvalue,false)
  }
  onDownload()
  {
    const {page,pageSize,subregion,contract_party,datasele,export_quality,import_quality,startdate,enddate,auditor,tabvalue} =this.state
    this.onfilter(page,pageSize,subregion,contract_party,datasele,export_quality,import_quality,startdate,enddate,auditor,tabvalue,true)
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
        const {subregion,contract_party,datasele,export_quality,import_quality,startdate,enddate,auditor,tabvalue} =this.state
        this.onfilter(page,pageSize,subregion,contract_party,datasele,export_quality,import_quality,startdate,enddate,auditor,tabvalue,false)
        },
      pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
      // total: this.state.total  ,
      showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total}`,
    };
    render()
    {
        const {match,locale,languageData} = this.props
        const {subregion,contract_party,datasele,export_quality,import_quality,startdate,
          enddate,auditor,all_data,dataselectdata,exportqualitydata,qualityimportdata,tabvalue,
          subregiondata,is_submit,loading,total_count,pending_count,complete_count} = this.state
           let data = [...all_data]
        const columnss = [
          {
            title: onChangeLanguage(locale,'Shipment',languageData),
            dataIndex: 'shipment_no',
            key: 'shipment_no',
            render: (text, record,index) => ( 
              <div style = {{padding:'2px',width:'100px'}}>
                {text}
              </div>
          ), 
          },
          {
              title: onChangeLanguage(locale,'Sub Region',languageData),
              dataIndex: 'subregion',
              key: 'subregion',
              render: (text, record,index) => ( 
                <div style = {{padding:'2px',width:'100px'}}>
                {getValue(subregiondata,'value','label',text)}
              </div>
            ),
          },
          {
              title: onChangeLanguage(locale,'Contract Party',languageData),
              dataIndex: 'contract_party',
              key: 'contract_party',
              render: (text, record,index) => ( 
                <div style = {{padding:'2px',width:'100px'}}>
                {text}
              </div>
            ),
          },
          {
              title: onChangeLanguage(locale,'CS Booking',languageData),
              dataIndex: 'csbooking',
              key: 'csbooking',
              render: (text, record,index) => ( 
                <div style = {{padding:'2px',width:'100px'}}>
                {text}
              </div>
            ),
          },
          {
            title:onChangeLanguage(locale,'Office',languageData) ,
            dataIndex: 'office',
            key: 'office',
            render: (text, record,index) => ( 
              <div style = {{padding:'2px',width:'100px'}}>
                {text}
              </div>
          ),
          },
          {
            title:onChangeLanguage(locale,'ETD 1st Vessel',languageData),
            dataIndex: 'etd_first_vessel',
            key: 'etd_first_vessel',
            render: (text, record,index) => ( 
              <div style = {{padding:'2px',width:'100px'}}>
                {moment(text).format('MM/DD/YYYY')}
              </div>),
          },
          {
            title: onChangeLanguage(locale,'ETA Last Vessel',languageData),
            dataIndex: 'etd_last_vessel',
            key: 'etd_last_vessel',
            render: (text, record,index) => ( 
              <div style = {{padding:'2px',width:'100px'}}>
              {moment(text).format('MM/DD/YYYY')}
            </div>),
          },
          {
            title: onChangeLanguage(locale,'Main DP Voyage',languageData),
            dataIndex: 'dp_voyage',
            key: 'dp_voyage',
            render: (text, record,index) => ( 
              <div style = {{padding:'2px',width:'100px'}}>
              {text}
            </div>),
          },    
          {
            title: onChangeLanguage(locale,'OP POL',languageData),
            dataIndex: 'op_pol',
            key: 'op_pol',
            render: (text, record,index) => ( 
              <div style = {{padding:'2px',width:'100px'}}>
                {text}
              </div>),
          },  
          {
            title: onChangeLanguage(locale,'EX ID',languageData),
            dataIndex: 'export_auditor',
            key: 'export_auditor',
            render: (text, record,index) => ( 
              <div style = {{padding:'2px',width:'100px'}}>
                {text}
              </div>),
          },
          {
            title: onChangeLanguage(locale,'EX Quality',languageData),
            dataIndex: 'export_quality',
            key: 'export_quality',
            render: (text, record,index) => ( 
              <div style = {{padding:'2px',width:'100px'}}>
                {getValue(exportqualitydata,'value','label',text)}
              </div>),
          },
          {
            title: onChangeLanguage(locale,'IM ID',languageData),
            dataIndex: 'export_auditor',
            key: 'export_auditor',
            render: (text, record,index) => ( 
              <div style = {{padding:'2px',width:'100px'}}>
                {text}
              </div>),
          },
          {
            title: onChangeLanguage(locale,'IM Quality',languageData),
            dataIndex: 'import_quality',
            key: 'import_quality',
            render: (text, record,index) => ( 
              <div style = {{padding:'2px',width:'100px'}}>
                {getValue(qualityimportdata,'value','label',text)}
              </div>),
          },
          {
            title: onChangeLanguage(locale,'CC Sales Heir',languageData),
            dataIndex: 'cc_saler',
            key: 'cc_saler',
            render: (text, record,index) => ( 
              <div style = {{padding:'2px',width:'100px'}}>
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
        return (
            <>
            <title>{onChangeLanguage(locale,'Shipment List',languageData)}</title>
            {loading && 
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
            <Row>
              <Colxx xxs="12">

              <div className = "row">
                      <div className = "col-md-10">
                      <img src={BackIcon} alt="thumbnail"  
                        style = {{width :'25px',height:'25px',cursor :'pointer',marginTop :'-9px',marginRight:'10px'}}
                        onClick={()=>this.onClickback()}/>
                      <Breadcrumb heading="Shipment List" match={match} />
                    </div>
                    
                  </div>
                
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row" style = {{marginBottom:'10px'}}>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Sub Region',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Select  
                                    style={{height:'85px'}}
                                    className = {is_submit === true && subregion === ''?  "error-border-select-paste":"react-select fontstyle" }   
                                    classNamePrefix="react-select"
                                    name="form-field-name"
                                    value={subregiondata.filter(option =>option.value === subregion)}
                                    options={subregiondata}
                                    onChange={({value}) => this.setState({  subregion: value })}
                                />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Auditor ID',languageData)}</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {auditor}  
                            onChange= {(e)=>this.setState({auditor : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Contract Party',languageData)}</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {contract_party}  
                            onChange= {(e)=>this.setState({contract_party : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Data Selected',languageData)}</Label>
                                <Select  
                                    style={{height:'85px'}}
                                    className="react-select fontstyle"
                                    classNamePrefix="react-select"
                                    name="form-field-name"
                                    value={dataselectdata.filter(option =>option.value === datasele)}
                                    options={dataselectdata}
                                    onChange={this.handlechangedataselected}
                                    // onChange={({value}) => this.setState({  datasele: value })}
                                />
                         </div>
                         <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Quality(Exp.)',languageData)}</Label>
                                <Select  
                                    style={{height:'85px'}}
                                    className="react-select fontstyle"
                                    classNamePrefix="react-select"
                                    name="form-field-name"
                                    value={exportqualitydata.filter(option =>option.value === export_quality)}
                                    options={exportqualitydata}
                                    isDisabled = {getEnableexportimport('export_quality',import_quality,export_quality)}
                                    onChange={({value}) => this.setState({  export_quality: value })}
                                />
                         </div>
                         <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Quality(Imp.)',languageData)}</Label>
                                <Select  
                                    style={{height:'85px'}}
                                    className="react-select fontstyle"
                                    classNamePrefix="react-select"
                                    name="form-field-name"
                                    value={qualityimportdata.filter(option =>option.value === import_quality)}
                                    options={qualityimportdata}
                                    isDisabled = {getEnableexportimport('import_quality',import_quality,export_quality)}
                                    onChange={({value}) => this.setState({  import_quality: value })}
                                />
                         </div>
                       
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Start Date',languageData)}</Label>
                            <Input className = "fontstyle text-background" data-date-format='mm/dd/yy'
                                type="date"
                                value = {startdate}  
                                onChange= {(e)=>this.setState({startdate  : e.target.value})} ></Input>
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'End Date',languageData)}</Label>
                            <Input className = "fontstyle text-background" data-date-format='mm/dd/yy'
                                type="date"
                                value = {enddate}  
                                onChange= {(e)=>this.setState({enddate  : e.target.value})} ></Input>
                        </div>
                    </div>
                    <div className = "row text-center" style = {{marginBottom:'10px'}}>
                         <Button className = "button-width" color="secondary" style={{}} 
                            onClick={()=>this.onClickback()}
                           >{onChangeLanguage(locale,'Shipment Details',languageData)}</Button>
                           <Button className = "button-width" color="secondary" style={{}} 
                                    onClick={()=>this.onSearch()}
                           >{onChangeLanguage(locale,'Search',languageData)}</Button>
                           <Button className = "button-width" color="secondary"  
                            onClick={()=>this.onDownload()}
                            >{ onChangeLanguage(locale,'Download',languageData)}  
                            </Button>
                            {/* <Button className = "button-width" color="secondary" style={{}} 
                                    onClick={()=>this.onfilterdownload(subregion,contract_party,datasele,export_quality,import_quality,startdate,enddate,auditor)}
                           >{onChangeLanguage(locale,'Download',languageData)}</Button> */}
                             <Button className = "button-width" color="secondary" style={{}} 
                                    onClick={()=>this.clearvalue()}
                           >{onChangeLanguage(locale,'Refresh',languageData)}</Button>
                         <Button className = "button-width" color="primary" style={{}} 
                           onClick={()=>this.onClickback()}
                           >{onChangeLanguage(locale,'Back',languageData)}</Button>
                        
                    </div>
                </div>   
            </div>
            <div>
            <div className = "publishuser-card-component" style = {{borderRadius:'10px'}}>
               <div className = "publish-title1" style = {{borderRadius:'10px 10px 0px 0px'}}>
                    <div className = "row">
                        <div className = "col-md-4 text-center" style = {{color:tabvalue === 'total' ? 'white' : 'rgb(255 255 255 / 70%)',cursor:'pointer'}}
                        onClick = {()=>this.setTabvlaue('total')}>
                          <a className = "fontstyle">{onChangeLanguage(locale,'Total Task (No. of Task',languageData)} - {total_count})</a>
                        </div>
                        <div className = "col-md-4 text-center" style = {{color:tabvalue === 'complete' ? 'white' : 'rgb(255 255 255 / 70%)',cursor:'pointer'}}
                        onClick = {()=>this.setTabvlaue('complete')}>
                          <a className = "fontstyle">{onChangeLanguage(locale,'Completed Task (No. of Task',languageData)} - {complete_count})</a>
                        </div>
                        <div className = "col-md-4 text-center" style = {{color:tabvalue === 'pending' ? 'white' : 'rgb(255 255 255 / 70%)',cursor:'pointer'}}
                        onClick = {()=>this.setTabvlaue('pending')}>
                          <a className = "fontstyle">{onChangeLanguage(locale,'Pending Task (No. of Task',languageData)} - {pending_count})</a>
                        </div>
                       
                      </div>
                  </div>
             
                <div style = {{padding :'10px'}}>
                   
                    <Table 
                    dataSource={data} 
                    columns={columnss}
                    pagination = {pagination}
                    tableLayout="auto"
                    rowKey="id"
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}/>
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

