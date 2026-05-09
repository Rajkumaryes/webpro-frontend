
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import{ProcessService} from '../../../../redux/projectmasters/diputemaster/process/saga'
import{CountryService} from '../../../../redux/projectmasters/diputemaster/country/saga';
import {onChangeLanguage,getCurrentWeek,getTimeDifference,getValue,convertLocalToUTCDate,convertUTCToLocalDate} from '../../../../helper'
import {GetReceviedTime} from '../../../../helper'
import moment from 'moment';
import { createNotification } from '../../../../toast';
import { disputecaptureService } from '../../../../redux/Dispute-process/disputecapture/saga';
import { DisputesourceService } from '../../../../redux/projectmasters/diputemaster/disputeprocess/saga';
import DatePicker from "../../datePicker";
import{DisputestatusService} from '../../../../redux/projectmasters/diputemaster/diputestatus/saga'
import CustomRadioButton from '../../../RadioButton'
import Workbook from 'react-excel-workbook'
import { Table,Checkbox } from 'antd';
import Loading from "react-fullscreen-loading";

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user_id:'',
        start_time:'',
        end_time:'',
        from:'',
        subject:'',
        mail_received:'',
        original_invoice:'',
        dispute_status:'',
        dispute_id:'',
        invoice_number:'',
        mtd_number:'',
        amount_disputed:'',
        dispute_des:'',
        dispute_type:'',
        dispute_code:'',
        dispute_creation:'',
        company_name:'',
        phone_number:'',
        email:'',
        dispute_source:'Manual',
        process:'',
        country:'',
        payer:'',
        receiver_user:'',
        remarks:'',
        data:[],
        diputesourcedata:[],
        countrydata:[],
        processdata:[],
        disputestatusdata:[],
        
        loading:false,
        is_submit:false,
        receivetime_format:false,
        is_submit_table:false,
        is_table:false,
        selectedRowKeys: [],
        updated_start_time:new Date(),
        disputecapturecount:'',
        disputecapturecountlast:'',
      };
    }

    componentWillMount()
    {
      this.setState({
        start_time:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
        
      })
        this.fetchprocess()
        this.fetchcountry()
        this.fetchData()
        this.fetchdiputesource()
        this.fetchdiputestatus()
        this.fetchDisputecaptureCount()
    }
    fetchDisputecaptureCount(){
      this.setState({loading:true})
      const {username} = this.props
      // console.log(username)
      disputecaptureService.fetchdisputecaptureCount(username)
      .then((res) => {
         if(res.status)   { 
                let filterstatus = res.data;
                let lastdata = res.lastcount;
                this.setState({ 
                  disputecapturecount:filterstatus, 
                  disputecapturecountlast:lastdata     
                }) 
               }
               else{
               this.setState({loading:false})}
               })
               .catch((error) => { }); 
               this.setState({loading:false})

}
    onSubmit() { 
        const {user_id,start_time,end_time,from,subject,mail_received,original_invoice,dispute_status,dispute_id,
            invoice_number,mtd_number,amount_disputed,dispute_des,dispute_type,dispute_code,dispute_creation,company_name,
            phone_number,email,dispute_source,process,country,payer,receiver_user,remarks,updated_start_time } = this.state;
            
        if( from!==''&&email!==''&&mail_received!==''
         &&subject!=='' &&mail_received!=='' &&original_invoice!=='' &&dispute_status!=='' &&dispute_id!=='' &&
        invoice_number!=='' &&mtd_number!=='' &&amount_disputed!=='' &&dispute_des!=='' &&dispute_code!=='' &&dispute_creation!=='' &&company_name!=='' &&
        email!=='' &&dispute_source!=='' &&process!=='' &&country!=='' &&payer!=='' &&receiver_user!==''
        )
        {
          if(email !== ''){ 
            let lastAtPos = email.lastIndexOf('@');
            let lastDotPos = email.lastIndexOf('.');
 
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 
            && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
              createNotification('Enter valid Mail','error','filled');
             }
             else
            {
              const end_datetime =  moment(new Date()).format('MM/DD/YYYY hh:mm:ss a') 
             var date=moment(new Date()).format('MM/DD/YYYY')
             var times = GetReceviedTime(mail_received,date)
             let end_date=convertLocalToUTCDate(new Date()),
             start_date=convertLocalToUTCDate(updated_start_time),
             updatedstarttime=convertLocalToUTCDate(updated_start_time),
             updated_end_time=convertLocalToUTCDate(new Date()),
             maildd=moment(convertUTCToLocalDate(mail_received)).format('MM/DD/YYYY hh:mm:ss a'),
             disputecreation=moment(convertUTCToLocalDate(dispute_creation)).format('MM/DD/YYYY hh:mm:ss a')
             this.setState({
               end_time:end_datetime,
               is_submit:false
             })
            
               const {username} = this.props
               this.createAPI(username,start_time,end_datetime,from,subject,maildd,original_invoice,dispute_status,dispute_id,
                   invoice_number,mtd_number,amount_disputed,dispute_des,dispute_code,disputecreation,company_name,
                   phone_number,email,dispute_source,process,country,payer,receiver_user,remarks,start_date,end_date,updatedstarttime,updated_end_time )
           
            }
            }
            
          }
        else
        {
            this.setState({
                is_submit:true
            })
          createNotification('Please Fill Mandatory Field','error','filled')
        }
       
      }
      Refress()
      {
          this.setState({
            start_time:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
            user_id:'',
            end_time:'',
            from:'',
            subject:'',
            mail_received:'',
            original_invoice:'',
            dispute_status:'',
            dispute_id:'',
            invoice_number:'',
            mtd_number:'',
            amount_disputed:'',
            dispute_des:'',
            dispute_code:'',
            dispute_creation:'',
            company_name:'',
            phone_number:'',
            email:'',
            dispute_source:'',
            process:'',
            country:'',
            payer:'',
            receiver_user:'',
            remarks:'',
            is_submit:false,
            is_table:false,
          })
      } 
  
    createAPI(user_id,start_time,end_time,from,subject,mail_received,original_invoice,dispute_status,dispute_id,
        invoice_number,mtd_number,amount_disputed,dispute_des,dispute_code,dispute_creation,company_name,
        phone_number,email,dispute_source,process,country,payer,receiver_user,remarks,start_date,end_date,updatedstarttime,updated_end_time)
    {
      this.setState({
        loading : true
      })
      disputecaptureService.createapi(user_id,start_time,end_time,from,subject,mail_received,original_invoice,dispute_status,dispute_id,
        invoice_number,mtd_number,amount_disputed,dispute_des,dispute_code,dispute_creation,company_name,
        phone_number,email,dispute_source,process,country,payer,receiver_user,remarks,start_date,end_date,updatedstarttime,updated_end_time)
        .then((res) => { 
           
          if(res.status)
            {
              createNotification('Created','success','filled')
              this.fetchData()
              this.setState({
                start_time:moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
                user_id:'',
                end_time:'',
                from:'',
                subject:'',
                mail_received:'',
                original_invoice:'',
                dispute_status:'',
                dispute_id:'',
                invoice_number:'',
                mtd_number:'',
                amount_disputed:'',
                dispute_des:'',
                dispute_code:'',
                dispute_creation:'',
                company_name:'',
                phone_number:'',
                email:'',
                dispute_source:'',
                process:'',
                country:'',
                payer:'',
                receiver_user:'',
                remarks:'',
                is_submit:false,
                is_table:false,
              })
              this.fetchDisputecaptureCount()
            }else{
              this.setState({   
                loading : false     
              })
              createNotification(res.message,'error','filled')
            }                
      
      })
      .catch((error) => { 
        this.setState({
          loading : false
        })
      });
       
    }
    fetchData() {
        this.setState({loading:true})
        disputecaptureService.fetchapi()
        .then((res) => {
           if(res.status)   { 
                    this.setState({
                    data :  res.data,
                    loading:false
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({
                  loading : false
                })
      } 

    fetchcountry() {
        this.setState({
            loading : true
          })
          CountryService.fetchcountry()
        .then((res) => {
            this.setState({loading:false})
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var typelist = filterstatus.map(function(typename) {
                      return  {label : typename.name ,value : (typename.id).toString()};
                   });  
                    this.setState({
                      countrydata :  typelist,
                    })
                 }
                
                 })
                 .catch((error) => { 
                    this.setState({
                        loading : false
                      })
                 }); 
     } 
     
     fetchprocess() {
        this.setState({
            loading : true
          })
          ProcessService.fetchProcess()
        .then((res) => {
            this.setState({loading:false})
           if(res.status)   { 
            let filterstatus = (res.data).filter(item => item.status === 1)
            var regionlist = filterstatus.map(function(regionname) {
                 return  {label : regionname.name ,value : (regionname.id).toString()};
              }); 
                    this.setState({
                        processdata :  regionlist,
                    })
                 }
                
                 })
                 .catch((error) => { 
                    this.setState({
                        loading : false
                      })
                 }); 
     } 
   
     fetchdiputesource() {
      this.setState({
          loading : true
        })
        DisputesourceService.fetchdisputesource()
      .then((res) => {
          this.setState({loading:false})
         if(res.status)   { 
          let filterstatus = (res.data).filter(item => item.status === 1)
          var regionlist = filterstatus.map(function(regionname) {
               return  {label : regionname.name ,value : (regionname.id).toString()};
            }); 
                  this.setState({
                      diputesourcedata :  regionlist,
                  })
               }
              
               })
               .catch((error) => { 
                  this.setState({
                      loading : false
                    })
               }); 
   } 
   fetchdiputestatus() {
    this.setState({
        loading : true
      })
      DisputestatusService.fetchDisputestatus()
    .then((res) => {
        this.setState({loading:false})
       if(res.status)   { 
        let filterstatus = (res.data).filter(item => item.status === 1)
        var regionlist = filterstatus.map(function(regionname) {
             return  {label : regionname.name ,value : (regionname.id).toString()};
          }); 
                this.setState({
                    disputestatusdata :  regionlist,
                })
             }
            
             })
             .catch((error) => { 
                this.setState({
                    loading : false
                  })
             }); 
 } 
 onSubmitData()
 {
   const { data} = this.state
  

   if(data.length > 0)
   {
       var list = [],isfill = true

       for(var i = 0 ; i<data.length;i++)
       {
           var record = Object.assign({}, data[i]);
           
           if(
           record.country  === null || record.country === "" &&
           record.process  === null || record.process === "" 
            )
           {
             isfill = false
           }
           list.push(record)
       }
       if(record.dispute_creation  !== "" && record.dispute_creation  !== null)
            {
              let re = /^\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}:\d{2}:\d{2} ([AaPp][Mm])?$/ ;
              let disputecreation =(record.dispute_creation).match(re)
              if(disputecreation === null )
              {
                isfill = false
              }
            }
       if(isfill === true)
       {
       this.setState({
         loading : true
       })
       disputecaptureService.multiupdate_api(list)
         .then((res) => { 
           this.setState({   
             loading : false ,
             is_submit_table:false    
           }) 
           if(res.status)
             {
               createNotification('Updated','success','filled')
              this.setState({
                is_table:false
              })
             } else{
               createNotification(res.message,'error','filled')
             }             
       
       })
       .catch((error) => { 
         this.setState({
           loading : false,
           
         })
         
       });
     }
     else
     {
       this.setState({
         is_submit_table:true
       })
       createNotification('Please fill mandatory field','error','filled')
     }
      
   }
   else
   {
     
     createNotification('There is no Data to save','error','filled')
   }
 }
 downloadTemplate()
    {
      const {languageData,locale} = this.props
     const data2 = [
        {col1:"Email Date/ From / Subject",
          col2:"Original Invoice Amount",
          col3:"Status",
          col4:"Dispute Status",
          col5:"Dispute ID",
          col6:"MESSAGE",
          col7:"FIS or MACRO ERROR",
          col8:"Invoice Number",
          col9:"Customer ref Number",
          col10:"Bill of Lading Number",
          col11:"Amount Disputed",
          col12:"Currency",
          col13:"Amount to be Billed",
          col14:"Charge Type",
          col15:"Dispute Type",
          col16:"Dispute Description",
          col17:"Dispute Type Code",
          col18:"Company Name",
          col19:"Name",
          col20:"Phone Number",
          col21: "Email (from Template Form)",
          col22:"Exchange ID",
          col23:"Email Attached",
          col24:"Email Address",
          col25:"Internal Email Address",
          col26:"Email Date",
          col27:"Email From",
          col28:"Email Subject"
        }
      ]
      const column_name = ["Original Invoice Amount","Status","Dispute Status","Dispute ID","MESSAGE","FIS or MACRO ERROR","Invoice Number","Customer ref Number","Bill of Lading Number",
      "Amount Disputed","Currency","Amount to be Billed","Charge Type","Dispute Type","Dispute Description","Dispute Type Code","Company Name","Name","Phone Number",
      "Email (from Template Form)","Exchange ID","Email Attached","Email Address","Internal Email Address","Email Date","Email From","Email Subject"]
        return(
          
          <Workbook filename="Dispute.xlsx" element={
              <Button className = "button-width"
               color="secondary" >
              {onChangeLanguage(locale,'Download Template',languageData)} 
              </Button>
            }>
            {/* <Workbook.Sheet data={[]} name="Sheet A">
            {column_name && column_name.map((value,index) =>
             <Workbook.Column label={value} value={value}  />
             )}
            </Workbook.Sheet>  */}
            <Workbook.Sheet data={data2} name="Another sheet">
        <Workbook.Column label="" value={row => row.col1}/>
        <Workbook.Column label=" " value={row => row.col2}/>
        <Workbook.Column label=" " value={row => row.col3}/>
        <Workbook.Column label=" " value={row => row.col4}/>
        <Workbook.Column label=" " value={row => row.col5}/>
        <Workbook.Column label=" " value={row => row.col6}/>
        <Workbook.Column label=" " value={row => row.col7}/>
        <Workbook.Column label=" " value={row => row.col8}/>
        <Workbook.Column label=" " value={row => row.col9}/>
        <Workbook.Column label=" " value={row => row.col10}/>
        <Workbook.Column label=" " value={row => row.col11}/>
        <Workbook.Column label=" " value={row => row.col12}/>
        <Workbook.Column label=" " value={row => row.col13}/>
        <Workbook.Column label=" " value={row => row.col14}/>
        <Workbook.Column label=" " value={row => row.col15}/>
        <Workbook.Column label=" " value={row => row.col16}/>
        <Workbook.Column label=" " value={row => row.col17}/>
        <Workbook.Column label=" " value={row => row.col18}/>
        <Workbook.Column label=" " value={row => row.col19}/>
        <Workbook.Column label=" " value={row => row.col20}/>
        <Workbook.Column label=" " value={row => row.col21}/>
        <Workbook.Column label=" " value={row => row.col22}/>
        <Workbook.Column label=" " value={row => row.col23}/>
        <Workbook.Column label=" " value={row => row.col24}/>
        <Workbook.Column label=" " value={row => row.col25}/>
        <Workbook.Column label=" " value={row => row.col26}/>
        <Workbook.Column label=" " value={row => row.col27}/>
        <Workbook.Column label=" " value={row => row.col28}/>
      </Workbook.Sheet>
          </Workbook>
       
  
        );
    }
    renderTemplate()
    {
      const {languageData,locale} = this.props
      const {data,regoin_Data,disputestatusdata,charge_Data} = this.state
      var array = data.map(record=> {
            return {
              'emaildate_from_subject' : record.emaildate_from_subject,
              'original_invoice' : record.original_invoice,
              'status' : record.status,
              'dispute_status' :getValue(disputestatusdata,'value','label',record.dispute_status) ,
              'dispute_id' : record.dispute_id,
              'message' : record.message,
              'mtd_number':record.mtd_number,
              // 'Region':getValue(regoin_Data,'value','label',record.region) ,
              // 'Type' : getValue(all_type_Data,'value','label',record.type),
              'fis_microerror': record.fis_microerror,
              'invoice_number': record.invoice_number,
              'customer_ref_number': record.customer_ref_number,
              'amount_disputed': record.amount_disputed,
              'currency': record.currency,
              'amount_tobe_billed': record.amount_tobe_billed,
              'charge_type': record.charge_type,
              'dispute_type': record.dispute_type,
              'dispute_des':record.dispute_des,
              'dispute_code': record.dispute_code,
              'company_name': record.company_name,
              'name': record.name,
              'phone_number': record.phone_number,
              'email': record.email,
              'exchange_id': record.exchange_id,
              'email_attached': record.email_attached,
              'email_address': record.email_address,
              'internal_email_address':record.internal_email_address,
              'from':record.from,
              'subject':record.subject,
              'email_recevied':record.mail_received,
              // 'charges':  getValue(charge_Data,'value','label',record.charges),
          };
        })
        return(
          
          <Workbook filename="Dispute_Capture.xlsx" element={
            <Button className = "button-width" color="secondary"  style={{width:'150px'}}
            >{ onChangeLanguage(locale,'Raw Data',languageData)}  
            </Button>
                }>
            <Workbook.Sheet data={array} name="Sheet A">
              <Workbook.Column label="Original Invoice Amount" value="original_invoice"/>
              <Workbook.Column label="Status" value="status"/>
              <Workbook.Column label="Dispute Status" value="dispute_status"/>
              <Workbook.Column label="Dispute ID" value="dispute_id"/>
              <Workbook.Column label="MESSAGE" value="message"/>
              <Workbook.Column label="FIS or MACRO ERROR" value="fis_microerror"/>
              <Workbook.Column label="Invoice Number" value="invoice_number"/>
              <Workbook.Column label="Customer ref Number" value="customer_ref_number"/>
              <Workbook.Column label="Bill of Lading Number" value="mtd_number"/>
              <Workbook.Column label="Amount Disputed" value="amount_disputed"/>
              <Workbook.Column label="Currency" value="currency"/>
              <Workbook.Column label="Amount to be Billed" value="amount_tobe_billed"/>
              <Workbook.Column label="Charge Type" value="charge_type"/>
              <Workbook.Column label="Dispute Type" value="dispute_type"/>
              <Workbook.Column label="Dispute Description" value="dispute_des"/>
              <Workbook.Column label="Dispute Type Code" value="dispute_code"/>
              <Workbook.Column label="Company Name" value="company_name"/>
              <Workbook.Column label="Name" value="name"/>
              <Workbook.Column label="Phone Number" value="phone_number"/>
              <Workbook.Column label="Email (from Template Form)" value="email"/>
              <Workbook.Column label="Exchange ID" value="exchange_id"/>
              <Workbook.Column label="Email Attached" value="email_attached"/>
              <Workbook.Column label="Email Address" value="email_address"/>
              <Workbook.Column label="Internal Email Address" value="internal_email_address"/>
              <Workbook.Column label="Email Date" value="email_recevied"/>
              <Workbook.Column label="Email From" value="from"/>
              <Workbook.Column label="Email Subject" value="subject"/>
              
            </Workbook.Sheet> 
          </Workbook>    
  
        );
    }
    validateEmail = (value) => {
      let error;
      if (!value) {
        error = 'Please enter your email address';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Invalid email address';
      }
      return error;
    };
    onChangeFileUpload(files)
	{
    this.setState({
      loading : true
    })
    const {username} = this.props
    disputecaptureService.fileUpload(files[0],username)
      .then((res) => { 
        if(res.status)
        {
          this.setState({   
            loading : false     
          }) 
          if(res.data.status)   
          {   
         
            createNotification('Uploaded','success','filled')
              this.setState({
                is_table:true,
                data:res.data.data
              })
              setTimeout(() => {
                }, 1000);
          } else{
            createNotification(res.data.message,'error','filled')
          }   
        }
          
    
    })
    .catch((error) => { 
      this.setState({
        loading : false
      })
      });
  }
  onChangetime(date)
  {
    this.setState({
      dispute_creation  : date,
    })
   
  } 
  handleKeypress (e) {
    const characterCode = e.key
    if (characterCode === 'Backspace') return

    const characterNumber = Number(characterCode)
    if (characterNumber >= 0 && characterNumber <= 9) {
      if (e.currentTarget.value && e.currentTarget.value.length) {
        return
      } else if (characterNumber === 0) {
        e.preventDefault()
      }
    } else {
      e.preventDefault()
    }
  }
  onChangemailreceivedtime(date)
    {
      this.setState({
        mail_received  : date,
      })
     
    } 
    onSelectChange = selectedRowKeys => {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.setState({ selectedRowKeys });
  };
  onChangeValue_row(value,key,index1)
    { 
      const data = [...this.state.data]
        if(index1 >= 0)
        {
          data[index1][key] = value
          this.setState({
            data:data
          })
        }
    }
    handleChangeinvoice= e => {
      const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
           this.setState({invoice_number: e.target.value})
        }else{
          createNotification('Enter the Numeric Value only','error','filled')
        }
        
    }
    handleChangephone= e => {
      const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
           this.setState({phone_number: e.target.value})
        }else{
          createNotification('Enter the Numeric Value only','error','filled')
        }
        
    }
    render()
    {
        const {user_id,start_time,end_time,from,subject,mail_received,original_invoice,dispute_status,dispute_id,disputecapturecount,disputecapturecountlast,
            invoice_number,mtd_number,amount_disputed,dispute_des,dispute_type,dispute_creation,company_name,
            phone_number,email,dispute_source,process,country,payer,receiver_user,remarks,dispute_code,
          is_submit,countrydata,processdata,diputesourcedata,disputestatusdata,data,is_submit_table,is_table,
          selectedRowKeys,loading} = this.state
       const {match,languageData,locale,username,receivetime_format} = this.props
       const  columsss = [
        {
            title: onChangeLanguage(locale,'From',languageData),
            dataIndex: 'from',
            key: 'from',
            render: (text, record) => ( 
              <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                {text}
                </div>),
          },
          {
            title: onChangeLanguage(locale,'Subject',languageData),
            dataIndex: 'subject',
            key: 'subject',
            render: (text, record) => ( 
              <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                {text}
              </div>),
          },
          {
            title: onChangeLanguage(locale,'Mail Received Time',languageData),
            dataIndex: 'mail_received',
            key: 'mail_received',
            render: (text, record) => ( 
              <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                {text !=='' ?moment(text).format('MM/DD/YYYY hh:mm:ss a') :''}
               
              </div>),
          },
          {
            title: onChangeLanguage(locale,'Process',languageData),
            dataIndex: 'process',
            key: 'process',
            render: (text, record,index) => ( 
              <div  style = {{padding:'2px',width:'200px'}}>
                 <Select  
              className= {is_submit_table === true && text === ""    ?  "error-border-select":"react-select fontstyle"}
              classNamePrefix="react-select"
              name="form-field-name"
              value={processdata.filter(option =>option.value === text)}
              options={processdata}
              onChange={({value}) =>this.onChangeValue_row(value,'process',index)} />
              </div>)
          },
          {
            title:onChangeLanguage(locale,'Country',languageData),
            dataIndex: 'country',
            key: 'country',
            render: (text, record,index) => ( 
              <div   style = {{padding:'2px',width:'200px'}}>
              <Select  
              className= {is_submit_table === true && text === ""   ?  "error-border-select":"react-select fontstyle"}
              classNamePrefix="react-select"
              name="form-field-name"
              value={countrydata.filter(option =>option.value === text)}
              options={countrydata}
              onChange={({value}) =>this.onChangeValue_row(value,'country',index)} />
              </div>),
          },
          {
            title: onChangeLanguage(locale,'Original Invoice Amount',languageData),
            dataIndex: 'original_invoice',
            key: 'original_invoice',
            render: (text, record) => ( 
                <div className="row d-flex justify-content-center"  style = {{padding:'2px',width:'200px'}}>
                  {text}
                </div>)
          },
          {
            title: onChangeLanguage(locale,'Dispute Status',languageData),
            dataIndex: 'dispute_status',
            key: 'dispute_status',
            render: (text, record,index) => ( 
                <div   style = {{padding:'2px',width:'200px'}}>
                  <Select  className= "react-select fontstyle"
                classNamePrefix="react-select"
                name="form-field-name"
                value={disputestatusdata.filter(option =>option.value === text)}
                options={disputestatusdata}
                onChange={({value}) =>this.onChangeValue_row(value,'dispute_status',index)} />
                </div>)
          },
            {
              title:onChangeLanguage(locale,'Dispute ID',languageData) ,
              dataIndex: 'dispute_id',
              key: 'dispute_id',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                  {text}
                </div>),
            },
            {
              title: onChangeLanguage(locale,'Invoice Number',languageData),
              dataIndex: 'invoice_number',
              key: 'invoice_number',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                   {text}
                </div>)
            },
            {
              title: onChangeLanguage(locale,'MTD Number / Bill',languageData),
              dataIndex: 'mtd_number',
              key: 'mtd_number',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                   {text}
                </div>)
            },
            {
              title: onChangeLanguage(locale,'Amount Disputed',languageData),
              dataIndex: 'amount_disputed',
              key: 'amount_disputed',
              render: (text, record) => ( 
                <div  className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                  {text}
                </div>),
              },
            {
              title:onChangeLanguage(locale,'Dispute Reason / Dispute Description',languageData) ,
              dataIndex: 'dispute_des',
              key: 'dispute_des',
              render: (text, record) => ( 
                <div  className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                  {text}
                </div>),
            },
           
            {
              title:onChangeLanguage(locale,'Dispute Type Code',languageData) ,
              dataIndex: 'dispute_code',
              key: 'dispute_code',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                  {text}
                </div>),
            },
            {
              title: onChangeLanguage(locale,'Dispute Creation Date & Time',languageData),
              dataIndex: 'dispute_creation',
              key: 'dispute_creation',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                {text !==null && text !==''?moment('MM/DD/YYYY hh:mm:ss AM/PM'):''}
                </div>),
            },
            {
              title:onChangeLanguage(locale,'Company Name',languageData),
              dataIndex: 'company_name',
              key: 'company_name',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                  {text}
                </div>),
            },
            {
              title: onChangeLanguage(locale,'Phone Number',languageData),
              dataIndex: 'phone_number',
              key: 'phone_number',
              render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                    {text}
                </div>
               ),
            },
            {
              title: onChangeLanguage(locale,'Email',languageData),
              dataIndex: 'email',
              key: 'email',
              render: (text, record) => ( 
                <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'400px'}}>
                  {text}
                </div>)
             
            },
            {
              title: onChangeLanguage(locale,'Payer',languageData),
              dataIndex: 'payer',
              key: 'payer',
              render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                {text}
                </div>
             ),
            },
            {
              title: onChangeLanguage(locale,'Receiver User / Group',languageData),
              dataIndex: 'receiver_user',
              key: 'receiver_user',
              render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                 {text}
                </div>),
            },
            
            {
              title: onChangeLanguage(locale,'Remarks',languageData),
              dataIndex: 'remarks',
              key: 'remarks',
              render: (text, record) => ( 
                  <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'200px'}}>
                    {text}
                </div>),
            },
    ]
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
        return (
            <>
            <title>{onChangeLanguage(locale,'Dispute Capture',languageData)}</title>
            {loading && 
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
            <Row>
              <Colxx xxs="12">
                
                <div className = "row">
                      <div className = "col-md-8">
                      <Breadcrumb heading={onChangeLanguage(locale,'Dispute Capture',languageData)} match={match} />
                    </div>
                    <div className = "col-md-2" >
                        <h2 style = {{marginTop:'15px'}}>Total EQ : {disputecapturecount}</h2>
                        </div>
                        <div className = "col-md-2">
                            <h2  style = {{marginTop:'15px'}}>Last EQ : {disputecapturecountlast}</h2>
                        </div>
                  </div>
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
            <div className = "" style = {{borderRadius:'10px',marginBottom:'10px'}}>
                    <div className = "row" >
                    <div className = "col-md-2 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'User ID',languageData)}
                            <br></br>{username}</Label>
                                
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a >{onChangeLanguage(locale,'Start Time',languageData)}</a><br></br>
                            { start_time}</Label>
                           
                        </div>
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" ><a >{onChangeLanguage(locale,'End Time',languageData)}</a>
                            <br></br>{end_time}</Label>
                        </div>
                    </div>
                </div>  
                <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                  <div className = "publish-title" >
                          <Row>
                              <Colxx xxs="12">
                                  <Label  className = "fontstyle" 
                                  style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'Dispute Capture',languageData)}</Label>
                                  
                              </Colxx>
                          </Row>
                          </div>
                          <div className = "row" style = {{padding:'10px'}}>
                          <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Dispute Source',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                <div style = {{margin:'10px 0px'}}>
                                <Row>
                                    <Colxx xxs="6">
                                        <CustomRadioButton checked  = "Manual" name = "Manual" value = {dispute_source} 
                                            onChangeRadio={(value)=>this.setState({dispute_source:value})}/>
                                       
                                    </Colxx>
                                    <Colxx xxs="6">
                                     <CustomRadioButton checked  = "Macro" name = "Macro" value = {dispute_source} 
                                           onChangeRadio={(value)=>this.setState({dispute_source:value})}/>
                                        
                                    </Colxx>
                                </Row>
                              </div>
                                </div>
                                {dispute_source ==="Macro" && 
                                <div className = "col-md-6 space-margin"  style = {{marginTop:'22px'}}>
                                {this.downloadTemplate()}
                            <Button className = "button-width" color="primary" style= {{}}>
                            <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
                            <a style= {{margin :'0px'}} >{onChangeLanguage(locale,'Upload From Macro/Mail',languageData)}</a>
                            <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                                className = "filepicker_customButton"
                                style = {{marginLeft :'-31%',width:'35%'}}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.xlsm"
                                    onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
                            </Button>
                           </div>
                          }
                           {dispute_source !=="Macro" && 
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'From',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Input  className = {is_submit === true && from === ''?  "error-border":"fontstyle text-background"}
                                        value = {from}  
                                        onChange= {(e)=>this.setState({from  : e.target.value})} ></Input>
                                </div>
                                }
                                {dispute_source !=="Macro" && 
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Subject',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Input  className = {is_submit === true && subject === ''?  "error-border":"fontstyle text-background"}
                                      
                                        value = {subject}  
                                        onChange= {(e)=>this.setState({subject  : e.target.value})} ></Input>
                                </div>
                                }
                                {dispute_source !=="Macro" &&
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Mail Received Time',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    {is_submit === true && mail_received === '' && 
                                    <p1 className = 'fontstyle mandatory-label'> 
                                    {onChangeLanguage(locale,'Mandatory Field',languageData)} 
                                    </p1>}
                                    <DatePicker
                                        selected={mail_received}
                                        className = "text-background" 
                                        onChange={(date) => this.onChangemailreceivedtime(date)}
                                    />
                                </div>
                                }
                                {dispute_source !=="Macro" &&
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Original Invoice Amount',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Input  className = {is_submit === true && original_invoice === ''?  "error-border":"fontstyle text-background"}
                                        value = {original_invoice}  
                                        onChange= {(e)=>this.setState({original_invoice  : e.target.value})} ></Input>
                                </div>
                                }
                                {dispute_source !=="Macro" &&
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Dispute Status',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Select  className={is_submit === true && dispute_status === ''?  "error-border-select":"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={disputestatusdata.filter(option =>option.value === dispute_status)}
                                            options={disputestatusdata}
                                            onChange={({value}) => this.setState({  dispute_status: value })}
                                        />
                                </div>
                                }
                                {dispute_source !=="Macro" &&
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Dispute ID',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Input  className = {is_submit === true && dispute_id === ''?  "error-border":"fontstyle text-background"}
                                        value = {dispute_id}  
                                        onChange= {(e)=>this.setState({dispute_id  : e.target.value})} ></Input>
                                </div>
                                }
                                {dispute_source !=="Macro" &&
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Invoice Number',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Input
                                        placeholder = ''
                                        className = {is_submit === true && invoice_number === ''?  "error-border":"fontstyle text-background"}
                                        value = {invoice_number}  
                                        type="tel"
                                        onChange={this.handleChangeinvoice} ></Input>
                                </div>
                                }
                                {dispute_source !=="Macro" &&
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'MTD Number / Bill',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Input  className = {is_submit === true && mtd_number === ''?  "error-border":"fontstyle text-background"}
                                        value = {mtd_number}  
                                        onChange= {(e)=>this.setState({mtd_number  : e.target.value})} ></Input>
                                </div>
                                }
                                {dispute_source !=="Macro" &&
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Amount Disputed',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Input  className = {is_submit === true && amount_disputed === ''?  "error-border":"fontstyle text-background"}
                                        value = {amount_disputed}  
                                        onChange= {(e)=>this.setState({amount_disputed  : e.target.value})} ></Input>
                                </div>
                                }
                                {dispute_source !=="Macro" &&
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Dispute Reason / Dispute Description',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Input  className = {is_submit === true && dispute_des === ''?  "error-border":"fontstyle text-background"}
                                        value = {dispute_des}  
                                        onChange= {(e)=>this.setState({dispute_des  : e.target.value})} ></Input>
                                </div>
                                }
                                {dispute_source !=="Macro" &&
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Dispute Type Code',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Input  className = {is_submit === true && dispute_code === ''?  "error-border":"fontstyle text-background"}
                                        value = {dispute_code}  
                                        onChange= {(e)=>this.setState({dispute_code  : e.target.value})} ></Input>
                                </div>
                                }
                                {dispute_source !=="Macro" &&
                                <div className = "col-md-3 space-margin">
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Dispute Creation Date & Time',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    {is_submit === true && dispute_creation === '' &&   
                                    <p1 className = 'fontstyle mandatory-label'> 
                                    {onChangeLanguage(locale,'Mandatory Field',languageData)} 
                                    </p1>}
                                    <DatePicker
                                        selected={dispute_creation}
                                        className = "text-background" 
                                        onChange={(date) => this.onChangetime(date)}
                                    />
                                </div>
                                }
                                {dispute_source !=="Macro" &&
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Company Name',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Input  className = {is_submit === true && company_name === ''?  "error-border":"fontstyle text-background"}
                                        value = {company_name}  
                                        onChange= {(e)=>this.setState({company_name  : e.target.value})} ></Input>
                                </div>
                                }
                                {dispute_source !=="Macro" &&
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Phone Number',languageData)}
                                    </Label>
                                    <Input  
                                        className = {"fontstyle text-background"}
                                        placeholder = ''
                                        value = {phone_number}  
                                        type="tel"
                                        onChange={this.handleChangephone}>
                                        </Input>
                                </div>
                                }
                                {dispute_source !=="Macro" &&
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Email',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Input  className = {is_submit === true && email === ''?  "error-border":"fontstyle text-background"}
                                        value = {email} 
                                        onChange= {(e)=>this.setState({email  : e.target.value})} ></Input>
                                </div>
                                }
                                {dispute_source !=="Macro" &&
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Process',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                        <Select  className={is_submit === true && process === ''?  "error-border-select":"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={processdata.filter(option =>option.value === process)}
                                            options={processdata}
                                            onChange={({value}) => this.setState({  process: value })}
                                        />
                                </div>
                                }
                                {dispute_source !=="Macro" &&
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Country',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Select className={is_submit === true && country === ''?  "error-border-select-paste":"react-select fontstyle" }
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={countrydata.filter(option =>option.value === country)}
                                            options={countrydata}
                                            onChange={({value}) => this.setState({  country: value })}
                                        />
                                </div>
                                }
                                {dispute_source !=="Macro" &&
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Payer',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Input  className = {is_submit === true && payer === ''?  "error-border":"fontstyle text-background"}
                                      
                                        value = {payer}  
                                        onChange= {(e)=>this.setState({payer  : e.target.value})} ></Input>
                                </div>
                                }
                                {dispute_source !=="Macro" &&
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Receiver User / Group',languageData)}
                                    <a style = {{color :'red'}}>*</a></Label>
                                    <Input  className = {is_submit === true && receiver_user === ''?  "error-border":"fontstyle text-background"}
                                      
                                        value = {receiver_user}  
                                        onChange= {(e)=>this.setState({receiver_user  : e.target.value})} ></Input>
                                </div>
                               }
                               {dispute_source !=="Macro" &&
                                <div className = "col-md-12 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Remarks',languageData)}
                                    </Label>
                                    <textarea  
                                    className = {"fontstyle textarea-background"}
                                    value = {remarks}  
                                    onChange= {(e)=>this.setState({remarks  : e.target.value})} ></textarea>
                                </div>
                                }
                                
                           </div>
                           {dispute_source !=="Macro" &&
                           <div className = "row text-center" style = {{margin:'0px 5px'}}> 
                            <Button className = "button-width" color="primary"  style={{width:'150px'}}
                                    onClick={()=>this.onSubmit()}
                            >{onChangeLanguage(locale,'Save',languageData)} </Button> 
                            
                            <Button className = "button-width" color="secondary"  style={{width:'150px'}}
                                    onClick={()=>this.Refress()}
                            >{onChangeLanguage(locale,'Refresh',languageData)}</Button>     
                                  
                            </div>}
                </div> 
                
                {is_table == true  && dispute_source ==="Macro" && 
                <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                <div className = "row" style = {{padding:'10px',margin: '0px 5px'}}>
                <Button className = "button-width" color="primary" 
                    onClick = {()=>this.onSubmitData()}
                     >
                    {onChangeLanguage(locale,'Save',languageData)} 
                    </Button>
                    </div>
                 <div style = {{padding:'10px'}}>
                    <Table 
                    dataSource={data} 
                    columns={columsss}
                    // rowSelection={rowSelection}
                    tableLayout="auto"
                    rowKey="id"
                    scroll={{ y: 240, x: "max-content" }}
                    pagination={false} 
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}/>
                   
                    </div> 
            </div> 
           } 
            
              </div>
          </>
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

