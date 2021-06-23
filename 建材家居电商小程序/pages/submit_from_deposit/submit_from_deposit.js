// pages/submit_from_deposit/submit_from_deposit.js

var common = require("../../utils/util.js");
var app = getApp();
const imgurl = app.globalData.imgUrl;
const wxurl = app.globalData.wxUrl;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgurl: imgurl,
        address: null,     //收货地址
        shopInfo: null, //店铺信息
        sum_price: 0,
        sumitOrderSt: false,
        type_: 4, //默认为商家订金类型
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            shopInfo: wx.getStorageSync('shopInfo'),
            type_: options.type_
        })
        var shopInfo = this.data.shopInfo;
        var sum = shopInfo.deposit - shopInfo.youhui;
        if(this.data.type_==5){
            sum = shopInfo.money_all - shopInfo.youhui_all;
        }
        this.setData({
            sum_price: sum,
        })
    },
    //监测用户输入金
    inputDeposit: function (e) {
        var inputDeposit = e.detail.value;
        if (isNaN(inputDeposit)) {
            return '';
        }
        var sum = inputDeposit - this.data.shopInfo.youhui
        if(this.data.type_==5){
            sum = inputDeposit - this.data.shopInfo.youhui_all
        }
        this.setData({
            sum_price: sum,
        })

    },
    //提交订单-商家订金
    submitDeposit: function (e) {
        if (this.data.address == null) {
            wx.showToast({
                title: '请添加地址',
            })
            return;
        }
        var sum = this.data.sum_price
        if (sum <= 0) {
            wx.showToast({
                title: '总计不能小于0',
            })
            return;
        }
        this.setData({
            sumitOrderSt: true,
        })
        //添加订单，成功后直接支付
        var beizhu = e.detail.value.beizhu
        var that = this;
        var username = common.getUserName()
        var youhui = that.data.shopInfo.youhui;
        if (this.data.type_ == 5) {
            youhui = that.data.shopInfo.youhui_all
        }
        common.httpP('dingdan/save_deposit', {
            type_: that.data.type_,
            username: username,
            shop_id: that.data.shopInfo.shop_id,
            sum_price: that.data.sum_price,
            address_id: that.data.address.id,
            shop_youhui:youhui,
            beizhu: beizhu,
        }, function (data) {
            if (data.code == 0) {
                //添加订单成功
                that.payNow(data.order_id, data.type, username)
            }else{
                that.setData({
                    sumitOrderSt: false,
                })
            }
        })
    },
    //发起支付请示
    payNow: function (order_id, type_, username) {
        wx.showLoading({
            title: '请求支付中...',
        })
        wx.request({
            url: wxurl + 'pay/pay_now',
            data: {
                order_id: order_id,
                username: username,
                type_: type_,
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
                            console.log('payok', res)
                            wx.request({
                                url: wxurl + 'dingdan/update_pay_st',
                                data: {
                                    order_id: order_id,
                                    st: 'paid',
                                    type_: type_,
                                },
                                success: function (res) {
                                    console.log(res.data.msg);
                                }
                            })
                            wx.redirectTo({
                                url: '/pages/orders/orders',
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
    //改地址
    tapAddress: function (e) {

        if (this.data.address == null) {
            wx.switchTab({
                url: '/pages/user/user',
            })
            return;
        }
        wx.navigateTo({
            url: '/pages/address/address?from_=orderConfirm',
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
            }else{
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