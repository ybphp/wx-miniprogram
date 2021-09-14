// pages/searchlist/searchlist.js
const urlApi = require('../../utils/server.api.js')
const util = require('../../utils/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doctor:[]
  },

  getDoctorList: function () {
    var that = this;
    wx.request({
      url: urlApi.queryRelatives(),
      method: "get",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {},
      success: function (reponse) {
        var doctorArr = new Array();
        var list = reponse.data.DATAPARAM.GROUP.HBLIST.HB;
        if (list.length > 0) {
          doctorArr.push(list[0],list[1],list[2])
          that.setData({
            doctor: doctorArr
          })
          console.log("查看列表",that.data.doctor)
        }
      }
    })
  },

  getDetail:function(e){
    var YSID = e.currentTarget.dataset.id
    var that = this;
    wx.request({
      url: urlApi.queryRelatives(),
      method: "post",
      header: {
        'content-type': 'application/json'
      },
      data: {
        YSID: YSID,
      },
      success: function (response) {
        var obj = response.data.DATAPARAM.GROUP.HBLIST.HB
        wx.navigateTo({
          url: '/pages/doctor/doctor?doctor=' + JSON.stringify(obj)
        })
      }
    })
  },

  gotoSearchList:function(e){
    var that = this;
    var value= e.detail.value;
    wx.request({
      url: urlApi.getSearchDoctor(),
      method: "post",
      header: {
        'content-type': 'application/json'
      },
      data: {
        KEY: value,
      },
      success: function (response) {
        var obj = response.data.YSLIST;
        for(var i of obj){
          i.YS=i.XM
        }

        that.setData({
          doctor: obj
        })
      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDoctorList();
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