//index.js

var apiRequest = require("../../utils/api.js");
//获取应用实例
const app = getApp()

Page({
    data: {
        is_buy_card: false,
        userData:{}
    },
    onShow: function () {
        var that = this ;
        that.setData({
            is_buy_card: app.globalData.is_buy_card
        });
        if (app.globalData.userInfo) {
            this.setData({
              userInfo: app.globalData.userInfo,
              hasUserInfo: true
            })
          } else if (this.data.canIUse){
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
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                var params = {
                    code: res.code
                };
                apiRequest.request('schoolapi/login', params, false, function (res) {
                    if (res.code == 1) {
                        app.globalData.is_bind = res.data.is_bind
                        app.globalData.openid = res.data.openid
                        app.globalData.is_buy_card = res.data.is_buy_card
                        app.globalData.apikey = res.data.apikey
                        app.globalData.userData = res.data.info;
                        app.globalData.piyue = res.data.review;
                        that.setData({
                            is_buy_card: res.data.is_buy_card,
                            userData:res.data.info
                        });
                        if (res.data.is_bind == false) {
                            //打开手机号绑定
                            wx.navigateTo({
                                url: '../login/login',
                            })
                        }
                    }
                });
            }
        }) 
    }
})
