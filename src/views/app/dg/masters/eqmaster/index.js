import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Button,ModalHeader,Modal,ModalBody} from 'reactstrap';
import { Colxx, Separator } from '../../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../../containers/navs/Breadcrumb';
import Create from './create'
import { Table, Popconfirm ,Tooltip ,Input} from 'antd';
import 'antd/dist/antd.css';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage} from '../../../../../helper';
import{eqmasterService} from '../../../../../redux/dgtt/dgmodeleqmaster/saga';
import{regionimportService} from '../../../../../redux/imports/regionimport/saga'
import{areaimportService} from '../../../../../redux/imports/areaimport/saga'
import {getValue} from '../../../../../helper'
import Workbook from 'react-excel-workbook'
import{AreaService} from '../../../../../redux/dgtt/dgarea/saga'
import{dectypeService} from '../../../../../redux/dgtt/dectype/saga'
import{containertypeService} from '../../../../../redux/dgtt/containertype/saga'

class MasterPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
       data:[],
       areadata:[],
       dectypedata:[],
       cntrtypedata:[],
       isEdit:false,
       modalOpen:false,
       record:{},
       searchText: '',
      };
    }
    componentWillMount()
    {
        this.fetchData()
        this.fetcharea()
        this.fetchdectype()
        this.fetchcontainertype()
    }
    fetcharea() {
      this.setState({loading:true})
      AreaService.fetcharea()
      .then((res) => {
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var regionlist = filterstatus.map(function(cusmaidid) {
                    return  {text : cusmaidid.name ,value : cusmaidid.id.toString()};
                 });  
                  this.setState({
                  areadata :  regionlist
                  })
                 
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})
   }  
  
  fetchdectype() {
    this.setState({loading:true})
    dectypeService.fetchdectype()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {text : cusmaidid.name ,value : cusmaidid.id.toString()};
               });  
                this.setState({
                dectypedata :  regionlist
                })
               
             }
             else{
             this.setState({loading:false})}
             })
             .catch((error) => { }); 
             this.setState({loading:false})
  }  
  fetchcontainertype() {
  this.setState({loading:true})
  containertypeService.fetchcontainertype()
  .then((res) => {
     if(res.status)   { 
        let filterstatus = (res.data).filter(item => item.status === 1)
           var regionlist = filterstatus.map(function(cusmaidid) {
                return  {text : cusmaidid.name ,value : cusmaidid.id.toString()};
             });  
              this.setState({
                cntrtypedata :  regionlist
              })
             
           }
           else{
           this.setState({loading:false})}
           })
           .catch((error) => { }); 
           this.setState({loading:false})
  }  
   
    fetchData() {  
      this.setState({
        loading : true
      })
      eqmasterService.fetcheqmaster()
        .then((res) => { 
          this.setState({   
        loading : false 
                
          }) 
          if(res.status)
            {
              this.setState({ 
                data:res.data  , 
                         
              }) 
            }    else
            {
              this.setState({ 
                data:[]  , 
                         
              }) 
            }              
      
      })
      .catch((error) => { 
        this.setState({
          loading : false
        })
        });   
   }
    
    openModal(record)
  {
	 
	  if(record)
	  {
		  this.setState({
		  isEdit : true,
		  record : record,
		  })
	  }
	  this.setState({
		  modalOpen : true,
	  })
  }
    closeModal(isEdit)
    {
      this.setState({
        modalOpen:false,
        isEdit:false,
        record:{},
      })
      if(isEdit === true)
      {
        this.fetchData()
      }

     
    }
   
  handleDelete = id => {
    eqmasterService.deleteeqmaster(id)
    .then((res) => {
      if(res){
        createNotification('Deleted','success','filled')
        this.fetchData()
      }			
    })
    .catch((error) => { });
  }
  renderTemplate()
  {
    const {languageData,locale} = this.props
    const {data,areadata,dectypedata,cntrtypedata} = this.state
    var array = data.map(record=> {
          return {
            'Area' :record.area !== null ? getValue(areadata,'value','text',record.area):'' ,
            'Dec Type' :record.dec_type !== null ? getValue(dectypedata,'value','text',record.dec_type):'' ,
            'Container Type' :record.container_type !== null ? getValue(cntrtypedata,'value','text',record.container_type):'' ,
            'No of Cargoes' : record.name,
            'EQ' : record.eq,
        };
      })
      return(
        
        <Workbook filename="EQ.xlsx" element={
          <Button className = "button-width" color="secondary"  style={{width:'150px'}}
          >{ onChangeLanguage(locale,'Download',languageData)}  
          </Button>
		      }>
          <Workbook.Sheet data={array} name="Sheet A">
          <Workbook.Column label="Area" value="Area"/>
          <Workbook.Column label="Dec Type" value="Dec Type"/>
          <Workbook.Column label="Container Type" value="Container Type"/>
          <Workbook.Column label="No of Cargoes" value="No of Cargoes"/>
          <Workbook.Column label="EQ" value="EQ"/>
          </Workbook.Sheet> 
        </Workbook>
     

      );
  }
  onChangeFileUpload(files)
	{
    this.setState({
      loading : true
    })
    eqmasterService.fileUpload(files[0])
      .then((res) => { 
        if(res.status)
        {
          this.setState({   
            loading : false 
                    
              }) 
          if(res.data.status)   
          {   
         
            createNotification('Uploaded','success','filled')
              this.fetchData()
          }    
          else{
            createNotification(res.data.message,'error','filled')
          }
        }
          
    
    })
    .catch((error) => { 
      this.setState({
        loading : false
      })
      });
  }
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          // ref={node => {
          //   this.searchInput = node;
          // }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
      
          <Button 
            color="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<i className = "simple-icon-magnifier"></i>}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button color="secondary" onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        
      </div>
    ),
    filterIcon: filtered => <a className="search-icon-cls"><i className = "simple-icon-magnifier"/></a>,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        // setTimeout(() => this.searchInput.select(), 9000);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        text ? text.toString() : ''
      ) : (
        text
      ),
  });
  
  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };
  
  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  
    render()
    {
      const {locale,languageData,match} = this.props
        const {data,areadata,dectypedata,cntrtypedata} = this.state
        const columns = [
             {
                title:  onChangeLanguage(locale,'Area',languageData),
                dataIndex: 'area',
                key: 'area',
                render: (text, record) => (	
                  <div>
                     {text !== null &&getValue(areadata,'value','text',text)}
                  </div>
              ),
              filters: areadata,
              filterMultiple: false,
              onFilter: (value, record) => record.area === value,
              },
              {
                title:  onChangeLanguage(locale,'Dec Type',languageData),
                dataIndex: 'dec_type',
                key: 'dec_type',
                render: (text, record) => (	
                  <div>
                     {text !== null &&getValue(dectypedata,'value','text',text)}
                  </div>
              ),
              filters: dectypedata,
              filterMultiple: false,
              onFilter: (value, record) => record.dec_type === value,
              },
              {
                title:  onChangeLanguage(locale,'Container Type',languageData),
                dataIndex: 'container_type',
                key: 'container_type',
                render: (text, record) => (	
                  <div>
                     {text !== null &&getValue(cntrtypedata,'value','text',text)}
                  </div>
              ),
              filters: cntrtypedata,
              filterMultiple: false,
              onFilter: (value, record) => record.container_type === value,
              },
              {
                title:  onChangeLanguage(locale,'No of Cargoes',languageData),
                dataIndex: 'name',
                key: 'name',
                ...this.getColumnSearchProps('name')
              },
             
              {
                title:  onChangeLanguage(locale,'EQ',languageData),
                dataIndex: 'eq',
                key: 'eq',
              },
              {
                title: onChangeLanguage(locale,'Status',languageData),
                dataIndex: 'status',
                key: 'status',
                render: (text, record) => ( 
                <span className="row d-flex justify-content-center">                             
                  <div  className = {(text === 0) ? "inactive-buttoncolor" :"active-buttoncolor" }
                  style = {{width :'150px',height :'20px',color :'white',textAlign :'center',margin:'2px'}}>
                    <a style = {{marginTop :'2px'}}>{(text === 0) ?onChangeLanguage(locale,'Inactive',languageData) :onChangeLanguage(locale,'Active',languageData)}</a>
                  </div>
                </span>
                 ),   
                 filters: [
                   {text:'Active',
                     value: 1,
                   },
                   {text:'Inactive',
                    value: 0,
                   },
                   ],
                   filterMultiple: false,
                   onFilter: (value, record) => record.status === value,
            },
              
              
            {
                title: 'Action',
                key: 'id',
               dataIndex: 'id',
                render: (id,record) => (
                    <div className="row d-flex justify-content-center" >
                         <Tooltip className = 'fontstyle' title="Edit" placement="bottom">
                            <a onClick = {()=>this.openModal(record)} style = {{color  :'blue' ,height:'25px',width:'25px',padding:'4px'}}>
                                <i className = "simple-icon-pencil"></i>
                            </a>
                         </Tooltip>
                        
                     <Popconfirm className = 'fontstyle' variant="contained" 
                     title="Are you sure to delete?"
                     style = {{
                        backgroundColor: 'rgb(79, 156, 1)',
                        color: 'white' }}
                       onConfirm={() => this.handleDelete(record.id)}
                        >
                           <Tooltip title="Delete" placement="bottom">
                     <a style = {{color  :'red' ,height:'25px',width:'25px',
                                padding:'4px',marginLeft:'12px'}}><i className = "simple-icon-trash"></i></a></Tooltip>
                        </Popconfirm>
                
                         
                      </div>
                )
            }
        ]
        return (
            <>
            <title> {onChangeLanguage(locale,'DG Module EQ Master',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <div className = "row">
                    <div className = "col-md-8">
                        <Breadcrumb heading= {onChangeLanguage(locale,'DG Module EQ Master',languageData)} match={match} />
                    </div>

                    <div className = "col-md-4">
                    <Button className = "button-width" color="primary">
                            <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
                            <a style= {{margin :'0px'}} > Upload</a>
                            <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                                className = "filepicker_customButton"
                                style = {{width : '26%',marginLeft :'-22%'}}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
                        </Button>
                        {this.renderTemplate()}
                       <Button color = "primary"  className = 'fontstyle button-width' onClick ={(event) => this.openModal()}>
                        {onChangeLanguage(locale,' Add EQ',languageData)}
                      </Button>
                    </div>
                

                </div>
             
             
              <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
           
            
            {this.renderModal()}
			
			<Table 
				dataSource={data} 
				columns={columns} 
				loading={this.state.loading}
				rowKey={record => record.id}
				rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
				onChange={this.handleTableChange}
				// rowSelection = {rowSelection}
				/>
			

        </>
        )
    }
    renderModal()
  {
    const {modalOpen,record,isEdit,isadmin} = this.state
    return (
        <Modal
          isOpen={modalOpen}
          toggle={this.closeModal}
          wrapClassName="modal-right"
          backdrop="static"
        >
          <ModalHeader toggle={()=>this.closeModal()}>
              {isEdit ? 'Update EQ' : 'Create EQ'}   
          </ModalHeader>
          <ModalBody>
            <Create   record = {record}
            isEdit = {isEdit}
            isadmin= {isadmin}
            closeModal={this.closeModal.bind(this)}/>
          </ModalBody>
         
        </Modal>
      );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale,languageData} = settings;
  return {locale, languageData};
};
  export default withRouter(
    connect(mapStateToProps, {

   })(MasterPage)
  );

