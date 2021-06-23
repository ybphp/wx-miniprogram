// pages/newAdd/newAdd.js
var common = require("../../utils/util.js");
var app = getApp();
const imgurl = app.globalData.imgUrl;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		truename: '',
		pcd: '', //收货地址
		info: '',
		is_default: 0,
		mobile: '',
		address_id: '',
		action: 'submitAddress',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		//编辑地址
		var address_id = options.address_id;
		if (address_id !== undefined) {
			this.setData({
				action: 'editAddress',


			})
			this.getAddress(address_id)

		}
	},
	//编辑地址第一步
	getAddress: function (address_id) {
		var that = this
		var username = common.getUserName();
		common.httpG('address/edit', {
			username: username,
			id: address_id
		}, function (data) {
			that.setData({
				address_id: data.data.id,
				truename: data.data.truename,
				mobile: data.data.mobile,
				pcd: data.data.pcd,
				info: data.data.info,

			})
		})
	},
	//编辑地址第二步：
	editAddress: function (event) {
		var data_address = event.detail.value;

		var username = common.getUserName();
		var address_id = this.data.address_id;
		common.httpP('address/update', {
			id: address_id,
			username: username,
			truename: data_address.truename,
			mobile: data_address.mobile,
			pcd: data_address.pcd,
			info: data_address.info,

		}, function (data) {
			if (data.code == 0) {
				wx.navigateBack({

				})
			}
		})


	},
	//添加地址
	submitAddress: function (event) {
		var data_address = event.detail.value;
		//var is_default = data_address.is_default == true ? 1 : 0;
		var username = common.getUserName();

		common.httpP('address/add', {
			username: username,
			truename: data_address.truename,
			mobile: data_address.mobile,
			pcd: data_address.pcd,
			info: data_address.info,
			//	is_default: is_default,

		}, function (data) {
			//添加成功返回列表页
			if (data.code == 0) {
				wx.navigateBack({

				})
			}
		})

	},
	chooseAddr: function () {
		var that = this;
		wx.chooseLocation({
			success: function (res) {
				that.setData({
					pcd: res.address + res.name
				});

			},
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