// pages/orders/orders.js

var common = require("../../utils/util.js");
var app = getApp();
const imgurl = app.globalData.imgUrl;
const ordersAll = app.globalData.orders_all;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        imgurl: imgurl,
        winWidth: '',
        currentTab: 0,
        orders: [], //所有订单
        order_paid: [], //订单已支付
        order_no_pay: [], //订单待支付
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    winHeight: res.windowHeight
                });
            },
        })

    },
    //取我的订单列表，缓存本地
    getOrders: function () {
        var that = this
        var username = common.getUserName();
        common.httpG('dingdan/index', {
            username: username,
        }, function (data) {
            if (data.code == 0) {
                that.setData({
                    orders: data.data
                })

            } else {
                that.setData({
                    orders: []
                })
            }
            //缓存所有订单。。。
            wx.setStorageSync(ordersAll, data.data)
        })
    },
    //查看订单详情
    tapLookDetail: function (e) {
        // console.log(e);
        var order_id = e.currentTarget.dataset.order_id;
        var address_id = e.currentTarget.dataset.address_id;
        var type_ = e.currentTarget.dataset.type_;
        if (type_ == '商家订金' || type_ == '商家全款') {
            wx.navigateTo({
                url: '/pages/submit_from_orders_deposit/submit_from_orders_deposit?from_=look_detail&order_id=' + order_id + '&address_id=' + address_id + "&type_=" + type_,
            })
            return;
        }
        wx.navigateTo({
            url: '/pages/submit_from_orders/submit_from_orders?from_=look_detail&order_id=' + order_id + '&address_id=' + address_id,
        })
    },
    //确认评价页面
    tapOrderFankui: function (e){
      var that = this;
      var order_id = e.currentTarget.dataset.order_id;
      var shop_id = e.currentTarget.dataset.shop_id;
      var username = common.getUserName();
      wx.navigateTo({
        url: '/pages/addCommen/addCommen?order_id=' + order_id + 'username=' + username + 'shop_id=' + shop_id
      })
    },
    //去支付
    tapGoOrderConfirm: function (e) {
        var order_id = e.currentTarget.dataset.order_id;
        var address_id = e.currentTarget.dataset.address_id;
        var type_ = e.currentTarget.dataset.type_;
          // console.log('address++',address_id)
        if (type_ == '商家订金' || type_ == '商家全款'){
            wx.navigateTo({
                url: '/pages/submit_from_orders_deposit/submit_from_orders_deposit?from_=to_pay&order_id=' + order_id + '&address_id=' + address_id + "&type_=" + type_,
            })
            return ;
}
        wx.navigateTo({
            url: '/pages/submit_from_orders/submit_from_orders?from_=to_pay&order_id=' + order_id + '&address_id=' + address_id + "&type_=" + type_,
        })
    },
    //取消订单，取消后用户不能能看见此订单
    tapCancelOrder: function (e) {
        var that = this
        var order_id = e.currentTarget.dataset.order_id;
        wx.showModal({
            title: '取消订单',
            content: '确认取消吗？取消后可以列表删除',
            success: function (res) {
                if (res.confirm) {
                    common.httpP('dingdan/update_st', {
                        'order_id': order_id,
                        'st': 'cancel'
                    }, function (data) {
                        if (data.code == 0) {
                            that.getOrders()
                        }
                    })
                }
            }
        })
    },
    //删除取消后的订单
    tapOrderDelete: function (e) {
        var that = this;
        var order_id = e.target.dataset.order_id;
        wx.showModal({
            title: '删除订单',
            content: '确认删除吗？',
            success: function (res) {
                if (res.confirm) {
                    common.httpP('dingdan/update_st', {
                        order_id: order_id,
                        st: 'delByUser'
                    }, function (data) {
                        if (data.code == 0) {
                            that.getOrders()
                        }
                    });
                }
            }
        })

    },
    tapGoodConfirm: function (e) {
        var that = this;
        var order_id = e.target.dataset.order_id;
        wx.showModal({
            title: '确认收货',
            content: '确认所有货都收到了吗?否则人财两空。',
            success: function (res) {
                if (res.confirm) {
                    common.httpP('dingdan/update_st', {
                        order_id: order_id,
                        st: 'taken'//收到货了
                    }, function (data) {
                        if (data.code == 0) {
                            that.getOrders()
                        }
                    });
                }
            }
        })
    },

    houseChange(e) {
        var that = this;
        that.setData({
            currentTab: e.detail.current
        })
    },

    switchNav(e) {
        var that = this;
        var current = e.target.dataset.current;
        if (that.data.currentTab === current) {
            return false
        } else {
            that.setData({
                currentTab: current
            })
            var order_all = wx.getStorageSync('orders_all');
            if (!order_all) {
                return false;
            }
            if (current == 1) { //待付款
                var order_no_pay = [];
                for (var i = 0; i < order_all.length; i++) {
                    if (order_all[i].st == '待支付') {
                        order_no_pay.push(order_all[i])
                    }
                }
                that.setData({
                    order_no_pay: order_no_pay
                })
            } else if (current == 2) { //已付款
                var order_paid = [];
                for (var i = 0; i < order_all.length; i++) {
                    if (order_all[i].st == '已支付') {
                        order_paid.push(order_all[i])
                    }
                }
                that.setData({
                    order_paid: order_paid
                })
            }

        }
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
        //取我的订单列表
        this.getOrders();
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
        //异步清订单缓存
        wx.removeStorage({
            key: ordersAll,
            success: function (res) { },
        })
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