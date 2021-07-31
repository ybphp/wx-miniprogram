// pages/huoyuan/huoyuan.js
const citys = require('../../utils/CNAddrArr.js')
const areaarr = citys.area()
const province = areaarr[0]

const city = areaarr[1]
console.log(city)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    province,
    city,
    toViewp:'p1',
    toViewc:'c1',
    qishow:false,
    qi:'',
    zhongshow:false,
    zhong:'',
    cxshow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success (res) {
        var scheight = res.windowHeight - 50
        that.setData({scheight:scheight})
      }
    })
  },
  chooseProvince: function(e){
    var pindex = e.currentTarget.dataset.index
    this.setData({toViewp:pindex})
    this.setData({city:areaarr[pindex]})
  },
  chooseCity: function(e){
    this.setData({
      qi:e.currentTarget.dataset.name,
      qishow:false
    })
  },
  chooseDz: function(){
    this.setData({qishow:!this.data.qishow})
  },
  
  chooseCx: function(){
    this.setData({cxshow:!this.data.cxshow})
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