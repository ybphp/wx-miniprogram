// pages/shopCart/shopCart.js

var common = require("../../utils/util.js");
var app = getApp();
const imgurl = app.globalData.imgUrl;
const CART_GOOD = app.globalData.cart_good; //购物车商品数据缓存key
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		imgurl: imgurl,
		winHeight: '',
		currentTab: 0,
		shopAndGoodList: [],
		sum_price_all: 0,
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
				})
			},
		})
	},
	//结算去订单确认页
	tapGoSubmit: function () {
		wx.navigateTo({
			url: '/pages/submit/submit',
		})
	},
	//删除
	tapDelCartGood: function (e) {
		var that = this;
		var cart_good_id = e.target.dataset.cart_good_id;
		var username = common.getUserName();
		wx.showModal({
			title: '删除商品',
			content: '确认删除商品吗？',
			success: function (res) {
				if (res.confirm) {
					common.httpG('cart/delete_good', {
						cart_good_id: cart_good_id,
						username: username,
					}, function (data) {
						if (data.code == 0) {
							that.getShopAndGoodList()
						}
					})
				}
			}
		})
	},
	//取购物车数据
	getShopAndGoodList: function () {
		var that = this;
		var username = common.getUserName()
		common.httpG('cart/index', {
			username: username
		}, function (data) {
			if (data.code == 0) {
				that.setData({
					shopAndGoodList: data.data,
					sum_price_all: data.sum_price_all
				})
			} else {
				that.setData({
					shopAndGoodList: [],
					sum_price_all: 0
				})
			}
			//缓存
			wx.setStorageSync(CART_GOOD, data.data)
			wx.setStorageSync('sum_price_all', data.sum_price_all)
		})
	},
	storeChange(e) {
		var that = this;
		that.setData({
			currentTab: e.detail.current
		})
	},
	switchNav(e) {
		let that = this;
		if (that.data.current === e.target.dataset.current) {
			return false
		} else {
			that.setData({
				currentTab: e.target.dataset.current
			})
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
		this.getShopAndGoodList();
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