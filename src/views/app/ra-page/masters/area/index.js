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
import{RAareaService} from '../../../../../redux/ra/area/saga';
import{regionsService} from '../../../../../redux/ra/region/saga'
import {getValue} from '../../../../../helper'
import Workbook from 'react-excel-workbook'
import moment from 'moment';


class MasterPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
       data:[],
       region_data: [],
       isEdit:false,
       modalOpen:false,
       record:{},

      };
    }
    componentWillMount()
    {
        this.fetchData()
        this.fetchregion()
    }

    fetchregion() {
      regionsService.fetchapi()
      .then((res) => {
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
               var regionlist = filterstatus.map(function(cusmaidid) {
                    return  {text : cusmaidid.name ,value : cusmaidid.id.toString()};
                 });  
                  this.setState({
                  region_data :  regionlist,
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
      RAareaService.fetchapi()
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
    RAareaService.deleteapi(id)
    .then((res) => {
      if(res){
        createNotification('Deleted','success','filled')
        this.fetchData()
      }			
    })
    .catch((error) => { });
  }
  onChangeFileUpload(files)
	{
    this.setState({
      loading : true
    })
    RAareaService.fileUpload(files[0])
      .then((res) => { 
        if(res.status)
        {this.setState({
          loading : false
        })
          if(res.data.status)   
          {   
         
            createNotification('Uploaded','success','filled')
              this.fetchData()
            } else{
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
  renderTemplate()
  {
    const {locale,languageData} = this.props
    const {data,region_data} = this.state
    var array = data.map(record=> {
                return {
                  'Area' : record.name,
                  'Region' : record.region !== null ?getValue(region_data,'value','text',record.region) :'',
                  'Range1 Start Time' : record.start_time ,
                  'Range1 End Time' : record.end_time,
                  'Range1' : record.range1 ,
                  'Range1 Current day' : record.range1_currentday !== null ? record.range1_currentday : '' ,
                  'Range2 Start Time' : record.start_time1 ,
                  'Range2 End Time' : record.end_time1,
                  'Range2' : record.range2 ,
                 
                  
              };
            })
    return(
      <Workbook filename="area.xlsx" element={<Button  className = "button-width" color="secondary">
      {onChangeLanguage(locale,'Download',languageData)}
      </Button>}>
      <Workbook.Sheet data={array} name="Sheet A">
      <Workbook.Column label="Region" value="Region"/>
      <Workbook.Column label="Area" value="Area"/>
      <Workbook.Column label="Range1 Start Time" value="Range1 Start Time"/>
      <Workbook.Column label="Range1 End Time" value="Range1 End Time"/>
      <Workbook.Column label="Range1" value="Range1"/>
      <Workbook.Column label="Range1 Current day" value="Range1 Current day"/>
      <Workbook.Column label="Range2 Start Time" value="Range2 Start Time"/>
      <Workbook.Column label="Range2 End Time" value="Range2 End Time"/>
      <Workbook.Column label="Range2" value="Range2"/>
      
      </Workbook.Sheet>
      
        </Workbook>
    )
  }
  getTime(time)
  {
    var t_time= ''
    
    if(time !== null && time && time !== '')
    {
      var current_d = moment(new Date()).format('MM/DD/YYYY')
      var date_time = current_d + " " + time
      t_time =   moment(date_time).format('HH:mm:ss a')
    
    }
    console.log('lll',t_time)
    return t_time
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
        const {data,region_data} = this.state
        const columns = [
             {
                title:  onChangeLanguage(locale,'Region Name',languageData),
                dataIndex: 'region',
                key: 'region',
                render: (text, record) => (	
                  <div>
                     {text !== null &&getValue(region_data,'value','text',text)}
                  </div>
              ),
              filters: region_data,
              filterMultiple: false,
              onFilter: (value, record) => record.region === value,
              },
              {
                title:  onChangeLanguage(locale,'Area',languageData),
                dataIndex: 'name',
                key: 'name',
                ...this.getColumnSearchProps('name')

              },
              {
                title:  onChangeLanguage(locale,'Range1 Start Time',languageData),
                dataIndex: 'start_time',
                key: 'start_time',
                render: (text, record) => (	
                  <div>
                    {text}
                  </div>
                  ),

              },
              {
                title:  onChangeLanguage(locale,'Range1 End Time',languageData),
                dataIndex: 'end_time',
                key: 'end_time',
                render: (text, record) => (	
                  <div>
                     {text}
                  </div>
                  ),

              },
              {
                title:  onChangeLanguage(locale,'Range1',languageData),
                dataIndex: 'range1',
                key: 'range1',
                render: (text, record) => (	
                  <div>
                    {text}
                  </div>
                  ),

              },
              {
                title:  onChangeLanguage(locale,'Range1 Current day',languageData),
                dataIndex: 'range1_currentday',
                key: 'range1_currentday',
                render: (text, record) => (	
                  <div>
                    {text}
                  </div>
                  ),

              },
              
              {
                title:  onChangeLanguage(locale,'Range2 Start Time',languageData),
                dataIndex: 'start_time1',
                key: 'start_time1',
                render: (text, record) => (	
                  <div>
                    {text}
                  </div>
                  ),
                  

              },
              {
                title:  onChangeLanguage(locale,'Range2 End Time',languageData),
                dataIndex: 'end_time1',
                key: 'end_time1',
                render: (text, record) => (	
                  <div>
                     {text}
                     
                  </div>
                  ),
                  

              },
              {
                title:  onChangeLanguage(locale,'Range2',languageData),
                dataIndex: 'range2',
                key: 'range2',
                render: (text, record) => (	
                  <div>
                     {text}
                     
                  </div>
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
            <title> {onChangeLanguage(locale,'Area',languageData)}</title>
            <Row>
              <Colxx xxs="12">
              <div className = "row">
                    <div className = "col-md-8">
                        <Breadcrumb heading= {onChangeLanguage(locale,'Area',languageData)} match={match} />
                    </div>
                     <div className = "col-md-4">
                        <Button className = "button-width" color="primary">
                            <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
                            <a style= {{margin :'0px'}} > {onChangeLanguage(locale,'Upload',languageData)} </a>
                            <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                                className = "filepicker_customButton"
                                style = {{width : '26%',marginLeft :'-22%'}}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
                        </Button>
                        {this.renderTemplate()}
                    
                      <Button color = "primary"  className = 'fontstyle button-width' onClick ={(event) => this.openModal()}>
                        {onChangeLanguage(locale,' Add Area',languageData)}
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
              {isEdit ? 'Update Area' : 'Create Area'}   
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

