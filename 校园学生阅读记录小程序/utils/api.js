
// 接口封装
var app = getApp()
var http = "https://m.woduhuiben.com/";
var request = function (api, params, is_check_bind, callback) {
    var is_bind = app.globalData.is_bind;
    if (is_check_bind==true){
        if (is_bind == '') {
            //打开手机号绑定
            wx.navigateTo({
                url: '../login/login',
            })
        }
    }
    wx.showLoading({
        title: '加载中',
        mask: true
    })
    wx.request({
        url: http + api,
        data: params,
        method: "POST",
        dataType: 'json',
        header: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-Apikey': app.globalData.apikey
        },
        success: function (res) {
            wx.hideLoading();
            if (res.data.code == -101) {
                
            }
            else if (res.data.code == -109){

            }
            else {
                //未过期
                return callback(res.data);
            }
        },
        fail: function (res) {
            wx.hideLoading();
            loadFail(res.msg);
        }
    })
};
// alert弹框
var alert = function (content) { 
    if (content.length<=0){
        return false ;
    }
    wx.showModal({
        content: content,
        showCancel: false
    });
};
// 加载等待loading
var loading = function (content) {
    wx.showLoading({
        title: content,
        mask: true
    })
};
// load失败
var loadFail = function (title) {
    wx.showToast({
        title: title || "网络错误",
        image: "/assets/icon/err.png",
        duration: 2000
    })
};
module.exports.request = request;
module.exports.alert = alert;
module.exports.loading = loading;
module.exports.loadFail = loadFail;