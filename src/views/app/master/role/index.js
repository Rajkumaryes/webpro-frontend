import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Label,Button,ModalHeader,Modal,ModalBody} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Create from './create'
import { Table, Popconfirm,Input ,Tooltip,Space } from 'antd';
import { adminRoot } from "../../../../constants/defaultValues";
import 'antd/dist/antd.css';
import { createNotification } from '../../../../toast';
import {onChangeLanguage} from '../../../../helper'
import{roleService} from '../../../../redux/role/saga'

class MasterPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
       data:[],
       isEdit:false,
       modalOpen:false,
       record:{},
       searchText: '',
       searchedColumn: '',

      };
    }
    componentWillMount()
    {
        this.fetchData()
    }
    fetchData() {  
      this.setState({
        loading : true
      })
      roleService.fetchroleData()
        .then((res) => { 
          this.setState({   
        loading : false 
                
          }) 
          if(res.status)
            {
              this.setState({ 
                data:res.data  , 
                         
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
    roleService.deleterole(id)
    .then((res) => {
      if(res){
        createNotification('Deleted','success','filled')
        this.fetchData()
      }			
    })
    .catch((error) => { });
  }
  onclickPermssion(id)
	{
		this.props.history.push(`${adminRoot}/generalmaster/rolepermission/${id}`);
		
	}
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button color="secondary"
            outline
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<i className = "simple-icon-magnifier"></i>}
            className="mb-2"
            size="xs"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button outline color="primary" onClick={() => this.handleReset(clearFilters)} size="xs" className="mb-2" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <a style = {{color:filtered ? '#EF6432' : 'white',top:'7px',position:'absolute'}}><i className = "simple-icon-magnifier"/></a>,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
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
        const {data} = this.state
        const columns = [
		
            {
                title:  onChangeLanguage(locale,'Role Name',languageData),
                dataIndex: 'name',
                key: 'name',
                ...this.getColumnSearchProps('name')
              },
              {
                title:  onChangeLanguage(locale,'Color',languageData),
                dataIndex: 'color',
                key: 'color',
                render: (color, record) => ( 
                  <span className="role-color" style = {{backgroundColor:color !== null ? color:''}}>                             
                   
                  </span>
                   ), 
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
                     {
                       text:onChangeLanguage(locale,'Active',languageData),
                       value: 1,
                     },
                     {text:onChangeLanguage(locale,'Inactive',languageData),
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
                         <Tooltip className = 'fontstyle' title={onChangeLanguage(locale,'Edit',languageData)} placement="bottom">
                            <a onClick = {()=>this.openModal(record)} style = {{color  :'blue' ,height:'25px',width:'25px',padding:'4px'}}>
                                <i className = "simple-icon-pencil"></i>
                            </a>
                         </Tooltip>
                        {/* <Popconfirm className = 'fontstyle' variant="contained" 
                        title={onChangeLanguage(locale,'Are you sure to delete?',languageData)}
                        style = {{backgroundColor: 'rgb(79, 156, 1)',color: 'white' }}
                            onConfirm={() => this.handleDelete(record.id)}
                          >
                           <Tooltip title={onChangeLanguage(locale,'Delete',languageData)} placement="bottom">
                            <a style = {{color  :'red' ,height:'25px',width:'25px',
                                        padding:'4px',marginLeft:'12px'}}><i className = "simple-icon-trash"></i></a></Tooltip>
                                </Popconfirm> */}
                          <Tooltip className = 'fontstyle' title={onChangeLanguage(locale,'Set Permission',languageData)} placement="bottom">
                            <a  style = {{color  :'#00677f' ,height:'25px',width:'25px',
                                        padding:'4px',marginLeft:'12px'}} onClick={() => this.onclickPermssion(record.id)}>
                              <i className = "iconsminds-lock-2"></i>
                                        </a>
                          </Tooltip>
                      </div>
                )
            }
        ]
        return (
            <>
            <title> {onChangeLanguage(locale,'Role Management',languageData)} </title>
            <Row>
              <Colxx xxs="12">
                <div className = "row">
                    <div className = "col-md-10">
                        <Breadcrumb heading={onChangeLanguage(locale,'Role Management',languageData)} match={match} />
                    </div>
                    <div className = "col-md-2">
                       <Button color = "primary"  className = 'fontstyle button-width' onClick ={(event) => this.openModal()}>
                       {onChangeLanguage(locale,'Add Role',languageData)} 
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
    const {locale,languageData} = this.props
    const {modalOpen,record,isEdit} = this.state
    return (
        <Modal
          isOpen={modalOpen}
          toggle={this.closeModal}
          wrapClassName="modal-right"
          backdrop="static"
        >
          <ModalHeader toggle={()=>this.closeModal()}>
              {isEdit ?  onChangeLanguage(locale,'Update Role',languageData)  : onChangeLanguage(locale,'Create Role',languageData)}   
          </ModalHeader>
          <ModalBody>
            <Create  
             record = {record}
            isEdit = {isEdit}
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
  export default injectIntl(
    connect(mapStateToProps, {
  
    })(MasterPage)
  );
