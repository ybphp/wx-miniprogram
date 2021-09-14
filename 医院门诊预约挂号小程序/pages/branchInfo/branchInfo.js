// pages/branchInfo/branchInfo.js
const urlApi = require('../../utils/server.api.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    address:"",
    phone:"",
    info:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBranchInfo(options.id);
  },

  //获取医生列表
  getBranchInfo: function (id) {
    var that = this;
    wx.request({
      url: urlApi.getKSinfo(),
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        KSID:id
      },
      success: function (reponse) {
        if (reponse.data.DATAPARAM.DEPTLIST.DEPT){
          var info = reponse.data.DATAPARAM.DEPTLIST.DEPT;
            that.setData({
              name: info.MC,
              address: info.address == undefined?"暂无地址":info.address,
              phone: info.phone == undefined ? "暂无电话" : info.phone,
              info: info.info == undefined ? "暂无介绍" : info.info
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

  }
})