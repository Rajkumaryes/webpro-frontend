import moment from 'moment';


export const getValue = (listdata,key1,key2,keyvalue)=>
{
  // console.log("listdata",listdata)
  // console.log("key1",key1)
  // console.log("key2",key2)
  // console.log("keyvalue",keyvalue)
  let name = ''
 if(keyvalue !==''){
  for (let i = 0; i < listdata.length; i++) {
    if(listdata[i][key1] === keyvalue){
      name = listdata[i][key2]
    }
  }
 }
 
  return name
}
export const get_multiplechoose_array = (array,ids) =>
{
    var list = []
    
    for(var i = 0 ; i <ids.length ; i++)
    {
      for(var j = 0 ; j <array.length ; j++)
      {
          if(parseInt(array[j].value) === parseInt(ids[i]))
          {
          
            list.push(array[j])
          }

      }
    }
    
 
  return list
}
export const get_multiplechoose_scanarray = (array,ids) =>
{
    var list = []
    
    for(var i = 0 ; i <ids.length ; i++)
    {
      for(var j = 0 ; j <array.length ; j++)
      {
          if(parseInt(array[j].area) === parseInt(ids[i]))
          {
          
            list.push(array[j])
          }

      }
    }
    
 
  return list
}

export const getoptionvalue = (selectedOptions,originalarray,selectedarray) =>
{
  let hello = selectedOptions.findIndex(x => x.label === 'Select All')
    let hello1 = selectedarray.findIndex(x => x.label === 'Select All')

    let newdata = [...originalarray]
        var list = []
    if(hello === -1 && hello1 === -1 ){
      if((newdata.length - 1) === selectedOptions.length ){
                list = originalarray
        
      }else{
        
                list = selectedOptions
      }
    }else if(hello === -1 && hello1 > -1){
      list = []		
        }
        else if(hello > -1 && hello1 === -1){
      
            list = originalarray
    }else{
      let arrayval = selectedOptions.filter(item => item.label !== "Select All") 		
      list = arrayval
        }
        
        return list
}
export  const get_array_id= (array) => {
        
  var ids = []
  if(array)
  {
    if(array.length > 0)
    {
      let arr = array.filter(item => item.label !== "Select All") 
      for(var i = 0 ;i <arr.length ; i++)
      {
          ids.push(arr[i].value)
      }
    }
  }
   
  return ids
};
export  function getAreaValue(array,region)
{
  var list = []
  if(array && array !== null && region !== '' && region !== null )
  {
    list = array.filter(item => item.region === region)
  } 
  return list
}
export  function getVesselValue(array,area_selection,region)
{
  
  var list = []
  if(array && array !== null && area_selection !== '' && area_selection !== null )
  {
    list = array.filter(item => item.area === area_selection)
  } 
  var vessellist
  if(list && list !== null && region !== '' && region !== null )
  {
    vessellist = list.filter(item => item.region === region)
  } 
  return vessellist
}
export  function getActivityValue(array,activity_selection)
{
  var list = []
  if(array && array !== null && activity_selection !== '' && activity_selection !== null )
  {
    list = array.filter(item => item.activityselection === activity_selection)
  } 
  return list
}
export  const  removeduplicatecolumns = (arr) => {
  const output = [...new Map(arr.map(o => [o.label, o])).values()] 
  var list = []
  for(var i= 0;i<output.length;i++)
  {
    if(output[i].value !== "")
    {
      list.push(output[i])
    }
  }
  return list
}
export  const  removeNullvalue = (value) =>
  {
      return (value !== null && value)? value :  ''
  }
export  const getTimeDifference= (start,end) => {
     
  
  var a = new Date(start).getTime(),
    b = new Date(end).getTime(),
    
    diff = {};
  diff.milliseconds = a > b ? a % b : b % a;
  diff.seconds = diff.milliseconds / 1000;
  diff.minutes = diff.seconds / 60;
  diff.hours = diff.minutes / 60;
  // diff.days = diff.hours / 24;
  // diff.weeks = diff.days / 7;
  var minutes = (diff.hours * 60) % 60
  var seconds = (minutes * 60) % 60
  return Math.floor(diff.hours) + ":" +  Math.floor(minutes) + ":" + Math.floor(seconds)
};
export  const getTimemin= (start,end) => {
     
  
  var a = new Date(start).getTime(),
    b = new Date(end).getTime(),
    
    diff = {};
  diff.milliseconds = a > b ? a % b : b % a;
  diff.seconds = diff.milliseconds / 1000;
  diff.minutes = diff.seconds / 60;
  diff.hours = diff.minutes / 60;
  // diff.days = diff.hours / 24;
  // diff.weeks = diff.days / 7;
  var minutes = (diff.hours * 60) % 60
  var seconds = (minutes * 60) % 60
  
  return Math.round(diff.minutes)
};
export function  timeCoverAMPM (time) {
  // Check correct time format and split into components
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join (''); // return adjusted time or original string
}

