import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Label,Input,Button,ModalHeader,Modal,ModalBody} from 'reactstrap';
import {imageURL} from '../../../../constants/defaultValues';
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
import BackIcon from '../../../../assets/img/app_image/left-arrow.png'

class MasterPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
       data:[],
       isEdit:false,
       user_data:[],
       modalOpen:false,
       record:{},
       currentPage : 1,

      };
    }
    componentWillMount()
    {
        const { pathname } = this.props.location;
        const path = pathname.substring(pathname.lastIndexOf('/') + 1)
          this.setState({
              id : parseInt(path)
          })
        this.fetchData()
        this.fetchgroupData(parseInt(path))
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
            }            
      
      })
      .catch((error) => { 
        this.setState({
          loading : false
        })
        });   
   }
   fetchgroupData(id) {  
    this.setState({
      loading : true,
    })
    groupService.fetchIndividualgroupData(id)
      .then((res) => { 
        this.setState({   
      loading : false 
              
        }) 
        if(res.status)
          {
            this.setState({ 
              record:res.data  ,  
              data: res.data.userarray  ,   
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
        this.fetchgroupData(this.state.id)
      }
     
    }
    onBack()
    {
    this.props.history.push('/app/generalmaster/groups')
    }
    updateAPI(ids)
    {
        const {id,record,data } = this.state
    
      const {name ,status} = record
      const userarray = data.filter(item => parseInt(item) !== ids) 
      if(name !== "" && userarray.length > 0)
      {
        this.setState({
          loading : true
        })
        groupService.updategroup(id,name,userarray,status)
        .then((res) => { 
          this.setState({   
            loading : false     
          }) 
          if(res.status)
            {
              createNotification('Deleted','success','filled')
              this.closeModal(true)
            }            
      
        })
        .catch((error) => { 
            this.setState({
            loading : false
            })
        });
      }
     
    }
    render()
    {
        const {locale,languageData,match} = this.props
        const {data,user_data,record,loading,currentPage} = this.state
        let count = data.length /20
        const totalPage = Math.ceil(count) 
        var groupdata = [],currentPge =  currentPage -1 
    
        for(var i = currentPge*20; (i< (currentPge +1)*20 && i < data.length);i++)
        {
          groupdata.push(data[i])
        }
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
                    <img src={BackIcon} alt="thumbnail"  
                    style = {{width :'25px',height:'25px',cursor :'pointer',marginTop :'-9px',marginRight:'10px'}}
                    onClick={()=>this.onBack()}/>
                        <Breadcrumb heading={record.name ? record.name :onChangeLanguage(locale,'Groups Members',languageData)} match={match} />
                    </div>
                    <div className = "col-md-2">
                       <Button color = "primary"  className = 'fontstyle button-width' onClick ={(event) => this.openModal(record)}>
                       {onChangeLanguage(locale,'Edit Group',languageData)} 
                      </Button>
                    </div>

                </div>
             
             
              <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <Row>
            {groupdata &&groupdata.map((value,index) =>
                <Colxx sm="6" lg="4" xl="3" className="mb-3" key={index}>
                    <div className = "publishuser-card-component">
                       
                        <div style = {{padding :'5px'}}>
                          <Row>
                            <Colxx xxs="3" >
                            {(getValue(user_data,'id','profile_image_path',value) !== '' && getValue(user_data,'id','profile_image_path',value) !== null)? 
                                <img alt="Profile" src={imageURL+getValue(user_data,'id','profile_image_path',value)} style = {{height:'40px',width:'40px',borderRadius:'20px'}}  />:
                                <p data-letters={getValue(user_data,'id','name',value).charAt(0)}/>
                            }
                           
                            
                            </Colxx>
                            <Colxx xxs="7" >
                              <div className = "fontstyle"  style = {{margin :'5px 0px',fontSize:'16px'}}>
                                   <a>{getValue(user_data,'id','name',value)} {getValue(user_data,'id','lastname',value)}</a>
                              </div>
                           
                            </Colxx>
                            <Colxx xxs="1" >
                                 <Popconfirm className = 'fontstyle' variant="contained" 
                                title={"Are you sure to delete?"}
                                style = {{
                                    backgroundColor: 'rgb(79, 156, 1)',
                                    color: 'white' }}
                                    onConfirm={() =>this.updateAPI(parseInt(value))}
                                    >
                                    <Tooltip title={"Delete"} placement="bottom">
                                    <a style = {{color  :'red',fontSize :'15px',marginRight:'6px'}}>  
                                    <i className="simple-icon-close"   /></a></Tooltip>
                                    </Popconfirm>
                            </Colxx>
                           
                          </Row>
                          
                        
                        </div>
                    </div>
                </Colxx> 
            )}
         </Row>
         
         {data.length >=20 && 
         <Separator className = "separator-margin"/>
        }
         {data.length > 0 && 
           <Pagination
           currentPage={currentPage}
           totalPage={totalPage}
           onChangePage={(i) =>this.onChangePage(i)}
         />
         }
         {this.renderModal()}
         

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

