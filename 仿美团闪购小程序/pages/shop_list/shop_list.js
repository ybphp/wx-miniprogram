// pages/shop_list/shop_list.js
const app = getApp()
const http = require('../../utils/http.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 0,
        page_size: 10,
        last_page: false,
        type:0,
        name:'',
        items: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let type = options.type;
        let name = options.name ? options.name : '' ;
        this.data.type = type;
        this.setData({
            name: name
        })
        this.get_shop(type, name);
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
        this.get_shop(this.data.type, this.data.name);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    get_shop(type, name) {
        var self = this;
        if (!this.data.last_page) {
            http.post('shop/list', { "type": type, "name": name, "latitude": app.globalData.location.latitude, "longitude": app.globalData.location.longitude, "page": this.data.page, "page_size": this.data.page_size }, function (res) {
                self.data.page = self.data.page + 1;
                let data = res.data;
                console.log(data)
                if (data.status == 1) {
                    let o_data = self.data.items,
                        n_data = o_data.length > 0 ? o_data.concat(data.data) : data.data;
                    self.setData({
                        items: n_data
                    });
                } else if (data.status == 2) {//没有下一页了
                    this.data.last_page = true;
                } else {
                    wx.showToast({
                        title: data.msg,
                        icon: 'none',
                        duration: 2000//持续的时间
                    })
                }
            });
        }
    },
    search(e) {
        let name = e.detail.value
        if (name) {
            console.log(name)
            wx.navigateTo({ url: '/pages/shop_list/shop_list?name=' + name });
        } else {
            wx.showToast({
                title: '关键词不能为空',
                icon: 'none',
                duration: 2000//持续的时间
            })
        }
    }
})