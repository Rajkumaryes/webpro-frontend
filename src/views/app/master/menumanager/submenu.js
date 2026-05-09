import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Row,Button } from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import{menumanagerService} from '../../../../redux/menumanger/saga'
import {onChangeLanguage} from '../../../../helper'
import { createNotification } from '../../../../toast';
import Loading from "react-fullscreen-loading";
import { ReactSortable } from 'react-sortablejs';
import LeftArrow from '../../../../assets/img/login/left-arrow.png'

class MasterPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        id:0,
       loading: false,
       items:[],
       name:''

      };
    }
    componentWillMount()
    {
      const { pathname } = this.props.location;
      const path = pathname.substring(pathname.lastIndexOf('/') + 1)
        this.setState({
            id : parseInt(path)
        })
        this.fetchData(parseInt(path))
        this.fetchmenuData(parseInt(path))
    }
    fetchData(id) {  
      this.setState({
        loading : true
      })
      menumanagerService.fetchsubmenumanagerData(id)
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
   fetchmenuData(id) {  

    menumanagerService.fetchindividualmenumanagerData(id)
      .then((res) => { 
 
        if(res.status)
          {
            this.setState({ 
              name:res.data.name  , 
                       
            }) 
          }            
    
    })
    .catch((error) => { 
      });   
 }
   

   
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

        menumanagerService.updatesubmenumanager(items)
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
      onBack()
      {
        this.props.history.push('/app/generalmaster/menumanager')
      }

    render()
    {

       const {locale,languageData,match} = this.props
        const {items,loading,name} = this.state
        return (
            <>
            <title>{onChangeLanguage(locale,'Menu Manager',languageData)}</title>
            {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <Row>
              <Colxx xxs="12">
              <div className = "row">
                   
               <div className="col-md-11"> 
               <img src={LeftArrow} alt="thumbnail"  
                        style = {{width :'25px',height:'25px',cursor :'pointer',marginTop :'-9px',marginRight:'10px'}}
                        onClick={()=>this.onBack()}/>
               <Breadcrumb heading={name !== '' ? name :onChangeLanguage(locale,'Menu Manager',languageData)} match={match} />
                  
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
            <ReactSortable
              list={items}
              setList={(newState)=>this.onChange(newState)}
              options={{ handle: '.handle' }}
              className="row"
            >
              {items.map((item, index) => (
                  <div style= {{
                    position: 'relative',
                    padding: '10px 15px',
                    fontSize: '15px',
                    border: '1px solid #f9fafa',
                    background: 'white',
                    cursor: 'pointer',
                    width:'100%',
                    display : 'inline-block',
                    margin:'2px'
                    
                 }} >
                   <b>{ item.name }</b>
                 </div>
				
			      	))}	

          </ReactSortable>
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

