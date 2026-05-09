import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label,Input,Button} from 'reactstrap';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import { createNotification } from '../../../../toast';
import{userService} from '../../../../redux/users/saga'
import Loading from "react-fullscreen-loading";
import {get_multiplechoose_array,getoptionvalue,get_array_id,getValue,onChangeLanguage} from '../../../../helper'
import { groupService } from '../../../../redux/group/saga';
class RegisterUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      id:0,
      name:'',
      members:[],
      status : 1,
      teamlead:0,
      userlist:[],
	
    };
  }

  componentDidMount() {
    const {isEdit,record} = this.props
    if(isEdit == true)
    {
      this.setState({
        id:record.id,
        name:record.name,
        status:record.status,
        isEdit : true,
      })
      this.fetchData(record.userarray)
    }
    else
    {
      this.fetchData()
    }

  
  }

  fetchData(userarray) {  
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
            let list = [{label:'Select All' ,value : 0}]
            for(var i =0 ; i < res.data.length ;i++)
            {
                list.push( {label:res.data[i].name,value :res.data[i].id})
              
            }
            this.setState({ 
              userlist:list  ,         
            }) 
            let option =  getoptionvalue(get_multiplechoose_array(list,userarray),list,[])
            this.setState({
               members : option
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
  const {id,name,members,status,isEdit} = this.state;
  var userarray= get_array_id(members)
  if(name !== "" && userarray.length > 0)
  {
    
    if(isEdit === true)
    {
      this.updateAPI(id,name,userarray,status)
    }
    else
    {
      this.createAPI(name,userarray,status)
    }
   
  }
  else
  {
    createNotification('Please fill mandatory field','error','filled')
  }
}
createAPI(name,userarray,status)
{
  this.setState({
    loading : true
  })
  groupService.creategroup(name,userarray,status)
    .then((res) => { 
      this.setState({   
        loading : false     
      }) 
      if(res.status)
        {
          createNotification('Created','success','filled')
          this.close(true)
        } else{
          createNotification(res.message,'error','filled')
        }            
  
  })
  .catch((error) => { 
    this.setState({
      loading : false
    })
  });
   
}
updateAPI(id,name,userarray,status)
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
          createNotification('Updated','success','filled')
          this.close(true)
        } else{
          createNotification(res.message,'error','filled')
        }             
  
  })
  .catch((error) => { 
    this.setState({
      loading : false
    })
  });
}

  
handleChangeMember= (option) =>
{
    const {userlist,members} = this.state
    
    var value = getoptionvalue(option,userlist,members)
     this.setState({
        members :value
     })
}
close(isedit)
{
  this.props.closeModal(isedit)
}

  render()
  {
  
    const {name,members,userlist,loading} = this.state
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
                   <Label>{onChangeLanguage(locale,'Group Name',languageData)}<a style = {{color :'red'}}>*</a></Label>
              </Colxx>
               
            <Colxx xxs="8" className="mb-4">
                  <Input 
                        type="text"
                        placeholder = {onChangeLanguage(locale,'Group Name',languageData)}
                        value = {name}  
                        onChange= {(e)=>this.setState({name : e.target.value})} ></Input>
                 </Colxx>
                
             </Row>
            
             <Row>
               
              <Colxx xxs="4" className="mb-4">
                    <Label>{onChangeLanguage(locale,'Members',languageData)}<a style = {{color :'red'}}>*</a></Label>
                   
              </Colxx>
              <Colxx xxs="8" className="mb-4">
                  <ReactMultiSelectCheckboxes  className = 'fontstyle' 
                        value={members}
                        onChange={this.handleChangeMember}
                        options={userlist}
                        getDropdownButtonLabel={({ placeholderButtonLabel, value }) => { if(value.length==0) {return "Select.."; }else{ var item = value.filter(item=>item.label.includes('Select All')); if(item.length!=0){ return (value.length-1)+" selected";} else {return value.length+" selected";}  }}}
                  />
                   
              </Colxx>
                  
              </Row>
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
  const { locale,languageData} = settings;
  return {locale, languageData};
};
export default injectIntl(
  connect(mapStateToProps, {

  })(RegisterUser)
);