export function GetReceviedTime(received_time,date)
{
  var r_time = timeCoverAMPM(received_time)
  console.log("kjvvhh r_time " , JSON.stringify(r_time))
  var pmvalue = 'pm'
  if((r_time.toLowerCase()).includes('am'))
  {
    pmvalue = 'am'
  }
  var time = (r_time.toLowerCase()).includes('am') ?(r_time.toLowerCase()).replace('am','') :(r_time.toLowerCase()).replace('pm','')
  console.log("kjvvhh time " , JSON.stringify(time))
  var times = moment(date + " "+time).format('MM/DD/YYYY hh:mm:ss a')
  console.log("kjvvhh times " , JSON.stringify(times))
  var lastvalue = (times.toLowerCase()).includes('am') ?(times.toLowerCase()).replace('am',pmvalue) :(times.toLowerCase()).replace('pm',pmvalue)
  return lastvalue
 
}
export  const Check_ValidDate = (date) => {
    
  var dates =  (date.toLowerCase()).includes('am') ?(date.toLowerCase()).replace('am','') :(date.toLowerCase()).replace('pm','')
  var valid_date = moment(dates).format('MM/DD/YYYY hh:mm:ss a');
  console.log('kkk',valid_date)
   return valid_date
  
};
export  const getstarttimeendtimeDifferencebew= (duration) => {
    
    var hours = parseInt(duration.asHours());
    var minutes = parseInt(duration.asMinutes())%60
    var seconds = parseInt(minutes)%60
  
  return hours + ":" +  minutes + ":"+seconds
};
export  const getstarttimeminnn= (duration) => {
  var minutes = parseInt(duration.asMinutes())
  
return minutes 
};
export function GetHours(d) {
  var h = parseInt(d.split(':')[0]);
  return h;
}
export function GetMinutes(d) {
  return parseInt(d.split(':')[1]);
}
export function onChangeLanguage(key,title,language_data)
{
    var name = ""
    if(language_data)
    {
        for(var i= 0; i< language_data.length ; i++)
        {
            let value = language_data[i]
            if(title === value.name)  
            {
                let languagedata = value.languagedata
                if(languagedata[key])
                {
                    name = languagedata[key]
                }
            }
            
        }
    }
    

    return name !== "" ? name : title
}

export function Date_Different(fromdate, todate) {
  var date1 = new Date(fromdate); 
    var date2 = new Date(todate); 
    var Difference_In_Time = date2.getTime() - date1.getTime(); 
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    const no_of_day = parseInt((Difference_In_Days + 1))
    return no_of_day
}

export function  GetDateFromDaysCount (fromdate,day)
{
  var date = new Date(fromdate);
  date.setDate(date.getDate() - day);
  const lastdate = ("0" + date.getDate()).slice(-2),
  month = ("0" + (date.getMonth() + 1)).slice(-2)
  var finalDate = date.getFullYear() +'-'+ month +'-' + lastdate ;
  return finalDate

}
export function permittedlevel(userdata,user_id)
{
    var is_admin = false
    if(user_id !== null && userdata)
    {
    let filterstatus = (userdata).filter(item => (item.level=== "1" || item.level === '3' || item.level === '4' || item.level === '5'))
   console.log('filterstatus',filterstatus)
   console.log('filterstatus',user_id)
    let is_role = (filterstatus).filter(item => (parseInt(user_id) === item.id))
    console.log('filterstatus',is_role)
    if(is_role.length > 0)
    {
      console.log('filterstatus',is_role.length)
    is_admin = true
    }
    }
    return is_admin
}
// Supervisor
export function permittedsupervisor(data,role_id)
{
    var is_admin = false
    if(role_id !== null && data)
    {
    let filterstatus = (data).filter(item => ((item.name).toLowerCase() === 'admin' || (item.name).toLowerCase() === 'tl' || (item.name).toLowerCase() === 'manager' || (item.name).toLowerCase() === 'supervisor'))
    let is_role = (filterstatus).filter(item => (parseInt(role_id) === item.id))
    if(is_role.length > 0)
    {
    is_admin = true
    }
    }
    return is_admin
}
export function permittedadmin(data,role_id)
{
    var is_admin = false
    if(role_id !== null && data)
    {
    let filterstatus = (data).filter(item => ((item.name).toLowerCase() === 'admin'))
    let is_role = (filterstatus).filter(item => (parseInt(role_id) === item.id))
    if(is_role.length > 0)
    {
    is_admin = true
    }
    }
    return is_admin
}
export function permittedusers(data,role_id)
{
    var is_admin = false
    if(role_id !== null && data)
    {
    let filterstatus = (data).filter(item => ((item.name).toLowerCase() === 'admin' || (item.name).toLowerCase() === 'tl' || (item.name).toLowerCase() === 'manager'  ))
    let is_role = (filterstatus).filter(item => (parseInt(role_id) === item.id))
    if(is_role.length > 0)
    {
    is_admin = true
    }
    }
    return is_admin
}
export function permittedadmintl(data,role_id)
{
    var is_admin = false
    if(role_id !== null && data)
    {
    let filterstatus = (data).filter(item => ((item.name).toLowerCase() === 'admin' || (item.name).toLowerCase() === 'tl'  ))
    let is_role = (filterstatus).filter(item => (parseInt(role_id) === item.id))
    if(is_role.length > 0)
    {
    is_admin = true
    }
    }
    return is_admin
}
export  function getStausOption1Enable(status_data,value)
    {
      const data = Object.assign([], status_data); 
      var index = -1
      for(var i = 0; i <data.length;i++)
      {
        if((data[i].label).toUpperCase() === value)
        {
          index = i
        }
      }

      return index
    }
