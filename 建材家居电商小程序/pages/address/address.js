// pages/address/address.js
var common = require("../../utils/util.js");
var app = getApp();

const imgurl = app.globalData.imgUrl;


Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imgurl: imgurl,
		addressList: [],
		from_: '',//从哪个页面来，默认 为空是从我的地址管理
        newAddHide:false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
      if(getCurrentPages().length==5){
          this.setData({
              newAddHide:true,
          })
      }
        
		this.setData({
			from_: options.from_
		})

	},

	//取地址列表
	getAddressList: function () {
		var that = this;
		var username = common.getUserName();
		common.httpG('address/index', {
			username: username,
		}, function (data) {
			if (data.code && data.code != 0) {
				return;
			}
			that.setData({
				addressList: data.data
			})
		})

	},
	//设为默认地址
	tapSetDefault: function (e) {
		var that = this;
		var address_id = e.currentTarget.dataset.address_id;
		var username = common.getUserName();
		common.httpP('address/choose', {
			username: username,
			id: address_id
		}, function (data) {
			if (data.code && data.code != 0) {
				return;
			}
			that.getAddressList()


		})
		if (that.data.from_ =='orderConfirm'){
            wx.navigateBack({
				
			})
		}


	},
	//编辑地址
	tapEditAddress: function (e) {
		var that = this;
		var address_id = e.target.dataset.address_id;
		wx.navigateTo({
			url: '/pages/newAdd/newAdd?address_id=' + address_id,
		})
	},
	//删除地址
	tapDelAddress: function (e) {
		var that = this;
		var address_id = e.target.dataset.address_id;
		var username = common.getUserName();
		wx.showModal({
			title: '删除',
			content: '确认删除么？',
			success: function (res) {
				if (res.confirm) {
					common.httpP('address/delete', {
						username: username,
						id: address_id,
					}, function (data) {
						console.log(data)
						if (data.code == 0) {
							that.getAddressList();
						}

					})
				} else if (res.cancel) {
					return;
				}
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
		this.getAddressList()
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