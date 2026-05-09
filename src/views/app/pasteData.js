
export const getValue_D1100 = (str)=>
{
 
  var record = 
   {
    type:'',
    location:'',
    sender_id:'',
    date:'',
    time:'',
    shipment_no:'',
    mtd_number:'',
    
  }
  var res = str.split('\t');
  if(res.length > 10)
  {
    record.shipment_no = res[10] 
  }
  if(res.length > 8)
  {
    record.type = res[8] 
  }
  if(res.length > 5)
  {
    record.location = res[5] 
  }
  if(res.length > 3)
  {
    record.sender_id = res[3] 
  }
  if(res.length > 6)
  {
    record.date = res[6] 
  }
  if(res.length > 7)
  {
    record.time = res[7] 
  }
  if(res.length > 10)
  {
    record.mtd_number = res[10] 
  }
  return record
}
export const getValue_S8100 = (str)=>
{
 
  var record = 
   {
    shipper_coder:'',
    mr_code:'', 
    consignee:'',
  }
  var res = str.split('\r\n');
  console.log("kjbkj S8100 =========> " , JSON.stringify(res))
  console.log("kjbkj S8100 length =========> " , JSON.stringify(res.length))
  if(res)
  {
    if(res.length > 0)
    {
      let filter_data = res.filter((item,index) => index !== 0)
      if(filter_data.length >0)
      {
        for(var i =0;i<filter_data.length;i++)
        {
           var MrCode_arr = filter_data[i].split('\t');
           for(var j =0;j<MrCode_arr.length;j++)
           {
              if((MrCode_arr[j]).toUpperCase() === 'MR')
              {
                record.mr_code = MrCode_arr[0]
              }
           }
           var shipper_arr = filter_data[i].split('\t');
           for(var k =0;k<shipper_arr.length;k++)
           {
              if((shipper_arr[k]).toUpperCase() === 'SH')
              {
                record.shipper_coder = shipper_arr[0]
              }
           }

           var consignee_arr = filter_data[i].split('\t');
           for(var l=0;l<consignee_arr.length;l++)
           {
              if((consignee_arr[l]).toUpperCase() === 'CN')
              {
                record.consignee = consignee_arr[0]
              }
           }
        }
      }
    }
  }

  return record
}

export const getValue_D1040  = (str)=>
{
 
  var record = {
    shipment_no:'',
    mtd_number:'',
    issuer:'',
    main_pod:'',
    doc_cutoff:'',
    aggregated_status:'',
    type:'',
    date:'',
    time:'',
    medium:'',
    bl:'',
    etd:'',
    main_pol:'',
    main_voyage:'',
    customer:'',
    pod_end:'',
    last_pod:'',
    numbers:'',
    dc_responsible:''
  }
  console.log("kjbkj str  =========> " , str)
  var res = str.split('\t');
  console.log("kjbkj tab split D1040 =========> " , JSON.stringify(res.length))
  console.log("kjbkj tab split D1040 =========> " , JSON.stringify(res))
  if(res.length > 22)
  {
    record.mtd_number = res[22]
    record.numbers = res[22]

  }
  if(res.length > 0)
  {
    record.shipment_no = res[0]
  }
  if(res.length > 3)
  {
    record.customer = res[3]
  }
  if(res.length > 3)
    {
      record.dc_responsible = res[9]
    }
  if(res.length > 52)
  {
    record.issuer = res[52]
  }
  if(res.length > 48)
  {
    record.main_pod = res[48]
  }
  if(res.length > 6)
  {
    record.doc_cutoff = res[6]
  }
  if(res.length > 10)
  {
    record.aggregated_status = res[10]
  }
  if(res.length > 11)
  {
    record.type = res[11]
  }
  if(res.length > 12)
  {
    record.date = res[12]
  }
  if(res.length > 14)
  {
    record.medium = res[14]
  }
  if(res.length > 25)
  {
    record.bl = res[25]
  }
  if(res.length > 42)
  {
    record.etd = res[42]
  }
  if(res.length > 46)
  {
    record.main_pol = res[46]
  }
  if(res.length > 47)
  {
    record.main_voyage = res[47]
  }
  if(res.length > 50)
  {
    record.pod_end = res[50]
  }
  if(res.length > 49)
  {
    record.last_pod = res[49]
  }
  if(res.length > 13)
  {
    record.time = res[13]
  }
  return record
}

