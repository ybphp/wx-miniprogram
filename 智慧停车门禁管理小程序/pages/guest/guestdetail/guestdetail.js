Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2016-09-01',
    time: '12:01',
    organization: '',
    name: '',
    phone: '',
    date: '',
    time: '',
    dateTime: '',
    num: 0,
    car: '',
    barCode: '',
    list: [],
    token: wx.getStorageSync('token')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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

  nameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  phoneInput(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  organizationInput(e){
    this.setData({
      organization: e.detail.value
    })
  },
  bindDateChange(e){
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange(e){
    this.setData({
      time: e.detail.value
    })
  },
  numInput(e) {
    this.setData({
      num: e.detail.value
    })
  },
  carInput(e) {
    this.setData({
      car: e.detail.value
    })
  },
  toHistory(){
    wx.request({
      url: 'https://www.zjzlnet.com/zjepeframeworks/zjepeframe_msgUser/getVisitedStoryMsg',
      data: {
        userId: 'admin',
        passWord: '0192023a7bbd73250516f069df18b500',
        token: this.data.token
      },
      method: 'GET',
      success(res) {
        console.log(res)
      }
    })
    // wx.navigateTo({
    //   url: '../guesthistory/guesthistory',
    // })
  },
  buttonHandle() {
    var that = this;
    that.setData({
      dateTime: that.data.date + ' ' + that.data.time + ':00',
    })
    console.log(that.data);
    
    wx.request({
      url: 'https://www.zjzlnet.com/zjepeframeworks/zjepeframe_parkVisitor/shenHeStatusToOne',
      data: {
        userId: 'admin',
        passWord: '0192023a7bbd73250516f069df18b500',
        token: that.data.token,
        name: that.data.name,
        personNum: that.data.num,
        startTime: that.data.dateTime,
        date: that.data.date,
        phoneNum: that.data.phone,
        carNumber: that.data.car
      },
      method: 'GET',
      success(res){
        console.log(res)
        // var resJson = JSON.parse(res.data.data);
        // console.log(resJson);
        // // console.log(resJson.data.barCode);
        // that.setData({
        //   barCode: resJson.data.barCode
        // });
        // wx.navigateTo({
        //   url: '../qrcode/qrcode?barCode=' + that.data.barCode,
        // })
        // wx.showToast({
        //   title: 'QRCode',
        // })
      }
    })
  }
})