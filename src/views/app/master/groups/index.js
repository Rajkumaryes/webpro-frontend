import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Label,Button,ModalHeader,Modal,ModalBody} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Create from './create'
import {  Popconfirm ,Tooltip } from 'antd';
import 'antd/dist/antd.css';
import {onChangeLanguage} from '../../../../helper'
import Pagination from '../../../../containers/pages/Paginationcopy';
import { createNotification } from '../../../../toast';
import{userService} from '../../../../redux/users/saga'
import{groupService} from '../../../../redux/group/saga'
import Loading from "react-fullscreen-loading";
import {getValue} from '../../../../helper'

class MasterPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
       data:[],
       isEdit:false,
       user_data:[],
       paginationdata:[],
       usersearch:'',
       currentPage : 1,
       totalPage:0,
       user_datasearch:[],
       modalOpen:false,
       record:{},

      };
    }
    componentWillMount()
    {
        this.fetchData()
        this.fetchgroupData()
    }
    fetchData() {  
      this.setState({
        loading : true
      })
      userService.fetchuserData()
        .then((res) => { 
          this.setState({   
        loading : false 
                
          }) 
          if(res.status)
            {
              this.setState({ 
                user_data:res.data  , 
                         
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
   fetchgroupData() {  
    this.setState({
      loading : true,
      data:[]
    })
    groupService.fetchgroupData()
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
        this.fetchgroupData()
      }
     
    }
    onClickviewgroup(id)
    {
      this.props.history.push('/app/generalmaster/singlegroup/'+id)
    }
  handleDelete = id => {
    groupService.deletegroup(id)
    .then((res) => {
      if(res){
        createNotification('Deleted','success','filled')
        this.fetchgroupData()
      }			
    })
    .catch((error) => { });
  }
  getValue = (listdata,key1,key2,keyvalue)=>
{
 
  let name = ''
  for (let i = 0; i < listdata.length; i++) {
    if(listdata[i][key1] === keyvalue){
      name = listdata[i][key2]
    }
  }
  return name
}
    render()
    {
        const {locale,languageData,match} = this.props
        const {data,user_data,loading} = this.state
        return (
            <>
            <title>{onChangeLanguage(locale,'Groups',languageData)}</title>
            {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <Row>
              <Colxx xxs="12">
                <div className = "row">
                    <div className = "col-md-10">
                        <Breadcrumb heading={onChangeLanguage(locale,'Groups',languageData)} match={match} />
                    </div>
                    <div className = "col-md-2">
                       <Button color = "primary"  className = 'fontstyle button-width' onClick ={(event) => this.openModal()}>
                       {onChangeLanguage(locale,'Add Group',languageData)} 
                      </Button>
                    </div>

                </div>
             
             
              <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div className = "row">
        {data &&data.map((value,index) => 
            <div className = "col-md-3">
              <div className = "publishuser-card-component">
                <div className = "publish-title">
                <Row>
                <Colxx xxs="9">
                  {value.name}
                  </Colxx>
                  <Colxx xxs="3">
                  <Tooltip className = 'fontstyle' title={onChangeLanguage(locale,'Edit',languageData)} placement="bottom">
                      <a onClick = {()=>this.openModal(value)} style = {{color  :'white', right :'50px',position:'absolute'}}>
                          <i className = "simple-icon-pencil"></i>
                      </a>
                    </Tooltip>
                  <Tooltip title="View" placement="bottom">
                            <a style = {{color  :'white', right :'33px',position:'absolute'}}
                             onClick = {()=>this.onClickviewgroup(value.id)}>  
                            <i className="simple-icon-eye"   /></a>
                   </Tooltip>
                    <Popconfirm className = 'fontstyle' variant="contained" 
                          title={onChangeLanguage(locale,'"Are you sure to delete?"',languageData)}
                          style = {{
                            backgroundColor: 'rgb(79, 156, 1)',
                            color: 'white' }}
                            onConfirm={() => this.handleDelete(value.id)}
                            >
                            <Tooltip title={onChangeLanguage(locale,'Delete',languageData)} placement="bottom">
                            <a style = {{color  :'white', right :'10px',position:'absolute'}}>  
                            <i className="simple-icon-close"   /></a></Tooltip>
                    </Popconfirm>
                    </Colxx>
                </Row>
                </div>
                <div style = {{padding :'10px'}}>
                
                {value.userarray && value.userarray.length <= 2 ? 
                <Row> {
                  (value.userarray && value.userarray !== null)  &&value.userarray.map((item,index) => 
                  
                    <Colxx xxs="2">
                      <Tooltip className = 'fontstyle' title={getValue(user_data,'id','name',item)} placement="bottom">
                      <p data-letters={this.getValue(user_data,'id','name',item).charAt(0)}/>
                    </Tooltip>
                
                    </Colxx>
                )}
                  </Row> :
                    
                        <Row>
                            <Colxx xxs="2">
                            <Tooltip className = 'fontstyle' title={getValue(user_data,'id','name',value.userarray[0])} placement="bottom">
                                <p data-letters={getValue(user_data,'id','name',value.userarray[0]).charAt(0)}/>
                              </Tooltip>
                              
                              </Colxx>
                              <Colxx xxs="2">
                              <Tooltip className = 'fontstyle' title={getValue(user_data,'id','name',value.userarray[1])} placement="bottom">
                                <p data-letters={getValue(user_data,'id','name',value.userarray[1]).charAt(0)}/>
                              </Tooltip>
                              </Colxx>
                            <Colxx xxs="8">
                                <Label style = {{marginTop:'10px'}}>{value.userarray.length - 2}+  {'More'}</Label>
                            </Colxx>
                        </Row>
                }
                
              </div>
              </div>
            </div>
              
            )}
            
        </div>
          {this.renderModal()}
          {this.state.paginationdata.length > 0 && 
                <Pagination
                currentPage={this.state.currentPage}
                totalPage={this.state.totalPage}
                onChangePage={(i) =>this.onChangePage(i)}
              />
              }

        </>
        )
    }
    renderModal()
  {
    const {modalOpen,record,isEdit,isadmin} = this.state
    const {locale,languageData} = this.props
    return (
        <Modal
          isOpen={modalOpen}
          toggle={this.closeModal}
          wrapClassName="modal-right"
          backdrop="static"
        >
          <ModalHeader toggle={()=>this.closeModal()}>
              {isEdit ? onChangeLanguage(locale,'Update Group',languageData) :onChangeLanguage(locale,'Create Group',languageData)}   
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
export default injectIntl(
  connect(mapStateToProps, {

  })(MasterPage)
);

