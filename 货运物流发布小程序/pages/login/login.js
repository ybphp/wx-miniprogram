// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAgree: false,
    formData: {},
    rules: [{
        name: 'mobile',
        rules: [{required: true, message: '手机号必填'}, {mobile: true, message: '手机号格式不对'}],
    }, {
        name: 'yzm',
        rules: {required: true, message: '验证码必填'},
    }]
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
  bindAgreeChange: function (e) {
    console.log(!!e.detail.value.length)
    this.setData({
        isAgree: !!e.detail.value.length
    });
  },
  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
        console.log('valid', valid, errors)
        if (!valid) {
            const firstError = Object.keys(errors)
            if (firstError.length) {
                this.setData({
                    error: errors[firstError[0]].message
                })

            }
        } else {
            wx.redirectTo({
              url: '/pages/home/home',
            })
        }
    })
  },
  formInputChange(e) {
    const {field} = e.currentTarget.dataset
    this.setData({
        [`formData.${field}`]: e.detail.value
    })
    console.log(this.data.formData)
  }

})