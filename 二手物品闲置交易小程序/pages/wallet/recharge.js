// pages/wallet/recharge.js
var app = getApp();
var util = require('../../utils/util.js');
import WxValidate from '../../utils/validate';
var inputContent = {};//输入内容

Page({

    /**
     * 页面的初始数据
     */
    data: {
        paytype: [  //支付类型
            {value: 1, name: '微信支付', checked: 'true'},
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    },
    /**
     * 获取用户输入
     */
    bindChange: function (e) {
        inputContent[e.currentTarget.id] = e.detail.value;
    },
    /**
     * 用户支付
     */
    paymentSubmit: function (e) {

        var that = this;
        //微信公众号支付
        util.https(app.globalData.api + "/api/aop/wxpayGZH", "POST", {   out_trade_no: new Date().getTime(),//订单号
            subject: "收收充值",//商品名称
            body: "收收充值详情",//商品详情
            total_fee: inputContent.money, //总金额
            userid: wx.getStorageSync("userid"),//用户userid
            name: wx.getStorageSync('user').username,//用户名
            openid: wx.getStorageSync("openid") //微信openid
             },
            function (data) {
                if (data.code == 1001) {
                    wx.requestPayment({
                        'timeStamp': data.data.timestamp,
                        'nonceStr': data.data.nonce_str,
                        'package': data.data.prepay_id,
                        'signType': 'MD5',
                        'paySign': data.data.sign,
                        'success': function (res) {
                            console.log(res);
                            wx.navigateTo({
                                url: 'wallet'
                            })
                        },
                        'fail': function (res) {
                            console.log(res);
                        }
                    })

                } else {
                    util.toolTip(that, data.message)
                }

            }
        )



    }
})