export const getValue_E3100  = (str)=>
{
  
  var productivity_arr = []
  var array = str.split('\r\n')
  if(array)
  {
      var split_arr = array.filter(function (el) {
        return el != "";
      });
      console.log("kjbkj tab split split_arr =========> " , JSON.stringify(split_arr))
      console.log("kjbkj tab split split_arr_count =========> " , JSON.stringify(split_arr.length))
      for(var i = 0 ; i <split_arr.length;i++)
      {
        const list  = split_arr[i].split('\t')
        console.log("kjbkj tab split list =========> " , JSON.stringify(list))
        productivity_arr.push(getproductivity_dict(list,split_arr.length))
       
      }
    
  }
  console.log("kjbkj tab length productivity_arr length =========> " , JSON.stringify(productivity_arr.length))
  return productivity_arr
}

function getproductivity_dict(list,split_arr_count)
{
  var record = {
    total:split_arr_count.toString(),
    equipment_number:'',
    events_date:'',
    events:'',
    place_of_act:'',
    reference:'',
    issue_code:'',
    reported_by:'',
    q:'',
    issue_level:'',
    state:'',
    creation_date:'', 
    creation_time:'', 
    changed_by: '', 
    claimed_at:'', 
    claimed_by:'',
  }
  if(list.length >= 16)
  {
    record.equipment_number = list[0]
    record.events = list[1]
    record.events_date = list[2] + " " +list[3]
    record.place_of_act = list[4]
    record.reference = list[6]
    record.issue_code = list[7]
    record.reported_by = list[9]
    record.q = list[5]
    record.issue_level = list[8]
    record.state = list[10]
    record.creation_date = list[11]
    record.creation_time = list[12]
    record.changed_by = list[13]
    record.claimed_at = list[14]
    record.claimed_by = list[15]

  }
 return record
}

