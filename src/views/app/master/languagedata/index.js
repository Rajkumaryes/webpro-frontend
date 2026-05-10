import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Button,ModalHeader,Modal,ModalBody} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Create from './create'
import { Table, Popconfirm ,Tooltip,Input } from 'antd';
import {setLanguageData} from '../../../../redux/actions';
import 'antd/dist/antd.css';
import { createNotification } from '../../../../toast';
import{languagedataService} from '../../../../redux/languagedata/saga'
import{languageService} from '../../../../redux/language/saga'
import {onChangeLanguage} from '../../../../helper'
import Loading from "react-fullscreen-loading";
import Workbook from 'react-excel-workbook'

class MasterPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
       data:[],
       language_data: [],
       isEdit:false,    
       modalOpen:false,
       record:{},

      };
    }
    componentWillMount()
    {
        this.fetchData()
        this.fetchlanguageData()
    }
    fetchlanguageData() {  

      languageService.fetchlanguageData()
        .then((res) => { 
          if(res.status)
            {
              this.setState({ 
                language_data:res.data ,    
              }) 
            }  else
            {
              this.setState({ 
                data:[]  , 
                         
              }) 
            }                 
      
      })
      .catch((error) => { 
        });   
   }
    fetchData() {  
      this.setState({
        loading : true
      })
      languagedataService.fetchlanguagedata()
        .then((res) => { 
          this.setState({   
        loading : false 
                
          }) 
          if(res.status)
            {
              var list = []
              for(var i = 0 ;i <res.data.length;i++)
              {
                var dict  = res.data[i]
                let languagedata = {};
                try {
                  if (dict.languagedata) {
                    languagedata = JSON.parse(dict.languagedata);
                  }
                } catch (e) {
                  // eslint-disable-next-line no-console
                  console.warn('Failed to parse languagedata entry', e, dict.languagedata);
                  languagedata = {};
                }
                dict.languagedata = languagedata
                list.push(dict)
              }
              this.setState({ 
                data:list  , 
                         
              }) 
              this.props.setLanguageDataAction(list)
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
        modalOpen:true
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
    languagedataService.deletelanguagedata(id)
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
    languagedataService.fileUpload(files[0])
      .then((res) => { 
        if(res.status)
        {
          if(res.data.status)   
          {   
         
            createNotification('Uploaded','success','filled')
              this.fetchData()
          }    
        }
          
    
    })
    .catch((error) => { 
      this.setState({
        loading : false
      })
      });
  }
  renderexcel()
  {
    const { language_data} = this.state;
    var item = []

    for(var i = 0;i <language_data.length;i++)
    {
      item.push(<Workbook.Column label={language_data[i].key} value={language_data[i].key}/>)
    }
    return item
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
    filterIcon: filtered => <a style = {{color:'white',position:'absolute'}}><i className = "simple-icon-magnifier"/></a>,
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
      const {data,language_data} = this.state
      var array  = []
      for(var i = 0; i < data.length;i++)
      {
        var dict = {name : data[i].name}
        for(var j = 0; j < language_data.length;j++)
        {
          dict[language_data[j].key] = data[i].languagedata[language_data[j].key]
        }
        array.push(dict)
  
      }
        const columns = [
		
              {
                title: onChangeLanguage(locale,' Name',languageData),
                dataIndex: 'name',
                key: 'name',
                ...this.getColumnSearchProps('name')
              },
              {
                title:onChangeLanguage(locale,'Language Data',languageData) ,
                children:[]
              },
            //   {
            //     title: onChangeLanguage(locale,'Status',languageData),
            //     dataIndex: 'status',
            //     key: 'status',
            //     render: (text, record) => ( 
            //     <span className="row d-flex justify-content-center">                             
            //       <div  className = {(text === 0) ? "inactive-buttoncolor" :"active-buttoncolor" }
            //       style = {{width :'150px',height :'20px',color :'white',textAlign :'center',margin:'2px'}}>
            //         <a style = {{marginTop :'2px'}}>{(text === 0) ?onChangeLanguage(locale,'Inactive',languageData) :onChangeLanguage(locale,'Active',languageData)}</a>
            //       </div>
            //     </span>
            //      ),   
            //      filters: [
            //        {text:'Active',
            //          value: 1,
            //        },
            //        {text:'Inactive',
            //         value: 0,
            //        },
            //        ],
            //        filterMultiple: false,
            //        onFilter: (value, record) => record.status === value,
            // },
            {
                title: 'Action',
                key: 'id',
               dataIndex: 'id',
                render: (id,record) => (
                    <div className="row d-flex justify-content-center">
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
            <title>Language Data</title>
            <Row>
              <Colxx xxs="12">
                <div className = "row">
                    <div className = "col-md-7">
                        <Breadcrumb heading= {onChangeLanguage(locale,'Language Data',languageData)} match={match} />
                    </div>
                     <div className = "col-md-5">
                        <Button className = "button-width" color="primary">
                            <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
                            <a style= {{margin :'0px'}} > {onChangeLanguage(locale,'Upload',languageData)} </a>
                            <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                                className = "filepicker_customButton"
                                style = {{width : '26%',marginLeft :'-22%'}}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
                        </Button>
                    <Workbook filename="language.xlsx" element={<Button  className = "button-width" color="secondary">
                          {onChangeLanguage(locale,'Download',languageData)}
                          </Button>}>
                          <Workbook.Sheet data={array} name="Sheet A">
                          <Workbook.Column label="Name" value="name"/>
                                  {this.renderexcel()}
                          </Workbook.Sheet>
                          
                    </Workbook>
                       <Button color = "primary"  className = 'fontstyle button-width' onClick ={(event) => this.openModal()}>
                       {onChangeLanguage(locale,'Add Language Data',languageData)} 
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
              >
               {columns.map(column => (
                    column.title === onChangeLanguage(locale,'Language Data',languageData) &&
                      language_data&&language_data.map((value,index) => 
                      		column['children'].push({
                          title: value.name + `  (${value.key})`,
                          dataIndex: 'languagedata',
                          render: (languagedata, record) => ( 
                              <div>
                              {(languagedata && languagedata !== null )&& 
                              languagedata[value.key]}                           
                              </div>
                          ),
                      })
                  )
                   
                ))}
        </Table>
			

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
              {isEdit ? onChangeLanguage(locale,'Update Language Data',languageData) : onChangeLanguage(locale,'Create Language Data',languageData)} 
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
  const { locale,languageData,language} = settings;
  return {locale, languageData,language};
};
  export default withRouter(
    connect(mapStateToProps, {
      setLanguageDataAction : setLanguageData,
   })(MasterPage)
  );

