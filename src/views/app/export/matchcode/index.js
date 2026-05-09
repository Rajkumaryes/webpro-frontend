import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import { createNotification } from '../../../../toast';
import{MatchcodeService} from '../../../../redux/Export/matchcodeexception/saga'
import {getValue, onChangeLanguage,convertLocalToUTCDate,convertUTCToLocalDate} from '../../../../helper'
import Loading from "react-fullscreen-loading";
import moment from 'moment';
import{matchcountryService} from '../../../../redux/Export/masters/country/saga'
import{roleService} from '../../../../redux/role/saga'
import{regionexportService} from '../../../../redux/Export/masters/exportregion/saga'
import{matchpurposeService} from '../../../../redux/Export/masters/purpose/saga'
import {userService} from '../../../../redux/users/saga'
import {getValue_D1100} from '../../pasteData'
import Workbook from 'react-excel-workbook'
import * as clipboard from 'clipboard-polyfill/text'


class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading:false,
        requested_by:'',
        mtd_number:'',
        shipment_no:'',
        start_time:new Date(),
        updated_start_time:new Date(),
        end_time:'',
        updated_end_time:'',
        country:'',
        email_address:'',
        information:'',
        match_code_no:'',
        comment:'',
        purpose:'',
        purposedata:[],
        region:'',
        regiondata:[],
        full_address:'',
        postcode:'',
        cityname:'',
        location:'',
        telephone:'',
        fax:'',
        taxcode:'',
        is_search:false,
        countrydata:[],
        countrydata_admin:[],
        is_admin:false,
        id:0,
        data:[],
        pending_data:[],
        is_submit:false,
        istelephone:false,
        isfax:false,
        isemail_address:false,
        istaxcode:false,
        isfull_address:true,
        ispostcode:true,
        iscityname:true,
        islocation:true,
        is_scuess:false,
        isDataPasted: false,
        matchcodecount:'',
        matchcodecountlast:'',
      };
    }
    componentDidMount() {
      if(localStorage.getItem('user_id') !== null)
      {
          let user_id = localStorage.getItem('user_id')
          this.fetchprofile(parseInt(user_id))
      }
     this.fetchroleData()
     this.fetchregion()
     this.fetchpurpose()
    
     this.fetchcountry()
      this.fetchMatchcodeCount()
    }
    fetchMatchcodeCount(){
      this.setState({loading:true})
      const {username} = this.props
      // console.log(username)
      MatchcodeService.fetchmatchcodecount(username)
      .then((res) => {
         if(res.status)   { 
                let filterstatus = res.data;
                let lastdata = res.lastcount;
                console.log("filterstatus",filterstatus)
                console.log("lastdata",lastdata)
                this.setState({ 
                  matchcodecount:filterstatus, 
                  matchcodecountlast:lastdata     
                }) 
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})

}
    fetchprofile(user_id)  {
      this.setState({
          loading : true
        })
      userService.fetchprofile(user_id)
         .then((res) => {
          this.setState({
              loading : false
            })
            if(res.data)
              {
                 
                  this.setEmail(res.data)
              }
      })
      .catch(error => {
          this.setState({
              loading : false
            })
      console.log('ERROR ==>', error)})
   }

    fetchpending(id) {
      this.setState({loading:true})
      MatchcodeService.fetchpendingcount()
      .then((res) => {
        this.setState({loading:false})
        var isfill = false
            if(res.status === true)   
            { 
              if(res.data)
              {
                
                if(res.data.length > 0)
                {
                  
                  isfill = true
                  var dict = res.data[0]
                  this.setState({
                      pending_data :  res.data,
                  })
                  if(id !== dict.id)
                  {
                      this.setValue(dict)
                     
                  }
                  else
                  {
                    createNotification('Please Approve or Reject the Matchcode.Then Move another Match code','error','filled');
                  }
                }
                
              } 
            }
            else
            {
              createNotification(res.message,'error','filled');
            } 
            if(isfill === false)
            {
              this.clearvalue()
              this.setState({
                pending_data :  [],
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
  regionexportService.fetchregion()
  .then((res) => {
     if(res.status)   { 
        let filterstatus = (res.data).filter(item => item.status === 1)
           var regionlist = filterstatus.map(function(cusmaidid) {
                return  {label : cusmaidid.region_code ,value : cusmaidid.id.toString()};
             });  
              this.setState({
              regiondata :  regionlist,

            
              })

           }
           else{
           this.setState({loading:false})}
           })
           .catch((error) => { }); 
} 

fetchpurpose() {
  matchpurposeService.fetchmatchpurpose()
  .then((res) => {
     if(res.status)   { 
        let filterstatus = (res.data).filter(item => item.status === 1)
           var purposelist = filterstatus.map(function(cusmaidid) {
                return  {label : cusmaidid.name ,value : cusmaidid.id.toString()};
             });  
              this.setState({
              purposedata :  purposelist,
                          
              })
        


           }
           else{
           this.setState({loading:false})}
           })
           .catch((error) => { }); 
} 

 fetchRejection(){
  const {id,comment} = this.state;
     
  if(id !== 0 )
  { 
        this.setState({
          loading : true,
          is_submit:false
        })
        MatchcodeService.rejection(id,2,comment)
          .then((res) => { 
            this.setState({   
              loading : false     
            }) 
            if(res.status)
              {
                this.setState({
                  match_code_no:'',
                  // comment:''
                })
                createNotification('Rejected','success','filled')
                this.fetchpending(0)
     
              }    
              else
                {
                  createNotification(res.message,'error','filled');
                }  
        })
        .catch((error) => { 
          this.setState({
            loading : false
          })
        });
 
  }
 
 }
 setEmail(value)
{
  const {is_admin}=this.state
  if(is_admin !== true){
     this.setState({
      email_address:value.email !== null ? value.email :'',
         }) 
        }     
}
    setValue(record)
    {
      
      if(record !== null && record)
      {
        this.setState({
          id:parseInt(record.id),
          start_time:record.start_time,
          end_time:record.end_time,
          mtd_number:record.mtd_number,
          shipment_no:record.shipment_no,
          country:record.country,
          email_address:record.email_address,
          information:record.information,
          requested_by:record.requested_by,
          purpose:record.purpose,
          region:record.region,
          full_address:record.full_address,
          postcode:record.postcode,
          cityname:record.cityname,
          location:record.location,
          telephone:record.telephone,
          fax:record.fax,
          taxcode:record.taxcode,
        
      })
      }
  
    }
  
  fetchroleData() {  
    this.setState({
      loading : true
    })
    roleService.fetchroleData()
      .then((res) => { 
        this.setState({   
      loading : false ,
         is_scuess:true,     
        }) 
        if(res.status)
          {
            var role_id = localStorage.getItem("role_id")
            if(role_id !== null)
            {
              let filterstatus = (res.data).filter(item => ((item.name).toLowerCase() === 'admin' || (item.name).toLowerCase() === 'tl' || (item.name).toLowerCase() === 'manager' ||  (item.name).toLowerCase() === 'match code super user'  ))
              let is_role = (filterstatus).filter(item => (parseInt(role_id) === item.id))
              if(is_role.length > 0)
              {
                this.setState({
                  is_admin:true
                })

                this.fetchpending(0)
              }
            
            }
           
            

          }            
    
    })
    .catch((error) => { 
      this.setState({
        loading : false,
        is_scuess:true,
      })
      });   
 }
    fetchcountry(id) {
      this.setState({
          loading : true
        })
        matchcountryService.fetchmatchcountry()
      .then((res) => {
          this.setState({loading:false})
         if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1 && item.region_id===id)
               var countrylist = filterstatus.map(function(response) {
                    return  {label : response.name,  value : (response.id).toString() , telephone:response.telephone,fax:response.fax, email_address:response.email_address,taxcode:response.taxcode};
                 });  
                 let filterstatus1 = (res.data).filter(item => item.status === 1)
                 var countrylist1 = filterstatus1.map(function(response) {
                      return  {label : response.name,  value : (response.id).toString() , telephone:response.telephone,fax:response.fax, email_address:response.email_address,taxcode:response.taxcode};
                   }); 
                  this.setState({
                    countrydata :  countrylist, 
                    countrydata_admin:countrylist1
                  })
              
               }
               
              
               })
               .catch((error) => { 
                  this.setState({
                      loading : false
                    })
               }); 
   }  
  
   clearvalue()
     {
      if(localStorage.getItem('user_id') !== null)
      {
          let user_id = localStorage.getItem('user_id')
          this.fetchprofile(parseInt(user_id))
      }
         this.setState({
            start_time:new Date(),
            updated_start_time:new Date(),
            end_time:'',
            updated_end_time:'',
            end_time:'',
            mtd_number:'',
            shipment_no:'',
            country:'',
            email_address:'',
            information:'',
            match_code_no:'',
            comment:'',
            purpose:'',
            region:'',         
            full_address:'',
            postcode:'',
            cityname:'',
            location:'',
            telephone:'',
            fax:'',
            taxcode:'',
            match_code_no:'',
            comment:'',
            is_submit:false,
            istelephone:false,
            isfax:false,
            isemail_address:false,
            istaxcode:false,
            isfull_address:true,
            ispostcode:true,
            iscityname:true,
            islocation:true,
           
         })
     } 
     onPasteD1100() 
     {
      clipboard.readText().then((text)=>{
        var record = getValue_D1100(text)
    this.setState({
        paste_data:text,
        shipment_no:record.shipment_no,
        mtd_number:record.mtd_number,
       
        })
       
    });
    this.setState({
      isDataPasted: true
  });
     }
    onPaste() 
    {
        navigator.clipboard.readText().then((text)=>{

          this.setState({match_code_no: text})
        })
    }
    onCopy()
    {
        navigator.clipboard.writeText(this.state.shipment)
    }
   
     
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
    onSubmit() { 
      const {mtd_number,shipment_no,start_time,country,email_address,information,purpose,istelephone,isfax,isemail_address,istaxcode,isfull_address,ispostcode,iscityname,islocation,
        region,full_address,postcode,cityname,location,telephone,fax,taxcode,updated_start_time,purposedata} = this.state;
        var isfill = true,valid_mail = true,check_other_feild= true
      if(mtd_number ===''  || shipment_no==='' || region ==='' ||  country==='' || purpose === ''||information ==='')
      { 
        isfill = false
      }
      if(purpose !== '')
      {
        let list = purposedata.filter(item => item.value === purpose)
        if(list.length > 0)
        {
          var option = list[0]
          if((option.label).toLowerCase() === 'hb/transmission')
          {
            check_other_feild = false
          }
        }
      }
      if(check_other_feild === true)
      {

          if(istelephone === true)
          { 
            if(telephone === '')
            {
              isfill = false
            }
          }
          if(isfax === true)
          { 
            if(fax === '')
            {
              isfill = false
            }
          }
          if(isemail_address === true)
          { 
            if(email_address === '')
            {
              isfill = false
            }
            if(email_address !== '')
            {
              var email = email_address.split(',')
              console.log("lljkgkj " , JSON.stringify(email))
              for(var i = 0 ; i <email.length;i++)
              {
                console.log("lljkgkj validateEmail = " , this.validateEmail(email[i]))
                if(this.validateEmail(email[i]) === false)
                {
                  valid_mail = false
                  break;
                }
              }
            
            }
          
          }
          if(istaxcode === true)
          { 
            if(taxcode === '')
            {
              isfill = false
            }
          }
          if(isfull_address === true)
          { 
            if(full_address === '')
            {
              isfill = false
            }
          }
          if(ispostcode === true)
          { 
            if(postcode === '')
            {
              isfill = false
            }
          }
          if(iscityname === true)
          { 
            if(cityname === '')
            {
              isfill = false
            }
          }
          if(islocation === true)
          { 
            if(location === '')
            {
              isfill = false
            }
          }
      }
      if(isfill === true && valid_mail === true)
      {
            var end_time = new Date(),updated_end_time = new Date()

            const {username} = this.props
            this.setState({
                end_time:end_time

            }) 
            this.setState({
              loading : true
            })
            
            MatchcodeService.creatematchcode(username,mtd_number,shipment_no,country,email_address,information,purpose,
              region,full_address,postcode,cityname,location,telephone,fax,taxcode,0,
              convertLocalToUTCDate(start_time),
              convertLocalToUTCDate( end_time),
              convertLocalToUTCDate( updated_start_time),
              convertLocalToUTCDate(updated_end_time))
              .then((res) => { 
                this.setState({   
                  loading : false     
                }) 
                if(res.status)
                  {
                    createNotification('Created','success','filled')
                    this.clearvalue()
                    this.fetchCodCount()
                  }    
                  else
                    {
                      createNotification(res.message,'error','filled');
                    }  
            })
            .catch((error) => { 
              this.setState({
                loading : false
              })
            });
          
      }
      else
      {
        if(valid_mail === false)
        {
          createNotification('Please fill valid mail','error','filled')
        }
        else
        {
          this.setState({
            is_submit:true
          })
          createNotification('Please fill mandatory field','error','filled')
        }
     
      }
    }
    onApproval() { 
      const {id,match_code_no,email_address,comment,updated_start_time} = this.state;
  
      if(id !== 0 && match_code_no !=='')
      { 
        const updated_end_time = new Date()
        this.setState({
          updated_end_time:updated_end_time
        })
        const {username} = this.props
            this.setState({
              loading : true,
              is_submit:false,
            })
            MatchcodeService.approvematchcode(id,match_code_no,email_address,comment,username,1,
              convertLocalToUTCDate( updated_start_time),
              convertLocalToUTCDate(updated_end_time))
              .then((res) => { 
                this.setState({   
                  loading : false     
                }) 
                if(res.status)
                  {
                    createNotification('Created','success','filled')
                    this.setState({
                      match_code_no:'',
                      comment:''
                    })
                     this.fetchpending(0)
                    
                  }    
                  else
                    {
                      createNotification(res.message,'error','filled');
                    }  
            })
            .catch((error) => { 
              this.setState({
                loading : false
              })
            });
     
      }
      else
      {
        this.setState({
          is_submit:true,
        })
        createNotification('Please fill mandatory field','error','filled')
      }
    }
    handlechangePurpose(value)
    {
      const {country,countrydata,purposedata} = this.state
      this.setState({purpose : value})
      this.setMantatoryValue(country,countrydata,value,purposedata)
    }
    handlechangeCountry = (value) => {
      const {purpose,countrydata,purposedata} = this.state 
      this.setState({
        country : value,
      })
      this.setMantatoryValue(value,countrydata,purpose,purposedata)
    }
    setMantatoryValue(country,countrydata,purpose,purposedata)
    {
      var telephone = false,taxcode = false,fax = false,email_address=false, isfill = true
      if(purpose !== '')
      {
        let list = purposedata.filter(item => item.value === purpose)
        if(list.length > 0)
        {
          var option = list[0]
          if((option.label).toLowerCase() === 'hb/transmission')
          {
            isfill = false
          }
        }
      }

       if(country !== '' && isfill == true)
        {
          let list = countrydata.filter(item => item.value === country)
          if(list.length > 0)
          {
            var option = list[0]
            telephone = option.telephone !== null ?option.telephone : false 
            fax = option.fax !== null ?option.fax : false 
            taxcode = option.taxcode !== null ?option.taxcode : false 
            email_address = option.email_address !== null ?option.email_address : false 
          }
        }
        if(isfill === false)
        {
          this.setState({
            isfull_address:false,
            ispostcode:false,
            iscityname:false,
            islocation:false,
          })
        }
        else
        {
          this.setState({
            isfull_address:true,
            ispostcode:true,
            iscityname:true,
            islocation:true,
          })
        }
      this.setState({
        istelephone:telephone ,
        isfax:fax ,
        istaxcode:taxcode ,
        isemail_address:email_address ,
        })
    }
    handlechangeRegion(value)
    {
      this.setState({
        region :value,
        istelephone:false,
        isfax:false,
        isemail_address:false,
        istaxcode:false,
        country:'',
        countrydata:[],
      })
      this.fetchcountry(value)
    }
   
    renderTemplate()
    {
      const {languageData,locale} = this.props
      const {pending_data,countrydata_admin,purposedata,regiondata} = this.state
      const list = pending_data ? pending_data: []
      var array = list.map(record=> {
            return {
              'Requested By' : record.requested_by,
              'MTD Number' : record.mtd_number,
              'Shipment Number' : record.shipment_no,
              'Region' : getValue(regiondata,'value','label',record.region),
              'Country' : getValue(countrydata_admin,'value','label',record.country),
              'Purpose' : getValue(purposedata,'value','label',record.purpose),
              'Email Address for Distribution':record.email_address,
              'Company Name and Full Address' : record.full_address,
              'Post Code' : record.postcode,
              'City Name' : record.cityname,
              'Location' : record.location,
              'Telephone' : record.telephone,
              'FAX' : record.fax,
              'TaxCode' : record.taxcode,
              'Information' : record.information,
          };
        })
        return(
          
          <Workbook filename="Match_Code.xlsx" element={
            <Button className = "button-width" color="secondary" 
            >{ onChangeLanguage(locale,'Download',languageData)}  
            </Button>
            }>
            <Workbook.Sheet data={array} name="Sheet A">
              <Workbook.Column label="Requested By" value="Requested By"/>
              <Workbook.Column label="MTD Number" value="MTD Number"/>
              <Workbook.Column label="Shipment Number" value="Shipment Number"/>
              <Workbook.Column label="Region" value="Region"/>
              <Workbook.Column label="Country" value="Country"/>
              <Workbook.Column label="Purpose" value="Purpose"/>
              <Workbook.Column label="Email Address for Distribution" value="Email Address for Distribution"/>
              <Workbook.Column label="Company Name and Full Address" value="Company Name and Full Address"/>
              <Workbook.Column label="Post Code" value="Post Code"/>
              <Workbook.Column label="City Name" value="City Name"/>
              <Workbook.Column label="Location" value="Location"/>
              <Workbook.Column label="Telephone" value="Telephone"/>
              <Workbook.Column label="FAX" value="FAX"/>
              <Workbook.Column label="TaxCode" value="TaxCode"/>
              <Workbook.Column label="Information" value="Information"/>
            </Workbook.Sheet> 
          </Workbook>
       
  
        );
    }
    render()
    {
        const {match,languageData,locale} = this.props
        const {is_admin,loading,pending_data,is_scuess,email_address,matchcodecount,matchcodecountlast} = this.state
        var title =  "Match Code Creation Request"
        if(is_admin === true)
        {
          title = "Match Code Creation"
         
        }
        return (
            <>
             <title>{onChangeLanguage(locale,title,languageData)}</title>
             {loading && 
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
            <Row>
              <Colxx xxs="12">
              <div className = "row">
                      <div className = "col-md-4">
                      <Breadcrumb heading={onChangeLanguage(locale,title,languageData)} match={match} />
                    </div>
                   
                   {(is_admin === true && pending_data.length !== 0) &&
                        <div className = "col-md-4" >
                           <Button className = "button-width" color="primary" >
                             {`${onChangeLanguage(locale,'Pending Request',languageData) } : ${pending_data.length} `}
                          </Button>
                           {this.renderTemplate()}
                        </div>
                    }
                    <div className = "col-md-2" >
                    <h2 style = {{marginTop:'15px'}}>Total EQ : {matchcodecount}</h2>
                    </div>
                    <div className = "col-md-2">
                        <h2  style = {{marginTop:'15px'}}>Last EQ : {matchcodecountlast}</h2>
                    </div>
                  </div>
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            {is_scuess == true && 
                <div>
                    {is_admin === false && this.renderRequset()}
                    {is_admin === true && this.renderCreation()}
                </div>
            }
           
          </>
        )
    }

    renderRequset()
    {
      const {mtd_number,shipment_no,start_time,end_time,country,email_address,information,purpose,purposedata,isDataPasted,
        region,regiondata,full_address,postcode,cityname,location,telephone,fax,taxcode,countrydata,is_submit,is_search,
      istelephone,isfax,isemail_address,istaxcode,isfull_address,ispostcode,iscityname,islocation} = this.state
      const {languageData,locale,username} = this.props
      return (
   

        <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
 
                    
                    <div className = "row" >
                        <div className = "col-md-3 space-margin">
                             <Label  className = "fontstyle normal-font" ><a>{onChangeLanguage(locale,'Requested By',languageData)}</a>
                             <br></br>{username}</Label>
                        </div>
                                       
                        <div className = "col-md-3 space-margin">
                            
                            <Label  className = "fontstyle normal-font" >
                              <a>{onChangeLanguage(locale,'Start Time',languageData)}</a>
                              <br></br>
                              {moment(start_time).format('MM/DD/YYYY hh:mm:ss a')}

                              </Label>
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                              <a >{onChangeLanguage(locale,'End Time',languageData)}</a><br></br>
                              {end_time !== ''  && moment(end_time).format('MM/DD/YYYY hh:mm:ss a')}

                               </Label>
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'MTD Number',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input className = {is_submit === true && mtd_number === ''?  "error-border-paste":"fontstyle text-background-paste" }   
                               placeholder = ''
                            value = {mtd_number}  
                            disabled={isDataPasted}
                            onChange= {(e)=>this.setState({mtd_number : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Shipment Number',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                            <Input   className = {is_submit === true && shipment_no === ''?  "error-border-paste":"fontstyle text-background-paste" } 
                            placeholder = ''
                            value = {shipment_no}  
                            disabled={isDataPasted}
                            onChange= {(e)=>this.setState({shipment_no : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Region',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                                <Select  className = {is_submit === true && region === ''?  "error-border-select":"react-select fontstyle" }  
                                 classNamePrefix="react-select"
                                name="form-field-name"
                                value={regiondata.filter(option =>option.value === region)}
                                options={regiondata}
                                onChange={(option)=>this.handlechangeRegion(option.value)}
                            />
                        </div>
                          
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Country',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                                <Select  
                             className = {is_submit === true && country === ''?  "error-border-select":"react-select fontstyle" }  
                             classNamePrefix="react-select"
                                name="form-field-name"
                                value={countrydata.filter(option =>option.value === country)}
                                options={countrydata}
                                 onChange={(option)=>this.handlechangeCountry(option.value)} 
                            />
                        </div>
                        
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Purpose',languageData)}
                            <a style = {{color :'red'}}>*</a></Label>
                                <Select  
                             className = {is_submit === true && purpose === ''?  "error-border-select":"react-select fontstyle" }  
                             classNamePrefix="react-select"
                                name="form-field-name"
                                value={purposedata.filter(option =>option.value === purpose)}
                                options={purposedata}
                                onChange={(option)=>this.handlechangePurpose(option.value)}
                            />
                        </div>
                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Email Address for Distribution',languageData)}
                              {isemail_address === true && <a style = {{color :'red'}}>*</a>}</Label>
                            <Input type="email"
                              className = {(is_submit === true && email_address === '' && isemail_address === true)?  "error-border":"fontstyle text-background" }   
                             value = {email_address} 
                          
                            onChange= {(e)=>this.setState({email_address : e.target.value})} 
                            />
                            </div>
                            <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Company Name and Full Address',languageData)}
                              {isfull_address === true && <a style = {{color :'red'}}>*</a>}</Label>
                            <Input  className = {(is_submit === true && full_address === ''&& isfull_address=== true)?  "error-border":"fontstyle text-background" }   
                             value = {full_address}  
                            onChange= {(e)=>this.setState({full_address : e.target.value})} 
                            />
                            </div>



                            <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Post Code',languageData)}
                              {ispostcode === true && <a style = {{color :'red'}}>*</a>}</Label>
                            <Input  className = {(is_submit === true && postcode === ''&& ispostcode=== true)?  "error-border":"fontstyle text-background" }   
                             value = {postcode}  
                            onChange= {(e)=>this.setState({postcode : e.target.value})} 
                            />
                            </div>

                            <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'City Name',languageData)}
                              {iscityname === true && <a style = {{color :'red'}}>*</a>}</Label>
                            <Input  className = {(is_submit === true && cityname === ''&& iscityname===true)?  "error-border":"fontstyle text-background" }   
                             value = {cityname}  
                            onChange= {(e)=>this.setState({cityname : e.target.value})} 
                            />
                            </div>
                            <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Country',languageData)}
                              {islocation === true && <a style = {{color :'red'}}>*</a>}</Label>
                            <Input  className = {(is_submit === true && location === ''&& islocation===true)?  "error-border":"fontstyle text-background" }   
                             value = {location}  
                            onChange= {(e)=>this.setState({location : e.target.value})} 
                            />
                            </div>
                            <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Telephone',languageData)}
                              {istelephone === true && <a style = {{color :'red'}}>*</a> }
                              </Label>
                            <Input  className = {(is_submit === true && telephone === '' && istelephone === true)?  "error-border":"fontstyle text-background" }   
                             value = {telephone}  
                             type='number' min='0'
                            onChange= {(e)=>this.setState({telephone : e.target.value})} 
                            />
                            </div>

                            <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'FAX',languageData)}
                              {isfax === true && <a style = {{color :'red'}}>*</a> }
                              </Label>
                            <Input className = {(is_submit === true && fax === '' && isfax === true)?  "error-border":"fontstyle text-background" }   
                             value = {fax}  
                            onChange= {(e)=>this.setState({fax : e.target.value})} 
                            />
                            </div>


                            <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'TaxCode',languageData)}
                              {istaxcode === true && <a style = {{color :'red'}}>*</a> }
                              </Label>
                            <Input  className = {(is_submit === true && taxcode === '' && istaxcode === true)?  "error-border":"fontstyle text-background" }   
                             value = {taxcode}  
                            onChange= {(e)=>this.setState({taxcode : e.target.value})} 
                            />
                            </div>

                        <div className = "col-md-12 space-margin">
                            <Label  className = "fontstyle normal-font" >
                              {onChangeLanguage(locale,'Information',languageData)}
                              <a style = {{color :'red'}}>*</a></Label>
                            <textarea className  ={(is_submit === true && information === '')  ? 'border-textarea-background': "fontstyle textarea-background"}
                                placeholder = ''
                                value = {information}  
                                onChange= {(e)=>this.setState({information : e.target.value})} 
                            />
                        </div>

                    </div>
                    <div className = "row">
                       <div className = "col-md-3"></div>
                        <div className = "col-md-2">
                          <Button className = "button-width" color="secondary"  style={{width:'150px'}}
                                onClick={()=>this.onPasteD1100()}
                                >{onChangeLanguage(locale,'Paste D1100',languageData)}</Button> 
                         </div>
                         <div className = "col-md-2">
                          <Button className = "button-width" color="primary"  style={{width:'150px'}}
                                onClick={()=>this.onSubmit()}
                                >{onChangeLanguage(locale,'Save',languageData)} </Button> 
                         </div>
                         <div className = "col-md-2">
                             <Button className = "button-width" color="secondary" style={{width:'150px'}} 
                                    onClick={()=>this.clearvalue()}
                           >{onChangeLanguage(locale,'Refresh',languageData)}</Button>
                         </div>
                    </div>
                </div>   
            
      )

    }
    renderCreation()
    {
      const {requested_by,id,email_address,updated_start_time,updated_end_time,country,mtd_number,shipment_no,countrydata_admin,purpose,purposedata,pending_data,
        region,regiondata,full_address,postcode,cityname,location,telephone,fax,taxcode,information,match_code_no,comment,is_submit} = this.state
        const {languageData,locale} = this.props
        return (
        <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                   
                    <div className = "row">
                        <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Requested By',languageData) }</a><br></br>  {requested_by !== "" ? requested_by : '-'}</Label>
                         </div>
                         <div className = "col-md-3 space-margin">
                        <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Start Time',languageData) }</a><br></br> {moment(updated_start_time).format('MM/DD/YYYY hh:mm:ss a')}  
                        </Label>
                            
                        </div>
                        <div className = "col-md-3 space-margin">
                        <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'End Time',languageData) }</a><br></br>  {updated_end_time !== '' && moment(updated_end_time).format('MM/DD/YYYY hh:mm:ss a')}  
                        </Label>                     
                        </div>
                        <div className = "col-md-3 space-margin">
                           <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'MTD Number',languageData) }</a><br></br>  {mtd_number !== "" ? mtd_number : '-'}</Label>
                          </div>
                        <div className = "col-md-3 space-margin">
                        <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Shipment Number',languageData) }</a><br></br>  {shipment_no !== "" ? shipment_no : '-'}</Label>
                           </div>
                           <div className = "col-md-3 space-margin">
                        <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Region',languageData) }</a><br></br>   {getValue(regiondata,'value','label',region) !=="" ? getValue(regiondata,'value','label',region): '-'}</Label>  
                        </div>                                             
                        <div className = "col-md-3 space-margin">
                        <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Country',languageData) }</a><br></br>   {getValue(countrydata_admin,'value','label',country) !=="" ? getValue(countrydata_admin,'value','label',country): '-'}</Label>  
                        </div>
                       
                        
                        <div className = "col-md-3 space-margin">
                        <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Purpose',languageData) }</a><br></br>   {getValue(purposedata,'value','label',purpose) !==""? getValue(purposedata,'value','label',purpose): '-'}</Label>  
                        </div>
                        
                       
                        <div className = "col-md-3 space-margin">
                        <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Email Address for Distribution',languageData) }</a><br></br>  
                        
                         {email_address !== "" && email_address !== null ?  
                          email_address.split(',').map((value,index) =>
                            <div>{value}</div>
                          ) : '-'}
                         
                         </Label>
                          
                        </div>
                        <div className = "col-md-3 space-margin">
                        <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Company Name and Full Address',languageData) }</a><br></br> {full_address!==""? full_address: '-'} </Label>  
                        </div>
                        
                        <div className = "col-md-3 space-margin">
                        <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Post Code',languageData) }</a><br></br>  {postcode!==""? postcode: '-'} </Label>  
                        </div>
                        
                        <div className = "col-md-3 space-margin">
                        <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'City Name',languageData) }</a><br></br>  {cityname!==""? cityname: '-'}</Label>  
                        </div>
                        <div className = "col-md-3 space-margin">
                        <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Country',languageData) }</a><br></br>   {location!==""? location: '-'} </Label>  
                        </div>
                        <div className = "col-md-3 space-margin">
                        <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Telephone',languageData) }</a><br></br>  {telephone!==""? telephone: '-'}</Label>  
                        </div>
                        <div className = "col-md-3 space-margin">
                        <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'FAX',languageData) }</a><br></br>   {fax!==""? fax: '-'} </Label>  
                        </div>
                        <div className = "col-md-3 space-margin">
                        <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'TaxCode',languageData) }</a><br></br>  {taxcode!==""? taxcode: '-'} </Label>  
                        </div>
                        
                        
                        <div className = "col-md-12 space-margin">
                        <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}>{onChangeLanguage(locale,'Information',languageData) }</a><br></br> 
                        {information!== "" ? information : '-'}
                        </Label>
                           
                        </div>
                        

                        <div className = "col-md-3 space-margin">
                            <Label  className = "fontstyle normal-font" ><a style = {{fontWeight:700}}> {onChangeLanguage(locale,'Match Code No.',languageData) } </a><br></br> 
                            
                              </Label>
                              <Input  className ={(is_submit === true && match_code_no === '')  ? 'error-border-paste': "fontstyle text-background-paste"}
                              onChange= {(e)=>this.setState({match_code_no : e.target.value})}    
                             value = {match_code_no}  
                             
                            />
                             
                        </div>
                        <div className = "col-md-12 space-margin">
                              <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Comment',languageData) }</Label>
                              <textarea className  ={(is_submit === true && comment === '')  ? 'border-textarea-background': "fontstyle textarea-background"}
  
                                  placeholder = ''
                                  value = {comment}  
                                  onChange= {(e)=>this.setState({comment : e.target.value})} 
                              />
                        </div>
                       
                    </div>
                    <div className = "row text-center">
                        <Button className = "button-width" color="primary" 
                        disabled = {(pending_data && pending_data.length === 0)}
                                onClick={()=>this.onApproval()}
                                >{onChangeLanguage(locale,'Submit',languageData) } </Button>
                          <Button className = "button-width" color="secondary" 
                                onClick={()=>this.fetchpending(id)}
                            >{onChangeLanguage(locale,'Next Match Code',languageData) }</Button>  
                            <Button className = "button-width" color="primary"  
                             disabled = {(pending_data && pending_data.length === 0)}
                          onClick={()=>this.fetchRejection()}
                          >{onChangeLanguage(locale,'Reject Match Code',languageData) }</Button>  
                    </div>
                   
                </div>   
            
      )

    }
}
const mapStateToProps = ({ settings }) => {
  const { locale,languageData,username} = settings;
  return {locale, languageData,username};
};
  export default withRouter(
    connect(mapStateToProps, {

   })(QueryResolveSheet)
  );