export const getValue_V2500_Vessle   = (str)=>
{
  var record = {
    vessel_name:'',
    ssy:'',
    schedule_voy:'',
    dp_voyage:'',
    ssy_class:'',
    dir:'',
    pol:'',
    departure_date:'',
    departure_actual:'',
    pod:'',
    arrival_date:'',
    arrival_actual:'',
    transit:'',
    booking_restr:'',
    auto_wo:'',
    vco_phase:'',
    vessel_operator:'',
    valid_state:'',
   
  }
  var res = str.split('\t');
  console.log("kjbkj tab split V2500_Vessle =========> " , JSON.stringify(res))
  if(res.length > 0)
  {
    record.dp_voyage = res[0]
  }
  if(res.length > 1)
  {
    record.vessel_name = res[1]
  }
  if(res.length > 2)
  {
    record.schedule_voy = res[2]
  }
  if(res.length > 3)
  {
    record.ssy = res[3]
  } 
  if(res.length > 4)
  {
    record.ssy_class = res[4]
  } 
  if(res.length > 5)
  {
    record.dir = res[5]
  } 
  if(res.length > 6)
  {
    record.pol = res[6]
  } 
   if(res.length > 7)
  {
    record.departure_date = res[7]
  }  
  if(res.length > 8)
  {
    record.departure_actual = res[8]
  } 
   if(res.length > 9)
  {
    record.pod = res[9]
  } 
   if(res.length > 10)
  {
    record.arrival_date = res[10]
  } 
  if(res.length > 11)
  {
    record.arrival_actual = res[11]
  } 
  if(res.length > 12)
  {
    record.transit = res[12]
  } 
  if(res.length > 13)
  {
    record.booking_restr = res[13]
  } 
  if(res.length > 14)
  {
    record.auto_wo = res[14]
  } 
  if(res.length > 15)
  {
    record.vco_phase = res[15]
  } 
  if(res.length > 16)
  {
    record.vessel_operator = res[16]
  } 
  if(res.length > 17)
  {
    record.valid_state = res[17]
  } 

  return record 

}
export const getValue_V2500_Port   = (str)=>
{
  var record = {
    departure_datetime:'',
    port:'',
    terminal:'',
    eta:'',
    pt:'',
    omit:'',
    call_sign:'',
    fcl_cutoff_date:'',
    fcl_cutoff_time:'',
    port_authorities_export:'',
    port_authorities_import:'',
    eventcode:'',
    late_early_hrs:'',
    delay_reason:'',
    delay_remark:'',
    coastal_arr_dif:'',
    coastal_dep_dif:'',
    tpfrep_exp:'',
    tpfrep_rec:'',
    port_arrival_actual:'',
    port_transit:'',
    port_departure_actual:'',


   
  }
  var res = str.split('\t');
  console.log("kjbkj tab split V2500_Port =========> " , JSON.stringify(res))
  if(res.length > 0)
  {
    record.port = res[0]
  }
  
 
  if(res.length > 1)
  {
    record.pt = res[1]
  }
  if(res.length > 2)
  {
    record.omit = res[2]
  }
  if(res.length > 3)
  {
    record.terminal = res[3]
  }
  if(res.length > 4)
  {
    record.call_sign = res[4]
  }
  if(res.length > 5)
  {
    record.port_transit = res[5]
  }
  if(res.length > 7)
  {
    record.eta = res[6] + " " + res[7]
  }
  if(res.length > 8)
  {
    record.port_arrival_actual = res[8]
  }  
  if(res.length > 10)
  {
    record.departure_datetime = res[9] + " " + res[10]
  }
  if(res.length > 11)
  {
    record.port_departure_actual = res[11]
  }
  if(res.length > 12)
  {
    record.fcl_cutoff_date = res[12]
  }
  if(res.length > 13)
  {
    record.fcl_cutoff_time = res[13]
  }
  if(res.length > 14)
  {
    record.port_authorities_export = res[14]
  }
  if(res.length > 15)
  {
    record.port_authorities_import = res[15]
  }
  if(res.length > 16)
  {
    record.eventcode = res[16]
  }
  if(res.length > 17)
  {
    record.late_early_hrs = res[17]
  }
  if(res.length > 18)
  {
    record.delay_reason = res[18]
  }
  if(res.length > 19)
  {
    record.delay_remark = res[19]
  }
  if(res.length > 20)
  {
    record.coastal_arr_dif = res[20]
  }
  if(res.length > 21)
  {
    record.coastal_dep_dif = res[21]
  }
  if(res.length > 22)
  {
    record.tpfrep_exp = res[22]
  }
  if(res.length > 23)
  {
    record.tpfrep_rec = res[23]
  }

 


  

  return record 

}
export const getValue_F3000   = (str)=>
{
 
  var time_arr = []
  var array = str.split('\r\n')
  if(array)
  {
      var split_arr = array.filter(function (el) {
        return el != "";
      });
      console.log("kjbkj tab split split_arr =========> " , JSON.stringify(split_arr))
      console.log("kjbkj tab split split_arr_count =========> " , JSON.stringify(split_arr.length))
      for(var i = 0 ; i <split_arr.length;i++)
      {
        const list  = split_arr[i].split('\t')
        console.log("kjbkj tab split list =========> " , JSON.stringify(list))
        time_arr.push(gettimePending(list,split_arr.length))
       
      }
    
  }
  console.log("kjbkj tab length time_arr length =========> " , JSON.stringify(time_arr.length))
  return time_arr

  
}
function gettimePending(res,split_arr_count)
{
  var record = {
    container_number:'',
    type:'',
    related_date:'',
    related_time:'',
    location:'',
    total:split_arr_count.toString(),
    start_date:'',
    shipment_no:'',
    missing_event:'',
    related_place:'',
    r:'',
    state:'',
    seq:'',
    hl:'',
    actual_type:'',
    charge:'',
    related_p:'',
    related_event:'',
    exp_imp:'',
    trigger_p:'',
    trigger_event:'',
    trigger_location:'',
    trigger_place:'',
    trigger_date:'',
    trigger_time:'',
    trigger_shipment:'',
    retrieval_run:'',
    processing_date:'',
    processing_time:'',
    claimed_by:'',
    responsible:'',
    comment:'',
    changed_by:'',
    last_change:'',
    kind:'',
    uni_id:'',


   
  }
  if(res.length > 0)
  {
    record.r = res[0]
  }
  if(res.length > 1)
  {
    record.state = res[1]
  }
  if(res.length > 2)
  {
    record.type = res[2]
  }
  if(res.length > 3)
  {
    record.missing_event = res[3]
  }
  if(res.length > 4)
  {
    record.shipment_no = res[4]
  }
  if(res.length > 5)
  {
    record.seq = res[5]
  }
  if(res.length > 6)
  {
    record.hl = res[6]
  }
  if(res.length > 7)
  {
    record.container_number = res[7]
  }
  if(res.length > 8)
  {
    record.actual_type = res[8]
  }
  if(res.length > 9)
  {
    record.charge = res[9]
  }
  if(res.length > 10)
  {
    record.related_p = res[10]
  }
  if(res.length > 11)
  {
    record.related_event = res[11]
  } 
  if(res.length > 12)
  {
    record.location = res[12]
  }
  if(res.length > 13)
  {
    record.related_place = res[13]
  }
  if(res.length > 14)
  {
    record.related_date = res[14]
  }
  if(res.length > 15)
  {
    record.related_time = res[15]
  }
  if(res.length > 16)
  {
    record.exp_imp = res[16]
  }
  if(res.length > 17)
  {
    record.trigger_p = res[17]
  }
  if(res.length > 18)
  {
    record.trigger_event = res[18]
  }
  if(res.length > 19)
  {
    record.trigger_location = res[19]
  }
  if(res.length > 20)
  {
    record.trigger_place = res[20]
  }
  if(res.length > 21)
  {
    record.trigger_date = res[21]
  }
  if(res.length > 22)
  {
    record.trigger_time = res[22]
  }
  if(res.length > 23)
  {
    record.trigger_shipment = res[23]
  }
  if(res.length > 24)
  {
    record.retrieval_run = res[24]
  }
  if(res.length > 25)
  {
    record.processing_date = res[25]
  }
  if(res.length > 26)
  {
    record.processing_time = res[26]
  }
  if(res.length > 27)
  {
    record.claimed_by = res[27]
  }
  if(res.length > 28)
  {
    record.responsible = res[28]
  }
  if(res.length > 29)
  {
    record.comment = res[29]
  }
  if(res.length > 30)
  {
    record.changed_by = res[30]
  }
  if(res.length > 31)
  {
    record.last_change = res[31]
  }
  if(res.length > 32)
  {
    record.kind = res[32]
  }
  if(res.length > 33)
  {
    record.uni_id = res[33]
  }
 
 
  return record

}


