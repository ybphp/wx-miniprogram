// pages/submit_from_group2/submit_from_group2.js 
//团购订金或是尾款

var common = require("../../utils/util.js");
var app = getApp();
const imgurl = app.globalData.imgUrl;
const wxurl = app.globalData.wxUrl;
const ordersAll = app.globalData.orders_all;
const groupLimitStore = app.globalData.group_limit_store;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgurl: imgurl,
        address: null,//默认地址
        goodGroup: {}, //团购物商品
        sumitOrderSt: false,
        type_: '3',  //默认先付订金

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var type_ = options.type_; //3 or 6
        this.setData({
            type_: type_,
        })
        this.getGroupGood()
    },
    //提交订单前验证一下
    validaorder: function () {
        if (this.data.address == null) {
            wx.showModal({
                title: '没有地址',
                content: '前去添加',
                success: function (res) {
                    if (res.confirm) {
                        wx.switchTab({
                            url: '/pages/user/user',
                        })
                    }
                }
            })
            return;
        }
        this.setData({
            sumitOrderSt: true,//禁用按扭
        })
    },

    //提交订金订单或是尾款订单:添加成功后则发起支付
    tapAddOrder: function () {
        this.validaorder()//验证地址
        var that = this
        var username = common.getUserName()
        common.httpG('dingdan/save_group_deposit', {
            username: username,
            t_id: that.data.goodGroup.t_id,
            address_id: that.data.address.id,
            type_: that.data.type_, //限人订金类型或是尾款类型
        }, function (data) {
            if (data.code == 0) {
                //   console.log('add group order ok');
                //   return ;
                //发起支付
                that.payNow(data.order_id, data.type, username)
            } else {
                that.setData({
                    sumitOrderSt: false,
                })
            }

        })
    },
    //立即支付,多商家:可能一次支付多个订单
    payNow: function (order_id, type_, username) {
        wx.showLoading({
            title: '请求支付中...',
        })
        wx.request({
            url: wxurl + 'pay/pay_now',
            data: {
                order_id: order_id,
                username: username,
                type_: type_, //  限人订金类型 或是尾款类型
            },
            success: function (res) {
                var data = res.data;
                if (data.code == 0) {
                    wx.hideLoading();
                    wx.requestPayment({
                        'timeStamp': data.timeStamp,
                        'nonceStr': data.nonceStr,
                        'package': data.package,
                        'signType': 'MD5',
                        'paySign': data.paySign,//签名,
                        'success': function (res) {
                            //更改订单状态为已支付
                            wx.request({
                                url: wxurl + 'dingdan/update_pay_st',
                                data: {
                                    order_id: order_id,
                                    st: 'paid',
                                    type_: type_,
                                    username:username,
                                    // type_group: data_group.type_group,
                                },
                                success: function (res) {
                                    wx.redirectTo({
                                        url: '/pages/orders/orders',
                                    })
                                }
                            })
                        },
                        'fail': function (res) {
                            console.log(res)
                        }
                    })
                } else {
                    wx.hideLoading();
                    wx.showToast({
                        title: res.data.msg,
                    })
                }

            }
        })
    },
    //取缓存中的团购商品
    getGroupGood: function () {
        var group_good = wx.getStorageSync('group_detail');
        this.setData({
            goodGroup: group_good,
        })
    },
    //取默认地址
    getAddress: function () {
        var that = this;
        var username = common.getUserName()
        common.httpG('address/default_address', {
            username: username
        }, function (data) {
            if (data.code == 0) {
                that.setData({
                    address: data.data,
                })
            } else {
                wx.showModal({
                    title: '没有地址',
                    content: '前去添加',
                    success: function (res) {
                        if (res.confirm) {
                            wx.switchTab({
                                url: '/pages/user/user',
                            })
                        }
                    }
                })
            }
        })
    },
    //改地址
    tapAddress: function (e) {
        wx.navigateTo({
            url: '/pages/address/address?from_=orderConfirm',
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
        this.getAddress()
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