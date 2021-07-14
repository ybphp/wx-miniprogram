const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const timeDescs = oldDate =>{
    var time = "";
    var date3 = 0;
    var nowDate = Math.round(new Date().getTime()/1000);    //结束时间  
    if(nowDate >= oldDate){
        date3 = nowDate - oldDate;   //时间差的毫秒数 
    }else{
        date3 = oldDate - nowDate;   //时间差的毫秒数         
    }
    //计算出相差天数  
    var days = Math.floor(date3 / (24 * 3600 ))
    //计算出小时数  
    var leave1 = date3 % (24 * 3600 )    //计算天数后剩余的毫秒数  
    var hours = Math.floor(leave1 / (3600))
    //计算相差分钟数  
    var leave2 = leave1 % (3600)        //计算小时数后剩余的毫秒数  
    var minutes = Math.floor(leave2 / (60))
    //计算相差秒数  
    var leave3 = leave2 % (60)      //计算分钟数后剩余的毫秒数  
    var seconds = Math.round(leave3)
    if(days >= 1){
        time += days + '天';
    }
    if (hours >= 1){
        time += hours + '小时';
    }
    if (minutes >= 1) {
        time += minutes + '分钟';
    }
    if (seconds >= 1) {
        time += seconds + '秒';
    }
    return time;
}
const unify = time => {
    time -= 0;
    if (("" + time).length === 10) {
      time *= 1000;
    }
    return time;
  };

  const timeDesc =  time => {
      var ago, curTime, diff, int;
      time = unify(time);
      int = parseInt;
      curTime = +new Date();
      diff = curTime - time;
      ago = "";
      if (1000 * 60 > diff) {
        ago = "刚刚";
      } else if (1000 * 60 <= diff && 1000 * 60 * 60 > diff) {
        ago = int(diff / (1000 * 60)) + "分钟前";
      } else if (1000 * 60 * 60 <= diff && 1000 * 60 * 60 * 24 > diff) {
        ago = int(diff / (1000 * 60 * 60)) + "小时前";
      } else if (1000 * 60 * 60 * 24 <= diff && 1000 * 60 * 60 * 24 * 30 > diff) {
        ago = int(diff / (1000 * 60 * 60 * 24)) + "天前";
      } else if (1000 * 60 * 60 * 24 * 30 <= diff && 1000 * 60 * 60 * 24 * 30 * 12 > diff) {
        ago = int(diff / (1000 * 60 * 60 * 24 * 30)) + "月前";
      } else {
        ago = int(diff / (1000 * 60 * 60 * 24 * 30 * 12)) + "年前";
      }
      return ago;
    }

module.exports = {
  formatTime: formatTime,
  timeDesc: timeDesc
}
