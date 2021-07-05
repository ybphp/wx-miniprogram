// pages/index/information.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isth: 1,//是否统货
        productList: [],
        productLists: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getInformationData();
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
     * 获取省市县数据
     */
    getAddressPCCList: function (e) {
        util.getAddressPCCList(this, e.target.dataset.item, 3, function () {

        })
    },
    /**
     * 获取附近地址数据
     */
    getCurrentCity: function (e) {
        util.getCurrentCity(this, 3, function () {

        })
    },
    /**
     * 选择打开附近地址
     */
    getAddressPois: function (e) {
        this.setData({
            isShowSearch: false,
            addressname: e.currentTarget.dataset.items.name
        })
    },
    /**
     * 用户点击checkbox
     */
    checkboxChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value)

        for (var pindex in this.data.productList) {
            this.data.productList[pindex].checked = false;
            this.setData({
                productList: this.data.productList
            })
        }

        for (var index in e.detail.value) {
            this.data.productList[e.detail.value[index]].checked = true;
            this.setData({
                productList: this.data.productList
            })

        }


    },
    /**
     * 获取参考价格数据
     */
    getInformationData: function () {
        var that = this;
        //获取产品品类
        var indexs = 0;
        util.getProductList(that, function (data) {
            if (data.code == 1001) {
                that.setData({
                    productList: data.data
                })
                /*                for (var index in data.data) {
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

                                        indexs++;
                                    })
                                }*/

            } else {
                util.toolTip(that, data.message)
            }

        })
    }
})