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
import {onChangeLanguage} from '../../../../helper';
import{sourceerrorService} from '../../../../redux/projectmasters/sourceerror/saga';
import Workbook from 'react-excel-workbook'

class MasterPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
       data:[],
       isEdit:false,
       modalOpen:false,
       record:{},

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
      sourceerrorService.fetchsourceerror()
        .then((res) => { 
          this.setState({   
        loading : false 
                
          }) 
          if(res.status)
            {
              this.setState({ 
                data:res.data  , 
                         
              }) 
            }  else
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
    sourceerrorService.deletesourceerror(id)
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
    const {data} = this.state
    var array = data.map(record=> {
          return {
            'name' : record.name,
        };
      })
      return(
        
        <Workbook filename="Source.xlsx" element={
          <Button className = "button-width" color="secondary"  style={{width:'150px'}}
          >{ onChangeLanguage(locale,'Download',languageData)}  
          </Button>
		      }>
          <Workbook.Sheet data={array} name="Sheet A">
          <Workbook.Column label="Source" value="name"/>
          </Workbook.Sheet> 
        </Workbook>
     

      );
  }
  onChangeFileUpload(files)
	{
    this.setState({
      loading : true
    })
    sourceerrorService.fileUpload(files[0])
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
    render()
    {
      const {locale,languageData,match} = this.props
        const {data} = this.state
        const columns = [
             {
                title:  onChangeLanguage(locale,'Name',languageData),
                dataIndex: 'name',
                key: 'name',
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
            <title> {onChangeLanguage(locale,'Source',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <div className = "row">
                    <div className = "col-md-7">
                        <Breadcrumb heading= {onChangeLanguage(locale,'Source',languageData)} match={match} />
                    </div>
                    <div className = "col-md-5">
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
                        {onChangeLanguage(locale,' Add Source',languageData)}
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
              {isEdit ? 'Update Source' : 'Create Source'}   
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

const mapStateToProps = ({  authUser }) => {
   
  
    const { currentUser } = authUser;
    return {
      currentUser
    };
  };
  export default withRouter(
    connect(mapStateToProps, {

   })(MasterPage)
  );

