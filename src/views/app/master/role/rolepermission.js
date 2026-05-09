import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Row ,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { Checkbox ,Tooltip } from 'antd';
import 'antd/dist/antd.css';
import { createNotification } from '../../../../toast';
import Loading from "react-fullscreen-loading";
import {onChangeLanguage} from '../../../../helper'
import{roleService} from '../../../../redux/role/saga'
import LeftArrow from '../../../../assets/img/login/left-arrow.png'

class MasterPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
       data:[],
       loading:false,
       role_id:0
      };
    }
  
    
    componentWillMount()
    {
      const { pathname } = this.props.location;
      const path = pathname.substring(pathname.lastIndexOf('/') + 1)
        this.setState({
          role_id : parseInt(path)
        })
        this.fetchData()
       
    }
    fetchData() {  
      this.setState({
        loading : true
      })
      roleService.fetchrolepermissionData()
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
  onClickback()
	{
		this.props.history.push(`/app/generalmaster/rolemanagment`);
		
	}
  onSubmit()
  {
 
        this.setState({
          loading : true
        })
        console.log("test",this.state.data)
        roleService.updaterolepermission(this.state.data)
        .then((res) => {
          this.setState({
            loading : false
          })
          if(res.status){
            createNotification('Updated','success','filled')
            
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
        const {data,loading} = this.state
       
        return (
            <>
            <title>{onChangeLanguage(locale,'Role Permission',languageData)} </title>
            {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <Row>
              <Colxx xxs="12">
                <div className = "row">
                    <div className = "col-md-11">
                      <Tooltip className = 'fontstyle' title="Back" placement="bottom">
                      <img src={LeftArrow} alt="thumbnail"  
                          style = {{width :'25px',height:'25px',cursor :'pointer',marginTop :'-9px',marginRight:'10px'}}
                          onClick={()=>this.onClickback()}/>
                          </Tooltip>
                          <Breadcrumb heading={onChangeLanguage(locale,'Role Permission',languageData)} match={match} />
                      </div>
                      <div className="col-md-1">
                        <Button color = "primary" className="fontstyle button-width" onClick={()=>this.onSubmit()}>
                        {onChangeLanguage(locale,'Submit',languageData)}
                          </Button>
                      </div>
                </div>
              <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div className = "row">
                { data && data.map((menu,index) =>
                    this.rendermainmenuview(menu, index))
                }
            </div>
        </>
        )
    }
    onChangetopMenuStatus(topindex)
    {
        const {role_id,data} = this.state  
         var value = [...data]
         var role_arr = value[topindex].role_id
         console.log("test1",topindex)
         if(role_arr.includes(role_id))
         {
             role_arr = role_arr.filter(id => parseInt(id) !== parseInt(role_id))
         
             var submenu = this.getsubmenu(value[topindex].children,true)
             value[topindex].role_id = submenu
         }
         else
         {
             
              var submenu = this.getsubmenu(value[topindex].children,false)
              value[topindex].role_id = submenu
             role_arr.push(role_id)
         }
         value[topindex].role_id = role_arr
         this.setState({
             data: value
         })
    }
    getsubmenu(menu,isexist)
    {
 
         const {role_id} = this.state  
          var submenu = [...menu],list = []
         
    
         for(var i = 0; i <submenu.length;i++)
         {
             var value = submenu[i]
             var role_arr = value.role_id ? value.role_id : []
 
             if(isexist)
             {
                 role_arr = role_arr.filter(id => parseInt(id) !== parseInt(role_id))
             }
             else
             {
                 role_arr.push(role_id)
             }
            
 
             value.role_id = role_arr
             list.push(value)
         }
 
         return list
    }
 
    getExistsubmenu(submenu)
    {
     const {role_id} = this.state  
     var isexist = false
     for(var i = 0; i <submenu.length;i++)
     {
         var role_arr = submenu[i].role_id ? submenu[i].role_id : []
         if(role_arr.includes(role_id))
         {
             isexist = true
         }
 
     }
     return isexist
 
    }
    onChangesubMenuStatus(topindex,subindex)
    {
      
     const {role_id,data} = this.state
     console.log("raj1",topindex)
      console.log("raj2",subindex)  
      console.log("raj3",data) 
      console.log("raj4",role_id)  
     var value = [...data]
     var isexist = false
     var submenu = value[topindex].children
        
      var role_arr = submenu[subindex].role_id ? submenu[subindex].role_id : []
      if(role_arr.includes(role_id))
      {
          role_arr = role_arr.filter(id => parseInt(id) !== parseInt(role_id))
      }
      else
      {
          role_arr.push(role_id)
      }
      
      submenu[subindex].role_id  = role_arr
      isexist = this.getExistsubmenu(submenu)
      value[topindex].children = submenu
     if(isexist === true)
     {
         var role_arr = value[topindex].role_id 
         if(!role_arr.includes(role_id))
         {
             role_arr.push(role_id)
         }
         value[topindex].role_id  = role_arr
 
     }
     else
     {
         var role_arr = value[topindex].role_id 
         role_arr = role_arr.filter(id => parseInt(id) !== parseInt(role_id))
         value[topindex].role_id  = role_arr
 
     }
     console.log("raj3",value)
     this.setState({
         data: value
     }) 
 
    }
     rendermainmenuview(menu,i)
     {
      
         const {role_id} = this.state 
         const { locale,languageData} = this.props 
         
          return(
            <div className="col-md-4">
              <div className = " publishuser-card-component" style = {{margin :'5px'}}>
                 <ul className="list-unstyled mb-0" >
                     <li key={i} className="publish-title1 justify-content-center "
                     style = {{height : '40px'}}>
                        <Row>
                            <Colxx xxs="10">
                                <a className = "fontstyle" style = {{marginTop :'9px'}}> {onChangeLanguage(locale,menu.name,languageData)} </a>
                            </Colxx>
                            <Colxx xxs="2">
                            <Checkbox
                            checked={menu.role_id && menu.role_id.includes(role_id)}
                            onChange={() => this.onChangetopMenuStatus(i)}
                            color="blue" />
                            </Colxx>
                        </Row>
                       
                        
                       </li>
                         {this.rendersubmenuview(menu.children,i)}
                        
                    </ul>
              </div>
              
          </div>
          )
     }
     rendersubmenuview(menu,i)
     {
      console.log("raj5",menu)
         const {role_id} = this.state 
         const { locale,languageData} = this.props 
         return(
             menu && menu.map((submneu,index) =>
                      
                 <li key={i} className="justify-content-center fontstyle"
                  style={{listStyleType:'none',height : '40px',padding: '10px' }}>
                     <Row>
                            <Colxx xxs="10">
                                <a className = "fontstyle" style = {{marginTop :'9px'}}> {onChangeLanguage(locale,submneu.name,languageData)} </a>
                            </Colxx>
                            <Colxx xxs="2">
                            <Checkbox
                             checked={submneu.role_id && submneu.role_id.includes(role_id)}
                             onChange={() => this.onChangesubMenuStatus(i,index)}
                            color="blue" />
                            </Colxx>
                        </Row>
                  
             </li>
               )
         )
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

