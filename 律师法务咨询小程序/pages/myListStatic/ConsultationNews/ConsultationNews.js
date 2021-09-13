var Utils = require("../../../utils/util.js");

var datas = {
    bool: 0,     // 判断是不是有消息推送
    arr:[]      // 渲染消息的列表
}

Page({
    data: datas,
    onLoad: function (options) {
        this.loadRequest();
    },
    onShow: function () {

    },
    loadRequest: function () {
        var _this = this;
        var loginData = wx.getStorageSync("login");
        Utils.requestFn({
            url:'/index.php/faqmsg?server=1',
            data: {
                sdk: loginData.sdk,
                uid: loginData.uid
            },
            success: function (res) {
                var resData = res.data.data.list;
                if (res.data.status) {
                    var mun = !resData.length ? 1 : 0;
                    _this.setData({
                        bool: mun,
                        arr: resData
                    })
                }
            }
        })
    }

})