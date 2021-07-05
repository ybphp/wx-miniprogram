// pages/referenceprice/referenceprice.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        classifyIndex: 0,////选中产品分类标示
        isth: 0,//是否统货
        productList: [],
        productLists: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getPiceData();
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
     * 点击产品分类获取产品分类详情
     */
    getClassifyDetails: function (e) {
        wx.pageScrollTo({
            scrollTop: 0
        })
        var index = e.currentTarget.dataset.index || 0;
        this.setData({
            classifyIndex: index,
            classifyDetails: this.data.productLists[index].details
        })

    },
    /**
     * 获取参考价格数据
     */
    getPiceData: function () {
        var that = this;
        //获取产品品类
        var indexs = 0;
        util.getProductList(that, function (data) {
            if (data.code == 1001) {
                that.setData({
                    productList: data.data
                })
                for (var index in data.data) {
                    that.setData({
                        grpid: data.data[index].grpid
                    })
                    //根据产品品类及是否统货取产品列表
                    util.getProductListIsth(that, function (datas) {
                        if (datas.code == 1001) {
                            var items = data.data[indexs];
                            items.details = datas.data;
                            that.data.productLists.push(items);
                        }
                        if (indexs == 0) {
                            that.setData({
                                classifyDetails: datas.data
                            })
                        }
                        indexs++;
                    })
                }

            } else {
                util.toolTip(that, data.message)
            }

        })
    }
})