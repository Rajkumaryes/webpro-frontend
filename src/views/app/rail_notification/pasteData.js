
export const getValuepaste  = (str)=>
{
  var record = {
    from:'',
    start_date:'',
    end_date:'',
    subject:'',
  }
  var res = str.split('\t');
  
  if(res.length > 0)
  {
    record.from = res[0] 
  }
  if(res.length > 2)
  {
    record.start_date = res[2] 
  }
  if(res.length > 4)
  {
    record.end_date = res[4] 
  }
  if(res.length > 1)
  {
    record.subject = res[1] 
  }
  return record
}
export const getValue_rail   = (str)=>
{
  var record = {
    from:'',
    subject:'',
    start_date:''
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
              record.start_date=list2[i]
            }
          }
        }
      }
  }
  console.log("kjbkj tab length time_arr length =========> " , JSON.stringify(record))
  return record

  
}