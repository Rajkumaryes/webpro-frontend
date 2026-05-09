import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,FA,apiUrlFA} from '../../../constants/defaultValues';
import {authHeader} from '../../../helpers/authheader';
import axios from 'axios';

export const ShipmentDetailsService = {
  fetchshipmentDetails,
  createshipmentDetails,
  updateshipmentDetails,
  deleteshipmentDetails,
  searchshipmentDetails,
  fileUpload,
  filternext,
  prevfilter,
  fetchshipmentcount
};
export function fetchshipmentcount(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlFA}${FA}shipmentdetails/shipmentdetailscount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchshipmentDetails() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlFA}${FA}shipmentdetails`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function createshipmentDetails(name,status) {
  const user_id = parseInt(localStorage.getItem('user_id'))

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ name,user_id,status})
};
return fetch(  `${apiUrlFA}${FA}shipmentDetails/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  
export function updateshipmentDetails(id,shipment_no,audit_complete,csbooking,office,contract_party,last_user,etd_first_vessel,
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
  user_id,updated_start_time,updated_end_time) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({shipment_no,audit_complete,csbooking,office,contract_party,last_user,etd_first_vessel,
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
      is_csd,is_csi,is_tm,is_cp,is_cc,subregion,service,rategroup,rate,status,created_at,
      updated_at,user_id,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrlFA}${FA}shipmentdetails/update/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  

function deleteshipmentDetails(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrlFA}${FA}shipmentDetails/delete/${id}`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
export function searchshipmentDetails(shipment_no) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ shipment_no})
};
return fetch(  `${apiUrlFA}${FA}shipmentdetails/search`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
export function fileUpload(file)
{
  let data = new FormData();
  data.append('formFile', file);
  var url = `${apiUrlFA}${FA}shipmentdetails/bulkupload`
  return axios.post(url, data, {
    headers: {
    'content-type': 'multipart/form-data',
    ...authHeader()
    }
    })
    .then(res => {
     return res
      
    })
    .catch()
         
}
export function filternext(shipment_no) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ shipment_no})
};
return fetch(  `${apiUrlFA}${FA}shipmentdetails/next`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
export function prevfilter(shipment_no) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ shipment_no})
};
return fetch(  `${apiUrlFA}${FA}shipmentdetails/previous`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  export default function* rootSaga() {
    yield all([
      fork(fetchshipmentDetails),
      fork(createshipmentDetails),
     fork(updateshipmentDetails),
     fork(deleteshipmentDetails),
      fork(fetchshipmentcount)
    ]);
  }
  