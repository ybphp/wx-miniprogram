// pages/acRegister/acRegister.js  添加活动报名
var common = require("../../utils/util.js");
var app = getApp();

const imgurl = app.globalData.imgUrl;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		activity_id: 0,
		rowActivity: {},
		rowAttend: null,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var rowActivity = wx.getStorageSync('rowActivity')

		var activity_id = options.activity_id
		this.setData({ activity_id: activity_id, rowActivity: rowActivity })
		// this.addActivityAttend(activity_id)
		this.getAttend()
	},
	getAttend: function () {
		var username = common.getUserName()
		var that = this
		common.httpG('activity/read_attend', {
			username: username,
			activity_id: that.data.activity_id
		}, function (data) {
			if (data.code == 0) {
				that.setData({
					rowAttend: data.data
				})
			}
		})
	},
	//添加在线报名
	addActivityAttend: function (e) {
		var that = this
		var data_post = e.detail.value
		var username=common.getUserName()
		data_post.activity_id = this.data.activity_id;
		data_post.username = username;
         
		common.httpP('activity/save', data_post, function (data) {
			if (data.code == 0 && that.data.rowAttend==null){
				wx.navigateTo({
					url: '/pages/register/register',
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