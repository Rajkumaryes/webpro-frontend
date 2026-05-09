import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Button,ModalHeader,Modal,ModalBody} from 'reactstrap';
import { Colxx, Separator } from '../../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../../containers/navs/Breadcrumb';
import Create from './create'
import { Table, Popconfirm ,Tooltip,Input } from 'antd';
import 'antd/dist/antd.css';
import { createNotification } from '../../../../../toast';
import {onChangeLanguage} from '../../../../../helper';
import{roleService} from '../../../../../redux/role/saga'
import{categoryService} from '../../../../../redux/productivty/category/saga'
import{typeService} from '../../../../../redux/productivty/type/saga'
import {getValue} from '../../../../../helper'
import Workbook from 'react-excel-workbook'



class MasterPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
       data:[],
       menu_data: [],
       type_data:[],
       isEdit:false,
       modalOpen:false,
       record:{},
       searchText: '',
      };
    }
    componentWillMount()
    {
        this.fetchData()
        this.fetchmenu()
        this.fetchtype()
    }
    fetchtype() {
      typeService.fetchapi()
      .then((res) => {
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var categorylist = filterstatus.map(function(cusmaidid) {
                    return  {text : cusmaidid.name ,value : cusmaidid.id.toString()};
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
    fetchmenu() {
      roleService.fetchrolepermissionData()
      .then((res) => {
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var menulist = filterstatus.map(function(cusmaidid) {
                    return  {text : cusmaidid.name ,value : cusmaidid.name};
                 });  
                  this.setState({
                  menu_data :  menulist,
                  })
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
   }  
    fetchData() {  
      this.setState({
        loading : true
      })
      categoryService.fetchapi()
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
    categoryService.deleteapi(id)
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
    const {data,menu_data,type_data} = this.state
    var array = data.map(record=> {
          return {
            'Menu' :record.menu !== null ? getValue(menu_data,'value','text',record.menu):'' ,
            'Name' : record.name,
            'Type' :record.type !== null ? getValue(type_data,'value','text',record.type):'' ,
        };
      })
      return(
        
        <Workbook filename="Category.xlsx" element={
          <Button className = "button-width" color="secondary"  
          >{ onChangeLanguage(locale,'Download',languageData)}  
          </Button>
		      }>
          <Workbook.Sheet data={array} name="Sheet A">
          <Workbook.Column label="Menu" value="Menu"/>
          <Workbook.Column label="Name" value="Name"/>
          <Workbook.Column label="Type" value="type"/>
          </Workbook.Sheet> 
        </Workbook>
     

      );
  }
  onChangeFileUpload(files)
	{
    this.setState({
      loading : true
    })
    categoryService.fileUpload(files[0])
      .then((res) => { 
        if(res.status)
        { this.setState({
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
    filterIcon: filtered => <a style = {{color:'white',top:'5px',position:'absolute',right: '12px'}}><i className = "simple-icon-magnifier"/></a>,
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
        const {data,menu_data,type_data} = this.state
        const columns = [
             {
                title:  onChangeLanguage(locale,'Menu',languageData),
                dataIndex: 'menu',
                key: 'menu',
                render: (text, record) => (	
                  <div>
                     {text !== null &&getValue(menu_data,'value','text',text)}
                  </div>
              ),
              filters: menu_data,
                filterMultiple: false,
                onFilter: (value, record) => record.menu === value,
              },
              {
                title:  onChangeLanguage(locale,'Name',languageData),
                dataIndex: 'name',
                key: 'name',
                ...this.getColumnSearchProps('name')
              },
              {
                title:  onChangeLanguage(locale,'Type',languageData),
                dataIndex: 'type',
                key: 'type',
                render: (text, record) => (	
                  <div>
                     {text !== null &&getValue(type_data,'value','text',text)}
                  </div>
              ),
              filters: type_data,
                filterMultiple: false,
                onFilter: (value, record) => record.type === value,
              },
              {
                title:  onChangeLanguage(locale,'Time Limit',languageData),
                dataIndex: 'time_limit',
                key: 'time_limit',
                render: (text, record) => (	
                  <div>
                     {text}
                  </div>
              )
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
            <title> {onChangeLanguage(locale,'Category',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <div className = "row">
                    <div className = "col-md-8">
                        <Breadcrumb heading= {onChangeLanguage(locale,'Category',languageData)} match={match} />
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
                        {onChangeLanguage(locale,' Add Category',languageData)}
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
              {isEdit ? 'Update Category' : 'Create Category'}   
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

