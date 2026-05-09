import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Row,Button } from 'reactstrap';
import Nestable from 'react-nestable';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import{userService} from '../../../../redux/users/saga'
import{roleService} from '../../../../redux/role/saga'
import {onChangeLanguage,getValue} from '../../../../helper'
import { createNotification } from '../../../../toast';
import Loading from "react-fullscreen-loading";

class MasterPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
       loading: false,
       items:[],
       role_data : [],
      };
    }
    componentWillMount()
    {
        this.fetchData()
        this.fetchrole()
    }
    fetchrole() {
      roleService.fetchroleData()
      .then((res) => {
         if(res.status)  
          { 
            this.setState({
                role_data :  res.data,
              }) 
                 
          }
        }).catch((error) => { }); 
   } 
    fetchData() {  
      this.setState({
        loading : true
      })
      userService.fetchhierarchyData()
        .then((res) => { 
          this.setState({   
        loading : false 
                
          }) 
          if(res.status)
            {
              this.setState({ 
                items:res.data  , 
                         
              }) 
            }            
      
      })
      .catch((error) => { 
        this.setState({
          loading : false
        })
        });   
   }

    renderItem = ({ item, collapseIcon, handler }) => (
      <div style= {{
         position: 'relative',
         padding: '10px 15px',
         fontSize: '15px',
         border: '1px solid #f9fafa',
         background: getValue(this.state.role_data,'id','color',item.role_id),
         cursor: 'pointer',
         display : 'inline-block',
         color:'white'

         
      }} >
        {handler}  
        {collapseIcon}   
        <b>{ item.name }</b>
      </div>
    )

      onChange = (items) => {        
        this.setState({
          items:items
         })
      };
      onSubmit()
      {
        this.userhierarchyAPI(this.state.items)
      }
      userhierarchyAPI = items => {
        this.setState({
          loading : true
        })

        userService.userhierarchy(items)
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
        const {items,loading} = this.state
        return (
            <>
            <title>{onChangeLanguage(locale,'Hierarchy',languageData)}</title>
            {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <Row>
              <Colxx xxs="12">
              <div className = "row">
                   
               <div className="col-md-11"> 
               <Breadcrumb heading={onChangeLanguage(locale,'Hierarchy',languageData)} match={match} />
                  
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
            <div>
               <div className="table-responsivemaster">
                  <Nestable className = 'fontstyle'
                     items={items}
                     onChange={(items) => this.onChange(items)}
                     renderItem={this.renderItem}
                  />
               </div>
            </div>
        </>
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

