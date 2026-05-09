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
import {onChangeLanguage,getValue} from '../../../../helper'
import{teamsService} from '../../../../redux/projectmasters/team/saga'
import{areaService} from '../../../../redux/projectmasters/area/saga'
import{regionService} from '../../../../redux/projectmasters/region/saga'

class MasterPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
       data:[],
       isEdit:false,
       modalOpen:false,
       record:{},
       region_data:[],
       area_data:[]
      };
    }
    componentWillMount()
    {
        this.fetchData()
        this.fetchregion()
        this.fetcharea()
    }
    fetchData() {  
      this.setState({
        loading : true
      })
      teamsService.fetchteams()
        .then((res) => { 
          this.setState({   
        loading : false 
                
          }) 
          if(res.status)
            {
              this.setState({ 
                data:res.data  , 
                         
              }) 
            }   else
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
   fetchregion() {
    regionService.fetchregion()
    .then((res) => {
       if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
             var regionlist = filterstatus.map(function(cusmaidid) {
                  return  {text : cusmaidid.region_name ,value : cusmaidid.id};
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
 fetcharea() {
  areaService.fetcharea()
  .then((res) => {
     if(res.status)   { 
        let filterstatus = (res.data).filter(item => item.status === 1)
           var arealist = filterstatus.map(function(cusmaidid) {
                return  {text : cusmaidid.area_name ,value : cusmaidid.id};
             });  
              this.setState({
              area_data :  arealist,
              })
           }
           else{
           this.setState({loading:false})}
           })
           .catch((error) => { }); 
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
    teamsService.deleteteams(id)
    .then((res) => {
      if(res){
        createNotification('Deleted','success','filled')
        this.fetchData()
      }			
    })
    .catch((error) => { });
  }
    render()
    {
      const {locale,languageData,match} = this.props
        const {data,area_data,region_data} = this.state
        const columns = [
             {
                title:  onChangeLanguage(locale,'Region Name',languageData),
                dataIndex: 'region_id',
                key: 'region_id',
                render: (text, record) => (	
                  <div>
                     {text !== null &&getValue(region_data,'value','text',parseInt(text))}
                  </div>
              ),
              },
              {
                title:  onChangeLanguage(locale,'Area Name',languageData),
                dataIndex: 'area_id',
                key: 'area_id',
                render: (text, record) => (	
                  <div>
                     {text !== null &&getValue(area_data,'value','text',parseInt(text))}
                  </div>
              ),
              },
              {
                title:  onChangeLanguage(locale,'Team',languageData),
                dataIndex: 'team_name',
                key: 'team_name',
              },
              {
                title:  onChangeLanguage(locale,'Country Code',languageData),
                dataIndex: 'country_code',
                key: 'country_code',
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
            <title> {onChangeLanguage(locale,'Teams',languageData)}</title>
            <Row>
              <Colxx xxs="12">
                <div className = "row">
                    <div className = "col-md-10">
                        <Breadcrumb heading= {onChangeLanguage(locale,'Teams',languageData)} match={match} />
                    </div>
                    <div className = "col-md-2">
                       <Button color = "primary"  className = 'fontstyle button-width' onClick ={(event) => this.openModal()}>
                        {onChangeLanguage(locale,' Add Teams',languageData)}
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
    const {modalOpen,record,isEdit} = this.state
    return (
        <Modal
          isOpen={modalOpen}
          toggle={this.closeModal}
          wrapClassName="modal-right"
          backdrop="static"
        >
          <ModalHeader toggle={()=>this.closeModal()}>
              {isEdit ? 'Update Teams' : 'Create Teams'}   
          </ModalHeader>
          <ModalBody>
            <Create   record = {record}
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
  export default withRouter(
    connect(mapStateToProps, {

   })(MasterPage)
  );