export const getValue_Z1910 = (str)=>
{
 
  var record = 
  {
    document_no:'',
    shipment_no:'',
    reason_code:'',
    eh_status:'',
    action_party:'',
    exception_no:'',
    issue_date:'',
    issueuser:'',
    issueorg:'',
    revierorg:'',
    usergroup:'',
    revierstatus:'',
  }
  var res = str.split('\t');
  console.log("kjbkj Z1910 =========> " , JSON.stringify(res))
 
  if(res.length > 0)
  {
    record.exception_no = res[0]
  }
  if(res.length > 2)
  {
    record.eh_status = res[2]
  }
  if(res.length > 3)
  {
    record.shipment_no = res[3]
  }
  if(res.length > 4)
  {
    record.document_no = res[4]
  }
  if(res.length > 5)
  {
    record.reason_code = res[5]
  }
  if(res.length > 6)
  {
    record.action_party = res[6]
  }
  if(res.length > 1)
  {
    record.issue_date = res[1]
  }
  if(res.length > 10)
  {
    record.issueuser = res[10]
  }
  if(res.length > 9)
  {
    record.issueorg = res[9]
  }
  if(res.length > 11)
  {
    record.revierorg = res[11]
  }
  if(res.length > 12)
  {
    record.usergroup = res[12]
  }
  if(res.length > 13)
  {
    record.revierstatus = res[13]
  }
 
  if(res.length > 5)
  {
    record.cr = res[5]
  }
  return record
}