export  function getStausOptionEnable(status_data,value)
{
      const list = Object.assign([], status_data); 
      const data = []
      for(var i = 0; i <list.length;i++)
      {
        const record = Object.assign({}, list[i]); 
        record.isDisabled = true
        data.push(record)
      }
      for(var i = 0; i <data.length;i++)
      {
        if(value === '' || value === null)
        {
          if((data[i].label).toUpperCase() === 'TO BE STARTED')
          {
            data[i].isDisabled = false
          }
        }
        else if((data[i].label).toUpperCase() === 'TO BE STARTED' && value === data[i].value)
        {
          const index = getStausOption1Enable(data,'IN PROCESS')
          if(index !== -1 )
          {
            data[index].isDisabled = false
          }
         
          
        }
        else if((data[i].label).toUpperCase() === 'IN PROCESS' && value === data[i].value)
        {
          const index = getStausOption1Enable(data,'PENDING IN')
          if(index !== -1 )
          {
            data[index].isDisabled = false
          }
          const index1 = getStausOption1Enable(data,'DONE')
          if(index1 !== -1 )
          {
            data[index1].isDisabled = false
          }
         
        }
        else if((data[i].label).toUpperCase() === 'PENDING IN' && value === data[i].value)
        {
          const index = getStausOption1Enable(data,'PENDING OUT')
          if(index !== -1 )
          {
            data[index].isDisabled = false
          }
        }
        else if((data[i].label).toUpperCase() === 'PENDING OUT' && value === data[i].value)
        {
          const index = getStausOption1Enable(data,'DONE')
          if(index !== -1 )
          {
            data[index].isDisabled = false
          }

        }
        else if((data[i].label).toUpperCase() === 'DONE' && value === data[i].value)
        {
          const index = getStausOption1Enable(data,'DISREGARD')
          if(index !== -1 )
          {
            data[index].isDisabled = false
          }
        }
        
      }
  
  return data

}
export  function getStausOptionAdminEnable(status_data,value)
{
      const list = Object.assign([], status_data); 
      const data = []
      for(var i = 0; i <list.length;i++)
      {
        const record = Object.assign({}, list[i]); 
        record.isDisabled = false
        if((record.label).toUpperCase() === 'PENDING OUT')
        {
          record.isDisabled = true
        }
        data.push(record)
      }
      for(var i = 0; i <data.length;i++)
      {
        
        if((data[i].label).toUpperCase() === 'PENDING IN' && value === data[i].value)
        {
          const index = getStausOption1Enable(data,'PENDING OUT')
          if(index !== -1 )
          {
            data[index].isDisabled = false
          }
        }
       
      }
      for(var i = 0; i <data.length;i++)
      {
        
        if((data[i].label).toUpperCase() === 'TO BE STARTED' && value === data[i].value)
        {
          const index = getStausOption1Enable(data,'DONE')
          if(index !== -1 )
          {
            data[index].isDisabled = true
          }
        }
       
      }
  
  return data

}
export function getCurrentWeek(dowOffset)
{

  // var onejan = new Date(dowOffset.getFullYear(),0,1);
  // var today = new Date(dowOffset.getFullYear(),dowOffset.getMonth(),dowOffset.getDate());
  // var dayOfYear = ((today - onejan + 86400000)/86400000);
  // return Math.ceil(dayOfYear/7)
  const date = moment(dowOffset).format('MM/DD/YYYY')
  var weeknumber = moment(date, 'MM/DD/YYYY').isoWeek()

  return weeknumber
}
export function getEnableStatus(key,array,request_no,publisher,publisher_status,auditor)
{
  var enable = true
  if(key === 'publisher')
  {
      if(request_no !== '' && request_no !== null)
      {
        enable = false
      }
  }
  else if(key === 'publisher_status')
  {
      if(publisher !== '' && publisher !== null)
      {
        enable = false
      }
  }
  else if(key === 'auditor')
  {
    if(getValue(array,'value','label',publisher_status) === 'DONE')
    {
      enable = false
    }
  }
  else if(key === 'auditor_status')
  {
    if(auditor !== '' && auditor !== null)
    {
      if(getValue(array,'value','label',publisher_status) === 'DONE')
      {
        enable = false
      }
      
    }
  }

  return enable
}
export function getEnableexportimport(key,import_quality,export_quality)
{
  var enable = true
  if(key === 'export_quality')
  {
      if(import_quality !== '' && import_quality !== null)
      {
        enable = true
      }else {
        enable = false
      }
  }
  else if(key === 'import_quality')
  {
      if(export_quality !== '' && export_quality !== null)
      {
        enable = true
      }else {
        enable = false
      }
  }
  return enable
}
export const selectStyles = {
  control: styles => ({ ...styles,
     border: '1px solid red',
}),
};


