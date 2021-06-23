// pages/store/store.js
var common = require("../../utils/util.js");
var app = getApp();

const imgurl = app.globalData.imgUrl;
const wxurl = app.globalData.wxUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: imgurl,
    information: [
      { textUrl: '双11优惠来啦！' },
      { textUrl: '55家居微信小程序正式上线啦！' },
      { textUrl: '全场最低9折起！' }
    ],
    winHeight: '',
    currentTab: 0,
    shopGoods: [],
    current_page: 1,
    last_page: 1,
    shop_id: '',
    collect_star: 'collect-icon.png',
    username: '',
    Collect: "",
    ShopEvalute: [],
    shopInfo:{},
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
    var shop_id = options.shop_id
    this.setData({
      shop_id: shop_id
    })
    //shop/read
    this.shopInfo(shop_id)
    //调用good/shop_good
    this.shopGoods(shop_id)
    //调用shop/addr
    this.shopAddr(shop_id)
    this.getShopEvalute(shop_id)
    // this.isGroup(shop_id)
    // console.log(shop_id)
  },
  //店铺付订金
  tapOrderConfirmDeposit:function(e){
     wx.navigateTo({
		 url: '/pages/submit_from_deposit/submit_from_deposit?type_=4',
	 })
  },
//付全款
  tapOrderConfirmAllMoney: function (e) {
	  wx.navigateTo({
		  url: '/pages/submit_from_deposit/submit_from_deposit?type_=5',
	  })
  },
  shopInfo: function (shop_id) {
    var that = this;
    var username = common.getUserName()
    common.httpG('shop/read', {
      shop_id: shop_id,
      username: username

    }, function (data) {

      that.setData({
        shopInfo: data.data,
        isGroup:data.data.isGroup.data
      })
      wx.setStorage({
          key: 'shopInfo',
          data: data.data,
      })
      if (data.is_collect == 'true') {
        that.setData({
          collect_star: 'collect-icon-slt.png',
          Collect: 'isCollect'
        })

      }
    });
  },

  //是否参加团购
  // isGroup: function (shop_id){
  //   var that = this;
  //   common.httpG('shop/isGroup'),{
  //     shop_id: shop_id,
  //   },function(data){
  //     that.setData({
  //       isGroup:data
  //     })
  //   }
  // },

  shopGoods: function (shop_id) {
    var that = this;
    common.httpG('good/shop_goods', {
      shop_id: shop_id,

    }, function (data) {

      that.setData({
        shopGoods: data.data.data,
        page: data.data.current_page,
        last_page: data.data.last_page,

      });
    });
  },

  shopAddr: function (shop_id) {
    var that = this;
    common.httpG('shop/addr', {
      shop_id: shop_id,

    }, function (data) {

      that.setData({
        shopAddr: data.data,


      });
    });
  },

  //遍历店铺所有评价
  getShopEvalute: function (shop_id) {
    var that = this;
    common.httpG('fankui/getShop', {
      shop_id: shop_id,

    }, function (data) {

      that.setData({
        ShopEvalute: data.data.data,
      });
    });
  },

  //点击收藏商家
  tapCollectShop: function (e) {
    var that = this;
    var shop_id = e.currentTarget.dataset.shop_id;
    var username = wx.getStorageSync('username');
    if (!username) {
      app.register();
      username = wx.getStorageSync('username')
    }
    common.httpG('collect/collect_shop', {
      username: username,
      shop_id: shop_id
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
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    wx.request({
      url: wxurl + 'shop/shop_goods',
      success: (res) => {
        that.setData({
          shop_goods: res.data.data
        });
      },
      complete: () => {
        //结束下拉刷新
        wx.stopPullDownRefresh();
        setTimeout(() => {
          wx.hideToast();
        }, 600)
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var current_page = that.data.current_page
    var shop_id = that.data.shop_id
    var page = current_page + 1;
    if (current_page < that.data.last_page) {
      wx.request({
        url: wxurl + 'good/shop_goods',
        data: {
          shop_id: shop_id,
          page: page,
        },
        success: (res) => {
          that.setData({
            current_page: res.data.data.current_page,
            shopGoods: that.data.shopGoods.concat(res.data.data.data),
          })
        },
        complete: () => {
          setTimeout(() => {
            wx.hideToast();
          }, 600)
        }
      });
    };

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})