export const getValue_S7220  = (str)=>
{
 
  var record = {
    arrival_mot:'', 
    container_number:'',
    pickup_number:'',
    lfd:'',
    termial:'',
    movement:'',
    location:'',
   
  }
  var res = str.split('\t');
  // console.log("kjbkj tab split D1040 =========> " , JSON.stringify(res.length))
  // console.log("kjbkj tab split D1040 =========> " , JSON.stringify(res))
  if(res.length > 37)
  {
    record.arrival_mot = res[37] 
  }
  if(res.length > 29)
  {
    record.container_number = res[29] 
  }
  if(res.length > 25)
  {
    record.pickup_number = res[25] 
  }
  if(res.length > 9)
  {
    record.lfd = res[9] 
  }
  if(res.length > 38)
  {
    record.termial = res[38] 
  }
  if(res.length > 24)
  {
    record.movement = res[24] 
  }
  if(res.length > 39)
  {
    record.location = res[39] 
  }
 
 
  return record
}

export const getValue_S7210  = (str)=>
{
 
  var record = {
      announced_by:'',
        departure_date:'',
        arrival_date:'',
        container_number:'',
        user_id:'',
        last_update:'',
        completed_update:'',
        cross_town:'',
  }
  var res = str.split('\t');
  // console.log("kjbkj tab split D1040 =========> " , JSON.stringify(res.length))
  // console.log("kjbkj tab split D1040 =========> " , JSON.stringify(res))
  if(res.length > 26)
  {
    record.announced_by = res[26] 
  }
  
  if(res.length > 16)
  {
    record.departure_date = res[16] 
  }
  if(res.length > 21)
  {
    record.arrival_date = res[21] 
  }
  if(res.length > 8)
  {
    record.container_number = res[8] 
  }
  if(res.length > 47)
  {
    record.user_id = res[47] 
  }
  if(res.length > 52)
  {
    record.last_update = res[52] 
  }
  if(res.length > 3)
  {
    record.completed_update = res[3] 
  }
  if(res.length > 48)
  {
    record.cross_town = res[48] 
  }
 
  return record
}

export const getValue_B2000  = (str)=>
  {
   
    var record = {
      booking_number:'',
      cu_match_code:'',
      mr_match_code:'',
      csb_office:'',
      assigned_user_id:'',
      received_date:'',
      export_haulage:'',
      routing:'',
      received_time:'',
      cargo_type:'',
      issuer_office:'',
      last_pod:'',
      end_pod:''
    }
    var res = str.split('\t');
    console.log("kjbkj tab split B2000 =========> " , JSON.stringify(res))

    if(res.length > 1)
    {
      record.booking_number = res[1] 
    }
    if(res.length > 2)
    {
      record.cu_match_code = res[2] 
    }
    if(res.length > 3)
    {
      record.mr_match_code = res[3] 
    }
    if(res.length > 4)
    {
      record.csb_office = res[4] 
    }
    if(res.length > 4)
      {
        record.issuer_office = res[4] 
      }
    if(res.length > 8)
    {
      record.received_date = res[8] 
    }
    if(res.length > 19)
    {
      record.export_haulage = res[19] 
    }
    if(res.length > 21)
    {
      record.routing = res[21] 
    }
    if(res.length > 9)
    {
      record.received_time = res[9] 
    }   
    if(res.length > 32)
    {
      record.last_pod = res[32] 
    }
    if(res.length > 33)
    {
      record.end_pod = res[33] 
    }
    if(res.length > 34)
    {
      record.assigned_user_id = res[34] 
    }
    if(res.length > 35)
    {
      record.csb_office = res[35] 
    }
    
   
    return record
  }

