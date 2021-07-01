export function throttle(fn, time) {
  var startTime = null;
  return function() {
    if (!startTime) startTime = new Date()
    var currTime = new Date();
    console.log(currTime)
    if ((currTime - startTime) > time) {
      fn.apply(date, arguments);
      startTime = currTime;
    }
  }
}

export function uid(len) {
    len = len || 7;
    return Math.random().toString(35).substr(2, len);
}

export function formatDate(fmt, date) {
    fmt = fmt || "yyyy-MM-dd HH:mm:ss";
    date = new Date(date) || new Date()
		var o = {
			"M+": date.getMonth() + 1, //月份
			"d+": date.getDate(), //日
			"h+": date.getHours() >= 12 ? date.getHours() - 12 : date.getHours(), //小时
			"H+": date.getHours(),//小时
			"m+": date.getMinutes(), //分
			"s+": date.getSeconds(), //秒
			"q+": Math.floor((date.getMonth() + 3) / 3), //季度
			"S": date.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
}