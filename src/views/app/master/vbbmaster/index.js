import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button,ModalHeader,Modal,ModalBody} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Create from './create'
import { Table, Popconfirm ,Tooltip } from 'antd';
import 'antd/dist/antd.css';
import { createNotification } from '../../../../toast';
import {onChangeLanguage} from '../../../../helper'
import{VbbparameterService} from '../../../../redux/vbb/saga'
import {getValue} from '../../../../helper'
import Workbook from 'react-excel-workbook'
import { INDEX_PAGE_SIZE_OPTIONS } from '../../../../constants/defaultValues';


class MasterPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
       data:[],
       region_data: [],
       team_data:[],
       isEdit:false,
       page:1,
       pageSize:25,
       modalOpen:false,
       record:{},
       searchText: '',
       overall_percentage:'',
       anchor_percentage:'',
       status:'',
       l6A:'',
       l6B:''
      };
    }
    componentWillMount()
    {
        this.fetchData()
        // this.fetchregion()
    }
  
   
    fetchData() {  
      this.setState({
        loading : true
      })
      VbbparameterService.fetchVBB()
        .then((res) => { 
          this.setState({   
        loading : false 
                
          }) 
        //   console.log("VBB Data",res.data)
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

    handleSubmit()
    {
        const {overall_percentage,data} = this.state;
        let filterstatus = (data).filter(item => item.status === 1);
        let active_count = filterstatus.length;
        let each_anchor = (overall_percentage / active_count).toFixed(3);
        this.setState({anchor_percentage:each_anchor})
        console.log("active_count",active_count)
        console.log("overall_percentage",overall_percentage)
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
    const {data,region_data} = this.state
    var array = data.map(record=> {
          return {
            'Region' :record.region !== null ? getValue(region_data,'value','text',record.region):'' ,
            'Name' : record.name,
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
          <Workbook.Column label="Region" value="Region"/>
          <Workbook.Column label="Name" value="Name"/>
          <Workbook.Column label="Eq" value="EQ"/>
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
  paginationOptions = {
    showSizeChanger: true,
    showQuickJumper: true,
    onShowSizeChange: (_, pageSize) => {
      this.setState({
        pageSize : pageSize
      })
      
    },
    onChange: (page,pageSize) => {
      const {startdate,enddate} = this.state
     this.fetchPagination(page,pageSize,startdate,enddate,false)
    },
    pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
    // total: this.state.total  ,
    showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total}`,
  };
    render()
    {
      const {locale,languageData,match} = this.props
        const {data,region_data,team_data,page,pageSize,overall_percentage,anchor_percentage,status,l6A,l6B} = this.state
        const columns = [
            //  {
            //     title:  onChangeLanguage(locale,'Region Name',languageData),
            //     dataIndex: 'region',
            //     key: 'region',
            //     render: (text, record) => (	
            //       <div>
            //          {text !== null &&getValue(region_data,'value','text',text)}
            //       </div>
            //   ),
            //   filters: region_data,
            //   filterMultiple: false,
            //   onFilter: (value, record) => record.region === value,
            //   },
            {
                title: onChangeLanguage(locale,'VBB Name',languageData),
                dataIndex: 'vbb_name',
                key: 'vbb_name',
                width: 300,
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px'}}>
                   {text}    
                  </div>),           
              },
              {
                title: onChangeLanguage(locale,'Anchors',languageData),
                dataIndex: 'vbb_anchor',
                key: 'vbb_anchor',
                width: 300,
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px'}}>
                   {text}    
                  </div>),           
              },
              {
                title: onChangeLanguage(locale,'l6A',languageData),
                dataIndex: 'l6A',
                key: 'l6A',
                width: 300,
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px'}}>
                   {text}    
                  </div>),           
              },
              {
                title: onChangeLanguage(locale,'l6B',languageData),
                dataIndex: 'l6B',
                key: 'l6B',
                width: 300,
                render: (text, record,index) => ( 
                  <div  style = {{padding:'2px'}}>
                   {text}    
                  </div>),           
              },
            //   {
            //     title: onChangeLanguage(locale, 'L6A', languageData),
            //     dataIndex: 'L6A',
            //     key: 'L6A',
            //     width: 100,
            //     render: (text, record, index) => (
            //         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5px' }}>
                            
            //                 <Input
            //                     className={"fontstyle"}
            //                     value={record.status == 1 ? anchor_percentage : ''}
            //                     type="text"
            //                     style={{ width: '100px' }}
            //                     disabled
            //                 />
                       
            //         </div>
            //     ),
            // },
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
                title: onChangeLanguage(locale,'Action',languageData),
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
                           {/* <Tooltip title="Delete" placement="bottom">
                     <a style = {{color  :'red' ,height:'25px',width:'25px',
                                padding:'4px',marginLeft:'12px'}}><i className = "simple-icon-trash"></i></a></Tooltip> */}
                        </Popconfirm>
                
                         
                      </div>
                )
            }
        ]
        const pagination = {
            ...this.paginationOptions,
            total: this.state.total,
            current: this.state.page,
            pageSize: this.state.pageSize,
            };
        return (
            <>
            <title> {onChangeLanguage(locale,'VBB Master',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <div className = "row">
                    <div className = "col-md-9">
                        <Breadcrumb heading= {onChangeLanguage(locale,'VBB Master',languageData)} match={match} />
                    </div>

                  
                    {/* <div className="col-md-3">
                        <div className="row">
                            <div className="col-md-6 space-margin">
                                <Label className="fontstyle normal-font" >
                                    {onChangeLanguage(locale, 'Overall Percentage', languageData)}
                                </Label>
                                <Input
                                    className=""
                                    placeholder=''
                                    value={overall_percentage}
                                    onChange={(e) => this.setState({ overall_percentage: e.target.value })}
                                    style={{ border: '1px solid #121C50', color: '#121C50', width: '100%' }}

                                />
                            </div>
                            <div className="col-md-6 space-margin d-flex align-items-end">
                                <Button className="button-width" color="secondary" onClick={() => this.handleSubmit()}>
                                    <i className="simple-icon-cloud-download" style={{ marginRight: '5px' }} />
                                    {onChangeLanguage(locale, 'Submit', languageData)}
                                </Button>
                            </div>
                        </div>
                    </div> */}



                

                </div>
             
             
              <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
           
            
            {this.renderModal()}
			
			<Table 
				dataSource={data} 
				columns={columns} 
                pagination = {pagination}
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
    const {modalOpen,record,isEdit,isadmin} = this.state
    return (
        <Modal
          isOpen={modalOpen}
          toggle={this.closeModal}
          wrapClassName="modal-right"
          backdrop="static"
        >
          <ModalHeader toggle={()=>this.closeModal()}>
              {isEdit ? onChangeLanguage(locale,'Update EQ' , languageData) : onChangeLanguage(locale,'Create EQ' , languageData) }   
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

