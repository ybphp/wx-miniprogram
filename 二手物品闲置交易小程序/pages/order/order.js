// pages/order/order.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: ['未完成订单', '所有订单'],
        stv: {
            windowWidth: 0,
            lineWidth: 0,
            offset: 0,
            tStart: false
        },
        activeTab: 0,
        page: 1,
        hasData: true,
        isNotData: true,
        orderListArr: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        util.isLoginModal();
        try {
            let {tabs} = this.data;
            var res = wx.getSystemInfoSync()
            this.windowWidth = res.windowWidth;
            this.data.stv.lineWidth = this.windowWidth / this.data.tabs.length;
            this.data.stv.windowWidth = res.windowWidth;
            this.setData({stv: this.data.stv})
            this.tabsCount = tabs.length;
        } catch (e) {
            console.log(e);
        }
        //获取消息列表
        this.getOrderList(this.data.page);
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
        if (!this.data.hasData) {
            return;
        }
        //获取消息列表
        this.getOrderList(this.data.page);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    /**
     * 获取订单列表
     */
    getOrderList: function (page) {
        var that = this;
        util.https(app.globalData.api + "/api/MessagePush/getlist", "GET", {
                page: page,//页码
                size: 10,//条数
                userid: wx.getStorageSync("userid"),//用户id
                isHideLoad: true
            },
            function (data) {
                if (that.data.page == 1) {
                    that.setData({
                        newsListArr: []
                    })
                }

                for (var index in data.data.data_list) {
                    that.data.newsListArr.push(data.data.data_list[index]);
                }

                that.setData({
                    hasData: data.data.page_count == that.data.page ? false : true,
                    isNotData: (data.data == null || data.data.data_list == 0) ? true : false,
                    newsList: that.data.newsListArr
                })
                that.data.page++;

            }
        )
    }
    ,
    handlerStart(e) {
        let {clientX, clientY} = e.touches[0];
        this.startX = clientX;
        this.tapStartX = clientX;
        this.tapStartY = clientY;
        this.data.stv.tStart = true;
        this.tapStartTime = e.timeStamp;
        this.setData({stv: this.data.stv})
    },
    handlerMove(e) {
        let {clientX, clientY} = e.touches[0];
        let {stv} = this.data;
        let offsetX = this.startX - clientX;
        this.startX = clientX;
        stv.offset += offsetX;
        if (stv.offset <= 0) {
            stv.offset = 0;
        } else if (stv.offset >= stv.windowWidth * (this.tabsCount - 1)) {
            stv.offset = stv.windowWidth * (this.tabsCount - 1);
        }
        this.setData({stv: stv});
    },
    handlerCancel(e) {

    },
    handlerEnd(e) {
        let {clientX, clientY} = e.changedTouches[0];
        let endTime = e.timeStamp;
        let {tabs, stv, activeTab} = this.data;
        let {offset, windowWidth} = stv;
        //快速滑动
        if (endTime - this.tapStartTime <= 300) {
            //向左
            if (Math.abs(this.tapStartY - clientY) < 50) {
                if (this.tapStartX - clientX > 5) {
                    if (activeTab < this.tabsCount - 1) {
                        this.setData({activeTab: ++activeTab})
                    }
                } else {
                    if (activeTab > 0) {
                        this.setData({activeTab: --activeTab})
                    }
                }
                stv.offset = stv.windowWidth * activeTab;
            } else {
                //快速滑动 但是Y距离大于50 所以用户是左右滚动
                let page = Math.round(offset / windowWidth);
                if (activeTab != page) {
                    this.setData({activeTab: page})
                }
                stv.offset = stv.windowWidth * page;
            }
        } else {
            let page = Math.round(offset / windowWidth);
            if (activeTab != page) {
                this.setData({activeTab: page})
            }
            stv.offset = stv.windowWidth * page;
        }
        stv.tStart = false;
        this.setData({stv: this.data.stv})
    },
    _updateSelectedPage(page) {
        let {tabs, stv, activeTab} = this.data;
        activeTab = page;
        this.setData({activeTab: activeTab})
        stv.offset = stv.windowWidth * activeTab;
        this.setData({stv: this.data.stv})
    },
    handlerTabTap(e) {
        this._updateSelectedPage(e.currentTarget.dataset.index);
    }
})