
export const getValue_Inputaudit  = (str)=>
{
  var record = {
    shipment_no:'',
    mtd_no:'',
    customer:'',
    medium:'',
    mtd_processed_date:'',
    main_pod:'',
    input_id:'',
    team:'',
  }
  var res = str.split('\t');
  
  if(res.length > 0)
  {
    record.shipment_no = res[0] 
  }
  if(res.length > 2)
  {
    record.customer = res[2] 
  }
 
  if(res.length > 1)
  {
    record.mtd_no = res[1] 
  }
  if(res.length > 3)
  {
    record.medium = res[3] 
  }
  if(res.length > 4)
  {
    record.mtd_processed_date = res[4] 
  }
  if(res.length > 5)
  {
    record.main_pod = res[5] 
  }
  if(res.length > 6)
  {
    record.input_id = res[6] 
  }
  if(res.length > 7)
  {
    record.team = res[7] 
  }
  return record
}

export const getValue_Surprise  = (str)=>
{
  var record = {
    shipment_no:'',
    mtd_no:'',
    customer:'',
    correcter_id:'',
    main_pod:'',
    team:'',
    region:'',
    amd_type:'',
    received_datetime:'',
    req_type:'',
    remarks:'',
    correction_remarks:''
  }
  var res = str.split('\t');
  
  if(res.length > 0)
  {
    record.shipment_no = res[0] 
  }
  if(res.length > 2)
  {
    record.customer = res[2] 
  }
 
  if(res.length > 1)
  {
    record.mtd_no = res[1] 
  }
  if(res.length > 3)
  {
    record.correcter_id = res[3] 
  }
  if(res.length > 4)
  {
    record.team = res[4] 
  }
  if(res.length > 5)
  {
    record.region = res[5] 
  }
  if(res.length > 6)
  {
    record.req_type = res[6] 
  }
  if(res.length > 10)
  {
    record.received_datetime = res[10] 
  }
  if(res.length > 7)
  {
    record.amd_type = res[7] 
  }
  if(res.length > 8)
  {
    record.remarks = res[8] 
  }
  if(res.length > 9)
  {
    record.correction_remarks = res[9] 
  }
  return record
}
export const getValue_SDEMWithdrawn  = (str)=>
{
  var record = {
    exception_issuedate:'',
    mtd_no:'',
    exception_no:'',
    subregion:'',
    errorcode_group:'',
    errorcode:'',
    receiver:'',
    area:'',
    end_datetime:'',
    region:'',
    error:'',
    user_of_lastaction:'',
    auditor_id:'',
    auditor_remarks:'',
    capture_user:'',
    shipper:'',
    tl_acceptance:'',
    tl_remarks:'',
    solvedby_capture_user:'',
    exception_status:'',
    performed_action:'',
    dod:'',
    issue_description:'',
  }
  var res = str.split('\t');
  
  if(res.length > 0)
  {
    record.exception_issuedate = res[0] 
  }
  if(res.length > 1)
  {
    record.exception_no = res[1] 
  }
 
  if(res.length > 2)
  {
    record.mtd_no = res[2] 
  }
  if(res.length > 3)
  {
    record.region = res[3] 
  }
  if(res.length > 4)
  {
    record.subregion = res[4] 
  }
  if(res.length > 5)
  {
    record.area = res[5] 
  }
  if(res.length > 6)
  {
    record.errorcode_group = res[6] 
  }
  if(res.length > 7)
  {
    record.errorcode = res[7] 
  }
  if(res.length > 8)
  {
    record.receiver = res[8] 
  }
 
  if(res.length > 9)
  {
    record.user_of_lastaction = res[9] 
  }
  if(res.length > 10)
  {
    record.capture_user = res[10] 
  }
  if(res.length > 11)
  {
    record.solvedby_capture_user = res[11] 
  }
  if(res.length > 12)
  {
    record.exception_status = res[12] 
  }
  if(res.length > 13)
  {
    record.performed_action = res[13] 
  }
  if(res.length > 14)
  {
    record.issue_description = res[14] 
  }
  if(res.length > 15)
  {
    record.dod = res[15] 
  }
  return record
}
export const getValue_MatchCodeAudit  = (str)=>
{
  var record = {
    shipment_no:'',
    mtd_no:'',
    customer:'',
    mtd_processed_date:'',
    main_pol:'',
    main_pod:'',
    input_id:'',
    team:'',
    correct_matchcode:'',
    cnee:'',
    end_datetime:'',
    error:'',
    category:'',
    subcategory:'',
    auditor_id:'',
    auditor_remarks:'',
    tl_acceptance:'',
    tl_remarks:'',
  }
  var res = str.split('\t');
  
  if(res.length > 0)
  {
    record.shipment_no = res[0] 
  }
  if(res.length > 1)
  {
    record.mtd_no = res[1] 
  }
 
  if(res.length > 2)
  {
    record.customer = res[2] 
  }
  if(res.length > 3)
  {
    record.mtd_processed_date = res[3] 
  }
  if(res.length > 4)
  {
    record.main_pol = res[4] 
  }
  if(res.length > 5)
  {
    record.main_pod = res[5] 
  }
  if(res.length > 6)
  {
    record.input_id = res[6] 
  }
  if(res.length > 7)
  {
    record.team = res[7] 
  }
  if(res.length > 8)
  {
    record.correct_matchcode = res[8] 
  }
  if(res.length > 9)
  {
    record.cnee = res[9] 
  }
  return record
}
export const getValue_Destination  = (str)=>
{
  var record = {
    shipment_no:'',
    mtd_no:'',
    customer:'',
    mtd_processed_date:'',
    main_pol:'',
    main_pod:'',
    input_id:'',
    origin_team:'',
    destination_team:'',
    end_datetime:'',
    error:'',
    category:'',
    subcategory:'',
    auditor_id:'',
    auditor_remarks:'',
    tl_acceptance:'',
    tl_remarks:'',
  }
  var res = str.split('\t');
  
  if(res.length > 0)
  {
    record.shipment_no = res[0] 
  }
  if(res.length > 2)
  {
    record.customer = res[2] 
  }
 
  if(res.length > 1)
  {
    record.mtd_no = res[1] 
  }
  if(res.length > 3)
  {
    record.mtd_processed_date = res[3] 
  }
  if(res.length > 4)
  {
    record.main_pol = res[4] 
  }
  if(res.length > 5)
  {
    record.main_pod = res[5] 
  }
  if(res.length > 6)
  {
    record.input_id = res[6] 
  }
  if(res.length > 7)
  {
    record.origin_team = res[7] 
  }
  if(res.length > 8)
  {
    record.destination_team = res[8] 
  }
  return record
}
export const getValue_ErrorCode  = (str)=>
{
  var record = {
    exception_issuedate:'',
            mtd_no:'',
            exception_no:'',
            subregion:'',
            errorcode_group:'',
            errorcode:'',
            receiver:'',
            area:'',
            end_datetime:'',
            region:'',
            error:'',
            user_of_lastaction:'',
            auditor_id:'',
            auditor_remarks:'',
            capture_user:'',
            shipper:'',
            tl_acceptance:'',
            tl_remarks:'',
            solvedby_capture_user:'',
            exception_status:'',
            performed_action:'',
            dod:'',
            issue_description:'',
  }
  var res = str.split('\t');
  
  if(res.length > 0)
  {
    record.exception_issuedate = res[0] 
  }
  if(res.length > 1)
  {
    record.exception_no = res[1] 
  }
 
  if(res.length > 2)
  {
    record.mtd_no = res[2] 
  }
  if(res.length > 3)
  {
    record.region = res[3] 
  }
  if(res.length > 4)
  {
    record.subregion = res[4] 
  }
  if(res.length > 5)
  {
    record.area = res[5] 
  }
  if(res.length > 6)
  {
    record.errorcode_group = res[6] 
  }
  if(res.length > 7)
  {
    record.errorcode = res[7] 
  }
  if(res.length > 8)
  {
    record.receiver = res[8] 
  }
 
  if(res.length > 9)
  {
    record.user_of_lastaction = res[9] 
  }
  if(res.length > 10)
  {
    record.capture_user = res[10] 
  }
  if(res.length > 11)
  {
    record.solvedby_capture_user = res[11] 
  }
  if(res.length > 12)
  {
    record.exception_status = res[12] 
  }
  if(res.length > 13)
  {
    record.performed_action = res[13] 
  }
  if(res.length > 14)
  {
    record.issue_description = res[14] 
  }
  if(res.length > 15)
  {
    record.dod = res[15] 
  }
  return record
}
export const getValue_MAF  = (str)=>
{
  var record = {
            shipment_no:'',
            mtd_no:'',
            customer:'',
            corrector_id:'',
            charge_applicable:'',
            standardcomment:'',
            maf_applicable:'',
            end_datetime:'',
            chargecode:'',
            error:'',
            sob_date:'',
            subcategory_comment:'',
            auditor_id:'',
            auditor_remarks:'',
            tl_acceptance:'',
            tl_remarks:'',
            first_received_date:'',
            second_received_date:'',
            third_received_date:'',
            fourth_received_date:'',
            fifth_received_date:'',
            sixth_received_date:'',
            seventh_received_date:'',
            maf_xnx:'',
            maf_procedure:'',
  }
  var res = str.split('\t');
  
  if(res.length > 0)
  {
    record.mtd_no = res[0] 
  }
  if(res.length > 1)
  {
    record.sob_date = res[1] 
  }
 
  if(res.length > 2)
  {
    record.customer = res[2] 
  }
  if(res.length > 3)
  {
    record.first_received_date = res[3] 
  }
  if(res.length > 4)
  {
    record.second_received_date = res[4] 
  }
  if(res.length > 5)
  {
    record.third_received_date = res[5] 
  }
  if(res.length > 6)
  {
    record.fourth_received_date = res[6] 
  }
  if(res.length > 7)
  {
    record.fifth_received_date = res[7] 
  }
  if(res.length > 8)
  {
    record.sixth_received_date = res[8] 
  }
  if(res.length > 9)
  {
    record.seventh_received_date = res[9] 
  }
  if(res.length > 10)
  {
    record.shipment_no = res[10] 
  }
  if(res.length > 11)
  {
    record.maf_xnx = res[11] 
  }
  if(res.length > 12)
  {
    record.maf_procedure = res[12] 
  }
  return record
}
export const getValue_1stInstance  = (str)=>
{
  var record = {
    exception_issuedate:'',
            mtd_no:'',
            exception_no:'',
            subregion:'',
            errorcode_group:'',
            errorcode:'',
            receiver:'',
            area:'',
            end_datetime:'',
            region:'',
            error:'',
            user_of_lastaction:'',
            auditor_id:'',
            auditor_remarks:'',
            capture_user:'',
            shipper:'',
            tl_acceptance:'',
            tl_remarks:'',
            solvedby_capture_user:'',
            exception_status:'',
            performed_action:'',
            dod:'',
            issue_description:'',
  }
  var res = str.split('\t');
  
  if(res.length > 0)
  {
    record.exception_issuedate = res[0] 
  }
  if(res.length > 1)
  {
    record.exception_no = res[1] 
  }
 
  if(res.length > 2)
  {
    record.mtd_no = res[2] 
  }
  if(res.length > 3)
  {
    record.region = res[3] 
  }
  if(res.length > 4)
  {
    record.subregion = res[4] 
  }
  if(res.length > 5)
  {
    record.area = res[5] 
  }
  if(res.length > 6)
  {
    record.errorcode_group = res[6] 
  }
  if(res.length > 7)
  {
    record.errorcode = res[7] 
  }
  if(res.length > 8)
  {
    record.receiver = res[8] 
  }
 
  if(res.length > 9)
  {
    record.user_of_lastaction = res[9] 
  }
  if(res.length > 10)
  {
    record.capture_user = res[10] 
  }
  if(res.length > 11)
  {
    record.solvedby_capture_user = res[11] 
  }
  if(res.length > 12)
  {
    record.exception_status = res[12] 
  }
  if(res.length > 13)
  {
    record.performed_action = res[13] 
  }
  if(res.length > 14)
  {
    record.issue_description = res[14] 
  }
  if(res.length > 15)
  {
    record.dod = res[15] 
  }
  return record
}
export const getValue_OtherAudit1 = (str)=>
{
  var record = {
    shipment_no:'',
    mtd_no:'',
    customer:'',
    medium:'',
    main_pol:'',
    main_pod:'',
    input_id:'',
    team:'',
  }
  var res = str.split('\t');
  
  if(res.length > 0)
  {
    record.shipment_no = res[0] 
  }
  if(res.length > 2)
  {
    record.customer = res[2] 
  }
 
  if(res.length > 1)
  {
    record.mtd_no = res[1] 
  }
  if(res.length > 3)
  {
    record.medium = res[3] 
  }
  if(res.length > 4)
  {
    record.main_pol = res[4] 
  }
  if(res.length > 5)
  {
    record.main_pod = res[5] 
  }
  if(res.length > 6)
  {
    record.input_id = res[6] 
  }
  if(res.length > 7)
  {
    record.team = res[7] 
  }
  return record
}
export const getValue_OtherAudit2 = (str)=>
{
  var record = {
            shipment_no:'',
            mtd_no:'',
            customer:'',
            user_id:'',
            req_type:'',
            amd_type:'',
            maf_added:'',
            team:'',
            region:'',
            error:'',
            correction_remarks:'',
            auditor_id:'',
            auditor_remarks:'',
            received_datetime:'',
            shipper:'',
            tl_acceptance:'',
            tl_remarks:'',
  }
  var res = str.split('\t');
  
  if(res.length > 0)
  {
    record.shipment_no = res[0] 
  }
  if(res.length > 1)
  {
    record.customer = res[1] 
  }
 
  if(res.length > 2)
  {
    record.mtd_no = res[2] 
  }
  if(res.length > 3)
  {
    record.correcter_id = res[3] 
  }
  if(res.length > 4)
  {
    record.team = res[4] 
  }
  if(res.length > 5)
  {
    record.region = res[5] 
  }
  if(res.length > 6)
  {
    record.req_type = res[6] 
  }
  if(res.length > 7)
  {
    record.amd_type = res[7] 
  }
  if(res.length > 8)
  {
    record.maf_added = res[8] 
  }
  if(res.length > 12)
  {
    record.correction_remarks = res[12] 
  }
  if(res.length > 13)
  {
    record.received_datetime = res[13] 
  }
  return record
}
