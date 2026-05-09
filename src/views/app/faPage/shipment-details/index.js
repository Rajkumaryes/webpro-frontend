import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Row ,Modal, ModalHeader,ModalBody,} from 'reactstrap';
import { Label,Input,Button} from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Select from 'react-select';
import { Checkbox} from 'antd';
import "react-datepicker/dist/react-datepicker.css";
import {onChangeLanguage,getValue,convertLocalToUTCDate,convertUTCToLocalDate} from '../../../../helper'
import{errortypeService} from '../../../../redux/fa/errortype/saga';
import{qualityexportService} from '../../../../redux/fa/qualityexport/saga';
import{ShipmentDetailsService} from '../../../../redux/fa/shipment-details/saga';
import { createNotification } from '../../../../toast';
import Loading from "react-fullscreen-loading";
import CustomRadioButton from '../../../RadioButton'
import {setContainerClassnames} from '../../../../redux/actions';
import moment from 'moment';
import{qualityimportService} from '../../../../redux/fa/qualityimport/saga';

class QueryResolveSheet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        id:0,
        shipment_no:'',
        audit_complete:false,
        csbooking:'',
        office:'',
        contract_party:'',
        last_user:'',
        etd_first_vessel:'',
        etd_last_vessel:'',
        dp_voyage:'',
        op_start:'',
        op_end:'',
        op_pol:'',
        mot_op_start:'',
        mot_op_pol:'',
        mot_op_pod:'',
        mot_rfr_start:'',
        mot_rfr_bfr:'',
        mot_rfr_bto:'',
        mtd_pla_name:'',
        mtd_pol_name:'',
        mtd_pod_name:'',
        mtd_pld_name:'',
        collector_prepaid:'',
        collector_collect:'',
        op_pod:'',
        rfr_start:'',
        rfr_end:'',
        rfr_bfr:'',
        rfr_bto:'',
        mtd_pla:'',
        mtd_pol:'',
        mtd_pod:'',
        mtd_pld:'',
        orginal_sea:'',
        ra_sea:'',
        ra_changedby:'',
        ra_changeddate:'',
        identifier:'',
        issuing:'',
        retrive_contract_party:'',
        traffic_sea:'',
        traffic_sea_changedby:'',
        traffic_sea_changeddate:'',
        named_account:'',
        ra_olf:'',
        ra_olf_changedby:'',
        ra_olf_changeddate:'',
        na_check:'',
        ra_dlf:'',
        ra_dlf_changedby:'',
        ra_dlf_changeddate:'',
        cc_saler:'',
        cp:'',
        cc:'',
        traffice_date:'',
        retrival_date:'',
        no_of_box20:'',
        no_of_box40:'',
        maintype:'',
        sea_amt:'',
        sea_curr:'',
        sea_iig:'',
        thd_amt:'',
        thd_curr:'',
        thd_iig:'',
        hca_amt:'',
        hca_curr:'',
        hca_iig:'',
        baf_amt:'',
        baf_curr:'',
        baf_iig:'',
        tho_amt:'',
        tho_curr:'',
        tho_iig:'',
        tao_amt:'',
        tao_curr:'',
        tao_iig:'',
        aco_amt:'',
        aco_curr:'',
        aco_iig:'',
        buc_amt:'',
        buc_curr:'',
        buc_iig:'',
        tad_amt:'',
        tad_curr:'',
        tad_iig:'',
        mtd_amt:'',
        mtd_curr:'',
        mtd_iig:'',
        ifp_amt:'',
        ifp_curr:'',
        ifp_iig:'',
        pss_amt:'',
        pss_curr:'',
        pss_iig:'',
        scc_amt:'',
        scc_curr:'',
        scc_iig:'',
        caf_amt:'',
        caf_curr:'',
        caf_iig:'',
        olf_amt:'',
        olf_curr:'',
        olf_iig:'',
        sep_amt:'',
        sep_curr:'',
        sep_iig:'',
        csf_amt:'',
        csf_curr:'',
        csf_iig:'',
        onc_amt:'',
        onc_curr:'',
        onc_iig:'',
        dgco_amt:'',
        dgco_curr:'',
        dgco_iig:'',
        dlf_amt:'',
        dlf_curr:'',
        dlf_iig:'',
        fso_amt:'',
        fso_curr:'',
        fso_iig:'',
        dgp_amt:'',
        dgp_curr:'',
        dgp_iig:'',
        fsd_amt:'',
        fsd_curr:'',
        fsd_iig:'',
        oog_amt:'',
        oog_curr:'',
        oog_iig:'',
        lump_sum1:'',
        lump_sum1_curr:'',
        sum_mc1:'',
        sum_mc1_curr:'',
        sum_mc2:'',
        sum_mc2_curr:'',
        sum_pc1:'',
        sum_pc1_curr:'',
        sum_pc2:'',
        sum_pc2_curr:'',
        sum_oc1:'',
        sum_oc1_curr:'',
        sum_oc2:'',
        sum_oc2_curr:'',
        exportch:false,
        importch:false,
        export_date:'',
        export_auditor:'',
        export_quality:'',
        export_errortype:'',
        export_remark:'',
        import_date:'',
        import_auditor:'',
        import_quality:'',
        import_errortype:'',
        import_remark:'',
        feedback_import:false,
        feedback_export:false,
        over_changed:'',
        under_changed:'',
        comment:'',
        is_sales:false,
        is_csb:false,
        is_csd:false,
        is_csi:false,
        is_tm:false,
        is_cp:false,
        is_cc:false,
        subregion:'',
        service:'',
        rategroup:'',
        rate:'',
        status:1,
        created_at:convertLocalToUTCDate(new Date()),
        updated_at:convertLocalToUTCDate(new Date()),
        updated_start_time:new Date(),
        exporterrortypeData:[],
        exportqualitydata:[],
        qualityimportdata:[],
        nextpre: [],
        selectedVideo: null,
        is_submit:false,
        loading:false,
        data:[],
        activeProject: 0,
        exportch1:'',
        shipmentcount:'',
        shipmentcountlast:''
      };
    }
    componentDidMount() {
        this.fetchData()
        this.fetchquality()
        this.fetcherrortype()
        this.fetchqualityimport()
        this.fetchShipmentCount()
        const{username}=this.props
            this.setState({
                import_date:moment(new Date()).format('MM/DD/YYYY'),
                export_date:moment(new Date()).format('MM/DD/YYYY'),
                updated_start_time:new Date(),
                // etd_first_vessel:moment(convertLocalToUTCDate(new Date())).format('MM/DD/YYYY'),
                // etd_last_vessel:moment(convertUTCToLocalDate(new Date())).format('MM/DD/YYYY'),
            })
    }
    fetchShipmentCount(){
        this.setState({loading:true})
        const {username} = this.props
        //console.log(username)
        ShipmentDetailsService.fetchshipmentcount(username)
        .then((res) => {
           if(res.status)   { 
                  let filterstatus = res.data;
                  let lastdata = res.lastcount;
                  this.setState({ 
                  shipmentcount:filterstatus, 
                  shipmentcountlast:lastdata     
                  }) 
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
                 this.setState({loading:false})
  
  }
    fetchData() {
        this.setState({
            loading : true
          })
        ShipmentDetailsService.fetchshipmentDetails()
        .then((res) => {
            this.setState({
                loading:false})
           if(res.status)   { 
            var nextpre = res.data
            this.setState({
            data :  res.data,
            nextpre: nextpre.length,
            })
            console.log('hhh',nextpre.length)
            }
           else{
            this.setState({})}
            })
          .catch((error) => { }); 
          this.setState({loading:false})
      } 
      fetchqualityimport() {
        qualityimportService.fetchqualityimport()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var rolelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                   });  
                    this.setState({
                    qualityimportdata :  rolelist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
      } 
    fetchquality() {
        qualityexportService.fetchqualityexport()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var rolelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                   });  
                    this.setState({
                    exportqualitydata :  rolelist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
      } 
      fetcherrortype() {
        errortypeService.fetcherrortype()
        .then((res) => {
           if(res.status)   { 
              let filterstatus = (res.data).filter(item => item.status === 1)
                 var rolelist = filterstatus.map(function(cusmaidid) {
                      return  {label : cusmaidid.name ,value : (cusmaidid.id).toString()};
                   });  
                    this.setState({
                    exporterrortypeData :  rolelist,
                    })
                 }
                 else{
                 this.setState({loading:false})}
                 })
                 .catch((error) => { }); 
      } 
      fetctNextShipmentdetails(shipment_no) {
            this.setState({
                loading : true
            })
            ShipmentDetailsService.filternext(shipment_no)
            .then((res) => {
                this.setState({
                    loading:false})
                this.clearvalue()
            if(res.status)   { 
                this.setValue(res.data)
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
     fetctPrevShipmentdetails(shipment_no) {
        this.setState({
            loading : true
        })
        ShipmentDetailsService.prevfilter(shipment_no)
        .then((res) => {
            this.setState({
                loading:false})
            this.clearvalue()
        if(res.status)   { 
            this.setValue(res.data)
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
      fetchIndividualShipmentdetails() {
        const {shipment_no} = this.state 
        if(shipment_no !== "")
        {
            this.setState({
                loading : true
            })
            ShipmentDetailsService.searchshipmentDetails(shipment_no)
            .then((res) => {
                this.setState({
                    loading:false})
                this.clearvalue()
            if(res.status)   { 
                this.setValue(res.data)
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
          createNotification('Please Enter Shipment Number','error','filled')
        }
     }
     setValue(record)
     {
         
         if(record !== null && record)
         {
            this.setState({
        id:record.id,
        shipment_no:record.shipment_no,
        audit_complete:record.audit_complete,
        csbooking:record.csbooking,
        office:record.office,
        contract_party:record.contract_party,
        last_user:record.last_user,
        etd_first_vessel:record.etd_first_vessel,
        etd_last_vessel:record.etd_last_vessel,
        dp_voyage:record.dp_voyage,
        op_start:record.op_start,
        op_end:record.op_end,
        op_pol:record.op_pol,
        mot_op_start:record.mot_op_start,
        mot_op_pol:record.mot_op_pol,
        mot_op_pod:record.mot_op_pod,
        mot_rfr_start:record.mot_rfr_start,
        mot_rfr_bfr:record.mot_rfr_bfr,
        mot_rfr_bto:record.mot_rfr_bto,
        mtd_pla_name:record.mtd_pla_name,
        mtd_pol_name:record.mtd_pol_name,
        mtd_pod_name:record.mtd_pod_name,
        mtd_pld_name:record.mtd_pld_name,
        collector_prepaid:record.collector_prepaid,
        collector_collect:record.collector_collect,
        op_pod:record.op_pod,
        rfr_start:record.rfr_start,
        rfr_end:record.rfr_end,
        rfr_bfr:record.rfr_bfr,
        rfr_bto:record.rfr_bto,
        mtd_pla:record.mtd_pla,
        mtd_pol:record.mtd_pol,
        mtd_pod:record.mtd_pod,
        mtd_pld:record.mtd_pld,
        orginal_sea:record.orginal_sea,
        ra_sea:record.ra_sea,
        ra_changedby:record.ra_changedby,
        ra_changeddate:record.ra_changeddate,
        identifier:record.identifier,
        issuing:record.issuing,
        retrive_contract_party:record.retrive_contract_party,
        traffic_sea:record.traffic_sea,
        traffic_sea_changedby:record.traffic_sea_changedby,
        traffic_sea_changeddate:record.traffic_sea_changeddate,
        named_account:record.named_account,
        ra_olf:record.ra_olf,
        ra_olf_changedby:record.ra_olf_changedby,
        ra_olf_changeddate:record.ra_olf_changeddate,
        na_check:record.na_check,
        ra_dlf:record.ra_dlf,
        ra_dlf_changedby:record.ra_dlf_changedby,
        ra_dlf_changeddate:record.ra_dlf_changeddate,
        cc_saler:record.cc_saler,
        cp:record.cp,
        cc:record.cc,
        traffice_date:record.traffice_date,
        retrival_date:record.retrival_date,
        no_of_box20:record.no_of_box20,
        no_of_box40:record.no_of_box40,
        maintype:record.maintype,
        sea_amt:record.sea_amt,
        sea_curr:record.sea_curr,
        sea_iig:record.sea_iig,
        thd_amt:record.thd_amt,
        thd_curr:record.thd_curr,
        thd_iig:record.thd_iig,
        hca_amt:record.hca_amt,
        hca_curr:record.hca_curr,
        hca_iig:record.hca_iig,
        baf_amt:record.baf_amt,
        baf_curr:record.baf_curr,
        baf_iig:record.baf_iig,
        tho_amt:record.tho_amt,
        tho_curr:record.tho_curr,
        tho_iig:record.tho_iig,
        tao_amt:record.tao_amt,
        tao_curr:record.tao_curr,
        tao_iig:record.tao_iig,
        aco_amt:record.aco_amt,
        aco_curr:record.aco_curr,
        aco_iig:record.aco_iig,
        buc_amt:record.buc_amt,
        buc_curr:record.buc_curr,
        buc_iig:record.buc_iig,
        tad_amt:record.tad_amt,
        tad_curr:record.tad_curr,
        tad_iig:record.tad_iig,
        mtd_amt:record.mtd_amt,
        mtd_curr:record.mtd_curr,
        mtd_iig:record.mtd_iig,
        ifp_amt:record.ifp_amt,
        ifp_curr:record.ifp_curr,
        ifp_iig:record.ifp_iig,
        pss_amt:record.pss_amt,
        pss_curr:record.pss_curr,
        pss_iig:record.pss_iig,
        scc_amt:record.scc_amt,
        scc_curr:record.scc_curr,
        scc_iig:record.scc_iig,
        caf_amt:record.caf_amt,
        caf_curr:record.caf_curr,
        caf_iig:record.caf_iig,
        olf_amt:record.olf_amt,
        olf_curr:record.olf_curr,
        olf_iig:record.olf_iig,
        sep_amt:record.sep_amt,
        sep_curr:record.sep_curr,
        sep_iig:record.sep_iig,
        csf_amt:record.csf_amt,
        csf_curr:record.csf_curr,
        csf_iig:record.csf_iig,
        onc_amt:record.onc_amt,
        onc_curr:record.onc_curr,
        onc_iig:record.onc_iig,
        dgco_amt:record.dgco_amt,
        dgco_curr:record.dgco_curr,
        dgco_iig:record.dgco_iig,
        dlf_amt:record.dlf_amt,
        dlf_curr:record.dlf_curr,
        dlf_iig:record.dlf_iig,
        fso_amt:record.fso_amt,
        fso_curr:record.fso_curr,
        fso_iig:record.fso_iig,
        dgp_amt:record.dgp_amt,
        dgp_curr:record.dgp_curr,
        dgp_iig:record.dgp_iig,
        fsd_amt:record.fsd_amt,
        fsd_curr:record.fsd_curr,
        fsd_iig:record.fsd_iig,
        oog_amt:record.oog_amt,
        oog_curr:record.oog_curr,
        oog_iig:record.oog_iig,
        lump_sum1:record.lump_sum1,
        lump_sum1_curr:record.lump_sum1_curr,
        sum_mc1:record.sum_mc1,
        sum_mc1_curr:record.sum_mc1_curr,
        sum_mc2:record.sum_mc2,
        sum_mc2_curr:record.sum_mc2_curr,
        sum_pc1:record.sum_pc1,
        sum_pc1_curr:record.sum_pc1_curr,
        sum_pc2:record.sum_pc2,
        sum_pc2_curr:record.sum_pc2_curr,
        sum_oc1:record.sum_oc1,
        sum_oc1_curr:record.sum_oc1_curr,
        sum_oc2:record.sum_oc2,
        sum_oc2_curr:record.sum_oc2_curr,
        exportch:record.exportch,
        importch:record.importch,
        export_date:record.export_date,
        export_auditor:record.export_auditor,
        export_quality:record.export_quality,
        export_errortype:record.export_errortype,
        export_remark:record.export_remark,
        import_date:record.import_date,
        import_auditor:record.import_auditor,
        import_quality:record.import_quality,
        import_errortype:record.import_errortype,
        import_remark:record.import_remark,
        feedback_import:record.feedback_import,
        feedback_export:record.feedback_export,
        over_changed:record.over_changed,
        under_changed:record.under_changed,
        comment:record.comment,
        is_sales:record.is_sales,
        is_csb:record.is_csb,
        is_csd:record.is_csd,
        is_csi:record.is_csi,
        is_tm:record.is_tm,
        is_cp:record.is_cp,
        is_cc:record.is_cc,
        subregion:record.subregion,
        service:record.service,
        rategroup:record.rategroup,
        rate:record.rate,
        status:record.status,
        created_at:record.created_at,
        updated_at:record.updated_at,
             })
            
         }
        
     } 
    closeModal()
    {
        this.setState({
            modalOpen:false
        })
        
    }
    openModal()
    {
        this.props.history.push('/app/fa/shipmentlist')
        
    }
    openshipmentlist(){
        this.props.history.push(`/app/fa/shipmentlist`)
    }
    openshipmenu(){
        this.props.history.push(`/app/fa/Report`)
    }
    onChangeFileUpload(files)
	{
    this.setState({
      loading : true
    })
    ShipmentDetailsService.fileUpload(files[0])
      .then((res) => { 
        if(res.status)
        {
          if(res.data.status)   
          {   
         
            createNotification('Uploaded','success','filled')
            this.fetchData()
          }  
          else{
            createNotification(res.data.message,'error','filled')
            this.setState({
                loading : false
              })
          }  
        }
          
    
    })
    .catch((error) => { 
      this.setState({
        loading : false
      })
      });
  }
    changecontractstartdate = (date) => {  
        this.setState({
            date : date,
           
        }); 
      }
      onSubmit() { 
        const {id,shipment_no,audit_complete,csbooking,office,contract_party,last_user,etd_first_vessel,
            etd_last_vessel,dp_voyage,op_start,op_end,op_pol,mot_op_start,mot_op_pol,mot_op_pod,
            mot_rfr_start,mot_rfr_bfr,mot_rfr_bto,mtd_pla_name,mtd_pol_name,mtd_pod_name,mtd_pld_name,
            collector_prepaid,collector_collect,op_pod,rfr_start,rfr_end,rfr_bfr,rfr_bto,mtd_pla,mtd_pol,
            mtd_pod,mtd_pld,orginal_sea,ra_sea,ra_changedby,ra_changeddate,identifier,issuing,
            retrive_contract_party,traffic_sea,traffic_sea_changedby,traffic_sea_changeddate,
            named_account,ra_olf,ra_olf_changedby,ra_olf_changeddate,na_check,ra_dlf,ra_dlf_changedby,
            ra_dlf_changeddate,cc_saler,cp,cc,traffice_date,retrival_date,no_of_box20,no_of_box40,maintype,
            sea_amt,sea_curr,sea_iig,thd_amt,thd_curr,thd_iig,hca_amt,hca_curr,hca_iig,baf_amt,baf_curr,
            baf_iig,tho_amt,tho_curr,tho_iig,tao_amt,tao_curr,tao_iig,aco_amt,aco_curr,aco_iig,buc_amt,
            buc_curr,buc_iig,tad_amt,tad_curr,tad_iig,mtd_amt,mtd_curr,mtd_iig,ifp_amt,ifp_curr,ifp_iig,
            pss_amt,pss_curr,pss_iig,scc_amt,scc_curr,scc_iig,caf_amt,caf_curr,caf_iig,olf_amt,olf_curr,
            olf_iig,sep_amt,sep_curr,sep_iig,csf_amt,csf_curr,csf_iig,onc_amt,onc_curr,onc_iig,dgco_amt,
            dgco_curr,dgco_iig,dlf_amt,dlf_curr,dlf_iig,fso_amt,fso_curr,fso_iig,dgp_amt,dgp_curr,dgp_iig,
            fsd_amt,fsd_curr,fsd_iig,oog_amt,oog_curr,oog_iig,lump_sum1,lump_sum1_curr,sum_mc1,sum_mc1_curr,
            sum_mc2,sum_mc2_curr,sum_pc1,sum_pc1_curr,sum_pc2,sum_pc2_curr,sum_oc1,sum_oc1_curr,sum_oc2,
            sum_oc2_curr,exportch,importch,export_date,export_auditor,export_quality,export_errortype,
            export_remark,import_date,import_auditor,import_quality,import_errortype,import_remark,
            feedback_import,feedback_export,over_changed,under_changed,comment,is_sales,is_csb,
            is_csd,is_csi,is_tm,is_cp,is_cc,subregion,service,rategroup,rate,status,created_at,updated_at,
            exportch1,updated_start_time} = this.state;
             var isfill = true
             if(shipment_no ===''  )
                    {
                        isfill = false
                    }
            if(exportch1==='Export')
            { 
              if(feedback_export === false)
              {
                isfill = false
                
              }
            }
            if(exportch1==='Import')
            { 
              if(feedback_import === false)
              {
                isfill = false
              }
            }
        if(isfill === true )
        {
            let import_date1=moment(new Date()).format('MM/DD/YYYY'),
            export_date1=moment(new Date()).format('MM/DD/YYYY'),
            updatedstarttime=convertLocalToUTCDate(updated_start_time),
            updated_end_time=convertLocalToUTCDate(new Date())
            const{username}=this.props
            this.setState({
                import_date:import_date1,
                export_date:export_date1
            })
           
            ShipmentDetailsService.updateshipmentDetails(id,shipment_no,audit_complete,csbooking,office,contract_party,last_user,etd_first_vessel,
                etd_last_vessel,dp_voyage,op_start,op_end,op_pol,mot_op_start,mot_op_pol,mot_op_pod,
                mot_rfr_start,mot_rfr_bfr,mot_rfr_bto,mtd_pla_name,mtd_pol_name,mtd_pod_name,mtd_pld_name,
                collector_prepaid,collector_collect,op_pod,rfr_start,rfr_end,rfr_bfr,rfr_bto,mtd_pla,mtd_pol,
                mtd_pod,mtd_pld,orginal_sea,ra_sea,ra_changedby,ra_changeddate,identifier,issuing,
                retrive_contract_party,traffic_sea,traffic_sea_changedby,traffic_sea_changeddate,
                named_account,ra_olf,ra_olf_changedby,ra_olf_changeddate,na_check,ra_dlf,ra_dlf_changedby,
                ra_dlf_changeddate,cc_saler,cp,cc,traffice_date,retrival_date,no_of_box20,no_of_box40,maintype,
                sea_amt,sea_curr,sea_iig,thd_amt,thd_curr,thd_iig,hca_amt,hca_curr,hca_iig,baf_amt,baf_curr,
                baf_iig,tho_amt,tho_curr,tho_iig,tao_amt,tao_curr,tao_iig,aco_amt,aco_curr,aco_iig,buc_amt,
                buc_curr,buc_iig,tad_amt,tad_curr,tad_iig,mtd_amt,mtd_curr,mtd_iig,ifp_amt,ifp_curr,ifp_iig,
                pss_amt,pss_curr,pss_iig,scc_amt,scc_curr,scc_iig,caf_amt,caf_curr,caf_iig,olf_amt,olf_curr,
                olf_iig,sep_amt,sep_curr,sep_iig,csf_amt,csf_curr,csf_iig,onc_amt,onc_curr,onc_iig,dgco_amt,
                dgco_curr,dgco_iig,dlf_amt,dlf_curr,dlf_iig,fso_amt,fso_curr,fso_iig,dgp_amt,dgp_curr,dgp_iig,
                fsd_amt,fsd_curr,fsd_iig,oog_amt,oog_curr,oog_iig,lump_sum1,lump_sum1_curr,sum_mc1,sum_mc1_curr,
                sum_mc2,sum_mc2_curr,sum_pc1,sum_pc1_curr,sum_pc2,sum_pc2_curr,sum_oc1,sum_oc1_curr,sum_oc2,
                sum_oc2_curr,exportch,importch,export_date1,export_auditor,export_quality,export_errortype,
                export_remark,import_date1,import_auditor,import_quality,import_errortype,import_remark,
                feedback_import,feedback_export,over_changed,under_changed,comment,is_sales,is_csb,
                is_csd,is_csi,is_tm,is_cp,is_cc,subregion,service,rategroup,rate,status,created_at,updated_at,
                username,updatedstarttime,updated_end_time)
            .then((res) => { 
              this.setState({   
                loading : false     
              }) 
              if(res.status)
                {
                  createNotification('Updated','success','filled')
                 this.fetchShipmentCount()
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
            
              if(exportch1==='Import')
              {
                createNotification('Please fill Feedback Import','error','filled')
              }else if(exportch1==='Export')
              {
                createNotification('Please fill Feedback Export','error','filled')
              }else{
                createNotification('Please fill mandatory field','error','filled')
              }
          
            this.setState({
                is_submit:true,
            })
          
        }
       
      }
      clearvalue()
     {
        this.setState({
            id:'',
            shipment_no:'',
            audit_complete:false,
            csbooking:'',
            office:'',
            contract_party:'',
            last_user:'',
            etd_first_vessel:'',
            etd_last_vessel:'',
            dp_voyage:'',
            op_start:'',
            op_end:'',
            op_pol:'',
            mot_op_start:'',
            mot_op_pol:'',
            mot_op_pod:'',
            mot_rfr_start:'',
            mot_rfr_bfr:'',
            mot_rfr_bto:'',
            mtd_pla_name:'',
            mtd_pol_name:'',
            mtd_pod_name:'',
            mtd_pld_name:'',
            collector_prepaid:'',
            collector_collect:'',
            op_pod:'',
            rfr_start:'',
            rfr_end:'',
            rfr_bfr:'',
            rfr_bto:'',
            mtd_pla:'',
            mtd_pol:'',
            mtd_pod:'',
            mtd_pld:'',
            orginal_sea:'',
            ra_sea:'',
            ra_changedby:'',
            ra_changeddate:'',
            identifier:'',
            issuing:'',
            retrive_contract_party:'',
            traffic_sea:'',
            traffic_sea_changedby:'',
            traffic_sea_changeddate:'',
            named_account:'',
            ra_olf:'',
            ra_olf_changedby:'',
            ra_olf_changeddate:'',
            na_check:'',
            ra_dlf:'',
            ra_dlf_changedby:'',
            ra_dlf_changeddate:'',
            cc_saler:'',
            cp:'',
            cc:'',
            traffice_date:'',
            retrival_date:'',
            no_of_box20:'',
            no_of_box40:'',
            maintype:'',
            sea_amt:'',
            sea_curr:'',
            sea_iig:'',
            thd_amt:'',
            thd_curr:'',
            thd_iig:'',
            hca_amt:'',
            hca_curr:'',
            hca_iig:'',
            baf_amt:'',
            baf_curr:'',
            baf_iig:'',
            tho_amt:'',
            tho_curr:'',
            tho_iig:'',
            tao_amt:'',
            tao_curr:'',
            tao_iig:'',
            aco_amt:'',
            aco_curr:'',
            aco_iig:'',
            buc_amt:'',
            buc_curr:'',
            buc_iig:'',
            tad_amt:'',
            tad_curr:'',
            tad_iig:'',
            mtd_amt:'',
            mtd_curr:'',
            mtd_iig:'',
            ifp_amt:'',
            ifp_curr:'',
            ifp_iig:'',
            pss_amt:'',
            pss_curr:'',
            pss_iig:'',
            scc_amt:'',
            scc_curr:'',
            scc_iig:'',
            caf_amt:'',
            caf_curr:'',
            caf_iig:'',
            olf_amt:'',
            olf_curr:'',
            olf_iig:'',
            sep_amt:'',
            sep_curr:'',
            sep_iig:'',
            csf_amt:'',
            csf_curr:'',
            csf_iig:'',
            onc_amt:'',
            onc_curr:'',
            onc_iig:'',
            dgco_amt:'',
            dgco_curr:'',
            dgco_iig:'',
            dlf_amt:'',
            dlf_curr:'',
            dlf_iig:'',
            fso_amt:'',
            fso_curr:'',
            fso_iig:'',
            dgp_amt:'',
            dgp_curr:'',
            dgp_iig:'',
            fsd_amt:'',
            fsd_curr:'',
            fsd_iig:'',
            oog_amt:'',
            oog_curr:'',
            oog_iig:'',
            lump_sum1:'',
            lump_sum1_curr:'',
            sum_mc1:'',
            sum_mc1_curr:'',
            sum_mc2:'',
            sum_mc2_curr:'',
            sum_pc1:'',
            sum_pc1_curr:'',
            sum_pc2:'',
            sum_pc2_curr:'',
            sum_oc1:'',
            sum_oc1_curr:'',
            sum_oc2:'',
            sum_oc2_curr:'',
            exportch:false,
            importch:false,
            export_date:moment(new Date()).format('MM/DD/YYYY'),
            export_auditor:'',
            export_quality:'',
            export_errortype:'',
            export_remark:'',
            import_date:moment(new Date()).format('MM/DD/YYYY'),
            import_auditor:'',
            import_quality:'',
            import_errortype:'',
            import_remark:'',
            feedback_import:false,
            feedback_export:false,
            over_changed:'',
            under_changed:'',
            comment:'',
            is_sales:'',
            is_csb:'',
            is_csd:'',
            is_csi:'',
            is_tm:'',
            is_cp:'',
            is_cc:'',
            subregion:'',
            service:'',
            rategroup:'',
            rate:'',
            status:'',
            created_at:convertLocalToUTCDate(new Date()),
            updated_at:convertLocalToUTCDate(new Date()),
            // created_at:'',
            // updated_at:'',
            is_submit:false,
            loading:false 
         })
     } 
     menuButtonClick = (e) => {
        e.preventDefault();
        setTimeout(() => {
          const event = document.createEvent('HTMLEvents');
          event.initEvent('resize', false, false);
          window.dispatchEvent(event);
        }, 350);
        this.props.setContainerClassnamesAction(
          3,
          'menu-sub-hidden sub-show-temporary',
          this.props.selectedMenuHasSubItems
        );
      };
      handleexportaudit = (selectedOptions) => {
        const{username}=this.props
        const{export_auditor,exportch}=this.state
        if(selectedOptions !=='' || selectedOptions !==null){
        this.setState({
            export_quality : selectedOptions.value,
            export_auditor:username,
            exportch:true
        }) 
        }else{
            this.setState({
                export_auditor:export_auditor,
                exportch:exportch})  
        }
      } 
      handleimportaudit = (selectedOptions) => {
        const{username}=this.props
        const {import_auditor,importch} =this.state
        if(selectedOptions !=='' || selectedOptions !==null){
        this.setState({
            import_quality : selectedOptions.value,
            import_auditor:username,
            importch:true})  
        }else{
            this.setState({
                import_auditor:import_auditor,
                importch:importch})  
        }
      }  
    render()
    {
        
        const {match,locale,languageData,username} = this.props
        const {shipment_no,audit_complete,csbooking,office,contract_party,last_user,etd_first_vessel,
            etd_last_vessel,dp_voyage,op_start,op_end,op_pol,mot_op_start,mot_op_pol,mot_op_pod,
            mot_rfr_start,mot_rfr_bfr,mot_rfr_bto,mtd_pla_name,mtd_pol_name,mtd_pod_name,mtd_pld_name,
            collector_prepaid,collector_collect,op_pod,rfr_start,rfr_end,rfr_bfr,rfr_bto,mtd_pla,mtd_pol,
            mtd_pod,mtd_pld,orginal_sea,ra_sea,ra_changedby,ra_changeddate,identifier,issuing,
            retrive_contract_party,traffic_sea,traffic_sea_changedby,traffic_sea_changeddate,
            named_account,ra_olf,ra_olf_changedby,ra_olf_changeddate,na_check,ra_dlf,ra_dlf_changedby,
            ra_dlf_changeddate,cc_saler,cp,cc,traffice_date,retrival_date,no_of_box20,no_of_box40,maintype,
            sea_amt,sea_curr,sea_iig,thd_amt,thd_curr,thd_iig,hca_amt,hca_curr,hca_iig,baf_amt,baf_curr,
            baf_iig,tho_amt,tho_curr,tho_iig,tao_amt,tao_curr,tao_iig,aco_amt,aco_curr,aco_iig,buc_amt,
            buc_curr,buc_iig,tad_amt,tad_curr,tad_iig,mtd_amt,mtd_curr,mtd_iig,ifp_amt,ifp_curr,ifp_iig,
            pss_amt,pss_curr,pss_iig,scc_amt,scc_curr,scc_iig,caf_amt,caf_curr,caf_iig,olf_amt,olf_curr,
            olf_iig,sep_amt,sep_curr,sep_iig,csf_amt,csf_curr,csf_iig,onc_amt,onc_curr,onc_iig,dgco_amt,
            dgco_curr,dgco_iig,dlf_amt,dlf_curr,dlf_iig,fso_amt,fso_curr,fso_iig,dgp_amt,dgp_curr,dgp_iig,
            fsd_amt,fsd_curr,fsd_iig,oog_amt,oog_curr,oog_iig,lump_sum1,lump_sum1_curr,sum_mc1,sum_mc1_curr,
            sum_mc2,sum_mc2_curr,sum_pc1,sum_pc1_curr,sum_pc2,sum_pc2_curr,sum_oc1,sum_oc1_curr,sum_oc2,
            sum_oc2_curr,exportch,importch,export_date,export_auditor,export_quality,export_errortype,
            export_remark,import_date,import_auditor,import_quality,import_errortype,import_remark,
            feedback_import,feedback_export,over_changed,under_changed,comment,is_sales,is_csb,
            is_csd,is_csi,is_tm,is_cp,is_cc,subregion,service,rategroup,rate,status,created_at,updated_at,
            exporterrortypeData,exportqualitydata,is_submit,loading,data,exportch1,importch1,qualityimportdata,shipmentcount,shipmentcountlast,
                } = this.state
                
        return (
            <>
            <title>{onChangeLanguage(locale,'Shipment Details',languageData)}</title>
            {loading && 
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <Row>
              <Colxx xxs="12">
              <div className = "row">
                      <div className = "col-md-6">
                      <Breadcrumb heading={onChangeLanguage(locale,'Shipment Details',languageData)} match={match} />
                    </div>
                    <div className = "col-md-2">
                        <Button className = "button-width" color="primary" style= {{width :'100%',marginTop:'13px'}}>
                            <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
                            <a style= {{margin :'0px'}} > {onChangeLanguage(locale,'Upload',languageData)}</a>
                            <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                                className = "filepicker_customButton"
                                style = {{width : '80%',marginLeft :'-56%'}}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
                        </Button>
                    </div>
                    <div className = "col-md-2">
                        <h2 style = {{marginTop:'15px'}}>Total EQ : {shipmentcount}</h2>
                    </div>
                    <div className = "col-md-2">
                        <h2  style = {{marginTop:'15px'}}>Last EQ : {shipmentcountlast}</h2>
                    </div>
                  </div>
                <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div>
                <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                    <div className = "row">
                        <div className = "col-md-3 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Shipment',languageData)}</Label>
                            <Input  
                            className = {is_submit === true && shipment_no === ''?  "error-border":"fontstyle text-background" }   
                            placeholder = ''
                            value = {shipment_no}  
                            onChange= {(e)=>this.setState({shipment_no : e.target.value})} 
                            />
                        </div>
                        <div className = "col-md-1  space-margin"  style = {{marginTop:'16px'}}>
                        <Button className = "button-width" color="secondary" style= {{}}
                         onClick = {()=>this.fetchIndividualShipmentdetails()}
                         >
                                 {onChangeLanguage(locale,'Search',languageData)}
                          </Button>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                             <div  style = {{marginTop:'25px'}}> 
                           <Checkbox color="blue" checked = {audit_complete} 
                           onChange = {(e)=>this.setState({audit_complete:e.target.checked})}> 
                           <Label style = {{marginLeft:'5px'}} className = "fontstyle normal-font" >
                               {onChangeLanguage(locale,'Audit Complete',languageData)}</Label>
                           </Checkbox>
                           </div>
                        </div>
                        <div className = "col-md-3 space-margin"  style = {{marginTop:'16px'}}>
                         </div>
                        <div className = "col-md-1 space-margin"  style = {{marginTop:'16px'}}>
                        
                            <Button className = "button-width" color="secondary" style= {{}}
                         onClick={(e)=>this.menuButtonClick(e)}
                         >
                                 {onChangeLanguage(locale,'Menu',languageData)}
                          </Button>
                          </div>
                          <div className = "col-md-2 space-margin"  style = {{marginTop:'16px'}}>
                          <Button className = "button-width" color="secondary" style= {{}}
                         onClick = {()=>this.openshipmentlist()}>
                             {onChangeLanguage(locale,'Shipment List',languageData)}
                          </Button>
                        </div>
                        
                    </div>
                   
                </div>   
                {/* <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                  <div className = "publish-title" >
                          <Row>
                              <Colxx xxs="12">
                                  <Label  className = "fontstyle" 
                                  style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'Shipment Details',languageData)}</Label>
                                  
                              </Colxx>
                          </Row>
                          </div>
                          <div className = "row" style = {{padding:'10px'}}>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'CS Booking',languageData)}</Label>
                                        <Input  className = "fontstyle text-background"
                                        value = {csbooking}  
                                        onChange= {(e)=>this.setState({csbooking  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Office',languageData)}</Label>
                                         <Input  className = "fontstyle text-background"
                                        value = {office}  
                                        onChange= {(e)=>this.setState({office  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Contract Party',languageData)}</Label>
                                    <Input  className = "fontstyle text-background"
                                        value = {contract_party}  
                                        onChange= {(e)=>this.setState({contract_party  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Last Retrieval User',languageData)}</Label>
                                    <Input  className = "fontstyle text-background"  
                                    placeholder = ''
                                    value = {last_user}  
                                    onChange= {(e)=>this.setState({last_user : e.target.value})} 
                                    />
                                </div>
                                
                             </div>
                     </div>  */}
                {/* <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                  <div className = "publish-title" >
                          <Row>
                              <Colxx xxs="12">
                                  <Label  className = "fontstyle" 
                                  style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'Routing Details',languageData)}</Label>
                                  
                              </Colxx>
                          </Row>
                          </div>
                          <div className = "row" style = {{padding:'10px'}}>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'ETD First Vessel',languageData)}</Label>
                                        <Input  className = "fontstyle text-background"
                                        value = {etd_first_vessel}  
                                        onChange= {(e)=>this.setState({etd_first_vessel  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'ETD Last Vessel',languageData)}</Label>
                                        <Input  className = "fontstyle text-background"
                                        value = {etd_last_vessel}  
                                        onChange= {(e)=>this.setState({etd_last_vessel  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Main DP Voyage',languageData)}</Label>
                                    <Input  className = "fontstyle text-background"
                                        value = {dp_voyage}  
                                        onChange= {(e)=>this.setState({dp_voyage  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'OP Start',languageData)}</Label>
                                    <Row>
                                    <Colxx xxs="6">
                                        <Input  className = "fontstyle text-background"  
                                        placeholder = ''
                                        value = {op_start}  
                                        onChange= {(e)=>this.setState({op_start : e.target.value})} 
                                        />
                                    </Colxx>
                                    <Colxx xxs="6">
                                        <Input  className = "fontstyle text-background"  
                                        placeholder = ''
                                        value = {mot_op_start}  
                                        onChange= {(e)=>this.setState({mot_op_start : e.target.value})} 
                                        />
                                    </Colxx>
                                   
                                    </Row>
                                </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'OP POL \(main\)',languageData)}</Label>
                                    <Row>
                                    <Colxx xxs="6">
                                        <Input  className = "fontstyle text-background"  
                                        placeholder = ''
                                        value = {op_pol}  
                                        onChange= {(e)=>this.setState({op_pol : e.target.value})} 
                                        />
                                    </Colxx>
                                    <Colxx xxs="6">
                                        <Input  className = "fontstyle text-background"  
                                        placeholder = ''
                                        value = {mot_op_pol}  
                                        onChange= {(e)=>this.setState({mot_op_pol : e.target.value})} 
                                        />
                                    </Colxx>
                                   
                                    </Row>
                                </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'OP POD \(main\)',languageData)}</Label>
                                    <Row>
                                    <Colxx xxs="6">
                                        <Input  className = "fontstyle text-background"  
                                        placeholder = ''
                                        value = {op_pod}  
                                        onChange= {(e)=>this.setState({op_pod : e.target.value})} 
                                        />
                                    </Colxx>
                                    <Colxx xxs="6">
                                        <Input  className = "fontstyle text-background"  
                                        placeholder = ''
                                        value = {mot_op_pod}  
                                        onChange= {(e)=>this.setState({mot_op_pod : e.target.value})} 
                                        />
                                    </Colxx>
                                   
                                    </Row>
                                </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'OP End',languageData)}</Label>
                                    <Input  className = "fontstyle text-background"
                                        value = {op_end}  
                                        onChange= {(e)=>this.setState({op_end  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'RFR Start',languageData)}</Label>
                                    <Row>
                                    <Colxx xxs="6">
                                        <Input  className = "fontstyle text-background"  
                                        placeholder = ''
                                        value = {rfr_start}  
                                        onChange= {(e)=>this.setState({rfr_start : e.target.value})} 
                                        />
                                    </Colxx>
                                    <Colxx xxs="6">
                                        <Input  className = "fontstyle text-background"  
                                        placeholder = ''
                                        value = {mot_rfr_start}  
                                        onChange= {(e)=>this.setState({mot_rfr_start : e.target.value})} 
                                        />
                                    </Colxx>
                                   
                                    </Row>
                                </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'RFR BFR',languageData)}</Label>
                                    <Row>
                                    <Colxx xxs="6">
                                        <Input  className = "fontstyle text-background"  
                                        placeholder = ''
                                        value = {rfr_bfr}  
                                        onChange= {(e)=>this.setState({rfr_bfr : e.target.value})} 
                                        />
                                    </Colxx>
                                    <Colxx xxs="6">
                                        <Input  className = "fontstyle text-background"  
                                        placeholder = ''
                                        value = {mot_rfr_bfr}  
                                        onChange= {(e)=>this.setState({mot_rfr_bfr : e.target.value})} 
                                        />
                                    </Colxx>
                                   
                                    </Row>
                                </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'RFR BTO',languageData)}</Label>
                                    <Row>
                                    <Colxx xxs="6">
                                        <Input  className = "fontstyle text-background"  
                                        placeholder = ''
                                        value = {rfr_bto}  
                                        onChange= {(e)=>this.setState({rfr_bto : e.target.value})} 
                                        />
                                    </Colxx>
                                    <Colxx xxs="6">
                                        <Input  className = "fontstyle text-background"  
                                        placeholder = ''
                                        value = {mot_rfr_bto}  
                                        onChange= {(e)=>this.setState({mot_rfr_bto : e.target.value})} 
                                        />
                                    </Colxx>
                                   
                                    </Row>
                                </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'RFR End',languageData)}</Label>
                                    <Input  className = "fontstyle text-background"
                                        value = {rfr_end}  
                                        onChange= {(e)=>this.setState({rfr_end  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'MTD PLA',languageData)}</Label>
                                    <Input  className = "fontstyle text-background"
                                        value = {mtd_pla}  
                                        onChange= {(e)=>this.setState({mtd_pla  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'MTD POL',languageData)}</Label>
                                    <Row>
                                    <Colxx xxs="6">
                                        <Input  className = "fontstyle text-background"  
                                        placeholder = ''
                                        value = {mtd_pol}  
                                        onChange= {(e)=>this.setState({mtd_pol : e.target.value})} 
                                        />
                                    </Colxx>
                                    <Colxx xxs="6">
                                        <Input  className = "fontstyle text-background"  
                                        placeholder = ''
                                        value = {mtd_pol_name}  
                                        onChange= {(e)=>this.setState({mtd_pol_name : e.target.value})} 
                                        />
                                    </Colxx>
                                   
                                    </Row>
                                </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'MTD POD',languageData)}</Label>
                                    <Row>
                                    <Colxx xxs="6">
                                        <Input  className = "fontstyle text-background"  
                                        placeholder = ''
                                        value = {mtd_pod}  
                                        onChange= {(e)=>this.setState({mtd_pod : e.target.value})} 
                                        />
                                    </Colxx>
                                    <Colxx xxs="6">
                                        <Input  className = "fontstyle text-background"  
                                        placeholder = ''
                                        value = {mtd_pod_name}  
                                        onChange= {(e)=>this.setState({mtd_pod_name : e.target.value})} 
                                        />
                                    </Colxx>
                                   
                                    </Row>
                                </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'MTD PLD',languageData)}</Label>
                                    <Row>
                                    <Colxx xxs="6">
                                        <Input  className = "fontstyle text-background"  
                                        placeholder = ''
                                        value = {mtd_pld}  
                                        onChange= {(e)=>this.setState({mtd_pld : e.target.value})} 
                                        />
                                    </Colxx>
                                    <Colxx xxs="6">
                                        <Input  className = "fontstyle text-background"  
                                        placeholder = ''
                                        value = {mtd_pla_name}  
                                        onChange= {(e)=>this.setState({mtd_pla_name : e.target.value})} 
                                        />
                                    </Colxx>
                                   
                                    </Row>
                                </div>
                                
                                
                             </div>
                     </div>  */}
                {/* <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                  <div className = "publish-title" >
                          <Row>
                              <Colxx xxs="12">
                                  <Label  className = "fontstyle" 
                                  style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'Retrieving Details',languageData)}</Label>
                                  
                              </Colxx>
                          </Row>
                          </div>
                          <div className = "row" style = {{padding:'10px'}}>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Original SEA',languageData)}</Label>
                                        <Input  className = "fontstyle text-background"
                                        value = {orginal_sea}  
                                        onChange= {(e)=>this.setState({orginal_sea  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'RA SEA',languageData)}</Label>
                                         <Input  className = "fontstyle text-background"
                                        value = {ra_sea}  
                                        onChange= {(e)=>this.setState({ra_sea  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Changed By',languageData)}</Label>
                                    <Input  className = "fontstyle text-background"
                                        value = {ra_changedby}  
                                        onChange= {(e)=>this.setState({ra_changedby  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Changed Date',languageData)}</Label>
                                    <Input className = "fontstyle text-background" data-date-format='mm/dd/yy'
                                        type="date"
                                        value = {ra_changeddate}  
                                        onChange= {(e)=>this.setState({ra_changeddate  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-9 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Identifier',languageData)}</Label>
                                    <Row>
                                    <Colxx xxs="4">
                                        <Input  className = "fontstyle text-background"  
                                        placeholder = ''
                                        value = {identifier}  
                                        onChange= {(e)=>this.setState({identifier : e.target.value})} 
                                        />
                                    </Colxx>
                                    <Colxx xxs="4">
                                        <Input  className = "fontstyle text-background"  
                                        placeholder = ''
                                        value = {rategroup}  
                                        onChange= {(e)=>this.setState({rategroup : e.target.value})} 
                                        />
                                    </Colxx>
                                    <Colxx xxs="4">
                                        <Input  className = "fontstyle text-background"  
                                        placeholder = ''
                                        value = {rate}  
                                        onChange= {(e)=>this.setState({rate : e.target.value})} 
                                        />
                                    </Colxx>
                                   
                                    </Row>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Issuing',languageData)}</Label>
                                    <Input  className = "fontstyle text-background"  
                                    placeholder = ''
                                    value = {issuing}  
                                    onChange= {(e)=>this.setState({issuing : e.target.value})} 
                                    />
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Contract Party',languageData)}</Label>
                                        <Input  className = "fontstyle text-background"
                                        value = {contract_party}  
                                        onChange= {(e)=>this.setState({contract_party  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Traffic ID SEA',languageData)}</Label>
                                         <Input  className = "fontstyle text-background"
                                        value = {traffic_sea}  
                                        onChange= {(e)=>this.setState({traffic_sea  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Changed By',languageData)}</Label>
                                    <Input  className = "fontstyle text-background"
                                        value = {traffic_sea_changedby}  
                                        onChange= {(e)=>this.setState({traffic_sea_changedby  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Changed Date',languageData)}</Label>
                                     <Input className = "fontstyle text-background" data-date-format='mm/dd/yy'
                                        type="date"
                                        value = {traffic_sea_changeddate}  
                                        onChange= {(e)=>this.setState({traffic_sea_changeddate  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Named Account',languageData)}</Label>
                                        <Input  className = "fontstyle text-background"
                                        value = {named_account}  
                                        onChange= {(e)=>this.setState({named_account  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'RA OLF',languageData)}</Label>
                                         <Input  className = "fontstyle text-background"
                                        value = {ra_olf}  
                                        onChange= {(e)=>this.setState({ra_olf  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Changed By',languageData)}</Label>
                                    <Input  className = "fontstyle text-background"
                                        value = {ra_olf_changedby}  
                                        onChange= {(e)=>this.setState({ra_olf_changedby  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Changed Date',languageData)}</Label>
                                    <Input className = "fontstyle text-background" data-date-format='mm/dd/yy'
                                        type="date"
                                        value = {ra_olf_changeddate}  
                                        onChange= {(e)=>this.setState({ra_olf_changeddate  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'NA Check',languageData)}</Label>
                                        <Input  className = "fontstyle text-background"
                                        value = {na_check}  
                                        onChange= {(e)=>this.setState({na_check  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'RA DLF',languageData)}</Label>
                                         <Input  className = "fontstyle text-background"
                                        value = {ra_dlf}  
                                        onChange= {(e)=>this.setState({ra_dlf  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Changed By',languageData)}</Label>
                                    <Input  className = "fontstyle text-background"
                                        value = {ra_dlf_changedby}  
                                        onChange= {(e)=>this.setState({ra_dlf_changedby  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Changed Date',languageData)}</Label>
                                      <Input className = "fontstyle text-background" data-date-format='mm/dd/yy'
                                        type="date"
                                        value = {ra_dlf_changeddate}  
                                        onChange= {(e)=>this.setState({ra_dlf_changeddate  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'CC Saler Hier',languageData)}</Label>
                                        <Input  className = "fontstyle text-background"
                                        value = {cc_saler}  
                                        onChange= {(e)=>this.setState({cc_saler  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'CP',languageData)}</Label>
                                        <Input  className = "fontstyle text-background"
                                        value = {cp}  
                                        onChange= {(e)=>this.setState({cp  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'CC',languageData)}</Label>
                                        <Input  className = "fontstyle text-background"
                                        value = {cc}  
                                        onChange= {(e)=>this.setState({cc  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Traffice Date',languageData)}</Label>
                                    <Input className = "fontstyle text-background" data-date-format='mm/dd/yy'
                                        type="date"
                                        value = {traffice_date}  
                                        onChange= {(e)=>this.setState({traffice_date  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-3 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Last Retrieval Date',languageData)}</Label>
                                    <Input className = "fontstyle text-background" data-date-format='mm/dd/yy'
                                        type="date"
                                        value = {last_user}  
                                        onChange= {(e)=>this.setState({last_user  : e.target.value})} ></Input>
                                </div>
                                
                                
                             </div>
                     </div>  */}
                {/* <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                  <div className = "publish-title" >
                          <Row>
                              <Colxx xxs="12">
                                  <Label  className = "fontstyle" 
                                  style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'Equipment Details',languageData)}</Label>
                                  
                              </Colxx>
                          </Row>
                          </div>
                          <div className = "row" style = {{padding:'10px'}}>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,' No\. of BOX 20',languageData)}</Label>
                                        <Input  className = "fontstyle text-background"
                                        value = {no_of_box20}  
                                        onChange= {(e)=>this.setState({no_of_box20  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,' No. of BOX 40',languageData)}</Label>
                                         <Input  className = "fontstyle text-background"
                                        value = {no_of_box40}  
                                        onChange= {(e)=>this.setState({no_of_box40  : e.target.value})} ></Input>
                                </div>
                                <div className = "col-md-4 space-margin"  >
                                    <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Main Type',languageData)}</Label>
                                    <Input  className = "fontstyle text-background"
                                        value = {maintype}  
                                        onChange= {(e)=>this.setState({maintype  : e.target.value})} ></Input>
                                </div>
                                
                             </div>
                     </div>  */}
                     {/* <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                  <div className = "publish-title" >
                          <Row>
                              <Colxx xxs="8">
                                  <Label  className = "fontstyle" 
                                  style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'Revenue Details',languageData)}</Label>
                              </Colxx>
                              
                          </Row>
                          </div>
                          <div className = "row" style = {{padding:'10px'}}>
                           <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'SEA Amt',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {sea_amt}  
                                onChange= {(e)=>this.setState({sea_amt  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {sea_curr}  
                                        onChange= {(e)=>this.setState({sea_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'IIG',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {sea_iig}  
                                        onChange= {(e)=>this.setState({sea_iig  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'THD Amt',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {thd_amt}  
                                onChange= {(e)=>this.setState({thd_amt  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {thd_curr}  
                                        onChange= {(e)=>this.setState({thd_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'IIG',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {thd_iig}  
                                        onChange= {(e)=>this.setState({thd_iig  : e.target.value})} ></Input>
                            </div> 
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'HCA Amt',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {hca_amt}  
                                onChange= {(e)=>this.setState({hca_amt  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {hca_curr}  
                                        onChange= {(e)=>this.setState({hca_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'IIG',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {hca_iig}  
                                        onChange= {(e)=>this.setState({hca_iig  : e.target.value})} ></Input>
                            </div> 
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'BAF Amt',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {baf_amt}  
                                onChange= {(e)=>this.setState({baf_amt  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {baf_curr}  
                                        onChange= {(e)=>this.setState({baf_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'IIG',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {baf_iig}  
                                        onChange= {(e)=>this.setState({baf_iig  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'THO Amt',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {tho_amt}  
                                onChange= {(e)=>this.setState({tho_amt  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {tho_curr}  
                                        onChange= {(e)=>this.setState({tho_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'IIG',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {tho_iig}  
                                        onChange= {(e)=>this.setState({tho_iig  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'ACO Amt',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {aco_amt}  
                                onChange= {(e)=>this.setState({aco_amt  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {aco_curr}  
                                        onChange= {(e)=>this.setState({aco_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'IIG',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {aco_iig}  
                                        onChange= {(e)=>this.setState({aco_iig  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'BUC Amt',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {buc_amt}  
                                onChange= {(e)=>this.setState({buc_amt  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {buc_curr}  
                                        onChange= {(e)=>this.setState({buc_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'IIG',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {buc_iig}  
                                        onChange= {(e)=>this.setState({buc_iig  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'TAD Amt',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {tad_amt}  
                                onChange= {(e)=>this.setState({tad_amt  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {tad_curr}  
                                        onChange= {(e)=>this.setState({tad_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'IIG',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {tad_iig}  
                                        onChange= {(e)=>this.setState({tad_iig  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'MTD Amt',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {mtd_amt}  
                                onChange= {(e)=>this.setState({mtd_amt  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {mtd_curr}  
                                        onChange= {(e)=>this.setState({mtd_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'IIG',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {mtd_iig}  
                                        onChange= {(e)=>this.setState({mtd_iig  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'IFP Amt',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {ifp_amt}  
                                onChange= {(e)=>this.setState({ifp_amt  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {ifp_curr}  
                                        onChange= {(e)=>this.setState({ifp_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'IIG',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {ifp_iig}  
                                        onChange= {(e)=>this.setState({ifp_iig  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'PSS Amt',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {pss_amt}  
                                onChange= {(e)=>this.setState({pss_amt  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {pss_curr}  
                                        onChange= {(e)=>this.setState({pss_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'IIG',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {pss_iig}  
                                        onChange= {(e)=>this.setState({pss_iig  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'SCC Amt',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {scc_amt}  
                                onChange= {(e)=>this.setState({scc_amt  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {scc_curr}  
                                        onChange= {(e)=>this.setState({scc_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'IIG',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {scc_iig}  
                                        onChange= {(e)=>this.setState({scc_iig  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'CAF Amt',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {caf_amt}  
                                onChange= {(e)=>this.setState({caf_amt  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {caf_curr}  
                                        onChange= {(e)=>this.setState({caf_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'IIG',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {caf_iig}  
                                        onChange= {(e)=>this.setState({caf_iig  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'OLF Amt',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {olf_amt}  
                                onChange= {(e)=>this.setState({olf_amt  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {olf_curr}  
                                        onChange= {(e)=>this.setState({olf_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'IIG',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {olf_iig}  
                                        onChange= {(e)=>this.setState({olf_iig  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'SEP Amt',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {sep_amt}  
                                onChange= {(e)=>this.setState({sep_amt  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {sep_curr}  
                                        onChange= {(e)=>this.setState({sep_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'IIG',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {sep_iig}  
                                        onChange= {(e)=>this.setState({sep_iig  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'CSF Amt',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {csf_amt}  
                                onChange= {(e)=>this.setState({csf_amt  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {csf_curr}  
                                        onChange= {(e)=>this.setState({csf_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'IIG',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {csf_iig}  
                                        onChange= {(e)=>this.setState({csf_iig  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'ONC Amt',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {onc_amt}  
                                onChange= {(e)=>this.setState({onc_amt  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {onc_curr}  
                                        onChange= {(e)=>this.setState({onc_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'IIG',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {onc_iig}  
                                        onChange= {(e)=>this.setState({onc_iig  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'DGCO Amt',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {dgco_amt}  
                                onChange= {(e)=>this.setState({dgco_amt  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {dgco_curr}  
                                        onChange= {(e)=>this.setState({dgco_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'IIG',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {dgco_iig}  
                                        onChange= {(e)=>this.setState({dgco_iig  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'DLF Amt',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {dlf_amt}  
                                onChange= {(e)=>this.setState({dlf_amt  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {dlf_curr}  
                                        onChange= {(e)=>this.setState({dlf_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'IIG',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {dlf_iig}  
                                        onChange= {(e)=>this.setState({dlf_iig  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'FSO Amt',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {fso_amt}  
                                onChange= {(e)=>this.setState({fso_amt  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {fso_curr}  
                                        onChange= {(e)=>this.setState({fso_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'IIG',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {fso_iig}  
                                        onChange= {(e)=>this.setState({fso_iig  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'DGP Amt',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {dgp_amt}  
                                onChange= {(e)=>this.setState({dgp_amt  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {dgp_curr}  
                                        onChange= {(e)=>this.setState({dgp_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'IIG',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {dgp_iig}  
                                        onChange= {(e)=>this.setState({dgp_iig  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'THO Amt',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {tho_amt}  
                                onChange= {(e)=>this.setState({tho_amt  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {tho_curr}  
                                        onChange= {(e)=>this.setState({tho_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'IIG',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {tho_iig}  
                                        onChange= {(e)=>this.setState({tho_iig  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'FSD Amt',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {fsd_amt}  
                                onChange= {(e)=>this.setState({fsd_amt  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {fsd_curr}  
                                        onChange= {(e)=>this.setState({fsd_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'IIG',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {fsd_iig}  
                                        onChange= {(e)=>this.setState({fsd_iig  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'OOG Amt',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {oog_amt}  
                                onChange= {(e)=>this.setState({oog_amt  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {oog_curr}  
                                        onChange= {(e)=>this.setState({oog_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'IIG',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {oog_iig}  
                                        onChange= {(e)=>this.setState({oog_iig  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'Lump Sum1',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {lump_sum1}  
                                onChange= {(e)=>this.setState({lump_sum1  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {lump_sum1_curr}  
                                        onChange= {(e)=>this.setState({lump_sum1_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'Sum Mc1',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {sum_mc1}  
                                onChange= {(e)=>this.setState({sum_mc1  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {sum_mc1_curr}  
                                        onChange= {(e)=>this.setState({sum_mc1_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'Sum Mc2',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {sum_mc2}  
                                onChange= {(e)=>this.setState({sum_mc2  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {sum_mc2_curr}  
                                        onChange= {(e)=>this.setState({sum_mc2_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'Sum Pc1',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {sum_pc1}  
                                onChange= {(e)=>this.setState({sum_pc1  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {sum_pc1_curr}  
                                        onChange= {(e)=>this.setState({sum_pc1_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'Sum Pc2',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {sum_pc2}  
                                onChange= {(e)=>this.setState({sum_pc2  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {sum_pc2_curr}  
                                        onChange= {(e)=>this.setState({sum_pc2_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'Sum Oc1',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {sum_oc1}  
                                onChange= {(e)=>this.setState({sum_oc1  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {sum_oc1_curr}  
                                        onChange= {(e)=>this.setState({sum_oc1_curr  : e.target.value})} ></Input>
                            </div>
                            <div className = "col-md-2 space-margin"  >
                          <Label  className = "fontstyle normal-font" > {onChangeLanguage(locale,'Sum Oc2',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                value = {sum_oc2}  
                                onChange= {(e)=>this.setState({sum_oc2  : e.target.value})} ></Input>
                            </div>
                           <div className = "col-md-2 space-margin"  >
                           <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Curr',languageData)}</Label>
                                <Input  className = "fontstyle text-background"
                                        value = {sum_oc2_curr}  
                                        onChange= {(e)=>this.setState({sum_oc2_curr  : e.target.value})} ></Input>
                            </div>
                         </div>
                     </div>  */}
                   {audit_complete === true &&  <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                     <div className = "publish-title" >
                          <Row>
                              <Colxx xxs="12">
                                  <Label  className = "fontstyle" 
                                  style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'Freight Audit Information',languageData)}</Label>
                                  
                              </Colxx>
                          </Row>
                          </div>
                        
                    <div className = "row" style = {{padding:'10px'}}>
                        <div className = "col-md-2 space-margin"  >
                             <div  style = {{marginTop:'16px'}}> 
                           {/* <Checkbox color="blue" checked = {'Export'} onChange = {(e)=>this.setState({exportch1:e.target.checked})}> 
                               <Label style = {{marginLeft:'5px'}} className = "fontstyle normal-font" >{onChangeLanguage(locale,'Export',languageData)}</Label>
                           </Checkbox> */}
                           <CustomRadioButton checked  = "Export" name ={onChangeLanguage(locale,'Export',languageData)} value = {exportch1} 
                                            onChangeRadio={(value)=>this.setState({exportch1:value})}/>
                           </div>
                        </div>
                        <div className = "col-md-2 space-margin"  >
                             <div  style = {{marginTop:'16px'}}> 
                           {/* <Checkbox color="blue" checked = {'Import'} onChange = {(e)=>this.setState({exportch1:e.target.checked})}> 
                               <Label style = {{marginLeft:'5px'}} className = "fontstyle normal-font" >{onChangeLanguage(locale,'Import',languageData)}</Label>
                           </Checkbox> */}
                           <CustomRadioButton checked  = "Import" name ={onChangeLanguage(locale,'Import',languageData)} 
                           value = {exportch1} 
                           onChangeRadio={(value)=>this.setState({exportch1:value})}/>
                           </div>
                        </div>
                        
                    </div>
                     {exportch1=== 'Export' &&<div className = "row" style = {{padding:'10px'}}>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Date',languageData)}
                            <br></br>{moment(new Date()).format('MM/DD/YYYY')}</Label>
                            {/* <Input className = "fontstyle text-background" data-date-format='mm/dd/yy'
                                type="date"
                                value = {export_date}  
                                onChange= {(e)=>this.setState({export_date  : e.target.value})} ></Input> */}
                                 
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Auditor',languageData)}
                                <br></br>{export_auditor}</Label>
                            {/* <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {export_auditor}  
                            onChange= {(e)=>this.setState({export_auditor : e.target.value})} 
                            /> */}
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Quality',languageData)}</Label>
                                <Select  
                                    style={{height:'85px'}}
                                    className="react-select fontstyle"
                                    classNamePrefix="react-select"
                                    name="form-field-name"
                                    value={exportqualitydata.filter(option =>option.value === export_quality)}
                                    options={exportqualitydata}
                                    onChange={this.handleexportaudit}
                                    // onChange={({value}) => this.setState({  export_quality: value })}
                                />
                         </div>
                         {getValue(exportqualitydata,'value','label',export_quality) === "ERROR"  &&
                         <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Type',languageData)}</Label>
                            <Select  
                                    style={{height:'85px'}}
                                    className="react-select fontstyle"
                                    classNamePrefix="react-select"
                                    name="form-field-name"
                                    value={exporterrortypeData.filter(option =>option.value === export_errortype)}
                                    options={exporterrortypeData}
                                    onChange={({value}) => this.setState({  export_errortype: value })}
                                />
                        </div>
                        }
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Remark',languageData)}</Label>
                            <Input className = "fontstyle text-background"  
                                placeholder = ''
                                value = {export_remark}  
                                onChange= {(e)=>this.setState({export_remark : e.target.value})}
                                /> 
                            </div>
                           
                    </div>
                    }
                     {exportch1=== 'Import' &&<div className = "row" style = {{padding:'10px'}}>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Date',languageData)}
                            <br></br>{moment(new Date()).format('MM/DD/YYYY')}</Label>
                            {/* <Input className = "fontstyle text-background" data-date-format='mm/dd/yy'
                                type="date"
                                value = {import_date}  
                                onChange= {(e)=>this.setState({import_date  : e.target.value})} ></Input> */}
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >
                                {onChangeLanguage(locale,'Auditor',languageData)}
                                <br></br>{import_auditor}</Label>
                            {/* <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {import_auditor}  
                            onChange= {(e)=>this.setState({import_auditor : e.target.value})} 
                            /> */}
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Quality',languageData)}</Label>
                                <Select  
                                    style={{height:'85px'}}
                                    className="react-select fontstyle"
                                    classNamePrefix="react-select"
                                    name="form-field-name"
                                    value={qualityimportdata.filter(option =>option.value === import_quality)}
                                    options={qualityimportdata}
                                    onChange={this.handleimportaudit}
                                    // onChange={({value}) => this.setState({  import_quality: value })}
                                />
                         </div>
                         {getValue(qualityimportdata,'value','label',import_quality) === "ERROR" &&
                         <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Error Type',languageData)}</Label>
                            <Select  
                                    style={{height:'85px'}}
                                    className="react-select fontstyle"
                                    classNamePrefix="react-select"
                                    name="form-field-name"
                                    value={exporterrortypeData.filter(option =>option.value === import_errortype)}
                                    options={exporterrortypeData}
                                    onChange={({value}) => this.setState({  import_errortype: value })}
                                />
                        </div>
                    }
                        <div className = "col-lg-2-0 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Remark',languageData)}</Label>
                            <Input className = "fontstyle text-background"  
                                placeholder = ''
                                value = {import_remark}  
                                onChange= {(e)=>this.setState({import_remark : e.target.value})}
                                 /> 
                            </div>
                           
                    </div>
                    }
                    
                    <div className = "row" style = {{padding:'10px'}}>
                    {exportch1=== 'Export' && <div className = "col-md-2 space-margin"  >
                             <div  style = {{marginTop:'16px'}}> 
                           <Checkbox color="blue" checked = {feedback_export} 
                           onChange = {(e)=>this.setState({feedback_export:e.target.checked})}> 
                               <Label style = {{marginLeft:'5px'}} className = "fontstyle normal-font" >{onChangeLanguage(locale,'Feedback Export',languageData)}</Label>
                           </Checkbox>
                           </div>
                        </div>
                    }
                    {exportch1=== 'Import' &&
                        <div className = "col-md-2 space-margin"  >
                        <div  style = {{marginTop:'16px'}}> 
                           <Checkbox color="blue" checked = {feedback_import} onChange = {(e)=>this.setState({feedback_import:e.target.checked})}> 
                               <Label style = {{marginLeft:'5px'}} className = "fontstyle normal-font" >{onChangeLanguage(locale,'Feedback Import',languageData)}</Label>
                           </Checkbox>
                           </div>
                        </div>  
                    }  
                    </div>
                     </div> 
            }
            {getValue(exportqualitydata,'value','label',import_quality) === "ERROR" &&
                     <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                     <div className = "publish-title" >
                          <Row>
                              <Colxx xxs="12">
                                  <Label  className = "fontstyle" 
                                  style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'Change in USD',languageData)}</Label>
                                  
                              </Colxx>
                          </Row>
                          </div>
                    <div className = "row" style = {{padding:'10px'}}>
                    <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Overcharged',languageData)}</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {over_changed}  
                            onChange= {(e)=>this.setState({over_changed : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Undercharged',languageData)}</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {under_changed}  
                            onChange= {(e)=>this.setState({under_changed : e.target.value})} 
                            />
                        </div>
                    </div>
                    </div>
                 }
                 {getValue(exportqualitydata,'value','label',export_quality) === "ERROR" &&
                 <div className = "publishuser-card-component" style = {{borderRadius:'10px',marginBottom:'30px'}}>
                     <div className = "publish-title" >
                          <Row>
                              <Colxx xxs="12">
                                  <Label  className = "fontstyle" 
                                  style = {{fontWeight:700,fontSize:'15px'}}>{onChangeLanguage(locale,'Change in USD',languageData)}</Label>
                                  
                              </Colxx>
                          </Row>
                          </div>
                    <div className = "row" style = {{padding:'10px'}}>
                    <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Overcharged',languageData)}</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {over_changed}  
                            onChange= {(e)=>this.setState({over_changed : e.target.value})} 
                            />
                        </div>
                        <div className = "col-lg-2-0 space-margin"  >
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Undercharged',languageData)}</Label>
                            <Input  className = "fontstyle text-background"  
                            placeholder = ''
                            value = {under_changed}  
                            onChange= {(e)=>this.setState({under_changed : e.target.value})} 
                            />
                        </div>
                    </div>
                    </div>
                 }
                     <div className = "publishuser-card-component" style = {{padding:'10px',borderRadius:'10px',marginBottom:'30px'}}>
                     <div className = "row">
                        <div className = "col-md-12 space-margin">
                            <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Comment',languageData)}</Label>
                            <textarea className = "fontstyle textarea-background"  
                                placeholder = ''
                                value = {comment}  
                                onChange= {(e)=>this.setState({comment : e.target.value})}
                                 /> 
                            </div>
                        <div className = "col-md-12 space-margin"  >
                        <Label  className = "fontstyle normal-font" >{onChangeLanguage(locale,'Action Party',languageData)}</Label>
                             <div  style = {{marginTop:'5px'}}> 
                           <Checkbox color="blue" checked = {is_sales} onChange = {(e)=>this.setState({is_sales:e.target.checked})}> 
                               <Label style = {{marginLeft:'5px',marginRight: '11px'}} className = "fontstyle normal-font" >
                                   {onChangeLanguage(locale,'Sales',languageData)}</Label>
                           </Checkbox>
                           <Checkbox color="blue" checked = {is_csb} onChange = {(e)=>this.setState({is_csb:e.target.checked})}> 
                               <Label style = {{marginLeft:'5px',marginRight: '11px'}} className = "fontstyle normal-font" >
                                   {onChangeLanguage(locale,'CSB',languageData)}</Label>
                           </Checkbox>
                           <Checkbox color="blue" checked = {is_csd} onChange = {(e)=>this.setState({is_csd:e.target.checked})}> 
                               <Label style = {{marginLeft:'5px',marginRight: '11px'}} className = "fontstyle normal-font" >
                                   {onChangeLanguage(locale,'CSD',languageData)}</Label>
                           </Checkbox>
                           <Checkbox color="blue" checked = {is_csi} onChange = {(e)=>this.setState({is_csi:e.target.checked})}> 
                               <Label style = {{marginLeft:'5px',marginRight: '11px'}} className = "fontstyle normal-font" >
                                   {onChangeLanguage(locale,'CSI',languageData)}</Label>
                           </Checkbox> <Checkbox color="blue" checked = {is_tm} onChange = {(e)=>this.setState({is_tm:e.target.checked})}> 
                               <Label style = {{marginLeft:'5px',marginRight: '11px'}} className = "fontstyle normal-font" >
                                   {onChangeLanguage(locale,'TM',languageData)}</Label>
                           </Checkbox>
                           <Checkbox color="blue" checked = {is_cp} onChange = {(e)=>this.setState({is_cp:e.target.checked})}> 
                               <Label style = {{marginLeft:'5px',marginRight: '11px'}} className = "fontstyle normal-font" >
                                   {onChangeLanguage(locale,'CP',languageData)}</Label>
                           </Checkbox>
                           <Checkbox color="blue" checked = {is_cc} onChange = {(e)=>this.setState({is_cc:e.target.checked})}> 
                               <Label style = {{marginLeft:'5px',marginRight: '11px'}} className = "fontstyle normal-font" >
                                   {onChangeLanguage(locale,'CC',languageData)}</Label>
                           </Checkbox>
                           </div>
                        </div>
                    </div>
                    <div className = "row text-center">
                    <Button className = "button-width" color="primary"  style={{}}
                               onClick = {()=>this.fetctPrevShipmentdetails(shipment_no)}
                                > <i className="simple-icon-control-start" style = {{}} /></Button>
                            <Button className = "button-width" color="primary"  style={{}}
                                 onClick={()=>this.clearvalue()}
                                >{onChangeLanguage(locale,'Refresh',languageData)}</Button>
                                <Button className = "button-width" color="primary"  style={{}}
                                onClick={()=>this.fetctNextShipmentdetails(shipment_no)}
                                >
                                    <i className="simple-icon-control-end" style = {{}} />
                                </Button>
                        <Button className = "button-width" color="primary"  style={{width:'150px'}}
                          onClick={()=>this.onSubmit()}
                          >{onChangeLanguage(locale,'Save',languageData)}</Button> 
                 </div>
                </div>  
            </div>
            {this.rendershipementdetails()}
          </>
        )
    }
    nextTitle(idx, arr) {
        var i = idx + 1;
        var i = i % arr.length;
        return arr[i].shipment_no;
        
      }
      prevTitle(idx, arr) {
                    
        if (idx === 0) {
          var i = arr.length -1;
        } else {
          var i = idx -1;
        }
        
        return arr[i].shipment_no;
      }
    rendershipementdetails()
    {
        const {languageData,locale} = this.props
        const {modalOpen} = this.state
        return (
            <Modal
              isOpen={modalOpen}
              toggle={()=>this.closeModal()}
              wrapClassName="modal-right"
              backdrop="static"
            >
              <ModalHeader className = "fontstyle"  toggle={()=>this.closeModal()}>
                  {onChangeLanguage(locale,'Shipment Details',languageData)}
              </ModalHeader>
              <ModalBody>
               
              </ModalBody>
             
            </Modal>
          );
    }
}

const mapStateToProps = ({ settings }) => {
    const { locale,languageData,username} = settings;
    return {locale, languageData,username};
  };
  export default withRouter(
    connect(mapStateToProps, {
        setContainerClassnamesAction: setContainerClassnames,

   })(QueryResolveSheet)
  );

