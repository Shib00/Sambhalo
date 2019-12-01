function tConvert (hours,mins) {
    let time='';
    if(hours>12) time+=hours-12;
    else if(hours==0) time+=12;
    else time+=hours;

    time+=":";

    if(mins<10) time+='0';
    time+=mins;

    time+=' ';

    if(hours<12) time+='AM';
    else time+='PM';

    return time; 
  }
   
module.exports = tConvert;