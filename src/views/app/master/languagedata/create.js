import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Input,Button} from 'reactstrap';
import { createNotification } from '../../../../toast';
import{languagedataService} from '../../../../redux/languagedata/saga'
import{languageService} from '../../../../redux/language/saga'
import {onChangeLanguage} from '../../../../helper'
import Loading from "react-fullscreen-loading";
class RegisterUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id:0,
      name:'',
      languagedata: {},
      language_data:[],
      status : 1,
      isEdit:false,
      loading:false
	
    };
  }

  componentWillMount()
	{
    if(this.props.record)
    {
        const {record,isEdit} = this.props

        
        if(isEdit === true)
        {
          this.setState({
              name  :record.name,
              id :record.id,
              status:record.status,
              isEdit:isEdit
          })
          this.fetchlanguageData(record);
      }
      else
      {
        this.fetchlanguageData();
      }
       
    }
		
	
	}
  fetchlanguageData(record) {  
    this.setState({
      loading : true
    })
    languageService.fetchlanguageData()
      .then((res) => { 
        this.setState({   
          loading : false 
                  
            }) 
        if(res.status)
          {
            const {isEdit} = this.props
            
              var value = {},arr =res.data.filter((x) => x.status !== 0) 
              for(var i=0;i<arr.length;i++)
              {
                if(isEdit === true && record)
                {
                   value[arr[i].key]= record.languagedata[arr[i].key]
                }
                else
                {
                  value[arr[i].key]= ''
                }
              }
            
            this.setState({ 
              language_data:arr  , 
              languagedata : value,   
            }) 
          }            
    
    })
    .catch((error) => { 
      this.setState({   
        loading : false 
                
          }) 
      });   
 }
onSubmit() { 
  const {id,name,languagedata,status,isEdit} = this.state;

  if(name !== "")
  {
    if(isEdit === true)
    {
      this.updateAPI(id,name,languagedata,status)
    }
    else
    {
      this.createAPI(name,languagedata,status)
    }
   
  }
  else
  {
    createNotification('Please fill mandatory field','error','filled')
  }
 
}
createAPI(name,languagedata,status)
{
  this.setState({
    loading : true
  })
  languagedataService.createlanguagedata(name,languagedata,status)
    .then((res) => { 
      this.setState({   
        loading : false     
      }) 
      if(res.status)
        {
          createNotification('Created','success','filled')
          this.close(true)
        }  
        else{
          createNotification(res.message,'error','filled')
        }           
  
  })
  .catch((error) => { 
    this.setState({
      loading : false
    })
  });
   
}
updateAPI(id,name,languagedata,status)
{
  this.setState({
    loading : true
  })
  languagedataService.updatelanguagedata(id,name,languagedata,status)
    .then((res) => { 
      
      this.setState({   
        loading : false     
      }) 
      if(res.status)
        {
          createNotification('Updated','success','filled')
          this.close(true)
        }else{
          createNotification(res.message,'error','filled')
        }              
  
  })
  .catch((error) => { 
    this.setState({
      loading : false
    })
  });
}
close(isedit)
{
  this.props.closeModal(isedit)
}
onLanguagedata(key,value) {

  var dict = {...this.state.languagedata}
  dict[key] = value
  this.setState({languagedata : dict})
}
getKeys(Languagedata)
{
  var keys = Object.keys(Languagedata);
  return keys
}

getTitle(key,array)
{
  var name = ''
  let list = array.filter(item => item.key === key)
  if(list.length > 0)
  {
    name = list[0].name
  }
  return name
}
  render()
  {
  
    const {name,language_data,languagedata,isEdit,loading,status} = this.state
    
    const {locale,languageData} = this.props
    return (
      <div>
          {loading && 
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
         <Row>
              <Colxx xxs="4" className="mb-4">
                   <Label>{onChangeLanguage(locale,'Name',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Name',languageData)}
                        value = {name}  
                        disabled = {isEdit}
                        onChange= {(e)=>this.setState({name : e.target.value})} ></Input>
                 </Colxx>
                
             </Row>
             {language_data && language_data.map((value,index) => 
                <Row>
                    <Colxx xxs="4" className="mb-4">
                    <Label className = "fontstyle" > {value.name}</Label>
                    </Colxx>
                    <Colxx xxs="8" className="mb-4">
                        {/* <Input 
                        placeholder = {onChangeLanguage(locale,'Language Key',languageData)}
                        value = {key}  
                        onChange= {(e)=>this.setState({key : e.target.value})} ></Input> */}
                        <Input className = "fontstyle" 
                        status="text" name="name" id="name"
                        placeholder = {value.name}
                        value={languagedata[value.key] ? languagedata[value.key] : ''}
                        onChange={(e) =>this.onLanguagedata(value.key,e.target.value)} />
                    </Colxx>
                </Row>
            )}
           
             {/* {isEdit && 
                <Row>
                <Colxx xxs="4" className="mb-4">
                      <Label>{onChangeLanguage(locale,'Status',languageData)}</Label>
                </Colxx>
                  
                <Colxx xxs="8" className="mb-4">
                 <select className='fontstyle buttoncolor input-text'
                     type="select"
                     name="aggregatename"
                     id="name"
                     placeholder="Select"
                     value={status}
                     onChange={(e) =>this.setState({status :parseInt(e.target.value)})}
                     >
                     <option value = {1}>{onChangeLanguage(locale,'Active',languageData)}</option>
                     <option value = {0}>{onChangeLanguage(locale,'In - Active',languageData)}</option>
                  
                  </select>
                  </Colxx>
                  
                </Row>
             } */}
           
           <Row>
               <Colxx xxs="4" className="mb-4"> </Colxx>       
               <Colxx xxs="3" className="mb-4"> 
                  <Button color = "primary" className = 'fontstyle button-width'  onClick={()=>this.close(false)}>
                  {onChangeLanguage(locale,'Cancel',languageData)}
                   
                  </Button>
                  
               </Colxx>   
               <Colxx xxs="5" className="mb-4"> 
                <Button color = "secondary" className="fontstyle button-width" onClick={()=>this.onSubmit()}>
                  {onChangeLanguage(locale,'Submit',languageData)}

                  </Button>
               </Colxx>       
               
            </Row>
      </div>
    );
  }
}
// export default RegisterUser


const mapStateToProps = ({ settings }) => {
  const { locale,languageData,language} = settings;
  return {locale, languageData,language};
};
export default injectIntl(
  connect(mapStateToProps, {

  })(RegisterUser)
);

