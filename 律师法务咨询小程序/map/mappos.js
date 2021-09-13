/**
 *  使用腾讯地图，扩展的小程序的map功能、
 * reverseGeocoder：逆地址，Object格式：{latitude: 纬度,longitude: 经度}
 * wx.getLocation：获取地理位置，type 使用gcj02 返回可用于wx.openLocation的坐标；
 * 详情请看 http://lbs.qq.com/qqmap_wx_jssdk/qqmapwx.html，
 */
var QQMapWX = require('../utils/qqmap-wx-jssdk.js');  // 引用腾讯地图JavaScriptSDK
var qqmapsdk;  // map对象

var coordinate = function() {  // 获取位置
        // 调用接口
        qqmapsdk = new QQMapWX({
                key: 'AFLBZ-PV2KG-MOZQF-ILTTX-WB6X7-TUFRP'
        });
        return qqmapsdk;
}

module.exports = {
        map: coordinate
}
