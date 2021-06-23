// pages/groupPurchase/groupPurchase.js

var common = require("../../utils/util.js");
var app = getApp();

const imgurl = app.globalData.imgUrl;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imgurl: imgurl,
		rowActivity: {},
		type_: '',

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var activity_id = options.activity_id;
		if (options.type && options.type == 'history') {
			this.setData({
				type_: options.type
			})
		}
		this.getActivity(activity_id)
	},
	//取活动详情
	getActivity: function (activity_id) {
		var that = this
		common.httpG('activity/read', { activity_id: activity_id }, function (data) {
			if (data.code == 0) {
				that.setData({ rowActivity: data.data })
				wx.setStorage({
					key: 'rowActivity',
					data: data.data,
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