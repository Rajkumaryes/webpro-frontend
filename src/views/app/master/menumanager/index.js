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
import RightArrow from '../../../../assets/img/app_image/right-arrow.png'

class MasterPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
       loading: false,
       items:[]

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
      menumanagerService.fetchmenumanagerData()
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

        menumanagerService.updatemenumanager(items)
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
    
      onclicksubmenu(key)
      {
        this.props.history.push('/app/generalmaster/submenumanager/' + key)
      }
    render()
    {

       const {locale,languageData,match} = this.props
        const {items,loading} = this.state
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
               <Breadcrumb heading={onChangeLanguage(locale,'Menu Manager',languageData)} match={match} />
                  
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
                    
                 }} 
                 onClick = {()=>this.onclicksubmenu(item.id)}>
                   <b>{ item.name }</b>
                   <img src={RightArrow} alt="thumbnail"  
                        style = {{width :'20px',height:'20px',cursor :'pointer',position:'absolute',right :'10px',marginRight:'10px'}}/>
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