export const getValue_S9610  = (str)=>
{
 
  var record = {
    booking_number:'',
    csb_office:'',
    assigned_user_id:'',
    cu_match_code:'',
    abc_nonabc:'',
    export_haulage:'',
    function_:'',
    cargo_type:'',
    received_date:'',
    received_time:'',
    temp:'',
    dg:'',
    oog:'',
    issuer_office:'',
    last_pod:'',
    end_pod:''
  }
  var res = str.split('\t');
  // console.log("kjbkj tab split D1040 =========> " , JSON.stringify(res.length))
  // console.log("kjbkj tab split D1040 =========> " , JSON.stringify(res))
  if(res.length > 1)
  {
    record.abc_nonabc = res[1] 
  }
  if(res.length > 14)
  {
    record.booking_number = res[14] 
  }
  
  if(res.length > 6)
  {
    record.function_ = res[6] 
  }
  if(res.length > 8)
  {
    record.received_date = res[8] 
  }
  if(res.length > 9)
  {
    record.received_time = res[9] 
  }
  // if(res.length > 16)
  // {
  //   record.booking_number = res[16] 
  // }
  if(res.length > 16)
  {
    record.cu_match_code = res[16] 
  }
  if(res.length > 19)
  {
    record.temp = res[19] 
  }
  if(res.length > 21)
  {
    record.dg = res[21] 
  }
  if(res.length > 20)
  {
    record.oog = res[20] 
  }
  if(res.length > 22)
  {
    record.export_haulage = res[22] 
  }
  if(res.length > 32)
  {
    record.last_pod = res[32] 
  }
  if(res.length > 33)
  {
    record.end_pod = res[33] 
  }
  if(res.length > 34)
  {
    record.assigned_user_id = res[34] 
  }
  if(res.length > 35)
  {
    record.csb_office = res[35] 
  }
  if(res.length > 35)
  {
    record.issuer_office = res[35] 
  }
 
  return record
}
export const getValueDoc_Z1910  = (str)=>
{
 
  var record = {
    exception_number:'',
    action_party:'',
    group:'',
    exception_code:'',
    mtd:'',
    shipment:'',
  }
  var res = str.split('\t');
  // console.log("kjbkj tab split D1040 =========> " , JSON.stringify(res.length))
  // console.log("kjbkj tab split D1040 =========> " , JSON.stringify(res))
  if(res.length > 0)
  {
    record.exception_number = res[0] 
  }
  if(res.length > 3)
  {
    record.shipment = res[3] 
  }
  
  if(res.length > 4)
  {
    record.mtd = res[4] 
  }
  if(res.length > 5)
  {
    record.exception_code = res[5] 
  }
  if(res.length > 6)
  {
    record.action_party = res[6] 
  }
  if(res.length > 12)
  {
    record.group = res[12] 
  }
 
  return record
}
export const getValueAF_Z1910  = (str)=>
{
 
  var record = {
    dp_number:'',
    shipment:'',
    mr_party:'',
    category:'',
    result_code:'',
    issuer_userid:'',
    group:'',
    issue_date:''
  }
  var res = str.split('\t');
  // console.log("kjbkj tab split D1040 =========> " , JSON.stringify(res.length))
  // console.log("kjbkj tab split D1040 =========> " , JSON.stringify(res))
  if(res.length > 0)
  {
    record.exception_number = res[0] 
  }
  if(res.length > 1)
  {
    record.issue_date = res[1] 
  }
  
  if(res.length > 3)
  {
    record.shipment = res[3] 
  }
  if(res.length > 4)
  {
    record.dp_number = res[4] 
  }
  if(res.length > 6)
  {
    record.mr_party = res[6] 
  }
  if(res.length > 7)
  {
    record.result_code = res[7] 
  }
  if(res.length > 9)
  {
    record.issuer_userid = res[9] 
  }
  if(res.length > 10)
  {
    record.group = res[10] 
  }
 
  return record
}
export const getValue_emailhandling   = (str)=>
{
  var record = {
    from:'',
    subject:'',
    received_date_time:''
  }
  var array = str.split('\r\n')
  if(array)
  {
      var split_arr = array.filter(function (el) {
        return el != "";
      });
      console.log("kjbkj tab split split_arr =========> " , JSON.stringify(split_arr))
      console.log("kjbkj tab split split_arr_count =========> " , JSON.stringify(split_arr.length))
      if(split_arr.length === 2){
        var list1=split_arr[0].split('\t')
        var list2=split_arr[1].split('\t') 
        if(list1.length <= list2.length){
          for(var i = 0 ; i <list1.length;i++)
          {
            if(list1[i]==="From"){
              record.from=list2[i]
            }else if(list1[i]==="Subject"){
              record.subject=list2[i]
            }
            else if(list1[i]==="Received"){
              record.received_date_time=list2[i]
            }
          }
        }
      }
  }
  console.log("kjbkj tab length time_arr length =========> " , JSON.stringify(record))
  return record

  
}