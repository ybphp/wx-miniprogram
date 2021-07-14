// pages/login/login.js
var apiRequest = require("../../utils/api.js");
//获取应用实例
const app = getApp()
Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        codeText: "获取验证码",
        status: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        mobile: ''
    },

    // 生命周期函数--监听页面加载
    onShow: function (options) {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    mobileInputEvent: function (e) {
        this.setData({
            mobile: e.detail.value
        })
    },
    // 获取短信验证码
    getCode: function () {
        var mobile = this.data.mobile ;
        var regMobile = /^1\d{10}$/;
        var that = this;
        var second = 60;
        if (!regMobile.test(mobile)) {
            apiRequest.alert('请输入正确的手机号');
            return false;
        }
        var params = {
            mobile: mobile
        };
        apiRequest.request('schoolapi/sendcode', params, false, function (res) {
            if (res.code == 1) {
                wx.showToast({
                    title: res.msg
                })
                second--;
                that.setData({
                    codeText: "稍等" + second + 's',
                    status: true
                });
                var timer = setInterval(function () {
                    if (second > 1) {
                        second--;
                        that.setData({
                            codeText: "稍等" + second + 's',
                        });
                    } else {
                        that.setData({
                            codeText: "获取验证码",
                            status: false
                        });
                        clearInterval(timer);
                    }

                }, 1000);
            } else {
                apiRequest.alert(res.msg);
                return false;
            }
        });
        
        
    },
    // 登录
    login: function (e) {
        var mobile = e.detail.value.mobile;
        var password = e.detail.value.password;
        var regMobile = /^1\d{10}$/;
        var regPassword = /^\d{6}$/;
        if (!regMobile.test(mobile)) {
            apiRequest.alert('请输入正确的手机号');
            return false;
        }
        if (!regPassword.test(password)) {
            apiRequest.alert('请输入正确的短信验证码');
            return false;
        }
        var params = {
            mobile: mobile,
            password: password,
            userinfo: JSON.stringify(this.data.userInfo),
            openid: app.globalData.openid
        };
        apiRequest.request('schoolapi/binding', params, false, function (res) {
            if (res.code == 1) {
                wx.showToast({
                    title: '验证成功',
                    success: function(){
                        app.globalData.apikey = res.data
                        app.globalData.is_bind = true 
                        wx.switchTab({
                            url: '../index/index'
                        })
                    }
                })
            } else {
                apiRequest.alert(res.msg);
                return false;
            }
        });
        
    }
})