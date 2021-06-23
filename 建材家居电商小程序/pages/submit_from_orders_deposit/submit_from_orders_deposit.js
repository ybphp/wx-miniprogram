// pages/submit_from_orders_deposit/submit_from_orders_deposit.js
//商家订金或全款继续支付
var common = require("../../utils/util.js");
var app = getApp();
const imgurl = app.globalData.imgUrl;
const wxurl = app.globalData.wxUrl;
Page({
    /**
     * 页面的初始数据
     * 
     */
    data: {
        imgurl: imgurl,
        address: null,
        from_: 'to_pay', //默认来自‘去支付’
        payNowSt: false, //立即支付按扭状态
        orderDetail: null,      //订单详情
        texttip: '商家订金',
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var order_id = options.order_id;
        var address_id = options.address_id
        var type_ = options.type_;
        this.getOrderAddress(address_id)
        if (options.from_ == 'look_detail') {
            this.setData({
                from_: options.from_,
            })
        }
        if (type_ == '商家全款') {
            this.setData({
                texttip: type_,
            })
        }
        //从订单缓存中取出订单
        var orders_all = wx.getStorageSync('orders_all');
        for (var i = 0; i < orders_all.length; i++) {
            if (orders_all[i].id == order_id) {
                this.setData({
                    orderDetail: orders_all[i]
                })
            }
        }
    },
    //取商家订单的地址
    getOrderAddress: function (address_id) {
        var that = this
        common.httpG('address/read', {
            address_id: address_id,
        }, function (data) {
            if (data.code == 0) {
                that.setData({
                    address: data.data
                })
            }
        })
    },
    //立即支付
    tapPayNow: function () {
        this.setData({
            payNowSt: true,
        })
        var order_id = this.data.orderDetail.id;
        var username = common.getUserName();
        var that = this
        var type_number = 4;//商家订金
        if (this.data.texttip == '商家全款') {
            type_number = 5;
        }
        wx.showLoading({
            title: '请求支付中...',
        })
        wx.request({
            url: wxurl + 'pay/pay_now',
            data: {
                order_id: order_id,
                username: username,
                type_: type_number, //  类型：shop_order 或是 contact_order 
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
                                    type_: 1,
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
                    that.setData({
                        payNowSt: false,
                    })
                    wx.hideLoading();
                    wx.showToast({
                        title: res.data.msg,
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