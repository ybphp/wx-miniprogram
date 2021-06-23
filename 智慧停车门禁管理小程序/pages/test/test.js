// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sectionTwo: true,
    sectionThree: false,
    sectionFour: false,
    triLeft: 0.23,
    windowWidth: wx.getSystemInfoSync().windowWidth,
    profile: '员工',
    step: 1,
    phone: '',
    password: '',
    organization: '',
    name: '',
    id: '',
    nickname: '',
    head_img: '',
    loginPhone: '',
    loginPassword: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSetting({

      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.getUserInfo({
                //如果全局用户信息存在，则直接设置数据
                withCredentials: false,
                success: function (res) {
                  that.setData({
                    nickname: res.userInfo.nickName,
                    head_img: res.userInfo.avatarUrl
                  })
                }
              })
            }
          })
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
  sectionTwo() {
    this.setData({
      sectionTwo: true,
      sectionThree: false,
      triLeft: 0.23,
      step: 1,
      phone: '',
      password: '',
      organization: '',
      name: '',
      id: '',
      nickname: '',
      head_img: '',
      loginPhone: '',
      loginPassword: ''
    })
  },
  sectionThree() {
    this.setData({
      sectionTwo: false,
      sectionThree: true,
      triLeft: 0.73,
      step: 1,
      phone: '',
      password: '',
      organization: '',
      name: '',
      id: '',
      nickname: '',
      head_img: '',
      loginPhone: '',
      loginPassword: ''
    })
  },
  sectionTwoPhone(e) {
    this.setData({
      loginPhone: e.detail.value
    })
  },
  sectionTwoPassword(e){
    this.setData({
      loginPassword: e.detail.value
    })
  },
  sectionThreeVisitorPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  sectionThreeVisitorPassword(e) {
    this.setData({
      password: e.detail.value
    })
  },
  sectionThreeEmployeePhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  sectionThreeEmployeePassword(e) {
    this.setData({
      password: e.detail.value
    })
  },
  sectionThreeEmployeeOrganization(e) {
    this.setData({
      organization: e.detail.value
    })
  },
  sectionThreeEmployeeName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  sectionThreeEmployeeId(e) {
    this.setData({
      id: e.detail.value
    })
  },

  buttonCircleInnerHandle() {
    var that = this;
    if (that.data.profile == '访客') {
      that.setData({
        profile: '员工',
        step: 1,
        phone: '',
        password: '',
        organization: '',
        name: '',
        id: '',
        nickname: '',
        head_img: '',
        loginPhone: '',
        loginPassword: ''
      })
    } else {
      that.setData({
        profile: '访客',
        step: 1,
        phone: '',
        password: '',
        organization: '',
        name: '',
        id: '',
        nickname: '',
        head_img: '',
        loginPhone: '',
        loginPassword: ''
      })
    }

  },

  stepHandle() {
    this.setData({
      step: 2
    })
  },
  sectionThreeVisitorPhone(e) {
    console.log(e);
    this.setData({
      phone: e.detail.value
    })
  },
  sectionThreeVisitorPassword(e) {
    this.setData({
      password: e.detail.value
    })
  },
  loginHandle() {
    
  },
  registerHandle() {
    var that = this;
    //获取用户信息
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          console.log(that.data.head_img)
          wx.request({
            url: 'https://www.zjzlnet.com/node/user/login',
            data: {
              code: res.code,
              head_img: that.data.head_img,
              nickname: that.data.nickname,
              phone: that.data.phone,
              password: that.data.password,
              organization: that.data.organization,
              name: that.data.name,
              id: that.data.id,
            },
            method: 'POST',
            success(res) {
              console.log(res)
              if (res.data.errno == 0) {
                if (res.data.data == '注册申请已提交，请耐心等待管理员审核') {
                  wx.showToast({
                    title: '注册已提交',
                  })
                } 
                if (res.data.data !== '注册申请已提交，请耐心等待管理员审核') {
                  // console.info("登陆成功，则保存token到本地");

                  wx.setStorageSync('token', res.data.data);
                  setTimeout(wx.showToast({
                    title: '注册已提交',
                    icon: 'success',
                    duration: 2000
                  }),2000) 
                }
                wx.navigateBack({
                  
                })
              }
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  },
  loginHandle() {

  }
})