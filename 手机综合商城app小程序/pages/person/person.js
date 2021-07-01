// pages/person/person.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   service:[
     { img: '../../assets/icons/per_service_ic_sign.png', name: '积分签到', page:'sign'},
     { img: '../../assets/icons/per_service_ic_wallet.png', name: '我的余额', page: '../balance/balance'},
     { img: '../../assets/icons/per_service_ic_coupon.png', name: '优惠券', page: '../myCoupon/myCoupon' },
     { img: '../../assets/icons/per_service_ic_cart.png', name: '购物车', page: '../cart/cart'},
     { img: '../../assets/icons/per_service_ic_collection.png', name: '我的收藏', page: '../mycollection/mycollection' },
     { img: '../../assets/icons/per_service_ic_address.png', name: '地址管理', page: '../myAddr/myAddr'},
     { img: '../../assets/icons/per_service_ic_Invite.png', name: '邀请好友', page: '../sharecode/sharecode' },
     { img: '../../assets/icons/per_service_ic_note.png', name: '推荐记录', page: '' },
     { img: '../../assets/icons/per_service_ic_set.png', name: '设置', page: '' }
   ],
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sign:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // wx.hideTabBar() //隐藏底部tab




    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.getUserInfo();
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
  toOrder(e){
    console.log(e.currentTarget.dataset.page);
    wx.navigateTo({
      url: '../order/order?id='+ e.currentTarget.dataset.page,
    })
  },
  showSign(){
    this.setData({
      sign:false
    })
  },
  closeSign() {
    this.setData({
      sign:true
    })
  },
  toIndex() {
    this.setData({
      sign: true
    })
    wx.switchTab({
      url: '../index/index'
    })
  },
  toPage(e){
    if (e.currentTarget.dataset.page == 'sign'){
           this.showSign();
    } else if (e.currentTarget.dataset.page == '../cart/cart'){
      wx.switchTab({
        url: '../cart/cart'
      })
    } else if (e.currentTarget.dataset.page == '') {
      wx.showToast({
        title: '开发中...',
        icon: '',
        image: '',
        duration:2000,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }else{
      wx.navigateTo({
        url: e.currentTarget.dataset.page,
      })
    }
    
  },
})