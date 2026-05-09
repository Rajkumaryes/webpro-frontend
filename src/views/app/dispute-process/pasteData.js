
export const getValue_D1040  = (str)=>
{
  var record = {
    from:'',
    subject:'',
    mail_received:''
  }
  console.log("kjbkj str  =========> " , str)
  // var res = str.split('\t');
  var res = str
  console.log("kjbkj tab split D1040 =========> " , JSON.stringify(res.length))
  console.log("kjbkj tab split D1040 =========> " , JSON.stringify(res))
  if(res.length > 0)
  {
    record.from = res[0] 
  }
  if(res.length > 1)
  {
    record.subject = res[1] 
  }
  if(res.length > 2)
  {
    record.mail_received = res[2] 
  }
  return record
}

export const getValue_dispute   = (str)=>
{
  var record = {
    from:'',
    subject:'',
    mail_received:''
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
              record.mail_received=list2[i]
            }
          }
        }
      }
  }
  console.log("kjbkj tab length time_arr length =========> " , JSON.stringify(record))
  return record

  
}