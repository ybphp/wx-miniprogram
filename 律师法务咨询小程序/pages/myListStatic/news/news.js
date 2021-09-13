var Utils = require("../../../utils/util.js");

var datas = {
    znews: "0",    // 系统消息的 红点显示
    xnews: "0"    // 咨询消息的 红点显示
};

Page({
data: datas,
onLoad: function (options) {
    this.newsFn()
},
onShow: function () {
    this.newsFn()
},
newsFn: function () {  // 请求登陆消息接口的推送
    var _this = this;
    var loginData = wx.getStorageSync("login");
    Utils.requestFn({
        url:'/index.php/profile?server=1',
        data: {
            sdk: loginData.sdk,
            uid: loginData.uid
        },
        success: function (res) {
            var res = res.data.data;
            var resData = {
                xnews: res.faqcount,   
                znews: res.syscount    
            };
            _this.setData({
                znews: resData.znews,   // 系统消息的 红点显示
                xnews: resData.xnews    // 咨询消息的 红点显示
            })

        }
    })
}
})