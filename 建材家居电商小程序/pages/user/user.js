
// 添加评价页
var common = require("../../utils/util.js");
var app = getApp();

const imgurl = app.globalData.imgurl;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},//用户信息
        username: '',//账号
        setting: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            setting: wx.getStorageSync('setting'),
        })
        var username = wx.getStorageSync('username');

        if (!username) {
            app.register();
            username = wx.getStorageSync('username')
        }
        this.setData({
            username: username,
        });

        this.getInfo();// 取用户微信头像
    },
    getInfo: function () {
        var that = this;
        wx.getUserInfo({
            success: function (res) {
                var userInfo = res.userInfo
                that.setData({
                    userInfo: userInfo,

                });
                //将用户信息：头像和昵称发送服务器
                var username = wx.getStorageSync('username');
                if (!username) {
                    app.register();
                    username = wx.getStorageSync('username')
                }
                common.httpP('user/save', {
                    'username': username,
                    'vistar': userInfo.avatarUrl,
                    'nickname': userInfo.nickName,
                    'sex': userInfo.gender,
                }, function (res) {

                });
            },
            //如果不同意则提示用户设置为同意
            fail: function () {
                wx.openSetting({
                    success: function (data) {
                        if (data) {
                            if (data.authSetting["scope.userInfo"] == true) {
                                that.getInfo();
                            } else {
                                wx.showModal({
                                    title: '授权提醒',
                                    content: '为了您更好的体验，请同意授权登录',
                                })
                            }
                        }
                    }
                })
            }
        })
    },
    contact:function() {
        var dianhua = this.data.setting.telephone;
        var content = '客服电话 :' + dianhua;
        wx.showModal({
            title: '联系客服',
            content: content,
            cancelText: '关闭',
            confirmText: '拨打电话',
            confirmColor: '#18c469',
            success(res) {
                if (res.confirm) {
                    wx.makePhoneCall({
                        phoneNumber: dianhua,
                    })
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})