export const customStyles = {
  
  // For the options
  option: (styles, { isDisabled}) => {
  
    return {
      ...styles,
      cursor: isDisabled ? 'not-allowed' : 'default',
    };
  },
};

export function convertUTCToLocalDate(date) {
  if (!date) {
    return date
  }
  date = new Date(date)
  date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())
  return date
}

export function convertLocalToUTCDate(date) {
  if (!date) {
    return date
  }
  date = new Date(date)
  var hour = moment(date).format('HH'),minute = moment(date).format('mm'),seconds = moment(date).format('ss')
  date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(),hour,minute,seconds))
  return date
}

export const getPermission = (role_data, name, submenu, is_subchidren) => {

  var is_permission = false

  

  if (role_data && role_data !== null) {
    var role_id = localStorage.getItem('role_id') !== null ? localStorage.getItem('role_id') : ''

    for (let i = 0; i < role_data.length; i++) {
      var value = role_data[i]
      if ((value.name).toLowerCase() === (name).toLowerCase()) {

        if (is_subchidren === true) {

          if (value.children && value.children !== null) {
            const children = [...value.children]
            is_permission = getChildrenPermission(children,submenu,role_id)

          }

        }
        else {
          if(value.role_id && value.role_id !== null)
          {
            const role_id_in = value.role_id.filter((x) => parseInt(x) === parseInt(role_id));
            if (role_id_in.length > 0) {
              is_permission = true
            }
          }
          
        }
      }
    }
  }
  // if(is_subchidren === true)
  // {
  //   console.log("bkjbkjv name =  ", name)
  //   console.log("bkjbkjv is_subchidren =  ", is_subchidren)
  //   console.log("bkjbkjv is_permission =  ", is_permission)
  //   console.log("bkjbkjv submenu =  ", submenu)
  //   console.log(" bkjbkjv ---------------------------------------------------> ")
  // }
 
  return is_permission
}
export const getChildrenPermission = (children,key,role_id) => {

  var is_permission = false
  var list = children.filter((x) => (x.name).toLowerCase() === (key).toLowerCase());
  if (list.length > 0) {
    const role_id_arr = list[0].role_id
    const role_id_in = role_id_arr.filter((x) => parseInt(x) === parseInt(role_id));
    if (role_id_in.length > 0) {
      is_permission = true
    }

  }
  return is_permission
}

export const getCountryName = (pod_end,last_pod,main_pod,teamdata) => {

  var country_code = ''
  if(pod_end.trim() !== ''&& pod_end !== null)
  {
     country_code = pod_end.substring(0, 2)
  }
  else if(last_pod.trim() !== ''&& last_pod !== null)
  {
     country_code = last_pod.substring(0, 2)
  }
  else if(main_pod.trim() !== ''&& main_pod !== null)
  {
     country_code = main_pod.substring(0, 2)
  }
  const team = getValue(teamdata,'country_code','label',country_code)
  return team
}