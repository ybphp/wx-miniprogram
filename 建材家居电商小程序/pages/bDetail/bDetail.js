// pages/bDetail/bDetail.js


var common = require("../../utils/util.js");
var app = getApp();

const imgurl = app.globalData.imgUrl;
Page({

	/**
	 * 页面的初始数据
	 */

    data: {

        inputNum: 1,
        decrease: 'decrease',
        imgurl: imgurl,
        good: [],
        username: '',
        collect_star: 'collect-icon.png',
        Collect: "",
        img_big:[]
    },


	/**
	 * 生命周期函数--监听页面加载
	 */
    onLoad: function (options) {
        var good_id = options.good_id;
        // good_id = 19;
        this.getGood(good_id)
        this.getGoodBigImg(good_id)


    },

    getGood: function (good_id) {
        var that = this
        var username = common.getUserName();
        common.httpG('good/read',
            {
                good_id: good_id, username: username
            }, 
            function (data) {
                that.setData({ good: data.data })
                if (data.is_collect == 'true') {
                    that.setData({
                        collect_star: 'collect-icon-slt.png',
                        Collect: 'isCollect'
                    })
                }
            })
    },
    getGoodBigImg: function (good_id){
      var that = this
      common.httpG('good/images',
        {
          good_id: good_id
        },
        function (data) {
          that.setData({ goodImg: data.data })
          
        })
    },
    decrease() {
        var that = this;
        var inputNum = that.data.inputNum;
        if (inputNum > 1) {
            inputNum--;
        }
        var decrease = inputNum <= 1 ? 'decrease' : '';

        that.setData({
            inputNum: inputNum,
            decrease: decrease
        })
    },

    increase() {
        var that = this;
        var inputNum = that.data.inputNum;
        inputNum++;
        var decrease = inputNum > 1 ? '' : 'decrease';
        that.setData({
            inputNum: inputNum,
            decrease: decrease
        })

    },

    placeChange(e) {
        var that = this;
        that.setData({
            inputNum: e.detail.value
        })
    },

    //加入车  或  立即购买
    tapAddCartGood: function (e) {
        var good_id = e.target.dataset.good_id
        var mai = e.target.dataset.mai
        var username = common.getUserName()

        var num = this.data.inputNum
        common.httpP('cart/save', { username: username, good_id: good_id, num: num }, function (data) {
            if (data.code == 0) {
                wx.showToast({
                    title: '加入购物车成功',
                })
                if (mai == 'true') {
                    wx.switchTab({
                        url: '/pages/shopCart/shopCart',
                    })
                }
            }
        })
    },
    //取商品
    tapCollectGood: function (e) {
        var that = this;
        var good_id = e.currentTarget.dataset.good_id;
        var username = common.getUserName()
        common.httpG('collect/collect_good', {
            username: username,
            good_id: good_id
        }, function (data) {
            if (data.msg == '添加成功') {
                that.setData({
                    collect_star: 'collect-icon-slt.png',
                    Collect: 'isCollect'
                });
            } else {
                that.setData({
                    collect_star: 'collect-icon.png',
                    Collect: ''
                });

            }
        });
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