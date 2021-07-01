// pages/goodsDetail/goodsDetail.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../assets/imgs/swiperImg.png',
      '../../assets/imgs/swiperImg.png',
      '../../assets/imgs/swiperImg.png'
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 1000,
    // input默认是1
    num: 1,
    // 使用data数据对象设置样式名
    minusStatus: 'disabled',
    tabs: ["图文详情", "商品参数", "评论（2）"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    flag: true,
    flagPoster:true,
    indicatoractivecolor: '#F44225',
    collection:false,
    classIndexColor:0,
    classIndexSpecs: 0,
    color:['红色','黑色'],
    specs:['规格1','规格2']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    wx.showShareMenu({
      // 要求小程序返回分享目标信息
      withShareTicket: true
    }); 
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  /* 转发*/
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '转发dom',
      path: `pages/index/index`,
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        }
        //可以获取群组信息
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            console.log(res)
          }
        })
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
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
  /* 点击减号 */
  bindMinus: function (e) {
    console.log(e);
    var num = this.data.num;
    // 如果大于1时，才可以减
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function (e) {
    console.log(e);
    var num = this.data.num;
    // 不作过多考虑自增1
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回
    this.setData({
      num: num
    });
  },
  //隐藏弹框
  hidePopup: function () {
    this.setData({
      flag: !this.data.flag
    })
  },
  //展示弹框
  showPopup() {
    this.setData({
      flag: !this.data.flag
    })
  }
  ,
  showPoster(){
    this.setData({
      flagPoster:false
    })
  },
  hidePoster() {
    this.setData({
      flagPoster:true
    })
  },
  /**
 *  图片预览方法
 *  此处注意的一点就是，调用 "wx.previewImage"时，第二个参数要求为数组形式哦
 *  当然，做过图片上传功能的应该会注意到，如果涉及到多张图片预览，图片链接数组集合即为参数 urls！
 */
  previewImage: function (e) {
    var current = e.target.dataset.src;
    console.log(current);
    wx.previewImage({
      current: current,
      urls: [current]
    })
  },
  // 收藏
  collection(){
    this.setData({
      collection: !this.data.collection
    })
  },
  // 选择颜色
  chooseColor(e){
    this.setData({
      classIndexColor: e.currentTarget.dataset.index,
    });
  },
  // 选择规格
  chooseSpecs(e){
    this.setData({
      classIndexSpecs: e.currentTarget.dataset.index,
    });
  },
  // 去购物车
  toCart(){
    wx.switchTab({
      url: '../cart/cart'
    })
  },
  // 去确认订单
  toOrderConfirm(){
    wx.navigateTo({
      url: '../orderConfirm/orderConfirm',
    })
  },
  // 加入购物车
  addToCart(){
    wx.showToast({
      title: '加入成功',
    })
  }
})